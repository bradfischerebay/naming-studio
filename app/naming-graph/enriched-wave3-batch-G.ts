// eBay Naming Graph - Wave 3 Batch G
// 50 NEW enriched programs from translations.ts
// Generated: 2026-04-17
// Export: ENRICHED_WAVE3_G

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

export const ENRICHED_WAVE3_G: GraphNode[] = [
  {
    "id": "open-box",
    "name": "Open Box",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-refurbished",
    "desc": "Item previously opened but unused or lightly tested; may have damaged packaging.",
    "market": "global",
    "year": 2018
  },
  {
    "id": "catalog-integration",
    "name": "Catalog Integration",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing",
    "desc": "System that matches seller listings to eBay's product catalog for standardized item representation.",
    "market": "global",
    "year": 2007
  },
  {
    "id": "parts-compatibility",
    "name": "Parts Compatibility",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "ebay-motors",
    "desc": "Fitment data showing which vehicles a part is compatible with.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "shop-by-diagram",
    "name": "Shop by Diagram",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "ebay-motors",
    "desc": "Visual parts finder using exploded diagrams and OEM part numbers.",
    "market": ["US", "UK", "DE"],
    "year": 2019
  },
  {
    "id": "time-away",
    "name": "Time Away",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Automated vacation mode that pauses or extends handling times during seller absences.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "out-of-stock-control",
    "name": "Out of Stock Control",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "inventory-management",
    "desc": "Automated listing management for inventory depletion; hides out-of-stock items.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "business-policies",
    "name": "Business Policies",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Reusable templates for payment, shipping, and return policies across multiple listings.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "automatic-relisting",
    "name": "Automatic Relisting",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing",
    "desc": "Automated relisting of unsold items until sold or limit reached.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "good-til-cancelled",
    "name": "Good Til Cancelled",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing",
    "desc": "Auto-renewing fixed-price listings that continue until manually ended or item sells.",
    "market": "global",
    "year": 2001
  },
  {
    "id": "international-site-visibility",
    "name": "International Site Visibility",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "cross-border-trade",
    "desc": "Automatic listing exposure on international eBay sites to expand buyer reach.",
    "market": "global",
    "year": 2013
  },
  {
    "id": "buyer-review",
    "name": "Buyer Review",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "feedback",
    "desc": "Product review system where buyers rate items independently from seller feedback.",
    "market": "global",
    "year": 2018
  },
  {
    "id": "item-reviews",
    "name": "Item Reviews",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Aggregated reviews for catalog products showing ratings across multiple sellers.",
    "market": "global",
    "year": 2018
  },
  {
    "id": "unpaid-item-assistant",
    "name": "Unpaid Item Assistant",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "seller-tools",
    "desc": "Automated system for filing unpaid item cases after buyer non-payment. Replaced by integrated Managed Payments resolution.",
    "market": "global",
    "year": 2008,
    "renamedTo": "Managed Payments Resolution"
  },
  {
    "id": "unpaid-item-case",
    "name": "Unpaid Item Case",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "resolution-center",
    "desc": "Formal dispute process for non-paying buyers. Deprecated with Managed Payments rollout.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "bulk-listing-tool",
    "name": "Bulk Listing Tool",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Multi-item listing creation and editing tool for high-volume sellers.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "turbo-lister",
    "name": "Turbo Lister",
    "type": "category",
    "tier": "product",
    "status": "legacy",
    "parent": "seller-tools",
    "desc": "Desktop application for offline bulk listing creation. Discontinued 2018.",
    "market": "global",
    "year": 2003,
    "renamedTo": "File Exchange"
  },
  {
    "id": "file-exchange",
    "name": "File Exchange",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "CSV/XML bulk upload system for high-volume listing management.",
    "market": "global",
    "year": 2007
  },
  {
    "id": "listing-analytics",
    "name": "Listing Analytics",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Performance metrics showing views, watch count, and conversion data per listing.",
    "market": "global",
    "year": 2017
  },
  {
    "id": "traffic-report",
    "name": "Traffic Report",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub-reports",
    "desc": "Analytics showing page views, search impressions, and traffic sources.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "order-report",
    "name": "Order Report",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub-reports",
    "desc": "Detailed transaction export with order data, fees, and shipping information.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "transaction-report",
    "name": "Transaction Report",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub-reports",
    "desc": "Financial transaction history including sales, fees, and payment details.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "performance-dashboard",
    "name": "Performance Dashboard",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Real-time seller metrics tracking defect rates, feedback, and seller level progress.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "selling-with-ai",
    "name": "Selling with AI",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "seller-tools",
    "desc": "AI-powered suite including automated listing creation, image enhancement, and pricing recommendations.",
    "market": "global",
    "year": 2024
  },
  {
    "id": "background-enhancement",
    "name": "Background Enhancement",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing",
    "desc": "AI-powered background removal and replacement for product photos.",
    "market": "global",
    "year": 2024
  },
  {
    "id": "managed-delivery",
    "name": "Managed Delivery",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "eBay-coordinated shipping with carrier integration and automated tracking.",
    "market": ["US", "UK", "DE"],
    "year": 2022
  },
  {
    "id": "managed-returns",
    "name": "Managed Returns",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "returns",
    "desc": "Automated returns process with prepaid labels and return authorization.",
    "market": "global",
    "year": 2021
  },
  {
    "id": "in-store-pickup",
    "name": "In-Store Pickup",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Buy online, pick up at seller's physical retail location.",
    "market": ["US", "UK", "AU"],
    "year": 2019
  },
  {
    "id": "ebay-collection-points",
    "name": "eBay Collection Points",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "Network of retail partners for package pickup. UK-specific implementation of Click & Collect.",
    "market": "UK",
    "year": 2016
  },
  {
    "id": "international-standard-delivery",
    "name": "International Standard Delivery",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "ebay-international-shipping",
    "desc": "Cost-effective international shipping option with economy rates and standard tracking.",
    "market": "global",
    "year": 2020
  },
  {
    "id": "fast-n-free",
    "name": "Fast 'N Free",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Combined badge for free domestic shipping with 4-day or faster delivery.",
    "market": ["US", "UK", "AU"],
    "year": 2017
  },
  {
    "id": "payouts-on-demand",
    "name": "Payouts on Demand",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "managed-payments",
    "desc": "Instant payout option allowing sellers to transfer funds to bank accounts immediately for a fee.",
    "market": ["US", "UK"],
    "year": 2022
  },
  {
    "id": "express-payouts",
    "name": "Express Payouts",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "managed-payments",
    "desc": "Next-day payout option for sellers with established history.",
    "market": ["US", "UK", "DE"],
    "year": 2021
  },
  {
    "id": "form-1099-k",
    "name": "Form 1099-K",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "tax-compliance",
    "desc": "US tax reporting form for sellers meeting payment card and third-party network transaction thresholds.",
    "market": "US",
    "year": 2011
  },
  {
    "id": "ebay-valet",
    "name": "eBay Valet",
    "type": "category",
    "tier": "program",
    "status": "legacy",
    "parent": "seller-services",
    "desc": "Concierge selling service where eBay handled the entire selling process. Discontinued 2017.",
    "market": "US",
    "year": 2014
  },
  {
    "id": "ebay-authenticate",
    "name": "eBay Authenticate",
    "type": "trust",
    "tier": "program",
    "status": "renamed",
    "parent": "trust",
    "desc": "Original name for authentication service before rebranding to Authenticity Guarantee.",
    "market": "global",
    "year": 2017,
    "renamedTo": "Authenticity Guarantee"
  },
  {
    "id": "vehicle-purchase-protection",
    "name": "Vehicle Purchase Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "ebay-motors",
    "desc": "Purchase protection covering vehicle purchases up to $100,000, protecting against title issues and undisclosed damage.",
    "market": "US",
    "year": 2019
  },
  {
    "id": "business-equipment-purchase-protection",
    "name": "Business Equipment Purchase Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "ebay-business-supply",
    "desc": "Extended protection for commercial equipment and industrial machinery purchases.",
    "market": "US",
    "year": 2020
  },
  {
    "id": "purchase-protection",
    "name": "Purchase Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "buyer-protection",
    "desc": "Generic term for buyer coverage across various protection programs.",
    "market": "global",
    "year": 2009
  },
  {
    "id": "powerseller",
    "name": "PowerSeller",
    "type": "trust",
    "tier": "program",
    "status": "legacy",
    "parent": "seller-recognition",
    "desc": "Original seller status badge for high-volume merchants. Replaced by Top Rated Seller in 2008.",
    "market": "global",
    "year": 1998,
    "renamedTo": "Top Rated Seller"
  },
  {
    "id": "developer-loyalty-program",
    "name": "Developer Loyalty Program",
    "type": "developer",
    "tier": "program",
    "status": "current",
    "parent": "ebay-developers-program",
    "desc": "Rewards program offering API call credits and benefits based on developer contribution and usage.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "ebay-partner-network",
    "name": "eBay Partner Network",
    "type": "advertising",
    "tier": "program",
    "status": "current",
    "parent": "advertising",
    "desc": "Affiliate marketing program allowing publishers and content creators to earn commissions on referred traffic.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "third-party-providers",
    "name": "Third Party Providers",
    "type": "developer",
    "tier": "program",
    "status": "current",
    "parent": "ebay-developers-program",
    "desc": "Certified partner ecosystem offering complementary tools and services for eBay sellers.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "managed-display",
    "name": "Managed Display",
    "type": "advertising",
    "tier": "product",
    "status": "current",
    "parent": "ebay-advertising",
    "desc": "Display advertising solution for brands running campaigns on eBay and partner networks.",
    "market": "global",
    "year": 2023
  },
  {
    "id": "promoted-brand",
    "name": "Promoted Brand",
    "type": "advertising",
    "tier": "variant",
    "status": "current",
    "parent": "promoted-listings",
    "desc": "Brand-level advertising allowing manufacturers to promote entire product lines and storefronts.",
    "market": ["US", "UK", "DE"],
    "year": 2024
  },
  {
    "id": "brand-identity",
    "name": "Brand Identity",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "Customizable brand elements including logos, colors, and merchandising themes for eBay Stores.",
    "market": "global",
    "year": 2019
  },
  {
    "id": "brand-name",
    "name": "Brand Name",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "item-specifics",
    "desc": "Required item specific field for branded products to ensure catalog accuracy.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "find-it-on-ebay",
    "name": "Find It On eBay",
    "type": "category",
    "tier": "campaign",
    "status": "current",
    "parent": "marketing",
    "desc": "Global marketing campaign and positioning emphasizing eBay's vast product selection.",
    "market": "global",
    "year": 2019
  },
  {
    "id": "ebay-ambassador",
    "name": "eBay Ambassador",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "community",
    "desc": "Community leadership program recognizing top contributors who help other sellers and buyers.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "sales-events",
    "name": "Sales Events",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Time-bound promotional events with storewide or category-specific discounts.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "promotional-codes",
    "name": "Promotional Codes",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "marketing",
    "desc": "Generic term for coupon codes and discount mechanisms across seller and eBay promotions.",
    "market": "global",
    "year": 2010
  }
]
