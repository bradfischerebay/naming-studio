#!/usr/bin/env python3
"""
Quality check script for enriched batch files
Validates metadata completeness, duplicate IDs, year ranges, and data integrity
"""

import re
from pathlib import Path
from typing import Dict, List, Set, Tuple
from collections import defaultdict

# Define expected batch files
BATCH_FILES = [
    "enriched-batch-01-priority.ts",
    "enriched-batch-02B-programs-401-500.ts",
    "enriched-batch-03-programs-501-750.ts",
    "enriched-batch-04-programs-751-900.ts",
    "enriched-batch-04B-programs-901-1000.ts",
    "enriched-batch-05-programs-1001-1150.ts",
    "enriched-batch-05B-programs-1151-1250.ts",
    "enriched-batch-05-programs-1251-1494.ts",
]

# Valid values
VALID_STATUSES = {"current", "legacy", "renamed"}
VALID_MARKETS = {"US", "UK", "DE", "FR", "IT", "AU", "CA", "global"}
YEAR_MIN = 1995
YEAR_MAX = 2026

class QualityChecker:
    def __init__(self, directory: str):
        self.directory = Path(directory)
        self.all_ids: Dict[str, List[str]] = defaultdict(list)  # id -> [files]
        self.programs: List[Dict] = []
        self.issues: List[str] = []

    def extract_program_data(self, file_path: Path) -> List[Dict]:
        """Extract program objects from TypeScript file"""
        content = file_path.read_text()
        programs = []

        # Find all program objects
        pattern = r'\{\s*id:\s*"([^"]+)"[^}]+\}'
        for match in re.finditer(pattern, content, re.MULTILINE | re.DOTALL):
            obj_text = match.group(0)
            program = {"_file": file_path.name}

            # Extract fields
            id_match = re.search(r'id:\s*"([^"]+)"', obj_text)
            if id_match:
                program["id"] = id_match.group(1)

            name_match = re.search(r'name:\s*"([^"]+)"', obj_text)
            if name_match:
                program["name"] = name_match.group(1)

            desc_match = re.search(r'desc:\s*"([^"]+)"', obj_text)
            if desc_match:
                program["desc"] = desc_match.group(1)

            status_match = re.search(r'status:\s*"([^"]+)"', obj_text)
            if status_match:
                program["status"] = status_match.group(1)

            year_match = re.search(r'year:\s*(\d+)', obj_text)
            if year_match:
                program["year"] = int(year_match.group(1))

            # Market can be string or array
            market_match = re.search(r'market:\s*"([^"]+)"', obj_text)
            if market_match:
                program["market"] = market_match.group(1)
            else:
                market_array_match = re.search(r'market:\s*\[([^\]]+)\]', obj_text)
                if market_array_match:
                    markets = re.findall(r'"([^"]+)"', market_array_match.group(1))
                    program["market"] = markets

            if "id" in program:
                programs.append(program)

        return programs

    def check_file(self, file_path: Path) -> None:
        """Check a single batch file"""
        print(f"\n📂 Checking {file_path.name}...")

        if not file_path.exists():
            self.issues.append(f"❌ File not found: {file_path.name}")
            return

        programs = self.extract_program_data(file_path)
        print(f"   Found {len(programs)} programs")

        for prog in programs:
            self.programs.append(prog)

            # Track IDs for duplicate detection
            prog_id = prog.get("id")
            if prog_id:
                self.all_ids[prog_id].append(file_path.name)

            # Check for missing required fields
            if not prog.get("id"):
                self.issues.append(f"❌ {file_path.name}: Missing ID")

            if not prog.get("name"):
                self.issues.append(f"❌ {file_path.name}: Missing name for {prog.get('id', 'UNKNOWN')}")

            if not prog.get("desc"):
                self.issues.append(f"⚠️  {file_path.name}: Missing desc for {prog_id}")

            if not prog.get("status"):
                self.issues.append(f"❌ {file_path.name}: Missing status for {prog_id}")
            elif prog["status"] not in VALID_STATUSES:
                self.issues.append(f"❌ {file_path.name}: Invalid status '{prog['status']}' for {prog_id}")

            # Check year range
            if prog.get("year"):
                year = prog["year"]
                if year < YEAR_MIN or year > YEAR_MAX:
                    self.issues.append(f"⚠️  {file_path.name}: Suspicious year {year} for {prog_id} (expected {YEAR_MIN}-{YEAR_MAX})")
            else:
                self.issues.append(f"⚠️  {file_path.name}: Missing year for {prog_id}")

            # Check market format
            market = prog.get("market")
            if market:
                markets = [market] if isinstance(market, str) else market
                for m in markets:
                    if m not in VALID_MARKETS:
                        self.issues.append(f"⚠️  {file_path.name}: Invalid market '{m}' for {prog_id}")
            else:
                self.issues.append(f"⚠️  {file_path.name}: Missing market for {prog_id}")

    def check_duplicates(self) -> None:
        """Check for duplicate IDs across all files"""
        print("\n🔍 Checking for duplicate IDs...")
        duplicates = {pid: files for pid, files in self.all_ids.items() if len(files) > 1}

        if duplicates:
            for pid, files in duplicates.items():
                self.issues.append(f"❌ DUPLICATE ID '{pid}' found in: {', '.join(files)}")
        else:
            print("   ✅ No duplicate IDs found")

    def generate_report(self) -> str:
        """Generate quality report"""
        total_programs = len(self.programs)
        unique_ids = len(self.all_ids)

        # Count by status
        status_counts = defaultdict(int)
        for prog in self.programs:
            status = prog.get("status", "unknown")
            status_counts[status] += 1

        # Count by market
        market_counts = defaultdict(int)
        for prog in self.programs:
            market = prog.get("market")
            if market:
                markets = [market] if isinstance(market, str) else market
                for m in markets:
                    market_counts[m] += 1

        # Year distribution
        year_counts = defaultdict(int)
        for prog in self.programs:
            year = prog.get("year")
            if year:
                decade = (year // 10) * 10
                year_counts[decade] += 1

        # Programs without years
        missing_years = [p for p in self.programs if not p.get("year")]
        missing_desc = [p for p in self.programs if not p.get("desc")]
        missing_market = [p for p in self.programs if not p.get("market")]

        report = f"""# eBay Naming Graph - Enrichment Quality Report
Generated: 2026-04-17

## Executive Summary

- **Total Programs**: {total_programs}
- **Unique IDs**: {unique_ids}
- **Files Checked**: {len(BATCH_FILES)}
- **Issues Found**: {len(self.issues)}

## Status Distribution

"""
        for status in sorted(status_counts.keys()):
            count = status_counts[status]
            pct = (count / total_programs * 100) if total_programs > 0 else 0
            report += f"- **{status.capitalize()}**: {count} ({pct:.1f}%)\n"

        report += f"\n## Market Distribution\n\n"
        for market in sorted(market_counts.keys()):
            count = market_counts[market]
            report += f"- **{market}**: {count} programs\n"

        report += f"\n## Launch Year Distribution\n\n"
        for decade in sorted(year_counts.keys()):
            count = year_counts[decade]
            report += f"- **{decade}s**: {count} programs\n"

        if missing_years:
            report += f"\n## ⚠️  Missing Years ({len(missing_years)} programs)\n\n"
            for p in missing_years[:10]:  # Show first 10
                report += f"- `{p.get('id', 'UNKNOWN')}` - {p.get('name', 'NO NAME')} ({p.get('_file', 'UNKNOWN')})\n"
            if len(missing_years) > 10:
                report += f"- ... and {len(missing_years) - 10} more\n"

        if missing_desc:
            report += f"\n## ⚠️  Missing Descriptions ({len(missing_desc)} programs)\n\n"
            for p in missing_desc[:10]:
                report += f"- `{p.get('id', 'UNKNOWN')}` - {p.get('name', 'NO NAME')} ({p.get('_file', 'UNKNOWN')})\n"
            if len(missing_desc) > 10:
                report += f"- ... and {len(missing_desc) - 10} more\n"

        if missing_market:
            report += f"\n## ⚠️  Missing Market Data ({len(missing_market)} programs)\n\n"
            for p in missing_market[:10]:
                report += f"- `{p.get('id', 'UNKNOWN')}` - {p.get('name', 'NO NAME')} ({p.get('_file', 'UNKNOWN')})\n"
            if len(missing_market) > 10:
                report += f"- ... and {len(missing_market) - 10} more\n"

        if self.issues:
            report += f"\n## 🚨 Issues Detected ({len(self.issues)})\n\n"
            for issue in self.issues[:50]:  # Show first 50 issues
                report += f"{issue}\n"
            if len(self.issues) > 50:
                report += f"\n... and {len(self.issues) - 50} more issues\n"
        else:
            report += f"\n## ✅ No Critical Issues Detected\n\n"

        report += f"\n## Recommendations\n\n"

        if missing_years:
            report += f"1. **Add launch years** for {len(missing_years)} programs missing year metadata\n"

        if missing_desc:
            report += f"2. **Add descriptions** for {len(missing_desc)} programs missing descriptions\n"

        if missing_market:
            report += f"3. **Add market data** for {len(missing_market)} programs missing market information\n"

        # Find duplicate suggestions
        duplicates = {pid: files for pid, files in self.all_ids.items() if len(files) > 1}
        if duplicates:
            report += f"4. **Resolve {len(duplicates)} duplicate IDs** across batch files\n"

        if not self.issues:
            report += "- All programs have complete metadata ✅\n"
            report += "- No duplicate IDs detected ✅\n"
            report += "- All years within valid range (1995-2026) ✅\n"

        return report

    def run(self) -> str:
        """Run complete quality check"""
        print("🔍 eBay Naming Graph Quality Check\n")
        print("=" * 60)

        for batch_file in BATCH_FILES:
            file_path = self.directory / batch_file
            self.check_file(file_path)

        self.check_duplicates()

        print("\n" + "=" * 60)
        print(f"\n📊 Analysis complete!")
        print(f"   Total programs: {len(self.programs)}")
        print(f"   Total issues: {len(self.issues)}")

        return self.generate_report()


if __name__ == "__main__":
    checker = QualityChecker("/Users/bradfischer/naming-studio/app/naming-graph")
    report = checker.run()

    # Save report
    report_path = Path("/Users/bradfischer/naming-studio/app/naming-graph/ENRICHMENT-QUALITY-REPORT.md")
    report_path.write_text(report)

    print(f"\n✅ Report saved to: {report_path}")
    print("\nFirst 20 lines of report:")
    print("-" * 60)
    for line in report.split("\n")[:20]:
        print(line)
