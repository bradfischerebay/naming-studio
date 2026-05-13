// eBay Naming Graph - Enriched Wave 4 Batch K
// Focus: Notifications, Alerts, Communication Tools, Messaging Features
// Programs: 50 NEW programs (IDs 424-473)
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

export const ENRICHED_WAVE4_K: GraphNode[] = [
  {
    "id": "notification-preferences",
    "name": "Notification Preferences",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "account-settings",
    "desc": "User-configurable settings controlling frequency, channel (email/SMS/push), and type of notifications received from eBay.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "email-subscription-manager",
    "name": "Email Subscription Manager",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Granular control panel for opting in/out of promotional, transactional, and marketing emails by category.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "bid-alert",
    "name": "Bid Alert",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Real-time notification when someone places a bid on an auction listing you're watching or have bid on.",
    "market": "global",
    "year": 2003
  },
  {
    "id": "win-notification",
    "name": "Win Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Congratulatory alert sent to buyer upon winning an auction, with next steps for payment and shipping.",
    "market": "global",
    "year": 2003
  },
  {
    "id": "payment-received-notification",
    "name": "Payment Received Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Confirmation alert to seller when buyer's payment is processed and cleared, signaling readiness to ship.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "delivery-confirmation-alert",
    "name": "Delivery Confirmation Alert",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Notification sent to both buyer and seller when carrier confirms package delivery at destination address.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "offer-received-notification",
    "name": "Offer Received Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Alert to seller when buyer submits a Best Offer, with countdown timer and accept/decline/counter options.",
    "market": "global",
    "year": 2007
  },
  {
    "id": "offer-accepted-notification",
    "name": "Offer Accepted Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Confirmation to buyer when seller accepts their Best Offer, triggering checkout process.",
    "market": "global",
    "year": 2007
  },
  {
    "id": "offer-declined-notification",
    "name": "Offer Declined Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Alert informing buyer their Best Offer was declined by seller, with option to revise or purchase at full price.",
    "market": "global",
    "year": 2007
  },
  {
    "id": "counteroffer-notification",
    "name": "Counteroffer Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Alert to buyer when seller proposes alternative price in response to Best Offer, with accept/decline options.",
    "market": "global",
    "year": 2007
  },
  {
    "id": "watcher-alert",
    "name": "Watcher Alert",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Notification to seller showing number of users watching their listing, often triggering promotional actions.",
    "market": "global",
    "year": 2004
  },
  {
    "id": "ending-soon-alert",
    "name": "Ending Soon Alert",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Time-sensitive reminder sent to watchers and bidders when auction listing approaches end time (typically 1 hour).",
    "market": "global",
    "year": 2003
  },
  {
    "id": "second-chance-offer-notification",
    "name": "Second Chance Offer Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Alert to non-winning bidder offering opportunity to purchase at their bid price if winner doesn't complete transaction.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "return-initiated-notification",
    "name": "Return Initiated Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Alert to seller when buyer opens a return request, with details on reason, timeframe, and next actions required.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "return-approved-notification",
    "name": "Return Approved Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Confirmation to buyer that seller accepted return, including prepaid label and refund timeline.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "refund-processed-notification",
    "name": "Refund Processed Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Alert confirming refund issuance to buyer's original payment method, with processing timeframe (3-5 days).",
    "market": "global",
    "year": 2008
  },
  {
    "id": "feedback-reminder",
    "name": "Feedback Reminder",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Post-transaction prompt encouraging buyers/sellers to leave feedback, typically 7-14 days after delivery.",
    "market": "global",
    "year": 2006
  },
  {
    "id": "feedback-received-notification",
    "name": "Feedback Received Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Alert when trading partner leaves feedback on your account, with rating details and option to respond or reciprocate.",
    "market": "global",
    "year": 2003
  },
  {
    "id": "message-received-notification",
    "name": "Message Received Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Instant alert when buyer/seller sends message through eBay messaging system, with preview and reply link.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "unpaid-item-reminder",
    "name": "Unpaid Item Reminder",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Automated reminder to buyer after 48 hours if purchase remains unpaid, with cancel deadline warning.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "item-not-received-alert",
    "name": "Item Not Received Alert",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Alert to seller when buyer opens case for non-delivery, requiring response with tracking or delivery proof within 3 days.",
    "market": "global",
    "year": 2013
  },
  {
    "id": "seller-performance-alert",
    "name": "Seller Performance Alert",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Warning notification when seller metrics (defects, late shipments, cancellations) approach Below Standard threshold.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "top-rated-seller-status-notification",
    "name": "Top Rated Seller Status Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Congratulatory alert when seller achieves or maintains Top Rated status, with badge activation confirmation.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "below-standard-warning",
    "name": "Below Standard Warning",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Critical alert when seller falls into Below Standard tier, detailing restrictions and improvement requirements.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "account-suspension-notice",
    "name": "Account Suspension Notice",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Formal notification of account restriction or suspension due to policy violation, with appeal process details.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "listing-removed-notification",
    "name": "Listing Removed Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Alert when eBay removes listing for policy violation (VeRO, prohibited item, etc.), with violation explanation and appeal link.",
    "market": "global",
    "year": 2006
  },
  {
    "id": "copyright-infringement-notice",
    "name": "Copyright Infringement Notice",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "VeRO program notification when rights owner reports listing for intellectual property violation, resulting in removal.",
    "market": "global",
    "year": 2007
  },
  {
    "id": "shipping-delay-alert",
    "name": "Shipping Delay Alert",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Proactive notification to buyer when carrier reports delivery delay, with updated expected arrival date.",
    "market": "global",
    "year": 2018
  },
  {
    "id": "payout-available-notification",
    "name": "Payout Available Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Alert to seller when funds from completed sales are ready for transfer to linked bank account.",
    "market": "global",
    "year": 2019
  },
  {
    "id": "payout-processed-notification",
    "name": "Payout Processed Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Confirmation when seller funds are transferred to bank, with amount and 1-3 day arrival estimate.",
    "market": "global",
    "year": 2019
  },
  {
    "id": "reserve-not-met-notification",
    "name": "Reserve Not Met Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Alert to seller and highest bidder when auction ends below reserve price, with second chance offer option.",
    "market": "global",
    "year": 2004
  },
  {
    "id": "reserve-met-notification",
    "name": "Reserve Met Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Celebratory alert when bid surpasses reserve price threshold, indicating item will sell to highest bidder.",
    "market": "global",
    "year": 2004
  },
  {
    "id": "promotional-offer-alert",
    "name": "Promotional Offer Alert",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Marketing notification for limited-time discounts, seller coupons, or site-wide promotional events.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "seller-update-notification",
    "name": "Seller Update Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Monthly email newsletter from eBay announcing new features, policy changes, and best practice tips for sellers.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "policy-change-notification",
    "name": "Policy Change Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Formal alert about upcoming changes to user agreement, fee structure, or prohibited items list with effective date.",
    "market": "global",
    "year": 2007
  },
  {
    "id": "fee-invoice-notification",
    "name": "Fee Invoice Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Monthly statement alert showing seller fees, with breakdown by listing, final value, and promotional costs.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "payment-method-expiring-alert",
    "name": "Payment Method Expiring Alert",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Proactive reminder when credit card or bank account on file approaches expiration date, preventing fee payment failures.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "security-alert",
    "name": "Security Alert",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Urgent notification for suspicious login attempts, password changes, or unauthorized account activity with immediate action steps.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "two-factor-authentication-prompt",
    "name": "Two-Factor Authentication Prompt",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "SMS or app-based verification code sent during login process when 2FA is enabled for account security.",
    "market": "global",
    "year": 2017
  },
  {
    "id": "password-reset-notification",
    "name": "Password Reset Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Confirmation email with secure link sent when user requests password change, expiring after 24 hours.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "email-address-verification",
    "name": "Email Address Verification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "One-time confirmation message sent when user updates email, requiring click-through to activate new address.",
    "market": "global",
    "year": 2003
  },
  {
    "id": "phone-number-verification",
    "name": "Phone Number Verification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "SMS with 6-digit code sent when adding or updating phone number for account verification and recovery.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "abandoned-cart-reminder",
    "name": "Abandoned Cart Reminder",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Follow-up email sent 24-48 hours after items left in cart without checkout, encouraging purchase completion.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "saved-search-alert",
    "name": "Saved Search Alert",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Automated notification when new listings matching your saved search criteria appear, with daily or instant delivery options.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "similar-items-recommendation",
    "name": "Similar Items Recommendation",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Personalized email suggesting listings based on browsing history, watch list, and past purchases.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "back-in-stock-notification",
    "name": "Back in Stock Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Alert when previously out-of-stock item from multi-quantity listing becomes available again for purchase.",
    "market": "global",
    "year": 2018
  },
  {
    "id": "review-request-notification",
    "name": "Review Request Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Post-purchase email asking buyer to rate product quality and share experience with item-level review.",
    "market": "global",
    "year": 2017
  },
  {
    "id": "seller-response-notification",
    "name": "Seller Response Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Alert to buyer when seller replies to their question, return request, or customer service inquiry in Message Center.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "listing-about-to-expire-alert",
    "name": "Listing About to Expire Alert",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Reminder to seller 24 hours before Good 'Til Cancelled listing auto-renews, with option to cancel or revise.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "promotional-listing-upgrade-notification",
    "name": "Promotional Listing Upgrade Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notifications",
    "desc": "Marketing alert offering discounted rates on Promoted Listings, Subtitle, or other paid listing enhancements.",
    "market": "global",
    "year": 2019
  }
]

// Export metadata
export const WAVE4_K_METADATA = {
  batchId: "wave4-batch-K",
  focus: "Notifications, Alerts, Communication Tools, Messaging Features",
  programCount: 50,
  startId: 424,
  endId: 473,
  generatedDate: "2026-04-17",
  markets: ["global", "US", "UK", "DE", "FR", "IT", "CA", "AU"],
  categories: [
    "Email Notifications",
    "SMS Alerts",
    "Push Notifications",
    "Transaction Alerts",
    "Performance Notifications",
    "Security Alerts",
    "Account Management",
    "Marketing Communications",
    "Buyer Engagement",
    "Seller Tools"
  ],
  parentPrograms: [
    "notifications",
    "account-settings",
    "messaging",
    "performance",
    "security"
  ]
}
