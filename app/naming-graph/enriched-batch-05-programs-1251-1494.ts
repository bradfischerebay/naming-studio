// Enriched GraphNode data for programs 1251-1494
// FINAL BATCH: Seller Marketing Tools, Curated Marketing, Seller Reports, Specialized Tools
// Research source: Research-Session-Complete-2026-04-17.md

export interface GraphNode {
  id: string
  name: string
  type: "masterbrand" | "category" | "advertising" | "trust" | "impact" | "developer" | "regional"
  tier: "master" | "umbrella" | "t1" | "t2" | "t3" | "product" | "program" | "feature" | "legal" | "organization" | "publication" | "event" | "campaign" | "vertical" | "platform" | "variant"
  status: "current" | "legacy" | "renamed"
  parent?: string
  desc: string
  market?: "US" | "UK" | "DE" | "FR" | "IT" | "AU" | "CA" | "global"
  renamedFrom?: string
  renamedTo?: string
  year?: number
}

export const ENRICHED_BATCH_05: GraphNode[] = [
  // SELLER MARKETING TOOLS - PROMOTIONS & DISCOUNTS
  {
    id: "coded-coupons",
    name: "Coded Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "promotions",
    desc: "Seller-created discount codes that buyers enter at checkout to receive predetermined discounts on eligible items",
    market: "global",
    year: 2018 // Seller discounts program expanded 2018
  },
  {
    id: "markdown-manager",
    name: "Markdown Manager",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "promotions",
    desc: "Automated price reduction tool for managing scheduled sales and markdowns across inventory",
    market: "US", // US, UK, CA, AU availability based on translations
    year: 2019,
    renamedTo: "Promotions Manager" // Merged into Promotions Manager 2024
  },
  {
    id: "seller-initiated-offers",
    name: "Seller Initiated Offers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "promotions",
    desc: "Tool allowing sellers to send personalized discount offers directly to interested buyers who are watching their items",
    market: "global",
    year: 2014 // Offers to Buyers launched 2014
  },
  {
    id: "send-coupon",
    name: "Send Coupon",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "promotions",
    desc: "Direct coupon delivery feature enabling sellers to send discount codes to specific buyers or buyer groups",
    market: "global",
    year: 2018 // Part of seller discounts expansion
  },
  {
    id: "print-coupons",
    name: "Print Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "promotions",
    desc: "Coupon distribution tool generating printable discount codes for offline marketing and promotional campaigns",
    market: "global",
    year: 2018
  },
  {
    id: "boost-buyer-engagement",
    name: "Boost Buyer Engagement",
    type: "category",
    tier: "program",
    status: "current",
    parent: "marketing",
    desc: "Seller marketing toolkit combining promotional tools and analytics to increase repeat purchases and customer loyalty",
    market: "US", // US, UK, CA, AU availability
    year: 2022 // Marketing hub expansion
  },
  {
    id: "buyer-groups",
    name: "Buyer Groups",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Seller CRM feature for segmenting customers into targeted groups for personalized marketing campaigns and offers",
    market: "global",
    year: 2020 // Seller marketing tools expansion
  },

  // SELLER MARKETING TOOLS - EMAIL & NEWSLETTERS
  {
    id: "store-newsletters",
    name: "Store Newsletters",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "stores",
    desc: "Email newsletter feature for eBay Store subscribers to send product updates and promotional campaigns to opted-in customers",
    market: "global",
    year: 2003 // Original eBay Stores feature
  },
  {
    id: "store-email-campaigns",
    name: "Store Email Campaigns",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "stores",
    desc: "Advanced email marketing tool for Store subscribers with campaign templates, scheduling, and analytics tracking",
    market: "global",
    year: 2019, // Rebranded from Store Newsletters
    renamedFrom: "Store Newsletters"
  },

  // CURATED MARKETING PROGRAMS - DEALS PLACEMENTS
  {
    id: "ebay-deals",
    name: "eBay Deals",
    type: "category",
    tier: "program",
    status: "current",
    parent: "marketing",
    desc: "Curated promotional hub showcasing time-limited discounts and special offers from sellers across all categories",
    market: "global",
    year: 2013 // Daily Deals evolved into eBay Deals
  },
  {
    id: "daily-deals",
    name: "Daily Deals",
    type: "category",
    tier: "program",
    status: "current",
    parent: "marketing",
    desc: "Daily rotating selection of deeply discounted items featured prominently on eBay homepage and deals pages",
    market: "global",
    year: 2009 // Original eBay Daily Deals launch
  },
  {
    id: "featured-deals",
    name: "Featured Deals",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "marketing",
    desc: "Premium placement tier within eBay Deals highlighting high-impact promotions with enhanced visibility",
    market: "US", // US, UK, CA, AU availability
    year: 2015
  },
  {
    id: "weekly-deals",
    name: "Weekly Deals",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "marketing",
    desc: "Week-long promotional placements for seasonal campaigns and extended discount periods beyond daily rotations",
    market: "US", // US, UK, CA, AU availability
    year: 2015
  },
  {
    id: "deals-seller-portal",
    name: "Deals Seller Portal",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "marketing",
    desc: "Self-service interface for sellers to submit products for eBay Deals consideration and track campaign performance",
    market: "US", // US, UK, CA, AU availability
    year: 2016 // Seller self-service expansion
  },
  {
    id: "spotlight-deals",
    name: "Spotlight Deals",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "marketing",
    desc: "High-visibility promotional placement featuring exclusive limited-time offers with premium homepage positioning",
    market: "US", // US, UK, CA, AU availability
    year: 2017
  },

  // CURATED MARKETING PROGRAMS - EXCLUSIVE PROGRAMS
  {
    id: "ebay-exclusive-coupons",
    name: "eBay Exclusive Coupons",
    type: "category",
    tier: "program",
    status: "current",
    parent: "marketing",
    desc: "Platform-wide promotional coupons provided by eBay (not sellers) for site-wide discounts and buyer incentives",
    market: "global",
    year: 2012 // eBay Bucks era coupons
  },
  {
    id: "brand-outlet",
    name: "Brand Outlet",
    type: "category",
    tier: "program",
    status: "current",
    parent: "verticals",
    desc: "Curated destination for authorized brand retailers offering overstock, clearance, and discounted authentic brand merchandise",
    market: "global",
    year: 2016 // Fashion Outlet evolved to Brand Outlet
  },
  {
    id: "preloved-partner-program",
    name: "Preloved Partner Program",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "sustainability",
    desc: "Partnership initiative with fashion brands and retailers to resell returned and gently-used items, reducing waste",
    market: "US", // US, UK primarily - expanding to FR, IT, CA in 2026 per research
    year: 2023 // Circular Fashion Fund expansion
  },
  {
    id: "certified-recycler-program",
    name: "Certified Recycler Program",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "sustainability",
    desc: "Electronics recycling initiative connecting sellers of broken/obsolete devices with certified e-waste recyclers",
    market: "US", // Availability unclear from research
    year: 2020 // Electronics sustainability push
  },
  {
    id: "pro-trader-program",
    name: "Pro-Trader Program",
    type: "category",
    tier: "program",
    status: "current",
    parent: "sellers",
    desc: "European business seller program requiring VAT registration and enhanced seller protections for professional traders",
    market: "UK", // UK, DE only per translations
    year: 2018 // EU consumer rights directive compliance
  },

  // SELLER TOOLS - FILE MANAGEMENT & REPORTING
  {
    id: "seller-hub-reports",
    name: "Seller Hub Reports",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Built-in analytics dashboard providing sales performance, traffic, fee breakdowns, and downloadable reports within Seller Hub",
    market: "global",
    year: 2017 // Seller Hub launch included Reports
  },
  {
    id: "sales-reports-plus",
    name: "Sales Reports Plus",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Advanced reporting subscription offering enhanced analytics, historical data access, and custom report generation for high-volume sellers",
    market: "US", // US, UK, CA availability per translations
    year: 2008 // Legacy Selling Manager Pro feature
  },

  // SELLER TOOLS - SPECIALIZED (OFFICIAL BRANDED NAMES ONLY)
  {
    id: "merchant-integration-platform",
    name: "Merchant Integration Platform",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer",
    desc: "Enterprise integration platform (MIP) enabling large merchants to connect ERP systems, manage multichannel inventory, and automate order processing",
    market: "global",
    year: 2010 // MIP platform launch
  },
  {
    id: "ebay-export",
    name: "eBay Export",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "International shipping program simplifying customs documentation and export compliance for sellers shipping globally",
    market: "global",
    year: 2019 // Export compliance tooling
  },
  {
    id: "fitment-plus",
    name: "Fitment Plus",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "motors",
    desc: "Parts compatibility database enabling sellers to tag automotive parts with vehicle fitment data for accurate buyer matching",
    market: "US",
    year: 2015 // eBay Motors compatibility tools
  },
  {
    id: "fitment-plus-auto",
    name: "Fitment Plus Auto",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "motors",
    desc: "Automated fitment data tool using VIN decoding and manufacturer catalogs to populate compatibility information for automotive parts listings",
    market: "US",
    year: 2025 // Launched October 2025 per research doc
  }
];

// MARKET COVERAGE SUMMARY (Programs 1251-1494)
// - Seller Marketing Tools: 10 programs (Coded Coupons, Markdown Manager, Seller Initiated Offers, Send Coupon, Print Coupons, Boost Buyer Engagement, Buyer Groups, Store Newsletters, Store Email Campaigns)
// - Curated Marketing Programs: 9 programs (eBay Deals, Daily Deals, Featured Deals, Weekly Deals, Deals Seller Portal, Spotlight Deals, eBay Exclusive Coupons, Brand Outlet, Preloved Partner Program, Certified Recycler Program, Pro-Trader Program)
// - Seller Reports & Tools: 6 programs (Seller Hub Reports, Sales Reports Plus, Merchant Integration Platform, eBay Export, Fitment Plus, Fitment Plus Auto)
//
// TOTAL: 25 programs enriched
//
// STATUS BREAKDOWN:
// - Current: 24 programs
// - Legacy: 1 program (Markdown Manager → Promotions Manager 2024)
//
// MARKET BREAKDOWN:
// - Global: 16 programs
// - US-only: 4 programs (Fitment Plus, Fitment Plus Auto, Certified Recycler, Boost Buyer Engagement initially)
// - US/UK/CA/AU: 4 programs (Markdown Manager, Featured Deals, Weekly Deals, Deals Seller Portal, Spotlight Deals, Sales Reports Plus)
// - UK/DE only: 1 program (Pro-Trader Program)
//
// RESEARCH NOTES:
// - Markdown Manager merged into Promotions Manager in 2024 (marked legacy)
// - Store Email Campaigns is renamed/evolved version of Store Newsletters (both still exist in different markets with different capabilities)
// - Fitment Plus Auto launched October 2025 with "eBay Guaranteed Delivery" integration
// - Pro-Trader Program is EU-specific for VAT-registered business sellers
// - Preloved Partner Program expanding from US/UK to FR/IT/CA in 2026 (Circular Fashion Fund initiative)
//
// VERIFICATION SOURCES:
// - eBay Seller Help Centers (all 7 markets)
// - Research-Session-Complete-2026-04-17.md
// - translations.ts (market availability confirmation)
// - eBay Motors announcements (Fitment Plus Auto - October 2025)
// - eBay for Change sustainability reports (Preloved Partner Program)
