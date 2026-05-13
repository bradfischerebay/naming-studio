#!/usr/bin/env node

/**
 * eBay Program Scraper
 *
 * Automatically discovers eBay programs from:
 * 1. pages.ebay.com sitemap.xml
 * 2. help.ebay.com category pages
 *
 * Outputs: JSON file with discovered programs for manual review
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  sitemapUrls: [
    'https://pages.ebay.com/sitemap.xml',
    'https://pages.ebay.com/robots.txt',
  ],
  helpCategories: [
    'https://www.ebay.com/help/selling/listings?id=4081',
    'https://www.ebay.com/help/selling/fees-credits-invoices?id=4121',
    'https://www.ebay.com/help/selling/selling-tools?id=4122',
    'https://www.ebay.com/help/buying?id=4003',
    'https://www.ebay.com/help/account?id=4006',
    'https://www.ebay.com/help/policies?id=4205',
  ],
  outputFile: path.join(__dirname, '../data/discovered-programs.json'),
  logFile: path.join(__dirname, '../logs/scraper.log'),
  existingDataFile: path.join(__dirname, '../app/naming-graph/enriched-consolidated-DEDUPLICATED.ts'),
};

// Program name patterns to look for
const PROGRAM_PATTERNS = [
  /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:Program|Feature|Service|Tool|Badge|Protection|Guarantee)\b/g,
  /\beBay\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b/g,
  /\b(Seller|Buyer)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b/g,
  /\b(Promoted|Certified|Managed|Guaranteed|Authenticated)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b/g,
];

// URL patterns to include
const INCLUDE_URL_PATTERNS = [
  /pages\.ebay\.com\/[a-z-]+\/?$/,  // Simple program pages
  /pages\.ebay\.com\/[a-z-]+\/[a-z-]+\/?$/,  // Two-level pages
  /help\.ebay\.com\/article\//,  // Help articles
];

// URL patterns to exclude (promo codes, dates, etc.)
const EXCLUDE_URL_PATTERNS = [
  /\/promo\/\d{4}/,  // Dated promos
  /\/coupon\//,  // Coupon pages
  /\d{4}-\d{2}-\d{2}/,  // Dated pages
  /\/faq\/?$/,  // FAQ pages
  /\/terms\/?$/,  // Terms pages
  /\/privacy\/?$/,  // Privacy pages
];

// Discovered programs (in-memory)
const discoveredPrograms = new Map();
const existingPrograms = new Set();

// Logging
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;

  console.log(message);

  // Ensure logs directory exists
  const logsDir = path.dirname(CONFIG.logFile);
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  fs.appendFileSync(CONFIG.logFile, logMessage);
}

// Load existing programs from dataset
function loadExistingPrograms() {
  log('Loading existing programs from dataset...');

  try {
    const data = fs.readFileSync(CONFIG.existingDataFile, 'utf8');

    // Extract all "name" values from the TypeScript file
    const nameMatches = data.matchAll(/"name":\s*"([^"]+)"/g);

    for (const match of nameMatches) {
      existingPrograms.add(match[1].toLowerCase());
    }

    log(`Loaded ${existingPrograms.size} existing programs`);
  } catch (error) {
    log(`Error loading existing programs: ${error.message}`);
  }
}

// Fetch URL content
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Parse sitemap.xml
async function parseSitemap(url) {
  log(`Fetching sitemap: ${url}`);

  try {
    const xml = await fetchUrl(url);

    // Extract URLs from sitemap
    const urlMatches = xml.matchAll(/<loc>(.*?)<\/loc>/g);
    const urls = [];

    for (const match of urlMatches) {
      const discoveredUrl = match[1];

      // Check if URL matches include patterns
      const shouldInclude = INCLUDE_URL_PATTERNS.some(pattern => pattern.test(discoveredUrl));

      // Check if URL matches exclude patterns
      const shouldExclude = EXCLUDE_URL_PATTERNS.some(pattern => pattern.test(discoveredUrl));

      if (shouldInclude && !shouldExclude) {
        urls.push(discoveredUrl);
      }
    }

    log(`Found ${urls.length} potential program pages in sitemap`);
    return urls;
  } catch (error) {
    log(`Error parsing sitemap ${url}: ${error.message}`);
    return [];
  }
}

// Extract program names from text
function extractProgramNames(text, sourceUrl) {
  const programs = new Set();

  for (const pattern of PROGRAM_PATTERNS) {
    const matches = text.matchAll(pattern);

    for (const match of matches) {
      // Get the full program name (may be in different capture groups)
      const programName = match[0].trim();

      // Skip if too short or too long
      if (programName.length < 5 || programName.length > 100) continue;

      // Skip if it's just common words
      const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for'];
      if (commonWords.includes(programName.toLowerCase())) continue;

      programs.add(programName);
    }
  }

  return Array.from(programs);
}

// Analyze a URL for programs
async function analyzeUrl(url) {
  log(`Analyzing: ${url}`);

  try {
    const html = await fetchUrl(url);

    // Extract program names
    const programs = extractProgramNames(html, url);

    for (const program of programs) {
      const programKey = program.toLowerCase();

      // Skip if already in existing dataset
      if (existingPrograms.has(programKey)) {
        log(`  - SKIP (exists): ${program}`);
        continue;
      }

      // Skip if already discovered
      if (discoveredPrograms.has(programKey)) {
        // Just add this URL as another source
        discoveredPrograms.get(programKey).sources.push(url);
        continue;
      }

      // New program discovered
      log(`  - NEW: ${program}`);

      discoveredPrograms.set(programKey, {
        name: program,
        sources: [url],
        discoveredAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    log(`  Error analyzing ${url}: ${error.message}`);
  }
}

// Main scraper function
async function scrape() {
  log('='.repeat(80));
  log('eBay Program Scraper - Starting');
  log('='.repeat(80));

  // Step 1: Load existing programs
  loadExistingPrograms();

  // Step 2: Parse sitemaps
  const allUrls = [];

  for (const sitemapUrl of CONFIG.sitemapUrls) {
    const urls = await parseSitemap(sitemapUrl);
    allUrls.push(...urls);
  }

  log(`Total URLs to analyze: ${allUrls.length}`);

  // Step 3: Analyze URLs (batch processing to avoid overwhelming)
  const BATCH_SIZE = 10;
  const DELAY_MS = 1000;  // 1 second between batches

  for (let i = 0; i < allUrls.length; i += BATCH_SIZE) {
    const batch = allUrls.slice(i, i + BATCH_SIZE);

    log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1} of ${Math.ceil(allUrls.length / BATCH_SIZE)}`);

    await Promise.all(batch.map(url => analyzeUrl(url)));

    // Delay between batches
    if (i + BATCH_SIZE < allUrls.length) {
      await new Promise(resolve => setTimeout(resolve, DELAY_MS));
    }
  }

  // Step 4: Save results
  const results = {
    scrapedAt: new Date().toISOString(),
    existingProgramsCount: existingPrograms.size,
    newProgramsCount: discoveredPrograms.size,
    programs: Array.from(discoveredPrograms.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    ),
  };

  // Ensure data directory exists
  const dataDir = path.dirname(CONFIG.outputFile);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(CONFIG.outputFile, JSON.stringify(results, null, 2));

  log('='.repeat(80));
  log(`Scraping complete!`);
  log(`Existing programs: ${existingPrograms.size}`);
  log(`New programs discovered: ${discoveredPrograms.size}`);
  log(`Results saved to: ${CONFIG.outputFile}`);
  log('='.repeat(80));

  // Print summary
  if (discoveredPrograms.size > 0) {
    console.log('\nNewly Discovered Programs:');
    console.log('-'.repeat(80));

    for (const program of discoveredPrograms.values()) {
      console.log(`- ${program.name}`);
      console.log(`  Sources: ${program.sources.length} URL(s)`);
      console.log(`  First: ${program.sources[0]}`);
      console.log('');
    }
  }
}

// Help.ebay.com manual categories to review
function generateHelpCategoriesGuide() {
  const guide = `
# help.ebay.com Manual Review Guide

## Categories to Review

1. **Selling > Listings**
   - URL: https://www.ebay.com/help/selling/listings?id=4081
   - Look for: Listing tools, features, badges

2. **Selling > Fees, credits & invoices**
   - URL: https://www.ebay.com/help/selling/fees-credits-invoices?id=4121
   - Look for: Subscription programs, fee structures

3. **Selling > Selling tools**
   - URL: https://www.ebay.com/help/selling/selling-tools?id=4122
   - Look for: Seller Hub features, analytics tools

4. **Buying**
   - URL: https://www.ebay.com/help/buying?id=4003
   - Look for: Buyer protection programs, shopping tools

5. **Account**
   - URL: https://www.ebay.com/help/account?id=4006
   - Look for: Account features, security tools

6. **Policies**
   - URL: https://www.ebay.com/help/policies?id=4205
   - Look for: Policy programs, seller standards

## How to Extract Programs

1. Visit each category URL
2. Look for capitalized program names (e.g., "Seller Hub", "Promoted Listings")
3. Check sub-pages and articles
4. Note: Program name, description, URL
5. Add to discovered-programs.json manually

## Program Name Patterns to Look For

- [Feature Name] + "Program"
- [Feature Name] + "Service"
- [Feature Name] + "Tool"
- "eBay" + [Feature Name]
- [Feature Name] + "Badge"
- [Feature Name] + "Protection"
- [Feature Name] + "Guarantee"

## Example Finds

Good: "Volume Pricing Tool", "Listing Analytics", "Store Categories"
Bad: "FAQ", "Terms of Service", "Contact Us"
`;

  const guidePath = path.join(__dirname, '../docs/HELP_EBAY_REVIEW_GUIDE.md');
  const docsDir = path.dirname(guidePath);

  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  fs.writeFileSync(guidePath, guide);

  log(`Manual review guide created: ${guidePath}`);
}

// Run scraper
if (require.main === module) {
  scrape().catch(error => {
    log(`Fatal error: ${error.message}`);
    console.error(error);
    process.exit(1);
  });

  generateHelpCategoriesGuide();
}

module.exports = { scrape, loadExistingPrograms, extractProgramNames };
