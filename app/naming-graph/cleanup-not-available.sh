#!/bin/bash
# Cleanup Script: Remove "Not available" pollution from translations.ts
# This script removes all lines containing 'Not available' to clean the data

set -e

FILE="/Users/bradfischer/naming-studio/app/naming-graph/translations.ts"
BACKUP="/Users/bradfischer/naming-studio/app/naming-graph/translations.ts.backup-$(date +%Y%m%d-%H%M%S)"

echo "==================================="
echo "Cleanup: Remove 'Not available'"
echo "==================================="
echo ""

# Backup
echo "1. Creating backup..."
cp "$FILE" "$BACKUP"
echo "   ✅ Backup saved to: $BACKUP"
echo ""

# Count before
BEFORE=$(grep -c "Not available" "$FILE" || true)
echo "2. Current state:"
echo "   'Not available' occurrences: $BEFORE"
echo ""

# Remove all lines with 'Not available'
echo "3. Removing 'Not available' lines..."
sed -i.tmp "/Not available/d" "$FILE"
rm "${FILE}.tmp"

# Count after
AFTER=$(grep -c "Not available" "$FILE" || true)
echo "   ✅ Removed: $(($BEFORE - $AFTER)) lines"
echo "   Remaining: $AFTER"
echo ""

# Show sample of what changed
echo "4. Sample cleanup (eBay Plus):"
echo "---"
grep -A 10 "'eBay Plus':" "$FILE" | head -12
echo "---"
echo ""

# Verify TypeScript syntax
echo "5. Verifying TypeScript syntax..."
cd /Users/bradfischer/naming-studio/app/naming-graph
if npx tsc --noEmit translations.ts 2>/dev/null; then
  echo "   ✅ TypeScript syntax valid"
else
  echo "   ⚠️  TypeScript errors detected (may need interface update)"
fi
echo ""

echo "==================================="
echo "Cleanup Complete!"
echo "==================================="
echo ""
echo "Next steps:"
echo "1. Update ProgramTranslation interface to make market fields optional"
echo "2. Update UI components to check field existence: if (program.DE) { ... }"
echo "3. Test with regional exclusives"
echo ""
echo "To restore backup:"
echo "  cp $BACKUP $FILE"
