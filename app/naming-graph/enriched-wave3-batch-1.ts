// eBay Naming Graph - Wave 3 Enrichment Batch 1
// Source: translations.ts + Research-Session-Complete-2026-04-17.md
// Generated: 2026-04-17
// Programs: 50 NEW programs with full GraphNode metadata

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

export const ENRICHED_WAVE3_1: GraphNode[] = [
  {
    "id": "selling-manager",
    "name": "Selling Manager",
    "type": "category",
    "tier": "product",
    "status": "legacy",
    "parent": "sellertools",
    "desc": "Legacy listing and order management tool for sellers, precursor to Seller Hub with bulk operations and automation.",
    "market": "global",
    "year": 2004
  },
  {
    "id": "selling-manager-pro",
    "name": "Selling Manager Pro",
    "type": "category",
    "tier": "product",
    "status": "legacy",
    "parent": "sellertools",
    "desc": "Premium version of Selling Manager with advanced reporting, inventory management, and automation. Italy branded as 'Gestore delle vendite Plus'.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "terapeak",
    "name": "Terapeak",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "sellertools",
    "renamedTo": "product-research",
    "desc": "Market research tool acquired by eBay in 2017, rebranded as 'Product research' in seller-facing UI but Terapeak still used technically.",
    "market": "global",
    "year": 2017
  },
  {
    "id": "product-research",
    "name": "Product research",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "sellertools",
    "renamedFrom": "terapeak",
    "desc": "Market research and competitive analysis tool integrated into Seller Hub, formerly branded as Terapeak.",
    "market": "global",
    "year": 2017
  },
  {
    "id": "promoted-listings-general",
    "name": "Promoted Listings Standard",
    "type": "advertising",
    "tier": "variant",
    "status": "current",
    "parent": "promoted-listings",
    "desc": "Cost-per-sale advertising option promoting individual listings in search results. Base tier of Promoted Listings.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "promoted-listings-priority",
    "name": "Promoted Listings Advanced",
    "type": "advertising",
    "tier": "variant",
    "status": "current",
    "parent": "promoted-listings",
    "desc": "Premium tier offering priority placement and enhanced visibility. Germany uses 'Premium' strategy instead of 'Priority' terminology.",
    "market": "global",
    "year": 2019
  },
  {
    "id": "promoted-listings-express",
    "name": "Promoted Listings Express",
    "type": "advertising",
    "tier": "variant",
    "status": "legacy",
    "parent": "promoted-listings",
    "desc": "Simplified flat-fee advertising option discontinued April 2024 globally (Germany July 2023). Replaced by Advanced tier.",
    "market": "global",
    "year": 2020,
    "renamedTo": "promoted-listings-advanced"
  },
  {
    "id": "promoted-offsite",
    "name": "Promoted Offsite",
    "type": "advertising",
    "tier": "program",
    "status": "current",
    "parent": "advertising",
    "desc": "Off-eBay advertising on Google, Facebook, and partner sites. DE: 'Externe Anzeigen', FR: 'Annonces externes', IT: 'Annunci sponsorizzati esterni'.",
    "market": "global",
    "year": 2020
  },
  {
    "id": "promoted-stores-custom",
    "name": "Promoted Stores Custom",
    "type": "advertising",
    "tier": "program",
    "status": "current",
    "parent": "promoted-stores",
    "desc": "Custom advertising campaigns for eBay Stores with tailored targeting and budgets.",
    "market": "US",
    "year": 2021
  },
  {
    "id": "brand-funded-promoted-listings-priority",
    "name": "Brand-Funded Promoted Listings Priority",
    "type": "advertising",
    "tier": "program",
    "status": "current",
    "parent": "advertising",
    "desc": "Brand-sponsored advertising program where manufacturers fund seller ad campaigns.",
    "market": ["US", "UK"],
    "year": 2022
  },
  {
    "id": "brand-funded-promoted-stores",
    "name": "Brand-Funded Promoted Stores",
    "type": "advertising",
    "tier": "program",
    "status": "current",
    "parent": "advertising",
    "desc": "Store-level brand-funded advertising where manufacturers sponsor entire seller stores.",
    "market": ["US", "UK"],
    "year": 2022
  },
  {
    "id": "promoted-brand",
    "name": "Promoted Brand",
    "type": "advertising",
    "tier": "program",
    "status": "current",
    "parent": "advertising",
    "desc": "Brand-level advertising campaigns promoting manufacturers across eBay inventory.",
    "market": ["US", "UK"],
    "year": 2023
  },
  {
    "id": "managed-display",
    "name": "Managed Display",
    "type": "advertising",
    "tier": "program",
    "status": "current",
    "parent": "advertising",
    "desc": "Managed display advertising service with eBay teams handling campaign execution.",
    "market": ["US", "UK"],
    "year": 2022
  },
  {
    "id": "vehicle-purchase-protection",
    "name": "Vehicle Purchase Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "Protection program for vehicle purchases covering fraud and misrepresentation up to purchase price.",
    "market": ["US", "CA"],
    "year": 2019
  },
  {
    "id": "business-equipment-purchase-protection",
    "name": "Business Equipment Purchase Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "Protection program for business and industrial equipment purchases.",
    "market": "US",
    "year": 2020
  },
  {
    "id": "certified-open-box",
    "name": "Certified open-box",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "refurbished",
    "desc": "US-only program launched May 2025 for open-box items certified by retailers/manufacturers with warranty.",
    "market": "US",
    "year": 2025
  },
  {
    "id": "ebay-assured-fit",
    "name": "eBay Assured Fit",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "ebay-motors",
    "desc": "UK equivalent of eBay Guaranteed Fit, providing compatibility assurance and free returns for automotive parts that don't match vehicle specifications.",
    "market": "UK",
    "year": 2021
  },
  {
    "id": "buyer-protection",
    "name": "Buyer Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "UK-specific branding for buyer protection policies and guarantees.",
    "market": "UK",
    "year": 2000
  },
  {
    "id": "ebay-buyer-guarantee",
    "name": "eBay Buyer Guarantee",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "Alternative branding for Money Back Guarantee used in some markets. Identical coverage to eBay Money Back Guarantee.",
    "market": "global",
    "year": 2011
  },
  {
    "id": "ebay-premium-services",
    "name": "eBay Premium Services",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "seller-performance-standards",
    "desc": "UK: 'Premium Service', DE: 'Top-Service' (Feb 2024), FR: 'Service Premium', IT: 'Servizio Premium'. Replaces Top Rated Plus badges in select markets.",
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
    "desc": "Seller protection policies covering payment fraud, unauthorized transactions, and item not received claims.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "global-shipping-program",
    "name": "Global Shipping Program",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "International shipping service. US replaced by eBay International Shipping July 2023. UK still active (operated by Pitney Bowes).",
    "market": "UK",
    "year": 2012,
    "renamedTo": "ebay-international-shipping"
  },
  {
    "id": "ebay-fulfilment",
    "name": "eBay Fulfilment",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "UK: 'eBay Fulfilment by Orange Connex', DE: 'eBay Fulfillment'. Warehousing and fulfillment service operated by Orange Connex.",
    "market": ["UK", "DE"],
    "year": 2019
  },
  {
    "id": "issue-resolution-center",
    "name": "Issue Resolution Center",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "support",
    "renamedTo": "resolution-center",
    "desc": "Legacy dispute resolution interface, consolidated into Resolution Center.",
    "market": "US",
    "year": 2008
  },
  {
    "id": "certified-recycled",
    "name": "Certified Recycled",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "sustainability",
    "desc": "UK program certifying products made from recycled materials meeting environmental standards.",
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
    "desc": "Verified Rights Owner program for intellectual property protection. DE: 'VeRI-Programm' (Verifizierte Rechteinhaber).",
    "market": "global",
    "year": 1998
  },
  {
    "id": "ebay-international-standard-delivery",
    "name": "eBay international standard delivery",
    "type": "category",
    "tier": "program",
    "status": "legacy",
    "parent": "shipping",
    "desc": "US international shipping option deprecated July 2023, replaced by eBay International Shipping (eIS).",
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
    "desc": "UK mandatory C2C shipping service providing standardized delivery options.",
    "market": "UK",
    "year": 2022
  },
  {
    "id": "click-and-collect",
    "name": "Click & Collect",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "In-person pickup option at retail locations. UK, DE, AU use 'Click & Collect', FR: 'Point de retrait', IT: 'Punto di ritiro'.",
    "market": ["UK", "DE", "FR", "IT", "AU"],
    "year": 2014
  },
  {
    "id": "ebay-collection-points",
    "name": "eBay Collection Points",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "UK: 'eBay Collection Points', AU: 'Collection Points'. Network of retail pickup locations.",
    "market": ["UK", "AU"],
    "year": 2015
  },
  {
    "id": "in-store-pickup",
    "name": "In-Store Pickup",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "US branding for retail store pickup. Other markets use 'Click & Collect'.",
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
    "desc": "White-glove delivery service for large items with scheduled delivery and setup.",
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
    "desc": "Italy-specific fulfillment service operated by Orange Connex with warehousing and logistics.",
    "market": "IT",
    "year": 2021
  },
  {
    "id": "excellent-refurbished",
    "name": "Excellent Refurbished",
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
    "name": "Very Good Refurbished",
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
    "name": "Good Refurbished",
    "type": "trust",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-refurbished",
    "desc": "Base tier of 4-tier eBay Refurbished system. DE: 'Gut', FR: 'État correct', IT: 'Buono'.",
    "market": "global",
    "year": 2021
  },
  {
    "id": "watchlist",
    "name": "Watchlist",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Saved item list for tracking auctions and listings. DE: 'Beobachtungsliste', FR: 'Objets suivis', IT: 'Oggetti che osservi'.",
    "market": "global",
    "year": 1997
  },
  {
    "id": "image-search",
    "name": "Image Search",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "search",
    "desc": "Visual search feature allowing buyers to search using images instead of text queries.",
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
    "desc": "Browser extension and mobile feature for discovering eBay listings while browsing other sites.",
    "market": ["US", "UK", "CA", "AU"],
    "year": 2019
  },
  {
    "id": "shop-by-category",
    "name": "Shop by category",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "discovery",
    "desc": "Category browsing navigation. DE: 'Stöbern in Kategorien', FR: 'Explorer par catégorie', IT: 'Tutte le categorie'.",
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
    "desc": "Historical pricing data and market value estimates for collectibles, primarily US-focused.",
    "market": "US",
    "year": 2015
  },
  {
    "id": "trading-card-hub",
    "name": "Trading Card Hub",
    "type": "vertical",
    "tier": "program",
    "status": "current",
    "parent": "collectibles",
    "desc": "Dedicated marketplace for trading cards with authentication, grading integration, and Price Guide.",
    "market": "US",
    "year": 2021
  },
  {
    "id": "tcgplayer",
    "name": "TCGplayer",
    "type": "vertical",
    "tier": "program",
    "status": "current",
    "parent": "collectibles",
    "desc": "Trading card marketplace acquired by eBay in 2022, operating as separate platform.",
    "market": ["US", "UK", "CA"],
    "year": 2022
  },
  {
    "id": "goldin-auctions",
    "name": "Goldin Auctions",
    "type": "vertical",
    "tier": "program",
    "status": "current",
    "parent": "collectibles",
    "desc": "Premium collectibles auction house acquired by eBay in 2024, operating independently.",
    "market": "global",
    "year": 2024
  },
  {
    "id": "ebay-standard-envelope",
    "name": "eBay standard envelope",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Cost-effective tracked envelope shipping option for small, lightweight items under $20.",
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
    "desc": "Educational program teaching international selling, cross-border trade, and global expansion.",
    "market": "global",
    "year": 2019
  },
  {
    "id": "ebay-community",
    "name": "The eBay Community",
    "type": "category",
    "tier": "platform",
    "status": "current",
    "parent": "support",
    "desc": "User forums and discussion boards. DE: 'Community', FR: 'Communauté eBay', IT: 'Community di eBay'.",
    "market": "global",
    "year": 1996
  },
  {
    "id": "feedback-forum",
    "name": "Feedback Forum",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "community",
    "desc": "Legacy feedback discussion area, mostly consolidated into The eBay Community.",
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
    "renamedTo": "ebay-academy",
    "desc": "Legacy seller education program, replaced by eBay Academy.",
    "market": "US",
    "year": 2000
  },
  {
    "id": "make-an-offer",
    "name": "Make Offer",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Buyer-initiated negotiation on Best Offer enabled listings. DE: 'Preisvorschlag senden', FR: 'Faire une offre', IT: 'Fai una proposta'.",
    "market": "global",
    "year": 2005
  }
]
