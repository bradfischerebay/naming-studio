// Sample enriched GraphNode data for first 20 programs
// This demonstrates the full enrichment structure

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

export const ENRICHED_NODES_SAMPLE: GraphNode[] = [
  {
    id: "seller-hub",
    name: "Seller Hub",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "sellertools",
    desc: "Centralized dashboard for managing eBay selling activities, listings, orders, and performance metrics",
    market: "global",
    year: 2017
  },
  {
    id: "seller-centre",
    name: "Seller Centre",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "sellertools",
    desc: "Educational hub providing seller guidance, best practices, and policy information",
    market: "global",
    year: 2010
  },
  {
    id: "my-ebay",
    name: "My eBay",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "buyer",
    desc: "Personalized buyer dashboard for managing purchases, saved items, and account settings",
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
    desc: "Basic seller tool for managing listings and sales, replaced by Seller Hub",
    market: "global",
    year: 2005,
    renamedTo: "Seller Hub"
  },
  {
    id: "selling-manager-pro",
    name: "Selling Manager Pro",
    type: "category",
    tier: "product",
    status: "legacy",
    parent: "sellertools",
    desc: "Advanced seller management tool with automation and bulk editing, replaced by Seller Hub",
    market: "global",
    year: 2007,
    renamedTo: "Seller Hub"
  },
  {
    id: "terapeak",
    name: "Terapeak",
    type: "category",
    tier: "product",
    status: "current",
    parent: "sellertools",
    desc: "Market research tool providing pricing, competition, and demand analysis for eBay sellers",
    market: "global",
    year: 2007
  },
  {
    id: "ebay-stores",
    name: "eBay Stores",
    type: "category",
    tier: "program",
    status: "current",
    parent: "stores",
    desc: "Subscription-based customizable storefronts offering reduced fees and marketing tools",
    market: "global",
    year: 2001
  },
  {
    id: "ebay-advertising",
    name: "eBay Advertising",
    type: "advertising",
    tier: "umbrella",
    status: "current",
    parent: undefined,
    desc: "Portfolio brand encompassing all paid advertising products including Promoted Listings",
    market: "global",
    year: 2015
  },
  {
    id: "promoted-listings",
    name: "Promoted Listings",
    type: "advertising",
    tier: "t1",
    status: "current",
    parent: "advertising",
    desc: "Pay-per-sale advertising program increasing listing visibility in search results",
    market: "global",
    year: 2015
  },
  {
    id: "promoted-listings-standard",
    name: "Promoted Listings Standard",
    type: "advertising",
    tier: "variant",
    status: "current",
    parent: "advertising",
    desc: "Basic promoted listings tier with cost-per-sale pricing for increased search visibility",
    market: "global",
    year: 2015
  },
  {
    id: "promoted-listings-advanced",
    name: "Promoted Listings Advanced",
    type: "advertising",
    tier: "variant",
    status: "current",
    parent: "advertising",
    desc: "Premium promoted listings with cost-per-click pricing and advanced targeting",
    market: "global",
    year: 2020
  },
  {
    id: "promoted-listings-express",
    name: "Promoted Listings Express",
    type: "advertising",
    tier: "variant",
    status: "legacy",
    parent: "advertising",
    desc: "Deprecated automated promoted listings variant discontinued in April 2024",
    market: "global",
    year: 2022,
    renamedTo: "Promoted Listings Standard"
  },
  {
    id: "promoted-offsite",
    name: "Promoted Offsite",
    type: "advertising",
    tier: "product",
    status: "current",
    parent: "advertising",
    desc: "External advertising program promoting eBay listings on Google, Facebook, and other platforms",
    market: "global",
    year: 2020
  },
  {
    id: "money-back-guarantee",
    name: "Money Back Guarantee",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Buyer protection program ensuring refunds if items don't arrive or don't match descriptions",
    market: "global",
    year: 1999
  },
  {
    id: "authenticity-guarantee",
    name: "Authenticity Guarantee",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Third-party authentication service verifying luxury items like watches, sneakers, and handbags",
    market: "global",
    year: 2020
  },
  {
    id: "ebay-plus",
    name: "eBay Plus",
    type: "category",
    tier: "program",
    status: "current",
    parent: "buyer",
    desc: "Paid membership offering fast free shipping and exclusive deals in Germany and Australia",
    market: "DE",
    year: 2017
  },
  {
    id: "top-rated-seller",
    name: "Top Rated Seller",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Elite seller status offering fee discounts and Top Rated Plus badge for excellent performance",
    market: "global",
    year: 2008
  },
  {
    id: "vero-program",
    name: "VeRO Program",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Verified Rights Owner program allowing trademark and copyright holders to report infringement",
    market: "global",
    year: 1998
  },
  {
    id: "ebay-refurbished",
    name: "eBay Refurbished",
    type: "category",
    tier: "program",
    status: "current",
    parent: "refurbished",
    desc: "Four-tier certified refurbished program with inspections, warranties, and return guarantees",
    market: "global",
    year: 2020
  },
  {
    id: "ebay-live",
    name: "eBay Live",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "live",
    desc: "Livestream shopping platform allowing sellers to host live video sales events",
    market: "global",
    year: 2022
  }
];
