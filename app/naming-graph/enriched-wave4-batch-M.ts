// eBay Naming Graph - Wave 4 Batch M - 50 NEW Enriched Programs
// Generated: 2026-04-17
// Focus: Taxes, Legal Compliance, Regulatory Features, Privacy Tools
// Source: translations.ts + Market Research
// Export: ENRICHED_WAVE4_M
// Total enriched programs: 423 (existing) + 50 (new) = 473

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

export const ENRICHED_WAVE4_M: GraphNode[] = [
  {
    "id": "form-1099-k",
    "name": "Form 1099-K",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "tax",
    "desc": "US-only IRS tax form for reporting payment card and third-party network transactions exceeding $600/year, required for marketplace platforms under Tax Reform Act.",
    "market": "US",
    "year": 2011
  },
  {
    "id": "tax-documents",
    "name": "Tax Documents",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Centralized repository in Seller Hub providing access to 1099-K forms, sales tax reports, and transaction history for tax preparation.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "sales-tax-collection",
    "name": "Sales Tax Collection",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "tax",
    "desc": "Automated marketplace facilitator tax collection system calculating and remitting sales tax/VAT/GST based on buyer location and applicable tax jurisdictions.",
    "market": "global",
    "year": 2018
  },
  {
    "id": "vat",
    "name": "VAT (Value Added Tax)",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "tax",
    "desc": "European consumption tax (UK/DE/FR/IT) automatically calculated and collected on eligible transactions, with marketplace facilitator obligations under EU VAT Directive.",
    "market": ["UK", "DE", "FR", "IT"],
    "year": 2015
  },
  {
    "id": "gst",
    "name": "GST (Goods and Services Tax)",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "tax",
    "desc": "Australian and Canadian goods/services tax automatically calculated and remitted by eBay as marketplace facilitator (AU: 10%, CA: varies by province).",
    "market": ["AU", "CA"],
    "year": 2017
  },
  {
    "id": "sales-tax",
    "name": "Sales Tax",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "tax",
    "desc": "US state and local consumption tax automatically calculated based on buyer's ship-to address, with eBay collecting and remitting in 40+ states post-Wayfair decision.",
    "market": "US",
    "year": 2019
  },
  {
    "id": "tax-invoice",
    "name": "Tax Invoice",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "tax",
    "desc": "Legally compliant invoice document including VAT/GST details, seller business registration, and itemized tax breakdown required in EU and AU markets.",
    "market": ["UK", "DE", "FR", "IT", "AU"],
    "year": 2010
  },
  {
    "id": "marketplace-facilitator-vat",
    "name": "Marketplace Facilitator VAT",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "tax",
    "desc": "EU VAT collection model where eBay acts as deemed supplier, calculating and remitting VAT on behalf of sellers for cross-border transactions under €150.",
    "market": ["UK", "DE", "FR", "IT"],
    "year": 2021
  },
  {
    "id": "import-vat",
    "name": "Import VAT",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "tax",
    "desc": "VAT charged on goods imported into EU from non-EU countries, collected at point of sale by eBay under Import One-Stop Shop (IOSS) scheme for shipments under €150.",
    "market": ["UK", "DE", "FR", "IT"],
    "year": 2021
  },
  {
    "id": "vat-collection",
    "name": "VAT Collection",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "tax",
    "desc": "Automated VAT calculation, collection, and remittance service operating across EU markets, handling complex cross-border tax scenarios and seller obligations.",
    "market": ["UK", "DE", "FR", "IT"],
    "year": 2015
  },
  {
    "id": "customs-duties",
    "name": "Customs Duties",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "international-trade",
    "desc": "Import taxes levied by destination country customs authorities on cross-border shipments, calculated based on item value, category, and harmonized tariff codes.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "import-charges",
    "name": "Import Charges",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "international-trade",
    "desc": "Combined customs duties, taxes, and handling fees for international shipments, displayed upfront to buyers through Global Shipping Program or eBay International Shipping.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "customs-fees",
    "name": "Customs Fees",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "international-trade",
    "desc": "Processing and clearance charges imposed by customs authorities and shipping carriers for handling international shipment documentation and inspections.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "customs-clearance",
    "name": "Customs Clearance",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "international-trade",
    "desc": "Process of obtaining authorization from customs authorities to import goods, handled automatically for eBay Global Shipping Program and International Shipping shipments.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "commercial-invoice",
    "name": "Commercial Invoice",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "international-trade",
    "desc": "Required customs documentation for international shipments detailing item description, value, HS codes, and country of origin, auto-generated for GSP/eIS transactions.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "seller-performance-standards",
    "name": "Seller Performance Standards",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "Compliance framework evaluating sellers on transaction defect rate, late shipment rate, and case closure metrics, determining Above/Below Standard status and search visibility.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "transaction-defect-rate",
    "name": "Transaction Defect Rate",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "seller-performance-standards",
    "desc": "Performance metric tracking percentage of transactions with defects (INR cases, SNAD cases, negative/neutral feedback), with 2% threshold for Above Standard status.",
    "market": "global",
    "year": 2013
  },
  {
    "id": "service-metrics",
    "name": "Service Metrics",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "seller-performance-standards",
    "desc": "Seller performance dashboard displaying late shipment rate, tracking upload rate, and cases closed without seller resolution, impacting search ranking.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "vero-program",
    "name": "VeRO Program",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "compliance",
    "desc": "Verified Rights Owner program allowing intellectual property holders to report and remove listings violating trademarks, copyrights, and patents through Notice and Takedown process.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "business-policies",
    "name": "Business Policies",
    "type": "category",
    "tier": "program",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Reusable policy templates for payment, shipping, and returns that ensure compliance with platform rules and provide consistent buyer experience across listings.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "payment-policy",
    "name": "Payment Policy",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "business-policies",
    "desc": "Standardized payment terms template defining accepted payment methods, immediate payment requirements, and buyer financing options applied across multiple listings.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "shipping-policy",
    "name": "Shipping Policy",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "business-policies",
    "desc": "Reusable shipping configuration template specifying handling time, carrier services, shipping costs, and destination exclusions for consistent fulfillment terms.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "return-policy-template",
    "name": "Return Policy Template",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "business-policies",
    "desc": "Standardized return terms template defining acceptance window (30/60 days), return shipping responsibility, and refund processing applied across seller's inventory.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "policy-template",
    "name": "Policy Template",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "business-policies",
    "desc": "Generic reusable template system for payment, shipping, and return policies enabling bulk policy assignment and compliance management at scale.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "prohibited-items-policy",
    "name": "Prohibited Items Policy",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "compliance",
    "desc": "Comprehensive policy listing items banned from sale on eBay including illegal goods, weapons, drugs, adult content, and items violating federal/state laws.",
    "market": "global",
    "year": 1999
  },
  {
    "id": "restricted-items-policy",
    "name": "Restricted Items Policy",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "compliance",
    "desc": "Policy governing items requiring special seller authorization, buyer verification, or category-specific restrictions (e.g., alcohol, tobacco, medical devices).",
    "market": "global",
    "year": 2000
  },
  {
    "id": "products-with-eligibility-requirements",
    "name": "Products with Eligibility Requirements",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "compliance",
    "desc": "Category-specific listing restrictions requiring sellers to meet pre-approval criteria, licensing requirements, or platform performance thresholds before listing.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "ebay-user-agreement",
    "name": "eBay User Agreement",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "platform",
    "desc": "Legally binding terms of service governing buyer and seller conduct, fee structures, dispute resolution, and platform usage rights accepted during account registration.",
    "market": "global",
    "year": 1995
  },
  {
    "id": "active-content-policy",
    "name": "Active Content Policy",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "compliance",
    "desc": "Listing policy restricting use of JavaScript, Flash, external links, and dynamic content in item descriptions to protect buyer security and platform integrity.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "abusive-buyer-policy",
    "name": "Abusive Buyer Policy",
    "type": "trust",
    "tier": "legal",
    "status": "current",
    "parent": "seller-protections",
    "desc": "Seller protection policy addressing pattern buyers who abuse returns, file excessive cases, leave retaliatory feedback, or violate purchase commitments.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "seller-protections",
    "name": "Seller Protections",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "trust",
    "desc": "Comprehensive protection framework covering payment disputes, unauthorized transactions, chargebacks, and item not received cases when seller meets program requirements.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "payment-dispute-seller-protections",
    "name": "Payment Dispute Seller Protections",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "seller-protections",
    "desc": "Protection against PayPal/payment processor disputes for sellers who upload tracking to eligible addresses and meet delivery confirmation requirements.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "unauthorized-payment-protection",
    "name": "Unauthorized Payment Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "seller-protections",
    "desc": "Coverage for sellers against fraudulent unauthorized payment claims when transaction meets eligibility criteria including valid tracking and delivery confirmation.",
    "market": "global",
    "year": 2018
  },
  {
    "id": "chargeback-protection",
    "name": "Chargeback Protection",
    "type": "trust",
    "tier": "program",
    "status": "current",
    "parent": "seller-protections",
    "desc": "Seller coverage against buyer-initiated credit card chargebacks for eligible Managed Payments transactions with tracking confirmation to verified address.",
    "market": "global",
    "year": 2020
  },
  {
    "id": "seller-invoice",
    "name": "Seller Invoice",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Customizable invoice generation tool allowing sellers to send detailed payment requests to buyers including itemization, tax calculations, and payment terms.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "send-invoice",
    "name": "Send Invoice",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Post-sale invoicing feature enabling sellers to adjust shipping costs, add discounts, or update payment totals before buyer completes payment.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "policy-changes",
    "name": "Policy Changes",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "platform",
    "desc": "System for communicating updates to seller policies, fee structures, prohibited items, and compliance requirements through Seller Updates and Announcements.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "private-listing",
    "name": "Private Listing",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing",
    "desc": "Privacy-enhanced listing format concealing bidder and buyer identities from public view, commonly used for adult items and high-value categories requiring discretion.",
    "market": "global",
    "year": 2003
  },
  {
    "id": "bidder-identity-protection",
    "name": "Bidder Identity Protection",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "privacy",
    "desc": "Automatic masking of bidder usernames on adult category listings and private auctions to protect buyer privacy and reduce unwanted contact.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "buyer-requirements",
    "name": "Buyer Requirements",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Pre-purchase blocking system allowing sellers to restrict buyers with unpaid items, policy violations, negative feedback, or location outside approved shipping areas.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "block-buyers",
    "name": "Block Buyers",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Manual buyer blocking tool enabling sellers to create and maintain list of specific eBay usernames prohibited from bidding or purchasing their items.",
    "market": "global",
    "year": 2003
  },
  {
    "id": "purchase-limits",
    "name": "Purchase Limits",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer-requirements",
    "desc": "Quantity restrictions sellers can set to limit purchases from buyers with low feedback scores, recent account creation, or past policy violations.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "unpaid-item-case",
    "name": "Unpaid Item Case",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "compliance",
    "desc": "Dispute resolution process for sellers to recover final value fees and issue unpaid item strikes when buyers fail to complete payment within required timeframe.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "unpaid-cancellation-record",
    "name": "Unpaid Cancellation Record",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "compliance",
    "desc": "Negative mark placed on buyer's account for unpaid item violations, impacting their ability to bid and purchase after accumulating multiple strikes.",
    "market": "global",
    "year": 2013
  },
  {
    "id": "automatic-cancellation",
    "name": "Automatic Cancellation",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "compliance",
    "desc": "System-initiated transaction cancellation after 4 days of buyer non-payment, automatically refunding final value fees and allowing item relisting.",
    "market": "global",
    "year": 2018
  },
  {
    "id": "final-value-fee-credit",
    "name": "Final Value Fee Credit",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Fee refund issued to sellers when transactions are cancelled due to buyer non-payment, return closure, or other qualifying transaction failures.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "advance-refund",
    "name": "Advance Refund",
    "type": "trust",
    "tier": "feature",
    "status": "current",
    "parent": "returns",
    "desc": "Buyer protection feature providing immediate refund before return item arrives back to seller, available for qualifying transactions and seller performance levels.",
    "market": ["US", "UK"],
    "year": 2023
  },
  {
    "id": "immediate-payment-required",
    "name": "Immediate Payment Required",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing",
    "desc": "Listing option requiring buyers to complete payment immediately upon purchase, preventing unpaid item cases and ensuring faster transaction completion.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "private-offers",
    "name": "Private Offers",
    "type": "advertising",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Seller tool for sending exclusive discount offers to specific buyers via private message, commonly used for loyal customers or high-value negotiations.",
    "market": "global",
    "year": 2018
  },
  {
    "id": "private-coupon",
    "name": "Private Coupon",
    "type": "advertising",
    "tier": "feature",
    "status": "current",
    "parent": "discounts-manager",
    "desc": "Non-public coupon code creation tool for targeted distribution to specific buyer segments, email subscribers, or external marketing channels.",
    "market": "global",
    "year": 2020
  },
  {
    "id": "picture-policy",
    "name": "Picture Policy",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "compliance",
    "desc": "Listing compliance rules prohibiting stock photos, watermarks, borders, text overlays, and misleading imagery to ensure authentic product representation.",
    "market": "global",
    "year": 2015
  }
]
