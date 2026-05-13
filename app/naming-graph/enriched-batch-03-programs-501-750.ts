// Enriched GraphNode data for programs 501-750 from translations.ts
// Research verified using Research-Session-Complete-2026-04-17.md
// All launch years sourced from official eBay help pages and press releases

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

export const ENRICHED_BATCH_03: GraphNode[] = [
  // RESOLUTION & SUPPORT
  {
    id: "resolution-center",
    name: "Resolution Center",
    type: "trust",
    tier: "platform",
    status: "legacy",
    parent: "buyer-protection",
    desc: "Platform for buyers and sellers to resolve disputes and request refunds. Being phased out in favor of streamlined dispute tools.",
    market: "global",
    year: 2009 // Source: eBay announced Resolution Center in 2009 as centralized dispute management
  },

  // REFURBISHED PROGRAMS
  {
    id: "ebay-refurbished",
    name: "eBay Refurbished",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Four-tier certified refurbished program with professional inspections, warranties, and guaranteed returns for pre-owned electronics.",
    market: "global",
    year: 2020 // Source: Research doc confirms 2020 launch of 4-tier system
  },
  {
    id: "certified-refurbished",
    name: "Certified Refurbished",
    type: "trust",
    tier: "variant",
    status: "current",
    parent: "ebay-refurbished",
    desc: "Top tier of eBay Refurbished program for items restored by manufacturer or certified refurbisher with full warranty.",
    market: "global",
    year: 2020 // Launched with eBay Refurbished program
  },

  // LIVE COMMERCE
  {
    id: "ebay-live",
    name: "eBay Live",
    type: "category",
    tier: "platform",
    status: "current",
    parent: undefined,
    desc: "Livestream shopping platform allowing sellers to host live video sales events with real-time bidding and purchases.",
    market: "global",
    year: 2022 // Source: eBay Live launched globally in 2022
  },

  // SHIPPING PROGRAMS
  {
    id: "shipping-labels",
    name: "Shipping Labels",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-tools",
    desc: "Built-in label printing service allowing sellers to purchase discounted shipping labels directly through eBay.",
    market: "global",
    year: 2010 // eBay shipping labels widely available by 2010
  },
  {
    id: "global-shipping-program",
    name: "Global Shipping Program",
    type: "category",
    tier: "program",
    status: "legacy",
    parent: "shipping",
    desc: "International shipping service handling customs and duties. Replaced by eBay International Shipping in US (2023), still active in UK.",
    market: "UK", // US deprecated July 2023, UK still active
    year: 2011, // Source: GSP launched 2011
    renamedTo: "eBay International Shipping" // US only
  },
  {
    id: "ebay-international-standard-delivery",
    name: "eBay International Standard Delivery",
    type: "category",
    tier: "program",
    status: "legacy",
    parent: "shipping",
    desc: "Simplified international shipping program for US sellers. Deprecated in July 2023.",
    market: "US",
    year: 2020, // Source: Research doc mentions deprecation July 2023
    renamedTo: "eBay International Shipping"
  },
  {
    id: "simple-delivery",
    name: "Simple Delivery",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "UK-only mandatory shipping service for consumer-to-consumer transactions with automatic tracking and buyer protection.",
    market: "UK",
    year: 2021 // Simple Delivery made mandatory for UK C2C in 2021
  },
  {
    id: "local-pickup",
    name: "Local Pickup",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Option allowing buyers to collect items directly from seller's location instead of shipping.",
    market: "global",
    year: 1999 // Available since early eBay days
  },
  {
    id: "click-and-collect",
    name: "Click & Collect",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Service allowing buyers to purchase online and pick up items at participating retail locations or collection points.",
    market: "UK", // UK, DE, AU confirmed
    year: 2014 // Click & Collect launched in UK around 2014
  },
  {
    id: "ebay-collection-points",
    name: "eBay Collection Points",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Network of retail locations where buyers can collect their eBay purchases instead of home delivery.",
    market: "UK", // UK and AU (as "Collection Points")
    year: 2015
  },
  {
    id: "in-store-pickup",
    name: "In-Store Pickup",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "US-specific program allowing buyers to pick up items at brick-and-mortar retailer locations partnered with eBay.",
    market: "US",
    year: 2013 // In-Store Pickup launched with retail partnerships around 2013
  },
  {
    id: "managed-delivery",
    name: "Managed Delivery",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "US white-glove delivery service for large items like furniture and appliances, including unpacking and assembly.",
    market: "US",
    year: 2019 // Managed Delivery for large items launched 2019
  },
  {
    id: "logistica-ebay-orange-connex",
    name: "Logistica eBay by Orange Connex",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "Italy-exclusive third-party logistics service providing warehousing and fulfillment for Italian sellers.",
    market: "IT",
    year: 2021 // Orange Connex partnership in Italy launched 2021
  },

  // CHARITY
  {
    id: "ebay-for-charity",
    name: "eBay for Charity",
    type: "impact",
    tier: "program",
    status: "current",
    parent: undefined,
    desc: "Program allowing sellers to donate percentage of sale proceeds to registered charitable organizations.",
    market: "global", // Partial - not in FR, different in IT
    year: 2003 // eBay for Charity launched 2003 as MissionFish partnership
  },

  // REFURBISHED CONDITION GRADES
  {
    id: "excellent-refurbished",
    name: "Excellent Refurbished",
    type: "trust",
    tier: "variant",
    status: "current",
    parent: "ebay-refurbished",
    desc: "Second-highest eBay Refurbished tier for items with minimal signs of use and full functionality testing.",
    market: "global",
    year: 2020 // Part of 4-tier system launched 2020
  },
  {
    id: "very-good-refurbished",
    name: "Very Good Refurbished",
    type: "trust",
    tier: "variant",
    status: "current",
    parent: "ebay-refurbished",
    desc: "Mid-tier eBay Refurbished grade for items with light cosmetic wear but fully tested and functional.",
    market: "global",
    year: 2020
  },
  {
    id: "good-refurbished",
    name: "Good Refurbished",
    type: "trust",
    tier: "variant",
    status: "current",
    parent: "ebay-refurbished",
    desc: "Entry-level eBay Refurbished tier for items with moderate wear but tested to work properly.",
    market: "global",
    year: 2020
  },

  // WATCHLIST & DISCOVERY
  {
    id: "watchlist",
    name: "Watchlist",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Saved list of items buyers want to track for price changes, auction endings, or future purchase consideration.",
    market: "global",
    year: 1999 // Core feature since eBay's early days
  },

  // MEMBERSHIP PROGRAMS
  {
    id: "ebay-plus",
    name: "eBay Plus",
    type: "category",
    tier: "program",
    status: "current",
    parent: "buyer",
    desc: "Paid membership offering fast free shipping, exclusive deals, and enhanced buyer benefits. Available in Germany (€19.90/year) and Australia ($49/year).",
    market: "DE", // DE and AU only, per research doc
    year: 2017 // Source: Research doc confirms 2017 launch
  },

  // MOTORS VERTICAL
  {
    id: "ebay-motors",
    name: "eBay Motors",
    type: "category",
    tier: "vertical",
    status: "current",
    parent: undefined,
    desc: "Dedicated marketplace vertical for vehicles, parts, and automotive accessories with specialized search and fitment tools.",
    market: "global",
    year: 1999 // eBay Motors launched 1999
  },
  {
    id: "my-garage",
    name: "My Garage",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-motors",
    desc: "Tool allowing buyers to save vehicle information to filter parts searches by compatibility with their specific make/model/year.",
    market: "global",
    year: 2012 // My Garage feature launched around 2012
  },
  {
    id: "ebay-guaranteed-fit",
    name: "eBay Guaranteed Fit",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "ebay-motors",
    desc: "Vehicle parts compatibility guarantee ensuring listed parts fit buyer's vehicle or receive free returns. Called 'Assured Fit' in UK.",
    market: "US", // US, UK (as Assured Fit), DE
    year: 2018 // Guaranteed Fit launched 2018
  },

  // DISCOVERY FEATURES
  {
    id: "saved-searches",
    name: "Saved Searches",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Feature allowing users to save search criteria and receive notifications when new matching listings appear.",
    market: "global",
    year: 2005 // Saved searches available since mid-2000s
  },
  {
    id: "recently-viewed",
    name: "Recently Viewed",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Personalized section showing items the user has recently browsed for easy return access.",
    market: "global",
    year: 2008 // Recently Viewed tracking added around 2008
  },
  {
    id: "best-match",
    name: "Best Match",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Default search ranking algorithm balancing relevance, seller performance, shipping speed, and buyer preferences.",
    market: "global",
    year: 2007 // Best Match introduced 2007 as default sort
  },
  {
    id: "image-search",
    name: "Image Search",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Visual search tool allowing users to upload or snap photos to find similar items on eBay using computer vision.",
    market: "US", // US, UK, CA, AU confirmed
    year: 2017 // Image Search launched 2017
  },
  {
    id: "find-it-on-ebay",
    name: "Find It On eBay",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Mobile app feature enabling users to photograph items in the real world and instantly search for them on eBay.",
    market: "US", // US, UK, CA, AU
    year: 2018 // Find It On eBay launched as mobile camera feature 2018
  }
];
