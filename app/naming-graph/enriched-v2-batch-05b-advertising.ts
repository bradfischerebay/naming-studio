import type { NodeEnrichmentV2 } from './enriched-v2-batch-01-trust'

// Batch 5b — Advertising Sub-Products, Promotions Tools, Seller Management (legacy)
// Covers: PL Standard/Advanced/Priority/Express/General/Dashboard, Promoted Stores Custom,
// brand-funded variants, Promotions Manager, Markdown Manager, Selling Manager (legacy),
// Terapeak, Selling Coach, volume pricing, second chance offer, campaign tools

export const ADVERTISING_ENRICHMENT: NodeEnrichmentV2[] = [

  // ── PROMOTED LISTINGS VARIANTS ────────────────────────────────────────────

  {
    id: 'promoted-listings-standard',
    valueProp: "Promoted Listings Standard is eBay's flagship cost-per-sale ad format — sellers set an ad rate and pay only when a buyer clicks an ad and purchases within 30 days. It's the easiest entry point into eBay advertising, requiring no budget or bid management.",
    valueTerritories: ['value', 'transparency', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'full-funnel', 'long-term', 'reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/listings/promoted-listings/promoted-listings-standard',
      'https://advertise.ebay.com/solutions/promoted-listings-standard',
    ],
  },

  {
    id: 'promoted-listings-advanced',
    valueProp: "Promoted Listings Advanced is eBay's cost-per-click advertising product — giving sellers more control through keyword targeting, bid management, and priority placement at the top of search results, designed for sellers who want precision campaign control rather than the automated approach of Standard.",
    valueTerritories: ['value', 'transparency', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'full-funnel', 'long-term', 'reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/listings/promoted-listings/promoted-listings-advanced',
      'https://advertise.ebay.com/solutions/promoted-listings-advanced',
    ],
  },

  {
    id: 'promoted-listings-priority',
    valueProp: "Promoted Listings Priority is eBay's premium placement product providing the highest-visibility ad position in search — guaranteed top-of-page placement on a cost-per-click basis, used by brand sellers and high-volume retailers requiring maximum exposure.",
    valueTerritories: ['value', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'full-funnel', 'long-term', 'reusable-capability'],
    citations: [
      'https://advertise.ebay.com/solutions/promoted-listings-priority',
    ],
  },

  {
    id: 'promoted-listings-express',
    valueProp: "Promoted Listings Express is eBay's simplified one-click ad product for individual sellers — a streamlined advertising option for auction-format and fixed-price listings that doesn't require campaign setup, targeting decisions, or bid management.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/listings/promoted-listings/promoted-listings-express',
    ],
  },

  {
    id: 'promoted-listings-general',
    valueProp: "Promoted Listings General (General Campaign) is eBay's automated campaign type within Promoted Listings Standard — eBay automatically selects listings and ad rates to optimize for seller sales without requiring manual selection.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/listings/promoted-listings/promoted-listings-standard',
    ],
  },

  {
    id: 'promoted-listings-dashboard',
    valueProp: "Promoted Listings Dashboard is the centralized reporting and management interface within Seller Hub for all advertising campaigns — showing impressions, clicks, spend, and sales attributed to each promoted campaign in one consolidated view.",
    valueTerritories: ['transparency', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/adcenter',
    ],
  },

  {
    id: 'promoted-stores-custom',
    valueProp: "Promoted Stores Custom is a bespoke variant of eBay's Promoted Stores ad product — enabling Store subscribers to run customized store promotion campaigns with more control over targeting and placement than the standard Promoted Stores offering.",
    valueTerritories: ['value', 'selection'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/listings/promoted-listings/promoted-stores',
    ],
  },

  {
    id: 'brand-funded-promoted-listings-priority',
    valueProp: "Brand-Funded Promoted Listings Priority is an advertising variant where brand manufacturers co-fund ad spend for their authorized resellers' priority listings — allowing brands to subsidize premium search placement across their retail distribution network on eBay.",
    valueTerritories: ['value', 'selection'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://advertise.ebay.com'],
  },

  {
    id: 'brand-funded-promoted-stores',
    valueProp: "Brand-Funded Promoted Stores is a co-funded advertising format where brands sponsor storefront promotion costs for their authorized resellers — driving traffic to reseller stores while maintaining brand visibility across eBay's authorized seller network.",
    valueTerritories: ['value', 'selection'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://advertise.ebay.com'],
  },

  {
    id: 'automated-promoted-listings-campaigns',
    valueProp: "Automated Promoted Listings Campaigns is eBay's hands-off advertising mode — the platform automatically creates, manages, and optimizes Promoted Listings campaigns for a seller's inventory using machine learning, removing the need for manual campaign setup.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/promoted-listings'],
  },

  {
    id: 'promoted-to-international',
    valueProp: "Promoted to International is eBay's cross-border advertising extension — enabling sellers' Promoted Listings campaigns to automatically extend to international buyers browsing eBay's global marketplaces, broadening audience reach beyond the seller's home market.",
    valueTerritories: ['value', 'selection'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['multi-market', 'reusable-capability'],
    citations: ['https://advertise.ebay.com'],
  },

  {
    id: 'general-campaign',
    valueProp: "General Campaign is the automated campaign mode within Promoted Listings Standard — eBay's machine-learning system selects which listings to promote and at what ad rate, optimizing for the seller's sales without requiring manual configuration.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/promoted-listings'],
  },

  {
    id: 'priority-campaign',
    valueProp: "Priority Campaign is the campaign type for Promoted Listings Priority — the premium placement campaign format where sellers bid for guaranteed top-of-search ad positions through eBay's Promoted Listings platform.",
    valueTerritories: ['value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://advertise.ebay.com/solutions/promoted-listings-priority'],
  },

  {
    id: 'campaign-bidding',
    valueProp: "Campaign Bidding is the bid management mechanism within Promoted Listings Advanced — where sellers set and adjust keyword-level CPC bids to compete for ad placement position in eBay search results.",
    valueTerritories: ['value', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/promoted-listings/promoted-listings-advanced'],
  },

  {
    id: 'ad-rate-recommendation',
    valueProp: "Ad Rate Recommendation is eBay's suggested Promoted Listings Standard ad rate for a specific category or listing — calculated from competitive bidding data to help sellers choose an ad rate likely to achieve good visibility without over-spending.",
    valueTerritories: ['transparency', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/adcenter'],
  },

  {
    id: 'ad-fee',
    valueProp: "Ad Fee is the cost charged to a seller when a Promoted Listings Standard sale is attributed to their ad — calculated as the ad rate percentage of the final sale price, only triggered when the promotion results in a completed transaction.",
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/promoted-listings'],
  },

  {
    id: 'ad-attribution',
    valueProp: "Ad Attribution is eBay's methodology for crediting a sale to a Promoted Listings campaign — a click on a promoted listing that leads to a purchase within the attribution window (typically 30 days) generates an ad fee for the seller.",
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/promoted-listings'],
  },

  {
    id: 'cost-per-click',
    valueProp: "Cost-Per-Click (CPC) is the bidding model used in Promoted Listings Advanced and Priority — sellers pay a fixed amount each time a buyer clicks their promoted listing, regardless of whether a sale results, giving precise budget control.",
    valueTerritories: ['transparency', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/promoted-listings/promoted-listings-advanced'],
  },

  {
    id: 'cost-per-sale',
    valueProp: "Cost-Per-Sale (CPS) is the pricing model for Promoted Listings Standard — sellers only pay when their promoted listing generates a sale within the attribution window, making it a lower-risk entry into eBay advertising.",
    valueTerritories: ['value', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/promoted-listings/promoted-listings-standard'],
  },

  {
    id: 'keyword-targeting',
    valueProp: "Keyword Targeting is the ad targeting mechanism in Promoted Listings Advanced — sellers define specific search terms they want their listings to appear for, enabling precise audience targeting based on buyer search intent.",
    valueTerritories: ['value', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/promoted-listings/promoted-listings-advanced'],
  },

  {
    id: 'audience-targeting',
    valueProp: "Audience Targeting is the ad targeting capability for brand and display advertising on eBay — enabling advertisers to reach specific buyer segments based on shopping behavior, category affinity, and eBay account signals.",
    valueTerritories: ['value', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://advertise.ebay.com'],
  },

  {
    id: 'premium-placement',
    valueProp: "Premium Placement is the highest ad position within eBay search results — the first listing slot at the top of search, guaranteed through Promoted Listings Priority bidding and visible before organic results.",
    valueTerritories: ['value', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://advertise.ebay.com/solutions/promoted-listings-priority'],
  },

  {
    id: 'similar-sponsored-items',
    valueProp: "Similar Sponsored Items is a Promoted Listings placement unit on eBay listing pages — showing buyers ads for related items from other sellers, competing for purchase consideration on the listing detail page.",
    valueTerritories: ['selection', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/promoted-listings'],
  },

  {
    id: 'promote-your-listing',
    valueProp: "Promote Your Listing is the in-listing seller action that activates Promoted Listings for a specific item — the direct call-to-action within Seller Hub that enrolls an individual listing in an ad campaign.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/promoted-listings'],
  },

  {
    id: 'promote-similar-items',
    valueProp: "Promote Similar Items is eBay's advertising recommendation tool — suggesting other listings in a seller's inventory that are similar to one they've already promoted, helping sellers expand their ad coverage with minimal effort.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/promoted-listings'],
  },

  {
    id: 'boost-seller-engagement',
    valueProp: "Boost Buyer Engagement is an eBay marketing feature that enables sellers to target Promoted Listings ads specifically at buyers who have shown prior interest in their listings or store — a retargeting-style capability to re-engage warm audiences.",
    valueTerritories: ['value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://advertise.ebay.com'],
  },

  // ── PROMOTIONS & SELLER MARKETING TOOLS ──────────────────────────────────

  {
    id: 'promotions-manager',
    valueProp: "Promotions Manager is eBay's seller-facing marketing tool for creating and managing store-level promotions — including order discounts, sale events, coded coupons, volume pricing, and shipping discounts — enabling sellers to run structured incentive programs without needing advertising budget.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/mkt/promotions',
      'https://help.ebay.com/seller/tools/promotions-manager',
    ],
  },

  {
    id: 'markdown-manager',
    valueProp: "Markdown Manager is eBay's seller tool for creating automated sale price reductions on listings — sellers set a percentage markdown and the system automatically crosses out the original price and shows buyers the sale discount, driving urgency and conversion.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/tools/markdown-manager',
    ],
  },

  {
    id: 'discounts-manager',
    valueProp: "Discounts Manager is eBay's seller tool for creating buyer discount rules — such as order-level discounts (spend $X get Y% off), combined shipping discounts, and loyalty offers — managed through Promotions Manager.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sh/mkt/promotions'],
  },

  {
    id: 'order-discounts',
    valueProp: "Order Discounts are seller-created promotions in Promotions Manager that give buyers a discount when their order meets a spending threshold — encouraging larger basket sizes and incentivizing buyers to purchase multiple items.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/tools/promotions-manager'],
  },

  {
    id: 'sale-events',
    valueProp: "Sale Events are time-limited promotional campaigns created in Promotions Manager — sellers set a markdown percentage across a group of listings for a defined period, with sale pricing and countdown timers displayed to buyers.",
    valueTerritories: ['value', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/tools/promotions-manager'],
  },

  {
    id: 'sales-events',
    valueProp: "Sales Events is the plural form / alternate label for eBay's Sale Events feature in Promotions Manager — time-limited seller-created markdown campaigns displayed with visual sale indicators to buyers.",
    valueTerritories: ['value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/tools/promotions-manager'],
  },

  {
    id: 'volume-pricing',
    valueProp: "Volume Pricing enables sellers to offer quantity-based discounts — buyers who purchase multiple units of the same item automatically receive a lower per-unit price, encouraging bulk purchasing and helping sellers move inventory faster.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/tools/promotions-manager/volume-pricing'],
  },

  {
    id: 'coded-coupons',
    valueProp: "Coded Coupons are seller-generated discount codes created through Promotions Manager — buyers enter the code at checkout to apply a discount, enabling targeted promotions distributed via email campaigns, social media, or store newsletters.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/tools/promotions-manager'],
  },

  {
    id: 'codeless-coupons',
    valueProp: "Codeless Coupons are seller promotions where a discount automatically applies to qualifying listings at checkout without requiring buyers to enter a code — reducing friction in the promotional redemption experience.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/tools/promotions-manager'],
  },

  {
    id: 'coupons',
    valueProp: "Coupons is the general category of seller-issued promotional discount instruments on eBay — including coded and codeless coupons created through Promotions Manager and distributed to buyers to drive purchase action.",
    valueTerritories: ['value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/tools/promotions-manager'],
  },

  {
    id: 'seller-coupon',
    valueProp: "Seller Coupon is the individual discount instrument issued by a seller — a specific coupon code or automatic discount that a seller creates and distributes to buyers as part of a marketing or retention effort.",
    valueTerritories: ['value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/tools/promotions-manager'],
  },

  {
    id: 'send-coupon',
    valueProp: "Send Coupon is the Seller Hub action for distributing a seller-created coupon to specific buyers — enabling targeted discount offers to past purchasers, watchers, or interested buyers as a retention and re-engagement tool.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/tools/promotions-manager'],
  },

  {
    id: 'deals-seller-portal',
    valueProp: "Deals Seller Portal is the application interface where eligible sellers submit listings for inclusion in eBay's curated Deals programs — including eBay Deals, Daily Deals, and Spotlight Deals — requiring sellers to meet minimum discount thresholds.",
    valueTerritories: ['value', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sh/mkt'],
  },

  {
    id: 'competitive-pricing',
    valueProp: "Competitive Pricing is eBay's automated pricing tool that monitors market prices for similar items and adjusts a seller's listing price to remain competitive — helping sellers maintain the best-price position without constant manual monitoring.",
    valueTerritories: ['value', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/pricing-tools'],
  },

  {
    id: 'auto-pricing',
    valueProp: "Auto Pricing is eBay's dynamic pricing feature — automatically adjusting listing prices based on competition, demand signals, and seller-defined rules to maximize sell-through rate while protecting minimum margins.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/pricing-tools'],
  },

  {
    id: 'price-suggestions',
    valueProp: "Price Suggestions are eBay-generated recommended list prices for a seller's item — calculated from recently sold comparable items to help sellers start at a market-appropriate price that maximizes their chance of selling.",
    valueTerritories: ['transparency', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/pricing-tools'],
  },

  // ── LEGACY SELLER TOOLS ───────────────────────────────────────────────────

  {
    id: 'terapeak',
    valueProp: "Terapeak is eBay's proprietary market research tool — providing sellers with access to historical eBay sales data, average selling prices, sell-through rates, and trending search terms for any product. Acquired by eBay in 2016 and integrated into Seller Hub as the Product Research tab, it remains one of eBay's most powerful competitive intelligence tools for sellers.",
    valueTerritories: ['transparency', 'value'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'long-term', 'reusable-capability', 'inherited-M&A'],
    citations: [
      'https://www.ebay.com/sh/research/product',
      'https://help.ebay.com/seller/tools/terapeak',
    ],
  },

  {
    id: 'selling-manager',
    valueProp: "Selling Manager was eBay's original seller dashboard for managing active listings, orders, and buyer communications — the predecessor to Seller Hub. Legacy users still encounter the brand but new accounts are directed to Seller Hub.",
    valueTerritories: ['convenience', 'transparency'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://help.ebay.com/seller/tools/selling-manager'],
  },

  {
    id: 'selling-manager-pro',
    valueProp: "Selling Manager Pro was eBay's premium seller management subscription — adding bulk listing tools, inventory management, profit/loss tracking, and automation features on top of standard Selling Manager. Retired and replaced by Seller Hub.",
    valueTerritories: ['convenience', 'value', 'transparency'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://help.ebay.com/seller/tools/selling-manager'],
  },

  {
    id: 'turbo-lister',
    valueProp: "Turbo Lister was eBay's desktop bulk listing application — a downloadable Windows tool allowing sellers to create listings offline and upload them to eBay in batches. Retired in 2017 as web-based bulk tools in Seller Hub replaced the need for a desktop application.",
    valueTerritories: ['convenience'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://help.ebay.com/seller/tools/turbo-lister'],
  },

  {
    id: 'file-exchange',
    valueProp: "File Exchange was eBay's flat-file listing bulk upload system — enabling high-volume sellers to upload, revise, and manage thousands of listings through structured CSV files via a web-based file submission system. Replaced by modern Seller Hub bulk tools.",
    valueTerritories: ['convenience'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://help.ebay.com/seller/tools/file-exchange'],
  },

  {
    id: 'selling-coach',
    valueProp: "Selling Coach was eBay's in-platform guidance system — providing sellers personalized recommendations on listing improvements, pricing adjustments, and promotional opportunities based on their account data. Retired as similar recommendations were embedded into Seller Hub.",
    valueTerritories: ['transparency', 'value'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://help.ebay.com/seller/tools/selling-coach'],
  },

  {
    id: 'seller-initiated-offers',
    valueProp: "Seller Initiated Offers lets sellers proactively send discounted offer prices to buyers who are watching or have shown interest in specific listings — turning passive interest into active purchase opportunities.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/offers/seller-initiated-offers'],
  },

  {
    id: 'offers-to-buyers',
    valueProp: "Offers to Buyers is the bulk variant of Seller Initiated Offers — allowing sellers to send discounted offer prices to multiple interested buyers simultaneously rather than one at a time.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/offers/seller-initiated-offers'],
  },

  {
    id: 'offers-to-watchers',
    valueProp: "Offers to Watchers is the specific variant of Seller Initiated Offers targeting buyers who have added the seller's listing to their Watchlist — a high-intent audience most likely to convert when offered a small discount.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/offers/seller-initiated-offers'],
  },

  {
    id: 'second-chance-offer',
    valueProp: "Second Chance Offer lets sellers offer an auction item to a non-winning bidder at their maximum bid price — used when the winning buyer doesn't pay or the seller has duplicate inventory, enabling the seller to complete additional sales from the same auction.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/second-chance-offer'],
  },

  {
    id: 'private-offers',
    valueProp: "Private Offers are seller-generated personalized discount offers sent to a specific buyer — a targeted negotiation tool allowing sellers to offer a price reduction to a specific interested buyer without making that price public.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/offers'],
  },

  // ── MERCHANT INTEGRATION PLATFORM ────────────────────────────────────────

  {
    id: 'merchant-integration-platform',
    valueProp: "Merchant Integration Platform (MIP) is eBay's enterprise API and integration layer for large retailers and brands — providing standardized connection frameworks for inventory feeds, order management, and catalog data exchange between eBay and large seller systems.",
    valueTerritories: ['convenience', 'value'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term', 'reusable-capability'],
    citations: ['https://developer.ebay.com/products/merchant-integration-platform'],
  },

  {
    id: 'developer-loyalty-program',
    valueProp: "Developer Loyalty Program is eBay's recognition and rewards program for eBay Developers Program members — offering benefits, access, and incentives to developers who build active integrations and applications on the eBay developer platform.",
    valueTerritories: ['value', 'community'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['reusable-capability'],
    citations: ['https://developer.ebay.com'],
  },

  // ── SELLER COMMUNITY & SUPPORT ────────────────────────────────────────────

  {
    id: 'seller-community',
    valueProp: "Seller Community is the peer support and discussion section of eBay Community specifically for sellers — where sellers share advice, discuss policy changes, troubleshoot issues, and connect with other business owners across all selling categories.",
    valueTerritories: ['community', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://community.ebay.com/t5/Selling/ct-p/selling'],
  },

  {
    id: 'seller-clinics',
    valueProp: "Seller Clinics are live educational events hosted by eBay — online webinars or in-person sessions where eBay experts walk sellers through specific topics like listing optimization, advertising, shipping, or new platform features.",
    valueTerritories: ['community', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/academy'],
  },

  {
    id: 'seller-updates',
    valueProp: "Seller Updates are eBay's periodic official announcements to the seller community — covering upcoming policy changes, fee adjustments, new feature launches, and seasonal guidance distributed through Seller Hub and email.",
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sellercenter/news/seller-updates'],
  },

  {
    id: 'seller-newsletter',
    valueProp: "Seller Newsletter is eBay's regular email communication to sellers — covering tips, platform updates, selling opportunities, and feature spotlights to keep the seller community engaged and informed.",
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sellercenter'],
  },

  {
    id: 'export-academy',
    valueProp: "Export Academy is eBay's educational program specifically for international selling — teaching sellers how to expand their business across borders through eBay's global shipping programs, cross-border trade tools, and market-specific guidance.",
    valueTerritories: ['community', 'value', 'transparency'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term'],
    citations: ['https://www.ebay.com/academy'],
  },

  // ── SELLER PERFORMANCE ────────────────────────────────────────────────────

  {
    id: 'pro-seller-program',
    valueProp: "Pro Seller Program is an eBay initiative providing enhanced support, tools, and recognition to professional sellers who meet high-volume and performance thresholds — complementing the Top Rated Seller designation with business-growth resources.",
    valueTerritories: ['value', 'transparency'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://help.ebay.com/seller/seller-levels'],
  },

  {
    id: 'pro-trader-program',
    valueProp: "Pro Trader Program is eBay's designation program for high-performing professional traders in certain international markets — providing tools, recognition, and support to sellers who operate at a business scale above standard marketplace sellers.",
    valueTerritories: ['value', 'trust'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://help.ebay.com/seller/seller-levels'],
  },

  {
    id: 'top-rated-plus',
    valueProp: "Top Rated Plus is a badge applied to individual listings from Top Rated Sellers that meet additional criteria — specifically offering same/one-day handling and 30-day free returns. The badge appears on qualifying listings in search results to signal the highest level of service to buyers.",
    valueTerritories: ['trust', 'speed', 'convenience'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/seller-levels/top-rated-seller'],
  },

  {
    id: 'selling-with-ai',
    valueProp: "Selling with AI is eBay's umbrella brand for AI-powered seller tools — encompassing Magical Listing (AI-generated listing content from photos), AI-assisted pricing, background enhancement, and description generation that reduce the effort required to list and sell effectively.",
    valueTerritories: ['convenience', 'value', 'speed'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['high-visibility', 'multi-market', 'long-term', 'reusable-capability'],
    citations: ['https://www.ebay.com/sell/listing-ai'],
  },

  {
    id: 'new-seller-journey',
    valueProp: "New Seller Journey is eBay's onboarding experience for first-time sellers — a guided flow that walks new sellers through account setup, first listing creation, shipping configuration, and payment setup to reduce friction in getting started on the platform.",
    valueTerritories: ['convenience', 'transparency'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sell'],
  },

  {
    id: 'cbt-seller-dashboard',
    valueProp: "CBT Seller Dashboard (Cross-Border Trade) is the analytics and management interface for sellers engaged in international selling — tracking their cross-border sales performance, international buyer metrics, and global shipping program usage.",
    valueTerritories: ['transparency', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/shipping/international'],
  },

  {
    id: 'international-site-visibility',
    valueProp: "International Site Visibility is an eBay listing upgrade that extends a seller's listing to be visible and searchable on eBay's international marketplace sites — increasing exposure across countries beyond the seller's home market.",
    valueTerritories: ['selection', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/listing-upgrades'],
  },

]
