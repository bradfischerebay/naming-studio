// eBay Naming Graph - Wave 3 Batch D - 50 NEW Programs
// Generated: 2026-04-17
// Source: translations.ts + Research-Session-Complete-2026-04-17.md
// Programs: 50 newly enriched with full GraphNode metadata
// Export: ENRICHED_WAVE3_D

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

export const ENRICHED_WAVE3_D: GraphNode[] = [
  {
    "id": "promoted-listings-express",
    "name": "Promoted Listings Express",
    "type": "advertising",
    "tier": "variant",
    "status": "legacy",
    "parent": "promoted-listings",
    "desc": "Discontinued cost-per-click variant of Promoted Listings that charged only when buyers clicked ads. Ended April 2024 globally (Germany July 2023).",
    "market": "global",
    "year": 2019,
    "renamedTo": "promoted-listings-standard"
  },
  {
    "id": "promoted-offsite",
    "name": "Promoted Offsite",
    "type": "advertising",
    "tier": "product",
    "status": "current",
    "parent": "promoted-listings",
    "desc": "External advertising program placing eBay listings on partner sites (Google, Facebook, Microsoft). DE: Externe Anzeigen, FR: Annonces sponsorisées externes, IT: Annunci sponsorizzati esterni.",
    "market": "global",
    "year": 2020
  },
  {
    "id": "promoted-stores-custom",
    "name": "Promoted Stores Custom",
    "type": "advertising",
    "tier": "variant",
    "status": "current",
    "parent": "promoted-stores",
    "desc": "Customizable store promotion campaigns with advanced targeting options.",
    "market": "US",
    "year": 2023
  },
  {
    "id": "brand-funded-promoted-listings-priority",
    "name": "Brand-Funded Promoted Listings Priority",
    "type": "advertising",
    "tier": "program",
    "status": "current",
    "parent": "promoted-listings",
    "desc": "Manufacturer-funded advertising program where brands subsidize seller ad costs for their products.",
    "market": ["US", "UK"],
    "year": 2022
  },
  {
    "id": "brand-funded-promoted-stores",
    "name": "Brand-Funded Promoted Stores",
    "type": "advertising",
    "tier": "program",
    "status": "current",
    "parent": "promoted-stores",
    "desc": "Brand-subsidized store advertising campaigns targeting authorized sellers.",
    "market": ["US", "UK"],
    "year": 2023
  },
  {
    "id": "promoted-brand",
    "name": "Promoted Brand",
    "type": "advertising",
    "tier": "product",
    "status": "current",
    "parent": "ebay-advertising",
    "desc": "Brand-level advertising program promoting manufacturer storefronts and product lines.",
    "market": ["US", "UK"],
    "year": 2022
  },
  {
    "id": "managed-display",
    "name": "Managed Display",
    "type": "advertising",
    "tier": "product",
    "status": "current",
    "parent": "ebay-advertising",
    "desc": "Managed display advertising service for high-volume sellers with dedicated account support.",
    "market": ["US", "UK"],
    "year": 2021
  },
  {
    "id": "vehicle-purchase-protection",
    "name": "Vehicle Purchase Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "ebay-motors",
    "desc": "Protection program for vehicle purchases up to $100,000, covering title issues and undisclosed damage.",
    "market": ["US", "CA"],
    "year": 2017
  },
  {
    "id": "business-equipment-purchase-protection",
    "name": "Business Equipment Purchase Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "Purchase protection for heavy equipment and industrial machinery transactions.",
    "market": "US",
    "year": 2018
  },
  {
    "id": "excellent-refurbished",
    "name": "Excellent - Refurbished",
    "type": "trust",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-refurbished",
    "desc": "Top-tier refurbished condition: like-new appearance, fully functional, eBay-backed warranty. DE: Hervorragend, FR: Parfait état, IT: Eccellente.",
    "market": "global",
    "year": 2023
  },
  {
    "id": "very-good-refurbished",
    "name": "Very Good - Refurbished",
    "type": "trust",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-refurbished",
    "desc": "Mid-tier refurbished condition: minor cosmetic wear, fully functional, eBay-backed warranty. DE: Sehr gut, FR: Très bon état, IT: Molto buono.",
    "market": "global",
    "year": 2023
  },
  {
    "id": "good-refurbished",
    "name": "Good - Refurbished",
    "type": "trust",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-refurbished",
    "desc": "Entry-tier refurbished condition: visible wear but functional, eBay-backed warranty. DE: Gut, FR: État correct, IT: Buono.",
    "market": "global",
    "year": 2023
  },
  {
    "id": "certified-open-box",
    "name": "Certified Open Box",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "US-only program for certified open-box items with eBay verification and warranty. Launched May 2025.",
    "market": "US",
    "year": 2025
  },
  {
    "id": "ebay-guaranteed-fit",
    "name": "eBay Guaranteed Fit",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "ebay-motors",
    "desc": "Automotive parts fitment guarantee with free returns if part doesn't match vehicle specs. US/CA/AU program. UK uses Assured Fit. Launched October 2025.",
    "market": ["US", "CA", "AU"],
    "year": 2025
  },
  {
    "id": "buyer-protection",
    "name": "Buyer Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "UK-specific buyer protection policy covering purchase disputes and item not as described claims.",
    "market": "UK",
    "year": 2000
  },
  {
    "id": "ebay-premium-services",
    "name": "eBay Premium Services",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "seller-performance-standards",
    "desc": "Premium seller badge program replacing Top Rated Plus in select markets. UK: Premium Service, DE: Top-Service (Feb 2024), FR/IT: Service Premium.",
    "market": ["UK", "DE", "FR", "IT"],
    "year": 2024
  },
  {
    "id": "seller-protections",
    "name": "Seller Protections",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "Policy protecting sellers from fraudulent chargebacks and buyer abuse. DE: Verkäuferschutz, FR: Protections pour les vendeurs, IT: Protezioni del venditore.",
    "market": "global",
    "year": 2001
  },
  {
    "id": "global-shipping-program",
    "name": "Global Shipping Program",
    "type": "category",
    "tier": "program",
    "status": "legacy",
    "parent": "shipping",
    "desc": "International shipping program with intermediary handling customs and duties. US program replaced by eBay International Shipping July 2023. UK program still active.",
    "market": ["UK"],
    "year": 2013,
    "renamedTo": "ebay-international-shipping"
  },
  {
    "id": "ebay-international-shipping",
    "name": "eBay International Shipping",
    "type": "category",
    "tier": "product",
    "status": "current",
    "parent": "shipping",
    "desc": "Replaced US Global Shipping Program July 2023. Managed international shipping with simplified customs. DE: Internationale Versandservices, FR: Programme d'expédition internationale.",
    "market": ["US", "CA"],
    "year": 2023,
    "renamedFrom": "global-shipping-program"
  },
  {
    "id": "ebay-fulfilment",
    "name": "eBay Fulfilment",
    "type": "category",
    "tier": "product",
    "status": "current",
    "parent": "shipping",
    "desc": "Third-party fulfillment service through Orange Connex partner. UK: eBay Fulfilment by Orange Connex, DE: eBay Fulfillment.",
    "market": ["UK", "DE"],
    "year": 2021
  },
  {
    "id": "ebay-vault",
    "name": "eBay Vault",
    "type": "category",
    "tier": "product",
    "status": "current",
    "parent": "collectibles",
    "desc": "Secure storage and trading platform for high-value collectibles (cards, watches). Items never leave vault during resale. US-only launch 2022.",
    "market": "US",
    "year": 2022
  },
  {
    "id": "issue-resolution-center",
    "name": "Issue Resolution Center",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "support",
    "desc": "Legacy dispute resolution interface, being replaced by Resolution Center.",
    "market": "US",
    "year": 2008,
    "renamedTo": "resolution-center"
  },
  {
    "id": "certified-recycled",
    "name": "Certified Recycled",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "sustainability",
    "desc": "UK program certifying items made from recycled materials, part of sustainability initiatives.",
    "market": "UK",
    "year": 2023
  },
  {
    "id": "top-rated-seller",
    "name": "Top Rated Seller",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "seller-performance-standards",
    "desc": "Elite seller status with consistently excellent performance. DE: Verkäufer mit Top-Bewertung, FR: Vendeur Top Fiabilité, IT: Venditore Affidabilità Top.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "vero-program",
    "name": "VeRO Program",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "Verified Rights Owner program for trademark/copyright protection. DE: VeRI-Programm, FR/IT: Programme VeRO.",
    "market": "global",
    "year": 1998
  },
  {
    "id": "resolution-center",
    "name": "Resolution Center",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "support",
    "desc": "Dispute resolution hub for returns, refunds, and transaction issues. DE: Resolution Center, FR: Gestionnaire de litiges, IT: Spazio soluzioni.",
    "market": "global",
    "year": 2014,
    "renamedFrom": "issue-resolution-center"
  },
  {
    "id": "certified-refurbished",
    "name": "Certified Refurbished",
    "type": "trust",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-refurbished",
    "desc": "Highest refurbished tier: manufacturer or certified refurbisher, like-new warranty. DE: Zertifiziert - Refurbished, FR: Reconditionné par la marque.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "ebay-live",
    "name": "eBay Live",
    "type": "category",
    "tier": "product",
    "status": "current",
    "parent": "selling",
    "desc": "Live streaming commerce platform for real-time auctions and interactive selling. Global brand name (not translated).",
    "market": "global",
    "year": 2021
  },
  {
    "id": "shipping-labels",
    "name": "Shipping Labels",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Discounted postage labels purchased through eBay. UK/AU: Postage labels, DE: Versandetiketten, FR: Bordereaux d'affranchissement.",
    "market": "global",
    "year": 2004
  },
  {
    "id": "ebay-international-standard-delivery",
    "name": "eBay International Standard Delivery",
    "type": "category",
    "tier": "program",
    "status": "legacy",
    "parent": "shipping",
    "desc": "International shipping option deprecated July 2023 and replaced by eBay International Shipping.",
    "market": "US",
    "year": 2020,
    "renamedTo": "ebay-international-shipping"
  },
  {
    "id": "simple-delivery",
    "name": "Simple Delivery",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "UK C2C mandatory shipping program simplifying buyer delivery experience with standardized rates.",
    "market": "UK",
    "year": 2022
  },
  {
    "id": "local-pickup",
    "name": "Local Pickup",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "In-person collection option. UK: Collection in person, DE: Abholung, FR: Remise en mains propres, IT: Ritiro di persona.",
    "market": "global",
    "year": 1995
  },
  {
    "id": "click-and-collect",
    "name": "Click & Collect",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Buy online, pick up at retail partner location. UK/DE/AU use Click & Collect, FR: Point de retrait, IT: Punto di ritiro.",
    "market": ["UK", "DE", "FR", "IT", "AU"],
    "year": 2018
  },
  {
    "id": "ebay-collection-points",
    "name": "eBay Collection Points",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "Network of retail pickup locations for buyer convenience. UK and AU markets.",
    "market": ["UK", "AU"],
    "year": 2019
  },
  {
    "id": "in-store-pickup",
    "name": "In-Store Pickup",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Pick up purchases at seller's physical retail location. US uses In-Store Pickup, other markets use Click & Collect.",
    "market": "US",
    "year": 2014
  },
  {
    "id": "managed-delivery",
    "name": "Managed Delivery",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "White-glove delivery service for large items (furniture, appliances) with scheduling and installation.",
    "market": "US",
    "year": 2020
  },
  {
    "id": "logistica-ebay-by-orange-connex",
    "name": "Logistica eBay by Orange Connex",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "Italy-specific fulfillment service through Orange Connex partnership.",
    "market": "IT",
    "year": 2022
  },
  {
    "id": "watchlist",
    "name": "Watchlist",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Saved items list for tracking auctions and future purchases. DE: Beobachtungsliste, FR: Objets suivis, IT: Oggetti che osservi.",
    "market": "global",
    "year": 1995
  },
  {
    "id": "my-garage",
    "name": "My Garage",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "ebay-motors",
    "desc": "Vehicle profile tool for finding compatible parts. Global brand name (not translated).",
    "market": "global",
    "year": 2014
  },
  {
    "id": "saved-searches",
    "name": "Saved Searches",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Stored search queries with optional alerts. DE: Gespeicherte Suchen, FR: Recherches favorites, IT: Ricerche salvate.",
    "market": "global",
    "year": 2003
  },
  {
    "id": "recently-viewed",
    "name": "Recently Viewed",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Browsing history of recently visited items. DE: Kürzlich angesehen, FR: Récemment consultés, IT: Visti di recente.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "best-match",
    "name": "Best Match",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "search",
    "desc": "Default search ranking algorithm (Cassini) balancing relevance and seller performance. DE: Beste Ergebnisse, FR: Pertinence, IT: Rilevanza.",
    "market": "global",
    "year": 2007
  },
  {
    "id": "image-search",
    "name": "Image Search",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "search",
    "desc": "Visual search using uploaded photos to find similar items. Available US, UK, CA, AU.",
    "market": ["US", "UK", "CA", "AU"],
    "year": 2017
  },
  {
    "id": "find-it-on-ebay",
    "name": "Find It On eBay",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "search",
    "desc": "Browser extension for finding items on eBay while browsing other sites. US, UK, CA, AU.",
    "market": ["US", "UK", "CA", "AU"],
    "year": 2019
  },
  {
    "id": "shop-by-category",
    "name": "Shop by Category",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discovery",
    "desc": "Category-based browsing navigation. DE: Stöbern in Kategorien, FR: Explorer par catégorie, IT: Tutte le categorie.",
    "market": "global",
    "year": 1995
  },
  {
    "id": "price-guide",
    "name": "Price Guide",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "collectibles",
    "desc": "Historical pricing data tool for collectibles (cards, coins). US-focused with global data.",
    "market": "US",
    "year": 2020
  },
  {
    "id": "trading-card-hub",
    "name": "Trading Card Hub",
    "type": "category",
    "tier": "vertical",
    "status": "current",
    "parent": "collectibles",
    "desc": "Dedicated marketplace for trading cards with grading, authentication, and vault integration. US/CA only.",
    "market": ["US", "CA"],
    "year": 2021
  },
  {
    "id": "tcgplayer",
    "name": "TCGplayer",
    "type": "category",
    "tier": "platform",
    "status": "current",
    "parent": "collectibles",
    "desc": "Acquired trading card marketplace operating independently. US, UK, CA availability.",
    "market": ["US", "UK", "CA"],
    "year": 2022
  },
  {
    "id": "goldin-auctions",
    "name": "Goldin Auctions",
    "type": "category",
    "tier": "platform",
    "status": "current",
    "parent": "collectibles",
    "desc": "Acquired high-end collectibles auction house. Global brand name (not translated).",
    "market": "global",
    "year": 2023
  },
  {
    "id": "ebay-standard-envelope",
    "name": "eBay Standard Envelope",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "Low-cost tracked shipping for trading cards and small collectibles. US-only program.",
    "market": "US",
    "year": 2021
  }
]
