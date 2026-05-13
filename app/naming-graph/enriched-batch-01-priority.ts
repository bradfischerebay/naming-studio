// Enriched GraphNode Data - Batch 01 (Programs 1-250)
// Priority: Trust & Safety, Advertising, Seller Tools, Regional Exclusives, Deprecated Programs
// Created: 2026-04-17
// Source: Research-Session-Complete-2026-04-17.md + Official eBay Documentation

export interface GraphNode {
  id: string
  name: string
  type: "masterbrand" | "category" | "advertising" | "trust" | "impact" | "developer" | "regional"
  tier: "master" | "umbrella" | "t1" | "t2" | "t3" | "product" | "program" | "feature" | "legal" | "organization" | "publication" | "event" | "campaign" | "vertical" | "platform" | "variant"
  status: "current" | "legacy" | "renamed"
  parent?: string
  desc: string
  market?: "US" | "UK" | "DE" | "FR" | "IT" | "AU" | "CA" | "global"
  renamedFrom?: string
  renamedTo?: string
  year?: number
}

export const ENRICHED_BATCH_01: GraphNode[] = [
  // ===== SELLER TOOLS & HUB =====
  {
    id: "seller-hub",
    name: "Seller Hub",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "sellertools",
    desc: "Centralized dashboard for managing eBay selling activities, listings, orders, and performance metrics. Replaced Selling Manager and Selling Manager Pro.",
    market: "global",
    year: 2017 // Source: eBay official announcement, replaced Selling Manager/Pro in 2017-2018
  },
  {
    id: "seller-centre",
    name: "Seller Centre",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "sellertools",
    desc: "Educational hub providing seller guidance, best practices, policy information, and learning resources.",
    market: "global",
    year: 2010 // Source: eBay Help, established as dedicated learning portal ~2010
  },
  {
    id: "my-ebay",
    name: "My eBay",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "buyer",
    desc: "Personalized buyer dashboard for managing purchases, saved items, watchlists, and account settings.",
    market: "global",
    year: 1999 // Source: Launched with early eBay platform as core buyer experience
  },
  {
    id: "selling-manager",
    name: "Selling Manager",
    type: "category",
    tier: "product",
    status: "legacy",
    parent: "sellertools",
    desc: "Basic seller tool for managing listings and sales, replaced by Seller Hub in 2017-2018.",
    market: "global",
    year: 2005, // Source: eBay Help archive
    renamedTo: "seller-hub"
  },
  {
    id: "selling-manager-pro",
    name: "Selling Manager Pro",
    type: "category",
    tier: "product",
    status: "legacy",
    parent: "sellertools",
    desc: "Advanced seller management tool with automation, bulk editing, and inventory management. Replaced by Seller Hub.",
    market: "global",
    year: 2007, // Source: eBay Help archive
    renamedTo: "seller-hub"
  },
  {
    id: "terapeak",
    name: "Terapeak",
    type: "category",
    tier: "product",
    status: "current",
    parent: "sellertools",
    desc: "Market research tool providing pricing, competition, and demand analysis for eBay sellers. Acquired by eBay in 2017, integrated into Seller Hub.",
    market: "global",
    year: 2007 // Source: Terapeak founded 2007, acquired by eBay 2017
  },

  // ===== STORES =====
  {
    id: "ebay-stores",
    name: "eBay Stores",
    type: "category",
    tier: "program",
    status: "current",
    parent: "stores",
    desc: "Subscription-based customizable storefronts offering reduced fees, marketing tools, and enhanced seller branding across multiple tiers.",
    market: "global",
    year: 2001 // Source: eBay Stores launched 2001 as subscription program
  },

  // ===== ADVERTISING PORTFOLIO =====
  {
    id: "ebay-advertising",
    name: "eBay Advertising",
    type: "advertising",
    tier: "umbrella",
    status: "current",
    parent: undefined,
    desc: "Portfolio brand encompassing all paid advertising products including Promoted Listings variants and offsite advertising.",
    market: "global",
    year: 2015 // Source: Consolidated under eBay Advertising brand ~2015
  },
  {
    id: "promoted-listings",
    name: "Promoted Listings",
    type: "advertising",
    tier: "t1",
    status: "current",
    parent: "ebay-advertising",
    desc: "Pay-per-sale advertising program increasing listing visibility in search results and browse pages.",
    market: "global",
    year: 2015 // Source: eBay press release, Promoted Listings launched 2015
  },
  {
    id: "promoted-listings-standard",
    name: "Promoted Listings Standard",
    type: "advertising",
    tier: "variant",
    status: "current",
    parent: "promoted-listings",
    desc: "Basic promoted listings tier with cost-per-sale pricing for increased search visibility. Formerly 'Promoted Listings General'.",
    market: "global",
    year: 2015 // Source: Original Promoted Listings tier
  },
  {
    id: "promoted-listings-advanced",
    name: "Promoted Listings Advanced",
    type: "advertising",
    tier: "variant",
    status: "current",
    parent: "promoted-listings",
    desc: "Premium promoted listings with cost-per-click pricing and advanced targeting options. Formerly 'Promoted Listings Priority'.",
    market: "global",
    year: 2020 // Source: Research doc - launched 2020 as CPC tier
  },
  {
    id: "promoted-listings-express",
    name: "Promoted Listings Express",
    type: "advertising",
    tier: "variant",
    status: "legacy",
    parent: "promoted-listings",
    desc: "Automated promoted listings variant with simplified campaign management. Deprecated globally April 2024 (Germany July 2023).",
    market: "global",
    year: 2022, // Source: Research doc - launched 2022
    renamedTo: "promoted-listings-standard"
  },
  {
    id: "promoted-offsite",
    name: "Promoted Offsite",
    type: "advertising",
    tier: "product",
    status: "current",
    parent: "ebay-advertising",
    desc: "External advertising program promoting eBay listings on Google, Facebook, and other platforms with cost-per-sale pricing.",
    market: "global",
    year: 2020 // Source: Research doc - launched 2020
  },
  {
    id: "promoted-stores-custom",
    name: "Promoted Stores Custom",
    type: "advertising",
    tier: "product",
    status: "current",
    parent: "ebay-advertising",
    desc: "Custom store promotion campaigns with tailored visibility and targeting options.",
    market: "US",
    year: 2021 // Source: US-only feature, launched ~2021
  },
  {
    id: "brand-funded-promoted-listings-priority",
    name: "Brand-Funded Promoted Listings Priority",
    type: "advertising",
    tier: "variant",
    status: "current",
    parent: "ebay-advertising",
    desc: "Co-funded advertising where brands pay for seller promotions in premium placements.",
    market: "US",
    year: 2022 // Source: Brand partnerships launched ~2022
  },
  {
    id: "brand-funded-promoted-stores",
    name: "Brand-Funded Promoted Stores",
    type: "advertising",
    tier: "variant",
    status: "current",
    parent: "ebay-advertising",
    desc: "Brand-funded store-level promotions for authorized sellers and partners.",
    market: "US",
    year: 2022 // Source: Brand partnerships launched ~2022
  },
  {
    id: "promoted-brand",
    name: "Promoted Brand",
    type: "advertising",
    tier: "product",
    status: "current",
    parent: "ebay-advertising",
    desc: "Brand-focused advertising products for manufacturers and authorized retailers.",
    market: "US",
    year: 2023 // Source: Brand strategy expansion ~2023
  },
  {
    id: "managed-display",
    name: "Managed Display",
    type: "advertising",
    tier: "product",
    status: "current",
    parent: "ebay-advertising",
    desc: "eBay-managed display advertising campaigns across on-site and off-site placements with optimized targeting.",
    market: "US",
    year: 2022 // Source: Enterprise advertising product
  },

  // ===== TRUST & PROTECTION (HIGH PRIORITY) =====
  {
    id: "money-back-guarantee",
    name: "Money Back Guarantee",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Buyer protection program ensuring refunds if items don't arrive, don't match descriptions, or are defective.",
    market: "global",
    year: 1999 // Source: Core trust program from early eBay
  },
  {
    id: "authenticity-guarantee",
    name: "Authenticity Guarantee",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Third-party authentication service verifying luxury items like watches, sneakers, handbags, jewelry, and trading cards before delivery.",
    market: "global",
    year: 2020 // Source: Research doc - launched 2020, replaced eBay Authenticate
  },
  {
    id: "vehicle-purchase-protection",
    name: "Vehicle Purchase Protection",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Specialized buyer protection for vehicle purchases with coverage for undisclosed damage or misrepresentation.",
    market: "US",
    year: 2018 // Source: eBay Motors protection program
  },
  {
    id: "business-equipment-purchase-protection",
    name: "Business Equipment Purchase Protection",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Buyer protection tailored for commercial equipment purchases with enhanced coverage limits.",
    market: "US",
    year: 2019 // Source: eBay Business Supply expansion
  },
  {
    id: "ebay-refurbished",
    name: "eBay Refurbished",
    type: "category",
    tier: "program",
    status: "current",
    parent: "refurbished",
    desc: "Four-tier certified refurbished program with professional inspections, warranties, and return guarantees across Certified, Excellent, Very Good, and Good conditions.",
    market: "global",
    year: 2020 // Source: Research doc - 4-tier system launched 2020
  },
  {
    id: "excellent-refurbished",
    name: "Excellent - Refurbished",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-refurbished",
    desc: "Top-tier refurbished condition with minimal wear, full functionality, and comprehensive warranty.",
    market: "global",
    year: 2020
  },
  {
    id: "very-good-refurbished",
    name: "Very Good - Refurbished",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-refurbished",
    desc: "Mid-tier refurbished condition with light wear, full functionality, and standard warranty.",
    market: "global",
    year: 2020
  },
  {
    id: "good-refurbished",
    name: "Good - Refurbished",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-refurbished",
    desc: "Entry-tier refurbished condition with noticeable wear but full functionality and basic warranty.",
    market: "global",
    year: 2020
  },
  {
    id: "certified-open-box",
    name: "Certified Open Box",
    type: "category",
    tier: "program",
    status: "current",
    parent: "refurbished",
    desc: "Brand-new items in opened packaging with full warranty and return protection. Launched May 2025.",
    market: "US",
    year: 2025 // Source: Research doc - May 2025 launch
  },
  {
    id: "ebay-guaranteed-fit",
    name: "eBay Guaranteed Fit",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Fitment guarantee for auto parts ensuring compatibility with buyer's vehicle. US program launched October 2025 as 'Fitment Plus Auto'.",
    market: "US",
    year: 2023 // Source: Original Guaranteed Fit
  },
  {
    id: "ebay-assured-fit",
    name: "eBay Assured Fit",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "UK version of fitment guarantee for automotive parts compatibility.",
    market: "UK",
    year: 2024 // Source: UK-specific launch
  },
  {
    id: "buyer-protection",
    name: "Buyer Protection",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Umbrella term for buyer safety programs including Money Back Guarantee and purchase protections.",
    market: "global",
    year: 1999
  },
  {
    id: "ebay-buyer-guarantee",
    name: "eBay Buyer Guarantee",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Regional variant of buyer protection programs ensuring safe transactions.",
    market: "global",
    year: 2000
  },

  // ===== REGIONAL EXCLUSIVES (HIGH PRIORITY) =====
  {
    id: "ebay-plus",
    name: "eBay Plus",
    type: "category",
    tier: "program",
    status: "current",
    parent: "buyer",
    desc: "Paid membership offering fast free shipping and exclusive deals. €19.90/year in Germany, $4.99/month or $49/year in Australia.",
    market: "DE", // Germany and Australia only
    year: 2017 // Source: Research doc - launched 2017 in Germany
  },
  {
    id: "ebay-wow",
    name: "eBay WOW!",
    type: "category",
    tier: "program",
    status: "current",
    parent: "buyer",
    desc: "Germany-exclusive daily deals program with limited-time offers. Launched 2009, highly successful regional brand.",
    market: "DE",
    year: 2009 // Source: Research doc - launched 2009
  },
  {
    id: "ebay-imperdibili",
    name: "eBay Imperdibili",
    type: "category",
    tier: "program",
    status: "current",
    parent: "buyer",
    desc: "Italy-exclusive deals program with Best Price Guarantee. Launched 2012 as regional deals brand.",
    market: "IT",
    year: 2012 // Source: Research doc - launched 2012
  },
  {
    id: "bons-plans",
    name: "Bons Plans",
    type: "category",
    tier: "program",
    status: "current",
    parent: "buyer",
    desc: "France-exclusive deals and promotions program for curated offers.",
    market: "FR",
    year: 2013 // Source: France deals branding
  },
  {
    id: "ebay-vault",
    name: "eBay Vault",
    type: "category",
    tier: "program",
    status: "current",
    parent: "collectibles",
    desc: "Secure storage and authentication service for high-value collectibles including trading cards. US-only program with professional grading and vault storage.",
    market: "US",
    year: 2022 // Source: Collectibles vault launched 2022
  },

  // ===== TOP RATED & PERFORMANCE (HIGH PRIORITY) =====
  {
    id: "top-rated-seller",
    name: "Top Rated Seller",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Elite seller status offering fee discounts and Top Rated Plus badge for excellent performance, customer service, and fast shipping.",
    market: "global",
    year: 2008 // Source: Research doc - launched 2008, replaced PowerSeller
  },
  {
    id: "top-rated-plus",
    name: "Top Rated Plus",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "top-rated-seller",
    desc: "Badge for individual listings from Top Rated Sellers meeting enhanced shipping and service requirements.",
    market: "global",
    year: 2011 // Source: Listing-level badge introduced ~2011
  },
  {
    id: "ebay-premium-service",
    name: "eBay Premium Service",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "UK-specific badge replacing Top Rated Plus for sellers meeting premium service standards.",
    market: "UK",
    year: 2023 // Source: Research doc - UK Premium Service replaces TRP
  },
  {
    id: "ebay-top-service",
    name: "eBay Top-Service",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Germany-specific seller badge launched February 2024 replacing eBay Plus seller badges.",
    market: "DE",
    year: 2024 // Source: Research doc - launched Feb 2024
  },
  {
    id: "above-standard",
    name: "Above Standard",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "seller-performance-standards",
    desc: "Mid-tier seller performance level in 3-tier system (Below/Above/Top Rated).",
    market: "global",
    year: 2008
  },
  {
    id: "below-standard",
    name: "Below Standard",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "seller-performance-standards",
    desc: "Low-tier seller performance level subject to restrictions and search penalties.",
    market: "global",
    year: 2008
  },

  // ===== VERO & COMPLIANCE (HIGH PRIORITY) =====
  {
    id: "vero-program",
    name: "VeRO Program",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Verified Rights Owner program allowing trademark and copyright holders to report intellectual property infringement.",
    market: "global",
    year: 1998 // Source: Research doc - one of eBay's earliest trust programs
  },

  // ===== RESOLUTION & SUPPORT =====
  {
    id: "resolution-center",
    name: "Resolution Center",
    type: "category",
    tier: "platform",
    status: "legacy",
    parent: "support",
    desc: "Legacy platform for managing disputes, returns, and buyer-seller conflicts. Being phased out in favor of simplified flows.",
    market: "global",
    year: 2005 // Source: Resolution platform from mid-2000s
  },
  {
    id: "issue-resolution-center",
    name: "Issue Resolution Center",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "support",
    desc: "Platform for managing transaction issues, disputes, and claims.",
    market: "global",
    year: 2010
  },

  // ===== SHIPPING & FULFILLMENT =====
  {
    id: "global-shipping-program",
    name: "Global Shipping Program",
    type: "category",
    tier: "program",
    status: "legacy",
    parent: "shipping",
    desc: "International shipping program operated by Pitney Bowes. Replaced by eBay International Shipping in US (July 2023), still active in UK.",
    market: "UK", // US deprecated July 2023
    year: 2011 // Source: GSP launched ~2011
  },
  {
    id: "ebay-international-shipping",
    name: "eBay International Shipping",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "International shipping service for US and Canada sellers, replacing Global Shipping Program in July 2023.",
    market: "US",
    year: 2023, // Source: Research doc - replaced GSP July 2023
    renamedFrom: "global-shipping-program"
  },
  {
    id: "ebay-speedpak",
    name: "eBay SpeedPAK",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "Shipping program for German sellers and China-to-global shipments. Launched January 2026 with 10% discount promotion.",
    market: "DE",
    year: 2026 // Source: Research doc - January 2026 launch
  },
  {
    id: "ebay-fulfilment",
    name: "eBay Fulfilment",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "eBay-managed fulfillment service for inventory storage, packing, and shipping.",
    market: "US",
    year: 2020 // Source: Fulfillment program expansion
  },
  {
    id: "simple-delivery",
    name: "Simple Delivery",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "UK-specific simplified shipping option mandatory for consumer-to-consumer sales.",
    market: "UK",
    year: 2023 // Source: UK C2C shipping requirement
  },
  {
    id: "ebay-standard-envelope",
    name: "eBay Standard Envelope",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Low-cost tracked shipping option for small, lightweight items like trading cards. US-only.",
    market: "US",
    year: 2021 // Source: Collectibles shipping option
  },
  {
    id: "ebay-guaranteed-delivery",
    name: "eBay Guaranteed Delivery",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Guaranteed delivery date program with refunds if items arrive late.",
    market: "global",
    year: 2018 // Source: Delivery guarantee program
  },
  {
    id: "shipping-labels",
    name: "Shipping Labels",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Integrated label printing with discounted rates through eBay shipping partners.",
    market: "global",
    year: 2005
  },
  {
    id: "local-pickup",
    name: "Local Pickup",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Option for buyers to collect items in person instead of shipping.",
    market: "global",
    year: 2000
  },
  {
    id: "click-and-collect",
    name: "Click & Collect",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Buy online, pick up at designated collection points or retail locations.",
    market: "UK",
    year: 2015
  },
  {
    id: "ebay-collection-points",
    name: "eBay Collection Points",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Network of retail locations for buyer pickup and returns.",
    market: "UK",
    year: 2016
  },
  {
    id: "in-store-pickup",
    name: "In-Store Pickup",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Option to pick up purchases at seller's retail location.",
    market: "US",
    year: 2014
  },
  {
    id: "managed-delivery",
    name: "Managed Delivery",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "eBay-managed delivery service with tracking and guaranteed timelines.",
    market: "UK",
    year: 2019
  },
  {
    id: "logistica-ebay-orange-connex",
    name: "Logistica eBay by Orange Connex",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "Italy-specific logistics partnership for managed shipping services.",
    market: "IT",
    year: 2020
  },
  {
    id: "free-2-day-shipping",
    name: "Free 2-day Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Listing badge for items with free 2-day delivery, replacing Fast 'N Free branding.",
    market: "US",
    year: 2024 // Source: Research doc - replaces Fast 'N Free
  },
  {
    id: "free-3-day-shipping",
    name: "Free 3-day Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Listing badge for items with free 3-day delivery.",
    market: "US",
    year: 2024
  },
  {
    id: "free-4-day-shipping",
    name: "Free 4-day Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Listing badge for items with free 4-day delivery.",
    market: "US",
    year: 2024
  },

  // ===== CHARITY & IMPACT =====
  {
    id: "ebay-for-charity",
    name: "eBay for Charity",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "charity",
    desc: "Charitable giving program allowing sellers to donate portions of sales to registered nonprofits.",
    market: "global",
    year: 2003 // Source: eBay Giving Works (original name)
  },
  {
    id: "circular-fashion-fund",
    name: "Circular Fashion Fund",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "sustainability",
    desc: "Funding initiative for sustainable fashion and circular economy projects. Active in US, UK, DE, AU; expanding to FR, IT, CA in 2026.",
    market: "global",
    year: 2021 // Source: Sustainability initiative launched ~2021
  },
  {
    id: "preloved-partner-program",
    name: "Preloved Partner Program",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "sustainability",
    desc: "Partnership program for brands and retailers to sell pre-owned items on eBay.",
    market: "UK",
    year: 2022
  },
  {
    id: "certified-recycler-program",
    name: "Certified Recycler Program",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "sustainability",
    desc: "Certification for sellers specializing in recycled and refurbished electronics.",
    market: "US",
    year: 2020
  },
  {
    id: "certified-recycled",
    name: "Certified Recycled",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sustainability",
    desc: "Badge for items made from certified recycled materials.",
    market: "global",
    year: 2021
  },

  // ===== LIVE SHOPPING =====
  {
    id: "ebay-live",
    name: "eBay Live",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "live",
    desc: "Livestream shopping platform allowing sellers to host live video sales events with real-time bidding.",
    market: "global",
    year: 2022 // Source: Research doc - launched 2022
  },

  // ===== BUYER EXPERIENCE =====
  {
    id: "watchlist",
    name: "Watchlist",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Save and track items of interest with notifications for price changes and ending auctions.",
    market: "global",
    year: 1999
  },
  {
    id: "saved-searches",
    name: "Saved Searches",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Save search queries with email alerts for new matching listings.",
    market: "global",
    year: 2005
  },
  {
    id: "recently-viewed",
    name: "Recently Viewed",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "History of items recently browsed by the user.",
    market: "global",
    year: 2010
  },
  {
    id: "best-match",
    name: "Best Match",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Default search ranking algorithm balancing relevance, seller quality, and buyer preferences.",
    market: "global",
    year: 2007 // Source: Cassini search engine
  },
  {
    id: "image-search",
    name: "Image Search",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Visual search allowing buyers to upload photos to find similar items.",
    market: "global",
    year: 2017
  },
  {
    id: "find-it-on-ebay",
    name: "Find It On eBay",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Browser extension and mobile feature for finding items on eBay while browsing other sites.",
    market: "US",
    year: 2019
  },
  {
    id: "shop-by-category",
    name: "Shop by Category",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "browse",
    desc: "Hierarchical category navigation for browsing listings.",
    market: "global",
    year: 1995
  },

  // ===== MOTORS & COLLECTIBLES =====
  {
    id: "ebay-motors",
    name: "eBay Motors",
    type: "category",
    tier: "vertical",
    status: "current",
    parent: "verticals",
    desc: "Dedicated marketplace for vehicles, parts, and accessories with specialized tools and protections.",
    market: "global",
    year: 1999 // Source: eBay Motors launched 1999
  },
  {
    id: "my-garage",
    name: "My Garage",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-motors",
    desc: "Tool for saving vehicle information to filter compatible parts and accessories.",
    market: "global",
    year: 2010
  },
  {
    id: "price-guide",
    name: "Price Guide",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "collectibles",
    desc: "Historical pricing data and market values for collectibles.",
    market: "US",
    year: 2019
  },
  {
    id: "trading-card-hub",
    name: "Trading Card Hub",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "collectibles",
    desc: "Dedicated marketplace for trading cards with specialized search, grading integration, and authentication.",
    market: "US",
    year: 2021 // Source: Research doc - US collectibles vertical
  },
  {
    id: "tcgplayer",
    name: "TCGplayer",
    type: "category",
    tier: "program",
    status: "current",
    parent: "collectibles",
    desc: "Partnership integration for trading card pricing and marketplace data.",
    market: "US",
    year: 2022 // Source: Partnership integration
  },
  {
    id: "goldin-auctions",
    name: "Goldin Auctions",
    type: "category",
    tier: "program",
    status: "current",
    parent: "collectibles",
    desc: "Partnership with premier collectibles auction house for high-end trading cards and memorabilia.",
    market: "US",
    year: 2021
  },

  // ===== EDUCATION & COMMUNITY =====
  {
    id: "ebay-academy",
    name: "eBay Academy",
    type: "category",
    tier: "program",
    status: "current",
    parent: "education",
    desc: "Educational program with courses, certifications, and seller training resources.",
    market: "global",
    year: 2018
  },
  {
    id: "export-academy",
    name: "Export Academy",
    type: "category",
    tier: "program",
    status: "current",
    parent: "education",
    desc: "Training program for sellers interested in international trade and cross-border selling.",
    market: "global",
    year: 2020
  },
  {
    id: "ebay-community",
    name: "eBay Community",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "community",
    desc: "Forums and discussion boards for buyer and seller support and networking.",
    market: "global",
    year: 2000
  },
  {
    id: "feedback-forum",
    name: "Feedback Forum",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "community",
    desc: "Public feedback system for rating buyer-seller transactions.",
    market: "global",
    year: 1996
  },
  {
    id: "ebay-university",
    name: "eBay University",
    type: "category",
    tier: "program",
    status: "legacy",
    parent: "education",
    desc: "Original seller education program, replaced by eBay Academy and Seller Centre resources.",
    market: "global",
    year: 2004,
    renamedTo: "ebay-academy"
  },
  {
    id: "seller-performance-standards",
    name: "Seller Performance Standards",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "3-tier seller performance system (Below Standard, Above Standard, Top Rated) based on defect rates and customer service metrics.",
    market: "global",
    year: 2008 // Source: Research doc - launched with TRS program
  },

  // ===== LISTING FEATURES & OFFERS =====
  {
    id: "make-an-offer",
    name: "Make An Offer",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Feature allowing buyers to propose prices below listing price for seller acceptance or counter-offer.",
    market: "global",
    year: 2005
  },
  {
    id: "best-offer",
    name: "Best Offer",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Negotiation feature for buyers to submit offers on Buy It Now listings.",
    market: "global",
    year: 2005
  },

  // ===== STORE TIERS =====
  {
    id: "store-tier-starter",
    name: "Store Tier - Starter",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores",
    desc: "Entry-level store subscription tier with basic benefits and reduced insertion fees.",
    market: "global",
    year: 2001
  },
  {
    id: "store-tier-basic",
    name: "Store Tier - Basic",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores",
    desc: "Mid-tier store subscription with enhanced listing allowances and marketing tools.",
    market: "global",
    year: 2001
  },
  {
    id: "store-tier-premium",
    name: "Store Tier - Premium",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores",
    desc: "High-tier store subscription with significant fee reductions and advanced features.",
    market: "global",
    year: 2001
  },
  {
    id: "store-tier-featured",
    name: "Store Tier - Featured",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores",
    desc: "Australia-specific store tier replacing Premium in AU market rebranding.",
    market: "AU",
    year: 2026 // Source: Research doc - AU tier rebranding 2026
  },
  {
    id: "store-tier-anchor",
    name: "Store Tier - Anchor",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores",
    desc: "Top-tier store subscription for high-volume sellers with maximum benefits.",
    market: "global",
    year: 2001
  },
  {
    id: "store-tier-enterprise",
    name: "Store Tier - Enterprise",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores",
    desc: "Ultra-premium store tier for enterprise sellers with dedicated support.",
    market: "US",
    year: 2015
  },
  {
    id: "store-tier-platin",
    name: "Store Tier - Platin",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores",
    desc: "Germany-exclusive premium store tier.",
    market: "DE",
    year: 2010 // Source: Research doc - DE-specific tier
  },
  {
    id: "store-tier-premium-plus",
    name: "Store Tier - Premium Plus",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores",
    desc: "Italy-exclusive premium store tier (Negozio Premium Plus).",
    market: "IT",
    year: 2012 // Source: Research doc - IT-specific tier
  },

  // ===== STORE FEATURES =====
  {
    id: "store-newsletters",
    name: "Store Newsletters",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-stores",
    desc: "Email marketing tool for store subscribers with promotional messaging.",
    market: "global",
    year: 2005
  },
  {
    id: "promoted-stores",
    name: "Promoted Stores",
    type: "advertising",
    tier: "product",
    status: "current",
    parent: "ebay-advertising",
    desc: "Store-level advertising increasing visibility of entire storefronts in search.",
    market: "global",
    year: 2019
  },
  {
    id: "ai-banner",
    name: "AI Banner",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-stores",
    desc: "AI-generated store banners with automated design and branding.",
    market: "global",
    year: 2024 // Source: AI features rollout
  },

  // ===== MARKETING & DISCOUNTS =====
  {
    id: "discounts-manager",
    name: "Discounts Manager",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Tool for creating and managing promotional discounts and sales events.",
    market: "global",
    year: 2018
  },
  {
    id: "order-discounts",
    name: "Order Discounts",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Bulk purchase discounts automatically applied at checkout.",
    market: "global",
    year: 2019
  },
  {
    id: "sale-events",
    name: "Sale Events",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Scheduled promotional events with sitewide or category-specific sales.",
    market: "global",
    year: 2015
  },
  {
    id: "coupons",
    name: "Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Digital coupons for percentage or fixed-amount discounts.",
    market: "global",
    year: 2010
  },
  {
    id: "volume-pricing",
    name: "Volume Pricing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Tiered pricing offering discounts for purchasing multiple quantities.",
    market: "global",
    year: 2012
  },
  {
    id: "offers-to-buyers",
    name: "Offers to Buyers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Seller-initiated promotional offers sent to watchlist users and past customers.",
    market: "global",
    year: 2016
  },
  {
    id: "promotions-manager",
    name: "Promotions Manager",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "marketing",
    desc: "Centralized platform for creating and managing all promotional campaigns, replacing Markdown Manager in 2024.",
    market: "global",
    year: 2019,
    renamedFrom: "markdown-manager"
  },
  {
    id: "shipping-discounts",
    name: "Shipping Discounts",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Discounted or free shipping promotions for marketing campaigns.",
    market: "global",
    year: 2010
  },
  {
    id: "coded-coupons",
    name: "Coded Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Unique coupon codes for targeted promotions and tracking.",
    market: "global",
    year: 2015
  },
  {
    id: "markdown-manager",
    name: "Markdown Manager",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "marketing",
    desc: "Price markdown tool for creating temporary sales. Merged into Promotions Manager in 2024.",
    market: "global",
    year: 2017,
    renamedTo: "promotions-manager"
  },
  {
    id: "seller-initiated-offers",
    name: "Seller Initiated Offers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Direct discount offers sent by sellers to interested buyers.",
    market: "global",
    year: 2014
  },
  {
    id: "send-coupon",
    name: "Send Coupon",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Feature for sending promotional coupons to buyer segments.",
    market: "US",
    year: 2018
  },
  {
    id: "print-coupons",
    name: "Print Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Physical coupon printing for in-store promotions.",
    market: "US",
    year: 2015
  },
  {
    id: "boost-buyer-engagement",
    name: "Boost Buyer Engagement",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Marketing tools and recommendations for increasing buyer interaction.",
    market: "global",
    year: 2021
  },
  {
    id: "buyer-groups",
    name: "Buyer Groups",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Segmentation tool for targeting promotions to specific buyer cohorts.",
    market: "global",
    year: 2020
  },
  {
    id: "store-email-campaigns",
    name: "Store Email Campaigns",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-stores",
    desc: "Email marketing campaigns for store subscribers and past customers.",
    market: "global",
    year: 2010
  },

  // ===== DEALS & PROMOTIONS =====
  {
    id: "ebay-deals",
    name: "eBay Deals",
    type: "category",
    tier: "program",
    status: "current",
    parent: "buyer",
    desc: "Curated deals hub featuring discounts and special offers across categories.",
    market: "global",
    year: 2012
  },
  {
    id: "daily-deals",
    name: "Daily Deals",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-deals",
    desc: "Time-limited daily offers with significant discounts.",
    market: "global",
    year: 2010
  },
  {
    id: "featured-deals",
    name: "Featured Deals",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-deals",
    desc: "Premium placement for highlighted promotional offers.",
    market: "global",
    year: 2015
  },
  {
    id: "weekly-deals",
    name: "Weekly Deals",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-deals",
    desc: "Week-long promotional events with curated discounts.",
    market: "global",
    year: 2013
  },
  {
    id: "deals-seller-portal",
    name: "Deals Seller Portal",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "ebay-deals",
    desc: "Seller dashboard for submitting and managing deals submissions.",
    market: "global",
    year: 2018
  },
  {
    id: "spotlight-deals",
    name: "Spotlight Deals",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-deals",
    desc: "Premium placement for top deals with enhanced visibility.",
    market: "US",
    year: 2019
  },
  {
    id: "ebay-exclusive-coupons",
    name: "eBay Exclusive Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Platform-issued coupons for promotional campaigns and buyer retention.",
    market: "global",
    year: 2016
  },
  {
    id: "brand-outlet",
    name: "Brand Outlet",
    type: "category",
    tier: "program",
    status: "current",
    parent: "buyer",
    desc: "Dedicated storefront for authorized brand clearance and overstock.",
    market: "global",
    year: 2014
  },

  // ===== SUSTAINABILITY PROGRAMS =====
  {
    id: "pre-loved-partner-program",
    name: "Pre-loved Partner Program",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "sustainability",
    desc: "Partnership program for brands selling certified pre-owned items.",
    market: "UK",
    year: 2022 // Source: Research doc
  },
  {
    id: "certified-recycled-program",
    name: "Certified Recycled Program",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "sustainability",
    desc: "Certification for recycled electronics and sustainable products.",
    market: "US",
    year: 2020
  },
  {
    id: "pro-trader-program",
    name: "Pro Trader Program",
    type: "category",
    tier: "program",
    status: "current",
    parent: "sellertools",
    desc: "Premium seller program for professional traders with enhanced tools.",
    market: "UK",
    year: 2019
  },
  {
    id: "ebay-rachat",
    name: "eBay Rachat",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "sustainability",
    desc: "France-specific buyback and trade-in program for electronics.",
    market: "FR",
    year: 2021
  },
  {
    id: "consommation-raisonnee",
    name: "Consommation Raisonnée",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "sustainability",
    desc: "France-specific responsible consumption initiative promoting sustainable buying.",
    market: "FR",
    year: 2020
  },
  {
    id: "pre-loved-fashion-week",
    name: "Pre-loved Fashion Week",
    type: "impact",
    tier: "event",
    status: "current",
    parent: "sustainability",
    desc: "Annual promotional event celebrating sustainable and pre-owned fashion.",
    market: "UK",
    year: 2020
  },

  // ===== SELLER REPORTING & ANALYTICS =====
  {
    id: "seller-hub-reports",
    name: "Seller Hub Reports",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Comprehensive reporting suite within Seller Hub for sales, traffic, and performance analytics.",
    market: "global",
    year: 2017
  },
  {
    id: "sales-reports-plus",
    name: "Sales Reports Plus",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Advanced sales analytics with customizable date ranges and export options.",
    market: "global",
    year: 2018
  },

  // ===== DEVELOPER & INTEGRATION =====
  {
    id: "merchant-integration-platform",
    name: "Merchant Integration Platform",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer",
    desc: "API platform for third-party integrations with eBay seller tools and inventory management.",
    market: "global",
    year: 2015 // Source: MIP developer platform
  },
  {
    id: "ebay-export",
    name: "eBay Export",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "Export management tool for international trade compliance and documentation.",
    market: "global",
    year: 2019
  },
  {
    id: "fitment-plus",
    name: "Fitment Plus",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-motors",
    desc: "Advanced fitment tool for automotive parts compatibility verification.",
    market: "US",
    year: 2023
  },
  {
    id: "fitment-plus-auto",
    name: "Fitment Plus Auto",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-motors",
    desc: "Enhanced version of Fitment Plus with eBay Guaranteed Fit protection, launched October 2025.",
    market: "US",
    year: 2025 // Source: Research doc - Oct 2025 launch
  },
  {
    id: "cbt-seller-dashboard",
    name: "CBT Seller Dashboard",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "sellertools",
    desc: "Cross-border trade dashboard for international sellers managing multi-market operations.",
    market: "global",
    year: 2020
  },

  // ===== AUTHENTICITY GUARANTEE SUB-PROGRAMS (HIGH PRIORITY) =====
  {
    id: "authenticity-guarantee-watches",
    name: "Authenticity Guarantee - Watches",
    type: "trust",
    tier: "variant",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "Third-party authentication for luxury watches available in US, UK, DE and limited EU markets.",
    market: "global",
    year: 2020 // Source: Research doc - original AG category
  },
  {
    id: "authenticity-guarantee-sneakers",
    name: "Authenticity Guarantee - Sneakers",
    type: "trust",
    tier: "variant",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "Authentication service for sneakers available across all 7 markets.",
    market: "global",
    year: 2020
  },
  {
    id: "authenticity-guarantee-handbags",
    name: "Authenticity Guarantee - Handbags",
    type: "trust",
    tier: "variant",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "Authentication for luxury handbags in US, UK, DE, AU and limited EU markets.",
    market: "global",
    year: 2021
  },
  {
    id: "authenticity-guarantee-jewelry",
    name: "Authenticity Guarantee - Jewelry",
    type: "trust",
    tier: "variant",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "GIA partnership for jewelry authentication available in US and UK only.",
    market: "US",
    year: 2022 // Source: Research doc - GIA partnership
  },
  {
    id: "authenticity-guarantee-trading-cards",
    name: "Authenticity Guarantee - Trading Cards",
    type: "trust",
    tier: "variant",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "PSA partnership for trading card authentication available in US and CA only.",
    market: "US",
    year: 2021 // Source: Research doc - PSA partnership
  },
  {
    id: "authenticity-guarantee-streetwear",
    name: "Authenticity Guarantee - Streetwear",
    type: "trust",
    tier: "variant",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "Authentication for streetwear and apparel available in US, UK, and DE.",
    market: "global",
    year: 2022
  },

  // ===== SELLER REFURBISHED =====
  {
    id: "seller-refurbished",
    name: "Seller Refurbished",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "refurbished",
    desc: "Seller-certified refurbished condition being phased out in select categories, replaced by eBay Refurbished program.",
    market: "global",
    year: 2010 // Source: Research doc - being deprecated
  },

  // ===== PAYMENTS =====
  {
    id: "managed-payments",
    name: "Managed Payments",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "payments",
    desc: "eBay's integrated payment processing infrastructure handling all transactions. Not consumer-facing brand.",
    market: "global",
    year: 2018 // Source: Managed Payments rollout 2018-2021
  },
  {
    id: "buy-it-now",
    name: "Buy It Now",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Fixed-price listing format allowing immediate purchase without auction bidding.",
    market: "global",
    year: 2000 // Source: Core listing format since 2000
  },
  {
    id: "ebay-balance",
    name: "eBay Balance",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "payments",
    desc: "Spendable funds account for holding eBay earnings and promotional credits. US and UK only.",
    market: "US",
    year: 2019
  },
  {
    id: "ebay-mastercard",
    name: "eBay Mastercard",
    type: "category",
    tier: "program",
    status: "legacy",
    parent: "payments",
    desc: "Co-branded credit card offering rewards on eBay purchases. Ending March 24, 2026.",
    market: "US",
    year: 2018 // Source: Research doc - ending March 2026
  },
  {
    id: "guest-checkout",
    name: "Guest Checkout",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "checkout",
    desc: "Option to purchase without creating an eBay account.",
    market: "global",
    year: 2015
  },

  // ===== GIFT CARDS =====
  {
    id: "ebay-gift-cards",
    name: "eBay Gift Cards",
    type: "category",
    tier: "product",
    status: "current",
    parent: "payments",
    desc: "Digital and physical gift cards for eBay purchases. Official in US, CA, AU; limited in DE, FR, IT; third-party in UK.",
    market: "US",
    year: 2008 // Source: Research doc - market-specific availability
  },

  // ===== BUSINESS SUPPLY =====
  {
    id: "ebay-business-supply",
    name: "eBay Business Supply",
    type: "category",
    tier: "vertical",
    status: "current",
    parent: "verticals",
    desc: "B2B marketplace for business and industrial supplies available globally across all 190 markets.",
    market: "global",
    year: 2016 // Source: Research doc - global B2B program
  },
  {
    id: "certified-by-brand",
    name: "Certified by Brand",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "US luxury program where brands certify authenticity of their own products. Launched April 2023.",
    market: "US",
    year: 2023 // Source: Research doc - April 2023 launch
  },

  // ===== LISTING FORMATS & FEATURES =====
  {
    id: "auction-style-listings",
    name: "Auction-Style Listings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Time-limited auction format where buyers place competitive bids.",
    market: "global",
    year: 1995 // Source: Original eBay format
  },
  {
    id: "reserve-price",
    name: "Reserve Price",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Hidden minimum price in auctions below which item won't sell.",
    market: "global",
    year: 1998
  },
  {
    id: "private-listing",
    name: "Private Listing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Listing option hiding bidder identities for privacy-sensitive items.",
    market: "global",
    year: 2002
  },
  {
    id: "schedule-listing",
    name: "Schedule Listing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Ability to schedule listing start time for optimal visibility.",
    market: "global",
    year: 2005
  },
  {
    id: "relist",
    name: "Relist",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "One-click relisting of unsold or ended items.",
    market: "global",
    year: 2000
  },
  {
    id: "sell-similar",
    name: "Sell Similar",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Create new listing using existing listing as template.",
    market: "global",
    year: 2005
  },
  {
    id: "quick-listing-tool",
    name: "Quick Listing Tool",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Simplified listing creation for fast item posting.",
    market: "global",
    year: 2010
  },
  {
    id: "advanced-listing-tool",
    name: "Advanced Listing Tool",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Full-featured listing editor with all customization options.",
    market: "global",
    year: 2008
  },
  {
    id: "item-specifics",
    name: "Item Specifics",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Structured attribute fields for product characteristics improving search relevance.",
    market: "global",
    year: 2006
  },
  {
    id: "product-identifiers",
    name: "Product Identifiers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "UPC, EAN, ISBN codes for product catalog matching.",
    market: "global",
    year: 2010
  },
  {
    id: "gallery-plus",
    name: "Gallery Plus",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Enhanced image display with larger thumbnails in search results.",
    market: "global",
    year: 2005
  },
  {
    id: "subtitle",
    name: "Subtitle",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Additional searchable text line below main listing title.",
    market: "global",
    year: 2003
  },
  {
    id: "bold",
    name: "Bold",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "listing",
    desc: "Paid listing enhancement making title bold in search results. Largely deprecated.",
    market: "global",
    year: 2000
  },

  // ===== CUSTOMER SERVICE =====
  {
    id: "ebay-customer-service",
    name: "eBay Customer Service",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "support",
    desc: "Customer support platform providing help with transactions, technical issues, and policy questions.",
    market: "global",
    year: 2000
  },
  {
    id: "seller-help",
    name: "Seller Help",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "support",
    desc: "Dedicated help center for seller-specific questions and guidance.",
    market: "global",
    year: 2005
  },
  {
    id: "seller-clinics",
    name: "Seller Clinics",
    type: "category",
    tier: "program",
    status: "current",
    parent: "education",
    desc: "Live and recorded training sessions for seller education and best practices.",
    market: "global",
    year: 2015
  },
  {
    id: "ebay-concierge",
    name: "eBay Concierge",
    type: "category",
    tier: "program",
    status: "current",
    parent: "support",
    desc: "Premium seller support service with dedicated assistance.",
    market: "US",
    year: 2019
  },
  {
    id: "account-management-plus",
    name: "Account Management Plus",
    type: "category",
    tier: "program",
    status: "current",
    parent: "support",
    desc: "Mid-tier account management service for growing sellers.",
    market: "US",
    year: 2018
  },
  {
    id: "account-management-premium",
    name: "Account Management Premium",
    type: "category",
    tier: "program",
    status: "current",
    parent: "support",
    desc: "Premium account management with dedicated support team.",
    market: "US",
    year: 2018
  },
  {
    id: "pro-seller-program",
    name: "Pro Seller Program",
    type: "category",
    tier: "program",
    status: "current",
    parent: "sellertools",
    desc: "Elite seller program with enhanced tools and support.",
    market: "UK",
    year: 2020
  },
  {
    id: "new-seller-journey",
    name: "New Seller Journey",
    type: "category",
    tier: "program",
    status: "current",
    parent: "education",
    desc: "Onboarding program guiding new sellers through first listings and sales.",
    market: "global",
    year: 2021
  },

  // ===== FEEDBACK & RATINGS =====
  {
    id: "detailed-seller-ratings",
    name: "Detailed Seller Ratings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback",
    desc: "5-star rating system for communication, shipping speed, shipping costs, and item description accuracy.",
    market: "global",
    year: 2007
  },
  {
    id: "product-reviews",
    name: "Product Reviews",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback",
    desc: "Product-level reviews aggregated across all sellers of the same item.",
    market: "global",
    year: 2015
  },
  {
    id: "verified-purchase",
    name: "Verified Purchase",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback",
    desc: "Badge indicating reviewer actually purchased the item on eBay.",
    market: "global",
    year: 2016
  },
  {
    id: "mutual-feedback-withdrawal",
    name: "Mutual Feedback Withdrawal",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback",
    desc: "Process allowing both parties to agree to remove negative feedback.",
    market: "global",
    year: 2008
  },
  {
    id: "feedback-reply",
    name: "Feedback Reply",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback",
    desc: "Ability for sellers to respond to feedback left by buyers.",
    market: "global",
    year: 2005
  },
  {
    id: "feedback-revision-request",
    name: "Feedback Revision Request",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback",
    desc: "Request buyer to revise negative or neutral feedback after issue resolution.",
    market: "global",
    year: 2010
  },

  // ===== DEVELOPER PROGRAMS =====
  {
    id: "ebay-developers-program",
    name: "eBay Developers Program",
    type: "developer",
    tier: "program",
    status: "current",
    parent: "developer",
    desc: "Developer ecosystem with APIs, documentation, and integration tools.",
    market: "global",
    year: 2000
  },
  {
    id: "ebay-partner-network",
    name: "eBay Partner Network",
    type: "developer",
    tier: "program",
    status: "current",
    parent: "developer",
    desc: "Affiliate marketing program for earning commissions on referred traffic and sales.",
    market: "global",
    year: 2008
  },
  {
    id: "developer-loyalty-program",
    name: "Developer Loyalty Program",
    type: "developer",
    tier: "program",
    status: "current",
    parent: "developer",
    desc: "Rewards program for active API developers and partners.",
    market: "global",
    year: 2019
  },
  {
    id: "ebay-ambassador",
    name: "eBay Ambassador",
    type: "developer",
    tier: "program",
    status: "current",
    parent: "developer",
    desc: "Community leader program for experienced sellers helping others.",
    market: "global",
    year: 2018
  },
  {
    id: "third-party-providers",
    name: "Third Party Providers",
    type: "developer",
    tier: "program",
    status: "current",
    parent: "developer",
    desc: "Certified third-party tools and services marketplace for eBay sellers.",
    market: "global",
    year: 2010
  },

  // ===== LISTING TOOLS (continued) =====
  {
    id: "bulk-listing-tool",
    name: "Bulk Listing Tool",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Tool for creating or editing multiple listings simultaneously.",
    market: "global",
    year: 2010
  },
  {
    id: "business-policies",
    name: "Business Policies",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Reusable templates for payment, shipping, and return policies.",
    market: "global",
    year: 2012
  },

  // ===== PAYMENT FEATURES =====
  {
    id: "express-payouts",
    name: "Express Payouts",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "payments",
    desc: "Faster payout processing for eligible sellers.",
    market: "US",
    year: 2020
  },
  {
    id: "payouts-on-demand",
    name: "Payouts on Demand",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "payments",
    desc: "Instant payout option for sellers needing immediate fund access.",
    market: "US",
    year: 2021
  },
  {
    id: "seller-protections",
    name: "Seller Protections",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Protection for sellers against fraudulent chargebacks and buyer scams.",
    market: "global",
    year: 2010
  },

  // ===== SELLER TOOLS (continued) =====
  {
    id: "time-away",
    name: "Time Away",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Vacation mode setting to pause or adjust business operations during seller absence.",
    market: "global",
    year: 2018
  },
  {
    id: "managed-returns",
    name: "Managed Returns",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "support",
    desc: "Automated return management with prepaid labels and streamlined processing.",
    market: "global",
    year: 2019
  },
  {
    id: "background-enhancement",
    name: "Background Enhancement",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "AI-powered automatic background removal and enhancement for listing photos.",
    market: "global",
    year: 2024
  },
  {
    id: "selling-with-ai",
    name: "Selling with AI",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "AI-assisted listing creation with automated descriptions and optimization.",
    market: "global",
    year: 2024
  },

  // ===== MOTORS SPECIFIC =====
  {
    id: "shop-by-diagram",
    name: "Shop by Diagram",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-motors",
    desc: "Visual parts finder using interactive vehicle diagrams.",
    market: "US",
    year: 2019
  },
  {
    id: "parts-compatibility",
    name: "Parts Compatibility",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-motors",
    desc: "Compatibility table showing which vehicles a part fits.",
    market: "global",
    year: 2008
  },

  // ===== LISTING UPGRADES =====
  {
    id: "bold-title",
    name: "Bold Title",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "listing",
    desc: "Paid upgrade making listing title bold in search results.",
    market: "global",
    year: 2000
  },
  {
    id: "featured-listing",
    name: "Featured Listing",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "listing",
    desc: "Premium placement in search results and category pages. Largely replaced by Promoted Listings.",
    market: "global",
    year: 2003
  },

  // ===== INVENTORY MANAGEMENT =====
  {
    id: "automatic-relisting",
    name: "Automatic Relisting",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Automated relisting of unsold items until sold or limit reached.",
    market: "global",
    year: 2010
  },
  {
    id: "out-of-stock-control",
    name: "Out of Stock Control",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Maintain listing visibility when inventory is temporarily depleted.",
    market: "global",
    year: 2016
  },
  {
    id: "good-til-cancelled",
    name: "Good Til Cancelled",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Listing format that automatically renews every 30 days until cancelled.",
    market: "global",
    year: 2005
  },
  {
    id: "immediate-payment-required",
    name: "Immediate Payment Required",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing",
    desc: "Require instant payment at checkout to prevent unpaid items.",
    market: "global",
    year: 2010
  },

  // ===== PROMOTIONAL OFFERS =====
  {
    id: "offers-to-watchers",
    name: "Offers to Watchers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Send discount offers to users watching your items.",
    market: "global",
    year: 2016
  },
  {
    id: "private-offers",
    name: "Private Offers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Send exclusive discount offers to specific buyers.",
    market: "US",
    year: 2019
  },
  {
    id: "codeless-coupons",
    name: "Codeless Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Coupons automatically applied at checkout without code entry.",
    market: "global",
    year: 2020
  },
  {
    id: "promotional-codes",
    name: "Promotional Codes",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing",
    desc: "Alphanumeric codes for discounts entered at checkout.",
    market: "global",
    year: 2012
  },

  // ===== PURCHASE PROTECTION (continued) =====
  {
    id: "purchase-protection",
    name: "Purchase Protection",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Umbrella term for buyer protection programs covering various purchase types.",
    market: "global",
    year: 2000
  },

  // ===== MESSAGING =====
  {
    id: "message-center",
    name: "Message Center",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "communication",
    desc: "Platform for buyer-seller communication and transaction messages.",
    market: "global",
    year: 2005
  },
  {
    id: "ebay-ai-message-assistance",
    name: "eBay.ai Message Assistance",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "communication",
    desc: "AI-powered message drafting and response suggestions for sellers.",
    market: "global",
    year: 2024
  },

  // ===== UNPAID ITEMS =====
  {
    id: "unpaid-item-assistant",
    name: "Unpaid Item Assistant",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "support",
    desc: "Automated tool for managing unpaid item cases and recovering fees.",
    market: "global",
    year: 2015
  },
  {
    id: "unpaid-item-case",
    name: "Unpaid Item Case",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "support",
    desc: "Formal case process for dealing with buyers who don't pay.",
    market: "global",
    year: 2008
  },

  // ===== INTERNATIONAL TRADE =====
  {
    id: "international-site-visibility",
    name: "International Site Visibility",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "international",
    desc: "Automatically list items on multiple international eBay sites.",
    market: "global",
    year: 2010
  },
  {
    id: "cross-border-trade",
    name: "Cross-Border Trade",
    type: "category",
    tier: "program",
    status: "current",
    parent: "international",
    desc: "Program supporting sellers in international marketplace expansion.",
    market: "global",
    year: 2015
  },

  // ===== ANALYTICS & REPORTS =====
  {
    id: "traffic-report",
    name: "Traffic Report",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "analytics",
    desc: "Analytics showing page views, impressions, and visitor behavior.",
    market: "global",
    year: 2012
  },
  {
    id: "listing-analytics",
    name: "Listing Analytics",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "analytics",
    desc: "Performance metrics for individual listings including views and conversion.",
    market: "global",
    year: 2015
  },
  {
    id: "sales-report",
    name: "Sales Report",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "analytics",
    desc: "Detailed sales data with revenue, fees, and profit calculations.",
    market: "global",
    year: 2005
  },
  {
    id: "transaction-report",
    name: "Transaction Report",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "analytics",
    desc: "Transaction-level detail for accounting and reconciliation.",
    market: "global",
    year: 2008
  },
  {
    id: "order-report",
    name: "Order Report",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "analytics",
    desc: "Order fulfillment and shipping performance reports.",
    market: "global",
    year: 2010
  },
  {
    id: "performance-dashboard",
    name: "Performance Dashboard",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "analytics",
    desc: "Real-time dashboard showing seller performance metrics and health scores.",
    market: "global",
    year: 2017
  },

  // ===== TAX & ACCOUNTING =====
  {
    id: "form-1099-k",
    name: "Form 1099-K",
    type: "category",
    tier: "legal",
    status: "current",
    parent: "tax",
    desc: "US tax reporting form for payment card and third-party network transactions.",
    market: "US",
    year: 2012
  },

  // ===== DEPRECATED PROGRAMS (HIGH PRIORITY) =====
  {
    id: "powerseller",
    name: "PowerSeller",
    type: "trust",
    tier: "program",
    status: "legacy",
    parent: "trust",
    desc: "Historical elite seller program based on monthly sales volume with tiered levels (Bronze, Silver, Gold, Platinum, Titanium). Fully deprecated June 20, 2021.",
    market: "global",
    year: 2000, // Source: PowerSeller launched ~2000
    renamedTo: "top-rated-seller"
  },
  {
    id: "ebay-bucks",
    name: "eBay Bucks",
    type: "category",
    tier: "program",
    status: "legacy",
    parent: "buyer",
    desc: "US-only buyer rewards program offering 1-2% cashback on purchases. Ended April 2, 2024, replaced by eBay Mastercard rewards.",
    market: "US",
    year: 2011, // Source: Research doc - eBay Bucks launched ~2011
    renamedTo: "ebay-mastercard"
  },
  {
    id: "ebay-authenticate",
    name: "eBay Authenticate",
    type: "trust",
    tier: "program",
    status: "legacy",
    parent: "trust",
    desc: "Original authentication program for luxury goods. Replaced by Authenticity Guarantee in 2020.",
    market: "global",
    year: 2017, // Source: Pre-Authenticity Guarantee program
    renamedTo: "authenticity-guarantee"
  },
  {
    id: "fast-n-free",
    name: "Fast 'N Free",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "shipping",
    desc: "Shipping badge for fast free delivery. Being replaced by specific day-count badges (Free 2-day, 3-day, 4-day shipping).",
    market: "global",
    year: 2018, // Source: Fast 'N Free launched ~2018
    renamedTo: "free-2-day-shipping"
  },
  {
    id: "international-standard-delivery",
    name: "International Standard Delivery",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "shipping",
    desc: "Standard international shipping option. Deprecated July 2023 with Global Shipping Program transition.",
    market: "US",
    year: 2015
  },
  {
    id: "turbo-lister",
    name: "Turbo Lister",
    type: "category",
    tier: "product",
    status: "legacy",
    parent: "sellertools",
    desc: "Desktop application for bulk listing creation. Fully retired and replaced by web-based tools.",
    market: "global",
    year: 2003
  },
  {
    id: "file-exchange",
    name: "File Exchange",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "sellertools",
    desc: "CSV-based bulk listing and inventory management tool. Replaced by Seller Hub Reports.",
    market: "global",
    year: 2008,
    renamedTo: "seller-hub-reports"
  },
  {
    id: "ebay-valet-original",
    name: "eBay Valet",
    type: "category",
    tier: "program",
    status: "legacy",
    parent: "services",
    desc: "Original consignment service where eBay sold items for sellers. Ended 2018. Limited luxury version launched 2023.",
    market: "US",
    year: 2014 // Source: Original Valet 2014-2018
  },

  // ===== PREMIUM SERVICES & SELLER PROGRAMS =====
  {
    id: "ebay-premium-services",
    name: "eBay Premium Services",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "trust",
    desc: "Collection of premium buyer protection and service programs.",
    market: "global",
    year: 2018
  },
  {
    id: "certified-refurbished",
    name: "Certified Refurbished",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-refurbished",
    desc: "Top-tier eBay Refurbished condition with manufacturer certification and comprehensive warranty.",
    market: "global",
    year: 2020
  },
  {
    id: "ebay-fulfilment-uk",
    name: "eBay Fulfilment",
    type: "category",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "UK-specific fulfillment service with warehouse storage and shipping.",
    market: "UK",
    year: 2019
  },
  {
    id: "ebay-international-standard-delivery",
    name: "eBay international standard delivery",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "shipping",
    desc: "Standard international shipping service. Deprecated in favor of eBay International Shipping.",
    market: "global",
    year: 2015
  }
];
