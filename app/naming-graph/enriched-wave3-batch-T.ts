// eBay Naming Graph - Wave 3 Batch T
// Enrichment Date: 2026-04-17
// Programs: 50 NEW unenriched programs from translations.ts
// Source: translations.ts lines 1-1100 (priority programs not yet enriched)

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

export const ENRICHED_WAVE3_T: GraphNode[] = [
  {
    id: "seller-hub",
    name: "Seller Hub",
    type: "category",
    tier: "product",
    status: "current",
    parent: "sellertools",
    desc: "Central seller dashboard replacing legacy Selling Manager tools, providing unified access to listings, orders, performance metrics, and seller tools.",
    market: "global",
    year: 2016
  },
  {
    id: "seller-centre",
    name: "Seller Centre",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Educational resource hub and policy center for sellers, distinct from operational Seller Hub.",
    market: "global",
    year: 2008
  },
  {
    id: "my-ebay",
    name: "My eBay",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Personalized buyer dashboard showing watchlist, purchases, saved searches, and account activity.",
    market: "global",
    year: 1999
  },
  {
    id: "selling-manager",
    name: "Selling Manager",
    type: "category",
    tier: "product",
    status: "legacy",
    parent: "sellertools",
    desc: "Legacy bulk listing and order management tool for professional sellers.",
    market: "global",
    year: 2004,
    renamedTo: "seller-hub"
  },
  {
    id: "selling-manager-pro",
    name: "Selling Manager Pro",
    type: "category",
    tier: "product",
    status: "legacy",
    parent: "sellertools",
    desc: "Premium version of Selling Manager with advanced automation, inventory tools, and reporting capabilities.",
    market: "global",
    year: 2005,
    renamedTo: "seller-hub"
  },
  {
    id: "terapeak",
    name: "Terapeak",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Market research tool integrated into Seller Hub showing pricing trends, competitor analysis, and category insights (now branded as 'Product research').",
    market: "global",
    year: 2017,
    renamedTo: "product-research"
  },
  {
    id: "ebay-stores",
    name: "eBay Stores",
    type: "category",
    tier: "program",
    status: "current",
    parent: "sellertools",
    desc: "Subscription-based customizable storefronts for professional sellers with branded pages, custom categories, and promotional tools.",
    market: "global",
    year: 2001
  },
  {
    id: "ebay-advertising",
    name: "eBay Advertising",
    type: "advertising",
    tier: "umbrella",
    status: "current",
    desc: "Umbrella brand for all eBay's advertising products including Promoted Listings, Promoted Stores, and offsite display.",
    market: "global",
    year: 2018
  },
  {
    id: "promoted-listings",
    name: "Promoted Listings",
    type: "advertising",
    tier: "t1",
    status: "current",
    parent: "ebay-advertising",
    desc: "Pay-per-sale advertising placing seller listings in premium placements across search results and product pages.",
    market: "global",
    year: 2015
  },
  {
    id: "promoted-listings-general",
    name: "Promoted Listings General",
    type: "advertising",
    tier: "t2",
    status: "legacy",
    parent: "promoted-listings",
    desc: "Original Promoted Listings tier with standard placement and final value fee-based pricing.",
    market: "global",
    year: 2015,
    renamedTo: "promoted-listings-standard"
  },
  {
    id: "promoted-listings-priority",
    name: "Promoted Listings Priority",
    type: "advertising",
    tier: "t2",
    status: "legacy",
    parent: "promoted-listings",
    desc: "Premium tier offering top-of-search placement with higher ad rates and priority visibility.",
    market: "global",
    year: 2019,
    renamedTo: "promoted-listings-advanced"
  },
  {
    id: "promoted-listings-express",
    name: "Promoted Listings Express",
    type: "advertising",
    tier: "t2",
    status: "legacy",
    parent: "promoted-listings",
    desc: "Simplified Promoted Listings option with automated bidding, discontinued April 2024.",
    market: "global",
    year: 2022,
    renamedTo: "promoted-listings-standard"
  },
  {
    id: "promoted-offsite",
    name: "Promoted Offsite",
    type: "advertising",
    tier: "program",
    status: "current",
    parent: "ebay-advertising",
    desc: "Programmatic display advertising distributing eBay listings to external sites like Google, Facebook, and publisher networks.",
    market: "global",
    year: 2019
  },
  {
    id: "promoted-stores-custom",
    name: "Promoted Stores Custom",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "promoted-stores",
    desc: "Advanced store promotion campaigns with customizable targeting and placement controls.",
    market: "US",
    year: 2021
  },
  {
    id: "brand-funded-promoted-listings-priority",
    name: "Brand-Funded Promoted Listings Priority",
    type: "advertising",
    tier: "program",
    status: "current",
    parent: "promoted-listings",
    desc: "Brand-subsidized advertising where manufacturers co-fund seller promotions of authorized products.",
    market: ["US", "UK"],
    year: 2022
  },
  {
    id: "brand-funded-promoted-stores",
    name: "Brand-Funded Promoted Stores",
    type: "advertising",
    tier: "program",
    status: "current",
    parent: "promoted-stores",
    desc: "Store-level advertising funded by brand partnerships for authorized resellers.",
    market: ["US", "UK"],
    year: 2022
  },
  {
    id: "promoted-brand",
    name: "Promoted Brand",
    type: "advertising",
    tier: "program",
    status: "current",
    parent: "ebay-advertising",
    desc: "Brand-level advertising campaigns promoting all inventory from a manufacturer or authorized retailer.",
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
    desc: "Managed-service display advertising product for enterprise sellers with dedicated account support.",
    market: ["US", "UK"],
    year: 2020
  },
  {
    id: "money-back-guarantee",
    name: "Money Back Guarantee",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "eBay's buyer protection program covering items not received or not as described, with full refund guarantee.",
    market: "global",
    year: 2008
  },
  {
    id: "vehicle-purchase-protection",
    name: "Vehicle Purchase Protection",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "ebay-motors",
    desc: "Enhanced buyer protection for vehicle purchases covering undisclosed damage and title issues up to $100,000.",
    market: ["US", "CA"],
    year: 2014
  },
  {
    id: "business-equipment-purchase-protection",
    name: "Business Equipment Purchase Protection",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Specialized buyer protection for commercial equipment purchases including machinery, tools, and industrial goods.",
    market: "US",
    year: 2018
  },
  {
    id: "certified-open-box",
    name: "Certified Open Box",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Seller-certified program for open-box items with inspection guarantees and standardized condition descriptions.",
    market: "US",
    year: 2021
  },
  {
    id: "buyer-protection",
    name: "Buyer Protection",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "UK-specific buyer protection umbrella covering various guarantee programs and dispute resolution services.",
    market: "UK",
    year: 2010
  },
  {
    id: "ebay-buyer-guarantee",
    name: "eBay Buyer Guarantee",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Alternative branding for Money Back Guarantee used in some EU markets, functionally identical protection.",
    market: "global",
    year: 2008
  },
  {
    id: "ebay-premium-services",
    name: "eBay Premium Services",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "trust",
    desc: "Seller badge indicating commitment to fast shipping, easy returns, and premium customer service standards.",
    market: ["UK", "DE", "FR", "IT"],
    year: 2016
  },
  {
    id: "ebay-plus",
    name: "eBay Plus",
    type: "category",
    tier: "program",
    status: "current",
    parent: "membership",
    desc: "Paid membership program offering free shipping, exclusive deals, and enhanced customer service (DE and AU only).",
    market: ["DE", "AU"],
    year: 2017
  },
  {
    id: "seller-protections",
    name: "Seller Protections",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Seller protection policies covering payment disputes, unauthorized transactions, and item not received claims.",
    market: "global",
    year: 2010
  },
  {
    id: "global-shipping-program",
    name: "Global Shipping Program",
    type: "category",
    tier: "program",
    status: "legacy",
    parent: "shipping",
    desc: "eBay-managed international shipping service handling customs, tracking, and delivery for cross-border sales.",
    market: ["US", "UK"],
    year: 2012,
    renamedTo: "ebay-international-shipping"
  },
  {
    id: "ebay-international-shipping",
    name: "eBay International Shipping",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "Replacement for Global Shipping Program offering streamlined cross-border shipping with upfront costs and tracking.",
    market: "global",
    year: 2020
  },
  {
    id: "ebay-fulfilment",
    name: "eBay Fulfilment",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "Third-party fulfillment service powered by Orange Connex offering storage, packing, and shipping for UK/DE sellers.",
    market: ["UK", "DE"],
    year: 2020
  },
  {
    id: "issue-resolution-center",
    name: "Issue Resolution Center",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "support",
    desc: "Legacy dispute resolution platform for buyers and sellers to resolve transaction issues.",
    market: "US",
    year: 2008,
    renamedTo: "resolution-center"
  },
  {
    id: "certified-recycled",
    name: "Certified Recycled",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "sustainability",
    desc: "UK sustainability program certifying products made from recycled materials with environmental impact tracking.",
    market: "UK",
    year: 2022
  },
  {
    id: "vero-program",
    name: "VeRO Program",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Verified Rights Owner program allowing intellectual property owners to report counterfeit and infringing listings.",
    market: "global",
    year: 1998
  },
  {
    id: "resolution-center",
    name: "Resolution Center",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "support",
    desc: "Centralized dispute resolution platform for buyers and sellers to manage returns, refunds, and transaction issues.",
    market: "global",
    year: 2014
  },
  {
    id: "certified-refurbished",
    name: "Certified Refurbished",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "refurbished",
    desc: "Manufacturer-refurbished items with original brand warranty and certification, highest refurbished tier.",
    market: "global",
    year: 2016
  },
  {
    id: "shipping-labels",
    name: "Shipping Labels",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Integrated shipping label printing with carrier discounts and automatic tracking upload.",
    market: "global",
    year: 2006
  },
  {
    id: "ebay-international-standard-delivery",
    name: "eBay International Standard Delivery",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Standard cross-border shipping option with estimated delivery windows and customs pre-clearance.",
    market: "US",
    year: 2020
  },
  {
    id: "simple-delivery",
    name: "Simple Delivery",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "UK-exclusive simplified shipping service with standardized rates and no seller-entered postage costs.",
    market: "UK",
    year: 2021
  },
  {
    id: "local-pickup",
    name: "Local Pickup",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Buyer option to collect items in person from seller location, avoiding shipping costs.",
    market: "global",
    year: 2000
  },
  {
    id: "click-and-collect",
    name: "Click & Collect",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "UK/DE/AU service allowing buyers to collect purchases from retail partner locations like Argos.",
    market: ["UK", "DE", "AU"],
    year: 2019
  },
  {
    id: "ebay-collection-points",
    name: "eBay Collection Points",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Network of retail partner pickup locations for convenient package collection.",
    market: ["UK", "AU"],
    year: 2019
  },
  {
    id: "in-store-pickup",
    name: "In-Store Pickup",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "US option for buyers to collect online purchases from seller's retail store location.",
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
    desc: "eBay-managed white-glove delivery service for large items like furniture and appliances.",
    market: "US",
    year: 2019
  },
  {
    id: "logistica-ebay-by-orange-connex",
    name: "Logistica eBay by Orange Connex",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "Italy-specific fulfillment service powered by Orange Connex for storage and shipping.",
    market: "IT",
    year: 2021
  },
  {
    id: "watchlist",
    name: "Watchlist",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Buyer feature to track and monitor items of interest with price alerts and ending-soon notifications.",
    market: "global",
    year: 1997
  },
  {
    id: "ebay-motors",
    name: "eBay Motors",
    type: "category",
    tier: "vertical",
    status: "current",
    parent: "verticals",
    desc: "Vertical marketplace for vehicles, parts, and accessories with specialized listing formats and protections.",
    market: "global",
    year: 2000
  },
  {
    id: "my-garage",
    name: "My Garage",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-motors",
    desc: "Personalized vehicle fitment tool allowing buyers to save their vehicles for automatic parts compatibility filtering.",
    market: "global",
    year: 2009
  },
  {
    id: "saved-searches",
    name: "Saved Searches",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Buyer feature saving search criteria with email alerts when new matching items are listed.",
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
    desc: "Personalization feature displaying user's recent browsing history for easy item re-discovery.",
    market: "global",
    year: 2008
  },
  {
    id: "best-match",
    name: "Best Match",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Default search ranking algorithm balancing relevance, seller quality, and buyer preferences (powered by Cassini).",
    market: "global",
    year: 2007
  }
]
