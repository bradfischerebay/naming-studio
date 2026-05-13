"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Moon, Sun, Network } from 'lucide-react';
import {
  ENRICHED_PROGRAMS,
  generateLinks,
  getNodeColor,
  getNodeSize,
  getGraphStats,
  LINK_STYLES,
  NODE_COLORS,
  getMostConnected,
  findShortestPath,
  findClusters,
  getRelationshipTimeline,
  type GraphNode,
  type GraphLink,
  type RelationshipType,
} from '@/app/naming-graph/naming-data';

export default function NamingGraphKnowledgePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('current');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedRelationshipTypes, setSelectedRelationshipTypes] = useState<Set<RelationshipType>>(
    new Set(['parent', 'renamed_to', 'replaced_by', 'integrates_with', 'depends_on'])
  );
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());
  const [pathStartNode, setPathStartNode] = useState<string | null>(null);
  const [pathEndNode, setPathEndNode] = useState<string | null>(null);
  const [shortestPath, setShortestPath] = useState<string[] | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [timelineYear, setTimelineYear] = useState<number>(2026);
  const [playTimeline, setPlayTimeline] = useState(false);

  const theme = {
    bg: darkMode ? "#0f0f0f" : "#ffffff",
    bgSecondary: darkMode ? "#1a1a1a" : "#f8f9fa",
    bgTertiary: darkMode ? "#252525" : "#f0f1f3",
    bgCard: darkMode ? "#1a1a1a" : "#ffffff",
    textPrimary: darkMode ? "#f0f0f0" : "#111820",
    textSecondary: darkMode ? "#aaaaaa" : "#555555",
    textMuted: darkMode ? "#666666" : "#888888",
    border: darkMode ? "#333333" : "#e0e0e0",
    canvasBg: darkMode ? "#0f0f0f" : "#f8f9fa",
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://d3js.org/d3.v7.min.js';
    script.async = true;
    script.onload = () => initGraph();
    document.head.appendChild(script);

    return () => {
      delete (window as any).resetView;
      delete (window as any).searchNodes;
      delete (window as any).filterByType;
      delete (window as any).filterByStatus;
      delete (window as any).exportData;
      delete (window as any).toggleRelationshipType;
      delete (window as any).highlightPath;
      delete (window as any).filterByYear;
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, [isClient, selectedRelationshipTypes]);

  // Timeline play animation
  useEffect(() => {
    if (!playTimeline) return;

    const interval = setInterval(() => {
      setTimelineYear(prev => {
        const next = prev + 1;
        if (next > 2026) {
          setPlayTimeline(false);
          return 2026;
        }
        if ((window as any).filterByYear) {
          (window as any).filterByYear(next);
        }
        return next;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [playTimeline]);

  // Visual feedback for selected nodes
  useEffect(() => {
    if (!isClient) return;

    const d3 = (window as any).d3;
    if (!d3) return;

    d3.selectAll("circle")
      .attr("stroke", (d: any) => {
        if (selectedNodes.has(d.id)) {
          return "#9b59b6";
        }
        return d.status === 'legacy' ? '#888' : '#ffffff';
      })
      .attr("stroke-width", (d: any) => {
        if (selectedNodes.has(d.id)) {
          return 4;
        }
        return d.tier === 'master' ? 3 : d.tier === 'umbrella' ? 2 : 1;
      });
  }, [selectedNodes, isClient]);

  const initGraph = () => {
    const d3 = (window as any).d3;
    if (!d3) return;

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    d3.select(container).selectAll('*').remove();

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g');

    // Transform nodes to D3 format
    const nodesData = ENRICHED_PROGRAMS.map(node => ({
      id: node.id,
      name: node.name,
      type: node.type,
      tier: node.tier,
      status: node.status,
      parent: node.parent,
      desc: node.desc,
      market: node.market || 'global',
      color: getNodeColor(node),
      size: getNodeSize(node) * (node.tier === "master" ? 1.5 : node.tier === "umbrella" ? 1.2 : 0.8),
      year: node.year || 2020,
      relationships: node.relationships || [],
    }));

    // Generate ALL links (hierarchical + relationships)
    const allLinks = generateLinks(ENRICHED_PROGRAMS);

    // Filter links based on selected relationship types
    const visibleLinks = allLinks.filter(link =>
      selectedRelationshipTypes.has(link.type)
    );

    const linksData = visibleLinks.map(link => ({
      source: link.source,
      target: link.target,
      type: link.type,
      year: link.year,
      desc: link.desc,
      style: LINK_STYLES[link.type],
    }));

    // Pre-position nodes
    const centerX = width / 2;
    const centerY = height / 2;
    const umbrellaRadius = 400;

    // Pin masterbrand at center
    const masterbrand = nodesData.find(n => n.id === 'ebay');
    if (masterbrand) {
      (masterbrand as any).x = centerX;
      (masterbrand as any).y = centerY;
      (masterbrand as any).fx = centerX;
      (masterbrand as any).fy = centerY;
    }

    // Pre-position umbrellas in a circle
    const umbrellas = nodesData.filter(n => n.tier === 'umbrella');
    umbrellas.forEach((node, i) => {
      const angle = (i / umbrellas.length) * Math.PI * 2 - Math.PI / 2;
      (node as any).x = centerX + Math.cos(angle) * umbrellaRadius;
      (node as any).y = centerY + Math.sin(angle) * umbrellaRadius;
    });

    // Create force simulation
    const simulation = d3.forceSimulation(nodesData)
      .force("link", d3.forceLink(linksData).id((d: any) => d.id).distance((d: any) => {
        // Different distances for different relationship types
        if (d.type === 'parent') {
          if (d.source.tier === 'master') return 400;
          if (d.source.tier === 'umbrella') return 150;
          return 80;
        }
        if (d.type === 'integrates_with') return 200;
        if (d.type === 'depends_on') return 180;
        if (d.type === 'replaced_by' || d.type === 'replaces') return 150;
        if (d.type === 'renamed_to' || d.type === 'renamed_from') return 120;
        return 100;
      }).strength(0.05))
      .force("charge", d3.forceManyBody().strength((d: any) => {
        if (d.tier === 'master') return -3000;
        if (d.tier === 'umbrella') return -1000;
        return -120;
      }))
      .force("collision", d3.forceCollide().radius((d: any) => d.size + 20).strength(1))
      .force("radial", d3.forceRadial((d: any) => {
        if (d.tier === 'master') return 0;
        if (d.tier === 'umbrella') return umbrellaRadius;
        return umbrellaRadius + 350;
      }, centerX, centerY).strength((d: any) => {
        if (d.tier === 'master') return 1;
        if (d.tier === 'umbrella') return 0.3;
        return 0.02;
      }))
      .alphaDecay(0.02)
      .velocityDecay(0.3);

    // Draw links with different styles per relationship type
    const link = g.append("g")
      .selectAll("line")
      .data(linksData)
      .join("line")
      .attr("class", "graph-link")
      .attr("stroke", (d: any) => d.style.color)
      .attr("stroke-opacity", (d: any) => d.style.opacity)
      .attr("stroke-width", (d: any) => d.style.width)
      .attr("stroke-dasharray", (d: any) => d.style.dashArray || 'none')
      .attr("data-type", (d: any) => d.type);

    // Draw nodes
    const node = g.append("g")
      .selectAll("g")
      .data(nodesData)
      .join("g")
      .call(d3.drag()
        .on("start", (event: any, d: any) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event: any, d: any) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event: any, d: any) => {
          if (!event.active) simulation.alphaTarget(0);
          if (d.tier !== 'master') {
            d.fx = null;
            d.fy = null;
          }
        })
      );

    // Add circles
    node.append("circle")
      .attr("r", (d: any) => d.size)
      .attr("fill", (d: any) => d.color)
      .attr("stroke", (d: any) => d.status === 'legacy' ? '#888' : '#ffffff')
      .attr("stroke-width", (d: any) => d.tier === 'master' ? 3 : d.tier === 'umbrella' ? 2 : 1)
      .attr("stroke-dasharray", (d: any) => d.status === 'legacy' ? '3,3' : 'none')
      .style("cursor", "pointer")
      .on("mouseover", function(event: any, d: any) {
        d3.select(this).attr("stroke-width", 4);
        showTooltip(event, d);
        highlightConnections(d);
      })
      .on("mouseout", function(event: any, d: any) {
        d3.select(this).attr("stroke-width", d.tier === 'master' ? 3 : d.tier === 'umbrella' ? 2 : 1);
        hideTooltip();
        resetHighlight();
      })
      .on("click", function(event: any, d: any) {
        event.stopPropagation();
        setSelectedNodes((prev: Set<string>) => {
          const newSet = new Set(prev);
          if (newSet.has(d.id)) {
            newSet.delete(d.id);
          } else {
            newSet.add(d.id);
          }
          return newSet;
        });
      });

    // Add labels
    node.append("text")
      .attr("class", "graph-label")
      .text((d: any) => d.name.length > 22 ? d.name.substring(0, 20) + '...' : d.name)
      .attr("dy", (d: any) => d.size + 12)
      .attr("text-anchor", "middle")
      .attr("fill", darkMode ? "#ffffff" : "#333333")
      .attr("font-size", (d: any) => d.tier === 'master' ? '14px' : d.tier === 'umbrella' ? '10px' : '8px')
      .attr("font-weight", (d: any) => d.tier === 'umbrella' || d.tier === 'master' ? 'bold' : 'normal')
      .attr("pointer-events", "none");

    // Tooltip
    const tooltip = d3.select("body").append("div")
      .attr("class", "graph-tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "rgba(0,0,0,0.92)")
      .style("color", "#fff")
      .style("padding", "14px")
      .style("border-radius", "10px")
      .style("font-size", "12px")
      .style("max-width", "380px")
      .style("z-index", "1000")
      .style("pointer-events", "none")
      .style("box-shadow", "0 4px 20px rgba(0,0,0,0.3)");

    function showTooltip(event: any, d: any) {
      // Get all relationships for this node
      const relationships = d.relationships || [];
      const relText = relationships.length > 0
        ? `<br/><br/><strong style="color:#86b817;">Relationships:</strong><br/>` +
          relationships.map((r: any) =>
            `• <span style="color:${LINK_STYLES[r.type].color}">${LINK_STYLES[r.type].label}</span> → ${r.target}${r.desc ? `<br/>  <em style="color:#999;font-size:10px;">${r.desc}</em>` : ''}`
          ).join('<br/>')
        : '';

      tooltip.html(`
        <strong style="color:${d.color};font-size:15px">${d.name}</strong>
        <br/><br/>
        <span style="color:#888">Type:</span> ${d.type}<br/>
        <span style="color:#888">Tier:</span> ${d.tier}<br/>
        <span style="color:#888">Status:</span> ${d.status}<br/>
        <span style="color:#888">Year:</span> ${d.year || 'N/A'}<br/>
        ${d.desc ? `<br/><em style="color:#bbb;font-size:11px">${d.desc}</em>` : ''}
        ${relText}
      `)
        .style("visibility", "visible")
        .style("left", (event.pageX + 15) + "px")
        .style("top", (event.pageY - 10) + "px");
    }

    function hideTooltip() {
      tooltip.style("visibility", "hidden");
    }

    function highlightConnections(d: any) {
      const connectedIds = new Set<string>();
      connectedIds.add(d.id);
      linksData.forEach((l: any) => {
        if (l.source.id === d.id) connectedIds.add(l.target.id);
        if (l.target.id === d.id) connectedIds.add(l.source.id);
      });

      node.selectAll("circle")
        .attr("opacity", (n: any) => connectedIds.has(n.id) ? 1 : 0.1);
      node.selectAll("text")
        .attr("opacity", (n: any) => connectedIds.has(n.id) ? 1 : 0.1);
      link.attr("stroke-opacity", (l: any) =>
        l.source.id === d.id || l.target.id === d.id ? 0.9 : 0.03
      );
    }

    function resetHighlight() {
      node.selectAll("circle").attr("opacity", 1);
      node.selectAll("text").attr("opacity", 1);
      link.attr("stroke-opacity", (d: any) => d.style.opacity);
    }

    // Simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Zoom
    const zoom = d3.zoom()
      .scaleExtent([0.05, 4])
      .on("zoom", (event: any) => {
        g.attr("transform", event.transform);
        const zoomEl = document.getElementById('zoom-level');
        if (zoomEl) zoomEl.textContent = Math.round(event.transform.k * 100) + '%';
      });

    svg.call(zoom);
    const initialScale = 0.45;
    const initialTranslateX = (width / 2) - (centerX * initialScale);
    const initialTranslateY = (height / 2) - (centerY * initialScale);
    svg.call(zoom.transform, d3.zoomIdentity.translate(initialTranslateX, initialTranslateY).scale(initialScale));

    (window as any).resetView = () => {
      node.selectAll("circle").attr("opacity", 1);
      node.selectAll("text").attr("opacity", 1);
      link.attr("stroke-opacity", (d: any) => d.style.opacity);
      const scale = 0.45;
      const translateX = (width / 2) - (centerX * scale);
      const translateY = (height / 2) - (centerY * scale);
      svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(scale));
    };

    (window as any).exportData = () => {
      const csv = 'ID,Name,Type,Tier,Status,Year,Relationships\n' +
        nodesData.map((n: any) =>
          `${n.id},"${n.name}",${n.type},${n.tier},${n.status},${n.year},${n.relationships.length}`
        ).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ebay-knowledge-graph.csv';
      a.click();
    };

    // Advanced Analytics Functions
    (window as any).highlightPath = (path: string[]) => {
      const pathSet = new Set(path);
      node.selectAll("circle")
        .attr("opacity", (n: any) => pathSet.has(n.id) ? 1 : 0.1)
        .attr("r", (n: any) => pathSet.has(n.id) ? 10 : 5)
        .attr("stroke", (n: any) => pathSet.has(n.id) ? "#86b817" : "none")
        .attr("stroke-width", (n: any) => pathSet.has(n.id) ? 3 : 0);
      node.selectAll("text")
        .attr("opacity", (n: any) => pathSet.has(n.id) ? 1 : 0.1)
        .attr("font-weight", (n: any) => pathSet.has(n.id) ? "bold" : "normal");
      link.attr("stroke-opacity", (l: any) => {
        const sourceIndex = path.indexOf(l.source.id);
        const targetIndex = path.indexOf(l.target.id);
        if (sourceIndex !== -1 && targetIndex !== -1 && Math.abs(sourceIndex - targetIndex) === 1) {
          return 1;
        }
        return 0.03;
      })
      .attr("stroke-width", (l: any) => {
        const sourceIndex = path.indexOf(l.source.id);
        const targetIndex = path.indexOf(l.target.id);
        if (sourceIndex !== -1 && targetIndex !== -1 && Math.abs(sourceIndex - targetIndex) === 1) {
          return 3;
        }
        return l.style.width;
      });
    };

    (window as any).filterByYear = (year: number) => {
      link.attr("opacity", (l: any) => {
        const linkYear = l.year || 1995;
        return linkYear <= year ? l.style.opacity : 0;
      });
      node.selectAll("circle").attr("opacity", (n: any) => {
        const nodeYear = n.year || 1995;
        return nodeYear <= year ? 1 : 0.2;
      });
      node.selectAll("text").attr("opacity", (n: any) => {
        const nodeYear = n.year || 1995;
        return nodeYear <= year ? 1 : 0.2;
      });
    };

    (window as any).searchNodes = (query: string) => {
      if (!query) {
        node.selectAll("circle").attr("opacity", 1);
        node.selectAll("text").attr("opacity", 1);
        return;
      }
      const q = query.toLowerCase();
      node.selectAll("circle").attr("opacity", (n: any) =>
        n.name.toLowerCase().includes(q) ? 1 : 0.08
      );
      node.selectAll("text").attr("opacity", (n: any) =>
        n.name.toLowerCase().includes(q) ? 1 : 0.08
      );
    };

    (window as any).filterByType = (type: string) => {
      node.selectAll("circle").attr("opacity", (d: any) =>
        type === 'all' || d.type === type ? 1 : 0.08
      );
      node.selectAll("text").attr("opacity", (d: any) =>
        type === 'all' || d.type === type ? 1 : 0.08
      );
      link.attr("stroke-opacity", (l: any) =>
        type === 'all' || l.source.type === type || l.target.type === type
          ? l.style.opacity : 0.03
      );
    };

    (window as any).filterByStatus = (status: string) => {
      node.selectAll("circle").attr("opacity", (d: any) =>
        status === 'all' || d.status === status ? 1 : 0.08
      );
      node.selectAll("text").attr("opacity", (d: any) =>
        status === 'all' || d.status === status ? 1 : 0.08
      );
      link.attr("stroke-opacity", (l: any) =>
        status === 'all' || l.source.status === status || l.target.status === status
          ? l.style.opacity : 0.03
      );
    };
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    (window as any).searchNodes?.(query);
  };

  const toggleRelationshipType = (type: RelationshipType) => {
    const newSet = new Set(selectedRelationshipTypes);
    if (newSet.has(type)) {
      newSet.delete(type);
    } else {
      newSet.add(type);
    }
    setSelectedRelationshipTypes(newSet);
  };

  const stats = getGraphStats();

  if (!isClient) {
    return (
      <div className="h-screen w-full flex items-center justify-center" style={{ backgroundColor: theme.bg }}>
        <div style={{ color: theme.textPrimary }}>Loading knowledge graph...</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden" style={{ backgroundColor: theme.bg }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${theme.border}` }}>
        <Link href="/" className="flex items-center gap-2 transition-colors" style={{ color: theme.textSecondary }}>
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Studio</span>
        </Link>
        <div className="text-center">
          <h1 className="text-xl font-bold flex items-center gap-2 justify-center" style={{ color: theme.textPrimary }}>
            <Network className="w-5 h-5" />
            eBay Naming Knowledge Graph
          </h1>
          <p className="text-sm" style={{ color: theme.textSecondary }}>
            {stats.total} programs • {stats.totalRelationships} relationships • {stats.withRelationships} connected nodes
          </p>
        </div>
        <button
          onClick={() => setDarkMode(d => !d)}
          className="p-2 rounded-full transition-colors"
          style={{
            border: `1px solid ${theme.border}`,
            backgroundColor: darkMode ? theme.bgTertiary : "transparent",
            color: theme.textPrimary
          }}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex relative">
        {/* Graph container */}
        <div ref={containerRef} className="flex-1" style={{ backgroundColor: theme.canvasBg }} />

        {/* PMM Tools Panel */}
        <div className="absolute top-4 left-4 w-72 rounded-lg p-4" style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}`, maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
          <h3 className="text-[#e53238] font-bold mb-3 flex items-center gap-2">
            <Network className="w-4 h-4" />
            Relationship Filters
          </h3>

          <div className="mb-4">
            <label className="text-xs text-[#86b817] block mb-2">Visible Relationship Types</label>
            <div className="space-y-2">
              {Object.entries(LINK_STYLES).map(([type, style]) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedRelationshipTypes.has(type as RelationshipType)}
                    onChange={() => toggleRelationshipType(type as RelationshipType)}
                    className="w-4 h-4"
                  />
                  <div
                    className="w-8 h-0.5"
                    style={{
                      backgroundColor: style.color,
                      borderStyle: style.dashArray ? 'dashed' : 'solid',
                    }}
                  />
                  <span className="text-xs" style={{ color: theme.textSecondary }}>
                    {style.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4 pt-3" style={{ borderTop: `1px solid ${theme.border}` }}>
            <label className="text-xs text-[#86b817] block mb-1">Search Programs</label>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="e.g., Motors, Vault..."
              className="w-full px-3 py-2 rounded text-sm"
              style={{ backgroundColor: theme.bgSecondary, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
            />
          </div>

          <div className="mb-4">
            <label className="text-xs text-[#86b817] block mb-1">Filter by Type</label>
            <select
              value={filterType}
              onChange={(e) => { setFilterType(e.target.value); (window as any).filterByType?.(e.target.value); }}
              className="w-full px-3 py-2 rounded text-sm"
              style={{ backgroundColor: theme.bgSecondary, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
            >
              <option value="all">All Types</option>
              <option value="masterbrand">Masterbrand</option>
              <option value="umbrella">Umbrella</option>
              <option value="category">Category</option>
              <option value="advertising">Advertising</option>
              <option value="trust">Trust & Safety</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-xs text-[#f5af02] block mb-1">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); (window as any).filterByStatus?.(e.target.value); }}
              className="w-full px-3 py-2 rounded text-sm"
              style={{ backgroundColor: theme.bgSecondary, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
            >
              <option value="all">All Statuses</option>
              <option value="current">Current</option>
              <option value="legacy">Legacy</option>
              <option value="renamed">Renamed</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-xs text-[#86b817] block mb-2">Export</label>
            <button
              onClick={() => (window as any).exportData?.()}
              className="w-full py-2 bg-[#0064d2] text-white rounded text-sm"
            >
              Export CSV
            </button>
          </div>

          {/* Advanced Analytics Toggle */}
          <div className="pt-3" style={{ borderTop: `1px solid ${theme.border}` }}>
            <button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="w-full py-2 bg-[#9b59b6] text-white rounded text-sm font-medium"
            >
              {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
            </button>
          </div>
        </div>

        {/* Advanced Analytics Panel */}
        {showAnalytics && (
          <div className="absolute top-4 right-4 w-80 rounded-lg p-4" style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}`, maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
            <h3 className="text-[#9b59b6] font-bold mb-3">Advanced Analytics</h3>

            {/* Most Connected Nodes */}
            <div className="mb-4">
              <h4 className="text-xs font-bold mb-2" style={{ color: theme.textPrimary }}>Most Connected Programs</h4>
              <div className="space-y-1">
                {getMostConnected(ENRICHED_PROGRAMS, 5).map((node, i) => (
                  <div key={node.id} className="text-xs flex justify-between" style={{ color: theme.textSecondary }}>
                    <span>{i + 1}. {node.name}</span>
                    <span className="font-mono text-[#86b817]">{node.degree}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shortest Path Finder */}
            <div className="mb-4 pt-3" style={{ borderTop: `1px solid ${theme.border}` }}>
              <h4 className="text-xs font-bold mb-2" style={{ color: theme.textPrimary }}>Find Path Between Programs</h4>
              <input
                type="text"
                placeholder="Start program (e.g., motors)"
                value={pathStartNode || ''}
                onChange={(e) => setPathStartNode(e.target.value)}
                className="w-full px-2 py-1 rounded text-xs mb-1"
                style={{ backgroundColor: theme.bgSecondary, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
              />
              <input
                type="text"
                placeholder="End program (e.g., vault)"
                value={pathEndNode || ''}
                onChange={(e) => setPathEndNode(e.target.value)}
                className="w-full px-2 py-1 rounded text-xs mb-2"
                style={{ backgroundColor: theme.bgSecondary, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
              />
              <button
                onClick={() => {
                  if (pathStartNode && pathEndNode) {
                    const path = findShortestPath(ENRICHED_PROGRAMS, pathStartNode, pathEndNode);
                    setShortestPath(path);
                    if (path && (window as any).highlightPath) {
                      (window as any).highlightPath(path);
                    }
                  }
                }}
                className="w-full py-1 bg-[#0064d2] text-white rounded text-xs"
              >
                Find Shortest Path
              </button>
              {shortestPath && (
                <div className="mt-2 p-2 rounded text-xs" style={{ backgroundColor: theme.bgTertiary }}>
                  {shortestPath.length > 0 ? (
                    <>
                      <div className="font-bold text-[#86b817]">Path found ({shortestPath.length} steps):</div>
                      <div style={{ color: theme.textSecondary }}>
                        {shortestPath.join(' → ')}
                      </div>
                    </>
                  ) : (
                    <div style={{ color: theme.textMuted }}>No path found</div>
                  )}
                </div>
              )}
            </div>

            {/* Cluster Analysis */}
            <div className="mb-4 pt-3" style={{ borderTop: `1px solid ${theme.border}` }}>
              <h4 className="text-xs font-bold mb-2" style={{ color: theme.textPrimary }}>Graph Clusters</h4>
              <div className="text-xs" style={{ color: theme.textSecondary }}>
                {(() => {
                  const clusters = findClusters(ENRICHED_PROGRAMS);
                  const topClusters = Array.from(clusters.entries())
                    .sort((a, b) => b[1].length - a[1].length)
                    .slice(0, 3);
                  return (
                    <div className="space-y-1">
                      {topClusters.map(([id, nodes], i) => (
                        <div key={id}>
                          Cluster {i + 1}: {nodes.length} programs
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Timeline Animation */}
            <div className="mb-4 pt-3" style={{ borderTop: `1px solid ${theme.border}` }}>
              <h4 className="text-xs font-bold mb-2" style={{ color: theme.textPrimary }}>Relationship Timeline</h4>
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => setPlayTimeline(!playTimeline)}
                  className="px-3 py-1 bg-[#86b817] text-white rounded text-xs"
                >
                  {playTimeline ? 'Pause' : 'Play'}
                </button>
                <span className="text-xs font-mono" style={{ color: theme.textPrimary }}>{timelineYear}</span>
              </div>
              <input
                type="range"
                min="1995"
                max="2026"
                value={timelineYear}
                onChange={(e) => {
                  setTimelineYear(parseInt(e.target.value));
                  if ((window as any).filterByYear) {
                    (window as any).filterByYear(parseInt(e.target.value));
                  }
                }}
                className="w-full"
              />
              <div className="flex justify-between text-[9px]" style={{ color: theme.textMuted }}>
                <span>1995</span>
                <span>2010</span>
                <span>2026</span>
              </div>
            </div>

            {/* Selected Nodes */}
            {selectedNodes.size > 0 && (
              <div className="mb-4 pt-3" style={{ borderTop: `1px solid ${theme.border}` }}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold" style={{ color: theme.textPrimary }}>
                    Selected Nodes ({selectedNodes.size})
                  </h4>
                  <button
                    onClick={() => setSelectedNodes(new Set())}
                    className="text-[9px] text-[#e53238] hover:underline"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-1">
                  {Array.from(selectedNodes).map(nodeId => {
                    const node = ENRICHED_PROGRAMS.find(n => n.id === nodeId);
                    return node ? (
                      <div
                        key={nodeId}
                        className="text-xs flex items-center justify-between p-1 rounded"
                        style={{ backgroundColor: theme.bgTertiary, color: theme.textSecondary }}
                      >
                        <span>{node.name}</span>
                        <button
                          onClick={() => {
                            const newSet = new Set(selectedNodes);
                            newSet.delete(nodeId);
                            setSelectedNodes(newSet);
                          }}
                          className="text-[#e53238] text-xs hover:font-bold"
                        >
                          ×
                        </button>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}

          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 rounded-lg p-3" style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}` }}>
          <h4 className="text-xs font-bold mb-2" style={{ color: theme.textPrimary }}>Relationship Types</h4>
          <div className="flex flex-col gap-1.5 text-[9px]">
            {Object.entries(LINK_STYLES).slice(0, 6).map(([type, style]) => (
              <div key={type} className="flex items-center gap-2">
                <div
                  className="w-6 h-0.5"
                  style={{
                    backgroundColor: style.color,
                    borderStyle: style.dashArray ? 'dashed' : 'solid',
                  }}
                />
                <span style={{ color: theme.textSecondary }}>{style.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 text-[9px]" style={{ color: theme.textMuted }}>
            {stats.totalRelationships} relationships | {stats.withRelationships} connected nodes
          </div>
        </div>

      </div>

      {/* Bottom controls */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ borderTop: `1px solid ${theme.border}` }}>
        <button
          onClick={() => (window as any).resetView?.()}
          className="px-5 py-2 bg-[#0064d2] text-white rounded text-sm font-medium"
        >
          Reset View
        </button>
        <span className="text-xs font-mono" style={{ color: theme.textMuted }}>
          Zoom: <span id="zoom-level">45%</span>
        </span>
        <div className="flex-1" />
        <div className="text-xs" style={{ color: theme.textMuted }}>
          Hover over nodes to see relationships | Drag to explore | Scroll to zoom
        </div>
      </div>
    </div>
  );
}
