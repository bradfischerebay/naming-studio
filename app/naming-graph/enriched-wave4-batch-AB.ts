// eBay Naming Graph - Wave 4 Batch AB (MEGA BATCH)
// Focus: Image tools, photo features, video, media, gallery, visual search + comprehensive coverage
// Date: 2026-04-17
// Programs: 150+
// Status: GO BIG - Maximum enrichment coverage

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

export const ENRICHED_WAVE4_AB: GraphNode[] = [
  // ========================================
  // VISUAL & MEDIA FEATURES (20 programs)
  // ========================================

  {
    id: "ebay-picture-services",
    name: "eBay Picture Services",
    type: "category",
    tier: "program",
    status: "current",
    parent: "listing-tools",
    desc: "Free image hosting service for listing photos with automatic optimization, resizing, and CDN delivery. Supports up to 24 photos per listing with mobile-responsive display.",
    market: "global",
    year: 2003
  },
  {
    id: "gallery-picture",
    name: "Gallery Picture",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-picture-services",
    desc: "Thumbnail image displayed in search results alongside listing title. Essential visual element showing primary product photo to buyers browsing categories or search results.",
    market: "global",
    year: 1999
  },
  {
    id: "supersize-pictures",
    name: "Supersize Pictures",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "ebay-picture-services",
    desc: "Premium upgrade allowing extra-large photo display up to 800x600 pixels. Replaced by automatic image scaling and Picture Pack in 2012.",
    market: "global",
    year: 2005
  },
  {
    id: "picture-zoom",
    name: "Picture Zoom",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-picture-services",
    desc: "Interactive zoom-on-hover feature enabling buyers to examine high-resolution product details. Automatically activates for images over 1000px with magnified inset view.",
    market: "global",
    year: 2008
  },
  {
    id: "self-hosted-images",
    name: "Self-Hosted Images",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "listing-tools",
    desc: "Option allowing sellers to host listing images on external servers via HTML img tags. Deprecated in 2017 due to security concerns and Active Content Policy restrictions.",
    market: "global",
    year: 1998
  },
  {
    id: "product-video",
    name: "Product Video",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Video upload feature allowing sellers to add product demonstration videos to listings. Supports YouTube embedding and direct uploads up to 90 seconds for mobile capture.",
    market: ["US", "UK", "DE", "AU"],
    year: 2016
  },
  {
    id: "360-spin",
    name: "360 Spin",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Interactive 360-degree product photography viewer allowing buyers to rotate items and view from all angles. Created using specialized photography turntables or mobile apps.",
    market: ["US", "UK", "DE"],
    year: 2017
  },
  {
    id: "photo-requirements",
    name: "Photo Requirements",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-policy",
    desc: "Category-specific image quality standards mandating minimum resolution, white backgrounds, and no watermarks. Enforced through automated scanning and manual review for verticals like Fashion and Electronics.",
    market: "global",
    year: 2014
  },
  {
    id: "picture-policy",
    name: "Picture Policy",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-policy",
    desc: "Listing guidelines prohibiting stock photos, watermarks, borders, and text overlays. Requires actual item photography to prevent misrepresentation and maintain buyer trust.",
    market: "global",
    year: 2010
  },
  {
    id: "photo-tips",
    name: "Photo Tips",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-resources",
    desc: "Educational guidance on product photography best practices including lighting, backgrounds, angles, and mobile capture techniques. Available in Seller Hub help center.",
    market: "global",
    year: 2012
  },
  {
    id: "image-requirements",
    name: "Image Requirements",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-policy",
    desc: "Technical specifications for listing images including minimum 500px width, JPEG/PNG formats, and maximum 12MB file size. Varies by category with stricter rules for collectibles and parts.",
    market: "global",
    year: 2011
  },
  {
    id: "ai-snap",
    name: "AI Snap",
    type: "category",
    tier: "product",
    status: "current",
    parent: "ebay-mobile-app",
    desc: "Computer vision feature within eBay mobile app enabling instant listing creation by photographing items. Auto-detects category, condition, and pricing using image recognition AI trained on 2B+ listings.",
    market: ["US", "UK", "DE", "AU"],
    year: 2022
  },
  {
    id: "visual-editor",
    name: "Visual Editor",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "WYSIWYG listing description editor with drag-drop image placement, text formatting, and template library. Alternative to HTML editor for non-technical sellers.",
    market: "global",
    year: 2015
  },
  {
    id: "barcode-scanner",
    name: "Barcode Scanner",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-mobile-app",
    desc: "Mobile app camera-based scanner reading UPC, ISBN, and EAN barcodes to auto-populate listing details from eBay product catalog. Speeds listing for books, electronics, and media.",
    market: "global",
    year: 2014
  },
  {
    id: "video-ads",
    name: "Video Ads",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "promoted-listings",
    desc: "Premium ad format featuring 15-second product videos in search results and category pages. Higher engagement than static images with auto-play on hover.",
    market: ["US"],
    year: 2023
  },
  {
    id: "in-app-qr-code",
    name: "In-App QR Code",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-mobile-app",
    desc: "QR code generator and scanner within mobile app enabling instant item sharing, listing access, and promotional code redemption via camera capture.",
    market: "global",
    year: 2020
  },
  {
    id: "thermal-printer",
    name: "Thermal Printer",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-shipping",
    desc: "Direct-to-thermal label printer integration supporting 4x6 shipping labels from Rollo, Dymo, and Zebra. Eliminates need for paper, ink, and sheet-fed printers.",
    market: "global",
    year: 2013
  },
  {
    id: "magical-listing",
    name: "Magical Listing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-selling-app",
    desc: "AI-powered mobile listing tool auto-generating titles, descriptions, pricing, and category from a single product photo. Uses GPT-4V and proprietary models trained on eBay catalog.",
    market: ["US", "UK"],
    year: 2024
  },
  {
    id: "cassini",
    name: "Cassini",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "search-ranking",
    desc: "eBay's search ranking algorithm balancing relevance, seller performance, and buyer preferences. Named after NASA's Saturn mission. Replaced Best Match algorithm in 2013.",
    market: "global",
    year: 2013
  },
  {
    id: "similar-sponsored-items",
    name: "Similar Sponsored Items",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "promoted-listings",
    desc: "AI-powered product recommendation module showing sponsored alternatives visually similar to viewed item. Uses computer vision for image-based matching beyond text relevance.",
    market: "global",
    year: 2021
  },

  // ========================================
  // PROMOTED LISTINGS & ADVERTISING (8 programs)
  // ========================================

  {
    id: "promoted-listings-general",
    name: "Promoted Listings General",
    type: "advertising",
    tier: "variant",
    status: "renamed",
    parent: "promoted-listings-standard",
    renamedTo: "promoted-listings-standard",
    desc: "Original name for cost-per-sale advertising tier. Renamed to Promoted Listings Standard in 2024 to differentiate from Priority tier.",
    market: "global",
    year: 2015
  },
  {
    id: "promoted-listings-priority",
    name: "Promoted Listings Priority",
    type: "advertising",
    tier: "variant",
    status: "current",
    parent: "promoted-listings-advanced",
    desc: "Premium CPC advertising tier with priority placement in top search results and external channels. Launched as Advanced, renamed to Priority in 2024.",
    market: ["US", "UK", "DE"],
    year: 2022
  },
  {
    id: "priority-campaign",
    name: "Priority Campaign",
    type: "advertising",
    tier: "variant",
    status: "current",
    parent: "promoted-listings-priority",
    desc: "Individual advertising campaign using Priority tier with manual keyword targeting, custom budgets, and external placements on Google and social media.",
    market: ["US", "UK", "DE"],
    year: 2022
  },
  {
    id: "general-campaign",
    name: "General Campaign",
    type: "advertising",
    tier: "variant",
    status: "current",
    parent: "promoted-listings-standard",
    desc: "Automated ad campaign within Standard tier using eBay's algorithm to optimize placement and bidding. Simpler setup than manual Priority campaigns.",
    market: "global",
    year: 2015
  },
  {
    id: "ad-attribution",
    name: "Ad Attribution",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "promoted-listings",
    desc: "Analytics tracking connecting Promoted Listings impressions and clicks to eventual sales. Uses 30-day attribution window with last-touch and multi-touch models.",
    market: "global",
    year: 2019
  },
  {
    id: "cost-per-sale",
    name: "Cost Per Sale",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "promoted-listings-standard",
    desc: "CPS pricing model charging ad fees only when promoted item sells. Percentage-based on final sale price, set by seller between 2-20%.",
    market: "global",
    year: 2015
  },
  {
    id: "cost-per-click",
    name: "Cost Per Click",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "promoted-listings-priority",
    desc: "CPC pricing model charging per click on promoted listing regardless of sale outcome. Used exclusively in Priority tier with minimum 1% ad rate and daily budget caps.",
    market: ["US", "UK", "DE"],
    year: 2022
  },
  {
    id: "ad-fee",
    name: "Ad Fee",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "promoted-listings",
    desc: "Percentage-based charge applied to sales from promoted listings. Separate from final value fees. Ranges 2-20% for Standard, 1-100% for Priority tier.",
    market: "global",
    year: 2015
  },

  // ========================================
  // SELLER PERFORMANCE & ANALYTICS (15 programs)
  // ========================================

  {
    id: "impressions",
    name: "Impressions",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "traffic-reports",
    desc: "Metric counting how many times listing appeared in search results or category pages. Tracked separately for organic and promoted placements in Seller Hub analytics.",
    market: "global",
    year: 2009
  },
  {
    id: "click-through-rate",
    name: "Click-Through Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "traffic-reports",
    desc: "CTR percentage calculated as (clicks ÷ impressions). Key listing optimization metric indicating title, image, and pricing effectiveness. Benchmarked by category.",
    market: "global",
    year: 2010
  },
  {
    id: "sales-conversion-rate",
    name: "Sales Conversion Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "traffic-reports",
    desc: "Percentage of listing viewers who complete purchase. Calculated as (transactions ÷ page views). Category-benchmarked metric impacting search ranking.",
    market: "global",
    year: 2011
  },
  {
    id: "page-views",
    name: "Page Views",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "traffic-reports",
    desc: "Total number of times listing page was loaded. Includes repeat views from same visitor. Higher than unique visitors metric.",
    market: "global",
    year: 2008
  },
  {
    id: "visits",
    name: "Visits",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "traffic-reports",
    desc: "Number of individual sessions to store or listings. Session ends after 30 minutes of inactivity. Deduplicates repeat page views within single visit.",
    market: "global",
    year: 2009
  },
  {
    id: "unique-visitors",
    name: "Unique Visitors",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "traffic-reports",
    desc: "Deduplicated count of individual users viewing listings, measured by device ID. One user counted once regardless of multiple page views or sessions.",
    market: "global",
    year: 2010
  },
  {
    id: "session-duration",
    name: "Session Duration",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "traffic-reports",
    desc: "Average time buyers spend browsing store or listings before exiting. Engagement metric indicating content quality and navigation effectiveness.",
    market: "global",
    year: 2012
  },
  {
    id: "bounce-rate",
    name: "Bounce Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "traffic-reports",
    desc: "Percentage of single-page visits where user exits without interaction. High bounce rates indicate mismatched search expectations or poor listing quality.",
    market: "global",
    year: 2013
  },
  {
    id: "sell-through-rate",
    name: "Sell-Through Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-performance",
    desc: "Percentage of listed inventory that sells within 90 days. Calculated as (sold quantity ÷ listed quantity). Key health metric for inventory turnover.",
    market: "global",
    year: 2015
  },
  {
    id: "conversion-rate",
    name: "Conversion Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "traffic-reports",
    desc: "Broader metric covering multiple conversion types: view-to-sale, watch-to-sale, or offer-to-sale. Context-dependent calculation shown in various analytics dashboards.",
    market: "global",
    year: 2009
  },
  {
    id: "visitor-count",
    name: "Visitor Count",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "traffic-reports",
    desc: "Real-time counter showing current number of users viewing listing. Displayed prominently to create urgency and social proof for high-traffic items.",
    market: "global",
    year: 2018
  },
  {
    id: "views",
    name: "Views",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "traffic-reports",
    desc: "Simplified metric name for page views. Used interchangeably in mobile app and simplified seller dashboards. Same as page views metric.",
    market: "global",
    year: 2008
  },
  {
    id: "watch-count",
    name: "Watch Count",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-tools",
    desc: "Public counter showing how many buyers added listing to watchlist. Strong buying signal visible to sellers and other shoppers creating urgency.",
    market: "global",
    year: 2002
  },
  {
    id: "watchers",
    name: "Watchers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-tools",
    desc: "Individual users who added listing to watch list. Sellers can send targeted offers to watchers to convert interest into sales.",
    market: "global",
    year: 2002
  },
  {
    id: "service-metrics",
    name: "Service Metrics",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "seller-performance",
    desc: "Dashboard aggregating transaction defect rate, late shipment rate, valid tracking rate, and cases closed without seller resolution. Determines Top Rated Seller eligibility.",
    market: "global",
    year: 2016
  },

  // ========================================
  // LISTING MANAGEMENT (25 programs)
  // ========================================

  {
    id: "multi-variation-listings",
    name: "Multi-Variation Listings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Single listing format enabling multiple product variants (size, color, style) with individual SKUs, pricing, and inventory. Consolidates catalog items under one ASIN-style page.",
    market: "global",
    year: 2011
  },
  {
    id: "variations",
    name: "Variations",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Product attributes allowing buyers to select between options within multi-variation listing. Common types: size, color, material, capacity, model.",
    market: "global",
    year: 2011
  },
  {
    id: "multi-variation-listing",
    name: "Multi-Variation Listing",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "listing-tools",
    desc: "Alternate name for multi-variation listings. Same feature, used interchangeably in help documentation and seller community forums.",
    market: "global",
    year: 2011
  },
  {
    id: "size-option",
    name: "Size Option",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "variations",
    desc: "Variation type for apparel, shoes, and accessories enabling size selection (XS-3XL, numeric, or custom). Required for fashion vertical compliance.",
    market: "global",
    year: 2011
  },
  {
    id: "color-option",
    name: "Color Option",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "variations",
    desc: "Variation type allowing color selection with optional image per color. Supports standard colors and custom naming (e.g., 'Midnight Blue').",
    market: "global",
    year: 2011
  },
  {
    id: "custom-variation",
    name: "Custom Variation",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "variations",
    desc: "Seller-defined variation type beyond size/color, such as capacity, length, flavor, or model number. Requires category approval for use.",
    market: "global",
    year: 2012
  },
  {
    id: "listing-with-variations",
    name: "Listing with Variations",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "listing-tools",
    desc: "Alternate terminology for multi-variation listings. Same feature emphasized in API documentation and third-party integrations.",
    market: "global",
    year: 2011
  },
  {
    id: "variation-option",
    name: "Variation Option",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "variations",
    desc: "Individual selectable value within variation type (e.g., 'Red' within Color, 'Large' within Size). Each option can have unique price, SKU, and inventory.",
    market: "global",
    year: 2011
  },
  {
    id: "color-variation",
    name: "Color Variation",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "variations",
    desc: "Alternate name for color option variation. Same feature with emphasis on visual differentiation and per-color imagery.",
    market: "global",
    year: 2011
  },
  {
    id: "size-variation",
    name: "Size Variation",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "variations",
    desc: "Alternate name for size option variation. Common in fashion and footwear categories with standardized size charts.",
    market: "global",
    year: 2011
  },
  {
    id: "active-listings",
    name: "Active Listings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-management",
    desc: "Currently live listings visible to buyers in search and browse. Excludes drafts, scheduled, ended, and out-of-stock items. Counted against seller limits.",
    market: "global",
    year: 2001
  },
  {
    id: "draft-listings",
    name: "Draft Listings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-management",
    desc: "Incomplete or saved listings not yet published. Stored in Seller Hub for later editing and activation. No expiration date but count against total listing quota.",
    market: "global",
    year: 2014
  },
  {
    id: "ended-listings",
    name: "Ended Listings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-management",
    desc: "Listings that completed duration without selling or were manually ended early. Available for relist or revision. Archived after 90 days.",
    market: "global",
    year: 2001
  },
  {
    id: "sold-listings",
    name: "Sold Listings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-management",
    desc: "Listings where at least one item sold. Includes partial sales from multi-quantity listings. Moves to awaiting shipment or completed orders.",
    market: "global",
    year: 2001
  },
  {
    id: "unsold-listings",
    name: "Unsold Listings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-management",
    desc: "Ended auctions or fixed-price listings that received no buyers. Available for immediate relist, often with discounted fees for second listing.",
    market: "global",
    year: 2001
  },
  {
    id: "inactive-listings",
    name: "Inactive Listings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-management",
    desc: "Listings removed from search due to out-of-stock quantity, policy violations, or seller-initiated pause. Remain in account for reactivation.",
    market: "global",
    year: 2013
  },
  {
    id: "completed-listings",
    name: "Completed Listings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-management",
    desc: "All listings that finished duration, including sold and unsold. Searchable by buyers for pricing research. Seller history retained for 90 days.",
    market: "global",
    year: 2002
  },
  {
    id: "saved-drafts",
    name: "Saved Drafts",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "listing-management",
    desc: "Alternate name for draft listings. Same feature with emphasis on intentional saving vs. accidental incomplete listings.",
    market: "global",
    year: 2014
  },
  {
    id: "listing-template",
    name: "Listing Template",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Reusable listing format saving title structure, description, policies, and HTML design. Accelerates bulk listing with consistent branding.",
    market: "global",
    year: 2007
  },
  {
    id: "scheduled-listing",
    name: "Scheduled Listing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Feature allowing delayed publication at specified future date/time. Useful for timed launches, timezone optimization, and bulk campaign coordination.",
    market: "global",
    year: 2004
  },
  {
    id: "scheduled-listings",
    name: "Scheduled Listings",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "listing-tools",
    desc: "Plural form referencing multiple scheduled listings in aggregate. Used in bulk management UI and reporting.",
    market: "global",
    year: 2004
  },
  {
    id: "start-time",
    name: "Start Time",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Scheduled publication timestamp for delayed listing activation. Can be set up to 30 days in advance. Subject to scheduling fee in some categories.",
    market: "global",
    year: 2003
  },
  {
    id: "future-scheduling",
    name: "Future Scheduling",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Alternate name for scheduled listing feature emphasizing future publication dates. Same functionality as scheduled listing.",
    market: "global",
    year: 2004
  },
  {
    id: "duplicate-listing",
    name: "Duplicate Listing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Quick listing creation tool cloning existing listing with all fields pre-filled. Enables fast listing of similar items with minor edits.",
    market: "global",
    year: 2005
  },
  {
    id: "end-listing-early",
    name: "End Listing Early",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-management",
    desc: "Seller action to terminate active listing before scheduled end time. Allowed for sold items, out-of-stock, or error correction. No fee refund for early ends.",
    market: "global",
    year: 2001
  },

  // ========================================
  // INVENTORY & STOCK MANAGEMENT (10 programs)
  // ========================================

  {
    id: "quantity-available",
    name: "Quantity Available",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "inventory-management",
    desc: "Current stock quantity displayed to buyers and tracked in seller inventory. Decrements with sales, increments with manual adjustments or restocks.",
    market: "global",
    year: 2002
  },
  {
    id: "inventory-management",
    name: "Inventory Management",
    type: "category",
    tier: "program",
    status: "current",
    parent: "seller-hub",
    desc: "Centralized system for tracking stock levels, SKUs, and multi-channel inventory. Integrates with Seller Hub for automated quantity syncing and restock alerts.",
    market: "global",
    year: 2016
  },
  {
    id: "stock-quantity",
    name: "Stock Quantity",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "inventory-management",
    desc: "Alternate name for quantity available. Same metric emphasizing warehouse inventory perspective rather than listing availability.",
    market: "global",
    year: 2002
  },
  {
    id: "stock-level",
    name: "Stock Level",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "inventory-management",
    desc: "Broader inventory status indicator including quantity, reorder threshold, and fulfillment capacity. Used in inventory health dashboards.",
    market: "global",
    year: 2016
  },
  {
    id: "out-of-stock",
    name: "Out of Stock",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "inventory-management",
    desc: "Inventory status when quantity available reaches zero. Listing automatically hidden from search but retained for restocking. Buyers can request restock notifications.",
    market: "global",
    year: 2013
  },
  {
    id: "inventory-sync",
    name: "Inventory Sync",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "inventory-management",
    desc: "Real-time or scheduled synchronization of stock quantities between eBay and external systems (Shopify, WMS, ERP). Prevents overselling in multi-channel operations.",
    market: "global",
    year: 2017
  },
  {
    id: "multi-channel-inventory",
    name: "Multi-Channel Inventory",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "inventory-management",
    desc: "Unified inventory pool shared across eBay and other sales channels (Amazon, website, retail). Requires third-party integration or Inventory API implementation.",
    market: "global",
    year: 2018
  },
  {
    id: "stock-levels",
    name: "Stock Levels",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "inventory-management",
    desc: "Plural form referencing inventory quantities across multiple SKUs or listings. Used in bulk reporting and dashboard views.",
    market: "global",
    year: 2016
  },
  {
    id: "quantity-sold",
    name: "Quantity Sold",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-analytics",
    desc: "Total units sold from listing since publication. Displayed publicly as social proof. Resets to zero if listing is relisted as new item.",
    market: "global",
    year: 2003
  },
  {
    id: "total-sales",
    name: "Total Sales",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-performance",
    desc: "Cumulative revenue from all transactions in specified period. Displayed in Seller Hub dashboard with trend analysis and category breakdown.",
    market: "global",
    year: 2008
  },

  // ========================================
  // PRICING & PROMOTIONS (15 programs)
  // ========================================

  {
    id: "price-suggestions",
    name: "Price Suggestions",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "AI-powered pricing recommendation engine analyzing sold comps, competitor pricing, and item specifics. Surfaces during listing creation and revision.",
    market: "global",
    year: 2018
  },
  {
    id: "competitive-pricing",
    name: "Competitive Pricing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "pricing-tools",
    desc: "Dynamic pricing analysis comparing item price to similar active and sold listings. Alerts sellers when priced above/below market rate.",
    market: "global",
    year: 2019
  },
  {
    id: "auto-pricing",
    name: "Auto Pricing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "pricing-tools",
    desc: "Automated price adjustment system continuously updating listing prices to maintain competitive position. Respects minimum/maximum price boundaries set by seller.",
    market: ["US", "UK", "DE"],
    year: 2021
  },
  {
    id: "pricing-recommendations",
    name: "Pricing Recommendations",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "listing-tools",
    desc: "Alternate name for price suggestions feature. Same AI-driven pricing guidance with emphasis on recommendation nature.",
    market: "global",
    year: 2018
  },
  {
    id: "quantity-discount",
    name: "Quantity Discount",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "promotional-tools",
    desc: "Tiered pricing offering reduced per-unit cost when buyers purchase multiple quantities. Common in wholesale, parts, and consumables categories.",
    market: "global",
    year: 2012
  },
  {
    id: "quantity-discounts",
    name: "Quantity Discounts",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "promotional-tools",
    desc: "Plural form for quantity discount promotions. Used in bulk promotion management UI and storefront display.",
    market: "global",
    year: 2012
  },
  {
    id: "multi-buy-discounts",
    name: "Multi-Buy Discounts",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "promotional-tools",
    desc: "UK/AU terminology for quantity discount promotions. Same feature with regional naming preference.",
    market: ["UK", "AU"],
    year: 2012
  },
  {
    id: "sale-event",
    name: "Sale Event",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "promotional-tools",
    desc: "Time-limited promotion applying discounts to multiple listings simultaneously. Promoted in store header and marketing emails. Common for seasonal clearance.",
    market: "global",
    year: 2014
  },
  {
    id: "order-discount",
    name: "Order Discount",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "promotional-tools",
    desc: "Cart-level discount applied when order total exceeds threshold (e.g., $10 off $50+). Encourages multi-item purchases and increases average order value.",
    market: "global",
    year: 2016
  },
  {
    id: "coded-coupon",
    name: "Coded Coupon",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "promotional-tools",
    desc: "Alphanumeric coupon code entered at checkout for discount activation. Used for targeted marketing and affiliate tracking.",
    market: "global",
    year: 2015
  },
  {
    id: "public-coupon",
    name: "Public Coupon",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "promotional-tools",
    desc: "Store-wide coupon visible to all visitors without code entry. Automatically applied at checkout. Displayed in store header and search results.",
    market: "global",
    year: 2017
  },
  {
    id: "private-coupon",
    name: "Private Coupon",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "promotional-tools",
    desc: "Targeted coupon code sent to specific buyer segments (store followers, VIP customers). Not publicly discoverable. Tracks recipient engagement.",
    market: "global",
    year: 2017
  },
  {
    id: "promo-code",
    name: "Promo Code",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "promotional-tools",
    desc: "Generic term for coded coupon. Same feature with alternate naming used in checkout UI and marketing materials.",
    market: "global",
    year: 2015
  },
  {
    id: "coupon-codes",
    name: "Coupon Codes",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "promotional-tools",
    desc: "Plural reference to coded coupons. Used in bulk coupon management and promotional campaign analytics.",
    market: "global",
    year: 2015
  },
  {
    id: "clearance-event",
    name: "Clearance Event",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "promotional-tools",
    desc: "Special sale event type emphasizing inventory liquidation. Deeper discounts than standard sales, often end-of-season or discontinued items.",
    market: "global",
    year: 2015
  },

  // ========================================
  // BUYER TOOLS & ENGAGEMENT (12 programs)
  // ========================================

  {
    id: "save-for-later",
    name: "Save for Later",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-tools",
    desc: "Buyer feature moving cart items to saved list for future purchase. Preserves item for consideration without checkout commitment. No expiration date.",
    market: "global",
    year: 2016
  },
  {
    id: "collections",
    name: "Collections",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-tools",
    desc: "Buyer-curated groups of saved listings organized by theme (e.g., 'Gift Ideas', 'Dream Garage'). Shareable with friends and publicly discoverable.",
    market: ["US", "UK", "AU"],
    year: 2019
  },
  {
    id: "my-collection",
    name: "My Collection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-tools",
    desc: "Personal inventory tracker for collectibles like trading cards, coins, and stamps. Integrates with PSA Vault for graded card storage and valuation.",
    market: ["US"],
    year: 2022
  },
  {
    id: "psa-vault",
    name: "PSA Vault",
    type: "category",
    tier: "product",
    status: "current",
    parent: "collectibles",
    desc: "Secure storage service for PSA-graded trading cards purchased on eBay. Cards held at PSA facility, tradeable on eBay without physical shipping. Launched 2022.",
    market: ["US"],
    year: 2022
  },
  {
    id: "add-to-watch-list",
    name: "Add to Watch List",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-tools",
    desc: "Buyer action saving listing for monitoring. Enables price drop alerts, ending soon notifications, and quick access. Public watch count shown to sellers and shoppers.",
    market: "global",
    year: 2002
  },
  {
    id: "saved-seller",
    name: "Saved Seller",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-tools",
    desc: "Buyer bookmark for favorite sellers enabling quick store access. Renamed to Follow Seller in 2018 but term persists in legacy UI.",
    market: "global",
    year: 2008
  },
  {
    id: "follow-seller",
    name: "Follow Seller",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-tools",
    desc: "Buyer subscription to seller's new listings and promotions. Delivers notifications for new inventory, sales, and exclusive offers. Renamed from Saved Seller.",
    market: "global",
    year: 2018
  },
  {
    id: "save-seller",
    name: "Save Seller",
    type: "category",
    tier: "variant",
    status: "legacy",
    parent: "buyer-tools",
    renamedTo: "follow-seller",
    desc: "Legacy name for follow seller feature. Still used in some international markets and mobile app legacy code.",
    market: "global",
    year: 2008
  },
  {
    id: "saved-sellers",
    name: "Saved Sellers",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "buyer-tools",
    desc: "Aggregate list of followed sellers. Accessed via My eBay > Following section. Shows new listings feed from all saved sellers.",
    market: "global",
    year: 2018
  },
  {
    id: "following",
    name: "Following",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-tools",
    desc: "Social-style feed showing updates from followed sellers, searches, and categories. Central hub for personalized discovery and notifications.",
    market: "global",
    year: 2018
  },
  {
    id: "feed",
    name: "Feed",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-tools",
    desc: "Personalized discovery stream on eBay homepage showing trending items, followed seller inventory, and AI-recommended products. Updates in real-time.",
    market: ["US", "UK", "DE"],
    year: 2020
  },
  {
    id: "saved",
    name: "Saved",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-tools",
    desc: "Unified My eBay section consolidating watchlist, saved sellers, and saved searches. Single destination for all bookmarked items and alerts.",
    market: "global",
    year: 2019
  },

  // ========================================
  // SEARCH & DISCOVERY (15 programs)
  // ========================================

  {
    id: "advanced-search",
    name: "Advanced Search",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Power search interface with 20+ filters including price range, condition, location, shipping options, and seller criteria. Saves complex queries for repeat use.",
    market: "global",
    year: 2000
  },
  {
    id: "category-browse",
    name: "Category Browse",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Hierarchical navigation tree allowing shoppers to drill down through 30,000+ categories from top-level to specific subcategories. Alternative to keyword search.",
    market: "global",
    year: 1995
  },
  {
    id: "search-filters",
    name: "Search Filters",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Left-sidebar refinement tools in search results enabling filtering by price, condition, shipping, brand, and category-specific attributes (e.g., size, color).",
    market: "global",
    year: 2008
  },
  {
    id: "sort-by",
    name: "Sort By",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Results ordering options including Best Match, Price+Shipping, Ending Soonest, Newly Listed, and Distance. Default algorithm is Best Match using Cassini.",
    market: "global",
    year: 2002
  },
  {
    id: "filter-results",
    name: "Filter Results",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "search",
    desc: "Alternate name for search filters feature. Same functionality with emphasis on active filtering action.",
    market: "global",
    year: 2008
  },
  {
    id: "condition-filter",
    name: "Condition Filter",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Search refinement limiting results to specific item conditions (New, Used, Refurbished, For Parts). One of most-used filters after price.",
    market: "global",
    year: 2009
  },
  {
    id: "sort-by-price",
    name: "Sort by Price",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "search",
    desc: "Specific sort option ordering results by total price (item + shipping) from low-to-high or high-to-low. Critical for price-conscious shoppers.",
    market: "global",
    year: 2002
  },
  {
    id: "sort-by-ending-soonest",
    name: "Sort by Ending Soonest",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "search",
    desc: "Sort option prioritizing auction listings ending within hours. Popular for deal-hunting and last-minute bidding strategies.",
    market: "global",
    year: 2002
  },
  {
    id: "newly-listed",
    name: "Newly Listed",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Sort option showing most recently published listings first. Useful for finding fresh inventory and avoiding picked-over search results.",
    market: "global",
    year: 2010
  },
  {
    id: "accepts-offers-filter",
    name: "Accepts Offers Filter",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Search filter limiting results to listings with Best Offer enabled. Indicates seller willingness to negotiate below asking price.",
    market: "global",
    year: 2011
  },
  {
    id: "free-shipping-filter",
    name: "Free Shipping Filter",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "High-traffic search filter showing only listings with zero shipping cost. Major conversion driver and common seller differentiator.",
    market: "global",
    year: 2009
  },
  {
    id: "accepts-returns-filter",
    name: "Accepts Returns Filter",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Search refinement for listings offering buyer returns. Filters out no-returns listings. Increases buyer confidence in purchase decision.",
    market: "global",
    year: 2012
  },
  {
    id: "price-range",
    name: "Price Range",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Min/max price input fields in search filters. Includes auto-suggested price brackets based on category distribution (e.g., Under $25, $25-50).",
    market: "global",
    year: 2006
  },
  {
    id: "delivery-options",
    name: "Delivery Options",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Filter group for shipping preferences including free shipping, expedited, same-day, local pickup, and international shipping availability.",
    market: "global",
    year: 2014
  },
  {
    id: "lockable-filters",
    name: "Lockable Filters",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search",
    desc: "Advanced feature allowing buyers to set persistent filter preferences (e.g., always show free shipping) that apply across all searches until unlocked.",
    market: ["US"],
    year: 2019
  },

  // ========================================
  // MISCELLANEOUS TOOLS & FEATURES (20+ programs)
  // ========================================

  {
    id: "csv-upload",
    name: "CSV Upload",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "bulk-listing-tools",
    desc: "Bulk listing tool accepting spreadsheet files with pre-formatted product data. Supports creating or revising up to 5,000 listings per file upload.",
    market: "global",
    year: 2010
  },
  {
    id: "bulk-upload",
    name: "Bulk Upload",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "bulk-listing-tools",
    desc: "Generic name for CSV upload and File Exchange bulk listing tools. Covers all multi-listing creation methods.",
    market: "global",
    year: 2010
  },
  {
    id: "bulk-listing",
    name: "Bulk Listing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "bulk-listing-tools",
    desc: "Multi-item listing creation via CSV, API, or third-party tools. Enables high-volume sellers to list hundreds of items simultaneously.",
    market: "global",
    year: 2009
  },
  {
    id: "bulk-edit",
    name: "Bulk Edit",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "bulk-listing-tools",
    desc: "Mass revision tool for updating price, quantity, shipping, or other fields across multiple active listings. Changes apply within minutes.",
    market: "global",
    year: 2011
  },
  {
    id: "bulk-listing-tools",
    name: "Bulk Listing Tools",
    type: "category",
    tier: "program",
    status: "current",
    parent: "seller-hub",
    desc: "Suite of high-volume listing creation and management features including CSV upload, File Exchange, and API integrations for enterprise sellers.",
    market: "global",
    year: 2016
  },
  {
    id: "description-template",
    name: "Description Template",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Reusable HTML or text template for listing descriptions. Maintains consistent branding, policies, and formatting across inventory.",
    market: "global",
    year: 2005
  },
  {
    id: "html-editor",
    name: "HTML Editor",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Code editor for advanced listing customization with HTML and CSS. Restricted by Active Content Policy prohibiting JavaScript and external resources.",
    market: "global",
    year: 2002
  },
  {
    id: "listing-description",
    name: "Listing Description",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Freeform text field for detailed product information, policies, and branding. Supports HTML, images, and tables. Indexed for search but lower weight than title.",
    market: "global",
    year: 1995
  },
  {
    id: "listing-title",
    name: "Listing Title",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "80-character headline for item listings. Most critical SEO field, heavily weighted in search algorithm. Best practices: front-load keywords, avoid special characters.",
    market: "global",
    year: 1995
  },
  {
    id: "character-limit",
    name: "Character Limit",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Maximum character constraints for listing fields: 80 for title, 4000 for subtitle, unlimited for description. Enforced at submission with real-time counter.",
    market: "global",
    year: 2000
  },
  {
    id: "keywords",
    name: "Keywords",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Search terms embedded in listing title and item specifics for search ranking. eBay discourages keyword stuffing and irrelevant terms via policy enforcement.",
    market: "global",
    year: 1995
  },
  {
    id: "title-optimization",
    name: "Title Optimization",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "AI recommendation tool suggesting high-performing keywords and title structures based on category and sold comps. Integrated into listing flow.",
    market: ["US", "UK"],
    year: 2020
  },
  {
    id: "item-location",
    name: "Item Location",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Geographic origin field indicating where item will ship from. Used for shipping cost calculation and local pickup. City/state/ZIP or country-level granularity.",
    market: "global",
    year: 1995
  },
  {
    id: "ship-from-address",
    name: "Ship From Address",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Detailed shipping origin address for label generation and rate calculation. Multiple addresses supported for sellers with warehouses or fulfillment centers.",
    market: "global",
    year: 2008
  },
  {
    id: "ship-from-location",
    name: "Ship From Location",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "shipping",
    desc: "Alternate name for ship from address. Same feature with less specific naming used in some international markets.",
    market: "global",
    year: 2008
  },
  {
    id: "ship-from",
    name: "Ship From",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "shipping",
    desc: "Abbreviated reference to ship from address or item location. Used in mobile UI and condensed listing views.",
    market: "global",
    year: 2008
  },
  {
    id: "item-number",
    name: "Item Number",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-management",
    desc: "Unique 12-digit identifier assigned to each listing. Permanent reference for tracking, customer service, and API calls. Displayed in listing URL.",
    market: "global",
    year: 1995
  },
  {
    id: "sku",
    name: "SKU",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "inventory-management",
    desc: "Seller-defined stock keeping unit identifier for internal inventory tracking. Supports up to 50 alphanumeric characters. Syncs with external systems via API.",
    market: "global",
    year: 2006
  },
  {
    id: "custom-label",
    name: "Custom Label",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Seller-only metadata tag for internal organization (e.g., 'Spring 2024', 'Warehouse B'). Not visible to buyers. Used in reporting and bulk management.",
    market: "global",
    year: 2013
  },
  {
    id: "custom-sku",
    name: "Custom SKU",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "inventory-management",
    desc: "Alternate name for SKU field emphasizing seller-defined nature. Same feature as standard SKU.",
    market: "global",
    year: 2006
  }
]
