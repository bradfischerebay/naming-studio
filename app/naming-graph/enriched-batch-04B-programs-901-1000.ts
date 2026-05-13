// Enriched GraphNode data for programs batch 04B (lines 901-1000)
// Store features and marketing tools
// Generated: 2026-04-17

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

export const ENRICHED_BATCH_04B: GraphNode[] = [
  {
    id: "store-newsletters",
    name: "Store Newsletters",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-stores",
    desc: "Email newsletter feature allowing eBay Store subscribers to send promotional emails to their store followers and past customers",
    market: "global",
    year: 2008
  },
  {
    id: "promoted-stores",
    name: "Promoted Stores",
    type: "advertising",
    tier: "product",
    status: "current",
    parent: "advertising",
    desc: "Advertising program promoting entire eBay Stores in search results and category pages to increase store traffic",
    market: "global",
    year: 2019
  },
  {
    id: "ai-banner",
    name: "AI Banner",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-stores",
    desc: "AI-powered tool for automatically generating custom store banners and promotional graphics for eBay Stores",
    market: ["US"],
    year: 2025
  },
  {
    id: "discounts-manager",
    name: "Discounts Manager",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "sellertools",
    desc: "Centralized seller tool for creating and managing all types of promotional offers including sale events, coupons, and volume pricing",
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
    desc: "Promotional tool allowing sellers to offer discounts based on total order value thresholds to encourage larger purchases",
    market: "global",
    year: 2019
  },
  {
    id: "sale-events",
    name: "Sale Events",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Time-limited promotional campaigns where sellers can discount multiple listings simultaneously for special events or seasonal sales",
    market: "global",
    year: 2016
  },
  {
    id: "coupons",
    name: "Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Coded discount system allowing sellers to distribute promotional codes that buyers enter at checkout for discounts",
    market: "global",
    year: 2017
  },
  {
    id: "volume-pricing",
    name: "Volume Pricing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Multi-buy discount tool offering automatic price reductions when buyers purchase multiple quantities of the same item",
    market: "global",
    year: 2015
  },
  {
    id: "offers-to-buyers",
    name: "Offers to Buyers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Seller-initiated tool for sending personalized discount offers directly to specific buyers who have shown interest in items",
    market: "global",
    year: 2014
  },
  {
    id: "best-offer",
    name: "Best Offer",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "pricing",
    desc: "Buyer-initiated negotiation feature allowing shoppers to submit price offers on eligible listings for seller consideration",
    market: "global",
    year: 2005
  },
  {
    id: "promotions-manager",
    name: "Promotions Manager",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "sellertools",
    desc: "Enhanced promotional tool suite within Seller Hub Pro for creating, scheduling, and analyzing marketing campaigns across multiple channels",
    market: "global",
    year: 2020
  },
  {
    id: "shipping-discounts",
    name: "Shipping Discounts",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Promotional tool offering reduced or free shipping costs on eligible items to incentivize purchases and improve conversion",
    market: "global",
    year: 2016
  },
  {
    id: "coded-coupons",
    name: "Coded Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Alphanumeric promotional codes that sellers create and distribute for buyers to redeem at checkout for specific discounts",
    market: "global",
    year: 2017
  },
  {
    id: "markdown-manager",
    name: "Markdown Manager",
    type: "category",
    tier: "platform",
    status: "legacy",
    parent: "sellertools",
    desc: "Standalone promotional scheduling tool for managing price reductions and sales, merged into Promotions Manager in 2024",
    market: ["US", "UK", "CA", "AU"],
    year: 2016,
    renamedTo: "Promotions Manager"
  },
  {
    id: "seller-initiated-offers",
    name: "Seller Initiated Offers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Tool enabling sellers to proactively send targeted discount offers to watchers, cart abandoners, and previous buyers",
    market: "global",
    year: 2014
  },
  {
    id: "send-coupon",
    name: "Send Coupon",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Distribution feature allowing sellers to electronically send coupon codes to targeted buyer segments via eBay messaging",
    market: "global",
    year: 2018
  },
  {
    id: "print-coupons",
    name: "Print Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Legacy tool for generating printable coupon codes for physical distribution at events or in packaging",
    market: "global",
    year: 2017
  },
  {
    id: "boost-buyer-engagement",
    name: "Boost Buyer Engagement",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Automated recommendation engine suggesting optimal discount strategies to re-engage inactive buyers and increase repeat purchases",
    market: ["US", "UK", "CA", "AU"],
    year: 2023
  },
  {
    id: "buyer-groups",
    name: "Buyer Groups",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Segmentation tool allowing sellers to create custom buyer audiences based on purchase history for targeted promotions",
    market: "global",
    year: 2019
  },
  {
    id: "store-email-campaigns",
    name: "Store Email Campaigns",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-stores",
    desc: "Email marketing platform for eBay Store subscribers to create and send promotional campaigns to their customer base",
    market: "global",
    year: 2009
  }
];
