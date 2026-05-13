import type { NodeEnrichmentV2 } from './enriched-v2-batch-01-trust'

// Batch 5e — UI States, Actions, Functional Labels (Part 1)
// Covers: Account/security, tax compliance, seller performance standards,
// offer states, order management, returns, payment states, feedback actions,
// listing actions, account settings, search & filter UI, shipping states

export const STATES_ACTIONS_ENRICHMENT: NodeEnrichmentV2[] = [

  // ── ACCOUNT SECURITY ──────────────────────────────────────────────────────

  {
    id: '2-step-verification',
    valueProp: 'Two-step verification adds a second authentication factor — requiring a one-time code in addition to a password — so that a stolen password alone cannot compromise an eBay account.',
    valueTerritories: ['trust', 'protection'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability', 'long-term'],
    citations: ['https://www.ebay.com/help/account/protecting-account/account-security-overview'],
  },

  {
    id: 'authenticator-app',
    valueProp: 'Authenticator App is the option within two-step verification that generates time-based one-time codes via an authenticator application — offering stronger account security than SMS-based codes.',
    valueTerritories: ['trust', 'protection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/protecting-account/account-security-overview'],
  },

  {
    id: 'biometric-verification',
    valueProp: 'Biometric Verification uses fingerprint or face recognition to authenticate a user on mobile — removing the need to type a password while maintaining strong access control.',
    valueTerritories: ['trust', 'convenience', 'protection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/protecting-account/account-security-overview'],
  },

  {
    id: 'account-settings',
    valueProp: 'Account Settings is the centralized hub where users manage personal information, payment methods, notifications, and preferences — the control panel for a user\'s entire eBay experience.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/mye/myebay/summary'],
  },

  {
    id: 'account-suspended',
    valueProp: 'Account Suspended is the system state indicating a user\'s ability to buy or sell has been temporarily or permanently revoked due to policy violations — displayed as a status label in account and communication flows.',
    valueTerritories: ['trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/policies/selling-policies/seller-performance-policy'],
  },

  {
    id: 'account-management-plus',
    valueProp: 'Account Management Plus is a premium seller support tier offering a named account manager for high-volume sellers — combining dedicated guidance with proactive account optimization.',
    valueTerritories: ['trust', 'convenience'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability', 'long-term'],
    citations: ['https://www.ebay.com/sellercenter/resources/account-management'],
  },

  {
    id: 'account-management-premium',
    valueProp: 'Account Management Premium is the highest-tier dedicated account management offering for enterprise sellers — providing the deepest level of strategic support, business reviews, and direct escalation access.',
    valueTerritories: ['trust', 'convenience'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability', 'long-term'],
    citations: ['https://www.ebay.com/sellercenter/resources/account-management'],
  },

  // ── TAX & FINANCIAL COMPLIANCE ───────────────────────────────────────────

  {
    id: '1099-k-tax-form',
    valueProp: '1099-K Tax Form is the US IRS reporting document eBay issues to qualifying sellers — documenting gross payment volume to meet federal tax reporting obligations and help sellers file accurately.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/fees-credits-invoices/tax-information'],
  },

  {
    id: 'tax-documents',
    valueProp: 'Tax Documents is the section of Seller Hub where sellers access annual tax forms, 1099-K reports, and VAT invoices — consolidating all tax-related financial documentation in one place.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/fees-credits-invoices/tax-information'],
  },

  {
    id: 'vat-collection',
    valueProp: 'VAT Collection is eBay\'s mechanism for automatically calculating, collecting, and remitting Value Added Tax on eligible transactions in VAT-applicable markets — reducing compliance burden for international sellers.',
    valueTerritories: ['trust', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability', 'multi-market'],
    citations: ['https://www.ebay.com/help/selling/fees-credits-invoices/vat-and-other-taxes'],
  },

  {
    id: 'sales-tax-collection',
    valueProp: 'Sales Tax Collection is eBay\'s automatic calculation and collection of applicable US state sales tax at checkout — keeping sellers compliant with marketplace facilitator laws without manual effort.',
    valueTerritories: ['trust', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/fees-credits-invoices/tax-information'],
  },

  // ── SELLER PERFORMANCE STANDARDS ─────────────────────────────────────────

  {
    id: 'above-standard',
    valueProp: 'Above Standard is the seller performance rating tier indicating consistent, reliable service — buyers and eBay\'s systems recognize Above Standard sellers as dependable, helping maintain good search visibility.',
    valueTerritories: ['trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/selling/seller-performance-standards'],
  },

  {
    id: 'below-standard',
    valueProp: 'Below Standard is the seller performance rating indicating failure to meet minimum service thresholds — triggering search placement penalties and increased scrutiny until the seller improves their metrics.',
    valueTerritories: ['trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/selling/seller-performance-standards'],
  },

  {
    id: 'seasonal-seller-standards',
    valueProp: 'Seasonal Seller Standards is the adjusted performance evaluation framework that accounts for peak-period volume spikes — preventing temporary holiday-season metrics from unfairly impacting annual seller standing.',
    valueTerritories: ['trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/selling/seller-performance-standards'],
  },

  {
    id: 'cases-closed-without-seller-resolution',
    valueProp: 'Cases Closed Without Seller Resolution is the performance metric tracking how often buyer disputes were escalated to eBay rather than resolved directly by the seller — a key indicator in seller standards evaluation.',
    valueTerritories: ['trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/selling/seller-performance-standards'],
  },

  {
    id: 'late-shipment-rate',
    valueProp: 'Late Shipment Rate is the percentage of transactions where the seller failed to ship within the stated handling time — a core performance metric that affects seller standards and search visibility.',
    valueTerritories: ['trust', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/selling/seller-performance-standards'],
  },

  {
    id: 'transaction-defect-rate',
    valueProp: 'Transaction Defect Rate is the percentage of a seller\'s transactions that resulted in a cancelled order or eBay-closed case — a primary measure of overall selling quality in the standards framework.',
    valueTerritories: ['trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/selling/seller-performance-standards'],
  },

  {
    id: 'valid-tracking-rate',
    valueProp: 'Valid Tracking Rate is the percentage of a seller\'s transactions with an uploaded, valid tracking number — ensuring buyers can monitor their shipments and sellers can maintain top performance status.',
    valueTerritories: ['trust', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/selling/seller-performance-standards'],
  },

  // ── OFFER STATES ─────────────────────────────────────────────────────────

  {
    id: 'accept-offer',
    valueProp: 'Accept Offer is the seller action that confirms a buyer\'s Best Offer at the proposed price — completing the negotiation and immediately converting the offer into a pending purchase.',
    valueTerritories: ['convenience', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/managing-best-offers'],
  },

  {
    id: 'decline-offer',
    valueProp: 'Decline Offer is the seller action that rejects a buyer\'s Best Offer — notifying the buyer the price was not accepted and leaving the listing available for other buyers or counter-offers.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/managing-best-offers'],
  },

  {
    id: 'counter-offer',
    valueProp: 'Counter Offer is the seller\'s response to a buyer\'s Best Offer with a different price — extending the negotiation and giving the buyer the option to accept, decline, or counter again.',
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/managing-best-offers'],
  },

  {
    id: 'counteroffer',
    valueProp: 'Counteroffer is the alternative spelling of Counter Offer used across eBay UI surfaces — the same negotiation action where either party proposes a modified price in a Best Offer exchange.',
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/managing-best-offers'],
  },

  {
    id: 'offer-accepted',
    valueProp: 'Offer Accepted is the status label shown when a Best Offer has been approved by the seller — indicating to the buyer that their proposed price was successful and they can proceed to checkout.',
    valueTerritories: ['convenience', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/making-offer'],
  },

  {
    id: 'offer-declined',
    valueProp: 'Offer Declined is the status label shown when a seller has rejected a buyer\'s Best Offer price — informing the buyer the negotiation ended without agreement.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/making-offer'],
  },

  {
    id: 'offer-expires',
    valueProp: 'Offer Expires is the time-limited status shown on active Best Offers — reminding both parties that an unresponded offer will automatically expire, creating urgency to act.',
    valueTerritories: ['transparency', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/making-offer'],
  },

  {
    id: 'offer-history',
    valueProp: 'Offer History is the log of all Best Offer exchanges on a listing — showing each offer, counter-offer, acceptance, or decline in sequence for both buyer and seller reference.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/managing-best-offers'],
  },

  {
    id: 'offer-sent',
    valueProp: 'Offer Sent is the status label confirming a Best Offer has been submitted to the seller — the buyer\'s pending state while awaiting acceptance, rejection, or a counter.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/making-offer'],
  },

  {
    id: 'offers-received',
    valueProp: 'Offers Received is the Seller Hub section listing all incoming Best Offers awaiting the seller\'s response — the primary queue for offer management.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/managing-best-offers'],
  },

  {
    id: 'offers-sent',
    valueProp: 'Offers Sent is the buyer-side view of all Best Offers they have submitted — showing pending, accepted, declined, and expired offer status in one place.',
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/making-offer'],
  },

  {
    id: 'review-offer',
    valueProp: 'Review Offer is the seller action prompt to evaluate a pending Best Offer — the CTA that opens the offer detail page for a seller to accept, decline, or counter.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/managing-best-offers'],
  },

  {
    id: 'make-an-offer',
    valueProp: 'Make an Offer is the buyer-facing call-to-action that initiates a Best Offer negotiation on an eligible listing — the entry point for price negotiation between buyer and seller.',
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/making-offer'],
  },

  {
    id: 'make-offer',
    valueProp: 'Make Offer is the shortened label variant of Make an Offer used across mobile and compact UI surfaces — the same Best Offer initiation action in abbreviated form.',
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/making-offer'],
  },

  {
    id: 'make-offer-button',
    valueProp: 'Make Offer Button is the UI component on eligible listings that triggers the Best Offer flow — the visible interaction element buyers tap to begin price negotiation.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/making-offer'],
  },

  {
    id: 'send-offer',
    valueProp: 'Send Offer is the seller action within Offers to Buyers that proactively sends a discounted price to an interested buyer — enabling sellers to convert watchers into purchasers.',
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/offers-to-buyers'],
  },

  // ── ORDER MANAGEMENT ─────────────────────────────────────────────────────

  {
    id: 'cancel-order',
    valueProp: 'Cancel Order is the action allowing buyers or sellers to void a completed transaction before it ships — triggering a cancellation request flow, refund initiation, and performance metric recording.',
    valueTerritories: ['convenience', 'protection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/cancelled-orders'],
  },

  {
    id: 'cancellation-request',
    valueProp: 'Cancellation Request is the formal state when a buyer or seller has initiated an order cancellation — both parties see the request in their order management views pending resolution.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/cancelled-orders'],
  },

  {
    id: 'order-details',
    valueProp: 'Order Details is the full record page for a completed transaction — showing item, price, shipping, payment, and current fulfillment status for both buyer and seller reference.',
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/mye/myebay/purchase'],
  },

  {
    id: 'order-total',
    valueProp: 'Order Total is the final calculated amount a buyer pays — combining item price, shipping cost, taxes, and any applied discounts into a single summary line before or after checkout.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/paying-items/how-checkout-works'],
  },

  {
    id: 'order-updates',
    valueProp: 'Order Updates are notifications sent to buyers about shipping progress, delivery, and any order changes — keeping buyers informed from purchase to delivery without needing to check manually.',
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/tracking-orders/tracking-orders'],
  },

  {
    id: 'refund-issued',
    valueProp: 'Refund Issued is the status label confirming a return refund or dispute resolution payment has been processed — giving buyers confirmation that their money is on the way.',
    valueTerritories: ['trust', 'protection', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/returns-refunds/getting-refund'],
  },

  {
    id: 'send-refund',
    valueProp: 'Send Refund is the seller action to manually issue a refund to a buyer — used outside the standard return flow for goodwill adjustments or resolved disputes.',
    valueTerritories: ['trust', 'protection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/managing-orders/handling-returns-refunds'],
  },

  {
    id: 'send-invoice',
    valueProp: 'Send Invoice is the seller action to send a payment request to a buyer who has committed to purchase but not yet paid — includes item total, shipping, and payment instructions.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/managing-orders/sending-invoices'],
  },

  {
    id: 'send-message',
    valueProp: 'Send Message is the action that opens the eBay messaging system to contact a buyer or seller — enabling post-purchase communication, questions, and dispute resolution within eBay\'s platform.',
    valueTerritories: ['convenience', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/messaging/messaging'],
  },

  // ── RETURN STATES ────────────────────────────────────────────────────────

  {
    id: 'accept-return',
    valueProp: 'Accept Return is the seller action to approve a buyer\'s return request — initiating the return shipping label process and committing the seller to a refund upon item receipt.',
    valueTerritories: ['protection', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/managing-orders/handling-returns-refunds'],
  },

  {
    id: 'return-approved',
    valueProp: 'Return Approved is the status confirming the seller or eBay has accepted a buyer\'s return request — the buyer can now ship the item back and expect a refund.',
    valueTerritories: ['protection', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/returns-refunds/returning-item'],
  },

  {
    id: 'return-received',
    valueProp: 'Return Received is the status indicating the seller has confirmed receipt of a returned item — typically triggering the refund issuance process.',
    valueTerritories: ['transparency', 'protection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/managing-orders/handling-returns-refunds'],
  },

  {
    id: 'return-requested',
    valueProp: 'Return Requested is the initial status when a buyer has submitted a return request — alerting the seller to respond within the required timeframe.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/returns-refunds/returning-item'],
  },

  {
    id: 'return-shipped',
    valueProp: 'Return Shipped is the status indicating the buyer has sent the item back — with tracking information visible to the seller while the return is in transit.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/returns-refunds/returning-item'],
  },

  {
    id: 'request-return',
    valueProp: 'Request Return is the buyer action that opens a return case — the starting point for exercising eBay\'s buyer protection and return policies on a purchased item.',
    valueTerritories: ['protection', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/returns-refunds/returning-item'],
  },

  {
    id: 'return-preferences',
    valueProp: 'Return Preferences is the seller settings section where sellers define their return policy terms — duration, who pays return shipping, and whether they accept returns — applied automatically to all listings.',
    valueTerritories: ['convenience', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/return-policy'],
  },

  {
    id: 'managed-returns',
    valueProp: 'Managed Returns is eBay\'s automated return handling system that pre-generates return labels and enforces policy timelines — reducing seller workload and ensuring consistent buyer protection outcomes.',
    valueTerritories: ['protection', 'convenience', 'trust'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability', 'long-term'],
    citations: ['https://www.ebay.com/help/selling/managing-orders/handling-returns-refunds'],
  },

  // ── PAYMENT STATES ───────────────────────────────────────────────────────

  {
    id: 'payment-dispute',
    valueProp: 'Payment Dispute is a chargeback or payment reversal initiated by a buyer through their bank or card issuer — eBay\'s Managed Payments team handles dispute resolution on behalf of the seller.',
    valueTerritories: ['protection', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/getting-paid/payment-disputes'],
  },

  {
    id: 'payment-failed',
    valueProp: 'Payment Failed is the transaction state indicating a buyer\'s payment attempt was declined or could not be processed — prompting the buyer to update their payment method or try another.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/paying-items/paying-items'],
  },

  {
    id: 'payment-holds',
    valueProp: 'Payment Holds are temporary delays in releasing seller funds — applied based on risk signals, new-seller status, or high-volume spikes — with eBay releasing the hold after the transaction is confirmed complete.',
    valueTerritories: ['trust', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/getting-paid/payment-holds'],
  },

  {
    id: 'payment-pending',
    valueProp: 'Payment Pending is the transaction state indicating a buyer\'s payment is in process but not yet confirmed — common in bank transfer or e-check payment methods that take time to clear.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/paying-items/paying-items'],
  },

  {
    id: 'payment-processing',
    valueProp: 'Payment Processing is the active state when a transaction payment is being authorized and captured — a brief intermediate status between buyer submission and final confirmation.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/paying-items/paying-items'],
  },

  {
    id: 'payment-received',
    valueProp: 'Payment Received is the status confirming a seller\'s payment has cleared and is credited — the trigger for order fulfillment and the point at which sellers can safely ship.',
    valueTerritories: ['transparency', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/getting-paid/getting-paid'],
  },

  {
    id: 'payouts-on-demand',
    valueProp: 'Payouts on Demand is the seller feature enabling same-day fund disbursement outside the standard payout schedule — giving sellers immediate access to their earnings when needed.',
    valueTerritories: ['speed', 'convenience'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/getting-paid/payout-schedule'],
  },

  {
    id: 'daily-payout',
    valueProp: 'Daily Payout is the seller payout frequency option that releases available funds to the seller\'s bank account every day — maximizing cash flow for active sellers.',
    valueTerritories: ['speed', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/getting-paid/payout-schedule'],
  },

  {
    id: 'weekly-payout',
    valueProp: 'Weekly Payout is the seller payout frequency option that batches accumulated funds into a single weekly disbursement — offering predictable cash flow timing for sellers who prefer consolidated transfers.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/getting-paid/payout-schedule'],
  },

  {
    id: 'express-payouts',
    valueProp: 'Express Payouts is the accelerated payout option that transfers available seller funds faster than the standard schedule — available for a small fee and useful when sellers need immediate access to earnings.',
    valueTerritories: ['speed', 'convenience'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/getting-paid/payout-schedule'],
  },

  {
    id: 'instant-payout',
    valueProp: 'Instant Payout is the real-time fund transfer option allowing sellers to receive their earnings immediately rather than waiting for scheduled disbursements — delivered via supported debit cards.',
    valueTerritories: ['speed', 'convenience'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/getting-paid/payout-schedule'],
  },

  {
    id: 'pay-now',
    valueProp: 'Pay Now is the buyer CTA to complete payment on a committed purchase — the primary payment initiation button in post-purchase flows and invoice emails.',
    valueTerritories: ['speed', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/paying-items/paying-items'],
  },

  {
    id: 'add-payment-method',
    valueProp: 'Add Payment Method is the account action for entering a new credit card, debit card, or bank account — expanding the buyer\'s payment options for faster future checkouts.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/paying-items/paying-items'],
  },

  {
    id: 'edit-payment',
    valueProp: 'Edit Payment is the checkout action allowing a buyer to change or update their selected payment method before finalizing an order.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/paying-items/paying-items'],
  },

  {
    id: 'saved-payment-methods',
    valueProp: 'Saved Payment Methods is the account section storing a buyer\'s previously used cards and bank accounts — enabling one-tap checkout without re-entering payment details.',
    valueTerritories: ['convenience', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/paying-items/paying-items'],
  },

  {
    id: 'proceed-to-checkout',
    valueProp: 'Proceed to Checkout is the cart CTA that advances a buyer from reviewing their item selection to the payment and shipping confirmation flow — the critical conversion step in the buy path.',
    valueTerritories: ['speed', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/paying-items/how-checkout-works'],
  },

  // ── FEEDBACK ACTIONS ─────────────────────────────────────────────────────

  {
    id: 'leave-feedback',
    valueProp: 'Leave Feedback is the post-transaction action for buyers and sellers to rate each other — the core input that builds the reputation scores eBay\'s marketplace trust is built on.',
    valueTerritories: ['trust', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/feedback/feedback'],
  },

  {
    id: 'reply-to-feedback',
    valueProp: 'Reply to Feedback is the seller action to publicly respond to a buyer\'s feedback comment — allowing the seller to provide context, correct inaccuracies, or thank the buyer.',
    valueTerritories: ['trust', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/feedback/feedback'],
  },

  {
    id: 'request-feedback-revision',
    valueProp: 'Request Feedback Revision is the seller-initiated action asking a buyer to change a previously left feedback rating — typically used after resolving a problem that prompted negative feedback.',
    valueTerritories: ['trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/feedback/feedback-revision'],
  },

  {
    id: 'feedback-left',
    valueProp: 'Feedback Left is the status indicator showing a transaction participant has already submitted their feedback — preventing duplicate ratings and showing mutual completion.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/feedback/feedback'],
  },

  {
    id: 'helpful-review',
    valueProp: 'Helpful Review is the buyer action marking a product review as useful — surfacing the most informative user reviews at the top of product pages for other buyers.',
    valueTerritories: ['trust', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/product-reviews'],
  },

  {
    id: 'write-review',
    valueProp: 'Write Review is the buyer action for submitting a product-level review on an eBay catalog item — contributing to the shared product quality record visible to all future buyers of that item.',
    valueTerritories: ['trust', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/product-reviews'],
  },

  {
    id: 'buyer-review',
    valueProp: 'Buyer Review is the seller-facing view of a buyer\'s feedback or product review — presented in Seller Hub as part of reputation monitoring and order management.',
    valueTerritories: ['trust', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/feedback/feedback'],
  },

  {
    id: 'seller-responded',
    valueProp: 'Seller Responded is the status label indicating a seller has replied to a buyer\'s feedback comment — showing prospective buyers that the seller is engaged and accountable.',
    valueTerritories: ['trust', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/feedback/feedback'],
  },

  {
    id: 'seller-response',
    valueProp: 'Seller Response is the text of a seller\'s public reply to feedback — displayed alongside the original buyer comment in the seller\'s feedback profile for all to read.',
    valueTerritories: ['trust', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/feedback/feedback'],
  },

  {
    id: 'item-reviews',
    valueProp: 'Item Reviews are buyer-submitted ratings and text reviews on specific eBay catalog product pages — providing social proof and quality signals to future buyers researching the same product.',
    valueTerritories: ['trust', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/product-reviews'],
  },

  {
    id: 'feedback-forum',
    valueProp: 'Feedback Forum is the legacy eBay community board where members could discuss, appeal, and manage feedback disputes — a precursor to the modern structured feedback system.',
    valueTerritories: ['community', 'trust'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://community.ebay.com/t5/Feedback-Forum/bd-p/feedback-forum'],
  },

  // ── LISTING ACTIONS ──────────────────────────────────────────────────────

  {
    id: 'revise-listing',
    valueProp: 'Revise Listing is the seller action to edit an active listing\'s price, description, images, or other details — allowing sellers to update their listings without ending and relisting.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/revising-listing'],
  },

  {
    id: 'duplicate-listing',
    valueProp: 'Duplicate Listing is the seller action that creates a copy of an existing listing — allowing sellers to quickly create similar listings without re-entering all item details from scratch.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'relist',
    valueProp: 'Relist is the action that takes a sold or ended listing and reactivates it as a new active listing — the fastest path for sellers to restock a successful item.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/relisting'],
  },

  {
    id: 'relist-item',
    valueProp: 'Relist Item is the specific action label used in Seller Hub and order management to re-post an unsold item — functionally equivalent to Relist used at the listing level.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/relisting'],
  },

  {
    id: 'edit-listing',
    valueProp: 'Edit Listing is the general label for the listing modification action accessible from Seller Hub\'s active listings table — opening the revision form for any field on the listing.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/revising-listing'],
  },

  {
    id: 'end-listing',
    valueProp: 'End Listing is the seller action to permanently close an active listing before its natural end date — removing it from search results and making it unavailable for purchase.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/ending-listing-early'],
  },

  {
    id: 'end-listing-early',
    valueProp: 'End Listing Early is the more specific label for terminating an auction-format listing before its scheduled close — subject to eBay policy restrictions if bids have already been placed.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/ending-listing-early'],
  },

  {
    id: 'copy-to-inventory',
    valueProp: 'Copy to Inventory is the seller action that adds a listed item\'s details into the inventory management system — enabling catalog-based reuse across multiple listings.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'sell-similar',
    valueProp: 'Sell Similar is the seller shortcut that pre-populates a new listing form with the details of an existing item — speeding up listing creation for sellers with similar inventory.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'auto-relist',
    valueProp: 'Auto-Relist is the listing setting that automatically reactivates an unsold fixed-price listing when it expires — keeping inventory visible without seller intervention.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/relisting'],
  },

  {
    id: 'automatic-relisting',
    valueProp: 'Automatic Relisting is the same auto-relist capability referenced with its full descriptive label — the system behavior that reactivates expired unsold listings per the seller\'s setting.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/relisting'],
  },

  {
    id: 'back-in-stock',
    valueProp: 'Back in Stock is the notification trigger and listing status indicating a previously out-of-stock item is available again — alerting interested buyers who opted into stock alerts.',
    valueTerritories: ['convenience', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'bulk-edit',
    valueProp: 'Bulk Edit is the Seller Hub tool for modifying multiple listings simultaneously — changing price, quantity, shipping, or other fields across many listings in a single action.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/managing-listings'],
  },

  {
    id: 'bulk-listing',
    valueProp: 'Bulk Listing is the general concept of creating multiple listings at once — using upload tools or Seller Hub batch tools to list many items without handling each individually.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-listings/bulk-listing-tools'],
  },

  {
    id: 'bulk-listing-tool',
    valueProp: 'Bulk Listing Tool is the legacy name for eBay\'s spreadsheet-based multi-listing upload interface — allowing sellers to prepare listings in a template format for batch submission.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-listings/bulk-listing-tools'],
  },

  {
    id: 'bulk-listing-upload',
    valueProp: 'Bulk Listing Upload is the process of submitting a completed listing file to eBay — the final step of the batch listing workflow after preparing items in the template.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-listings/bulk-listing-tools'],
  },

  // ── ACCOUNT SETTINGS UI ──────────────────────────────────────────────────

  {
    id: 'communication-preferences',
    valueProp: 'Communication Preferences is the settings section where users control how and when eBay contacts them — choosing email types, notification frequency, and opt-in/out of specific message categories.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/mye/myebay/summary'],
  },

  {
    id: 'notification-preferences',
    valueProp: 'Notification Preferences is the settings area controlling which eBay events generate push, email, or SMS alerts — giving users precise control over information delivery.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/mye/myebay/summary'],
  },

  {
    id: 'notification-settings',
    valueProp: 'Notification Settings is the alternative label for the same notification control panel — used interchangeably with Notification Preferences across eBay\'s help and UI surfaces.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/mye/myebay/summary'],
  },

  {
    id: 'site-preferences',
    valueProp: 'Site Preferences is the seller account settings section for configuring buyer requirements, unpaid item automation, and other platform-level defaults — the operational control panel for professional sellers.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/selling/seller-preferences'],
  },

  {
    id: 'business-policies',
    valueProp: 'Business Policies is the Seller Hub system for creating reusable payment, shipping, and return policy templates — applied automatically across listings so sellers don\'t configure each listing individually.',
    valueTerritories: ['convenience'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability', 'long-term'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/business-policies'],
  },

  {
    id: 'buyer-requirements',
    valueProp: 'Buyer Requirements is the seller setting for restricting who can buy from their listings — blocking buyers with unpaid item strikes, low feedback, or from certain countries.',
    valueTerritories: ['trust', 'protection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/selling/buyer-requirements'],
  },

  {
    id: 'buyer-groups',
    valueProp: 'Buyer Groups is the seller tool for creating custom groups of blocked or preferred buyers — enabling more granular control over who can purchase from a seller\'s listings.',
    valueTerritories: ['trust', 'protection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/selling/buyer-requirements'],
  },

  {
    id: 'purchase-limits',
    valueProp: 'Purchase Limits are seller-set caps on quantity per buyer for a single listing — preventing bulk buying that could disadvantage other buyers or deplete stock unfairly.',
    valueTerritories: ['protection', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'quantity-limits',
    valueProp: 'Quantity Limits is the listing-level control capping how many units a single buyer can purchase in one transaction — used by sellers to manage high-demand items or limited inventory fairly.',
    valueTerritories: ['protection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'saved-drafts',
    valueProp: 'Saved Drafts is the section of Seller Hub where incomplete listings are stored — allowing sellers to start a listing and return to finish it before publishing.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'session-expired',
    valueProp: 'Session Expired is the system message displayed when a user\'s login session has timed out — prompting re-authentication before any further account actions.',
    valueTerritories: ['trust', 'protection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/account-help/account-help'],
  },

  {
    id: 'try-again',
    valueProp: 'Try Again is the error state CTA that allows users to retry a failed action — the default recovery prompt for network errors, payment failures, and other transient system issues.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com'],
  },

  // ── SEARCH & FILTER UI ───────────────────────────────────────────────────

  {
    id: 'filter-by',
    valueProp: 'Filter By is the search refinement panel header label — the UI entry point to narrow results by condition, price, location, shipping, format, and other attributes.',
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'refine-search',
    valueProp: 'Refine Search is the filter application action on eBay\'s search results page — applying selected criteria to narrow the result set to more relevant items.',
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'sort-by',
    valueProp: 'Sort By is the search results ordering control — letting buyers arrange listings by Best Match, price, ending time, distance, or other criteria to find the right item faster.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'show-only',
    valueProp: 'Show Only is the filter group for restricting search results to specific item attributes — such as authenticated items, returns accepted, sold listings, or specific conditions.',
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'clear-filters',
    valueProp: 'Clear Filters is the reset action that removes all applied search refinements — returning results to the unfiltered state for buyers who want to start fresh.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'buying-format',
    valueProp: 'Buying Format is the search filter grouping that lets buyers choose between auction, Buy It Now, or Best Offer listings — the primary format-based refinement in eBay\'s search.',
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/buying-format-filter'],
  },

  {
    id: 'condition-filter',
    valueProp: 'Condition Filter is the search refinement that limits results by item condition — New, Used, Refurbished, and sub-conditions — allowing buyers to match results to their quality expectations.',
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'condition-new-sort',
    valueProp: 'Condition New Sort is the search ordering option that surfaces newest-condition items first — used by buyers specifically seeking pristine, unopened items.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'top-rated-filter',
    valueProp: 'Top Rated Filter is the search refinement that limits results to Top Rated Sellers — giving buyers a shortcut to listings with the platform\'s highest service quality indicators.',
    valueTerritories: ['trust', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'free-shipping-filter',
    valueProp: 'Free Shipping Filter is the search refinement that shows only listings with no shipping cost — enabling buyers to optimize for total price without calculating per-item shipping.',
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'returns-accepted-filter',
    valueProp: 'Returns Accepted Filter limits search results to only listings where the seller accepts returns — helping buyers who prioritize return flexibility when making purchasing decisions.',
    valueTerritories: ['protection', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'sold-items-filter',
    valueProp: 'Sold Items Filter reveals completed sales at their final prices — the essential price research tool for sellers setting competitive prices and buyers validating market value.',
    valueTerritories: ['transparency', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'location-filter',
    valueProp: 'Location Filter narrows search results by item location or distance — essential for buyers seeking local pickup options or preferring domestic sellers for faster delivery.',
    valueTerritories: ['convenience', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'distance-nearest-first',
    valueProp: 'Distance Nearest First is the sort option ordering local pickup and nearby listings before distant ones — prioritizing geography for buyers who want items they can collect in person.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'price-range',
    valueProp: 'Price Range is the search filter input for setting minimum and maximum price bounds — the most-used refinement for buyers shopping within a budget.',
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'price-range-filter',
    valueProp: 'Price Range Filter is the search component that applies minimum and maximum price bounds to results — the same price filtering capability labeled more specifically in technical and help contexts.',
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'price-plus-shipping-sort',
    valueProp: 'Price + Shipping Sort orders search results by the combined total of item price and shipping cost — showing buyers true total cost rather than just listed price, enabling accurate price comparison.',
    valueTerritories: ['value', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'newly-listed',
    valueProp: 'Newly Listed is the search sort that places the most recently posted listings at the top — used by buyers monitoring new inventory or looking for recently sourced items.',
    valueTerritories: ['selection', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'ending-soon',
    valueProp: 'Ending Soon is the search sort that surfaces auction listings closest to their end time — used by buyers who want to bid on expiring auctions or find bargains in final seconds.',
    valueTerritories: ['selection', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'ends-soon',
    valueProp: 'Ends Soon is the compact variant label of Ending Soon — the same auction time-based sort used in mobile and condensed UI contexts where space is limited.',
    valueTerritories: ['selection', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'no-bids',
    valueProp: 'No Bids is the filter showing only auction listings that have not yet received any bids — a buyer strategy for finding overlooked items with potential for low final prices.',
    valueTerritories: ['value', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'auction-ended',
    valueProp: 'Auction Ended is the listing status shown when a timed auction has closed — indicating whether the item sold or ended without a successful bid.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'search-filters',
    valueProp: 'Search Filters is the collective label for all refinement controls on a search results page — price, condition, format, location, shipping, and category-specific attributes that narrow results.',
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'category-browse',
    valueProp: 'Category Browse is the non-search navigation mode where buyers explore eBay\'s item hierarchy — drilling from top-level categories into sub-categories to discover items without keyword searches.',
    valueTerritories: ['selection', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'browse-categories',
    valueProp: 'Browse Categories is the navigation label for the eBay category tree — the entry point for exploratory shopping by product type rather than keyword.',
    valueTerritories: ['selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'matching-categories',
    valueProp: 'Matching Categories is the search suggestion UI that shows which product categories contain the most results for a buyer\'s query — helping refocus a broad search.',
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'shop-by-category',
    valueProp: 'Shop by Category is the eBay homepage and navigation module organizing all inventory by product category — the primary alternative to keyword search for discovery-oriented buyers.',
    valueTerritories: ['selection', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  // ── SHIPPING & FULFILLMENT STATES ────────────────────────────────────────

  {
    id: 'shipment-confirmation',
    valueProp: 'Shipment Confirmation is the notification sent to buyers when a seller has shipped their order — including tracking information and estimated delivery to reassure the buyer their item is on the way.',
    valueTerritories: ['transparency', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/managing-orders/fulfilling-orders'],
  },

  {
    id: 'mark-as-shipped',
    valueProp: 'Mark as Shipped is the seller action confirming an order has been dispatched — uploading tracking information and updating the buyer\'s order status from awaiting shipment to shipped.',
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/managing-orders/fulfilling-orders'],
  },

  {
    id: 'delivery-status',
    valueProp: 'Delivery Status is the real-time carrier tracking state — in-transit, out for delivery, delivered, or exception — surfaced in buyer order tracking and notification flows.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/tracking-orders/tracking-orders'],
  },

  {
    id: 'delivery-updates',
    valueProp: 'Delivery Updates are proactive notifications sent to buyers at key shipping milestones — picked up, in transit, out for delivery, delivered — reducing "where is my order" contacts.',
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/tracking-orders/tracking-orders'],
  },

  {
    id: 'real-time-tracking',
    valueProp: 'Real-Time Tracking is the live carrier data integration showing buyers their shipment\'s current status and location without leaving eBay — keeping buyers informed and reducing anxiety.',
    valueTerritories: ['transparency', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/tracking-orders/tracking-orders'],
  },

  {
    id: 'out-of-stock-control',
    valueProp: 'Out of Stock Control is the seller setting that keeps a listing visible in search results even when quantity reaches zero — displaying the item as unavailable rather than ending the listing entirely.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/out-of-stock'],
  },

  {
    id: 'out-of-stock-listing',
    valueProp: 'Out of Stock Listing is the state a listing enters when its quantity reaches zero and Out of Stock Control is enabled — visible in search but not purchasable until the seller restocks.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/out-of-stock'],
  },

  {
    id: 'shipping-discounts',
    valueProp: 'Shipping Discounts is the seller-configured reduced shipping cost for buyers who purchase multiple items — a conversion tool that rewards buyers for combining orders.',
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/shipping-discounts'],
  },

  {
    id: 'shipping-restrictions',
    valueProp: 'Shipping Restrictions are seller-set or policy-enforced limitations on where an item can be shipped — displayed on listings and enforced at checkout to prevent ineligible purchases.',
    valueTerritories: ['transparency', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/restricted-items'],
  },

]
