// Enriched GraphNode data for programs 1151-1250
// Batch 05B: Deals programs, seller tools, authentication sub-programs, performance tiers
// Source: translations.ts lines 1151-1250 + Research-Session-Complete-2026-04-17.md

export interface GraphNode {
  id: string
  name: string
  type: "masterbrand" | "category" | "advertising" | "trust" | "impact" | "developer" | "regional"
  tier: "master" | "umbrella" | "t1" | "t2" | "t3" | "product" | "program" | "feature" | "legal" | "organization" | "publication" | "event" | "campaign" | "vertical" | "platform" | "variant"
  status: "current" | "legacy" | "renamed"
  parent?: string
  desc: string
  market?: "US" | "UK" | "DE" | "FR" | "IT" | "AU" | "CA" | "global" | string[]
  renamedFrom?: string
  renamedTo?: string
  year?: number
}

export const ENRICHED_BATCH_05B: GraphNode[] = [
  // DEALS PROGRAMS
  {
    id: "deals-seller-portal",
    name: "Deals Seller Portal",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "deals",
    desc: "Seller dashboard for managing participation in eBay Deals and retail promotions, allowing creation of up to 200 deals per submission window",
    market: "global",
    year: 2018
  },
  {
    id: "spotlight-deals",
    name: "Spotlight Deals",
    type: "category",
    tier: "program",
    status: "current",
    parent: "deals",
    desc: "Invitation-only promotional program featuring select high-performing sellers in special deal placements",
    market: "global",
    year: 2016
  },
  {
    id: "ebay-exclusive-coupons",
    name: "eBay Exclusive Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "deals",
    desc: "Promotional coupon system offering percentage or dollar-off discounts to buyers across select categories",
    market: "global",
    year: 2019
  },
  {
    id: "brand-outlet",
    name: "Brand Outlet",
    type: "category",
    tier: "program",
    status: "current",
    parent: "deals",
    desc: "Curated destination featuring brand-direct deals and outlet-style discounts from official brand partners",
    market: "global",
    year: 2010
  },

  // SUSTAINABILITY PROGRAMS
  {
    id: "preloved-partner-program",
    name: "Preloved Partner Program",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "sustainability",
    desc: "UK program for vetted second-hand fashion sellers offering free 3-day postage and quality-checked preloved items",
    market: ["US", "UK"],
    year: 2023
  },
  {
    id: "certified-recycler-program",
    name: "Certified Recycler Program",
    type: "impact",
    tier: "program",
    status: "legacy",
    parent: "sustainability",
    desc: "Electronics recycling initiative connecting users with responsible e-waste recyclers through the Rethink Initiative",
    market: "global",
    year: 2008,
    renamedTo: "Rethink Initiative"
  },
  {
    id: "pro-trader-program",
    name: "Pro-Trader Program",
    type: "category",
    tier: "program",
    status: "current",
    parent: "sellertools",
    desc: "UK and Germany seller support program offering one-on-one coaching, marketing tools training, and custom business plans",
    market: ["UK", "DE"],
    year: 2021
  },

  // SELLER TOOLS - FILE MANAGEMENT
  {
    id: "seller-hub-reports",
    name: "Seller Hub Reports",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Comprehensive reporting suite providing downloadable CSV/XLSX reports on sales, performance, traffic, and business metrics",
    market: "global",
    year: 2017
  },
  {
    id: "sales-reports-plus",
    name: "Sales Reports Plus",
    type: "category",
    tier: "product",
    status: "legacy",
    parent: "sellertools",
    desc: "Legacy sales reporting tool offering downloadable transaction data and analytics, replaced by Seller Hub Reports",
    market: ["US", "UK", "CA"],
    year: 2008,
    renamedTo: "Seller Hub Reports"
  },

  // SELLER TOOLS - SPECIALIZED
  {
    id: "merchant-integration-platform",
    name: "Merchant Integration Platform",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer",
    desc: "Enterprise bulk listing and inventory management platform for high-volume merchants with flat-file upload capabilities",
    market: "global",
    year: 2011
  },
  {
    id: "ebay-export",
    name: "eBay Export",
    type: "category",
    tier: "program",
    status: "current",
    parent: "international",
    desc: "Growth program helping businesses expand internationally with support for managing cross-border sales across 190 markets",
    market: "global",
    year: 2012
  },
  {
    id: "fitment-plus",
    name: "Fitment Plus",
    type: "category",
    tier: "product",
    status: "current",
    parent: "motors",
    desc: "eBay Motors tool providing vehicle fitment compatibility data for parts and accessories listings",
    market: ["US"],
    year: 2022
  },
  {
    id: "fitment-plus-auto",
    name: "Fitment Plus Auto",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "motors",
    desc: "Automated fitment data system that auto-updates Parts & Accessories listings with latest vehicle compatibility information",
    market: ["US"],
    year: 2025
  },
  {
    id: "cbt-seller-dashboard",
    name: "CBT Seller Dashboard",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "international",
    desc: "Cross Border Trade dashboard for monitoring export performance, seller standards, and international sales metrics",
    market: "global",
    year: 2016
  },

  // AUTHENTICATION SUB-PROGRAMS
  {
    id: "authenticity-guarantee-watches",
    name: "Authenticity Guarantee - Watches",
    type: "trust",
    tier: "variant",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "Third-party authentication service for luxury watches over $2,000 verifying authenticity before delivery",
    market: ["US", "UK", "DE", "FR", "IT"],
    year: 2020
  },
  {
    id: "authenticity-guarantee-sneakers",
    name: "Authenticity Guarantee - Sneakers",
    type: "trust",
    tier: "variant",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "Authentication service for sneakers over $100 using expert verification and condition grading",
    market: "global",
    year: 2020
  },
  {
    id: "authenticity-guarantee-handbags",
    name: "Authenticity Guarantee - Handbags",
    type: "trust",
    tier: "variant",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "Luxury handbag authentication program verifying designer bags over $500 before shipment to buyer",
    market: ["US", "UK", "DE", "FR", "IT", "AU"],
    year: 2021
  },
  {
    id: "authenticity-guarantee-jewelry",
    name: "Authenticity Guarantee - Jewelry",
    type: "trust",
    tier: "variant",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "GIA-partnered jewelry authentication service for fine jewelry and gemstones in US and UK markets",
    market: ["US", "UK"],
    year: 2022
  },
  {
    id: "authenticity-guarantee-trading-cards",
    name: "Authenticity Guarantee - Trading Cards",
    type: "trust",
    tier: "variant",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "PSA-partnered trading card authentication for high-value sports and collectible cards in North America",
    market: ["US", "CA"],
    year: 2021
  },
  {
    id: "authenticity-guarantee-streetwear",
    name: "Authenticity Guarantee - Streetwear",
    type: "trust",
    tier: "variant",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "Authentication program for high-end streetwear and fashion items verifying designer apparel authenticity",
    market: ["US", "UK", "DE"],
    year: 2023
  },

  // SELLER PERFORMANCE TIERS
  {
    id: "above-standard",
    name: "Above Standard",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "seller-performance",
    desc: "Middle tier of seller performance standards indicating good service metrics and customer satisfaction",
    market: "global",
    year: 2008
  },
  {
    id: "below-standard",
    name: "Below Standard",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "seller-performance",
    desc: "Lowest tier of seller performance requiring improvement in service metrics to avoid selling restrictions",
    market: "global",
    year: 2008
  },
  {
    id: "top-rated-plus",
    name: "Top Rated Plus",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "top-rated-seller",
    desc: "Badge for individual listings meeting Top Rated Seller criteria including fast free shipping and returns",
    market: ["US", "DE", "FR", "IT", "CA", "AU"],
    year: 2013
  },
  {
    id: "ebay-premium-service",
    name: "eBay Premium Service",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "seller-performance",
    desc: "UK-exclusive badge replacing Top Rated Plus, highlighting listings with excellent service and fast delivery",
    market: ["UK"],
    year: 2021
  },
  {
    id: "ebay-top-service",
    name: "eBay Top-Service",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "seller-performance",
    desc: "Germany-exclusive service badge launched February 2024 replacing eBay Plus seller badges for top performers",
    market: ["DE"],
    year: 2024
  },

  // FREE SHIPPING BADGES
  {
    id: "free-2-day-shipping",
    name: "Free 2-day Shipping",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Listing badge indicating free delivery within 2 business days, replacing generic Fast N Free messaging",
    market: ["US"],
    year: 2023
  },
  {
    id: "free-3-day-shipping",
    name: "Free 3-day Shipping",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Listing badge for free 3-day delivery with localized variants across markets",
    market: ["US", "UK", "DE"],
    year: 2023
  },
  {
    id: "free-4-day-shipping",
    name: "Free 4-day Shipping",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Listing badge for free 4-day delivery option in select markets",
    market: ["US"],
    year: 2023
  },

  // REFURBISHED ADDITIONAL
  {
    id: "seller-refurbished",
    name: "Seller Refurbished",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "refurbished",
    desc: "Legacy condition label for seller-restored items being phased out in favor of eBay Refurbished program",
    market: "global",
    year: 2005,
    renamedTo: "eBay Refurbished"
  }
];
