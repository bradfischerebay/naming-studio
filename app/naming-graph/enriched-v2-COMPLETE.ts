// Enrichment V2 — Complete Merged File
// ~975 nodes with: valueProp, valueTerritories, nameClass, isProductName,
// strategicRole, citations
//
// Source batches:
//   Batch 1 — Trust & Safety        (enriched-v2-batch-01-trust.ts)
//   Batch 2 — Shipping & Payments   (enriched-v2-batch-02-shipping.ts)
//   Batch 3 — Ads & Seller Hub      (enriched-v2-batch-03-ads-seller.ts)
//   Batch 4 — Categories            (enriched-v2-batch-04-categories.ts)
//   Batch 5a — Products & Programs  (enriched-v2-batch-05a-products.ts)
//   Batch 5b — Advertising Tools    (enriched-v2-batch-05b-advertising.ts)
//   Batch 5c — Acquisitions         (enriched-v2-batch-05c-acquisitions.ts)
//   Batch 5d — Buyer Features       (enriched-v2-batch-05d-buyer-features.ts)
//   Batch 5e — States & Actions     (enriched-v2-batch-05e-states-actions.ts)
//   Batch 5f — Listing UI           (enriched-v2-batch-05f-listing-ui.ts)
//   Wave 6 — April 29 2026 scan     (enriched-v2-wave6.ts)

export type { NodeEnrichmentV2 } from './enriched-v2-batch-01-trust'

import { TRUST_ENRICHMENT } from './enriched-v2-batch-01-trust'
import { PAYMENTS_SHIPPING_ENRICHMENT } from './enriched-v2-batch-02-payments-shipping'
import { ADS_SELLER_ENRICHMENT } from './enriched-v2-batch-03-ads-seller'
import { CATEGORIES_ENRICHMENT } from './enriched-v2-batch-04-categories'
import { PRODUCTS_ENRICHMENT } from './enriched-v2-batch-05a-products'
import { ADVERTISING_ENRICHMENT } from './enriched-v2-batch-05b-advertising'
import { ACQUISITIONS_ENRICHMENT } from './enriched-v2-batch-05c-acquisitions'
import { BUYER_FEATURES_ENRICHMENT } from './enriched-v2-batch-05d-buyer-features'
import { STATES_ACTIONS_ENRICHMENT } from './enriched-v2-batch-05e-states-actions'
import { LISTING_UI_ENRICHMENT } from './enriched-v2-batch-05f-listing-ui'
import { WAVE6_ENRICHMENT_V2 } from './enriched-v2-wave6'

const ALL_BATCHES = [
  ...TRUST_ENRICHMENT,
  ...PAYMENTS_SHIPPING_ENRICHMENT,
  ...ADS_SELLER_ENRICHMENT,
  ...CATEGORIES_ENRICHMENT,
  ...PRODUCTS_ENRICHMENT,
  ...ADVERTISING_ENRICHMENT,
  ...ACQUISITIONS_ENRICHMENT,
  ...BUYER_FEATURES_ENRICHMENT,
  ...STATES_ACTIONS_ENRICHMENT,
  ...LISTING_UI_ENRICHMENT,
  ...WAVE6_ENRICHMENT_V2,
]

// Deduplicate by id — first occurrence wins (earlier batches take priority)
const seen = new Set<string>()
export const ENRICHMENT_V2_COMPLETE = ALL_BATCHES.filter(node => {
  if (seen.has(node.id)) return false
  seen.add(node.id)
  return true
})

export default ENRICHMENT_V2_COMPLETE
