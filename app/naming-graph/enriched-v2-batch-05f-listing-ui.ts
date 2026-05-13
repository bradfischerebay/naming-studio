import type { NodeEnrichmentV2 } from './enriched-v2-batch-01-trust'

// Batch 5f — Listing Attributes, Auction Mechanics, Notifications, Support,
//             Mobile, Buyer UI, Media/Photo, Niche Categories, Store Tiers,
//             and Special Programs
// Final batch — completes all 909 enrichment nodes

export const LISTING_UI_ENRICHMENT: NodeEnrichmentV2[] = [

  // ── LISTING ATTRIBUTES & ENHANCEMENTS ───────────────────────────────────

  {
    id: 'item-specifics',
    valueProp: 'Item Specifics are the structured attribute fields — brand, size, color, material, compatibility — that sellers fill in to describe an item precisely, making listings findable via filters and improving buyer confidence.',
    valueTerritories: ['transparency', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/item-specifics'],
  },

  {
    id: 'item-specifics-filter',
    valueProp: 'Item Specifics Filter is the search refinement panel that lets buyers filter by structured attributes — brand, size, color, material — to find exactly the item they want.',
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'item-condition',
    valueProp: 'Item Condition is the standardized attribute describing an item\'s physical state — New, Like New, Very Good, Good, Acceptable, For Parts — the most universally used item-specific on eBay.',
    valueTerritories: ['transparency', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/item-condition'],
  },

  {
    id: 'condition-description',
    valueProp: 'Condition Description is the free-text field where sellers elaborate on an item\'s condition beyond the standardized condition label — disclosing flaws, age, and usage to set accurate buyer expectations.',
    valueTerritories: ['transparency', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/item-condition'],
  },

  {
    id: 'item-location',
    valueProp: 'Item Location is the listing attribute showing the geographic origin of the item — helping buyers estimate delivery time, calculate import costs, and filter for nearby pickup options.',
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'product-identifiers',
    valueProp: 'Product Identifiers are standardized codes — UPC, EAN, ISBN, MPN, Brand — that match a listing to eBay\'s product catalog, enabling accurate search indexing and cross-listing product pages.',
    valueTerritories: ['transparency', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/product-identifiers'],
  },

  {
    id: 'custom-label',
    valueProp: 'Custom Label is a seller-defined alphanumeric code attached to a listing for internal inventory tracking — not visible to buyers, used by sellers to link eBay listings to their own systems.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'subtitle',
    valueProp: 'Subtitle is the optional second line of text beneath a listing title in search results — allowing sellers to highlight key selling points with additional characters beyond the 80-character title limit.',
    valueTerritories: ['selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/listing-upgrades'],
  },

  {
    id: 'bold',
    valueProp: 'Bold is a paid listing upgrade that displays the listing title in bold text in search results — increasing visual prominence and drawing buyer attention in competitive search pages.',
    valueTerritories: ['selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/listing-upgrades'],
  },

  {
    id: 'bold-title',
    valueProp: 'Bold Title is the same listing prominence upgrade as Bold — referred to by its full descriptive label in help content and seller communications.',
    valueTerritories: ['selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/listing-upgrades'],
  },

  {
    id: 'gallery-picture',
    valueProp: 'Gallery Picture is the primary thumbnail image displayed in search results alongside a listing — the single most important image for capturing buyer click-through.',
    valueTerritories: ['selection', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/photos-videos'],
  },

  {
    id: 'gallery-plus',
    valueProp: 'Gallery Plus is a paid listing upgrade that displays a larger thumbnail image in search results — giving the listing more visual real estate and differentiating it from standard thumbnails.',
    valueTerritories: ['selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/listing-upgrades'],
  },

  {
    id: 'supersize-pictures',
    valueProp: 'Supersize Pictures is the legacy listing upgrade that expanded item images to larger display sizes — a precursor to modern zoom and full-screen image viewers now standard in all listings.',
    valueTerritories: ['transparency'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/listing-upgrades'],
  },

  {
    id: 'listing-designer',
    valueProp: 'Listing Designer is the legacy tool for applying visual themes and HTML layout templates to listing descriptions — deprecated in favor of the modern description editor as eBay moved away from active content.',
    valueTerritories: ['selection'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'visual-editor',
    valueProp: 'Visual Editor is the WYSIWYG description editor within the listing creation flow — allowing sellers to format text, add images, and build listing descriptions without writing HTML.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'rich-text-editor',
    valueProp: 'Rich Text Editor is the formatted text input component in the listing creation tool — supporting bold, italic, lists, and basic formatting for seller-written descriptions.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'html-editor',
    valueProp: 'HTML Editor is the raw-code alternative to the visual editor in listing creation — used by advanced sellers who prefer writing custom HTML for their item descriptions.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'wysiwyg-editor',
    valueProp: 'WYSIWYG Editor is the What-You-See-Is-What-You-Get description editing mode — the technical term for the Visual Editor that renders formatting in real time as sellers type.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'description-builder',
    valueProp: 'Description Builder is an AI-assisted or templated tool that helps sellers create compelling listing descriptions — reducing the time and skill required to write effective item copy.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'description-template',
    valueProp: 'Description Template is a pre-saved listing description layout that sellers apply to similar items — reducing repetitive writing for sellers with consistent inventory.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'description-templates',
    valueProp: 'Description Templates is the plural form and the section in Seller Hub for managing saved description layouts — the library view where sellers create, edit, and apply templates.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'listing-template',
    valueProp: 'Listing Template is a saved full listing configuration — including title format, description, shipping, and return policies — applied to create consistent listings for recurring inventory.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'listing-templates',
    valueProp: 'Listing Templates is the plural and section label for the full collection of a seller\'s saved listing configurations — managed in Seller Hub for batch application.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'template-builder',
    valueProp: 'Template Builder is the editor for creating and configuring reusable listing templates — the interface where sellers define the standard fields and policies applied to new listings.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'custom-template',
    valueProp: 'Custom Template is a seller-built listing or description template personalized beyond eBay\'s standard defaults — reflecting the seller\'s brand style or specialized inventory needs.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'listing-error',
    valueProp: 'Listing Error is the validation failure message shown when a listing cannot be published — indicating which required fields are missing or which policy violations need to be corrected.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'listing-upgrades',
    valueProp: 'Listing Upgrades are paid enhancements to a standard listing — Bold title, Gallery Plus, Subtitle — that increase visibility in search results for a fee.',
    valueTerritories: ['selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/listing-upgrades'],
  },

  {
    id: 'listing-confirmed-notification',
    valueProp: 'Listing Confirmed Notification is the system email and in-app message sent to a seller confirming their listing has been successfully published and is live on eBay.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'item-description-editor',
    valueProp: 'Item Description Editor is the full-featured text composition area within the listing creation form — where sellers craft the narrative description buyers read on the item page.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'variation-photos',
    valueProp: 'Variation Photos allow sellers to assign different images to each variation of a multi-variation listing — showing buyers the specific color, size, or style they are selecting.',
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/multi-variation-listings'],
  },

  {
    id: 'variation-specifics',
    valueProp: 'Variation Specifics are the attributes that define each variant in a multi-variation listing — size, color, material — displayed as selectable options for buyers before they add to cart.',
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/multi-variation-listings'],
  },

  {
    id: 'self-hosted-images',
    valueProp: 'Self-Hosted Images is the legacy practice of linking to images stored on third-party servers in listing descriptions — now restricted under eBay\'s active content policy in favor of eBay-hosted media.',
    valueTerritories: ['transparency'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/photos-videos'],
  },

  {
    id: '360-spin',
    valueProp: '360-Spin is the interactive product view that rotates item images in a complete circle — giving buyers a more complete sense of an item\'s physical appearance from all angles.',
    valueTerritories: ['transparency', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/photos-videos'],
  },

  {
    id: 'schedule-start-time',
    valueProp: 'Schedule Start Time is the listing option for setting a future publish date and time — allowing sellers to launch listings at peak buyer traffic moments without manual intervention.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'scheduled-listing',
    valueProp: 'Scheduled Listing is an active listing that has been set with a future start time — visible in the seller\'s draft or scheduled queue until it goes live at the configured moment.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'scheduled-listings',
    valueProp: 'Scheduled Listings is the Seller Hub view showing all listings set to go live at a future time — the management dashboard for planned inventory releases.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'active-content-policy',
    valueProp: 'Active Content Policy is eBay\'s rule prohibiting JavaScript, Flash, and externally hosted scripts in listing descriptions — enforced to protect buyers from security risks and ensure consistent mobile rendering.',
    valueTerritories: ['trust', 'protection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/active-content'],
  },

  // ── AUCTION BIDDING MECHANICS ────────────────────────────────────────────

  {
    id: 'bid-now',
    valueProp: 'Bid Now is the auction CTA that places a buyer\'s bid on a live auction listing — the primary buyer action in the auction format, initiating the competitive bidding process.',
    valueTerritories: ['speed', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/buying-auction'],
  },

  {
    id: 'bidding',
    valueProp: 'Bidding is the active state of placing competitive bids on an auction listing — the core buying mechanism of eBay\'s original marketplace format.',
    valueTerritories: ['selection', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/buying-auction'],
  },

  {
    id: 'bids-and-offers',
    valueProp: 'Bids and Offers is the My eBay section consolidating all active auction bids and Best Offer negotiations in one view — the buyer\'s dashboard for tracking in-progress competitive purchases.',
    valueTerritories: ['convenience', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/buying-auction'],
  },

  {
    id: 'place-bid',
    valueProp: 'Place Bid is the action confirming an auction bid submission — the final step after entering a bid amount, converting the buyer\'s intent into an active auction bid.',
    valueTerritories: ['speed', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/buying-auction'],
  },

  {
    id: 'number-of-bids',
    valueProp: 'Number of Bids is the bid count displayed on auction listings — showing buyer interest and signaling how competitive the item is, which can influence both buyer urgency and further bidding.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/buying-auction'],
  },

  {
    id: 'current-bid',
    valueProp: 'Current Bid is the real-time highest bid amount on an active auction — the price a buyer must exceed to become the leading bidder.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/buying-auction'],
  },

  {
    id: 'starting-bid',
    valueProp: 'Starting Bid is the minimum opening price set by the seller to begin an auction — the lowest amount any buyer can submit as their first bid.',
    valueTerritories: ['transparency', 'value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/buying-auction'],
  },

  {
    id: 'time-left',
    valueProp: 'Time Left is the live countdown timer on auction listings showing how much time remains before the listing closes — creating urgency and informing last-minute bidding decisions.',
    valueTerritories: ['transparency', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/buying-auction'],
  },

  {
    id: 'reserve-met',
    valueProp: 'Reserve Met is the status label indicating an auction\'s current bid has exceeded the seller\'s minimum acceptable price — confirming the item will sell if no cancellation occurs.',
    valueTerritories: ['transparency', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/buying-auction'],
  },

  {
    id: 'reserve-not-met',
    valueProp: 'Reserve Not Met is the status label indicating the current highest bid is still below the seller\'s undisclosed minimum — warning buyers the item may not sell at the current price.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/buying-auction'],
  },

  {
    id: 'winning-bid',
    valueProp: 'Winning Bid is the final highest bid amount at auction close that determines the purchase price — the amount the winning buyer pays and the seller receives.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/buying-auction'],
  },

  {
    id: 'winning-notice',
    valueProp: 'Winning Notice is the notification sent to the highest bidder when an auction closes — confirming they won and directing them to proceed to payment.',
    valueTerritories: ['transparency', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/buying-auction'],
  },

  {
    id: 'outbid-alert',
    valueProp: 'Outbid Alert is the notification sent when a buyer\'s auction bid has been exceeded by another bidder — prompting them to bid again if they still want the item.',
    valueTerritories: ['transparency', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/buying-auction'],
  },

  {
    id: 'outbid-notice',
    valueProp: 'Outbid Notice is the in-platform UI state showing a buyer they have been outbid — displayed on the listing page and in My eBay to prompt return bids.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/buying-auction'],
  },

  {
    id: 'outbid-notification',
    valueProp: 'Outbid Notification is the push or email variant of the outbid alert — sent via the buyer\'s preferred notification channel when another buyer has placed a higher bid.',
    valueTerritories: ['transparency', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/buying/buying-auction'],
  },

  // ── NOTIFICATIONS & COMMUNICATIONS ──────────────────────────────────────

  {
    id: 'email-alerts',
    valueProp: 'Email Alerts are eBay-triggered emails notifying users of price drops, new listings matching saved searches, outbids, or messages — delivering timely signals to buyers and sellers via their inbox.',
    valueTerritories: ['convenience', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/messaging/messaging'],
  },

  {
    id: 'email-notifications',
    valueProp: 'Email Notifications is the broader category of all automated eBay emails — order confirmations, shipping updates, feedback requests, and account alerts — controlled via Communication Preferences.',
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/messaging/messaging'],
  },

  {
    id: 'sms-alerts',
    valueProp: 'SMS Alerts are text message notifications for critical account events — outbids, winning notices, shipping confirmations — sent to a buyer\'s phone for real-time awareness.',
    valueTerritories: ['speed', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/messaging/messaging'],
  },

  {
    id: 'sms-notifications',
    valueProp: 'SMS Notifications is the settings category for configuring text message alerts from eBay — controlling which events trigger phone texts for a user\'s account.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/messaging/messaging'],
  },

  {
    id: 'push-notifications',
    valueProp: 'Push Notifications are mobile app alerts delivered directly to a user\'s device lock screen — providing immediate visibility for bid activity, messages, and order updates without opening the app.',
    valueTerritories: ['speed', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/messaging/messaging'],
  },

  {
    id: 'real-time-notifications',
    valueProp: 'Real-Time Notifications are instant platform alerts delivered the moment an event occurs — outbids, offers, messages — as opposed to delayed digest or scheduled summary notifications.',
    valueTerritories: ['speed', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/messaging/messaging'],
  },

  {
    id: 'mobile-notifications',
    valueProp: 'Mobile Notifications is the combined setting for all push and in-app notifications delivered through the eBay mobile app — managing real-time awareness on a buyer\'s or seller\'s smartphone.',
    valueTerritories: ['convenience', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/messaging/messaging'],
  },

  {
    id: 'digest-notifications',
    valueProp: 'Digest Notifications is the batched notification format that groups multiple events into a single summary email or alert — reducing notification volume for users who prefer periodic summaries.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/messaging/messaging'],
  },

  {
    id: 'shopping-updates',
    valueProp: 'Shopping Updates is the notification category for buyer-relevant activity — price drops on watchlisted items, new Best Match listings for saved searches, and similar interest-based alerts.',
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/messaging/messaging'],
  },

  {
    id: 'unread-messages',
    valueProp: 'Unread Messages is the notification badge and inbox indicator showing a user has new messages from buyers, sellers, or eBay — the primary entry point to the eBay message center.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/messaging/messaging'],
  },

  {
    id: 'get-alerts',
    valueProp: 'Get Alerts is the buyer CTA to subscribe to notifications for a specific search or item category — enabling price drop, new listing, and availability alerts for items of interest.',
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'email-to-friend',
    valueProp: 'Email to Friend is the legacy social sharing feature allowing buyers to forward a listing URL via email — a pre-social-media sharing mechanism largely superseded by modern share actions.',
    valueTerritories: ['community'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebay.com'],
  },

  {
    id: 'share-listing',
    valueProp: 'Share Listing is the action enabling buyers to share an eBay listing URL via social media, messaging apps, or email — driving external traffic and word-of-mouth discovery.',
    valueTerritories: ['community', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com'],
  },

  {
    id: 'share-this-item',
    valueProp: 'Share This Item is the item-page variant of Share Listing — the CTA label used directly on the listing view page to initiate sharing of the specific item\'s URL.',
    valueTerritories: ['community'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com'],
  },

  // ── SUPPORT & RESOLUTION ─────────────────────────────────────────────────

  {
    id: 'help-center',
    valueProp: 'Help Center is eBay\'s self-service support portal with articles, guides, and automated tools — the primary destination for buyers and sellers seeking answers without contacting live support.',
    valueTerritories: ['trust', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/'],
  },

  {
    id: 'ebay-customer-service',
    valueProp: 'eBay Customer Service is the branded identity of eBay\'s buyer and seller support operation — encompassing live chat, phone, virtual assistant, and resolution center access for complex issues.',
    valueTerritories: ['trust', 'protection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/'],
  },

  {
    id: 'live-chat-support',
    valueProp: 'Live Chat Support is the real-time text messaging channel with an eBay customer service agent — available for escalated issues that the Help Center self-service flow cannot resolve.',
    valueTerritories: ['trust', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/'],
  },

  {
    id: 'phone-support',
    valueProp: 'Phone Support is the voice call option for eBay customer service — used for high-complexity or high-urgency issues where text-based support is insufficient.',
    valueTerritories: ['trust', 'protection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/'],
  },

  {
    id: 'virtual-assistant',
    valueProp: 'Virtual Assistant is eBay\'s AI-powered chatbot in the Help Center that guides users through common issue resolution flows — attempting to resolve questions before escalating to a live agent.',
    valueTerritories: ['convenience', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/'],
  },

  {
    id: 'issue-resolution-center',
    valueProp: 'Issue Resolution Center is the formal dispute management portal where buyers and sellers work through order problems — the starting point for return requests, item-not-received claims, and item-not-as-described cases.',
    valueTerritories: ['protection', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/resolutioncentre/'],
  },

  {
    id: 'resolution-center',
    valueProp: 'Resolution Center is the alternate label used in many eBay help articles and UI surfaces for the Issue Resolution Center — the same dispute management destination under a shorter name.',
    valueTerritories: ['protection', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/resolutioncentre/'],
  },

  {
    id: 'ask-question',
    valueProp: 'Ask Question is the buyer action to send a direct message to a seller before purchasing — used to clarify item details, shipping options, or negotiate terms outside of Best Offer.',
    valueTerritories: ['trust', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/contacting-seller'],
  },

  {
    id: 'ask-seller-question',
    valueProp: 'Ask Seller a Question is the extended label variant of Ask Question — used in help documentation and some UI flows where clarity about the recipient of the message is needed.',
    valueTerritories: ['trust', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/contacting-seller'],
  },

  {
    id: 'contact-seller',
    valueProp: 'Contact Seller is the post-purchase communication option in My eBay — enabling buyers to message a seller about an active order\'s shipping, contents, or any issue that has arisen.',
    valueTerritories: ['trust', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/messaging/messaging'],
  },

  {
    id: 'message-buyer',
    valueProp: 'Message Buyer is the seller action to initiate contact with a buyer — available in Seller Hub order management for post-sale coordination, shipping updates, and issue resolution.',
    valueTerritories: ['trust', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/managing-orders'],
  },

  {
    id: 'message-center',
    valueProp: 'Message Center is the eBay inbox where all buyer-seller communications are stored and managed — a complete thread history for every conversation tied to an account.',
    valueTerritories: ['trust', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/messaging/messaging'],
  },

  {
    id: 'in-app-messaging',
    valueProp: 'In-App Messaging is the eBay mobile app\'s native buyer-seller chat interface — enabling real-time communication between parties directly within the app.',
    valueTerritories: ['convenience', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/account/messaging/messaging'],
  },

  {
    id: 'community-forums',
    valueProp: 'Community Forums is eBay\'s peer-to-peer discussion platform where buyers and sellers share advice, tips, and eBay knowledge — a self-service resource and community building space.',
    valueTerritories: ['community', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://community.ebay.com'],
  },

  {
    id: 'unpaid-item-assistant',
    valueProp: 'Unpaid Item Assistant is the automated system that opens and resolves unpaid item cases on the seller\'s behalf — removing the need for manual follow-up with buyers who haven\'t paid.',
    valueTerritories: ['trust', 'convenience'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/managing-orders/unpaid-items'],
  },

  {
    id: 'unpaid-item-case',
    valueProp: 'Unpaid Item Case is the formal dispute opened when a buyer commits to purchase but fails to pay — triggering a resolution process that protects the seller\'s fees and listing statistics.',
    valueTerritories: ['trust', 'protection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/managing-orders/unpaid-items'],
  },

  {
    id: 'item-not-received',
    valueProp: 'Item Not Received is the buyer dispute type for orders where the package never arrived — the most common resolution claim, protected under the eBay Money Back Guarantee.',
    valueTerritories: ['protection', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/returns-refunds/getting-refund'],
  },

  {
    id: 'significantly-not-as-described',
    valueProp: 'Significantly Not as Described is the dispute category for items that arrive in materially different condition or with different attributes than the listing stated — a protected claim under the eBay Money Back Guarantee.',
    valueTerritories: ['protection', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/returns-refunds/returning-item'],
  },

  // ── BUYER-FACING UI & PAGE ELEMENTS ─────────────────────────────────────

  {
    id: 'add-to-cart',
    valueProp: 'Add to Cart places a fixed-price item in the buyer\'s shopping cart for checkout — supporting multi-item combined purchases before committing to payment.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/paying-items/how-checkout-works'],
  },

  {
    id: 'add-to-watchlist',
    valueProp: 'Add to Watchlist saves an item to a buyer\'s tracked list — allowing them to monitor price, availability, and bid status without committing to purchase.',
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/watching-items/watching-items'],
  },

  {
    id: 'add-to-watch-list',
    valueProp: 'Add to Watch List is the hyphenated label variant of Add to Watchlist — the same item tracking action used in certain UI contexts and help documentation.',
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/watching-items/watching-items'],
  },

  {
    id: 'watch-this-item',
    valueProp: 'Watch This Item is the item-page CTA variant of Add to Watchlist — the action label shown directly on the listing view page to save the item for later monitoring.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/watching-items/watching-items'],
  },

  {
    id: 'watchers',
    valueProp: 'Watchers is the count of buyers who have added a listing to their watchlist — a seller-visible metric in Seller Hub indicating buyer interest and demand for the item.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/managing-listings'],
  },

  {
    id: 'watchers-count',
    valueProp: 'Watchers Count is the numeric display of how many buyers are tracking a specific listing — shown in Seller Hub analytics and sometimes on the listing itself to signal demand.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/managing-listings'],
  },

  {
    id: 'view-item',
    valueProp: 'View Item is the page-level identifier for an eBay listing detail page — the full item description, photos, pricing, and buying options shown to a buyer who clicks on a listing.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'view-item-page',
    valueProp: 'View Item Page is the extended label for the eBay listing detail page — used in help documentation and analytics to distinguish the full listing view from search result card previews.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'view-order',
    valueProp: 'View Order is the buyer action that opens the order detail page — the link in purchase confirmation emails and My eBay that takes buyers to full transaction information.',
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/mye/myebay/purchase'],
  },

  {
    id: 'view-count',
    valueProp: 'View Count is the total number of times a listing has been viewed — shown to sellers in Seller Hub as a demand signal alongside watchers and sales metrics.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/managing-listings'],
  },

  {
    id: 'views',
    valueProp: 'Views is the abbreviated label for the listing view count metric — used in compact Seller Hub dashboards and analytics cards where space is limited.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/managing-listings'],
  },

  {
    id: 'sold-quantity-display',
    valueProp: 'Sold Quantity Display shows how many units of a listing have already been sold — surfaced on active listings as social proof that the item has satisfied previous buyers.',
    valueTerritories: ['trust', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'item-no-longer-available',
    valueProp: 'Item No Longer Available is the status page shown when a buyer navigates to a listing that has ended, sold, or been removed — preventing dead ends in the buyer flow.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'more-from-this-seller',
    valueProp: 'More from This Seller is the related-items module on listing pages showing other active listings from the same seller — encouraging multi-item discovery and combined-purchase behavior.',
    valueTerritories: ['selection', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'item-comparison',
    valueProp: 'Item Comparison is the feature allowing buyers to view two or more listings side-by-side — comparing specifications, prices, and seller details to make an informed purchase decision.',
    valueTerritories: ['transparency', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'secure-checkout',
    valueProp: 'Secure Checkout is eBay\'s encrypted payment processing flow — reassuring buyers that their payment information is protected by industry-standard security during every transaction.',
    valueTerritories: ['trust', 'protection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/paying-items/how-checkout-works'],
  },

  {
    id: 'shopping-cart',
    valueProp: 'Shopping Cart is the temporary holding area where buyers collect fixed-price items before checkout — supporting multi-item purchases and combined shipping calculations.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/paying-items/how-checkout-works'],
  },

  {
    id: 'list-price',
    valueProp: 'List Price is the original retail price shown as a strikethrough alongside the eBay sale price — providing buyers with context for the deal they are getting on a discounted item.',
    valueTerritories: ['value', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'promotional-codes',
    valueProp: 'Promotional Codes are alphanumeric discount codes issued by eBay — entered at checkout to apply a percentage or fixed discount to a buyer\'s order.',
    valueTerritories: ['value', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/paying-items/coupons-discounts'],
  },

  {
    id: 'promotional-credit',
    valueProp: 'Promotional Credit is a monetary eBay credit applied to a buyer\'s account — redeemable on future purchases as part of loyalty rewards, goodwill gestures, or promotional campaigns.',
    valueTerritories: ['value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/paying-items/coupons-discounts'],
  },

  {
    id: 'saved',
    valueProp: 'Saved is the confirmation state indicating a user\'s action — watchlist addition, search save, draft — has been successfully stored to their account for later access.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com'],
  },

  {
    id: 'print-coupons',
    valueProp: 'Print Coupons is the action for generating a printable coupon within eBay\'s Promotions Manager — enabling sellers running in-store or offline promotions to distribute physical discount codes.',
    valueTerritories: ['value'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/promotions-manager'],
  },

  {
    id: 'print-label',
    valueProp: 'Print Label is the action generating a printable shipping label for an eBay order — the final step in the seller fulfillment flow before handing off to a carrier.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/managing-orders/shipping-orders'],
  },

  {
    id: 'seller-transaction-report',
    valueProp: 'Seller Transaction Report is the detailed export of all seller transactions within a date range — used for accounting, reconciliation, and tax preparation by professional sellers.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/fees-credits-invoices/transaction-reports'],
  },

  {
    id: 'block-buyers',
    valueProp: 'Block Buyers is the seller setting for adding specific buyers to a blocked list — preventing them from purchasing, bidding on, or making offers on the seller\'s listings.',
    valueTerritories: ['trust', 'protection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/selling/buyer-requirements'],
  },

  {
    id: 'offsite-ads-opt-out',
    valueProp: 'Offsite Ads Opt-Out is the seller setting to exclude their listings from eBay\'s external advertising network — used by sellers who prefer not to pay the offsite CPS fee when external ad traffic converts.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/promoted-listings/offsite-ads'],
  },

  // ── PHOTO & MEDIA TOOLS ──────────────────────────────────────────────────

  {
    id: 'photo-requirements',
    valueProp: 'Photo Requirements are eBay\'s standards for listing images — minimum resolution, white background, no watermarks, no text overlays — enforced to maintain search image quality.',
    valueTerritories: ['trust', 'transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/photos-videos'],
  },

  {
    id: 'photo-tips',
    valueProp: 'Photo Tips is the help content guiding sellers on taking high-quality listing photos — lighting, angles, backgrounds, and detail shots that maximize buyer confidence and click-through.',
    valueTerritories: ['transparency'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/photos-videos'],
  },

  {
    id: 'photo-uploader',
    valueProp: 'Photo Uploader is the in-listing-tool interface for adding images from a seller\'s device — supporting drag-and-drop, file selection, and mobile camera capture for listing photos.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/photos-videos'],
  },

  {
    id: 'image-requirements',
    valueProp: 'Image Requirements is the policy-oriented label for eBay\'s listing photo standards — used in seller policy documentation alongside the more guidance-focused Photo Requirements label.',
    valueTerritories: ['trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/photos-videos'],
  },

  {
    id: 'picture-manager',
    valueProp: 'Picture Manager was eBay\'s hosted image storage service for sellers — a paid hosting library for listing images that predated the current free image hosting included in all listings.',
    valueTerritories: ['convenience'],
    nameClass: 'Legacy Residue',
    isProductName: false,
    strategicRole: ['lifecycle-managed'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/photos-videos'],
  },

  {
    id: 'picture-policy',
    valueProp: 'Picture Policy is the rule set governing acceptable listing images on eBay — prohibiting stock photos for used items, nudity, placeholder images, and images with unauthorized watermarks.',
    valueTerritories: ['trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/photos-videos'],
  },

  {
    id: 'picture-services',
    valueProp: 'Picture Services is eBay\'s hosted image infrastructure — the backend that stores and serves listing photos at scale, ensuring images load reliably across all eBay surfaces globally.',
    valueTerritories: ['trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/photos-videos'],
  },

  {
    id: 'ebay-picture-services',
    valueProp: 'eBay Picture Services is the branded name of eBay\'s hosted image platform — previously marketed as the service sellers use to upload and manage listing photos through eBay\'s own infrastructure.',
    valueTerritories: ['trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/photos-videos'],
  },

  {
    id: 'picture-zoom',
    valueProp: 'Picture Zoom is the listing image viewer feature that magnifies a selected area when buyers hover over or tap a photo — giving buyers closer inspection of item details and condition.',
    valueTerritories: ['transparency', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'label-printer',
    valueProp: 'Label Printer is the device configuration option in eBay\'s shipping label flow — setting up a thermal printer for professional-grade, adhesive shipping labels.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/managing-orders/shipping-orders'],
  },

  // ── MOBILE ───────────────────────────────────────────────────────────────

  {
    id: 'mobile-checkout',
    valueProp: 'Mobile Checkout is the streamlined payment flow optimized for smartphone screens — reducing the friction of completing a purchase on a small display without losing security or functionality.',
    valueTerritories: ['convenience', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/paying-items/how-checkout-works'],
  },

  {
    id: 'mobile-photo-editor',
    valueProp: 'Mobile Photo Editor is the in-app tool for cropping, adjusting, and enhancing listing photos directly on a smartphone — enabling high-quality images without a desktop editing tool.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/photos-videos'],
  },

  {
    id: 'mobile-quick-list',
    valueProp: 'Mobile Quick List is the simplified listing creation flow on eBay\'s mobile app — optimized for speed, allowing sellers to photograph, price, and publish an item in minutes from their phone.',
    valueTerritories: ['convenience', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'mobile-responsive-template',
    valueProp: 'Mobile Responsive Template is a listing description layout that automatically adapts to different screen sizes — ensuring listings look good on both desktop and mobile without custom coding.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'mobile-responsive-templates',
    valueProp: 'Mobile Responsive Templates is the plural and section label for the collection of device-adaptive listing description layouts available to sellers.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings'],
  },

  {
    id: 'mobile-web',
    valueProp: 'Mobile Web is eBay\'s browser-based mobile experience — the responsive website accessed via smartphone browser as an alternative to the native app.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com'],
  },

  {
    id: 'in-app-qr-code',
    valueProp: 'In-App QR Code is a scannable code generated within the eBay app — used for in-person transactions, eBay collection point pickups, or authentication handoff at physical locations.',
    valueTerritories: ['convenience', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying'],
  },

  {
    id: 'app-store-promotion',
    valueProp: 'App Store Promotion is eBay\'s marketing of its mobile apps in Apple App Store and Google Play Store — including featured placement campaigns and user acquisition via store editorial.',
    valueTerritories: ['convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['one-off'],
    citations: ['https://www.ebay.com'],
  },

  {
    id: 'in-store-pickup-us',
    valueProp: 'In-Store Pickup US is the US-market version of eBay\'s in-store collection option — allowing buyers near participating retail partners to collect online purchases at a physical location.',
    valueTerritories: ['convenience', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/paying-items/in-store-pickup'],
  },

  // ── INTERNATIONAL / LOCALIZATION ─────────────────────────────────────────

  {
    id: 'cross-border-trade',
    valueProp: 'Cross-Border Trade is eBay\'s suite of tools and programs enabling sellers to reach buyers in other countries — including international shipping, currency conversion, customs guidance, and global buyer visibility.',
    valueTerritories: ['selection', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['multi-market', 'reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/shipping-items/shipping-internationally'],
  },

  {
    id: 'currency-conversion',
    valueProp: 'Currency Conversion is the automatic price display in a buyer\'s local currency — showing the equivalent cost of a foreign-currency listing at current exchange rates to reduce cross-border friction.',
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability', 'multi-market'],
    citations: ['https://www.ebay.com/help/buying/paying-items/currency-conversion'],
  },

  {
    id: 'language-translation',
    valueProp: 'Language Translation is eBay\'s in-page machine translation of listing descriptions — allowing buyers to read listings in their native language regardless of the original text\'s language.',
    valueTerritories: ['transparency', 'convenience'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability', 'multi-market'],
    citations: ['https://www.ebay.com/help/buying/finding-items/finding-items'],
  },

  {
    id: 'collection-points-au',
    valueProp: 'Collection Points AU is the Australian market version of eBay\'s network of physical locations where buyers can pick up online purchases — operated in partnership with local logistics providers.',
    valueTerritories: ['convenience', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability', 'multi-market'],
    citations: ['https://www.ebay.com.au/help/buying'],
  },

  // ── NICHE CATEGORIES ────────────────────────────────────────────────────

  {
    id: 'antiques',
    valueProp: 'Antiques is eBay\'s top-level vertical category for items over 100 years old — one of eBay\'s most trust-sensitive categories where condition verification and seller expertise directly influence purchase confidence.',
    valueTerritories: ['trust', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/b/Antiques/20081/bn_1865347'],
  },

  {
    id: 'coins-currency',
    valueProp: 'Coins & Currency is eBay\'s collectibles sub-category covering coins, banknotes, and currency-adjacent items — a high-trust, high-authentication-need category supported by grading and verification programs.',
    valueTerritories: ['trust', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/b/Coins-Paper-Money/11116/bn_1865344'],
  },

  {
    id: 'comics',
    valueProp: 'Comics is the eBay category for comic books, graphic novels, and related collectibles — a grading-sensitive category where condition documentation and authentication services drive buyer confidence.',
    valueTerritories: ['trust', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/b/Comics/259104/bn_1865356'],
  },

  {
    id: 'fine-art',
    valueProp: 'Fine Art is eBay\'s vertical for original paintings, prints, drawings, and sculpture — a high-value category where provenance, authenticity documentation, and expert verification are critical.',
    valueTerritories: ['trust', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/b/Art/550/bn_1865365'],
  },

  {
    id: 'sports-memorabilia',
    valueProp: 'Sports Memorabilia is eBay\'s category for authenticated game-worn items, signed merchandise, and trading cards related to professional sports — a category anchored by authentication programs and grading services.',
    valueTerritories: ['trust', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/b/Sports-Memorabilia-Fan-Shop-Sports-Cards/64482/bn_1865362'],
  },

  {
    id: 'stamps',
    valueProp: 'Stamps is eBay\'s philately category covering postage stamps and related postal history collectibles — a niche category with deep buyer expertise and specialized grading considerations.',
    valueTerritories: ['trust', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/b/Stamps/11223/bn_1865363'],
  },

  // ── STORE TIER REGIONAL VARIANTS ─────────────────────────────────────────

  {
    id: 'store-tier-enterprise-us',
    valueProp: 'Store Tier Enterprise US is the highest eBay Store subscription level in the United States — offering the largest inventory allowances, deepest fee discounts, and most advanced seller tools for enterprise-scale sellers.',
    valueTerritories: ['value', 'selection'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/fees-credits-invoices/store-fees'],
  },

  {
    id: 'store-tier-platin-de',
    valueProp: 'Store Tier Platin DE is the German market\'s top-level eBay Shop subscription — the equivalent of the Enterprise tier, offering maximum listings, fee benefits, and seller tools for high-volume German sellers.',
    valueTerritories: ['value', 'selection'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability', 'multi-market'],
    citations: ['https://www.ebay.de/help/selling/fees-credits-invoices/shop-fees'],
  },

  {
    id: 'store-tier-premium-plus-it',
    valueProp: 'Store Tier Premium Plus IT is the Italian market\'s top eBay Negozio subscription level — the highest-tier store plan for Italian high-volume sellers with maximum listing capacity and fee advantages.',
    valueTerritories: ['value', 'selection'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability', 'multi-market'],
    citations: ['https://www.ebay.it/help/selling/fees-credits-invoices/tariffe-negozio'],
  },

  // ── SPECIAL PROGRAMS & AUTHENTICATION VARIANTS ───────────────────────────

  {
    id: 'expert-verification',
    valueProp: 'Expert Verification is the human-review component in select eBay authentication programs — a specialist physically inspects and confirms item authenticity before the item is certified and shipped to the buyer.',
    valueTerritories: ['trust', 'protection'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability', 'high-visibility'],
    citations: ['https://www.ebay.com/authenticity-guarantee'],
  },

  {
    id: 'optional-authenticity-guarantee',
    valueProp: 'Optional Authenticity Guarantee is the seller-selectable version of eBay\'s authentication program for eligible categories — allowing sellers to opt in to the authentication routing for their listings rather than being required.',
    valueTerritories: ['trust', 'protection'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/authenticity-guarantee'],
  },

  {
    id: 'third-party-providers',
    valueProp: 'Third-Party Providers is the category label for external services integrated into the eBay ecosystem — authentication labs, shipping carriers, financing providers, and technology partners that extend eBay\'s core capabilities.',
    valueTerritories: ['trust', 'selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com'],
  },

  // ── BRAND & IDENTITY LABELS ──────────────────────────────────────────────

  {
    id: 'brand-identity',
    valueProp: 'Brand Identity is the taxonomy node representing eBay\'s visual and verbal identity system — used internally to classify naming assets that carry the eBay master brand expression.',
    valueTerritories: ['trust'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['long-term'],
    citations: ['https://www.ebay.com'],
  },

  {
    id: 'brand-name',
    valueProp: 'Brand Name is the item attribute field in listings where sellers specify the manufacturer or brand — one of the most searched item specifics, critical for catalog matching and buyer filtering.',
    valueTerritories: ['transparency', 'trust'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/listings/creating-managing-listings/item-specifics'],
  },

  {
    id: 'boost-buyer-engagement',
    valueProp: 'Boost Buyer Engagement is an internal initiative label for seller-facing programs and features designed to increase buyer interaction rates — a strategic theme rather than a marketed product name.',
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['one-off'],
    citations: ['https://www.ebay.com/sellercenter'],
  },

  {
    id: 'find-it-on-ebay',
    valueProp: 'Find It on eBay is a buyer acquisition tagline and campaign positioning claiming eBay\'s breadth of selection — used in marketing communications to assert that nearly any item can be found on the platform.',
    valueTerritories: ['selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['one-off'],
    citations: ['https://www.ebay.com'],
  },

  {
    id: 'featured-listing',
    valueProp: 'Featured Listing is a promoted visibility placement that gives a seller\'s listing elevated position in search results or category pages — a paid exposure upgrade above standard organic ranking.',
    valueTerritories: ['selection'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/selling/promoted-listings'],
  },

  // ── GLOBAL BUYER PROGRAMS ────────────────────────────────────────────────

  {
    id: 'ebay-giving-works',
    valueProp: 'eBay Giving Works is eBay\'s charitable giving platform enabling buyers and sellers to support nonprofit causes through purchases — a branded umbrella for eBay\'s integrated charity commerce programs.',
    valueTerritories: ['community', 'trust'],
    nameClass: 'Product Name',
    isProductName: true,
    strategicRole: ['high-visibility', 'long-term', 'multi-market'],
    citations: ['https://www.ebay.com/charity'],
  },

  {
    id: 'global-buyer-hub',
    valueProp: 'Global Buyer Hub is an internal strategic initiative for improving the cross-border buyer experience — a taxonomy node grouping global-market discovery, payment, and delivery features for international buyers.',
    valueTerritories: ['selection', 'convenience'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['multi-market'],
    citations: ['https://www.ebay.com'],
  },

  {
    id: 'global-buyer-experience',
    valueProp: 'Global Buyer Experience is the internal program and initiative label for eBay\'s cross-market buyer journey improvements — spanning discovery, localization, payment, and delivery for international buyers.',
    valueTerritories: ['convenience', 'selection'],
    nameClass: 'Internal Term',
    isProductName: false,
    strategicRole: ['multi-market', 'long-term'],
    citations: ['https://www.ebay.com'],
  },

  {
    id: 'flash-bids',
    valueProp: 'Flash Bids is a time-limited auction-format promotional mechanic where buyers compete in an accelerated bidding window — creating high-urgency purchase moments for curated items.',
    valueTerritories: ['speed', 'value', 'selection'],
    nameClass: 'Feature Name',
    isProductName: false,
    strategicRole: ['one-off'],
    citations: ['https://www.ebay.com'],
  },

  {
    id: 'checkout-as-guest',
    valueProp: 'Checkout as Guest lets buyers complete a purchase without creating an eBay account — removing the registration barrier for first-time or infrequent buyers to improve conversion on their initial transaction.',
    valueTerritories: ['convenience', 'speed'],
    nameClass: 'Functional Label',
    isProductName: false,
    strategicRole: ['reusable-capability'],
    citations: ['https://www.ebay.com/help/buying/paying-items/how-checkout-works'],
  },

]
