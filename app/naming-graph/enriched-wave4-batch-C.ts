// eBay Naming Graph - Wave 4 Batch C Enrichment
// Date: 2026-04-17
// Programs Enriched: 50
// Source: translations.ts (Messages, Contacts, Accounts, Multi-User, Notifications, Communication)
// Focus: User account features, communication, notifications, settings, team access

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

export const ENRICHED_WAVE4_C: GraphNode[] = [
  // MESSAGING & COMMUNICATION (6 programs)
  {
    id: "messages",
    name: "Messages",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Centralized messaging inbox for buyer-seller communication, transaction inquiries, and member-to-member contact.",
    market: "global",
    year: 2000
  },
  {
    id: "contact-seller",
    name: "Contact Seller",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Direct messaging feature allowing buyers to ask questions before purchase via protected email alias.",
    market: "global",
    year: 2000
  },
  {
    id: "contact-buyer",
    name: "Contact Buyer",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Seller-initiated messaging to buyers for transaction updates, shipping confirmation, or issue resolution.",
    market: "global",
    year: 2000
  },
  {
    id: "email-alias",
    name: "Email Alias",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Privacy-protecting email system that anonymizes member email addresses in buyer-seller communications.",
    market: "global",
    year: 1998
  },
  {
    id: "member-to-member-contact",
    name: "Member-to-Member Contact",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "community",
    desc: "Messaging system allowing direct communication between eBay members within platform rules.",
    market: "global",
    year: 2000
  },
  {
    id: "ebay-ai-message-assistant",
    name: "eBay.ai Message Assistant",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "AI-powered tool suggesting responses to buyer messages and automating common seller communication tasks.",
    market: "global",
    year: 2024
  },

  // NOTIFICATIONS & ALERTS (10 programs)
  {
    id: "push-notifications",
    name: "Push Notifications",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Real-time mobile app alerts for bids, offers, shipments, and account activity.",
    market: "global",
    year: 2012
  },
  {
    id: "email-notifications",
    name: "Email Notifications",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Customizable email alerts for account activity, watching items, sales, and messaging.",
    market: "global",
    year: 1997
  },
  {
    id: "sms-alerts",
    name: "SMS Alerts",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Text message notifications for critical events like auction endings, outbid alerts, and shipment updates.",
    market: "global",
    year: 2008
  },
  {
    id: "outbid-alert",
    name: "Outbid Alert",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Real-time notification when another bidder exceeds your maximum bid on watched auction items.",
    market: "global",
    year: 2001
  },
  {
    id: "communication-preferences",
    name: "Communication Preferences",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Settings for managing email, SMS, and push notification frequency and types across all eBay communications.",
    market: "global",
    year: 2010
  },
  {
    id: "marketing-communications",
    name: "Marketing Communications",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Opt-in promotional emails and notifications for deals, discounts, and personalized product recommendations.",
    market: "global",
    year: 2005
  },
  {
    id: "member-messages",
    name: "Member Messages",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "System notifications about account updates, policy changes, and important eBay announcements.",
    market: "global",
    year: 2000
  },
  {
    id: "selling-activity-notifications",
    name: "Selling Activity Notifications",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Seller alerts for new sales, messages, returns, and listing performance milestones.",
    market: "global",
    year: 2005
  },
  {
    id: "real-time-notifications",
    name: "Real-Time Notifications",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Instant push alerts delivered immediately upon event occurrence for time-sensitive actions.",
    market: "global",
    year: 2015
  },
  {
    id: "digest-notifications",
    name: "Digest Notifications",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Consolidated daily or weekly email summaries batching multiple notifications into single messages.",
    market: "global",
    year: 2012
  },

  // ACCOUNT SECURITY & AUTHENTICATION (5 programs)
  {
    id: "2-step-verification",
    name: "2-Step Verification",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Multi-factor authentication requiring SMS code or app confirmation in addition to password for login.",
    market: "global",
    year: 2013
  },
  {
    id: "passkeys",
    name: "Passkeys",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Passwordless authentication using biometric or device-based credentials following FIDO2 standard.",
    market: "global",
    year: 2023
  },
  {
    id: "account-security",
    name: "Account Security",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Dashboard for managing password, 2FA settings, login history, connected devices, and security alerts.",
    market: "global",
    year: 2010
  },
  {
    id: "fraud-prevention",
    name: "Fraud Prevention",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Automated systems detecting suspicious login attempts, unusual purchases, and account takeover threats.",
    market: "global",
    year: 2008
  },
  {
    id: "authenticator-app",
    name: "Authenticator App",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Support for third-party authenticator apps (Google Authenticator, Authy) for time-based one-time passwords.",
    market: "global",
    year: 2015
  },

  // EMAIL MARKETING & CAMPAIGNS (6 programs)
  {
    id: "store-newsletter",
    name: "Store Newsletter",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "stores",
    desc: "Automated or custom email newsletters sent from eBay Store owners to their subscriber base.",
    market: "global",
    year: 2008
  },
  {
    id: "email-campaign",
    name: "Email Campaign",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "stores",
    desc: "Seller-created promotional email campaigns targeting store subscribers and past buyers.",
    market: "global",
    year: 2010
  },
  {
    id: "welcome-email-campaign",
    name: "Welcome Email Campaign",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "stores",
    desc: "Automated first email sent to new store subscribers introducing the seller and featured products.",
    market: "global",
    year: 2012
  },
  {
    id: "new-products-email-campaign",
    name: "New Products Email Campaign",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "stores",
    desc: "Automated emails highlighting newly listed inventory to engaged store followers.",
    market: "global",
    year: 2012
  },
  {
    id: "sale-event-email-campaign",
    name: "Sale Event Email Campaign",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "stores",
    desc: "Promotional emails announcing limited-time sales, discounts, or seasonal events.",
    market: "global",
    year: 2012
  },
  {
    id: "buyer-segmentation-tool",
    name: "Buyer Segmentation Tool",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "stores",
    desc: "Tool for grouping buyers by purchase history, category interest, or engagement for targeted campaigns.",
    market: "global",
    year: 2015
  },

  // BUSINESS POLICIES & SETTINGS (4 programs)
  {
    id: "business-policies",
    name: "Business Policies",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Reusable templates for payment, shipping, and return policies applied across multiple listings.",
    market: "global",
    year: 2012
  },
  {
    id: "payment-policy",
    name: "Payment Policy",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Saved settings defining accepted payment methods, immediate payment requirements, and deposit terms.",
    market: "global",
    year: 2012
  },
  {
    id: "shipping-policy",
    name: "Shipping Policy",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Reusable shipping rules including carriers, handling time, domestic/international options, and rates.",
    market: "global",
    year: 2012
  },
  {
    id: "return-policy",
    name: "Return Policy",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Standardized return terms defining acceptance period (30/60 days), refund method, and restocking fees.",
    market: "global",
    year: 2012
  },

  // VACATION & TIME MANAGEMENT (4 programs)
  {
    id: "time-away",
    name: "Time Away",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Seller Hub feature to pause sales, extend handling time, or add away messages during vacation periods.",
    market: "global",
    year: 2017
  },
  {
    id: "vacation-mode",
    name: "Vacation Mode",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Temporary account status hiding listings or blocking new purchases while maintaining existing orders.",
    market: "global",
    year: 2005
  },
  {
    id: "allow-item-sales",
    name: "Allow Item Sales",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Setting enabling continued purchases during time away with extended handling time displayed to buyers.",
    market: "global",
    year: 2017
  },
  {
    id: "pause-item-sales",
    name: "Pause Item Sales",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Temporary block preventing new purchases while seller is unavailable to fulfill orders.",
    market: "global",
    year: 2017
  },

  // ACCOUNT SETTINGS (5 programs)
  {
    id: "communication-preferences-settings",
    name: "Communication Preferences",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Centralized settings controlling all notification channels, frequency, and content types across eBay.",
    market: "global",
    year: 2010
  },
  {
    id: "payment-method-on-file",
    name: "Payment Method on File",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "payments",
    desc: "Saved payment methods (credit card, PayPal, bank account) for automatic checkout and seller fee billing.",
    market: "global",
    year: 2003
  },
  {
    id: "payment-method-required",
    name: "Payment Method Required",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "payments",
    desc: "Account gate requiring verified payment method before bidding or purchasing high-value items.",
    market: "global",
    year: 2010
  },
  {
    id: "private-listing",
    name: "Private Listing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Listing format hiding bidder usernames from public view for sensitive categories (adult, medical).",
    market: "global",
    year: 2000
  },
  {
    id: "bidders-identities-protected",
    name: "Bidders' Identities Protected",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Privacy setting masking bidder usernames on auction listings to prevent bid history tracking.",
    market: "global",
    year: 2000
  },

  // BUYER ENGAGEMENT TOOLS (3 programs)
  {
    id: "buyer-groups",
    name: "Buyer Groups",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "stores",
    desc: "Segmented lists of buyers grouped by purchase history for targeted promotions and exclusive offers.",
    market: "global",
    year: 2015
  },
  {
    id: "store-newsletters",
    name: "Store Newsletters",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "stores",
    desc: "Recurring automated or manual email updates sent to eBay Store subscribers and past customers.",
    market: "global",
    year: 2008
  },
  {
    id: "store-email-campaigns",
    name: "Store Email Campaigns",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "stores",
    desc: "Email Marketing tool for sellers to create promotional campaigns targeting store subscribers.",
    market: "global",
    year: 2010
  },

  // LISTING NOTIFICATIONS (2 programs)
  {
    id: "listing-confirmed-notification",
    name: "Listing Confirmed Notification",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sellertools",
    desc: "Automated confirmation message sent when listing successfully goes live on eBay marketplace.",
    market: "global",
    year: 2005
  },
  {
    id: "outbid-notification",
    name: "Outbid Notification",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer",
    desc: "Real-time email or push alert when another buyer submits a higher bid on watched auction item.",
    market: "global",
    year: 2001
  },

  // SELLER COMMUNICATION TOOLS (5 programs)
  {
    id: "seller-updates",
    name: "Seller Updates",
    type: "category",
    tier: "publication",
    status: "current",
    parent: "community",
    desc: "Official eBay blog and newsletter announcing policy changes, new features, and seller resources.",
    market: "global",
    year: 2008
  },
  {
    id: "boost-buyer-engagement",
    name: "Boost Buyer Engagement",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "stores",
    desc: "Marketing tool suite combining email campaigns, discounts, and promotions to re-engage past buyers.",
    market: ["US", "UK", "AU", "CA"],
    year: 2020
  },
  {
    id: "coded-coupons",
    name: "Coded Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "stores",
    desc: "Seller-created discount codes shared via email or social media for percentage or dollar-off promotions.",
    market: "global",
    year: 2012
  },
  {
    id: "send-coupon",
    name: "Send Coupon",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "stores",
    desc: "Direct email tool sending personalized discount codes to specific buyers or buyer segments.",
    market: "global",
    year: 2015
  },
  {
    id: "print-coupons",
    name: "Print Coupons",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "stores",
    desc: "Bulk coupon generation for in-store pickup or offline promotional distribution.",
    market: "global",
    year: 2015
  }
]
