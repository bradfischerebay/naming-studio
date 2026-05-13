// Enriched GraphNode metadata for programs 401-500
// Source: translations.ts + Research-Session-Complete-2026-04-17.md
// Quality: Production-ready with full metadata

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

export const ENRICHED_BATCH_02B: GraphNode[] = [
  // RESOLUTION & DISPUTE HANDLING
  {
    id: "resolution-center",
    name: "Resolution Center",
    type: "trust",
    tier: "platform",
    status: "legacy",
    parent: "trust",
    desc: "Dispute resolution platform for handling returns, refunds, and transaction issues. Being phased out in favor of integrated resolution flows.",
    market: "global",
    year: 2008
  },

  // REFURBISHED PROGRAMS
  {
    id: "ebay-refurbished",
    name: "eBay Refurbished",
    type: "category",
    tier: "program",
    status: "current",
    parent: "refurbished",
    desc: "Four-tier certified refurbished program with professional inspections, warranties, and 2-year eBay Money Back Guarantee for pre-owned electronics and goods.",
    market: "global",
    year: 2020
  },

  {
    id: "certified-refurbished",
    name: "Certified Refurbished",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-refurbished",
    desc: "Top-tier refurbished condition indicating manufacturer or certified refurbisher restoration with like-new quality and full warranty.",
    market: "global",
    year: 2020
  },

  {
    id: "excellent-refurbished",
    name: "Excellent Refurbished",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-refurbished",
    desc: "Second-tier refurbished condition with minimal signs of use, fully tested and functional with warranty protection.",
    market: "global",
    year: 2020
  },

  {
    id: "very-good-refurbished",
    name: "Very Good Refurbished",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-refurbished",
    desc: "Third-tier refurbished condition with light cosmetic imperfections, fully functional with warranty coverage.",
    market: "global",
    year: 2020
  },

  {
    id: "good-refurbished",
    name: "Good Refurbished",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-refurbished",
    desc: "Fourth-tier refurbished condition with noticeable wear but fully tested and functional with warranty support.",
    market: "global",
    year: 2020
  },

  // LIVE COMMERCE
  {
    id: "ebay-live",
    name: "eBay Live",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "live",
    desc: "Live-stream shopping platform enabling sellers to host real-time video sales events with interactive bidding and purchasing. Global brand name with no market translations.",
    market: "global",
    year: 2022
  },

  // SHIPPING PROGRAMS
  {
    id: "shipping-labels",
    name: "Shipping Labels",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Integrated shipping label generation and printing service offering discounted carrier rates and tracking for eBay sellers.",
    market: "global",
    year: 2005
  },

  {
    id: "global-shipping-program",
    name: "Global Shipping Program",
    type: "category",
    tier: "program",
    status: "renamed",
    parent: "shipping",
    desc: "International shipping service handling customs and logistics for cross-border sales. Replaced in US by eBay International Shipping in July 2023; still active in UK.",
    market: ["UK", "AU"],
    year: 2011,
    renamedTo: "eBay International Shipping"
  },

  {
    id: "ebay-international-shipping",
    name: "eBay International Shipping",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "Modern international shipping solution replacing Global Shipping Program in US and Canada, streamlining cross-border commerce with eBay-managed logistics.",
    market: ["US", "CA"],
    year: 2023,
    renamedFrom: "Global Shipping Program"
  },

  {
    id: "ebay-international-standard-delivery",
    name: "eBay International Standard Delivery",
    type: "category",
    tier: "program",
    status: "legacy",
    parent: "shipping",
    desc: "Deprecated international shipping option discontinued in July 2023, replaced by eBay International Shipping and Global Shipping Programme.",
    market: "US",
    year: 2018,
    renamedTo: "eBay International Shipping"
  },

  {
    id: "simple-delivery",
    name: "Simple Delivery",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "UK-exclusive mandatory C2C shipping program providing simplified postage options and integrated tracking for consumer sellers.",
    market: "UK",
    year: 2021
  },

  {
    id: "local-pickup",
    name: "Local Pickup",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Shipping option allowing buyers to collect items in person from seller's location, avoiding shipping costs and delays.",
    market: "global",
    year: 2000
  },

  {
    id: "click-and-collect",
    name: "Click & Collect",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "Retail partnership program enabling buyers to collect online purchases at physical store locations in UK, Germany, and Australia.",
    market: ["UK", "DE", "AU"],
    year: 2016
  },

  {
    id: "ebay-collection-points",
    name: "eBay Collection Points",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "Network of designated pickup locations including retail partners and lockers where buyers can collect eBay purchases in UK and Australia.",
    market: ["UK", "AU"],
    year: 2017
  },

  {
    id: "in-store-pickup",
    name: "In-Store Pickup",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "US shipping option for collecting online purchases at participating brick-and-mortar retail locations, equivalent to Click & Collect in other markets.",
    market: "US",
    year: 2016
  },

  {
    id: "managed-delivery",
    name: "Managed Delivery",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "US-based white-glove delivery service for large items like furniture and appliances, providing scheduled delivery and installation services.",
    market: "US",
    year: 2019
  },

  {
    id: "logistica-ebay-orange-connex",
    name: "Logistica eBay by Orange Connex",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "Italy-exclusive fulfillment and logistics partnership providing warehousing, packing, and shipping services for Italian sellers.",
    market: "IT",
    year: 2020
  },

  // CHARITY
  {
    id: "ebay-for-charity",
    name: "eBay for Charity",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "impact",
    desc: "Charitable giving platform enabling sellers to donate auction/sale proceeds to verified nonprofits. Italy uses separate 'Aste di beneficenza' program structure.",
    market: ["US", "UK", "DE", "CA", "AU"],
    year: 2003
  },

  {
    id: "aste-di-beneficenza",
    name: "Aste di beneficenza",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "impact",
    desc: "Italy-specific charity auction program operating independently from eBay for Charity, with distinct nonprofit partnerships and donation mechanics.",
    market: "IT",
    year: 2005
  },

  // DISCOVERY & WATCHLIST
  {
    id: "watchlist",
    name: "Watchlist",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Buyer tool for saving and tracking items of interest, receiving price drop alerts and auction ending notifications.",
    market: "global",
    year: 2000
  },

  // MEMBERSHIP
  {
    id: "ebay-plus-membership",
    name: "eBay Plus",
    type: "category",
    tier: "program",
    status: "current",
    parent: "buyer",
    desc: "Premium paid membership offering fast free shipping, exclusive deals, and enhanced customer service in Germany (€19.90/year) and Australia ($49/year).",
    market: ["DE", "AU"],
    year: 2017
  },

  // MOTORS
  {
    id: "ebay-motors",
    name: "eBay Motors",
    type: "category",
    tier: "vertical",
    status: "current",
    parent: "verticals",
    desc: "Dedicated marketplace vertical for automotive vehicles, parts, and accessories with specialized search tools and seller protections.",
    market: "global",
    year: 2000
  },

  {
    id: "my-garage",
    name: "My Garage",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-motors",
    desc: "Personalization tool within eBay Motors allowing users to save vehicle specifications for filtered, compatible parts searches. Global brand with no translations.",
    market: "global",
    year: 2008
  },

  {
    id: "ebay-guaranteed-fit",
    name: "eBay Guaranteed Fit",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "ebay-motors",
    desc: "US Motors program guaranteeing automotive parts compatibility with buyer's vehicle, offering free returns if fitment is incorrect.",
    market: "US",
    year: 2021
  },

  {
    id: "fitment-plus-auto",
    name: "Fitment Plus Auto",
    type: "category",
    tier: "product",
    status: "current",
    parent: "ebay-motors",
    desc: "US-exclusive advanced vehicle fitment data tool launched October 2025, expanding eBay Guaranteed Fit with enhanced compatibility verification.",
    market: "US",
    year: 2025
  },

  {
    id: "assured-fit",
    name: "Assured Fit",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "ebay-motors",
    desc: "UK equivalent of eBay Guaranteed Fit, providing compatibility assurance and free returns for automotive parts that don't match vehicle specifications.",
    market: "UK",
    year: 2021
  },

  // DEALS & PROMOTIONS
  {
    id: "ebay-wow",
    name: "eBay WOW!",
    type: "category",
    tier: "program",
    status: "current",
    parent: "deals",
    desc: "Germany-exclusive daily deals program launched 2009, featuring heavily discounted limited-time offers and one of eBay's most successful market-specific brands.",
    market: "DE",
    year: 2009
  },

  {
    id: "ebay-imperdibili",
    name: "eBay Imperdibili",
    type: "category",
    tier: "program",
    status: "current",
    parent: "deals",
    desc: "Italy-exclusive deals program launched 2012 with Best Price Guarantee, offering curated discounts and price matching protection.",
    market: "IT",
    year: 2012
  },

  {
    id: "bons-plans",
    name: "Bons Plans",
    type: "category",
    tier: "program",
    status: "current",
    parent: "deals",
    desc: "France-exclusive deals branding highlighting special offers and promotional pricing, translating to 'Good Deals' in English.",
    market: "FR",
    year: 2010
  },

  {
    id: "ebay-deals",
    name: "eBay Deals",
    type: "category",
    tier: "program",
    status: "current",
    parent: "deals",
    desc: "Standard deals hub in US, UK, Canada, and Australia featuring time-limited discounts, trending offers, and curated collections.",
    market: ["US", "UK", "CA", "AU"],
    year: 2015
  },

  {
    id: "daily-deals",
    name: "Daily Deals",
    type: "category",
    tier: "program",
    status: "current",
    parent: "deals",
    desc: "Global program showcasing rotating daily discounts and flash sales across all categories with countdown timers.",
    market: "global",
    year: 2011
  },

  {
    id: "ebay-bucks",
    name: "eBay Bucks",
    type: "category",
    tier: "program",
    status: "legacy",
    parent: "deals",
    desc: "Deprecated US rewards program offering cashback on purchases, discontinued April 2, 2024 and replaced by eBay Mastercard rewards.",
    market: "US",
    year: 2010,
    renamedTo: "eBay Mastercard Rewards"
  },

  // DELIVERY GUARANTEES
  {
    id: "guaranteed-delivery",
    name: "Guaranteed Delivery",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "Trust program guaranteeing delivery by specified date or money back, available in all markets with seller-specific eligibility requirements.",
    market: "global",
    year: 2018
  },

  // GIFT CARDS
  {
    id: "ebay-gift-cards",
    name: "eBay Gift Cards",
    type: "category",
    tier: "product",
    status: "current",
    parent: "payments",
    desc: "Prepaid gift cards for eBay purchases, officially available in US, Canada, and Australia. Germany, France, Italy have limited availability; UK uses third-party alternatives.",
    market: ["US", "CA", "AU"],
    year: 2007
  },

  // BUSINESS & B2B
  {
    id: "ebay-business-supply",
    name: "eBay Business Supply",
    type: "category",
    tier: "vertical",
    status: "current",
    parent: "verticals",
    desc: "Global B2B marketplace vertical for business equipment, office supplies, and industrial products with volume pricing and invoice options.",
    market: "global",
    year: 2016
  },

  // LUXURY & AUTHENTICATION
  {
    id: "certified-by-brand",
    name: "Certified by Brand",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "US luxury authentication program launched April 2023 where brand manufacturers directly verify authenticity of their products sold on eBay.",
    market: "US",
    year: 2023
  },

  // COLLECTIBLES
  {
    id: "trading-card-hub",
    name: "Trading Card Hub",
    type: "category",
    tier: "vertical",
    status: "current",
    parent: "verticals",
    desc: "US-exclusive dedicated marketplace for sports cards, trading cards, and collectibles with PSA authentication integration and specialized search tools.",
    market: "US",
    year: 2020
  },

  {
    id: "ebay-vault",
    name: "eBay Vault",
    type: "category",
    tier: "product",
    status: "current",
    parent: "verticals",
    desc: "US-only secure storage service for high-value trading cards and collectibles, enabling vault-to-vault transfers without physical shipping.",
    market: "US",
    year: 2022
  },

  {
    id: "collectibles-price-guide",
    name: "Collectibles Price Guide",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "verticals",
    desc: "US market research tool providing historical pricing data and market trends for trading cards and collectibles.",
    market: "US",
    year: 2021
  },

  // SELLER TOOLS - ADDITIONAL
  {
    id: "ebay-export",
    name: "eBay Export",
    type: "developer",
    tier: "product",
    status: "current",
    parent: "sellertools",
    desc: "Seller tool for exporting listings, orders, and inventory data to external systems and third-party applications. Global brand with no translations.",
    market: "global",
    year: 2015
  },

  {
    id: "merchant-integration-platform",
    name: "Merchant Integration Platform",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer",
    desc: "MIP - Enterprise integration platform for high-volume sellers to connect inventory management systems and automate listing workflows. Global brand acronym.",
    market: "global",
    year: 2018
  },

  // SELLER MARKETING TOOLS
  {
    id: "discounts-manager",
    name: "Discounts Manager",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Seller Hub tool for creating promotional discounts, bulk pricing changes, and sale events across listings.",
    market: "global",
    year: 2019
  },

  {
    id: "markdown-manager",
    name: "Markdown Manager",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "sellertools",
    desc: "Deprecated discount tool merged into Promotions Manager in 2024, previously used for automated price reductions.",
    market: "global",
    year: 2017,
    renamedTo: "Promotions Manager"
  },

  {
    id: "promotions-manager",
    name: "Promotions Manager",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Unified seller tool combining discount creation, promotional campaigns, and pricing strategies. Replaced Markdown Manager in 2024.",
    market: "global",
    year: 2024,
    renamedFrom: "Markdown Manager"
  },

  {
    id: "sales-events",
    name: "Sales Events",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Seller tool for creating coordinated multi-listing promotional events with custom branding and time-limited discounts.",
    market: "global",
    year: 2020
  },

  // SELLER PERFORMANCE & BADGES
  {
    id: "seller-performance-standards",
    name: "Seller Performance Standards",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Three-tier seller rating system (Below Standard, Above Standard, Top Rated) based on defect rates, shipping performance, and customer service metrics.",
    market: "global",
    year: 2010
  },

  {
    id: "top-rated-plus",
    name: "Top Rated Plus",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "trust",
    desc: "Listing badge for Top Rated Sellers offering expedited handling and superior customer service. Replaced in UK by Premium Service badge.",
    market: ["US", "DE", "FR", "IT", "CA"],
    year: 2013
  },

  {
    id: "ebay-premium-service",
    name: "eBay Premium Service",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "UK-exclusive seller badge replacing Top Rated Plus, indicating exceptional service standards and fast shipping commitment.",
    market: "UK",
    year: 2022,
    renamedFrom: "Top Rated Plus"
  },

  {
    id: "ebay-top-service",
    name: "eBay Top-Service",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Germany-exclusive seller quality badge launched February 2024, replacing eBay Plus seller badges with unified service standards.",
    market: "DE",
    year: 2024
  },

  {
    id: "powerseller",
    name: "PowerSeller",
    type: "trust",
    tier: "program",
    status: "legacy",
    parent: "trust",
    desc: "Deprecated elite seller program fully discontinued June 20, 2021 and replaced by Top Rated Seller designation.",
    market: "global",
    year: 2002,
    renamedTo: "Top Rated Seller"
  },

  // SHIPPING SPEED BADGES
  {
    id: "fast-n-free",
    name: "Fast 'N Free",
    type: "trust",
    tier: "feature",
    status: "legacy",
    parent: "shipping",
    desc: "Shipping badge indicating free fast shipping, being phased out and replaced by specific day-count badges (Free 2-day shipping, etc.).",
    market: "global",
    year: 2016,
    renamedTo: "Free X-day Shipping"
  },

  {
    id: "free-2-day-shipping",
    name: "Free 2-day Shipping",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Shipping badge guaranteeing free delivery within 2 business days, replacing Fast 'N Free with explicit timeframe.",
    market: "global",
    year: 2023
  },

  {
    id: "free-3-day-shipping",
    name: "Free 3-day Shipping",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Shipping badge guaranteeing free delivery within 3 business days, part of Fast 'N Free replacement strategy.",
    market: "global",
    year: 2023
  },

  {
    id: "free-4-day-shipping",
    name: "Free 4-day Shipping",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Shipping badge guaranteeing free delivery within 4 business days, completing the explicit timeframe badge set.",
    market: "global",
    year: 2023
  },

  // ADDITIONAL SHIPPING
  {
    id: "ebay-standard-envelope",
    name: "eBay Standard Envelope",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "US-only economy shipping option for trading cards and small collectibles using USPS stamped envelopes with tracking via barcode scanning.",
    market: "US",
    year: 2021
  },

  {
    id: "ebay-speedpak",
    name: "eBay SpeedPAK",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "Germany seller shipping program and China-to-global logistics solution launched January 2026 with discounted international shipping rates.",
    market: ["DE", "CN"],
    year: 2026
  },

  // OPEN BOX & CONDITIONS
  {
    id: "certified-open-box",
    name: "Certified Open Box",
    type: "category",
    tier: "program",
    status: "current",
    parent: "refurbished",
    desc: "US-exclusive condition designation launched May 2025 for items with opened packaging but unused product, with eBay certification and guarantee.",
    market: "US",
    year: 2025
  },

  {
    id: "open-box",
    name: "Open Box",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "refurbished",
    desc: "Generic item condition indicating opened or damaged packaging with unused or like-new product inside, available in all markets.",
    market: "global",
    year: 2015
  },

  {
    id: "seller-refurbished",
    name: "Seller Refurbished",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "refurbished",
    desc: "Seller-designated refurbished condition being phased out in select categories and replaced by eBay Refurbished certification program.",
    market: "global",
    year: 2010,
    renamedTo: "eBay Refurbished"
  },

  // CIRCULAR ECONOMY
  {
    id: "circular-fashion-fund",
    name: "Circular Fashion Fund",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "impact",
    desc: "Funding initiative supporting resale fashion businesses in US, UK, DE, AU with 2026 expansion to FR, IT, CA. Promotes sustainable fashion and pre-owned marketplace growth.",
    market: ["US", "UK", "DE", "AU"],
    year: 2022
  },

  // PAYMENTS & TRANSACTIONS
  {
    id: "managed-payments",
    name: "Managed Payments",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "payments",
    desc: "Infrastructure-level payment processing system replacing third-party payment processors. Not a consumer-facing brand, but backend payment management platform.",
    market: "global",
    year: 2018
  },

  {
    id: "buy-it-now",
    name: "Buy It Now",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "formats",
    desc: "Fixed-price purchasing option allowing immediate purchase without bidding, available as standalone format or Buy-It-Now price on auctions.",
    market: "global",
    year: 2000
  },

  {
    id: "best-offer",
    name: "Best Offer",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "formats",
    desc: "Negotiation feature enabling buyers to submit price offers on fixed-price listings with seller acceptance, rejection, or counter-offer options.",
    market: "global",
    year: 2005
  },

  {
    id: "ebay-balance",
    name: "eBay Balance",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "payments",
    desc: "Digital wallet feature holding seller proceeds and refunds for future eBay purchases, available in US and UK as 'Spendable Funds' in some regions.",
    market: ["US", "UK"],
    year: 2019
  },

  {
    id: "ebay-mastercard",
    name: "eBay Mastercard",
    type: "category",
    tier: "product",
    status: "legacy",
    parent: "payments",
    desc: "US-only co-branded credit card offering purchase rewards and eBay benefits, program ending March 24, 2026.",
    market: "US",
    year: 2018,
    renamedTo: "discontinued"
  },

  {
    id: "seller-protections",
    name: "Seller Protections",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Global trust program protecting sellers from certain fraudulent buyer claims, chargebacks, and payment disputes when following eBay policies.",
    market: "global",
    year: 2008
  },

  {
    id: "immediate-payment-required",
    name: "Immediate Payment Required",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "payments",
    desc: "Listing option requiring buyers to pay immediately upon purchase commitment, preventing unpaid item cases and streamlining checkout.",
    market: "global",
    year: 2007
  },

  // EDUCATION & LEARNING
  {
    id: "ebay-academy",
    name: "eBay Academy",
    type: "category",
    tier: "program",
    status: "current",
    parent: "education",
    desc: "Educational platform offering seller training courses, webinars, and certification programs. Global brand with no market translations.",
    market: "global",
    year: 2019
  },

  // PARTNERSHIPS & INTEGRATIONS
  {
    id: "goldin-auctions",
    name: "Goldin Auctions",
    type: "category",
    tier: "program",
    status: "current",
    parent: "verticals",
    desc: "Partnership integration bringing Goldin's high-value sports collectibles auctions to eBay platform. Global brand name with no translations.",
    market: "global",
    year: 2023
  }
];
