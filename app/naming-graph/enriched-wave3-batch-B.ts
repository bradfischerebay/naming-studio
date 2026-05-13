// eBay Naming Graph - Wave 3 Batch B
// Generated: 2026-04-17
// Programs: 50 newly enriched
// Research source: Research-Session-Complete-2026-04-17.md

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

export const ENRICHED_WAVE3_B: GraphNode[] = [
  {
    "id": "seller-hub",
    "name": "Seller Hub",
    "type": "category",
    "tier": "product",
    "status": "current",
    "parent": "sellertools",
    "desc": "Centralized seller management platform consolidating listing, order, and performance tools.",
    "market": "global",
    "year": 2017
  },
  {
    "id": "seller-centre",
    "name": "Seller Centre",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "sellertools",
    "desc": "Educational resource portal for seller best practices, policies, and program updates.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "my-ebay",
    "name": "My eBay",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Personalized buyer dashboard for managing purchases, watchlist, messages, and account settings.",
    "market": "global",
    "year": 1999
  },
  {
    "id": "selling-manager",
    "name": "Selling Manager",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "sellertools",
    "desc": "Legacy bulk listing and inventory management tool for sellers.",
    "market": "global",
    "renamedTo": "seller-hub",
    "year": 2005
  },
  {
    "id": "selling-manager-pro",
    "name": "Selling Manager Pro",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "sellertools",
    "desc": "Premium version of Selling Manager with enhanced reporting and automation features.",
    "market": "global",
    "renamedTo": "seller-hub",
    "year": 2006
  },
  {
    "id": "terapeak",
    "name": "Terapeak",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "sellertools",
    "desc": "Market research tool providing product demand analytics, competitor pricing, and sales trends data.",
    "market": "global",
    "year": 2017
  },
  {
    "id": "ebay-stores",
    "name": "eBay Stores",
    "type": "category",
    "tier": "product",
    "status": "current",
    "parent": "sellertools",
    "desc": "Subscription-based branded storefront program with tiered benefits for professional sellers.",
    "market": "global",
    "year": 2001
  },
  {
    "id": "ebay-advertising",
    "name": "eBay Advertising",
    "type": "advertising",
    "tier": "umbrella",
    "status": "current",
    "desc": "Umbrella brand for all paid advertising products including Promoted Listings and Promoted Stores.",
    "market": "global",
    "year": 2019
  },
  {
    "id": "promoted-listings",
    "name": "Promoted Listings",
    "type": "advertising",
    "tier": "product",
    "status": "current",
    "parent": "ebay-advertising",
    "desc": "Cost-per-sale advertising program boosting listing visibility in search and browse pages.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "promoted-listings-standard",
    "name": "Promoted Listings Standard",
    "type": "advertising",
    "tier": "variant",
    "status": "current",
    "parent": "promoted-listings",
    "desc": "Entry-level promoted listings tier with cost-per-sale pricing for on-site placements.",
    "market": "global",
    "year": 2019
  },
  {
    "id": "promoted-listings-advanced",
    "name": "Promoted Listings Advanced",
    "type": "advertising",
    "tier": "variant",
    "status": "current",
    "parent": "promoted-listings",
    "desc": "Premium promoted listings tier with cost-per-click pricing and priority placements (Germany uses 'Premium' strategy).",
    "market": "global",
    "year": 2020
  },
  {
    "id": "promoted-listings-express",
    "name": "Promoted Listings Express",
    "type": "advertising",
    "tier": "variant",
    "status": "legacy",
    "parent": "promoted-listings",
    "desc": "Discontinued rapid-promotion product for time-sensitive inventory clearance.",
    "market": "global",
    "renamedTo": "promoted-listings-standard",
    "year": 2019
  },
  {
    "id": "promoted-offsite",
    "name": "Promoted Offsite",
    "type": "advertising",
    "tier": "product",
    "status": "current",
    "parent": "ebay-advertising",
    "desc": "External advertising program promoting eBay listings on Google, Facebook, and partner sites.",
    "market": "global",
    "year": 2021
  },
  {
    "id": "promoted-stores-custom",
    "name": "Promoted Stores Custom",
    "type": "advertising",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-advertising",
    "desc": "Custom store-level advertising campaigns with flexible targeting and budget controls.",
    "market": "US",
    "year": 2022
  },
  {
    "id": "money-back-guarantee",
    "name": "Money Back Guarantee",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "Buyer protection program guaranteeing refunds for items not received or not as described.",
    "market": "global",
    "year": 1999
  },
  {
    "id": "vehicle-purchase-protection",
    "name": "Vehicle Purchase Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "Enhanced buyer protection for motor vehicle purchases with expanded coverage limits.",
    "market": ["US", "CA"],
    "year": 2016
  },
  {
    "id": "business-equipment-purchase-protection",
    "name": "Business Equipment Purchase Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "Specialized buyer protection for commercial equipment with higher claim limits.",
    "market": "US",
    "year": 2019
  },
  {
    "id": "ebay-refurbished-warranty",
    "name": "eBay Refurbished Warranty",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "2-year Allstate warranty covering refurbished products sold through eBay Refurbished program.",
    "market": "global",
    "year": 2020
  },
  {
    "id": "excellent-refurbished",
    "name": "Excellent - Refurbished",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "ebay-refurbished",
    "desc": "Top-tier refurbished condition grade indicating minimal signs of use with full functionality.",
    "market": "global",
    "year": 2020
  },
  {
    "id": "very-good-refurbished",
    "name": "Very Good - Refurbished",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "ebay-refurbished",
    "desc": "Second-tier refurbished condition with light cosmetic wear but full functionality.",
    "market": "global",
    "year": 2020
  },
  {
    "id": "good-refurbished",
    "name": "Good - Refurbished",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "ebay-refurbished",
    "desc": "Base-tier refurbished condition showing moderate wear but fully functional.",
    "market": "global",
    "year": 2020
  },
  {
    "id": "certified-open-box",
    "name": "Certified Open Box",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "Inspection program for open-box products with eBay verification and return guarantee.",
    "market": "US",
    "year": 2025
  },
  {
    "id": "ebay-guaranteed-fit",
    "name": "eBay Guaranteed Fit",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "ebay-motors",
    "desc": "Fitment guarantee for automotive parts with free returns if incompatible with buyer's vehicle.",
    "market": ["US", "DE", "FR", "IT", "CA", "AU"],
    "year": 2021
  },
  {
    "id": "ebay-assured-fit",
    "name": "eBay Assured Fit",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "ebay-motors",
    "desc": "UK-specific vehicle parts fitment guarantee with free returns for compatibility issues.",
    "market": "UK",
    "year": 2021
  },
  {
    "id": "buyer-protection",
    "name": "Buyer Protection",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "trust",
    "desc": "General buyer protection framework covering disputes, refunds, and transaction safety.",
    "market": "UK",
    "year": 2000
  },
  {
    "id": "ebay-buyer-guarantee",
    "name": "eBay Buyer Guarantee",
    "type": "trust",
    "tier": "program",
    "status": "renamed",
    "parent": "trust",
    "desc": "Legacy name for Money Back Guarantee in some markets.",
    "market": "global",
    "renamedTo": "money-back-guarantee",
    "year": 1999
  },
  {
    "id": "ebay-premium-services",
    "name": "eBay Premium Services",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "seller-performance-standards",
    "desc": "Market-specific premium seller badge (UK: Premium Service, DE: Top-Service, FR/IT: Service Premium).",
    "market": ["UK", "DE", "FR", "IT"],
    "year": 2024
  },
  {
    "id": "ebay-plus",
    "name": "eBay Plus",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "buyer",
    "desc": "Paid membership program offering fast free shipping and other benefits (DE: €19.90/year, AU: $49/year).",
    "market": ["DE", "AU"],
    "year": 2017
  },
  {
    "id": "seller-protections",
    "name": "Seller Protections",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "Protection policies covering seller disputes, unpaid items, and fraudulent buyers.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "global-shipping-program",
    "name": "Global Shipping Program",
    "type": "category",
    "tier": "program",
    "status": "legacy",
    "parent": "shipping",
    "desc": "Managed international shipping service (UK still active; US replaced by eBay International Shipping July 2023).",
    "market": ["UK", "CA"],
    "renamedTo": "ebay-international-shipping",
    "year": 2013
  },
  {
    "id": "ebay-international-shipping",
    "name": "eBay International Shipping",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "Simplified international shipping service replacing GSP in US/CA markets with transparent customs handling.",
    "market": ["US", "CA", "UK", "DE", "FR", "IT", "AU"],
    "year": 2023
  },
  {
    "id": "ebay-fulfilment",
    "name": "eBay Fulfilment",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "Fulfillment by Orange Connex service available in UK and DE markets.",
    "market": ["UK", "DE"],
    "year": 2020
  },
  {
    "id": "ebay-vault",
    "name": "eBay Vault",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "collectibles",
    "desc": "Secure storage facility for high-value collectibles with vault-to-vault transfers.",
    "market": "US",
    "year": 2022
  },
  {
    "id": "issue-resolution-center",
    "name": "Issue Resolution Center",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "trust",
    "desc": "Centralized dispute resolution platform for transaction issues and claims.",
    "market": "US",
    "year": 2018
  },
  {
    "id": "certified-recycled",
    "name": "Certified Recycled",
    "type": "impact",
    "tier": "program",
    "status": "current",
    "parent": "impact",
    "desc": "Certification program for products made with certified recycled materials.",
    "market": "UK",
    "year": 2022
  },
  {
    "id": "top-rated-seller",
    "name": "Top Rated Seller",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "seller-performance-standards",
    "desc": "Premium seller status recognizing consistently excellent service and performance metrics.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "vero-program",
    "name": "VeRO Program",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "Verified Rights Owner program allowing intellectual property holders to report infringement.",
    "market": "global",
    "year": 1998
  },
  {
    "id": "resolution-center",
    "name": "Resolution Center",
    "type": "trust",
    "tier": "feature",
    "status": "legacy",
    "parent": "trust",
    "desc": "Legacy dispute resolution interface being deprecated in favor of Issue Resolution Center.",
    "market": "global",
    "renamedTo": "issue-resolution-center",
    "year": 2010
  },
  {
    "id": "certified-refurbished",
    "name": "Certified Refurbished",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-refurbished",
    "desc": "Highest quality refurbished tier requiring manufacturer or authorized refurbisher certification.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "ebay-live",
    "name": "eBay Live",
    "type": "category",
    "tier": "product",
    "status": "current",
    "parent": "buyer",
    "desc": "Live shopping and auction streaming platform with real-time bidding.",
    "market": "global",
    "year": 2021
  },
  {
    "id": "shipping-labels",
    "name": "Shipping Labels",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Integrated shipping label purchase and printing service with carrier discounts.",
    "market": "global",
    "year": 2004
  },
  {
    "id": "ebay-international-standard-delivery",
    "name": "eBay International Standard Delivery",
    "type": "category",
    "tier": "program",
    "status": "legacy",
    "parent": "shipping",
    "desc": "Deprecated international shipping option replaced by eBay International Shipping.",
    "market": "US",
    "renamedTo": "ebay-international-shipping",
    "year": 2020
  },
  {
    "id": "simple-delivery",
    "name": "Simple Delivery",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "UK-specific mandatory C2C shipping program with standardized rates and tracking.",
    "market": "UK",
    "year": 2023
  },
  {
    "id": "local-pickup",
    "name": "Local Pickup",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "No-shipping option allowing buyers to collect items in person from seller.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "click-collect",
    "name": "Click & Collect",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "Retail pickup service at designated collection points.",
    "market": ["UK", "DE", "AU"],
    "year": 2015
  },
  {
    "id": "ebay-collection-points",
    "name": "eBay Collection Points",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "Network of pickup locations for convenient parcel collection.",
    "market": ["UK", "AU"],
    "year": 2018
  },
  {
    "id": "in-store-pickup",
    "name": "In-Store Pickup",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Option for buyers to collect purchases at seller's physical retail location.",
    "market": ["US", "UK", "DE", "AU"],
    "year": 2014
  },
  {
    "id": "managed-delivery",
    "name": "Managed Delivery",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "eBay-managed delivery service handling shipping logistics for sellers.",
    "market": "US",
    "year": 2021
  },
  {
    "id": "logistica-ebay-orange-connex",
    "name": "Logistica eBay by Orange Connex",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "Italy-specific fulfillment service operated by Orange Connex.",
    "market": "IT",
    "year": 2020
  }
];
