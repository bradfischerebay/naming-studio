// eBay Naming Graph - Wave 3 Batch M - 50 NEW Enriched Programs
// Generated: 2026-04-17
// Source: translations.ts + Research-Session-Complete-2026-04-17.md
// Export: ENRICHED_WAVE3_M

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

export const ENRICHED_WAVE3_M: GraphNode[] = [
  {
    "id": "certified-open-box",
    "name": "Certified Open Box",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "refurbished",
    "desc": "US-only condition certification for open-box items that meet quality standards, launched May 2025 as expansion of eBay Refurbished program.",
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
    "desc": "US automotive parts compatibility guarantee providing free returns for parts that don't fit specified vehicle, launched October 2025 as Fitment Plus Auto.",
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
    "id": "vehicle-purchase-protection",
    "name": "Vehicle Purchase Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "ebay-motors",
    "desc": "Protection program for vehicle purchases available in US and Canada, covering eligible transactions with inspection and dispute resolution.",
    "market": ["US", "CA"],
    "year": 2018
  },
  {
    "id": "business-equipment-purchase-protection",
    "name": "Business Equipment Purchase Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "US-only protection program for business and industrial equipment purchases, providing coverage beyond standard Money Back Guarantee.",
    "market": "US",
    "year": 2019
  },
  {
    "id": "buyer-protection",
    "name": "Buyer Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "UK-specific buyer protection program ensuring purchase coverage, operating alongside Money Back Guarantee with regional policy variations.",
    "market": "UK",
    "year": 2010
  },
  {
    "id": "issue-resolution-center",
    "name": "Issue Resolution Center",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "support",
    "desc": "US platform for managing transaction disputes, claims, and issue resolution between buyers and sellers.",
    "market": "US",
    "year": 2015
  },
  {
    "id": "certified-recycled",
    "name": "Certified Recycled",
    "type": "impact",
    "tier": "program",
    "status": "current",
    "parent": "impact",
    "desc": "UK certification program for items made from certified recycled materials, supporting circular economy initiatives.",
    "market": "UK",
    "year": 2023
  },
  {
    "id": "ebay-fulfilment",
    "name": "eBay Fulfilment",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "UK/DE fulfillment service operated by Orange Connex, providing warehousing and shipping for sellers.",
    "market": ["UK", "DE"],
    "year": 2022
  },
  {
    "id": "ebay-international-standard-delivery",
    "name": "eBay International Standard Delivery",
    "type": "category",
    "tier": "program",
    "status": "legacy",
    "parent": "shipping",
    "desc": "US international shipping program deprecated July 2023, replaced by eBay International Shipping (eIS).",
    "market": "US",
    "year": 2015,
    "renamedTo": "ebay-international-shipping"
  },
  {
    "id": "simple-delivery",
    "name": "Simple Delivery",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "UK mandatory C2C shipping program providing simplified delivery options with standardized pricing and handling.",
    "market": "UK",
    "year": 2023
  },
  {
    "id": "managed-delivery",
    "name": "Managed Delivery",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "US delivery management service providing end-to-end logistics coordination for eligible categories.",
    "market": "US",
    "year": 2022
  },
  {
    "id": "logistica-ebay-by-orange-connex",
    "name": "Logistica eBay by Orange Connex",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "Italy-specific fulfillment service operated by Orange Connex, providing warehousing and shipping for Italian sellers.",
    "market": "IT",
    "year": 2022
  },
  {
    "id": "ebay-collection-points",
    "name": "eBay Collection Points",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "UK/AU network of pickup locations where buyers can collect purchases, integrated with Click & Collect infrastructure.",
    "market": ["UK", "AU"],
    "year": 2020
  },
  {
    "id": "in-store-pickup",
    "name": "In-Store Pickup",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "US local pickup option allowing buyers to collect items from seller's physical retail location.",
    "market": "US",
    "year": 2018
  },
  {
    "id": "shipping-labels",
    "name": "Shipping Labels",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Integrated label printing service with discounted carrier rates available globally (US/UK called 'labels', AU/UK 'postage labels').",
    "market": "global",
    "year": 2010
  },
  {
    "id": "image-search",
    "name": "Image Search",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "search",
    "desc": "Visual search allowing buyers to find items using photos instead of text, available in US, UK, CA, AU markets.",
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
    "desc": "Mobile app feature enabling product discovery through camera-based search, available in US, UK, CA, AU.",
    "market": ["US", "UK", "CA", "AU"],
    "year": 2019
  },
  {
    "id": "shop-by-category",
    "name": "Shop by Category",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Primary navigation structure organizing items into hierarchical categories for browsing (DE: Stöbern in Kategorien, FR: Explorer par catégorie).",
    "market": "global",
    "year": 1995
  },
  {
    "id": "saved-searches",
    "name": "Saved Searches",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Feature allowing buyers to save search queries and receive notifications for new matching listings.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "recently-viewed",
    "name": "Recently Viewed",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Personalized section showing buyers their browsing history for easy item re-discovery.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "price-guide",
    "name": "Price Guide",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "collectibles",
    "desc": "US collectibles pricing reference tool providing market value insights based on historical sales data.",
    "market": "US",
    "year": 2020
  },
  {
    "id": "trading-card-hub",
    "name": "Trading Card Hub",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "collectibles",
    "desc": "US dedicated marketplace for trading cards with specialized tools, PSA integration, and authentication services.",
    "market": "US",
    "year": 2021
  },
  {
    "id": "tcgplayer",
    "name": "TCGplayer",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "collectibles",
    "desc": "Trading card marketplace partnership available in US, UK, CA providing pricing data and grading integration.",
    "market": ["US", "UK", "CA"],
    "year": 2022
  },
  {
    "id": "ebay-standard-envelope",
    "name": "eBay Standard Envelope",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "US-only economical shipping option for small collectibles like trading cards with tracking under $20 value.",
    "market": "US",
    "year": 2021
  },
  {
    "id": "ebay-guaranteed-delivery",
    "name": "eBay Guaranteed Delivery",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "shipping",
    "desc": "Guaranteed delivery date program available in US, UK, CA ensuring items arrive by specified date or buyer receives shipping refund.",
    "market": ["US", "UK", "CA"],
    "year": 2018
  },
  {
    "id": "export-academy",
    "name": "Export Academy",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "education",
    "desc": "Global educational program teaching sellers international selling best practices, shipping, and compliance.",
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
    "desc": "Global forums and discussion boards where buyers and sellers connect, share knowledge, and get peer support.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "feedback-forum",
    "name": "Feedback Forum",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "support",
    "desc": "Community forum area for discussing feedback-related topics, available in US, UK, CA, AU markets.",
    "market": ["US", "UK", "CA", "AU"],
    "year": 2001
  },
  {
    "id": "ebay-university",
    "name": "eBay University",
    "type": "category",
    "tier": "program",
    "status": "legacy",
    "parent": "education",
    "desc": "US seller education program offering workshops and certification, largely replaced by eBay Academy.",
    "market": "US",
    "year": 2005,
    "renamedTo": "ebay-academy"
  },
  {
    "id": "make-an-offer",
    "name": "Make An Offer",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Buyer-initiated negotiation feature enabling offers on listings with Best Offer enabled (DE: Preisvorschlag senden, FR: Faire une offre).",
    "market": "global",
    "year": 2005
  },
  {
    "id": "store-tier-starter",
    "name": "Starter Store",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "Entry-level eBay Store subscription tier available in US and AU markets (AU branded as 'Pro Starter').",
    "market": ["US", "AU"],
    "year": 2015
  },
  {
    "id": "store-tier-enterprise",
    "name": "Enterprise Store",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "Highest-tier US eBay Store subscription for large-volume sellers with maximum listing allowances and lowest fees.",
    "market": "US",
    "year": 2018
  },
  {
    "id": "store-tier-platin",
    "name": "Platin-Shop",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "Germany-exclusive top-tier eBay Store subscription (Platin-Shop) offering premium features and lowest fees.",
    "market": "DE",
    "year": 2016
  },
  {
    "id": "store-tier-premium-plus",
    "name": "Negozio Premium Plus",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "Italy-exclusive enhanced Premium store tier (Negozio Premium Plus) with additional benefits beyond standard Premium.",
    "market": "IT",
    "year": 2019
  },
  {
    "id": "store-newsletters",
    "name": "Store Newsletters",
    "type": "advertising",
    "tier": "feature",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "Email marketing tool allowing Store subscribers to send newsletters to followers (UK/AU: 'Shop newsletter').",
    "market": "global",
    "year": 2010
  },
  {
    "id": "ai-banner",
    "name": "AI Banner",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "AI-powered store banner generator launched 2024, creating branded visuals automatically for eBay Stores.",
    "market": "global",
    "year": 2024
  },
  {
    "id": "order-discounts",
    "name": "Order Discounts",
    "type": "advertising",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Volume discount feature offering reduced prices based on order value or item quantity (DE: Mengenrabatte, FR: Réduction sur la commande).",
    "market": "global",
    "year": 2017
  },
  {
    "id": "sale-events",
    "name": "Sale Events",
    "type": "advertising",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Time-limited promotional sales creation tool within Discounts Manager (DE: Sonderaktion, FR: Événement promotionnel).",
    "market": "global",
    "year": 2017
  },
  {
    "id": "coupons",
    "name": "Coupons",
    "type": "advertising",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Coded coupon creation tool for offering targeted discounts to buyers (DE: Gutscheincodes, FR: Bon de réduction, IT: Coupon).",
    "market": "global",
    "year": 2018
  },
  {
    "id": "volume-pricing",
    "name": "Volume Pricing",
    "type": "advertising",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Multi-quantity discount offering (UK: Multi-Buy, DE: Multi-Rabatt) encouraging bulk purchases with tiered pricing.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "offers-to-buyers",
    "name": "Offers to Buyers",
    "type": "advertising",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Seller-initiated private discount offers sent to targeted buyer segments (DE: Preisvorschläge an Käufer senden).",
    "market": "global",
    "year": 2015
  },
  {
    "id": "shipping-discounts",
    "name": "Shipping Discounts",
    "type": "advertising",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Promotional shipping discount creation tool (free/reduced shipping) within Discounts Manager.",
    "market": "global",
    "year": 2017
  },
  {
    "id": "coded-coupons",
    "name": "Coded Coupons",
    "type": "advertising",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Unique code-based discount coupons for sharing on external channels (DE: Gutscheincodes, FR: Bons de réduction avec code).",
    "market": "global",
    "year": 2018
  },
  {
    "id": "markdown-manager",
    "name": "Markdown Manager",
    "type": "advertising",
    "tier": "program",
    "status": "legacy",
    "parent": "discounts-manager",
    "desc": "Automated price reduction tool for aging inventory, merged into Promotions Manager in 2024.",
    "market": ["US", "UK", "CA", "AU"],
    "year": 2019,
    "renamedTo": "promotions-manager"
  },
  {
    "id": "seller-initiated-offers",
    "name": "Seller Initiated Offers",
    "type": "advertising",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Private discount offers sent by sellers to interested buyers, watchlist users, or previous customers.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "send-coupon",
    "name": "Send Coupon",
    "type": "advertising",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Direct coupon delivery tool for sending discount codes to buyer segments (DE: Gutschein senden, FR: Envoyer un code promo).",
    "market": "global",
    "year": 2020
  },
  {
    "id": "print-coupons",
    "name": "Print Coupons",
    "type": "advertising",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Physical coupon generation tool for in-store promotions or package inserts (DE: Gutschein drucken).",
    "market": "global",
    "year": 2020
  },
  {
    "id": "buyer-groups",
    "name": "Buyer Groups",
    "type": "advertising",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Customer segmentation tool creating targeted groups for personalized offers (DE: Käufergruppen, FR: Groupes d'acheteurs).",
    "market": "global",
    "year": 2021
  },
  {
    "id": "store-email-campaigns",
    "name": "Store Email Campaigns",
    "type": "advertising",
    "tier": "feature",
    "status": "current",
    "parent": "ebay-stores",
    "desc": "Email marketing platform for Store subscribers (US/CA/AU: Email Marketing for Sellers, UK: Email Marketing).",
    "market": "global",
    "year": 2019
  }
]
