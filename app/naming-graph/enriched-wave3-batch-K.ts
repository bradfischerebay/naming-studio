// Enriched GraphNode Data - Wave 3 Batch K
// 50 NEW unenriched programs from translations.ts
// Created: 2026-04-17
// Source: translations.ts + Research-Session-Complete-2026-04-17.md

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

export const ENRICHED_WAVE3_K: GraphNode[] = [
  // ===== PREMIUM SERVICES & MEMBERSHIP =====
  {
    id: "ebay-premium-services",
    name: "eBay Premium Services",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Premium seller service badge indicating fast shipping, easy returns, and top-rated seller status. Market-specific branding: UK/DE/FR/IT only (renamed to eBay Plus in other markets).",
    market: ["UK", "DE", "FR", "IT"],
    year: 2017
  },
  {
    id: "ebay-buyer-guarantee",
    name: "eBay Buyer Guarantee",
    type: "trust",
    tier: "program",
    status: "renamed",
    parent: "trust",
    desc: "Legacy name for buyer protection program covering purchase disputes and item authenticity.",
    market: "global",
    year: 1999,
    renamedTo: "Money Back Guarantee"
  },

  // ===== SHIPPING & FULFILLMENT =====
  {
    id: "ebay-fulfilment",
    name: "eBay Fulfilment",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "Third-party fulfillment service by Orange Connex available in UK and DE, providing warehousing, packing, and shipping services for sellers.",
    market: ["UK", "DE"],
    year: 2020
  },
  {
    id: "logistica-ebay-by-orange-connex",
    name: "Logistica eBay by Orange Connex",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "Italy-specific fulfillment service by Orange Connex, providing end-to-end logistics including storage, packing, and delivery.",
    market: "IT",
    year: 2020
  },
  {
    id: "simple-delivery",
    name: "Simple Delivery",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "UK-exclusive simplified shipping option for small, lightweight items with standardized pricing and tracking.",
    market: "UK",
    year: 2019
  },
  {
    id: "ebay-international-standard-delivery",
    name: "eBay International Standard Delivery",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Standardized international shipping service with predictable delivery times and customs handling, available in US market.",
    market: "US",
    year: 2021
  },
  {
    id: "managed-delivery",
    name: "Managed Delivery",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "eBay-managed shipping service for high-value items providing white-glove delivery and installation services. US-only program.",
    market: "US",
    year: 2019
  },
  {
    id: "ebay-collection-points",
    name: "eBay Collection Points",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Network of retail locations for package pickup in UK and AU markets, partnering with local retailers and post offices.",
    market: ["UK", "AU"],
    year: 2016
  },

  // ===== ADVERTISING PRODUCTS =====
  {
    id: "promoted-stores-custom",
    name: "Promoted Stores Custom",
    type: "advertising",
    tier: "variant",
    status: "current",
    parent: "ebay-advertising",
    desc: "Custom store promotion campaigns with tailored placements and audience targeting, available for Enterprise tier stores in US market.",
    market: "US",
    year: 2022
  },
  {
    id: "promoted-brand",
    name: "Promoted Brand",
    type: "advertising",
    tier: "variant",
    status: "current",
    parent: "ebay-advertising",
    desc: "Brand-level advertising product allowing authorized sellers to promote entire brand portfolios with premium homepage and category page placements.",
    market: ["US", "UK"],
    year: 2023
  },
  {
    id: "managed-display",
    name: "Managed Display",
    type: "advertising",
    tier: "program",
    status: "current",
    parent: "ebay-advertising",
    desc: "White-glove display advertising service managed by eBay's ad ops team for enterprise sellers and brands, featuring custom creative and strategic placement.",
    market: ["US", "UK"],
    year: 2021
  },

  // ===== SELLER TOOLS & FEATURES =====
  {
    id: "issue-resolution-center",
    name: "Issue Resolution Center",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "support",
    desc: "Legacy dispute resolution platform for buyers and sellers, replaced by Resolution Center in 2018.",
    market: "US",
    year: 2010,
    renamedTo: "Resolution Center"
  },
  {
    id: "boost-buyer-engagement",
    name: "Boost Buyer Engagement",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Marketing tools and AI-driven recommendations for increasing buyer interaction, including personalized offers and retargeting campaigns.",
    market: "global",
    year: 2021
  },
  {
    id: "buyer-groups",
    name: "Buyer Groups",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Segmentation tool allowing sellers to create targeted buyer cohorts based on purchase history, preferences, and engagement for personalized marketing.",
    market: "global",
    year: 2020
  },
  {
    id: "discounts-manager",
    name: "Discounts Manager",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Centralized tool for creating and managing promotional discounts, flash sales, and seasonal campaigns with performance analytics.",
    market: "global",
    year: 2019
  },
  {
    id: "store-newsletters",
    name: "Store Newsletters",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-stores",
    desc: "Email marketing tool for store subscribers, allowing sellers to send product updates, promotions, and exclusive deals directly to followers.",
    market: "global",
    year: 2005
  },

  // ===== STORE SUBSCRIPTION TIERS =====
  {
    id: "store-tier-starter",
    name: "Store Tier - Starter",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores",
    desc: "Entry-level store subscription tier with basic customization and reduced fees, available in US and AU markets (branded 'Pro Starter' in AU).",
    market: ["US", "AU"],
    year: 2018
  },
  {
    id: "store-tier-enterprise",
    name: "Store Tier - Enterprise",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores",
    desc: "Top-tier store subscription for high-volume sellers in US market, offering maximum listing allowances, lowest fees, and dedicated account management.",
    market: "US",
    year: 2015
  },
  {
    id: "store-tier-platin",
    name: "Store Tier - Platin",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores",
    desc: "Germany-exclusive premium store tier ('Platin-Shop') positioned above Premium tier, offering enhanced visibility and reduced fees.",
    market: "DE",
    year: 2016
  },
  {
    id: "store-tier-premium-plus",
    name: "Store Tier - Premium Plus",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores",
    desc: "Italy-exclusive store tier positioned between Premium and top-tier, offering enhanced listing allowances and fee discounts.",
    market: "IT",
    year: 2017
  },

  // ===== DISCOVERY & SEARCH =====
  {
    id: "image-search",
    name: "Image Search",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Visual search functionality allowing buyers to search using uploaded images or camera snapshots, available in US, UK, CA, and AU markets.",
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
    desc: "Browser extension and mobile feature for discovering eBay listings while browsing other websites, available in US, UK, CA, and AU markets.",
    market: ["US", "UK", "CA", "AU"],
    year: 2018
  },
  {
    id: "shop-by-category",
    name: "Shop by Category",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Hierarchical category navigation system for browsing the entire eBay catalog, with market-specific category structures and merchandising.",
    market: "global",
    year: 1995
  },

  // ===== COLLECTIBLES & VERTICALS =====
  {
    id: "price-guide",
    name: "Price Guide",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "verticals",
    desc: "Historical pricing data and market trends tool for trading cards, coins, stamps, and other collectibles, available in US market.",
    market: "US",
    year: 2020
  },
  {
    id: "trading-card-hub",
    name: "Trading Card Hub",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "verticals",
    desc: "Dedicated landing page and ecosystem for trading card collectors featuring Price Guide integration, authentication, and vault storage.",
    market: "US",
    year: 2021
  },
  {
    id: "tcgplayer",
    name: "TCGplayer",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "verticals",
    desc: "Acquired trading card marketplace operating as eBay subsidiary, maintaining separate brand and platform in US, UK, and CA markets.",
    market: ["US", "UK", "CA"],
    year: 2022
  },
  {
    id: "goldin-auctions",
    name: "Goldin Auctions",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "verticals",
    desc: "Acquired luxury collectibles auction house operating as eBay subsidiary, specializing in sports memorabilia, cards, and high-value collectibles.",
    market: "global",
    year: 2021
  },

  // ===== EDUCATION & SUPPORT =====
  {
    id: "export-academy",
    name: "Export Academy",
    type: "category",
    tier: "program",
    status: "current",
    parent: "international",
    desc: "Educational program teaching sellers cross-border trade best practices, market expansion strategies, and international shipping logistics.",
    market: "global",
    year: 2019
  },
  {
    id: "feedback-forum",
    name: "Feedback Forum",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "feedback",
    desc: "Community discussion platform for feedback system issues, disputes, and policy questions, available in US, UK, CA, and AU markets.",
    market: ["US", "UK", "CA", "AU"],
    year: 2000
  },
  {
    id: "ebay-university",
    name: "eBay University",
    type: "category",
    tier: "program",
    status: "legacy",
    parent: "support",
    desc: "Legacy in-person and online seller education program offering courses, certifications, and workshops. Largely replaced by eBay Academy.",
    market: "US",
    year: 2003,
    renamedTo: "eBay Academy"
  },

  // ===== MOTORS PROGRAMS =====
  {
    id: "my-garage",
    name: "My Garage",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-motors",
    desc: "Personalized vehicle garage allowing buyers to store vehicle details and receive compatible parts recommendations, available globally.",
    market: "global",
    year: 2015
  },

  // ===== REGIONAL-SPECIFIC PROGRAMS =====
  {
    id: "bons-plans",
    name: "Bons Plans",
    type: "category",
    tier: "program",
    status: "current",
    parent: "buyer",
    desc: "France-exclusive curated deals and promotions program featuring daily offers and seasonal sales campaigns.",
    market: "FR",
    year: 2013
  },
  {
    id: "consommation-raisonnee",
    name: "Consommation Raisonnée",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "sustainability",
    desc: "France-specific responsible consumption initiative promoting sustainable buying practices, pre-owned items, and circular economy principles.",
    market: "FR",
    year: 2020
  },

  // ===== PAYMENT & CHECKOUT =====
  {
    id: "make-an-offer",
    name: "Make An Offer",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Buyer-initiated negotiation feature allowing price offers on eligible listings, with seller acceptance, counter-offer, or decline options.",
    market: "global",
    year: 2005,
    renamedFrom: "Best Offer"
  },

  // ===== LISTING FEATURES =====
  {
    id: "automatic-relisting",
    name: "Automatic Relisting",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Automated relisting tool for unsold auction or fixed-price items, continuing until sold or reaching configured limit.",
    market: "global",
    year: 2010
  },
  {
    id: "background-enhancement",
    name: "Background Enhancement",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "AI-powered automatic background removal and enhancement for listing photos, improving visual consistency and buyer experience.",
    market: "global",
    year: 2024
  },
  {
    id: "bulk-listing-tool",
    name: "Bulk Listing Tool",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Tool for creating or editing multiple listings simultaneously via CSV upload or bulk editor interface.",
    market: "global",
    year: 2010
  },
  {
    id: "business-policies",
    name: "Business Policies",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Reusable templates for payment, shipping, and return policies, allowing sellers to apply consistent terms across listings.",
    market: "global",
    year: 2012
  },

  // ===== AUCTION & BIDDING =====
  {
    id: "buy-it-now-price",
    name: "Buy It Now Price",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Fixed price option on auction listings allowing immediate purchase without participating in bidding process.",
    market: "global",
    year: 2000
  },
  {
    id: "auction-ended",
    name: "Auction Ended",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Status indicator displayed when auction has concluded, showing winning bid amount and winner information.",
    market: "global",
    year: 1995
  },
  {
    id: "bid-now",
    name: "Bid Now",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Primary call-to-action button for placing bids on auction-style listings, with proxy bidding functionality.",
    market: "global",
    year: 1995
  },

  // ===== TRUST & SELLER PERFORMANCE =====
  {
    id: "seller-response",
    name: "Seller Response",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback",
    desc: "Seller capability to publicly respond to buyer reviews and feedback, providing context, resolution details, or clarification.",
    market: "global",
    year: 2014
  },
  {
    id: "detailed-seller-ratings",
    name: "Detailed Seller Ratings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback",
    desc: "5-star rating system for four criteria: communication, shipping speed, shipping costs, and item description accuracy.",
    market: "global",
    year: 2007
  },

  // ===== PROMOTIONAL TOOLS =====
  {
    id: "coded-coupons",
    name: "Coded Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Unique coupon codes for targeted promotions with tracking capabilities, allowing sellers to measure campaign effectiveness.",
    market: "global",
    year: 2015
  },
  {
    id: "codeless-coupons",
    name: "Codeless Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Coupons automatically applied at checkout without requiring code entry, improving conversion rates and user experience.",
    market: "global",
    year: 2020
  },

  // ===== SUSTAINABILITY =====
  {
    id: "certified-recycler-program",
    name: "Certified Recycler Program",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "sustainability",
    desc: "Certification program for sellers specializing in recycled and refurbished electronics, verifying proper refurbishment and sustainability practices.",
    market: "US",
    year: 2020
  },

  // ===== DEVELOPER & PARTNER =====
  {
    id: "developer-loyalty-program",
    name: "Developer Loyalty Program",
    type: "developer",
    tier: "program",
    status: "current",
    parent: "developer",
    desc: "Rewards program for active API developers and integration partners, offering tiered benefits, recognition, and fee discounts based on API call volume.",
    market: "global",
    year: 2019
  },

  // ===== LEGACY LISTING ENHANCEMENTS =====
  {
    id: "bold",
    name: "Bold",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "listing",
    desc: "Paid listing enhancement making title bold in search results to increase visibility. Largely deprecated in favor of Promoted Listings.",
    market: "global",
    year: 2000
  },
  {
    id: "bold-title",
    name: "Bold Title",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "listing",
    desc: "Paid upgrade making listing title bold in search results, offering increased visibility for competitive categories. Superseded by advertising products.",
    market: "global",
    year: 2000
  }
];
