"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Moon, Sun, Globe } from 'lucide-react';
import * as d3 from 'd3';
import {
  ENRICHED_PROGRAMS,
  NODE_COLORS,
  getNodeColor,
  getNodeSize,
  generateLinks,
  getGraphStats,
  filterByMarket,
  getTranslatedName,
  type GraphNode,
} from '@/app/naming-graph/naming-data';
import evidenceData from '@/lib/node-evidence.json';

const evidenceLookup = new Map<string, any>();
(evidenceData as any[]).forEach((e: any) => {
  evidenceLookup.set(e.node_id, e);
});

const MARKETS = [
  { id: 'global', label: 'Global', flag: '🌐', color: '#0064d2' },
  { id: 'US', label: 'United States', flag: '🇺🇸', color: '#0064d2' },
  { id: 'UK', label: 'United Kingdom', flag: '🇬🇧', color: '#e53238' },
  { id: 'DE', label: 'Germany', flag: '🇩🇪', color: '#000000' },
  { id: 'FR', label: 'France', flag: '🇫🇷', color: '#0055a4' },
  { id: 'IT', label: 'Italy', flag: '🇮🇹', color: '#009246' },
  { id: 'AU', label: 'Australia', flag: '🇦🇺', color: '#00008b' },
  { id: 'CA', label: 'Canada', flag: '🇨🇦', color: '#ff0000' },
];

const FORCE_PRESETS = {
  A: {
    name: 'Weighted Sectors',
    desc: 'Chord-based sectors: each umbrella gets arc width proportional to its sub-umbrella chord load',
    link: { master: 320, umbrella: 140, subUmbrella: 110, t1: 90, t2: 110, t3: 130, strength: 0.06, show: true },
    charge: { master: -4000, umbrella: -1200, subUmbrella: -600, t1: -180, t2: -120, t3: -70 },
    collision: { padding: 40, strength: 1.0 },
    radial: {
      umbrellaRadius: 200,
      subUmbrellaRadius: 400,
      t1Offset: 110,
      t2Offset: 220,
      t3Offset: 340,
      umbrellaStrength: 1.0,
      subUmbrellaStrength: 0.98,
      t1Strength: 0.22,
      t2Strength: 0.14,
      t3Strength: 0.08,
    },
    sector: { spread: 0.5, minDist: 70, maxDist: 400 },
    sizeByChildren: false,
  },
  B: {
    name: 'Clustered',
    desc: 'Tighter rings with children clustering near parents',
    link: { master: 250, umbrella: 100, subUmbrella: 80, t1: 60, t2: 80, t3: 100, strength: 0.12, show: true },
    charge: { master: -3000, umbrella: -500, subUmbrella: -200, t1: -80, t2: -60, t3: -40 },
    collision: { padding: 16, strength: 1.0 },
    radial: {
      umbrellaRadius: 180,
      subUmbrellaRadius: 360,
      t1Offset: 90,
      t2Offset: 170,
      t3Offset: 260,
      umbrellaStrength: 1.0,
      subUmbrellaStrength: 0.98,
      t1Strength: 0.35,
      t2Strength: 0.25,
      t3Strength: 0.15,
    },
    sector: { spread: 0.35, minDist: 50, maxDist: 250 },
    sizeByChildren: false,
  },
  C: {
    name: 'No Overlap',
    desc: 'Maximum spacing with clear concentric rings',
    link: { master: 500, umbrella: 250, subUmbrella: 200, t1: 160, t2: 180, t3: 200, strength: 0.02, show: true },
    charge: { master: -8000, umbrella: -2000, subUmbrella: -800, t1: -400, t2: -300, t3: -200 },
    collision: { padding: 50, strength: 1.0 },
    radial: {
      umbrellaRadius: 300,
      subUmbrellaRadius: 580,
      t1Offset: 160,
      t2Offset: 320,
      t3Offset: 500,
      umbrellaStrength: 1.0,
      subUmbrellaStrength: 0.98,
      t1Strength: 0.1,
      t2Strength: 0.07,
      t3Strength: 0.04,
    },
    sector: { spread: 0.7, minDist: 180, maxDist: 650 },
    sizeByChildren: false,
  },
  D: {
    name: 'Bubble Pack',
    desc: 'Ball size = programs underneath, concentric ring layout',
    link: { master: 200, umbrella: 100, subUmbrella: 80, t1: 60, t2: 70, t3: 80, strength: 0.1, show: true },
    charge: { master: -5000, umbrella: -1500, subUmbrella: -500, t1: -200, t2: -120, t3: -70 },
    collision: { padding: 10, strength: 1.0 },
    radial: {
      umbrellaRadius: 220,
      subUmbrellaRadius: 430,
      t1Offset: 110,
      t2Offset: 210,
      t3Offset: 320,
      umbrellaStrength: 1.0,
      subUmbrellaStrength: 0.98,
      t1Strength: 0.25,
      t2Strength: 0.18,
      t3Strength: 0.12,
    },
    sector: { spread: 0.5, minDist: 80, maxDist: 300 },
    sizeByChildren: true,
  },
};

export default function NamingGraph2Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const timelineIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const simulationRef = useRef<any>(null);
  const retryTimeoutRef = useRef<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterTier, setFilterTier] = useState('all');
  const [selectedMarket, setSelectedMarket] = useState('global');
  const [filterStatus, setFilterStatus] = useState('current');
  const [showFilteredAsGray, setShowFilteredAsGray] = useState(true);
  const [showTooltips, setShowTooltips] = useState(true);
  const [collisionCheck, setCollisionCheck] = useState('');
  const [collisionResults, setCollisionResults] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [forcePreset, setForcePreset] = useState<keyof typeof FORCE_PRESETS>('A');
  const [excludeTiers, setExcludeTiers] = useState<string[]>([]);
  const [excludeMarkets, setExcludeMarkets] = useState<string[]>([]);
  const [excludeTypes, setExcludeTypes] = useState<string[]>([]);

  const theme = {
    bg: darkMode ? '#0f0f0f' : '#ffffff',
    bgSecondary: darkMode ? '#1a1a1a' : '#f8f9fa',
    bgTertiary: darkMode ? '#252525' : '#f0f1f3',
    bgCard: darkMode ? '#1a1a1a' : '#ffffff',
    textPrimary: darkMode ? '#f0f0f0' : '#111820',
    textSecondary: darkMode ? '#aaaaaa' : '#555555',
    textMuted: darkMode ? '#666666' : '#888888',
    border: darkMode ? '#333333' : '#e0e0e0',
    canvasBg: darkMode ? '#0f0f0f' : '#f8f9fa',
    linkColor: darkMode ? '#666666' : '#cccccc',
    labelColor: darkMode ? '#ffffff' : '#111820',
  };

  useEffect(() => { setIsClient(true); }, []);

  useEffect(() => {
    if (!isClient) return;
    d3.selectAll('.graph-label').attr('fill', darkMode ? '#ffffff' : '#333333');
    d3.selectAll('.graph-link').attr('stroke', '#000000');
  }, [darkMode, isClient]);

  useEffect(() => {
    (window as any)._showTooltips = showTooltips;
  }, [showTooltips]);

  useEffect(() => {
    (window as any).setExclusions?.({ excludeTiers, excludeMarkets, excludeTypes });
  }, [excludeTiers, excludeMarkets, excludeTypes]);

  useEffect(() => {
    if (!isClient || !containerRef.current) return;
    initGraph();
    return () => {
      if (retryTimeoutRef.current) { clearTimeout(retryTimeoutRef.current); retryTimeoutRef.current = null; }
      if (simulationRef.current) { simulationRef.current.stop(); simulationRef.current = null; }
      if (timelineIntervalRef.current) clearInterval(timelineIntervalRef.current);
      d3.selectAll('.graph-tooltip').remove();
      ['resetView','replayAnimation','togglePlayPause','jumpToYear','searchNodes','filterByType',
       'filterByStatus','togglePmmMode','resetFilters','checkCollision','exportData','exportImage',
       'switchMarket','filterByMarket','filterByTier','setExclusions'].forEach(k => delete (window as any)[k]);
      if (containerRef.current) d3.select(containerRef.current).selectAll('*').remove();
    };
  }, [isClient, forcePreset, filterStatus]);

  const initGraph = () => {
    const container = containerRef.current;
    if (!container) return;
    d3.selectAll('.graph-tooltip').remove();
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) { retryTimeoutRef.current = setTimeout(initGraph, 100); return; }

    d3.select(container).selectAll('*').remove();
    const svg = d3.select(container).append('svg').attr('width', width).attr('height', height).style('overflow', 'hidden');
    const g = svg.append('g');

    const centerX = width / 2;
    const centerY = height / 2;
    let currentMarket = 'global';
    const preset = FORCE_PRESETS[forcePreset];

    const createNodesData = (market: string) => {
      const filtered = filterByMarket(ENRICHED_PROGRAMS, market);
      return filtered.map((node: GraphNode) => ({
        id: node.id,
        name: getTranslatedName(node, market),
        originalName: node.name,
        type: node.type,
        tier: node.tier,
        status: node.status,
        parent: node.parent,
        desc: node.desc,
        market: node.market || 'global',
        renamedFrom: (node as any).renamedFrom,
        renamedTo: (node as any).renamedTo,
        color: getNodeColor(node),
        size: getNodeSize(node) * (
          node.tier === 'master' ? 1.5 :
          node.tier === 'umbrella' ? 1.3 :
          node.tier === 'sub-umbrella' ? 0.9 : 0.7
        ),
        year: node.year || 2020,
        translations: (node as any).translations,
      }));
    };

    let nodesData = createNodesData(currentMarket);
    if (filterStatus !== 'all') nodesData = nodesData.filter((n: any) => n.status === filterStatus);

    const countDescendants = (nodeId: string, allNodes: any[], visited = new Set<string>()): number => {
      if (visited.has(nodeId)) return 0;
      visited.add(nodeId);
      const children = allNodes.filter((n: any) => n.parent === nodeId && n.id !== nodeId);
      let count = children.length;
      children.forEach((c: any) => { count += countDescendants(c.id, allNodes, visited); });
      return count;
    };
    nodesData.forEach((node: any) => { node.childCount = countDescendants(node.id, nodesData); });

    if (preset.sizeByChildren) {
      const maxChildren = Math.max(...nodesData.map((n: any) => n.childCount || 0), 1);
      nodesData.forEach((node: any) => {
        const f = Math.sqrt((node.childCount || 0) / maxChildren);
        if (node.tier === 'master') node.size = 60 + f * 40;
        else if (node.tier === 'umbrella' || node.tier === 'sub-umbrella') node.size = 25 + f * 35;
        else if (node.tier === 't1') node.size = 12 + f * 20;
        else node.size = 6 + f * 10;
      });
    }

    let linksData = generateLinks(ENRICHED_PROGRAMS as GraphNode[])
      .map((l: any) => ({ source: l.source, target: l.target }))
      .filter((l: any) => nodesData.some((n: any) => n.id === l.source) && nodesData.some((n: any) => n.id === l.target));

    const nodeMap = new Map(nodesData.map((n: any) => [n.id, n]));

    const findUmbrellaAncestor = (node: any): string | null => {
      let current = node;
      let depth = 0;
      while (current?.parent && depth < 10) {
        const parent = nodeMap.get(current.parent);
        if (!parent) break;
        if ((parent as any).tier === 'umbrella') return (parent as any).id;
        current = parent;
        depth++;
      }
      return null;
    };

    const findNearestRingAncestor = (node: any): any => {
      let current = node;
      let depth = 0;
      while (current?.parent && depth < 10) {
        const parent = nodeMap.get(current.parent);
        if (!parent) break;
        if ((parent as any).tier === 'sub-umbrella' || (parent as any).tier === 'umbrella') return parent;
        current = parent;
        depth++;
      }
      return null;
    };

    const masterbrand = nodesData.find((n: any) => n.id === 'ebay');
    if (masterbrand) {
      (masterbrand as any).x = centerX; (masterbrand as any).y = centerY;
      (masterbrand as any).fx = centerX; (masterbrand as any).fy = centerY;
      (masterbrand as any)._canonicalX = centerX; (masterbrand as any)._canonicalY = centerY;
    }

    const umbrellaNodes = nodesData.filter((n: any) => n.tier === 'umbrella');
    const maxUmbrellaSize = Math.max(...umbrellaNodes.map((n: any) => n.size || 40));
    const umbrellaSpacing = maxUmbrellaSize * 2 + 72;
    const minUmbrellaCircumference = umbrellaNodes.length * umbrellaSpacing;
    const actualUmbrellaRadius = Math.max(
      preset.radial.umbrellaRadius,
      minUmbrellaCircumference / (2 * Math.PI)
    );

    const subUmbrellaNodes = nodesData.filter((n: any) => n.tier === 'sub-umbrella');
    const subsByParent = new Map<string, any[]>();
    subUmbrellaNodes.forEach((node: any) => {
      const umbrellaId = findUmbrellaAncestor(node);
      if (!umbrellaId) return;
      if (!subsByParent.has(umbrellaId)) subsByParent.set(umbrellaId, []);
      subsByParent.get(umbrellaId)!.push(node);
    });
    for (const subs of subsByParent.values()) {
      subs.sort((a: any, b: any) => a.name.localeCompare(b.name));
    }

    const maxSubUmbrellaSize = subUmbrellaNodes.length > 0
      ? Math.max(...subUmbrellaNodes.map((n: any) => n.size || 25))
      : 25;
    const subChord = maxSubUmbrellaSize * 2 + 52;
    const sectorPaddingAngle = 0.06;
    const sectorBaseWeight = 1.08;

    const sortedUmbrellas = [...umbrellaNodes].sort((a: any, b: any) =>
      (a.name as string).localeCompare(b.name)
    );

    const buildRequiredAngles = (radius: number): Map<string, number> => {
      const required = new Map<string, number>();
      for (const umbrella of sortedUmbrellas) {
        const count = subsByParent.get((umbrella as any).id)?.length || 0;
        const arcNeeded = count <= 1
          ? 0.18
          : ((count - 1) * subChord) / radius + sectorPaddingAngle;
        required.set((umbrella as any).id, Math.max(0.18, arcNeeded) * sectorBaseWeight);
      }
      return required;
    };

    const umbrellaLabelClearance = maxUmbrellaSize + 18 + 46;
    let subRadius = Math.max(
      preset.radial.subUmbrellaRadius,
      actualUmbrellaRadius + umbrellaLabelClearance
    );

    let requiredAngles = buildRequiredAngles(subRadius);
    let totalRequired = Array.from(requiredAngles.values()).reduce((a, b) => a + b, 0);
    let expansionGuard = 0;
    while (totalRequired > Math.PI * 2 * 0.96 && expansionGuard < 20) {
      subRadius *= 1.08;
      requiredAngles = buildRequiredAngles(subRadius);
      totalRequired = Array.from(requiredAngles.values()).reduce((a, b) => a + b, 0);
      expansionGuard++;
    }

    const actualSubUmbrellaRadius = subRadius;

    const sectorScale = (Math.PI * 2) / totalRequired;
    const umbrellaSectors = new Map<string, { startAngle: number; endAngle: number; centerAngle: number }>();
    let currentAngle = -Math.PI / 2;

    sortedUmbrellas.forEach((node: any) => {
      const widthAngle = (requiredAngles.get(node.id) || 0.18) * sectorScale;
      const startAngle = currentAngle;
      const endAngle = currentAngle + widthAngle;
      const centerAngle = startAngle + widthAngle / 2;

      umbrellaSectors.set(node.id, { startAngle, endAngle, centerAngle });

      const x = centerX + Math.cos(centerAngle) * actualUmbrellaRadius;
      const y = centerY + Math.sin(centerAngle) * actualUmbrellaRadius;
      node.x = x; node.y = y;
      node.fx = x; node.fy = y;
      node.angle = centerAngle;
      node._canonicalX = x; node._canonicalY = y;
      node._sectorStart = startAngle;
      node._sectorEnd = endAngle;
      node._sectorWidth = widthAngle;
      node._subCount = subsByParent.get(node.id)?.length || 0;

      currentAngle = endAngle;
    });

    const sectorMargin = 0.03;

    subsByParent.forEach((subs, parentId) => {
      const sector = umbrellaSectors.get(parentId);
      if (!sector) return;

      const centerAngle = sector.centerAngle;
      const usableStart = sector.startAngle + sectorMargin;
      const usableEnd = sector.endAngle - sectorMargin;
      const usableWidth = Math.max(0.05, usableEnd - usableStart);

      if (subs.length === 1) {
        const x = centerX + Math.cos(centerAngle) * actualSubUmbrellaRadius;
        const y = centerY + Math.sin(centerAngle) * actualSubUmbrellaRadius;
        subs[0].x = x; subs[0].y = y;
        subs[0].fx = x; subs[0].fy = y;
        subs[0].angle = centerAngle;
        subs[0]._parentUmbrellaAngle = centerAngle;
        subs[0]._canonicalX = x; subs[0]._canonicalY = y;
        subs[0]._localRadius = actualSubUmbrellaRadius;
        return;
      }

      const step = usableWidth / (subs.length - 1);
      subs.forEach((sub: any, i: number) => {
        const angle = usableStart + i * step;
        const x = centerX + Math.cos(angle) * actualSubUmbrellaRadius;
        const y = centerY + Math.sin(angle) * actualSubUmbrellaRadius;
        sub.x = x; sub.y = y;
        sub.fx = x; sub.fy = y;
        sub.angle = angle;
        sub._parentUmbrellaAngle = centerAngle;
        sub._canonicalX = x; sub._canonicalY = y;
        sub._localRadius = actualSubUmbrellaRadius;
      });
    });

    const descendantFloorRadius = actualSubUmbrellaRadius + 60;

    nodesData.forEach((node: any) => {
      if (node.tier === 'master' || node.tier === 'umbrella' || node.tier === 'sub-umbrella') return;
      const ancestor = findNearestRingAncestor(node);
      if (!ancestor?.angle) return;

      const umbrellaId = findUmbrellaAncestor(node);
      const sector = umbrellaId ? umbrellaSectors.get(umbrellaId) : null;
      const edgeMargin = 0.04;
      const randomAngle = sector
        ? sector.startAngle + edgeMargin + Math.random() * Math.max(0, sector.endAngle - sector.startAngle - 2 * edgeMargin)
        : ancestor.angle + (Math.random() - 0.5) * 0.5;
      const tierOffset = node.tier === 't1' ? preset.radial.t1Offset
        : node.tier === 't2' ? preset.radial.t2Offset
        : preset.radial.t3Offset;
      const distVariation = node.tier === 't1' ? 50 : node.tier === 't2' ? 80 : 120;
      const radius = descendantFloorRadius + tierOffset + Math.abs(Math.random() - 0.3) * distVariation;

      node.x = centerX + Math.cos(randomAngle) * radius;
      node.y = centerY + Math.sin(randomAngle) * radius;
      node._canonicalX = node.x;
      node._canonicalY = node.y;
    });

    const simulation = d3.forceSimulation(nodesData)
      .force('link', d3.forceLink(linksData).id((d: any) => d.id)
        .distance((d: any) => {
          if (d.source.tier === 'sub-umbrella') return preset.link.subUmbrella;
          if (d.source.tier === 't1') return preset.link.t1 * 1.2;
          if (d.source.tier === 't2') return preset.link.t2 * 1.3;
          return preset.link.t3 * 1.4;
        })
        .strength((d: any) => {
          if (d.target.tier === 't1' || d.target.tier === 't2' || d.target.tier === 't3') return preset.link.strength * 2;
          return preset.link.strength;
        })
      )
      .force('charge', d3.forceManyBody().strength((d: any) => {
        if (d.tier === 'master' || d.tier === 'umbrella' || d.tier === 'sub-umbrella') return 0;
        if (d.tier === 't1') return preset.charge.t1;
        if (d.tier === 't2') return preset.charge.t2;
        if (d.tier === 't3') return preset.charge.t3;
        return 0;
      }))
      .force('collision', d3.forceCollide()
        .radius((d: any) => d.size + preset.collision.padding)
        .strength(preset.collision.strength)
        .iterations(5)
      )
      .force('radial', d3.forceRadial((d: any) => {
        if (d.tier === 'master' || d.tier === 'umbrella' || d.tier === 'sub-umbrella') return 0;
        if (d.tier === 't1') return actualSubUmbrellaRadius + preset.radial.t1Offset * 0.7;
        if (d.tier === 't2') return actualSubUmbrellaRadius + preset.radial.t2Offset * 0.6;
        return actualSubUmbrellaRadius + preset.radial.t3Offset * 0.5;
      }, centerX, centerY).strength((d: any) => {
        if (d.tier === 'master' || d.tier === 'umbrella' || d.tier === 'sub-umbrella') return 0;
        if (d.tier === 't1') return 0.03;
        if (d.tier === 't2') return 0.02;
        return 0.01;
      }))
      .force('parentAngle', () => {
        const outwardStrength = 0.015;
        const minOuterRadius = actualSubUmbrellaRadius + 80;
        nodesData.forEach((node: any) => {
          if (node.tier === 't1' || node.tier === 't2' || node.tier === 't3') {
            let ancestor = node.parent ? nodesData.find((n: any) => n.id === node.parent) : null;
            while (ancestor && ancestor.angle === undefined && ancestor.parent) {
              ancestor = nodesData.find((n: any) => n.id === ancestor.parent);
            }
            if (ancestor && ancestor.angle !== undefined) {
              const angle = ancestor.angle;
              node.vx = (node.vx || 0) + Math.cos(angle) * outwardStrength;
              node.vy = (node.vy || 0) + Math.sin(angle) * outwardStrength;
              const dx = node.x - centerX;
              const dy = node.y - centerY;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < minOuterRadius && dist > 0) {
                const push = (minOuterRadius - dist) * 0.05;
                node.vx += (dx / dist) * push;
                node.vy += (dy / dist) * push;
              }
            }
          }
        });
      })
      .alphaDecay(0.02)
      .velocityDecay(0.5)
      .on('end', () => {
        nodesData.forEach((n: any) => { n.fx = n.x; n.fy = n.y; n._canonicalX = n.x; n._canonicalY = n.y; });
        simulation.stop();
      });
    simulationRef.current = simulation;

    const showLinks = preset.link.show !== false;
    const link = g.append('g')
      .selectAll('line')
      .data(showLinks ? linksData : [])
      .join('line')
      .attr('class', (d: any) => `graph-link graph-link-${(d.source as any).tier || 'default'}`)
      .attr('stroke', '#000000')
      .attr('stroke-opacity', 1)
      .attr('stroke-width', 0.5);

    const node = g.append('g')
      .selectAll('g')
      .data(nodesData)
      .join('g')
      .call(d3.drag()
        .filter((event: any) => event.target.tagName === 'circle')
        .on('start', (event: any, d: any) => {
          d._dragStartX = event.x; d._dragStartY = event.y; d._isDragging = false;
        })
        .on('drag', (event: any, d: any) => {
          const dx = event.x - d._dragStartX;
          const dy = event.y - d._dragStartY;
          if (!d._isDragging && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) d._isDragging = true;
          if (d._isDragging) {
            d.x = event.x; d.y = event.y; d.fx = event.x; d.fy = event.y;
            d3.select(event.sourceEvent.target.parentNode)
              .attr('transform', `translate(${event.x},${event.y})`);
            // Re-draw ALL link endpoints
            link
              .attr('x1', (l: any) => l.source.x)
              .attr('y1', (l: any) => l.source.y)
              .attr('x2', (l: any) => l.target.x)
              .attr('y2', (l: any) => l.target.y);
          }
        })
        .on('end', (event: any, d: any) => {
          d.fx = d.x; d.fy = d.y; d._isDragging = false;
        })
      );

    const tooltip = d3.select('body').append('div')
      .attr('class', 'graph-tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background', 'rgba(0,0,0,0.92)')
      .style('color', '#fff')
      .style('padding', '14px')
      .style('border-radius', '10px')
      .style('font-size', '12px')
      .style('max-width', '400px')
      .style('max-height', '500px')
      .style('overflow-y', 'auto')
      .style('z-index', '1000')
      .style('pointer-events', 'auto')
      .style('box-shadow', '0 4px 20px rgba(0,0,0,0.3)');

    let tooltipTimeout: any = null;

    const getChildrenByTier = (nodeId: string) => {
      const result = { t1: [] as any[], t2: [] as any[], t3: [] as any[] };
      const collect = (parentId: string) => {
        nodesData.forEach((n: any) => {
          if (n.parent === parentId) {
            if (n.tier === 't1') result.t1.push(n);
            else if (n.tier === 't2') result.t2.push(n);
            else result.t3.push(n);
            collect(n.id);
          }
        });
      };
      collect(nodeId);
      return result;
    };

    const showTooltipFn = (event: any, d: any) => {
      if (tooltipTimeout) clearTimeout(tooltipTimeout);
      const marketLabel = Array.isArray(d.market) ? d.market.join(', ') : d.market;
      const hasTranslation = d.originalName !== d.name;
      const children = getChildrenByTier(d.id);
      const totalChildren = d.childCount || 0;
      const evidence = evidenceLookup.get(d.id);

      let childrenHtml = '';
      if (totalChildren > 0) {
        childrenHtml = `<div style="margin-top:10px;padding-top:10px;border-top:1px solid #444">
          <div style="color:#888;margin-bottom:6px"><strong style="color:#fff">Programs underneath: ${totalChildren}</strong></div>
          <div style="font-size:11px;max-height:350px;overflow-y:auto">
            ${children.t1.length > 0 ? `<details style="margin-bottom:6px"><summary style="cursor:pointer;color:#4CAF50;font-weight:bold">T1 Brand Badges (${children.t1.length})</summary><div style="padding-left:12px;margin-top:4px;color:#ccc">${children.t1.map((c: any) => `<div style="padding:2px 0">• ${c.name}</div>`).join('')}</div></details>` : ''}
            ${children.t2.length > 0 ? `<details style="margin-bottom:6px"><summary style="cursor:pointer;color:#2196F3;font-weight:bold">T2 UX Badges (${children.t2.length})</summary><div style="padding-left:12px;margin-top:4px;color:#ccc">${children.t2.map((c: any) => `<div style="padding:2px 0">• ${c.name}</div>`).join('')}</div></details>` : ''}
            ${children.t3.length > 0 ? `<details style="margin-bottom:6px"><summary style="cursor:pointer;color:#FF9800;font-weight:bold">T3 Names (${children.t3.length})</summary><div style="padding-left:12px;margin-top:4px;color:#ccc">${children.t3.map((c: any) => `<div style="padding:2px 0">• ${c.name}</div>`).join('')}</div></details>` : ''}
          </div></div>`;
      }

      let evidenceHtml = '';
      if (evidence) {
        const confColor = evidence.confidence === 'high' ? '#4ade80' : evidence.confidence === 'medium' ? '#fbbf24' : '#94a3b8';
        const confBg = evidence.confidence === 'high' ? 'rgba(74,222,128,0.15)' : evidence.confidence === 'medium' ? 'rgba(251,191,36,0.15)' : 'rgba(148,163,184,0.15)';
        const confLabel = evidence.confidence.charAt(0).toUpperCase() + evidence.confidence.slice(1);
        evidenceHtml = `<div style="margin-top:10px;padding-top:10px;border-top:1px solid #444">
          <details>
            <summary style="cursor:pointer;display:flex;align-items:center;gap:6px;list-style:none">
              <span style="color:#888;font-size:10px">▶</span>
              <strong style="color:#fff;font-size:12px">Sources</strong>
              <span style="font-size:9px;padding:1px 6px;border-radius:8px;background:${confBg};color:${confColor}">${confLabel}</span>
            </summary>
            <div style="margin-top:8px">
              ${evidence.sources.map((src: any) => `<div style="margin-bottom:6px;padding:4px 6px;background:rgba(255,255,255,0.05);border-radius:4px"><a href="${src.url}" target="_blank" rel="noopener" style="color:#60a5fa;font-size:11px;text-decoration:none">${src.title || src.url}</a><div style="font-size:9px;color:#888;margin-top:2px">${src.source_type.replace(/_/g,' ')}${src.captured_at ? ' · ' + src.captured_at : ''}</div>${src.notes ? `<div style="font-size:10px;color:#aaa;margin-top:2px">${src.notes}</div>` : ''}</div>`).join('')}
            </div>
          </details>
        </div>`;
      }

      tooltip.html(`<strong style="color:${d.color};font-size:15px">${d.name}</strong>${hasTranslation ? `<br/><span style="color:#888;font-size:11px">ID: ${d.originalName}</span>` : ''}<br/><br/><span style="color:#888">Type:</span> ${d.type}<br/><span style="color:#888">Tier:</span> ${d.tier}<br/><span style="color:#888">Status:</span> ${d.status}<br/><span style="color:#888">Year:</span> ${d.year || 'N/A'}<br/><span style="color:#888">Market:</span> ${marketLabel}<br/>${d.desc ? `<br/><em style="color:#bbb;font-size:11px">${d.desc}</em>` : ''}${childrenHtml}${evidenceHtml}`)
        .style('visibility', 'visible')
        .style('left', `${event.pageX + 15}px`)
        .style('top', `${event.pageY - 10}px`);
    };

    const hideTooltipFn = () => {
      tooltipTimeout = setTimeout(() => tooltip.style('visibility', 'hidden'), 200);
    };

    tooltip.on('mouseenter', () => { if (tooltipTimeout) clearTimeout(tooltipTimeout); })
      .on('mouseleave', () => tooltip.style('visibility', 'hidden'));

    node.append('circle')
      .attr('r', (d: any) => d.size)
      .attr('fill', (d: any) => d.color)
      .attr('stroke', (d: any) => d.status === 'legacy' ? '#888' : '#ffffff')
      .attr('stroke-width', (d: any) => d.tier === 'master' ? 3 : (d.tier === 'umbrella' || d.tier === 'sub-umbrella') ? 2 : 1)
      .attr('stroke-dasharray', (d: any) => d.status === 'legacy' ? '3,3' : 'none')
      .attr('opacity', 0)
      .style('cursor', 'pointer')
      .on('mouseover', function (this: SVGCircleElement, event: any, d: any) {
        const selectedIds = (window as any)._selectedLineageIds;
        if (selectedIds && !selectedIds.has(d.id)) return;
        d3.select(this).attr('stroke-width', 4);
        if ((window as any)._showTooltips) showTooltipFn(event, d);
      })
      .on('mouseout', function (this: SVGCircleElement, _event: any, d: any) {
        d3.select(this).attr('stroke-width', d.tier === 'master' ? 3 : (d.tier === 'umbrella' || d.tier === 'sub-umbrella') ? 2 : 1);
        hideTooltipFn();
      })
      .on('click', (_event: any, d: any) => {
        const selectedIds = (window as any)._selectedLineageIds;
        if (selectedIds && !selectedIds.has(d.id)) return;
        highlightConnections(d);
      });

    node.append('text')
      .attr('class', 'graph-label')
      .text((d: any) => {
        const maxLen = d.tier === 'master' ? 50
          : d.tier === 'umbrella' ? 28
          : d.tier === 'sub-umbrella' ? 28
          : d.tier === 't1' ? 26
          : 22;
        return d.name.length > maxLen ? d.name.substring(0, maxLen - 1) + '…' : d.name;
      })
      .attr('dx', 0)
      .attr('dy', (d: any) => d.tier === 'master' ? d.size + 18 : d.size + 14)
      .attr('text-anchor', 'middle')
      .attr('fill', '#333333')
      .attr('stroke', 'rgba(255,255,255,0.88)')
      .attr('stroke-width', 3)
      .attr('stroke-linejoin', 'round')
      .style('paint-order', 'stroke fill')
      .attr('font-size', (d: any) => d.tier === 'master' ? '13px' : d.tier === 'umbrella' ? '10px' : d.tier === 'sub-umbrella' ? '9px' : '8px')
      .attr('font-weight', (d: any) => (d.tier === 'umbrella' || d.tier === 'sub-umbrella' || d.tier === 'master') ? '600' : 'normal')
      .attr('opacity', 0)
      .attr('pointer-events', 'none');

    let highlightedNodeId: string | null = null;

    function highlightConnections(d: any) {
      if (highlightedNodeId === d.id) { resetHighlight(); return; }
      highlightedNodeId = d.id;

      const connectedIds = new Set<string>();
      connectedIds.add(d.id);

      let current = d;
      while (current?.parent) {
        const parent = nodeMap.get(current.parent);
        if (!parent) break;
        connectedIds.add((parent as any).id);
        current = parent;
      }

      const walkDown = (nodeId: string) => {
        nodesData.forEach((n: any) => {
          if (n.parent === nodeId && !connectedIds.has(n.id)) {
            connectedIds.add(n.id);
            walkDown(n.id);
          }
        });
      };
      walkDown(d.id);

      (window as any)._selectedLineageIds = connectedIds;
      node.selectAll('circle')
        .attr('opacity', (n: any) => connectedIds.has(n.id) ? 1 : 0.1)
        .style('pointer-events', (n: any) => connectedIds.has(n.id) ? 'auto' : 'none');
      node.selectAll('text').attr('opacity', (n: any) => connectedIds.has(n.id) ? 1 : 0.1);
      link
        .attr('stroke-opacity', (l: any) => (connectedIds.has(l.source.id) && connectedIds.has(l.target.id)) ? 1 : 0.1)
        .attr('stroke-width', (l: any) => (connectedIds.has(l.source.id) && connectedIds.has(l.target.id)) ? 1 : 0.5);
      const ce = document.getElementById('filtered-count');
      const te = document.getElementById('filtered-total');
      if (ce) ce.textContent = connectedIds.size.toString();
      if (te) te.style.display = 'inline';
    }

    function resetHighlight() {
      highlightedNodeId = null;
      (window as any)._selectedLineageIds = null;
      node.selectAll('circle')
        .attr('opacity', (d: any) => nodePassesFilters(d) ? 1 : 0.15)
        .style('pointer-events', (d: any) => nodePassesFilters(d) ? 'auto' : 'none');
      node.selectAll('text')
        .attr('opacity', (d: any) => nodePassesFilters(d) ? 1 : 0.15);
      link.attr('stroke-opacity', 1).attr('stroke-width', 0.5);
      const passing = nodesData.filter(nodePassesFilters);
      const ce = document.getElementById('filtered-count');
      const te = document.getElementById('filtered-total');
      if (ce) ce.textContent = passing.length.toString();
      if (te) te.style.display = passing.length !== nodesData.length ? 'inline' : 'none';
    }

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => (d.source as any).x)
        .attr('y1', (d: any) => (d.source as any).y)
        .attr('x2', (d: any) => (d.target as any).x)
        .attr('y2', (d: any) => (d.target as any).y);
      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.05, 4])
      .on('zoom', (event: any) => {
        g.attr('transform', event.transform);
        const el = document.getElementById('zoom-level');
        if (el) el.textContent = Math.round(event.transform.k * 100) + '%';
      });

    svg.call(zoom as any);
    const initialScale = 0.45;
    svg.call(
      (zoom as any).transform,
      d3.zoomIdentity
        .translate(width / 2 - centerX * initialScale, height / 2 - centerY * initialScale)
        .scale(initialScale)
    );

    let currentYear = 2026;
    const minYear = 1995;
    const maxYear = 2026;
    let isPaused = true;

    let currentFilters: any = { type: 'all', tier: 'all', status: 'current', market: 'global', excludeTiers: [] as string[], excludeMarkets: [] as string[], excludeTypes: [] as string[] };
    let pmmMode = true;

    const nodePassesFilters = (d: any) => {
      const mf = currentFilters.market;
      if (mf !== 'global' && mf !== 'all') {
        const nm = d.market;
        if (nm && nm !== 'global') {
          if (Array.isArray(nm)) { if (!nm.includes(mf) && !nm.includes('global')) return false; }
          else { if (nm !== mf) return false; }
        }
      }
      if (currentFilters.type !== 'all' && d.type !== currentFilters.type) return false;
      if (currentFilters.tier !== 'all' && d.tier !== currentFilters.tier) return false;
      if (currentFilters.status !== 'all' && d.status !== currentFilters.status) return false;
      if (currentFilters.excludeTiers?.length && currentFilters.excludeTiers.includes(d.tier)) return false;
      if (currentFilters.excludeMarkets?.length) {
        const dm = Array.isArray(d.market) ? d.market : [d.market];
        if (currentFilters.excludeMarkets.some((em: string) => dm.includes(em))) return false;
      }
      if (currentFilters.excludeTypes?.length && currentFilters.excludeTypes.includes(d.type)) return false;
      return true;
    };

    node.selectAll('circle').filter((d: any) => d.year <= 2026).attr('opacity', 1);
    node.selectAll('text').filter((d: any) => d.year <= 2026).attr('opacity', 1);
    link.attr('opacity', (l: any) => (l.source.year <= 2026 && l.target.year <= 2026) ? 0.4 : 0);
    const yearDisplay = document.getElementById('timeline-year');
    if (yearDisplay) yearDisplay.textContent = '2026';

    const advanceTimeline = () => {
      if (currentYear > maxYear) {
        node.selectAll('circle').attr('opacity', 0);
        node.selectAll('text').attr('opacity', 0);
        link.attr('opacity', 0);
        currentYear = minYear;
      }
      const yd = document.getElementById('timeline-year');
      if (yd) yd.textContent = currentYear.toString();
      const sl = document.getElementById('timeline-slider') as HTMLInputElement;
      if (sl) sl.value = currentYear.toString();

      node.selectAll('circle').filter((d: any) => d.year === currentYear && nodePassesFilters(d))
        .transition().duration(350).attr('opacity', 1);
      node.selectAll('text').filter((d: any) => d.year === currentYear && nodePassesFilters(d))
        .transition().duration(350).attr('opacity', 1);
      link.transition().duration(350).attr('opacity', (l: any) => {
        const sv = l.source.year <= currentYear && nodePassesFilters(l.source);
        const tv = l.target.year <= currentYear && nodePassesFilters(l.target);
        return (sv && tv) ? 0.4 : (pmmMode ? 0.03 : 0);
      });
      currentYear++;
    };

    (window as any).togglePlayPause = () => {
      isPaused = !isPaused;
      const btn = document.getElementById('pause-btn');
      if (isPaused) {
        if (timelineIntervalRef.current) { clearInterval(timelineIntervalRef.current); timelineIntervalRef.current = null; }
        if (btn) btn.textContent = 'Play';
      } else {
        if (currentYear >= maxYear) {
          node.selectAll('circle').attr('opacity', 0);
          node.selectAll('text').attr('opacity', 0);
          link.attr('opacity', 0);
          currentYear = minYear;
        }
        timelineIntervalRef.current = setInterval(advanceTimeline, 500);
        if (btn) btn.textContent = 'Pause';
      }
    };

    (window as any).replayAnimation = () => {
      if (timelineIntervalRef.current) clearInterval(timelineIntervalRef.current);
      node.selectAll('circle').attr('opacity', 0);
      node.selectAll('text').attr('opacity', 0);
      link.attr('opacity', 0);
      currentYear = minYear; isPaused = false;
      const btn = document.getElementById('pause-btn');
      if (btn) btn.textContent = 'Pause';
      const sl = document.getElementById('timeline-slider') as HTMLInputElement;
      if (sl) sl.value = minYear.toString();
      const yd = document.getElementById('timeline-year');
      if (yd) yd.textContent = minYear.toString();
      timelineIntervalRef.current = setInterval(advanceTimeline, 500);
    };

    (window as any).jumpToYear = (year: number) => {
      if (timelineIntervalRef.current) { clearInterval(timelineIntervalRef.current); timelineIntervalRef.current = null; }
      isPaused = true;
      const btn = document.getElementById('pause-btn'); if (btn) btn.textContent = 'Play';
      currentYear = year;
      const yd = document.getElementById('timeline-year'); if (yd) yd.textContent = year.toString();
      const sl = document.getElementById('timeline-slider') as HTMLInputElement; if (sl) sl.value = year.toString();
      const isVis = (d: any) => d.year <= year && nodePassesFilters(d);
      node.selectAll('circle').transition().duration(300).attr('opacity', (d: any) => isVis(d) ? 1 : (pmmMode ? 0.1 : 0));
      node.selectAll('text').transition().duration(300).attr('opacity', (d: any) => isVis(d) ? 1 : (pmmMode ? 0.1 : 0));
      link.transition().duration(300).attr('opacity', (l: any) => (isVis(l.source) && isVis(l.target)) ? 0.4 : (pmmMode ? 0.03 : 0));
    };

    (window as any).resetView = () => {
      if (timelineIntervalRef.current) { clearInterval(timelineIntervalRef.current); timelineIntervalRef.current = null; }
      isPaused = true; currentYear = maxYear;
      const btn = document.getElementById('pause-btn'); if (btn) btn.textContent = 'Play';
      const sl = document.getElementById('timeline-slider') as HTMLInputElement; if (sl) sl.value = maxYear.toString();
      const yd = document.getElementById('timeline-year'); if (yd) yd.textContent = maxYear.toString();
      nodesData.forEach((n: any) => {
        if (n._canonicalX !== undefined) { n.x = n._canonicalX; n.y = n._canonicalY; n.fx = n._canonicalX; n.fy = n._canonicalY; }
      });
      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
      link.attr('x1', (d: any) => d.source.x).attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x).attr('y2', (d: any) => d.target.y);
      node.selectAll('circle').attr('opacity', (d: any) => nodePassesFilters(d) ? 1 : 0);
      node.selectAll('text').attr('opacity', (d: any) => nodePassesFilters(d) ? 1 : 0);
      link.attr('stroke-opacity', 1).attr('stroke-width', 0.5);
      const sc = 0.45;
      svg.transition().duration(500).call(
        (zoom as any).transform,
        d3.zoomIdentity.translate(width / 2 - centerX * sc, height / 2 - centerY * sc).scale(sc)
      );
    };

    const applyFilters = () => {
      const passing = nodesData.filter((n: any) => nodePassesFilters(n));
      const ce = document.getElementById('filtered-count'); if (ce) ce.textContent = passing.length.toString();
      const te = document.getElementById('filtered-total'); if (te) te.style.display = passing.length !== nodesData.length ? 'inline' : 'none';
      if (pmmMode) {
        node.selectAll('circle').transition().duration(300).attr('opacity', (d: any) => nodePassesFilters(d) ? 1 : 0.15);
        node.selectAll('text').transition().duration(300).attr('opacity', (d: any) => nodePassesFilters(d) ? 1 : 0.15);
        link.transition().duration(300).attr('opacity', (l: any) => (nodePassesFilters(l.source) && nodePassesFilters(l.target)) ? 0.5 : 0.05);
      } else {
        node.selectAll('circle').transition().duration(300).attr('opacity', (d: any) => nodePassesFilters(d) ? 1 : 0);
        node.selectAll('text').transition().duration(300).attr('opacity', (d: any) => nodePassesFilters(d) ? 1 : 0);
        link.transition().duration(300).attr('opacity', (l: any) => (nodePassesFilters(l.source) && nodePassesFilters(l.target)) ? 0.5 : 0);
      }
    };

    (window as any).searchNodes = (query: string) => {
      if (!query) { applyFilters(); return; }
      const q = query.toLowerCase();
      node.selectAll('circle').attr('opacity', (d: any) => (d.name.toLowerCase().includes(q) || d.originalName?.toLowerCase().includes(q)) ? 1 : 0.08);
      node.selectAll('text').attr('opacity', (d: any) => (d.name.toLowerCase().includes(q) || d.originalName?.toLowerCase().includes(q)) ? 1 : 0.08);
    };
    (window as any).filterByType = (type: string) => { currentFilters.type = type; applyFilters(); };
    (window as any).filterByTier = (tier: string) => { currentFilters.tier = tier; applyFilters(); };
    (window as any).filterByStatus = (status: string) => { currentFilters.status = status; applyFilters(); };
    (window as any).filterByMarket = (market: string) => {
      currentFilters.market = market; currentMarket = market;
      node.selectAll('text').text((d: any) => {
        const t = getTranslatedName(d, market); d.name = t;
        return t.length > 22 ? t.substring(0, 20) + '...' : t;
      });
      const me = document.getElementById('current-market');
      if (me) { const mi = MARKETS.find(m => m.id === market); me.textContent = mi ? `${mi.flag} ${mi.label}` : market; }
      applyFilters();
    };
    (window as any).togglePmmMode = (enabled: boolean) => { pmmMode = enabled; applyFilters(); };
    (window as any).resetFilters = () => {
      currentFilters = { type: 'all', tier: 'all', status: 'current', market: 'global', excludeTiers: [], excludeMarkets: [], excludeTypes: [] };
      applyFilters();
    };
    (window as any).setExclusions = (excl: any) => {
      if (excl.excludeTiers !== undefined) currentFilters.excludeTiers = excl.excludeTiers;
      if (excl.excludeMarkets !== undefined) currentFilters.excludeMarkets = excl.excludeMarkets;
      if (excl.excludeTypes !== undefined) currentFilters.excludeTypes = excl.excludeTypes;
      applyFilters();
    };
    (window as any).checkCollision = (name: string) => {
      if (!name) return [];
      const q = name.toLowerCase();
      return nodesData.filter((n: any) => n.name.toLowerCase().includes(q) || n.originalName?.toLowerCase().includes(q) || q.includes(n.name.toLowerCase().split(' ')[0])).map((m: any) => `${m.name} (${m.type})`);
    };
    (window as any).exportData = () => {
      const csv = 'ID,Name,Type,Tier,Status,Year,Parent,Market,Description\n' +
        nodesData.map((n: any) => `${n.id},"${n.name}",${n.type},${n.tier},${n.status},${n.year},${n.parent || ''},${Array.isArray(n.market) ? n.market.join(';') : n.market},"${(n.desc || '').replace(/"/g, '""')}"`).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = `ebay-naming-graph-${currentMarket}.csv`; a.click();
    };
    (window as any).exportImage = () => {
      const svgEl = container.querySelector('svg'); if (!svgEl) return;
      const s = new XMLSerializer();
      const svgStr = s.serializeToString(svgEl);
      const canvas = document.createElement('canvas');
      canvas.width = width * 2; canvas.height = height * 2;
      const ctx = canvas.getContext('2d'); if (!ctx) return;
      ctx.fillStyle = '#f8f9fa'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const a = document.createElement('a'); a.href = canvas.toDataURL('image/png');
        a.download = `ebay-naming-graph-v2-${currentMarket}.png`; a.click();
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgStr)));
    };
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value; setSearchQuery(q); (window as any).searchNodes?.(q);
  };
  const handleMarketChange = (market: string) => {
    setSelectedMarket(market); (window as any).filterByMarket?.(market);
  };

  const stats = getGraphStats();

  if (!isClient) {
    return <div className="h-screen w-full flex items-center justify-center" style={{ backgroundColor: theme.bg }}><div style={{ color: theme.textPrimary }}>Loading graph...</div></div>;
  }

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden" style={{ backgroundColor: theme.bg }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 relative z-20" style={{ borderBottom: `1px solid ${theme.border}`, backgroundColor: theme.bg }}>
        <Link href="/" className="flex items-center gap-2 transition-colors" style={{ color: theme.textSecondary }}>
          <ChevronLeft className="w-5 h-5" /><span>Back to Studio</span>
        </Link>
        <div className="text-center">
          <h1 className="text-xl font-bold" style={{ color: theme.textPrimary }}>eBay Naming Graph V2</h1>
          <p className="text-sm" style={{ color: theme.textSecondary }}>
            <span id="filtered-count">{stats.total}</span>
            <span id="filtered-total" style={{ display: 'none' }}> of {stats.total}</span>
            {' '}names • 32 years • 8 markets
          </p>
        </div>
        <button onClick={() => setDarkMode(d => !d)} className="p-2 rounded-full transition-colors"
          style={{ border: `1px solid ${theme.border}`, backgroundColor: darkMode ? theme.bgTertiary : 'transparent', color: theme.textPrimary }}>
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 flex relative">
        <div ref={containerRef} className="flex-1 overflow-hidden" style={{ backgroundColor: theme.canvasBg }} />

        {/* PMM Tools */}
        <div className="absolute top-4 left-4 w-64 rounded-lg p-4"
          style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}`, maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
          <h3 className="text-[#e53238] font-bold mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4" />PMM Tools
          </h3>

          <div className="mb-3">
            <label className="text-xs text-[#86b817] block mb-1">Search Programs</label>
            <input type="text" value={searchQuery} onChange={handleSearch} placeholder="e.g., Motors, Shipping..."
              className="w-full px-3 py-2 rounded text-sm"
              style={{ backgroundColor: theme.bgSecondary, border: `1px solid ${theme.border}`, color: theme.textPrimary }} />
          </div>

          <div className="mb-3">
            <label className="text-xs text-[#0064d2] block mb-1">Market</label>
            <select value={selectedMarket} onChange={(e) => handleMarketChange(e.target.value)}
              className="w-full px-3 py-2 rounded text-sm"
              style={{ backgroundColor: theme.bgSecondary, border: `1px solid ${theme.border}`, color: theme.textPrimary }}>
              {MARKETS.map(m => <option key={m.id} value={m.id}>{m.flag} {m.label}</option>)}
            </select>
          </div>

          <div className="mb-3">
            <label className="text-xs text-[#86b817] block mb-1">Type</label>
            <select value={filterType} onChange={(e) => { setFilterType(e.target.value); (window as any).filterByType?.(e.target.value); }}
              className="w-full px-3 py-2 rounded text-sm"
              style={{ backgroundColor: theme.bgSecondary, border: `1px solid ${theme.border}`, color: theme.textPrimary }}>
              <option value="all">All Types</option>
              <option value="category">Category</option>
              <option value="trust">Trust & Safety</option>
              <option value="advertising">Advertising</option>
              <option value="impact">Social Impact</option>
              <option value="regional">Regional</option>
              <option value="developer">Developer</option>
              <option value="analytics">Analytics</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="text-xs text-[#e67e22] block mb-1">Tier</label>
            <select value={filterTier} onChange={(e) => { setFilterTier(e.target.value); (window as any).filterByTier?.(e.target.value); }}
              className="w-full px-3 py-2 rounded text-sm"
              style={{ backgroundColor: theme.bgSecondary, border: `1px solid ${theme.border}`, color: theme.textPrimary }}>
              <option value="all">All Tiers</option>
              <option value="master">Masterbrand</option>
              <option value="umbrella">Umbrella</option>
              <option value="feature">Feature</option>
              <option value="program">Program</option>
              <option value="variant">Variant</option>
              <option value="platform">Platform</option>
              <option value="legal">Legal</option>
              <option value="product">Product</option>
              <option value="campaign">Campaign</option>
              <option value="vertical">Vertical</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="text-xs text-[#f5af02] block mb-1">Status</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 rounded text-sm"
              style={{ backgroundColor: theme.bgSecondary, border: `1px solid ${theme.border}`, color: theme.textPrimary }}>
              <option value="all">All Statuses</option>
              <option value="current">Current</option>
              <option value="legacy">Legacy</option>
              <option value="renamed">Renamed</option>
            </select>
          </div>

          <button onClick={() => {
            setSelectedMarket('global'); setFilterType('all'); setFilterTier('all'); setFilterStatus('current');
            setExcludeTiers([]); setExcludeMarkets([]); setExcludeTypes([]);
            setSearchQuery(''); (window as any).searchNodes?.('');
            (window as any).resetFilters?.();
          }}
            className="w-full px-3 py-2 rounded text-sm font-medium transition-colors mb-3 hover:opacity-80"
            style={{ backgroundColor: '#e74c3c', border: 'none', color: '#ffffff' }}>
            Clear All Filters
          </button>

          <details className="mb-3">
            <summary className="text-[10px] text-[#9b59b6] font-medium cursor-pointer mb-2">Advanced Options</summary>
            <div className="p-2 rounded space-y-3" style={{ backgroundColor: theme.bgTertiary, border: `1px solid ${theme.border}` }}>
              <div>
                <label className="text-[10px] font-medium block mb-1" style={{ color: theme.textSecondary }}>Layout</label>
                <select value={forcePreset} onChange={(e) => setForcePreset(e.target.value as keyof typeof FORCE_PRESETS)}
                  className="w-full px-2 py-1 rounded text-[10px]"
                  style={{ backgroundColor: theme.bgSecondary, border: `1px solid ${theme.border}`, color: theme.textPrimary }}>
                  {(Object.keys(FORCE_PRESETS) as Array<keyof typeof FORCE_PRESETS>).map(k => (
                    <option key={k} value={k}>{FORCE_PRESETS[k].name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-[10px] font-medium block" style={{ color: theme.textSecondary }}>Ghost Hidden</label>
                  <span className="text-[8px]" style={{ color: theme.textMuted }}>Show filtered nodes as faded</span>
                </div>
                <button onClick={() => { const v = !showFilteredAsGray; setShowFilteredAsGray(v); (window as any).togglePmmMode?.(v); }}
                  className="px-2 py-0.5 text-[10px] rounded transition-colors"
                  style={{ backgroundColor: showFilteredAsGray ? '#9b59b6' : theme.bgSecondary, color: showFilteredAsGray ? 'white' : theme.textMuted, border: showFilteredAsGray ? 'none' : `1px solid ${theme.border}` }}>
                  {showFilteredAsGray ? 'ON' : 'OFF'}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-[10px] font-medium block" style={{ color: theme.textSecondary }}>Tooltips</label>
                  <span className="text-[8px]" style={{ color: theme.textMuted }}>Show details on hover</span>
                </div>
                <button onClick={() => setShowTooltips(!showTooltips)}
                  className="px-2 py-0.5 text-[10px] rounded transition-colors"
                  style={{ backgroundColor: showTooltips ? '#9b59b6' : theme.bgSecondary, color: showTooltips ? 'white' : theme.textMuted, border: showTooltips ? 'none' : `1px solid ${theme.border}` }}>
                  {showTooltips ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* Audit Exclusions */}
              <div className="pt-2 mt-2" style={{ borderTop: `1px solid ${theme.border}` }}>
                <label className="text-[10px] text-[#e67e22] font-medium block mb-2">Audit Exclusions (NOT filters)</label>
                <div className="mb-2">
                  <div className="text-[9px] mb-1" style={{ color: theme.textMuted }}>Exclude Tiers</div>
                  <div className="flex flex-wrap gap-1">
                    {(['master','umbrella','feature','program','variant','platform'] as const).map(t => (
                      <button key={t} onClick={() => {
                        const next = excludeTiers.includes(t) ? excludeTiers.filter(x => x !== t) : [...excludeTiers, t];
                        setExcludeTiers(next);
                        (window as any).setExclusions?.({ excludeTiers: next });
                      }} className="px-1.5 py-0.5 text-[9px] rounded transition-colors"
                        style={{ backgroundColor: excludeTiers.includes(t) ? '#e53238' : theme.bgSecondary, color: excludeTiers.includes(t) ? 'white' : theme.textMuted, border: excludeTiers.includes(t) ? 'none' : `1px solid ${theme.border}` }}>
                        NOT {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-[9px] mb-1" style={{ color: theme.textMuted }}>Exclude Markets</div>
                  <div className="flex flex-wrap gap-1">
                    {MARKETS.filter(m => m.id !== 'global').map(m => (
                      <button key={m.id} onClick={() => {
                        const next = excludeMarkets.includes(m.id) ? excludeMarkets.filter(x => x !== m.id) : [...excludeMarkets, m.id];
                        setExcludeMarkets(next);
                        (window as any).setExclusions?.({ excludeMarkets: next });
                      }} className="px-1.5 py-0.5 text-[9px] rounded transition-colors"
                        style={{ backgroundColor: excludeMarkets.includes(m.id) ? '#e53238' : theme.bgSecondary, color: excludeMarkets.includes(m.id) ? 'white' : theme.textMuted, border: excludeMarkets.includes(m.id) ? 'none' : `1px solid ${theme.border}` }}>
                        NOT {m.flag}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[9px] mb-1" style={{ color: theme.textMuted }}>Exclude Types</div>
                  <div className="flex flex-wrap gap-1">
                    {(['category','trust','advertising','impact','regional','developer'] as const).map(t => (
                      <button key={t} onClick={() => {
                        const next = excludeTypes.includes(t) ? excludeTypes.filter(x => x !== t) : [...excludeTypes, t];
                        setExcludeTypes(next);
                        (window as any).setExclusions?.({ excludeTypes: next });
                      }} className="px-1.5 py-0.5 text-[9px] rounded transition-colors"
                        style={{ backgroundColor: excludeTypes.includes(t) ? '#e53238' : theme.bgSecondary, color: excludeTypes.includes(t) ? 'white' : theme.textMuted, border: excludeTypes.includes(t) ? 'none' : `1px solid ${theme.border}` }}>
                        NOT {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 mt-2" style={{ borderTop: `1px solid ${theme.border}` }}>
                <label className="text-[10px] text-[#e53238] block mb-1">Collision Checker</label>
                <input type="text" value={collisionCheck}
                  onChange={(e) => { setCollisionCheck(e.target.value); setCollisionResults((window as any).checkCollision?.(e.target.value) || []); }}
                  placeholder="Enter proposed name..."
                  className="w-full px-2 py-1.5 rounded text-xs mb-1"
                  style={{ backgroundColor: theme.bgSecondary, border: `1px solid ${theme.border}`, color: theme.textPrimary }} />
                {collisionResults.length > 0 && (
                  <div className="text-[10px] text-yellow-500">
                    <div className="font-bold mb-0.5">Conflicts:</div>
                    {collisionResults.slice(0, 4).map((r, i) => <div key={i}>- {r}</div>)}
                  </div>
                )}
              </div>
            </div>
          </details>

          <div className="mb-3">
            <label className="text-xs text-[#86b817] block mb-1">Export</label>
            <div className="flex gap-2">
              <button onClick={() => (window as any).exportData?.()} className="flex-1 py-2 bg-[#0064d2] text-white rounded text-sm">CSV</button>
              <button onClick={() => (window as any).exportImage?.()} className="flex-1 py-2 bg-[#0064d2] text-white rounded text-sm">PNG</button>
            </div>
          </div>

          <div className="pt-3" style={{ borderTop: `1px solid ${theme.border}` }}>
            <label className="text-xs text-[#86b817] block mb-2">Timeline</label>
            <div id="timeline-year" className="text-4xl font-bold text-[#86b817] text-center mb-2">2026</div>
            <input id="timeline-slider" type="range" min="1995" max="2027" defaultValue="2026"
              className="w-full h-2 rounded-lg appearance-none cursor-pointer mb-2"
              style={{ background: `linear-gradient(to right, #86b817 0%, #86b817 96.875%, ${theme.bgTertiary} 96.875%, ${theme.bgTertiary} 100%)`, accentColor: '#86b817' }}
              onChange={(e) => (window as any).jumpToYear?.(parseInt(e.target.value))} />
            <div className="flex justify-between text-[9px]" style={{ color: theme.textMuted }}>
              <span>1995</span><span>2010</span><span>2027</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 rounded-lg p-3" style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}` }}>
          <div className="flex flex-wrap gap-2 text-[9px] max-w-[320px]">
            {[
              ['masterbrand', 'eBay'], ['advertising', 'Ads'], ['shipping', 'Shipping'],
              ['payments', 'Payments'], ['collectibles', 'Collectibles'], ['motors', 'Motors'],
              ['trust', 'Trust'], ['developer', 'Dev'], ['legacy', 'Legacy'],
            ].map(([key, label]) => (
              <span key={key} style={{ color: theme.textSecondary }}>
                <span style={{ color: (NODE_COLORS as any)[key] }}>●</span> {label}
              </span>
            ))}
          </div>
          <div className="mt-1.5 text-[9px]" style={{ color: theme.textMuted }}>
            <span id="current-market">{MARKETS.find(m => m.id === selectedMarket)?.flag} {MARKETS.find(m => m.id === selectedMarket)?.label || 'Global'}</span> view | {stats.total} programs
          </div>
        </div>

        {/* Zoom indicator */}
        <div className="absolute top-4 right-4 px-3 py-2 rounded" style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}` }}>
          <span className="text-xs" style={{ color: theme.textMuted }}>Zoom: </span>
          <span id="zoom-level" className="text-sm font-mono" style={{ color: theme.textPrimary }}>45%</span>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="flex items-center gap-3 px-4 py-3 relative z-20" style={{ borderTop: `1px solid ${theme.border}`, backgroundColor: theme.bg }}>
        <button onClick={() => (window as any).resetView?.()} className="px-5 py-2 bg-[#0064d2] text-white rounded text-sm font-medium">Reset</button>
        <button onClick={() => (window as any).replayAnimation?.()} className="px-5 py-2 bg-[#86b817] text-white rounded text-sm font-medium">Replay</button>
        <button id="pause-btn" onClick={() => (window as any).togglePlayPause?.()} className="px-5 py-2 bg-[#f5af02] text-white rounded text-sm font-medium">Play</button>
        <div className="flex-1" />
        <div className="text-xs" style={{ color: theme.textMuted }}>Drag nodes | Click for details | Scroll to zoom | Pan with mouse</div>
      </div>
    </div>
  );
}
