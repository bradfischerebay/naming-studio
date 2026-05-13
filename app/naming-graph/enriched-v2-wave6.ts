// Wave 6 Enrichment V2 — 66 new nodes from April 29, 2026 registry scan
// Covers: AI/discovery, Seller Hub tools, payments/financing, Motors, programs,
//         collectibles/live, Goldin, TCGplayer, Depop, acquisitions, international, developer, legacy

export interface NodeEnrichmentV2 {
  id: string
  valueProp: string
  valueTerritories: string[]
  nameClass: "Product Name" | "Feature Name" | "Functional Label" | "Internal Term" | "Legacy Residue"
  isProductName: boolean
  strategicRole: string[]
  citations: string[]
}

export const WAVE6_ENRICHMENT_V2: NodeEnrichmentV2[] = [

  // ── AI / Discovery Features ──────────────────────────────────────────────────

  {
    id: "agentic-search",
    valueProp: "Understands what you're looking for — even when you can't quite describe it — by interpreting conversational queries and surfacing the right items from across eBay's catalog.",
    valueTerritories: ["convenience", "selection"],
    nameClass: "Feature Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term", "full-funnel"],
    citations: ["eBay Q4 2025 earnings call", "eBay mobile app December 2025 rollout"]
  },
  {
    id: "ai-shopping-agent",
    valueProp: "A personal shopping companion that guides you from idea to purchase — asking clarifying questions, comparing options, and helping you find the best deal without the browsing fatigue.",
    valueTerritories: ["convenience", "selection", "value"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term", "full-funnel"],
    citations: ["eBay Innovation blog May 2025"]
  },
  {
    id: "ebay-explore",
    valueProp: "A personalized discovery feed that learns your interests and surfaces items you didn't know you were looking for — turning browsing into inspiration.",
    valueTerritories: ["selection", "convenience"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "multi-market", "long-term"],
    citations: ["eBay Innovation blog August 2024"]
  },
  {
    id: "finances-copilot",
    valueProp: "An AI assistant built into Seller Hub that answers financial questions, surfaces payout trends, and helps you understand your business performance without digging through spreadsheets.",
    valueTerritories: ["transparency", "convenience"],
    nameClass: "Feature Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term", "reusable-capability"],
    citations: ["eBay Open 2025 demo", "Seller Hub Payments tab"]
  },
  {
    id: "your-cost",
    valueProp: "Track what you paid for your inventory directly in Seller Hub so you can see your true profit margin on every sale — not just your revenue.",
    valueTerritories: ["transparency", "value"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["long-term", "reusable-capability"],
    citations: ["Seller Center documentation December 2025"]
  },

  // ── Seller Hub Tools ─────────────────────────────────────────────────────────

  {
    id: "offers-dashboard",
    valueProp: "A single place to see, respond to, and manage every open offer — so you never lose a sale because a negotiation fell through the cracks.",
    valueTerritories: ["convenience", "speed"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["long-term", "reusable-capability"],
    citations: ["Seller Update June 2025"]
  },
  {
    id: "offers-in-messaging",
    valueProp: "Negotiate and finalize offers without leaving the conversation — buyers and sellers can go from question to deal in a single message thread.",
    valueTerritories: ["convenience", "speed"],
    nameClass: "Feature Name",
    isProductName: false,
    strategicRole: ["high-visibility", "long-term"],
    citations: ["eBay Open 2025 announcement"]
  },
  {
    id: "buyer-details-feature",
    valueProp: "Identify your returning buyers and send them personalized coupons, helping you turn one-time shoppers into loyal repeat customers.",
    valueTerritories: ["convenience", "community"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["long-term", "one-off"],
    citations: ["Seller Update January 2025"]
  },
  {
    id: "automated-positive-feedback",
    valueProp: "Automatically posts positive feedback on your behalf when a tracked order arrives on time — building your seller reputation without the manual follow-up.",
    valueTerritories: ["trust", "speed", "convenience"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "long-term"],
    citations: ["Seller Update August 2025 (UK)", "Seller Update September 2025 (US)"]
  },
  {
    id: "qa-feature",
    valueProp: "Add frequently asked questions and answers directly to your listing so buyers get the information they need instantly — reducing messages and accelerating purchase decisions.",
    valueTerritories: ["transparency", "convenience"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["long-term", "reusable-capability"],
    citations: ["Seller Center Winter 2024 timeline"]
  },

  // ── Payments / Financing ─────────────────────────────────────────────────────

  {
    id: "ebay-seller-capital",
    valueProp: "Flexible business financing designed specifically for eBay sellers — access working capital tied to your sales history, with repayments that scale to your revenue.",
    valueTerritories: ["value", "speed"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "multi-market", "long-term"],
    citations: ["pages.ebay.com/ebaysellercapital/", "eBay + Liberis press release"]
  },
  {
    id: "business-cash-advance",
    valueProp: "Get up to $1M in working capital based on your eBay sales history — with no fixed monthly payments, repaid as a percentage of future sales.",
    valueTerritories: ["value", "speed"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term"],
    citations: ["eBay + Liberis press release", "pages.ebay.com/ebaysellercapital/"]
  },
  {
    id: "flexible-growth-financing",
    valueProp: "A revolving financing line for UK sellers that lets you draw funds when you need them and repay as a percentage of sales — scaling naturally with your business.",
    valueTerritories: ["value", "convenience"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["long-term", "one-off"],
    citations: ["eBay UK Seller Update April 2026", "Liberis partnership announcement"]
  },
  {
    id: "ebay-merchant-financing",
    valueProp: "Working capital for German eBay sellers, provided through YouLend and repaid as a share of your eBay payouts — no fixed installments, no banks.",
    valueTerritories: ["value", "convenience"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["long-term", "one-off"],
    citations: ["Seller Update June 2025 (DE)", "YouLend partnership"]
  },

  // ── Motors ───────────────────────────────────────────────────────────────────

  {
    id: "fitment-finder",
    valueProp: "Enter your vehicle's year, make, and model to instantly filter parts listings to only the ones confirmed to fit — so you buy with confidence and avoid costly returns.",
    valueTerritories: ["convenience", "trust"],
    nameClass: "Feature Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term"],
    citations: ["eBay Motors app store description"]
  },
  {
    id: "ebay-consignment",
    valueProp: "Hand off your high-value items to eBay and we'll handle everything — authentication, listing, selling, and shipping — so you get top dollar without the work.",
    valueTerritories: ["convenience", "trust", "value"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "multi-market", "long-term"],
    citations: ["eBay Consignment launch September 2023", "pages.ebay.com/consignment/"]
  },

  // ── Programs / Initiatives ───────────────────────────────────────────────────

  {
    id: "ebay-ambassador-program",
    valueProp: "Earn up to 7.5% commission sharing the items you love — create your own storefront, promote with custom links, and turn your eBay passion into income.",
    valueTerritories: ["community", "value"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term"],
    citations: ["Seller Update October 2025", "Seller Center Ambassador Program article"]
  },
  {
    id: "ebay-additional-protection",
    valueProp: "Extended coverage through Allianz Partners kicks in from month 13 onward on qualifying refurbished and open-box items — giving buyers lasting peace of mind beyond the standard warranty.",
    valueTerritories: ["protection", "trust"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["multi-market", "long-term"],
    citations: ["Seller Update June 2025 (DE, UK)"]
  },
  {
    id: "ebay-certified-open-box",
    valueProp: "Open-box items verified by eBay and backed by a 1-year Allstate warranty — so you get like-new quality at a pre-owned price, with full protection if anything goes wrong.",
    valueTerritories: ["trust", "protection", "value"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term"],
    citations: ["pages.ebay.com/openbox/", "Seller Update May 2025"]
  },

  // ── Collectibles / Live Shopping ─────────────────────────────────────────────

  {
    id: "48-hours-of-drops",
    valueProp: "A curated 48-hour window of limited drops streamed live — your chance to get exclusive items before they're gone, in real time.",
    valueTerritories: ["selection", "community"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "one-off"],
    citations: ["eBay Live press release March 2026"]
  },
  {
    id: "case-breaks",
    valueProp: "Join a live stream where a sealed case gets cracked open on camera and the cards are distributed to participants — all the thrill of the pull without buying the whole box.",
    valueTerritories: ["community", "selection"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["high-visibility", "long-term"],
    citations: ["eBay Q3 2024 earnings call"]
  },
  {
    id: "pre-loved-fashion-condition-grades",
    valueProp: "Three standardized condition grades for used clothing make it easy to understand exactly what you're buying — no surprises when your order arrives.",
    valueTerritories: ["transparency", "trust"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "long-term", "reusable-capability"],
    citations: ["Seller Update July 2025"]
  },

  // ── Goldin Sub-Products ──────────────────────────────────────────────────────

  {
    id: "goldin-marketplace",
    valueProp: "Buy and sell graded sports collectibles at fixed prices or make an offer — no auction countdown, just immediate access to authenticated cards and memorabilia.",
    valueTerritories: ["selection", "convenience", "trust"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term", "inherited-M&A"],
    citations: ["goldin.co/marketplace"]
  },
  {
    id: "goldin-vault",
    valueProp: "Store your graded collectibles in Goldin's secure authenticated facility and trade vault-to-vault without ever shipping a card — protecting your investment while keeping it liquid.",
    valueTerritories: ["protection", "trust", "convenience"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term", "inherited-M&A"],
    citations: ["goldin.co/vault"]
  },
  {
    id: "goldin-weekly-auctions",
    valueProp: "Bid on graded cards and collectibles every week starting from $5 — an accessible entry point into the Goldin auction ecosystem without the high minimums of elite events.",
    valueTerritories: ["value", "selection"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term", "inherited-M&A"],
    citations: ["goldin.co/auctions"]
  },
  {
    id: "goldin-elite-auctions",
    valueProp: "Monthly premium auctions for the most significant graded cards and memorabilia — curated for serious collectors pursuing trophy pieces with $5,000+ valuations.",
    valueTerritories: ["selection", "trust", "value"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term", "inherited-M&A"],
    citations: ["goldin.co/elite-auctions"]
  },
  {
    id: "studio-auctions",
    valueProp: "Bid on original props, wardrobe, and memorabilia from iconic films and TV shows — authenticated Hollywood artifacts brought to market through Goldin's auction expertise.",
    valueTerritories: ["selection", "trust"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term", "inherited-M&A"],
    citations: ["Goldin Studio Auctions launch June 2025"]
  },

  // ── TCGplayer Sub-Products ───────────────────────────────────────────────────

  {
    id: "tcgplayer-direct",
    valueProp: "Ship your inventory to TCGplayer's warehouse once and let them handle every buyer order — faster delivery, less packing, and more time to focus on sourcing.",
    valueTerritories: ["speed", "convenience"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term", "inherited-M&A"],
    citations: ["tcgplayer.com/direct"]
  },
  {
    id: "tcgplayer-pro",
    valueProp: "Enhanced tools, deeper analytics, and lower transaction fees for high-volume card sellers who need a competitive edge to run a professional TCGplayer business.",
    valueTerritories: ["value", "transparency"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term", "inherited-M&A"],
    citations: ["tcgplayer.com/pro"]
  },
  {
    id: "tcgplayer-subscription",
    valueProp: "For $8.99/month, unlock member discounts and priority access across TCGplayer — the smart choice for buyers who purchase cards regularly.",
    valueTerritories: ["value", "convenience"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term", "inherited-M&A"],
    citations: ["TCGplayer Subscription launch January 2024"]
  },
  {
    id: "tcgplayer-market-price",
    valueProp: "The industry-standard reference price for trading cards, calculated from real completed transactions on TCGplayer — so you always know what a card is actually worth.",
    valueTerritories: ["transparency", "value"],
    nameClass: "Feature Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term", "reusable-capability", "inherited-M&A"],
    citations: ["tcgplayer.com/market-price-guide"]
  },
  {
    id: "tcgplayer-infinite",
    valueProp: "Strategy guides, deck lists, and trading card game news all in one place — the content hub for players who want to improve their game as much as their collection.",
    valueTerritories: ["community", "selection"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term", "inherited-M&A"],
    citations: ["infinite.tcgplayer.com"]
  },
  {
    id: "store-your-products",
    valueProp: "Store your TCGplayer inventory at the warehouse so it's ready to ship the moment an order comes in — no need to keep it at home or manage your own storage.",
    valueTerritories: ["convenience", "speed"],
    nameClass: "Internal Term",
    isProductName: false,
    strategicRole: ["long-term", "inherited-M&A"],
    citations: ["TCGplayer Store Your Products policy June 2024"]
  },
  {
    id: "growth-acceleration-program",
    valueProp: "Resources, expert support, and seller incentives designed to help TCGplayer stores scale faster — a structured path from small seller to high-volume business.",
    valueTerritories: ["value", "community"],
    nameClass: "Internal Term",
    isProductName: false,
    strategicRole: ["long-term", "inherited-M&A"],
    citations: ["TCGplayer seller resources"]
  },

  // ── Depop Sub-Features ───────────────────────────────────────────────────────

  {
    id: "depop-payments",
    valueProp: "Pay however you prefer — credit card, Apple Pay, Google Pay, or Klarna — with seamless checkout built directly into the Depop app across US, UK, and AU.",
    valueTerritories: ["convenience", "trust"],
    nameClass: "Feature Name",
    isProductName: false,
    strategicRole: ["multi-market", "long-term", "inherited-M&A"],
    citations: ["Depop Terms of Service — Payments section"]
  },
  {
    id: "depop-shipping",
    valueProp: "Print a prepaid label in seconds and hand your sale off to USPS, Evri, or Sendle — shipping handled without leaving the app, in every market Depop operates.",
    valueTerritories: ["speed", "convenience"],
    nameClass: "Feature Name",
    isProductName: false,
    strategicRole: ["multi-market", "long-term", "inherited-M&A"],
    citations: ["Depop Help — Shipping"]
  },
  {
    id: "depop-protection",
    valueProp: "Every transaction on Depop is covered — if something goes wrong as a buyer or seller, Depop Protection has your back with a clear resolution process.",
    valueTerritories: ["protection", "trust"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "multi-market", "long-term", "inherited-M&A"],
    citations: ["Depop Help — Depop Protection official documentation"]
  },
  {
    id: "depop-outfits",
    valueProp: "Build and share complete outfits as moodboards on Depop — inspiring your followers and making it easy for them to shop your exact look.",
    valueTerritories: ["community", "selection"],
    nameClass: "Feature Name",
    isProductName: true,
    strategicRole: ["high-visibility", "multi-market", "long-term", "inherited-M&A"],
    citations: ["Depop newsroom September 24, 2025", "TechCrunch coverage", "Retail Dive coverage"]
  },

  // ── Acquisitions / Corporate Entities ────────────────────────────────────────

  {
    id: "certilogo",
    valueProp: "Scan a label to instantly verify a garment's authenticity and access its digital product passport — giving buyers confidence and brands a direct connection to their customers.",
    valueTerritories: ["trust", "transparency"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["multi-market", "long-term", "reusable-capability", "inherited-M&A"],
    citations: ["eBay acquisition announcement July 2023", "EU Digital Product Passport compliance"]
  },
  {
    id: "3pm-shield",
    valueProp: "AI-powered brand protection infrastructure that detects and removes counterfeit listings at scale — keeping marketplaces safe for brands and buyers alike.",
    valueTerritories: ["trust", "protection"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["multi-market", "long-term", "reusable-capability", "inherited-M&A"],
    citations: ["eBay acquisition 2023", "VeRO enforcement infrastructure"]
  },
  {
    id: "ebay-ventures",
    valueProp: "eBay's corporate venture capital arm investing in the next generation of commerce technology — backing companies that advance the future of buying and selling.",
    valueTerritories: ["community"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["long-term", "high-visibility"],
    citations: ["ebayinc.com/ebay-ventures/"]
  },
  {
    id: "caramel-dealer-services",
    valueProp: "The legal operating entity that powers Caramel's Secure Purchase vehicle transaction service — handling title transfer, payment, and registration for private-party car sales.",
    valueTerritories: ["trust", "protection"],
    nameClass: "Internal Term",
    isProductName: false,
    strategicRole: ["long-term", "inherited-M&A"],
    citations: ["eBay terms and conditions — Caramel references"]
  },

  // ── International / Regional Programs ────────────────────────────────────────

  {
    id: "seller-cockpit-pro",
    valueProp: "Germany's full-featured seller management hub — manage listings, pricing recommendations, orders, and finances in one place built specifically for the DE market.",
    valueTerritories: ["convenience", "transparency"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term"],
    citations: ["eBay DE Seller Update summer 2025", "Verkäufer Cockpit Pro refresh"]
  },
  {
    id: "ebay-pro",
    valueProp: "Australia's premium seller subscription with tiered plans — get the tools, discounts, and visibility to run a professional eBay business in the AU market.",
    valueTerritories: ["value", "convenience"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term"],
    citations: ["eBay AU — eBay Pro product page"]
  },
  {
    id: "ebaymag",
    valueProp: "List your inventory on up to 8 international eBay sites automatically — with auto-translation handling the hard part, so you can sell globally without going global.",
    valueTerritories: ["selection", "convenience"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["multi-market", "long-term", "reusable-capability"],
    citations: ["export.ebay.com/en/growth/ebaymag/"]
  },
  {
    id: "ebay-for-change",
    valueProp: "Registered social enterprises in the UK sell on eBay for free — zero seller fees and access to business training to help purpose-driven businesses grow.",
    valueTerritories: ["community", "value"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term"],
    citations: ["eBay UK — eBay for Change program", "Social Enterprise UK partnership"]
  },

  // ── Developer / API ───────────────────────────────────────────────────────────

  {
    id: "edelivery-international-shipping-api",
    valueProp: "Generate international shipping labels programmatically via eBay's eDIS API — purpose-built for Greater China-based sellers managing cross-border fulfillment at scale.",
    valueTerritories: ["speed", "convenience"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["long-term", "reusable-capability"],
    citations: ["developer.ebay.com — eDIS API", "eBay developer newsletter Q1 2025"]
  },
  {
    id: "buy-marketing-api",
    valueProp: "Surface eBay's most-watched and similar items programmatically — the modern API for merchandising integrations, replacing the deprecated Merchandising API.",
    valueTerritories: ["selection", "convenience"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["long-term", "reusable-capability"],
    citations: ["developer.ebay.com — Buy Marketing API", "Merchandising API decommission January 6, 2025"]
  },
  {
    id: "graphql-explorer",
    valueProp: "Test and validate Inventory Mapping API calls in a live production environment — a developer tool for building and debugging integrations without guesswork.",
    valueTerritories: ["transparency", "convenience"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["long-term", "reusable-capability"],
    citations: ["eBay developer newsletter Q4 2025"]
  },
  {
    id: "sign-in-with-ebay",
    valueProp: "Let users log into your app or site using their eBay identity — a trusted OAuth integration that removes friction at signup and leverages eBay's established buyer and seller base.",
    valueTerritories: ["trust", "convenience"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term", "reusable-capability"],
    citations: ["developer.ebay.com/develop/sign-in-with-ebay"]
  },
  {
    id: "taxonomy-sdk",
    valueProp: "Compare aspect metadata across eBay's category taxonomy in bulk using this open-source SDK — purpose-built for developers building listing tools or category intelligence systems.",
    valueTerritories: ["transparency", "convenience"],
    nameClass: "Internal Term",
    isProductName: false,
    strategicRole: ["long-term", "reusable-capability"],
    citations: ["eBay developer newsletter Q3 2025", "eBay developer newsletter Q4 2025"]
  },
  {
    id: "post-order-api",
    valueProp: "Manage returns, disputes, and cancellations programmatically using eBay's traditional post-sale API — the established integration path for post-order operations.",
    valueTerritories: ["convenience", "speed"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["long-term", "reusable-capability"],
    citations: ["developer.ebay.com — Post Order API reference"]
  },

  // ── Authenticity Guarantee Partner Nodes ─────────────────────────────────────

  {
    id: "beckett",
    valueProp: "One of eBay's official trading card authentication and grading partners — a Beckett grade on a card sold through eBay Authenticity Guarantee means independent expert verification.",
    valueTerritories: ["trust"],
    nameClass: "Internal Term",
    isProductName: false,
    strategicRole: ["high-visibility", "long-term"],
    citations: ["eBay Authenticity Guarantee help pages — trading cards"]
  },
  {
    id: "certified-collectibles-group",
    valueProp: "eBay's official grading organization for coins, currency, and comics within the Authenticity Guarantee program — CCG certification signals independently verified quality and provenance.",
    valueTerritories: ["trust"],
    nameClass: "Internal Term",
    isProductName: false,
    strategicRole: ["high-visibility", "long-term"],
    citations: ["eBay Authenticity Guarantee help pages — collectibles"]
  },
  {
    id: "sgc",
    valueProp: "An official trading card grading partner for eBay's Authenticity Guarantee — an SGC grade gives buyers confidence that the card has been independently assessed and authenticated.",
    valueTerritories: ["trust"],
    nameClass: "Internal Term",
    isProductName: false,
    strategicRole: ["high-visibility", "long-term"],
    citations: ["eBay Authenticity Guarantee help pages — trading cards"]
  },
  {
    id: "sneaker-con",
    valueProp: "Sneaker Con physically inspects every pair of authenticated footwear sold through eBay's Authenticity Guarantee — so buyers can trust they're getting the real thing.",
    valueTerritories: ["trust"],
    nameClass: "Internal Term",
    isProductName: false,
    strategicRole: ["high-visibility", "long-term"],
    citations: ["eBay Authenticity Guarantee help pages — sneakers"]
  },

  // ── Advertising Sub-Features ─────────────────────────────────────────────────

  {
    id: "promoted-listings-automated-campaigns",
    valueProp: "Set rules once and let eBay automatically promote your new listings and optimize ad rates — keeping your inventory visible without constant manual management.",
    valueTerritories: ["convenience", "speed"],
    nameClass: "Feature Name",
    isProductName: false,
    strategicRole: ["high-visibility", "long-term"],
    citations: ["eBay Innovation blog", "Promoted Listings General announcement March 2025"]
  },
  {
    id: "promoted-listings-priority-video-ads",
    valueProp: "Reach buyers with short, attention-grabbing video ads in priority placements — a CPC format that puts your brand story where shoppers are actively looking.",
    valueTerritories: ["convenience", "selection"],
    nameClass: "Feature Name",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market", "long-term"],
    citations: ["Seller Update April 2026", "AU beta expansion to US/UK/CA"]
  },

  // ── Legacy Nodes ─────────────────────────────────────────────────────────────

  {
    id: "ebay-shopbot",
    valueProp: "eBay's Facebook Messenger chatbot allowed users to search for and discover products via conversational AI — an early experiment in chat-based commerce that ran from 2016 to 2018.",
    valueTerritories: ["convenience", "selection"],
    nameClass: "Legacy Residue",
    isProductName: false,
    strategicRole: ["lifecycle-managed", "one-off"],
    citations: ["eBay ShopBot launch October 2016", "Discontinued September 2018"]
  },
  {
    id: "missionfish",
    valueProp: "MissionFish was the original charity donation infrastructure powering eBay for Charity from 2003, routing proceeds from listings to nonprofit organizations before being rebranded as PayPal Giving Fund.",
    valueTerritories: ["community", "trust"],
    nameClass: "Legacy Residue",
    isProductName: false,
    strategicRole: ["lifecycle-managed"],
    citations: ["eBay for Charity historical documentation", "MissionFish launch 2003"]
  },
  {
    id: "paypal-giving-fund",
    valueProp: "The operational successor to MissionFish, PayPal Giving Fund continued to route eBay for Charity donations to nonprofits after the 2013 rebrand and still appears in eBay for Charity documentation.",
    valueTerritories: ["community", "trust"],
    nameClass: "Legacy Residue",
    isProductName: false,
    strategicRole: ["lifecycle-managed"],
    citations: ["eBay for Charity documentation", "MissionFish rebrand circa 2013"]
  },
  {
    id: "magento",
    valueProp: "Magento was an e-commerce platform owned by eBay from 2011 to 2015, integrated into the broader eBay commerce developer ecosystem before being spun out and later acquired by Adobe.",
    valueTerritories: ["selection", "convenience"],
    nameClass: "Legacy Residue",
    isProductName: false,
    strategicRole: ["lifecycle-managed", "inherited-M&A"],
    citations: ["eBay acquisition 2011", "eBay divestiture 2015", "Adobe acquisition"]
  },
  {
    id: "ebay-trading-assistants",
    valueProp: "eBay Trading Assistants was a certified seller program running from 2002 to 2013 that allowed experts to sell items on behalf of others — an early peer-to-peer consignment model retired as the platform evolved.",
    valueTerritories: ["convenience", "community"],
    nameClass: "Legacy Residue",
    isProductName: false,
    strategicRole: ["lifecycle-managed"],
    citations: ["eBay Trading Assistants program retirement September 20, 2013"]
  },
  {
    id: "xcommerce",
    valueProp: "X.commerce was eBay's unified developer platform from 2011 to 2013, bringing together Magento, PayPal, and eBay developer tools under a single commerce infrastructure umbrella before being dissolved.",
    valueTerritories: ["convenience"],
    nameClass: "Legacy Residue",
    isProductName: false,
    strategicRole: ["lifecycle-managed"],
    citations: ["X.commerce platform 2011–2013"]
  },
  {
    id: "tcgplayer-buylist",
    valueProp: "TCGplayer Buylist let hobbyist and store sellers post cards directly to local game stores through TCGplayer's platform — a structured card-selling channel sunset in July 2024.",
    valueTerritories: ["convenience", "value"],
    nameClass: "Legacy Residue",
    isProductName: false,
    strategicRole: ["lifecycle-managed", "inherited-M&A"],
    citations: ["TCGplayer Buylist sunset July 17, 2024"]
  },
  {
    id: "tise-cash",
    valueProp: "An in-app green currency earned through activity on the Tise Nordic C2C marketplace — rewards users for posting, buying, and following as part of Tise's community engagement model.",
    valueTerritories: ["community", "value"],
    nameClass: "Feature Name",
    isProductName: false,
    strategicRole: ["inherited-M&A", "long-term"],
    citations: ["Tise marketplace in-app documentation"]
  }

]
