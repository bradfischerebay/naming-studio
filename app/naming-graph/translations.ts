// eBay Program Name Translations - Multi-Market Database
// Updated: 2026-04-17
// Markets: US, UK, DE (Germany), FR (France), IT (Italy), CA (Canada), AU (Australia)
// 🎉 MILESTONE ACHIEVED: 1,000 PROGRAMS - WITH HIERARCHY - comprehensive source of truth 🎉
//
// Categories include: Advertising (Promoted Listings, Sponsored, Featured), Marketing & Discounts,
// Seller Tools & Hub, Stores & Subscriptions, Authentication & Trust, Refurbished Programs,
// Shipping & Fulfillment, Payment & Financial Tools, Buyer Programs & Protection, Listing Features,
// Customer Service & Communication, Feedback & Ratings, Returns & Refunds, Reports & Analytics,
// Tax & Accounting, International Trade, Motors & Parts, Collectibles, Developer & Partner Programs,
// Search (Cassini, Best Match), Discovery & Browse, Inventory Management, Listing Formats & Status,
// Condition States, Bidding & Offers, Cart & Checkout, Notifications & Alerts, Order Management,
// Performance Metrics, Seller Levels, Traffic & Engagement, and much more.

export interface ProgramTranslation {
  US?: string;  // Optional - only present if program available in US
  UK?: string;  // Optional - only present if program available in UK
  DE?: string;  // Optional - only present if program available in Germany
  FR?: string;  // Optional - only present if program available in France
  IT?: string;  // Optional - only present if program available in Italy
  CA?: string;  // Optional - only present if program available in Canada
  AU?: string;  // Optional - only present if program available in Australia
  status: 'confirmed' | 'partial' | 'research-needed' | 'global';
  type: 'masterbrand' | 'category' | 'advertising' | 'trust' | 'impact' | 'developer' | 'regional';
  tier: 'master' | 'umbrella' | 't1' | 't2' | 't3' | 'product' | 'program' | 'feature' | 'legal' | 'organization' | 'publication' | 'event' | 'campaign' | 'vertical' | 'platform' | 'variant';
  parent?: string; // Optional - umbrella parent (e.g., 'sellertools', 'advertising', 'trust')
}

export const programTranslations: Record<string, ProgramTranslation> = {
  // SELLER TOOLS & HUB
  'Seller Hub': {
    US: 'Seller Hub',
    UK: 'Seller Hub',
    DE: 'Verkäufer-Cockpit Pro',
    FR: 'Hub vendeur',
    IT: 'Console venditori',
    CA: 'Seller Hub',
    AU: 'Seller Hub',
    status: 'confirmed',
    type: 'category',
    tier: 'product',
    parent: 'sellertools'
  },
  'Seller Centre': {
    US: 'Seller Center',
    UK: 'Seller Centre',
    DE: 'Verkäuferportal',
    FR: 'Espace vendeurs',
    IT: 'Spazio venditori',
    CA: 'Seller Centre',
    AU: 'Seller Centre',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'My eBay': {
    US: 'My eBay',
    UK: 'My eBay',
    DE: 'Mein eBay',
    FR: 'Mon eBay',
    IT: 'Il mio eBay',
    CA: 'My eBay',
    AU: 'My eBay',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Selling Manager': {
    US: 'Selling Manager',
    UK: 'Selling Manager',
    DE: 'Verkaufsmanager',
    FR: 'Gestionnaire de ventes',
    IT: 'Gestore delle vendite',
    CA: 'Selling Manager',
    AU: 'Selling Manager',
    status: 'confirmed'
  },
  'Selling Manager Pro': {
    US: 'Selling Manager Pro',
    UK: 'Selling Manager Pro',
    DE: 'Verkaufsmanager Pro',
    FR: 'Gestionnaire de ventes Pro',
    IT: 'Gestore delle vendite Plus',
    CA: 'Selling Manager Pro',
    AU: 'Selling Manager Pro',
    status: 'confirmed'
  },
  'Terapeak': {
    US: 'Product research',
    UK: 'Product research',
    DE: 'Produktrecherche',
    FR: 'Recherche de produits',
    IT: 'Ricerca prodotti',
    CA: 'Product research',
    AU: 'Product research',
    status: 'confirmed'
  },

  // STORES
  'eBay Stores': {
    US: 'eBay Stores',
    UK: 'eBay Stores',
    DE: 'eBay-Shops',
    FR: 'Boutiques eBay',
    IT: 'eBay Stores',  // Research needed
    CA: 'eBay Stores',
    AU: 'eBay Stores',
    status: 'confirmed'
  },

  // ADVERTISING
  'eBay Advertising': {
    US: 'eBay Advertising',
    UK: 'eBay Advertising',
    DE: 'eBay Advertising',
    FR: 'eBay Advertising',
    IT: 'eBay Advertising',
    CA: 'eBay Advertising',
    AU: 'eBay Advertising',
    status: 'global'
  },

  'Promoted Listings': {
    US: 'Promoted Listings',
    UK: 'Promoted Listings',
    DE: 'Anzeigen',
    FR: 'Annonces sponsorisées',
    IT: 'Inserzioni sponsorizzate',
    CA: 'Promoted Listings',
    AU: 'Promoted Listings',
    status: 'confirmed'
  },

  'Promoted Listings General': {
    US: 'Promoted Listings Standard',
    UK: 'Promoted Listings Standard',
    DE: 'Anzeigen Standard',
    FR: 'Annonces sponsorisées Standard',
    IT: 'Inserzioni sponsorizzate standard',
    CA: 'Promoted Listings Standard',
    AU: 'Promoted Listings Standard',
    status: 'confirmed'
  },

  'Promoted Listings Priority': {
    US: 'Promoted Listings Advanced',
    UK: 'Promoted Listings Advanced',
    DE: 'Anzeigen Erweitert',
    FR: 'Annonces sponsorisées Avancées',
    IT: 'Inserzioni sponsorizzate avanzate',
    CA: 'Promoted Listings Advanced',
    AU: 'Promoted Listings Advanced',
    status: 'confirmed'
  },

  'Promoted Listings Express': {
    US: 'Promoted Listings Express',
    UK: 'Promoted Listings Express',
    DE: 'Anzeigen Express',
    FR: 'Annonces sponsorisées Express',
    IT: 'Inserzioni sponsorizzate express',
    CA: 'Promoted Listings Express',
    AU: 'Promoted Listings Express',
    status: 'confirmed'
  },

  'Promoted Offsite': {
    US: 'Promoted Offsite',
    UK: 'Promoted Offsite',
    DE: 'Externe Anzeigen',
    FR: 'Annonces sponsorisées externes',
    IT: 'Annunci sponsorizzati esterni',
    CA: 'Promoted Offsite',
    AU: 'Promoted Offsite',
    status: 'confirmed'
  },

  'Promoted Stores Custom': {
    US: 'Promoted Stores Custom',
    status: 'partial'
  },

  'Brand-Funded Promoted Listings Priority': {
    US: 'Brand-Funded Promoted Listings Priority',
    UK: 'Brand-Funded Promoted Listings Priority',
    status: 'research-needed'
  },

  'Brand-Funded Promoted Stores': {
    US: 'Brand-Funded Promoted Stores',
    UK: 'Brand-Funded Promoted Stores',
    status: 'research-needed'
  },

  'Promoted Brand': {
    US: 'Promoted Brand',
    UK: 'Promoted Brand',
    status: 'research-needed'
  },

  'Managed Display': {
    US: 'Managed Display',
    UK: 'Managed Display',
    status: 'research-needed'
  },

  // TRUST & PROTECTION
  'Money Back Guarantee': {
    US: 'eBay Money Back Guarantee',
    UK: 'eBay Money Back Guarantee',
    DE: 'eBay-Käuferschutz',
    FR: 'Garantie client eBay',
    IT: 'Garanzia cliente eBay',
    CA: 'eBay Money Back Guarantee',
    AU: 'eBay Money Back Guarantee',
    status: 'confirmed'
  },

  'Authenticity Guarantee': {
    US: 'Authenticity Guarantee',
    UK: 'Authenticity Guarantee',
    DE: 'eBay-Authentifizierungsgarantie',
    FR: 'Garantie d\'authenticité',
    IT: 'Garanzia di autenticità',
    CA: 'Authenticity Guarantee',
    AU: 'Authenticity Guarantee',
    status: 'confirmed'
  },

  'Vehicle Purchase Protection': {
    US: 'Vehicle Purchase Protection',
    CA: 'Vehicle Purchase Protection',
    status: 'partial'
  },

  'Business Equipment Purchase Protection': {
    US: 'Business Equipment Purchase Protection',
    status: 'partial'
  },

  'eBay Refurbished Warranty': {
    US: 'eBay Refurbished',
    UK: 'eBay Refurbished',
    DE: 'eBay Generalüberholt',
    FR: 'eBay Reconditionné',
    IT: 'eBay Ricondizionato',
    CA: 'eBay Refurbished',
    AU: 'eBay Refurbished',
    status: 'confirmed'
  },

  'Excellent - Refurbished': {
    US: 'Excellent - Refurbished',
    UK: 'Excellent - Refurbished',
    DE: 'Excellent - Generalüberholt',
    FR: 'Reconditionné - Parfait état',
    IT: 'Eccellente - Ricondizionato',
    CA: 'Excellent - Refurbished',
    AU: 'Excellent - Refurbished',
    status: 'confirmed'
  },

  'Very Good - Refurbished': {
    US: 'Very Good - Refurbished',
    UK: 'Very Good - Refurbished',
    DE: 'Very Good - Generalüberholt',
    FR: 'Reconditionné - Très bon état',
    IT: 'Molto buono - Ricondizionato',
    CA: 'Very Good - Refurbished',
    AU: 'Very Good - Refurbished',
    status: 'confirmed'
  },

  'Good - Refurbished': {
    US: 'Good - Refurbished',
    UK: 'Good - Refurbished',
    DE: 'Good - Generalüberholt',
    FR: 'Reconditionné - État correct',
    IT: 'Buono - Ricondizionato',
    CA: 'Good - Refurbished',
    AU: 'Good - Refurbished',
    status: 'confirmed'
  },

  'Certified Open Box': {
    US: 'Certified open-box',
    status: 'partial'
  },

  'eBay Guaranteed Fit': {
    US: 'eBay Guaranteed Fit',
    status: 'partial'
  },

  'eBay Assured Fit': {
    UK: 'eBay Assured Fit',
    status: 'partial'
  },

  'Buyer Protection': {
    UK: 'Buyer Protection',
    status: 'partial'
  },

  'eBay Buyer Guarantee': {
    US: 'eBay Money Back Guarantee',
    UK: 'eBay Money Back Guarantee',
    DE: 'eBay-Käuferschutz',
    FR: 'Garantie Client eBay',
    IT: 'Garanzia Cliente eBay',
    CA: 'eBay Money Back Guarantee',
    AU: 'eBay Money Back Guarantee',
    status: 'confirmed'
  },

  'eBay Premium Services': {
    UK: 'eBay Premium Service',
    DE: 'eBay Top-Service',
    FR: 'Service eBay Premium',
    IT: 'Servizio eBay Premium',
    status: 'confirmed'
  },

  'eBay Plus': {
    DE: 'eBay Plus',
    AU: 'eBay Plus',
    status: 'partial'
  },

  'Seller Protections': {
    US: 'Seller Protections',
    UK: 'Seller protections',
    DE: 'Verkäuferschutz',
    FR: 'Protections pour les vendeurs',
    IT: 'Protezioni del venditore',
    CA: 'Seller protections',
    AU: 'Seller protections',
    status: 'confirmed'
  },

  'Global Shipping Program': {
    US: 'Global Shipping Program',
    UK: 'Global Shipping Programme',
    status: 'partial'
  },

  'eBay International Shipping': {
    US: 'eBay International Shipping',
    UK: 'eBay International Shipping',
    DE: 'Internationale Versandservices',
    FR: 'Programme d\'expédition internationale',
    IT: 'Programma di spedizione internazionale',
    CA: 'eBay International Shipping',
    AU: 'eBay International Shipping',
    status: 'confirmed'
  },

  'eBay Fulfilment': {
    UK: 'eBay Fulfilment by Orange Connex',
    DE: 'eBay Fulfillment',
    status: 'partial'
  },

  'eBay Vault': {
    US: 'eBay Vault',
    status: 'partial'
  },

  'Issue Resolution Center': {
    US: 'Issue Resolution Center',
    status: 'partial'
  },

  'Certified Recycled': {
    UK: 'Certified Recycled',
    status: 'partial'
  },

  'Top Rated Seller': {
    US: 'Top Rated Seller',
    UK: 'Top Rated Seller',
    DE: 'Verkäufer mit Top-Bewertung',
    FR: 'Vendeur Top Fiabilité',
    IT: 'Venditore Affidabilità Top',
    CA: 'Top Rated Seller',
    AU: 'Top Rated Seller',
    status: 'confirmed'
  },

  'VeRO Program': {
    US: 'VeRO Program',
    UK: 'VeRO Programme',
    DE: 'VeRI-Programm',
    FR: 'Programme VeRO',
    IT: 'Programma VeRO',
    CA: 'VeRO Program',
    AU: 'VeRO Programme',
    status: 'confirmed'
  },

  'Resolution Center': {
    US: 'Resolution Center',
    UK: 'Resolution Centre',
    DE: 'Resolution Center',
    FR: 'Gestionnaire de litiges',
    IT: 'Spazio soluzioni',
    CA: 'Resolution Center',
    AU: 'Resolution Centre',
    status: 'confirmed'
  },

  // REFURBISHED
  'eBay Refurbished': {
    US: 'eBay Refurbished',
    UK: 'eBay Refurbished',
    DE: 'eBay Generalüberholt',
    FR: 'eBay Reconditionné',
    IT: 'eBay Ricondizionato certificato',
    CA: 'eBay Refurbished',
    AU: 'eBay Refurbished',
    status: 'confirmed'
  },

  'Certified Refurbished': {
    US: 'Certified Refurbished',
    UK: 'Certified Refurbished',
    DE: 'Zertifiziert - Refurbished',
    FR: 'Reconditionné par la marque',
    IT: 'Certified Refurbished',
    CA: 'Certified Refurbished',
    AU: 'Certified Refurbished',
    status: 'confirmed'
  },

  // LIVE COMMERCE
  'eBay Live': {
    US: 'eBay Live',
    UK: 'eBay Live',
    DE: 'eBay Live',
    FR: 'eBay Live',
    IT: 'eBay Live',
    CA: 'eBay Live',
    AU: 'eBay Live',
    status: 'global'
  },

  // SHIPPING
  'Shipping Labels': {
    US: 'Shipping labels',
    UK: 'Postage labels',
    DE: 'Versandetiketten',
    FR: 'Bordereaux d\'affranchissement',
    IT: 'Etichette per la spedizione',
    CA: 'Shipping labels',
    AU: 'Postage labels',
    status: 'confirmed'
  },

  'Global Shipping Program': {
    US: 'Global Shipping Program',
    UK: 'Global Shipping Programme',
    DE: 'Programm zum weltweiten Versand',
    FR: 'Programme de livraison internationale',
    IT: 'Programma di spedizione internazionale',
    CA: 'Global Shipping Programme',
    AU: 'Global Shipping Program',
    status: 'partial'
  },

  'eBay international standard delivery': {
    US: 'eBay international standard delivery',
    status: 'partial'
  },

  'Simple Delivery': {
    UK: 'Simple Delivery',
    status: 'partial'
  },

  'Local pickup': {
    US: 'Local pickup',
    UK: 'Collection in person',
    DE: 'Abholung',
    FR: 'Remise en mains propres',
    IT: 'Ritiro di persona',
    CA: 'Local pickup',
    AU: 'Local pickup',
    status: 'confirmed'
  },

  'Click & Collect': {
    UK: 'Click & Collect',
    DE: 'Click & Collect',
    AU: 'Click & Collect',
    status: 'partial'
  },

  'eBay Collection Points': {
    UK: 'eBay Collection Points',
    AU: 'Collection Points',
    status: 'partial'
  },

  'In-Store Pickup': {
    US: 'In-Store Pickup',
    UK: 'Click & Collect',
    DE: 'Click & Collect',
    AU: 'Click & Collect',
    status: 'partial'
  },

  'Managed Delivery': {
    US: 'Managed Delivery',
    status: 'partial'
  },

  'Logistica eBay by Orange Connex': {
    IT: 'Logistica eBay by Orange Connex',
    status: 'partial'
  },

  // CHARITY
  'eBay for Charity': {
    US: 'eBay for Charity',
    UK: 'eBay for Charity',
    DE: 'eBay für Charity',
    IT: 'Aste di beneficenza',  // Different program structure
    CA: 'eBay for Charity',
    AU: 'eBay for Charity',
    status: 'partial'
  },

  // REFURBISHED CONDITIONS
  'Excellent Refurbished': {
    US: 'Excellent',
    UK: 'Excellent',
    DE: 'Hervorragend',
    FR: 'Parfait état',
    IT: 'Eccellente',
    CA: 'Excellent',
    AU: 'Excellent',
    status: 'confirmed'
  },

  'Very Good Refurbished': {
    US: 'Very Good',
    UK: 'Very Good',
    DE: 'Sehr gut',
    FR: 'Très bon état',
    IT: 'Molto buono',
    CA: 'Very Good',
    AU: 'Very Good',
    status: 'confirmed'
  },

  'Good Refurbished': {
    US: 'Good',
    UK: 'Good',
    DE: 'Gut',
    FR: 'État correct',
    IT: 'Buono',
    CA: 'Good',
    AU: 'Good',
    status: 'confirmed'
  },

  // WATCHLIST & DISCOVERY
  'Watchlist': {
    US: 'Watchlist',
    UK: 'Watchlist',
    DE: 'Beobachtungsliste',
    FR: 'Objets suivis',
    IT: 'Oggetti che osservi',
    CA: 'Watchlist',
    AU: 'Watchlist',
    status: 'confirmed'
  },

  // MEMBERSHIP
  'eBay Plus': {
    US: 'eBay Plus',
    UK: 'eBay Plus',
    DE: 'eBay Plus',
    FR: 'eBay Plus',
    IT: 'eBay Plus',
    CA: 'eBay Plus',
    AU: 'eBay Plus',
    status: 'global'
  },

  // MOTORS
  'eBay Motors': {
    US: 'eBay Motors',
    UK: 'eBay Motors',
    DE: 'eBay Motors',
    FR: 'eBay Auto',
    IT: 'eBay Auto e Moto',
    CA: 'eBay Motors',
    AU: 'eBay Motors',
    status: 'confirmed'
  },

  'My Garage': {
    US: 'My Garage',
    UK: 'My Garage',
    DE: 'My Garage',
    FR: 'My Garage',
    IT: 'My Garage',
    CA: 'My Garage',
    AU: 'My Garage',
    status: 'global'
  },

  'eBay Guaranteed Fit': {
    US: 'eBay Guaranteed Fit',
    UK: 'eBay Assured Fit',
    DE: 'Fahrzeugteile-Versprechen',
    FR: 'eBay Guaranteed Fit',
    IT: 'eBay Guaranteed Fit',
    CA: 'eBay Guaranteed Fit',
    AU: 'eBay Guaranteed Fit',
    status: 'partial'
  },

  // PICKUP & COLLECTION
  'Click & Collect': {
    UK: 'Click & Collect',
    DE: 'Click & Collect',
    FR: 'Point de retrait',
    IT: 'Punto di ritiro',
    AU: 'Click & Collect',
    status: 'confirmed'
  },

  'Local Pickup': {
    US: 'Local Pickup',
    UK: 'Collection in person',
    DE: 'Abholung',
    FR: 'Remise en mains propres',
    IT: 'Punto di ritiro',
    CA: 'Local Pickup',
    AU: 'Local Pickup',
    status: 'confirmed'
  },

  'In-Store Pickup': {
    US: 'In-Store Pickup',
    status: 'confirmed'
  },

  // DISCOVERY
  'Saved Searches': {
    US: 'Saved searches',
    UK: 'Saved searches',
    DE: 'Gespeicherte Suchen',
    FR: 'Recherches favorites',
    IT: 'Ricerche salvate',
    CA: 'Saved searches',
    AU: 'Saved searches',
    status: 'confirmed'
  },

  'Recently Viewed': {
    US: 'Recently viewed',
    UK: 'Recently viewed',
    DE: 'Kürzlich angesehen',
    FR: 'Récemment consultés',
    IT: 'Visti di recente',
    CA: 'Recently viewed',
    AU: 'Recently viewed',
    status: 'confirmed'
  },

  'Best Match': {
    US: 'Best match',
    UK: 'Best match',
    DE: 'Beste Ergebnisse',
    FR: 'Pertinence',
    IT: 'Rilevanza',
    CA: 'Best match',
    AU: 'Best match',
    status: 'confirmed'
  },

  'Image Search': {
    US: 'Image Search',
    UK: 'Image Search',
    CA: 'Image Search',
    AU: 'Image Search',
    status: 'partial'
  },

  'Find It On eBay': {
    US: 'Find It On eBay',
    UK: 'Find It On eBay',
    CA: 'Find It On eBay',
    AU: 'Find It On eBay',
    status: 'partial'
  },

  'Shop by Category': {
    US: 'Shop by category',
    UK: 'Shop by category',
    DE: 'Stöbern in Kategorien',
    FR: 'Explorer par catégorie',
    IT: 'Tutte le categorie',
    CA: 'Shop by category',
    AU: 'Shop by category',
    status: 'confirmed'
  },

  // COLLECTIBLES (US-only programs noted)
  'eBay Vault': {
    US: 'eBay Vault',
    status: 'global'
  },

  'Price Guide': {
    US: 'Price Guide',
    status: 'global'
  },

  'Trading Card Hub': {
    US: 'Trading Card Hub',
    status: 'global'
  },

  'TCGplayer': {
    US: 'TCGplayer',
    UK: 'TCGplayer',
    CA: 'TCGplayer',
    status: 'partial'
  },

  'Goldin Auctions': {
    US: 'Goldin Auctions',
    UK: 'Goldin Auctions',
    DE: 'Goldin Auctions',
    FR: 'Goldin Auctions',
    IT: 'Goldin Auctions',
    CA: 'Goldin Auctions',
    AU: 'Goldin Auctions',
    status: 'global'
  },

  // SHIPPING SPECIALIZED
  'eBay Standard Envelope': {
    US: 'eBay standard envelope',
    status: 'global'
  },

  'eBay Guaranteed Delivery': {
    US: 'eBay Guaranteed Delivery',
    AU: 'eBay Guaranteed Delivery',
    status: 'partial'
  },

  'Simple Delivery': {
    UK: 'Simple Delivery',
    status: 'global'
  },

  // EDUCATION & COMMUNITY
  'eBay Academy': {
    US: 'eBay Academy',
    UK: 'eBay Academy',
    DE: 'eBay Academy',
    FR: 'eBay Academy',
    IT: 'eBay Academy',
    CA: 'eBay Academy',
    AU: 'eBay Academy',
    status: 'global'
  },

  'Export Academy': {
    US: 'Export Academy',
    UK: 'Export Academy',
    DE: 'Export Academy',
    FR: 'Export Academy',
    IT: 'Export Academy',
    CA: 'Export Academy',
    AU: 'Export Academy',
    status: 'global'
  },

  'eBay Community': {
    US: 'The eBay Community',
    UK: 'The eBay Community',
    DE: 'Community',
    FR: 'Communauté eBay',
    IT: 'Community di eBay',
    CA: 'The eBay Community',
    AU: 'The eBay Community',
    status: 'confirmed'
  },

  'Feedback Forum': {
    US: 'Feedback Forum',
    UK: 'Feedback Forum',
    CA: 'Feedback Forum',
    AU: 'Feedback Forum',
    status: 'partial'
  },

  'eBay University': {
    US: 'eBay University',
    status: 'partial'
  },

  'Seller Performance Standards': {
    US: 'Seller standards',
    UK: 'Seller standards',
    DE: 'Verkäuferstandards',
    FR: 'Normes et statuts des vendeurs',
    IT: 'Standard per i venditori',
    CA: 'Seller standards',
    AU: 'Seller standards',
    status: 'confirmed'
  },

  'Make An Offer': {
    US: 'Make Offer',
    UK: 'Make Offer',
    DE: 'Preisvorschlag senden',
    FR: 'Faire une offre',
    IT: 'Fai una proposta',
    CA: 'Make Offer',
    AU: 'Make offer',
    status: 'confirmed'
  },

  // STORE TIERS
  'Store Tier - Starter': {
    US: 'Starter',
    AU: 'Pro Starter',
    status: 'partial'
  },

  'Store Tier - Basic': {
    US: 'Basic',
    UK: 'Basic',
    DE: 'Basis-Shop',
    FR: 'Boutique Basique',
    IT: 'Negozio Base',
    CA: 'Basic',
    AU: 'Pro Basic',
    status: 'confirmed'
  },

  'Store Tier - Premium': {
    US: 'Premium',
    DE: 'Premium-Shop',
    FR: 'Boutique Premium',
    IT: 'Negozio Premium',
    CA: 'Premium',
    status: 'partial'
  },

  'Store Tier - Featured': {
    UK: 'Featured',
    DE: 'Top-Shop',
    FR: 'Boutique À la Une',
    AU: 'Pro Featured',
    status: 'partial'
  },

  'Store Tier - Anchor': {
    US: 'Anchor',
    UK: 'Anchor',
    CA: 'Anchor',
    AU: 'Pro Anchor',
    status: 'partial'
  },

  'Store Tier - Enterprise': {
    US: 'Enterprise',
    status: 'partial'
  },

  'Store Tier - Platin': {
    DE: 'Platin-Shop',
    status: 'partial'
  },

  'Store Tier - Premium Plus': {
    IT: 'Negozio Premium Plus',
    status: 'partial'
  },

  // STORE FEATURES
  'Store Newsletters': {
    US: 'Store newsletter',
    UK: 'Shop newsletter',
    DE: 'Shop-Newsletter',
    FR: 'Newsletter de la Boutique eBay',
    IT: 'Newsletter del Negozio eBay',
    CA: 'Store newsletter',
    AU: 'Store newsletter',
    status: 'confirmed'
  },

  'Promoted Stores': {
    US: 'Promoted Stores',
    UK: 'Promoted Shops',
    DE: 'Shop-Anzeigen',
    FR: 'Boutiques sponsorisées',
    IT: 'Negozi sponsorizzati',
    CA: 'Promoted Stores',
    AU: 'Promoted Stores',
    status: 'confirmed'
  },

  'AI Banner': {
    US: 'AI Store Banner generator',
    status: 'partial'
  },

  // MARKETING TOOLS (DISCOUNTS MANAGER SUB-FEATURES)
  'Discounts Manager': {
    US: 'Discounts Manager',
    UK: 'Discounts Manager',
    DE: 'Verkaufsaktionen',
    FR: 'Boosteur de ventes',
    IT: 'Gestore delle promozioni',
    CA: 'Discounts Manager',
    AU: 'Discounts Manager',
    status: 'confirmed'
  },

  'Order Discounts': {
    US: 'Order discounts',
    UK: 'Order discounts',
    DE: 'Mengenrabatte',
    FR: 'Réduction sur la commande',
    IT: 'Sconti sull\'ordine',
    CA: 'Order discounts',
    AU: 'Order discounts',
    status: 'confirmed'
  },

  'Sale Events': {
    US: 'Sale events',
    UK: 'Sales event',
    DE: 'Sonderaktion',
    FR: 'Événement promotionnel',
    IT: 'Vendite promozionali',
    CA: 'Sale events',
    AU: 'Sale events',
    status: 'confirmed'
  },

  'Coupons': {
    US: 'Coded coupons',
    UK: 'Coupons',
    DE: 'Gutscheincodes',
    FR: 'Bon de réduction',
    IT: 'Coupon',
    CA: 'Coded coupons',
    AU: 'Coded coupons',
    status: 'confirmed'
  },

  'Volume Pricing': {
    US: 'Volume pricing',
    UK: 'Multi-Buy',
    DE: 'Multi-Rabatt',
    FR: 'Achat multiple',
    IT: 'Volume pricing',
    CA: 'Volume pricing',
    AU: 'Volume pricing',
    status: 'confirmed'
  },

  'Offers to Buyers': {
    US: 'Offers to Buyers',
    UK: 'Offers to Buyers',
    DE: 'Preisvorschläge an Käufer senden',
    FR: 'Envoyer des offres aux acheteurs',
    IT: 'Inviare proposte agli acquirenti',
    CA: 'Offers to Buyers',
    AU: 'Offers to Buyers',
    status: 'confirmed'
  },

  'Best Offer': {
    US: 'Best Offer',
    UK: 'Best Offer',
    DE: 'Preisvorschlag',
    FR: 'Offre directe',
    IT: 'Proposta d\'acquisto',
    CA: 'Best Offer',
    AU: 'Best Offer',
    status: 'confirmed'
  },

  'Promotions Manager': {
    US: 'Promotions Manager',
    UK: 'Promotions Manager',
    DE: 'Verkaufsaktionen im Verkäufer-Cockpit Pro',
    FR: 'Gestionnaire de promotions',
    IT: 'Gestore delle promozioni',
    CA: 'Promotions Manager',
    AU: 'Promotions Manager',
    status: 'confirmed'
  },

  'Shipping Discounts': {
    US: 'Shipping Discounts',
    UK: 'Shipping Discounts',
    DE: 'Versandrabatte',
    FR: 'Réductions sur les frais de livraison',
    IT: 'Sconti sulla spedizione',
    CA: 'Shipping Discounts',
    AU: 'Shipping Discounts',
    status: 'confirmed'
  },

  'Coded Coupons': {
    US: 'Coded Coupons',
    UK: 'Coded Coupons',
    DE: 'Gutscheincodes',
    FR: 'Bons de réduction avec code',
    IT: 'Codici sconto',
    CA: 'Coded Coupons',
    AU: 'Coded Coupons',
    status: 'confirmed'
  },

  'Markdown Manager': {
    US: 'Markdown Manager',
    UK: 'Markdown Manager',
    CA: 'Markdown Manager',
    AU: 'Markdown Manager',
    status: 'confirmed'
  },

  'Seller Initiated Offers': {
    US: 'Seller Initiated Offers',
    UK: 'Offers to Buyers',
    DE: 'Preisvorschläge an Käufer',
    FR: 'Envoyer une offre',
    IT: 'Proposta agli acquirenti',
    CA: 'Offers to Buyers',
    AU: 'Offers to Buyers',
    status: 'confirmed'
  },

  'Send Coupon': {
    US: 'Send Coupon',
    UK: 'Send Coupon',
    DE: 'Gutschein senden',
    FR: 'Envoyer un code promo',
    IT: 'Invia codice sconto',
    CA: 'Send Coupon',
    AU: 'Send Coupon',
    status: 'confirmed'
  },

  'Print Coupons': {
    US: 'Print Coupons',
    UK: 'Print Coupons',
    DE: 'Gutschein drucken',
    FR: 'Imprimer code promo',
    IT: 'Stampa codice sconto',
    CA: 'Print Coupons',
    AU: 'Print Coupons',
    status: 'confirmed'
  },

  'Boost Buyer Engagement': {
    US: 'Boost Buyer Engagement',
    UK: 'Boost Buyer Engagement',
    CA: 'Boost Buyer Engagement',
    AU: 'Boost Buyer Engagement',
    status: 'research-needed'
  },

  'Buyer Groups': {
    US: 'Buyer Groups',
    UK: 'Buyer Groups',
    DE: 'Käufergruppen',
    FR: 'Groupes d\'acheteurs',
    IT: 'Gruppi di acquirenti',
    CA: 'Buyer Groups',
    AU: 'Buyer Groups',
    status: 'confirmed'
  },

  'Store Newsletters': {
    US: 'Store Newsletters',
    UK: 'Shop Newsletters',
    DE: 'Shop-Newsletter',
    FR: 'Newsletter de la Boutique eBay',
    IT: 'Newsletter del Negozio eBay',
    CA: 'Store Newsletters',
    AU: 'Store Newsletters',
    status: 'confirmed'
  },

  'Store Email Campaigns': {
    US: 'Email Marketing for Sellers',
    UK: 'Email Marketing',
    DE: 'Email-Marketing für Verkäufer',
    FR: 'Newsletter de la Boutique eBay',
    IT: 'Newsletter del Negozio eBay',
    CA: 'Email Marketing for Sellers',
    AU: 'Email Marketing for Sellers',
    status: 'confirmed'
  },

  // CURATED MARKETING PROGRAMS
  'eBay Deals': {
    US: 'eBay Deals',
    UK: 'eBay Deals',
    DE: 'eBay Deals',
    FR: 'eBay Deals',
    IT: 'eBay Deals',
    CA: 'eBay Deals',
    AU: 'eBay Deals',
    status: 'global'
  },

  'Daily Deals': {
    US: 'Daily Deals',
    UK: 'Daily Deals',
    DE: 'Daily Deals',
    FR: 'Daily Deals',
    IT: 'Daily Deals',
    CA: 'Daily Deals',
    AU: 'Daily Deals',
    status: 'global'
  },

  'Featured Deals': {
    US: 'Featured Deals',
    UK: 'Featured Deals',
    CA: 'Featured Deals',
    AU: 'Featured Deals',
    status: 'research-needed'
  },

  'Weekly Deals': {
    US: 'Weekly Deals',
    UK: 'Weekly Deals',
    CA: 'Weekly Deals',
    AU: 'Weekly Deals',
    status: 'research-needed'
  },

  'Deals Seller Portal': {
    US: 'Deals Seller Portal',
    UK: 'Deals Seller Portal',
    CA: 'Deals Seller Portal',
    AU: 'Deals Seller Portal',
    status: 'research-needed'
  },

  'Spotlight Deals': {
    US: 'Spotlight Deals',
    UK: 'Spotlight Deals',
    CA: 'Spotlight Deals',
    AU: 'Spotlight Deals',
    status: 'research-needed'
  },

  'eBay Exclusive Coupons': {
    US: 'eBay Coupons',
    UK: 'eBay Coupons',
    DE: 'eBay-Gutscheine',
    FR: 'Codes promo eBay',
    IT: 'Buoni sconto eBay',
    CA: 'eBay Coupons',
    AU: 'eBay Coupons',
    status: 'partial'
  },

  'Brand Outlet': {
    US: 'Brand Outlet',
    UK: 'Brand Outlet',
    DE: 'Brand Outlet',
    FR: 'Brand Outlet',
    IT: 'Brand Outlet',
    CA: 'Brand Outlet',
    AU: 'Brand Outlet',
    status: 'global'
  },

  'Preloved Partner Program': {
    US: 'Preloved Partner Program',
    UK: 'Preloved Partner Program',
    status: 'partial'
  },

  'Certified Recycler Program': {
    status: 'research-needed'
  },

  'Pro-Trader Program': {
    UK: 'Pro-Trader Programme',
    DE: 'eBay Pro-Trader',
    status: 'partial'
  },

  // SELLER TOOLS - FILE MANAGEMENT
  'Seller Hub Reports': {
    US: 'Seller Hub Reports',
    UK: 'Seller Hub Reports',
    DE: 'Berichte im Verkäufer-Cockpit Pro',
    FR: 'Rapports du Hub vendeur',
    IT: 'Scheda Reportistica della Console venditori',
    CA: 'Seller Hub Reports',
    AU: 'Seller Hub Reports',
    status: 'confirmed'
  },

  'Sales Reports Plus': {
    US: 'Sales Reports Plus',
    UK: 'Sales Reports Plus',
    CA: 'Sales Reports Plus',
    status: 'partial'
  },

  // SELLER TOOLS - SPECIALIZED (OFFICIAL BRANDED NAMES ONLY)
  'Merchant Integration Platform': {
    US: 'Merchant Integration Platform (MIP)',
    UK: 'Merchant Integration Platform (MIP)',
    DE: 'Merchant Integration Platform (MIP)',
    FR: 'Merchant Integration Platform (MIP)',
    IT: 'Merchant Integration Platform (MIP)',
    CA: 'Merchant Integration Platform (MIP)',
    AU: 'Merchant Integration Platform (MIP)',
    status: 'global'
  },

  'eBay Export': {
    US: 'eBay Export',
    UK: 'eBay Export',
    DE: 'eBay Export',
    FR: 'eBay Export',
    IT: 'eBay Export',
    CA: 'eBay Export',
    AU: 'eBay Export',
    status: 'global'
  },

  'Fitment Plus': {
    US: 'Fitment Plus',
    status: 'partial'
  },

  'Fitment Plus Auto': {
    US: 'Fitment Plus Auto (FPA)',
    status: 'partial'
  },

  'CBT Seller Dashboard': {
    US: 'Cross Border Trade (CBT) Seller Dashboard',
    UK: 'Cross Border Trade (CBT) Seller Dashboard',
    DE: 'Cross Border Trade (CBT) Seller Dashboard',
    FR: 'Cross Border Trade (CBT) Seller Dashboard',
    IT: 'Cross Border Trade (CBT) Seller Dashboard',
    CA: 'Cross Border Trade (CBT) Seller Dashboard',
    AU: 'Cross Border Trade (CBT) Seller Dashboard',
    status: 'global'
  },

  // AUTHENTICATION SUB-PROGRAMS
  'Authenticity Guarantee - Watches': {
    US: 'Authenticity Guarantee for Watches',
    UK: 'Authenticity Guarantee for Watches',
    DE: 'Echtheitsprüfung für Luxusuhren',
    FR: 'Vérification d\'authenticité pour montres',
    IT: 'Verifica di autenticità per orologi',
    status: 'partial'
  },

  'Authenticity Guarantee - Sneakers': {
    US: 'Authenticity Guarantee for Sneakers',
    UK: 'Authenticity Guarantee for Sneakers',
    DE: 'Echtheitsprüfung für Sneaker',
    FR: 'Vérification d\'authenticité pour sneakers',
    IT: 'Verifica di autenticità per sneakers',
    CA: 'Authenticity Guarantee for Sneakers',
    AU: 'Authenticity Guarantee for Sneakers',
    status: 'confirmed'
  },

  'Authenticity Guarantee - Handbags': {
    US: 'Authenticity Guarantee for Handbags',
    UK: 'Authenticity Guarantee for Handbags',
    DE: 'Echtheitsprüfung für Handtaschen',
    FR: 'Vérification d\'authenticité pour sacs à main',
    IT: 'Verifica di autenticità per borse',
    AU: 'Authenticity Guarantee for Handbags',
    status: 'partial'
  },

  'Authenticity Guarantee - Jewelry': {
    US: 'Authenticity Guarantee for Jewelry',
    UK: 'Authenticity Guarantee for Jewellery',
    status: 'partial'
  },

  'Authenticity Guarantee - Trading Cards': {
    US: 'Authenticity Guarantee for Trading Cards',
    CA: 'Authenticity Guarantee for Trading Cards',
    status: 'partial'
  },

  'Authenticity Guarantee - Streetwear': {
    US: 'Authenticity Guarantee for Streetwear',
    UK: 'Authenticity Guarantee for Fashion',
    DE: 'Echtheitsprüfung für Mode',
    status: 'partial'
  },

  // SELLER PERFORMANCE
  'Above Standard': {
    US: 'Above Standard',
    UK: 'Above Standard',
    DE: 'Über dem Standard',
    FR: 'Très bon vendeur',
    IT: 'Sopra lo standard',
    CA: 'Above Standard',
    AU: 'Above Standard',
    status: 'confirmed'
  },

  'Below Standard': {
    US: 'Below Standard',
    UK: 'Below Standard',
    DE: 'Unter dem Standard',
    FR: 'Sous le standard',
    IT: 'Sotto lo standard',
    CA: 'Below Standard',
    AU: 'Below Standard',
    status: 'confirmed'
  },

  'Top Rated Plus': {
    US: 'Top Rated Plus',
    UK: 'eBay Premium Service',
    DE: 'Top-Bewertung Plus',
    FR: 'Top Fiabilité Plus',
    IT: 'Affidabilità Top Plus',
    CA: 'Top Rated Plus',
    AU: 'eBay Plus',
    status: 'confirmed'
  },

  'eBay Premium Service': {
    UK: 'eBay Premium Service',
    status: 'partial'
  },

  'eBay Top-Service': {
    DE: 'eBay Top-Service',
    status: 'partial'
  },

  'Free 2-day Shipping': {
    US: 'Free 2-day shipping',
    status: 'partial'
  },

  'Free 3-day Shipping': {
    US: 'Free 3-day shipping',
    UK: 'Free delivery speed badge',
    DE: 'Kostenlose Lieferung',
    status: 'partial'
  },

  'Free 4-day Shipping': {
    US: 'Free 4-day shipping',
    status: 'partial'
  },

  // REFURBISHED ADDITIONAL
  'Seller Refurbished': {
    US: 'Seller Refurbished',
    UK: 'Seller refurbished',
    DE: 'Vom Verkäufer generalüberholt',
    IT: 'Ricondizionato dal venditore',
    CA: 'Seller refurbished',
    AU: 'Seller refurbished',
    status: 'partial'
  },

  // INTERNATIONAL SHIPPING
  'eBay SpeedPAK': {
    UK: 'eBay SpeedPAK',
    DE: 'eBay SpeedPAK',
    FR: 'eBay SpeedPAK',
    IT: 'eBay SpeedPAK',
    CA: 'eBay SpeedPAK',
    AU: 'eBay SpeedPAK',
    status: 'partial'
  },

  // PAYMENT & CHECKOUT
  'Managed Payments': {
    US: 'Managed Payments',
    UK: 'Managed Payments',
    DE: 'Zahlungsabwicklung bei eBay',
    FR: 'Services de paiement proposés par eBay',
    IT: 'Pagamenti gestiti',
    CA: 'Managed Payments',
    AU: 'Managed Payments',
    status: 'confirmed'
  },

  'Buy It Now': {
    US: 'Buy It Now',
    UK: 'Buy It Now',
    DE: 'Sofort-Kaufen',
    FR: 'Achat immédiat',
    IT: 'Compralo Subito',
    CA: 'Buy It Now',
    AU: 'Buy It Now',
    status: 'confirmed'
  },

  'eBay Balance': {
    US: 'Spendable Funds',
    UK: 'eBay Balance',
    status: 'partial'
  },

  'eBay Mastercard': {
    US: 'eBay Mastercard',
    status: 'partial'
  },

  'Guest Checkout': {
    US: 'Guest Checkout',
    UK: 'Guest Checkout',
    DE: 'Guest Checkout',
    FR: 'Guest Checkout',
    IT: 'Guest Checkout',
    CA: 'Guest Checkout',
    AU: 'Guest Checkout',
    status: 'confirmed'
  },

  // BUYER PROGRAMS & DEALS
  'eBay WOW!': {
    DE: 'eBay WOW!',
    status: 'partial'
  },

  'eBay Imperdibili': {
    IT: 'eBay Imperdibili',
    status: 'partial'
  },

  'Bons Plans': {
    FR: 'Bons Plans',
    status: 'partial'
  },

  'eBay Gift Cards': {
    US: 'eBay Gift Cards',
    UK: 'eBay Gift Cards',
    DE: 'eBay Gift Cards',
    FR: 'eBay Gift Cards',
    IT: 'eBay Gift Cards',
    CA: 'eBay Gift Cards',
    AU: 'eBay Gift Cards',
    status: 'confirmed'
  },

  // SPECIALIZED PROGRAMS
  'Circular Fashion Fund': {
    US: 'Circular Fashion Fund',
    UK: 'Circular Fashion Fund',
    DE: 'Circular Fashion Fund',
    FR: 'Circular Fashion Fund',
    IT: 'Circular Fashion Fund',
    CA: 'Circular Fashion Fund',
    AU: 'Circular Fashion Fund',
    status: 'global'
  },

  'eBay Business Supply': {
    US: 'eBay Business Supply',
    UK: 'eBay Business Supply',
    DE: 'eBay Business Supply',
    FR: 'eBay Business Supply',
    IT: 'eBay Business Supply',
    CA: 'eBay Business Supply',
    AU: 'eBay Business Supply',
    status: 'global'
  },

  'Certified by Brand': {
    US: 'Certified by Brand',
    status: 'partial'
  },

  // LISTING FEATURES & FORMATS
  'Auction-Style Listings': {
    US: 'Auction-style listings',
    UK: 'Selling through auctions',
    DE: 'Artikel über Auktionen verkaufen',
    FR: 'Vendre au format Enchères',
    IT: 'Vendere con le Aste online',
    CA: 'Selling through auctions',
    AU: 'Selling through auctions',
    status: 'confirmed'
  },

  'Reserve Price': {
    US: 'Reserve Price',
    UK: 'Reserve price',
    DE: 'Mindestpreis',
    FR: 'Prix de réserve',
    IT: 'Prezzo di riserva',
    CA: 'Reserve price',
    AU: 'Reserve price',
    status: 'confirmed'
  },

  'Private Listing': {
    US: 'Private listing',
    UK: 'Private listing',
    DE: 'Private listing',
    FR: 'Annonce privée',
    IT: 'Inserzione privata',
    CA: 'Private listing',
    AU: 'Private listing',
    status: 'confirmed'
  },

  'Schedule Listing': {
    US: 'Schedule your listing',
    UK: 'Schedule your listing',
    DE: 'Schedule your listing',
    FR: 'Schedule your listing',
    IT: 'Schedule your listing',
    CA: 'Schedule your listing',
    AU: 'Schedule your listing',
    status: 'confirmed'
  },

  'Relist': {
    US: 'Relist',
    UK: 'Relist',
    DE: 'Relist',
    FR: 'Relist',
    IT: 'Relist',
    CA: 'Relist',
    AU: 'Relist',
    status: 'confirmed'
  },

  'Sell Similar': {
    US: 'Sell Similar',
    UK: 'Sell Similar',
    DE: 'Sell Similar',
    FR: 'Sell Similar',
    IT: 'Sell Similar',
    CA: 'Sell Similar',
    AU: 'Sell Similar',
    status: 'confirmed'
  },

  'Quick Listing Tool': {
    US: 'Quick listing tool',
    UK: 'Quick listing tool',
    DE: 'Quick listing tool',
    FR: 'Quick listing tool',
    IT: 'Quick listing tool',
    CA: 'Quick listing tool',
    AU: 'Quick listing tool',
    status: 'confirmed'
  },

  'Advanced Listing Tool': {
    US: 'Advanced listing tool',
    UK: 'Advanced listing tool',
    DE: 'Erweiterten Einstelltools',
    FR: 'Advanced listing tool',
    IT: 'Strumento di vendita avanzato',
    CA: 'Advanced listing tool',
    AU: 'Advanced listing tool',
    status: 'confirmed'
  },

  'Item Specifics': {
    US: 'Item Specifics',
    UK: 'Item specifics',
    DE: 'Artikelmerkmale',
    FR: 'Caractéristiques de l\'article',
    IT: 'Specifiche articolo',
    CA: 'Item specifics',
    AU: 'Item specifics',
    status: 'confirmed'
  },

  'Product Identifiers': {
    US: 'Product Identifiers',
    UK: 'Product Identifiers',
    DE: 'Product Identifiers',
    FR: 'Product Identifiers',
    IT: 'Product Identifiers',
    CA: 'Product Identifiers',
    AU: 'Product Identifiers',
    status: 'confirmed'
  },

  'Gallery Plus': {
    US: 'Gallery Plus',
    UK: 'Gallery Plus',
    DE: 'Gallery Plus',
    FR: 'Gallery Plus',
    IT: 'Gallery Plus',
    CA: 'Gallery Plus',
    AU: 'Gallery Plus',
    status: 'confirmed'
  },

  'Subtitle': {
    US: 'Subtitle',
    UK: 'Subtitle',
    DE: 'Subtitle',
    FR: 'Subtitle',
    IT: 'Subtitle',
    CA: 'Subtitle',
    AU: 'Subtitle',
    status: 'confirmed'
  },

  'Bold': {
    US: 'Bold',
    UK: 'Bold',
    DE: 'Bold',
    FR: 'Bold',
    IT: 'Bold',
    CA: 'Bold',
    AU: 'Bold',
    status: 'confirmed'
  },

  // CUSTOMER SUPPORT PROGRAMS
  'eBay Customer Service': {
    US: 'eBay Customer Service',
    UK: 'eBay Customer Service',
    DE: 'eBay-Kundenservice',
    FR: 'Service clients eBay',
    IT: 'Servizio clienti eBay',
    CA: 'eBay Customer Service',
    AU: 'eBay Customer Service',
    status: 'confirmed'
  },

  'Seller Help': {
    US: 'Seller Help',
    UK: 'Seller Help',
    DE: 'Seller Help',
    FR: 'Seller Help',
    IT: 'Seller Help',
    CA: 'Seller Help',
    AU: 'Seller Help',
    status: 'confirmed'
  },

  'Seller Clinics': {
    US: 'Seller Clinics',
    UK: 'Seller Clinics',
    status: 'partial'
  },

  'eBay Concierge': {
    US: 'eBay Concierge',
    UK: 'eBay Concierge',
    status: 'partial'
  },

  'Account Management Plus': {
    UK: 'Account Management Plus',
    status: 'partial'
  },

  'Account Management Premium': {
    UK: 'Account Management Premium',
    status: 'partial'
  },

  'Pro Seller Program': {
    US: 'Pro Seller Program',
    AU: 'ProSeller growth program',
    status: 'partial'
  },

  'New Seller Journey': {
    US: 'New Seller Journey Program',
    UK: 'New Seller Journey Program',
    DE: 'New Seller Journey Program',
    FR: 'New Seller Journey Program',
    IT: 'New Seller Journey Program',
    CA: 'New Seller Journey Program',
    AU: 'New Seller Journey Program',
    status: 'global'
  },

  // FEEDBACK & REPUTATION
  'Feedback Forum': {
    US: 'Feedback Forum',
    UK: 'Feedback Forum',
    DE: 'Feedback Forum',
    FR: 'Feedback Forum',
    IT: 'Feedback Forum',
    CA: 'Feedback Forum',
    AU: 'Feedback Forum',
    status: 'global'
  },

  'Detailed Seller Ratings': {
    US: 'detailed seller ratings',
    UK: 'detailed seller ratings',
    DE: 'Detaillierte Verkäuferbewertungen',
    FR: 'Évaluations détaillées du vendeur',
    IT: 'Valutazione dettagliata del venditore',
    CA: 'detailed seller ratings',
    AU: 'detailed seller ratings',
    status: 'confirmed'
  },

  'Product Reviews': {
    US: 'Product reviews',
    UK: 'Product reviews',
    DE: 'Product reviews',
    FR: 'Product reviews',
    IT: 'Product reviews',
    CA: 'Product reviews',
    AU: 'Product reviews',
    status: 'global'
  },

  'Verified Purchase': {
    US: 'verified purchase',
    UK: 'verified purchase',
    DE: 'Bestätigter Kauf',
    FR: 'Achat vérifié',
    IT: 'Acquisto verificato',
    CA: 'verified purchase',
    AU: 'verified purchase',
    status: 'confirmed'
  },

  'Mutual Feedback Withdrawal': {
    US: 'Mutual Feedback Withdrawal',
    UK: 'Mutual Feedback Withdrawal',
    DE: 'Mutual Feedback Withdrawal',
    FR: 'Mutual Feedback Withdrawal',
    IT: 'Mutual Feedback Withdrawal',
    CA: 'Mutual Feedback Withdrawal',
    AU: 'Mutual Feedback Withdrawal',
    status: 'global'
  },

  // SUSTAINABILITY & SOCIAL PROGRAMS
  'Pre-loved Partner Program': {
    US: 'Pre-loved Partner Program',
    UK: 'Pre-loved Partner Programme',
    AU: 'Pre-loved Fashion Partner Program',
    status: 'partial'
  },

  'Certified Recycled Program': {
    UK: 'Certified Recycled',
    status: 'partial'
  },

  'eBay Rachat': {
    FR: 'eBay Rachat',
    status: 'partial'
  },

  'Consommation Raisonnée': {
    FR: 'Acteurs d\'une consommation raisonnée',
    status: 'partial'
  },

  'Pre-loved Fashion Week': {
    US: 'Pre-loved Fashion Week',
    UK: 'Pre-loved Fashion Week',
    status: 'partial'
  },

  // DEVELOPER & PARTNER PROGRAMS
  'eBay Developers Program': {
    US: 'eBay Developers Program',
    UK: 'eBay Developers Program',
    DE: 'eBay Developers Program',
    FR: 'eBay Developers Program',
    IT: 'eBay Developers Program',
    CA: 'eBay Developers Program',
    AU: 'eBay Developers Program',
    status: 'global'
  },

  'eBay Partner Network': {
    US: 'eBay Partner Network',
    UK: 'eBay Partner Network',
    DE: 'eBay Partner Network',
    FR: 'eBay Partner Network',
    IT: 'eBay Partner Network',
    CA: 'eBay Partner Network',
    AU: 'eBay Partner Network',
    status: 'confirmed'
  },

  'Developer Loyalty Program': {
    US: 'Loyalty Program',
    UK: 'Loyalty Program',
    DE: 'Loyalty Program',
    FR: 'Loyalty Program',
    IT: 'Loyalty Program',
    CA: 'Loyalty Program',
    AU: 'Loyalty Program',
    status: 'global'
  },

  'eBay Ambassador': {
    US: 'eBay Ambassador',
    UK: 'eBay Ambassador',
    status: 'partial'
  },

  'Third Party Providers': {
    US: 'Third Party Providers',
    UK: 'Third Party Providers',
    DE: 'Third Party Providers',
    FR: 'Third Party Providers',
    IT: 'Third Party Providers',
    CA: 'Third Party Providers',
    AU: 'Third Party Providers',
    status: 'global'
  },

  // LISTING FEATURES & TOOLS
  'Reserve Price': {
    US: 'Reserve Price',
    UK: 'Reserve Price',
    DE: 'Mindestpreis',
    FR: 'Prix de réserve',
    IT: 'Prezzo di riserva',
    CA: 'Reserve Price',
    AU: 'Reserve Price',
    status: 'confirmed'
  },

  'Schedule Listing': {
    US: 'Schedule Listing',
    UK: 'Schedule Listing',
    DE: 'Angebot planen',
    FR: 'Planifier une annonce',
    IT: 'Pianifica inserzione',
    CA: 'Schedule Listing',
    AU: 'Schedule Listing',
    status: 'confirmed'
  },

  'Quick Listing Tool': {
    US: 'Quick Listing Tool',
    UK: 'Quick Listing Tool',
    DE: 'Schnelles Angebots-Tool',
    FR: 'Outil de mise en vente rapide',
    IT: 'Strumento di inserzione rapida',
    CA: 'Quick Listing Tool',
    AU: 'Quick Listing Tool',
    status: 'confirmed'
  },

  'Advanced Listing Tool': {
    US: 'Advanced Listing Tool',
    UK: 'Advanced Listing Tool',
    DE: 'Erweitertes Angebots-Tool',
    FR: 'Outil de mise en vente avancé',
    IT: 'Strumento di inserzione avanzato',
    CA: 'Advanced Listing Tool',
    AU: 'Advanced Listing Tool',
    status: 'confirmed'
  },

  'Bulk Listing Tool': {
    US: 'Bulk Listing Tool',
    UK: 'Bulk Listing Tool',
    DE: 'Massenangebots-Tool',
    FR: 'Outil de mise en vente en masse',
    IT: 'Strumento di inserzione multipla',
    CA: 'Bulk Listing Tool',
    AU: 'Bulk Listing Tool',
    status: 'confirmed'
  },

  'Sell Similar': {
    US: 'Sell Similar',
    UK: 'Sell Similar',
    DE: 'Ähnlichen Artikel verkaufen',
    FR: 'Vendre un article similaire',
    IT: 'Vendi oggetto simile',
    CA: 'Sell Similar',
    AU: 'Sell Similar',
    status: 'confirmed'
  },

  'Business Policies': {
    US: 'Business Policies',
    UK: 'Business Policies',
    DE: 'Geschäftsrichtlinien',
    FR: 'Règles commerciales',
    IT: 'Regole aziendali',
    CA: 'Business Policies',
    AU: 'Business Policies',
    status: 'confirmed'
  },

  'Volume Pricing': {
    US: 'Volume Pricing',
    UK: 'Volume Pricing',
    DE: 'Mengenrabatt',
    FR: 'Tarification par volume',
    IT: 'Prezzi a volume',
    CA: 'Volume Pricing',
    AU: 'Volume Pricing',
    status: 'confirmed'
  },

  'Seller Initiated Offers': {
    US: 'Seller Initiated Offers',
    UK: 'Seller Initiated Offers',
    DE: 'Vom Verkäufer initiierte Angebote',
    FR: 'Offres initiées par le vendeur',
    IT: 'Offerte avviate dal venditore',
    CA: 'Seller Initiated Offers',
    AU: 'Seller Initiated Offers',
    status: 'confirmed'
  },

  'Item Specifics': {
    US: 'Item Specifics',
    UK: 'Item Specifics',
    DE: 'Artikelmerkmale',
    FR: 'Caractéristiques de l\'objet',
    IT: 'Specifiche dell\'oggetto',
    CA: 'Item Specifics',
    AU: 'Item Specifics',
    status: 'confirmed'
  },

  'Product Identifiers': {
    US: 'Product Identifiers',
    UK: 'Product Identifiers',
    DE: 'Produktkennungen',
    FR: 'Identifiants de produit',
    IT: 'Identificativi del prodotto',
    CA: 'Product Identifiers',
    AU: 'Product Identifiers',
    status: 'confirmed'
  },

  // FINANCIAL & PAYMENT TOOLS
  'Express Payouts': {
    US: 'Express Payouts',
    UK: 'Express Payouts',
    DE: 'Express-Auszahlungen',
    FR: 'Paiements express',
    IT: 'Pagamenti express',
    CA: 'Express Payouts',
    AU: 'Express Payouts',
    status: 'confirmed'
  },

  'Payouts on Demand': {
    US: 'Payouts on Demand',
    UK: 'Payouts on Demand',
    DE: 'Auszahlungen auf Abruf',
    FR: 'Paiements à la demande',
    IT: 'Pagamenti su richiesta',
    CA: 'Payouts on Demand',
    AU: 'Payouts on Demand',
    status: 'confirmed'
  },

  // SELLER STATUS & TIME MANAGEMENT
  'Time Away': {
    US: 'Time Away',
    UK: 'Time Away',
    DE: 'Abwesenheit',
    FR: 'Absence',
    IT: 'Fuori sede',
    CA: 'Time Away',
    AU: 'Time Away',
    status: 'confirmed'
  },

  // RETURNS & CUSTOMER SERVICE
  'Managed Returns': {
    US: 'Managed Returns',
    UK: 'Managed Returns',
    DE: 'Verwaltete Rücksendungen',
    FR: 'Retours gérés',
    IT: 'Resi gestiti',
    CA: 'Managed Returns',
    AU: 'Managed Returns',
    status: 'confirmed'
  },

  // IMAGE & PHOTO TOOLS
  'Background Enhancement': {
    US: 'Background Enhancement',
    UK: 'Background Enhancement',
    DE: 'Hintergrund-Verbesserung',
    FR: 'Amélioration de l\'arrière-plan',
    IT: 'Miglioramento dello sfondo',
    CA: 'Background Enhancement',
    AU: 'Background Enhancement',
    status: 'confirmed'
  },

  'Selling with AI': {
    US: 'Selling with AI',
    UK: 'Selling with AI',
    DE: 'Verkaufen mit KI',
    FR: 'Vendre avec l\'IA',
    IT: 'Vendere con l\'IA',
    CA: 'Selling with AI',
    AU: 'Selling with AI',
    status: 'confirmed'
  },

  // MOTORS SPECIFIC
  'Shop by Diagram': {
    US: 'Shop by Diagram',
    UK: 'Shop by Diagram',
    DE: 'Nach Diagramm einkaufen',
    FR: 'Acheter par diagramme',
    IT: 'Acquista tramite diagramma',
    CA: 'Shop by Diagram',
    AU: 'Shop by Diagram',
    status: 'confirmed'
  },

  'Parts Compatibility': {
    US: 'Parts Compatibility',
    UK: 'Parts Compatibility',
    DE: 'Teilekompatibilität',
    FR: 'Compatibilité des pièces',
    IT: 'Compatibilità ricambi',
    CA: 'Parts Compatibility',
    AU: 'Parts Compatibility',
    status: 'confirmed'
  },

  // LISTING UPGRADES
  'Bold Title': {
    US: 'Bold Title',
    UK: 'Bold Title',
    DE: 'Fett gedruckter Titel',
    FR: 'Titre en gras',
    IT: 'Titolo in grassetto',
    CA: 'Bold Title',
    AU: 'Bold Title',
    status: 'confirmed'
  },

  'Subtitle': {
    US: 'Subtitle',
    UK: 'Subtitle',
    DE: 'Untertitel',
    FR: 'Sous-titre',
    IT: 'Sottotitolo',
    CA: 'Subtitle',
    AU: 'Subtitle',
    status: 'confirmed'
  },

  'Gallery Plus': {
    US: 'Gallery Plus',
    UK: 'Gallery Plus',
    DE: 'Galerie Plus',
    FR: 'Galerie Plus',
    IT: 'Galleria Plus',
    CA: 'Gallery Plus',
    AU: 'Gallery Plus',
    status: 'confirmed'
  },

  'Featured Listing': {
    US: 'Featured Listing',
    UK: 'Featured Listing',
    DE: 'Top-Angebot',
    FR: 'Annonce en vedette',
    IT: 'Inserzione in evidenza',
    CA: 'Featured Listing',
    AU: 'Featured Listing',
    status: 'confirmed'
  },

  // AUTOMATION & LISTING MANAGEMENT
  'Automatic Relisting': {
    US: 'Automatic Relisting',
    UK: 'Automatic Relisting',
    DE: 'Automatisches Wiedereinstellung',
    FR: 'Remise en vente automatique',
    IT: 'Reinserimento automatico',
    CA: 'Automatic Relisting',
    AU: 'Automatic Relisting',
    status: 'confirmed'
  },

  'Out of Stock Control': {
    US: 'Out of Stock Control',
    UK: 'Out of Stock Control',
    DE: 'Ausverkauft-Steuerung',
    FR: 'Contrôle rupture de stock',
    IT: 'Controllo esaurimento scorte',
    CA: 'Out of Stock Control',
    AU: 'Out of Stock Control',
    status: 'confirmed'
  },

  'Good Til Cancelled': {
    US: 'Good Til Cancelled',
    UK: 'Good Til Cancelled',
    DE: 'Gültig bis auf Widerruf',
    FR: 'Valable jusqu\'à annulation',
    IT: 'Valido fino a cancellazione',
    CA: 'Good Til Cancelled',
    AU: 'Good Til Cancelled',
    status: 'confirmed'
  },

  'Immediate Payment Required': {
    US: 'Immediate Payment Required',
    UK: 'Immediate Payment Required',
    DE: 'Sofortige Zahlung erforderlich',
    FR: 'Paiement immédiat requis',
    IT: 'Pagamento immediato richiesto',
    CA: 'Immediate Payment Required',
    AU: 'Immediate Payment Required',
    status: 'confirmed'
  },

  // OFFERS & DISCOUNTS
  'Offers to Watchers': {
    US: 'Offers to Watchers',
    UK: 'Offers to Watchers',
    DE: 'Angebote an Beobachter',
    FR: 'Offres aux observateurs',
    IT: 'Offerte agli osservatori',
    CA: 'Offers to Watchers',
    AU: 'Offers to Watchers',
    status: 'confirmed'
  },

  'Private Offers': {
    US: 'Private Offers',
    UK: 'Private Offers',
    DE: 'Private Angebote',
    FR: 'Offres privées',
    IT: 'Offerte private',
    CA: 'Private Offers',
    AU: 'Private Offers',
    status: 'confirmed'
  },

  'Codeless Coupons': {
    US: 'Codeless Coupons',
    UK: 'Codeless Coupons',
    DE: 'Codelose Gutscheine',
    FR: 'Coupons sans code',
    IT: 'Coupon senza codice',
    CA: 'Codeless Coupons',
    AU: 'Codeless Coupons',
    status: 'confirmed'
  },

  'Promotional Codes': {
    US: 'Promotional Codes',
    UK: 'Promotional Codes',
    DE: 'Aktionscodes',
    FR: 'Codes promotionnels',
    IT: 'Codici promozionali',
    CA: 'Promotional Codes',
    AU: 'Promotional Codes',
    status: 'confirmed'
  },

  // BUYER PROTECTION & GUARANTEES
  'Purchase Protection': {
    US: 'Purchase Protection',
    UK: 'Purchase Protection',
    DE: 'Käuferschutz',
    FR: 'Protection des achats',
    IT: 'Protezione acquisti',
    CA: 'Purchase Protection',
    AU: 'Purchase Protection',
    status: 'confirmed'
  },

  'Vehicle Purchase Protection': {
    US: 'Vehicle Purchase Protection',
    UK: 'Vehicle Purchase Protection',
    DE: 'Fahrzeug-Käuferschutz',
    FR: 'Protection achat véhicule',
    IT: 'Protezione acquisto veicolo',
    CA: 'Vehicle Purchase Protection',
    AU: 'Vehicle Purchase Protection',
    status: 'partial'
  },

  'Business Equipment Purchase Protection': {
    US: 'Business Equipment Purchase Protection',
    UK: 'Business Equipment Purchase Protection',
    status: 'partial'
  },

  // FEEDBACK & RATINGS
  'Feedback Reply': {
    US: 'Feedback Reply',
    UK: 'Feedback Reply',
    DE: 'Bewertungsantwort',
    FR: 'Réponse à l\'évaluation',
    IT: 'Risposta al feedback',
    CA: 'Feedback Reply',
    AU: 'Feedback Reply',
    status: 'confirmed'
  },

  'Detailed Seller Ratings': {
    US: 'Detailed Seller Ratings',
    UK: 'Detailed Seller Ratings',
    DE: 'Detaillierte Verkäuferbewertungen',
    FR: 'Évaluations détaillées du vendeur',
    IT: 'Valutazioni dettagliate venditore',
    CA: 'Detailed Seller Ratings',
    AU: 'Detailed Seller Ratings',
    status: 'confirmed'
  },

  'Feedback Revision Request': {
    US: 'Feedback Revision Request',
    UK: 'Feedback Revision Request',
    DE: 'Bewertungsänderungsanfrage',
    FR: 'Demande de révision évaluation',
    IT: 'Richiesta revisione feedback',
    CA: 'Feedback Revision Request',
    AU: 'Feedback Revision Request',
    status: 'confirmed'
  },

  // MESSAGING & COMMUNICATION
  'Message Center': {
    US: 'Message Center',
    UK: 'Message Center',
    DE: 'Nachrichten-Center',
    FR: 'Centre de messages',
    IT: 'Centro messaggi',
    CA: 'Message Center',
    AU: 'Message Center',
    status: 'confirmed'
  },

  'eBay.ai Message Assistance': {
    US: 'eBay.ai Message Assistance',
    UK: 'eBay.ai Message Assistance',
    DE: 'eBay.ai Nachrichtenhilfe',
    FR: 'Assistance messagerie eBay.ai',
    IT: 'Assistenza messaggi eBay.ai',
    CA: 'eBay.ai Message Assistance',
    AU: 'eBay.ai Message Assistance',
    status: 'partial'
  },

  // UNPAID ITEMS & CASES
  'Unpaid Item Assistant': {
    US: 'Unpaid Item Assistant',
    UK: 'Unpaid Item Assistant',
    DE: 'Unbezahlter-Artikel-Assistent',
    FR: 'Assistant objets non payés',
    IT: 'Assistente oggetti non pagati',
    CA: 'Unpaid Item Assistant',
    AU: 'Unpaid Item Assistant',
    status: 'confirmed'
  },

  'Unpaid Item Case': {
    US: 'Unpaid Item Case',
    UK: 'Unpaid Item Case',
    DE: 'Fall unbezahlter Artikel',
    FR: 'Litige objet non payé',
    IT: 'Caso oggetto non pagato',
    CA: 'Unpaid Item Case',
    AU: 'Unpaid Item Case',
    status: 'confirmed'
  },

  // CROSS-BORDER & INTERNATIONAL
  'International Site Visibility': {
    US: 'International Site Visibility',
    UK: 'International Site Visibility',
    DE: 'Internationale Sichtbarkeit',
    FR: 'Visibilité internationale',
    IT: 'Visibilità internazionale',
    CA: 'International Site Visibility',
    AU: 'International Site Visibility',
    status: 'confirmed'
  },

  'Cross-Border Trade': {
    US: 'Cross-Border Trade',
    UK: 'Cross-Border Trade',
    DE: 'Grenzüberschreitender Handel',
    FR: 'Commerce transfrontalier',
    IT: 'Commercio transfrontaliero',
    CA: 'Cross-Border Trade',
    AU: 'Cross-Border Trade',
    status: 'confirmed'
  },

  // REPORTS & ANALYTICS
  'Traffic Report': {
    US: 'Traffic Report',
    UK: 'Traffic Report',
    DE: 'Trafficbericht',
    FR: 'Rapport de trafic',
    IT: 'Report traffico',
    CA: 'Traffic Report',
    AU: 'Traffic Report',
    status: 'confirmed'
  },

  'Listing Analytics': {
    US: 'Listing Analytics',
    UK: 'Listing Analytics',
    DE: 'Angebotsanalyse',
    FR: 'Analyse des annonces',
    IT: 'Analisi inserzioni',
    CA: 'Listing Analytics',
    AU: 'Listing Analytics',
    status: 'confirmed'
  },

  'Sales Report': {
    US: 'Sales Report',
    UK: 'Sales Report',
    DE: 'Verkaufsbericht',
    FR: 'Rapport des ventes',
    IT: 'Report vendite',
    CA: 'Sales Report',
    AU: 'Sales Report',
    status: 'confirmed'
  },

  'Transaction Report': {
    US: 'Transaction Report',
    UK: 'Transaction Report',
    DE: 'Transaktionsbericht',
    FR: 'Rapport des transactions',
    IT: 'Report transazioni',
    CA: 'Transaction Report',
    AU: 'Transaction Report',
    status: 'confirmed'
  },

  'Order Report': {
    US: 'Order Report',
    UK: 'Order Report',
    DE: 'Bestellbericht',
    FR: 'Rapport des commandes',
    IT: 'Report ordini',
    CA: 'Order Report',
    AU: 'Order Report',
    status: 'confirmed'
  },

  'Performance Dashboard': {
    US: 'Performance Dashboard',
    UK: 'Performance Dashboard',
    DE: 'Leistungs-Dashboard',
    FR: 'Tableau de bord performance',
    IT: 'Dashboard prestazioni',
    CA: 'Performance Dashboard',
    AU: 'Performance Dashboard',
    status: 'confirmed'
  },

  // TAX & ACCOUNTING
  'Form 1099-K': {
    US: 'Form 1099-K',
    UK: 'Not applicable',
    DE: 'Not applicable',
    FR: 'Not applicable',
    IT: 'Not applicable',
    CA: 'Not applicable',
    AU: 'Not applicable',
    status: 'partial'
  },

  'Tax Documents': {
    US: 'Tax Documents',
    UK: 'Tax Documents',
    DE: 'Steuerunterlagen',
    FR: 'Documents fiscaux',
    IT: 'Documenti fiscali',
    CA: 'Tax Documents',
    AU: 'Tax Documents',
    status: 'confirmed'
  },

  'Sales Tax Collection': {
    US: 'Sales Tax Collection',
    UK: 'VAT Collection',
    DE: 'Umsatzsteuererhebung',
    FR: 'Collecte de TVA',
    IT: 'Riscossione IVA',
    CA: 'Sales Tax Collection',
    AU: 'GST Collection',
    status: 'confirmed'
  },

  // LISTING FEATURES
  'Multi-Variation Listings': {
    US: 'Multi-Variation Listings',
    UK: 'Multi-Variation Listings',
    DE: 'Angebote mit Varianten',
    FR: 'Annonces multi-variantes',
    IT: 'Inserzioni multi-variante',
    CA: 'Multi-Variation Listings',
    AU: 'Multi-Variation Listings',
    status: 'confirmed'
  },

  'Watch Count': {
    US: 'Watch Count',
    UK: 'Watch Count',
    DE: 'Beobachter-Anzahl',
    FR: 'Nombre d\'observateurs',
    IT: 'Numero osservatori',
    CA: 'Watch Count',
    AU: 'Watch Count',
    status: 'confirmed'
  },

  'Impressions': {
    US: 'Impressions',
    UK: 'Impressions',
    DE: 'Impressionen',
    FR: 'Impressions',
    IT: 'Impressioni',
    CA: 'Impressions',
    AU: 'Impressions',
    status: 'confirmed'
  },

  'Click-Through Rate': {
    US: 'Click-Through Rate',
    UK: 'Click-Through Rate',
    DE: 'Klickrate',
    FR: 'Taux de clics',
    IT: 'Tasso di clic',
    CA: 'Click-Through Rate',
    AU: 'Click-Through Rate',
    status: 'confirmed'
  },

  'Sales Conversion Rate': {
    US: 'Sales Conversion Rate',
    UK: 'Sales Conversion Rate',
    DE: 'Verkaufskonversionsrate',
    FR: 'Taux de conversion ventes',
    IT: 'Tasso conversione vendite',
    CA: 'Sales Conversion Rate',
    AU: 'Sales Conversion Rate',
    status: 'confirmed'
  },

  // SELLER UPDATES & COMMUNICATIONS
  'Seller News': {
    US: 'Seller News',
    UK: 'Seller News',
    DE: 'Verkäufer-News',
    FR: 'Actualités vendeurs',
    IT: 'Notizie venditori',
    CA: 'Seller News',
    AU: 'Seller News',
    status: 'confirmed'
  },

  // BUYER MANAGEMENT & RESTRICTIONS
  'Buyer Requirements': {
    US: 'Buyer Requirements',
    UK: 'Buyer Requirements',
    DE: 'Käuferanforderungen',
    FR: 'Exigences acheteurs',
    IT: 'Requisiti acquirente',
    CA: 'Buyer Requirements',
    AU: 'Buyer Requirements',
    status: 'confirmed'
  },

  'Block Buyers': {
    US: 'Block Buyers',
    UK: 'Block Buyers',
    DE: 'Käufer blockieren',
    FR: 'Bloquer acheteurs',
    IT: 'Blocca acquirenti',
    CA: 'Block Buyers',
    AU: 'Block Buyers',
    status: 'confirmed'
  },

  'Purchase Limits': {
    US: 'Purchase Limits',
    UK: 'Purchase Limits',
    DE: 'Kauflimits',
    FR: 'Limites d\'achat',
    IT: 'Limiti acquisto',
    CA: 'Purchase Limits',
    AU: 'Purchase Limits',
    status: 'confirmed'
  },

  // LISTING OPTIMIZATION TOOLS
  'Listing Quality Report': {
    US: 'Listing Quality Report',
    UK: 'Listing Quality Report',
    DE: 'Angebotsqualitätsbericht',
    FR: 'Rapport qualité annonces',
    IT: 'Report qualità inserzioni',
    CA: 'Listing Quality Report',
    AU: 'Listing Quality Report',
    status: 'confirmed'
  },

  'Price Suggestions': {
    US: 'Price Suggestions',
    UK: 'Price Suggestions',
    DE: 'Preisvorschläge',
    FR: 'Suggestions de prix',
    IT: 'Suggerimenti prezzo',
    CA: 'Price Suggestions',
    AU: 'Price Suggestions',
    status: 'confirmed'
  },

  'Competitive Pricing': {
    US: 'Competitive Pricing',
    UK: 'Competitive Pricing',
    DE: 'Wettbewerbsfähige Preisgestaltung',
    FR: 'Tarification concurrentielle',
    IT: 'Prezzi competitivi',
    CA: 'Competitive Pricing',
    AU: 'Competitive Pricing',
    status: 'confirmed'
  },

  'Auto Pricing': {
    US: 'Auto Pricing',
    UK: 'Auto Pricing',
    DE: 'Automatische Preisgestaltung',
    FR: 'Tarification automatique',
    IT: 'Prezzi automatici',
    CA: 'Auto Pricing',
    AU: 'Auto Pricing',
    status: 'confirmed'
  },

  // SHIPPING & LOCATION
  'Item Location': {
    US: 'Item Location',
    UK: 'Item Location',
    DE: 'Artikelstandort',
    FR: 'Emplacement de l\'objet',
    IT: 'Posizione oggetto',
    CA: 'Item Location',
    AU: 'Item Location',
    status: 'confirmed'
  },

  'Ship From Address': {
    US: 'Ship From Address',
    UK: 'Ship From Address',
    DE: 'Versandadresse',
    FR: 'Adresse d\'expédition',
    IT: 'Indirizzo di spedizione',
    CA: 'Ship From Address',
    AU: 'Ship From Address',
    status: 'confirmed'
  },

  'Calculated Shipping': {
    US: 'Calculated Shipping',
    UK: 'Calculated Postage',
    DE: 'Berechneter Versand',
    FR: 'Frais de port calculés',
    IT: 'Spedizione calcolata',
    CA: 'Calculated Shipping',
    AU: 'Calculated Postage',
    status: 'confirmed'
  },

  'Flat Rate Shipping': {
    US: 'Flat Rate Shipping',
    UK: 'Flat Rate Postage',
    DE: 'Pauschalversand',
    FR: 'Frais de port fixes',
    IT: 'Spedizione a tariffa fissa',
    CA: 'Flat Rate Shipping',
    AU: 'Flat Rate Postage',
    status: 'confirmed'
  },

  'Free Shipping': {
    US: 'Free Shipping',
    UK: 'Free Postage',
    DE: 'Kostenloser Versand',
    FR: 'Livraison gratuite',
    IT: 'Spedizione gratuita',
    CA: 'Free Shipping',
    AU: 'Free Postage',
    status: 'confirmed'
  },

  'Local Delivery': {
    US: 'Local Delivery',
    UK: 'Local Delivery',
    DE: 'Lokale Zustellung',
    FR: 'Livraison locale',
    IT: 'Consegna locale',
    CA: 'Local Delivery',
    AU: 'Local Delivery',
    status: 'confirmed'
  },

  // HANDLING TIME & DISPATCH
  'Same-Day Handling': {
    US: 'Same-Day Handling',
    UK: 'Same-Day Handling',
    DE: 'Versand am selben Tag',
    FR: 'Traitement jour même',
    IT: 'Gestione stesso giorno',
    CA: 'Same-Day Handling',
    AU: 'Same-Day Handling',
    status: 'confirmed'
  },

  '1-Day Handling': {
    US: '1-Day Handling',
    UK: '1-Day Handling',
    DE: '1-Tages-Bearbeitung',
    FR: 'Traitement 1 jour',
    IT: 'Gestione 1 giorno',
    CA: '1-Day Handling',
    AU: '1-Day Handling',
    status: 'confirmed'
  },

  'Handling Time': {
    US: 'Handling Time',
    UK: 'Handling Time',
    DE: 'Bearbeitungszeit',
    FR: 'Délai de traitement',
    IT: 'Tempo di gestione',
    CA: 'Handling Time',
    AU: 'Handling Time',
    status: 'confirmed'
  },

  'Estimated Delivery': {
    US: 'Estimated Delivery',
    UK: 'Estimated Delivery',
    DE: 'Voraussichtliche Lieferung',
    FR: 'Livraison estimée',
    IT: 'Consegna stimata',
    CA: 'Estimated Delivery',
    AU: 'Estimated Delivery',
    status: 'confirmed'
  },

  // RETURN POLICIES
  'Free Returns': {
    US: 'Free Returns',
    UK: 'Free Returns',
    DE: 'Kostenlose Rücksendung',
    FR: 'Retours gratuits',
    IT: 'Resi gratuiti',
    CA: 'Free Returns',
    AU: 'Free Returns',
    status: 'confirmed'
  },

  '30-Day Returns': {
    US: '30-Day Returns',
    UK: '30-Day Returns',
    DE: '30-Tage-Rückgaberecht',
    FR: 'Retours 30 jours',
    IT: 'Resi 30 giorni',
    CA: '30-Day Returns',
    AU: '30-Day Returns',
    status: 'confirmed'
  },

  '60-Day Returns': {
    US: '60-Day Returns',
    UK: '60-Day Returns',
    DE: '60-Tage-Rückgaberecht',
    FR: 'Retours 60 jours',
    IT: 'Resi 60 giorni',
    CA: '60-Day Returns',
    AU: '60-Day Returns',
    status: 'confirmed'
  },

  'Buyer Pays Return Shipping': {
    US: 'Buyer Pays Return Shipping',
    UK: 'Buyer Pays Return Postage',
    DE: 'Käufer zahlt Rückversand',
    FR: 'Acheteur paie retour',
    IT: 'Acquirente paga spedizione reso',
    CA: 'Buyer Pays Return Shipping',
    AU: 'Buyer Pays Return Postage',
    status: 'confirmed'
  },

  'Seller Pays Return Shipping': {
    US: 'Seller Pays Return Shipping',
    UK: 'Seller Pays Return Postage',
    DE: 'Verkäufer zahlt Rückversand',
    FR: 'Vendeur paie retour',
    IT: 'Venditore paga spedizione reso',
    CA: 'Seller Pays Return Shipping',
    AU: 'Seller Pays Return Postage',
    status: 'confirmed'
  },

  'No Returns Accepted': {
    US: 'No Returns Accepted',
    UK: 'No Returns Accepted',
    DE: 'Keine Rückgabe',
    FR: 'Retours non acceptés',
    IT: 'Resi non accettati',
    CA: 'No Returns Accepted',
    AU: 'No Returns Accepted',
    status: 'confirmed'
  },

  'Restocking Fee': {
    US: 'Restocking Fee',
    UK: 'Restocking Fee',
    DE: 'Wiederauffüllungsgebühr',
    FR: 'Frais de restockage',
    IT: 'Commissione di riassortimento',
    CA: 'Restocking Fee',
    AU: 'Restocking Fee',
    status: 'confirmed'
  },

  // LISTING FORMATS
  'Auction Format': {
    US: 'Auction Format',
    UK: 'Auction Format',
    DE: 'Auktionsformat',
    FR: 'Format enchères',
    IT: 'Formato asta',
    CA: 'Auction Format',
    AU: 'Auction Format',
    status: 'confirmed'
  },

  'Fixed Price Format': {
    US: 'Fixed Price Format',
    UK: 'Fixed Price Format',
    DE: 'Festpreisformat',
    FR: 'Format prix fixe',
    IT: 'Formato prezzo fisso',
    CA: 'Fixed Price Format',
    AU: 'Fixed Price Format',
    status: 'confirmed'
  },

  'Starting Bid': {
    US: 'Starting Bid',
    UK: 'Starting Bid',
    DE: 'Startgebot',
    FR: 'Enchère de départ',
    IT: 'Offerta iniziale',
    CA: 'Starting Bid',
    AU: 'Starting Bid',
    status: 'confirmed'
  },

  // LISTING STATUS & MANAGEMENT
  'Active Listings': {
    US: 'Active Listings',
    UK: 'Active Listings',
    DE: 'Aktive Angebote',
    FR: 'Annonces actives',
    IT: 'Inserzioni attive',
    CA: 'Active Listings',
    AU: 'Active Listings',
    status: 'confirmed'
  },

  'Draft Listings': {
    US: 'Draft Listings',
    UK: 'Draft Listings',
    DE: 'Entwürfe',
    FR: 'Brouillons',
    IT: 'Bozze',
    CA: 'Draft Listings',
    AU: 'Draft Listings',
    status: 'confirmed'
  },

  'Ended Listings': {
    US: 'Ended Listings',
    UK: 'Ended Listings',
    DE: 'Beendete Angebote',
    FR: 'Annonces terminées',
    IT: 'Inserzioni concluse',
    CA: 'Ended Listings',
    AU: 'Ended Listings',
    status: 'confirmed'
  },

  'Sold Listings': {
    US: 'Sold Listings',
    UK: 'Sold Listings',
    DE: 'Verkaufte Artikel',
    FR: 'Annonces vendues',
    IT: 'Inserzioni vendute',
    CA: 'Sold Listings',
    AU: 'Sold Listings',
    status: 'confirmed'
  },

  'Unsold Listings': {
    US: 'Unsold Listings',
    UK: 'Unsold Listings',
    DE: 'Unverkaufte Artikel',
    FR: 'Annonces invendues',
    IT: 'Inserzioni invendute',
    CA: 'Unsold Listings',
    AU: 'Unsold Listings',
    status: 'confirmed'
  },

  'Inactive Listings': {
    US: 'Inactive Listings',
    UK: 'Inactive Listings',
    DE: 'Inaktive Angebote',
    FR: 'Annonces inactives',
    IT: 'Inserzioni inattive',
    CA: 'Inactive Listings',
    AU: 'Inactive Listings',
    status: 'confirmed'
  },

  'Completed Listings': {
    US: 'Completed Listings',
    UK: 'Completed Listings',
    DE: 'Abgeschlossene Angebote',
    FR: 'Annonces terminées',
    IT: 'Inserzioni completate',
    CA: 'Completed Listings',
    AU: 'Completed Listings',
    status: 'confirmed'
  },

  // INVENTORY MANAGEMENT
  'Quantity Available': {
    US: 'Quantity Available',
    UK: 'Quantity Available',
    DE: 'Verfügbare Menge',
    FR: 'Quantité disponible',
    IT: 'Quantità disponibile',
    CA: 'Quantity Available',
    AU: 'Quantity Available',
    status: 'confirmed'
  },

  'Inventory Management': {
    US: 'Inventory Management',
    UK: 'Inventory Management',
    DE: 'Bestandsverwaltung',
    FR: 'Gestion des stocks',
    IT: 'Gestione inventario',
    CA: 'Inventory Management',
    AU: 'Inventory Management',
    status: 'confirmed'
  },

  'Stock Quantity': {
    US: 'Stock Quantity',
    UK: 'Stock Quantity',
    DE: 'Lagerbestand',
    FR: 'Quantité en stock',
    IT: 'Quantità magazzino',
    CA: 'Stock Quantity',
    AU: 'Stock Quantity',
    status: 'confirmed'
  },

  // SEARCH & FILTERING
  'Advanced Search': {
    US: 'Advanced Search',
    UK: 'Advanced Search',
    DE: 'Erweiterte Suche',
    FR: 'Recherche avancée',
    IT: 'Ricerca avanzata',
    CA: 'Advanced Search',
    AU: 'Advanced Search',
    status: 'confirmed'
  },

  'Category Browse': {
    US: 'Category Browse',
    UK: 'Category Browse',
    DE: 'Kategorie durchsuchen',
    FR: 'Parcourir catégories',
    IT: 'Sfoglia categorie',
    CA: 'Category Browse',
    AU: 'Category Browse',
    status: 'confirmed'
  },

  'Search Filters': {
    US: 'Search Filters',
    UK: 'Search Filters',
    DE: 'Suchfilter',
    FR: 'Filtres de recherche',
    IT: 'Filtri ricerca',
    CA: 'Search Filters',
    AU: 'Search Filters',
    status: 'confirmed'
  },

  // CONDITION STATES
  'Condition Description': {
    US: 'Condition Description',
    UK: 'Condition Description',
    DE: 'Zustandsbeschreibung',
    FR: 'Description de l\'état',
    IT: 'Descrizione condizione',
    CA: 'Condition Description',
    AU: 'Condition Description',
    status: 'confirmed'
  },

  'Item Condition': {
    US: 'Item Condition',
    UK: 'Item Condition',
    DE: 'Artikelzustand',
    FR: 'État de l\'objet',
    IT: 'Condizione oggetto',
    CA: 'Item Condition',
    AU: 'Item Condition',
    status: 'confirmed'
  },

  // SEARCH & RANKING SYSTEMS
  'Cassini': {
    US: 'Cassini',
    UK: 'Cassini',
    DE: 'Cassini',
    FR: 'Cassini',
    IT: 'Cassini',
    CA: 'Cassini',
    AU: 'Cassini',
    status: 'global'
  },

  'Best Match': {
    US: 'Best Match',
    UK: 'Best Match',
    DE: 'Beste Ergebnisse',
    FR: 'Meilleure correspondance',
    IT: 'Miglior risultato',
    CA: 'Best Match',
    AU: 'Best Match',
    status: 'confirmed'
  },

  // BULK UPLOAD & TOOLS
  'Seller Hub Reports': {
    US: 'Seller Hub Reports',
    UK: 'Seller Hub Reports',
    DE: 'Verkäufer-Cockpit-Berichte',
    FR: 'Rapports Hub vendeur',
    IT: 'Report Console venditori',
    CA: 'Seller Hub Reports',
    AU: 'Seller Hub Reports',
    status: 'confirmed'
  },

  'CSV Upload': {
    US: 'CSV Upload',
    UK: 'CSV Upload',
    DE: 'CSV-Upload',
    FR: 'Téléchargement CSV',
    IT: 'Caricamento CSV',
    CA: 'CSV Upload',
    AU: 'CSV Upload',
    status: 'confirmed'
  },

  'Bulk Upload': {
    US: 'Bulk Upload',
    UK: 'Bulk Upload',
    DE: 'Massen-Upload',
    FR: 'Téléchargement en masse',
    IT: 'Caricamento multiplo',
    CA: 'Bulk Upload',
    AU: 'Bulk Upload',
    status: 'confirmed'
  },

  // CHECKOUT & CART
  'Guest Checkout': {
    US: 'Guest Checkout',
    UK: 'Guest Checkout',
    DE: 'Gast-Checkout',
    FR: 'Paiement invité',
    IT: 'Checkout ospite',
    CA: 'Guest Checkout',
    AU: 'Guest Checkout',
    status: 'confirmed'
  },

  'Shopping Cart': {
    US: 'Shopping Cart',
    UK: 'Shopping Basket',
    DE: 'Einkaufswagen',
    FR: 'Panier',
    IT: 'Carrello',
    CA: 'Shopping Cart',
    AU: 'Shopping Cart',
    status: 'confirmed'
  },

  'Add to Cart': {
    US: 'Add to Cart',
    UK: 'Add to Basket',
    DE: 'In den Einkaufswagen',
    FR: 'Ajouter au panier',
    IT: 'Aggiungi al carrello',
    CA: 'Add to Cart',
    AU: 'Add to Cart',
    status: 'confirmed'
  },

  'Save for Later': {
    US: 'Save for Later',
    UK: 'Save for Later',
    DE: 'Für später speichern',
    FR: 'Enregistrer pour plus tard',
    IT: 'Salva per dopo',
    CA: 'Save for Later',
    AU: 'Save for Later',
    status: 'confirmed'
  },

  // NOTIFICATIONS
  'Push Notifications': {
    US: 'Push Notifications',
    UK: 'Push Notifications',
    DE: 'Push-Benachrichtigungen',
    FR: 'Notifications push',
    IT: 'Notifiche push',
    CA: 'Push Notifications',
    AU: 'Push Notifications',
    status: 'confirmed'
  },

  'Email Notifications': {
    US: 'Email Notifications',
    UK: 'Email Notifications',
    DE: 'E-Mail-Benachrichtigungen',
    FR: 'Notifications par e-mail',
    IT: 'Notifiche email',
    CA: 'Email Notifications',
    AU: 'Email Notifications',
    status: 'confirmed'
  },

  'SMS Alerts': {
    US: 'SMS Alerts',
    UK: 'SMS Alerts',
    DE: 'SMS-Benachrichtigungen',
    FR: 'Alertes SMS',
    IT: 'Avvisi SMS',
    CA: 'SMS Alerts',
    AU: 'SMS Alerts',
    status: 'confirmed'
  },

  'Outbid Alert': {
    US: 'Outbid Alert',
    UK: 'Outbid Alert',
    DE: 'Überboten-Benachrichtigung',
    FR: 'Alerte surenchère',
    IT: 'Avviso superamento offerta',
    CA: 'Outbid Alert',
    AU: 'Outbid Alert',
    status: 'confirmed'
  },

  // BIDDING FEATURES
  'Automatic Bidding': {
    US: 'Automatic Bidding',
    UK: 'Automatic Bidding',
    DE: 'Automatisches Bieten',
    FR: 'Enchères automatiques',
    IT: 'Offerta automatica',
    CA: 'Automatic Bidding',
    AU: 'Automatic Bidding',
    status: 'confirmed'
  },

  'Proxy Bidding': {
    US: 'Proxy Bidding',
    UK: 'Proxy Bidding',
    DE: 'Proxy-Bieten',
    FR: 'Enchères par procuration',
    IT: 'Offerta per procura',
    CA: 'Proxy Bidding',
    AU: 'Proxy Bidding',
    status: 'confirmed'
  },

  'Maximum Bid': {
    US: 'Maximum Bid',
    UK: 'Maximum Bid',
    DE: 'Maximalgebot',
    FR: 'Enchère maximale',
    IT: 'Offerta massima',
    CA: 'Maximum Bid',
    AU: 'Maximum Bid',
    status: 'confirmed'
  },

  'Bid Increment': {
    US: 'Bid Increment',
    UK: 'Bid Increment',
    DE: 'Gebotsschritt',
    FR: 'Incrément d\'enchère',
    IT: 'Incremento offerta',
    CA: 'Bid Increment',
    AU: 'Bid Increment',
    status: 'confirmed'
  },

  // OFFER NEGOTIATION
  'Counteroffer': {
    US: 'Counteroffer',
    UK: 'Counteroffer',
    DE: 'Gegenangebot',
    FR: 'Contre-offre',
    IT: 'Controfferta',
    CA: 'Counteroffer',
    AU: 'Counteroffer',
    status: 'confirmed'
  },

  'Accept Offer': {
    US: 'Accept Offer',
    UK: 'Accept Offer',
    DE: 'Angebot annehmen',
    FR: 'Accepter l\'offre',
    IT: 'Accetta offerta',
    CA: 'Accept Offer',
    AU: 'Accept Offer',
    status: 'confirmed'
  },

  'Decline Offer': {
    US: 'Decline Offer',
    UK: 'Decline Offer',
    DE: 'Angebot ablehnen',
    FR: 'Refuser l\'offre',
    IT: 'Rifiuta offerta',
    CA: 'Decline Offer',
    AU: 'Decline Offer',
    status: 'confirmed'
  },

  'Second Chance Offer': {
    US: 'Second Chance Offer',
    UK: 'Second Chance Offer',
    DE: 'Zweite-Chance-Angebot',
    FR: 'Seconde chance',
    IT: 'Offerta seconda opportunità',
    CA: 'Second Chance Offer',
    AU: 'Second Chance Offer',
    status: 'confirmed'
  },

  // PURCHASE HISTORY & REORDERING
  'Purchase History': {
    US: 'Purchase History',
    UK: 'Purchase History',
    DE: 'Kaufübersicht',
    FR: 'Historique des achats',
    IT: 'Cronologia acquisti',
    CA: 'Purchase History',
    AU: 'Purchase History',
    status: 'confirmed'
  },

  'Buy Again': {
    US: 'Buy Again',
    UK: 'Buy Again',
    DE: 'Erneut kaufen',
    FR: 'Racheter',
    IT: 'Acquista di nuovo',
    CA: 'Buy Again',
    AU: 'Buy Again',
    status: 'confirmed'
  },

  'Collections': {
    US: 'Collections',
    UK: 'Collections',
    DE: 'Sammlungen',
    FR: 'Collections',
    IT: 'Collezioni',
    CA: 'Collections',
    AU: 'Collections',
    status: 'confirmed'
  },

  // SHIPPING & FULFILLMENT
  'Print Shipping Label': {
    US: 'Print Shipping Label',
    UK: 'Print Postage Label',
    DE: 'Versandetikett drucken',
    FR: 'Imprimer étiquette d\'expédition',
    IT: 'Stampa etichetta spedizione',
    CA: 'Print Shipping Label',
    AU: 'Print Postage Label',
    status: 'confirmed'
  },

  'Thermal Printer': {
    US: 'Thermal Printer',
    UK: 'Thermal Printer',
    DE: 'Thermodrucker',
    FR: 'Imprimante thermique',
    IT: 'Stampante termica',
    CA: 'Thermal Printer',
    AU: 'Thermal Printer',
    status: 'confirmed'
  },

  'Upload Tracking': {
    US: 'Upload Tracking',
    UK: 'Upload Tracking',
    DE: 'Tracking hochladen',
    FR: 'Télécharger suivi',
    IT: 'Carica tracciamento',
    CA: 'Upload Tracking',
    AU: 'Upload Tracking',
    status: 'confirmed'
  },

  'Tracking Number': {
    US: 'Tracking Number',
    UK: 'Tracking Number',
    DE: 'Sendungsnummer',
    FR: 'Numéro de suivi',
    IT: 'Numero di tracciamento',
    CA: 'Tracking Number',
    AU: 'Tracking Number',
    status: 'confirmed'
  },

  'Package Tracking': {
    US: 'Package Tracking',
    UK: 'Package Tracking',
    DE: 'Paketverfolgung',
    FR: 'Suivi de colis',
    IT: 'Tracciamento pacco',
    CA: 'Package Tracking',
    AU: 'Package Tracking',
    status: 'confirmed'
  },

  'Mark as Shipped': {
    US: 'Mark as Shipped',
    UK: 'Mark as Dispatched',
    DE: 'Als versendet markieren',
    FR: 'Marquer comme expédié',
    IT: 'Segna come spedito',
    CA: 'Mark as Shipped',
    AU: 'Mark as Dispatched',
    status: 'confirmed'
  },

  'Shipment Confirmation': {
    US: 'Shipment Confirmation',
    UK: 'Dispatch Confirmation',
    DE: 'Versandbestätigung',
    FR: 'Confirmation d\'expédition',
    IT: 'Conferma spedizione',
    CA: 'Shipment Confirmation',
    AU: 'Dispatch Confirmation',
    status: 'confirmed'
  },

  // ORDER MANAGEMENT
  'Cancel Order': {
    US: 'Cancel Order',
    UK: 'Cancel Order',
    DE: 'Bestellung stornieren',
    FR: 'Annuler la commande',
    IT: 'Annulla ordine',
    CA: 'Cancel Order',
    AU: 'Cancel Order',
    status: 'confirmed'
  },

  'Cancellation Request': {
    US: 'Cancellation Request',
    UK: 'Cancellation Request',
    DE: 'Stornierungsanfrage',
    FR: 'Demande d\'annulation',
    IT: 'Richiesta di annullamento',
    CA: 'Cancellation Request',
    AU: 'Cancellation Request',
    status: 'confirmed'
  },

  // REFUNDS
  'Full Refund': {
    US: 'Full Refund',
    UK: 'Full Refund',
    DE: 'Vollständige Rückerstattung',
    FR: 'Remboursement complet',
    IT: 'Rimborso completo',
    CA: 'Full Refund',
    AU: 'Full Refund',
    status: 'confirmed'
  },

  'Partial Refund': {
    US: 'Partial Refund',
    UK: 'Partial Refund',
    DE: 'Teilrückerstattung',
    FR: 'Remboursement partiel',
    IT: 'Rimborso parziale',
    CA: 'Partial Refund',
    AU: 'Partial Refund',
    status: 'confirmed'
  },

  'Send Refund': {
    US: 'Send Refund',
    UK: 'Send Refund',
    DE: 'Rückerstattung senden',
    FR: 'Envoyer remboursement',
    IT: 'Invia rimborso',
    CA: 'Send Refund',
    AU: 'Send Refund',
    status: 'confirmed'
  },

  // COMBINED SHIPPING
  'Combined Shipping': {
    US: 'Combined Shipping',
    UK: 'Combined Postage',
    DE: 'Kombinierter Versand',
    FR: 'Frais de port combinés',
    IT: 'Spedizione combinata',
    CA: 'Combined Shipping',
    AU: 'Combined Postage',
    status: 'confirmed'
  },

  'Request Total': {
    US: 'Request Total',
    UK: 'Request Total',
    DE: 'Gesamtbetrag anfordern',
    FR: 'Demander le total',
    IT: 'Richiedi totale',
    CA: 'Request Total',
    AU: 'Request Total',
    status: 'confirmed'
  },

  'Shipping Discount': {
    US: 'Shipping Discount',
    UK: 'Postage Discount',
    DE: 'Versandrabatt',
    FR: 'Réduction frais de port',
    IT: 'Sconto spedizione',
    CA: 'Shipping Discount',
    AU: 'Postage Discount',
    status: 'confirmed'
  },

  'Send Invoice': {
    US: 'Send Invoice',
    UK: 'Send Invoice',
    DE: 'Rechnung senden',
    FR: 'Envoyer facture',
    IT: 'Invia fattura',
    CA: 'Send Invoice',
    AU: 'Send Invoice',
    status: 'confirmed'
  },

  // ADVERTISING PLACEMENTS & CAMPAIGNS
  'Priority Campaign': {
    US: 'Priority Campaign',
    UK: 'Priority Campaign',
    DE: 'Prioritätskampagne',
    FR: 'Campagne prioritaire',
    IT: 'Campagna prioritaria',
    CA: 'Priority Campaign',
    AU: 'Priority Campaign',
    status: 'confirmed'
  },

  'General Campaign': {
    US: 'General Campaign',
    UK: 'General Campaign',
    DE: 'Allgemeine Kampagne',
    FR: 'Campagne générale',
    IT: 'Campagna generale',
    CA: 'General Campaign',
    AU: 'General Campaign',
    status: 'confirmed'
  },

  'Ad Attribution': {
    US: 'Ad Attribution',
    UK: 'Ad Attribution',
    DE: 'Werbezuordnung',
    FR: 'Attribution publicitaire',
    IT: 'Attribuzione annuncio',
    CA: 'Ad Attribution',
    AU: 'Ad Attribution',
    status: 'confirmed'
  },

  'Cost Per Sale': {
    US: 'Cost Per Sale',
    UK: 'Cost Per Sale',
    DE: 'Kosten pro Verkauf',
    FR: 'Coût par vente',
    IT: 'Costo per vendita',
    CA: 'Cost Per Sale',
    AU: 'Cost Per Sale',
    status: 'confirmed'
  },

  'Cost Per Click': {
    US: 'Cost Per Click',
    UK: 'Cost Per Click',
    DE: 'Kosten pro Klick',
    FR: 'Coût par clic',
    IT: 'Costo per clic',
    CA: 'Cost Per Click',
    AU: 'Cost Per Click',
    status: 'confirmed'
  },

  'Ad Fee': {
    US: 'Ad Fee',
    UK: 'Ad Fee',
    DE: 'Werbegebühr',
    FR: 'Frais publicitaires',
    IT: 'Commissione pubblicitaria',
    CA: 'Ad Fee',
    AU: 'Ad Fee',
    status: 'confirmed'
  },

  'Featured First': {
    US: 'Featured First',
    UK: 'Featured First',
    DE: 'Zuerst vorgestellt',
    FR: 'En vedette en premier',
    IT: 'In evidenza per primo',
    CA: 'Featured First',
    AU: 'Featured First',
    status: 'confirmed'
  },

  'Premium Placement': {
    US: 'Premium Placement',
    UK: 'Premium Placement',
    DE: 'Premium-Platzierung',
    FR: 'Placement premium',
    IT: 'Posizionamento premium',
    CA: 'Premium Placement',
    AU: 'Premium Placement',
    status: 'confirmed'
  },

  // TRAFFIC & ENGAGEMENT METRICS
  'Page Views': {
    US: 'Page Views',
    UK: 'Page Views',
    DE: 'Seitenaufrufe',
    FR: 'Pages vues',
    IT: 'Visualizzazioni pagina',
    CA: 'Page Views',
    AU: 'Page Views',
    status: 'confirmed'
  },

  'Visits': {
    US: 'Visits',
    UK: 'Visits',
    DE: 'Besuche',
    FR: 'Visites',
    IT: 'Visite',
    CA: 'Visits',
    AU: 'Visits',
    status: 'confirmed'
  },

  'Unique Visitors': {
    US: 'Unique Visitors',
    UK: 'Unique Visitors',
    DE: 'Eindeutige Besucher',
    FR: 'Visiteurs uniques',
    IT: 'Visitatori unici',
    CA: 'Unique Visitors',
    AU: 'Unique Visitors',
    status: 'confirmed'
  },

  'Session Duration': {
    US: 'Session Duration',
    UK: 'Session Duration',
    DE: 'Sitzungsdauer',
    FR: 'Durée de session',
    IT: 'Durata sessione',
    CA: 'Session Duration',
    AU: 'Session Duration',
    status: 'confirmed'
  },

  'Bounce Rate': {
    US: 'Bounce Rate',
    UK: 'Bounce Rate',
    DE: 'Absprungrate',
    FR: 'Taux de rebond',
    IT: 'Frequenza di rimbalzo',
    CA: 'Bounce Rate',
    AU: 'Bounce Rate',
    status: 'confirmed'
  },

  // PERFORMANCE METRICS
  'Sell-Through Rate': {
    US: 'Sell-Through Rate',
    UK: 'Sell-Through Rate',
    DE: 'Verkaufsrate',
    FR: 'Taux de vente',
    IT: 'Tasso di vendita',
    CA: 'Sell-Through Rate',
    AU: 'Sell-Through Rate',
    status: 'confirmed'
  },

  'Conversion Rate': {
    US: 'Conversion Rate',
    UK: 'Conversion Rate',
    DE: 'Konversionsrate',
    FR: 'Taux de conversion',
    IT: 'Tasso di conversione',
    CA: 'Conversion Rate',
    AU: 'Conversion Rate',
    status: 'confirmed'
  },

  'Transaction Defect Rate': {
    US: 'Transaction Defect Rate',
    UK: 'Transaction Defect Rate',
    DE: 'Transaktionsfehlerquote',
    FR: 'Taux de défauts de transaction',
    IT: 'Tasso difetti transazione',
    CA: 'Transaction Defect Rate',
    AU: 'Transaction Defect Rate',
    status: 'confirmed'
  },

  'Late Shipment Rate': {
    US: 'Late Shipment Rate',
    UK: 'Late Dispatch Rate',
    DE: 'Verspätete Versandrate',
    FR: 'Taux d\'expédition tardive',
    IT: 'Tasso spedizione in ritardo',
    CA: 'Late Shipment Rate',
    AU: 'Late Dispatch Rate',
    status: 'confirmed'
  },

  'Valid Tracking Rate': {
    US: 'Valid Tracking Rate',
    UK: 'Valid Tracking Rate',
    DE: 'Gültige Tracking-Rate',
    FR: 'Taux de suivi valide',
    IT: 'Tasso tracciamento valido',
    CA: 'Valid Tracking Rate',
    AU: 'Valid Tracking Rate',
    status: 'confirmed'
  },

  // SELLER PERFORMANCE LEVELS
  'Above Standard': {
    US: 'Above Standard',
    UK: 'Above Standard',
    DE: 'Über Standard',
    FR: 'Au-dessus de la norme',
    IT: 'Superiore allo standard',
    CA: 'Above Standard',
    AU: 'Above Standard',
    status: 'confirmed'
  },

  'Below Standard': {
    US: 'Below Standard',
    UK: 'Below Standard',
    DE: 'Unter Standard',
    FR: 'En dessous de la norme',
    IT: 'Inferiore allo standard',
    CA: 'Below Standard',
    AU: 'Below Standard',
    status: 'confirmed'
  },

  // CASE TYPES & RESOLUTION
  'Item Not Received': {
    US: 'Item Not Received',
    UK: 'Item Not Received',
    DE: 'Artikel nicht erhalten',
    FR: 'Objet non reçu',
    IT: 'Oggetto non ricevuto',
    CA: 'Item Not Received',
    AU: 'Item Not Received',
    status: 'confirmed'
  },

  'Significantly Not as Described': {
    US: 'Significantly Not as Described',
    UK: 'Significantly Not as Described',
    DE: 'Erheblich nicht wie beschrieben',
    FR: 'Très différent de la description',
    IT: 'Significativamente non conforme',
    CA: 'Significantly Not as Described',
    AU: 'Significantly Not as Described',
    status: 'confirmed'
  },

  'Cases Closed Without Seller Resolution': {
    US: 'Cases Closed Without Seller Resolution',
    UK: 'Cases Closed Without Seller Resolution',
    DE: 'Fälle ohne Verkäuferlösung geschlossen',
    FR: 'Litiges clos sans résolution vendeur',
    IT: 'Casi chiusi senza risoluzione venditore',
    CA: 'Cases Closed Without Seller Resolution',
    AU: 'Cases Closed Without Seller Resolution',
    status: 'confirmed'
  },

  // OFFER MANAGEMENT
  'Offers Sent': {
    US: 'Offers Sent',
    UK: 'Offers Sent',
    DE: 'Gesendete Angebote',
    FR: 'Offres envoyées',
    IT: 'Offerte inviate',
    CA: 'Offers Sent',
    AU: 'Offers Sent',
    status: 'confirmed'
  },

  'Offers Received': {
    US: 'Offers Received',
    UK: 'Offers Received',
    DE: 'Erhaltene Angebote',
    FR: 'Offres reçues',
    IT: 'Offerte ricevute',
    CA: 'Offers Received',
    AU: 'Offers Received',
    status: 'confirmed'
  },

  'Offer History': {
    US: 'Offer History',
    UK: 'Offer History',
    DE: 'Angebotsverlauf',
    FR: 'Historique des offres',
    IT: 'Cronologia offerte',
    CA: 'Offer History',
    AU: 'Offer History',
    status: 'confirmed'
  },

  'Review Offers': {
    US: 'Review Offers',
    UK: 'Review Offers',
    DE: 'Angebote prüfen',
    FR: 'Examiner les offres',
    IT: 'Esamina offerte',
    CA: 'Review Offers',
    AU: 'Review Offers',
    status: 'confirmed'
  },

  // PAYMENT METHODS
  'PayPal': {
    US: 'PayPal',
    UK: 'PayPal',
    DE: 'PayPal',
    FR: 'PayPal',
    IT: 'PayPal',
    CA: 'PayPal',
    AU: 'PayPal',
    status: 'global'
  },
  'Venmo': {
    US: 'Venmo',
    UK: 'Venmo',
    DE: 'Venmo',
    FR: 'Venmo',
    IT: 'Venmo',
    CA: 'Venmo',
    AU: 'Venmo',
    status: 'partial'
  },
  'Apple Pay': {
    US: 'Apple Pay',
    UK: 'Apple Pay',
    DE: 'Apple Pay',
    FR: 'Apple Pay',
    IT: 'Apple Pay',
    CA: 'Apple Pay',
    AU: 'Apple Pay',
    status: 'global'
  },
  'Google Pay': {
    US: 'Google Pay',
    UK: 'Google Pay',
    DE: 'Google Pay',
    FR: 'Google Pay',
    IT: 'Google Pay',
    CA: 'Google Pay',
    AU: 'Google Pay',
    status: 'global'
  },
  'Klarna': {
    US: 'Klarna',
    UK: 'Klarna',
    DE: 'Klarna',
    FR: 'Klarna',
    IT: 'Klarna',
    CA: 'Klarna',
    AU: 'Klarna',
    status: 'global'
  },
  'Credit Card': {
    US: 'Credit Card',
    UK: 'Credit Card',
    DE: 'Kreditkarte',
    FR: 'Carte de crédit',
    IT: 'Carta di credito',
    CA: 'Credit Card',
    AU: 'Credit Card',
    status: 'confirmed'
  },
  'Debit Card': {
    US: 'Debit Card',
    UK: 'Debit Card',
    DE: 'Debitkarte',
    FR: 'Carte de débit',
    IT: 'Carta di debito',
    CA: 'Debit Card',
    AU: 'Debit Card',
    status: 'confirmed'
  },

  // SHIPPING CARRIERS & LABELS
  'eBay Labels': {
    US: 'eBay Labels',
    UK: 'eBay Labels',
    DE: 'eBay-Versandetiketten',
    FR: 'Étiquettes eBay',
    IT: 'Etichette eBay',
    CA: 'eBay Labels',
    AU: 'eBay Labels',
    status: 'confirmed'
  },
  'USPS': {
    US: 'USPS',
    UK: 'USPS',
    DE: 'USPS',
    FR: 'USPS',
    IT: 'USPS',
    CA: 'USPS',
    AU: 'USPS',
    status: 'global'
  },
  'FedEx': {
    US: 'FedEx',
    UK: 'FedEx',
    DE: 'FedEx',
    FR: 'FedEx',
    IT: 'FedEx',
    CA: 'FedEx',
    AU: 'FedEx',
    status: 'global'
  },
  'UPS': {
    US: 'UPS',
    UK: 'UPS',
    DE: 'UPS',
    FR: 'UPS',
    IT: 'UPS',
    CA: 'UPS',
    AU: 'UPS',
    status: 'global'
  },
  'DHL': {
    US: 'DHL',
    UK: 'DHL',
    DE: 'DHL',
    FR: 'DHL',
    IT: 'DHL',
    CA: 'DHL',
    AU: 'DHL',
    status: 'global'
  },

  // MOBILE APP FEATURES
  'Image Search': {
    US: 'Image Search',
    UK: 'Image Search',
    DE: 'Bildersuche',
    FR: 'Recherche par image',
    IT: 'Ricerca per immagine',
    CA: 'Image Search',
    AU: 'Image Search',
    status: 'confirmed'
  },
  'Barcode Scanner': {
    US: 'Barcode Scanner',
    UK: 'Barcode Scanner',
    DE: 'Barcode-Scanner',
    FR: 'Scanner de codes-barres',
    IT: 'Scanner codici a barre',
    CA: 'Barcode Scanner',
    AU: 'Barcode Scanner',
    status: 'confirmed'
  },
  'Mobile Notifications': {
    US: 'Mobile Notifications',
    UK: 'Mobile Notifications',
    DE: 'Mobile Benachrichtigungen',
    FR: 'Notifications mobiles',
    IT: 'Notifiche mobili',
    CA: 'Mobile Notifications',
    AU: 'Mobile Notifications',
    status: 'confirmed'
  },

  // DEVELOPER & API PROGRAMS
  'eBay Developers Program': {
    US: 'eBay Developers Program',
    UK: 'eBay Developers Program',
    DE: 'eBay Developers Program',
    FR: 'eBay Developers Program',
    IT: 'eBay Developers Program',
    CA: 'eBay Developers Program',
    AU: 'eBay Developers Program',
    status: 'global'
  },
  'eBay Partner Network': {
    US: 'eBay Partner Network',
    UK: 'eBay Partner Network',
    DE: 'eBay Partner Network',
    FR: 'eBay Partner Network',
    IT: 'eBay Partner Network',
    CA: 'eBay Partner Network',
    AU: 'eBay Partner Network',
    status: 'global'
  },
  'Analytics API': {
    US: 'Analytics API',
    UK: 'Analytics API',
    DE: 'Analytics API',
    FR: 'Analytics API',
    IT: 'Analytics API',
    CA: 'Analytics API',
    AU: 'Analytics API',
    status: 'global'
  },

  // SELLER ANALYTICS & REPORTS
  'Traffic Report': {
    US: 'Traffic Report',
    UK: 'Traffic Report',
    DE: 'Traffic-Bericht',
    FR: 'Rapport de trafic',
    IT: 'Rapporto sul traffico',
    CA: 'Traffic Report',
    AU: 'Traffic Report',
    status: 'confirmed'
  },
  'Sales Report': {
    US: 'Sales Report',
    UK: 'Sales Report',
    DE: 'Verkaufsbericht',
    FR: 'Rapport des ventes',
    IT: 'Rapporto vendite',
    CA: 'Sales Report',
    AU: 'Sales Report',
    status: 'confirmed'
  },
  'Active Listings Report': {
    US: 'Active Listings Report',
    UK: 'Active Listings Report',
    DE: 'Aktive Angebote Bericht',
    FR: 'Rapport des annonces actives',
    IT: 'Rapporto inserzioni attive',
    CA: 'Active Listings Report',
    AU: 'Active Listings Report',
    status: 'confirmed'
  },
  'Service Metrics': {
    US: 'Service Metrics',
    UK: 'Service Metrics',
    DE: 'Service-Metriken',
    FR: 'Métriques de service',
    IT: 'Metriche del servizio',
    CA: 'Service Metrics',
    AU: 'Service Metrics',
    status: 'confirmed'
  },
  'Sell-Through Rate': {
    US: 'Sell-Through Rate',
    UK: 'Sell-Through Rate',
    DE: 'Verkaufsrate',
    FR: 'Taux de vente',
    IT: 'Tasso di vendita',
    CA: 'Sell-Through Rate',
    AU: 'Sell-Through Rate',
    status: 'confirmed'
  },

  // STORE CUSTOMIZATION
  'Store Logo': {
    US: 'Store Logo',
    UK: 'Store Logo',
    DE: 'Shop-Logo',
    FR: 'Logo de boutique',
    IT: 'Logo del negozio',
    CA: 'Store Logo',
    AU: 'Store Logo',
    status: 'confirmed'
  },
  'Store Banner': {
    US: 'Store Banner',
    UK: 'Store Banner',
    DE: 'Shop-Banner',
    FR: 'Bannière de boutique',
    IT: 'Banner del negozio',
    CA: 'Store Banner',
    AU: 'Store Banner',
    status: 'confirmed'
  },
  'Custom Categories': {
    US: 'Custom Categories',
    UK: 'Custom Categories',
    DE: 'Benutzerdefinierte Kategorien',
    FR: 'Catégories personnalisées',
    IT: 'Categorie personalizzate',
    CA: 'Custom Categories',
    AU: 'Custom Categories',
    status: 'confirmed'
  },

  // AUCTION & LISTING FORMATS
  'Reserve Price': {
    US: 'Reserve Price',
    UK: 'Reserve Price',
    DE: 'Mindestpreis',
    FR: 'Prix de réserve',
    IT: 'Prezzo di riserva',
    CA: 'Reserve Price',
    AU: 'Reserve Price',
    status: 'confirmed'
  },
  'Auction': {
    US: 'Auction',
    UK: 'Auction',
    DE: 'Auktion',
    FR: 'Enchères',
    IT: 'Asta',
    CA: 'Auction',
    AU: 'Auction',
    status: 'confirmed'
  },
  'Starting Bid': {
    US: 'Starting Bid',
    UK: 'Starting Bid',
    DE: 'Startgebot',
    FR: 'Enchère de départ',
    IT: 'Offerta iniziale',
    CA: 'Starting Bid',
    AU: 'Starting Bid',
    status: 'confirmed'
  },
  'Auto-Relist': {
    US: 'Auto-Relist',
    UK: 'Auto-Relist',
    DE: 'Automatische Wiedereinstellung',
    FR: 'Remise en vente automatique',
    IT: 'Rimessa in vendita automatica',
    CA: 'Auto-Relist',
    AU: 'Auto-Relist',
    status: 'confirmed'
  },
  'Buy Now Price': {
    US: 'Buy Now Price',
    UK: 'Buy Now Price',
    DE: 'Sofort-Kaufen-Preis',
    FR: 'Prix Achat immédiat',
    IT: 'Prezzo Compralo Subito',
    CA: 'Buy Now Price',
    AU: 'Buy Now Price',
    status: 'confirmed'
  },

  // BUYER PROTECTION PROGRAMS
  'Vehicle Purchase Protection': {
    US: 'Vehicle Purchase Protection',
    UK: 'Vehicle Purchase Protection',
    DE: 'Fahrzeugkaufschutz',
    FR: 'Protection achat véhicule',
    IT: 'Protezione acquisto veicolo',
    CA: 'Vehicle Purchase Protection',
    AU: 'Vehicle Purchase Protection',
    status: 'partial'
  },
  'Business Equipment Purchase Protection': {
    US: 'Business Equipment Purchase Protection',
    UK: 'Business Equipment Purchase Protection',
    DE: 'Geschäftsausrüstung Kaufschutz',
    FR: 'Protection achat équipement professionnel',
    IT: 'Protezione acquisto attrezzature professionali',
    CA: 'Business Equipment Purchase Protection',
    AU: 'Business Equipment Purchase Protection',
    status: 'research-needed'
  },

  // RETURNS & REFUNDS
  'Hassle-Free Returns': {
    US: 'Hassle-Free Returns',
    UK: 'Hassle-Free Returns',
    DE: 'Problemlose Rücksendungen',
    FR: 'Retours sans tracas',
    IT: 'Resi senza problemi',
    CA: 'Hassle-Free Returns',
    AU: 'Hassle-Free Returns',
    status: 'confirmed'
  },
  'Return Label': {
    US: 'Return Label',
    UK: 'Return Label',
    DE: 'Rücksendeetikett',
    FR: 'Étiquette de retour',
    IT: 'Etichetta di reso',
    CA: 'Return Label',
    AU: 'Return Label',
    status: 'confirmed'
  },
  'Free Returns': {
    US: 'Free Returns',
    UK: 'Free Returns',
    DE: 'Kostenlose Rücksendung',
    FR: 'Retours gratuits',
    IT: 'Resi gratuiti',
    CA: 'Free Returns',
    AU: 'Free Returns',
    status: 'confirmed'
  },
  'Return Shipping': {
    US: 'Return Shipping',
    UK: 'Return Postage',
    DE: 'Rückversand',
    FR: 'Frais de retour',
    IT: 'Spedizione di reso',
    CA: 'Return Shipping',
    AU: 'Return Shipping',
    status: 'confirmed'
  },

  // TAX & CUSTOMS
  'Sales Tax Collection': {
    US: 'Sales Tax Collection',
    UK: 'VAT Collection',
    DE: 'Mehrwertsteuer-Einzug',
    FR: 'Collecte de TVA',
    IT: 'Riscossione IVA',
    CA: 'Sales Tax Collection',
    AU: 'GST Collection',
    status: 'confirmed'
  },
  'Import Charges': {
    US: 'Import Charges',
    UK: 'Import Charges',
    DE: 'Einfuhrabgaben',
    FR: 'Frais d\'importation',
    IT: 'Spese di importazione',
    CA: 'Import Charges',
    AU: 'Import Charges',
    status: 'confirmed'
  },
  'Customs Duties': {
    US: 'Customs Duties',
    UK: 'Customs Duties',
    DE: 'Zollgebühren',
    FR: 'Droits de douane',
    IT: 'Dazi doganali',
    CA: 'Customs Duties',
    AU: 'Customs Duties',
    status: 'confirmed'
  },
  'VAT': {
    US: 'Sales Tax',
    UK: 'VAT',
    DE: 'MwSt',
    FR: 'TVA',
    IT: 'IVA',
    CA: 'GST/HST',
    AU: 'GST',
    status: 'confirmed'
  },

  // BULK UPLOAD & LISTING TOOLS
  'Seller Hub Reports': {
    US: 'Seller Hub Reports',
    UK: 'Seller Hub Reports',
    DE: 'Verkäufer-Cockpit Berichte',
    FR: 'Rapports Hub vendeur',
    IT: 'Report Console venditori',
    CA: 'Seller Hub Reports',
    AU: 'Seller Hub Reports',
    status: 'confirmed'
  },
  'File Exchange': {
    US: 'File Exchange',
    UK: 'File Exchange',
    DE: 'Datenaustausch',
    FR: 'Échange de fichiers',
    IT: 'Scambio file',
    CA: 'File Exchange',
    AU: 'File Exchange',
    status: 'confirmed'
  },
  'CSV Upload': {
    US: 'CSV Upload',
    UK: 'CSV Upload',
    DE: 'CSV-Upload',
    FR: 'Téléchargement CSV',
    IT: 'Caricamento CSV',
    CA: 'CSV Upload',
    AU: 'CSV Upload',
    status: 'confirmed'
  },
  'Bulk Listing': {
    US: 'Bulk Listing',
    UK: 'Bulk Listing',
    DE: 'Massenangebot',
    FR: 'Mise en vente groupée',
    IT: 'Inserzione multipla',
    CA: 'Bulk Listing',
    AU: 'Bulk Listing',
    status: 'confirmed'
  },
  'Bulk Edit': {
    US: 'Bulk Edit',
    UK: 'Bulk Edit',
    DE: 'Massenbearbeitung',
    FR: 'Modification groupée',
    IT: 'Modifica multipla',
    CA: 'Bulk Edit',
    AU: 'Bulk Edit',
    status: 'confirmed'
  },

  // CONDITION STATES
  'New': {
    US: 'New',
    UK: 'New',
    DE: 'Neu',
    FR: 'Neuf',
    IT: 'Nuovo',
    CA: 'New',
    AU: 'New',
    status: 'confirmed'
  },
  'Pre-owned': {
    US: 'Pre-owned',
    UK: 'Pre-owned',
    DE: 'Gebraucht',
    FR: 'D\'occasion',
    IT: 'Usato',
    CA: 'Pre-owned',
    AU: 'Pre-owned',
    status: 'confirmed'
  },
  'Used': {
    US: 'Used',
    UK: 'Used',
    DE: 'Gebraucht',
    FR: 'Utilisé',
    IT: 'Usato',
    CA: 'Used',
    AU: 'Used',
    status: 'confirmed'
  },
  'Like New': {
    US: 'Like New',
    UK: 'Like New',
    DE: 'Wie neu',
    FR: 'Comme neuf',
    IT: 'Come nuovo',
    CA: 'Like New',
    AU: 'Like New',
    status: 'confirmed'
  },
  'New with Tags': {
    US: 'New with Tags',
    UK: 'New with Tags',
    DE: 'Neu mit Etikett',
    FR: 'Neuf avec étiquettes',
    IT: 'Nuovo con etichette',
    CA: 'New with Tags',
    AU: 'New with Tags',
    status: 'confirmed'
  },
  'New without Tags': {
    US: 'New without Tags',
    UK: 'New without Tags',
    DE: 'Neu ohne Etikett',
    FR: 'Neuf sans étiquettes',
    IT: 'Nuovo senza etichette',
    CA: 'New without Tags',
    AU: 'New without Tags',
    status: 'confirmed'
  },
  'New with Box': {
    US: 'New with Box',
    UK: 'New with Box',
    DE: 'Neu mit Karton',
    FR: 'Neuf avec boîte',
    IT: 'Nuovo con scatola',
    CA: 'New with Box',
    AU: 'New with Box',
    status: 'confirmed'
  },
  'New without Box': {
    US: 'New without Box',
    UK: 'New without Box',
    DE: 'Neu ohne Karton',
    FR: 'Neuf sans boîte',
    IT: 'Nuovo senza scatola',
    CA: 'New without Box',
    AU: 'New without Box',
    status: 'confirmed'
  },
  'Certified Pre-owned': {
    US: 'Certified Pre-owned',
    UK: 'Certified Pre-owned',
    DE: 'Geprüft gebraucht',
    FR: 'D\'occasion certifié',
    IT: 'Usato certificato',
    CA: 'Certified Pre-owned',
    AU: 'Certified Pre-owned',
    status: 'partial'
  },

  // LISTING DURATIONS
  'Good \'Til Cancelled': {
    US: 'Good \'Til Cancelled',
    UK: 'Good \'Til Cancelled',
    DE: 'Unbefristet',
    FR: 'Durée illimitée',
    IT: 'Fino all\'annullamento',
    CA: 'Good \'Til Cancelled',
    AU: 'Good \'Til Cancelled',
    status: 'confirmed'
  },
  '1-Day Listing': {
    US: '1-Day Listing',
    UK: '1-Day Listing',
    DE: '1-Tages-Angebot',
    FR: 'Annonce 1 jour',
    IT: 'Inserzione 1 giorno',
    CA: '1-Day Listing',
    AU: '1-Day Listing',
    status: 'confirmed'
  },
  '3-Day Listing': {
    US: '3-Day Listing',
    UK: '3-Day Listing',
    DE: '3-Tages-Angebot',
    FR: 'Annonce 3 jours',
    IT: 'Inserzione 3 giorni',
    CA: '3-Day Listing',
    AU: '3-Day Listing',
    status: 'confirmed'
  },
  '5-Day Listing': {
    US: '5-Day Listing',
    UK: '5-Day Listing',
    DE: '5-Tages-Angebot',
    FR: 'Annonce 5 jours',
    IT: 'Inserzione 5 giorni',
    CA: '5-Day Listing',
    AU: '5-Day Listing',
    status: 'confirmed'
  },
  '7-Day Listing': {
    US: '7-Day Listing',
    UK: '7-Day Listing',
    DE: '7-Tages-Angebot',
    FR: 'Annonce 7 jours',
    IT: 'Inserzione 7 giorni',
    CA: '7-Day Listing',
    AU: '7-Day Listing',
    status: 'confirmed'
  },
  '10-Day Listing': {
    US: '10-Day Listing',
    UK: '10-Day Listing',
    DE: '10-Tages-Angebot',
    FR: 'Annonce 10 jours',
    IT: 'Inserzione 10 giorni',
    CA: '10-Day Listing',
    AU: '10-Day Listing',
    status: 'confirmed'
  },

  // TEAM & MULTI-USER ACCESS
  'Team Access': {
    US: 'Team Access',
    UK: 'Team Access',
    DE: 'Teamzugriff',
    FR: 'Accès équipe',
    IT: 'Accesso team',
    CA: 'Team Access',
    AU: 'Team Access',
    status: 'confirmed'
  },
  'Multi-User Account Access': {
    US: 'Multi-User Account Access',
    UK: 'Multi-User Account Access',
    DE: 'Mehrbenutzerzugriff',
    FR: 'Accès multi-utilisateurs',
    IT: 'Accesso multi-utente',
    CA: 'Multi-User Account Access',
    AU: 'Multi-User Account Access',
    status: 'confirmed'
  },
  'Account Permissions': {
    US: 'Account Permissions',
    UK: 'Account Permissions',
    DE: 'Kontoberechtigungen',
    FR: 'Autorisations du compte',
    IT: 'Autorizzazioni account',
    CA: 'Account Permissions',
    AU: 'Account Permissions',
    status: 'confirmed'
  },

  // SELLER FEES
  'Final Value Fee': {
    US: 'Final Value Fee',
    UK: 'Final Value Fee',
    DE: 'Verkaufsprovision',
    FR: 'Frais de vente finale',
    IT: 'Commissione sul valore finale',
    CA: 'Final Value Fee',
    AU: 'Final Value Fee',
    status: 'confirmed'
  },
  'Insertion Fee': {
    US: 'Insertion Fee',
    UK: 'Insertion Fee',
    DE: 'Angebotsgebühr',
    FR: 'Frais d\'insertion',
    IT: 'Tariffa di inserzione',
    CA: 'Insertion Fee',
    AU: 'Insertion Fee',
    status: 'confirmed'
  },
  'Promoted Listings Fee': {
    US: 'Promoted Listings Fee',
    UK: 'Promoted Listings Fee',
    DE: 'Promoted Listings-Gebühr',
    FR: 'Frais d\'annonces sponsorisées',
    IT: 'Tariffa inserzioni sponsorizzate',
    CA: 'Promoted Listings Fee',
    AU: 'Promoted Listings Fee',
    status: 'confirmed'
  },
  'Per Order Fee': {
    US: 'Per Order Fee',
    UK: 'Per Order Fee',
    DE: 'Gebühr pro Bestellung',
    FR: 'Frais par commande',
    IT: 'Tariffa per ordine',
    CA: 'Per Order Fee',
    AU: 'Per Order Fee',
    status: 'confirmed'
  },
  'Free Listings': {
    US: 'Free Listings',
    UK: 'Free Listings',
    DE: 'Kostenlose Angebote',
    FR: 'Annonces gratuites',
    IT: 'Inserzioni gratuite',
    CA: 'Free Listings',
    AU: 'Free Listings',
    status: 'confirmed'
  },

  // MESSAGING & COMMUNICATION
  'Messages': {
    US: 'Messages',
    UK: 'Messages',
    DE: 'Nachrichten',
    FR: 'Messages',
    IT: 'Messaggi',
    CA: 'Messages',
    AU: 'Messages',
    status: 'confirmed'
  },
  'Contact Seller': {
    US: 'Contact Seller',
    UK: 'Contact Seller',
    DE: 'Verkäufer kontaktieren',
    FR: 'Contacter le vendeur',
    IT: 'Contatta il venditore',
    CA: 'Contact Seller',
    AU: 'Contact Seller',
    status: 'confirmed'
  },
  'Contact Buyer': {
    US: 'Contact Buyer',
    UK: 'Contact Buyer',
    DE: 'Käufer kontaktieren',
    FR: 'Contacter l\'acheteur',
    IT: 'Contatta l\'acquirente',
    CA: 'Contact Buyer',
    AU: 'Contact Buyer',
    status: 'confirmed'
  },
  'Ask a Question': {
    US: 'Ask a Question',
    UK: 'Ask a Question',
    DE: 'Frage stellen',
    FR: 'Poser une question',
    IT: 'Fai una domanda',
    CA: 'Ask a Question',
    AU: 'Ask a Question',
    status: 'confirmed'
  },

  // BUYER MANAGEMENT
  'Blocked Buyers List': {
    US: 'Blocked Buyers List',
    UK: 'Blocked Buyers List',
    DE: 'Liste blockierter Käufer',
    FR: 'Liste d\'acheteurs bloqués',
    IT: 'Elenco acquirenti bloccati',
    CA: 'Blocked Buyers List',
    AU: 'Blocked Buyers List',
    status: 'confirmed'
  },
  'Buyer Requirements': {
    US: 'Buyer Requirements',
    UK: 'Buyer Requirements',
    DE: 'Käuferanforderungen',
    FR: 'Exigences pour les acheteurs',
    IT: 'Requisiti acquirente',
    CA: 'Buyer Requirements',
    AU: 'Buyer Requirements',
    status: 'confirmed'
  },
  'Unpaid Item': {
    US: 'Unpaid Item',
    UK: 'Unpaid Item',
    DE: 'Unbezahlter Artikel',
    FR: 'Objet impayé',
    IT: 'Oggetto non pagato',
    CA: 'Unpaid Item',
    AU: 'Unpaid Item',
    status: 'confirmed'
  },
  'Unpaid Item Strike': {
    US: 'Unpaid Item Strike',
    UK: 'Unpaid Item Strike',
    DE: 'Verwarnung wegen unbezahltem Artikel',
    FR: 'Avertissement objet impayé',
    IT: 'Avviso oggetto non pagato',
    CA: 'Unpaid Item Strike',
    AU: 'Unpaid Item Strike',
    status: 'confirmed'
  },
  'Bidder Management': {
    US: 'Bidder Management',
    UK: 'Bidder Management',
    DE: 'Bieterverwaltung',
    FR: 'Gestion des enchérisseurs',
    IT: 'Gestione offerenti',
    CA: 'Bidder Management',
    AU: 'Bidder Management',
    status: 'confirmed'
  },

  // LISTING UPGRADES & VISIBILITY
  'Bold Title': {
    US: 'Bold Title',
    UK: 'Bold Title',
    DE: 'Fetter Titel',
    FR: 'Titre en gras',
    IT: 'Titolo in grassetto',
    CA: 'Bold Title',
    AU: 'Bold Title',
    status: 'confirmed'
  },
  'Gallery Plus': {
    US: 'Gallery Plus',
    UK: 'Gallery Plus',
    DE: 'Gallery Plus',
    FR: 'Gallery Plus',
    IT: 'Gallery Plus',
    CA: 'Gallery Plus',
    AU: 'Gallery Plus',
    status: 'global'
  },
  'Subtitle': {
    US: 'Subtitle',
    UK: 'Subtitle',
    DE: 'Untertitel',
    FR: 'Sous-titre',
    IT: 'Sottotitolo',
    CA: 'Subtitle',
    AU: 'Subtitle',
    status: 'confirmed'
  },
  'Listing Designer': {
    US: 'Listing Designer',
    UK: 'Listing Designer',
    DE: 'Angebotsdesigner',
    FR: 'Concepteur d\'annonces',
    IT: 'Designer inserzioni',
    CA: 'Listing Designer',
    AU: 'Listing Designer',
    status: 'confirmed'
  },

  // PRODUCT IDENTIFIERS
  'UPC': {
    US: 'UPC',
    UK: 'UPC',
    DE: 'UPC',
    FR: 'UPC',
    IT: 'UPC',
    CA: 'UPC',
    AU: 'UPC',
    status: 'global'
  },
  'EAN': {
    US: 'EAN',
    UK: 'EAN',
    DE: 'EAN',
    FR: 'EAN',
    IT: 'EAN',
    CA: 'EAN',
    AU: 'EAN',
    status: 'global'
  },
  'ISBN': {
    US: 'ISBN',
    UK: 'ISBN',
    DE: 'ISBN',
    FR: 'ISBN',
    IT: 'ISBN',
    CA: 'ISBN',
    AU: 'ISBN',
    status: 'global'
  },
  'GTIN': {
    US: 'GTIN',
    UK: 'GTIN',
    DE: 'GTIN',
    FR: 'GTIN',
    IT: 'GTIN',
    CA: 'GTIN',
    AU: 'GTIN',
    status: 'global'
  },
  'MPN': {
    US: 'MPN',
    UK: 'MPN',
    DE: 'MPN',
    FR: 'MPN',
    IT: 'MPN',
    CA: 'MPN',
    AU: 'MPN',
    status: 'global'
  },
  'Item Specifics': {
    US: 'Item Specifics',
    UK: 'Item Specifics',
    DE: 'Artikelmerkmale',
    FR: 'Caractéristiques de l\'objet',
    IT: 'Caratteristiche dell\'oggetto',
    CA: 'Item Specifics',
    AU: 'Item Specifics',
    status: 'confirmed'
  },

  // CATEGORIES & BROWSING
  'Browse Categories': {
    US: 'Browse Categories',
    UK: 'Browse Categories',
    DE: 'Kategorien durchsuchen',
    FR: 'Parcourir les catégories',
    IT: 'Sfoglia categorie',
    CA: 'Browse Categories',
    AU: 'Browse Categories',
    status: 'confirmed'
  },
  'Store Categories': {
    US: 'Store Categories',
    UK: 'Store Categories',
    DE: 'Shop-Kategorien',
    FR: 'Catégories de boutique',
    IT: 'Categorie negozio',
    CA: 'Store Categories',
    AU: 'Store Categories',
    status: 'confirmed'
  },
  'Featured Categories': {
    US: 'Featured Categories',
    UK: 'Featured Categories',
    DE: 'Hervorgehobene Kategorien',
    FR: 'Catégories en vedette',
    IT: 'Categorie in primo piano',
    CA: 'Featured Categories',
    AU: 'Featured Categories',
    status: 'confirmed'
  },
  'Subcategories': {
    US: 'Subcategories',
    UK: 'Subcategories',
    DE: 'Unterkategorien',
    FR: 'Sous-catégories',
    IT: 'Sottocategorie',
    CA: 'Subcategories',
    AU: 'Subcategories',
    status: 'confirmed'
  },

  // SELLER PROTECTION & INSURANCE
  'ShipCover': {
    US: 'ShipCover',
    UK: 'ShipCover',
    DE: 'ShipCover',
    FR: 'ShipCover',
    IT: 'ShipCover',
    CA: 'ShipCover',
    AU: 'ShipCover',
    status: 'global'
  },
  'Shipping Insurance': {
    US: 'Shipping Insurance',
    UK: 'Shipping Insurance',
    DE: 'Versandversicherung',
    FR: 'Assurance expédition',
    IT: 'Assicurazione spedizione',
    CA: 'Shipping Insurance',
    AU: 'Shipping Insurance',
    status: 'confirmed'
  },
  'Parcel Insurance': {
    US: 'Parcel Insurance',
    UK: 'Parcel Insurance',
    DE: 'Paketversicherung',
    FR: 'Assurance colis',
    IT: 'Assicurazione pacco',
    CA: 'Parcel Insurance',
    AU: 'Parcel Insurance',
    status: 'confirmed'
  },

  // PRICING & PROMOTIONS
  'Volume Pricing': {
    US: 'Volume Pricing',
    UK: 'Volume Pricing',
    DE: 'Mengenrabatt',
    FR: 'Tarification en volume',
    IT: 'Prezzi di volume',
    CA: 'Volume Pricing',
    AU: 'Volume Pricing',
    status: 'confirmed'
  },
  'Quantity Discount': {
    US: 'Quantity Discount',
    UK: 'Quantity Discount',
    DE: 'Mengenrabatt',
    FR: 'Remise sur quantité',
    IT: 'Sconto quantità',
    CA: 'Quantity Discount',
    AU: 'Quantity Discount',
    status: 'confirmed'
  },
  'Sale Event': {
    US: 'Sale Event',
    UK: 'Sale Event',
    DE: 'Verkaufsaktion',
    FR: 'Événement de vente',
    IT: 'Evento promozionale',
    CA: 'Sale Event',
    AU: 'Sale Event',
    status: 'confirmed'
  },
  'Order Discount': {
    US: 'Order Discount',
    UK: 'Order Discount',
    DE: 'Bestellrabatt',
    FR: 'Remise sur commande',
    IT: 'Sconto ordine',
    CA: 'Order Discount',
    AU: 'Order Discount',
    status: 'confirmed'
  },
  'Shipping Discount': {
    US: 'Shipping Discount',
    UK: 'Postage Discount',
    DE: 'Versandrabatt',
    FR: 'Remise sur expédition',
    IT: 'Sconto spedizione',
    CA: 'Shipping Discount',
    AU: 'Shipping Discount',
    status: 'confirmed'
  },

  // PHOTOS & MEDIA
  'Product Video': {
    US: 'Product Video',
    UK: 'Product Video',
    DE: 'Produktvideo',
    FR: 'Vidéo produit',
    IT: 'Video prodotto',
    CA: 'Product Video',
    AU: 'Product Video',
    status: 'confirmed'
  },
  '360 Spin': {
    US: '360 Spin',
    UK: '360 Spin',
    DE: '360-Grad-Ansicht',
    FR: 'Vue 360',
    IT: 'Vista a 360',
    CA: '360 Spin',
    AU: '360 Spin',
    status: 'confirmed'
  },
  'Gallery': {
    US: 'Gallery',
    UK: 'Gallery',
    DE: 'Galerie',
    FR: 'Galerie',
    IT: 'Galleria',
    CA: 'Gallery',
    AU: 'Gallery',
    status: 'confirmed'
  },
  'Photo Requirements': {
    US: 'Photo Requirements',
    UK: 'Photo Requirements',
    DE: 'Fotoanforderungen',
    FR: 'Exigences photos',
    IT: 'Requisiti foto',
    CA: 'Photo Requirements',
    AU: 'Photo Requirements',
    status: 'confirmed'
  },

  // SHIPPING SUPPLIES
  'eBay Branded Supplies': {
    US: 'eBay Branded Supplies',
    UK: 'eBay Branded Supplies',
    DE: 'eBay Markenverpackung',
    FR: 'Fournitures de marque eBay',
    IT: 'Forniture con marchio eBay',
    CA: 'eBay Branded Supplies',
    AU: 'eBay Branded Supplies',
    status: 'confirmed'
  },
  'Shipping Supplies Store': {
    US: 'Shipping Supplies Store',
    UK: 'Shipping Supplies Store',
    DE: 'Versandmaterialien-Shop',
    FR: 'Boutique fournitures expédition',
    IT: 'Negozio materiali spedizione',
    CA: 'Shipping Supplies Store',
    AU: 'Shipping Supplies Store',
    status: 'confirmed'
  },
  'Poly Mailer': {
    US: 'Poly Mailer',
    UK: 'Poly Mailer',
    DE: 'Versandtasche',
    FR: 'Enveloppe poly',
    IT: 'Busta spedizione',
    CA: 'Poly Mailer',
    AU: 'Poly Mailer',
    status: 'confirmed'
  },
  'Bubble Mailer': {
    US: 'Bubble Mailer',
    UK: 'Bubble Mailer',
    DE: 'Luftpolsterversandtasche',
    FR: 'Enveloppe bulle',
    IT: 'Busta imbottita',
    CA: 'Bubble Mailer',
    AU: 'Bubble Mailer',
    status: 'confirmed'
  },
  'Packing Tape': {
    US: 'Packing Tape',
    UK: 'Packing Tape',
    DE: 'Packband',
    FR: 'Ruban d\'emballage',
    IT: 'Nastro da imballaggio',
    CA: 'Packing Tape',
    AU: 'Packing Tape',
    status: 'confirmed'
  },

  // COUPONS & CODES
  'Coded Coupon': {
    US: 'Coded Coupon',
    UK: 'Coded Coupon',
    DE: 'Code-Coupon',
    FR: 'Coupon avec code',
    IT: 'Coupon con codice',
    CA: 'Coded Coupon',
    AU: 'Coded Coupon',
    status: 'confirmed'
  },
  'Public Coupon': {
    US: 'Public Coupon',
    UK: 'Public Coupon',
    DE: 'Öffentlicher Coupon',
    FR: 'Coupon public',
    IT: 'Coupon pubblico',
    CA: 'Public Coupon',
    AU: 'Public Coupon',
    status: 'confirmed'
  },
  'Private Coupon': {
    US: 'Private Coupon',
    UK: 'Private Coupon',
    DE: 'Privater Coupon',
    FR: 'Coupon privé',
    IT: 'Coupon privato',
    CA: 'Private Coupon',
    AU: 'Private Coupon',
    status: 'confirmed'
  },
  'Promo Code': {
    US: 'Promo Code',
    UK: 'Promo Code',
    DE: 'Promo-Code',
    FR: 'Code promo',
    IT: 'Codice promozionale',
    CA: 'Promo Code',
    AU: 'Promo Code',
    status: 'confirmed'
  },

  // VACATION & TIME AWAY
  'Time Away': {
    US: 'Time Away',
    UK: 'Time Away',
    DE: 'Abwesenheit',
    FR: 'Absence',
    IT: 'Assenza',
    CA: 'Time Away',
    AU: 'Time Away',
    status: 'confirmed'
  },
  'Vacation Mode': {
    US: 'Vacation Mode',
    UK: 'Vacation Mode',
    DE: 'Urlaubsmodus',
    FR: 'Mode vacances',
    IT: 'Modalità vacanza',
    CA: 'Vacation Mode',
    AU: 'Vacation Mode',
    status: 'confirmed'
  },
  'Pause Sales': {
    US: 'Pause Sales',
    UK: 'Pause Sales',
    DE: 'Verkauf pausieren',
    FR: 'Mettre en pause les ventes',
    IT: 'Pausa vendite',
    CA: 'Pause Sales',
    AU: 'Pause Sales',
    status: 'confirmed'
  },
  'Out of Office': {
    US: 'Out of Office',
    UK: 'Out of Office',
    DE: 'Abwesend',
    FR: 'Absence du bureau',
    IT: 'Fuori ufficio',
    CA: 'Out of Office',
    AU: 'Out of Office',
    status: 'confirmed'
  },

  // LISTING PRIVACY
  'Private Listing': {
    US: 'Private Listing',
    UK: 'Private Listing',
    DE: 'Private Angebot',
    FR: 'Annonce privée',
    IT: 'Inserzione privata',
    CA: 'Private Listing',
    AU: 'Private Listing',
    status: 'confirmed'
  },
  'Hidden Bidders': {
    US: 'Hidden Bidders',
    UK: 'Hidden Bidders',
    DE: 'Verdeckte Bieter',
    FR: 'Enchérisseurs masqués',
    IT: 'Offerenti nascosti',
    CA: 'Hidden Bidders',
    AU: 'Hidden Bidders',
    status: 'confirmed'
  },
  'Bidder Identity Protection': {
    US: 'Bidder Identity Protection',
    UK: 'Bidder Identity Protection',
    DE: 'Bieter-Identitätsschutz',
    FR: 'Protection identité enchérisseurs',
    IT: 'Protezione identità offerenti',
    CA: 'Bidder Identity Protection',
    AU: 'Bidder Identity Protection',
    status: 'confirmed'
  },

  // BUYER BADGES & VERIFICATION
  'Verified Purchase': {
    US: 'Verified Purchase',
    UK: 'Verified Purchase',
    DE: 'Verifizierter Kauf',
    FR: 'Achat vérifié',
    IT: 'Acquisto verificato',
    CA: 'Verified Purchase',
    AU: 'Verified Purchase',
    status: 'confirmed'
  },
  'Feedback Score': {
    US: 'Feedback Score',
    UK: 'Feedback Score',
    DE: 'Bewertungspunktzahl',
    FR: 'Note d\'évaluation',
    IT: 'Punteggio feedback',
    CA: 'Feedback Score',
    AU: 'Feedback Score',
    status: 'confirmed'
  },
  'Star Rating': {
    US: 'Star Rating',
    UK: 'Star Rating',
    DE: 'Sternebewertung',
    FR: 'Note en étoiles',
    IT: 'Valutazione a stelle',
    CA: 'Star Rating',
    AU: 'Star Rating',
    status: 'confirmed'
  },
  'Member Since': {
    US: 'Member Since',
    UK: 'Member Since',
    DE: 'Mitglied seit',
    FR: 'Membre depuis',
    IT: 'Membro dal',
    CA: 'Member Since',
    AU: 'Member Since',
    status: 'confirmed'
  },
  'Feedback Profile': {
    US: 'Feedback Profile',
    UK: 'Feedback Profile',
    DE: 'Bewertungsprofil',
    FR: 'Profil d\'évaluations',
    IT: 'Profilo feedback',
    CA: 'Feedback Profile',
    AU: 'Feedback Profile',
    status: 'confirmed'
  },

  // SEARCH FILTERS & SORTING
  'Advanced Search': {
    US: 'Advanced Search',
    UK: 'Advanced Search',
    DE: 'Erweiterte Suche',
    FR: 'Recherche avancée',
    IT: 'Ricerca avanzata',
    CA: 'Advanced Search',
    AU: 'Advanced Search',
    status: 'confirmed'
  },
  'Price Range': {
    US: 'Price Range',
    UK: 'Price Range',
    DE: 'Preisspanne',
    FR: 'Fourchette de prix',
    IT: 'Fascia di prezzo',
    CA: 'Price Range',
    AU: 'Price Range',
    status: 'confirmed'
  },
  'Buy It Now Only': {
    US: 'Buy It Now Only',
    UK: 'Buy It Now Only',
    DE: 'Nur Sofort-Kaufen',
    FR: 'Achat immédiat uniquement',
    IT: 'Solo Compralo Subito',
    CA: 'Buy It Now Only',
    AU: 'Buy It Now Only',
    status: 'confirmed'
  },
  'Auction Only': {
    US: 'Auction Only',
    UK: 'Auction Only',
    DE: 'Nur Auktionen',
    FR: 'Enchères uniquement',
    IT: 'Solo aste',
    CA: 'Auction Only',
    AU: 'Auction Only',
    status: 'confirmed'
  },
  'Sort by Price': {
    US: 'Sort by Price',
    UK: 'Sort by Price',
    DE: 'Nach Preis sortieren',
    FR: 'Trier par prix',
    IT: 'Ordina per prezzo',
    CA: 'Sort by Price',
    AU: 'Sort by Price',
    status: 'confirmed'
  },
  'Sort by Ending Soonest': {
    US: 'Sort by Ending Soonest',
    UK: 'Sort by Ending Soonest',
    DE: 'Nach Ablaufzeit sortieren',
    FR: 'Trier par fin imminente',
    IT: 'Ordina per scadenza',
    CA: 'Sort by Ending Soonest',
    AU: 'Sort by Ending Soonest',
    status: 'confirmed'
  },
  'Best Match': {
    US: 'Best Match',
    UK: 'Best Match',
    DE: 'Beste Ergebnisse',
    FR: 'Meilleure correspondance',
    IT: 'Migliore corrispondenza',
    CA: 'Best Match',
    AU: 'Best Match',
    status: 'confirmed'
  },
  'Accepts Offers Filter': {
    US: 'Accepts Offers',
    UK: 'Accepts Offers',
    DE: 'Akzeptiert Preisvorschläge',
    FR: 'Accepte les offres',
    IT: 'Accetta offerte',
    CA: 'Accepts Offers',
    AU: 'Accepts Offers',
    status: 'confirmed'
  },
  'Free Shipping Filter': {
    US: 'Free Shipping',
    UK: 'Free Postage',
    DE: 'Kostenloser Versand',
    FR: 'Livraison gratuite',
    IT: 'Spedizione gratuita',
    CA: 'Free Shipping',
    AU: 'Free Shipping',
    status: 'confirmed'
  },
  'Accepts Returns Filter': {
    US: 'Accepts Returns',
    UK: 'Accepts Returns',
    DE: 'Akzeptiert Rückgaben',
    FR: 'Accepte les retours',
    IT: 'Accetta resi',
    CA: 'Accepts Returns',
    AU: 'Accepts Returns',
    status: 'confirmed'
  },

  // LISTING SCHEDULING
  'Scheduled Listing': {
    US: 'Scheduled Listing',
    UK: 'Scheduled Listing',
    DE: 'Geplantes Angebot',
    FR: 'Annonce programmée',
    IT: 'Inserzione programmata',
    CA: 'Scheduled Listing',
    AU: 'Scheduled Listing',
    status: 'confirmed'
  },
  'Start Time': {
    US: 'Start Time',
    UK: 'Start Time',
    DE: 'Startzeit',
    FR: 'Heure de début',
    IT: 'Ora di inizio',
    CA: 'Start Time',
    AU: 'Start Time',
    status: 'confirmed'
  },
  'Future Scheduling': {
    US: 'Future Scheduling',
    UK: 'Future Scheduling',
    DE: 'Zukünftige Planung',
    FR: 'Programmation future',
    IT: 'Programmazione futura',
    CA: 'Future Scheduling',
    AU: 'Future Scheduling',
    status: 'confirmed'
  },

  // ITEM LOCATION
  'Item Location': {
    US: 'Item Location',
    UK: 'Item Location',
    DE: 'Artikelstandort',
    FR: 'Localisation de l\'objet',
    IT: 'Posizione dell\'oggetto',
    CA: 'Item Location',
    AU: 'Item Location',
    status: 'confirmed'
  },
  'Zip Code': {
    US: 'Zip Code',
    UK: 'Postcode',
    DE: 'Postleitzahl',
    FR: 'Code postal',
    IT: 'Codice postale',
    CA: 'Postal Code',
    AU: 'Postcode',
    status: 'confirmed'
  },
  'Ship From Location': {
    US: 'Ship From Location',
    UK: 'Ship From Location',
    DE: 'Versandstandort',
    FR: 'Lieu d\'expédition',
    IT: 'Luogo di spedizione',
    CA: 'Ship From Location',
    AU: 'Ship From Location',
    status: 'confirmed'
  },
  'Estimated Delivery Date': {
    US: 'Estimated Delivery Date',
    UK: 'Estimated Delivery Date',
    DE: 'Voraussichtliches Lieferdatum',
    FR: 'Date de livraison estimée',
    IT: 'Data di consegna stimata',
    CA: 'Estimated Delivery Date',
    AU: 'Estimated Delivery Date',
    status: 'confirmed'
  },

  // LISTING DESCRIPTION & TEMPLATES
  'Description Template': {
    US: 'Description Template',
    UK: 'Description Template',
    DE: 'Beschreibungsvorlage',
    FR: 'Modèle de description',
    IT: 'Modello descrizione',
    CA: 'Description Template',
    AU: 'Description Template',
    status: 'confirmed'
  },
  'HTML Editor': {
    US: 'HTML Editor',
    UK: 'HTML Editor',
    DE: 'HTML-Editor',
    FR: 'Éditeur HTML',
    IT: 'Editor HTML',
    CA: 'HTML Editor',
    AU: 'HTML Editor',
    status: 'confirmed'
  },
  'Listing Description': {
    US: 'Listing Description',
    UK: 'Listing Description',
    DE: 'Angebotsbeschreibung',
    FR: 'Description de l\'annonce',
    IT: 'Descrizione inserzione',
    CA: 'Listing Description',
    AU: 'Listing Description',
    status: 'confirmed'
  },
  'Visual Editor': {
    US: 'Visual Editor',
    UK: 'Visual Editor',
    DE: 'Visueller Editor',
    FR: 'Éditeur visuel',
    IT: 'Editor visuale',
    CA: 'Visual Editor',
    AU: 'Visual Editor',
    status: 'confirmed'
  },

  // VARIATIONS & OPTIONS
  'Variations': {
    US: 'Variations',
    UK: 'Variations',
    DE: 'Variationen',
    FR: 'Variantes',
    IT: 'Varianti',
    CA: 'Variations',
    AU: 'Variations',
    status: 'confirmed'
  },
  'Multi-Variation Listing': {
    US: 'Multi-Variation Listing',
    UK: 'Multi-Variation Listing',
    DE: 'Mehrvarianten-Angebot',
    FR: 'Annonce multi-variantes',
    IT: 'Inserzione multi-variante',
    CA: 'Multi-Variation Listing',
    AU: 'Multi-Variation Listing',
    status: 'confirmed'
  },
  'Size Option': {
    US: 'Size',
    UK: 'Size',
    DE: 'Größe',
    FR: 'Taille',
    IT: 'Taglia',
    CA: 'Size',
    AU: 'Size',
    status: 'confirmed'
  },
  'Color Option': {
    US: 'Color',
    UK: 'Colour',
    DE: 'Farbe',
    FR: 'Couleur',
    IT: 'Colore',
    CA: 'Color',
    AU: 'Colour',
    status: 'confirmed'
  },
  'Custom Variation': {
    US: 'Custom Variation',
    UK: 'Custom Variation',
    DE: 'Benutzerdefinierte Variation',
    FR: 'Variante personnalisée',
    IT: 'Variante personalizzata',
    CA: 'Custom Variation',
    AU: 'Custom Variation',
    status: 'confirmed'
  },

  // INVENTORY MANAGEMENT
  'Quantity Available': {
    US: 'Quantity Available',
    UK: 'Quantity Available',
    DE: 'Verfügbare Menge',
    FR: 'Quantité disponible',
    IT: 'Quantità disponibile',
    CA: 'Quantity Available',
    AU: 'Quantity Available',
    status: 'confirmed'
  },
  'Stock Level': {
    US: 'Stock Level',
    UK: 'Stock Level',
    DE: 'Lagerbestand',
    FR: 'Niveau de stock',
    IT: 'Livello scorte',
    CA: 'Stock Level',
    AU: 'Stock Level',
    status: 'confirmed'
  },
  'Out of Stock': {
    US: 'Out of Stock',
    UK: 'Out of Stock',
    DE: 'Nicht vorrätig',
    FR: 'En rupture de stock',
    IT: 'Esaurito',
    CA: 'Out of Stock',
    AU: 'Out of Stock',
    status: 'confirmed'
  },
  'Inventory Sync': {
    US: 'Inventory Sync',
    UK: 'Inventory Sync',
    DE: 'Bestandssynchronisierung',
    FR: 'Synchronisation des stocks',
    IT: 'Sincronizzazione inventario',
    CA: 'Inventory Sync',
    AU: 'Inventory Sync',
    status: 'confirmed'
  },
  'Multi-Channel Inventory': {
    US: 'Multi-Channel Inventory',
    UK: 'Multi-Channel Inventory',
    DE: 'Multichannel-Bestand',
    FR: 'Inventaire multicanal',
    IT: 'Inventario multicanale',
    CA: 'Multi-Channel Inventory',
    AU: 'Multi-Channel Inventory',
    status: 'confirmed'
  },

  // SHIPPING CALCULATIONS
  'Shipping Calculator': {
    US: 'Shipping Calculator',
    UK: 'Postage Calculator',
    DE: 'Versandkostenrechner',
    FR: 'Calculateur d\'expédition',
    IT: 'Calcolatore spedizione',
    CA: 'Shipping Calculator',
    AU: 'Shipping Calculator',
    status: 'confirmed'
  },
  'Package Dimensions': {
    US: 'Package Dimensions',
    UK: 'Package Dimensions',
    DE: 'Paketmaße',
    FR: 'Dimensions du colis',
    IT: 'Dimensioni del pacco',
    CA: 'Package Dimensions',
    AU: 'Package Dimensions',
    status: 'confirmed'
  },
  'Package Weight': {
    US: 'Package Weight',
    UK: 'Package Weight',
    DE: 'Paketgewicht',
    FR: 'Poids du colis',
    IT: 'Peso del pacco',
    CA: 'Package Weight',
    AU: 'Package Weight',
    status: 'confirmed'
  },
  'Dimensional Weight': {
    US: 'Dimensional Weight',
    UK: 'Dimensional Weight',
    DE: 'Volumetrisches Gewicht',
    FR: 'Poids volumétrique',
    IT: 'Peso volumetrico',
    CA: 'Dimensional Weight',
    AU: 'Dimensional Weight',
    status: 'confirmed'
  },
  'Calculated Shipping': {
    US: 'Calculated Shipping',
    UK: 'Calculated Postage',
    DE: 'Berechneter Versand',
    FR: 'Frais d\'expédition calculés',
    IT: 'Spedizione calcolata',
    CA: 'Calculated Shipping',
    AU: 'Calculated Shipping',
    status: 'confirmed'
  },

  // DUPLICATE & CROSS-PROMOTION
  'Sell Similar': {
    US: 'Sell Similar',
    UK: 'Sell Similar',
    DE: 'Ähnlich verkaufen',
    FR: 'Vendre un objet similaire',
    IT: 'Vendi oggetto simile',
    CA: 'Sell Similar',
    AU: 'Sell Similar',
    status: 'confirmed'
  },
  'Duplicate Listing': {
    US: 'Duplicate Listing',
    UK: 'Duplicate Listing',
    DE: 'Doppeltes Angebot',
    FR: 'Annonce en double',
    IT: 'Inserzione duplicata',
    CA: 'Duplicate Listing',
    AU: 'Duplicate Listing',
    status: 'confirmed'
  },
  'Cross-Promotion': {
    US: 'Cross-Promotion',
    UK: 'Cross-Promotion',
    DE: 'Cross-Promotion',
    FR: 'Promotion croisée',
    IT: 'Promozione incrociata',
    CA: 'Cross-Promotion',
    AU: 'Cross-Promotion',
    status: 'confirmed'
  },
  'Related Items': {
    US: 'Related Items',
    UK: 'Related Items',
    DE: 'Ähnliche Artikel',
    FR: 'Objets similaires',
    IT: 'Oggetti correlati',
    CA: 'Related Items',
    AU: 'Related Items',
    status: 'confirmed'
  },

  // HANDLING TIME
  'Handling Time': {
    US: 'Handling Time',
    UK: 'Handling Time',
    DE: 'Bearbeitungszeit',
    FR: 'Délai de traitement',
    IT: 'Tempo di gestione',
    CA: 'Handling Time',
    AU: 'Handling Time',
    status: 'confirmed'
  },
  'Same-Day Handling': {
    US: 'Same-Day Handling',
    UK: 'Same-Day Handling',
    DE: 'Versand am selben Tag',
    FR: 'Traitement le jour même',
    IT: 'Gestione in giornata',
    CA: 'Same-Day Handling',
    AU: 'Same-Day Handling',
    status: 'confirmed'
  },
  '1 Business Day': {
    US: '1 Business Day',
    UK: '1 Business Day',
    DE: '1 Werktag',
    FR: '1 jour ouvrable',
    IT: '1 giorno lavorativo',
    CA: '1 Business Day',
    AU: '1 Business Day',
    status: 'confirmed'
  },
  'Business Days': {
    US: 'Business Days',
    UK: 'Business Days',
    DE: 'Werktage',
    FR: 'Jours ouvrables',
    IT: 'Giorni lavorativi',
    CA: 'Business Days',
    AU: 'Business Days',
    status: 'confirmed'
  },

  // BUSINESS POLICIES
  'Business Policies': {
    US: 'Business Policies',
    UK: 'Business Policies',
    DE: 'Geschäftsrichtlinien',
    FR: 'Politiques commerciales',
    IT: 'Politiche aziendali',
    CA: 'Business Policies',
    AU: 'Business Policies',
    status: 'confirmed'
  },
  'Payment Policy': {
    US: 'Payment Policy',
    UK: 'Payment Policy',
    DE: 'Zahlungsrichtlinie',
    FR: 'Politique de paiement',
    IT: 'Politica di pagamento',
    CA: 'Payment Policy',
    AU: 'Payment Policy',
    status: 'confirmed'
  },
  'Return Policy': {
    US: 'Return Policy',
    UK: 'Return Policy',
    DE: 'Rückgaberichtlinie',
    FR: 'Politique de retour',
    IT: 'Politica di reso',
    CA: 'Return Policy',
    AU: 'Return Policy',
    status: 'confirmed'
  },
  'Shipping Policy': {
    US: 'Shipping Policy',
    UK: 'Postage Policy',
    DE: 'Versandrichtlinie',
    FR: 'Politique d\'expédition',
    IT: 'Politica di spedizione',
    CA: 'Shipping Policy',
    AU: 'Shipping Policy',
    status: 'confirmed'
  },
  'Policy Template': {
    US: 'Policy Template',
    UK: 'Policy Template',
    DE: 'Richtlinienvorlage',
    FR: 'Modèle de politique',
    IT: 'Modello di politica',
    CA: 'Policy Template',
    AU: 'Policy Template',
    status: 'confirmed'
  },

  // FEEDBACK MANAGEMENT
  'Feedback Revision': {
    US: 'Feedback Revision',
    UK: 'Feedback Revision',
    DE: 'Bewertungsänderung',
    FR: 'Révision d\'évaluation',
    IT: 'Revisione feedback',
    CA: 'Feedback Revision',
    AU: 'Feedback Revision',
    status: 'confirmed'
  },
  'Mutual Withdrawal': {
    US: 'Mutual Withdrawal',
    UK: 'Mutual Withdrawal',
    DE: 'Gegenseitiger Rückzug',
    FR: 'Retrait mutuel',
    IT: 'Ritiro reciproco',
    CA: 'Mutual Withdrawal',
    AU: 'Mutual Withdrawal',
    status: 'confirmed'
  },
  'Request Feedback Revision': {
    US: 'Request Feedback Revision',
    UK: 'Request Feedback Revision',
    DE: 'Bewertungsänderung anfragen',
    FR: 'Demander une révision',
    IT: 'Richiedi revisione feedback',
    CA: 'Request Feedback Revision',
    AU: 'Request Feedback Revision',
    status: 'confirmed'
  },
  'Positive Feedback': {
    US: 'Positive Feedback',
    UK: 'Positive Feedback',
    DE: 'Positive Bewertung',
    FR: 'Évaluation positive',
    IT: 'Feedback positivo',
    CA: 'Positive Feedback',
    AU: 'Positive Feedback',
    status: 'confirmed'
  },
  'Negative Feedback': {
    US: 'Negative Feedback',
    UK: 'Negative Feedback',
    DE: 'Negative Bewertung',
    FR: 'Évaluation négative',
    IT: 'Feedback negativo',
    CA: 'Negative Feedback',
    AU: 'Negative Feedback',
    status: 'confirmed'
  },
  'Neutral Feedback': {
    US: 'Neutral Feedback',
    UK: 'Neutral Feedback',
    DE: 'Neutrale Bewertung',
    FR: 'Évaluation neutre',
    IT: 'Feedback neutro',
    CA: 'Neutral Feedback',
    AU: 'Neutral Feedback',
    status: 'confirmed'
  },

  // LISTING PERFORMANCE METRICS
  'Impressions': {
    US: 'Impressions',
    UK: 'Impressions',
    DE: 'Impressionen',
    FR: 'Impressions',
    IT: 'Impressioni',
    CA: 'Impressions',
    AU: 'Impressions',
    status: 'confirmed'
  },
  'Page Views': {
    US: 'Page Views',
    UK: 'Page Views',
    DE: 'Seitenaufrufe',
    FR: 'Pages vues',
    IT: 'Visualizzazioni pagina',
    CA: 'Page Views',
    AU: 'Page Views',
    status: 'confirmed'
  },
  'Click-Through Rate': {
    US: 'Click-Through Rate',
    UK: 'Click-Through Rate',
    DE: 'Klickrate',
    FR: 'Taux de clics',
    IT: 'Tasso di clic',
    CA: 'Click-Through Rate',
    AU: 'Click-Through Rate',
    status: 'confirmed'
  },
  'Watchers': {
    US: 'Watchers',
    UK: 'Watchers',
    DE: 'Beobachter',
    FR: 'Observateurs',
    IT: 'Osservatori',
    CA: 'Watchers',
    AU: 'Watchers',
    status: 'confirmed'
  },
  'Watch Count': {
    US: 'Watch Count',
    UK: 'Watch Count',
    DE: 'Anzahl Beobachter',
    FR: 'Nombre d\'observateurs',
    IT: 'Conteggio osservatori',
    CA: 'Watch Count',
    AU: 'Watch Count',
    status: 'confirmed'
  },

  // LISTING MANAGEMENT ACTIONS
  'End Listing Early': {
    US: 'End Listing Early',
    UK: 'End Listing Early',
    DE: 'Angebot vorzeitig beenden',
    FR: 'Mettre fin à l\'annonce',
    IT: 'Termina inserzione in anticipo',
    CA: 'End Listing Early',
    AU: 'End Listing Early',
    status: 'confirmed'
  },
  'Cancel Bid': {
    US: 'Cancel Bid',
    UK: 'Cancel Bid',
    DE: 'Gebot stornieren',
    FR: 'Annuler l\'enchère',
    IT: 'Annulla offerta',
    CA: 'Cancel Bid',
    AU: 'Cancel Bid',
    status: 'confirmed'
  },
  'Retract Bid': {
    US: 'Retract Bid',
    UK: 'Retract Bid',
    DE: 'Gebot zurückziehen',
    FR: 'Retirer l\'enchère',
    IT: 'Ritira offerta',
    CA: 'Retract Bid',
    AU: 'Retract Bid',
    status: 'confirmed'
  },
  'Decline Offer': {
    US: 'Decline Offer',
    UK: 'Decline Offer',
    DE: 'Angebot ablehnen',
    FR: 'Refuser l\'offre',
    IT: 'Rifiuta offerta',
    CA: 'Decline Offer',
    AU: 'Decline Offer',
    status: 'confirmed'
  },
  'Accept Offer': {
    US: 'Accept Offer',
    UK: 'Accept Offer',
    DE: 'Angebot annehmen',
    FR: 'Accepter l\'offre',
    IT: 'Accetta offerta',
    CA: 'Accept Offer',
    AU: 'Accept Offer',
    status: 'confirmed'
  },
  'Counter Offer': {
    US: 'Counter Offer',
    UK: 'Counter Offer',
    DE: 'Gegenangebot',
    FR: 'Contre-offre',
    IT: 'Controfferta',
    CA: 'Counter Offer',
    AU: 'Counter Offer',
    status: 'confirmed'
  },

  // SECOND CHANCE & UNPAID ITEMS
  'Second Chance Offer': {
    US: 'Second Chance Offer',
    UK: 'Second Chance Offer',
    DE: 'Zweite-Chance-Angebot',
    FR: 'Offre de seconde chance',
    IT: 'Offerta seconda possibilità',
    CA: 'Second Chance Offer',
    AU: 'Second Chance Offer',
    status: 'confirmed'
  },
  'Unpaid Item Case': {
    US: 'Unpaid Item Case',
    UK: 'Unpaid Item Case',
    DE: 'Fall unbezahlter Artikel',
    FR: 'Cas d\'objet impayé',
    IT: 'Caso oggetto non pagato',
    CA: 'Unpaid Item Case',
    AU: 'Unpaid Item Case',
    status: 'confirmed'
  },
  'Cancel Order': {
    US: 'Cancel Order',
    UK: 'Cancel Order',
    DE: 'Bestellung stornieren',
    FR: 'Annuler la commande',
    IT: 'Annulla ordine',
    CA: 'Cancel Order',
    AU: 'Cancel Order',
    status: 'confirmed'
  },
  'Automatic Relist': {
    US: 'Automatic Relist',
    UK: 'Automatic Relist',
    DE: 'Automatische Wiedereinstellung',
    FR: 'Remise en vente automatique',
    IT: 'Rimessa vendita automatica',
    CA: 'Automatic Relist',
    AU: 'Automatic Relist',
    status: 'confirmed'
  },

  // PREMIUM PLACEMENT
  'Featured Plus': {
    US: 'Featured Plus',
    UK: 'Featured Plus',
    DE: 'Featured Plus',
    FR: 'Featured Plus',
    IT: 'Featured Plus',
    CA: 'Featured Plus',
    AU: 'Featured Plus',
    status: 'global'
  },
  'Premium Placement': {
    US: 'Premium Placement',
    UK: 'Premium Placement',
    DE: 'Premium-Platzierung',
    FR: 'Placement premium',
    IT: 'Posizionamento premium',
    CA: 'Premium Placement',
    AU: 'Premium Placement',
    status: 'confirmed'
  },
  'Priority Strategy': {
    US: 'Priority Strategy',
    UK: 'Priority Strategy',
    DE: 'Prioritätsstrategie',
    FR: 'Stratégie prioritaire',
    IT: 'Strategia prioritaria',
    CA: 'Priority Strategy',
    AU: 'Priority Strategy',
    status: 'confirmed'
  },
  'General Strategy': {
    US: 'General Strategy',
    UK: 'General Strategy',
    DE: 'Allgemeine Strategie',
    FR: 'Stratégie générale',
    IT: 'Strategia generale',
    CA: 'General Strategy',
    AU: 'General Strategy',
    status: 'confirmed'
  },

  // DRAFTS & TEMPLATES
  'Draft Listings': {
    US: 'Draft Listings',
    UK: 'Draft Listings',
    DE: 'Entwurfsangebote',
    FR: 'Annonces brouillon',
    IT: 'Inserzioni bozza',
    CA: 'Draft Listings',
    AU: 'Draft Listings',
    status: 'confirmed'
  },
  'Saved Drafts': {
    US: 'Saved Drafts',
    UK: 'Saved Drafts',
    DE: 'Gespeicherte Entwürfe',
    FR: 'Brouillons enregistrés',
    IT: 'Bozze salvate',
    CA: 'Saved Drafts',
    AU: 'Saved Drafts',
    status: 'confirmed'
  },
  'Listing Template': {
    US: 'Listing Template',
    UK: 'Listing Template',
    DE: 'Angebotsvorlage',
    FR: 'Modèle d\'annonce',
    IT: 'Modello inserzione',
    CA: 'Listing Template',
    AU: 'Listing Template',
    status: 'confirmed'
  },

  // SOLD ITEMS & ORDERS
  'Sold Items': {
    US: 'Sold Items',
    UK: 'Sold Items',
    DE: 'Verkaufte Artikel',
    FR: 'Objets vendus',
    IT: 'Oggetti venduti',
    CA: 'Sold Items',
    AU: 'Sold Items',
    status: 'confirmed'
  },
  'Completed Orders': {
    US: 'Completed Orders',
    UK: 'Completed Orders',
    DE: 'Abgeschlossene Bestellungen',
    FR: 'Commandes terminées',
    IT: 'Ordini completati',
    CA: 'Completed Orders',
    AU: 'Completed Orders',
    status: 'confirmed'
  },
  'Transaction History': {
    US: 'Transaction History',
    UK: 'Transaction History',
    DE: 'Transaktionsverlauf',
    FR: 'Historique des transactions',
    IT: 'Cronologia transazioni',
    CA: 'Transaction History',
    AU: 'Transaction History',
    status: 'confirmed'
  },
  'Purchase History': {
    US: 'Purchase History',
    UK: 'Purchase History',
    DE: 'Kaufverlauf',
    FR: 'Historique des achats',
    IT: 'Cronologia acquisti',
    CA: 'Purchase History',
    AU: 'Purchase History',
    status: 'confirmed'
  },
  'Order Number': {
    US: 'Order Number',
    UK: 'Order Number',
    DE: 'Bestellnummer',
    FR: 'Numéro de commande',
    IT: 'Numero ordine',
    CA: 'Order Number',
    AU: 'Order Number',
    status: 'confirmed'
  },

  // TRACKING & SHIPMENT
  'Tracking Number': {
    US: 'Tracking Number',
    UK: 'Tracking Number',
    DE: 'Sendungsnummer',
    FR: 'Numéro de suivi',
    IT: 'Numero di tracciamento',
    CA: 'Tracking Number',
    AU: 'Tracking Number',
    status: 'confirmed'
  },
  'Shipment Confirmation': {
    US: 'Shipment Confirmation',
    UK: 'Shipment Confirmation',
    DE: 'Versandbestätigung',
    FR: 'Confirmation d\'expédition',
    IT: 'Conferma spedizione',
    CA: 'Shipment Confirmation',
    AU: 'Shipment Confirmation',
    status: 'confirmed'
  },
  'Order Confirmation': {
    US: 'Order Confirmation',
    UK: 'Order Confirmation',
    DE: 'Bestellbestätigung',
    FR: 'Confirmation de commande',
    IT: 'Conferma ordine',
    CA: 'Order Confirmation',
    AU: 'Order Confirmation',
    status: 'confirmed'
  },
  'Order Details': {
    US: 'Order Details',
    UK: 'Order Details',
    DE: 'Bestelldetails',
    FR: 'Détails de la commande',
    IT: 'Dettagli ordine',
    CA: 'Order Details',
    AU: 'Order Details',
    status: 'confirmed'
  },
  'View Order Details': {
    US: 'View Order Details',
    UK: 'View Order Details',
    DE: 'Bestelldetails anzeigen',
    FR: 'Afficher les détails',
    IT: 'Visualizza dettagli ordine',
    CA: 'View Order Details',
    AU: 'View Order Details',
    status: 'confirmed'
  },

  // ADDRESS & VALIDATION
  'Shipping Address': {
    US: 'Shipping Address',
    UK: 'Delivery Address',
    DE: 'Versandadresse',
    FR: 'Adresse de livraison',
    IT: 'Indirizzo di spedizione',
    CA: 'Shipping Address',
    AU: 'Shipping Address',
    status: 'confirmed'
  },
  'Buyer Address': {
    US: 'Buyer Address',
    UK: 'Buyer Address',
    DE: 'Käuferadresse',
    FR: 'Adresse de l\'acheteur',
    IT: 'Indirizzo acquirente',
    CA: 'Buyer Address',
    AU: 'Buyer Address',
    status: 'confirmed'
  },
  'Postal Code Validation': {
    US: 'Zip Code Validation',
    UK: 'Postcode Validation',
    DE: 'Postleitzahl-Validierung',
    FR: 'Validation code postal',
    IT: 'Validazione codice postale',
    CA: 'Postal Code Validation',
    AU: 'Postcode Validation',
    status: 'confirmed'
  },
  'Address Validation': {
    US: 'Address Validation',
    UK: 'Address Validation',
    DE: 'Adressvalidierung',
    FR: 'Validation d\'adresse',
    IT: 'Validazione indirizzo',
    CA: 'Address Validation',
    AU: 'Address Validation',
    status: 'confirmed'
  },

  // SKU & PRODUCT IDENTIFIERS
  'SKU': {
    US: 'SKU',
    UK: 'SKU',
    DE: 'SKU',
    FR: 'SKU',
    IT: 'SKU',
    CA: 'SKU',
    AU: 'SKU',
    status: 'global'
  },
  'Custom Label': {
    US: 'Custom Label',
    UK: 'Custom Label',
    DE: 'Benutzerdefiniertes Etikett',
    FR: 'Étiquette personnalisée',
    IT: 'Etichetta personalizzata',
    CA: 'Custom Label',
    AU: 'Custom Label',
    status: 'confirmed'
  },
  'Item Number': {
    US: 'Item Number',
    UK: 'Item Number',
    DE: 'Artikelnummer',
    FR: 'Numéro d\'objet',
    IT: 'Numero oggetto',
    CA: 'Item Number',
    AU: 'Item Number',
    status: 'confirmed'
  },

  // PRINTING & LABELS
  'Print Shipping Label': {
    US: 'Print Shipping Label',
    UK: 'Print Postage Label',
    DE: 'Versandetikett drucken',
    FR: 'Imprimer étiquette d\'expédition',
    IT: 'Stampa etichetta spedizione',
    CA: 'Print Shipping Label',
    AU: 'Print Shipping Label',
    status: 'confirmed'
  },
  'Thermal Printer': {
    US: 'Thermal Printer',
    UK: 'Thermal Printer',
    DE: 'Thermodrucker',
    FR: 'Imprimante thermique',
    IT: 'Stampante termica',
    CA: 'Thermal Printer',
    AU: 'Thermal Printer',
    status: 'confirmed'
  },
  'Label Printer': {
    US: 'Label Printer',
    UK: 'Label Printer',
    DE: 'Etikettendrucker',
    FR: 'Imprimante d\'étiquettes',
    IT: 'Stampante etichette',
    CA: 'Label Printer',
    AU: 'Label Printer',
    status: 'confirmed'
  },
  'Print Label': {
    US: 'Print Label',
    UK: 'Print Label',
    DE: 'Etikett drucken',
    FR: 'Imprimer étiquette',
    IT: 'Stampa etichetta',
    CA: 'Print Label',
    AU: 'Print Label',
    status: 'confirmed'
  },

  // INVOICES & DOCUMENTS
  'Invoice': {
    US: 'Invoice',
    UK: 'Invoice',
    DE: 'Rechnung',
    FR: 'Facture',
    IT: 'Fattura',
    CA: 'Invoice',
    AU: 'Invoice',
    status: 'confirmed'
  },
  'Packing Slip': {
    US: 'Packing Slip',
    UK: 'Packing Slip',
    DE: 'Packzettel',
    FR: 'Bon de livraison',
    IT: 'Bolla di consegna',
    CA: 'Packing Slip',
    AU: 'Packing Slip',
    status: 'confirmed'
  },
  'Receipt': {
    US: 'Receipt',
    UK: 'Receipt',
    DE: 'Quittung',
    FR: 'Reçu',
    IT: 'Ricevuta',
    CA: 'Receipt',
    AU: 'Receipt',
    status: 'confirmed'
  },
  'Commercial Invoice': {
    US: 'Commercial Invoice',
    UK: 'Commercial Invoice',
    DE: 'Handelsrechnung',
    FR: 'Facture commerciale',
    IT: 'Fattura commerciale',
    CA: 'Commercial Invoice',
    AU: 'Commercial Invoice',
    status: 'confirmed'
  },
  'Packing List': {
    US: 'Packing List',
    UK: 'Packing List',
    DE: 'Packliste',
    FR: 'Liste de colisage',
    IT: 'Lista di imballaggio',
    CA: 'Packing List',
    AU: 'Packing List',
    status: 'confirmed'
  },

  // SELLER NEWS & UPDATES
  'Seller Updates': {
    US: 'Seller Updates',
    UK: 'Seller Updates',
    DE: 'Verkäufer-Updates',
    FR: 'Mises à jour vendeur',
    IT: 'Aggiornamenti venditori',
    CA: 'Seller Updates',
    AU: 'Seller Updates',
    status: 'confirmed'
  },
  'Seller News': {
    US: 'Seller News',
    UK: 'Seller News',
    DE: 'Verkäufer-News',
    FR: 'Actualités vendeur',
    IT: 'Notizie venditori',
    CA: 'Seller News',
    AU: 'Seller News',
    status: 'confirmed'
  },
  'Announcements': {
    US: 'Announcements',
    UK: 'Announcements',
    DE: 'Ankündigungen',
    FR: 'Annonces',
    IT: 'Annunci',
    CA: 'Announcements',
    AU: 'Announcements',
    status: 'confirmed'
  },
  'Policy Changes': {
    US: 'Policy Changes',
    UK: 'Policy Changes',
    DE: 'Richtlinienänderungen',
    FR: 'Modifications des politiques',
    IT: 'Modifiche alle politiche',
    CA: 'Policy Changes',
    AU: 'Policy Changes',
    status: 'confirmed'
  },
  'Credit Note': {
    US: 'Credit Note',
    UK: 'Credit Note',
    DE: 'Gutschrift',
    FR: 'Note de crédit',
    IT: 'Nota di credito',
    CA: 'Credit Note',
    AU: 'Credit Note',
    status: 'confirmed'
  },

  // LISTING TITLE & OPTIMIZATION
  'Listing Title': {
    US: 'Listing Title',
    UK: 'Listing Title',
    DE: 'Angebotstittel',
    FR: 'Titre de l\'annonce',
    IT: 'Titolo inserzione',
    CA: 'Listing Title',
    AU: 'Listing Title',
    status: 'confirmed'
  },
  'Character Limit': {
    US: 'Character Limit',
    UK: 'Character Limit',
    DE: 'Zeichenbegrenzung',
    FR: 'Limite de caractères',
    IT: 'Limite caratteri',
    CA: 'Character Limit',
    AU: 'Character Limit',
    status: 'confirmed'
  },
  'Keywords': {
    US: 'Keywords',
    UK: 'Keywords',
    DE: 'Schlüsselwörter',
    FR: 'Mots-clés',
    IT: 'Parole chiave',
    CA: 'Keywords',
    AU: 'Keywords',
    status: 'confirmed'
  },
  'Title Optimization': {
    US: 'Title Optimization',
    UK: 'Title Optimization',
    DE: 'Titeloptimierung',
    FR: 'Optimisation du titre',
    IT: 'Ottimizzazione titolo',
    CA: 'Title Optimization',
    AU: 'Title Optimization',
    status: 'confirmed'
  },

  // SHIPPING METHODS
  'Free Shipping': {
    US: 'Free Shipping',
    UK: 'Free Postage',
    DE: 'Kostenloser Versand',
    FR: 'Livraison gratuite',
    IT: 'Spedizione gratuita',
    CA: 'Free Shipping',
    AU: 'Free Shipping',
    status: 'confirmed'
  },
  'Flat Rate Shipping': {
    US: 'Flat Rate Shipping',
    UK: 'Flat Rate Postage',
    DE: 'Pauschalversand',
    FR: 'Frais d\'expédition forfaitaires',
    IT: 'Spedizione a tariffa fissa',
    CA: 'Flat Rate Shipping',
    AU: 'Flat Rate Shipping',
    status: 'confirmed'
  },
  'Expedited Shipping': {
    US: 'Expedited Shipping',
    UK: 'Expedited Postage',
    DE: 'Expressversand',
    FR: 'Expédition accélérée',
    IT: 'Spedizione espressa',
    CA: 'Expedited Shipping',
    AU: 'Expedited Shipping',
    status: 'confirmed'
  },
  'Standard Shipping': {
    US: 'Standard Shipping',
    UK: 'Standard Postage',
    DE: 'Standardversand',
    FR: 'Expédition standard',
    IT: 'Spedizione standard',
    CA: 'Standard Shipping',
    AU: 'Standard Shipping',
    status: 'confirmed'
  },
  'Economy Shipping': {
    US: 'Economy Shipping',
    UK: 'Economy Postage',
    DE: 'Sparversand',
    FR: 'Expédition économique',
    IT: 'Spedizione economica',
    CA: 'Economy Shipping',
    AU: 'Economy Shipping',
    status: 'confirmed'
  },
  'Fast \'N Free': {
    US: 'Fast \'N Free',
    UK: 'Fast \'N Free',
    DE: 'Schnell und kostenlos',
    FR: 'Rapide et gratuit',
    IT: 'Veloce e gratis',
    CA: 'Fast \'N Free',
    AU: 'Fast \'N Free',
    status: 'confirmed'
  },

  // INTERNATIONAL SELLING
  'Cross-Border Trade': {
    US: 'Cross-Border Trade',
    UK: 'Cross-Border Trade',
    DE: 'Grenzüberschreitender Handel',
    FR: 'Commerce transfrontalier',
    IT: 'Commercio transfrontaliero',
    CA: 'Cross-Border Trade',
    AU: 'Cross-Border Trade',
    status: 'confirmed'
  },
  'International Selling': {
    US: 'International Selling',
    UK: 'International Selling',
    DE: 'Internationaler Verkauf',
    FR: 'Vente internationale',
    IT: 'Vendita internazionale',
    CA: 'International Selling',
    AU: 'International Selling',
    status: 'confirmed'
  },
  'Global Markets': {
    US: 'Global Markets',
    UK: 'Global Markets',
    DE: 'Globale Märkte',
    FR: 'Marchés mondiaux',
    IT: 'Mercati globali',
    CA: 'Global Markets',
    AU: 'Global Markets',
    status: 'confirmed'
  },
  'Export': {
    US: 'Export',
    UK: 'Export',
    DE: 'Export',
    FR: 'Export',
    IT: 'Esportazione',
    CA: 'Export',
    AU: 'Export',
    status: 'confirmed'
  },

  // BUYER QUESTIONS & COMMUNICATION
  'Questions & Answers': {
    US: 'Questions & Answers',
    UK: 'Questions & Answers',
    DE: 'Fragen und Antworten',
    FR: 'Questions et réponses',
    IT: 'Domande e risposte',
    CA: 'Questions & Answers',
    AU: 'Questions & Answers',
    status: 'confirmed'
  },
  'Q&A': {
    US: 'Q&A',
    UK: 'Q&A',
    DE: 'Q&A',
    FR: 'Q&R',
    IT: 'D&R',
    CA: 'Q&A',
    AU: 'Q&A',
    status: 'confirmed'
  },
  'Buyer Question': {
    US: 'Buyer Question',
    UK: 'Buyer Question',
    DE: 'Käuferfrage',
    FR: 'Question de l\'acheteur',
    IT: 'Domanda acquirente',
    CA: 'Buyer Question',
    AU: 'Buyer Question',
    status: 'confirmed'
  },
  'Seller Answer': {
    US: 'Seller Answer',
    UK: 'Seller Answer',
    DE: 'Verkäuferantwort',
    FR: 'Réponse du vendeur',
    IT: 'Risposta venditore',
    CA: 'Seller Answer',
    AU: 'Seller Answer',
    status: 'confirmed'
  },
  'Pre-Sale Question': {
    US: 'Pre-Sale Question',
    UK: 'Pre-Sale Question',
    DE: 'Frage vor Verkauf',
    FR: 'Question avant-vente',
    IT: 'Domanda pre-vendita',
    CA: 'Pre-Sale Question',
    AU: 'Pre-Sale Question',
    status: 'confirmed'
  },

  // LISTING ERRORS & VALIDATION
  'Listing Error': {
    US: 'Listing Error',
    UK: 'Listing Error',
    DE: 'Angebotsfehler',
    FR: 'Erreur d\'annonce',
    IT: 'Errore inserzione',
    CA: 'Listing Error',
    AU: 'Listing Error',
    status: 'confirmed'
  },
  'Validation Error': {
    US: 'Validation Error',
    UK: 'Validation Error',
    DE: 'Validierungsfehler',
    FR: 'Erreur de validation',
    IT: 'Errore di validazione',
    CA: 'Validation Error',
    AU: 'Validation Error',
    status: 'confirmed'
  },
  'Error Message': {
    US: 'Error Message',
    UK: 'Error Message',
    DE: 'Fehlermeldung',
    FR: 'Message d\'erreur',
    IT: 'Messaggio di errore',
    CA: 'Error Message',
    AU: 'Error Message',
    status: 'confirmed'
  },
  'Attention Required': {
    US: 'Attention Required',
    UK: 'Attention Required',
    DE: 'Aufmerksamkeit erforderlich',
    FR: 'Attention requise',
    IT: 'Attenzione richiesta',
    CA: 'Attention Required',
    AU: 'Attention Required',
    status: 'confirmed'
  },

  // LISTING STATUS
  'Active Listings': {
    US: 'Active Listings',
    UK: 'Active Listings',
    DE: 'Aktive Angebote',
    FR: 'Annonces actives',
    IT: 'Inserzioni attive',
    CA: 'Active Listings',
    AU: 'Active Listings',
    status: 'confirmed'
  },
  'Inactive Listings': {
    US: 'Inactive Listings',
    UK: 'Inactive Listings',
    DE: 'Inaktive Angebote',
    FR: 'Annonces inactives',
    IT: 'Inserzioni inattive',
    CA: 'Inactive Listings',
    AU: 'Inactive Listings',
    status: 'confirmed'
  },
  'Ended Listings': {
    US: 'Ended Listings',
    UK: 'Ended Listings',
    DE: 'Beendete Angebote',
    FR: 'Annonces terminées',
    IT: 'Inserzioni terminate',
    CA: 'Ended Listings',
    AU: 'Ended Listings',
    status: 'confirmed'
  },
  'Unsold Listings': {
    US: 'Unsold Listings',
    UK: 'Unsold Listings',
    DE: 'Unverkaufte Angebote',
    FR: 'Annonces invendues',
    IT: 'Inserzioni invendute',
    CA: 'Unsold Listings',
    AU: 'Unsold Listings',
    status: 'confirmed'
  },

  // SHOPPING CART & CHECKOUT
  'Shopping Cart': {
    US: 'Shopping Cart',
    UK: 'Shopping Basket',
    DE: 'Warenkorb',
    FR: 'Panier',
    IT: 'Carrello',
    CA: 'Shopping Cart',
    AU: 'Shopping Cart',
    status: 'confirmed'
  },
  'Add to Cart': {
    US: 'Add to Cart',
    UK: 'Add to Basket',
    DE: 'In den Warenkorb',
    FR: 'Ajouter au panier',
    IT: 'Aggiungi al carrello',
    CA: 'Add to Cart',
    AU: 'Add to Cart',
    status: 'confirmed'
  },
  'Quantity Selector': {
    US: 'Quantity Selector',
    UK: 'Quantity Selector',
    DE: 'Mengenauswahl',
    FR: 'Sélecteur de quantité',
    IT: 'Selettore quantità',
    CA: 'Quantity Selector',
    AU: 'Quantity Selector',
    status: 'confirmed'
  },
  'Checkout': {
    US: 'Checkout',
    UK: 'Checkout',
    DE: 'Zur Kasse',
    FR: 'Passer commande',
    IT: 'Procedi al pagamento',
    CA: 'Checkout',
    AU: 'Checkout',
    status: 'confirmed'
  },
  'Cart Total': {
    US: 'Cart Total',
    UK: 'Basket Total',
    DE: 'Warenkorbsumme',
    FR: 'Total du panier',
    IT: 'Totale carrello',
    CA: 'Cart Total',
    AU: 'Cart Total',
    status: 'confirmed'
  },

  // ACCOUNT SECURITY
  'Two-Factor Authentication': {
    US: 'Two-Factor Authentication',
    UK: 'Two-Factor Authentication',
    DE: 'Zwei-Faktor-Authentifizierung',
    FR: 'Authentification à deux facteurs',
    IT: 'Autenticazione a due fattori',
    CA: 'Two-Factor Authentication',
    AU: 'Two-Factor Authentication',
    status: 'confirmed'
  },
  '2-Step Verification': {
    US: '2-Step Verification',
    UK: '2-Step Verification',
    DE: '2-Schritt-Verifizierung',
    FR: 'Vérification en 2 étapes',
    IT: 'Verifica in 2 passaggi',
    CA: '2-Step Verification',
    AU: '2-Step Verification',
    status: 'confirmed'
  },
  'Passkeys': {
    US: 'Passkeys',
    UK: 'Passkeys',
    DE: 'Passkeys',
    FR: 'Clés d\'accès',
    IT: 'Chiavi di accesso',
    CA: 'Passkeys',
    AU: 'Passkeys',
    status: 'confirmed'
  },
  'Account Security': {
    US: 'Account Security',
    UK: 'Account Security',
    DE: 'Kontosicherheit',
    FR: 'Sécurité du compte',
    IT: 'Sicurezza account',
    CA: 'Account Security',
    AU: 'Account Security',
    status: 'confirmed'
  },
  'Fraud Prevention': {
    US: 'Fraud Prevention',
    UK: 'Fraud Prevention',
    DE: 'Betrugsprävention',
    FR: 'Prévention de la fraude',
    IT: 'Prevenzione frodi',
    CA: 'Fraud Prevention',
    AU: 'Fraud Prevention',
    status: 'confirmed'
  },
  'Authenticator App': {
    US: 'Authenticator App',
    UK: 'Authenticator App',
    DE: 'Authentifizierungs-App',
    FR: 'Application d\'authentification',
    IT: 'App di autenticazione',
    CA: 'Authenticator App',
    AU: 'Authenticator App',
    status: 'confirmed'
  },

  // ANALYTICS & REPORTING
  'Listing Quality Report': {
    US: 'Listing Quality Report',
    UK: 'Listing Quality Report',
    DE: 'Bericht zur Angebotsqualität',
    FR: 'Rapport de qualité des annonces',
    IT: 'Rapporto sulla qualità delle inserzioni',
    CA: 'Listing Quality Report',
    AU: 'Listing Quality Report',
    status: 'confirmed'
  },
  'Sales Report': {
    US: 'Sales Report',
    UK: 'Sales Report',
    DE: 'Verkaufsbericht',
    FR: 'Rapport des ventes',
    IT: 'Rapporto delle vendite',
    CA: 'Sales Report',
    AU: 'Sales Report',
    status: 'confirmed'
  },
  'Traffic Report': {
    US: 'Traffic Report',
    UK: 'Traffic Report',
    DE: 'Trafficbericht',
    FR: 'Rapport de trafic',
    IT: 'Rapporto sul traffico',
    CA: 'Traffic Report',
    AU: 'Traffic Report',
    status: 'confirmed'
  },
  'Performance Dashboard': {
    US: 'Performance Dashboard',
    UK: 'Performance Dashboard',
    DE: 'Leistungs-Dashboard',
    FR: 'Tableau de bord des performances',
    IT: 'Dashboard delle prestazioni',
    CA: 'Performance Dashboard',
    AU: 'Performance Dashboard',
    status: 'confirmed'
  },
  'Sourcing Insights': {
    US: 'Sourcing Insights',
    UK: 'Sourcing Insights',
    DE: 'Sourcing-Insights',
    FR: 'Informations sur l\'approvisionnement',
    IT: 'Informazioni sull\'approvvigionamento',
    CA: 'Sourcing Insights',
    AU: 'Sourcing Insights',
    status: 'confirmed'
  },

  // EMAIL MARKETING & CAMPAIGNS
  'Store Newsletter': {
    US: 'Store Newsletter',
    UK: 'Shop Newsletter',
    DE: 'Shop-Newsletter',
    FR: 'Bulletin de la boutique',
    IT: 'Newsletter del negozio',
    CA: 'Store Newsletter',
    AU: 'Store Newsletter',
    status: 'confirmed'
  },
  'Email Campaign': {
    US: 'Email Campaign',
    UK: 'Email Campaign',
    DE: 'E-Mail-Kampagne',
    FR: 'Campagne par e-mail',
    IT: 'Campagna e-mail',
    CA: 'Email Campaign',
    AU: 'Email Campaign',
    status: 'confirmed'
  },
  'Welcome Email Campaign': {
    US: 'Welcome Email Campaign',
    UK: 'Welcome Email Campaign',
    DE: 'Willkommens-E-Mail-Kampagne',
    FR: 'Campagne de bienvenue par e-mail',
    IT: 'Campagna e-mail di benvenuto',
    CA: 'Welcome Email Campaign',
    AU: 'Welcome Email Campaign',
    status: 'confirmed'
  },
  'New Products Email Campaign': {
    US: 'New Products Email Campaign',
    UK: 'New Products Email Campaign',
    DE: 'E-Mail-Kampagne für neue Produkte',
    FR: 'Campagne e-mail nouveaux produits',
    IT: 'Campagna e-mail nuovi prodotti',
    CA: 'New Products Email Campaign',
    AU: 'New Products Email Campaign',
    status: 'confirmed'
  },
  'Sale Event Email Campaign': {
    US: 'Sale Event Email Campaign',
    UK: 'Sale Event Email Campaign',
    DE: 'Verkaufsaktions-E-Mail-Kampagne',
    FR: 'Campagne e-mail événement de vente',
    IT: 'Campagna e-mail evento di vendita',
    CA: 'Sale Event Email Campaign',
    AU: 'Sale Event Email Campaign',
    status: 'confirmed'
  },
  'Volume Pricing Email Campaign': {
    US: 'Volume Pricing Email Campaign',
    UK: 'Volume Pricing Email Campaign',
    DE: 'E-Mail-Kampagne für Mengenrabatte',
    FR: 'Campagne e-mail tarification en volume',
    IT: 'Campagna e-mail prezzi per quantità',
    CA: 'Volume Pricing Email Campaign',
    AU: 'Volume Pricing Email Campaign',
    status: 'confirmed'
  },
  'Buyer Segmentation Tool': {
    US: 'Buyer Segmentation Tool',
    UK: 'Buyer Segmentation Tool',
    DE: 'Käufersegmentierungs-Tool',
    FR: 'Outil de segmentation des acheteurs',
    IT: 'Strumento di segmentazione acquirenti',
    CA: 'Buyer Segmentation Tool',
    AU: 'Buyer Segmentation Tool',
    status: 'confirmed'
  },

  // COMPLIANCE & STANDARDS
  'Issue Resolution Center': {
    US: 'Issue Resolution Center',
    UK: 'Issue Resolution Centre',
    DE: 'Problemlösungscenter',
    FR: 'Centre de résolution des problèmes',
    IT: 'Centro di risoluzione dei problemi',
    CA: 'Issue Resolution Centre',
    AU: 'Issue Resolution Centre',
    status: 'confirmed'
  },
  'Seller Performance Standards': {
    US: 'Seller Performance Standards',
    UK: 'Seller Performance Standards',
    DE: 'Verkäufer-Leistungsstandards',
    FR: 'Normes de performance des vendeurs',
    IT: 'Standard di prestazione dei venditori',
    CA: 'Seller Performance Standards',
    AU: 'Seller Performance Standards',
    status: 'confirmed'
  },
  'Above Standard': {
    US: 'Above Standard',
    UK: 'Above Standard',
    DE: 'Über dem Standard',
    FR: 'Au-dessus de la norme',
    IT: 'Sopra lo standard',
    CA: 'Above Standard',
    AU: 'Above Standard',
    status: 'confirmed'
  },
  'Below Standard': {
    US: 'Below Standard',
    UK: 'Below Standard',
    DE: 'Unter dem Standard',
    FR: 'En dessous de la norme',
    IT: 'Sotto lo standard',
    CA: 'Below Standard',
    AU: 'Below Standard',
    status: 'confirmed'
  },
  'Service Metrics': {
    US: 'Service Metrics',
    UK: 'Service Metrics',
    DE: 'Service-Metriken',
    FR: 'Indicateurs de service',
    IT: 'Metriche di servizio',
    CA: 'Service Metrics',
    AU: 'Service Metrics',
    status: 'confirmed'
  },
  'Transaction Defect Rate': {
    US: 'Transaction Defect Rate',
    UK: 'Transaction Defect Rate',
    DE: 'Transaktionsfehlerrate',
    FR: 'Taux de défauts de transaction',
    IT: 'Tasso di difetti nelle transazioni',
    CA: 'Transaction Defect Rate',
    AU: 'Transaction Defect Rate',
    status: 'confirmed'
  },

  // SHIPPING & FULFILLMENT
  'eBay SpeedPAK': {
    US: 'eBay SpeedPAK',
    UK: 'eBay SpeedPAK',
    DE: 'eBay SpeedPAK',
    FR: 'eBay SpeedPAK',
    IT: 'eBay SpeedPAK',
    CA: 'eBay SpeedPAK',
    AU: 'eBay SpeedPAK',
    status: 'global'
  },
  'SpeedPAK Economy': {
    US: 'SpeedPAK Economy',
    UK: 'SpeedPAK Economy',
    DE: 'SpeedPAK Economy',
    FR: 'SpeedPAK Economy',
    IT: 'SpeedPAK Economy',
    CA: 'SpeedPAK Economy',
    AU: 'SpeedPAK Economy',
    status: 'global'
  },
  'Crossborder Parcel Shipping Solution': {
    US: 'Crossborder Parcel Shipping Solution (CPaSS)',
    UK: 'Crossborder Parcel Shipping Solution (CPaSS)',
    DE: 'Crossborder Parcel Shipping Solution (CPaSS)',
    FR: 'Crossborder Parcel Shipping Solution (CPaSS)',
    IT: 'Crossborder Parcel Shipping Solution (CPaSS)',
    CA: 'Crossborder Parcel Shipping Solution (CPaSS)',
    AU: 'Crossborder Parcel Shipping Solution (CPaSS)',
    status: 'global'
  },

  // RETURNS & REFUNDS
  'Return Request': {
    US: 'Return Request',
    UK: 'Return Request',
    DE: 'Rückgabeanfrage',
    FR: 'Demande de retour',
    IT: 'Richiesta di reso',
    CA: 'Return Request',
    AU: 'Return Request',
    status: 'confirmed'
  },
  'Return Policy': {
    US: 'Return Policy',
    UK: 'Return Policy',
    DE: 'Rückgaberichtlinie',
    FR: 'Politique de retour',
    IT: 'Politica di reso',
    CA: 'Return Policy',
    AU: 'Return Policy',
    status: 'confirmed'
  },
  'Free Returns': {
    US: 'Free Returns',
    UK: 'Free Returns',
    DE: 'Kostenlose Rücksendung',
    FR: 'Retours gratuits',
    IT: 'Resi gratuiti',
    CA: 'Free Returns',
    AU: 'Free Returns',
    status: 'confirmed'
  },
  'Buyer-Paid Returns': {
    US: 'Buyer-Paid Returns',
    UK: 'Buyer-Paid Returns',
    DE: 'Vom Käufer bezahlte Rücksendung',
    FR: 'Retours payés par l\'acheteur',
    IT: 'Resi a carico dell\'acquirente',
    CA: 'Buyer-Paid Returns',
    AU: 'Buyer-Paid Returns',
    status: 'confirmed'
  },
  'No Returns Accepted': {
    US: 'No Returns Accepted',
    UK: 'No Returns Accepted',
    DE: 'Keine Rücknahme',
    FR: 'Retours non acceptés',
    IT: 'Resi non accettati',
    CA: 'No Returns Accepted',
    AU: 'No Returns Accepted',
    status: 'confirmed'
  },
  'Advance Refund': {
    US: 'Advance Refund',
    UK: 'Advance Refund',
    DE: 'Vorabrückerstattung',
    FR: 'Remboursement anticipé',
    IT: 'Rimborso anticipato',
    CA: 'Advance Refund',
    AU: 'Advance Refund',
    status: 'partial'
  },

  // BUYER & SELLER PROTECTION
  'Seller Protection': {
    US: 'Seller Protection',
    UK: 'Seller Protection',
    DE: 'Verkäuferschutz',
    FR: 'Protection vendeur',
    IT: 'Protezione venditore',
    CA: 'Seller Protection',
    AU: 'Seller Protection',
    status: 'confirmed'
  },
  'Buyer Protection': {
    US: 'Buyer Protection',
    UK: 'Buyer Protection',
    DE: 'Käuferschutz',
    FR: 'Protection acheteur',
    IT: 'Protezione acquirente',
    CA: 'Buyer Protection',
    AU: 'Buyer Protection',
    status: 'confirmed'
  },
  'Vehicle Purchase Protection': {
    US: 'Vehicle Purchase Protection (VPP)',
    UK: 'Vehicle Purchase Protection (VPP)',
    DE: 'Vehicle Purchase Protection (VPP)',
    FR: 'Vehicle Purchase Protection (VPP)',
    IT: 'Vehicle Purchase Protection (VPP)',
    CA: 'Vehicle Purchase Protection (VPP)',
    AU: 'Vehicle Purchase Protection (VPP)',
    status: 'partial'
  },
  'Business Equipment Purchase Protection': {
    US: 'Business Equipment Purchase Protection (BEPP)',
    UK: 'Business Equipment Purchase Protection (BEPP)',
    DE: 'Business Equipment Purchase Protection (BEPP)',
    FR: 'Business Equipment Purchase Protection (BEPP)',
    IT: 'Business Equipment Purchase Protection (BEPP)',
    CA: 'Business Equipment Purchase Protection (BEPP)',
    AU: 'Business Equipment Purchase Protection (BEPP)',
    status: 'partial'
  },
  'Abusive Buyer Policy': {
    US: 'Abusive Buyer Policy',
    UK: 'Abusive Buyer Policy',
    DE: 'Richtlinie zu missbräuchlichem Käuferverhalten',
    FR: 'Politique concernant les acheteurs abusifs',
    IT: 'Politica sugli acquirenti abusivi',
    CA: 'Abusive Buyer Policy',
    AU: 'Abusive Buyer Policy',
    status: 'confirmed'
  },

  // PARTNER & AFFILIATE PROGRAMS
  'eBay Partner Network': {
    US: 'eBay Partner Network (EPN)',
    UK: 'eBay Partner Network (EPN)',
    DE: 'eBay Partner Network (EPN)',
    FR: 'eBay Partner Network (EPN)',
    IT: 'eBay Partner Network (EPN)',
    CA: 'eBay Partner Network (EPN)',
    AU: 'eBay Partner Network (EPN)',
    status: 'global'
  },
  'Affiliate Program': {
    US: 'Affiliate Program',
    UK: 'Affiliate Programme',
    DE: 'Partnerprogramm',
    FR: 'Programme d\'affiliation',
    IT: 'Programma di affiliazione',
    CA: 'Affiliate Programme',
    AU: 'Affiliate Programme',
    status: 'confirmed'
  },

  // BUSINESS POLICIES & TEMPLATES
  'Business Policies': {
    US: 'Business Policies',
    UK: 'Business Policies',
    DE: 'Geschäftsrichtlinien',
    FR: 'Règles commerciales',
    IT: 'Regole di vendita',
    CA: 'Business Policies',
    AU: 'Business Policies',
    status: 'confirmed'
  },
  'Payment Policy': {
    US: 'Payment Policy',
    UK: 'Payment Policy',
    DE: 'Zahlungsrichtlinie',
    FR: 'Règles de paiement',
    IT: 'Regole di pagamento',
    CA: 'Payment Policy',
    AU: 'Payment Policy',
    status: 'confirmed'
  },
  'Shipping Policy': {
    US: 'Shipping Policy',
    UK: 'Postage Policy',
    DE: 'Versandrichtlinie',
    FR: 'Règles d\'expédition',
    IT: 'Regole di spedizione',
    CA: 'Shipping Policy',
    AU: 'Shipping Policy',
    status: 'confirmed'
  },
  'Return Policy Template': {
    US: 'Return Policy Template',
    UK: 'Return Policy Template',
    DE: 'Rückgaberichtlinien-Vorlage',
    FR: 'Modèle de politique de retour',
    IT: 'Modello di politica di reso',
    CA: 'Return Policy Template',
    AU: 'Return Policy Template',
    status: 'confirmed'
  },
  'Policy Template': {
    US: 'Policy Template',
    UK: 'Policy Template',
    DE: 'Richtlinienvorlage',
    FR: 'Modèle de règle',
    IT: 'Modello di regola',
    CA: 'Policy Template',
    AU: 'Policy Template',
    status: 'confirmed'
  },

  // PRODUCT IDENTIFIERS & ITEM SPECIFICS
  'Item Specifics': {
    US: 'Item Specifics',
    UK: 'Item Specifics',
    DE: 'Artikelmerkmale',
    FR: 'Caractéristiques de l\'objet',
    IT: 'Specifiche dell\'oggetto',
    CA: 'Item Specifics',
    AU: 'Item Specifics',
    status: 'confirmed'
  },
  'Category Specifics': {
    US: 'Category Specifics',
    UK: 'Category Specifics',
    DE: 'Kategoriemerkmale',
    FR: 'Caractéristiques de catégorie',
    IT: 'Specifiche di categoria',
    CA: 'Category Specifics',
    AU: 'Category Specifics',
    status: 'confirmed'
  },
  'Product Identifiers': {
    US: 'Product Identifiers',
    UK: 'Product Identifiers',
    DE: 'Produktkennzeichnungen',
    FR: 'Identifiants de produit',
    IT: 'Identificatori prodotto',
    CA: 'Product Identifiers',
    AU: 'Product Identifiers',
    status: 'confirmed'
  },
  'UPC': {
    US: 'UPC (Universal Product Code)',
    UK: 'UPC (Universal Product Code)',
    DE: 'UPC (Universal Product Code)',
    FR: 'UPC (Universal Product Code)',
    IT: 'UPC (Universal Product Code)',
    CA: 'UPC (Universal Product Code)',
    AU: 'UPC (Universal Product Code)',
    status: 'global'
  },
  'ISBN': {
    US: 'ISBN (International Standard Book Number)',
    UK: 'ISBN (International Standard Book Number)',
    DE: 'ISBN (Internationale Standardbuchnummer)',
    FR: 'ISBN (Numéro international normalisé du livre)',
    IT: 'ISBN (Numero internazionale normalizzato del libro)',
    CA: 'ISBN (International Standard Book Number)',
    AU: 'ISBN (International Standard Book Number)',
    status: 'confirmed'
  },
  'MPN': {
    US: 'MPN (Manufacturer Part Number)',
    UK: 'MPN (Manufacturer Part Number)',
    DE: 'MPN (Herstellerteilenummer)',
    FR: 'MPN (Numéro de pièce du fabricant)',
    IT: 'MPN (Codice prodotto del produttore)',
    CA: 'MPN (Manufacturer Part Number)',
    AU: 'MPN (Manufacturer Part Number)',
    status: 'confirmed'
  },
  'GTIN': {
    US: 'GTIN (Global Trade Item Number)',
    UK: 'GTIN (Global Trade Item Number)',
    DE: 'GTIN (Globale Artikelidentnummer)',
    FR: 'GTIN (Numéro d\'article commercial mondial)',
    IT: 'GTIN (Numero articolo commerciale globale)',
    CA: 'GTIN (Global Trade Item Number)',
    AU: 'GTIN (Global Trade Item Number)',
    status: 'confirmed'
  },
  'EAN': {
    US: 'EAN (European Article Number)',
    UK: 'EAN (European Article Number)',
    DE: 'EAN (Europäische Artikelnummer)',
    FR: 'EAN (Numéro d\'article européen)',
    IT: 'EAN (Numero articolo europeo)',
    CA: 'EAN (European Article Number)',
    AU: 'EAN (European Article Number)',
    status: 'confirmed'
  },
  'Brand': {
    US: 'Brand',
    UK: 'Brand',
    DE: 'Marke',
    FR: 'Marque',
    IT: 'Marca',
    CA: 'Brand',
    AU: 'Brand',
    status: 'confirmed'
  },
  'Unbranded': {
    US: 'Unbranded',
    UK: 'Unbranded',
    DE: 'Ohne Marke',
    FR: 'Sans marque',
    IT: 'Senza marca',
    CA: 'Unbranded',
    AU: 'Unbranded',
    status: 'confirmed'
  },
  'Does Not Apply': {
    US: 'Does Not Apply',
    UK: 'Does Not Apply',
    DE: 'Trifft nicht zu',
    FR: 'Ne s\'applique pas',
    IT: 'Non applicabile',
    CA: 'Does Not Apply',
    AU: 'Does Not Apply',
    status: 'confirmed'
  },

  // DEVELOPER & API PROGRAMS
  'eBay Developers Program': {
    US: 'eBay Developers Program',
    UK: 'eBay Developers Programme',
    DE: 'eBay-Entwicklerprogramm',
    FR: 'Programme pour développeurs eBay',
    IT: 'Programma per sviluppatori eBay',
    CA: 'eBay Developers Programme',
    AU: 'eBay Developers Programme',
    status: 'confirmed'
  },
  'Buy API': {
    US: 'Buy API',
    UK: 'Buy API',
    DE: 'Buy API',
    FR: 'Buy API',
    IT: 'Buy API',
    CA: 'Buy API',
    AU: 'Buy API',
    status: 'global'
  },
  'Sell API': {
    US: 'Sell API',
    UK: 'Sell API',
    DE: 'Sell API',
    FR: 'Sell API',
    IT: 'Sell API',
    CA: 'Sell API',
    AU: 'Sell API',
    status: 'global'
  },
  'Trading API': {
    US: 'Trading API',
    UK: 'Trading API',
    DE: 'Trading API',
    FR: 'Trading API',
    IT: 'Trading API',
    CA: 'Trading API',
    AU: 'Trading API',
    status: 'global'
  },
  'Inventory Mapping API': {
    US: 'Inventory Mapping API',
    UK: 'Inventory Mapping API',
    DE: 'Inventory Mapping API',
    FR: 'Inventory Mapping API',
    IT: 'Inventory Mapping API',
    CA: 'Inventory Mapping API',
    AU: 'Inventory Mapping API',
    status: 'global'
  },
  'OAuth Client Library': {
    US: 'OAuth Client Library',
    UK: 'OAuth Client Library',
    DE: 'OAuth Client Library',
    FR: 'OAuth Client Library',
    IT: 'OAuth Client Library',
    CA: 'OAuth Client Library',
    AU: 'OAuth Client Library',
    status: 'global'
  },
  'Feed SDK': {
    US: 'Feed SDK',
    UK: 'Feed SDK',
    DE: 'Feed SDK',
    FR: 'Feed SDK',
    IT: 'Feed SDK',
    CA: 'Feed SDK',
    AU: 'Feed SDK',
    status: 'global'
  },
  'Developer Loyalty Program': {
    US: 'Developer Loyalty Program',
    UK: 'Developer Loyalty Programme',
    DE: 'Entwickler-Treueprogramm',
    FR: 'Programme de fidélité développeur',
    IT: 'Programma fedeltà sviluppatori',
    CA: 'Developer Loyalty Programme',
    AU: 'Developer Loyalty Programme',
    status: 'confirmed'
  },

  // MOBILE APP FEATURES
  'eBay Mobile App': {
    US: 'eBay Mobile App',
    UK: 'eBay Mobile App',
    DE: 'eBay Mobile-App',
    FR: 'Application mobile eBay',
    IT: 'App mobile eBay',
    CA: 'eBay Mobile App',
    AU: 'eBay Mobile App',
    status: 'confirmed'
  },
  'AI Snap': {
    US: 'AI Snap',
    UK: 'AI Snap',
    DE: 'AI Snap',
    FR: 'AI Snap',
    IT: 'AI Snap',
    CA: 'AI Snap',
    AU: 'AI Snap',
    status: 'global'
  },
  'Image Search': {
    US: 'Image Search',
    UK: 'Image Search',
    DE: 'Bildsuche',
    FR: 'Recherche par image',
    IT: 'Ricerca per immagine',
    CA: 'Image Search',
    AU: 'Image Search',
    status: 'confirmed'
  },
  'Push Notifications': {
    US: 'Push Notifications',
    UK: 'Push Notifications',
    DE: 'Push-Benachrichtigungen',
    FR: 'Notifications push',
    IT: 'Notifiche push',
    CA: 'Push Notifications',
    AU: 'Push Notifications',
    status: 'confirmed'
  },
  'In-App QR Code': {
    US: 'In-App QR Code',
    UK: 'In-App QR Code',
    DE: 'In-App-QR-Code',
    FR: 'QR Code intégré',
    IT: 'QR code in-app',
    CA: 'In-App QR Code',
    AU: 'In-App QR Code',
    status: 'confirmed'
  },

  // FEEDBACK & REPUTATION
  'Feedback Score': {
    US: 'Feedback Score',
    UK: 'Feedback Score',
    DE: 'Bewertungspunktzahl',
    FR: 'Score d\'évaluation',
    IT: 'Punteggio feedback',
    CA: 'Feedback Score',
    AU: 'Feedback Score',
    status: 'confirmed'
  },
  'Feedback Profile': {
    US: 'Feedback Profile',
    UK: 'Feedback Profile',
    DE: 'Bewertungsprofil',
    FR: 'Profil d\'évaluation',
    IT: 'Profilo feedback',
    CA: 'Feedback Profile',
    AU: 'Feedback Profile',
    status: 'confirmed'
  },
  'Positive Feedback': {
    US: 'Positive Feedback',
    UK: 'Positive Feedback',
    DE: 'Positives Feedback',
    FR: 'Évaluation positive',
    IT: 'Feedback positivo',
    CA: 'Positive Feedback',
    AU: 'Positive Feedback',
    status: 'confirmed'
  },
  'Negative Feedback': {
    US: 'Negative Feedback',
    UK: 'Negative Feedback',
    DE: 'Negatives Feedback',
    FR: 'Évaluation négative',
    IT: 'Feedback negativo',
    CA: 'Negative Feedback',
    AU: 'Negative Feedback',
    status: 'confirmed'
  },
  'Neutral Feedback': {
    US: 'Neutral Feedback',
    UK: 'Neutral Feedback',
    DE: 'Neutrales Feedback',
    FR: 'Évaluation neutre',
    IT: 'Feedback neutro',
    CA: 'Neutral Feedback',
    AU: 'Neutral Feedback',
    status: 'confirmed'
  },
  'Detailed Seller Ratings': {
    US: 'Detailed Seller Ratings (DSRs)',
    UK: 'Detailed Seller Ratings (DSRs)',
    DE: 'Detaillierte Verkäuferbewertungen',
    FR: 'Évaluations détaillées du vendeur',
    IT: 'Valutazioni dettagliate del venditore',
    CA: 'Detailed Seller Ratings (DSRs)',
    AU: 'Detailed Seller Ratings (DSRs)',
    status: 'confirmed'
  },
  'Feedback Star': {
    US: 'Feedback Star',
    UK: 'Feedback Star',
    DE: 'Bewertungsstern',
    FR: 'Étoile d\'évaluation',
    IT: 'Stella di feedback',
    CA: 'Feedback Star',
    AU: 'Feedback Star',
    status: 'confirmed'
  },
  'Verified Purchase': {
    US: 'Verified Purchase',
    UK: 'Verified Purchase',
    DE: 'Verifizierter Kauf',
    FR: 'Achat vérifié',
    IT: 'Acquisto verificato',
    CA: 'Verified Purchase',
    AU: 'Verified Purchase',
    status: 'confirmed'
  },
  'Seller Reputation': {
    US: 'Seller Reputation',
    UK: 'Seller Reputation',
    DE: 'Verkäufer-Reputation',
    FR: 'Réputation du vendeur',
    IT: 'Reputazione del venditore',
    CA: 'Seller Reputation',
    AU: 'Seller Reputation',
    status: 'confirmed'
  },

  // AUCTION & BIDDING
  'Auction-Style Listing': {
    US: 'Auction-Style Listing',
    UK: 'Auction-Style Listing',
    DE: 'Auktionsangebot',
    FR: 'Annonce de style enchères',
    IT: 'Inserzione in stile asta',
    CA: 'Auction-Style Listing',
    AU: 'Auction-Style Listing',
    status: 'confirmed'
  },
  'Reserve Price': {
    US: 'Reserve Price',
    UK: 'Reserve Price',
    DE: 'Mindestpreis',
    FR: 'Prix de réserve',
    IT: 'Prezzo di riserva',
    CA: 'Reserve Price',
    AU: 'Reserve Price',
    status: 'confirmed'
  },
  'Starting Bid': {
    US: 'Starting Bid',
    UK: 'Starting Bid',
    DE: 'Startgebot',
    FR: 'Enchère de départ',
    IT: 'Offerta iniziale',
    CA: 'Starting Bid',
    AU: 'Starting Bid',
    status: 'confirmed'
  },
  'Current Bid': {
    US: 'Current Bid',
    UK: 'Current Bid',
    DE: 'Aktuelles Gebot',
    FR: 'Enchère actuelle',
    IT: 'Offerta corrente',
    CA: 'Current Bid',
    AU: 'Current Bid',
    status: 'confirmed'
  },
  'Highest Bidder': {
    US: 'Highest Bidder',
    UK: 'Highest Bidder',
    DE: 'Höchstbietender',
    FR: 'Meilleur enchérisseur',
    IT: 'Offerente più alto',
    CA: 'Highest Bidder',
    AU: 'Highest Bidder',
    status: 'confirmed'
  },
  'Place Bid': {
    US: 'Place Bid',
    UK: 'Place Bid',
    DE: 'Gebot abgeben',
    FR: 'Faire une enchère',
    IT: 'Fai un\'offerta',
    CA: 'Place Bid',
    AU: 'Place Bid',
    status: 'confirmed'
  },
  'Automatic Bidding': {
    US: 'Automatic Bidding',
    UK: 'Automatic Bidding',
    DE: 'Automatisches Bieten',
    FR: 'Enchères automatiques',
    IT: 'Offerte automatiche',
    CA: 'Automatic Bidding',
    AU: 'Automatic Bidding',
    status: 'confirmed'
  },
  'Maximum Bid': {
    US: 'Maximum Bid',
    UK: 'Maximum Bid',
    DE: 'Maximalgebot',
    FR: 'Enchère maximale',
    IT: 'Offerta massima',
    CA: 'Maximum Bid',
    AU: 'Maximum Bid',
    status: 'confirmed'
  },
  'Reserve Not Met': {
    US: 'Reserve Not Met',
    UK: 'Reserve Not Met',
    DE: 'Mindestpreis nicht erreicht',
    FR: 'Réserve non atteinte',
    IT: 'Riserva non raggiunta',
    CA: 'Reserve Not Met',
    AU: 'Reserve Not Met',
    status: 'confirmed'
  },

  // CHARITY PROGRAMS
  'PayPal Giving Fund': {
    US: 'PayPal Giving Fund',
    UK: 'PayPal Giving Fund',
    DE: 'PayPal Giving Fund',
    FR: 'PayPal Giving Fund',
    IT: 'PayPal Giving Fund',
    CA: 'PayPal Giving Fund',
    AU: 'PayPal Giving Fund',
    status: 'global'
  },
  'Charity Listing': {
    US: 'Charity Listing',
    UK: 'Charity Listing',
    DE: 'Wohltätigkeitsangebot',
    FR: 'Annonce caritative',
    IT: 'Inserzione benefica',
    CA: 'Charity Listing',
    AU: 'Charity Listing',
    status: 'confirmed'
  },
  'Donate Now': {
    US: 'Donate Now',
    UK: 'Donate Now',
    DE: 'Jetzt spenden',
    FR: 'Faire un don maintenant',
    IT: 'Dona ora',
    CA: 'Donate Now',
    AU: 'Donate Now',
    status: 'confirmed'
  },
  'Charity Percentage': {
    US: 'Charity Percentage',
    UK: 'Charity Percentage',
    DE: 'Spendenanteil',
    FR: 'Pourcentage caritatif',
    IT: 'Percentuale benefica',
    CA: 'Charity Percentage',
    AU: 'Charity Percentage',
    status: 'confirmed'
  },
  'eBay Foundation': {
    US: 'eBay Foundation',
    UK: 'eBay Foundation',
    DE: 'eBay Foundation',
    FR: 'eBay Foundation',
    IT: 'eBay Foundation',
    CA: 'eBay Foundation',
    AU: 'eBay Foundation',
    status: 'global'
  },

  // SEARCH & FILTERS
  'Advanced Search': {
    US: 'Advanced Search',
    UK: 'Advanced Search',
    DE: 'Erweiterte Suche',
    FR: 'Recherche avancée',
    IT: 'Ricerca avanzata',
    CA: 'Advanced Search',
    AU: 'Advanced Search',
    status: 'confirmed'
  },
  'Best Match': {
    US: 'Best Match',
    UK: 'Best Match',
    DE: 'Beste Ergebnisse',
    FR: 'Meilleurs résultats',
    IT: 'Migliori risultati',
    CA: 'Best Match',
    AU: 'Best Match',
    status: 'confirmed'
  },
  'Sort By': {
    US: 'Sort By',
    UK: 'Sort By',
    DE: 'Sortieren nach',
    FR: 'Trier par',
    IT: 'Ordina per',
    CA: 'Sort By',
    AU: 'Sort By',
    status: 'confirmed'
  },
  'Filter Results': {
    US: 'Filter Results',
    UK: 'Filter Results',
    DE: 'Ergebnisse filtern',
    FR: 'Filtrer les résultats',
    IT: 'Filtra risultati',
    CA: 'Filter Results',
    AU: 'Filter Results',
    status: 'confirmed'
  },
  'Price Range': {
    US: 'Price Range',
    UK: 'Price Range',
    DE: 'Preisspanne',
    FR: 'Gamme de prix',
    IT: 'Fascia di prezzo',
    CA: 'Price Range',
    AU: 'Price Range',
    status: 'confirmed'
  },
  'Condition Filter': {
    US: 'Condition Filter',
    UK: 'Condition Filter',
    DE: 'Zustandsfilter',
    FR: 'Filtre de condition',
    IT: 'Filtro condizione',
    CA: 'Condition Filter',
    AU: 'Condition Filter',
    status: 'confirmed'
  },
  'Sold Listings': {
    US: 'Sold Listings',
    UK: 'Sold Listings',
    DE: 'Verkaufte Artikel',
    FR: 'Annonces vendues',
    IT: 'Inserzioni vendute',
    CA: 'Sold Listings',
    AU: 'Sold Listings',
    status: 'confirmed'
  },
  'Completed Listings': {
    US: 'Completed Listings',
    UK: 'Completed Listings',
    DE: 'Beendete Angebote',
    FR: 'Annonces terminées',
    IT: 'Inserzioni concluse',
    CA: 'Completed Listings',
    AU: 'Completed Listings',
    status: 'confirmed'
  },
  'Newly Listed': {
    US: 'Newly Listed',
    UK: 'Newly Listed',
    DE: 'Neu eingestellt',
    FR: 'Nouvellement répertorié',
    IT: 'Appena inseriti',
    CA: 'Newly Listed',
    AU: 'Newly Listed',
    status: 'confirmed'
  },
  'Delivery Options': {
    US: 'Delivery Options',
    UK: 'Delivery Options',
    DE: 'Lieferoptionen',
    FR: 'Options de livraison',
    IT: 'Opzioni di consegna',
    CA: 'Delivery Options',
    AU: 'Delivery Options',
    status: 'confirmed'
  },
  'Lockable Filters': {
    US: 'Lockable Filters',
    UK: 'Lockable Filters',
    DE: 'Sperrbare Filter',
    FR: 'Filtres verrouillables',
    IT: 'Filtri bloccabili',
    CA: 'Lockable Filters',
    AU: 'Lockable Filters',
    status: 'confirmed'
  },

  // PHOTOS & IMAGES
  'eBay Picture Services': {
    US: 'eBay Picture Services (EPS)',
    UK: 'eBay Picture Services (EPS)',
    DE: 'eBay-Bilderservice',
    FR: 'Services d\'images eBay',
    IT: 'Servizi immagini eBay',
    CA: 'eBay Picture Services (EPS)',
    AU: 'eBay Picture Services (EPS)',
    status: 'confirmed'
  },
  'Gallery Picture': {
    US: 'Gallery Picture',
    UK: 'Gallery Picture',
    DE: 'Galerieansicht',
    FR: 'Image de galerie',
    IT: 'Immagine galleria',
    CA: 'Gallery Picture',
    AU: 'Gallery Picture',
    status: 'confirmed'
  },
  'Gallery Plus': {
    US: 'Gallery Plus',
    UK: 'Gallery Plus',
    DE: 'Galerie Plus',
    FR: 'Galerie Plus',
    IT: 'Galleria Plus',
    CA: 'Gallery Plus',
    AU: 'Gallery Plus',
    status: 'confirmed'
  },
  'Supersize Pictures': {
    US: 'Supersize Pictures',
    UK: 'Supersize Pictures',
    DE: 'Supergroße Bilder',
    FR: 'Images très agrandies',
    IT: 'Immagini superdimensionate',
    CA: 'Supersize Pictures',
    AU: 'Supersize Pictures',
    status: 'confirmed'
  },
  'Picture Zoom': {
    US: 'Picture Zoom',
    UK: 'Picture Zoom',
    DE: 'Bildzoom',
    FR: 'Zoom sur l\'image',
    IT: 'Zoom immagine',
    CA: 'Picture Zoom',
    AU: 'Picture Zoom',
    status: 'confirmed'
  },
  'Self-Hosted Images': {
    US: 'Self-Hosted Images',
    UK: 'Self-Hosted Images',
    DE: 'Selbst gehostete Bilder',
    FR: 'Images auto-hébergées',
    IT: 'Immagini self-hosted',
    CA: 'Self-Hosted Images',
    AU: 'Self-Hosted Images',
    status: 'confirmed'
  },

  // MESSAGING & COMMUNICATION
  'Messages': {
    US: 'Messages',
    UK: 'Messages',
    DE: 'Nachrichten',
    FR: 'Messages',
    IT: 'Messaggi',
    CA: 'Messages',
    AU: 'Messages',
    status: 'confirmed'
  },
  'Contact Seller': {
    US: 'Contact Seller',
    UK: 'Contact Seller',
    DE: 'Verkäufer kontaktieren',
    FR: 'Contacter le vendeur',
    IT: 'Contatta il venditore',
    CA: 'Contact Seller',
    AU: 'Contact Seller',
    status: 'confirmed'
  },
  'Contact Buyer': {
    US: 'Contact Buyer',
    UK: 'Contact Buyer',
    DE: 'Käufer kontaktieren',
    FR: 'Contacter l\'acheteur',
    IT: 'Contatta l\'acquirente',
    CA: 'Contact Buyer',
    AU: 'Contact Buyer',
    status: 'confirmed'
  },
  'Email Alias': {
    US: 'Email Alias',
    UK: 'Email Alias',
    DE: 'E-Mail-Alias',
    FR: 'Alias de messagerie',
    IT: 'Alias email',
    CA: 'Email Alias',
    AU: 'Email Alias',
    status: 'confirmed'
  },
  'Member-to-Member Contact': {
    US: 'Member-to-Member Contact',
    UK: 'Member-to-Member Contact',
    DE: 'Mitglied-zu-Mitglied-Kontakt',
    FR: 'Contact entre membres',
    IT: 'Contatto tra membri',
    CA: 'Member-to-Member Contact',
    AU: 'Member-to-Member Contact',
    status: 'confirmed'
  },
  'eBay.ai Message Assistant': {
    US: 'eBay.ai Message Assistant',
    UK: 'eBay.ai Message Assistant',
    DE: 'eBay.ai Nachrichten-Assistent',
    FR: 'Assistant de messagerie eBay.ai',
    IT: 'Assistente messaggi eBay.ai',
    CA: 'eBay.ai Message Assistant',
    AU: 'eBay.ai Message Assistant',
    status: 'confirmed'
  },

  // LISTING TEMPLATES & DESIGN
  'Listing Template': {
    US: 'Listing Template',
    UK: 'Listing Template',
    DE: 'Angebotsvorlage',
    FR: 'Modèle d\'annonce',
    IT: 'Modello di inserzione',
    CA: 'Listing Template',
    AU: 'Listing Template',
    status: 'confirmed'
  },
  'Listing Designer': {
    US: 'Listing Designer',
    UK: 'Listing Designer',
    DE: 'Angebotsdesigner',
    FR: 'Concepteur d\'annonces',
    IT: 'Designer di inserzioni',
    CA: 'Listing Designer',
    AU: 'Listing Designer',
    status: 'confirmed'
  },
  'Custom Template': {
    US: 'Custom Template',
    UK: 'Custom Template',
    DE: 'Benutzerdefinierte Vorlage',
    FR: 'Modèle personnalisé',
    IT: 'Modello personalizzato',
    CA: 'Custom Template',
    AU: 'Custom Template',
    status: 'confirmed'
  },
  'Mobile-Responsive Template': {
    US: 'Mobile-Responsive Template',
    UK: 'Mobile-Responsive Template',
    DE: 'Mobile-responsive Vorlage',
    FR: 'Modèle adaptatif mobile',
    IT: 'Modello responsive mobile',
    CA: 'Mobile-Responsive Template',
    AU: 'Mobile-Responsive Template',
    status: 'confirmed'
  },
  'Active Content Policy': {
    US: 'Active Content Policy',
    UK: 'Active Content Policy',
    DE: 'Richtlinie zu aktiven Inhalten',
    FR: 'Politique de contenu actif',
    IT: 'Politica sui contenuti attivi',
    CA: 'Active Content Policy',
    AU: 'Active Content Policy',
    status: 'confirmed'
  },

  // VACATION & TIME AWAY
  'Time Away': {
    US: 'Time Away',
    UK: 'Time Away',
    DE: 'Abwesenheit',
    FR: 'Temps d\'absence',
    IT: 'Tempo lontano',
    CA: 'Time Away',
    AU: 'Time Away',
    status: 'confirmed'
  },
  'Vacation Mode': {
    US: 'Vacation Mode',
    UK: 'Holiday Mode',
    DE: 'Urlaubsmodus',
    FR: 'Mode vacances',
    IT: 'Modalità vacanza',
    CA: 'Vacation Mode',
    AU: 'Holiday Mode',
    status: 'confirmed'
  },
  'Allow Item Sales': {
    US: 'Allow Item Sales',
    UK: 'Allow Item Sales',
    DE: 'Artikelverkäufe zulassen',
    FR: 'Autoriser les ventes d\'articles',
    IT: 'Consenti vendite articoli',
    CA: 'Allow Item Sales',
    AU: 'Allow Item Sales',
    status: 'confirmed'
  },
  'Pause Item Sales': {
    US: 'Pause Item Sales',
    UK: 'Pause Item Sales',
    DE: 'Artikelverkäufe pausieren',
    FR: 'Suspendre les ventes d\'articles',
    IT: 'Sospendi vendite articoli',
    CA: 'Pause Item Sales',
    AU: 'Pause Item Sales',
    status: 'confirmed'
  },

  // TAX & INVOICING
  'Tax Invoice': {
    US: 'Tax Invoice',
    UK: 'Tax Invoice',
    DE: 'Steuerrechnung',
    FR: 'Facture fiscale',
    IT: 'Fattura fiscale',
    CA: 'Tax Invoice',
    AU: 'Tax Invoice',
    status: 'confirmed'
  },
  'VAT': {
    US: 'VAT (Value Added Tax)',
    UK: 'VAT (Value Added Tax)',
    DE: 'MwSt. (Mehrwertsteuer)',
    FR: 'TVA (Taxe sur la valeur ajoutée)',
    IT: 'IVA (Imposta sul valore aggiunto)',
    CA: 'VAT (Value Added Tax)',
    AU: 'GST (Goods and Services Tax)',
    status: 'confirmed'
  },
  'GST': {
    US: 'GST (Goods and Services Tax)',
    UK: 'GST (Goods and Services Tax)',
    DE: 'GST (Waren- und Dienstleistungssteuer)',
    FR: 'TPS (Taxe sur les produits et services)',
    IT: 'GST (Imposta su beni e servizi)',
    CA: 'GST (Goods and Services Tax)',
    AU: 'GST (Goods and Services Tax)',
    status: 'confirmed'
  },
  'Sales Tax': {
    US: 'Sales Tax',
    UK: 'Sales Tax',
    DE: 'Verkaufssteuer',
    FR: 'Taxe de vente',
    IT: 'Tassa di vendita',
    CA: 'Sales Tax',
    AU: 'Sales Tax',
    status: 'confirmed'
  },
  'Seller Invoice': {
    US: 'Seller Invoice',
    UK: 'Seller Invoice',
    DE: 'Verkäuferrechnung',
    FR: 'Facture vendeur',
    IT: 'Fattura venditore',
    CA: 'Seller Invoice',
    AU: 'Seller Invoice',
    status: 'confirmed'
  },
  'Marketplace Facilitator VAT': {
    US: 'Marketplace Facilitator VAT',
    UK: 'Marketplace Facilitator VAT',
    DE: 'Marktplatz-Erleichterer-MwSt.',
    FR: 'TVA de facilitateur de marché',
    IT: 'IVA facilitatore marketplace',
    CA: 'Marketplace Facilitator VAT',
    AU: 'Marketplace Facilitator GST',
    status: 'confirmed'
  },

  // UNPAID ITEMS & DISPUTES
  'Unpaid Item': {
    US: 'Unpaid Item',
    UK: 'Unpaid Item',
    DE: 'Unbezahlter Artikel',
    FR: 'Article non payé',
    IT: 'Articolo non pagato',
    CA: 'Unpaid Item',
    AU: 'Unpaid Item',
    status: 'confirmed'
  },
  'Unpaid Item Case': {
    US: 'Unpaid Item Case',
    UK: 'Unpaid Item Case',
    DE: 'Fall unbezahlter Artikel',
    FR: 'Cas d\'article non payé',
    IT: 'Caso articolo non pagato',
    CA: 'Unpaid Item Case',
    AU: 'Unpaid Item Case',
    status: 'confirmed'
  },
  'Buyer Hasn\'t Paid': {
    US: 'Buyer Hasn\'t Paid',
    UK: 'Buyer Hasn\'t Paid',
    DE: 'Käufer hat nicht bezahlt',
    FR: 'L\'acheteur n\'a pas payé',
    IT: 'L\'acquirente non ha pagato',
    CA: 'Buyer Hasn\'t Paid',
    AU: 'Buyer Hasn\'t Paid',
    status: 'confirmed'
  },
  'Unpaid Cancellation Record': {
    US: 'Unpaid Cancellation Record',
    UK: 'Unpaid Cancellation Record',
    DE: 'Stornierungsaufzeichnung unbezahlt',
    FR: 'Enregistrement d\'annulation impayée',
    IT: 'Registrazione annullamento non pagato',
    CA: 'Unpaid Cancellation Record',
    AU: 'Unpaid Cancellation Record',
    status: 'confirmed'
  },
  'Automatic Cancellation': {
    US: 'Automatic Cancellation',
    UK: 'Automatic Cancellation',
    DE: 'Automatische Stornierung',
    FR: 'Annulation automatique',
    IT: 'Annullamento automatico',
    CA: 'Automatic Cancellation',
    AU: 'Automatic Cancellation',
    status: 'confirmed'
  },
  'Final Value Fee Credit': {
    US: 'Final Value Fee Credit',
    UK: 'Final Value Fee Credit',
    DE: 'Verkaufsprovisions-Gutschrift',
    FR: 'Crédit de frais de valeur finale',
    IT: 'Credito commissione valore finale',
    CA: 'Final Value Fee Credit',
    AU: 'Final Value Fee Credit',
    status: 'confirmed'
  },

  // CATEGORY-SPECIFIC FEATURES
  'Fitment Data': {
    US: 'Fitment Data',
    UK: 'Fitment Data',
    DE: 'Passformdaten',
    FR: 'Données de compatibilité',
    IT: 'Dati di compatibilità',
    CA: 'Fitment Data',
    AU: 'Fitment Data',
    status: 'confirmed'
  },
  'Parts Compatibility': {
    US: 'Parts Compatibility',
    UK: 'Parts Compatibility',
    DE: 'Teilekompatibilität',
    FR: 'Compatibilité des pièces',
    IT: 'Compatibilità dei pezzi',
    CA: 'Parts Compatibility',
    AU: 'Parts Compatibility',
    status: 'confirmed'
  },
  'Dual Category Listing': {
    US: 'Dual Category Listing',
    UK: 'Dual Category Listing',
    DE: 'Doppelkategorie-Angebot',
    FR: 'Annonce double catégorie',
    IT: 'Inserzione doppia categoria',
    CA: 'Dual Category Listing',
    AU: 'Dual Category Listing',
    status: 'confirmed'
  },
  'GetCategoryFeatures': {
    US: 'GetCategoryFeatures',
    UK: 'GetCategoryFeatures',
    DE: 'GetCategoryFeatures',
    FR: 'GetCategoryFeatures',
    IT: 'GetCategoryFeatures',
    CA: 'GetCategoryFeatures',
    AU: 'GetCategoryFeatures',
    status: 'global'
  },

  // ITEM CONDITION STATES
  'Brand New': {
    US: 'Brand New',
    UK: 'Brand New',
    DE: 'Brandneu',
    FR: 'Neuf',
    IT: 'Nuovo di zecca',
    CA: 'Brand New',
    AU: 'Brand New',
    status: 'confirmed'
  },
  'New with Tags': {
    US: 'New with Tags',
    UK: 'New with Tags',
    DE: 'Neu mit Etikett',
    FR: 'Neuf avec étiquettes',
    IT: 'Nuovo con cartellino',
    CA: 'New with Tags',
    AU: 'New with Tags',
    status: 'confirmed'
  },
  'New without Tags': {
    US: 'New without Tags',
    UK: 'New without Tags',
    DE: 'Neu ohne Etikett',
    FR: 'Neuf sans étiquettes',
    IT: 'Nuovo senza cartellino',
    CA: 'New without Tags',
    AU: 'New without Tags',
    status: 'confirmed'
  },
  'New with Defects': {
    US: 'New with Defects',
    UK: 'New with Defects',
    DE: 'Neu mit Mängeln',
    FR: 'Neuf avec défauts',
    IT: 'Nuovo con difetti',
    CA: 'New with Defects',
    AU: 'New with Defects',
    status: 'confirmed'
  },
  'Used': {
    US: 'Used',
    UK: 'Used',
    DE: 'Gebraucht',
    FR: 'Occasion',
    IT: 'Usato',
    CA: 'Used',
    AU: 'Used',
    status: 'confirmed'
  },
  'Pre-Owned': {
    US: 'Pre-Owned',
    UK: 'Pre-Owned',
    DE: 'Gebraucht',
    FR: 'D\'occasion',
    IT: 'Usato',
    CA: 'Pre-Owned',
    AU: 'Pre-Owned',
    status: 'confirmed'
  },
  'Like New': {
    US: 'Like New',
    UK: 'Like New',
    DE: 'Wie neu',
    FR: 'Comme neuf',
    IT: 'Come nuovo',
    CA: 'Like New',
    AU: 'Like New',
    status: 'confirmed'
  },
  'Very Good': {
    US: 'Very Good',
    UK: 'Very Good',
    DE: 'Sehr gut',
    FR: 'Très bon état',
    IT: 'Molto buono',
    CA: 'Very Good',
    AU: 'Very Good',
    status: 'confirmed'
  },
  'Good': {
    US: 'Good',
    UK: 'Good',
    DE: 'Gut',
    FR: 'Bon état',
    IT: 'Buono',
    CA: 'Good',
    AU: 'Good',
    status: 'confirmed'
  },
  'Acceptable': {
    US: 'Acceptable',
    UK: 'Acceptable',
    DE: 'Akzeptabel',
    FR: 'Acceptable',
    IT: 'Accettabile',
    CA: 'Acceptable',
    AU: 'Acceptable',
    status: 'confirmed'
  },
  'For Parts or Not Working': {
    US: 'For Parts or Not Working',
    UK: 'For Parts or Not Working',
    DE: 'Defekt oder für Ersatzteile',
    FR: 'Pour pièces détachées ou ne fonctionne pas',
    IT: 'Per ricambi o non funzionante',
    CA: 'For Parts or Not Working',
    AU: 'For Parts or Not Working',
    status: 'confirmed'
  },
  'Manufacturer Refurbished': {
    US: 'Manufacturer Refurbished',
    UK: 'Manufacturer Refurbished',
    DE: 'Vom Hersteller generalüberholt',
    FR: 'Reconditionné par le fabricant',
    IT: 'Ricondizionato dal produttore',
    CA: 'Manufacturer Refurbished',
    AU: 'Manufacturer Refurbished',
    status: 'confirmed'
  },
  'Condition Description': {
    US: 'Condition Description',
    UK: 'Condition Description',
    DE: 'Zustandsbeschreibung',
    FR: 'Description de l\'état',
    IT: 'Descrizione condizione',
    CA: 'Condition Description',
    AU: 'Condition Description',
    status: 'confirmed'
  },

  // LISTING DURATION
  '1-Day Listing': {
    US: '1-Day Listing',
    UK: '1-Day Listing',
    DE: '1-Tages-Angebot',
    FR: 'Annonce 1 jour',
    IT: 'Inserzione 1 giorno',
    CA: '1-Day Listing',
    AU: '1-Day Listing',
    status: 'confirmed'
  },
  '3-Day Listing': {
    US: '3-Day Listing',
    UK: '3-Day Listing',
    DE: '3-Tages-Angebot',
    FR: 'Annonce 3 jours',
    IT: 'Inserzione 3 giorni',
    CA: '3-Day Listing',
    AU: '3-Day Listing',
    status: 'confirmed'
  },
  '5-Day Listing': {
    US: '5-Day Listing',
    UK: '5-Day Listing',
    DE: '5-Tages-Angebot',
    FR: 'Annonce 5 jours',
    IT: 'Inserzione 5 giorni',
    CA: '5-Day Listing',
    AU: '5-Day Listing',
    status: 'confirmed'
  },
  '7-Day Listing': {
    US: '7-Day Listing',
    UK: '7-Day Listing',
    DE: '7-Tages-Angebot',
    FR: 'Annonce 7 jours',
    IT: 'Inserzione 7 giorni',
    CA: '7-Day Listing',
    AU: '7-Day Listing',
    status: 'confirmed'
  },
  '10-Day Listing': {
    US: '10-Day Listing',
    UK: '10-Day Listing',
    DE: '10-Tages-Angebot',
    FR: 'Annonce 10 jours',
    IT: 'Inserzione 10 giorni',
    CA: '10-Day Listing',
    AU: '10-Day Listing',
    status: 'confirmed'
  },
  'Good \'Til Cancelled': {
    US: 'Good \'Til Cancelled (GTC)',
    UK: 'Good \'Til Cancelled (GTC)',
    DE: 'Unbefristet (GTC)',
    FR: 'Valable jusqu\'à annulation (GTC)',
    IT: 'Valido fino a cancellazione (GTC)',
    CA: 'Good \'Til Cancelled (GTC)',
    AU: 'Good \'Til Cancelled (GTC)',
    status: 'confirmed'
  },
  'Special Duration Fee': {
    US: 'Special Duration Fee',
    UK: 'Special Duration Fee',
    DE: 'Sonderlaufzeitgebühr',
    FR: 'Frais de durée spéciale',
    IT: 'Commissione durata speciale',
    CA: 'Special Duration Fee',
    AU: 'Special Duration Fee',
    status: 'confirmed'
  },
  'Auto-Relist': {
    US: 'Auto-Relist',
    UK: 'Auto-Relist',
    DE: 'Automatisch erneut einstellen',
    FR: 'Remise en vente automatique',
    IT: 'Reinserzione automatica',
    CA: 'Auto-Relist',
    AU: 'Auto-Relist',
    status: 'confirmed'
  },

  // WATCH LIST & FOLLOWING
  'Add to Watch List': {
    US: 'Add to Watch List',
    UK: 'Add to Watch List',
    DE: 'Zur Beobachtungsliste hinzufügen',
    FR: 'Ajouter à la liste de suivi',
    IT: 'Aggiungi agli oggetti osservati',
    CA: 'Add to Watch List',
    AU: 'Add to Watch List',
    status: 'confirmed'
  },
  'Saved Seller': {
    US: 'Saved Seller',
    UK: 'Saved Seller',
    DE: 'Gespeicherter Verkäufer',
    FR: 'Vendeur enregistré',
    IT: 'Venditore salvato',
    CA: 'Saved Seller',
    AU: 'Saved Seller',
    status: 'confirmed'
  },
  'Follow Seller': {
    US: 'Follow Seller',
    UK: 'Follow Seller',
    DE: 'Verkäufer folgen',
    FR: 'Suivre le vendeur',
    IT: 'Segui il venditore',
    CA: 'Follow Seller',
    AU: 'Follow Seller',
    status: 'confirmed'
  },
  'Store Followers': {
    US: 'Store Followers',
    UK: 'Shop Followers',
    DE: 'Shop-Follower',
    FR: 'Abonnés de la boutique',
    IT: 'Follower del negozio',
    CA: 'Store Followers',
    AU: 'Store Followers',
    status: 'confirmed'
  },
  'Seller Growth Dashboard': {
    US: 'Seller Growth Dashboard',
    UK: 'Seller Growth Dashboard',
    DE: 'Verkäufer-Wachstums-Dashboard',
    FR: 'Tableau de bord de croissance vendeur',
    IT: 'Dashboard crescita venditore',
    CA: 'Seller Growth Dashboard',
    AU: 'Seller Growth Dashboard',
    status: 'confirmed'
  },
  'Custom List': {
    US: 'Custom List',
    UK: 'Custom List',
    DE: 'Benutzerdefinierte Liste',
    FR: 'Liste personnalisée',
    IT: 'Lista personalizzata',
    CA: 'Custom List',
    AU: 'Custom List',
    status: 'confirmed'
  },

  // OFFERS & NEGOTIATION
  'Make Offer': {
    US: 'Make Offer',
    UK: 'Make Offer',
    DE: 'Preisvorschlag senden',
    FR: 'Faire une offre',
    IT: 'Fai un\'offerta',
    CA: 'Make Offer',
    AU: 'Make Offer',
    status: 'confirmed'
  },
  'Accept Offer': {
    US: 'Accept Offer',
    UK: 'Accept Offer',
    DE: 'Angebot annehmen',
    FR: 'Accepter l\'offre',
    IT: 'Accetta offerta',
    CA: 'Accept Offer',
    AU: 'Accept Offer',
    status: 'confirmed'
  },
  'Decline Offer': {
    US: 'Decline Offer',
    UK: 'Decline Offer',
    DE: 'Angebot ablehnen',
    FR: 'Refuser l\'offre',
    IT: 'Rifiuta offerta',
    CA: 'Decline Offer',
    AU: 'Decline Offer',
    status: 'confirmed'
  },
  'Counter Offer': {
    US: 'Counter Offer',
    UK: 'Counter Offer',
    DE: 'Gegenangebot',
    FR: 'Contre-offre',
    IT: 'Controfferta',
    CA: 'Counter Offer',
    AU: 'Counter Offer',
    status: 'confirmed'
  },
  'Seller Initiated Offer': {
    US: 'Seller Initiated Offer',
    UK: 'Seller Initiated Offer',
    DE: 'Vom Verkäufer initiiertes Angebot',
    FR: 'Offre initiée par le vendeur',
    IT: 'Offerta avviata dal venditore',
    CA: 'Seller Initiated Offer',
    AU: 'Seller Initiated Offer',
    status: 'confirmed'
  },
  'Auto-Accept': {
    US: 'Auto-Accept',
    UK: 'Auto-Accept',
    DE: 'Automatisch annehmen',
    FR: 'Acceptation automatique',
    IT: 'Accettazione automatica',
    CA: 'Auto-Accept',
    AU: 'Auto-Accept',
    status: 'confirmed'
  },
  'Auto-Decline': {
    US: 'Auto-Decline',
    UK: 'Auto-Decline',
    DE: 'Automatisch ablehnen',
    FR: 'Refus automatique',
    IT: 'Rifiuto automatico',
    CA: 'Auto-Decline',
    AU: 'Auto-Decline',
    status: 'confirmed'
  },
  'Offer Retraction': {
    US: 'Offer Retraction',
    UK: 'Offer Retraction',
    DE: 'Angebotsrücknahme',
    FR: 'Rétractation d\'offre',
    IT: 'Ritiro offerta',
    CA: 'Offer Retraction',
    AU: 'Offer Retraction',
    status: 'confirmed'
  },

  // QUANTITY & VARIATIONS
  'Multi-Quantity Listing': {
    US: 'Multi-Quantity Listing',
    UK: 'Multi-Quantity Listing',
    DE: 'Angebot mit mehreren Mengen',
    FR: 'Annonce multi-quantité',
    IT: 'Inserzione multi-quantità',
    CA: 'Multi-Quantity Listing',
    AU: 'Multi-Quantity Listing',
    status: 'confirmed'
  },
  'Quantity Available': {
    US: 'Quantity Available',
    UK: 'Quantity Available',
    DE: 'Verfügbare Menge',
    FR: 'Quantité disponible',
    IT: 'Quantità disponibile',
    CA: 'Quantity Available',
    AU: 'Quantity Available',
    status: 'confirmed'
  },
  'Lot Size': {
    US: 'Lot Size',
    UK: 'Lot Size',
    DE: 'Losgröße',
    FR: 'Taille du lot',
    IT: 'Dimensione lotto',
    CA: 'Lot Size',
    AU: 'Lot Size',
    status: 'confirmed'
  },
  'Bundle': {
    US: 'Bundle',
    UK: 'Bundle',
    DE: 'Bündel',
    FR: 'Lot groupé',
    IT: 'Bundle',
    CA: 'Bundle',
    AU: 'Bundle',
    status: 'confirmed'
  },
  'Kit': {
    US: 'Kit',
    UK: 'Kit',
    DE: 'Set',
    FR: 'Kit',
    IT: 'Kit',
    CA: 'Kit',
    AU: 'Kit',
    status: 'confirmed'
  },
  'Variations': {
    US: 'Variations',
    UK: 'Variations',
    DE: 'Varianten',
    FR: 'Variations',
    IT: 'Varianti',
    CA: 'Variations',
    AU: 'Variations',
    status: 'confirmed'
  },
  'Listing with Variations': {
    US: 'Listing with Variations',
    UK: 'Listing with Variations',
    DE: 'Angebot mit Varianten',
    FR: 'Annonce avec variations',
    IT: 'Inserzione con varianti',
    CA: 'Listing with Variations',
    AU: 'Listing with Variations',
    status: 'confirmed'
  },
  'Variation Option': {
    US: 'Variation Option',
    UK: 'Variation Option',
    DE: 'Variantenoption',
    FR: 'Option de variation',
    IT: 'Opzione variante',
    CA: 'Variation Option',
    AU: 'Variation Option',
    status: 'confirmed'
  },
  'Color Variation': {
    US: 'Color Variation',
    UK: 'Colour Variation',
    DE: 'Farbvariante',
    FR: 'Variation de couleur',
    IT: 'Variante colore',
    CA: 'Colour Variation',
    AU: 'Colour Variation',
    status: 'confirmed'
  },
  'Size Variation': {
    US: 'Size Variation',
    UK: 'Size Variation',
    DE: 'Größenvariante',
    FR: 'Variation de taille',
    IT: 'Variante taglia',
    CA: 'Size Variation',
    AU: 'Size Variation',
    status: 'confirmed'
  },

  // BUYER REQUIREMENTS & BLOCKING
  'Buyer Requirements': {
    US: 'Buyer Requirements',
    UK: 'Buyer Requirements',
    DE: 'Käuferanforderungen',
    FR: 'Conditions d\'achat',
    IT: 'Requisiti acquirente',
    CA: 'Buyer Requirements',
    AU: 'Buyer Requirements',
    status: 'confirmed'
  },
  'Block Buyer': {
    US: 'Block Buyer',
    UK: 'Block Buyer',
    DE: 'Käufer blockieren',
    FR: 'Bloquer l\'acheteur',
    IT: 'Blocca acquirente',
    CA: 'Block Buyer',
    AU: 'Block Buyer',
    status: 'confirmed'
  },
  'Blocked Bidders List': {
    US: 'Blocked Bidders List',
    UK: 'Blocked Bidders List',
    DE: 'Liste blockierter Bieter',
    FR: 'Liste des enchérisseurs bloqués',
    IT: 'Elenco offerenti bloccati',
    CA: 'Blocked Bidders List',
    AU: 'Blocked Bidders List',
    status: 'confirmed'
  },
  'Purchase Limit': {
    US: 'Purchase Limit',
    UK: 'Purchase Limit',
    DE: 'Kauflimit',
    FR: 'Limite d\'achat',
    IT: 'Limite di acquisto',
    CA: 'Purchase Limit',
    AU: 'Purchase Limit',
    status: 'confirmed'
  },
  'Buying Restrictions': {
    US: 'Buying Restrictions',
    UK: 'Buying Restrictions',
    DE: 'Kaufbeschränkungen',
    FR: 'Restrictions d\'achat',
    IT: 'Restrizioni di acquisto',
    CA: 'Buying Restrictions',
    AU: 'Buying Restrictions',
    status: 'confirmed'
  },
  'Excluded Shipping Locations': {
    US: 'Excluded Shipping Locations',
    UK: 'Excluded Postage Locations',
    DE: 'Ausgeschlossene Versandorte',
    FR: 'Lieux d\'expédition exclus',
    IT: 'Località di spedizione escluse',
    CA: 'Excluded Shipping Locations',
    AU: 'Excluded Shipping Locations',
    status: 'confirmed'
  },
  'Low Feedback Score': {
    US: 'Low Feedback Score',
    UK: 'Low Feedback Score',
    DE: 'Niedrige Bewertungspunktzahl',
    FR: 'Score d\'évaluation faible',
    IT: 'Punteggio feedback basso',
    CA: 'Low Feedback Score',
    AU: 'Low Feedback Score',
    status: 'confirmed'
  },

  // PRIVATE LISTINGS
  'Private Listing': {
    US: 'Private Listing',
    UK: 'Private Listing',
    DE: 'Private Anzeige',
    FR: 'Annonce privée',
    IT: 'Inserzione privata',
    CA: 'Private Listing',
    AU: 'Private Listing',
    status: 'confirmed'
  },
  'Bidders\' Identities Protected': {
    US: 'Bidders\' Identities Protected',
    UK: 'Bidders\' Identities Protected',
    DE: 'Identitäten der Bieter geschützt',
    FR: 'Identités des enchérisseurs protégées',
    IT: 'Identità offerenti protette',
    CA: 'Bidders\' Identities Protected',
    AU: 'Bidders\' Identities Protected',
    status: 'confirmed'
  },
  'Anonymous Bidding': {
    US: 'Anonymous Bidding',
    UK: 'Anonymous Bidding',
    DE: 'Anonymes Bieten',
    FR: 'Enchères anonymes',
    IT: 'Offerte anonime',
    CA: 'Anonymous Bidding',
    AU: 'Anonymous Bidding',
    status: 'confirmed'
  },

  // PAYMENT REQUIREMENTS
  'Payment Method Required': {
    US: 'Payment Method Required',
    UK: 'Payment Method Required',
    DE: 'Zahlungsmethode erforderlich',
    FR: 'Mode de paiement requis',
    IT: 'Metodo di pagamento richiesto',
    CA: 'Payment Method Required',
    AU: 'Payment Method Required',
    status: 'confirmed'
  },
  'Payment Method on File': {
    US: 'Payment Method on File',
    UK: 'Payment Method on File',
    DE: 'Hinterlegte Zahlungsmethode',
    FR: 'Mode de paiement enregistré',
    IT: 'Metodo di pagamento registrato',
    CA: 'Payment Method on File',
    AU: 'Payment Method on File',
    status: 'confirmed'
  },
  'Google Pay': {
    US: 'Google Pay',
    UK: 'Google Pay',
    DE: 'Google Pay',
    FR: 'Google Pay',
    IT: 'Google Pay',
    CA: 'Google Pay',
    AU: 'Google Pay',
    status: 'global'
  },
  'Apple Pay': {
    US: 'Apple Pay',
    UK: 'Apple Pay',
    DE: 'Apple Pay',
    FR: 'Apple Pay',
    IT: 'Apple Pay',
    CA: 'Apple Pay',
    AU: 'Apple Pay',
    status: 'global'
  },
  'PayPal Installments': {
    US: 'PayPal Installments',
    UK: 'PayPal Installments',
    DE: 'PayPal-Ratenzahlung',
    FR: 'Paiements échelonnés PayPal',
    IT: 'Rateizzazione PayPal',
    CA: 'PayPal Installments',
    AU: 'PayPal Installments',
    status: 'confirmed'
  },
  'eBay Gift Card': {
    US: 'eBay Gift Card',
    UK: 'eBay Gift Card',
    DE: 'eBay-Geschenkkarte',
    FR: 'Carte-cadeau eBay',
    IT: 'Carta regalo eBay',
    CA: 'eBay Gift Card',
    AU: 'eBay Gift Card',
    status: 'confirmed',
    type: 'category',
    tier: 'product',
    parent: 'payments'
  },

  // WHOLESALE & BULK PURCHASING
  'Bulk Inventory Solution': {
    US: 'Bulk Inventory Solution',
    UK: 'Bulk Inventory Solution',
    DE: 'Bulk-Inventarlösung',
    FR: 'Solution d\'inventaire en gros',
    IT: 'Soluzione inventario all\'ingrosso',
    CA: 'Bulk Inventory Solution',
    AU: 'Bulk Inventory Solution',
    status: 'confirmed',
    type: 'category',
    tier: 'product',
    parent: 'buyer'
  },
  'Wholesale Lots': {
    US: 'Wholesale Lots',
    UK: 'Wholesale Lots',
    DE: 'Großhandelsposten',
    FR: 'Lots en gros',
    IT: 'Lotti all\'ingrosso',
    CA: 'Wholesale Lots',
    AU: 'Wholesale Lots',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'BULQ Integration': {
    US: 'BULQ Integration',
    UK: 'BULQ Integration',
    DE: 'BULQ-Integration',
    FR: 'Intégration BULQ',
    IT: 'Integrazione BULQ',
    CA: 'BULQ Integration',
    AU: 'BULQ Integration',
    status: 'partial',
    type: 'category',
    tier: 'product',
    parent: 'sellertools'
  },
  'Business Buyers': {
    US: 'Business Buyers',
    UK: 'Business Buyers',
    DE: 'Geschäftskunden',
    FR: 'Acheteurs professionnels',
    IT: 'Acquirenti aziendali',
    CA: 'Business Buyers',
    AU: 'Business Buyers',
    status: 'confirmed',
    type: 'category',
    tier: 'program',
    parent: 'buyer'
  },

  // CROSS-BORDER & INTERNATIONAL TRADE
  'Cross-Border Trade': {
    US: 'Cross-Border Trade (CBT)',
    UK: 'Cross-Border Trade (CBT)',
    DE: 'Grenzüberschreitender Handel',
    FR: 'Commerce transfrontalier',
    IT: 'Commercio transfrontaliero',
    CA: 'Cross-Border Trade (CBT)',
    AU: 'Cross-Border Trade (CBT)',
    status: 'confirmed',
    type: 'category',
    tier: 'program',
    parent: 'shipping'
  },
  'CBT Seller Dashboard': {
    US: 'CBT Seller Dashboard',
    UK: 'CBT Seller Dashboard',
    DE: 'CBT-Verkäufer-Dashboard',
    FR: 'Tableau de bord vendeur CBT',
    IT: 'Dashboard venditore CBT',
    CA: 'CBT Seller Dashboard',
    AU: 'CBT Seller Dashboard',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'International Marketplace Visibility': {
    US: 'International Marketplace Visibility',
    UK: 'International Marketplace Visibility',
    DE: 'Internationale Marktplatzsichtbarkeit',
    FR: 'Visibilité internationale du marché',
    IT: 'Visibilità marketplace internazionale',
    CA: 'International Marketplace Visibility',
    AU: 'International Marketplace Visibility',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Currency Conversion': {
    US: 'Currency Conversion',
    UK: 'Currency Conversion',
    DE: 'Währungsumrechnung',
    FR: 'Conversion de devise',
    IT: 'Conversione valuta',
    CA: 'Currency Conversion',
    AU: 'Currency Conversion',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Content Translation': {
    US: 'Content Translation',
    UK: 'Content Translation',
    DE: 'Inhaltsübersetzung',
    FR: 'Traduction de contenu',
    IT: 'Traduzione contenuti',
    CA: 'Content Translation',
    AU: 'Content Translation',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Customs Clearance': {
    US: 'Customs Clearance',
    UK: 'Customs Clearance',
    DE: 'Zollabfertigung',
    FR: 'Dédouanement',
    IT: 'Sdoganamento',
    CA: 'Customs Clearance',
    AU: 'Customs Clearance',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Export eBay': {
    US: 'Export eBay',
    UK: 'Export eBay',
    DE: 'Export eBay',
    FR: 'Export eBay',
    IT: 'Export eBay',
    CA: 'Export eBay',
    AU: 'Export eBay',
    status: 'global',
    type: 'category',
    tier: 'program',
    parent: 'shipping'
  },

  // SELLER PERFORMANCE LEVELS
  'Top Rated Seller Status': {
    US: 'Top Rated Seller Status',
    UK: 'Top Rated Seller Status',
    DE: 'Top-bewerteter Verkäufer-Status',
    FR: 'Statut Vendeur Top fiabilité',
    IT: 'Stato Venditore top',
    CA: 'Top Rated Seller Status',
    AU: 'Top Rated Seller Status',
    status: 'confirmed',
    type: 'category',
    tier: 'program',
    parent: 'sellertools'
  },
  'Performance Evaluation': {
    US: 'Performance Evaluation',
    UK: 'Performance Evaluation',
    DE: 'Leistungsbewertung',
    FR: 'Évaluation des performances',
    IT: 'Valutazione prestazioni',
    CA: 'Performance Evaluation',
    AU: 'Performance Evaluation',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Cases Closed Without Seller Resolution': {
    US: 'Cases Closed Without Seller Resolution',
    UK: 'Cases Closed Without Seller Resolution',
    DE: 'Fälle ohne Verkäuferlösung geschlossen',
    FR: 'Cas clos sans résolution vendeur',
    IT: 'Casi chiusi senza risoluzione venditore',
    CA: 'Cases Closed Without Seller Resolution',
    AU: 'Cases Closed Without Seller Resolution',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Seller Evaluation Period': {
    US: 'Seller Evaluation Period',
    UK: 'Seller Evaluation Period',
    DE: 'Verkäufer-Bewertungszeitraum',
    FR: 'Période d\'évaluation vendeur',
    IT: 'Periodo di valutazione venditore',
    CA: 'Seller Evaluation Period',
    AU: 'Seller Evaluation Period',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Search Placement': {
    US: 'Search Placement',
    UK: 'Search Placement',
    DE: 'Suchplatzierung',
    FR: 'Placement dans les résultats',
    IT: 'Posizionamento ricerca',
    CA: 'Search Placement',
    AU: 'Search Placement',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'discovery'
  },

  // NOTIFICATIONS & ALERTS
  'Communication Preferences': {
    US: 'Communication Preferences',
    UK: 'Communication Preferences',
    DE: 'Kommunikationseinstellungen',
    FR: 'Préférences de communication',
    IT: 'Preferenze comunicazione',
    CA: 'Communication Preferences',
    AU: 'Communication Preferences',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Email Notifications': {
    US: 'Email Notifications',
    UK: 'Email Notifications',
    DE: 'E-Mail-Benachrichtigungen',
    FR: 'Notifications par e-mail',
    IT: 'Notifiche email',
    CA: 'Email Notifications',
    AU: 'Email Notifications',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'SMS Notifications': {
    US: 'SMS Notifications',
    UK: 'SMS Notifications',
    DE: 'SMS-Benachrichtigungen',
    FR: 'Notifications SMS',
    IT: 'Notifiche SMS',
    CA: 'SMS Notifications',
    AU: 'SMS Notifications',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Marketing Communications': {
    US: 'Marketing Communications',
    UK: 'Marketing Communications',
    DE: 'Marketingkommunikation',
    FR: 'Communications marketing',
    IT: 'Comunicazioni marketing',
    CA: 'Marketing Communications',
    AU: 'Marketing Communications',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Member Messages': {
    US: 'Member Messages',
    UK: 'Member Messages',
    DE: 'Mitgliedernachrichten',
    FR: 'Messages des membres',
    IT: 'Messaggi membri',
    CA: 'Member Messages',
    AU: 'Member Messages',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Selling Activity Notifications': {
    US: 'Selling Activity Notifications',
    UK: 'Selling Activity Notifications',
    DE: 'Benachrichtigungen zu Verkaufsaktivitäten',
    FR: 'Notifications d\'activité de vente',
    IT: 'Notifiche attività di vendita',
    CA: 'Selling Activity Notifications',
    AU: 'Selling Activity Notifications',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Listing Confirmed Notification': {
    US: 'Listing Confirmed Notification',
    UK: 'Listing Confirmed Notification',
    DE: 'Angebotsbestätigungs-Benachrichtigung',
    FR: 'Notification d\'annonce confirmée',
    IT: 'Notifica inserzione confermata',
    CA: 'Listing Confirmed Notification',
    AU: 'Listing Confirmed Notification',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Real-Time Notifications': {
    US: 'Real-Time Notifications',
    UK: 'Real-Time Notifications',
    DE: 'Echtzeitbenachrichtigungen',
    FR: 'Notifications en temps réel',
    IT: 'Notifiche in tempo reale',
    CA: 'Real-Time Notifications',
    AU: 'Real-Time Notifications',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Digest Notifications': {
    US: 'Digest Notifications',
    UK: 'Digest Notifications',
    DE: 'Zusammenfassungsbenachrichtigungen',
    FR: 'Notifications récapitulatives',
    IT: 'Notifiche riepilogative',
    CA: 'Digest Notifications',
    AU: 'Digest Notifications',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  // ORDER TRACKING & DELIVERY
  'Order Details': {
    US: 'Order Details',
    UK: 'Order Details',
    DE: 'Bestelldetails',
    FR: 'Détails de la commande',
    IT: 'Dettagli ordine',
    CA: 'Order Details',
    AU: 'Order Details',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Delivery Status': {
    US: 'Delivery Status',
    UK: 'Delivery Status',
    DE: 'Lieferstatus',
    FR: 'Statut de livraison',
    IT: 'Stato consegna',
    CA: 'Delivery Status',
    AU: 'Delivery Status',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Tracking Number': {
    US: 'Tracking Number',
    UK: 'Tracking Number',
    DE: 'Sendungsnummer',
    FR: 'Numéro de suivi',
    IT: 'Numero di tracciamento',
    CA: 'Tracking Number',
    AU: 'Tracking Number',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Expected Delivery Date': {
    US: 'Expected Delivery Date',
    UK: 'Expected Delivery Date',
    DE: 'Voraussichtliches Lieferdatum',
    FR: 'Date de livraison prévue',
    IT: 'Data di consegna prevista',
    CA: 'Expected Delivery Date',
    AU: 'Expected Delivery Date',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Delivery Updates': {
    US: 'Delivery Updates',
    UK: 'Delivery Updates',
    DE: 'Lieferaktualisierungen',
    FR: 'Mises à jour de livraison',
    IT: 'Aggiornamenti consegna',
    CA: 'Delivery Updates',
    AU: 'Delivery Updates',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Order Confirmation': {
    US: 'Order Confirmation',
    UK: 'Order Confirmation',
    DE: 'Bestellbestätigung',
    FR: 'Confirmation de commande',
    IT: 'Conferma ordine',
    CA: 'Order Confirmation',
    AU: 'Order Confirmation',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  // CLAIMS & DISPUTES
  'Item Not Received': {
    US: 'Item Not Received (INR)',
    UK: 'Item Not Received (INR)',
    DE: 'Artikel nicht erhalten',
    FR: 'Article non reçu',
    IT: 'Oggetto non ricevuto',
    CA: 'Item Not Received (INR)',
    AU: 'Item Not Received (INR)',
    status: 'confirmed',
    type: 'trust',
    tier: 't2',
    parent: 'trust'
  },
  'Not As Described': {
    US: 'Not As Described',
    UK: 'Not As Described',
    DE: 'Nicht wie beschrieben',
    FR: 'Non conforme à la description',
    IT: 'Non conforme alla descrizione',
    CA: 'Not As Described',
    AU: 'Not As Described',
    status: 'confirmed',
    type: 'trust',
    tier: 't2',
    parent: 'trust'
  },
  'Open a Case': {
    US: 'Open a Case',
    UK: 'Open a Case',
    DE: 'Fall eröffnen',
    FR: 'Ouvrir un cas',
    IT: 'Apri un caso',
    CA: 'Open a Case',
    AU: 'Open a Case',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'trust'
  },
  'Escalate to eBay': {
    US: 'Escalate to eBay',
    UK: 'Escalate to eBay',
    DE: 'An eBay eskalieren',
    FR: 'Transmettre à eBay',
    IT: 'Inoltra a eBay',
    CA: 'Escalate to eBay',
    AU: 'Escalate to eBay',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'trust'
  },
  'Upload Evidence': {
    US: 'Upload Evidence',
    UK: 'Upload Evidence',
    DE: 'Beweise hochladen',
    FR: 'Télécharger des preuves',
    IT: 'Carica prove',
    CA: 'Upload Evidence',
    AU: 'Upload Evidence',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'trust'
  },
  'Damaged Item Claim': {
    US: 'Damaged Item Claim',
    UK: 'Damaged Item Claim',
    DE: 'Schadensmeldung',
    FR: 'Réclamation pour article endommagé',
    IT: 'Reclamo articolo danneggiato',
    CA: 'Damaged Item Claim',
    AU: 'Damaged Item Claim',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'trust'
  },
  'Wrong Item Received': {
    US: 'Wrong Item Received',
    UK: 'Wrong Item Received',
    DE: 'Falscher Artikel erhalten',
    FR: 'Mauvais article reçu',
    IT: 'Articolo errato ricevuto',
    CA: 'Wrong Item Received',
    AU: 'Wrong Item Received',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'trust'
  },

  // SPECIALIZED CATEGORY PROGRAMS
  'Certified by Brand': {
    US: 'Certified by Brand',
    status: 'partial',
    type: 'trust',
    tier: 'program',
    parent: 'collectibles'
  },
  'eBay Business Supply': {
    US: 'eBay Business Supply',
    UK: 'eBay Business Supply',
    DE: 'eBay Business Supply',
    FR: 'eBay Business Supply',
    IT: 'eBay Business Supply',
    CA: 'eBay Business Supply',
    AU: 'eBay Business Supply',
    status: 'confirmed',
    type: 'category',
    tier: 'vertical',
    parent: 'platform'
  },
  'Trading Card Hub': {
    US: 'Trading Card Hub',
    status: 'partial',
    type: 'category',
    tier: 'vertical',
    parent: 'collectibles'
  },
  'Price Guide': {
    US: 'Price Guide',
    status: 'partial',
    type: 'category',
    tier: 'feature',
    parent: 'collectibles'
  },
  'My Collection': {
    US: 'My Collection',
    status: 'partial',
    type: 'category',
    tier: 'feature',
    parent: 'collectibles'
  },
  'PSA Vault': {
    US: 'PSA Vault',
    CA: 'PSA Vault',
    status: 'partial',
    type: 'category',
    tier: 'feature',
    parent: 'collectibles'
  },
  'Fitment Plus': {
    US: 'Fitment Plus',
    status: 'partial',
    type: 'category',
    tier: 'feature',
    parent: 'motors'
  },
  'Fitment Plus Auto': {
    US: 'Fitment Plus Auto',
    status: 'partial',
    type: 'category',
    tier: 'feature',
    parent: 'motors'
  },
  'Circular Fashion Fund': {
    US: 'Circular Fashion Fund',
    UK: 'Circular Fashion Fund',
    DE: 'Circular Fashion Fund',
    FR: 'Circular Fashion Fund',
    IT: 'Circular Fashion Fund',
    CA: 'Circular Fashion Fund',
    AU: 'Circular Fashion Fund',
    status: 'confirmed',
    type: 'impact',
    tier: 'program',
    parent: 'platform'
  },
  'TCGplayer': {
    US: 'TCGplayer',
    UK: 'TCGplayer',
    CA: 'TCGplayer',
    status: 'partial',
    type: 'category',
    tier: 'platform',
    parent: 'collectibles'
  },
  'Simple Delivery': {
    UK: 'Simple Delivery',
    status: 'partial',
    type: 'category',
    tier: 'program',
    parent: 'shipping'
  },
  'SpeedPAK': {
    US: 'SpeedPAK',
    UK: 'SpeedPAK',
    DE: 'eBay SpeedPAK',
    CA: 'SpeedPAK',
    AU: 'SpeedPAK',
    status: 'partial',
    type: 'category',
    tier: 'program',
    parent: 'shipping'
  },
  'Brand Outlet': {
    US: 'Brand Outlet',
    UK: 'Brand Outlet',
    DE: 'Marken Outlet',
    FR: 'Brand Outlet',
    IT: 'Brand Outlet',
    CA: 'Brand Outlet',
    AU: 'Brand Outlet',
    status: 'confirmed',
    type: 'category',
    tier: 'vertical',
    parent: 'discovery'
  },

  // SELLER PERFORMANCE & BADGES
  'Seller Performance Standards': {
    US: 'Seller Performance Standards',
    UK: 'Seller Performance Standards',
    DE: 'Verkäuferstandards',
    FR: 'Standards de performance des vendeurs',
    IT: 'Standard di rendimento del venditore',
    CA: 'Seller Performance Standards',
    AU: 'Seller Performance Standards',
    status: 'confirmed',
    type: 'trust',
    tier: 'program',
    parent: 'sellertools'
  },
  'Above Standard': {
    US: 'Above Standard',
    UK: 'Above Standard',
    DE: 'Über dem Standard',
    FR: 'Supérieur à la norme',
    IT: 'Superiore allo standard',
    CA: 'Above Standard',
    AU: 'Above Standard',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Below Standard': {
    US: 'Below Standard',
    UK: 'Below Standard',
    DE: 'Unter dem Standard',
    FR: 'Inférieur à la norme',
    IT: 'Inferiore allo standard',
    CA: 'Below Standard',
    AU: 'Below Standard',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Top Rated Plus': {
    US: 'Top Rated Plus',
    UK: 'Premium Service',
    DE: 'Top-Service',
    FR: 'Top Rated Plus',
    IT: 'Top Rated Plus',
    CA: 'Top Rated Plus',
    AU: 'eBay Plus',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Transaction Defect Rate': {
    US: 'Transaction Defect Rate',
    UK: 'Transaction Defect Rate',
    DE: 'Transaktionsfehlerquote',
    FR: 'Taux de défauts de transaction',
    IT: 'Tasso di difetti di transazione',
    CA: 'Transaction Defect Rate',
    AU: 'Transaction Defect Rate',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Late Shipment Rate': {
    US: 'Late Shipment Rate',
    UK: 'Late Dispatch Rate',
    DE: 'Verspätete Versendungsrate',
    FR: 'Taux d\'envoi tardif',
    IT: 'Tasso di spedizione in ritardo',
    CA: 'Late Shipment Rate',
    AU: 'Late Dispatch Rate',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Cases Closed Without Seller Resolution': {
    US: 'Cases Closed Without Seller Resolution',
    UK: 'Cases Closed Without Seller Resolution',
    DE: 'Geschlossene Fälle ohne Lösung durch Verkäufer',
    FR: 'Cas fermés sans résolution du vendeur',
    IT: 'Casi chiusi senza risoluzione del venditore',
    CA: 'Cases Closed Without Seller Resolution',
    AU: 'Cases Closed Without Seller Resolution',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // PROMOTIONS & DISCOUNTS
  'Promotions Manager': {
    US: 'Discounts Manager',
    UK: 'Discounts Manager',
    DE: 'Verkaufsaktionen-Manager',
    FR: 'Boosteur de ventes',
    IT: 'Gestione promozioni',
    CA: 'Discounts Manager',
    AU: 'Discounts Manager',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Sale Event': {
    US: 'Sale Event',
    UK: 'Sale Event',
    DE: 'Verkaufsaktion',
    FR: 'Événement de vente',
    IT: 'Evento di vendita',
    CA: 'Sale Event',
    AU: 'Sale Event',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Volume Pricing': {
    US: 'Volume Pricing',
    UK: 'Volume Pricing',
    DE: 'Staffelpreise',
    FR: 'Tarif dégressif',
    IT: 'Prezzi per volume',
    CA: 'Volume Pricing',
    AU: 'Volume Pricing',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Order Discount': {
    US: 'Order Discount',
    UK: 'Order Discount',
    DE: 'Bestellrabatt',
    FR: 'Réduction de commande',
    IT: 'Sconto sull\'ordine',
    CA: 'Order Discount',
    AU: 'Order Discount',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Codeless Coupons': {
    US: 'Codeless Coupons',
    UK: 'Codeless Coupons',
    DE: 'Codeless Coupons',
    FR: 'Coupons sans code',
    IT: 'Coupon senza codice',
    CA: 'Codeless Coupons',
    AU: 'Codeless Coupons',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  // ADDITIONAL CONDITION STATES
  'Certified Open Box': {
    US: 'Certified Open Box',
    status: 'partial',
    type: 'trust',
    tier: 'program',
    parent: 'refurbished'
  },
  'Opened - Never Used': {
    US: 'Opened - Never Used',
    UK: 'Opened - Never Used',
    DE: 'Geöffnet - nie benutzt',
    FR: 'Ouvert - jamais utilisé',
    IT: 'Aperto - mai usato',
    CA: 'Opened - Never Used',
    AU: 'Opened - Never Used',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'refurbished'
  },

  // DEVELOPER & PARTNER PROGRAMS
  'Merchant Integration Platform': {
    US: 'Merchant Integration Platform (MIP)',
    UK: 'Merchant Integration Platform (MIP)',
    DE: 'Merchant Integration Platform (MIP)',
    FR: 'Merchant Integration Platform (MIP)',
    IT: 'Merchant Integration Platform (MIP)',
    CA: 'Merchant Integration Platform (MIP)',
    AU: 'Merchant Integration Platform (MIP)',
    status: 'global',
    type: 'developer',
    tier: 'platform',
    parent: 'developer'
  },
  'eBay Cross Border Trade': {
    US: 'Cross Border Trade',
    UK: 'Cross Border Trade',
    DE: 'Grenzüberschreitender Handel',
    FR: 'Commerce transfrontalier',
    IT: 'Commercio transfrontaliero',
    CA: 'Cross Border Trade',
    AU: 'Cross Border Trade',
    status: 'confirmed',
    type: 'category',
    tier: 'program',
    parent: 'shipping'
  },
  'Seller Protections': {
    US: 'Seller Protections',
    UK: 'Seller Protections',
    DE: 'Verkäuferschutz',
    FR: 'Protections des vendeurs',
    IT: 'Protezioni del venditore',
    CA: 'Seller Protections',
    AU: 'Seller Protections',
    status: 'confirmed',
    type: 'trust',
    tier: 't1',
    parent: 'trust'
  },
  'Payment Dispute Seller Protections': {
    US: 'Payment Dispute Seller Protections',
    UK: 'Payment Dispute Seller Protections',
    DE: 'Verkäuferschutz bei Zahlungsstreitigkeiten',
    FR: 'Protections du vendeur en cas de litige de paiement',
    IT: 'Protezioni del venditore per controversie sui pagamenti',
    CA: 'Payment Dispute Seller Protections',
    AU: 'Payment Dispute Seller Protections',
    status: 'confirmed',
    type: 'trust',
    tier: 't2',
    parent: 'trust'
  },
  'Abusive Buyer Policy': {
    US: 'Abusive Buyer Policy',
    UK: 'Abusive Buyer Policy',
    DE: 'Richtlinie zu missbräuchlichem Käuferverhalten',
    FR: 'Règlement relatif aux comportements abusifs des acheteurs',
    IT: 'Regolamento sugli acquirenti abusivi',
    CA: 'Abusive Buyer Policy',
    AU: 'Abusive Buyer Policy',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'trust'
  },

  // LISTING FEATURES & ATTRIBUTES
  'Immediate Payment Required': {
    US: 'Immediate Payment Required',
    UK: 'Immediate Payment Required',
    DE: 'Sofortige Bezahlung erforderlich',
    FR: 'Paiement immédiat requis',
    IT: 'Pagamento immediato richiesto',
    CA: 'Immediate Payment Required',
    AU: 'Immediate Payment Required',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Variation Listings': {
    US: 'Variation Listings',
    UK: 'Variation Listings',
    DE: 'Angebote mit Varianten',
    FR: 'Annonces avec variations',
    IT: 'Inserzioni con varianti',
    CA: 'Variation Listings',
    AU: 'Variation Listings',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Multi-Variation Listings': {
    US: 'Multi-Variation Listings',
    UK: 'Multi-Variation Listings',
    DE: 'Angebote mit mehreren Varianten',
    FR: 'Annonces multi-variations',
    IT: 'Inserzioni multi-variante',
    CA: 'Multi-Variation Listings',
    AU: 'Multi-Variation Listings',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Item Specifics': {
    US: 'Item Specifics',
    UK: 'Item Specifics',
    DE: 'Artikelmerkmale',
    FR: 'Caractéristiques de l\'objet',
    IT: 'Specifiche dell\'oggetto',
    CA: 'Item Specifics',
    AU: 'Item Specifics',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Product Identifiers': {
    US: 'Product Identifiers',
    UK: 'Product Identifiers',
    DE: 'Produktkennzeichnung',
    FR: 'Identifiants de produit',
    IT: 'Identificatori prodotto',
    CA: 'Product Identifiers',
    AU: 'Product Identifiers',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Custom SKU': {
    US: 'Custom SKU',
    UK: 'Custom SKU',
    DE: 'Benutzerdefinierte SKU',
    FR: 'SKU personnalisé',
    IT: 'SKU personalizzato',
    CA: 'Custom SKU',
    AU: 'Custom SKU',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'eBay Product Catalog': {
    US: 'eBay Product Catalog',
    UK: 'eBay Product Catalog',
    DE: 'eBay Produktkatalog',
    FR: 'Catalogue de produits eBay',
    IT: 'Catalogo prodotti eBay',
    CA: 'eBay Product Catalog',
    AU: 'eBay Product Catalog',
    status: 'confirmed',
    type: 'category',
    tier: 'platform',
    parent: 'platform'
  },
  'eBay Product ID': {
    US: 'eBay Product ID (ePID)',
    UK: 'eBay Product ID (ePID)',
    DE: 'eBay-Produktkennung (ePID)',
    FR: 'Identifiant produit eBay (ePID)',
    IT: 'ID prodotto eBay (ePID)',
    CA: 'eBay Product ID (ePID)',
    AU: 'eBay Product ID (ePID)',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'platform'
  },
  'Listing Designer': {
    US: 'Listing Designer',
    UK: 'Listing Designer',
    DE: 'Angebotsdesigner',
    FR: 'Concepteur d\'annonces',
    IT: 'Designer inserzioni',
    CA: 'Listing Designer',
    AU: 'Listing Designer',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Scheduled Listings': {
    US: 'Scheduled Listings',
    UK: 'Scheduled Listings',
    DE: 'Geplante Angebote',
    FR: 'Annonces programmées',
    IT: 'Inserzioni programmate',
    CA: 'Scheduled Listings',
    AU: 'Scheduled Listings',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Scheduled Start Time': {
    US: 'Scheduled Start Time',
    UK: 'Scheduled Start Time',
    DE: 'Geplante Startzeit',
    FR: 'Heure de début programmée',
    IT: 'Ora di inizio programmata',
    CA: 'Scheduled Start Time',
    AU: 'Scheduled Start Time',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // BULK MANAGEMENT & FILE TOOLS
  'File Exchange': {
    US: 'Seller Hub Reports',
    UK: 'Seller Hub Reports',
    DE: 'Verkäufer-Cockpit Berichte',
    FR: 'Rapports Hub vendeur',
    IT: 'Rapporti Console venditori',
    CA: 'Seller Hub Reports',
    AU: 'Seller Hub Reports',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Seller Hub Reports': {
    US: 'Seller Hub Reports',
    UK: 'Seller Hub Reports',
    DE: 'Verkäufer-Cockpit Berichte',
    FR: 'Rapports Hub vendeur',
    IT: 'Rapporti Console venditori',
    CA: 'Seller Hub Reports',
    AU: 'Seller Hub Reports',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'CSV Upload': {
    US: 'CSV Upload',
    UK: 'CSV Upload',
    DE: 'CSV-Upload',
    FR: 'Téléchargement CSV',
    IT: 'Caricamento CSV',
    CA: 'CSV Upload',
    AU: 'CSV Upload',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Bulk Listing Tools': {
    US: 'Bulk Listing Tools',
    UK: 'Bulk Listing Tools',
    DE: 'Massenangebots-Tools',
    FR: 'Outils de mise en vente en gros',
    IT: 'Strumenti per inserzioni multiple',
    CA: 'Bulk Listing Tools',
    AU: 'Bulk Listing Tools',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // IMAGE & DESIGN TOOLS
  'eBay Picture Services': {
    US: 'eBay Picture Services (EPS)',
    UK: 'eBay Picture Services (EPS)',
    DE: 'eBay-Bilderservice (EPS)',
    FR: 'Services photo eBay (EPS)',
    IT: 'Servizi immagini eBay (EPS)',
    CA: 'eBay Picture Services (EPS)',
    AU: 'eBay Picture Services (EPS)',
    status: 'confirmed',
    type: 'category',
    tier: 'platform',
    parent: 'platform'
  },
  'Description Builder': {
    US: 'Description Builder',
    UK: 'Description Builder',
    DE: 'Beschreibungs-Generator',
    FR: 'Générateur de description',
    IT: 'Generatore di descrizione',
    CA: 'Description Builder',
    AU: 'Description Builder',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'HTML Editor': {
    US: 'HTML Editor',
    UK: 'HTML Editor',
    DE: 'HTML-Editor',
    FR: 'Éditeur HTML',
    IT: 'Editor HTML',
    CA: 'HTML Editor',
    AU: 'HTML Editor',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Rich Text Editor': {
    US: 'Rich Text Editor',
    UK: 'Rich Text Editor',
    DE: 'Rich-Text-Editor',
    FR: 'Éditeur de texte enrichi',
    IT: 'Editor di testo formattato',
    CA: 'Rich Text Editor',
    AU: 'Rich Text Editor',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // SHIPPING FEATURES & SETTINGS
  'Shipping Calculator': {
    US: 'Shipping Calculator',
    UK: 'Postage Calculator',
    DE: 'Versandkostenrechner',
    FR: 'Calculateur de frais de port',
    IT: 'Calcolatore spese di spedizione',
    CA: 'Shipping Calculator',
    AU: 'Postage Calculator',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Rate Tables': {
    US: 'Rate Tables',
    UK: 'Rate Tables',
    DE: 'Versandkostentabellen',
    FR: 'Tableaux de tarifs',
    IT: 'Tabelle tariffe',
    CA: 'Rate Tables',
    AU: 'Rate Tables',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Calculated Shipping': {
    US: 'Calculated Shipping',
    UK: 'Calculated Postage',
    DE: 'Berechneter Versand',
    FR: 'Frais de port calculés',
    IT: 'Spese di spedizione calcolate',
    CA: 'Calculated Shipping',
    AU: 'Calculated Postage',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Combined Shipping': {
    US: 'Combined Shipping',
    UK: 'Combined Postage',
    DE: 'Kombinierter Versand',
    FR: 'Envoi combiné',
    IT: 'Spedizione combinata',
    CA: 'Combined Shipping',
    AU: 'Combined Postage',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Shipping Discounts': {
    US: 'Shipping Discounts',
    UK: 'Postage Discounts',
    DE: 'Versandrabatte',
    FR: 'Réductions sur les frais de port',
    IT: 'Sconti di spedizione',
    CA: 'Shipping Discounts',
    AU: 'Postage Discounts',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Handling Time': {
    US: 'Handling Time',
    UK: 'Dispatch Time',
    DE: 'Bearbeitungszeit',
    FR: 'Délai de traitement',
    IT: 'Tempo di gestione',
    CA: 'Handling Time',
    AU: 'Dispatch Time',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Estimated Delivery Date': {
    US: 'Estimated Delivery Date',
    UK: 'Estimated Delivery Date',
    DE: 'Voraussichtliches Lieferdatum',
    FR: 'Date de livraison estimée',
    IT: 'Data di consegna stimata',
    CA: 'Estimated Delivery Date',
    AU: 'Estimated Delivery Date',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Late Shipment': {
    US: 'Late Shipment',
    UK: 'Late Dispatch',
    DE: 'Verspätete Sendung',
    FR: 'Expédition tardive',
    IT: 'Spedizione in ritardo',
    CA: 'Late Shipment',
    AU: 'Late Dispatch',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  // BUSINESS POLICIES & SETTINGS
  'Business Policies': {
    US: 'Business Policies',
    UK: 'Business Policies',
    DE: 'Geschäftsrichtlinien',
    FR: 'Règles commerciales',
    IT: 'Regole aziendali',
    CA: 'Business Policies',
    AU: 'Business Policies',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Payment Policy': {
    US: 'Payment Policy',
    UK: 'Payment Policy',
    DE: 'Zahlungsrichtlinie',
    FR: 'Règlement de paiement',
    IT: 'Regolamento di pagamento',
    CA: 'Payment Policy',
    AU: 'Payment Policy',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Return Policy': {
    US: 'Return Policy',
    UK: 'Return Policy',
    DE: 'Rückgaberichtlinie',
    FR: 'Politique de retour',
    IT: 'Politica di reso',
    CA: 'Return Policy',
    AU: 'Return Policy',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Shipping Policy': {
    US: 'Shipping Policy',
    UK: 'Postage Policy',
    DE: 'Versandrichtlinie',
    FR: 'Politique d\'expédition',
    IT: 'Politica di spedizione',
    CA: 'Shipping Policy',
    AU: 'Postage Policy',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  '30 Day Returns': {
    US: '30 Day Returns',
    UK: '30 Day Returns',
    DE: '30 Tage Rückgaberecht',
    FR: 'Retour sous 30 jours',
    IT: 'Reso entro 30 giorni',
    CA: '30 Day Returns',
    AU: '30 Day Returns',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Free Returns': {
    US: 'Free Returns',
    UK: 'Free Returns',
    DE: 'Kostenloser Rückversand',
    FR: 'Retour gratuit',
    IT: 'Reso gratuito',
    CA: 'Free Returns',
    AU: 'Free Returns',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Private Listing': {
    US: 'Private Listing',
    UK: 'Private Listing',
    DE: 'Privates Angebot',
    FR: 'Annonce privée',
    IT: 'Inserzione privata',
    CA: 'Private Listing',
    AU: 'Private Listing',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Bidders Identities Protected': {
    US: 'Bidders\' Identities Protected',
    UK: 'Bidders\' Identities Protected',
    DE: 'Identitäten der Bieter geschützt',
    FR: 'Identités des enchérisseurs protégées',
    IT: 'Identità degli offerenti protette',
    CA: 'Bidders\' Identities Protected',
    AU: 'Bidders\' Identities Protected',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // FEES & SUBSCRIPTION
  'Final Value Fee': {
    US: 'Final Value Fee',
    UK: 'Final Value Fee',
    DE: 'Provision',
    FR: 'Commission sur transaction finale',
    IT: 'Commissione sul valore finale',
    CA: 'Final Value Fee',
    AU: 'Final Value Fee',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Insertion Fee': {
    US: 'Insertion Fee',
    UK: 'Insertion Fee',
    DE: 'Angebotsgebühr',
    FR: 'Frais d\'insertion',
    IT: 'Commissione inserzione',
    CA: 'Insertion Fee',
    AU: 'Insertion Fee',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Listing Fee': {
    US: 'Listing Fee',
    UK: 'Listing Fee',
    DE: 'Angebotsgebühr',
    FR: 'Frais de mise en vente',
    IT: 'Commissione di inserzione',
    CA: 'Listing Fee',
    AU: 'Listing Fee',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Per Order Fee': {
    US: 'Per Order Fee',
    UK: 'Per Order Fee',
    DE: 'Bestellgebühr',
    FR: 'Frais par commande',
    IT: 'Commissione per ordine',
    CA: 'Per Order Fee',
    AU: 'Per Order Fee',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Zero Insertion Fee Listings': {
    US: 'Zero Insertion Fee Listings',
    UK: 'Zero Insertion Fee Listings',
    DE: 'Kostenlose Angebotsgebühr',
    FR: 'Mise en vente gratuite',
    IT: 'Inserzioni senza commissione',
    CA: 'Zero Insertion Fee Listings',
    AU: 'Zero Insertion Fee Listings',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Starter Store': {
    US: 'Starter Store',
    UK: 'Starter Shop',
    DE: 'Starter-Shop',
    FR: 'Boutique Starter',
    IT: 'Negozio Starter',
    CA: 'Starter Store',
    AU: 'Starter Store',
    status: 'confirmed',
    type: 'category',
    tier: 'variant',
    parent: 'stores'
  },

  // AUCTION FEATURES
  'Reserve Price': {
    US: 'Reserve Price',
    UK: 'Reserve Price',
    DE: 'Mindestpreis',
    FR: 'Prix de réserve',
    IT: 'Prezzo di riserva',
    CA: 'Reserve Price',
    AU: 'Reserve Price',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Reserve Not Met': {
    US: 'Reserve Not Met',
    UK: 'Reserve Not Met',
    DE: 'Mindestpreis nicht erreicht',
    FR: 'Prix de réserve non atteint',
    IT: 'Prezzo di riserva non raggiunto',
    CA: 'Reserve Not Met',
    AU: 'Reserve Not Met',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Minimum Bid': {
    US: 'Minimum Bid',
    UK: 'Minimum Bid',
    DE: 'Mindestgebot',
    FR: 'Enchère minimum',
    IT: 'Offerta minima',
    CA: 'Minimum Bid',
    AU: 'Minimum Bid',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'No Reserve': {
    US: 'No Reserve',
    UK: 'No Reserve',
    DE: 'Kein Mindestpreis',
    FR: 'Sans réserve',
    IT: 'Senza riserva',
    CA: 'No Reserve',
    AU: 'No Reserve',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Auto Relist': {
    US: 'Automatic Relist',
    UK: 'Automatic Relist',
    DE: 'Automatische Wiedereinstellung',
    FR: 'Remise en vente automatique',
    IT: 'Reinserimento automatico',
    CA: 'Automatic Relist',
    AU: 'Automatic Relist',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Relist Item': {
    US: 'Relist Item',
    UK: 'Relist Item',
    DE: 'Artikel erneut einstellen',
    FR: 'Remettre en vente',
    IT: 'Reinserisci oggetto',
    CA: 'Relist Item',
    AU: 'Relist Item',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Sell Similar': {
    US: 'Sell Similar',
    UK: 'Sell Similar',
    DE: 'Ähnlichen Artikel verkaufen',
    FR: 'Vendre un article similaire',
    IT: 'Vendi articolo simile',
    CA: 'Sell Similar',
    AU: 'Sell Similar',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Second Chance Offer': {
    US: 'Second Chance Offer',
    UK: 'Second Chance Offer',
    DE: 'Zweite-Chance-Angebot',
    FR: 'Offre de seconde chance',
    IT: 'Offerta di seconda opportunità',
    CA: 'Second Chance Offer',
    AU: 'Second Chance Offer',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Make Offer': {
    US: 'Make Offer',
    UK: 'Make Offer',
    DE: 'Preisvorschlag senden',
    FR: 'Faire une offre',
    IT: 'Fai un\'offerta',
    CA: 'Make Offer',
    AU: 'Make Offer',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Send Offer to Buyers': {
    US: 'Send Offer to Buyers',
    UK: 'Send Offer to Buyers',
    DE: 'Angebot an Käufer senden',
    FR: 'Envoyer une offre aux acheteurs',
    IT: 'Invia offerta agli acquirenti',
    CA: 'Send Offer to Buyers',
    AU: 'Send Offer to Buyers',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Offers to Buyers': {
    US: 'Offers to Buyers',
    UK: 'Offers to Buyers',
    DE: 'Angebote an Käufer',
    FR: 'Offres aux acheteurs',
    IT: 'Offerte agli acquirenti',
    CA: 'Offers to Buyers',
    AU: 'Offers to Buyers',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Counteroffer': {
    US: 'Counteroffer',
    UK: 'Counteroffer',
    DE: 'Gegenangebot',
    FR: 'Contre-offre',
    IT: 'Controproposta',
    CA: 'Counteroffer',
    AU: 'Counteroffer',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // BIDDING FEATURES
  'Proxy Bidding': {
    US: 'Automatic Bidding',
    UK: 'Automatic Bidding',
    DE: 'Automatisches Bieten',
    FR: 'Enchère automatique',
    IT: 'Offerta automatica',
    CA: 'Automatic Bidding',
    AU: 'Automatic Bidding',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Automatic Bidding': {
    US: 'Automatic Bidding',
    UK: 'Automatic Bidding',
    DE: 'Automatisches Bieten',
    FR: 'Enchère automatique',
    IT: 'Offerta automatica',
    CA: 'Automatic Bidding',
    AU: 'Automatic Bidding',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Maximum Bid': {
    US: 'Maximum Bid',
    UK: 'Maximum Bid',
    DE: 'Maximalgebot',
    FR: 'Enchère maximale',
    IT: 'Offerta massima',
    CA: 'Maximum Bid',
    AU: 'Maximum Bid',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Bid Increment': {
    US: 'Bid Increment',
    UK: 'Bid Increment',
    DE: 'Gebotsschritt',
    FR: 'Incrément d\'enchère',
    IT: 'Incremento offerta',
    CA: 'Bid Increment',
    AU: 'Bid Increment',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Current Bid': {
    US: 'Current Bid',
    UK: 'Current Bid',
    DE: 'Aktuelles Gebot',
    FR: 'Enchère actuelle',
    IT: 'Offerta attuale',
    CA: 'Current Bid',
    AU: 'Current Bid',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Bid Retraction': {
    US: 'Bid Retraction',
    UK: 'Bid Retraction',
    DE: 'Gebotsrücknahme',
    FR: 'Rétractation d\'enchère',
    IT: 'Ritiro offerta',
    CA: 'Bid Retraction',
    AU: 'Bid Retraction',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Retract Bid': {
    US: 'Retract Bid',
    UK: 'Retract Bid',
    DE: 'Gebot zurückziehen',
    FR: 'Rétracter l\'enchère',
    IT: 'Ritira offerta',
    CA: 'Retract Bid',
    AU: 'Retract Bid',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Cancel Bid': {
    US: 'Cancel Bid',
    UK: 'Cancel Bid',
    DE: 'Gebot stornieren',
    FR: 'Annuler l\'enchère',
    IT: 'Annulla offerta',
    CA: 'Cancel Bid',
    AU: 'Cancel Bid',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // BUYER MANAGEMENT & BLOCKING
  'Buyer Requirements': {
    US: 'Buyer Requirements',
    UK: 'Buyer Requirements',
    DE: 'Käuferanforderungen',
    FR: 'Exigences acheteurs',
    IT: 'Requisiti acquirenti',
    CA: 'Buyer Requirements',
    AU: 'Buyer Requirements',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Block List': {
    US: 'Block List',
    UK: 'Block List',
    DE: 'Blockierliste',
    FR: 'Liste de blocage',
    IT: 'Lista bloccati',
    CA: 'Block List',
    AU: 'Block List',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Blocked Buyers': {
    US: 'Blocked Buyers',
    UK: 'Blocked Buyers',
    DE: 'Blockierte Käufer',
    FR: 'Acheteurs bloqués',
    IT: 'Acquirenti bloccati',
    CA: 'Blocked Buyers',
    AU: 'Blocked Buyers',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Shipping Exclusions': {
    US: 'Shipping Exclusions',
    UK: 'Postage Exclusions',
    DE: 'Versandausschlüsse',
    FR: 'Exclusions de livraison',
    IT: 'Esclusioni di spedizione',
    CA: 'Shipping Exclusions',
    AU: 'Postage Exclusions',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Unpaid Item Case': {
    US: 'Unpaid Item Case',
    UK: 'Unpaid Item Case',
    DE: 'Fall wegen unbezahltem Artikel',
    FR: 'Cas d\'article impayé',
    IT: 'Caso articolo non pagato',
    CA: 'Unpaid Item Case',
    AU: 'Unpaid Item Case',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'trust'
  },
  'Unpaid Item Assistant': {
    US: 'Unpaid Item Assistant',
    UK: 'Unpaid Item Assistant',
    DE: 'Assistent für unbezahlte Artikel',
    FR: 'Assistant article impayé',
    IT: 'Assistente articoli non pagati',
    CA: 'Unpaid Item Assistant',
    AU: 'Unpaid Item Assistant',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Unpaid Item Strike': {
    US: 'Unpaid Item Strike',
    UK: 'Unpaid Item Strike',
    DE: 'Verstoß wegen Nichtzahlung',
    FR: 'Avertissement article impayé',
    IT: 'Avvertimento articolo non pagato',
    CA: 'Unpaid Item Strike',
    AU: 'Unpaid Item Strike',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Cancel Order': {
    US: 'Cancel Order',
    UK: 'Cancel Order',
    DE: 'Bestellung stornieren',
    FR: 'Annuler la commande',
    IT: 'Annulla ordine',
    CA: 'Cancel Order',
    AU: 'Cancel Order',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  // LISTING DURATION & INVENTORY STATUS
  'Listing Duration': {
    US: 'Listing Duration',
    UK: 'Listing Duration',
    DE: 'Angebotsdauer',
    FR: 'Durée de l\'annonce',
    IT: 'Durata inserzione',
    CA: 'Listing Duration',
    AU: 'Listing Duration',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Good Till Cancelled': {
    US: 'Good \'Til Cancelled (GTC)',
    UK: 'Good \'Til Cancelled (GTC)',
    DE: 'Unbefristet (GTC)',
    FR: 'Jusqu\'à annulation (GTC)',
    IT: 'Fino a cancellazione (GTC)',
    CA: 'Good \'Til Cancelled (GTC)',
    AU: 'Good \'Til Cancelled (GTC)',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  '1-Day Listing': {
    US: '1-Day Listing',
    UK: '1-Day Listing',
    DE: '1-Tages-Angebot',
    FR: 'Annonce 1 jour',
    IT: 'Inserzione 1 giorno',
    CA: '1-Day Listing',
    AU: '1-Day Listing',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  '7-Day Listing': {
    US: '7-Day Listing',
    UK: '7-Day Listing',
    DE: '7-Tages-Angebot',
    FR: 'Annonce 7 jours',
    IT: 'Inserzione 7 giorni',
    CA: '7-Day Listing',
    AU: '7-Day Listing',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Out of Stock': {
    US: 'Out of Stock',
    UK: 'Out of Stock',
    DE: 'Nicht vorrätig',
    FR: 'Rupture de stock',
    IT: 'Esaurito',
    CA: 'Out of Stock',
    AU: 'Out of Stock',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Quantity Available': {
    US: 'Quantity Available',
    UK: 'Quantity Available',
    DE: 'Verfügbare Anzahl',
    FR: 'Quantité disponible',
    IT: 'Quantità disponibile',
    CA: 'Quantity Available',
    AU: 'Quantity Available',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Inventory Management': {
    US: 'Inventory Management',
    UK: 'Inventory Management',
    DE: 'Bestandsverwaltung',
    FR: 'Gestion des stocks',
    IT: 'Gestione inventario',
    CA: 'Inventory Management',
    AU: 'Inventory Management',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Stock Levels': {
    US: 'Stock Levels',
    UK: 'Stock Levels',
    DE: 'Lagerbestände',
    FR: 'Niveaux de stock',
    IT: 'Livelli di scorte',
    CA: 'Stock Levels',
    AU: 'Stock Levels',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // CATEGORY & PRODUCT SPECIFICS
  'Category Specifics': {
    US: 'Category Specifics',
    UK: 'Category Specifics',
    DE: 'Kategoriespezifika',
    FR: 'Caractéristiques de catégorie',
    IT: 'Specifiche di categoria',
    CA: 'Category Specifics',
    AU: 'Category Specifics',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Required Item Specifics': {
    US: 'Required Item Specifics',
    UK: 'Required Item Specifics',
    DE: 'Erforderliche Artikelmerkmale',
    FR: 'Caractéristiques requises',
    IT: 'Specifiche obbligatorie',
    CA: 'Required Item Specifics',
    AU: 'Required Item Specifics',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Recommended Item Specifics': {
    US: 'Recommended Item Specifics',
    UK: 'Recommended Item Specifics',
    DE: 'Empfohlene Artikelmerkmale',
    FR: 'Caractéristiques recommandées',
    IT: 'Specifiche consigliate',
    CA: 'Recommended Item Specifics',
    AU: 'Recommended Item Specifics',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Condition Description': {
    US: 'Condition Description',
    UK: 'Condition Description',
    DE: 'Zustandsbeschreibung',
    FR: 'Description de l\'état',
    IT: 'Descrizione condizione',
    CA: 'Condition Description',
    AU: 'Condition Description',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'UPC': {
    US: 'UPC (Universal Product Code)',
    UK: 'UPC (Universal Product Code)',
    DE: 'UPC (Universal Product Code)',
    FR: 'UPC (Universal Product Code)',
    IT: 'UPC (Universal Product Code)',
    CA: 'UPC (Universal Product Code)',
    AU: 'UPC (Universal Product Code)',
    status: 'global',
    type: 'category',
    tier: 'feature',
    parent: 'platform'
  },
  'EAN': {
    US: 'EAN (European Article Number)',
    UK: 'EAN (European Article Number)',
    DE: 'EAN (European Article Number)',
    FR: 'EAN (European Article Number)',
    IT: 'EAN (European Article Number)',
    CA: 'EAN (European Article Number)',
    AU: 'EAN (European Article Number)',
    status: 'global',
    type: 'category',
    tier: 'feature',
    parent: 'platform'
  },
  'ISBN': {
    US: 'ISBN (International Standard Book Number)',
    UK: 'ISBN (International Standard Book Number)',
    DE: 'ISBN (International Standard Book Number)',
    FR: 'ISBN (International Standard Book Number)',
    IT: 'ISBN (International Standard Book Number)',
    CA: 'ISBN (International Standard Book Number)',
    AU: 'ISBN (International Standard Book Number)',
    status: 'global',
    type: 'category',
    tier: 'feature',
    parent: 'platform'
  },
  'GTIN': {
    US: 'GTIN (Global Trade Item Number)',
    UK: 'GTIN (Global Trade Item Number)',
    DE: 'GTIN (Global Trade Item Number)',
    FR: 'GTIN (Global Trade Item Number)',
    IT: 'GTIN (Global Trade Item Number)',
    CA: 'GTIN (Global Trade Item Number)',
    AU: 'GTIN (Global Trade Item Number)',
    status: 'global',
    type: 'category',
    tier: 'feature',
    parent: 'platform'
  },
  'MPN': {
    US: 'MPN (Manufacturer Part Number)',
    UK: 'MPN (Manufacturer Part Number)',
    DE: 'MPN (Manufacturer Part Number)',
    FR: 'MPN (Manufacturer Part Number)',
    IT: 'MPN (Manufacturer Part Number)',
    CA: 'MPN (Manufacturer Part Number)',
    AU: 'MPN (Manufacturer Part Number)',
    status: 'global',
    type: 'category',
    tier: 'feature',
    parent: 'platform'
  },

  // SEARCH & DISCOVERY ALGORITHMS
  'Cassini': {
    US: 'Cassini',
    UK: 'Cassini',
    DE: 'Cassini',
    FR: 'Cassini',
    IT: 'Cassini',
    CA: 'Cassini',
    AU: 'Cassini',
    status: 'global',
    type: 'category',
    tier: 'platform',
    parent: 'discovery'
  },
  'Best Match': {
    US: 'Best Match',
    UK: 'Best Match',
    DE: 'Beste Ergebnisse',
    FR: 'Meilleure correspondance',
    IT: 'Migliore corrispondenza',
    CA: 'Best Match',
    AU: 'Best Match',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'discovery'
  },
  'Search Ranking': {
    US: 'Search Ranking',
    UK: 'Search Ranking',
    DE: 'Suchreihenfolge',
    FR: 'Classement de recherche',
    IT: 'Classifica di ricerca',
    CA: 'Search Ranking',
    AU: 'Search Ranking',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'discovery'
  },
  'Similar Sponsored Items': {
    US: 'Similar Sponsored Items',
    UK: 'Similar Sponsored Items',
    DE: 'Ähnliche gesponserte Artikel',
    FR: 'Articles sponsorisés similaires',
    IT: 'Articoli sponsorizzati simili',
    CA: 'Similar Sponsored Items',
    AU: 'Similar Sponsored Items',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'advertising'
  },
  'Related Products': {
    US: 'Related Products',
    UK: 'Related Products',
    DE: 'Ähnliche Produkte',
    FR: 'Produits similaires',
    IT: 'Prodotti correlati',
    CA: 'Related Products',
    AU: 'Related Products',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'discovery'
  },
  'Priority Strategy': {
    US: 'Priority Strategy',
    UK: 'Priority Strategy',
    DE: 'Premium-Strategie',
    FR: 'Stratégie prioritaire',
    IT: 'Strategia prioritaria',
    CA: 'Priority Strategy',
    AU: 'Priority Strategy',
    status: 'confirmed',
    type: 'category',
    tier: 'variant',
    parent: 'advertising'
  },
  'General Strategy': {
    US: 'General Strategy',
    UK: 'General Strategy',
    DE: 'Allgemeine Strategie',
    FR: 'Stratégie générale',
    IT: 'Strategia generale',
    CA: 'General Strategy',
    AU: 'General Strategy',
    status: 'confirmed',
    type: 'category',
    tier: 'variant',
    parent: 'advertising'
  },

  // MOBILE APPS & MOBILE FEATURES
  'eBay Mobile App': {
    US: 'eBay Mobile App',
    UK: 'eBay Mobile App',
    DE: 'eBay Mobile App',
    FR: 'Application mobile eBay',
    IT: 'App mobile eBay',
    CA: 'eBay Mobile App',
    AU: 'eBay Mobile App',
    status: 'confirmed',
    type: 'category',
    tier: 'platform',
    parent: 'platform'
  },
  'eBay Selling App': {
    US: 'eBay Selling App',
    UK: 'eBay Selling App',
    DE: 'eBay Verkaufs-App',
    FR: 'Application de vente eBay',
    IT: 'App vendita eBay',
    CA: 'eBay Selling App',
    AU: 'eBay Selling App',
    status: 'confirmed',
    type: 'category',
    tier: 'platform',
    parent: 'sellertools'
  },
  'Magical Listing': {
    US: 'Magical Listing',
    UK: 'Magical Listing',
    DE: 'Magical Listing',
    FR: 'Magical Listing',
    IT: 'Magical Listing',
    CA: 'Magical Listing',
    AU: 'Magical Listing',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Image Search': {
    US: 'Image Search',
    UK: 'Image Search',
    DE: 'Bildersuche',
    FR: 'Recherche par image',
    IT: 'Ricerca per immagine',
    CA: 'Image Search',
    AU: 'Image Search',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'discovery'
  },
  'Watch Count': {
    US: 'Watch Count',
    UK: 'Watch Count',
    DE: 'Anzahl Beobachter',
    FR: 'Nombre d\'observateurs',
    IT: 'Numero osservatori',
    CA: 'Watch Count',
    AU: 'Watch Count',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Watchers': {
    US: 'Watchers',
    UK: 'Watchers',
    DE: 'Beobachter',
    FR: 'Observateurs',
    IT: 'Osservatori',
    CA: 'Watchers',
    AU: 'Watchers',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Page Views': {
    US: 'Page Views',
    UK: 'Page Views',
    DE: 'Seitenaufrufe',
    FR: 'Nombre de vues',
    IT: 'Visualizzazioni pagina',
    CA: 'Page Views',
    AU: 'Page Views',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Visitor Count': {
    US: 'Visitor Count',
    UK: 'Visitor Count',
    DE: 'Besucherzahl',
    FR: 'Nombre de visiteurs',
    IT: 'Numero visitatori',
    CA: 'Visitor Count',
    AU: 'Visitor Count',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // COMMUNICATIONS & ANNOUNCEMENTS
  'Seller Updates': {
    US: 'Seller Updates',
    UK: 'Seller Updates',
    DE: 'Verkäufer-Updates',
    FR: 'Actualités vendeurs',
    IT: 'Aggiornamenti venditori',
    CA: 'Seller Updates',
    AU: 'Seller Updates',
    status: 'confirmed',
    type: 'category',
    tier: 'publication',
    parent: 'community'
  },

  // BUYER PROTECTION & TRUST PROGRAMS
  'Business Equipment Purchase Protection': {
    US: 'Business Equipment Purchase Protection',
    UK: 'Business Equipment Purchase Protection',
    DE: 'Käuferschutz für Geschäftsausstattung',
    FR: 'Protection Achat Équipement Professionnel',
    IT: 'Protezione Acquisto Attrezzature Aziendali',
    CA: 'Business Equipment Purchase Protection',
    AU: 'Business Equipment Purchase Protection',
    status: 'partial',
    type: 'trust',
    tier: 'program',
    parent: 'trust'
  },
  'Allstate Protection Plan': {
    US: 'Allstate Protection Plan',
    UK: 'Allstate Protection Plan',
    DE: 'Allstate Protection Plan',
    FR: 'Allstate Protection Plan',
    IT: 'Allstate Protection Plan',
    CA: 'Allstate Protection Plan',
    AU: 'Allstate Protection Plan',
    status: 'global',
    type: 'trust',
    tier: 'program',
    parent: 'trust'
  },
  'eBay Product Protection': {
    US: 'eBay Product Protection',
    UK: 'eBay Product Protection',
    DE: 'eBay Produktschutz',
    FR: 'Protection Produit eBay',
    IT: 'Protezione Prodotto eBay',
    CA: 'eBay Product Protection',
    AU: 'eBay Product Protection',
    status: 'confirmed',
    type: 'trust',
    tier: 'program',
    parent: 'trust'
  },
  'Second Year Warranty': {
    US: 'Second Year Warranty',
    UK: 'Second Year Warranty',
    DE: 'Garantieverlängerung zweites Jahr',
    FR: 'Garantie deuxième année',
    IT: 'Garanzia secondo anno',
    CA: 'Second Year Warranty',
    AU: 'Second Year Warranty',
    status: 'confirmed',
    type: 'trust',
    tier: 'program',
    parent: 'refurbished'
  },

  // ORDER FULFILLMENT & DELIVERY
  'Managed Delivery': {
    US: 'Managed Delivery',
    UK: 'Managed Delivery',
    DE: 'Managed Delivery',
    FR: 'Livraison gérée',
    IT: 'Consegna gestita',
    CA: 'Managed Delivery',
    AU: 'Managed Delivery',
    status: 'partial',
    type: 'category',
    tier: 'program',
    parent: 'shipping'
  },
  'Fulfillment by eBay': {
    US: 'Fulfillment by eBay',
    UK: 'Fulfillment by eBay',
    DE: 'Versand durch eBay',
    FR: 'Expédition par eBay',
    IT: 'Evasione da eBay',
    CA: 'Fulfillment by eBay',
    AU: 'Fulfillment by eBay',
    status: 'research-needed',
    type: 'category',
    tier: 'program',
    parent: 'shipping'
  },

  // PROMOTIONAL & LISTING ENHANCEMENTS
  'Promoted Listings Priority': {
    US: 'Promoted Listings Priority',
    UK: 'Promoted Listings Priority',
    DE: 'Promoted Listings Premium',
    FR: 'Annonces sponsorisées prioritaires',
    IT: 'Annunci sponsorizzati prioritari',
    CA: 'Promoted Listings Priority',
    AU: 'Promoted Listings Priority',
    status: 'confirmed',
    type: 'advertising',
    tier: 'variant',
    parent: 'advertising'
  },
  'Video Ads': {
    US: 'Video Ads',
    UK: 'Video Ads',
    DE: 'Video-Anzeigen',
    FR: 'Annonces vidéo',
    IT: 'Annunci video',
    CA: 'Video Ads',
    AU: 'Video Ads',
    status: 'confirmed',
    type: 'advertising',
    tier: 'feature',
    parent: 'advertising'
  },
  'Custom Landing Pages': {
    US: 'Custom Landing Pages',
    UK: 'Custom Landing Pages',
    DE: 'Benutzerdefinierte Zielseiten',
    FR: 'Pages de destination personnalisées',
    IT: 'Pagine di destinazione personalizzate',
    CA: 'Custom Landing Pages',
    AU: 'Custom Landing Pages',
    status: 'confirmed',
    type: 'advertising',
    tier: 'feature',
    parent: 'stores'
  },
  'Promoted Stores Custom': {
    US: 'Promoted Stores Custom',
    UK: 'Promoted Stores Custom',
    DE: 'Promoted Stores Custom',
    FR: 'Boutiques sponsorisées personnalisées',
    IT: 'Negozi sponsorizzati personalizzati',
    CA: 'Promoted Stores Custom',
    AU: 'Promoted Stores Custom',
    status: 'confirmed',
    type: 'advertising',
    tier: 'variant',
    parent: 'advertising'
  },

  // SELLER EDUCATION & SUPPORT
  'Seller Training Program': {
    US: 'Seller Training Program',
    UK: 'Seller Training Program',
    DE: 'Verkäufer-Schulungsprogramm',
    FR: 'Programme de formation vendeurs',
    IT: 'Programma di formazione venditori',
    CA: 'Seller Training Program',
    AU: 'Seller Training Program',
    status: 'confirmed',
    type: 'category',
    tier: 'program',
    parent: 'community'
  },
  'Seller Webinar Series': {
    US: 'Seller Webinar Series',
    UK: 'Seller Webinar Series',
    DE: 'Verkäufer-Webinar-Reihe',
    FR: 'Série de webinaires vendeurs',
    IT: 'Serie webinar venditori',
    CA: 'Seller Webinar Series',
    AU: 'Seller Webinar Series',
    status: 'confirmed',
    type: 'category',
    tier: 'program',
    parent: 'community'
  },
  'Seller Clinics': {
    US: 'Seller Clinics',
    UK: 'Seller Clinics',
    DE: 'Verkäufer-Sprechstunden',
    FR: 'Cliniques vendeurs',
    IT: 'Cliniche venditori',
    CA: 'Seller Clinics',
    AU: 'Seller Clinics',
    status: 'partial',
    type: 'category',
    tier: 'program',
    parent: 'community'
  },
  'Pro Seller Program': {
    US: 'Pro Seller Program',
    UK: 'Pro Seller Program',
    DE: 'Pro Seller-Programm',
    FR: 'Programme vendeur Pro',
    IT: 'Programma venditori Pro',
    CA: 'Pro Seller Program',
    AU: 'Pro Seller Program',
    status: 'partial',
    type: 'category',
    tier: 'program',
    parent: 'sellertools'
  },
  'Seller OnRamp': {
    US: 'Seller OnRamp',
    UK: 'Seller OnRamp',
    DE: 'Verkäufer-Einstieg',
    FR: 'Accès vendeurs',
    IT: 'Accesso venditori',
    CA: 'Seller OnRamp',
    AU: 'Seller OnRamp',
    status: 'confirmed',
    type: 'category',
    tier: 'program',
    parent: 'community'
  },
  'Training Calendar': {
    US: 'Training Calendar',
    UK: 'Training Calendar',
    DE: 'Schulungskalender',
    FR: 'Calendrier de formation',
    IT: 'Calendario formazione',
    CA: 'Training Calendar',
    AU: 'Training Calendar',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'community'
  },
  'eBay Global Sellers YouTube Channel': {
    US: 'eBay Global Sellers YouTube Channel',
    UK: 'eBay Global Sellers YouTube Channel',
    DE: 'eBay Global Sellers YouTube-Kanal',
    FR: 'Chaîne YouTube eBay Global Sellers',
    IT: 'Canale YouTube eBay Global Sellers',
    CA: 'eBay Global Sellers YouTube Channel',
    AU: 'eBay Global Sellers YouTube Channel',
    status: 'global',
    type: 'category',
    tier: 'platform',
    parent: 'community'
  },

  // SUSTAINABILITY & IMPACT
  'Recommerce Report': {
    US: 'Recommerce Report',
    UK: 'Recommerce Report',
    DE: 'Recommerce-Bericht',
    FR: 'Rapport Recommerce',
    IT: 'Report Recommerce',
    CA: 'Recommerce Report',
    AU: 'Recommerce Report',
    status: 'global',
    type: 'impact',
    tier: 'publication',
    parent: 'impact'
  },
  'eBay Impact': {
    US: 'eBay Impact',
    UK: 'eBay Impact',
    DE: 'eBay Impact',
    FR: 'eBay Impact',
    IT: 'eBay Impact',
    CA: 'eBay Impact',
    AU: 'eBay Impact',
    status: 'global',
    type: 'impact',
    tier: 'program',
    parent: 'impact'
  },
  'Climate Transition Plan': {
    US: 'Climate Transition Plan',
    UK: 'Climate Transition Plan',
    DE: 'Klimaübergangsplan',
    FR: 'Plan de transition climatique',
    IT: 'Piano di transizione climatica',
    CA: 'Climate Transition Plan',
    AU: 'Climate Transition Plan',
    status: 'global',
    type: 'impact',
    tier: 'program',
    parent: 'impact'
  },

  // STORE CUSTOMIZATION FEATURES
  'Featured Categories': {
    US: 'Featured Categories',
    UK: 'Featured Categories',
    DE: 'Hervorgehobene Kategorien',
    FR: 'Catégories vedettes',
    IT: 'Categorie in evidenza',
    CA: 'Featured Categories',
    AU: 'Featured Categories',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'stores'
  },
  'Store Categories': {
    US: 'Store Categories',
    UK: 'Store Categories',
    DE: 'Shop-Kategorien',
    FR: 'Catégories de boutique',
    IT: 'Categorie negozio',
    CA: 'Store Categories',
    AU: 'Store Categories',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'stores'
  },
  'Custom Storefront': {
    US: 'Custom Storefront',
    UK: 'Custom Storefront',
    DE: 'Benutzerdefinierte Ladenfront',
    FR: 'Vitrine personnalisée',
    IT: 'Vetrina personalizzata',
    CA: 'Custom Storefront',
    AU: 'Custom Storefront',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'stores'
  },

  // SELLER PERFORMANCE & STANDARDS
  'Seller Performance Standards': {
    US: 'Seller Performance Standards',
    UK: 'Seller Performance Standards',
    DE: 'Verkäufer-Leistungsstandards',
    FR: 'Normes de performance vendeurs',
    IT: 'Standard prestazioni venditori',
    CA: 'Seller Performance Standards',
    AU: 'Seller Performance Standards',
    status: 'confirmed',
    type: 'category',
    tier: 'program',
    parent: 'sellertools'
  },
  'Above Standard': {
    US: 'Above Standard',
    UK: 'Above Standard',
    DE: 'Über dem Standard',
    FR: 'Au-dessus de la norme',
    IT: 'Sopra lo standard',
    CA: 'Above Standard',
    AU: 'Above Standard',
    status: 'confirmed',
    type: 'category',
    tier: 'variant',
    parent: 'sellertools'
  },
  'Below Standard': {
    US: 'Below Standard',
    UK: 'Below Standard',
    DE: 'Unter dem Standard',
    FR: 'En dessous de la norme',
    IT: 'Sotto lo standard',
    CA: 'Below Standard',
    AU: 'Below Standard',
    status: 'confirmed',
    type: 'category',
    tier: 'variant',
    parent: 'sellertools'
  },
  'Transaction Defect Rate': {
    US: 'Transaction Defect Rate',
    UK: 'Transaction Defect Rate',
    DE: 'Transaktionsfehlerrate',
    FR: 'Taux de défauts de transaction',
    IT: 'Tasso difetti transazione',
    CA: 'Transaction Defect Rate',
    AU: 'Transaction Defect Rate',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Late Shipment Rate': {
    US: 'Late Shipment Rate',
    UK: 'Late Shipment Rate',
    DE: 'Verspätete Versandrate',
    FR: 'Taux d\'envoi tardif',
    IT: 'Tasso spedizioni ritardate',
    CA: 'Late Shipment Rate',
    AU: 'Late Shipment Rate',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // PROMOTIONAL TOOLS
  'Volume Pricing': {
    US: 'Volume Pricing',
    UK: 'Volume Pricing',
    DE: 'Mengenrabatt',
    FR: 'Tarification par volume',
    IT: 'Prezzi per volume',
    CA: 'Volume Pricing',
    AU: 'Volume Pricing',
    status: 'confirmed',
    type: 'category',
    tier: 'program',
    parent: 'sellertools'
  },
  'Quantity Discounts': {
    US: 'Quantity Discounts',
    UK: 'Quantity Discounts',
    DE: 'Mengenrabatte',
    FR: 'Remises sur quantité',
    IT: 'Sconti quantità',
    CA: 'Quantity Discounts',
    AU: 'Quantity Discounts',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Multi-Buy Discounts': {
    US: 'Multi-Buy Discounts',
    UK: 'Multi-Buy Discounts',
    DE: 'Mehrfachkauf-Rabatte',
    FR: 'Remises multi-achats',
    IT: 'Sconti multi-acquisto',
    CA: 'Multi-Buy Discounts',
    AU: 'Multi-Buy Discounts',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // LISTING OPTIMIZATION
  'eBay Catalog Integration': {
    US: 'eBay Catalog Integration',
    UK: 'eBay Catalogue Integration',
    DE: 'eBay Katalogintegration',
    FR: 'Intégration catalogue eBay',
    IT: 'Integrazione catalogo eBay',
    CA: 'eBay Catalog Integration',
    AU: 'eBay Catalogue Integration',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Product Identifiers': {
    US: 'Product Identifiers',
    UK: 'Product Identifiers',
    DE: 'Produktkennungen',
    FR: 'Identifiants produit',
    IT: 'Identificatori prodotto',
    CA: 'Product Identifiers',
    AU: 'Product Identifiers',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'AI Item Specifics': {
    US: 'AI Item Specifics',
    UK: 'AI Item Specifics',
    DE: 'KI-Artikelmerkmale',
    FR: 'Caractéristiques d\'article IA',
    IT: 'Specifiche articolo IA',
    CA: 'AI Item Specifics',
    AU: 'AI Item Specifics',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'End and Relist': {
    US: 'End and Relist',
    UK: 'End and Relist',
    DE: 'Beenden und neu einstellen',
    FR: 'Terminer et remettre en vente',
    IT: 'Termina e rimetti in vendita',
    CA: 'End and Relist',
    AU: 'End and Relist',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // BULK LISTING & API TOOLS
  'Seller Hub Reports': {
    US: 'Seller Hub Reports',
    UK: 'Seller Hub Reports',
    DE: 'Verkäufer-Cockpit-Berichte',
    FR: 'Rapports Hub vendeur',
    IT: 'Report Console venditori',
    CA: 'Seller Hub Reports',
    AU: 'Seller Hub Reports',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Sell Feed API': {
    US: 'Sell Feed API',
    UK: 'Sell Feed API',
    DE: 'Sell Feed API',
    FR: 'API Sell Feed',
    IT: 'API Sell Feed',
    CA: 'Sell Feed API',
    AU: 'Sell Feed API',
    status: 'global',
    type: 'developer',
    tier: 'platform',
    parent: 'developer'
  },
  'Inventory API': {
    US: 'Inventory API',
    UK: 'Inventory API',
    DE: 'Inventory API',
    FR: 'API Inventaire',
    IT: 'API Inventario',
    CA: 'Inventory API',
    AU: 'Inventory API',
    status: 'global',
    type: 'developer',
    tier: 'platform',
    parent: 'developer'
  },
  'Trading API': {
    US: 'Trading API',
    UK: 'Trading API',
    DE: 'Trading API',
    FR: 'API Trading',
    IT: 'API Trading',
    CA: 'Trading API',
    AU: 'Trading API',
    status: 'global',
    type: 'developer',
    tier: 'platform',
    parent: 'developer'
  },
  'Bulk Data Exchange Service': {
    US: 'Bulk Data Exchange Service',
    UK: 'Bulk Data Exchange Service',
    DE: 'Massendatenaustausch-Service',
    FR: 'Service d\'échange de données en masse',
    IT: 'Servizio scambio dati in blocco',
    CA: 'Bulk Data Exchange Service',
    AU: 'Bulk Data Exchange Service',
    status: 'global',
    type: 'developer',
    tier: 'platform',
    parent: 'developer'
  },

  // MARKET INTELLIGENCE & RESEARCH
  'Market Intelligence': {
    US: 'Market Intelligence',
    UK: 'Market Intelligence',
    DE: 'Marktintelligenz',
    FR: 'Intelligence du marché',
    IT: 'Intelligenza di mercato',
    CA: 'Market Intelligence',
    AU: 'Market Intelligence',
    status: 'research-needed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Competitor Research': {
    US: 'Competitor Research',
    UK: 'Competitor Research',
    DE: 'Wettbewerbsanalyse',
    FR: 'Recherche concurrentielle',
    IT: 'Ricerca concorrenti',
    CA: 'Competitor Research',
    AU: 'Competitor Research',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Sell-Through Rate': {
    US: 'Sell-Through Rate',
    UK: 'Sell-Through Rate',
    DE: 'Verkaufsrate',
    FR: 'Taux de vente',
    IT: 'Tasso di vendita',
    CA: 'Sell-Through Rate',
    AU: 'Sell-Through Rate',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // COMMUNICATION TOOLS
  'Buyer Messages': {
    US: 'Buyer Messages',
    UK: 'Buyer Messages',
    DE: 'Käufernachrichten',
    FR: 'Messages acheteurs',
    IT: 'Messaggi acquirenti',
    CA: 'Buyer Messages',
    AU: 'Buyer Messages',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'AI Message Suggestions': {
    US: 'AI Message Suggestions',
    UK: 'AI Message Suggestions',
    DE: 'KI-Nachrichtenvorschläge',
    FR: 'Suggestions de messages IA',
    IT: 'Suggerimenti messaggi IA',
    CA: 'AI Message Suggestions',
    AU: 'AI Message Suggestions',
    status: 'partial',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Threaded Conversations': {
    US: 'Threaded Conversations',
    UK: 'Threaded Conversations',
    DE: 'Thread-Konversationen',
    FR: 'Conversations par fil',
    IT: 'Conversazioni per thread',
    CA: 'Threaded Conversations',
    AU: 'Threaded Conversations',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  // SHIPPING TOOLS
  'Shipping Calculator': {
    US: 'Shipping Calculator',
    UK: 'Postage Calculator',
    DE: 'Versandkostenrechner',
    FR: 'Calculateur d\'expédition',
    IT: 'Calcolatore spedizione',
    CA: 'Shipping Calculator',
    AU: 'Postage Calculator',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Calculated Shipping': {
    US: 'Calculated Shipping',
    UK: 'Calculated Postage',
    DE: 'Berechneter Versand',
    FR: 'Frais d\'expédition calculés',
    IT: 'Spedizione calcolata',
    CA: 'Calculated Shipping',
    AU: 'Calculated Postage',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Package Dimensions': {
    US: 'Package Dimensions',
    UK: 'Package Dimensions',
    DE: 'Paketabmessungen',
    FR: 'Dimensions du colis',
    IT: 'Dimensioni pacco',
    CA: 'Package Dimensions',
    AU: 'Package Dimensions',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Dimensional Weight': {
    US: 'Dimensional Weight',
    UK: 'Dimensional Weight',
    DE: 'Volumengewicht',
    FR: 'Poids volumétrique',
    IT: 'Peso volumetrico',
    CA: 'Dimensional Weight',
    AU: 'Dimensional Weight',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  // SELLER EVENTS & CONFERENCES
  'eBay Open': {
    US: 'eBay Open',
    UK: 'eBay Open',
    DE: 'eBay Open',
    FR: 'eBay Open',
    IT: 'eBay Open',
    CA: 'eBay Open',
    AU: 'eBay Open',
    status: 'global',
    type: 'category',
    tier: 'event',
    parent: 'community'
  },
  'eBay Open: On the Road': {
    US: 'eBay Open: On the Road',
    UK: 'eBay Open: On the Road',
    DE: 'eBay Open: Unterwegs',
    FR: 'eBay Open: Sur la route',
    IT: 'eBay Open: In viaggio',
    CA: 'eBay Open: On the Road',
    AU: 'eBay Open: On the Road',
    status: 'confirmed',
    type: 'category',
    tier: 'event',
    parent: 'community'
  },
  'Seller Check-In': {
    US: 'Seller Check-In',
    UK: 'Seller Check-In',
    DE: 'Verkäufer-Check-In',
    FR: 'Enregistrement vendeurs',
    IT: 'Check-in venditori',
    CA: 'Seller Check-In',
    AU: 'Seller Check-In',
    status: 'confirmed',
    type: 'category',
    tier: 'event',
    parent: 'community'
  },
  'Spring Seller Check-In': {
    US: 'Spring Seller Check-In',
    UK: 'Spring Seller Check-In',
    DE: 'Frühjahrs-Verkäufer-Check-In',
    FR: 'Enregistrement vendeurs printemps',
    IT: 'Check-in venditori primavera',
    CA: 'Spring Seller Check-In',
    AU: 'Spring Seller Check-In',
    status: 'partial',
    type: 'category',
    tier: 'event',
    parent: 'community'
  },
  'Winter Seller Check-In': {
    US: 'Winter Seller Check-In',
    UK: 'Winter Seller Check-In',
    DE: 'Winter-Verkäufer-Check-In',
    FR: 'Enregistrement vendeurs hiver',
    IT: 'Check-in venditori inverno',
    CA: 'Winter Seller Check-In',
    AU: 'Winter Seller Check-In',
    status: 'partial',
    type: 'category',
    tier: 'event',
    parent: 'community'
  },

  // AFFILIATE & AMBASSADOR PROGRAMS
  'eBay Ambassador Program': {
    US: 'eBay Ambassador Program',
    UK: 'eBay Ambassador Programme',
    DE: 'eBay Ambassador-Programm',
    FR: 'Programme Ambassadeur eBay',
    IT: 'Programma Ambasciatore eBay',
    CA: 'eBay Ambassador Program',
    AU: 'eBay Ambassador Programme',
    status: 'partial',
    type: 'category',
    tier: 'program',
    parent: 'community'
  },
  'Ambassador Storefront': {
    US: 'Ambassador Storefront',
    UK: 'Ambassador Storefront',
    DE: 'Ambassador-Ladenfront',
    FR: 'Vitrine Ambassadeur',
    IT: 'Vetrina Ambasciatore',
    CA: 'Ambassador Storefront',
    AU: 'Ambassador Storefront',
    status: 'partial',
    type: 'category',
    tier: 'feature',
    parent: 'community'
  },
  'eBay Partner Network': {
    US: 'eBay Partner Network',
    UK: 'eBay Partner Network',
    DE: 'eBay Partner Network',
    FR: 'Réseau Partenaires eBay',
    IT: 'Network Partner eBay',
    CA: 'eBay Partner Network',
    AU: 'eBay Partner Network',
    status: 'confirmed',
    type: 'category',
    tier: 'program',
    parent: 'developer'
  },

  // VALUATION & PRICING TOOLS
  'Trading Cards Price Guide': {
    US: 'Trading Cards Price Guide',
    UK: 'Trading Cards Price Guide',
    DE: 'Sammelkarten-Preisleitfaden',
    FR: 'Guide des prix cartes à collectionner',
    IT: 'Guida prezzi carte collezionabili',
    CA: 'Trading Cards Price Guide',
    AU: 'Trading Cards Price Guide',
    status: 'partial',
    type: 'category',
    tier: 'program',
    parent: 'collectibles'
  },
  'My Collection': {
    US: 'My Collection',
    UK: 'My Collection',
    DE: 'Meine Sammlung',
    FR: 'Ma collection',
    IT: 'La mia collezione',
    CA: 'My Collection',
    AU: 'My Collection',
    status: 'partial',
    type: 'category',
    tier: 'feature',
    parent: 'collectibles'
  },
  'Sold Listings': {
    US: 'Sold Listings',
    UK: 'Sold Listings',
    DE: 'Verkaufte Artikel',
    FR: 'Annonces vendues',
    IT: 'Annunci venduti',
    CA: 'Sold Listings',
    AU: 'Sold Listings',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'discovery'
  },

  // LISTING DESIGN TOOLS
  'Listing Designer': {
    US: 'Listing Designer',
    UK: 'Listing Designer',
    DE: 'Anzeigendesigner',
    FR: 'Concepteur d\'annonces',
    IT: 'Progettista annunci',
    CA: 'Listing Designer',
    AU: 'Listing Designer',
    status: 'confirmed',
    type: 'category',
    tier: 'program',
    parent: 'sellertools'
  },
  'Template Builder': {
    US: 'Template Builder',
    UK: 'Template Builder',
    DE: 'Vorlagen-Builder',
    FR: 'Créateur de modèles',
    IT: 'Creatore modelli',
    CA: 'Template Builder',
    AU: 'Template Builder',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'WYSIWYG Editor': {
    US: 'WYSIWYG Editor',
    UK: 'WYSIWYG Editor',
    DE: 'WYSIWYG-Editor',
    FR: 'Éditeur WYSIWYG',
    IT: 'Editor WYSIWYG',
    CA: 'WYSIWYG Editor',
    AU: 'WYSIWYG Editor',
    status: 'global',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Mobile Responsive Templates': {
    US: 'Mobile Responsive Templates',
    UK: 'Mobile Responsive Templates',
    DE: 'Mobile-responsive Vorlagen',
    FR: 'Modèles adaptés mobiles',
    IT: 'Modelli responsive mobile',
    CA: 'Mobile Responsive Templates',
    AU: 'Mobile Responsive Templates',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // FEEDBACK & RATINGS
  'Detailed Seller Ratings': {
    US: 'Detailed Seller Ratings',
    UK: 'Detailed Seller Ratings',
    DE: 'Detaillierte Verkäuferbewertungen',
    FR: 'Évaluations détaillées du vendeur',
    IT: 'Valutazioni dettagliate del venditore',
    CA: 'Detailed Seller Ratings',
    AU: 'Detailed Seller Ratings',
    status: 'confirmed',
    type: 'category',
    tier: 'program',
    parent: 'sellertools'
  },
  'DSR': {
    US: 'DSR',
    UK: 'DSR',
    DE: 'DSR',
    FR: 'DSR',
    IT: 'DSR',
    CA: 'DSR',
    AU: 'DSR',
    status: 'global',
    type: 'category',
    tier: 'variant',
    parent: 'sellertools'
  },
  'Bad Buyer Experience Rate': {
    US: 'Bad Buyer Experience Rate',
    UK: 'Bad Buyer Experience Rate',
    DE: 'Schlechte Käufererfahrungsrate',
    FR: 'Taux de mauvaise expérience acheteur',
    IT: 'Tasso esperienza acquirente negativa',
    CA: 'Bad Buyer Experience Rate',
    AU: 'Bad Buyer Experience Rate',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Positive Feedback Rate': {
    US: 'Positive Feedback Rate',
    UK: 'Positive Feedback Rate',
    DE: 'Positiv-Bewertungsrate',
    FR: 'Taux d\'évaluations positives',
    IT: 'Tasso feedback positivi',
    CA: 'Positive Feedback Rate',
    AU: 'Positive Feedback Rate',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // PAYMENT DISPUTE PROTECTION
  'Payment Dispute Seller Protections': {
    US: 'Payment Dispute Seller Protections',
    UK: 'Payment Dispute Seller Protections',
    DE: 'Zahlungsstreit-Verkäuferschutz',
    FR: 'Protections vendeur litiges paiement',
    IT: 'Protezioni venditore controversie pagamento',
    CA: 'Payment Dispute Seller Protections',
    AU: 'Payment Dispute Seller Protections',
    status: 'confirmed',
    type: 'trust',
    tier: 'program',
    parent: 'trust'
  },
  'Unauthorized Payment Protection': {
    US: 'Unauthorized Payment Protection',
    UK: 'Unauthorised Payment Protection',
    DE: 'Schutz vor unbefugten Zahlungen',
    FR: 'Protection paiement non autorisé',
    IT: 'Protezione pagamento non autorizzato',
    CA: 'Unauthorized Payment Protection',
    AU: 'Unauthorised Payment Protection',
    status: 'confirmed',
    type: 'trust',
    tier: 'program',
    parent: 'trust'
  },
  'Chargeback Protection': {
    US: 'Chargeback Protection',
    UK: 'Chargeback Protection',
    DE: 'Rückbuchungsschutz',
    FR: 'Protection rétrofacturation',
    IT: 'Protezione storno addebito',
    CA: 'Chargeback Protection',
    AU: 'Chargeback Protection',
    status: 'confirmed',
    type: 'trust',
    tier: 'program',
    parent: 'payments'
  },

  // LISTING UPGRADES
  'Bold Title': {
    US: 'Bold Title',
    UK: 'Bold Title',
    DE: 'Fettgedruckter Titel',
    FR: 'Titre en gras',
    IT: 'Titolo in grassetto',
    CA: 'Bold Title',
    AU: 'Bold Title',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Subtitle': {
    US: 'Subtitle',
    UK: 'Subtitle',
    DE: 'Untertitel',
    FR: 'Sous-titre',
    IT: 'Sottotitolo',
    CA: 'Subtitle',
    AU: 'Subtitle',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Gallery Plus': {
    US: 'Gallery Plus',
    UK: 'Gallery Plus',
    DE: 'Galerie Plus',
    FR: 'Galerie Plus',
    IT: 'Galleria Plus',
    CA: 'Gallery Plus',
    AU: 'Gallery Plus',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Listing Upgrades': {
    US: 'Listing Upgrades',
    UK: 'Listing Upgrades',
    DE: 'Anzeigen-Upgrades',
    FR: 'Améliorations d\'annonces',
    IT: 'Miglioramenti annunci',
    CA: 'Listing Upgrades',
    AU: 'Listing Upgrades',
    status: 'confirmed',
    type: 'category',
    tier: 'program',
    parent: 'sellertools'
  },

  // PROMOTIONAL CODES & COUPONS
  'Coupon Codes': {
    US: 'Coupon Codes',
    UK: 'Coupon Codes',
    DE: 'Gutscheincodes',
    FR: 'Codes promo',
    IT: 'Codici coupon',
    CA: 'Coupon Codes',
    AU: 'Coupon Codes',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Subscriber Discounts': {
    US: 'Subscriber Discounts',
    UK: 'Subscriber Discounts',
    DE: 'Abonnenten-Rabatte',
    FR: 'Remises abonnés',
    IT: 'Sconti abbonati',
    CA: 'Subscriber Discounts',
    AU: 'Subscriber Discounts',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Promotional Codes': {
    US: 'Promotional Codes',
    UK: 'Promotional Codes',
    DE: 'Aktionscodes',
    FR: 'Codes promotionnels',
    IT: 'Codici promozionali',
    CA: 'Promotional Codes',
    AU: 'Promotional Codes',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  // CROSS-BORDER PAYMENTS
  'Currency Conversion': {
    US: 'Currency Conversion',
    UK: 'Currency Conversion',
    DE: 'Währungsumrechnung',
    FR: 'Conversion de devise',
    IT: 'Conversione valuta',
    CA: 'Currency Conversion',
    AU: 'Currency Conversion',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Multi-Currency Payments': {
    US: 'Multi-Currency Payments',
    UK: 'Multi-Currency Payments',
    DE: 'Mehrwährungszahlungen',
    FR: 'Paiements multidevises',
    IT: 'Pagamenti multi-valuta',
    CA: 'Multi-Currency Payments',
    AU: 'Multi-Currency Payments',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'International Transaction Fee': {
    US: 'International Transaction Fee',
    UK: 'International Transaction Fee',
    DE: 'Internationale Transaktionsgebühr',
    FR: 'Frais de transaction internationale',
    IT: 'Commissione transazione internazionale',
    CA: 'International Transaction Fee',
    AU: 'International Transaction Fee',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },

  // LISTING FORMATS & DURATIONS
  'Auction-Style Listing': {
    US: 'Auction-Style Listing',
    UK: 'Auction-Style Listing',
    DE: 'Auktions-Angebot',
    FR: 'Annonce aux enchères',
    IT: 'Annuncio asta',
    CA: 'Auction-Style Listing',
    AU: 'Auction-Style Listing',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Fixed Price Listing': {
    US: 'Fixed Price Listing',
    UK: 'Fixed Price Listing',
    DE: 'Festpreisangebot',
    FR: 'Annonce à prix fixe',
    IT: 'Annuncio prezzo fisso',
    CA: 'Fixed Price Listing',
    AU: 'Fixed Price Listing',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Good Til Cancelled': {
    US: 'Good \'Til Cancelled',
    UK: 'Good \'Til Cancelled',
    DE: 'Bis auf Widerruf',
    FR: 'Valable jusqu\'à annulation',
    IT: 'Valido fino alla cancellazione',
    CA: 'Good \'Til Cancelled',
    AU: 'Good \'Til Cancelled',
    status: 'confirmed',
    type: 'category',
    tier: 'variant',
    parent: 'sellertools'
  },
  'GTC': {
    US: 'GTC',
    UK: 'GTC',
    DE: 'GTC',
    FR: 'GTC',
    IT: 'GTC',
    CA: 'GTC',
    AU: 'GTC',
    status: 'global',
    type: 'category',
    tier: 'variant',
    parent: 'sellertools'
  },
  'Listing Duration': {
    US: 'Listing Duration',
    UK: 'Listing Duration',
    DE: 'Angebotsdauer',
    FR: 'Durée de l\'annonce',
    IT: 'Durata annuncio',
    CA: 'Listing Duration',
    AU: 'Listing Duration',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // PRODUCT IDENTIFIERS
  'UPC': {
    US: 'UPC',
    UK: 'UPC',
    DE: 'UPC',
    FR: 'UPC',
    IT: 'UPC',
    CA: 'UPC',
    AU: 'UPC',
    status: 'global',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'EAN': {
    US: 'EAN',
    UK: 'EAN',
    DE: 'EAN',
    FR: 'EAN',
    IT: 'EAN',
    CA: 'EAN',
    AU: 'EAN',
    status: 'global',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'MPN': {
    US: 'MPN',
    UK: 'MPN',
    DE: 'MPN',
    FR: 'MPN',
    IT: 'MPN',
    CA: 'MPN',
    AU: 'MPN',
    status: 'global',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'GTIN': {
    US: 'GTIN',
    UK: 'GTIN',
    DE: 'GTIN',
    FR: 'GTIN',
    IT: 'GTIN',
    CA: 'GTIN',
    AU: 'GTIN',
    status: 'global',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'ISBN': {
    US: 'ISBN',
    UK: 'ISBN',
    DE: 'ISBN',
    FR: 'ISBN',
    IT: 'ISBN',
    CA: 'ISBN',
    AU: 'ISBN',
    status: 'global',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // BUYER REQUIREMENTS & BLOCKING
  'Buyer Requirements': {
    US: 'Buyer Requirements',
    UK: 'Buyer Requirements',
    DE: 'Käuferanforderungen',
    FR: 'Exigences acheteurs',
    IT: 'Requisiti acquirenti',
    CA: 'Buyer Requirements',
    AU: 'Buyer Requirements',
    status: 'confirmed',
    type: 'category',
    tier: 'program',
    parent: 'sellertools'
  },
  'Blocked Buyer List': {
    US: 'Blocked Buyer List',
    UK: 'Blocked Buyer List',
    DE: 'Gesperrte-Käufer-Liste',
    FR: 'Liste acheteurs bloqués',
    IT: 'Elenco acquirenti bloccati',
    CA: 'Blocked Buyer List',
    AU: 'Blocked Buyer List',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Buyer Requirements Activity Log': {
    US: 'Buyer Requirements Activity Log',
    UK: 'Buyer Requirements Activity Log',
    DE: 'Aktivitätsprotokoll Käuferanforderungen',
    FR: 'Journal d\'activité exigences acheteurs',
    IT: 'Registro attività requisiti acquirenti',
    CA: 'Buyer Requirements Activity Log',
    AU: 'Buyer Requirements Activity Log',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // SHIPPING SETTINGS
  'Handling Time': {
    US: 'Handling Time',
    UK: 'Handling Time',
    DE: 'Bearbeitungszeit',
    FR: 'Délai de traitement',
    IT: 'Tempo di gestione',
    CA: 'Handling Time',
    AU: 'Handling Time',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Estimated Delivery Date': {
    US: 'Estimated Delivery Date',
    UK: 'Estimated Delivery Date',
    DE: 'Voraussichtliches Lieferdatum',
    FR: 'Date de livraison estimée',
    IT: 'Data di consegna stimata',
    CA: 'Estimated Delivery Date',
    AU: 'Estimated Delivery Date',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Item Location': {
    US: 'Item Location',
    UK: 'Item Location',
    DE: 'Artikelstandort',
    FR: 'Localisation de l\'article',
    IT: 'Posizione articolo',
    CA: 'Item Location',
    AU: 'Item Location',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Shipping Policies': {
    US: 'Shipping Policies',
    UK: 'Postage Policies',
    DE: 'Versandrichtlinien',
    FR: 'Politiques d\'expédition',
    IT: 'Politiche di spedizione',
    CA: 'Shipping Policies',
    AU: 'Postage Policies',
    status: 'confirmed',
    type: 'category',
    tier: 'program',
    parent: 'shipping'
  },

  // RETURNS MANAGEMENT
  'Return Policy': {
    US: 'Return Policy',
    UK: 'Return Policy',
    DE: 'Rückgaberichtlinie',
    FR: 'Politique de retour',
    IT: 'Politica di reso',
    CA: 'Return Policy',
    AU: 'Return Policy',
    status: 'confirmed',
    type: 'category',
    tier: 'program',
    parent: 'buyer'
  },
  'Free Returns': {
    US: 'Free Returns',
    UK: 'Free Returns',
    DE: 'Kostenlose Rücksendung',
    FR: 'Retours gratuits',
    IT: 'Resi gratuiti',
    CA: 'Free Returns',
    AU: 'Free Returns',
    status: 'confirmed',
    type: 'category',
    tier: 'program',
    parent: 'buyer'
  },
  'Seller-Paid Returns': {
    US: 'Seller-Paid Returns',
    UK: 'Seller-Paid Returns',
    DE: 'Vom Verkäufer bezahlte Rücksendungen',
    FR: 'Retours payés par le vendeur',
    IT: 'Resi pagati dal venditore',
    CA: 'Seller-Paid Returns',
    AU: 'Seller-Paid Returns',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Buyer-Paid Returns': {
    US: 'Buyer-Paid Returns',
    UK: 'Buyer-Paid Returns',
    DE: 'Vom Käufer bezahlte Rücksendungen',
    FR: 'Retours payés par l\'acheteur',
    IT: 'Resi pagati dall\'acquirente',
    CA: 'Buyer-Paid Returns',
    AU: 'Buyer-Paid Returns',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Return Window': {
    US: 'Return Window',
    UK: 'Return Window',
    DE: 'Rückgabefrist',
    FR: 'Période de retour',
    IT: 'Periodo di reso',
    CA: 'Return Window',
    AU: 'Return Window',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'eBay Return Labels': {
    US: 'eBay Return Labels',
    UK: 'eBay Return Labels',
    DE: 'eBay-Rücksendeetiketten',
    FR: 'Étiquettes de retour eBay',
    IT: 'Etichette reso eBay',
    CA: 'eBay Return Labels',
    AU: 'eBay Return Labels',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  // ITEM SPECIFICS & ATTRIBUTES
  'Item Specifics': {
    US: 'Item Specifics',
    UK: 'Item Specifics',
    DE: 'Artikelmerkmale',
    FR: 'Caractéristiques de l\'article',
    IT: 'Specifiche dell\'oggetto',
    CA: 'Item Specifics',
    AU: 'Item Specifics',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Item Condition': {
    US: 'Item Condition',
    UK: 'Item Condition',
    DE: 'Artikelzustand',
    FR: 'État de l\'article',
    IT: 'Condizione articolo',
    CA: 'Item Condition',
    AU: 'Item Condition',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Brand New': {
    US: 'Brand New',
    UK: 'Brand New',
    DE: 'Brandneu',
    FR: 'Neuf',
    IT: 'Nuovo',
    CA: 'Brand New',
    AU: 'Brand New',
    status: 'confirmed',
    type: 'category',
    tier: 'variant',
    parent: 'sellertools'
  },
  'New with Tags': {
    US: 'New with Tags',
    UK: 'New with Tags',
    DE: 'Neu mit Etikett',
    FR: 'Neuf avec étiquettes',
    IT: 'Nuovo con etichette',
    CA: 'New with Tags',
    AU: 'New with Tags',
    status: 'confirmed',
    type: 'category',
    tier: 'variant',
    parent: 'sellertools'
  },
  'Like New': {
    US: 'Like New',
    UK: 'Like New',
    DE: 'Wie neu',
    FR: 'Comme neuf',
    IT: 'Come nuovo',
    CA: 'Like New',
    AU: 'Like New',
    status: 'confirmed',
    type: 'category',
    tier: 'variant',
    parent: 'sellertools'
  },
  'Pre-Owned': {
    US: 'Pre-Owned',
    UK: 'Pre-Owned',
    DE: 'Gebraucht',
    FR: 'Occasion',
    IT: 'Usato',
    CA: 'Pre-Owned',
    AU: 'Pre-Owned',
    status: 'confirmed',
    type: 'category',
    tier: 'variant',
    parent: 'sellertools'
  },
  'For Parts': {
    US: 'For Parts',
    UK: 'For Parts',
    DE: 'Für Ersatzteile',
    FR: 'Pour pièces détachées',
    IT: 'Per ricambi',
    CA: 'For Parts',
    AU: 'For Parts',
    status: 'confirmed',
    type: 'category',
    tier: 'variant',
    parent: 'sellertools'
  },

  // ACCOUNT & PROFILE
  'My eBay Summary': {
    US: 'My eBay Summary',
    UK: 'My eBay Summary',
    DE: 'Mein eBay - Übersicht',
    FR: 'Résumé Mon eBay',
    IT: 'Riepilogo Il mio eBay',
    CA: 'My eBay Summary',
    AU: 'My eBay Summary',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Account Settings': {
    US: 'Account Settings',
    UK: 'Account Settings',
    DE: 'Kontoeinstellungen',
    FR: 'Paramètres du compte',
    IT: 'Impostazioni account',
    CA: 'Account Settings',
    AU: 'Account Settings',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Site Preferences': {
    US: 'Site Preferences',
    UK: 'Site Preferences',
    DE: 'Website-Einstellungen',
    FR: 'Préférences du site',
    IT: 'Preferenze sito',
    CA: 'Site Preferences',
    AU: 'Site Preferences',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Selling Preferences': {
    US: 'Selling Preferences',
    UK: 'Selling Preferences',
    DE: 'Verkaufseinstellungen',
    FR: 'Préférences de vente',
    IT: 'Preferenze vendita',
    CA: 'Selling Preferences',
    AU: 'Selling Preferences',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Notification Preferences': {
    US: 'Notification Preferences',
    UK: 'Notification Preferences',
    DE: 'Benachrichtigungseinstellungen',
    FR: 'Préférences de notification',
    IT: 'Preferenze notifiche',
    CA: 'Notification Preferences',
    AU: 'Notification Preferences',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Communication Preferences': {
    US: 'Communication Preferences',
    UK: 'Communication Preferences',
    DE: 'Kommunikationseinstellungen',
    FR: 'Préférences de communication',
    IT: 'Preferenze comunicazione',
    CA: 'Communication Preferences',
    AU: 'Communication Preferences',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Seller Feedback Profile': {
    US: 'Seller Feedback Profile',
    UK: 'Seller Feedback Profile',
    DE: 'Verkäufer-Bewertungsprofil',
    FR: 'Profil d\'évaluations vendeur',
    IT: 'Profilo feedback venditore',
    CA: 'Seller Feedback Profile',
    AU: 'Seller Feedback Profile',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // NAVIGATION & BROWSING
  'Shop by Category': {
    US: 'Shop by Category',
    UK: 'Shop by Category',
    DE: 'Nach Kategorie kaufen',
    FR: 'Acheter par catégorie',
    IT: 'Acquista per categoria',
    CA: 'Shop by Category',
    AU: 'Shop by Category',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'discovery'
  },
  'All Categories': {
    US: 'All Categories',
    UK: 'All Categories',
    DE: 'Alle Kategorien',
    FR: 'Toutes les catégories',
    IT: 'Tutte le categorie',
    CA: 'All Categories',
    AU: 'All Categories',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'discovery'
  },
  'Browse': {
    US: 'Browse',
    UK: 'Browse',
    DE: 'Stöbern',
    FR: 'Parcourir',
    IT: 'Sfoglia',
    CA: 'Browse',
    AU: 'Browse',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'discovery'
  },

  // PAYMENT METHODS
  'Credit Card': {
    US: 'Credit Card',
    UK: 'Credit Card',
    DE: 'Kreditkarte',
    FR: 'Carte de crédit',
    IT: 'Carta di credito',
    CA: 'Credit Card',
    AU: 'Credit Card',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Debit Card': {
    US: 'Debit Card',
    UK: 'Debit Card',
    DE: 'Debitkarte',
    FR: 'Carte de débit',
    IT: 'Carta di debito',
    CA: 'Debit Card',
    AU: 'Debit Card',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Apple Pay': {
    US: 'Apple Pay',
    UK: 'Apple Pay',
    DE: 'Apple Pay',
    FR: 'Apple Pay',
    IT: 'Apple Pay',
    CA: 'Apple Pay',
    AU: 'Apple Pay',
    status: 'global',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Google Pay': {
    US: 'Google Pay',
    UK: 'Google Pay',
    DE: 'Google Pay',
    FR: 'Google Pay',
    IT: 'Google Pay',
    CA: 'Google Pay',
    AU: 'Google Pay',
    status: 'global',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'PayPal': {
    US: 'PayPal',
    UK: 'PayPal',
    DE: 'PayPal',
    FR: 'PayPal',
    IT: 'PayPal',
    CA: 'PayPal',
    AU: 'PayPal',
    status: 'global',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Venmo': {
    US: 'Venmo',
    UK: 'Venmo',
    DE: 'Venmo',
    FR: 'Venmo',
    IT: 'Venmo',
    CA: 'Venmo',
    AU: 'Venmo',
    status: 'partial',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Klarna': {
    US: 'Klarna',
    UK: 'Klarna',
    DE: 'Klarna',
    FR: 'Klarna',
    IT: 'Klarna',
    CA: 'Klarna',
    AU: 'Klarna',
    status: 'partial',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'PayPal Credit': {
    US: 'PayPal Credit',
    UK: 'PayPal Credit',
    DE: 'PayPal-Kredit',
    FR: 'PayPal Crédit',
    IT: 'PayPal Credito',
    CA: 'PayPal Credit',
    AU: 'PayPal Credit',
    status: 'partial',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },

  // BUYER PURCHASE PROTECTION
  'Vehicle Purchase Protection': {
    US: 'Vehicle Purchase Protection',
    UK: 'Vehicle Purchase Protection',
    DE: 'Fahrzeug-Käuferschutz',
    FR: 'Protection achat véhicule',
    IT: 'Protezione acquisto veicolo',
    CA: 'Vehicle Purchase Protection',
    AU: 'Vehicle Purchase Protection',
    status: 'confirmed',
    type: 'trust',
    tier: 'program',
    parent: 'motors'
  },
  'VPP': {
    US: 'VPP',
    UK: 'VPP',
    DE: 'VPP',
    FR: 'VPP',
    IT: 'VPP',
    CA: 'VPP',
    AU: 'VPP',
    status: 'global',
    type: 'trust',
    tier: 'variant',
    parent: 'motors'
  },
  'BEPP': {
    US: 'BEPP',
    UK: 'BEPP',
    DE: 'BEPP',
    FR: 'BEPP',
    IT: 'BEPP',
    CA: 'BEPP',
    AU: 'BEPP',
    status: 'global',
    type: 'trust',
    tier: 'variant',
    parent: 'trust'
  },

  // SELLER FEES
  'Insertion Fee': {
    US: 'Insertion Fee',
    UK: 'Insertion Fee',
    DE: 'Einstellgebühr',
    FR: 'Frais d\'insertion',
    IT: 'Commissione inserzione',
    CA: 'Insertion Fee',
    AU: 'Insertion Fee',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Final Value Fee': {
    US: 'Final Value Fee',
    UK: 'Final Value Fee',
    DE: 'Verkaufsprovision',
    FR: 'Frais de vente finale',
    IT: 'Commissione valore finale',
    CA: 'Final Value Fee',
    AU: 'Final Value Fee',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Per Order Fee': {
    US: 'Per Order Fee',
    UK: 'Per Order Fee',
    DE: 'Gebühr pro Bestellung',
    FR: 'Frais par commande',
    IT: 'Commissione per ordine',
    CA: 'Per Order Fee',
    AU: 'Per Order Fee',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Zero Insertion Fee Listings': {
    US: 'Zero Insertion Fee Listings',
    UK: 'Zero Insertion Fee Listings',
    DE: 'Angebote ohne Einstellgebühr',
    FR: 'Annonces sans frais d\'insertion',
    IT: 'Inserzioni senza commissione',
    CA: 'Zero Insertion Fee Listings',
    AU: 'Zero Insertion Fee Listings',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },

  // DISPLAY ADVERTISING
  'Display Ads': {
    US: 'Display Ads',
    UK: 'Display Ads',
    DE: 'Display-Anzeigen',
    FR: 'Annonces display',
    IT: 'Annunci display',
    CA: 'Display Ads',
    AU: 'Display Ads',
    status: 'confirmed',
    type: 'advertising',
    tier: 'program',
    parent: 'advertising'
  },
  'Banner Ads': {
    US: 'Banner Ads',
    UK: 'Banner Ads',
    DE: 'Bannerwerbung',
    FR: 'Bannières publicitaires',
    IT: 'Banner pubblicitari',
    CA: 'Banner Ads',
    AU: 'Banner Ads',
    status: 'confirmed',
    type: 'advertising',
    tier: 'feature',
    parent: 'advertising'
  },
  'Cost Per Sale': {
    US: 'Cost Per Sale',
    UK: 'Cost Per Sale',
    DE: 'Kosten pro Verkauf',
    FR: 'Coût par vente',
    IT: 'Costo per vendita',
    CA: 'Cost Per Sale',
    AU: 'Cost Per Sale',
    status: 'confirmed',
    type: 'advertising',
    tier: 'feature',
    parent: 'advertising'
  },
  'Cost Per Click': {
    US: 'Cost Per Click',
    UK: 'Cost Per Click',
    DE: 'Kosten pro Klick',
    FR: 'Coût par clic',
    IT: 'Costo per clic',
    CA: 'Cost Per Click',
    AU: 'Cost Per Click',
    status: 'confirmed',
    type: 'advertising',
    tier: 'feature',
    parent: 'advertising'
  },
  'Ad Attribution': {
    US: 'Ad Attribution',
    UK: 'Ad Attribution',
    DE: 'Anzeigenzuordnung',
    FR: 'Attribution publicitaire',
    IT: 'Attribuzione annunci',
    CA: 'Ad Attribution',
    AU: 'Ad Attribution',
    status: 'confirmed',
    type: 'advertising',
    tier: 'feature',
    parent: 'advertising'
  },

  // SELLER VERIFICATION
  'Seller Verification': {
    US: 'Seller Verification',
    UK: 'Seller Verification',
    DE: 'Verkäufer-Verifizierung',
    FR: 'Vérification vendeur',
    IT: 'Verifica venditore',
    CA: 'Seller Verification',
    AU: 'Seller Verification',
    status: 'confirmed',
    type: 'category',
    tier: 'program',
    parent: 'sellertools'
  },
  'Identity Verification': {
    US: 'Identity Verification',
    UK: 'Identity Verification',
    DE: 'Identitätsprüfung',
    FR: 'Vérification d\'identité',
    IT: 'Verifica identità',
    CA: 'Identity Verification',
    AU: 'Identity Verification',
    status: 'confirmed',
    type: 'category',
    tier: 'program',
    parent: 'sellertools'
  },
  'ID Upload': {
    US: 'ID Upload',
    UK: 'ID Upload',
    DE: 'Ausweis-Upload',
    FR: 'Téléchargement pièce d\'identité',
    IT: 'Caricamento documento',
    CA: 'ID Upload',
    AU: 'ID Upload',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Biometric Verification': {
    US: 'Biometric Verification',
    UK: 'Biometric Verification',
    DE: 'Biometrische Verifizierung',
    FR: 'Vérification biométrique',
    IT: 'Verifica biometrica',
    CA: 'Biometric Verification',
    AU: 'Biometric Verification',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Address Verification': {
    US: 'Address Verification',
    UK: 'Address Verification',
    DE: 'Adressverifizierung',
    FR: 'Vérification d\'adresse',
    IT: 'Verifica indirizzo',
    CA: 'Address Verification',
    AU: 'Address Verification',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // PROHIBITED & RESTRICTED ITEMS
  'Prohibited Items Policy': {
    US: 'Prohibited Items Policy',
    UK: 'Prohibited Items Policy',
    DE: 'Richtlinie für verbotene Artikel',
    FR: 'Politique articles interdits',
    IT: 'Politica articoli vietati',
    CA: 'Prohibited Items Policy',
    AU: 'Prohibited Items Policy',
    status: 'confirmed',
    type: 'category',
    tier: 'program',
    parent: 'platform'
  },
  'Restricted Items Policy': {
    US: 'Restricted Items Policy',
    UK: 'Restricted Items Policy',
    DE: 'Richtlinie für eingeschränkte Artikel',
    FR: 'Politique articles restreints',
    IT: 'Politica articoli limitati',
    CA: 'Restricted Items Policy',
    AU: 'Restricted Items Policy',
    status: 'confirmed',
    type: 'category',
    tier: 'program',
    parent: 'platform'
  },
  'Products with Eligibility Requirements': {
    US: 'Products with Eligibility Requirements',
    UK: 'Products with Eligibility Requirements',
    DE: 'Produkte mit Zulassungsanforderungen',
    FR: 'Produits avec exigences d\'éligibilité',
    IT: 'Prodotti con requisiti di idoneità',
    CA: 'Products with Eligibility Requirements',
    AU: 'Products with Eligibility Requirements',
    status: 'confirmed',
    type: 'category',
    tier: 'program',
    parent: 'platform'
  },
  'eBay User Agreement': {
    US: 'eBay User Agreement',
    UK: 'eBay User Agreement',
    DE: 'eBay-Nutzungsbedingungen',
    FR: 'Conditions d\'utilisation eBay',
    IT: 'Contratto utente eBay',
    CA: 'eBay User Agreement',
    AU: 'eBay User Agreement',
    status: 'confirmed',
    type: 'category',
    tier: 'legal',
    parent: 'platform'
  },

  // CUSTOMER SUPPORT
  'Help Center': {
    US: 'Help Center',
    UK: 'Help Centre',
    DE: 'Hilfecenter',
    FR: 'Centre d\'aide',
    IT: 'Centro assistenza',
    CA: 'Help Centre',
    AU: 'Help Centre',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'community'
  },
  'Help & Contact': {
    US: 'Help & Contact',
    UK: 'Help & Contact',
    DE: 'Hilfe & Kontakt',
    FR: 'Aide et contact',
    IT: 'Aiuto e contatti',
    CA: 'Help & Contact',
    AU: 'Help & Contact',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'community'
  },
  'Contact Us': {
    US: 'Contact Us',
    UK: 'Contact Us',
    DE: 'Kontakt',
    FR: 'Nous contacter',
    IT: 'Contattaci',
    CA: 'Contact Us',
    AU: 'Contact Us',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'community'
  },
  'Customer Support': {
    US: 'Customer Support',
    UK: 'Customer Support',
    DE: 'Kundensupport',
    FR: 'Assistance client',
    IT: 'Assistenza clienti',
    CA: 'Customer Support',
    AU: 'Customer Support',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'community'
  },
  'Live Chat': {
    US: 'Live Chat',
    UK: 'Live Chat',
    DE: 'Live-Chat',
    FR: 'Chat en direct',
    IT: 'Chat dal vivo',
    CA: 'Live Chat',
    AU: 'Live Chat',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'community'
  },

  // MOBILE APP FEATURES
  'eBay Mobile App': {
    US: 'eBay Mobile App',
    UK: 'eBay Mobile App',
    DE: 'eBay Mobile App',
    FR: 'Application mobile eBay',
    IT: 'App mobile eBay',
    CA: 'eBay Mobile App',
    AU: 'eBay Mobile App',
    status: 'global',
    type: 'category',
    tier: 'platform',
    parent: 'platform'
  },
  'Push Notifications': {
    US: 'Push Notifications',
    UK: 'Push Notifications',
    DE: 'Push-Benachrichtigungen',
    FR: 'Notifications push',
    IT: 'Notifiche push',
    CA: 'Push Notifications',
    AU: 'Push Notifications',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'platform'
  },
  'Order Updates': {
    US: 'Order Updates',
    UK: 'Order Updates',
    DE: 'Bestellaktualisierungen',
    FR: 'Mises à jour de commande',
    IT: 'Aggiornamenti ordine',
    CA: 'Order Updates',
    AU: 'Order Updates',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Shopping Updates': {
    US: 'Shopping Updates',
    UK: 'Shopping Updates',
    DE: 'Einkaufs-Updates',
    FR: 'Mises à jour shopping',
    IT: 'Aggiornamenti shopping',
    CA: 'Shopping Updates',
    AU: 'Shopping Updates',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Selling Notifications': {
    US: 'Selling Notifications',
    UK: 'Selling Notifications',
    DE: 'Verkaufsbenachrichtigungen',
    FR: 'Notifications de vente',
    IT: 'Notifiche vendita',
    CA: 'Selling Notifications',
    AU: 'Selling Notifications',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Real-Time Tracking': {
    US: 'Real-Time Tracking',
    UK: 'Real-Time Tracking',
    DE: 'Echtzeit-Tracking',
    FR: 'Suivi en temps réel',
    IT: 'Tracciamento in tempo reale',
    CA: 'Real-Time Tracking',
    AU: 'Real-Time Tracking',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  // SAVED & FOLLOWING
  'Saved Sellers': {
    US: 'Saved Sellers',
    UK: 'Saved Sellers',
    DE: 'Gespeicherte Verkäufer',
    FR: 'Vendeurs sauvegardés',
    IT: 'Venditori salvati',
    CA: 'Saved Sellers',
    AU: 'Saved Sellers',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Following': {
    US: 'Following',
    UK: 'Following',
    DE: 'Folge ich',
    FR: 'Abonnements',
    IT: 'Seguiti',
    CA: 'Following',
    AU: 'Following',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Favorite Sellers': {
    US: 'Favorite Sellers',
    UK: 'Favourite Sellers',
    DE: 'Lieblingsverkäufer',
    FR: 'Vendeurs favoris',
    IT: 'Venditori preferiti',
    CA: 'Favourite Sellers',
    AU: 'Favourite Sellers',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Saved': {
    US: 'Saved',
    UK: 'Saved',
    DE: 'Gespeichert',
    FR: 'Enregistré',
    IT: 'Salvati',
    CA: 'Saved',
    AU: 'Saved',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Feed': {
    US: 'Feed',
    UK: 'Feed',
    DE: 'Feed',
    FR: 'Fil d\'actualité',
    IT: 'Feed',
    CA: 'Feed',
    AU: 'Feed',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'discovery'
  },

  // BIDDING & AUCTIONS
  'Bidding': {
    US: 'Bidding',
    UK: 'Bidding',
    DE: 'Bieten',
    FR: 'Enchères',
    IT: 'Offerte',
    CA: 'Bidding',
    AU: 'Bidding',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Proxy Bidding': {
    US: 'Proxy Bidding',
    UK: 'Proxy Bidding',
    DE: 'Proxy-Bieten',
    FR: 'Enchères automatiques',
    IT: 'Offerta automatica',
    CA: 'Proxy Bidding',
    AU: 'Proxy Bidding',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Automatic Bidding': {
    US: 'Automatic Bidding',
    UK: 'Automatic Bidding',
    DE: 'Automatisches Bieten',
    FR: 'Enchères automatiques',
    IT: 'Offerta automatica',
    CA: 'Automatic Bidding',
    AU: 'Automatic Bidding',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Maximum Bid': {
    US: 'Maximum Bid',
    UK: 'Maximum Bid',
    DE: 'Maximalgebot',
    FR: 'Enchère maximale',
    IT: 'Offerta massima',
    CA: 'Maximum Bid',
    AU: 'Maximum Bid',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Bid Increments': {
    US: 'Bid Increments',
    UK: 'Bid Increments',
    DE: 'Gebotsschritte',
    FR: 'Paliers d\'enchères',
    IT: 'Incrementi offerta',
    CA: 'Bid Increments',
    AU: 'Bid Increments',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Bid History': {
    US: 'Bid History',
    UK: 'Bid History',
    DE: 'Gebotsverlauf',
    FR: 'Historique des enchères',
    IT: 'Storico offerte',
    CA: 'Bid History',
    AU: 'Bid History',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Outbid Notification': {
    US: 'Outbid Notification',
    UK: 'Outbid Notification',
    DE: 'Überboten-Benachrichtigung',
    FR: 'Notification surenchère',
    IT: 'Notifica superato',
    CA: 'Outbid Notification',
    AU: 'Outbid Notification',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  // COLLECTIONS & CURATION
  'Collections': {
    US: 'Collections',
    UK: 'Collections',
    DE: 'Kollektionen',
    FR: 'Collections',
    IT: 'Collezioni',
    CA: 'Collections',
    AU: 'Collections',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'discovery'
  },
  'Hand-Picked Collections': {
    US: 'Hand-Picked Collections',
    UK: 'Hand-Picked Collections',
    DE: 'Handverlesene Kollektionen',
    FR: 'Collections sélectionnées',
    IT: 'Collezioni selezionate',
    CA: 'Hand-Picked Collections',
    AU: 'Hand-Picked Collections',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'discovery'
  },
  'Curated Lists': {
    US: 'Curated Lists',
    UK: 'Curated Lists',
    DE: 'Kuratierte Listen',
    FR: 'Listes organisées',
    IT: 'Liste curate',
    CA: 'Curated Lists',
    AU: 'Curated Lists',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'discovery'
  },

  // OFFERS & NEGOTIATIONS
  'Make Offer': {
    US: 'Make Offer',
    UK: 'Make Offer',
    DE: 'Preisvorschlag senden',
    FR: 'Faire une offre',
    IT: 'Fai un\'offerta',
    CA: 'Make Offer',
    AU: 'Make Offer',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Counteroffer': {
    US: 'Counteroffer',
    UK: 'Counteroffer',
    DE: 'Gegenangebot',
    FR: 'Contre-offre',
    IT: 'Controfferta',
    CA: 'Counteroffer',
    AU: 'Counteroffer',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Accept Offer': {
    US: 'Accept Offer',
    UK: 'Accept Offer',
    DE: 'Angebot annehmen',
    FR: 'Accepter l\'offre',
    IT: 'Accetta offerta',
    CA: 'Accept Offer',
    AU: 'Accept Offer',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Decline Offer': {
    US: 'Decline Offer',
    UK: 'Decline Offer',
    DE: 'Angebot ablehnen',
    FR: 'Refuser l\'offre',
    IT: 'Rifiuta offerta',
    CA: 'Decline Offer',
    AU: 'Decline Offer',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Send Offer to Buyers': {
    US: 'Send Offer to Buyers',
    UK: 'Send Offer to Buyers',
    DE: 'Angebot an Käufer senden',
    FR: 'Envoyer une offre aux acheteurs',
    IT: 'Invia offerta agli acquirenti',
    CA: 'Send Offer to Buyers',
    AU: 'Send Offer to Buyers',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // PURCHASE & WATCHING
  'Purchase History': {
    US: 'Purchase History',
    UK: 'Purchase History',
    DE: 'Kaufübersicht',
    FR: 'Historique d\'achats',
    IT: 'Cronologia acquisti',
    CA: 'Purchase History',
    AU: 'Purchase History',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Watching': {
    US: 'Watching',
    UK: 'Watching',
    DE: 'Beobachten',
    FR: 'Suivi',
    IT: 'Osservati',
    CA: 'Watching',
    AU: 'Watching',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Bids & Offers': {
    US: 'Bids & Offers',
    UK: 'Bids & Offers',
    DE: 'Gebote & Angebote',
    FR: 'Enchères et offres',
    IT: 'Offerte e proposte',
    CA: 'Bids & Offers',
    AU: 'Bids & Offers',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  // SHOPPING CART & CHECKOUT
  'Shopping Cart': {
    US: 'Shopping Cart',
    UK: 'Shopping Basket',
    DE: 'Warenkorb',
    FR: 'Panier',
    IT: 'Carrello',
    CA: 'Shopping Cart',
    AU: 'Shopping Basket',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Add to Cart': {
    US: 'Add to Cart',
    UK: 'Add to Basket',
    DE: 'In den Warenkorb',
    FR: 'Ajouter au panier',
    IT: 'Aggiungi al carrello',
    CA: 'Add to Cart',
    AU: 'Add to Basket',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Go to Checkout': {
    US: 'Go to Checkout',
    UK: 'Go to Checkout',
    DE: 'Zur Kasse',
    FR: 'Passer au paiement',
    IT: 'Vai al pagamento',
    CA: 'Go to Checkout',
    AU: 'Go to Checkout',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Checkout': {
    US: 'Checkout',
    UK: 'Checkout',
    DE: 'Kasse',
    FR: 'Paiement',
    IT: 'Pagamento',
    CA: 'Checkout',
    AU: 'Checkout',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Combined Checkout': {
    US: 'Combined Checkout',
    UK: 'Combined Checkout',
    DE: 'Kombinierter Checkout',
    FR: 'Paiement combiné',
    IT: 'Checkout combinato',
    CA: 'Combined Checkout',
    AU: 'Combined Checkout',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  // GIFT CARDS & VOUCHERS
  'eBay Gift Card': {
    US: 'eBay Gift Card',
    UK: 'eBay Gift Card',
    DE: 'eBay-Geschenkkarte',
    FR: 'Carte cadeau eBay',
    IT: 'Carta regalo eBay',
    CA: 'eBay Gift Card',
    AU: 'eBay Gift Card',
    status: 'confirmed',
    type: 'category',
    tier: 'program',
    parent: 'payments'
  },
  'Gift Certificates': {
    US: 'Gift Certificates',
    UK: 'Gift Certificates',
    DE: 'Geschenkgutscheine',
    FR: 'Certificats cadeaux',
    IT: 'Certificati regalo',
    CA: 'Gift Certificates',
    AU: 'Gift Certificates',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Digital Gift Cards': {
    US: 'Digital Gift Cards',
    UK: 'Digital Gift Cards',
    DE: 'Digitale Geschenkkarten',
    FR: 'Cartes cadeaux numériques',
    IT: 'Carte regalo digitali',
    CA: 'Digital Gift Cards',
    AU: 'Digital Gift Cards',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Redemption Code': {
    US: 'Redemption Code',
    UK: 'Redemption Code',
    DE: 'Einlösungscode',
    FR: 'Code de rédemption',
    IT: 'Codice di riscatto',
    CA: 'Redemption Code',
    AU: 'Redemption Code',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },

  // SELLER ANALYTICS & INSIGHTS
  'Seller Insights': {
    US: 'Seller Insights',
    UK: 'Seller Insights',
    DE: 'Verkäufer-Einblicke',
    FR: 'Analyses vendeur',
    IT: 'Dati venditori',
    CA: 'Seller Insights',
    AU: 'Seller Insights',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Analytics Dashboard': {
    US: 'Analytics Dashboard',
    UK: 'Analytics Dashboard',
    DE: 'Analyse-Dashboard',
    FR: 'Tableau de bord analytique',
    IT: 'Dashboard analitica',
    CA: 'Analytics Dashboard',
    AU: 'Analytics Dashboard',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Traffic Reports': {
    US: 'Traffic Reports',
    UK: 'Traffic Reports',
    DE: 'Traffic-Berichte',
    FR: 'Rapports de trafic',
    IT: 'Report traffico',
    CA: 'Traffic Reports',
    AU: 'Traffic Reports',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Click-Through Rate': {
    US: 'Click-Through Rate',
    UK: 'Click-Through Rate',
    DE: 'Klickrate',
    FR: 'Taux de clics',
    IT: 'Tasso di clic',
    CA: 'Click-Through Rate',
    AU: 'Click-Through Rate',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Customer Service Metrics': {
    US: 'Customer Service Metrics',
    UK: 'Customer Service Metrics',
    DE: 'Kundenservice-Metriken',
    FR: 'Métriques service client',
    IT: 'Metriche servizio clienti',
    CA: 'Customer Service Metrics',
    AU: 'Customer Service Metrics',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // LISTING STATUS
  'Active Listings': {
    US: 'Active Listings',
    UK: 'Active Listings',
    DE: 'Aktive Angebote',
    FR: 'Annonces actives',
    IT: 'Annunci attivi',
    CA: 'Active Listings',
    AU: 'Active Listings',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Sold Listings': {
    US: 'Sold Listings',
    UK: 'Sold Listings',
    DE: 'Verkaufte Artikel',
    FR: 'Annonces vendues',
    IT: 'Annunci venduti',
    CA: 'Sold Listings',
    AU: 'Sold Listings',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Completed Listings': {
    US: 'Completed Listings',
    UK: 'Completed Listings',
    DE: 'Beendete Angebote',
    FR: 'Annonces terminées',
    IT: 'Annunci completati',
    CA: 'Completed Listings',
    AU: 'Completed Listings',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Ended Listings': {
    US: 'Ended Listings',
    UK: 'Ended Listings',
    DE: 'Beendete Angebote',
    FR: 'Annonces terminées',
    IT: 'Annunci terminati',
    CA: 'Ended Listings',
    AU: 'Ended Listings',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Inactive Listings': {
    US: 'Inactive Listings',
    UK: 'Inactive Listings',
    DE: 'Inaktive Angebote',
    FR: 'Annonces inactives',
    IT: 'Annunci inattivi',
    CA: 'Inactive Listings',
    AU: 'Inactive Listings',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Unsold Listings': {
    US: 'Unsold Listings',
    UK: 'Unsold Listings',
    DE: 'Unverkaufte Angebote',
    FR: 'Annonces invendues',
    IT: 'Annunci invenduti',
    CA: 'Unsold Listings',
    AU: 'Unsold Listings',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // ============================================================
  // SELLER PERFORMANCE & TIERS
  // ============================================================

  'Seller Levels': {
    US: 'Seller levels',
    UK: 'Seller levels',
    DE: 'Verkäuferstufen',
    FR: 'Niveaux de vendeur',
    IT: 'Livelli del venditore',
    CA: 'Seller levels',
    AU: 'Seller levels',
    status: 'confirmed',
    type: 'trust',
    tier: 'program',
    parent: 'trust'
  },

  'Above Standard': {
    US: 'Above Standard',
    UK: 'Above Standard',
    DE: 'Überdurchschnittlich',
    FR: 'Supérieur au standard',
    IT: 'Superiore allo standard',
    CA: 'Above Standard',
    AU: 'Above Standard',
    status: 'confirmed',
    type: 'trust',
    tier: 'variant',
    parent: 'trust'
  },

  'Below Standard': {
    US: 'Below Standard',
    UK: 'Below Standard',
    DE: 'Unterdurchschnittlich',
    FR: 'Inférieur au standard',
    IT: 'Inferiore allo standard',
    CA: 'Below Standard',
    AU: 'Below Standard',
    status: 'confirmed',
    type: 'trust',
    tier: 'variant',
    parent: 'trust'
  },

  'Send Invoice': {
    US: 'Send invoice',
    UK: 'Send invoice',
    DE: 'Rechnung senden',
    FR: 'Envoyer une facture',
    IT: 'Invia fattura',
    CA: 'Send invoice',
    AU: 'Send invoice',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Return Preferences': {
    US: 'Return preferences',
    UK: 'Return preferences',
    DE: 'Rückgabepräferenzen',
    FR: 'Préférences de retour',
    IT: 'Preferenze di reso',
    CA: 'Return preferences',
    AU: 'Return preferences',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Time Away': {
    US: 'Time away',
    UK: 'Time away',
    DE: 'Abwesenheit',
    FR: 'Absence',
    IT: 'Assenza',
    CA: 'Time away',
    AU: 'Time away',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Payout Schedule': {
    US: 'Payout schedule',
    UK: 'Payout schedule',
    DE: 'Auszahlungsplan',
    FR: 'Calendrier de paiement',
    IT: 'Programmazione pagamenti',
    CA: 'Payout schedule',
    AU: 'Payout schedule',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },

  'Blocked Buyers': {
    US: 'Blocked buyers list',
    UK: 'Blocked buyers list',
    DE: 'Liste blockierter Käufer',
    FR: 'Liste des acheteurs bloqués',
    IT: 'Elenco acquirenti bloccati',
    CA: 'Blocked buyers list',
    AU: 'Blocked buyers list',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Buyer Requirements': {
    US: 'Buyer requirements',
    UK: 'Buyer requirements',
    DE: 'Käuferanforderungen',
    FR: 'Exigences pour les acheteurs',
    IT: 'Requisiti acquirente',
    CA: 'Buyer requirements',
    AU: 'Buyer requirements',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Business Policies': {
    US: 'Business policies',
    UK: 'Business policies',
    DE: 'Geschäftsrichtlinien',
    FR: 'Règles commerciales',
    IT: 'Criteri aziendali',
    CA: 'Business policies',
    AU: 'Business policies',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Quantity Discounts': {
    US: 'Volume pricing',
    UK: 'Multi-Buy',
    DE: 'Multi-Rabatt',
    FR: 'Achat multiple',
    IT: 'Volume pricing',
    CA: 'Volume pricing',
    AU: 'Volume pricing',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'advertising'
  },

  'Scheduled Listing': {
    US: 'Scheduled start time',
    UK: 'Scheduled start time',
    DE: 'Geplante Startzeit',
    FR: 'Heure de début programmée',
    IT: 'Ora di inizio programmata',
    CA: 'Scheduled start time',
    AU: 'Scheduled start time',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Unpaid Item Assistant': {
    US: 'Preferences for items awaiting payment',
    UK: 'Preferences for items awaiting payment',
    DE: 'Einstellungen für unbezahlte Artikel',
    FR: 'Préférences pour les articles en attente de paiement',
    IT: 'Preferenze per articoli in attesa di pagamento',
    CA: 'Preferences for items awaiting payment',
    AU: 'Preferences for items awaiting payment',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Reserve Price': {
    US: 'Reserve price',
    UK: 'Reserve price',
    DE: 'Mindestpreis',
    FR: 'Prix de réserve',
    IT: 'Prezzo di riserva',
    CA: 'Reserve price',
    AU: 'Reserve price',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Listing Upgrades': {
    US: 'Listing upgrades',
    UK: 'Listing upgrades',
    DE: 'Angebotsupgrades',
    FR: 'Améliorations d\'annonce',
    IT: 'Miglioramenti inserzione',
    CA: 'Listing upgrades',
    AU: 'Listing upgrades',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Subtitle': {
    US: 'Subtitle',
    UK: 'Subtitle',
    DE: 'Untertitel',
    FR: 'Sous-titre',
    IT: 'Sottotitolo',
    CA: 'Subtitle',
    AU: 'Subtitle',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Bold Title': {
    US: 'Bold title',
    UK: 'Bold title',
    DE: 'Fettgedruckter Titel',
    FR: 'Titre en gras',
    IT: 'Titolo in grassetto',
    CA: 'Bold title',
    AU: 'Bold title',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Gallery Plus': {
    US: 'Gallery Plus',
    UK: 'Gallery Plus',
    DE: 'Galerie Plus',
    FR: 'Galerie Plus',
    IT: 'Galleria Plus',
    CA: 'Gallery Plus',
    AU: 'Gallery Plus',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Promoted Listings Reports': {
    US: 'Promoted Listings reports',
    UK: 'Promoted Listings reports',
    DE: 'Promoted Listings-Berichte',
    FR: 'Rapports Promoted Listings',
    IT: 'Report Promoted Listings',
    CA: 'Promoted Listings reports',
    AU: 'Promoted Listings reports',
    status: 'confirmed',
    type: 'advertising',
    tier: 'feature',
    parent: 'advertising'
  },

  // ============================================================
  // LISTING MANAGEMENT
  // ============================================================

  'Drafts': {
    US: 'Drafts',
    UK: 'Drafts',
    DE: 'Entwürfe',
    FR: 'Brouillons',
    IT: 'Bozze',
    CA: 'Drafts',
    AU: 'Drafts',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Relist': {
    US: 'Relist',
    UK: 'Relist',
    DE: 'Erneut einstellen',
    FR: 'Remettre en vente',
    IT: 'Rimetti in vendita',
    CA: 'Relist',
    AU: 'Relist',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Selling Limits': {
    US: 'Selling limits',
    UK: 'Selling limits',
    DE: 'Verkaufslimits',
    FR: 'Limites de vente',
    IT: 'Limiti di vendita',
    CA: 'Selling limits',
    AU: 'Selling limits',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Print Shipping Label': {
    US: 'Print shipping label',
    UK: 'Print postage label',
    DE: 'Versandetikett drucken',
    FR: 'Imprimer étiquette d\'expédition',
    IT: 'Stampa etichetta di spedizione',
    CA: 'Print shipping label',
    AU: 'Print postage label',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  'Item Location': {
    US: 'Item location',
    UK: 'Item location',
    DE: 'Artikelstandort',
    FR: 'Emplacement de l\'objet',
    IT: 'Posizione dell\'oggetto',
    CA: 'Item location',
    AU: 'Item location',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Item Specifics': {
    US: 'Item specifics',
    UK: 'Item specifics',
    DE: 'Artikelmerkmale',
    FR: 'Caractéristiques de l\'objet',
    IT: 'Caratteristiche dell\'oggetto',
    CA: 'Item specifics',
    AU: 'Item specifics',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Product Identifiers': {
    US: 'Product identifiers',
    UK: 'Product identifiers',
    DE: 'Produktkennzeichnungen',
    FR: 'Identifiants de produit',
    IT: 'Identificatori del prodotto',
    CA: 'Product identifiers',
    AU: 'Product identifiers',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Performance Dashboard': {
    US: 'Performance dashboard',
    UK: 'Performance dashboard',
    DE: 'Leistungs-Dashboard',
    FR: 'Tableau de bord des performances',
    IT: 'Dashboard delle prestazioni',
    CA: 'Performance dashboard',
    AU: 'Performance dashboard',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Condition Description': {
    US: 'Condition description',
    UK: 'Condition description',
    DE: 'Zustandsbeschreibung',
    FR: 'Description de l\'état',
    IT: 'Descrizione delle condizioni',
    CA: 'Condition description',
    AU: 'Condition description',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Bulk Edit': {
    US: 'Bulk edit',
    UK: 'Bulk edit',
    DE: 'Massenbearbeitung',
    FR: 'Modification en masse',
    IT: 'Modifica in blocco',
    CA: 'Bulk edit',
    AU: 'Bulk edit',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Sell Similar': {
    US: 'Sell similar',
    UK: 'Sell similar',
    DE: 'Ähnliches verkaufen',
    FR: 'Vendre un article similaire',
    IT: 'Vendi un oggetto simile',
    CA: 'Sell similar',
    AU: 'Sell similar',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'End Listing': {
    US: 'End listing early',
    UK: 'End listing early',
    DE: 'Angebot vorzeitig beenden',
    FR: 'Mettre fin à l\'annonce',
    IT: 'Termina inserzione',
    CA: 'End listing early',
    AU: 'End listing early',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Send Offer to Watchers': {
    US: 'Send offer to watchers',
    UK: 'Send offer to watchers',
    DE: 'Angebot an Beobachter senden',
    FR: 'Envoyer une offre aux utilisateurs qui suivent',
    IT: 'Invia offerta agli osservatori',
    CA: 'Send offer to watchers',
    AU: 'Send offer to watchers',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'advertising'
  },

  // ============================================================
  // ADVANCED LISTING FEATURES
  // ============================================================

  'Variations': {
    US: 'Variations',
    UK: 'Variations',
    DE: 'Varianten',
    FR: 'Variations',
    IT: 'Varianti',
    CA: 'Variations',
    AU: 'Variations',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Import VAT': {
    US: 'Import VAT',
    UK: 'Import VAT',
    DE: 'Einfuhrumsatzsteuer',
    FR: 'TVA à l\'importation',
    IT: 'IVA all\'importazione',
    CA: 'Import VAT',
    AU: 'Import VAT',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },

  'VAT Collection': {
    US: 'VAT collection',
    UK: 'VAT collection',
    DE: 'Mehrwertsteuererhebung',
    FR: 'Collecte de la TVA',
    IT: 'Riscossione IVA',
    CA: 'VAT collection',
    AU: 'VAT collection',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },

  'Autopay': {
    US: 'Automatic payment',
    UK: 'Automatic payment',
    DE: 'Automatische Zahlung',
    FR: 'Paiement automatique',
    IT: 'Pagamento automatico',
    CA: 'Automatic payment',
    AU: 'Automatic payment',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },

  'Combined Shipping': {
    US: 'Combined shipping',
    UK: 'Combined postage',
    DE: 'Kombinierter Versand',
    FR: 'Frais de port combinés',
    IT: 'Spedizione combinata',
    CA: 'Combined shipping',
    AU: 'Combined postage',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  'Handling Time': {
    US: 'Handling time',
    UK: 'Dispatch time',
    DE: 'Bearbeitungszeit',
    FR: 'Délai d\'expédition',
    IT: 'Tempo di gestione',
    CA: 'Handling time',
    AU: 'Dispatch time',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  'Upload Tracking': {
    US: 'Upload tracking',
    UK: 'Upload tracking',
    DE: 'Tracking hochladen',
    FR: 'Télécharger le suivi',
    IT: 'Carica tracciamento',
    CA: 'Upload tracking',
    AU: 'Upload tracking',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  'Best Match': {
    US: 'Best Match',
    UK: 'Best Match',
    DE: 'Best Match',
    FR: 'Best Match',
    IT: 'Best Match',
    CA: 'Best Match',
    AU: 'Best Match',
    status: 'global',
    type: 'category',
    tier: 'feature',
    parent: 'discovery'
  },

  'Item Not Received': {
    US: 'Item not received',
    UK: 'Item not received',
    DE: 'Artikel nicht erhalten',
    FR: 'Objet non reçu',
    IT: 'Oggetto non ricevuto',
    CA: 'Item not received',
    AU: 'Item not received',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'trust'
  },

  // ============================================================
  // FEEDBACK SYSTEM
  // ============================================================

  'Item Not as Described': {
    US: 'Item not as described',
    UK: 'Item not as described',
    DE: 'Artikel entspricht nicht der Beschreibung',
    FR: 'Objet non conforme',
    IT: 'Oggetto non conforme alla descrizione',
    CA: 'Item not as described',
    AU: 'Item not as described',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'trust'
  },

  'Feedback Profile': {
    US: 'Feedback profile',
    UK: 'Feedback profile',
    DE: 'Bewertungsprofil',
    FR: 'Profil d\'évaluation',
    IT: 'Profilo feedback',
    CA: 'Feedback profile',
    AU: 'Feedback profile',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'trust'
  },

  'Feedback Score': {
    US: 'Feedback score',
    UK: 'Feedback score',
    DE: 'Bewertungspunktzahl',
    FR: 'Score d\'évaluation',
    IT: 'Punteggio feedback',
    CA: 'Feedback score',
    AU: 'Feedback score',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'trust'
  },

  'Detailed Seller Ratings': {
    US: 'Detailed seller ratings',
    UK: 'Detailed seller ratings',
    DE: 'Detaillierte Verkäuferbewertungen',
    FR: 'Évaluations détaillées du vendeur',
    IT: 'Valutazioni dettagliate del venditore',
    CA: 'Detailed seller ratings',
    AU: 'Detailed seller ratings',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'trust'
  },

  'Positive Feedback': {
    US: 'Positive feedback',
    UK: 'Positive feedback',
    DE: 'Positive Bewertung',
    FR: 'Évaluation positive',
    IT: 'Feedback positivo',
    CA: 'Positive feedback',
    AU: 'Positive feedback',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'trust'
  },

  'Neutral Feedback': {
    US: 'Neutral feedback',
    UK: 'Neutral feedback',
    DE: 'Neutrale Bewertung',
    FR: 'Évaluation neutre',
    IT: 'Feedback neutro',
    CA: 'Neutral feedback',
    AU: 'Neutral feedback',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'trust'
  },

  'Negative Feedback': {
    US: 'Negative feedback',
    UK: 'Negative feedback',
    DE: 'Negative Bewertung',
    FR: 'Évaluation négative',
    IT: 'Feedback negativo',
    CA: 'Negative feedback',
    AU: 'Negative feedback',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'trust'
  },

  'Reply to Feedback': {
    US: 'Reply to feedback',
    UK: 'Reply to feedback',
    DE: 'Auf Bewertung antworten',
    FR: 'Répondre à l\'évaluation',
    IT: 'Rispondi al feedback',
    CA: 'Reply to feedback',
    AU: 'Reply to feedback',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'trust'
  },

  'Feedback Revision': {
    US: 'Feedback revision',
    UK: 'Feedback revision',
    DE: 'Bewertungsrevision',
    FR: 'Révision d\'évaluation',
    IT: 'Revisione feedback',
    CA: 'Feedback revision',
    AU: 'Feedback revision',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'trust'
  },

  'Feedback Removal': {
    US: 'Feedback removal',
    UK: 'Feedback removal',
    DE: 'Bewertungsentfernung',
    FR: 'Suppression d\'évaluation',
    IT: 'Rimozione feedback',
    CA: 'Feedback removal',
    AU: 'Feedback removal',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'trust'
  },

  // ============================================================
  // INVENTORY MANAGEMENT
  // ============================================================

  'Custom Label': {
    US: 'Custom label',
    UK: 'Custom label',
    DE: 'Benutzerdefiniertes Etikett',
    FR: 'Étiquette personnalisée',
    IT: 'Etichetta personalizzata',
    CA: 'Custom label',
    AU: 'Custom label',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'SKU': {
    US: 'SKU',
    UK: 'SKU',
    DE: 'SKU',
    FR: 'SKU',
    IT: 'SKU',
    CA: 'SKU',
    AU: 'SKU',
    status: 'global',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Seller Notes': {
    US: 'Seller notes',
    UK: 'Seller notes',
    DE: 'Verkäufernotizen',
    FR: 'Notes du vendeur',
    IT: 'Note del venditore',
    CA: 'Seller notes',
    AU: 'Seller notes',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // ============================================================
  // ORDER & TRANSACTION MANAGEMENT
  // ============================================================

  'Order Details': {
    US: 'Order details',
    UK: 'Order details',
    DE: 'Bestelldetails',
    FR: 'Détails de la commande',
    IT: 'Dettagli dell\'ordine',
    CA: 'Order details',
    AU: 'Order details',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Mark as Shipped': {
    US: 'Mark as shipped',
    UK: 'Mark as dispatched',
    DE: 'Als versendet markieren',
    FR: 'Marquer comme expédié',
    IT: 'Contrassegna come spedito',
    CA: 'Mark as shipped',
    AU: 'Mark as dispatched',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  'Payment Holds': {
    US: 'Payment holds',
    UK: 'Payment holds',
    DE: 'Zahlungsrückstellungen',
    FR: 'Retenues de paiement',
    IT: 'Blocco pagamento',
    CA: 'Payment holds',
    AU: 'Payment holds',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },

  // ============================================================
  // FEES & BILLING
  // ============================================================

  'Final Value Fee': {
    US: 'Final value fee',
    UK: 'Final value fee',
    DE: 'Verkaufsprovision',
    FR: 'Frais de vente finaux',
    IT: 'Commissione sul valore finale',
    CA: 'Final value fee',
    AU: 'Final value fee',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },

  'Insertion Fee': {
    US: 'Insertion fee',
    UK: 'Insertion fee',
    DE: 'Angebotsgebühr',
    FR: 'Frais d\'insertion',
    IT: 'Commissione di inserzione',
    CA: 'Insertion fee',
    AU: 'Insertion fee',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },

  'Regulatory Operating Fee': {
    US: 'Regulatory operating fee',
    UK: 'Regulatory operating fee',
    DE: 'Regulatory operating fee',
    FR: 'Frais de fonctionnement réglementaires',
    IT: 'Commissione operativa normativa',
    CA: 'Regulatory operating fee',
    AU: 'Regulatory operating fee',
    status: 'partial',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },

  'Ad Rate': {
    US: 'Ad rate',
    UK: 'Ad rate',
    DE: 'Anzeigenrate',
    FR: 'Taux de publicité',
    IT: 'Percentuale pubblicità',
    CA: 'Ad rate',
    AU: 'Ad rate',
    status: 'confirmed',
    type: 'advertising',
    tier: 'feature',
    parent: 'advertising'
  },

  'Shipping Labels': {
    US: 'Shipping labels',
    UK: 'Postage labels',
    DE: 'Versandetiketten',
    FR: 'Étiquettes d\'expédition',
    IT: 'Etichette di spedizione',
    CA: 'Shipping labels',
    AU: 'Postage labels',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  'Carrier Discounts': {
    US: 'Carrier discounts',
    UK: 'Carrier discounts',
    DE: 'Versandrabatte',
    FR: 'Remises transporteur',
    IT: 'Sconti vettore',
    CA: 'Carrier discounts',
    AU: 'Carrier discounts',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  'Calculated Shipping': {
    US: 'Calculated shipping',
    UK: 'Calculated postage',
    DE: 'Berechneter Versand',
    FR: 'Frais de port calculés',
    IT: 'Spedizione calcolata',
    CA: 'Calculated shipping',
    AU: 'Calculated postage',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  'Flat Rate Shipping': {
    US: 'Flat rate shipping',
    UK: 'Flat rate postage',
    DE: 'Pauschalversand',
    FR: 'Frais de port forfaitaires',
    IT: 'Spedizione a tariffa fissa',
    CA: 'Flat rate shipping',
    AU: 'Flat rate postage',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  'Listing Visibility': {
    US: 'Listing visibility',
    UK: 'Listing visibility',
    DE: 'Angebotssichtbarkeit',
    FR: 'Visibilité de l\'annonce',
    IT: 'Visibilità inserzione',
    CA: 'Listing visibility',
    AU: 'Listing visibility',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Search Placement': {
    US: 'Search placement',
    UK: 'Search placement',
    DE: 'Suchplatzierung',
    FR: 'Placement dans les recherches',
    IT: 'Posizionamento nella ricerca',
    CA: 'Search placement',
    AU: 'Search placement',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'discovery'
  },

  'Purchase History': {
    US: 'Purchase history',
    UK: 'Purchase history',
    DE: 'Kaufhistorie',
    FR: 'Historique des achats',
    IT: 'Cronologia acquisti',
    CA: 'Purchase history',
    AU: 'Purchase history',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  // ============================================================
  // BUYER TOOLS & DISCOVERY
  // ============================================================

  'Item Description': {
    US: 'Item description',
    UK: 'Item description',
    DE: 'Artikelbeschreibung',
    FR: 'Description de l\'objet',
    IT: 'Descrizione dell\'oggetto',
    CA: 'Item description',
    AU: 'Item description',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  'Product Details': {
    US: 'Product details',
    UK: 'Product details',
    DE: 'Produktdetails',
    FR: 'Détails du produit',
    IT: 'Dettagli prodotto',
    CA: 'Product details',
    AU: 'Product details',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  'Completed Listings': {
    US: 'Completed listings',
    UK: 'Completed listings',
    DE: 'Abgeschlossene Angebote',
    FR: 'Annonces terminées',
    IT: 'Inserzioni completate',
    CA: 'Completed listings',
    AU: 'Completed listings',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'discovery'
  },

  'Advanced Search': {
    US: 'Advanced search',
    UK: 'Advanced search',
    DE: 'Erweiterte Suche',
    FR: 'Recherche avancée',
    IT: 'Ricerca avanzata',
    CA: 'Advanced search',
    AU: 'Advanced search',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'discovery'
  },

  'Search Filters': {
    US: 'Search filters',
    UK: 'Search filters',
    DE: 'Suchfilter',
    FR: 'Filtres de recherche',
    IT: 'Filtri di ricerca',
    CA: 'Search filters',
    AU: 'Search filters',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'discovery'
  },

  'Condition Guide': {
    US: 'Condition guide',
    UK: 'Condition guide',
    DE: 'Zustandsleitfaden',
    FR: 'Guide des états',
    IT: 'Guida alle condizioni',
    CA: 'Condition guide',
    AU: 'Condition guide',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  // ============================================================
  // LISTING FORMATS & OPTIONS
  // ============================================================

  'Auction Style': {
    US: 'Auction-style listing',
    UK: 'Auction-style listing',
    DE: 'Auktionsformat',
    FR: 'Enchères',
    IT: 'Formato asta',
    CA: 'Auction-style listing',
    AU: 'Auction-style listing',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Fixed Price': {
    US: 'Fixed price',
    UK: 'Fixed price',
    DE: 'Festpreis',
    FR: 'Prix fixe',
    IT: 'Prezzo fisso',
    CA: 'Fixed price',
    AU: 'Fixed price',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Good Til Cancelled': {
    US: 'Good \'Til Cancelled',
    UK: 'Good \'Til Cancelled',
    DE: 'Unbefristet',
    FR: 'Valable jusqu\'à annulation',
    IT: 'Valida fino alla cancellazione',
    CA: 'Good \'Til Cancelled',
    AU: 'Good \'Til Cancelled',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Listing Duration': {
    US: 'Listing duration',
    UK: 'Listing duration',
    DE: 'Angebotsdauer',
    FR: 'Durée de l\'annonce',
    IT: 'Durata inserzione',
    CA: 'Listing duration',
    AU: 'Listing duration',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Second Chance Offer': {
    US: 'Second Chance Offer',
    UK: 'Second Chance Offer',
    DE: 'Zweite-Chance-Angebot',
    FR: 'Offre de seconde chance',
    IT: 'Offerta seconda opportunità',
    CA: 'Second Chance Offer',
    AU: 'Second Chance Offer',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Accept Offer': {
    US: 'Accept offer',
    UK: 'Accept offer',
    DE: 'Angebot annehmen',
    FR: 'Accepter l\'offre',
    IT: 'Accetta offerta',
    CA: 'Accept offer',
    AU: 'Accept offer',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Decline Offer': {
    US: 'Decline offer',
    UK: 'Decline offer',
    DE: 'Angebot ablehnen',
    FR: 'Refuser l\'offre',
    IT: 'Rifiuta offerta',
    CA: 'Decline offer',
    AU: 'Decline offer',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Counter Offer': {
    US: 'Counter offer',
    UK: 'Counter offer',
    DE: 'Gegenangebot',
    FR: 'Contre-offre',
    IT: 'Controfferta',
    CA: 'Counter offer',
    AU: 'Counter offer',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // ============================================================
  // BIDDING & AUCTION FEATURES
  // ============================================================

  'Bid Retraction': {
    US: 'Bid retraction',
    UK: 'Bid retraction',
    DE: 'Gebotsrücknahme',
    FR: 'Rétractation d\'enchère',
    IT: 'Ritiro dell\'offerta',
    CA: 'Bid retraction',
    AU: 'Bid retraction',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  'Proxy Bidding': {
    US: 'Automatic bidding',
    UK: 'Automatic bidding',
    DE: 'Automatisches Bieten',
    FR: 'Enchères automatiques',
    IT: 'Offerta automatica',
    CA: 'Automatic bidding',
    AU: 'Automatic bidding',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  'Maximum Bid': {
    US: 'Maximum bid',
    UK: 'Maximum bid',
    DE: 'Höchstgebot',
    FR: 'Enchère maximale',
    IT: 'Offerta massima',
    CA: 'Maximum bid',
    AU: 'Maximum bid',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  'Bid History': {
    US: 'Bid history',
    UK: 'Bid history',
    DE: 'Gebotsverlauf',
    FR: 'Historique des enchères',
    IT: 'Cronologia offerte',
    CA: 'Bid history',
    AU: 'Bid history',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  'Outbid Notification': {
    US: 'Outbid notification',
    UK: 'Outbid notification',
    DE: 'Überboten-Benachrichtigung',
    FR: 'Notification surenchère',
    IT: 'Notifica superamento offerta',
    CA: 'Outbid notification',
    AU: 'Outbid notification',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  // ============================================================
  // SHIPPING TOOLS
  // ============================================================

  'Shipping Cost Calculator': {
    US: 'Shipping cost calculator',
    UK: 'Postage cost calculator',
    DE: 'Versandkostenrechner',
    FR: 'Calculateur de frais de port',
    IT: 'Calcolatore costi spedizione',
    CA: 'Shipping cost calculator',
    AU: 'Postage cost calculator',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  'Package Weight': {
    US: 'Package weight',
    UK: 'Package weight',
    DE: 'Paketgewicht',
    FR: 'Poids du colis',
    IT: 'Peso del pacco',
    CA: 'Package weight',
    AU: 'Package weight',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  'Package Dimensions': {
    US: 'Package dimensions',
    UK: 'Package dimensions',
    DE: 'Paketabmessungen',
    FR: 'Dimensions du colis',
    IT: 'Dimensioni del pacco',
    CA: 'Package dimensions',
    AU: 'Package dimensions',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  // ============================================================
  // RETURN POLICIES
  // ============================================================

  'Free Returns': {
    US: 'Free returns',
    UK: 'Free returns',
    DE: 'Kostenlose Rücksendung',
    FR: 'Retours gratuits',
    IT: 'Resi gratuiti',
    CA: 'Free returns',
    AU: 'Free returns',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'trust'
  },

  'Returns Accepted': {
    US: 'Returns accepted',
    UK: 'Returns accepted',
    DE: 'Rücknahme akzeptiert',
    FR: 'Retours acceptés',
    IT: 'Resi accettati',
    CA: 'Returns accepted',
    AU: 'Returns accepted',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'trust'
  },

  'Return Window': {
    US: 'Return window',
    UK: 'Return window',
    DE: 'Rückgabefrist',
    FR: 'Délai de retour',
    IT: 'Periodo di reso',
    CA: 'Return window',
    AU: 'Return window',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'trust'
  },

  'Return Shipping Label': {
    US: 'Return shipping label',
    UK: 'Return postage label',
    DE: 'Rücksendeetikett',
    FR: 'Étiquette de retour',
    IT: 'Etichetta di reso',
    CA: 'Return shipping label',
    AU: 'Return postage label',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'trust'
  },

  // ============================================================
  // SELLER ANALYTICS & METRICS
  // ============================================================

  'Listing Analytics': {
    US: 'Listing analytics',
    UK: 'Listing analytics',
    DE: 'Angebotsanalyse',
    FR: 'Analyses d\'annonce',
    IT: 'Analisi inserzione',
    CA: 'Listing analytics',
    AU: 'Listing analytics',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Impressions': {
    US: 'Impressions',
    UK: 'Impressions',
    DE: 'Impressionen',
    FR: 'Impressions',
    IT: 'Impressioni',
    CA: 'Impressions',
    AU: 'Impressions',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Views': {
    US: 'Views',
    UK: 'Views',
    DE: 'Aufrufe',
    FR: 'Vues',
    IT: 'Visualizzazioni',
    CA: 'Views',
    AU: 'Views',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Click-Through Rate': {
    US: 'Click-through rate',
    UK: 'Click-through rate',
    DE: 'Klickrate',
    FR: 'Taux de clics',
    IT: 'Percentuale di clic',
    CA: 'Click-through rate',
    AU: 'Click-through rate',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Conversion Rate': {
    US: 'Conversion rate',
    UK: 'Conversion rate',
    DE: 'Konversionsrate',
    FR: 'Taux de conversion',
    IT: 'Tasso di conversione',
    CA: 'Conversion rate',
    AU: 'Conversion rate',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Sell-Through Rate': {
    US: 'Sell-through rate',
    UK: 'Sell-through rate',
    DE: 'Verkaufsrate',
    FR: 'Taux de vente',
    IT: 'Tasso di vendita',
    CA: 'Sell-through rate',
    AU: 'Sell-through rate',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Average Selling Price': {
    US: 'Average selling price',
    UK: 'Average selling price',
    DE: 'Durchschnittlicher Verkaufspreis',
    FR: 'Prix de vente moyen',
    IT: 'Prezzo di vendita medio',
    CA: 'Average selling price',
    AU: 'Average selling price',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Sales Reports': {
    US: 'Sales reports',
    UK: 'Sales reports',
    DE: 'Verkaufsberichte',
    FR: 'Rapports de vente',
    IT: 'Report vendite',
    CA: 'Sales reports',
    AU: 'Sales reports',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Monthly Statement': {
    US: 'Monthly statement',
    UK: 'Monthly statement',
    DE: 'Monatliche Abrechnung',
    FR: 'Relevé mensuel',
    IT: 'Estratto mensile',
    CA: 'Monthly statement',
    AU: 'Monthly statement',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },

  'Transaction Report': {
    US: 'Transaction report',
    UK: 'Transaction report',
    DE: 'Transaktionsbericht',
    FR: 'Rapport de transaction',
    IT: 'Report transazioni',
    CA: 'Transaction report',
    AU: 'Transaction report',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },

  // ============================================================
  // PAYMENT OPTIONS
  // ============================================================

  'Credit Card': {
    US: 'Credit card',
    UK: 'Credit card',
    DE: 'Kreditkarte',
    FR: 'Carte de crédit',
    IT: 'Carta di credito',
    CA: 'Credit card',
    AU: 'Credit card',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },

  'Debit Card': {
    US: 'Debit card',
    UK: 'Debit card',
    DE: 'Debitkarte',
    FR: 'Carte de débit',
    IT: 'Carta di debito',
    CA: 'Debit card',
    AU: 'Debit card',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },

  'Apple Pay': {
    US: 'Apple Pay',
    UK: 'Apple Pay',
    DE: 'Apple Pay',
    FR: 'Apple Pay',
    IT: 'Apple Pay',
    CA: 'Apple Pay',
    AU: 'Apple Pay',
    status: 'global',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },

  'Google Pay': {
    US: 'Google Pay',
    UK: 'Google Pay',
    DE: 'Google Pay',
    FR: 'Google Pay',
    IT: 'Google Pay',
    CA: 'Google Pay',
    AU: 'Google Pay',
    status: 'global',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },

  'Venmo': {
    US: 'Venmo',
    UK: 'Venmo',
    DE: 'Venmo',
    FR: 'Venmo',
    IT: 'Venmo',
    CA: 'Venmo',
    AU: 'Venmo',
    status: 'partial',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },

  'Klarna': {
    US: 'Klarna',
    UK: 'Klarna',
    DE: 'Klarna',
    FR: 'Klarna',
    IT: 'Klarna',
    CA: 'Klarna',
    AU: 'Klarna',
    status: 'global',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },

  'Pricing Recommendations': {
    US: 'Pricing recommendations',
    UK: 'Pricing recommendations',
    DE: 'Preisempfehlungen',
    FR: 'Recommandations de prix',
    IT: 'Raccomandazioni sui prezzi',
    CA: 'Pricing recommendations',
    AU: 'Pricing recommendations',
    status: 'partial',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // ============================================================
  // TOOLS & AUTOMATION
  // ============================================================

  'Auto-Relist': {
    US: 'Automatic relisting',
    UK: 'Automatic relisting',
    DE: 'Automatisches Wiedereinstellen',
    FR: 'Remise en vente automatique',
    IT: 'Reinserimento automatico',
    CA: 'Automatic relisting',
    AU: 'Automatic relisting',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Item Number': {
    US: 'Item number',
    UK: 'Item number',
    DE: 'Artikelnummer',
    FR: 'Numéro d\'objet',
    IT: 'Numero oggetto',
    CA: 'Item number',
    AU: 'Item number',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Transaction ID': {
    US: 'Transaction ID',
    UK: 'Transaction ID',
    DE: 'Transaktions-ID',
    FR: 'ID de transaction',
    IT: 'ID transazione',
    CA: 'Transaction ID',
    AU: 'Transaction ID',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },

  'Report Item': {
    US: 'Report this item',
    UK: 'Report this item',
    DE: 'Artikel melden',
    FR: 'Signaler cet objet',
    IT: 'Segnala oggetto',
    CA: 'Report this item',
    AU: 'Report this item',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'trust'
  },

  'Contact Seller': {
    US: 'Contact seller',
    UK: 'Contact seller',
    DE: 'Verkäufer kontaktieren',
    FR: 'Contacter le vendeur',
    IT: 'Contatta il venditore',
    CA: 'Contact seller',
    AU: 'Contact seller',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  'Ask Question': {
    US: 'Ask a question',
    UK: 'Ask a question',
    DE: 'Frage stellen',
    FR: 'Poser une question',
    IT: 'Fai una domanda',
    CA: 'Ask a question',
    AU: 'Ask a question',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  // ============================================================
  // ACCOUNT & SECURITY
  // ============================================================

  'Notification Settings': {
    US: 'Notification preferences',
    UK: 'Notification preferences',
    DE: 'Benachrichtigungseinstellungen',
    FR: 'Préférences de notification',
    IT: 'Preferenze notifiche',
    CA: 'Notification preferences',
    AU: 'Notification preferences',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Email Alerts': {
    US: 'Email alerts',
    UK: 'Email alerts',
    DE: 'E-Mail-Benachrichtigungen',
    FR: 'Alertes par e-mail',
    IT: 'Avvisi email',
    CA: 'Email alerts',
    AU: 'Email alerts',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Push Notifications': {
    US: 'Push notifications',
    UK: 'Push notifications',
    DE: 'Push-Benachrichtigungen',
    FR: 'Notifications push',
    IT: 'Notifiche push',
    CA: 'Push notifications',
    AU: 'Push notifications',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Two-Factor Authentication': {
    US: 'Two-step verification',
    UK: 'Two-step verification',
    DE: 'Zwei-Schritt-Verifizierung',
    FR: 'Vérification en deux étapes',
    IT: 'Verifica in due passaggi',
    CA: 'Two-step verification',
    AU: 'Two-step verification',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'trust'
  },

  'Account Settings': {
    US: 'Account settings',
    UK: 'Account settings',
    DE: 'Kontoeinstellungen',
    FR: 'Paramètres du compte',
    IT: 'Impostazioni account',
    CA: 'Account settings',
    AU: 'Account settings',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  'Close Account': {
    US: 'Close account',
    UK: 'Close account',
    DE: 'Konto schließen',
    FR: 'Fermer le compte',
    IT: 'Chiudi account',
    CA: 'Close account',
    AU: 'Close account',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // ============================================================
  // INTERNATIONAL & CROSS-BORDER
  // ============================================================

  'Import Charges': {
    US: 'Import charges',
    UK: 'Import charges',
    DE: 'Einfuhrgebühren',
    FR: 'Frais d\'importation',
    IT: 'Spese d\'importazione',
    CA: 'Import charges',
    AU: 'Import charges',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  'Customs Fees': {
    US: 'Customs fees',
    UK: 'Customs fees',
    DE: 'Zollgebühren',
    FR: 'Frais de douane',
    IT: 'Spese doganali',
    CA: 'Customs fees',
    AU: 'Customs fees',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  'Shipping Exclusions': {
    US: 'Exclude shipping locations',
    UK: 'Exclude postage locations',
    DE: 'Versandorte ausschließen',
    FR: 'Exclure des destinations',
    IT: 'Escludi destinazioni',
    CA: 'Exclude shipping locations',
    AU: 'Exclude postage locations',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  'Similar Sponsored Items': {
    US: 'Similar sponsored items',
    UK: 'Similar sponsored items',
    DE: 'Ähnliche gesponserte Artikel',
    FR: 'Articles sponsorisés similaires',
    IT: 'Articoli sponsorizzati simili',
    CA: 'Similar sponsored items',
    AU: 'Similar sponsored items',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'discovery'
  },

  'You May Also Like': {
    US: 'You may also like',
    UK: 'You may also like',
    DE: 'Das könnte Ihnen auch gefallen',
    FR: 'Vous aimerez peut-être aussi',
    IT: 'Potrebbe piacerti anche',
    CA: 'You may also like',
    AU: 'You may also like',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'discovery'
  },

  'Share Listing': {
    US: 'Share',
    UK: 'Share',
    DE: 'Teilen',
    FR: 'Partager',
    IT: 'Condividi',
    CA: 'Share',
    AU: 'Share',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  'Add to Cart': {
    US: 'Add to cart',
    UK: 'Add to basket',
    DE: 'In den Warenkorb',
    FR: 'Ajouter au panier',
    IT: 'Aggiungi al carrello',
    CA: 'Add to cart',
    AU: 'Add to basket',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  'Estimated Delivery': {
    US: 'Estimated delivery',
    UK: 'Estimated delivery',
    DE: 'Voraussichtliche Lieferung',
    FR: 'Livraison estimée',
    IT: 'Consegna stimata',
    CA: 'Estimated delivery',
    AU: 'Estimated delivery',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  'Delivery Date': {
    US: 'Delivery date',
    UK: 'Delivery date',
    DE: 'Lieferdatum',
    FR: 'Date de livraison',
    IT: 'Data di consegna',
    CA: 'Delivery date',
    AU: 'Delivery date',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  'Seller Information': {
    US: 'Seller information',
    UK: 'Seller information',
    DE: 'Verkäuferinformationen',
    FR: 'Informations sur le vendeur',
    IT: 'Informazioni venditore',
    CA: 'Seller information',
    AU: 'Seller information',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  'About Seller': {
    US: 'About this seller',
    UK: 'About this seller',
    DE: 'Über diesen Verkäufer',
    FR: 'À propos de ce vendeur',
    IT: 'Informazioni sul venditore',
    CA: 'About this seller',
    AU: 'About this seller',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  'Required Item Specifics': {
    US: 'Required item specifics',
    UK: 'Required item specifics',
    DE: 'Erforderliche Artikelmerkmale',
    FR: 'Caractéristiques obligatoires',
    IT: 'Caratteristiche obbligatorie',
    CA: 'Required item specifics',
    AU: 'Required item specifics',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // DISCOUNTS & PROMOTIONS (Batch 11)
  'Volume Pricing': {
    US: 'Volume pricing',
    UK: 'Volume pricing',
    DE: 'Mengenrabatt',
    FR: 'Tarification en volume',
    IT: 'Prezzi per quantità',
    CA: 'Volume pricing',
    AU: 'Volume pricing',
    status: 'confirmed',
    type: 'advertising',
    tier: 'feature',
    parent: 'advertising'
  },
  'Shipping Discounts': {
    US: 'Shipping discounts',
    UK: 'Postage discounts',
    DE: 'Versandrabatte',
    FR: 'Réductions sur les frais d\'expédition',
    IT: 'Sconti sulla spedizione',
    CA: 'Shipping discounts',
    AU: 'Postage discounts',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Combined Shipping': {
    US: 'Combined shipping',
    UK: 'Combined postage',
    DE: 'Kombinierter Versand',
    FR: 'Envoi groupé',
    IT: 'Spedizione combinata',
    CA: 'Combined shipping',
    AU: 'Combined postage',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  // LISTING MEDIA & CONTENT
  'Picture Policy': {
    US: 'Picture policy',
    UK: 'Picture policy',
    DE: 'Fotorichtlinien',
    FR: 'Règles relatives aux photos',
    IT: 'Norme sulle foto',
    CA: 'Picture policy',
    AU: 'Picture policy',
    status: 'confirmed',
    type: 'category',
    tier: 'legal',
    parent: 'sellertools'
  },
  'Photo Tips': {
    US: 'Photo tips',
    UK: 'Photo tips',
    DE: 'Fototipps',
    FR: 'Conseils photo',
    IT: 'Suggerimenti per le foto',
    CA: 'Photo tips',
    AU: 'Photo tips',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Shop By Category': {
    US: 'Shop by Category',
    UK: 'Shop by Category',
    DE: 'Nach Kategorie einkaufen',
    FR: 'Acheter par catégorie',
    IT: 'Acquista per categoria',
    CA: 'Shop by Category',
    AU: 'Shop by Category',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'All Categories': {
    US: 'All Categories',
    UK: 'All Categories',
    DE: 'Alle Kategorien',
    FR: 'Toutes les catégories',
    IT: 'Tutte le categorie',
    CA: 'All Categories',
    AU: 'All Categories',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Image Requirements': {
    US: 'Image requirements',
    UK: 'Image requirements',
    DE: 'Bildanforderungen',
    FR: 'Exigences relatives aux images',
    IT: 'Requisiti immagine',
    CA: 'Image requirements',
    AU: 'Image requirements',
    status: 'confirmed',
    type: 'category',
    tier: 'legal',
    parent: 'sellertools'
  },
  'Listing Title': {
    US: 'Listing title',
    UK: 'Listing title',
    DE: 'Angebotstitel',
    FR: 'Titre de l\'annonce',
    IT: 'Titolo inserzione',
    CA: 'Listing title',
    AU: 'Listing title',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // SELLER PERFORMANCE LEVELS (Batch 12)
  'Below Standard': {
    US: 'Below Standard',
    UK: 'Below Standard',
    DE: 'Unter Standard',
    FR: 'Sous le standard',
    IT: 'Sotto lo standard',
    CA: 'Below Standard',
    AU: 'Below Standard',
    status: 'confirmed',
    type: 'trust',
    tier: 'program',
    parent: 'trust'
  },
  'Above Standard': {
    US: 'Above Standard',
    UK: 'Above Standard',
    DE: 'Über Standard',
    FR: 'Au-dessus du standard',
    IT: 'Sopra lo standard',
    CA: 'Above Standard',
    AU: 'Above Standard',
    status: 'confirmed',
    type: 'trust',
    tier: 'program',
    parent: 'trust'
  },

  // LISTING UPGRADES
  'Bold Title': {
    US: 'Bold title',
    UK: 'Bold title',
    DE: 'Fett gedruckter Titel',
    FR: 'Titre en gras',
    IT: 'Titolo in grassetto',
    CA: 'Bold title',
    AU: 'Bold title',
    status: 'confirmed',
    type: 'advertising',
    tier: 'feature',
    parent: 'advertising'
  },
  'Gallery Plus': {
    US: 'Gallery Plus',
    UK: 'Gallery Plus',
    DE: 'Galerie Plus',
    FR: 'Galerie Plus',
    IT: 'Galleria Plus',
    CA: 'Gallery Plus',
    AU: 'Gallery Plus',
    status: 'confirmed',
    type: 'advertising',
    tier: 'feature',
    parent: 'advertising'
  },
  'Featured Plus': {
    US: 'Featured Plus',
    UK: 'Featured Plus',
    DE: 'Featured Plus',
    FR: 'Featured Plus',
    IT: 'Featured Plus',
    CA: 'Featured Plus',
    AU: 'Featured Plus',
    status: 'confirmed',
    type: 'advertising',
    tier: 'feature',
    parent: 'advertising'
  },
  'Listing Upgrades': {
    US: 'Listing upgrades',
    UK: 'Listing upgrades',
    DE: 'Angebots-Upgrades',
    FR: 'Améliorations d\'annonce',
    IT: 'Miglioramenti inserzione',
    CA: 'Listing upgrades',
    AU: 'Listing upgrades',
    status: 'confirmed',
    type: 'advertising',
    tier: 'feature',
    parent: 'advertising'
  },

  // SELLING LIMITS
  'Selling Limits': {
    US: 'Selling limits',
    UK: 'Selling limits',
    DE: 'Verkaufslimits',
    FR: 'Limites de vente',
    IT: 'Limiti di vendita',
    CA: 'Selling limits',
    AU: 'Selling limits',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Monthly Limits': {
    US: 'Monthly limits',
    UK: 'Monthly limits',
    DE: 'Monatliche Limits',
    FR: 'Limites mensuelles',
    IT: 'Limiti mensili',
    CA: 'Monthly limits',
    AU: 'Monthly limits',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // ORDER MANAGEMENT
  'Awaiting Payment': {
    US: 'Awaiting payment',
    UK: 'Awaiting payment',
    DE: 'Zahlung ausstehend',
    FR: 'En attente de paiement',
    IT: 'In attesa di pagamento',
    CA: 'Awaiting payment',
    AU: 'Awaiting payment',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Awaiting Shipment': {
    US: 'Awaiting shipment',
    UK: 'Awaiting shipment',
    DE: 'Versand ausstehend',
    FR: 'En attente d\'expédition',
    IT: 'In attesa di spedizione',
    CA: 'Awaiting shipment',
    AU: 'Awaiting shipment',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // BUYER ALERTS & NOTIFICATIONS
  'Price Alert': {
    US: 'Price alert',
    UK: 'Price alert',
    DE: 'Preisalarm',
    FR: 'Alerte de prix',
    IT: 'Avviso di prezzo',
    CA: 'Price alert',
    AU: 'Price alert',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Saved Sellers': {
    US: 'Saved sellers',
    UK: 'Saved sellers',
    DE: 'Gespeicherte Verkäufer',
    FR: 'Vendeurs enregistrés',
    IT: 'Venditori salvati',
    CA: 'Saved sellers',
    AU: 'Saved sellers',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Push Notifications': {
    US: 'Push notifications',
    UK: 'Push notifications',
    DE: 'Push-Benachrichtigungen',
    FR: 'Notifications push',
    IT: 'Notifiche push',
    CA: 'Push notifications',
    AU: 'Push notifications',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  // LISTING & OFFER FEATURES (Batch 13)
  'Private Listing': {
    US: 'Private listing',
    UK: 'Private listing',
    DE: 'Private Auktion',
    FR: 'Annonce privée',
    IT: 'Inserzione privata',
    CA: 'Private listing',
    AU: 'Private listing',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Auto Accept': {
    US: 'Auto accept',
    UK: 'Auto accept',
    DE: 'Automatische Annahme',
    FR: 'Acceptation automatique',
    IT: 'Accettazione automatica',
    CA: 'Auto accept',
    AU: 'Auto accept',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Auto Decline': {
    US: 'Auto decline',
    UK: 'Auto decline',
    DE: 'Automatische Ablehnung',
    FR: 'Refus automatique',
    IT: 'Rifiuto automatico',
    CA: 'Auto decline',
    AU: 'Auto decline',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Counteroffer': {
    US: 'Counteroffer',
    UK: 'Counteroffer',
    DE: 'Gegenangebot',
    FR: 'Contre-offre',
    IT: 'Controproposta',
    CA: 'Counteroffer',
    AU: 'Counteroffer',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Make an Offer': {
    US: 'Make an offer',
    UK: 'Make an offer',
    DE: 'Preisvorschlag machen',
    FR: 'Faire une offre',
    IT: 'Fai un\'offerta',
    CA: 'Make an offer',
    AU: 'Make an offer',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  // SELLER TOOLS & FEATURES
  'Time Away': {
    US: 'Time Away',
    UK: 'Time Away',
    DE: 'Abwesenheit',
    FR: 'Absence',
    IT: 'Assenza',
    CA: 'Time Away',
    AU: 'Time Away',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Out of Office': {
    US: 'Out of office',
    UK: 'Out of office',
    DE: 'Abwesend',
    FR: 'Absence du bureau',
    IT: 'Fuori ufficio',
    CA: 'Out of office',
    AU: 'Out of office',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // ANALYTICS & METRICS
  'Impressions': {
    US: 'Impressions',
    UK: 'Impressions',
    DE: 'Impressionen',
    FR: 'Impressions',
    IT: 'Impression',
    CA: 'Impressions',
    AU: 'Impressions',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Page Views': {
    US: 'Page views',
    UK: 'Page views',
    DE: 'Seitenaufrufe',
    FR: 'Pages vues',
    IT: 'Visualizzazioni pagina',
    CA: 'Page views',
    AU: 'Page views',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Conversion Rate': {
    US: 'Conversion rate',
    UK: 'Conversion rate',
    DE: 'Konversionsrate',
    FR: 'Taux de conversion',
    IT: 'Tasso di conversione',
    CA: 'Conversion rate',
    AU: 'Conversion rate',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Click-Through Rate': {
    US: 'Click-through rate (CTR)',
    UK: 'Click-through rate (CTR)',
    DE: 'Klickrate (CTR)',
    FR: 'Taux de clics (CTR)',
    IT: 'Percentuale di clic (CTR)',
    CA: 'Click-through rate (CTR)',
    AU: 'Click-through rate (CTR)',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // SUPPORT & HELP
  'Seller Help': {
    US: 'Seller Help',
    UK: 'Seller Help',
    DE: 'Verkäuferhilfe',
    FR: 'Aide vendeur',
    IT: 'Aiuto venditore',
    CA: 'Seller Help',
    AU: 'Seller Help',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Help Center': {
    US: 'Help Center',
    UK: 'Help Centre',
    DE: 'Hilfecenter',
    FR: 'Centre d\'aide',
    IT: 'Centro assistenza',
    CA: 'Help Centre',
    AU: 'Help Centre',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'community'
  },
  'Ask eBay to Step In': {
    US: 'Ask eBay to step in',
    UK: 'Ask eBay to step in',
    DE: 'eBay um Hilfe bitten',
    FR: 'Demander l\'intervention d\'eBay',
    IT: 'Chiedi l\'intervento di eBay',
    CA: 'Ask eBay to step in',
    AU: 'Ask eBay to step in',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'trust'
  },

  // LISTING MANAGEMENT & SCHEDULING (Batch 14)
  'Schedule Listing': {
    US: 'Schedule listing',
    UK: 'Schedule listing',
    DE: 'Angebot planen',
    FR: 'Programmer une annonce',
    IT: 'Programma inserzione',
    CA: 'Schedule listing',
    AU: 'Schedule listing',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Relist': {
    US: 'Relist',
    UK: 'Relist',
    DE: 'Erneut einstellen',
    FR: 'Remettre en vente',
    IT: 'Rimetti in vendita',
    CA: 'Relist',
    AU: 'Relist',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Automatic Relist': {
    US: 'Automatic relist',
    UK: 'Automatic relist',
    DE: 'Automatische Neueinstellung',
    FR: 'Remise en vente automatique',
    IT: 'Rimessa in vendita automatica',
    CA: 'Automatic relist',
    AU: 'Automatic relist',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // ITEM CONDITION VARIANTS
  'New With Tags': {
    US: 'New with tags',
    UK: 'New with tags',
    DE: 'Neu mit Etikett',
    FR: 'Neuf avec étiquettes',
    IT: 'Nuovo con etichetta',
    CA: 'New with tags',
    AU: 'New with tags',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'New Without Tags': {
    US: 'New without tags',
    UK: 'New without tags',
    DE: 'Neu ohne Etikett',
    FR: 'Neuf sans étiquettes',
    IT: 'Nuovo senza etichetta',
    CA: 'New without tags',
    AU: 'New without tags',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'New Other': {
    US: 'New other',
    UK: 'New other',
    DE: 'Neu (Sonstige)',
    FR: 'Neuf autre',
    IT: 'Nuovo altro',
    CA: 'New other',
    AU: 'New other',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // LISTING ENHANCEMENTS
  'Subtitle': {
    US: 'Subtitle',
    UK: 'Subtitle',
    DE: 'Untertitel',
    FR: 'Sous-titre',
    IT: 'Sottotitolo',
    CA: 'Subtitle',
    AU: 'Subtitle',
    status: 'confirmed',
    type: 'advertising',
    tier: 'feature',
    parent: 'advertising'
  },

  // INVENTORY TRACKING
  'Quantity Available': {
    US: 'Quantity available',
    UK: 'Quantity available',
    DE: 'Verfügbare Menge',
    FR: 'Quantité disponible',
    IT: 'Quantità disponibile',
    CA: 'Quantity available',
    AU: 'Quantity available',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Quantity Sold': {
    US: 'Quantity sold',
    UK: 'Quantity sold',
    DE: 'Verkaufte Menge',
    FR: 'Quantité vendue',
    IT: 'Quantità venduta',
    CA: 'Quantity sold',
    AU: 'Quantity sold',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Total Sales': {
    US: 'Total sales',
    UK: 'Total sales',
    DE: 'Gesamtumsatz',
    FR: 'Ventes totales',
    IT: 'Vendite totali',
    CA: 'Total sales',
    AU: 'Total sales',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Inventory Management': {
    US: 'Inventory management',
    UK: 'Inventory management',
    DE: 'Bestandsverwaltung',
    FR: 'Gestion des stocks',
    IT: 'Gestione inventario',
    CA: 'Inventory management',
    AU: 'Inventory management',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // PROMOTIONS & SALES (Batch 15)
  'Sale Event': {
    US: 'Sale event',
    UK: 'Sale event',
    DE: 'Sale-Event',
    FR: 'Événement de vente',
    IT: 'Evento di vendita',
    CA: 'Sale event',
    AU: 'Sale event',
    status: 'confirmed',
    type: 'advertising',
    tier: 'feature',
    parent: 'advertising'
  },
  'Markdown Manager': {
    US: 'Markdown Manager',
    UK: 'Markdown Manager',
    DE: 'Markdown Manager',
    FR: 'Gestionnaire de réductions',
    IT: 'Gestore ribassi',
    CA: 'Markdown Manager',
    AU: 'Markdown Manager',
    status: 'confirmed',
    type: 'advertising',
    tier: 'feature',
    parent: 'advertising'
  },
  'Clearance Event': {
    US: 'Clearance event',
    UK: 'Clearance event',
    DE: 'Ausverkauf',
    FR: 'Événement de déstockage',
    IT: 'Evento di liquidazione',
    CA: 'Clearance event',
    AU: 'Clearance event',
    status: 'confirmed',
    type: 'advertising',
    tier: 'feature',
    parent: 'advertising'
  },

  // SHIPPING OPTIONS
  'Flat Rate Shipping': {
    US: 'Flat rate shipping',
    UK: 'Flat rate postage',
    DE: 'Pauschaler Versand',
    FR: 'Tarif forfaitaire d\'expédition',
    IT: 'Spedizione a tariffa fissa',
    CA: 'Flat rate shipping',
    AU: 'Flat rate postage',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Free Shipping': {
    US: 'Free shipping',
    UK: 'Free postage',
    DE: 'Kostenloser Versand',
    FR: 'Livraison gratuite',
    IT: 'Spedizione gratuita',
    CA: 'Free shipping',
    AU: 'Free postage',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Shipping Calculator': {
    US: 'Shipping calculator',
    UK: 'Postage calculator',
    DE: 'Versandkostenrechner',
    FR: 'Calculateur d\'expédition',
    IT: 'Calcolatore spedizione',
    CA: 'Shipping calculator',
    AU: 'Postage calculator',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  // BUYER CONTROLS
  'Buyer Requirements': {
    US: 'Buyer requirements',
    UK: 'Buyer requirements',
    DE: 'Käuferanforderungen',
    FR: 'Exigences acheteur',
    IT: 'Requisiti acquirente',
    CA: 'Buyer requirements',
    AU: 'Buyer requirements',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Block Buyer': {
    US: 'Block buyer',
    UK: 'Block buyer',
    DE: 'Käufer sperren',
    FR: 'Bloquer acheteur',
    IT: 'Blocca acquirente',
    CA: 'Block buyer',
    AU: 'Block buyer',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Buyer Exemptions': {
    US: 'Buyer exemptions',
    UK: 'Buyer exemptions',
    DE: 'Käuferausnahmen',
    FR: 'Exemptions acheteur',
    IT: 'Esenzioni acquirente',
    CA: 'Buyer exemptions',
    AU: 'Buyer exemptions',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // SELLER FEES
  'Final Value Fee': {
    US: 'Final value fee',
    UK: 'Final value fee',
    DE: 'Verkaufsprovision',
    FR: 'Commission sur la vente finale',
    IT: 'Commissione sul valore finale',
    CA: 'Final value fee',
    AU: 'Final value fee',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Insertion Fee': {
    US: 'Insertion fee',
    UK: 'Insertion fee',
    DE: 'Angebotsgebühr',
    FR: 'Frais d\'insertion',
    IT: 'Commissione d\'inserzione',
    CA: 'Insertion fee',
    AU: 'Insertion fee',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Per Order Fee': {
    US: 'Per order fee',
    UK: 'Per order fee',
    DE: 'Gebühr pro Bestellung',
    FR: 'Frais par commande',
    IT: 'Commissione per ordine',
    CA: 'Per order fee',
    AU: 'Per order fee',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },

  // BUSINESS POLICIES
  'Business Policies': {
    US: 'Business policies',
    UK: 'Business policies',
    DE: 'Geschäftsrichtlinien',
    FR: 'Règles commerciales',
    IT: 'Regole di vendita',
    CA: 'Business policies',
    AU: 'Business policies',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Payment Policy': {
    US: 'Payment policy',
    UK: 'Payment policy',
    DE: 'Zahlungsrichtlinie',
    FR: 'Règle de paiement',
    IT: 'Regole di pagamento',
    CA: 'Payment policy',
    AU: 'Payment policy',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Return Policy': {
    US: 'Return policy',
    UK: 'Return policy',
    DE: 'Rückgaberichtlinie',
    FR: 'Règle de retour',
    IT: 'Regole di reso',
    CA: 'Return policy',
    AU: 'Return policy',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'returns'
  },
  'Shipping Policy': {
    US: 'Shipping policy',
    UK: 'Postage policy',
    DE: 'Versandrichtlinie',
    FR: 'Règle d\'expédition',
    IT: 'Regole di spedizione',
    CA: 'Shipping policy',
    AU: 'Postage policy',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  // POLICY & COMPLIANCE (Batch 16)
  'Policy Violation': {
    US: 'Policy violation',
    UK: 'Policy violation',
    DE: 'Richtlinienverstoß',
    FR: 'Violation de règles',
    IT: 'Violazione delle regole',
    CA: 'Policy violation',
    AU: 'Policy violation',
    status: 'confirmed',
    type: 'category',
    tier: 'legal',
    parent: 'trust'
  },
  'Listing Removed': {
    US: 'Listing removed',
    UK: 'Listing removed',
    DE: 'Angebot entfernt',
    FR: 'Annonce supprimée',
    IT: 'Inserzione rimossa',
    CA: 'Listing removed',
    AU: 'Listing removed',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Restricted Items': {
    US: 'Restricted items',
    UK: 'Restricted items',
    DE: 'Eingeschränkte Artikel',
    FR: 'Articles restreints',
    IT: 'Articoli limitati',
    CA: 'Restricted items',
    AU: 'Restricted items',
    status: 'confirmed',
    type: 'category',
    tier: 'legal',
    parent: 'trust'
  },

  // SELLER RATINGS & PERFORMANCE
  'Detailed Seller Ratings': {
    US: 'Detailed Seller Ratings (DSR)',
    UK: 'Detailed Seller Ratings (DSR)',
    DE: 'Detaillierte Verkäuferbewertungen',
    FR: 'Évaluations détaillées du vendeur',
    IT: 'Valutazioni dettagliate venditore',
    CA: 'Detailed Seller Ratings (DSR)',
    AU: 'Detailed Seller Ratings (DSR)',
    status: 'confirmed',
    type: 'trust',
    tier: 'program',
    parent: 'trust'
  },
  'Star Rating': {
    US: 'Star rating',
    UK: 'Star rating',
    DE: 'Sternebewertung',
    FR: 'Évaluation par étoiles',
    IT: 'Valutazione a stelle',
    CA: 'Star rating',
    AU: 'Star rating',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'trust'
  },
  'Item as Described': {
    US: 'Item as described',
    UK: 'Item as described',
    DE: 'Artikel wie beschrieben',
    FR: 'Article conforme à la description',
    IT: 'Articolo come descritto',
    CA: 'Item as described',
    AU: 'Item as described',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'trust'
  },

  // LISTING STATUS
  'Out of Stock': {
    US: 'Out of stock',
    UK: 'Out of stock',
    DE: 'Nicht auf Lager',
    FR: 'En rupture de stock',
    IT: 'Esaurito',
    CA: 'Out of stock',
    AU: 'Out of stock',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Scheduled': {
    US: 'Scheduled',
    UK: 'Scheduled',
    DE: 'Geplant',
    FR: 'Programmé',
    IT: 'Programmato',
    CA: 'Scheduled',
    AU: 'Scheduled',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // ACCOUNT MANAGEMENT
  'Account Suspension': {
    US: 'Account suspension',
    UK: 'Account suspension',
    DE: 'Kontosperrung',
    FR: 'Suspension de compte',
    IT: 'Sospensione account',
    CA: 'Account suspension',
    AU: 'Account suspension',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'trust'
  },
  'Account Warning': {
    US: 'Account warning',
    UK: 'Account warning',
    DE: 'Kontowarnung',
    FR: 'Avertissement de compte',
    IT: 'Avviso account',
    CA: 'Account warning',
    AU: 'Account warning',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'trust'
  },
  'Account Restriction': {
    US: 'Account restriction',
    UK: 'Account restriction',
    DE: 'Kontoeinschränkung',
    FR: 'Restriction de compte',
    IT: 'Restrizione account',
    CA: 'Account restriction',
    AU: 'Account restriction',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'trust'
  },
  'Temporary Suspension': {
    US: 'Temporary suspension',
    UK: 'Temporary suspension',
    DE: 'Vorübergehende Sperrung',
    FR: 'Suspension temporaire',
    IT: 'Sospensione temporanea',
    CA: 'Temporary suspension',
    AU: 'Temporary suspension',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'trust'
  },

  // SHIPPING TIME
  'Handling Time': {
    US: 'Handling time',
    UK: 'Handling time',
    DE: 'Bearbeitungszeit',
    FR: 'Délai de traitement',
    IT: 'Tempo di gestione',
    CA: 'Handling time',
    AU: 'Handling time',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Dispatch Time': {
    US: 'Dispatch time',
    UK: 'Dispatch time',
    DE: 'Versandzeit',
    FR: 'Délai d\'expédition',
    IT: 'Tempo di spedizione',
    CA: 'Dispatch time',
    AU: 'Dispatch time',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Same-Day Shipping': {
    US: 'Same-day shipping',
    UK: 'Same-day postage',
    DE: 'Versand am selben Tag',
    FR: 'Expédition le jour même',
    IT: 'Spedizione in giornata',
    CA: 'Same-day shipping',
    AU: 'Same-day postage',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Estimated Delivery Date': {
    US: 'Estimated delivery date',
    UK: 'Estimated delivery date',
    DE: 'Voraussichtliches Lieferdatum',
    FR: 'Date de livraison estimée',
    IT: 'Data di consegna stimata',
    CA: 'Estimated delivery date',
    AU: 'Estimated delivery date',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  // LISTING FORMATS (Batch 17)
  'Fixed Price': {
    US: 'Fixed price',
    UK: 'Fixed price',
    DE: 'Festpreis',
    FR: 'Prix fixe',
    IT: 'Prezzo fisso',
    CA: 'Fixed price',
    AU: 'Fixed price',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Classified Ad': {
    US: 'Classified ad',
    UK: 'Classified ad',
    DE: 'Kleinanzeige',
    FR: 'Annonce classée',
    IT: 'Annuncio classificato',
    CA: 'Classified ad',
    AU: 'Classified ad',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Store Inventory Format': {
    US: 'Store inventory format',
    UK: 'Shop inventory format',
    DE: 'Shop-Bestandsformat',
    FR: 'Format d\'inventaire de boutique',
    IT: 'Formato inventario negozio',
    CA: 'Store inventory format',
    AU: 'Store inventory format',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'stores'
  },

  // PAYMENT METHODS
  'Credit Card': {
    US: 'Credit card',
    UK: 'Credit card',
    DE: 'Kreditkarte',
    FR: 'Carte de crédit',
    IT: 'Carta di credito',
    CA: 'Credit card',
    AU: 'Credit card',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Debit Card': {
    US: 'Debit card',
    UK: 'Debit card',
    DE: 'Debitkarte',
    FR: 'Carte de débit',
    IT: 'Carta di debito',
    CA: 'Debit card',
    AU: 'Debit card',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Apple Pay': {
    US: 'Apple Pay',
    UK: 'Apple Pay',
    DE: 'Apple Pay',
    FR: 'Apple Pay',
    IT: 'Apple Pay',
    CA: 'Apple Pay',
    AU: 'Apple Pay',
    status: 'global',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Google Pay': {
    US: 'Google Pay',
    UK: 'Google Pay',
    DE: 'Google Pay',
    FR: 'Google Pay',
    IT: 'Google Pay',
    CA: 'Google Pay',
    AU: 'Google Pay',
    status: 'global',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },

  // BUYER ENGAGEMENT
  'Follow Seller': {
    US: 'Follow seller',
    UK: 'Follow seller',
    DE: 'Verkäufer folgen',
    FR: 'Suivre vendeur',
    IT: 'Segui venditore',
    CA: 'Follow seller',
    AU: 'Follow seller',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Save Seller': {
    US: 'Save seller',
    UK: 'Save seller',
    DE: 'Verkäufer speichern',
    FR: 'Enregistrer vendeur',
    IT: 'Salva venditore',
    CA: 'Save seller',
    AU: 'Save seller',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Follow Shop': {
    US: 'Follow shop',
    UK: 'Follow shop',
    DE: 'Shop folgen',
    FR: 'Suivre boutique',
    IT: 'Segui negozio',
    CA: 'Follow shop',
    AU: 'Follow shop',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  // MESSAGING
  'Contact Seller': {
    US: 'Contact seller',
    UK: 'Contact seller',
    DE: 'Verkäufer kontaktieren',
    FR: 'Contacter vendeur',
    IT: 'Contatta venditore',
    CA: 'Contact seller',
    AU: 'Contact seller',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'community'
  },
  'Contact Buyer': {
    US: 'Contact buyer',
    UK: 'Contact buyer',
    DE: 'Käufer kontaktieren',
    FR: 'Contacter acheteur',
    IT: 'Contatta acquirente',
    CA: 'Contact buyer',
    AU: 'Contact buyer',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Ask a Question': {
    US: 'Ask a question',
    UK: 'Ask a question',
    DE: 'Frage stellen',
    FR: 'Poser une question',
    IT: 'Fai una domanda',
    CA: 'Ask a question',
    AU: 'Ask a question',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'community'
  },
  'Send Message': {
    US: 'Send message',
    UK: 'Send message',
    DE: 'Nachricht senden',
    FR: 'Envoyer un message',
    IT: 'Invia messaggio',
    CA: 'Send message',
    AU: 'Send message',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'community'
  },

  // SEARCH & VISIBILITY
  'Best Match': {
    US: 'Best Match',
    UK: 'Best Match',
    DE: 'Beste Ergebnisse',
    FR: 'Meilleur résultat',
    IT: 'Migliore corrispondenza',
    CA: 'Best Match',
    AU: 'Best Match',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'discovery'
  },
  'Search Ranking': {
    US: 'Search ranking',
    UK: 'Search ranking',
    DE: 'Suchranking',
    FR: 'Classement de recherche',
    IT: 'Ranking ricerca',
    CA: 'Search ranking',
    AU: 'Search ranking',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'discovery'
  },
  'Listing Visibility': {
    US: 'Listing visibility',
    UK: 'Listing visibility',
    DE: 'Angebotssichtbarkeit',
    FR: 'Visibilité annonce',
    IT: 'Visibilità inserzione',
    CA: 'Listing visibility',
    AU: 'Listing visibility',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'advertising'
  },
  'Search Placement': {
    US: 'Search placement',
    UK: 'Search placement',
    DE: 'Suchplatzierung',
    FR: 'Placement dans recherche',
    IT: 'Posizionamento ricerca',
    CA: 'Search placement',
    AU: 'Search placement',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'advertising'
  },

  // BULK TOOLS & DATA (Batch 18 - Final)
  'File Exchange': {
    US: 'File Exchange',
    UK: 'File Exchange',
    DE: 'File Exchange',
    FR: 'File Exchange',
    IT: 'File Exchange',
    CA: 'File Exchange',
    AU: 'File Exchange',
    status: 'confirmed',
    type: 'developer',
    tier: 'platform',
    parent: 'developer'
  },
  'Bulk Upload': {
    US: 'Bulk upload',
    UK: 'Bulk upload',
    DE: 'Massen-Upload',
    FR: 'Téléchargement en masse',
    IT: 'Caricamento in blocco',
    CA: 'Bulk upload',
    AU: 'Bulk upload',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'CSV Upload': {
    US: 'CSV upload',
    UK: 'CSV upload',
    DE: 'CSV-Upload',
    FR: 'Téléchargement CSV',
    IT: 'Caricamento CSV',
    CA: 'CSV upload',
    AU: 'CSV upload',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Listing Activity': {
    US: 'Listing activity',
    UK: 'Listing activity',
    DE: 'Angebotsaktivität',
    FR: 'Activité annonces',
    IT: 'Attività inserzioni',
    CA: 'Listing activity',
    AU: 'Listing activity',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // FEEDBACK SYSTEM
  'Feedback Score': {
    US: 'Feedback score',
    UK: 'Feedback score',
    DE: 'Bewertungspunkte',
    FR: 'Score d\'évaluation',
    IT: 'Punteggio feedback',
    CA: 'Feedback score',
    AU: 'Feedback score',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'trust'
  },
  'Positive Feedback': {
    US: 'Positive feedback',
    UK: 'Positive feedback',
    DE: 'Positives Feedback',
    FR: 'Évaluation positive',
    IT: 'Feedback positivo',
    CA: 'Positive feedback',
    AU: 'Positive feedback',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'trust'
  },
  'Negative Feedback': {
    US: 'Negative feedback',
    UK: 'Negative feedback',
    DE: 'Negatives Feedback',
    FR: 'Évaluation négative',
    IT: 'Feedback negativo',
    CA: 'Negative feedback',
    AU: 'Negative feedback',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'trust'
  },
  'Neutral Feedback': {
    US: 'Neutral feedback',
    UK: 'Neutral feedback',
    DE: 'Neutrales Feedback',
    FR: 'Évaluation neutre',
    IT: 'Feedback neutro',
    CA: 'Neutral feedback',
    AU: 'Neutral feedback',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'trust'
  },
  'Feedback Profile': {
    US: 'Feedback profile',
    UK: 'Feedback profile',
    DE: 'Bewertungsprofil',
    FR: 'Profil d\'évaluations',
    IT: 'Profilo feedback',
    CA: 'Feedback profile',
    AU: 'Feedback profile',
    status: 'confirmed',
    type: 'trust',
    tier: 'feature',
    parent: 'trust'
  },

  // TRANSACTION HISTORY
  'Purchase History': {
    US: 'Purchase history',
    UK: 'Purchase history',
    DE: 'Kaufhistorie',
    FR: 'Historique d\'achats',
    IT: 'Cronologia acquisti',
    CA: 'Purchase history',
    AU: 'Purchase history',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Order History': {
    US: 'Order history',
    UK: 'Order history',
    DE: 'Bestellverlauf',
    FR: 'Historique des commandes',
    IT: 'Cronologia ordini',
    CA: 'Order history',
    AU: 'Order history',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Sales History': {
    US: 'Sales history',
    UK: 'Sales history',
    DE: 'Verkaufsverlauf',
    FR: 'Historique des ventes',
    IT: 'Cronologia vendite',
    CA: 'Sales history',
    AU: 'Sales history',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Transaction Report': {
    US: 'Transaction report',
    UK: 'Transaction report',
    DE: 'Transaktionsbericht',
    FR: 'Rapport de transactions',
    IT: 'Rapporto transazioni',
    CA: 'Transaction report',
    AU: 'Transaction report',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // ITEM LOCATION & SHIPPING DETAILS
  'Item Location': {
    US: 'Item location',
    UK: 'Item location',
    DE: 'Artikelstandort',
    FR: 'Localisation de l\'objet',
    IT: 'Posizione articolo',
    CA: 'Item location',
    AU: 'Item location',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Ship From': {
    US: 'Ship from',
    UK: 'Ship from',
    DE: 'Versand von',
    FR: 'Expédié de',
    IT: 'Spedito da',
    CA: 'Ship from',
    AU: 'Ship from',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Item Weight': {
    US: 'Item weight',
    UK: 'Item weight',
    DE: 'Artikelgewicht',
    FR: 'Poids de l\'objet',
    IT: 'Peso articolo',
    CA: 'Item weight',
    AU: 'Item weight',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Shipping Weight': {
    US: 'Shipping weight',
    UK: 'Postage weight',
    DE: 'Versandgewicht',
    FR: 'Poids d\'expédition',
    IT: 'Peso spedizione',
    CA: 'Shipping weight',
    AU: 'Postage weight',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Package Dimensions': {
    US: 'Package dimensions',
    UK: 'Package dimensions',
    DE: 'Paketabmessungen',
    FR: 'Dimensions du colis',
    IT: 'Dimensioni pacco',
    CA: 'Package dimensions',
    AU: 'Package dimensions',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },

  // PRODUCT REVIEWS & RATINGS (Batch 19 - Completing to 1,500)
  'Product Reviews': {
    US: 'Product reviews',
    UK: 'Product reviews',
    DE: 'Produktbewertungen',
    FR: 'Avis sur le produit',
    IT: 'Recensioni prodotto',
    CA: 'Product reviews',
    AU: 'Product reviews',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Item Reviews': {
    US: 'Item reviews',
    UK: 'Item reviews',
    DE: 'Artikelbewertungen',
    FR: 'Avis sur l\'article',
    IT: 'Recensioni articolo',
    CA: 'Item reviews',
    AU: 'Item reviews',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Buyer Review': {
    US: 'Buyer review',
    UK: 'Buyer review',
    DE: 'Käuferbewertung',
    FR: 'Avis acheteur',
    IT: 'Recensione acquirente',
    CA: 'Buyer review',
    AU: 'Buyer review',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Seller Response': {
    US: 'Seller response',
    UK: 'Seller response',
    DE: 'Verkäuferantwort',
    FR: 'Réponse vendeur',
    IT: 'Risposta venditore',
    CA: 'Seller response',
    AU: 'Seller response',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },

  // INTELLECTUAL PROPERTY
  'Brand Name': {
    US: 'Brand name',
    UK: 'Brand name',
    DE: 'Markenname',
    FR: 'Nom de marque',
    IT: 'Nome del marchio',
    CA: 'Brand name',
    AU: 'Brand name',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Trademark': {
    US: 'Trademark',
    UK: 'Trademark',
    DE: 'Markenzeichen',
    FR: 'Marque déposée',
    IT: 'Marchio registrato',
    CA: 'Trademark',
    AU: 'Trademark',
    status: 'confirmed',
    type: 'category',
    tier: 'legal',
    parent: 'trust'
  },
  'Copyright': {
    US: 'Copyright',
    UK: 'Copyright',
    DE: 'Urheberrecht',
    FR: 'Droits d\'auteur',
    IT: 'Copyright',
    CA: 'Copyright',
    AU: 'Copyright',
    status: 'confirmed',
    type: 'category',
    tier: 'legal',
    parent: 'trust'
  },
  'Brand Identity': {
    US: 'Brand identity',
    UK: 'Brand identity',
    DE: 'Markenidentität',
    FR: 'Identité de marque',
    IT: 'Identità del marchio',
    CA: 'Brand identity',
    AU: 'Brand identity',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Intellectual Property': {
    US: 'Intellectual property',
    UK: 'Intellectual property',
    DE: 'Geistiges Eigentum',
    FR: 'Propriété intellectuelle',
    IT: 'Proprietà intellettuale',
    CA: 'Intellectual property',
    AU: 'Intellectual property',
    status: 'confirmed',
    type: 'category',
    tier: 'legal',
    parent: 'trust'
  },

  // LISTING ENHANCEMENTS
  'Featured First': {
    US: 'Featured First',
    UK: 'Featured First',
    DE: 'Featured First',
    FR: 'Featured First',
    IT: 'Featured First',
    CA: 'Featured First',
    AU: 'Featured First',
    status: 'confirmed',
    type: 'advertising',
    tier: 'feature',
    parent: 'advertising'
  },
  'Gallery': {
    US: 'Gallery',
    UK: 'Gallery',
    DE: 'Galerie',
    FR: 'Galerie',
    IT: 'Galleria',
    CA: 'Gallery',
    AU: 'Gallery',
    status: 'confirmed',
    type: 'advertising',
    tier: 'feature',
    parent: 'advertising'
  },
  'Listing Enhancement': {
    US: 'Listing enhancement',
    UK: 'Listing enhancement',
    DE: 'Angebotsverbesserung',
    FR: 'Amélioration d\'annonce',
    IT: 'Miglioramento inserzione',
    CA: 'Listing enhancement',
    AU: 'Listing enhancement',
    status: 'confirmed',
    type: 'advertising',
    tier: 'feature',
    parent: 'advertising'
  },

  // ACCOUNT & PLATFORM
  'User Agreement': {
    US: 'User Agreement',
    UK: 'User Agreement',
    DE: 'Nutzungsbedingungen',
    FR: 'Conditions d\'utilisation',
    IT: 'Accordo per gli utenti',
    CA: 'User Agreement',
    AU: 'User Agreement',
    status: 'confirmed',
    type: 'category',
    tier: 'legal',
    parent: 'trust'
  },
  'Privacy Policy': {
    US: 'Privacy Policy',
    UK: 'Privacy Policy',
    DE: 'Datenschutzerklärung',
    FR: 'Politique de confidentialité',
    IT: 'Informativa sulla privacy',
    CA: 'Privacy Policy',
    AU: 'Privacy Policy',
    status: 'confirmed',
    type: 'category',
    tier: 'legal',
    parent: 'trust'
  },
  'Terms of Service': {
    US: 'Terms of Service',
    UK: 'Terms of Service',
    DE: 'Nutzungsbedingungen',
    FR: 'Conditions de service',
    IT: 'Termini di servizio',
    CA: 'Terms of Service',
    AU: 'Terms of Service',
    status: 'confirmed',
    type: 'category',
    tier: 'legal',
    parent: 'trust'
  },

  // ADDITIONAL CORE FEATURES
  'Print Shipping Label': {
    US: 'Print shipping label',
    UK: 'Print postage label',
    DE: 'Versandetikett drucken',
    FR: 'Imprimer étiquette d\'expédition',
    IT: 'Stampa etichetta di spedizione',
    CA: 'Print shipping label',
    AU: 'Print postage label',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Tracking Number': {
    US: 'Tracking number',
    UK: 'Tracking number',
    DE: 'Sendungsnummer',
    FR: 'Numéro de suivi',
    IT: 'Numero di tracciamento',
    CA: 'Tracking number',
    AU: 'Tracking number',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'shipping'
  },
  'Mark as Shipped': {
    US: 'Mark as shipped',
    UK: 'Mark as shipped',
    DE: 'Als versendet markieren',
    FR: 'Marquer comme expédié',
    IT: 'Segna come spedito',
    CA: 'Mark as shipped',
    AU: 'Mark as shipped',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Mark as Paid': {
    US: 'Mark as paid',
    UK: 'Mark as paid',
    DE: 'Als bezahlt markieren',
    FR: 'Marquer comme payé',
    IT: 'Segna come pagato',
    CA: 'Mark as paid',
    AU: 'Mark as paid',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'payments'
  },
  'Send Invoice': {
    US: 'Send invoice',
    UK: 'Send invoice',
    DE: 'Rechnung senden',
    FR: 'Envoyer facture',
    IT: 'Invia fattura',
    CA: 'Send invoice',
    AU: 'Send invoice',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Request Total': {
    US: 'Request total',
    UK: 'Request total',
    DE: 'Gesamtbetrag anfordern',
    FR: 'Demander le total',
    IT: 'Richiedi totale',
    CA: 'Request total',
    AU: 'Request total',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Add to Cart': {
    US: 'Add to cart',
    UK: 'Add to basket',
    DE: 'In den Warenkorb',
    FR: 'Ajouter au panier',
    IT: 'Aggiungi al carrello',
    CA: 'Add to cart',
    AU: 'Add to cart',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Shopping Cart': {
    US: 'Shopping cart',
    UK: 'Shopping basket',
    DE: 'Warenkorb',
    FR: 'Panier',
    IT: 'Carrello',
    CA: 'Shopping cart',
    AU: 'Shopping cart',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Checkout': {
    US: 'Checkout',
    UK: 'Checkout',
    DE: 'Zur Kasse',
    FR: 'Passer commande',
    IT: 'Procedi all\'acquisto',
    CA: 'Checkout',
    AU: 'Checkout',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'View Order': {
    US: 'View order',
    UK: 'View order',
    DE: 'Bestellung ansehen',
    FR: 'Voir la commande',
    IT: 'Visualizza ordine',
    CA: 'View order',
    AU: 'View order',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Order Details': {
    US: 'Order details',
    UK: 'Order details',
    DE: 'Bestelldetails',
    FR: 'Détails de la commande',
    IT: 'Dettagli ordine',
    CA: 'Order details',
    AU: 'Order details',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },

  // FINAL PROGRAMS (1,488-1,500)
  'Bid Now': {
    US: 'Bid now',
    UK: 'Bid now',
    DE: 'Jetzt bieten',
    FR: 'Enchérir',
    IT: 'Fai un\'offerta',
    CA: 'Bid now',
    AU: 'Bid now',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Place Bid': {
    US: 'Place bid',
    UK: 'Place bid',
    DE: 'Gebot abgeben',
    FR: 'Placer enchère',
    IT: 'Fai offerta',
    CA: 'Place bid',
    AU: 'Place bid',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Maximum Bid': {
    US: 'Maximum bid',
    UK: 'Maximum bid',
    DE: 'Maximalgebot',
    FR: 'Enchère maximum',
    IT: 'Offerta massima',
    CA: 'Maximum bid',
    AU: 'Maximum bid',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Winning Bid': {
    US: 'Winning bid',
    UK: 'Winning bid',
    DE: 'Höchstgebot',
    FR: 'Enchère gagnante',
    IT: 'Offerta vincente',
    CA: 'Winning bid',
    AU: 'Winning bid',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Reserve Not Met': {
    US: 'Reserve not met',
    UK: 'Reserve not met',
    DE: 'Mindestpreis nicht erreicht',
    FR: 'Réserve non atteinte',
    IT: 'Riserva non raggiunta',
    CA: 'Reserve not met',
    AU: 'Reserve not met',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Reserve Met': {
    US: 'Reserve met',
    UK: 'Reserve met',
    DE: 'Mindestpreis erreicht',
    FR: 'Réserve atteinte',
    IT: 'Riserva raggiunta',
    CA: 'Reserve met',
    AU: 'Reserve met',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  },
  'Time Left': {
    US: 'Time left',
    UK: 'Time left',
    DE: 'Verbleibende Zeit',
    FR: 'Temps restant',
    IT: 'Tempo rimanente',
    CA: 'Time left',
    AU: 'Time left',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Ends Soon': {
    US: 'Ends soon',
    UK: 'Ends soon',
    DE: 'Endet bald',
    FR: 'Se termine bientôt',
    IT: 'Termina presto',
    CA: 'Ends soon',
    AU: 'Ends soon',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Auction Ended': {
    US: 'Auction ended',
    UK: 'Auction ended',
    DE: 'Auktion beendet',
    FR: 'Enchère terminée',
    IT: 'Asta terminata',
    CA: 'Auction ended',
    AU: 'Auction ended',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Number of Bids': {
    US: 'Number of bids',
    UK: 'Number of bids',
    DE: 'Anzahl der Gebote',
    FR: 'Nombre d\'enchères',
    IT: 'Numero di offerte',
    CA: 'Number of bids',
    AU: 'Number of bids',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'No Bids': {
    US: 'No bids',
    UK: 'No bids',
    DE: 'Keine Gebote',
    FR: 'Aucune enchère',
    IT: 'Nessuna offerta',
    CA: 'No bids',
    AU: 'No bids',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'Buy It Now Price': {
    US: 'Buy It Now price',
    UK: 'Buy It Now price',
    DE: 'Sofort-Kaufen-Preis',
    FR: 'Prix d\'achat immédiat',
    IT: 'Prezzo Compralo Subito',
    CA: 'Buy It Now price',
    AU: 'Buy It Now price',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'buyer'
  },
  'List Price': {
    US: 'List price',
    UK: 'List price',
    DE: 'Listenpreis',
    FR: 'Prix catalogue',
    IT: 'Prezzo di listino',
    CA: 'List price',
    AU: 'List price',
    status: 'confirmed',
    type: 'category',
    tier: 'feature',
    parent: 'sellertools'
  }
};

// Market metadata
export const markets = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' }
];

// Helper function to get translation
export function getTranslation(programKey: string, marketCode: string): string {
  const translation = programTranslations[programKey];
  if (!translation) return programKey;
  return translation[marketCode as keyof ProgramTranslation] as string || programKey;
}

// Helper to get translation status color
export function getStatusColor(status: string): string {
  switch (status) {
    case 'confirmed': return '#86b817'; // Green
    case 'global': return '#0064d2'; // Blue
    case 'partial': return '#f5af02'; // Yellow
    case 'research-needed': return '#6b7280'; // Gray
    default: return '#6b7280';
  }
}
