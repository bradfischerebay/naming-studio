// Wave 6: April 29, 2026 New Candidates — Overnight Run + Follow-Up Batches 01–05
// 66 net-new nodes (Tier A confirmed). Excludes 15 already-in-registry items.
// Review before merging into enriched-consolidated-DEDUPLICATED.ts.
//
// Schema: imports from lib/enriched-naming-data (extended GraphNode with
// released, relationships, sourceUrl) rather than the minimal DEDUPLICATED type.
//
// Core 7 markets: US, UK, DE, FR, IT, AU, CA (the 7 named literals in GraphNode.market).
// market: "global" = all 7 core markets. Fewer than 7 = explicit string[].

import { GraphNode } from './naming-data'

export const WAVE6_NEW_CANDIDATES: GraphNode[] = [

  // ── AI / Discovery Features ──────────────────────────────────────────────────

  {
    id: "agentic-search",
    name: "Agentic Search",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay",
    desc: "AI-powered query agent reclassifying product discovery on eBay. Named by CEO Iannone in Q4 2025 earnings; rolled out to US mobile December 2025.",
    market: "US",
    year: 2025,
    released: "2025-12"
  },
  {
    id: "ai-shopping-agent",
    name: "AI Shopping Agent",
    type: "category",
    tier: "product",
    status: "current",
    parent: "ebay",
    desc: "Companion-integrated buyer experience announced May 2025 via eBay Innovation blog. AI agent that assists buyers throughout the shopping journey.",
    market: "US",
    year: 2025,
    released: "2025-05"
  },
  {
    id: "ebay-explore",
    name: "eBay Explore",
    type: "category",
    tier: "product",
    status: "current",
    parent: "ebay",
    desc: "AI-powered personalized discovery feed launched August 2024. Covered in eBay Innovation blog for US and UK markets.",
    market: ["US", "UK"],
    year: 2024,
    released: "2024-08"
  },
  {
    id: "finances-copilot",
    name: "Finances Copilot",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "AI financial assistant demoed at eBay Open 2025 within Seller Hub Payments tab. Broader rollout planned for 2026.",
    market: "US",
    year: 2025
  },
  {
    id: "your-cost",
    name: "Your Cost",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "COGS (cost of goods sold) tracking feature in Seller Hub. Launched December 2025 per Seller Center documentation.",
    market: "US",
    year: 2025,
    released: "2025-12"
  },

  // ── Seller Hub Tools ─────────────────────────────────────────────────────────

  {
    id: "offers-dashboard",
    name: "Offers Dashboard",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Centralized negotiation tool in Seller Hub consolidating all offer management. Launched June 2025 per Seller Update.",
    market: "US",
    year: 2025,
    released: "2025-06"
  },
  {
    id: "offers-in-messaging",
    name: "Offers in Messaging",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Buyers and sellers negotiate offers directly within the eBay message thread. Announced at eBay Open 2025.",
    market: "US",
    year: 2025
  },
  {
    id: "buyer-details-feature",
    name: "Buyer Details Feature",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Seller Hub tool to identify returning customers and send targeted coupons. Named in the January 2025 Seller Update.",
    market: "US",
    year: 2025,
    released: "2025-01"
  },
  {
    id: "automated-positive-feedback",
    name: "Automated Positive Feedback",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "eBay-generated positive feedback automatically posted when a tracked order delivers on time. Rolled out UK August 2025, US September 2025.",
    market: ["US", "UK"],
    year: 2025,
    released: "2025-08"
  },
  {
    id: "qa-feature",
    name: "Q&A Feature",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Listing FAQ tool allowing sellers to add frequently asked questions and answers to their listings. Launched Winter 2024; own Seller Center timeline URL.",
    market: "US",
    year: 2024
  },

  // ── Payments / Financing ─────────────────────────────────────────────────────

  {
    id: "ebay-seller-capital",
    name: "eBay Seller Capital",
    type: "category",
    tier: "umbrella",
    status: "current",
    parent: "ebay",
    desc: "Umbrella brand for all eBay seller financing products. Own page at pages.ebay.com/ebaysellercapital/; $100M+ disbursed. Partners include Liberis (US/UK) and YouLend (DE).",
    market: "US",
    year: 2023,
    sourceUrl: "pages.ebay.com/ebaysellercapital/"
  },
  {
    id: "business-cash-advance",
    name: "Business Cash Advance",
    type: "category",
    tier: "product",
    status: "current",
    parent: "ebay-seller-capital",
    desc: "US seller financing up to $1M via Liberis. Named in official eBay+Liberis press release; distinct from Flexible Cash Advance which is a separate product tier.",
    market: "US",
    year: 2023
  },
  {
    id: "flexible-growth-financing",
    name: "Flexible Growth Financing",
    type: "category",
    tier: "product",
    status: "current",
    parent: "ebay-seller-capital",
    desc: "UK revolving draw financing via Liberis. Launched April 6, 2026; repayments tied to sales percentage. Distinct from US Business Cash Advance.",
    market: "UK",
    year: 2026,
    released: "2026-04-06"
  },
  {
    id: "ebay-merchant-financing",
    name: "eBay Merchant Financing",
    type: "category",
    tier: "product",
    status: "current",
    parent: "ebay-seller-capital",
    desc: "Germany-specific seller financing via YouLend. Named in June 2025 Seller Update; distinct from Liberis-powered US and UK products.",
    market: "DE",
    year: 2025,
    released: "2025-06"
  },

  // ── Motors ───────────────────────────────────────────────────────────────────

  {
    id: "fitment-finder",
    name: "Fitment Finder",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-motors",
    desc: "Buyer-facing vehicle compatibility lookup tool in the eBay Motors app. Named explicitly in the Motors app store description alongside My Garage.",
    market: "US",
    relationships: [
      { target: "fitment-plus", type: "related_to", desc: "Fitment Finder is the buyer-facing lookup; Fitment Plus is the seller opt-in program built on the same fitment data" },
      { target: "fitment-plus-auto", type: "related_to", desc: "Auto-enrollment variant of the same fitment program ecosystem" }
    ]
  },
  {
    id: "ebay-consignment",
    name: "eBay Consignment",
    type: "category",
    tier: "product",
    status: "current",
    parent: "ebay",
    desc: "Consignment service where eBay handles authentication, listing, and selling for high-value items. Launched September 2023 (luxury handbags); expanded 5x through 2024 into apparel, watches, jewelry, footwear, and UK. Successor to legacy eBay Valet.",
    market: ["US", "UK"],
    year: 2023,
    released: "2023-09",
    relationships: [
      { target: "ebay-valet", type: "replaces", year: 2023, desc: "eBay Consignment is the 2023 active successor to eBay Valet (2014–2018)" }
    ]
  },

  // ── Programs / Initiatives ───────────────────────────────────────────────────

  {
    id: "ebay-ambassador-program",
    name: "eBay Ambassador Program",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "ebay",
    desc: "Self-service creator affiliate program open to all US users. Up to 7.5% commission, custom storefronts, 24-hour cookie. Announced October 2025 Seller Update with own Seller Center article. Distinct from eBay Partner Network which targets publishers.",
    market: "US",
    year: 2025,
    released: "2025-10"
  },
  {
    id: "ebay-additional-protection",
    name: "eBay Additional Protection",
    type: "trust",
    tier: "product",
    status: "current",
    parent: "ebay-refurbished",
    desc: "Insurance via Allianz Partners covering refurbished and New: Other items from month 13 onward. Named in June 2025 Seller Update for DE and UK markets.",
    market: ["DE", "UK"],
    year: 2025,
    released: "2025-06"
  },
  {
    id: "ebay-certified-open-box",
    name: "eBay Certified Open Box",
    type: "trust",
    tier: "product",
    status: "current",
    parent: "ebay-refurbished",
    desc: "Certification tier for open-box items with 1-year Allstate warranty. Launched May 2025 at pages.ebay.com/openbox/. Sibling tier to eBay Certified Refurbished.",
    market: "US",
    year: 2025,
    released: "2025-05",
    sourceUrl: "pages.ebay.com/openbox/",
    relationships: [
      { target: "ebay-certified-refurbished", type: "related_to", desc: "Sibling certification tier within eBay Refurbished; Certified Open Box covers open-box items, Certified Refurbished covers tested/repaired units" }
    ]
  },

  // ── Collectibles / Live Shopping ─────────────────────────────────────────────

  {
    id: "48-hours-of-drops",
    name: "48 Hours of Drops",
    type: "category",
    tier: "event",
    status: "current",
    parent: "ebay-live",
    desc: "Recurring live shopping event format launched March 2026 with its own official press release. Features limited drops over a 48-hour window.",
    market: "US",
    year: 2026,
    released: "2026-03"
  },
  {
    id: "case-breaks",
    name: "Case Breaks",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-live",
    desc: "Named live trading card event format within eBay Live where a box or case is opened on stream and cards are allocated to participants. Referenced in Q3 2024 earnings.",
    market: "US",
    year: 2024
  },
  {
    id: "pre-loved-fashion-condition-grades",
    name: "Pre-Loved Fashion Condition Grades",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay",
    desc: "Three new named condition categories for used clothing introduced in the July 2025 Seller Update. Standardizes condition taxonomy for the pre-loved fashion vertical.",
    market: "global",
    year: 2025,
    released: "2025-07"
  },

  // ── Goldin Sub-Products ──────────────────────────────────────────────────────

  {
    id: "goldin-marketplace",
    name: "Goldin Marketplace",
    type: "category",
    tier: "product",
    status: "current",
    parent: "goldin",
    desc: "Always-on fixed-price and make-offer marketplace on Goldin. Distinct from Goldin's timed auction formats; allows immediate purchase of graded sports collectibles.",
    market: "US"
  },
  {
    id: "goldin-vault",
    name: "Goldin Vault",
    type: "category",
    tier: "product",
    status: "current",
    parent: "goldin",
    desc: "Secure authenticated storage for graded collectibles. Distinct from PSA Vault; allows vault-to-vault trading without physical shipping.",
    market: "US",
    sourceUrl: "goldin.co/vault"
  },
  {
    id: "goldin-weekly-auctions",
    name: "Goldin Weekly Auctions",
    type: "category",
    tier: "product",
    status: "current",
    parent: "goldin",
    desc: "Recurring lower-threshold auction format on Goldin with $5+ starting bids. Distinct named format from Goldin Elite Auctions which targets high-value items.",
    market: "US"
  },
  {
    id: "goldin-elite-auctions",
    name: "Goldin Elite Auctions",
    type: "category",
    tier: "product",
    status: "current",
    parent: "goldin",
    desc: "Monthly premium auction format on Goldin for items $5,000+. Distinct from Weekly Auctions; targets high-value graded cards and memorabilia.",
    market: "US"
  },
  {
    id: "studio-auctions",
    name: "Studio Auctions",
    type: "category",
    tier: "product",
    status: "current",
    parent: "goldin",
    desc: "Goldin sub-brand for Hollywood props and film/TV memorabilia auctions. Became a Goldin sub-acquisition in June 2025.",
    market: "US",
    year: 2025,
    released: "2025-06"
  },

  // ── TCGplayer Sub-Products ───────────────────────────────────────────────────

  {
    id: "tcgplayer-direct",
    name: "TCGplayer Direct",
    type: "category",
    tier: "product",
    status: "current",
    parent: "tcgplayer",
    desc: "Seller fulfillment program where sellers ship inventory to TCGplayer's warehouse; TCGplayer handles all buyer-facing fulfillment. Also referenced as Direct by TCGplayer.",
    market: "US",
    relationships: [
      { target: "store-your-products", type: "related_to", desc: "Both are TCGplayer seller logistics programs; SYP handles inventory storage, TCGplayer Direct handles buyer-facing fulfillment" }
    ]
  },
  {
    id: "tcgplayer-pro",
    name: "TCGplayer Pro",
    type: "category",
    tier: "product",
    status: "current",
    parent: "tcgplayer",
    desc: "Professional seller pricing tier on TCGplayer providing enhanced tools, analytics, and lower transaction fees for high-volume card sellers.",
    market: "US"
  },
  {
    id: "tcgplayer-subscription",
    name: "TCGplayer Subscription",
    type: "category",
    tier: "program",
    status: "current",
    parent: "tcgplayer",
    desc: "Monthly subscriber program at $8.99/month launched January 2024. Provides members with discounts and priority access on TCGplayer.",
    market: "US",
    year: 2024,
    released: "2024-01"
  },
  {
    id: "tcgplayer-market-price",
    name: "TCGplayer Market Price",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "tcgplayer",
    desc: "Named pricing data product calculating card values using real-transaction averages across TCGplayer sales. Industry-standard reference price for trading card valuations.",
    market: "US"
  },
  {
    id: "tcgplayer-infinite",
    name: "TCGplayer Infinite",
    type: "category",
    tier: "product",
    status: "current",
    parent: "tcgplayer",
    desc: "Content and community hub at infinite.tcgplayer.com covering strategy guides, deck lists, and trading card game news. Separate subdomain from the marketplace.",
    market: "US",
    sourceUrl: "infinite.tcgplayer.com"
  },
  {
    id: "store-your-products",
    name: "Store Your Products",
    type: "category",
    tier: "program",
    status: "current",
    parent: "tcgplayer",
    desc: "Named inventory storage program for TCGplayer sellers (abbreviated SYP). Distinct from TCGplayer Direct fulfillment; underwent policy changes June 2024.",
    market: "US"
  },
  {
    id: "growth-acceleration-program",
    name: "Growth Acceleration Program",
    type: "category",
    tier: "program",
    status: "current",
    parent: "tcgplayer",
    desc: "Named seller growth program on TCGplayer offering resources, support, and incentives to help card sellers scale their businesses.",
    market: "US"
  },

  // ── Depop Sub-Features ───────────────────────────────────────────────────────

  {
    id: "depop-payments",
    name: "Depop Payments",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "depop",
    desc: "Named payment processing system covering Stripe, Apple Pay, Google Pay, and Klarna for US, UK, and AU markets. Defined in Depop Terms of Service.",
    market: ["US", "UK", "AU"]
  },
  {
    id: "depop-shipping",
    name: "Depop Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "depop",
    desc: "Named prepaid label service with market-specific carrier integrations: USPS (US), Evri (UK), Sendle (AU). Simplifies shipping for Depop sellers.",
    market: ["US", "UK", "AU"]
  },
  {
    id: "depop-protection",
    name: "Depop Protection",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "depop",
    desc: "Official buyer and seller protection program on Depop. Named exactly as Depop Protection in official documentation — not Depop Buyer Protection.",
    market: ["US", "UK", "AU"]
  },
  {
    id: "depop-outfits",
    name: "Depop Outfits",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "depop",
    desc: "Moodboarding and outfit-building feature on Depop. Formally launched September 24, 2025; covered by Depop newsroom, TechCrunch, and Retail Dive.",
    market: ["US", "UK", "AU"],
    year: 2025,
    released: "2025-09-24"
  },

  // ── Acquisitions / Corporate Entities ────────────────────────────────────────

  {
    id: "certilogo",
    name: "Certilogo",
    type: "trust",
    tier: "platform",
    status: "current",
    parent: "ebay",
    desc: "AI apparel authentication and Digital Product Passport infrastructure platform acquired by eBay July 2023. Powers EU Digital Product Passport compliance for fashion items.",
    market: "global",
    year: 2023,
    released: "2023-07"
  },
  {
    id: "3pm-shield",
    name: "3PM Shield",
    type: "trust",
    tier: "platform",
    status: "current",
    parent: "ebay",
    desc: "AI marketplace compliance and counterfeit detection platform acquired by eBay in 2023. Powers brand protection and VeRO enforcement infrastructure.",
    market: "global",
    year: 2023
  },
  {
    id: "ebay-ventures",
    name: "eBay Ventures",
    type: "category",
    tier: "organization",
    status: "current",
    parent: "ebay",
    desc: "Official eBay corporate venture capital arm. Own page at ebayinc.com/ebay-ventures/. Investments include Tise (2022 investment ahead of 2025 acquisition).",
    market: "global",
    sourceUrl: "ebayinc.com/ebay-ventures/"
  },
  {
    id: "caramel-dealer-services",
    name: "Caramel Dealer Services LLC",
    type: "category",
    tier: "organization",
    status: "current",
    parent: "caramel",
    desc: "Legal operating entity name for Caramel referenced in eBay terms and conditions. Powers the Secure Purchase vehicle transaction service.",
    market: "US"
  },

  // ── International / Regional Programs ────────────────────────────────────────

  {
    id: "seller-cockpit-pro",
    name: "Seller Cockpit Pro",
    type: "regional",
    tier: "product",
    status: "current",
    parent: "ebay",
    desc: "Germany's distinct Seller Hub equivalent — Verkäufer Cockpit Pro. Received its biggest refresh in years in summer 2025 including a dedicated pricing recommendation dashboard.",
    market: "DE",
    year: 2025,
    relationships: [
      { target: "seller-hub", type: "related_to", desc: "Seller Cockpit Pro is the DE-market equivalent of Seller Hub; same seller management purpose, distinct product" }
    ]
  },
  {
    id: "ebay-pro",
    name: "eBay Pro",
    type: "regional",
    tier: "product",
    status: "current",
    parent: "ebay",
    desc: "Named replacement for eBay Stores in Australia. Tiered plans including Pro Starter. Distinct product branding from the global eBay Stores offering.",
    market: "AU"
  },
  {
    id: "ebaymag",
    name: "eBaymag",
    type: "regional",
    tier: "product",
    status: "current",
    parent: "ebay",
    desc: "Free cross-border listing tool with auto-translation. Lists seller inventory on 8 eBay international sites covering all core markets.",
    market: "global",
    sourceUrl: "export.ebay.com/en/growth/ebaymag/"
  },
  {
    id: "ebay-for-change",
    name: "eBay for Change",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "ebay",
    desc: "UK program for registered social enterprises offering zero seller fees and business training. Partnership with Social Enterprise UK.",
    market: "UK"
  },

  // ── Developer / API ───────────────────────────────────────────────────────────

  {
    id: "edelivery-international-shipping-api",
    name: "eDelivery International Shipping API",
    type: "developer",
    tier: "product",
    status: "current",
    parent: "ebay",
    desc: "Formally named eDIS API on developer.ebay.com. Restricted to Greater China-based sellers for international shipping label generation. Launched Q1 2025; bundle resource added Q3 2025.",
    market: "global",
    year: 2025,
    released: "2025-01",
    sourceUrl: "developer.ebay.com"
  },
  {
    id: "buy-marketing-api",
    name: "Buy Marketing API",
    type: "developer",
    tier: "product",
    status: "current",
    parent: "ebay",
    desc: "Named replacement for the decommissioned Merchandising API (sunset January 6, 2025). Two new methods added in Q4 2025: getMostWatchedItems and getSimilarItems.",
    market: "global",
    year: 2025,
    released: "2025-01",
    relationships: [
      { target: "merchandising-api", type: "replaces", year: 2025, desc: "Named replacement for Merchandising API decommissioned January 6, 2025" }
    ]
  },
  {
    id: "graphql-explorer",
    name: "GraphQL Explorer",
    type: "developer",
    tier: "feature",
    status: "current",
    parent: "ebay",
    desc: "Named developer tool for testing the Inventory Mapping API in production environments. Launched Q4 2025 per eBay developer newsletter.",
    market: "global",
    year: 2025
  },
  {
    id: "sign-in-with-ebay",
    name: "Sign in with eBay",
    type: "developer",
    tier: "product",
    status: "current",
    parent: "ebay",
    desc: "Named OAuth-based identity integration product with dedicated developer.ebay.com/develop/sign-in-with-ebay page and usage guidelines. Distinct from the OAuth 2.0 protocol itself.",
    market: "global",
    sourceUrl: "developer.ebay.com/develop/sign-in-with-ebay"
  },
  {
    id: "taxonomy-sdk",
    name: "Taxonomy SDK",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "ebay",
    desc: "Open-source SDK for bulk aspect metadata comparison using the eBay Taxonomy API. Separately named artifact from the Taxonomy API; referenced in Q3 and Q4 2025 developer newsletters.",
    market: "global"
  },
  {
    id: "post-order-api",
    name: "Post Order API",
    type: "developer",
    tier: "product",
    status: "current",
    parent: "ebay",
    desc: "Named traditional API for post-sale operations including returns, disputes, and cancellations. Officially distinct from the REST Fulfillment API in the modern developer platform.",
    market: "global"
  },

  // ── Authenticity Guarantee Partner Nodes ─────────────────────────────────────

  {
    id: "beckett",
    name: "Beckett",
    type: "trust",
    tier: "organization",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "Official eBay Authenticity Guarantee authentication partner for trading cards. Listed on eBay AG help pages alongside PSA and SGC.",
    market: "US"
  },
  {
    id: "certified-collectibles-group",
    name: "Certified Collectibles Group",
    type: "trust",
    tier: "organization",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "Official eBay Authenticity Guarantee grading organization (CCG). Covers coins, currency, and comics. Canonical name per AG help pages — prior research used CSG abbreviation in error.",
    market: "US"
  },
  {
    id: "sgc",
    name: "SGC",
    type: "trust",
    tier: "organization",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "Official eBay Authenticity Guarantee trading card grading partner. Listed alongside PSA and Beckett on eBay AG help pages.",
    market: "US"
  },
  {
    id: "sneaker-con",
    name: "Sneaker Con",
    type: "trust",
    tier: "organization",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "Named sneaker authentication partner within the eBay Authenticity Guarantee program. Handles physical inspection of authenticated footwear.",
    market: "US"
  },

  // ── Advertising Sub-Features ─────────────────────────────────────────────────

  {
    id: "promoted-listings-automated-campaigns",
    name: "Promoted Listings Automated Campaigns",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "promoted-listings-general",
    desc: "Rule-based automation within Promoted Listings General that automatically promotes new listings and adjusts ad rates. Named in eBay Innovation blog with dedicated announcement.",
    market: "US",
    year: 2025,
    released: "2025-03"
  },
  {
    id: "promoted-listings-priority-video-ads",
    name: "Promoted Listings Priority Video Ads",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "promoted-listings-priority",
    desc: "Short video ad format within Promoted Listings Priority. CPC model, 45-second max, MP4/MOV format. Announced April 2026 Seller Update; expanding from AU beta to US/UK/CA.",
    market: ["AU", "US", "UK", "CA"],
    year: 2026,
    released: "2026-04"
  },

  // ── Legacy Nodes ─────────────────────────────────────────────────────────────

  {
    id: "ebay-shopbot",
    name: "eBay ShopBot",
    type: "category",
    tier: "product",
    status: "legacy",
    parent: "ebay",
    desc: "Facebook Messenger chatbot for product discovery and shopping. Launched October 2016; discontinued September 2018.",
    market: "US",
    year: 2016,
    released: "2016-10"
  },
  {
    id: "missionfish",
    name: "MissionFish",
    type: "category",
    tier: "platform",
    status: "legacy",
    parent: "ebay",
    desc: "Original charity donation backend for eBay for Charity from 2003. Became Points of Light then rebranded to PayPal Giving Fund around 2013.",
    market: "US",
    year: 2003,
    renamedTo: "paypal-giving-fund"
  },
  {
    id: "paypal-giving-fund",
    name: "PayPal Giving Fund",
    type: "category",
    tier: "platform",
    status: "legacy",
    parent: "ebay",
    desc: "Operational name after MissionFish rebrand; continued to power eBay for Charity donation routing. Still referenced in eBay for Charity documentation.",
    market: "US",
    renamedFrom: "missionfish"
  },
  {
    id: "magento",
    name: "Magento",
    type: "category",
    tier: "platform",
    status: "legacy",
    parent: "ebay",
    desc: "E-commerce platform acquired by eBay in 2011 and spun out in 2015. Was an official eBay property 2011–2015 before being sold and later acquired by Adobe.",
    market: "global",
    year: 2011
  },
  {
    id: "ebay-trading-assistants",
    name: "eBay Trading Assistants",
    type: "category",
    tier: "program",
    status: "legacy",
    parent: "ebay",
    desc: "Official program running 2002–2013 allowing certified sellers to sell items on behalf of others for a fee. Retired September 20, 2013 with thousands of active participants at peak.",
    market: "US",
    year: 2002
  },
  {
    id: "xcommerce",
    name: "X.commerce",
    type: "developer",
    tier: "platform",
    status: "legacy",
    parent: "ebay",
    desc: "eBay's unified developer commerce platform 2011–2013 integrating Magento, PayPal, and eBay developer tools. Dissolved as eBay restructured its developer strategy.",
    market: "US",
    year: 2011
  },
  {
    id: "tcgplayer-buylist",
    name: "TCGplayer Buylist",
    type: "category",
    tier: "program",
    status: "legacy",
    parent: "tcgplayer",
    desc: "Named buylist program allowing stores to purchase cards from sellers through TCGplayer. Sunset July 17, 2024.",
    market: "US",
    year: 2024
  },
  {
    id: "tise-cash",
    name: "Tise Cash",
    type: "regional",
    tier: "feature",
    status: "current",
    parent: "tise",
    desc: "In-app green currency on Tise earned through posting, buying, and following activity. Redeemable for rewards within the Tise Nordic C2C marketplace.",
    market: ["NO", "SE", "DK", "FI"]
  }
]
