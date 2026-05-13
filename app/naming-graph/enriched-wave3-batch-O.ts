// eBay Naming Graph - Enriched Wave 3 Batch O
// Generated: 2026-04-17
// Programs: 50 NEW unenriched programs
// Focus: Shipping, Discovery, Store Features, Marketing Tools, Collectibles, Education

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

export const ENRICHED_WAVE3_O: GraphNode[] = [
  {
    "id": "promoted-stores-custom",
    "name": "Promoted Stores Custom",
    "type": "advertising",
    "tier": "variant",
    "status": "current",
    "parent": "promoted-stores",
    "desc": "Custom promotional campaigns for eBay Stores with advanced targeting and placement options.",
    "market": "US",
    "year": 2022
  },
  {
    "id": "brand-funded-promoted-listings-priority",
    "name": "Brand-Funded Promoted Listings Priority",
    "type": "advertising",
    "tier": "program",
    "status": "current",
    "parent": "promoted-listings",
    "desc": "Brand-sponsored advertising where manufacturers fund promoted placement for authorized sellers.",
    "market": ["US", "UK"],
    "year": 2023
  },
  {
    "id": "brand-funded-promoted-stores",
    "name": "Brand-Funded Promoted Stores",
    "type": "advertising",
    "tier": "program",
    "status": "current",
    "parent": "promoted-stores",
    "desc": "Brand-sponsored store promotions where manufacturers fund visibility for authorized store partners.",
    "market": ["US", "UK"],
    "year": 2023
  },
  {
    "id": "promoted-brand",
    "name": "Promoted Brand",
    "type": "advertising",
    "tier": "program",
    "status": "current",
    "parent": "ebay-advertising",
    "desc": "Brand-level advertising solution promoting manufacturer storefronts and product collections.",
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
    "desc": "Managed service display advertising across eBay and partner networks, handled by eBay Ads team.",
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
    "desc": "Purchase protection for vehicles up to $100,000, covering defects and misrepresentation claims.",
    "market": ["US", "CA"],
    "year": 2017
  },
  {
    "id": "business-equipment-purchase-protection",
    "name": "Business Equipment Purchase Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "Extended protection for business and industrial equipment purchases, covering high-value commercial transactions.",
    "market": "US",
    "year": 2018
  },
  {
    "id": "buyer-protection",
    "name": "Buyer Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "UK-specific buyer protection program providing purchase coverage and dispute resolution.",
    "market": "UK",
    "year": 2002
  },
  {
    "id": "issue-resolution-center",
    "name": "Issue Resolution Center",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "support",
    "desc": "Dispute resolution platform where buyers and sellers resolve transaction issues before escalation.",
    "market": "US",
    "year": 2008
  },
  {
    "id": "certified-recycled",
    "name": "Certified Recycled",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "sustainability",
    "desc": "UK program certifying refurbished products meet environmental sustainability and recycling standards.",
    "market": "UK",
    "year": 2023
  },
  {
    "id": "ebay-international-standard-delivery",
    "name": "eBay international standard delivery",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Standardized international shipping service with tracking and delivery estimates.",
    "market": "US",
    "year": 2023
  },
  {
    "id": "click-and-collect",
    "name": "Click & Collect",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Buy online, pick up at designated collection points including retail partners and parcel lockers.",
    "market": ["UK", "DE", "AU"],
    "year": 2015
  },
  {
    "id": "ebay-collection-points",
    "name": "eBay Collection Points",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Network of retail partner locations where buyers can collect eBay purchases.",
    "market": ["UK", "AU"],
    "year": 2016
  },
  {
    "id": "managed-delivery",
    "name": "Managed Delivery",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "White-glove delivery service for large items with scheduled delivery, installation, and assembly options.",
    "market": "US",
    "year": 2019
  },
  {
    "id": "excellent-refurbished",
    "name": "Excellent Refurbished",
    "type": "trust",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-refurbished",
    "desc": "Highest condition tier for refurbished items, near-mint with minimal signs of use.",
    "market": "global",
    "year": 2020
  },
  {
    "id": "very-good-refurbished",
    "name": "Very Good Refurbished",
    "type": "trust",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-refurbished",
    "desc": "Mid-tier refurbished condition with minor cosmetic imperfections, fully functional.",
    "market": "global",
    "year": 2020
  },
  {
    "id": "good-refurbished",
    "name": "Good Refurbished",
    "type": "trust",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-refurbished",
    "desc": "Entry-tier refurbished condition with visible wear but guaranteed functionality.",
    "market": "global",
    "year": 2020
  },
  {
    "id": "find-it-on-ebay",
    "name": "Find It On eBay",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discovery",
    "desc": "Browser extension and mobile feature for finding items on eBay while browsing other websites.",
    "market": ["US", "UK", "CA", "AU"],
    "year": 2019
  },
  {
    "id": "shop-by-category",
    "name": "Shop by Category",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discovery",
    "desc": "Primary navigation system organizing items into hierarchical product categories.",
    "market": "global",
    "year": 1995
  },
  {
    "id": "tcgplayer",
    "name": "TCGplayer",
    "type": "category",
    "tier": "platform",
    "status": "current",
    "parent": "collectibles",
    "desc": "Trading card marketplace platform acquired by eBay in 2022, integrated for card grading and pricing.",
    "market": ["US", "UK", "CA"],
    "year": 2022
  },
  {
    "id": "goldin-auctions",
    "name": "Goldin Auctions",
    "type": "category",
    "tier": "platform",
    "status": "current",
    "parent": "collectibles",
    "desc": "Premium auction house for sports cards and memorabilia, acquired by eBay and integrated in 2023.",
    "market": "global",
    "year": 2023
  },
  {
    "id": "ebay-standard-envelope",
    "name": "eBay Standard Envelope",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Low-cost tracked shipping option for small items under 3 oz like trading cards and coins.",
    "market": "US",
    "year": 2021
  },
  {
    "id": "ebay-guaranteed-delivery",
    "name": "eBay Guaranteed Delivery",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "Seller badge guaranteeing item arrival by specific date or buyer receives shipping refund.",
    "market": ["US", "AU"],
    "year": 2018
  },
  {
    "id": "export-academy",
    "name": "Export Academy",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "education",
    "desc": "Educational program teaching sellers international expansion and cross-border trade best practices.",
    "market": "global",
    "year": 2020
  },
  {
    "id": "ebay-university",
    "name": "eBay University",
    "type": "category",
    "tier": "program",
    "status": "legacy",
    "parent": "education",
    "desc": "Historical seller education program with in-person workshops and certification, discontinued in favor of online Academy.",
    "market": "US",
    "year": 2005,
    "renamedTo": "ebay-academy"
  },
  {
    "id": "make-an-offer",
    "name": "Make An Offer",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Buyer-initiated negotiation feature allowing price proposals on eligible listings.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "store-tier-starter",
    "name": "Store Tier - Starter",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "Entry-level eBay Store subscription tier with basic features and lower insertion fees.",
    "market": ["US", "AU"],
    "year": 2011
  },
  {
    "id": "store-tier-premium",
    "name": "Store Tier - Premium",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "Mid-tier eBay Store subscription with enhanced marketing tools and increased free listings.",
    "market": ["US", "DE", "FR", "IT", "CA"],
    "year": 2008
  },
  {
    "id": "store-tier-featured",
    "name": "Store Tier - Featured",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "High-tier eBay Store subscription with premium placement and advanced customization.",
    "market": ["UK", "DE", "FR", "AU"],
    "year": 2008
  },
  {
    "id": "store-newsletters",
    "name": "Store Newsletters",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "Email marketing tool allowing store subscribers to receive seller newsletters and promotions.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "order-discounts",
    "name": "Order Discounts",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Automated discounts based on order value thresholds, encouraging larger purchases.",
    "market": "global",
    "year": 2019
  },
  {
    "id": "sale-events",
    "name": "Sale Events",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Time-limited promotional events with markdown pricing on selected inventory.",
    "market": "global",
    "year": 2019
  },
  {
    "id": "coupons",
    "name": "Coupons",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Coded discount coupons sellers can distribute to targeted buyer segments.",
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
    "desc": "Quantity-based discounts encouraging bulk purchases with tiered pricing.",
    "market": "global",
    "year": 2013
  },
  {
    "id": "offers-to-buyers",
    "name": "Offers to Buyers",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "marketing",
    "desc": "Seller-initiated private discount offers sent to interested buyers or watchers.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "promotions-manager",
    "name": "Promotions Manager",
    "type": "category",
    "tier": "product",
    "status": "current",
    "parent": "marketing",
    "desc": "Unified dashboard for creating and managing all seller promotional campaigns and discounts.",
    "market": "global",
    "year": 2024
  },
  {
    "id": "markdown-manager",
    "name": "Markdown Manager",
    "type": "category",
    "tier": "product",
    "status": "legacy",
    "parent": "marketing",
    "desc": "Seller tool for scheduling price reductions and sales events, replaced by Promotions Manager.",
    "market": "global",
    "year": 2018,
    "renamedTo": "promotions-manager"
  },
  {
    "id": "seller-initiated-offer",
    "name": "Seller Initiated Offer",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "marketing",
    "desc": "Proactive discount offers sent by sellers to specific buyer segments based on interest signals.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "sponsored-products",
    "name": "Sponsored Products",
    "type": "advertising",
    "tier": "program",
    "status": "current",
    "parent": "ebay-advertising",
    "desc": "Alternative branding for Promoted Listings in some markets, promoting individual product listings.",
    "market": ["US", "UK"],
    "year": 2016
  },
  {
    "id": "listing-analytics",
    "name": "Listing Analytics",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Performance metrics for individual listings showing views, watchers, conversion rate, and traffic sources.",
    "market": "global",
    "year": 2017
  },
  {
    "id": "traffic-reports",
    "name": "Traffic Reports",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Store-level analytics showing visitor traffic, sources, and engagement metrics.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "sales-reports",
    "name": "Sales Reports",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Comprehensive sales analytics with revenue, units sold, and performance trends.",
    "market": "global",
    "year": 2006
  },
  {
    "id": "item-specifics",
    "name": "Item Specifics",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing",
    "desc": "Structured product attributes improving search relevance and buyer filtering.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "catalog-integration",
    "name": "Catalog Integration",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing",
    "desc": "Product catalog matching for pre-filled item details and standardized product pages.",
    "market": "global",
    "year": 2013
  },
  {
    "id": "condition-description",
    "name": "Condition Description",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing",
    "desc": "Detailed text field for sellers to describe item condition beyond standard categories.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "multi-variation-listings",
    "name": "Multi-Variation Listings",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing",
    "desc": "Single listing displaying multiple product variations (size, color, etc.) with distinct inventory.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "scheduled-listings",
    "name": "Scheduled Listings",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing",
    "desc": "Ability to create listings in advance with scheduled publication date and time.",
    "market": "global",
    "year": 2003
  },
  {
    "id": "shipping-rate-tables",
    "name": "Shipping Rate Tables",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Reusable shipping policy templates with zone-based rates and service options.",
    "market": "global",
    "year": 2011
  },
  {
    "id": "calculated-shipping",
    "name": "Calculated Shipping",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Dynamic shipping cost calculation based on buyer location, package dimensions, and carrier rates.",
    "market": "global",
    "year": 2004
  },
  {
    "id": "handling-time",
    "name": "Handling Time",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Seller commitment for processing time between payment and shipment, factored into delivery estimates.",
    "market": "global",
    "year": 2007
  }
]
