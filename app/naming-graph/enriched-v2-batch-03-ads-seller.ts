import type { NodeEnrichmentV2 } from './enriched-v2-batch-01-trust'

// Batch 3 — Advertising & Seller Tools (83 unique nodes)
// Cluster: ebay-advertising, seller-hub, ebay-stores, promotions, analytics, listing management
// Sources: help.ebay.com, advertise.ebay.com, seller hub documentation

export const ADS_SELLER_ENRICHMENT: NodeEnrichmentV2[] = [

  // ── ADVERTISING PLATFORM ──────────────────────────────────────────────────

  {
    id: 'ebay-advertising',
    valueProp: "eBay Advertising is eBay's owned ad network — a suite of seller and brand advertising products that connects businesses with high-intent shoppers across the world's largest pure-play marketplace. From cost-per-sale promoted listings to brand-funded display campaigns, it gives sellers and brands measurable, commerce-native reach.",
    valueTerritories: ['value', 'transparency', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'full-funnel', 'long-term', 'reusable-capability'],
    citations: [
      'https://advertise.ebay.com',
      'https://www.ebay.com/adcenter',
      'https://help.ebay.com/seller/listings/promoted-listings',
    ],
  },

  {
    id: 'promoted-listings',
    valueProp: "Promoted Listings is eBay's flagship seller advertising product — a cost-per-sale model where listings gain premium search placement and sellers pay only when a promoted item sells within 30 days of an ad click. It's the most accessible and widely adopted ad product for individual sellers and small businesses on eBay.",
    valueTerritories: ['value', 'transparency', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'full-funnel', 'long-term', 'reusable-capability'],
    citations: [
      'https://www.ebay.com/adcenter',
      'https://help.ebay.com/seller/listings/promoted-listings',
      'https://advertise.ebay.com/solutions/promoted-listings',
    ],
  },

  {
    id: 'promoted-offsite',
    valueProp: "Promoted Offsite extends eBay seller listings to external publisher networks on a cost-per-click basis, reaching shoppers browsing beyond eBay and driving incremental traffic back to listings — widening the funnel beyond marketplace search.",
    valueTerritories: ['value', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'full-funnel', 'long-term', 'reusable-capability'],
    citations: [
      'https://advertise.ebay.com',
      'https://help.ebay.com/seller/listings/promoted-listings/offsite-ads',
    ],
  },

  {
    id: 'offsite-ads',
    valueProp: "Offsite Ads places eBay seller listings on external web properties and ad networks, extending reach beyond the marketplace to capture shoppers earlier in their purchase journey and bring them directly to a seller's eBay listing.",
    valueTerritories: ['value', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'full-funnel', 'long-term', 'reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/listings/promoted-listings/offsite-ads',
      'https://advertise.ebay.com',
    ],
  },

  {
    id: 'promoted-stores',
    valueProp: "Promoted Stores lets eBay Store subscribers advertise their full storefront across the eBay platform — driving traffic to their branded store and growing their buyer base beyond individual listing placements.",
    valueTerritories: ['value', 'selection', 'convenience'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/listings/promoted-listings/promoted-stores',
      'https://www.ebay.com/adcenter',
    ],
  },

  {
    id: 'promoted-brand',
    valueProp: "Promoted Brand is eBay's premium advertising format for brand advertisers — enabling companies to showcase their products and brand identity with high-visibility placements across the eBay marketplace, beyond what individual listing ads can achieve.",
    valueTerritories: ['value', 'selection', 'transparency'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'full-funnel', 'long-term'],
    citations: [
      'https://advertise.ebay.com',
    ],
  },

  {
    id: 'managed-display',
    valueProp: "Managed Display is eBay's concierge advertising solution where eBay's advertising team handles campaign setup, targeting, and optimization for brand advertisers — delivering display ads across the eBay ecosystem with managed performance.",
    valueTerritories: ['value', 'selection', 'convenience'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'full-funnel', 'long-term'],
    citations: [
      'https://advertise.ebay.com',
    ],
  },

  {
    id: 'ai-banner',
    valueProp: "AI Banner is an AI-generated display ad format within eBay's advertising platform that automatically creates contextually relevant banner creatives to promote seller items — reducing the creative burden on advertisers.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://advertise.ebay.com',
    ],
  },

  {
    id: 'featured-first',
    valueProp: "Featured First is the promoted placement status indicating a listing has been boosted to the top of search results via Promoted Listings Standard — the visible outcome of a successful ad impression for buyers, and confirmation of campaign activity for sellers.",
    valueTerritories: ['value', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/listings/promoted-listings',
    ],
  },

  // ── SELLER HUB ────────────────────────────────────────────────────────────

  {
    id: 'seller-hub',
    valueProp: "Seller Hub is eBay's all-in-one seller management platform — a unified dashboard where sellers monitor listings, orders, analytics, promotions, and account health in a single workspace. It replaced the older Selling Manager Pro and is the central operating system for every eBay seller.",
    valueTerritories: ['convenience', 'transparency', 'value'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'full-funnel', 'long-term', 'reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/landing',
      'https://help.ebay.com/seller/tools/seller-hub',
    ],
  },

  {
    id: 'seller-hub-tasks',
    valueProp: "Seller Hub Tasks surfaces prioritized to-do actions for sellers — including responding to buyer messages, printing shipping labels, and relisting ended items — keeping daily operations visible and actionable from the hub homepage.",
    valueTerritories: ['convenience', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/landing',
    ],
  },

  {
    id: 'seller-hub-reports',
    valueProp: "Seller Hub Reports is the unified reporting center within Seller Hub — consolidating sales data, traffic analytics, financial transactions, and tax documents in one place for comprehensive business tracking.",
    valueTerritories: ['transparency', 'convenience', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/reports',
    ],
  },

  {
    id: 'mobile-seller-hub',
    valueProp: "Mobile Seller Hub is the smartphone-optimized interface for eBay Seller Hub, giving sellers the ability to manage listings, orders, messages, and key metrics from their mobile device without losing core functionality.",
    valueTerritories: ['convenience', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/landing',
    ],
  },

  {
    id: 'seller-news',
    valueProp: "Seller News is eBay's official seller communications channel — delivering policy announcements, fee changes, platform updates, and seasonal selling tips directly in Seller Hub so sellers stay informed without searching for updates.",
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/landing',
    ],
  },

  {
    id: 'selling-preferences',
    valueProp: "Selling Preferences is the account-level settings area where sellers configure defaults for listings, buyer requirements, return policies, and communication settings — defining how their business operates across all listings.",
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/settings',
    ],
  },

  {
    id: 'selling-activity-notifications',
    valueProp: "Selling Activity Notifications are real-time alerts sent to sellers when key account events occur — such as a new sale, Best Offer received, return request, or payment — keeping sellers responsive without needing to check Seller Hub constantly.",
    valueTerritories: ['convenience', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/settings/notifications',
    ],
  },

  {
    id: 'selling-notifications',
    valueProp: "Selling Notifications are configurable push and email alerts for seller account activity — including new orders, buyer messages, payment confirmations, and shipping deadline reminders.",
    valueTerritories: ['convenience', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/settings/notifications',
    ],
  },

  {
    id: 'time-away',
    valueProp: "Time Away lets sellers temporarily suspend their eBay store and listing visibility when they're unavailable — such as during vacation — preventing new orders while preserving their listing history and performance metrics.",
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/account/time-away',
    ],
  },

  {
    id: 'buyer-messages',
    valueProp: "Buyer Messages is the Seller Hub inbox for all buyer-to-seller communications — enabling sellers to respond to pre-sale questions and post-sale inquiries in one centralized location, with response time tracked as an account health metric.",
    valueTerritories: ['convenience', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/msg',
    ],
  },

  {
    id: 'review-offers',
    valueProp: "Review Offers is the Seller Hub feature for managing incoming Best Offer bids — showing all pending buyer offers in one view with one-click accept, decline, or counter-offer actions.",
    valueTerritories: ['convenience', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/off',
    ],
  },

  {
    id: 'block-buyer-list',
    valueProp: "Block Buyer List allows sellers to prevent specific buyers from purchasing their listings — protecting sellers from problematic buyers or repeated policy violations, with blocked buyers unable to bid or buy any of the seller's items.",
    valueTerritories: ['protection', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/account/buyer-requirements',
    ],
  },

  {
    id: 'fee-illustrator',
    valueProp: "Fee Illustrator is an eBay calculator that estimates the total fees a seller will pay on a given sale — including insertion fees, final value fees, and payment processing — helping sellers set profitable prices before listing.",
    valueTerritories: ['transparency', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/tools',
    ],
  },

  // ── EBAY STORES ───────────────────────────────────────────────────────────

  {
    id: 'ebay-stores',
    valueProp: "eBay Stores is a subscription program that gives sellers a branded storefront on eBay with reduced insertion fees, dedicated marketing tools, and custom store categories — enabling sellers to build a distinct business presence and retain buyers beyond individual listings.",
    valueTerritories: ['value', 'convenience', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'full-funnel', 'long-term', 'reusable-capability'],
    citations: [
      'https://www.ebay.com/stores',
      'https://help.ebay.com/seller/stores/ebay-stores',
      'https://www.ebay.com/help/selling/listings/selling-buy-now/subscribing-ebay-store',
    ],
  },

  {
    id: 'ebay-stores-basic',
    valueProp: "eBay Stores Basic is an entry-level regional variant of the eBay Stores subscription offered in specific markets, providing insertion fee savings and branded storefront access at a lower monthly cost for sellers beginning their store journey.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://www.ebay.com/help/selling/listings/selling-buy-now/subscribing-ebay-store',
    ],
  },

  {
    id: 'ebay-stores-premium',
    valueProp: "eBay Stores Premium is a higher-tier regional eBay Stores subscription variant with more zero insertion fee listings and expanded marketing features for established selling businesses in select markets.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://www.ebay.com/help/selling/listings/selling-buy-now/subscribing-ebay-store',
    ],
  },

  {
    id: 'ebay-stores-enterprise',
    valueProp: "eBay Stores Enterprise is the top regional eBay Stores subscription tier, built for enterprise-scale sellers requiring the highest volume of zero insertion fee listings and comprehensive seller tools in select markets.",
    valueTerritories: ['value', 'convenience', 'transparency'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://www.ebay.com/help/selling/listings/selling-buy-now/subscribing-ebay-store',
    ],
  },

  {
    id: 'store-tier-starter',
    valueProp: "Stores Starter is the most affordable eBay Stores subscription tier, offering basic insertion fee benefits and a branded storefront for occasional and small-volume sellers exploring eBay Store features.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://www.ebay.com/help/selling/listings/selling-buy-now/subscribing-ebay-store',
    ],
  },

  {
    id: 'store-tier-basic',
    valueProp: "Stores Basic is the entry-level paid eBay Stores subscription tier — unlocking insertion fee discounts and branded storefront features for growing sellers at an accessible monthly rate.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://www.ebay.com/help/selling/listings/selling-buy-now/subscribing-ebay-store',
    ],
  },

  {
    id: 'store-tier-featured',
    valueProp: "Stores Featured is a mid-level eBay Stores subscription tier with expanded zero insertion fee listings, a branded storefront, and enhanced promotional tools for established sellers with growing inventory.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://www.ebay.com/help/selling/listings/selling-buy-now/subscribing-ebay-store',
    ],
  },

  {
    id: 'store-tier-premium',
    valueProp: "Stores Premium is a higher eBay Stores subscription tier offering expanded insertion fee savings and full access to store marketing tools, designed for volume sellers seeking greater market exposure.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://www.ebay.com/help/selling/listings/selling-buy-now/subscribing-ebay-store',
    ],
  },

  {
    id: 'store-tier-premium-plus',
    valueProp: "Stores Premium Plus is an elevated eBay Stores subscription tier with extended insertion fee benefits and the full marketing toolkit, serving established high-volume businesses in markets where this tier is offered.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://www.ebay.com/help/selling/listings/selling-buy-now/subscribing-ebay-store',
    ],
  },

  {
    id: 'store-tier-anchor',
    valueProp: "Stores Anchor is the largest US-market eBay Stores subscription tier, offering the highest volume of zero insertion fee listings per month plus access to dedicated customer service — built for very high-volume professional sellers.",
    valueTerritories: ['value', 'convenience', 'transparency'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://www.ebay.com/help/selling/listings/selling-buy-now/subscribing-ebay-store',
    ],
  },

  {
    id: 'store-tier-enterprise',
    valueProp: "Stores Enterprise is the highest eBay Stores subscription tier in markets where it exists, designed for enterprise-scale operations requiring the maximum allocation of discounted listings and the full breadth of seller tools.",
    valueTerritories: ['value', 'convenience', 'transparency'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://www.ebay.com/help/selling/listings/selling-buy-now/subscribing-ebay-store',
    ],
  },

  {
    id: 'store-tier-platin',
    valueProp: "Stores Platin is the top-tier eBay Shops subscription in Germany (Platin-Shop), offering the highest insertion fee savings and maximum store features for professional German marketplace sellers.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['long-term', 'reusable-capability'],
    citations: [
      'https://help.ebay.de/seller/stores/ebay-shops',
    ],
  },

  // ── STORE FEATURES ────────────────────────────────────────────────────────

  {
    id: 'store-categories',
    valueProp: "Store Categories are custom organizational sections that eBay Store subscribers define to help buyers browse their inventory by type, brand, or any grouping — creating a more navigable, retailer-like shopping experience within an eBay storefront.",
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/stores/customizing-your-store',
    ],
  },

  {
    id: 'store-header',
    valueProp: "Store Header is the branded banner at the top of an eBay Store that sellers customize with their logo, store name, and featured categories — establishing a consistent visual identity for their storefront.",
    valueTerritories: ['convenience', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/stores/customizing-your-store',
    ],
  },

  {
    id: 'store-email-campaigns',
    valueProp: "Store Email Campaigns let eBay Store subscribers send promotional emails to opted-in buyers, enabling sellers to announce new listings, run exclusive offers, and drive repeat purchases directly to their customer base.",
    valueTerritories: ['convenience', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/stores/marketing-your-store',
    ],
  },

  {
    id: 'store-newsletters',
    valueProp: "Store Newsletters enable eBay Store owners to send regular email communications to saved buyers — keeping their audience engaged and informed about new inventory, promotions, and store updates.",
    valueTerritories: ['convenience', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/stores/marketing-your-store',
    ],
  },

  {
    id: 'store-promotions-box',
    valueProp: "Store Promotions Box is a configurable content module on an eBay Store page that surfaces active promotions, sale events, or featured items — driving buyer attention to special offers within the storefront.",
    valueTerritories: ['convenience', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/stores/customizing-your-store',
    ],
  },

  // ── LISTING MANAGEMENT STATES ─────────────────────────────────────────────

  {
    id: 'active-listings',
    valueProp: "Active Listings is the Seller Hub view showing all items currently live and available for purchase on eBay — giving sellers a real-time snapshot of their published inventory.",
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/lst/active',
    ],
  },

  {
    id: 'inactive-listings',
    valueProp: "Inactive Listings displays all listings that have been paused, suspended, or manually ended — helping sellers identify inventory to reactivate, delete, or reprice.",
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/lst/inactive',
    ],
  },

  {
    id: 'draft-listings',
    valueProp: "Draft Listings is the Seller Hub workspace for listings that have been started but not yet published — allowing sellers to save their work in progress and complete the listing at any time.",
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/lst/drafts',
    ],
  },

  {
    id: 'drafts',
    valueProp: "Drafts is the Seller Hub view showing all incomplete listings saved for later publishing — supporting sellers who build listings across multiple sessions before going live.",
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/lst/drafts',
    ],
  },

  {
    id: 'ended-listings',
    valueProp: "Ended Listings shows all listings that have reached their scheduled end date without a sale — enabling sellers to relist, adjust pricing, or remove inventory that didn't convert.",
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/lst/ended',
    ],
  },

  {
    id: 'completed-listings',
    valueProp: "Completed Listings shows the history of all listings that have ended — whether sold or unsold — giving sellers a complete record of past sales activity and pricing history useful for research.",
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/lst',
    ],
  },

  {
    id: 'unsold-listings',
    valueProp: "Unsold Listings filters ended inventory to show only items that did not sell — helping sellers identify what needs repricing, better photos, improved descriptions, or removal from inventory.",
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/lst',
    ],
  },

  {
    id: 'sold-listings',
    valueProp: "Sold Listings is the Seller Hub view showing all items that have successfully sold — providing sellers a record of completed transactions and linking through to order management.",
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/ord',
    ],
  },

  {
    id: 'awaiting-shipment',
    valueProp: "Awaiting Shipment is the Seller Hub order queue showing all paid orders that haven't yet been shipped — helping sellers prioritize fulfillment, print labels, and avoid late shipment defects that affect account standing.",
    valueTerritories: ['convenience', 'transparency', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/ord',
    ],
  },

  // ── BULK LISTING TOOLS ────────────────────────────────────────────────────

  {
    id: 'bulk-listing-tools',
    valueProp: "Bulk Listing Tools enable sellers to create, edit, relist, or end multiple listings simultaneously — dramatically reducing the time and effort required to manage large inventories on eBay.",
    valueTerritories: ['convenience', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/tools/seller-hub/bulk-listing-tools',
      'https://www.ebay.com/sh/lst',
    ],
  },

  {
    id: 'bulk-upload',
    valueProp: "Bulk Upload allows sellers to import many listings at once through file upload, enabling mass listing creation for high-volume sellers without entering each item manually in the listing form.",
    valueTerritories: ['convenience', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/tools/seller-hub/bulk-listing-tools',
    ],
  },

  {
    id: 'csv-upload',
    valueProp: "CSV Upload is the file-based import mechanism within Seller Hub for creating or updating listings in bulk via a formatted comma-separated values file — the most common data format used by sellers with existing inventory systems.",
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/tools/seller-hub/bulk-listing-tools',
    ],
  },

  {
    id: 'magical-bulk-listing-tool',
    valueProp: "Magical Listing is eBay's AI-powered listing tool that uses image recognition and generative AI to auto-populate title, category, condition, and suggested price from a photo — dramatically reducing the time needed to list items, especially for resellers managing large volumes.",
    valueTerritories: ['convenience', 'value', 'speed'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://www.ebay.com/sell/listing-ai',
      'https://help.ebay.com/seller/tools/magical-listing',
    ],
  },

  // ── INVENTORY & LISTING TOOLS ─────────────────────────────────────────────

  {
    id: 'inventory-management',
    valueProp: "Inventory Management in Seller Hub gives sellers real-time visibility and control over available stock, out-of-stock items, and listing quantities — preventing overselling and helping sellers keep their catalog accurate.",
    valueTerritories: ['convenience', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/lst',
    ],
  },

  {
    id: 'quantity-available',
    valueProp: "Quantity Available displays the current stock count for a listing — visible to buyers to signal scarcity or abundance, and used by sellers to track remaining inventory against active orders.",
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/listings/listing-formats',
    ],
  },

  {
    id: 'stock-quantity',
    valueProp: "Stock Quantity is the seller-defined count of available units for a given listing — used to track inventory levels, trigger out-of-stock status automatically, and prevent buyers from purchasing more than a seller has in hand.",
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/listings/listing-formats',
    ],
  },

  {
    id: 'listing-enhancement',
    valueProp: "Listing Enhancement refers to paid listing upgrades — bold title, subtitle, gallery plus, and featured placement — that increase a listing's visual prominence or search visibility for a fixed fee, used by sellers to differentiate high-value items.",
    valueTerritories: ['value', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/listings/listing-upgrades',
    ],
  },

  {
    id: 'gallery',
    valueProp: "Gallery is the image-grid search results view where listing photos are the primary visual element — the default browse experience for most eBay shoppers and the context in which listing quality most directly influences click-through.",
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/listings/listing-upgrades',
    ],
  },

  // ── ANALYTICS & RESEARCH ──────────────────────────────────────────────────

  {
    id: 'product-research',
    valueProp: "Product Research in Seller Hub (powered by Terapeak data) gives sellers access to real eBay sales history — including average selling prices, sell-through rates, and demand trends — to inform smarter sourcing, pricing, and listing decisions.",
    valueTerritories: ['transparency', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/research/product',
      'https://help.ebay.com/seller/tools/terapeak',
    ],
  },

  {
    id: 'listing-analytics',
    valueProp: "Listing Analytics provides performance data at the individual listing level — including impressions, page views, click-through rate, and conversion — helping sellers identify top performers and diagnose underperforming inventory.",
    valueTerritories: ['transparency', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/research',
    ],
  },

  {
    id: 'listing-quality-report',
    valueProp: "Listing Quality Report gives sellers a data-driven assessment of how their listings compare to top search performers, highlighting gaps in item specifics, photo quality, and pricing to help improve search rank and conversion.",
    valueTerritories: ['transparency', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/research',
    ],
  },

  {
    id: 'mobile-analytics',
    valueProp: "Mobile Analytics provides key seller performance metrics and sales trends optimized for smartphone display — allowing sellers to check on their business without needing a desktop session.",
    valueTerritories: ['convenience', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/research',
    ],
  },

  {
    id: 'performance-dashboard',
    valueProp: "Performance Dashboard gives sellers a real-time view of their account health metrics — late shipment rate, transaction defect rate, and buyer satisfaction scores — so they can proactively address issues before they affect seller level standing.",
    valueTerritories: ['transparency', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/perf',
    ],
  },

  {
    id: 'search-standing-dashboard',
    valueProp: "Search Standing Dashboard shows sellers where their account ranks in eBay search relative to category peers — surfacing factors like item specifics completeness, seller performance, and listing quality that influence overall search visibility.",
    valueTerritories: ['transparency', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/research',
    ],
  },

  // ── ANALYTICS METRICS ─────────────────────────────────────────────────────

  {
    id: 'impressions',
    valueProp: "Impressions counts how many times a listing appeared in search results or browse pages — the top-of-funnel visibility metric that indicates how often a seller's item is being surfaced to potential buyers.",
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/research',
    ],
  },

  {
    id: 'click-through-rate',
    valueProp: "Click-Through Rate (CTR) is the percentage of listing impressions that result in a click — a measure of how compelling a listing's title, image, and price are at converting search exposure into actual buyer interest.",
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/research',
    ],
  },

  {
    id: 'bounce-rate',
    valueProp: "Bounce Rate measures the percentage of listing views where buyers leave without taking any further action — a signal that listing content, pricing, or trust signals may not be meeting buyer expectations.",
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/research',
    ],
  },

  {
    id: 'conversion-rate',
    valueProp: "Conversion Rate is the percentage of listing views that result in a completed sale — one of the most critical metrics for evaluating how effectively a listing is turning browser interest into actual purchases.",
    valueTerritories: ['transparency', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/research',
    ],
  },

  {
    id: 'sales-conversion-rate',
    valueProp: "Sales Conversion Rate is the ratio of orders completed to total listing views — a direct measure of how effectively a seller's listings convert browsers into buyers, useful for benchmarking against category averages.",
    valueTerritories: ['transparency', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/research',
    ],
  },

  {
    id: 'page-views',
    valueProp: "Page Views tracks total buyer visits to a listing's detail page — an indicator of traffic volume and buyer interest that sits between impressions (seen in search) and purchases (converted).",
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/research',
    ],
  },

  {
    id: 'session-duration',
    valueProp: "Session Duration measures how long buyers spend on a seller's listing or store pages — an engagement quality signal indicating whether buyers are reading listings carefully or bouncing quickly.",
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/research',
    ],
  },

  {
    id: 'sell-through-rate',
    valueProp: "Sell-Through Rate measures the percentage of available inventory that sold within a given period — helping sellers gauge demand strength and decide whether to source more, reprice, or discontinue a product.",
    valueTerritories: ['transparency', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/research',
    ],
  },

  {
    id: 'unique-visitors',
    valueProp: "Unique Visitors counts distinct buyers who visited a seller's store or listings within a time period — distinguishing true reach from repeat traffic and helping sellers understand how many different shoppers their business is attracting.",
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/research',
    ],
  },

  {
    id: 'visitor-count',
    valueProp: "Visitor Count is the total number of individual visitor sessions recorded on a seller's store or listings — a raw traffic metric used to gauge the overall reach of a seller's eBay presence.",
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/research',
    ],
  },

  {
    id: 'visits',
    valueProp: "Visits counts all sessions recorded on a seller's listings or store pages within a given time window — providing a broad traffic volume metric for evaluating campaign and seasonal performance.",
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/research',
    ],
  },

  {
    id: 'watch-count',
    valueProp: "Watch Count shows how many buyers have saved a listing to their Watchlist — a leading demand indicator that can signal pending purchase intent before a sale occurs, useful for gauging listing desirability.",
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/research',
    ],
  },

  // ── REPORTS ───────────────────────────────────────────────────────────────

  {
    id: 'sales-report',
    valueProp: "Sales Report summarizes a seller's sales activity over a chosen time period — including total orders, revenue, and category breakdown — enabling sellers to track business performance and identify seasonal trends.",
    valueTerritories: ['transparency', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/reports',
    ],
  },

  {
    id: 'sales-reports',
    valueProp: "Sales Reports is the Seller Hub reporting section for viewing and downloading historical sales data — covering revenues, order volumes, and category performance across any time range.",
    valueTerritories: ['transparency', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/reports',
    ],
  },

  {
    id: 'sales-reports-plus',
    valueProp: "Sales Reports Plus was eBay's enhanced seller reporting product offering more detailed sales breakdowns, category-level analysis, and buyer behavior data than the standard Sales Report — a now-legacy branded tool superseded by Seller Hub analytics.",
    valueTerritories: ['transparency', 'value'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['legacy-residue', 'lifecycle-managed'],
    citations: [
      'https://help.ebay.com/seller/tools/seller-hub/reports',
    ],
  },

  {
    id: 'order-report',
    valueProp: "Order Report provides sellers with a detailed log of all orders — including buyer info, item details, payment status, and shipping data — exportable for accounting, fulfilment integration, and record-keeping.",
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/reports',
    ],
  },

  {
    id: 'transaction-report',
    valueProp: "Transaction Report gives sellers a complete financial record — all sales revenue, platform fees, refunds, and payouts — exportable for bookkeeping, tax preparation, and reconciliation with external accounting software.",
    valueTerritories: ['transparency', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/reports',
    ],
  },

  {
    id: 'traffic-report',
    valueProp: "Traffic Report shows how buyers are discovering a seller's listings — through search, browse, external links, or eBay promotions — helping sellers evaluate which acquisition channels are driving the most qualified traffic.",
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/research',
    ],
  },

  {
    id: 'traffic-reports',
    valueProp: "Traffic Reports is the Seller Hub section for tracking buyer traffic sources and session volume over time — helping sellers understand how shoppers are finding their items and measure the impact of marketing efforts.",
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/research',
    ],
  },

  // ── SELLER PROGRAMS ───────────────────────────────────────────────────────

  {
    id: 'proseller-growth-program',
    valueProp: "ProSeller Growth Program is eBay's premium seller designation in select international markets — offering dedicated account management, advanced tools, priority support, and exclusive benefits to high-volume professional sellers who meet performance thresholds.",
    valueTerritories: ['value', 'convenience', 'transparency'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term', 'reusable-capability', 'lifecycle-managed'],
    citations: [
      'https://help.ebay.com/seller/seller-levels',
    ],
  },

]
