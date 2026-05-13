// eBay Naming Graph - Wave 3 Batch R
// Generated: 2026-04-17
// Source: translations.ts (unenriched programs) + Research-Session-Complete-2026-04-17.md
// Programs: 50 NEW enriched programs not in enriched-consolidated-DEDUPLICATED.ts
// Export: ENRICHED_WAVE3_R

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

export const ENRICHED_WAVE3_R: GraphNode[] = [
  {
    id: "shipping-labels",
    name: "Shipping Labels",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Discounted shipping labels purchasable directly through eBay for USPS, UPS, FedEx and local carriers.",
    market: "global",
    year: 2013
  },
  {
    id: "international-standard-delivery",
    name: "International Standard Delivery",
    type: "category",
    tier: "program",
    status: "legacy",
    parent: "shipping",
    desc: "Former international shipping program replaced by eBay International Shipping in July 2023.",
    market: "US",
    year: 2018,
    renamedTo: "ebay-international-shipping"
  },
  {
    id: "managed-delivery",
    name: "Managed Delivery",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "Managed shipping service where eBay handles delivery logistics for sellers.",
    market: "US",
    year: 2022
  },
  {
    id: "local-pickup",
    name: "Local Pickup",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Buyer collects item directly from seller's location, avoiding shipping costs.",
    market: "global",
    year: 1995
  },
  {
    id: "collection-in-person",
    name: "Collection in Person",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "UK/AU term for local pickup where buyer collects item from seller.",
    market: ["UK", "AU"],
    year: 1999
  },
  {
    id: "saved-searches",
    name: "Saved Searches",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Allows buyers to save search criteria and receive email alerts when matching items are listed.",
    market: "global",
    year: 2002
  },
  {
    id: "recently-viewed",
    name: "Recently Viewed",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Displays items a buyer has recently viewed for easy re-discovery and comparison shopping.",
    market: "global",
    year: 2006
  },
  {
    id: "image-search",
    name: "Image Search",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discovery",
    desc: "Visual search allowing buyers to upload photos to find similar items on eBay.",
    market: ["US", "UK", "CA", "AU"],
    year: 2017
  },
  {
    id: "find-it-on-ebay",
    name: "Find It On eBay",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discovery",
    desc: "Mobile app feature using camera to find items on eBay by scanning products or images.",
    market: ["US", "UK", "CA", "AU"],
    year: 2019
  },
  {
    id: "shop-by-category",
    name: "Shop by Category",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discovery",
    desc: "Hierarchical category navigation structure organizing eBay's 20+ verticals.",
    market: "global",
    year: 1995
  },
  {
    id: "tcgplayer",
    name: "TCGplayer",
    type: "category",
    tier: "program",
    status: "current",
    parent: "collectibles",
    desc: "Third-party trading card marketplace integrated with eBay for price guides and authentication.",
    market: ["US", "UK", "CA"],
    year: 2020
  },
  {
    id: "goldin-auctions",
    name: "Goldin Auctions",
    type: "category",
    tier: "program",
    status: "current",
    parent: "collectibles",
    desc: "Premium sports card and memorabilia auction house operating on eBay platform.",
    market: "global",
    year: 2021
  },
  {
    id: "resolution-center",
    name: "Resolution Center",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "support",
    desc: "Dispute resolution hub where buyers and sellers manage returns, refunds, and transaction issues.",
    market: "global",
    year: 2009
  },
  {
    id: "issue-resolution-center",
    name: "Issue Resolution Center",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "support",
    desc: "Former name for Resolution Center before 2009 rebrand.",
    market: "US",
    year: 2005,
    renamedTo: "resolution-center"
  },
  {
    id: "promotional-codes",
    name: "Promotional Codes",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "promotions",
    desc: "Single-use or multi-use discount codes sellers can create for marketing campaigns.",
    market: "global",
    year: 2015
  },
  {
    id: "send-coupon",
    name: "Send Coupon",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "promotions",
    desc: "Seller tool to send targeted discount coupons directly to buyers or buyer segments.",
    market: "global",
    year: 2016
  },
  {
    id: "shipping-discounts",
    name: "Shipping Discounts",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Discounted shipping rates available to sellers through eBay partnerships with USPS, UPS, FedEx.",
    market: "global",
    year: 2008
  },
  {
    id: "store-email-campaigns",
    name: "Store Email Campaigns",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "ebay-stores",
    desc: "Email marketing tool for eBay Store subscribers to send newsletters to store followers.",
    market: "global",
    year: 2011
  },
  {
    id: "store-newsletters",
    name: "Store Newsletters",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "ebay-stores",
    desc: "Branded email newsletters sent to store subscribers with new listings and promotions.",
    market: "global",
    year: 2011
  },
  {
    id: "subtitle",
    name: "Subtitle",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "listing-upgrades",
    desc: "Paid listing upgrade adding 55-character subtitle below title in search results.",
    market: "global",
    year: 2001
  },
  {
    id: "gallery-plus",
    name: "Gallery Plus",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "listing-upgrades",
    desc: "Premium listing image upgrade showing larger photos in search results.",
    market: "global",
    year: 2008
  },
  {
    id: "volume-pricing",
    name: "Volume Pricing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "pricing",
    desc: "Quantity-based pricing allowing sellers to offer discounts when buyers purchase multiple units.",
    market: "global",
    year: 2014
  },
  {
    id: "order-discounts",
    name: "Order Discounts",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "promotions",
    desc: "Cart-level discounts applied when buyers meet thresholds like minimum purchase or item count.",
    market: "global",
    year: 2016
  },
  {
    id: "business-policies",
    name: "Business Policies",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-tools",
    desc: "Reusable templates for payment, returns, and shipping policies applied across multiple listings.",
    market: "global",
    year: 2012
  },
  {
    id: "out-of-stock-control",
    name: "Out of Stock Control",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "inventory",
    desc: "Inventory management allowing sellers to hide or show listings when stock depletes or replenishes.",
    market: "global",
    year: 2015
  },
  {
    id: "good-til-cancelled",
    name: "Good 'Til Cancelled",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Auto-renewing fixed-price listing format that continues until seller manually ends it.",
    market: "global",
    year: 2001
  },
  {
    id: "schedule-listing",
    name: "Schedule Listing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Paid feature allowing sellers to schedule listing start time up to 3 weeks in advance.",
    market: "global",
    year: 2005
  },
  {
    id: "automatic-relisting",
    name: "Automatic Relisting",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Auto-relist unsold auction items up to 8 times with configurable intervals.",
    market: "global",
    year: 2002
  },
  {
    id: "relist",
    name: "Relist",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Manual relist option for unsold items, prefilling listing form with previous data.",
    market: "global",
    year: 1997
  },
  {
    id: "sell-similar",
    name: "Sell Similar",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Creates new listing by copying data from existing listing for quick similar item creation.",
    market: "global",
    year: 2000
  },
  {
    id: "parts-compatibility",
    name: "Parts Compatibility",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-motors",
    desc: "Motors-specific feature showing which vehicles a part is compatible with via fitment data.",
    market: "global",
    year: 2010
  },
  {
    id: "shop-by-diagram",
    name: "Shop by Diagram",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-motors",
    desc: "Interactive vehicle diagrams allowing buyers to select parts visually by clicking diagram zones.",
    market: ["US", "UK", "DE", "AU"],
    year: 2018
  },
  {
    id: "item-specifics",
    name: "Item Specifics",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Structured product attributes like brand, size, color enabling filtering and search relevance.",
    market: "global",
    year: 2007
  },
  {
    id: "product-identifiers",
    name: "Product Identifiers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "UPC, EAN, ISBN codes required in many categories to match catalog products.",
    market: "global",
    year: 2011
  },
  {
    id: "private-listing",
    name: "Private Listing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Listing format hiding bidder usernames for sensitive items like adult products.",
    market: "global",
    year: 2000
  },
  {
    id: "reserve-price",
    name: "Reserve Price",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "auction",
    desc: "Hidden minimum price in auctions; item doesn't sell unless reserve is met.",
    market: "global",
    year: 1996
  },
  {
    id: "reserve-met",
    name: "Reserve Met",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "auction",
    desc: "Status indicator showing reserve price has been reached in auction listing.",
    market: "global",
    year: 1996
  },
  {
    id: "reserve-not-met",
    name: "Reserve Not Met",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "auction",
    desc: "Status indicator showing reserve price has not been reached in auction.",
    market: "global",
    year: 1996
  },
  {
    id: "bid-now",
    name: "Bid Now",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "auction",
    desc: "Primary call-to-action button for placing bids in auction-style listings.",
    market: "global",
    year: 1995
  },
  {
    id: "place-bid",
    name: "Place Bid",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "auction",
    desc: "Action allowing buyers to enter bid amount in auction format listings.",
    market: "global",
    year: 1995
  },
  {
    id: "maximum-bid",
    name: "Maximum Bid",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "auction",
    desc: "Proxy bidding system where buyer sets max bid and eBay auto-increments to maintain lead.",
    market: "global",
    year: 1995
  },
  {
    id: "number-of-bids",
    name: "Number of Bids",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "auction",
    desc: "Counter showing total bid count on auction listing, indicating interest level.",
    market: "global",
    year: 1995
  },
  {
    id: "no-bids",
    name: "No Bids",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "auction",
    desc: "Status indicator showing auction has received zero bids so far.",
    market: "global",
    year: 1995
  },
  {
    id: "winning-bid",
    name: "Winning Bid",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "auction",
    desc: "Final highest bid amount when auction ends successfully with sale.",
    market: "global",
    year: 1995
  },
  {
    id: "time-left",
    name: "Time Left",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "auction",
    desc: "Countdown timer showing remaining duration before auction or listing ends.",
    market: "global",
    year: 1995
  },
  {
    id: "ends-soon",
    name: "Ends Soon",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "auction",
    desc: "Label highlighting auctions ending within next few hours to drive urgency.",
    market: "global",
    year: 1999
  },
  {
    id: "guest-checkout",
    name: "Guest Checkout",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "checkout",
    desc: "Allows buyers to complete purchase without creating eBay account.",
    market: "global",
    year: 2016
  },
  {
    id: "immediate-payment-required",
    name: "Immediate Payment Required",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "checkout",
    desc: "Seller option requiring instant payment on Buy It Now items before purchase completes.",
    market: "global",
    year: 2008
  },
  {
    id: "message-center",
    name: "Message Center",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "communication",
    desc: "Centralized inbox for buyer-seller communication and eBay notifications.",
    market: "global",
    year: 2006
  },
  {
    id: "make-an-offer",
    name: "Make an Offer",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "pricing",
    desc: "Allows buyers to propose price on eligible Buy It Now listings; seller can accept, decline, or counter.",
    market: "global",
    year: 2014
  }
]
