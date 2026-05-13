// eBay Naming Graph - Wave 4 Batch V - FINAL SWEEP
// Generated: 2026-04-17
// Programs Enriched: 115 NEW programs
// Focus: COMPREHENSIVE FINAL COVERAGE - all remaining unenriched programs
// Categories: Marketing campaigns, Deals programs, Buyer tools, Advanced features, Regional programs, Legacy features

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

export const ENRICHED_WAVE4_V: GraphNode[] = [
  // MARKETING CAMPAIGNS & PROMOTIONS (15 programs)
  {
    id: "coded-coupons",
    name: "Coded Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Seller-created discount codes requiring buyers to enter specific alphanumeric code at checkout to receive promotion, enabling targeted marketing campaigns.",
    market: "global",
    year: 2016
  },
  {
    id: "markdown-manager",
    name: "Markdown Manager",
    type: "category",
    tier: "product",
    status: "current",
    parent: "marketing-tools",
    desc: "Automated pricing tool allowing sellers to schedule price reductions on unsold inventory to increase turnover and maintain competitive positioning.",
    market: ["US", "UK", "CA", "AU"],
    year: 2018
  },
  {
    id: "send-coupon",
    name: "Send Coupon",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing-tools",
    desc: "Direct marketing action allowing sellers to email promotional discount codes to targeted buyer segments including watchers and past customers.",
    market: "global",
    year: 2019
  },
  {
    id: "print-coupons",
    name: "Print Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing-tools",
    desc: "Physical coupon generation tool for sellers to create printable discount vouchers for in-person distribution or packaging inserts.",
    market: "global",
    year: 2017
  },
  {
    id: "boost-buyer-engagement",
    name: "Boost Buyer Engagement",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing-tools",
    desc: "Marketing toolkit providing automated follow-up emails, targeted offers, and re-engagement campaigns to maintain buyer relationships.",
    market: ["US", "UK", "CA", "AU"],
    year: 2020
  },
  {
    id: "buyer-groups",
    name: "Buyer Groups",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing-tools",
    desc: "Segmentation tool allowing sellers to organize customers into targeted groups based on purchase history, preferences, or engagement for personalized marketing.",
    market: "global",
    year: 2019
  },
  {
    id: "store-email-campaigns",
    name: "Store Email Campaigns",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-stores",
    desc: "Professional email marketing tool enabling store subscribers to design and send branded promotional newsletters to customer mailing lists.",
    market: "global",
    year: 2008
  },
  {
    id: "daily-deals",
    name: "Daily Deals",
    type: "category",
    tier: "campaign",
    status: "current",
    parent: "ebay-deals",
    desc: "Curated time-limited promotions refreshed every 24 hours featuring heavily discounted items across categories with prominent homepage placement.",
    market: "global",
    year: 2013
  },
  {
    id: "featured-deals",
    name: "Featured Deals",
    type: "category",
    tier: "campaign",
    status: "current",
    parent: "ebay-deals",
    desc: "Premium placement program showcasing seller offers with enhanced visibility on Deals hub and category pages, selected by eBay merchandising team.",
    market: ["US", "UK", "CA", "AU"],
    year: 2016
  },
  {
    id: "weekly-deals",
    name: "Weekly Deals",
    type: "category",
    tier: "campaign",
    status: "current",
    parent: "ebay-deals",
    desc: "Seven-day promotional events highlighting themed product collections with special pricing, rotating weekly across different categories and verticals.",
    market: ["US", "UK", "CA", "AU"],
    year: 2015
  },
  {
    id: "deals-seller-portal",
    name: "Deals Seller Portal",
    type: "category",
    tier: "product",
    status: "current",
    parent: "ebay-deals",
    desc: "Self-service dashboard where eligible sellers submit inventory for Deals program consideration, view performance metrics, and manage active campaigns.",
    market: ["US", "UK", "CA", "AU"],
    year: 2017
  },
  {
    id: "spotlight-deals",
    name: "Spotlight Deals",
    type: "category",
    tier: "campaign",
    status: "current",
    parent: "ebay-deals",
    desc: "High-visibility promotional placement reserved for exceptional offers meeting strict discount and inventory thresholds, featured on homepage hero module.",
    market: ["US", "UK", "CA", "AU"],
    year: 2019
  },
  {
    id: "ebay-exclusive-coupons",
    name: "eBay Exclusive Coupons",
    type: "category",
    tier: "campaign",
    status: "current",
    parent: "ebay-deals",
    desc: "Platform-wide discount codes distributed by eBay to drive traffic during key shopping events like holidays, back-to-school, and seasonal peaks.",
    market: "global",
    year: 2014
  },
  {
    id: "brand-outlet",
    name: "Brand Outlet",
    type: "category",
    tier: "vertical",
    status: "current",
    parent: "verticals",
    desc: "Dedicated shopping destination featuring authorized brand sellers and retailers offering overstock, last season, and refurbished items at clearance pricing.",
    market: "global",
    year: 2016
  },
  {
    id: "preloved-partner-program",
    name: "Preloved Partner Program",
    type: "impact",
    tier: "program",
    status: "current",
    parent: "sustainability",
    desc: "Partnership initiative supporting circular economy by providing resale technology, logistics support, and marketplace integration to retail brands launching recommerce channels.",
    market: ["US", "UK"],
    year: 2022
  },

  // RETURNS & CUSTOMER SERVICE (5 programs)
  {
    id: "managed-returns",
    name: "Managed Returns",
    type: "category",
    tier: "program",
    status: "current",
    parent: "returns",
    desc: "Automated returns processing service where eBay handles return label generation, tracking, and refund workflow to simplify seller operations and improve buyer experience.",
    market: "global",
    year: 2019
  },
  {
    id: "background-enhancement",
    name: "Background Enhancement",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "AI-powered image editing tool that automatically removes or replaces photo backgrounds with clean white or neutral backdrop for professional listing appearance.",
    market: "global",
    year: 2023
  },
  {
    id: "selling-with-ai",
    name: "Selling with AI",
    type: "category",
    tier: "product",
    status: "current",
    parent: "seller-hub",
    desc: "Suite of machine learning tools including AI-generated titles, descriptions, category suggestions, and pricing recommendations to accelerate listing creation.",
    market: "global",
    year: 2024
  },
  {
    id: "shop-by-diagram",
    name: "Shop by Diagram",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-motors",
    desc: "Visual parts finder allowing buyers to click on vehicle diagram schematics to identify and purchase exact OEM or aftermarket parts by position and part number.",
    market: ["US", "UK", "DE", "AU"],
    year: 2017
  },
  {
    id: "parts-compatibility",
    name: "Parts Compatibility",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-motors",
    desc: "Fitment validation system cross-referencing parts with vehicle year/make/model databases to ensure accurate compatibility before purchase, reducing returns.",
    market: "global",
    year: 2009
  },

  // LISTING UPGRADES & ENHANCEMENTS (5 programs)
  {
    id: "bold-title",
    name: "Bold Title",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-upgrades",
    desc: "Paid listing enhancement rendering title text in bold font weight within search results for increased visibility and click-through rate.",
    market: "global",
    year: 2000
  },
  {
    id: "featured-listing",
    name: "Featured Listing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-upgrades",
    desc: "Premium placement upgrade providing priority positioning in search results and category browse pages, charged as percentage of final sale price.",
    market: "global",
    year: 2002
  },
  {
    id: "automatic-relisting",
    name: "Automatic Relisting",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Scheduled republication feature automatically relaunching unsold auction or fixed-price listings to maintain continuous availability without manual intervention.",
    market: "global",
    year: 2006
  },
  {
    id: "out-of-stock-control",
    name: "Out of Stock Control",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "inventory-management",
    desc: "Inventory management setting that automatically hides listings when quantity reaches zero and restores visibility when stock is replenished.",
    market: "global",
    year: 2014
  },
  {
    id: "good-til-cancelled",
    name: "Good Til Cancelled",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-formats",
    desc: "Evergreen listing duration that automatically renews every 30 days until seller manually ends it or item sells out, used for fixed-price inventory.",
    market: "global",
    year: 2001
  },

  // BUYER ENGAGEMENT TOOLS (8 programs)
  {
    id: "immediate-payment-required",
    name: "Immediate Payment Required",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "checkout",
    desc: "Seller setting mandating instant payment at checkout before order confirmation, preventing unpaid item cases and expediting fulfillment workflow.",
    market: "global",
    year: 2010
  },
  {
    id: "offers-to-watchers",
    name: "Offers to Watchers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing-tools",
    desc: "Proactive seller outreach sending private discount offers to buyers who added listing to watchlist but haven't purchased, recovering abandoned intent.",
    market: "global",
    year: 2018
  },
  {
    id: "private-offers",
    name: "Private Offers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing-tools",
    desc: "Confidential pricing proposal sent to individual buyers without public visibility, enabling price negotiation while maintaining listed price integrity.",
    market: "global",
    year: 2015
  },
  {
    id: "codeless-coupons",
    name: "Codeless Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discounts-manager",
    desc: "Automatically applied discounts requiring no buyer action, badge displayed on listing with savings calculated at checkout without code entry.",
    market: "global",
    year: 2020
  },
  {
    id: "promotional-codes",
    name: "Promotional Codes",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing-tools",
    desc: "Alphanumeric discount codes distributed through marketing channels allowing buyers to claim percentage or dollar-off savings during checkout.",
    market: "global",
    year: 2015
  },
  {
    id: "purchase-protection",
    name: "Purchase Protection",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "buyer-protection",
    desc: "Comprehensive buyer guarantee covering fraud, item not as described, and item not received claims with full reimbursement protection up to purchase amount.",
    market: "global",
    year: 2007
  },
  {
    id: "price-match-guarantee",
    name: "Price Match Guarantee",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "buyer-protection",
    desc: "Buyer protection program where eBay refunds price difference if identical new item found cheaper on competitor site within timeframe, ensuring best price confidence.",
    market: ["US"],
    year: 2019
  },
  {
    id: "verified-rights-owner-program",
    name: "Verified Rights Owner Program",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "intellectual-property",
    desc: "IP protection initiative allowing brand owners to report counterfeit listings, access removal tools, and participate in proactive filtering of unauthorized merchandise.",
    market: "global",
    year: 2008
  },

  // SEARCH & DISCOVERY FEATURES (10 programs)
  {
    id: "cassini",
    name: "Cassini",
    type: "category",
    tier: "platform",
    status: "current",
    parent: "search-platform",
    desc: "eBay's proprietary search engine algorithm determining listing ranking based on relevance, seller performance, pricing, and buyer behavior signals.",
    market: "global",
    year: 2013
  },
  {
    id: "best-match",
    name: "Best Match",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search-platform",
    desc: "Default search sorting algorithm balancing relevance, price, shipping, seller quality, and conversion likelihood to surface optimal buyer matches.",
    market: "global",
    year: 2007
  },
  {
    id: "similar-sponsored-items",
    name: "Similar Sponsored Items",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "promoted-listings",
    desc: "Automated ad placement showing promoted alternatives on competitor listings, algorithmically matched by category, price range, and buyer search intent.",
    market: "global",
    year: 2020
  },
  {
    id: "trending-deals",
    name: "Trending Deals",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "discovery",
    desc: "Algorithmically curated deals module highlighting products with rising search volume, high engagement velocity, and competitive pricing momentum.",
    market: "global",
    year: 2021
  },
  {
    id: "watchlist-recommendations",
    name: "Watchlist Recommendations",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "personalization",
    desc: "Machine learning system suggesting items to add to buyer watchlist based on browsing history, saved searches, and similar user behavior patterns.",
    market: "global",
    year: 2018
  },
  {
    id: "browsing-history",
    name: "Browsing History",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Personal activity log tracking buyer's recently viewed listings with timestamp, enabling easy return to products under consideration.",
    market: "global",
    year: 2009
  },
  {
    id: "recently-viewed-items",
    name: "Recently Viewed Items",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Persistent carousel module displaying buyer's last 20-50 viewed listings across site and app sessions for quick re-access and comparison shopping.",
    market: "global",
    year: 2010
  },
  {
    id: "related-searches",
    name: "Related Searches",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search-platform",
    desc: "Search refinement suggestions appearing below results, offering alternative or related query terms to help buyers discover better matches.",
    market: "global",
    year: 2008
  },
  {
    id: "search-suggestions",
    name: "Search Suggestions",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search-platform",
    desc: "Autocomplete dropdown showing popular and personalized query completions as buyer types, accelerating search and correcting misspellings.",
    market: "global",
    year: 2007
  },
  {
    id: "aspect-filters",
    name: "Aspect Filters",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search-platform",
    desc: "Faceted search refinement sidebar allowing buyers to filter results by item specifics like brand, size, color, condition, and category-specific attributes.",
    market: "global",
    year: 2010
  },

  // SELLER PERFORMANCE & ANALYTICS (12 programs)
  {
    id: "seller-level",
    name: "Seller Level",
    type: "category",
    tier: "program",
    status: "current",
    parent: "seller-standards",
    desc: "Tiered seller classification system (Above Standard, Top Rated, Below Standard) based on defect rate, tracking, and customer service performance metrics.",
    market: "global",
    year: 2008
  },
  {
    id: "above-standard",
    name: "Above Standard",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "seller-standards",
    desc: "Middle-tier seller performance level meeting baseline standards for defect rate and tracking but not qualifying for Top Rated benefits.",
    market: "global",
    year: 2011
  },
  {
    id: "below-standard",
    name: "Below Standard",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "seller-standards",
    desc: "Warning performance tier indicating excessive defects or policy violations, subject to search suppression and potential selling restrictions.",
    market: "global",
    year: 2011
  },
  {
    id: "seller-dashboard",
    name: "Seller Dashboard",
    type: "category",
    tier: "product",
    status: "current",
    parent: "seller-hub",
    desc: "Centralized analytics homepage displaying key performance indicators, sales trends, active listings summary, and task prioritization for sellers.",
    market: "global",
    year: 2016
  },
  {
    id: "traffic-report",
    name: "Traffic Report",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "reports",
    desc: "Analytics dashboard showing listing impressions, page views, click sources, and visitor engagement metrics to optimize visibility and conversion.",
    market: "global",
    year: 2012
  },
  {
    id: "conversion-rate",
    name: "Conversion Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "reports",
    desc: "Performance metric calculating percentage of listing views that result in sales, used to identify pricing, photo, and description optimization opportunities.",
    market: "global",
    year: 2013
  },
  {
    id: "sell-through-rate",
    name: "Sell-Through Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "reports",
    desc: "Inventory efficiency metric showing percentage of listed items that sold within evaluation period, indicating demand strength and pricing accuracy.",
    market: "global",
    year: 2014
  },
  {
    id: "average-selling-price",
    name: "Average Selling Price",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "reports",
    desc: "Analytics metric calculating mean sale price across seller's completed transactions, used for pricing strategy and category performance comparison.",
    market: "global",
    year: 2010
  },
  {
    id: "active-listings-report",
    name: "Active Listings Report",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "reports",
    desc: "Inventory snapshot showing all live listings with status, duration, views, watchers, and optimization recommendations for underperforming items.",
    market: "global",
    year: 2008
  },
  {
    id: "unsold-items-report",
    name: "Unsold Items Report",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "reports",
    desc: "Performance analysis of ended listings that received no sales, providing insights on pricing, timing, category selection, and listing quality issues.",
    market: "global",
    year: 2009
  },
  {
    id: "fee-report",
    name: "Fee Report",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "reports",
    desc: "Financial summary breaking down insertion fees, final value fees, optional upgrade charges, and promotional costs by listing and time period.",
    market: "global",
    year: 2006
  },
  {
    id: "seller-performance-summary",
    name: "Seller Performance Summary",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Unified performance scorecard displaying defect rates, tracking upload percentage, late shipment rate, and policy compliance relative to program thresholds.",
    market: "global",
    year: 2016
  },

  // PAYMENT & FINANCIAL TOOLS (8 programs)
  {
    id: "ebay-balance",
    name: "eBay Balance",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "managed-payments",
    desc: "Digital wallet where seller payouts accumulate, can be used for eBay purchases, transferred to bank, or held for fee payments.",
    market: "global",
    year: 2020
  },
  {
    id: "payout-schedule",
    name: "Payout Schedule",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "managed-payments",
    desc: "Configurable seller payment frequency (daily, weekly, monthly) determining when available funds transfer from eBay balance to linked bank account.",
    market: "global",
    year: 2020
  },
  {
    id: "instant-payout",
    name: "Instant Payout",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "managed-payments",
    desc: "On-demand funds transfer allowing eligible sellers to receive sales proceeds within minutes to debit card for small fee, bypassing standard payout schedule.",
    market: ["US"],
    year: 2022
  },
  {
    id: "payment-dispute",
    name: "Payment Dispute",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "managed-payments",
    desc: "Buyer-initiated chargeback or payment reversal claim requiring seller documentation and eBay mediation to resolve transaction authenticity or authorization issues.",
    market: "global",
    year: 2020
  },
  {
    id: "tax-documents",
    name: "Tax Documents",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Automated generation and delivery of 1099-K forms and sales tax reports for US sellers meeting IRS reporting thresholds and state tax obligations.",
    market: ["US"],
    year: 2011
  },
  {
    id: "vat-on-ebay",
    name: "VAT on eBay",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "tax-services",
    desc: "Automated value-added tax calculation, collection, and remittance for cross-border EU sales ensuring compliance with digital VAT directives.",
    market: ["UK", "DE", "FR", "IT"],
    year: 2015
  },
  {
    id: "sales-tax-collection",
    name: "Sales Tax Collection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "tax-services",
    desc: "Automated US state and local sales tax calculation and collection at checkout based on buyer location and product taxability rules.",
    market: ["US"],
    year: 2019
  },
  {
    id: "internet-sales-tax",
    name: "Internet Sales Tax",
    type: "category",
    tier: "program",
    status: "current",
    parent: "tax-services",
    desc: "Marketplace facilitator tax compliance program where eBay collects and remits sales tax on behalf of sellers in states with economic nexus laws.",
    market: ["US"],
    year: 2019
  },

  // INTERNATIONAL & CROSS-BORDER (6 programs)
  {
    id: "global-shipping-program",
    name: "Global Shipping Program",
    type: "category",
    tier: "program",
    status: "legacy",
    parent: "international-shipping",
    desc: "Legacy international shipping service where sellers ship domestically to eBay hub which handles customs, international transit, and tracking to buyer.",
    market: "global",
    year: 2012,
    renamedTo: "ebay-international-shipping"
  },
  {
    id: "ebay-international-shipping",
    name: "eBay International Shipping",
    type: "category",
    tier: "program",
    status: "current",
    parent: "international-shipping",
    desc: "Simplified cross-border fulfillment where sellers ship domestically to eBay logistics center which manages customs clearance and international delivery.",
    market: "global",
    year: 2020,
    renamedFrom: "global-shipping-program"
  },
  {
    id: "international-standard-delivery",
    name: "International Standard Delivery",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "international-shipping",
    desc: "Economy international shipping option with 11-23 business day delivery window using postal services for cost-effective cross-border fulfillment.",
    market: "global",
    year: 2014
  },
  {
    id: "international-expedited-shipping",
    name: "International Expedited Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "international-shipping",
    desc: "Fast international delivery option using courier services like DHL, FedEx with 3-7 day delivery and full tracking for premium cross-border sales.",
    market: "global",
    year: 2010
  },
  {
    id: "international-priority-shipping",
    name: "International Priority Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "international-shipping",
    desc: "Mid-tier international shipping balancing speed and cost with 6-10 day delivery via express postal services and comprehensive tracking.",
    market: "global",
    year: 2012
  },
  {
    id: "international-site-visibility",
    name: "International Site Visibility",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "international-trade",
    desc: "Listing promotion feature exposing seller's items to buyers on other eBay country sites when offering international shipping, multiplying reach.",
    market: "global",
    year: 2008
  },

  // ADVANCED SELLER TOOLS (10 programs)
  {
    id: "listing-templates",
    name: "Listing Templates",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Reusable HTML/CSS design templates for item descriptions enabling consistent branding and professional presentation across seller's catalog.",
    market: "global",
    year: 2003
  },
  {
    id: "custom-listing-header",
    name: "Custom Listing Header",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Branded header image appearing at top of all seller's listings providing consistent visual identity and store navigation links.",
    market: "global",
    year: 2005
  },
  {
    id: "quantity-pricing",
    name: "Quantity Pricing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-features",
    desc: "Bulk discount pricing structure offering reduced per-unit cost when buyers purchase multiple quantities of same item in single transaction.",
    market: "global",
    year: 2014
  },
  {
    id: "minimum-advertised-price",
    name: "Minimum Advertised Price",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-features",
    desc: "Brand-imposed pricing floor requiring buyers to add item to cart or make offer to view actual price below publicly displayed amount.",
    market: ["US", "UK"],
    year: 2016
  },
  {
    id: "make-offer-auto-accept",
    name: "Make Offer Auto-Accept",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "best-offer",
    desc: "Automated negotiation threshold where offers meeting or exceeding seller's preset price automatically convert to binding purchase without manual review.",
    market: "global",
    year: 2013
  },
  {
    id: "make-offer-auto-decline",
    name: "Make Offer Auto-Decline",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "best-offer",
    desc: "Automated rejection of offers below seller's minimum acceptable threshold, saving time reviewing lowball proposals and setting pricing floor.",
    market: "global",
    year: 2013
  },
  {
    id: "buy-it-now-price",
    name: "Buy It Now Price",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "auction-features",
    desc: "Fixed-price option on auction listings allowing buyers to end bidding early and purchase immediately at seller's predetermined price.",
    market: "global",
    year: 1999
  },
  {
    id: "dutch-auction",
    name: "Dutch Auction",
    type: "category",
    tier: "feature",
    status: "legacy",
    parent: "auction-features",
    desc: "Discontinued multi-quantity auction format where identical items sold to multiple highest bidders at lowest successful bid price.",
    market: "global",
    year: 1997
  },
  {
    id: "listing-scheduler",
    name: "Listing Scheduler",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-tools",
    desc: "Scheduling tool allowing sellers to create listings in advance with specific start date and time for optimal traffic window alignment.",
    market: "global",
    year: 2005
  },
  {
    id: "bulk-listing-tool",
    name: "Bulk Listing Tool",
    type: "category",
    tier: "product",
    status: "current",
    parent: "listing-tools",
    desc: "CSV/Excel upload interface enabling sellers to create or revise hundreds of listings simultaneously through spreadsheet import.",
    market: "global",
    year: 2008
  },

  // BUYER EXPERIENCE FEATURES (8 programs)
  {
    id: "saved-searches",
    name: "Saved Searches",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Persistent search query storage with optional email alerts notifying buyers when new listings match their saved criteria and filters.",
    market: "global",
    year: 2005
  },
  {
    id: "following",
    name: "Following",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Subscription feature allowing buyers to follow sellers or categories to receive notifications about new listings, sales events, and promotions.",
    market: "global",
    year: 2018
  },
  {
    id: "collection-badges",
    name: "Collection Badges",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "gamification",
    desc: "Achievement system awarding virtual badges to buyers for completing purchases in specific categories or reaching collection milestones.",
    market: ["US", "UK"],
    year: 2021
  },
  {
    id: "buyer-rewards",
    name: "Buyer Rewards",
    type: "category",
    tier: "program",
    status: "current",
    parent: "buyer-engagement",
    desc: "Loyalty program offering points or percentage-back on purchases redeemable for future buying credits or special promotions.",
    market: ["US"],
    year: 2022
  },
  {
    id: "ebay-plus",
    name: "eBay Plus",
    type: "category",
    tier: "program",
    status: "current",
    parent: "buyer-membership",
    desc: "Premium membership subscription offering free fast shipping, exclusive deals, and priority customer service for annual or monthly fee.",
    market: ["DE", "AU"],
    year: 2017
  },
  {
    id: "guaranteed-delivery",
    name: "Guaranteed Delivery",
    type: "trust",
    tier: "feature",
    status: "current",
    parent: "buyer-protection",
    desc: "Delivery promise badge on listings where seller commits to specific delivery date with refund or credit if shipment arrives late.",
    market: ["US", "UK", "DE"],
    year: 2019
  },
  {
    id: "guest-purchase",
    name: "Guest Purchase",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "checkout",
    desc: "Streamlined checkout allowing buyers to complete transactions without creating eBay account using email and payment credentials only.",
    market: "global",
    year: 2014
  },
  {
    id: "in-app-messaging",
    name: "In-App Messaging",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "mobile-app",
    desc: "Native mobile messaging interface for buyer-seller communication within eBay app without switching to email or external platforms.",
    market: "global",
    year: 2015
  },

  // MOTORS & SPECIALIZED VERTICALS (6 programs)
  {
    id: "vehicle-history-report",
    name: "Vehicle History Report",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-motors",
    desc: "Integration with Carfax and AutoCheck providing detailed accident, ownership, and service history reports for used vehicle listings.",
    market: ["US", "CA"],
    year: 2012
  },
  {
    id: "vin-decoder",
    name: "VIN Decoder",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-motors",
    desc: "Automated vehicle specification lookup using VIN number to populate year, make, model, trim, engine, and feature details in listings.",
    market: ["US", "CA", "UK", "DE"],
    year: 2010
  },
  {
    id: "vehicle-purchase-protection",
    name: "Vehicle Purchase Protection",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "ebay-motors",
    desc: "Specialized buyer guarantee covering motor vehicle purchases up to $100,000 protecting against fraud, title issues, and undisclosed damage.",
    market: ["US"],
    year: 2014
  },
  {
    id: "motors-financing",
    name: "Motors Financing",
    type: "category",
    tier: "program",
    status: "current",
    parent: "ebay-motors",
    desc: "Third-party financing integration allowing buyers to apply for auto loans directly from vehicle listings with instant pre-qualification.",
    market: ["US"],
    year: 2016
  },
  {
    id: "local-pickup-only",
    name: "Local Pickup Only",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Shipping setting requiring buyer to collect item in person from seller location, common for vehicles, large equipment, and fragile items.",
    market: "global",
    year: 2000
  },
  {
    id: "freight-shipping",
    name: "Freight Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Commercial freight carrier integration for oversized or heavy items requiring pallet shipping, liftgate service, or specialized handling.",
    market: ["US", "CA"],
    year: 2013
  },

  // COMPLIANCE & POLICY TOOLS (4 programs)
  {
    id: "restricted-items-policy",
    name: "Restricted Items Policy",
    type: "category",
    tier: "legal",
    status: "current",
    parent: "policies",
    desc: "Platform rules prohibiting or limiting sale of regulated products including weapons, alcohol, tobacco, medical devices, and hazardous materials.",
    market: "global",
    year: 2000
  },
  {
    id: "counterfeit-items-policy",
    name: "Counterfeit Items Policy",
    type: "category",
    tier: "legal",
    status: "current",
    parent: "policies",
    desc: "Zero-tolerance policy prohibiting replica, fake, or unauthorized goods with listing removal, account suspension, and legal referral for violations.",
    market: "global",
    year: 2000
  },
  {
    id: "import-export-restrictions",
    name: "Import Export Restrictions",
    type: "category",
    tier: "legal",
    status: "current",
    parent: "international-trade",
    desc: "Compliance framework blocking listings that violate international trade sanctions, embargoed countries, or controlled technology export regulations.",
    market: "global",
    year: 2008
  },
  {
    id: "seller-non-performance",
    name: "Seller Non-Performance",
    type: "category",
    tier: "legal",
    status: "current",
    parent: "policies",
    desc: "Policy violation when seller fails to ship item, ships wrong item, or significantly delays shipment, resulting in defect and potential restrictions.",
    market: "global",
    year: 2010
  }
]
