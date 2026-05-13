// eBay Naming Graph - Wave 3 Batch A
// Generated: 2026-04-17
// Programs: 50 newly enriched
// Source: translations.ts programs not yet in enriched-consolidated-DEDUPLICATED.ts

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

export const ENRICHED_WAVE3_A: GraphNode[] = [
  {
    "id": "seller-centre",
    "name": "Seller Centre",
    "type": "category",
    "tier": "product",
    "status": "current",
    "parent": "sellertools",
    "desc": "Educational hub and help center for sellers providing guides, policies, and best practices. Distinct from Seller Hub (transactional workspace).",
    "market": "global",
    "year": 2008
  },
  {
    "id": "selling-manager",
    "name": "Selling Manager",
    "type": "category",
    "tier": "product",
    "status": "legacy",
    "parent": "sellertools",
    "desc": "Legacy bulk listing and order management tool, largely replaced by Seller Hub for most sellers.",
    "market": "global",
    "year": 2004,
    "renamedTo": "seller-hub"
  },
  {
    "id": "selling-manager-pro",
    "name": "Selling Manager Pro",
    "type": "category",
    "tier": "product",
    "status": "legacy",
    "parent": "sellertools",
    "desc": "Premium version of Selling Manager with advanced automation, inventory management, and reporting. Replaced by Seller Hub for store subscribers.",
    "market": "global",
    "year": 2006,
    "renamedTo": "seller-hub"
  },
  {
    "id": "terapeak",
    "name": "Terapeak",
    "type": "category",
    "tier": "product",
    "status": "renamed",
    "parent": "sellertools",
    "desc": "Market research tool providing sales trends, pricing data, and competitive intelligence. Rebranded as 'Product research' in Seller Hub.",
    "market": "global",
    "year": 2017,
    "renamedFrom": "Terapeak Product Research",
    "renamedTo": "product-research"
  },
  {
    "id": "product-research",
    "name": "Product research",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Integrated market research tool in Seller Hub showing sales trends, pricing analytics, and demand data. Formerly branded as Terapeak.",
    "market": "global",
    "year": 2020,
    "renamedFrom": "terapeak"
  },
  {
    "id": "ebay-stores",
    "name": "eBay Stores",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "seller-subscriptions",
    "desc": "Subscription-based customizable storefront program with 6 tier levels (Starter/Basic/Premium/Anchor/Enterprise, plus DE Platin, IT Premium Plus).",
    "market": "global",
    "year": 2001
  },
  {
    "id": "promoted-listings",
    "name": "Promoted Listings",
    "type": "advertising",
    "tier": "umbrella",
    "status": "current",
    "parent": "ebay-advertising",
    "desc": "Umbrella brand for first-party advertising products including Standard, Advanced, and Offsite variants.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "promoted-listings-standard",
    "name": "Promoted Listings Standard",
    "type": "advertising",
    "tier": "variant",
    "status": "current",
    "parent": "promoted-listings",
    "desc": "Cost-per-sale ad format promoting listings in search results and category pages. DE uses 'Standard' strategy, replaces legacy 'General' naming.",
    "market": "global",
    "year": 2015,
    "renamedFrom": "promoted-listings-general"
  },
  {
    "id": "promoted-listings-advanced",
    "name": "Promoted Listings Advanced",
    "type": "advertising",
    "tier": "variant",
    "status": "current",
    "parent": "promoted-listings",
    "desc": "Cost-per-click ad format with keyword targeting and priority placement. DE uses 'Erweitert' (Advanced) instead of 'Premium' strategy.",
    "market": "global",
    "year": 2019,
    "renamedFrom": "promoted-listings-priority"
  },
  {
    "id": "promoted-listings-express",
    "name": "Promoted Listings Express",
    "type": "advertising",
    "tier": "variant",
    "status": "legacy",
    "parent": "promoted-listings",
    "desc": "Rapid-setup ad format discontinued globally April 2024 (DE discontinued July 2023).",
    "market": "global",
    "year": 2021,
    "renamedTo": "deprecated-april-2024"
  },
  {
    "id": "promoted-offsite",
    "name": "Promoted Offsite",
    "type": "advertising",
    "tier": "variant",
    "status": "current",
    "parent": "promoted-listings",
    "desc": "Off-eBay advertising across Google, Facebook, and other channels. DE: 'Externe Anzeigen', FR: 'Annonces externes', IT: 'Annunci sponsorizzati esterni'.",
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
    "desc": "Custom Store promotion campaigns with tailored targeting and creative control.",
    "market": "US",
    "year": 2022
  },
  {
    "id": "vehicle-purchase-protection",
    "name": "Vehicle Purchase Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "ebay-motors",
    "desc": "Buyer protection program for eBay Motors vehicle purchases covering fraud, misrepresentation, and title issues up to $100,000.",
    "market": "US",
    "year": 2014
  },
  {
    "id": "business-equipment-purchase-protection",
    "name": "Business Equipment Purchase Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "business-industrial",
    "desc": "Buyer protection for heavy equipment and industrial machinery purchases covering fraud and misrepresentation.",
    "market": "US",
    "year": 2018
  },
  {
    "id": "certified-open-box",
    "name": "Certified Open Box",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "condition-programs",
    "desc": "Condition certification program launched May 2025 for open-box items with inspection and warranty.",
    "market": "US",
    "year": 2025
  },
  {
    "id": "excellent-refurbished",
    "name": "Excellent - Refurbished",
    "type": "trust",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-refurbished",
    "desc": "Top tier of 4-tier eBay Refurbished system. DE: 'Hervorragend', FR: 'Parfait état', IT: 'Eccellente'.",
    "market": "global",
    "year": 2021
  },
  {
    "id": "very-good-refurbished",
    "name": "Very Good - Refurbished",
    "type": "trust",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-refurbished",
    "desc": "Second tier of 4-tier eBay Refurbished system. DE: 'Sehr gut', FR: 'Très bon état', IT: 'Molto buono'.",
    "market": "global",
    "year": 2021
  },
  {
    "id": "good-refurbished",
    "name": "Good - Refurbished",
    "type": "trust",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-refurbished",
    "desc": "Entry tier of 4-tier eBay Refurbished system. DE: 'Gut', FR: 'État correct', IT: 'Buono'.",
    "market": "global",
    "year": 2021
  },
  {
    "id": "certified-refurbished",
    "name": "Certified Refurbished",
    "type": "trust",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-refurbished",
    "desc": "Manufacturer-certified refurbished items with brand warranty. Highest tier in refurbished hierarchy. FR: 'Reconditionné par la marque'.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "buyer-protection",
    "name": "Buyer Protection",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "trust",
    "desc": "Generic buyer protection term used in UK for Money Back Guarantee coverage.",
    "market": "UK",
    "year": 2011
  },
  {
    "id": "ebay-premium-service",
    "name": "eBay Premium Service",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "seller-performance",
    "desc": "UK-exclusive seller badge replacing Top Rated Plus, indicating premium seller performance and service standards.",
    "market": "UK",
    "year": 2019
  },
  {
    "id": "seller-protections",
    "name": "Seller Protections",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "Seller protection against fraudulent buyers, chargebacks, and item-not-received claims. DE: 'Verkäuferschutz', FR: 'Protections pour les vendeurs'.",
    "market": "global",
    "year": 2009
  },
  {
    "id": "global-shipping-program",
    "name": "Global Shipping Program",
    "type": "category",
    "tier": "program",
    "status": "legacy",
    "parent": "shipping",
    "desc": "International shipping intermediary program. US version replaced by eBay International Shipping (July 2023). UK version still active via Pitney Bowes.",
    "market": ["UK"],
    "year": 2012,
    "renamedTo": "ebay-international-shipping"
  },
  {
    "id": "ebay-international-shipping",
    "name": "eBay International Shipping",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "International shipping service replacing US Global Shipping Program (July 2023). Also rolled out to CA late 2025.",
    "market": ["US", "CA"],
    "year": 2023,
    "renamedFrom": "global-shipping-program"
  },
  {
    "id": "ebay-fulfilment",
    "name": "eBay Fulfilment",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "UK/DE fulfillment service via Orange Connex partnership. UK: 'eBay Fulfilment by Orange Connex', DE: 'eBay Fulfillment'.",
    "market": ["UK", "DE"],
    "year": 2022
  },
  {
    "id": "issue-resolution-center",
    "name": "Issue Resolution Center",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "buyer-support",
    "desc": "Legacy dispute resolution tool being deprecated in favor of Resolution Center.",
    "market": "US",
    "year": 2008,
    "renamedTo": "resolution-center"
  },
  {
    "id": "certified-recycled",
    "name": "Certified Recycled",
    "type": "impact",
    "tier": "program",
    "status": "current",
    "parent": "sustainability",
    "desc": "UK certification program for refurbished electronics emphasizing environmental sustainability and recycling standards.",
    "market": "UK",
    "year": 2023
  },
  {
    "id": "vero-program",
    "name": "VeRO Program",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "Verified Rights Owner program allowing trademark and copyright holders to report infringement. DE: 'VeRI-Programm'.",
    "market": "global",
    "year": 1998
  },
  {
    "id": "ebay-international-standard-delivery",
    "name": "eBay International Standard Delivery",
    "type": "category",
    "tier": "program",
    "status": "legacy",
    "parent": "shipping",
    "desc": "Deprecated international shipping option replaced by eBay International Shipping (July 2023).",
    "market": "US",
    "year": 2019,
    "renamedTo": "ebay-international-shipping"
  },
  {
    "id": "simple-delivery",
    "name": "Simple Delivery",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "UK mandatory C2C shipping program with standardized rates and integrated label printing.",
    "market": "UK",
    "year": 2023
  },
  {
    "id": "local-pickup",
    "name": "Local Pickup",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Buyer collection option avoiding shipping. UK: 'Collection in person', DE: 'Abholung', FR: 'Remise en mains propres', IT: 'Ritiro di persona'.",
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
    "desc": "Buy online, pick up at retail location or collection point. Available UK, DE, AU. FR: 'Point de retrait', IT: 'Punto di ritiro'.",
    "market": ["UK", "DE", "AU", "FR", "IT"],
    "year": 2020
  },
  {
    "id": "ebay-collection-points",
    "name": "eBay Collection Points",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "UK/AU network of retail pickup locations for Click & Collect orders.",
    "market": ["UK", "AU"],
    "year": 2021
  },
  {
    "id": "in-store-pickup",
    "name": "In-Store Pickup",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "US term for Click & Collect service allowing buyers to collect purchases at seller's physical retail location.",
    "market": "US",
    "year": 2020
  },
  {
    "id": "managed-delivery",
    "name": "Managed Delivery",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "White-glove delivery service for large items like furniture, appliances, and heavy equipment with installation options.",
    "market": "US",
    "year": 2020
  },
  {
    "id": "logistica-ebay-orange-connex",
    "name": "Logistica eBay by Orange Connex",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "Italy-specific fulfillment service operated via Orange Connex partnership.",
    "market": "IT",
    "year": 2022
  },
  {
    "id": "ebay-for-charity",
    "name": "eBay for Charity",
    "type": "impact",
    "tier": "program",
    "status": "current",
    "parent": "impact",
    "desc": "Charity fundraising program allowing sellers to donate sale proceeds to nonprofits. IT uses separate 'Aste di beneficenza' structure.",
    "market": ["US", "UK", "DE", "CA", "AU"],
    "year": 2003
  },
  {
    "id": "watchlist",
    "name": "Watchlist",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Saved items list for tracking auctions and listings. DE: 'Beobachtungsliste', FR: 'Objets suivis', IT: 'Oggetti che osservi'.",
    "market": "global",
    "year": 1997
  },
  {
    "id": "price-guide",
    "name": "Price Guide",
    "type": "category",
    "tier": "product",
    "status": "current",
    "parent": "collectibles",
    "desc": "Pricing database for trading cards and collectibles showing recent sales and market values.",
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
    "desc": "Dedicated landing page and tools for trading card collectors including Price Guide integration and authentication.",
    "market": "US",
    "year": 2021
  },
  {
    "id": "tcgplayer",
    "name": "TCGplayer",
    "type": "category",
    "tier": "platform",
    "status": "current",
    "parent": "collectibles",
    "desc": "Trading card marketplace acquired by eBay (October 2022), operates as standalone platform with eBay integration.",
    "market": ["US", "UK", "CA"],
    "year": 2022
  },
  {
    "id": "ebay-standard-envelope",
    "name": "eBay Standard Envelope",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "US-only low-cost tracked shipping option for trading cards and small collectibles using standard envelopes.",
    "market": "US",
    "year": 2021
  },
  {
    "id": "export-academy",
    "name": "Export Academy",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "education",
    "desc": "Educational program teaching sellers how to expand internationally and use cross-border trade tools.",
    "market": "global",
    "year": 2019
  },
  {
    "id": "ebay-community",
    "name": "eBay Community",
    "type": "category",
    "tier": "platform",
    "status": "current",
    "parent": "support",
    "desc": "Peer-to-peer support forums for buyers and sellers. DE: 'Community', FR: 'Communauté eBay', IT: 'Community di eBay'.",
    "market": "global",
    "year": 1996
  },
  {
    "id": "feedback-forum",
    "name": "Feedback Forum",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "feedback",
    "desc": "Historical feedback system discussion forum where users can discuss feedback disputes and seller performance.",
    "market": ["US", "UK", "CA", "AU"],
    "year": 1996
  },
  {
    "id": "ebay-university",
    "name": "eBay University",
    "type": "category",
    "tier": "program",
    "status": "legacy",
    "parent": "education",
    "desc": "Legacy in-person seller education program replaced by eBay Academy online courses.",
    "market": "US",
    "year": 2006,
    "renamedTo": "ebay-academy"
  },
  {
    "id": "make-offer",
    "name": "Make Offer",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing",
    "desc": "Buyer-initiated negotiation feature allowing offers below listing price. DE: 'Preisvorschlag senden', FR: 'Faire une offre', IT: 'Fai una proposta'.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "image-search",
    "name": "Image Search",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "search",
    "desc": "Visual search allowing buyers to search using photos instead of text queries.",
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
    "desc": "Browser extension and mobile feature enabling image-based product search from external websites.",
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
    "desc": "Browse navigation organizing listings into hierarchical categories. DE: 'Stöbern in Kategorien', FR: 'Explorer par catégorie', IT: 'Tutte le categorie'.",
    "market": "global",
    "year": 1995
  }
]
