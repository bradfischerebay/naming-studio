#!/usr/bin/env tsx
/**
 * export-graph-sample.ts
 * Writes a compact sample JSON (~20 nodes, ~40 links) for pasting into v0.dev.
 * Shows the full schema with varied relationship types.
 */

import * as fs from 'fs'
import * as path from 'path'
import { ENRICHED_PROGRAMS, generateLinks } from '../lib/enriched-naming-data'

// Pick a small illustrative slice: ebay masterbrand + authenticity-guarantee cluster + a legacy node
const SAMPLE_IDS = new Set([
  'ebay', 'seller-hub', 'managed-payments', 'authenticity-guarantee',
  'promoted-listings', 'ebay-money-back-guarantee', 'ebay-international-shipping',
  'authenticity-guarantee-sneakers', 'authenticity-guarantee-watches',
  'authenticity-guarantee-handbags', 'authenticity-guarantee-trading-cards',
  'paypal', 'ebay-stores', 'top-rated-seller', 'ebay-advertising',
  'promoted-listings-general', 'promoted-listings-priority', 'promoted-listings-express',
  'ebay-vault', 'payments',
])

const sampleNodes = ENRICHED_PROGRAMS
  .filter(n => SAMPLE_IDS.has(n.id))
  .map(n => ({
    id: n.id,
    name: n.name,
    type: n.type,
    tier: n.tier,
    status: n.status,
    parent: n.parent,
    market: n.market,
    year: n.year,
    desc: n.desc,
    namingTreatment: (n as any).namingTreatment,
    countsAsManagedName: (n as any).countsAsManagedName,
    relationshipCount: n.relationships?.length ?? 0,
  }))

const allLinks = generateLinks(ENRICHED_PROGRAMS)
const sampleLinks = allLinks.filter(l => SAMPLE_IDS.has(l.source) && SAMPLE_IDS.has(l.target))

const sample = { nodes: sampleNodes, links: sampleLinks }
const outPath = path.join(process.cwd(), 'public', 'naming-graph-sample.json')
fs.writeFileSync(outPath, JSON.stringify(sample, null, 2))

const sizeKB = Math.round(fs.statSync(outPath).size / 1024)
console.log(`Sample written: ${outPath} (${sizeKB} KB)`)
console.log(`${sampleNodes.length} nodes, ${sampleLinks.length} links`)
console.log('Link types:', [...new Set(sampleLinks.map(l => l.type))].join(', '))
