// eBay Naming Graph - Wave 3 Batch L
// 50 NEW enriched programs from translations.ts
// Generated: 2026-04-17
// Source: Research-Session-Complete-2026-04-17.md

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

export const ENRICHED_WAVE3_L: GraphNode[] = [
  {
    "id": "promoted-stores-custom",
    "name": "Promoted Stores Custom",
    "type": "advertising",
    "tier": "variant",
    "status": "current",
    "parent": "promoted-stores",
    "desc": "Custom-targeted store advertising variant allowing sellers to customize promotional placements for their entire store catalog.",
    "market": "US",
    "year": 2023
  },
  {
    "id": "brand-funded-promoted-listings-priority",
    "name": "Brand-Funded Promoted Listings Priority",
    "type": "advertising",
    "tier": "program",
    "status": "current",
    "parent": "promoted-listings",
    "desc": "Brand-funded advertising program where manufacturers pay for seller listings to be promoted, available in US and UK markets.",
    "market": ["US", "UK"],
    "year": 2022
  },
  {
    "id": "brand-funded-promoted-stores",
    "name": "Brand-Funded Promoted Stores",
    "type": "advertising",
    "tier": "program",
    "status": "current",
    "parent": "promoted-stores",
    "desc": "Brand-funded program where manufacturers sponsor entire seller stores carrying their products.",
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
    "desc": "Brand-level advertising product allowing manufacturers to promote their brand presence across eBay.",
    "market": ["US", "UK"],
    "year": 2023
  },
  {
    "id": "managed-display",
    "name": "Managed Display",
    "type": "advertising",
    "tier": "program",
    "status": "current",
    "parent": "ebay-advertising",
    "desc": "Display advertising program managed by eBay's advertising team for high-volume sellers and brands.",
    "market": ["US", "UK"],
    "year": 2021
  },
  {
    "id": "vehicle-purchase-protection",
    "name": "Vehicle Purchase Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "ebay-motors",
    "desc": "Purchase protection program for vehicle transactions on eBay Motors, covering up to $100,000 for eligible vehicles in US and CA.",
    "market": ["US", "CA"],
    "year": 2018
  },
  {
    "id": "business-equipment-purchase-protection",
    "name": "Business Equipment Purchase Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "Purchase protection program for commercial and industrial equipment buyers, providing fraud protection on high-value business equipment purchases.",
    "market": "US",
    "year": 2019
  },
  {
    "id": "certified-open-box",
    "name": "Certified Open Box",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "ebay-refurbished",
    "desc": "eBay-verified condition grade for open-box items with full inspection and warranty, launched May 2025 in US only.",
    "market": "US",
    "year": 2025
  },
  {
    "id": "buyer-protection",
    "name": "Buyer Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "UK-specific buyer protection program, alternate branding for Money Back Guarantee covering purchases when items don't arrive or don't match description.",
    "market": "UK",
    "year": 2002
  },
  {
    "id": "ebay-fulfilment",
    "name": "eBay Fulfilment",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "Third-party fulfillment service operated by Orange Connex in UK and DE, providing warehousing, packing, and shipping for sellers.",
    "market": ["UK", "DE"],
    "year": 2023
  },
  {
    "id": "issue-resolution-center",
    "name": "Issue Resolution Center",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "support",
    "desc": "Dispute resolution platform for buyers and sellers to resolve transaction issues, manage returns, and file claims.",
    "market": "US",
    "year": 2009
  },
  {
    "id": "certified-recycled",
    "name": "Certified Recycled",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "UK certification program for electronics verified to be professionally recycled with data wiping and functional testing.",
    "market": "UK",
    "year": 2024
  },
  {
    "id": "ebay-international-standard-delivery",
    "name": "eBay International Standard Delivery",
    "type": "category",
    "tier": "program",
    "status": "legacy",
    "parent": "shipping",
    "desc": "Legacy international shipping program replaced by eBay International Shipping in July 2023.",
    "market": "US",
    "year": 2020,
    "renamedTo": "ebay-international-shipping"
  },
  {
    "id": "simple-delivery",
    "name": "Simple Delivery",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "UK mandatory C2C shipping program providing streamlined domestic delivery with prepaid labels and tracking.",
    "market": "UK",
    "year": 2022
  },
  {
    "id": "ebay-collection-points",
    "name": "eBay Collection Points",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "Network of retail locations where buyers can collect parcels, available in UK and AU markets.",
    "market": ["UK", "AU"],
    "year": 2020
  },
  {
    "id": "in-store-pickup",
    "name": "In-Store Pickup",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Feature allowing buyers to purchase online and collect items from seller's physical retail location, branded as Click & Collect in UK/DE/AU.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "managed-delivery",
    "name": "Managed Delivery",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "White-glove delivery service for large or fragile items with scheduled delivery windows and professional handling.",
    "market": "US",
    "year": 2021
  },
  {
    "id": "logistica-ebay-by-orange-connex",
    "name": "Logistica eBay by Orange Connex",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "Italy-specific fulfillment service operated by Orange Connex providing end-to-end logistics for Italian sellers.",
    "market": "IT",
    "year": 2023
  },
  {
    "id": "image-search",
    "name": "Image Search",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discovery",
    "desc": "Visual search feature allowing buyers to search eBay inventory using photos instead of text queries, available in US, UK, CA, AU.",
    "market": ["US", "UK", "CA", "AU"],
    "year": 2017
  },
  {
    "id": "find-it-on-ebay",
    "name": "Find It On eBay",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discovery",
    "desc": "Mobile app feature using camera to identify products and find them on eBay, available in US, UK, CA, AU.",
    "market": ["US", "UK", "CA", "AU"],
    "year": 2019
  },
  {
    "id": "price-guide",
    "name": "Price Guide",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "collectibles",
    "desc": "Historical pricing data tool for collectibles showing sold prices and market trends, primarily for trading cards and collectibles.",
    "market": "US",
    "year": 2021
  },
  {
    "id": "trading-card-hub",
    "name": "Trading Card Hub",
    "type": "vertical",
    "tier": "platform",
    "status": "current",
    "parent": "collectibles",
    "desc": "Dedicated platform for trading card collectors with Price Guide integration, PSA authentication, and specialized search tools.",
    "market": "US",
    "year": 2021
  },
  {
    "id": "tcgplayer",
    "name": "TCGplayer",
    "type": "vertical",
    "tier": "platform",
    "status": "current",
    "parent": "collectibles",
    "desc": "TCG marketplace acquired by eBay in 2022, operating as standalone platform for trading card games in US, UK, CA.",
    "market": ["US", "UK", "CA"],
    "year": 2022
  },
  {
    "id": "goldin-auctions",
    "name": "Goldin Auctions",
    "type": "vertical",
    "tier": "platform",
    "status": "current",
    "parent": "collectibles",
    "desc": "Premium collectibles auction house operating on eBay platform globally, specializing in high-value sports memorabilia and cards.",
    "market": "global",
    "year": 2021
  },
  {
    "id": "ebay-standard-envelope",
    "name": "eBay Standard Envelope",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "Low-cost tracked shipping option for trading cards and small collectibles using standard envelopes with USPS tracking, US-only program.",
    "market": "US",
    "year": 2021
  },
  {
    "id": "export-academy",
    "name": "Export Academy",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "ebay-academy",
    "desc": "Educational program teaching sellers how to expand to international markets, available globally with localized content.",
    "market": "global",
    "year": 2019
  },
  {
    "id": "feedback-forum",
    "name": "Feedback Forum",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "community",
    "desc": "Community forum where buyers and sellers leave public feedback ratings and reviews for completed transactions.",
    "market": ["US", "UK", "CA", "AU"],
    "year": 1996
  },
  {
    "id": "ebay-university",
    "name": "eBay University",
    "type": "category",
    "tier": "program",
    "status": "legacy",
    "parent": "education",
    "desc": "Legacy educational program offering in-person selling workshops and online courses, largely replaced by eBay Academy.",
    "market": "US",
    "year": 2000,
    "renamedTo": "ebay-academy"
  },
  {
    "id": "store-tier-starter",
    "name": "Store Tier - Starter",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "Entry-level store subscription tier in US, rebranded as Pro Starter in Australia in 2026.",
    "market": ["US", "AU"],
    "year": 2001
  },
  {
    "id": "store-tier-enterprise",
    "name": "Store Tier - Enterprise",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "Highest store subscription tier for enterprise sellers with unlimited listings and maximum marketing benefits.",
    "market": "US",
    "year": 2019
  },
  {
    "id": "store-tier-platin",
    "name": "Store Tier - Platin",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "Germany-exclusive premium store tier (Platin-Shop), highest available tier above Premium, unique to DE market.",
    "market": "DE",
    "year": 2018
  },
  {
    "id": "store-tier-premium-plus",
    "name": "Store Tier - Premium Plus",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "Italy-exclusive store tier (Negozio Premium Plus), mid-to-high tier offering enhanced features beyond basic Premium.",
    "market": "IT",
    "year": 2019
  },
  {
    "id": "ai-banner",
    "name": "AI Banner",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "AI-powered store banner generator creating custom branded banners using machine learning, launched globally in 2024.",
    "market": "global",
    "year": 2024
  },
  {
    "id": "order-discounts",
    "name": "Order Discounts",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Promotional tool within Discounts Manager allowing sellers to offer quantity-based discounts on multi-item orders.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "sale-events",
    "name": "Sale Events",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Time-limited promotional campaigns within Discounts Manager allowing sellers to run store-wide sales events.",
    "market": "global",
    "year": 2017
  },
  {
    "id": "coupons",
    "name": "Coupons",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Promotional codes that buyers can apply at checkout for discounts, managed through Discounts Manager or Promotions Manager.",
    "market": "global",
    "year": 2018
  },
  {
    "id": "volume-pricing",
    "name": "Volume Pricing",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Quantity-based pricing tool offering automatic discounts when buyers purchase multiple units, called Multi-Buy in UK.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "offers-to-buyers",
    "name": "Offers to Buyers",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Seller-initiated discount offers sent directly to interested buyers via My eBay notifications and email.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "shipping-discounts",
    "name": "Shipping Discounts",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Promotional tool allowing sellers to offer reduced or free shipping as part of marketing campaigns.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "coded-coupons",
    "name": "Coded Coupons",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Unique coupon codes that sellers can distribute for targeted promotions and trackable marketing campaigns.",
    "market": "global",
    "year": 2018
  },
  {
    "id": "markdown-manager",
    "name": "Markdown Manager",
    "type": "category",
    "tier": "program",
    "status": "legacy",
    "parent": "discounts-manager",
    "desc": "Legacy tool for automating price reductions on unsold inventory, merged into Promotions Manager in 2024.",
    "market": ["US", "UK", "CA", "AU"],
    "year": 2019,
    "renamedTo": "promotions-manager"
  },
  {
    "id": "seller-initiated-offers",
    "name": "Seller Initiated Offers",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Feature allowing sellers to proactively send discount offers to buyers who have watched or viewed their items.",
    "market": "global",
    "year": 2013
  },
  {
    "id": "send-coupon",
    "name": "Send Coupon",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Marketing tool enabling sellers to send targeted coupon codes to specific buyer segments or store subscribers.",
    "market": "global",
    "year": 2019
  },
  {
    "id": "print-coupons",
    "name": "Print Coupons",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Legacy feature allowing sellers to generate printable coupon codes for offline distribution and marketing.",
    "market": "global",
    "year": 2018
  },
  {
    "id": "boost-buyer-engagement",
    "name": "Boost Buyer Engagement",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "marketing",
    "desc": "Marketing automation feature helping sellers re-engage buyers through targeted communications and promotional offers.",
    "market": ["US", "UK", "CA", "AU"],
    "year": 2023
  },
  {
    "id": "buyer-groups",
    "name": "Buyer Groups",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "marketing",
    "desc": "Segmentation tool allowing sellers to organize buyers into groups for targeted marketing and exclusive offers.",
    "market": "global",
    "year": 2020
  },
  {
    "id": "free-shipping",
    "name": "Free Shipping",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Seller marketing feature offering zero shipping costs to buyers, often used as competitive advantage and promotional tool.",
    "market": "global",
    "year": 2009
  },
  {
    "id": "fast-n-free",
    "name": "Fast 'N Free",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "shipping",
    "desc": "Legacy badge for fast free shipping, being replaced by specific day-count badges like Free 2-day shipping in 2024-2025.",
    "market": "global",
    "year": 2017,
    "renamedTo": "free-x-day-shipping"
  },
  {
    "id": "ebay-guaranteed-delivery",
    "name": "eBay Guaranteed Delivery",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "Delivery guarantee program ensuring items arrive by specified date or buyers receive refund, available in US, UK, CA, AU.",
    "market": ["US", "UK", "CA", "AU"],
    "year": 2018
  },
  {
    "id": "ebay-fitment-plus-auto",
    "name": "eBay Fitment Plus Auto",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "ebay-motors",
    "desc": "Enhanced automotive parts fitment verification tool launched October 2025, providing improved compatibility matching and My Garage integration.",
    "market": "US",
    "year": 2025
  }
]
