// eBay Naming Graph - Wave 4 Batch A Enrichment
// Generated: 2026-04-17
// Programs Enriched: 50
// Focus: Shipping carriers, mobile features, analytics, store tiers, listing formats, marketing tools

import { GraphNode } from './enriched-consolidated-DEDUPLICATED'

export const ENRICHED_WAVE4_A: GraphNode[] = [
  // SHIPPING CARRIERS (4 programs)
  {
    id: "usps",
    name: "USPS",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "United States Postal Service integration for label printing and package tracking with discounted shipping rates.",
    market: "global",
    year: 2006
  },
  {
    id: "fedex",
    name: "FedEx",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "FedEx carrier integration providing express shipping, label generation, and tracking with negotiated eBay rates.",
    market: "global",
    year: 2006
  },
  {
    id: "ups",
    name: "UPS",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "UPS carrier integration enabling ground and express shipping with discounted rates and automated label printing.",
    market: "global",
    year: 2006
  },
  {
    id: "dhl",
    name: "DHL",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "DHL carrier integration for international express shipping with tracking and commercial invoice support.",
    market: "global",
    year: 2008
  },

  // STORE TIERS (8 programs)
  {
    id: "store-tier-starter",
    name: "Store Tier - Starter",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores",
    desc: "Entry-level store subscription offering basic customization and reduced insertion fees for new sellers.",
    market: ["US", "AU"],
    year: 2019
  },
  {
    id: "store-tier-basic",
    name: "Store Tier - Basic",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores",
    desc: "Foundational store tier with free listings allocations and basic branding tools for growing sellers.",
    market: "global",
    year: 2001
  },
  {
    id: "store-tier-premium",
    name: "Store Tier - Premium",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores",
    desc: "Mid-tier store subscription with increased free listings, marketing tools, and enhanced reporting.",
    market: ["US", "DE", "FR", "IT", "CA"],
    year: 2005
  },
  {
    id: "store-tier-featured",
    name: "Store Tier - Featured",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores",
    desc: "High-volume store tier providing priority placement, advanced automation, and dedicated support.",
    market: ["UK", "DE", "FR", "AU"],
    year: 2008
  },
  {
    id: "store-tier-anchor",
    name: "Store Tier - Anchor",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores",
    desc: "Top-tier store subscription with maximum free listings, lowest fees, and premium seller tools.",
    market: ["US", "UK", "CA", "AU"],
    year: 2011
  },
  {
    id: "store-tier-enterprise",
    name: "Store Tier - Enterprise",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores",
    desc: "Enterprise-level store subscription with custom pricing, API access, and dedicated account management.",
    market: "US",
    year: 2018
  },
  {
    id: "store-tier-platin",
    name: "Store Tier - Platin",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores",
    desc: "German premium store tier (Platin-Shop) offering maximum benefits and priority seller support.",
    market: "DE",
    year: 2012
  },
  {
    id: "store-tier-premium-plus",
    name: "Store Tier - Premium Plus",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores",
    desc: "Italy-specific premium store tier (Negozio Premium Plus) with enhanced marketing and branding tools.",
    market: "IT",
    year: 2015
  },

  // ANALYTICS & REPORTS (6 programs)
  {
    id: "listing-analytics",
    name: "Listing Analytics",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Real-time performance metrics showing listing views, watchers, and conversion rates to optimize pricing and titles.",
    market: "global",
    year: 2016
  },
  {
    id: "sales-report",
    name: "Sales Report",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "reports",
    desc: "Comprehensive sales report showing revenue, fees, and profit margins across all transactions for financial tracking.",
    market: "global",
    year: 2004
  },
  {
    id: "transaction-report",
    name: "Transaction Report",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "reports",
    desc: "Detailed transaction history report with buyer information, payment status, and fulfillment tracking for record-keeping.",
    market: "global",
    year: 2006
  },
  {
    id: "order-report",
    name: "Order Report",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "reports",
    desc: "Order-level reporting showing fulfillment status, shipping details, and customer communication history.",
    market: "global",
    year: 2010
  },
  {
    id: "performance-dashboard",
    name: "Performance Dashboard",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Centralized dashboard displaying seller metrics, defect rates, shipping performance, and customer service scores.",
    market: "global",
    year: 2016
  },
  {
    id: "analytics-api",
    name: "Analytics API",
    type: "developer",
    tier: "feature",
    status: "current",
    parent: "ebay-developers-program",
    desc: "Developer API providing programmatic access to traffic, conversion, and performance analytics data.",
    market: "global",
    year: 2014
  },

  // MOBILE FEATURES (3 programs)
  {
    id: "image-search",
    name: "Image Search",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Mobile visual search allowing buyers to upload photos and find similar items using computer vision technology.",
    market: ["US", "UK", "DE", "FR", "IT", "CA", "AU"],
    year: 2017
  },
  {
    id: "barcode-scanner",
    name: "Barcode Scanner",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "mobile-app",
    desc: "Mobile app camera feature scanning product barcodes to instantly search listings or create new listings with pre-filled details.",
    market: "global",
    year: 2013
  },
  {
    id: "mobile-notifications",
    name: "Mobile Notifications",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "mobile-app",
    desc: "Push notification system alerting buyers and sellers to bids, offers, purchases, and shipping updates in real-time.",
    market: "global",
    year: 2012
  },

  // LISTING FORMATS & FEATURES (9 programs)
  {
    id: "buy-it-now",
    name: "Buy It Now",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-formats",
    desc: "Fixed-price purchase option allowing buyers to complete transactions instantly without bidding.",
    market: "global",
    year: 1999
  },
  {
    id: "auction-style-listings",
    name: "Auction-Style Listings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-formats",
    desc: "Time-based competitive bidding format where highest bidder wins at auction close.",
    market: "global",
    year: 1995
  },
  {
    id: "fixed-price-format",
    name: "Fixed Price Format",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-formats",
    desc: "Standard e-commerce listing format with set price, quantity, and immediate purchase capability.",
    market: "global",
    year: 2000
  },
  {
    id: "reserve-price",
    name: "Reserve Price",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "auction-features",
    desc: "Hidden minimum price in auctions ensuring item only sells if bidding reaches seller's threshold.",
    market: "global",
    year: 1997
  },
  {
    id: "private-listing",
    name: "Private Listing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-features",
    desc: "Listing format hiding buyer identities from public view for privacy-sensitive transactions.",
    market: "global",
    year: 2000
  },
  {
    id: "schedule-listing",
    name: "Schedule Listing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Scheduling tool allowing sellers to set future start times for listings to maximize visibility during peak traffic.",
    market: "global",
    year: 2005
  },
  {
    id: "item-specifics",
    name: "Item Specifics",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-features",
    desc: "Structured product attributes (brand, size, color, condition) enabling faceted search and buyer filtering.",
    market: "global",
    year: 2008
  },
  {
    id: "gallery-plus",
    name: "Gallery Plus",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-upgrades",
    desc: "Paid listing enhancement enlarging thumbnail images in search results for increased visibility.",
    market: "global",
    year: 2002
  },
  {
    id: "subtitle",
    name: "Subtitle",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-upgrades",
    desc: "Optional second title line providing additional searchable keywords and product details for premium listings.",
    market: "global",
    year: 2003
  },

  // MARKETING & DISCOUNTS (8 programs)
  {
    id: "discounts-manager",
    name: "Discounts Manager",
    type: "category",
    tier: "product",
    status: "current",
    parent: "marketing-tools",
    desc: "Unified promotional platform managing order discounts, sale events, coupons, and volume pricing in one interface.",
    market: "global",
    year: 2018
  },
  {
    id: "order-discounts",
    name: "Order Discounts",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Bulk purchase incentives offering percentage or dollar-off discounts when buyers meet order minimums.",
    market: "global",
    year: 2018
  },
  {
    id: "sale-events",
    name: "Sale Events",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Time-limited promotional campaigns applying automatic discounts to selected inventory during defined periods.",
    market: "global",
    year: 2018
  },
  {
    id: "coupons",
    name: "Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Shareable discount codes distributed to buyers via email, social media, or direct messaging for targeted promotions.",
    market: "global",
    year: 2019
  },
  {
    id: "volume-pricing",
    name: "Volume Pricing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Tiered pricing structure offering lower per-unit costs when buyers purchase multiple quantities of same item.",
    market: "global",
    year: 2015
  },
  {
    id: "offers-to-buyers",
    name: "Offers to Buyers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing-tools",
    desc: "Proactive seller tool sending private discount offers to interested buyers who watched or viewed listings.",
    market: "global",
    year: 2016
  },
  {
    id: "promotions-manager",
    name: "Promotions Manager",
    type: "category",
    tier: "product",
    status: "current",
    parent: "marketing-tools",
    desc: "Marketing campaign manager creating cross-listing promotions, markdown sales, and seasonal events.",
    market: "global",
    year: 2017
  },
  {
    id: "shipping-discounts",
    name: "Shipping Discounts",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Promotional shipping incentives offering free or reduced shipping costs to increase conversion rates.",
    market: "global",
    year: 2014
  },

  // LISTING TOOLS (4 programs)
  {
    id: "quick-listing-tool",
    name: "Quick Listing Tool",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Streamlined listing creation interface for fast single-item listings with minimal required fields.",
    market: "global",
    year: 2012
  },
  {
    id: "advanced-listing-tool",
    name: "Advanced Listing Tool",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Full-featured listing editor providing complete control over pricing, shipping, returns, and item specifics.",
    market: "global",
    year: 2006
  },
  {
    id: "relist",
    name: "Relist",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "One-click tool republishing unsold listings with original details, pricing, and photos intact.",
    market: "global",
    year: 2003
  },
  {
    id: "sell-similar",
    name: "Sell Similar",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Listing duplication tool copying existing listings as templates for similar products with modifications.",
    market: "global",
    year: 2005
  },

  // ADDITIONAL PROGRAMS (8 programs)
  {
    id: "guest-checkout",
    name: "Guest Checkout",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "checkout",
    desc: "Streamlined checkout allowing buyers to complete purchases without creating eBay accounts, reducing friction.",
    market: "global",
    year: 2014
  },
  {
    id: "ebay-gift-cards",
    name: "eBay Gift Cards",
    type: "category",
    tier: "program",
    status: "current",
    parent: "payment",
    desc: "Prepaid digital and physical gift cards redeemable for eBay purchases, sold at retail and online.",
    market: "global",
    year: 2008
  },
  {
    id: "circular-fashion-fund",
    name: "Circular Fashion Fund",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "sustainability",
    desc: "Sustainability initiative supporting fashion resellers through grants and resources promoting circular economy practices.",
    market: "global",
    year: 2021
  },
  {
    id: "ebay-business-supply",
    name: "eBay Business Supply",
    type: "category",
    tier: "vertical",
    status: "current",
    parent: "verticals",
    desc: "B2B marketplace vertical offering bulk office supplies, equipment, and services to business buyers.",
    market: "global",
    year: 2017
  },
  {
    id: "certified-by-brand",
    name: "Certified by Brand",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "authentication",
    desc: "Brand-verified authenticity program where manufacturers certify pre-owned items sold on eBay as genuine.",
    market: "US",
    year: 2023
  },
  {
    id: "store-newsletters",
    name: "Store Newsletters",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-stores",
    desc: "Email marketing tool allowing store owners to send promotional newsletters to subscriber lists.",
    market: "global",
    year: 2007
  },
  {
    id: "ai-banner",
    name: "AI Banner",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-stores",
    desc: "AI-powered store banner generator creating custom branded headers using machine learning design tools.",
    market: "US",
    year: 2024
  },
  {
    id: "starting-bid",
    name: "Starting Bid",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "auction-features",
    desc: "Opening price set by sellers in auction-style listings where bidding competition begins.",
    market: "global",
    year: 1995
  }
]
