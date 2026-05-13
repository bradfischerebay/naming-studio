import type { NodeEnrichmentV2 } from './enriched-v2-batch-01-trust'

// Batch 4 — Category Verticals, V2 Canonical Parents & Taxonomy Nodes (86 unique nodes)
// Cluster: eBay vertical categories, regional markets, eBay Motors features, internal taxonomy parents
// Note: ebay-stores (in batch 3), business-industrial (dup), ebay-motors (dup) skipped here

export const CATEGORIES_ENRICHMENT: NodeEnrichmentV2[] = [

  // ── MASTERBRAND ───────────────────────────────────────────────────────────

  {
    id: 'ebay',
    valueProp: "eBay is the world's largest pure-play marketplace — connecting buyers and sellers of new, used, refurbished, collectible, and one-of-a-kind items across 190 markets. Founded in 1995, it is the original consumer-to-consumer online marketplace and remains one of the most recognized commerce brands globally.",
    valueTerritories: ['selection', 'value', 'trust', 'community'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'full-funnel', 'long-term'],
    citations: [
      'https://www.ebay.com',
      'https://www.ebayinc.com/company/',
    ],
  },

  // ── V2 CANONICAL VERTICAL NODES ───────────────────────────────────────────

  {
    id: 'ebay-motors',
    valueProp: "eBay Motors is eBay's dedicated automotive marketplace — the largest vehicle marketplace in the US by listing volume, offering cars, trucks, motorcycles, parts, and accessories from dealers and private sellers. It operates as a branded destination with dedicated search, fitment tools, and buyer protection tailored to vehicle transactions.",
    valueTerritories: ['selection', 'value', 'trust', 'transparency'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'full-funnel', 'long-term', 'reusable-capability'],
    citations: [
      'https://www.ebay.com/motors',
      'https://help.ebay.com/buyer/buying/buying-cars-other-vehicles',
    ],
  },

  {
    id: 'collectibles-trading',
    valueProp: "Collectibles & Trading is eBay's category cluster for trading cards, sports memorabilia, coins, stamps, and collectibles — a top-growth vertical where eBay has established dedicated authentication, grading integration, and price guide tools for enthusiast buyers and professional sellers.",
    valueTerritories: ['selection', 'trust', 'transparency', 'community'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['high-visibility', 'multi-market', 'long-term'],
    citations: [
      'https://www.ebay.com/b/Trading-Cards/183050',
      'https://www.ebay.com/b/Sports-Memorabilia/1',
    ],
  },

  {
    id: 'fashion-luxury',
    valueProp: "Fashion & Luxury is eBay's category cluster for clothing, accessories, footwear, and luxury goods — a high-growth vertical anchored by Authenticity Guarantee on handbags, sneakers, watches, and jewelry, and complemented by the Pre-Loved Partner Program for certified resellers.",
    valueTerritories: ['selection', 'trust', 'protection'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['high-visibility', 'multi-market', 'long-term'],
    citations: [
      'https://www.ebay.com/b/Clothing-Shoes-Accessories/11450',
    ],
  },

  {
    id: 'refurbished-open-box',
    valueProp: "Refurbished & Open Box is eBay's category cluster for certified refurbished, seller refurbished, and open-box electronics and goods — organized under eBay Refurbished branding with graded condition tiers (Excellent, Very Good, Good) and eBay-backed warranties.",
    valueTerritories: ['value', 'trust', 'transparency', 'protection'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['high-visibility', 'multi-market', 'long-term'],
    citations: [
      'https://www.ebay.com/deals/refurbished',
    ],
  },

  {
    id: 'electronics-technology',
    valueProp: "Electronics & Technology is eBay's largest category cluster by GMV — spanning consumer electronics, computers, mobile phones, gaming, and tech accessories, with competitive pricing often beating traditional retail for both new and used inventory.",
    valueTerritories: ['value', 'selection', 'transparency'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['high-visibility', 'multi-market', 'long-term'],
    citations: [
      'https://www.ebay.com/b/Electronics/625',
    ],
  },

  {
    id: 'home-garden',
    valueProp: "Home & Garden is eBay's category cluster for furniture, decor, appliances, tools, and outdoor products — a broad inventory category that benefits from eBay's selection depth and competitive seller pricing compared to big-box retailers.",
    valueTerritories: ['selection', 'value'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['multi-market', 'long-term'],
    citations: [
      'https://www.ebay.com/b/Home-Garden/11700',
    ],
  },

  {
    id: 'business-industrial',
    valueProp: "Business & Industrial is eBay's category cluster for heavy equipment, industrial machinery, medical equipment, and B2B inventory — a unique eBay strength where hard-to-find business equipment is sourced globally by buyers who can't find it through traditional channels.",
    valueTerritories: ['selection', 'value'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['multi-market', 'long-term'],
    citations: [
      'https://www.ebay.com/b/Business-Industrial/12576',
    ],
  },

  {
    id: 'everything-else',
    valueProp: "Everything Else is eBay's catch-all category for items that don't fit neatly into standard categories — reflecting eBay's original marketplace identity as a place to find unusual, rare, and one-of-a-kind items not available anywhere else.",
    valueTerritories: ['selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['long-term'],
    citations: [
      'https://www.ebay.com/b/Everything-Else/99',
    ],
  },

  {
    id: 'shipping-logistics',
    valueProp: "Shipping & Logistics is eBay's vertical cluster for all shipping services, carrier integrations, and delivery programs — encompassing eBay International Shipping, Simple Delivery, SpeedPAK, Standard Envelope, and carrier partnerships across all markets.",
    valueTerritories: ['speed', 'convenience', 'transparency'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/shipping',
    ],
  },

  {
    id: 'seller-tools-hub',
    valueProp: "Seller Tools Hub is the organizational parent for all eBay seller-facing tools and capabilities — including listing tools, analytics, promotions, and advertising — forming the backbone of eBay's seller platform ecosystem.",
    valueTerritories: ['convenience', 'value', 'transparency'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://www.ebay.com/sh/landing',
    ],
  },

  {
    id: 'payments-checkout',
    valueProp: "Payments & Checkout is eBay's vertical cluster encompassing Managed Payments, checkout flows, payment methods, and tax collection — the financial infrastructure supporting every transaction on the platform across all markets.",
    valueTerritories: ['convenience', 'trust', 'transparency'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://help.ebay.com/seller/payments',
    ],
  },

  {
    id: 'live-commerce',
    valueProp: "Live Commerce is eBay's category cluster for eBay Live — the shoppable live-streaming feature enabling sellers and brands to host real-time interactive shows where buyers can purchase items on the spot, blending entertainment with instant commerce.",
    valueTerritories: ['community', 'selection', 'convenience'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['high-visibility', 'multi-market', 'long-term'],
    citations: [
      'https://www.ebay.com/live',
    ],
  },

  {
    id: 'discovery-buyer-experience',
    valueProp: "Discovery & Buyer Experience is eBay's internal cluster for buyer-facing features — search, browse, recommendations, Watchlist, saved searches, personalization, and feed — covering how shoppers find and engage with listings across the platform.",
    valueTerritories: ['convenience', 'selection', 'speed'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://www.ebay.com',
    ],
  },

  {
    id: 'community-education',
    valueProp: "Community & Education is eBay's cluster for programs that build seller knowledge and buyer community — including eBay Community Forums, eBay Academy, seller clinics, and charitable giving through eBay for Charity.",
    valueTerritories: ['community', 'transparency', 'trust'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['multi-market', 'long-term'],
    citations: [
      'https://community.ebay.com',
    ],
  },

  {
    id: 'events-campaigns',
    valueProp: "Events & Campaigns is eBay's cluster for seasonal sales events, marketing campaigns, and promotional moments — including Black Friday, Cyber Monday, Back to School, and proprietary deal events like eBay Deals.",
    valueTerritories: ['value', 'selection', 'convenience'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://www.ebay.com/deals',
    ],
  },

  {
    id: 'developer-platform',
    valueProp: "Developer Platform is eBay's ecosystem for third-party developers and technology partners — providing APIs, SDKs, sandbox environments, and developer resources to build integrations, tools, and applications that extend eBay's marketplace capabilities.",
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://developer.ebay.com',
    ],
  },

  // ── INTERNAL TAXONOMY TECHNICAL NODES ─────────────────────────────────────
  // These are organizational graph parents used to structure the naming taxonomy.
  // They are Internal Terms — not public product names, not marketed to buyers or sellers.

  {
    id: 'advertising',
    valueProp: "Advertising is the internal taxonomy parent for all eBay advertising products — Promoted Listings, offsite ads, display campaigns, and brand-funded placements — grouping the seller and brand revenue tools that make up eBay's ad business.",
    valueTerritories: ['value', 'transparency'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://advertise.ebay.com'],
  },

  {
    id: 'analytics',
    valueProp: "Analytics is the internal taxonomy parent for all seller and buyer data tools — Seller Hub analytics, Terapeak research, traffic reports, and performance dashboards — organizing the measurement and intelligence layer of the eBay platform.",
    valueTerritories: ['transparency'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sh/research'],
  },

  {
    id: 'auction',
    valueProp: "Auction is the internal taxonomy parent for eBay's original and defining listing format — encompassing bidding mechanics, proxy bidding, reserve prices, Buy It Now in auctions, and timed auction features across all markets.",
    valueTerritories: ['selection', 'value', 'transparency'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/buying/bidding'],
  },

  {
    id: 'authentication',
    valueProp: "Authentication is the internal taxonomy parent for all eBay item verification programs — Authenticity Guarantee across watches, handbags, sneakers, jewelry, trading cards, and streetwear — the trust infrastructure that certifies item legitimacy.",
    valueTerritories: ['trust', 'protection', 'transparency'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://pages.ebay.com/authenticity-guarantee/'],
  },

  {
    id: 'browse',
    valueProp: "Browse is the internal taxonomy parent for all category navigation and discovery features — shop by category, curated lists, trending items, and the hierarchical category tree that lets buyers explore eBay inventory without searching.",
    valueTerritories: ['selection', 'convenience'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/b/'],
  },

  {
    id: 'bulk-tools',
    valueProp: "Bulk Tools is the internal taxonomy parent for all high-volume listing and management capabilities — bulk upload, CSV import, file exchange, and batch editing — tools designed for sellers managing inventories too large for one-at-a-time operations.",
    valueTerritories: ['convenience'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/tools/seller-hub/bulk-listing-tools'],
  },

  {
    id: 'buyer',
    valueProp: "Buyer is the internal taxonomy parent for all buyer-side capabilities and features — purchase flows, buyer programs, protections, and account tools — the organizational layer that groups everything affecting the eBay buyer experience.",
    valueTerritories: ['convenience', 'trust'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com'],
  },

  {
    id: 'buyer-programs',
    valueProp: "Buyer Programs is the internal taxonomy parent for structured programs targeting buyers — eBay Plus membership, eBay Bucks, loyalty incentives, and buyer-specific promotional programs across markets.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com'],
  },

  {
    id: 'category',
    valueProp: "Category is the internal taxonomy parent for eBay's category and catalog infrastructure — the hierarchical classification system that organizes millions of listings into structured, searchable, browsable product categories.",
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/b/'],
  },

  {
    id: 'charity',
    valueProp: "Charity is the internal taxonomy parent for eBay's charitable giving programs — eBay for Charity (formerly eBay Giving Works) and donation-linked listing features that let sellers and buyers support nonprofits through marketplace transactions.",
    valueTerritories: ['community', 'impact', 'trust'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/charity'],
  },

  {
    id: 'collectibles',
    valueProp: "Collectibles is the internal taxonomy parent for all collector-focused categories on eBay — trading cards, coins, stamps, comics, vintage toys, and memorabilia — one of eBay's founding and most loyal buyer communities.",
    valueTerritories: ['selection', 'community', 'trust'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/b/Collectibles/1'],
  },

  {
    id: 'communication',
    valueProp: "Communication is the internal taxonomy parent for all buyer-seller messaging features — the message center, buyer questions, seller responses, in-app messaging, and notification preferences that enable secure marketplace communication.",
    valueTerritories: ['trust', 'convenience'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sh/msg'],
  },

  {
    id: 'community',
    valueProp: "Community is the internal taxonomy parent for eBay's community engagement features — discussion boards, feedback forum, seller community, collector communities, and social selling tools that connect buyers and sellers beyond transactions.",
    valueTerritories: ['community', 'trust'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://community.ebay.com'],
  },

  {
    id: 'customer-service',
    valueProp: "Customer Service is the internal taxonomy parent for all post-transaction support capabilities — resolution center, live chat, phone support, virtual assistant, help center, and escalation tools available to buyers and sellers.",
    valueTerritories: ['trust', 'convenience'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/home'],
  },

  {
    id: 'developer',
    valueProp: "Developer is the internal taxonomy parent for eBay's developer-facing APIs, tools, and platform capabilities — REST APIs, the eBay Developers Program, sandbox environments, and integration resources for building on the eBay platform.",
    valueTerritories: ['convenience'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://developer.ebay.com'],
  },

  {
    id: 'discovery',
    valueProp: "Discovery is the internal taxonomy parent for all buyer-side item discovery capabilities — search, browse, recommendations, personalized feeds, and editorial collections — the systems that connect buyers with relevant inventory.",
    valueTerritories: ['selection', 'convenience'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com'],
  },

  {
    id: 'education',
    valueProp: "Education is the internal taxonomy parent for eBay's seller and buyer education programs — eBay Academy, seller clinics, university programs, and onboarding resources that help new and experienced users get more from the platform.",
    valueTerritories: ['community', 'transparency'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/academy'],
  },

  {
    id: 'feedback',
    valueProp: "Feedback is the internal taxonomy parent for eBay's reputation and rating system — the Feedback Forum, buyer/seller ratings, positive feedback percentage, detailed seller ratings, and the feedback revision and withdrawal features.",
    valueTerritories: ['trust', 'transparency', 'community'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/fdbk/'],
  },

  {
    id: 'impact',
    valueProp: "Impact is the internal taxonomy parent for eBay's social impact and sustainability programs — eBay for Charity, circular fashion initiatives, certified recycled programs, and environmental commitments that reflect eBay's broader societal role.",
    valueTerritories: ['community', 'transparency'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebayinc.com/impact/'],
  },

  {
    id: 'international',
    valueProp: "International is the internal taxonomy parent for cross-border trade capabilities — eBay International Shipping, global shipping programs, currency conversion, import/export tools, and localized regional marketplace features.",
    valueTerritories: ['selection', 'convenience'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['multi-market', 'reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/international-purchases'],
  },

  {
    id: 'inventory',
    valueProp: "Inventory is the internal taxonomy parent for all seller inventory management capabilities — stock tracking, quantity controls, multi-quantity listings, and out-of-stock management tools within Seller Hub.",
    valueTerritories: ['convenience', 'transparency'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sh/lst'],
  },

  {
    id: 'listing',
    valueProp: "Listing is the internal taxonomy parent for all listing creation and management features — the listing form, item specifics, condition descriptions, media upload, pricing, format selection, and listing templates across all selling surfaces.",
    valueTerritories: ['convenience'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sellerhub'],
  },

  {
    id: 'listing-features',
    valueProp: "Listing Features is the internal taxonomy parent for all add-on listing capabilities — gallery, bold, subtitle, supersize pictures, scheduled start times, and other feature upgrades that enhance individual listing performance.",
    valueTerritories: ['value', 'selection'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/listing-upgrades'],
  },

  {
    id: 'listing-formats',
    valueProp: "Listing Formats is the internal taxonomy parent for eBay's selling format types — Auction-Style, Fixed Price (Buy It Now), Best Offer, and Classified Ads — the core mechanics defining how items are priced and transacted.",
    valueTerritories: ['selection', 'convenience'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/listing-formats'],
  },

  {
    id: 'listing-policies',
    valueProp: "Listing Policies is the internal taxonomy parent for all rules governing what and how items may be listed on eBay — prohibited items, active content policy, image requirements, and listing restrictions by category or market.",
    valueTerritories: ['trust', 'transparency'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/listing-policies'],
  },

  {
    id: 'listing-tools',
    valueProp: "Listing Tools is the internal taxonomy parent for all seller applications that facilitate listing creation — quick listing tool, advanced listing form, bulk upload, Terapeak research, and AI-powered listing assistants.",
    valueTerritories: ['convenience', 'value'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sh/lst'],
  },

  {
    id: 'live',
    valueProp: "Live is the internal taxonomy parent for eBay Live — the shoppable live-streaming product — encompassing the hosting tools, seller show management, live event discovery, and real-time purchase mechanics.",
    valueTerritories: ['community', 'selection', 'convenience'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/live'],
  },

  {
    id: 'marketing',
    valueProp: "Marketing is the internal taxonomy parent for all seller marketing tools — Promotions Manager, Markdown Manager, coupons, sale events, and store email campaigns — the demand-generation toolkit available to eBay sellers.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sh/mkt'],
  },

  {
    id: 'notifications',
    valueProp: "Notifications is the internal taxonomy parent for all eBay alert and communication features — push notifications, email alerts, SMS notifications, and in-app messages for buyers and sellers across all platforms.",
    valueTerritories: ['convenience', 'transparency'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sh/settings/notifications'],
  },

  {
    id: 'order-management',
    valueProp: "Order Management is the internal taxonomy parent for all post-sale order handling capabilities — awaiting shipment queue, order details, cancellation requests, shipping label generation, and order fulfillment workflows.",
    valueTerritories: ['convenience', 'transparency'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sh/ord'],
  },

  {
    id: 'payment',
    valueProp: "Payment is the internal taxonomy parent for all payment processing capabilities — Managed Payments infrastructure, payment method acceptance, payout scheduling, and financial transaction flows across all eBay markets.",
    valueTerritories: ['convenience', 'trust'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/payments'],
  },

  {
    id: 'payments',
    valueProp: "Payments is the internal taxonomy parent (variant of 'payment') grouping eBay's seller payment tools and programs — Managed Payments, payout methods, tax form management, and payment dispute resolution.",
    valueTerritories: ['convenience', 'trust'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/payments'],
  },

  {
    id: 'pricing-tools',
    valueProp: "Pricing Tools is the internal taxonomy parent for eBay's seller pricing assistance features — Price Suggestions, Competitive Pricing, auto-pricing recommendations, and markdown management tools that help sellers optimize listing prices.",
    valueTerritories: ['value', 'transparency'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sh/lst'],
  },

  {
    id: 'refurbished',
    valueProp: "Refurbished is the internal taxonomy parent for all refurbished-condition items on eBay — Certified Refurbished, Excellent Refurbished, Very Good Refurbished, Good Refurbished, and Seller Refurbished — covering the full graded refurbished product spectrum.",
    valueTerritories: ['value', 'trust', 'transparency'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/deals/refurbished'],
  },

  {
    id: 'regional',
    valueProp: "Regional is the internal taxonomy parent for eBay's market-specific sites and localized programs — grouping the national eBay marketplace variants (UK, DE, AU, CA, FR, IT, ES) and their country-specific features.",
    valueTerritories: ['selection', 'convenience'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['multi-market', 'reusable-capability'],
    citations: ['https://www.ebayinc.com/company/worldwide/'],
  },

  {
    id: 'returns',
    valueProp: "Returns is the internal taxonomy parent for all buyer and seller return management features — return requests, return shipping options, refund flows, return preferences, and eBay's Money Back Guarantee coverage across all markets.",
    valueTerritories: ['trust', 'protection', 'convenience'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/post-order/returns'],
  },

  {
    id: 'search',
    valueProp: "Search is the internal taxonomy parent for eBay's discovery engine — the Cassini search platform, search ranking signals, Best Match sorting, search filters, saved searches, and related product recommendations that power the buyer discovery experience.",
    valueTerritories: ['selection', 'convenience', 'transparency'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sch/'],
  },

  {
    id: 'seller-programs',
    valueProp: "Seller Programs is the internal taxonomy parent for structured programs that reward or designate seller performance — Top Rated Seller, PowerSeller, ProSeller, eBay Stores subscriptions, and other seller-tier recognition programs.",
    valueTerritories: ['trust', 'value', 'transparency'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/seller-levels'],
  },

  {
    id: 'seller-tools',
    valueProp: "Seller Tools is the internal taxonomy parent for all tools assisting eBay sellers — Seller Hub, listing tools, bulk tools, analytics, pricing tools, and third-party integrations that make selling on eBay more efficient.",
    valueTerritories: ['convenience', 'value'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sh/landing'],
  },

  {
    id: 'sellertools',
    valueProp: "Sellertools is an internal taxonomy alias for the seller tools cluster — used in certain graph contexts as a canonical identifier for the grouping of all eBay seller-side tools, synonymous with seller-tools.",
    valueTerritories: ['convenience'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sh/landing'],
  },

  {
    id: 'services',
    valueProp: "Services is the internal taxonomy parent for eBay value-added service offerings — authentication services, managed fulfillment, concierge programs, and premium seller services that extend beyond the core marketplace transaction.",
    valueTerritories: ['convenience', 'trust'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com'],
  },

  {
    id: 'shipping',
    valueProp: "Shipping is the internal taxonomy parent for all shipping and delivery capabilities — carrier integrations, label printing, delivery tracking, shipping calculators, and eBay's owned shipping programs including International Shipping and SpeedPAK.",
    valueTerritories: ['speed', 'convenience', 'transparency'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/shipping'],
  },

  {
    id: 'stores',
    valueProp: "Stores is the internal taxonomy parent for all eBay Stores subscription features — storefront customization, store tiers, store marketing tools, and the branded storefront experience for subscribed sellers.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/stores'],
  },

  {
    id: 'support',
    valueProp: "Support is the internal taxonomy parent for all customer and seller support capabilities — help center, resolution center, virtual assistant, live chat, phone support, and eBay Concierge services.",
    valueTerritories: ['trust', 'convenience'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/home'],
  },

  {
    id: 'sustainability',
    valueProp: "Sustainability is the internal taxonomy parent for eBay's environmental and circular economy initiatives — certified recycled programs, pre-loved fashion, sustainability partnerships, and eBay's commitment to extending product lifecycles through recommerce.",
    valueTerritories: ['community', 'transparency'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['long-term'],
    citations: ['https://www.ebayinc.com/impact/environment/'],
  },

  {
    id: 'tax',
    valueProp: "Tax is the internal taxonomy parent for all tax-related features on eBay — sales tax collection, VAT compliance, 1099-K tax form generation, and the automated tax calculation infrastructure built into Managed Payments.",
    valueTerritories: ['transparency', 'trust'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/payments/taxes'],
  },

  {
    id: 'trust',
    valueProp: "Trust is the internal taxonomy parent for all buyer and seller trust programs — eBay Money Back Guarantee, Authenticity Guarantee, seller verification, feedback, VeRO, buyer protection, and the full suite of trust and safety features.",
    valueTerritories: ['trust', 'protection', 'transparency'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/policies/member-behavior-policies'],
  },

  {
    id: 'verticals',
    valueProp: "Verticals is the internal taxonomy parent for eBay's category-specific focused experiences — eBay Motors, Fashion & Luxury, Collectibles & Trading, Refurbished — where deep category expertise, dedicated features, and tailored buyer/seller experiences differentiate eBay from general search.",
    valueTerritories: ['selection', 'trust'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['multi-market', 'long-term'],
    citations: ['https://www.ebay.com'],
  },

  // ── REGIONAL MARKETS ──────────────────────────────────────────────────────

  {
    id: 'ebay-uk',
    valueProp: "eBay UK (ebay.co.uk) is eBay's British marketplace — the largest C2C and B2C online marketplace in the United Kingdom, with market-specific programs including Simple Delivery, eBay Plus UK, eBay Premium Service, eBay Fulfilment UK, and UK-specific buyer and seller protections.",
    valueTerritories: ['selection', 'value', 'trust'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term'],
    citations: ['https://www.ebay.co.uk'],
  },

  {
    id: 'ebay-germany',
    valueProp: "eBay Germany (ebay.de) is eBay's German marketplace — one of Europe's largest online marketplaces with localized features including eBay Top Service, Pay Upon Invoice (Klarna via Adyen), DHL Paket integration, and German-specific seller programs including Platin Store tier.",
    valueTerritories: ['selection', 'value', 'trust'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term'],
    citations: ['https://www.ebay.de'],
  },

  {
    id: 'ebay-australia',
    valueProp: "eBay Australia (ebay.com.au) is eBay's Australian marketplace featuring localized programs including eBay Plus AU, Click & Collect / PUDO logistics, Australia Post carrier integration, and GST collection compliance — eBay's primary Asia-Pacific marketplace.",
    valueTerritories: ['selection', 'value', 'trust'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term'],
    citations: ['https://www.ebay.com.au'],
  },

  {
    id: 'ebay-canada',
    valueProp: "eBay Canada (ebay.ca) is eBay's Canadian marketplace, the primary digital marketplace for Canadian consumers — featuring Canada Post integrations, bilingual (English/French) support, and Canadian-specific seller and buyer programs.",
    valueTerritories: ['selection', 'value', 'trust'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term'],
    citations: ['https://www.ebay.ca'],
  },

  {
    id: 'ebay-france',
    valueProp: "eBay France (ebay.fr) is eBay's French marketplace with localized features including eBay's French buyer programs, Colissimo and Mondial Relay carrier support, French consumer protection compliance, and French-language listing support.",
    valueTerritories: ['selection', 'value'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term'],
    citations: ['https://www.ebay.fr'],
  },

  {
    id: 'ebay-italy',
    valueProp: "eBay Italy (ebay.it) is eBay's Italian marketplace — featuring Italian localization including Aste di Beneficenza (charity auctions), eBay Imperdibili deal events, Hub Vendeur seller center, and Italian carrier integrations.",
    valueTerritories: ['selection', 'value'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term'],
    citations: ['https://www.ebay.it'],
  },

  {
    id: 'ebay-spain',
    valueProp: "eBay Spain (ebay.es) is eBay's Spanish-language marketplace in Spain — offering localized buying and selling features, Spanish carrier integrations, and Spanish-language customer support for Iberian market buyers and sellers.",
    valueTerritories: ['selection', 'value'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term'],
    citations: ['https://www.ebay.es'],
  },

  // ── EBAY MOTORS VERTICAL FEATURES ─────────────────────────────────────────

  {
    id: 'ebay-auto',
    valueProp: "eBay Auto is the consumer-facing brand identity for eBay's automotive vertical — the label used in certain markets and contexts to represent eBay Motors' passenger vehicle buying and selling experience, distinct from the parts and accessories component.",
    valueTerritories: ['selection', 'trust', 'transparency'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'long-term'],
    citations: ['https://www.ebay.com/motors'],
  },

  {
    id: 'ebay-motors-parts',
    valueProp: "eBay Motors Parts & Accessories is the parts and accessories vertical within eBay Motors — covering automotive, motorcycle, and powersports parts with fitment-guided search that helps buyers find the exact part for their specific year, make, model, and trim.",
    valueTerritories: ['selection', 'value', 'transparency'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'long-term'],
    citations: ['https://www.ebay.com/motors/parts-accessories'],
  },

  {
    id: 'my-garage',
    valueProp: "My Garage is eBay Motors' personalization feature where buyers save the vehicles they own or are interested in — enabling fitment-filtered search results that automatically show only compatible parts, eliminating guesswork when shopping for automotive components.",
    valueTerritories: ['convenience', 'transparency'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/motors/mygarage'],
  },

  {
    id: 'fitment-compatibility',
    valueProp: "Fitment Compatibility is eBay's parts matching system that verifies whether a listed part is compatible with a buyer's specific vehicle — using a database of year/make/model/trim data to filter search results and display compatibility warnings at checkout.",
    valueTerritories: ['trust', 'transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/motors/parts-accessories'],
  },

  {
    id: 'parts-compatibility',
    valueProp: "Parts Compatibility is the seller-side feature enabling automotive parts sellers to add fitment data to their listings — specifying which year/make/model/trim combinations a part fits, powering eBay's fitment-filtered buyer search.",
    valueTerritories: ['transparency', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/motors-parts-compatibility'],
  },

  {
    id: 'fitment-plus',
    valueProp: "Fitment Plus is eBay's enhanced vehicle fitment data service providing more granular compatibility information — including submodel and engine variants — for sellers who need to specify fitment more precisely than standard year/make/model allows.",
    valueTerritories: ['transparency', 'trust'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://developer.ebay.com/api-docs/buy/browse/resources/item_summary/methods/search'],
  },

  {
    id: 'fitment-plus-auto',
    valueProp: "Fitment Plus Auto is the automatic variant of eBay's enhanced fitment data system — automatically applying extended compatibility data to qualifying automotive parts listings without requiring manual seller data entry.",
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/motors/parts-accessories'],
  },

  {
    id: 'guaranteed-fit',
    valueProp: "Guaranteed Fit is eBay's automotive parts protection that ensures a part fits the buyer's vehicle as described — if a compatible part ordered through eBay's fitment system doesn't fit, eBay covers the return shipping cost.",
    valueTerritories: ['protection', 'trust', 'transparency'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/ebay-money-back-guarantee'],
  },

  {
    id: 'assured-fit',
    valueProp: "eBay Assured Fit is a compatibility designation applied to parts listings where eBay has verified fitment data accuracy — giving buyers confidence that a part is guaranteed to be compatible with their registered vehicle.",
    valueTerritories: ['trust', 'protection', 'transparency'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/motors/parts-accessories'],
  },

  {
    id: 'shop-by-diagram',
    valueProp: "Shop by Diagram is an eBay Motors visual search feature that lets buyers navigate automotive parts by clicking on exploded vehicle diagrams — identifying the exact part they need by location on the car rather than by name, ideal for buyers who don't know part terminology.",
    valueTerritories: ['convenience', 'transparency', 'selection'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/motors/parts-accessories'],
  },

  {
    id: 'vehicle-history-report',
    valueProp: "Vehicle History Report is the eBay Motors integration providing buyers with access to third-party vehicle history data — NHTSA records, accident reports, title history, and odometer readings — to support informed used vehicle purchase decisions.",
    valueTerritories: ['transparency', 'trust', 'protection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/motors'],
  },

  {
    id: 'vin-lookup',
    valueProp: "VIN Lookup is the eBay Motors search feature that lets buyers enter a Vehicle Identification Number to retrieve vehicle-specific listings, history, and compatible parts — providing a precise, vehicle-anchored way to shop for an exact car or its parts.",
    valueTerritories: ['convenience', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/motors'],
  },

  // ── ADDITIONAL CATEGORY NODES ─────────────────────────────────────────────

  {
    id: 'classified-ads',
    valueProp: "Classified Ads is eBay's non-transactional listing format for items and services where a price is shown but payment is handled offline — used primarily for local real estate, vehicles, and service listings where buyers contact sellers directly.",
    valueTerritories: ['selection', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/classified-ads'],
  },

  {
    id: 'video-games',
    valueProp: "Video Games is one of eBay's high-volume specialty categories — covering new, used, and vintage gaming hardware, software, and accessories where eBay's deep selection of rare and discontinued titles distinguishes it from traditional retail.",
    valueTerritories: ['selection', 'value', 'community'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/b/Video-Games-Consoles/1249'],
  },

]
