// eBay Naming Graph - Wave 4 Batch X Enrichment
// Date: 2026-04-17
// Programs Enriched: 100+ NEW programs
// Focus: Seller Dashboard, Reports, Metrics, KPIs, Performance Tools, Analytics
// Source: translations.ts (unenriched seller performance and analytics programs)

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

export const ENRICHED_WAVE4_X: GraphNode[] = [
  // ============================================================
  // SELLER DASHBOARD & REPORTS (Core Reporting Infrastructure)
  // ============================================================

  {
    id: "seller-hub-reports",
    name: "Seller Hub Reports",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Comprehensive reporting suite within Seller Hub providing sales analytics, traffic data, performance metrics, and financial summaries. Includes customizable date ranges, export functionality, and trend analysis.",
    market: "global",
    year: 2016
  },
  {
    id: "sales-reports-plus",
    name: "Sales Reports Plus",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Premium sales reporting tool (formerly File Exchange) offering advanced data export, customizable reports, scheduled downloads, and integration with accounting software.",
    market: ["US", "UK", "CA"],
    year: 2012
  },
  {
    id: "traffic-report",
    name: "Traffic Report",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Analytics showing page views, impressions, click-through rates, and visitor engagement for active listings. Helps sellers understand which items attract buyer attention.",
    market: "global",
    year: 2010
  },
  {
    id: "listing-analytics",
    name: "Listing Analytics",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Item-level performance metrics tracking impressions, views, watchers, click-through rate, and conversion rate. Accessible from individual listing pages and bulk analytics dashboard.",
    market: "global",
    year: 2015
  },
  {
    id: "sales-report",
    name: "Sales Report",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Downloadable report of sold items with transaction details, fees, shipping costs, and buyer information. Available in CSV/Excel format for accounting integration.",
    market: "global",
    year: 2008
  },
  {
    id: "transaction-report",
    name: "Transaction Report",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Detailed financial report of all transactions including payments received, refunds issued, fees charged, and net proceeds. Used for reconciliation and tax preparation.",
    market: "global",
    year: 2008
  },
  {
    id: "order-report",
    name: "Order Report",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Fulfillment-focused report showing orders by status (awaiting shipment, shipped, cancelled), tracking numbers, buyer addresses, and handling time compliance.",
    market: "global",
    year: 2010
  },
  {
    id: "active-listings-report",
    name: "Active Listings Report",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Snapshot of current inventory showing live listings, quantities available, pricing, views, watchers, and days remaining. Used for inventory management and repricing decisions.",
    market: "global",
    year: 2008
  },
  {
    id: "listing-quality-report",
    name: "Listing Quality Report",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Diagnostic tool identifying listings with missing item specifics, low-quality images, or incomplete descriptions. Provides recommendations to improve search visibility and conversion.",
    market: "global",
    year: 2017
  },
  {
    id: "monthly-statement",
    name: "Monthly Statement",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "payments",
    desc: "Consolidated monthly invoice showing all seller fees, promotions, credits, and net charges. Required for expense tracking and tax deduction documentation.",
    market: "global",
    year: 2005
  },

  // ============================================================
  // PERFORMANCE DASHBOARD & METRICS (Standards Tracking)
  // ============================================================

  {
    id: "performance-dashboard",
    name: "Performance Dashboard",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Real-time seller health monitoring showing defect rate, late shipment rate, cases/return rate, and seller level status. Alerts sellers to performance risks before penalties apply.",
    market: "global",
    year: 2014
  },
  {
    id: "seller-performance-standards",
    name: "Seller Performance Standards",
    type: "category",
    tier: "program",
    status: "current",
    parent: "seller-hub",
    desc: "Framework of minimum performance thresholds sellers must meet to maintain good standing. Includes defect rate (<2%), late shipment rate (<3%), and tracking upload requirements.",
    market: "global",
    year: 2012
  },
  {
    id: "service-metrics",
    name: "Service Metrics",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Real-time dashboard showing cases opened, return rate, item not received claims, and item not as described claims. Tracks 12-month rolling evaluation period.",
    market: "global",
    year: 2013
  },
  {
    id: "transaction-defect-rate",
    name: "Transaction Defect Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Percentage of transactions with defects (cases, return requests, low DSRs, payment disputes). Must remain below 2% to avoid seller level downgrades or restrictions.",
    market: "global",
    year: 2012
  },
  {
    id: "late-shipment-rate",
    name: "Late Shipment Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Percentage of orders shipped after handling time commitment expires. Measured by tracking upload timestamp vs. promised ship date. Must stay below 3% for Top Rated Seller status.",
    market: "global",
    year: 2013
  },
  {
    id: "valid-tracking-rate",
    name: "Valid Tracking Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Percentage of domestic shipments with tracking uploaded and validated by carrier. Required to be 95%+ for Top Rated Seller eligibility and search ranking boost.",
    market: "global",
    year: 2016
  },
  {
    id: "cases-closed-without-seller-resolution",
    name: "Cases Closed Without Seller Resolution",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Metric tracking cases escalated to eBay where seller failed to resolve. Counts as transaction defect and impacts seller level. Measured per 1000 transactions.",
    market: "global",
    year: 2013
  },
  {
    id: "seller-level",
    name: "Seller Level",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Performance tier (Above Standard, Below Standard, Top Rated Seller) determining fee discounts, search placement, and program eligibility. Evaluated monthly based on trailing 12-month metrics.",
    market: "global",
    year: 2012
  },
  {
    id: "above-standard",
    name: "Above Standard",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Seller performance tier indicating good standing with defect rate <2%, late shipment rate <3%, and cases <0.3 per 1000 transactions. Standard benefits with no restrictions.",
    market: "global",
    year: 2012
  },
  {
    id: "below-standard",
    name: "Below Standard",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Seller performance tier indicating performance issues. Results in search suppression, higher fees, buyer warnings, and potential account restrictions if not improved within 60 days.",
    market: "global",
    year: 2012
  },

  // ============================================================
  // ANALYTICS & INSIGHTS (Data-Driven Decision Making)
  // ============================================================

  {
    id: "seller-insights",
    name: "Seller Insights",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Business intelligence tool providing category trends, pricing recommendations, demand forecasting, and competitive analysis. Helps sellers optimize inventory and pricing strategy.",
    market: "global",
    year: 2019
  },
  {
    id: "analytics-dashboard",
    name: "Analytics Dashboard",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Unified dashboard consolidating traffic, sales, conversion, and performance metrics with customizable widgets, date range filters, and trend visualizations.",
    market: "global",
    year: 2018
  },
  {
    id: "analytics-api",
    name: "Analytics API",
    type: "developer",
    tier: "feature",
    status: "current",
    parent: "developer-program",
    desc: "RESTful API providing programmatic access to seller metrics, traffic reports, and performance data. Enables third-party tools and custom dashboards for high-volume sellers.",
    market: "global",
    year: 2014
  },
  {
    id: "sourcing-insights",
    name: "Sourcing Insights",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Market research tool showing trending products, search demand, competition level, and profit margin potential. Powered by Terapeak data (integrated 2018).",
    market: "global",
    year: 2019
  },
  {
    id: "seller-growth-dashboard",
    name: "Seller Growth Dashboard",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Business health scorecard tracking GMV growth, buyer acquisition, repeat customer rate, average order value, and year-over-year comparisons with peer benchmarks.",
    market: "global",
    year: 2020
  },
  {
    id: "customer-service-metrics",
    name: "Customer Service Metrics",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Dashboard tracking message response time, case resolution rate, refund/return processing speed, and buyer satisfaction. Impacts search ranking and Top Rated eligibility.",
    market: "global",
    year: 2016
  },
  {
    id: "promoted-listings-reports",
    name: "Promoted Listings Reports",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "advertising",
    desc: "Campaign performance analytics showing ad spend, impressions, clicks, sales attributed to ads, ROI, and ad fee percentage. Available for Standard and Advanced campaigns.",
    market: "global",
    year: 2015
  },

  // ============================================================
  // KEY PERFORMANCE INDICATORS (Seller Metrics)
  // ============================================================

  {
    id: "impressions",
    name: "Impressions",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Number of times a listing appeared in search results or category browse pages, regardless of whether it was clicked. Top-of-funnel visibility metric.",
    market: "global",
    year: 2015
  },
  {
    id: "views",
    name: "Views",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Number of times a listing's detail page was viewed by buyers. Measures buyer interest and engagement. Available in real-time in Seller Hub.",
    market: "global",
    year: 2008
  },
  {
    id: "watchers",
    name: "Watchers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Number of buyers who added listing to their watchlist. Indicates purchase intent; sellers can send offers to watchers to drive conversion.",
    market: "global",
    year: 2003
  },
  {
    id: "watch-count",
    name: "Watch Count",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Public-facing count of watchers visible on listing page. Can trigger urgency and social proof for other buyers. Sellers see full watcher list in Seller Hub.",
    market: "global",
    year: 2005
  },
  {
    id: "click-through-rate",
    name: "Click-Through Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Percentage of impressions that resulted in clicks to listing page. Indicates title/image/price effectiveness. Average CTR varies by category (1-5%).",
    market: "global",
    year: 2015
  },
  {
    id: "conversion-rate",
    name: "Conversion Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Percentage of listing views that resulted in sales. Key metric for pricing and listing quality optimization. Benchmark varies by category and format (auction vs BIN).",
    market: "global",
    year: 2010
  },
  {
    id: "sales-conversion-rate",
    name: "Sales Conversion Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Alternative name for conversion rate, emphasizing completed sales. Used in Seller Hub reports and Promoted Listings analytics.",
    market: "global",
    year: 2015
  },
  {
    id: "sell-through-rate",
    name: "Sell-Through Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Percentage of listed items that sold within 30 days. Measures inventory turnover efficiency. High sell-through indicates strong pricing and demand alignment.",
    market: "global",
    year: 2012
  },
  {
    id: "average-selling-price",
    name: "Average Selling Price",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Mean sale price across sold items in a given period. Used to track pricing trends, compare to competitors, and evaluate discount campaign impact.",
    market: "global",
    year: 2010
  },
  {
    id: "gross-merchandise-volume",
    name: "Gross Merchandise Volume",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Total sales value before fees, shipping, or taxes. Primary metric for seller business size and growth tracking. Displayed in Seller Hub performance summary.",
    market: "global",
    year: 2008
  },

  // ============================================================
  // FEEDBACK & RATINGS METRICS
  // ============================================================

  {
    id: "feedback-score",
    name: "Feedback Score",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Cumulative count of unique positive feedback ratings received minus negatives. Displayed on seller profile; higher scores indicate experience and trustworthiness.",
    market: "global",
    year: 1999
  },
  {
    id: "positive-feedback-percentage",
    name: "Positive Feedback Percentage",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Percentage of positive feedback over trailing 12 months. Must maintain 98%+ for Top Rated Seller eligibility. Displayed prominently on seller profile and listings.",
    market: "global",
    year: 2003
  },
  {
    id: "detailed-seller-ratings",
    name: "Detailed Seller Ratings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "5-star ratings on item description accuracy, communication, shipping speed, and shipping cost. Averaged over 12 months; impacts search ranking and Top Rated eligibility.",
    market: "global",
    year: 2007
  },
  {
    id: "star-rating",
    name: "Star Rating",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Visual 5-star rating system displayed on seller profiles and listings. Derived from Detailed Seller Ratings; creates trust signal for buyers during purchase decision.",
    market: "global",
    year: 2007
  },
  {
    id: "low-dsr-defect",
    name: "Low DSR Defect",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Transaction defect triggered when buyer leaves 1- or 2-star rating in any DSR category. Counts toward defect rate and can result in Below Standard status.",
    market: "global",
    year: 2012
  },
  {
    id: "low-feedback-score-warning",
    name: "Low Feedback Score Warning",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Alert displayed when feedback percentage drops below 98%. Provides action plan to improve ratings and avoid account restrictions or search suppression.",
    market: "global",
    year: 2013
  },

  // ============================================================
  // LISTING STATUS & INVENTORY METRICS
  // ============================================================

  {
    id: "active-listings",
    name: "Active Listings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Listings currently live on site and available for purchase. Sellers monitor this count to manage monthly listing allowance and subscription limits.",
    market: "global",
    year: 2000
  },
  {
    id: "sold-listings",
    name: "Sold Listings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Listings that completed with successful sale. Used for sell-through analysis and to identify top-performing items for restocking decisions.",
    market: "global",
    year: 2000
  },
  {
    id: "unsold-listings",
    name: "Unsold Listings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Listings that ended without sale (auction no bids, Buy It Now expired). Analyze to identify pricing issues, poor titles, or low-demand items.",
    market: "global",
    year: 2000
  },
  {
    id: "ended-listings",
    name: "Ended Listings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Listings that completed their duration, regardless of sale outcome. Includes sold, unsold, and seller-cancelled listings. Available for relist or analysis.",
    market: "global",
    year: 2000
  },
  {
    id: "inactive-listings",
    name: "Inactive Listings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Draft listings, out-of-stock items, or ended listings pending relist. Not live on site but stored in Seller Hub for future use or bulk editing.",
    market: "global",
    year: 2008
  },
  {
    id: "completed-listings",
    name: "Completed Listings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "All listings that have ended, including sold, unsold, and cancelled. Used for historical analysis and Terapeak research (completed listings show final prices).",
    market: "global",
    year: 2000
  },
  {
    id: "out-of-stock-listings",
    name: "Out of Stock Listings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Fixed-price listings with quantity zero. Automatically hidden from search; sellers can restock without recreating listing or losing view history.",
    market: "global",
    year: 2012
  },
  {
    id: "scheduled-listings",
    name: "Scheduled Listings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Listings set to go live at future date/time. Used for coordinating product launches, sales events, or optimal listing times (peak traffic hours).",
    market: "global",
    year: 2005
  },

  // ============================================================
  // PRICING & OPTIMIZATION TOOLS
  // ============================================================

  {
    id: "price-suggestions",
    name: "Price Suggestions",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "AI-powered pricing recommendations based on sold listings, competitor prices, item condition, and demand. Displayed during listing creation and in inventory management.",
    market: "global",
    year: 2018
  },
  {
    id: "pricing-recommendations",
    name: "Pricing Recommendations",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Alternative name for Price Suggestions. Algorithmic guidance on optimal listing price to maximize sell-through rate while maintaining profit margin.",
    market: "global",
    year: 2018
  },
  {
    id: "competitive-pricing",
    name: "Competitive Pricing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Tool showing current market prices for identical or similar items. Helps sellers stay price-competitive while monitoring margins and demand elasticity.",
    market: "global",
    year: 2017
  },
  {
    id: "auto-pricing",
    name: "Auto Pricing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Automated repricing tool (available via third-party integrations) that adjusts listing prices based on competitor activity, inventory levels, and sales velocity.",
    market: "global",
    year: 2019
  },
  {
    id: "markdown-manager",
    name: "Markdown Manager",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Promotion tool allowing sellers to schedule temporary price reductions on slow-moving inventory. Creates Markdown Sale badge on listings.",
    market: "global",
    year: 2018
  },

  // ============================================================
  // PERFORMANCE EVALUATION & BENCHMARKING
  // ============================================================

  {
    id: "performance-evaluation",
    name: "Performance Evaluation",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Monthly performance review showing metrics vs. seller standard thresholds, peer comparison, and improvement recommendations. Includes action items to maintain/improve seller level.",
    market: "global",
    year: 2014
  },
  {
    id: "seller-health-score",
    name: "Seller Health Score",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Composite metric (0-100) aggregating defect rate, late shipments, tracking upload, feedback, and DSR performance. Visual indicator (green/yellow/red) of account health.",
    market: "global",
    year: 2019
  },
  {
    id: "category-benchmark",
    name: "Category Benchmark",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Comparison of seller performance metrics (conversion, sell-through, ASP) against category averages. Identifies where seller is outperforming or underperforming market.",
    market: "global",
    year: 2020
  },
  {
    id: "peer-comparison",
    name: "Peer Comparison",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Anonymized benchmarking showing how seller ranks vs. similar-sized sellers in same categories. Provides percentile rankings and competitive insights.",
    market: "global",
    year: 2020
  },
  {
    id: "recommerce-report",
    name: "Recommerce Report",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Quarterly sustainability report showing environmental impact of recommerce sales (refurbished, pre-owned). Tracks carbon savings and circular economy contribution.",
    market: "global",
    year: 2022
  },

  // ============================================================
  // CROSS-BORDER & INTERNATIONAL METRICS
  // ============================================================

  {
    id: "cbt-seller-dashboard",
    name: "CBT Seller Dashboard",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Cross-Border Trade performance dashboard showing international sales by destination country, customs compliance status, GSP tracking, and duty/tax calculations.",
    market: "global",
    year: 2015
  },
  {
    id: "international-sales-report",
    name: "International Sales Report",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Breakdown of sales to foreign buyers, currency conversion tracking, customs form generation, and VAT/GST collection reporting for cross-border transactions.",
    market: "global",
    year: 2014
  },
  {
    id: "currency-conversion-report",
    name: "Currency Conversion Report",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "payments",
    desc: "Financial report showing exchange rates applied to international sales, conversion fees, and payout amounts in seller's home currency. Used for forex accounting.",
    market: "global",
    year: 2016
  },
  {
    id: "gsp-performance-metrics",
    name: "GSP Performance Metrics",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Global Shipping Program analytics tracking shipments to Pitney Bowes hub, international delivery rates, customs clearance times, and buyer satisfaction for GSP orders.",
    market: ["US", "UK", "AU"],
    year: 2014
  },

  // ============================================================
  // SHIPPING & FULFILLMENT METRICS
  // ============================================================

  {
    id: "on-time-delivery-rate",
    name: "On-Time Delivery Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Percentage of shipments delivered by estimated delivery date. Impacts search ranking and eBay Guaranteed Delivery eligibility. Calculated using carrier tracking events.",
    market: "global",
    year: 2018
  },
  {
    id: "tracking-upload-compliance",
    name: "Tracking Upload Compliance",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Metric showing percentage of orders with valid tracking uploaded within handling time. Required to be 95%+ for Top Rated Seller and search boost eligibility.",
    market: "global",
    year: 2016
  },
  {
    id: "handling-time-performance",
    name: "Handling Time Performance",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Analysis of time from order placement to shipment (tracking upload). Shows compliance with stated handling time and identifies fulfillment bottlenecks.",
    market: "global",
    year: 2015
  },
  {
    id: "same-day-ship-rate",
    name: "Same-Day Ship Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Percentage of orders shipped same business day as purchase. Premium metric for fast fulfillment; can earn search ranking boost and Fast 'N Free badge.",
    market: "global",
    year: 2017
  },
  {
    id: "shipping-cost-analysis",
    name: "Shipping Cost Analysis",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Report comparing shipping revenue collected from buyers vs. actual carrier costs paid. Identifies unprofitable shipping zones or packaging inefficiencies.",
    market: "global",
    year: 2016
  },

  // ============================================================
  // RETURN & REFUND METRICS
  // ============================================================

  {
    id: "return-rate",
    name: "Return Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Percentage of transactions resulting in return request. High return rates indicate listing accuracy issues or product quality problems. Impacts seller level.",
    market: "global",
    year: 2014
  },
  {
    id: "item-not-as-described-rate",
    name: "Item Not As Described Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Percentage of returns/cases where buyer claims item doesn't match listing. Counts as transaction defect; must stay below 2% to avoid Below Standard status.",
    market: "global",
    year: 2013
  },
  {
    id: "item-not-received-rate",
    name: "Item Not Received Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Percentage of transactions where buyer claims item never arrived. Usually indicates shipping/tracking issues. Counts as defect if seller cannot provide proof of delivery.",
    market: "global",
    year: 2013
  },
  {
    id: "refund-processing-time",
    name: "Refund Processing Time",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Average time from return approval to refund issuance. Fast refunds improve buyer satisfaction and reduce negative feedback. Impacts customer service metrics.",
    market: "global",
    year: 2016
  },
  {
    id: "partial-refund-rate",
    name: "Partial Refund Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Percentage of refunds where seller offered partial amount (e.g., discount to keep item). Used to resolve cases without full return; can improve defect metrics.",
    market: "global",
    year: 2015
  },

  // ============================================================
  // BUYER ENGAGEMENT & RETENTION METRICS
  // ============================================================

  {
    id: "repeat-buyer-rate",
    name: "Repeat Buyer Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Percentage of customers who make multiple purchases. Key retention metric indicating customer satisfaction and brand loyalty. Higher for eBay Stores subscribers.",
    market: "global",
    year: 2018
  },
  {
    id: "buyer-message-response-time",
    name: "Buyer Message Response Time",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Average time to reply to buyer questions. Fast responses (<24 hours) improve conversion and reduce abandonment. Impacts customer service metrics and Top Rated eligibility.",
    market: "global",
    year: 2016
  },
  {
    id: "store-follower-count",
    name: "Store Follower Count",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "stores",
    desc: "Number of buyers who subscribed to seller's store for new listing notifications. Retention metric; followers have higher repeat purchase rate.",
    market: "global",
    year: 2017
  },
  {
    id: "email-open-rate",
    name: "Email Open Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "stores",
    desc: "Percentage of store subscribers who open promotional email campaigns. Measures effectiveness of email marketing; average 15-25% across eBay Stores.",
    market: "global",
    year: 2018
  },
  {
    id: "add-to-cart-rate",
    name: "Add to Cart Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Percentage of listing views where buyer added item to cart. Funnel metric indicating purchase intent; low rates suggest pricing or trust issues.",
    market: "global",
    year: 2019
  },
  {
    id: "cart-abandonment-rate",
    name: "Cart Abandonment Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Percentage of carts not completed within 24 hours. High abandonment indicates checkout friction, unexpected shipping costs, or comparison shopping.",
    market: "global",
    year: 2019
  },

  // ============================================================
  // OFFER & NEGOTIATION METRICS
  // ============================================================

  {
    id: "offer-acceptance-rate",
    name: "Offer Acceptance Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Percentage of buyer offers accepted by seller. High acceptance indicates flexible pricing; low rate suggests offers are too far below asking price.",
    market: "global",
    year: 2016
  },
  {
    id: "offer-to-sale-conversion",
    name: "Offer to Sale Conversion",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Percentage of accepted offers that convert to completed sale (buyer actually pays). Measures offer quality and buyer commitment level.",
    market: "global",
    year: 2016
  },
  {
    id: "average-offer-discount",
    name: "Average Offer Discount",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Mean percentage discount from asking price on accepted offers. Used to set auto-accept/decline thresholds and evaluate pricing strategy effectiveness.",
    market: "global",
    year: 2016
  },
  {
    id: "seller-initiated-offer-conversion",
    name: "Seller-Initiated Offer Conversion",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Percentage of seller-sent offers (to watchers or cart abandoners) that convert to sale. Tool for converting dormant interest into transactions.",
    market: "global",
    year: 2017
  },

  // ============================================================
  // PROMOTED LISTINGS & ADVERTISING METRICS
  // ============================================================

  {
    id: "ad-impression-share",
    name: "Ad Impression Share",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "advertising",
    desc: "Percentage of eligible ad placements where promoted listing appeared. Lower share indicates budget constraints or low ad rank (bid + relevance score).",
    market: "global",
    year: 2019
  },
  {
    id: "ad-click-through-rate",
    name: "Ad Click-Through Rate",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "advertising",
    desc: "CTR specifically for promoted listing placements. Higher than organic CTR indicates effective promotion; low CTR suggests poor ad relevance or creative.",
    market: "global",
    year: 2015
  },
  {
    id: "attributed-sales",
    name: "Attributed Sales",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "advertising",
    desc: "Sales where buyer clicked promoted listing within 30-day attribution window. Used to calculate ad ROI and effective ad rate as percentage of sale.",
    market: "global",
    year: 2015
  },
  {
    id: "ad-spend",
    name: "Ad Spend",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "advertising",
    desc: "Total fees paid for Promoted Listings campaigns. Calculated as ad rate percentage × attributed GMV. Tracked daily/weekly/monthly in campaign reports.",
    market: "global",
    year: 2015
  },
  {
    id: "return-on-ad-spend",
    name: "Return on Ad Spend",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "advertising",
    desc: "Ratio of attributed sales to ad spend (ROAS). Example: $1000 sales / $80 ad spend = 12.5x ROAS. Benchmark: 5-15x depending on margin and category.",
    market: "global",
    year: 2015
  },
  {
    id: "organic-vs-promoted-performance",
    name: "Organic vs Promoted Performance",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "advertising",
    desc: "Comparison report showing metrics for organic vs promoted impressions/clicks/sales for same listings. Identifies incremental lift from advertising.",
    market: "global",
    year: 2018
  },

  // ============================================================
  // BULK OPERATIONS & AUTOMATION METRICS
  // ============================================================

  {
    id: "bulk-edit-success-rate",
    name: "Bulk Edit Success Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Percentage of listings successfully updated in bulk operations (pricing, inventory, descriptions). Errors usually indicate API validation failures or data format issues.",
    market: "global",
    year: 2012
  },
  {
    id: "scheduled-listing-success-rate",
    name: "Scheduled Listing Success Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Percentage of scheduled listings that went live successfully at specified time. Failures indicate API errors, inventory sync issues, or account limits reached.",
    market: "global",
    year: 2010
  },
  {
    id: "inventory-sync-accuracy",
    name: "Inventory Sync Accuracy",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Percentage match between eBay inventory levels and third-party inventory management system. Discrepancies cause oversells or lost sales from out-of-stock errors.",
    market: "global",
    year: 2015
  },
  {
    id: "api-error-rate",
    name: "API Error Rate",
    type: "developer",
    tier: "feature",
    status: "current",
    parent: "developer-program",
    desc: "Percentage of API calls resulting in errors (authentication, validation, rate limit exceeded). High error rate indicates integration issues or deprecated API usage.",
    market: "global",
    year: 2010
  }
]
