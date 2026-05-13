// eBay Naming Graph — Enrichment V2: Payments & Shipping Cluster
// Batch: 02 | Date: 2026-04-28 | Source: Confluence wiki.corp.ebay.com + help.ebay.com + Glean
// Cluster: All nodes under payments-checkout, shipping-logistics, managed-payments umbrellas
// See enriched-v2-batch-01-trust.ts for interface definition and taxonomy

import type { NodeEnrichmentV2 } from './enriched-v2-batch-01-trust'

export const PAYMENTS_SHIPPING_ENRICHMENT: NodeEnrichmentV2[] = [
  {
    id: "1-day-handling",
    valueProp: "A seller's commitment to ship within one business day of payment — the fastest handling tier, rewarded with search boost and a delivery confidence badge.",
    valueTerritories: ["speed", "trust", "transparency"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361252-Shipping-and-handling-time"]
  },
  {
    id: "australia-post-express",
    valueProp: "Premium Australian shipping delivering within 1–2 business days to metro areas, with eBay label discounts and full tracking — the fastest domestic option for AU sellers.",
    valueTerritories: ["speed", "convenience"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.com.au/hc/en-au/articles (Australia Post integration)"]
  },
  {
    id: "calculated-shipping",
    valueProp: "A dynamic shipping cost tool that auto-calculates the buyer's exact shipping price based on their ZIP code, package dimensions, and carrier rates — eliminating guesswork for both sides.",
    valueTerritories: ["transparency", "convenience", "value"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361272-Calculated-shipping"]
  },
  {
    id: "canada-post-expedited",
    valueProp: "Canadian mid-tier shipping with 2–5 day delivery, tracking, and insurance — with eBay-negotiated discounts that make expedited shipping accessible for CA sellers.",
    valueTerritories: ["speed", "convenience"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.ca/hc/en-ca/articles (Canada Post integration)"]
  },
  {
    id: "cart-total",
    valueProp: "Real-time order summary showing item price, shipping, tax, and discounts in a mobile-sticky format — giving buyers a clear, no-surprises view of what they'll pay before committing.",
    valueTerritories: ["transparency", "convenience"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361572-Shopping-cart"]
  },
  {
    id: "checkout",
    valueProp: "The streamlined end-to-end payment and shipping confirmation flow integrated with Managed Payments — where buyers complete purchases with minimal friction.",
    valueTerritories: ["convenience", "speed", "trust"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market", "reusable-capability", "long-term"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361572"]
  },
  {
    id: "click-and-collect",
    valueProp: "Buy online, pick up at a designated retail or collection point — giving buyers who prefer not to wait at home a convenient local pickup alternative to home delivery.",
    valueTerritories: ["convenience", "speed"],
    nameClass: "Feature Name",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.co.uk/hc/en-gb/articles/360022364774-Click-and-Collect"]
  },
  {
    id: "click-collect",
    valueProp: "eBay's retail pickup program at designated collection points — the program-level version of click-and-collect enabling local inventory access without home delivery.",
    valueTerritories: ["convenience", "speed"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["multi-market", "long-term"],
    citations: ["https://wiki.corp.ebay.com (click & collect program documentation)"]
  },
  {
    id: "combined-checkout",
    valueProp: "A single checkout flow for multiple purchases from the same seller — reducing friction and payment steps when buying more than one item at once.",
    valueTerritories: ["convenience", "value", "speed"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361572"]
  },
  {
    id: "combined-shipping",
    valueProp: "Consolidated shipping for multiple purchases from the same seller — reducing total shipping cost by combining items into a single package.",
    valueTerritories: ["value", "convenience"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361292-Combined-shipping"]
  },
  {
    id: "combined-shipping-discount",
    valueProp: "Seller-configured discount that automatically reduces shipping cost when a buyer purchases multiple items — incentivizing basket-building and rewarding loyal shoppers.",
    valueTerritories: ["value", "convenience"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361292"]
  },
  {
    id: "delivered",
    valueProp: "The final tracking status — confirmed package receipt with timestamp and location — closing the loop on the buyer's delivery experience.",
    valueTerritories: ["transparency", "trust"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029364092-Tracking-your-item"]
  },
  {
    id: "delivery-exception",
    valueProp: "A proactive alert when a package hits a delivery issue — incorrect address, refused delivery, attempted delivery — giving buyers and sellers time to intervene before the package is lost.",
    valueTerritories: ["transparency", "protection", "speed"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029364092"]
  },
  {
    id: "dhl-paket",
    valueProp: "Germany's primary parcel service integrated with eBay for discounted label printing, door-to-door tracking, and Packstation drop-off — the default shipping choice for DE sellers.",
    valueTerritories: ["convenience", "speed"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.de/hc/de-de/articles (DHL integration)"]
  },
  {
    id: "ebay-collection-points",
    valueProp: "A network of retail locations where buyers can pick up eBay purchases — removing the need to be home during delivery and making eBay accessible in convenience-store proximity.",
    valueTerritories: ["convenience", "speed"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["multi-market", "long-term"],
    citations: ["https://help.ebay.com (eBay collection network)"]
  },
  {
    id: "ebay-export",
    valueProp: "Trade compliance and export documentation management for sellers shipping goods internationally — simplifying the paperwork burden of cross-border commerce.",
    valueTerritories: ["convenience", "transparency"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://wiki.corp.ebay.com (eBay Export program docs)"]
  },
  {
    id: "ebay-fulfilment",
    valueProp: "eBay-managed warehouse, packing, and shipping services — letting sellers outsource logistics entirely and focus on sourcing while eBay handles fulfillment.",
    valueTerritories: ["convenience", "speed", "value"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["multi-market", "long-term", "reusable-capability"],
    citations: ["https://help.ebay.com (eBay Fulfilment by Orange Connex)"]
  },
  {
    id: "ebay-fulfilment-uk",
    valueProp: "UK-specific managed fulfillment with warehouse storage and eBay-handled packing and shipping — giving UK sellers a hands-off logistics solution backed by eBay.",
    valueTerritories: ["convenience", "speed", "value"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["multi-market", "long-term"],
    citations: ["https://help.ebay.co.uk/hc/en-gb/articles (eBay Fulfilment UK)"]
  },
  {
    id: "ebay-guaranteed-delivery",
    valueProp: "A guaranteed delivery date promise — if the item doesn't arrive by the shown date, buyers get their shipping refunded and return shipping covered, no questions asked.",
    valueTerritories: ["protection", "speed", "trust"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "multi-market", "long-term"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360022367434-eBay-Guaranteed-Delivery"]
  },
  {
    id: "ebay-international-shipping",
    valueProp: "eBay's managed international shipping service for US and Canadian sellers — replacing the Global Shipping Program in July 2023 with simpler pricing, broader destination coverage, and end-to-end tracking.",
    valueTerritories: ["convenience", "speed", "value", "selection"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "multi-market", "full-funnel", "long-term", "reusable-capability"],
    citations: [
      "https://help.ebay.com/hc/en-us/articles/4406196538004-eBay-International-Shipping",
      "https://wiki.corp.ebay.com (eIS program docs, July 2023 launch)"
    ]
  },
  {
    id: "ebay-international-standard-delivery",
    valueProp: "A legacy international shipping label program that has been deprecated in favor of eBay International Shipping since July 2023.",
    valueTerritories: ["convenience"],
    nameClass: "Legacy Residue",
    isProductName: false,
    strategicRole: ["lifecycle-managed"],
    citations: ["https://wiki.corp.ebay.com (deprecated July 2023 with eIS launch)"]
  },
  {
    id: "ebay-speedpak",
    valueProp: "A shipping program enabling German sellers and China-based merchants to offer internationally competitive shipping rates to European buyers — launched January 2026 with carrier discounts.",
    valueTerritories: ["value", "speed", "convenience"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["multi-market", "long-term"],
    citations: ["https://wiki.corp.ebay.com (eBay SpeedPAK launch docs, January 2026)"]
  },
  {
    id: "ebay-standard-envelope",
    valueProp: "Low-cost tracked shipping for small, lightweight items like trading cards — giving collectibles sellers a tracked option at a fraction of standard parcel rates (US only).",
    valueTerritories: ["value", "speed", "convenience"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term"],
    citations: ["https://help.ebay.com/hc/en-us/articles/4405862264980-eBay-Standard-Envelope"]
  },
  {
    id: "estimated-delivery",
    valueProp: "A calculated arrival date range shown at listing and checkout — setting clear expectations so buyers know when to expect their purchase before they commit.",
    valueTerritories: ["transparency", "trust", "convenience"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360022367434"]
  },
  {
    id: "expedited-international-shipping",
    valueProp: "Premium cross-border shipping with 6–10 business day delivery via major carriers — including tracking, import charge prepayment, and guaranteed customs clearance.",
    valueTerritories: ["speed", "transparency", "convenience"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361392-Shipping-internationally"]
  },
  {
    id: "fast-and-free",
    valueProp: "A combined shipping badge signaling both fast delivery and zero shipping cost — one of the highest-conversion listing signals in eBay's search results.",
    valueTerritories: ["speed", "value", "convenience"],
    nameClass: "Feature Name",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361252"]
  },
  {
    id: "fast-n-free",
    valueProp: "The original brand for fast free delivery — now being migrated to specific day-count badges (Free 2-day, 3-day, 4-day) for clearer buyer expectations.",
    valueTerritories: ["speed", "value"],
    nameClass: "Legacy Residue",
    isProductName: false,
    strategicRole: ["lifecycle-managed"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361252"]
  },
  {
    id: "flat-rate-shipping",
    valueProp: "A fixed shipping charge applied equally to all domestic buyers regardless of location — simplifying seller pricing and giving buyers upfront shipping cost certainty.",
    valueTerritories: ["transparency", "value", "convenience"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361272"]
  },
  {
    id: "form-1099-k",
    valueProp: "US IRS tax form for sellers receiving payments through third-party networks — eBay issues this automatically to sellers meeting reporting thresholds.",
    valueTerritories: ["transparency"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/4406206524820-1099-K-tax-form"]
  },
  {
    id: "form-1099-k-us",
    valueProp: "Automated annual tax reporting for US sellers exceeding IRS thresholds ($600+ GMV as of 2024) — downloadable directly from Seller Hub.",
    valueTerritories: ["transparency"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/4406206524820"]
  },
  {
    id: "free-2-day-shipping",
    valueProp: "A listing badge for items with free 2-day delivery — replacing Fast 'N Free with specific, credible delivery commitments that buyers can rely on.",
    valueTerritories: ["speed", "value", "trust"],
    nameClass: "Feature Name",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361252"]
  },
  {
    id: "free-2-day-shipping-us",
    valueProp: "US-specific badge for listings with free 2-day delivery — seller commits to dispatch within 1 business day, earning a prominent search badge and conversion boost.",
    valueTerritories: ["speed", "value", "trust"],
    nameClass: "Feature Name",
    isProductName: false,
    strategicRole: ["high-visibility", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361252"]
  },
  {
    id: "free-3-day-shipping",
    valueProp: "Listing badge for items delivering free within 3 days — a mid-tier fast shipping signal balancing seller handling capacity with buyer delivery expectations.",
    valueTerritories: ["speed", "value"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361252"]
  },
  {
    id: "free-4-day-shipping",
    valueProp: "Listing badge for items delivering free within 4 days — balancing delivery speed expectations with ground shipping economics.",
    valueTerritories: ["speed", "value"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361252"]
  },
  {
    id: "free-4-day-shipping-us",
    valueProp: "US budget expedited shipping badge for items arriving in 4 days at no cost — the practical free shipping tier for sellers using ground services.",
    valueTerritories: ["speed", "value"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361252"]
  },
  {
    id: "free-shipping",
    valueProp: "The baseline commitment to absorb shipping cost — one of the most powerful conversion signals in eBay search, consistently correlating with higher buy rates.",
    valueTerritories: ["value", "convenience", "trust"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361272"]
  },
  {
    id: "free-shipping-badge",
    valueProp: "The prominent visual indicator on search results and listing pages highlighting zero-cost delivery — a proven buyer conversion trigger displayed across all eBay surfaces.",
    valueTerritories: ["value", "transparency", "convenience"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361272"]
  },
  {
    id: "free-shipping-threshold",
    valueProp: "A seller promotion that unlocks free shipping once the cart reaches a set amount — incentivizing basket-building while offering buyers a clear path to cost savings.",
    valueTerritories: ["value", "convenience"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361292"]
  },
  {
    id: "freight-shipping",
    valueProp: "Specialized pallet or truck delivery for large, heavy items requiring liftgate service — enabling eBay to serve industrial, furniture, and heavy equipment categories.",
    valueTerritories: ["convenience", "selection"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361392-Freight-shipping"]
  },
  {
    id: "global-shipping-program",
    valueProp: "eBay's original cross-border shipping solution (2013–2023) that handled customs, duties, and international logistics — the foundational program that made eBay a global marketplace before being replaced by eBay International Shipping.",
    valueTerritories: ["convenience", "selection"],
    nameClass: "Legacy Residue",
    isProductName: false,
    strategicRole: ["lifecycle-managed"],
    citations: [
      "https://help.ebay.com/hc/en-us/articles/360029361392",
      "Retired July 2023 — replaced by eBay International Shipping"
    ]
  },
  {
    id: "global-shipping-toggle",
    valueProp: "Seller listing setting that enables or disables international shipping per item — auto-calculating duties and displaying total international landed cost at checkout.",
    valueTerritories: ["convenience", "transparency"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361392"]
  },
  {
    id: "go-to-checkout",
    valueProp: "The primary cart call-to-action that moves buyers from selection to payment — one of the highest-stakes UI moments in the entire purchase funnel.",
    valueTerritories: ["convenience", "speed"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361572"]
  },
  {
    id: "gst-collection-australia",
    valueProp: "Automated Australian GST collection for sales over $1,000 AUD — eBay acts as the registered tax agent, removing compliance burden from AU sellers.",
    valueTerritories: ["transparency", "convenience"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.com.au/hc/en-au/articles (GST compliance)"]
  },
  {
    id: "guaranteed-delivery",
    valueProp: "Seasonal delivery date guarantee (October–December) showing buyers the exact arrival date before purchase — with shipping refund if the item doesn't arrive on time.",
    valueTerritories: ["trust", "speed", "protection"],
    nameClass: "Feature Name",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360022367434"]
  },
  {
    id: "guest-checkout",
    valueProp: "Purchase without creating an eBay account — reducing friction for first-time buyers who aren't ready to commit to registration.",
    valueTerritories: ["convenience", "speed"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361572"]
  },
  {
    id: "handling-time",
    valueProp: "The seller's committed window between payment and shipment — the primary input to estimated delivery dates and a key factor in search ranking.",
    valueTerritories: ["speed", "transparency", "trust"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361252"]
  },
  {
    id: "hermes-paketshop",
    valueProp: "Germany's largest parcel shop network with 15,000+ retail drop-off locations — giving DE sellers convenient neighborhood shipping access without needing a post office.",
    valueTerritories: ["convenience", "speed"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.de/hc/de-de/articles (Hermes integration)"]
  },
  {
    id: "import-charges",
    valueProp: "Customs duties, VAT, and import taxes prepaid at checkout for international orders — eBay calculates and collects these upfront so buyers face no surprise charges at delivery.",
    valueTerritories: ["transparency", "protection", "convenience"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361392"]
  },
  {
    id: "in-store-pickup",
    valueProp: "Option to collect a purchase directly from the seller's retail location — bridging online browsing with in-person fulfillment for local sellers.",
    valueTerritories: ["convenience", "speed"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361352-Local-pickup"]
  },
  {
    id: "in-transit",
    valueProp: "Active tracking status confirming the package has been scanned by the carrier and is moving through the delivery network toward the buyer.",
    valueTerritories: ["transparency", "trust"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029364092"]
  },
  {
    id: "international-standard-delivery",
    valueProp: "Legacy international shipping label program deprecated in July 2023 when eBay International Shipping launched — listed for catalog completeness.",
    valueTerritories: ["convenience"],
    nameClass: "Legacy Residue",
    isProductName: false,
    strategicRole: ["lifecycle-managed"],
    citations: ["Deprecated July 2023"]
  },
  {
    id: "local-delivery",
    valueProp: "Seller-provided local delivery for buyers within a set geographic radius — an alternative to national carrier shipping for heavy items or same-day convenience.",
    valueTerritories: ["convenience", "speed"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361352"]
  },
  {
    id: "local-pickup",
    valueProp: "Collect in person directly from the seller — eliminating shipping cost and wait time for local buyers and enabling large-item sales where shipping isn't practical.",
    valueTerritories: ["convenience", "value", "speed"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361352-Local-pickup"]
  },
  {
    id: "logistica-ebay-by-orange-connex",
    valueProp: "Italy-specific managed logistics through Orange Connex partnership — providing IT-market sellers with warehousing, packing, and shipping under the eBay brand.",
    valueTerritories: ["convenience", "speed"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["multi-market", "long-term"],
    citations: ["https://wiki.corp.ebay.com (IT market fulfillment program)"]
  },
  {
    id: "logistica-ebay-orange-connex",
    valueProp: "Italy-specific logistics partnership with Orange Connex for managed shipping services — the alternate rendering of the same IT fulfillment program.",
    valueTerritories: ["convenience", "speed"],
    nameClass: "Product Name",
    isProductName: false,
    strategicRole: ["lifecycle-managed"],
    citations: ["https://wiki.corp.ebay.com (IT market fulfillment, duplicate variant)"]
  },
  {
    id: "managed-delivery",
    valueProp: "eBay-managed delivery service with guaranteed timelines and full tracking — letting sellers offer delivery commitments without managing carrier relationships directly.",
    valueTerritories: ["speed", "trust", "convenience"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["multi-market", "long-term"],
    citations: ["https://wiki.corp.ebay.com (managed delivery program)"]
  },
  {
    id: "managed-payments",
    valueProp: "eBay's integrated payment processing infrastructure that handles all transaction flows — consolidated billing, multi-currency payouts, and unified financial management for sellers.",
    valueTerritories: ["convenience", "value", "transparency"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "multi-market", "full-funnel", "long-term", "reusable-capability"],
    citations: [
      "https://help.ebay.com/hc/en-us/articles/360041539033-eBay-Managed-Payments",
      "https://wiki.corp.ebay.com (MMPProjects space — managed payments docs)"
    ]
  },
  {
    id: "out-for-delivery",
    valueProp: "Final-mile tracking status showing the package is on the delivery vehicle for same-day arrival — the moment that drives the highest buyer anticipation.",
    valueTerritories: ["transparency", "speed"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029364092"]
  },
  {
    id: "package-tracking",
    valueProp: "Real-time shipment status throughout the delivery journey — integrated into purchase history and seller sold-items views to reduce 'where is my order' contacts.",
    valueTerritories: ["transparency", "trust"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029364092-Tracking-your-item"]
  },
  {
    id: "pay-in-4",
    valueProp: "PayPal-powered buy now, pay later that splits any eligible eBay purchase into 4 interest-free payments over 6 weeks — making higher-value items more accessible to price-sensitive buyers.",
    valueTerritories: ["value", "convenience"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles (Pay in 4 / PayPal BNPL)"]
  },
  {
    id: "pay-upon-invoice",
    valueProp: "Germany's buy now, pay later option — buyers receive their item before paying, with a Klarna-issued invoice settled within 14–30 days, removing purchase risk for DE buyers.",
    valueTerritories: ["convenience", "value", "protection"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["multi-market", "long-term"],
    citations: [
      "https://wiki.corp.ebay.com/display/AUSTINPD (PUI program page)",
      "https://wiki.corp.ebay.com/display/TPPT (DE Klarna Pay Upon Invoice)",
      "DE market only — powered by Klarna via Adyen"
    ]
  },
  {
    id: "payout-schedule",
    valueProp: "Automated seller payout timing under Managed Payments — typically daily transfers to the seller's bank account, replacing the uncertainty of PayPal's instant access model.",
    valueTerritories: ["convenience", "transparency", "value"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360041539033"]
  },
  {
    id: "paypal-checkout",
    valueProp: "Legacy primary payment method for eBay before Managed Payments rollout — still available as a buyer option but no longer the default transaction method.",
    valueTerritories: ["convenience", "trust"],
    nameClass: "Legacy Residue",
    isProductName: false,
    strategicRole: ["lifecycle-managed"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360041539033 (Managed Payments transition)"]
  },
  {
    id: "pickup-drop-off",
    valueProp: "Australia's click-and-collect and parcel drop-off network — letting buyers pick up purchases at newsagents, post offices, and parcel lockers instead of waiting at home for delivery.",
    valueTerritories: ["convenience", "speed"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["multi-market", "long-term"],
    citations: [
      "https://wiki.corp.ebay.com (SHOPEXQ Acronyms page — PUDO: Pickup Drop Off)",
      "AU market only"
    ]
  },
  {
    id: "print-shipping-label",
    valueProp: "In-platform label printing with eBay-negotiated carrier discounts — letting sellers generate prepaid labels without leaving Seller Hub or paying retail shipping rates.",
    valueTerritories: ["convenience", "value", "speed"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361352-Printing-shipping-labels"]
  },
  {
    id: "quantity-selector",
    valueProp: "Multi-unit purchase control on listing and cart pages — enabling bulk buying from a single listing, critical for B2B and high-volume collector purchases.",
    valueTerritories: ["convenience"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361572"]
  },
  {
    id: "request-total",
    valueProp: "Buyer-initiated combined shipping quote request — lets sellers calculate a consolidated shipping price before the buyer pays for multiple items.",
    valueTerritories: ["convenience", "value", "transparency"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361292"]
  },
  {
    id: "return-to-sender",
    valueProp: "Failed delivery status indicating the package is being returned to the seller — triggering buyer notification and next-step resolution options.",
    valueTerritories: ["transparency", "protection"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029364092"]
  },
  {
    id: "royal-mail-tracked-24",
    valueProp: "UK's priority postal service with 24-hour delivery target and full tracking — the fastest Royal Mail option available through eBay's discounted shipping rates for UK sellers.",
    valueTerritories: ["speed", "transparency", "value"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.co.uk/hc/en-gb/articles (Royal Mail shipping rates)"]
  },
  {
    id: "same-day-handling",
    valueProp: "Seller commitment to ship on the same day as purchase — the fastest possible handling tier, earning the highest search placement and delivery confidence signal.",
    valueTerritories: ["speed", "trust"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361252"]
  },
  {
    id: "ship-from-address",
    valueProp: "Seller dispatch location used to generate shipping labels and calculate accurate estimated delivery dates — the starting point of every shipping calculation.",
    valueTerritories: ["transparency"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361352"]
  },
  {
    id: "ship-to-store",
    valueProp: "A discontinued program that allowed buyers to have eBay purchases shipped to retail partner locations for in-person pickup — retired as click-and-collect networks evolved.",
    valueTerritories: ["convenience"],
    nameClass: "Legacy Residue",
    isProductName: false,
    strategicRole: ["lifecycle-managed"],
    citations: ["Discontinued program"]
  },
  {
    id: "shipping-calculator",
    valueProp: "Checkout tool that calculates the exact shipping cost based on the buyer's postal code, package weight, and dimensions — removing price ambiguity before purchase commitment.",
    valueTerritories: ["transparency", "convenience"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361272"]
  },
  {
    id: "shipping-cost",
    valueProp: "The total delivery charge shown at listing and checkout — one of the highest-impact conversion factors in eBay's purchase funnel, directly influencing buy-box decisions.",
    valueTerritories: ["transparency", "value"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361272"]
  },
  {
    id: "shipping-discount",
    valueProp: "Reduced shipping rate for additional items from the same seller — a basket-building incentive that rewards buyers for consolidating purchases.",
    valueTerritories: ["value", "convenience"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361292"]
  },
  {
    id: "shipping-labels",
    valueProp: "Integrated label printing with eBay-negotiated carrier discounts — giving sellers access to commercial shipping rates and one-click label generation from any order.",
    valueTerritories: ["convenience", "value", "speed"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361352"]
  },
  {
    id: "ships-to",
    valueProp: "The destinations a seller will deliver to — showing buyers upfront which countries and regions are available, preventing checkout abandonment from shipping surprises.",
    valueTerritories: ["transparency", "selection"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361392"]
  },
  {
    id: "simple-delivery",
    valueProp: "UK-specific simplified shipping mandatory for consumer-to-consumer sales — one click generates a Royal Mail label with eBay-negotiated rates, removing carrier selection complexity.",
    valueTerritories: ["convenience", "speed", "value"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["multi-market", "long-term"],
    citations: ["https://help.ebay.co.uk/hc/en-gb/articles (Simple Delivery UK)"]
  },
  {
    id: "simple-delivery-uk",
    valueProp: "UK Royal Mail partnership program providing discounted postage labels for private sellers — the same as Simple Delivery, alternate node.",
    valueTerritories: ["convenience", "value"],
    nameClass: "Product Name",
    isProductName: false,
    strategicRole: ["lifecycle-managed"],
    citations: ["Variant of simple-delivery — UK C2C mandatory shipping"]
  },
  {
    id: "thermal-printer",
    valueProp: "Thermal label printer integration generating 4x6 shipping labels without ink or standard paper — the professional seller's standard for high-volume label printing.",
    valueTerritories: ["convenience", "speed"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361352"]
  },
  {
    id: "track-package",
    valueProp: "One-click action linking from eBay order details to the carrier's live tracking page — giving buyers instant access to their shipment's current location.",
    valueTerritories: ["transparency", "convenience"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029364092"]
  },
  {
    id: "tracking-number",
    valueProp: "The carrier-provided shipment identifier enabling package location tracking — required for seller protection on high-value orders and critical for dispute resolution.",
    valueTerritories: ["transparency", "protection"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029364092"]
  },
  {
    id: "upload-tracking",
    valueProp: "Tool to manually add carrier tracking numbers to orders shipped with non-eBay labels — ensuring buyer visibility and seller protection regardless of which carrier was used.",
    valueTerritories: ["transparency", "protection"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029364092"]
  },
  {
    id: "vat-services-uk-eu",
    valueProp: "EU and UK VAT compliance tools for cross-border sales — including VAT number validation, automatic threshold monitoring, and integrated tax calculation for EU sellers.",
    valueTerritories: ["transparency", "convenience"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "long-term"],
    citations: ["https://help.ebay.com/hc/en-us/articles (VAT compliance for EU/UK)"]
  },
  {
    id: "ebay-now",
    valueProp: "eBay's early same-day delivery experiment (2012–2015) piloted in SF, NYC, and San Jose — a precursor to the rapid fulfillment category, retired before the market was ready.",
    valueTerritories: ["speed"],
    nameClass: "Legacy Residue",
    isProductName: false,
    strategicRole: ["lifecycle-managed"],
    citations: ["Historical eBay program, 2012–2015"]
  }
]
