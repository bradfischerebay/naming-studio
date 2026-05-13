// eBay Naming Graph - Wave 4 Batch B Enrichment
// Date: 2026-04-17
// Focus: Returns, Refunds, Condition States, Import/Customs, Fees
// Programs Enriched: 50 NEW programs
// Source: translations.ts (unenriched programs)

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

export const ENRICHED_WAVE4_B: GraphNode[] = [
  // RETURN POLICIES & MANAGEMENT (12 programs)
  {
    id: "free-returns",
    name: "Free Returns",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Seller absorbs return shipping costs, providing competitive advantage and buyer confidence through risk-free purchase experience.",
    market: "global",
    year: 2012
  },
  {
    id: "buyer-pays-return-shipping",
    name: "Buyer Pays Return Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Return shipping cost borne by buyer, reducing seller expense but creating potential friction in return process.",
    market: "global",
    year: 2000
  },
  {
    id: "seller-pays-return-shipping",
    name: "Seller Pays Return Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Seller covers return shipping costs, providing hassle-free returns that improve buyer satisfaction and Top Rated Seller eligibility.",
    market: "global",
    year: 2008
  },
  {
    id: "no-returns-accepted",
    name: "No Returns Accepted",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Seller policy declining returns, used for as-is sales but may reduce buyer confidence and search visibility.",
    market: "global",
    year: 2000
  },
  {
    id: "restocking-fee",
    name: "Restocking Fee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Seller-assessed fee (typically 10-20%) deducted from refund to cover costs of inspecting, repackaging, and relisting returned items.",
    market: "global",
    year: 2005
  },
  {
    id: "return-label",
    name: "Return Label",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Prepaid shipping label provided by seller or eBay for buyer to return items, streamlining reverse logistics.",
    market: "global",
    year: 2010
  },
  {
    id: "ebay-return-labels",
    name: "eBay Return Labels",
    type: "category",
    tier: "program",
    status: "current",
    parent: "managed-returns",
    desc: "eBay-generated prepaid return labels with integrated tracking, simplifying returns for both buyers and sellers.",
    market: "global",
    year: 2014
  },
  {
    id: "return-policy",
    name: "Return Policy",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "business-policies",
    desc: "Seller-defined rules for returns including timeframe, shipping cost responsibility, restocking fees, and refund method.",
    market: "global",
    year: 2000
  },
  {
    id: "return-policy-template",
    name: "Return Policy Template",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "business-policies",
    desc: "Reusable return policy configuration applied across multiple listings, ensuring consistency and reducing setup time.",
    market: "global",
    year: 2013
  },
  {
    id: "return-request",
    name: "Return Request",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Buyer-initiated formal request to return item, opening case workflow for seller response and resolution tracking.",
    market: "global",
    year: 2008
  },
  {
    id: "return-window",
    name: "Return Window",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Timeframe after delivery during which buyer can initiate return, typically 30 or 60 days depending on seller policy.",
    market: "global",
    year: 2000
  },
  {
    id: "hassle-free-returns",
    name: "Hassle-Free Returns",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Simplified return experience with prepaid labels and fast refunds, improving buyer confidence and seller reputation.",
    market: "global",
    year: 2016
  },

  // REFUND MANAGEMENT (5 programs)
  {
    id: "full-refund",
    name: "Full Refund",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "refunds",
    desc: "Complete reimbursement of purchase price including original shipping, required for most Money Back Guarantee cases.",
    market: "global",
    year: 2000
  },
  {
    id: "partial-refund",
    name: "Partial Refund",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "refunds",
    desc: "Proportional reimbursement reflecting item depreciation or missing components, negotiated between buyer and seller.",
    market: "global",
    year: 2005
  },
  {
    id: "send-refund",
    name: "Send Refund",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "refunds",
    desc: "Seller action to issue reimbursement through original payment method, typically processed within 3-5 business days.",
    market: "global",
    year: 2003
  },
  {
    id: "advance-refund",
    name: "Advance Refund",
    type: "trust",
    tier: "program",
    status: "current",
    parent: "money-back-guarantee",
    desc: "eBay-issued immediate refund to buyer before item is returned, improving buyer experience in dispute cases.",
    market: ["US", "UK", "DE", "AU"],
    year: 2022
  },
  {
    id: "damaged-item-claim",
    name: "Damaged Item Claim",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "resolution-center",
    desc: "Buyer-initiated case for items received with physical damage, triggering inspection and refund evaluation process.",
    market: "global",
    year: 2008
  },

  // CONDITION STATES (15 programs)
  {
    id: "new",
    name: "New",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "item-condition",
    desc: "Brand-new, unused item in original packaging with all manufacturer materials, tags, and accessories.",
    market: "global",
    year: 1995
  },
  {
    id: "brand-new",
    name: "Brand New",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "item-condition",
    desc: "Unused item in pristine original packaging, emphasizing factory-fresh state with all warranties intact.",
    market: "global",
    year: 1995
  },
  {
    id: "new-with-tags",
    name: "New with Tags",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "item-condition",
    desc: "Unworn clothing or accessories with original retail tags attached, common for fashion and apparel categories.",
    market: "global",
    year: 2000
  },
  {
    id: "new-without-tags",
    name: "New without Tags",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "item-condition",
    desc: "Unworn item where original retail tags have been removed but item remains in new, unused condition.",
    market: "global",
    year: 2005
  },
  {
    id: "new-with-box",
    name: "New with Box",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "item-condition",
    desc: "Unused item in original manufacturer packaging, common for electronics, shoes, and collectibles.",
    market: "global",
    year: 2005
  },
  {
    id: "new-without-box",
    name: "New without Box",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "item-condition",
    desc: "Unused item where original packaging has been discarded but product remains in new condition.",
    market: "global",
    year: 2005
  },
  {
    id: "new-with-defects",
    name: "New with Defects",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "item-condition",
    desc: "Brand-new item with cosmetic or functional imperfections, sold at discount with disclosed flaws.",
    market: "global",
    year: 2010
  },
  {
    id: "new-other",
    name: "New Other",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "item-condition",
    desc: "New item not in original packaging or with minor issues that don't affect functionality, requiring detailed description.",
    market: "global",
    year: 2008
  },
  {
    id: "like-new",
    name: "Like New",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "item-condition",
    desc: "Previously owned item in excellent condition with minimal signs of use, appearing nearly new.",
    market: "global",
    year: 2000
  },
  {
    id: "used",
    name: "Used",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "item-condition",
    desc: "Previously owned item showing normal wear from use but fully functional, with condition details required.",
    market: "global",
    year: 1995
  },
  {
    id: "pre-owned",
    name: "Pre-owned",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "item-condition",
    desc: "Previously owned item with varying levels of wear, functionally equivalent to Used but perceived as less negative.",
    market: "global",
    year: 2005
  },
  {
    id: "for-parts",
    name: "For Parts",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "item-condition",
    desc: "Non-functional item sold for salvageable components, harvesting, or repair practice.",
    market: "global",
    year: 2000
  },
  {
    id: "for-parts-or-not-working",
    name: "For Parts or Not Working",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "item-condition",
    desc: "Item with functional defects or damage, sold as-is for parts harvesting or repair projects without guarantees.",
    market: "global",
    year: 2003
  },
  {
    id: "opened-never-used",
    name: "Opened - Never Used",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "item-condition",
    desc: "Item removed from packaging but never used, common for electronics, gifts, or returned items.",
    market: "global",
    year: 2010
  },
  {
    id: "condition-description",
    name: "Condition Description",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "item-condition",
    desc: "Seller-provided detailed text explaining item's physical state, wear patterns, defects, and included components.",
    market: "global",
    year: 2000
  },

  // SELLER FEES (8 programs)
  {
    id: "final-value-fee",
    name: "Final Value Fee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-fees",
    desc: "Percentage-based commission on total sale price including shipping, charged when item sells.",
    market: "global",
    year: 2001
  },
  {
    id: "insertion-fee",
    name: "Insertion Fee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-fees",
    desc: "Per-listing charge assessed when item is published, with monthly free listing allotments for most sellers.",
    market: "global",
    year: 1999
  },
  {
    id: "listing-fee",
    name: "Listing Fee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-fees",
    desc: "Upfront charge for creating listing, synonymous with insertion fee in most markets.",
    market: "global",
    year: 1999
  },
  {
    id: "per-order-fee",
    name: "Per Order Fee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-fees",
    desc: "Fixed fee charged per completed transaction regardless of item price, typically $0.30 in US market.",
    market: "global",
    year: 2019
  },
  {
    id: "promoted-listings-fee",
    name: "Promoted Listings Fee",
    type: "advertising",
    tier: "feature",
    status: "current",
    parent: "promoted-listings",
    desc: "Ad rate percentage charged on sale price when promoted listing generates attributed sale.",
    market: "global",
    year: 2015
  },
  {
    id: "special-duration-fee",
    name: "Special Duration Fee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-fees",
    desc: "Additional charge for auction listings with non-standard durations (1, 3, 5, or 10 days instead of 7).",
    market: "global",
    year: 2000
  },
  {
    id: "final-value-fee-credit",
    name: "Final Value Fee Credit",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-fees",
    desc: "Refund of final value fees when buyer doesn't pay, cancels transaction, or returns item under approved circumstances.",
    market: "global",
    year: 2005
  },
  {
    id: "regulatory-operating-fee",
    name: "Regulatory Operating Fee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-fees",
    desc: "Compliance fee covering regulatory costs in specific markets, particularly for high-value collectibles and luxury items.",
    market: ["US"],
    year: 2022
  },

  // IMPORT, CUSTOMS & INTERNATIONAL FEES (5 programs)
  {
    id: "import-charges",
    name: "Import Charges",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "international-trade",
    desc: "Aggregate fees for cross-border shipments including customs duties, taxes, and handling charges.",
    market: "global",
    year: 2012
  },
  {
    id: "customs-duties",
    name: "Customs Duties",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "international-trade",
    desc: "Government-imposed tariffs on imported goods based on product category, value, and origin country.",
    market: "global",
    year: 2012
  },
  {
    id: "customs-clearance",
    name: "Customs Clearance",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "international-trade",
    desc: "Documentation and inspection process required for international shipments to enter destination country legally.",
    market: "global",
    year: 2012
  },
  {
    id: "import-vat",
    name: "Import VAT",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "international-trade",
    desc: "Value-added tax assessed on imported goods at destination country's border, collected before delivery.",
    market: ["UK", "DE", "FR", "IT", "AU"],
    year: 2016
  },
  {
    id: "international-transaction-fee",
    name: "International Transaction Fee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-fees",
    desc: "Additional seller fee for cross-border sales, covering currency conversion and international payment processing.",
    market: "global",
    year: 2015
  },

  // POLICY & PREFERENCE FEATURES (5 programs)
  {
    id: "return-preferences",
    name: "Return Preferences",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "business-policies",
    desc: "Seller-configured default return settings applied to new listings, streamlining policy management.",
    market: "global",
    year: 2013
  },
  {
    id: "returns-accepted",
    name: "Returns Accepted",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Seller commitment to accept returns within specified timeframe, improving buyer confidence and search ranking.",
    market: "global",
    year: 2000
  },
  {
    id: "buyer-paid-returns",
    name: "Buyer-Paid Returns",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Return shipping cost responsibility assigned to buyer, reducing seller expense but potentially decreasing conversion.",
    market: "global",
    year: 2000
  },
  {
    id: "seller-paid-returns",
    name: "Seller-Paid Returns",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Seller absorbs return shipping costs, meeting Top Rated Seller requirements and improving buyer satisfaction.",
    market: "global",
    year: 2008
  },
  {
    id: "accepts-returns-filter",
    name: "Accepts Returns Filter",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "search-filters",
    desc: "Search refinement allowing buyers to show only listings from sellers who accept returns.",
    market: "global",
    year: 2010
  }
]
