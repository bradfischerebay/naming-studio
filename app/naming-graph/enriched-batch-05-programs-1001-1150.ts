// eBay Program Enrichment - Batch 05: Programs 1001-1150
// Marketing & Promotions Tools
// Generated: 2026-04-17
// Source: Research-Session-Complete-2026-04-17.md + Official eBay Sources

export interface GraphNode {
  id: string
  name: string
  type: "masterbrand" | "category" | "advertising" | "trust" | "impact" | "developer" | "regional"
  tier: "master" | "umbrella" | "t1" | "t2" | "t3" | "product" | "program" | "feature" | "legal" | "organization" | "publication" | "event" | "campaign" | "vertical" | "platform" | "variant"
  status: "current" | "legacy" | "renamed"
  parent?: string
  desc: string
  market?: "US" | "UK" | "DE" | "FR" | "IT" | "AU" | "CA" | "global" | "US" | "UK" | "DE" | "FR" | "IT" | "AU" | "CA"[]
  renamedFrom?: string
  renamedTo?: string
  year?: number
}

export const ENRICHED_BATCH_05: GraphNode[] = [
  {
    id: "promotions-manager",
    name: "Promotions Manager",
    type: "category",
    tier: "product",
    status: "current",
    parent: "sellertools",
    desc: "Unified promotion management tool within Seller Hub for creating and managing sales events, discounts, and promotional campaigns. Replaced standalone Markdown Manager in 2024.",
    market: "global",
    year: 2022
  },
  {
    id: "shipping-discounts",
    name: "Shipping Discounts",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "promotions",
    desc: "Seller-created promotional shipping offers including free shipping, flat-rate shipping, and calculated shipping discounts to incentivize purchases and increase conversion rates.",
    market: "global",
    year: 2010
  },
  {
    id: "coded-coupons",
    name: "Coded Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "promotions",
    desc: "Alphanumeric promotional codes that sellers create to offer discounts at checkout. Buyers enter codes during purchase to receive specified discounts or benefits.",
    market: "global",
    year: 2015
  },
  {
    id: "markdown-manager",
    name: "Markdown Manager",
    type: "category",
    tier: "product",
    status: "legacy",
    parent: "sellertools",
    desc: "Standalone tool for creating scheduled price reductions and sales events. Merged into Promotions Manager in 2024 for unified promotion management.",
    market: ["US", "UK", "CA", "AU"],
    year: 2019,
    renamedTo: "Promotions Manager"
  },
  {
    id: "seller-initiated-offers",
    name: "Seller Initiated Offers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "promotions",
    desc: "Tool allowing sellers to send personalized discount offers directly to buyers who have watched or favorited their items. Known as 'Offers to Buyers' in UK, DE, FR, IT, CA, and AU markets.",
    market: "global",
    year: 2014
  },
  {
    id: "send-coupon",
    name: "Send Coupon",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "promotions",
    desc: "Feature enabling sellers to distribute promotional coupon codes to targeted buyer segments via email or eBay messaging to drive repeat purchases and engagement.",
    market: "global",
    year: 2016
  },
  {
    id: "print-coupons",
    name: "Print Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "promotions",
    desc: "Tool for generating printable coupon codes for offline distribution at events, in packaging, or through physical marketing materials.",
    market: "global",
    year: 2016
  },
  {
    id: "boost-buyer-engagement",
    name: "Boost Buyer Engagement",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "promotions",
    desc: "Marketing automation feature helping sellers increase customer retention through automated follow-ups, targeted offers, and personalized communication campaigns.",
    market: ["US", "UK", "CA", "AU"],
    year: 2021
  },
  {
    id: "buyer-groups",
    name: "Buyer Groups",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "promotions",
    desc: "Seller segmentation tool for organizing customers into targeted groups based on purchase history, preferences, or behavior to enable personalized marketing and offers.",
    market: "global",
    year: 2020
  },
  {
    id: "store-newsletters",
    name: "Store Newsletters",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "stores",
    desc: "Email marketing tool allowing eBay Store subscribers to send branded newsletters to their subscriber base showcasing new items, promotions, and store updates.",
    market: "global",
    year: 2005
  },
  {
    id: "store-email-campaigns",
    name: "Store Email Campaigns",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "stores",
    desc: "Advanced email marketing platform for eBay Store subscribers enabling sophisticated campaign creation, A/B testing, and analytics. Branded as 'Email Marketing for Sellers' in US, CA, and AU.",
    market: "global",
    year: 2018
  },
  {
    id: "ebay-deals",
    name: "eBay Deals",
    type: "category",
    tier: "campaign",
    status: "current",
    parent: "marketing",
    desc: "Curated deals destination featuring time-limited offers, discounts, and special pricing across all categories. Primary deals brand for US, UK, CA, and AU markets.",
    market: "global",
    year: 2008
  },
  {
    id: "daily-deals",
    name: "Daily Deals",
    type: "category",
    tier: "campaign",
    status: "current",
    parent: "marketing",
    desc: "24-hour rotating deals program showcasing limited-time offers that refresh daily. Global program name consistent across all markets.",
    market: "global",
    year: 2010
  },
  {
    id: "featured-deals",
    name: "Featured Deals",
    type: "category",
    tier: "campaign",
    status: "current",
    parent: "marketing",
    desc: "Premium placement deals program highlighting high-value or strategic offers with enhanced visibility on the eBay Deals hub and homepage.",
    market: ["US", "UK", "CA", "AU"],
    year: 2015
  },
  {
    id: "weekly-deals",
    name: "Weekly Deals",
    type: "category",
    tier: "campaign",
    status: "current",
    parent: "marketing",
    desc: "Seven-day promotional program featuring curated deals that run for full weeks, offering sellers longer promotion windows and buyers more time to purchase.",
    market: ["US", "UK", "CA", "AU"],
    year: 2012
  }
];
