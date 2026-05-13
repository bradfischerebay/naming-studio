// eBay Naming Graph - Knowledge Graph Data Model
// Enhanced with multiple relationship types
// Generated: 2026-04-20

export type RelationshipType =
  | 'renamed_from'      // This program was renamed from another
  | 'renamed_to'        // This program was renamed to another
  | 'replaced_by'       // This program was deprecated and replaced by another
  | 'replaces'          // This program replaces/deprecates another
  | 'related_to'        // General semantic relationship
  | 'integrates_with'   // Technical integration between programs
  | 'competes_with'     // Internal competition or alternative
  | 'depends_on'        // Technical or business dependency
  | 'parent'            // Hierarchical parent relationship (existing)
  | 'child';            // Hierarchical child relationship (reverse of parent)

export interface GraphRelationship {
  target: string;           // target node id
  type: RelationshipType;
  year?: number;            // when the relationship was established
  desc?: string;            // context about the relationship
  bidirectional?: boolean;  // if true, shows arrow on both ends
}

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
  released?: string    // ISO date string: YYYY, YYYY-MM, or YYYY-MM-DD (more precise than year)
  translations?: Record<string, string>
  relationships?: GraphRelationship[]  // structured relationship types
  sourceUrl?: string  // source URL for verification (pages.ebay.com, help.ebay.com, etc.)
}

// Helper function to get all links including new relationship types
export interface GraphLink {
  source: string;
  target: string;
  type: RelationshipType;
  year?: number;
  desc?: string;
  bidirectional?: boolean;
}

export function generateLinks(nodes: GraphNode[]): GraphLink[] {
  const links: GraphLink[] = [];

  nodes.forEach(node => {
    // Parent-child hierarchical links (existing)
    if (node.parent) {
      links.push({
        source: node.parent,
        target: node.id,
        type: 'parent',
      });
    }

    // New relationship types
    if (node.relationships) {
      node.relationships.forEach(rel => {
        links.push({
          source: node.id,
          target: rel.target,
          type: rel.type,
          year: rel.year,
          desc: rel.desc,
          bidirectional: rel.bidirectional,
        });
      });
    }

    // Legacy renamedFrom/renamedTo support (convert to new relationship format)
    if (node.renamedFrom) {
      links.push({
        source: node.renamedFrom,
        target: node.id,
        type: 'renamed_to',
        year: node.year,
        desc: `${node.renamedFrom} was renamed to ${node.name}`,
      });
    }

    if (node.renamedTo) {
      links.push({
        source: node.id,
        target: node.renamedTo,
        type: 'renamed_to',
        year: node.year,
        desc: `${node.name} was renamed to ${node.renamedTo}`,
      });
    }
  });

  return links;
}

// Link styling configuration
export const LINK_STYLES: Record<RelationshipType, {
  color: string;
  dashArray?: string;
  width: number;
  label: string;
  opacity: number;
}> = {
  parent: {
    color: '#cccccc',
    width: 1,
    label: 'Parent',
    opacity: 0.6,
  },
  child: {
    color: '#cccccc',
    width: 1,
    label: 'Child',
    opacity: 0.6,
  },
  renamed_from: {
    color: '#f5af02',
    dashArray: '4,2',
    width: 2,
    label: 'Renamed From',
    opacity: 0.8,
  },
  renamed_to: {
    color: '#f5af02',
    dashArray: '4,2',
    width: 2,
    label: 'Renamed To',
    opacity: 0.8,
  },
  replaced_by: {
    color: '#e53238',
    dashArray: '6,3',
    width: 2,
    label: 'Replaced By',
    opacity: 0.8,
  },
  replaces: {
    color: '#e53238',
    dashArray: '6,3',
    width: 2,
    label: 'Replaces',
    opacity: 0.8,
  },
  related_to: {
    color: '#9b59b6',
    dashArray: '2,2',
    width: 1,
    label: 'Related To',
    opacity: 0.5,
  },
  integrates_with: {
    color: '#0064d2',
    width: 2,
    label: 'Integrates With',
    opacity: 0.7,
  },
  competes_with: {
    color: '#ff6b6b',
    dashArray: '3,3',
    width: 1.5,
    label: 'Competes With',
    opacity: 0.6,
  },
  depends_on: {
    color: '#86b817',
    width: 1.5,
    label: 'Depends On',
    opacity: 0.7,
  },
};

// Node color mappings (existing)
export const NODE_COLORS = {
  masterbrand: "#e53238",
  category: "#0064d2",
  advertising: "#f5af02",
  trust: "#86b817",
  impact: "#00a3e0",
  developer: "#9b59b6",
  regional: "#ff6b6b",
  legacy: "#888888",
  renamed: "#f5af02",
};

export function getNodeColor(node: GraphNode): string {
  if (node.status === "legacy") return NODE_COLORS.legacy;
  if (node.status === "renamed") return NODE_COLORS.renamed;
  return NODE_COLORS[node.type] || NODE_COLORS.category;
}

export function getNodeSize(node: GraphNode): number {
  if (node.tier === "master") return 20;
  if (node.tier === "umbrella") return 14;
  if (node.tier === "t1") return 10;
  if (node.tier === "t2") return 8;
  return 6;
}

export function getGraphStats(nodes: GraphNode[] = ENRICHED_PROGRAMS) {
  const stats = {
    total: nodes.length,
    current: nodes.filter(n => n.status === "current").length,
    legacy: nodes.filter(n => n.status === "legacy").length,
    renamed: nodes.filter(n => n.status === "renamed").length,
    withRelationships: nodes.filter(n => n.relationships && n.relationships.length > 0).length,
    totalRelationships: nodes.reduce((sum, n) => sum + (n.relationships?.length || 0), 0),
  };
  return stats;
}

export function getMarkets(nodes: GraphNode[] = ENRICHED_PROGRAMS) {
  const markets = new Set<string>();
  nodes.forEach(node => {
    if (Array.isArray(node.market)) {
      node.market.forEach(m => markets.add(m));
    } else if (node.market) {
      markets.add(node.market);
    }
  });
  return Array.from(markets).sort();
}

export function filterByMarket(nodes: GraphNode[], market: string) {
  if (market === 'all' || market === 'global') return nodes;
  return nodes.filter(node => {
    if (!node.market) return true; // Include nodes without market specification
    if (node.market === 'global') return true;
    if (Array.isArray(node.market)) {
      return node.market.includes(market) || node.market.includes('global');
    }
    return node.market === market;
  });
}

export function getTranslatedName(node: GraphNode, market: string): string {
  if (!node.translations || market === 'global' || market === 'US') {
    return node.name;
  }
  return node.translations[market] || node.name;
}

// Import the enriched programs from the consolidated file
// and enhance with relationships
import { ENRICHED_PROGRAMS as BASE_PROGRAMS } from './enriched-consolidated-DEDUPLICATED';

// Missing umbrella/parent nodes that were removed during deduplication
// These are referenced as parents but don't exist as actual nodes
const MISSING_PARENT_NODES: GraphNode[] = [
  { id: 'auction', name: 'Auction', type: 'category', tier: 'umbrella', status: 'current', desc: 'Auction-format listings and bidding', year: 1995 },
  { id: 'authentication', name: 'Authentication', type: 'trust', tier: 'umbrella', status: 'current', desc: 'Product authentication and verification services', year: 2017 },
  { id: 'buyer', name: 'Buyer Programs', type: 'category', tier: 'umbrella', status: 'current', desc: 'Buyer-facing programs and protections', year: 1996 },
  { id: 'charity', name: 'Charity', type: 'impact', tier: 'umbrella', status: 'current', desc: 'Charitable giving and donations platform', year: 2003 },
  { id: 'collectibles', name: 'Collectibles', type: 'category', tier: 'umbrella', status: 'current', desc: 'Trading cards, memorabilia, and collectibles marketplace', year: 2020 },
  { id: 'community', name: 'Community', type: 'category', tier: 'umbrella', status: 'current', desc: 'Community forums, education, and seller support', year: 2000 },
  { id: 'developer', name: 'Developer', type: 'developer', tier: 'umbrella', status: 'current', desc: 'Developer platform, APIs, and tools', year: 2000 },
  { id: 'discovery', name: 'Discovery', type: 'category', tier: 'umbrella', status: 'current', desc: 'Search, browse, and discovery features', year: 2005 },
  { id: 'fashion', name: 'Fashion', type: 'category', tier: 'umbrella', status: 'current', desc: 'Fashion and luxury goods marketplace', year: 2017 },
  { id: 'impact', name: 'Impact', type: 'impact', tier: 'umbrella', status: 'current', desc: 'Social impact and sustainability programs', year: 2003 },
  { id: 'listing-tools', name: 'Listing Tools', type: 'category', tier: 'umbrella', status: 'current', desc: 'Tools for creating and managing listings', year: 2005 },
  { id: 'live', name: 'Live', type: 'category', tier: 'umbrella', status: 'current', desc: 'Live shopping and streaming commerce', year: 2020 },
  { id: 'motors', name: 'Motors', type: 'category', tier: 'umbrella', status: 'current', desc: 'Vehicles, parts, and automotive marketplace', year: 2000 },
  { id: 'payments', name: 'Payments', type: 'category', tier: 'umbrella', status: 'current', desc: 'Payment processing and checkout platform', year: 2002 },
  { id: 'refurbished', name: 'Refurbished', type: 'category', tier: 'umbrella', status: 'current', desc: 'Certified refurbished and open box products', year: 2016 },
  { id: 'returns', name: 'Returns', type: 'category', tier: 'umbrella', status: 'current', desc: 'Returns, refunds, and buyer protection', year: 2011 },
  { id: 'shipping', name: 'Shipping', type: 'category', tier: 'umbrella', status: 'current', desc: 'Shipping, logistics, and fulfillment services', year: 2005 },
  { id: 'stores', name: 'Stores', type: 'category', tier: 'umbrella', status: 'current', desc: 'eBay Stores subscription and seller storefronts', year: 2001 },
  { id: 'trust', name: 'Trust & Safety', type: 'trust', tier: 'umbrella', status: 'current', desc: 'Trust, safety, and fraud prevention programs', year: 1996 },
  { id: 'vault', name: 'Vault', type: 'category', tier: 'program', status: 'current', desc: 'Physical storage and trading platform for authenticated collectibles', year: 2022 },
  { id: 'secure-purchase', name: 'Secure Purchase', type: 'trust', tier: 'program', status: 'current', parent: 'ebay-motors', desc: 'Transaction service for vehicle purchases handling paperwork, ownership transfer, financing, and delivery. Up to $100K Vehicle Purchase Protection. Powered by Caramel Dealer Services (eBay subsidiary). $25 buyer fee.', year: 2023, market: 'US', sourceUrl: 'https://pages.ebay.com/secure-purchase/' },
  { id: 'sgs-vehicle-inspections', name: 'SGS Vehicle Inspections', type: 'trust', tier: 'program', status: 'current', parent: 'ebay-motors', desc: 'Independent third-party 150-point vehicle inspection service. $99.50 fee. Trained inspectors nationwide, reports within 24 hours, includes interior/exterior photography. For cars and motorcycles.', year: 2015, market: 'US', sourceUrl: 'https://pages.ebay.com/motors/services/inspection/inspection.html' },
  { id: 'escrow-com', name: 'Escrow.com', type: 'trust', tier: 'program', status: 'current', parent: 'ebay-motors', desc: 'Licensed escrow company for vehicle transactions. Acts as neutral third party holding funds until transaction complete. 0.89%-3.25% fee of purchase price. 2-day inspection period. $4B+ in transactions.', year: 2004, market: 'US', sourceUrl: 'https://pages.ebay.com/motors/escrow/index.html' },
  { id: 'ebay-consignment', name: 'eBay Consignment', type: 'category', tier: 'program', status: 'current', parent: 'fashion', desc: 'Third-party consignment service via Linda\'s Stuff. Seller submits designer items, partner photographs, researches, prices, lists, and sells. 60-80% commission depending on sale price. Categories: apparel, bags, footwear, jewelry, watches.', year: 2021, market: 'US', sourceUrl: 'https://pages.ebay.com/ebay-consignment/' },
  { id: 'ag-designer-fashion-de', name: 'Echtheitsprüfung für Bekleidung', type: 'trust', tier: 'program', status: 'current', parent: 'authentication-guarantee', desc: 'Authentication check for designer clothing, shoes, and accessories. €10 optional fee, €0.01 minimum item value. Covers 100+ luxury brands including everyday items (socks, underwear, swimwear). Germany-only.', year: 2024, market: 'DE', sourceUrl: 'https://pages.ebay.de/echtheitspruefung-kleidung-accessoires/' },
  { id: 'ebay-seller-capital', name: 'eBay Seller Capital', type: 'category', tier: 'program', status: 'current', parent: 'seller-tools', desc: 'Seller financing via third-party partners (Liberis US Inc, FC Marketplace LLC). Three products: Business Cash Advance ($500-$1M), Flexible Cash Advance ($1K-$2M), Term Loan (up to $500K). Repayment as % of sales or fixed payments.', year: 2020, market: 'US', sourceUrl: 'https://pages.ebay.com/ebaysellercapital/' },
  { id: 'business-cash-advance', name: 'Business Cash Advance', type: 'category', tier: 'feature', status: 'current', parent: 'ebay-seller-capital', desc: 'Lump sum financing ($500-$1M) repaid as percentage of daily sales. Provided by Liberis US Inc. One fixed fee, no interest. Minimum $5K revenue in last 12 months required.', year: 2020, market: 'US', sourceUrl: 'https://pages.ebay.com/ebaysellercapital/' },
  { id: 'flexible-cash-advance', name: 'Flexible Cash Advance', type: 'category', tier: 'feature', status: 'current', parent: 'ebay-seller-capital', desc: 'On-demand access to approved funds ($1K-$2M) for up to 12 months. Pay only what you use. Provided by Liberis US Inc. Minimum $500/month revenue required.', year: 2020, market: 'US', sourceUrl: 'https://pages.ebay.com/flexiblecashadvance/' },
  { id: 'seller-capital-term-loan', name: 'Seller Capital Term Loan', type: 'category', tier: 'feature', status: 'current', parent: 'ebay-seller-capital', desc: 'Traditional loan with fixed monthly payments. Up to $500K funding. Provided by FC Marketplace LLC (iBusiness Funding subsidiary). 5.99% origination fee + fixed periodic interest. Minimum $50K annual revenue required.', year: 2020, market: 'US', sourceUrl: 'https://pages.ebay.com/ebaysellercapital/' },
  { id: 'ai-generated-backgrounds', name: 'AI-Generated Backgrounds', type: 'category', tier: 'feature', status: 'current', parent: 'listing-tools', desc: 'AI tool that transforms product photos with generated backdrops for professional, uniform appearance. Background enhancement tool for sellers.', year: 2024, market: 'global', sourceUrl: 'https://pages.ebay.com/sellingwithAI/' },
  { id: 'ai-description-generator', name: 'AI Description Generator', type: 'category', tier: 'feature', status: 'current', parent: 'listing-tools', desc: 'Automatically creates attention-grabbing item descriptions when sellers select "Use AI description". Can be used as-is, edited, or as inspiration.', year: 2024, market: 'global', sourceUrl: 'https://pages.ebay.com/sellingwithAI/' },
  { id: 'ebay-foundation', name: 'eBay Foundation', type: 'impact', tier: 'organization', status: 'current', parent: 'impact', desc: 'Philanthropic organization established 1998. Partners with nonprofits advancing inclusive entrepreneurship. $140M+ awarded since 1998. $18M granted in 2024. Includes Matching Gifts (up to $10K per employee), Global Give program ($3M annual grants), and Changemakers volunteer program.', year: 1998, market: 'global', sourceUrl: 'http://pages.ebay.com/hk/en-us/aboutebay/foundation.html' },
  { id: 'global-give', name: 'Global Give', type: 'impact', tier: 'program', status: 'current', parent: 'ebay-foundation', desc: 'Annual employee-powered grant program awarding $3M to 30 nonprofits advancing inclusive entrepreneurship in untapped communities. Shifted from employee voting to trust-based philanthropy decision-making. Includes Rapid Response variant for crisis situations.', year: 2020, market: 'global', sourceUrl: 'https://www.ebayinc.com/stories/news/ebay-foundations-global-give-program-grants-3m-toward-inclusive-entrepreneurship/' },
  { id: 'ebay-impact-report', name: 'eBay Impact Report', type: 'impact', tier: 'publication', status: 'current', parent: 'impact', desc: 'Annual sustainability and social impact report. Published since 2022. Covers economic opportunities created, carbon emissions avoided, waste prevented, charitable giving, pay parity, renewable energy progress, and net-zero 2045 goals. 2024 report: $5B economic impact, 1.6M metric tons CO2 avoided, 70K metric tons waste prevented, $192M charity raised.', year: 2022, market: 'global', sourceUrl: 'https://www.ebayinc.com/impact/' },
  { id: 'recommerce-report', name: 'Recommerce Report', type: 'impact', tier: 'publication', status: 'current', parent: 'impact', desc: 'Annual report on secondhand shopping trends and sustainability impact. Published since 2020. Launched annually on Recommerce Day (May 21). 2025 report: 89% consumers maintaining/increasing secondhand spending, 81% motivated by savings, 45% by sustainability, 68% feel good about giving items second life. Tracks waste avoided, carbon emissions prevented, consumer motivations.', year: 2020, market: 'global', sourceUrl: 'https://www.ebayinc.com/recommerce-report/' },
  { id: 'small-business-report', name: 'Small Business Report', type: 'impact', tier: 'publication', status: 'current', parent: 'impact', desc: 'Annual report on eBay seller success and economic impact. Published since 2022. Surveys 4,300+ sellers across US, UK, DE, CA, JP, AU. Key findings: 94% see strong eBay connection to success, 71% rely heavily on eBay, 61% are accidental entrepreneurs, 43% in rural/small towns, 68% expect 5-year growth. Documents Main Street economic impact.', year: 2022, market: 'global', sourceUrl: 'https://www.ebayinc.com/small-business-report/' },
  { id: 'free-4-day-shipping-badge', name: 'Free 4-Day Shipping Badge', type: 'category', tier: 'feature', status: 'current', parent: 'shipping', desc: 'Visual badge displayed on listings offering free 4-day delivery. Trust signal for buyers. Related to Free 4-Day Shipping service.', year: 2024, market: 'US', sourceUrl: 'https://www.ebay.com/help/selling/listings/creating-managing-listings/listing-badges' },

  // SESSION 6: MICRO-FEATURES DISCOVERY (Seller Tools, Buyer Features, Advertising, Mobile/API)

  // SELLER ANALYTICS & PERFORMANCE TOOLS
  { id: 'product-research', name: 'Product Research', type: 'category', tier: 'feature', status: 'current', parent: 'seller-hub', desc: 'Provides 3 years of eBay sales data for millions of items. Includes sales trends, average sold prices, shipping costs, sell-through rates, and seller competition data. Made free to all Seller Hub sellers in April 2021. Formerly Terapeak Product Research, rebranded May 2024.', year: 2021, market: 'global', sourceUrl: 'https://www.ebay.com/help/selling/selling-tools/product-research?id=4853' },
  { id: 'sourcing-insights', name: 'Sourcing Insights', type: 'category', tier: 'feature', status: 'current', parent: 'seller-hub', desc: 'Real-world sales data for developing sourcing strategy and identifying market opportunities. Shows sold single stock listings, in-stock vs out-of-stock items, high-demand categories with low inventory. Available to Basic Store+ sellers.', year: 2021, market: 'global', sourceUrl: 'https://www.ebay.com/help/selling/selling-tools/product-research?id=4853' },
  { id: 'listing-quality-report', name: 'Listing Quality Report', type: 'category', tier: 'feature', status: 'current', parent: 'seller-hub', desc: 'Downloadable Excel analysis of top 10 categories with most live listings. Provides optimization recommendations to boost views, impressions, and sales. Includes competitor benchmarking and Google Shopping rejection insights. US and UK markets.', year: 2021, market: ['US', 'UK'], sourceUrl: 'https://pages.ebay.com/listing-quality-report/' },
  { id: 'traffic-report', name: 'Traffic Report', type: 'category', tier: 'feature', status: 'current', parent: 'seller-hub', desc: 'Shows how buyers find and interact with listings. Tracks impressions, page views, click-through rate, watchers, traffic sources (organic search, promoted, direct, off-eBay). Up to 2 years of historical data for active listings.', year: 2015, market: 'global', sourceUrl: 'https://www.ebay.com/help/selling/listings/listing-tips/page-views?id=4165' },
  { id: 'store-traffic-report', name: 'Store Traffic Report', type: 'category', tier: 'feature', status: 'current', parent: 'stores', desc: 'Tracks total visits to eBay Stores or paid visits from Promoted Display ads. Store-level traffic analysis separate from individual listing traffic. Available to Store subscribers.', year: 2023, market: 'global', sourceUrl: 'https://community.ebay.com/t5/Seller-Tools/eBay-Store-Traffic-Reports-Now-Available-In-Seller-Hub/td-p/33967711' },
  { id: 'seller-performance-standards', name: 'Seller Performance Standards', type: 'category', tier: 'program', status: 'current', parent: 'trust', desc: 'Dashboard showing performance on key metrics: transaction defect rate, late shipment rate, cases closed without seller resolution. Monitors compliance with eBay standards and identifies improvement areas.', year: 2008, market: 'global', sourceUrl: 'https://www.ebay.com/help/selling/selling/monitoring-improving-seller-performance?id=4785' },
  { id: 'service-metrics-dashboard', name: 'Service Metrics Dashboard', type: 'category', tier: 'feature', status: 'current', parent: 'seller-performance-standards', desc: 'Shows "Item not received" and "Item not as described" rates vs peer benchmarks. Monthly evaluation (20th of month) with ratings: Low, Average, High, or Very High compared to similar sellers.', year: 2012, market: 'global', sourceUrl: 'https://www.ebay.com/help/policies/selling-policies/service-metrics-policy?id=4769' },
  { id: 'advertising-dashboard', name: 'Advertising Dashboard', type: 'category', tier: 'feature', status: 'current', parent: 'seller-hub', desc: 'Centralized dashboard for managing all advertising campaigns. AI-powered insights, recommendations, and performance metrics. Tracks impressions, clicks, ROAS, cost-per-click. Major redesign July 2024.', year: 2024, market: 'global', sourceUrl: 'https://export.ebay.com/en/services-tools/advertising/ebay-advertising-dashboards/' },
  { id: 'bulk-campaign-management', name: 'Bulk Campaign Management', type: 'category', tier: 'feature', status: 'current', parent: 'advertising-dashboard', desc: 'Spreadsheet-based tool for creating and updating multiple priority campaigns at once from Advertising dashboard. Bulk editing for ad campaigns.', year: 2024, market: 'global', sourceUrl: 'https://www.ebay.com/help/selling/listings/promoted-listings/bulk-campaign-management?id=5640' },

  // SELLER PROMOTIONAL TOOLS
  { id: 'discounts-manager', name: 'Discounts Manager', type: 'category', tier: 'program', status: 'current', parent: 'seller-hub', desc: 'Suite of promotional tools for eBay Store subscribers. Includes sale events, volume pricing, coded coupons, shipping discounts, and order discounts. Formerly Promotions Manager.', year: 2015, market: 'global', sourceUrl: 'https://www.ebay.com/help/selling/selling-tools/promotions-manager?id=4094' },
  { id: 'volume-pricing', name: 'Volume Pricing', type: 'category', tier: 'feature', status: 'current', parent: 'discounts-manager', desc: 'Tiered discounts for buyers purchasing multiple quantities of single item. Can stack with markdown sales. Configurable discount tiers.', year: 2015, market: 'global', sourceUrl: 'https://pages.ebay.com/specialoffers/volumepricing/index.html' },
  { id: 'coded-coupons', name: 'Coded Coupons', type: 'category', tier: 'feature', status: 'current', parent: 'discounts-manager', desc: 'Create and share discount codes publicly on eBay or privately off eBay. Coupon codes visible on search results, listings, and checkout. Available to eBay Store subscribers.', year: 2015, market: 'global', sourceUrl: 'https://export.ebay.com/en/services-tools/discounts-manager/coded-coupons/' },
  { id: 'sale-events', name: 'Sale Events', type: 'category', tier: 'feature', status: 'current', parent: 'discounts-manager', desc: 'Group items and offer time-bound discounts. Three types: Percentage Off, Amount Off, or Sale Event Only (markdown). Sale prices appear in search results.', year: 2015, market: 'global', sourceUrl: 'https://export.ebay.com/en/services-tools/discounts-manager/sale-event/' },
  { id: 'shipping-discounts', name: 'Shipping Discounts', type: 'category', tier: 'feature', status: 'current', parent: 'discounts-manager', desc: 'Time-bound free shipping or conditional free shipping offers to buyers. Available to eBay Store subscribers.', year: 2015, market: 'global', sourceUrl: 'https://www.ebay.com/help/selling/selling-tools/promotions-manager?id=4094' },
  { id: 'order-discounts', name: 'Order Discounts', type: 'category', tier: 'feature', status: 'current', parent: 'discounts-manager', desc: 'Discounts based on order size or amount spent by buyer. Minimum purchase thresholds. Available to eBay Store subscribers.', year: 2015, market: 'global', sourceUrl: 'https://www.ebay.com/help/selling/selling-tools/promotions-manager?id=4094' },

  // 2025 NEW SELLER FEATURES
  { id: 'ai-assistant-messaging', name: 'AI Assistant for Messaging', type: 'category', tier: 'feature', status: 'current', parent: 'seller-hub', desc: 'AI-powered assistant that recommends replies to buyer messages. Launched August 2025. Available in Seller Hub messaging. US and UK markets.', year: 2025, market: ['US', 'UK'], sourceUrl: 'https://www.ebayinc.com/stories/news/ebay-launches-seller-tools-to-save-time-boost-profits-and-build-trust/' },
  { id: 'offers-in-messaging', name: 'Offers in Messaging', type: 'category', tier: 'feature', status: 'current', parent: 'seller-hub', desc: 'Allows sellers to send offers directly within message threads. Launched August 2025. US market. Streamlines negotiation process.', year: 2025, market: 'US', sourceUrl: 'https://www.ebayinc.com/stories/news/ebay-launches-seller-tools-to-save-time-boost-profits-and-build-trust/' },
  { id: 'track-your-costs', name: 'Track Your Costs', type: 'category', tier: 'feature', status: 'current', parent: 'seller-hub', desc: 'Tool for tracking acquisition costs to calculate profit margins. Launched Fall 2025. US market. Helps sellers understand profitability per item.', year: 2025, market: 'US', sourceUrl: 'https://www.ebayinc.com/stories/news/ebay-launches-seller-tools-to-save-time-boost-profits-and-build-trust/' },
  { id: 'inventory-mapping-api', name: 'Inventory Mapping API', type: 'category', tier: 'feature', status: 'current', parent: 'seller-hub', desc: 'AI-powered API turning existing product data into high-quality eBay listings with automated recommendations. Launched Late August 2025. US market.', year: 2025, market: 'US', sourceUrl: 'https://www.ebayinc.com/stories/news/ebay-launches-seller-tools-to-save-time-boost-profits-and-build-trust/' },
  { id: 'automated-feedback', name: 'Automated Feedback', type: 'category', tier: 'feature', status: 'current', parent: 'seller-hub', desc: 'Automatically leaves positive feedback for buyers after successful transaction. Launched September 2025. US market. Opt-in feature.', year: 2025, market: 'US', sourceUrl: 'https://www.ebayinc.com/stories/news/ebay-launches-seller-tools-to-save-time-boost-profits-and-build-trust/' },

  // ADVERTISING PROGRAMS
  { id: 'promoted-offsite', name: 'Promoted Offsite', type: 'category', tier: 'program', status: 'current', parent: 'advertising', desc: 'Promotes eligible inventory on external channels like Google with AI-powered optimization. Cost-per-click model. Major promotional credits in 2024-2025.', year: 2020, market: ['US', 'global'], sourceUrl: 'https://www.ebay.com/help/selling/ebay-advertising/promoted-offsite?id=5471' },
  { id: 'promoted-stores', name: 'Promoted Stores', type: 'category', tier: 'program', status: 'current', parent: 'advertising', desc: 'Cost-per-click ads driving traffic to eBay Store. Features store name, logo, category or coupon. Two campaign types: Category and Coupon. Monthly budget pacing introduced October 2025.', year: 2023, market: 'global', sourceUrl: 'https://www.ebay.com/help/selling/ebay-advertising/promoted-stores?id=5472' },
  { id: 'promoted-listings-express', name: 'Promoted Listings Express', type: 'category', tier: 'program', status: 'legacy', parent: 'advertising', desc: 'Flat fee upfront payment for sponsored placements on similar listing pages. Designed for auction listings. DISCONTINUED April 15, 2024.', year: 2021, market: ['US', 'UK', 'DE', 'AU', 'CA'], sourceUrl: 'https://www.ebay.com/help/selling/listings/promoted-listings/promoted-listings-express?id=5277' },

  // BUYER SHOPPING FEATURES
  { id: 'saved-searches', name: 'Saved Searches', type: 'category', tier: 'feature', status: 'current', parent: 'discovery', desc: 'Create saved searches for regularly searched items with email alerts for new matching listings. Searches appear in feed when signed in.', year: 2005, market: 'global', sourceUrl: 'https://www.ebay.com/help/buying/search-tips/saved-searches?id=4051' },
  { id: 'watch-list', name: 'Watch List', type: 'category', tier: 'feature', status: 'current', parent: 'discovery', desc: 'Track up to 1,000 items with sorting, multi-select delete, and notifications for price changes and listing endings. Includes category filters added March 2025.', year: 1997, market: 'global', sourceUrl: 'https://www.ebay.com/help/buying/search-tips/watchlist?id=4046' },
  { id: 'watch-list-category-filters', name: 'Watch List Category Filters', type: 'category', tier: 'feature', status: 'current', parent: 'watch-list', desc: 'Filter Watch List by specific category to organize watched items. Available on desktop and iOS. Launched March 2025.', year: 2025, market: ['US', 'UK', 'DE', 'AU', 'CA', 'FR', 'IT', 'ES'], sourceUrl: 'https://tech.ebayinc.com/product/ebays-new-feature-lets-you-organize-your-watch-list-by-category/' },
  { id: 'saved-sellers', name: 'Saved Sellers', type: 'category', tier: 'feature', status: 'current', parent: 'discovery', desc: 'Follow favorite sellers to see new listings, collections, and updates on homepage feed. Access via My eBay > Saved Sellers. Formerly "favorite sellers".', year: 2012, market: 'global', sourceUrl: 'https://community.ebay.com/t5/Buying/How-do-I-find-my-saved-sellers/td-p/34073706' },
  { id: 'my-collection', name: 'My Collection', type: 'category', tier: 'feature', status: 'current', parent: 'collectibles', desc: 'Organize, track, and manage collectible card games and trading cards. Supports up to 5,000 items with image scanning, condition tracking, PSA integration, and market data. Desktop, iOS, Android.', year: 2020, market: 'global', sourceUrl: 'https://www.ebay.com/help/manage-collection/selling/manage-collection?id=5289' },
  { id: 'personalized-feed', name: 'Personalized Feed', type: 'category', tier: 'feature', status: 'current', parent: 'discovery', desc: 'Customizable homepage with personalized product streams based on interests, brands, searches, and purchase history. Users select interests to transform homepage. Major updates 2018-2019.', year: 2012, market: 'global', sourceUrl: 'https://www.ebayinc.com/stories/news/ebay-customizes-your-homepage-shopping-experience/' },
  { id: 'product-recommendations', name: 'Product Recommendations', type: 'category', tier: 'feature', status: 'current', parent: 'discovery', desc: 'AI-powered personalized recommendations using deep learning and two-tower architecture. Real-time user embeddings for homepage, feed, and recommendation modules based on browsing history.', year: 2015, market: 'global', sourceUrl: 'https://innovation.ebayinc.com/stories/evolving-recommendations-a-personalized-user-based-ranking-model/' },
  { id: 'shop-the-look', name: 'Shop the Look', type: 'category', tier: 'feature', status: 'current', parent: 'fashion', desc: 'AI-powered immersive carousel of fashion outfits tailored to shopping history with interactive hotspots. Personalized style recommendations for users viewing 10+ fashion items in 180 days. April 2024 launch.', year: 2024, market: ['US', 'UK'], sourceUrl: 'https://innovation.ebayinc.com/stories/introducing-shop-the-look-ebay-curating-personalized-outfits-with-ai/' },
  { id: 'ai-shopping-agent', name: 'AI Shopping Agent', type: 'category', tier: 'feature', status: 'current', parent: 'discovery', desc: 'Agentic AI conversational assistant delivering real-time, hyper-personalized product recommendations and expert guidance. Inline predictive messaging. Limited rollout May 2025.', year: 2025, market: 'US', sourceUrl: 'https://www.customerexperiencedive.com/news/ebay-rolls-out-conversational-ai-shopping-agent/747298/' },
  { id: 'price-drop-notifications', name: 'Price Drop Notifications', type: 'category', tier: 'feature', status: 'current', parent: 'discovery', desc: 'Automatic notifications to watchers when sellers lower prices (5% for items under $200, 3% for $200-$1,000, 2% for over $1,000). Part of push notifications.', year: 2015, market: 'global', sourceUrl: 'https://community.ebay.com/t5/Selling/Do-Buyers-get-Notification-for-Price-Drop-and-Shipping-Cost-Drop/td-p/34124193' },

  // MOBILE APP FEATURES
  { id: 'image-search', name: 'Image Search', type: 'category', tier: 'feature', status: 'legacy', parent: 'discovery', desc: 'Visual search using photos to find items. Computer vision and CNNs match uploaded images against live listings. Launched 2017, temporarily disabled end of 2024/2025.', year: 2017, market: ['US', 'global'], sourceUrl: 'https://innovation.ebayinc.com/stories/find-it-on-ebay-using-pictures-instead-of-words/' },
  { id: 'find-it-on-ebay', name: 'Find It On eBay', type: 'category', tier: 'feature', status: 'current', parent: 'discovery', desc: 'Share-to-search feature allowing users to share images from social networks (Facebook, Pinterest) or websites directly to eBay app to find similar listings.', year: 2017, market: ['iOS', 'Android'], sourceUrl: 'https://www.ebayinc.com/stories/news/an-easier-way-to-search-ebay-computer-vision-with-find-it-on-ebay-and-image-search-is-now-live/' },
  { id: 'barcode-scanner', name: 'Barcode Scanner', type: 'category', tier: 'feature', status: 'current', parent: 'listing-tools', desc: 'In-app barcode scanning when listing items. Access from "list an item" screen or after searching. Helps sellers quickly list products by scanning UPC/EAN codes.', year: 2015, market: ['iOS', 'Android'], sourceUrl: 'https://community.ebay.com/t5/Mobile-Apps/Barcode-Scanner-Android/td-p/34769673' },
  { id: 'ar-box-sizing', name: 'AR Box Sizing', type: 'category', tier: 'feature', status: 'current', parent: 'shipping', desc: 'Augmented reality feature ("Which Box?") using camera and Google ARCore to help sellers determine if USPS shipping boxes fit items. Overlays virtual 3D boxes on items. Android only.', year: 2018, market: 'US', sourceUrl: 'https://innovation.ebayinc.com/stories/thinking-inside-the-box/' },
  { id: 'push-notifications', name: 'Push Notifications', type: 'category', tier: 'feature', status: 'current', parent: 'ebay-mobile', desc: 'Real-time mobile notifications for orders, offers, auctions, deals, coupons, delivery updates, price changes, and new listings. Configurable by type in app settings.', year: 2010, market: ['iOS', 'Android'], sourceUrl: 'https://pages.ebay.com/push-notifications/' },

  // DEVELOPER API PRODUCTS
  { id: 'api-sandbox', name: 'API Sandbox', type: 'category', tier: 'feature', status: 'current', parent: 'developer-tools', desc: 'Complete testing environment mirroring Production. Test users and test money ($500K weekly refresh). Allows prototyping and testing business logic before going live.', year: 2005, market: 'global', sourceUrl: 'https://developer.ebay.com/develop/tools/sandbox' },
  { id: 'api-explorer', name: 'API Explorer', type: 'category', tier: 'feature', status: 'current', parent: 'developer-tools', desc: 'Interactive developer console for running sample API calls in Sandbox and Production. Test requests for most eBay API methods while signed in. Developer account required.', year: 2010, market: 'global', sourceUrl: 'https://developer.ebay.com/api-docs/static/gs_use-the-api-explorer-to-try.html' },
  { id: 'notification-api', name: 'Notification API', type: 'category', tier: 'feature', status: 'current', parent: 'developer-tools', desc: 'Developer API enabling push notifications to application endpoints. Subscription management, destination configuration, HTTP push with X-EBAY-SIGNATURE security headers.', year: 2015, market: 'global', sourceUrl: 'https://developer.ebay.com/api-docs/commerce/notification/overview.html' },
  { id: 'buy-marketing-api', name: 'Buy Marketing API', type: 'category', tier: 'feature', status: 'current', parent: 'developer-tools', desc: 'API with getAlsoViewedByProduct and getAlsoBoughtByProduct methods. Enables shopping experiences for browsing by product with recommendation features.', year: 2024, market: 'global', sourceUrl: 'https://developer.ebay.com/news/similar-and-related-products-buy-marketing-api' },
  { id: 'catalog-api', name: 'Catalog API', type: 'category', tier: 'feature', status: 'current', parent: 'developer-tools', desc: 'Search and locate eBay catalog products matching items to sell. Ensures listings have complete and accurate product information from eBay catalog.', year: 2018, market: 'global', sourceUrl: 'https://developer.ebay.com/api-docs/commerce/catalog/overview.html' },

  // SESSION 7: COMPREHENSIVE GAP-FILL DISCOVERY (Payments, Trust, Shipping, Categories)

  // PAYMENT METHODS & BNPL
  { id: 'klarna-pay-in-4', name: 'Klarna Pay in 4', type: 'category', tier: 'feature', status: 'current', parent: 'payments', desc: 'Buy now pay later service splitting purchases into four interest-free payments, paid every 2 weeks. Soft credit check only. Available at checkout on eligible purchases.', year: 2023, market: ['US', 'UK', 'global'], sourceUrl: 'https://pages.ebay.com/klarna/' },
  { id: 'klarna-financing', name: 'Klarna Financing', type: 'category', tier: 'feature', status: 'current', parent: 'payments', desc: 'Extended financing option with repayment terms 3-24 months and interest rates 7.99%-35.99%. Separate from Pay in 4. Loan approval based on credit check.', year: 2023, market: ['US', 'global'], sourceUrl: 'https://pages.ebay.com/klarna/' },
  { id: 'sezzle-pay-in-4', name: 'Sezzle Pay in 4', type: 'category', tier: 'feature', status: 'current', parent: 'payments', desc: 'Third-party BNPL splitting purchases into four interest-free installments over 6 weeks. Instant approval, no hard credit check. Via Sezzle app and virtual card.', year: 2023, market: 'US', sourceUrl: 'https://sezzle.com/shop/ebay/' },
  { id: 'afterpay', name: 'Afterpay', type: 'category', tier: 'feature', status: 'current', parent: 'payments', desc: 'BNPL service for four equal installments over 6 weeks. Only available when checking out with single seller. Available in Afterpay mobile app.', year: 2023, market: 'AU', sourceUrl: 'https://www.afterpay.com/en-US/stores/ebay-02760' },
  { id: 'venmo', name: 'Venmo', type: 'category', tier: 'feature', status: 'current', parent: 'payments', desc: 'Digital wallet payment option integrated at eBay checkout. Part of push to expand payment methods for digital natives. Available for most categories.', year: 2024, market: 'US', sourceUrl: 'https://www.ebayinc.com/stories/news/ebay-launches-venmo-as-a-payment-option-a-continued-push-to-expand-ways-to-pay-and-invest-in-digital-natives/' },
  { id: 'paypal-credit-6-month', name: 'PayPal Credit 6 Month Financing', type: 'category', tier: 'feature', status: 'current', parent: 'payments', desc: 'Everyday promotional financing on purchases $149+. No interest if paid in full within 6 months. Previously offered 12-month and 24-month terms for higher amounts.', year: 2014, market: 'US', sourceUrl: 'https://pages.ebay.com/paypal-credit/ezp.html' },

  // FINANCIAL SERVICES
  { id: 'ebay-mastercard', name: 'eBay Mastercard', type: 'category', tier: 'program', status: 'legacy', parent: 'payments', desc: 'Co-branded credit card issued by Synchrony Bank offering 1-3 reward points per $1 spent. Program ending March 24, 2026. Points convert to eBay gift cards. Cardholders transitioning to Synchrony Premier World Mastercard.', year: 2020, market: 'US', sourceUrl: 'https://www.valueaddedresource.net/ebay-mastercard-ends-march-24-2026/' },
  { id: 'automatic-tax-calculation', name: 'Automatic Tax Calculation', type: 'category', tier: 'feature', status: 'current', parent: 'managed-payments', desc: 'eBay automatically calculates, collects, and remits sales tax for transactions in 46 US jurisdictions. No action or fees required from sellers. Tax calculated based on buyer shipping address, deducted from payouts.', year: 2018, market: 'US', sourceUrl: 'https://www.ebay.com/help/selling/fees-credits-invoices/taxes-import-charges?id=4121' },
  { id: 'currency-conversion', name: 'Currency Conversion Service', type: 'category', tier: 'feature', status: 'current', parent: 'managed-payments', desc: 'Automatic currency conversion when buyer pays in different currency than seller payout currency. Transaction exchange rate with 3-3.3% conversion charge automatically deducted from sales.', year: 2018, market: 'global', sourceUrl: 'https://community.ebay.com/t5/Selling/Can-i-avoid-currency-conversion-if-having-multiple-currency-bank/td-p/32387322' },
  { id: 'multi-currency-payout', name: 'Multi-Currency Payout', type: 'category', tier: 'feature', status: 'current', parent: 'managed-payments', desc: 'Partnership with Payoneer enabling sellers to receive payouts in multiple currencies (USD, EUR, GBP, JPY, etc.) with faster fund access. Allows listing on multiple international eBay sites with flexible currency management.', year: 2021, market: 'global', sourceUrl: 'https://www.paymentsdive.com/news/ebay-payoneer-cross-border-multi-currency-payments/599547/' },

  // CHECKOUT TOOLS
  { id: 'immediate-payment-requirement', name: 'Immediate Payment Requirement', type: 'category', tier: 'feature', status: 'current', parent: 'checkout', desc: 'Seller tool requiring instant payment for Buy It Now and auction listings with BIN option. Prevents unpaid items. Available to sellers in good standing for items under $10,000 USD.', year: 2010, market: 'global', sourceUrl: 'https://www.ebay.com/help/selling/listings/creating-managing-listings/immediate-payment-works?id=4151' },
  { id: 'vat-invoice-automation', name: 'VAT Invoice Automation', type: 'category', tier: 'feature', status: 'current', parent: 'managed-payments', desc: 'eBay automatically generates VAT invoices for UK/EU sellers and provides buyers with VAT receipts. Downloadable through Seller Hub or My eBay for up to 18 months. Opt-in trial program.', year: 2025, market: ['UK', 'EU'], sourceUrl: 'https://community.ebay.co.uk/t5/Announcements/Introducing-downloadable-VAT-invoices-for-sellers-opt-in-to/ba-p/7758272' },
  { id: 'selling-manager-pro', name: 'Selling Manager Pro', type: 'category', tier: 'program', status: 'legacy', parent: 'seller-tools', desc: 'Subscription service ($15.99/month, free with Premium/Anchor stores) offering bulk invoicing, automated email, inventory tracking, automated feedback, P&L reports. Many features made free in 2022 transition to Seller Hub. Being phased out.', year: 2010, market: 'global', sourceUrl: 'https://www.a2xaccounting.com/blog/ebay-selling-manager-and-pro' },

  // TRUST & VERIFICATION
  { id: 'seller-verification', name: 'Seller Verification Program', type: 'trust', tier: 'program', status: 'current', parent: 'trust', desc: 'Identity verification proving seller legitimacy and business credentials. Displays verification badge on seller profiles. Requires identity documents for individuals, business registration/tax ID/licenses/bank account for businesses.', year: 2025, market: 'global', sourceUrl: 'https://www.ebay.com/help/selling/listings/seller-verification?id=4851' },
  { id: 'two-step-verification', name: 'Two-Step Verification', type: 'trust', tier: 'feature', status: 'current', parent: 'trust', desc: 'Security feature requiring username/password plus verification code sent to phone or email. Codes via eBay app push, SMS, or authenticator app one-time passcode.', year: 2020, market: 'global', sourceUrl: 'https://www.ebay.com/help/account/protecting-account/protecting-account?id=4192' },
  { id: 'passkeys', name: 'Passkeys', type: 'trust', tier: 'feature', status: 'current', parent: 'trust', desc: 'Advanced authentication using biometric authentication (fingerprint, facial recognition) or device PIN instead of passwords. Saved in iCloud Keychain (iPhone), Google Password Manager (Android), or Windows Hello.', year: 2025, market: 'global', sourceUrl: 'https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872' },

  // COMMUNITY PROGRAMS
  { id: 'community-mentor-program', name: 'Community Mentor Program', type: 'category', tier: 'program', status: 'current', parent: 'community', desc: 'Volunteer program where experienced sellers/buyers help users through "Ask A Mentor" board. Benefits: private Mentors Lounge access, exclusive badge, direct access to Community team, video chats with peers.', year: 2024, market: 'global', sourceUrl: 'https://community.ebay.com/t5/Mentor-Program/Community-Mentor-Program/td-p/31654137' },
  { id: 'small-business-advocacy-network', name: 'Small Business Advocacy Network', type: 'category', tier: 'program', status: 'current', parent: 'community', desc: '100+ member network across 26 countries advocating for sound ecommerce policy. Members visit legislators, receive early policy information, get business promotion through eBay channels. Managed by Government Relations team.', year: 2024, market: 'global', sourceUrl: 'https://www.ebaymainstreet.com/sban' },
  { id: 'expressions-panel', name: 'Expressions Panel', type: 'category', tier: 'program', status: 'current', parent: 'community', desc: 'Seller feedback program inviting sellers to participate in Zoom sessions and research panels to shape eBay future. Separate from eBay Council program.', year: 2023, market: 'US', sourceUrl: 'https://community.ebay.com/t5/Selling/eBay-Expressions-focus-panel-participation/td-p/33666851' },
  { id: 'ebay-council', name: 'eBay Council', type: 'category', tier: 'program', status: 'current', parent: 'community', desc: 'Research panel program inviting sellers to participate in surveys and research. Social commenting features discontinued December 31, 2024, but panel invitations continue.', year: 2020, market: 'US', sourceUrl: 'https://community.ebay.com/t5/Ask-a-Mentor/Ebay-council-email/td-p/33838960' },
  { id: 'developer-loyalty-program', name: 'Developer Loyalty Program', type: 'category', tier: 'program', status: 'current', parent: 'developer-tools', desc: 'Tiered program offering expanded benefits including marketing opportunities, early access to product innovations, consulting engagements, and beta testing opportunities based on developer tier qualification.', year: 2024, market: 'global', sourceUrl: 'https://developer.ebay.com/updates/newsletter/q4_2024' },

  // DISPUTE RESOLUTION
  { id: 'payment-dispute-protections', name: 'Payment Dispute Seller Protections', type: 'trust', tier: 'program', status: 'current', parent: 'seller-protections', desc: 'Protection for chargebacks and payment disputes. eBay covers dispute amount, waives $20-$100 dispute fee, removes negative feedback, and helps build evidence. May automatically apply protections without seller action.', year: 2025, market: 'global', sourceUrl: 'https://www.ebay.com/help/policies/selling-policies/payment-dispute-seller-protections?id=5293' },
  { id: 'case-appeals', name: 'Case Appeals Process', type: 'trust', tier: 'feature', status: 'current', parent: 'resolution-center', desc: 'Formal appeals process allowing buyers and sellers to appeal case decisions within 30 days of closure by providing new information. eBay reviews and responds within 48 hours.', year: 2020, market: 'global', sourceUrl: 'https://www.ebay.com/help/selling/managing-returns-refunds/appeal-outcome-case-seller?id=4369' },
  { id: 'managed-returns', name: 'Managed Returns', type: 'category', tier: 'program', status: 'current', parent: 'returns', desc: 'Opt-in automation giving buyers consistent return initiation and sellers efficient return management. Creates automatic return shipping labels and processes returns through seller-configured automation rules.', year: 2025, market: 'global', sourceUrl: 'https://pages.ebay.com/dz/en-us/sell/returns/optin.html' },

  // SECURITY
  { id: 'security-center', name: 'eBay Security Center', type: 'trust', tier: 'program', status: 'current', parent: 'trust', desc: 'Centralized hub for account protection information, privacy guidance, device security tips, wireless network protection, scam recognition, phishing detection, and fake webpage identification. Includes account takeover detection and phishing reporting.', year: 2020, market: 'global', sourceUrl: 'https://pages.ebay.com/securitycenter/' },

  // SHIPPING PROGRAMS
  { id: 'shipping-partner-platform', name: 'eBay Shipping Partner Platform', type: 'category', tier: 'program', status: 'current', parent: 'shipping', desc: 'Integration platform allowing sellers to access negotiated carrier rates through ShipRush, with automatic tracking upload and USPS Commercial Plus pricing (up to 25% savings). No subscription fee for eligible users.', year: 2024, market: 'US', sourceUrl: 'https://pages.ebay.com/shipping/labelpartners/index.html' },
  { id: 'guaranteed-delivery', name: 'eBay Guaranteed Delivery', type: 'category', tier: 'program', status: 'current', parent: 'shipping', desc: 'Buyers search for items guaranteed to arrive within 1-4 business days. If items arrive late, buyers receive vouchers or shipping refunds, and sellers protected from late delivery feedback.', year: 2017, market: 'US', sourceUrl: 'https://pages.ebay.com/shipping/guaranteed-delivery.html' },
  { id: 'international-standard-delivery', name: 'eBay International Standard Delivery', type: 'category', tier: 'program', status: 'current', parent: 'shipping', desc: 'International shipping service with $100 shipping protection plan, automated customs declarations, and seller authorization for eBay to arrange carrier services for export and customs clearance.', year: 2020, market: 'global', sourceUrl: 'https://pages.ebay.com/sell/send/termsofservice.html' },
  { id: 'in-store-pickup', name: 'In-Store Pickup', type: 'category', tier: 'feature', status: 'current', parent: 'shipping', desc: 'Buyers pick up items from local stores. US has "In-Store Pickup," UK/AU/DE offer "Click and Collect" at 650+ Argos locations (UK) and ParcelPoint/Hubbed (AU).', year: 2020, market: ['US', 'UK', 'AU', 'DE'], sourceUrl: 'https://pages.ebay.com/instorepickup/' },
  { id: 'qr-code-labels', name: 'QR Code Shipping Labels', type: 'category', tier: 'feature', status: 'current', parent: 'shipping', desc: 'Sellers without printers generate QR codes for USPS, FedEx, UPS labels, then have them scanned and printed at drop-off locations via mobile device.', year: 2023, market: 'US', sourceUrl: 'https://community.ebay.com/t5/Announcements/New-QR-Codes-for-eBay-Labels/ba-p/31294514' },
  { id: 'ebay-plus', name: 'eBay Plus', type: 'category', tier: 'program', status: 'current', parent: 'shipping', desc: 'Paid membership (AU$49/year or AU$4.99/month) offering free express delivery to metro addresses and free standard delivery elsewhere on 15+ million items. Available in Australia and Germany only.', year: 2020, market: ['AU', 'DE'], sourceUrl: 'https://www.ebay.com.au/help/buying/buying-ebay-plus/buying-ebay-plus?id=4755' },

  // FULFILLMENT SERVICES
  { id: 'managed-delivery', name: 'eBay Managed Delivery', type: 'category', tier: 'program', status: 'current', parent: 'shipping', desc: 'End-to-end fulfillment service where eBay arranges storage, packing, and shipping through expert logistics partners in strategically located warehouses. Buyers receive items in 3 days or less in eBay-branded boxes.', year: 2019, market: 'US', sourceUrl: 'https://www.ebayinc.com/stories/news/ebay-to-launch-managed-delivery-an-end-to-end-fulfillment-service-for-sellers/' },

  // LABEL & PACKAGING
  { id: 'automated-return-labels', name: 'Automated Prepaid Return Labels', type: 'category', tier: 'feature', status: 'current', parent: 'returns', desc: 'Opt-in automation allowing eBay to automatically accept returns and generate prepaid return labels using eBay-negotiated rates (typically cheaper than carrier rates). Includes customizable automation rules.', year: 2024, market: ['US', 'UK'], sourceUrl: 'https://www.ebay.com/help/selling/managing-returns-refunds/return-shipping-for-sellers?id=4703' },
  { id: 'usps-cobranded-supplies', name: 'eBay/USPS Co-Branded Shipping Supplies', type: 'category', tier: 'feature', status: 'current', parent: 'shipping', desc: 'Free USPS Priority Mail boxes co-branded with eBay logo, available to sellers with free shipping (minimum 25 quantity per item). Order via 1-800-222-1811.', year: 2015, market: 'US', sourceUrl: 'https://pages.ebay.com/USPS/shippingitems.html' },
  { id: 'ebay-packaging-store', name: 'eBay Branded Packaging Store', type: 'category', tier: 'program', status: 'current', parent: 'shipping', desc: 'Official eBay online store selling eBay-branded boxes, envelopes, tape, bubble mailers, and poly bags through partnership with Swiftpak. Competitively priced with convenient delivery.', year: 2023, market: ['US', 'UK'], sourceUrl: 'https://www.ebay.com/str/ebayshippingsupplies' },
  { id: 'shipcover-insurance', name: 'ShipCover Insurance', type: 'category', tier: 'feature', status: 'current', parent: 'shipping', desc: 'Shipping insurance for USPS shipments up to $15,000, cheaper than carrier insurance with built-in claim process. Covers most international countries.', year: 2020, market: ['US', 'global'], sourceUrl: 'https://pages.ebay.com/seller-center/shipping/shipcover-insurance.html' },
  { id: 'bulk-label-printing', name: 'Bulk Label Printing Tool', type: 'category', tier: 'feature', status: 'current', parent: 'seller-hub', desc: 'Seller Hub feature allowing batch purchase and printing of shipping labels for multiple orders (recommended 10-20 at a time), with order combination detection for same buyers.', year: 2018, market: 'global', sourceUrl: 'https://www.ebay.com/help/selling/posting-items/labels-packaging-tips/buying-printing-postage-labels?id=4157' },
  { id: 'customs-declaration-automation', name: 'Customs Declaration Automation', type: 'category', tier: 'feature', status: 'current', parent: 'shipping', desc: 'Automated pre-filled USPS customs forms (PS Form 2976, 2976-A) combined with shipping labels for international shipments through eBay Labels.', year: 2018, market: ['US', 'global'], sourceUrl: 'https://pages.ebay.com/services/buyandsell/shippinginternational/' },

  // SHIPPING TOOLS
  { id: 'time-away', name: 'Time Away', type: 'category', tier: 'feature', status: 'current', parent: 'seller-tools', desc: 'Allows sellers to pause sales (hide listings) or continue sales with automatic handling time adjustments and buyer notifications. Includes automatic messaging for buyer inquiries. Vacation mode.', year: 2015, market: 'global', sourceUrl: 'https://www.ebay.com/help/selling/selling-tools/time-away?id=5137' },
  { id: 'freight-shipping', name: 'eBay Freight Shipping', type: 'category', tier: 'program', status: 'current', parent: 'shipping', desc: 'Shipping service for oversized items over 150 lbs or exceeding 130 inches combined dimensions. Primarily LTL (Less Than Load) shipments with two official freight partners listed.', year: 2020, market: 'US', sourceUrl: 'https://www.ebay.com/sellercenter/shipping/choosing-a-carrier-and-service/freight' },

  // DISCONTINUED SHIPPING
  { id: 'ebay-now', name: 'eBay Now', type: 'category', tier: 'program', status: 'legacy', parent: 'shipping', desc: 'Same-day delivery program launched 2012-2013 offering $5 flat fee delivery in NYC, Chicago, Dallas, and San Francisco Bay Area. Discontinued in 2015.', year: 2012, market: 'US', sourceUrl: 'https://www.cnbc.com/2015/07/28/ebay-finally-kills-off-its-same-day-delivery-service-in-the-us.html' },

  // CATEGORY-SPECIFIC PROGRAMS
  { id: 'ebay-breaks', name: 'eBay Breaks', type: 'category', tier: 'program', status: 'current', parent: 'collectibles', desc: 'Live events where hosts open trading card packs/boxes on livestream. Participants purchase spots representing teams, players, or divisions. Available only through pre-approved, vetted sellers.', year: 2024, market: 'US', sourceUrl: 'https://pages.ebay.com/breaks/' },
  { id: 'endless-runway', name: 'eBay Endless Runway', type: 'category', tier: 'program', status: 'current', parent: 'fashion', desc: 'Fashion initiative featuring pre-loved fashion on runways around the world, promoting sustainable luxury fashion. Part of eBay fashion sustainability efforts.', year: 2024, market: 'global', sourceUrl: 'https://pages.ebay.com/fashionmonth/' },
  { id: 'circular-fashion-fund', name: 'Circular Fashion Fund', type: 'impact', tier: 'program', status: 'current', parent: 'impact', desc: 'Supports innovative businesses extending life of fashion through resale, repair and circular design. Eight finalists receive $50K grants plus mentoring; one Global Winner receives $300K investment from eBay Ventures.', year: 2024, market: 'global', sourceUrl: 'https://pages.ebay.com/circularfashionfund/' },
  { id: 'trade-in-uk', name: 'eBay Trade In', type: 'category', tier: 'program', status: 'current', parent: 'electronics', desc: 'Partnership with Fonehouse allowing customers to trade in electronics (phones, tablets, smartwatches, consoles, laptops) across 8 categories for instant eBay coupons or bank payment. Includes ADISA-accredited data erasure and insurance up to £150.', year: 2024, market: 'UK', sourceUrl: 'https://trade-in.ebay.co.uk/' },
  { id: 'ebay-wine', name: 'eBay Wine', type: 'category', tier: 'program', status: 'current', parent: 'specialty', desc: 'Partnership with WineDirect bringing 1,400+ wineries to eBay Wine marketplace with 10,000+ selections. Pre-approved sellers only due to regulatory requirements. Features collectible, rare and everyday wines.', year: 2016, market: 'US', sourceUrl: 'https://www.ebayinc.com/stories/news/ebay-partners-with-winedirect-to-support-thousands-of-craft-wineries-and-grow-wine-mark/' },
  { id: 'ebay-real-estate', name: 'eBay Real Estate', type: 'category', tier: 'program', status: 'current', parent: 'specialty', desc: 'Non-binding advertising platform for real estate with three formats: auction, fixed price, and traditional listings (30-90 day advertising). Includes Item Specifics (bedrooms, square footage). Licensed professionals can list for third parties.', year: 2010, market: 'US', sourceUrl: 'https://pages.ebay.com/realestate/learn1.html' },
  { id: 'domain-marketplace', name: 'eBay Domain Marketplace', type: 'category', tier: 'program', status: 'current', parent: 'specialty', desc: 'Marketplace for buying/selling domain names via Best Offer, Auction, and Buy It Now formats. Features premium and standard domains. No eBay account required for buyers.', year: 2015, market: 'global', sourceUrl: 'https://www.ebay.com/b/Domain-Name-Services/3767/bn_2313581' },

  // VERTICAL-SPECIFIC PROGRAMS
  { id: 'fitment-plus', name: 'eBay Fitment Plus', type: 'category', tier: 'feature', status: 'current', parent: 'motors', desc: 'Free service automatically adding/updating vehicle compatibility data to Parts & Accessories listings using brand and part number matching. Works with eBay Guaranteed Fit program.', year: 2024, market: 'US', sourceUrl: 'https://www.ebay.com/sellercenter/ebay-for-business/ebay-fitment-plus' },
  { id: 'guaranteed-fit', name: 'eBay Guaranteed Fit', type: 'trust', tier: 'program', status: 'current', parent: 'motors', desc: 'Protection program for Parts & Accessories buyers. eBay verifies vehicle details match seller compatibility; eBay pays return shipping for fitment issues. Covers most automotive parts for cars, trucks, motorcycles.', year: 2024, market: 'US', sourceUrl: 'https://pages.ebay.com/motors/ebay-guaranteed-fit/' },
  { id: 'business-supply', name: 'eBay Business Supply', type: 'category', tier: 'program', status: 'current', parent: 'business', desc: 'B2B umbrella combining Business & Industrial category, SAP Ariba Spot Buy integration, and eBay Wholesale Deals. Includes corporate procurement access to millions of MRO, electrical, technology, office supplies from vetted sellers. Pricing: $21.95-$2,999.95/month.', year: 2024, market: ['US', 'global'], sourceUrl: 'https://www.ebayinc.com/stories/news/introducing-ebay-business-supply/' },
  { id: 'bulk-inventory-solution', name: 'Bulk Inventory Solution', type: 'category', tier: 'program', status: 'current', parent: 'business-supply', desc: 'Exclusive marketplace connecting vetted wholesalers to eBay sellers. Partnership with BULQ offers excess/returned inventory from top retailers. Includes electronics, clothing, and more for resale.', year: 2024, market: 'US', sourceUrl: 'https://pages.ebay.com/bulk-inventory-solution/index.html' },
  { id: 'ebay-authenticate-handbags', name: 'eBay Authenticate', type: 'trust', tier: 'program', status: 'current', parent: 'authentication-guarantee', desc: 'New streamlined service (2025) where sellers receive 80% of final sale price for luxury handbags $500+ from 12 high-end brands. Different from standard Authenticity Guarantee - consignment-style model.', year: 2025, market: 'US', sourceUrl: 'https://innovation.ebayinc.com/stories/ebay-authenticate-makes-buying-and-selling-luxury-handbags-easy/' },
  { id: 'psa-grading-integration', name: 'PSA Grading Integration', type: 'category', tier: 'feature', status: 'current', parent: 'authentication-guarantee', desc: 'Integration allowing collectors to send cards directly to PSA for grading through eBay Authenticity Guarantee without separate PSA account. Pricing matches PSA tiers ($39.99-$10,000 per card). Streamlines shipping process.', year: 2024, market: 'US', sourceUrl: 'https://www.cllct.com/sports-collectibles/sports-cards/ebay-adds-new-feature-to-send-raw-cards-to-psa-for-grading' },
  { id: 'heavy-equipment-verified', name: 'Heavy Equipment Verified Condition', type: 'trust', tier: 'program', status: 'current', parent: 'business-supply', desc: 'Detailed condition verification reports for Business & Industrial heavy equipment. Purchases up to $200,000 backed by Business Equipment Purchase Protection.', year: 2024, market: 'US', sourceUrl: 'https://pages.ebay.com/business-industrial/heavy-equipment/verified-condition/' },
];

// Add high-value relationships to key programs
export const ENRICHED_PROGRAMS: GraphNode[] = [...BASE_PROGRAMS, ...MISSING_PARENT_NODES].map(node => {
  const enhanced = { ...node };
  let newRels: GraphRelationship[] = [];

  // Add relationships based on program knowledge
  // This is the manual enrichment phase - starting with high-value relationships

  switch (node.id) {
    case 'ebay':
      newRels = [
        { target: 'seller-hub', type: 'integrates_with', year: 2016, desc: 'Seller Hub is the primary seller dashboard under the eBay masterbrand' },
        { target: 'managed-payments', type: 'integrates_with', year: 2018, desc: 'Managed Payments is eBay\'s owned payment processing replacing PayPal' },
        { target: 'authenticity-guarantee', type: 'integrates_with', year: 2020, desc: 'AG is a flagship trust program under the eBay masterbrand' },
        { target: 'ebay-advertising', type: 'integrates_with', year: 2015, desc: 'eBay Advertising portfolio sits under the eBay masterbrand' },
        { target: 'ebay-international-shipping', type: 'integrates_with', year: 2021, desc: 'eBay International Shipping is a key logistics program' },
        { target: 'ebay-money-back-guarantee', type: 'integrates_with', year: 2011, desc: 'MBG is eBay\'s core buyer protection promise' },
        { target: 'paypal', type: 'related_to', year: 2002, desc: 'PayPal was eBay\'s primary payment method for over a decade before spinoff' },
        { target: 'ebay-stores', type: 'integrates_with', year: 2002, desc: 'eBay Stores subscription tiers are a core seller program' },
        { target: 'promoted-listings', type: 'integrates_with', year: 2015, desc: 'Promoted Listings is eBay\'s flagship advertising product' },
        { target: 'top-rated-seller', type: 'integrates_with', year: 2010, desc: 'Top Rated Seller is eBay\'s premier seller recognition program' },
      ];
      break;

    case 'ebay-motors':
      newRels = [
        { target: 'ebay', type: 'related_to', year: 1999, desc: 'eBay Motors launched as dedicated auto vertical under eBay' },
        { target: 'parts-compatibility', type: 'integrates_with', year: 2005, desc: 'Parts Compatibility is core to Motors parts & accessories experience' },
        { target: 'vehicle-history-report', type: 'integrates_with', year: 2006, desc: 'Vehicle History Reports are key trust feature for Motors vehicle listings' },
        { target: 'vehicle-purchase-protection', type: 'integrates_with', year: 2009, desc: 'Vehicle Purchase Protection covers buyers on Motors vehicle transactions' },
        { target: 'fitment-compatibility', type: 'integrates_with', year: 2008, desc: 'Fitment Compatibility ensures parts match buyer vehicles' },
        { target: 'fitment-plus', type: 'integrates_with', year: 2015, desc: 'Fitment Plus enhances compatibility data for Motors parts' },
        { target: 'guaranteed-fit', type: 'integrates_with', year: 2019, desc: 'Guaranteed Fit provides fitment assurance for US automotive parts' },
        { target: 'assured-fit', type: 'integrates_with', year: 2021, desc: 'Assured Fit is the UK equivalent of Guaranteed Fit' },
        { target: 'vin-lookup', type: 'integrates_with', year: 2010, desc: 'VIN Lookup enables vehicle identification for compatibility checks' },
        { target: 'shop-by-diagram', type: 'integrates_with', year: 2012, desc: 'Shop by Diagram visual parts lookup is unique to Motors category' },
        { target: 'sgs-vehicle-inspections', type: 'integrates_with', year: 2018, desc: 'SGS Vehicle Inspections provides third-party condition verification' },
        { target: 'heavy-equipment-verified', type: 'integrates_with', year: 2020, desc: 'Heavy Equipment Verified Condition program for B2B Motors listings' },
        { target: 'my-garage', type: 'integrates_with', year: 2014, desc: 'My Garage stores vehicle profiles for compatibility filtering' },
        { target: 'verticals', type: 'related_to', year: 1999 },
        { target: 'ebay-motors-parts', type: 'integrates_with', year: 1999, desc: 'Parts & Accessories is a major sub-vertical of eBay Motors' },
        { target: 'fitment-plus-auto', type: 'integrates_with' },
        { target: 'ebay-guaranteed-fit', type: 'integrates_with' },
        { target: 'ebay-assured-fit', type: 'integrates_with' },
        { target: 'ebay-auto', type: 'related_to', desc: 'eBay Auto is the French market equivalent' },
        { target: 'heavy-equipment-verified', type: 'related_to' },
      ];
      break;

    case 'collectibles-trading':
      newRels = [
        { target: 'ebay', type: 'related_to', year: 1995, desc: 'Collectibles was one of eBay\'s founding category strengths' },
        { target: 'authenticity-guarantee-trading-cards', type: 'integrates_with', year: 2021, desc: 'Trading card authentication is a key trust feature in this umbrella' },
        { target: 'tcgplayer', type: 'integrates_with', year: 2022, desc: 'TCGplayer acquisition expanded trading card marketplace capabilities' },
        { target: 'tcgplayer-marketplace', type: 'integrates_with', year: 2022 },
        { target: 'tcgplayer-authentication-center', type: 'integrates_with', year: 2022 },
        { target: 'psa-grading-integration', type: 'integrates_with', year: 2021, desc: 'PSA grading integration supports trading card authentication' },
        { target: 'wata-grading', type: 'integrates_with', year: 2022, desc: 'WATA grading supports video game authentication' },
        { target: 'goldin-auctions', type: 'integrates_with', year: 2022, desc: 'Goldin Auctions acquisition added premium sports card auction capability' },
        { target: 'comc', type: 'integrates_with', year: 2022, desc: 'COMC acquisition added card marketplace and grading hub' },
        { target: 'my-collection', type: 'integrates_with', year: 2021, desc: 'My Collection feature enables collectors to catalog owned items' },
        { target: 'collectibles-price-guide', type: 'integrates_with', year: 2020, desc: 'Price Guide provides market value data for collectibles' },
        { target: 'trading-card-hub', type: 'integrates_with', year: 2021, desc: 'Trading Card Hub is the dedicated portal for card collectors' },
        { target: 'trading-card-authentication', type: 'integrates_with', year: 2021 },
        { target: 'verticals', type: 'related_to' },
      ];
      break;

    case 'fashion-luxury':
      newRels = [
        { target: 'authenticity-guarantee-handbags', type: 'integrates_with', year: 2021 },
        { target: 'authenticity-guarantee-watches', type: 'integrates_with', year: 2020 },
        { target: 'authenticity-guarantee-sneakers', type: 'integrates_with', year: 2020 },
        { target: 'authenticity-guarantee-jewelry', type: 'integrates_with', year: 2022 },
        { target: 'authenticity-guarantee-streetwear', type: 'integrates_with', year: 2022 },
        { target: 'ebay-vault', type: 'integrates_with', year: 2022, desc: 'The Vault enables storage and trading of authenticated luxury items without physical transfer' },
        { target: 'handbag-authentication', type: 'integrates_with', year: 2021 },
        { target: 'sneaker-authentication', type: 'integrates_with', year: 2020 },
        { target: 'watch-authentication', type: 'integrates_with', year: 2020 },
        { target: 'jewelry-authentication', type: 'integrates_with', year: 2022 },
        { target: 'pre-loved-partner-program', type: 'integrates_with', year: 2022, desc: 'Pre-loved Partner Program drives secondhand fashion supply' },
        { target: 'circular-fashion-fund', type: 'integrates_with', year: 2022 },
        { target: 'ag-designer-fashion-de', type: 'integrates_with', year: 2023, desc: 'German designer fashion authentication program' },
        { target: 'assured-fit', type: 'integrates_with', year: 2021 },
        { target: 'verticals', type: 'related_to' },
      ];
      break;

    case 'refurbished-open-box':
      newRels = [
        { target: 'ebay-refurbished', type: 'integrates_with', year: 2019, desc: 'eBay Refurbished is the flagship program under this umbrella' },
        { target: 'certified-refurbished', type: 'integrates_with', year: 2020, desc: 'Certified Refurbished is the top tier of eBay Refurbished' },
        { target: 'excellent-refurbished', type: 'integrates_with', year: 2020 },
        { target: 'very-good-refurbished', type: 'integrates_with', year: 2020 },
        { target: 'good-refurbished', type: 'integrates_with', year: 2020 },
        { target: 'certified-open-box', type: 'integrates_with', year: 2021 },
        { target: 'ebay-refurbished-warranty', type: 'integrates_with', year: 2021, desc: 'Refurbished Warranty backs certified items' },
        { target: 'certified-by-brand', type: 'integrates_with', year: 2022, desc: 'Certified by Brand enables OEM-backed refurbished listings' },
        { target: 'electronics-technology', type: 'related_to', year: 2019, desc: 'Refurbished is strongest in electronics category' },
        { target: 'verticals', type: 'related_to' },
      ];
      break;

    case 'electronics-technology':
      newRels = [
        { target: 'refurbished-open-box', type: 'related_to', year: 2019 },
        { target: 'ebay-refurbished', type: 'integrates_with', year: 2019 },
        { target: 'certified-refurbished', type: 'integrates_with', year: 2020 },
        { target: 'parts-compatibility', type: 'integrates_with', year: 2010, desc: 'Parts compatibility applies to electronics accessories' },
        { target: 'verticals', type: 'related_to' },
      ];
      break;

    case 'home-garden':
      newRels = [
        { target: 'augmented-reality-preview', type: 'integrates_with', year: 2021, desc: 'AR Preview launched primarily for Home & Garden furniture/decor' },
        { target: 'verticals', type: 'related_to' },
      ];
      break;

    case 'business-industrial':
      newRels = [
        { target: 'ebay-business-supply', type: 'integrates_with', year: 2019, desc: 'eBay Business Supply is the B2B procurement program' },
        { target: 'business-supply', type: 'integrates_with', year: 2019 },
        { target: 'heavy-equipment-verified', type: 'integrates_with', year: 2020 },
        { target: 'bulk-inventory-solution', type: 'integrates_with', year: 2021, desc: 'Bulk Inventory Solution targets high-volume B2B sellers' },
        { target: 'verticals', type: 'related_to' },
        { target: 'ebay-business-supply', type: 'related_to', year: 2005 },
        { target: 'business-equipment-purchase-protection', type: 'integrates_with', year: 2019 },
        { target: 'freight-shipping', type: 'integrates_with', year: 2005, desc: 'Heavy equipment requires freight shipping' },
        { target: 'classified-ads', type: 'integrates_with', year: 2005, desc: 'Classified ads common for large B2B equipment' },
        { target: 'bulk-listing-tools', type: 'integrates_with', year: 2015 },
        { target: 'seller-hub', type: 'integrates_with', year: 2015 },
      ];
      break;

    case 'everything-else':
      newRels = [
        { target: 'ebay-gift-cards', type: 'integrates_with', year: 2008 },
        { target: 'ebay-real-estate', type: 'integrates_with', year: 2001 },
        { target: 'ebay-wine', type: 'integrates_with', year: 2010 },
        { target: 'domain-marketplace', type: 'integrates_with', year: 2005 },
        { target: 'verticals', type: 'related_to' },
      ];
      break;

    case 'trust-safety':
      newRels = [
        { target: 'authenticity-guarantee', type: 'integrates_with', year: 2020 },
        { target: 'ebay-money-back-guarantee', type: 'integrates_with', year: 2011 },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2008 },
        { target: 'top-rated-seller', type: 'integrates_with', year: 2010 },
        { target: 'vero-program', type: 'integrates_with', year: 1998, desc: 'VeRO protects intellectual property on the platform' },
        { target: 'ebay-money-back-guarantee', type: 'integrates_with', year: 2011 },
        { target: 'buyer-protection', type: 'integrates_with', year: 2008 },
        { target: 'security-center', type: 'integrates_with', year: 2010 },
        { target: 'safeharbor', type: 'related_to', year: 1998, desc: 'SafeHarbor was the legacy trust/safety program' },
        { target: 'account-security', type: 'integrates_with', year: 2004 },
      ];
      break;

    case 'ebay-advertising':
      newRels = [
        { target: 'promoted-listings', type: 'integrates_with', year: 2015 },
        { target: 'promoted-listings-standard', type: 'integrates_with', year: 2015 },
        { target: 'promoted-listings-advanced', type: 'integrates_with', year: 2018 },
        { target: 'promoted-stores', type: 'integrates_with', year: 2019 },
        { target: 'promoted-offsite', type: 'integrates_with', year: 2020 },
        { target: 'offsite-ads', type: 'integrates_with', year: 2020 },
        { target: 'managed-display', type: 'integrates_with', year: 2021 },
        { target: 'seller-hub', type: 'integrates_with', year: 2016, desc: 'Advertising dashboard is accessed through Seller Hub' },
        { target: 'advertising-dashboard', type: 'integrates_with', year: 2019 },
        { target: 'advertising', type: 'related_to' },
        { target: 'promoted-brand', type: 'integrates_with' },
        { target: 'ad-rate-recommendation', type: 'integrates_with' },
        { target: 'keyword-targeting', type: 'integrates_with' },
        { target: 'audience-targeting', type: 'integrates_with' },
      ];
      break;

    case 'shipping-logistics':
      newRels = [
        { target: 'ebay-international-shipping', type: 'integrates_with', year: 2021 },
        { target: 'global-shipping-program', type: 'related_to', year: 2012, desc: 'GSP was predecessor to eBay International Shipping' },
        { target: 'ebay-fulfilment', type: 'integrates_with', year: 2019 },
        { target: 'shipping-labels', type: 'integrates_with', year: 2012 },
        { target: 'managed-delivery', type: 'integrates_with', year: 2020 },
        { target: 'shipcover-insurance', type: 'integrates_with', year: 2014 },
        { target: 'ebay-standard-envelope', type: 'integrates_with', year: 2020 },
        { target: 'simple-delivery', type: 'integrates_with', year: 2023 },
        { target: 'freight-shipping', type: 'integrates_with', year: 2018 },
        { target: 'shipping-partner-platform', type: 'integrates_with', year: 2019 },
      ];
      break;

    case 'ebay-stores':
      newRels = [
        { target: 'seller-hub', type: 'integrates_with', year: 2016, desc: 'Seller Hub is the primary management interface for store owners' },
        { target: 'store-tier-starter', type: 'integrates_with', year: 2019 },
        { target: 'store-tier-basic', type: 'integrates_with', year: 2002 },
        { target: 'store-tier-premium', type: 'integrates_with', year: 2002 },
        { target: 'store-tier-anchor', type: 'integrates_with', year: 2002 },
        { target: 'store-tier-enterprise', type: 'integrates_with', year: 2015 },
        { target: 'promoted-stores', type: 'integrates_with', year: 2019, desc: 'Promoted Stores advertising product targets store subscribers' },
        { target: 'store-email-campaigns', type: 'integrates_with', year: 2008 },
        { target: 'store-newsletters', type: 'integrates_with', year: 2006 },
        { target: 'brand-outlet', type: 'integrates_with', year: 2018, desc: 'Brand Outlet leverages eBay Stores infrastructure' },
        { target: 'ebay-stores-basic', type: 'related_to', year: 2002 },
        { target: 'stores', type: 'related_to' },
        { target: 'ebay-stores-multi-market', type: 'related_to', year: 2001, desc: 'Multi-market product node covering all store tiers globally' },
        { target: 'ebay-stores-premium', type: 'related_to' },
        { target: 'ebay-stores-enterprise', type: 'related_to' },
        { target: 'discounts-manager', type: 'integrates_with', desc: 'Store subscribers get expanded promotions capacity' },
        { target: 'store-categories', type: 'integrates_with' },
        { target: 'store-header', type: 'integrates_with' },
        { target: 'markdown-manager', type: 'related_to' },
        { target: 'selling-manager-pro', type: 'related_to', desc: 'Selling Manager Pro historically bundled with store subscriptions' },
      ];
      break;

    case 'seller-tools-hub':
      newRels = [
        { target: 'seller-hub', type: 'integrates_with', year: 2016, desc: 'Seller Hub is the primary dashboard under this umbrella' },
        { target: 'selling-manager', type: 'replaced_by', year: 2016, desc: 'Selling Manager was replaced by Seller Hub' },
        { target: 'selling-manager-pro', type: 'replaced_by', year: 2016 },
        { target: 'terapeak', type: 'integrates_with', year: 2017, desc: 'Terapeak (now Product Research) is the analytics tool for sellers' },
        { target: 'product-research', type: 'integrates_with', year: 2024 },
        { target: 'promotions-manager', type: 'integrates_with', year: 2018 },
        { target: 'discounts-manager', type: 'integrates_with', year: 2022 },
        { target: 'bulk-listing-tool', type: 'integrates_with', year: 2010 },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2008 },
        { target: 'business-policies', type: 'integrates_with', year: 2013 },
      ];
      break;

    case 'payments-checkout':
      newRels = [
        { target: 'managed-payments', type: 'integrates_with', year: 2018, desc: 'Managed Payments is the core payment infrastructure' },
        { target: 'paypal', type: 'replaced_by', year: 2021, desc: 'PayPal was replaced by Managed Payments as primary checkout' },
        { target: 'checkout', type: 'integrates_with', year: 2002 },
        { target: 'apple-pay', type: 'integrates_with', year: 2020 },
        { target: 'google-pay', type: 'integrates_with', year: 2020 },
        { target: 'venmo', type: 'integrates_with', year: 2020 },
        { target: 'klarna', type: 'integrates_with', year: 2021 },
        { target: 'pay-in-4', type: 'integrates_with', year: 2021 },
        { target: 'sales-tax-collection', type: 'integrates_with', year: 2019 },
        { target: 'vat-collection', type: 'integrates_with', year: 2021 },
        { target: 'ebay-seller-capital', type: 'integrates_with', year: 2022, desc: 'eBay Seller Capital lending program integrates with payments infrastructure' },
      ];
      break;

    case 'live-commerce':
      newRels = [
        { target: 'ebay-live', type: 'integrates_with', year: 2022, desc: 'eBay Live is the flagship live streaming shopping product' },
        { target: 'seller-hub', type: 'integrates_with', year: 2022, desc: 'Live events are managed through Seller Hub' },
        { target: 'promoted-listings', type: 'integrates_with', year: 2022, desc: 'Live events can be promoted via advertising products' },
      ];
      break;

    case 'discovery-buyer-experience':
      newRels = [
        { target: 'cassini', type: 'integrates_with', year: 2013, desc: 'Cassini is eBay\'s search algorithm powering discovery' },
        { target: 'best-match', type: 'integrates_with', year: 2008, desc: 'Best Match is the default sort powered by Cassini' },
        { target: 'my-ebay', type: 'integrates_with', year: 1996, desc: 'My eBay is the primary buyer dashboard' },
        { target: 'watchlist', type: 'integrates_with', year: 2001 },
        { target: 'saved-searches', type: 'integrates_with', year: 2003 },
        { target: 'image-search', type: 'integrates_with', year: 2017 },
        { target: 'advanced-search', type: 'integrates_with', year: 2003 },
        { target: 'personalized-feed', type: 'integrates_with', year: 2021 },
        { target: 'ai-shopping-agent', type: 'integrates_with', year: 2024 },
      ];
      break;

    case 'community-education':
      newRels = [
        { target: 'ebay-community', type: 'integrates_with', year: 2002 },
        { target: 'ebay-academy', type: 'integrates_with', year: 2018 },
        { target: 'ebay-university', type: 'replaced_by', year: 2018, desc: 'eBay University was renamed to eBay Academy' },
        { target: 'seller-clinics', type: 'integrates_with', year: 2015 },
        { target: 'seller-community', type: 'integrates_with', year: 2010 },
        { target: 'community-mentor-program', type: 'integrates_with', year: 2019 },
        { target: 'ebay-radio', type: 'related_to', year: 2009, desc: 'eBay Radio was a legacy seller education channel' },
      ];
      break;

    case 'events-campaigns':
      newRels = [
        { target: 'black-friday-deals', type: 'integrates_with', year: 2010 },
        { target: 'cyber-monday', type: 'integrates_with', year: 2010 },
        { target: 'anniversary-sale', type: 'integrates_with', year: 2005 },
        { target: 'back-to-school', type: 'integrates_with', year: 2012 },
        { target: 'green-monday', type: 'integrates_with', year: 2012 },
        { target: 'holiday-gift-guide', type: 'integrates_with', year: 2010 },
        { target: 'ebay-deals', type: 'integrates_with', year: 2010 },
        { target: 'promotions-manager', type: 'integrates_with', year: 2018, desc: 'Promotions Manager is the tool sellers use to participate in campaigns' },
      ];
      break;

    case 'developer-platform':
      newRels = [
        { target: 'ebay-developers-program', type: 'integrates_with', year: 2000 },
        { target: 'merchant-integration-platform', type: 'integrates_with', year: 2015 },
        { target: 'api-sandbox', type: 'integrates_with', year: 2005 },
        { target: 'api-explorer', type: 'integrates_with', year: 2018 },
        { target: 'ebay-partner-network', type: 'integrates_with', year: 2008, desc: 'Partner Network enables affiliate and developer revenue' },
        { target: 'developer-loyalty-program', type: 'integrates_with', year: 2020 },
        { target: 'techstars-future-of-ecommerce', type: 'integrates_with', year: 2019 },
        { target: 'notification-api', type: 'integrates_with', year: 2015 },
        { target: 'catalog-api', type: 'integrates_with', year: 2018 },
        { target: 'xcommerce', type: 'related_to', year: 2011, desc: 'X.commerce was eBay\'s legacy developer commerce platform' },
        { target: 'magento', type: 'related_to', year: 2011, desc: 'Magento was an eBay developer ecosystem acquisition' },
      ];
      break;

    case 'ebay-money-back-guarantee':
      newRels = [
        { target: 'trust-safety', type: 'depends_on', year: 2011 },
        { target: 'buyer-protection', type: 'related_to', year: 2008 },
        { target: 'resolution-center-multi-market', type: 'integrates_with', year: 2011, desc: 'Resolution Center handles MBG claims' },
        { target: 'managed-payments', type: 'depends_on', year: 2018, desc: 'Managed Payments enables automatic refund disbursement' },
        { target: 'item-not-received', type: 'related_to', year: 2011, desc: 'Item Not Received is a primary MBG claim trigger' },
        { target: 'significantly-not-as-described', type: 'related_to', year: 2011, desc: 'SNAD is a primary MBG claim trigger' },
        { target: 'money-back-guarantee', type: 'related_to', year: 2008 },
        { target: 'purchase-protection', type: 'related_to', year: 2010 },
        { target: 'ebay-buyer-guarantee', type: 'related_to', year: 2015 },
      ];
      break;

    case 'advertising':
      newRels = [
        { target: 'ebay-advertising', type: 'related_to' },
        { target: 'promoted-listings', type: 'integrates_with', year: 2015 },
        { target: 'promoted-listings-standard', type: 'integrates_with', year: 2015 },
        { target: 'promoted-listings-advanced', type: 'integrates_with', year: 2018 },
        { target: 'promoted-stores', type: 'integrates_with', year: 2019 },
        { target: 'promoted-offsite', type: 'integrates_with', year: 2020 },
        { target: 'offsite-ads', type: 'integrates_with', year: 2020 },
        { target: 'managed-display', type: 'integrates_with', year: 2021 },
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
      ];
      break;

    case 'analytics':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2016, desc: 'Analytics tools are surfaced within Seller Hub' },
        { target: 'terapeak', type: 'integrates_with', year: 2017 },
        { target: 'product-research', type: 'integrates_with', year: 2024 },
        { target: 'traffic-report', type: 'integrates_with', year: 2016 },
        { target: 'sales-report', type: 'integrates_with', year: 2010 },
        { target: 'listing-quality-report', type: 'integrates_with', year: 2018 },
        { target: 'sourcing-insights', type: 'integrates_with', year: 2022 },
        { target: 'advertising-dashboard', type: 'integrates_with', year: 2019 },
        { target: 'performance-dashboard', type: 'integrates_with', year: 2018 },
        { target: 'service-metrics-dashboard', type: 'integrates_with', year: 2020 },
      ];
      break;

    case 'auction':
      newRels = [
        { target: 'automatic-bidding', type: 'integrates_with', year: 1995 },
        { target: 'proxy-bidding', type: 'integrates_with', year: 1995 },
        { target: 'bid-increment', type: 'integrates_with', year: 1995 },
        { target: 'reserve-price', type: 'integrates_with', year: 1996 },
        { target: 'second-chance-offer', type: 'integrates_with', year: 2002 },
        { target: 'buy-it-now-in-auctions', type: 'integrates_with', year: 2000, desc: 'BIN in auctions allows immediate purchase before bidding starts' },
        { target: 'auction-format', type: 'related_to' },
        { target: 'auction-style-listings', type: 'related_to' },
        { target: 'listing-formats', type: 'related_to' },
        { target: 'goldin-auctions', type: 'related_to', year: 2022 },
        { target: 'fixed-price-format', type: 'competes_with', desc: 'Auction format competes with fixed-price as the two primary eBay listing models' },
        { target: 'bidding', type: 'integrates_with', desc: 'Bidding is the core mechanism of auction-format listings' },
        { target: 'best-offer', type: 'related_to', desc: 'Best Offer can be combined with auction listings' },
        { target: 'buy-it-now', type: 'integrates_with', desc: 'Buy It Now can be added to auction listings before first bid' },
        { target: 'winning-bid', type: 'integrates_with', desc: 'Winning Bid is the auction\'s terminal state outcome' },
        { target: 'listing-formats', type: 'depends_on', desc: 'Auction is a listing format under the Listing Formats umbrella' },
      ];
      break;

    case 'authentication':
      newRels = [
        { target: 'authenticity-guarantee', type: 'integrates_with', year: 2020 },
        { target: 'authenticity-guarantee-sneakers', type: 'integrates_with', year: 2020 },
        { target: 'authenticity-guarantee-handbags', type: 'integrates_with', year: 2021 },
        { target: 'authenticity-guarantee-watches', type: 'integrates_with', year: 2020 },
        { target: 'authenticity-guarantee-jewelry', type: 'integrates_with', year: 2022 },
        { target: 'authenticity-guarantee-trading-cards', type: 'integrates_with', year: 2021 },
        { target: 'authenticity-guarantee-streetwear', type: 'integrates_with', year: 2022 },
        { target: 'sneaker-authentication', type: 'integrates_with', year: 2020 },
        { target: 'handbag-authentication', type: 'integrates_with', year: 2021 },
        { target: 'watch-authentication', type: 'integrates_with', year: 2020 },
        { target: 'jewelry-authentication', type: 'integrates_with', year: 2022 },
        { target: 'trading-card-authentication', type: 'integrates_with', year: 2021 },
        { target: 'ebay-authenticate', type: 'renamed_from', year: 2020, desc: 'eBay Authenticate was the prior brand name before AG' },
        { target: 'trust-safety', type: 'depends_on' },
        { target: 'trust', type: 'integrates_with', year: 2017, desc: 'Authentication sits within the Trust & Safety umbrella' },
        { target: 'collectibles', type: 'integrates_with', year: 2020, desc: 'Authentication essential for collectibles category legitimacy' },
        { target: 'fashion', type: 'integrates_with', year: 2017, desc: 'Authentication underpins luxury fashion and handbag categories' },
        { target: 'vault', type: 'integrates_with', year: 2022, desc: 'Vault requires authentication for all stored items' },
        { target: 'trust-safety', type: 'integrates_with', year: 2017, desc: 'Authentication is a core pillar of trust-safety platform' },
      ];
      break;

    case 'browse':
      newRels = [
        { target: 'cassini', type: 'depends_on', year: 2013, desc: 'Browse results are ranked by Cassini search algorithm' },
        { target: 'best-match', type: 'integrates_with', year: 2008 },
        { target: 'search-filters', type: 'integrates_with', year: 2005 },
        { target: 'shop-by-category', type: 'integrates_with', year: 2000 },
        { target: 'image-search', type: 'integrates_with', year: 2017 },
        { target: 'discovery', type: 'related_to' },
        { target: 'discovery-buyer-experience', type: 'depends_on' },
      ];
      break;

    case 'bulk-tools':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2016 },
        { target: 'bulk-listing-tool', type: 'integrates_with', year: 2010 },
        { target: 'bulk-listing-tool-multi-market', type: 'integrates_with', year: 2015 },
        { target: 'bulk-edit', type: 'integrates_with', year: 2012 },
        { target: 'bulk-upload', type: 'integrates_with', year: 2010 },
        { target: 'csv-upload', type: 'integrates_with', year: 2008 },
        { target: 'magical-bulk-listing-tool', type: 'integrates_with', year: 2023 },
        { target: 'file-exchange', type: 'replaced_by', year: 2020, desc: 'File Exchange was a legacy bulk tool replaced by Seller Hub Reports' },
        { target: 'turbo-lister', type: 'replaced_by', year: 2018, desc: 'Turbo Lister was a legacy desktop bulk listing tool' },
        { target: 'seller-tools-hub', type: 'depends_on' },
      ];
      break;

    case 'buyer':
      newRels = [
        { target: 'my-ebay', type: 'integrates_with', year: 1996 },
        { target: 'watchlist', type: 'integrates_with', year: 2001 },
        { target: 'add-to-cart', type: 'integrates_with', year: 2013 },
        { target: 'checkout', type: 'integrates_with', year: 2002 },
        { target: 'purchase-history', type: 'integrates_with', year: 2002 },
        { target: 'ebay-money-back-guarantee', type: 'integrates_with', year: 2011 },
        { target: 'buy-again', type: 'integrates_with', year: 2018 },
        { target: 'saved-searches', type: 'integrates_with', year: 2003 },
        { target: 'discovery-buyer-experience', type: 'depends_on' },
        { target: 'buyer-protection', type: 'integrates_with', year: 1996, desc: 'Buyer umbrella encompasses buyer protection programs' },
        { target: 'trust', type: 'integrates_with', year: 1996, desc: 'Buyer programs depend on trust infrastructure' },
        { target: 'returns', type: 'integrates_with', year: 2011, desc: 'Returns programs are a key buyer-facing protection' },
        { target: 'purchase-protection', type: 'integrates_with', year: 1996, desc: 'Purchase protection falls under buyer umbrella' },
      ];
      break;

    case 'buyer-programs':
      newRels = [
        { target: 'ebay-bucks', type: 'related_to', year: 2006, desc: 'eBay Bucks was the legacy US loyalty/rewards program' },
        { target: 'ebay-plus', type: 'integrates_with', year: 2016, desc: 'eBay Plus is the current loyalty program in DE and AU' },
        { target: 'ebay-mastercard', type: 'integrates_with', year: 2019, desc: 'eBay Mastercard replaced eBay Bucks as US loyalty vehicle' },
        { target: 'ebay-money-back-guarantee', type: 'integrates_with', year: 2011 },
        { target: 'discovery-buyer-experience', type: 'depends_on' },
      ];
      break;

    case 'category':
      newRels = [
        { target: 'verticals', type: 'related_to' },
        { target: 'everything-else', type: 'depends_on' },
        { target: 'shop-by-category', type: 'integrates_with', year: 2000 },
      ];
      break;

    case 'charity':
      newRels = [
        { target: 'ebay-for-charity', type: 'integrates_with', year: 2003 },
        { target: 'ebay-for-charity-multi-market', type: 'integrates_with', year: 2010 },
        { target: 'aste-di-beneficenza', type: 'integrates_with', year: 2005 },
        { target: 'mission-fish-seller-account', type: 'replaced_by', year: 2010, desc: 'Mission Fish was the prior charity platform name' },
        { target: 'trust-safety', type: 'related_to' },
        { target: 'impact', type: 'related_to' },
        { target: 'impact', type: 'integrates_with', year: 2003, desc: 'Charity umbrella is a core pillar of the Impact cluster' },
        { target: 'ebay-foundation', type: 'integrates_with', year: 2003, desc: 'eBay Foundation partners with Charity umbrella on giving initiatives' },
        { target: 'payments', type: 'depends_on', year: 2003, desc: 'Charitable donations routed through payments infrastructure' },
      ];
      break;

    case 'collectibles':
      newRels = [
        { target: 'collectibles-trading', type: 'depends_on' },
        { target: 'antiques', type: 'integrates_with', year: 2000 },
        { target: 'coins-currency', type: 'integrates_with', year: 2000 },
        { target: 'stamps', type: 'integrates_with', year: 2000 },
        { target: 'comics', type: 'integrates_with', year: 2000 },
        { target: 'sports-memorabilia', type: 'integrates_with', year: 2000 },
        { target: 'fine-art', type: 'integrates_with', year: 2000 },
        { target: 'trading-card-hub', type: 'integrates_with', year: 2021 },
        { target: 'tcgplayer', type: 'integrates_with', year: 2022 },
        { target: 'goldin-auctions', type: 'integrates_with', year: 2022 },
        { target: 'my-collection', type: 'integrates_with', year: 2021 },
        { target: 'collectibles-price-guide', type: 'integrates_with', year: 2020 },
        { target: 'collectibles-trading', type: 'integrates_with', year: 2020, desc: 'Collectibles umbrella encompasses the collectibles-trading category' },
        { target: 'authentication', type: 'integrates_with', year: 2020, desc: 'Collectibles requires authentication services for high-value items' },
        { target: 'vault', type: 'integrates_with', year: 2022, desc: 'Vault stores and trades authenticated collectibles' },
        { target: 'authenticity-guarantee', type: 'integrates_with', year: 2020, desc: 'AG programs cover trading cards and collectibles' },
      ];
      break;

    case 'communication':
      newRels = [
        { target: 'message-center', type: 'integrates_with', year: 2002 },
        { target: 'in-app-messaging', type: 'integrates_with', year: 2018 },
        { target: 'ask-seller-question', type: 'integrates_with', year: 2002 },
        { target: 'buyer-messages', type: 'integrates_with', year: 2005 },
        { target: 'send-message', type: 'integrates_with', year: 2005 },
        { target: 'ebay-ai-message-assistance', type: 'integrates_with', year: 2024 },
        { target: 'ai-assistant-messaging', type: 'integrates_with', year: 2024 },
        { target: 'offers-in-messaging', type: 'integrates_with', year: 2023 },
        { target: 'email-notifications', type: 'integrates_with', year: 2000 },
        { target: 'push-notifications', type: 'integrates_with', year: 2014 },
        { target: 'discovery-buyer-experience', type: 'depends_on' },
      ];
      break;

    case 'community':
      newRels = [
        { target: 'ebay-community', type: 'integrates_with', year: 2002 },
        { target: 'community-forums', type: 'integrates_with', year: 2000 },
        { target: 'seller-community', type: 'integrates_with', year: 2010 },
        { target: 'community-mentor-program', type: 'integrates_with', year: 2019 },
        { target: 'about-me', type: 'integrates_with', year: 1998, desc: 'About Me pages were an early community feature' },
        { target: 'community-education', type: 'depends_on' },
        { target: 'community-education', type: 'integrates_with', year: 2000, desc: 'Community umbrella integrates with community-education programs' },
        { target: 'ebay-academy', type: 'integrates_with', year: 2010, desc: 'eBay Academy is the education arm of the Community umbrella' },
      ];
      break;

    case 'customer-service':
      newRels = [
        { target: 'ebay-customer-service', type: 'integrates_with', year: 2005 },
        { target: 'help-center', type: 'integrates_with', year: 2005 },
        { target: 'live-chat-support', type: 'integrates_with', year: 2015 },
        { target: 'phone-support', type: 'integrates_with', year: 2000 },
        { target: 'virtual-assistant', type: 'integrates_with', year: 2020 },
        { target: 'resolution-center-multi-market', type: 'integrates_with', year: 2008 },
        { target: 'seller-help', type: 'integrates_with', year: 2018 },
        { target: 'ebay-concierge', type: 'integrates_with', year: 2014, desc: 'eBay Concierge is the premium white-glove support tier' },
        { target: 'account-management-plus', type: 'integrates_with', year: 2018 },
        { target: 'account-management-premium', type: 'integrates_with', year: 2018 },
        { target: 'community-education', type: 'depends_on' },
      ];
      break;

    case 'developer':
      newRels = [
        { target: 'developer-platform', type: 'depends_on' },
        { target: 'ebay-developers-program', type: 'integrates_with', year: 2000 },
        { target: 'merchant-integration-platform', type: 'integrates_with', year: 2015 },
        { target: 'api-sandbox', type: 'integrates_with', year: 2005 },
        { target: 'api-explorer', type: 'integrates_with', year: 2018 },
        { target: 'notification-api', type: 'integrates_with', year: 2015 },
        { target: 'catalog-api', type: 'integrates_with', year: 2018 },
        { target: 'buy-marketing-api', type: 'integrates_with', year: 2020 },
        { target: 'ebay-partner-network', type: 'integrates_with', year: 2008 },
        { target: 'third-party-providers', type: 'integrates_with', year: 2010 },
        { target: 'developer-platform', type: 'integrates_with', year: 2000, desc: 'Developer umbrella maps directly to the Developer Platform umbrella' },
      ];
      break;

    case 'discovery':
      newRels = [
        { target: 'discovery-buyer-experience', type: 'depends_on' },
        { target: 'cassini', type: 'depends_on', year: 2013 },
        { target: 'best-match', type: 'integrates_with', year: 2008 },
        { target: 'image-search', type: 'integrates_with', year: 2017 },
        { target: 'personalized-feed', type: 'integrates_with', year: 2021 },
        { target: 'product-recommendations', type: 'integrates_with', year: 2019 },
        { target: 'shop-the-look', type: 'integrates_with', year: 2022 },
        { target: 'ai-shopping-agent', type: 'integrates_with', year: 2024 },
        { target: 'browse', type: 'related_to' },
        { target: 'search', type: 'related_to' },
        { target: 'discovery-buyer-experience', type: 'integrates_with', year: 2005, desc: 'Discovery umbrella integrates with the discovery-buyer-experience platform' },
        { target: 'saved-searches', type: 'integrates_with', year: 2005, desc: 'Saved Searches drives discovery and re-engagement' },
      ];
      break;

    case 'education':
      newRels = [
        { target: 'community-education', type: 'depends_on' },
        { target: 'ebay-academy', type: 'integrates_with', year: 2018 },
        { target: 'ebay-university', type: 'renamed_to', year: 2018, desc: 'eBay University was renamed to eBay Academy' },
        { target: 'seller-clinics', type: 'integrates_with', year: 2015 },
        { target: 'new-seller-journey', type: 'integrates_with', year: 2020 },
        { target: 'export-academy', type: 'integrates_with', year: 2019 },
      ];
      break;

    case 'feedback':
      newRels = [
        { target: 'trust-safety', type: 'depends_on' },
        { target: 'feedback-forum', type: 'integrates_with', year: 1995 },
        { target: 'detailed-seller-ratings', type: 'integrates_with', year: 2007 },
        { target: 'positive-feedback-percentage', type: 'integrates_with', year: 1995 },
        { target: 'leave-feedback', type: 'integrates_with', year: 1995 },
        { target: 'feedback-revision-request', type: 'integrates_with', year: 2008 },
        { target: 'reply-to-feedback', type: 'integrates_with', year: 2000 },
        { target: 'mutual-feedback-withdrawal', type: 'integrates_with', year: 2005 },
        { target: 'seller-performance-standards', type: 'related_to', year: 2008 },
      ];
      break;

    case 'impact':
      newRels = [
        { target: 'ebay-for-charity', type: 'integrates_with', year: 2003 },
        { target: 'ebay-foundation', type: 'integrates_with', year: 2010 },
        { target: 'circular-fashion-fund', type: 'integrates_with', year: 2022 },
        { target: 'certified-recycled-program', type: 'integrates_with', year: 2021 },
        { target: 'consommation-raisonnee', type: 'integrates_with', year: 2021 },
        { target: 'sustainability', type: 'related_to' },
        { target: 'pre-loved-partner-program', type: 'integrates_with', year: 2022 },
        { target: 'global-give', type: 'integrates_with', year: 2015 },
        { target: 'trust-safety', type: 'depends_on' },
        { target: 'charity', type: 'integrates_with', year: 2003, desc: 'Charity umbrella is a core sub-cluster of Impact' },
        { target: 'sustainability', type: 'integrates_with', year: 2010, desc: 'Sustainability initiatives are a key Impact pillar' },
        { target: 'ebay-impact-report', type: 'integrates_with', year: 2022, desc: 'Impact Report documents and communicates the Impact umbrella\'s work' },
        { target: 'recommerce-report', type: 'integrates_with', year: 2020, desc: 'Recommerce Report tracks sustainability impact metrics' },
      ];
      break;

    case 'international':
      newRels = [
        { target: 'ebay-international-shipping', type: 'integrates_with', year: 2021 },
        { target: 'global-shipping-program', type: 'replaced_by', year: 2021, desc: 'GSP was rebranded/replaced by eBay International Shipping' },
        { target: 'cross-border-trade', type: 'integrates_with', year: 2010 },
        { target: 'currency-conversion', type: 'integrates_with', year: 2008 },
        { target: 'import-charges', type: 'integrates_with', year: 2012 },
        { target: 'customs-declaration-automation', type: 'integrates_with', year: 2020 },
        { target: 'international-site-visibility', type: 'integrates_with', year: 2012 },
        { target: 'shipping-logistics', type: 'depends_on' },
      ];
      break;

    case 'inventory':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2016 },
        { target: 'inventory-management', type: 'integrates_with', year: 2016 },
        { target: 'out-of-stock-control', type: 'integrates_with', year: 2018 },
        { target: 'bulk-listing-tool', type: 'integrates_with', year: 2010 },
        { target: 'copy-to-inventory', type: 'integrates_with', year: 2018 },
        { target: 'inventory-mapping-api', type: 'integrates_with', year: 2022 },
        { target: 'seller-tools-hub', type: 'depends_on' },
      ];
      break;

    case 'listing':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2016 },
        { target: 'advanced-listing-tool', type: 'integrates_with', year: 2008 },
        { target: 'quick-listing-tool', type: 'integrates_with', year: 2015 },
        { target: 'magical-listing', type: 'integrates_with', year: 2022 },
        { target: 'ai-description-generator', type: 'integrates_with', year: 2023 },
        { target: 'background-enhancement', type: 'integrates_with', year: 2024 },
        { target: 'item-specifics', type: 'integrates_with', year: 2005 },
        { target: 'product-identifiers', type: 'integrates_with', year: 2015 },
        { target: 'listing-designer', type: 'replaced_by', year: 2008, desc: 'Listing Designer was superseded by Advanced Listing Tool' },
        { target: 'seller-tools-hub', type: 'depends_on' },
      ];
      break;

    case 'listing-features':
      newRels = [
        { target: 'listing', type: 'depends_on' },
        { target: 'gallery-plus', type: 'integrates_with', year: 2005 },
        { target: 'bold-title', type: 'integrates_with', year: 2000 },
        { target: 'subtitle', type: 'integrates_with', year: 2000 },
        { target: 'listing-upgrades', type: 'integrates_with', year: 2005 },
        { target: 'product-video', type: 'integrates_with', year: 2021 },
        { target: '360-spin', type: 'integrates_with', year: 2018 },
        { target: 'multi-variation-listing', type: 'integrates_with', year: 2010 },
        { target: 'seller-tools-hub', type: 'depends_on' },
      ];
      break;

    case 'listing-formats':
      newRels = [
        { target: 'auction-format', type: 'integrates_with', year: 1995 },
        { target: 'fixed-price-format', type: 'integrates_with', year: 2000 },
        { target: 'buy-it-now', type: 'integrates_with', year: 2000 },
        { target: 'classified-ads', type: 'integrates_with', year: 2005 },
        { target: 'best-offer', type: 'integrates_with', year: 2005 },
        { target: 'listing', type: 'depends_on' },
        { target: 'seller-tools-hub', type: 'depends_on' },
      ];
      break;

    case 'listing-policies':
      newRels = [
        { target: 'trust-safety', type: 'depends_on' },
        { target: 'active-content-policy', type: 'integrates_with', year: 2017 },
        { target: 'prohibited-items-list', type: 'integrates_with', year: 2000 },
        { target: 'vero-program', type: 'integrates_with', year: 1998 },
        { target: 'image-requirements', type: 'integrates_with', year: 2005 },
        { target: 'bid-shielding-policy', type: 'integrates_with', year: 2000 },
        { target: 'shill-bidding-policy', type: 'integrates_with', year: 2000 },
        { target: 'feedback-extortion-policy', type: 'integrates_with', year: 2010 },
      ];
      break;

    case 'listing-tools':
      newRels = [
        { target: 'seller-tools-hub', type: 'depends_on' },
        { target: 'advanced-listing-tool', type: 'integrates_with', year: 2008 },
        { target: 'advanced-listing-tool-multi-market', type: 'integrates_with', year: 2003 },
        { target: 'quick-listing-tool', type: 'integrates_with', year: 2015 },
        { target: 'bulk-listing-tool', type: 'integrates_with', year: 2010 },
        { target: 'magical-listing', type: 'integrates_with', year: 2022 },
        { target: 'turbo-lister', type: 'replaced_by', year: 2018 },
        { target: 'listing-designer', type: 'replaced_by', year: 2008 },
        { target: 'seller-hub', type: 'integrates_with', year: 2016, desc: 'Listing Tools umbrella lives within Seller Hub' },
        { target: 'barcode-scanner', type: 'integrates_with', year: 2015, desc: 'Barcode Scanner enables quick item identification for listings' },
        { target: 'ai-generated-backgrounds', type: 'integrates_with', year: 2024, desc: 'AI Generated Backgrounds enhances listing photos' },
        { target: 'ai-description-generator', type: 'integrates_with', year: 2024, desc: 'AI Description Generator automates listing copy' },
      ];
      break;

    case 'live':
      newRels = [
        { target: 'live-commerce', type: 'depends_on' },
        { target: 'ebay-live', type: 'integrates_with', year: 2022 },
        { target: 'seller-hub', type: 'integrates_with', year: 2022 },
        { target: 'live-commerce', type: 'integrates_with', year: 2020, desc: 'Live umbrella integrates with the live-commerce category platform' },
        { target: 'discovery', type: 'integrates_with', year: 2020, desc: 'Live commerce drives real-time discovery experiences' },
        { target: 'payments', type: 'depends_on', year: 2020, desc: 'Live shopping transactions route through payments infrastructure' },
      ];
      break;

    case 'marketing':
      newRels = [
        { target: 'events-campaigns', type: 'depends_on' },
        { target: 'promotions-manager', type: 'integrates_with', year: 2018 },
        { target: 'discounts-manager', type: 'integrates_with', year: 2022 },
        { target: 'coded-coupons', type: 'integrates_with', year: 2018 },
        { target: 'sale-events', type: 'integrates_with', year: 2018 },
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
        { target: 'promoted-listings', type: 'integrates_with', year: 2015 },
      ];
      break;

    case 'notifications':
      newRels = [
        { target: 'discovery-buyer-experience', type: 'depends_on' },
        { target: 'email-notifications', type: 'integrates_with', year: 2000 },
        { target: 'push-notifications', type: 'integrates_with', year: 2014 },
        { target: 'sms-notifications', type: 'integrates_with', year: 2010 },
        { target: 'price-drop-notifications', type: 'integrates_with', year: 2019 },
        { target: 'outbid-notification', type: 'integrates_with', year: 1995 },
        { target: 'notification-api', type: 'integrates_with', year: 2015 },
        { target: 'back-in-stock', type: 'integrates_with', year: 2018 },
      ];
      break;

    case 'order-management':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2016 },
        { target: 'managed-returns', type: 'integrates_with', year: 2019 },
        { target: 'awaiting-shipment', type: 'integrates_with', year: 2016 },
        { target: 'shipping-labels', type: 'integrates_with', year: 2012 },
        { target: 'cancel-order', type: 'integrates_with', year: 2005 },
        { target: 'send-invoice', type: 'integrates_with', year: 2005 },
        { target: 'order-report', type: 'integrates_with', year: 2010 },
        { target: 'seller-tools-hub', type: 'depends_on' },
      ];
      break;

    case 'payment':
      newRels = [
        { target: 'payments-checkout', type: 'depends_on' },
        { target: 'managed-payments', type: 'integrates_with', year: 2018 },
        { target: 'paypal', type: 'replaced_by', year: 2021 },
        { target: 'checkout', type: 'integrates_with', year: 2002 },
        { target: 'payments', type: 'related_to' },
      ];
      break;

    case 'payments':
      newRels = [
        { target: 'payments-checkout', type: 'depends_on' },
        { target: 'managed-payments', type: 'integrates_with', year: 2018 },
        { target: 'paypal', type: 'replaced_by', year: 2021 },
        { target: 'apple-pay', type: 'integrates_with', year: 2020 },
        { target: 'google-pay', type: 'integrates_with', year: 2020 },
        { target: 'venmo', type: 'integrates_with', year: 2020 },
        { target: 'klarna', type: 'integrates_with', year: 2021 },
        { target: 'afterpay', type: 'integrates_with', year: 2021 },
        { target: 'credit-card', type: 'integrates_with', year: 2000 },
        { target: 'payment', type: 'related_to' },
        { target: 'payments-checkout', type: 'integrates_with', year: 2002, desc: 'Payments umbrella integrates with the payments-checkout platform' },
        { target: 'ebay-money-back-guarantee', type: 'integrates_with', year: 2010, desc: 'Money Back Guarantee depends on payments for refunds' },
      ];
      break;

    case 'pricing-tools':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2016 },
        { target: 'auto-pricing', type: 'integrates_with', year: 2021 },
        { target: 'price-suggestions', type: 'integrates_with', year: 2018 },
        { target: 'competitive-pricing', type: 'integrates_with', year: 2019 },
        { target: 'terapeak', type: 'integrates_with', year: 2017, desc: 'Terapeak pricing data informs price recommendations' },
        { target: 'product-research', type: 'integrates_with', year: 2024 },
        { target: 'volume-pricing', type: 'integrates_with', year: 2016 },
        { target: 'seller-tools-hub', type: 'depends_on' },
      ];
      break;

    case 'refurbished':
      newRels = [
        { target: 'refurbished-open-box', type: 'depends_on' },
        { target: 'ebay-refurbished', type: 'integrates_with', year: 2019 },
        { target: 'certified-refurbished', type: 'integrates_with', year: 2020 },
        { target: 'excellent-refurbished', type: 'integrates_with', year: 2020 },
        { target: 'very-good-refurbished', type: 'integrates_with', year: 2020 },
        { target: 'good-refurbished', type: 'integrates_with', year: 2020 },
        { target: 'ebay-refurbished-warranty', type: 'integrates_with', year: 2021 },
        { target: 'certified-open-box', type: 'integrates_with', year: 2021 },
        { target: 'certified-by-brand', type: 'integrates_with', year: 2022 },
        { target: 'refurbished-open-box', type: 'integrates_with', year: 2016, desc: 'Refurbished umbrella integrates with refurbished-open-box category' },
        { target: 'electronics-technology', type: 'integrates_with', year: 2016, desc: 'Refurbished programs are most prominent in electronics category' },
        { target: 'trust', type: 'depends_on', year: 2016, desc: 'Refurbished products require trust signals and certifications' },
      ];
      break;

    case 'regional':
      newRels = [
        { target: 'everything-else', type: 'depends_on' },
        { target: 'ebay-uk', type: 'integrates_with' },
        { target: 'ebay-germany', type: 'integrates_with' },
        { target: 'ebay-australia', type: 'integrates_with' },
        { target: 'ebay-france', type: 'integrates_with' },
        { target: 'ebay-italy', type: 'integrates_with' },
        { target: 'ebay-canada', type: 'integrates_with' },
        { target: 'ebay-spain', type: 'integrates_with' },
      ];
      break;

    case 'returns':
      newRels = [
        { target: 'trust-safety', type: 'depends_on' },
        { target: 'managed-returns', type: 'integrates_with', year: 2019 },
        { target: '30-day-returns', type: 'integrates_with', year: 2014 },
        { target: '60-day-returns', type: 'integrates_with', year: 2018 },
        { target: 'free-returns', type: 'integrates_with', year: 2016 },
        { target: 'automated-return-labels', type: 'integrates_with', year: 2019 },
        { target: 'ebay-money-back-guarantee', type: 'integrates_with', year: 2011 },
        { target: 'top-rated-plus', type: 'related_to', year: 2010, desc: 'Top Rated Plus requires free returns policy' },
        { target: 'trust', type: 'integrates_with', year: 2011, desc: 'Returns programs are a pillar of buyer trust' },
        { target: 'buyer', type: 'integrates_with', year: 2011, desc: 'Returns is a core buyer protection program' },
        { target: 'seller-protections', type: 'integrates_with', year: 2015, desc: 'Returns umbrella includes seller protections against fraudulent returns' },
      ];
      break;

    case 'search':
      newRels = [
        { target: 'cassini', type: 'depends_on', year: 2013 },
        { target: 'best-match', type: 'integrates_with', year: 2008 },
        { target: 'advanced-search', type: 'integrates_with', year: 2003 },
        { target: 'image-search', type: 'integrates_with', year: 2017 },
        { target: 'search-filters', type: 'integrates_with', year: 2005 },
        { target: 'saved-searches', type: 'integrates_with', year: 2003 },
        { target: 'best-match-multi-market', type: 'integrates_with', year: 2008 },
        { target: 'promoted-listings', type: 'integrates_with', year: 2015, desc: 'Promoted Listings boosts visibility in search results' },
        { target: 'discovery-buyer-experience', type: 'depends_on' },
      ];
      break;

    case 'seller-programs':
      newRels = [
        { target: 'top-rated-seller', type: 'integrates_with', year: 2010 },
        { target: 'top-rated-plus', type: 'integrates_with', year: 2010 },
        { target: 'powerseller', type: 'renamed_to', year: 2010, desc: 'PowerSeller program was replaced by Top Rated Seller' },
        { target: 'seller-performance-standards', type: 'depends_on', year: 2008 },
        { target: 'pro-seller-program', type: 'integrates_with', year: 2018 },
        { target: 'proseller-growth-program', type: 'integrates_with', year: 2020 },
        { target: 'pro-trader-program', type: 'integrates_with', year: 2019 },
        { target: 'seller-tools-hub', type: 'depends_on' },
        { target: 'new-seller-journey', type: 'integrates_with', year: 2020 },
      ];
      break;

    case 'seller-tools':
      newRels = [
        { target: 'seller-tools-hub', type: 'depends_on' },
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
        { target: 'selling-manager', type: 'replaced_by', year: 2016 },
        { target: 'selling-manager-pro', type: 'replaced_by', year: 2016 },
        { target: 'business-policies', type: 'integrates_with', year: 2013 },
        { target: 'time-away', type: 'integrates_with', year: 2015 },
        { target: 'seller-help', type: 'integrates_with', year: 2018 },
        { target: 'sellertools', type: 'related_to' },
      ];
      break;

    case 'sellertools':
      newRels = [
        { target: 'seller-tools', type: 'related_to' },
        { target: 'seller-tools-hub', type: 'depends_on' },
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
      ];
      break;

    case 'services':
      newRels = [
        { target: 'everything-else', type: 'depends_on' },
        { target: 'ebay-concierge', type: 'integrates_with', year: 2014 },
        { target: 'account-management-plus', type: 'integrates_with', year: 2018 },
        { target: 'account-management-premium', type: 'integrates_with', year: 2018 },
        { target: 'ebay-fulfilment', type: 'integrates_with', year: 2019 },
      ];
      break;

    case 'shipping':
      newRels = [
        { target: 'shipping-logistics', type: 'depends_on' },
        { target: 'ebay-international-shipping', type: 'integrates_with', year: 2021 },
        { target: 'shipping-labels', type: 'integrates_with', year: 2012 },
        { target: 'calculated-shipping', type: 'integrates_with', year: 2005 },
        { target: 'flat-rate-shipping', type: 'integrates_with', year: 2005 },
        { target: 'free-shipping', type: 'integrates_with', year: 2008 },
        { target: 'fast-n-free', type: 'related_to', year: 2010, desc: 'Fast N Free is the legacy free/fast shipping badge' },
        { target: 'free-2-day-shipping', type: 'integrates_with', year: 2018 },
        { target: 'guaranteed-delivery', type: 'integrates_with', year: 2017 },
        { target: 'ebay-standard-envelope', type: 'integrates_with', year: 2020 },
        { target: 'simple-delivery', type: 'integrates_with', year: 2023 },
        { target: 'combined-shipping', type: 'integrates_with', year: 2005 },
        { target: 'shipcover-insurance', type: 'integrates_with', year: 2014 },
        { target: 'shipping-logistics', type: 'integrates_with', year: 2005, desc: 'Shipping umbrella integrates with the shipping-logistics platform' },
        { target: 'free-4-day-shipping-badge', type: 'integrates_with', year: 2024, desc: 'Free 4-Day Shipping Badge is a shipping trust signal' },
        { target: 'managed-delivery', type: 'integrates_with', year: 2020, desc: 'Managed Delivery is part of the shipping umbrella' },
        { target: 'trust', type: 'integrates_with', year: 2005, desc: 'Reliable shipping is a key buyer trust driver' },
      ];
      break;

    case 'stores':
      newRels = [
        { target: 'ebay-stores', type: 'depends_on' },
        { target: 'store-tier-starter', type: 'integrates_with' },
        { target: 'store-tier-basic', type: 'integrates_with' },
        { target: 'store-tier-premium', type: 'integrates_with' },
        { target: 'store-tier-anchor', type: 'integrates_with' },
        { target: 'store-tier-enterprise', type: 'integrates_with' },
        { target: 'store-email-campaigns', type: 'integrates_with' },
        { target: 'store-newsletters', type: 'integrates_with' },
        { target: 'promoted-stores', type: 'integrates_with', year: 2019 },
        { target: 'ebay-stores', type: 'integrates_with', year: 2001, desc: 'Stores umbrella governs the eBay Stores subscription program' },
        { target: 'discounts-manager', type: 'integrates_with', year: 2015, desc: 'Discounts Manager is available to eBay Store subscribers' },
        { target: 'store-traffic-report', type: 'integrates_with', year: 2023, desc: 'Store Traffic Report is a stores-specific analytics tool' },
        { target: 'seller-hub', type: 'integrates_with', year: 2016, desc: 'Stores management is integrated into Seller Hub' },
      ];
      break;

    case 'support':
      newRels = [
        { target: 'community-education', type: 'depends_on' },
        { target: 'help-center', type: 'integrates_with' },
        { target: 'seller-help', type: 'integrates_with', year: 2018 },
        { target: 'live-chat-support', type: 'integrates_with' },
        { target: 'phone-support', type: 'integrates_with' },
        { target: 'virtual-assistant', type: 'integrates_with', year: 2020 },
        { target: 'account-management-plus', type: 'integrates_with', year: 2018 },
        { target: 'account-management-premium', type: 'integrates_with', year: 2018 },
        { target: 'ebay-concierge', type: 'integrates_with', year: 2014 },
      ];
      break;

    case 'sustainability':
      newRels = [
        { target: 'trust-safety', type: 'depends_on' },
        { target: 'circular-fashion-fund', type: 'integrates_with', year: 2022 },
        { target: 'certified-recycled-program', type: 'integrates_with', year: 2021 },
        { target: 'certified-recycler-program', type: 'integrates_with', year: 2021 },
        { target: 'pre-loved-partner-program', type: 'integrates_with', year: 2022 },
        { target: 'preloved-partner-program', type: 'integrates_with', year: 2022 },
        { target: 'consommation-raisonnee', type: 'integrates_with', year: 2021 },
        { target: 'ebay-rachat', type: 'integrates_with', year: 2021 },
        { target: 'trade-in-uk', type: 'integrates_with', year: 2022 },
        { target: 'impact', type: 'related_to' },
        { target: 'ebay-impact-report', type: 'related_to' },
        { target: 'recommerce-report', type: 'related_to' },
      ];
      break;

    case 'tax':
      newRels = [
        { target: 'payments-checkout', type: 'depends_on' },
        { target: 'sales-tax-collection', type: 'integrates_with', year: 2019 },
        { target: 'vat-collection', type: 'integrates_with', year: 2021 },
        { target: '1099-k-tax-form', type: 'integrates_with', year: 2011 },
        { target: 'automatic-tax-calculation', type: 'integrates_with', year: 2019 },
        { target: 'vat-invoice-automation', type: 'integrates_with', year: 2021 },
        { target: 'vat-services-uk-eu', type: 'integrates_with', year: 2021 },
        { target: 'gst-collection-australia', type: 'integrates_with', year: 2018 },
        { target: 'tax-documents', type: 'integrates_with', year: 2019 },
      ];
      break;

    case 'trust':
      newRels = [
        { target: 'trust-safety', type: 'depends_on' },
        { target: 'authenticity-guarantee', type: 'integrates_with', year: 2020 },
        { target: 'ebay-money-back-guarantee', type: 'integrates_with', year: 2011 },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2008 },
        { target: 'top-rated-seller', type: 'integrates_with', year: 2010 },
        { target: 'account-security', type: 'integrates_with', year: 2004 },
        { target: 'vero-program', type: 'integrates_with', year: 1998 },
        { target: 'purchase-protection', type: 'integrates_with', year: 2010 },
        { target: 'buyer-protection', type: 'integrates_with', year: 2008 },
        { target: 'trust-safety', type: 'integrates_with', year: 1996, desc: 'Trust umbrella integrates with the trust-safety platform' },
      ];
      break;

    case 'verticals':
      newRels = [
        { target: 'everything-else', type: 'depends_on' },
        { target: 'ebay-motors', type: 'integrates_with' },
        { target: 'fashion-luxury', type: 'integrates_with' },
        { target: 'collectibles-trading', type: 'integrates_with' },
        { target: 'electronics-technology', type: 'integrates_with' },
        { target: 'business-industrial', type: 'integrates_with' },
        { target: 'home-garden', type: 'integrates_with' },
      ];
      break;

    case '1-day-handling':
      newRels = [
        { target: 'seller-performance-standards', type: 'depends_on', year: 2010, desc: '1-day handling is part of seller performance metrics' },
        { target: 'top-rated-plus', type: 'related_to', year: 2010, desc: 'Top Rated Plus requires 1 or 1-day handling time' },
        { target: 'guaranteed-delivery', type: 'integrates_with', year: 2017, desc: 'Guaranteed Delivery requires fast handling times' },
        { target: 'fast-n-free', type: 'related_to', year: 2010, desc: 'Fast N Free badge relies on short handling + free shipping' },
        { target: 'shipping', type: 'related_to' },
        { target: 'same-day-handling', type: 'related_to', year: 2015 },
      ];
      break;

    case '1099-k-tax-form':
      newRels = [
        { target: 'managed-payments', type: 'depends_on', year: 2018, desc: 'Managed Payments generates 1099-K for qualifying US sellers' },
        { target: 'tax', type: 'related_to' },
        { target: 'form-1099-k', type: 'related_to', year: 2011 },
        { target: 'form-1099-k-us', type: 'related_to', year: 2011 },
        { target: 'sales-tax-collection', type: 'related_to', year: 2019 },
        { target: 'tax-documents', type: 'related_to' },
      ];
      break;

    case '2-step-verification':
      newRels = [
        { target: 'two-factor-authentication', type: 'related_to', year: 2016, desc: '2-Step Verification is an alternate name for 2FA' },
        { target: 'account-security', type: 'depends_on', year: 2016 },
        { target: 'authenticator-app', type: 'integrates_with', year: 2018 },
        { target: 'two-step-verification', type: 'related_to', year: 2016 },
        { target: 'passkeys', type: 'related_to', year: 2023, desc: 'Passkeys are the next-gen authentication replacing 2FA' },
        { target: 'trust', type: 'related_to' },
      ];
      break;

    case '30-day-returns':
      newRels = [
        { target: 'returns', type: 'depends_on' },
        { target: 'no-returns-accepted', type: 'renamed_from', year: 2014, desc: '30-day returns became minimum standard replacing no-returns' },
        { target: 'top-rated-plus', type: 'related_to', year: 2014, desc: 'Top Rated Plus requires 30-day free returns' },
        { target: 'free-returns', type: 'related_to', year: 2016 },
        { target: '60-day-returns', type: 'related_to', year: 2018 },
        { target: 'ebay-money-back-guarantee', type: 'related_to', year: 2014 },
        { target: 'managed-returns', type: 'integrates_with', year: 2019 },
      ];
      break;

    case '360-spin':
      newRels = [
        { target: 'listing-features', type: 'depends_on', year: 2018 },
        { target: 'advanced-listing-tool', type: 'depends_on', year: 2018 },
        { target: 'ebay-mobile-app', type: 'integrates_with', year: 2018, desc: '360 Spin photo capture is available via the eBay mobile app' },
        { target: 'product-video', type: 'related_to', year: 2021, desc: 'Both are rich media listing enhancement features' },
        { target: 'photo-uploader', type: 'related_to', year: 2018 },
      ];
      break;

    case '60-day-returns':
      newRels = [
        { target: 'returns', type: 'depends_on' },
        { target: '30-day-returns', type: 'related_to' },
        { target: 'top-rated-plus', type: 'related_to', year: 2018, desc: '60-day returns provides search ranking boost similar to Top Rated Plus' },
        { target: 'free-returns', type: 'related_to' },
        { target: 'ebay-money-back-guarantee', type: 'related_to' },
        { target: 'managed-returns', type: 'integrates_with', year: 2019 },
      ];
      break;

    case 'above-standard':
      newRels = [
        { target: 'seller-performance-standards', type: 'depends_on', year: 2008 },
        { target: 'top-rated-seller', type: 'related_to', year: 2010, desc: 'Above Standard is the tier below Top Rated Seller' },
        { target: 'below-standard', type: 'related_to', year: 2008, desc: 'Below Standard is the tier below Above Standard' },
        { target: 'transaction-defect-rate', type: 'depends_on', year: 2014 },
        { target: 'late-shipment-rate', type: 'depends_on', year: 2014 },
        { target: 'cases-closed-without-seller-resolution', type: 'depends_on', year: 2014 },
      ];
      break;

    case 'above-standard-status':
      newRels = [
        { target: 'seller-performance-standards', type: 'depends_on', year: 2010 },
        { target: 'above-standard', type: 'related_to' },
        { target: 'top-rated-seller', type: 'related_to' },
        { target: 'below-standard-status', type: 'related_to' },
        { target: 'transaction-defect-rate', type: 'depends_on' },
        { target: 'late-shipment-rate', type: 'depends_on' },
      ];
      break;

    case 'accept-offer':
      newRels = [
        { target: 'best-offer', type: 'depends_on', year: 2005 },
        { target: 'counter-offer', type: 'related_to', year: 2005 },
        { target: 'decline-offer', type: 'related_to', year: 2005 },
        { target: 'offers-received', type: 'integrates_with', year: 2005 },
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
        { target: 'managed-payments', type: 'depends_on', year: 2018, desc: 'Accepted offers route through Managed Payments checkout' },
      ];
      break;

    case 'accept-return':
      newRels = [
        { target: 'returns', type: 'depends_on' },
        { target: 'managed-returns', type: 'integrates_with', year: 2019 },
        { target: 'request-return', type: 'related_to', year: 2013 },
        { target: 'automated-return-labels', type: 'integrates_with', year: 2019, desc: 'Accepting return triggers automated prepaid return label' },
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
        { target: 'ebay-money-back-guarantee', type: 'related_to' },
      ];
      break;

    case 'account-management-plus':
      newRels = [
        { target: 'support', type: 'depends_on' },
        { target: 'account-management-premium', type: 'related_to', year: 2018, desc: 'Premium tier above Plus' },
        { target: 'seller-hub', type: 'integrates_with', year: 2018 },
        { target: 'ebay-concierge', type: 'related_to', year: 2018 },
        { target: 'top-rated-seller', type: 'related_to', year: 2018, desc: 'Account management typically targets high-volume sellers' },
      ];
      break;

    case 'account-management-premium':
      newRels = [
        { target: 'support', type: 'depends_on' },
        { target: 'account-management-plus', type: 'related_to', year: 2018, desc: 'Plus is the lower tier below Premium' },
        { target: 'ebay-concierge', type: 'related_to', year: 2018 },
        { target: 'seller-hub', type: 'integrates_with', year: 2018 },
        { target: 'top-rated-seller', type: 'related_to', year: 2018 },
      ];
      break;

    case 'account-security':
      newRels = [
        { target: 'trust', type: 'depends_on' },
        { target: 'two-factor-authentication', type: 'integrates_with', year: 2016 },
        { target: '2-step-verification', type: 'integrates_with', year: 2016 },
        { target: 'authenticator-app', type: 'integrates_with', year: 2018 },
        { target: 'passkeys', type: 'integrates_with', year: 2023 },
        { target: 'login-alerts', type: 'integrates_with', year: 2015 },
        { target: 'password-reset', type: 'integrates_with', year: 2004 },
        { target: 'biometric-verification', type: 'integrates_with', year: 2020 },
        { target: 'account-suspension', type: 'related_to', year: 2004 },
        { target: 'security-center', type: 'integrates_with', year: 2010 },
      ];
      break;

    case 'account-settings':
      newRels = [
        { target: 'my-ebay', type: 'depends_on', year: 2000 },
        { target: 'notification-preferences', type: 'integrates_with', year: 2005 },
        { target: 'selling-preferences', type: 'integrates_with', year: 2005 },
        { target: 'business-policies', type: 'integrates_with', year: 2013 },
        { target: 'return-preferences', type: 'integrates_with', year: 2013 },
        { target: 'add-payment-method', type: 'integrates_with', year: 2013 },
        { target: 'account-security', type: 'integrates_with', year: 2004 },
        { target: 'communication-preferences', type: 'integrates_with', year: 2005 },
      ];
      break;

    case 'account-suspended':
      newRels = [
        { target: 'trust', type: 'related_to' },
        { target: 'account-suspension', type: 'related_to', year: 2001 },
        { target: 'seller-performance-standards', type: 'related_to', year: 2008 },
        { target: 'below-standard', type: 'related_to' },
        { target: 'indefinite-suspension', type: 'related_to' },
        { target: 'buying-restrictions', type: 'related_to' },
      ];
      break;

    case 'account-suspension':
      newRels = [
        { target: 'trust', type: 'depends_on' },
        { target: 'account-suspended', type: 'related_to' },
        { target: 'seller-performance-standards', type: 'related_to' },
        { target: 'below-standard', type: 'related_to' },
        { target: 'indefinite-suspension', type: 'related_to' },
        { target: 'vero-program', type: 'related_to', year: 1998, desc: 'VeRO violations can result in account suspension' },
        { target: 'case-appeals', type: 'integrates_with', year: 2015 },
        { target: 'buying-restrictions', type: 'related_to' },
        { target: 'security-center', type: 'integrates_with' },
      ];
      break;

    case 'active-content-policy':
      newRels = [
        { target: 'listing-policies', type: 'depends_on', year: 2017 },
        { target: 'trust-safety', type: 'related_to', year: 2017 },
        { target: 'listing', type: 'related_to', year: 2017 },
        { target: 'html-editor', type: 'related_to', year: 2017, desc: 'Active Content Policy limited HTML editor capabilities' },
        { target: 'item-description-editor', type: 'related_to', year: 2017 },
      ];
      break;

    case 'active-listings':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2016 },
        { target: 'inventory', type: 'related_to' },
        { target: 'ended-listings', type: 'related_to' },
        { target: 'unsold-listings', type: 'related_to' },
        { target: 'sold-listings', type: 'related_to' },
        { target: 'relist', type: 'integrates_with' },
        { target: 'bulk-edit', type: 'integrates_with' },
      ];
      break;

    case 'ad-attribution':
      newRels = [
        { target: 'promoted-listings', type: 'depends_on', year: 2019 },
        { target: 'promoted-listings-standard', type: 'integrates_with', year: 2019 },
        { target: 'promoted-listings-advanced', type: 'integrates_with', year: 2021 },
        { target: 'advertising-dashboard', type: 'integrates_with', year: 2019 },
        { target: 'seller-hub', type: 'integrates_with', year: 2019 },
        { target: 'cost-per-click', type: 'related_to' },
        { target: 'cost-per-sale', type: 'related_to' },
      ];
      break;

    case 'ad-fee':
      newRels = [
        { target: 'promoted-listings', type: 'depends_on', year: 2015 },
        { target: 'promoted-listings-standard', type: 'integrates_with', year: 2015, desc: 'Standard uses cost-per-sale ad fee model' },
        { target: 'cost-per-sale', type: 'related_to' },
        { target: 'cost-per-click', type: 'related_to', year: 2018, desc: 'Advanced uses CPC while Standard uses ad rate/fee model' },
        { target: 'ad-rate-recommendation', type: 'integrates_with', year: 2019 },
        { target: 'seller-hub', type: 'integrates_with' },
      ];
      break;

    case 'ad-rate-recommendation':
      newRels = [
        { target: 'promoted-listings', type: 'depends_on', year: 2019 },
        { target: 'promoted-listings-standard', type: 'integrates_with', year: 2019 },
        { target: 'ad-fee', type: 'integrates_with' },
        { target: 'seller-hub', type: 'integrates_with' },
        { target: 'advertising-dashboard', type: 'integrates_with' },
        { target: 'terapeak', type: 'related_to', year: 2019, desc: 'Market data informs optimal ad rate recommendations' },
        { target: 'product-research', type: 'related_to', year: 2024 },
      ];
      break;

    case 'add-payment-method':
      newRels = [
        { target: 'payments', type: 'depends_on' },
        { target: 'managed-payments', type: 'depends_on', year: 2018 },
        { target: 'checkout', type: 'integrates_with' },
        { target: 'account-settings', type: 'integrates_with' },
        { target: 'apple-pay', type: 'related_to' },
        { target: 'google-pay', type: 'related_to' },
        { target: 'credit-card', type: 'related_to' },
        { target: 'debit-card', type: 'related_to' },
      ];
      break;

    case 'add-to-cart':
      newRels = [
        { target: 'buyer', type: 'depends_on' },
        { target: 'shopping-cart', type: 'integrates_with', year: 2013 },
        { target: 'checkout', type: 'integrates_with' },
        { target: 'combined-checkout', type: 'integrates_with' },
        { target: 'cart-total', type: 'integrates_with' },
        { target: 'buy-it-now', type: 'related_to', year: 2013, desc: 'Add to Cart works with fixed-price BIN listings' },
        { target: 'managed-payments', type: 'depends_on', year: 2018 },
      ];
      break;

    case 'add-to-watch-list':
      newRels = [
        { target: 'watchlist', type: 'integrates_with', year: 2001 },
        { target: 'add-to-watchlist', type: 'related_to', year: 2002, desc: 'Variant naming for the same feature' },
        { target: 'watch-this-item', type: 'related_to' },
        { target: 'items-watched', type: 'integrates_with' },
        { target: 'price-drop-alert', type: 'integrates_with', year: 2010, desc: 'Watching an item enables price drop alerts' },
        { target: 'offers-to-watchers', type: 'integrates_with', year: 2017, desc: 'Sellers can send offers to watchers' },
        { target: 'ending-soon', type: 'integrates_with' },
        { target: 'buyer', type: 'depends_on' },
      ];
      break;

    case 'add-to-watchlist':
      newRels = [
        { target: 'watchlist', type: 'integrates_with', year: 2002 },
        { target: 'add-to-watch-list', type: 'related_to', year: 2001, desc: 'Variant naming for same feature' },
        { target: 'watch-this-item', type: 'related_to' },
        { target: 'price-drop-alert', type: 'integrates_with', year: 2010 },
        { target: 'offers-to-watchers', type: 'integrates_with', year: 2017 },
        { target: 'ending-soon', type: 'integrates_with' },
        { target: 'buyer', type: 'depends_on' },
      ];
      break;

    case 'advanced-listing-tool':
      newRels = [
        { target: 'listing', type: 'depends_on' },
        { target: 'listing-designer', type: 'renamed_from', year: 2008, desc: 'Listing Designer was renamed/evolved into Advanced Listing Tool' },
        { target: 'quick-listing-tool', type: 'related_to', year: 2015, desc: 'Quick Listing Tool is the simplified alternative' },
        { target: 'item-specifics', type: 'integrates_with' },
        { target: 'photo-uploader', type: 'integrates_with' },
        { target: '360-spin', type: 'integrates_with', year: 2018 },
        { target: 'product-video', type: 'integrates_with', year: 2021 },
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
        { target: 'schedule-listing', type: 'integrates_with' },
        { target: 'business-policies', type: 'integrates_with', year: 2013 },
      ];
      break;

    case 'advanced-listing-tool-multi-market':
      newRels = [
        { target: 'listing-tools', type: 'depends_on' },
        { target: 'advanced-listing-tool', type: 'related_to', year: 2003, desc: 'Multi-market variant with localized naming' },
        { target: 'seller-hub', type: 'integrates_with' },
        { target: 'item-specifics-multi-market', type: 'integrates_with' },
        { target: 'business-policies', type: 'integrates_with' },
      ];
      break;

    case 'advanced-search':
      newRels = [
        { target: 'search', type: 'depends_on' },
        { target: 'cassini', type: 'depends_on', year: 2013 },
        { target: 'search-filters', type: 'integrates_with' },
        { target: 'saved-searches', type: 'integrates_with' },
        { target: 'best-match', type: 'integrates_with' },
        { target: 'condition-filter', type: 'integrates_with' },
        { target: 'price-range-filter', type: 'integrates_with' },
        { target: 'location-filter', type: 'integrates_with' },
      ];
      break;

    case 'ai-banner':
      newRels = [
        { target: 'ebay-stores', type: 'depends_on', year: 2024 },
        { target: 'seller-hub', type: 'integrates_with', year: 2024 },
        { target: 'ai-generated-backgrounds', type: 'related_to', year: 2024 },
        { target: 'brand-identity', type: 'related_to' },
        { target: 'store-header', type: 'related_to', year: 2024 },
      ];
      break;

    case 'ai-snap':
      newRels = [
        { target: 'magical-listing', type: 'depends_on', year: 2021 },
        { target: 'ebay-mobile-app', type: 'depends_on', year: 2021 },
        { target: 'barcode-scanner', type: 'related_to', year: 2021, desc: 'Both are mobile camera-based listing tools' },
        { target: 'image-search', type: 'related_to', year: 2021 },
        { target: 'ai-description-generator', type: 'integrates_with', year: 2023, desc: 'AI Snap photo enables AI to generate descriptions' },
        { target: 'background-enhancement', type: 'integrates_with', year: 2024 },
        { target: 'catalog-api', type: 'depends_on', year: 2021, desc: 'Product catalog matching powers AI Snap recognition' },
      ];
      break;

    case 'anniversary-sale':
      newRels = [
        { target: 'events-campaigns', type: 'depends_on' },
        { target: 'ebay-deals', type: 'integrates_with' },
        { target: 'promotions-manager', type: 'integrates_with' },
        { target: 'marketing', type: 'related_to' },
        { target: 'black-friday-deals', type: 'related_to' },
        { target: 'collectibles-trading', type: 'related_to', year: 2005, desc: 'Collectibles and vintage featured prominently in anniversary sales' },
      ];
      break;

    case 'antiques':
      newRels = [
        { target: 'collectibles', type: 'depends_on' },
        { target: 'collectibles-trading', type: 'related_to' },
        { target: 'fine-art', type: 'related_to' },
        { target: 'authenticity-guarantee', type: 'related_to', year: 2020 },
        { target: 'certificate-of-authenticity', type: 'integrates_with' },
        { target: 'item-condition', type: 'integrates_with' },
      ];
      break;

    case 'app-store-promotion':
      newRels = [
        { target: 'marketing', type: 'depends_on' },
        { target: 'ebay-mobile-app', type: 'integrates_with', year: 2016 },
        { target: 'events-campaigns', type: 'related_to' },
        { target: 'ebay-deals', type: 'related_to' },
      ];
      break;

    case 'apple-pay':
      newRels = [
        { target: 'payments', type: 'depends_on' },
        { target: 'managed-payments', type: 'integrates_with', year: 2020 },
        { target: 'checkout', type: 'integrates_with' },
        { target: 'mobile-checkout', type: 'integrates_with', year: 2020 },
        { target: 'google-pay', type: 'competes_with', year: 2020, desc: 'Apple Pay and Google Pay are competing mobile wallet options' },
        { target: 'venmo', type: 'related_to' },
        { target: 'pay-in-4', type: 'related_to' },
      ];
      break;

    case 'ask-question':
      newRels = [
        { target: 'buyer', type: 'depends_on' },
        { target: 'ask-seller-question', type: 'related_to', year: 2013, desc: 'Variant of the same feature — public Q&A vs private message' },
        { target: 'message-center', type: 'integrates_with' },
        { target: 'communication', type: 'related_to' },
      ];
      break;

    case 'ask-seller-question':
      newRels = [
        { target: 'buyer', type: 'depends_on' },
        { target: 'ask-question', type: 'related_to' },
        { target: 'message-center', type: 'integrates_with' },
        { target: 'in-app-messaging', type: 'integrates_with' },
        { target: 'seller-responded', type: 'integrates_with' },
        { target: 'communication', type: 'related_to' },
      ];
      break;

    case 'assured-fit':
      newRels = [
        { target: 'ebay-motors', type: 'depends_on', year: 2021 },
        { target: 'guaranteed-fit', type: 'related_to', year: 2021, desc: 'Assured Fit is the UK equivalent of Guaranteed Fit (US)' },
        { target: 'fitment-compatibility', type: 'depends_on', year: 2021 },
        { target: 'trust', type: 'related_to' },
        { target: 'free-returns', type: 'integrates_with', year: 2021, desc: 'Assured Fit provides free returns for non-fitting parts' },
        { target: 'ebay-uk', type: 'related_to' },
      ];
      break;

    case 'aste-di-beneficenza':
      newRels = [
        { target: 'impact', type: 'depends_on' },
        { target: 'charity', type: 'related_to' },
        { target: 'ebay-for-charity', type: 'related_to', year: 2005, desc: 'Italian charity auction program distinct from global eBay for Charity' },
        { target: 'ebay-italy', type: 'depends_on' },
        { target: 'auction-format', type: 'integrates_with' },
      ];
      break;

    case 'auction-ended':
      newRels = [
        { target: 'auction', type: 'depends_on' },
        { target: 'auction-format', type: 'related_to' },
        { target: 'winning-bid', type: 'integrates_with' },
        { target: 'winning-notice', type: 'integrates_with' },
        { target: 'outbid-notice', type: 'related_to' },
        { target: 'second-chance-offer', type: 'integrates_with', year: 2002, desc: 'Sellers can send Second Chance Offer after auction ends' },
      ];
      break;

    case 'auction-format':
      newRels = [
        { target: 'auction', type: 'depends_on' },
        { target: 'buy-it-now-in-auctions', type: 'integrates_with' },
        { target: 'reserve-price', type: 'integrates_with' },
        { target: 'automatic-bidding', type: 'integrates_with' },
        { target: 'proxy-bidding', type: 'integrates_with' },
        { target: 'bid-increment', type: 'integrates_with' },
        { target: 'fixed-price-format', type: 'competes_with', year: 2000, desc: 'Fixed Price became dominant format vs traditional auction' },
        { target: 'listing-formats', type: 'related_to' },
      ];
      break;

    case 'auction-style-listings':
      newRels = [
        { target: 'listing', type: 'depends_on' },
        { target: 'auction-format', type: 'related_to' },
        { target: 'automatic-bidding', type: 'integrates_with' },
        { target: 'reserve-price', type: 'integrates_with' },
        { target: 'listing-formats', type: 'related_to' },
        { target: 'buy-it-now-in-auctions', type: 'integrates_with' },
      ];
      break;

    case 'auction-style-listings-multi-market':
      newRels = [
        { target: 'listing-formats', type: 'depends_on' },
        { target: 'auction-style-listings', type: 'related_to', desc: 'Multi-market naming variant' },
        { target: 'automatic-bidding', type: 'integrates_with' },
        { target: 'reserve-price-multi-market', type: 'integrates_with' },
        { target: 'best-match-multi-market', type: 'integrates_with' },
      ];
      break;

    case 'audience-targeting':
      newRels = [
        { target: 'promoted-listings', type: 'depends_on', year: 2021 },
        { target: 'promoted-listings-advanced', type: 'depends_on', year: 2021, desc: 'Audience Targeting is an Advanced feature using first-party data' },
        { target: 'promoted-listings-standard', type: 'competes_with', year: 2021, desc: 'Standard uses listing-level targeting vs audience-level' },
        { target: 'keyword-targeting', type: 'related_to', year: 2021 },
        { target: 'advertising-dashboard', type: 'integrates_with' },
        { target: 'seller-hub', type: 'integrates_with' },
      ];
      break;

    case 'augmented-reality-preview':
      newRels = [
        { target: 'buyer', type: 'depends_on', year: 2021 },
        { target: 'ebay-mobile-app', type: 'depends_on', year: 2021, desc: 'AR Preview requires iOS mobile app via ARKit' },
        { target: 'home-garden', type: 'related_to', year: 2021, desc: 'AR Preview launched for Home & Garden furniture/decor' },
        { target: 'photo-enhancement', type: 'related_to' },
        { target: '360-spin', type: 'related_to', year: 2021, desc: 'Both are immersive listing visualization features' },
        { target: 'item-comparison', type: 'related_to' },
      ];
      break;

    case 'australia-post-express':
      newRels = [
        { target: 'shipping', type: 'depends_on' },
        { target: 'ebay-australia', type: 'depends_on' },
        { target: 'shipping-labels', type: 'integrates_with' },
        { target: 'calculated-shipping', type: 'integrates_with' },
        { target: 'guaranteed-delivery', type: 'related_to' },
        { target: 'shipping-partner-platform', type: 'integrates_with' },
      ];
      break;

    case 'authenticator-app':
      newRels = [
        { target: 'two-factor-authentication', type: 'depends_on', year: 2018 },
        { target: 'account-security', type: 'integrates_with' },
        { target: '2-step-verification', type: 'integrates_with' },
        { target: 'passkeys', type: 'related_to', year: 2023, desc: 'Passkeys are the modern successor to authenticator apps' },
        { target: 'biometric-verification', type: 'related_to' },
      ];
      break;

    case 'authenticity-guarantee':
      newRels = [
        { target: 'trust', type: 'depends_on' },
        { target: 'ebay-authenticate', type: 'renamed_from', year: 2020, desc: 'eBay Authenticate rebranded to Authenticity Guarantee' },
        { target: 'authenticity-guarantee-sneakers', type: 'integrates_with', year: 2020 },
        { target: 'authenticity-guarantee-handbags', type: 'integrates_with', year: 2021 },
        { target: 'authenticity-guarantee-watches', type: 'integrates_with', year: 2020 },
        { target: 'authenticity-guarantee-jewelry', type: 'integrates_with', year: 2022 },
        { target: 'authenticity-guarantee-trading-cards', type: 'integrates_with', year: 2021 },
        { target: 'authenticity-guarantee-streetwear', type: 'integrates_with', year: 2022 },
        { target: 'authenticity-guarantee-multi-market', type: 'related_to' },
        { target: 'authenticity-guarantee-filter', type: 'integrates_with' },
        { target: 'ebay-vault', type: 'integrates_with', year: 2022, desc: 'Items authenticated via AG can be stored in The Vault' },
        { target: 'fashion-luxury', type: 'related_to' },
        { target: 'collectibles-trading', type: 'related_to' },
        { target: 'certificate-of-authenticity', type: 'integrates_with' },
        { target: 'sneaker-authentication', type: 'integrates_with' },
        { target: 'handbag-authentication', type: 'integrates_with' },
        { target: 'watch-authentication', type: 'integrates_with' },
        { target: 'jewelry-authentication', type: 'integrates_with' },
        { target: 'trading-card-authentication', type: 'integrates_with' },
        { target: 'psa-grading-integration', type: 'integrates_with', year: 2021 },
      ];
      break;

    case 'authenticity-guarantee-filter':
      newRels = [
        { target: 'authenticity-guarantee', type: 'depends_on' },
        { target: 'search', type: 'integrates_with' },
        { target: 'search-filters', type: 'integrates_with' },
        { target: 'fashion-luxury', type: 'related_to' },
        { target: 'collectibles-trading', type: 'related_to' },
      ];
      break;

    case 'authenticity-guarantee-handbags':
      newRels = [
        { target: 'authenticity-guarantee', type: 'depends_on', year: 2021 },
        { target: 'fashion-luxury', type: 'related_to' },
        { target: 'handbag-authentication', type: 'integrates_with' },
        { target: 'ebay-vault', type: 'integrates_with', year: 2022 },
        { target: 'authenticity-guarantee-watches', type: 'related_to' },
        { target: 'authenticity-guarantee-jewelry', type: 'related_to' },
        { target: 'ebay-authenticate-handbags', type: 'related_to' },
      ];
      break;

    case 'authenticity-guarantee-jewelry':
      newRels = [
        { target: 'authenticity-guarantee', type: 'depends_on', year: 2022 },
        { target: 'fashion-luxury', type: 'related_to' },
        { target: 'jewelry-authentication', type: 'integrates_with' },
        { target: 'authenticity-guarantee-watches', type: 'related_to' },
        { target: 'authenticity-guarantee-handbags', type: 'related_to' },
        { target: 'certificate-of-authenticity', type: 'integrates_with' },
      ];
      break;

    case 'authenticity-guarantee-multi-market':
      newRels = [
        { target: 'authentication', type: 'depends_on' },
        { target: 'authenticity-guarantee', type: 'related_to', desc: 'Multi-market variant of same program' },
        { target: 'authenticity-guarantee-sneakers', type: 'integrates_with' },
        { target: 'authenticity-guarantee-handbags', type: 'integrates_with' },
        { target: 'authenticity-guarantee-watches', type: 'integrates_with' },
        { target: 'ebay-uk', type: 'related_to' },
        { target: 'ebay-germany', type: 'related_to' },
        { target: 'ebay-australia', type: 'related_to' },
      ];
      break;

    case 'authenticity-guarantee-sneakers':
      newRels = [
        { target: 'authenticity-guarantee', type: 'depends_on', year: 2020 },
        { target: 'fashion-luxury', type: 'related_to' },
        { target: 'sneaker-authentication', type: 'integrates_with' },
        { target: 'ebay-vault', type: 'integrates_with', year: 2022 },
        { target: 'authenticity-guarantee-streetwear', type: 'related_to', year: 2022 },
      ];
      break;

    case 'authenticity-guarantee-streetwear':
      newRels = [
        { target: 'authenticity-guarantee', type: 'depends_on', year: 2022 },
        { target: 'fashion-luxury', type: 'related_to' },
        { target: 'authenticity-guarantee-sneakers', type: 'related_to' },
        { target: 'trust', type: 'related_to' },
      ];
      break;

    case 'authenticity-guarantee-trading-cards':
      newRels = [
        { target: 'authenticity-guarantee', type: 'depends_on', year: 2021 },
        { target: 'collectibles-trading', type: 'related_to' },
        { target: 'trading-card-authentication', type: 'integrates_with' },
        { target: 'psa-grading-integration', type: 'integrates_with', year: 2021, desc: 'PSA is primary grading partner for trading card AG' },
        { target: 'tcgplayer-authentication-center', type: 'integrates_with', year: 2022 },
        { target: 'ebay-vault', type: 'integrates_with', year: 2022, desc: 'Graded cards can be stored in The Vault' },
      ];
      break;

    case 'authenticity-guarantee-watches':
      newRels = [
        { target: 'authenticity-guarantee', type: 'depends_on', year: 2020 },
        { target: 'fashion-luxury', type: 'related_to' },
        { target: 'watch-authentication', type: 'integrates_with' },
        { target: 'ebay-vault', type: 'integrates_with', year: 2022 },
        { target: 'authenticity-guarantee-jewelry', type: 'related_to' },
        { target: 'authenticity-guarantee-handbags', type: 'related_to' },
      ];
      break;

    case 'authorized-seller-filter':
      newRels = [
        { target: 'trust', type: 'depends_on' },
        { target: 'search-filters', type: 'integrates_with' },
        { target: 'search', type: 'integrates_with' },
        { target: 'certified-by-brand', type: 'related_to', year: 2022, desc: 'Certified by Brand programs feed the authorized seller filter' },
        { target: 'counterfeit-detection', type: 'related_to' },
        { target: 'vero-program', type: 'related_to' },
      ];
      break;

    case 'auto-pay':
      newRels = [
        { target: 'payments', type: 'depends_on' },
        { target: 'managed-payments', type: 'integrates_with', year: 2018 },
        { target: 'checkout', type: 'integrates_with' },
        { target: 'buy-it-now', type: 'integrates_with' },
        { target: 'immediate-payment-required', type: 'related_to', year: 2012, desc: 'Both auto-pay and immediate payment ensure fast payment' },
      ];
      break;

    case 'auto-pricing':
      newRels = [
        { target: 'pricing-tools', type: 'depends_on' },
        { target: 'seller-hub', type: 'integrates_with' },
        { target: 'terapeak', type: 'integrates_with', year: 2021, desc: 'Market pricing data from Terapeak informs auto-pricing' },
        { target: 'product-research', type: 'integrates_with', year: 2024 },
        { target: 'competitive-pricing', type: 'related_to' },
        { target: 'price-suggestions', type: 'related_to' },
      ];
      break;

    case 'auto-relist':
      newRels = [
        { target: 'listing', type: 'depends_on' },
        { target: 'automatic-relisting', type: 'related_to', year: 2010 },
        { target: 'good-til-cancelled', type: 'related_to', year: 2018, desc: 'Good Til Cancelled achieves similar outcome for fixed price' },
        { target: 'seller-hub', type: 'integrates_with' },
        { target: 'out-of-stock-control', type: 'related_to' },
      ];
      break;

    case 'automatic-bidding':
      newRels = [
        { target: 'auction', type: 'depends_on' },
        { target: 'proxy-bidding', type: 'related_to', year: 1995, desc: 'Automatic bidding and proxy bidding are the same mechanism' },
        { target: 'bid-increment', type: 'integrates_with' },
        { target: 'maximum-bid', type: 'integrates_with' },
        { target: 'outbid-notification', type: 'integrates_with' },
        { target: 'outbid-alert', type: 'integrates_with' },
      ];
      break;

    case 'automatic-relisting':
      newRels = [
        { target: 'listing', type: 'depends_on' },
        { target: 'auto-relist', type: 'related_to' },
        { target: 'good-til-cancelled', type: 'related_to' },
        { target: 'seller-hub', type: 'integrates_with' },
        { target: 'unsold-listings', type: 'related_to' },
      ];
      break;

    case 'awaiting-shipment':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2016 },
        { target: 'order-management', type: 'related_to' },
        { target: 'shipping-labels', type: 'integrates_with' },
        { target: 'mark-as-shipped', type: 'integrates_with' },
        { target: 'handling-time', type: 'integrates_with' },
        { target: 'late-shipment-rate', type: 'related_to', desc: 'Overdue awaiting-shipment orders contribute to late shipment rate' },
        { target: 'valid-tracking-rate', type: 'related_to' },
      ];
      break;

    case 'back-in-stock':
      newRels = [
        { target: 'buyer', type: 'depends_on' },
        { target: 'notifications', type: 'integrates_with' },
        { target: 'email-notifications', type: 'integrates_with' },
        { target: 'push-notifications', type: 'integrates_with' },
        { target: 'out-of-stock-control', type: 'integrates_with', year: 2018, desc: 'Out of Stock Control keeps listing live, Back in Stock notifies when replenished' },
        { target: 'notify-me', type: 'related_to' },
      ];
      break;

    case 'back-to-school':
      newRels = [
        { target: 'marketing', type: 'depends_on' },
        { target: 'events-campaigns', type: 'related_to' },
        { target: 'ebay-deals', type: 'integrates_with' },
        { target: 'electronics-technology', type: 'related_to', desc: 'Electronics are a key category in back-to-school campaigns' },
        { target: 'promotions-manager', type: 'integrates_with' },
        { target: 'black-friday-deals', type: 'related_to' },
      ];
      break;

    case 'background-enhancement':
      newRels = [
        { target: 'listing', type: 'depends_on' },
        { target: 'ai-generated-backgrounds', type: 'integrates_with', year: 2024 },
        { target: 'photo-background-removal', type: 'integrates_with', year: 2023 },
        { target: 'photo-enhancement', type: 'related_to' },
        { target: 'photo-uploader', type: 'integrates_with' },
        { target: 'magical-listing', type: 'integrates_with' },
        { target: 'mobile-photo-editor', type: 'related_to' },
      ];
      break;

    case 'barcode-scanner':
      newRels = [
        { target: 'ebay-selling-app', type: 'depends_on', year: 2015 },
        { target: 'ebay-mobile-app', type: 'integrates_with' },
        { target: 'magical-listing', type: 'integrates_with', year: 2022, desc: 'Barcode scan feeds into Magical Listing flow' },
        { target: 'ai-snap', type: 'related_to', year: 2021, desc: 'Both are camera-based listing shortcuts' },
        { target: 'catalog-api', type: 'depends_on', year: 2015, desc: 'Barcode data matched to Product Catalog for auto-fill' },
        { target: 'product-identifiers', type: 'integrates_with', year: 2015 },
        { target: 'quick-listing-tool', type: 'integrates_with', year: 2015 },
        { target: 'listing-tools', type: 'integrates_with', year: 2015, desc: 'Embedded in the listing flow to auto-populate product details from UPC/EAN scans' },
      ];
      break;

    case 'below-standard':
      newRels = [
        { target: 'seller-performance-standards', type: 'depends_on', year: 2008, desc: 'Below Standard is a tier defined within Seller Performance Standards' },
        { target: 'top-rated-seller', type: 'related_to', year: 2008, desc: 'Opposite end of the seller tier spectrum from Top Rated' },
        { target: 'above-standard', type: 'related_to', year: 2008, desc: 'Contrasting performance tier within same framework' },
        { target: 'transaction-defect-rate', type: 'depends_on', year: 2014, desc: 'Defect rate determines whether seller falls to Below Standard' },
        { target: 'late-shipment-rate', type: 'depends_on', year: 2014, desc: 'High late shipment rate triggers Below Standard classification' },
        { target: 'cases-closed-without-seller-resolution', type: 'depends_on', year: 2014, desc: 'High case closure rate contributes to Below Standard status' },
        { target: 'best-match', type: 'related_to', year: 2013, desc: 'Below Standard sellers receive search penalty in Best Match ranking' },
      ];
      break;

    case 'below-standard-status':
      newRels = [
        { target: 'seller-performance-standards', type: 'depends_on', year: 2010 },
        { target: 'seller-performance-standards-multi-market', type: 'depends_on', year: 2010 },
        { target: 'below-standard', type: 'related_to', year: 2010, desc: 'Duplicate/variant node for same concept' },
        { target: 'transaction-defect-rate', type: 'depends_on', year: 2014 },
        { target: 'top-rated-seller', type: 'related_to', year: 2010 },
        { target: 'seller-hub', type: 'integrates_with', year: 2016, desc: 'Status displayed in Seller Hub performance dashboard' },
      ];
      break;

    case 'best-match':
      newRels = [
        { target: 'cassini', type: 'depends_on', year: 2013, desc: 'Best Match is powered by the Cassini search engine' },
        { target: 'best-match-multi-market', type: 'related_to', year: 2012, desc: 'Multi-market variant of same algorithm' },
        { target: 'best-match-sort', type: 'related_to', year: 2007, desc: 'Sort option implementing Best Match algorithm' },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2013, desc: 'Seller performance metrics feed into Best Match ranking' },
        { target: 'promoted-listings', type: 'integrates_with', year: 2015, desc: 'Promoted Listings boosts position within Best Match results' },
        { target: 'top-rated-seller', type: 'integrates_with', year: 2008, desc: 'Top Rated status boosts Best Match ranking' },
        { target: 'search', type: 'depends_on', year: 2007 },
      ];
      break;

    case 'best-match-multi-market':
      newRels = [
        { target: 'cassini', type: 'depends_on', year: 2013, desc: 'Cassini engine powers multi-market Best Match' },
        { target: 'best-match', type: 'related_to', year: 2012, desc: 'Global variant of Best Match with localized tuning' },
        { target: 'best-match-sort', type: 'related_to', year: 2012 },
        { target: 'seller-performance-standards-multi-market', type: 'integrates_with', year: 2013 },
        { target: 'promoted-listings', type: 'integrates_with', year: 2015 },
        { target: 'search', type: 'depends_on', year: 2012 },
      ];
      break;

    case 'best-match-sort':
      newRels = [
        { target: 'best-match', type: 'related_to', year: 2007, desc: 'Sort UI implementation of Best Match algorithm' },
        { target: 'cassini', type: 'depends_on', year: 2013 },
        { target: 'sort-by', type: 'related_to', year: 2007, desc: 'One of the Sort By options in search' },
        { target: 'search-filters', type: 'integrates_with', year: 2010 },
        { target: 'search', type: 'depends_on', year: 2007 },
      ];
      break;

    case 'best-offer':
      newRels = [
        { target: 'buy-it-now', type: 'integrates_with', year: 2005, desc: 'Best Offer only available on Buy It Now fixed-price listings' },
        { target: 'counteroffer', type: 'related_to', year: 2005, desc: 'Counter Offer is a sub-feature of Best Offer negotiation' },
        { target: 'counter-offer', type: 'related_to', year: 2006 },
        { target: 'decline-offer', type: 'related_to', year: 2005 },
        { target: 'accept-offer', type: 'related_to', year: 2005 },
        { target: 'best-offer-multi-market', type: 'related_to', year: 2008, desc: 'Multi-market variant' },
        { target: 'offers-to-buyers', type: 'related_to', year: 2018, desc: 'Seller-initiated offers complement buyer-initiated Best Offer' },
        { target: 'seller-hub', type: 'integrates_with', year: 2015, desc: 'Offer management surfaces in Seller Hub' },
        { target: 'make-an-offer', type: 'related_to', year: 2005 },
      ];
      break;

    case 'best-offer-multi-market':
      newRels = [
        { target: 'best-offer', type: 'related_to', year: 2008, desc: 'Multi-market version of Best Offer' },
        { target: 'make-offer-multi-market', type: 'depends_on', year: 2008 },
        { target: 'seller-hub-multi-market', type: 'integrates_with', year: 2016 },
        { target: 'counteroffer', type: 'related_to', year: 2008 },
        { target: 'decline-offer', type: 'related_to', year: 2008 },
        { target: 'accept-offer', type: 'related_to', year: 2008 },
      ];
      break;

    case 'bid-increment':
      newRels = [
        { target: 'auction-format', type: 'depends_on', year: 1995, desc: 'Bid Increment is a core mechanic of auction-style listings' },
        { target: 'bidding', type: 'depends_on', year: 1995 },
        { target: 'automatic-bidding', type: 'integrates_with', year: 1995, desc: 'Proxy bidding uses bid increment to place competitive bids' },
        { target: 'proxy-bidding', type: 'integrates_with', year: 1995 },
        { target: 'buy-it-now-in-auctions', type: 'related_to', year: 2000 },
      ];
      break;

    case 'bid-now':
      newRels = [
        { target: 'auction-format', type: 'depends_on', year: 1995 },
        { target: 'bidding', type: 'related_to', year: 1995 },
        { target: 'bid-increment', type: 'integrates_with', year: 1995 },
        { target: 'automatic-bidding', type: 'related_to', year: 1995 },
        { target: 'proxy-bidding', type: 'related_to', year: 1995 },
        { target: 'place-bid', type: 'related_to', year: 1995 },
      ];
      break;

    case 'bid-shielding-policy':
      newRels = [
        { target: 'trust', type: 'depends_on', year: 2002 },
        { target: 'shill-bidding-policy', type: 'related_to', year: 2002, desc: 'Both are auction manipulation policies' },
        { target: 'auction-format', type: 'related_to', year: 2002 },
        { target: 'bidding', type: 'related_to', year: 2002 },
        { target: 'vero-program', type: 'related_to', year: 2005 },
        { target: 'buyer-requirements', type: 'related_to', year: 2008 },
      ];
      break;

    case 'bidding':
      newRels = [
        { target: 'auction-format', type: 'depends_on', year: 1995 },
        { target: 'my-ebay', type: 'integrates_with', year: 2001, desc: 'Bidding history tracked in My eBay' },
        { target: 'bid-now', type: 'related_to', year: 1995 },
        { target: 'bid-increment', type: 'integrates_with', year: 1995 },
        { target: 'automatic-bidding', type: 'related_to', year: 1995 },
        { target: 'proxy-bidding', type: 'related_to', year: 1995 },
        { target: 'outbid-notification', type: 'related_to', year: 2005 },
        { target: 'bids-and-offers', type: 'related_to', year: 2016 },
        { target: 'watchlist', type: 'integrates_with', year: 2001 },
      ];
      break;

    case 'bids-and-offers':
      newRels = [
        { target: 'bidding', type: 'related_to', year: 2016 },
        { target: 'best-offer', type: 'related_to', year: 2016 },
        { target: 'my-ebay', type: 'integrates_with', year: 2016 },
        { target: 'ebay-mobile-app', type: 'integrates_with', year: 2016, desc: 'Mobile app tab showing consolidated bids and offers' },
        { target: 'watchlist', type: 'related_to', year: 2016 },
        { target: 'outbid-notification', type: 'related_to', year: 2016 },
      ];
      break;

    case 'biometric-verification':
      newRels = [
        { target: 'passkeys', type: 'depends_on', year: 2017, desc: 'Biometric verification is a passkey authentication method' },
        { target: 'two-factor-authentication', type: 'related_to', year: 2017, desc: 'Alternative second-factor authentication method' },
        { target: '2-step-verification', type: 'related_to', year: 2017 },
        { target: 'account-security', type: 'integrates_with', year: 2017 },
        { target: 'ebay-mobile-app', type: 'depends_on', year: 2017, desc: 'Biometric auth only available on mobile devices' },
      ];
      break;

    case 'black-friday-deals':
      newRels = [
        { target: 'ebay-deals', type: 'depends_on', year: 2010 },
        { target: 'cyber-monday', type: 'related_to', year: 2011, desc: 'Adjacent holiday shopping events' },
        { target: 'daily-deals', type: 'related_to', year: 2010 },
        { target: 'deals-seller-portal', type: 'integrates_with', year: 2018 },
        { target: 'promoted-listings', type: 'integrates_with', year: 2015, desc: 'Sellers use Promoted Listings to amplify Black Friday visibility' },
        { target: 'discounts-manager', type: 'integrates_with', year: 2016 },
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
        { target: 'ebay-deals-global', type: 'related_to', year: 2010 },
      ];
      break;

    case 'block-buyer-list':
      newRels = [
        { target: 'block-buyers', type: 'related_to', year: 2008, desc: 'Block Buyer List is the stored list, Block Buyers is the action' },
        { target: 'buyer-requirements', type: 'related_to', year: 2008 },
        { target: 'seller-hub', type: 'integrates_with', year: 2016, desc: 'Managed via Seller Hub account settings' },
        { target: 'seller-tools', type: 'depends_on', year: 2008 },
        { target: 'buying-restrictions', type: 'related_to', year: 2009 },
      ];
      break;

    case 'block-buyers':
      newRels = [
        { target: 'block-buyer-list', type: 'related_to', year: 2003 },
        { target: 'buyer-requirements', type: 'integrates_with', year: 2008 },
        { target: 'seller-tools', type: 'depends_on', year: 2003 },
        { target: 'seller-hub', type: 'integrates_with', year: 2015 },
        { target: 'buying-restrictions', type: 'related_to', year: 2009 },
      ];
      break;

    case 'bold':
      newRels = [
        { target: 'bold-title', type: 'related_to', year: 2000, desc: 'Same feature, two names — both legacy listing upgrades' },
        { target: 'listing-upgrades', type: 'related_to', year: 2000 },
        { target: 'gallery-plus', type: 'related_to', year: 2000, desc: 'Competing listing upgrade feature' },
        { target: 'subtitle', type: 'related_to', year: 2000 },
        { target: 'promoted-listings', type: 'replaced_by', year: 2015, desc: 'Promoted Listings replaced paid listing upgrades like Bold' },
      ];
      break;

    case 'bold-title':
      newRels = [
        { target: 'bold', type: 'related_to', year: 2000, desc: 'Same legacy listing upgrade feature' },
        { target: 'listing-upgrades', type: 'related_to', year: 2000 },
        { target: 'promoted-listings', type: 'replaced_by', year: 2015 },
        { target: 'subtitle', type: 'related_to', year: 2000 },
        { target: 'gallery-plus', type: 'related_to', year: 2000 },
      ];
      break;

    case 'bons-plans':
      newRels = [
        { target: 'bons-plans-fr', type: 'related_to', year: 2013, desc: 'Same program, campaign vs program classification' },
        { target: 'ebay-deals', type: 'related_to', year: 2013, desc: 'French equivalent of eBay Deals program' },
        { target: 'ebay-france', type: 'depends_on', year: 2013, desc: 'France-exclusive program' },
        { target: 'daily-deals', type: 'related_to', year: 2013 },
        { target: 'ebay-deals-global', type: 'related_to', year: 2013 },
      ];
      break;

    case 'bons-plans-fr':
      newRels = [
        { target: 'bons-plans', type: 'related_to', year: 2013 },
        { target: 'ebay-deals-global', type: 'depends_on', year: 2013 },
        { target: 'ebay-france', type: 'depends_on', year: 2013 },
        { target: 'daily-deals', type: 'related_to', year: 2013 },
        { target: 'deals-seller-portal', type: 'integrates_with', year: 2018 },
      ];
      break;

    case 'boost-buyer-engagement':
      newRels = [
        { target: 'seller-hub', type: 'integrates_with', year: 2021 },
        { target: 'offers-to-buyers', type: 'related_to', year: 2021 },
        { target: 'offers-to-watchers', type: 'related_to', year: 2021 },
        { target: 'promoted-listings', type: 'related_to', year: 2021 },
        { target: 'discounts-manager', type: 'related_to', year: 2021 },
        { target: 'coupons', type: 'related_to', year: 2021 },
      ];
      break;

    case 'bounce-rate':
      newRels = [
        { target: 'traffic-report', type: 'integrates_with', year: 2018, desc: 'Bounce rate surfaced in Traffic Reports' },
        { target: 'listing-analytics', type: 'integrates_with', year: 2018 },
        { target: 'conversion-rate', type: 'related_to', year: 2018, desc: 'Complementary engagement metric' },
        { target: 'click-through-rate', type: 'related_to', year: 2018 },
        { target: 'seller-hub', type: 'integrates_with', year: 2018 },
        { target: 'page-views', type: 'related_to', year: 2018 },
      ];
      break;

    case 'brand-funded-promoted-listings-priority':
      newRels = [
        { target: 'promoted-listings', type: 'depends_on', year: 2022, desc: 'Sub-variant of Promoted Listings ecosystem' },
        { target: 'promoted-listings-advanced', type: 'related_to', year: 2022, desc: 'Uses priority/CPC model similar to PLA' },
        { target: 'brand-funded-promoted-stores', type: 'related_to', year: 2022, desc: 'Companion brand-funded store promotion' },
        { target: 'ebay-advertising', type: 'depends_on', year: 2022 },
        { target: 'keyword-targeting', type: 'integrates_with', year: 2022 },
        { target: 'promoted-listings-standard', type: 'competes_with', year: 2022 },
      ];
      break;

    case 'brand-funded-promoted-stores':
      newRels = [
        { target: 'promoted-stores', type: 'depends_on', year: 2022, desc: 'Brand-funded variant of Promoted Stores' },
        { target: 'brand-funded-promoted-listings-priority', type: 'related_to', year: 2022 },
        { target: 'ebay-stores', type: 'integrates_with', year: 2022 },
        { target: 'ebay-advertising', type: 'depends_on', year: 2022 },
        { target: 'promoted-listings', type: 'related_to', year: 2022 },
      ];
      break;

    case 'brand-identity':
      newRels = [
        { target: 'ebay-stores', type: 'integrates_with', year: 2001, desc: 'Brand identity features live within eBay Stores' },
        { target: 'store-header', type: 'related_to', year: 2001 },
        { target: 'brand-name', type: 'related_to', year: 2005 },
        { target: 'brand-outlet', type: 'related_to', year: 2014 },
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
        { target: 'listing-template', type: 'integrates_with', year: 2005 },
      ];
      break;

    case 'brand-name':
      newRels = [
        { target: 'item-specifics', type: 'integrates_with', year: 2005, desc: 'Brand Name is a required Item Specific in many categories' },
        { target: 'brand-identity', type: 'related_to', year: 2005 },
        { target: 'listing', type: 'depends_on', year: 2005 },
        { target: 'product-identifiers', type: 'related_to', year: 2010, desc: 'Brand plus MPN form product identifiers' },
        { target: 'cassini', type: 'integrates_with', year: 2013, desc: 'Brand name improves search relevance in Cassini' },
      ];
      break;

    case 'brand-outlet':
      newRels = [
        { target: 'ebay-stores', type: 'integrates_with', year: 2014 },
        { target: 'certified-by-brand', type: 'related_to', year: 2023, desc: 'Both involve authorized brand presence on eBay' },
        { target: 'buyer', type: 'related_to', year: 2014 },
        { target: 'fashion-luxury', type: 'related_to', year: 2014 },
        { target: 'promoted-stores', type: 'integrates_with', year: 2019 },
      ];
      break;

    case 'browse-categories':
      newRels = [
        { target: 'search', type: 'integrates_with', year: 1997 },
        { target: 'category-browse', type: 'related_to', year: 1997, desc: 'Browse Categories and Category Browse are the same concept' },
        { target: 'cassini', type: 'integrates_with', year: 2013 },
        { target: 'shop-by-category', type: 'related_to', year: 2005 },
        { target: 'condition-filter', type: 'integrates_with', year: 2008 },
        { target: 'search-filters', type: 'integrates_with', year: 2010 },
      ];
      break;

    case 'bulk-edit':
      newRels = [
        { target: 'bulk-listing-tools', type: 'depends_on', year: 2012, desc: 'Bulk Edit is part of Bulk Listing Tools suite' },
        { target: 'seller-hub', type: 'integrates_with', year: 2015 },
        { target: 'bulk-listing', type: 'related_to', year: 2012 },
        { target: 'inventory-management', type: 'integrates_with', year: 2015 },
        { target: 'active-listings', type: 'integrates_with', year: 2012 },
      ];
      break;

    case 'bulk-listing':
      newRels = [
        { target: 'bulk-listing-tools', type: 'depends_on', year: 2008 },
        { target: 'bulk-edit', type: 'related_to', year: 2012 },
        { target: 'seller-hub', type: 'integrates_with', year: 2015 },
        { target: 'csv-upload', type: 'integrates_with', year: 2010 },
        { target: 'file-exchange', type: 'replaced_by', year: 2017, desc: 'File Exchange was predecessor bulk tool replaced by Seller Hub Reports' },
        { target: 'seller-hub-reports', type: 'integrates_with', year: 2017 },
        { target: 'business-policies', type: 'depends_on', year: 2012 },
      ];
      break;

    case 'bulk-listing-tool':
      newRels = [
        { target: 'bulk-listing-tools', type: 'depends_on', year: 2010 },
        { target: 'bulk-listing-tool-multi-market', type: 'related_to', year: 2010 },
        { target: 'seller-hub', type: 'integrates_with', year: 2015 },
        { target: 'csv-upload', type: 'integrates_with', year: 2010 },
        { target: 'bulk-listing', type: 'related_to', year: 2010 },
      ];
      break;

    case 'bulk-listing-tool-multi-market':
      newRels = [
        { target: 'bulk-listing-tool', type: 'related_to', year: 2005, desc: 'Multi-market variant of Bulk Listing Tool' },
        { target: 'seller-hub-multi-market', type: 'integrates_with', year: 2016 },
        { target: 'listing-tools', type: 'depends_on', year: 2005 },
        { target: 'csv-upload', type: 'integrates_with', year: 2005 },
        { target: 'business-policies', type: 'depends_on', year: 2012 },
      ];
      break;

    case 'bulk-listing-tools':
      newRels = [
        { target: 'seller-hub', type: 'integrates_with', year: 2015, desc: 'Bulk Listing Tools are part of Seller Hub' },
        { target: 'bulk-edit', type: 'related_to', year: 2012 },
        { target: 'bulk-listing', type: 'related_to', year: 2008 },
        { target: 'bulk-listing-tool', type: 'related_to', year: 2010 },
        { target: 'bulk-upload', type: 'related_to', year: 2008 },
        { target: 'csv-upload', type: 'integrates_with', year: 2010 },
        { target: 'turbo-lister', type: 'replaced_by', year: 2017, desc: 'Turbo Lister was legacy bulk tool replaced by Seller Hub bulk tools' },
        { target: 'file-exchange', type: 'replaced_by', year: 2017 },
      ];
      break;

    case 'bulk-listing-upload':
      newRels = [
        { target: 'bulk-listing', type: 'related_to', year: 2010 },
        { target: 'csv-upload', type: 'related_to', year: 2010 },
        { target: 'seller-hub', type: 'integrates_with', year: 2015 },
        { target: 'file-exchange', type: 'related_to', year: 2010, desc: 'File Exchange was the legacy bulk upload tool' },
        { target: 'business-policies', type: 'depends_on', year: 2012 },
      ];
      break;

    case 'bulk-upload':
      newRels = [
        { target: 'bulk-listing-tools', type: 'depends_on', year: 2008 },
        { target: 'csv-upload', type: 'related_to', year: 2010 },
        { target: 'seller-hub', type: 'integrates_with', year: 2015 },
        { target: 'bulk-listing', type: 'related_to', year: 2008 },
        { target: 'file-exchange', type: 'related_to', year: 2008 },
      ];
      break;

    case 'business-equipment-purchase-protection':
      newRels = [
        { target: 'buyer-protection', type: 'related_to', year: 2019, desc: 'Specialized variant of buyer protection for B2B purchases' },
        { target: 'ebay-money-back-guarantee', type: 'related_to', year: 2019 },
        { target: 'business-industrial', type: 'depends_on', year: 2019, desc: 'Designed specifically for Business & Industrial category' },
        { target: 'trust', type: 'depends_on', year: 2019 },
        { target: 'purchase-protection', type: 'related_to', year: 2019 },
      ];
      break;

    case 'business-policies':
      newRels = [
        { target: 'seller-hub', type: 'integrates_with', year: 2015, desc: 'Business Policies managed within Seller Hub' },
        { target: 'bulk-listing', type: 'depends_on', year: 2012, desc: 'Required for bulk listing workflows' },
        { target: 'shipping', type: 'integrates_with', year: 2012, desc: 'Shipping policy is one of three business policy types' },
        { target: 'returns', type: 'integrates_with', year: 2012, desc: 'Return policy is one of three business policy types' },
        { target: 'payment', type: 'integrates_with', year: 2012, desc: 'Payment policy is one of three business policy types' },
        { target: 'managed-payments', type: 'integrates_with', year: 2019 },
        { target: 'listing', type: 'depends_on', year: 2012 },
      ];
      break;

    case 'buy-again':
      newRels = [
        { target: 'my-ebay', type: 'integrates_with', year: 2019 },
        { target: 'purchase-history', type: 'depends_on', year: 2019 },
        { target: 'ebay-mobile-app', type: 'integrates_with', year: 2019 },
        { target: 'checkout', type: 'integrates_with', year: 2019 },
        { target: 'buyer', type: 'related_to', year: 2019 },
      ];
      break;

    case 'buy-it-now':
      newRels = [
        { target: 'buy-it-now-multi-market', type: 'related_to', year: 2000 },
        { target: 'best-offer', type: 'integrates_with', year: 2005, desc: 'Best Offer available on BIN listings' },
        { target: 'auction-format', type: 'competes_with', year: 2000, desc: 'Fixed-price format contrasts with auction bidding' },
        { target: 'buy-it-now-in-auctions', type: 'related_to', year: 2000 },
        { target: 'fixed-price-format', type: 'related_to', year: 2000 },
        { target: 'checkout', type: 'integrates_with', year: 2000 },
        { target: 'buy-it-now-filter', type: 'related_to', year: 2005 },
        { target: 'immediate-payment-required', type: 'integrates_with', year: 2005 },
        { target: 'listing', type: 'depends_on', year: 2000 },
      ];
      break;

    case 'buy-it-now-filter':
      newRels = [
        { target: 'buy-it-now', type: 'depends_on', year: 2005 },
        { target: 'search-filters', type: 'depends_on', year: 2005 },
        { target: 'buying-format', type: 'related_to', year: 2005 },
        { target: 'search', type: 'integrates_with', year: 2005 },
      ];
      break;

    case 'buy-it-now-in-auctions':
      newRels = [
        { target: 'buy-it-now', type: 'related_to', year: 2000 },
        { target: 'auction-format', type: 'depends_on', year: 2000 },
        { target: 'bid-increment', type: 'related_to', year: 2000, desc: 'BIN option disappears once bidding exceeds certain threshold' },
        { target: 'bidding', type: 'related_to', year: 2000 },
      ];
      break;

    case 'buy-it-now-multi-market':
      newRels = [
        { target: 'buy-it-now', type: 'related_to', year: 2000 },
        { target: 'listing-formats', type: 'depends_on', year: 2000 },
        { target: 'best-offer-multi-market', type: 'integrates_with', year: 2008 },
        { target: 'checkout', type: 'integrates_with', year: 2000 },
        { target: 'fixed-price-format', type: 'related_to', year: 2000 },
      ];
      break;

    case 'buy-it-now-price':
      newRels = [
        { target: 'buy-it-now', type: 'depends_on', year: 2000 },
        { target: 'auction-format', type: 'integrates_with', year: 2000 },
        { target: 'reserve-price', type: 'related_to', year: 2000 },
        { target: 'price-suggestions', type: 'integrates_with', year: 2019 },
        { target: 'competitive-pricing', type: 'related_to', year: 2019 },
      ];
      break;

    case 'buyer-groups':
      newRels = [
        { target: 'seller-hub', type: 'integrates_with', year: 2020 },
        { target: 'promotions-manager', type: 'integrates_with', year: 2020 },
        { target: 'coupons', type: 'integrates_with', year: 2020 },
        { target: 'coded-coupons', type: 'integrates_with', year: 2020 },
        { target: 'buyer', type: 'related_to', year: 2020 },
      ];
      break;

    case 'buyer-messages':
      newRels = [
        { target: 'seller-hub', type: 'integrates_with', year: 2008, desc: 'Buyer Messages inbox in Seller Hub' },
        { target: 'message-center', type: 'related_to', year: 2008 },
        { target: 'contact-seller', type: 'related_to', year: 2000 },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2014, desc: 'Response rate tracked as performance metric' },
        { target: 'ebay-mobile-app', type: 'integrates_with', year: 2016 },
        { target: 'ebay-ai-message-assistance', type: 'integrates_with', year: 2023 },
      ];
      break;

    case 'buyer-pays-return-shipping':
      newRels = [
        { target: 'returns', type: 'depends_on', year: 2014 },
        { target: 'seller-pays-return-shipping', type: 'competes_with', year: 2014, desc: 'Two opposing return shipping policy options' },
        { target: 'business-policies', type: 'integrates_with', year: 2014 },
        { target: 'free-returns', type: 'competes_with', year: 2014 },
        { target: 'top-rated-plus', type: 'related_to', year: 2014, desc: 'Free returns required for Top Rated Plus badge' },
      ];
      break;

    case 'buyer-protection':
      newRels = [
        { target: 'ebay-money-back-guarantee', type: 'related_to', year: 1999, desc: 'Money Back Guarantee is the primary buyer protection program' },
        { target: 'purchase-protection', type: 'related_to', year: 1999 },
        { target: 'money-back-guarantee', type: 'related_to', year: 2010 },
        { target: 'item-not-received', type: 'integrates_with', year: 1999 },
        { target: 'significantly-not-as-described', type: 'integrates_with', year: 1999 },
        { target: 'managed-returns', type: 'integrates_with', year: 2014 },
        { target: 'resolution-center-multi-market', type: 'integrates_with', year: 2010 },
        { target: 'trust', type: 'depends_on', year: 1999 },
      ];
      break;

    case 'buyer-requirements':
      newRels = [
        { target: 'block-buyers', type: 'related_to', year: 2008 },
        { target: 'block-buyer-list', type: 'integrates_with', year: 2008 },
        { target: 'seller-tools', type: 'depends_on', year: 2008 },
        { target: 'seller-hub', type: 'integrates_with', year: 2015 },
        { target: 'buying-restrictions', type: 'related_to', year: 2009 },
      ];
      break;

    case 'buyer-review':
      newRels = [
        { target: 'feedback-forum', type: 'related_to', year: 2013 },
        { target: 'detailed-seller-ratings', type: 'related_to', year: 2013 },
        { target: 'item-reviews', type: 'related_to', year: 2013 },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2013 },
        { target: 'verified-purchase', type: 'related_to', year: 2013 },
      ];
      break;

    case 'buying-format':
      newRels = [
        { target: 'search-filters', type: 'depends_on', year: 2005 },
        { target: 'buy-it-now-filter', type: 'related_to', year: 2005 },
        { target: 'auction-format', type: 'related_to', year: 2005 },
        { target: 'best-offer', type: 'related_to', year: 2005 },
        { target: 'search', type: 'integrates_with', year: 2005 },
      ];
      break;

    case 'buying-restrictions':
      newRels = [
        { target: 'trust', type: 'depends_on', year: 2009 },
        { target: 'block-buyers', type: 'related_to', year: 2009 },
        { target: 'buyer-requirements', type: 'related_to', year: 2009 },
        { target: 'seller-protections', type: 'related_to', year: 2009 },
        { target: 'unpaid-item-assistant', type: 'related_to', year: 2009 },
      ];
      break;

    case 'calculated-shipping':
      newRels = [
        { target: 'shipping', type: 'depends_on', year: 2004 },
        { target: 'flat-rate-shipping', type: 'competes_with', year: 2004, desc: 'Alternative to flat-rate shipping' },
        { target: 'shipping-calculator', type: 'related_to', year: 2004 },
        { target: 'business-policies', type: 'integrates_with', year: 2012 },
        { target: 'combined-shipping', type: 'integrates_with', year: 2006 },
      ];
      break;

    case 'campaign-bidding':
      newRels = [
        { target: 'promoted-listings-advanced', type: 'depends_on', year: 2020, desc: 'Campaign Bidding is feature of Promoted Listings Advanced' },
        { target: 'promoted-listings', type: 'depends_on', year: 2020 },
        { target: 'keyword-targeting', type: 'integrates_with', year: 2020 },
        { target: 'cost-per-click', type: 'integrates_with', year: 2020 },
        { target: 'advertising-dashboard', type: 'integrates_with', year: 2020 },
        { target: 'promoted-listings-standard', type: 'competes_with', year: 2020, desc: 'CPC bidding contrasts with CPS model in Standard' },
      ];
      break;

    case 'canada-post-expedited':
      newRels = [
        { target: 'shipping', type: 'depends_on', year: 2011 },
        { target: 'ebay-canada', type: 'depends_on', year: 2011 },
        { target: 'shipping-labels', type: 'integrates_with', year: 2011 },
        { target: 'calculated-shipping', type: 'integrates_with', year: 2011 },
        { target: 'package-tracking', type: 'integrates_with', year: 2011 },
      ];
      break;

    case 'cancel-order':
      newRels = [
        { target: 'order-management', type: 'depends_on', year: 2013 },
        { target: 'cancellation-request', type: 'related_to', year: 2016, desc: 'Cancel Order is seller action; Cancellation Request is buyer-initiated' },
        { target: 'seller-hub', type: 'integrates_with', year: 2015 },
        { target: 'managed-returns', type: 'related_to', year: 2014 },
        { target: 'transaction-defect-rate', type: 'integrates_with', year: 2014, desc: 'Seller-cancelled orders can count as defects' },
      ];
      break;

    case 'cancellation-request':
      newRels = [
        { target: 'order-management', type: 'depends_on', year: 2016 },
        { target: 'cancel-order', type: 'related_to', year: 2016 },
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
        { target: 'buyer', type: 'related_to', year: 2016 },
      ];
      break;

    case 'cart-total':
      newRels = [
        { target: 'checkout', type: 'depends_on', year: 2012 },
        { target: 'shopping-cart', type: 'depends_on', year: 2012 },
        { target: 'combined-checkout', type: 'integrates_with', year: 2012 },
        { target: 'managed-payments', type: 'integrates_with', year: 2019 },
        { target: 'coupons', type: 'integrates_with', year: 2015 },
      ];
      break;

    case 'cases-closed-without-seller-resolution':
      newRels = [
        { target: 'seller-performance-standards', type: 'depends_on', year: 2014 },
        { target: 'transaction-defect-rate', type: 'integrates_with', year: 2014 },
        { target: 'resolution-center-multi-market', type: 'related_to', year: 2014 },
        { target: 'managed-returns', type: 'related_to', year: 2014 },
        { target: 'below-standard', type: 'integrates_with', year: 2014 },
        { target: 'seller-hub', type: 'integrates_with', year: 2015 },
      ];
      break;

    case 'cassini':
      newRels = [
        { target: 'best-match', type: 'related_to', year: 2013, desc: 'Cassini is the engine powering Best Match search ranking' },
        { target: 'best-match-multi-market', type: 'related_to', year: 2013 },
        { target: 'search', type: 'depends_on', year: 2013 },
        { target: 'promoted-listings', type: 'integrates_with', year: 2015, desc: 'Promoted Listings pay to appear above organic Cassini results' },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2013, desc: 'Performance signals feed Cassini ranking' },
        { target: 'item-specifics', type: 'integrates_with', year: 2013 },
        { target: 'top-rated-seller', type: 'integrates_with', year: 2013 },
      ];
      break;

    case 'category-browse':
      newRels = [
        { target: 'browse-categories', type: 'related_to', year: 1995, desc: 'Effectively the same feature' },
        { target: 'search', type: 'integrates_with', year: 1995 },
        { target: 'shop-by-category', type: 'related_to', year: 2005 },
        { target: 'discovery', type: 'depends_on', year: 1995 },
        { target: 'cassini', type: 'integrates_with', year: 2013 },
        { target: 'search-filters', type: 'integrates_with', year: 2010 },
      ];
      break;

    case 'cbt-seller-dashboard':
      newRels = [
        { target: 'cross-border-trade', type: 'depends_on', year: 2020 },
        { target: 'seller-hub', type: 'related_to', year: 2020 },
        { target: 'ebay-international-shipping', type: 'integrates_with', year: 2020 },
        { target: 'international-site-visibility', type: 'integrates_with', year: 2020 },
        { target: 'seller-performance-standards-multi-market', type: 'integrates_with', year: 2020 },
      ];
      break;

    case 'ccpa-compliance':
      newRels = [
        { target: 'gdpr-compliance', type: 'related_to', year: 2020, desc: 'Both are privacy/data compliance regulations' },
        { target: 'privacy-policy', type: 'integrates_with', year: 2020 },
        { target: 'trust', type: 'depends_on', year: 2020 },
        { target: 'account-settings', type: 'integrates_with', year: 2020 },
      ];
      break;

    case 'certificate-of-authenticity':
      newRels = [
        { target: 'authenticity-guarantee', type: 'integrates_with', year: 2011, desc: 'COA is part of Authenticity Guarantee process for collectibles' },
        { target: 'trading-card-authentication', type: 'integrates_with', year: 2011 },
        { target: 'sports-memorabilia', type: 'depends_on', year: 2011 },
        { target: 'collectibles', type: 'depends_on', year: 2011 },
        { target: 'wata-grading', type: 'related_to', year: 2020 },
        { target: 'psa-grading-integration', type: 'related_to', year: 2015 },
      ];
      break;

    case 'certified-by-brand':
      newRels = [
        { target: 'authenticity-guarantee', type: 'related_to', year: 2023, desc: 'Complementary authentication track for brand-certified items' },
        { target: 'trust', type: 'depends_on', year: 2023 },
        { target: 'fashion-luxury', type: 'related_to', year: 2023 },
        { target: 'authorized-seller-filter', type: 'integrates_with', year: 2023 },
        { target: 'brand-outlet', type: 'related_to', year: 2023 },
      ];
      break;

    case 'certified-open-box':
      newRels = [
        { target: 'ebay-refurbished', type: 'depends_on', year: 2025, desc: 'Open box tier within eBay Refurbished program' },
        { target: 'certified-refurbished', type: 'related_to', year: 2025 },
        { target: 'open-box', type: 'related_to', year: 2025 },
        { target: 'ebay-refurbished-warranty', type: 'integrates_with', year: 2025 },
        { target: 'refurbished', type: 'depends_on', year: 2025 },
      ];
      break;

    case 'certified-recycled':
      newRels = [
        { target: 'certified-recycled-program', type: 'depends_on', year: 2021 },
        { target: 'certified-recycler-program', type: 'related_to', year: 2021 },
        { target: 'sustainability', type: 'depends_on', year: 2021 },
        { target: 'ebay-refurbished', type: 'related_to', year: 2021 },
        { target: 'impact', type: 'related_to', year: 2021 },
      ];
      break;

    case 'certified-recycled-program':
      newRels = [
        { target: 'certified-recycler-program', type: 'related_to', year: 2020, desc: 'Both are sustainability certification programs' },
        { target: 'certified-recycled', type: 'related_to', year: 2021 },
        { target: 'sustainability', type: 'depends_on', year: 2020 },
        { target: 'impact', type: 'depends_on', year: 2020 },
        { target: 'ebay-refurbished', type: 'related_to', year: 2020 },
      ];
      break;

    case 'certified-recycler-program':
      newRels = [
        { target: 'certified-recycled-program', type: 'related_to', year: 2020 },
        { target: 'certified-recycled', type: 'related_to', year: 2021 },
        { target: 'sustainability', type: 'depends_on', year: 2020 },
        { target: 'impact', type: 'depends_on', year: 2020 },
        { target: 'ebay-refurbished', type: 'related_to', year: 2020 },
      ];
      break;

    case 'certified-refurbished':
      newRels = [
        { target: 'ebay-refurbished', type: 'depends_on', year: 2020, desc: 'Top tier within eBay Refurbished program' },
        { target: 'excellent-refurbished', type: 'related_to', year: 2020, desc: 'Adjacent refurbished condition tier' },
        { target: 'very-good-refurbished', type: 'related_to', year: 2020 },
        { target: 'good-refurbished', type: 'related_to', year: 2020 },
        { target: 'ebay-refurbished-warranty', type: 'integrates_with', year: 2020 },
        { target: 'condition-filter', type: 'integrates_with', year: 2020 },
        { target: 'refurbished', type: 'depends_on', year: 2020 },
      ];
      break;

    case 'checkout':
      newRels = [
        { target: 'managed-payments', type: 'depends_on', year: 2019, desc: 'Checkout fully integrated with Managed Payments' },
        { target: 'paypal', type: 'replaced_by', year: 2021, desc: 'PayPal checkout replaced by Managed Payments' },
        { target: 'shopping-cart', type: 'integrates_with', year: 2010 },
        { target: 'combined-checkout', type: 'related_to', year: 2010 },
        { target: 'guest-checkout', type: 'related_to', year: 2015 },
        { target: 'checkout-as-guest', type: 'related_to', year: 2015 },
        { target: 'buy-it-now', type: 'integrates_with', year: 2000 },
        { target: 'apple-pay', type: 'integrates_with', year: 2018 },
        { target: 'google-pay', type: 'integrates_with', year: 2018 },
        { target: 'klarna', type: 'integrates_with', year: 2020 },
      ];
      break;

    case 'checkout-as-guest':
      newRels = [
        { target: 'checkout', type: 'depends_on', year: 2015 },
        { target: 'guest-checkout', type: 'related_to', year: 2015, desc: 'Same feature, two names' },
        { target: 'managed-payments', type: 'integrates_with', year: 2019 },
        { target: 'buyer', type: 'related_to', year: 2015 },
      ];
      break;

    case 'circular-fashion-fund':
      newRels = [
        { target: 'sustainability', type: 'depends_on', year: 2021 },
        { target: 'impact', type: 'depends_on', year: 2021 },
        { target: 'consommation-raisonnee', type: 'related_to', year: 2021, desc: 'Both are sustainability/circular economy programs' },
        { target: 'pre-loved-fashion-week', type: 'related_to', year: 2021 },
        { target: 'pre-loved-partner-program', type: 'related_to', year: 2021 },
        { target: 'fashion-luxury', type: 'related_to', year: 2021 },
        { target: 'ebay-foundation', type: 'related_to', year: 2021 },
        { target: 'sustainability', type: 'integrates_with', year: 2024, desc: 'Fund directly supports circular economy and recommerce sustainability goals' },
        { target: 'fashion', type: 'integrates_with', year: 2024, desc: 'Targets fashion businesses with resale, repair, and circular design models' },
        { target: 'endless-runway', type: 'related_to', year: 2024, desc: 'Complementary fashion sustainability initiative' },
        { target: 'recommerce-report', type: 'related_to', year: 2024, desc: 'Recommerce Report documents the impact that programs like Circular Fashion Fund contribute to' },
      ];
      break;

    case 'classified-ads':
      newRels = [
        { target: 'ebay-motors', type: 'depends_on', year: 2005, desc: 'Classified Ads primarily used for Motors' },
        { target: 'local-pickup', type: 'integrates_with', year: 2005, desc: 'Classified items require local pickup' },
        { target: 'buy-it-now', type: 'competes_with', year: 2005, desc: 'Classified Ads are a different listing format from BIN' },
        { target: 'auction-format', type: 'competes_with', year: 2005 },
        { target: 'ebay-real-estate', type: 'related_to', year: 2005 },
        { target: 'vehicle-history-report', type: 'integrates_with', year: 2010 },
      ];
      break;

    case 'clear-filters':
      newRels = [
        { target: 'search-filters', type: 'depends_on', year: 2010 },
        { target: 'search', type: 'integrates_with', year: 2010 },
        { target: 'refine-search', type: 'related_to', year: 2010 },
      ];
      break;

    case 'click-and-collect':
      newRels = [
        { target: 'click-and-collect-multi-market', type: 'related_to', year: 2015 },
        { target: 'click-collect', type: 'related_to', year: 2015, desc: 'Variant names for the same feature' },
        { target: 'local-pickup', type: 'related_to', year: 2015 },
        { target: 'shipping', type: 'depends_on', year: 2015 },
        { target: 'ebay-uk', type: 'depends_on', year: 2015 },
        { target: 'collection-points-au', type: 'related_to', year: 2016 },
      ];
      break;

    case 'click-and-collect-multi-market':
      newRels = [
        { target: 'click-and-collect', type: 'related_to', year: 2014 },
        { target: 'click-collect', type: 'related_to', year: 2015 },
        { target: 'collection-points-au', type: 'integrates_with', year: 2016 },
        { target: 'ebay-collection-points', type: 'integrates_with', year: 2015 },
        { target: 'local-pickup', type: 'related_to', year: 2015 },
        { target: 'shipping', type: 'depends_on', year: 2014 },
        { target: 'ebay-collection-points-uk', type: 'integrates_with', year: 2015 },
      ];
      break;

    case 'click-collect':
      newRels = [
        { target: 'click-and-collect', type: 'related_to', year: 2015 },
        { target: 'click-and-collect-multi-market', type: 'related_to', year: 2015 },
        { target: 'local-pickup', type: 'related_to', year: 2015 },
        { target: 'shipping', type: 'depends_on', year: 2015 },
      ];
      break;

    case 'click-through-rate':
      newRels = [
        { target: 'promoted-listings', type: 'integrates_with', year: 2014, desc: 'CTR is key metric for Promoted Listings performance' },
        { target: 'advertising-dashboard', type: 'integrates_with', year: 2018 },
        { target: 'listing-analytics', type: 'integrates_with', year: 2014 },
        { target: 'traffic-report', type: 'integrates_with', year: 2018 },
        { target: 'bounce-rate', type: 'related_to', year: 2018 },
        { target: 'conversion-rate', type: 'related_to', year: 2014 },
        { target: 'impressions', type: 'related_to', year: 2014 },
      ];
      break;

    case 'coded-coupons':
      newRels = [
        { target: 'discounts-manager', type: 'depends_on', year: 2015, desc: 'Coded Coupons managed within Discounts Manager' },
        { target: 'promotions-manager', type: 'depends_on', year: 2015 },
        { target: 'codeless-coupons', type: 'competes_with', year: 2020, desc: 'Coded vs codeless: buyer must enter code vs auto-apply' },
        { target: 'coupons', type: 'related_to', year: 2015 },
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
        { target: 'buyer-groups', type: 'integrates_with', year: 2020 },
        { target: 'ebay-stores', type: 'depends_on', year: 2015, desc: 'Requires eBay Store subscription' },
        { target: 'sale-events', type: 'related_to', year: 2015, desc: 'Both are promotional tools within Discounts Manager' },
        { target: 'volume-pricing', type: 'related_to', year: 2015, desc: 'Both offer buyer discounts through different mechanisms' },
      ];
      break;

    case 'coded-coupons-multi-market':
      newRels = [
        { target: 'coded-coupons', type: 'related_to', year: 2016, desc: 'Multi-market variant of Coded Coupons' },
        { target: 'discounts-manager-multi-market', type: 'depends_on', year: 2016 },
        { target: 'seller-hub-multi-market', type: 'integrates_with', year: 2016 },
        { target: 'coupons', type: 'related_to', year: 2016 },
        { target: 'codeless-coupons', type: 'competes_with', year: 2020 },
      ];
      break;

    case 'codeless-coupons':
      newRels = [
        { target: 'coupons', type: 'related_to', year: 2020 },
        { target: 'coded-coupons', type: 'competes_with', year: 2020 },
        { target: 'discounts-manager', type: 'depends_on', year: 2020 },
        { target: 'promotions-manager', type: 'depends_on', year: 2020 },
        { target: 'checkout', type: 'integrates_with', year: 2020 },
      ];
      break;

    case 'coins-currency':
      newRels = [
        { target: 'collectibles', type: 'depends_on', year: 1999 },
        { target: 'authenticity-guarantee', type: 'related_to', year: 2020 },
        { target: 'collectibles-price-guide', type: 'integrates_with', year: 2021 },
        { target: 'certificate-of-authenticity', type: 'related_to', year: 2011 },
        { target: 'ebay-vault', type: 'integrates_with', year: 2022 },
        { target: 'product-research', type: 'integrates_with', year: 2019 },
      ];
      break;

    case 'collectibles-price-guide':
      newRels = [
        { target: 'product-research', type: 'related_to', year: 2021, desc: 'Both are market research tools for pricing' },
        { target: 'terapeak', type: 'related_to', year: 2021 },
        { target: 'trading-card-hub', type: 'integrates_with', year: 2021 },
        { target: 'coins-currency', type: 'integrates_with', year: 2021 },
        { target: 'collectibles', type: 'depends_on', year: 2021 },
        { target: 'seller-hub', type: 'integrates_with', year: 2021 },
      ];
      break;

    case 'collection-points-au':
      newRels = [
        { target: 'click-and-collect-multi-market', type: 'depends_on', year: 2016 },
        { target: 'ebay-australia', type: 'depends_on', year: 2016 },
        { target: 'australia-post-express', type: 'integrates_with', year: 2016 },
        { target: 'shipping', type: 'integrates_with', year: 2016 },
        { target: 'shipping-labels', type: 'integrates_with', year: 2016 },
      ];
      break;

    case 'collections':
      newRels = [
        { target: 'my-ebay', type: 'integrates_with', year: 2020 },
        { target: 'my-collection', type: 'related_to', year: 2020, desc: 'Collections and My Collection are related organizational features' },
        { target: 'watchlist', type: 'related_to', year: 2020 },
        { target: 'saved-searches', type: 'related_to', year: 2020 },
        { target: 'buyer', type: 'related_to', year: 2020 },
        { target: 'ebay-mobile-app', type: 'integrates_with', year: 2020 },
      ];
      break;

    case 'combined-checkout':
      newRels = [
        { target: 'checkout', type: 'depends_on', year: 2010 },
        { target: 'shopping-cart', type: 'depends_on', year: 2010 },
        { target: 'combined-shipping', type: 'integrates_with', year: 2010 },
        { target: 'managed-payments', type: 'integrates_with', year: 2019 },
        { target: 'cart-total', type: 'integrates_with', year: 2012 },
      ];
      break;

    case 'combined-shipping':
      newRels = [
        { target: 'combined-shipping-discount', type: 'related_to', year: 2007, desc: 'Discount applied to combined shipments' },
        { target: 'shipping', type: 'depends_on', year: 2006 },
        { target: 'combined-checkout', type: 'integrates_with', year: 2010 },
        { target: 'business-policies', type: 'integrates_with', year: 2012 },
        { target: 'seller-hub', type: 'integrates_with', year: 2015 },
      ];
      break;

    case 'combined-shipping-discount':
      newRels = [
        { target: 'combined-shipping', type: 'depends_on', year: 2007 },
        { target: 'shipping-discounts', type: 'related_to', year: 2007 },
        { target: 'promotions-manager', type: 'integrates_with', year: 2014 },
        { target: 'discounts-manager', type: 'integrates_with', year: 2020 },
        { target: 'business-policies', type: 'integrates_with', year: 2012 },
      ];
      break;

    case 'comics':
      newRels = [
        { target: 'collectibles', type: 'depends_on', year: 2001 },
        { target: 'collectibles-trading', type: 'depends_on', year: 2001 },
        { target: 'certificate-of-authenticity', type: 'related_to', year: 2011 },
        { target: 'trading-card-authentication', type: 'related_to', year: 2020 },
        { target: 'authenticity-guarantee', type: 'related_to', year: 2021 },
        { target: 'product-research', type: 'integrates_with', year: 2019 },
      ];
      break;

    case 'communication-preferences':
      newRels = [
        { target: 'account-settings', type: 'depends_on', year: 2015 },
        { target: 'notification-preferences', type: 'related_to', year: 2015 },
        { target: 'email-notifications', type: 'integrates_with', year: 2015 },
        { target: 'sms-notifications', type: 'integrates_with', year: 2015 },
        { target: 'push-notifications', type: 'integrates_with', year: 2015 },
      ];
      break;

    case 'community-forums':
      newRels = [
        { target: 'ebay-community', type: 'depends_on', year: 2001 },
        { target: 'seller-community', type: 'related_to', year: 2001 },
        { target: 'ebay-academy', type: 'related_to', year: 2015 },
        { target: 'support', type: 'depends_on', year: 2001 },
        { target: 'seller-clinics', type: 'related_to', year: 2010 },
        { target: 'powerseller', type: 'related_to', year: 2001, desc: 'Power Sellers historically moderated community forums' },
      ];
      break;

    case 'competitive-pricing':
      newRels = [
        { target: 'pricing-tools', type: 'depends_on', year: 2019 },
        { target: 'seller-hub', type: 'integrates_with', year: 2019 },
        { target: 'auto-pricing', type: 'related_to', year: 2019 },
        { target: 'price-suggestions', type: 'related_to', year: 2019 },
        { target: 'product-research', type: 'integrates_with', year: 2019 },
        { target: 'terapeak', type: 'integrates_with', year: 2019 },
        { target: 'best-match', type: 'integrates_with', year: 2019, desc: 'Competitive pricing improves Best Match rank' },
      ];
      break;

    case 'completed-listings':
      newRels = [
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
        { target: 'sold-listings', type: 'related_to', year: 2016 },
        { target: 'product-research', type: 'integrates_with', year: 2019, desc: 'Completed listing data feeds market research' },
        { target: 'terapeak', type: 'integrates_with', year: 2016 },
        { target: 'ended-listings', type: 'related_to', year: 2016 },
      ];
      break;

    case 'condition-description':
      newRels = [
        { target: 'listing', type: 'depends_on', year: 2011 },
        { target: 'item-condition', type: 'integrates_with', year: 2011, desc: 'Supplements the standard item condition dropdown' },
        { target: 'certified-refurbished', type: 'integrates_with', year: 2020 },
        { target: 'ebay-refurbished', type: 'integrates_with', year: 2020 },
      ];
      break;

    case 'condition-filter':
      newRels = [
        { target: 'search-filters', type: 'depends_on', year: 2008 },
        { target: 'item-condition', type: 'depends_on', year: 2008 },
        { target: 'certified-refurbished', type: 'integrates_with', year: 2020 },
        { target: 'ebay-refurbished', type: 'integrates_with', year: 2020 },
        { target: 'search', type: 'integrates_with', year: 2008 },
      ];
      break;

    case 'condition-new-sort':
      newRels = [
        { target: 'search', type: 'integrates_with', year: 2011 },
        { target: 'sort-by', type: 'depends_on', year: 2011 },
        { target: 'condition-filter', type: 'related_to', year: 2011 },
        { target: 'best-match-sort', type: 'related_to', year: 2011 },
      ];
      break;

    case 'console-venditori':
      newRels = [
        { target: 'seller-hub-multi-market', type: 'depends_on', year: 2016, desc: 'Italian localization of Seller Hub' },
        { target: 'seller-hub', type: 'related_to', year: 2016 },
        { target: 'ebay-italy', type: 'depends_on', year: 2016 },
        { target: 'hub-vendeur', type: 'related_to', year: 2016, desc: 'French equivalent (Hub vendeur) of same localized seller hub' },
        { target: 'verkaufer-cockpit-pro', type: 'related_to', year: 2016, desc: 'German equivalent seller hub localization' },
      ];
      break;

    case 'consommation-raisonnee':
      newRels = [
        { target: 'sustainability', type: 'depends_on', year: 2020 },
        { target: 'impact', type: 'depends_on', year: 2020 },
        { target: 'ebay-france', type: 'depends_on', year: 2020 },
        { target: 'circular-fashion-fund', type: 'related_to', year: 2021 },
        { target: 'pre-loved-partner-program', type: 'related_to', year: 2020 },
      ];
      break;

    case 'contact-seller':
      newRels = [
        { target: 'message-center', type: 'integrates_with', year: 2000 },
        { target: 'buyer-messages', type: 'related_to', year: 2008 },
        { target: 'ask-seller-question', type: 'related_to', year: 2005 },
        { target: 'buyer', type: 'related_to', year: 2000 },
        { target: 'seller-hub', type: 'integrates_with', year: 2015 },
        { target: 'ebay-ai-message-assistance', type: 'integrates_with', year: 2023 },
      ];
      break;

    case 'conversion-rate':
      newRels = [
        { target: 'listing-analytics', type: 'integrates_with', year: 2014 },
        { target: 'seller-hub', type: 'integrates_with', year: 2015 },
        { target: 'click-through-rate', type: 'related_to', year: 2014 },
        { target: 'bounce-rate', type: 'related_to', year: 2018 },
        { target: 'traffic-report', type: 'integrates_with', year: 2018 },
        { target: 'best-match', type: 'integrates_with', year: 2013, desc: 'Conversion rate is a Best Match ranking signal' },
        { target: 'promoted-listings', type: 'integrates_with', year: 2015 },
      ];
      break;

    case 'copy-to-inventory':
      newRels = [
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
        { target: 'inventory-management', type: 'integrates_with', year: 2016 },
        { target: 'listing-template', type: 'related_to', year: 2016 },
        { target: 'bulk-listing-tools', type: 'integrates_with', year: 2016 },
      ];
      break;

    case 'copyright':
      newRels = [
        { target: 'vero-program', type: 'depends_on', year: 2000, desc: 'VeRO Program is eBay\'s copyright enforcement mechanism' },
        { target: 'intellectual-property', type: 'related_to', year: 2000 },
        { target: 'trust', type: 'depends_on', year: 2000 },
        { target: 'counterfeit-detection', type: 'related_to', year: 2017 },
        { target: 'listing-removal-notice', type: 'integrates_with', year: 2005 },
      ];
      break;

    case 'cost-per-click':
      newRels = [
        { target: 'promoted-listings-advanced', type: 'depends_on', year: 2020, desc: 'CPC is the billing model for Promoted Listings Advanced' },
        { target: 'campaign-bidding', type: 'integrates_with', year: 2020 },
        { target: 'cost-per-sale', type: 'competes_with', year: 2020, desc: 'CPC vs CPS are two different ad billing models' },
        { target: 'promoted-listings-standard', type: 'related_to', year: 2020 },
        { target: 'advertising-dashboard', type: 'integrates_with', year: 2020 },
        { target: 'keyword-targeting', type: 'integrates_with', year: 2020 },
      ];
      break;

    case 'cost-per-sale':
      newRels = [
        { target: 'promoted-listings-standard', type: 'depends_on', year: 2019, desc: 'CPS is the billing model for Promoted Listings Standard' },
        { target: 'promoted-listings', type: 'depends_on', year: 2019 },
        { target: 'cost-per-click', type: 'competes_with', year: 2020 },
        { target: 'ad-fee', type: 'related_to', year: 2019 },
        { target: 'advertising-dashboard', type: 'integrates_with', year: 2019 },
      ];
      break;

    case 'counter-offer':
      newRels = [
        { target: 'best-offer', type: 'depends_on', year: 2006 },
        { target: 'counteroffer', type: 'related_to', year: 2006, desc: 'Counter Offer and Counteroffer are the same feature' },
        { target: 'decline-offer', type: 'related_to', year: 2006 },
        { target: 'accept-offer', type: 'related_to', year: 2006 },
        { target: 'seller-hub', type: 'integrates_with', year: 2015 },
      ];
      break;

    case 'counterfeit-detection':
      newRels = [
        { target: 'trust', type: 'depends_on', year: 2017 },
        { target: 'authenticity-guarantee', type: 'integrates_with', year: 2017, desc: 'AG program complemented by automated counterfeit detection' },
        { target: 'vero-program', type: 'integrates_with', year: 2017 },
        { target: 'listing-removal-notice', type: 'integrates_with', year: 2017 },
        { target: 'copyright', type: 'related_to', year: 2017 },
        { target: 'intellectual-property', type: 'related_to', year: 2017 },
      ];
      break;

    case 'counteroffer':
      newRels = [
        { target: 'best-offer', type: 'depends_on', year: 2005 },
        { target: 'counter-offer', type: 'related_to', year: 2006, desc: 'Counteroffer and Counter Offer are the same feature' },
        { target: 'decline-offer', type: 'related_to', year: 2005 },
        { target: 'accept-offer', type: 'related_to', year: 2005 },
        { target: 'seller-hub', type: 'integrates_with', year: 2015 },
      ];
      break;

    case 'coupons':
      newRels = [
        { target: 'promotions-manager', type: 'depends_on', year: 2014, desc: 'Coupons managed through Promotions Manager' },
        { target: 'discounts-manager', type: 'depends_on', year: 2020 },
        { target: 'coded-coupons', type: 'related_to', year: 2015 },
        { target: 'codeless-coupons', type: 'related_to', year: 2020 },
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
        { target: 'ebay-exclusive-coupons', type: 'related_to', year: 2018 },
      ];
      break;

    case 'credit-card':
      newRels = [
        { target: 'managed-payments', type: 'depends_on', year: 2019, desc: 'Credit card processing via Managed Payments' },
        { target: 'checkout', type: 'integrates_with', year: 2019 },
        { target: 'debit-card', type: 'related_to', year: 2019 },
        { target: 'apple-pay', type: 'related_to', year: 2018 },
        { target: 'google-pay', type: 'related_to', year: 2018 },
        { target: 'paypal', type: 'replaced_by', year: 2021, desc: 'Direct credit card replaced PayPal as primary payment' },
      ];
      break;

    case 'cross-border-trade':
      newRels = [
        { target: 'ebay-international-shipping', type: 'integrates_with', year: 2015 },
        { target: 'global-shipping-program', type: 'related_to', year: 2015 },
        { target: 'cbt-seller-dashboard', type: 'integrates_with', year: 2020 },
        { target: 'international-site-visibility', type: 'integrates_with', year: 2015 },
        { target: 'currency-conversion', type: 'integrates_with', year: 2015 },
        { target: 'international', type: 'depends_on', year: 2015 },
        { target: 'export-academy', type: 'integrates_with', year: 2018 },
      ];
      break;

    case 'csv-upload':
      newRels = [
        { target: 'bulk-listing-tools', type: 'depends_on', year: 2010 },
        { target: 'bulk-listing', type: 'integrates_with', year: 2010 },
        { target: 'seller-hub', type: 'integrates_with', year: 2015 },
        { target: 'file-exchange', type: 'related_to', year: 2010, desc: 'CSV Upload is a feature of File Exchange workflow' },
        { target: 'seller-hub-reports', type: 'integrates_with', year: 2017 },
      ];
      break;

    case 'curated-lists':
      newRels = [
        { target: 'hand-picked-collections', type: 'depends_on', year: 2019, desc: 'Curated Lists is alternate name for Hand-Picked Collections' },
        { target: 'discovery', type: 'related_to', year: 2019 },
        { target: 'collections', type: 'related_to', year: 2020 },
        { target: 'ebay-mobile-app', type: 'integrates_with', year: 2019 },
      ];
      break;

    case 'currency-conversion':
      newRels = [
        { target: 'managed-payments', type: 'integrates_with', year: 2019 },
        { target: 'cross-border-trade', type: 'integrates_with', year: 2008 },
        { target: 'checkout', type: 'integrates_with', year: 2008 },
        { target: 'ebay-international-shipping', type: 'integrates_with', year: 2015 },
        { target: 'managed-payments-multi-currency', type: 'integrates_with', year: 2021 },
        { target: 'managed-payments', type: 'depends_on', year: 2018, desc: 'Currency conversion automatically handled within managed payments' },
        { target: 'international', type: 'integrates_with', year: 2018, desc: 'Enables cross-border transactions by converting buyer and seller currencies' },
        { target: 'multi-currency-payout', type: 'integrates_with', year: 2021, desc: 'Works with multi-currency payout so sellers receive in preferred currency' },
        { target: 'ebay-international-shipping', type: 'related_to', year: 2018, desc: 'Cross-border shipping often paired with currency conversion' },
      ];
      break;

    case 'current-bid':
      newRels = [
        { target: 'auction-format', type: 'depends_on', year: 2000 },
        { target: 'bidding', type: 'depends_on', year: 2000 },
        { target: 'bid-increment', type: 'integrates_with', year: 2000 },
        { target: 'outbid-notification', type: 'integrates_with', year: 2005 },
        { target: 'automatic-bidding', type: 'integrates_with', year: 2000 },
      ];
      break;

    case 'custom-label':
      newRels = [
        { target: 'listing', type: 'integrates_with', year: 2015 },
        { target: 'seller-hub', type: 'integrates_with', year: 2015 },
        { target: 'inventory-management', type: 'integrates_with', year: 2015 },
        { target: 'seller-hub-reports', type: 'integrates_with', year: 2017, desc: 'Custom labels used for filtering in reports' },
      ];
      break;

    case 'custom-template':
      newRels = [
        { target: 'listing-template', type: 'depends_on', year: 2010 },
        { target: 'template-builder', type: 'depends_on', year: 2010 },
        { target: 'listing-designer', type: 'related_to', year: 2010 },
        { target: 'brand-identity', type: 'integrates_with', year: 2010 },
        { target: 'ebay-stores', type: 'integrates_with', year: 2010 },
      ];
      break;

    case 'cyber-monday':
      newRels = [
        { target: 'ebay-deals', type: 'depends_on', year: 2011 },
        { target: 'black-friday-deals', type: 'related_to', year: 2011 },
        { target: 'daily-deals', type: 'related_to', year: 2011 },
        { target: 'deals-seller-portal', type: 'integrates_with', year: 2018 },
        { target: 'promoted-listings', type: 'integrates_with', year: 2015 },
        { target: 'electronics-technology', type: 'related_to', year: 2011, desc: 'Cyber Monday focused on electronics' },
      ];
      break;

    case 'daily-deals':
      newRels = [
        { target: 'ebay-deals', type: 'depends_on', year: 2010 },
        { target: 'deals-seller-portal', type: 'integrates_with', year: 2018 },
        { target: 'black-friday-deals', type: 'related_to', year: 2010 },
        { target: 'cyber-monday', type: 'related_to', year: 2011 },
        { target: 'flash-deals', type: 'related_to', year: 2018 },
        { target: 'promoted-listings', type: 'integrates_with', year: 2015 },
      ];
      break;

    case 'daily-payout':
      newRels = [
        { target: 'managed-payments', type: 'depends_on', year: 2019, desc: 'Daily Payout is a cadence option in Managed Payments' },
        { target: 'weekly-payout', type: 'competes_with', year: 2019, desc: 'Two payout frequency options' },
        { target: 'payout-schedule', type: 'related_to', year: 2019 },
        { target: 'paypal', type: 'replaced_by', year: 2021, desc: 'Replaced PayPal instant access for sellers' },
        { target: 'express-payouts', type: 'related_to', year: 2020 },
      ];
      break;

    case 'deals-seller-portal':
      newRels = [
        { target: 'ebay-deals', type: 'depends_on', year: 2018 },
        { target: 'ebay-deals-global', type: 'depends_on', year: 2018 },
        { target: 'seller-hub', type: 'integrates_with', year: 2018 },
        { target: 'daily-deals', type: 'integrates_with', year: 2018 },
        { target: 'black-friday-deals', type: 'integrates_with', year: 2018 },
        { target: 'cyber-monday', type: 'integrates_with', year: 2018 },
      ];
      break;

    case 'debit-card':
      newRels = [
        { target: 'managed-payments', type: 'depends_on', year: 2019 },
        { target: 'credit-card', type: 'related_to', year: 2019 },
        { target: 'checkout', type: 'integrates_with', year: 2019 },
        { target: 'payment', type: 'depends_on', year: 2019 },
      ];
      break;

    case 'decline-offer':
      newRels = [
        { target: 'best-offer', type: 'depends_on', year: 2005 },
        { target: 'counter-offer', type: 'related_to', year: 2006 },
        { target: 'accept-offer', type: 'related_to', year: 2005 },
        { target: 'seller-hub', type: 'integrates_with', year: 2015 },
      ];
      break;

    case 'delivered':
      newRels = [
        { target: 'shipping', type: 'depends_on', year: 2006 },
        { target: 'package-tracking', type: 'integrates_with', year: 2006 },
        { target: 'delivery-status', type: 'related_to', year: 2017 },
        { target: 'order-updates', type: 'related_to', year: 2017 },
        { target: 'ebay-money-back-guarantee', type: 'integrates_with', year: 2006, desc: 'Delivery confirmation important for buyer protection cases' },
        { target: 'valid-tracking-rate', type: 'integrates_with', year: 2014 },
      ];
      break;

    case 'delivery-exception':
      newRels = [
        { target: 'shipping', type: 'depends_on', year: 2010 },
        { target: 'package-tracking', type: 'integrates_with', year: 2010 },
        { target: 'delivery-status', type: 'related_to', year: 2017 },
        { target: 'item-not-received', type: 'related_to', year: 2010, desc: 'Delivery exception can trigger item-not-received dispute' },
        { target: 'ebay-guaranteed-delivery', type: 'integrates_with', year: 2017 },
      ];
      break;

    case 'delivery-status':
      newRels = [
        { target: 'package-tracking', type: 'depends_on', year: 2017 },
        { target: 'delivered', type: 'related_to', year: 2017 },
        { target: 'delivery-updates', type: 'related_to', year: 2017, desc: 'Delivery Updates is alternate name' },
        { target: 'in-transit', type: 'related_to', year: 2017 },
        { target: 'order-updates', type: 'depends_on', year: 2017 },
        { target: 'push-notifications', type: 'integrates_with', year: 2017 },
      ];
      break;

    case 'delivery-updates':
      newRels = [
        { target: 'delivery-status', type: 'related_to', year: 2017, desc: 'Delivery Updates is alternate name for Delivery Status' },
        { target: 'package-tracking', type: 'depends_on', year: 2017 },
        { target: 'push-notifications', type: 'integrates_with', year: 2017 },
        { target: 'email-notifications', type: 'integrates_with', year: 2017 },
        { target: 'order-updates', type: 'depends_on', year: 2017 },
      ];
      break;

    case 'description-builder':
      newRels = [
        { target: 'listing', type: 'integrates_with', year: 2016 },
        { target: 'listing-designer', type: 'depends_on', year: 2016 },
        { target: 'ai-description-generator', type: 'related_to', year: 2023, desc: 'AI Description Generator is the AI-powered evolution' },
        { target: 'description-template', type: 'related_to', year: 2016 },
        { target: 'description-templates', type: 'related_to', year: 2016 },
      ];
      break;

    case 'description-template':
      newRels = [
        { target: 'listing-template', type: 'depends_on', year: 2005 },
        { target: 'description-templates', type: 'related_to', year: 2012 },
        { target: 'description-builder', type: 'related_to', year: 2016 },
        { target: 'custom-template', type: 'related_to', year: 2010 },
        { target: 'listing', type: 'integrates_with', year: 2005 },
      ];
      break;

    case 'description-templates':
      newRels = [
        { target: 'listing', type: 'integrates_with', year: 2012 },
        { target: 'description-template', type: 'related_to', year: 2012 },
        { target: 'seller-hub', type: 'integrates_with', year: 2015 },
        { target: 'description-builder', type: 'related_to', year: 2016 },
        { target: 'brand-identity', type: 'integrates_with', year: 2012 },
      ];
      break;

    case 'detailed-seller-ratings':
      newRels = [
        { target: 'feedback', type: 'depends_on', year: 2007 },
        { target: 'detailed-seller-ratings-multi-market', type: 'related_to', year: 2007 },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2008 },
        { target: 'top-rated-seller', type: 'integrates_with', year: 2007, desc: 'DSRs contribute to Top Rated Seller qualification' },
        { target: 'feedback-forum', type: 'integrates_with', year: 2007 },
        { target: 'positive-feedback-percentage', type: 'related_to', year: 2007 },
      ];
      break;

    case 'detailed-seller-ratings-multi-market':
      newRels = [
        { target: 'detailed-seller-ratings', type: 'related_to', year: 2007 },
        { target: 'feedback', type: 'depends_on', year: 2007 },
        { target: 'seller-performance-standards-multi-market', type: 'integrates_with', year: 2008 },
        { target: 'top-rated-seller-multi-market', type: 'integrates_with', year: 2007 },
      ];
      break;

    case 'developer-loyalty-program':
      newRels = [
        { target: 'ebay-developers-program', type: 'depends_on', year: 2019 },
        { target: 'ebay-partner-network', type: 'related_to', year: 2019 },
        { target: 'developer', type: 'depends_on', year: 2019 },
        { target: 'merchant-integration-platform', type: 'integrates_with', year: 2019 },
        { target: 'ebay-ambassador', type: 'related_to', year: 2019 },
        { target: 'developer-platform', type: 'integrates_with', year: 2024, desc: 'Tiered loyalty program for developers using eBay developer platform' },
        { target: 'api-sandbox', type: 'related_to', year: 2024, desc: 'Active sandbox usage contributes to tier qualification' },
        { target: 'developer', type: 'integrates_with', year: 2024, desc: 'Part of the developer umbrella offering tiered benefits' },
      ];
      break;

    case 'dhl-paket':
      newRels = [
        { target: 'shipping', type: 'depends_on', year: 2010 },
        { target: 'ebay-germany', type: 'depends_on', year: 2010 },
        { target: 'shipping-labels', type: 'integrates_with', year: 2010 },
        { target: 'package-tracking', type: 'integrates_with', year: 2010 },
        { target: 'calculated-shipping', type: 'integrates_with', year: 2010 },
        { target: 'hermes-paketshop', type: 'competes_with', year: 2010, desc: 'DHL and Hermes are the two main German parcel carriers' },
      ];
      break;

    case 'digest-notifications':
      newRels = [
        { target: 'mobile-notifications', type: 'depends_on', year: 2016 },
        { target: 'push-notifications', type: 'related_to', year: 2016 },
        { target: 'notification-preferences', type: 'integrates_with', year: 2016 },
        { target: 'email-notifications', type: 'related_to', year: 2016 },
        { target: 'ebay-mobile-app', type: 'depends_on', year: 2016 },
      ];
      break;

    case 'discounts-manager':
      newRels = [
        { target: 'promotions-manager', type: 'renamed_from', year: 2022, desc: 'Discounts Manager is the renamed/rebranded version of Promotions Manager' },
        { target: 'markdown-manager', type: 'renamed_from', year: 2018, desc: 'Markdown Manager was the earlier predecessor, renamed to Promotions Manager then Discounts Manager' },
        { target: 'seller-hub', type: 'integrates_with', year: 2018, desc: 'Accessible directly within Seller Hub marketing tab' },
        { target: 'ebay-stores', type: 'integrates_with', year: 2018, desc: 'Store subscribers get enhanced discount tools and more promotion slots' },
        { target: 'sale-events', type: 'integrates_with', year: 2018, desc: 'Sale Events is a core feature managed through Discounts Manager' },
        { target: 'coded-coupons', type: 'integrates_with', year: 2018, desc: 'Coded Coupons are created and managed within Discounts Manager' },
        { target: 'order-discounts', type: 'integrates_with', year: 2018, desc: 'Order Discounts (multi-buy) configured through Discounts Manager' },
        { target: 'shipping-discounts', type: 'integrates_with', year: 2018, desc: 'Shipping discount rules set up within Discounts Manager' },
        { target: 'volume-pricing', type: 'integrates_with', year: 2019, desc: 'Volume Pricing tiers configured through Discounts Manager' },
        { target: 'promoted-listings', type: 'related_to', year: 2019, desc: 'Both are seller marketing tools; often used together for listing visibility and conversion' },
        { target: 'best-offer', type: 'related_to', desc: 'Complementary tools for price negotiation vs. proactive discounting' },
        { target: 'seller-hub', type: 'depends_on', year: 2015, desc: 'Discounts Manager is a Seller Hub promotional tool suite' },
        { target: 'ebay-stores', type: 'depends_on', year: 2015, desc: 'Available exclusively to eBay Store subscribers' },
      ];
      break;

    case 'discounts-manager-multi-market':
      newRels = [
        { target: 'discounts-manager', type: 'related_to', desc: 'Multi-market variant of the same product; localized naming per region' },
        { target: 'promotions-manager', type: 'renamed_from', year: 2022 },
        { target: 'seller-hub', type: 'integrates_with', year: 2017 },
        { target: 'ebay-stores-multi-market', type: 'integrates_with', year: 2017, desc: 'Store subscribers across all markets get access to full promotions suite' },
        { target: 'sale-events', type: 'integrates_with' },
        { target: 'coded-coupons-multi-market', type: 'integrates_with' },
        { target: 'order-discounts-multi-market', type: 'integrates_with' },
        { target: 'shipping-discounts-multi-market', type: 'integrates_with' },
        { target: 'volume-pricing-multi-market', type: 'integrates_with' },
        { target: 'ebay-germany', type: 'related_to', desc: 'German market uses \'Verkaufsaktionen\' localized name' },
        { target: 'ebay-france', type: 'related_to', desc: 'French market uses \'Boosteur de ventes\' localized name' },
      ];
      break;

    case 'distance-nearest-first':
      newRels = [
        { target: 'local-pickup', type: 'integrates_with', year: 2008, desc: 'Distance sort is most useful for listings offering local pickup' },
        { target: 'best-match', type: 'related_to', desc: 'Distance sort is an alternative to Best Match algorithm for proximity-based discovery' },
        { target: 'filter-by', type: 'integrates_with', desc: 'Distance sort works in conjunction with search filter panel' },
        { target: 'ebay-guaranteed-delivery', type: 'related_to', desc: 'Both address delivery speed; distance sort helps find nearby items for faster receipt' },
        { target: 'search-filters', type: 'integrates_with' },
      ];
      break;

    case 'draft-listings':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2016, desc: 'Draft Listings are stored and managed within Seller Hub' },
        { target: 'drafts', type: 'related_to', desc: 'draft-listings and drafts are overlapping concepts; drafts is the broader term' },
        { target: 'quick-listing-tool', type: 'integrates_with', desc: 'Quick Listing Tool saves drafts for later completion' },
        { target: 'advanced-listing-tool', type: 'integrates_with', desc: 'Advanced Listing Tool supports draft saving mid-flow' },
        { target: 'bulk-listing-tool', type: 'integrates_with', desc: 'Bulk listing sessions can be saved as drafts' },
        { target: 'active-listings', type: 'related_to', desc: 'Draft listings transition to active listings upon publishing' },
        { target: 'schedule-listing', type: 'related_to', desc: 'Scheduled listings occupy similar pre-publish state to drafts' },
      ];
      break;

    case 'drafts':
      newRels = [
        { target: 'draft-listings', type: 'related_to', desc: 'Synonymous concepts; drafts is the broader platform term' },
        { target: 'seller-hub', type: 'depends_on', year: 2010 },
        { target: 'saved-drafts', type: 'related_to', desc: 'Saved Drafts is UI label for the same underlying feature' },
        { target: 'quick-listing-tool', type: 'integrates_with' },
        { target: 'advanced-listing-tool', type: 'integrates_with' },
        { target: 'ebay-selling-app', type: 'integrates_with', desc: 'Mobile app syncs drafts cross-device via server storage' },
      ];
      break;

    case 'duplicate-listing':
      newRels = [
        { target: 'sell-similar', type: 'related_to', desc: 'Sell Similar and Duplicate Listing serve the same core purpose; Sell Similar is the current preferred term' },
        { target: 'seller-hub', type: 'integrates_with' },
        { target: 'bulk-listing-tool', type: 'related_to', desc: 'Bulk listing tools can create multiple copies more efficiently' },
        { target: 'relist', type: 'related_to', desc: 'Relist is similar but for ended/sold items; duplicate is for active items' },
        { target: 'active-listings', type: 'integrates_with', desc: 'Duplicate action available from Active Listings view in Seller Hub' },
        { target: 'listing-template', type: 'competes_with', desc: 'Templates serve a similar purpose for replicating listing structures' },
      ];
      break;

    case 'ebay-academy':
      newRels = [
        { target: 'ebay-university', type: 'renamed_from', year: 2018, desc: 'eBay Academy replaced eBay University as the primary seller education platform' },
        { target: 'seller-hub', type: 'integrates_with', desc: 'Academy resources linked from Seller Hub dashboard' },
        { target: 'ebay-academy-multi-market', type: 'related_to', desc: 'Multi-market variant with localized content' },
        { target: 'seller-clinics', type: 'related_to', desc: 'Seller Clinics are live educational sessions complementing Academy courses' },
        { target: 'seller-community', type: 'related_to', desc: 'Community forums supplement Academy educational content' },
        { target: 'new-seller-journey', type: 'integrates_with', desc: 'New sellers are directed to Academy as part of onboarding' },
        { target: 'export-academy', type: 'related_to', desc: 'Export Academy is a specialized sub-program for cross-border sellers' },
        { target: 'ebay-community', type: 'related_to' },
        { target: 'seller-updates', type: 'related_to', desc: 'Seller Updates often reference Academy courses for deeper learning' },
      ];
      break;

    case 'ebay-academy-multi-market':
      newRels = [
        { target: 'ebay-academy', type: 'related_to', desc: 'Localized multi-market version of eBay Academy' },
        { target: 'ebay-university', type: 'renamed_from', year: 2018 },
        { target: 'seller-hub', type: 'integrates_with' },
        { target: 'export-academy', type: 'related_to' },
        { target: 'new-seller-journey', type: 'integrates_with' },
        { target: 'seller-clinics', type: 'related_to' },
      ];
      break;

    case 'ebay-ai-message-assistance':
      newRels = [
        { target: 'message-center', type: 'integrates_with', year: 2024, desc: 'AI message assistance surfaces within Message Center for sellers' },
        { target: 'seller-hub', type: 'integrates_with' },
        { target: 'ai-assistant-messaging', type: 'related_to', desc: 'AI Assistant for Messaging is the same or closely related feature' },
        { target: 'offers-in-messaging', type: 'integrates_with', desc: 'AI can suggest offers within messaging context' },
        { target: 'selling-with-ai', type: 'related_to', desc: 'Part of the broader eBay AI selling toolset' },
        { target: 'in-app-messaging', type: 'integrates_with' },
        { target: 'virtual-assistant', type: 'related_to', desc: 'Both are AI-driven communication tools on the platform' },
      ];
      break;

    case 'ebay-ambassador':
      newRels = [
        { target: 'ebay-community', type: 'integrates_with', year: 2018, desc: 'Ambassadors are community leaders in eBay\'s forums and events' },
        { target: 'seller-community', type: 'integrates_with' },
        { target: 'ebay-developers-program', type: 'related_to', desc: 'Some ambassadors focus on developer/API advocacy' },
        { target: 'ebay-partner-network', type: 'related_to', desc: 'Ambassadors may also participate in Partner Network' },
        { target: 'seller-clinics', type: 'related_to', desc: 'Ambassadors often lead or participate in seller clinic sessions' },
        { target: 'community-mentor-program', type: 'related_to', desc: 'Both programs recognize experienced community contributors' },
      ];
      break;

    case 'ebay-assured-fit':
      newRels = [
        { target: 'ebay-guaranteed-fit', type: 'related_to', year: 2024, desc: 'UK regional equivalent of eBay Guaranteed Fit (US program)' },
        { target: 'fitment-compatibility', type: 'depends_on', desc: 'Assured Fit relies on fitment compatibility data to guarantee part fit' },
        { target: 'fitment-plus', type: 'related_to' },
        { target: 'ebay-motors', type: 'integrates_with', desc: 'Program applies to automotive parts listings on eBay UK' },
        { target: 'ebay-motors-parts', type: 'integrates_with' },
        { target: 'parts-compatibility', type: 'depends_on' },
        { target: 'ebay-uk', type: 'related_to', desc: 'UK-specific program' },
      ];
      break;

    case 'ebay-australia':
      newRels = [
        { target: 'australia-post-express', type: 'integrates_with', year: 1999, desc: 'Australia Post is primary shipping carrier for eBay AU' },
        { target: 'ebay-plus', type: 'integrates_with', desc: 'eBay Plus membership available in Australia ($49/year)' },
        { target: 'click-and-collect', type: 'integrates_with', desc: 'Click & Collect available via Australia Post network' },
        { target: 'gst-collection-australia', type: 'integrates_with', year: 2018, desc: 'eBay AU required to collect GST on all transactions' },
        { target: 'collection-points-au', type: 'integrates_with' },
        { target: 'managed-payments', type: 'integrates_with' },
        { target: 'ebay-international-shipping', type: 'integrates_with' },
      ];
      break;

    case 'ebay-authenticate':
      newRels = [
        { target: 'authenticity-guarantee', type: 'renamed_to', year: 2020, desc: 'eBay Authenticate was rebranded as Authenticity Guarantee in 2020' },
        { target: 'authenticity-guarantee-handbags', type: 'related_to' },
        { target: 'authenticity-guarantee-sneakers', type: 'related_to' },
        { target: 'authenticity-guarantee-watches', type: 'related_to' },
        { target: 'ebay-vault', type: 'related_to', desc: 'Both serve high-value collectible authentication needs' },
        { target: 'trust-safety', type: 'related_to' },
        { target: 'vero-program', type: 'related_to', desc: 'Both protect authenticity on the platform' },
      ];
      break;

    case 'ebay-auto':
      newRels = [
        { target: 'ebay-motors', type: 'related_to', year: 2002, desc: 'eBay Auto is the French market brand equivalent of eBay Motors' },
        { target: 'ebay-france', type: 'integrates_with', desc: 'France-specific automotive vertical' },
        { target: 'fitment-compatibility', type: 'integrates_with' },
        { target: 'vehicle-history-report', type: 'integrates_with' },
        { target: 'vin-lookup', type: 'integrates_with' },
      ];
      break;

    case 'ebay-balance':
      newRels = [
        { target: 'managed-payments', type: 'integrates_with', year: 2019, desc: 'eBay Balance is a wallet within Managed Payments ecosystem' },
        { target: 'express-payouts', type: 'integrates_with', desc: 'Express Payouts release funds into eBay Balance' },
        { target: 'daily-payout', type: 'integrates_with' },
        { target: 'payout-schedule', type: 'integrates_with' },
        { target: 'payouts-on-demand', type: 'integrates_with' },
        { target: 'ebay-gift-cards', type: 'related_to', desc: 'Both are stored-value payment instruments on eBay' },
        { target: 'promotional-credit', type: 'related_to', desc: 'Promotional credits land in eBay Balance' },
      ];
      break;

    case 'ebay-bucks':
      newRels = [
        { target: 'ebay-mastercard', type: 'renamed_to', year: 2024, desc: 'eBay Bucks loyalty rewards ended April 2024, replaced by eBay Mastercard rewards program' },
        { target: 'buyer-programs', type: 'related_to' },
        { target: 'ebay-deals', type: 'related_to', desc: 'Bucks often earned and redeemed on deals/promotions' },
        { target: 'ebay-exclusive-coupons', type: 'related_to', desc: 'Both were buyer incentive mechanisms' },
        { target: 'ebay-plus', type: 'competes_with', desc: 'Both were buyer loyalty/reward programs targeting retention' },
        { target: 'ebay-mastercard', type: 'replaced_by', year: 2020, desc: 'eBay Bucks program evolved into/replaced by eBay Mastercard cash-back rewards' },
        { target: 'ebay-plus', type: 'related_to', desc: 'eBay Plus (DE/AU) is the non-US equivalent loyalty program' },
        { target: 'buyer-programs', type: 'depends_on', desc: 'US cashback loyalty program under buyer programs' },
        { target: 'buyer-programs', type: 'depends_on', desc: 'US loyalty cashback program under buyer programs umbrella' },
        { target: 'purchase-history', type: 'integrates_with', desc: 'eBay Bucks earned based on purchase history data' },
        { target: 'promotional-credit', type: 'related_to', desc: 'eBay Bucks functioned similarly to promotional credits' },
      ];
      break;

    case 'ebay-business-supply':
      newRels = [
        { target: 'business-industrial', type: 'related_to', year: 2016, desc: 'eBay Business Supply is the B2B-focused vertical within Business & Industrial' },
        { target: 'business-supply', type: 'related_to', desc: 'business-supply is the program node for same initiative' },
        { target: 'bulk-inventory-solution', type: 'integrates_with' },
        { target: 'seller-hub', type: 'integrates_with' },
        { target: 'cross-border-trade', type: 'related_to' },
      ];
      break;

    case 'ebay-buyer-guarantee':
      newRels = [
        { target: 'ebay-money-back-guarantee', type: 'related_to', desc: 'Regional variant of the core Money Back Guarantee program' },
        { target: 'money-back-guarantee', type: 'related_to' },
        { target: 'buyer-protection', type: 'related_to' },
        { target: 'purchase-protection', type: 'related_to' },
        { target: 'resolution-center-multi-market', type: 'integrates_with', desc: 'Disputes resolved via Resolution Center trigger guarantee' },
      ];
      break;

    case 'ebay-canada':
      newRels = [
        { target: 'canada-post-expedited', type: 'integrates_with', year: 2000, desc: 'Canada Post is primary shipping carrier for eBay CA' },
        { target: 'managed-payments', type: 'integrates_with' },
        { target: 'ebay-international-shipping', type: 'integrates_with', year: 2023, desc: 'Canadian sellers can use eBay International Shipping for US/global reach' },
        { target: 'cross-border-trade', type: 'integrates_with' },
        { target: 'ebay-stores-multi-market', type: 'integrates_with' },
      ];
      break;

    case 'ebay-collection-points':
      newRels = [
        { target: 'click-and-collect', type: 'integrates_with', year: 2016, desc: 'Collection Points are the physical network enabling Click & Collect' },
        { target: 'ebay-collection-points-uk', type: 'related_to', desc: 'UK-specific variant of Collection Points' },
        { target: 'ebay-uk', type: 'integrates_with', desc: 'UK-first feature via Collect+ network' },
        { target: 'local-pickup', type: 'related_to', desc: 'Both enable non-home delivery pickup options' },
        { target: 'simple-delivery-uk', type: 'integrates_with' },
      ];
      break;

    case 'ebay-collection-points-uk':
      newRels = [
        { target: 'ebay-collection-points', type: 'related_to' },
        { target: 'click-and-collect-multi-market', type: 'integrates_with', year: 2015 },
        { target: 'ebay-uk', type: 'integrates_with' },
        { target: 'simple-delivery-uk', type: 'integrates_with' },
        { target: 'local-pickup', type: 'related_to' },
      ];
      break;

    case 'ebay-community':
      newRels = [
        { target: 'ebay-community-multi-market', type: 'related_to', desc: 'Multi-market variant covering localized community forums' },
        { target: 'community-forums', type: 'integrates_with', year: 2000 },
        { target: 'seller-community', type: 'related_to' },
        { target: 'community-mentor-program', type: 'integrates_with' },
        { target: 'ebay-ambassador', type: 'integrates_with' },
        { target: 'ebay-academy', type: 'related_to' },
        { target: 'feedback-forum', type: 'integrates_with' },
      ];
      break;

    case 'ebay-community-multi-market':
      newRels = [
        { target: 'ebay-community', type: 'related_to', year: 1999 },
        { target: 'community-forums', type: 'integrates_with' },
        { target: 'seller-community', type: 'related_to' },
        { target: 'ebay-ambassador', type: 'integrates_with' },
        { target: 'community-mentor-program', type: 'integrates_with' },
        { target: 'ebay-germany', type: 'related_to', desc: 'German community is highly active' },
        { target: 'ebay-uk', type: 'related_to' },
      ];
      break;

    case 'ebay-concierge':
      newRels = [
        { target: 'account-management-plus', type: 'related_to', year: 2019, desc: 'Both offer premium seller support tiers' },
        { target: 'account-management-premium', type: 'related_to' },
        { target: 'seller-help', type: 'integrates_with' },
        { target: 'ebay-customer-service', type: 'integrates_with' },
        { target: 'top-rated-seller', type: 'related_to', desc: 'Concierge typically available to top-tier/high-volume sellers' },
        { target: 'ebay-stores-enterprise', type: 'related_to', desc: 'Enterprise store subscribers eligible for dedicated support' },
      ];
      break;

    case 'ebay-customer-service':
      newRels = [
        { target: 'help-center', type: 'integrates_with', year: 2000 },
        { target: 'resolution-center-multi-market', type: 'integrates_with' },
        { target: 'seller-help', type: 'integrates_with' },
        { target: 'virtual-assistant', type: 'integrates_with' },
        { target: 'live-chat-support', type: 'integrates_with' },
        { target: 'phone-support', type: 'integrates_with' },
        { target: 'ebay-concierge', type: 'related_to' },
        { target: 'ebay-money-back-guarantee', type: 'integrates_with', desc: 'CS handles MBG claims and escalations' },
      ];
      break;

    case 'ebay-deals':
      newRels = [
        { target: 'ebay-deals-global', type: 'related_to', year: 2012, desc: 'ebay-deals-global is the multi-market expansion of eBay Deals' },
        { target: 'daily-deals', type: 'related_to', desc: 'Daily Deals is the predecessor concept to the eBay Deals hub' },
        { target: 'flash-deals', type: 'integrates_with', desc: 'Flash Deals appear within the eBay Deals hub' },
        { target: 'featured-deals', type: 'integrates_with' },
        { target: 'deals-seller-portal', type: 'integrates_with', desc: 'Sellers submit deals through the Deals Seller Portal' },
        { target: 'black-friday-deals', type: 'related_to' },
        { target: 'discounts-manager', type: 'depends_on', desc: 'Deal promotions are funded by sellers using Discounts Manager' },
        { target: 'promoted-listings', type: 'related_to', desc: 'Promoted Listings can boost visibility within Deals pages' },
      ];
      break;

    case 'ebay-deals-global':
      newRels = [
        { target: 'ebay-deals', type: 'related_to', year: 2015 },
        { target: 'ebay-wow-de', type: 'related_to', desc: 'eBay WOW! is Germany-specific deals campaign under global umbrella' },
        { target: 'ebay-imperdibili-it', type: 'related_to', desc: 'Imperdibili is Italy-specific deals campaign' },
        { target: 'daily-deals', type: 'related_to' },
        { target: 'flash-deals', type: 'integrates_with' },
        { target: 'deals-seller-portal', type: 'integrates_with' },
        { target: 'black-friday-deals', type: 'related_to' },
        { target: 'bons-plans-fr', type: 'related_to', desc: 'Bons Plans is the French deals campaign' },
        { target: 'discounts-manager', type: 'depends_on' },
      ];
      break;

    case 'ebay-developers-program':
      newRels = [
        { target: 'merchant-integration-platform', type: 'integrates_with', year: 2000, desc: 'MIP is a core platform product for developer integrations' },
        { target: 'ebay-partner-network', type: 'related_to', desc: 'Affiliate/partner program complements developer program' },
        { target: 'ebay-ambassador', type: 'integrates_with' },
        { target: 'api-sandbox', type: 'integrates_with' },
        { target: 'api-explorer', type: 'integrates_with' },
        { target: 'notification-api', type: 'integrates_with' },
        { target: 'buy-marketing-api', type: 'integrates_with' },
        { target: 'developer-loyalty-program', type: 'integrates_with' },
        { target: 'third-party-providers', type: 'integrates_with' },
        { target: 'techstars-future-of-ecommerce', type: 'related_to' },
      ];
      break;

    case 'ebay-exclusive-coupons':
      newRels = [
        { target: 'coded-coupons', type: 'related_to', year: 2016, desc: 'eBay Exclusive Coupons are platform-issued vs. seller-created coded coupons' },
        { target: 'promotional-credit', type: 'related_to' },
        { target: 'ebay-deals', type: 'integrates_with', desc: 'Exclusive coupons often featured in Deals hub' },
        { target: 'discounts-manager', type: 'related_to' },
        { target: 'buyer-programs', type: 'related_to' },
        { target: 'ebay-bucks', type: 'related_to', desc: 'Both are buyer incentive/reward mechanisms' },
      ];
      break;

    case 'ebay-export':
      newRels = [
        { target: 'cross-border-trade', type: 'integrates_with', year: 2019 },
        { target: 'ebay-international-shipping', type: 'integrates_with' },
        { target: 'global-shipping-program', type: 'related_to', desc: 'GSP was the preceding international shipping solution' },
        { target: 'export-academy', type: 'integrates_with', desc: 'Export Academy provides training for sellers using eBay Export' },
        { target: 'customs-declaration-automation', type: 'integrates_with' },
        { target: 'international-site-visibility', type: 'integrates_with' },
      ];
      break;

    case 'ebay-for-charity':
      newRels = [
        { target: 'ebay-for-charity-multi-market', type: 'related_to', year: 2003, desc: 'Multi-market variant with localized charity partner integrations' },
        { target: 'ebay-foundation', type: 'related_to', desc: 'eBay Foundation supports charitable giving alongside eBay for Charity' },
        { target: 'global-give', type: 'related_to' },
        { target: 'aste-di-beneficenza', type: 'related_to', desc: 'Italian charitable auction program in same impact family' },
        { target: 'seller-hub', type: 'integrates_with', desc: 'Charity donation percentage set during listing creation via Seller Hub' },
        { target: 'listing-tools', type: 'integrates_with' },
        { target: 'consommation-raisonnee', type: 'related_to' },
      ];
      break;

    case 'ebay-for-charity-multi-market':
      newRels = [
        { target: 'ebay-for-charity', type: 'related_to', year: 2003 },
        { target: 'aste-di-beneficenza', type: 'related_to' },
        { target: 'ebay-foundation', type: 'related_to' },
        { target: 'global-give', type: 'related_to' },
        { target: 'seller-hub', type: 'integrates_with' },
      ];
      break;

    case 'ebay-france':
      newRels = [
        { target: 'ebay-auto', type: 'integrates_with', year: 2000, desc: 'eBay Auto is France\'s automotive vertical' },
        { target: 'bons-plans-fr', type: 'integrates_with', desc: 'Bons Plans is the France deals program' },
        { target: 'ebay-rachat', type: 'integrates_with', desc: 'eBay Rachat is France-specific trade-in program' },
        { target: 'managed-payments', type: 'integrates_with' },
        { target: 'vat-collection', type: 'integrates_with' },
        { target: 'eu-consumer-rights-directive', type: 'integrates_with' },
        { target: 'ebay-deals-global', type: 'integrates_with' },
      ];
      break;

    case 'ebay-fulfilment':
      newRels = [
        { target: 'managed-delivery', type: 'related_to', year: 2020, desc: 'eBay Managed Delivery/Fulfilment are the same concept in different markets' },
        { target: 'ebay-fulfilment-uk', type: 'related_to', desc: 'UK-specific variant of the fulfilment program' },
        { target: 'ebay-guaranteed-delivery', type: 'integrates_with', desc: 'Fulfilment enables guaranteed delivery promises' },
        { target: 'shipping-labels', type: 'integrates_with' },
        { target: 'seller-hub', type: 'integrates_with' },
        { target: 'inventory-management', type: 'integrates_with' },
        { target: 'logistica-ebay-by-orange-connex', type: 'related_to', desc: 'Orange Connex partnership powers Italian/Spanish fulfilment' },
        { target: 'order-management', type: 'integrates_with' },
      ];
      break;

    case 'ebay-fulfilment-uk':
      newRels = [
        { target: 'ebay-fulfilment', type: 'related_to', year: 2019 },
        { target: 'managed-delivery', type: 'related_to' },
        { target: 'ebay-uk', type: 'integrates_with' },
        { target: 'ebay-guaranteed-delivery', type: 'integrates_with' },
        { target: 'simple-delivery-uk', type: 'integrates_with' },
        { target: 'shipping-labels', type: 'integrates_with' },
      ];
      break;

    case 'ebay-germany':
      newRels = [
        { target: 'ebay-wow-de', type: 'integrates_with', year: 1999, desc: 'eBay WOW! is Germany\'s flagship deals program' },
        { target: 'ebay-plus', type: 'integrates_with', desc: 'eBay Plus launched in Germany (€19.90/year)' },
        { target: 'ebay-top-service-de', type: 'integrates_with', desc: 'Top-Service is Germany\'s premium seller badge' },
        { target: 'ebay-speedpak', type: 'integrates_with', desc: 'SpeedPAK shipping program active in Germany' },
        { target: 'dhl-paket', type: 'integrates_with', desc: 'DHL Paket is primary shipping carrier in Germany' },
        { target: 'hermes-paketshop', type: 'integrates_with' },
        { target: 'managed-payments', type: 'integrates_with' },
        { target: 'vat-collection', type: 'integrates_with' },
        { target: 'eu-consumer-rights-directive', type: 'integrates_with' },
      ];
      break;

    case 'ebay-gift-cards':
      newRels = [
        { target: 'checkout', type: 'integrates_with', year: 2008, desc: 'Gift cards redeemable at checkout' },
        { target: 'ebay-balance', type: 'related_to', desc: 'Both are stored-value payment instruments' },
        { target: 'managed-payments', type: 'integrates_with' },
        { target: 'promotional-credit', type: 'related_to' },
        { target: 'buyer-programs', type: 'related_to' },
      ];
      break;

    case 'ebay-guaranteed-delivery':
      newRels = [
        { target: 'guaranteed-delivery', type: 'related_to', year: 2018, desc: 'Same program; guaranteed-delivery is the canonical node' },
        { target: 'fast-and-free', type: 'integrates_with', desc: 'Fast and Free badge works alongside Guaranteed Delivery promise' },
        { target: 'fast-n-free', type: 'related_to' },
        { target: 'free-2-day-shipping', type: 'integrates_with' },
        { target: 'ebay-fulfilment', type: 'integrates_with', desc: 'Fulfilment service enables sellers to meet guaranteed delivery windows' },
        { target: 'handling-time', type: 'depends_on', desc: 'Handling time is critical input for guaranteed delivery date calculation' },
        { target: 'estimated-delivery', type: 'integrates_with' },
        { target: 'top-rated-plus', type: 'related_to', desc: 'TRS+ sellers with fast handling are primary participants' },
        { target: 'ebay-plus', type: 'related_to', desc: 'eBay Plus members expect fast guaranteed delivery' },
        { target: 'seller-performance-standards', type: 'depends_on', desc: 'Late shipment rate affects guaranteed delivery eligibility' },
      ];
      break;

    case 'ebay-guaranteed-fit':
      newRels = [
        { target: 'ebay-assured-fit', type: 'related_to', year: 2023, desc: 'eBay Assured Fit is the UK equivalent of Guaranteed Fit' },
        { target: 'fitment-compatibility', type: 'depends_on', desc: 'Guaranteed Fit relies on fitment compatibility database' },
        { target: 'fitment-plus', type: 'integrates_with' },
        { target: 'fitment-plus-auto', type: 'integrates_with', year: 2025 },
        { target: 'ebay-motors', type: 'integrates_with' },
        { target: 'ebay-motors-parts', type: 'integrates_with' },
        { target: 'parts-compatibility', type: 'depends_on' },
        { target: 'my-garage', type: 'integrates_with', desc: 'My Garage stores vehicle data used for guaranteed fit verification' },
        { target: 'vin-lookup', type: 'integrates_with' },
      ];
      break;

    case 'ebay-imperdibili':
      newRels = [
        { target: 'ebay-imperdibili-it', type: 'related_to', year: 2012, desc: 'ebay-imperdibili-it is the campaign variant; both represent Italy\'s deals program' },
        { target: 'ebay-italy', type: 'integrates_with' },
        { target: 'ebay-deals-global', type: 'related_to' },
        { target: 'daily-deals', type: 'related_to' },
        { target: 'flash-deals', type: 'related_to' },
        { target: 'deals-seller-portal', type: 'integrates_with' },
      ];
      break;

    case 'ebay-imperdibili-it':
      newRels = [
        { target: 'ebay-imperdibili', type: 'related_to', year: 2014 },
        { target: 'ebay-deals-global', type: 'related_to' },
        { target: 'ebay-italy', type: 'integrates_with' },
        { target: 'flash-deals', type: 'related_to' },
        { target: 'daily-deals', type: 'related_to' },
      ];
      break;

    case 'ebay-international-shipping':
      newRels = [
        { target: 'global-shipping-program', type: 'renamed_from', year: 2023, desc: 'eBay International Shipping replaced Global Shipping Program in July 2023' },
        { target: 'ebay-international-standard-delivery', type: 'replaces', year: 2023 },
        { target: 'cross-border-trade', type: 'integrates_with' },
        { target: 'customs-declaration-automation', type: 'integrates_with' },
        { target: 'import-charges', type: 'integrates_with' },
        { target: 'ebay-export', type: 'integrates_with' },
        { target: 'shipping-labels', type: 'integrates_with' },
        { target: 'ebay-canada', type: 'integrates_with', desc: 'Canadian sellers also eligible for eBay International Shipping' },
        { target: 'global-shipping-toggle', type: 'related_to' },
        { target: 'expedited-international-shipping', type: 'related_to' },
        { target: 'seller-hub', type: 'integrates_with' },
      ];
      break;

    case 'ebay-international-standard-delivery':
      newRels = [
        { target: 'ebay-international-shipping', type: 'replaced_by', year: 2023 },
        { target: 'global-shipping-program', type: 'related_to' },
        { target: 'cross-border-trade', type: 'related_to' },
        { target: 'international-standard-delivery', type: 'related_to' },
      ];
      break;

    case 'ebay-italy':
      newRels = [
        { target: 'ebay-imperdibili', type: 'integrates_with', year: 2001 },
        { target: 'ebay-imperdibili-it', type: 'integrates_with' },
        { target: 'logistica-ebay-by-orange-connex', type: 'integrates_with' },
        { target: 'managed-payments', type: 'integrates_with' },
        { target: 'vat-collection', type: 'integrates_with' },
        { target: 'eu-consumer-rights-directive', type: 'integrates_with' },
        { target: 'aste-di-beneficenza', type: 'integrates_with' },
      ];
      break;

    case 'ebay-live':
      newRels = [
        { target: 'auction-format', type: 'related_to', year: 2022, desc: 'eBay Live incorporates real-time bidding similar to auction format' },
        { target: 'best-offer', type: 'integrates_with', desc: 'Sellers can accept offers during live events' },
        { target: 'ebay-mobile-app', type: 'integrates_with', desc: 'eBay Live streams consumed primarily via mobile app' },
        { target: 'seller-hub', type: 'integrates_with' },
        { target: 'authenticity-guarantee', type: 'related_to', desc: 'High-value items sold on eBay Live often require authentication' },
        { target: 'promoted-listings', type: 'related_to', desc: 'Live events can be promoted via advertising tools' },
        { target: 'collectibles-trading', type: 'related_to', desc: 'Collectibles is primary category for eBay Live' },
        { target: 'trading-card-hub', type: 'integrates_with' },
        { target: 'ebay-vault', type: 'related_to' },
        { target: 'comc', type: 'related_to' },
      ];
      break;

    case 'ebay-mastercard':
      newRels = [
        { target: 'ebay-bucks', type: 'renamed_from', year: 2024, desc: 'eBay Mastercard rewards replaced the eBay Bucks loyalty program' },
        { target: 'managed-payments', type: 'integrates_with' },
        { target: 'checkout', type: 'integrates_with' },
        { target: 'buyer-programs', type: 'related_to' },
        { target: 'ebay-balance', type: 'related_to' },
        { target: 'payments', type: 'related_to', year: 2020, desc: 'Co-branded rewards credit card linked to eBay platform payments' },
        { target: 'managed-payments', type: 'related_to', year: 2020, desc: 'Card rewards redeemable as eBay gift cards usable in checkout' },
        { target: 'checkout', type: 'related_to', year: 2020, desc: 'Gift card rewards applied at eBay checkout' },
      ];
      break;

    case 'ebay-mobile-app':
      newRels = [
        { target: 'ebay-selling-app', type: 'related_to', year: 2008, desc: 'eBay Selling App is a focused seller-centric version; Mobile App covers full buyer+seller experience' },
        { target: 'ebay-mobile-app-android', type: 'related_to', desc: 'Android-specific release of eBay Mobile App' },
        { target: 'barcode-scanner', type: 'integrates_with' },
        { target: 'image-search', type: 'integrates_with' },
        { target: 'push-notifications', type: 'integrates_with' },
        { target: 'feed', type: 'integrates_with' },
        { target: 'in-app-messaging', type: 'integrates_with' },
        { target: 'mobile-checkout', type: 'integrates_with' },
        { target: 'magical-listing', type: 'integrates_with' },
        { target: 'ai-snap', type: 'integrates_with' },
        { target: 'mobile-quick-list', type: 'integrates_with' },
        { target: 'watchlist', type: 'integrates_with' },
      ];
      break;

    case 'ebay-motors-parts':
      newRels = [
        { target: 'ebay-motors', type: 'related_to', year: 2000 },
        { target: 'fitment-compatibility', type: 'depends_on' },
        { target: 'parts-compatibility', type: 'depends_on' },
        { target: 'ebay-guaranteed-fit', type: 'integrates_with' },
        { target: 'my-garage', type: 'integrates_with' },
        { target: 'shop-by-diagram', type: 'integrates_with' },
        { target: 'vin-lookup', type: 'integrates_with' },
      ];
      break;

    case 'ebay-partner-network':
      newRels = [
        { target: 'ebay-developers-program', type: 'related_to', year: 2008 },
        { target: 'buy-marketing-api', type: 'depends_on', desc: 'Partner Network uses Buy APIs to power affiliate tracking' },
        { target: 'ebay-ambassador', type: 'related_to' },
        { target: 'third-party-providers', type: 'related_to' },
      ];
      break;

    case 'ebay-picture-services':
      newRels = [
        { target: 'photo-uploader', type: 'replaced_by', year: 2019, desc: 'Self-hosted uploads replaced eBay Picture Services hosting' },
        { target: 'gallery-picture', type: 'related_to' },
        { target: 'gallery-plus', type: 'related_to' },
        { target: 'self-hosted-images', type: 'replaced_by' },
        { target: 'listing-designer', type: 'related_to' },
      ];
      break;

    case 'ebay-plus':
      newRels = [
        { target: 'ebay-plus-membership', type: 'related_to', year: 2017, desc: 'Same program; ebay-plus-membership is the member-facing name' },
        { target: 'ebay-plus-multi-market', type: 'related_to', desc: 'Multi-market variant with expanded detail' },
        { target: 'ebay-germany', type: 'integrates_with', desc: 'eBay Plus launched in Germany first' },
        { target: 'ebay-australia', type: 'integrates_with', desc: 'eBay Plus expanded to Australia in 2018' },
        { target: 'ebay-top-service', type: 'related_to', desc: 'eBay Top-Service launched after eBay Plus in Germany, related seller-quality program' },
        { target: 'free-shipping', type: 'integrates_with', desc: 'eBay Plus includes free shipping benefits' },
        { target: 'free-returns', type: 'integrates_with', desc: 'eBay Plus includes free returns' },
        { target: 'ebay-guaranteed-delivery', type: 'integrates_with' },
        { target: 'seller-performance-standards', type: 'depends_on', desc: 'Sellers must meet performance standards to participate in eBay Plus' },
        { target: 'shipping', type: 'integrates_with', year: 2020, desc: 'eBay Plus membership delivers free express delivery on qualifying items' },
        { target: 'discovery-buyer-experience', type: 'integrates_with', year: 2020, desc: 'Plus badge on listings improves discovery and click-through for enrolled items' },
        { target: 'ebay-stores', type: 'related_to', year: 2020, desc: 'Sellers with eBay Stores encouraged to offer Plus-eligible shipping' },
        { target: 'seller-programs', type: 'integrates_with', year: 2020, desc: 'Sellers opt in to eBay Plus program to offer qualifying delivery' },
      ];
      break;

    case 'ebay-plus-membership':
      newRels = [
        { target: 'ebay-plus', type: 'related_to', year: 2017 },
        { target: 'ebay-plus-multi-market', type: 'related_to' },
        { target: 'free-shipping', type: 'integrates_with' },
        { target: 'free-returns', type: 'integrates_with' },
        { target: 'ebay-guaranteed-delivery', type: 'integrates_with' },
        { target: 'ebay-bucks', type: 'competes_with', desc: 'Both were buyer loyalty programs in different markets' },
      ];
      break;

    case 'ebay-plus-multi-market':
      newRels = [
        { target: 'ebay-plus', type: 'related_to', year: 2017 },
        { target: 'ebay-plus-membership', type: 'related_to' },
        { target: 'ebay-germany', type: 'integrates_with' },
        { target: 'ebay-australia', type: 'integrates_with' },
        { target: 'seller-performance-standards', type: 'depends_on' },
        { target: 'free-shipping', type: 'integrates_with' },
        { target: 'free-returns', type: 'integrates_with' },
      ];
      break;

    case 'ebay-premium-service':
      newRels = [
        { target: 'top-rated-plus', type: 'related_to', year: 2023, desc: 'eBay Premium Service is UK rebrand of Top Rated Plus badge concept' },
        { target: 'ebay-premium-service-uk', type: 'related_to', desc: 'Detailed UK-specific variant' },
        { target: 'ebay-top-service', type: 'related_to', desc: 'German equivalent program' },
        { target: 'top-rated-seller', type: 'related_to' },
        { target: 'seller-performance-standards', type: 'depends_on' },
        { target: 'ebay-uk', type: 'integrates_with' },
      ];
      break;

    case 'ebay-premium-service-uk':
      newRels = [
        { target: 'ebay-premium-service', type: 'related_to', year: 2013 },
        { target: 'top-rated-plus-badge', type: 'related_to', desc: 'UK branding for Top Rated Plus badge' },
        { target: 'ebay-top-service-de', type: 'related_to', desc: 'German equivalent' },
        { target: 'seller-performance-standards', type: 'depends_on' },
        { target: 'ebay-uk', type: 'integrates_with' },
        { target: 'free-returns', type: 'depends_on', desc: '30-day returns required for Premium Service badge' },
        { target: 'handling-time', type: 'depends_on', desc: '1-day dispatch required' },
      ];
      break;

    case 'ebay-premium-services':
      newRels = [
        { target: 'ebay-premium-service', type: 'related_to', year: 2018 },
        { target: 'top-rated-plus', type: 'related_to' },
        { target: 'ebay-money-back-guarantee', type: 'integrates_with' },
        { target: 'authenticity-guarantee', type: 'related_to' },
        { target: 'buyer-protection', type: 'related_to' },
      ];
      break;

    case 'ebay-rachat':
      newRels = [
        { target: 'ebay-france', type: 'integrates_with', year: 2021 },
        { target: 'trade-in-uk', type: 'related_to', desc: 'UK equivalent trade-in program' },
        { target: 'ebay-refurbished', type: 'related_to', desc: 'Trade-in items feed refurbished inventory pipeline' },
        { target: 'sustainability', type: 'related_to' },
        { target: 'circular-fashion-fund', type: 'related_to' },
      ];
      break;

    case 'ebay-radio':
      newRels = [
        { target: 'ebay-academy', type: 'related_to', year: 2006, desc: 'eBay Radio was predecessor education/community channel before Academy replaced it' },
        { target: 'seller-community', type: 'related_to' },
        { target: 'seller-updates', type: 'related_to' },
        { target: 'seller-news', type: 'related_to' },
      ];
      break;

    case 'ebay-refurbished':
      newRels = [
        { target: 'certified-refurbished', type: 'integrates_with', year: 2020, desc: 'Certified Refurbished is the highest tier within eBay Refurbished program' },
        { target: 'excellent-refurbished', type: 'integrates_with' },
        { target: 'very-good-refurbished', type: 'integrates_with' },
        { target: 'good-refurbished', type: 'integrates_with' },
        { target: 'ebay-refurbished-warranty', type: 'integrates_with' },
        { target: 'seller-refurbished', type: 'related_to', desc: 'Seller Refurbished is non-program refurbished condition below eBay Refurbished' },
        { target: 'certified-by-brand', type: 'related_to', desc: 'Certified by Brand is a premium variant within the refurbished ecosystem' },
        { target: 'open-box', type: 'related_to' },
        { target: 'refurbished-open-box', type: 'related_to' },
        { target: 'ebay-rachat', type: 'related_to', desc: 'Trade-in items feed refurbished pipeline' },
        { target: 'trade-in-uk', type: 'related_to' },
      ];
      break;

    case 'ebay-refurbished-warranty':
      newRels = [
        { target: 'ebay-refurbished', type: 'integrates_with', year: 2020 },
        { target: 'certified-refurbished', type: 'integrates_with' },
        { target: 'excellent-refurbished', type: 'integrates_with' },
        { target: 'buyer-protection', type: 'related_to' },
        { target: 'ebay-money-back-guarantee', type: 'related_to' },
        { target: 'assured-fit', type: 'related_to' },
      ];
      break;

    case 'ebay-selling-app':
      newRels = [
        { target: 'ebay-mobile-app', type: 'related_to', year: 2020, desc: 'Selling App is seller-focused; Mobile App covers full buyer+seller' },
        { target: 'magical-listing', type: 'integrates_with' },
        { target: 'barcode-scanner', type: 'integrates_with' },
        { target: 'ai-snap', type: 'integrates_with' },
        { target: 'photo-enhancement', type: 'integrates_with' },
        { target: 'seller-hub', type: 'integrates_with' },
        { target: 'draft-listings', type: 'integrates_with' },
        { target: 'quick-listing-tool', type: 'integrates_with' },
      ];
      break;

    case 'ebay-spain':
      newRels = [
        { target: 'managed-payments', type: 'integrates_with', year: 2001 },
        { target: 'vat-collection', type: 'integrates_with' },
        { target: 'eu-consumer-rights-directive', type: 'integrates_with' },
        { target: 'logistica-ebay-by-orange-connex', type: 'integrates_with', desc: 'Orange Connex powers Spanish fulfilment' },
        { target: 'ebay-deals-global', type: 'integrates_with' },
      ];
      break;

    case 'ebay-speedpak':
      newRels = [
        { target: 'ebay-germany', type: 'integrates_with', year: 2026 },
        { target: 'shipping-labels', type: 'integrates_with' },
        { target: 'ebay-international-shipping', type: 'related_to' },
        { target: 'dhl-paket', type: 'related_to', desc: 'SpeedPAK competes with standard DHL Paket for German shipments' },
      ];
      break;

    case 'ebay-standard-envelope':
      newRels = [
        { target: 'shipping-labels', type: 'integrates_with', year: 2021 },
        { target: 'trading-card-hub', type: 'integrates_with', desc: 'Standard Envelope designed primarily for trading card shipments' },
        { target: 'ebay-vault', type: 'related_to' },
        { target: 'flat-rate-shipping', type: 'related_to' },
        { target: 'psa-grading-integration', type: 'related_to' },
      ];
      break;

    case 'ebay-stores-basic':
      newRels = [
        { target: 'ebay-stores', type: 'related_to', year: 2001 },
        { target: 'ebay-stores-multi-market', type: 'related_to' },
        { target: 'store-tier-starter', type: 'renamed_to', year: 2021, desc: 'Basic tier renamed to Starter in 2021' },
      ];
      break;

    case 'ebay-stores-enterprise':
      newRels = [
        { target: 'ebay-stores', type: 'related_to', year: 2015 },
        { target: 'ebay-stores-premium', type: 'related_to' },
        { target: 'store-tier-enterprise', type: 'related_to' },
        { target: 'account-management-premium', type: 'integrates_with', desc: 'Enterprise subscribers eligible for Account Management Premium' },
        { target: 'ebay-concierge', type: 'integrates_with' },
      ];
      break;

    case 'ebay-stores-multi-market':
      newRels = [
        { target: 'ebay-stores', type: 'related_to', year: 2001 },
        { target: 'discounts-manager-multi-market', type: 'integrates_with' },
        { target: 'promoted-stores-multi-market', type: 'integrates_with' },
        { target: 'seller-hub', type: 'integrates_with' },
        { target: 'store-email-campaigns', type: 'integrates_with' },
        { target: 'store-newsletters-multi-market', type: 'integrates_with' },
        { target: 'ebay-germany', type: 'related_to' },
        { target: 'ebay-uk', type: 'related_to' },
      ];
      break;

    case 'ebay-stores-premium':
      newRels = [
        { target: 'ebay-stores', type: 'related_to', year: 2001 },
        { target: 'ebay-stores-enterprise', type: 'related_to' },
        { target: 'store-tier-premium', type: 'related_to' },
        { target: 'markdown-manager', type: 'integrates_with' },
        { target: 'discounts-manager', type: 'integrates_with' },
      ];
      break;

    case 'ebay-top-service':
      newRels = [
        { target: 'ebay-top-service-de', type: 'related_to', year: 2024, desc: 'ebay-top-service-de is the historical/detailed version of same program' },
        { target: 'top-rated-plus', type: 'related_to', desc: 'German-market evolution of Top Rated Plus concept' },
        { target: 'ebay-plus', type: 'related_to', desc: 'Replaced eBay Plus seller badge requirements in Germany' },
        { target: 'ebay-germany', type: 'integrates_with' },
        { target: 'seller-performance-standards', type: 'depends_on' },
        { target: 'top-rated-seller', type: 'related_to' },
      ];
      break;

    case 'ebay-top-service-de':
      newRels = [
        { target: 'ebay-top-service', type: 'related_to', year: 2013 },
        { target: 'top-rated-plus-badge', type: 'related_to' },
        { target: 'ebay-germany', type: 'integrates_with' },
        { target: 'seller-performance-standards', type: 'depends_on' },
        { target: 'handling-time', type: 'depends_on' },
        { target: 'free-returns', type: 'depends_on' },
      ];
      break;

    case 'ebay-uk':
      newRels = [
        { target: 'ebay-premium-service-uk', type: 'integrates_with', year: 1999 },
        { target: 'ebay-collection-points-uk', type: 'integrates_with' },
        { target: 'ebay-fulfilment-uk', type: 'integrates_with' },
        { target: 'simple-delivery-uk', type: 'integrates_with' },
        { target: 'royal-mail-tracked-24', type: 'integrates_with' },
        { target: 'managed-payments', type: 'integrates_with' },
        { target: 'vat-collection', type: 'integrates_with' },
        { target: 'eu-consumer-rights-directive', type: 'integrates_with' },
        { target: 'click-and-collect', type: 'integrates_with' },
        { target: 'ebay-balance', type: 'integrates_with' },
      ];
      break;

    case 'ebay-university':
      newRels = [
        { target: 'ebay-academy', type: 'renamed_to', year: 2018, desc: 'eBay University was rebranded as eBay Academy' },
        { target: 'ebay-academy-multi-market', type: 'renamed_to', year: 2018 },
        { target: 'seller-community', type: 'related_to' },
        { target: 'seller-clinics', type: 'related_to' },
      ];
      break;

    case 'ebay-valet-original':
      newRels = [
        { target: 'ebay-valet', type: 'related_to', year: 2014, desc: 'ebay-valet is the product node; ebay-valet-original is the legacy program' },
        { target: 'ebay-consignment', type: 'replaced_by', year: 2023, desc: 'eBay Consignment relaunched valet-style service for luxury goods' },
        { target: 'seller-hub', type: 'related_to' },
      ];
      break;

    case 'ebay-vault':
      newRels = [
        { target: 'authenticity-guarantee', type: 'integrates_with', year: 2022, desc: 'Items stored in Vault undergo authentication process' },
        { target: 'authenticity-guarantee-trading-cards', type: 'integrates_with' },
        { target: 'trading-card-hub', type: 'integrates_with' },
        { target: 'psa-grading-integration', type: 'integrates_with' },
        { target: 'wata-grading', type: 'integrates_with' },
        { target: 'ebay-live', type: 'related_to', desc: 'Vault-stored items can be sold via eBay Live' },
        { target: 'my-collection', type: 'integrates_with', desc: 'Vault items visible in My Collection portfolio' },
        { target: 'collectibles-trading', type: 'related_to' },
        { target: 'comc', type: 'related_to' },
      ];
      break;

    case 'ebay-wow':
      newRels = [
        { target: 'ebay-wow-de', type: 'related_to', year: 2009, desc: 'ebay-wow-de is the campaign/detailed variant of eBay WOW!' },
        { target: 'ebay-germany', type: 'integrates_with' },
        { target: 'ebay-deals-global', type: 'related_to' },
        { target: 'flash-deals', type: 'related_to' },
        { target: 'daily-deals', type: 'related_to' },
        { target: 'deals-seller-portal', type: 'integrates_with' },
      ];
      break;

    case 'ebay-wow-de':
      newRels = [
        { target: 'ebay-wow', type: 'related_to', year: 2012 },
        { target: 'ebay-deals-global', type: 'related_to' },
        { target: 'ebay-germany', type: 'integrates_with' },
        { target: 'flash-deals', type: 'related_to' },
        { target: 'daily-deals', type: 'related_to' },
      ];
      break;

    case 'edit-listing':
      newRels = [
        { target: 'seller-hub', type: 'integrates_with', year: 2000 },
        { target: 'active-listings', type: 'integrates_with' },
        { target: 'revise-listing', type: 'related_to', desc: 'Revise Listing is the same action via another entry point' },
        { target: 'bulk-edit', type: 'related_to', desc: 'Bulk Edit enables editing multiple listings simultaneously' },
        { target: 'listing-quality-report', type: 'integrates_with', desc: 'Quality Report recommendations prompt listing edits' },
      ];
      break;

    case 'edit-payment':
      newRels = [
        { target: 'checkout', type: 'integrates_with', year: 2013 },
        { target: 'managed-payments', type: 'integrates_with' },
        { target: 'saved-payment-methods', type: 'integrates_with' },
        { target: 'add-payment-method', type: 'related_to' },
      ];
      break;

    case 'email-alerts':
      newRels = [
        { target: 'email-notifications', type: 'related_to', year: 2001, desc: 'Email Alerts is alternative naming for Email Notifications for urgent items' },
        { target: 'push-notifications', type: 'related_to', desc: 'Push notifications are the mobile equivalent' },
        { target: 'sms-alerts', type: 'related_to' },
        { target: 'notification-preferences', type: 'integrates_with' },
        { target: 'outbid-alert', type: 'related_to' },
        { target: 'price-alert', type: 'related_to' },
      ];
      break;

    case 'email-notifications':
      newRels = [
        { target: 'email-alerts', type: 'related_to', year: 1995 },
        { target: 'push-notifications', type: 'related_to' },
        { target: 'sms-notifications', type: 'related_to' },
        { target: 'notification-preferences', type: 'integrates_with' },
        { target: 'communication-preferences', type: 'integrates_with' },
        { target: 'digest-notifications', type: 'related_to' },
        { target: 'outbid-notification', type: 'integrates_with' },
        { target: 'selling-activity-notifications', type: 'integrates_with' },
      ];
      break;

    case 'email-to-friend':
      newRels = [
        { target: 'share-listing', type: 'replaced_by', desc: 'Share Listing replaced Email to Friend as primary sharing mechanism' },
        { target: 'share-this-item', type: 'replaced_by' },
      ];
      break;

    case 'end-listing':
      newRels = [
        { target: 'end-listing-early', type: 'related_to', year: 2000, desc: 'end-listing-early is the auction-specific variant with additional considerations' },
        { target: 'seller-hub', type: 'integrates_with' },
        { target: 'active-listings', type: 'integrates_with' },
        { target: 'relist', type: 'related_to', desc: 'Sellers often relist after ending a listing' },
        { target: 'time-away', type: 'related_to', desc: 'Time Away may automatically end or pause listings' },
      ];
      break;

    case 'end-listing-early':
      newRels = [
        { target: 'end-listing', type: 'related_to', year: 2000 },
        { target: 'auction-format', type: 'integrates_with', desc: 'Ending auction early with bids requires bid retraction' },
        { target: 'second-chance-offer', type: 'integrates_with', desc: 'After ending early, sellers can make second chance offers to bidders' },
        { target: 'seller-hub', type: 'integrates_with' },
      ];
      break;

    case 'ended-listings':
      newRels = [
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
        { target: 'sold-listings', type: 'related_to', desc: 'Sold Listings is a subset of Ended Listings' },
        { target: 'unsold-listings', type: 'related_to' },
        { target: 'relist', type: 'integrates_with', desc: 'Relist action available from Ended Listings view' },
        { target: 'sell-similar', type: 'integrates_with' },
      ];
      break;

    case 'ending-soon':
      newRels = [
        { target: 'auction-format', type: 'integrates_with', year: 2000, desc: 'Ending Soon sort most relevant for auction listings' },
        { target: 'ends-soon', type: 'related_to', desc: 'Ends Soon is a buyer-facing urgency indicator for same concept' },
        { target: 'best-match', type: 'related_to' },
        { target: 'sort-by', type: 'integrates_with' },
        { target: 'watchlist', type: 'integrates_with', desc: 'Buyers watch items ending soon' },
      ];
      break;

    case 'ends-soon':
      newRels = [
        { target: 'ending-soon', type: 'related_to', year: 2005 },
        { target: 'auction-format', type: 'integrates_with' },
        { target: 'watchlist', type: 'integrates_with' },
        { target: 'outbid-notification', type: 'related_to' },
        { target: 'bid-now', type: 'integrates_with' },
      ];
      break;

    case 'estimated-delivery':
      newRels = [
        { target: 'ebay-guaranteed-delivery', type: 'integrates_with', year: 2013, desc: 'Guaranteed Delivery relies on Estimated Delivery calculation' },
        { target: 'handling-time', type: 'depends_on' },
        { target: 'shipping-cost', type: 'related_to' },
        { target: 'tracking-number', type: 'integrates_with' },
        { target: 'package-tracking', type: 'integrates_with' },
        { target: 'fast-and-free', type: 'integrates_with' },
      ];
      break;

    case 'eu-consumer-rights-directive':
      newRels = [
        { target: '30-day-returns', type: 'related_to', year: 2014, desc: 'EU CRD mandates minimum 14-day returns; eBay enforces 30-day as platform standard' },
        { target: 'free-returns', type: 'related_to' },
        { target: 'managed-returns', type: 'integrates_with' },
        { target: 'ebay-germany', type: 'integrates_with' },
        { target: 'ebay-france', type: 'integrates_with' },
        { target: 'ebay-italy', type: 'integrates_with' },
        { target: 'ebay-spain', type: 'integrates_with' },
        { target: 'ebay-uk', type: 'integrates_with' },
        { target: 'return-preferences', type: 'integrates_with' },
        { target: 'buyer-protection', type: 'related_to' },
      ];
      break;

    case 'excellent-refurbished':
      newRels = [
        { target: 'ebay-refurbished', type: 'integrates_with', year: 2020 },
        { target: 'certified-refurbished', type: 'related_to', desc: 'Certified is top tier; Excellent is second tier' },
        { target: 'very-good-refurbished', type: 'related_to' },
        { target: 'ebay-refurbished-warranty', type: 'integrates_with' },
        { target: 'condition-filter', type: 'integrates_with' },
      ];
      break;

    case 'expedited-international-shipping':
      newRels = [
        { target: 'ebay-international-shipping', type: 'related_to', year: 2009 },
        { target: 'global-shipping-program', type: 'related_to' },
        { target: 'cross-border-trade', type: 'integrates_with' },
        { target: 'customs-declaration-automation', type: 'integrates_with' },
        { target: 'import-charges', type: 'integrates_with' },
        { target: 'shipping-calculator', type: 'integrates_with' },
      ];
      break;

    case 'export-academy':
      newRels = [
        { target: 'ebay-academy', type: 'related_to', year: 2020 },
        { target: 'ebay-export', type: 'integrates_with' },
        { target: 'cross-border-trade', type: 'integrates_with' },
        { target: 'ebay-international-shipping', type: 'integrates_with' },
        { target: 'new-seller-journey', type: 'related_to' },
      ];
      break;

    case 'express-payouts':
      newRels = [
        { target: 'managed-payments', type: 'integrates_with', year: 2020 },
        { target: 'express-payouts-multi-currency', type: 'related_to' },
        { target: 'payout-schedule', type: 'related_to' },
        { target: 'daily-payout', type: 'related_to' },
        { target: 'payouts-on-demand', type: 'related_to' },
        { target: 'ebay-balance', type: 'integrates_with' },
      ];
      break;

    case 'express-payouts-multi-currency':
      newRels = [
        { target: 'express-payouts', type: 'related_to', year: 2020 },
        { target: 'managed-payments-multi-currency', type: 'depends_on' },
        { target: 'multi-currency-payout', type: 'integrates_with' },
        { target: 'currency-conversion', type: 'integrates_with' },
        { target: 'managed-payments', type: 'integrates_with' },
      ];
      break;

    case 'fast-and-free':
      newRels = [
        { target: 'fast-n-free', type: 'related_to', year: 2019, desc: 'fast-and-free is the current name; fast-n-free was legacy badge' },
        { target: 'free-shipping', type: 'integrates_with' },
        { target: 'free-2-day-shipping', type: 'integrates_with' },
        { target: 'ebay-guaranteed-delivery', type: 'integrates_with' },
        { target: 'top-rated-plus', type: 'related_to', desc: 'TRS+ sellers typically qualify for Fast and Free badge' },
        { target: 'best-match', type: 'integrates_with', desc: 'Fast and Free listings get search ranking boost' },
        { target: 'free-shipping-badge', type: 'integrates_with' },
      ];
      break;

    case 'fast-n-free':
      newRels = [
        { target: 'free-2-day-shipping', type: 'renamed_to', year: 2024, desc: 'Fast N Free evolving into specific day-count shipping badges' },
        { target: 'fast-and-free', type: 'related_to' },
        { target: 'free-shipping', type: 'integrates_with' },
        { target: 'ebay-guaranteed-delivery', type: 'integrates_with' },
        { target: 'top-rated-plus', type: 'related_to' },
        { target: 'free-3-day-shipping', type: 'related_to' },
        { target: 'free-4-day-shipping', type: 'related_to' },
      ];
      break;

    case 'fathers-day-gifts':
      newRels = [
        { target: 'holiday-gift-guide', type: 'related_to', year: 2009 },
        { target: 'ebay-deals', type: 'integrates_with' },
        { target: 'ebay-deals-global', type: 'integrates_with' },
        { target: 'promoted-listings', type: 'integrates_with' },
        { target: 'discounts-manager', type: 'integrates_with' },
        { target: 'mothers-day-gifts', type: 'related_to' },
      ];
      break;

    case 'featured-deals':
      newRels = [
        { target: 'ebay-deals', type: 'integrates_with', year: 2015 },
        { target: 'ebay-deals-global', type: 'integrates_with' },
        { target: 'promoted-listings', type: 'related_to', desc: 'Featured placement complements promoted listings' },
        { target: 'deals-seller-portal', type: 'depends_on' },
        { target: 'flash-deals', type: 'related_to' },
      ];
      break;

    case 'featured-first':
      newRels = [
        { target: 'promoted-listings', type: 'related_to', year: 2018, desc: 'Featured First is a placement concept related to Promoted Listings' },
        { target: 'premium-placement', type: 'related_to' },
        { target: 'best-match', type: 'related_to' },
        { target: 'promoted-listings-advanced', type: 'related_to', desc: 'Advanced campaigns can achieve Featured First placement' },
        { target: 'featured-listing', type: 'related_to', desc: 'Featured First is evolution of legacy Featured Listing concept' },
      ];
      break;

    case 'featured-listing':
      newRels = [
        { target: 'promoted-listings', type: 'replaced_by', year: 2012, desc: 'Promoted Listings replaced Featured Listing as primary paid visibility tool' },
        { target: 'featured-first', type: 'replaced_by' },
        { target: 'premium-placement', type: 'replaced_by' },
        { target: 'listing-upgrades', type: 'related_to' },
      ];
      break;

    case 'fee-illustrator':
      newRels = [
        { target: 'seller-hub', type: 'integrates_with', year: 2013 },
        { target: 'quick-listing-tool', type: 'integrates_with' },
        { target: 'advanced-listing-tool', type: 'integrates_with' },
        { target: 'managed-payments', type: 'integrates_with', desc: 'Fee Illustrator incorporates Managed Payments fee structure' },
        { target: 'track-your-costs', type: 'related_to' },
      ];
      break;

    case 'feed':
      newRels = [
        { target: 'ebay-mobile-app', type: 'integrates_with', year: 2018 },
        { target: 'personalized-feed', type: 'related_to' },
        { target: 'saved-sellers', type: 'integrates_with', desc: 'Feed surfaces new listings from saved/followed sellers' },
        { target: 'following', type: 'integrates_with' },
        { target: 'follow-seller', type: 'integrates_with' },
        { target: 'product-recommendations', type: 'integrates_with' },
        { target: 'price-drop-notifications', type: 'integrates_with' },
        { target: 'watchlist', type: 'integrates_with' },
      ];
      break;

    case 'feedback-extortion-policy':
      newRels = [
        { target: 'feedback-forum', type: 'integrates_with', year: 2007 },
        { target: 'vero-program', type: 'related_to' },
        { target: 'seller-protections', type: 'integrates_with' },
        { target: 'trust-safety', type: 'related_to' },
        { target: 'report-buyer', type: 'integrates_with' },
        { target: 'resolution-center-multi-market', type: 'integrates_with' },
      ];
      break;

    case 'feedback-forum':
      newRels = [
        { target: 'feedback-reply', type: 'integrates_with', year: 1996 },
        { target: 'feedback-revision-request', type: 'integrates_with' },
        { target: 'leave-feedback', type: 'integrates_with' },
        { target: 'feedback-left', type: 'integrates_with' },
        { target: 'detailed-seller-ratings', type: 'integrates_with' },
        { target: 'positive-feedback-percentage', type: 'integrates_with' },
        { target: 'top-rated-seller', type: 'depends_on', desc: 'Feedback score is key input to Top Rated Seller status' },
        { target: 'feedback-extortion-policy', type: 'integrates_with' },
        { target: 'mutual-feedback-withdrawal', type: 'integrates_with' },
        { target: 'buyer-review', type: 'related_to' },
        { target: 'trust', type: 'depends_on', desc: 'Original trust infrastructure launched 1996 by Pierre Omidyar' },
        { target: 'feedback', type: 'depends_on', desc: 'Parent of the modern feedback system' },
        { target: 'detailed-seller-ratings', type: 'related_to', desc: 'DSRs evolved from the original Feedback Forum model' },
        { target: 'top-rated-seller', type: 'related_to', desc: 'Top Rated Seller status grew from feedback reputation system' },
        { target: 'leave-feedback', type: 'related_to', desc: 'Leave Feedback feature is the modern interface to the forum\'s intent' },
      ];
      break;

    case 'feedback-left':
      newRels = [
        { target: 'feedback-forum', type: 'integrates_with', year: 2000 },
        { target: 'leave-feedback', type: 'related_to' },
        { target: 'buyer-review', type: 'related_to' },
      ];
      break;

    case 'feedback-reply':
      newRels = [
        { target: 'feedback-forum', type: 'integrates_with', year: 2005 },
        { target: 'feedback-reply-multi-market', type: 'related_to', desc: 'Multi-market variant with localized character limits and translations' },
        { target: 'reply-to-feedback', type: 'related_to' },
        { target: 'seller-hub', type: 'integrates_with' },
      ];
      break;

    case 'feedback-reply-multi-market':
      newRels = [
        { target: 'feedback-reply', type: 'related_to', year: 2004 },
        { target: 'feedback-forum', type: 'integrates_with' },
        { target: 'seller-hub', type: 'integrates_with' },
      ];
      break;

    case 'feedback-revision-request':
      newRels = [
        { target: 'feedback-forum', type: 'integrates_with', year: 2010 },
        { target: 'feedback-revision-request-multi-market', type: 'related_to' },
        { target: 'resolution-center-multi-market', type: 'related_to', desc: 'Resolved disputes often lead to feedback revision requests' },
        { target: 'request-feedback-revision', type: 'related_to' },
      ];
      break;

    case 'feedback-revision-request-multi-market':
      newRels = [
        { target: 'feedback-revision-request', type: 'related_to', year: 2010 },
        { target: 'feedback-forum', type: 'integrates_with' },
        { target: 'seller-hub', type: 'integrates_with' },
      ];
      break;

    case 'file-exchange':
      newRels = [
        { target: 'seller-hub-reports', type: 'renamed_to', year: 2019, desc: 'File Exchange was replaced by Seller Hub Reports' },
        { target: 'bulk-listing-tool', type: 'related_to' },
        { target: 'csv-upload', type: 'related_to' },
        { target: 'seller-hub', type: 'related_to' },
      ];
      break;

    case 'filter-by':
      newRels = [
        { target: 'search-filters', type: 'related_to', year: 2010 },
        { target: 'advanced-search', type: 'integrates_with' },
        { target: 'best-match', type: 'integrates_with' },
        { target: 'free-shipping-filter', type: 'integrates_with' },
        { target: 'condition-filter', type: 'integrates_with' },
        { target: 'top-rated-filter', type: 'integrates_with' },
        { target: 'returns-accepted-filter', type: 'integrates_with' },
        { target: 'location-filter', type: 'integrates_with' },
      ];
      break;

    case 'find-it-on-ebay':
      newRels = [
        { target: 'image-search', type: 'related_to', year: 2019 },
        { target: 'barcode-scanner', type: 'related_to' },
        { target: 'ebay-mobile-app', type: 'integrates_with' },
        { target: 'search-filters', type: 'integrates_with' },
        { target: 'ebay-redlaser', type: 'related_to', desc: 'RedLaser barcode scanner was earlier acquisition enabling similar find functionality' },
        { target: 'search', type: 'depends_on', desc: 'Search-powered discovery feature' },
        { target: 'discovery-buyer-experience', type: 'integrates_with', desc: 'Part of buyer discovery experience on Android' },
        { target: 'search', type: 'integrates_with', year: 2017, desc: 'Converts shared images/links into eBay search results' },
      ];
      break;

    case 'fine-art':
      newRels = [
        { target: 'authenticity-guarantee', type: 'related_to', year: 2003 },
        { target: 'collectibles', type: 'related_to' },
        { target: 'certificate-of-authenticity', type: 'integrates_with' },
        { target: 'ebay-vault', type: 'related_to' },
        { target: 'knownorigin', type: 'related_to', desc: 'KnownOrigin is eBay\'s NFT/digital art marketplace' },
        { target: 'goldin-auctions', type: 'related_to', desc: 'Goldin handles high-value collectibles including sports fine art' },
      ];
      break;

    case 'fitment-compatibility':
      newRels = [
        { target: 'ebay-motors', type: 'integrates_with', year: 2008 },
        { target: 'ebay-motors-parts', type: 'integrates_with' },
        { target: 'fitment-plus', type: 'integrates_with' },
        { target: 'fitment-plus-auto', type: 'integrates_with' },
        { target: 'ebay-guaranteed-fit', type: 'depends_on' },
        { target: 'ebay-assured-fit', type: 'depends_on' },
        { target: 'parts-compatibility', type: 'related_to' },
        { target: 'my-garage', type: 'integrates_with' },
        { target: 'vin-lookup', type: 'integrates_with' },
        { target: 'shop-by-diagram', type: 'integrates_with' },
      ];
      break;

    case 'fitment-plus':
      newRels = [
        { target: 'fitment-compatibility', type: 'integrates_with', year: 2023 },
        { target: 'fitment-plus-auto', type: 'related_to', desc: 'Fitment Plus Auto is enhanced version with guaranteed fit protection' },
        { target: 'ebay-guaranteed-fit', type: 'integrates_with' },
        { target: 'ebay-assured-fit', type: 'related_to' },
        { target: 'ebay-motors', type: 'integrates_with' },
        { target: 'parts-compatibility', type: 'integrates_with' },
        { target: 'motors', type: 'depends_on', year: 2024, desc: 'eBay Fitment Plus serves Parts & Accessories sellers in Motors vertical' },
        { target: 'guaranteed-fit', type: 'integrates_with', year: 2024, desc: 'Fitment Plus data powers the eBay Guaranteed Fit protection program' },
        { target: 'listing-tools', type: 'integrates_with', year: 2024, desc: 'Fitment Plus works within listing tools to enhance P&A listings automatically' },
      ];
      break;

    case 'fitment-plus-auto':
      newRels = [
        { target: 'fitment-plus', type: 'related_to', year: 2025 },
        { target: 'ebay-guaranteed-fit', type: 'integrates_with' },
        { target: 'fitment-compatibility', type: 'depends_on' },
        { target: 'ebay-motors', type: 'integrates_with' },
        { target: 'parts-compatibility', type: 'depends_on' },
      ];
      break;

    case 'fixed-price-format':
      newRels = [
        { target: 'buy-it-now', type: 'integrates_with', year: 2000, desc: 'Fixed Price Format uses Buy It Now as its purchase mechanism' },
        { target: 'auction-format', type: 'competes_with', desc: 'Fixed Price is the primary alternative to auction-style listings' },
        { target: 'best-offer', type: 'integrates_with', desc: 'Best Offer can be added to Fixed Price listings' },
        { target: 'good-til-cancelled', type: 'integrates_with', desc: 'Fixed Price listings default to Good Til Cancelled duration' },
        { target: 'immediate-payment-required', type: 'integrates_with' },
        { target: 'promoted-listings-standard', type: 'integrates_with', desc: 'PLS cost-per-sale model works with Fixed Price format' },
      ];
      break;

    case 'flash-deals':
      newRels = [
        { target: 'ebay-deals', type: 'integrates_with', year: 2018 },
        { target: 'ebay-deals-global', type: 'integrates_with' },
        { target: 'ebay-wow-de', type: 'related_to' },
        { target: 'daily-deals', type: 'related_to' },
        { target: 'featured-deals', type: 'related_to' },
        { target: 'discounts-manager', type: 'depends_on' },
        { target: 'push-notifications', type: 'integrates_with', desc: 'Mobile push alerts drive flash deal engagement' },
      ];
      break;

    case 'flat-rate-shipping':
      newRels = [
        { target: 'calculated-shipping', type: 'competes_with', year: 2000, desc: 'Flat Rate and Calculated are the two primary shipping cost options' },
        { target: 'free-shipping', type: 'related_to' },
        { target: 'shipping-cost', type: 'integrates_with' },
        { target: 'combined-shipping-discount', type: 'integrates_with' },
      ];
      break;

    case 'follow-seller':
      newRels = [
        { target: 'saved-sellers', type: 'related_to', year: 2018, desc: 'Follow Seller is social-inspired terminology for the same Save Seller action' },
        { target: 'feed', type: 'integrates_with' },
        { target: 'following', type: 'related_to' },
        { target: 'saved-seller', type: 'related_to' },
        { target: 'push-notifications', type: 'integrates_with', desc: 'Follower notifications when seller lists new items' },
      ];
      break;

    case 'following':
      newRels = [
        { target: 'follow-seller', type: 'related_to', year: 2019 },
        { target: 'saved-sellers', type: 'related_to' },
        { target: 'feed', type: 'integrates_with' },
        { target: 'ebay-mobile-app', type: 'integrates_with' },
        { target: 'personalized-feed', type: 'integrates_with' },
      ];
      break;

    case 'form-1099-k':
      newRels = [
        { target: 'form-1099-k-us', type: 'related_to', year: 2012 },
        { target: '1099-k-tax-form', type: 'related_to' },
        { target: 'managed-payments', type: 'depends_on', desc: 'Managed Payments enables eBay to issue 1099-K directly' },
        { target: 'tax-documents', type: 'integrates_with' },
        { target: 'seller-hub', type: 'integrates_with' },
        { target: 'sales-tax-collection', type: 'related_to' },
      ];
      break;

    case 'form-1099-k-us':
      newRels = [
        { target: 'form-1099-k', type: 'related_to', year: 2011 },
        { target: '1099-k-tax-form', type: 'related_to' },
        { target: 'managed-payments', type: 'depends_on' },
        { target: 'tax-documents', type: 'integrates_with' },
        { target: 'seller-hub', type: 'integrates_with' },
        { target: 'automatic-tax-calculation', type: 'related_to' },
      ];
      break;

    case 'free-2-day-shipping':
      newRels = [
        { target: 'fast-n-free', type: 'renamed_from', year: 2024 },
        { target: 'free-2-day-shipping-us', type: 'related_to' },
        { target: 'free-3-day-shipping', type: 'related_to' },
        { target: 'free-4-day-shipping', type: 'related_to' },
        { target: 'fast-and-free', type: 'related_to' },
        { target: 'ebay-guaranteed-delivery', type: 'integrates_with' },
        { target: 'free-shipping-badge', type: 'integrates_with' },
        { target: 'top-rated-plus', type: 'related_to' },
        { target: 'best-match', type: 'integrates_with', desc: '2-day shipping listings receive search ranking boost' },
      ];
      break;

    case 'free-2-day-shipping-us':
      newRels = [
        { target: 'free-2-day-shipping', type: 'related_to', year: 2016 },
        { target: 'fast-n-free', type: 'related_to' },
        { target: 'ebay-guaranteed-delivery', type: 'integrates_with' },
        { target: 'free-shipping-badge', type: 'integrates_with' },
        { target: 'top-rated-plus', type: 'related_to' },
        { target: 'handling-time', type: 'depends_on' },
      ];
      break;

    case 'free-3-day-shipping':
      newRels = [
        { target: 'free-2-day-shipping', type: 'related_to', year: 2024 },
        { target: 'free-4-day-shipping', type: 'related_to' },
        { target: 'fast-n-free', type: 'related_to' },
        { target: 'free-shipping-badge', type: 'integrates_with' },
        { target: 'ebay-guaranteed-delivery', type: 'integrates_with' },
      ];
      break;

    case 'free-4-day-shipping':
      newRels = [
        { target: 'free-4-day-shipping-us', type: 'related_to', year: 2024 },
        { target: 'free-2-day-shipping', type: 'related_to' },
        { target: 'free-3-day-shipping', type: 'related_to' },
        { target: 'free-shipping-badge', type: 'integrates_with' },
        { target: 'free-4-day-shipping-badge', type: 'integrates_with' },
      ];
      break;

    case 'free-4-day-shipping-us':
      newRels = [
        { target: 'free-4-day-shipping', type: 'related_to', year: 2018 },
        { target: 'free-2-day-shipping-us', type: 'related_to' },
        { target: 'free-shipping-badge', type: 'integrates_with' },
        { target: 'ebay-guaranteed-delivery', type: 'integrates_with' },
      ];
      break;

    case 'free-returns':
      newRels = [
        { target: '30-day-returns', type: 'integrates_with', year: 2018, desc: 'Free Returns works within the 30-day return window' },
        { target: 'managed-returns', type: 'integrates_with' },
        { target: 'top-rated-plus', type: 'related_to', desc: 'Free Returns required for Top Rated Plus badge in US' },
        { target: 'best-match', type: 'integrates_with', desc: 'Free Returns listings receive search ranking boost' },
        { target: 'eu-consumer-rights-directive', type: 'related_to' },
        { target: 'automated-return-labels', type: 'integrates_with' },
        { target: 'ebay-plus', type: 'integrates_with', desc: 'eBay Plus includes free returns for members' },
        { target: 'seller-pays-return-shipping', type: 'related_to' },
      ];
      break;

    case 'free-shipping':
      newRels = [
        { target: 'free-shipping-badge', type: 'integrates_with', year: 2009 },
        { target: 'free-shipping-filter', type: 'integrates_with' },
        { target: 'free-shipping-threshold', type: 'related_to' },
        { target: 'fast-and-free', type: 'integrates_with' },
        { target: 'top-rated-plus', type: 'related_to' },
        { target: 'best-match', type: 'integrates_with', desc: 'Free Shipping offers boost Best Match search ranking' },
        { target: 'ebay-plus', type: 'integrates_with' },
      ];
      break;

    case 'free-shipping-badge':
      newRels = [
        { target: 'free-shipping', type: 'integrates_with', year: 2011 },
        { target: 'free-shipping-filter', type: 'integrates_with' },
        { target: 'fast-and-free', type: 'integrates_with' },
        { target: 'free-2-day-shipping', type: 'integrates_with' },
        { target: 'free-4-day-shipping-badge', type: 'related_to' },
        { target: 'best-match', type: 'integrates_with' },
      ];
      break;

    case 'free-shipping-filter':
      newRels = [
        { target: 'free-shipping', type: 'integrates_with', year: 2011 },
        { target: 'free-shipping-badge', type: 'integrates_with' },
        { target: 'filter-by', type: 'integrates_with' },
        { target: 'search-filters', type: 'integrates_with' },
        { target: 'best-match', type: 'integrates_with' },
      ];
      break;

    case 'free-shipping-threshold':
      newRels = [
        { target: 'free-shipping', type: 'related_to', year: 2015 },
        { target: 'discounts-manager', type: 'integrates_with', desc: 'Free Shipping Threshold is a promotion type in Discounts Manager' },
        { target: 'shipping-discounts', type: 'integrates_with' },
        { target: 'order-discounts', type: 'related_to' },
        { target: 'shopping-cart', type: 'integrates_with', desc: 'Threshold triggers at cart total level' },
        { target: 'combined-checkout', type: 'integrates_with' },
      ];
      break;

    case 'freight-shipping':
      newRels = [
        { target: 'business-industrial', type: 'related_to', year: 2012, desc: 'Primary category for large/heavy B2B items requiring freight' },
        { target: 'shipping-logistics', type: 'related_to', year: 2012 },
        { target: 'calculated-shipping', type: 'integrates_with', year: 2012, desc: 'Freight rates calculated by weight/dimensions/distance' },
        { target: 'local-pickup', type: 'related_to', year: 2012, desc: 'Both serve large items where parcel shipping is impractical' },
        { target: 'ebay-guaranteed-delivery', type: 'related_to', year: 2016, desc: 'Freight excluded from guaranteed delivery windows' },
        { target: 'handling-time', type: 'depends_on', year: 2012 },
        { target: 'managed-delivery', type: 'related_to', year: 2019 },
        { target: 'shipping', type: 'depends_on', year: 2020, desc: 'eBay Freight Shipping is the oversized/heavy item shipping program' },
        { target: 'business-industrial', type: 'integrates_with', year: 2020, desc: 'Freight shipping primarily serves Business & Industrial category sellers' },
        { target: 'heavy-equipment-verified', type: 'integrates_with', year: 2024, desc: 'Heavy Equipment Verified listings often require freight shipping' },
        { target: 'business-supply', type: 'integrates_with', year: 2024, desc: 'Freight shipping supports bulk and heavy B2B supply purchases' },
        { target: 'calculated-shipping', type: 'related_to', year: 2020, desc: 'Freight shipments use calculated shipping for accurate quoting' },
      ];
      break;

    case 'full-refund':
      newRels = [
        { target: 'ebay-money-back-guarantee', type: 'depends_on', year: 2011, desc: 'Full refund is the primary resolution under MBG' },
        { target: 'managed-returns', type: 'integrates_with', year: 2019 },
        { target: 'money-back-guarantee', type: 'related_to', year: 2011 },
        { target: 'returns', type: 'related_to', year: 2011 },
        { target: 'partial-refund', type: 'related_to', year: 2011, desc: 'Alternative resolution alongside full refund' },
        { target: 'item-not-received', type: 'related_to', year: 2011, desc: 'INR cases typically resolve with full refund' },
        { target: 'resolution-center-multi-market', type: 'integrates_with', year: 2011 },
      ];
      break;

    case 'gallery':
      newRels = [
        { target: 'listing-enhancement', type: 'related_to', year: 1999 },
        { target: 'gallery-plus', type: 'related_to', year: 2005, desc: 'Gallery Plus is the paid upgrade to standard gallery' },
        { target: 'gallery-picture', type: 'related_to', year: 2001 },
        { target: 'promoted-listings', type: 'integrates_with', year: 2015, desc: 'Gallery placement used by promoted listings in search results' },
        { target: 'best-match', type: 'integrates_with', year: 2008, desc: 'Gallery image quality influences Best Match ranking' },
        { target: 'listing-upgrades', type: 'related_to', year: 2000 },
      ];
      break;

    case 'gallery-picture':
      newRels = [
        { target: 'gallery', type: 'related_to', year: 2001 },
        { target: 'gallery-plus', type: 'related_to', year: 2005 },
        { target: 'image-requirements', type: 'depends_on', year: 2012 },
        { target: 'photo-uploader', type: 'depends_on', year: 2008 },
        { target: 'background-enhancement', type: 'integrates_with', year: 2020 },
        { target: 'photo-enhancement', type: 'integrates_with', year: 2020 },
        { target: 'best-match', type: 'integrates_with', year: 2008 },
      ];
      break;

    case 'gallery-plus':
      newRels = [
        { target: 'gallery', type: 'related_to', year: 2005 },
        { target: 'gallery-picture', type: 'related_to', year: 2005 },
        { target: 'listing-upgrades', type: 'related_to', year: 2005 },
        { target: 'listing-enhancement', type: 'related_to', year: 2005 },
        { target: 'promoted-listings', type: 'competes_with', year: 2015, desc: 'Both improve listing visibility in search results' },
        { target: 'subtitle', type: 'related_to', year: 2005, desc: 'Often bundled with gallery plus as listing upgrades' },
      ];
      break;

    case 'gdpr-compliance':
      newRels = [
        { target: 'ccpa-compliance', type: 'related_to', year: 2019, desc: 'Parallel privacy regulations for EU and California' },
        { target: 'privacy-policy', type: 'integrates_with', year: 2018 },
        { target: 'eu-consumer-rights-directive', type: 'related_to', year: 2018, desc: 'Both EU regulatory compliance frameworks' },
        { target: 'trust-safety', type: 'related_to', year: 2018 },
        { target: 'account-settings', type: 'integrates_with', year: 2018, desc: 'GDPR data controls surfaced in account settings' },
        { target: 'ebay-germany', type: 'related_to', year: 2018 },
        { target: 'ebay-uk', type: 'related_to', year: 2018 },
      ];
      break;

    case 'general-campaign':
      newRels = [
        { target: 'promoted-listings-standard', type: 'related_to', year: 2024, desc: 'General Campaign is a variant of PL Standard' },
        { target: 'priority-campaign', type: 'related_to', year: 2024, desc: 'Two campaign types within Promoted Listings Standard' },
        { target: 'promoted-listings', type: 'depends_on', year: 2024 },
        { target: 'campaign-bidding', type: 'integrates_with', year: 2024 },
        { target: 'promoted-listings-dashboard', type: 'integrates_with', year: 2024 },
        { target: 'ad-rate-recommendation', type: 'integrates_with', year: 2024 },
      ];
      break;

    case 'get-alerts':
      newRels = [
        { target: 'saved-searches', type: 'integrates_with', year: 2015, desc: 'Get Alerts subscribes to saved search notifications' },
        { target: 'push-notifications', type: 'depends_on', year: 2015 },
        { target: 'email-notifications', type: 'integrates_with', year: 2015 },
        { target: 'price-alert', type: 'related_to', year: 2015 },
        { target: 'notify-me', type: 'related_to', year: 2018 },
        { target: 'back-in-stock', type: 'related_to', year: 2015 },
      ];
      break;

    case 'global-shipping-program':
      newRels = [
        { target: 'ebay-international-shipping', type: 'replaced_by', year: 2023, desc: 'GSP replaced by EIS in US market July 2023' },
        { target: 'import-charges', type: 'integrates_with', year: 2011, desc: 'GSP calculates and prepays import charges at checkout' },
        { target: 'global-shipping-toggle', type: 'related_to', year: 2013 },
        { target: 'international-standard-delivery', type: 'related_to', year: 2015 },
        { target: 'ebay-uk', type: 'related_to', year: 2011, desc: 'GSP still active in UK after US transition' },
        { target: 'cross-border-trade', type: 'integrates_with', year: 2011 },
        { target: 'currency-conversion', type: 'integrates_with', year: 2011 },
        { target: 'shipping', type: 'depends_on', desc: 'Cross-border shipping solution under Shipping umbrella' },
      ];
      break;

    case 'global-shipping-toggle':
      newRels = [
        { target: 'global-shipping-program', type: 'integrates_with', year: 2013 },
        { target: 'ebay-international-shipping', type: 'integrates_with', year: 2023 },
        { target: 'import-charges', type: 'integrates_with', year: 2013 },
        { target: 'international-site-visibility', type: 'related_to', year: 2013 },
        { target: 'shipping-restrictions', type: 'integrates_with', year: 2013 },
        { target: 'cross-border-trade', type: 'integrates_with', year: 2013 },
      ];
      break;

    case 'go-to-checkout':
      newRels = [
        { target: 'checkout', type: 'depends_on', year: 2018 },
        { target: 'shopping-cart', type: 'integrates_with', year: 2018 },
        { target: 'secure-checkout', type: 'integrates_with', year: 2018 },
        { target: 'managed-payments', type: 'depends_on', year: 2018 },
        { target: 'mobile-checkout', type: 'related_to', year: 2018 },
        { target: 'add-to-cart', type: 'related_to', year: 2018 },
      ];
      break;

    case 'goldin-auctions':
      newRels = [
        { target: 'collectibles-trading', type: 'related_to', year: 2021 },
        { target: 'trading-card-hub', type: 'related_to', year: 2021 },
        { target: 'trading-card-authentication', type: 'integrates_with', year: 2021 },
        { target: 'auction-format', type: 'integrates_with', year: 2021 },
        { target: 'authenticity-guarantee-trading-cards', type: 'related_to', year: 2021 },
        { target: 'tcgplayer', type: 'related_to', year: 2021, desc: 'Both serve high-end collectibles market on eBay' },
        { target: 'comc', type: 'related_to', year: 2021 },
      ];
      break;

    case 'good-refurbished':
      newRels = [
        { target: 'ebay-refurbished', type: 'depends_on', year: 2020, desc: 'Good Refurbished is entry tier of eBay Refurbished program' },
        { target: 'excellent-refurbished', type: 'related_to', year: 2020, desc: 'Adjacent condition tier in eBay Refurbished' },
        { target: 'very-good-refurbished', type: 'related_to', year: 2020 },
        { target: 'certified-refurbished', type: 'related_to', year: 2020 },
        { target: 'refurbished-open-box', type: 'related_to', year: 2020 },
        { target: 'ebay-refurbished-warranty', type: 'integrates_with', year: 2020 },
      ];
      break;

    case 'good-til-cancelled':
      newRels = [
        { target: 'fixed-price-format', type: 'integrates_with', year: 2005, desc: 'GTC is the standard duration for fixed-price listings' },
        { target: 'auto-relist', type: 'related_to', year: 2010, desc: 'GTC replaced the auto-relist mechanism' },
        { target: 'automatic-relisting', type: 'replaced_by', year: 2010 },
        { target: 'out-of-stock-control', type: 'integrates_with', year: 2016 },
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
        { target: 'active-listings', type: 'related_to', year: 2005 },
      ];
      break;

    case 'google-pay':
      newRels = [
        { target: 'managed-payments', type: 'integrates_with', year: 2020 },
        { target: 'mobile-checkout', type: 'integrates_with', year: 2020 },
        { target: 'apple-pay', type: 'related_to', year: 2020, desc: 'Parallel digital wallet options at checkout' },
        { target: 'checkout', type: 'integrates_with', year: 2020 },
        { target: 'add-payment-method', type: 'integrates_with', year: 2020 },
        { target: 'venmo', type: 'related_to', year: 2020 },
      ];
      break;

    case 'green-monday':
      newRels = [
        { target: 'ebay-deals', type: 'depends_on', year: 2014 },
        { target: 'black-friday-deals', type: 'related_to', year: 2014, desc: 'Part of the holiday season deal cadence' },
        { target: 'cyber-monday', type: 'related_to', year: 2014 },
        { target: 'free-shipping', type: 'integrates_with', year: 2014 },
        { target: 'guaranteed-delivery', type: 'integrates_with', year: 2016, desc: 'Green Monday tied to pre-Christmas delivery guarantees' },
        { target: 'ebay-advertising', type: 'integrates_with', year: 2014 },
      ];
      break;

    case 'gst-collection-australia':
      newRels = [
        { target: 'ebay-australia', type: 'depends_on', year: 2018 },
        { target: 'managed-payments', type: 'integrates_with', year: 2018 },
        { target: 'vat-collection', type: 'related_to', year: 2018, desc: 'Both are marketplace tax collection programs' },
        { target: 'sales-tax-collection', type: 'related_to', year: 2018 },
        { target: 'import-charges', type: 'related_to', year: 2018 },
        { target: 'tax', type: 'related_to', year: 2018 },
      ];
      break;

    case 'guaranteed-delivery':
      newRels = [
        { target: 'ebay-guaranteed-delivery', type: 'related_to', year: 2016 },
        { target: 'handling-time', type: 'depends_on', year: 2016 },
        { target: '1-day-handling', type: 'integrates_with', year: 2016 },
        { target: 'fast-and-free', type: 'integrates_with', year: 2016, desc: 'Fast & Free badge requires meeting guaranteed delivery standards' },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2016 },
        { target: 'tracking-number', type: 'depends_on', year: 2016 },
        { target: 'estimated-delivery', type: 'integrates_with', year: 2016 },
        { target: 'shipping', type: 'depends_on', year: 2017, desc: 'Guaranteed Delivery is a promise backed by eBay shipping infrastructure' },
        { target: 'fast-and-free', type: 'related_to', year: 2017, desc: 'Guaranteed delivery and fast-and-free are complementary buyer-facing shipping promises' },
        { target: 'seller-performance-standards', type: 'depends_on', year: 2017, desc: 'Sellers must maintain handling time standards to qualify for guaranteed delivery' },
        { target: 'discovery-buyer-experience', type: 'integrates_with', year: 2017, desc: 'Guaranteed delivery filter helps buyers find fast-arriving items' },
        { target: 'managed-delivery', type: 'related_to', year: 2019, desc: 'Managed Delivery is one path sellers can use to qualify for guaranteed delivery' },
      ];
      break;

    case 'guaranteed-fit':
      newRels = [
        { target: 'ebay-motors', type: 'depends_on', year: 2019 },
        { target: 'fitment-compatibility', type: 'integrates_with', year: 2019 },
        { target: 'parts-compatibility', type: 'depends_on', year: 2019 },
        { target: 'free-returns', type: 'integrates_with', year: 2019, desc: 'Wrong-fit parts qualify for free returns under guaranteed fit' },
        { target: 'ebay-money-back-guarantee', type: 'integrates_with', year: 2019 },
        { target: 'my-garage', type: 'integrates_with', year: 2019, desc: 'My Garage vehicle data powers fitment verification' },
        { target: 'trust-safety', type: 'related_to', year: 2019 },
        { target: 'motors', type: 'depends_on', year: 2024, desc: 'eBay Guaranteed Fit is a trust program for Motors Parts & Accessories buyers' },
        { target: 'ebay-motors', type: 'integrates_with', year: 2024, desc: 'Guaranteed Fit badge displayed on qualifying Motors P&A listings' },
        { target: 'fitment-plus', type: 'integrates_with', year: 2024, desc: 'Fitment Plus provides the compatibility data that backs Guaranteed Fit' },
        { target: 'trust', type: 'depends_on', year: 2024, desc: 'Guaranteed Fit is part of eBay trust and buyer protection umbrella' },
        { target: 'authenticity-guarantee', type: 'related_to', year: 2024, desc: 'Both are category-specific buyer protection programs; AG for authenticity, GF for fitment' },
      ];
      break;

    case 'guest-checkout':
      newRels = [
        { target: 'checkout', type: 'integrates_with', year: 2015 },
        { target: 'managed-payments', type: 'depends_on', year: 2018 },
        { target: 'checkout-as-guest', type: 'related_to', year: 2015 },
        { target: 'mobile-checkout', type: 'integrates_with', year: 2015 },
        { target: 'secure-checkout', type: 'integrates_with', year: 2015 },
        { target: 'buy-it-now', type: 'integrates_with', year: 2015 },
      ];
      break;

    case 'hand-picked-collections':
      newRels = [
        { target: 'collections', type: 'depends_on', year: 2019 },
        { target: 'my-collection', type: 'related_to', year: 2019 },
        { target: 'curated-lists', type: 'related_to', year: 2019 },
        { target: 'holiday-gift-guide', type: 'related_to', year: 2019, desc: 'Both involve editorially curated product selections' },
        { target: 'discovery', type: 'integrates_with', year: 2019 },
        { target: 'shop-the-look', type: 'related_to', year: 2019 },
      ];
      break;

    case 'handbag-authentication':
      newRels = [
        { target: 'authenticity-guarantee', type: 'depends_on', year: 2020, desc: 'Handbag auth is a vertical variant of AG' },
        { target: 'authenticity-guarantee-handbags', type: 'related_to', year: 2020 },
        { target: 'fashion-luxury', type: 'related_to', year: 2020 },
        { target: 'ebay-authenticate', type: 'renamed_from', year: 2020, desc: 'eBay Authenticate rebranded as part of AG expansion' },
        { target: 'trust-safety', type: 'integrates_with', year: 2020 },
        { target: 'ebay-vault', type: 'integrates_with', year: 2022, desc: 'Authenticated handbags can be stored in eBay Vault' },
        { target: 'jewelry-authentication', type: 'related_to', year: 2022 },
      ];
      break;

    case 'handling-time':
      newRels = [
        { target: 'guaranteed-delivery', type: 'depends_on', year: 2016 },
        { target: 'estimated-delivery', type: 'integrates_with', year: 2007 },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2014 },
        { target: 'late-shipment-rate', type: 'related_to', year: 2014 },
        { target: '1-day-handling', type: 'related_to', year: 2015 },
        { target: 'same-day-handling', type: 'related_to', year: 2016 },
        { target: 'top-rated-plus', type: 'depends_on', year: 2016, desc: 'TRS+ requires 1-day handling time' },
      ];
      break;

    case 'help-center':
      newRels = [
        { target: 'ebay-customer-service', type: 'integrates_with', year: 2004 },
        { target: 'live-chat-support', type: 'integrates_with', year: 2017 },
        { target: 'virtual-assistant', type: 'integrates_with', year: 2020 },
        { target: 'ebay-community', type: 'integrates_with', year: 2004 },
        { target: 'seller-help', type: 'related_to', year: 2020 },
        { target: 'phone-support', type: 'integrates_with', year: 2004 },
        { target: 'resolution-center-multi-market', type: 'integrates_with', year: 2010 },
      ];
      break;

    case 'helpful-review':
      newRels = [
        { target: 'item-reviews', type: 'depends_on', year: 2017 },
        { target: 'product-reviews', type: 'related_to', year: 2017 },
        { target: 'feedback-forum', type: 'related_to', year: 2017 },
        { target: 'verified-purchase', type: 'integrates_with', year: 2017 },
        { target: 'buyer-review', type: 'related_to', year: 2017 },
      ];
      break;

    case 'hermes-paketshop':
      newRels = [
        { target: 'ebay-germany', type: 'depends_on', year: 2013 },
        { target: 'shipping-labels', type: 'integrates_with', year: 2013 },
        { target: 'dhl-paket', type: 'related_to', year: 2013, desc: 'Competing German carrier options' },
        { target: 'click-and-collect', type: 'related_to', year: 2013, desc: 'Both enable parcel collection from retail points' },
        { target: 'shipping-logistics', type: 'related_to', year: 2013 },
        { target: 'label-printer', type: 'integrates_with', year: 2013 },
      ];
      break;

    case 'holiday-gift-guide':
      newRels = [
        { target: 'hand-picked-collections', type: 'related_to', year: 2007 },
        { target: 'black-friday-deals', type: 'related_to', year: 2007 },
        { target: 'guaranteed-delivery', type: 'integrates_with', year: 2016, desc: 'Holiday gift guide promotes guaranteed Christmas delivery' },
        { target: 'ebay-deals', type: 'integrates_with', year: 2007 },
        { target: 'curated-lists', type: 'related_to', year: 2007 },
        { target: 'marketing', type: 'depends_on', year: 2007 },
        { target: 'green-monday', type: 'related_to', year: 2014 },
      ];
      break;

    case 'html-editor':
      newRels = [
        { target: 'listing-designer', type: 'depends_on', year: 2003 },
        { target: 'item-description-editor', type: 'related_to', year: 2008 },
        { target: 'rich-text-editor', type: 'related_to', year: 2003 },
        { target: 'wysiwyg-editor', type: 'related_to', year: 2008 },
        { target: 'active-content-policy', type: 'related_to', year: 2017, desc: 'Active content policy restricts certain HTML/JS in listings' },
        { target: 'listing-template', type: 'integrates_with', year: 2006 },
        { target: 'mobile-responsive-template', type: 'related_to', year: 2014 },
      ];
      break;

    case 'hub-vendeur':
      newRels = [
        { target: 'seller-hub', type: 'renamed_from', year: 2016, desc: 'French localization of Seller Hub' },
        { target: 'seller-hub-multi-market', type: 'related_to', year: 2016 },
        { target: 'ebay-france', type: 'depends_on', year: 2016 },
        { target: 'promotions-manager', type: 'integrates_with', year: 2016 },
        { target: 'managed-payments', type: 'integrates_with', year: 2018 },
        { target: 'console-venditori', type: 'related_to', year: 2016, desc: 'Parallel Italian Seller Hub localization' },
      ];
      break;

    case 'image-requirements':
      newRels = [
        { target: 'photo-requirements', type: 'related_to', year: 2012 },
        { target: 'gallery-picture', type: 'depends_on', year: 2012 },
        { target: 'photo-uploader', type: 'integrates_with', year: 2012 },
        { target: 'listing-error', type: 'integrates_with', year: 2012, desc: 'Image violations surface as listing errors' },
        { target: 'active-content-policy', type: 'related_to', year: 2017 },
        { target: 'background-enhancement', type: 'integrates_with', year: 2020 },
      ];
      break;

    case 'image-search':
      newRels = [
        { target: 'search', type: 'depends_on', year: 2017 },
        { target: 'discovery', type: 'integrates_with', year: 2017 },
        { target: 'ebay-mobile-app', type: 'depends_on', year: 2017, desc: 'Image search primarily a mobile app feature' },
        { target: 'ai-snap', type: 'related_to', year: 2022, desc: 'AI Snap is the evolved AI-powered visual search successor' },
        { target: 'barcode-scanner', type: 'related_to', year: 2017, desc: 'Both are camera-based search entry points' },
        { target: 'find-it-on-ebay', type: 'related_to', year: 2017 },
        { target: 'cassini', type: 'integrates_with', year: 2017 },
        { target: 'search', type: 'integrates_with', year: 2017, desc: 'Visual search complements text search for discovery' },
        { target: 'discovery-buyer-experience', type: 'integrates_with', year: 2017, desc: 'Part of the buyer discovery toolset for finding items by image' },
        { target: 'ebay-mobile-app', type: 'integrates_with', year: 2017, desc: 'Camera-based search launched through mobile app' },
        { target: 'ai-shopping-agent', type: 'related_to', desc: 'Both are AI-powered discovery tools; image-search is legacy, AI agent is successor direction' },
      ];
      break;

    case 'immediate-payment-required':
      newRels = [
        { target: 'buy-it-now', type: 'integrates_with', year: 2010, desc: 'IPR applied to BIN listings to prevent unpaid items' },
        { target: 'unpaid-item-assistant', type: 'related_to', year: 2010 },
        { target: 'managed-payments', type: 'depends_on', year: 2018 },
        { target: 'checkout', type: 'integrates_with', year: 2010 },
        { target: 'buyer-requirements', type: 'related_to', year: 2010 },
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
      ];
      break;

    case 'import-charges':
      newRels = [
        { target: 'global-shipping-program', type: 'integrates_with', year: 2011 },
        { target: 'ebay-international-shipping', type: 'integrates_with', year: 2023 },
        { target: 'currency-conversion', type: 'integrates_with', year: 2011 },
        { target: 'managed-payments', type: 'integrates_with', year: 2018 },
        { target: 'vat-collection', type: 'related_to', year: 2018 },
        { target: 'cross-border-trade', type: 'depends_on', year: 2011 },
        { target: 'gst-collection-australia', type: 'related_to', year: 2018 },
      ];
      break;

    case 'impressions':
      newRels = [
        { target: 'listing-analytics', type: 'related_to', year: 2014 },
        { target: 'promoted-listings-dashboard', type: 'integrates_with', year: 2015 },
        { target: 'click-through-rate', type: 'related_to', year: 2014, desc: 'CTR calculated from impressions/clicks' },
        { target: 'traffic-report', type: 'integrates_with', year: 2014 },
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
        { target: 'best-match', type: 'related_to', year: 2014 },
        { target: 'page-views', type: 'related_to', year: 2014 },
      ];
      break;

    case 'in-app-messaging':
      newRels = [
        { target: 'message-center', type: 'related_to', year: 2015 },
        { target: 'ebay-mobile-app', type: 'depends_on', year: 2015 },
        { target: 'ask-seller-question', type: 'integrates_with', year: 2015 },
        { target: 'message-buyer', type: 'related_to', year: 2015 },
        { target: 'mobile-notifications', type: 'integrates_with', year: 2015 },
        { target: 'ebay-ai-message-assistance', type: 'integrates_with', year: 2023 },
      ];
      break;

    case 'in-app-qr-code':
      newRels = [
        { target: 'ebay-mobile-app', type: 'depends_on', year: 2020 },
        { target: 'barcode-scanner', type: 'related_to', year: 2020 },
        { target: 'in-store-pickup', type: 'integrates_with', year: 2020, desc: 'QR codes used for in-store pickup verification' },
        { target: 'qr-code-labels', type: 'related_to', year: 2020 },
      ];
      break;

    case 'in-store-pickup':
      newRels = [
        { target: 'local-pickup', type: 'related_to', year: 2014 },
        { target: 'click-and-collect', type: 'related_to', year: 2014 },
        { target: 'ship-to-store', type: 'replaced_by', year: 2014 },
        { target: 'in-app-qr-code', type: 'integrates_with', year: 2020 },
        { target: 'checkout', type: 'integrates_with', year: 2014 },
        { target: 'local-delivery', type: 'related_to', year: 2014 },
        { target: 'shipping', type: 'integrates_with', year: 2020, desc: 'Pickup is an alternative fulfillment option within the shipping umbrella' },
      ];
      break;

    case 'in-store-pickup-us':
      newRels = [
        { target: 'in-store-pickup', type: 'related_to', year: 2017 },
        { target: 'local-pickup', type: 'related_to', year: 2017 },
        { target: 'local-pickup-multi-market', type: 'related_to', year: 2017 },
        { target: 'click-and-collect', type: 'related_to', year: 2017 },
        { target: 'checkout', type: 'integrates_with', year: 2017 },
      ];
      break;

    case 'in-transit':
      newRels = [
        { target: 'package-tracking', type: 'depends_on', year: 2006 },
        { target: 'tracking-number', type: 'depends_on', year: 2006 },
        { target: 'delivery-status', type: 'related_to', year: 2006 },
        { target: 'out-for-delivery', type: 'related_to', year: 2006 },
        { target: 'awaiting-shipment', type: 'related_to', year: 2006 },
        { target: 'order-updates', type: 'integrates_with', year: 2006 },
      ];
      break;

    case 'inactive-listings':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2016 },
        { target: 'out-of-stock-control', type: 'related_to', year: 2016 },
        { target: 'out-of-stock-listing', type: 'related_to', year: 2016 },
        { target: 'active-listings', type: 'related_to', year: 2016 },
        { target: 'relist', type: 'integrates_with', year: 2016 },
        { target: 'inventory-management', type: 'integrates_with', year: 2016 },
      ];
      break;

    case 'indefinite-suspension':
      newRels = [
        { target: 'account-suspension', type: 'related_to', year: 2004 },
        { target: 'account-suspended', type: 'related_to', year: 2004 },
        { target: 'trust-safety', type: 'depends_on', year: 2004 },
        { target: 'linked-accounts-policy', type: 'integrates_with', year: 2008, desc: 'Suspended accounts blocked from creating new accounts' },
        { target: 'vero-program', type: 'related_to', year: 2004 },
        { target: 'selling-restrictions', type: 'related_to', year: 2004 },
      ];
      break;

    case 'instant-payout':
      newRels = [
        { target: 'managed-payments', type: 'depends_on', year: 2020 },
        { target: 'express-payouts', type: 'related_to', year: 2020 },
        { target: 'daily-payout', type: 'related_to', year: 2020 },
        { target: 'payout-schedule', type: 'integrates_with', year: 2020 },
        { target: 'payouts-on-demand', type: 'related_to', year: 2020 },
        { target: 'ebay-balance', type: 'integrates_with', year: 2020 },
      ];
      break;

    case 'intellectual-property':
      newRels = [
        { target: 'vero-program', type: 'integrates_with', year: 1999, desc: 'VeRO is eBay\'s IP rights owner protection program' },
        { target: 'counterfeit-detection', type: 'integrates_with', year: 2010 },
        { target: 'trust-safety', type: 'depends_on', year: 1999 },
        { target: 'trademark', type: 'related_to', year: 1999 },
        { target: 'copyright', type: 'related_to', year: 1999 },
        { target: 'listing-removal-notice', type: 'integrates_with', year: 2003, desc: 'IP violations trigger listing removal notices' },
        { target: 'authenticity-guarantee', type: 'related_to', year: 2020 },
      ];
      break;

    case 'international-site-visibility':
      newRels = [
        { target: 'global-shipping-toggle', type: 'integrates_with', year: 2013 },
        { target: 'cross-border-trade', type: 'integrates_with', year: 2010 },
        { target: 'promoted-to-international', type: 'renamed_from', year: 2015 },
        { target: 'currency-conversion', type: 'integrates_with', year: 2010 },
        { target: 'language-translation', type: 'integrates_with', year: 2016 },
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
      ];
      break;

    case 'international-standard-delivery':
      newRels = [
        { target: 'global-shipping-program', type: 'related_to', year: 2015 },
        { target: 'ebay-international-shipping', type: 'replaced_by', year: 2023 },
        { target: 'import-charges', type: 'integrates_with', year: 2015 },
        { target: 'shipping-logistics', type: 'related_to', year: 2015 },
        { target: 'cross-border-trade', type: 'integrates_with', year: 2015 },
        { target: 'shipping', type: 'depends_on', year: 2020, desc: 'International Standard Delivery is part of eBay shipping infrastructure' },
        { target: 'ebay-international-shipping', type: 'related_to', year: 2020, desc: 'Both are eBay-managed international shipping solutions; EIS is the current branded name' },
        { target: 'customs-declaration-automation', type: 'integrates_with', year: 2020, desc: 'Automated customs declarations are built into international delivery service' },
        { target: 'currency-conversion', type: 'related_to', year: 2020, desc: 'International shipments often paired with currency conversion at checkout' },
      ];
      break;

    case 'inventory-management':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2016 },
        { target: 'out-of-stock-control', type: 'integrates_with', year: 2016 },
        { target: 'bulk-listing-tool', type: 'integrates_with', year: 2016 },
        { target: 'active-listings', type: 'integrates_with', year: 2016 },
        { target: 'inactive-listings', type: 'integrates_with', year: 2016 },
        { target: 'merchant-integration-platform', type: 'integrates_with', year: 2016 },
        { target: 'inventory-mapping-api', type: 'integrates_with', year: 2020 },
      ];
      break;

    case 'issue-resolution-center':
      newRels = [
        { target: 'resolution-center-multi-market', type: 'related_to', year: 2010 },
        { target: 'ebay-money-back-guarantee', type: 'integrates_with', year: 2011 },
        { target: 'managed-returns', type: 'integrates_with', year: 2019 },
        { target: 'item-not-received', type: 'integrates_with', year: 2011 },
        { target: 'payment-dispute', type: 'integrates_with', year: 2018 },
        { target: 'ebay-customer-service', type: 'integrates_with', year: 2010 },
        { target: 'case-appeals', type: 'integrates_with', year: 2019 },
      ];
      break;

    case 'item-comparison':
      newRels = [
        { target: 'search', type: 'depends_on', year: 2016 },
        { target: 'best-match', type: 'integrates_with', year: 2016 },
        { target: 'search-filters', type: 'integrates_with', year: 2016 },
        { target: 'buyer', type: 'related_to', year: 2016 },
        { target: 'item-condition', type: 'integrates_with', year: 2016 },
      ];
      break;

    case 'item-condition':
      newRels = [
        { target: 'listing', type: 'depends_on', year: 2007 },
        { target: 'item-specifics', type: 'integrates_with', year: 2007 },
        { target: 'condition-filter', type: 'related_to', year: 2009 },
        { target: 'ebay-refurbished', type: 'integrates_with', year: 2020 },
        { target: 'certified-refurbished', type: 'integrates_with', year: 2020 },
        { target: 'search-filters', type: 'integrates_with', year: 2009 },
      ];
      break;

    case 'item-description-editor':
      newRels = [
        { target: 'listing', type: 'depends_on', year: 2008 },
        { target: 'html-editor', type: 'related_to', year: 2008 },
        { target: 'rich-text-editor', type: 'related_to', year: 2008 },
        { target: 'wysiwyg-editor', type: 'related_to', year: 2008 },
        { target: 'description-template', type: 'integrates_with', year: 2010 },
        { target: 'ai-description-generator', type: 'integrates_with', year: 2023 },
        { target: 'listing-designer', type: 'depends_on', year: 2008 },
      ];
      break;

    case 'item-location':
      newRels = [
        { target: 'shipping-calculator', type: 'depends_on', year: 1999 },
        { target: 'calculated-shipping', type: 'integrates_with', year: 1999 },
        { target: 'location-filter', type: 'integrates_with', year: 2004 },
        { target: 'local-pickup', type: 'integrates_with', year: 2000 },
        { target: 'distance-nearest-first', type: 'integrates_with', year: 2010 },
        { target: 'listing', type: 'depends_on', year: 1999 },
      ];
      break;

    case 'item-no-longer-available':
      newRels = [
        { target: 'similar-items', type: 'integrates_with', year: 2005, desc: 'Shows similar items when target listing is gone' },
        { target: 'more-from-this-seller', type: 'integrates_with', year: 2012 },
        { target: 'buyer', type: 'related_to', year: 2005 },
        { target: 'recently-viewed', type: 'related_to', year: 2005 },
      ];
      break;

    case 'item-not-received':
      newRels = [
        { target: 'ebay-money-back-guarantee', type: 'depends_on', year: 2011 },
        { target: 'issue-resolution-center', type: 'integrates_with', year: 2011 },
        { target: 'package-tracking', type: 'integrates_with', year: 2011 },
        { target: 'full-refund', type: 'integrates_with', year: 2011 },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2014, desc: 'INR cases count as defects against seller' },
        { target: 'seller-protections', type: 'integrates_with', year: 2019 },
        { target: 'transaction-defect-rate', type: 'integrates_with', year: 2014 },
      ];
      break;

    case 'item-reviews':
      newRels = [
        { target: 'feedback-forum', type: 'related_to', year: 2013 },
        { target: 'product-reviews', type: 'related_to', year: 2013 },
        { target: 'helpful-review', type: 'integrates_with', year: 2017 },
        { target: 'verified-purchase', type: 'integrates_with', year: 2017 },
        { target: 'buyer-review', type: 'related_to', year: 2013 },
        { target: 'write-review', type: 'integrates_with', year: 2013 },
      ];
      break;

    case 'item-specifics':
      newRels = [
        { target: 'listing', type: 'depends_on', year: 2006 },
        { target: 'cassini', type: 'integrates_with', year: 2008, desc: 'Item specifics are key signals for Cassini search ranking' },
        { target: 'item-specifics-filter', type: 'integrates_with', year: 2009 },
        { target: 'item-specifics-multi-market', type: 'related_to', year: 2007 },
        { target: 'search-filters', type: 'integrates_with', year: 2009 },
        { target: 'listing-quality-report', type: 'integrates_with', year: 2018, desc: 'LQR flags missing or incomplete item specifics' },
        { target: 'catalog-api', type: 'integrates_with', year: 2018 },
        { target: 'magical-listing', type: 'integrates_with', year: 2022, desc: 'Magical Listing auto-populates item specifics via AI' },
      ];
      break;

    case 'item-specifics-filter':
      newRels = [
        { target: 'item-specifics', type: 'depends_on', year: 2009 },
        { target: 'search-filters', type: 'integrates_with', year: 2009 },
        { target: 'search', type: 'depends_on', year: 2009 },
        { target: 'refine-search', type: 'related_to', year: 2009 },
        { target: 'condition-filter', type: 'related_to', year: 2009 },
        { target: 'cassini', type: 'integrates_with', year: 2009 },
      ];
      break;

    case 'item-specifics-multi-market':
      newRels = [
        { target: 'item-specifics', type: 'related_to', year: 2007 },
        { target: 'item-specifics-filter', type: 'integrates_with', year: 2009 },
        { target: 'listing-features', type: 'depends_on', year: 2007 },
        { target: 'ebay-germany', type: 'related_to', year: 2007 },
        { target: 'ebay-france', type: 'related_to', year: 2007 },
        { target: 'search-filters', type: 'integrates_with', year: 2009 },
      ];
      break;

    case 'items-watched':
      newRels = [
        { target: 'watchlist', type: 'depends_on', year: 2002 },
        { target: 'my-ebay', type: 'depends_on', year: 2002 },
        { target: 'watch-list', type: 'related_to', year: 2002 },
        { target: 'add-to-watchlist', type: 'integrates_with', year: 2002 },
        { target: 'ending-soon', type: 'integrates_with', year: 2004, desc: 'Items watched tracks time left on watched auctions' },
        { target: 'outbid-notification', type: 'integrates_with', year: 2002 },
      ];
      break;

    case 'jewelry-authentication':
      newRels = [
        { target: 'authenticity-guarantee', type: 'depends_on', year: 2022 },
        { target: 'authenticity-guarantee-jewelry', type: 'related_to', year: 2022 },
        { target: 'fashion-luxury', type: 'related_to', year: 2022 },
        { target: 'handbag-authentication', type: 'related_to', year: 2022 },
        { target: 'trust-safety', type: 'integrates_with', year: 2022 },
        { target: 'ebay-vault', type: 'integrates_with', year: 2022 },
        { target: 'watch-authentication', type: 'related_to', year: 2022 },
      ];
      break;

    case 'keyword-targeting':
      newRels = [
        { target: 'promoted-listings-advanced', type: 'depends_on', year: 2020 },
        { target: 'promoted-listings', type: 'integrates_with', year: 2020 },
        { target: 'campaign-bidding', type: 'integrates_with', year: 2020 },
        { target: 'audience-targeting', type: 'related_to', year: 2020 },
        { target: 'cassini', type: 'integrates_with', year: 2020 },
        { target: 'best-match', type: 'integrates_with', year: 2020 },
        { target: 'ad-rate-recommendation', type: 'integrates_with', year: 2020 },
      ];
      break;

    case 'klarna':
      newRels = [
        { target: 'managed-payments', type: 'integrates_with', year: 2021 },
        { target: 'checkout', type: 'integrates_with', year: 2021 },
        { target: 'klarna-pay-in-4', type: 'related_to', year: 2021 },
        { target: 'klarna-financing', type: 'related_to', year: 2021 },
        { target: 'pay-in-4', type: 'related_to', year: 2021 },
        { target: 'afterpay', type: 'competes_with', year: 2021, desc: 'Competing BNPL options at eBay checkout' },
        { target: 'sezzle-pay-in-4', type: 'competes_with', year: 2021 },
      ];
      break;

    case 'label-printer':
      newRels = [
        { target: 'shipping-labels', type: 'depends_on', year: 2008 },
        { target: 'thermal-printer', type: 'related_to', year: 2008 },
        { target: 'print-shipping-label', type: 'integrates_with', year: 2008 },
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
        { target: 'bulk-label-printing', type: 'integrates_with', year: 2016 },
        { target: 'ebay-standard-envelope', type: 'integrates_with', year: 2020 },
      ];
      break;

    case 'language-translation':
      newRels = [
        { target: 'international-site-visibility', type: 'integrates_with', year: 2016 },
        { target: 'cross-border-trade', type: 'integrates_with', year: 2016 },
        { target: 'message-center-multi-market', type: 'integrates_with', year: 2016 },
        { target: 'listing', type: 'integrates_with', year: 2016 },
        { target: 'ebay-international-shipping', type: 'integrates_with', year: 2023 },
      ];
      break;

    case 'late-shipment-rate':
      newRels = [
        { target: 'seller-performance-standards', type: 'depends_on', year: 2014 },
        { target: 'handling-time', type: 'integrates_with', year: 2014 },
        { target: 'top-rated-seller', type: 'integrates_with', year: 2014 },
        { target: 'transaction-defect-rate', type: 'related_to', year: 2014 },
        { target: 'valid-tracking-rate', type: 'related_to', year: 2014 },
        { target: 'below-standard', type: 'integrates_with', year: 2014, desc: 'High LSR can drop seller to Below Standard' },
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
      ];
      break;

    case 'leave-feedback':
      newRels = [
        { target: 'feedback-forum', type: 'depends_on', year: 2000 },
        { target: 'feedback-left', type: 'related_to', year: 2000 },
        { target: 'positive-feedback-percentage', type: 'integrates_with', year: 2000 },
        { target: 'detailed-seller-ratings', type: 'integrates_with', year: 2008 },
        { target: 'feedback-revision-request', type: 'related_to', year: 2008 },
        { target: 'automated-feedback', type: 'related_to', year: 2020 },
      ];
      break;

    case 'linked-accounts-policy':
      newRels = [
        { target: 'trust-safety', type: 'depends_on', year: 2008 },
        { target: 'indefinite-suspension', type: 'integrates_with', year: 2008 },
        { target: 'account-suspension', type: 'integrates_with', year: 2008 },
        { target: 'account-security', type: 'integrates_with', year: 2008 },
        { target: 'seller-verification', type: 'integrates_with', year: 2018 },
      ];
      break;

    case 'list-price':
      newRels = [
        { target: 'markdown-manager', type: 'integrates_with', year: 2017, desc: 'List price displayed alongside markdown sale price' },
        { target: 'promotions-manager', type: 'integrates_with', year: 2024 },
        { target: 'competitive-pricing', type: 'integrates_with', year: 2015 },
        { target: 'price-guide', type: 'related_to', year: 2010 },
        { target: 'listing', type: 'depends_on', year: 2010 },
      ];
      break;

    case 'listing-analytics':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2015 },
        { target: 'impressions', type: 'integrates_with', year: 2015 },
        { target: 'click-through-rate', type: 'integrates_with', year: 2015 },
        { target: 'conversion-rate', type: 'integrates_with', year: 2015 },
        { target: 'traffic-report', type: 'integrates_with', year: 2015 },
        { target: 'promoted-listings-dashboard', type: 'integrates_with', year: 2015 },
        { target: 'listing-quality-report', type: 'integrates_with', year: 2018 },
      ];
      break;

    case 'listing-confirmed-notification':
      newRels = [
        { target: 'selling-activity-notifications', type: 'depends_on', year: 2005 },
        { target: 'push-notifications', type: 'integrates_with', year: 2012 },
        { target: 'email-notifications', type: 'integrates_with', year: 2005 },
        { target: 'listing', type: 'integrates_with', year: 2005 },
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
      ];
      break;

    case 'listing-designer':
      newRels = [
        { target: 'advanced-listing-tool', type: 'renamed_to', year: 2021 },
        { target: 'html-editor', type: 'integrates_with', year: 2003 },
        { target: 'listing-template', type: 'integrates_with', year: 2006 },
        { target: 'mobile-responsive-template', type: 'integrates_with', year: 2014 },
        { target: 'wysiwyg-editor', type: 'integrates_with', year: 2008 },
        { target: 'listing-tools', type: 'related_to', year: 2001 },
      ];
      break;

    case 'listing-enhancement':
      newRels = [
        { target: 'listing-upgrades', type: 'related_to', year: 2000 },
        { target: 'gallery-plus', type: 'related_to', year: 2005 },
        { target: 'subtitle', type: 'related_to', year: 2000 },
        { target: 'bold-title', type: 'related_to', year: 2000 },
        { target: 'advertising', type: 'depends_on', year: 2000 },
        { target: 'promoted-listings', type: 'competes_with', year: 2015, desc: 'PL replaced many paid listing upgrades as primary visibility tool' },
      ];
      break;

    case 'listing-error':
      newRels = [
        { target: 'listing', type: 'depends_on', year: 2000 },
        { target: 'listing-removal-notice', type: 'related_to', year: 2003 },
        { target: 'item-specifics', type: 'integrates_with', year: 2006 },
        { target: 'image-requirements', type: 'integrates_with', year: 2012 },
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
        { target: 'prohibited-items-list', type: 'integrates_with', year: 2000 },
      ];
      break;

    case 'listing-quality-report':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2018 },
        { target: 'item-specifics', type: 'integrates_with', year: 2018 },
        { target: 'selling-coach', type: 'renamed_from', year: 2018 },
        { target: 'listing-analytics', type: 'integrates_with', year: 2018 },
        { target: 'impressions', type: 'integrates_with', year: 2018 },
        { target: 'best-match', type: 'integrates_with', year: 2018, desc: 'LQR identifies gaps hurting Best Match placement' },
        { target: 'product-research', type: 'related_to', year: 2021, desc: 'Product Research provides pricing data to complement listing optimization' },
        { target: 'sourcing-insights', type: 'related_to', year: 2021, desc: 'Sourcing Insights surfaces demand-side opportunities for listing improvements' },
        { target: 'promoted-listings', type: 'integrates_with', year: 2021, desc: 'Includes Google Shopping optimization insights linked to Promoted Listings' },
      ];
      break;

    case 'listing-removal-notice':
      newRels = [
        { target: 'trust-safety', type: 'depends_on', year: 2003 },
        { target: 'vero-program', type: 'integrates_with', year: 2003 },
        { target: 'listing-error', type: 'related_to', year: 2003 },
        { target: 'account-suspension', type: 'integrates_with', year: 2003 },
        { target: 'prohibited-items-list', type: 'integrates_with', year: 2003 },
      ];
      break;

    case 'listing-template':
      newRels = [
        { target: 'listing-templates', type: 'related_to', year: 2006 },
        { target: 'template-builder', type: 'depends_on', year: 2006 },
        { target: 'listing-designer', type: 'integrates_with', year: 2006 },
        { target: 'bulk-listing-tool', type: 'integrates_with', year: 2010 },
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
        { target: 'business-policies', type: 'integrates_with', year: 2010 },
      ];
      break;

    case 'listing-templates':
      newRels = [
        { target: 'listing-template', type: 'related_to', year: 2010 },
        { target: 'seller-hub', type: 'depends_on', year: 2016 },
        { target: 'bulk-listing-tool', type: 'integrates_with', year: 2010 },
        { target: 'description-templates', type: 'related_to', year: 2010 },
        { target: 'item-specifics', type: 'integrates_with', year: 2010 },
      ];
      break;

    case 'listing-upgrades':
      newRels = [
        { target: 'listing-enhancement', type: 'related_to', year: 2000 },
        { target: 'gallery-plus', type: 'integrates_with', year: 2005 },
        { target: 'subtitle', type: 'integrates_with', year: 2000 },
        { target: 'bold-title', type: 'integrates_with', year: 2000 },
        { target: 'promoted-listings', type: 'competes_with', year: 2015 },
        { target: 'advertising', type: 'depends_on', year: 2000 },
      ];
      break;

    case 'live-chat-support':
      newRels = [
        { target: 'help-center', type: 'integrates_with', year: 2017 },
        { target: 'ebay-customer-service', type: 'depends_on', year: 2017 },
        { target: 'virtual-assistant', type: 'related_to', year: 2020 },
        { target: 'phone-support', type: 'related_to', year: 2017 },
        { target: 'resolution-center-multi-market', type: 'integrates_with', year: 2017 },
        { target: 'seller-help', type: 'integrates_with', year: 2020 },
      ];
      break;

    case 'local-delivery':
      newRels = [
        { target: 'local-pickup', type: 'related_to', year: 2020 },
        { target: 'shipping', type: 'related_to', year: 2020 },
        { target: 'checkout', type: 'integrates_with', year: 2020 },
        { target: 'shipping-calculator', type: 'integrates_with', year: 2020 },
        { target: 'local-pickup-multi-market', type: 'related_to', year: 2020 },
      ];
      break;

    case 'local-pickup':
      newRels = [
        { target: 'local-pickup-multi-market', type: 'related_to', year: 2000 },
        { target: 'in-store-pickup', type: 'related_to', year: 2014 },
        { target: 'click-and-collect', type: 'related_to', year: 2011 },
        { target: 'checkout', type: 'integrates_with', year: 2000 },
        { target: 'ship-to-store', type: 'replaced_by', year: 2014 },
        { target: 'local-delivery', type: 'related_to', year: 2020 },
        { target: 'shipping-calculator', type: 'integrates_with', year: 2000 },
      ];
      break;

    case 'local-pickup-multi-market':
      newRels = [
        { target: 'local-pickup', type: 'related_to', year: 2000 },
        { target: 'click-and-collect', type: 'related_to', year: 2011 },
        { target: 'in-store-pickup-us', type: 'related_to', year: 2017 },
        { target: 'shipping', type: 'related_to', year: 2000 },
        { target: 'checkout', type: 'integrates_with', year: 2000 },
        { target: 'ebay-uk', type: 'related_to', year: 2011 },
      ];
      break;

    case 'location-filter':
      newRels = [
        { target: 'search-filters', type: 'depends_on', year: 2004 },
        { target: 'search', type: 'depends_on', year: 2004 },
        { target: 'local-pickup', type: 'integrates_with', year: 2004 },
        { target: 'distance-nearest-first', type: 'integrates_with', year: 2010 },
        { target: 'item-location', type: 'integrates_with', year: 2004 },
        { target: 'refine-search', type: 'integrates_with', year: 2004 },
      ];
      break;

    case 'login-alerts':
      newRels = [
        { target: 'account-security', type: 'depends_on', year: 2013 },
        { target: 'two-factor-authentication', type: 'related_to', year: 2015 },
        { target: '2-step-verification', type: 'related_to', year: 2015 },
        { target: 'email-notifications', type: 'integrates_with', year: 2013 },
        { target: 'sms-notifications', type: 'integrates_with', year: 2013 },
        { target: 'passkeys', type: 'related_to', year: 2023 },
      ];
      break;

    case 'logistica-ebay-by-orange-connex':
      newRels = [
        { target: 'ebay-italy', type: 'depends_on', year: 2022 },
        { target: 'ebay-fulfilment', type: 'related_to', year: 2022, desc: 'Both are eBay-managed fulfillment services in different markets' },
        { target: 'managed-delivery', type: 'related_to', year: 2022 },
        { target: 'logistica-ebay-orange-connex', type: 'related_to', year: 2020 },
        { target: 'shipping-logistics', type: 'related_to', year: 2022 },
        { target: 'seller-hub', type: 'integrates_with', year: 2022 },
      ];
      break;

    case 'logistica-ebay-orange-connex':
      newRels = [
        { target: 'logistica-ebay-by-orange-connex', type: 'related_to', year: 2020 },
        { target: 'ebay-italy', type: 'depends_on', year: 2020 },
        { target: 'managed-delivery', type: 'related_to', year: 2020 },
        { target: 'shipping-logistics', type: 'related_to', year: 2020 },
        { target: 'ebay-fulfilment', type: 'related_to', year: 2020 },
      ];
      break;

    case 'magical-listing':
      newRels = [
        { target: 'ebay-selling-app', type: 'depends_on', year: 2022 },
        { target: 'quick-listing-tool', type: 'related_to', year: 2022, desc: 'Magical Listing is the AI-powered evolution of Quick Listing Tool' },
        { target: 'item-specifics', type: 'integrates_with', year: 2022 },
        { target: 'image-search', type: 'integrates_with', year: 2022, desc: 'Uses image recognition to auto-populate listing fields' },
        { target: 'ai-description-generator', type: 'integrates_with', year: 2023 },
        { target: 'background-enhancement', type: 'integrates_with', year: 2022 },
        { target: 'listing-tools', type: 'related_to', year: 2022 },
        { target: 'mobile-quick-list', type: 'related_to', year: 2022 },
      ];
      break;

    case 'make-an-offer':
      newRels = [
        { target: 'best-offer', type: 'integrates_with', year: 2005 },
        { target: 'make-offer', type: 'related_to', year: 2005 },
        { target: 'counter-offer', type: 'integrates_with', year: 2005 },
        { target: 'accept-offer', type: 'integrates_with', year: 2005 },
        { target: 'decline-offer', type: 'integrates_with', year: 2005 },
        { target: 'fixed-price-format', type: 'depends_on', year: 2005 },
      ];
      break;

    case 'make-offer':
      newRels = [
        { target: 'best-offer', type: 'integrates_with', year: 2005 },
        { target: 'make-an-offer', type: 'related_to', year: 2005 },
        { target: 'counter-offer', type: 'integrates_with', year: 2005 },
        { target: 'offers-to-buyers', type: 'related_to', year: 2018, desc: 'Seller-initiated vs buyer-initiated offer flows' },
        { target: 'buy-it-now', type: 'depends_on', year: 2005 },
        { target: 'fixed-price-format', type: 'depends_on', year: 2005 },
        { target: 'make-offer-multi-market', type: 'related_to', year: 2008 },
      ];
      break;

    case 'make-offer-button':
      newRels = [
        { target: 'best-offer', type: 'depends_on', year: 2005 },
        { target: 'make-offer', type: 'integrates_with', year: 2005 },
        { target: 'buy-it-now', type: 'related_to', year: 2005 },
        { target: 'offer-accepted', type: 'integrates_with', year: 2005 },
        { target: 'offer-declined', type: 'integrates_with', year: 2005 },
        { target: 'counter-offer', type: 'integrates_with', year: 2005 },
      ];
      break;

    case 'make-offer-multi-market':
      newRels = [
        { target: 'make-offer', type: 'related_to', year: 2008 },
        { target: 'best-offer-multi-market', type: 'related_to', year: 2008 },
        { target: 'listing-features', type: 'depends_on', year: 2008 },
        { target: 'counter-offer', type: 'integrates_with', year: 2008 },
        { target: 'ebay-germany', type: 'related_to', year: 2008 },
        { target: 'ebay-france', type: 'related_to', year: 2008 },
      ];
      break;

    case 'managed-delivery':
      newRels = [
        { target: 'shipping-logistics', type: 'related_to', year: 2019 },
        { target: 'ebay-fulfilment-uk', type: 'related_to', year: 2019 },
        { target: 'ebay-uk', type: 'depends_on', year: 2019 },
        { target: 'tracking-number', type: 'integrates_with', year: 2019 },
        { target: 'guaranteed-delivery', type: 'integrates_with', year: 2019 },
        { target: 'simple-delivery-uk', type: 'related_to', year: 2023 },
        { target: 'shipping', type: 'depends_on', year: 2019, desc: 'eBay Managed Delivery is a fulfillment service within the shipping umbrella' },
        { target: 'seller-hub', type: 'integrates_with', year: 2019, desc: 'Inventory and fulfillment managed through Seller Hub' },
        { target: 'inventory-management', type: 'depends_on', year: 2019, desc: 'Requires inventory management to track stock in fulfillment warehouses' },
        { target: 'shipping-partner-platform', type: 'related_to', year: 2024, desc: 'Both are eBay shipping infrastructure programs supporting sellers' },
      ];
      break;

    case 'managed-display':
      newRels = [
        { target: 'advertising', type: 'depends_on', year: 2022 },
        { target: 'promoted-listings', type: 'related_to', year: 2022 },
        { target: 'offsite-ads', type: 'related_to', year: 2022, desc: 'Both extend advertising beyond standard search placements' },
        { target: 'audience-targeting', type: 'integrates_with', year: 2022 },
        { target: 'ebay-advertising', type: 'depends_on', year: 2022 },
        { target: 'promoted-offsite', type: 'related_to', year: 2022 },
      ];
      break;

    case 'managed-payments':
      newRels = [
        { target: 'paypal', type: 'replaces', year: 2021, desc: 'Managed Payments fully replaced PayPal as eBay\'s payment system by 2021' },
        { target: 'checkout', type: 'integrates_with', year: 2018 },
        { target: 'managed-payments-multi-currency', type: 'related_to', year: 2018 },
        { target: 'instant-payout', type: 'integrates_with', year: 2020 },
        { target: 'payout-schedule', type: 'integrates_with', year: 2018 },
        { target: 'payment-dispute', type: 'integrates_with', year: 2018 },
        { target: 'seller-hub', type: 'integrates_with', year: 2018 },
        { target: 'payment-holds', type: 'integrates_with', year: 2018 },
      ];
      break;

    case 'managed-payments-multi-currency':
      newRels = [
        { target: 'managed-payments', type: 'related_to', year: 2018 },
        { target: 'currency-conversion', type: 'integrates_with', year: 2018 },
        { target: 'cross-border-trade', type: 'integrates_with', year: 2018 },
        { target: 'multi-currency-payout', type: 'integrates_with', year: 2020 },
        { target: 'vat-collection', type: 'integrates_with', year: 2018 },
        { target: 'gst-collection-australia', type: 'integrates_with', year: 2018 },
      ];
      break;

    case 'managed-returns':
      newRels = [
        { target: 'returns', type: 'depends_on', year: 2019 },
        { target: 'managed-returns-multi-market', type: 'related_to', year: 2019 },
        { target: 'ebay-money-back-guarantee', type: 'integrates_with', year: 2019 },
        { target: 'automated-return-labels', type: 'integrates_with', year: 2019 },
        { target: 'full-refund', type: 'integrates_with', year: 2019 },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2019 },
        { target: 'issue-resolution-center', type: 'integrates_with', year: 2019 },
        { target: 'seller-hub', type: 'integrates_with', year: 2025, desc: 'Return automation rules and labels managed through Seller Hub' },
        { target: 'shipping', type: 'integrates_with', year: 2025, desc: 'Return labels use eBay-negotiated carrier rates' },
        { target: 'buyer-protection', type: 'related_to', year: 2025, desc: 'Managed Returns supports buyer protection by ensuring consistent return processes' },
      ];
      break;

    case 'managed-returns-multi-market':
      newRels = [
        { target: 'managed-returns', type: 'related_to', year: 2019 },
        { target: 'returns', type: 'depends_on', year: 2019 },
        { target: 'automated-return-labels', type: 'integrates_with', year: 2019 },
        { target: 'eu-consumer-rights-directive', type: 'integrates_with', year: 2019 },
        { target: 'ebay-money-back-guarantee', type: 'integrates_with', year: 2019 },
        { target: 'ebay-germany', type: 'related_to', year: 2019 },
      ];
      break;

    case 'mark-as-shipped':
      newRels = [
        { target: 'order-management', type: 'depends_on', year: 2010 },
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
        { target: 'tracking-number', type: 'integrates_with', year: 2010 },
        { target: 'shipment-confirmation', type: 'integrates_with', year: 2010 },
        { target: 'payment-received', type: 'integrates_with', year: 2010, desc: 'Marking as shipped releases payment hold timeline' },
        { target: 'handling-time', type: 'integrates_with', year: 2010 },
      ];
      break;

    case 'markdown-manager':
      newRels = [
        { target: 'promotions-manager', type: 'renamed_to', year: 2024 },
        { target: 'sale-events', type: 'integrates_with', year: 2017 },
        { target: 'seller-hub', type: 'depends_on', year: 2017 },
        { target: 'discounts-manager', type: 'related_to', year: 2017 },
        { target: 'list-price', type: 'integrates_with', year: 2017 },
      ];
      break;

    case 'matching-categories':
      newRels = [
        { target: 'search', type: 'depends_on', year: 2008 },
        { target: 'cassini', type: 'integrates_with', year: 2008 },
        { target: 'browse-categories', type: 'related_to', year: 2008 },
        { target: 'refine-search', type: 'integrates_with', year: 2008 },
        { target: 'search-filters', type: 'integrates_with', year: 2008 },
      ];
      break;

    case 'maximum-bid':
      newRels = [
        { target: 'automatic-bidding', type: 'related_to', year: 1995 },
        { target: 'proxy-bidding', type: 'integrates_with', year: 1995, desc: 'Maximum bid triggers proxy/automatic bidding' },
        { target: 'auction-format', type: 'depends_on', year: 1995 },
        { target: 'bid-increment', type: 'integrates_with', year: 1995 },
        { target: 'outbid-notification', type: 'integrates_with', year: 1995 },
        { target: 'reserve-price', type: 'integrates_with', year: 1995 },
      ];
      break;

    case 'merchant-integration-platform':
      newRels = [
        { target: 'developer-platform', type: 'depends_on', year: 2015 },
        { target: 'ebay-developers-program', type: 'integrates_with', year: 2015 },
        { target: 'inventory-management', type: 'integrates_with', year: 2015 },
        { target: 'seller-hub', type: 'integrates_with', year: 2016 },
        { target: 'bulk-listing-tool', type: 'integrates_with', year: 2015 },
        { target: 'third-party-providers', type: 'related_to', year: 2015 },
        { target: 'inventory-mapping-api', type: 'integrates_with', year: 2020 },
      ];
      break;

    case 'message-buyer':
      newRels = [
        { target: 'message-center', type: 'depends_on', year: 2016 },
        { target: 'seller-hub', type: 'depends_on', year: 2016 },
        { target: 'in-app-messaging', type: 'integrates_with', year: 2016 },
        { target: 'order-management', type: 'integrates_with', year: 2016 },
        { target: 'ebay-ai-message-assistance', type: 'integrates_with', year: 2023 },
      ];
      break;

    case 'message-center':
      newRels = [
        { target: 'message-center-multi-market', type: 'related_to', year: 2008 },
        { target: 'in-app-messaging', type: 'integrates_with', year: 2015 },
        { target: 'ask-seller-question', type: 'integrates_with', year: 2005 },
        { target: 'message-buyer', type: 'integrates_with', year: 2016 },
        { target: 'ebay-ai-message-assistance', type: 'integrates_with', year: 2023 },
        { target: 'offers-in-messaging', type: 'integrates_with', year: 2023 },
      ];
      break;

    case 'message-center-multi-market':
      newRels = [
        { target: 'message-center', type: 'related_to', year: 2008 },
        { target: 'language-translation', type: 'integrates_with', year: 2016 },
        { target: 'ebay-germany', type: 'related_to', year: 2008 },
        { target: 'in-app-messaging', type: 'integrates_with', year: 2015 },
        { target: 'customer-service', type: 'depends_on', year: 2008 },
        { target: 'ai-assistant-messaging', type: 'integrates_with', year: 2023 },
      ];
      break;

    case 'mobile-analytics':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2018 },
        { target: 'mobile-seller-hub', type: 'depends_on', year: 2018 },
        { target: 'listing-analytics', type: 'integrates_with', year: 2018 },
        { target: 'promoted-listings-dashboard', type: 'integrates_with', year: 2018 },
        { target: 'sales-report', type: 'integrates_with', year: 2018 },
        { target: 'traffic-report', type: 'integrates_with', year: 2018 },
      ];
      break;

    case 'mobile-checkout':
      newRels = [
        { target: 'checkout', type: 'related_to', year: 2014 },
        { target: 'apple-pay', type: 'integrates_with', year: 2018 },
        { target: 'google-pay', type: 'integrates_with', year: 2020 },
        { target: 'managed-payments', type: 'depends_on', year: 2018 },
        { target: 'ebay-mobile-app', type: 'depends_on', year: 2014 },
        { target: 'guest-checkout', type: 'integrates_with', year: 2015 },
      ];
      break;

    case 'mobile-deals':
      newRels = [
        { target: 'ebay-deals', type: 'depends_on', year: 2019 },
        { target: 'ebay-mobile-app', type: 'depends_on', year: 2019 },
        { target: 'push-notifications', type: 'integrates_with', year: 2019 },
        { target: 'flash-deals', type: 'related_to', year: 2019 },
        { target: 'daily-deals', type: 'related_to', year: 2019 },
        { target: 'featured-deals', type: 'related_to', year: 2019 },
      ];
      break;

    case 'mobile-notifications':
      newRels = [
        { target: 'push-notifications', type: 'depends_on', year: 2012 },
        { target: 'ebay-mobile-app', type: 'depends_on', year: 2012 },
        { target: 'selling-activity-notifications', type: 'integrates_with', year: 2015 },
        { target: 'outbid-notification', type: 'integrates_with', year: 2012 },
        { target: 'notification-settings', type: 'integrates_with', year: 2013 },
        { target: 'mobile-deals', type: 'integrates_with', year: 2019 },
      ];
      break;

    case 'mobile-photo-editor':
      newRels = [
        { target: 'listing', type: 'integrates_with', year: 2020 },
        { target: 'ebay-mobile-app', type: 'depends_on', year: 2020 },
        { target: 'background-enhancement', type: 'integrates_with', year: 2020 },
        { target: 'photo-background-removal', type: 'related_to', year: 2020 },
        { target: 'photo-enhancement', type: 'related_to', year: 2020 },
        { target: 'magical-listing', type: 'integrates_with', year: 2022 },
      ];
      break;

    case 'mobile-quick-list':
      newRels = [
        { target: 'ebay-mobile-app', type: 'depends_on', year: 2019 },
        { target: 'quick-listing-tool', type: 'related_to', year: 2019 },
        { target: 'magical-listing', type: 'related_to', year: 2022, desc: 'Magical Listing evolved from Mobile Quick List with AI' },
        { target: 'image-search', type: 'integrates_with', year: 2019 },
        { target: 'barcode-scanner', type: 'integrates_with', year: 2019 },
        { target: 'item-specifics', type: 'integrates_with', year: 2019 },
      ];
      break;

    case 'mobile-responsive-template':
      newRels = [
        { target: 'listing-designer', type: 'depends_on', year: 2014 },
        { target: 'mobile-responsive-templates', type: 'related_to', year: 2014 },
        { target: 'html-editor', type: 'integrates_with', year: 2014 },
        { target: 'ebay-mobile-app', type: 'related_to', year: 2014 },
        { target: 'mobile-web', type: 'related_to', year: 2014 },
        { target: 'active-content-policy', type: 'integrates_with', year: 2017 },
      ];
      break;

    case 'mobile-responsive-templates':
      newRels = [
        { target: 'mobile-responsive-template', type: 'depends_on', year: 2014 },
        { target: 'listing-designer', type: 'integrates_with', year: 2014 },
        { target: 'template-builder', type: 'integrates_with', year: 2014 },
        { target: 'html-editor', type: 'integrates_with', year: 2014 },
      ];
      break;

    case 'mobile-seller-hub':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2017 },
        { target: 'ebay-mobile-app', type: 'depends_on', year: 2017 },
        { target: 'mobile-analytics', type: 'integrates_with', year: 2018 },
        { target: 'order-management', type: 'integrates_with', year: 2017 },
        { target: 'mark-as-shipped', type: 'integrates_with', year: 2017 },
        { target: 'message-buyer', type: 'integrates_with', year: 2017 },
      ];
      break;

    case 'mobile-web':
      newRels = [
        { target: 'ebay-mobile-app', type: 'competes_with', year: 2011, desc: 'Mobile web is lighter alternative to native app' },
        { target: 'mobile-checkout', type: 'integrates_with', year: 2014 },
        { target: 'buyer', type: 'related_to', year: 2011 },
        { target: 'search', type: 'integrates_with', year: 2011 },
        { target: 'mobile-responsive-template', type: 'integrates_with', year: 2014 },
      ];
      break;

    case 'money-back-guarantee':
      newRels = [
        { target: 'ebay-money-back-guarantee', type: 'related_to', year: 2011 },
        { target: 'money-back-guarantee-multi-market', type: 'related_to', year: 2011 },
        { target: 'buyer-protection', type: 'integrates_with', year: 1999 },
        { target: 'trust-safety', type: 'depends_on', year: 1999 },
        { target: 'full-refund', type: 'integrates_with', year: 1999 },
        { target: 'managed-returns', type: 'integrates_with', year: 2019 },
        { target: 'item-not-received', type: 'integrates_with', year: 2011 },
      ];
      break;

    case 'money-back-guarantee-multi-market':
      newRels = [
        { target: 'ebay-money-back-guarantee', type: 'related_to', year: 2011 },
        { target: 'money-back-guarantee', type: 'related_to', year: 2011 },
        { target: 'buyer-protection', type: 'depends_on', year: 2011 },
        { target: 'eu-consumer-rights-directive', type: 'integrates_with', year: 2015 },
        { target: 'managed-returns-multi-market', type: 'integrates_with', year: 2019 },
        { target: 'ebay-australia', type: 'related_to', year: 2011 },
      ];
      break;

    case 'more-from-this-seller':
      newRels = [
        { target: 'ebay-stores', type: 'integrates_with', year: 2012 },
        { target: 'follow-seller', type: 'related_to', year: 2012 },
        { target: 'buyer', type: 'related_to', year: 2012 },
        { target: 'similar-items', type: 'related_to', year: 2012 },
        { target: 'item-no-longer-available', type: 'integrates_with', year: 2012 },
      ];
      break;

    case 'mothers-day-gifts':
      newRels = [
        { target: 'fathers-day-gifts', type: 'related_to', year: 2008, desc: 'Parallel seasonal gift campaigns' },
        { target: 'holiday-gift-guide', type: 'related_to', year: 2008 },
        { target: 'guaranteed-delivery', type: 'integrates_with', year: 2016 },
        { target: 'marketing', type: 'depends_on', year: 2008 },
        { target: 'ebay-deals', type: 'integrates_with', year: 2008 },
      ];
      break;

    case 'multi-variation-listing':
      newRels = [
        { target: 'listing', type: 'depends_on', year: 2011 },
        { target: 'multi-variation-listings', type: 'related_to', year: 2011 },
        { target: 'variation-photos', type: 'integrates_with', year: 2011 },
        { target: 'variation-specifics', type: 'integrates_with', year: 2011 },
        { target: 'inventory-management', type: 'integrates_with', year: 2016 },
        { target: 'out-of-stock-control', type: 'integrates_with', year: 2016 },
        { target: 'item-specifics', type: 'integrates_with', year: 2011 },
      ];
      break;

    case 'multi-variation-listings':
      newRels = [
        { target: 'multi-variation-listing', type: 'related_to', year: 2011 },
        { target: 'variation-photos', type: 'integrates_with', year: 2011 },
        { target: 'variation-specifics', type: 'integrates_with', year: 2011 },
        { target: 'inventory-management', type: 'integrates_with', year: 2016 },
        { target: 'listing', type: 'depends_on', year: 2011 },
      ];
      break;

    case 'mutual-feedback-withdrawal':
      newRels = [
        { target: 'feedback-forum', type: 'depends_on', year: 2008 },
        { target: 'feedback-revision-request', type: 'related_to', year: 2008 },
        { target: 'resolution-center-multi-market', type: 'integrates_with', year: 2010 },
        { target: 'positive-feedback-percentage', type: 'integrates_with', year: 2008 },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2014 },
      ];
      break;

    case 'my-collection':
      newRels = [
        { target: 'collections', type: 'depends_on', year: 2021 },
        { target: 'hand-picked-collections', type: 'related_to', year: 2021 },
        { target: 'trading-card-hub', type: 'integrates_with', year: 2021 },
        { target: 'ebay-vault', type: 'integrates_with', year: 2022, desc: 'My Collection tracks items stored in eBay Vault' },
        { target: 'psa-grading-integration', type: 'integrates_with', year: 2021 },
        { target: 'collectibles-trading', type: 'related_to', year: 2021 },
        { target: 'purchase-history', type: 'integrates_with', year: 2021 },
        { target: 'collectibles', type: 'depends_on', year: 2020, desc: 'My Collection is a feature under the Collectibles umbrella' },
        { target: 'vault', type: 'integrates_with', year: 2022, desc: 'My Collection can track items stored in the Vault' },
        { target: 'authenticity-guarantee', type: 'integrates_with', year: 2020, desc: 'AG authentication status can be reflected in collection tracking' },
        { target: 'tcgplayer', type: 'integrates_with', year: 2022, desc: 'TCGplayer cards can be managed within My Collection' },
        { target: 'discovery', type: 'integrates_with', year: 2020, desc: 'Collection data informs personalized discovery recommendations' },
      ];
      break;

    case 'my-ebay':
      newRels = [
        { target: 'seller-hub', type: 'related_to', year: 2016, desc: 'My eBay Selling section evolved into Seller Hub' },
        { target: 'watchlist', type: 'integrates_with', year: 1999 },
        { target: 'items-watched', type: 'integrates_with', year: 2002 },
        { target: 'purchase-history', type: 'integrates_with', year: 1999 },
        { target: 'my-ebay-summary', type: 'integrates_with', year: 2001 },
        { target: 'saved-searches', type: 'integrates_with', year: 2000 },
        { target: 'buyer', type: 'depends_on', year: 1999 },
        { target: 'notification-settings', type: 'integrates_with', year: 2013 },
      ];
      break;

    case 'my-ebay-summary':
      newRels = [
        { target: 'my-ebay', type: 'depends_on', year: 2001 },
        { target: 'watchlist', type: 'integrates_with', year: 2001 },
        { target: 'purchase-history', type: 'integrates_with', year: 2001 },
        { target: 'message-center', type: 'integrates_with', year: 2005 },
        { target: 'seller-hub', type: 'related_to', year: 2016 },
        { target: 'active-listings', type: 'integrates_with', year: 2001 },
      ];
      break;

    case 'my-garage':
      newRels = [
        { target: 'ebay-motors', type: 'depends_on', year: 2010 },
        { target: 'parts-compatibility', type: 'integrates_with', year: 2010 },
        { target: 'fitment-compatibility', type: 'integrates_with', year: 2010 },
        { target: 'guaranteed-fit', type: 'integrates_with', year: 2019 },
        { target: 'vin-lookup', type: 'integrates_with', year: 2015 },
        { target: 'ebay-motors-parts', type: 'integrates_with', year: 2010 },
        { target: 'fitment-plus', type: 'integrates_with', year: 2015 },
      ];
      break;

    case 'new-seller-journey':
      newRels = [
        { target: 'seller-hub', type: 'integrates_with', year: 2021 },
        { target: 'ebay-academy', type: 'integrates_with', year: 2021 },
        { target: 'quick-listing-tool', type: 'integrates_with', year: 2021 },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2021 },
        { target: 'feedback-forum', type: 'integrates_with', year: 2021 },
        { target: 'seller-help', type: 'integrates_with', year: 2021 },
        { target: 'education', type: 'depends_on', year: 2021 },
      ];
      break;

    case 'newly-listed':
      newRels = [
        { target: 'search', type: 'depends_on', year: 2004 },
        { target: 'sort-by', type: 'integrates_with', year: 2004 },
        { target: 'best-match', type: 'related_to', year: 2008 },
        { target: 'saved-searches', type: 'integrates_with', year: 2004 },
        { target: 'get-alerts', type: 'integrates_with', year: 2015 },
      ];
      break;

    case 'no-bids':
      newRels = [
        { target: 'auction-format', type: 'depends_on', year: 1995 },
        { target: 'bidding', type: 'related_to', year: 1995 },
        { target: 'starting-bid', type: 'related_to', year: 1995 },
        { target: 'second-chance-offer', type: 'related_to', year: 2002 },
      ];
      break;

    case 'no-returns-accepted':
      newRels = [
        { target: '30-day-returns', type: 'renamed_to', year: 2022, desc: 'eBay mandated 30-day returns, replacing no-returns option' },
        { target: 'returns', type: 'related_to', year: 2005 },
        { target: 'ebay-money-back-guarantee', type: 'related_to', year: 2011, desc: 'MBG overrides no-returns listings for item not as described' },
      ];
      break;

    case 'notification-preferences':
      newRels = [
        { target: 'notification-settings', type: 'related_to', year: 2013 },
        { target: 'push-notifications', type: 'integrates_with', year: 2013 },
        { target: 'email-notifications', type: 'integrates_with', year: 2013 },
        { target: 'sms-notifications', type: 'integrates_with', year: 2013 },
        { target: 'account-settings', type: 'depends_on', year: 2013 },
        { target: 'mobile-notifications', type: 'integrates_with', year: 2013 },
      ];
      break;

    case 'notification-settings':
      newRels = [
        { target: 'notification-preferences', type: 'related_to', year: 2013 },
        { target: 'account-settings', type: 'depends_on', year: 2013 },
        { target: 'push-notifications', type: 'integrates_with', year: 2013 },
        { target: 'email-notifications', type: 'integrates_with', year: 2013 },
        { target: 'sms-notifications', type: 'integrates_with', year: 2013 },
        { target: 'mobile-notifications', type: 'integrates_with', year: 2013 },
      ];
      break;

    case 'notify-me':
      newRels = [
        { target: 'back-in-stock', type: 'integrates_with', year: 2018 },
        { target: 'push-notifications', type: 'integrates_with', year: 2018 },
        { target: 'get-alerts', type: 'related_to', year: 2018 },
        { target: 'buyer', type: 'related_to', year: 2018 },
        { target: 'saved-searches', type: 'integrates_with', year: 2018 },
      ];
      break;

    case 'number-of-bids':
      newRels = [
        { target: 'auction-format', type: 'depends_on', year: 1995 },
        { target: 'bidding', type: 'depends_on', year: 1995 },
        { target: 'bid-increment', type: 'integrates_with', year: 1995 },
        { target: 'current-bid', type: 'related_to', year: 1995 },
        { target: 'proxy-bidding', type: 'integrates_with', year: 1995 },
      ];
      break;

    case 'offer-accepted':
      newRels = [
        { target: 'best-offer', type: 'depends_on', year: 2005 },
        { target: 'make-offer', type: 'integrates_with', year: 2005 },
        { target: 'checkout', type: 'integrates_with', year: 2005, desc: 'Accepted offer redirects buyer to checkout' },
        { target: 'offers-to-buyers', type: 'related_to', year: 2018 },
        { target: 'offer-declined', type: 'related_to', year: 2005 },
        { target: 'counter-offer', type: 'related_to', year: 2005 },
      ];
      break;

    case 'offer-declined':
      newRels = [
        { target: 'best-offer', type: 'depends_on', year: 2005 },
        { target: 'offer-accepted', type: 'related_to', year: 2005 },
        { target: 'counter-offer', type: 'related_to', year: 2005 },
        { target: 'make-offer', type: 'integrates_with', year: 2005 },
        { target: 'offers-to-buyers', type: 'related_to', year: 2018 },
      ];
      break;

    case 'offer-expires':
      newRels = [
        { target: 'best-offer', type: 'integrates_with', year: 2005, desc: 'Offer Expires is a sub-state of the Best Offer flow; timer auto-declines when 48h elapses' },
        { target: 'offer-accepted', type: 'related_to', year: 2005, desc: 'Possible outcome states of a pending offer' },
        { target: 'offer-declined', type: 'related_to', year: 2005, desc: 'Possible outcome states of a pending offer' },
        { target: 'offer-sent', type: 'related_to', year: 2005, desc: 'Offer Expires follows Offer Sent when seller does not respond' },
        { target: 'offers-received', type: 'related_to', year: 2005, desc: 'Offers Received surface in seller UI; expiration clears them' },
        { target: 'make-an-offer', type: 'integrates_with', year: 2005, desc: 'Make An Offer button initiates the flow that ends in Offer Expires' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Seller Hub surfaces expiring offers in the Offers tab' },
        { target: 'push-notifications', type: 'integrates_with', year: 2015, desc: 'Push notification reminds seller before offer expires' },
      ];
      break;

    case 'offer-history':
      newRels = [
        { target: 'best-offer', type: 'integrates_with', year: 2005, desc: 'Offer History is the audit trail within the Best Offer system' },
        { target: 'offers-received', type: 'related_to', year: 2005, desc: 'Offers Received feeds the history log' },
        { target: 'offers-sent', type: 'related_to', year: 2018, desc: 'Seller-initiated offers also tracked in Offer History' },
        { target: 'counter-offer', type: 'related_to', year: 2008, desc: 'Counter-offer events are recorded in Offer History' },
        { target: 'offer-accepted', type: 'related_to', year: 2005, desc: 'Accepted offers are final entries in Offer History' },
        { target: 'offer-declined', type: 'related_to', year: 2005, desc: 'Declined offers are recorded in Offer History' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Seller Hub exposes Offer History under Orders/Offers tab' },
        { target: 'my-ebay', type: 'integrates_with', year: 2005, desc: 'Buyers view offer history inside My eBay' },
      ];
      break;

    case 'offer-sent':
      newRels = [
        { target: 'best-offer', type: 'integrates_with', year: 2005, desc: 'Offer Sent is the confirmation state after buyer submits a Best Offer' },
        { target: 'offer-expires', type: 'related_to', year: 2005, desc: 'Offer Sent precedes Offer Expires if seller does not respond' },
        { target: 'offer-accepted', type: 'related_to', year: 2005, desc: 'Offer Sent can resolve to Offer Accepted' },
        { target: 'offer-declined', type: 'related_to', year: 2005, desc: 'Offer Sent can resolve to Offer Declined' },
        { target: 'make-an-offer', type: 'integrates_with', year: 2005, desc: 'Make An Offer action triggers Offer Sent status' },
        { target: 'push-notifications', type: 'integrates_with', year: 2015, desc: 'Seller receives push notification when an offer is sent' },
        { target: 'message-center', type: 'related_to', year: 2010, desc: 'Offer messages appear in Message Center thread' },
      ];
      break;

    case 'offers-received':
      newRels = [
        { target: 'best-offer', type: 'integrates_with', year: 2005, desc: 'Offers Received is the seller view of the Best Offer inbox' },
        { target: 'accept-offer', type: 'related_to', year: 2005, desc: 'Seller acts on received offers via Accept Offer' },
        { target: 'decline-offer', type: 'related_to', year: 2005, desc: 'Seller can decline offers from Offers Received view' },
        { target: 'counter-offer', type: 'related_to', year: 2008, desc: 'Seller can counter from Offers Received panel' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Seller Hub aggregates all Offers Received in one dashboard' },
        { target: 'offer-history', type: 'related_to', year: 2005, desc: 'Each received offer is logged in Offer History' },
        { target: 'offers-to-buyers', type: 'related_to', year: 2016, desc: 'Offers Received (buyer-initiated) complements Offers to Buyers (seller-initiated)' },
        { target: 'push-notifications', type: 'integrates_with', year: 2015, desc: 'Seller notified via push when new offer received' },
      ];
      break;

    case 'offers-sent':
      newRels = [
        { target: 'best-offer', type: 'integrates_with', year: 2018, desc: 'Offers Sent tracks seller-initiated Best Offer outreach' },
        { target: 'offers-to-buyers', type: 'related_to', year: 2018, desc: 'Offers Sent is a buyer-view record of Offers to Buyers campaigns' },
        { target: 'offers-to-watchers', type: 'related_to', year: 2018, desc: 'Offers to Watchers generates entries in Offers Sent' },
        { target: 'seller-hub', type: 'integrates_with', year: 2018, desc: 'Seller Hub tracks Offers Sent performance metrics' },
        { target: 'watchlist', type: 'integrates_with', year: 2018, desc: 'Watchers of a listing are the primary target for Offers Sent' },
        { target: 'promotions-manager', type: 'related_to', year: 2019, desc: 'Promotions Manager and Offers Sent are both seller outreach tools' },
      ];
      break;

    case 'offers-to-buyers':
      newRels = [
        { target: 'best-offer', type: 'integrates_with', year: 2016, desc: 'Offers to Buyers extends Best Offer to seller-initiated outreach' },
        { target: 'offers-to-watchers', type: 'related_to', year: 2016, desc: 'Offers to Watchers and Offers to Buyers are the two seller offer types' },
        { target: 'offers-to-buyers-multi-market', type: 'related_to', year: 2016, desc: 'Multi-market variant of same feature' },
        { target: 'promotions-manager', type: 'integrates_with', year: 2019, desc: 'Promotions Manager houses Offers to Buyers alongside other discount tools' },
        { target: 'discounts-manager', type: 'integrates_with', year: 2019, desc: 'Discounts Manager surfaces Offers to Buyers configuration' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Seller Hub Marketing tab is where sellers create Offers to Buyers' },
        { target: 'watchlist', type: 'depends_on', year: 2016, desc: 'Watchers list is the primary audience pool for Offers to Buyers' },
        { target: 'seller-initiated-offers', type: 'related_to', year: 2018, desc: 'US branding of the same seller-initiated offer concept' },
        { target: 'ebay-stores', type: 'related_to', year: 2016, desc: 'Store sellers use Offers to Buyers to drive repeat business' },
      ];
      break;

    case 'offers-to-buyers-multi-market':
      newRels = [
        { target: 'offers-to-buyers', type: 'related_to', year: 2016, desc: 'Multi-market variant of Offers to Buyers' },
        { target: 'discounts-manager-multi-market', type: 'integrates_with', year: 2019, desc: 'Accessed via Discounts Manager in multi-market seller tools' },
        { target: 'best-offer', type: 'integrates_with', year: 2016, desc: 'Part of the Best Offer / seller offer ecosystem' },
        { target: 'offers-to-watchers-multi-market', type: 'related_to', year: 2017, desc: 'Sister feature for watcher-targeted offers in same multi-market toolset' },
        { target: 'seller-hub-multi-market', type: 'integrates_with', year: 2017, desc: 'Multi-market Seller Hub exposes this feature' },
        { target: 'promotions-manager', type: 'integrates_with', year: 2019, desc: 'Promotions Manager is the parent platform' },
      ];
      break;

    case 'offers-to-watchers':
      newRels = [
        { target: 'watchlist', type: 'depends_on', year: 2016, desc: 'Offers to Watchers requires items to have watchers' },
        { target: 'offers-to-buyers', type: 'related_to', year: 2016, desc: 'Parallel seller offer type; watchers vs past buyers' },
        { target: 'best-offer', type: 'integrates_with', year: 2016, desc: 'Operates within the Best Offer negotiation framework' },
        { target: 'promotions-manager', type: 'integrates_with', year: 2019, desc: 'Promotions Manager is the admin UI for this feature' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Seller Hub Marketing tab enables watcher offer creation' },
        { target: 'offers-to-watchers-multi-market', type: 'related_to', year: 2017, desc: 'Multi-market variant of this feature' },
        { target: 'push-notifications', type: 'integrates_with', year: 2016, desc: 'Watcher receives push alert when seller sends an offer' },
      ];
      break;

    case 'offers-to-watchers-multi-market':
      newRels = [
        { target: 'offers-to-watchers', type: 'related_to', year: 2017, desc: 'Multi-market variant of Offers to Watchers' },
        { target: 'discounts-manager-multi-market', type: 'integrates_with', year: 2019, desc: 'Configured via Discounts Manager in international markets' },
        { target: 'watchlist', type: 'depends_on', year: 2017, desc: 'Requires watchers on a listing to target' },
        { target: 'offers-to-buyers-multi-market', type: 'related_to', year: 2017, desc: 'Companion feature for buyer-targeted offers' },
        { target: 'seller-hub-multi-market', type: 'integrates_with', year: 2017, desc: 'Available through multi-market Seller Hub' },
      ];
      break;

    case 'offsite-ads':
      newRels = [
        { target: 'promoted-listings', type: 'related_to', year: 2020, desc: 'Both are eBay advertising products; Offsite Ads targets external channels' },
        { target: 'offsite-ads-opt-out', type: 'related_to', year: 2020, desc: 'Opt-out is the eligibility control for Offsite Ads' },
        { target: 'promoted-offsite', type: 'related_to', year: 2020, desc: 'Promoted Offsite is the seller-controlled counterpart to mandatory Offsite Ads' },
        { target: 'ebay-advertising', type: 'integrates_with', year: 2020, desc: 'Offsite Ads is part of the eBay Advertising portfolio' },
        { target: 'seller-hub', type: 'integrates_with', year: 2020, desc: 'Seller Hub shows Offsite Ads performance metrics' },
        { target: 'ad-fee', type: 'related_to', year: 2020, desc: 'Offsite Ads charges 8-12% ad fee on converted sales' },
        { target: 'managed-payments', type: 'depends_on', year: 2020, desc: 'Offsite Ads fees collected through Managed Payments' },
        { target: 'promoted-listings-advanced', type: 'competes_with', year: 2020, desc: 'Both drive external/premium traffic but with different models' },
      ];
      break;

    case 'offsite-ads-opt-out':
      newRels = [
        { target: 'offsite-ads', type: 'related_to', year: 2020, desc: 'Opt-out controls participation in Offsite Ads program' },
        { target: 'ad-fee', type: 'related_to', year: 2020, desc: 'Opting out avoids the 12% ad fee for sub-$10K sellers' },
        { target: 'seller-hub', type: 'integrates_with', year: 2020, desc: 'Opt-out toggle is found in Seller Hub advertising settings' },
        { target: 'seller-performance-standards', type: 'related_to', year: 2020, desc: 'High-performing sellers above $10K threshold cannot opt out' },
      ];
      break;

    case 'open-box':
      newRels = [
        { target: 'certified-open-box', type: 'related_to', year: 2015, desc: 'Certified Open Box is the verified-quality version of Open Box' },
        { target: 'ebay-refurbished', type: 'related_to', year: 2015, desc: 'Open Box is a condition category within refurbished/used spectrum' },
        { target: 'refurbished-open-box', type: 'related_to', year: 2015, desc: 'Open Box falls under the Refurbished & Open Box umbrella' },
        { target: 'item-condition', type: 'integrates_with', year: 2015, desc: 'Open Box is a selectable item condition in listing flow' },
        { target: 'condition-filter', type: 'integrates_with', year: 2015, desc: 'Buyers filter by Open Box condition in search' },
        { target: 'seller-refurbished', type: 'related_to', year: 2015, desc: 'Both are non-new condition tiers for used/returned goods' },
      ];
      break;

    case 'order-details':
      newRels = [
        { target: 'my-ebay', type: 'integrates_with', year: 2010, desc: 'Order Details accessible from My eBay purchase history' },
        { target: 'purchase-history', type: 'integrates_with', year: 2010, desc: 'Order Details is the drill-down view from Purchase History' },
        { target: 'order-updates', type: 'related_to', year: 2014, desc: 'Order Updates notifications link back to Order Details' },
        { target: 'package-tracking', type: 'integrates_with', year: 2013, desc: 'Package tracking information embedded in Order Details' },
        { target: 'request-return', type: 'integrates_with', year: 2013, desc: 'Return Request button lives within Order Details' },
        { target: 'managed-payments', type: 'integrates_with', year: 2018, desc: 'Payment status shown in Order Details via Managed Payments' },
        { target: 'cancel-order', type: 'integrates_with', year: 2013, desc: 'Cancel Order action accessible from Order Details' },
        { target: 'contact-seller', type: 'integrates_with', year: 2010, desc: 'Contact Seller link surfaces in Order Details page' },
      ];
      break;

    case 'order-discounts':
      newRels = [
        { target: 'promotions-manager', type: 'integrates_with', year: 2019, desc: 'Order Discounts created and managed in Promotions Manager' },
        { target: 'order-discounts-multi-market', type: 'related_to', year: 2019, desc: 'Multi-market variant of Order Discounts' },
        { target: 'checkout', type: 'integrates_with', year: 2019, desc: 'Order Discounts applied automatically at checkout' },
        { target: 'shipping-discounts', type: 'related_to', year: 2019, desc: 'Companion discount type in promotions toolkit' },
        { target: 'volume-pricing', type: 'related_to', year: 2019, desc: 'Volume Pricing and Order Discounts both reward higher cart values' },
        { target: 'sale-events', type: 'related_to', year: 2019, desc: 'Order Discounts can be part of broader Sale Events campaigns' },
        { target: 'seller-hub', type: 'integrates_with', year: 2019, desc: 'Seller Hub Marketing tab hosts Order Discounts setup' },
        { target: 'discounts-manager', type: 'depends_on', year: 2015, desc: 'Order Discounts is a tool within Discounts Manager' },
        { target: 'ebay-stores', type: 'depends_on', year: 2015, desc: 'Requires eBay Store subscription' },
      ];
      break;

    case 'order-discounts-multi-market':
      newRels = [
        { target: 'order-discounts', type: 'related_to', year: 2019, desc: 'Multi-market naming variant of Order Discounts' },
        { target: 'discounts-manager-multi-market', type: 'integrates_with', year: 2019, desc: 'Configured via Discounts Manager across international sites' },
        { target: 'promotions-manager', type: 'integrates_with', year: 2019, desc: 'Part of Promotions Manager ecosystem' },
        { target: 'checkout', type: 'integrates_with', year: 2019, desc: 'Discount applies at checkout for qualifying cart totals' },
        { target: 'shipping-discounts-multi-market', type: 'related_to', year: 2019, desc: 'Companion multi-market discount type' },
      ];
      break;

    case 'order-report':
      newRels = [
        { target: 'seller-hub', type: 'integrates_with', year: 2010, desc: 'Order Reports accessible from Seller Hub Reports section' },
        { target: 'seller-hub-reports', type: 'integrates_with', year: 2017, desc: 'Order Report is one of the Seller Hub report types' },
        { target: 'sales-report', type: 'related_to', year: 2010, desc: 'Sales Report and Order Report provide complementary data' },
        { target: 'managed-payments', type: 'integrates_with', year: 2018, desc: 'Order Report includes payment status from Managed Payments' },
        { target: 'shipping-labels', type: 'related_to', year: 2013, desc: 'Order Report cross-references label generation and shipment data' },
        { target: 'analytics', type: 'integrates_with', year: 2010, desc: 'Order Report is part of the seller analytics suite' },
      ];
      break;

    case 'order-total':
      newRels = [
        { target: 'checkout', type: 'integrates_with', year: 2000, desc: 'Order Total displayed at final checkout step' },
        { target: 'managed-payments', type: 'integrates_with', year: 2018, desc: 'Managed Payments processes Order Total amount' },
        { target: 'sales-tax-collection', type: 'integrates_with', year: 2019, desc: 'Sales tax added to Order Total automatically' },
        { target: 'shipping-cost', type: 'integrates_with', year: 2000, desc: 'Shipping Cost is a component of the Order Total calculation' },
        { target: 'combined-shipping-discount', type: 'integrates_with', year: 2005, desc: 'Combined Shipping Discount reduces the Order Total' },
        { target: 'order-discounts', type: 'integrates_with', year: 2019, desc: 'Order Discounts reduce the Order Total at checkout' },
      ];
      break;

    case 'order-updates':
      newRels = [
        { target: 'push-notifications', type: 'integrates_with', year: 2014, desc: 'Order Updates delivered via push notifications on mobile' },
        { target: 'email-notifications', type: 'integrates_with', year: 2014, desc: 'Order Updates also sent as email alerts' },
        { target: 'package-tracking', type: 'integrates_with', year: 2014, desc: 'Package tracking events trigger Order Update notifications' },
        { target: 'order-details', type: 'integrates_with', year: 2014, desc: 'Order Update notifications deep-link to Order Details page' },
        { target: 'delivery-status', type: 'integrates_with', year: 2014, desc: 'Delivery status changes generate Order Update alerts' },
        { target: 'managed-payments', type: 'integrates_with', year: 2018, desc: 'Payment received event triggers first Order Update' },
        { target: 'ebay-mobile-app', type: 'integrates_with', year: 2014, desc: 'eBay Mobile App is primary delivery channel for Order Updates' },
      ];
      break;

    case 'out-for-delivery':
      newRels = [
        { target: 'package-tracking', type: 'integrates_with', year: 2006, desc: 'Out for Delivery is a carrier status surfaced via Package Tracking' },
        { target: 'order-updates', type: 'integrates_with', year: 2014, desc: 'Out for Delivery triggers an Order Update notification' },
        { target: 'real-time-tracking', type: 'integrates_with', year: 2019, desc: 'Real-Time Tracking shows map view for Out for Delivery status' },
        { target: 'push-notifications', type: 'integrates_with', year: 2014, desc: 'Push notification sent when package is out for delivery' },
        { target: 'delivery-status', type: 'related_to', year: 2006, desc: 'Out for Delivery is one of the Delivery Status states' },
        { target: 'ebay-guaranteed-delivery', type: 'integrates_with', year: 2017, desc: 'Guaranteed Delivery SLA tracked against Out for Delivery timing' },
      ];
      break;

    case 'out-of-stock-control':
      newRels = [
        { target: 'out-of-stock-listing', type: 'related_to', year: 2016, desc: 'Out of Stock Control governs how Out of Stock Listings behave' },
        { target: 'inventory-management', type: 'integrates_with', year: 2016, desc: 'Inventory Management triggers Out of Stock Control when qty hits 0' },
        { target: 'good-til-cancelled', type: 'depends_on', year: 2016, desc: 'Out of Stock Control only applies to Good Til Cancelled listings' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Seller Hub inventory view surfaces out-of-stock listings' },
        { target: 'active-listings', type: 'integrates_with', year: 2016, desc: 'Out of Stock Control keeps listings in active state despite 0 inventory' },
        { target: 'ebay-stores', type: 'related_to', year: 2016, desc: 'Primarily used by eBay Store sellers with high SKU counts' },
      ];
      break;

    case 'out-of-stock-listing':
      newRels = [
        { target: 'out-of-stock-control', type: 'related_to', year: 2012, desc: 'Out of Stock Control feature governs Out of Stock Listing state' },
        { target: 'inactive-listings', type: 'related_to', year: 2012, desc: 'Out of Stock Listings appear in Inactive Listings tab' },
        { target: 'inventory-management', type: 'integrates_with', year: 2012, desc: 'Inventory Management updates trigger Out of Stock Listing state' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Seller Hub highlights Out of Stock Listings for restocking action' },
        { target: 'good-til-cancelled', type: 'depends_on', year: 2012, desc: 'Out of Stock Listing behavior specific to GTC listing format' },
        { target: 'watchlist', type: 'related_to', year: 2012, desc: 'Watchers preserved on Out of Stock Listings for re-engagement when restocked' },
      ];
      break;

    case 'outbid-alert':
      newRels = [
        { target: 'auction-format', type: 'depends_on', year: 2001, desc: 'Outbid Alerts only exist in auction-format listings' },
        { target: 'automatic-bidding', type: 'integrates_with', year: 2001, desc: 'Auto-bidding mechanism triggers Outbid Alert when max is exceeded' },
        { target: 'push-notifications', type: 'integrates_with', year: 2013, desc: 'Outbid Alert delivered as push notification on mobile' },
        { target: 'email-notifications', type: 'integrates_with', year: 2001, desc: 'Outbid Alert sent as email with current bid and time remaining' },
        { target: 'outbid-notice', type: 'related_to', year: 2001, desc: 'Outbid Notice is an alternate name for the same alert' },
        { target: 'outbid-notification', type: 'related_to', year: 2009, desc: 'Outbid Notification is the mobile app variant of Outbid Alert' },
        { target: 'watchlist', type: 'related_to', year: 2001, desc: 'Buyers watching auctions receive Outbid Alerts' },
        { target: 'bid-now', type: 'integrates_with', year: 2001, desc: 'Outbid Alert prompts buyers to Bid Now again' },
      ];
      break;

    case 'outbid-notice':
      newRels = [
        { target: 'outbid-alert', type: 'related_to', year: 2001, desc: 'Outbid Notice and Outbid Alert describe the same event' },
        { target: 'outbid-notification', type: 'related_to', year: 2009, desc: 'Outbid Notification is the mobile naming; Outbid Notice used in web UI' },
        { target: 'auction-format', type: 'depends_on', year: 2001, desc: 'Only triggered in auction listings' },
        { target: 'automatic-bidding', type: 'integrates_with', year: 2001, desc: 'Auto-bidding proxy triggers notice when another bidder wins' },
        { target: 'email-notifications', type: 'integrates_with', year: 2001, desc: 'Delivered via email with direct rebid link' },
      ];
      break;

    case 'outbid-notification':
      newRels = [
        { target: 'outbid-alert', type: 'related_to', year: 2009, desc: 'Outbid Notification is the mobile-app naming of Outbid Alert' },
        { target: 'outbid-notice', type: 'related_to', year: 2009, desc: 'Different naming, same event across web and mobile' },
        { target: 'push-notifications', type: 'integrates_with', year: 2013, desc: 'Primary delivery channel for Outbid Notifications' },
        { target: 'ebay-mobile-app', type: 'integrates_with', year: 2009, desc: 'eBay Mobile App surfaces Outbid Notifications on lock screen' },
        { target: 'auction-format', type: 'depends_on', year: 2009, desc: 'Only generated for auction-format listings' },
      ];
      break;

    case 'package-tracking':
      newRels = [
        { target: 'shipping-labels', type: 'integrates_with', year: 2013, desc: 'Tracking number embedded in shipping label auto-populates Package Tracking' },
        { target: 'real-time-tracking', type: 'related_to', year: 2019, desc: 'Real-Time Tracking is the enhanced map-view version of Package Tracking' },
        { target: 'order-updates', type: 'integrates_with', year: 2014, desc: 'Package Tracking status changes drive Order Update notifications' },
        { target: 'delivery-status', type: 'integrates_with', year: 2013, desc: 'Package Tracking feeds Delivery Status states' },
        { target: 'valid-tracking-rate', type: 'integrates_with', year: 2013, desc: 'Seller\'s Valid Tracking Rate is calculated from Package Tracking uploads' },
        { target: 'ebay-guaranteed-delivery', type: 'depends_on', year: 2017, desc: 'Guaranteed Delivery requires valid tracking to verify on-time delivery' },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2013, desc: 'Tracking upload compliance affects seller performance metrics' },
        { target: 'managed-delivery', type: 'integrates_with', year: 2020, desc: 'Managed Delivery provides end-to-end tracking visibility' },
      ];
      break;

    case 'page-views':
      newRels = [
        { target: 'traffic-report', type: 'integrates_with', year: 2005, desc: 'Page Views metric appears in Traffic Reports' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Seller Hub Performance tab displays Page Views per listing' },
        { target: 'listing-analytics', type: 'integrates_with', year: 2010, desc: 'Listing Analytics aggregates Page Views for conversion analysis' },
        { target: 'impressions', type: 'related_to', year: 2005, desc: 'Impressions count search exposure; Page Views count click-throughs' },
        { target: 'conversion-rate', type: 'related_to', year: 2005, desc: 'Page Views denominator in conversion rate calculation' },
        { target: 'promoted-listings-dashboard', type: 'integrates_with', year: 2016, desc: 'Promoted Listings Dashboard shows Page Views from ad traffic' },
        { target: 'product-research', type: 'related_to', year: 2019, desc: 'Product Research uses aggregated page view data for demand analysis' },
      ];
      break;

    case 'partial-refund':
      newRels = [
        { target: 'ebay-money-back-guarantee', type: 'integrates_with', year: 2011, desc: 'Partial Refund is an outcome option under eBay Money Back Guarantee' },
        { target: 'managed-returns', type: 'integrates_with', year: 2015, desc: 'Managed Returns flow can resolve to a Partial Refund' },
        { target: 'resolution-center', type: 'integrates_with', year: 2011, desc: 'Resolution Center facilitates Partial Refund agreements' },
        { target: 'full-refund', type: 'related_to', year: 2011, desc: 'Full Refund is the alternative outcome to Partial Refund' },
        { target: 'refund-issued', type: 'related_to', year: 2013, desc: 'Refund Issued status follows a Partial Refund being processed' },
        { target: 'managed-payments', type: 'depends_on', year: 2018, desc: 'Managed Payments executes Partial Refund back to buyer payment method' },
        { target: 'seller-protections', type: 'related_to', year: 2015, desc: 'Seller Protections may apply to reduce partial refund liability' },
      ];
      break;

    case 'parts-compatibility':
      newRels = [
        { target: 'ebay-motors', type: 'depends_on', year: 2008, desc: 'Parts Compatibility is core to the eBay Motors parts & accessories experience' },
        { target: 'ebay-motors-parts', type: 'integrates_with', year: 2008, desc: 'Parts Compatibility powers fitment data for eBay Motors Parts listings' },
        { target: 'item-specifics', type: 'integrates_with', year: 2008, desc: 'Item Specifics includes compatibility attributes for parts listings' },
        { target: 'fitment-compatibility', type: 'related_to', year: 2012, desc: 'Fitment Compatibility is the buyer-facing search layer using Parts Compatibility data' },
        { target: 'fitment-plus', type: 'related_to', year: 2018, desc: 'Fitment Plus is the enhanced version of Parts Compatibility lookup' },
        { target: 'my-garage', type: 'integrates_with', year: 2014, desc: 'My Garage stores vehicle info to auto-filter by Parts Compatibility' },
        { target: 'shop-by-diagram', type: 'integrates_with', year: 2016, desc: 'Shop by Diagram uses compatibility data to show correct part locations' },
        { target: 'vin-lookup', type: 'integrates_with', year: 2016, desc: 'VIN Lookup cross-references VIN to return matching Parts Compatibility results' },
        { target: 'advanced-listing-tool', type: 'integrates_with', year: 2008, desc: 'Advanced Listing Tool has dedicated compatibility table editor' },
      ];
      break;

    case 'passkeys':
      newRels = [
        { target: 'account-security', type: 'integrates_with', year: 2023, desc: 'Passkeys is part of eBay Account Security suite' },
        { target: 'two-factor-authentication', type: 'related_to', year: 2023, desc: 'Passkeys supersede 2FA for stronger passwordless auth' },
        { target: 'two-step-verification', type: 'related_to', year: 2023, desc: 'Passkeys offer a more secure alternative to 2-Step Verification' },
        { target: 'biometric-verification', type: 'integrates_with', year: 2023, desc: 'Passkeys use device biometrics (Face ID, Touch ID) for authentication' },
        { target: 'password-reset', type: 'related_to', year: 2023, desc: 'Passkeys reduce need for Password Reset by eliminating passwords' },
        { target: 'login-alerts', type: 'integrates_with', year: 2023, desc: 'Login Alerts still fire for passkey-based logins as audit trail' },
        { target: 'ebay-mobile-app', type: 'depends_on', year: 2023, desc: 'Passkeys initially rolled out through eBay Mobile App' },
        { target: 'trust', type: 'depends_on', year: 2025, desc: 'Part of eBay trust and safety umbrella' },
        { target: 'security-center', type: 'integrates_with', year: 2025, desc: 'Passkey setup promoted and managed through Security Center' },
        { target: 'ebay-mobile-app', type: 'integrates_with', year: 2025, desc: 'Biometric passkeys stored in iCloud Keychain or Google Password Manager via mobile' },
      ];
      break;

    case 'password-reset':
      newRels = [
        { target: 'account-security', type: 'integrates_with', year: 2000, desc: 'Password Reset is a core Account Security recovery mechanism' },
        { target: 'two-step-verification', type: 'integrates_with', year: 2013, desc: 'Two-Step Verification required during sensitive Password Reset flows' },
        { target: 'login-alerts', type: 'integrates_with', year: 2015, desc: 'Login Alerts notify users of Password Reset events' },
        { target: 'account-suspension', type: 'related_to', year: 2000, desc: 'Suspended accounts route through Password Reset for recovery' },
        { target: 'passkeys', type: 'related_to', year: 2023, desc: 'Passkeys reduce dependency on Password Reset flows' },
      ];
      break;

    case 'pay-in-4':
      newRels = [
        { target: 'paypal', type: 'depends_on', year: 2020, desc: 'Pay in 4 is powered by PayPal\'s BNPL infrastructure' },
        { target: 'checkout', type: 'integrates_with', year: 2020, desc: 'Pay in 4 appears as a payment option at checkout' },
        { target: 'managed-payments', type: 'integrates_with', year: 2020, desc: 'Pay in 4 is available within Managed Payments checkout' },
        { target: 'klarna', type: 'competes_with', year: 2020, desc: 'Klarna also offers installment payment; direct BNPL competitor' },
        { target: 'klarna-pay-in-4', type: 'competes_with', year: 2020, desc: 'Klarna Pay in 4 is a direct competing product' },
        { target: 'afterpay', type: 'competes_with', year: 2020, desc: 'Afterpay is another BNPL alternative at checkout' },
        { target: 'credit-card', type: 'related_to', year: 2020, desc: 'Pay in 4 competes with credit card installment plans' },
        { target: 'paypal-credit-6-month', type: 'related_to', year: 2020, desc: 'PayPal Credit is the longer-term financing counterpart' },
      ];
      break;

    case 'pay-now':
      newRels = [
        { target: 'checkout', type: 'integrates_with', year: 2000, desc: 'Pay Now is the primary CTA button initiating checkout' },
        { target: 'managed-payments', type: 'integrates_with', year: 2018, desc: 'Pay Now triggers Managed Payments processing pipeline' },
        { target: 'immediate-payment-required', type: 'related_to', year: 2003, desc: 'Immediate Payment Required listings show Pay Now immediately after purchase' },
        { target: 'buy-it-now', type: 'integrates_with', year: 2000, desc: 'Buy It Now purchase flow leads directly to Pay Now' },
        { target: 'shopping-cart', type: 'integrates_with', year: 2013, desc: 'Pay Now button appears in Shopping Cart to initiate payment' },
      ];
      break;

    case 'payment-dispute':
      newRels = [
        { target: 'ebay-money-back-guarantee', type: 'related_to', year: 2005, desc: 'Payment Dispute (chargeback) is separate from but related to eBay MBG' },
        { target: 'managed-payments', type: 'integrates_with', year: 2018, desc: 'Managed Payments handles Payment Dispute mediation and chargeback flow' },
        { target: 'resolution-center', type: 'integrates_with', year: 2005, desc: 'Resolution Center tracks Payment Dispute cases' },
        { target: 'payment-dispute-protections', type: 'integrates_with', year: 2019, desc: 'Payment Dispute Seller Protections apply when disputes are filed' },
        { target: 'seller-protections', type: 'integrates_with', year: 2015, desc: 'Seller Protections apply if buyer files fraudulent Payment Dispute' },
        { target: 'buyer-protection', type: 'related_to', year: 2005, desc: 'Payment Dispute is a buyer recourse mechanism alongside Buyer Protection' },
        { target: 'paypal', type: 'related_to', year: 2005, desc: 'Pre-Managed Payments, PayPal handled dispute resolution' },
      ];
      break;

    case 'payment-failed':
      newRels = [
        { target: 'checkout', type: 'integrates_with', year: 2013, desc: 'Payment Failed error surfaced at checkout when card declined' },
        { target: 'managed-payments', type: 'integrates_with', year: 2018, desc: 'Managed Payments returns Payment Failed status to checkout UI' },
        { target: 'add-payment-method', type: 'integrates_with', year: 2013, desc: 'Payment Failed prompts buyer to Add Payment Method as remedy' },
        { target: 'unpaid-item-assistant', type: 'related_to', year: 2013, desc: 'Persistent Payment Failed can trigger Unpaid Item case' },
        { target: 'order-updates', type: 'integrates_with', year: 2013, desc: 'Payment Failed triggers an Order Update notification to buyer' },
      ];
      break;

    case 'payment-holds':
      newRels = [
        { target: 'managed-payments', type: 'integrates_with', year: 2009, desc: 'Managed Payments implements and lifts Payment Holds automatically' },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2009, desc: 'Sellers with performance issues subject to extended Payment Holds' },
        { target: 'new-seller-journey', type: 'integrates_with', year: 2009, desc: 'New sellers face 21-day Payment Holds as standard risk mitigation' },
        { target: 'payout-schedule', type: 'integrates_with', year: 2018, desc: 'Payment Holds delay funds beyond normal Payout Schedule' },
        { target: 'trust-safety', type: 'depends_on', year: 2009, desc: 'Trust & Safety risk signals trigger Payment Holds' },
        { target: 'ebay-money-back-guarantee', type: 'integrates_with', year: 2009, desc: 'Held funds protect against MBG claims during delivery window' },
      ];
      break;

    case 'payment-pending':
      newRels = [
        { target: 'checkout', type: 'integrates_with', year: 2013, desc: 'Payment Pending status shown during checkout processing' },
        { target: 'managed-payments', type: 'integrates_with', year: 2018, desc: 'Managed Payments backend verification creates Payment Pending state' },
        { target: 'order-updates', type: 'integrates_with', year: 2013, desc: 'Payment Pending triggers Order Update notification' },
        { target: 'payment-received', type: 'related_to', year: 2013, desc: 'Payment Received is the resolved state following Payment Pending' },
        { target: 'payment-failed', type: 'related_to', year: 2013, desc: 'Payment Failed is the error resolution after Payment Pending' },
      ];
      break;

    case 'payment-processing':
      newRels = [
        { target: 'managed-payments', type: 'integrates_with', year: 2018, desc: 'Payment Processing runs on Managed Payments infrastructure with Adyen' },
        { target: 'checkout', type: 'integrates_with', year: 2018, desc: 'Payment Processing is the backend execution of checkout' },
        { target: 'managed-payments-multi-currency', type: 'integrates_with', year: 2019, desc: 'Multi-currency processing handled within Payment Processing' },
        { target: 'paypal', type: 'related_to', year: 2002, desc: 'PayPal was the legacy Payment Processing layer' },
        { target: 'credit-card', type: 'integrates_with', year: 2018, desc: 'Credit Card transactions flow through Payment Processing' },
        { target: 'apple-pay', type: 'integrates_with', year: 2018, desc: 'Apple Pay processed via same Payment Processing pipeline' },
        { target: 'google-pay', type: 'integrates_with', year: 2018, desc: 'Google Pay transactions processed via same pipeline' },
      ];
      break;

    case 'payment-received':
      newRels = [
        { target: 'managed-payments', type: 'integrates_with', year: 2013, desc: 'Managed Payments confirms funds cleared, triggering Payment Received' },
        { target: 'order-updates', type: 'integrates_with', year: 2014, desc: 'Payment Received generates Order Update notification' },
        { target: 'awaiting-shipment', type: 'related_to', year: 2013, desc: 'Payment Received transitions order status to Awaiting Shipment' },
        { target: 'payout-schedule', type: 'integrates_with', year: 2018, desc: 'Payment Received starts the clock on Payout Schedule' },
        { target: 'handling-time', type: 'integrates_with', year: 2013, desc: 'Handling time SLA begins when Payment Received notification fires' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Seller Hub orders list updates to show Payment Received status' },
      ];
      break;

    case 'payout-schedule':
      newRels = [
        { target: 'managed-payments', type: 'depends_on', year: 2019, desc: 'Payout Schedule is configured and executed within Managed Payments' },
        { target: 'daily-payout', type: 'related_to', year: 2019, desc: 'Daily Payout is one Payout Schedule option' },
        { target: 'weekly-payout', type: 'related_to', year: 2019, desc: 'Weekly Payout is another Payout Schedule option' },
        { target: 'express-payouts', type: 'related_to', year: 2020, desc: 'Express Payouts accelerates Payout Schedule for faster access' },
        { target: 'payouts-on-demand', type: 'related_to', year: 2021, desc: 'Payouts on Demand bypasses Payout Schedule entirely' },
        { target: 'payment-holds', type: 'related_to', year: 2019, desc: 'Payment Holds delay funds beyond normal Payout Schedule' },
        { target: 'ebay-balance', type: 'integrates_with', year: 2019, desc: 'Payout Schedule funds deposited to seller bank or eBay Balance' },
      ];
      break;

    case 'payouts-on-demand':
      newRels = [
        { target: 'managed-payments', type: 'depends_on', year: 2021, desc: 'Payouts on Demand is a feature within Managed Payments' },
        { target: 'payout-schedule', type: 'related_to', year: 2021, desc: 'Payouts on Demand allows bypassing scheduled payout cycles' },
        { target: 'instant-payout', type: 'related_to', year: 2021, desc: 'Instant Payout is the mechanism for Payouts on Demand' },
        { target: 'express-payouts', type: 'related_to', year: 2020, desc: 'Express Payouts is a related accelerated payout option' },
        { target: 'ebay-balance', type: 'integrates_with', year: 2021, desc: 'Funds transferred from eBay Balance to bank via Payouts on Demand' },
      ];
      break;

    case 'paypal':
      newRels = [
        { target: 'managed-payments', type: 'replaced_by', year: 2021, desc: 'eBay replaced PayPal with Managed Payments as primary processor 2018-2021' },
        { target: 'paypal-checkout', type: 'related_to', year: 2002, desc: 'PayPal Checkout was the specific checkout product that PayPal powered' },
        { target: 'checkout', type: 'integrates_with', year: 2002, desc: 'PayPal was integrated into eBay checkout for over 15 years' },
        { target: 'pay-in-4', type: 'related_to', year: 2020, desc: 'Pay in 4 is still PayPal-powered even after Managed Payments transition' },
        { target: 'paypal-credit-6-month', type: 'related_to', year: 2008, desc: 'PayPal Credit was the financing arm of the PayPal product' },
        { target: 'payment-dispute', type: 'related_to', year: 2002, desc: 'Pre-transition, PayPal handled all payment disputes on eBay' },
        { target: 'billpoint', type: 'replaced_by', year: 2002, desc: 'PayPal effectively replaced Billpoint as eBay\'s payment solution' },
        { target: 'zong-mobile-payments', type: 'related_to', year: 2011, desc: 'Zong was an eBay-acquired mobile payment play in the PayPal era' },
      ];
      break;

    case 'paypal-checkout':
      newRels = [
        { target: 'managed-payments', type: 'renamed_to', year: 2021, desc: 'PayPal Checkout replaced by Managed Payments across eBay platform' },
        { target: 'paypal', type: 'depends_on', year: 2000, desc: 'PayPal Checkout is powered by PayPal' },
        { target: 'checkout', type: 'integrates_with', year: 2000, desc: 'PayPal Checkout was the primary checkout method for eBay buyers' },
        { target: 'payment-processing', type: 'related_to', year: 2000, desc: 'PayPal Checkout was the payment processing layer' },
      ];
      break;

    case 'performance-dashboard':
      newRels = [
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Performance Dashboard is a tab within Seller Hub' },
        { target: 'seller-performance-standards', type: 'depends_on', year: 2017, desc: 'Performance Dashboard displays metrics against Seller Performance Standards thresholds' },
        { target: 'transaction-defect-rate', type: 'integrates_with', year: 2017, desc: 'Transaction Defect Rate is a key metric on Performance Dashboard' },
        { target: 'late-shipment-rate', type: 'integrates_with', year: 2017, desc: 'Late Shipment Rate displayed on Performance Dashboard' },
        { target: 'valid-tracking-rate', type: 'integrates_with', year: 2017, desc: 'Valid Tracking Rate shown on Performance Dashboard' },
        { target: 'cases-closed-without-seller-resolution', type: 'integrates_with', year: 2017, desc: 'This metric tracked and displayed in Performance Dashboard' },
        { target: 'top-rated-seller', type: 'related_to', year: 2017, desc: 'Performance Dashboard shows progress toward Top Rated Seller status' },
        { target: 'performance-dashboard-multi-market', type: 'related_to', year: 2016, desc: 'Multi-market variant of Performance Dashboard' },
      ];
      break;

    case 'performance-dashboard-multi-market':
      newRels = [
        { target: 'performance-dashboard', type: 'related_to', year: 2016, desc: 'Multi-market localized version of Performance Dashboard' },
        { target: 'seller-hub-reports-multi-market', type: 'integrates_with', year: 2017, desc: 'Accessible via multi-market Seller Hub Reports' },
        { target: 'seller-performance-standards-multi-market', type: 'depends_on', year: 2016, desc: 'Displays metrics against multi-market Performance Standards thresholds' },
        { target: 'transaction-defect-rate', type: 'integrates_with', year: 2016, desc: 'Defect Rate shown in multi-market dashboard' },
        { target: 'late-shipment-rate', type: 'integrates_with', year: 2016, desc: 'Late Shipment Rate included in multi-market dashboard' },
        { target: 'top-rated-seller-multi-market', type: 'related_to', year: 2016, desc: 'Dashboard shows distance to TRS status in each market' },
      ];
      break;

    case 'phone-support':
      newRels = [
        { target: 'ebay-customer-service', type: 'integrates_with', year: 2003, desc: 'Phone Support is one channel within eBay Customer Service' },
        { target: 'live-chat-support', type: 'related_to', year: 2015, desc: 'Live Chat Support and Phone Support are parallel contact channels' },
        { target: 'help-center', type: 'integrates_with', year: 2003, desc: 'Help Center escalates to Phone Support for complex cases' },
        { target: 'top-rated-seller', type: 'related_to', year: 2010, desc: 'Top Rated Sellers receive dedicated Phone Support lines' },
        { target: 'account-management-plus', type: 'related_to', year: 2018, desc: 'Account Management Plus tier includes priority phone support' },
        { target: 'resolution-center', type: 'related_to', year: 2005, desc: 'Resolution Center disputes can be escalated to Phone Support' },
      ];
      break;

    case 'photo-background-removal':
      newRels = [
        { target: 'photo-uploader', type: 'integrates_with', year: 2023, desc: 'Background Removal applies automatically within Photo Uploader' },
        { target: 'photo-enhancement', type: 'related_to', year: 2022, desc: 'Photo Enhancement and Background Removal are companion AI image tools' },
        { target: 'picture-services', type: 'integrates_with', year: 2023, desc: 'Background Removal is part of eBay Picture Services capability' },
        { target: 'ai-generated-backgrounds', type: 'related_to', year: 2023, desc: 'AI-Generated Backgrounds complements Background Removal for polished images' },
        { target: 'background-enhancement', type: 'related_to', year: 2023, desc: 'Background Enhancement is the broader category; Removal is a specific mode' },
        { target: 'listing', type: 'integrates_with', year: 2023, desc: 'Background Removal is applied during listing creation flow' },
        { target: 'mobile-photo-editor', type: 'integrates_with', year: 2023, desc: 'Mobile Photo Editor includes Background Removal capability' },
      ];
      break;

    case 'photo-enhancement':
      newRels = [
        { target: 'photo-uploader', type: 'integrates_with', year: 2022, desc: 'Photo Enhancement auto-applies to images on upload' },
        { target: 'photo-background-removal', type: 'related_to', year: 2023, desc: 'Background Removal pairs with Enhancement as AI image tools' },
        { target: 'picture-services', type: 'integrates_with', year: 2022, desc: 'Photo Enhancement is part of eBay Picture Services' },
        { target: 'mobile-photo-editor', type: 'integrates_with', year: 2022, desc: 'Mobile Photo Editor applies Photo Enhancement on-device' },
        { target: 'listing', type: 'integrates_with', year: 2022, desc: 'Enhancement applied during listing image upload step' },
        { target: 'ai-generated-backgrounds', type: 'related_to', year: 2023, desc: 'Both are AI-powered listing image tools' },
      ];
      break;

    case 'photo-requirements':
      newRels = [
        { target: 'picture-policy', type: 'related_to', year: 2012, desc: 'Picture Policy and Photo Requirements are overlapping listing image rules' },
        { target: 'photo-uploader', type: 'integrates_with', year: 2012, desc: 'Photo Uploader validates images against Photo Requirements' },
        { target: 'listing-policies', type: 'integrates_with', year: 2012, desc: 'Photo Requirements is one of the Listing Policies' },
        { target: 'listing-removal-notice', type: 'related_to', year: 2012, desc: 'Listings violating Photo Requirements can receive Listing Removal Notices' },
        { target: 'image-requirements', type: 'related_to', year: 2012, desc: 'Image Requirements is a synonym for Photo Requirements in some markets' },
      ];
      break;

    case 'photo-tips':
      newRels = [
        { target: 'ebay-selling-app', type: 'integrates_with', year: 2020, desc: 'Photo Tips surface contextually during mobile listing creation' },
        { target: 'photo-uploader', type: 'integrates_with', year: 2020, desc: 'Photo Tips shown inline with Photo Uploader' },
        { target: 'photo-requirements', type: 'related_to', year: 2020, desc: 'Photo Tips help sellers meet Photo Requirements' },
        { target: 'listing-quality-report', type: 'related_to', year: 2020, desc: 'Listing Quality Report surfaces photo quality issues that Tips address' },
        { target: 'new-seller-journey', type: 'integrates_with', year: 2020, desc: 'Photo Tips are part of New Seller Journey onboarding guidance' },
      ];
      break;

    case 'photo-uploader':
      newRels = [
        { target: 'picture-services', type: 'integrates_with', year: 2007, desc: 'Photo Uploader sends images to eBay Picture Services for hosting' },
        { target: 'photo-background-removal', type: 'integrates_with', year: 2023, desc: 'Background Removal triggered within Photo Uploader' },
        { target: 'photo-enhancement', type: 'integrates_with', year: 2022, desc: 'Photo Enhancement applied during upload' },
        { target: 'photo-requirements', type: 'integrates_with', year: 2012, desc: 'Photo Uploader validates against Photo Requirements on upload' },
        { target: 'mobile-photo-editor', type: 'related_to', year: 2015, desc: 'Mobile Photo Editor and Photo Uploader work together in app' },
        { target: 'ai-generated-backgrounds', type: 'integrates_with', year: 2023, desc: 'AI backgrounds generated from within Photo Uploader interface' },
        { target: 'advanced-listing-tool', type: 'integrates_with', year: 2015, desc: 'Photo Uploader embedded in Advanced Listing Tool' },
        { target: 'quick-listing-tool', type: 'integrates_with', year: 2010, desc: 'Photo Uploader accessible from Quick Listing Tool' },
      ];
      break;

    case 'picture-manager':
      newRels = [
        { target: 'seller-hub', type: 'renamed_to', year: 2017, desc: 'Picture Manager functionality integrated into Seller Hub in 2017' },
        { target: 'picture-services', type: 'related_to', year: 2005, desc: 'Picture Manager was the UI layer on top of Picture Services' },
        { target: 'photo-uploader', type: 'replaced_by', year: 2017, desc: 'Photo Uploader replaced Picture Manager\'s image management role' },
        { target: 'ebay-picture-services', type: 'integrates_with', year: 2005, desc: 'Picture Manager stored images in eBay Picture Services' },
      ];
      break;

    case 'picture-policy':
      newRels = [
        { target: 'photo-requirements', type: 'related_to', year: 2008, desc: 'Picture Policy and Photo Requirements describe the same image rules' },
        { target: 'listing-policies', type: 'integrates_with', year: 2008, desc: 'Picture Policy is part of the Listing Policies framework' },
        { target: 'vero-program', type: 'related_to', year: 2008, desc: 'VeRO Program enforces intellectual property rules in images covered by Picture Policy' },
        { target: 'active-content-policy', type: 'related_to', year: 2015, desc: 'Active Content Policy and Picture Policy both restrict listing content types' },
        { target: 'listing-removal-notice', type: 'related_to', year: 2008, desc: 'Policy violations can result in Listing Removal Notices' },
      ];
      break;

    case 'picture-services':
      newRels = [
        { target: 'photo-uploader', type: 'integrates_with', year: 2007, desc: 'Photo Uploader is the front-end for Picture Services hosting' },
        { target: 'ebay-picture-services', type: 'related_to', year: 2000, desc: 'eBay Picture Services is the legacy brand name for Picture Services' },
        { target: 'picture-manager', type: 'related_to', year: 2005, desc: 'Picture Manager was the management UI for Picture Services' },
        { target: 'photo-background-removal', type: 'integrates_with', year: 2023, desc: 'Background Removal capabilities added to Picture Services' },
        { target: 'photo-enhancement', type: 'integrates_with', year: 2022, desc: 'Photo Enhancement runs within Picture Services pipeline' },
        { target: 'listing', type: 'depends_on', year: 2000, desc: 'All listing photos served through Picture Services infrastructure' },
        { target: 'self-hosted-images', type: 'competes_with', year: 2005, desc: 'Sellers can self-host images as alternative to Picture Services' },
      ];
      break;

    case 'picture-zoom':
      newRels = [
        { target: 'picture-services', type: 'depends_on', year: 2015, desc: 'Picture Zoom requires high-resolution images served by Picture Services' },
        { target: 'photo-uploader', type: 'integrates_with', year: 2015, desc: 'Images uploaded via Photo Uploader enable Picture Zoom on listing pages' },
        { target: 'view-item-page', type: 'integrates_with', year: 2015, desc: 'Picture Zoom is a View Item Page enhancement feature' },
        { target: 'augmented-reality-preview', type: 'related_to', year: 2019, desc: 'Both AR Preview and Picture Zoom enhance buyer item inspection' },
        { target: '360-spin', type: 'related_to', year: 2018, desc: '360 Spin is the rotational companion to Picture Zoom' },
      ];
      break;

    case 'place-bid':
      newRels = [
        { target: 'auction-format', type: 'depends_on', year: 1995, desc: 'Place Bid is only available on auction-format listings' },
        { target: 'automatic-bidding', type: 'integrates_with', year: 1995, desc: 'Place Bid triggers proxy/automatic bidding up to max amount' },
        { target: 'proxy-bidding', type: 'integrates_with', year: 1995, desc: 'Proxy Bidding engine executes when buyer submits via Place Bid' },
        { target: 'bid-now', type: 'related_to', year: 1995, desc: 'Bid Now and Place Bid are the same action with different UI labels' },
        { target: 'outbid-alert', type: 'related_to', year: 2001, desc: 'After Place Bid, buyer may receive Outbid Alert if surpassed' },
        { target: 'maximum-bid', type: 'integrates_with', year: 1995, desc: 'Maximum Bid is set via the Place Bid interface' },
        { target: 'winning-bid', type: 'related_to', year: 1995, desc: 'Place Bid can result in Winning Bid at auction close' },
        { target: 'bid-increment', type: 'integrates_with', year: 1995, desc: 'Bid Increment rules apply to all Place Bid submissions' },
      ];
      break;

    case 'positive-feedback-percentage':
      newRels = [
        { target: 'feedback-forum', type: 'integrates_with', year: 1999, desc: 'Positive Feedback Percentage calculated from Feedback Forum ratings' },
        { target: 'detailed-seller-ratings', type: 'related_to', year: 2007, desc: 'Detailed Seller Ratings complement Positive Feedback Percentage' },
        { target: 'top-rated-seller', type: 'depends_on', year: 2007, desc: 'Top Rated Seller requires minimum 98% Positive Feedback Percentage' },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2007, desc: 'Positive Feedback Percentage is a component of Seller Performance Standards' },
        { target: 'powerseller', type: 'related_to', year: 2000, desc: 'PowerSeller program historically required high Positive Feedback Percentage' },
        { target: 'trust-safety', type: 'integrates_with', year: 1999, desc: 'Positive Feedback Percentage is a key trust signal platform-wide' },
        { target: 'buyer-requirements', type: 'related_to', year: 2005, desc: 'Sellers can set buyer requirements based on feedback metrics' },
      ];
      break;

    case 'powerseller':
      newRels = [
        { target: 'top-rated-seller', type: 'renamed_to', year: 2021, desc: 'PowerSeller deprecated June 2021; Top Rated Seller is the successor program' },
        { target: 'top-rated-plus', type: 'related_to', year: 2010, desc: 'Top Rated Plus badge introduced alongside PowerSeller as premium tier' },
        { target: 'seller-performance-standards', type: 'related_to', year: 2002, desc: 'PowerSeller requirements overlapped with Seller Performance Standards' },
        { target: 'positive-feedback-percentage', type: 'depends_on', year: 2000, desc: 'PowerSeller program required minimum 98% positive feedback' },
        { target: 'ebay-stores', type: 'related_to', year: 2000, desc: 'Most PowerSellers operated eBay Stores' },
        { target: 'account-management-plus', type: 'related_to', year: 2010, desc: 'Account Management Plus supported high-tier PowerSellers' },
        { target: 'seller-hub', type: 'related_to', year: 2017, desc: 'Seller Hub became the replacement dashboard as PowerSeller phased out' },
      ];
      break;

    case 'pre-loved-fashion-week':
      newRels = [
        { target: 'pre-loved-partner-program', type: 'integrates_with', year: 2020, desc: 'Fashion Week highlights brands in the Pre-loved Partner Program' },
        { target: 'preloved-partner-program', type: 'related_to', year: 2022, desc: 'Preloved Partner Program is the branded program tied to Fashion Week' },
        { target: 'fashion-luxury', type: 'integrates_with', year: 2020, desc: 'Fashion Week sits under the Fashion / Luxury vertical umbrella' },
        { target: 'sustainability', type: 'related_to', year: 2020, desc: 'Fashion Week promotes sustainable pre-owned fashion' },
        { target: 'circular-fashion-fund', type: 'related_to', year: 2020, desc: 'Circular Fashion Fund and Fashion Week are both sustainability initiatives' },
        { target: 'ebay-uk', type: 'depends_on', year: 2020, desc: 'Pre-loved Fashion Week is a UK-specific event' },
      ];
      break;

    case 'pre-loved-partner-program':
      newRels = [
        { target: 'preloved-partner-program', type: 'related_to', year: 2022, desc: 'Pre-loved and Preloved Partner Program are alternate names for the same UK initiative' },
        { target: 'pre-loved-fashion-week', type: 'integrates_with', year: 2020, desc: 'Fashion Week is the annual flagship event for the Partner Program' },
        { target: 'authenticity-guarantee', type: 'integrates_with', year: 2022, desc: 'Pre-loved partners may offer authenticated items via Authenticity Guarantee' },
        { target: 'sustainability', type: 'related_to', year: 2022, desc: 'Program advances eBay\'s sustainability and recommerce agenda' },
        { target: 'ebay-uk', type: 'depends_on', year: 2022, desc: 'UK-specific program for pre-owned fashion brands' },
        { target: 'circular-fashion-fund', type: 'related_to', year: 2022, desc: 'Both programs advance circular economy goals for fashion' },
      ];
      break;

    case 'preloved-partner-program':
      newRels = [
        { target: 'pre-loved-partner-program', type: 'related_to', year: 2022, desc: 'Alternate naming of the same UK pre-loved fashion partner program' },
        { target: 'pre-loved-fashion-week', type: 'integrates_with', year: 2022, desc: 'Fashion Week is the event hub for Preloved Partner Program brands' },
        { target: 'sustainability', type: 'related_to', year: 2022, desc: 'Program promotes circular fashion and sustainable commerce' },
        { target: 'fashion-luxury', type: 'integrates_with', year: 2022, desc: 'Part of the Fashion & Luxury vertical strategy' },
        { target: 'ebay-uk', type: 'depends_on', year: 2022, desc: 'UK market program for verified pre-owned fashion retailers' },
      ];
      break;

    case 'premium-placement':
      newRels = [
        { target: 'promoted-listings-advanced', type: 'depends_on', year: 2020, desc: 'Premium Placement is the top-slot benefit of Promoted Listings Advanced' },
        { target: 'promoted-listings', type: 'integrates_with', year: 2020, desc: 'Premium Placement is a tier within the Promoted Listings ecosystem' },
        { target: 'promoted-listings-standard', type: 'competes_with', year: 2020, desc: 'Standard offers cost-per-sale; Advanced/Premium Placement uses CPC for top slots' },
        { target: 'keyword-targeting', type: 'integrates_with', year: 2020, desc: 'Premium Placement positions won through keyword bidding in Advanced campaigns' },
        { target: 'priority-campaign', type: 'related_to', year: 2024, desc: 'Priority Campaign is the campaign type that delivers Premium Placement' },
        { target: 'cost-per-click', type: 'depends_on', year: 2020, desc: 'Premium Placement billed on cost-per-click model' },
        { target: 'best-match', type: 'related_to', year: 2020, desc: 'Premium Placement overrides organic Best Match ranking for top positions' },
      ];
      break;

    case 'price-alert':
      newRels = [
        { target: 'watchlist', type: 'depends_on', year: 2013, desc: 'Price Alert fires when a watched item drops below set threshold' },
        { target: 'price-drop-alert', type: 'related_to', year: 2013, desc: 'Price Alert and Price Drop Alert describe the same mechanism' },
        { target: 'push-notifications', type: 'integrates_with', year: 2013, desc: 'Price Alert delivered as push notification on mobile' },
        { target: 'email-notifications', type: 'integrates_with', year: 2013, desc: 'Price Alert also sent via email' },
        { target: 'saved-searches', type: 'integrates_with', year: 2013, desc: 'Saved Searches can trigger Price Alerts when matches drop in price' },
        { target: 'ebay-mobile-app', type: 'integrates_with', year: 2013, desc: 'eBay Mobile App primary delivery channel for Price Alerts' },
      ];
      break;

    case 'price-drop-alert':
      newRels = [
        { target: 'price-alert', type: 'related_to', year: 2019, desc: 'Price Drop Alert is the product name; Price Alert is the feature name' },
        { target: 'price-drop-alerts', type: 'related_to', year: 2018, desc: 'Price Drop Alerts is the plural/program framing of the same feature' },
        { target: 'watchlist', type: 'depends_on', year: 2019, desc: 'Watched items generate Price Drop Alerts on price reduction' },
        { target: 'push-notifications', type: 'integrates_with', year: 2019, desc: 'Delivered via push notification' },
        { target: 'promotions-manager', type: 'related_to', year: 2019, desc: 'Seller price drops via Promotions Manager trigger Price Drop Alerts' },
      ];
      break;

    case 'price-drop-alerts':
      newRels = [
        { target: 'price-drop-alert', type: 'related_to', year: 2018, desc: 'Plural variant of the same price drop notification feature' },
        { target: 'price-alert', type: 'related_to', year: 2018, desc: 'All three terms describe the same buyer notification capability' },
        { target: 'watchlist', type: 'depends_on', year: 2018, desc: 'Watchlist items generate Price Drop Alerts on price changes' },
        { target: 'push-notifications', type: 'integrates_with', year: 2018, desc: 'Push notifications delivery channel for Price Drop Alerts' },
        { target: 'ebay-mobile-app', type: 'integrates_with', year: 2018, desc: 'eBay Mobile App primary channel for Price Drop Alerts' },
      ];
      break;

    case 'price-guide':
      newRels = [
        { target: 'terapeak', type: 'related_to', year: 2019, desc: 'Terapeak/Product Research and Price Guide both provide market pricing data' },
        { target: 'product-research', type: 'related_to', year: 2019, desc: 'Product Research is the seller-facing counterpart; Price Guide is buyer-facing' },
        { target: 'collectibles-price-guide', type: 'related_to', year: 2019, desc: 'Collectibles Price Guide is the collectibles-specific version of Price Guide' },
        { target: 'tcgplayer', type: 'related_to', year: 2019, desc: 'TCGplayer provides trading card price data complementing Price Guide' },
        { target: 'collectibles', type: 'depends_on', year: 2019, desc: 'Price Guide primarily serves the Collectibles vertical' },
        { target: 'trading-card-hub', type: 'related_to', year: 2019, desc: 'Trading Card Hub incorporates Price Guide data for cards' },
        { target: 'my-collection', type: 'integrates_with', year: 2019, desc: 'My Collection uses Price Guide data to value collector portfolios' },
      ];
      break;

    case 'price-plus-shipping-sort':
      newRels = [
        { target: 'search', type: 'integrates_with', year: 2003, desc: 'Price + Shipping Sort is a search result sort option' },
        { target: 'sort-by', type: 'integrates_with', year: 2003, desc: 'Sort By dropdown includes Price + Shipping as an option' },
        { target: 'best-match', type: 'related_to', year: 2003, desc: 'Alternative to Best Match sort for price-conscious buyers' },
        { target: 'free-shipping', type: 'related_to', year: 2003, desc: 'Free Shipping listings rank better on Price + Shipping Sort' },
        { target: 'shipping-cost', type: 'integrates_with', year: 2003, desc: 'Shipping Cost data is required to calculate the sort metric' },
      ];
      break;

    case 'price-range':
      newRels = [
        { target: 'search', type: 'integrates_with', year: 2005, desc: 'Price Range is a search filter in the browse and search experience' },
        { target: 'price-range-filter', type: 'related_to', year: 2005, desc: 'Price Range Filter is the UI component for Price Range' },
        { target: 'search-filters', type: 'integrates_with', year: 2005, desc: 'Price Range is one of the Search Filters panel options' },
        { target: 'advanced-search', type: 'integrates_with', year: 2005, desc: 'Advanced Search includes Price Range as a parameter' },
      ];
      break;

    case 'price-range-filter':
      newRels = [
        { target: 'price-range', type: 'related_to', year: 2003, desc: 'Price Range Filter is the UI implementation of Price Range filtering' },
        { target: 'search-filters', type: 'integrates_with', year: 2003, desc: 'Price Range Filter is part of the Search Filters panel' },
        { target: 'search', type: 'integrates_with', year: 2003, desc: 'Price Range Filter refines search results by price bound' },
        { target: 'filter-by', type: 'integrates_with', year: 2003, desc: 'Filter By panel includes Price Range Filter as a control' },
      ];
      break;

    case 'price-suggestions':
      newRels = [
        { target: 'product-research', type: 'integrates_with', year: 2020, desc: 'Price Suggestions powered by Product Research sales data' },
        { target: 'terapeak', type: 'integrates_with', year: 2020, desc: 'Terapeak data feeds Price Suggestions recommendations' },
        { target: 'seller-hub', type: 'integrates_with', year: 2020, desc: 'Price Suggestions surface in Seller Hub listing flow' },
        { target: 'pricing-tools', type: 'integrates_with', year: 2020, desc: 'Price Suggestions is part of the Pricing Tools suite' },
        { target: 'auto-pricing', type: 'related_to', year: 2020, desc: 'Auto Pricing applies Price Suggestions automatically' },
        { target: 'competitive-pricing', type: 'related_to', year: 2020, desc: 'Competitive Pricing and Price Suggestions serve similar goals' },
        { target: 'advanced-listing-tool', type: 'integrates_with', year: 2020, desc: 'Advanced Listing Tool displays Price Suggestions inline' },
      ];
      break;

    case 'print-coupons':
      newRels = [
        { target: 'coupons', type: 'related_to', year: 2015, desc: 'Print Coupons is the physical-format variant of digital Coupons' },
        { target: 'promotions-manager', type: 'integrates_with', year: 2015, desc: 'Promotions Manager generates coupon codes that can be printed' },
        { target: 'marketing', type: 'integrates_with', year: 2015, desc: 'Print Coupons used in offline marketing and in-store promotions' },
      ];
      break;

    case 'print-label':
      newRels = [
        { target: 'print-shipping-label', type: 'related_to', year: 2005, desc: 'Print Label is the simplified UI name for Print Shipping Label' },
        { target: 'shipping-labels', type: 'integrates_with', year: 2005, desc: 'Print Label generates the shipping label' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Seller Hub orders view has Print Label as primary CTA' },
        { target: 'ebay-selling-app', type: 'integrates_with', year: 2015, desc: 'eBay Selling App Print Label button for on-the-go label generation' },
        { target: 'managed-payments', type: 'integrates_with', year: 2018, desc: 'Label costs deducted via Managed Payments' },
      ];
      break;

    case 'print-shipping-label':
      newRels = [
        { target: 'shipping-labels', type: 'integrates_with', year: 2007, desc: 'Print Shipping Label generates prepaid carrier labels' },
        { target: 'print-label', type: 'related_to', year: 2007, desc: 'Print Label is the simplified name; same feature' },
        { target: 'shipping-calculator', type: 'integrates_with', year: 2007, desc: 'Shipping Calculator rates used when printing label' },
        { target: 'managed-payments', type: 'depends_on', year: 2018, desc: 'Label fees collected through Managed Payments' },
        { target: 'valid-tracking-rate', type: 'integrates_with', year: 2013, desc: 'eBay-generated labels auto-upload tracking for Valid Tracking Rate' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Seller Hub orders section launches Print Shipping Label flow' },
        { target: 'shipcover-insurance', type: 'integrates_with', year: 2012, desc: 'ShipCover shipping insurance available at Print Shipping Label step' },
        { target: 'thermal-printer', type: 'integrates_with', year: 2010, desc: 'Thermal Printer compatible with Print Shipping Label output format' },
      ];
      break;

    case 'priority-campaign':
      newRels = [
        { target: 'promoted-listings-advanced', type: 'depends_on', year: 2024, desc: 'Priority Campaign is a campaign type within Promoted Listings Advanced' },
        { target: 'promoted-listings', type: 'integrates_with', year: 2024, desc: 'Priority Campaign is part of the Promoted Listings ecosystem' },
        { target: 'premium-placement', type: 'integrates_with', year: 2024, desc: 'Priority Campaign delivers Premium Placement in top search slots' },
        { target: 'keyword-targeting', type: 'integrates_with', year: 2024, desc: 'Priority Campaigns use keyword targeting for placement' },
        { target: 'cost-per-click', type: 'depends_on', year: 2024, desc: 'Priority Campaign billed on cost-per-click' },
        { target: 'general-campaign', type: 'competes_with', year: 2024, desc: 'General Campaign is the standard lower-priority campaign type' },
      ];
      break;

    case 'privacy-policy':
      newRels = [
        { target: 'gdpr-compliance', type: 'integrates_with', year: 1995, desc: 'Privacy Policy updated to comply with GDPR requirements in EU' },
        { target: 'ccpa-compliance', type: 'integrates_with', year: 2020, desc: 'Privacy Policy updated for CCPA in California' },
        { target: 'user-agreement', type: 'related_to', year: 1995, desc: 'Privacy Policy and User Agreement are companion legal documents' },
        { target: 'terms-of-service', type: 'related_to', year: 1995, desc: 'Terms of Service is the transactional complement to Privacy Policy' },
        { target: 'account-settings', type: 'integrates_with', year: 2015, desc: 'Account Settings links to Privacy Policy and communication preferences' },
        { target: 'communication-preferences', type: 'integrates_with', year: 2015, desc: 'Communication Preferences governed by Privacy Policy' },
      ];
      break;

    case 'private-listing':
      newRels = [
        { target: 'private-listing-multi-market', type: 'related_to', year: 2002, desc: 'Multi-market variant of Private Listing' },
        { target: 'listing', type: 'integrates_with', year: 2002, desc: 'Private Listing is a listing configuration option' },
        { target: 'auction-format', type: 'integrates_with', year: 2002, desc: 'Private Listing hides bidder names in auction-format listings' },
        { target: 'buyer-requirements', type: 'related_to', year: 2002, desc: 'Private Listings common for age-restricted or sensitive categories' },
        { target: 'listing-policies', type: 'integrates_with', year: 2002, desc: 'Required in certain listing policy-restricted categories' },
      ];
      break;

    case 'private-listing-multi-market':
      newRels = [
        { target: 'private-listing', type: 'related_to', year: 2001, desc: 'Multi-market version of Private Listing feature' },
        { target: 'listing-features', type: 'integrates_with', year: 2001, desc: 'Private Listing is one of the configurable Listing Features' },
        { target: 'auction-style-listings-multi-market', type: 'integrates_with', year: 2001, desc: 'Private Listing option available for multi-market auction listings' },
      ];
      break;

    case 'private-offers':
      newRels = [
        { target: 'best-offer', type: 'integrates_with', year: 2019, desc: 'Private Offers are exclusive best offer deals sent to specific buyers' },
        { target: 'offers-to-buyers', type: 'related_to', year: 2019, desc: 'Private Offers is a targeted subset of Offers to Buyers' },
        { target: 'seller-hub', type: 'integrates_with', year: 2019, desc: 'Seller Hub is where Private Offers are created and sent' },
        { target: 'message-center', type: 'integrates_with', year: 2019, desc: 'Private Offers can be sent through Message Center thread' },
        { target: 'promotions-manager', type: 'related_to', year: 2019, desc: 'Promotions Manager ecosystem includes Private Offers' },
      ];
      break;

    case 'pro-seller-program':
      newRels = [
        { target: 'top-rated-seller', type: 'related_to', year: 2020, desc: 'Pro Seller Program is UK\'s equivalent to Top Rated Seller tier' },
        { target: 'seller-performance-standards', type: 'depends_on', year: 2020, desc: 'Pro Seller status requires meeting Seller Performance Standards' },
        { target: 'ebay-premium-service-uk', type: 'related_to', year: 2020, desc: 'eBay Premium Service UK badge awarded to Pro Sellers' },
        { target: 'ebay-uk', type: 'depends_on', year: 2020, desc: 'Pro Seller Program is UK-market specific' },
        { target: 'pro-trader-program', type: 'related_to', year: 2020, desc: 'Pro Trader Program is a similar UK premium seller designation' },
      ];
      break;

    case 'pro-trader-program':
      newRels = [
        { target: 'pro-seller-program', type: 'related_to', year: 2019, desc: 'Pro Trader and Pro Seller are companion UK premium seller programs' },
        { target: 'top-rated-seller', type: 'related_to', year: 2019, desc: 'Pro Trader status correlates with Top Rated Seller metrics' },
        { target: 'seller-performance-standards', type: 'depends_on', year: 2019, desc: 'Pro Trader requirements align with Seller Performance Standards' },
        { target: 'ebay-uk', type: 'depends_on', year: 2019, desc: 'Pro Trader Program is UK-market specific' },
      ];
      break;

    case 'proceed-to-checkout':
      newRels = [
        { target: 'checkout', type: 'integrates_with', year: 2013, desc: 'Proceed to Checkout button triggers the checkout flow' },
        { target: 'shopping-cart', type: 'integrates_with', year: 2013, desc: 'Proceed to Checkout is the primary CTA on the Shopping Cart page' },
        { target: 'go-to-checkout', type: 'related_to', year: 2013, desc: 'Go to Checkout is an alternate label for the same action' },
        { target: 'managed-payments', type: 'integrates_with', year: 2018, desc: 'Checkout flow powered by Managed Payments' },
        { target: 'add-to-cart', type: 'related_to', year: 2013, desc: 'Proceed to Checkout is the step after Add to Cart' },
      ];
      break;

    case 'product-identifiers':
      newRels = [
        { target: 'item-specifics', type: 'integrates_with', year: 2010, desc: 'Product Identifiers (UPC/EAN/ISBN) are a subset of Item Specifics' },
        { target: 'product-identifiers-multi-market', type: 'related_to', year: 2011, desc: 'Multi-market variant with regional code standard differences' },
        { target: 'cassini', type: 'integrates_with', year: 2010, desc: 'Cassini search engine uses Product Identifiers for catalog matching' },
        { target: 'product-research', type: 'integrates_with', year: 2019, desc: 'Product Research uses identifier data to aggregate sales data' },
        { target: 'listing', type: 'integrates_with', year: 2010, desc: 'Product Identifiers entered during listing creation for catalog match' },
        { target: 'buy-it-now', type: 'related_to', year: 2010, desc: 'Fixed-price listings require Product Identifiers in most categories' },
      ];
      break;

    case 'product-identifiers-multi-market':
      newRels = [
        { target: 'product-identifiers', type: 'related_to', year: 2011, desc: 'Multi-market variant of Product Identifiers' },
        { target: 'item-specifics-multi-market', type: 'integrates_with', year: 2011, desc: 'Product Identifiers are a component of Item Specifics across markets' },
        { target: 'listing', type: 'integrates_with', year: 2011, desc: 'Required in most category listings for catalog matching' },
        { target: 'cassini', type: 'integrates_with', year: 2011, desc: 'Cassini search uses identifiers for catalog and search quality' },
      ];
      break;

    case 'product-research':
      newRels = [
        { target: 'terapeak', type: 'renamed_from', year: 2019, desc: 'Product Research replaced Terapeak branding in 2019' },
        { target: 'seller-hub', type: 'integrates_with', year: 2019, desc: 'Product Research accessible directly from Seller Hub Research tab' },
        { target: 'sourcing-insights', type: 'related_to', year: 2021, desc: 'Sourcing Insights is a companion feature for demand-based sourcing' },
        { target: 'price-suggestions', type: 'integrates_with', year: 2020, desc: 'Price Suggestions in listing flow are powered by Product Research data' },
        { target: 'listing-quality-report', type: 'related_to', year: 2019, desc: 'Listing Quality Report and Product Research both improve listing outcomes' },
        { target: 'analytics', type: 'integrates_with', year: 2019, desc: 'Product Research is part of the seller analytics toolset' },
        { target: 'collectibles-price-guide', type: 'related_to', year: 2019, desc: 'Collectibles Price Guide uses overlapping historical data' },
        { target: 'ebay-stores', type: 'related_to', year: 2019, desc: 'Store sellers use Product Research to optimize inventory mix' },
        { target: 'seller-hub', type: 'depends_on', year: 2021, desc: 'Product Research is a Seller Hub analytics feature' },
        { target: 'traffic-report', type: 'related_to', year: 2021, desc: 'Traffic Report is a related Seller Hub analytics tool' },
      ];
      break;

    case 'product-reviews':
      newRels = [
        { target: 'feedback-forum', type: 'related_to', year: 2015, desc: 'Product Reviews are product-level; Feedback Forum is transaction-level' },
        { target: 'item-reviews', type: 'related_to', year: 2015, desc: 'Item Reviews and Product Reviews are overlapping naming for same concept' },
        { target: 'verified-purchase', type: 'integrates_with', year: 2015, desc: 'Product Reviews sourced from Verified Purchase buyers' },
        { target: 'helpful-review', type: 'integrates_with', year: 2015, desc: 'Helpful Review votes surface best Product Reviews' },
        { target: 'write-review', type: 'integrates_with', year: 2015, desc: 'Write Review action submits a Product Review' },
        { target: 'cassini', type: 'integrates_with', year: 2015, desc: 'Cassini factors Product Review ratings into search ranking' },
      ];
      break;

    case 'product-video':
      newRels = [
        { target: 'listing', type: 'integrates_with', year: 2020, desc: 'Product Video is embedded in the View Item listing page' },
        { target: 'picture-services', type: 'integrates_with', year: 2020, desc: 'Product Video hosted through eBay media infrastructure' },
        { target: 'photo-uploader', type: 'related_to', year: 2020, desc: 'Video upload uses same media upload interface as Photo Uploader' },
        { target: 'ebay-live', type: 'related_to', year: 2020, desc: 'eBay Live extends Product Video to live-streaming format' },
        { target: 'advanced-listing-tool', type: 'integrates_with', year: 2020, desc: 'Advanced Listing Tool supports Product Video upload' },
        { target: '360-spin', type: 'related_to', year: 2020, desc: '360 Spin and Product Video both provide enhanced visual inspection' },
      ];
      break;

    case 'prohibited-items-list':
      newRels = [
        { target: 'listing-policies', type: 'integrates_with', year: 1999, desc: 'Prohibited Items List is a core Listing Policy document' },
        { target: 'trust-safety', type: 'depends_on', year: 1999, desc: 'Trust & Safety enforces the Prohibited Items List' },
        { target: 'report-this-item', type: 'integrates_with', year: 2003, desc: 'Report This Item links to Prohibited Items List for buyer guidance' },
        { target: 'prohibited-restricted-items-by-country', type: 'related_to', year: 2003, desc: 'Country-specific restrictions extend the global Prohibited Items List' },
        { target: 'vero-program', type: 'related_to', year: 1999, desc: 'VeRO Program addresses IP violations alongside Prohibited Items enforcement' },
        { target: 'listing-removal-notice', type: 'integrates_with', year: 1999, desc: 'Prohibited item listings receive Listing Removal Notices' },
        { target: 'safeharbor', type: 'related_to', year: 1999, desc: 'SafeHarbor (legacy) managed prohibited item enforcement' },
      ];
      break;

    case 'prohibited-restricted-items-by-country':
      newRels = [
        { target: 'prohibited-items-list', type: 'related_to', year: 2003, desc: 'Country list extends the global Prohibited Items List with regional rules' },
        { target: 'trust-safety', type: 'depends_on', year: 2003, desc: 'Trust & Safety implements country-specific restrictions' },
        { target: 'cross-border-trade', type: 'integrates_with', year: 2003, desc: 'Cross-Border Trade sellers must check country-specific restrictions' },
        { target: 'ebay-international-shipping', type: 'integrates_with', year: 2013, desc: 'eBay International Shipping validates against country restrictions' },
        { target: 'global-shipping-program', type: 'integrates_with', year: 2013, desc: 'Global Shipping Program screens items against country-specific restrictions' },
      ];
      break;

    case 'promote-similar-items':
      newRels = [
        { target: 'listing', type: 'integrates_with', year: 2014, desc: 'Promote Similar Items module appears on the View Item listing page' },
        { target: 'ebay-stores', type: 'integrates_with', year: 2014, desc: 'Drives cross-sell traffic to other store items' },
        { target: 'similar-items', type: 'related_to', year: 2014, desc: 'Similar Items is the buyer-facing discovery; Promote Similar Items is seller-facing' },
        { target: 'item-specifics', type: 'depends_on', year: 2014, desc: 'Item Specifics data is used to identify similar items to promote' },
        { target: 'seller-hub', type: 'related_to', year: 2017, desc: 'Seller Hub analytics show performance of cross-sell traffic' },
      ];
      break;

    case 'promote-your-listing':
      newRels = [
        { target: 'promoted-listings', type: 'integrates_with', year: 2015, desc: 'Promote Your Listing is the enrollment entry point for Promoted Listings' },
        { target: 'promoted-listings-standard', type: 'integrates_with', year: 2015, desc: 'Promote Your Listing sets ad rate for Standard campaign' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Seller Hub listings view surfaces Promote Your Listing CTA' },
        { target: 'ad-rate-recommendation', type: 'integrates_with', year: 2018, desc: 'Ad Rate Recommendation shown in Promote Your Listing flow' },
        { target: 'listing', type: 'integrates_with', year: 2015, desc: 'Promote Your Listing option accessible from any active listing' },
      ];
      break;

    case 'promoted-brand':
      newRels = [
        { target: 'promoted-listings', type: 'related_to', year: 2023, desc: 'Promoted Brand is a brand-tier product within the eBay Advertising suite' },
        { target: 'ebay-advertising', type: 'integrates_with', year: 2023, desc: 'Promoted Brand is part of the eBay Advertising portfolio' },
        { target: 'brand-funded-promoted-listings-priority', type: 'related_to', year: 2023, desc: 'Brand-funded campaigns are a subset of Promoted Brand strategy' },
        { target: 'keyword-targeting', type: 'integrates_with', year: 2023, desc: 'Promoted Brand campaigns use keyword targeting' },
        { target: 'audience-targeting', type: 'integrates_with', year: 2023, desc: 'Audience Targeting used in Promoted Brand campaigns' },
        { target: 'managed-display', type: 'related_to', year: 2023, desc: 'Managed Display and Promoted Brand are both brand-visibility ad products' },
      ];
      break;

    case 'promoted-listings':
      newRels = [
        { target: 'promoted-listings-standard', type: 'integrates_with', year: 2015, desc: 'Promoted Listings Standard is the core CPS tier under Promoted Listings' },
        { target: 'promoted-listings-advanced', type: 'integrates_with', year: 2020, desc: 'Promoted Listings Advanced is the premium CPC tier' },
        { target: 'promoted-listings-dashboard', type: 'integrates_with', year: 2016, desc: 'Promoted Listings Dashboard manages all campaigns' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Seller Hub marketing tab is primary access point for Promoted Listings' },
        { target: 'ebay-advertising', type: 'integrates_with', year: 2015, desc: 'Promoted Listings is eBay\'s flagship advertising product' },
        { target: 'offsite-ads', type: 'related_to', year: 2020, desc: 'Offsite Ads is the external-channel complement to on-site Promoted Listings' },
        { target: 'promoted-stores', type: 'related_to', year: 2019, desc: 'Promoted Stores is the store-level product alongside listing-level Promoted Listings' },
        { target: 'cost-per-sale', type: 'depends_on', year: 2015, desc: 'Promoted Listings Standard operates on cost-per-sale model' },
        { target: 'best-match', type: 'integrates_with', year: 2015, desc: 'Promoted Listings boosts placement in Best Match search results' },
      ];
      break;

    case 'promoted-listings-advanced':
      newRels = [
        { target: 'promoted-listings', type: 'integrates_with', year: 2020, desc: 'Promoted Listings Advanced is the premium tier of Promoted Listings' },
        { target: 'promoted-listings-standard', type: 'competes_with', year: 2020, desc: 'Advanced (CPC) vs Standard (CPS) are the two main Promoted Listings tiers' },
        { target: 'promoted-listings-priority', type: 'renamed_from', year: 2022, desc: 'Promoted Listings Advanced was previously called Promoted Listings Priority' },
        { target: 'keyword-targeting', type: 'integrates_with', year: 2020, desc: 'Keyword Targeting is the core targeting mechanism for Advanced campaigns' },
        { target: 'premium-placement', type: 'integrates_with', year: 2020, desc: 'Premium Placement in top search slots delivered through Advanced' },
        { target: 'cost-per-click', type: 'depends_on', year: 2020, desc: 'Advanced operates on cost-per-click bidding model' },
        { target: 'priority-campaign', type: 'integrates_with', year: 2024, desc: 'Priority Campaign is the campaign type within Advanced' },
        { target: 'campaign-bidding', type: 'integrates_with', year: 2020, desc: 'Campaign Bidding controls CPC bids in Advanced campaigns' },
        { target: 'audience-targeting', type: 'integrates_with', year: 2022, desc: 'Audience Targeting available in Promoted Listings Advanced' },
      ];
      break;

    case 'promoted-listings-dashboard':
      newRels = [
        { target: 'promoted-listings', type: 'depends_on', year: 2016, desc: 'Dashboard is the management interface for all Promoted Listings campaigns' },
        { target: 'promoted-listings-advanced', type: 'integrates_with', year: 2020, desc: 'Advanced campaign management accessed through dashboard' },
        { target: 'promoted-listings-standard', type: 'integrates_with', year: 2016, desc: 'Standard CPS campaign management in dashboard' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Promoted Listings Dashboard embedded in Seller Hub Marketing section' },
        { target: 'advertising-dashboard', type: 'related_to', year: 2019, desc: 'Advertising Dashboard is the broader view including all ad products' },
        { target: 'ad-attribution', type: 'integrates_with', year: 2018, desc: 'Ad Attribution data shown in Promoted Listings Dashboard' },
        { target: 'impressions', type: 'integrates_with', year: 2016, desc: 'Impressions, clicks, and ROAS metrics displayed in dashboard' },
      ];
      break;

    case 'promoted-listings-express':
      newRels = [
        { target: 'promoted-listings-standard', type: 'renamed_to', year: 2024, desc: 'Promoted Listings Express deprecated April 2024; merged into Standard' },
        { target: 'promoted-listings', type: 'integrates_with', year: 2022, desc: 'Express was an automated variant within Promoted Listings program' },
        { target: 'promoted-listings-advanced', type: 'related_to', year: 2022, desc: 'Express and Advanced were the two main promoted listing campaign types' },
        { target: 'promoted-listings', type: 'related_to', year: 2021, desc: 'Express was a flat-fee variant of the Promoted Listings family' },
        { target: 'promoted-listings-standard', type: 'competes_with', year: 2021, desc: 'Standard uses CPS model; Express used flat upfront fee' },
        { target: 'advertising', type: 'depends_on', year: 2021, desc: 'Part of the advertising umbrella' },
        { target: 'auction', type: 'related_to', year: 2021, desc: 'Express was specifically designed for auction-style listings' },
      ];
      break;

    case 'promoted-listings-general':
      newRels = [
        { target: 'promoted-listings-standard', type: 'renamed_to', year: 2022, desc: 'Promoted Listings General was renamed to Promoted Listings Standard' },
        { target: 'promoted-listings', type: 'integrates_with', year: 2015, desc: 'General was the original cost-per-sale campaign type' },
        { target: 'cost-per-sale', type: 'depends_on', year: 2015, desc: 'CPS billing model used by Promoted Listings General' },
      ];
      break;

    case 'promoted-listings-priority':
      newRels = [
        { target: 'promoted-listings-advanced', type: 'renamed_to', year: 2022, desc: 'Promoted Listings Priority renamed to Promoted Listings Advanced' },
        { target: 'promoted-listings', type: 'integrates_with', year: 2020, desc: 'Priority was the premium CPC tier within Promoted Listings' },
        { target: 'cost-per-click', type: 'depends_on', year: 2020, desc: 'Priority used CPC model before renaming to Advanced' },
      ];
      break;

    case 'promoted-listings-standard':
      newRels = [
        { target: 'promoted-listings', type: 'integrates_with', year: 2015, desc: 'Promoted Listings Standard is the baseline CPS advertising tier' },
        { target: 'promoted-listings-advanced', type: 'competes_with', year: 2020, desc: 'Standard (CPS) vs Advanced (CPC) are complementary/competing tiers' },
        { target: 'promoted-listings-express', type: 'related_to', year: 2022, desc: 'Express was merged into Standard in April 2024' },
        { target: 'promoted-listings-general', type: 'renamed_from', year: 2022, desc: 'Standard was previously named General' },
        { target: 'cost-per-sale', type: 'depends_on', year: 2015, desc: 'Standard operates on cost-per-sale model' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Standard campaigns managed within Seller Hub Marketing tab' },
        { target: 'ad-rate-recommendation', type: 'integrates_with', year: 2018, desc: 'Ad Rate Recommendation helps sellers set Standard CPS rates' },
        { target: 'best-match', type: 'integrates_with', year: 2015, desc: 'Standard boosts placement within Best Match organic results' },
      ];
      break;

    case 'promoted-offsite':
      newRels = [
        { target: 'offsite-ads', type: 'related_to', year: 2020, desc: 'Promoted Offsite is the seller-managed complement to mandatory Offsite Ads' },
        { target: 'promoted-listings', type: 'related_to', year: 2020, desc: 'Promoted Offsite extends Promoted Listings to external channels' },
        { target: 'ebay-advertising', type: 'integrates_with', year: 2020, desc: 'Part of the eBay Advertising portfolio' },
        { target: 'cost-per-sale', type: 'depends_on', year: 2020, desc: 'Promoted Offsite uses cost-per-sale billing for external traffic' },
        { target: 'audience-targeting', type: 'integrates_with', year: 2020, desc: 'Audience Targeting applied for offsite ad placements' },
        { target: 'advertising', type: 'depends_on', year: 2020, desc: 'Promoted Offsite is an advertising product under the advertising umbrella' },
        { target: 'advertising-dashboard', type: 'integrates_with', year: 2024, desc: 'Managed through the Advertising Dashboard in Seller Hub' },
        { target: 'discovery', type: 'integrates_with', year: 2020, desc: 'Drives off-eBay traffic back to listings, extending discovery reach' },
      ];
      break;

    case 'promoted-stores':
      newRels = [
        { target: 'ebay-stores', type: 'depends_on', year: 2019, desc: 'Promoted Stores is exclusively available to eBay Store subscribers' },
        { target: 'promoted-listings', type: 'related_to', year: 2019, desc: 'Promoted Stores extends promotion to storefront level vs individual listings' },
        { target: 'promoted-stores-custom', type: 'related_to', year: 2021, desc: 'Promoted Stores Custom is the tailored campaign variant' },
        { target: 'promoted-stores-multi-market', type: 'related_to', year: 2020, desc: 'Multi-market variant with UK \'Promoted Shops\' naming' },
        { target: 'ebay-advertising', type: 'integrates_with', year: 2019, desc: 'Part of the eBay Advertising suite' },
        { target: 'brand-funded-promoted-stores', type: 'related_to', year: 2022, desc: 'Brand-Funded Promoted Stores is a manufacturer-subsidized variant' },
        { target: 'seller-hub', type: 'integrates_with', year: 2019, desc: 'Promoted Stores configured and tracked in Seller Hub' },
        { target: 'advertising', type: 'depends_on', year: 2023, desc: 'Promoted Stores is an advertising product under the advertising umbrella' },
        { target: 'stores', type: 'integrates_with', year: 2023, desc: 'Tightly integrated with the Stores umbrella' },
        { target: 'advertising-dashboard', type: 'integrates_with', year: 2024, desc: 'Managed through the Advertising Dashboard in Seller Hub' },
        { target: 'store-traffic-report', type: 'integrates_with', year: 2023, desc: 'Store Traffic Report tracks paid traffic from Promoted Stores campaigns' },
      ];
      break;

    case 'promoted-stores-custom':
      newRels = [
        { target: 'promoted-stores', type: 'integrates_with', year: 2021, desc: 'Custom is a variant of Promoted Stores with tailored targeting' },
        { target: 'ebay-stores', type: 'depends_on', year: 2021, desc: 'Requires eBay Store subscription' },
        { target: 'ebay-advertising', type: 'integrates_with', year: 2021, desc: 'Part of eBay Advertising product portfolio' },
        { target: 'keyword-targeting', type: 'integrates_with', year: 2021, desc: 'Custom campaigns use keyword targeting for precision' },
        { target: 'audience-targeting', type: 'integrates_with', year: 2021, desc: 'Audience Targeting available in Custom store campaigns' },
      ];
      break;

    case 'promoted-stores-multi-market':
      newRels = [
        { target: 'promoted-stores', type: 'related_to', year: 2020, desc: 'Multi-market version of Promoted Stores (UK: Promoted Shops)' },
        { target: 'ebay-stores-multi-market', type: 'depends_on', year: 2020, desc: 'Available to eBay Store subscribers across markets' },
        { target: 'ebay-advertising', type: 'integrates_with', year: 2020, desc: 'Part of multi-market eBay Advertising portfolio' },
        { target: 'seller-hub-multi-market', type: 'integrates_with', year: 2020, desc: 'Managed via international Seller Hub interface' },
      ];
      break;

    case 'promoted-to-international':
      newRels = [
        { target: 'international-site-visibility', type: 'renamed_to', year: 2019, desc: 'Promoted to International deprecated 2019; replaced by free International Site Visibility' },
        { target: 'ebay-international-shipping', type: 'related_to', year: 2010, desc: 'Both features support cross-border listing visibility' },
        { target: 'global-shipping-program', type: 'related_to', year: 2013, desc: 'Global Shipping Program handled international logistics for promoted-international listings' },
        { target: 'listing', type: 'integrates_with', year: 2010, desc: 'Was a paid listing upgrade for international exposure' },
      ];
      break;

    case 'promotional-codes':
      newRels = [
        { target: 'coupons', type: 'related_to', year: 2012, desc: 'Promotional Codes are the alphanumeric format of coupon discounts' },
        { target: 'coded-coupons', type: 'related_to', year: 2015, desc: 'Coded Coupons require entry of a Promotional Code at checkout' },
        { target: 'checkout', type: 'integrates_with', year: 2012, desc: 'Promotional Codes entered and validated at checkout' },
        { target: 'promotions-manager', type: 'integrates_with', year: 2019, desc: 'Promotions Manager generates and tracks Promotional Codes' },
        { target: 'ebay-exclusive-coupons', type: 'related_to', year: 2015, desc: 'eBay Exclusive Coupons use Promotional Code format' },
      ];
      break;

    case 'promotional-credit':
      newRels = [
        { target: 'ebay-balance', type: 'integrates_with', year: 2021, desc: 'Promotional Credits applied as eBay Balance credits' },
        { target: 'checkout', type: 'integrates_with', year: 2021, desc: 'Promotional Credits apply automatically at checkout' },
        { target: 'coupons', type: 'related_to', year: 2021, desc: 'Promotional Credits are eBay-issued rather than seller-issued coupons' },
        { target: 'ebay-customer-service', type: 'related_to', year: 2021, desc: 'Customer Service issues Promotional Credits for service recovery' },
        { target: 'marketing', type: 'integrates_with', year: 2021, desc: 'Promotional Credits used as marketing incentives and retention offers' },
      ];
      break;

    case 'promotions-manager':
      newRels = [
        { target: 'markdown-manager', type: 'renamed_from', year: 2024, desc: 'Promotions Manager replaced Markdown Manager in 2024' },
        { target: 'sale-events', type: 'integrates_with', year: 2019, desc: 'Sale Events created and managed within Promotions Manager' },
        { target: 'order-discounts', type: 'integrates_with', year: 2019, desc: 'Order Discounts configured in Promotions Manager' },
        { target: 'shipping-discounts', type: 'integrates_with', year: 2019, desc: 'Shipping Discounts managed in Promotions Manager' },
        { target: 'volume-pricing', type: 'integrates_with', year: 2019, desc: 'Volume Pricing promotions configured in Promotions Manager' },
        { target: 'offers-to-buyers', type: 'integrates_with', year: 2019, desc: 'Offers to Buyers created through Promotions Manager' },
        { target: 'coded-coupons', type: 'integrates_with', year: 2019, desc: 'Coded Coupons generated and tracked in Promotions Manager' },
        { target: 'seller-hub', type: 'integrates_with', year: 2019, desc: 'Promotions Manager embedded in Seller Hub Marketing tab' },
        { target: 'discounts-manager', type: 'related_to', year: 2019, desc: 'Discounts Manager is a related tool for seller promotional pricing' },
      ];
      break;

    case 'proseller-growth-program':
      newRels = [
        { target: 'top-rated-seller', type: 'related_to', year: 2021, desc: 'ProSeller Growth Program targets sellers on path to Top Rated status' },
        { target: 'ebay-australia', type: 'depends_on', year: 2021, desc: 'ProSeller Growth Program is AU-market specific' },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2021, desc: 'Program helps sellers improve against Performance Standards' },
        { target: 'account-management-plus', type: 'related_to', year: 2021, desc: 'Account Management Plus provides the support backbone' },
        { target: 'new-seller-journey', type: 'related_to', year: 2021, desc: 'ProSeller Growth targets emerging sellers beyond initial onboarding' },
      ];
      break;

    case 'proxy-bidding':
      newRels = [
        { target: 'automatic-bidding', type: 'related_to', year: 1995, desc: 'Proxy Bidding and Automatic Bidding describe the same eBay mechanism' },
        { target: 'auction-format', type: 'depends_on', year: 1995, desc: 'Proxy Bidding is the core mechanism of eBay auction listings' },
        { target: 'place-bid', type: 'integrates_with', year: 1995, desc: 'Place Bid triggers proxy bidding up to buyer\'s maximum' },
        { target: 'maximum-bid', type: 'depends_on', year: 1995, desc: 'Maximum Bid is the ceiling for Proxy Bidding execution' },
        { target: 'bid-increment', type: 'integrates_with', year: 1995, desc: 'Bid Increment rules govern how Proxy Bidding advances' },
        { target: 'outbid-alert', type: 'integrates_with', year: 2001, desc: 'Proxy Bidding triggers Outbid Alert when another bidder exceeds max' },
        { target: 'second-chance-offer', type: 'related_to', year: 2003, desc: 'Second Chance Offer used when proxy bidder wins but declines' },
      ];
      break;

    case 'purchase-history':
      newRels = [
        { target: 'my-ebay', type: 'integrates_with', year: 2003, desc: 'Purchase History is a tab within My eBay' },
        { target: 'order-details', type: 'integrates_with', year: 2010, desc: 'Each Purchase History entry links to full Order Details' },
        { target: 'package-tracking', type: 'integrates_with', year: 2013, desc: 'Package tracking status surfaced in Purchase History' },
        { target: 'buy-again', type: 'integrates_with', year: 2018, desc: 'Buy Again recommendations powered by Purchase History data' },
        { target: 'feedback-left', type: 'integrates_with', year: 2003, desc: 'Feedback Left for sellers accessible from Purchase History' },
        { target: 'request-return', type: 'integrates_with', year: 2013, desc: 'Request Return initiated from Purchase History order entry' },
      ];
      break;

    case 'purchase-limits':
      newRels = [
        { target: 'buyer-requirements', type: 'integrates_with', year: 2010, desc: 'Purchase Limits is a subset of Buyer Requirements settings' },
        { target: 'quantity-limits', type: 'related_to', year: 2010, desc: 'Quantity Limits restricts per-transaction quantity; Purchase Limits sets period caps' },
        { target: 'listing', type: 'integrates_with', year: 2010, desc: 'Purchase Limits configured on a per-listing basis' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Seller Hub listing editor exposes Purchase Limits settings' },
      ];
      break;

    case 'purchase-protection':
      newRels = [
        { target: 'ebay-money-back-guarantee', type: 'integrates_with', year: 2000, desc: 'Purchase Protection is the umbrella term; eBay MBG is the primary mechanism' },
        { target: 'buyer-protection', type: 'related_to', year: 2000, desc: 'Buyer Protection and Purchase Protection are synonymous umbrella terms' },
        { target: 'resolution-center', type: 'integrates_with', year: 2005, desc: 'Purchase Protection claims processed through Resolution Center' },
        { target: 'vehicle-purchase-protection', type: 'related_to', year: 2005, desc: 'Vehicle Purchase Protection is the Motors-specific variant' },
        { target: 'business-equipment-purchase-protection', type: 'related_to', year: 2018, desc: 'Business Equipment Purchase Protection is the B2B variant' },
        { target: 'trust-safety', type: 'depends_on', year: 2000, desc: 'Trust & Safety backstops Purchase Protection claims' },
      ];
      break;

    case 'push-notifications':
      newRels = [
        { target: 'ebay-mobile-app', type: 'depends_on', year: 2013, desc: 'Push Notifications delivered through eBay Mobile App OS framework' },
        { target: 'email-notifications', type: 'related_to', year: 2013, desc: 'Push and Email Notifications are parallel notification channels' },
        { target: 'notification-settings', type: 'integrates_with', year: 2013, desc: 'Notification Settings controls which events trigger Push Notifications' },
        { target: 'outbid-alert', type: 'integrates_with', year: 2013, desc: 'Outbid Alerts delivered as Push Notifications' },
        { target: 'order-updates', type: 'integrates_with', year: 2014, desc: 'Order Updates delivered as Push Notifications' },
        { target: 'real-time-notifications', type: 'related_to', year: 2014, desc: 'Real-Time Notifications are the time-sensitive subset of Push Notifications' },
        { target: 'mobile-notifications', type: 'related_to', year: 2013, desc: 'Mobile Notifications and Push Notifications describe the same mechanism' },
        { target: 'ebay-mobile-app', type: 'integrates_with', year: 2010, desc: 'Delivered through eBay iOS and Android mobile applications' },
        { target: 'discovery-buyer-experience', type: 'integrates_with', year: 2010, desc: 'Re-engages buyers with deal alerts, price drops, and new listings' },
        { target: 'price-drop-notifications', type: 'integrates_with', year: 2015, desc: 'Price drop alerts are a key notification type delivered via push' },
        { target: 'notification-api', type: 'depends_on', year: 2015, desc: 'Notification API underpins push notification infrastructure for developers' },
        { target: 'notifications', type: 'depends_on', desc: 'Part of the notifications umbrella' },
      ];
      break;

    case 'quantity-available':
      newRels = [
        { target: 'inventory-management', type: 'integrates_with', year: 2003, desc: 'Quantity Available is the real-time inventory count in Inventory Management' },
        { target: 'listing', type: 'integrates_with', year: 2003, desc: 'Quantity Available displayed on listing page for fixed-price items' },
        { target: 'out-of-stock-control', type: 'integrates_with', year: 2016, desc: 'When Quantity Available hits 0, Out of Stock Control activates' },
        { target: 'stock-quantity', type: 'related_to', year: 2003, desc: 'Stock Quantity and Quantity Available are alternate names for same data' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Seller Hub inventory tab shows Quantity Available per SKU' },
      ];
      break;

    case 'quantity-limits':
      newRels = [
        { target: 'listing', type: 'integrates_with', year: 2008, desc: 'Quantity Limits set at listing level to restrict per-buyer purchases' },
        { target: 'purchase-limits', type: 'related_to', year: 2010, desc: 'Purchase Limits and Quantity Limits both restrict buyer purchase volume' },
        { target: 'buyer-requirements', type: 'integrates_with', year: 2008, desc: 'Quantity Limits is a Buyer Requirements setting' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Quantity Limits configured in Seller Hub listing editor' },
      ];
      break;

    case 'quantity-selector':
      newRels = [
        { target: 'checkout', type: 'integrates_with', year: 2004, desc: 'Quantity Selector on listing page feeds quantity into checkout' },
        { target: 'multi-variation-listing', type: 'integrates_with', year: 2008, desc: 'Quantity Selector works with Multi-Variation Listings per variant' },
        { target: 'quantity-available', type: 'integrates_with', year: 2004, desc: 'Quantity Selector bounded by Quantity Available in inventory' },
        { target: 'volume-pricing', type: 'integrates_with', year: 2016, desc: 'Volume Pricing discounts shown dynamically as quantity is adjusted' },
        { target: 'add-to-cart', type: 'integrates_with', year: 2013, desc: 'Quantity Selector value used when Add to Cart is clicked' },
      ];
      break;

    case 'quick-listing-tool':
      newRels = [
        { target: 'advanced-listing-tool', type: 'related_to', year: 2010, desc: 'Quick Listing Tool is the simplified version; Advanced is for complex listings' },
        { target: 'listing', type: 'integrates_with', year: 2010, desc: 'Quick Listing Tool creates active listings with minimal inputs' },
        { target: 'item-specifics', type: 'integrates_with', year: 2010, desc: 'Item Specifics auto-populated where possible in Quick Listing Tool' },
        { target: 'price-suggestions', type: 'integrates_with', year: 2020, desc: 'Price Suggestions shown inline in Quick Listing Tool' },
        { target: 'photo-uploader', type: 'integrates_with', year: 2010, desc: 'Photo Uploader embedded in Quick Listing Tool flow' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Quick Listing Tool accessible from Seller Hub listings section' },
      ];
      break;

    case 'quick-listing-tool-multi-market':
      newRels = [
        { target: 'quick-listing-tool', type: 'related_to', year: 2010, desc: 'Multi-market variant with localized workflows' },
        { target: 'listing-tools', type: 'integrates_with', year: 2010, desc: 'Part of the Listing Tools category across international markets' },
        { target: 'item-specifics-multi-market', type: 'integrates_with', year: 2011, desc: 'Multi-market Item Specifics requirements integrated in tool' },
        { target: 'seller-hub-multi-market', type: 'integrates_with', year: 2017, desc: 'Accessible from international Seller Hub instances' },
      ];
      break;

    case 'real-time-notifications':
      newRels = [
        { target: 'push-notifications', type: 'integrates_with', year: 2014, desc: 'Real-Time Notifications delivered through push notification framework' },
        { target: 'mobile-notifications', type: 'integrates_with', year: 2014, desc: 'Mobile Notifications are the delivery mechanism for Real-Time Notifications' },
        { target: 'outbid-alert', type: 'integrates_with', year: 2014, desc: 'Outbid Alert is a key real-time notification event' },
        { target: 'offer-expires', type: 'integrates_with', year: 2015, desc: 'Impending offer expiration triggers real-time seller notification' },
        { target: 'payment-received', type: 'integrates_with', year: 2014, desc: 'Payment Received triggers immediate real-time notification' },
        { target: 'ebay-mobile-app', type: 'depends_on', year: 2014, desc: 'eBay Mobile App is required for Real-Time Notifications' },
      ];
      break;

    case 'real-time-tracking':
      newRels = [
        { target: 'package-tracking', type: 'related_to', year: 2019, desc: 'Real-Time Tracking is the enhanced map-view form of Package Tracking' },
        { target: 'delivery-status', type: 'integrates_with', year: 2019, desc: 'Delivery Status states populated from Real-Time Tracking feeds' },
        { target: 'order-updates', type: 'integrates_with', year: 2019, desc: 'Real-Time Tracking events trigger Order Update notifications' },
        { target: 'push-notifications', type: 'integrates_with', year: 2019, desc: 'Push notifications fired on key tracking status changes' },
        { target: 'ebay-mobile-app', type: 'depends_on', year: 2019, desc: 'Real-Time Tracking map view available in eBay Mobile App' },
        { target: 'out-for-delivery', type: 'integrates_with', year: 2019, desc: 'Out for Delivery status surfaced through Real-Time Tracking' },
      ];
      break;

    case 'recently-viewed':
      newRels = [
        { target: 'my-ebay', type: 'integrates_with', year: 2010, desc: 'Recently Viewed section shown in My eBay and homepage personalization' },
        { target: 'personalized-feed', type: 'integrates_with', year: 2018, desc: 'Personalized Feed uses Recently Viewed to tailor recommendations' },
        { target: 'product-recommendations', type: 'integrates_with', year: 2018, desc: 'Product Recommendations algorithm factors in Recently Viewed history' },
        { target: 'similar-items', type: 'integrates_with', year: 2015, desc: 'Similar Items module shown alongside Recently Viewed items' },
        { target: 'watchlist', type: 'related_to', year: 2010, desc: 'Watchlist and Recently Viewed are complementary buyer engagement tools' },
      ];
      break;

    case 'recently-viewed-multi-market':
      newRels = [
        { target: 'recently-viewed', type: 'related_to', year: 2005, desc: 'Multi-market localized version of Recently Viewed' },
        { target: 'personalized-feed', type: 'integrates_with', year: 2018, desc: 'Feeds into personalized content across international sites' },
        { target: 'my-ebay', type: 'integrates_with', year: 2005, desc: 'Shown in My eBay on all market sites' },
      ];
      break;

    case 'refine-search':
      newRels = [
        { target: 'search-filters', type: 'integrates_with', year: 2010, desc: 'Refine Search is the action that applies Search Filters' },
        { target: 'item-specifics-filter', type: 'integrates_with', year: 2010, desc: 'Item Specifics filter options populate Refine Search panel' },
        { target: 'condition-filter', type: 'integrates_with', year: 2010, desc: 'Condition Filter is one option in Refine Search' },
        { target: 'price-range-filter', type: 'integrates_with', year: 2010, desc: 'Price Range Filter available within Refine Search' },
        { target: 'advanced-search', type: 'related_to', year: 2010, desc: 'Advanced Search and Refine Search overlap in filter capability' },
        { target: 'cassini', type: 'depends_on', year: 2010, desc: 'Cassini search engine applies Refine Search filters to results' },
      ];
      break;

    case 'refund-issued':
      newRels = [
        { target: 'managed-payments', type: 'integrates_with', year: 2013, desc: 'Managed Payments executes refund transactions and marks as Refund Issued' },
        { target: 'ebay-money-back-guarantee', type: 'integrates_with', year: 2013, desc: 'Refund Issued is the completion state of eBay MBG claims' },
        { target: 'managed-returns', type: 'integrates_with', year: 2015, desc: 'Managed Returns flow concludes with Refund Issued status' },
        { target: 'partial-refund', type: 'related_to', year: 2013, desc: 'Partial Refund is a variant; Refund Issued covers both full and partial' },
        { target: 'full-refund', type: 'related_to', year: 2013, desc: 'Full Refund results in Refund Issued status' },
        { target: 'order-updates', type: 'integrates_with', year: 2014, desc: 'Refund Issued triggers an Order Update notification to buyer' },
      ];
      break;

    case 'relist':
      newRels = [
        { target: 'relist-item', type: 'related_to', year: 2000, desc: 'Relist and Relist Item are the same feature with different UI labels' },
        { target: 'listing', type: 'integrates_with', year: 2000, desc: 'Relist re-activates an ended listing with same details' },
        { target: 'unsold-listings', type: 'integrates_with', year: 2000, desc: 'Relist button appears on Unsold Listings in Seller Hub' },
        { target: 'ended-listings', type: 'integrates_with', year: 2000, desc: 'Relist available on Ended Listings tab' },
        { target: 'auto-relist', type: 'related_to', year: 2010, desc: 'Auto-Relist automates the Relist action for unsold items' },
        { target: 'sell-similar', type: 'related_to', year: 2015, desc: 'Sell Similar creates a new listing; Relist restores the original' },
      ];
      break;

    case 'relist-item':
      newRels = [
        { target: 'relist', type: 'related_to', year: 2002, desc: 'Relist Item is the Seller Hub/My eBay label for the Relist action' },
        { target: 'unsold-listings', type: 'integrates_with', year: 2002, desc: 'Relist Item triggered from Unsold Listings view' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Relist Item is a bulk action available in Seller Hub' },
        { target: 'sell-similar', type: 'related_to', year: 2015, desc: 'Sell Similar and Relist Item are adjacent actions on ended listings' },
      ];
      break;

    case 'reply-to-feedback':
      newRels = [
        { target: 'feedback-forum', type: 'integrates_with', year: 2003, desc: 'Reply to Feedback adds seller response within Feedback Forum' },
        { target: 'feedback-reply', type: 'related_to', year: 2003, desc: 'Feedback Reply and Reply to Feedback are the same feature' },
        { target: 'feedback-forum', type: 'related_to', year: 2003, desc: 'Reply to Feedback primarily used to respond to low-rated feedback in Feedback Forum' },
        { target: 'seller-performance-standards', type: 'related_to', year: 2007, desc: 'Public replies can mitigate reputational impact of low feedback scores' },
        { target: 'trust-safety', type: 'related_to', year: 2003, desc: 'Reply to Feedback is a trust transparency mechanism' },
      ];
      break;

    case 'report-buyer':
      newRels = [
        { target: 'trust-safety', type: 'depends_on', year: 2006, desc: 'Report Buyer flags go to Trust & Safety for investigation' },
        { target: 'unpaid-item-case', type: 'related_to', year: 2006, desc: 'Non-paying buyers are often the subject of Report Buyer' },
        { target: 'buyer-requirements', type: 'integrates_with', year: 2006, desc: 'Report Buyer can result in reported user being blocked by requirements' },
        { target: 'block-buyer-list', type: 'integrates_with', year: 2006, desc: 'After reporting, sellers can add buyer to Block Buyer List' },
        { target: 'feedback-extortion-policy', type: 'integrates_with', year: 2008, desc: 'Feedback extortion reported via Report Buyer mechanism' },
        { target: 'seller-protections', type: 'integrates_with', year: 2015, desc: 'Seller Protections activated based on Report Buyer outcomes' },
      ];
      break;

    case 'report-this-item':
      newRels = [
        { target: 'trust-safety', type: 'depends_on', year: 2003, desc: 'Report This Item submissions reviewed by Trust & Safety' },
        { target: 'prohibited-items-list', type: 'integrates_with', year: 2003, desc: 'Buyers use Report This Item for prohibited-item violations' },
        { target: 'vero-program', type: 'integrates_with', year: 2003, desc: 'VeRO rights holders use Report This Item for IP violations' },
        { target: 'counterfeit-detection', type: 'integrates_with', year: 2010, desc: 'Counterfeit reports submitted via Report This Item' },
        { target: 'listing-removal-notice', type: 'integrates_with', year: 2003, desc: 'Successful Report This Item triggers Listing Removal Notice' },
        { target: 'authenticity-guarantee', type: 'related_to', year: 2015, desc: 'Authenticity Guarantee reduces Report This Item for fakes in covered categories' },
      ];
      break;

    case 'request-feedback-revision':
      newRels = [
        { target: 'feedback-revision-request', type: 'related_to', year: 2007, desc: 'Request Feedback Revision and Feedback Revision Request are the same feature' },
        { target: 'feedback-forum', type: 'integrates_with', year: 2007, desc: 'Revision request modifies existing Feedback Forum entry' },
        { target: 'mutual-feedback-withdrawal', type: 'related_to', year: 2007, desc: 'Mutual Feedback Withdrawal and Revision Request are both feedback modification mechanisms' },
        { target: 'seller-performance-standards', type: 'related_to', year: 2007, desc: 'Revised positive feedback improves seller performance metrics' },
      ];
      break;

    case 'request-return':
      newRels = [
        { target: 'managed-returns', type: 'integrates_with', year: 2013, desc: 'Request Return initiates the Managed Returns flow' },
        { target: 'ebay-money-back-guarantee', type: 'depends_on', year: 2013, desc: 'Request Return is the entry point for eBay MBG claims' },
        { target: 'return-requested', type: 'related_to', year: 2013, desc: 'Return Requested status is triggered by Request Return action' },
        { target: 'order-details', type: 'integrates_with', year: 2013, desc: 'Request Return button accessible from Order Details page' },
        { target: 'resolution-center', type: 'integrates_with', year: 2013, desc: 'Unresolved Request Return cases escalate to Resolution Center' },
        { target: 'return-preferences', type: 'integrates_with', year: 2013, desc: 'Seller Return Preferences determine how Request Return is handled' },
      ];
      break;

    case 'request-total':
      newRels = [
        { target: 'combined-shipping', type: 'integrates_with', year: 2006, desc: 'Request Total used to ask seller for combined shipping quote' },
        { target: 'combined-shipping-discount', type: 'integrates_with', year: 2006, desc: 'Combined Shipping Discount applied when seller responds to Request Total' },
        { target: 'checkout', type: 'integrates_with', year: 2006, desc: 'Total provided via Request Total used to proceed to checkout' },
        { target: 'send-invoice', type: 'related_to', year: 2006, desc: 'Send Invoice is seller\'s response to a Request Total from buyer' },
      ];
      break;

    case 'reserve-met':
      newRels = [
        { target: 'reserve-price', type: 'depends_on', year: 1998, desc: 'Reserve Met indicates bidding has exceeded the Reserve Price' },
        { target: 'auction-format', type: 'depends_on', year: 1998, desc: 'Reserve Met only applicable in reserve-price auction listings' },
        { target: 'reserve-not-met', type: 'related_to', year: 1998, desc: 'Reserve Not Met is the opposite status indicator' },
        { target: 'bid-now', type: 'related_to', year: 1998, desc: 'Reserve Met confirms the item will sell with continued bidding' },
      ];
      break;

    case 'reserve-not-met':
      newRels = [
        { target: 'reserve-price', type: 'depends_on', year: 1998, desc: 'Reserve Not Met shown when current bid is below Reserve Price' },
        { target: 'auction-format', type: 'depends_on', year: 1998, desc: 'Only appears on auction listings with a reserve price set' },
        { target: 'reserve-met', type: 'related_to', year: 1998, desc: 'Reserve Met is the resolved state when bidding surpasses reserve' },
        { target: 'automatic-bidding', type: 'related_to', year: 1998, desc: 'Proxy bidding cannot guarantee reserve is met' },
      ];
      break;

    case 'reserve-price':
      newRels = [
        { target: 'auction-format', type: 'integrates_with', year: 1998, desc: 'Reserve Price is an optional feature of auction-format listings' },
        { target: 'reserve-price-multi-market', type: 'related_to', year: 1997, desc: 'Multi-market variant with regional naming differences' },
        { target: 'reserve-met', type: 'integrates_with', year: 1998, desc: 'Reserve Met status triggered when bids exceed Reserve Price' },
        { target: 'reserve-not-met', type: 'integrates_with', year: 1998, desc: 'Reserve Not Met shown when bids are below Reserve Price' },
        { target: 'starting-bid', type: 'related_to', year: 1998, desc: 'Starting Bid is the public minimum; Reserve Price is the hidden minimum' },
        { target: 'second-chance-offer', type: 'related_to', year: 2003, desc: 'If reserve not met, seller may use Second Chance Offer' },
      ];
      break;

    case 'reserve-price-multi-market':
      newRels = [
        { target: 'reserve-price', type: 'related_to', year: 1997, desc: 'Multi-market variant of Reserve Price feature' },
        { target: 'auction-style-listings-multi-market', type: 'integrates_with', year: 1997, desc: 'Reserve Price applies to multi-market auction-style listings' },
        { target: 'reserve-met', type: 'integrates_with', year: 1998, desc: 'Reserve Met status applies when reserve exceeded' },
        { target: 'reserve-not-met', type: 'integrates_with', year: 1998, desc: 'Reserve Not Met status shown in multi-market auctions' },
      ];
      break;

    case 'resolution-center':
      newRels = [
        { target: 'resolution-center-multi-market', type: 'related_to', year: 2005, desc: 'Resolution Center (legacy) and multi-market version serve same dispute function' },
        { target: 'ebay-money-back-guarantee', type: 'integrates_with', year: 2005, desc: 'eBay MBG claims processed through Resolution Center' },
        { target: 'managed-returns', type: 'integrates_with', year: 2015, desc: 'Unresolved managed returns escalate to Resolution Center' },
        { target: 'payment-dispute', type: 'integrates_with', year: 2005, desc: 'Payment Disputes tracked and managed in Resolution Center' },
        { target: 'item-not-received', type: 'integrates_with', year: 2005, desc: 'Item Not Received cases opened and resolved in Resolution Center' },
        { target: 'significantly-not-as-described', type: 'integrates_with', year: 2005, desc: 'SNAD cases filed and resolved through Resolution Center' },
        { target: 'buyer-protection', type: 'depends_on', year: 2005, desc: 'Buyer Protection claims processed through Resolution Center workflow' },
        { target: 'seller-protections', type: 'integrates_with', year: 2015, desc: 'Seller Protections applied based on Resolution Center case outcomes' },
        { target: 'trust-safety', type: 'integrates_with', year: 2005, desc: 'Trust & Safety team reviews and enforces Resolution Center decisions' },
        { target: 'case-appeals', type: 'integrates_with', year: 2018, desc: 'Case Appeals Process available for Resolution Center decisions' },
        { target: 'issue-resolution-center', type: 'related_to', year: 2005, desc: 'Issue Resolution Center is an alternate name for same platform' },
      ];
      break;

    case 'resolution-center-multi-market':
      newRels = [
        { target: 'ebay-money-back-guarantee', type: 'integrates_with', year: 2009, desc: 'Resolution Center is the workflow engine for eBay Money Back Guarantee claims' },
        { target: 'managed-returns', type: 'integrates_with', year: 2013, desc: 'Return requests initiated in Resolution Center feed into managed returns flow' },
        { target: 'trust-safety', type: 'depends_on', year: 2009, desc: 'Resolution Center is a core component of platform-wide trust and safety' },
        { target: 'resolution-center', type: 'renamed_from', year: 2009, desc: 'Multi-market variant superseded the original Resolution Center platform' },
        { target: 'item-not-received', type: 'integrates_with', year: 2010, desc: 'Item Not Received claims are filed and resolved through Resolution Center' },
        { target: 'significantly-not-as-described', type: 'integrates_with', year: 2011, desc: 'SNAD claims route through Resolution Center for dispute adjudication' },
        { target: 'seller-protections', type: 'integrates_with', year: 2014, desc: 'Resolution Center enforces seller protection policies on valid claims' },
        { target: 'case-appeals', type: 'integrates_with', year: 2015, desc: 'Sellers can appeal Resolution Center decisions via the Case Appeals Process' },
        { target: 'customer-service', type: 'depends_on', year: 2009, desc: 'Resolution Center escalations route to eBay Customer Service agents' },
        { target: 'payment-dispute', type: 'integrates_with', year: 2019, desc: 'Payment disputes and chargebacks are managed within the Resolution Center' },
      ];
      break;

    case 'restocking-fee':
      newRels = [
        { target: 'returns', type: 'depends_on', year: 2014, desc: 'Restocking fee is a sub-policy within the returns framework' },
        { target: 'return-preferences', type: 'integrates_with', year: 2014, desc: 'Sellers configure restocking fee percentage in Return Preferences settings' },
        { target: 'managed-returns', type: 'integrates_with', year: 2014, desc: 'Managed Returns system applies restocking fee deduction during refund processing' },
        { target: 'ebay-money-back-guarantee', type: 'related_to', year: 2014, desc: 'Restocking fees are limited under eBay Money Back Guarantee rules' },
      ];
      break;

    case 'return-approved':
      newRels = [
        { target: 'managed-returns', type: 'depends_on', year: 2013, desc: 'Return Approved status is generated by the Managed Returns system' },
        { target: 'returns', type: 'depends_on', year: 2013, desc: 'Part of the end-to-end returns lifecycle' },
        { target: 'return-requested', type: 'related_to', year: 2013, desc: 'Return Approved follows seller action on a Return Requested notification' },
        { target: 'return-shipped', type: 'related_to', year: 2013, desc: 'Buyer ships item after Return Approved is issued' },
        { target: 'automated-return-labels', type: 'integrates_with', year: 2015, desc: 'Return Approved triggers automated prepaid return label generation' },
      ];
      break;

    case 'return-preferences':
      newRels = [
        { target: 'returns', type: 'depends_on', year: 2012, desc: 'Return Preferences configures the seller\'s policy within the returns umbrella' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Return Preferences are accessible and managed within Seller Hub' },
        { target: '30-day-returns', type: 'integrates_with', year: 2013, desc: 'Sellers set 30-day return window as a default in Return Preferences' },
        { target: '60-day-returns', type: 'integrates_with', year: 2015, desc: 'Sellers can set 60-day return window in Return Preferences' },
        { target: 'restocking-fee', type: 'integrates_with', year: 2014, desc: 'Restocking fee percentage is configured within Return Preferences' },
        { target: 'seller-pays-return-shipping', type: 'integrates_with', year: 2014, desc: 'Who pays return shipping is a core setting in Return Preferences' },
        { target: 'buyer-pays-return-shipping', type: 'integrates_with', year: 2012, desc: 'Buyer pays return shipping is the alternative setting in Return Preferences' },
        { target: 'top-rated-seller', type: 'related_to', year: 2014, desc: 'Top Rated Seller status requires free returns configured via Return Preferences' },
      ];
      break;

    case 'return-received':
      newRels = [
        { target: 'managed-returns', type: 'depends_on', year: 2013, desc: 'Return Received notification is part of the Managed Returns workflow' },
        { target: 'returns', type: 'depends_on', year: 2013, desc: 'Part of the returns lifecycle triggered by carrier delivery scan' },
        { target: 'send-refund', type: 'integrates_with', year: 2013, desc: 'Return Received triggers the 2-day seller inspection window before Send Refund' },
        { target: 'seller-hub-tasks', type: 'integrates_with', year: 2016, desc: 'Return Received items appear as tasks in Seller Hub Tasks list' },
        { target: 'package-tracking', type: 'depends_on', year: 2013, desc: 'Return Received status depends on carrier tracking data confirming delivery' },
      ];
      break;

    case 'return-requested':
      newRels = [
        { target: 'managed-returns', type: 'depends_on', year: 2013, desc: 'Return Requested triggers a managed returns case' },
        { target: 'returns', type: 'depends_on', year: 2013, desc: 'Core event in the returns lifecycle' },
        { target: 'seller-hub-tasks', type: 'integrates_with', year: 2016, desc: 'Return Requested appears as an urgent task in Seller Hub Tasks' },
        { target: 'resolution-center-multi-market', type: 'integrates_with', year: 2013, desc: 'Unresolved Return Requested cases escalate to Resolution Center' },
        { target: 'return-approved', type: 'related_to', year: 2013, desc: 'Return Approved is the seller\'s acceptance response to Return Requested' },
        { target: 'ebay-money-back-guarantee', type: 'integrates_with', year: 2013, desc: 'Return Requested cases are covered under eBay Money Back Guarantee' },
      ];
      break;

    case 'return-shipped':
      newRels = [
        { target: 'managed-returns', type: 'depends_on', year: 2013, desc: 'Return Shipped is a status within the Managed Returns workflow' },
        { target: 'returns', type: 'depends_on', year: 2013, desc: 'Part of the returns lifecycle after buyer drops off package' },
        { target: 'package-tracking', type: 'depends_on', year: 2013, desc: 'Return Shipped status is confirmed via carrier tracking scan' },
        { target: 'return-received', type: 'related_to', year: 2013, desc: 'Return Shipped precedes Return Received in the returns workflow' },
      ];
      break;

    case 'return-to-sender':
      newRels = [
        { target: 'shipping-logistics', type: 'related_to', year: 2006, desc: 'Return to Sender is a carrier-initiated shipping outcome' },
        { target: 'package-tracking', type: 'integrates_with', year: 2006, desc: 'Package tracking shows Return to Sender status when delivery fails' },
        { target: 'resolution-center-multi-market', type: 'integrates_with', year: 2010, desc: 'Buyers can open a case in Resolution Center when Return to Sender occurs' },
      ];
      break;

    case 'returns-accepted-filter':
      newRels = [
        { target: 'search', type: 'depends_on', year: 2013, desc: 'Returns Accepted Filter is a refinement option within eBay search' },
        { target: 'search-filters', type: 'integrates_with', year: 2013, desc: 'Part of the search filters panel' },
        { target: 'returns', type: 'related_to', year: 2013, desc: 'Filter surfaces listings where sellers accept returns' },
        { target: 'free-returns', type: 'related_to', year: 2015, desc: 'Free Returns filter is a companion filter alongside Returns Accepted' },
        { target: 'trust-safety', type: 'related_to', year: 2013, desc: 'Returns Accepted Filter acts as a buyer trust signal in search' },
      ];
      break;

    case 'review-offer':
      newRels = [
        { target: 'best-offer', type: 'depends_on', year: 2016, desc: 'Review Offer is the seller action interface for Best Offer negotiations' },
        { target: 'seller-hub', type: 'integrates_with', year: 2016, desc: 'Review Offer action button lives within Seller Hub' },
        { target: 'accept-offer', type: 'related_to', year: 2016, desc: 'Accept Offer is one outcome of reviewing an offer' },
        { target: 'decline-offer', type: 'related_to', year: 2016, desc: 'Decline Offer is an alternative outcome' },
        { target: 'counter-offer', type: 'related_to', year: 2016, desc: 'Counter Offer is the third outcome when reviewing an offer' },
      ];
      break;

    case 'review-offers':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2016, desc: 'Review Offers is a dedicated section within Seller Hub' },
        { target: 'best-offer', type: 'integrates_with', year: 2016, desc: 'Manages all pending Best Offer proposals from buyers' },
        { target: 'review-offer', type: 'related_to', year: 2016, desc: 'Review Offers aggregates individual Review Offer actions' },
        { target: 'offers-received', type: 'related_to', year: 2016, desc: 'Review Offers surfaces items from the Offers Received queue' },
        { target: 'seller-hub-tasks', type: 'integrates_with', year: 2016, desc: 'Pending offers appear as tasks in Seller Hub Tasks' },
      ];
      break;

    case 'revise-listing':
      newRels = [
        { target: 'listing', type: 'depends_on', year: 2001, desc: 'Revise Listing is a core listing management feature' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Revise Listing is accessible from Seller Hub active listings view' },
        { target: 'active-listings', type: 'integrates_with', year: 2005, desc: 'Revise Listing is triggered from the Active Listings management page' },
        { target: 'item-specifics', type: 'integrates_with', year: 2009, desc: 'Revise Listing allows updating Item Specifics for better search visibility' },
        { target: 'photo-uploader', type: 'integrates_with', year: 2005, desc: 'Revise Listing includes photo upload and management capabilities' },
      ];
      break;

    case 'rich-text-editor':
      newRels = [
        { target: 'listing', type: 'integrates_with', year: 2014, desc: 'Rich Text Editor is the description formatting tool within listing creation' },
        { target: 'advanced-listing-tool', type: 'integrates_with', year: 2014, desc: 'Rich Text Editor is a component of the Advanced Listing Tool' },
        { target: 'visual-editor', type: 'depends_on', year: 2014, desc: 'Rich Text Editor is a child of the Visual Editor parent' },
        { target: 'description-builder', type: 'related_to', year: 2014, desc: 'Description Builder uses rich text formatting capabilities' },
        { target: 'html-editor', type: 'competes_with', year: 2014, desc: 'Rich Text Editor is the WYSIWYG alternative to the HTML Editor' },
      ];
      break;

    case 'royal-mail-tracked-24':
      newRels = [
        { target: 'shipping-labels', type: 'integrates_with', year: 2014, desc: 'Royal Mail Tracked 24 labels are printed via eBay Shipping Labels at discounted rates' },
        { target: 'shipping-logistics', type: 'depends_on', year: 2014, desc: 'Part of eBay\'s UK shipping logistics partner network' },
        { target: 'simple-delivery-uk', type: 'integrates_with', year: 2019, desc: 'Royal Mail Tracked 24 is the primary carrier within Simple Delivery for UK sellers' },
        { target: 'top-rated-seller', type: 'related_to', year: 2014, desc: 'Using tracked shipping like Royal Mail Tracked 24 supports Top Rated Seller metrics' },
        { target: 'ebay-uk', type: 'depends_on', year: 2014, desc: 'Royal Mail Tracked 24 is a UK-exclusive shipping option' },
      ];
      break;

    case 'sale-events':
      newRels = [
        { target: 'promotions-manager', type: 'integrates_with', year: 2015, desc: 'Sale Events are created and managed within Promotions Manager' },
        { target: 'discounts-manager', type: 'integrates_with', year: 2017, desc: 'Sale Events are a promotion type within Discounts Manager' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Sellers access Sale Events creation from Seller Hub marketing tab' },
        { target: 'ebay-stores', type: 'integrates_with', year: 2015, desc: 'Sale Events are featured prominently on eBay Store pages' },
        { target: 'store-promotions-box', type: 'integrates_with', year: 2015, desc: 'Active sale events display in the Store Promotions Box' },
        { target: 'discounts-manager', type: 'depends_on', year: 2015, desc: 'Sale Events is a tool within Discounts Manager' },
        { target: 'ebay-stores', type: 'depends_on', year: 2015, desc: 'Requires eBay Store subscription' },
        { target: 'volume-pricing', type: 'related_to', year: 2015, desc: 'Both offer buyer discounts through different mechanisms' },
        { target: 'coded-coupons', type: 'related_to', year: 2015, desc: 'Both are promotional tools within Discounts Manager' },
        { target: 'promoted-listings', type: 'integrates_with', year: 2015, desc: 'Sale prices from Sale Events can be amplified via Promoted Listings' },
      ];
      break;

    case 'sale-events-multi-market':
      newRels = [
        { target: 'discounts-manager-multi-market', type: 'depends_on', year: 2017, desc: 'Multi-market Sale Events are managed through the Discounts Manager multi-market platform' },
        { target: 'promotions-manager', type: 'integrates_with', year: 2017, desc: 'Promotions Manager powers sale event creation across markets' },
        { target: 'ebay-stores-multi-market', type: 'integrates_with', year: 2017, desc: 'Sale Events surface on localized eBay Store pages' },
        { target: 'sale-events', type: 'related_to', year: 2017, desc: 'Multi-market variant of Sale Events with localized naming and compliance' },
        { target: 'shipping-discounts-multi-market', type: 'related_to', year: 2017, desc: 'Often combined with shipping discounts in promotional events' },
      ];
      break;

    case 'sales-conversion-rate':
      newRels = [
        { target: 'analytics', type: 'depends_on', year: 2014, desc: 'Sales Conversion Rate is an analytics metric tracked within seller analytics' },
        { target: 'seller-hub-reports', type: 'integrates_with', year: 2017, desc: 'Sales Conversion Rate is surfaced in Seller Hub Reports' },
        { target: 'traffic-report', type: 'integrates_with', year: 2014, desc: 'Traffic Report provides the impressions data used to calculate conversion rate' },
        { target: 'listing-quality-report', type: 'integrates_with', year: 2019, desc: 'Listing Quality Report surfaces conversion rate as a key optimization metric' },
        { target: 'promoted-listings', type: 'related_to', year: 2016, desc: 'Promoted Listings campaigns aim to improve conversion rates' },
      ];
      break;

    case 'sales-events':
      newRels = [
        { target: 'promotions-manager', type: 'integrates_with', year: 2020, desc: 'Sales Events are configured through Promotions Manager' },
        { target: 'discounts-manager', type: 'integrates_with', year: 2020, desc: 'Sales Events are a type of discount event in Discounts Manager' },
        { target: 'seller-hub', type: 'integrates_with', year: 2020, desc: 'Sales Events are created from the Seller Hub marketing section' },
        { target: 'sale-events', type: 'related_to', year: 2020, desc: 'Sales Events and Sale Events are near-synonyms for the same feature' },
      ];
      break;

    case 'sales-report':
      newRels = [
        { target: 'analytics', type: 'depends_on', year: 2005, desc: 'Sales Report is a core analytics output' },
        { target: 'seller-hub-reports', type: 'integrates_with', year: 2017, desc: 'Sales Report is accessible within Seller Hub Reports' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Sales Report surfaces in Seller Hub analytics dashboard' },
        { target: 'sales-reports-plus', type: 'related_to', year: 2018, desc: 'Sales Reports Plus is the advanced version of Sales Report' },
      ];
      break;

    case 'sales-report-multi-market':
      newRels = [
        { target: 'seller-hub-reports-multi-market', type: 'depends_on', year: 2010, desc: 'Multi-market Sales Report is part of the Seller Hub Reports multi-market suite' },
        { target: 'seller-hub-multi-market', type: 'integrates_with', year: 2016, desc: 'Sales Report is accessible within the localized Seller Hub' },
        { target: 'analytics', type: 'depends_on', year: 2010, desc: 'Sales Report is an analytics output' },
        { target: 'sales-report', type: 'related_to', year: 2010, desc: 'Multi-market localized variant of Sales Report' },
      ];
      break;

    case 'sales-reports':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2008, desc: 'Sales Reports are hosted within Seller Hub' },
        { target: 'analytics', type: 'depends_on', year: 2008, desc: 'Sales Reports are a key analytics offering' },
        { target: 'sales-report', type: 'related_to', year: 2008, desc: 'Sales Reports and Sales Report refer to the same reporting feature' },
        { target: 'sales-reports-plus', type: 'related_to', year: 2018, desc: 'Sales Reports Plus is an enhanced version' },
      ];
      break;

    case 'sales-reports-plus':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2018, desc: 'Sales Reports Plus is an enhanced analytics module within Seller Hub' },
        { target: 'sales-reports', type: 'renamed_from', year: 2018, desc: 'Sales Reports Plus is the advanced evolution of Sales Reports' },
        { target: 'analytics', type: 'depends_on', year: 2018, desc: 'Part of seller analytics suite' },
        { target: 'seller-hub-reports', type: 'integrates_with', year: 2018, desc: 'Sales Reports Plus is accessible within Seller Hub Reports' },
      ];
      break;

    case 'sales-tax-collection':
      newRels = [
        { target: 'managed-payments', type: 'depends_on', year: 2019, desc: 'Sales Tax Collection runs through the Managed Payments infrastructure' },
        { target: 'payments-checkout', type: 'integrates_with', year: 2019, desc: 'Tax is calculated and collected at checkout via the payments system' },
        { target: 'sales-tax-vat-collection', type: 'related_to', year: 2019, desc: 'Sales Tax Collection is the US equivalent of the global VAT collection program' },
        { target: 'automatic-tax-calculation', type: 'integrates_with', year: 2019, desc: 'Automatic Tax Calculation engine powers Sales Tax Collection' },
        { target: 'seller-transaction-report', type: 'integrates_with', year: 2019, desc: 'Seller Transaction Report includes sales tax collected per transaction' },
        { target: '1099-k-tax-form', type: 'related_to', year: 2020, desc: 'Sales tax collection activity relates to 1099-K reporting thresholds' },
      ];
      break;

    case 'sales-tax-vat-collection':
      newRels = [
        { target: 'managed-payments', type: 'depends_on', year: 2019, desc: 'VAT and sales tax collection runs on the Managed Payments platform' },
        { target: 'sales-tax-collection', type: 'related_to', year: 2019, desc: 'US-specific counterpart of the global VAT/tax collection program' },
        { target: 'vat-collection', type: 'related_to', year: 2019, desc: 'VAT Collection is the EU-focused equivalent' },
        { target: 'vat-invoice-automation', type: 'integrates_with', year: 2020, desc: 'VAT invoices are auto-generated as part of the tax collection flow' },
        { target: 'automatic-tax-calculation', type: 'depends_on', year: 2019, desc: 'Powered by Automatic Tax Calculation engine' },
        { target: 'international', type: 'related_to', year: 2019, desc: 'Multi-market tax compliance spans US, UK, EU, AU, CA' },
      ];
      break;

    case 'same-day-handling':
      newRels = [
        { target: 'shipping', type: 'depends_on', year: 2015, desc: 'Same-Day Handling is a shipping commitment feature' },
        { target: 'guaranteed-delivery', type: 'integrates_with', year: 2015, desc: 'Same-Day Handling is required for eBay Guaranteed Delivery eligibility' },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2015, desc: 'Same-Day Handling affects late shipment rate in seller performance metrics' },
        { target: 'top-rated-seller', type: 'related_to', year: 2015, desc: 'Same-Day Handling contributes to Top Rated Seller qualifications' },
        { target: '1-day-handling', type: 'related_to', year: 2015, desc: 'Same-Day Handling is the strictest version of the 1-Day Handling commitment' },
        { target: 'best-match', type: 'integrates_with', year: 2015, desc: 'Same-Day Handling improves Best Match search ranking' },
      ];
      break;

    case 'save-for-later':
      newRels = [
        { target: 'shopping-cart', type: 'integrates_with', year: 2018, desc: 'Save for Later moves items from Shopping Cart to a deferred purchase list' },
        { target: 'watchlist', type: 'related_to', year: 2018, desc: 'Save for Later and Watchlist both enable buyers to bookmark items' },
        { target: 'buyer', type: 'depends_on', year: 2018, desc: 'Save for Later is a buyer-focused feature' },
        { target: 'checkout', type: 'integrates_with', year: 2018, desc: 'Items can move between Save for Later and checkout flow' },
      ];
      break;

    case 'saved':
      newRels = [
        { target: 'my-ebay', type: 'integrates_with', year: 2018, desc: 'Saved tab is part of the My eBay buyer experience' },
        { target: 'saved-searches', type: 'integrates_with', year: 2018, desc: 'Saved Searches are accessible within the Saved tab' },
        { target: 'saved-sellers', type: 'integrates_with', year: 2018, desc: 'Saved Sellers are accessible within the Saved tab' },
        { target: 'watchlist', type: 'integrates_with', year: 2018, desc: 'Watchlist items are part of the Saved tab consolidation' },
        { target: 'ebay-mobile-app', type: 'depends_on', year: 2018, desc: 'Saved tab is a primary navigation element in the eBay mobile app' },
      ];
      break;

    case 'saved-drafts':
      newRels = [
        { target: 'drafts', type: 'depends_on', year: 2010, desc: 'Saved Drafts is an alternative name for the Drafts feature' },
        { target: 'listing', type: 'integrates_with', year: 2010, desc: 'Saved Drafts stores in-progress listing creation sessions' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Saved Drafts are accessible from Seller Hub listing management' },
        { target: 'ebay-selling-app', type: 'integrates_with', year: 2018, desc: 'Saved Drafts is emphasized in the mobile selling app experience' },
      ];
      break;

    case 'saved-payment-methods':
      newRels = [
        { target: 'payments-checkout', type: 'depends_on', year: 2010, desc: 'Saved Payment Methods is part of the payments and checkout infrastructure' },
        { target: 'checkout', type: 'integrates_with', year: 2010, desc: 'Saved Payment Methods enables one-click checkout' },
        { target: 'managed-payments', type: 'depends_on', year: 2019, desc: 'Managed Payments system stores and tokenizes payment methods' },
        { target: 'account-security', type: 'related_to', year: 2010, desc: 'PCI-compliant tokenization protects saved payment data' },
        { target: 'apple-pay', type: 'related_to', year: 2018, desc: 'Apple Pay can be saved as a payment method' },
        { target: 'google-pay', type: 'related_to', year: 2018, desc: 'Google Pay can be saved as a payment method' },
      ];
      break;

    case 'saved-searches':
      newRels = [
        { target: 'buyer', type: 'depends_on', year: 2005, desc: 'Saved Searches is a core buyer discovery feature' },
        { target: 'search', type: 'depends_on', year: 2005, desc: 'Saved Searches persists search queries from the search experience' },
        { target: 'email-alerts', type: 'integrates_with', year: 2005, desc: 'Saved Searches send email alerts when new matching listings appear' },
        { target: 'push-notifications', type: 'integrates_with', year: 2016, desc: 'Saved Searches trigger push notifications in the mobile app' },
        { target: 'my-ebay', type: 'integrates_with', year: 2005, desc: 'Saved Searches are managed within My eBay' },
        { target: 'saved', type: 'integrates_with', year: 2018, desc: 'Saved Searches are accessible from the Saved tab in the mobile app' },
        { target: 'discovery', type: 'depends_on', year: 2005, desc: 'Saved Searches is a core discovery feature' },
        { target: 'watch-list', type: 'related_to', year: 2005, desc: 'Watch List tracks specific items; Saved Searches tracks query results' },
        { target: 'saved-sellers', type: 'related_to', year: 2012, desc: 'Both save buyer interests for ongoing engagement' },
        { target: 'personalized-feed', type: 'integrates_with', year: 2012, desc: 'Saved Searches feed into the personalized homepage feed' },
      ];
      break;

    case 'saved-searches-multi-market':
      newRels = [
        { target: 'saved-searches', type: 'related_to', year: 2003, desc: 'Multi-market localized variant of Saved Searches' },
        { target: 'buyer', type: 'depends_on', year: 2003, desc: 'Core buyer discovery feature across markets' },
        { target: 'search', type: 'depends_on', year: 2003, desc: 'Persists search queries with market-specific localization' },
        { target: 'email-notifications', type: 'integrates_with', year: 2003, desc: 'Triggers email notifications for new matching listings' },
      ];
      break;

    case 'saved-seller':
      newRels = [
        { target: 'saved-sellers', type: 'depends_on', year: 2016, desc: 'Saved Seller is the singular action button that populates Saved Sellers list' },
        { target: 'follow-seller', type: 'related_to', year: 2016, desc: 'Saved Seller and Follow Seller are variants of the same feature' },
        { target: 'ebay-stores', type: 'integrates_with', year: 2016, desc: 'Saved Seller button appears on eBay Store header pages' },
        { target: 'ebay-mobile-app', type: 'integrates_with', year: 2016, desc: 'Saved Seller is a prominent action in the mobile app seller profile view' },
      ];
      break;

    case 'saved-sellers':
      newRels = [
        { target: 'saved', type: 'depends_on', year: 2016, desc: 'Saved Sellers is a component of the Saved tab experience' },
        { target: 'buyer', type: 'depends_on', year: 2016, desc: 'Saved Sellers is a buyer discovery and loyalty feature' },
        { target: 'follow-seller', type: 'related_to', year: 2016, desc: 'Follow Seller is an alternate name for the same functionality' },
        { target: 'email-alerts', type: 'integrates_with', year: 2016, desc: 'Saved Sellers triggers alerts when bookmarked sellers add new listings' },
        { target: 'ebay-stores', type: 'integrates_with', year: 2016, desc: 'Saving a seller links to their eBay Store for curated browsing' },
        { target: 'discovery', type: 'depends_on', year: 2012, desc: 'Saved Sellers is a discovery and re-engagement feature' },
        { target: 'saved-searches', type: 'related_to', year: 2012, desc: 'Both save buyer interests for ongoing engagement with sellers' },
        { target: 'watch-list', type: 'related_to', year: 2012, desc: 'Watch List and Saved Sellers both drive buyer return visits' },
        { target: 'personalized-feed', type: 'integrates_with', year: 2012, desc: 'Saved seller new listings appear in the personalized feed' },
      ];
      break;

    case 'schedule-listing':
      newRels = [
        { target: 'listing', type: 'depends_on', year: 2005, desc: 'Schedule Listing is a listing creation timing feature' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Schedule Listing option is available within Seller Hub listing tools' },
        { target: 'scheduled-listing', type: 'related_to', year: 2005, desc: 'Schedule Listing and Scheduled Listing are the action vs. status of the same feature' },
        { target: 'auction-format', type: 'integrates_with', year: 2005, desc: 'Scheduling is especially valuable for timing auction end times' },
      ];
      break;

    case 'schedule-listing-multi-market':
      newRels = [
        { target: 'listing-features', type: 'depends_on', year: 2001, desc: 'Schedule Listing is a listing feature across markets' },
        { target: 'schedule-listing', type: 'related_to', year: 2001, desc: 'Multi-market variant of the Schedule Listing feature' },
        { target: 'seller-hub-multi-market', type: 'integrates_with', year: 2016, desc: 'Available within localized Seller Hub listing tools' },
        { target: 'auction-format', type: 'integrates_with', year: 2001, desc: 'Sellers schedule auction end times to maximize buyer traffic' },
      ];
      break;

    case 'schedule-start-time':
      newRels = [
        { target: 'listing', type: 'depends_on', year: 2005, desc: 'Schedule Start Time is a listing timing option' },
        { target: 'schedule-listing', type: 'related_to', year: 2005, desc: 'Schedule Start Time is another name for the Schedule Listing feature' },
        { target: 'scheduled-listing', type: 'related_to', year: 2005, desc: 'Scheduled Listing is the result of using Schedule Start Time' },
      ];
      break;

    case 'scheduled-listing':
      newRels = [
        { target: 'listing', type: 'depends_on', year: 2005, desc: 'Scheduled Listing is a listing creation mode' },
        { target: 'schedule-listing', type: 'related_to', year: 2005, desc: 'Scheduled Listing is the noun form; Schedule Listing is the verb action' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Scheduled Listings are managed from Seller Hub' },
        { target: 'auction-format', type: 'integrates_with', year: 2005, desc: 'Auction timing optimization is the primary use case for Scheduled Listings' },
      ];
      break;

    case 'scheduled-listings':
      newRels = [
        { target: 'listing', type: 'depends_on', year: 2006, desc: 'Scheduled Listings is the plural management view of scheduled listing items' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Sellers manage their queue of Scheduled Listings in Seller Hub' },
        { target: 'scheduled-listing', type: 'related_to', year: 2006, desc: 'Scheduled Listings is the collection view; Scheduled Listing is an individual item' },
      ];
      break;

    case 'search-filters':
      newRels = [
        { target: 'search', type: 'depends_on', year: 2009, desc: 'Search Filters are refinement options within the eBay search experience' },
        { target: 'cassini', type: 'depends_on', year: 2009, desc: 'Cassini algorithm powers the filtered search results' },
        { target: 'condition-filter', type: 'integrates_with', year: 2009, desc: 'Condition Filter is one of the primary search filters' },
        { target: 'price-range-filter', type: 'integrates_with', year: 2009, desc: 'Price Range Filter is a key search filter' },
        { target: 'free-shipping-filter', type: 'integrates_with', year: 2009, desc: 'Free Shipping Filter is a popular search refinement' },
        { target: 'returns-accepted-filter', type: 'integrates_with', year: 2013, desc: 'Returns Accepted Filter is a trust-signal search filter' },
        { target: 'authenticity-guarantee-filter', type: 'integrates_with', year: 2020, desc: 'Authenticity Guarantee Filter is a trust filter within search' },
        { target: 'discovery-buyer-experience', type: 'integrates_with', year: 2009, desc: 'Search Filters are a key component of the buyer discovery experience' },
      ];
      break;

    case 'search-standing-dashboard':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2019, desc: 'Search Standing Dashboard is a Seller Hub analytics module' },
        { target: 'analytics', type: 'depends_on', year: 2019, desc: 'Part of the seller analytics reporting suite' },
        { target: 'cassini', type: 'related_to', year: 2019, desc: 'Dashboard reflects seller\'s standing in the Cassini search algorithm' },
        { target: 'best-match', type: 'integrates_with', year: 2019, desc: 'Best Match ranking factors are explained in the Search Standing Dashboard' },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2019, desc: 'Performance defects that impact search visibility are shown in the dashboard' },
        { target: 'listing-quality-report', type: 'integrates_with', year: 2019, desc: 'Search Standing and Listing Quality Report complement each other for optimization' },
      ];
      break;

    case 'seasonal-seller-standards':
      newRels = [
        { target: 'seller-performance-standards', type: 'depends_on', year: 2014, desc: 'Seasonal Seller Standards is a temporary relaxation of Seller Performance Standards' },
        { target: 'trust-safety', type: 'integrates_with', year: 2014, desc: 'Seasonal adjustments are part of the platform trust framework' },
        { target: 'top-rated-seller', type: 'related_to', year: 2014, desc: 'Top Rated Seller status evaluation is adjusted during seasonal periods' },
        { target: 'transaction-defect-rate', type: 'integrates_with', year: 2014, desc: 'Transaction Defect Rate thresholds are relaxed under Seasonal Seller Standards' },
      ];
      break;

    case 'second-chance-offer':
      newRels = [
        { target: 'auction-format', type: 'depends_on', year: 2002, desc: 'Second Chance Offer is available only on auction-format listings' },
        { target: 'unpaid-item-assistant', type: 'integrates_with', year: 2005, desc: 'Second Chance Offer is triggered when Unpaid Item case is resolved' },
        { target: 'best-offer', type: 'related_to', year: 2002, desc: 'Second Chance Offer is similar to Best Offer but post-auction only' },
        { target: 'bidding', type: 'integrates_with', year: 2002, desc: 'Second Chance Offer targets losing bidders who participated in the auction' },
      ];
      break;

    case 'secure-checkout':
      newRels = [
        { target: 'checkout', type: 'depends_on', year: 2005, desc: 'Secure Checkout is a trust badge displayed during the checkout process' },
        { target: 'payments-checkout', type: 'integrates_with', year: 2005, desc: 'Secure Checkout signals SSL encryption of the payment flow' },
        { target: 'trust-safety', type: 'integrates_with', year: 2005, desc: 'Secure Checkout is a buyer trust signal during purchase' },
        { target: 'managed-payments', type: 'integrates_with', year: 2019, desc: 'Managed Payments infrastructure provides the PCI compliance behind Secure Checkout' },
      ];
      break;

    case 'self-hosted-images':
      newRels = [
        { target: 'listing', type: 'integrates_with', year: 2003, desc: 'Self-Hosted Images is an option during listing photo upload' },
        { target: 'photo-uploader', type: 'competes_with', year: 2003, desc: 'Self-Hosted Images is the external alternative to eBay\'s Photo Uploader' },
        { target: 'active-content-policy', type: 'related_to', year: 2017, desc: 'Active Content Policy changes affected how external images could be referenced' },
      ];
      break;

    case 'sell-similar':
      newRels = [
        { target: 'listing', type: 'depends_on', year: 2005, desc: 'Sell Similar is a listing creation shortcut' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Sell Similar is accessible from Seller Hub active and sold listings' },
        { target: 'duplicate-listing', type: 'related_to', year: 2005, desc: 'Sell Similar and Duplicate Listing achieve similar outcomes' },
        { target: 'bulk-listing-tool', type: 'related_to', year: 2010, desc: 'For large volumes, Bulk Listing Tool is more efficient than Sell Similar' },
      ];
      break;

    case 'sell-similar-multi-market':
      newRels = [
        { target: 'listing-tools', type: 'depends_on', year: 2002, desc: 'Multi-market Sell Similar is part of the listing tools suite' },
        { target: 'sell-similar', type: 'related_to', year: 2002, desc: 'Localized multi-market variant of Sell Similar' },
        { target: 'seller-hub-multi-market', type: 'integrates_with', year: 2016, desc: 'Available within localized Seller Hub listing management' },
      ];
      break;

    case 'sell-through-rate':
      newRels = [
        { target: 'analytics', type: 'depends_on', year: 2016, desc: 'Sell-Through Rate is an inventory analytics metric' },
        { target: 'seller-hub-reports', type: 'integrates_with', year: 2017, desc: 'Sell-Through Rate is surfaced in Seller Hub Reports' },
        { target: 'terapeak', type: 'integrates_with', year: 2016, desc: 'Terapeak/Product Research uses sell-through rate as a market research metric' },
        { target: 'product-research', type: 'integrates_with', year: 2019, desc: 'Product Research tool shows sell-through rates for category benchmarking' },
        { target: 'inventory-management', type: 'related_to', year: 2016, desc: 'Sell-Through Rate informs inventory replenishment decisions' },
      ];
      break;

    case 'seller-centre':
      newRels = [
        { target: 'seller-tools', type: 'depends_on', year: 2010, desc: 'Seller Centre is the educational hub within the seller tools umbrella' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Seller Centre links to Seller Hub for practical tool access' },
        { target: 'ebay-academy', type: 'integrates_with', year: 2018, desc: 'eBay Academy content is featured in Seller Centre' },
        { target: 'seller-clinics', type: 'integrates_with', year: 2015, desc: 'Seller Clinics are promoted and accessed through Seller Centre' },
        { target: 'seller-updates', type: 'integrates_with', year: 2010, desc: 'Seller Updates are published and hosted on Seller Centre' },
      ];
      break;

    case 'seller-clinics':
      newRels = [
        { target: 'education', type: 'depends_on', year: 2015, desc: 'Seller Clinics are part of eBay\'s seller education program' },
        { target: 'seller-centre', type: 'integrates_with', year: 2015, desc: 'Seller Clinics are promoted through Seller Centre' },
        { target: 'ebay-academy', type: 'related_to', year: 2018, desc: 'Seller Clinics and eBay Academy are both seller education programs' },
        { target: 'community-education', type: 'depends_on', year: 2015, desc: 'Seller Clinics are part of the Community & Education umbrella' },
      ];
      break;

    case 'seller-community':
      newRels = [
        { target: 'community', type: 'depends_on', year: 2005, desc: 'Seller Community is the seller-focused arm of the eBay community' },
        { target: 'community-forums', type: 'integrates_with', year: 2005, desc: 'Seller Community operates through eBay Community Forums' },
        { target: 'ebay-community', type: 'integrates_with', year: 2005, desc: 'Seller Community is part of the broader eBay Community platform' },
        { target: 'seller-news', type: 'integrates_with', year: 2016, desc: 'Seller News announcements are distributed through Seller Community channels' },
      ];
      break;

    case 'seller-coupon':
      newRels = [
        { target: 'promotions-manager', type: 'integrates_with', year: 2018, desc: 'Seller Coupons are created and tracked within Promotions Manager' },
        { target: 'coded-coupons', type: 'related_to', year: 2018, desc: 'Seller Coupon can use a coded coupon format' },
        { target: 'seller-hub', type: 'integrates_with', year: 2018, desc: 'Seller Coupons are managed from Seller Hub marketing tools' },
        { target: 'discounts-manager', type: 'integrates_with', year: 2018, desc: 'Discounts Manager houses the seller coupon creation tools' },
        { target: 'send-coupon', type: 'integrates_with', year: 2018, desc: 'Send Coupon action distributes Seller Coupons to targeted buyers' },
        { target: 'ebay-stores', type: 'integrates_with', year: 2018, desc: 'Seller Coupons are promoted to eBay Store followers and subscribers' },
      ];
      break;

    case 'seller-help':
      newRels = [
        { target: 'support', type: 'depends_on', year: 2005, desc: 'Seller Help is part of eBay\'s seller support infrastructure' },
        { target: 'help-center', type: 'related_to', year: 2005, desc: 'Seller Help is the seller-specific counterpart to the general Help Center' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Seller Help is accessible directly from Seller Hub' },
        { target: 'ebay-customer-service', type: 'integrates_with', year: 2005, desc: 'Seller Help escalates complex issues to eBay Customer Service' },
      ];
      break;

    case 'seller-hub':
      newRels = [
        { target: 'selling-manager', type: 'replaced_by', year: 2017, desc: 'Seller Hub replaced Selling Manager as the primary seller dashboard' },
        { target: 'selling-manager-pro', type: 'replaced_by', year: 2017, desc: 'Seller Hub replaced Selling Manager Pro with expanded capabilities' },
        { target: 'seller-tools-hub', type: 'depends_on', year: 2017, desc: 'Seller Hub is the primary product within the Seller Tools & Hub umbrella' },
        { target: 'promoted-listings', type: 'integrates_with', year: 2017, desc: 'Promoted Listings campaigns are created and managed from Seller Hub' },
        { target: 'seller-hub-reports', type: 'integrates_with', year: 2017, desc: 'Seller Hub Reports is a module within Seller Hub' },
        { target: 'seller-hub-tasks', type: 'integrates_with', year: 2017, desc: 'Seller Hub Tasks is an action center within Seller Hub' },
        { target: 'discounts-manager', type: 'integrates_with', year: 2017, desc: 'Discounts Manager is accessible from Seller Hub marketing tab' },
        { target: 'managed-payments', type: 'integrates_with', year: 2019, desc: 'Payments data and payouts are surfaced within Seller Hub' },
        { target: 'inventory-management', type: 'integrates_with', year: 2017, desc: 'Inventory management tools live within Seller Hub' },
        { target: 'performance-dashboard', type: 'integrates_with', year: 2017, desc: 'Performance Dashboard is a key view within Seller Hub' },
        { target: 'active-listings', type: 'integrates_with', year: 2017, desc: 'Active Listings management is central to Seller Hub' },
        { target: 'seller-initiated-offers', type: 'integrates_with', year: 2017, desc: 'Seller Initiated Offers are sent from within Seller Hub' },
        { target: 'ebay-advertising', type: 'integrates_with', year: 2017, desc: 'eBay advertising tools are launched from Seller Hub' },
      ];
      break;

    case 'seller-hub-multi-market':
      newRels = [
        { target: 'seller-hub', type: 'related_to', year: 2016, desc: 'Multi-market localized variant of Seller Hub' },
        { target: 'seller-tools-hub', type: 'depends_on', year: 2016, desc: 'Part of the Seller Tools & Hub umbrella across markets' },
        { target: 'seller-hub-reports-multi-market', type: 'integrates_with', year: 2016, desc: 'Localized Seller Hub Reports are part of this multi-market product' },
        { target: 'managed-payments-multi-currency', type: 'integrates_with', year: 2019, desc: 'Multi-currency payment data flows into the multi-market Seller Hub' },
        { target: 'vat-collection', type: 'integrates_with', year: 2019, desc: 'VAT reporting and compliance tools are integrated into EU market Seller Hubs' },
      ];
      break;

    case 'seller-hub-reports':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2017, desc: 'Seller Hub Reports is a reporting module within Seller Hub' },
        { target: 'file-exchange', type: 'renamed_from', year: 2017, desc: 'Seller Hub Reports replaced File Exchange for bulk data downloads' },
        { target: 'analytics', type: 'integrates_with', year: 2017, desc: 'Seller Hub Reports feeds into the broader seller analytics suite' },
        { target: 'sales-report', type: 'integrates_with', year: 2017, desc: 'Sales Report is a key report within Seller Hub Reports' },
        { target: 'traffic-report', type: 'integrates_with', year: 2017, desc: 'Traffic Report is accessible through Seller Hub Reports' },
        { target: 'transaction-report', type: 'integrates_with', year: 2017, desc: 'Transaction Report is available within Seller Hub Reports' },
      ];
      break;

    case 'seller-hub-reports-multi-market':
      newRels = [
        { target: 'seller-hub-multi-market', type: 'depends_on', year: 2016, desc: 'Multi-market Seller Hub Reports is a module within the multi-market Seller Hub' },
        { target: 'seller-hub-reports', type: 'related_to', year: 2016, desc: 'Localized variant of Seller Hub Reports with market-specific KPIs' },
        { target: 'sales-report-multi-market', type: 'integrates_with', year: 2016, desc: 'Sales Report is one of the reports in the multi-market suite' },
        { target: 'traffic-report-multi-market', type: 'integrates_with', year: 2016, desc: 'Traffic Report is available within the multi-market reports suite' },
      ];
      break;

    case 'seller-hub-tasks':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2016, desc: 'Seller Hub Tasks is an action center within Seller Hub' },
        { target: 'awaiting-shipment', type: 'integrates_with', year: 2016, desc: 'Awaiting Shipment orders are prominent in Seller Hub Tasks' },
        { target: 'return-requested', type: 'integrates_with', year: 2016, desc: 'Return Requested cases surface as tasks' },
        { target: 'payment-holds', type: 'integrates_with', year: 2016, desc: 'Payment holds require seller attention and appear in Tasks' },
        { target: 'buyer-messages', type: 'integrates_with', year: 2016, desc: 'Unanswered buyer messages appear as tasks requiring response' },
      ];
      break;

    case 'seller-initiated-offers':
      newRels = [
        { target: 'best-offer', type: 'integrates_with', year: 2014, desc: 'Seller Initiated Offers extends Best Offer by letting sellers proactively send discounts' },
        { target: 'seller-hub', type: 'depends_on', year: 2017, desc: 'Seller Initiated Offers are sent from within Seller Hub' },
        { target: 'offers-to-buyers', type: 'related_to', year: 2016, desc: 'Offers to Buyers and Seller Initiated Offers describe the same feature' },
        { target: 'offers-to-watchers', type: 'related_to', year: 2016, desc: 'Offers to Watchers is a targeted subset of Seller Initiated Offers' },
        { target: 'promotions-manager', type: 'integrates_with', year: 2018, desc: 'Promotions Manager can automate seller initiated offer campaigns' },
      ];
      break;

    case 'seller-news':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2016, desc: 'Seller News is an announcements section within Seller Hub' },
        { target: 'seller-updates', type: 'related_to', year: 2016, desc: 'Seller News and Seller Updates are complementary announcement channels' },
        { target: 'seller-newsletter', type: 'related_to', year: 2016, desc: 'Seller Newsletter delivers Seller News content via email' },
      ];
      break;

    case 'seller-newsletter':
      newRels = [
        { target: 'education', type: 'depends_on', year: 2007, desc: 'Seller Newsletter is part of eBay\'s seller education program' },
        { target: 'seller-updates', type: 'integrates_with', year: 2010, desc: 'Seller Newsletter includes content from the quarterly Seller Updates' },
        { target: 'seller-news', type: 'integrates_with', year: 2016, desc: 'Seller News content is distributed via the Seller Newsletter email' },
        { target: 'email-notifications', type: 'depends_on', year: 2007, desc: 'Seller Newsletter is delivered via eBay\'s email notification system' },
        { target: 'top-rated-seller', type: 'related_to', year: 2010, desc: 'Newsletter content is segmented by seller tier including Top Rated Sellers' },
      ];
      break;

    case 'seller-pays-return-shipping':
      newRels = [
        { target: 'returns', type: 'depends_on', year: 2014, desc: 'Seller Pays Return Shipping is a returns policy configuration' },
        { target: 'return-preferences', type: 'integrates_with', year: 2014, desc: 'Configured as part of seller return preferences settings' },
        { target: 'top-rated-plus', type: 'depends_on', year: 2014, desc: 'Top Rated Plus badge requires seller-paid free returns' },
        { target: 'automated-return-labels', type: 'integrates_with', year: 2016, desc: 'When seller pays, automated prepaid return labels are generated' },
        { target: 'buyer-pays-return-shipping', type: 'competes_with', year: 2014, desc: 'The alternative policy where buyer covers return shipping costs' },
      ];
      break;

    case 'seller-performance-standards':
      newRels = [
        { target: 'trust-safety', type: 'depends_on', year: 2008, desc: 'Seller Performance Standards is a core component of platform trust' },
        { target: 'top-rated-seller', type: 'integrates_with', year: 2008, desc: 'Top Rated Seller status is awarded based on Performance Standards metrics' },
        { target: 'above-standard', type: 'integrates_with', year: 2008, desc: 'Above Standard is one of the three tiers in Seller Performance Standards' },
        { target: 'below-standard', type: 'integrates_with', year: 2008, desc: 'Below Standard is the lowest tier in Seller Performance Standards' },
        { target: 'transaction-defect-rate', type: 'integrates_with', year: 2008, desc: 'Transaction Defect Rate is a primary metric in Seller Performance Standards' },
        { target: 'late-shipment-rate', type: 'integrates_with', year: 2008, desc: 'Late Shipment Rate is a key performance metric' },
        { target: 'cases-closed-without-seller-resolution', type: 'integrates_with', year: 2008, desc: 'Unresolved cases are tracked as defects in performance standards' },
        { target: 'seasonal-seller-standards', type: 'integrates_with', year: 2014, desc: 'Seasonal Seller Standards are a temporary override of base performance standards' },
        { target: 'best-match', type: 'integrates_with', year: 2009, desc: 'Seller performance status affects Best Match search ranking' },
        { target: 'trust', type: 'depends_on', year: 2008, desc: 'Seller Performance Standards enforce platform trust on the supply side' },
        { target: 'service-metrics-dashboard', type: 'integrates_with', year: 2012, desc: 'Service Metrics Dashboard is a sub-tool of performance standards' },
        { target: 'seller-hub', type: 'integrates_with', year: 2016, desc: 'Performance Standards dashboard is accessible from Seller Hub' },
      ];
      break;

    case 'seller-performance-standards-multi-market':
      newRels = [
        { target: 'seller-performance-standards', type: 'related_to', year: 2010, desc: 'Multi-market variant with localized thresholds by country' },
        { target: 'seller-programs', type: 'depends_on', year: 2010, desc: 'Part of the seller programs umbrella' },
        { target: 'top-rated-seller-multi-market', type: 'integrates_with', year: 2010, desc: 'Top Rated Seller status across markets depends on localized performance standards' },
        { target: 'transaction-defect-rate', type: 'integrates_with', year: 2010, desc: 'Transaction Defect Rate thresholds vary by market' },
      ];
      break;

    case 'seller-protections':
      newRels = [
        { target: 'trust-safety', type: 'depends_on', year: 2010, desc: 'Seller Protections is part of the platform-wide trust and safety framework' },
        { target: 'payment-dispute-protections', type: 'integrates_with', year: 2019, desc: 'Payment Dispute Seller Protections is a key component of Seller Protections' },
        { target: 'resolution-center-multi-market', type: 'integrates_with', year: 2010, desc: 'Seller Protections are enforced through Resolution Center decisions' },
        { target: 'ebay-money-back-guarantee', type: 'integrates_with', year: 2010, desc: 'Seller Protections define limits on what sellers are liable for under MBG' },
        { target: 'managed-payments', type: 'integrates_with', year: 2019, desc: 'Managed Payments facilitates refund and chargeback protections for sellers' },
      ];
      break;

    case 'seller-refurbished':
      newRels = [
        { target: 'refurbished', type: 'depends_on', year: 2010, desc: 'Seller Refurbished is a condition tier within the Refurbished category umbrella' },
        { target: 'ebay-refurbished', type: 'related_to', year: 2021, desc: 'Seller Refurbished is being phased out in favor of the eBay Refurbished program' },
        { target: 'certified-refurbished', type: 'competes_with', year: 2020, desc: 'Certified Refurbished offers stronger buyer guarantees than Seller Refurbished' },
        { target: 'refurbished-open-box', type: 'related_to', year: 2010, desc: 'Part of the refurbished and open-box category' },
      ];
      break;

    case 'seller-responded':
      newRels = [
        { target: 'buyer', type: 'depends_on', year: 2010, desc: 'Seller Responded is a buyer-facing notification' },
        { target: 'message-center', type: 'integrates_with', year: 2010, desc: 'Seller Responded triggers a message in My eBay Messages' },
        { target: 'in-app-messaging', type: 'integrates_with', year: 2015, desc: 'Seller Responded triggers in-app push notification' },
        { target: 'seller-response', type: 'related_to', year: 2010, desc: 'Seller Responded is the buyer notification; Seller Response is the seller action' },
      ];
      break;

    case 'seller-response':
      newRels = [
        { target: 'feedback-forum', type: 'integrates_with', year: 2014, desc: 'Sellers use Seller Response to publicly reply to buyer feedback' },
        { target: 'detailed-seller-ratings', type: 'integrates_with', year: 2014, desc: 'Seller Response capability extends to DSR comments' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Seller Response is accessible from Seller Hub feedback management' },
        { target: 'reply-to-feedback', type: 'related_to', year: 2014, desc: 'Reply to Feedback and Seller Response are the same feature' },
      ];
      break;

    case 'seller-transaction-report':
      newRels = [
        { target: 'payments', type: 'depends_on', year: 2019, desc: 'Seller Transaction Report is a payments reporting output' },
        { target: 'managed-payments', type: 'integrates_with', year: 2019, desc: 'Transaction data comes from the Managed Payments platform' },
        { target: 'seller-hub-reports', type: 'integrates_with', year: 2019, desc: 'Seller Transaction Report is accessible via Seller Hub Reports' },
        { target: 'sales-tax-collection', type: 'integrates_with', year: 2019, desc: 'Tax collected per transaction is included in the Seller Transaction Report' },
        { target: '1099-k-tax-form', type: 'integrates_with', year: 2020, desc: 'Transaction Report data is used for 1099-K tax form generation' },
      ];
      break;

    case 'seller-updates':
      newRels = [
        { target: 'education', type: 'depends_on', year: 2010, desc: 'Seller Updates are part of eBay\'s seller education and communication program' },
        { target: 'seller-centre', type: 'integrates_with', year: 2010, desc: 'Seller Updates are published on Seller Centre' },
        { target: 'seller-newsletter', type: 'integrates_with', year: 2010, desc: 'Key Seller Updates are highlighted in the Seller Newsletter' },
        { target: 'seller-news', type: 'related_to', year: 2016, desc: 'Seller News in Seller Hub provides real-time updates; Seller Updates is the quarterly publication' },
      ];
      break;

    case 'seller-verification':
      newRels = [
        { target: 'trust-safety', type: 'depends_on', year: 2019, desc: 'Seller Verification is a trust and safety identity check' },
        { target: 'account-security', type: 'integrates_with', year: 2019, desc: 'Seller Verification is part of account security practices' },
        { target: 'authentication', type: 'integrates_with', year: 2019, desc: 'Authentication umbrella includes seller identity verification' },
        { target: 'selling-restrictions', type: 'integrates_with', year: 2019, desc: 'Failure to complete Seller Verification results in selling restrictions' },
        { target: 'authenticity-guarantee', type: 'related_to', year: 2019, desc: 'Seller Verification is required for sellers in Authenticity Guarantee categories' },
        { target: 'trust', type: 'depends_on', year: 2025, desc: 'Seller Verification is part of eBay trust and safety infrastructure' },
        { target: 'trust-safety', type: 'integrates_with', year: 2025, desc: 'Verification badge displayed on seller profiles for buyer confidence' },
        { target: 'seller-performance-standards', type: 'related_to', year: 2025, desc: 'Complementary trust signal alongside seller performance standards' },
        { target: 'top-rated-seller', type: 'related_to', year: 2025, desc: 'Both are seller trust markers; verification is identity, TRS is performance' },
      ];
      break;

    case 'selling-activity-notifications':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2016, desc: 'Selling Activity Notifications are managed within Seller Hub' },
        { target: 'notifications', type: 'depends_on', year: 2016, desc: 'Part of the eBay notifications system' },
        { target: 'push-notifications', type: 'integrates_with', year: 2016, desc: 'Selling notifications are delivered via mobile push' },
        { target: 'email-notifications', type: 'integrates_with', year: 2016, desc: 'Selling notifications are also delivered by email' },
        { target: 'selling-notifications', type: 'related_to', year: 2016, desc: 'Selling Notifications is an alternate name for the same feature' },
      ];
      break;

    case 'selling-coach':
      newRels = [
        { target: 'listing-quality-report', type: 'renamed_to', year: 2018, desc: 'Selling Coach was deprecated and replaced by Listing Quality Report' },
        { target: 'education', type: 'depends_on', year: 2009, desc: 'Selling Coach was an educational recommendation tool' },
        { target: 'listing', type: 'integrates_with', year: 2009, desc: 'Selling Coach analyzed listing quality and suggested improvements' },
      ];
      break;

    case 'selling-manager':
      newRels = [
        { target: 'seller-hub', type: 'renamed_to', year: 2017, desc: 'Selling Manager was replaced by Seller Hub in 2017' },
        { target: 'seller-tools', type: 'depends_on', year: 2005, desc: 'Selling Manager was a core seller tool' },
        { target: 'selling-manager-pro', type: 'related_to', year: 2007, desc: 'Selling Manager Pro was the advanced version of Selling Manager' },
      ];
      break;

    case 'selling-manager-pro':
      newRels = [
        { target: 'seller-hub', type: 'renamed_to', year: 2017, desc: 'Selling Manager Pro was replaced by Seller Hub' },
        { target: 'selling-manager', type: 'related_to', year: 2007, desc: 'Selling Manager Pro was the advanced tier of Selling Manager' },
        { target: 'seller-tools', type: 'depends_on', year: 2007, desc: 'Part of the seller tools suite' },
        { target: 'bulk-listing-tool', type: 'integrates_with', year: 2007, desc: 'Selling Manager Pro included bulk listing capabilities' },
        { target: 'seller-hub', type: 'replaced_by', year: 2022, desc: 'Selling Manager Pro features migrated to free Seller Hub in 2022' },
        { target: 'automated-feedback', type: 'integrates_with', year: 2010, desc: 'Automated feedback was a key Selling Manager Pro feature' },
        { target: 'inventory-management', type: 'integrates_with', year: 2010, desc: 'Inventory tracking was a core Selling Manager Pro capability' },
      ];
      break;

    case 'selling-notifications':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2016, desc: 'Selling Notifications are part of Seller Hub' },
        { target: 'selling-activity-notifications', type: 'related_to', year: 2016, desc: 'Selling Notifications is an alternate name for Selling Activity Notifications' },
        { target: 'notifications', type: 'depends_on', year: 2016, desc: 'Part of the eBay notifications umbrella' },
        { target: 'push-notifications', type: 'integrates_with', year: 2016, desc: 'Delivered via mobile push notifications' },
      ];
      break;

    case 'selling-preferences':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2008, desc: 'Selling Preferences are configured within Seller Hub account settings' },
        { target: 'return-preferences', type: 'integrates_with', year: 2012, desc: 'Return Preferences are a subset of Selling Preferences' },
        { target: 'time-away', type: 'integrates_with', year: 2015, desc: 'Time Away/vacation mode is configured in Selling Preferences' },
        { target: 'business-policies', type: 'integrates_with', year: 2012, desc: 'Business Policies are managed through Selling Preferences' },
      ];
      break;

    case 'selling-restrictions':
      newRels = [
        { target: 'trust-safety', type: 'depends_on', year: 2005, desc: 'Selling Restrictions are a trust and safety enforcement mechanism' },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2008, desc: 'Poor performance standards can trigger selling restrictions' },
        { target: 'account-suspension', type: 'related_to', year: 2005, desc: 'Selling Restrictions is a step before full account suspension' },
        { target: 'vero-program', type: 'integrates_with', year: 2005, desc: 'VeRO program violations result in selling restrictions on infringing items' },
      ];
      break;

    case 'selling-with-ai':
      newRels = [
        { target: 'listing', type: 'integrates_with', year: 2024, desc: 'Selling with AI enhances the listing creation workflow' },
        { target: 'ai-description-generator', type: 'integrates_with', year: 2024, desc: 'AI Description Generator is a core component of Selling with AI' },
        { target: 'magical-listing', type: 'related_to', year: 2024, desc: 'Magical Listing is the AI-powered listing experience within Selling with AI' },
        { target: 'ai-generated-backgrounds', type: 'integrates_with', year: 2024, desc: 'AI-Generated Backgrounds is part of the Selling with AI feature set' },
        { target: 'photo-enhancement', type: 'integrates_with', year: 2024, desc: 'AI photo enhancement is part of the Selling with AI capabilities' },
        { target: 'item-specifics', type: 'integrates_with', year: 2024, desc: 'AI automatically suggests item specifics during listing creation' },
      ];
      break;

    case 'send-coupon':
      newRels = [
        { target: 'promotions-manager', type: 'depends_on', year: 2018, desc: 'Send Coupon distributes coupons created in Promotions Manager' },
        { target: 'seller-coupon', type: 'integrates_with', year: 2018, desc: 'Send Coupon delivers Seller Coupons to targeted buyer segments' },
        { target: 'coded-coupons', type: 'integrates_with', year: 2018, desc: 'Send Coupon can distribute coded coupons' },
        { target: 'seller-hub', type: 'integrates_with', year: 2018, desc: 'Send Coupon is accessible from Seller Hub marketing tools' },
      ];
      break;

    case 'send-invoice':
      newRels = [
        { target: 'order-management', type: 'depends_on', year: 2003, desc: 'Send Invoice is an order management action' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Send Invoice is accessible from Seller Hub order management' },
        { target: 'combined-shipping', type: 'integrates_with', year: 2005, desc: 'Send Invoice is often used to finalize combined shipping discounts' },
        { target: 'managed-payments', type: 'integrates_with', year: 2019, desc: 'Invoices route through the Managed Payments system for collection' },
      ];
      break;

    case 'send-message':
      newRels = [
        { target: 'buyer', type: 'depends_on', year: 2000, desc: 'Send Message is a buyer-to-seller communication tool' },
        { target: 'message-center', type: 'integrates_with', year: 2005, desc: 'Messages sent via Send Message appear in the Message Center' },
        { target: 'in-app-messaging', type: 'integrates_with', year: 2015, desc: 'Send Message is integrated into the in-app messaging experience' },
        { target: 'ebay-ai-message-assistance', type: 'integrates_with', year: 2023, desc: 'AI Message Assistance can suggest responses to messages' },
      ];
      break;

    case 'send-offer':
      newRels = [
        { target: 'best-offer', type: 'depends_on', year: 2005, desc: 'Send Offer is the buyer action that initiates a Best Offer negotiation' },
        { target: 'make-offer', type: 'related_to', year: 2005, desc: 'Send Offer and Make Offer are alternate names for the same buyer action' },
        { target: 'offer-sent', type: 'related_to', year: 2005, desc: 'Offer Sent is the confirmation status after Send Offer is completed' },
        { target: 'counter-offer', type: 'related_to', year: 2005, desc: 'Counter Offer can be sent in response to a Send Offer action' },
      ];
      break;

    case 'send-refund':
      newRels = [
        { target: 'order-management', type: 'depends_on', year: 2011, desc: 'Send Refund is an order management action' },
        { target: 'managed-payments', type: 'depends_on', year: 2019, desc: 'Refunds are processed through the Managed Payments platform' },
        { target: 'return-received', type: 'integrates_with', year: 2013, desc: 'Send Refund is triggered after Return Received inspection window expires' },
        { target: 'full-refund', type: 'related_to', year: 2011, desc: 'Full Refund is a Send Refund outcome' },
        { target: 'partial-refund', type: 'related_to', year: 2013, desc: 'Partial Refund is an alternative Send Refund outcome' },
        { target: 'seller-hub-tasks', type: 'integrates_with', year: 2017, desc: 'Pending refunds appear as tasks in Seller Hub Tasks' },
      ];
      break;

    case 'services-paiement-ebay':
      newRels = [
        { target: 'managed-payments-multi-currency', type: 'depends_on', year: 2019, desc: 'Services de paiement eBay is the French variant of Managed Payments Multi-Currency' },
        { target: 'managed-payments', type: 'related_to', year: 2019, desc: 'French localization of the Managed Payments platform' },
        { target: 'ebay-france', type: 'depends_on', year: 2019, desc: 'Services de paiement eBay is specific to the French market' },
        { target: 'vat-collection', type: 'integrates_with', year: 2019, desc: 'French VAT is collected through this payment service' },
      ];
      break;

    case 'session-duration':
      newRels = [
        { target: 'analytics', type: 'depends_on', year: 2018, desc: 'Session Duration is an analytics metric in seller reporting' },
        { target: 'traffic-report', type: 'integrates_with', year: 2018, desc: 'Session Duration appears in traffic reporting for listing pages' },
        { target: 'bounce-rate', type: 'related_to', year: 2018, desc: 'Session Duration and Bounce Rate are complementary engagement metrics' },
      ];
      break;

    case 'session-expired':
      newRels = [
        { target: 'account-security', type: 'depends_on', year: 2010, desc: 'Session Expired is an account security timeout mechanism' },
        { target: 'two-factor-authentication', type: 'related_to', year: 2010, desc: 'Re-authentication after session expiry may require 2FA' },
        { target: 'checkout', type: 'integrates_with', year: 2010, desc: 'Session expiry during checkout prompts re-login before payment' },
      ];
      break;

    case 'shake-to-search':
      newRels = [
        { target: 'search', type: 'integrates_with', year: 2016, desc: 'Shake to Search was a mobile search discovery Easter egg' },
        { target: 'ebay-mobile-app', type: 'depends_on', year: 2016, desc: 'Shake to Search was a mobile app-only feature' },
        { target: 'discovery-buyer-experience', type: 'related_to', year: 2016, desc: 'Shake to Search was an experimental discovery feature' },
      ];
      break;

    case 'share-listing':
      newRels = [
        { target: 'ebay-mobile-app', type: 'depends_on', year: 2014, desc: 'Share Listing is a prominent feature in the eBay mobile app' },
        { target: 'share-this-item', type: 'related_to', year: 2014, desc: 'Share Listing and Share This Item are the same feature with different naming' },
        { target: 'discovery-buyer-experience', type: 'integrates_with', year: 2014, desc: 'Social sharing drives external traffic to eBay listings' },
        { target: 'promoted-listings', type: 'related_to', year: 2014, desc: 'Shared listings complement paid promotion by driving organic external traffic' },
      ];
      break;

    case 'share-this-item':
      newRels = [
        { target: 'share-listing', type: 'related_to', year: 2013, desc: 'Share This Item is the desktop naming for the same feature as Share Listing' },
        { target: 'discovery-buyer-experience', type: 'integrates_with', year: 2013, desc: 'Sharing drives discovery and viral traffic to listings' },
        { target: 'ebay-partner-network', type: 'related_to', year: 2013, desc: 'Shared links can include eBay Partner Network affiliate tracking' },
      ];
      break;

    case 'shill-bidding-policy':
      newRels = [
        { target: 'trust-safety', type: 'depends_on', year: 1999, desc: 'Shill Bidding Policy is a core auction integrity rule' },
        { target: 'auction-format', type: 'integrates_with', year: 1999, desc: 'Shill Bidding Policy governs the auction format specifically' },
        { target: 'bid-shielding-policy', type: 'related_to', year: 1999, desc: 'Bid Shielding Policy is a complementary auction manipulation prohibition' },
        { target: 'vero-program', type: 'related_to', year: 1999, desc: 'VeRO and shill bidding are both platform integrity programs' },
        { target: 'account-suspension', type: 'integrates_with', year: 1999, desc: 'Shill bidding violations result in account suspension' },
      ];
      break;

    case 'ship-from-address':
      newRels = [
        { target: 'shipping', type: 'depends_on', year: 2013, desc: 'Ship From Address is a shipping configuration field' },
        { target: 'shipping-labels', type: 'depends_on', year: 2013, desc: 'Ship From Address is used to generate shipping labels' },
        { target: 'shipping-calculator', type: 'depends_on', year: 2013, desc: 'Shipping Calculator uses Ship From Address for rate estimation' },
        { target: 'estimated-delivery', type: 'integrates_with', year: 2013, desc: 'Estimated delivery dates are calculated from the Ship From Address' },
      ];
      break;

    case 'ship-to-store':
      newRels = [
        { target: 'local-pickup', type: 'renamed_to', year: 2016, desc: 'Ship to Store was discontinued and succeeded by Local Pickup' },
        { target: 'shipping', type: 'depends_on', year: 2013, desc: 'Ship to Store was a shipping destination option' },
        { target: 'in-store-pickup', type: 'related_to', year: 2013, desc: 'Ship to Store and In-Store Pickup served similar buyer convenience needs' },
      ];
      break;

    case 'shipment-confirmation':
      newRels = [
        { target: 'notifications', type: 'depends_on', year: 2010, desc: 'Shipment Confirmation is a buyer notification' },
        { target: 'package-tracking', type: 'integrates_with', year: 2010, desc: 'Shipment Confirmation includes tracking number for Package Tracking' },
        { target: 'email-notifications', type: 'integrates_with', year: 2010, desc: 'Shipment Confirmation is delivered via email notification' },
        { target: 'push-notifications', type: 'integrates_with', year: 2016, desc: 'Shipment Confirmation also triggers a mobile push notification' },
        { target: 'delivery-updates', type: 'integrates_with', year: 2015, desc: 'Shipment Confirmation initiates the delivery updates notification sequence' },
      ];
      break;

    case 'shipping-calculator':
      newRels = [
        { target: 'shipping', type: 'depends_on', year: 2006, desc: 'Shipping Calculator is a core shipping feature' },
        { target: 'checkout', type: 'integrates_with', year: 2006, desc: 'Shipping Calculator is embedded in the checkout flow' },
        { target: 'calculated-shipping', type: 'integrates_with', year: 2006, desc: 'Calculated Shipping uses the Shipping Calculator to determine costs' },
        { target: 'ship-from-address', type: 'depends_on', year: 2013, desc: 'Shipping Calculator uses the Ship From Address for rate calculation' },
        { target: 'estimated-delivery', type: 'integrates_with', year: 2008, desc: 'Shipping Calculator outputs estimated delivery date alongside cost' },
      ];
      break;

    case 'shipping-cost':
      newRels = [
        { target: 'shipping', type: 'depends_on', year: 2000, desc: 'Shipping Cost is a foundational shipping display element' },
        { target: 'shipping-calculator', type: 'integrates_with', year: 2006, desc: 'Shipping Calculator determines the Shipping Cost shown to buyers' },
        { target: 'checkout', type: 'integrates_with', year: 2000, desc: 'Shipping Cost is prominently shown during checkout' },
        { target: 'free-shipping', type: 'related_to', year: 2008, desc: 'Free Shipping is shown as $0.00 Shipping Cost' },
      ];
      break;

    case 'shipping-discount':
      newRels = [
        { target: 'shipping', type: 'depends_on', year: 2006, desc: 'Shipping Discount is a shipping incentive feature' },
        { target: 'combined-shipping-discount', type: 'integrates_with', year: 2006, desc: 'Combined Shipping Discount is the most common application of Shipping Discount' },
        { target: 'promotions-manager', type: 'integrates_with', year: 2015, desc: 'Shipping Discounts are configured within Promotions Manager' },
        { target: 'discounts-manager', type: 'integrates_with', year: 2017, desc: 'Discounts Manager includes shipping discount promotion types' },
      ];
      break;

    case 'shipping-discounts':
      newRels = [
        { target: 'promotions-manager', type: 'depends_on', year: 2010, desc: 'Shipping Discounts promotional rules are created in Promotions Manager' },
        { target: 'discounts-manager', type: 'integrates_with', year: 2017, desc: 'Shipping Discounts are a promotion type in Discounts Manager' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Shipping Discounts are configured from Seller Hub marketing tools' },
        { target: 'shipping-discount', type: 'related_to', year: 2010, desc: 'Shipping Discounts is the plural/program form of Shipping Discount' },
        { target: 'discounts-manager', type: 'depends_on', year: 2015, desc: 'Shipping Discounts is a tool within Discounts Manager' },
        { target: 'ebay-stores', type: 'depends_on', year: 2015, desc: 'Requires eBay Store subscription' },
        { target: 'free-shipping', type: 'related_to', year: 2015, desc: 'Shipping Discounts can be configured to offer conditional free shipping' },
        { target: 'order-discounts', type: 'related_to', year: 2015, desc: 'Both are order-level incentives within Discounts Manager' },
      ];
      break;

    case 'shipping-discounts-multi-market':
      newRels = [
        { target: 'discounts-manager-multi-market', type: 'depends_on', year: 2014, desc: 'Multi-market Shipping Discounts are managed through the multi-market Discounts Manager' },
        { target: 'shipping-discounts', type: 'related_to', year: 2014, desc: 'Localized multi-market variant of Shipping Discounts' },
        { target: 'seller-hub-multi-market', type: 'integrates_with', year: 2016, desc: 'Configured within localized Seller Hub marketing tools' },
      ];
      break;

    case 'shipping-labels':
      newRels = [
        { target: 'shipping-logistics', type: 'depends_on', year: 2005, desc: 'Shipping Labels are part of eBay\'s shipping logistics infrastructure' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Shipping Labels are printed from within Seller Hub' },
        { target: 'shipcover-insurance', type: 'integrates_with', year: 2013, desc: 'ShipCover insurance can be added when purchasing shipping labels' },
        { target: 'print-shipping-label', type: 'integrates_with', year: 2005, desc: 'Print Shipping Label is the action that generates a Shipping Label' },
        { target: 'bulk-label-printing', type: 'integrates_with', year: 2016, desc: 'Bulk Label Printing Tool enables mass label generation from Shipping Labels' },
        { target: 'simple-delivery-uk', type: 'integrates_with', year: 2019, desc: 'Simple Delivery UK uses eBay Shipping Labels for Royal Mail postage' },
        { target: 'qr-code-labels', type: 'integrates_with', year: 2021, desc: 'QR Code Shipping Labels are generated alongside standard labels' },
      ];
      break;

    case 'shipping-restrictions':
      newRels = [
        { target: 'buyer', type: 'depends_on', year: 2010, desc: 'Shipping Restrictions is a buyer-facing notification' },
        { target: 'ships-to', type: 'integrates_with', year: 2010, desc: 'Shipping Restrictions is triggered when buyer\'s location is outside Ships To settings' },
        { target: 'international', type: 'related_to', year: 2010, desc: 'Shipping Restrictions often involve international shipping limitations' },
        { target: 'ebay-international-shipping', type: 'related_to', year: 2021, desc: 'eBay International Shipping expands seller reach and reduces restrictions' },
      ];
      break;

    case 'ships-to':
      newRels = [
        { target: 'shipping', type: 'depends_on', year: 2000, desc: 'Ships To is a core shipping listing field' },
        { target: 'listing', type: 'integrates_with', year: 2000, desc: 'Ships To defines the geographic reach of a listing' },
        { target: 'shipping-restrictions', type: 'integrates_with', year: 2010, desc: 'Ships To configuration determines when Shipping Restrictions are shown' },
        { target: 'ebay-international-shipping', type: 'integrates_with', year: 2021, desc: 'eBay International Shipping automatically expands Ships To coverage' },
        { target: 'global-shipping-program', type: 'integrates_with', year: 2012, desc: 'Global Shipping Program expanded Ships To to international buyers' },
      ];
      break;

    case 'shop-by-category':
      newRels = [
        { target: 'browse', type: 'depends_on', year: 1995, desc: 'Shop by Category is the primary browse navigation' },
        { target: 'discovery-buyer-experience', type: 'integrates_with', year: 1995, desc: 'Shop by Category is a foundational buyer discovery mechanism' },
        { target: 'cassini', type: 'integrates_with', year: 2009, desc: 'Category browsing results are ranked by the Cassini search algorithm' },
        { target: 'category', type: 'depends_on', year: 1995, desc: 'Shop by Category traverses the eBay category taxonomy' },
      ];
      break;

    case 'shop-by-category-multi-market':
      newRels = [
        { target: 'browse', type: 'depends_on', year: 1999, desc: 'Multi-market Shop by Category is the localized browse navigation' },
        { target: 'shop-by-category', type: 'related_to', year: 1999, desc: 'Localized multi-market variant with adapted category structures' },
        { target: 'discovery-buyer-experience', type: 'integrates_with', year: 1999, desc: 'Core discovery feature across all eBay markets' },
      ];
      break;

    case 'shop-by-diagram':
      newRels = [
        { target: 'ebay-motors', type: 'depends_on', year: 2019, desc: 'Shop by Diagram is an eBay Motors-specific parts finding feature' },
        { target: 'parts-compatibility', type: 'integrates_with', year: 2019, desc: 'Shop by Diagram leverages parts compatibility data' },
        { target: 'fitment-compatibility', type: 'integrates_with', year: 2019, desc: 'Fitment Compatibility data powers the diagram-based parts lookup' },
        { target: 'ebay-motors-parts', type: 'depends_on', year: 2019, desc: 'Shop by Diagram is a tool within eBay Motors Parts & Accessories' },
        { target: 'my-garage', type: 'integrates_with', year: 2019, desc: 'My Garage vehicle data informs the diagram displayed' },
      ];
      break;

    case 'shopping-cart':
      newRels = [
        { target: 'checkout', type: 'depends_on', year: 2013, desc: 'Shopping Cart feeds directly into the checkout flow' },
        { target: 'payments-checkout', type: 'integrates_with', year: 2013, desc: 'Shopping Cart is part of the payments and checkout infrastructure' },
        { target: 'combined-checkout', type: 'integrates_with', year: 2013, desc: 'Shopping Cart enables Combined Checkout for multiple sellers' },
        { target: 'save-for-later', type: 'integrates_with', year: 2018, desc: 'Items can be moved from Shopping Cart to Save for Later' },
        { target: 'add-to-cart', type: 'integrates_with', year: 2013, desc: 'Add to Cart is the action that populates the Shopping Cart' },
        { target: 'cart-total', type: 'integrates_with', year: 2013, desc: 'Cart Total displays the aggregate value of Shopping Cart items' },
      ];
      break;

    case 'shopping-updates':
      newRels = [
        { target: 'buyer', type: 'depends_on', year: 2015, desc: 'Shopping Updates is a buyer notification category' },
        { target: 'notifications', type: 'depends_on', year: 2015, desc: 'Shopping Updates are part of the eBay notifications system' },
        { target: 'price-drop-alerts', type: 'integrates_with', year: 2015, desc: 'Price Drop Alerts are a type of Shopping Update' },
        { target: 'saved-searches', type: 'integrates_with', year: 2015, desc: 'Saved Search matches trigger Shopping Updates' },
        { target: 'back-in-stock', type: 'integrates_with', year: 2018, desc: 'Back in Stock notifications are a type of Shopping Update' },
        { target: 'push-notifications', type: 'integrates_with', year: 2016, desc: 'Shopping Updates are delivered via push notifications in the mobile app' },
      ];
      break;

    case 'show-only':
      newRels = [
        { target: 'search', type: 'depends_on', year: 2012, desc: 'Show Only filters are specialized search refinement options' },
        { target: 'search-filters', type: 'integrates_with', year: 2012, desc: 'Show Only is a section within the Search Filters panel' },
        { target: 'free-returns', type: 'integrates_with', year: 2015, desc: 'Free Returns is a Show Only filter option' },
        { target: 'authenticity-guarantee-filter', type: 'integrates_with', year: 2020, desc: 'Authenticity Guarantee is a Show Only filter' },
        { target: 'ebay-plus', type: 'integrates_with', year: 2017, desc: 'eBay Plus eligibility is a Show Only filter in relevant markets' },
      ];
      break;

    case 'significantly-not-as-described':
      newRels = [
        { target: 'ebay-money-back-guarantee', type: 'depends_on', year: 2011, desc: 'SNAD is a claim category under eBay Money Back Guarantee' },
        { target: 'resolution-center-multi-market', type: 'integrates_with', year: 2011, desc: 'SNAD claims are filed and resolved through Resolution Center' },
        { target: 'returns', type: 'integrates_with', year: 2011, desc: 'SNAD claims often result in a return being initiated' },
        { target: 'seller-protections', type: 'integrates_with', year: 2011, desc: 'Seller Protections define limits on seller liability for SNAD claims' },
      ];
      break;

    case 'similar-items':
      newRels = [
        { target: 'discovery-buyer-experience', type: 'integrates_with', year: 2014, desc: 'Similar Items is an AI-powered buyer discovery feature' },
        { target: 'cassini', type: 'depends_on', year: 2014, desc: 'Cassini algorithm powers Similar Items recommendations' },
        { target: 'promoted-listings', type: 'related_to', year: 2017, desc: 'Similar Sponsored Items are the paid counterpart to organic Similar Items' },
        { target: 'similar-sponsored-items', type: 'related_to', year: 2017, desc: 'Similar Sponsored Items are paid ads shown alongside organic Similar Items' },
      ];
      break;

    case 'similar-sponsored-items':
      newRels = [
        { target: 'promoted-listings', type: 'depends_on', year: 2017, desc: 'Similar Sponsored Items are Promoted Listings placements on product pages' },
        { target: 'ebay-advertising', type: 'depends_on', year: 2017, desc: 'Part of eBay\'s advertising product portfolio' },
        { target: 'similar-items', type: 'related_to', year: 2017, desc: 'Similar Sponsored Items are the paid counterpart to organic Similar Items' },
        { target: 'discovery-buyer-experience', type: 'integrates_with', year: 2017, desc: 'Similar Sponsored Items appear in the buyer discovery flow on product pages' },
      ];
      break;

    case 'simple-delivery':
      newRels = [
        { target: 'shipping', type: 'depends_on', year: 2023, desc: 'Simple Delivery is a UK-specific simplified shipping product' },
        { target: 'simple-delivery-uk', type: 'related_to', year: 2019, desc: 'Simple Delivery and Simple Delivery UK are the same product with different naming' },
        { target: 'ebay-uk', type: 'depends_on', year: 2023, desc: 'Simple Delivery is mandatory for UK consumer-to-consumer sales' },
        { target: 'shipping-labels', type: 'depends_on', year: 2023, desc: 'Simple Delivery uses eBay shipping labels for postage generation' },
      ];
      break;

    case 'simple-delivery-uk':
      newRels = [
        { target: 'shipping', type: 'depends_on', year: 2019, desc: 'Simple Delivery UK is a simplified shipping label program' },
        { target: 'royal-mail-tracked-24', type: 'depends_on', year: 2019, desc: 'Royal Mail Tracked 24 is the primary carrier within Simple Delivery UK' },
        { target: 'shipping-labels', type: 'integrates_with', year: 2019, desc: 'Simple Delivery UK generates discounted Royal Mail shipping labels' },
        { target: 'ebay-uk', type: 'depends_on', year: 2019, desc: 'Simple Delivery UK is exclusive to the eBay UK market' },
        { target: 'simple-delivery', type: 'related_to', year: 2019, desc: 'Simple Delivery UK is the original naming for Simple Delivery' },
      ];
      break;

    case 'site-preferences':
      newRels = [
        { target: 'account-settings', type: 'depends_on', year: 2002, desc: 'Site Preferences is a subset of Account Settings' },
        { target: 'selling-preferences', type: 'related_to', year: 2002, desc: 'Site Preferences covers buyer-side settings; Selling Preferences covers seller-side' },
        { target: 'my-ebay', type: 'integrates_with', year: 2002, desc: 'Site Preferences affects My eBay display customization' },
      ];
      break;

    case 'sms-alerts':
      newRels = [
        { target: 'notifications', type: 'depends_on', year: 2017, desc: 'SMS Alerts are part of the eBay notifications system' },
        { target: 'sms-notifications', type: 'related_to', year: 2008, desc: 'SMS Notifications is an alternate name for SMS Alerts' },
        { target: 'two-factor-authentication', type: 'integrates_with', year: 2017, desc: 'SMS Alerts are used to deliver 2FA verification codes' },
        { target: 'outbid-notification', type: 'integrates_with', year: 2017, desc: 'Outbid notifications can be delivered via SMS Alerts' },
      ];
      break;

    case 'sms-notifications':
      newRels = [
        { target: 'sms-alerts', type: 'related_to', year: 2008, desc: 'SMS Notifications is an alternate name for the same SMS notification feature' },
        { target: 'notifications', type: 'depends_on', year: 2008, desc: 'Part of the eBay notifications umbrella' },
        { target: 'two-factor-authentication', type: 'integrates_with', year: 2010, desc: '2FA codes are delivered via SMS Notifications' },
        { target: 'account-security', type: 'integrates_with', year: 2010, desc: 'SMS security alerts are an account security feature' },
      ];
      break;

    case 'sneaker-authentication':
      newRels = [
        { target: 'authenticity-guarantee', type: 'depends_on', year: 2020, desc: 'Sneaker Authentication is a vertical of the Authenticity Guarantee program' },
        { target: 'authenticity-guarantee-sneakers', type: 'related_to', year: 2020, desc: 'Authenticity Guarantee - Sneakers and Sneaker Authentication are the same program' },
        { target: 'trust-safety', type: 'integrates_with', year: 2020, desc: 'Sneaker Authentication is a trust building program' },
        { target: 'fashion-luxury', type: 'integrates_with', year: 2020, desc: 'Sneaker Authentication supports the fashion and luxury vertical' },
        { target: 'authentication', type: 'depends_on', year: 2020, desc: 'Part of the authentication umbrella' },
        { target: 'handbag-authentication', type: 'related_to', year: 2020, desc: 'Handbag Authentication is a parallel program in the same trust framework' },
      ];
      break;

    case 'sold-items-filter':
      newRels = [
        { target: 'search', type: 'depends_on', year: 2006, desc: 'Sold Items Filter is an advanced search option' },
        { target: 'search-filters', type: 'integrates_with', year: 2006, desc: 'Part of the Search Filters panel' },
        { target: 'terapeak', type: 'related_to', year: 2012, desc: 'Sold Items Filter provides the same market research data as Terapeak' },
        { target: 'product-research', type: 'related_to', year: 2019, desc: 'Product Research tool provides enriched sold data beyond the basic filter' },
      ];
      break;

    case 'sold-listings':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2016, desc: 'Sold Listings is a view within Seller Hub' },
        { target: 'order-management', type: 'integrates_with', year: 2016, desc: 'Sold Listings feeds into order management workflow' },
        { target: 'awaiting-shipment', type: 'integrates_with', year: 2016, desc: 'Sold Listings that need fulfillment are flagged as Awaiting Shipment' },
      ];
      break;

    case 'sold-quantity-display':
      newRels = [
        { target: 'listing', type: 'depends_on', year: 2016, desc: 'Sold Quantity Display is shown on multi-quantity listing pages' },
        { target: 'trust-safety', type: 'related_to', year: 2016, desc: 'Sold Quantity Display acts as social proof and builds buyer trust' },
        { target: 'buy-it-now', type: 'integrates_with', year: 2016, desc: 'Sold Quantity Display appears on fixed price Buy It Now listings' },
      ];
      break;

    case 'sort-by':
      newRels = [
        { target: 'search', type: 'depends_on', year: 2003, desc: 'Sort By is a search results reordering option' },
        { target: 'best-match-sort', type: 'integrates_with', year: 2003, desc: 'Best Match Sort is the default Sort By option' },
        { target: 'cassini', type: 'depends_on', year: 2009, desc: 'Sort By Best Match is powered by the Cassini algorithm' },
        { target: 'discovery-buyer-experience', type: 'integrates_with', year: 2003, desc: 'Sort By is a key buyer control in the discovery experience' },
      ];
      break;

    case 'sports-memorabilia':
      newRels = [
        { target: 'collectibles', type: 'depends_on', year: 2000, desc: 'Sports Memorabilia is a vertical within the Collectibles category' },
        { target: 'certificate-of-authenticity', type: 'integrates_with', year: 2005, desc: 'COA is required for high-value Sports Memorabilia items' },
        { target: 'authenticity-guarantee', type: 'integrates_with', year: 2022, desc: 'Authenticity Guarantee expanded to Sports Memorabilia' },
        { target: 'collectibles-trading', type: 'related_to', year: 2000, desc: 'Sports Memorabilia is part of the Collectibles & Trading umbrella' },
        { target: 'trading-card-hub', type: 'related_to', year: 2021, desc: 'Trading cards within Sports Memorabilia connect to the Trading Card Hub' },
      ];
      break;

    case 'spotlight-deals':
      newRels = [
        { target: 'ebay-deals', type: 'depends_on', year: 2019, desc: 'Spotlight Deals are a premium placement within eBay Deals' },
        { target: 'promoted-listings', type: 'related_to', year: 2019, desc: 'Spotlight Deals provide similar premium visibility as Promoted Listings' },
        { target: 'featured-deals', type: 'related_to', year: 2019, desc: 'Spotlight Deals and Featured Deals are complementary deal placement products' },
        { target: 'ebay-advertising', type: 'integrates_with', year: 2019, desc: 'Spotlight Deals are an advertising placement product' },
      ];
      break;

    case 'spring-clearance':
      newRels = [
        { target: 'ebay-deals', type: 'depends_on', year: 2015, desc: 'Spring Clearance is a seasonal event within eBay Deals' },
        { target: 'events-campaigns', type: 'depends_on', year: 2015, desc: 'Spring Clearance is a recurring campaign event' },
        { target: 'promotions-manager', type: 'integrates_with', year: 2015, desc: 'Spring Clearance listings are boosted via Promotions Manager' },
        { target: 'promoted-listings', type: 'integrates_with', year: 2015, desc: 'Promoted Listings discounts are often offered during Spring Clearance' },
      ];
      break;

    case 'stamps':
      newRels = [
        { target: 'collectibles', type: 'depends_on', year: 1999, desc: 'Stamps is a collecting vertical within the Collectibles umbrella' },
        { target: 'collectibles-trading', type: 'integrates_with', year: 1999, desc: 'Stamps is part of the Collectibles & Trading category umbrella' },
        { target: 'antiques', type: 'related_to', year: 1999, desc: 'Stamps and Antiques are adjacent collecting categories' },
      ];
      break;

    case 'starting-bid':
      newRels = [
        { target: 'auction-format', type: 'depends_on', year: 1995, desc: 'Starting Bid is a required field for auction-format listings' },
        { target: 'reserve-price', type: 'integrates_with', year: 1999, desc: 'Starting Bid sets the opening price; Reserve Price sets the minimum acceptable' },
        { target: 'bidding', type: 'integrates_with', year: 1995, desc: 'Starting Bid is the floor for all bidding activity' },
        { target: 'bid-increment', type: 'integrates_with', year: 1995, desc: 'Bid Increment rules apply from the Starting Bid level upward' },
      ];
      break;

    case 'stock-quantity':
      newRels = [
        { target: 'inventory', type: 'depends_on', year: 2016, desc: 'Stock Quantity is an inventory management field' },
        { target: 'inventory-management', type: 'integrates_with', year: 2016, desc: 'Stock Quantity is tracked in inventory management tools' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Stock Quantity is visible and editable within Seller Hub' },
        { target: 'out-of-stock-control', type: 'integrates_with', year: 2016, desc: 'Out of Stock Control uses Stock Quantity to manage listing visibility' },
        { target: 'bulk-listing-tool', type: 'integrates_with', year: 2016, desc: 'Bulk Listing Tool can update Stock Quantity across multiple listings' },
      ];
      break;

    case 'store-categories':
      newRels = [
        { target: 'ebay-stores', type: 'depends_on', year: 2001, desc: 'Store Categories is an organizational feature within eBay Stores' },
        { target: 'store-header', type: 'integrates_with', year: 2001, desc: 'Store Categories appear in the Store Header navigation' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Store Categories are managed within Seller Hub store management tools' },
      ];
      break;

    case 'store-email-campaigns':
      newRels = [
        { target: 'ebay-stores', type: 'depends_on', year: 2010, desc: 'Store Email Campaigns is an eBay Stores marketing feature' },
        { target: 'store-newsletters', type: 'related_to', year: 2010, desc: 'Store Email Campaigns and Store Newsletters serve the same email marketing purpose' },
        { target: 'email-notifications', type: 'depends_on', year: 2010, desc: 'Campaigns are delivered via eBay\'s email infrastructure' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Store Email Campaigns are managed from Seller Hub marketing tools' },
        { target: 'promotions-manager', type: 'integrates_with', year: 2018, desc: 'Campaign content links to promotions created in Promotions Manager' },
      ];
      break;

    case 'store-header':
      newRels = [
        { target: 'ebay-stores', type: 'depends_on', year: 2001, desc: 'Store Header is a branding element within eBay Stores' },
        { target: 'brand-identity', type: 'integrates_with', year: 2001, desc: 'Store Header is the primary brand identity surface for eBay sellers' },
        { target: 'store-categories', type: 'integrates_with', year: 2001, desc: 'Store Categories navigation appears within or below the Store Header' },
        { target: 'follow-seller', type: 'integrates_with', year: 2016, desc: 'Follow/Save Seller button is prominently placed in the Store Header' },
      ];
      break;

    case 'store-newsletters':
      newRels = [
        { target: 'ebay-stores', type: 'depends_on', year: 2005, desc: 'Store Newsletters is an eBay Stores marketing feature' },
        { target: 'store-email-campaigns', type: 'related_to', year: 2005, desc: 'Store Newsletters and Store Email Campaigns are the same feature' },
        { target: 'email-notifications', type: 'depends_on', year: 2005, desc: 'Newsletters are sent via eBay\'s email infrastructure' },
        { target: 'saved-sellers', type: 'integrates_with', year: 2016, desc: 'Store Newsletters are sent to buyers who have saved the seller' },
      ];
      break;

    case 'store-newsletters-multi-market':
      newRels = [
        { target: 'stores', type: 'depends_on', year: 2010, desc: 'Multi-market Store Newsletters is part of the Stores umbrella across markets' },
        { target: 'store-newsletters', type: 'related_to', year: 2010, desc: 'Localized multi-market variant of Store Newsletters with GDPR/CAN-SPAM compliance' },
        { target: 'ebay-stores-multi-market', type: 'integrates_with', year: 2017, desc: 'Newsletter feature is available across multi-market eBay Stores' },
        { target: 'gdpr-compliance', type: 'integrates_with', year: 2018, desc: 'EU market newsletters require GDPR-compliant opt-in handling' },
      ];
      break;

    case 'store-promotions-box':
      newRels = [
        { target: 'ebay-stores', type: 'depends_on', year: 2008, desc: 'Store Promotions Box is a display area within eBay Stores' },
        { target: 'promotions-manager', type: 'integrates_with', year: 2015, desc: 'Active promotions from Promotions Manager display in the Store Promotions Box' },
        { target: 'sale-events', type: 'integrates_with', year: 2015, desc: 'Current Sale Events are featured in the Store Promotions Box' },
        { target: 'store-header', type: 'integrates_with', year: 2008, desc: 'Store Promotions Box complements the Store Header as a key storefront element' },
      ];
      break;

    case 'store-tier-anchor':
      newRels = [
        { target: 'ebay-stores', type: 'depends_on', year: 2001, desc: 'Anchor is a subscription tier within eBay Stores' },
        { target: 'ebay-stores-enterprise', type: 'related_to', year: 2015, desc: 'Anchor is the step below Enterprise in the store tier hierarchy' },
        { target: 'store-tier-premium', type: 'related_to', year: 2001, desc: 'Premium is the tier below Anchor in the eBay Stores hierarchy' },
        { target: 'discounts-manager', type: 'integrates_with', year: 2017, desc: 'Anchor Store subscribers get enhanced Discounts Manager capabilities' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Anchor Store management is done through Seller Hub' },
        { target: 'promoted-stores', type: 'integrates_with', year: 2019, desc: 'Anchor Store subscribers have access to Promoted Stores advertising' },
        { target: 'advertising', type: 'integrates_with', year: 2017, desc: 'Anchor Stores include advertising credits and access' },
      ];
      break;

    case 'store-tier-basic':
      newRels = [
        { target: 'ebay-stores', type: 'depends_on', year: 2001, desc: 'Basic is a mid-tier eBay Stores subscription' },
        { target: 'store-tier-starter', type: 'related_to', year: 2018, desc: 'Starter is the entry-level tier below Basic' },
        { target: 'store-tier-premium', type: 'related_to', year: 2001, desc: 'Premium is the tier above Basic' },
        { target: 'ebay-stores-basic', type: 'renamed_to', year: 2018, desc: 'eBay Stores Basic was renamed to Starter; Basic became a mid-tier' },
        { target: 'discounts-manager', type: 'integrates_with', year: 2017, desc: 'Basic Store subscribers have access to Discounts Manager tools' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Basic Store management is accessible from Seller Hub' },
      ];
      break;

    case 'store-tier-enterprise':
      newRels = [
        { target: 'ebay-stores', type: 'depends_on', year: 2015, desc: 'Enterprise is the highest-tier eBay Stores subscription' },
        { target: 'ebay-stores-enterprise', type: 'related_to', year: 2015, desc: 'Store Tier Enterprise and eBay Stores Enterprise refer to the same tier' },
        { target: 'store-tier-anchor', type: 'related_to', year: 2015, desc: 'Anchor is the tier below Enterprise' },
        { target: 'account-management-plus', type: 'integrates_with', year: 2015, desc: 'Enterprise Store subscribers have access to Account Management Plus' },
        { target: 'account-management-premium', type: 'integrates_with', year: 2015, desc: 'Enterprise Store subscribers qualify for Account Management Premium' },
        { target: 'discounts-manager', type: 'integrates_with', year: 2017, desc: 'Enterprise Store includes maximum Discounts Manager capabilities' },
        { target: 'promoted-stores', type: 'integrates_with', year: 2019, desc: 'Enterprise Stores include Promoted Stores advertising credits' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Enterprise Store management is done through Seller Hub' },
        { target: 'advertising', type: 'integrates_with', year: 2017, desc: 'Enterprise Stores include maximum advertising credits and access' },
      ];
      break;

    case 'store-tier-enterprise-us':
      newRels = [
        { target: 'ebay-stores', type: 'depends_on', year: 2015, desc: 'Enterprise US tier is a subscription level within the eBay Stores program' },
        { target: 'ebay-stores-multi-market', type: 'depends_on', year: 2015, desc: 'Structured under the multi-market eBay Stores product framework' },
        { target: 'store-tier-anchor', type: 'related_to', year: 2015, desc: 'Anchor is the next tier down from Enterprise in the US store tier hierarchy' },
        { target: 'store-tier-premium', type: 'related_to', year: 2015, desc: 'Premium is two tiers below Enterprise in the US store hierarchy' },
        { target: 'store-tier-platin-de', type: 'related_to', year: 2019, desc: 'Both are market-specific ultra-premium store tiers (Enterprise US, Platin DE)' },
        { target: 'store-tier-premium-plus-it', type: 'related_to', year: 2016, desc: 'Both are the highest available store tier in their respective markets' },
        { target: 'seller-hub', type: 'integrates_with', year: 2015, desc: 'Enterprise sellers use Seller Hub for advanced inventory and order management' },
        { target: 'promoted-listings', type: 'integrates_with', year: 2015, desc: 'Enterprise stores receive dedicated advertising support and Promoted Listings discounts' },
        { target: 'top-rated-seller', type: 'related_to', year: 2015, desc: 'Enterprise-tier sellers are typically also Top Rated Sellers' },
      ];
      break;

    case 'store-tier-featured':
      newRels = [
        { target: 'ebay-stores', type: 'depends_on', year: 2026, desc: 'Featured tier is a subscription level within eBay Stores for the AU market' },
        { target: 'store-tier-premium', type: 'related_to', year: 2026, desc: 'Featured replaces Premium branding in the AU market rebranding' },
        { target: 'store-tier-anchor', type: 'related_to', year: 2026, desc: 'Peer store tier in the AU tier lineup' },
        { target: 'store-tier-basic', type: 'related_to', year: 2026, desc: 'Basic is the entry-level tier in the same AU store tier hierarchy' },
        { target: 'ebay-australia', type: 'related_to', year: 2026, desc: 'Featured tier is exclusive to the eBay Australia market' },
        { target: 'seller-hub', type: 'integrates_with', year: 2026, desc: 'Featured tier sellers manage operations through Seller Hub' },
      ];
      break;

    case 'store-tier-platin':
      newRels = [
        { target: 'ebay-stores', type: 'depends_on', year: 2010, desc: 'Platin tier is a subscription level within the eBay Stores program for DE' },
        { target: 'store-tier-platin-de', type: 'related_to', year: 2019, desc: 'Platin-de is the multi-market framework variant of this same tier' },
        { target: 'ebay-germany', type: 'related_to', year: 2010, desc: 'Platin tier is exclusive to eBay Germany' },
        { target: 'store-tier-premium', type: 'related_to', year: 2010, desc: 'Peer premium tier in alternative market; comparable positioning' },
        { target: 'seller-hub', type: 'integrates_with', year: 2016, desc: 'DE Platin sellers use Verkäufer-Cockpit Pro variant of Seller Hub' },
        { target: 'verkaufer-cockpit-pro', type: 'integrates_with', year: 2016, desc: 'Platin-tier sellers in DE are primary users of the Verkäufer-Cockpit Pro' },
      ];
      break;

    case 'store-tier-platin-de':
      newRels = [
        { target: 'ebay-stores', type: 'depends_on', year: 2019, desc: 'Platin DE is a subscription level within eBay Stores for the German market' },
        { target: 'ebay-stores-multi-market', type: 'depends_on', year: 2019, desc: 'Structured under the multi-market eBay Stores product framework' },
        { target: 'store-tier-platin', type: 'related_to', year: 2019, desc: 'Platin-de is the multi-market framework equivalent of the legacy Platin node' },
        { target: 'store-tier-enterprise-us', type: 'related_to', year: 2019, desc: 'Both are the highest available store tier in their respective markets' },
        { target: 'store-tier-premium-plus-it', type: 'related_to', year: 2019, desc: 'Parallel ultra-premium market-exclusive tiers' },
        { target: 'verkaufer-cockpit-pro', type: 'integrates_with', year: 2019, desc: 'Platin DE sellers are the primary users of Verkäufer-Cockpit Pro' },
        { target: 'ebay-germany', type: 'related_to', year: 2019, desc: 'Platin DE is exclusive to eBay Germany' },
        { target: 'vat-services-uk-eu', type: 'integrates_with', year: 2021, desc: 'Platin DE includes VAT consulting tools for German compliance needs' },
      ];
      break;

    case 'store-tier-premium':
      newRels = [
        { target: 'ebay-stores', type: 'depends_on', year: 2001, desc: 'Premium is a core subscription tier in the eBay Stores program' },
        { target: 'store-tier-anchor', type: 'related_to', year: 2001, desc: 'Anchor is the tier above Premium in the US store hierarchy' },
        { target: 'store-tier-basic', type: 'related_to', year: 2001, desc: 'Basic is the tier below Premium in the store subscription hierarchy' },
        { target: 'store-tier-starter', type: 'related_to', year: 2001, desc: 'Starter is the entry-level tier in the same store hierarchy' },
        { target: 'promoted-listings', type: 'integrates_with', year: 2010, desc: 'Premium store sellers receive Promoted Listings credits and capabilities' },
        { target: 'seller-hub', type: 'integrates_with', year: 2016, desc: 'Premium store sellers manage operations through Seller Hub' },
      ];
      break;

    case 'store-tier-premium-plus':
      newRels = [
        { target: 'ebay-stores', type: 'depends_on', year: 2012, desc: 'Premium Plus is Italy\'s top store subscription tier within eBay Stores' },
        { target: 'store-tier-premium-plus-it', type: 'related_to', year: 2016, desc: 'Premium-plus-it is the multi-market framework node for this same tier' },
        { target: 'ebay-italy', type: 'related_to', year: 2012, desc: 'Premium Plus store tier is exclusive to eBay Italy' },
        { target: 'store-tier-premium', type: 'related_to', year: 2012, desc: 'Equivalent positioning to US Premium but branded separately for Italy' },
        { target: 'seller-hub', type: 'integrates_with', year: 2016, desc: 'IT Premium Plus sellers manage operations through Seller Hub' },
      ];
      break;

    case 'store-tier-premium-plus-it':
      newRels = [
        { target: 'ebay-stores', type: 'depends_on', year: 2016, desc: 'Premium Plus IT is Italy\'s highest store subscription within eBay Stores' },
        { target: 'ebay-stores-multi-market', type: 'depends_on', year: 2016, desc: 'Structured under the multi-market eBay Stores product framework' },
        { target: 'store-tier-premium-plus', type: 'related_to', year: 2016, desc: 'Multi-market framework node for the same Italian premium plus tier' },
        { target: 'store-tier-enterprise-us', type: 'related_to', year: 2016, desc: 'Both are the highest available store tier in their respective markets' },
        { target: 'store-tier-platin-de', type: 'related_to', year: 2019, desc: 'Parallel ultra-premium market-exclusive tiers' },
        { target: 'ebay-italy', type: 'related_to', year: 2016, desc: 'Premium Plus IT tier is exclusive to eBay Italy' },
        { target: 'vat-services-uk-eu', type: 'integrates_with', year: 2021, desc: 'IT Premium Plus sellers rely on VAT tools for Italian EU compliance' },
      ];
      break;

    case 'store-tier-starter':
      newRels = [
        { target: 'ebay-stores', type: 'depends_on', year: 2001, desc: 'Starter is the entry-level subscription tier within eBay Stores' },
        { target: 'store-tier-basic', type: 'related_to', year: 2001, desc: 'Basic is the next tier up from Starter in the store subscription hierarchy' },
        { target: 'store-tier-premium', type: 'related_to', year: 2001, desc: 'Premium is further up the store tier ladder from Starter' },
        { target: 'ebay-stores-basic', type: 'renamed_to', year: 2001, desc: 'ebay-stores-basic was formerly named Starter before tier renaming' },
        { target: 'seller-hub', type: 'integrates_with', year: 2016, desc: 'Starter store sellers access basic Seller Hub features' },
      ];
      break;

    case 'subtitle':
      newRels = [
        { target: 'listing', type: 'depends_on', year: 2003, desc: 'Subtitle is a paid listing upgrade that belongs to the Listing feature set' },
        { target: 'listing-upgrades', type: 'related_to', year: 2003, desc: 'Subtitle is one of the listing upgrade options alongside Bold and Gallery Plus' },
        { target: 'best-match', type: 'integrates_with', year: 2003, desc: 'Subtitle text is indexed by Cassini/Best Match for improved search visibility' },
        { target: 'advanced-listing-tool', type: 'integrates_with', year: 2014, desc: 'Advanced Listing Tool provides the UI to add and edit listing subtitles' },
      ];
      break;

    case 'supersize-pictures':
      newRels = [
        { target: 'listing', type: 'related_to', year: 2005, desc: 'Supersize Pictures was a paid listing upgrade enhancing photo display' },
        { target: 'listing-upgrades', type: 'related_to', year: 2005, desc: 'Was offered alongside other listing upgrade options' },
        { target: 'picture-zoom', type: 'replaced_by', year: 2019, desc: 'Supersize functionality became standard via Picture Zoom; paid upgrade retired' },
        { target: 'photo-enhancement', type: 'replaced_by', year: 2019, desc: 'Modern photo enhancement tools replaced the paid Supersize feature' },
      ];
      break;

    case 'tax-documents':
      newRels = [
        { target: 'seller-hub', type: 'integrates_with', year: 2013, desc: 'Tax Documents section is accessible within the Seller Hub payments area' },
        { target: '1099-k-tax-form', type: 'integrates_with', year: 2013, desc: '1099-K forms are a primary document type available in the Tax Documents section' },
        { target: 'managed-payments', type: 'depends_on', year: 2018, desc: 'Tax documents are generated from Managed Payments transaction data' },
        { target: 'vat-services-uk-eu', type: 'related_to', year: 2021, desc: 'VAT documents and invoices appear alongside tax documents for international sellers' },
        { target: 'sales-tax-collection', type: 'related_to', year: 2018, desc: 'Sales tax collection data drives the tax documents eBay generates for sellers' },
      ];
      break;

    case 'tcgplayer':
      newRels = [
        { target: 'collectibles', type: 'related_to', year: 2022, desc: 'TCGplayer is an acquired marketplace specializing in collectible trading cards' },
        { target: 'trading-card-hub', type: 'integrates_with', year: 2022, desc: 'TCGplayer data and authentication integrates with eBay\'s Trading Card Hub' },
        { target: 'trading-card-authentication', type: 'integrates_with', year: 2022, desc: 'TCGplayer Authentication Center supports eBay\'s trading card grading pipeline' },
        { target: 'authenticity-guarantee', type: 'integrates_with', year: 2022, desc: 'TCGplayer authentication feeds into eBay\'s broader Authenticity Guarantee program' },
        { target: 'product-research', type: 'integrates_with', year: 2022, desc: 'TCGplayer pricing data enriches Product Research for trading card sellers' },
        { target: 'collectibles', type: 'integrates_with', desc: 'Collectible card marketplace integrated into eBay collectibles ecosystem' },
        { target: 'tcgplayer-authentication-center', type: 'integrates_with', desc: 'Authentication center is a sub-program of TCGplayer' },
        { target: 'tcgplayer-marketplace', type: 'integrates_with', desc: 'TCGplayer Marketplace is the primary platform within TCGplayer' },
        { target: 'authenticity-guarantee-trading-cards', type: 'integrates_with', desc: 'TCGplayer auth aligns with eBay Authenticity Guarantee for trading cards' },
        { target: 'comc', type: 'related_to', desc: 'Both are trading card partnerships within eBay\'s collectibles strategy' },
      ];
      break;

    case 'template-builder':
      newRels = [
        { target: 'listing', type: 'depends_on', year: 2014, desc: 'Template Builder creates reusable description templates for eBay listings' },
        { target: 'advanced-listing-tool', type: 'integrates_with', year: 2014, desc: 'Templates created in Template Builder are applied via the Advanced Listing Tool' },
        { target: 'description-templates', type: 'related_to', year: 2014, desc: 'Template Builder is the tool that creates and manages Description Templates' },
        { target: 'seller-hub', type: 'integrates_with', year: 2016, desc: 'Template Builder is accessed through Seller Hub listing creation workflow' },
      ];
      break;

    case 'terapeak':
      newRels = [
        { target: 'product-research', type: 'renamed_to', year: 2024, desc: 'Terapeak was rebranded as Product Research in 2024 when fully integrated into Seller Hub' },
        { target: 'seller-hub', type: 'integrates_with', year: 2017, desc: 'Terapeak was acquired by eBay in 2017 and integrated into Seller Hub' },
        { target: 'sourcing-insights', type: 'integrates_with', year: 2020, desc: 'Terapeak data feeds into Sourcing Insights for demand analysis' },
        { target: 'pricing-tools', type: 'related_to', year: 2017, desc: 'Terapeak\'s pricing intelligence informed seller pricing strategies' },
        { target: 'listing-quality-report', type: 'related_to', year: 2018, desc: 'Terapeak market data complements Listing Quality Report competitive insights' },
      ];
      break;

    case 'terms-of-service':
      newRels = [
        { target: 'trust', type: 'depends_on', year: 1995, desc: 'Terms of Service is the foundational trust and legal governance document for eBay' },
        { target: 'user-agreement', type: 'related_to', year: 1995, desc: 'User Agreement and Terms of Service together form eBay\'s core legal framework' },
        { target: 'privacy-policy', type: 'related_to', year: 1995, desc: 'Privacy Policy accompanies Terms of Service as required legal disclosure' },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2001, desc: 'Seller Performance Standards are grounded in and reference Terms of Service' },
        { target: 'prohibited-items-list', type: 'related_to', year: 1995, desc: 'Prohibited items restrictions are part of the Terms of Service framework' },
      ];
      break;

    case 'thermal-printer':
      newRels = [
        { target: 'shipping-labels', type: 'integrates_with', year: 2010, desc: 'Thermal Printer is the primary hardware for printing eBay shipping labels' },
        { target: 'shipping', type: 'depends_on', year: 2010, desc: 'Thermal Printer support is part of eBay\'s shipping label infrastructure' },
        { target: 'print-shipping-label', type: 'integrates_with', year: 2010, desc: 'Print Shipping Label workflow is optimized for thermal printer output' },
        { target: 'seller-hub', type: 'integrates_with', year: 2016, desc: 'Seller Hub shipping workflows support thermal printer configuration' },
      ];
      break;

    case 'third-party-providers':
      newRels = [
        { target: 'developer', type: 'depends_on', year: 2010, desc: 'Third Party Providers are certified through eBay\'s developer ecosystem' },
        { target: 'ebay-developers-program', type: 'integrates_with', year: 2010, desc: 'Third-party tools are certified via the eBay Developers Program' },
        { target: 'seller-hub', type: 'integrates_with', year: 2016, desc: 'Many third-party providers integrate with Seller Hub via APIs' },
        { target: 'merchant-integration-platform', type: 'integrates_with', year: 2014, desc: 'Third-party providers access eBay through the Merchant Integration Platform' },
        { target: 'api-explorer', type: 'related_to', year: 2015, desc: 'Third-party providers build on eBay APIs discoverable through API Explorer' },
      ];
      break;

    case 'time-away':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2018, desc: 'Time Away is configured through the Seller Hub account settings' },
        { target: 'listing', type: 'integrates_with', year: 2018, desc: 'Time Away pauses or modifies active listing visibility and handling times' },
        { target: 'order-management', type: 'integrates_with', year: 2018, desc: 'Time Away adjusts order notifications and handling expectations during absence' },
        { target: 'selling-preferences', type: 'integrates_with', year: 2018, desc: 'Time Away is managed through seller preferences and account settings' },
        { target: 'seller-tools', type: 'depends_on', year: 2015, desc: 'Time Away is part of the seller tools feature set' },
        { target: 'seller-hub', type: 'integrates_with', year: 2015, desc: 'Time Away settings configured and managed through Seller Hub' },
        { target: 'communication', type: 'integrates_with', year: 2015, desc: 'Automatic messaging set for buyer inquiries received during time away' },
      ];
      break;

    case 'time-left':
      newRels = [
        { target: 'auction', type: 'depends_on', year: 1995, desc: 'Time Left countdown is a core element of auction-format listings' },
        { target: 'ending-soon', type: 'related_to', year: 2000, desc: 'Ending Soon filter surfaces listings where Time Left is under 1 hour' },
        { target: 'bid-now', type: 'integrates_with', year: 1995, desc: 'Bid Now CTA is prominently paired with the Time Left countdown' },
        { target: 'outbid-notification', type: 'integrates_with', year: 2005, desc: 'Outbid notifications reference Time Left to create urgency for re-bidding' },
      ];
      break;

    case 'top-rated-filter':
      newRels = [
        { target: 'seller-performance-standards', type: 'depends_on', year: 2010, desc: 'Top Rated Filter surfaces only sellers who meet Seller Performance Standards for TRS' },
        { target: 'top-rated-seller', type: 'depends_on', year: 2010, desc: 'Top Rated Filter is built on the Top Rated Seller qualification criteria' },
        { target: 'search-filters', type: 'related_to', year: 2010, desc: 'Top Rated Filter is one of the search refinement filters in eBay search' },
        { target: 'best-match', type: 'integrates_with', year: 2010, desc: 'Best Match algorithm boosts Top Rated Seller listings in default sort order' },
      ];
      break;

    case 'top-rated-plus':
      newRels = [
        { target: 'top-rated-seller', type: 'depends_on', year: 2011, desc: 'Top Rated Plus badge requires seller to hold Top Rated Seller status' },
        { target: 'seller-performance-standards', type: 'depends_on', year: 2011, desc: 'Seller must meet enhanced performance criteria (1-day handling, 30-day returns)' },
        { target: 'top-rated-plus-badge', type: 'related_to', year: 2011, desc: 'Top-rated-plus-badge is an alternate catalog node for the same program' },
        { target: 'free-returns', type: 'depends_on', year: 2013, desc: 'US Top Rated Plus listings must offer free returns to display the badge' },
        { target: '1-day-handling', type: 'depends_on', year: 2011, desc: '1-Day Handling is required for US listings to qualify for Top Rated Plus' },
        { target: 'promoted-listings', type: 'integrates_with', year: 2015, desc: 'Top Rated Plus sellers receive Promoted Listings fee discounts' },
      ];
      break;

    case 'top-rated-plus-badge':
      newRels = [
        { target: 'top-rated-seller', type: 'depends_on', year: 2011, desc: 'Badge requires seller to hold Top Rated Seller status across all markets' },
        { target: 'top-rated-plus', type: 'related_to', year: 2011, desc: 'Top-rated-plus is an alternate catalog node for the same program' },
        { target: 'seller-performance-standards-multi-market', type: 'depends_on', year: 2011, desc: 'Multi-market performance standards govern badge eligibility across DE, UK, AU' },
        { target: 'listing', type: 'integrates_with', year: 2011, desc: 'Badge appears on individual qualifying listings, not just seller profile' },
        { target: 'best-match', type: 'integrates_with', year: 2011, desc: 'Top Rated Plus listings receive preferential placement in Best Match ranking' },
      ];
      break;

    case 'top-rated-seller':
      newRels = [
        { target: 'seller-performance-standards', type: 'depends_on', year: 2008, desc: 'Top Rated Seller status is awarded based on meeting Seller Performance Standards' },
        { target: 'powerseller', type: 'related_to', year: 2008, desc: 'PowerSeller was the predecessor program to Top Rated Seller' },
        { target: 'top-rated-plus', type: 'related_to', year: 2011, desc: 'Top Rated Plus is the listing-level badge for Top Rated Sellers' },
        { target: 'top-rated-seller-multi-market', type: 'related_to', year: 2008, desc: 'Multi-market node for the same program with market-specific criteria' },
        { target: 'transaction-defect-rate', type: 'depends_on', year: 2014, desc: 'Transaction Defect Rate must stay below 0.5% to maintain TRS status' },
        { target: 'late-shipment-rate', type: 'depends_on', year: 2011, desc: 'Late Shipment Rate threshold is a key TRS qualification metric' },
        { target: 'feedback-forum', type: 'integrates_with', year: 2008, desc: 'Positive Feedback Percentage and DSRs are factored into TRS qualification' },
      ];
      break;

    case 'top-rated-seller-multi-market':
      newRels = [
        { target: 'seller-performance-standards', type: 'depends_on', year: 2008, desc: 'Multi-market TRS is governed by market-specific Seller Performance Standards' },
        { target: 'seller-performance-standards-multi-market', type: 'depends_on', year: 2008, desc: 'Multi-market performance standards define TRS thresholds per country' },
        { target: 'top-rated-seller', type: 'related_to', year: 2008, desc: 'Multi-market variant of the Top Rated Seller program with localized criteria' },
        { target: 'top-rated-plus-badge', type: 'related_to', year: 2011, desc: 'Top Rated Plus badge is issued to qualifying listings across all TRS markets' },
        { target: 'ebay-premium-service-uk', type: 'related_to', year: 2015, desc: 'eBay Premium Service in UK parallels Top Rated Plus badge for UK TRS sellers' },
        { target: 'ebay-top-service-de', type: 'related_to', year: 2016, desc: 'eBay Top-Service in DE is the equivalent of Top Rated Plus for German sellers' },
      ];
      break;

    case 'track-package':
      newRels = [
        { target: 'shipping', type: 'depends_on', year: 2006, desc: 'Track Package links to carrier tracking using the shipping label data' },
        { target: 'tracking-number', type: 'depends_on', year: 2006, desc: 'Track Package requires a Tracking Number to query carrier shipment status' },
        { target: 'order-management', type: 'integrates_with', year: 2010, desc: 'Track Package is accessible from the order management interface' },
        { target: 'ebay-guaranteed-delivery', type: 'integrates_with', year: 2017, desc: 'Track Package data is used to determine Guaranteed Delivery eligibility and compliance' },
      ];
      break;

    case 'tracking-number':
      newRels = [
        { target: 'shipping', type: 'depends_on', year: 2005, desc: 'Tracking Number is generated as part of the shipping label creation process' },
        { target: 'valid-tracking-rate', type: 'integrates_with', year: 2019, desc: 'Uploaded tracking numbers are validated to calculate Valid Tracking Rate' },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2019, desc: 'Valid tracking upload is a Seller Performance Standards metric' },
        { target: 'upload-tracking', type: 'related_to', year: 2013, desc: 'Upload Tracking is the tool used when adding tracking numbers manually' },
        { target: 'ebay-guaranteed-delivery', type: 'integrates_with', year: 2017, desc: 'Tracking Number confirmation is required for Guaranteed Delivery program compliance' },
      ];
      break;

    case 'trademark':
      newRels = [
        { target: 'trust', type: 'depends_on', year: 2000, desc: 'Trademark protection is part of eBay\'s platform trust and safety infrastructure' },
        { target: 'vero-program', type: 'integrates_with', year: 2000, desc: 'VeRO Program is the primary mechanism for trademark holders to enforce rights on eBay' },
        { target: 'intellectual-property', type: 'related_to', year: 2000, desc: 'Trademark is one category of intellectual property protected on the platform' },
        { target: 'listing-removal-notice', type: 'integrates_with', year: 2000, desc: 'Trademark violations result in Listing Removal Notices to sellers' },
        { target: 'copyright', type: 'related_to', year: 2000, desc: 'Trademark and Copyright are the two primary IP protections enforced on eBay' },
      ];
      break;

    case 'trading-card-authentication':
      newRels = [
        { target: 'authenticity-guarantee', type: 'depends_on', year: 2021, desc: 'Trading Card Authentication is a vertical implementation of Authenticity Guarantee' },
        { target: 'tcgplayer', type: 'integrates_with', year: 2022, desc: 'TCGplayer Authentication Center provides grading infrastructure for eBay trading cards' },
        { target: 'trading-card-hub', type: 'integrates_with', year: 2021, desc: 'Authentication is integrated into the Trading Card Hub marketplace experience' },
        { target: 'trust', type: 'depends_on', year: 2021, desc: 'Trading Card Authentication supports eBay\'s broader trust and safety infrastructure' },
        { target: 'psa-grading-integration', type: 'integrates_with', year: 2022, desc: 'PSA Grading Integration provides professional card grading for the authentication pipeline' },
      ];
      break;

    case 'trading-card-hub':
      newRels = [
        { target: 'collectibles', type: 'depends_on', year: 2021, desc: 'Trading Card Hub is a specialized marketplace within eBay Collectibles' },
        { target: 'trading-card-authentication', type: 'integrates_with', year: 2021, desc: 'Hub integrates authentication workflows and graded card displays' },
        { target: 'tcgplayer', type: 'integrates_with', year: 2022, desc: 'TCGplayer data powers pricing and marketplace context in the Trading Card Hub' },
        { target: 'authenticity-guarantee-trading-cards', type: 'integrates_with', year: 2021, desc: 'The hub surfaces Authenticity Guarantee for trading cards prominently' },
        { target: 'product-research', type: 'integrates_with', year: 2022, desc: 'Product Research / Terapeak data informs pricing recommendations in the hub' },
      ];
      break;

    case 'traffic-report':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2012, desc: 'Traffic Report is a seller analytics feature accessed within Seller Hub' },
        { target: 'analytics', type: 'depends_on', year: 2012, desc: 'Traffic Report is part of eBay\'s seller analytics suite' },
        { target: 'traffic-report-multi-market', type: 'related_to', year: 2015, desc: 'Multi-market variant of Traffic Report with localized labels and market breakdowns' },
        { target: 'traffic-reports', type: 'related_to', year: 2012, desc: 'Traffic Reports is an alternate catalog node for the same feature' },
        { target: 'listing-quality-report', type: 'related_to', year: 2018, desc: 'Listing Quality Report complements Traffic Report with visibility health data' },
        { target: 'promoted-listings', type: 'integrates_with', year: 2015, desc: 'Traffic Report breaks down traffic by organic vs. Promoted Listings sources' },
        { target: 'product-research', type: 'related_to', year: 2021, desc: 'Product Research provides complementary sales data alongside traffic data' },
        { target: 'sourcing-insights', type: 'related_to', year: 2021, desc: 'Sourcing Insights complements Traffic Report with inventory demand data' },
      ];
      break;

    case 'traffic-report-multi-market':
      newRels = [
        { target: 'seller-hub-multi-market', type: 'depends_on', year: 2015, desc: 'Multi-market Traffic Report is a feature of the multi-market Seller Hub product' },
        { target: 'seller-hub-reports-multi-market', type: 'depends_on', year: 2015, desc: 'Part of the multi-market seller hub reporting suite' },
        { target: 'traffic-report', type: 'related_to', year: 2015, desc: 'Multi-market variant of the Traffic Report with localized translations' },
        { target: 'analytics', type: 'depends_on', year: 2015, desc: 'Part of eBay\'s seller analytics infrastructure across markets' },
      ];
      break;

    case 'traffic-reports':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2009, desc: 'Traffic Reports is the seller-facing analytics view within Seller Hub' },
        { target: 'traffic-report', type: 'related_to', year: 2009, desc: 'Traffic-report is the canonical node; traffic-reports is an alternate naming' },
        { target: 'analytics', type: 'depends_on', year: 2009, desc: 'Traffic Reports is part of eBay\'s seller analytics suite' },
        { target: 'page-views', type: 'integrates_with', year: 2009, desc: 'Traffic Reports surface page view and impression data per listing' },
      ];
      break;

    case 'transaction-defect-rate':
      newRels = [
        { target: 'seller-performance-standards', type: 'depends_on', year: 2014, desc: 'Transaction Defect Rate is a core metric within Seller Performance Standards' },
        { target: 'top-rated-seller', type: 'integrates_with', year: 2014, desc: 'TRS eligibility requires TDR below 0.5%; Above Standard requires below 2%' },
        { target: 'cases-closed-without-seller-resolution', type: 'integrates_with', year: 2014, desc: 'CSNR cases count toward Transaction Defect Rate calculations' },
        { target: 'item-not-received', type: 'integrates_with', year: 2014, desc: 'Item Not Received cases that escalate contribute to Transaction Defect Rate' },
      ];
      break;

    case 'transaction-interference-policy':
      newRels = [
        { target: 'trust', type: 'depends_on', year: 2004, desc: 'Transaction Interference Policy is a trust and safety enforcement rule' },
        { target: 'terms-of-service', type: 'related_to', year: 2004, desc: 'Transaction Interference Policy is embedded within eBay\'s Terms of Service' },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2014, desc: 'Violations of Transaction Interference Policy affect seller performance standing' },
        { target: 'account-suspension', type: 'related_to', year: 2004, desc: 'Repeated transaction interference can result in account suspension' },
      ];
      break;

    case 'transaction-report':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2008, desc: 'Transaction Report is accessible within the Seller Hub payments and reports section' },
        { target: 'analytics', type: 'depends_on', year: 2008, desc: 'Transaction Report is part of eBay\'s seller analytics and accounting tools' },
        { target: 'transaction-report-multi-market', type: 'related_to', year: 2012, desc: 'Multi-market variant of Transaction Report with localized fee breakdowns' },
        { target: 'managed-payments', type: 'integrates_with', year: 2018, desc: 'Transaction Report data flows from Managed Payments transaction records' },
        { target: 'tax-documents', type: 'related_to', year: 2013, desc: 'Transaction Report data is used to generate seller tax documents' },
      ];
      break;

    case 'transaction-report-multi-market':
      newRels = [
        { target: 'seller-hub-reports-multi-market', type: 'depends_on', year: 2012, desc: 'Multi-market Transaction Report is part of the multi-market seller hub reporting suite' },
        { target: 'transaction-report', type: 'related_to', year: 2012, desc: 'Multi-market variant of Transaction Report with translated labels and local currencies' },
        { target: 'managed-payments', type: 'integrates_with', year: 2018, desc: 'Managed Payments provides the transaction data for multi-market reporting' },
        { target: 'vat-services-uk-eu', type: 'integrates_with', year: 2021, desc: 'Multi-market Transaction Report includes VAT line items for EU/UK sellers' },
      ];
      break;

    case 'try-again':
      newRels = [
        { target: 'checkout', type: 'related_to', year: 2005, desc: 'Try Again button most commonly appears on checkout error pages' },
        { target: 'payment-failed', type: 'integrates_with', year: 2005, desc: 'Try Again is the recovery CTA on Payment Failed error screens' },
        { target: 'secure-checkout', type: 'related_to', year: 2005, desc: 'Checkout error recovery flows rely on the Try Again interaction pattern' },
      ];
      break;

    case 'turbo-lister':
      newRels = [
        { target: 'seller-hub', type: 'replaced_by', year: 2018, desc: 'Turbo Lister was replaced by Seller Hub\'s web-based bulk listing tools' },
        { target: 'bulk-listing-tools', type: 'replaced_by', year: 2018, desc: 'Bulk Listing Tools in Seller Hub succeeded the Turbo Lister desktop application' },
        { target: 'selling-manager', type: 'related_to', year: 2003, desc: 'Selling Manager was a companion platform to Turbo Lister for order management' },
        { target: 'file-exchange', type: 'related_to', year: 2003, desc: 'File Exchange was an alternative bulk listing tool during Turbo Lister\'s era' },
        { target: 'advanced-listing-tool', type: 'replaced_by', year: 2018, desc: 'Advanced Listing Tool is the web-based replacement for Turbo Lister functionality' },
      ];
      break;

    case 'two-factor-authentication':
      newRels = [
        { target: 'account-security', type: 'depends_on', year: 2016, desc: 'Two-Factor Authentication is a core account security feature' },
        { target: 'trust', type: 'integrates_with', year: 2016, desc: '2FA supports eBay\'s platform-wide trust and safety framework' },
        { target: '2-step-verification', type: 'related_to', year: 2016, desc: '2-Step Verification is the consumer-facing name for Two-Factor Authentication' },
        { target: 'passkeys', type: 'related_to', year: 2023, desc: 'Passkeys are a newer, phishing-resistant alternative to 2FA for account security' },
        { target: 'login-alerts', type: 'integrates_with', year: 2016, desc: 'Login Alerts notify users of new device logins, complementing 2FA protection' },
      ];
      break;

    case 'unique-visitors':
      newRels = [
        { target: 'analytics', type: 'depends_on', year: 2014, desc: 'Unique Visitors is a seller analytics metric within eBay\'s reporting suite' },
        { target: 'traffic-report', type: 'integrates_with', year: 2014, desc: 'Unique Visitors is one of the metrics surfaced in Traffic Reports' },
        { target: 'page-views', type: 'related_to', year: 2014, desc: 'Page Views and Unique Visitors are companion metrics in listing analytics' },
      ];
      break;

    case 'unpaid-item-assistant':
      newRels = [
        { target: 'trust', type: 'integrates_with', year: 2015, desc: 'UIA supports eBay\'s trust framework by recovering fees from non-paying buyers' },
        { target: 'seller-hub', type: 'integrates_with', year: 2016, desc: 'Unpaid Item Assistant is configured and managed within Seller Hub' },
        { target: 'unpaid-item-case', type: 'depends_on', year: 2015, desc: 'UIA automates the Unpaid Item Case filing process on behalf of sellers' },
        { target: 'resolution-center-multi-market', type: 'integrates_with', year: 2015, desc: 'UIA cases are managed through the Resolution Center dispute workflow' },
        { target: 'buyer-requirements', type: 'integrates_with', year: 2015, desc: 'UIA works in tandem with Buyer Requirements to prevent habitual non-payers' },
      ];
      break;

    case 'unpaid-item-case':
      newRels = [
        { target: 'trust', type: 'depends_on', year: 2008, desc: 'Unpaid Item Cases are part of eBay\'s trust framework for transaction enforcement' },
        { target: 'unpaid-item-assistant', type: 'related_to', year: 2015, desc: 'UIA automates filing Unpaid Item Cases; both address buyer non-payment' },
        { target: 'resolution-center-multi-market', type: 'integrates_with', year: 2008, desc: 'Unpaid Item Cases are filed and tracked through the Resolution Center' },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2014, desc: 'Cancelled transactions from unpaid items factor into seller defect metrics' },
      ];
      break;

    case 'unread-messages':
      newRels = [
        { target: 'message-center', type: 'depends_on', year: 2010, desc: 'Unread Messages counter reflects pending messages in the Message Center' },
        { target: 'my-ebay', type: 'integrates_with', year: 2010, desc: 'Unread Messages badge appears in the My eBay navigation header' },
        { target: 'communication', type: 'related_to', year: 2010, desc: 'Unread Messages is a core buyer communication awareness signal' },
        { target: 'in-app-messaging', type: 'integrates_with', year: 2015, desc: 'In-App Messaging notifications drive the Unread Messages counter on mobile' },
      ];
      break;

    case 'unsold-listings':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2016, desc: 'Unsold Listings is a view within Seller Hub for post-auction analysis' },
        { target: 'relist', type: 'integrates_with', year: 2016, desc: 'Sellers use Unsold Listings view to select items for relisting' },
        { target: 'sell-similar', type: 'integrates_with', year: 2016, desc: 'Sell Similar action is available from the Unsold Listings view' },
        { target: 'auto-relist', type: 'related_to', year: 2016, desc: 'Auto-Relist automates the relisting of items that appear in Unsold Listings' },
      ];
      break;

    case 'upload-tracking':
      newRels = [
        { target: 'shipping', type: 'depends_on', year: 2013, desc: 'Upload Tracking is part of eBay\'s shipping and order fulfillment workflow' },
        { target: 'tracking-number', type: 'related_to', year: 2013, desc: 'Upload Tracking is the tool used to manually add tracking numbers to orders' },
        { target: 'valid-tracking-rate', type: 'integrates_with', year: 2019, desc: 'Numbers uploaded via Upload Tracking are validated for Valid Tracking Rate' },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2019, desc: 'Timely tracking uploads affect Seller Performance Standards metrics' },
      ];
      break;

    case 'user-agreement':
      newRels = [
        { target: 'trust', type: 'depends_on', year: 1995, desc: 'User Agreement is a foundational trust and legal governance document' },
        { target: 'terms-of-service', type: 'related_to', year: 1995, desc: 'User Agreement and Terms of Service together form eBay\'s core legal framework' },
        { target: 'privacy-policy', type: 'related_to', year: 1995, desc: 'Privacy Policy is presented alongside the User Agreement at registration' },
        { target: 'seller-performance-standards', type: 'integrates_with', year: 2001, desc: 'User Agreement establishes the legal basis for Seller Performance Standards enforcement' },
      ];
      break;

    case 'valid-tracking-rate':
      newRels = [
        { target: 'seller-performance-standards', type: 'depends_on', year: 2019, desc: 'Valid Tracking Rate is a metric within Seller Performance Standards' },
        { target: 'top-rated-seller', type: 'integrates_with', year: 2019, desc: 'Meeting VTR threshold is required to maintain Top Rated Seller status' },
        { target: 'tracking-number', type: 'depends_on', year: 2019, desc: 'Valid Tracking Rate is calculated from validated carrier tracking numbers' },
        { target: 'ebay-guaranteed-delivery', type: 'integrates_with', year: 2019, desc: 'Guaranteed Delivery eligibility requires consistent Valid Tracking Rate compliance' },
      ];
      break;

    case 'variation-photos':
      newRels = [
        { target: 'listing', type: 'depends_on', year: 2013, desc: 'Variation Photos are an attribute of multi-variation listings' },
        { target: 'multi-variation-listing', type: 'depends_on', year: 2013, desc: 'Variation Photos only apply to Multi-Variation Listings with selectable attributes' },
        { target: 'variation-specifics', type: 'integrates_with', year: 2013, desc: 'Variation Photos update dynamically when buyers select different Variation Specifics' },
        { target: 'photo-enhancement', type: 'integrates_with', year: 2018, desc: 'Photo Enhancement tools apply to each variation\'s individual photos' },
      ];
      break;

    case 'variation-specifics':
      newRels = [
        { target: 'listing', type: 'depends_on', year: 2011, desc: 'Variation Specifics are attributes of multi-variation listings' },
        { target: 'multi-variation-listing', type: 'depends_on', year: 2011, desc: 'Variation Specifics are the attribute selectors on Multi-Variation Listings' },
        { target: 'variation-photos', type: 'integrates_with', year: 2013, desc: 'Selecting Variation Specifics triggers display of corresponding Variation Photos' },
        { target: 'item-specifics', type: 'related_to', year: 2011, desc: 'Variation Specifics extend Item Specifics to support size/color/style selectors' },
        { target: 'advanced-listing-tool', type: 'integrates_with', year: 2014, desc: 'Advanced Listing Tool provides the UI to configure Variation Specifics' },
      ];
      break;

    case 'vat-collection':
      newRels = [
        { target: 'payments', type: 'depends_on', year: 2021, desc: 'VAT Collection is processed through eBay\'s managed payments infrastructure' },
        { target: 'managed-payments', type: 'depends_on', year: 2021, desc: 'Managed Payments handles VAT calculation and remittance to EU/UK tax authorities' },
        { target: 'vat-services-uk-eu', type: 'related_to', year: 2021, desc: 'VAT Services provides the compliance tools that enable VAT Collection' },
        { target: 'international', type: 'integrates_with', year: 2021, desc: 'VAT Collection applies to international cross-border transactions into EU/UK' },
        { target: 'ebay-international-shipping', type: 'integrates_with', year: 2021, desc: 'International shipping triggers VAT Collection on low-value imports below €150' },
        { target: 'tax-documents', type: 'integrates_with', year: 2021, desc: 'VAT collected is documented in seller Tax Documents and VAT invoices' },
      ];
      break;

    case 'vat-services-uk-eu':
      newRels = [
        { target: 'tax', type: 'depends_on', year: 2021, desc: 'VAT Services is part of eBay\'s tax compliance infrastructure for EU/UK' },
        { target: 'vat-collection', type: 'related_to', year: 2021, desc: 'VAT Services provides compliance tooling that underpins VAT Collection' },
        { target: 'managed-payments', type: 'integrates_with', year: 2021, desc: 'VAT calculations and remittances flow through Managed Payments' },
        { target: 'international', type: 'integrates_with', year: 2021, desc: 'VAT Services supports cross-border EU sellers managing distance selling thresholds' },
        { target: 'ebay-germany', type: 'related_to', year: 2021, desc: 'VAT Services is essential for eBay Germany sellers complying with EU VAT rules' },
        { target: 'ebay-uk', type: 'related_to', year: 2021, desc: 'VAT Services supports UK sellers post-Brexit with OSS and IOSS compliance' },
      ];
      break;

    case 'vehicle-history-report':
      newRels = [
        { target: 'ebay-motors', type: 'depends_on', year: 2015, desc: 'Vehicle History Report is a trust feature embedded in eBay Motors listings' },
        { target: 'trust', type: 'integrates_with', year: 2015, desc: 'Vehicle History Report supports buyer trust for high-value vehicle purchases' },
        { target: 'vehicle-purchase-protection', type: 'integrates_with', year: 2018, desc: 'Vehicle History Report complements Vehicle Purchase Protection as a buyer trust signal' },
        { target: 'vin-lookup', type: 'integrates_with', year: 2015, desc: 'VIN Lookup decodes the VIN which is then used to fetch the Vehicle History Report' },
        { target: 'secure-purchase', type: 'integrates_with', year: 2018, desc: 'Vehicle History Report is part of the secure purchase trust stack for motors' },
      ];
      break;

    case 'vehicle-purchase-protection':
      newRels = [
        { target: 'trust', type: 'depends_on', year: 2018, desc: 'Vehicle Purchase Protection is part of eBay\'s trust and buyer protection infrastructure' },
        { target: 'ebay-motors', type: 'integrates_with', year: 2018, desc: 'VPP is the Motors-specific buyer protection program for vehicle purchases' },
        { target: 'vehicle-history-report', type: 'integrates_with', year: 2018, desc: 'Vehicle History Report complements VPP by surfacing pre-purchase vehicle info' },
        { target: 'secure-purchase', type: 'integrates_with', year: 2018, desc: 'VPP is a key component of eBay\'s secure purchase framework for high-value items' },
        { target: 'ebay-money-back-guarantee', type: 'related_to', year: 2018, desc: 'VPP is the Motors-specific analog to eBay Money Back Guarantee for general items' },
        { target: 'escrow-com', type: 'related_to', year: 2020, desc: 'Escrow.com is an optional secure payment alternative for vehicle purchases' },
      ];
      break;

    case 'venmo':
      newRels = [
        { target: 'payments', type: 'depends_on', year: 2022, desc: 'Venmo is a payment option within eBay\'s managed payments checkout' },
        { target: 'managed-payments', type: 'integrates_with', year: 2022, desc: 'Venmo payments are processed through eBay\'s Managed Payments infrastructure' },
        { target: 'checkout', type: 'integrates_with', year: 2022, desc: 'Venmo appears as a payment method option at eBay checkout' },
        { target: 'paypal-credit-6-month', type: 'related_to', year: 2022, desc: 'Both Venmo and PayPal Credit are PayPal-ecosystem payment options at checkout' },
        { target: 'apple-pay', type: 'related_to', year: 2022, desc: 'Venmo and Apple Pay are peer alternative payment methods at eBay checkout' },
        { target: 'ebay-mobile-app', type: 'integrates_with', year: 2024, desc: 'Targeted at digital-native mobile shoppers' },
        { target: 'apple-pay', type: 'competes_with', year: 2024, desc: 'Competing digital wallet payment option at checkout' },
      ];
      break;

    case 'verified-purchase':
      newRels = [
        { target: 'feedback', type: 'depends_on', year: 2016, desc: 'Verified Purchase badge is awarded to reviews from confirmed buyers in the Feedback system' },
        { target: 'trust', type: 'integrates_with', year: 2016, desc: 'Verified Purchase supports platform trust by authenticating reviewer identity' },
        { target: 'verified-purchase-multi-market', type: 'related_to', year: 2016, desc: 'Multi-market variant of Verified Purchase with localized display labels' },
        { target: 'item-reviews', type: 'integrates_with', year: 2016, desc: 'Verified Purchase badge appears on Item Reviews to distinguish authentic buyers' },
      ];
      break;

    case 'verified-purchase-multi-market':
      newRels = [
        { target: 'feedback', type: 'depends_on', year: 2016, desc: 'Multi-market Verified Purchase badge is part of the global feedback system' },
        { target: 'trust', type: 'integrates_with', year: 2016, desc: 'Supports trust across all eBay markets by validating review authenticity' },
        { target: 'verified-purchase', type: 'related_to', year: 2016, desc: 'Multi-market node for the same Verified Purchase badge with localized translations' },
        { target: 'item-reviews', type: 'integrates_with', year: 2016, desc: 'Badge appears on product reviews across all eBay markets' },
      ];
      break;

    case 'verify-account':
      newRels = [
        { target: 'trust', type: 'depends_on', year: 2011, desc: 'Verify Account is part of eBay\'s identity verification and trust infrastructure' },
        { target: 'account-security', type: 'integrates_with', year: 2011, desc: 'Account verification is a step in the account security onboarding flow' },
        { target: 'seller-verification', type: 'related_to', year: 2018, desc: 'Seller Verification extends the basic Verify Account flow for selling permissions' },
        { target: 'two-factor-authentication', type: 'integrates_with', year: 2016, desc: 'Verify Account triggers 2FA setup as part of identity confirmation' },
        { target: 'managed-payments', type: 'integrates_with', year: 2018, desc: 'Account verification is required before activating Managed Payments for sellers' },
      ];
      break;

    case 'verkaufer-cockpit-pro':
      newRels = [
        { target: 'seller-hub-multi-market', type: 'depends_on', year: 2016, desc: 'Verkäufer-Cockpit Pro is the German localization of the multi-market Seller Hub' },
        { target: 'ebay-germany', type: 'integrates_with', year: 2016, desc: 'Verkäufer-Cockpit Pro is designed specifically for the eBay Germany market' },
        { target: 'store-tier-platin-de', type: 'integrates_with', year: 2019, desc: 'Platin DE store tier sellers are primary users of Verkäufer-Cockpit Pro' },
        { target: 'vat-services-uk-eu', type: 'integrates_with', year: 2021, desc: 'Includes VAT calculator and German tax compliance tools' },
        { target: 'seller-hub', type: 'related_to', year: 2016, desc: 'Verkäufer-Cockpit Pro is the DE-market equivalent of Seller Hub' },
      ];
      break;

    case 'vero-program':
      newRels = [
        { target: 'trust', type: 'depends_on', year: 1998, desc: 'VeRO is a core component of eBay\'s platform trust and intellectual property framework' },
        { target: 'intellectual-property', type: 'integrates_with', year: 1998, desc: 'VeRO Program is the primary mechanism for IP rights enforcement on eBay' },
        { target: 'trademark', type: 'integrates_with', year: 2000, desc: 'VeRO handles trademark infringement complaints from rights holders' },
        { target: 'copyright', type: 'integrates_with', year: 1998, desc: 'VeRO handles copyright infringement complaints in addition to trademark' },
        { target: 'listing-removal-notice', type: 'integrates_with', year: 2000, desc: 'VeRO complaints trigger Listing Removal Notices to the infringing seller' },
        { target: 'listing', type: 'integrates_with', year: 1998, desc: 'VeRO reviews active listings and initiates removal for IP violations' },
      ];
      break;

    case 'very-good-refurbished':
      newRels = [
        { target: 'ebay-refurbished', type: 'depends_on', year: 2020, desc: 'Very Good Refurbished is one of the graded condition tiers in eBay Refurbished' },
        { target: 'excellent-refurbished', type: 'related_to', year: 2020, desc: 'Excellent Refurbished is the tier above Very Good in the refurbished condition hierarchy' },
        { target: 'good-refurbished', type: 'related_to', year: 2020, desc: 'Good Refurbished is the tier below Very Good in the refurbished condition hierarchy' },
        { target: 'certified-refurbished', type: 'related_to', year: 2020, desc: 'Certified Refurbished is the brand-certified tier above all seller refurbished grades' },
        { target: 'refurbished', type: 'depends_on', year: 2020, desc: 'Very Good Refurbished is part of eBay\'s broader refurbished category umbrella' },
      ];
      break;

    case 'video-games':
      newRels = [
        { target: 'category', type: 'depends_on', year: 2002, desc: 'Video Games is a top-level vertical category on eBay' },
        { target: 'electronics-technology', type: 'related_to', year: 2002, desc: 'Video Games sits adjacent to Electronics & Technology in eBay\'s category hierarchy' },
        { target: 'collectibles', type: 'related_to', year: 2005, desc: 'Retro/vintage video games overlap with the Collectibles vertical on eBay' },
        { target: 'best-match', type: 'integrates_with', year: 2008, desc: 'Best Match algorithm applies platform and game-specific filters for Video Games' },
        { target: 'item-specifics', type: 'integrates_with', year: 2008, desc: 'Item Specifics include Platform, Genre, and Game Title for Video Games vertical' },
      ];
      break;

    case 'view-count':
      newRels = [
        { target: 'listing', type: 'depends_on', year: 2002, desc: 'View Count is a per-listing analytics metric visible to sellers' },
        { target: 'traffic-report', type: 'integrates_with', year: 2012, desc: 'View Count data is aggregated and displayed in Traffic Reports' },
        { target: 'page-views', type: 'related_to', year: 2004, desc: 'View Count and Page Views are functionally equivalent seller-facing metrics' },
        { target: 'listing-analytics', type: 'integrates_with', year: 2014, desc: 'Listing Analytics includes View Count as a core performance indicator' },
      ];
      break;

    case 'view-item':
      newRels = [
        { target: 'listing', type: 'depends_on', year: 2000, desc: 'View Item is a seller action to preview a listing in buyer view' },
        { target: 'seller-hub', type: 'integrates_with', year: 2016, desc: 'View Item link appears in Seller Hub listing management pages' },
        { target: 'view-item-page', type: 'related_to', year: 2000, desc: 'View Item opens the View Item Page — the core buyer-facing product detail page' },
      ];
      break;

    case 'view-item-page':
      newRels = [
        { target: 'listing', type: 'depends_on', year: 1997, desc: 'View Item Page is the buyer-facing display of an eBay listing' },
        { target: 'buy-it-now', type: 'integrates_with', year: 2000, desc: 'Buy It Now CTA is a primary action on the View Item Page' },
        { target: 'best-offer', type: 'integrates_with', year: 2003, desc: 'Best Offer CTA appears on the View Item Page for applicable listings' },
        { target: 'authenticity-guarantee', type: 'integrates_with', year: 2018, desc: 'Authenticity Guarantee badges and details surface on the View Item Page' },
        { target: 'promoted-listings', type: 'integrates_with', year: 2012, desc: 'Similar Sponsored Items from Promoted Listings appear on View Item Pages' },
        { target: 'watch-this-item', type: 'integrates_with', year: 2000, desc: 'Watch This Item button is a primary buyer action on the View Item Page' },
      ];
      break;

    case 'view-order':
      newRels = [
        { target: 'order-management', type: 'depends_on', year: 2010, desc: 'View Order is the buyer-facing order detail and tracking interface' },
        { target: 'my-ebay', type: 'integrates_with', year: 2010, desc: 'View Order is accessible from the My eBay purchase history section' },
        { target: 'track-package', type: 'integrates_with', year: 2010, desc: 'Track Package link is prominently displayed on the View Order page' },
        { target: 'request-return', type: 'integrates_with', year: 2010, desc: 'Request Return action is accessible from the View Order page' },
      ];
      break;

    case 'views':
      newRels = [
        { target: 'traffic-report', type: 'integrates_with', year: 2009, desc: 'Views metric appears in Traffic Reports and store analytics dashboards' },
        { target: 'page-views', type: 'related_to', year: 2004, desc: 'Views is the simplified mobile app label for the Page Views metric' },
        { target: 'analytics', type: 'depends_on', year: 2004, desc: 'Views is part of eBay\'s seller analytics metric suite' },
        { target: 'view-count', type: 'related_to', year: 2004, desc: 'Views and View Count are synonymous metrics displayed in different contexts' },
      ];
      break;

    case 'vin-lookup':
      newRels = [
        { target: 'ebay-motors', type: 'depends_on', year: 2012, desc: 'VIN Lookup is a core feature of eBay Motors for parts compatibility matching' },
        { target: 'vehicle-history-report', type: 'integrates_with', year: 2015, desc: 'VIN Lookup decodes the VIN that is used to retrieve the Vehicle History Report' },
        { target: 'trust', type: 'integrates_with', year: 2015, desc: 'VIN Lookup supports buyer trust by verifying vehicle identity before purchase' },
        { target: 'parts-compatibility', type: 'integrates_with', year: 2012, desc: 'VIN Lookup data feeds into Parts Compatibility to show exact fitment matches' },
        { target: 'fitment-compatibility', type: 'integrates_with', year: 2014, desc: 'Fitment Compatibility uses VIN-decoded specs for precise parts matching' },
        { target: 'vehicle-purchase-protection', type: 'integrates_with', year: 2018, desc: 'VIN Lookup is part of the trust stack that underpins Vehicle Purchase Protection' },
      ];
      break;

    case 'virtual-assistant':
      newRels = [
        { target: 'trust', type: 'integrates_with', desc: 'Escalates fraud/safety concerns to trust systems' },
        { target: 'customer-service', type: 'integrates_with', desc: 'Front-line automation before human agent handoff' },
        { target: 'resolution-center-multi-market', type: 'integrates_with', desc: 'Routes dispute initiation from chat to resolution center' },
        { target: 'help-center', type: 'integrates_with', desc: 'Surfaces help articles inline during chat sessions' },
        { target: 'message-center', type: 'integrates_with', desc: 'Operates within buyer/seller message center infrastructure' },
        { target: 'support', type: 'depends_on', desc: 'Child of support umbrella; inherits escalation paths' },
      ];
      break;

    case 'visitor-count':
      newRels = [
        { target: 'seller-hub', type: 'integrates_with', desc: 'Displayed as a key metric in Seller Hub performance tabs' },
        { target: 'listing-analytics', type: 'integrates_with', desc: 'Component of listing-level analytics suite' },
        { target: 'watch-count', type: 'related_to', desc: 'Companion demand-signal metric alongside visitor count' },
        { target: 'page-views', type: 'related_to', desc: 'Page views is the session-level counterpart to unique visitors' },
        { target: 'traffic-report', type: 'integrates_with', desc: 'Feeds into Traffic Report breakdowns' },
        { target: 'conversion-rate', type: 'related_to', desc: 'Conversion rate is derived from visitor count and sales' },
      ];
      break;

    case 'visits':
      newRels = [
        { target: 'analytics', type: 'depends_on', desc: 'Lives under Analytics umbrella' },
        { target: 'traffic-report', type: 'integrates_with', desc: 'Core input to Traffic Report' },
        { target: 'page-views', type: 'related_to', desc: 'Page views and visits differ by session vs. page count' },
        { target: 'visitor-count', type: 'related_to', desc: 'Visits counts sessions; visitor-count counts unique users' },
        { target: 'bounce-rate', type: 'related_to', desc: 'Bounce rate calculated from single-page visit sessions' },
        { target: 'conversion-rate', type: 'related_to', desc: 'Conversion rate derived from visits-to-purchase ratio' },
      ];
      break;

    case 'visual-editor':
      newRels = [
        { target: 'listing-designer', type: 'related_to', desc: 'Visual Editor is the WYSIWYG capability within Listing Designer' },
        { target: 'wysiwyg-editor', type: 'related_to', desc: 'WYSIWYG Editor is an alternate name for the same tool' },
        { target: 'html-editor', type: 'competes_with', desc: 'Alternative to HTML Editor for sellers who prefer no-code' },
        { target: 'description-builder', type: 'integrates_with', desc: 'Description Builder leverages Visual Editor for layout' },
        { target: 'listing-tools', type: 'depends_on', desc: 'Part of the listing tools umbrella' },
        { target: 'mobile-photo-editor', type: 'related_to', desc: 'Companion editing tool for visual content on mobile' },
      ];
      break;

    case 'volume-pricing':
      newRels = [
        { target: 'discounts-manager', type: 'integrates_with', desc: 'Volume Pricing configured via Discounts Manager' },
        { target: 'promotions-manager', type: 'integrates_with', desc: 'Promotions Manager can stack with volume pricing offers' },
        { target: 'marketing', type: 'depends_on', desc: 'Sits under Marketing umbrella' },
        { target: 'order-discounts', type: 'related_to', desc: 'Order Discounts complement volume-based price reductions' },
        { target: 'sale-events', type: 'related_to', desc: 'Volume pricing can be applied within sale event windows' },
        { target: 'best-offer', type: 'competes_with', desc: 'Sellers may use Best Offer instead of or alongside volume pricing' },
        { target: 'discounts-manager', type: 'depends_on', year: 2015, desc: 'Volume Pricing is a tool within Discounts Manager' },
        { target: 'ebay-stores', type: 'depends_on', year: 2015, desc: 'Requires eBay Store subscription' },
        { target: 'coded-coupons', type: 'related_to', year: 2015, desc: 'Both are promotional tools within Discounts Manager' },
      ];
      break;

    case 'volume-pricing-multi-market':
      newRels = [
        { target: 'volume-pricing', type: 'related_to', desc: 'Multi-market variant with UK Multi-Buy and DE Multi-Rabatt branding' },
        { target: 'discounts-manager-multi-market', type: 'depends_on', desc: 'Configured through Discounts Manager multi-market product' },
        { target: 'order-discounts-multi-market', type: 'integrates_with', desc: 'Works alongside multi-market order discounts' },
        { target: 'sale-events-multi-market', type: 'integrates_with', desc: 'Can be applied during multi-market sale event periods' },
        { target: 'international', type: 'related_to', desc: 'Covers UK, DE, FR regional naming conventions' },
        { target: 'promotions-manager', type: 'integrates_with', desc: 'Promotions Manager drives campaign-level application' },
      ];
      break;

    case 'wata-grading':
      newRels = [
        { target: 'authenticity-guarantee', type: 'integrates_with', desc: 'WATA grades feed into eBay\'s broader authentication ecosystem' },
        { target: 'collectibles', type: 'depends_on', desc: 'Specific to collectibles category, especially sealed games' },
        { target: 'collectibles-trading', type: 'integrates_with', desc: 'Supports trading value signals in the collectibles umbrella' },
        { target: 'certificate-of-authenticity', type: 'related_to', desc: 'Grade certification serves similar trust role as CoA' },
        { target: 'my-collection', type: 'integrates_with', desc: 'Graded items tracked in collector portfolio' },
        { target: 'trading-card-authentication', type: 'related_to', desc: 'Parallel grading/auth program for trading cards vs. games' },
      ];
      break;

    case 'watch-authentication':
      newRels = [
        { target: 'authenticity-guarantee', type: 'depends_on', desc: 'Child program of Authenticity Guarantee umbrella' },
        { target: 'authenticity-guarantee-watches', type: 'related_to', desc: 'Authenticity Guarantee - Watches is the consumer-facing variant name' },
        { target: 'authentication', type: 'depends_on', desc: 'Under Authentication umbrella' },
        { target: 'trust', type: 'integrates_with', desc: 'Adds trust signal to luxury watch listings' },
        { target: 'jewelry-authentication', type: 'related_to', desc: 'Parallel authentication program for luxury jewelry' },
        { target: 'certificate-of-authenticity', type: 'related_to', desc: 'Certificate accompanies authenticated watches' },
        { target: 'ebay-vault', type: 'integrates_with', desc: 'Authenticated watches eligible for eBay Vault storage' },
      ];
      break;

    case 'watch-count':
      newRels = [
        { target: 'analytics', type: 'depends_on', desc: 'Sits under Analytics umbrella' },
        { target: 'watchers', type: 'related_to', desc: 'Watch Count is the listing-level total; Watchers is the buyer-side view' },
        { target: 'watchers-count', type: 'related_to', desc: 'Watchers Count and Watch Count are near-synonyms in seller UI' },
        { target: 'listing-analytics', type: 'integrates_with', desc: 'Feeds into listing analytics dashboard' },
        { target: 'offers-to-watchers', type: 'integrates_with', desc: 'Watch Count drives eligibility for Offers to Watchers' },
        { target: 'visitor-count', type: 'related_to', desc: 'Companion metric: visitors vs. engaged watchers' },
      ];
      break;

    case 'watch-list':
      newRels = [
        { target: 'discovery-buyer-experience', type: 'integrates_with', desc: 'Watch List is central to the buyer discovery and engagement loop' },
        { target: 'saved-searches', type: 'integrates_with', desc: 'Complementary save mechanism alongside saved searches' },
        { target: 'price-drop-notifications', type: 'integrates_with', desc: 'Price Drop Notifications trigger on watched items' },
        { target: 'buyer', type: 'depends_on', desc: 'Core buyer feature under Buyer umbrella' },
        { target: 'watchlist', type: 'related_to', desc: 'Watch List and Watchlist are alternate naming for the same feature' },
        { target: 'offers-to-watchers', type: 'integrates_with', desc: 'Sellers can send special offers to watch list members' },
        { target: 'outbid-notification', type: 'integrates_with', desc: 'Watch List triggers outbid and auction-ending alerts' },
        { target: 'discovery', type: 'depends_on', year: 1997, desc: 'Watch List is a core discovery and engagement feature' },
        { target: 'watch-list-category-filters', type: 'integrates_with', year: 2025, desc: 'Category Filters extend Watch List with organizational controls' },
        { target: 'saved-searches', type: 'related_to', year: 2005, desc: 'Watch List tracks specific items; Saved Searches tracks search queries' },
        { target: 'price-drop-alert', type: 'integrates_with', year: 2010, desc: 'Watch List triggers price drop alerts for watched items' },
        { target: 'personalized-feed', type: 'integrates_with', year: 2012, desc: 'Watched items influence personalized feed recommendations' },
      ];
      break;

    case 'watch-this-item':
      newRels = [
        { target: 'watch-list', type: 'integrates_with', desc: 'Watch This Item button adds a listing to the Watch List' },
        { target: 'watchlist', type: 'integrates_with', desc: 'Adds items to the buyer Watchlist' },
        { target: 'buyer', type: 'depends_on', desc: 'Buyer-side CTA feature' },
        { target: 'price-drop-alerts', type: 'integrates_with', desc: 'Watching triggers price drop alert enrollment' },
        { target: 'outbid-notice', type: 'integrates_with', desc: 'Watching an auction enables outbid notifications' },
        { target: 'add-to-watchlist', type: 'related_to', desc: 'Add to Watchlist is a near-synonym CTA for the same action' },
      ];
      break;

    case 'watchers':
      newRels = [
        { target: 'sellertools', type: 'depends_on', desc: 'Watchers metric surfaced in seller tools' },
        { target: 'watch-count', type: 'related_to', desc: 'Watchers is the buyer-side label; Watch Count is seller-side metric' },
        { target: 'offers-to-watchers', type: 'integrates_with', desc: 'Watcher count drives Offers to Watchers campaign eligibility' },
        { target: 'listing-analytics', type: 'integrates_with', desc: 'Watcher data is part of listing analytics' },
        { target: 'best-match', type: 'integrates_with', desc: 'High watcher count positively influences Best Match ranking' },
        { target: 'sold-quantity-display', type: 'related_to', desc: 'Both serve as social proof signals on listing pages' },
        { target: 'buy-it-now', type: 'integrates_with', desc: 'High watcher count validates BIN price for hesitant buyers' },
      ];
      break;

    case 'watchers-count':
      newRels = [
        { target: 'listing', type: 'depends_on', desc: 'Displayed on listing pages, child of listing umbrella' },
        { target: 'watchers', type: 'related_to', desc: 'Watchers Count is a renamed/more specific label for the same concept' },
        { target: 'watch-count', type: 'related_to', desc: 'Near-synonym; used interchangeably in different parts of UI' },
        { target: 'buy-it-now', type: 'integrates_with', desc: 'Watcher count validates BIN pricing for undecided buyers' },
        { target: 'auction', type: 'integrates_with', desc: 'Creates urgency in auction listings above 50 watchers' },
        { target: 'seller-hub', type: 'integrates_with', desc: 'Seller Hub surfaces watchers count in performance data' },
      ];
      break;

    case 'watching':
      newRels = [
        { target: 'buyer', type: 'depends_on', desc: 'Active buyer watchlist state feature' },
        { target: 'watch-list', type: 'integrates_with', desc: 'Watching state means item is in Watch List' },
        { target: 'watchlist', type: 'integrates_with', desc: 'Visual indicator of Watchlist enrollment' },
        { target: 'price-drop-alerts', type: 'integrates_with', desc: 'Watching status activates price drop alert eligibility' },
        { target: 'watch-this-item', type: 'related_to', desc: 'Watch This Item CTA results in Watching state' },
        { target: 'notifications', type: 'integrates_with', desc: 'Watching state drives notification subscriptions for item' },
      ];
      break;

    case 'watchlist':
      newRels = [
        { target: 'buyer', type: 'depends_on', desc: 'Core buyer feature' },
        { target: 'watch-list', type: 'related_to', desc: 'Watchlist and Watch List are alternate names for same feature' },
        { target: 'saved-searches', type: 'integrates_with', desc: 'Watchlist and Saved Searches together form buyer save-and-track UX' },
        { target: 'price-drop-notifications', type: 'integrates_with', desc: 'Price drop alerts fire on Watchlist items' },
        { target: 'discovery-buyer-experience', type: 'integrates_with', desc: 'Key feature of the buyer discovery loop' },
        { target: 'my-ebay', type: 'integrates_with', desc: 'Watchlist is a primary section of My eBay dashboard' },
      ];
      break;

    case 'watchlist-multi-market':
      newRels = [
        { target: 'watchlist', type: 'related_to', desc: 'Multi-market variant with regional naming differences (Beobachtungsliste in DE)' },
        { target: 'buyer', type: 'depends_on', desc: 'Buyer feature across all markets' },
        { target: 'international', type: 'related_to', desc: 'Covers regional behavioral and naming differences globally' },
        { target: 'saved-searches-multi-market', type: 'integrates_with', desc: 'Paired with multi-market saved searches' },
        { target: 'notifications', type: 'integrates_with', desc: 'Regional notification preferences vary for watchlist alerts' },
        { target: 'discovery-buyer-experience', type: 'integrates_with', desc: 'Core discovery loop feature across all markets' },
      ];
      break;

    case 'weekly-deals':
      newRels = [
        { target: 'daily-deals', type: 'related_to', desc: 'Weekly Deals is the week-long companion to Daily Deals' },
        { target: 'ebay-deals', type: 'depends_on', desc: 'Lives under eBay Deals umbrella' },
        { target: 'promotions-manager', type: 'integrates_with', desc: 'Weekly deal events configured via Promotions Manager' },
        { target: 'sale-events', type: 'related_to', desc: 'Weekly Deals are a type of sale event' },
        { target: 'featured-deals', type: 'related_to', desc: 'Featured Deals may be surfaced within Weekly Deals hubs' },
        { target: 'flash-deals', type: 'related_to', desc: 'Flash Deals offer shorter windows within the weekly deal cadence' },
      ];
      break;

    case 'weekly-payout':
      newRels = [
        { target: 'payments', type: 'depends_on', desc: 'Payout schedule option under Payments umbrella' },
        { target: 'daily-payout', type: 'related_to', desc: 'Weekly Payout is the 7-day alternative to Daily Payout' },
        { target: 'payout-schedule', type: 'integrates_with', desc: 'Weekly Payout is one option within payout schedule settings' },
        { target: 'managed-payments', type: 'depends_on', desc: 'Requires Managed Payments infrastructure' },
        { target: 'express-payouts', type: 'related_to', desc: 'Express Payouts is the instant alternative to weekly schedule' },
        { target: 'seller-hub', type: 'integrates_with', desc: 'Payout schedule configured from Seller Hub payments section' },
      ];
      break;

    case 'winning-bid':
      newRels = [
        { target: 'auction', type: 'depends_on', desc: 'Core auction-format concept' },
        { target: 'bidding', type: 'integrates_with', desc: 'Winning Bid is the current leading bid in the bidding system' },
        { target: 'checkout', type: 'integrates_with', desc: 'Winning Bid triggers checkout workflow on auction close' },
        { target: 'winning-notice', type: 'integrates_with', desc: 'Winning Notice notifies buyer when their bid wins' },
        { target: 'automatic-bidding', type: 'integrates_with', desc: 'Proxy/automatic bidding determines the winning bid amount' },
        { target: 'reserve-price', type: 'integrates_with', desc: 'Winning Bid must meet Reserve Price for item to sell' },
      ];
      break;

    case 'winning-notice':
      newRels = [
        { target: 'buyer', type: 'depends_on', desc: 'Notification delivered to winning buyer' },
        { target: 'auction', type: 'integrates_with', desc: 'Triggered when auction concludes with a winning bidder' },
        { target: 'bidding', type: 'integrates_with', desc: 'Confirms bidder\'s status after auction close' },
        { target: 'checkout', type: 'integrates_with', desc: 'Winning Notice initiates checkout workflow for payment' },
        { target: 'winning-bid', type: 'integrates_with', desc: 'Winning Notice is the communication artifact of the winning bid event' },
        { target: 'notifications', type: 'depends_on', desc: 'Delivered via the notifications infrastructure' },
      ];
      break;

    case 'write-review':
      newRels = [
        { target: 'feedback', type: 'integrates_with', desc: 'Product review separate from but related to seller feedback system' },
        { target: 'trust', type: 'integrates_with', desc: 'Reviews add trust signals to product listings' },
        { target: 'buyer', type: 'depends_on', desc: 'Buyer-side feature for post-purchase review submission' },
        { target: 'item-reviews', type: 'related_to', desc: 'Item Reviews is the display surface for submitted reviews' },
        { target: 'verified-purchase', type: 'integrates_with', desc: 'Reviews are tagged as Verified Purchase when buyer confirms purchase' },
        { target: 'helpful-review', type: 'related_to', desc: 'Helpful Review rating is layered on top of write-review submissions' },
      ];
      break;

    case 'wysiwyg-editor':
      newRels = [
        { target: 'visual-editor', type: 'related_to', desc: 'WYSIWYG Editor is an alternate name for Visual Editor' },
        { target: 'listing-designer', type: 'depends_on', desc: 'WYSIWYG capability lives within Listing Designer context' },
        { target: 'html-editor', type: 'competes_with', desc: 'Alternative to code-based HTML Editor for description creation' },
        { target: 'description-builder', type: 'integrates_with', desc: 'Description Builder uses WYSIWYG canvas for layout' },
        { target: 'listing-tools', type: 'depends_on', desc: 'Part of the listing tools umbrella' },
        { target: 'rich-text-editor', type: 'related_to', desc: 'Rich Text Editor is a simpler subset of WYSIWYG editing' },
      ];
      break;

    case 'zahlungsabwicklung-ebay':
      newRels = [
        { target: 'managed-payments-multi-currency', type: 'depends_on', desc: 'German variant of Managed Payments multi-currency product' },
        { target: 'managed-payments', type: 'related_to', desc: 'German-market localization of Managed Payments' },
        { target: 'ebay-germany', type: 'integrates_with', desc: 'Specific to eBay Germany platform' },
        { target: 'vat-invoice-automation', type: 'integrates_with', desc: 'Includes German Umsatzsteuer tax documentation compliance' },
        { target: 'international', type: 'related_to', desc: 'Regional payments variant for DE market' },
        { target: 'services-paiement-ebay', type: 'related_to', desc: 'Parallel French-market payments branding variant' },
      ];
      break;

    case 'about-me':
      newRels = [
        { target: 'sellertools', type: 'depends_on', desc: 'Seller profile feature under seller tools' },
        { target: 'ebay-stores', type: 'related_to', desc: 'About Me predates eBay Stores and serves a similar brand presence role' },
        { target: 'trust', type: 'integrates_with', desc: 'Seller profile page builds buyer trust through transparency' },
        { target: 'feedback', type: 'integrates_with', desc: 'About Me pages link to seller feedback profiles' },
        { target: 'community', type: 'integrates_with', desc: 'About Me is part of community identity infrastructure' },
      ];
      break;

    case 'automated-promoted-listings-campaigns':
      newRels = [
        { target: 'promoted-listings', type: 'depends_on', desc: 'Rule-based automation layer on top of Promoted Listings' },
        { target: 'promoted-listings-standard', type: 'integrates_with', desc: 'Automates ad rate adjustment for Standard campaigns' },
        { target: 'advertising', type: 'depends_on', desc: 'Under Advertising umbrella' },
        { target: 'ad-rate-recommendation', type: 'integrates_with', desc: 'Leverages ad rate recommendations to auto-optimize bids' },
        { target: 'campaign-bidding', type: 'integrates_with', desc: 'Automated campaign bidding logic drives rate adjustments' },
        { target: 'promoted-listings-advanced', type: 'related_to', desc: 'Advanced campaigns allow manual bidding as alternative approach' },
      ];
      break;

    case 'billpoint':
      newRels = [
        { target: 'payments', type: 'depends_on', desc: 'Legacy payment product under Payments umbrella' },
        { target: 'managed-payments', type: 'related_to', desc: 'Billpoint is a precursor to eBay\'s managed payments infrastructure' },
        { target: 'paypal', type: 'replaced_by', year: 2003, desc: 'Phased out after PayPal acquisition in 2003' },
        { target: 'checkout', type: 'integrates_with', desc: 'Billpoint was integrated into checkout flow during active period' },
      ];
      break;

    case 'butterfield-butterfield':
      newRels = [
        { target: 'auction', type: 'related_to', desc: 'Traditional auction house acquired to expand eBay\'s high-end auction presence' },
        { target: 'collectibles-trading', type: 'related_to', desc: 'Art and antiques aligned with collectibles category expansion' },
        { target: 'fine-art', type: 'related_to', desc: 'Art auction house directly related to fine art vertical' },
      ];
      break;

    case 'comc':
      newRels = [
        { target: 'collectibles', type: 'integrates_with', desc: 'COMC partnership strengthens collectibles category ecosystem' },
        { target: 'trading-card-authentication', type: 'integrates_with', desc: 'COMC manages 100M+ cards alongside authentication services' },
        { target: 'tcgplayer', type: 'related_to', desc: 'Both are collectible card partnerships within eBay ecosystem' },
        { target: 'authenticity-guarantee-trading-cards', type: 'related_to', desc: 'Card condition and authentication intersects with AG trading cards program' },
        { target: 'collectibles-trading', type: 'integrates_with', desc: 'Aligns with eBay\'s collectibles and trading card vertical strategy' },
      ];
      break;

    case 'circular-fashion-innovator-of-the-year':
      newRels = [
        { target: 'circular-fashion-fund', type: 'depends_on', desc: 'Special $300K prize awarded within Circular Fashion Fund program' },
        { target: 'sustainability', type: 'integrates_with', desc: 'Recognizes sustainability innovation in fashion resale' },
        { target: 'impact', type: 'integrates_with', desc: 'Part of eBay\'s impact programs umbrella' },
        { target: 'ebay-for-charity', type: 'related_to', desc: 'Both sit within eBay\'s broader social impact portfolio' },
        { target: 'fashion-luxury', type: 'related_to', desc: 'Award targets innovation in fashion and luxury resale sector' },
      ];
      break;

    case 'critical-path-software':
      newRels = [
        { target: 'ebay-mobile-app', type: 'related_to', desc: 'Talent acquisition to support mobile app development strategy' },
        { target: 'ebay-mobile-app-android', type: 'related_to', desc: 'Mobile expertise fed Android app development era' },
        { target: 'developer', type: 'related_to', desc: 'Mobile strategy expertise relevant to developer platform' },
      ];
      break;

    case 'electronic-travel-auction':
      newRels = [
        { target: 'auction', type: 'integrates_with', desc: 'Used eBay SmartMarket auction technology under license' },
        { target: 'smartmarket-technology', type: 'depends_on', desc: 'First licensing partner for SmartMarket Technology in 1996' },
        { target: 'developer', type: 'related_to', desc: 'Early proof of eBay platform licensing model for third parties' },
      ];
      break;

    case 'gsi-commerce-ebay-enterprise':
      newRels = [
        { target: 'xcommerce', type: 'related_to', desc: 'GSI Commerce was a key component of the X.commerce platform era' },
        { target: 'magento', type: 'related_to', desc: 'Both were part of eBay\'s enterprise commerce technology portfolio' },
        { target: 'developer', type: 'related_to', desc: 'Enterprise e-commerce services for developer/merchant ecosystem' },
      ];
      break;

    case 'knownorigin':
      newRels = [
        { target: 'collectibles', type: 'integrates_with', desc: 'NFT marketplace within eBay\'s digital collectibles ecosystem' },
        { target: 'collectibles-trading', type: 'integrates_with', desc: 'Extends collectibles umbrella into digital art' },
        { target: 'ebay-vault', type: 'related_to', desc: 'Both enable high-value item custody and provenance tracking' },
        { target: 'authenticity-guarantee', type: 'related_to', desc: 'Blockchain provenance parallels Authenticity Guarantee for physical items' },
      ];
      break;

    case 'kruse-international':
      newRels = [
        { target: 'ebay-motors', type: 'related_to', desc: 'Automobile auctioneer acquisition that launched eBay Motors category' },
        { target: 'auction', type: 'integrates_with', desc: 'Traditional auto auction model influenced eBay auction format for vehicles' },
        { target: 'vehicle-purchase-protection', type: 'related_to', desc: 'Kruse\'s vehicle sales pioneered trust needs now addressed by Vehicle Purchase Protection' },
      ];
      break;

    case 'mymix-fashion-campaign':
      newRels = [
        { target: 'fashion-luxury', type: 'related_to', desc: 'UK fashion campaign within fashion vertical expansion' },
        { target: 'ebay-uk', type: 'integrates_with', desc: 'UK-specific marketing campaign on eBay UK platform' },
        { target: 'events-campaigns', type: 'depends_on', desc: 'Campaign under the events and campaigns umbrella' },
      ];
      break;

    case 'magento':
      newRels = [
        { target: 'xcommerce', type: 'integrates_with', desc: 'Core component of X.commerce unified developer ecosystem' },
        { target: 'developer', type: 'depends_on', desc: 'E-commerce platform within developer umbrella' },
        { target: 'gsi-commerce-ebay-enterprise', type: 'related_to', desc: 'Both were enterprise commerce pillars in the X.commerce era' },
        { target: 'merchant-integration-platform', type: 'related_to', desc: 'Magento preceded MIP as eBay\'s merchant tech offering' },
      ];
      break;

    case 'magical-bulk-listing-tool':
      newRels = [
        { target: 'magical-listing', type: 'related_to', desc: 'Bulk extension of the Magical Listing Tool for high-volume sellers' },
        { target: 'listing-tools', type: 'depends_on', desc: 'Part of listing tools umbrella' },
        { target: 'bulk-listing-tool', type: 'related_to', desc: 'AI-powered evolution of the traditional bulk listing tool' },
        { target: 'selling-with-ai', type: 'integrates_with', desc: 'Leverages AI for batch item description and categorization' },
        { target: 'seller-hub', type: 'integrates_with', desc: 'Accessible via Seller Hub listing tools' },
      ];
      break;

    case 'mission-fish-seller-account':
      newRels = [
        { target: 'ebay-for-charity', type: 'replaced_by', year: 2015, desc: 'Mission Fish Seller Account retired 2015 as eBay for Charity framework took over' },
        { target: 'ebay-for-charity', type: 'related_to', desc: 'Part of eBay\'s charity seller infrastructure, predecessor to eBay for Charity framework' },
        { target: 'charity', type: 'depends_on', desc: 'Under Charity umbrella' },
        { target: 'impact', type: 'integrates_with', desc: 'Impact-focused charity seller account program' },
      ];
      break;

    case 'paypal-spinoff':
      newRels = [
        { target: 'managed-payments', type: 'related_to', year: 2015, desc: 'PayPal spinoff enabled eBay to build its own Managed Payments infrastructure' },
        { target: 'payments', type: 'related_to', desc: 'Corporate separation directly shaped eBay\'s payments strategy' },
        { target: 'paypal', type: 'related_to', desc: 'PayPal Spinoff is the corporate event that separated PayPal from eBay' },
      ];
      break;

    case 'safeharbor':
      newRels = [
        { target: 'trust', type: 'depends_on', desc: 'Early trust and safety program launched 1999' },
        { target: 'resolution-center-multi-market', type: 'related_to', desc: 'SafeHarbor is a precursor to modern Resolution Center functionality' },
        { target: 'trust-safety', type: 'related_to', desc: 'SafeHarbor is the ancestor of the Trust & Safety umbrella' },
        { target: 'vero-program', type: 'related_to', desc: 'Both are trust enforcement programs; VeRO succeeded SafeHarbor scope' },
      ];
      break;

    case 'shoprunner':
      newRels = [
        { target: 'shipping', type: 'related_to', desc: 'Premium shipping service acquired as part of GSI Commerce portfolio' },
        { target: 'gsi-commerce-ebay-enterprise', type: 'depends_on', desc: 'Part of GSI Commerce acquisition in 2011' },
        { target: 'ebay-guaranteed-delivery', type: 'related_to', desc: 'ShopRunner premium delivery experiment predated eBay Guaranteed Delivery program' },
      ];
      break;

    case 'smartmarket-technology':
      newRels = [
        { target: 'auction', type: 'integrates_with', desc: 'SmartMarket Technology powered eBay\'s original auction platform' },
        { target: 'electronic-travel-auction', type: 'related_to', desc: 'First third-party licensing deal used SmartMarket Technology' },
        { target: 'developer', type: 'related_to', desc: 'Internal technology platform licensed as developer product' },
      ];
      break;

    case 'tcgplayer-authentication-center':
      newRels = [
        { target: 'tcgplayer', type: 'depends_on', desc: 'Operates as authentication service within TCGplayer platform' },
        { target: 'authenticity-guarantee', type: 'integrates_with', desc: 'Integrated with eBay\'s broader Authenticity Guarantee ecosystem' },
        { target: 'authenticity-guarantee-trading-cards', type: 'related_to', desc: 'Trading card authentication variant of AG program' },
        { target: 'authentication', type: 'depends_on', desc: 'Part of Authentication umbrella' },
        { target: 'trading-card-authentication', type: 'related_to', desc: 'Both authenticate trading cards; TCGplayer center is the platform-specific instance' },
      ];
      break;

    case 'tcgplayer-marketplace':
      newRels = [
        { target: 'tcgplayer', type: 'depends_on', desc: 'Primary marketplace platform within TCGplayer' },
        { target: 'collectibles', type: 'integrates_with', desc: 'Trading card buying/selling within eBay collectibles ecosystem' },
        { target: 'tcgplayer-authentication-center', type: 'integrates_with', desc: 'Marketplace listings link to authentication verification' },
        { target: 'collectibles-trading', type: 'integrates_with', desc: 'Serves trading card community within collectibles umbrella' },
      ];
      break;

    case 'techstars-future-of-ecommerce':
      newRels = [
        { target: 'developer', type: 'depends_on', desc: 'Accelerator for startups building e-commerce solutions on eBay platform' },
        { target: 'developer-platform', type: 'integrates_with', desc: 'Accelerator participants integrate with eBay Developer Platform' },
        { target: 'ebay-developers-program', type: 'integrates_with', desc: 'Participants feed into eBay Developers Program ecosystem' },
        { target: 'ebay-partner-network', type: 'related_to', desc: 'Graduates may become eBay Partner Network affiliates' },
      ];
      break;

    case 'things-people-love':
      newRels = [
        { target: 'marketing', type: 'depends_on', desc: 'Campaign/brand strategy under Marketing umbrella' },
        { target: 'ebay-playbook', type: 'integrates_with', desc: 'Things.People.Love is the creative platform within eBay Playbook brand system' },
        { target: 'events-campaigns', type: 'integrates_with', desc: 'Part of eBay\'s events and campaigns umbrella' },
        { target: 'discovery-buyer-experience', type: 'related_to', desc: 'Campaign messaging supports buyer discovery positioning' },
      ];
      break;

    case 'tise':
      newRels = [
        { target: 'fashion-luxury', type: 'integrates_with', desc: 'Secondhand fashion marketplace extends eBay\'s fashion vertical' },
        { target: 'sustainability', type: 'integrates_with', desc: 'C2C resale platform aligns with eBay sustainability strategy' },
        { target: 'circular-fashion-fund', type: 'related_to', desc: 'Both support circular fashion economy goals' },
        { target: 'international', type: 'integrates_with', desc: 'Norwegian/EU market acquisition expanding eBay international footprint' },
        { target: 'ebay-plus', type: 'related_to', desc: 'Both serve European market buyer experience' },
      ];
      break;

    case 'twice-acquisition':
      newRels = [
        { target: 'ebay-valet', type: 'integrates_with', desc: 'Twice was acquired and integrated into eBay Valet fashion consignment service' },
        { target: 'fashion-luxury', type: 'related_to', desc: 'Clothing resale startup for fashion category expansion' },
        { target: 'sustainability', type: 'related_to', desc: 'Resale/recommerce model aligned with sustainability goals' },
      ];
      break;

    case 'up4sale':
      newRels = [
        { target: 'auction', type: 'related_to', desc: 'Trading site acquisition during early eBay category expansion era' },
        { target: 'collectibles-trading', type: 'related_to', desc: 'Early trading platform aligned with collectibles/trading focus' },
        { target: 'ebay', type: 'related_to', desc: 'One of eBay\'s earliest acquisitions expanding marketplace reach in 1998' },
      ];
      break;

    case 'xcommerce':
      newRels = [
        { target: 'developer', type: 'depends_on', desc: 'Unified developer ecosystem under Developer umbrella' },
        { target: 'magento', type: 'integrates_with', desc: 'Magento was a core component of X.commerce platform' },
        { target: 'gsi-commerce-ebay-enterprise', type: 'integrates_with', desc: 'GSI Commerce capabilities were integrated into X.commerce' },
        { target: 'developer-platform', type: 'related_to', desc: 'X.commerce was the predecessor open commerce developer platform' },
        { target: 'merchant-integration-platform', type: 'related_to', desc: 'MIP evolved from the merchant integration approach of X.commerce' },
      ];
      break;

    case 'you-cant-fake-fashion-campaign':
      newRels = [
        { target: 'fashion-luxury', type: 'integrates_with', desc: 'Major fashion authenticity campaign within fashion vertical' },
        { target: 'authenticity-guarantee', type: 'related_to', desc: 'Precursor to formal Authenticity Guarantee program in fashion' },
        { target: 'trust', type: 'integrates_with', desc: 'Campaign built buyer trust for fashion purchases on eBay' },
      ];
      break;

    case 'zong-mobile-payments':
      newRels = [
        { target: 'payments', type: 'depends_on', desc: 'Mobile carrier billing payment method under Payments umbrella' },
        { target: 'xcommerce', type: 'integrates_with', desc: 'Part of X.commerce mobile payments initiative' },
        { target: 'managed-payments', type: 'related_to', desc: 'Early mobile payment experiment preceding Managed Payments era' },
      ];
      break;

    case 'ebay-4-0-mobile-app':
      newRels = [
        { target: 'ebay-mobile-app', type: 'related_to', desc: 'Major version milestone in eBay\'s mobile app evolution' },
        { target: 'ebay-mobile-app-android', type: 'related_to', desc: '4.0 version launched across both iOS and Android platforms' },
        { target: 'mobile-checkout', type: 'integrates_with', desc: '4.0 app introduced enhanced mobile checkout capabilities' },
      ];
      break;

    case 'ebay-fashion-app':
      newRels = [
        { target: 'fashion-luxury', type: 'integrates_with', desc: 'Vertical-specific mobile app for fashion category' },
        { target: 'ebay-mobile-app', type: 'related_to', desc: 'Separate app later consolidated into flagship eBay mobile app' },
        { target: 'ebay-moda-latin-america', type: 'related_to', desc: 'eBay Moda LATAM was a sibling regional fashion app in same era' },
      ];
      break;

    case 'ebay-innovate-developer-conference':
      newRels = [
        { target: 'developer', type: 'depends_on', desc: 'Annual developer conference under Developer umbrella' },
        { target: 'xcommerce', type: 'integrates_with', desc: 'X.commerce platform announced at eBay Innovate 2011' },
        { target: 'developer-platform', type: 'integrates_with', desc: 'Predecessor to eBay Open developer conference series' },
        { target: 'ebay-developers-program', type: 'integrates_with', desc: 'Conference served eBay Developers Program community' },
      ];
      break;

    case 'ebay-milo':
      newRels = [
        { target: 'ebay-redlaser', type: 'integrates_with', desc: 'eBay Milo local shopping data integrated into RedLaser barcode scanner' },
        { target: 'in-store-pickup', type: 'related_to', desc: 'Milo enabled local store inventory lookup, precursor to in-store pickup' },
        { target: 'local-pickup', type: 'related_to', desc: 'Milo\'s local retail data supported local pickup commerce' },
      ];
      break;

    case 'ebay-mobile-app-android':
      newRels = [
        { target: 'ebay-mobile-app', type: 'integrates_with', desc: 'Android variant of the core eBay Mobile App platform' },
        { target: 'mobile-checkout', type: 'integrates_with', desc: 'Android app includes mobile checkout flow' },
        { target: 'find-it-on-ebay', type: 'integrates_with', desc: 'Find It On eBay image search launched on Android' },
        { target: 'push-notifications', type: 'integrates_with', desc: 'Android app delivers push notifications for watchlist and orders' },
      ];
      break;

    case 'ebay-moda-latin-america':
      newRels = [
        { target: 'fashion-luxury', type: 'integrates_with', desc: 'Regional fashion app for LATAM market' },
        { target: 'international', type: 'integrates_with', desc: 'Localized shopping experience for MX, BR, AR markets' },
        { target: 'ebay-mobile-app', type: 'related_to', desc: 'Separate regional app before consolidation into flagship app' },
      ];
      break;

    case 'ebay-now':
      newRels = [
        { target: 'local-pickup', type: 'related_to', desc: 'eBay Now same-day delivery was discontinued; local pickup became the successor approach for fast local commerce' },
        { target: 'shipping', type: 'depends_on', desc: 'Same-day delivery service under Shipping umbrella' },
        { target: 'managed-delivery', type: 'related_to', desc: 'eBay Now\'s rapid fulfillment goals later influenced eBay Managed Delivery program' },
        { target: 'shipping', type: 'related_to', year: 2012, desc: 'Legacy same-day delivery program; discontinued 2015' },
      ];
      break;

    case 'ebay-playbook':
      newRels = [
        { target: 'marketing', type: 'depends_on', desc: 'Brand guide under Marketing umbrella' },
        { target: 'things-people-love', type: 'integrates_with', desc: 'eBay Playbook contains Things.People.Love creative platform guidelines' },
        { target: 'ebay', type: 'integrates_with', desc: 'Establishes unified brand standards for the eBay masterbrand' },
        { target: 'events-campaigns', type: 'integrates_with', desc: 'Campaign teams use Playbook for execution consistency' },
      ];
      break;

    case 'ebay-redlaser':
      newRels = [
        { target: 'barcode-scanner', type: 'related_to', desc: 'RedLaser was the original barcode scanning app, capability became Barcode Scanner feature' },
        { target: 'ebay-milo', type: 'integrates_with', desc: 'RedLaser integrated eBay Milo local store inventory data' },
        { target: 'find-it-on-ebay', type: 'related_to', desc: 'Both enable product search via camera/scan rather than text' },
        { target: 'image-search', type: 'related_to', desc: 'RedLaser barcode approach predated visual image search' },
      ];
      break;

    case 'ebay-valet':
      newRels = [
        { target: 'twice-acquisition', type: 'integrates_with', desc: 'Twice clothing resale startup was acquired and integrated into eBay Valet' },
        { target: 'fashion-luxury', type: 'integrates_with', desc: 'Valet service included fashion consignment category' },
        { target: 'ebay-consignment', type: 'related_to', desc: 'eBay Valet is the predecessor to modern eBay Consignment program' },
        { target: 'services', type: 'depends_on', desc: 'Consignment service under Services umbrella' },
      ];
      break;

    case 'fashion':
      newRels = [
        { target: 'fashion-luxury', type: 'integrates_with', year: 2017, desc: 'Fashion umbrella is the parent of the fashion-luxury category' },
        { target: 'authenticity-guarantee', type: 'integrates_with', year: 2017, desc: 'AG programs authenticate high-value fashion items' },
        { target: 'shop-the-look', type: 'integrates_with', year: 2024, desc: 'Shop the Look is a fashion-specific discovery experience' },
        { target: 'ebay-consignment', type: 'integrates_with', year: 2021, desc: 'Consignment program serves the fashion and luxury segment' },
        { target: 'ag-designer-fashion-de', type: 'integrates_with', year: 2024, desc: 'German designer fashion authentication under fashion umbrella' },
        { target: 'ebay-authenticate-handbags', type: 'integrates_with', year: 2017, desc: 'eBay Authenticate for handbags is a core fashion program' },
      ];
      break;

    case 'motors':
      newRels = [
        { target: 'ebay-motors', type: 'integrates_with', year: 2000, desc: 'Motors umbrella governs the eBay Motors vertical' },
        { target: 'secure-purchase', type: 'integrates_with', year: 2023, desc: 'Secure Purchase is a Motors-specific trust program' },
        { target: 'sgs-vehicle-inspections', type: 'integrates_with', year: 2015, desc: 'SGS Vehicle Inspections is a Motors trust program' },
        { target: 'escrow-com', type: 'integrates_with', year: 2004, desc: 'Escrow.com provides secure payment escrow for vehicle transactions' },
        { target: 'vehicle-purchase-protection', type: 'integrates_with', year: 2015, desc: 'Vehicle Purchase Protection is a core Motors buyer program' },
        { target: 'trust', type: 'integrates_with', year: 2000, desc: 'Motors depends on trust infrastructure for high-value transactions' },
      ];
      break;

    case 'vault':
      newRels = [
        { target: 'authenticity-guarantee', type: 'integrates_with', year: 2022, desc: 'Vault items must pass authentication before storage' },
        { target: 'authenticity-guarantee-sneakers', type: 'integrates_with', year: 2022, desc: 'Sneakers authenticated via AG can be stored in Vault' },
        { target: 'authenticity-guarantee-handbags', type: 'integrates_with', year: 2022, desc: 'Handbags authenticated via AG can be stored in Vault' },
        { target: 'authenticity-guarantee-watches', type: 'integrates_with', year: 2022, desc: 'Watches authenticated via AG can be stored in Vault' },
        { target: 'authenticity-guarantee-jewelry', type: 'integrates_with', year: 2022, desc: 'Jewelry authenticated via AG can be stored in Vault' },
        { target: 'collectibles', type: 'integrates_with', year: 2022, desc: 'Collectibles Vault extends the collectibles trading ecosystem' },
        { target: 'ebay-vault', type: 'integrates_with', year: 2022, desc: 'eBay Vault is the named product for this program' },
        { target: 'my-collection', type: 'integrates_with', year: 2022, desc: 'My Collection feature tracks items in the Vault' },
      ];
      break;

    case 'secure-purchase':
      newRels = [
        { target: 'ebay-motors', type: 'integrates_with', year: 2023, desc: 'Secure Purchase is eBay Motors\' end-to-end transaction service' },
        { target: 'trust', type: 'depends_on', year: 2023, desc: 'Secure Purchase is built on eBay\'s trust infrastructure' },
        { target: 'vehicle-purchase-protection', type: 'integrates_with', year: 2023, desc: 'Includes up to $100K Vehicle Purchase Protection' },
        { target: 'escrow-com', type: 'competes_with', year: 2023, desc: 'Both secure vehicle transactions, Secure Purchase is eBay\'s proprietary solution' },
        { target: 'payments', type: 'depends_on', year: 2023, desc: 'Routes payments and financing through eBay payments infrastructure' },
        { target: 'motors', type: 'depends_on', year: 2023, desc: 'Part of the Motors umbrella cluster' },
      ];
      break;

    case 'sgs-vehicle-inspections':
      newRels = [
        { target: 'ebay-motors', type: 'integrates_with', year: 2015, desc: 'SGS inspections give Motors buyers confidence in vehicle condition' },
        { target: 'trust', type: 'integrates_with', year: 2015, desc: 'Third-party inspection is a key trust signal for vehicle buyers' },
        { target: 'vehicle-purchase-protection', type: 'integrates_with', year: 2015, desc: 'Inspection results inform Vehicle Purchase Protection eligibility' },
        { target: 'motors', type: 'depends_on', year: 2015, desc: 'Part of the Motors umbrella cluster' },
        { target: 'secure-purchase', type: 'integrates_with', year: 2023, desc: 'Inspection can be combined with Secure Purchase for full buyer assurance' },
      ];
      break;

    case 'escrow-com':
      newRels = [
        { target: 'ebay-motors', type: 'integrates_with', year: 2004, desc: 'Escrow.com provides third-party fund holding for vehicle transactions' },
        { target: 'trust', type: 'integrates_with', year: 2004, desc: 'Escrow acts as neutral third party, reinforcing transaction trust' },
        { target: 'payments', type: 'integrates_with', year: 2004, desc: 'Escrow routes through payments but holds funds until inspection complete' },
        { target: 'secure-purchase', type: 'competes_with', year: 2023, desc: 'Secure Purchase is eBay\'s proprietary alternative to Escrow.com' },
        { target: 'motors', type: 'depends_on', year: 2004, desc: 'Part of the Motors umbrella cluster' },
      ];
      break;

    case 'ebay-consignment':
      newRels = [
        { target: 'fashion', type: 'integrates_with', year: 2021, desc: 'Consignment program targets fashion and luxury goods sellers' },
        { target: 'authenticity-guarantee', type: 'integrates_with', year: 2021, desc: 'Consigned designer items go through AG authentication' },
        { target: 'authenticity-guarantee-handbags', type: 'integrates_with', year: 2021, desc: 'Handbag authentication is integral to consignment service' },
        { target: 'ebay-authenticate-handbags', type: 'integrates_with', year: 2021, desc: 'Authenticate for Handbags supports the consignment verification process' },
        { target: 'listing-tools', type: 'depends_on', year: 2021, desc: 'Partner photographs and lists items using eBay listing tools' },
      ];
      break;

    case 'ag-designer-fashion-de':
      newRels = [
        { target: 'authenticity-guarantee', type: 'depends_on', year: 2024, desc: 'German designer fashion AG sub-program depends on AG infrastructure' },
        { target: 'authentication', type: 'depends_on', year: 2024, desc: 'Depends on Authentication umbrella for verification services' },
        { target: 'fashion', type: 'integrates_with', year: 2024, desc: 'Covers designer clothing and accessories in the fashion category' },
        { target: 'trust', type: 'integrates_with', year: 2024, desc: 'Authentication check provides buyer trust signal' },
        { target: 'ebay-germany', type: 'integrates_with', year: 2024, desc: 'Germany-market program on eBay Germany platform' },
      ];
      break;

    case 'ebay-seller-capital':
      newRels = [
        { target: 'seller-tools', type: 'depends_on', year: 2020, desc: 'Seller Capital lives under the seller-tools parent' },
        { target: 'managed-payments', type: 'integrates_with', year: 2020, desc: 'Repayment deducted from eBay Managed Payments payouts' },
        { target: 'payments', type: 'integrates_with', year: 2020, desc: 'Closely tied to payments ecosystem for repayment' },
        { target: 'business-cash-advance', type: 'integrates_with', year: 2020, desc: 'Business Cash Advance is a product within Seller Capital' },
        { target: 'flexible-cash-advance', type: 'integrates_with', year: 2020, desc: 'Flexible Cash Advance is a product within Seller Capital' },
        { target: 'seller-capital-term-loan', type: 'integrates_with', year: 2020, desc: 'Term Loan is a product within Seller Capital' },
        { target: 'seller-hub', type: 'integrates_with', year: 2020, desc: 'Seller Capital is accessed and managed through Seller Hub' },
      ];
      break;

    case 'business-cash-advance':
      newRels = [
        { target: 'ebay-seller-capital', type: 'depends_on', year: 2020, desc: 'Business Cash Advance is a sub-product of eBay Seller Capital' },
        { target: 'managed-payments', type: 'depends_on', year: 2020, desc: 'Repayment deducted automatically from Managed Payments payouts' },
        { target: 'flexible-cash-advance', type: 'competes_with', year: 2020, desc: 'Alternative financing option within the same Seller Capital suite' },
        { target: 'seller-capital-term-loan', type: 'competes_with', year: 2020, desc: 'Alternative financing option within the same Seller Capital suite' },
      ];
      break;

    case 'flexible-cash-advance':
      newRels = [
        { target: 'ebay-seller-capital', type: 'depends_on', year: 2020, desc: 'Flexible Cash Advance is a sub-product of eBay Seller Capital' },
        { target: 'managed-payments', type: 'depends_on', year: 2020, desc: 'Repayment deducted automatically from Managed Payments payouts' },
        { target: 'business-cash-advance', type: 'competes_with', year: 2020, desc: 'Alternative lump-sum financing within the same Seller Capital suite' },
        { target: 'seller-capital-term-loan', type: 'competes_with', year: 2020, desc: 'Alternative financing option within the same Seller Capital suite' },
      ];
      break;

    case 'seller-capital-term-loan':
      newRels = [
        { target: 'ebay-seller-capital', type: 'depends_on', year: 2020, desc: 'Term Loan is a sub-product of eBay Seller Capital' },
        { target: 'managed-payments', type: 'integrates_with', year: 2020, desc: 'Accessed through sellers who use Managed Payments' },
        { target: 'business-cash-advance', type: 'competes_with', year: 2020, desc: 'Alternative financing within Seller Capital suite' },
        { target: 'flexible-cash-advance', type: 'competes_with', year: 2020, desc: 'Alternative financing within Seller Capital suite' },
      ];
      break;

    case 'ai-generated-backgrounds':
      newRels = [
        { target: 'listing-tools', type: 'depends_on', year: 2024, desc: 'AI Generated Backgrounds is a listing-tools feature' },
        { target: 'seller-hub', type: 'integrates_with', year: 2024, desc: 'Available through Seller Hub listing workflow' },
        { target: 'ai-description-generator', type: 'related_to', year: 2024, desc: 'Both are AI-powered listing enhancement tools launched together' },
        { target: 'magical-listing', type: 'integrates_with', year: 2024, desc: 'Part of the AI-assisted magical listing experience' },
        { target: 'photo-enhancement', type: 'related_to', year: 2024, desc: 'AI backgrounds build on existing photo enhancement capabilities' },
      ];
      break;

    case 'ai-description-generator':
      newRels = [
        { target: 'listing-tools', type: 'depends_on', year: 2024, desc: 'AI Description Generator is a listing-tools feature' },
        { target: 'seller-hub', type: 'integrates_with', year: 2024, desc: 'Available through Seller Hub listing workflow' },
        { target: 'ai-generated-backgrounds', type: 'related_to', year: 2024, desc: 'Both are AI-powered listing enhancement tools launched together' },
        { target: 'magical-listing', type: 'integrates_with', year: 2024, desc: 'Part of the AI-assisted magical listing experience' },
        { target: 'inventory-mapping-api', type: 'related_to', year: 2024, desc: 'Both use AI to generate or enhance listing content' },
      ];
      break;

    case 'ebay-foundation':
      newRels = [
        { target: 'impact', type: 'depends_on', year: 1998, desc: 'eBay Foundation is the philanthropic arm of the Impact umbrella' },
        { target: 'ebay-for-charity', type: 'integrates_with', year: 2003, desc: 'eBay for Charity routes funds to nonprofits supported by the Foundation' },
        { target: 'global-give', type: 'integrates_with', year: 2020, desc: 'Global Give is an eBay Foundation-run annual grant program' },
        { target: 'charity', type: 'integrates_with', year: 2003, desc: 'Foundation underpins the Charity umbrella\'s mission' },
        { target: 'ebay-impact-report', type: 'integrates_with', year: 2022, desc: 'Foundation\'s work is reported in the annual Impact Report' },
      ];
      break;

    case 'global-give':
      newRels = [
        { target: 'ebay-foundation', type: 'depends_on', year: 2020, desc: 'Global Give is run by the eBay Foundation' },
        { target: 'impact', type: 'integrates_with', year: 2020, desc: 'Global Give is a core program within the Impact umbrella' },
        { target: 'ebay-for-charity', type: 'related_to', year: 2020, desc: 'Both focus on charitable giving, Global Give targets nonprofits directly' },
      ];
      break;

    case 'ebay-impact-report':
      newRels = [
        { target: 'impact', type: 'depends_on', year: 2022, desc: 'Impact Report is the annual publication of the Impact umbrella' },
        { target: 'recommerce-report', type: 'related_to', year: 2022, desc: 'Recommerce Report is a companion publication covering sustainability' },
        { target: 'small-business-report', type: 'related_to', year: 2022, desc: 'Small Business Report complements Impact Report on economic impact' },
        { target: 'ebay-foundation', type: 'integrates_with', year: 2022, desc: 'Foundation activities are featured prominently in the Impact Report' },
      ];
      break;

    case 'recommerce-report':
      newRels = [
        { target: 'impact', type: 'depends_on', year: 2020, desc: 'Recommerce Report is an Impact umbrella publication' },
        { target: 'ebay-impact-report', type: 'related_to', year: 2022, desc: 'Companion publication to the broader eBay Impact Report' },
        { target: 'sustainability', type: 'integrates_with', year: 2020, desc: 'Tracks sustainability impact of recommerce and secondhand shopping' },
        { target: 'fashion', type: 'related_to', year: 2020, desc: 'Fashion is a key secondhand category covered in the report' },
      ];
      break;

    case 'small-business-report':
      newRels = [
        { target: 'impact', type: 'depends_on', year: 2022, desc: 'Small Business Report is an Impact umbrella publication' },
        { target: 'ebay-impact-report', type: 'related_to', year: 2022, desc: 'Companion publication to the broader eBay Impact Report' },
        { target: 'seller-tools', type: 'related_to', year: 2022, desc: 'Covers seller success enabled by eBay\'s seller tools ecosystem' },
        { target: 'community', type: 'related_to', year: 2022, desc: 'Surveys seller communities across key markets' },
      ];
      break;

    case 'free-4-day-shipping-badge':
      newRels = [
        { target: 'shipping', type: 'depends_on', year: 2024, desc: 'Badge signals the Free 4-Day Shipping service' },
        { target: 'free-4-day-shipping', type: 'integrates_with', year: 2024, desc: 'Badge is the visual trust signal for the Free 4-Day Shipping feature' },
        { target: 'trust', type: 'integrates_with', year: 2024, desc: 'Shipping badge is a buyer trust signal on listing pages' },
        { target: 'top-rated-plus', type: 'related_to', year: 2024, desc: 'Both are trust badges displayed on listings to build buyer confidence' },
      ];
      break;

    case 'sourcing-insights':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2021, desc: 'Sourcing Insights is a Seller Hub analytics feature' },
        { target: 'product-research', type: 'related_to', year: 2021, desc: 'Product Research is a companion tool covering historical sales data' },
        { target: 'listing-quality-report', type: 'related_to', year: 2021, desc: 'Both are seller analytics tools in Seller Hub' },
        { target: 'traffic-report', type: 'related_to', year: 2021, desc: 'Traffic Report provides demand-side data to complement sourcing strategy' },
      ];
      break;

    case 'store-traffic-report':
      newRels = [
        { target: 'stores', type: 'depends_on', year: 2023, desc: 'Store Traffic Report is a stores-specific analytics feature' },
        { target: 'ebay-stores', type: 'integrates_with', year: 2023, desc: 'Available to eBay Store subscribers' },
        { target: 'traffic-report', type: 'related_to', year: 2023, desc: 'Traffic Report covers listing-level traffic, Store Traffic covers store-level' },
        { target: 'promoted-stores', type: 'integrates_with', year: 2023, desc: 'Tracks paid traffic from Promoted Stores campaigns' },
      ];
      break;

    case 'service-metrics-dashboard':
      newRels = [
        { target: 'seller-performance-standards', type: 'depends_on', year: 2012, desc: 'Service Metrics Dashboard is a sub-component of Seller Performance Standards' },
        { target: 'seller-hub', type: 'integrates_with', year: 2016, desc: 'Accessible through Seller Hub' },
        { target: 'trust', type: 'integrates_with', year: 2012, desc: 'Monitors item-not-received and item-not-as-described rates to maintain trust' },
        { target: 'returns', type: 'integrates_with', year: 2012, desc: 'Item-not-as-described rate connects to returns performance' },
      ];
      break;

    case 'advertising-dashboard':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2024, desc: 'Advertising Dashboard is a Seller Hub feature' },
        { target: 'promoted-listings', type: 'integrates_with', year: 2024, desc: 'Manages Promoted Listings campaigns from a central hub' },
        { target: 'bulk-campaign-management', type: 'integrates_with', year: 2024, desc: 'Bulk Campaign Management is a feature within the Advertising Dashboard' },
        { target: 'offsite-ads', type: 'integrates_with', year: 2024, desc: 'Advertising Dashboard includes management of Offsite Ads campaigns' },
        { target: 'promoted-stores', type: 'integrates_with', year: 2024, desc: 'Promoted Stores campaigns are managed through the Advertising Dashboard' },
      ];
      break;

    case 'bulk-campaign-management':
      newRels = [
        { target: 'advertising-dashboard', type: 'depends_on', year: 2024, desc: 'Bulk Campaign Management lives within the Advertising Dashboard' },
        { target: 'promoted-listings-advanced', type: 'integrates_with', year: 2024, desc: 'Designed primarily for managing Promoted Listings Advanced priority campaigns' },
        { target: 'seller-hub', type: 'integrates_with', year: 2024, desc: 'Accessible through Seller Hub advertising section' },
      ];
      break;

    case 'ai-assistant-messaging':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2025, desc: 'AI Assistant for Messaging is a Seller Hub feature' },
        { target: 'offers-in-messaging', type: 'integrates_with', year: 2025, desc: 'Works alongside Offers in Messaging for streamlined buyer-seller communication' },
        { target: 'communication', type: 'integrates_with', year: 2025, desc: 'Enhances the seller communication workflow with AI assistance' },
        { target: 'best-offer', type: 'integrates_with', year: 2025, desc: 'AI recommendations can include offer-making actions' },
      ];
      break;

    case 'offers-in-messaging':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2025, desc: 'Offers in Messaging is a Seller Hub feature' },
        { target: 'ai-assistant-messaging', type: 'integrates_with', year: 2025, desc: 'Works alongside AI Messaging Assistant for integrated negotiation' },
        { target: 'best-offer', type: 'integrates_with', year: 2025, desc: 'Enables offer flow within messaging thread instead of via Best Offer separately' },
        { target: 'communication', type: 'integrates_with', year: 2025, desc: 'Extends the communication tools with offer capability' },
      ];
      break;

    case 'track-your-costs':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2025, desc: 'Track Your Costs is a Seller Hub analytics feature' },
        { target: 'product-research', type: 'related_to', year: 2025, desc: 'Product Research provides market pricing data to inform cost tracking' },
        { target: 'sourcing-insights', type: 'related_to', year: 2025, desc: 'Sourcing Insights identifies items to source, Track Your Costs tracks acquisition cost' },
        { target: 'managed-payments', type: 'integrates_with', year: 2025, desc: 'Cost data combines with Managed Payments payout data for profitability view' },
      ];
      break;

    case 'inventory-mapping-api':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2025, desc: 'Inventory Mapping API is a Seller Hub tool for bulk listers' },
        { target: 'listing-tools', type: 'integrates_with', year: 2025, desc: 'Turns existing product data into eBay-ready listings' },
        { target: 'ai-description-generator', type: 'related_to', year: 2025, desc: 'Both use AI to generate or enhance listing content' },
        { target: 'bulk-listing-tool', type: 'related_to', year: 2025, desc: 'Inventory Mapping API serves the same bulk listing use case via API' },
        { target: 'developer-platform', type: 'integrates_with', year: 2025, desc: 'API-based tool designed for developer/integration use cases' },
      ];
      break;

    case 'automated-feedback':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2025, desc: 'Automated Feedback is a Seller Hub feature' },
        { target: 'feedback-forum', type: 'integrates_with', year: 2025, desc: 'Automates positive feedback left through the Feedback Forum' },
        { target: 'trust', type: 'integrates_with', year: 2025, desc: 'Higher feedback volume reinforces seller trust signals' },
        { target: 'top-rated-seller', type: 'related_to', year: 2025, desc: 'Positive feedback rate contributes to Top Rated Seller status' },
      ];
      break;

    case 'watch-list-category-filters':
      newRels = [
        { target: 'watch-list', type: 'depends_on', year: 2025, desc: 'Category Filters are an extension of the Watch List feature' },
        { target: 'discovery', type: 'integrates_with', year: 2025, desc: 'Improves discovery organization within the Watch List' },
        { target: 'ebay-mobile-app', type: 'integrates_with', year: 2025, desc: 'Available on iOS mobile app as well as desktop' },
      ];
      break;

    case 'personalized-feed':
      newRels = [
        { target: 'discovery', type: 'depends_on', year: 2012, desc: 'Personalized Feed is a core discovery experience' },
        { target: 'product-recommendations', type: 'integrates_with', year: 2015, desc: 'AI-powered recommendations populate the personalized feed' },
        { target: 'saved-searches', type: 'integrates_with', year: 2012, desc: 'Saved Searches appear in the personalized feed' },
        { target: 'watch-list', type: 'integrates_with', year: 2012, desc: 'Watched items inform feed personalization' },
        { target: 'saved-sellers', type: 'integrates_with', year: 2012, desc: 'Saved seller activity surfaces in the feed' },
        { target: 'shop-the-look', type: 'integrates_with', year: 2024, desc: 'Shop the Look feeds fashion outfit recommendations into the experience' },
      ];
      break;

    case 'product-recommendations':
      newRels = [
        { target: 'discovery', type: 'depends_on', year: 2015, desc: 'Product Recommendations is a core discovery feature' },
        { target: 'personalized-feed', type: 'integrates_with', year: 2015, desc: 'Recommendations populate the personalized homepage feed' },
        { target: 'shop-the-look', type: 'integrates_with', year: 2024, desc: 'Shop the Look extends recommendations into fashion-specific outfit curation' },
        { target: 'ai-shopping-agent', type: 'integrates_with', year: 2025, desc: 'AI Shopping Agent uses recommendation signals to suggest items' },
        { target: 'ebay-mobile-app', type: 'integrates_with', year: 2015, desc: 'Recommendations are a prominent feature in the eBay mobile app experience' },
      ];
      break;

    case 'shop-the-look':
      newRels = [
        { target: 'fashion', type: 'depends_on', year: 2024, desc: 'Shop the Look is a fashion-specific discovery feature' },
        { target: 'discovery-buyer-experience', type: 'integrates_with', year: 2024, desc: 'Shop the Look is part of the discovery-buyer-experience platform' },
        { target: 'product-recommendations', type: 'integrates_with', year: 2024, desc: 'AI recommendations power the Shop the Look outfit suggestions' },
        { target: 'personalized-feed', type: 'integrates_with', year: 2024, desc: 'Shop the Look surfaces in the personalized homepage feed for fashion buyers' },
        { target: 'image-search', type: 'related_to', year: 2024, desc: 'Both use visual AI to enhance fashion discovery' },
        { target: 'authenticity-guarantee', type: 'integrates_with', year: 2024, desc: 'Fashion items surfaced via Shop the Look may carry AG authentication' },
        { target: 'ebay-mobile-app', type: 'integrates_with', year: 2024, desc: 'Shop the Look carousel is optimized for mobile app experience' },
      ];
      break;

    case 'ai-shopping-agent':
      newRels = [
        { target: 'discovery-buyer-experience', type: 'integrates_with', year: 2025, desc: 'Core integration; AI agent surfaces personalized results within discovery experience' },
        { target: 'product-recommendations', type: 'integrates_with', year: 2025, desc: 'Leverages recommendation engine to power conversational product suggestions' },
        { target: 'personalized-feed', type: 'integrates_with', year: 2025, desc: 'Agent draws on personalized feed signals for hyper-relevant recommendations' },
        { target: 'search', type: 'integrates_with', year: 2025, desc: 'Translates conversational queries into structured search requests' },
        { target: 'ebay-mobile-app', type: 'integrates_with', year: 2025, desc: 'Limited rollout delivered through eBay mobile app inline messaging' },
      ];
      break;

    case 'price-drop-notifications':
      newRels = [
        { target: 'watch-list', type: 'integrates_with', year: 2015, desc: 'Triggers notifications when prices drop on items in a buyer\'s watch list' },
        { target: 'discovery-buyer-experience', type: 'integrates_with', year: 2015, desc: 'Part of the broader buyer discovery and re-engagement loop' },
        { target: 'push-notifications', type: 'integrates_with', year: 2015, desc: 'Delivered via push notifications on mobile devices' },
        { target: 'saved-searches', type: 'integrates_with', year: 2015, desc: 'Can trigger alerts for price drops on items matching saved searches' },
        { target: 'notifications', type: 'depends_on', desc: 'Relies on notification infrastructure to deliver price alerts' },
      ];
      break;

    case 'ar-box-sizing':
      newRels = [
        { target: 'shipping', type: 'integrates_with', year: 2018, desc: 'Helps sellers select correct USPS box size before purchasing shipping label' },
        { target: 'ebay-mobile-app', type: 'integrates_with', year: 2018, desc: 'Android-only AR feature accessed via eBay mobile app' },
        { target: 'shipping-labels', type: 'related_to', year: 2018, desc: 'Informs box selection which feeds into label printing and shipping cost calculation' },
        { target: 'calculated-shipping', type: 'integrates_with', year: 2018, desc: 'Accurate box dimensions improve calculated shipping cost accuracy' },
      ];
      break;

    case 'api-sandbox':
      newRels = [
        { target: 'developer-platform', type: 'integrates_with', year: 2005, desc: 'Core component of developer platform providing safe testing environment' },
        { target: 'api-explorer', type: 'integrates_with', year: 2010, desc: 'API Explorer runs test calls against sandbox environment' },
        { target: 'developer', type: 'depends_on', desc: 'Used exclusively by developer community to prototype integrations' },
        { target: 'ebay-developers-program', type: 'integrates_with', year: 2005, desc: 'Sandbox access granted through eBay Developers Program membership' },
        { target: 'developer-loyalty-program', type: 'related_to', year: 2024, desc: 'Active sandbox users eligible for developer loyalty tier benefits' },
      ];
      break;

    case 'api-explorer':
      newRels = [
        { target: 'developer-platform', type: 'integrates_with', year: 2010, desc: 'Interactive console embedded within developer platform portal' },
        { target: 'api-sandbox', type: 'integrates_with', year: 2010, desc: 'Runs API calls against both sandbox and production environments' },
        { target: 'developer', type: 'depends_on', desc: 'Requires developer account; part of the developer umbrella' },
        { target: 'ebay-developers-program', type: 'integrates_with', year: 2010, desc: 'Available to all eBay Developers Program members' },
        { target: 'notification-api', type: 'related_to', year: 2015, desc: 'Notification API methods testable through API Explorer' },
      ];
      break;

    case 'notification-api':
      newRels = [
        { target: 'developer-platform', type: 'integrates_with', year: 2015, desc: 'Part of eBay developer API suite; enables push notification subscriptions for apps' },
        { target: 'push-notifications', type: 'integrates_with', year: 2015, desc: 'Powers push notification delivery to third-party application endpoints' },
        { target: 'api-sandbox', type: 'integrates_with', year: 2015, desc: 'Testable in sandbox environment before production deployment' },
        { target: 'developer', type: 'depends_on', desc: 'Developer account required to access notification API' },
      ];
      break;

    case 'buy-marketing-api':
      newRels = [
        { target: 'developer-platform', type: 'integrates_with', year: 2024, desc: 'Part of the Buy API family within eBay developer platform' },
        { target: 'product-recommendations', type: 'integrates_with', year: 2024, desc: 'getAlsoViewedByProduct and getAlsoBoughtByProduct power recommendation features' },
        { target: 'discovery-buyer-experience', type: 'integrates_with', year: 2024, desc: 'Enables third-party apps to surface eBay discovery and browse experiences' },
        { target: 'api-sandbox', type: 'integrates_with', year: 2024, desc: 'Available for testing in the API sandbox environment' },
      ];
      break;

    case 'catalog-api':
      newRels = [
        { target: 'developer-platform', type: 'integrates_with', year: 2018, desc: 'Part of eBay\'s core API suite for matching listings to catalog' },
        { target: 'listing-tools', type: 'integrates_with', year: 2018, desc: 'Used by listing tools to fetch product data and item specifics from eBay catalog' },
        { target: 'barcode-scanner', type: 'integrates_with', year: 2018, desc: 'Barcode scans resolve to catalog entries via Catalog API' },
        { target: 'item-specifics', type: 'integrates_with', year: 2018, desc: 'Catalog API returns structured item specifics for accurate listings' },
        { target: 'api-sandbox', type: 'integrates_with', year: 2018, desc: 'Testable in sandbox environment' },
      ];
      break;

    case 'klarna-pay-in-4':
      newRels = [
        { target: 'payments', type: 'depends_on', year: 2023, desc: 'Part of eBay managed payments checkout; BNPL option at checkout' },
        { target: 'managed-payments', type: 'integrates_with', year: 2023, desc: 'Offered as payment method within managed payments infrastructure' },
        { target: 'checkout', type: 'integrates_with', year: 2023, desc: 'Displayed as financing option at eBay checkout' },
        { target: 'klarna-financing', type: 'related_to', year: 2023, desc: 'Companion product from same BNPL provider; Pay in 4 for short term, Financing for longer term' },
        { target: 'sezzle-pay-in-4', type: 'competes_with', year: 2023, desc: 'Competing BNPL installment option at checkout' },
        { target: 'afterpay', type: 'competes_with', year: 2023, desc: 'Competing BNPL installment option at checkout' },
      ];
      break;

    case 'klarna-financing':
      newRels = [
        { target: 'payments', type: 'depends_on', year: 2023, desc: 'Extended financing option within eBay payments ecosystem' },
        { target: 'managed-payments', type: 'integrates_with', year: 2023, desc: 'Offered as payment method within managed payments infrastructure' },
        { target: 'checkout', type: 'integrates_with', year: 2023, desc: 'Displayed as financing option at eBay checkout' },
        { target: 'klarna-pay-in-4', type: 'related_to', year: 2023, desc: 'Companion short-term product from same provider' },
        { target: 'paypal-credit-6-month', type: 'competes_with', year: 2023, desc: 'Competing extended financing option at checkout' },
      ];
      break;

    case 'sezzle-pay-in-4':
      newRels = [
        { target: 'payments', type: 'depends_on', year: 2023, desc: 'BNPL installment option within eBay payments checkout' },
        { target: 'managed-payments', type: 'integrates_with', year: 2023, desc: 'Offered as payment method within managed payments infrastructure' },
        { target: 'checkout', type: 'integrates_with', year: 2023, desc: 'Displayed as BNPL option at eBay checkout' },
        { target: 'klarna-pay-in-4', type: 'competes_with', year: 2023, desc: 'Competing BNPL installment option at checkout' },
        { target: 'afterpay', type: 'competes_with', year: 2023, desc: 'Competing BNPL installment option at checkout' },
      ];
      break;

    case 'afterpay':
      newRels = [
        { target: 'payments', type: 'depends_on', year: 2023, desc: 'BNPL installment option within eBay payments checkout' },
        { target: 'managed-payments', type: 'integrates_with', year: 2023, desc: 'Offered as payment method within managed payments infrastructure' },
        { target: 'checkout', type: 'integrates_with', year: 2023, desc: 'Displayed as BNPL option at eBay checkout; AU market focus' },
        { target: 'klarna-pay-in-4', type: 'competes_with', year: 2023, desc: 'Competing BNPL option; Afterpay AU-focused, Klarna US/global' },
        { target: 'sezzle-pay-in-4', type: 'competes_with', year: 2023, desc: 'Competing BNPL installment option at checkout' },
      ];
      break;

    case 'paypal-credit-6-month':
      newRels = [
        { target: 'payments', type: 'depends_on', year: 2014, desc: 'Financing option offered within eBay payments checkout' },
        { target: 'managed-payments', type: 'integrates_with', year: 2021, desc: 'Continued as payment option after transition to managed payments' },
        { target: 'checkout', type: 'integrates_with', year: 2014, desc: 'Promotional financing displayed at checkout for eligible $149+ purchases' },
        { target: 'klarna-financing', type: 'competes_with', year: 2023, desc: 'Competing extended financing option at checkout' },
      ];
      break;

    case 'automatic-tax-calculation':
      newRels = [
        { target: 'managed-payments', type: 'depends_on', year: 2018, desc: 'Tax calculation integrated into managed payments infrastructure' },
        { target: 'checkout', type: 'integrates_with', year: 2018, desc: 'Tax calculated and displayed automatically at checkout' },
        { target: 'tax', type: 'integrates_with', year: 2018, desc: 'Part of eBay\'s tax compliance umbrella' },
        { target: 'seller-hub', type: 'integrates_with', year: 2018, desc: 'Tax reports available through Seller Hub for seller records' },
        { target: 'vat-invoice-automation', type: 'related_to', year: 2025, desc: 'Companion tax automation feature for UK/EU VAT' },
      ];
      break;

    case 'multi-currency-payout':
      newRels = [
        { target: 'managed-payments', type: 'depends_on', year: 2021, desc: 'Multi-currency payout is an extension of managed payments infrastructure' },
        { target: 'currency-conversion', type: 'integrates_with', year: 2021, desc: 'Uses currency conversion rates to deliver payouts in seller-preferred currency' },
        { target: 'international', type: 'integrates_with', year: 2021, desc: 'Enables international sellers to list on multiple eBay sites with flexible payouts' },
        { target: 'ebay-international-shipping', type: 'related_to', year: 2021, desc: 'International sellers using multi-currency payout often pair with international shipping' },
      ];
      break;

    case 'immediate-payment-requirement':
      newRels = [
        { target: 'checkout', type: 'integrates_with', year: 2010, desc: 'Enforced at checkout to require instant payment for BIN and auction listings' },
        { target: 'buy-it-now', type: 'depends_on', year: 2010, desc: 'Primarily applied to Buy It Now listings' },
        { target: 'managed-payments', type: 'depends_on', year: 2018, desc: 'Immediate payment enforced through managed payments infrastructure' },
        { target: 'unpaid-item-assistant', type: 'related_to', desc: 'Both address unpaid items; immediate payment requirement prevents them proactively' },
      ];
      break;

    case 'vat-invoice-automation':
      newRels = [
        { target: 'managed-payments', type: 'depends_on', year: 2025, desc: 'VAT invoices generated from managed payments transaction data' },
        { target: 'seller-hub', type: 'integrates_with', year: 2025, desc: 'VAT invoices downloadable from Seller Hub' },
        { target: 'tax', type: 'integrates_with', year: 2025, desc: 'Part of eBay\'s tax compliance toolset' },
        { target: 'automatic-tax-calculation', type: 'related_to', year: 2025, desc: 'Companion tax automation feature; VAT Invoice for UK/EU, tax calculation for US' },
        { target: 'international', type: 'integrates_with', year: 2025, desc: 'UK and EU market compliance feature for cross-border sellers' },
      ];
      break;

    case 'two-step-verification':
      newRels = [
        { target: 'account-security', type: 'integrates_with', year: 2020, desc: 'Core account security feature adding second authentication factor' },
        { target: 'trust', type: 'depends_on', year: 2020, desc: 'Part of eBay trust and safety umbrella for account protection' },
        { target: 'passkeys', type: 'related_to', year: 2025, desc: 'Passkeys are the modern successor to 2SV; both protect account access' },
        { target: 'security-center', type: 'integrates_with', year: 2020, desc: '2-step verification promoted and managed through Security Center' },
        { target: 'authenticator-app', type: 'integrates_with', year: 2020, desc: 'Authenticator apps are one of three delivery methods for 2SV codes' },
      ];
      break;

    case 'community-mentor-program':
      newRels = [
        { target: 'community', type: 'depends_on', year: 2024, desc: 'Community Mentor Program operates within eBay community platform' },
        { target: 'ebay-community', type: 'integrates_with', year: 2024, desc: 'Mentors answer questions on Ask A Mentor board in eBay Community' },
        { target: 'ebay-council', type: 'related_to', year: 2024, desc: 'Both are seller engagement and feedback programs' },
        { target: 'expressions-panel', type: 'related_to', year: 2024, desc: 'Companion community participation program for seller input' },
        { target: 'seller-community', type: 'integrates_with', year: 2024, desc: 'Mentors support seller community education efforts' },
      ];
      break;

    case 'small-business-advocacy-network':
      newRels = [
        { target: 'community', type: 'depends_on', year: 2024, desc: 'Network run by eBay Government Relations team within community umbrella' },
        { target: 'ebay-for-charity', type: 'related_to', year: 2024, desc: 'Both support seller communities beyond pure commerce' },
        { target: 'seller-programs', type: 'integrates_with', year: 2024, desc: 'Members promoted through eBay seller program channels' },
        { target: 'impact', type: 'related_to', year: 2024, desc: 'Policy advocacy tied to eBay\'s broader economic impact mission' },
        { target: 'small-business-report', type: 'related_to', year: 2024, desc: 'Small Business Report documents the economic importance SBAN advocates for' },
      ];
      break;

    case 'expressions-panel':
      newRels = [
        { target: 'community', type: 'depends_on', year: 2023, desc: 'Seller feedback panel managed through eBay community team' },
        { target: 'ebay-council', type: 'related_to', year: 2023, desc: 'Separate but complementary seller research panel program' },
        { target: 'community-mentor-program', type: 'related_to', year: 2024, desc: 'Both are seller engagement programs inviting community participation' },
        { target: 'seller-programs', type: 'integrates_with', year: 2023, desc: 'Participants may be drawn from seller programs community' },
      ];
      break;

    case 'ebay-council':
      newRels = [
        { target: 'community', type: 'depends_on', year: 2020, desc: 'Research panel program managed within eBay community infrastructure' },
        { target: 'expressions-panel', type: 'related_to', year: 2023, desc: 'Complementary seller feedback program; Council is surveys, Expressions is Zoom sessions' },
        { target: 'community-mentor-program', type: 'related_to', year: 2024, desc: 'Both invite sellers into structured community engagement programs' },
        { target: 'ebay-community', type: 'integrates_with', year: 2020, desc: 'Council social commenting previously hosted in eBay Community platform' },
      ];
      break;

    case 'payment-dispute-protections':
      newRels = [
        { target: 'seller-protections', type: 'depends_on', year: 2025, desc: 'Part of eBay seller protections umbrella for chargebacks and payment disputes' },
        { target: 'managed-payments', type: 'integrates_with', year: 2025, desc: 'Dispute protections apply to transactions processed through managed payments' },
        { target: 'trust', type: 'integrates_with', year: 2025, desc: 'Part of eBay trust infrastructure protecting both sides of transactions' },
        { target: 'feedback', type: 'integrates_with', year: 2025, desc: 'eBay may remove associated negative feedback as part of dispute protection' },
        { target: 'case-appeals', type: 'related_to', year: 2025, desc: 'Sellers can use case appeals process if dispute protections not automatically applied' },
      ];
      break;

    case 'case-appeals':
      newRels = [
        { target: 'resolution-center-multi-market', type: 'depends_on', year: 2020, desc: 'Appeals process is part of the Resolution Center workflow' },
        { target: 'trust', type: 'integrates_with', year: 2020, desc: 'Appeals mechanism supports fair trust and safety outcomes' },
        { target: 'payment-dispute-protections', type: 'related_to', year: 2025, desc: 'Appeals available when automatic dispute protections not applied' },
        { target: 'customer-service', type: 'integrates_with', year: 2020, desc: 'Case appeals reviewed by eBay customer service team' },
        { target: 'seller-protections', type: 'integrates_with', year: 2020, desc: 'Appeals provide recourse within seller protections framework' },
      ];
      break;

    case 'security-center':
      newRels = [
        { target: 'trust', type: 'depends_on', year: 2020, desc: 'Security Center is the education and guidance hub within trust umbrella' },
        { target: 'trust-safety', type: 'integrates_with', year: 2020, desc: 'Central resource for all trust and safety-related guidance' },
        { target: 'account-security', type: 'integrates_with', year: 2020, desc: 'Security Center promotes account security best practices' },
        { target: 'two-step-verification', type: 'integrates_with', year: 2020, desc: 'Security Center guides users to enable 2-step verification' },
        { target: 'passkeys', type: 'integrates_with', year: 2025, desc: 'Security Center promotes passkey adoption as phishing-resistant auth' },
      ];
      break;

    case 'shipping-partner-platform':
      newRels = [
        { target: 'shipping', type: 'depends_on', year: 2024, desc: 'Shipping Partner Platform extends eBay shipping with third-party carrier integrations' },
        { target: 'seller-hub', type: 'integrates_with', year: 2024, desc: 'Negotiated rates accessible via seller shipping workflow in Seller Hub' },
        { target: 'shipping-labels', type: 'integrates_with', year: 2024, desc: 'ShipRush integration enables label printing and tracking upload' },
        { target: 'calculated-shipping', type: 'related_to', year: 2024, desc: 'Partner platform rates can inform calculated shipping options' },
        { target: 'shipcover-insurance', type: 'related_to', year: 2024, desc: 'Both are supplementary shipping services for eBay sellers' },
      ];
      break;

    case 'qr-code-labels':
      newRels = [
        { target: 'shipping', type: 'depends_on', year: 2023, desc: 'QR Code Labels provide a printerless path within eBay shipping label workflow' },
        { target: 'shipping-labels', type: 'integrates_with', year: 2023, desc: 'QR codes generate equivalent shipping labels at carrier drop-off points' },
        { target: 'ebay-mobile-app', type: 'integrates_with', year: 2023, desc: 'QR codes displayed and managed via eBay mobile app' },
        { target: 'seller-hub', type: 'related_to', year: 2023, desc: 'Label workflow accessible from Seller Hub orders section' },
      ];
      break;

    case 'automated-return-labels':
      newRels = [
        { target: 'returns', type: 'depends_on', year: 2024, desc: 'Automated labels are part of eBay returns automation infrastructure' },
        { target: 'managed-returns', type: 'integrates_with', year: 2024, desc: 'Automated labels are generated through Managed Returns workflow' },
        { target: 'seller-hub', type: 'integrates_with', year: 2024, desc: 'Return label automation rules configured in Seller Hub' },
        { target: 'shipping-labels', type: 'integrates_with', year: 2024, desc: 'Return labels generated using eBay-negotiated carrier rates' },
      ];
      break;

    case 'usps-cobranded-supplies':
      newRels = [
        { target: 'shipping', type: 'integrates_with', year: 2015, desc: 'Co-branded USPS Priority Mail boxes support free shipping compliance' },
        { target: 'ebay-packaging-store', type: 'related_to', year: 2023, desc: 'Both provide eBay-branded packaging; USPS supplies are USPS-partnered, Packaging Store is broader' },
        { target: 'seller-tools', type: 'related_to', year: 2015, desc: 'Packaging supplies support sellers in the seller tools ecosystem' },
        { target: 'free-shipping', type: 'depends_on', year: 2015, desc: 'USPS co-branded supplies require sellers to offer free shipping' },
      ];
      break;

    case 'ebay-packaging-store':
      newRels = [
        { target: 'shipping', type: 'integrates_with', year: 2023, desc: 'Packaging supplies support eBay sellers in the shipping workflow' },
        { target: 'usps-cobranded-supplies', type: 'related_to', year: 2023, desc: 'Complementary packaging programs; Packaging Store is broader branded supply' },
        { target: 'seller-tools', type: 'integrates_with', year: 2023, desc: 'Packaging store is part of the broader seller tools and resources' },
        { target: 'ebay-stores', type: 'related_to', year: 2023, desc: 'eBay Stores sellers are primary target audience for branded packaging' },
      ];
      break;

    case 'shipcover-insurance':
      newRels = [
        { target: 'shipping', type: 'depends_on', year: 2020, desc: 'ShipCover Insurance is supplementary insurance offered within eBay shipping' },
        { target: 'shipping-labels', type: 'integrates_with', year: 2020, desc: 'Insurance purchased alongside shipping label in eBay Labels workflow' },
        { target: 'seller-hub', type: 'integrates_with', year: 2020, desc: 'Insurance options accessible from Seller Hub shipping workflow' },
        { target: 'shipping-partner-platform', type: 'related_to', year: 2024, desc: 'Both are supplementary services enhancing eBay shipping for sellers' },
      ];
      break;

    case 'bulk-label-printing':
      newRels = [
        { target: 'seller-hub', type: 'depends_on', year: 2018, desc: 'Bulk label printing is a Seller Hub feature for high-volume sellers' },
        { target: 'shipping', type: 'integrates_with', year: 2018, desc: 'Batch label purchase and printing streamlines shipping workflow' },
        { target: 'shipping-labels', type: 'integrates_with', year: 2018, desc: 'Bulk tool generates multiple shipping labels in one workflow' },
        { target: 'order-management', type: 'integrates_with', year: 2018, desc: 'Detects and combines multiple orders to same buyer for efficient labeling' },
      ];
      break;

    case 'customs-declaration-automation':
      newRels = [
        { target: 'shipping', type: 'depends_on', year: 2018, desc: 'Customs automation is part of eBay international shipping infrastructure' },
        { target: 'international-standard-delivery', type: 'integrates_with', year: 2020, desc: 'Customs declarations automated as part of international standard delivery' },
        { target: 'ebay-international-shipping', type: 'integrates_with', year: 2018, desc: 'Customs forms pre-filled for eBay International Shipping shipments' },
        { target: 'shipping-labels', type: 'integrates_with', year: 2018, desc: 'Customs forms combined with shipping labels in eBay Labels workflow' },
      ];
      break;

    case 'ebay-breaks':
      newRels = [
        { target: 'collectibles', type: 'depends_on', year: 2024, desc: 'eBay Breaks is a collectibles-specific live event format' },
        { target: 'ebay-live', type: 'integrates_with', year: 2024, desc: 'Breaks are a specialized form of live commerce on eBay Live' },
        { target: 'live-commerce', type: 'integrates_with', year: 2024, desc: 'Breaks operate within the live commerce umbrella' },
        { target: 'trading-card-hub', type: 'integrates_with', year: 2024, desc: 'Trading card breaks are a primary use case for eBay Breaks' },
        { target: 'authenticity-guarantee-trading-cards', type: 'related_to', year: 2024, desc: 'Cards pulled in breaks may be submitted for authentication' },
      ];
      break;

    case 'endless-runway':
      newRels = [
        { target: 'fashion', type: 'depends_on', year: 2024, desc: 'eBay Endless Runway is part of the fashion and sustainability umbrella' },
        { target: 'fashion-luxury', type: 'integrates_with', year: 2024, desc: 'Promotes pre-loved luxury fashion through runway activations' },
        { target: 'sustainability', type: 'integrates_with', year: 2024, desc: 'Runway initiative reinforces eBay recommerce and sustainability mission' },
        { target: 'circular-fashion-fund', type: 'related_to', year: 2024, desc: 'Both are eBay fashion sustainability initiatives' },
        { target: 'pre-loved-fashion-week', type: 'related_to', year: 2024, desc: 'Complementary fashion sustainability events and programs' },
      ];
      break;

    case 'trade-in-uk':
      newRels = [
        { target: 'electronics-technology', type: 'integrates_with', year: 2024, desc: 'Trade-in targets electronics categories: phones, tablets, laptops, consoles' },
        { target: 'sustainability', type: 'integrates_with', year: 2024, desc: 'Trade-in extends device life and supports recommerce sustainability goals' },
        { target: 'refurbished-open-box', type: 'related_to', year: 2024, desc: 'Traded-in devices may re-enter platform as refurbished inventory' },
        { target: 'ebay-uk', type: 'depends_on', year: 2024, desc: 'UK-exclusive program via eBay UK platform' },
        { target: 'recommerce-report', type: 'related_to', year: 2024, desc: 'Trade-in activity contributes to eBay recommerce metrics' },
      ];
      break;

    case 'ebay-wine':
      newRels = [
        { target: 'everything-else', type: 'integrates_with', year: 2016, desc: 'eBay Wine is a specialty vertical within cross-category/everything else' },
        { target: 'seller-programs', type: 'depends_on', year: 2016, desc: 'Pre-approved sellers only; part of specialty seller programs' },
        { target: 'collectibles', type: 'related_to', year: 2016, desc: 'Rare and collectible wine overlaps with collectibles category' },
        { target: 'ebay-plus', type: 'related_to', year: 2016, desc: 'Both are specialty marketplace features with limited seller eligibility' },
      ];
      break;

    case 'ebay-real-estate':
      newRels = [
        { target: 'everything-else', type: 'integrates_with', year: 2010, desc: 'Real estate is a specialty category within the everything else/cross-category umbrella' },
        { target: 'classified-ads', type: 'related_to', year: 2010, desc: 'Traditional real estate listings are 30-90 day advertising similar to classified ads' },
        { target: 'buy-it-now', type: 'integrates_with', year: 2010, desc: 'Fixed price format used for real estate non-binding listings' },
        { target: 'auction-format', type: 'integrates_with', year: 2010, desc: 'Auction format also used for real estate property listings' },
      ];
      break;

    case 'domain-marketplace':
      newRels = [
        { target: 'everything-else', type: 'integrates_with', year: 2015, desc: 'Domain Marketplace is a specialty vertical within cross-category' },
        { target: 'best-offer', type: 'integrates_with', year: 2015, desc: 'Best Offer format used for domain name transactions' },
        { target: 'auction-format', type: 'integrates_with', year: 2015, desc: 'Auction format available for domain name sales' },
        { target: 'buy-it-now', type: 'integrates_with', year: 2015, desc: 'Buy It Now format used for domain name sales at fixed price' },
      ];
      break;

    case 'business-supply':
      newRels = [
        { target: 'business-industrial', type: 'integrates_with', year: 2024, desc: 'eBay Business Supply combines the B&I category with B2B procurement integrations' },
        { target: 'bulk-inventory-solution', type: 'integrates_with', year: 2024, desc: 'Bulk Inventory Solution is part of the Business Supply B2B offering' },
        { target: 'heavy-equipment-verified', type: 'integrates_with', year: 2024, desc: 'Heavy Equipment Verified Condition operates within Business Supply' },
        { target: 'freight-shipping', type: 'integrates_with', year: 2024, desc: 'Business Supply heavy items require freight shipping solutions' },
        { target: 'trust', type: 'integrates_with', year: 2024, desc: 'Business Supply backed by Business Equipment Purchase Protection trust program' },
      ];
      break;

    case 'bulk-inventory-solution':
      newRels = [
        { target: 'business-supply', type: 'depends_on', year: 2024, desc: 'Bulk Inventory Solution is a sub-program of eBay Business Supply' },
        { target: 'business-industrial', type: 'integrates_with', year: 2024, desc: 'Wholesale inventory sourced through B&I category sellers' },
        { target: 'inventory-management', type: 'integrates_with', year: 2024, desc: 'Bulk inventory purchases require robust inventory management by buyers' },
        { target: 'seller-programs', type: 'integrates_with', year: 2024, desc: 'Vetted wholesalers are part of eBay\'s specialized seller programs' },
        { target: 'freight-shipping', type: 'related_to', year: 2024, desc: 'Bulk inventory purchases often require freight shipping for delivery' },
      ];
      break;

    case 'ebay-authenticate-handbags':
      newRels = [
        { target: 'authenticity-guarantee', type: 'integrates_with', year: 2025, desc: 'eBay Authenticate is built on Authenticity Guarantee infrastructure' },
        { target: 'fashion', type: 'integrates_with', year: 2025, desc: 'Luxury handbag consignment service within fashion vertical' },
        { target: 'authenticity-guarantee-handbags', type: 'related_to', year: 2025, desc: 'eBay Authenticate Handbags is distinct from AG Handbags; consignment vs. inspection model' },
        { target: 'fashion-luxury', type: 'integrates_with', year: 2025, desc: 'Targets luxury handbag sellers with 12 high-end brand eligibility' },
        { target: 'trust', type: 'depends_on', year: 2025, desc: 'Authentication and consignment service backed by eBay trust infrastructure' },
        { target: 'psa-grading-integration', type: 'related_to', year: 2025, desc: 'Both are streamlined authentication/grading services for specific categories' },
      ];
      break;

    case 'psa-grading-integration':
      newRels = [
        { target: 'authenticity-guarantee', type: 'integrates_with', year: 2024, desc: 'PSA grading integrated directly into Authenticity Guarantee workflow for cards' },
        { target: 'authenticity-guarantee-trading-cards', type: 'integrates_with', year: 2024, desc: 'PSA grading specifically extends trading card authentication offering' },
        { target: 'collectibles', type: 'integrates_with', year: 2024, desc: 'Trading card grading serves the collectibles vertical' },
        { target: 'trading-card-hub', type: 'integrates_with', year: 2024, desc: 'PSA integration promoted through Trading Card Hub destination' },
        { target: 'trust', type: 'depends_on', year: 2024, desc: 'Grading integration is part of eBay\'s trust and authentication infrastructure' },
        { target: 'ebay-vault', type: 'related_to', year: 2024, desc: 'PSA-graded cards are eligible for storage in eBay Vault' },
      ];
      break;

    case 'heavy-equipment-verified':
      newRels = [
        { target: 'business-supply', type: 'integrates_with', year: 2024, desc: 'Heavy Equipment Verified is a trust program within eBay Business Supply' },
        { target: 'business-industrial', type: 'integrates_with', year: 2024, desc: 'Verification program for high-value Business & Industrial equipment' },
        { target: 'trust', type: 'depends_on', year: 2024, desc: 'Verified Condition reports backed by eBay trust infrastructure' },
        { target: 'business-equipment-purchase-protection', type: 'integrates_with', year: 2024, desc: 'Heavy Equipment Verified purchases backed by Business Equipment Purchase Protection up to $200K' },
        { target: 'freight-shipping', type: 'related_to', year: 2024, desc: 'Heavy equipment purchases typically require freight shipping' },
        { target: 'authenticity-guarantee', type: 'related_to', year: 2024, desc: 'Both are category-specific verification and protection programs' },
      ];
      break;
  }

  if (newRels.length > 0) {
    enhanced.relationships = [...(node.relationships || []), ...newRels];
  }
  return enhanced;
});

// Export count for verification
export const RELATIONSHIP_COUNT = ENRICHED_PROGRAMS.reduce(
  (sum, node) => sum + (node.relationships?.length || 0),
  0
);

console.log(`Knowledge Graph enriched: ${ENRICHED_PROGRAMS.length} nodes, ${RELATIONSHIP_COUNT} relationships`);

// ============================================================================
// ADVANCED GRAPH ANALYTICS
// ============================================================================

// Calculate degree centrality (number of connections per node)
export function calculateDegree(nodes: GraphNode[]): Map<string, number> {
  const degree = new Map<string, number>();

  // Initialize all nodes with 0
  nodes.forEach(n => degree.set(n.id, 0));

  // Count all links
  nodes.forEach(node => {
    if (node.parent) {
      degree.set(node.id, (degree.get(node.id) || 0) + 1);
      degree.set(node.parent, (degree.get(node.parent) || 0) + 1);
    }
    if (node.relationships) {
      node.relationships.forEach(rel => {
        degree.set(node.id, (degree.get(node.id) || 0) + 1);
        degree.set(rel.target, (degree.get(rel.target) || 0) + 1);
      });
    }
  });

  return degree;
}

// Find most connected nodes
export function getMostConnected(nodes: GraphNode[], limit: number = 10): Array<{id: string, name: string, degree: number}> {
  const degree = calculateDegree(nodes);
  const nodeMap = new Map(nodes.map(n => [n.id, n]));

  return Array.from(degree.entries())
    .map(([id, deg]) => ({
      id,
      name: nodeMap.get(id)?.name || id,
      degree: deg
    }))
    .sort((a, b) => b.degree - a.degree)
    .slice(0, limit);
}

// Shortest path between two nodes using BFS
export function findShortestPath(
  nodes: GraphNode[],
  sourceId: string,
  targetId: string
): string[] | null {
  if (sourceId === targetId) return [sourceId];

  // Build adjacency list
  const adjList = new Map<string, Set<string>>();
  nodes.forEach(n => adjList.set(n.id, new Set()));

  nodes.forEach(node => {
    if (node.parent) {
      adjList.get(node.id)?.add(node.parent);
      adjList.get(node.parent)?.add(node.id);
    }
    if (node.relationships) {
      node.relationships.forEach(rel => {
        adjList.get(node.id)?.add(rel.target);
        adjList.get(rel.target)?.add(node.id);
      });
    }
  });

  // BFS
  const queue: Array<{node: string, path: string[]}> = [{node: sourceId, path: [sourceId]}];
  const visited = new Set<string>([sourceId]);

  while (queue.length > 0) {
    const {node, path} = queue.shift()!;

    if (node === targetId) return path;

    const neighbors = adjList.get(node) || new Set();
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push({node: neighbor, path: [...path, neighbor]});
      }
    }
  }

  return null; // No path found
}

// Find all paths up to max length
export function findAllPaths(
  nodes: GraphNode[],
  sourceId: string,
  targetId: string,
  maxLength: number = 5
): string[][] {
  const paths: string[][] = [];

  // Build adjacency list
  const adjList = new Map<string, Set<string>>();
  nodes.forEach(n => adjList.set(n.id, new Set()));

  nodes.forEach(node => {
    if (node.parent) {
      adjList.get(node.id)?.add(node.parent);
      adjList.get(node.parent)?.add(node.id);
    }
    if (node.relationships) {
      node.relationships.forEach(rel => {
        adjList.get(node.id)?.add(rel.target);
        adjList.get(rel.target)?.add(node.id);
      });
    }
  });

  function dfs(current: string, target: string, path: string[], visited: Set<string>) {
    if (path.length > maxLength) return;
    if (current === target) {
      paths.push([...path]);
      return;
    }

    const neighbors = adjList.get(current) || new Set();
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        path.push(neighbor);
        dfs(neighbor, target, path, visited);
        path.pop();
        visited.delete(neighbor);
      }
    }
  }

  dfs(sourceId, targetId, [sourceId], new Set([sourceId]));
  return paths;
}

// Detect communities/clusters using simple connected components
export function findClusters(nodes: GraphNode[]): Map<number, string[]> {
  const adjList = new Map<string, Set<string>>();
  nodes.forEach(n => adjList.set(n.id, new Set()));

  nodes.forEach(node => {
    if (node.parent) {
      adjList.get(node.id)?.add(node.parent);
      adjList.get(node.parent)?.add(node.id);
    }
    if (node.relationships) {
      node.relationships.forEach(rel => {
        adjList.get(node.id)?.add(rel.target);
        adjList.get(rel.target)?.add(node.id);
      });
    }
  });

  const visited = new Set<string>();
  const clusters = new Map<number, string[]>();
  let clusterId = 0;

  function dfs(nodeId: string, cluster: string[]) {
    visited.add(nodeId);
    cluster.push(nodeId);

    const neighbors = adjList.get(nodeId) || new Set();
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        dfs(neighbor, cluster);
      }
    }
  }

  nodes.forEach(node => {
    if (!visited.has(node.id)) {
      const cluster: string[] = [];
      dfs(node.id, cluster);
      clusters.set(clusterId++, cluster);
    }
  });

  return clusters;
}

// Get nodes by relationship type
export function getRelationshipNetwork(
  nodes: GraphNode[],
  relationshipType: RelationshipType
): GraphLink[] {
  const links: GraphLink[] = [];

  nodes.forEach(node => {
    if (node.relationships) {
      node.relationships
        .filter(rel => rel.type === relationshipType)
        .forEach(rel => {
          links.push({
            source: node.id,
            target: rel.target,
            type: rel.type,
            year: rel.year,
            desc: rel.desc,
          });
        });
    }
  });

  return links;
}

// Timeline analysis - group relationships by year
export function getRelationshipTimeline(nodes: GraphNode[]): Map<number, GraphLink[]> {
  const timeline = new Map<number, GraphLink[]>();

  const allLinks = generateLinks(nodes);
  allLinks.forEach(link => {
    const year = link.year || 2020;
    if (!timeline.has(year)) {
      timeline.set(year, []);
    }
    timeline.get(year)!.push(link);
  });

  return new Map([...timeline.entries()].sort((a, b) => a[0] - b[0]));
}
