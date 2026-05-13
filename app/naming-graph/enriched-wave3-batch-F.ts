// Enriched GraphNode Data - Wave 3 Batch F
// 50 NEW Programs from translations.ts (not in enriched-consolidated-DEDUPLICATED.ts)
// Created: 2026-04-17
// Source: translations.ts + eBay official documentation
// Export: ENRICHED_WAVE3_F

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

export const ENRICHED_WAVE3_F: GraphNode[] = [
  // ===== TRUST & PROTECTION PROGRAMS =====
  {
    id: "vehicle-purchase-protection",
    name: "Vehicle Purchase Protection",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "ebay-motors",
    desc: "Coverage program protecting buyers purchasing vehicles through eBay Motors, providing up to $100,000 protection against undisclosed damage, title issues, and fraud.",
    market: ["US", "CA"],
    year: 2017
  },
  {
    id: "business-equipment-purchase-protection",
    name: "Business Equipment Purchase Protection",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Protection program for high-value business and industrial equipment purchases, extending Money Back Guarantee coverage with enhanced dispute resolution.",
    market: "US",
    year: 2019
  },
  {
    id: "ebay-guaranteed-fit",
    name: "eBay Guaranteed Fit",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "ebay-motors",
    desc: "US automotive parts compatibility guarantee offering free returns if parts don't fit vehicle specifications entered by buyer.",
    market: "US",
    year: 2018
  },
  {
    id: "buyer-protection",
    name: "Buyer Protection",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Comprehensive buyer safeguards including Money Back Guarantee, payment protection, and dispute resolution services.",
    market: "global",
    year: 2000
  },
  {
    id: "ebay-buyer-guarantee",
    name: "eBay Buyer Guarantee",
    type: "trust",
    tier: "program",
    status: "renamed",
    parent: "trust",
    desc: "Former name for Money Back Guarantee in certain markets before standardization to global branding.",
    market: "global",
    year: 2000,
    renamedTo: "money-back-guarantee"
  },
  {
    id: "seller-protections",
    name: "Seller Protections",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "sellertools",
    desc: "Suite of protections for sellers including coverage against unauthorized transactions, item not received claims, and significantly not as described claims when seller meets requirements.",
    market: "global",
    year: 2013
  },
  {
    id: "issue-resolution-center",
    name: "Issue Resolution Center",
    type: "trust",
    tier: "product",
    status: "current",
    parent: "trust",
    desc: "Centralized platform for managing buyer-seller disputes, returns, and Money Back Guarantee claims with guided resolution workflows.",
    market: "global",
    year: 2021,
    renamedFrom: "resolution-center"
  },
  {
    id: "certified-recycled",
    name: "Certified Recycled",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "refurbished",
    desc: "UK condition standard for professionally recycled electronics and equipment meeting environmental and quality certifications.",
    market: "UK",
    year: 2022
  },

  // ===== ADVERTISING & PROMOTIONS =====
  {
    id: "promoted-listings-general",
    name: "Promoted Listings General",
    type: "advertising",
    tier: "variant",
    status: "renamed",
    parent: "promoted-listings",
    desc: "Original name for cost-per-sale advertising tier, renamed to Promoted Listings Standard in 2022.",
    market: "global",
    year: 2015,
    renamedTo: "promoted-listings-standard"
  },
  {
    id: "promoted-listings-priority",
    name: "Promoted Listings Priority",
    type: "advertising",
    tier: "variant",
    status: "renamed",
    parent: "promoted-listings",
    desc: "Premium advertising tier with priority placement in search results, renamed to Promoted Listings Advanced in 2022.",
    market: "global",
    year: 2019,
    renamedTo: "promoted-listings-advanced"
  },
  {
    id: "promoted-stores-custom",
    name: "Promoted Stores Custom",
    type: "advertising",
    tier: "variant",
    status: "current",
    parent: "promoted-listings",
    desc: "Customizable store promotion campaigns allowing sellers to create targeted ad placements for their eBay Store inventory.",
    market: "US",
    year: 2020
  },
  {
    id: "brand-funded-promoted-listings-priority",
    name: "Brand-Funded Promoted Listings Priority",
    type: "advertising",
    tier: "variant",
    status: "current",
    parent: "promoted-listings",
    desc: "Co-op advertising program where manufacturers fund a portion of sellers' Promoted Listings Advanced campaigns for authorized products.",
    market: ["US", "UK"],
    year: 2021
  },
  {
    id: "brand-funded-promoted-stores",
    name: "Brand-Funded Promoted Stores",
    type: "advertising",
    tier: "variant",
    status: "current",
    parent: "promoted-listings",
    desc: "Brand partnership program funding store-level promotional campaigns for authorized retailers selling manufacturer products.",
    market: ["US", "UK"],
    year: 2021
  },
  {
    id: "promoted-brand",
    name: "Promoted Brand",
    type: "advertising",
    tier: "variant",
    status: "current",
    parent: "ebay-advertising",
    desc: "Brand-level advertising solution enabling manufacturers to promote their entire product catalog across eBay search and browse.",
    market: ["US", "UK"],
    year: 2022
  },
  {
    id: "managed-display",
    name: "Managed Display",
    type: "advertising",
    tier: "product",
    status: "current",
    parent: "ebay-advertising",
    desc: "Full-service display advertising solution managed by eBay's advertising team for high-volume sellers and brands.",
    market: ["US", "UK"],
    year: 2020
  },

  // ===== REGIONAL PROGRAMS =====
  {
    id: "ebay-premium-services",
    name: "eBay Premium Services",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Regional trust badge programs including UK Premium Service, German Top-Service, French Service Premium, and Italian Servizio Premium indicating seller excellence.",
    market: ["UK", "DE", "FR", "IT"],
    year: 2015
  },
  {
    id: "ebay-fulfilment",
    name: "eBay Fulfilment",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "Third-party fulfillment service by Orange Connex (UK) and other partners (DE) handling storage, packing, and shipping for sellers.",
    market: ["UK", "DE"],
    year: 2019
  },

  // ===== SELLER TOOLS & FEATURES =====
  {
    id: "quick-listing-tool",
    name: "Quick Listing Tool",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Streamlined listing creation interface for fast single-item listings with minimal fields, optimized for mobile and experienced sellers.",
    market: "global",
    year: 2015
  },
  {
    id: "bulk-listing-tool",
    name: "Bulk Listing Tool",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "CSV upload and multi-item listing creator for sellers managing large inventory volumes, supporting up to 5,000 listings per file.",
    market: "global",
    year: 2008
  },
  {
    id: "listing-templates",
    name: "Listing Templates",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Saved listing configurations allowing sellers to reuse item specifics, descriptions, and policies for similar products.",
    market: "global",
    year: 2010
  },
  {
    id: "scheduled-listings",
    name: "Scheduled Listings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Feature allowing sellers to create listings in advance and schedule publication at optimal times for maximum visibility.",
    market: "global",
    year: 2006
  },
  {
    id: "listing-designer",
    name: "Listing Designer",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "listing",
    desc: "Deprecated HTML template system for custom listing layouts, replaced by modern responsive listing format.",
    market: "global",
    year: 2001,
    renamedTo: "advanced-listing-tool"
  },
  {
    id: "picture-services",
    name: "Picture Services",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "eBay's image hosting and optimization service, now offering up to 24 free photos per listing with automatic enhancement.",
    market: "global",
    year: 2000
  },
  {
    id: "picture-manager",
    name: "Picture Manager",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "listing",
    desc: "Discontinued photo library and management tool, integrated into Seller Hub in 2017.",
    market: "global",
    year: 2005,
    renamedTo: "seller-hub"
  },
  {
    id: "subtitle",
    name: "Subtitle",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Optional paid listing enhancement adding 55 characters of additional searchable text below the main title.",
    market: "global",
    year: 2003
  },
  {
    id: "international-site-visibility",
    name: "International Site Visibility",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Automatic cross-border listing distribution showing US/UK/AU/CA listings on international eBay sites without duplicate fees.",
    market: "global",
    year: 2012
  },
  {
    id: "promoted-to-international",
    name: "Promoted to International",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "listing",
    desc: "Deprecated paid upgrade for international listing visibility, made free in 2019 and merged into International Site Visibility.",
    market: "global",
    year: 2010,
    renamedTo: "international-site-visibility"
  },

  // ===== STORES & SUBSCRIPTIONS =====
  {
    id: "ebay-stores-basic",
    name: "eBay Stores - Basic",
    type: "category",
    tier: "variant",
    status: "legacy",
    parent: "ebay-stores",
    desc: "Entry-level store subscription tier, renamed to Starter in 2021.",
    market: "global",
    year: 2001,
    renamedTo: "ebay-stores-starter"
  },
  {
    id: "ebay-stores-premium",
    name: "eBay Stores - Premium",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores",
    desc: "Mid-tier store subscription offering 10,000 free listings, markdown manager, and advanced marketing tools.",
    market: "global",
    year: 2001
  },
  {
    id: "ebay-stores-enterprise",
    name: "eBay Stores - Enterprise",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores",
    desc: "Highest US store tier with 100,000 free listings, priority customer support, and dedicated account management.",
    market: "US",
    year: 2015
  },

  // ===== PAYMENT & CHECKOUT =====
  {
    id: "paypal-checkout",
    name: "PayPal Checkout",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "payment",
    desc: "Legacy primary payment method before Managed Payments rollout, still available as buyer payment option.",
    market: "global",
    year: 2000,
    renamedTo: "managed-payments"
  },
  {
    id: "immediate-payment-required",
    name: "Immediate Payment Required",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Seller setting requiring buyers to pay instantly when purchasing Buy It Now items, preventing unpaid item cases.",
    market: "global",
    year: 2008
  },
  {
    id: "pay-in-4",
    name: "Pay in 4",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "payment",
    desc: "PayPal-powered buy now, pay later option splitting purchases into 4 interest-free payments over 6 weeks.",
    market: ["US", "UK", "AU"],
    year: 2020
  },
  {
    id: "ebay-gift-cards",
    name: "eBay Gift Cards",
    type: "category",
    tier: "product",
    status: "current",
    parent: "payment",
    desc: "Prepaid gift card program allowing purchase and redemption of eBay credit, sold in retail stores and online.",
    market: ["US", "UK", "DE", "AU", "CA"],
    year: 2003
  },

  // ===== BUYER EXPERIENCE FEATURES =====
  {
    id: "make-offer",
    name: "Make Offer",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Buyer-seller price negotiation feature on Buy It Now listings, allowing offers below asking price with seller accept/decline/counter options.",
    market: "global",
    year: 2005
  },
  {
    id: "counter-offer",
    name: "Counter Offer",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Seller response to buyer offer proposing alternative price, part of Best Offer negotiation workflow.",
    market: "global",
    year: 2006
  },
  {
    id: "watch-list",
    name: "Watch List",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Personalized buyer list for tracking items of interest, receiving end-of-auction alerts and price drop notifications.",
    market: "global",
    year: 1999
  },
  {
    id: "saved-searches",
    name: "Saved Searches",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Feature allowing buyers to save search queries and receive email/push notifications when matching items are listed.",
    market: "global",
    year: 2008
  },
  {
    id: "following",
    name: "Following",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Social feature enabling buyers to follow favorite sellers, brands, and categories for personalized feed updates.",
    market: "global",
    year: 2019
  },
  {
    id: "similar-items",
    name: "Similar Items",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "AI-powered recommendation engine showing related products based on current listing viewed, search history, and purchase behavior.",
    market: "global",
    year: 2014
  },
  {
    id: "price-drop-alerts",
    name: "Price Drop Alerts",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Notification system alerting buyers when watched items reduce in price, encouraging purchase conversions.",
    market: "global",
    year: 2018
  },
  {
    id: "item-comparison",
    name: "Item Comparison",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Side-by-side comparison tool for evaluating multiple listings on price, condition, seller rating, and shipping costs.",
    market: "global",
    year: 2016
  },

  // ===== SHIPPING & FULFILLMENT =====
  {
    id: "calculated-shipping",
    name: "Calculated Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Dynamic shipping cost calculator using buyer location, package dimensions, and carrier rates to determine exact shipping fees.",
    market: "global",
    year: 2004
  },
  {
    id: "flat-rate-shipping",
    name: "Flat Rate Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Simplified shipping option charging same rate to all domestic buyers regardless of location, seller-defined amount.",
    market: "global",
    year: 2000
  },
  {
    id: "freight-shipping",
    name: "Freight Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Specialized shipping service for large, heavy items requiring pallet or truck delivery with liftgate and white glove options.",
    market: ["US", "UK", "DE"],
    year: 2012
  },
  {
    id: "local-pickup",
    name: "Local Pickup",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "No-shipping option allowing buyers to collect purchased items directly from seller location, common for vehicles and large items.",
    market: "global",
    year: 1999
  },
  {
    id: "ship-to-store",
    name: "Ship to Store",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "shipping",
    desc: "Discontinued program allowing buyers to have eBay purchases shipped to retail partner locations for pickup.",
    market: "US",
    year: 2013,
    renamedTo: "local-pickup"
  },

  // ===== FEEDBACK & RATINGS =====
  {
    id: "detailed-seller-ratings",
    name: "Detailed Seller Ratings",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "feedback",
    desc: "5-star rating system across 4 dimensions: item as described, communication, shipping time, and shipping charges.",
    market: "global",
    year: 2007
  },
  {
    id: "positive-feedback-percentage",
    name: "Positive Feedback Percentage",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "feedback",
    desc: "Core seller reputation metric calculating percentage of positive reviews over trailing 12 months.",
    market: "global",
    year: 1999
  }
];
