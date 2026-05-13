// Enriched GraphNode Data - Batch 08 (Final Additional Programs)
// Programs 1495+ (Generic Features & Interface Elements)
// Created: 2026-04-17
// Source: translations.ts + Research-Session-Complete-2026-04-17.md

export interface GraphNode {
  id: string
  name: string
  type: "masterbrand" | "category" | "advertising" | "trust" | "impact" | "developer" | "regional"
  tier: "master" | "umbrella" | "t1" | "t2" | "t3" | "product" | "program" | "feature" | "legal" | "organization" | "publication" | "event" | "campaign" | "vertical" | "platform" | "variant"
  status: "current" | "legacy" | "renamed"
  parent?: string
  desc: string
  market?: "US" | "UK" | "DE" | "FR" | "IT" | "AU" | "CA" | "global"
  renamedFrom?: string
  renamedTo?: string
  year?: number
}

export const ENRICHED_BATCH_08: GraphNode[] = [
  // ===== PRODUCT REVIEWS & RATINGS =====
  {
    id: "product-reviews",
    name: "Product Reviews",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Customer review system allowing buyers to rate and review products they've purchased, helping other buyers make informed decisions.",
    market: "global",
    year: 2013 // Source: eBay introduced product reviews alongside catalog integration
  },
  {
    id: "item-reviews",
    name: "Item Reviews",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Buyer feedback system for specific listings, distinct from seller feedback, focusing on item quality and description accuracy.",
    market: "global",
    year: 2013
  },
  {
    id: "buyer-review",
    name: "Buyer Review",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Individual review submission by a buyer for a purchased item, including star rating and written feedback.",
    market: "global",
    year: 2013
  },
  {
    id: "seller-response",
    name: "Seller Response",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Seller capability to publicly respond to buyer reviews and feedback, providing context or resolution information.",
    market: "global",
    year: 2014 // Source: Added after initial review system to give sellers voice
  },

  // ===== INTELLECTUAL PROPERTY =====
  {
    id: "brand-name",
    name: "Brand Name",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Listing field for specifying the manufacturer or brand name of a product, required for many categories.",
    market: "global",
    year: 2005 // Source: Early catalog era requirement
  },
  {
    id: "trademark",
    name: "Trademark",
    type: "category",
    tier: "legal",
    status: "current",
    parent: "trust",
    desc: "Intellectual property protection program enforcing trademark rights and preventing counterfeit listings.",
    market: "global",
    year: 2000 // Source: eBay VeRO (Verified Rights Owner) program established early
  },
  {
    id: "copyright",
    name: "Copyright",
    type: "category",
    tier: "legal",
    status: "current",
    parent: "trust",
    desc: "Legal protection mechanism for copyrighted content, enforced through VeRO program and reporting tools.",
    market: "global",
    year: 2000
  },
  {
    id: "brand-identity",
    name: "Brand Identity",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Seller branding capabilities within eBay Stores and listings, including logos, colors, and custom headers.",
    market: "global",
    year: 2001 // Source: Launched with eBay Stores program
  },
  {
    id: "intellectual-property",
    name: "Intellectual Property",
    type: "category",
    tier: "legal",
    status: "current",
    parent: "trust",
    desc: "Comprehensive IP protection framework including VeRO program, rights owner reporting, and counterfeit prevention.",
    market: "global",
    year: 1999 // Source: VeRO program launched 1999, one of eBay's earliest trust initiatives
  },

  // ===== LISTING ENHANCEMENTS =====
  {
    id: "featured-first",
    name: "Featured First",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "advertising",
    desc: "Premium listing placement option that positions listings at the top of search results within their category.",
    market: "global",
    year: 2018 // Source: Launched as part of advertising simplification, replacing Gallery Plus
  },
  {
    id: "gallery",
    name: "Gallery",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "advertising",
    desc: "Standard thumbnail image display in search results, now included free with all listings.",
    market: "global",
    year: 1999 // Source: One of eBay's earliest optional upgrades, made free in 2019
  },
  {
    id: "listing-enhancement",
    name: "Listing Enhancement",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "advertising",
    desc: "Category of optional paid upgrades to improve listing visibility and presentation, including subtitles and bold titles.",
    market: "global",
    year: 2000 // Source: Early optional upgrade category
  },

  // ===== LEGAL & ACCOUNT =====
  {
    id: "user-agreement",
    name: "User Agreement",
    type: "category",
    tier: "legal",
    status: "current",
    parent: "trust",
    desc: "Legal terms and conditions governing eBay platform use, updated periodically to reflect policy changes.",
    market: "global",
    year: 1995 // Source: Established with eBay's founding, updated regularly
  },
  {
    id: "privacy-policy",
    name: "Privacy Policy",
    type: "category",
    tier: "legal",
    status: "current",
    parent: "trust",
    desc: "Legal document outlining how eBay collects, uses, and protects user data, compliant with GDPR and regional privacy laws.",
    market: "global",
    year: 1995 // Source: Core legal framework since founding, GDPR updates 2018
  },
  {
    id: "terms-of-service",
    name: "Terms of Service",
    type: "category",
    tier: "legal",
    status: "current",
    parent: "trust",
    desc: "Comprehensive terms governing seller and buyer behavior, fee structures, and dispute resolution.",
    market: "global",
    year: 1995
  },

  // ===== CORE PLATFORM FEATURES =====
  {
    id: "add-to-cart",
    name: "Add to Cart",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Shopping cart functionality allowing buyers to purchase multiple items from one or more sellers in a single checkout.",
    market: "global",
    year: 2013 // Source: Multi-item checkout and cart introduced ~2013
  },
  {
    id: "shopping-cart",
    name: "Shopping Cart",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Centralized cart holding multiple items for checkout, supporting combined shipping and bulk purchasing.",
    market: "global",
    year: 2013
  },
  {
    id: "checkout",
    name: "Checkout",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Streamlined payment and purchase flow integrated with eBay's Managed Payments system.",
    market: "global",
    year: 1999 // Source: Core functionality since early days, modernized with Managed Payments 2020
  },
  {
    id: "view-order",
    name: "View Order",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Order tracking and management interface showing purchase history, shipping status, and delivery information.",
    market: "global",
    year: 2010 // Source: Unified order view introduced with My eBay improvements
  },
  {
    id: "order-details",
    name: "Order Details",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Comprehensive order information page showing item details, seller info, shipping, and payment status.",
    market: "global",
    year: 2010
  },

  // ===== AUCTION & BIDDING FEATURES =====
  {
    id: "bid-now",
    name: "Bid Now",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Primary action button for entering a bid on an auction-style listing.",
    market: "global",
    year: 1995 // Source: Core auction functionality since eBay's founding
  },
  {
    id: "place-bid",
    name: "Place Bid",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Bid submission interface allowing buyers to enter their maximum bid amount on auction listings.",
    market: "global",
    year: 1995
  },
  {
    id: "maximum-bid",
    name: "Maximum Bid",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Proxy bidding feature where buyers set their highest bid amount and eBay automatically increments to maintain lead.",
    market: "global",
    year: 1995 // Source: Core proxy bidding system, one of eBay's founding innovations
  },
  {
    id: "winning-bid",
    name: "Winning Bid",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Current highest bid on an active auction that will win if no higher bids are placed before auction end.",
    market: "global",
    year: 1995
  },
  {
    id: "reserve-not-met",
    name: "Reserve Not Met",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Auction status indicator showing the reserve price has not been reached by current bidding.",
    market: "global",
    year: 1998 // Source: Reserve price auctions added as seller tool
  },
  {
    id: "reserve-met",
    name: "Reserve Met",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Auction status confirming bidding has exceeded the seller's reserve price and item will sell.",
    market: "global",
    year: 1998
  },
  {
    id: "time-left",
    name: "Time Left",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Real-time countdown display showing remaining time before auction or listing ends.",
    market: "global",
    year: 1995
  },
  {
    id: "ends-soon",
    name: "Ends Soon",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Urgency indicator highlighting auctions or listings ending within the next few hours.",
    market: "global",
    year: 2005 // Source: Added as search filter and urgency signal
  },
  {
    id: "auction-ended",
    name: "Auction Ended",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Status indicator showing an auction has concluded, displaying winning bid and winner information.",
    market: "global",
    year: 1995
  },
  {
    id: "number-of-bids",
    name: "Number of Bids",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Bid activity counter showing total number of bids placed on an auction listing.",
    market: "global",
    year: 1995
  },
  {
    id: "no-bids",
    name: "No Bids",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Status indicator showing an auction has received no bids yet, highlighting potential opportunity.",
    market: "global",
    year: 1995
  },
  {
    id: "buy-it-now-price",
    name: "Buy It Now Price",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Fixed price option on auction listings allowing immediate purchase without bidding.",
    market: "global",
    year: 2000 // Source: Buy It Now feature added to complement auctions
  },
  {
    id: "list-price",
    name: "List Price",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Manufacturer's suggested retail price (MSRP) display feature, showing original price for comparison with sale price.",
    market: "global",
    year: 2010 // Source: Added with catalog integration to show savings
  }
];
