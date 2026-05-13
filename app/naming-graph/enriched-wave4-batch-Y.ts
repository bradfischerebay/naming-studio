// eBay Naming Graph - Wave 4 Batch Y Enrichment
// Generated: 2026-04-17
// Programs Enriched: 120
// Focus: Account settings, preferences, privacy, security, profile features, notifications, verification, customer support

import { GraphNode } from './enriched-consolidated-DEDUPLICATED'

export const ENRICHED_WAVE4_Y: GraphNode[] = [
  // ACCOUNT SETTINGS & PREFERENCES (12 programs)
  {
    id: "account-settings",
    name: "Account Settings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "my-ebay",
    desc: "Central hub for managing account configuration including personal information, addresses, and platform preferences.",
    market: "global",
    year: 2000
  },
  {
    id: "site-preferences",
    name: "Site Preferences",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "account-settings",
    desc: "User preference controls for language, currency, default location, and site customization options.",
    market: "global",
    year: 2001
  },
  {
    id: "selling-preferences",
    name: "Selling Preferences",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Seller-specific settings controlling listing defaults, payment preferences, and business policies.",
    market: "global",
    year: 2006
  },
  {
    id: "notification-preferences",
    name: "Notification Preferences",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "account-settings",
    desc: "Granular controls for managing email, SMS, and push notification delivery across all eBay activities.",
    market: "global",
    year: 2008
  },
  {
    id: "communication-preferences",
    name: "Communication Preferences",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "account-settings",
    desc: "Opt-in/opt-out controls for marketing communications, seller newsletters, and promotional messaging.",
    market: "global",
    year: 2010
  },
  {
    id: "return-preferences",
    name: "Return Preferences",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Seller-defined default return policies including return windows, restocking fees, and shipping responsibility.",
    market: "global",
    year: 2012
  },
  {
    id: "close-account",
    name: "Close Account",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "account-settings",
    desc: "Account termination workflow allowing users to permanently close eBay accounts with data retention options.",
    market: "global",
    year: 2003
  },
  {
    id: "multi-user-account-access",
    name: "Multi-User Account Access",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "account-settings",
    desc: "Team collaboration feature enabling multiple users to access a single business account with role-based permissions.",
    market: ["US", "UK", "DE", "FR", "AU"],
    year: 2015
  },
  {
    id: "account-permissions",
    name: "Account Permissions",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "multi-user-account-access",
    desc: "Granular permission controls defining user roles, access levels, and action restrictions for shared accounts.",
    market: ["US", "UK", "DE", "FR", "AU"],
    year: 2015
  },
  {
    id: "team-access",
    name: "Team Access",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "multi-user-account-access",
    desc: "Seller tool enabling business teams to collaborate on listings, orders, and customer service with shared login.",
    market: ["US", "UK", "DE", "FR", "AU"],
    year: 2018
  },
  {
    id: "email-alias",
    name: "Email Alias",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "account-settings",
    desc: "Privacy feature masking buyer/seller email addresses with eBay proxy addresses for secure communication.",
    market: "global",
    year: 2004
  },
  {
    id: "member-to-member-contact",
    name: "Member-to-Member Contact",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "messages",
    desc: "Secure messaging system enabling buyer-seller communication through eBay platform without exposing personal email.",
    market: "global",
    year: 2002
  },

  // SECURITY & AUTHENTICATION (15 programs)
  {
    id: "two-factor-authentication",
    name: "Two-Factor Authentication",
    type: "security",
    tier: "feature",
    status: "current",
    parent: "account-security",
    desc: "Enhanced login security requiring second verification factor (SMS, authenticator app) beyond password.",
    market: "global",
    year: 2016
  },
  {
    id: "2-step-verification",
    name: "2-Step Verification",
    type: "security",
    tier: "feature",
    status: "current",
    parent: "two-factor-authentication",
    rename_info: {
      previous_name: "Two-Factor Authentication",
      renamed_year: 2024,
      reason: "Rebranded to 2-Step Verification for clarity in UK/EU markets"
    },
    desc: "Login security requiring verification code from trusted device when signing in from new locations.",
    market: ["UK", "DE", "FR", "IT", "AU"],
    year: 2016
  },
  {
    id: "passkeys",
    name: "Passkeys",
    type: "security",
    tier: "feature",
    status: "current",
    parent: "account-security",
    desc: "Passwordless authentication using biometric or device-based cryptographic keys following FIDO2/WebAuthn standards.",
    market: ["US", "UK"],
    year: 2023
  },
  {
    id: "account-security",
    name: "Account Security",
    type: "security",
    tier: "feature",
    status: "current",
    parent: "account-settings",
    desc: "Security dashboard showing login activity, authorized devices, and account protection settings.",
    market: "global",
    year: 2012
  },
  {
    id: "authenticator-app",
    name: "Authenticator App",
    type: "security",
    tier: "feature",
    status: "current",
    parent: "two-factor-authentication",
    desc: "Time-based one-time password (TOTP) support for third-party authenticator apps like Google Authenticator.",
    market: "global",
    year: 2017
  },
  {
    id: "fraud-prevention",
    name: "Fraud Prevention",
    type: "security",
    tier: "program",
    status: "current",
    parent: "trust-safety",
    desc: "Automated fraud detection system analyzing transactions, account behavior, and risk signals to prevent abuse.",
    market: "global",
    year: 2005
  },
  {
    id: "seller-verification",
    name: "Seller Verification",
    type: "security",
    tier: "program",
    status: "current",
    parent: "trust-safety",
    desc: "Identity verification process requiring sellers to confirm identity through document upload and validation.",
    market: "global",
    year: 2019
  },
  {
    id: "identity-verification",
    name: "Identity Verification",
    type: "security",
    tier: "feature",
    status: "current",
    parent: "seller-verification",
    desc: "KYC (Know Your Customer) process validating seller identity through government-issued ID and personal information.",
    market: "global",
    year: 2019
  },
  {
    id: "id-upload",
    name: "ID Upload",
    type: "security",
    tier: "feature",
    status: "current",
    parent: "identity-verification",
    desc: "Secure document upload portal for submitting government-issued identification during verification process.",
    market: "global",
    year: 2019
  },
  {
    id: "biometric-verification",
    name: "Biometric Verification",
    type: "security",
    tier: "feature",
    status: "current",
    parent: "identity-verification",
    desc: "Facial recognition and liveness detection for identity verification using device camera and AI matching.",
    market: ["US", "UK"],
    year: 2022
  },
  {
    id: "address-verification",
    name: "Address Verification",
    type: "security",
    tier: "feature",
    status: "current",
    parent: "seller-verification",
    desc: "Address validation service confirming seller physical address through postal verification or document upload.",
    market: "global",
    year: 2020
  },
  {
    id: "account-suspension",
    name: "Account Suspension",
    type: "security",
    tier: "feature",
    status: "current",
    parent: "trust-safety",
    desc: "Enforcement action temporarily restricting account access due to policy violations or suspicious activity.",
    market: "global",
    year: 2000
  },
  {
    id: "account-warning",
    name: "Account Warning",
    type: "security",
    tier: "feature",
    status: "current",
    parent: "trust-safety",
    desc: "Notification alerting users to policy violations or account issues requiring corrective action.",
    market: "global",
    year: 2003
  },
  {
    id: "account-restriction",
    name: "Account Restriction",
    type: "security",
    tier: "feature",
    status: "current",
    parent: "trust-safety",
    desc: "Partial account limitation restricting specific features (buying, selling, messaging) due to performance issues.",
    market: "global",
    year: 2005
  },
  {
    id: "temporary-suspension",
    name: "Temporary Suspension",
    type: "security",
    tier: "feature",
    status: "current",
    parent: "account-suspension",
    desc: "Time-limited account restriction allowing reinstatement after corrective action or waiting period.",
    market: "global",
    year: 2008
  },

  // NOTIFICATIONS & ALERTS (25 programs)
  {
    id: "push-notifications",
    name: "Push Notifications",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "mobile-app",
    desc: "Real-time mobile alerts for bids, offers, purchases, messages, and shipping updates delivered to iOS/Android devices.",
    market: "global",
    year: 2012
  },
  {
    id: "email-notifications",
    name: "Email Notifications",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "notification-preferences",
    desc: "Automated email alerts for account activity, transactions, messages, and important platform updates.",
    market: "global",
    year: 1998
  },
  {
    id: "sms-alerts",
    name: "SMS Alerts",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "notification-preferences",
    desc: "Text message notifications for urgent events like outbid alerts, purchase confirmations, and shipping updates.",
    market: "global",
    year: 2009
  },
  {
    id: "sms-notifications",
    name: "SMS Notifications",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "sms-alerts",
    rename_info: {
      previous_name: "SMS Alerts",
      renamed_year: 2020,
      reason: "Rebranded to SMS Notifications for consistency with other notification types"
    },
    desc: "Text-based notification delivery system for transaction and account alerts via mobile carrier.",
    market: "global",
    year: 2009
  },
  {
    id: "outbid-alert",
    name: "Outbid Alert",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "email-notifications",
    desc: "Instant notification when another bidder exceeds current bid in auction-style listings.",
    market: "global",
    year: 2000
  },
  {
    id: "outbid-notification",
    name: "Outbid Notification",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "outbid-alert",
    rename_info: {
      previous_name: "Outbid Alert",
      renamed_year: 2018,
      reason: "Rebranded to Outbid Notification for consistency with notification nomenclature"
    },
    desc: "Real-time alert via email, SMS, or push when user is outbid in auction with current bid amount.",
    market: "global",
    year: 2000
  },
  {
    id: "real-time-notifications",
    name: "Real-Time Notifications",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "notification-preferences",
    desc: "Instant delivery of time-sensitive notifications via push, email, or SMS within seconds of event occurring.",
    market: "global",
    year: 2015
  },
  {
    id: "digest-notifications",
    name: "Digest Notifications",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "notification-preferences",
    desc: "Consolidated email summaries bundling multiple notifications into daily or weekly digest format.",
    market: "global",
    year: 2010
  },
  {
    id: "selling-activity-notifications",
    name: "Selling Activity Notifications",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Seller alerts for new orders, offers, messages, watchers, and listing performance updates.",
    market: "global",
    year: 2008
  },
  {
    id: "listing-confirmed-notification",
    name: "Listing Confirmed Notification",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "selling-activity-notifications",
    desc: "Confirmation email sent when new listing is successfully published to eBay marketplace.",
    market: "global",
    year: 2004
  },
  {
    id: "selling-notifications",
    name: "Selling Notifications",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Comprehensive seller notification system covering orders, inventory, performance, and account alerts.",
    market: "global",
    year: 2016
  },
  {
    id: "notification-settings",
    name: "Notification Settings",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "notification-preferences",
    desc: "Granular controls for customizing notification delivery channels, frequency, and event types.",
    market: "global",
    year: 2012
  },
  {
    id: "email-alerts",
    name: "Email Alerts",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "email-notifications",
    desc: "Email-based notification system for important account events, transaction updates, and security alerts.",
    market: "global",
    year: 2000
  },
  {
    id: "price-alert",
    name: "Price Alert",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "email-notifications",
    desc: "Buyer notification triggered when watched item price drops below specified threshold.",
    market: ["US", "UK", "DE"],
    year: 2019
  },
  {
    id: "delivery-updates",
    name: "Delivery Updates",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "email-notifications",
    desc: "Shipping milestone notifications including label printed, shipped, in transit, out for delivery, and delivered.",
    market: "global",
    year: 2014
  },
  {
    id: "delivery-status",
    name: "Delivery Status",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "delivery-updates",
    desc: "Real-time package tracking status displayed in My eBay with carrier updates and estimated delivery date.",
    market: "global",
    year: 2014
  },
  {
    id: "order-updates",
    name: "Order Updates",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "email-notifications",
    desc: "Buyer notifications for order confirmation, payment received, shipping updates, and delivery confirmation.",
    market: "global",
    year: 2012
  },
  {
    id: "shopping-updates",
    name: "Shopping Updates",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "email-notifications",
    desc: "Buyer notifications for watched items, saved searches, ending soon alerts, and price drop alerts.",
    market: "global",
    year: 2016
  },
  {
    id: "real-time-tracking",
    name: "Real-Time Tracking",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "delivery-updates",
    desc: "Live package location tracking with carrier GPS data integrated into eBay order details.",
    market: ["US", "UK", "DE"],
    year: 2021
  },
  {
    id: "marketing-communications",
    name: "Marketing Communications",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "communication-preferences",
    desc: "Promotional emails and newsletters featuring deals, personalized recommendations, and eBay events.",
    market: "global",
    year: 2005
  },
  {
    id: "member-messages",
    name: "Member Messages",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "messages",
    desc: "eBay's internal messaging system enabling buyer-seller communication with notification integration.",
    market: "global",
    year: 2002
  },
  {
    id: "email-campaign",
    name: "Email Campaign",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "marketing-communications",
    desc: "Bulk email marketing tool allowing sellers to send promotional campaigns to buyer segments.",
    market: ["US", "UK", "DE", "AU"],
    year: 2017
  },
  {
    id: "welcome-email-campaign",
    name: "Welcome Email Campaign",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "email-campaign",
    desc: "Automated welcome email sent to new store subscribers with store introduction and featured products.",
    market: ["US", "UK", "DE", "AU"],
    year: 2018
  },
  {
    id: "new-products-email-campaign",
    name: "New Products Email Campaign",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "email-campaign",
    desc: "Automated email showcasing newly listed products to store subscribers and interested buyers.",
    market: ["US", "UK", "DE", "AU"],
    year: 2018
  },
  {
    id: "sale-event-email-campaign",
    name: "Sale Event Email Campaign",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "email-campaign",
    desc: "Promotional email announcing time-limited sales, discounts, and special events to subscriber list.",
    market: ["US", "UK", "DE", "AU"],
    year: 2018
  },
  {
    id: "volume-pricing-email-campaign",
    name: "Volume Pricing Email Campaign",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "email-campaign",
    desc: "Targeted email promoting bulk purchase discounts and wholesale pricing to business buyers.",
    market: ["US", "UK", "DE", "AU"],
    year: 2019
  },

  // PROFILE & REPUTATION (12 programs)
  {
    id: "feedback-profile",
    name: "Feedback Profile",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback",
    desc: "Public reputation page displaying feedback score, star rating, detailed reviews, and transaction history.",
    market: "global",
    year: 1998
  },
  {
    id: "seller-feedback-profile",
    name: "Seller Feedback Profile",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback-profile",
    desc: "Seller-specific feedback page showing detailed seller ratings (DSRs), defect rate, and buyer comments.",
    market: "global",
    year: 2006
  },
  {
    id: "feedback-score",
    name: "Feedback Score",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback-profile",
    desc: "Cumulative numerical rating calculated from positive (+1), neutral (0), and negative (-1) feedback received.",
    market: "global",
    year: 1998
  },
  {
    id: "star-rating",
    name: "Star Rating",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback-profile",
    desc: "Visual star icon (yellow, turquoise, purple, red, green) representing feedback milestones from 10 to 1,000,000.",
    market: "global",
    year: 2002
  },
  {
    id: "feedback-star",
    name: "Feedback Star",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "star-rating",
    rename_info: {
      previous_name: "Star Rating",
      renamed_year: 2015,
      reason: "Rebranded to Feedback Star to emphasize feedback-based achievement system"
    },
    desc: "Colored star badge displayed next to username indicating feedback score milestone achievement level.",
    market: "global",
    year: 2002
  },
  {
    id: "member-since",
    name: "Member Since",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback-profile",
    desc: "Account registration date displayed on profile indicating user tenure and platform experience.",
    market: "global",
    year: 2000
  },
  {
    id: "seller-reputation",
    name: "Seller Reputation",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback-profile",
    desc: "Composite seller performance score combining feedback, defect rates, shipping performance, and customer service.",
    market: "global",
    year: 2012
  },
  {
    id: "positive-feedback",
    name: "Positive Feedback",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback",
    desc: "Favorable buyer/seller review contributing +1 to feedback score with optional written comment.",
    market: "global",
    year: 1998
  },
  {
    id: "negative-feedback",
    name: "Negative Feedback",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback",
    desc: "Unfavorable review subtracting -1 from feedback score indicating transaction dissatisfaction.",
    market: "global",
    year: 1998
  },
  {
    id: "neutral-feedback",
    name: "Neutral Feedback",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback",
    desc: "Middle-ground review contributing 0 points to feedback score expressing mixed transaction experience.",
    market: "global",
    year: 1998
  },
  {
    id: "reply-to-feedback",
    name: "Reply to Feedback",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback",
    desc: "Seller response feature allowing public reply to buyer feedback for context or dispute resolution.",
    market: "global",
    year: 2004
  },
  {
    id: "feedback-removal",
    name: "Feedback Removal",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback",
    desc: "eBay process for removing policy-violating feedback including profanity, personal information, or extortion.",
    market: "global",
    year: 2006
  },

  // BUYER TOOLS & PREFERENCES (18 programs)
  {
    id: "save-for-later",
    name: "Save for Later",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "cart",
    desc: "Shopping cart feature allowing buyers to temporarily move items from cart to saved list for future purchase.",
    market: "global",
    year: 2018
  },
  {
    id: "collections",
    name: "Collections",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "my-ebay",
    desc: "Buyer organization tool for grouping saved items into custom categorized lists for project planning.",
    market: ["US", "UK", "DE"],
    year: 2020
  },
  {
    id: "my-collection",
    name: "My Collection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "collections",
    desc: "Digital inventory management system for collectors to catalog owned items with value tracking and insights.",
    market: ["US"],
    year: 2022
  },
  {
    id: "saved-sellers",
    name: "Saved Sellers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "my-ebay",
    desc: "Buyer list of favorite sellers with quick access to their stores and new listing notifications.",
    market: "global",
    year: 2014
  },
  {
    id: "saved-seller",
    name: "Saved Seller",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "saved-sellers",
    rename_info: {
      previous_name: "Follow Seller",
      renamed_year: 2021,
      reason: "Rebranded from Follow Seller to Saved Seller for consistency with Saved Searches nomenclature"
    },
    desc: "Individual seller bookmark with notification options for new listings, sales, and store updates.",
    market: "global",
    year: 2014
  },
  {
    id: "follow-seller",
    name: "Follow Seller",
    type: "category",
    tier: "feature",
    status: "deprecated",
    parent: "saved-sellers",
    rename_info: {
      previous_name: "Follow Seller",
      renamed_year: 2021,
      reason: "Deprecated in favor of Saved Seller terminology"
    },
    desc: "Deprecated feature replaced by Saved Seller for tracking favorite sellers and their inventory.",
    market: "global",
    year: 2014,
    end_year: 2021
  },
  {
    id: "store-followers",
    name: "Store Followers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "ebay-stores",
    desc: "Seller metric showing count of buyers who saved/followed store with access to follower demographics.",
    market: "global",
    year: 2017
  },
  {
    id: "following",
    name: "Following",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "my-ebay",
    desc: "Buyer dashboard displaying all followed sellers, saved searches, and curated collections in one view.",
    market: "global",
    year: 2020
  },
  {
    id: "favorite-sellers",
    name: "Favorite Sellers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "saved-sellers",
    rename_info: {
      previous_name: "Saved Sellers",
      renamed_year: 2016,
      reason: "Alternative terminology used in some markets"
    },
    desc: "Legacy terminology for Saved Sellers still used in some international markets.",
    market: ["AU", "UK"],
    year: 2014
  },
  {
    id: "saved",
    name: "Saved",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "my-ebay",
    desc: "Unified My eBay section consolidating saved searches, sellers, and collections for quick access.",
    market: "global",
    year: 2019
  },
  {
    id: "feed",
    name: "Feed",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "my-ebay",
    desc: "Personalized activity stream showing new listings from saved sellers, price drops, and recommended items.",
    market: ["US", "UK"],
    year: 2021
  },
  {
    id: "hand-picked-collections",
    name: "Hand-Picked Collections",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "homepage",
    desc: "Curated product collections created by eBay editors featuring trending items, seasonal picks, and gift guides.",
    market: "global",
    year: 2019
  },
  {
    id: "curated-lists",
    name: "Curated Lists",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "hand-picked-collections",
    desc: "Editorially selected product groupings organized by theme, occasion, or trend for discovery shopping.",
    market: "global",
    year: 2020
  },
  {
    id: "watching",
    name: "Watching",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "my-ebay",
    desc: "My eBay section displaying all watched listings with ending soon alerts and price change notifications.",
    market: "global",
    year: 2000
  },
  {
    id: "bids-offers",
    name: "Bids & Offers",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "my-ebay",
    desc: "Buyer dashboard showing active bids, sent offers, and pending counteroffers with status tracking.",
    market: "global",
    year: 2014
  },
  {
    id: "purchase-history",
    name: "Purchase History",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "my-ebay",
    desc: "Complete record of past purchases with order details, tracking, receipts, and reorder options.",
    market: "global",
    year: 2002
  },
  {
    id: "buy-again",
    name: "Buy Again",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "purchase-history",
    desc: "One-click repurchase feature finding same item or similar alternatives from previous orders.",
    market: ["US", "UK", "DE"],
    year: 2020
  },
  {
    id: "you-may-also-like",
    name: "You May Also Like",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "recommendations",
    desc: "AI-powered product recommendation module showing similar items based on browsing and purchase history.",
    market: "global",
    year: 2017
  },

  // SELLER FEEDBACK & COMMUNICATION (8 programs)
  {
    id: "feedback-revision",
    name: "Feedback Revision",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback",
    desc: "Mutual process allowing buyers to revise or withdraw feedback after seller resolution.",
    market: "global",
    year: 2007
  },
  {
    id: "mutual-withdrawal",
    name: "Mutual Withdrawal",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback-revision",
    desc: "Bilateral agreement allowing both parties to remove feedback from transaction when dispute is resolved.",
    market: "global",
    year: 2007
  },
  {
    id: "request-feedback-revision",
    name: "Request Feedback Revision",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "feedback-revision",
    desc: "Seller tool requesting buyer to change negative/neutral feedback after issue resolution or refund.",
    market: "global",
    year: 2010
  },
  {
    id: "seller-notes",
    name: "Seller Notes",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Private notes feature allowing sellers to attach internal comments to buyers, orders, or listings.",
    market: "global",
    year: 2013
  },
  {
    id: "seller-updates",
    name: "Seller Updates",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Seller news feed providing policy changes, feature releases, best practices, and platform announcements.",
    market: "global",
    year: 2011
  },
  {
    id: "announcements",
    name: "Announcements",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-updates",
    desc: "Official eBay communications about platform changes, new features, and important seller notifications.",
    market: "global",
    year: 2005
  },
  {
    id: "policy-changes",
    name: "Policy Changes",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "announcements",
    desc: "Seller notifications about updated marketplace policies, fee structures, and compliance requirements.",
    market: "global",
    year: 2008
  },
  {
    id: "seller-news",
    name: "Seller News",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Curated news content for sellers covering platform updates, selling tips, and marketplace trends.",
    market: "global",
    year: 2016
  },

  // PERFORMANCE & ANALYTICS (10 programs)
  {
    id: "service-metrics",
    name: "Service Metrics",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Seller dashboard showing defect rate, late shipment rate, valid tracking rate, and cases closed without resolution.",
    market: "global",
    year: 2016
  },
  {
    id: "transaction-defect-rate",
    name: "Transaction Defect Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "service-metrics",
    desc: "Seller performance metric measuring percentage of transactions with defects (INR, SNAD, unpaid cancellations).",
    market: "global",
    year: 2012
  },
  {
    id: "late-shipment-rate",
    name: "Late Shipment Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "service-metrics",
    desc: "Percentage of orders shipped after handling time deadline impacting seller performance standards.",
    market: "global",
    year: 2016
  },
  {
    id: "valid-tracking-rate",
    name: "Valid Tracking Rate",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "service-metrics",
    desc: "Percentage of orders with valid tracking numbers uploaded before shipping deadline.",
    market: "global",
    year: 2016
  },
  {
    id: "cases-closed-without-seller-resolution",
    name: "Cases Closed Without Seller Resolution",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "service-metrics",
    desc: "Performance metric tracking buyer requests escalated to eBay and resolved in buyer's favor.",
    market: "global",
    year: 2012
  },
  {
    id: "seller-growth-dashboard",
    name: "Seller Growth Dashboard",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Analytics dashboard showing sales trends, buyer demographics, traffic sources, and growth opportunities.",
    market: ["US", "UK", "DE"],
    year: 2022
  },
  {
    id: "seller-insights",
    name: "Seller Insights",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-hub",
    desc: "Data analytics tool providing market trends, competitor analysis, and pricing recommendations for sellers.",
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
    desc: "Comprehensive reporting interface visualizing sales, traffic, conversion rates, and performance metrics.",
    market: "global",
    year: 2017
  },
  {
    id: "traffic-reports",
    name: "Traffic Reports",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "analytics-dashboard",
    desc: "Listing-level traffic analytics showing impressions, page views, click-through rate, and visitor sources.",
    market: "global",
    year: 2015
  },
  {
    id: "customer-service-metrics",
    name: "Customer Service Metrics",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "service-metrics",
    desc: "Seller performance indicators for message response time, resolution rate, and buyer satisfaction scores.",
    market: "global",
    year: 2018
  },

  // ACCOUNT MANAGEMENT & LEGAL (10 programs)
  {
    id: "my-ebay-summary",
    name: "My eBay Summary",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "my-ebay",
    desc: "Dashboard homepage showing account overview, recent activity, messages, and personalized recommendations.",
    market: "global",
    year: 2003
  },
  {
    id: "seller-levels",
    name: "Seller Levels",
    type: "category",
    tier: "program",
    status: "current",
    parent: "seller-hub",
    desc: "Tiered seller status program (Top Rated, Above Standard, Below Standard) with performance-based benefits.",
    market: "global",
    year: 2008
  },
  {
    id: "payout-schedule",
    name: "Payout Schedule",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "managed-payments",
    desc: "Seller payment settings controlling disbursement timing (daily, weekly, on-demand) and bank account details.",
    market: "global",
    year: 2019
  },
  {
    id: "payment-holds",
    name: "Payment Holds",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "managed-payments",
    desc: "Temporary fund holds on new or at-risk seller accounts released after delivery confirmation or 30 days.",
    market: "global",
    year: 2020
  },
  {
    id: "autopay",
    name: "Autopay",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "payment",
    desc: "Automatic payment method allowing buyers to save payment info for instant checkout on future purchases.",
    market: "global",
    year: 2011
  },
  {
    id: "ebay-user-agreement",
    name: "eBay User Agreement",
    type: "legal",
    tier: "program",
    status: "current",
    parent: "legal",
    desc: "Legal contract defining terms of service, user rights, and platform policies for all eBay members.",
    market: "global",
    year: 1995
  },
  {
    id: "prohibited-items-policy",
    name: "Prohibited Items Policy",
    type: "legal",
    tier: "program",
    status: "current",
    parent: "legal",
    desc: "Policy defining items banned from eBay marketplace including weapons, counterfeit goods, and hazardous materials.",
    market: "global",
    year: 1998
  },
  {
    id: "restricted-items-policy",
    name: "Restricted Items Policy",
    type: "legal",
    tier: "program",
    status: "current",
    parent: "legal",
    desc: "Policy defining items requiring special approval or conditions to list such as alcohol, tobacco, and medical devices.",
    market: "global",
    year: 2002
  },
  {
    id: "products-with-eligibility-requirements",
    name: "Products with Eligibility Requirements",
    type: "legal",
    tier: "program",
    status: "current",
    parent: "restricted-items-policy",
    desc: "Category-specific listing requirements for regulated products requiring seller verification or documentation.",
    market: "global",
    year: 2018
  },
  {
    id: "policy-violation",
    name: "Policy Violation",
    type: "legal",
    tier: "feature",
    status: "current",
    parent: "trust-safety",
    desc: "Enforcement notice alerting sellers to listing or account policy violations requiring corrective action.",
    market: "global",
    year: 2005
  },

  // ADDITIONAL ACCOUNT & PRIVACY FEATURES (9 programs)
  {
    id: "listing-removed",
    name: "Listing Removed",
    type: "legal",
    tier: "feature",
    status: "current",
    parent: "trust-safety",
    desc: "Enforcement action removing listings that violate eBay policies with notification to seller.",
    market: "global",
    year: 2003
  },
  {
    id: "restricted-items",
    name: "Restricted Items",
    type: "legal",
    tier: "feature",
    status: "current",
    parent: "restricted-items-policy",
    desc: "Category of products requiring seller approval, documentation, or compliance verification before listing.",
    market: "global",
    year: 2006
  },
  {
    id: "help-center",
    name: "Help Center",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "customer-service",
    desc: "Self-service support portal providing FAQs, tutorials, policy documentation, and troubleshooting guides.",
    market: "global",
    year: 2002
  },
  {
    id: "help-contact",
    name: "Help & Contact",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "customer-service",
    desc: "Support hub connecting users to help articles, contact options, and community forums for assistance.",
    market: "global",
    year: 2005
  },
  {
    id: "contact-us",
    name: "Contact Us",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "customer-service",
    desc: "Multi-channel customer support portal offering live chat, phone, email, and callback options.",
    market: "global",
    year: 2000
  },
  {
    id: "customer-support",
    name: "Customer Support",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "customer-service",
    desc: "eBay's customer service system providing buyer and seller assistance for technical and policy issues.",
    market: "global",
    year: 1998
  },
  {
    id: "live-chat",
    name: "Live Chat",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "customer-support",
    desc: "Real-time text chat with eBay customer service representatives for immediate assistance.",
    market: "global",
    year: 2012
  },
  {
    id: "share-listing",
    name: "Share Listing",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "social-sharing",
    desc: "Social sharing feature allowing users to share listings via email, Facebook, Twitter, Pinterest, or copy link.",
    market: "global",
    year: 2013
  },
  {
    id: "seller-information",
    name: "Seller Information",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "listing-details",
    desc: "Public seller profile section on listing page showing feedback score, business policies, and contact options.",
    market: "global",
    year: 2001
  }
]
