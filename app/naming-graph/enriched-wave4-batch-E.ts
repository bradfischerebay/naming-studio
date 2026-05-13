// eBay Naming Graph - Wave 4 Batch E
// Focus: Store features (logo, banner, custom categories), branding tools, seller identity
// Generated: 2026-04-17
// Programs: 50 NEW

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

export const ENRICHED_WAVE4_E: GraphNode[] = [
  {
    "id": "store-tier-starter",
    "name": "Store Tier - Starter",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "Entry-level eBay Store subscription tier offering basic storefront features, custom pages, and reduced insertion fees for sellers beginning to build their branded presence.",
    "market": ["US", "AU"],
    "year": 2019
  },
  {
    "id": "store-tier-basic",
    "name": "Store Tier - Basic",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "Standard eBay Store subscription providing branded storefront, custom categories, promotional tools, and insertion fee discounts for growing sellers.",
    "market": "global",
    "year": 2001
  },
  {
    "id": "store-tier-premium",
    "name": "Store Tier - Premium",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "Mid-tier eBay Store subscription with enhanced listing allowances, advanced marketing tools, and deeper fee discounts for established sellers.",
    "market": ["US", "DE", "FR", "IT", "CA"],
    "year": 2001
  },
  {
    "id": "store-tier-featured",
    "name": "Store Tier - Featured",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "High-tier eBay Store subscription offering premium branding, priority support, and maximum listing volume allowances for power sellers.",
    "market": ["UK", "DE", "FR", "AU"],
    "year": 2001
  },
  {
    "id": "store-tier-anchor",
    "name": "Store Tier - Anchor",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "Top-tier eBay Store subscription for high-volume professional sellers with dedicated account management, maximum fee discounts, and unlimited listing features.",
    "market": ["US", "UK", "CA", "AU"],
    "year": 2004
  },
  {
    "id": "store-tier-enterprise",
    "name": "Store Tier - Enterprise",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "Premium enterprise-level eBay Store subscription for large-scale merchants with custom solutions, dedicated support, and maximum platform privileges.",
    "market": "US",
    "year": 2018
  },
  {
    "id": "store-tier-platin",
    "name": "Store Tier - Platin",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "German-market platinum tier eBay Store subscription offering highest level of storefront features, marketing tools, and fee structure benefits.",
    "market": "DE",
    "year": 2005
  },
  {
    "id": "store-tier-premium-plus",
    "name": "Store Tier - Premium Plus",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "Italian-market enhanced premium tier providing additional listing volume and promotional capabilities beyond standard Premium subscription.",
    "market": "IT",
    "year": 2015
  },
  {
    "id": "store-newsletters",
    "name": "Store Newsletters",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "Email marketing tool allowing Store subscribers to send branded newsletters to opted-in customers, announcing new inventory, sales, and promotions.",
    "market": "global",
    "year": 2003
  },
  {
    "id": "promoted-stores",
    "name": "Promoted Stores",
    "type": "advertising",
    "tier": "program",
    "status": "current",
    "parent": "ebay-advertising",
    "desc": "Advertising product promoting entire eBay Store brand in search results and browse pages, driving traffic to seller's custom storefront rather than individual listings.",
    "market": "global",
    "year": 2020
  },
  {
    "id": "ai-banner",
    "name": "AI Banner",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "AI-powered tool generating custom store banners automatically from product imagery and brand guidelines, requiring no design expertise.",
    "market": "US",
    "year": 2024
  },
  {
    "id": "store-email-campaigns",
    "name": "Store Email Campaigns",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "Email marketing platform for Store subscribers enabling segmented campaigns, automated follow-ups, and performance tracking to engaged buyer audiences.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "discounts-manager",
    "name": "Discounts Manager",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Centralized promotional tool allowing sellers to create order discounts, volume pricing, and shipping promotions across their inventory from single interface.",
    "market": "global",
    "year": 2017
  },
  {
    "id": "order-discounts",
    "name": "Order Discounts",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Promotion type offering buyers percentage or fixed-amount discounts when order total meets minimum threshold, encouraging larger cart values.",
    "market": "global",
    "year": 2017
  },
  {
    "id": "sale-events",
    "name": "Sale Events",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Time-bound promotional campaigns where sellers discount selected inventory for specific duration, creating urgency and driving traffic.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "coupons",
    "name": "Coupons",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Coded discount vouchers sellers create and distribute to targeted buyer segments, trackable by redemption code for campaign measurement.",
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
    "desc": "Tiered discount structure offering reduced per-unit pricing when buyers purchase multiple quantities, common for wholesale and bulk sellers.",
    "market": "global",
    "year": 2009
  },
  {
    "id": "offers-to-buyers",
    "name": "Offers to Buyers",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Seller-initiated private discount offers sent to watchers or past customers, creating personalized deal opportunities to convert interest into sales.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "promotions-manager",
    "name": "Promotions Manager",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Marketing toolkit consolidating all seller promotional capabilities including sales events, coupons, and volume pricing in unified dashboard.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "shipping-discounts",
    "name": "Shipping Discounts",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Shipping cost promotions including free shipping thresholds, flat-rate shipping, or combined shipping for multiple items from same seller.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "coded-coupons",
    "name": "Coded Coupons",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Alpha-numeric promotional codes buyers enter at checkout to receive seller-defined discounts, enabling off-platform marketing tracking.",
    "market": "global",
    "year": 2018
  },
  {
    "id": "markdown-manager",
    "name": "Markdown Manager",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Bulk pricing tool allowing sellers to reduce prices across inventory segments by percentage or amount, clearing aging stock or testing price points.",
    "market": ["US", "UK", "CA", "AU"],
    "year": 2019
  },
  {
    "id": "seller-initiated-offers",
    "name": "Seller Initiated Offers",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Proactive discount offers sent by sellers to item watchers or cart abandoners, converting browsing interest into completed purchases.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "send-coupon",
    "name": "Send Coupon",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "coupons",
    "desc": "Distribution mechanism delivering coded coupons to targeted buyer lists via eBay messaging or email, trackable by unique redemption codes.",
    "market": "global",
    "year": 2018
  },
  {
    "id": "print-coupons",
    "name": "Print Coupons",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "coupons",
    "desc": "Physical coupon generation for in-person events or packaging inserts, bridging online and offline marketing channels with scannable codes.",
    "market": "global",
    "year": 2019
  },
  {
    "id": "buyer-groups",
    "name": "Buyer Groups",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Customer segmentation tool allowing sellers to organize buyers into lists based on purchase history, enabling targeted promotions and communications.",
    "market": "global",
    "year": 2020
  },
  {
    "id": "ebay-deals",
    "name": "eBay Deals",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "marketing",
    "desc": "Curated promotional hub showcasing time-limited offers across categories, driving high-intent buyer traffic to participating sellers' discounted inventory.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "daily-deals",
    "name": "Daily Deals",
    "type": "category",
    "tier": "campaign",
    "status": "current",
    "parent": "ebay-deals",
    "desc": "24-hour flash sale featuring one heavily discounted product per day, driving urgency and homepage visibility for selected sellers.",
    "market": "global",
    "year": 2011
  },
  {
    "id": "brand-outlet",
    "name": "Brand Outlet",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "stores",
    "desc": "Curated storefront destination for authorized brand sellers offering authentic products at discounted prices, similar to factory outlet experience.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "seller-hub-reports",
    "name": "Seller Hub Reports",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Analytics dashboard providing sales metrics, traffic data, performance indicators, and downloadable reports for business intelligence.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "sales-reports-plus",
    "name": "Sales Reports Plus",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Enhanced reporting subscription offering extended historical data, custom report builders, and advanced analytics beyond standard Seller Hub reports.",
    "market": ["US", "UK", "CA"],
    "year": 2010
  },
  {
    "id": "above-standard",
    "name": "Above Standard",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "seller-performance-standards",
    "desc": "Mid-tier seller performance level in 3-tier evaluation system (Below/Above/Top Rated), meeting quality thresholds without Top Rated benefits.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "below-standard",
    "name": "Below Standard",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "seller-performance-standards",
    "desc": "Underperforming seller status indicating defect rates or policy violations exceed acceptable thresholds, triggering search suppression and account restrictions.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "top-rated-plus",
    "name": "Top Rated Plus",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "top-rated-seller",
    "desc": "Enhanced trust badge combining Top Rated Seller status with fast/free shipping and returns, earning search boost and premium service designation.",
    "market": ["US", "CA"],
    "year": 2011
  },
  {
    "id": "ebay-premium-service",
    "name": "eBay Premium Service",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "top-rated-seller",
    "desc": "UK equivalent of Top Rated Plus, requiring fast dispatch, free returns, and excellent service metrics for premium search placement and buyer confidence.",
    "market": "UK",
    "year": 2013
  },
  {
    "id": "ebay-top-service",
    "name": "eBay Top-Service",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "top-rated-seller",
    "desc": "German-market premium service badge for sellers meeting strict delivery, returns, and performance standards, comparable to UK Premium Service.",
    "market": "DE",
    "year": 2013
  },
  {
    "id": "free-2-day-shipping",
    "name": "Free 2-day Shipping",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Seller service commitment offering complimentary 2-business-day delivery, earning search badge and competing with Amazon Prime expectations.",
    "market": "US",
    "year": 2017
  },
  {
    "id": "free-3-day-shipping",
    "name": "Free 3-day Shipping",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Seller service offering free 3-day delivery, balancing speed and cost while still earning fast shipping badge in search results.",
    "market": ["US", "UK", "DE"],
    "year": 2015
  },
  {
    "id": "free-4-day-shipping",
    "name": "Free 4-day Shipping",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Economy fast shipping option providing free 4-day delivery, suitable for larger/heavier items where 2-3 day shipping costs prohibitive.",
    "market": "US",
    "year": 2016
  },
  {
    "id": "seller-refurbished",
    "name": "Seller Refurbished",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "refurbished",
    "desc": "Item condition indicating seller-refurbished products without manufacturer certification, less trusted than eBay Refurbished but acceptable when seller reputation strong.",
    "market": "global",
    "year": 2007
  },
  {
    "id": "ebay-speedpak",
    "name": "eBay SpeedPAK",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "international-shipping",
    "desc": "International shipping solution consolidating packages at regional hubs for customs processing and local delivery, reducing cross-border complexity and cost.",
    "market": ["UK", "DE", "FR", "IT", "CA", "AU"],
    "year": 2016
  },
  {
    "id": "managed-payments",
    "name": "Managed Payments",
    "type": "category",
    "tier": "platform",
    "status": "current",
    "parent": "payments",
    "desc": "eBay-operated payment processing replacing PayPal, handling all transaction funds, enabling multi-payment methods, and simplifying payout cycles.",
    "market": "global",
    "year": 2018
  },
  {
    "id": "ebay-balance",
    "name": "eBay Balance",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "managed-payments",
    "desc": "Seller funds held in eBay account available for purchasing shipping labels, paying seller fees, or withdrawing to bank, replacing PayPal balance.",
    "market": ["US", "UK"],
    "year": 2019
  },
  {
    "id": "ebay-mastercard",
    "name": "eBay Mastercard",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "payments",
    "desc": "Co-branded credit card offering cashback rewards on eBay purchases and general spending, strengthening buyer loyalty and repeat purchase behavior.",
    "market": "US",
    "year": 2018
  },
  {
    "id": "guest-checkout",
    "name": "Guest Checkout",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "checkout",
    "desc": "Checkout option allowing buyers to complete purchase without creating eBay account, reducing friction for first-time or infrequent shoppers.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "ebay-gift-cards",
    "name": "eBay Gift Cards",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "payments",
    "desc": "Prepaid cards purchasable online or retail, redeemable for eBay purchases, serving gifting occasions and encouraging platform spending.",
    "market": "global",
    "year": 2004
  },
  {
    "id": "circular-fashion-fund",
    "name": "Circular Fashion Fund",
    "type": "impact",
    "tier": "program",
    "status": "current",
    "parent": "sustainability",
    "desc": "Impact investment initiative supporting circular fashion startups and resale programs, advancing sustainable fashion economy and eBay's pre-loved category growth.",
    "market": "global",
    "year": 2021
  },
  {
    "id": "ebay-business-supply",
    "name": "eBay Business Supply",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "b2b",
    "desc": "B2B marketplace segment offering bulk pricing, business accounts, and procurement tools for office supplies, industrial equipment, and commercial products.",
    "market": "global",
    "year": 2017
  },
  {
    "id": "certified-by-brand",
    "name": "Certified by Brand",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "authenticity",
    "desc": "Trust badge for items authenticated or refurbished directly by original manufacturer, providing highest confidence level for brand-certified products.",
    "market": "US",
    "year": 2022
  }
]
