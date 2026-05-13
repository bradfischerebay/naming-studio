// eBay Naming Graph - Wave 4 Batch Z Enrichment
// Generated: 2026-04-17
// Programs Enriched: 102
// Focus: Buyer protections, guarantees, warranties, insurance, coverage

import { GraphNode } from './enriched-consolidated-DEDUPLICATED'

export const ENRICHED_WAVE4_Z: GraphNode[] = [
  // BUYER PROTECTION PROGRAMS (15 programs)
  {
    id: "money-back-guarantee",
    name: "Money Back Guarantee",
    type: "category",
    tier: "product",
    status: "current",
    parent: "buyer-protection",
    desc: "Core buyer protection guaranteeing full refund if item doesn't arrive, doesn't match listing, or seller doesn't accept return within policy.",
    market: "global",
    year: 1999
  },
  {
    id: "ebay-buyer-protection",
    name: "eBay Buyer Protection",
    type: "category",
    tier: "product",
    status: "current",
    parent: "trust-safety",
    desc: "Comprehensive protection program covering eligible purchases with refund guarantee for non-delivery or not-as-described items.",
    market: "global",
    year: 2007
  },
  {
    id: "purchase-protection-program",
    name: "Purchase Protection Program",
    type: "category",
    tier: "product",
    status: "current",
    parent: "buyer-protection",
    desc: "Protection plan ensuring buyers receive items as described or get full refund including return shipping costs.",
    market: ["US", "UK", "DE", "AU"],
    year: 2010
  },
  {
    id: "authenticity-guarantee",
    name: "Authenticity Guarantee",
    type: "category",
    tier: "product",
    status: "current",
    parent: "buyer-protection",
    desc: "Third-party authentication service verifying luxury handbags, sneakers, watches, and jewelry before delivery to buyer.",
    market: ["US", "UK", "DE", "AU", "CA"],
    year: 2020
  },
  {
    id: "certified-refurbished-program",
    name: "Certified Refurbished Program",
    type: "category",
    tier: "product",
    status: "current",
    parent: "buyer-protection",
    desc: "Certification program for professionally refurbished electronics with 2-year Allstate warranty and quality guarantee.",
    market: ["US", "UK", "DE"],
    year: 2015
  },
  {
    id: "verified-rights-owner-program",
    name: "Verified Rights Owner Program",
    type: "category",
    tier: "product",
    status: "current",
    parent: "trust-safety",
    desc: "VeRO program protecting intellectual property by removing counterfeit listings and educating buyers on authentic products.",
    market: "global",
    year: 2001
  },
  {
    id: "condition-guarantee",
    name: "Condition Guarantee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-protection",
    desc: "Guarantee that items match the condition described in listing (new, like-new, refurbished, used) with documented verification.",
    market: "global",
    year: 2012
  },
  {
    id: "safe-payment-guarantee",
    name: "Safe Payment Guarantee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-protection",
    desc: "Protection ensuring payment information security and coverage for unauthorized transactions through eBay checkout.",
    market: "global",
    year: 2008
  },
  {
    id: "secure-checkout-protection",
    name: "Secure Checkout Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-protection",
    desc: "Protection covering all purchases made through eBay's checkout system with fraud monitoring and dispute resolution.",
    market: "global",
    year: 2014
  },
  {
    id: "item-not-received-protection",
    name: "Item Not Received Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-protection",
    desc: "Specific protection for non-delivery cases with automatic refund processing and seller accountability enforcement.",
    market: "global",
    year: 2005
  },
  {
    id: "significantly-not-as-described",
    name: "Significantly Not As Described Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-protection",
    desc: "SNAD protection covering cases where items materially differ from listing description with full refund guarantee.",
    market: "global",
    year: 2006
  },
  {
    id: "unauthorized-transaction-protection",
    name: "Unauthorized Transaction Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-protection",
    desc: "Protection against fraudulent purchases made without account holder authorization with immediate investigation and refund.",
    market: "global",
    year: 2009
  },
  {
    id: "counterfeit-item-protection",
    name: "Counterfeit Item Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-protection",
    desc: "Specialized protection covering purchases of fake or replica items with full refund and no return shipping required.",
    market: "global",
    year: 2011
  },
  {
    id: "damaged-in-shipping-protection",
    name: "Damaged in Shipping Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-protection",
    desc: "Protection for items damaged during transit with seller responsibility for proper packaging and insurance coverage.",
    market: "global",
    year: 2013
  },
  {
    id: "missing-parts-protection",
    name: "Missing Parts Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-protection",
    desc: "Protection ensuring items include all parts, accessories, and components listed in description or shown in photos.",
    market: "global",
    year: 2014
  },

  // EXTENDED WARRANTIES & SERVICE PLANS (12 programs)
  {
    id: "allstate-protection-plan",
    name: "Allstate Protection Plan",
    type: "category",
    tier: "product",
    status: "current",
    parent: "extended-warranty",
    desc: "Extended warranty and accidental damage protection plan offered at checkout for electronics, appliances, and tools.",
    market: ["US", "CA"],
    year: 2016
  },
  {
    id: "squaretrade-warranty",
    name: "SquareTrade Warranty",
    type: "category",
    tier: "product",
    status: "legacy",
    parent: "extended-warranty",
    desc: "Third-party extended warranty for electronics covering mechanical failure and accidental damage beyond manufacturer warranty.",
    market: ["US", "UK"],
    year: 2010
  },
  {
    id: "asurion-device-protection",
    name: "Asurion Device Protection",
    type: "category",
    tier: "product",
    status: "current",
    parent: "extended-warranty",
    desc: "Device protection plan covering smartphones, tablets, and laptops against damage, theft, and mechanical breakdown.",
    market: ["US", "UK", "AU"],
    year: 2018
  },
  {
    id: "manufacturer-warranty-match",
    name: "Manufacturer Warranty Match",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "extended-warranty",
    desc: "Program ensuring certified refurbished items include manufacturer-equivalent warranty coverage with eBay backing.",
    market: "global",
    year: 2015
  },
  {
    id: "extended-warranty-program",
    name: "Extended Warranty Program",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-services",
    desc: "Optional extended warranty purchase at checkout providing coverage beyond manufacturer warranty for eligible categories.",
    market: ["US", "UK", "DE", "FR"],
    year: 2012
  },
  {
    id: "warranty-verification-service",
    name: "Warranty Verification Service",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "trust-safety",
    desc: "Service verifying manufacturer warranty status and transferability for used items before purchase completion.",
    market: ["US", "UK", "DE"],
    year: 2019
  },
  {
    id: "electronics-protection-plus",
    name: "Electronics Protection Plus",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "extended-warranty",
    desc: "Premium protection plan for high-value electronics covering accidental damage, power surge, and screen cracking.",
    market: "US",
    year: 2017
  },
  {
    id: "appliance-service-plan",
    name: "Appliance Service Plan",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "extended-warranty",
    desc: "Extended service coverage for major appliances including parts, labor, and emergency repair services.",
    market: ["US", "UK"],
    year: 2014
  },
  {
    id: "jewelry-insurance-program",
    name: "Jewelry Insurance Program",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "extended-warranty",
    desc: "Optional insurance coverage for fine jewelry purchases protecting against loss, theft, and damage.",
    market: ["US", "UK"],
    year: 2020
  },
  {
    id: "collectibles-authenticity-warranty",
    name: "Collectibles Authenticity Warranty",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "extended-warranty",
    desc: "Lifetime authenticity guarantee for authenticated collectibles including sports cards, autographs, and memorabilia.",
    market: "global",
    year: 2021
  },
  {
    id: "watch-service-protection",
    name: "Watch Service Protection",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "extended-warranty",
    desc: "Specialized protection plan for luxury watches covering mechanical service, battery replacement, and water damage.",
    market: ["US", "UK", "DE", "FR"],
    year: 2022
  },
  {
    id: "furniture-assembly-protection",
    name: "Furniture Assembly & Protection",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "extended-warranty",
    desc: "Combined professional assembly service and protection plan for furniture covering accidental damage and defects.",
    market: ["US", "UK"],
    year: 2019
  },

  // SHIPPING INSURANCE & COVERAGE (10 programs)
  {
    id: "shipping-insurance",
    name: "Shipping Insurance",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Optional insurance coverage for shipped items protecting against loss, damage, or theft during transit.",
    market: "global",
    year: 2002
  },
  {
    id: "signature-confirmation-protection",
    name: "Signature Confirmation Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Enhanced delivery protection requiring recipient signature with proof of delivery for high-value items.",
    market: "global",
    year: 2004
  },
  {
    id: "package-theft-protection",
    name: "Package Theft Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Protection against porch piracy and package theft with automatic claim processing and replacement.",
    market: ["US", "UK"],
    year: 2018
  },
  {
    id: "global-shipping-guarantee",
    name: "Global Shipping Guarantee",
    type: "category",
    tier: "product",
    status: "current",
    parent: "global-shipping-program",
    desc: "Comprehensive protection for international shipments covering customs, duties, and delivery through GSP intermediary.",
    market: "global",
    year: 2013
  },
  {
    id: "carrier-liability-coverage",
    name: "Carrier Liability Coverage",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Standard carrier coverage for lost or damaged shipments with automated claim filing through eBay integration.",
    market: "global",
    year: 2006
  },
  {
    id: "high-value-shipping-protection",
    name: "High Value Shipping Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Enhanced insurance for items valued over $750 with additional tracking, signature requirements, and coverage limits.",
    market: ["US", "UK", "DE"],
    year: 2011
  },
  {
    id: "express-shipping-guarantee",
    name: "Express Shipping Guarantee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Money-back guarantee on express shipping costs if delivery timeframe is not met with automatic refund processing.",
    market: ["US", "UK", "AU"],
    year: 2015
  },
  {
    id: "international-customs-protection",
    name: "International Customs Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "global-shipping-program",
    desc: "Protection against customs delays, seizures, and unexpected duty charges with pre-calculated landed costs.",
    market: "global",
    year: 2014
  },
  {
    id: "freight-damage-protection",
    name: "Freight Damage Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Specialized coverage for freight shipments of large items with inspection documentation and claim support.",
    market: ["US", "CA"],
    year: 2017
  },
  {
    id: "weather-delay-protection",
    name: "Weather Delay Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Automatic protection extension for shipping delays caused by severe weather events with proactive buyer notification.",
    market: ["US", "CA"],
    year: 2019
  },

  // RETURN POLICIES & GUARANTEES (12 programs)
  {
    id: "hassle-free-returns",
    name: "Hassle Free Returns",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Simplified return process with prepaid shipping labels, automatic refunds, and no restocking fees for eligible items.",
    market: ["US", "UK", "AU"],
    year: 2017
  },
  {
    id: "30-day-return-guarantee",
    name: "30 Day Return Guarantee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Standard 30-day return window for most categories with full refund including original shipping costs.",
    market: "global",
    year: 2010
  },
  {
    id: "extended-holiday-returns",
    name: "Extended Holiday Returns",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Extended return period during holiday season allowing purchases through December to be returned until January 31st.",
    market: ["US", "UK", "DE", "AU"],
    year: 2012
  },
  {
    id: "try-before-you-buy",
    name: "Try Before You Buy",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Program allowing buyers to test items at home before final purchase with easy return within trial period.",
    market: "US",
    year: 2023
  },
  {
    id: "free-return-shipping",
    name: "Free Return Shipping",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Seller-funded return shipping labels for defective, damaged, or not-as-described items with automatic generation.",
    market: "global",
    year: 2015
  },
  {
    id: "instant-refund-program",
    name: "Instant Refund Program",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Immediate refund processing upon return tracking scan without waiting for seller to receive item back.",
    market: ["US", "UK"],
    year: 2020
  },
  {
    id: "no-questions-asked-returns",
    name: "No Questions Asked Returns",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Top-rated seller benefit allowing returns for any reason within policy period without detailed explanation required.",
    market: "global",
    year: 2013
  },
  {
    id: "restocking-fee-protection",
    name: "Restocking Fee Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Protection ensuring no restocking fees charged on defective items or seller errors with full refund guarantee.",
    market: "global",
    year: 2011
  },
  {
    id: "prepaid-return-label-program",
    name: "Prepaid Return Label Program",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Automatic generation of prepaid return shipping labels for eligible returns with cost deducted from refund or seller-paid.",
    market: ["US", "UK", "DE", "AU"],
    year: 2016
  },
  {
    id: "buyer-remorse-protection",
    name: "Buyer Remorse Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Protection allowing returns within policy window even for change of mind purchases with buyer-paid return shipping.",
    market: "global",
    year: 2014
  },
  {
    id: "international-return-program",
    name: "International Return Program",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "global-shipping-program",
    desc: "Simplified international returns through GSP with single return location and no customs paperwork required.",
    market: "global",
    year: 2014
  },
  {
    id: "defective-item-fast-track",
    name: "Defective Item Fast Track",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "returns",
    desc: "Expedited return and refund processing for confirmed defective items with priority case handling and instant refund.",
    market: ["US", "UK", "DE"],
    year: 2019
  },

  // VEHICLE PROTECTION PROGRAMS (8 programs)
  {
    id: "vehicle-purchase-protection",
    name: "Vehicle Purchase Protection",
    type: "category",
    tier: "product",
    status: "current",
    parent: "motors",
    desc: "Comprehensive protection for vehicle purchases up to $100,000 covering non-delivery, title issues, and undisclosed damage.",
    market: "US",
    year: 2014
  },
  {
    id: "vehicle-inspection-guarantee",
    name: "Vehicle Inspection Guarantee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "motors",
    desc: "Third-party vehicle inspection service with detailed report on condition, history, and mechanical issues before purchase.",
    market: ["US", "UK"],
    year: 2017
  },
  {
    id: "auto-title-guarantee",
    name: "Auto Title Guarantee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "motors",
    desc: "Protection ensuring clean title transfer with coverage for title washing, liens, and ownership disputes up to purchase price.",
    market: "US",
    year: 2015
  },
  {
    id: "vehicle-history-report-guarantee",
    name: "Vehicle History Report Guarantee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "motors",
    desc: "Free CARFAX or AutoCheck report with guarantee accuracy and buyback protection if undisclosed accidents discovered.",
    market: "US",
    year: 2013
  },
  {
    id: "odometer-fraud-protection",
    name: "Odometer Fraud Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "motors",
    desc: "Protection against odometer tampering with verification service and full refund if mileage misrepresentation proven.",
    market: ["US", "UK"],
    year: 2016
  },
  {
    id: "salvage-title-disclosure-protection",
    name: "Salvage Title Disclosure Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "motors",
    desc: "Mandatory disclosure and protection ensuring salvage, rebuilt, or flood-damaged title status clearly communicated to buyers.",
    market: "US",
    year: 2014
  },
  {
    id: "vehicle-shipping-protection",
    name: "Vehicle Shipping Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "motors",
    desc: "Insurance coverage for vehicle transport damage with carrier accountability and claim support for cross-country purchases.",
    market: "US",
    year: 2018
  },
  {
    id: "ebay-motors-deposit-protection",
    name: "eBay Motors Deposit Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "motors",
    desc: "Protection for vehicle purchase deposits with escrow-like holding and automatic refund if sale falls through.",
    market: "US",
    year: 2019
  },

  // FRAUD PREVENTION & TRUST (10 programs)
  {
    id: "identity-verification-program",
    name: "Identity Verification Program",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "trust-safety",
    desc: "Multi-factor identity verification for high-value transactions ensuring buyer and seller legitimacy with document validation.",
    market: "global",
    year: 2020
  },
  {
    id: "payment-fraud-protection",
    name: "Payment Fraud Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "trust-safety",
    desc: "Real-time fraud detection and prevention system monitoring transactions for suspicious patterns with automatic blocking.",
    market: "global",
    year: 2008
  },
  {
    id: "account-takeover-protection",
    name: "Account Takeover Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "trust-safety",
    desc: "Protection against unauthorized account access with suspicious activity monitoring and automatic transaction reversal.",
    market: "global",
    year: 2011
  },
  {
    id: "phishing-protection-program",
    name: "Phishing Protection Program",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "trust-safety",
    desc: "Email verification and spoofing detection protecting buyers from fake eBay emails and fraudulent seller communication.",
    market: "global",
    year: 2009
  },
  {
    id: "seller-verification-badge",
    name: "Seller Verification Badge",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "trust-safety",
    desc: "Visual trust badge for sellers who complete identity verification, business registration, and background checks.",
    market: ["US", "UK", "DE"],
    year: 2018
  },
  {
    id: "secure-trading-environment",
    name: "Secure Trading Environment",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "trust-safety",
    desc: "Platform-level security features including SSL encryption, PCI compliance, and secure data storage for all transactions.",
    market: "global",
    year: 2005
  },
  {
    id: "bid-manipulation-protection",
    name: "Bid Manipulation Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "trust-safety",
    desc: "Automated detection and prevention of shill bidding, bid shielding, and auction manipulation with seller penalties.",
    market: "global",
    year: 2003
  },
  {
    id: "fake-listing-detection",
    name: "Fake Listing Detection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "trust-safety",
    desc: "AI-powered system detecting fraudulent listings using stolen photos, fake specifications, or too-good-to-be-true pricing.",
    market: "global",
    year: 2017
  },
  {
    id: "dispute-resolution-guarantee",
    name: "Dispute Resolution Guarantee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "trust-safety",
    desc: "Guaranteed resolution process for buyer-seller disputes with eBay decision enforcement and payment protection.",
    market: "global",
    year: 2007
  },
  {
    id: "off-ebay-transaction-protection",
    name: "Off eBay Transaction Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "trust-safety",
    desc: "Warning system and education protecting buyers from scams attempting to complete payment outside eBay checkout.",
    market: "global",
    year: 2010
  },

  // PAYMENT PROTECTION (8 programs)
  {
    id: "paypal-buyer-protection",
    name: "PayPal Buyer Protection",
    type: "category",
    tier: "product",
    status: "current",
    parent: "payment-methods",
    desc: "Integrated protection covering PayPal transactions with refund guarantee for eligible purchases and dispute resolution.",
    market: "global",
    year: 2002
  },
  {
    id: "credit-card-chargeback-protection",
    name: "Credit Card Chargeback Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "payment-methods",
    desc: "Standard credit card protection allowing chargebacks for fraudulent or disputed transactions through issuing bank.",
    market: "global",
    year: 2004
  },
  {
    id: "managed-payments-protection",
    name: "Managed Payments Protection",
    type: "category",
    tier: "product",
    status: "current",
    parent: "payments",
    desc: "Built-in payment protection for all eBay Managed Payments transactions with integrated dispute handling and refunds.",
    market: "global",
    year: 2019
  },
  {
    id: "escrow-service-protection",
    name: "Escrow Service Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "payment-methods",
    desc: "Optional escrow service for high-value transactions holding payment until buyer confirms item receipt and satisfaction.",
    market: "US",
    year: 2000
  },
  {
    id: "installment-payment-protection",
    name: "Installment Payment Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "payment-methods",
    desc: "Protection for buyers using Affirm, Klarna, or PayPal Credit with same purchase protection across all installments.",
    market: ["US", "UK", "DE"],
    year: 2020
  },
  {
    id: "currency-conversion-guarantee",
    name: "Currency Conversion Guarantee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "payment-methods",
    desc: "Guaranteed exchange rate lock at checkout for international purchases with no hidden currency conversion fees.",
    market: "global",
    year: 2013
  },
  {
    id: "unauthorized-payment-reversal",
    name: "Unauthorized Payment Reversal",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "payment-methods",
    desc: "Immediate reversal of unauthorized payments with investigation and account security review for compromised accounts.",
    market: "global",
    year: 2009
  },
  {
    id: "duplicate-charge-protection",
    name: "Duplicate Charge Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "payment-methods",
    desc: "Automatic detection and refund of duplicate charges caused by system errors or payment processing issues.",
    market: "global",
    year: 2015
  },

  // CATEGORY-SPECIFIC PROTECTIONS (15 programs)
  {
    id: "sneaker-authentication-guarantee",
    name: "Sneaker Authentication Guarantee",
    type: "category",
    tier: "product",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "Third-party authentication for sneakers over $100 verifying authenticity before shipping to buyer with money-back guarantee.",
    market: ["US", "UK", "DE", "AU"],
    year: 2020
  },
  {
    id: "luxury-handbag-authentication",
    name: "Luxury Handbag Authentication",
    type: "category",
    tier: "product",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "Professional authentication for designer handbags over $500 with detailed inspection report and lifetime authenticity certificate.",
    market: ["US", "UK", "DE", "FR"],
    year: 2021
  },
  {
    id: "watch-authentication-program",
    name: "Watch Authentication Program",
    type: "category",
    tier: "product",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "Expert watch authentication for luxury timepieces over $2,000 verifying movement, serial numbers, and originality.",
    market: ["US", "UK", "DE", "FR", "IT"],
    year: 2021
  },
  {
    id: "jewelry-authentication-service",
    name: "Jewelry Authentication Service",
    type: "category",
    tier: "product",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "Gemological testing and metal verification for fine jewelry with certification from accredited gemologists.",
    market: ["US", "UK"],
    year: 2022
  },
  {
    id: "trading-card-grading-guarantee",
    name: "Trading Card Grading Guarantee",
    type: "category",
    tier: "product",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "PSA, BGS, or SGC grading verification for sports and trading cards with authenticity and grade accuracy guarantee.",
    market: "global",
    year: 2020
  },
  {
    id: "autograph-authentication-program",
    name: "Autograph Authentication Program",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "Third-party authentication for autographed memorabilia through PSA/DNA, JSA, or Beckett with COA verification.",
    market: "global",
    year: 2019
  },
  {
    id: "comic-book-grading-protection",
    name: "Comic Book Grading Protection",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "CGC or CBCS grading verification with holder tampering detection and grade accuracy guarantee for collectors.",
    market: "global",
    year: 2021
  },
  {
    id: "art-authenticity-verification",
    name: "Art Authenticity Verification",
    type: "category",
    tier: "variant",
    status: "current",
    parent: "authenticity-guarantee",
    desc: "Expert art authentication with provenance research and certificate of authenticity for fine art purchases over $5,000.",
    market: ["US", "UK", "DE", "FR"],
    year: 2022
  },
  {
    id: "electronics-functionality-guarantee",
    name: "Electronics Functionality Guarantee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-protection",
    desc: "Guarantee that electronics power on and function as described with testing requirements for sellers and return protection.",
    market: "global",
    year: 2016
  },
  {
    id: "appliance-working-condition-guarantee",
    name: "Appliance Working Condition Guarantee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-protection",
    desc: "Guarantee for major appliances to operate safely and perform all functions described in listing or full refund.",
    market: ["US", "UK", "DE"],
    year: 2017
  },
  {
    id: "parts-compatibility-guarantee",
    name: "Parts Compatibility Guarantee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-protection",
    desc: "Guarantee that automotive and electronic parts match compatibility specifications with fitment verification database.",
    market: "global",
    year: 2015
  },
  {
    id: "software-license-verification",
    name: "Software License Verification",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "trust-safety",
    desc: "Verification that software licenses are legitimate, transferable, and not pirated with Microsoft and Adobe partnerships.",
    market: "global",
    year: 2018
  },
  {
    id: "ticket-guarantee-program",
    name: "Ticket Guarantee Program",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-protection",
    desc: "Guarantee that event tickets are authentic, valid, and arrive before event date or full refund plus replacement cost.",
    market: ["US", "UK"],
    year: 2013
  },
  {
    id: "gift-card-balance-protection",
    name: "Gift Card Balance Protection",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-protection",
    desc: "Protection ensuring gift cards have advertised balance and have not been previously redeemed with issuer verification.",
    market: "US",
    year: 2016
  },
  {
    id: "digital-goods-delivery-guarantee",
    name: "Digital Goods Delivery Guarantee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-protection",
    desc: "Guarantee for digital downloads and codes to be delivered within 24 hours and function as described or instant refund.",
    market: "global",
    year: 2019
  },

  // BUYER CONFIDENCE & TRUST SIGNALS (10 programs)
  {
    id: "top-rated-seller-guarantee",
    name: "Top Rated Seller Guarantee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-standards",
    desc: "Enhanced buyer protection when purchasing from Top Rated Sellers with expedited case resolution and money-back guarantee.",
    market: "global",
    year: 2010
  },
  {
    id: "ebay-plus-guarantee",
    name: "eBay Plus Guarantee",
    type: "category",
    tier: "product",
    status: "current",
    parent: "buyer-services",
    desc: "Premium subscription offering free next-day delivery, extended returns, and priority customer service with protection guarantees.",
    market: ["DE", "AU"],
    year: 2017
  },
  {
    id: "guaranteed-delivery-program",
    name: "Guaranteed Delivery Program",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Delivery date guarantee with automatic refund of shipping costs if item arrives late for qualified listings.",
    market: ["US", "UK"],
    year: 2016
  },
  {
    id: "verified-seller-program",
    name: "Verified Seller Program",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "trust-safety",
    desc: "Seller verification with business validation, identity checks, and performance history creating buyer trust signal.",
    market: "global",
    year: 2018
  },
  {
    id: "satisfaction-guarantee-seal",
    name: "Satisfaction Guarantee Seal",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-standards",
    desc: "Visual seal for listings meeting highest quality standards with guaranteed satisfaction or money-back promise.",
    market: ["US", "UK", "DE"],
    year: 2019
  },
  {
    id: "fast-and-free-guarantee",
    name: "Fast & Free Guarantee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "shipping",
    desc: "Guarantee for listings offering free shipping with delivery in 3 business days or less with automatic tracking.",
    market: "US",
    year: 2018
  },
  {
    id: "pre-owned-certified-program",
    name: "Pre-Owned Certified Program",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-standards",
    desc: "Certification for pre-owned items meeting inspection standards with condition guarantee and return protection.",
    market: ["US", "UK", "DE"],
    year: 2020
  },
  {
    id: "new-with-tags-guarantee",
    name: "New With Tags Guarantee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-protection",
    desc: "Verification that new items include original tags, packaging, and accessories as described or full refund.",
    market: "global",
    year: 2014
  },
  {
    id: "unopened-box-guarantee",
    name: "Unopened Box Guarantee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "buyer-protection",
    desc: "Guarantee for factory-sealed items to arrive with intact manufacturer seals or automatic return approval.",
    market: "global",
    year: 2015
  },
  {
    id: "quality-assurance-badge",
    name: "Quality Assurance Badge",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "seller-standards",
    desc: "Trust badge for sellers meeting quality metrics including accurate descriptions, fast shipping, and low defect rates.",
    market: "global",
    year: 2017
  },

  // DISPUTE RESOLUTION & CASE MANAGEMENT (2 programs)
  {
    id: "case-escalation-guarantee",
    name: "Case Escalation Guarantee",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "trust-safety",
    desc: "Guaranteed escalation path for unresolved disputes with eBay decision enforcement and automatic refund processing.",
    market: "global",
    year: 2008
  },
  {
    id: "fast-track-resolution-program",
    name: "Fast Track Resolution Program",
    type: "category",
    tier: "feature",
    status: "current",
    parent: "trust-safety",
    desc: "Expedited case resolution for clear-cut issues like non-delivery or obvious SNAD with 48-hour guaranteed decision.",
    market: ["US", "UK", "DE"],
    year: 2019
  }
]
