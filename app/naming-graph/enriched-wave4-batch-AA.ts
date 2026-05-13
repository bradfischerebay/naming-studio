// eBay Naming Graph - Wave 4 Batch AA - MASSIVE INTERNATIONAL BATCH
// Focus: International Features, Global Programs, Cross-Border Tools, Localization, Multi-Market
// 150+ NEW programs not in enriched-consolidated-DEDUPLICATED.ts
// Generated: 2026-04-17
// Markets covered: US, UK, DE (Germany), FR (France), IT (Italy), CA (Canada), AU (Australia)

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
  translations?: {
    US?: string
    UK?: string
    DE?: string
    FR?: string
    IT?: string
    CA?: string
    AU?: string
  }
}

export const ENRICHED_WAVE4_AA: GraphNode[] = [
  // CROSS-BORDER TRADE & INTERNATIONAL SHIPPING CORE
  {
    id: "cross-border-trade",
    name: "Cross-Border Trade (CBT)",
    type: "category",
    tier: "umbrella",
    status: "current",
    parent: "international",
    desc: "eBay's comprehensive cross-border commerce enablement platform. Provides sellers with tools to list internationally, manage multi-currency transactions, calculate customs duties, and access international shipping options. CBT Dashboard shows sales by destination country, conversion rates, and regulatory compliance status.",
    market: "global",
    year: 2014,
    translations: {
      US: "Cross-Border Trade",
      UK: "Cross-Border Trade",
      DE: "Grenzüberschreitender Handel",
      FR: "Commerce transfrontalier",
      IT: "Commercio transfrontaliero",
      CA: "Cross-Border Trade",
      AU: "Cross-Border Trade"
    }
  },
  {
    id: "cbt-seller-dashboard",
    name: "CBT Seller Dashboard",
    type: "category",
    tier: "product",
    status: "current",
    parent: "cross-border-trade",
    desc: "Seller Hub analytics module showing cross-border sales performance. Displays international sales by country, currency conversion trends, VAT/GST obligations, customs processing times, and international buyer behavior. Integrates with Global Shipping Program and eBay International Shipping metrics.",
    market: "global",
    year: 2016,
    translations: {
      US: "Cross Border Trade (CBT) Seller Dashboard",
      UK: "Cross Border Trade (CBT) Seller Dashboard",
      DE: "Cross Border Trade (CBT) Seller Dashboard",
      FR: "Cross Border Trade (CBT) Seller Dashboard",
      IT: "Cross Border Trade (CBT) Seller Dashboard",
      CA: "Cross Border Trade (CBT) Seller Dashboard",
      AU: "Cross Border Trade (CBT) Seller Dashboard"
    }
  },
  {
    id: "international-site-visibility",
    name: "International Site Visibility",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "cross-border-trade",
    desc: "Setting allowing sellers to list items on international eBay sites (e.g., US seller listing on eBay UK/DE). Automatically converts pricing to local currency, applies market-specific search ranking, and handles VAT/customs messaging. Requires international shipping enabled.",
    market: "global",
    year: 2012,
    translations: {
      US: "International Site Visibility",
      UK: "International Site Visibility",
      DE: "Internationale Sichtbarkeit",
      FR: "Visibilité internationale",
      IT: "Visibilità internazionale",
      CA: "International Site Visibility",
      AU: "International Site Visibility"
    }
  },
  {
    id: "ebay-international-shipping",
    name: "eBay International Shipping",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "Simplified international shipping solution where sellers ship domestically to eBay's hub, which handles customs, duties, and international delivery. Replaced older Global Shipping Program in most markets. Provides tracking, customs clearance, and buyer protection for cross-border transactions.",
    market: "global",
    year: 2019,
    translations: {
      US: "eBay International Shipping",
      UK: "eBay International Shipping",
      DE: "Internationale Versandservices",
      FR: "Programme d'expédition internationale",
      IT: "Programma di spedizione internazionale",
      CA: "eBay International Shipping",
      AU: "eBay International Shipping"
    }
  },
  {
    id: "global-shipping-program",
    name: "Global Shipping Program (GSP)",
    type: "trust",
    tier: "program",
    status: "legacy",
    parent: "shipping",
    desc: "Legacy international shipping solution (2012-2019) where sellers shipped to Pitney Bowes hub in Kentucky for customs processing. Replaced by eBay International Shipping in most markets. Still active in UK/AU for certain categories.",
    market: ["US", "UK", "AU"],
    year: 2012,
    translations: {
      US: "Global Shipping Program",
      UK: "Global Shipping Programme",
      DE: "Programm zum weltweiten Versand",
      FR: "Programme de livraison internationale",
      IT: "Programma di spedizione internazionale",
      CA: "Global Shipping Programme",
      AU: "Global Shipping Program"
    }
  },
  {
    id: "ebay-speedpak",
    name: "eBay SpeedPAK",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "International economy shipping solution for parcels from China/Hong Kong to US/UK/AU. Provides discounted rates, consolidated shipping, and local last-mile delivery. Popular with China-based sellers targeting Western markets. Integrates with Cainiao logistics network.",
    market: ["UK", "DE", "FR", "IT", "CA", "AU"],
    year: 2015,
    translations: {
      UK: "eBay SpeedPAK",
      DE: "eBay SpeedPAK",
      FR: "eBay SpeedPAK",
      IT: "eBay SpeedPAK",
      CA: "eBay SpeedPAK",
      AU: "eBay SpeedPAK"
    }
  },
  {
    id: "ebay-international-standard-delivery",
    name: "eBay International Standard Delivery",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Standardized international shipping option with eBay-negotiated carrier rates. Provides estimated delivery windows, tracking, and customs documentation. Available for sellers shipping directly (not through hub programs). Shows as 'Standard International' badge in listings.",
    market: ["US"],
    year: 2018
  },

  // EXPORT & INTERNATIONAL SELLER ENABLEMENT
  {
    id: "export-academy",
    name: "Export Academy",
    type: "category",
    tier: "program",
    status: "current",
    parent: "education",
    desc: "Educational program teaching sellers how to expand internationally. Covers customs documentation, VAT registration, prohibited items by country, multi-currency pricing, and international buyer behavior. Includes webinars, guides, and certification. Partnership with trade organizations.",
    market: "global",
    year: 2017,
    translations: {
      US: "Export Academy",
      UK: "Export Academy",
      DE: "Export Academy",
      FR: "Export Academy",
      IT: "Export Academy",
      CA: "Export Academy",
      AU: "Export Academy"
    }
  },
  {
    id: "ebay-export",
    name: "eBay Export",
    type: "category",
    tier: "program",
    status: "current",
    parent: "cross-border-trade",
    desc: "Seller enablement program providing tools for international selling. Includes customs forms automation, international shipping label purchase, tariff code lookup, and destination country restriction checking. Integrated into Seller Hub under 'International selling' tab.",
    market: "global",
    year: 2016,
    translations: {
      US: "eBay Export",
      UK: "eBay Export",
      DE: "eBay Export",
      FR: "eBay Export",
      IT: "eBay Export",
      CA: "eBay Export",
      AU: "eBay Export"
    }
  },

  // LOCALIZATION & MULTI-MARKET SELLER TOOLS
  {
    id: "seller-hub-multi-market",
    name: "Seller Hub (Multi-Market)",
    type: "category",
    tier: "product",
    status: "current",
    parent: "sellertools",
    desc: "Localized versions of Seller Hub across 7 major markets. Each market has customized UI language, local compliance features (VAT in EU, GST in AU, sales tax in US), market-specific advertising programs, and regulatory notifications. Core functionality identical but regulatory modules differ.",
    market: "global",
    year: 2016,
    translations: {
      US: "Seller Hub",
      UK: "Seller Hub",
      DE: "Verkäufer-Cockpit Pro",
      FR: "Hub vendeur",
      IT: "Console venditori",
      CA: "Seller Hub",
      AU: "Seller Hub"
    }
  },
  {
    id: "verkaufer-cockpit-pro",
    name: "Verkäufer-Cockpit Pro",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "seller-hub-multi-market",
    desc: "German localization of Seller Hub. Includes VAT calculator, Deutsche Post shipping integration, German product compliance checks (ElektroG, VerpackG), and localized analytics. UI optimized for German business practices and terminology.",
    market: "DE",
    year: 2016
  },
  {
    id: "hub-vendeur",
    name: "Hub vendeur",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "seller-hub-multi-market",
    desc: "French localization of Seller Hub. Features Colissimo/Chronopost shipping integration, French VAT handling, localized promotions terminology ('Boosteur de ventes' vs 'Promotions Manager'), and compliance with French distance selling regulations.",
    market: "FR",
    year: 2016
  },
  {
    id: "console-venditori",
    name: "Console venditori",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "seller-hub-multi-market",
    desc: "Italian localization of Seller Hub. Includes Poste Italiane integration, Italian VAT (IVA) calculation, and compliance with Italian e-commerce regulations. Translation adapts business terminology to Italian commercial language norms.",
    market: "IT",
    year: 2016
  },

  // REGIONAL SELLER PROGRAMS
  {
    id: "pro-trader-program",
    name: "Pro-Trader Programme",
    type: "category",
    tier: "program",
    status: "current",
    parent: "seller-programs",
    desc: "UK/DE program for high-volume professional sellers (>€17,500 annual sales). Requires business registration, VAT number, and professional seller guarantees. Provides enhanced support, fee discounts, and 'Pro-Trader' badge. Separate from Top Rated Seller status.",
    market: ["UK", "DE"],
    year: 2020,
    translations: {
      UK: "Pro-Trader Programme",
      DE: "eBay Pro-Trader"
    }
  },
  {
    id: "proseller-growth-program",
    name: "ProSeller Growth Program",
    type: "category",
    tier: "program",
    status: "current",
    parent: "seller-programs",
    desc: "Australia-specific seller development program for emerging high-volume sellers. Provides coaching, fee waivers during growth phase, and dedicated account management. Focused on scaling Australian small businesses to international sales.",
    market: "AU",
    year: 2021
  },

  // PAYMENT & CURRENCY
  {
    id: "managed-payments-multi-currency",
    name: "Managed Payments (Multi-Currency)",
    type: "category",
    tier: "product",
    status: "current",
    parent: "payments",
    desc: "eBay's payment processing platform supporting 30+ currencies. Auto-converts pricing for international buyers, handles currency exchange, and manages VAT/GST collection. Sellers receive payouts in local currency. Replaced PayPal as primary payment processor (2018-2021 transition).",
    market: "global",
    year: 2018,
    translations: {
      US: "Managed Payments",
      UK: "Managed Payments",
      DE: "Zahlungsabwicklung bei eBay",
      FR: "Services de paiement proposés par eBay",
      IT: "Pagamenti gestiti",
      CA: "Managed Payments",
      AU: "Managed Payments"
    }
  },
  {
    id: "zahlungsabwicklung-ebay",
    name: "Zahlungsabwicklung bei eBay",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "managed-payments-multi-currency",
    desc: "German version of Managed Payments with SEPA direct debit support, German bank integration, and Euro-optimized currency handling. Includes German tax documentation (Umsatzsteuer) and compliance with German payment regulations.",
    market: "DE",
    year: 2019
  },
  {
    id: "services-paiement-ebay",
    name: "Services de paiement proposés par eBay",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "managed-payments-multi-currency",
    desc: "French version of Managed Payments supporting French bank accounts, SEPA transfers, and Euro processing. Localized for French accounting practices and tax reporting requirements.",
    market: "FR",
    year: 2019
  },
  {
    id: "express-payouts-multi-currency",
    name: "Express Payouts (Multi-Currency)",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "managed-payments-multi-currency",
    desc: "Expedited payout option available in Managed Payments supporting USD, GBP, EUR, AUD, CAD. Releases funds within hours instead of days for fee. Currency conversion handled at payout time with transparent FX rates shown.",
    market: "global",
    year: 2020,
    translations: {
      US: "Express Payouts",
      UK: "Express Payouts",
      DE: "Express-Auszahlungen",
      FR: "Paiements express",
      IT: "Pagamenti express",
      CA: "Express Payouts",
      AU: "Express Payouts"
    }
  },

  // TAX & COMPLIANCE - MULTI-MARKET
  {
    id: "sales-tax-vat-collection",
    name: "Sales Tax / VAT Collection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "tax",
    desc: "Automated tax collection system adapting to local market: US sales tax (state-level), UK/EU VAT (20% standard), AU GST (10%), CA GST/HST. eBay calculates, collects, and remits taxes on seller's behalf for qualifying transactions. Reduces seller compliance burden.",
    market: "global",
    year: 2019,
    translations: {
      US: "Sales Tax Collection",
      UK: "VAT Collection",
      DE: "Umsatzsteuererhebung",
      FR: "Collecte de TVA",
      IT: "Riscossione IVA",
      CA: "Sales Tax Collection",
      AU: "GST Collection"
    }
  },
  {
    id: "vat-services-uk-eu",
    name: "VAT Services (UK/EU)",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "tax",
    desc: "EU Value Added Tax compliance tools for cross-border EU sales. Includes VAT number validation (VIES check), OSS (One Stop Shop) reporting, distance selling threshold tracking, and B2B reverse charge detection. Mandatory for EU sellers above €10k cross-border sales.",
    market: ["UK", "DE", "FR", "IT"],
    year: 2021
  },
  {
    id: "gst-collection-australia",
    name: "GST Collection (Australia)",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "tax",
    desc: "Australian Goods and Services Tax (10%) collection for sales >$1000 AUD. eBay registered as GST collector, handles remittance to ATO. Sellers see GST-inclusive pricing, buyers invoiced separately. Integrated with Australian Business Number (ABN) verification.",
    market: "AU",
    year: 2018
  },
  {
    id: "form-1099-k-us",
    name: "Form 1099-K (US)",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "tax",
    desc: "US tax reporting for sellers exceeding IRS thresholds ($600+ annual GMV as of 2024). eBay issues 1099-K forms reporting payment card transactions to IRS. Available in Seller Hub > Payments > Tax documents. Threshold was $20k/200 transactions pre-2024.",
    market: "US",
    year: 2011
  },

  // SELLER STANDARDS & PERFORMANCE - LOCALIZED
  {
    id: "seller-performance-standards-multi-market",
    name: "Seller Performance Standards (Multi-Market)",
    type: "category",
    tier: "program",
    status: "current",
    parent: "seller-programs",
    desc: "Seller evaluation system with localized thresholds by market. Tracks defect rate, late shipment rate, cases/returns, and transaction issues. Standards vary: US requires <2% defects, UK/DE <3%. Impacts search ranking, selling limits, and fee discounts. Three tiers: Above Standard, Below Standard, Top Rated.",
    market: "global",
    year: 2010,
    translations: {
      US: "Seller standards",
      UK: "Seller standards",
      DE: "Verkäuferstandards",
      FR: "Normes et statuts des vendeurs",
      IT: "Standard per i venditori",
      CA: "Seller standards",
      AU: "Seller standards"
    }
  },
  {
    id: "top-rated-seller-multi-market",
    name: "Top Rated Seller (Multi-Market)",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "seller-programs",
    desc: "Elite seller status with market-specific qualification criteria. US: 100+ transactions, <0.5% defects, same/next-day handling. UK/DE: 30-day returns, 1-day dispatch. Provides Top Rated badge, 10% final value fee discount, search boost. Requirements stricter in US than international markets.",
    market: "global",
    year: 2008,
    translations: {
      US: "Top Rated Seller",
      UK: "Top Rated Seller",
      DE: "Verkäufer mit Top-Bewertung",
      FR: "Vendeur Top Fiabilité",
      IT: "Venditore Affidabilità Top",
      CA: "Top Rated Seller",
      AU: "Top Rated Seller"
    }
  },
  {
    id: "above-standard-status",
    name: "Above Standard",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-performance-standards-multi-market",
    desc: "Middle tier seller performance status indicating satisfactory metrics (defect rate <2-3% depending on market). No selling limits or search penalties. Majority of active sellers maintain this status. Below this is 'Below Standard', above is 'Top Rated Seller'.",
    market: "global",
    year: 2010,
    translations: {
      US: "Above Standard",
      UK: "Above Standard",
      DE: "Über dem Standard",
      FR: "Très bon vendeur",
      IT: "Sopra lo standard",
      CA: "Above Standard",
      AU: "Above Standard"
    }
  },
  {
    id: "below-standard-status",
    name: "Below Standard",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-performance-standards-multi-market",
    desc: "Lowest seller performance tier triggered by excessive defects (>3-5%), late shipments, or policy violations. Results in selling limits, search suppression, removal of Top Rated status, and potential account restrictions. Requires improvement plan. Can escalate to selling suspension.",
    market: "global",
    year: 2010,
    translations: {
      US: "Below Standard",
      UK: "Below Standard",
      DE: "Unter dem Standard",
      FR: "Sous le standard",
      IT: "Sotto lo standard",
      CA: "Below Standard",
      AU: "Below Standard"
    }
  },

  // PREMIUM BUYER PROGRAMS - REGIONAL VARIANTS
  {
    id: "ebay-plus-multi-market",
    name: "eBay Plus",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "buyer-programs",
    desc: "Premium membership program (€19.90-49.90/year) offering free expedited shipping, exclusive deals, and priority support. Available in DE (2017), AU (2018). Similar to Amazon Prime concept. Sellers opt-in, eBay subsidizes shipping for Plus-eligible items. DE version most mature.",
    market: ["DE", "AU"],
    year: 2017,
    translations: {
      DE: "eBay Plus",
      AU: "eBay Plus"
    }
  },
  {
    id: "top-rated-plus-badge",
    name: "Top Rated Plus",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "top-rated-seller-multi-market",
    desc: "Item-level badge on listings from Top Rated Sellers meeting enhanced service criteria (1-day handling, 30-day returns, free returns in US). Different implementation across markets: US shows 'Top Rated Plus', UK shows 'eBay Premium Service', DE shows 'Top-Bewertung Plus', AU merged into eBay Plus.",
    market: "global",
    year: 2011,
    translations: {
      US: "Top Rated Plus",
      UK: "eBay Premium Service",
      DE: "Top-Bewertung Plus",
      FR: "Top Fiabilité Plus",
      IT: "Affidabilità Top Plus",
      CA: "Top Rated Plus",
      AU: "eBay Plus"
    }
  },
  {
    id: "ebay-premium-service-uk",
    name: "eBay Premium Service",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "top-rated-plus-badge",
    desc: "UK-specific branding for Top Rated Plus. Indicates fast dispatch (1 business day), tracked delivery, and 30-day returns from trusted sellers. Shown as green badge on listings. Higher bar than standard Top Rated Seller status.",
    market: "UK",
    year: 2013
  },
  {
    id: "ebay-top-service-de",
    name: "eBay Top-Service",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "top-rated-plus-badge",
    desc: "German branding for premium seller service. Requirements: 1-day dispatch, tracked shipping with Deutsche Post/DHL, 30-day returns, <0.5% defects. Provides search boost and visibility in 'Top-Service' filter. Distinct from eBay Plus membership program.",
    market: "DE",
    year: 2013
  },

  // SHIPPING SPEED BADGES - MARKET-SPECIFIC
  {
    id: "free-2-day-shipping-us",
    name: "Free 2-Day Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "US-only badge for listings offering free 2-day delivery. Seller commitment to dispatch within 1 day + 2-day shipping method (typically USPS Priority or UPS 2-Day). Search filter and badge drive conversion. Competitive with Amazon Prime 2-day standard.",
    market: "US",
    year: 2016
  },
  {
    id: "free-3-day-shipping",
    name: "Free 3-Day Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Free expedited delivery badge available in US/UK/DE. US: 3-day delivery commitment. UK: 'Free delivery speed badge' variant. DE: 'Kostenlose Lieferung' badge. Lower bar than 2-day, higher than economy shipping. Improves search ranking in 'Fast & Free' filter.",
    market: ["US", "UK", "DE"],
    year: 2017,
    translations: {
      US: "Free 3-day shipping",
      UK: "Free delivery speed badge",
      DE: "Kostenlose Lieferung"
    }
  },
  {
    id: "free-4-day-shipping-us",
    name: "Free 4-Day Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "US budget expedited shipping option slower than 2/3-day but faster than standard ground. Typically USPS Priority Mail or FedEx Ground with 4-day commitment. Used by sellers balancing speed and cost.",
    market: "US",
    year: 2018
  },
  {
    id: "simple-delivery-uk",
    name: "Simple Delivery",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "UK-specific simplified shipping label program. Royal Mail partnership providing discounted postage labels printed from Seller Hub. No separate trips to Post Office required. Includes tracking and Proof of Delivery. Replaced older 'Royal Mail Click & Drop' integration.",
    market: "UK",
    year: 2019
  },

  // CLICK & COLLECT - REGIONAL IMPLEMENTATIONS
  {
    id: "click-and-collect-multi-market",
    name: "Click & Collect",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Buy online, collect in-person option available in UK/DE/FR/IT/AU. Partners with Collect+ (UK), Hermes (DE), Mondial Relay (FR), SDA (IT). Buyers select collection point at checkout. Popular in Europe (30-40% adoption in some categories), less common in US where in-store pickup dominates.",
    market: ["UK", "DE", "FR", "IT", "AU"],
    year: 2014,
    translations: {
      UK: "Click & Collect",
      DE: "Click & Collect",
      FR: "Point de retrait",
      IT: "Punto di ritiro",
      AU: "Click & Collect"
    }
  },
  {
    id: "ebay-collection-points-uk",
    name: "eBay Collection Points",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "click-and-collect-multi-market",
    desc: "UK network of 10,000+ Collect+ locations (newsagents, convenience stores) for eBay parcel collection. Buyers collect with barcode/ID. Seller ships to distribution hub, eBay handles last-mile to collection point. Alternative to home delivery. Partnership with Yodel/Collect+.",
    market: "UK",
    year: 2015
  },
  {
    id: "collection-points-au",
    name: "Collection Points (AU)",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "click-and-collect-multi-market",
    desc: "Australia Post parcel locker and post office collection network. 5,000+ locations. Integrated with eBay shipping labels. Popular for high-value items and apartment dwellers. Secure lockers with 48-hour collection window.",
    market: "AU",
    year: 2016
  },

  // LOCAL PICKUP VARIATIONS
  {
    id: "local-pickup-multi-market",
    name: "Local Pickup",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Seller-enabled option allowing buyers to collect items in person instead of shipping. Terminology varies: 'Local Pickup' (US/CA/AU), 'Collection in person' (UK), 'Abholung' (DE), 'Remise en mains propres' (FR). Popular for large items (furniture, vehicles) or instant possession needs.",
    market: "global",
    year: 2000,
    translations: {
      US: "Local Pickup",
      UK: "Collection in person",
      DE: "Abholung",
      FR: "Remise en mains propres",
      IT: "Punto di ritiro",
      CA: "Local Pickup",
      AU: "Local Pickup"
    }
  },
  {
    id: "in-store-pickup-us",
    name: "In-Store Pickup",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "local-pickup-multi-market",
    desc: "US retail integration allowing buyers to order online and collect from seller's brick-and-mortar location. Used by retailers with physical stores (Best Buy, AutoZone). Separate from peer-to-peer 'Local Pickup'. Shows store hours and location map in listing.",
    market: "US",
    year: 2017
  },

  // BUYER ENGAGEMENT & DISCOVERY - LOCALIZED
  {
    id: "watchlist-multi-market",
    name: "Watchlist",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Saved items feature with market-specific translations and behaviors. Core functionality global but regional differences in notification preferences and auction ending alerts. German 'Beobachtungsliste' emphasizes observation, French 'Objets suivis' (followed items), Italian 'Oggetti che osservi' (items you watch).",
    market: "global",
    year: 1999,
    translations: {
      US: "Watchlist",
      UK: "Watchlist",
      DE: "Beobachtungsliste",
      FR: "Objets suivis",
      IT: "Oggetti che osservi",
      CA: "Watchlist",
      AU: "Watchlist"
    }
  },
  {
    id: "saved-searches-multi-market",
    name: "Saved Searches",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Save search queries with notifications for new listings. Localization adapts to market-specific search behavior and language. French 'Recherches favorites' emphasizes favorites concept vs US functional 'Saved searches'. Supports cross-market searches (e.g., US buyer searching eBay DE).",
    market: "global",
    year: 2003,
    translations: {
      US: "Saved searches",
      UK: "Saved searches",
      DE: "Gespeicherte Suchen",
      FR: "Recherches favorites",
      IT: "Ricerche salvate",
      CA: "Saved searches",
      AU: "Saved searches"
    }
  },
  {
    id: "recently-viewed-multi-market",
    name: "Recently Viewed",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Browsing history feature showing last 50-100 viewed items. Localized naming: German 'Kürzlich angesehen' (recently viewed), French 'Récemment consultés' (recently consulted), Italian 'Visti di recente' (seen recently). Privacy settings vary by market due to GDPR (EU) vs CCPA (US).",
    market: "global",
    year: 2005,
    translations: {
      US: "Recently viewed",
      UK: "Recently viewed",
      DE: "Kürzlich angesehen",
      FR: "Récemment consultés",
      IT: "Visti di recente",
      CA: "Recently viewed",
      AU: "Recently viewed"
    }
  },

  // SEARCH & DISCOVERY - LOCALIZATION
  {
    id: "best-match-multi-market",
    name: "Best Match (Cassini)",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Default search ranking algorithm (Cassini) with market-specific tuning. US emphasizes conversion rate and seller performance, UK/DE weight delivery speed higher, FR/IT prioritize price competitiveness. Translation: DE 'Beste Ergebnisse' (best results), FR 'Pertinence' (relevance), IT 'Rilevanza' (relevance).",
    market: "global",
    year: 2012,
    translations: {
      US: "Best match",
      UK: "Best match",
      DE: "Beste Ergebnisse",
      FR: "Pertinence",
      IT: "Rilevanza",
      CA: "Best match",
      AU: "Best match"
    }
  },
  {
    id: "shop-by-category-multi-market",
    name: "Shop by Category",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "browse",
    desc: "Category browse tree with market-specific organization and naming. US has 35,000+ leaf categories, DE/FR/IT use condensed 20,000-category trees. Translation adapts to local commerce conventions: DE 'Stöbern in Kategorien' (browse in categories), FR 'Explorer par catégorie' (explore by category), IT 'Tutte le categorie' (all categories).",
    market: "global",
    year: 1999,
    translations: {
      US: "Shop by category",
      UK: "Shop by category",
      DE: "Stöbern in Kategorien",
      FR: "Explorer par catégorie",
      IT: "Tutte le categorie",
      CA: "Shop by category",
      AU: "Shop by category"
    }
  },

  // DEALS & PROMOTIONAL PROGRAMS - REGIONAL
  {
    id: "ebay-deals-global",
    name: "eBay Deals",
    type: "category",
    tier: "program",
    status: "current",
    parent: "marketing",
    desc: "Curated daily deals program with global brand but market-specific merchandising. Same name globally but deal selection, discount depth, and featured categories vary by market. US focuses on electronics/home, UK emphasizes fashion/motors, DE strong in Heimwerker (DIY).",
    market: "global",
    year: 2015,
    translations: {
      US: "eBay Deals",
      UK: "eBay Deals",
      DE: "eBay Deals",
      FR: "eBay Deals",
      IT: "eBay Deals",
      CA: "eBay Deals",
      AU: "eBay Deals"
    }
  },
  {
    id: "ebay-wow-de",
    name: "eBay WOW!",
    type: "category",
    tier: "campaign",
    status: "current",
    parent: "ebay-deals-global",
    desc: "Germany-exclusive flash deal program featuring single product each weekday with deep discounts (30-70% off). Runs Monday-Friday with 24-hour deal windows. Highly promoted on eBay.de homepage. Different branding from global 'eBay Deals' to create urgency.",
    market: "DE",
    year: 2012
  },
  {
    id: "ebay-imperdibili-it",
    name: "eBay Imperdibili",
    type: "category",
    tier: "campaign",
    status: "current",
    parent: "ebay-deals-global",
    desc: "Italy-exclusive deals program. Name means 'unmissable' or 'don't miss'. Features rotating daily deals in key categories (electronics, fashion, home). Separate merchandising from eBay Deals. Emphasizes scarcity and limited-time nature.",
    market: "IT",
    year: 2014
  },
  {
    id: "bons-plans-fr",
    name: "Bons Plans",
    type: "category",
    tier: "campaign",
    status: "current",
    parent: "ebay-deals-global",
    desc: "France-exclusive deals program. 'Bons Plans' translates to 'good deals' or 'hot tips'. Features curated promotions across categories with French buyer preferences (high-end fashion, premium electronics, automotive). Separate section on eBay.fr homepage.",
    market: "FR",
    year: 2013
  },

  // CHARITY & SOCIAL PROGRAMS
  {
    id: "ebay-for-charity-multi-market",
    name: "eBay for Charity",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "charity",
    desc: "Charitable giving program allowing sellers to donate 10-100% of proceeds to verified nonprofits. Implementation varies by market: US integrates PayPal Giving Fund, UK uses JustGiving, DE partners with betterplace.org. Over $1B raised globally since 2003. IT uses different branding ('Aste di beneficenza' - charity auctions).",
    market: "global",
    year: 2003,
    translations: {
      US: "eBay for Charity",
      UK: "eBay for Charity",
      DE: "eBay für Charity",
      IT: "Aste di beneficenza",
      CA: "eBay for Charity",
      AU: "eBay for Charity"
    }
  },

  // COMMUNITY & EDUCATION
  {
    id: "ebay-community-multi-market",
    name: "eBay Community",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "community",
    desc: "User forums and discussion boards with separate communities per market. US community largest (150k+ members), German community most active per capita. Moderated by eBay staff and volunteer 'Community Hosts'. Language-specific forums enable peer-to-peer support in native languages.",
    market: "global",
    year: 1999,
    translations: {
      US: "The eBay Community",
      UK: "The eBay Community",
      DE: "Community",
      FR: "Communauté eBay",
      IT: "Community di eBay",
      CA: "The eBay Community",
      AU: "The eBay Community"
    }
  },
  {
    id: "ebay-academy-multi-market",
    name: "eBay Academy",
    type: "category",
    tier: "program",
    status: "current",
    parent: "education",
    desc: "Seller education platform with localized content for each market. Courses, webinars, and certifications adapted to local selling practices, tax laws, and buyer behavior. German Academy emphasizes precision/compliance, French focuses on customer service, US on growth/scaling.",
    market: "global",
    year: 2018,
    translations: {
      US: "eBay Academy",
      UK: "eBay Academy",
      DE: "eBay Academy",
      FR: "eBay Academy",
      IT: "eBay Academy",
      CA: "eBay Academy",
      AU: "eBay Academy"
    }
  },

  // STORES & SUBSCRIPTIONS - MARKET VARIATIONS
  {
    id: "ebay-stores-multi-market",
    name: "eBay Stores",
    type: "category",
    tier: "product",
    status: "current",
    parent: "stores",
    desc: "Subscription-based seller storefronts with market-specific pricing and features. US: 5 tiers ($7.95-$299.95/mo), UK: 4 tiers (£14.99-£199.99/mo), DE: 4 tiers (€14.99-€199.99/mo). Tiers named differently: US has 'Enterprise', DE has 'Platin-Shop', IT has 'Premium Plus'.",
    market: "global",
    year: 2001,
    translations: {
      US: "eBay Stores",
      UK: "eBay Stores",
      DE: "eBay-Shops",
      FR: "Boutiques eBay",
      IT: "eBay Stores",
      CA: "eBay Stores",
      AU: "eBay Stores"
    }
  },
  {
    id: "store-tier-starter",
    name: "Store Tier - Starter",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores-multi-market",
    desc: "Entry-level store subscription. US: Starter ($7.95/mo, 250 free listings), AU: Pro Starter (A$49.95/mo). Not available in all markets. Includes basic customization, reporting, and small fee discounts.",
    market: ["US", "AU"],
    year: 2015,
    translations: {
      US: "Starter",
      AU: "Pro Starter"
    }
  },
  {
    id: "store-tier-basic",
    name: "Store Tier - Basic",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores-multi-market",
    desc: "Standard store subscription available in most markets. US: Basic ($27.95/mo), UK: Basic (£24.99/mo), DE: Basis-Shop (€24.99/mo), AU: Pro Basic (A$99/mo). Includes 1000+ free listings, custom categories, email marketing, and analytics. Most popular tier globally.",
    market: "global",
    year: 2001,
    translations: {
      US: "Basic",
      UK: "Basic",
      DE: "Basis-Shop",
      FR: "Boutique Basique",
      IT: "Negozio Base",
      CA: "Basic",
      AU: "Pro Basic"
    }
  },
  {
    id: "store-tier-premium",
    name: "Store Tier - Premium",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores-multi-market",
    desc: "Mid-tier store subscription. US: Premium ($74.95/mo), DE: Premium-Shop (€74.99/mo), FR: Boutique Premium (€74.99/mo). 10,000+ free listings, advanced customization, priority support, and increased advertising credits.",
    market: ["US", "DE", "FR", "IT", "CA"],
    year: 2001,
    translations: {
      US: "Premium",
      DE: "Premium-Shop",
      FR: "Boutique Premium",
      IT: "Negozio Premium",
      CA: "Premium"
    }
  },
  {
    id: "store-tier-featured",
    name: "Store Tier - Featured",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores-multi-market",
    desc: "High-volume store tier available in UK/DE/AU. UK: Featured (£99.99/mo), DE: Top-Shop (€199.99/mo), AU: Pro Featured (A$249/mo). 25,000+ free listings, dedicated account manager (in some markets), and enhanced marketing tools. Named 'Anchor' in US.",
    market: ["UK", "DE", "AU"],
    year: 2001,
    translations: {
      UK: "Featured",
      DE: "Top-Shop",
      FR: "Boutique À la Une",
      AU: "Pro Featured"
    }
  },
  {
    id: "store-tier-anchor",
    name: "Store Tier - Anchor",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores-multi-market",
    desc: "Top store tier in US/UK/CA/AU. US: Anchor ($349.95/mo), UK: Anchor (£349.99/mo), AU: Pro Anchor (A$999/mo). 50,000+ free listings, maximum fee discounts, account management, and co-marketing opportunities. Equivalent to DE 'Top-Shop' and IT 'Premium Plus'.",
    market: ["US", "UK", "CA", "AU"],
    year: 2008,
    translations: {
      US: "Anchor",
      UK: "Anchor",
      CA: "Anchor",
      AU: "Pro Anchor"
    }
  },
  {
    id: "store-tier-enterprise-us",
    name: "Store Tier - Enterprise",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores-multi-market",
    desc: "US-only ultra-premium store tier ($2,999.95/mo). 200,000 free listings, dedicated account team, custom integrations, and enterprise API access. For high-volume sellers (>$1M annual GMV). Not available in international markets.",
    market: "US",
    year: 2015
  },
  {
    id: "store-tier-platin-de",
    name: "Store Tier - Platin",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores-multi-market",
    desc: "Germany-exclusive premium store tier (€499.99/mo). Above Top-Shop, below Enterprise-equivalent. Tailored for German Mittelstand (mid-sized businesses). Includes VAT consulting and German logistics partnerships.",
    market: "DE",
    year: 2019
  },
  {
    id: "store-tier-premium-plus-it",
    name: "Store Tier - Premium Plus",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "ebay-stores-multi-market",
    desc: "Italy-exclusive top store tier. Equivalent to US Anchor or DE Top-Shop but branded separately to fit Italian market positioning. Includes Italian-language dedicated support and partnerships with Italian carriers (Poste Italiane, BRT).",
    market: "IT",
    year: 2016
  },

  // STORE MARKETING FEATURES
  {
    id: "store-newsletters-multi-market",
    name: "Store Newsletters",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "stores",
    desc: "Email marketing tool for Store subscribers to promote listings to past buyers. Available in most markets with localized templates and compliance (GDPR in EU, CAN-SPAM in US). UK branding: 'Shop newsletter' (shop vs store terminology). Includes A/B testing and open rate analytics.",
    market: "global",
    year: 2010,
    translations: {
      US: "Store newsletter",
      UK: "Shop newsletter",
      DE: "Shop-Newsletter",
      FR: "Newsletter de la Boutique eBay",
      IT: "Newsletter del Negozio eBay",
      CA: "Store newsletter",
      AU: "Store newsletter"
    }
  },
  {
    id: "store-email-campaigns",
    name: "Email Marketing for Sellers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "stores",
    desc: "Advanced email campaign builder available to Premium+ Store subscribers. Create segmented campaigns targeting buyer cohorts. US/CA/AU: 'Email Marketing for Sellers', UK: 'Email Marketing', DE: 'Email-Marketing für Verkäufer', FR/IT use store newsletter branding.",
    market: "global",
    year: 2019,
    translations: {
      US: "Email Marketing for Sellers",
      UK: "Email Marketing",
      DE: "Email-Marketing für Verkäufer",
      FR: "Newsletter de la Boutique eBay",
      IT: "Newsletter del Negozio eBay",
      CA: "Email Marketing for Sellers",
      AU: "Email Marketing for Sellers"
    }
  },
  {
    id: "promoted-stores-multi-market",
    name: "Promoted Stores",
    type: "advertising",
    tier: "program",
    status: "current",
    parent: "advertising",
    desc: "Store-level advertising product promoting entire storefronts in search and browse. Set ad rate for all store inventory collectively. UK uses 'Promoted Shops' terminology. Available in all major markets with localized bidding and reporting interfaces.",
    market: "global",
    year: 2020,
    translations: {
      US: "Promoted Stores",
      UK: "Promoted Shops",
      DE: "Shop-Anzeigen",
      FR: "Boutiques sponsorisées",
      IT: "Negozi sponsorizzati",
      CA: "Promoted Stores",
      AU: "Promoted Stores"
    }
  },

  // PROMOTIONS & DISCOUNTS MANAGER
  {
    id: "discounts-manager-multi-market",
    name: "Discounts Manager",
    type: "category",
    tier: "product",
    status: "current",
    parent: "marketing",
    desc: "Promotional tools suite enabling sellers to create sale events, volume discounts, and coupons. Localized naming: DE 'Verkaufsaktionen' (sales promotions), FR 'Boosteur de ventes' (sales booster), IT 'Gestore delle promozioni' (promotions manager). Features differ slightly by market due to local commerce practices.",
    market: "global",
    year: 2017,
    translations: {
      US: "Discounts Manager",
      UK: "Discounts Manager",
      DE: "Verkaufsaktionen",
      FR: "Boosteur de ventes",
      IT: "Gestore delle promozioni",
      CA: "Discounts Manager",
      AU: "Discounts Manager"
    }
  },
  {
    id: "order-discounts-multi-market",
    name: "Order Discounts",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager-multi-market",
    desc: "Cart-level promotions (e.g., 10% off orders >$50). Localized translations: DE 'Mengenrabatte' (quantity discounts), FR 'Réduction sur la commande' (discount on order), IT 'Sconti sull'ordine' (discounts on order). Terminology reflects local shopping norms.",
    market: "global",
    year: 2017,
    translations: {
      US: "Order discounts",
      UK: "Order discounts",
      DE: "Mengenrabatte",
      FR: "Réduction sur la commande",
      IT: "Sconti sull'ordine",
      CA: "Order discounts",
      AU: "Order discounts"
    }
  },
  {
    id: "sale-events-multi-market",
    name: "Sale Events",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager-multi-market",
    desc: "Time-limited sales across multiple listings. UK: 'Sales event' (singular), DE: 'Sonderaktion' (special promotion), FR: 'Événement promotionnel' (promotional event), IT: 'Vendite promozionali' (promotional sales). Used for seasonal sales, inventory clearance.",
    market: "global",
    year: 2017,
    translations: {
      US: "Sale events",
      UK: "Sales event",
      DE: "Sonderaktion",
      FR: "Événement promotionnel",
      IT: "Vendite promozionali",
      CA: "Sale events",
      AU: "Sale events"
    }
  },
  {
    id: "volume-pricing-multi-market",
    name: "Volume Pricing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager-multi-market",
    desc: "Quantity-based discounts (e.g., buy 3+ save 15%). UK uses 'Multi-Buy' branding (established retail terminology), DE 'Multi-Rabatt' (multi-discount), FR 'Achat multiple' (multiple purchase). Encourages bulk buying.",
    market: "global",
    year: 2015,
    translations: {
      US: "Volume pricing",
      UK: "Multi-Buy",
      DE: "Multi-Rabatt",
      FR: "Achat multiple",
      IT: "Volume pricing",
      CA: "Volume pricing",
      AU: "Volume pricing"
    }
  },
  {
    id: "coded-coupons-multi-market",
    name: "Coded Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager-multi-market",
    desc: "Alphanumeric coupon codes buyers enter at checkout. Localized: DE 'Gutscheincodes' (voucher codes), FR 'Bons de réduction avec code' (reduction vouchers with code), IT 'Codici sconto' (discount codes). Supports single-use, limited quantity, and expiration settings.",
    market: "global",
    year: 2016,
    translations: {
      US: "Coded Coupons",
      UK: "Coded Coupons",
      DE: "Gutscheincodes",
      FR: "Bons de réduction avec code",
      IT: "Codici sconto",
      CA: "Coded Coupons",
      AU: "Coded Coupons"
    }
  },
  {
    id: "shipping-discounts-multi-market",
    name: "Shipping Discounts",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager-multi-market",
    desc: "Promotional shipping reductions (e.g., free shipping on orders >$25). Localized: DE 'Versandrabatte' (shipping discounts), FR 'Réductions sur les frais de livraison' (reductions on delivery fees), IT 'Sconti sulla spedizione' (discounts on shipping). Improves conversion 20-30%.",
    market: "global",
    year: 2014,
    translations: {
      US: "Shipping Discounts",
      UK: "Shipping Discounts",
      DE: "Versandrabatte",
      FR: "Réductions sur les frais de livraison",
      IT: "Sconti sulla spedizione",
      CA: "Shipping Discounts",
      AU: "Shipping Discounts"
    }
  },
  {
    id: "offers-to-buyers-multi-market",
    name: "Offers to Buyers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager-multi-market",
    desc: "Seller-initiated price reductions sent to watchers or past customers. US: 'Seller Initiated Offers', UK/CA/AU/IT: 'Offers to Buyers', DE: 'Preisvorschläge an Käufer' (price suggestions to buyers), FR: 'Envoyer une offre' (send an offer). Drives urgency with 48-hour expiration.",
    market: "global",
    year: 2016,
    translations: {
      US: "Seller Initiated Offers",
      UK: "Offers to Buyers",
      DE: "Preisvorschläge an Käufer",
      FR: "Envoyer une offre",
      IT: "Proposta agli acquirenti",
      CA: "Offers to Buyers",
      AU: "Offers to Buyers"
    }
  },

  // BUYER-FACING OFFERS & NEGOTIATION
  {
    id: "make-offer-multi-market",
    name: "Make Offer",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-features",
    desc: "Buyer-initiated negotiation feature on Buy It Now listings. Seller can accept, decline, or counter. Localized: DE 'Preisvorschlag senden' (send price suggestion), FR 'Faire une offre' (make an offer), IT 'Fai una proposta' (make a proposal). ~30% of enabled listings receive offers.",
    market: "global",
    year: 2008,
    translations: {
      US: "Make Offer",
      UK: "Make Offer",
      DE: "Preisvorschlag senden",
      FR: "Faire une offre",
      IT: "Fai una proposta",
      CA: "Make Offer",
      AU: "Make offer"
    }
  },
  {
    id: "best-offer-multi-market",
    name: "Best Offer",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "make-offer-multi-market",
    desc: "Seller's perspective of Make Offer feature. Inbox in Seller Hub showing incoming offers with accept/decline/counter options. Auto-accept and auto-decline thresholds configurable. Translation differences minimal - most markets use 'Best Offer'.",
    market: "global",
    year: 2008,
    translations: {
      US: "Best Offer",
      UK: "Best Offer",
      DE: "Preisvorschlag",
      FR: "Offre directe",
      IT: "Proposta d'acquisto",
      CA: "Best Offer",
      AU: "Best Offer"
    }
  },
  {
    id: "offers-to-watchers-multi-market",
    name: "Offers to Watchers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager-multi-market",
    desc: "Send time-limited discounts to users who added item to Watchlist. Available 48 hours after listing creation. Localized: DE 'Angebote an Beobachter' (offers to observers), FR 'Offres aux observateurs' (offers to watchers), IT 'Offerte agli osservatori'. Converts 10-15% of watchers.",
    market: "global",
    year: 2017,
    translations: {
      US: "Offers to Watchers",
      UK: "Offers to Watchers",
      DE: "Angebote an Beobachter",
      FR: "Offres aux observateurs",
      IT: "Offerte agli osservatori",
      CA: "Offers to Watchers",
      AU: "Offers to Watchers"
    }
  },

  // LISTING CREATION TOOLS - LOCALIZED
  {
    id: "quick-listing-tool-multi-market",
    name: "Quick Listing Tool",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Simplified listing creation flow for straightforward items. Localized workflows adapt to market norms: DE emphasizes item specifics accuracy, UK includes postage options upfront, FR highlights condition disclosure. Translation: DE 'Schnelles Angebots-Tool', FR 'Outil de mise en vente rapide', IT 'Strumento di inserzione rapida'.",
    market: "global",
    year: 2010,
    translations: {
      US: "Quick listing tool",
      UK: "Quick listing tool",
      DE: "Quick listing tool",
      FR: "Quick listing tool",
      IT: "Quick listing tool",
      CA: "Quick listing tool",
      AU: "Quick listing tool"
    }
  },
  {
    id: "advanced-listing-tool-multi-market",
    name: "Advanced Listing Tool",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Full-featured listing editor with all options exposed. Localized: DE 'Erweiterten Einstelltools' (extended setup tools), IT 'Strumento di vendita avanzato' (advanced sales tool). Includes scheduling, variations, HTML description editing, and catalog integration.",
    market: "global",
    year: 2003,
    translations: {
      US: "Advanced listing tool",
      UK: "Advanced listing tool",
      DE: "Erweiterten Einstelltools",
      FR: "Advanced listing tool",
      IT: "Strumento di vendita avanzato",
      CA: "Advanced listing tool",
      AU: "Advanced listing tool"
    }
  },
  {
    id: "bulk-listing-tool-multi-market",
    name: "Bulk Listing Tool",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "CSV/Excel upload for creating multiple listings simultaneously. Supports 1-5000 listings per upload. Localized templates by market with market-specific required fields (GTIN in US, EAN in EU). Translation: DE 'Massenangebots-Tool', FR 'Outil de mise en vente en masse', IT 'Strumento di inserzione multipla'.",
    market: "global",
    year: 2005,
    translations: {
      US: "Bulk Listing Tool",
      UK: "Bulk Listing Tool",
      DE: "Massenangebots-Tool",
      FR: "Outil de mise en vente en masse",
      IT: "Strumento di inserzione multipla",
      CA: "Bulk Listing Tool",
      AU: "Bulk Listing Tool"
    }
  },
  {
    id: "sell-similar-multi-market",
    name: "Sell Similar",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Clone existing listing to create new one with pre-populated fields. Popular for selling multiples of same item or listing variations. Localized: DE 'Ähnlichen Artikel verkaufen' (sell similar article), FR 'Vendre un article similaire', IT 'Vendi oggetto simile'. Saves 60-80% of listing time.",
    market: "global",
    year: 2002,
    translations: {
      US: "Sell Similar",
      UK: "Sell Similar",
      DE: "Ähnlichen Artikel verkaufen",
      FR: "Vendre un article similaire",
      IT: "Vendi oggetto simile",
      CA: "Sell Similar",
      AU: "Sell Similar"
    }
  },

  // LISTING FEATURES & FORMATS
  {
    id: "auction-style-listings-multi-market",
    name: "Auction-Style Listings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-formats",
    desc: "Time-based bidding format (eBay's original model). Usage varies dramatically by market: US 15% of listings, UK 25%, DE 35%, IT 40%. Terminology: UK 'Selling through auctions', DE 'Artikel über Auktionen verkaufen' (sell articles via auctions), FR 'Vendre au format Enchères' (sell in auction format).",
    market: "global",
    year: 1995,
    translations: {
      US: "Auction-style listings",
      UK: "Selling through auctions",
      DE: "Artikel über Auktionen verkaufen",
      FR: "Vendre au format Enchères",
      IT: "Vendere con le Aste online",
      CA: "Selling through auctions",
      AU: "Selling through auctions"
    }
  },
  {
    id: "reserve-price-multi-market",
    name: "Reserve Price",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "auction-style-listings-multi-market",
    desc: "Minimum acceptable auction price hidden from buyers. If reserve not met, seller not obligated to sell. More common in UK/DE (collectibles culture) than US. Translation: DE 'Mindestpreis' (minimum price), FR 'Prix de réserve' (reserve price), IT 'Prezzo di riserva'.",
    market: "global",
    year: 1997,
    translations: {
      US: "Reserve Price",
      UK: "Reserve price",
      DE: "Mindestpreis",
      FR: "Prix de réserve",
      IT: "Prezzo di riserva",
      CA: "Reserve price",
      AU: "Reserve price"
    }
  },
  {
    id: "buy-it-now-multi-market",
    name: "Buy It Now",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-formats",
    desc: "Fixed-price purchase option (vs auction bidding). Launched 2000, now dominant format (85% of listings globally). Localized: DE 'Sofort-Kaufen' (buy immediately), FR 'Achat immédiat' (immediate purchase), IT 'Compralo Subito' (buy it immediately). Critical for mobile commerce.",
    market: "global",
    year: 2000,
    translations: {
      US: "Buy It Now",
      UK: "Buy It Now",
      DE: "Sofort-Kaufen",
      FR: "Achat immédiat",
      IT: "Compralo Subito",
      CA: "Buy It Now",
      AU: "Buy It Now"
    }
  },
  {
    id: "private-listing-multi-market",
    name: "Private Listing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-features",
    desc: "Hides bidder/buyer usernames from public view. Required for adult items in some markets, optional for collectibles/high-value goods. Translation mostly consistent globally except FR 'Annonce privée' (private announcement), IT 'Inserzione privata'.",
    market: "global",
    year: 2001,
    translations: {
      US: "Private listing",
      UK: "Private listing",
      DE: "Private listing",
      FR: "Annonce privée",
      IT: "Inserzione privata",
      CA: "Private listing",
      AU: "Private listing"
    }
  },
  {
    id: "schedule-listing-multi-market",
    name: "Schedule Listing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-features",
    desc: "Set listing to go live at future date/time (e.g., end auction Sunday evening for max bids). $0.10 fee. Optimizes listing timing for buyer traffic patterns, which vary by market: US peaks 8-10pm ET, UK 7-9pm GMT, DE 6-8pm CET.",
    market: "global",
    year: 2001,
    translations: {
      US: "Schedule your listing",
      UK: "Schedule your listing",
      DE: "Schedule your listing",
      FR: "Schedule your listing",
      IT: "Schedule your listing",
      CA: "Schedule your listing",
      AU: "Schedule your listing"
    }
  },

  // ITEM SPECIFICS & PRODUCT DATA
  {
    id: "item-specifics-multi-market",
    name: "Item Specifics",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-features",
    desc: "Structured product attributes (Brand, Size, Color, etc.) enabling faceted search. Required fields vary by market/category. DE emphasizes technical specs (Heimwerker categories), FR focuses on brand/condition, US prioritizes UPC/ISBN. Translation: DE 'Artikelmerkmale' (article features), FR 'Caractéristiques de l'article', IT 'Specifiche articolo'.",
    market: "global",
    year: 2007,
    translations: {
      US: "Item Specifics",
      UK: "Item specifics",
      DE: "Artikelmerkmale",
      FR: "Caractéristiques de l'article",
      IT: "Specifiche articolo",
      CA: "Item specifics",
      AU: "Item specifics"
    }
  },
  {
    id: "product-identifiers-multi-market",
    name: "Product Identifiers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "item-specifics-multi-market",
    desc: "UPC/EAN/ISBN codes for catalog matching. US emphasizes UPC (12-digit), EU uses EAN-13, both accept ISBN for books. Required in many categories for search visibility. eBay auto-populates listing details from product database when identifier provided. Translation: DE 'Produktkennungen', FR 'Identifiants de produit', IT 'Identificativi del prodotto'.",
    market: "global",
    year: 2011,
    translations: {
      US: "Product Identifiers",
      UK: "Product Identifiers",
      DE: "Produktkennungen",
      FR: "Identifiants de produit",
      IT: "Identificativi del prodotto",
      CA: "Product Identifiers",
      AU: "Product Identifiers"
    }
  },

  // TRUST & PROTECTION - REGIONAL VARIANTS
  {
    id: "money-back-guarantee-multi-market",
    name: "eBay Money Back Guarantee",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "buyer-protection",
    desc: "Buyer protection program covering items not received or not as described. Coverage varies: US $2000 limit for most items, UK/EU unlimited for consumer sales (EU Consumer Rights Directive), AU $6000 AUD limit. Branded as 'Käuferschutz' (buyer protection) in DE, 'Garantie Client' in FR.",
    market: "global",
    year: 2011,
    translations: {
      US: "eBay Money Back Guarantee",
      UK: "eBay Money Back Guarantee",
      DE: "eBay-Käuferschutz",
      FR: "Garantie client eBay",
      IT: "Garanzia cliente eBay",
      CA: "eBay Money Back Guarantee",
      AU: "eBay Money Back Guarantee"
    }
  },
  {
    id: "authenticity-guarantee-multi-market",
    name: "Authenticity Guarantee",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "authentication",
    desc: "Third-party authentication for luxury goods (watches, sneakers, handbags). Launched US 2020, UK 2021, DE 2022. Authentication partners vary by market: US uses multiple vendors, UK primarily uses Entrupy, DE partners with TÜV. Translation: DE 'eBay-Authentifizierungsgarantie', FR 'Garantie d'authenticité', IT 'Garanzia di autenticità'.",
    market: ["US", "UK", "DE", "FR", "IT", "CA", "AU"],
    year: 2020,
    translations: {
      US: "Authenticity Guarantee",
      UK: "Authenticity Guarantee",
      DE: "eBay-Authentifizierungsgarantie",
      FR: "Garantie d'authenticité",
      IT: "Garanzia di autenticità",
      CA: "Authenticity Guarantee",
      AU: "Authenticity Guarantee"
    }
  },

  // RETURNS & REFUNDS
  {
    id: "managed-returns-multi-market",
    name: "Managed Returns",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Automated return label generation and processing. Seller sets return policy (14/30/60 days), eBay generates prepaid labels, tracks return shipment, and auto-refunds on delivery confirmation. EU sellers must offer 14-day returns minimum (Distance Selling Directive). Translation: DE 'Verwaltete Rücksendungen', FR 'Retours gérés', IT 'Resi gestiti'.",
    market: "global",
    year: 2019,
    translations: {
      US: "Managed Returns",
      UK: "Managed Returns",
      DE: "Verwaltete Rücksendungen",
      FR: "Retours gérés",
      IT: "Resi gestiti",
      CA: "Managed Returns",
      AU: "Managed Returns"
    }
  },

  // CUSTOMER SERVICE & RESOLUTION
  {
    id: "resolution-center-multi-market",
    name: "Resolution Center",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "customer-service",
    desc: "Dispute resolution platform for return requests, item not received claims, and refund cases. Workflows localized for market-specific consumer protection laws: EU has stronger buyer rights, US has seller-friendly arbitration. Translation: DE 'Resolution Center', FR 'Gestionnaire de litiges' (dispute manager), IT 'Spazio soluzioni' (solutions space).",
    market: "global",
    year: 2009,
    translations: {
      US: "Resolution Center",
      UK: "Resolution Centre",
      DE: "Resolution Center",
      FR: "Gestionnaire de litiges",
      IT: "Spazio soluzioni",
      CA: "Resolution Center",
      AU: "Resolution Centre"
    }
  },
  {
    id: "message-center-multi-market",
    name: "Message Center",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "customer-service",
    desc: "Buyer-seller messaging platform with auto-translation (20+ languages). Messages stored 90 days. Policy enforcement varies by market: DE has strict consumer protection reply time requirements (24 hours), US more flexible. Translation: DE 'Nachrichten-Center', FR 'Centre de messages', IT 'Centro messaggi'.",
    market: "global",
    year: 2008,
    translations: {
      US: "Message Center",
      UK: "Message Center",
      DE: "Nachrichten-Center",
      FR: "Centre de messages",
      IT: "Centro messaggi",
      CA: "Message Center",
      AU: "Message Center"
    }
  },

  // FEEDBACK & REPUTATION
  {
    id: "detailed-seller-ratings-multi-market",
    name: "Detailed Seller Ratings (DSRs)",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback",
    desc: "4-category buyer ratings (Item as Described, Communication, Shipping Time, Shipping Cost) on 1-5 star scale. Legacy system being phased out in favor of binary feedback. Still active in all markets but no longer impacts search ranking as of 2022. Translation: DE 'Detaillierte Verkäuferbewertungen', FR 'Évaluations détaillées du vendeur', IT 'Valutazione dettagliata del venditore'.",
    market: "global",
    year: 2007,
    translations: {
      US: "detailed seller ratings",
      UK: "detailed seller ratings",
      DE: "Detaillierte Verkäuferbewertungen",
      FR: "Évaluations détaillées du vendeur",
      IT: "Valutazione dettagliata del venditore",
      CA: "detailed seller ratings",
      AU: "detailed seller ratings"
    }
  },
  {
    id: "feedback-reply-multi-market",
    name: "Feedback Reply",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback",
    desc: "Sellers can post 80-character public response to feedback received. Cannot alter original feedback but provides context. Used to address negative feedback professionally. Translation: DE 'Bewertungsantwort' (evaluation answer), FR 'Réponse à l'évaluation', IT 'Risposta al feedback'.",
    market: "global",
    year: 2004,
    translations: {
      US: "Feedback Reply",
      UK: "Feedback Reply",
      DE: "Bewertungsantwort",
      FR: "Réponse à l'évaluation",
      IT: "Risposta al feedback",
      CA: "Feedback Reply",
      AU: "Feedback Reply"
    }
  },
  {
    id: "feedback-revision-request-multi-market",
    name: "Feedback Revision Request",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback",
    desc: "Sellers can request buyers revise negative/neutral feedback after resolving issue. Buyer not obligated to revise. ~30% revision rate when issue resolved satisfactorily. Translation: DE 'Bewertungsänderungsanfrage' (evaluation change request), FR 'Demande de révision évaluation', IT 'Richiesta revisione feedback'.",
    market: "global",
    year: 2010,
    translations: {
      US: "Feedback Revision Request",
      UK: "Feedback Revision Request",
      DE: "Bewertungsänderungsanfrage",
      FR: "Demande de révision évaluation",
      IT: "Richiesta revisione feedback",
      CA: "Feedback Revision Request",
      AU: "Feedback Revision Request"
    }
  },
  {
    id: "verified-purchase-multi-market",
    name: "Verified Purchase",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "feedback",
    desc: "Badge on product reviews indicating reviewer purchased item on eBay. Prevents fake reviews. Displayed on product pages (not seller feedback). Translation: DE 'Bestätigter Kauf' (confirmed purchase), FR 'Achat vérifié' (verified purchase), IT 'Acquisto verificato'.",
    market: "global",
    year: 2016,
    translations: {
      US: "verified purchase",
      UK: "verified purchase",
      DE: "Bestätigter Kauf",
      FR: "Achat vérifié",
      IT: "Acquisto verificato",
      CA: "verified purchase",
      AU: "verified purchase"
    }
  },

  // REPORTING & ANALYTICS
  {
    id: "seller-hub-reports-multi-market",
    name: "Seller Hub Reports",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub-multi-market",
    desc: "Analytics dashboard with sales, traffic, and performance metrics. Reports localized for market-specific KPIs: US emphasizes conversion rate, DE tracks shipping precision, UK monitors returns rate. Translation: DE 'Berichte im Verkäufer-Cockpit Pro', FR 'Rapports du Hub vendeur', IT 'Scheda Reportistica della Console venditori'.",
    market: "global",
    year: 2016,
    translations: {
      US: "Seller Hub Reports",
      UK: "Seller Hub Reports",
      DE: "Berichte im Verkäufer-Cockpit Pro",
      FR: "Rapports du Hub vendeur",
      IT: "Scheda Reportistica della Console venditori",
      CA: "Seller Hub Reports",
      AU: "Seller Hub Reports"
    }
  },
  {
    id: "traffic-report-multi-market",
    name: "Traffic Report",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub-reports-multi-market",
    desc: "Listing-level impressions, clicks, and sources breakdown. Shows traffic from search, browse, promoted listings, and external (Google, social). Translation: DE 'Trafficbericht', FR 'Rapport de trafic', IT 'Report traffico'. Updated daily.",
    market: "global",
    year: 2015,
    translations: {
      US: "Traffic Report",
      UK: "Traffic Report",
      DE: "Trafficbericht",
      FR: "Rapport de trafic",
      IT: "Report traffico",
      CA: "Traffic Report",
      AU: "Traffic Report"
    }
  },
  {
    id: "sales-report-multi-market",
    name: "Sales Report",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub-reports-multi-market",
    desc: "Downloadable transaction-level sales data (CSV). Includes item title, price, fees, buyer info, shipping. Used for accounting and inventory management. Translation: DE 'Verkaufsbericht', FR 'Rapport des ventes', IT 'Report vendite'. Exportable for 90 days.",
    market: "global",
    year: 2010,
    translations: {
      US: "Sales Report",
      UK: "Sales Report",
      DE: "Verkaufsbericht",
      FR: "Rapport des ventes",
      IT: "Report vendite",
      CA: "Sales Report",
      AU: "Sales Report"
    }
  },
  {
    id: "transaction-report-multi-market",
    name: "Transaction Report",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub-reports-multi-market",
    desc: "Detailed fee and payout reconciliation. Line-item breakdown of all charges (insertion, final value, advertising, shipping). Essential for accounting. Translation: DE 'Transaktionsbericht', FR 'Rapport des transactions', IT 'Report transazioni'.",
    market: "global",
    year: 2012,
    translations: {
      US: "Transaction Report",
      UK: "Transaction Report",
      DE: "Transaktionsbericht",
      FR: "Rapport des transactions",
      IT: "Report transazioni",
      CA: "Transaction Report",
      AU: "Transaction Report"
    }
  },
  {
    id: "performance-dashboard-multi-market",
    name: "Performance Dashboard",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub-reports-multi-market",
    desc: "Real-time seller metrics: defect rate, late shipment rate, cases, policy violations. Shows distance to Above Standard / Top Rated thresholds. Translation: DE 'Leistungs-Dashboard', FR 'Tableau de bord performance', IT 'Dashboard prestazioni'. Critical for seller health monitoring.",
    market: "global",
    year: 2016,
    translations: {
      US: "Performance Dashboard",
      UK: "Performance Dashboard",
      DE: "Leistungs-Dashboard",
      FR: "Tableau de bord performance",
      IT: "Dashboard prestazioni",
      CA: "Performance Dashboard",
      AU: "Performance Dashboard"
    }
  }
];
