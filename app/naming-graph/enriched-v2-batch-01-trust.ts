// eBay Naming Graph — Enrichment V2: Trust & Safety Cluster
// Batch: 01 | Date: 2026-04-28 | Source: Confluence wiki.corp.ebay.com + help.ebay.com + Glean
//
// PURPOSE: Adds value proposition, value territories, name classification, and strategic role
// to all Trust & Safety cluster nodes. Enables the Naming Studio to surface reuse opportunities
// and enforce "Do I need a name?" before creating new trust-related names.
//
// VALUE TERRITORIES (Brand Trust Architecture taxonomy):
//   trust        — platform/seller reliability, authenticity, seller quality
//   protection   — buyer guarantee, money back, purchase protection, dispute coverage
//   speed        — fast resolution, quick response, handling time
//   convenience  — easy returns, simple process, self-service
//   selection    — breadth of authenticated/qualified items
//   value        — pricing fairness, cost coverage, fee protection
//   transparency — clear ratings, disclosed condition, visible history
//   community    — feedback ecosystem, community standards, norms
//
// NAME CLASSES:
//   "Product Name"      — ownable brand identity, proper noun, eBay-specific, multi-market
//   "Feature Name"      — named capability within a product, partially branded
//   "Functional Label"  — describes what it does; no distinct brand identity
//   "Internal Term"     — used internally only, not customer-facing
//   "Legacy Residue"    — old name, no longer actively used but still exists

export interface NodeEnrichmentV2 {
  id: string
  valueProp: string                    // 1-2 customer-facing sentences: "What does this do for me?"
  valueTerritories: string[]           // from Brand Trust Architecture taxonomy above
  nameClass: "Product Name" | "Feature Name" | "Functional Label" | "Internal Term" | "Legacy Residue"
  isProductName: boolean               // true = one of ~277 true Product Names
  strategicRole: string[]              // high-visibility | multi-market | full-funnel | long-term |
                                       // reusable-capability | one-off | inherited-M&A | lifecycle-managed
  citations: string[]                  // source URLs, Confluence page refs, help.ebay.com links
}

export const TRUST_ENRICHMENT: NodeEnrichmentV2[] = [
  {
    id: "trust-safety",
    valueProp: "The umbrella architecture for every safety, authenticity, buyer protection, and compliance experience on eBay — ensuring buyers and sellers can transact with confidence.",
    valueTerritories: ["trust", "protection", "transparency", "community"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market", "full-funnel", "long-term", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/sections/360001997813-Trust-Safety"]
  },
  {
    id: "ebay-money-back-guarantee",
    valueProp: "eBay's primary buyer protection promise: if your item doesn't arrive, doesn't match the description, or arrives damaged, you're covered — no questions asked, no arguments.",
    valueTerritories: ["protection", "trust", "transparency"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "multi-market", "full-funnel", "long-term", "reusable-capability"],
    citations: [
      "https://help.ebay.com/hc/en-us/articles/360020361971-eBay-Money-Back-Guarantee",
      "https://wiki.corp.ebay.com (eMBG program pages)"
    ]
  },
  {
    id: "30-day-returns",
    valueProp: "A 30-day window to return any item, giving buyers confidence to purchase and giving sellers a competitive edge in search placement.",
    valueTerritories: ["protection", "convenience", "trust"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360022569973-Setting-up-your-return-policy"]
  },
  {
    id: "60-day-returns",
    valueProp: "An extended 60-day return window that differentiates sellers in competitive categories and earns premium search boost over standard 30-day policies.",
    valueTerritories: ["protection", "convenience", "trust"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360022569973-Setting-up-your-return-policy"]
  },
  {
    id: "account-security",
    valueProp: "Multi-layer protection for buyer and seller accounts including two-factor authentication, login alerts, passkeys, and breach monitoring — keeping accounts safe from takeover and fraud.",
    valueTerritories: ["protection", "trust", "transparency"],
    nameClass: "Feature Name",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market", "full-funnel", "long-term", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/sections/360001997373-Account-security"]
  },
  {
    id: "account-suspension",
    valueProp: "Enforcement action restricting platform access for verified policy violations, protecting the marketplace from bad actors.",
    valueTerritories: ["trust", "protection", "community"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360049986853-Why-was-my-account-suspended-"]
  },
  {
    id: "authenticity-guarantee",
    valueProp: "Third-party professional authentication for luxury goods — watches, sneakers, handbags, jewelry, trading cards — giving buyers certainty that high-value items are genuine before they arrive.",
    valueTerritories: ["trust", "protection", "transparency", "selection"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "multi-market", "full-funnel", "long-term", "reusable-capability"],
    citations: [
      "https://help.ebay.com/hc/en-us/articles/4406833062804-eBay-Authenticity-Guarantee",
      "https://wiki.corp.ebay.com (ERPROL space — AG program docs, rebrand artifacts)"
    ]
  },
  {
    id: "authorized-seller-filter",
    valueProp: "A search filter surfacing only listings from sellers officially authorized by brand manufacturers — ensuring warranty validity and brand-guaranteed authenticity.",
    valueTerritories: ["trust", "transparency", "selection"],
    nameClass: "Feature Name",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/4406833062804"]
  },
  {
    id: "bid-shielding-policy",
    valueProp: "Policy prohibiting collusion between bidders that would shield auctions from fair competition — maintaining auction integrity for sellers and legitimate buyers.",
    valueTerritories: ["trust", "transparency", "community"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029362172-Bid-shielding"]
  },
  {
    id: "business-equipment-purchase-protection",
    valueProp: "Specialized buyer protection for commercial equipment purchases with higher coverage limits than standard programs — giving B2B buyers confidence when sourcing machinery and tools.",
    valueTerritories: ["protection", "trust", "value"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["multi-market", "long-term"],
    citations: ["https://help.ebay.com/hc/en-us/articles/4406064892180-Business-Equipment-Purchase-Protection"]
  },
  {
    id: "buyer-pays-return-shipping",
    valueProp: "A return policy option where the buyer covers shipping costs for returns — standard for items returned due to buyer preference rather than seller error.",
    valueTerritories: ["transparency", "convenience"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360022569973"]
  },
  {
    id: "buyer-protection",
    valueProp: "eBay's umbrella of guarantees ensuring buyers are covered if anything goes wrong — from non-delivery to item not as described — making every purchase low-risk.",
    valueTerritories: ["protection", "trust", "transparency"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "multi-market", "full-funnel", "long-term"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360020361971"]
  },
  {
    id: "buying-restrictions",
    valueProp: "Account-level limits applied when buyers have patterns of non-payment, return abuse, or fraudulent activity — protecting sellers and the marketplace.",
    valueTerritories: ["protection", "trust", "community"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029363992-Buying-limits-and-restrictions"]
  },
  {
    id: "ccpa-compliance",
    valueProp: "California Consumer Privacy Act implementation giving CA residents rights to access, delete, and opt out of the sale of their personal data on eBay.",
    valueTerritories: ["transparency", "protection"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["long-term", "reusable-capability"],
    citations: ["https://www.ebay.com/help/policies/member-behavior-policies/ebay-privacy-center?id=4226"]
  },
  {
    id: "certified-by-brand",
    valueProp: "A luxury certification program where official brands verify the authenticity of their own products listed on eBay — combining brand authority with eBay marketplace reach.",
    valueTerritories: ["trust", "transparency", "selection"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term"],
    citations: [
      "https://help.ebay.com/hc/en-us/articles/4406833062804",
      "https://wiki.corp.ebay.com (SellerGrowth space)"
    ]
  },
  {
    id: "copyright",
    valueProp: "Legal protection enforced through the VeRO program allowing rights holders to remove counterfeit or infringing listings and protect their intellectual property.",
    valueTerritories: ["protection", "trust", "community"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360044716574-VeRO-Protecting-intellectual-property"]
  },
  {
    id: "counterfeit-detection",
    valueProp: "AI-powered scanning system that identifies counterfeit signals in listings before they go live — protecting buyers from fakes and sellers from association with infringing content.",
    valueTerritories: ["protection", "trust", "transparency"],
    nameClass: "Internal Term",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market", "reusable-capability", "long-term"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360044716574"]
  },
  {
    id: "detailed-seller-ratings",
    valueProp: "A five-star rating breakdown across communication, shipping speed, shipping cost, and item accuracy — giving buyers a granular picture of what it's like to buy from this seller.",
    valueTerritories: ["transparency", "trust", "community"],
    nameClass: "Feature Name",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market", "long-term"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029193832-Detailed-Seller-Ratings"]
  },
  {
    id: "ebay-assured-fit",
    valueProp: "A fitment compatibility guarantee for auto parts in the UK — if a part doesn't fit the buyer's vehicle, returns are accepted regardless of policy.",
    valueTerritories: ["protection", "trust", "convenience"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["multi-market", "long-term"],
    citations: ["https://help.ebay.co.uk/hc/en-gb/articles"]
  },
  {
    id: "ebay-authenticate",
    valueProp: "The original eBay luxury authentication program (2017–2020) that established third-party verification for watches, sneakers, and handbags before evolving into Authenticity Guarantee.",
    valueTerritories: ["trust", "protection", "transparency"],
    nameClass: "Legacy Residue",
    isProductName: false,
    strategicRole: ["lifecycle-managed"],
    citations: [
      "https://help.ebay.com (archived)",
      "Renamed to Authenticity Guarantee 2020"
    ]
  },
  {
    id: "ebay-buyer-guarantee",
    valueProp: "Regional buyer protection program ensuring safe, reliable transactions for buyers in specific markets — eBay's promise that purchases are covered when things go wrong.",
    valueTerritories: ["protection", "trust"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["multi-market", "long-term"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360020361971"]
  },
  {
    id: "ebay-guaranteed-fit",
    valueProp: "A vehicle fitment guarantee for auto parts ensuring compatibility — if a part doesn't fit the buyer's vehicle as listed, the return is accepted automatically.",
    valueTerritories: ["protection", "trust", "convenience"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term"],
    citations: ["https://help.ebay.com (eBay Motors parts compatibility)"]
  },
  {
    id: "ebay-premium-service",
    valueProp: "UK-market seller quality badge awarded to top-performing sellers who meet eBay's highest standards for dispatch time, tracking, and returns — equivalent to Top Rated Plus for the UK.",
    valueTerritories: ["trust", "speed", "transparency"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["multi-market", "long-term"],
    citations: ["https://help.ebay.co.uk/hc/en-gb/articles/360022429414-eBay-Premium-Service"]
  },
  {
    id: "ebay-premium-services",
    valueProp: "A collection of premium buyer protection and enhanced service programs bundled to deliver a higher-confidence buying experience.",
    valueTerritories: ["protection", "trust", "convenience"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.com/hc/en-us"]
  },
  {
    id: "ebay-refurbished-warranty",
    valueProp: "A 2-year Allstate-backed warranty included with eBay Refurbished products — giving buyers peace of mind that certified refurbished electronics and devices are covered if they fail.",
    valueTerritories: ["protection", "trust", "value"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term"],
    citations: [
      "https://help.ebay.com/hc/en-us/articles/360049987613-eBay-Refurbished",
      "https://wiki.corp.ebay.com (refurbished warranty program docs)"
    ]
  },
  {
    id: "ebay-top-service",
    valueProp: "Germany-specific seller quality badge (launched February 2024) recognizing top-performing DE sellers with fast dispatch, tracked shipping, and excellent buyer feedback.",
    valueTerritories: ["trust", "speed", "transparency"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["multi-market", "long-term"],
    citations: ["https://help.ebay.de (eBay Top-Service program page)"]
  },
  {
    id: "eu-consumer-rights-directive",
    valueProp: "EU legal requirement ensuring every European buyer has a minimum 14-day return window for distance purchases — a baseline that eBay enforces across all EU-market sellers.",
    valueTerritories: ["protection", "transparency"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "long-term"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029390672-EU-consumer-rights"]
  },
  {
    id: "expert-verification",
    valueProp: "Watch-specific authentication branding for eBay's luxury verification program — specialist inspection confirming authenticity of high-value timepieces before delivery to buyers.",
    valueTerritories: ["trust", "protection", "transparency"],
    nameClass: "Legacy Residue",
    isProductName: false,
    strategicRole: ["lifecycle-managed"],
    citations: [
      "https://wiki.corp.ebay.com/ERPROL (Expert Verification rebrand artifacts, Nov-Dec 2023)",
      "Rebranded to Authenticity Guarantee Q4 2023"
    ]
  },
  {
    id: "feedback-extortion-policy",
    valueProp: "Policy protecting sellers from buyers who threaten negative feedback to extort refunds, discounts, or free items — ensuring the feedback system remains fair and unmanipulated.",
    valueTerritories: ["protection", "trust", "community"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029183731-Feedback-extortion"]
  },
  {
    id: "feedback-forum",
    valueProp: "eBay's founding trust infrastructure (1996) — the original mutual rating system that created community accountability between buyers and sellers and established eBay's core reputation economy.",
    valueTerritories: ["trust", "transparency", "community"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "multi-market", "full-funnel", "long-term"],
    citations: [
      "https://www.ebay.com/help/buying/resolving-issues-sellers/leaving-feedback-sellers?id=4033",
      "Launched February 26, 1996 by Pierre Omidyar"
    ]
  },
  {
    id: "feedback-reply",
    valueProp: "Seller ability to respond publicly to buyer feedback — adding context, resolving misunderstandings, and demonstrating responsive customer service to future buyers.",
    valueTerritories: ["transparency", "community", "trust"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029193432-Replying-to-feedback"]
  },
  {
    id: "feedback-revision-request",
    valueProp: "A post-resolution tool that lets sellers request a buyer update negative or neutral feedback after a problem has been fixed — allowing reputation to reflect resolved outcomes.",
    valueTerritories: ["transparency", "community", "trust"],
    nameClass: "Feature Name",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029193272-Requesting-feedback-revision"]
  },
  {
    id: "free-returns",
    valueProp: "Seller-provided free return shipping that earns a visible buyer confidence badge and higher search placement — a competitive signal that reduces purchase hesitation.",
    valueTerritories: ["convenience", "protection", "trust"],
    nameClass: "Feature Name",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361612-Free-returns"]
  },
  {
    id: "full-refund",
    valueProp: "Complete reimbursement of item price plus original shipping when a return is approved — eBay's clearest signal that a buyer's loss is fully covered.",
    valueTerritories: ["protection", "value", "trust"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360020361971"]
  },
  {
    id: "gdpr-compliance",
    valueProp: "EU GDPR implementation giving European users control over their personal data — including access, portability, deletion rights, and consent management on eBay.",
    valueTerritories: ["transparency", "protection"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "long-term"],
    citations: ["https://www.ebay.com/help/policies/member-behavior-policies/ebay-privacy-center?id=4226"]
  },
  {
    id: "indefinite-suspension",
    valueProp: "Permanent platform ban without reinstatement — applied to the most serious policy violations including fraud, criminal activity, and repeat egregious offenses.",
    valueTerritories: ["trust", "protection", "community"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360049986853"]
  },
  {
    id: "intellectual-property",
    valueProp: "Comprehensive IP enforcement framework including the VeRO program, allowing rights holders to report and remove trademark, copyright, and counterfeit violations from eBay listings.",
    valueTerritories: ["protection", "trust", "transparency"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "long-term", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360044716574-VeRO-Protecting-intellectual-property"]
  },
  {
    id: "linked-accounts-policy",
    valueProp: "Policy preventing suspended users from creating new accounts through shared devices, IP addresses, or payment methods — maintaining the integrity of suspension enforcement.",
    valueTerritories: ["trust", "protection", "community"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029362192-Duplicate-accounts"]
  },
  {
    id: "listing-removal-notice",
    valueProp: "Automated notification sent to sellers when a listing is removed for policy violations — including the reason, a policy reference, and steps to appeal or correct.",
    valueTerritories: ["transparency", "community"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360049987373"]
  },
  {
    id: "login-alerts",
    valueProp: "Real-time email or SMS notifications when your account is accessed from a new device, browser, or location — giving you the first signal of unauthorized access.",
    valueTerritories: ["protection", "transparency", "trust"],
    nameClass: "Feature Name",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029397532-Login-and-security-notifications"]
  },
  {
    id: "money-back-guarantee",
    valueProp: "Core buyer protection promise ensuring refunds when purchases go wrong — the foundational trust signal that makes buying from any seller on eBay feel safe.",
    valueTerritories: ["protection", "trust"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "multi-market", "full-funnel", "long-term"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360020361971"]
  },
  {
    id: "mutual-feedback-withdrawal",
    valueProp: "A dispute resolution path allowing both buyer and seller to agree to remove negative feedback — enabling clean resolution after issues are resolved without a permanent reputation mark.",
    valueTerritories: ["transparency", "community", "convenience"],
    nameClass: "Feature Name",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029193532-Mutual-Feedback-Withdrawal"]
  },
  {
    id: "no-returns-accepted",
    valueProp: "A discontinued return policy that prevented buyers from returning items — removed as eBay standardized mandatory return windows to protect buyer confidence.",
    valueTerritories: ["transparency"],
    nameClass: "Legacy Residue",
    isProductName: false,
    strategicRole: ["lifecycle-managed"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360022569973"]
  },
  {
    id: "optional-authenticity-guarantee",
    valueProp: "An opt-in upgrade to Authenticity Guarantee that adds professional grading documentation — giving collectors and high-value buyers certified provenance alongside authentication.",
    valueTerritories: ["trust", "transparency", "value", "protection"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term"],
    citations: [
      "https://wiki.corp.ebay.com/display/EFE (Optional AG program page)",
      "https://wiki.corp.ebay.com/display/QIUD (VAS: Optional AG + Grading Add-On)",
      "Jira: FEECC-627, FEECC-2100 | Launched Q1 2022"
    ]
  },
  {
    id: "partial-refund",
    valueProp: "A negotiated settlement refunding a portion of the purchase price — used when a buyer keeps a damaged or imperfect item but accepts reduced compensation.",
    valueTerritories: ["protection", "convenience", "value"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029360252"]
  },
  {
    id: "passkeys",
    valueProp: "Passwordless login using your device's biometrics — Face ID, Touch ID, or a hardware security key — eliminating the risk of phishing and password theft on eBay accounts.",
    valueTerritories: ["protection", "convenience", "speed"],
    nameClass: "Feature Name",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market", "long-term"],
    citations: ["https://help.ebay.com/hc/en-us/articles (Passkeys, FIDO2/WebAuthn, launched 2023)"]
  },
  {
    id: "password-reset",
    valueProp: "Self-service account recovery via email, phone, or security questions — restoring access to your eBay account without needing to contact support.",
    valueTerritories: ["convenience", "protection"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029366752-Recovering-your-account"]
  },
  {
    id: "positive-feedback-percentage",
    valueProp: "The headline reputation metric — the percentage of positive ratings a seller has received over the past 12 months — the single most visible trust signal on any eBay listing.",
    valueTerritories: ["transparency", "trust", "community"],
    nameClass: "Feature Name",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market", "long-term"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029193832"]
  },
  {
    id: "powerseller",
    valueProp: "The original elite seller designation (1999–2023) based on monthly sales volume, establishing eBay's first tiered seller quality system before being superseded by Top Rated Seller.",
    valueTerritories: ["trust", "transparency", "community"],
    nameClass: "Legacy Residue",
    isProductName: false,
    strategicRole: ["lifecycle-managed"],
    citations: [
      "https://help.ebay.com/hc/en-us/articles (archived PowerSeller program)",
      "Retired in favor of Top Rated Seller system"
    ]
  },
  {
    id: "privacy-policy",
    valueProp: "eBay's public commitment to how your personal data is collected, used, and protected — the legal foundation for data trust across all markets.",
    valueTerritories: ["transparency", "protection"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "long-term"],
    citations: ["https://www.ebay.com/help/policies/member-behavior-policies/ebay-privacy-center?id=4226"]
  },
  {
    id: "product-reviews",
    valueProp: "Aggregate product-level reviews across all sellers of an identical item — giving buyers unbiased quality signals independent of which seller they're considering.",
    valueTerritories: ["transparency", "trust", "community"],
    nameClass: "Feature Name",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029397672-Product-reviews"]
  },
  {
    id: "prohibited-items-list",
    valueProp: "The definitive catalog of items banned from eBay — protecting buyers from illegal or dangerous goods and maintaining the platform's legal compliance across all markets.",
    valueTerritories: ["protection", "trust", "transparency"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "long-term"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360044689894-Prohibited-and-restricted-items"]
  },
  {
    id: "prohibited-restricted-items-by-country",
    valueProp: "Country-specific item restriction policies ensuring eBay complies with local regulations across all markets — from knife restrictions in the UK to alcohol rules in DE.",
    valueTerritories: ["protection", "transparency"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "long-term"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360044689894"]
  },
  {
    id: "purchase-protection",
    valueProp: "eBay's assurance that every purchase is covered — if something goes wrong with an order, buyers are protected and can get their money back.",
    valueTerritories: ["protection", "trust"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "multi-market", "full-funnel"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360020361971"]
  },
  {
    id: "report-buyer",
    valueProp: "Seller tool to flag buyers for non-payment, abusive behavior, return abuse, or fraud — triggering Trust & Safety review and protecting sellers from repeat bad actors.",
    valueTerritories: ["protection", "trust", "community"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029362352-Reporting-a-buyer"]
  },
  {
    id: "report-this-item",
    valueProp: "Community-powered tool for buyers to flag counterfeit products, prohibited listings, or IP violations — the first line of defense for marketplace integrity.",
    valueTerritories: ["protection", "trust", "community"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029362032-Reporting-an-item"]
  },
  {
    id: "restocking-fee",
    valueProp: "A seller-set fee (up to 20%) charged on returns of opened or used items — compensating sellers for items that can no longer be sold as new.",
    valueTerritories: ["value", "transparency"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029390672"]
  },
  {
    id: "safeharbor",
    valueProp: "eBay's original (1999) fraud reporting and dispute resolution team — the precursor to modern Trust & Safety, accessible at SafeHarbor@eBay.com during eBay's early growth era.",
    valueTerritories: ["protection", "trust", "community"],
    nameClass: "Legacy Residue",
    isProductName: false,
    strategicRole: ["lifecycle-managed"],
    citations: ["Historical eBay programs documentation, 1999"]
  },
  {
    id: "seller-pays-return-shipping",
    valueProp: "Return policy option where the seller provides a prepaid return label for all returns — a competitive differentiator that maximizes buyer confidence and reduces return friction.",
    valueTerritories: ["convenience", "protection", "trust"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360022569973"]
  },
  {
    id: "seller-performance-standards",
    valueProp: "eBay's three-tier seller quality system — Below Standard, Above Standard, and Top Rated — setting expectations and consequences for seller behavior based on measurable metrics.",
    valueTerritories: ["transparency", "trust", "community"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "multi-market", "full-funnel", "long-term"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361512-Seller-performance-standards"]
  },
  {
    id: "seller-protections",
    valueProp: "eBay's assurances protecting sellers from fraudulent chargebacks, buyer scams, and false claims — including automatic dispute coverage and seller-funded return fraud protection.",
    valueTerritories: ["protection", "trust", "value"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "multi-market", "full-funnel", "long-term"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029390072-Seller-protections"]
  },
  {
    id: "seller-verification",
    valueProp: "Identity verification for new or high-volume sellers requiring government ID, business registration, or tax ID — establishing account legitimacy before listing at scale.",
    valueTerritories: ["trust", "transparency", "protection"],
    nameClass: "Feature Name",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360049987233-Seller-verification"]
  },
  {
    id: "selling-restrictions",
    valueProp: "Account-level listing caps and category restrictions applied to sellers with policy violations or performance defects — graduated enforcement before full suspension.",
    valueTerritories: ["trust", "protection", "community"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029362792-Selling-limits-and-restrictions"]
  },
  {
    id: "shill-bidding-policy",
    valueProp: "Policy prohibiting sellers or their associates from bidding on their own auctions to artificially inflate prices — preserving fair auction competition for all bidders.",
    valueTerritories: ["trust", "transparency", "community"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029362172-Shill-bidding"]
  },
  {
    id: "terms-of-service",
    valueProp: "The legal framework governing all eBay transactions — establishing rights, responsibilities, and rules for every buyer, seller, and third party on the platform.",
    valueTerritories: ["transparency", "trust", "protection"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "long-term"],
    citations: ["https://www.ebay.com/help/policies/member-behavior-policies/user-agreement?id=4259"]
  },
  {
    id: "top-rated-seller",
    valueProp: "eBay's highest seller quality designation — awarded to sellers with consistently excellent performance on tracking, handling time, and return rates — with fee discounts and a visible badge as rewards.",
    valueTerritories: ["trust", "transparency", "speed"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "multi-market", "full-funnel", "long-term"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029361512-Top-Rated-Seller-program"]
  },
  {
    id: "trademark",
    valueProp: "IP enforcement for trademark holders to identify and remove counterfeit or unauthorized branded listings through the VeRO program and reporting tools.",
    valueTerritories: ["protection", "trust", "transparency"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360044716574-VeRO-Protecting-intellectual-property"]
  },
  {
    id: "transaction-interference-policy",
    valueProp: "Policy prohibiting off-eBay solicitation — preventing sellers from luring buyers away from the platform to complete sales that bypass eBay's buyer protection and fees.",
    valueTerritories: ["protection", "trust", "community"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029362032"]
  },
  {
    id: "trusted-seller",
    valueProp: "eBay seller trust designation recognizing verified reliability, policy compliance, and consistent quality — a platform-credibility signal distinct from performance-metric badges like Top Rated Seller.",
    valueTerritories: ["trust", "transparency", "community"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "multi-market", "long-term"],
    citations: [
      "https://wiki.corp.ebay.com (122+ internal documentation pages across multiple Confluence spaces)"
    ]
  },
  {
    id: "two-factor-authentication",
    valueProp: "An extra login verification step — SMS code, authenticator app, or biometric — that blocks unauthorized account access even when passwords are compromised.",
    valueTerritories: ["protection", "trust", "convenience"],
    nameClass: "Feature Name",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market", "long-term"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029397232-Setting-up-2-step-verification"]
  },
  {
    id: "user-agreement",
    valueProp: "The binding legal terms that all eBay users agree to when creating an account — establishing platform rules, responsibilities, and rights for buyers, sellers, and eBay.",
    valueTerritories: ["transparency", "trust"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "long-term"],
    citations: ["https://www.ebay.com/help/policies/member-behavior-policies/user-agreement?id=4259"]
  },
  {
    id: "vehicle-purchase-protection",
    valueProp: "Buyer protection tailored for vehicle purchases on eBay Motors — covering undisclosed damage, odometer fraud, and misrepresentation with coverage limits designed for high-value automotive transactions.",
    valueTerritories: ["protection", "trust", "value"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "long-term"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360041673952-Vehicle-Purchase-Protection"]
  },
  {
    id: "verified-purchase",
    valueProp: "A badge on product reviews confirming the reviewer actually purchased the item on eBay — validating that feedback comes from real transactions, not unverified opinions.",
    valueTerritories: ["transparency", "trust", "community"],
    nameClass: "Feature Name",
    isProductName: false,
    strategicRole: ["high-visibility", "multi-market"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360029397672"]
  },
  {
    id: "verify-account",
    valueProp: "Identity confirmation step requiring phone, address, or payment verification for new or high-risk accounts — building foundational trust before allowing listing or buying at scale.",
    valueTerritories: ["trust", "protection", "transparency"],
    nameClass: "Functional Label",
    isProductName: false,
    strategicRole: ["multi-market", "reusable-capability"],
    citations: ["https://help.ebay.com/hc/en-us/articles/360049987013-Verifying-your-account"]
  },
  {
    id: "vero-program",
    valueProp: "The Verified Rights Owner program giving trademark holders, brand owners, and copyright holders a direct channel to report and remove infringing eBay listings — eBay's primary IP enforcement mechanism.",
    valueTerritories: ["protection", "trust", "transparency"],
    nameClass: "Product Name",
    isProductName: true,
    strategicRole: ["high-visibility", "multi-market", "full-funnel", "long-term"],
    citations: [
      "https://help.ebay.com/hc/en-us/articles/360044716574-VeRO-Protecting-intellectual-property",
      "https://vero.ebay.com"
    ]
  }
]
