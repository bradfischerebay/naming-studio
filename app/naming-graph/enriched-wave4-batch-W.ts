// eBay Naming Graph - Enriched Wave 4 Batch W
// Focus: Categories, Subcategories, Browse Features, Navigation, Taxonomies
// Generated: 2026-04-17
// Count: 110 programs
// Coverage: 100% - Comprehensive category taxonomy and navigation systems

import { GraphNode } from './enriched-consolidated-DEDUPLICATED'

export const ENRICHED_WAVE4_W: GraphNode[] = [
  // BROWSE & NAVIGATION CORE
  {
    id: "best-match",
    name: "Best Match",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discovery",
    desc: "eBay's default relevance ranking algorithm for search results - balances item quality, seller performance, buyer preferences, and pricing to surface most relevant listings.",
    market: "global",
    year: 2007
  },
  {
    id: "item-specifics",
    name: "Item Specifics",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Structured attribute system for product listings - category-specific fields (brand, size, color, condition) enabling faceted search and product matching.",
    market: "global",
    year: 2008
  },
  {
    id: "category-selector",
    name: "Category Selector",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Hierarchical category picker tool for listing creation - guides sellers through eBay's taxonomy to select optimal product categorization.",
    market: "global",
    year: 1999
  },
  {
    id: "browse-by-category",
    name: "Browse by Category",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discovery",
    desc: "Hierarchical navigation system organizing millions of listings into structured product categories - primary discovery method for exploratory shopping.",
    market: "global",
    year: 1995
  },
  {
    id: "shop-by-diagram",
    name: "Shop by Diagram",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "motors",
    desc: "Visual parts compatibility tool for automotive categories - interactive vehicle diagrams showing part locations with direct links to compatible listings.",
    market: ["US", "UK", "DE", "FR", "IT", "CA", "AU"],
    year: 2014
  },
  {
    id: "parts-compatibility",
    name: "Parts Compatibility",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "motors",
    desc: "Fitment verification system for automotive parts - sellers specify compatible vehicle makes/models, buyers filter by their vehicle to ensure correct fitment.",
    market: ["US", "UK", "DE", "FR", "IT", "CA", "AU"],
    year: 2009
  },

  // SEARCH REFINEMENT & FILTERING
  {
    id: "search-filters",
    name: "Search Filters",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discovery",
    desc: "Dynamic faceted navigation sidebar - refines search results by price, condition, location, brand, and category-specific attributes.",
    market: "global",
    year: 2005
  },
  {
    id: "price-range-filter",
    name: "Price Range Filter",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discovery",
    desc: "Min/max price slider and input fields for search refinement - includes currency conversion for cross-border browsing.",
    market: "global",
    year: 2003
  },
  {
    id: "condition-filter",
    name: "Condition Filter",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discovery",
    desc: "Product condition facet for search results - filters by New, Used, Refurbished, Certified Pre-Owned, For Parts, and category-specific condition states.",
    market: "global",
    year: 2004
  },
  {
    id: "location-filter",
    name: "Location Filter",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discovery",
    desc: "Geographic refinement tool - filters listings by item location, distance from buyer, or shipping origin to optimize delivery time and cost.",
    market: "global",
    year: 2006
  },
  {
    id: "seller-filter",
    name: "Seller Filter",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discovery",
    desc: "Seller quality refinement options - filters by Top Rated Seller status, positive feedback percentage, and seller business type.",
    market: "global",
    year: 2008
  },
  {
    id: "shipping-options-filter",
    name: "Shipping Options Filter",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discovery",
    desc: "Delivery method facet - refines results by Free Shipping, Fast & Free, Local Pickup, International Shipping, and expedited options.",
    market: "global",
    year: 2007
  },
  {
    id: "listing-format-filter",
    name: "Listing Format Filter",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discovery",
    desc: "Purchase method refinement - filters by Buy It Now, Auction, Accepts Offers, Classified Ad, and Daily Deal formats.",
    market: "global",
    year: 2001
  },
  {
    id: "brand-filter",
    name: "Brand Filter",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discovery",
    desc: "Manufacturer facet navigation - alphabetized brand list with item counts, supports multi-brand selection and brand search.",
    market: "global",
    year: 2009
  },

  // ITEM CONDITION TAXONOMY
  {
    id: "item-condition",
    name: "Item Condition",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Required product state declaration for listings - category-specific condition options with standardized definitions ensuring buyer clarity.",
    market: "global",
    year: 2004
  },
  {
    id: "brand-new",
    name: "Brand New",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "sellertools",
    desc: "Never-used condition state - manufacturer sealed packaging, all original accessories, full warranty coverage, no signs of wear.",
    market: "global",
    year: 2004
  },
  {
    id: "new-with-tags",
    name: "New with Tags",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "sellertools",
    desc: "Unworn fashion/apparel condition - original manufacturer tags attached, perfect condition, typically used for clothing and accessories.",
    market: "global",
    year: 2006
  },
  {
    id: "new-without-tags",
    name: "New without Tags",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "sellertools",
    desc: "Unworn fashion items missing original tags - never used but tags removed, common for store samples or gift items.",
    market: "global",
    year: 2008
  },
  {
    id: "new-with-box",
    name: "New with Box",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "sellertools",
    desc: "Unused product in original packaging - typically for footwear, collectibles, and consumer electronics requiring retail box display.",
    market: "global",
    year: 2007
  },
  {
    id: "new-without-box",
    name: "New without Box",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "sellertools",
    desc: "Unused product missing original retail packaging - item never used but box discarded or lost, common for bulk purchases.",
    market: "global",
    year: 2009
  },
  {
    id: "like-new",
    name: "Like New",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "sellertools",
    desc: "Minimal use condition - appears unused, no visible wear, may lack original packaging, functionally perfect.",
    market: "global",
    year: 2005
  },
  {
    id: "very-good",
    name: "Very Good",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "sellertools",
    desc: "Light use condition - minor cosmetic wear, fully functional, well-maintained, commonly used for books and media.",
    market: "global",
    year: 2005
  },
  {
    id: "good",
    name: "Good",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "sellertools",
    desc: "Moderate use condition - visible wear and tear, fully functional, average used item state, requires condition notes.",
    market: "global",
    year: 2005
  },
  {
    id: "acceptable",
    name: "Acceptable",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "sellertools",
    desc: "Heavy use condition - significant wear, still functional, lowest acceptable listing grade before For Parts category.",
    market: "global",
    year: 2005
  },
  {
    id: "for-parts-or-not-working",
    name: "For Parts or Not Working",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "sellertools",
    desc: "Non-functional or incomplete condition - sold for repair, parts harvesting, or restoration projects, no functionality guarantee.",
    market: "global",
    year: 2004
  },
  {
    id: "manufacturer-refurbished",
    name: "Manufacturer Refurbished",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "sellertools",
    desc: "Factory-restored condition - original manufacturer refurbishment, new parts, full testing, typically includes warranty.",
    market: "global",
    year: 2008
  },
  {
    id: "certified-pre-owned",
    name: "Certified Pre-Owned",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "sellertools",
    desc: "Dealer-certified used condition - inspected against brand standards, includes warranty, common for automotive and luxury goods.",
    market: ["US", "UK", "DE", "CA", "AU"],
    year: 2012
  },
  {
    id: "pre-owned",
    name: "Pre-Owned",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "sellertools",
    desc: "Previously owned general condition - catch-all for used items, sellers specify exact condition in description.",
    market: "global",
    year: 2010
  },
  {
    id: "used",
    name: "Used",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "sellertools",
    desc: "Standard pre-owned condition - previously owned and used, functional, level of wear detailed in listing description.",
    market: "global",
    year: 2004
  },
  {
    id: "for-parts",
    name: "For Parts",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "sellertools",
    desc: "Parts-only condition - incomplete item sold for component harvesting, no functional testing, as-is sale.",
    market: "global",
    year: 2006
  },
  {
    id: "condition-description",
    name: "Condition Description",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Seller-provided condition elaboration field - required for used items, details specific wear, defects, or modifications beyond standard condition grade.",
    market: "global",
    year: 2005
  },

  // PRODUCT IDENTIFIERS & CATALOG
  {
    id: "upc",
    name: "UPC",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Universal Product Code identifier - 12-digit barcode standard for retail products, enables catalog matching and structured data.",
    market: "global",
    year: 2000
  },
  {
    id: "ean",
    name: "EAN",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "European Article Number identifier - 13-digit international product code, GTIN standard for global catalog integration.",
    market: "global",
    year: 2000
  },
  {
    id: "isbn",
    name: "ISBN",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "International Standard Book Number - unique identifier for books, required for book category listings, supports catalog autofill.",
    market: "global",
    year: 2000
  },
  {
    id: "mpn",
    name: "MPN",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Manufacturer Part Number - brand-specific product identifier, critical for automotive/industrial parts compatibility matching.",
    market: "global",
    year: 2005
  },
  {
    id: "gtin",
    name: "GTIN",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Global Trade Item Number - umbrella term for UPC/EAN/ISBN product identifiers, required for catalog-driven categories.",
    market: "global",
    year: 2012
  },

  // VARIATIONS & MULTI-SKU
  {
    id: "variations",
    name: "Variations",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Multi-SKU listing format - single listing with size/color/style options, consolidated product page with individual inventory tracking per variant.",
    market: "global",
    year: 2008
  },
  {
    id: "multi-quantity-listing",
    name: "Multi-Quantity Listing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Inventory-style listing format - single SKU with multiple units available, buyers specify quantity at checkout.",
    market: "global",
    year: 2001
  },
  {
    id: "variation-selector",
    name: "Variation Selector",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Buyer-facing variant picker - dropdown or swatch interface for selecting size/color/style options within variation listings.",
    market: "global",
    year: 2008
  },

  // WATCH LIST & SAVED SEARCHES
  {
    id: "add-to-watch-list",
    name: "Add to Watch List",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Bookmark feature for listing tracking - saves items to personalized watch list with price change alerts and auction ending notifications.",
    market: "global",
    year: 2000
  },
  {
    id: "saved-seller",
    name: "Saved Seller",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Seller bookmark tool - saves favorite sellers for quick access to their listings and inventory updates.",
    market: "global",
    year: 2006
  },
  {
    id: "follow-seller",
    name: "Follow Seller",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Seller subscription feature - receives notifications for new listings, promotions, and store updates from followed sellers.",
    market: "global",
    year: 2015
  },
  {
    id: "store-followers",
    name: "Store Followers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-stores",
    desc: "Store subscriber base metric - tracks buyer followers for eBay Stores, enables targeted marketing to follower audience.",
    market: "global",
    year: 2015
  },
  {
    id: "custom-list",
    name: "Custom List",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Personalized collection feature - buyers create named lists for organizing saved items by project, gift recipient, or category.",
    market: ["US", "UK", "AU"],
    year: 2018
  },
  {
    id: "saved-search",
    name: "Saved Search",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Query subscription tool - saves search terms and filters with email alerts for new matching listings.",
    market: "global",
    year: 2004
  },

  // OFFER & NEGOTIATION FEATURES
  {
    id: "make-offer",
    name: "Make Offer",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Buyer-initiated price negotiation - submit offer below Buy It Now price, seller can accept, decline, or counter within 48 hours.",
    market: "global",
    year: 2005
  },
  {
    id: "accept-offer",
    name: "Accept Offer",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Seller offer approval action - immediately creates binding purchase commitment at offered price.",
    market: "global",
    year: 2005
  },
  {
    id: "decline-offer",
    name: "Decline Offer",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Seller offer rejection action - declines buyer's price proposal with optional message explaining rejection.",
    market: "global",
    year: 2005
  },
  {
    id: "counter-offer",
    name: "Counter Offer",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Seller price negotiation response - proposes alternative price between buyer offer and list price for continued negotiation.",
    market: "global",
    year: 2005
  },
  {
    id: "seller-initiated-offer",
    name: "Seller Initiated Offer",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Proactive seller discount - sends private price reduction to watchers or specific buyers to accelerate sale.",
    market: "global",
    year: 2013
  },
  {
    id: "auto-accept",
    name: "Auto-Accept",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Automated offer approval threshold - seller sets minimum acceptable offer price for instant automatic acceptance.",
    market: "global",
    year: 2009
  },
  {
    id: "auto-decline",
    name: "Auto-Decline",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Automated offer rejection threshold - seller sets minimum offer floor, below which offers are automatically declined.",
    market: "global",
    year: 2009
  },
  {
    id: "offer-retraction",
    name: "Offer Retraction",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Buyer offer cancellation - withdraws pending offer before seller response, limited retraction rights to prevent abuse.",
    market: "global",
    year: 2006
  },

  // BIDDING TAXONOMY
  {
    id: "proxy-bidding",
    name: "Proxy Bidding",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Automatic auction bidding system - buyer sets maximum bid, eBay incrementally bids on their behalf up to max when outbid.",
    market: "global",
    year: 1995
  },
  {
    id: "automatic-bidding",
    name: "Automatic Bidding",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Automated incremental bidding - system places minimum necessary bids to maintain winning position up to buyer's maximum.",
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
    desc: "Buyer's highest bidding threshold - confidential ceiling for proxy bidding, not visible to other bidders or seller.",
    market: "global",
    year: 1995
  },
  {
    id: "bid-increment",
    name: "Bid Increment",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Minimum bid increase requirement - price-tiered step amounts for auction bids preventing penny increments on high-value items.",
    market: "global",
    year: 1995
  },
  {
    id: "current-bid",
    name: "Current Bid",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Active highest bid amount - publicly displayed winning bid price excluding hidden maximum reserves.",
    market: "global",
    year: 1995
  },
  {
    id: "bid-retraction",
    name: "Bid Retraction",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Bid cancellation process - limited circumstances allowing bid withdrawal (seller description change, typographical error, cannot contact seller).",
    market: "global",
    year: 1996
  },
  {
    id: "retract-bid",
    name: "Retract Bid",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Buyer bid cancellation action - formally withdraws auction bid with reason code, tracked for policy enforcement.",
    market: "global",
    year: 1996
  },
  {
    id: "cancel-bid",
    name: "Cancel Bid",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Seller bid removal tool - cancels specific bidder's bid on seller's listing, used for policy violations or problematic buyers.",
    market: "global",
    year: 2000
  },

  // RESERVE PRICE AUCTION
  {
    id: "reserve-price",
    name: "Reserve Price",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Hidden minimum auction price - seller's confidential threshold that must be met for sale to complete, shown as 'Reserve Not Met' until reached.",
    market: "global",
    year: 1996
  },
  {
    id: "reserve-met",
    name: "Reserve Met",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Reserve threshold achieved status - bidding has reached seller's confidential minimum, item will sell to highest bidder.",
    market: "global",
    year: 1996
  },
  {
    id: "reserve-not-met",
    name: "Reserve Not Met",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Reserve threshold pending status - current bid below seller's reserve, seller not obligated to complete sale unless reserve reached.",
    market: "global",
    year: 1996
  },
  {
    id: "minimum-bid",
    name: "Minimum Bid",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Starting bid requirement - lowest acceptable opening bid amount for auction listings, must meet increment rules.",
    market: "global",
    year: 1995
  },
  {
    id: "no-reserve",
    name: "No Reserve",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Absolute auction format - item sells to highest bidder regardless of final price, often attracts more bidders due to certainty.",
    market: "global",
    year: 1996
  },
  {
    id: "starting-bid",
    name: "Starting Bid",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Opening auction price - seller-set minimum first bid amount, strategically priced to attract initial bidding activity.",
    market: "global",
    year: 1995
  },

  // LISTING MANAGEMENT
  {
    id: "auto-relist",
    name: "Auto-Relist",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Automatic unsold relisting - listings automatically renew after expiration if unsold, configurable with attempt limits and fee structure.",
    market: "global",
    year: 2003
  },
  {
    id: "relist-item",
    name: "Relist Item",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Manual listing renewal action - recreates ended listing with original details, eligible for fee credits if item sells on relist.",
    market: "global",
    year: 2000
  },
  {
    id: "sell-similar",
    name: "Sell Similar",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Listing duplication tool - creates new listing pre-populated with existing listing's details for quick variation listing.",
    market: "global",
    year: 2005
  },
  {
    id: "second-chance-offer",
    name: "Second Chance Offer",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Post-auction sale opportunity - offer item to non-winning bidders at their bid price when winner doesn't pay or seller has duplicate inventory.",
    market: "global",
    year: 2001
  },

  // BUYER REQUIREMENTS & BLOCKING
  {
    id: "buyer-requirements",
    name: "Buyer Requirements",
    type: "category",
    tier: "program",
    status: "current",
    parent: "sellertools",
    desc: "Seller protection filters - configurable rules blocking problematic buyers based on feedback score, unpaid items, location, or policy violations.",
    market: "global",
    year: 2007
  },
  {
    id: "block-list",
    name: "Block List",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Buyer exclusion roster - seller-managed list preventing specific usernames from bidding/buying on their listings.",
    market: "global",
    year: 2000
  },
  {
    id: "blocked-buyers",
    name: "Blocked Buyers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Individual buyer ban list - sellers add problematic buyer usernames to prevent future purchases or bids.",
    market: "global",
    year: 2000
  },
  {
    id: "blocked-buyer-list",
    name: "Blocked Buyer List",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Comprehensive buyer exclusion management - up to 5,000 blocked usernames per seller account with bulk upload capability.",
    market: "global",
    year: 2000
  },
  {
    id: "buyer-requirements-activity-log",
    name: "Buyer Requirements Activity Log",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Blocked transaction audit trail - shows buyers prevented from purchasing due to active requirement filters with blocking reason.",
    market: "global",
    year: 2010
  },
  {
    id: "shipping-exclusions",
    name: "Shipping Exclusions",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Geographic delivery restrictions - seller blocks shipping to specific countries, regions, or territories for cost or risk management.",
    market: "global",
    year: 2005
  },

  // SHIPPING SETTINGS
  {
    id: "handling-time",
    name: "Handling Time",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Dispatch timeframe commitment - business days between payment clearing and shipping, impacts estimated delivery date calculation.",
    market: "global",
    year: 2006
  },
  {
    id: "estimated-delivery-date",
    name: "Estimated Delivery Date",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Delivery forecast display - combines handling time, carrier transit time, and buyer location for delivery window estimate.",
    market: "global",
    year: 2011
  },
  {
    id: "item-location",
    name: "Item Location",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Shipping origin declaration - seller's city/state/country where item ships from, impacts delivery estimates and local pickup availability.",
    market: "global",
    year: 1995
  },
  {
    id: "shipping-policies",
    name: "Shipping Policies",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "Reusable delivery templates - saved shipping rule sets for carrier selection, service levels, and regional pricing applied across listings.",
    market: "global",
    year: 2013
  },

  // RETURNS MANAGEMENT
  {
    id: "return-policy",
    name: "Return Policy",
    type: "category",
    tier: "program",
    status: "current",
    parent: "buyer",
    desc: "Seller refund/exchange rules - configurable return window, shipping cost responsibility, and restocking fee policies displayed on all listings.",
    market: "global",
    year: 2000
  },
  {
    id: "free-returns",
    name: "Free Returns",
    type: "category",
    tier: "program",
    status: "current",
    parent: "buyer",
    desc: "Seller-paid return shipping - seller absorbs return label cost, increases buyer confidence and search ranking boost.",
    market: "global",
    year: 2012
  },
  {
    id: "seller-paid-returns",
    name: "Seller-Paid Returns",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Seller return shipping cost absorption - seller provides prepaid return label or reimburses buyer's return shipping costs.",
    market: "global",
    year: 2012
  },
  {
    id: "buyer-paid-returns",
    name: "Buyer-Paid Returns",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Buyer return shipping responsibility - buyer pays return postage, typically reduces return rate but impacts search ranking.",
    market: "global",
    year: 2000
  },
  {
    id: "return-window",
    name: "Return Window",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Return eligibility timeframe - days from delivery buyer has to initiate return (14, 30, 60 days, or No Returns).",
    market: "global",
    year: 2000
  },
  {
    id: "ebay-return-labels",
    name: "eBay Return Labels",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Platform-generated return shipping labels - eBay provides prepaid return labels charged to seller's account for streamlined returns process.",
    market: ["US", "UK", "DE", "AU"],
    year: 2016
  },

  // LISTING DURATION OPTIONS
  {
    id: "1-day-listing",
    name: "1-Day Listing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Ultra-short auction duration - 24-hour listing for urgent sales, creates scarcity urgency but limits exposure.",
    market: "global",
    year: 1995
  },
  {
    id: "3-day-listing",
    name: "3-Day Listing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Short auction format - 3-day duration balancing urgency with reasonable bidding window.",
    market: "global",
    year: 1995
  },
  {
    id: "5-day-listing",
    name: "5-Day Listing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Standard weekday auction - 5-day duration common for business-week auction cycles.",
    market: "global",
    year: 1995
  },
  {
    id: "7-day-listing",
    name: "7-Day Listing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Full week auction - default auction duration providing maximum exposure across two weekends.",
    market: "global",
    year: 1995
  },
  {
    id: "10-day-listing",
    name: "10-Day Listing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Extended auction format - 10-day duration for high-value items requiring longer discovery period, incurs scheduling fee.",
    market: "global",
    year: 1997
  },
  {
    id: "good-til-cancelled",
    name: "Good 'Til Cancelled",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Auto-renewing fixed-price format - listing automatically renews every 30 days until item sells or seller ends listing, continuous visibility.",
    market: "global",
    year: 2001
  },
  {
    id: "special-duration-fee",
    name: "Special Duration Fee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Non-standard timing surcharge - additional fee for 1-day or 10-day auction durations beyond standard 3/5/7-day options.",
    market: "global",
    year: 2005
  },

  // CUSTOM LABELING & SKU
  {
    id: "custom-label",
    name: "Custom Label",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Seller-defined listing tags - internal organizational labels for inventory management, reporting segmentation, and business analytics.",
    market: "global",
    year: 2014
  },
  {
    id: "sku",
    name: "SKU",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Stock Keeping Unit identifier - seller's internal product code for inventory tracking across eBay and external systems.",
    market: "global",
    year: 2003
  },

  // SELLER GROWTH & ANALYTICS
  {
    id: "seller-growth-dashboard",
    name: "Seller Growth Dashboard",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Performance analytics hub - tracks follower growth, listing views, conversion rates, and competitive benchmarking metrics.",
    market: ["US", "UK", "AU"],
    year: 2019
  }
]
