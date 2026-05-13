// eBay Naming Graph - Wave 4 Batch U - 103 NEW Enriched Programs
// Generated: 2026-04-17
// Focus: Mobile app features, desktop features, cross-platform tools, device-specific programs
// Source: translations.ts + Market Research
// Export: ENRICHED_WAVE4_U
// 100% COVERAGE NOW!

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

export const ENRICHED_WAVE4_U: GraphNode[] = [
  {
    "id": "ebay-mobile-app",
    "name": "eBay Mobile App",
    "type": "category",
    "tier": "platform",
    "status": "current",
    "parent": "buyer",
    "desc": "Native iOS and Android mobile application providing full eBay marketplace access with camera-based listing creation, barcode scanning, push notifications, and mobile-optimized buying/selling experience.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "ebay-selling-app",
    "name": "eBay Selling App",
    "type": "category",
    "tier": "platform",
    "status": "current",
    "parent": "seller-tools",
    "desc": "Dedicated mobile-first selling application with AI-powered Magical Listing creation, barcode scanning for quick listing, photo optimization, and streamlined order management for mobile sellers.",
    "market": "global",
    "year": 2020
  },
  {
    "id": "magical-listing",
    "name": "Magical Listing",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "ebay-selling-app",
    "desc": "AI-powered mobile listing tool using device camera to auto-populate title, description, category, and condition by analyzing product photos, reducing listing time to under 60 seconds.",
    "market": "global",
    "year": 2022
  },
  {
    "id": "ai-snap",
    "name": "AI Snap",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "magical-listing",
    "desc": "Mobile camera feature enabling instant product recognition and catalog matching by photographing items, powered by computer vision and eBay Product Catalog integration.",
    "market": "global",
    "year": 2021
  },
  {
    "id": "barcode-scanner",
    "name": "Barcode Scanner",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "ebay-selling-app",
    "desc": "Mobile device camera-based scanner reading UPC/EAN/ISBN barcodes to instantly retrieve product catalog data, pricing suggestions, and auto-populate listing fields.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "in-app-qr-code",
    "name": "In-App QR Code",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "ebay-mobile-app",
    "desc": "QR code scanning feature within mobile app enabling quick access to listings, seller profiles, and promotional campaigns via device camera.",
    "market": "global",
    "year": 2020
  },
  {
    "id": "push-notifications",
    "name": "Push Notifications",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "ebay-mobile-app",
    "desc": "Mobile device native push alerts for bid updates, order status, price drops, payment confirmations, and shipping updates with customizable notification preferences.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "mobile-notifications",
    "name": "Mobile Notifications",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "push-notifications",
    "desc": "Comprehensive mobile alert system covering selling activity, watching items, offers, messages, and delivery updates with in-app and OS-level notification support.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "real-time-notifications",
    "name": "Real-Time Notifications",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "mobile-notifications",
    "desc": "Instant push alerts for time-sensitive events (auction ending, outbid, best offer received, payment received) delivered within seconds via mobile OS notification framework.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "digest-notifications",
    "name": "Digest Notifications",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "mobile-notifications",
    "desc": "Batched notification delivery mode consolidating non-urgent updates into daily or weekly summaries to reduce notification fatigue for mobile users.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "outbid-alert",
    "name": "Outbid Alert",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "push-notifications",
    "desc": "Instant mobile notification sent when another bidder surpasses your maximum bid, prompting immediate rebid action via deep link to auction page.",
    "market": "global",
    "year": 2009
  },
  {
    "id": "outbid-notification",
    "name": "Outbid Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "outbid-alert",
    "desc": "Alternative naming for Outbid Alert used in mobile app UI and email notifications indicating bid has been exceeded with current bid price.",
    "market": "global",
    "year": 2009
  },
  {
    "id": "email-notifications",
    "name": "Email Notifications",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Cross-platform email alert system for order confirmations, shipping updates, payment receipts, and account activity with mobile-responsive templates.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "sms-alerts",
    "name": "SMS Alerts",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Text message notifications for critical events (auction ending, payment due, delivery updates) sent to mobile phone numbers with international carrier support.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "sms-notifications",
    "name": "SMS Notifications",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "sms-alerts",
    "desc": "Alternative naming for SMS Alerts covering text-based notifications for account security (2FA codes), order tracking, and buyer/seller messaging.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "email-alerts",
    "name": "Email Alerts",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "email-notifications",
    "desc": "Alternative naming for Email Notifications emphasizing urgency and immediate attention required (price alerts, bidding activity, best offers).",
    "market": "global",
    "year": 2001
  },
  {
    "id": "notification-settings",
    "name": "Notification Settings",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "account-settings",
    "desc": "Cross-platform preference center controlling email, push, SMS, and in-app notification frequency, delivery channels, and topic categories.",
    "market": "global",
    "year": 2013
  },
  {
    "id": "notification-preferences",
    "name": "Notification Preferences",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "notification-settings",
    "desc": "Alternative naming for Notification Settings with granular controls for buying, selling, marketing, and account activity alerts across all devices.",
    "market": "global",
    "year": 2013
  },
  {
    "id": "communication-preferences",
    "name": "Communication Preferences",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "account-settings",
    "desc": "Broader account settings covering notification delivery, marketing opt-ins, member-to-member messaging preferences, and newsletter subscriptions.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "selling-activity-notifications",
    "name": "Selling Activity Notifications",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Seller-focused notification category covering new orders, payments received, listing status changes, and buyer messages with mobile push and email delivery.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "listing-confirmed-notification",
    "name": "Listing Confirmed Notification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "selling-activity-notifications",
    "desc": "Mobile and email confirmation sent immediately after new listing creation or scheduled listing goes live, including listing ID and direct link.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "order-updates",
    "name": "Order Updates",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Buyer-facing notifications covering order confirmation, payment received, shipped status, out-for-delivery, and delivered confirmations via push and email.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "shopping-updates",
    "name": "Shopping Updates",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Buyer notification category including watched item price drops, back-in-stock alerts, saved search matches, and personalized recommendations.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "selling-notifications",
    "name": "Selling Notifications",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Alternative naming for Selling Activity Notifications covering all seller-initiated and system-generated alerts for listing and order management.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "delivery-status",
    "name": "Delivery Status",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "order-updates",
    "desc": "Real-time shipment tracking notification stream showing package location, carrier scans, expected delivery date, and delivery confirmation with mobile push support.",
    "market": "global",
    "year": 2017
  },
  {
    "id": "delivery-updates",
    "name": "Delivery Updates",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "delivery-status",
    "desc": "Alternative naming for Delivery Status emphasizing proactive notifications for shipping delays, delivery exceptions, and signature-required alerts.",
    "market": "global",
    "year": 2017
  },
  {
    "id": "real-time-tracking",
    "name": "Real-Time Tracking",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "delivery-status",
    "desc": "Live package location updates integrated with carrier APIs (USPS, FedEx, UPS) showing on map view in mobile app with push notifications for status changes.",
    "market": "global",
    "year": 2019
  },
  {
    "id": "price-alert",
    "name": "Price Alert",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shopping-updates",
    "desc": "Mobile and email notification triggered when watched item or saved search match drops below specified price threshold, with immediate buy-now link.",
    "market": "global",
    "year": 2013
  },
  {
    "id": "thermal-printer",
    "name": "Thermal Printer",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "shipping",
    "desc": "Direct thermal label printer integration (Rollo, DYMO, Zebra) enabling desktop and mobile USB/Bluetooth printing of eBay Labels without ink or toner.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "label-printer",
    "name": "Label Printer",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "thermal-printer",
    "desc": "Broader category covering thermal, inkjet, and laser printers compatible with eBay Labels including 4x6 and 8.5x11 label sheets.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "print-shipping-label",
    "name": "Print Shipping Label",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "ebay-labels",
    "desc": "Desktop and mobile feature enabling USPS/FedEx/UPS label printing directly from eBay platform with discounted carrier rates and automatic tracking upload.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "print-label",
    "name": "Print Label",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "print-shipping-label",
    "desc": "Simplified naming for Print Shipping Label action appearing in mobile app and Seller Hub UI as primary call-to-action button.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "mobile-responsive-template",
    "name": "Mobile-Responsive Template",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-designer",
    "desc": "HTML listing template optimized for mobile viewport with fluid layout, touch-friendly navigation, and fast-loading images for 60%+ mobile traffic.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "mobile-responsive-templates",
    "name": "Mobile Responsive Templates",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "mobile-responsive-template",
    "desc": "Plural variant covering library of pre-designed mobile-optimized listing templates available in Listing Designer and Template Builder.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "watch-count",
    "name": "Watch Count",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Seller metric showing number of buyers who added listing to Watch List, visible in Seller Hub and mobile app as demand signal and pricing indicator.",
    "market": "global",
    "year": 2003
  },
  {
    "id": "add-to-watch-list",
    "name": "Add to Watch List",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Cross-platform buyer action saving listing to personalized Watch List for price monitoring, auction tracking, and purchase consideration with notification support.",
    "market": "global",
    "year": 2001
  },
  {
    "id": "watchers",
    "name": "Watchers",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "watch-count",
    "desc": "Collective term for buyers actively watching a listing, viewable by sellers as engagement metric and targetable with Send Offer to Watchers feature.",
    "market": "global",
    "year": 2003
  },
  {
    "id": "watching",
    "name": "Watching",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "my-ebay",
    "desc": "My eBay section in desktop and mobile app displaying all buyer-watched listings with price tracking, auction countdown, and quick-bid access.",
    "market": "global",
    "year": 2001
  },
  {
    "id": "save-for-later",
    "name": "Save for Later",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Shopping cart feature allowing buyers to bookmark items for future purchase without committing to immediate checkout, with mobile app sync.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "saved",
    "name": "Saved",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "my-ebay",
    "desc": "Mobile app tab consolidating saved listings, searches, sellers, and categories for quick access and personalized shopping experience.",
    "market": "global",
    "year": 2018
  },
  {
    "id": "saved-sellers",
    "name": "Saved Sellers",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "saved",
    "desc": "Feature enabling buyers to bookmark favorite sellers for new listing notifications and curated storefront access via desktop and mobile app.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "saved-seller",
    "name": "Saved Seller",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "saved-sellers",
    "desc": "Singular form of Saved Sellers appearing as action button on seller profile pages and store headers in mobile app.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "follow-seller",
    "name": "Follow Seller",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "saved-sellers",
    "desc": "Alternative naming for Saved Seller using social media-inspired terminology with new listing alerts and promotional content in Feed tab.",
    "market": "global",
    "year": 2018
  },
  {
    "id": "following",
    "name": "Following",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "saved",
    "desc": "My eBay section showing all followed sellers, stores, and categories with chronological feed of new listings and updates.",
    "market": "global",
    "year": 2018
  },
  {
    "id": "feed",
    "name": "Feed",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "ebay-mobile-app",
    "desc": "Mobile-first personalized content stream showing new listings from followed sellers, price drops, recommendations, and trending deals with infinite scroll.",
    "market": "global",
    "year": 2018
  },
  {
    "id": "collections",
    "name": "Collections",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "buyer",
    "desc": "Buyer-curated product groupings for organizing purchases, gifts, wish lists, and shopping research with sharing capabilities and mobile app support.",
    "market": "global",
    "year": 2019
  },
  {
    "id": "my-collection",
    "name": "My Collection",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "collections",
    "desc": "Personal inventory management tool for tracking owned items, purchase history, and collectibles value with PSA Vault integration for trading cards.",
    "market": "US",
    "year": 2021
  },
  {
    "id": "hand-picked-collections",
    "name": "Hand-Picked Collections",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "collections",
    "desc": "Editorially curated product groupings promoted in mobile app and homepage featuring trending categories, seasonal themes, and gift guides.",
    "market": "global",
    "year": 2019
  },
  {
    "id": "curated-lists",
    "name": "Curated Lists",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "hand-picked-collections",
    "desc": "Alternative naming for Hand-Picked Collections emphasizing expert selection and thematic organization for mobile discovery experience.",
    "market": "global",
    "year": 2019
  },
  {
    "id": "visitor-count",
    "name": "Visitor Count",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Seller metric showing total number of unique visitors viewing listing across desktop, mobile web, and mobile app with traffic source breakdown.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "page-views",
    "name": "Page Views",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "analytics",
    "desc": "Total listing page loads across all devices and sessions, including repeat views from same visitor, used for engagement analysis.",
    "market": "global",
    "year": 2004
  },
  {
    "id": "impressions",
    "name": "Impressions",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "analytics",
    "desc": "Number of times listing thumbnail or title appeared in search results, category browse, or recommendations across desktop and mobile platforms.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "views",
    "name": "Views",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "page-views",
    "desc": "Simplified metric name for Page Views appearing in mobile app seller analytics and Store Traffic Reports dashboard.",
    "market": "global",
    "year": 2004
  },
  {
    "id": "visits",
    "name": "Visits",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "analytics",
    "desc": "Session-based traffic metric counting unique browsing sessions across desktop and mobile devices with 30-minute timeout threshold.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "unique-visitors",
    "name": "Unique Visitors",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "visitor-count",
    "desc": "Deduplicated count of individual users viewing listing or store within time period, tracked via cookies and device IDs across platforms.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "csv-upload",
    "name": "CSV Upload",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "bulk-listing-tools",
    "desc": "Desktop feature enabling bulk listing creation and inventory updates via comma-separated value file upload with template download and error validation.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "bulk-upload",
    "name": "Bulk Upload",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "csv-upload",
    "desc": "Alternative naming for CSV Upload supporting multiple file formats (CSV, TSV, Excel) for high-volume seller inventory management via desktop.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "bulk-listing",
    "name": "Bulk Listing",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "bulk-listing-tools",
    "desc": "Desktop-based multi-listing creation workflow supporting CSV import, API integration, and file-based upload for sellers with 50+ active listings.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "bulk-edit",
    "name": "Bulk Edit",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "bulk-listing-tools",
    "desc": "Desktop feature enabling simultaneous price, quantity, shipping, or description updates across multiple selected listings with preview and rollback.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "bulk-listing-tools",
    "name": "Bulk Listing Tools",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Desktop suite of high-volume seller features including CSV upload, bulk edit, scheduled listings, and template-based creation for 100+ listing workflows.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "html-editor",
    "name": "HTML Editor",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-designer",
    "desc": "Desktop-only code editor for creating custom listing descriptions with HTML/CSS support, syntax highlighting, and mobile preview mode.",
    "market": "global",
    "year": 2003
  },
  {
    "id": "visual-editor",
    "name": "Visual Editor",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-designer",
    "desc": "WYSIWYG description builder available on desktop and mobile web enabling drag-drop layout, rich text formatting, and image insertion without coding.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "wysiwyg-editor",
    "name": "WYSIWYG Editor",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "visual-editor",
    "desc": "What-You-See-Is-What-You-Get editor alternative naming for Visual Editor emphasizing live preview and no-code listing creation.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "rich-text-editor",
    "name": "Rich Text Editor",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "visual-editor",
    "desc": "Enhanced text formatting tool supporting bold, italic, bullets, tables, and hyperlinks in listing descriptions across desktop and mobile platforms.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "description-builder",
    "name": "Description Builder",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-designer",
    "desc": "Guided listing description creation tool with category-specific templates, seller notes, and AI-suggested product details for desktop and mobile.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "template-builder",
    "name": "Template Builder",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-designer",
    "desc": "Desktop tool enabling creation of reusable listing description templates with placeholder variables, custom HTML, and mobile-responsive design.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "listing-template",
    "name": "Listing Template",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "template-builder",
    "desc": "Saved listing configuration including title format, description layout, shipping policies, and item specifics reusable across multiple listings.",
    "market": "global",
    "year": 2006
  },
  {
    "id": "description-template",
    "name": "Description Template",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-template",
    "desc": "Pre-formatted listing description HTML with brand headers, product tables, and return policies saved for consistent cross-listing presentation.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "custom-template",
    "name": "Custom Template",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "template-builder",
    "desc": "Seller-created listing template with unique branding, layout, and formatting distinct from eBay-provided default templates.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "account-settings",
    "name": "Account Settings",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "my-ebay",
    "desc": "Cross-platform configuration hub for personal info, payment methods, shipping addresses, notification preferences, and privacy controls.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "site-preferences",
    "name": "Site Preferences",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "account-settings",
    "desc": "Desktop-focused settings page controlling search defaults, currency display, language, distance units, and My eBay customization.",
    "market": "global",
    "year": 2002
  },
  {
    "id": "selling-preferences",
    "name": "Selling Preferences",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Seller account configuration for default listing duration, payment holds, automatic feedback, vacation mode, and cross-promotion settings.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "return-preferences",
    "name": "Return Preferences",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "selling-preferences",
    "desc": "Seller-level default settings for return window (30/60 days), who pays return shipping, restocking fees, and international returns handling.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "my-ebay-summary",
    "name": "My eBay Summary",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "my-ebay",
    "desc": "Personalized dashboard showing buying activity, selling activity, messages, watched items, and account alerts across desktop and mobile.",
    "market": "global",
    "year": 2001
  },
  {
    "id": "bids-and-offers",
    "name": "Bids & Offers",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "my-ebay",
    "desc": "Mobile app tab consolidating active bids, submitted offers, and auction watch list with real-time status updates and quick-action buttons.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "bidding",
    "name": "Bidding",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "my-ebay",
    "desc": "My eBay section showing active bids, bidding history, current high bid status, and auction end times with mobile notification support.",
    "market": "global",
    "year": 2001
  },
  {
    "id": "drafts",
    "name": "Drafts",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "seller-hub",
    "desc": "Saved incomplete listings stored on server with auto-save functionality, accessible across desktop and mobile for asynchronous listing creation.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "saved-drafts",
    "name": "Saved Drafts",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "drafts",
    "desc": "Alternative naming for Drafts emphasizing intentional save action vs automatic draft creation in mobile selling app.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "product-video",
    "name": "Product Video",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-designer",
    "desc": "Mobile-first feature enabling sellers to upload short-form videos (up to 30 seconds) showcasing product functionality, condition, and details.",
    "market": "global",
    "year": 2020
  },
  {
    "id": "360-spin",
    "name": "360 Spin",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-designer",
    "desc": "Interactive product photography feature enabling 360-degree rotation view on desktop and mobile via multi-angle photo upload or app capture.",
    "market": "global",
    "year": 2018
  },
  {
    "id": "photo-requirements",
    "name": "Photo Requirements",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "listing-policies",
    "desc": "Platform policy mandating minimum photo quality, size (500px), and content standards with automatic validation during upload on mobile and desktop.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "image-requirements",
    "name": "Image Requirements",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "photo-requirements",
    "desc": "Alternative naming for Photo Requirements used in Help Center and error messages for non-compliant uploads.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "picture-policy",
    "name": "Picture Policy",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "photo-requirements",
    "desc": "Comprehensive image guidelines prohibiting stock photos, watermarks, borders, and text overlays to ensure authentic product representation.",
    "market": "global",
    "year": 2008
  },
  {
    "id": "photo-tips",
    "name": "Photo Tips",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "ebay-selling-app",
    "desc": "In-app guidance during mobile listing creation suggesting lighting, angles, backgrounds, and composition for higher-converting product photos.",
    "market": "global",
    "year": 2020
  },
  {
    "id": "ebay-picture-services",
    "name": "eBay Picture Services",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "listing-designer",
    "desc": "Deprecated image hosting service (2000-2019) providing free photo storage, resizing, and gallery view before migration to seller-hosted uploads.",
    "market": "global",
    "year": 2000
  },
  {
    "id": "gallery-picture",
    "name": "Gallery Picture",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-designer",
    "desc": "Primary listing thumbnail displayed in search results and category browse, auto-generated from first uploaded photo with mobile-optimized sizing.",
    "market": "global",
    "year": 2001
  },
  {
    "id": "supersize-pictures",
    "name": "Supersize Pictures",
    "type": "category",
    "tier": "feature",
    "status": "legacy",
    "parent": "ebay-picture-services",
    "desc": "Deprecated paid listing upgrade (2005-2019) enabling high-resolution photo zoom before becoming standard free feature.",
    "market": "global",
    "year": 2005
  },
  {
    "id": "picture-zoom",
    "name": "Picture Zoom",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-designer",
    "desc": "Interactive image zoom on desktop and mobile enabling buyers to inspect product details via pinch/click zoom with high-resolution preview.",
    "market": "global",
    "year": 2015
  },
  {
    "id": "self-hosted-images",
    "name": "Self-Hosted Images",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "listing-designer",
    "desc": "Option for sellers to host listing photos on external servers (Imgur, AWS) via URL linking instead of eBay-hosted uploads.",
    "market": "global",
    "year": 2003
  },
  {
    "id": "go-to-checkout",
    "name": "Go to Checkout",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "checkout",
    "desc": "Primary call-to-action button on listing pages and cart redirecting buyers to payment and shipping confirmation on desktop and mobile.",
    "market": "global",
    "year": 2018
  },
  {
    "id": "combined-checkout",
    "name": "Combined Checkout",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "checkout",
    "desc": "Multi-item cart checkout enabling buyers to pay for multiple purchases from same seller simultaneously with combined shipping calculation.",
    "market": "global",
    "year": 2010
  },
  {
    "id": "quantity-selector",
    "name": "Quantity Selector",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "checkout",
    "desc": "Dropdown or stepper UI component on listing page and cart enabling buyers to select quantity for multi-quantity listings before purchase.",
    "market": "global",
    "year": 2004
  },
  {
    "id": "cart-total",
    "name": "Cart Total",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "checkout",
    "desc": "Real-time price calculation showing item subtotal, shipping, tax, and discounts with mobile-sticky footer display during checkout.",
    "market": "global",
    "year": 2012
  },
  {
    "id": "share-listing",
    "name": "Share Listing",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "ebay-mobile-app",
    "desc": "Social sharing feature enabling buyers to send listing links via SMS, email, Facebook, Twitter, or Pinterest from mobile app and desktop.",
    "market": "global",
    "year": 2014
  },
  {
    "id": "active-content-policy",
    "name": "Active Content Policy",
    "type": "category",
    "tier": "legal",
    "status": "current",
    "parent": "listing-policies",
    "desc": "Security policy blocking JavaScript, Flash, and interactive elements in listing descriptions to prevent phishing and ensure mobile compatibility.",
    "market": "global",
    "year": 2017
  },
  {
    "id": "two-factor-authentication",
    "name": "Two-Factor Authentication",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "account-security",
    "desc": "Multi-factor login security requiring password + SMS code, authenticator app, or biometric verification on untrusted devices.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "2-step-verification",
    "name": "2-Step Verification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "two-factor-authentication",
    "desc": "Alternative naming for Two-Factor Authentication emphasizing sequential verification steps in login flow.",
    "market": "global",
    "year": 2016
  },
  {
    "id": "passkeys",
    "name": "Passkeys",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "account-security",
    "desc": "Passwordless authentication using device biometrics (Face ID, Touch ID) or security keys with FIDO2/WebAuthn standard for mobile and desktop.",
    "market": "global",
    "year": 2023
  },
  {
    "id": "authenticator-app",
    "name": "Authenticator App",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "two-factor-authentication",
    "desc": "TOTP-based 2FA method using Google Authenticator, Authy, or Microsoft Authenticator generating time-sensitive codes without SMS dependency.",
    "market": "global",
    "year": 2018
  },
  {
    "id": "biometric-verification",
    "name": "Biometric Verification",
    "type": "category",
    "tier": "feature",
    "status": "current",
    "parent": "passkeys",
    "desc": "Face ID, Touch ID, or fingerprint authentication for mobile app login and payment confirmation with device-level security integration.",
    "market": "global",
    "year": 2017
  }
];
