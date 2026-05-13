// Enriched GraphNode Data - Wave 3 Batch Q
// Created: 2026-04-17
// Programs: 50 NEW unenriched programs from translations.ts
// Source: Research-Session-Complete-2026-04-17.md + Official eBay Documentation

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

export const ENRICHED_WAVE3_Q: GraphNode[] = [
  // ===== PROTECTION & TRUST PROGRAMS =====
  {
    id: "buyer-protection",
    name: "Buyer Protection",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "UK-specific buyer protection framework providing purchase coverage and dispute resolution.",
    market: "UK",
    year: 2010
  },
  {
    id: "issue-resolution-center",
    name: "Issue Resolution Center",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "resolution-center",
    desc: "Dispute management tool for escalating issues requiring eBay intervention after Resolution Center attempts.",
    market: "US",
    year: 2012
  },
  {
    id: "certified-recycled",
    name: "Certified Recycled",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "sustainability",
    desc: "UK program certifying products made from recycled materials, promoting circular economy.",
    market: "UK",
    year: 2021
  },

  // ===== SHIPPING & FULFILLMENT =====
  {
    id: "ebay-collection-points",
    name: "eBay Collection Points",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "Network of physical pickup locations in UK and AU for secure package collection.",
    market: ["UK", "AU"],
    year: 2016
  },
  {
    id: "in-store-pickup",
    name: "In-Store Pickup",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Option allowing buyers to collect purchases from seller's physical retail location.",
    market: "US",
    year: 2014
  },
  {
    id: "managed-delivery",
    name: "Managed Delivery",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "US delivery service with eBay-managed logistics and tracking for large items.",
    market: "US",
    year: 2019
  },
  {
    id: "logistica-ebay-orange-connex",
    name: "Logistica eBay by Orange Connex",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "Italy-exclusive fulfillment service operated by Orange Connex for eBay sellers.",
    market: "IT",
    year: 2020
  },
  {
    id: "ebay-international-standard-delivery",
    name: "eBay International Standard Delivery",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-international-shipping",
    desc: "Standard-tier international shipping option within eBay International Shipping program.",
    market: "US",
    year: 2020
  },
  {
    id: "ebay-guaranteed-delivery",
    name: "eBay Guaranteed Delivery",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "Delivery guarantee program in US and AU promising delivery by specified date or refund.",
    market: ["US", "AU"],
    year: 2017
  },
  {
    id: "shipping-labels",
    name: "Shipping Labels",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Integrated label printing service with discounted carrier rates through eBay.",
    market: "global",
    year: 2005
  },
  {
    id: "ebay-standard-envelope",
    name: "eBay Standard Envelope",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Low-cost tracked shipping option for small, flat items like trading cards and coins.",
    market: "US",
    year: 2021
  },

  // ===== DISCOVERY & SEARCH =====
  {
    id: "image-search",
    name: "Image Search",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Visual search allowing buyers to upload images to find similar products on eBay.",
    market: ["US", "UK", "CA", "AU"],
    year: 2017
  },
  {
    id: "find-it-on-ebay",
    name: "Find It On eBay",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Mobile browser extension enabling image search from any website to find items on eBay.",
    market: ["US", "UK", "CA", "AU"],
    year: 2018
  },
  {
    id: "shop-by-category",
    name: "Shop by Category",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discovery",
    desc: "Hierarchical category navigation system for browsing eBay's product taxonomy.",
    market: "global",
    year: 1995
  },
  {
    id: "saved-searches",
    name: "Saved Searches",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Feature allowing buyers to save search queries and receive alerts for new matching listings.",
    market: "global",
    year: 2003
  },
  {
    id: "recently-viewed",
    name: "Recently Viewed",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Personalized browsing history showing items user has recently viewed.",
    market: "global",
    year: 2010
  },

  // ===== COLLECTIBLES & VERTICALS =====
  {
    id: "tcgplayer",
    name: "TCGplayer",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "collectibles",
    desc: "Trading card marketplace acquired by eBay, integrated for pricing data and authentication.",
    market: ["US", "UK", "CA"],
    year: 2022
  },
  {
    id: "goldin-auctions",
    name: "Goldin Auctions",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "collectibles",
    desc: "Premium collectibles auction house acquired by eBay for high-value sports cards and memorabilia.",
    market: "global",
    year: 2021
  },

  // ===== EDUCATION & COMMUNITY =====
  {
    id: "ebay-university",
    name: "eBay University",
    type: "category",
    tier: "program",
    status: "legacy",
    parent: "education",
    desc: "Legacy seller education program offering workshops and certifications, replaced by eBay Academy.",
    market: "US",
    year: 2004,
    renamedTo: "ebay-academy"
  },
  {
    id: "feedback-forum",
    name: "Feedback Forum",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "trust",
    desc: "Public feedback and rating system for buyers and sellers, core trust mechanism since 1996.",
    market: ["US", "UK", "CA", "AU"],
    year: 1996
  },

  // ===== MARKETING TOOLS - DISCOUNTS MANAGER SUB-FEATURES =====
  {
    id: "order-discounts",
    name: "Order Discounts",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Seller tool for creating cart-level discounts based on order value or item quantity.",
    market: "global",
    year: 2018
  },
  {
    id: "sale-events",
    name: "Sale Events",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "promotions-manager",
    desc: "Time-based promotional events with markdown pricing, replaced Markdown Manager.",
    market: "global",
    year: 2024,
    renamedFrom: "markdown-manager"
  },
  {
    id: "coupons",
    name: "Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Coded coupon system for percentage or fixed-amount discounts on seller inventory.",
    market: "global",
    year: 2016
  },
  {
    id: "volume-pricing",
    name: "Volume Pricing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Multi-buy discount feature encouraging bulk purchases with tiered pricing.",
    market: "global",
    year: 2015
  },
  {
    id: "offers-to-buyers",
    name: "Offers to Buyers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Seller-initiated offer system targeting watchers and previous buyers with special pricing.",
    market: "global",
    year: 2013
  },
  {
    id: "shipping-discounts",
    name: "Shipping Discounts",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Combined shipping and multi-item shipping discount configuration tool.",
    market: "global",
    year: 2010
  },
  {
    id: "coded-coupons",
    name: "Coded Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Alphanumeric coupon codes for targeted promotions and marketing campaigns.",
    market: "global",
    year: 2016
  },
  {
    id: "seller-initiated-offers",
    name: "Seller Initiated Offers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Proactive offer system allowing sellers to send discount proposals to engaged buyers.",
    market: "global",
    year: 2013
  },
  {
    id: "send-coupon",
    name: "Send Coupon",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Tool for distributing coupon codes to specific buyer segments via eBay messaging.",
    market: "global",
    year: 2017
  },
  {
    id: "print-coupons",
    name: "Print Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Physical coupon generation for in-person events and offline marketing.",
    market: "global",
    year: 2015
  },
  {
    id: "buyer-groups",
    name: "Buyer Groups",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Seller segmentation tool for targeting specific buyer cohorts with personalized offers.",
    market: "global",
    year: 2019
  },
  {
    id: "store-email-campaigns",
    name: "Store Email Campaigns",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-stores",
    desc: "Email marketing tool for eBay Store subscribers, enabling newsletters and promotional emails.",
    market: "global",
    year: 2012
  },

  // ===== CURATED DEALS & MARKETING PROGRAMS =====
  {
    id: "featured-deals",
    name: "Featured Deals",
    type: "category",
    tier: "program",
    status: "current",
    parent: "ebay-deals",
    desc: "Premium placement tier within eBay Deals for high-visibility promotional offers.",
    market: ["US", "UK", "CA", "AU"],
    year: 2019
  },
  {
    id: "weekly-deals",
    name: "Weekly Deals",
    type: "category",
    tier: "program",
    status: "current",
    parent: "ebay-deals",
    desc: "Recurring weekly promotional calendar within eBay Deals program.",
    market: ["US", "UK", "CA", "AU"],
    year: 2018
  },
  {
    id: "deals-seller-portal",
    name: "Deals Seller Portal",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "ebay-deals",
    desc: "Self-service seller interface for submitting and managing deals program participation.",
    market: ["US", "UK", "CA", "AU"],
    year: 2020
  },
  {
    id: "spotlight-deals",
    name: "Spotlight Deals",
    type: "category",
    tier: "program",
    status: "current",
    parent: "ebay-deals",
    desc: "Hero placement tier within eBay Deals featuring highest-impact promotional offers.",
    market: ["US", "UK", "CA", "AU"],
    year: 2021
  },
  {
    id: "ebay-exclusive-coupons",
    name: "eBay Exclusive Coupons",
    type: "category",
    tier: "program",
    status: "current",
    parent: "marketing",
    desc: "Platform-funded coupon program offering buyer incentives across multiple sellers.",
    market: "global",
    year: 2017
  },
  {
    id: "preloved-partner-program",
    name: "Preloved Partner Program",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "sustainability",
    desc: "Partnership program with resale retailers promoting circular economy and sustainability.",
    market: ["US", "UK"],
    year: 2023
  },
  {
    id: "certified-recycler-program",
    name: "Certified Recycler Program",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "sustainability",
    desc: "Seller certification for electronics recyclers meeting environmental and data security standards.",
    market: "US",
    year: 2019
  },

  // ===== SELLER TOOLS & REPORTS =====
  {
    id: "seller-hub-reports",
    name: "Seller Hub Reports",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Analytics dashboard within Seller Hub providing sales, traffic, and performance reporting.",
    market: "global",
    year: 2017
  },
  {
    id: "sales-reports-plus",
    name: "Sales Reports Plus",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Enhanced reporting tool with advanced filters, exports, and historical data access.",
    market: ["US", "UK", "CA"],
    year: 2018
  },
  {
    id: "merchant-integration-platform",
    name: "Merchant Integration Platform",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer",
    desc: "API platform for enterprise sellers to integrate inventory, orders, and fulfillment systems.",
    market: "global",
    year: 2015
  },
  {
    id: "cbt-seller-dashboard",
    name: "CBT Seller Dashboard",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "international",
    desc: "Cross Border Trade analytics dashboard showing international sales performance and opportunities.",
    market: "global",
    year: 2016
  },

  // ===== AUTHENTICATION VARIANTS =====
  {
    id: "authenticity-guarantee-jewelry",
    name: "Authenticity Guarantee - Jewelry",
    type: "trust",
    tier: "variant",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "Third-party authentication service for fine jewelry and gemstones over threshold values.",
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
    desc: "Professional grading and authentication for sports and collectible trading cards.",
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
    desc: "Authentication service for high-value streetwear and designer fashion items.",
    market: ["US", "UK", "DE"],
    year: 2023
  },

  // ===== SELLER PERFORMANCE & BADGES =====
  {
    id: "free-2-day-shipping",
    name: "Free 2-day Shipping",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "shipping-badges",
    desc: "Badge for listings offering free delivery within 2 business days.",
    market: "US",
    year: 2023
  },
  {
    id: "free-3-day-shipping",
    name: "Free 3-day Shipping",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "shipping-badges",
    desc: "Badge for listings offering free delivery within 3 business days.",
    market: ["US", "UK", "DE"],
    year: 2023
  },
  {
    id: "free-4-day-shipping",
    name: "Free 4-day Shipping",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "shipping-badges",
    desc: "Badge for listings offering free delivery within 4 business days.",
    market: "US",
    year: 2023
  },

  // ===== INTERNATIONAL SHIPPING =====
  {
    id: "ebay-speedpak",
    name: "eBay SpeedPAK",
    type: "category",
    tier: "program",
    status: "current",
    parent: "ebay-international-shipping",
    desc: "International shipping solution for cross-border sales from China to global markets.",
    market: ["UK", "DE", "FR", "IT", "CA", "AU"],
    year: 2016
  },

  // ===== CONDITION STATES =====
  {
    id: "seller-refurbished",
    name: "Seller Refurbished",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "conditions",
    desc: "Condition state for items refurbished by seller (not manufacturer), without eBay warranty.",
    market: "global",
    year: 2012
  }
]
