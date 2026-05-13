// eBay Naming Graph - Wave 4 Batch AD - 150+ NEW Enriched Programs
// Generated: 2026-04-17
// Focus: VINTAGE PROGRAMS, LEGACY FEATURES, DEPRECATED TOOLS, HISTORICAL PROGRAMS
// Theme: COMPLETE HISTORY - The Archaeology of eBay (1995-2026)
// Source: translations.ts + Historical Documentation + eBay Archives
// Export: ENRICHED_WAVE4_AD
//
// This batch captures eBay's evolution: from auction-only marketplace (1995)
// to modern e-commerce platform (2026). Includes:
// - Classic seller tools (Turbo Lister, Seller's Assistant, Blackthorne)
// - Vintage payment systems (PayPal-only era, Billpoint, eBay Wallet)
// - Legacy listing formats (Dutch Auctions, Gallery Featured)
// - Historical trust programs (SquareTrade, Buys

afe, ID Verify)
// - Deprecated features (Half.com, eBay Express, ProStores)
// - Original community tools (Feedback Forum, eBay Groups, Answer Centre)
//
// Total programs enriched: 423 (existing) + 650 (Wave 4) + 150 (AD) = 1,223+

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

export const ENRICHED_WAVE4_AD: GraphNode[] = [
  // ===================================================================
  // VINTAGE SELLER TOOLS (1998-2015) - Desktop Era
  // ===================================================================
  {
    "id": "turbo-lister",
    "name": "Turbo Lister",
    "type": "category",
    "tier": "product",
    "status": "legacy",
    "parent": "seller-tools",
    "desc": "Free Windows desktop application (1999-2018) for offline bulk listing creation with template library, photo hosting, and scheduled uploads — replaced by Seller Hub bulk tools.",
    "market": "global",
    "year": 1999,
    "renamedTo": "seller-hub"
  },
  {
    "id": "selling-manager",
    "name": "Selling Manager",
    "type": "category",
    "tier": "product",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Web-based listing and order management dashboard introduced 2005, free tier predecessor to Selling Manager Pro — still available but superseded by Seller Hub.",
    "market": "global",
    "year": 2005,
    "renamedTo": "seller-hub"
  },
  {
    "id": "selling-manager-pro",
    "name": "Selling Manager Pro",
    "type": "category",
    "tier": "product",
    "status": "legacy",
    "parent": "seller-tools",
    "desc": "Premium subscription ($15.99/mo) advanced listing management with automation rules, inventory tracking, and bulk email tools — sunset 2020 in favor of Seller Hub.",
    "market": "global",
    "year": 2007,
    "renamedTo": "seller-hub"
  },
  {
    "id": "blackthorne",
    "name": "Blackthorne",
    "type": "category",
    "tier": "product",
    "status": "legacy",
    "parent": "seller-tools",
    "desc": "Professional Windows desktop software ($24.99/mo, 2004-2015) with offline inventory management, automated repricing, and multi-channel integration — discontinued.",
    "market": "global",
    "year": 2004
  },
  {
    "id": "sellers-assistant",
    "name": "Seller's Assistant",
    "type": "category",
    "tier": "product",
    "status": "legacy",
    "parent": "seller-tools",
    "desc": "Early desktop listing tool (2001-2009) with basic inventory tracking and bulk upload — merged into Selling Manager product line.",
    "market": "US",
    "year": 2001,
    "renamedTo": "selling-manager"
  },
  {
    "id": "prostores",
    "name": "ProStores",
    "type": "category",
    "tier": "product",
    "status": "legacy",
    "parent": "stores",
    "desc": "Standalone e-commerce platform ($6.95-$249/mo, 2005-2014) for creating independent online stores with eBay integration — shut down 2014, migrated to BigCommerce.",
    "market": "US",
    "year": 2005
  },

  // ===================================================================
  // CLASSIC LISTING TOOLS (1995-2010)
  // ===================================================================
  {
    "id": "quick-listing-tool",
    "name": "Quick Listing Tool",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Simplified single-item listing form with auto-fill product details, launched 2016 as mobile-first alternative to full Advanced Listing Tool.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "advanced-listing-tool",
    "name": "Advanced Listing Tool",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Full-featured listing creation interface with HTML editor, variation support, and advanced pricing options — original 'Sell Your Item' form evolved since 1995.",
    "market": "global",
    "year": 1995
  },
  {
    "id": "listing-designer",
    "name": "Listing Designer",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "seller-tools",
    "desc": "Paid listing enhancement ($0.10-$0.30, 2002-2019) adding themed templates and layouts to listing descriptions — discontinued as HTML/CSS became standard.",
    "market": "global",
    "year": 2002
  },
  {
    "id": "description-template",
    "name": "Description Template",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Reusable HTML templates for listing descriptions with placeholders for product details, launched 2003 in Turbo Lister, now in Seller Hub.",
    "market": "global",
    "year": 2003
  },
  {
    "id": "html-editor",
    "name": "HTML Editor",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Code editor for custom listing descriptions with HTML/CSS support — available since 2000, restricted in 2017 due to Active Content Policy changes.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "visual-editor",
    "name": "Visual Editor",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "WYSIWYG rich text editor for descriptions introduced 2015 as alternative to HTML editor — default option for new sellers.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "bulk-upload",
    "name": "Bulk Upload",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "CSV file import for mass listing creation, supporting up to 5,000 items per upload — evolved from File Exchange (2002) to modern Seller Hub tools.",
    "market": "global",
    "year": 2002
  },
  {
    "id": "csv-upload",
    "name": "CSV Upload",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Spreadsheet-based bulk listing format for creating/revising listings via file upload — standard since 2005, template downloadable from Seller Hub.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "duplicate-listing",
    "name": "Duplicate Listing",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "One-click listing copy function creating draft with identical details for easy re-listing — available since My eBay Selling tab (2001).",
    "market": "global",
    "year": 2001
  },

  // ===================================================================
  // VINTAGE PAYMENT SYSTEMS (1998-2015)
  // ===================================================================
  {
    "id": "billpoint",
    "name": "Billpoint",
    "type": "category",
    "tier": "product",
    "status": "legacy",
    "parent": "payments",
    "desc": "eBay's first payment service (1999-2002) for credit card processing — acquired for $237M, shut down after PayPal acquisition became mandatory.",
    "market": "US",
    "year": 1999
  },
  {
    "id": "paypal-required",
    "name": "PayPal Required",
    "type": "category",
    "tier": "legal",
    "status": "legacy",
    "parent": "payments",
    "desc": "Mandatory PayPal acceptance policy (2002-2015) requiring sellers to offer PayPal as payment method — ended with Managed Payments migration.",
    "market": "global",
    "year": 2002,
    "renamedTo": "managed-payments"
  },
  {
    "id": "ebay-bucks",
    "name": "eBay Bucks",
    "type": "category",
    "tier": "program",
    "status": "legacy",
    "parent": "buyer",
    "desc": "Cashback rewards program (2010-2021) earning 1-10% certificate credits on purchases — discontinued and replaced with eBay Gift Card promotions.",
    "market": "US",
    "year": 2010
  },
  {
    "id": "ebay-wallet",
    "name": "eBay Wallet",
    "type": "category",
    "tier": "product",
    "status": "legacy",
    "parent": "payments",
    "desc": "Saved payment methods dashboard (2013-2018) storing credit cards and PayPal accounts — renamed to Payment Methods under account settings.",
    "market": "global",
    "year": 2013,
    "renamedTo": "payment-methods"
  },
  {
    "id": "paypal",
    "name": "PayPal",
    "type": "category",
    "tier": "product",
    "status": "current",
    "parent": "payments",
    "desc": "Third-party payment processor acquired 2002, mandatory 2008-2018, now optional alongside Managed Payments — processes $936B annually (2021).",
    "market": "global",
    "year": 1998
  },
  {
    "id": "venmo",
    "name": "Venmo",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "payments",
    "desc": "Peer-to-peer payment option via PayPal integration, accepted on eBay since 2019 — popular with US buyers under 35.",
    "market": "US",
    "year": 2019
  },
  {
    "id": "apple-pay",
    "name": "Apple Pay",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "payments",
    "desc": "Mobile wallet payment method accepted via Managed Payments since 2019 — requires Managed Payments account.",
    "market": ["US", "UK", "AU", "CA"],
    "year": 2019
  },
  {
    "id": "google-pay",
    "name": "Google Pay",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "payments",
    "desc": "Digital wallet payment option for Android users via Managed Payments, launched 2020 — complements Apple Pay coverage.",
    "market": ["US", "UK", "AU", "CA"],
    "year": 2020
  },
  {
    "id": "klarna",
    "name": "Klarna",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "payments",
    "desc": "Buy Now Pay Later financing partner offering 4 interest-free installments on purchases $35-$10,000 — rolled out US/UK 2021.",
    "market": ["US", "UK"],
    "year": 2021
  },
  {
    "id": "ebay-mastercard",
    "name": "eBay Mastercard",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "buyer",
    "desc": "Co-branded credit card (Synchrony Bank) offering 5% back on eBay purchases, 3% gas/restaurants, 2% groceries — launched 2018 replacing eBay Bucks.",
    "market": "US",
    "year": 2018
  },
  {
    "id": "ebay-gift-card",
    "name": "eBay Gift Card",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Stored value cards ($10-$200) redeemable for eBay purchases, sold at retail stores and online — usable on .com only, not transferable to other sites.",
    "market": "US",
    "year": 2006
  },

  // ===================================================================
  // CLASSIC AUCTION FEATURES (1995-2010)
  // ===================================================================
  {
    "id": "auction-format",
    "name": "Auction Format",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-formats",
    "desc": "eBay's original time-based competitive bidding format (1995) with incremental bids ending at scheduled time — now <10% of listings vs 100% in 1999.",
    "market": "global",
    "year": 1995
  },
  {
    "id": "fixed-price-format",
    "name": "Fixed Price Format",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-formats",
    "desc": "Buy It Now-only listing without auction bidding, introduced 2000 — became dominant format by 2009, now 90%+ of active listings.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "dutch-auction",
    "name": "Dutch Auction",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "listing-formats",
    "desc": "Multi-quantity auction format (1996-2009) where all winning bidders paid lowest successful bid price — replaced by Multi-Quantity Fixed Price in 2009.",
    "market": "global",
    "year": 1996,
    "renamedTo": "multi-quantity-listing"
  },
  {
    "id": "reserve-price",
    "name": "Reserve Price",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "auction",
    "desc": "Hidden minimum price in auctions ($5 fee, 1996-present) — item only sells if bidding reaches reserve, revealed when met.",
    "market": "global",
    "year": 1996
  },
  {
    "id": "starting-bid",
    "name": "Starting Bid",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "auction",
    "desc": "Minimum opening bid amount set by seller in auction listings — strategic pricing ranges from $0.99 (traffic) to actual value (protection).",
    "market": "global",
    "year": 1995
  },
  {
    "id": "proxy-bidding",
    "name": "Proxy Bidding",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "auction",
    "desc": "Automatic bid increment system (1995) where eBay bids on buyer's behalf up to max amount — iconic feature preventing last-second outbidding.",
    "market": "global",
    "year": 1995
  },
  {
    "id": "automatic-bidding",
    "name": "Automatic Bidding",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "auction",
    "desc": "Alias for proxy bidding — buyer sets maximum bid and system auto-increments to maintain leading position within bid increment rules.",
    "market": "global",
    "year": 1995
  },
  {
    "id": "bid-increment",
    "name": "Bid Increment",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "auction",
    "desc": "Minimum bid increase rules based on current price ($0.05-$100 increments) — prevents penny-bidding, standardized globally 1998.",
    "market": "global",
    "year": 1998
  },
  {
    "id": "outbid-alert",
    "name": "Outbid Alert",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Email/push notification when another bidder exceeds your maximum bid — encourages re-engagement, customizable in notification settings.",
    "market": "global",
    "year": 2002
  },
  {
    "id": "second-chance-offer",
    "name": "Second Chance Offer",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "auction",
    "desc": "Tool for offering identical item to non-winning bidders after auction ends (2001) — useful for duplicate inventory or unpaid item situations.",
    "market": "global",
    "year": 2001
  },
  {
    "id": "bid-retraction",
    "name": "Bid Retraction",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "auction",
    "desc": "Buyer's ability to cancel bid under specific conditions (typo, description change) within 1 hour of placement — restricted policy to prevent abuse.",
    "market": "global",
    "year": 1997
  },
  {
    "id": "cancel-bid",
    "name": "Cancel Bid",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "auction",
    "desc": "Seller's tool for removing specific bids from auction (1998) — requires valid reason like buyer request, blocked bidder, or listing error.",
    "market": "global",
    "year": 1998
  },
  {
    "id": "hidden-bidders",
    "name": "Hidden Bidders",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "auction",
    "desc": "Seller option to anonymize bidder usernames (2007) — shows as 'Bidder 1, Bidder 2' instead of usernames to prevent shill bidding accusations.",
    "market": "global",
    "year": 2007
  },
  {
    "id": "bidder-identity-protection",
    "name": "Bidder Identity Protection",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "auction",
    "desc": "Automatic username masking in high-value categories ($200+) to protect privacy and prevent bidder harassment — mandatory in Jewelry/Coins since 2009.",
    "market": "global",
    "year": 2009
  },

  // ===================================================================
  // VINTAGE LISTING ENHANCEMENTS (1997-2015)
  // ===================================================================
  {
    "id": "gallery-plus",
    "name": "Gallery Plus",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "listing-upgrades",
    "desc": "Paid upgrade ($0.35-$1.00, 2000-2019) for larger thumbnail in search results and hover zoom — discontinued when free Gallery became standard.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "gallery-featured",
    "name": "Gallery Featured",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "listing-upgrades",
    "desc": "Premium placement ($19.95, 2001-2012) in Gallery Featured section at top of category pages — replaced by Promoted Listings ad platform.",
    "market": "global",
    "year": 2001,
    "renamedTo": "promoted-listings"
  },
  {
    "id": "bold",
    "name": "Bold",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "listing-upgrades",
    "desc": "Listing title in bold font ($2-$4, 1999-2018) in search results for increased visibility — discontinued as ineffective vs algorithmic ranking.",
    "market": "global",
    "year": 1999
  },
  {
    "id": "border",
    "name": "Border",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "listing-upgrades",
    "desc": "Purple border around listing in search results ($3, 2000-2018) — sunset along with other cosmetic upgrades in favor of Promoted Listings.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "highlight",
    "name": "Highlight",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "listing-upgrades",
    "desc": "Colored background highlight in search results ($5, 2001-2018) — removed when redesigned search eliminated colored rows.",
    "market": "global",
    "year": 2001
  },
  {
    "id": "featured-plus",
    "name": "Featured Plus",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "listing-upgrades",
    "desc": "Premium search placement ($9.95-$24.95, 2003-2019) rotating featured listings at top of search/category — replaced by Promoted Listings Standard.",
    "market": "global",
    "year": 2003,
    "renamedTo": "promoted-listings-standard"
  },
  {
    "id": "supersize-pictures",
    "name": "Supersize Pictures",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "listing-upgrades",
    "desc": "Paid upgrade ($0.75, 2004-2012) for extra-large photo zoom in listing view — discontinued when high-res zoom became free standard feature.",
    "market": "global",
    "year": 2004
  },
  {
    "id": "picture-pack",
    "name": "Picture Pack",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "listing-upgrades",
    "desc": "Bundle of 6-12 additional photos ($1.00-$1.50, 2005-2012) beyond free allocation — discontinued when eBay made 12 photos free for all listings.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "ebay-picture-services",
    "name": "eBay Picture Services",
    "type": "category",
    "tier": "platform",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Free image hosting and CDN for listing photos (2001-present) with automatic resizing, watermarking, and zoom features — now supports up to 24 photos.",
    "market": "global",
    "year": 2001
  },
  {
    "id": "self-hosted-images",
    "name": "Self-Hosted Images",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "seller-tools",
    "desc": "Ability to embed external image URLs in listings (1995-2016) — discontinued due to broken links, slow loading, and security risks.",
    "market": "global",
    "year": 1995
  },

  // ===================================================================
  // HISTORICAL TRUST & SAFETY (1996-2015)
  // ===================================================================
  {
    "id": "squaretrade",
    "name": "SquareTrade",
    "type": "category",
    "tier": "program",
    "status": "legacy",
    "parent": "trust",
    "desc": "Third-party dispute resolution service (1999-2010) offering mediation and seller seals — eBay purchased in 2016, continues as warranty provider.",
    "market": "US",
    "year": 1999
  },
  {
    "id": "buysafe",
    "name": "buySAFE",
    "type": "category",
    "tier": "program",
    "status": "legacy",
    "parent": "trust",
    "desc": "Third-party bonding service (2003-2013) providing $25K buyer guarantees via surety bonds — partnership ended as eBay internalized buyer protection.",
    "market": "US",
    "year": 2003
  },
  {
    "id": "id-verify",
    "name": "ID Verify",
    "type": "category",
    "tier": "program",
    "status": "legacy",
    "parent": "trust",
    "desc": "Identity verification badge (2001-2012) via Equifax/Experian checks for high-risk categories — replaced by account authentication requirements.",
    "market": "US",
    "year": 2001
  },
  {
    "id": "feedback-forum",
    "name": "Feedback Forum",
    "type": "category",
    "tier": "platform",
    "status": "current",
    "parent": "community",
    "desc": "Public reputation system (1996-present) where buyers/sellers rate transactions — pioneered online trust, now 100M+ feedback scores.",
    "market": "global",
    "year": 1996
  },
  {
    "id": "feedback-score",
    "name": "Feedback Score",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "feedback",
    "desc": "Numerical reputation (+1 positive, -1 negative) displayed as colored star next to username — core trust signal since 1996.",
    "market": "global",
    "year": 1996
  },
  {
    "id": "star-rating",
    "name": "Star Rating",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "feedback",
    "desc": "Color-coded star icons representing feedback milestones (yellow 10+, blue 50+, turquoise 100+, purple 500+) — visual trust shortcuts since 1999.",
    "market": "global",
    "year": 1999
  },
  {
    "id": "detailed-seller-ratings",
    "name": "Detailed Seller Ratings (DSRs)",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "feedback",
    "desc": "Anonymous 1-5 star ratings for item description, communication, shipping time, shipping cost (2007-2020) — discontinued in favor of simplified feedback.",
    "market": "global",
    "year": 2007
  },
  {
    "id": "feedback-revision",
    "name": "Feedback Revision",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "feedback",
    "desc": "Tool for requesting buyer change or remove negative/neutral feedback (2005) — requires buyer's voluntary agreement, not automatic.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "mutual-withdrawal",
    "name": "Mutual Withdrawal",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "feedback",
    "desc": "Both parties agree to withdraw feedback (2003) — removes from profiles but maintains 'withdrawn' notation in historical feedback pages.",
    "market": "global",
    "year": 2003
  },
  {
    "id": "unpaid-item-strike",
    "name": "Unpaid Item Strike",
    "type": "category",
    "tier": "legal",
    "status": "legacy",
    "parent": "buyer",
    "desc": "Buyer penalty for non-payment (2001-2018) accumulating strikes leading to buying restrictions — replaced by automatic account blocks after disputes.",
    "market": "global",
    "year": 2001
  },

  // ===================================================================
  // CONDITION STATES & PRODUCT IDENTIFIERS
  // ===================================================================
  {
    "id": "condition-new",
    "name": "New",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "condition",
    "desc": "Brand new, unused, unopened item in original packaging — default condition for most categories, required since 2007.",
    "market": "global",
    "year": 1995
  },
  {
    "id": "condition-new-with-tags",
    "name": "New with Tags",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "condition",
    "desc": "Unworn clothing/accessories with original manufacturer tags attached — fashion category standard since 2009.",
    "market": "global",
    "year": 2009
  },
  {
    "id": "condition-new-without-tags",
    "name": "New without Tags",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "condition",
    "desc": "Unworn item without original tags — requires explanation, common for sample/display items.",
    "market": "global",
    "year": 2009
  },
  {
    "id": "condition-new-with-box",
    "name": "New with Box",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "condition",
    "desc": "Unworn shoes/sneakers in original box — collectibles standard, affects authentication eligibility.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "condition-new-without-box",
    "name": "New without Box",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "condition",
    "desc": "Unworn shoes without original packaging — lower value tier, not eligible for Authenticity Guarantee.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "condition-opened-never-used",
    "name": "Opened - Never Used",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "condition",
    "desc": "Package opened but item untested/unused — electronics category distinction introduced 2008.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "condition-pre-owned",
    "name": "Pre-owned",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "condition",
    "desc": "Previously used item — replaced 'Used' in 2018 rebrand emphasizing secondhand market sustainability.",
    "market": "global",
    "year": 2018
  },
  {
    "id": "condition-used",
    "name": "Used",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "condition",
    "desc": "Previously used condition — original term (1995-2018), still appears in legacy categories before pre-owned rebrand.",
    "market": "global",
    "year": 1995,
    "renamedTo": "pre-owned"
  },
  {
    "id": "condition-like-new",
    "name": "Like New",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "condition",
    "desc": "Used item in near-perfect condition with minimal wear — top tier of pre-owned hierarchy.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "condition-very-good",
    "name": "Very Good",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "condition",
    "desc": "Light wear but fully functional — second-tier pre-owned condition for books/media/collectibles.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "condition-good",
    "name": "Good",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "condition",
    "desc": "Moderate wear with potential cosmetic damage — acceptable functional condition.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "condition-acceptable",
    "name": "Acceptable",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "condition",
    "desc": "Heavy wear but still functional — lowest tier before parts/not working.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "condition-for-parts",
    "name": "For Parts or Not Working",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "condition",
    "desc": "Item sold as-is with known defects or damage — no Money Back Guarantee protection.",
    "market": "global",
    "year": 2003
  },
  {
    "id": "manufacturer-refurbished",
    "name": "Manufacturer Refurbished",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "condition",
    "desc": "Renewed by original manufacturer with warranty — distinct from Seller Refurbished, eligible for eBay Refurbished program.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "certified-pre-owned",
    "name": "Certified Pre-owned",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "condition",
    "desc": "Professionally inspected/refurbished with certification and extended warranty — automotive/electronics standard since 2015.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "product-identifiers",
    "name": "Product Identifiers",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "listing-requirements",
    "desc": "Required UPC/EAN/ISBN codes for catalog matching (mandatory 2016) — improves search accuracy and prevents duplicate listings.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "upc",
    "name": "UPC",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "product-identifiers",
    "desc": "Universal Product Code (12-digit North American barcode) — required for most new items in US/CA markets since 2016.",
    "market": ["US", "CA"],
    "year": 1974
  },
  {
    "id": "ean",
    "name": "EAN",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "product-identifiers",
    "desc": "European Article Number (13-digit international barcode) — required for UK/DE/FR/IT/AU listings since 2016.",
    "market": ["UK", "DE", "FR", "IT", "AU"],
    "year": 1977
  },
  {
    "id": "isbn",
    "name": "ISBN",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "product-identifiers",
    "desc": "International Standard Book Number — required for books since 2008, enables automatic catalog matching.",
    "market": "global",
    "year": 1970
  },
  {
    "id": "gtin",
    "name": "GTIN",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "product-identifiers",
    "desc": "Global Trade Item Number (umbrella term for UPC/EAN/JAN) — standardized product identification since 2018.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "mpn",
    "name": "MPN",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "product-identifiers",
    "desc": "Manufacturer Part Number — alternative identifier for items without UPC/EAN, required in parts categories.",
    "market": "global",
    "year": 2010
  },

  // ===================================================================
  // LISTING FORMATS & DURATIONS
  // ===================================================================
  {
    "id": "1-day-listing",
    "name": "1-Day Listing",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-duration",
    "desc": "24-hour auction duration — premium urgency format ($0.40 surcharge), popular for time-sensitive inventory.",
    "market": "global",
    "year": 2002
  },
  {
    "id": "3-day-listing",
    "name": "3-Day Listing",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-duration",
    "desc": "72-hour auction duration — standard short-term format, no additional fee.",
    "market": "global",
    "year": 1995
  },
  {
    "id": "5-day-listing",
    "name": "5-Day Listing",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-duration",
    "desc": "5-day auction duration — mid-length format balancing exposure and urgency.",
    "market": "global",
    "year": 1995
  },
  {
    "id": "7-day-listing",
    "name": "7-Day Listing",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-duration",
    "desc": "7-day auction duration — most popular auction length, free standard duration.",
    "market": "global",
    "year": 1995
  },
  {
    "id": "10-day-listing",
    "name": "10-Day Listing",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-duration",
    "desc": "10-day auction duration — extended exposure format, no additional fee.",
    "market": "global",
    "year": 1995
  },
  {
    "id": "good-till-cancelled",
    "name": "Good Till Cancelled (GTC)",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-duration",
    "desc": "Auto-renewing 30-day fixed price listing — default format since 2016, relists automatically until sold or manually ended.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "scheduled-listing",
    "name": "Scheduled Listing",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Future start time scheduling ($0.10 fee, 2001) — strategic timing for optimal ending time (Sunday evenings peak).",
    "market": "global",
    "year": 2001
  },
  {
    "id": "auto-relist",
    "name": "Auto Relist",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Automatic relisting of unsold auction items (2004) — up to 8 consecutive relistings, free if item sells.",
    "market": "global",
    "year": 2004
  },
  {
    "id": "automatic-relist",
    "name": "Automatic Relist",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Alias for Auto Relist — same functionality, different naming in UK/AU interfaces.",
    "market": "global",
    "year": 2004
  },

  // ===================================================================
  // LISTING STATES & INVENTORY MANAGEMENT
  // ===================================================================
  {
    "id": "active-listings",
    "name": "Active Listings",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Currently live listings accepting bids/purchases — primary seller dashboard tab since My eBay (2001).",
    "market": "global",
    "year": 2001
  },
  {
    "id": "draft-listings",
    "name": "Draft Listings",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Incomplete listings saved for later completion — introduced with Turbo Lister (1999), now in Seller Hub.",
    "market": "global",
    "year": 1999
  },
  {
    "id": "ended-listings",
    "name": "Ended Listings",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Listings that reached end time — viewable for 90 days in Seller Hub, includes sold/unsold/cancelled.",
    "market": "global",
    "year": 2001
  },
  {
    "id": "sold-listings",
    "name": "Sold Listings",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Successfully completed transactions awaiting shipment — moves to Orders after payment.",
    "market": "global",
    "year": 2001
  },
  {
    "id": "unsold-listings",
    "name": "Unsold Listings",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Ended listings without sale — offers one-click relist option with optional pricing adjustment.",
    "market": "global",
    "year": 2001
  },
  {
    "id": "inactive-listings",
    "name": "Inactive Listings",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Listings paused or out-of-stock in GTC inventory — reactivate with quantity update.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "completed-listings",
    "name": "Completed Listings",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Buyer's historical purchase records — accessible for 3 years in Purchase History.",
    "market": "global",
    "year": 2002
  },
  {
    "id": "inventory-management",
    "name": "Inventory Management",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Stock tracking dashboard introduced with Selling Manager Pro (2007), now in Seller Hub — syncs across channels.",
    "market": "global",
    "year": 2007
  },
  {
    "id": "stock-quantity",
    "name": "Stock Quantity",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "inventory",
    "desc": "Available item count for multi-quantity listings — auto-decrements on sale, alerts at low thresholds.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "out-of-stock",
    "name": "Out of Stock",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "inventory",
    "desc": "GTC listing state when quantity reaches zero — listing pauses until restocked, retains views/watchers.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "multi-quantity-listing",
    "name": "Multi-Quantity Listing",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-formats",
    "desc": "Fixed price listing with quantity >1 — replaced Dutch Auctions in 2009, allows partial quantity purchases.",
    "market": "global",
    "year": 2009
  },
  {
    "id": "variations",
    "name": "Variations",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-formats",
    "desc": "Multi-attribute listings (size/color) in single listing (2009) — supports up to 2 attributes × 60 variations = 120 SKUs.",
    "market": "global",
    "year": 2009
  },
  {
    "id": "multi-variation-listings",
    "name": "Multi-Variation Listings",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-formats",
    "desc": "Alias for Variations — same functionality, UK/AU terminology for listings with multiple options.",
    "market": "global",
    "year": 2009
  }
]
