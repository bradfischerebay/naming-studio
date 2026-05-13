import type { NodeEnrichmentV2 } from './enriched-v2-batch-01-trust'

// Batch 5d — Buyer-Side Features, Listing Formats, Payment Methods, Search & Discovery
// Covers: Best Offer, Buy It Now, auction mechanics, Cassini, search features,
// payment methods (Apple Pay, Google Pay, Klarna, Venmo), listing tools,
// buyer-facing features, seasonal events

export const BUYER_FEATURES_ENRICHMENT: NodeEnrichmentV2[] = [

  // ── CORE LISTING FORMATS & MECHANICS ─────────────────────────────────────

  {
    id: 'buy-it-now',
    valueProp: "Buy It Now is eBay's fixed-price listing format — buyers purchase immediately at a set price without bidding or waiting for an auction to end, making the buying experience as fast and predictable as any standard e-commerce purchase.",
    valueTerritories: ['speed', 'convenience', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'full-funnel', 'long-term', 'reusable-capability'],
    citations: [
      'https://help.ebay.com/buyer/buying/buying-buy-it-now',
    ],
  },

  {
    id: 'buy-it-now-price',
    valueProp: "Buy It Now Price is the fixed purchase price set by a seller for immediate sale — displayed alongside auction bids in hybrid listings, enabling buyers to bypass the auction and buy immediately at the seller's stated price.",
    valueTerritories: ['transparency', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/buying/buying-buy-it-now'],
  },

  {
    id: 'buy-it-now-filter',
    valueProp: "Buy It Now Filter is the search refinement that limits results to only fixed-price listings — letting buyers who want immediate purchase certainty exclude auction listings from their search results.",
    valueTerritories: ['convenience', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/buying'],
  },

  {
    id: 'buy-it-now-in-auctions',
    valueProp: "Buy It Now in Auctions is the hybrid listing format where a seller sets both a starting auction bid and a fixed Buy It Now price — buyers can bid or purchase immediately, with the BIN option disappearing once the first bid is placed.",
    valueTerritories: ['convenience', 'speed', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/listing-formats'],
  },

  {
    id: 'best-offer',
    valueProp: "Best Offer lets buyers propose their own price on eligible fixed-price listings — opening a negotiation between buyer and seller that often results in a sale at a price both sides find acceptable, driving higher conversion for price-sensitive buyers.",
    valueTerritories: ['value', 'convenience', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://help.ebay.com/buyer/buying/best-offer',
    ],
  },

  {
    id: 'auction-format',
    valueProp: "Auction Format is eBay's original listing type — sellers set a starting bid and a fixed end time, buyers place competing bids, and the highest bidder wins. eBay's auction format is foundational to the platform's identity and still dominant in collectibles, rare items, and unique goods.",
    valueTerritories: ['value', 'selection', 'community'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/buying/bidding'],
  },

  {
    id: 'auction-style-listings',
    valueProp: "Auction-Style Listings is eBay's alternative name for the auction format — items listed with a starting bid, an end time, and competitive bidding mechanics, where the winning buyer pays their highest bid.",
    valueTerritories: ['value', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/buying/bidding'],
  },

  {
    id: 'fixed-price-format',
    valueProp: "Fixed Price Format is the non-auction listing type on eBay where sellers set a firm price for immediate purchase — the dominant listing format by volume on the platform, offering buyers the speed and certainty of standard e-commerce.",
    valueTerritories: ['speed', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/listing-formats'],
  },

  {
    id: 'good-til-cancelled',
    valueProp: "Good 'Til Cancelled (GTC) is the default listing duration for fixed-price listings on eBay — listings automatically renew every 30 days until the item sells or the seller ends it, eliminating the need to relist unsold inventory repeatedly.",
    valueTerritories: ['convenience'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/listing-formats'],
  },

  {
    id: 'reserve-price',
    valueProp: "Reserve Price is a confidential minimum price set by a seller in an auction listing — if no bid reaches the reserve, the seller is not obligated to sell, protecting sellers from being forced to sell valuable items at too low a price.",
    valueTerritories: ['protection', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/listing-formats/reserve-price'],
  },

  {
    id: 'automatic-bidding',
    valueProp: "Automatic Bidding is eBay's proxy bidding system — buyers set their maximum bid, and eBay automatically places the minimum increment needed to keep them as the highest bidder up to their limit, so buyers don't need to watch and manually rebid.",
    valueTerritories: ['convenience', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/buying/bidding/automatic-bidding'],
  },

  {
    id: 'proxy-bidding',
    valueProp: "Proxy Bidding is eBay's automated bid management mechanism — synonymous with Automatic Bidding, where eBay bids on behalf of buyers up to their stated maximum, enabling them to win auctions without real-time monitoring.",
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/buying/bidding'],
  },

  {
    id: 'maximum-bid',
    valueProp: "Maximum Bid is the highest amount a buyer is willing to pay in an eBay auction — entered confidentially, with eBay's proxy system automatically bidding up to this amount in minimum increments against competing buyers.",
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/buying/bidding'],
  },

  {
    id: 'bid-increment',
    valueProp: "Bid Increment is the minimum amount by which each new bid must exceed the previous highest bid in an eBay auction — set on a sliding scale based on the current high bid price to ensure meaningful competitive progression.",
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/buying/bidding'],
  },

  {
    id: 'multi-variation-listing',
    valueProp: "Multi-Variation Listing enables sellers to offer multiple variants of the same item (different sizes, colors, or configurations) within a single eBay listing — simplifying inventory management and giving buyers a cleaner shopping experience without scrolling through identical duplicate listings.",
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/multi-variation-listings'],
  },

  {
    id: 'multi-variation-listings',
    valueProp: "Multi-Variation Listings is the plural/alternate label for eBay's listing format supporting multiple item variants (size, color, style) within a single listing — a core format for clothing, footwear, and electronics sellers managing variant inventory.",
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/multi-variation-listings'],
  },

  {
    id: 'private-listing',
    valueProp: "Private Listing is a listing format where buyer identities are hidden from public view — used for sensitive purchases (medical equipment, adult items, personal items) where buyers prefer their purchase not be publicly associated with their eBay username.",
    valueTerritories: ['protection', 'trust'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/listing-formats/private-listing'],
  },

  {
    id: 'schedule-listing',
    valueProp: "Schedule Listing allows sellers to create a listing in advance and set a future start time — useful for coordinating auction end times with peak buyer traffic windows or planning listing campaigns for specific dates.",
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/schedule-listing'],
  },

  // ── SEARCH & DISCOVERY ────────────────────────────────────────────────────

  {
    id: 'cassini',
    valueProp: "Cassini is eBay's internal search engine — the algorithm that ranks listings in eBay search results based on relevance signals including item specifics completeness, seller performance, listing quality, price competitiveness, and buyer behavior signals. Cassini replaced eBay's earlier Best Match algorithm and powers all eBay marketplace search.",
    valueTerritories: ['selection', 'transparency', 'value'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sch/',
    ],
  },

  {
    id: 'best-match',
    valueProp: "Best Match is eBay's default search sort order — the ranking that Cassini applies to show buyers the listings most likely to match their intent, weighted by relevance, seller performance, listing quality, and pricing relative to market.",
    valueTerritories: ['selection', 'transparency'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/buying/search/best-match'],
  },

  {
    id: 'best-match-sort',
    valueProp: "Best Match Sort is the default search results ordering on eBay — presenting listings in the order eBay's algorithm determines will be most relevant and useful to the buyer, considering both buyer intent signals and listing quality factors.",
    valueTerritories: ['selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/buying/search/best-match'],
  },

  {
    id: 'advanced-search',
    valueProp: "Advanced Search is eBay's expanded search interface — enabling buyers to apply specific filters such as location, condition, seller, price range, listing format, and keyword exclusions in a single structured search form for more precise results.",
    valueTerritories: ['convenience', 'selection', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sch/ebayadvsearch'],
  },

  {
    id: 'image-search',
    valueProp: "Image Search lets buyers search eBay by uploading a photo or pointing their camera at an item — eBay's visual AI identifies the item and returns matching listings, enabling buyers to find something they see without knowing what it's called.",
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/buying/search/image-search'],
  },

  {
    id: 'ai-snap',
    valueProp: "eBay AI Snap is eBay's camera-based visual search feature in the eBay app — buyers point their phone at any object and eBay's AI instantly identifies it and shows matching listings, making it effortless to find and buy any item they encounter in real life.",
    valueTerritories: ['convenience', 'speed', 'selection'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/buying/search/image-search'],
  },

  {
    id: 'shake-to-search',
    valueProp: "Shake to Search was an eBay mobile app feature — shaking the phone triggered a random item discovery experience, surfacing unexpected listings to inspire browsing. A playful engagement mechanic for discovery-oriented shoppers.",
    valueTerritories: ['selection', 'community'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebay.com/app'],
  },

  {
    id: 'barcode-scanner',
    valueProp: "Barcode Scanner in the eBay app enables buyers to scan a product barcode to instantly find and compare that exact item's listings on eBay — and lets sellers scan a barcode to pre-fill listing details when listing an item for sale.",
    valueTerritories: ['convenience', 'speed'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/app'],
  },

  {
    id: 'curated-lists',
    valueProp: "Curated Lists are eBay editorial collections — hand-picked groupings of items around a theme, season, or interest area surfaced to buyers as discovery content, helping shoppers explore relevant inventory beyond keyword search.",
    valueTerritories: ['selection', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/deals'],
  },

  {
    id: 'collections',
    valueProp: "Collections is eBay's social discovery feature — enabling buyers to create and share curated groups of eBay listings organized around a theme or aesthetic, combining shopping inspiration with peer-driven product curation.",
    valueTerritories: ['community', 'selection'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebay.com/collections'],
  },

  {
    id: 'recently-viewed',
    valueProp: "Recently Viewed is the personalized listing history shown to buyers — displaying items they've clicked on recently to enable easy return visits to listings they're still considering, reducing the friction of finding a viewed item again.",
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com'],
  },

  {
    id: 'similar-items',
    valueProp: "Similar Items is eBay's recommendation module on listing detail pages — surfacing comparable listings from other sellers so buyers can compare options or continue shopping if the viewed item doesn't exactly meet their needs.",
    valueTerritories: ['selection', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com'],
  },

  {
    id: 'feed',
    valueProp: "Feed is eBay's personalized shopping stream — a dynamic content feed surfacing listings, deals, and seller updates tailored to a buyer's interests, browsing history, and saved sellers, enabling passive discovery without active search.",
    valueTerritories: ['selection', 'convenience'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com'],
  },

  {
    id: 'hand-picked-collections',
    valueProp: "Hand-Picked Collections are eBay editorial item groupings curated by eBay staff or seller experts — themed sets of listings assembled for inspiration shopping, distinct from buyer-created collections.",
    valueTerritories: ['selection', 'community'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebay.com'],
  },

  // ── PAYMENT METHODS (BUYER-SIDE) ──────────────────────────────────────────

  {
    id: 'apple-pay',
    valueProp: "Apple Pay on eBay enables buyers to complete purchases using Apple Pay's biometric payment authentication — offering a frictionless one-touch checkout experience for iOS and Safari users without entering card details.",
    valueTerritories: ['convenience', 'speed', 'trust'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/buying/payment-methods'],
  },

  {
    id: 'google-pay',
    valueProp: "Google Pay on eBay allows buyers to pay using their stored Google Pay payment credentials — enabling fast checkout for Android users and Google account holders without manually entering payment information.",
    valueTerritories: ['convenience', 'speed'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/buying/payment-methods'],
  },

  {
    id: 'klarna',
    valueProp: "Klarna on eBay is a buy-now-pay-later payment option — enabling buyers to split their eBay purchase into installments or defer payment, making higher-priced items more accessible without requiring full upfront payment.",
    valueTerritories: ['convenience', 'value'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/buying/payment-methods'],
  },

  {
    id: 'venmo',
    valueProp: "Venmo on eBay is the peer-payment option available to US buyers — enabling purchases through their existing Venmo balance and bank-linked accounts, particularly appealing to younger buyers already active in the Venmo social payments ecosystem.",
    valueTerritories: ['convenience', 'community'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/buying/payment-methods'],
  },

  {
    id: 'paypal',
    valueProp: "PayPal on eBay was the dominant payment method before Managed Payments — enabling buyers to pay without sharing card details directly with sellers, establishing buyer trust through PayPal's buyer protection. Gradually phased out as eBay's direct payment infrastructure took over.",
    valueTerritories: ['trust', 'convenience'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://help.ebay.com/buyer/buying/payment-methods'],
  },

  {
    id: 'credit-card',
    valueProp: "Credit Card on eBay refers to the direct credit card payment acceptance through Managed Payments — buyers can pay with Visa, Mastercard, American Express, and Discover directly at checkout without needing a third-party wallet.",
    valueTerritories: ['convenience', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/buying/payment-methods'],
  },

  {
    id: 'debit-card',
    valueProp: "Debit Card on eBay allows buyers to pay using their bank debit card directly through Managed Payments — a direct-from-bank payment option without requiring a credit facility.",
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/buying/payment-methods'],
  },

  {
    id: 'auto-pay',
    valueProp: "Auto Pay is eBay's automated payment feature for buyers — when enabled, eBay automatically charges the buyer's default payment method when they win an auction or purchase a Buy It Now item, eliminating the separate payment step.",
    valueTerritories: ['convenience', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/buying/payment'],
  },

  {
    id: 'immediate-payment-required',
    valueProp: "Immediate Payment Required is a seller-set listing option requiring buyers to complete payment at the time of purchase — preventing unpaid items and ensuring sellers only process orders they'll be paid for, common on high-demand fixed-price items.",
    valueTerritories: ['trust', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/immediate-payment'],
  },

  // ── SEASONAL EVENTS ───────────────────────────────────────────────────────

  {
    id: 'black-friday-deals',
    valueProp: "Black Friday Deals is eBay's annual late-November shopping event — featuring thousands of time-limited discounts across all categories, eBay's highest-traffic sales event of the year timed to match the traditional US and global retail shopping peak.",
    valueTerritories: ['value', 'selection', 'speed'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['one-off'],
    citations: ['https://www.ebay.com/deals'],
  },

  {
    id: 'cyber-monday',
    valueProp: "Cyber Monday is eBay's follow-up to Black Friday — a second major deal event focused on online-first categories like electronics and tech accessories, maintaining buyer deal momentum into the week after Thanksgiving.",
    valueTerritories: ['value', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['one-off'],
    citations: ['https://www.ebay.com/deals'],
  },

  {
    id: 'green-monday',
    valueProp: "Green Monday is eBay's December deal event — historically the second Monday in December, representing one of the last high-volume online shopping days before Christmas shipping cutoffs, featuring eBay's holiday season promotions.",
    valueTerritories: ['value', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['one-off'],
    citations: ['https://www.ebay.com/deals'],
  },

  {
    id: 'back-to-school',
    valueProp: "Back to School is eBay's seasonal promotional campaign for late summer — curating deals on supplies, electronics, clothing, and dorm essentials for students and parents preparing for the academic year.",
    valueTerritories: ['value', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['one-off'],
    citations: ['https://www.ebay.com/deals'],
  },

  {
    id: 'anniversary-sale',
    valueProp: "Anniversary Sale is eBay's periodic milestone promotional event — celebrating eBay's founding anniversary with platform-wide deals and promotions that drive buyer engagement and seller participation.",
    valueTerritories: ['value', 'community'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['one-off'],
    citations: ['https://www.ebay.com'],
  },

  {
    id: 'spring-clearance',
    valueProp: "Spring Clearance is a seasonal promotional event on eBay — surfacing end-of-season discounts on winter and pre-season inventory for buyers seeking value on clearance-priced items.",
    valueTerritories: ['value'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['one-off'],
    citations: ['https://www.ebay.com/deals'],
  },

  {
    id: 'holiday-gift-guide',
    valueProp: "Holiday Gift Guide is eBay's seasonal editorial curation for the winter holidays — organized gift recommendations by recipient, price point, and interest to help buyers find presents across eBay's wide inventory.",
    valueTerritories: ['selection', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['one-off'],
    citations: ['https://www.ebay.com/deals'],
  },

  {
    id: 'fathers-day-gifts',
    valueProp: "Father's Day Gifts is eBay's seasonal gift guide and promotional campaign for Father's Day — curating recommended gifts across tools, sports, collectibles, electronics, and other categories popular with fathers.",
    valueTerritories: ['selection', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['one-off'],
    citations: ['https://www.ebay.com/deals'],
  },

  {
    id: 'mothers-day-gifts',
    valueProp: "Mother's Day Gifts is eBay's seasonal gift guide campaign — curating jewelry, fashion, home, and personalized gift recommendations ahead of Mother's Day to help buyers find meaningful presents through eBay.",
    valueTerritories: ['selection', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['one-off'],
    citations: ['https://www.ebay.com/deals'],
  },

  // ── LISTING CREATION & SELLER TOOLS ──────────────────────────────────────

  {
    id: 'quick-listing-tool',
    valueProp: "Quick Listing Tool is eBay's simplified listing creation interface — a streamlined form with fewer required fields for sellers who want to list items rapidly without the full advanced listing form's options.",
    valueTerritories: ['convenience', 'speed'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sell'],
  },

  {
    id: 'advanced-listing-tool',
    valueProp: "Advanced Listing Tool is eBay's full-featured listing creation interface — providing all available listing options including item specifics, shipping policies, returns, promotions, and listing upgrades for sellers who want maximum control over their listing configuration.",
    valueTerritories: ['convenience', 'value'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sell'],
  },

  {
    id: 'magical-listing',
    valueProp: "Magical Listing is eBay's AI-powered listing assistant — sellers photograph an item and eBay's AI auto-generates a title, category suggestion, condition assessment, and starting price from the image, dramatically reducing listing effort especially for resellers.",
    valueTerritories: ['convenience', 'speed', 'value'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['high-visibility', 'multi-market', 'long-term', 'reusable-capability'],
    citations: ['https://www.ebay.com/sell/listing-ai'],
  },

  {
    id: 'background-enhancement',
    valueProp: "Background Enhancement is eBay's AI photo tool that removes cluttered backgrounds from listing photos and replaces them with a clean white or neutral background — improving listing photo quality without requiring sellers to own a photo studio setup.",
    valueTerritories: ['convenience', 'value'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sell/listing-ai'],
  },

  {
    id: 'photo-background-removal',
    valueProp: "Photo Background Removal is eBay's AI image editing feature that automatically isolates the subject of a listing photo from its background — enabling sellers to meet eBay's clean background image standards without manual photo editing.",
    valueTerritories: ['convenience', 'value'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/photo-requirements'],
  },

  {
    id: 'photo-enhancement',
    valueProp: "Photo Enhancement refers to eBay's AI image improvement features — including background removal, lighting correction, and crop optimization — applied to seller listing photos to improve presentation quality and buyer trust.",
    valueTerritories: ['convenience', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sell/listing-ai'],
  },

  {
    id: 'augmented-reality-preview',
    valueProp: "Augmented Reality Preview is an eBay experimental feature allowing buyers to visualize how certain items (furniture, home decor) would look in their actual space using their phone's camera — reducing purchase uncertainty for high-consideration home items.",
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com'],
  },

  {
    id: 'product-video',
    valueProp: "Product Video is the eBay listing feature enabling sellers to add a short video to their listing — giving buyers a 360-degree view of the item, demonstrating its condition, or showing it in use, improving buyer confidence especially for high-value items.",
    valueTerritories: ['transparency', 'trust'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/product-video'],
  },

  {
    id: 'ebay-ai-message-assistance',
    valueProp: "eBay AI Message Assistance is eBay's AI-powered buyer communication tool — helping sellers draft responses to buyer questions using AI-generated suggestions, reducing response time and improving message quality.",
    valueTerritories: ['convenience', 'speed'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sh/msg'],
  },

  // ── BUYER-SIDE ACCOUNT FEATURES ───────────────────────────────────────────

  {
    id: 'buy-again',
    valueProp: "Buy Again is eBay's repeat purchase prompt — surfacing previously purchased items or similar listings to buyers who have bought something before, reducing the effort needed to reorder consumables or replacement items.",
    valueTerritories: ['convenience', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com'],
  },

  {
    id: 'save-for-later',
    valueProp: "Save for Later lets buyers move items from their cart to a saved list for future consideration — separating items they're ready to buy now from items they're still evaluating, useful for managing shopping decisions across multiple sessions.",
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sc/view'],
  },

  {
    id: 'follow-seller',
    valueProp: "Follow Seller lets buyers subscribe to updates from a seller they like — receiving notifications when that seller lists new items, runs promotions, or updates their store, building ongoing buyer-seller relationships beyond single transactions.",
    valueTerritories: ['community', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com'],
  },

  {
    id: 'following',
    valueProp: "Following is the buyer social action state indicating active interest tracking — a buyer who follows a seller receives their updates in their eBay feed and can view followed sellers in their My eBay dashboard.",
    valueTerritories: ['community', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com'],
  },

  {
    id: 'price-alert',
    valueProp: "Price Alert notifies buyers when a watched listing's price drops — an automated trigger that converts passive watching into active purchase prompting when the item reaches a price the buyer finds compelling.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/buying/watchlist'],
  },

  {
    id: 'price-drop-alert',
    valueProp: "Price Drop Alert is the notification buyers receive when a Watchlisted item is marked down — triggering an email or push notification to alert the buyer to act before the discount ends.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/buying/watchlist'],
  },

  {
    id: 'price-drop-alerts',
    valueProp: "Price Drop Alerts is the notification system for tracked item price reductions — buyers who watch items receive alerts when sellers reduce the price, reducing the need for manual monitoring of desired listings.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/buying/watchlist'],
  },

  {
    id: 'notify-me',
    valueProp: "Notify Me enables buyers to request back-in-stock alerts for out-of-stock or unavailable items — allowing them to be notified automatically when the item becomes available from a seller without repeatedly checking eBay.",
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com'],
  },

  // ── SPOTLIGHT & FLASH DEALS ────────────────────────────────────────────────

  {
    id: 'spotlight-deals',
    valueProp: "Spotlight Deals are featured promotional slots on eBay's homepage and deals pages — premium placement given to sellers running significant promotions, offering maximum buyer visibility for limited-time offers.",
    valueTerritories: ['value', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/deals'],
  },

  {
    id: 'flash-deals',
    valueProp: "Flash Deals are extremely short-duration promotions on eBay — deeply discounted items available for a few hours only, creating maximum urgency and driving impulse purchases from deal-seeking buyers.",
    valueTerritories: ['value', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/deals'],
  },

  {
    id: 'featured-deals',
    valueProp: "Featured Deals are curated promotional listings given prominent placement in eBay's deals section — selected from seller-submitted promotions meeting minimum discount thresholds and displayed with enhanced visibility to deal-browsing buyers.",
    valueTerritories: ['value', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/deals'],
  },

  {
    id: 'weekly-deals',
    valueProp: "Weekly Deals is eBay's rotating set of curated promotions refreshed every week — offering consistent new deal inventory that gives buyers a reason to return to eBay regularly for value-seeking discovery.",
    valueTerritories: ['value', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/deals'],
  },

  {
    id: 'mobile-deals',
    valueProp: "Mobile Deals are promotions distributed exclusively through the eBay mobile app — special discounts accessible only to app users, incentivizing buyers to install and engage with eBay's mobile experience.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/app'],
  },

  {
    id: 'brand-outlet',
    valueProp: "Brand Outlet is eBay's curated destination for brand manufacturer excess inventory and closeouts — a section where buyers can find new, brand-name items at significant discounts directly from brand-operated eBay storefronts.",
    valueTerritories: ['value', 'selection', 'trust'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/brand-outlet'],
  },

  {
    id: 'price-guide',
    valueProp: "Price Guide on eBay provides market value reference data for items in collectible categories — showing historical eBay sale prices so buyers can assess whether a listing's price reflects fair market value before purchasing.",
    valueTerritories: ['transparency', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/tradingcards/price-guide'],
  },

]
