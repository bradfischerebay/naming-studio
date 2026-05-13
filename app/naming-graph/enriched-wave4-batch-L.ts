// eBay Naming Graph - Wave 4 Batch L
// Focus: Performance metrics, seller ratings, feedback tools, reputation features
// Date: 2026-04-17
// Programs: 50

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

export const ENRICHED_WAVE4_L: GraphNode[] = [
  {
    "id": "detailed-seller-ratings",
    "name": "Detailed Seller Ratings",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "seller-performance",
    "desc": "Buyer feedback system measuring sellers across 4 dimensions: item description accuracy, communication, shipping time, and shipping charges. Averaged into 1-5 star ratings visible on seller profiles.",
    "market": "global",
    "year": 2007
  },
  {
    "id": "dsr",
    "name": "DSR",
    "type": "trust",
    "tier": "variant",
    "status": "current",
    "parent": "detailed-seller-ratings",
    "desc": "Acronym for Detailed Seller Ratings. Industry-standard shorthand used in seller forums, help docs, and performance dashboards.",
    "market": "global",
    "year": 2007
  },
  {
    "id": "feedback-score",
    "name": "Feedback Score",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "feedback-system",
    "desc": "Numerical reputation score calculated as (positive feedback - negative feedback). Displayed next to username with color-coded star indicating milestone tiers.",
    "market": "global",
    "year": 1999
  },
  {
    "id": "star-rating",
    "name": "Star Rating",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "feedback-system",
    "desc": "Visual badge system representing feedback score milestones: yellow (10-49), blue (50-99), turquoise (100-499), purple (500-999), red (1000-4999), green (5000-9999), yellow shooting star (10K+).",
    "market": "global",
    "year": 1999
  },
  {
    "id": "feedback-profile",
    "name": "Feedback Profile",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "feedback-system",
    "desc": "Public page displaying seller's feedback score, percentage positive, DSR averages, and buyer comments from past 12 months. Critical trust signal for buyers.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "seller-feedback-profile",
    "name": "Seller Feedback Profile",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "feedback-system",
    "desc": "Seller-specific view of feedback profile with performance metrics, DSR breakdowns, and defect rate tracking for Top Rated Seller qualification.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "positive-feedback-rate",
    "name": "Positive Feedback Rate",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "seller-performance",
    "desc": "Percentage of positive feedback from total feedback received in past 12 months. Must maintain ≥98% for Top Rated Seller status in most categories.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "seller-performance-standards",
    "name": "Seller Performance Standards",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "seller-performance",
    "desc": "3-tier classification system (Below Standard, Above Standard, Top Rated) based on defect rate, late shipment rate, and cases closed without resolution. Determines search placement and fee discounts.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "above-standard",
    "name": "Above Standard",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "seller-performance-standards",
    "desc": "Mid-tier seller performance level indicating good standing. Meets baseline metrics but doesn't qualify for Top Rated benefits. Standard search visibility and fees apply.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "below-standard",
    "name": "Below Standard",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "seller-performance-standards",
    "desc": "Poor seller performance status triggering reduced search visibility, higher fees, and selling restrictions. Occurs when defect rates exceed thresholds (typically >2% transaction defect rate).",
    "market": "global",
    "year": 2008
  },
  {
    "id": "performance-dashboard",
    "name": "Performance Dashboard",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Seller Hub analytics view showing service metrics, defect rates, DSR averages, and performance level. Color-coded health indicators guide improvement actions.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "service-metrics",
    "name": "Service Metrics",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-performance",
    "desc": "Quantitative performance measurements including transaction defect rate, late shipment rate, cases closed without seller resolution, and tracking upload rate.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "transaction-defect-rate",
    "name": "Transaction Defect Rate",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "service-metrics",
    "desc": "Percentage of transactions with defects (cases, low DSRs, negative/neutral feedback) from past 3 months. Must stay <0.5% for Top Rated, <2% to avoid Below Standard.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "bad-buyer-experience-rate",
    "name": "Bad Buyer Experience Rate",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "service-metrics",
    "desc": "Metric tracking negative buyer signals: returns, cases, low DSRs, and negative feedback. Replacement for individual defect metrics in some categories.",
    "market": "US",
    "year": 2020
  },
  {
    "id": "feedback-forum",
    "name": "Feedback Forum",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "community",
    "desc": "Public reputation system where buyers and sellers exchange feedback after transactions. Central trust mechanism displaying positive/negative/neutral ratings and comments.",
    "market": "global",
    "year": 1999
  },
  {
    "id": "feedback-reply",
    "name": "Feedback Reply",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "feedback-forum",
    "desc": "Seller's public response to buyer feedback. Appears below original comment, allowing sellers to address concerns or thank buyers. Cannot be edited or removed once posted.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "feedback-revision",
    "name": "Feedback Revision",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "feedback-forum",
    "desc": "Buyer's ability to change feedback rating/comment within 30 days if issue resolved. Sellers can request revision but cannot force changes.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "feedback-revision-request",
    "name": "Feedback Revision Request",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "feedback-revision",
    "desc": "Formal seller tool to ask buyer to revise negative/neutral feedback after resolving issue. Sent via eBay messaging with 10-day response window.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "request-feedback-revision",
    "name": "Request Feedback Revision",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "feedback-revision-request",
    "desc": "Action button in Seller Hub allowing sellers to initiate feedback revision request. Same functionality as Feedback Revision Request.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "mutual-feedback-withdrawal",
    "name": "Mutual Feedback Withdrawal",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "feedback-forum",
    "desc": "Process where both parties agree to retract feedback. Both feedbacks removed entirely, not just changed. Requires mutual consent via eBay's agreement process.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "positive-feedback",
    "name": "Positive Feedback",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "feedback-forum",
    "desc": "Favorable rating (+1 to feedback score) with optional comment. Green indicator. Standard for satisfactory transactions representing 98%+ of all feedback.",
    "market": "global",
    "year": 1999
  },
  {
    "id": "negative-feedback",
    "name": "Negative Feedback",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "feedback-forum",
    "desc": "Unfavorable rating (-1 to feedback score) with required comment. Red indicator. Triggers seller performance alerts and may affect search placement.",
    "market": "global",
    "year": 1999
  },
  {
    "id": "neutral-feedback",
    "name": "Neutral Feedback",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "feedback-forum",
    "desc": "Mixed rating (0 to feedback score) with optional comment. Yellow indicator. Often used when transaction acceptable but not ideal.",
    "market": "global",
    "year": 1999
  },
  {
    "id": "low-feedback-score",
    "name": "Low Feedback Score",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer-requirements",
    "desc": "Buyer restriction setting allowing sellers to block bidders/buyers with feedback score below specified threshold (e.g., <10). Reduces fraud risk from new accounts.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "product-reviews",
    "name": "Product Reviews",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Item-level ratings and reviews separate from seller feedback. Aggregated across all sellers offering same product, helping buyers evaluate product quality vs seller service.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "verified-purchase",
    "name": "Verified Purchase",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "product-reviews",
    "desc": "Badge on product reviews indicating reviewer bought item on eBay. Increases review credibility vs non-purchase reviews.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "impressions",
    "name": "Impressions",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-analytics",
    "desc": "Number of times listing appeared in search results or category browsing. Top-of-funnel metric indicating visibility reach.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "page-views",
    "name": "Page Views",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-analytics",
    "desc": "Number of times buyers clicked to view full listing details. Mid-funnel metric indicating buyer interest level.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "click-through-rate",
    "name": "Click-Through Rate",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-analytics",
    "desc": "Percentage of impressions resulting in page views (Views/Impressions). Measures listing thumbnail/title effectiveness in search results.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "watchers",
    "name": "Watchers",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-analytics",
    "desc": "Buyers who added listing to watch list for tracking. Strong buying intent signal. Sellers can send targeted offers to watchers.",
    "market": "global",
    "year": 2001
  },
  {
    "id": "watch-count",
    "name": "Watch Count",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "watchers",
    "desc": "Numerical count of watchers displayed on listing page. Visible to all buyers as social proof indicator of item popularity.",
    "market": "global",
    "year": 2001
  },
  {
    "id": "traffic-report",
    "name": "Traffic Report",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Analytics showing impressions, page views, and watcher trends over time. Helps sellers optimize listings for visibility.",
    "market": "global",
    "year": 2006
  },
  {
    "id": "sales-report",
    "name": "Sales Report",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Financial summary showing sold items, total sales, fees, and net proceeds. Filterable by date range, category, and format.",
    "market": "global",
    "year": 2004
  },
  {
    "id": "sales-conversion-rate",
    "name": "Sales Conversion Rate",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-analytics",
    "desc": "Percentage of page views resulting in sales (Sales/Views). Key performance indicator for listing quality and pricing effectiveness.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "listing-analytics",
    "name": "Listing Analytics",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Performance metrics dashboard showing impressions, views, watchers, and sales for each listing. Accessed via Seller Hub listing management.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "transaction-report",
    "name": "Transaction Report",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Detailed log of all sales transactions with buyer info, sale price, fees, and payout amounts. Exportable to CSV for accounting.",
    "market": "global",
    "year": 2004
  },
  {
    "id": "order-report",
    "name": "Order Report",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Fulfillment-focused report showing orders awaiting shipment, tracking status, and estimated delivery dates. Prioritizes action items.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "listing-quality-report",
    "name": "Listing Quality Report",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Diagnostic tool identifying listings with incomplete item specifics, missing photos, or poor descriptions affecting search placement.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "sell-through-rate",
    "name": "Sell-Through Rate",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-analytics",
    "desc": "Percentage of listings resulting in sales within duration period. Indicates pricing and demand accuracy for inventory planning.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "top-rated-seller",
    "name": "Top Rated Seller",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "seller-performance-standards",
    "desc": "Elite seller status badge earned by maintaining ≥98% positive feedback, <0.5% defect rate, and 100+ transactions in past year. Earns 10% final value fee discount and search boost.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "top-rated-plus",
    "name": "Top Rated Plus",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "top-rated-seller",
    "desc": "Premium listing badge earned by Top Rated Sellers offering 1-day handling, 30-day returns, and US-based items. Ribbon appears in search results driving higher click-through.",
    "market": ["US", "CA"],
    "year": 2011
  },
  {
    "id": "top-rated-seller-status",
    "name": "Top Rated Seller Status",
    "type": "trust",
    "tier": "variant",
    "status": "current",
    "parent": "top-rated-seller",
    "desc": "Alternative name for Top Rated Seller program used in help documentation and seller communications. Same qualification criteria and benefits.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "seller-reputation",
    "name": "Seller Reputation",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "feedback-system",
    "desc": "Composite trust score combining feedback score, percentage positive, DSR averages, and performance level. Core buyer decision factor displayed on all listings.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "performance-evaluation",
    "name": "Performance Evaluation",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-performance",
    "desc": "Monthly assessment of service metrics determining seller performance level (Below/Above/Top Rated). Triggers notifications for at-risk sellers.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "customer-service-metrics",
    "name": "Customer Service Metrics",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "service-metrics",
    "desc": "Performance indicators for post-sale support: message response time, return request handling speed, and case resolution rate.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "seller-levels",
    "name": "Seller Levels",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "seller-performance-standards",
    "desc": "Tiered seller classification system (Below Standard, Above Standard, Top Rated) determining fee rates, search visibility, and selling limits.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "reply-to-feedback",
    "name": "Reply to Feedback",
    "type": "category",
    "tier": "variant",
    "status": "current",
    "parent": "feedback-reply",
    "desc": "Alternative name for Feedback Reply feature. Same functionality allowing sellers to publicly respond to buyer feedback.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "feedback-removal",
    "name": "Feedback Removal",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "feedback-forum",
    "desc": "eBay-initiated removal of feedback violating policies (profanity, personal info, extortion). Sellers cannot directly remove buyer feedback except via mutual withdrawal.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "feedback-star",
    "name": "Feedback Star",
    "type": "trust",
    "tier": "variant",
    "status": "current",
    "parent": "star-rating",
    "desc": "Visual icon representing feedback score milestone tier. Color changes at achievement levels: 10 (yellow), 50 (blue), 100 (turquoise), 500 (purple), 1000+ (red/green/shooting star).",
    "market": "global",
    "year": 1999
  },
  {
    "id": "review-offers",
    "name": "Review Offers",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "product-reviews",
    "desc": "Automated email campaign asking buyers to leave product reviews 7-14 days after delivery. Increases review volume for better product catalog data.",
    "market": "global",
    "year": 2015
  }
]
