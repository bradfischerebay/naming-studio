// eBay Naming Graph - Wave 3 Batch C
// Enriched Programs: 50 new entries
// Generated: 2026-04-17
// Source: translations.ts (unenriched programs)

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

export const ENRICHED_WAVE3_C: GraphNode[] = [
  {
    "id": "selling-manager",
    "name": "Selling Manager",
    "type": "category",
    "tier": "product",
    "status": "legacy",
    "parent": "sellertools",
    "desc": "Legacy bulk listing and inventory management tool, largely replaced by Seller Hub and third-party tools.",
    "market": "global",
    "year": 2002
  },
  {
    "id": "selling-manager-pro",
    "name": "Selling Manager Pro",
    "type": "category",
    "tier": "product",
    "status": "legacy",
    "parent": "sellertools",
    "desc": "Premium version of Selling Manager with automation, reporting, and inventory management. Sunset in favor of Seller Hub.",
    "market": "global",
    "year": 2005,
    "renamedTo": "seller-hub"
  },
  {
    "id": "product-research",
    "name": "Product Research",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Market research tool (formerly Terapeak) providing sales data, pricing trends, and demand analytics for sellers.",
    "market": "global",
    "year": 2019,
    "renamedFrom": "terapeak"
  },
  {
    "id": "terapeak",
    "name": "Terapeak",
    "type": "category",
    "tier": "product",
    "status": "renamed",
    "parent": "sellertools",
    "desc": "Market research and analytics platform acquired by eBay in 2017, rebranded as Product Research.",
    "market": "global",
    "year": 2006,
    "renamedTo": "product-research"
  },
  {
    "id": "seller-centre",
    "name": "Seller Centre",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "sellertools",
    "desc": "Educational hub and seller resource center providing guides, best practices, and policy documentation.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "ebay-stores",
    "name": "eBay Stores",
    "type": "category",
    "tier": "product",
    "status": "current",
    "parent": "sellertools",
    "desc": "Subscription-based storefront service offering custom branding, dedicated store URLs, and reduced insertion fees across 5 tiers.",
    "market": "global",
    "year": 2001
  },
  {
    "id": "ebay-advertising",
    "name": "eBay Advertising",
    "type": "advertising",
    "tier": "umbrella",
    "status": "current",
    "desc": "Umbrella brand for all advertising products including Promoted Listings, Promoted Offsite, and display advertising.",
    "market": "global",
    "year": 2018
  },
  {
    "id": "promoted-listings-general",
    "name": "Promoted Listings Standard",
    "type": "advertising",
    "tier": "product",
    "status": "current",
    "parent": "ebay-advertising",
    "desc": "Cost-per-sale advertising product boosting listings in on-site search results, renamed from Promoted Listings General.",
    "market": "global",
    "year": 2015,
    "renamedFrom": "promoted-listings-general"
  },
  {
    "id": "promoted-listings-priority",
    "name": "Promoted Listings Advanced",
    "type": "advertising",
    "tier": "product",
    "status": "current",
    "parent": "ebay-advertising",
    "desc": "Premium CPC advertising with priority placement in search and homepage, renamed from Promoted Listings Priority.",
    "market": "global",
    "year": 2020,
    "renamedFrom": "promoted-listings-priority"
  },
  {
    "id": "promoted-listings-express",
    "name": "Promoted Listings Express",
    "type": "advertising",
    "tier": "product",
    "status": "current",
    "parent": "ebay-advertising",
    "desc": "Simplified one-click advertising enabling sellers to promote entire inventory with minimal setup.",
    "market": "global",
    "year": 2021
  },
  {
    "id": "promoted-offsite",
    "name": "Promoted Offsite",
    "type": "advertising",
    "tier": "product",
    "status": "current",
    "parent": "ebay-advertising",
    "desc": "External advertising service promoting listings on Google, Microsoft, and social platforms with cost-per-sale model.",
    "market": ["US", "UK", "DE"],
    "year": 2019
  },
  {
    "id": "promoted-stores-custom",
    "name": "Promoted Stores Custom",
    "type": "advertising",
    "tier": "program",
    "status": "current",
    "parent": "ebay-advertising",
    "desc": "Custom store-level advertising campaigns with brand-focused creative and targeting.",
    "market": "US",
    "year": 2021
  },
  {
    "id": "managed-display",
    "name": "Managed Display",
    "type": "advertising",
    "tier": "program",
    "status": "current",
    "parent": "ebay-advertising",
    "desc": "White-glove display advertising service with dedicated account management for enterprise sellers.",
    "market": ["US", "UK"],
    "year": 2022
  },
  {
    "id": "promoted-brand",
    "name": "Promoted Brand",
    "type": "advertising",
    "tier": "program",
    "status": "current",
    "parent": "ebay-advertising",
    "desc": "Brand-level advertising product allowing manufacturers and authorized dealers to promote brand stores and collections.",
    "market": ["US", "UK"],
    "year": 2023
  },
  {
    "id": "buyer-protection",
    "name": "Buyer Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "UK-specific buyer guarantee program providing purchase protection equivalent to Money Back Guarantee.",
    "market": "UK",
    "year": 2010
  },
  {
    "id": "ebay-buyer-guarantee",
    "name": "eBay Buyer Guarantee",
    "type": "trust",
    "tier": "program",
    "status": "renamed",
    "parent": "trust",
    "desc": "Former name for eBay Money Back Guarantee, providing buyer purchase protection.",
    "market": "global",
    "year": 2008,
    "renamedTo": "ebay-money-back-guarantee"
  },
  {
    "id": "ebay-premium-service",
    "name": "eBay Premium Service",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "buyer",
    "desc": "UK/EU seller badge for fast shipping, hassle-free returns, and excellent customer service standards.",
    "market": ["UK", "DE", "FR", "IT"],
    "year": 2014
  },
  {
    "id": "ebay-plus",
    "name": "eBay Plus",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "buyer",
    "desc": "Paid membership program (DE, AU only) offering free shipping, exclusive deals, and enhanced buyer experience.",
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
    "desc": "Seller-side protections against fraudulent claims, unpaid items, and payment reversals under specified conditions.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "global-shipping-program",
    "name": "Global Shipping Program",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "International shipping service handling customs, duties, and cross-border logistics with eBay-managed intermediary.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "ebay-international-shipping",
    "name": "eBay International Shipping",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "Successor to Global Shipping Program with streamlined international fulfillment and improved tracking.",
    "market": "global",
    "year": 2020
  },
  {
    "id": "ebay-fulfilment",
    "name": "eBay Fulfilment by Orange Connex",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "UK/EU fulfillment service through partnership with Orange Connex, offering warehousing and multi-channel logistics.",
    "market": ["UK", "DE"],
    "year": 2021
  },
  {
    "id": "ebay-vault",
    "name": "eBay Vault",
    "type": "category",
    "tier": "product",
    "status": "current",
    "parent": "collectibles",
    "desc": "Secure storage and trading service for high-value collectibles (cards, coins, watches) with instant vault-to-vault transfers.",
    "market": "US",
    "year": 2022
  },
  {
    "id": "issue-resolution-center",
    "name": "Issue Resolution Center",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "buyer",
    "desc": "Legacy dispute resolution interface, replaced by Resolution Center with enhanced communication tools.",
    "market": "global",
    "year": 2008,
    "renamedTo": "resolution-center"
  },
  {
    "id": "certified-recycled",
    "name": "Certified Recycled",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "UK program certifying products made from recycled materials with third-party verification.",
    "market": "UK",
    "year": 2021
  },
  {
    "id": "resolution-center",
    "name": "Resolution Center",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Centralized dispute resolution hub for returns, refunds, and transaction issues with buyer-seller messaging.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "certified-refurbished",
    "name": "Certified Refurbished",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-refurbished",
    "desc": "Manufacturer-refurbished products with original warranty, representing highest tier in refurbished condition hierarchy.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "ebay-live",
    "name": "eBay Live",
    "type": "category",
    "tier": "product",
    "status": "current",
    "parent": "buyer",
    "desc": "Live streaming commerce platform enabling sellers to host interactive shopping events with real-time bidding.",
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
    "desc": "Integrated shipping label purchase and printing service with discounted carrier rates (USPS, UPS, FedEx, etc.).",
    "market": "global",
    "year": 2008
  },
  {
    "id": "ebay-international-standard-delivery",
    "name": "eBay International Standard Delivery",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Standardized international shipping option with tracking and delivery time estimates.",
    "market": ["US", "UK"],
    "year": 2019
  },
  {
    "id": "simple-delivery",
    "name": "Simple Delivery",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "UK simplified shipping workflow with pre-populated carrier options and automated label generation.",
    "market": "UK",
    "year": 2020
  },
  {
    "id": "local-pickup",
    "name": "Local Pickup",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Shipping option allowing buyers to collect items in person, eliminating shipping costs and delivery time.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "click-and-collect",
    "name": "Click & Collect",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "UK/AU/DE service enabling buyers to pick up purchases from designated retail locations and lockers.",
    "market": ["UK", "AU", "DE"],
    "year": 2018
  },
  {
    "id": "ebay-collection-points",
    "name": "eBay Collection Points",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Network of retail partner locations serving as pickup points for buyer convenience.",
    "market": ["UK", "AU"],
    "year": 2019
  },
  {
    "id": "in-store-pickup",
    "name": "In-Store Pickup",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "US service allowing buyers to collect online purchases from brick-and-mortar retail partner stores.",
    "market": "US",
    "year": 2017
  },
  {
    "id": "managed-delivery",
    "name": "Managed Delivery",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "White-glove delivery service for large items (furniture, appliances) with scheduling, assembly, and haul-away options.",
    "market": "US",
    "year": 2020
  },
  {
    "id": "logistica-ebay-by-orange-connex",
    "name": "Logistica eBay by Orange Connex",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "Italy-specific fulfillment service through Orange Connex partnership offering warehousing and logistics.",
    "market": "IT",
    "year": 2022
  },
  {
    "id": "ebay-for-charity",
    "name": "eBay for Charity",
    "type": "impact",
    "tier": "program",
    "status": "current",
    "parent": "impact",
    "desc": "Charitable giving platform enabling sellers to donate auction proceeds to registered nonprofits with donation tracking.",
    "market": ["US", "UK", "DE", "CA", "AU"],
    "year": 2003
  },
  {
    "id": "ebay-motors",
    "name": "eBay Motors",
    "type": "category",
    "tier": "vertical",
    "status": "current",
    "desc": "Dedicated vertical marketplace for vehicles, parts, and automotive accessories with specialized listing formats.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "certified-open-box",
    "name": "Certified Open-Box",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-refurbished",
    "desc": "Condition tier for unopened returns and display models with minimal use, full functionality, and warranty coverage.",
    "market": "global",
    "year": 2021
  },
  {
    "id": "guaranteed-fit",
    "name": "eBay Guaranteed Fit",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "ebay-motors",
    "desc": "US automotive parts compatibility guarantee with free returns if part doesn't fit specified vehicle.",
    "market": "US",
    "year": 2019
  },
  {
    "id": "my-ebay",
    "name": "My eBay",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Personalized dashboard for buyers and sellers showing activity, watchlist, purchases, sales, and account settings.",
    "market": "global",
    "year": 1999
  },
  {
    "id": "seller-hub",
    "name": "Seller Hub",
    "type": "category",
    "tier": "product",
    "status": "current",
    "parent": "sellertools",
    "desc": "Modern seller workspace consolidating listings, orders, performance metrics, and business tools in unified interface.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "top-rated-seller",
    "name": "Top Rated Seller",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "seller-performance-standards",
    "desc": "Highest seller performance tier offering badge, search boost, and final value fee discounts for meeting strict service standards.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "seller-performance-standards",
    "name": "Seller Performance Standards",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "Three-tier performance framework (Below/Above/Top Rated) based on defect rate, late shipments, and transaction issues.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "business-equipment-purchase-protection",
    "name": "Business Equipment Purchase Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "Specialized buyer protection for business and industrial equipment purchases with extended claim periods.",
    "market": "US",
    "year": 2020
  },
  {
    "id": "excellent-refurbished",
    "name": "Excellent - Refurbished",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-refurbished",
    "desc": "Top-tier refurbished condition with minimal cosmetic wear, full testing, and comprehensive warranty coverage.",
    "market": "global",
    "year": 2020
  },
  {
    "id": "good-refurbished",
    "name": "Good - Refurbished",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-refurbished",
    "desc": "Entry-tier refurbished condition with moderate cosmetic wear but full functionality and basic warranty.",
    "market": "global",
    "year": 2020
  },
  {
    "id": "ebay-auto",
    "name": "eBay Auto",
    "type": "category",
    "tier": "vertical",
    "status": "current",
    "desc": "France-specific branding for automotive marketplace, equivalent to eBay Motors in other markets.",
    "market": "FR",
    "year": 2002
  }
];
