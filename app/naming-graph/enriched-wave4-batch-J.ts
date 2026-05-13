// eBay Naming Graph - Wave 4 Batch J
// Focus: Developer tools, APIs, third-party integrations, partner programs
// Generated: 2026-04-17
// Total: 50 programs with full GraphNode metadata

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

export const ENRICHED_WAVE4_J: GraphNode[] = [
  {
    id: "file-exchange",
    name: "File Exchange",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "XML-based bulk listing upload and management system for high-volume sellers, supporting automated inventory synchronization via FTP/SFTP.",
    market: "global",
    year: 2004
  },
  {
    id: "third-party-software",
    name: "Third-Party Software",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "Certified partner ecosystem of third-party listing, inventory, and business management tools integrated with eBay via API.",
    market: "global",
    year: 2005
  },
  {
    id: "developer-program",
    name: "Developer Program",
    type: "developer",
    tier: "program",
    status: "current",
    parent: "developer-tools",
    desc: "Official program providing API access, SDKs, documentation, and support for developers building on eBay's platform.",
    market: "global",
    year: 2000
  },
  {
    id: "trading-api",
    name: "Trading API",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "Core SOAP-based API enabling programmatic access to listing creation, order management, and seller account functions.",
    market: "global",
    year: 2001
  },
  {
    id: "finding-api",
    name: "Finding API",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "RESTful API for searching and retrieving eBay listings with advanced filtering and category browsing capabilities.",
    market: "global",
    year: 2009
  },
  {
    id: "shopping-api",
    name: "Shopping API",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "Lightweight RESTful API for retrieving item details, user information, and product catalogs for buyer-facing applications.",
    market: "global",
    year: 2005
  },
  {
    id: "inventory-api",
    name: "Inventory API",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "RESTful API for managing multi-channel inventory, enabling sellers to sync product listings across eBay and external platforms.",
    market: "global",
    year: 2017
  },
  {
    id: "fulfillment-api",
    name: "Fulfillment API",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "RESTful API for order processing, shipping label generation, and tracking number updates for integrated order management.",
    market: "global",
    year: 2017
  },
  {
    id: "analytics-api",
    name: "Analytics API",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "RESTful API providing traffic, conversion, and seller performance metrics for data-driven business intelligence tools.",
    market: "global",
    year: 2019
  },
  {
    id: "marketing-api",
    name: "Marketing API",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "RESTful API for managing Promoted Listings campaigns, item promotions, and markdown sales programmatically.",
    market: "global",
    year: 2018
  },
  {
    id: "commerce-api",
    name: "Commerce API",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "Suite of RESTful APIs covering buy-side operations including checkout, payment, and order management.",
    market: "global",
    year: 2018
  },
  {
    id: "buy-api",
    name: "Buy API",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "RESTful API enabling browse, search, and purchase functionality for buyer-facing applications and marketplaces.",
    market: "global",
    year: 2018
  },
  {
    id: "sell-api",
    name: "Sell API",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "Modern RESTful API suite replacing legacy Trading API with streamlined listing, inventory, and account management.",
    market: "global",
    year: 2017
  },
  {
    id: "catalog-api",
    name: "Catalog API",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "RESTful API for accessing eBay's product catalog database with standardized product identifiers (ePID) and attributes.",
    market: "global",
    year: 2019
  },
  {
    id: "taxonomy-api",
    name: "Taxonomy API",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "RESTful API providing eBay's category structure and required item specifics for accurate product categorization.",
    market: "global",
    year: 2018
  },
  {
    id: "metadata-api",
    name: "Metadata API",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "RESTful API delivering marketplace policies, seller fees, shipping options, and regulatory requirements by country.",
    market: "global",
    year: 2019
  },
  {
    id: "notification-api",
    name: "Notification API",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "Platform Notifications service delivering real-time webhooks for order updates, listing changes, and account events.",
    market: "global",
    year: 2018
  },
  {
    id: "oauth-authentication",
    name: "OAuth Authentication",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "OAuth 2.0-based authentication framework for secure API access with user consent and token-based authorization.",
    market: "global",
    year: 2016
  },
  {
    id: "developer-console",
    name: "Developer Console",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "Self-service portal for API key generation, application management, sandbox testing, and usage monitoring.",
    market: "global",
    year: 2015
  },
  {
    id: "sandbox-environment",
    name: "Sandbox Environment",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "Isolated testing environment mirroring production eBay with test accounts, listings, and transactions for development.",
    market: "global",
    year: 2002
  },
  {
    id: "api-explorer",
    name: "API Explorer",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "Interactive API documentation tool allowing developers to test endpoints, view sample code, and explore schemas.",
    market: "global",
    year: 2018
  },
  {
    id: "sdk-libraries",
    name: "SDK Libraries",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "Official software development kits in Java, PHP, Python, C#, and JavaScript for rapid API integration.",
    market: "global",
    year: 2006
  },
  {
    id: "developer-forums",
    name: "Developer Forums",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "Community discussion boards for API troubleshooting, best practices, and direct support from eBay developer relations.",
    market: "global",
    year: 2001
  },
  {
    id: "partner-network",
    name: "Partner Network",
    type: "developer",
    tier: "program",
    status: "current",
    parent: "developer-tools",
    desc: "Affiliate and integration partner program connecting sellers with certified third-party service providers.",
    market: "global",
    year: 2000
  },
  {
    id: "certified-providers",
    name: "Certified Providers",
    type: "developer",
    tier: "program",
    status: "current",
    parent: "developer-tools",
    desc: "Vetted ecosystem of eBay-certified solution partners offering listing, inventory, shipping, and accounting software.",
    market: "global",
    year: 2005
  },
  {
    id: "solutions-directory",
    name: "Solutions Directory",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "Searchable marketplace of certified third-party applications and services organized by business need and seller size.",
    market: "global",
    year: 2008
  },
  {
    id: "developer-grants",
    name: "Developer Grants",
    type: "developer",
    tier: "program",
    status: "current",
    parent: "developer-tools",
    desc: "Funding and resources program supporting innovative developer projects and startups building on eBay's platform.",
    market: "US",
    year: 2012
  },
  {
    id: "api-rate-limits",
    name: "API Rate Limits",
    type: "developer",
    tier: "feature",
    status: "current",
    parent: "developer-tools",
    desc: "Tiered request quotas governing API call frequency based on developer account level and application use case.",
    market: "global",
    year: 2010
  },
  {
    id: "webhooks",
    name: "Webhooks",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "Event-driven notification system pushing real-time updates to registered endpoints for order, inventory, and account changes.",
    market: "global",
    year: 2018
  },
  {
    id: "graphql-api",
    name: "GraphQL API",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "Modern query language-based API offering flexible data retrieval with client-specified response structures.",
    market: "global",
    year: 2023
  },
  {
    id: "open-source-tools",
    name: "Open Source Tools",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "eBay-maintained open source libraries, CLI tools, and frameworks published on GitHub for developer community use.",
    market: "global",
    year: 2014
  },
  {
    id: "developer-webinars",
    name: "Developer Webinars",
    type: "developer",
    tier: "program",
    status: "current",
    parent: "developer-tools",
    desc: "Regular educational sessions covering API updates, integration best practices, and new platform features.",
    market: "global",
    year: 2010
  },
  {
    id: "technical-documentation",
    name: "Technical Documentation",
    type: "developer",
    tier: "platform",
    status: "current",
    parent: "developer-tools",
    desc: "Comprehensive API reference, integration guides, code samples, and architectural diagrams for developers.",
    market: "global",
    year: 2000
  },
  {
    id: "api-deprecation-policy",
    name: "API Deprecation Policy",
    type: "developer",
    tier: "legal",
    status: "current",
    parent: "developer-tools",
    desc: "Structured timeline and communication process for retiring legacy APIs with minimum 12-month notice period.",
    market: "global",
    year: 2015
  },
  {
    id: "developer-compliance",
    name: "Developer Compliance",
    type: "developer",
    tier: "legal",
    status: "current",
    parent: "developer-tools",
    desc: "API usage policies governing data privacy, rate limits, branding guidelines, and acceptable use cases.",
    market: "global",
    year: 2005
  },
  {
    id: "api-versioning",
    name: "API Versioning",
    type: "developer",
    tier: "feature",
    status: "current",
    parent: "developer-tools",
    desc: "Semantic versioning system for API endpoints ensuring backward compatibility and controlled deprecation cycles.",
    market: "global",
    year: 2010
  },
  {
    id: "bulk-upload",
    name: "Bulk Upload",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-tools",
    desc: "Mass listing creation interface accepting CSV, Excel, or XML files for uploading hundreds of items simultaneously.",
    market: "global",
    year: 2003
  },
  {
    id: "csv-upload",
    name: "CSV Upload",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-tools",
    desc: "Spreadsheet-based bulk listing upload supporting CSV format for simple inventory import without API integration.",
    market: "global",
    year: 2005
  },
  {
    id: "shipping-partner-integrations",
    name: "Shipping Partner Integrations",
    type: "developer",
    tier: "program",
    status: "current",
    parent: "shipping",
    desc: "Direct API connections with major carriers (USPS, FedEx, UPS, DHL) for real-time rate calculation and label generation.",
    market: "global",
    year: 2007
  },
  {
    id: "payment-partner-integrations",
    name: "Payment Partner Integrations",
    type: "developer",
    tier: "program",
    status: "current",
    parent: "payments",
    desc: "Third-party payment processor integrations including PayPal, Stripe, Adyen for multi-channel seller payouts.",
    market: "global",
    year: 2018
  },
  {
    id: "accounting-software-integrations",
    name: "Accounting Software Integrations",
    type: "developer",
    tier: "program",
    status: "current",
    parent: "seller-tools",
    desc: "API partnerships with QuickBooks, Xero, FreshBooks for automated sales data sync and tax reporting.",
    market: "global",
    year: 2010
  },
  {
    id: "inventory-management-integrations",
    name: "Inventory Management Integrations",
    type: "developer",
    tier: "program",
    status: "current",
    parent: "seller-tools",
    desc: "Certified integrations with SKULabs, Linnworks, Veeqo for multi-channel inventory synchronization.",
    market: "global",
    year: 2008
  },
  {
    id: "erp-integrations",
    name: "ERP Integrations",
    type: "developer",
    tier: "program",
    status: "current",
    parent: "seller-tools",
    desc: "Enterprise resource planning system connections with SAP, Oracle NetSuite, Microsoft Dynamics for large sellers.",
    market: "global",
    year: 2012
  },
  {
    id: "pos-integrations",
    name: "POS Integrations",
    type: "developer",
    tier: "program",
    status: "current",
    parent: "seller-tools",
    desc: "Point-of-sale system integrations for brick-and-mortar retailers listing in-store inventory on eBay.",
    market: "global",
    year: 2014
  },
  {
    id: "marketplace-sync",
    name: "Marketplace Sync",
    type: "developer",
    tier: "program",
    status: "current",
    parent: "seller-tools",
    desc: "Multi-channel listing synchronization with Amazon, Walmart, Etsy, Shopify for unified inventory management.",
    market: "global",
    year: 2015
  },
  {
    id: "repricing-tools",
    name: "Repricing Tools",
    type: "developer",
    tier: "program",
    status: "current",
    parent: "seller-tools",
    desc: "Automated pricing optimization software adjusting item prices in real-time based on competitor pricing and demand.",
    market: "global",
    year: 2013
  },
  {
    id: "listing-optimization-tools",
    name: "Listing Optimization Tools",
    type: "developer",
    tier: "program",
    status: "current",
    parent: "seller-tools",
    desc: "AI-powered title, description, and category optimization software maximizing search visibility and conversion.",
    market: "global",
    year: 2019
  },
  {
    id: "image-hosting-services",
    name: "Image Hosting Services",
    type: "developer",
    tier: "program",
    status: "current",
    parent: "seller-tools",
    desc: "Third-party image CDN integrations for high-resolution product photography beyond eBay's default 24-photo limit.",
    market: "global",
    year: 2008
  },
  {
    id: "customer-service-integrations",
    name: "Customer Service Integrations",
    type: "developer",
    tier: "program",
    status: "current",
    parent: "seller-tools",
    desc: "Help desk and CRM system integrations with Zendesk, Freshdesk, HubSpot for centralized buyer communication.",
    market: "global",
    year: 2016
  },
  {
    id: "dropshipping-integrations",
    name: "Dropshipping Integrations",
    type: "developer",
    tier: "program",
    status: "current",
    parent: "seller-tools",
    desc: "Supplier network integrations with AliExpress, Modalyst, Spocket enabling inventory-free selling models.",
    market: "global",
    year: 2017
  }
]
