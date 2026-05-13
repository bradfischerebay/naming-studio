import type { NodeEnrichmentV2 } from './enriched-v2-batch-01-trust'

// Batch 5c — Acquisitions, M&A History, Legacy Platforms & Campaigns
// Covers: TCGplayer, KnownOrigin, Tise, COMC, Goldin, Magento, PayPal, Billpoint,
// Butterfield & Butterfield, ShopRunner, legacy campaigns and historical brands

export const ACQUISITIONS_ENRICHMENT: NodeEnrichmentV2[] = [

  // ── ACTIVE ACQUISITIONS ────────────────────────────────────────────────────

  {
    id: 'tcgplayer',
    valueProp: "TCGplayer is eBay's acquired trading card marketplace — the leading platform for buying and selling trading cards (Magic: The Gathering, Pokémon, Yu-Gi-Oh!, and sports cards) with a deep price guide database, grading integration, and a dedicated community of card collectors. Acquired by eBay in 2022 to strengthen its position in the high-growth collectibles vertical.",
    valueTerritories: ['selection', 'trust', 'transparency', 'community'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'long-term', 'inherited-M&A'],
    citations: [
      'https://www.tcgplayer.com',
      'https://www.ebayinc.com/stories/news/ebay-completes-acquisition-of-tcgplayer/',
    ],
  },

  {
    id: 'tcgplayer-marketplace',
    valueProp: "TCGplayer Marketplace is the buyer-facing trading card buying platform within the TCGplayer ecosystem — a price-comparison marketplace where buyers can purchase individual cards from multiple verified sellers at competitive prices, with TCGplayer handling aggregated checkout.",
    valueTerritories: ['selection', 'value', 'transparency'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'long-term', 'inherited-M&A'],
    citations: ['https://www.tcgplayer.com'],
  },

  {
    id: 'tcgplayer-authentication-center',
    valueProp: "TCGplayer Authentication Center is TCGplayer's dedicated grading and authentication service for trading cards — providing PSA-adjacent card evaluation, condition verification, and authenticity certification that integrates with eBay's Vault and Authenticity Guarantee programs.",
    valueTerritories: ['trust', 'protection', 'transparency'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'long-term', 'inherited-M&A'],
    citations: ['https://www.tcgplayer.com/authentication'],
  },

  {
    id: 'knownorigin',
    valueProp: "KnownOrigin is eBay's acquired digital art and NFT marketplace — a curated platform for blockchain-verified digital art where creators mint and sell limited-edition pieces to collectors. Acquired by eBay in 2022 as part of its Web3 and digital collectibles strategy.",
    valueTerritories: ['trust', 'selection', 'community'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'long-term', 'inherited-M&A'],
    citations: [
      'https://knownorigin.io',
      'https://www.ebayinc.com/stories/news/ebay-acquires-knownorigin/',
    ],
  },

  {
    id: 'tise',
    valueProp: "Tise is eBay's acquired Scandinavian peer-to-peer fashion resale platform — a mobile-first marketplace popular in Norway and Sweden where fashion-conscious buyers and sellers trade pre-owned clothing, accessories, and shoes. Acquired by eBay to extend its circular fashion presence in the Nordic markets.",
    valueTerritories: ['selection', 'community', 'value'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term', 'inherited-M&A'],
    citations: [
      'https://www.tise.com',
      'https://www.ebayinc.com/stories/news/ebay-acquires-tise/',
    ],
  },

  {
    id: 'comc',
    valueProp: "COMC (Check Out My Cards) is eBay's acquired sports card storage, trading, and consignment platform — enabling collectors to store physical cards in COMC's facility, sell them digitally, and ship only when a buyer requests physical delivery. Acquired to strengthen eBay's trading card infrastructure alongside TCGplayer.",
    valueTerritories: ['convenience', 'trust', 'value'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'long-term', 'inherited-M&A'],
    citations: [
      'https://www.comc.com',
    ],
  },

  {
    id: 'goldin-auctions',
    valueProp: "Goldin Auctions (Goldin) is eBay's high-end sports memorabilia and trading card auction house — handling seven-figure transactions for rare sports collectibles, autographed memorabilia, and investment-grade cards, anchoring eBay's premium collectibles positioning.",
    valueTerritories: ['trust', 'selection', 'community'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'long-term', 'inherited-M&A'],
    citations: [
      'https://goldin.co',
      'https://www.ebayinc.com/stories/news/ebay-acquires-goldin/',
    ],
  },

  {
    id: 'magento',
    valueProp: "Magento was the e-commerce platform acquired by eBay in 2011 and subsequently sold to Adobe in 2018. During its eBay ownership period, Magento powered the X.commerce enterprise e-commerce ecosystem and eBay's third-party platform strategy before eBay refocused on its core marketplace.",
    valueTerritories: ['convenience'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed', 'inherited-M&A'],
    citations: ['https://www.ebayinc.com/stories/news/ebay-enterprise-sells-magento-to-permira/'],
  },

  // ── LEGACY ACQUISITIONS ────────────────────────────────────────────────────

  {
    id: 'billpoint',
    valueProp: "Billpoint was eBay's original owned online payment system — a person-to-person payment service launched in 1999, before PayPal dominated the market. eBay shut down Billpoint in 2003 after acquiring PayPal in 2002, which proved the superior product.",
    valueTerritories: ['convenience'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed', 'inherited-M&A'],
    citations: ['https://www.ebayinc.com/company/history/'],
  },

  {
    id: 'paypal-spinoff',
    valueProp: "PayPal Spinoff refers to eBay's 2015 separation of PayPal into an independent publicly traded company — a major strategic decision that ended the eBay-PayPal integrated payments model and ultimately led to eBay's development of Managed Payments as a replacement.",
    valueTerritories: ['trust', 'convenience'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebayinc.com/stories/news/ebay-inc-completes-separation-of-paypal/'],
  },

  {
    id: 'butterfield-butterfield',
    valueProp: "Butterfield & Butterfield was a prestigious San Francisco auction house acquired by eBay in 1999 and sold in 2002 — eBay's early attempt to enter the premium live auction market before pivoting to focus entirely on its online marketplace model.",
    valueTerritories: ['trust', 'selection'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed', 'inherited-M&A'],
    citations: ['https://www.ebayinc.com/company/history/'],
  },

  {
    id: 'kruse-international',
    valueProp: "Kruse International was a collectible car auction company that partnered with eBay Motors in the early 2000s to bring high-end vehicle auctions online — one of eBay's first moves to bring traditional auction categories into the digital marketplace.",
    valueTerritories: ['selection', 'trust'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed', 'inherited-M&A'],
    citations: ['https://www.ebayinc.com/company/history/'],
  },

  {
    id: 'shoprunner',
    valueProp: "ShopRunner was an Amazon Prime-equivalent subscription service (free 2-day shipping across multiple retailers) that eBay briefly invested in and partnered with before divesting. The investment reflected eBay's exploration of alternative buyer loyalty programs before developing eBay Plus.",
    valueTerritories: ['speed', 'convenience'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed', 'inherited-M&A'],
    citations: ['https://www.ebayinc.com/company/history/'],
  },

  {
    id: 'gsi-commerce-ebay-enterprise',
    valueProp: "GSI Commerce / eBay Enterprise was a major enterprise e-commerce services division acquired by eBay in 2011 for $2.4 billion — providing fulfillment, marketing, and e-commerce technology services to large retailers. Sold off in 2015 as eBay refocused on its core marketplace platform.",
    valueTerritories: ['convenience', 'value'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed', 'inherited-M&A'],
    citations: ['https://www.ebayinc.com/company/history/'],
  },

  {
    id: 'xcommerce',
    valueProp: "X.commerce was eBay's short-lived enterprise commerce technology platform (2011-2013) — an attempt to unify Magento, PayPal, and eBay developer APIs into a single open commerce platform for merchants. Retired as eBay refocused its portfolio strategy.",
    valueTerritories: ['convenience'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://developer.ebay.com'],
  },

  {
    id: 'critical-path-software',
    valueProp: "Critical Path Software was an early eBay acquisition that provided email and communication infrastructure for eBay's growing user base in the early 2000s — absorbed into eBay's technology infrastructure rather than maintained as a branded product.",
    valueTerritories: ['convenience'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed', 'inherited-M&A'],
    citations: ['https://www.ebayinc.com/company/history/'],
  },

  {
    id: 'electronic-travel-auction',
    valueProp: "Electronic Travel Auctions (ETA) was an early eBay program enabling travel companies to sell unsold airline seats, hotel rooms, and vacation packages through the eBay auction format — one of eBay's experimental vertical expansions in the early 2000s.",
    valueTerritories: ['selection', 'value'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebayinc.com/company/history/'],
  },

  {
    id: 'up4sale',
    valueProp: "Up4Sale was an early competitor auction site that eBay acquired in 2000 to reduce competitive pressure in the nascent online auction market — absorbed into eBay's user base and shut down after acquisition.",
    valueTerritories: ['selection'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed', 'inherited-M&A'],
    citations: ['https://www.ebayinc.com/company/history/'],
  },

  {
    id: 'twice-acquisition',
    valueProp: "Twice was an online secondhand clothing marketplace acquired by eBay in 2015 — an attempt to expand into the curated resale fashion market. Shut down in 2016 as eBay centralized its fashion strategy on its core marketplace rather than maintaining a separate brand.",
    valueTerritories: ['selection', 'value'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed', 'inherited-M&A'],
    citations: ['https://www.ebayinc.com/company/history/'],
  },

  {
    id: 'smartmarket-technology',
    valueProp: "SmartMarket Technology was an early eBay acquisition providing algorithmic market analysis and dynamic pricing tools — early infrastructure for eBay's data-driven marketplace optimization before these capabilities were built in-house.",
    valueTerritories: ['value', 'transparency'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed', 'inherited-M&A'],
    citations: ['https://www.ebayinc.com/company/history/'],
  },

  {
    id: 'mission-fish-seller-account',
    valueProp: "MissionFish was the nonprofit partner that originally powered eBay Giving Works (now eBay for Charity) — enabling registered charities to receive donations from eBay sales. The MissionFish relationship established the infrastructure later directly integrated into eBay's charity product.",
    valueTerritories: ['community', 'trust'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebay.com/charity'],
  },

  // ── LEGACY eBay MOBILE & TECH PRODUCTS ───────────────────────────────────

  {
    id: 'ebay-redlaser',
    valueProp: "RedLaser was a barcode-scanning shopping app acquired by eBay in 2010 — enabling users to scan product barcodes to compare prices across retailers and eBay. Shut down in 2014 as barcode scanning became a standard smartphone and eBay app feature.",
    valueTerritories: ['convenience', 'value', 'transparency'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed', 'inherited-M&A'],
    citations: ['https://www.ebayinc.com/company/history/'],
  },

  {
    id: 'ebay-milo',
    valueProp: "Milo was a local inventory search service acquired by eBay in 2010 — enabling consumers to search real-time local store inventory online before visiting a physical store. Shut down in 2016 as the concept was absorbed into broader local commerce features.",
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed', 'inherited-M&A'],
    citations: ['https://www.ebayinc.com/company/history/'],
  },

  {
    id: 'ebay-fashion-app',
    valueProp: "eBay Fashion was a dedicated fashion-focused mobile app from eBay — offering a curated, visually-driven shopping experience for clothing, accessories, and shoes, separate from the main eBay app. Discontinued as eBay integrated fashion improvements into the core app.",
    valueTerritories: ['selection', 'convenience'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebayinc.com/company/history/'],
  },

  {
    id: 'ebay-4-0-mobile-app',
    valueProp: "eBay 4.0 Mobile App was a major redesign version of the eBay mobile application — introducing a more visual, feed-based shopping experience. Referenced as a product milestone in eBay's mobile evolution rather than an ongoing named product.",
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebayinc.com/company/history/'],
  },

  {
    id: 'ebay-mobile-app-android',
    valueProp: "eBay Mobile App for Android is the Google Play Store version of eBay's main consumer mobile app — the primary eBay touchpoint for Android users for buying, selling, and managing their account.",
    valueTerritories: ['convenience', 'speed'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://play.google.com/store/apps/details?id=com.ebay.mobile'],
  },

  // ── LEGACY CAMPAIGNS & ONE-OFF INITIATIVES ────────────────────────────────

  {
    id: 'mymix-fashion-campaign',
    valueProp: "MyMix Fashion Campaign was an eBay fashion marketing campaign — a seasonal promotion encouraging buyers to explore eBay's fashion selection with personalized outfit inspiration, part of eBay's push to reposition itself as a credible fashion destination.",
    valueTerritories: ['selection', 'community'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['one-off'],
    citations: ['https://www.ebay.com'],
  },

  {
    id: 'you-cant-fake-fashion-campaign',
    valueProp: "You Can't Fake Fashion was eBay's marketing campaign promoting Authenticity Guarantee for fashion — a brand awareness push emphasizing that authenticated pre-owned fashion on eBay is verifiably genuine, addressing consumer skepticism about secondhand luxury.",
    valueTerritories: ['trust', 'transparency'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['one-off'],
    citations: ['https://www.ebay.co.uk'],
  },

  {
    id: 'things-people-love',
    valueProp: "Things People Love was an eBay brand campaign focused on the passion and emotional connection people have with the items they buy and sell on eBay — an attempt to reframe eBay as a marketplace for items that matter personally, not just transactionally.",
    valueTerritories: ['community', 'selection'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['one-off'],
    citations: ['https://www.ebayinc.com'],
  },

  {
    id: 'techstars-future-of-ecommerce',
    valueProp: "Techstars Future of Commerce (eBay co-sponsored) was a startup accelerator program co-sponsored by eBay to invest in and develop commerce technology startups — part of eBay's ecosystem-building efforts to stay connected to emerging commerce innovation.",
    valueTerritories: ['community'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['one-off'],
    citations: ['https://www.techstars.com'],
  },

  {
    id: 'ebay-innovate-developer-conference',
    valueProp: "eBay Innovate was eBay's annual developer conference — a event bringing together the eBay developer ecosystem to announce new APIs, platform capabilities, and partnership opportunities. Held in the early 2010s during eBay's X.commerce era.",
    valueTerritories: ['community', 'transparency'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['one-off'],
    citations: ['https://developer.ebay.com'],
  },

  {
    id: 'ebay-playbook',
    valueProp: "eBay Playbook was eBay's seller strategy guide and content brand — a collection of best-practice articles, videos, and guides helping sellers understand how to succeed on eBay, positioned as an internal media property for seller education.",
    valueTerritories: ['transparency', 'community'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebay.com/sellercenter'],
  },

  {
    id: 'ebay-moda-latin-america',
    valueProp: "eBay Moda Latin America was eBay's fashion initiative targeting the Latin American market — a curated fashion destination and marketing program promoting eBay as a fashion platform for Spanish-speaking buyers in Latin America.",
    valueTerritories: ['selection', 'community'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['one-off'],
    citations: ['https://www.ebay.com'],
  },

  {
    id: 'zong-mobile-payments',
    valueProp: "Zong was a mobile carrier billing payment startup acquired by eBay/PayPal in 2011 — enabling consumers to make purchases charged directly to their mobile phone bill. Integrated into PayPal's payment options before becoming obsolete as card payments dominated mobile commerce.",
    valueTerritories: ['convenience'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed', 'inherited-M&A'],
    citations: ['https://www.ebayinc.com/company/history/'],
  },

  // ── PLATFORM-SPECIFIC LOCALIZATIONS ───────────────────────────────────────

  {
    id: 'hub-vendeur',
    valueProp: "Hub Vendeur is eBay France's localized name for Seller Hub — the French-language seller management dashboard on ebay.fr, providing French sellers with the same Seller Hub capabilities under a localized brand name.",
    valueTerritories: ['convenience', 'transparency'],
    nameClass: 'Product Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.fr/sh/landing'],
  },

  {
    id: 'console-venditori',
    valueProp: "Console Venditori is eBay Italy's localized name for Seller Hub — the Italian-language seller management dashboard on ebay.it giving Italian sellers access to their listings, orders, analytics, and tools.",
    valueTerritories: ['convenience', 'transparency'],
    nameClass: 'Product Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.it/sh/landing'],
  },

  {
    id: 'verkaufer-cockpit-pro',
    valueProp: "Verkäufer-Cockpit Pro is eBay Germany's localized name for Selling Manager Pro — the advanced German-language seller management dashboard on ebay.de for high-volume professional sellers (now superseded by the German Seller Hub).",
    valueTerritories: ['convenience', 'transparency'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebay.de/sh/landing'],
  },

  {
    id: 'zahlungsabwicklung-ebay',
    valueProp: "Zahlungsabwicklung eBay (eBay Payment Processing) is the German-market branded name for eBay Managed Payments on ebay.de — the localized identity for eBay's integrated payment infrastructure in Germany.",
    valueTerritories: ['convenience', 'trust'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.de/seller/payments'],
  },

  {
    id: 'services-paiement-ebay',
    valueProp: "Services de Paiement eBay is the French-market branded name for eBay Managed Payments on ebay.fr — the localized identity for eBay's integrated payment infrastructure used to process all French marketplace transactions.",
    valueTerritories: ['convenience', 'trust'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.fr/seller/payments'],
  },

  {
    id: 'aste-di-beneficenza',
    valueProp: "Aste di Beneficenza (Charity Auctions) is eBay Italy's charity auction program — the Italian-market equivalent of eBay for Charity, enabling Italian sellers to donate a portion of sale proceeds to registered Italian nonprofits through auction-format listings.",
    valueTerritories: ['community', 'trust'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.it/charity'],
  },

  {
    id: 'seller-centre',
    valueProp: "Seller Centre is the UK/AU localized name for eBay's seller support and information hub — the market-specific version of the seller resource center providing guides, policies, updates, and tools documentation for British and Australian sellers.",
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.co.uk/sellercenter'],
  },

  {
    id: 'seller-help',
    valueProp: "Seller Help is eBay's self-service seller resolution portal — enabling sellers to appeal policy decisions, request fee credits, and resolve account issues directly without needing to contact customer support through traditional channels.",
    valueTerritories: ['trust', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/sellercenter/seller-help'],
  },

  {
    id: 'ebay-business-supply',
    valueProp: "eBay Business Supply is eBay's B2B purchasing program — enabling businesses to procure industrial supplies, tools, and equipment with tax exemption documentation, bulk order capabilities, and net payment terms tailored for business purchasing workflows.",
    valueTerritories: ['value', 'selection', 'convenience'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term'],
    citations: ['https://www.ebay.com/businesssupply'],
  },

]
