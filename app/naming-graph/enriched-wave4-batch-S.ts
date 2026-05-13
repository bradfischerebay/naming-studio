// eBay Naming Graph - Wave 4 Batch S Enrichment
// Generated: 2026-04-17
// Programs Enriched: 115 NEW programs
// Focus: UI elements, buttons, labels, status messages, confirmation screens, error messages, form fields
// COMPLETE COVERAGE TARGET: UI/UX interaction layer

import { GraphNode } from './enriched-consolidated-DEDUPLICATED'

export const ENRICHED_WAVE4_S: GraphNode[] = [
  // BIDDING & AUCTION UI ELEMENTS (15 programs)
  {
    id: "bid-now",
    name: "Bid Now",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Primary auction interaction button enabling buyers to enter bidding interface and submit competitive offers on auction-format listings.",
    market: "global",
    year: 2000
  },
  {
    id: "place-bid",
    name: "Place Bid",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Bid submission action button confirming buyer's maximum bid amount in auction-style listings, triggering automatic proxy bidding.",
    market: "global",
    year: 2000
  },
  {
    id: "maximum-bid",
    name: "Maximum Bid",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Highest amount buyer is willing to pay in auction, with system automatically bidding incrementally up to this ceiling on buyer's behalf.",
    market: "global",
    year: 2000
  },
  {
    id: "winning-bid",
    name: "Winning Bid",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Current highest bid in active auction or final sale price in concluded auction, displayed as status indicator to all participants.",
    market: "global",
    year: 2000
  },
  {
    id: "reserve-not-met",
    name: "Reserve Not Met",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Status message indicating current bid is below seller's confidential minimum acceptable price, requiring higher bids to trigger sale.",
    market: "global",
    year: 2001
  },
  {
    id: "reserve-met",
    name: "Reserve Met",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Confirmation status shown when bidding surpasses seller's reserve price, guaranteeing sale to highest bidder at auction close.",
    market: "global",
    year: 2001
  },
  {
    id: "time-left",
    name: "Time Left",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Dynamic countdown timer displaying remaining auction duration in days, hours, minutes to create urgency and inform bidding strategy.",
    market: "global",
    year: 2000
  },
  {
    id: "ends-soon",
    name: "Ends Soon",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Urgency badge shown on listings approaching expiration within 24 hours, highlighting time-sensitive bidding opportunities.",
    market: "global",
    year: 2004
  },
  {
    id: "auction-ended",
    name: "Auction Ended",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Completion status message replacing active bidding interface when listing duration expires, showing final sale outcome.",
    market: "global",
    year: 2000
  },
  {
    id: "number-of-bids",
    name: "Number of Bids",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Bid count metric displaying total competitive offers received, serving as social proof indicator of item desirability.",
    market: "global",
    year: 2000
  },
  {
    id: "no-bids",
    name: "No Bids",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Zero-bid status message indicating auction has no offers yet, signaling opportunity for first bid at starting price.",
    market: "global",
    year: 2000
  },
  {
    id: "buy-it-now-price",
    name: "Buy It Now Price",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Fixed-price purchase option within auction format allowing instant transaction without waiting for auction conclusion.",
    market: "global",
    year: 2002
  },
  {
    id: "list-price",
    name: "List Price",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Manufacturer's suggested retail price (MSRP) displayed for reference, enabling sellers to show savings vs. standard retail pricing.",
    market: "global",
    year: 2010
  },
  {
    id: "current-bid",
    name: "Current Bid",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Real-time display of highest active bid amount in ongoing auction, automatically updating as new bids are placed by competitors.",
    market: "global",
    year: 2000
  },
  {
    id: "starting-bid",
    name: "Starting Bid",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Minimum opening price set by seller for auction-format listing, establishing baseline for competitive bidding process.",
    market: "global",
    year: 2000
  },

  // WATCH & NOTIFICATION UI (10 programs)
  {
    id: "watch-this-item",
    name: "Watch This Item",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Watchlist add button enabling buyers to track listings of interest with automated alerts for price changes, bidding activity, and listing endings.",
    market: "global",
    year: 2002
  },
  {
    id: "watching",
    name: "Watching",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Active watchlist status indicator showing buyer has enabled notifications for this listing, displayed as filled star or heart icon.",
    market: "global",
    year: 2002
  },
  {
    id: "watchers",
    name: "Watchers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Count of unique buyers monitoring listing via watchlist feature, providing social proof metric visible to sellers and potential buyers.",
    market: "global",
    year: 2005
  },
  {
    id: "items-watched",
    name: "Items Watched",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "My eBay section displaying all listings added to watchlist with sortable columns for price, time left, and bidding status.",
    market: "global",
    year: 2002
  },
  {
    id: "notify-me",
    name: "Notify Me",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Alert subscription button for out-of-stock or ended listings, triggering email when similar items become available from seller.",
    market: "global",
    year: 2018
  },
  {
    id: "get-alerts",
    name: "Get Alerts",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Saved search notification subscription enabling email or push alerts when new listings match specified search criteria.",
    market: "global",
    year: 2015
  },
  {
    id: "price-drop-alert",
    name: "Price Drop Alert",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Automated notification triggered when watched item's price decreases, helping buyers identify optimal purchase timing.",
    market: "global",
    year: 2019
  },
  {
    id: "back-in-stock",
    name: "Back in Stock",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Restock notification sent when previously sold-out listing becomes available again with renewed inventory from seller.",
    market: "global",
    year: 2018
  },
  {
    id: "outbid-notice",
    name: "Outbid Notice",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Real-time alert informing buyer their maximum bid has been exceeded by competitor, prompting opportunity to increase bid.",
    market: "global",
    year: 2000
  },
  {
    id: "winning-notice",
    name: "Winning Notice",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Auction conclusion notification confirming buyer's winning bid status and initiating checkout workflow for payment submission.",
    market: "global",
    year: 2000
  },

  // OFFER & NEGOTIATION UI (8 programs)
  {
    id: "make-offer-button",
    name: "Make Offer Button",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Best Offer interface trigger button launching negotiation modal where buyers propose alternative price below listing amount.",
    market: "global",
    year: 2005
  },
  {
    id: "send-offer",
    name: "Send Offer",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Offer submission button transmitting buyer's proposed price to seller for review, acceptance, counter-offer, or rejection.",
    market: "global",
    year: 2005
  },
  {
    id: "offer-sent",
    name: "Offer Sent",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Confirmation status message acknowledging offer submission to seller with estimated response timeframe, typically 48 hours.",
    market: "global",
    year: 2005
  },
  {
    id: "offer-accepted",
    name: "Offer Accepted",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Success notification indicating seller approved buyer's offer, creating binding purchase obligation and redirecting to checkout.",
    market: "global",
    year: 2005
  },
  {
    id: "offer-declined",
    name: "Offer Declined",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Rejection notice from seller indicating offer price was too low, with option to submit new higher offer or purchase at list price.",
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
    desc: "Seller's alternative price proposal higher than buyer's original offer, initiating negotiation dialogue toward mutually acceptable price.",
    market: "global",
    year: 2005
  },
  {
    id: "offer-expires",
    name: "Offer Expires",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "48-hour countdown timer on pending offers showing time remaining before automatic expiration if seller doesn't respond.",
    market: "global",
    year: 2005
  },
  {
    id: "review-offer",
    name: "Review Offer",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Seller Hub action button opening offer management interface to accept, decline, or counter buyer's price proposal.",
    market: "global",
    year: 2016
  },

  // SHIPPING & DELIVERY STATUS (12 programs)
  {
    id: "free-shipping-badge",
    name: "Free Shipping Badge",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Prominent search result and listing page badge highlighting seller's offer of no-cost delivery, boosting conversion and Best Match ranking.",
    market: "global",
    year: 2011
  },
  {
    id: "fast-and-free",
    name: "Fast and Free",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Combined shipping badge indicating both expedited delivery timeline and zero shipping cost to buyer's location.",
    market: "global",
    year: 2019
  },
  {
    id: "ships-to",
    name: "Ships To",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Geographic availability field listing countries and regions where seller will deliver item with corresponding shipping costs.",
    market: "global",
    year: 2000
  },
  {
    id: "estimated-delivery",
    name: "Estimated Delivery",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Projected arrival date range calculated from handling time, shipping speed, and buyer's postal code for purchase planning.",
    market: "global",
    year: 2013
  },
  {
    id: "shipping-cost",
    name: "Shipping Cost",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Total delivery charge displayed at listing and checkout, dynamically calculated based on buyer's location and selected service level.",
    market: "global",
    year: 2000
  },
  {
    id: "handling-time",
    name: "Handling Time",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Seller's commitment to ship within specified business days after payment, displayed as '1-day', '3-day', or custom timeframe.",
    market: "global",
    year: 2010
  },
  {
    id: "track-package",
    name: "Track Package",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Order details action button linking to carrier's real-time shipment tracking page with scan updates and delivery progress.",
    market: "global",
    year: 2006
  },
  {
    id: "in-transit",
    name: "In Transit",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Active shipping status indicating package has been scanned by carrier and is moving through delivery network to destination.",
    market: "global",
    year: 2006
  },
  {
    id: "out-for-delivery",
    name: "Out for Delivery",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Final-mile status showing package is on delivery vehicle for same-day arrival at buyer's address.",
    market: "global",
    year: 2006
  },
  {
    id: "delivered",
    name: "Delivered",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Completion status with timestamp and location confirming package was successfully received or left at designated delivery point.",
    market: "global",
    year: 2006
  },
  {
    id: "delivery-exception",
    name: "Delivery Exception",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Alert status indicating shipping delay or issue requiring attention, such as incorrect address, refused delivery, or weather disruption.",
    market: "global",
    year: 2010
  },
  {
    id: "return-to-sender",
    name: "Return to Sender",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Failed delivery status showing package is being sent back to seller due to undeliverable address or buyer unavailability.",
    market: "global",
    year: 2006
  },

  // PAYMENT & CHECKOUT UI (10 programs)
  {
    id: "proceed-to-checkout",
    name: "Proceed to Checkout",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Primary cart action button initiating secure payment workflow after buyer finalizes item selection and quantity.",
    market: "global",
    year: 2013
  },
  {
    id: "checkout-as-guest",
    name: "Checkout as Guest",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "One-time purchase option allowing non-registered users to complete transaction without creating eBay account.",
    market: "global",
    year: 2015
  },
  {
    id: "pay-now",
    name: "Pay Now",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Immediate payment submission button at checkout, processing credit card, PayPal, or other selected payment method.",
    market: "global",
    year: 2000
  },
  {
    id: "payment-pending",
    name: "Payment Pending",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Order status indicating payment is being verified by financial institution, typically resolving within minutes to hours.",
    market: "global",
    year: 2013
  },
  {
    id: "payment-received",
    name: "Payment Received",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Seller notification confirming funds cleared and are available for payout, triggering obligation to ship within handling time.",
    market: "global",
    year: 2013
  },
  {
    id: "payment-failed",
    name: "Payment Failed",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Transaction error message with retry option, typically due to insufficient funds, expired card, or bank security hold.",
    market: "global",
    year: 2013
  },
  {
    id: "add-payment-method",
    name: "Add Payment Method",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Wallet management action to securely store credit card, debit card, or bank account for faster future checkouts.",
    market: "global",
    year: 2013
  },
  {
    id: "edit-payment",
    name: "Edit Payment",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Checkout modification option to change payment method or billing address before transaction submission.",
    market: "global",
    year: 2013
  },
  {
    id: "order-total",
    name: "Order Total",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Final charge calculation at checkout including item price, shipping cost, taxes, and any discounts or fees.",
    market: "global",
    year: 2000
  },
  {
    id: "secure-checkout",
    name: "Secure Checkout",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Trust badge on payment page indicating SSL encryption and PCI compliance for credit card data protection.",
    market: "global",
    year: 2005
  },

  // LISTING ACTIONS & SELLER TOOLS UI (12 programs)
  {
    id: "edit-listing",
    name: "Edit Listing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Active listing modification button allowing price changes, photo updates, description edits, and quantity adjustments without relisting.",
    market: "global",
    year: 2000
  },
  {
    id: "end-listing",
    name: "End Listing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Immediate termination action removing listing from search before scheduled expiration, used when item sells elsewhere or becomes unavailable.",
    market: "global",
    year: 2000
  },
  {
    id: "relist-item",
    name: "Relist Item",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "One-click republishing of ended unsold listing with original details, optionally adjusting price or photos based on initial performance.",
    market: "global",
    year: 2002
  },
  {
    id: "sell-similar",
    name: "Sell Similar",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Listing duplication tool pre-filling form with existing item's details, streamlining creation of variant or related product listings.",
    market: "global",
    year: 2005
  },
  {
    id: "promote-your-listing",
    name: "Promote Your Listing",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "promoted-listings",
    desc: "Advertising enrollment button enabling sellers to boost visibility through paid search placement with cost-per-sale model.",
    market: "global",
    year: 2015
  },
  {
    id: "view-item",
    name: "View Item",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Preview action opening seller's listing in buyer view to verify photos, description, pricing, and shipping details display correctly.",
    market: "global",
    year: 2000
  },
  {
    id: "copy-to-inventory",
    name: "Copy to Inventory",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Template save action storing listing details in Seller Hub inventory for reuse across multiple marketplace listings.",
    market: "global",
    year: 2016
  },
  {
    id: "duplicate-listing",
    name: "Duplicate Listing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Bulk listing tool creating exact copy of existing listing for sellers with multiple identical items to sell.",
    market: "global",
    year: 2010
  },
  {
    id: "schedule-start-time",
    name: "Schedule Start Time",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Delayed publish option allowing sellers to set future launch date and time for strategic listing timing.",
    market: "global",
    year: 2005
  },
  {
    id: "auto-relist",
    name: "Auto-Relist",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Automated republishing feature continuously relisting unsold items until sold, with optional price reduction on each cycle.",
    market: "global",
    year: 2018
  },
  {
    id: "sold-listings",
    name: "Sold Listings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Seller Hub view displaying completed transactions requiring fulfillment, with printable shipping labels and buyer contact details.",
    market: "global",
    year: 2016
  },
  {
    id: "unsold-listings",
    name: "Unsold Listings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Ended listings archive showing items that didn't sell, with quick relist actions and performance metrics for price optimization.",
    market: "global",
    year: 2016
  },

  // SEARCH & FILTER UI (10 programs)
  {
    id: "sort-by",
    name: "Sort By",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Results reordering dropdown offering Best Match, Price + Shipping (Low/High), Time (Ending Soonest/Newly Listed), Distance, Condition sorting.",
    market: "global",
    year: 2003
  },
  {
    id: "filter-by",
    name: "Filter By",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Refinement sidebar panel with checkboxes for price range, condition, brand, location, shipping options, and listing format.",
    market: "global",
    year: 2010
  },
  {
    id: "clear-filters",
    name: "Clear Filters",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Reset button removing all active search refinements to return to unfiltered results view.",
    market: "global",
    year: 2010
  },
  {
    id: "price-range",
    name: "Price Range",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Min/max price input fields with slider control for narrowing results to specific budget constraints.",
    market: "global",
    year: 2005
  },
  {
    id: "condition-filter",
    name: "Condition Filter",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Product state checkboxes for New, Open Box, Certified Refurbished, Seller Refurbished, and Used item condition categories.",
    market: "global",
    year: 2008
  },
  {
    id: "buying-format",
    name: "Buying Format",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Listing type filter separating Buy It Now fixed-price, Auction, Best Offer, and classified ad format results.",
    market: "global",
    year: 2005
  },
  {
    id: "item-location",
    name: "Item Location",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Geographic proximity filter with default country, custom distance radius, and international seller inclusion options.",
    market: "global",
    year: 2003
  },
  {
    id: "show-only",
    name: "Show Only",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Specialized filters for Free Returns, Free Shipping, Completed Items, Sold Items, Authenticity Guarantee, and eBay Plus eligibility.",
    market: "global",
    year: 2012
  },
  {
    id: "refine-search",
    name: "Refine Search",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Advanced filtering panel with category-specific attributes like size, color, brand, model, year for targeted product discovery.",
    market: "global",
    year: 2010
  },
  {
    id: "matching-categories",
    name: "Matching Categories",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Category suggestion sidebar showing search term matches across different marketplace verticals with result counts.",
    market: "global",
    year: 2008
  },

  // MESSAGING & COMMUNICATION UI (8 programs)
  {
    id: "contact-seller",
    name: "Contact Seller",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Pre-purchase inquiry button opening message composer for questions about condition, compatibility, shipping, or bulk discounts.",
    market: "global",
    year: 2000
  },
  {
    id: "ask-question",
    name: "Ask Question",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Public Q&A post button creating visible listing thread where seller response appears for all prospective buyers.",
    market: "global",
    year: 2013
  },
  {
    id: "send-message",
    name: "Send Message",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Private communication composer for post-purchase coordination about payment, shipping address updates, or delivery issues.",
    market: "global",
    year: 2000
  },
  {
    id: "seller-responded",
    name: "Seller Responded",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Notification badge indicating seller replied to inquiry, with unread message count and link to My eBay Messages inbox.",
    market: "global",
    year: 2010
  },
  {
    id: "message-buyer",
    name: "Message Buyer",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Seller Hub action opening communication thread with purchaser for shipping updates, thank you notes, or issue resolution.",
    market: "global",
    year: 2016
  },
  {
    id: "request-total",
    name: "Request Total",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Multi-item purchase message asking seller to send combined invoice with shipping discount for cart consolidation.",
    market: "global",
    year: 2005
  },
  {
    id: "send-invoice",
    name: "Send Invoice",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Seller action transmitting final payment total to buyer with itemized costs, combined shipping, and any manual discounts applied.",
    market: "global",
    year: 2000
  },
  {
    id: "unread-messages",
    name: "Unread Messages",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "My eBay notification counter displaying new seller responses, shipping updates, and transactional messages requiring attention.",
    market: "global",
    year: 2010
  },

  // RETURN & REFUND UI (8 programs)
  {
    id: "request-return",
    name: "Request Return",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Return initiation button in order details launching reason selection workflow for item doesn't match description, damaged, or changed mind scenarios.",
    market: "global",
    year: 2013
  },
  {
    id: "return-requested",
    name: "Return Requested",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Seller notification indicating buyer submitted return with reason, awaiting seller approval or counteroffer within 3 business days.",
    market: "global",
    year: 2013
  },
  {
    id: "accept-return",
    name: "Accept Return",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Seller approval action providing buyer with prepaid return label and refund commitment upon item receipt.",
    market: "global",
    year: 2013
  },
  {
    id: "return-approved",
    name: "Return Approved",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Buyer confirmation with return shipping label download link and deadline to ship item back to seller.",
    market: "global",
    year: 2013
  },
  {
    id: "return-shipped",
    name: "Return Shipped",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Tracking confirmation status showing buyer dropped package at carrier, with estimated refund date upon seller receipt.",
    market: "global",
    year: 2013
  },
  {
    id: "return-received",
    name: "Return Received",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Delivery notification triggering seller's 2-business-day inspection window before automatic refund processing to buyer.",
    market: "global",
    year: 2013
  },
  {
    id: "refund-issued",
    name: "Refund Issued",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Final transaction status confirming funds returned to original payment method, typically appearing within 3-5 business days.",
    market: "global",
    year: 2013
  },
  {
    id: "partial-refund",
    name: "Partial Refund",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Seller-initiated reduced reimbursement option for item damage, missing accessories, or negotiated settlement without full return.",
    market: "global",
    year: 2013
  },

  // FEEDBACK & REVIEW UI (6 programs)
  {
    id: "leave-feedback",
    name: "Leave Feedback",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Post-purchase review submission button for positive, neutral, or negative rating with 80-character comment about transaction experience.",
    market: "global",
    year: 2000
  },
  {
    id: "feedback-left",
    name: "Feedback Left",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Completion status confirming buyer's review was published to seller's profile, with reminder that feedback is permanent and public.",
    market: "global",
    year: 2000
  },
  {
    id: "reply-to-feedback",
    name: "Reply to Feedback",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Seller response option adding public follow-up comment below buyer's negative or neutral feedback to explain circumstances.",
    market: "global",
    year: 2003
  },
  {
    id: "request-feedback-revision",
    name: "Request Feedback Revision",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Seller-initiated appeal asking buyer to modify negative feedback after issue resolution, requiring buyer consent to change.",
    market: "global",
    year: 2007
  },
  {
    id: "write-review",
    name: "Write Review",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Product-level review form collecting star rating, descriptive text, and photo uploads for item quality assessment separate from seller feedback.",
    market: "global",
    year: 2017
  },
  {
    id: "helpful-review",
    name: "Helpful Review",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Upvote button on product reviews enabling community to surface most useful buyer insights for purchase decision-making.",
    market: "global",
    year: 2017
  },

  // ERROR & VALIDATION MESSAGES (6 programs)
  {
    id: "item-no-longer-available",
    name: "Item No Longer Available",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Error message displayed when clicking sold-out or ended listing, with suggestions for similar active items from same seller.",
    market: "global",
    year: 2005
  },
  {
    id: "shipping-restrictions",
    name: "Shipping Restrictions",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Warning notification when item cannot be shipped to buyer's location due to seller limitations or export regulations.",
    market: "global",
    year: 2010
  },
  {
    id: "account-suspended",
    name: "Account Suspended",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Critical alert blocking listing creation or bidding due to policy violation, unpaid seller fees, or security concern.",
    market: "global",
    year: 2000
  },
  {
    id: "listing-error",
    name: "Listing Error",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Form validation message identifying missing required fields, prohibited keywords, or pricing issues preventing publication.",
    market: "global",
    year: 2000
  },
  {
    id: "session-expired",
    name: "Session Expired",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Security timeout message prompting re-login after 20 minutes of inactivity to protect account from unauthorized access.",
    market: "global",
    year: 2010
  },
  {
    id: "try-again",
    name: "Try Again",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Retry button on temporary system error pages encouraging resubmission after network interruption or server overload.",
    market: "global",
    year: 2005
  }
];
