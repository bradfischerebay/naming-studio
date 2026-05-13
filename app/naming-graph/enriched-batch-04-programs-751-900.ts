// Enriched GraphNode data for programs 751-900
// Source: translations.ts lines 751-900
// Research: Research-Session-Complete-2026-04-17.md
// Date: 2026-04-17

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

export const ENRICHED_BATCH_04: GraphNode[] = [
  // SHIPPING & DELIVERY (Lines 754-763)
  {
    id: "ebay-guaranteed-delivery",
    name: "eBay Guaranteed Delivery",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "Delivery guarantee program promising refunds if items don't arrive by estimated date",
    market: ["US", "UK", "CA"],
    year: 2018
  },
  {
    id: "simple-delivery",
    name: "Simple Delivery",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "UK-specific mandatory C2C shipping program simplifying seller delivery options",
    market: "UK",
    year: 2020
  },

  // EDUCATION & COMMUNITY (Lines 766-810)
  {
    id: "ebay-academy",
    name: "eBay Academy",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "education",
    desc: "Free educational platform offering seller training, best practices, and video tutorials",
    market: "global",
    year: 2018
  },
  {
    id: "export-academy",
    name: "Export Academy",
    type: "category",
    tier: "program",
    status: "current",
    parent: "education",
    desc: "Specialized training program teaching sellers how to expand internationally and cross-border",
    market: "global",
    year: 2019
  },
  {
    id: "ebay-community",
    name: "eBay Community",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "community",
    desc: "Discussion forums where buyers and sellers exchange advice, tips, and support",
    market: "global",
    year: 1999
  },
  {
    id: "feedback-forum",
    name: "Feedback Forum",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "community",
    desc: "Community forum dedicated to discussing feedback-related issues and disputes",
    market: ["US", "UK", "CA", "AU"],
    year: 2005
  },
  {
    id: "ebay-university",
    name: "eBay University",
    type: "category",
    tier: "program",
    status: "legacy",
    parent: "education",
    desc: "Former paid educational program offering in-person and online seller training courses",
    market: "US",
    year: 2005,
    renamedTo: "eBay Academy"
  },

  // SELLER STANDARDS (Lines 812-832)
  {
    id: "seller-performance-standards",
    name: "Seller Performance Standards",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "performance",
    desc: "Three-tier system evaluating sellers as Below Standard, Above Standard, or Top Rated based on metrics",
    market: "global",
    year: 2008
  },
  {
    id: "make-an-offer",
    name: "Make An Offer",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buying",
    desc: "Feature allowing buyers to negotiate prices by submitting offers below the listed price",
    market: "global",
    year: 2005
  },

  // STORE TIERS (Lines 835-890)
  {
    id: "store-tier-starter",
    name: "Store Tier - Starter",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "stores",
    desc: "Entry-level eBay Stores subscription tier with basic features and reduced fees",
    market: ["US", "AU"],
    year: 2015
  },
  {
    id: "store-tier-basic",
    name: "Store Tier - Basic",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "stores",
    desc: "Base subscription tier offering reduced final value fees and 250 free listings monthly",
    market: "global",
    year: 2001
  },
  {
    id: "store-tier-premium",
    name: "Store Tier - Premium",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "stores",
    desc: "Mid-tier subscription offering lower fees, 1,000 free listings, and advanced marketing tools",
    market: ["US", "DE", "FR", "IT", "CA"],
    year: 2001
  },
  {
    id: "store-tier-featured",
    name: "Store Tier - Featured",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "stores",
    desc: "Premium subscription tier with lowest fees, 10,000 free listings, and priority support",
    market: ["UK", "DE", "FR", "AU"],
    year: 2001
  },
  {
    id: "store-tier-anchor",
    name: "Store Tier - Anchor",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "stores",
    desc: "Top-tier subscription for high-volume sellers with deepest fee discounts and 25,000 free listings",
    market: ["US", "UK", "CA", "AU"],
    year: 2001
  },
  {
    id: "store-tier-enterprise",
    name: "Store Tier - Enterprise",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "stores",
    desc: "Highest subscription tier for enterprise sellers with custom pricing and dedicated support",
    market: "US",
    year: 2018
  },
  {
    id: "store-tier-platin",
    name: "Store Tier - Platin",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "stores",
    desc: "Germany-exclusive premium store tier above Featured with specialized benefits",
    market: "DE",
    year: 2015
  },
  {
    id: "store-tier-premium-plus",
    name: "Store Tier - Premium Plus",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "stores",
    desc: "Italy-exclusive enhanced premium tier positioned between Premium and Featured",
    market: "IT",
    year: 2016
  },

  // STORE FEATURES (Lines 893-918)
  {
    id: "store-newsletters",
    name: "Store Newsletters",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "stores",
    desc: "Email marketing tool allowing store subscribers to send promotional newsletters to followers",
    market: "global",
    year: 2005
  },
  {
    id: "promoted-stores",
    name: "Promoted Stores",
    type: "advertising",
    tier: "product",
    status: "current",
    parent: "advertising",
    desc: "Advertising program promoting entire eBay Stores in search results and category pages",
    market: "global",
    year: 2021
  },
  {
    id: "ai-banner",
    name: "AI Banner",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "stores",
    desc: "AI-powered tool generating custom store banner images from text descriptions",
    market: "US",
    year: 2024
  },

  // MARKETING TOOLS - DISCOUNTS MANAGER (Lines 921-999)
  {
    id: "discounts-manager",
    name: "Discounts Manager",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "marketing",
    desc: "Centralized promotional tool managing all discount types including sales, coupons, and volume pricing",
    market: "global",
    year: 2019
  },
  {
    id: "order-discounts",
    name: "Order Discounts",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Promotional feature offering cart-level discounts based on total order value or item quantity",
    market: "global",
    year: 2018
  },
  {
    id: "sale-events",
    name: "Sale Events",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Time-limited promotional campaigns with percentage or fixed-amount discounts on selected items",
    market: "global",
    year: 2016
  },
  {
    id: "coupons",
    name: "Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Coded discount vouchers offering percentage or dollar-off savings to targeted buyer segments",
    market: "global",
    year: 2014
  },
  {
    id: "volume-pricing",
    name: "Volume Pricing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Bulk discount feature offering reduced per-unit pricing when buyers purchase multiple quantities",
    market: "global",
    year: 2012
  },
  {
    id: "offers-to-buyers",
    name: "Offers to Buyers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Seller-initiated discount offers sent directly to targeted buyers or watchers of listings",
    market: "global",
    year: 2017
  },
  {
    id: "best-offer",
    name: "Best Offer",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buying",
    desc: "Negotiation feature enabling sellers to accept, decline, or counter buyer price proposals",
    market: "global",
    year: 2004
  }
];
