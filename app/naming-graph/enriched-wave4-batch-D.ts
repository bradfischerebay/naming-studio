// eBay Naming Graph - Enriched Wave 4 Batch D
// Focus: Listing durations, auction features, bidding mechanics
// Generated: 2026-04-17
// Count: 50 programs

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

export const ENRICHED_WAVE4_D: GraphNode[] = [
  {
    "id": "1-day-listing",
    "name": "1-Day Listing",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "auction",
    "desc": "Shortest auction duration option at 24 hours, used to create urgency for high-demand items or time-sensitive sales.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "3-day-listing",
    "name": "3-Day Listing",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "auction",
    "desc": "Short auction duration of 3 days, popular for items needing quick turnover while providing reasonable bidding time window.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "5-day-listing",
    "name": "5-Day Listing",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "auction",
    "desc": "Mid-length auction duration of 5 days, balancing exposure time with reasonable completion timeline.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "7-day-listing",
    "name": "7-Day Listing",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "auction",
    "desc": "Standard one-week auction duration, most popular choice providing full exposure across two weekends.",
    "market": "global",
    "year": 1999
  },
  {
    "id": "10-day-listing",
    "name": "10-Day Listing",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "auction",
    "desc": "Extended auction duration of 10 days, typically incurs special duration fee but maximizes exposure for high-value items.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "special-duration-fee",
    "name": "Special Duration Fee",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "fees",
    "desc": "Additional fee charged for non-standard auction durations (1-day and 10-day listings), incentivizing 7-day standard.",
    "market": "global",
    "year": 2003
  },
  {
    "id": "auto-relist",
    "name": "Auto-Relist",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-automation",
    "desc": "Automatic relisting of unsold items at listing end, continuing until sold or manually stopped, reducing manual effort.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "proxy-bidding",
    "name": "Proxy Bidding",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "bidding",
    "desc": "Core eBay auction mechanism where system automatically bids incrementally on behalf of bidder up to their maximum bid.",
    "market": "global",
    "year": 1995
  },
  {
    "id": "bid-increment",
    "name": "Bid Increment",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "bidding",
    "desc": "Minimum amount by which each bid must exceed current high bid, varies by price tier (e.g., $0.50 for items under $5).",
    "market": "global",
    "year": 1995
  },
  {
    "id": "current-bid",
    "name": "Current Bid",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "auction",
    "desc": "Real-time display of the leading bid amount in an active auction listing.",
    "market": "global",
    "year": 1995
  },
  {
    "id": "highest-bidder",
    "name": "Highest Bidder",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "auction",
    "desc": "Current leader in auction bidding, displayed with partial username masking for privacy.",
    "market": "global",
    "year": 1995
  },
  {
    "id": "place-bid",
    "name": "Place Bid",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "bidding",
    "desc": "Primary buyer action to submit bid on auction item, requiring login and payment method on file.",
    "market": "global",
    "year": 1995
  },
  {
    "id": "reserve-not-met",
    "name": "Reserve Not Met",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "reserve-price",
    "desc": "Status indicator shown when current bid is below seller's hidden reserve price threshold.",
    "market": "global",
    "year": 1998
  },
  {
    "id": "auction-ended",
    "name": "Auction Ended",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "auction",
    "desc": "Final status when auction duration expires, triggering winner notification and payment request.",
    "market": "global",
    "year": 1995
  },
  {
    "id": "auction-only-filter",
    "name": "Auction Only",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "search-filters",
    "desc": "Search filter to show only auction-format listings, excluding fixed-price Buy It Now items.",
    "market": "global",
    "year": 2002
  },
  {
    "id": "buy-it-now-only-filter",
    "name": "Buy It Now Only",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "search-filters",
    "desc": "Search filter to show only fixed-price listings, excluding auction-format items.",
    "market": "global",
    "year": 2002
  },
  {
    "id": "sort-by-ending-soonest",
    "name": "Sort by Ending Soonest",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "search-filters",
    "desc": "Search sorting option showing auctions ending first, popular for last-minute bidding opportunities.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "bidder-management",
    "name": "Bidder Management",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Seller tools to view, block, or cancel bids from specific buyers, managing auction participation.",
    "market": "global",
    "year": 2004
  },
  {
    "id": "hidden-bidders",
    "name": "Hidden Bidders",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "private-listing",
    "desc": "Privacy feature concealing bidder usernames in auction bid history, used for sensitive or high-value items.",
    "market": "global",
    "year": 2002
  },
  {
    "id": "bidder-identity-protection",
    "name": "Bidder Identity Protection",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "privacy",
    "desc": "Privacy policy preventing sellers from contacting losing bidders to offer similar items or solicit off-platform sales.",
    "market": "global",
    "year": 2007
  },
  {
    "id": "second-chance-offer",
    "name": "Second Chance Offer",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "auction",
    "desc": "Seller option to offer item to non-winning bidders at their highest bid if winner doesn't pay or seller has duplicates.",
    "market": "global",
    "year": 2002
  },
  {
    "id": "counteroffer",
    "name": "Counteroffer",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "best-offer",
    "desc": "Seller response to buyer offer with different price or terms, continuing negotiation cycle.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "auto-accept-offer",
    "name": "Auto-Accept",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "best-offer",
    "desc": "Seller-set threshold price where offers at or above automatically accept without manual review.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "auto-decline-offer",
    "name": "Auto-Decline",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "best-offer",
    "desc": "Seller-set minimum threshold where offers below automatically decline without manual review.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "offer-retraction",
    "name": "Offer Retraction",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "best-offer",
    "desc": "Buyer ability to cancel submitted offer before seller responds, with policy restrictions to prevent abuse.",
    "market": "global",
    "year": 2006
  },
  {
    "id": "seller-initiated-offer",
    "name": "Seller Initiated Offer",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "offers-to-watchers",
    "desc": "Proactive seller discount sent to item watchers or past buyers, driving conversion through personalized pricing.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "offer-history",
    "name": "Offer History",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "best-offer",
    "desc": "Record of all offers sent, received, accepted, declined, and countered for specific listing.",
    "market": "global",
    "year": 2006
  },
  {
    "id": "review-offers",
    "name": "Review Offers",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Seller Hub interface for managing pending Best Offer negotiations across all listings.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "offers-sent",
    "name": "Offers Sent",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "my-ebay",
    "desc": "Buyer's My eBay section tracking all submitted offers with status (pending, accepted, declined, countered).",
    "market": "global",
    "year": 2006
  },
  {
    "id": "offers-received",
    "name": "Offers Received",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Seller's view of incoming Best Offer submissions requiring action or tracking.",
    "market": "global",
    "year": 2006
  },
  {
    "id": "scheduled-listing",
    "name": "Scheduled Listing",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-tools",
    "desc": "Ability to create listing in advance with future start time, optimizing for peak traffic hours or specific dates.",
    "market": "global",
    "year": 2003
  },
  {
    "id": "start-time",
    "name": "Start Time",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "scheduled-listing",
    "desc": "Scheduled future time when listing goes live, important for auction timing strategy.",
    "market": "global",
    "year": 2003
  },
  {
    "id": "future-scheduling",
    "name": "Future Scheduling",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-tools",
    "desc": "Advanced scheduling feature allowing listings to be prepared weeks in advance with specific start times.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "fixed-price-format",
    "name": "Fixed Price Format",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-format",
    "desc": "Non-auction listing type with set Buy It Now price, no bidding, supporting Good 'Til Cancelled duration.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "multi-quantity-listing",
    "name": "Multi-Quantity Listing",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-format",
    "desc": "Fixed-price listing offering multiple identical items for sale, reducing individually until inventory depletes.",
    "market": "global",
    "year": 2001
  },
  {
    "id": "accepts-offers-filter",
    "name": "Accepts Offers Filter",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "search-filters",
    "desc": "Search filter showing only listings with Best Offer enabled, indicating seller open to negotiation.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "newly-listed",
    "name": "Newly Listed",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "search-filters",
    "desc": "Search filter or sort showing most recently created listings, popular for finding fresh inventory.",
    "market": "global",
    "year": 2002
  },
  {
    "id": "lockable-filters",
    "name": "Lockable Filters",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "search-filters",
    "desc": "Persistent search filters that remain active across searches in category, improving repeat buyer experience.",
    "market": ["US", "UK", "DE"],
    "year": 2018
  },
  {
    "id": "sold-listings-filter",
    "name": "Sold Listings",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "advanced-search",
    "desc": "Advanced search filter showing completed sales with final prices, crucial for research and pricing strategy.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "completed-listings-filter",
    "name": "Completed Listings",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "advanced-search",
    "desc": "Advanced search showing all ended listings (sold and unsold), providing market demand insights beyond sold-only data.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "private-listing",
    "name": "Private Listing",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "auction",
    "desc": "Auction listing hiding all bidder usernames from public view, used for adult items or sensitive categories.",
    "market": "global",
    "year": 2001
  },
  {
    "id": "dual-category-listing",
    "name": "Dual Category Listing",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "listing-upgrades",
    "desc": "Deprecated feature allowing item to appear in two eBay categories simultaneously for double listing fee.",
    "market": "global",
    "year": 2001
  },
  {
    "id": "gallery-picture",
    "name": "Gallery Picture",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-features",
    "desc": "Main thumbnail image shown in search results, now standard free feature but originally upgrade.",
    "market": "global",
    "year": 1999
  },
  {
    "id": "supersize-pictures",
    "name": "Supersize Pictures",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "listing-upgrades",
    "desc": "Deprecated paid upgrade for larger image display, now standard as eBay Picture Services evolved.",
    "market": "global",
    "year": 2003
  },
  {
    "id": "picture-zoom",
    "name": "Picture Zoom",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-features",
    "desc": "Interactive image magnification on listing pages, standard feature for high-resolution photos.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "self-hosted-images",
    "name": "Self-Hosted Images",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "listing-tools",
    "desc": "Deprecated option to host listing images on external servers, replaced by mandatory eBay Picture Services.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "active-content-policy",
    "name": "Active Content Policy",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "listing-policies",
    "desc": "Policy restricting JavaScript, Flash, and dynamic content in listings for security and performance.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "mobile-responsive-template",
    "name": "Mobile-Responsive Template",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-designer",
    "desc": "Listing templates automatically adapting layout for mobile devices, critical as mobile traffic exceeds desktop.",
    "market": "global",
    "year": 2013
  },
  {
    "id": "custom-template",
    "name": "Custom Template",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-designer",
    "desc": "User-created HTML/CSS listing design template, allowing branded consistent appearance across seller inventory.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "listing-template",
    "name": "Listing Template",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Reusable listing configuration saving common settings (shipping, returns, descriptions) for faster listing creation.",
    "market": "global",
    "year": 2003
  }
]
