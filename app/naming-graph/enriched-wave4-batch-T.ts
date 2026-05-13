// ENRICHED WAVE 4 BATCH T - Pricing, Payment, Currency, Checkout & Billing Programs
// Focus: Pricing tools, currency conversion, payment methods, checkout features, invoicing, billing, fees, tax
// Generated: 2026-04-17
// Status: 100+ NEW programs enriched with market translations, hierarchy, and product naming metadata

import { EnrichedProgramNode } from './types';

export const ENRICHED_WAVE4_T: EnrichedProgramNode[] = [
  // === PAYMENT METHODS & SYSTEMS ===
  {
    id: 'managed-payments',
    canonical_name: 'Managed Payments',
    hierarchy_level: 'umbrella',
    parent_id: 'payments',
    translations: {
      US: 'Managed Payments',
      UK: 'Managed Payments',
      CA: 'Managed Payments',
      AU: 'Managed Payments'
    },
    categories: ['payment', 'financial', 'seller-tools'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'separate',
      product_vs_feature: 'standalone_product',
      lifespan: 'permanent',
      strategic_value: 'high'
    },
    product_naming_analysis: {
      naming_verdict: 'PROCEED_WITH_NAMING',
      naming_score: 70,
      naming_rationale: 'Comprehensive payment processing platform with separate enrollment, permanent strategic value, multi-market deployment. Strong standalone identity required.',
      confidence_level: 'high'
    }
  },
  {
    id: 'paypal',
    canonical_name: 'PayPal',
    hierarchy_level: 'product',
    parent_id: 'payment-methods',
    translations: {
      US: 'PayPal',
      UK: 'PayPal',
      DE: 'PayPal',
      FR: 'PayPal',
      IT: 'PayPal',
      CA: 'PayPal',
      AU: 'PayPal'
    },
    categories: ['payment', 'third-party'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'separate',
      product_vs_feature: 'third_party_integration',
      lifespan: 'permanent',
      strategic_value: 'high'
    },
    product_naming_analysis: {
      naming_verdict: 'EXTERNAL_BRAND',
      naming_score: 0,
      naming_rationale: 'Third-party payment brand - eBay does not control naming',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'venmo',
    canonical_name: 'Venmo',
    hierarchy_level: 'product',
    parent_id: 'payment-methods',
    translations: {
      US: 'Venmo',
      UK: 'Venmo',
      DE: 'Venmo',
      FR: 'Venmo',
      IT: 'Venmo',
      CA: 'Venmo',
      AU: 'Venmo'
    },
    categories: ['payment', 'mobile', 'third-party'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'separate',
      product_vs_feature: 'third_party_integration',
      lifespan: 'permanent',
      strategic_value: 'medium'
    },
    product_naming_analysis: {
      naming_verdict: 'EXTERNAL_BRAND',
      naming_score: 0,
      naming_rationale: 'Third-party payment brand - eBay does not control naming',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'apple-pay',
    canonical_name: 'Apple Pay',
    hierarchy_level: 'product',
    parent_id: 'payment-methods',
    translations: {
      US: 'Apple Pay',
      UK: 'Apple Pay',
      DE: 'Apple Pay',
      FR: 'Apple Pay',
      IT: 'Apple Pay',
      CA: 'Apple Pay',
      AU: 'Apple Pay'
    },
    categories: ['payment', 'mobile', 'third-party'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'integrated',
      product_vs_feature: 'third_party_integration',
      lifespan: 'permanent',
      strategic_value: 'medium'
    },
    product_naming_analysis: {
      naming_verdict: 'EXTERNAL_BRAND',
      naming_score: 0,
      naming_rationale: 'Third-party payment brand - eBay does not control naming',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'google-pay',
    canonical_name: 'Google Pay',
    hierarchy_level: 'product',
    parent_id: 'payment-methods',
    translations: {
      US: 'Google Pay',
      UK: 'Google Pay',
      DE: 'Google Pay',
      FR: 'Google Pay',
      IT: 'Google Pay',
      CA: 'Google Pay',
      AU: 'Google Pay'
    },
    categories: ['payment', 'mobile', 'third-party'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'integrated',
      product_vs_feature: 'third_party_integration',
      lifespan: 'permanent',
      strategic_value: 'medium'
    },
    product_naming_analysis: {
      naming_verdict: 'EXTERNAL_BRAND',
      naming_score: 0,
      naming_rationale: 'Third-party payment brand - eBay does not control naming',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'klarna',
    canonical_name: 'Klarna',
    hierarchy_level: 'product',
    parent_id: 'payment-methods',
    translations: {
      US: 'Klarna',
      UK: 'Klarna',
      DE: 'Klarna',
      FR: 'Klarna',
      IT: 'Klarna',
      CA: 'Klarna',
      AU: 'Klarna'
    },
    categories: ['payment', 'financing', 'third-party'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'separate',
      product_vs_feature: 'third_party_integration',
      lifespan: 'permanent',
      strategic_value: 'medium'
    },
    product_naming_analysis: {
      naming_verdict: 'EXTERNAL_BRAND',
      naming_score: 0,
      naming_rationale: 'Third-party payment/financing brand - eBay does not control naming',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'credit-card',
    canonical_name: 'Credit Card',
    hierarchy_level: 'feature',
    parent_id: 'payment-methods',
    translations: {
      US: 'Credit Card',
      UK: 'Credit Card',
      DE: 'Kreditkarte',
      FR: 'Carte de crédit',
      IT: 'Carta di credito',
      CA: 'Credit Card',
      AU: 'Credit Card'
    },
    categories: ['payment', 'checkout'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'integrated',
      product_vs_feature: 'generic_feature',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 15,
      naming_rationale: 'Generic payment method - descriptive label sufficient, no proprietary naming needed',
      confidence_level: 'high'
    }
  },
  {
    id: 'debit-card',
    canonical_name: 'Debit Card',
    hierarchy_level: 'feature',
    parent_id: 'payment-methods',
    translations: {
      US: 'Debit Card',
      UK: 'Debit Card',
      DE: 'Debitkarte',
      FR: 'Carte de débit',
      IT: 'Carta di debito',
      CA: 'Debit Card',
      AU: 'Debit Card'
    },
    categories: ['payment', 'checkout'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'integrated',
      product_vs_feature: 'generic_feature',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 15,
      naming_rationale: 'Generic payment method - descriptive label sufficient',
      confidence_level: 'high'
    }
  },
  {
    id: 'ebay-mastercard',
    canonical_name: 'eBay Mastercard',
    hierarchy_level: 'product',
    parent_id: 'payments',
    translations: {
      US: 'eBay Mastercard'
    },
    categories: ['payment', 'credit', 'loyalty'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'separate',
      product_vs_feature: 'standalone_product',
      lifespan: 'permanent',
      strategic_value: 'high'
    },
    product_naming_analysis: {
      naming_verdict: 'PROCEED_WITH_NAMING',
      naming_score: 75,
      naming_rationale: 'Co-branded credit card with separate enrollment, permanent program, high strategic value for buyer loyalty and GMV',
      confidence_level: 'high'
    }
  },
  {
    id: 'ebay-gift-cards',
    canonical_name: 'eBay Gift Cards',
    hierarchy_level: 'product',
    parent_id: 'payments',
    translations: {
      US: 'eBay Gift Cards',
      UK: 'eBay Gift Cards',
      DE: 'eBay Gift Cards',
      FR: 'eBay Gift Cards',
      IT: 'eBay Gift Cards',
      CA: 'eBay Gift Cards',
      AU: 'eBay Gift Cards'
    },
    categories: ['payment', 'gift', 'loyalty'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'standalone_product',
      lifespan: 'permanent',
      strategic_value: 'medium'
    },
    product_naming_analysis: {
      naming_verdict: 'PROCEED_WITH_NAMING',
      naming_score: 60,
      naming_rationale: 'Gift card product with multi-market presence, permanent offering, modest differentiation value',
      confidence_level: 'high'
    }
  },

  // === CHECKOUT & CART ===
  {
    id: 'guest-checkout',
    canonical_name: 'Guest Checkout',
    hierarchy_level: 'feature',
    parent_id: 'checkout',
    translations: {
      US: 'Guest Checkout',
      UK: 'Guest Checkout',
      DE: 'Gast-Checkout',
      FR: 'Paiement invité',
      IT: 'Checkout ospite',
      CA: 'Guest Checkout',
      AU: 'Guest Checkout'
    },
    categories: ['checkout', 'buyer-experience'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'embedded_feature',
      lifespan: 'permanent',
      strategic_value: 'medium'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 35,
      naming_rationale: 'Embedded checkout feature with clear functional description, no separate enrollment, naming not needed',
      confidence_level: 'high'
    }
  },
  {
    id: 'shopping-cart',
    canonical_name: 'Shopping Cart',
    hierarchy_level: 'feature',
    parent_id: 'checkout',
    translations: {
      US: 'Shopping Cart',
      UK: 'Shopping Basket',
      DE: 'Einkaufswagen',
      FR: 'Panier',
      IT: 'Carrello',
      CA: 'Shopping Cart',
      AU: 'Shopping Cart'
    },
    categories: ['checkout', 'cart', 'buyer-experience'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'embedded_feature',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 20,
      naming_rationale: 'Standard e-commerce component with universal terminology - descriptive label sufficient',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'add-to-cart',
    canonical_name: 'Add to Cart',
    hierarchy_level: 'feature',
    parent_id: 'checkout',
    translations: {
      US: 'Add to Cart',
      UK: 'Add to Basket',
      DE: 'In den Einkaufswagen',
      FR: 'Ajouter au panier',
      IT: 'Aggiungi al carrello',
      CA: 'Add to Cart',
      AU: 'Add to Cart'
    },
    categories: ['checkout', 'ui'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'ui_component',
      lifespan: 'permanent',
      strategic_value: 'none'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_INLINE_COPY',
      naming_score: 5,
      naming_rationale: 'UI button/action - inline copy only, no naming required',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'save-for-later',
    canonical_name: 'Save for Later',
    hierarchy_level: 'feature',
    parent_id: 'checkout',
    translations: {
      US: 'Save for Later',
      UK: 'Save for Later',
      DE: 'Für später speichern',
      FR: 'Enregistrer pour plus tard',
      IT: 'Salva per dopo',
      CA: 'Save for Later',
      AU: 'Save for Later'
    },
    categories: ['checkout', 'buyer-tools'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'embedded_feature',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 15,
      naming_rationale: 'Simple cart management feature - descriptive label sufficient',
      confidence_level: 'high'
    }
  },

  // === SELLER FEES & PRICING ===
  {
    id: 'final-value-fee',
    canonical_name: 'Final Value Fee',
    hierarchy_level: 'feature',
    parent_id: 'seller-fees',
    translations: {
      US: 'Final Value Fee',
      UK: 'Final Value Fee',
      DE: 'Verkaufsprovision',
      FR: 'Frais de vente finale',
      IT: 'Commissione sul valore finale',
      CA: 'Final Value Fee',
      AU: 'Final Value Fee'
    },
    categories: ['fees', 'pricing', 'seller-tools'],
    business_context: {
      user_interaction: 'passive',
      enrollment: 'automatic',
      product_vs_feature: 'fee_structure',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 10,
      naming_rationale: 'Standard fee structure - clear descriptive terminology established, no branding needed',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'insertion-fee',
    canonical_name: 'Insertion Fee',
    hierarchy_level: 'feature',
    parent_id: 'seller-fees',
    translations: {
      US: 'Insertion Fee',
      UK: 'Insertion Fee',
      DE: 'Angebotsgebühr',
      FR: 'Frais d\'insertion',
      IT: 'Tariffa di inserzione',
      CA: 'Insertion Fee',
      AU: 'Insertion Fee'
    },
    categories: ['fees', 'pricing', 'seller-tools'],
    business_context: {
      user_interaction: 'passive',
      enrollment: 'automatic',
      product_vs_feature: 'fee_structure',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 10,
      naming_rationale: 'Standard fee structure - descriptive label sufficient',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'promoted-listings-fee',
    canonical_name: 'Promoted Listings Fee',
    hierarchy_level: 'feature',
    parent_id: 'seller-fees',
    translations: {
      US: 'Promoted Listings Fee',
      UK: 'Promoted Listings Fee',
      DE: 'Promoted Listings-Gebühr',
      FR: 'Frais d\'annonces sponsorisées',
      IT: 'Tariffa inserzioni sponsorizzate',
      CA: 'Promoted Listings Fee',
      AU: 'Promoted Listings Fee'
    },
    categories: ['fees', 'advertising', 'pricing'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'opt-in',
      product_vs_feature: 'fee_structure',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 20,
      naming_rationale: 'Fee associated with named product (Promoted Listings) - descriptive label ties to parent product',
      confidence_level: 'high'
    }
  },
  {
    id: 'per-order-fee',
    canonical_name: 'Per Order Fee',
    hierarchy_level: 'feature',
    parent_id: 'seller-fees',
    translations: {
      US: 'Per Order Fee',
      UK: 'Per Order Fee',
      DE: 'Gebühr pro Bestellung',
      FR: 'Frais par commande',
      IT: 'Tariffa per ordine',
      CA: 'Per Order Fee',
      AU: 'Per Order Fee'
    },
    categories: ['fees', 'pricing', 'seller-tools'],
    business_context: {
      user_interaction: 'passive',
      enrollment: 'automatic',
      product_vs_feature: 'fee_structure',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 10,
      naming_rationale: 'Transactional fee with clear functional description',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'ad-fee',
    canonical_name: 'Ad Fee',
    hierarchy_level: 'feature',
    parent_id: 'advertising-fees',
    translations: {
      US: 'Ad Fee',
      UK: 'Ad Fee',
      DE: 'Werbegebühr',
      FR: 'Frais publicitaires',
      IT: 'Commissione pubblicitaria',
      CA: 'Ad Fee',
      AU: 'Ad Fee'
    },
    categories: ['fees', 'advertising'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'opt-in',
      product_vs_feature: 'fee_structure',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 10,
      naming_rationale: 'Advertising fee - generic descriptive label',
      confidence_level: 'high'
    }
  },
  {
    id: 'cost-per-sale',
    canonical_name: 'Cost Per Sale',
    hierarchy_level: 'feature',
    parent_id: 'advertising-metrics',
    translations: {
      US: 'Cost Per Sale',
      UK: 'Cost Per Sale',
      DE: 'Kosten pro Verkauf',
      FR: 'Coût par vente',
      IT: 'Costo per vendita',
      CA: 'Cost Per Sale',
      AU: 'Cost Per Sale'
    },
    categories: ['advertising', 'metrics', 'pricing'],
    business_context: {
      user_interaction: 'passive',
      enrollment: 'automatic',
      product_vs_feature: 'metric',
      lifespan: 'permanent',
      strategic_value: 'none'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 5,
      naming_rationale: 'Industry-standard advertising metric - descriptive label only',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'cost-per-click',
    canonical_name: 'Cost Per Click',
    hierarchy_level: 'feature',
    parent_id: 'advertising-metrics',
    translations: {
      US: 'Cost Per Click',
      UK: 'Cost Per Click',
      DE: 'Kosten pro Klick',
      FR: 'Coût par clic',
      IT: 'Costo per clic',
      CA: 'Cost Per Click',
      AU: 'Cost Per Click'
    },
    categories: ['advertising', 'metrics', 'pricing'],
    business_context: {
      user_interaction: 'passive',
      enrollment: 'automatic',
      product_vs_feature: 'metric',
      lifespan: 'permanent',
      strategic_value: 'none'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 5,
      naming_rationale: 'Industry-standard advertising metric',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'free-listings',
    canonical_name: 'Free Listings',
    hierarchy_level: 'program',
    parent_id: 'seller-programs',
    translations: {
      US: 'Free Listings',
      UK: 'Free Listings',
      DE: 'Kostenlose Angebote',
      FR: 'Annonces gratuites',
      IT: 'Inserzioni gratuite',
      CA: 'Free Listings',
      AU: 'Free Listings'
    },
    categories: ['seller-tools', 'pricing', 'promotions'],
    business_context: {
      user_interaction: 'passive',
      enrollment: 'automatic',
      product_vs_feature: 'pricing_program',
      lifespan: 'permanent',
      strategic_value: 'medium'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 40,
      naming_rationale: 'Pricing promotion - descriptive label clearly communicates value, no proprietary naming needed',
      confidence_level: 'high'
    }
  },

  // === PRICING & DISCOUNTS ===
  {
    id: 'volume-pricing',
    canonical_name: 'Volume Pricing',
    hierarchy_level: 'feature',
    parent_id: 'pricing-tools',
    translations: {
      US: 'Volume Pricing',
      UK: 'Volume Pricing',
      DE: 'Mengenrabatt',
      FR: 'Tarification par volume',
      IT: 'Prezzi a volume',
      CA: 'Volume Pricing',
      AU: 'Volume Pricing'
    },
    categories: ['pricing', 'discounts', 'seller-tools'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'pricing_feature',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 25,
      naming_rationale: 'Standard pricing mechanism - descriptive label sufficient',
      confidence_level: 'high'
    }
  },
  {
    id: 'quantity-discount',
    canonical_name: 'Quantity Discount',
    hierarchy_level: 'feature',
    parent_id: 'pricing-tools',
    translations: {
      US: 'Quantity Discount',
      UK: 'Quantity Discount',
      DE: 'Mengenrabatt',
      FR: 'Remise sur quantité',
      IT: 'Sconto quantità',
      CA: 'Quantity Discount',
      AU: 'Quantity Discount'
    },
    categories: ['pricing', 'discounts', 'seller-tools'],
    business_context: {
      user_interaction: 'passive',
      enrollment: 'no',
      product_vs_feature: 'pricing_feature',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 20,
      naming_rationale: 'Standard discount mechanism',
      confidence_level: 'high'
    }
  },
  {
    id: 'order-discount',
    canonical_name: 'Order Discount',
    hierarchy_level: 'feature',
    parent_id: 'pricing-tools',
    translations: {
      US: 'Order Discount',
      UK: 'Order Discount',
      DE: 'Bestellrabatt',
      FR: 'Remise sur commande',
      IT: 'Sconto ordine',
      CA: 'Order Discount',
      AU: 'Order Discount'
    },
    categories: ['pricing', 'discounts'],
    business_context: {
      user_interaction: 'passive',
      enrollment: 'no',
      product_vs_feature: 'pricing_feature',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 20,
      naming_rationale: 'Generic discount type - descriptive label',
      confidence_level: 'high'
    }
  },
  {
    id: 'price-guide',
    canonical_name: 'Price Guide',
    hierarchy_level: 'product',
    parent_id: 'seller-tools',
    translations: {
      US: 'Price Guide'
    },
    categories: ['seller-tools', 'pricing', 'data'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'data_tool',
      lifespan: 'permanent',
      strategic_value: 'medium'
    },
    product_naming_analysis: {
      naming_verdict: 'PROCEED_WITH_NAMING',
      naming_score: 55,
      naming_rationale: 'Data/research tool with clear user interaction, permanent offering, modest differentiation value',
      confidence_level: 'medium'
    }
  },
  {
    id: 'price-suggestions',
    canonical_name: 'Price Suggestions',
    hierarchy_level: 'feature',
    parent_id: 'pricing-tools',
    translations: {
      US: 'Price Suggestions',
      UK: 'Price Suggestions',
      CA: 'Price Suggestions',
      AU: 'Price Suggestions'
    },
    categories: ['pricing', 'seller-tools', 'ai'],
    business_context: {
      user_interaction: 'passive',
      enrollment: 'no',
      product_vs_feature: 'recommendation_feature',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 30,
      naming_rationale: 'AI-powered recommendation feature - descriptive label clearly conveys function',
      confidence_level: 'high'
    }
  },
  {
    id: 'price-range',
    canonical_name: 'Price Range',
    hierarchy_level: 'feature',
    parent_id: 'search-filters',
    translations: {
      US: 'Price Range',
      UK: 'Price Range',
      DE: 'Preisspanne',
      FR: 'Fourchette de prix',
      IT: 'Fascia di prezzo',
      CA: 'Price Range',
      AU: 'Price Range'
    },
    categories: ['search', 'filters', 'pricing'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'filter',
      lifespan: 'permanent',
      strategic_value: 'none'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_INLINE_COPY',
      naming_score: 5,
      naming_rationale: 'Standard search filter - inline copy only',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'reserve-price',
    canonical_name: 'Reserve Price',
    hierarchy_level: 'feature',
    parent_id: 'auction-features',
    translations: {
      US: 'Reserve Price',
      UK: 'Reserve price',
      DE: 'Mindestpreis',
      FR: 'Prix de réserve',
      IT: 'Prezzo di riserva',
      CA: 'Reserve price',
      AU: 'Reserve price'
    },
    categories: ['auction', 'pricing'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'auction_feature',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 20,
      naming_rationale: 'Standard auction mechanic with industry-standard terminology',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'fixed-price-format',
    canonical_name: 'Fixed Price Format',
    hierarchy_level: 'feature',
    parent_id: 'listing-formats',
    translations: {
      US: 'Fixed Price Format',
      UK: 'Fixed Price Format',
      DE: 'Festpreisformat',
      FR: 'Format prix fixe',
      IT: 'Formato prezzo fisso',
      CA: 'Fixed Price Format',
      AU: 'Fixed Price Format'
    },
    categories: ['listing', 'pricing'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'listing_format',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 15,
      naming_rationale: 'Core listing format - descriptive label',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'buy-now-price',
    canonical_name: 'Buy Now Price',
    hierarchy_level: 'feature',
    parent_id: 'auction-features',
    translations: {
      US: 'Buy Now Price',
      UK: 'Buy Now Price',
      DE: 'Sofort-Kaufen-Preis',
      FR: 'Prix Achat immédiat',
      IT: 'Prezzo Compralo Subito',
      CA: 'Buy Now Price',
      AU: 'Buy Now Price'
    },
    categories: ['auction', 'pricing'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'auction_feature',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 20,
      naming_rationale: 'Auction pricing feature - descriptive terminology',
      confidence_level: 'high'
    }
  },
  {
    id: 'starting-bid',
    canonical_name: 'Starting Bid',
    hierarchy_level: 'feature',
    parent_id: 'auction-features',
    translations: {
      US: 'Starting Bid',
      UK: 'Starting Bid',
      DE: 'Startgebot',
      FR: 'Enchère de départ',
      IT: 'Offerta iniziale',
      CA: 'Starting Bid',
      AU: 'Starting Bid'
    },
    categories: ['auction', 'pricing'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'auction_parameter',
      lifespan: 'permanent',
      strategic_value: 'none'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_INLINE_COPY',
      naming_score: 10,
      naming_rationale: 'Auction parameter - standard terminology',
      confidence_level: 'absolute'
    }
  },

  // === TAX & ACCOUNTING ===
  {
    id: 'sales-tax-collection',
    canonical_name: 'Sales Tax Collection',
    hierarchy_level: 'program',
    parent_id: 'tax-programs',
    translations: {
      US: 'Sales Tax Collection',
      UK: 'VAT Collection',
      DE: 'Mehrwertsteuer-Einzug',
      FR: 'Collecte de TVA',
      IT: 'Riscossione IVA',
      CA: 'Sales Tax Collection',
      AU: 'GST Collection'
    },
    categories: ['tax', 'compliance', 'seller-tools'],
    business_context: {
      user_interaction: 'passive',
      enrollment: 'automatic',
      product_vs_feature: 'compliance_system',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 25,
      naming_rationale: 'Regulatory compliance feature - descriptive terminology required for clarity',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'tax-documents',
    canonical_name: 'Tax Documents',
    hierarchy_level: 'feature',
    parent_id: 'tax-programs',
    translations: {
      US: 'Tax Documents',
      UK: 'Tax Documents',
      DE: 'Steuerunterlagen',
      FR: 'Documents fiscaux',
      IT: 'Documenti fiscali',
      CA: 'Tax Documents',
      AU: 'Tax Documents'
    },
    categories: ['tax', 'compliance', 'seller-tools'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'automatic',
      product_vs_feature: 'document_portal',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 15,
      naming_rationale: 'Compliance document access - descriptive label',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'form-1099-k',
    canonical_name: 'Form 1099-K',
    hierarchy_level: 'feature',
    parent_id: 'tax-programs',
    translations: {
      US: 'Form 1099-K'
    },
    categories: ['tax', 'compliance', 'legal'],
    business_context: {
      user_interaction: 'passive',
      enrollment: 'automatic',
      product_vs_feature: 'legal_document',
      lifespan: 'permanent',
      strategic_value: 'none'
    },
    product_naming_analysis: {
      naming_verdict: 'LEGAL_TERMINOLOGY',
      naming_score: 0,
      naming_rationale: 'IRS regulatory form - cannot be renamed, legal terminology required',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'vat',
    canonical_name: 'VAT',
    hierarchy_level: 'feature',
    parent_id: 'tax-programs',
    translations: {
      US: 'Sales Tax',
      UK: 'VAT',
      DE: 'MwSt',
      FR: 'TVA',
      IT: 'IVA',
      CA: 'GST/HST',
      AU: 'GST'
    },
    categories: ['tax', 'compliance'],
    business_context: {
      user_interaction: 'passive',
      enrollment: 'automatic',
      product_vs_feature: 'tax_type',
      lifespan: 'permanent',
      strategic_value: 'none'
    },
    product_naming_analysis: {
      naming_verdict: 'LEGAL_TERMINOLOGY',
      naming_score: 0,
      naming_rationale: 'Government tax terminology - cannot be changed',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'import-charges',
    canonical_name: 'Import Charges',
    hierarchy_level: 'feature',
    parent_id: 'tax-programs',
    translations: {
      US: 'Import Charges',
      UK: 'Import Charges',
      DE: 'Einfuhrabgaben',
      FR: 'Frais d\'importation',
      IT: 'Spese di importazione',
      CA: 'Import Charges',
      AU: 'Import Charges'
    },
    categories: ['tax', 'international', 'compliance'],
    business_context: {
      user_interaction: 'passive',
      enrollment: 'automatic',
      product_vs_feature: 'fee_type',
      lifespan: 'permanent',
      strategic_value: 'none'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 10,
      naming_rationale: 'Customs/trade terminology - descriptive label',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'customs-duties',
    canonical_name: 'Customs Duties',
    hierarchy_level: 'feature',
    parent_id: 'tax-programs',
    translations: {
      US: 'Customs Duties',
      UK: 'Customs Duties',
      DE: 'Zollgebühren',
      FR: 'Droits de douane',
      IT: 'Dazi doganali',
      CA: 'Customs Duties',
      AU: 'Customs Duties'
    },
    categories: ['tax', 'international', 'compliance'],
    business_context: {
      user_interaction: 'passive',
      enrollment: 'automatic',
      product_vs_feature: 'fee_type',
      lifespan: 'permanent',
      strategic_value: 'none'
    },
    product_naming_analysis: {
      naming_verdict: 'LEGAL_TERMINOLOGY',
      naming_score: 0,
      naming_rationale: 'Government customs terminology',
      confidence_level: 'absolute'
    }
  },

  // === INVOICING & BILLING ===
  {
    id: 'send-invoice',
    canonical_name: 'Send Invoice',
    hierarchy_level: 'feature',
    parent_id: 'seller-tools',
    translations: {
      US: 'Send Invoice',
      UK: 'Send Invoice',
      DE: 'Rechnung senden',
      FR: 'Envoyer facture',
      IT: 'Invia fattura',
      CA: 'Send Invoice',
      AU: 'Send Invoice'
    },
    categories: ['invoicing', 'seller-tools'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'tool_feature',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 20,
      naming_rationale: 'Standard billing action - descriptive label',
      confidence_level: 'high'
    }
  },
  {
    id: 'request-total',
    canonical_name: 'Request Total',
    hierarchy_level: 'feature',
    parent_id: 'seller-tools',
    translations: {
      US: 'Request Total',
      UK: 'Request Total',
      DE: 'Gesamtbetrag anfordern',
      FR: 'Demander le total',
      IT: 'Richiedi totale',
      CA: 'Request Total',
      AU: 'Request Total'
    },
    categories: ['invoicing', 'seller-tools', 'checkout'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'buyer_action',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 15,
      naming_rationale: 'Buyer action for combined invoice - descriptive label',
      confidence_level: 'high'
    }
  },
  {
    id: 'transaction-report',
    canonical_name: 'Transaction Report',
    hierarchy_level: 'feature',
    parent_id: 'reports',
    translations: {
      US: 'Transaction Report',
      UK: 'Transaction Report',
      DE: 'Transaktionsbericht',
      FR: 'Rapport des transactions',
      IT: 'Report transazioni',
      CA: 'Transaction Report',
      AU: 'Transaction Report'
    },
    categories: ['reports', 'financial', 'seller-tools'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'report_type',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 20,
      naming_rationale: 'Financial report type - descriptive label',
      confidence_level: 'high'
    }
  },

  // === CURRENCY & INTERNATIONAL ===
  {
    id: 'currency-conversion',
    canonical_name: 'Currency Conversion',
    hierarchy_level: 'feature',
    parent_id: 'international-tools',
    translations: {
      US: 'Currency Conversion',
      UK: 'Currency Conversion',
      DE: 'Währungsumrechnung',
      FR: 'Conversion de devises',
      IT: 'Conversione valuta',
      CA: 'Currency Conversion',
      AU: 'Currency Conversion'
    },
    categories: ['currency', 'international', 'pricing'],
    business_context: {
      user_interaction: 'passive',
      enrollment: 'automatic',
      product_vs_feature: 'background_service',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 15,
      naming_rationale: 'Background currency service - descriptive label sufficient',
      confidence_level: 'high'
    }
  },
  {
    id: 'multi-currency-pricing',
    canonical_name: 'Multi-Currency Pricing',
    hierarchy_level: 'feature',
    parent_id: 'international-tools',
    translations: {
      US: 'Multi-Currency Pricing',
      UK: 'Multi-Currency Pricing',
      DE: 'Mehrwährungspreise',
      FR: 'Tarification multidevise',
      IT: 'Prezzi multivaluta',
      CA: 'Multi-Currency Pricing',
      AU: 'Multi-Currency Pricing'
    },
    categories: ['currency', 'international', 'pricing'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'pricing_feature',
      lifespan: 'permanent',
      strategic_value: 'medium'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 35,
      naming_rationale: 'International pricing feature with clear descriptive terminology',
      confidence_level: 'high'
    }
  },

  // === REFUNDS ===
  {
    id: 'full-refund',
    canonical_name: 'Full Refund',
    hierarchy_level: 'feature',
    parent_id: 'refund-tools',
    translations: {
      US: 'Full Refund',
      UK: 'Full Refund',
      DE: 'Vollständige Rückerstattung',
      FR: 'Remboursement complet',
      IT: 'Rimborso completo',
      CA: 'Full Refund',
      AU: 'Full Refund'
    },
    categories: ['refunds', 'financial', 'customer-service'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'action_type',
      lifespan: 'permanent',
      strategic_value: 'none'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_INLINE_COPY',
      naming_score: 10,
      naming_rationale: 'Refund action type - inline copy',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'partial-refund',
    canonical_name: 'Partial Refund',
    hierarchy_level: 'feature',
    parent_id: 'refund-tools',
    translations: {
      US: 'Partial Refund',
      UK: 'Partial Refund',
      DE: 'Teilrückerstattung',
      FR: 'Remboursement partiel',
      IT: 'Rimborso parziale',
      CA: 'Partial Refund',
      AU: 'Partial Refund'
    },
    categories: ['refunds', 'financial', 'customer-service'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'action_type',
      lifespan: 'permanent',
      strategic_value: 'none'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_INLINE_COPY',
      naming_score: 10,
      naming_rationale: 'Refund action type - inline copy',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'send-refund',
    canonical_name: 'Send Refund',
    hierarchy_level: 'feature',
    parent_id: 'refund-tools',
    translations: {
      US: 'Send Refund',
      UK: 'Send Refund',
      DE: 'Rückerstattung senden',
      FR: 'Envoyer remboursement',
      IT: 'Invia rimborso',
      CA: 'Send Refund',
      AU: 'Send Refund'
    },
    categories: ['refunds', 'financial', 'seller-actions'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'action',
      lifespan: 'permanent',
      strategic_value: 'none'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_INLINE_COPY',
      naming_score: 10,
      naming_rationale: 'Action button - inline copy',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'restocking-fee',
    canonical_name: 'Restocking Fee',
    hierarchy_level: 'feature',
    parent_id: 'return-policies',
    translations: {
      US: 'Restocking Fee',
      UK: 'Restocking Fee',
      DE: 'Wiederauffüllungsgebühr',
      FR: 'Frais de restockage',
      IT: 'Commissione di riassortimento',
      CA: 'Restocking Fee',
      AU: 'Restocking Fee'
    },
    categories: ['fees', 'returns', 'pricing'],
    business_context: {
      user_interaction: 'passive',
      enrollment: 'no',
      product_vs_feature: 'fee_type',
      lifespan: 'permanent',
      strategic_value: 'none'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 10,
      naming_rationale: 'Return fee type - descriptive terminology',
      confidence_level: 'absolute'
    }
  },

  // === SHIPPING DISCOUNTS & COSTS ===
  {
    id: 'shipping-discount',
    canonical_name: 'Shipping Discount',
    hierarchy_level: 'feature',
    parent_id: 'shipping-tools',
    translations: {
      US: 'Shipping Discount',
      UK: 'Postage Discount',
      DE: 'Versandrabatt',
      FR: 'Réduction frais de port',
      IT: 'Sconto spedizione',
      CA: 'Shipping Discount',
      AU: 'Shipping Discount'
    },
    categories: ['shipping', 'discounts', 'pricing'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'discount_type',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 20,
      naming_rationale: 'Shipping pricing feature - descriptive label',
      confidence_level: 'high'
    }
  },
  {
    id: 'shipping-discounts',
    canonical_name: 'Shipping Discounts',
    hierarchy_level: 'program',
    parent_id: 'seller-programs',
    translations: {
      US: 'Shipping Discounts',
      UK: 'Shipping Discounts',
      DE: 'Versandrabatte',
      FR: 'Réductions sur les frais de livraison',
      IT: 'Sconti sulla spedizione',
      CA: 'Shipping Discounts',
      AU: 'Shipping Discounts'
    },
    categories: ['shipping', 'discounts', 'seller-benefits'],
    business_context: {
      user_interaction: 'passive',
      enrollment: 'automatic',
      product_vs_feature: 'seller_benefit_program',
      lifespan: 'permanent',
      strategic_value: 'medium'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 35,
      naming_rationale: 'Seller benefit program with multi-market presence - descriptive label clearly communicates value',
      confidence_level: 'high'
    }
  },
  {
    id: 'combined-shipping',
    canonical_name: 'Combined Shipping',
    hierarchy_level: 'feature',
    parent_id: 'shipping-tools',
    translations: {
      US: 'Combined Shipping',
      UK: 'Combined Postage',
      DE: 'Kombinierter Versand',
      FR: 'Frais de port combinés',
      IT: 'Spedizione combinata',
      CA: 'Combined Shipping',
      AU: 'Combined Postage'
    },
    categories: ['shipping', 'discounts', 'pricing'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'pricing_feature',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 25,
      naming_rationale: 'Multi-item shipping discount mechanism - descriptive label',
      confidence_level: 'high'
    }
  },
  {
    id: 'calculated-shipping',
    canonical_name: 'Calculated Shipping',
    hierarchy_level: 'feature',
    parent_id: 'shipping-tools',
    translations: {
      US: 'Calculated Shipping',
      UK: 'Calculated Postage',
      DE: 'Berechneter Versand',
      FR: 'Frais de port calculés',
      IT: 'Spedizione calcolata',
      CA: 'Calculated Shipping',
      AU: 'Calculated Shipping'
    },
    categories: ['shipping', 'pricing'],
    business_context: {
      user_interaction: 'passive',
      enrollment: 'no',
      product_vs_feature: 'pricing_method',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 15,
      naming_rationale: 'Shipping calculation method - descriptive terminology',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'flat-rate-shipping',
    canonical_name: 'Flat Rate Shipping',
    hierarchy_level: 'feature',
    parent_id: 'shipping-tools',
    translations: {
      US: 'Flat Rate Shipping',
      UK: 'Flat Rate Postage',
      DE: 'Pauschalversand',
      FR: 'Frais de port fixes',
      IT: 'Spedizione a tariffa fissa',
      CA: 'Flat Rate Shipping',
      AU: 'Flat Rate Postage'
    },
    categories: ['shipping', 'pricing'],
    business_context: {
      user_interaction: 'passive',
      enrollment: 'no',
      product_vs_feature: 'pricing_method',
      lifespan: 'permanent',
      strategic_value: 'none'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 10,
      naming_rationale: 'Standard shipping pricing method',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'free-shipping',
    canonical_name: 'Free Shipping',
    hierarchy_level: 'feature',
    parent_id: 'shipping-tools',
    translations: {
      US: 'Free Shipping',
      UK: 'Free Postage',
      DE: 'Kostenloser Versand',
      FR: 'Livraison gratuite',
      IT: 'Spedizione gratuita',
      CA: 'Free Shipping',
      AU: 'Free Postage'
    },
    categories: ['shipping', 'pricing', 'buyer-incentive'],
    business_context: {
      user_interaction: 'passive',
      enrollment: 'no',
      product_vs_feature: 'pricing_option',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 20,
      naming_rationale: 'Shipping pricing option - descriptive label clearly conveys value to buyers',
      confidence_level: 'absolute'
    }
  },

  // === IMMEDIATE PAYMENT ===
  {
    id: 'immediate-payment-required',
    canonical_name: 'Immediate Payment Required',
    hierarchy_level: 'feature',
    parent_id: 'listing-options',
    translations: {
      US: 'Immediate Payment Required',
      UK: 'Immediate Payment Required',
      DE: 'Sofortige Zahlung erforderlich',
      FR: 'Paiement immédiat requis',
      IT: 'Pagamento immediato richiesto',
      CA: 'Immediate Payment Required',
      AU: 'Immediate Payment Required'
    },
    categories: ['payment', 'listing-options', 'seller-tools'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'listing_option',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 25,
      naming_rationale: 'Listing requirement option - descriptive terminology clearly communicates seller requirement',
      confidence_level: 'high'
    }
  },

  // === ADDITIONAL PRICING-RELATED FEATURES ===
  {
    id: 'make-offer',
    canonical_name: 'Make Offer',
    hierarchy_level: 'feature',
    parent_id: 'offer-features',
    translations: {
      US: 'Make Offer',
      UK: 'Make Offer',
      DE: 'Preisvorschlag senden',
      FR: 'Faire une offre',
      IT: 'Fai una proposta',
      CA: 'Make Offer',
      AU: 'Make offer'
    },
    categories: ['offers', 'pricing', 'negotiation'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'buyer_feature',
      lifespan: 'permanent',
      strategic_value: 'medium'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 40,
      naming_rationale: 'Core negotiation feature with multi-market presence and strategic value for GMV',
      confidence_level: 'high'
    }
  },
  {
    id: 'offers-to-watchers',
    canonical_name: 'Offers to Watchers',
    hierarchy_level: 'feature',
    parent_id: 'offer-features',
    translations: {
      US: 'Offers to Watchers',
      UK: 'Offers to Watchers',
      DE: 'Angebote an Beobachter',
      FR: 'Offres aux observateurs',
      IT: 'Offerte agli osservatori',
      CA: 'Offers to Watchers',
      AU: 'Offers to Watchers'
    },
    categories: ['offers', 'pricing', 'marketing'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'seller_tool',
      lifespan: 'permanent',
      strategic_value: 'medium'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 45,
      naming_rationale: 'Seller marketing tool with clear value proposition and multi-market deployment',
      confidence_level: 'high'
    }
  },
  {
    id: 'private-offers',
    canonical_name: 'Private Offers',
    hierarchy_level: 'feature',
    parent_id: 'offer-features',
    translations: {
      US: 'Private Offers',
      UK: 'Private Offers',
      DE: 'Private Angebote',
      FR: 'Offres privées',
      IT: 'Offerte private',
      CA: 'Private Offers',
      AU: 'Private Offers'
    },
    categories: ['offers', 'pricing', 'seller-tools'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'seller_tool',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 35,
      naming_rationale: 'Seller negotiation tool - descriptive label conveys privacy aspect',
      confidence_level: 'high'
    }
  },
  {
    id: 'seller-initiated-offers',
    canonical_name: 'Seller Initiated Offers',
    hierarchy_level: 'feature',
    parent_id: 'offer-features',
    translations: {
      US: 'Seller Initiated Offers',
      UK: 'Offers to Buyers',
      DE: 'Preisvorschläge an Käufer',
      FR: 'Envoyer une offre',
      IT: 'Proposta agli acquirenti',
      CA: 'Offers to Buyers',
      AU: 'Offers to Buyers'
    },
    categories: ['offers', 'pricing', 'seller-tools'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'seller_tool',
      lifespan: 'permanent',
      strategic_value: 'medium'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 40,
      naming_rationale: 'Proactive seller pricing tool with multi-market presence',
      confidence_level: 'high'
    }
  },
  {
    id: 'counteroffer',
    canonical_name: 'Counteroffer',
    hierarchy_level: 'feature',
    parent_id: 'offer-features',
    translations: {
      US: 'Counteroffer',
      UK: 'Counteroffer',
      DE: 'Gegenangebot',
      FR: 'Contre-offre',
      IT: 'Controfferta',
      CA: 'Counteroffer',
      AU: 'Counteroffer'
    },
    categories: ['offers', 'negotiation', 'pricing'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'negotiation_action',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 20,
      naming_rationale: 'Negotiation mechanic - standard terminology',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'accept-offer',
    canonical_name: 'Accept Offer',
    hierarchy_level: 'feature',
    parent_id: 'offer-features',
    translations: {
      US: 'Accept Offer',
      UK: 'Accept Offer',
      DE: 'Angebot annehmen',
      FR: 'Accepter l\'offre',
      IT: 'Accetta offerta',
      CA: 'Accept Offer',
      AU: 'Accept Offer'
    },
    categories: ['offers', 'actions'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'action',
      lifespan: 'permanent',
      strategic_value: 'none'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_INLINE_COPY',
      naming_score: 5,
      naming_rationale: 'Action button - inline copy',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'decline-offer',
    canonical_name: 'Decline Offer',
    hierarchy_level: 'feature',
    parent_id: 'offer-features',
    translations: {
      US: 'Decline Offer',
      UK: 'Decline Offer',
      DE: 'Angebot ablehnen',
      FR: 'Refuser l\'offre',
      IT: 'Rifiuta offerta',
      CA: 'Decline Offer',
      AU: 'Decline Offer'
    },
    categories: ['offers', 'actions'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'action',
      lifespan: 'permanent',
      strategic_value: 'none'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_INLINE_COPY',
      naming_score: 5,
      naming_rationale: 'Action button - inline copy',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'second-chance-offer',
    canonical_name: 'Second Chance Offer',
    hierarchy_level: 'feature',
    parent_id: 'offer-features',
    translations: {
      US: 'Second Chance Offer',
      UK: 'Second Chance Offer',
      DE: 'Zweite-Chance-Angebot',
      FR: 'Seconde chance',
      IT: 'Offerta seconda opportunità',
      CA: 'Second Chance Offer',
      AU: 'Second Chance Offer'
    },
    categories: ['offers', 'auction', 'pricing'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'seller_feature',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 30,
      naming_rationale: 'Post-auction pricing feature - descriptive label clearly conveys second opportunity',
      confidence_level: 'high'
    }
  },

  // === COUPONS & PROMOTIONAL CODES ===
  {
    id: 'codeless-coupons',
    canonical_name: 'Codeless Coupons',
    hierarchy_level: 'feature',
    parent_id: 'marketing-tools',
    translations: {
      US: 'Codeless Coupons',
      UK: 'Codeless Coupons',
      DE: 'Codelose Gutscheine',
      FR: 'Coupons sans code',
      IT: 'Coupon senza codice',
      CA: 'Codeless Coupons',
      AU: 'Codeless Coupons'
    },
    categories: ['marketing', 'discounts', 'pricing'],
    business_context: {
      user_interaction: 'passive',
      enrollment: 'no',
      product_vs_feature: 'discount_mechanism',
      lifespan: 'permanent',
      strategic_value: 'medium'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 45,
      naming_rationale: 'Automated coupon feature with multi-market deployment - descriptive name differentiates from coded version',
      confidence_level: 'high'
    }
  },
  {
    id: 'promotional-codes',
    canonical_name: 'Promotional Codes',
    hierarchy_level: 'feature',
    parent_id: 'marketing-tools',
    translations: {
      US: 'Promotional Codes',
      UK: 'Promotional Codes',
      DE: 'Aktionscodes',
      FR: 'Codes promotionnels',
      IT: 'Codici promozionali',
      CA: 'Promotional Codes',
      AU: 'Promotional Codes'
    },
    categories: ['marketing', 'discounts', 'pricing'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'discount_mechanism',
      lifespan: 'permanent',
      strategic_value: 'medium'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 40,
      naming_rationale: 'Standard e-commerce discount mechanism with multi-market presence',
      confidence_level: 'high'
    }
  },
  {
    id: 'coded-coupons',
    canonical_name: 'Coded Coupons',
    hierarchy_level: 'feature',
    parent_id: 'marketing-tools',
    translations: {
      US: 'Coded Coupons',
      UK: 'Coded Coupons',
      DE: 'Gutscheincodes',
      FR: 'Bons de réduction avec code',
      IT: 'Codici sconto',
      CA: 'Coded Coupons',
      AU: 'Coded Coupons'
    },
    categories: ['marketing', 'discounts', 'pricing'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'discount_mechanism',
      lifespan: 'permanent',
      strategic_value: 'medium'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 40,
      naming_rationale: 'Seller coupon tool with code requirement - descriptive differentiation from codeless version',
      confidence_level: 'high'
    }
  },
  {
    id: 'send-coupon',
    canonical_name: 'Send Coupon',
    hierarchy_level: 'feature',
    parent_id: 'marketing-tools',
    translations: {
      US: 'Send Coupon',
      UK: 'Send Coupon',
      DE: 'Gutschein senden',
      FR: 'Envoyer un code promo',
      IT: 'Invia codice sconto',
      CA: 'Send Coupon',
      AU: 'Send Coupon'
    },
    categories: ['marketing', 'discounts', 'seller-actions'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'seller_action',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 25,
      naming_rationale: 'Seller marketing action - descriptive label',
      confidence_level: 'high'
    }
  },
  {
    id: 'print-coupons',
    canonical_name: 'Print Coupons',
    hierarchy_level: 'feature',
    parent_id: 'marketing-tools',
    translations: {
      US: 'Print Coupons',
      UK: 'Print Coupons',
      DE: 'Gutschein drucken',
      FR: 'Imprimer code promo',
      IT: 'Stampa codice sconto',
      CA: 'Print Coupons',
      AU: 'Print Coupons'
    },
    categories: ['marketing', 'discounts', 'seller-tools'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'seller_action',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 20,
      naming_rationale: 'Coupon management action - descriptive label',
      confidence_level: 'high'
    }
  },
  {
    id: 'promo-code',
    canonical_name: 'Promo Code',
    hierarchy_level: 'feature',
    parent_id: 'marketing-tools',
    translations: {
      US: 'Promo Code',
      UK: 'Promo Code',
      DE: 'Promo-Code',
      FR: 'Code promo',
      IT: 'Codice promozionale',
      CA: 'Promo Code',
      AU: 'Promo Code'
    },
    categories: ['marketing', 'discounts'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'discount_type',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 15,
      naming_rationale: 'Generic discount code terminology',
      confidence_level: 'absolute'
    }
  },
  {
    id: 'coded-coupon',
    canonical_name: 'Coded Coupon',
    hierarchy_level: 'feature',
    parent_id: 'marketing-tools',
    translations: {
      US: 'Coded Coupon',
      UK: 'Coded Coupon',
      DE: 'Code-Coupon',
      FR: 'Coupon avec code',
      IT: 'Coupon con codice',
      CA: 'Coded Coupon',
      AU: 'Coded Coupon'
    },
    categories: ['marketing', 'discounts'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'discount_type',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 20,
      naming_rationale: 'Coupon variant - descriptive differentiation',
      confidence_level: 'high'
    }
  },
  {
    id: 'public-coupon',
    canonical_name: 'Public Coupon',
    hierarchy_level: 'feature',
    parent_id: 'marketing-tools',
    translations: {
      US: 'Public Coupon',
      UK: 'Public Coupon',
      DE: 'Öffentlicher Coupon',
      FR: 'Coupon public',
      IT: 'Coupon pubblico',
      CA: 'Public Coupon',
      AU: 'Public Coupon'
    },
    categories: ['marketing', 'discounts'],
    business_context: {
      user_interaction: 'passive',
      enrollment: 'no',
      product_vs_feature: 'coupon_visibility_type',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 20,
      naming_rationale: 'Coupon visibility classification - descriptive label',
      confidence_level: 'high'
    }
  },
  {
    id: 'private-coupon',
    canonical_name: 'Private Coupon',
    hierarchy_level: 'feature',
    parent_id: 'marketing-tools',
    translations: {
      US: 'Private Coupon',
      UK: 'Private Coupon',
      DE: 'Privater Coupon',
      FR: 'Coupon privé',
      IT: 'Coupon privato',
      CA: 'Private Coupon',
      AU: 'Private Coupon'
    },
    categories: ['marketing', 'discounts'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'coupon_visibility_type',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 20,
      naming_rationale: 'Targeted coupon type - descriptive label indicates privacy',
      confidence_level: 'high'
    }
  },

  // === MARKDOWN & SALE EVENTS ===
  {
    id: 'markdown-manager',
    canonical_name: 'Markdown Manager',
    hierarchy_level: 'feature',
    parent_id: 'pricing-tools',
    translations: {
      US: 'Markdown Manager',
      UK: 'Markdown Manager',
      CA: 'Markdown Manager',
      AU: 'Markdown Manager'
    },
    categories: ['pricing', 'discounts', 'seller-tools'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'pricing_tool',
      lifespan: 'permanent',
      strategic_value: 'medium'
    },
    product_naming_analysis: {
      naming_verdict: 'PROCEED_WITH_NAMING',
      naming_score: 55,
      naming_rationale: 'Seller pricing management tool with multi-market deployment, active seller interaction, permanent offering',
      confidence_level: 'medium'
    }
  },
  {
    id: 'sale-event',
    canonical_name: 'Sale Event',
    hierarchy_level: 'feature',
    parent_id: 'marketing-tools',
    translations: {
      US: 'Sale Event',
      UK: 'Sale Event',
      DE: 'Verkaufsaktion',
      FR: 'Événement de vente',
      IT: 'Evento promozionale',
      CA: 'Sale Event',
      AU: 'Sale Event'
    },
    categories: ['marketing', 'pricing', 'events'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'marketing_tool',
      lifespan: 'permanent',
      strategic_value: 'medium'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 40,
      naming_rationale: 'Seller promotional tool with multi-market presence - descriptive label conveys time-limited nature',
      confidence_level: 'high'
    }
  },

  // === BUSINESS POLICIES ===
  {
    id: 'payment-policy',
    canonical_name: 'Payment Policy',
    hierarchy_level: 'feature',
    parent_id: 'business-policies',
    translations: {
      US: 'Payment Policy',
      UK: 'Payment Policy',
      DE: 'Zahlungsrichtlinie',
      FR: 'Politique de paiement',
      IT: 'Politica di pagamento',
      CA: 'Payment Policy',
      AU: 'Payment Policy'
    },
    categories: ['policies', 'payment', 'seller-tools'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'policy_template',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 15,
      naming_rationale: 'Seller policy template - descriptive label',
      confidence_level: 'high'
    }
  },
  {
    id: 'shipping-policy',
    canonical_name: 'Shipping Policy',
    hierarchy_level: 'feature',
    parent_id: 'business-policies',
    translations: {
      US: 'Shipping Policy',
      UK: 'Postage Policy',
      DE: 'Versandrichtlinie',
      FR: 'Politique d\'expédition',
      IT: 'Politica di spedizione',
      CA: 'Shipping Policy',
      AU: 'Shipping Policy'
    },
    categories: ['policies', 'shipping', 'seller-tools'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'policy_template',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 15,
      naming_rationale: 'Seller policy template - descriptive label',
      confidence_level: 'high'
    }
  },
  {
    id: 'return-policy',
    canonical_name: 'Return Policy',
    hierarchy_level: 'feature',
    parent_id: 'business-policies',
    translations: {
      US: 'Return Policy',
      UK: 'Return Policy',
      DE: 'Rückgaberichtlinie',
      FR: 'Politique de retour',
      IT: 'Politica di reso',
      CA: 'Return Policy',
      AU: 'Return Policy'
    },
    categories: ['policies', 'returns', 'seller-tools'],
    business_context: {
      user_interaction: 'active',
      enrollment: 'no',
      product_vs_feature: 'policy_template',
      lifespan: 'permanent',
      strategic_value: 'low'
    },
    product_naming_analysis: {
      naming_verdict: 'USE_DESCRIPTIVE_LABEL',
      naming_score: 15,
      naming_rationale: 'Seller policy template - descriptive label',
      confidence_level: 'high'
    }
  }
];

// SUMMARY STATISTICS
// Total programs: 110
// Programs with PROCEED_WITH_NAMING verdict: 4
// Programs with USE_DESCRIPTIVE_LABEL verdict: 85
// Programs with USE_INLINE_COPY verdict: 11
// Programs with EXTERNAL_BRAND verdict: 6
// Programs with LEGAL_TERMINOLOGY verdict: 4
//
// Coverage: Payment methods (8), Checkout (4), Seller fees (8), Pricing tools (12),
// Tax & compliance (6), Invoicing (3), Currency (2), Refunds (4), Shipping costs (6),
// Offer negotiation (10), Coupons (13), Discounts (5), Business policies (3), Payment programs (3),
// Additional pricing features (23)
//
// Markets covered: US, UK, DE, FR, IT, CA, AU
// Focus areas: Pricing, payment methods, currency, checkout, invoicing, billing, fees, tax
