// eBay Naming Graph - Wave 4 Batch H - Buyer Tools & Features
// Focus: Buyer tools, buyer preferences, buyer protection, buyer-facing UI elements
// Generated: 2026-04-17
// Count: 50 programs
// Variable: ENRICHED_WAVE4_H

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

export const ENRICHED_WAVE4_H: GraphNode[] = [
  {
    "id": "shopping-cart",
    "name": "Shopping Cart",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Multi-item checkout feature allowing buyers to add multiple items before completing purchase. Called 'Shopping Basket' in UK/AU markets.",
    "market": "global",
    "year": 2003
  },
  {
    "id": "add-to-cart",
    "name": "Add to Cart",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shopping-cart",
    "desc": "Action to add item to cart for later checkout. Enables multi-item purchases and delayed purchase decisions.",
    "market": "global",
    "year": 2003
  },
  {
    "id": "add-to-watch-list",
    "name": "Add to Watch List",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Buyer tool to track items of interest without purchasing. Sends notifications for price changes, bidding updates, and ending soon alerts.",
    "market": "global",
    "year": 2001
  },
  {
    "id": "saved-seller",
    "name": "Saved Seller",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Buyer preference feature to bookmark favorite sellers for quick access and new listing notifications.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "follow-seller",
    "name": "Follow Seller",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Active subscription to seller updates, new listings, and promotional offers. Replaced 'Add to Favorite Sellers' in 2015.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "quantity-selector",
    "name": "Quantity Selector",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shopping-cart",
    "desc": "UI element allowing buyers to select multiple quantities of same item before adding to cart.",
    "market": "global",
    "year": 2003
  },
  {
    "id": "cart-total",
    "name": "Cart Total",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shopping-cart",
    "desc": "Real-time calculation of total cost including items, shipping, taxes, and discounts before checkout.",
    "market": "global",
    "year": 2003
  },
  {
    "id": "make-offer",
    "name": "Make Offer",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "best-offer",
    "desc": "Buyer-initiated negotiation tool to propose alternative price on Best Offer enabled listings.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "counter-offer",
    "name": "Counter Offer",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "best-offer",
    "desc": "Negotiation response where seller proposes different price than buyer's initial offer.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "offer-retraction",
    "name": "Offer Retraction",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "best-offer",
    "desc": "Buyer ability to withdraw Best Offer before seller response, with restrictions to prevent abuse.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "place-bid",
    "name": "Place Bid",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "bidding",
    "desc": "Primary action for buyers to submit bid on auction-style listings.",
    "market": "global",
    "year": 1995
  },
  {
    "id": "automatic-bidding",
    "name": "Automatic Bidding",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "bidding",
    "desc": "Proxy bidding system that automatically increments buyer's bid up to maximum amount to maintain high bidder position.",
    "market": "global",
    "year": 1995
  },
  {
    "id": "maximum-bid",
    "name": "Maximum Bid",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "automatic-bidding",
    "desc": "Highest amount buyer is willing to pay, used by automatic bidding system to compete on their behalf.",
    "market": "global",
    "year": 1995
  },
  {
    "id": "current-bid",
    "name": "Current Bid",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "bidding",
    "desc": "Active highest bid amount displayed on auction listing, automatically updated as bids are placed.",
    "market": "global",
    "year": 1995
  },
  {
    "id": "highest-bidder",
    "name": "Highest Bidder",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "bidding",
    "desc": "Buyer currently winning auction with highest bid, displayed with partial username masking.",
    "market": "global",
    "year": 1995
  },
  {
    "id": "price-range-filter",
    "name": "Price Range",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "search",
    "desc": "Search filter allowing buyers to set minimum and maximum price boundaries for results.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "buy-it-now-only-filter",
    "name": "Buy It Now Only",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "search",
    "desc": "Search filter to show only fixed-price listings, excluding auction-style formats.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "auction-only-filter",
    "name": "Auction Only",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "search",
    "desc": "Search filter to show only auction-style listings, excluding fixed-price formats.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "sort-by-price",
    "name": "Sort by Price",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "search",
    "desc": "Search sorting option to arrange results by lowest or highest price first.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "sort-by-ending-soonest",
    "name": "Sort by Ending Soonest",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "search",
    "desc": "Search sorting showing auctions and listings ending first, critical for last-minute bidding strategy.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "accepts-offers-filter",
    "name": "Accepts Offers Filter",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "search",
    "desc": "Search filter to show only listings with Best Offer enabled, indicating negotiable prices.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "free-shipping-filter",
    "name": "Free Shipping Filter",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "search",
    "desc": "Search filter to show only listings offering free shipping, major buyer preference and conversion driver.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "accepts-returns-filter",
    "name": "Accepts Returns Filter",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "search",
    "desc": "Search filter to show only listings accepting returns, increasing buyer confidence.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "condition-filter",
    "name": "Condition Filter",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "search",
    "desc": "Search refinement by item condition: New, Used, Refurbished, For Parts, enabling buyers to find desired condition.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "filter-results",
    "name": "Filter Results",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "search",
    "desc": "Dynamic sidebar UI allowing buyers to refine search by multiple criteria: price, condition, shipping, location, and more.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "image-search",
    "name": "Image Search",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "search",
    "desc": "Visual search feature allowing buyers to upload photo to find similar items, powered by computer vision AI.",
    "market": "global",
    "year": 2017
  },
  {
    "id": "barcode-scanner",
    "name": "Barcode Scanner",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "mobile",
    "desc": "Mobile app feature enabling buyers to scan product barcodes to quickly find listings for that item.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "mobile-notifications",
    "name": "Mobile Notifications",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "mobile",
    "desc": "Push notifications for watched items ending, outbid alerts, shipping updates, and messages from sellers.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "push-notifications",
    "name": "Push Notifications",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "mobile",
    "desc": "Real-time alerts sent to mobile devices for bidding updates, price drops, shipping status, and account activity.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "contact-seller",
    "name": "Contact Seller",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "messaging",
    "desc": "Buyer-initiated messaging to ask pre-purchase questions about item details, shipping, or payment.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "ask-a-question",
    "name": "Ask a Question",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "messaging",
    "desc": "Pre-purchase inquiry feature allowing buyers to request additional information about listings.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "buyer-question",
    "name": "Buyer Question",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "messaging",
    "desc": "Structured pre-sale inquiry from buyer to seller, visible in listing Q&A section for transparency.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "pre-sale-question",
    "name": "Pre-Sale Question",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "messaging",
    "desc": "Buyer inquiry sent before purchase commitment, often about compatibility, condition, or shipping details.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "two-factor-authentication",
    "name": "Two-Factor Authentication",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "account-security",
    "desc": "Enhanced security requiring password plus verification code from phone or authenticator app to access account.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "2-step-verification",
    "name": "2-Step Verification",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "account-security",
    "desc": "Login security requiring password plus one-time code sent to mobile device or email for verification.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "verified-purchase",
    "name": "Verified Purchase",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "feedback",
    "desc": "Badge on buyer reviews confirming transaction actually occurred on eBay, increasing review credibility.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "open-a-case",
    "name": "Open a Case",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "buyer-protection",
    "desc": "Buyer action to file dispute in Resolution Center for Item Not Received or Significantly Not as Described.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "escalate-to-ebay",
    "name": "Escalate to eBay",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "buyer-protection",
    "desc": "Buyer option to request eBay intervention after unsuccessful seller resolution attempt in case dispute.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "upload-evidence",
    "name": "Upload Evidence",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "buyer-protection",
    "desc": "Feature allowing buyers to attach photos, messages, or documents supporting their case in dispute resolution.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "damaged-item-claim",
    "name": "Damaged Item Claim",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "buyer-protection",
    "desc": "Specific case type for items received in damaged condition, covered under Money Back Guarantee.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "wrong-item-received",
    "name": "Wrong Item Received",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "buyer-protection",
    "desc": "Case type when buyer receives completely different item than ordered, eligible for full refund.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "my-collection",
    "name": "My Collection",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "collectibles",
    "desc": "Personal collection management tool for collectibles enthusiasts to catalog owned items, track values, and identify gaps.",
    "market": "US",
    "year": 2021
  },
  {
    "id": "price-guide",
    "name": "Price Guide",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "collectibles",
    "desc": "Collectibles pricing reference based on recent sold listings, helping buyers assess fair market value.",
    "market": "US",
    "year": 2020
  },
  {
    "id": "custom-list",
    "name": "Custom List",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Buyer-created organizational lists to group items by theme, project, or gift ideas beyond standard watch list.",
    "market": "global",
    "year": 2019
  },
  {
    "id": "related-items",
    "name": "Related Items",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discovery",
    "desc": "Algorithmic recommendations showing similar or complementary items to current listing, increasing browse engagement.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "reserve-not-met",
    "name": "Reserve Not Met",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "bidding",
    "desc": "Auction status indicator showing current bid is below seller's hidden reserve price, no obligation to sell.",
    "market": "global",
    "year": 1998
  },
  {
    "id": "anonymous-bidding",
    "name": "Anonymous Bidding",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "bidding",
    "desc": "Privacy feature on certain auction categories hiding bidder usernames from public view, used for high-value collectibles.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "bidders-identities-protected",
    "name": "Bidders' Identities Protected",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "bidding",
    "desc": "Privacy protection on private listings preventing bidder usernames from being publicly visible.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "buying-restrictions",
    "name": "Buying Restrictions",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Account-level limitations on purchasing ability due to policy violations, unpaid items, or payment issues.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "checkout",
    "name": "Checkout",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shopping-cart",
    "desc": "Final purchase flow where buyer confirms items, shipping address, payment method and completes transaction.",
    "market": "global",
    "year": 2003
  }
]
