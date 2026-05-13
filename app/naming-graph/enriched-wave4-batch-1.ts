// eBay Naming Graph - Wave 4 Batch 1
// Focus: Order Management, Fulfillment Workflows, Cancellations, Modifications
// 50 NEW programs not in enriched-consolidated-DEDUPLICATED.ts
// Generated: 2026-04-17

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

export const ENRICHED_WAVE4_1: GraphNode[] = [
  // ORDER MANAGEMENT CORE
  {
    id: "cancel-order",
    name: "Cancel Order",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "order-management",
    desc: "Allows buyers and sellers to cancel orders before shipment. Mutual cancellation requires both parties' agreement; seller-initiated requires valid reason (out of stock, pricing error). Tracked in defect metrics.",
    market: "global",
    year: 2004
  },
  {
    id: "cancellation-request",
    name: "Cancellation Request",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "order-management",
    desc: "Buyer-initiated request to cancel an order after purchase but before shipment. Seller can accept or decline; refusal requires item to ship within handling time to avoid defect.",
    market: "global",
    year: 2010
  },
  {
    id: "order-confirmation",
    name: "Order Confirmation",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "order-management",
    desc: "Automated email and My eBay notification sent immediately after purchase confirming transaction details, payment status, and seller contact. Required for all completed transactions.",
    market: "global",
    year: 2000
  },
  {
    id: "view-order-details",
    name: "View Order Details",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "order-management",
    desc: "Seller Hub and My eBay interface showing complete order information including buyer details, shipping address, payment status, tracking, messages, and transaction timeline.",
    market: "global",
    year: 2008
  },
  {
    id: "order-number",
    name: "Order Number",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "order-management",
    desc: "Unique identifier assigned to each transaction for tracking, customer service reference, and API integration. Format varies by transaction type (auction vs fixed price).",
    market: "global",
    year: 1999
  },
  {
    id: "completed-orders",
    name: "Completed Orders",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "order-management",
    desc: "Seller Hub view showing orders marked as shipped/delivered with tracking uploaded. Moves orders out of 'awaiting shipment' queue. Impacts late shipment rate if not completed within handling time.",
    market: "global",
    year: 2008
  },
  {
    id: "unpaid-cancellation-record",
    name: "Unpaid Cancellation Record",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "order-management",
    desc: "Buyer defect recorded when order is cancelled due to non-payment after 4+ days. Excessive unpaid items can lead to buying restrictions. Sellers can open unpaid item case after 2 days.",
    market: "global",
    year: 2009
  },
  {
    id: "automatic-cancellation",
    name: "Automatic Cancellation",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "order-management",
    desc: "System-initiated order cancellation triggered by non-payment after 4 days (standard) or 30 days (unpaid item case). Refunds buyer, credits seller fees, records unpaid item strike.",
    market: "global",
    year: 2012
  },

  // SHIPPING & FULFILLMENT ACTIONS
  {
    id: "print-shipping-label",
    name: "Print Shipping Label",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Seller Hub tool for purchasing and printing USPS, FedEx, UPS labels with discounted rates (up to 70% off retail). Automatically uploads tracking and marks item as shipped.",
    market: ["US", "UK", "AU", "CA"],
    year: 2006
  },
  {
    id: "mark-as-shipped",
    name: "Mark as Shipped",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Manual action in Seller Hub to confirm shipment without uploading tracking. Triggers buyer notification but doesn't provide tracking benefit. Lower trust signal than tracked shipping.",
    market: "global",
    year: 2004
  },
  {
    id: "upload-tracking",
    name: "Upload Tracking",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Seller action to add carrier tracking number to order. Required for Top Rated seller status, protects against item not received cases, improves search ranking. Validates tracking with carrier API.",
    market: "global",
    year: 2011
  },
  {
    id: "tracking-number",
    name: "Tracking Number",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Carrier-provided identifier for package tracking. eBay validates and monitors tracking events (acceptance scan, in-transit, delivered) for seller performance metrics and buyer protection.",
    market: "global",
    year: 2008
  },
  {
    id: "package-tracking",
    name: "Package Tracking",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Real-time shipment monitoring interface in My eBay showing carrier updates, estimated delivery, and delivery confirmation. Reduces item not received cases by 40% when used.",
    market: "global",
    year: 2012
  },
  {
    id: "shipment-confirmation",
    name: "Shipment Confirmation",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Automated buyer notification sent when seller marks item shipped or uploads tracking. Includes carrier info, tracking link, estimated delivery. Critical trust signal in buyer journey.",
    market: "global",
    year: 2006
  },

  // SHIPPING METHODS & RATES
  {
    id: "calculated-shipping",
    name: "Calculated Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Dynamic shipping cost based on package weight/dimensions and buyer's ZIP code, calculated via carrier APIs. Reduces seller risk of undercharging for distant/heavy shipments.",
    market: ["US", "UK", "AU", "CA"],
    year: 2003
  },
  {
    id: "flat-rate-shipping",
    name: "Flat Rate Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Fixed shipping price regardless of buyer location. Simpler for buyers but may result in seller losses on distant shipments or gains on local ones. Common for lightweight items.",
    market: "global",
    year: 2001
  },
  {
    id: "free-shipping",
    name: "Free Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "No-cost shipping to buyer (seller absorbs cost). Major search ranking boost (~10-20% visibility increase), conversion lift, and Best Match advantage. Often subsidized into item price.",
    market: "global",
    year: 2009
  },
  {
    id: "combined-shipping",
    name: "Combined Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Shipping discount when buyer purchases multiple items from same seller. Seller sets rules (e.g., $2 first item, $1 each additional). Increases cart size and repeat purchases.",
    market: ["US", "UK", "AU", "CA"],
    year: 2005
  },
  {
    id: "expedited-shipping",
    name: "Expedited Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Faster shipping options (1-4 days) offered as buyer upgrade from standard/economy. Typically FedEx 2Day, USPS Priority, UPS 2nd Day Air. Increases conversion for time-sensitive purchases.",
    market: "global",
    year: 2002
  },
  {
    id: "standard-shipping",
    name: "Standard Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Default shipping tier with typical 3-8 day delivery (USPS First Class/Parcel Select, FedEx Ground). Most common buyer selection balancing cost and speed.",
    market: "global",
    year: 2000
  },
  {
    id: "economy-shipping",
    name: "Economy Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Slowest, lowest-cost option (8-21 days) for price-sensitive buyers. Typical carriers: USPS Media Mail, ePacket international. Higher risk of late delivery defects.",
    market: "global",
    year: 2008
  },
  {
    id: "local-delivery",
    name: "Local Delivery",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Seller hand-delivers item to buyer within local area (no carrier used). Common for large/fragile items (furniture, auto parts). Requires mutual agreement and safe handoff protocol.",
    market: "global",
    year: 2015
  },

  // HANDLING TIME & DISPATCH
  {
    id: "same-day-handling",
    name: "Same-Day Handling",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Seller commitment to ship item same business day as payment received (if paid before cutoff time). Premium service signal improving search rank and conversion.",
    market: "global",
    year: 2015
  },
  {
    id: "handling-time",
    name: "Handling Time",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Number of business days seller has to ship after payment. Combined with shipping transit time for delivery estimate. Late shipments beyond handling time incur performance defects.",
    market: "global",
    year: 2008
  },
  {
    id: "estimated-delivery",
    name: "Estimated Delivery",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Calculated delivery date range shown to buyers based on handling time + carrier transit time + seller location. Major purchase decision factor; accuracy monitored for performance.",
    market: "global",
    year: 2012
  },
  {
    id: "estimated-delivery-date",
    name: "Estimated Delivery Date",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Specific date (not range) shown on high-confidence listings where seller has 1-day handling + tracked carrier with reliable transit data. Stronger conversion signal than date range.",
    market: ["US", "UK", "AU"],
    year: 2018
  },
  {
    id: "expected-delivery-date",
    name: "Expected Delivery Date",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Updated delivery date shown in tracking after shipment, based on real-time carrier scan data. Replaces original estimate if package delayed or accelerated.",
    market: "global",
    year: 2016
  },

  // DELIVERY SPEED BADGES
  {
    id: "free-2-day-shipping",
    name: "Free 2-Day Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Seller-funded 2-day delivery with no buyer cost. Search badge/filter requiring Top Rated seller + fast handling + eligible carrier service. Competes with Amazon Prime expectations.",
    market: "US",
    year: 2018
  },
  {
    id: "free-3-day-shipping",
    name: "Free 3-Day Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Search badge indicating free shipping with 3-day delivery window. Lower threshold than 2-day, more accessible to broader seller base. Moderate search ranking boost.",
    market: ["US", "UK"],
    year: 2019
  },
  {
    id: "free-4-day-shipping",
    name: "Free 4-Day Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Entry-level fast+free badge for sellers unable to meet 2-3 day thresholds. Still provides search advantage over standard shipping. Common for cross-country US shipments.",
    market: "US",
    year: 2020
  },

  // SHIPPING POLICIES & SETTINGS
  {
    id: "shipping-policy",
    name: "Shipping Policy",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Seller-defined rules for shipping costs, carriers, handling time, and excluded locations. Displayed in listing; can be saved as template for reuse across multiple listings.",
    market: "global",
    year: 2006
  },
  {
    id: "excluded-shipping-locations",
    name: "Excluded Shipping Locations",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Countries or regions seller will not ship to (e.g., PO boxes, Alaska/Hawaii, international). Blocks buyers from those areas from purchasing. Common for heavy/restricted items.",
    market: "global",
    year: 2004
  },
  {
    id: "ship-from-location",
    name: "Ship From Location",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "ZIP code or city where item ships from. Used to calculate shipping costs and delivery estimates. Visible to buyers for transparency; influences trust in domestic vs international sellers.",
    market: "global",
    year: 2002
  },
  {
    id: "package-dimensions",
    name: "Package Dimensions",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Length x width x height entered by seller for calculated shipping. Used by carrier APIs for rate calculation. Inaccuracies can cause shipment delays or buyer overcharge disputes.",
    market: ["US", "UK", "AU", "CA"],
    year: 2003
  },
  {
    id: "package-weight",
    name: "Package Weight",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Item weight including packaging materials, required for calculated shipping. Carriers validate against actual weight; significant discrepancies trigger seller warnings or shipping delays.",
    market: ["US", "UK", "AU", "CA"],
    year: 2003
  },

  // REFUNDS
  {
    id: "full-refund",
    name: "Full Refund",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Complete reimbursement of item price + original shipping to buyer. Required for INR (item not received) and SNAD (not as described) cases. Seller can issue voluntarily to avoid case.",
    market: "global",
    year: 2004
  },
  {
    id: "partial-refund",
    name: "Partial Refund",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Negotiated reimbursement less than full price to resolve minor defects without return. Buyer must accept offer. Common for small damage, missing accessories, or pricing disputes.",
    market: "global",
    year: 2008
  },
  {
    id: "send-refund",
    name: "Send Refund",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Seller action in Resolution Center to issue refund without requiring return. Processed through original payment method (PayPal, credit card). Closes case when accepted.",
    market: "global",
    year: 2006
  },
  {
    id: "advance-refund",
    name: "Advance Refund",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Refund issued to buyer before return item is received by seller. Optional seller gesture to improve buyer experience. Risk: buyer may not return item, requiring eBay case escalation.",
    market: "global",
    year: 2014
  },

  // RETURN POLICIES
  {
    id: "free-returns",
    name: "Free Returns",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Seller pays return shipping cost. Major search ranking boost (~15% visibility increase), Top Rated Plus requirement, and conversion advantage. Can use prepaid labels or reimburse.",
    market: "global",
    year: 2013
  },
  {
    id: "buyer-pays-return-shipping",
    name: "Buyer Pays Return Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Buyer covers return shipping cost for remorse returns (not SNAD). Lower search visibility than free returns, but reduces seller cost. Seller still pays for defective items.",
    market: "global",
    year: 2008
  },
  {
    id: "seller-pays-return-shipping",
    name: "Seller Pays Return Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Seller-funded return shipping. Same as Free Returns; terminology varies by market (UK: 'postage'). Provides prepaid label or reimburses buyer for shipping cost.",
    market: "global",
    year: 2013
  },
  {
    id: "no-returns-accepted",
    name: "No Returns Accepted",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Seller does not accept remorse returns. Buyer still protected by Money Back Guarantee for SNAD/INR. Significant search ranking penalty; uncommon except for custom/final-sale items.",
    market: "global",
    year: 2004
  },
  {
    id: "return-policy",
    name: "Return Policy",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Seller-defined rules for returns: window (30/60 days), who pays shipping, restocking fees, refund method. Displayed prominently in listing; major purchase decision factor.",
    market: "global",
    year: 2004
  },
  {
    id: "return-policy-template",
    name: "Return Policy Template",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Saved return policy configuration reusable across listings. Ensures consistency and saves time during bulk listing creation. Editable at account or individual listing level.",
    market: "global",
    year: 2016
  },
  {
    id: "return-request",
    name: "Return Request",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Buyer-initiated request to return item via Resolution Center. Seller must respond within 3 days with return label or decline (triggers escalation). Starts return case timeline.",
    market: "global",
    year: 2012
  },
  {
    id: "return-label",
    name: "Return Label",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Prepaid shipping label sent to buyer for return. Seller can purchase through eBay (deducted from refund) or provide own. Tracking auto-updates return case status.",
    market: ["US", "UK", "AU", "CA"],
    year: 2014
  },
  {
    id: "return-shipping",
    name: "Return Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Cost and logistics of sending item back to seller. Payer depends on return reason: seller pays for SNAD/defect, buyer pays for remorse (unless free returns offered).",
    market: "global",
    year: 2004
  },
  {
    id: "restocking-fee",
    name: "Restocking Fee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Percentage deducted from refund (max 20%) for opened items in remorse returns. Must be disclosed in return policy. Not allowed for SNAD/defective items. Reduces buyer willingness to return.",
    market: ["US", "CA"],
    year: 2006
  },

  // INVOICING & PAYMENT TOOLS
  {
    id: "send-invoice",
    name: "Send Invoice",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "order-management",
    desc: "Seller action to send updated total to buyer after purchase, typically for combined shipping discount or added insurance. Buyer must pay revised amount before shipment.",
    market: "global",
    year: 2004
  },
  {
    id: "request-total",
    name: "Request Total",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "order-management",
    desc: "Buyer action requesting seller send invoice with combined shipping discount before payment. Common when purchasing multiple items to save on shipping costs.",
    market: "global",
    year: 2005
  }
]
