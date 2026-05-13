import type { NodeEnrichmentV2 } from './enriched-v2-batch-01-trust'

// Batch 5a — Key eBay Branded Products + Authenticity Sub-Programs
// Covers: eBay Live, Plus, Vault, Refurbished, Gift Cards, Bucks, Mastercard,
// Partner Network, Academy, Community, Concierge, AG sub-programs, condition tiers

export const PRODUCTS_ENRICHMENT: NodeEnrichmentV2[] = [

  // ── AUTHENTICITY GUARANTEE SUB-PROGRAMS ──────────────────────────────────

  {
    id: 'authenticity-guarantee-watches',
    valueProp: "Authenticity Guarantee for Watches covers luxury and pre-owned timepieces sold on eBay — every eligible watch is inspected by a certified authenticator who verifies the movement, dial, case, and crown before delivery to the buyer. Launched initially as Expert Verification (2020), rebranded to Authenticity Guarantee in Q4 2023.",
    valueTerritories: ['trust', 'protection', 'transparency', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'full-funnel', 'long-term', 'reusable-capability'],
    citations: [
      'https://pages.ebay.com/authenticity-guarantee/watches/',
      'https://help.ebay.com/buyer/buying/watches-authenticity-guarantee',
    ],
  },

  {
    id: 'authenticity-guarantee-sneakers',
    valueProp: "Authenticity Guarantee for Sneakers authenticates every eligible pair sold on eBay through a network of trained experts who verify size, colorway, materials, and sole — giving buyers confidence in pre-owned and rare sneaker purchases from a platform with the deepest secondary market inventory.",
    valueTerritories: ['trust', 'protection', 'transparency', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'full-funnel', 'long-term', 'reusable-capability'],
    citations: [
      'https://pages.ebay.com/authenticity-guarantee/sneakers/',
      'https://help.ebay.com/buyer/buying/sneakers-authenticity-guarantee',
    ],
  },

  {
    id: 'authenticity-guarantee-handbags',
    valueProp: "Authenticity Guarantee for Handbags verifies luxury bags — checking hardware, stitching, serial numbers, lining, and brand-specific markers — so buyers can purchase pre-owned designer handbags on eBay with the same confidence they'd have buying new from a brand boutique.",
    valueTerritories: ['trust', 'protection', 'transparency', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'full-funnel', 'long-term', 'reusable-capability'],
    citations: [
      'https://pages.ebay.com/authenticity-guarantee/handbags/',
    ],
  },

  {
    id: 'authenticity-guarantee-jewelry',
    valueProp: "Authenticity Guarantee for Jewelry verifies precious metals, gemstones, and hallmarks on fine jewelry purchased through eBay — ensuring buyers receive exactly the item described, with authentication certificates from independent experts.",
    valueTerritories: ['trust', 'protection', 'transparency'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://pages.ebay.com/authenticity-guarantee/jewelry/',
    ],
  },

  {
    id: 'authenticity-guarantee-trading-cards',
    valueProp: "Authenticity Guarantee for Trading Cards authenticates sports and collectible cards purchased on eBay — graders verify centering, corners, edges, and surface condition before delivery, bringing professional-grade card authentication to the world's largest trading card marketplace.",
    valueTerritories: ['trust', 'protection', 'transparency', 'community'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'full-funnel', 'long-term', 'reusable-capability'],
    citations: [
      'https://pages.ebay.com/authenticity-guarantee/trading-cards/',
    ],
  },

  {
    id: 'authenticity-guarantee-streetwear',
    valueProp: "Authenticity Guarantee for Streetwear extends eBay's authentication program to coveted streetwear brands — verifying tags, stitching, materials, and labels on hoodies, tees, and outerwear from brands where counterfeits are prevalent in the secondary market.",
    valueTerritories: ['trust', 'protection', 'transparency'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://pages.ebay.com/authenticity-guarantee/streetwear/',
    ],
  },

  {
    id: 'authenticity-guarantee-filter',
    valueProp: "Authenticity Guarantee Filter is the search refinement option that limits results to only listings covered by eBay's authentication program — enabling buyers to shop exclusively within the authenticated inventory pool for a category.",
    valueTerritories: ['trust', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://pages.ebay.com/authenticity-guarantee/'],
  },

  // ── AUTHENTICATION CATEGORY FEATURES ─────────────────────────────────────

  {
    id: 'handbag-authentication',
    valueProp: "Handbag Authentication is the category-level trust feature on eBay that marks eligible luxury handbag listings as verified authentic — surfaced in search and on listing pages to distinguish authenticated inventory from unverified seller listings.",
    valueTerritories: ['trust', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://pages.ebay.com/authenticity-guarantee/handbags/'],
  },

  {
    id: 'sneaker-authentication',
    valueProp: "Sneaker Authentication is the search and listing trust signal indicating a sneaker has passed eBay's Authenticity Guarantee inspection — visible to buyers browsing the sneaker category to signal verified inventory.",
    valueTerritories: ['trust', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://pages.ebay.com/authenticity-guarantee/sneakers/'],
  },

  {
    id: 'jewelry-authentication',
    valueProp: "Jewelry Authentication is the category trust signal on eBay indicating a fine jewelry listing has been independently verified — shown on listing pages and search results to distinguish authenticated fine jewelry from unverified inventory.",
    valueTerritories: ['trust', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://pages.ebay.com/authenticity-guarantee/jewelry/'],
  },

  {
    id: 'watch-authentication',
    valueProp: "Watch Authentication is the search and listing trust signal for timepieces that have passed eBay's Authenticity Guarantee inspection — indicating a watch has been certified by an expert before reaching the buyer.",
    valueTerritories: ['trust', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://pages.ebay.com/authenticity-guarantee/watches/'],
  },

  {
    id: 'trading-card-authentication',
    valueProp: "Trading Card Authentication is the trust signal indicating a trading card listing is covered by eBay's card authentication program — shown on listings to give collectors confidence in the card's condition and legitimacy.",
    valueTerritories: ['trust', 'transparency', 'community'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://pages.ebay.com/authenticity-guarantee/trading-cards/'],
  },

  {
    id: 'certificate-of-authenticity',
    valueProp: "Certificate of Authenticity is a third-party or brand-issued document proving the genuineness of an item — referenced on eBay listings for art, memorabilia, and collectibles as a key trust signal that supplements eBay's own authentication programs.",
    valueTerritories: ['trust', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/buying/certificates-authenticity'],
  },

  {
    id: 'wata-grading',
    valueProp: "Wata Games is a third-party grading service for sealed video games integrated into eBay's collectibles ecosystem — graded Wata-certified games are listed with their encapsulated grade, enabling confident buying and selling of sealed vintage game collectibles.",
    valueTerritories: ['trust', 'transparency', 'community'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.watagames.com'],
  },

  // ── REFURBISHED CONDITION TIERS ───────────────────────────────────────────

  {
    id: 'ebay-refurbished',
    valueProp: "eBay Refurbished is eBay's branded destination and trust program for certified refurbished electronics — curating inventory from authorized refurbishers and manufacturers with graded condition tiers (Excellent, Very Good, Good) and eBay-backed warranties, competing directly with retail refurbishment programs.",
    valueTerritories: ['value', 'trust', 'transparency', 'protection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'full-funnel', 'long-term', 'reusable-capability'],
    citations: [
      'https://www.ebay.com/deals/refurbished',
      'https://help.ebay.com/buyer/buying/ebay-refurbished',
    ],
  },

  {
    id: 'certified-refurbished',
    valueProp: "Certified Refurbished is the top condition tier within eBay Refurbished — items restored by the original manufacturer or authorized refurbisher to like-new standards, carrying the highest quality guarantee and typically covered by a manufacturer-backed warranty.",
    valueTerritories: ['value', 'trust', 'transparency', 'protection'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/deals/refurbished'],
  },

  {
    id: 'excellent-refurbished',
    valueProp: "Excellent Refurbished is the second-highest condition tier in eBay's graded refurbished system — items in near-perfect cosmetic condition with full functionality, inspected and restored by a qualified refurbisher.",
    valueTerritories: ['value', 'trust', 'transparency'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/deals/refurbished'],
  },

  {
    id: 'very-good-refurbished',
    valueProp: "Very Good Refurbished is eBay's mid-high refurbished condition tier — items with minor cosmetic wear but full functionality, restored and tested by a qualified refurbisher with a warranty included.",
    valueTerritories: ['value', 'trust'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/deals/refurbished'],
  },

  {
    id: 'good-refurbished',
    valueProp: "Good Refurbished is eBay's entry-level certified refurbished condition tier — items that show signs of wear but are fully functional, restored by a qualified refurbisher, and backed by a warranty — the best value point in the eBay Refurbished program.",
    valueTerritories: ['value', 'trust'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/deals/refurbished'],
  },

  {
    id: 'seller-refurbished',
    valueProp: "Seller Refurbished is a condition designation for items restored by individual sellers (not authorized refurbishers) — distinct from eBay Refurbished's graded tiers, representing seller-reconditioned items without a formal eBay warranty backing.",
    valueTerritories: ['value', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/listing-formats/item-condition'],
  },

  {
    id: 'certified-open-box',
    valueProp: "Certified Open Box is an eBay condition designation for items that have been opened but are otherwise unused — verified by the seller as complete with all original accessories, typically at a discount from new retail pricing.",
    valueTerritories: ['value', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/listing-formats/item-condition'],
  },

  {
    id: 'open-box',
    valueProp: "Open Box is an item condition indicating the original packaging has been opened but the item is unused or barely used — a common intermediate condition between new and used that offers buyers a discount without significant quality compromise.",
    valueTerritories: ['value', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/listings/listing-formats/item-condition'],
  },

  // ── KEY EBAY BRANDED PRODUCTS ─────────────────────────────────────────────

  {
    id: 'ebay-live',
    valueProp: "eBay Live is eBay's shoppable live-streaming product — enabling sellers and brands to host real-time interactive shows where viewers browse, ask questions, and purchase items on the spot. Launched in 2023 as part of eBay's strategy to capture entertainment commerce audiences through categories like trading cards, collectibles, and fashion.",
    valueTerritories: ['community', 'selection', 'convenience', 'value'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'full-funnel', 'long-term'],
    citations: [
      'https://www.ebay.com/live',
      'https://help.ebay.com/seller/tools/ebay-live',
    ],
  },

  {
    id: 'ebay-plus',
    valueProp: "eBay Plus is eBay's premium buyer subscription program — launched in Germany and Australia — offering members free expedited shipping, free returns, and exclusive deals on Plus-eligible listings in exchange for an annual membership fee. It's eBay's direct answer to Amazon Prime in key international markets.",
    valueTerritories: ['value', 'speed', 'convenience', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'full-funnel', 'long-term', 'reusable-capability'],
    citations: [
      'https://www.ebay.com.au/pluslanding',
      'https://www.ebay.de/pluslanding',
      'https://help.ebay.com/buyer/ebay-plus',
    ],
  },

  {
    id: 'ebay-plus-membership',
    valueProp: "eBay Plus Membership is the subscription enrollment that unlocks eBay Plus benefits — free shipping, free returns, and exclusive member pricing on participating listings — billed annually in DE and AU markets where the program is active.",
    valueTerritories: ['value', 'speed', 'convenience'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['multi-market', 'long-term', 'reusable-capability'],
    citations: ['https://help.ebay.com/buyer/ebay-plus'],
  },

  {
    id: 'ebay-vault',
    valueProp: "eBay Vault is eBay's secure physical storage and digital authentication program for high-value collectibles — starting with trading cards. Items stored in the eBay Vault are authenticated, digitally represented as NFT-linked assets, and can be bought and sold without physical transfer, removing the friction and risk of shipping valuable collectibles.",
    valueTerritories: ['trust', 'protection', 'convenience', 'value'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'full-funnel', 'long-term'],
    citations: [
      'https://www.ebay.com/vault',
      'https://help.ebay.com/buyer/ebay-vault',
    ],
  },

  {
    id: 'ebay-for-charity',
    valueProp: "eBay for Charity (formerly eBay Giving Works) is eBay's charitable giving program enabling sellers to donate a percentage of their sale proceeds to any registered nonprofit — making every eBay transaction an opportunity to contribute to causes buyers and sellers care about.",
    valueTerritories: ['community', 'transparency', 'trust'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'full-funnel', 'long-term', 'reusable-capability'],
    citations: [
      'https://www.ebay.com/charity',
      'https://help.ebay.com/seller/tools/ebay-for-charity',
    ],
  },

  {
    id: 'ebay-gift-cards',
    valueProp: "eBay Gift Cards are prepaid digital and physical vouchers redeemable for purchases on eBay — sold through retail partners and eBay itself, allowing gifters to give the recipient access to eBay's full selection rather than a specific item.",
    valueTerritories: ['convenience', 'value', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term'],
    citations: [
      'https://www.ebay.com/giftcards',
    ],
  },

  {
    id: 'ebay-bucks',
    valueProp: "eBay Bucks was eBay's buyer loyalty rewards program — members earned a percentage back on qualifying purchases as eBay Bucks, redeemable on future purchases. Discontinued in 2022 in the US as eBay shifted toward more targeted promotional tools through Managed Payments.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['lifecycle-managed'],
    citations: [
      'https://help.ebay.com/buyer/ebay-bucks',
    ],
  },

  {
    id: 'ebay-mastercard',
    valueProp: "eBay Mastercard is a co-branded credit card offering eBay buyers rewards points on eBay purchases and everyday spending — a financial product issued in partnership with a card network to increase buyer loyalty and purchasing power on the platform.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['lifecycle-managed'],
    citations: [
      'https://www.ebay.com/credit-card',
    ],
  },

  {
    id: 'ebay-partner-network',
    valueProp: "eBay Partner Network (EPN) is eBay's affiliate marketing program — enabling publishers, content creators, and website owners to earn commissions by driving traffic and sales to eBay through tracked affiliate links across all categories.",
    valueTerritories: ['value', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://partnernetwork.ebay.com',
    ],
  },

  {
    id: 'ebay-balance',
    valueProp: "eBay Balance is the stored funds account within eBay's Managed Payments system — sellers accumulate their sale proceeds as eBay Balance before scheduling payouts to their bank, giving them a consolidated view of their earnings.",
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/seller/payments/ebay-balance'],
  },

  {
    id: 'ebay-community',
    valueProp: "eBay Community is eBay's official discussion board and peer support network — where buyers and sellers ask questions, share expertise, discuss categories they're passionate about, and interact with eBay staff through official boards.",
    valueTerritories: ['community', 'trust', 'transparency'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term'],
    citations: [
      'https://community.ebay.com',
    ],
  },

  {
    id: 'ebay-academy',
    valueProp: "eBay Academy is eBay's free online learning platform for sellers — offering courses, tutorials, and certifications on listing best practices, business growth strategies, advertising, and eBay-specific tools to help sellers at every level improve their performance.",
    valueTerritories: ['transparency', 'community', 'value'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term'],
    citations: [
      'https://www.ebay.com/academy',
    ],
  },

  {
    id: 'ebay-concierge',
    valueProp: "eBay Concierge is eBay's premium customer service tier — providing high-volume sellers and VIP buyers with dedicated account representatives, priority support, and personalized assistance beyond standard self-service support.",
    valueTerritories: ['convenience', 'trust'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['long-term', 'reusable-capability'],
    citations: ['https://help.ebay.com/seller/account/ebay-concierge'],
  },

  {
    id: 'ebay-developers-program',
    valueProp: "eBay Developers Program is eBay's official third-party developer ecosystem — providing API access, sandboxes, documentation, developer forums, and partnership resources for building integrations, tools, and applications on top of the eBay marketplace platform.",
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term', 'reusable-capability'],
    citations: [
      'https://developer.ebay.com',
    ],
  },

  {
    id: 'ebay-mobile-app',
    valueProp: "eBay Mobile App is eBay's primary consumer application for iOS and Android — delivering the full eBay buying and selling experience on smartphones, including listing creation, purchase, Watchlist management, messaging, and order tracking.",
    valueTerritories: ['convenience', 'speed', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'full-funnel', 'long-term'],
    citations: [
      'https://www.ebay.com/app',
    ],
  },

  {
    id: 'ebay-mobile-app-android',
    valueProp: "eBay Mobile App for Android is the Google Play Store version of eBay's consumer application — the primary mobile touchpoint for Android users to buy, sell, and manage their eBay activity.",
    valueTerritories: ['convenience', 'speed'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://play.google.com/store/apps/details?id=com.ebay.mobile'],
  },

  {
    id: 'ebay-selling-app',
    valueProp: "eBay Selling App is the seller-optimized mobile experience for listing items, managing orders, printing labels, and monitoring Seller Hub analytics — a dedicated selling surface separate from the buyer-focused main eBay app.",
    valueTerritories: ['convenience', 'speed', 'value'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term'],
    citations: ['https://www.ebay.com/app/selling'],
  },

  // ── EBAY DEALS & PROMOTIONS PRODUCTS ─────────────────────────────────────

  {
    id: 'ebay-deals',
    valueProp: "eBay Deals is eBay's curated daily deals destination — surfacing hand-picked discounted inventory across categories from verified sellers, giving value-seeking buyers a single destination for the best prices on the platform.",
    valueTerritories: ['value', 'selection', 'convenience'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'full-funnel', 'long-term'],
    citations: [
      'https://www.ebay.com/deals',
    ],
  },

  {
    id: 'daily-deals',
    valueProp: "Daily Deals is eBay's time-limited discount program — deeply discounted items refreshed daily, driving repeat buyer visits and creating urgency through limited-time pricing that rewards early shoppers.",
    valueTerritories: ['value', 'speed', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebay.com/deals'],
  },

  {
    id: 'ebay-exclusive-coupons',
    valueProp: "eBay Exclusive Coupons are platform-issued discount codes distributed to buyers — offering percentage or fixed-dollar discounts on qualifying purchases, used by eBay to drive buyer activation, re-engagement, and category exploration.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['reusable-capability'],
    citations: ['https://help.ebay.com/buyer/coupons'],
  },

  // ── INTERNATIONAL DEAL PROGRAMS ───────────────────────────────────────────

  {
    id: 'ebay-imperdibili',
    valueProp: "eBay Imperdibili (Not-to-Miss Deals) is eBay Italy's flash deal and promotional event brand — curating time-sensitive discounts for Italian buyers across electronics, fashion, and collectibles.",
    valueTerritories: ['value', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebay.it/deals'],
  },

  {
    id: 'ebay-imperdibili-it',
    valueProp: "eBay Imperdibili IT is the Italian-market identifier for eBay's flash deal promotional brand — the same program as eBay Imperdibili, scoped to the ebay.it market.",
    valueTerritories: ['value'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebay.it/deals'],
  },

  {
    id: 'ebay-wow',
    valueProp: "eBay WOW was eBay's time-limited promotional deal format in Germany — a rotating set of sharply discounted items published weekly to drive buyer engagement on ebay.de with surprise pricing.",
    valueTerritories: ['value', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebay.de'],
  },

  {
    id: 'ebay-wow-de',
    valueProp: "eBay WOW DE is the German-market scoped identifier for eBay's WOW deal format — the same promotional brand as eBay WOW, specific to the ebay.de marketplace.",
    valueTerritories: ['value'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebay.de'],
  },

  {
    id: 'bons-plans',
    valueProp: "Bons Plans (Good Deals) is eBay France's deal destination brand — curating discounted inventory for French buyers across categories, the French-market equivalent of eBay Deals.",
    valueTerritories: ['value', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebay.fr/deals'],
  },

  {
    id: 'bons-plans-fr',
    valueProp: "Bons Plans FR is the France-market scoped identifier for eBay's French deal brand, the same promotional destination as Bons Plans, specific to ebay.fr.",
    valueTerritories: ['value'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebay.fr'],
  },

  // ── SELLER REPUTATION & PREMIUM SERVICES ──────────────────────────────────

  {
    id: 'ebay-premium-service-uk',
    valueProp: "eBay Premium Service (UK) is a seller quality designation on ebay.co.uk — awarded to sellers who consistently offer fast dispatch, free returns, and high buyer satisfaction — displayed as a badge on listings to differentiate high-service sellers in UK search results.",
    valueTerritories: ['trust', 'speed', 'convenience'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term'],
    citations: ['https://help.ebay.co.uk/seller/seller-levels/ebay-premium-service'],
  },

  {
    id: 'ebay-top-service-de',
    valueProp: "eBay Top Service (DE) is the German-market equivalent of eBay Premium Service — a seller excellence badge on ebay.de awarded for consistently fast shipping, easy returns, and high buyer satisfaction scores.",
    valueTerritories: ['trust', 'speed', 'convenience'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term'],
    citations: ['https://help.ebay.de/seller/seller-levels/ebay-top-service'],
  },

  // ── SUSTAINABILITY & CIRCULAR ECONOMY ────────────────────────────────────

  {
    id: 'pre-loved-partner-program',
    valueProp: "Pre-Loved Partner Program is eBay's certified resale partner initiative for pre-owned fashion — enabling vetted fashion brands and retailers to sell authenticated second-hand inventory through branded eBay storefronts, establishing eBay as the premier destination for circular fashion.",
    valueTerritories: ['trust', 'selection', 'transparency'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'long-term'],
    citations: ['https://www.ebay.co.uk/preloved'],
  },

  {
    id: 'preloved-partner-program',
    valueProp: "Preloved Partner Program is the alternate spelling/identifier for eBay's Pre-Loved Partner Program — the certified resale initiative connecting fashion brands and authenticated pre-owned fashion with eBay buyers.",
    valueTerritories: ['trust', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'long-term'],
    citations: ['https://www.ebay.co.uk/preloved'],
  },

  {
    id: 'pre-loved-fashion-week',
    valueProp: "Pre-Loved Fashion Week is eBay's promotional event celebrating circular fashion — a week-long campaign spotlighting pre-owned designer items, sustainability messaging, and exclusive deals that coincides with fashion season calendars to capture fashion-conscious buyers.",
    valueTerritories: ['community', 'selection', 'value'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['one-off'],
    citations: ['https://www.ebay.co.uk/preloved'],
  },

  {
    id: 'circular-fashion-fund',
    valueProp: "Circular Fashion Fund is eBay's investment and grant program supporting sustainable fashion startups and innovation in clothing resale, repair, and recycling — establishing eBay as a corporate leader in fashion circularity beyond just marketplace transactions.",
    valueTerritories: ['community', 'transparency'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['long-term'],
    citations: ['https://www.ebayinc.com/impact/environment/'],
  },

  {
    id: 'circular-fashion-innovator-of-the-year',
    valueProp: "Circular Fashion Innovator of the Year is eBay's annual award recognizing a brand or individual advancing sustainable fashion — a PR and ecosystem-building initiative that amplifies eBay's circular fashion positioning.",
    valueTerritories: ['community', 'transparency'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['one-off'],
    citations: ['https://www.ebayinc.com/impact/environment/'],
  },

  {
    id: 'certified-recycled',
    valueProp: "Certified Recycled is eBay's item condition and sustainability designation for products made from recycled materials or refurbished components — signaling environmental credentials to eco-conscious buyers.",
    valueTerritories: ['transparency', 'trust'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/deals/refurbished'],
  },

  {
    id: 'certified-recycled-program',
    valueProp: "Certified Recycled Program is the formal initiative behind eBay's certified recycled designation — setting standards for which items qualify as certified recycled and partnering with verified recyclers to supply that inventory on eBay.",
    valueTerritories: ['transparency', 'community'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['long-term'],
    citations: ['https://www.ebay.com/deals/refurbished'],
  },

  {
    id: 'certified-recycler-program',
    valueProp: "Certified Recycler Program is the seller-side certification within eBay's recycled goods initiative — qualifying professional recyclers and refurbishers to list under the certified recycled designation on eBay.",
    valueTerritories: ['trust', 'transparency'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['long-term'],
    citations: ['https://www.ebay.com/deals/refurbished'],
  },

  // ── BUYER PROGRAMS & LOYALTY ──────────────────────────────────────────────

  {
    id: 'ebay-ambassador',
    valueProp: "eBay Ambassador is eBay's community advocate program — recognizing influential buyers, sellers, and collectors who promote eBay within their communities, categories, and social platforms in exchange for access, recognition, and early program previews.",
    valueTerritories: ['community', 'trust'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['reusable-capability'],
    citations: ['https://community.ebay.com'],
  },

  {
    id: 'my-ebay',
    valueProp: "My eBay is the buyer-side account hub on eBay — the central dashboard where buyers track purchases, manage Watchlist, view offer history, access saved searches, and review feedback — the primary account management surface for registered eBay buyers.",
    valueTerritories: ['convenience', 'transparency'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'long-term', 'reusable-capability'],
    citations: ['https://www.ebay.com/myb/Summary'],
  },

  {
    id: 'my-ebay-summary',
    valueProp: "My eBay Summary is the landing view of My eBay — an at-a-glance dashboard showing recent purchases, active bids, items watching, and saved searches for quick buyer situational awareness.",
    valueTerritories: ['convenience', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/myb/Summary'],
  },

  {
    id: 'watchlist',
    valueProp: "Watchlist is eBay's buyer save-for-later feature — enabling shoppers to follow listings they're interested in, receive price drop and ending-soon notifications, and return to complete a purchase — one of eBay's oldest and most-used buyer engagement features.",
    valueTerritories: ['convenience', 'transparency'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'long-term', 'reusable-capability'],
    citations: ['https://www.ebay.com/myb/WatchList'],
  },

  {
    id: 'watch-list',
    valueProp: "Watch List is the legacy/alternate name for eBay's Watchlist — the buyer feature for saving and following listings of interest, now unified under the 'Watchlist' label across most surfaces.",
    valueTerritories: ['convenience', 'transparency'],
    nameClass: 'Product Name',
    isProductName: false,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebay.com/myb/WatchList'],
  },

  {
    id: 'watching',
    valueProp: "Watching is the action state indicating a buyer has added a listing to their Watchlist — the in-listing UI confirmation that a buyer is tracking the item for potential future purchase.",
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/myb/WatchList'],
  },

  {
    id: 'items-watched',
    valueProp: "Items Watched is the count or view of all items currently on a buyer's Watchlist — a personalized inventory of tracked listings accessible from My eBay.",
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/myb/WatchList'],
  },

  {
    id: 'saved-searches',
    valueProp: "Saved Searches allows buyers to store their search queries and receive email or push notifications when new matching listings appear — enabling passive deal hunting for buyers looking for specific items without checking eBay manually.",
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/myb/SavedSearches'],
  },

  {
    id: 'saved-sellers',
    valueProp: "Saved Sellers lets buyers follow their favorite eBay sellers — receiving updates when those sellers list new items and maintaining a curated list of trusted sources within My eBay.",
    valueTerritories: ['convenience', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/myb/SavedSellers'],
  },

  {
    id: 'saved-seller',
    valueProp: "Saved Seller is the singular state indicating a buyer has added a specific seller to their saved sellers list — the per-seller follow relationship within My eBay.",
    valueTerritories: ['convenience', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/myb/SavedSellers'],
  },

  {
    id: 'purchase-history',
    valueProp: "Purchase History is the My eBay view showing all past completed purchases — giving buyers a searchable record of everything they've bought on eBay for returns, re-ordering, feedback, and reference purposes.",
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/myb/PurchaseHistory'],
  },

  {
    id: 'my-collection',
    valueProp: "My Collection is eBay's collectibles portfolio feature — allowing collectors to catalog, value, and track their personal collections of trading cards, comics, coins, or other collectibles using eBay's market data and price guides.",
    valueTerritories: ['community', 'transparency'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/mycollection'],
  },

  // ── BUSINESS SUPPLY & B2B ─────────────────────────────────────────────────

  {
    id: 'ebay-business-supply',
    valueProp: "eBay Business Supply is eBay's B2B purchasing program — enabling businesses to buy industrial supplies, tools, and equipment through business accounts with tax exemption documentation, account-level pricing, and bulk order capabilities.",
    valueTerritories: ['value', 'selection', 'convenience'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['multi-market', 'long-term'],
    citations: ['https://www.ebay.com/businesssupply'],
  },

  // ── LEGACY & RETIRED eBay PRODUCTS ───────────────────────────────────────

  {
    id: 'ebay-university',
    valueProp: "eBay University was eBay's in-person seller education program — offering workshops, seminars, and events to teach sellers how to list effectively and grow their business. Retired as digital education through eBay Academy replaced in-person formats.",
    valueTerritories: ['community', 'transparency'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebay.com/academy'],
  },

  {
    id: 'ebay-radio',
    valueProp: "eBay Radio was eBay's internet talk radio show and podcast — a long-running seller education broadcast featuring eBay staff, expert guests, and seller Q&A sessions. Discontinued as the format evolved into podcasts and online video.",
    valueTerritories: ['community', 'transparency'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ecommercebytes.com/cab/asc/ascx.pl'],
  },

  {
    id: 'ebay-valet',
    valueProp: "eBay Valet was eBay's full-service consignment program — sellers shipped items to eBay, who photographed, listed, sold, and shipped them on the seller's behalf for a commission. Discontinued in 2018 as the cost model proved unsustainable at scale.",
    valueTerritories: ['convenience', 'value'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebay.com/valet'],
  },

  {
    id: 'ebay-valet-original',
    valueProp: "eBay Valet Original is the legacy identifier for eBay's original consignment/valet service — the full-service selling program discontinued in 2018 where eBay managed the entire sell-through process on behalf of the owner.",
    valueTerritories: ['convenience'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebay.com/valet'],
  },

  {
    id: 'ebay-rachat',
    valueProp: "eBay Rachat (Trade-In) is eBay France's trade-in and recommerce program — enabling French consumers to sell back used electronics and receive value for their old devices directly through eBay's French marketplace.",
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebay.fr/rachat'],
  },

  {
    id: 'consommation-raisonnee',
    valueProp: "Consommation Raisonnée (Responsible Consumption) is eBay France's sustainability messaging campaign — promoting the environmental and economic benefits of buying and selling pre-owned items through eBay as a form of conscious consumption.",
    valueTerritories: ['community', 'transparency'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['one-off'],
    citations: ['https://www.ebay.fr'],
  },

  {
    id: 'ebay-collection-points-uk',
    valueProp: "eBay Collection Points UK is eBay's network of parcel pickup locations in the United Kingdom — enabling buyers to collect eBay purchases at convenient local collection points rather than waiting for home delivery.",
    valueTerritories: ['convenience', 'speed'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://help.ebay.co.uk/buyer/buying/collection-points'],
  },

  {
    id: 'about-me',
    valueProp: "About Me is eBay's seller profile page feature — a customizable personal page where sellers and collectors introduce themselves, share their passion or specialty, and build credibility with buyers beyond just their feedback score.",
    valueTerritories: ['community', 'trust'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/aboutme'],
  },

  // ── TRADING CARDS ECOSYSTEM ───────────────────────────────────────────────

  {
    id: 'trading-card-hub',
    valueProp: "Trading Card Hub is eBay's dedicated destination for trading card buyers and sellers — a curated category experience featuring authentication, Vault storage, price guides, graded card filters, and news tailored to the trading card collector community.",
    valueTerritories: ['community', 'trust', 'transparency', 'selection'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'multi-market', 'long-term'],
    citations: ['https://www.ebay.com/tradingcards'],
  },

  {
    id: 'collectibles-price-guide',
    valueProp: "Collectibles Price Guide is eBay's market-data tool for collectibles — providing historical sale prices, current value ranges, and demand trends for trading cards, comics, coins, and memorabilia based on real completed eBay transactions.",
    valueTerritories: ['transparency', 'community'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/tradingcards/price-guide'],
  },

]
