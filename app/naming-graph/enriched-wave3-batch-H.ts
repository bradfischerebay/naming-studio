// eBay Naming Graph - Enriched Wave 3 Batch H
// 50 NEW unenriched programs from translations.ts
// Created: 2026-04-17
// Source: translations.ts + research

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

export const ENRICHED_WAVE3_H: GraphNode[] = [
  // ===== DISCOVERY & SEARCH FEATURES =====
  {
    id: "saved-searches",
    name: "Saved Searches",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Feature allowing buyers to save search criteria and receive notifications when matching items are listed.",
    market: "global",
    year: 2005
  },
  {
    id: "recently-viewed",
    name: "Recently Viewed",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Personalized feature displaying items a buyer has recently browsed, enabling easy return to previously viewed listings.",
    market: "global",
    year: 2008
  },
  {
    id: "find-it-on-ebay",
    name: "Find It On eBay",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discovery",
    desc: "Mobile image recognition feature allowing buyers to photograph items and find similar listings on eBay.",
    market: ["US", "UK", "CA", "AU"],
    year: 2018
  },

  // ===== SELLER PERFORMANCE FEATURES =====
  {
    id: "below-standard",
    name: "Below Standard",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "seller-performance-standards",
    desc: "Lowest tier in eBay's 3-tier seller performance system, indicating sellers not meeting minimum service standards.",
    market: "global",
    year: 2008
  },
  {
    id: "seller-performance-standards",
    name: "Seller Performance Standards",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "eBay's comprehensive evaluation system measuring seller service quality through transaction defect rate, late shipment rate, and cases closed without seller resolution.",
    market: "global",
    year: 2008
  },

  // ===== FREE SHIPPING BADGES =====
  {
    id: "free-2-day-shipping",
    name: "Free 2-day Shipping",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Badge displayed on listings offering free delivery within 2 business days, replacing Fast 'N Free program in 2023.",
    market: "US",
    year: 2023
  },
  {
    id: "free-3-day-shipping",
    name: "Free 3-day Shipping",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Badge indicating free delivery within 3 business days, part of eBay's speed-based shipping badge system.",
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
    desc: "Badge for listings offering free delivery within 4 business days.",
    market: "US",
    year: 2023
  },

  // ===== DEALS & MARKETING PROGRAMS =====
  {
    id: "daily-deals",
    name: "Daily Deals",
    type: "category",
    tier: "campaign",
    status: "current",
    parent: "ebay-deals",
    desc: "Curated daily promotional program featuring time-limited discounts on selected inventory, refreshed every 24 hours.",
    market: "global",
    year: 2013
  },
  {
    id: "featured-deals",
    name: "Featured Deals",
    type: "category",
    tier: "campaign",
    status: "current",
    parent: "ebay-deals",
    desc: "Premium placement within eBay Deals showcasing top promotional offers with enhanced visibility.",
    market: ["US", "UK", "CA", "AU"],
    year: 2015
  },
  {
    id: "weekly-deals",
    name: "Weekly Deals",
    type: "category",
    tier: "campaign",
    status: "current",
    parent: "ebay-deals",
    desc: "Week-long promotional program featuring discounted items with extended deal duration compared to Daily Deals.",
    market: ["US", "UK", "CA", "AU"],
    year: 2015
  },
  {
    id: "spotlight-deals",
    name: "Spotlight Deals",
    type: "category",
    tier: "campaign",
    status: "current",
    parent: "ebay-deals",
    desc: "High-visibility promotional placement highlighting exceptional limited-time offers within eBay Deals.",
    market: ["US", "UK", "CA", "AU"],
    year: 2017
  },
  {
    id: "deals-seller-portal",
    name: "Deals Seller Portal",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-tools",
    desc: "Seller-facing dashboard for submitting, managing, and tracking performance of inventory in eBay Deals programs.",
    market: ["US", "UK", "CA", "AU"],
    year: 2016
  },
  {
    id: "ebay-exclusive-coupons",
    name: "eBay Exclusive Coupons",
    type: "category",
    tier: "campaign",
    status: "current",
    parent: "marketing",
    desc: "Platform-wide promotional coupons distributed by eBay to drive buyer acquisition and repeat purchases.",
    market: "global",
    year: 2018
  },
  {
    id: "certified-recycler-program",
    name: "Certified Recycler Program",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "sustainability",
    desc: "Environmental program certifying sellers who follow responsible electronics recycling and refurbishment practices.",
    market: "US",
    year: 2019
  },

  // ===== SELLER REFURBISHED =====
  {
    id: "seller-refurbished",
    name: "Seller Refurbished",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "refurbished",
    desc: "Item condition designation for products refurbished by individual sellers, distinct from manufacturer Certified Refurbished and eBay Refurbished programs.",
    market: "global",
    year: 2010
  },

  // ===== PICKUP & COLLECTION =====
  {
    id: "in-store-pickup",
    name: "In-Store Pickup",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Fulfillment option allowing buyers to collect purchases at physical retail locations, primarily used by large retailers on eBay.",
    market: "US",
    year: 2013
  },

  // ===== EDUCATION & SELLER RESOURCES =====
  {
    id: "ebay-university",
    name: "eBay University",
    type: "category",
    tier: "program",
    status: "legacy",
    parent: "education",
    desc: "Educational program offering in-person and online training for eBay sellers, discontinued in favor of Seller Center Help and online resources.",
    market: "US",
    year: 2000,
    renamedTo: "seller-help"
  },

  // ===== RESOLUTION & CUSTOMER SERVICE =====
  {
    id: "resolution-center",
    name: "Resolution Center",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-protection",
    desc: "Dispute resolution platform where buyers and sellers resolve transaction issues, file cases, and manage Money Back Guarantee claims.",
    market: "global",
    year: 2009
  },

  // ===== SHIPPING LABELS & FULFILLMENT =====
  {
    id: "shipping-labels",
    name: "Shipping Labels",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Integrated label printing service allowing sellers to purchase discounted postage and print shipping labels directly from eBay.",
    market: "global",
    year: 2004
  },
  {
    id: "local-pickup",
    name: "Local Pickup",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Fulfillment option allowing buyers to collect items directly from seller's location, eliminating shipping costs.",
    market: "global",
    year: 1999
  },
  {
    id: "ebay-collection-points",
    name: "eBay Collection Points",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Network of retail locations where UK and AU buyers can collect eBay purchases at their convenience.",
    market: ["UK", "AU"],
    year: 2014
  },
  {
    id: "managed-delivery",
    name: "Managed Delivery",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "eBay-managed white-glove delivery service for large, bulky items requiring professional installation or setup.",
    market: "US",
    year: 2019
  },

  // ===== INTERNATIONAL SHIPPING =====
  {
    id: "ebay-international-standard-delivery",
    name: "eBay International Standard Delivery",
    type: "category",
    tier: "program",
    status: "current",
    parent: "international-shipping",
    desc: "Replacement for Global Shipping Program in US market, launched July 2023 with simplified customs and tracking.",
    market: "US",
    year: 2023,
    renamedFrom: "global-shipping-program-us"
  },
  {
    id: "ebay-speedpak",
    name: "eBay SpeedPAK",
    type: "category",
    tier: "program",
    status: "current",
    parent: "international-shipping",
    desc: "International shipping solution connecting China-based sellers to global buyers with consolidated logistics and tracking.",
    market: ["UK", "DE", "FR", "IT", "CA", "AU"],
    year: 2016
  },

  // ===== STORE NEWSLETTERS & MARKETING =====
  {
    id: "store-newsletters",
    name: "Store Newsletters",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-stores",
    desc: "Email marketing feature allowing eBay Store subscribers to send newsletters to their subscriber base.",
    market: "global",
    year: 2005
  },
  {
    id: "store-email-campaigns",
    name: "Store Email Campaigns",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-stores",
    desc: "Advanced email marketing tool for eBay Store subscribers with campaign automation, segmentation, and analytics.",
    market: "global",
    year: 2018
  },

  // ===== DISCOUNT TOOLS =====
  {
    id: "shipping-discounts",
    name: "Shipping Discounts",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "promotions",
    desc: "Seller tool for offering reduced or free shipping costs on orders meeting specific criteria like combined shipping or minimum purchase amount.",
    market: "global",
    year: 2010
  },
  {
    id: "seller-initiated-offers",
    name: "Seller Initiated Offers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "promotions",
    desc: "Tool allowing sellers to send private discount offers to buyers who have watched their listings, driving conversion.",
    market: "global",
    year: 2014
  },

  // ===== MAKE AN OFFER =====
  {
    id: "make-an-offer",
    name: "Make An Offer",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Negotiation feature enabling buyers to propose prices below the listing price, which sellers can accept, decline, or counter.",
    market: "global",
    year: 2005
  },

  // ===== STORE CUSTOMIZATION =====
  {
    id: "store-header",
    name: "Store Header",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-stores",
    desc: "Customizable banner and branding area at the top of eBay Stores, allowing sellers to showcase their brand identity.",
    market: "global",
    year: 2001
  },
  {
    id: "store-categories",
    name: "Store Categories",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-stores",
    desc: "Custom navigation structure within eBay Stores allowing sellers to organize inventory into seller-defined categories.",
    market: "global",
    year: 2001
  },
  {
    id: "store-promotions-box",
    name: "Store Promotions Box",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-stores",
    desc: "Featured area in eBay Stores highlighting current sales, promotions, and special offers to store visitors.",
    market: "global",
    year: 2008
  },

  // ===== LISTING FEATURES =====
  {
    id: "listing-upgrades",
    name: "Listing Upgrades",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Paid enhancements like subtitle, gallery plus, and bold title that increase listing visibility and presentation.",
    market: "global",
    year: 2000
  },
  {
    id: "subtitle",
    name: "Subtitle",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Optional paid listing enhancement adding a second line of descriptive text below the main title in search results.",
    market: "global",
    year: 2000
  },
  {
    id: "gallery-plus",
    name: "Gallery Plus",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Listing upgrade enlarging the thumbnail image in search results for enhanced visual prominence.",
    market: "global",
    year: 2005
  },
  {
    id: "bold-title",
    name: "Bold Title",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "listing",
    desc: "Discontinued listing upgrade that displayed titles in bold font in search results.",
    market: "global",
    year: 2000,
    renamedTo: "listing-upgrades"
  },
  {
    id: "scheduled-listings",
    name: "Scheduled Listings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Feature allowing sellers to create listings in advance and schedule them to go live at a specific date and time.",
    market: "global",
    year: 2003
  },
  {
    id: "quantity-limits",
    name: "Quantity Limits",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Seller control restricting the maximum quantity a single buyer can purchase in one transaction.",
    market: "global",
    year: 2008
  },
  {
    id: "item-specifics",
    name: "Item Specifics",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Structured product attributes like brand, size, color, and model that improve search accuracy and buyer filtering.",
    market: "global",
    year: 2007
  },

  // ===== BIDDING & AUCTION FEATURES =====
  {
    id: "automatic-bidding",
    name: "Automatic Bidding",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "auction",
    desc: "Proxy bidding system where eBay automatically increases a buyer's bid up to their maximum amount when outbid.",
    market: "global",
    year: 1995
  },
  {
    id: "reserve-price",
    name: "Reserve Price",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "auction",
    desc: "Hidden minimum price in auctions below which the seller is not obligated to complete the sale.",
    market: "global",
    year: 1999
  },
  {
    id: "buy-it-now-in-auctions",
    name: "Buy It Now in Auctions",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "auction",
    desc: "Option in auction listings allowing buyers to purchase immediately at a fixed price before bidding reaches a threshold.",
    market: "global",
    year: 2000
  },

  // ===== PAYMENT FEATURES =====
  {
    id: "managed-payments",
    name: "Managed Payments",
    type: "category",
    tier: "program",
    status: "current",
    parent: "payments",
    desc: "eBay's integrated payment processing system handling buyer payments directly, replacing third-party payment processors like PayPal.",
    market: "global",
    year: 2018
  },
  {
    id: "payout-schedule",
    name: "Payout Schedule",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "managed-payments",
    desc: "Automated seller payout timing under Managed Payments, typically daily or weekly transfers to seller bank accounts.",
    market: "global",
    year: 2019
  },
  {
    id: "ebay-balance",
    name: "eBay Balance",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "managed-payments",
    desc: "Seller account balance showing pending and available funds before payout to bank account.",
    market: "global",
    year: 2019
  },

  // ===== REPORTS & ANALYTICS =====
  {
    id: "sales-reports",
    name: "Sales Reports",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Detailed reporting dashboard showing seller transaction history, revenue trends, and performance metrics.",
    market: "global",
    year: 2008
  },
  {
    id: "traffic-reports",
    name: "Traffic Reports",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Analytics showing views, impressions, and click-through rates for seller listings and store pages.",
    market: "global",
    year: 2009
  }
];
