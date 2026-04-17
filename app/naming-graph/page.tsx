"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function NamingGraphPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const timelineIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    // Load D3
    const script = document.createElement('script');
    script.src = 'https://d3js.org/d3.v7.min.js';
    script.async = true;
    script.onload = () => initGraph();
    document.head.appendChild(script);

    return () => {
      // Cleanup timeline interval
      if (timelineIntervalRef.current) {
        clearInterval(timelineIntervalRef.current);
      }
      // Cleanup window functions
      delete (window as any).resetView;
      delete (window as any).centerOnProposed;
      delete (window as any).togglePhysics;
      delete (window as any).replayAnimation;
      // Remove script if it still exists
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, [isClient]);

  const initGraph = () => {
    // @ts-ignore - D3 loaded dynamically
    if (typeof d3 === 'undefined') return;

    // @ts-ignore
    const d3 = window.d3;

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Clear any existing SVG
    d3.select(container).selectAll('*').remove();

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g');

    // Define all nodes with launch years
    const nodesData = [
      // Masterbrand
      { id: "masterbrand", label: "eBay\nMasterbrand", color: "#e53238", size: 50, type: "masterbrand", year: 1995,
        items: ["eBay (lowercase e, capital B)", "Anchors full portfolio"] },

      // Main categories
      { id: "motors", label: "eBay\nMotors", color: "#0064d2", size: 35, type: "category", year: 2000,
        items: ["Vehicles & Parts", "Authenticity Guarantee for Watches", "eBay Guaranteed Fit", "My Garage", "Parts Compatibility"] },
      { id: "collectibles", label: "Collectibles\n& Trading", color: "#0064d2", size: 35, type: "category", year: 2020,
        items: ["Trading Cards", "PSA Vault (was eBay Vault)", "Goldin Auctions (2024)", "TCGplayer (2022)", "Price Guide"] },
      { id: "fashion", label: "Fashion /\nLuxury", color: "#0064d2", size: 35, type: "category", year: 2018,
        items: ["Authenticity Guarantee verticals", "Circular Fashion Fund $350K", "Brand Outlet", "Vogue Vintage Market"] },
      { id: "refurb", label: "Refurbished\n& Open Box", color: "#0064d2", size: 35, type: "category", year: 2016,
        items: ["eBay Refurbished", "eBay Certified Open Box (2025)", "Allstate Protection", "Re-Store (Germany)"] },
      { id: "trust", label: "Trust &\nSafety", color: "#f5af02", size: 32, type: "trust", year: 1996,
        items: ["eBay Money Back Guarantee", "VeRO Program", "Feedback Forum (1996)", "Resolution Center"] },
      { id: "advertising", label: "eBay\nAdvertising", color: "#86b817", size: 32, type: "advertising", year: 2015,
        items: ["Promoted Listings (PLG/PLP)", "Promoted Offsite", "Promoted Stores", "Automated Campaigns (2025)"] },
      { id: "shipping", label: "Shipping &\nLogistics", color: "#0064d2", size: 32, type: "category", year: 2010,
        items: ["eBay Labels", "eBay International Shipping", "Fulfillment by eBay", "eBay Standard Envelope"] },
      { id: "stores", label: "eBay\nStores", color: "#0064d2", size: 32, type: "category", year: 2001,
        items: ["5 Tiers: Starter to Enterprise", "Regional: Shops (UK), Boutiques (FR)", "eBay Pro (AU April 2026)"] },
      { id: "seller", label: "Seller Tools\n& Hub", color: "#0064d2", size: 32, type: "category", year: 2015,
        items: ["Seller Hub (2015)", "Magical Listing Tool", "Product Research", "Historic: Turbo Lister, Selling Manager"] },
      { id: "payments", label: "Payments &\nCheckout", color: "#0064d2", size: 32, type: "category", year: 1999,
        items: ["eBay Payments", "eBay Wallet", "Riverty (Germany 2024)", "Historic: Billpoint (1999-2003)"] },
      { id: "live", label: "Live\nCommerce", color: "#7c3aed", size: 28, type: "program", year: 2021,
        items: ["eBay Live", "eBay Live on Tour", "Creator Studio"] },
      { id: "discovery", label: "Discovery", color: "#7c3aed", size: 28, type: "program", year: 2008,
        items: ["My eBay", "Watchlist", "Best Match (2008)", "Image Search"] },
      { id: "community", label: "Community &\nEducation", color: "#7c3aed", size: 28, type: "program", year: 2010,
        items: ["eBay Academy", "Up & Running", "Ambassador Program"] },
      { id: "impact", label: "Social\nImpact", color: "#7c3aed", size: 28, type: "program", year: 2003,
        items: ["eBay for Charity", "Circular Commerce", "Women's Initiative Network"] },
      { id: "developer", label: "Developer\n& API", color: "#7c3aed", size: 28, type: "program", year: 2000,
        items: ["eBay Developer Program", "Sell/Buy/Order APIs", "Techstars (2023)"] },

      // V2 nodes
      { id: "v2stats", label: "V2 Stats", color: "#7c3aed", size: 30, type: "v2", year: 2026,
        items: ["438+ items total", "66 historic programs", "152 regional variants", "7 markets", "31 years (1995-2026)"] },
      { id: "regional", label: "Regional\nVariants", color: "#7c3aed", size: 26, type: "v2", year: 2000,
        items: ["Stores → Shops → Boutiques", "Seller Hub → Seller Centre", "Money Back Guarantee translations"] },

      // Proposed nodes
      { id: "proposed-shipping", label: "💡 eBay\nTrusted\nShipping", color: "#86b817", size: 38, type: "proposed", year: 2027,
        items: ["PROPOSED UMBRELLA", "Value: Easy, Trusted, Cost-effective", "", "eTS Labels", "eTS Simple Delivery (NEW)", "eTS International Shipping", "eTS Speedpak (NEW)", "eTS Fulfillment", "eTS Standard Envelope"] },
      { id: "proposed-verified", label: "💡 eBay\nVerified", color: "#86b817", size: 32, type: "proposed", year: 2027,
        items: ["PROPOSED UMBRELLA", "Authenticity Guarantee", "Verified Condition", "Identity Verification"] },

      // Legacy
      { id: "legacy", label: "Historic\nPrograms", color: "#6b7280", size: 26, type: "legacy", year: 1995,
        items: ["AuctionWeb → eBay (1995-1997)", "Billpoint → PayPal (1999-2003)", "Turbo Lister (2002-2020)", "X.commerce (2011-2013)"] }
    ];

    const linksData = [
      // Masterbrand connections
      { source: "masterbrand", target: "motors" },
      { source: "masterbrand", target: "collectibles" },
      { source: "masterbrand", target: "fashion" },
      { source: "masterbrand", target: "refurb" },
      { source: "masterbrand", target: "trust" },
      { source: "masterbrand", target: "advertising" },
      { source: "masterbrand", target: "shipping" },
      { source: "masterbrand", target: "stores" },
      { source: "masterbrand", target: "seller" },
      { source: "masterbrand", target: "payments" },
      { source: "masterbrand", target: "live" },
      { source: "masterbrand", target: "discovery" },
      { source: "masterbrand", target: "community" },
      { source: "masterbrand", target: "impact" },
      { source: "masterbrand", target: "developer" },
      { source: "masterbrand", target: "v2stats" },
      { source: "masterbrand", target: "regional" },
      { source: "masterbrand", target: "legacy" },
      { source: "shipping", target: "proposed-shipping", dashed: true },
      { source: "trust", target: "proposed-verified", dashed: true }
    ];

    // Set initial opacity to 0 for animation
    nodesData.forEach(n => (n as any).opacity = 0);

    // Create force simulation with improved physics
    const simulation = d3.forceSimulation(nodesData)
      .force("link", d3.forceLink(linksData).id((d: any) => d.id).distance((d: any) => {
        if (d.source.type === 'masterbrand') return 350;
        if (d.source.type === 'category') return 100;
        if (d.source.type === 'proposed') return 80;
        return 120;
      }).strength(0.3))
      .force("charge", d3.forceManyBody().strength((d: any) => {
        if (d.type === 'masterbrand') return -2000;
        if (d.type === 'category') return -600;
        if (d.type === 'proposed') return -400;
        return -150;
      }))
      .force("center", d3.forceCenter(width / 2, height / 2).strength(0.02))
      .force("collision", d3.forceCollide().radius((d: any) => d.size + 15).strength(0.7))
      .force("radial", d3.forceRadial((d: any) => {
        if (d.type === 'category') return 350;
        return 0;
      }, width / 2, height / 2).strength((d: any) => d.type === 'category' ? 0.5 : 0))
      .alphaDecay(0.01)
      .velocityDecay(0.3);

    // Create links
    const link = g.append("g")
      .selectAll("line")
      .data(linksData)
      .join("line")
      .attr("stroke", (d: any) => d.dashed ? "#86b817" : "#e53238")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", (d: any) => d.dashed ? "5,5" : "none");

    // Create nodes
    const node = g.append("g")
      .selectAll("g")
      .data(nodesData)
      .join("g")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any);

    // Add circles
    node.append("circle")
      .attr("r", (d: any) => d.size)
      .attr("fill", (d: any) => d.color)
      .attr("stroke", "rgba(255,255,255,0.3)")
      .attr("stroke-width", 3)
      .style("cursor", "pointer")
      .attr("opacity", 0)
      .on("click", (event: any, d: any) => showDetails(d));

    // Add labels
    node.append("text")
      .text((d: any) => d.label)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", "white")
      .attr("font-size", (d: any) => Math.max(10, d.size / 4))
      .attr("font-weight", "600")
      .style("pointer-events", "none")
      .style("user-select", "none")
      .attr("opacity", 0)
      .each(function(d: any) {
        const text = d3.select(this);
        const lines = d.label.split('\n');
        text.text('');
        lines.forEach((line: string, i: number) => {
          text.append('tspan')
            .attr('x', 0)
            .attr('dy', i === 0 ? 0 : '1.1em')
            .text(line);
        });
      });

    // Update positions
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Drag functions with 3-second delay
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      setTimeout(() => {
        d.fx = null;
        d.fy = null;
      }, 3000);
    }

    // Zoom
    const zoom = d3.zoom()
      .scaleExtent([0.3, 3])
      .on("zoom", (event: any) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom as any);

    // Timeline animation
    let currentYear = 1995;
    const maxYear = 2027;
    const yearInterval = 1500; // 1.5 seconds per year

    timelineIntervalRef.current = setInterval(() => {
      if (currentYear > maxYear) {
        if (timelineIntervalRef.current) {
          clearInterval(timelineIntervalRef.current);
          timelineIntervalRef.current = null;
        }
        return;
      }

      // Update year display
      const yearDisplay = document.getElementById('timeline-year');
      if (yearDisplay) {
        yearDisplay.textContent = currentYear.toString();
      }

      // Fade in nodes from this year
      node.selectAll("circle")
        .filter((d: any) => d.year === currentYear)
        .transition()
        .duration(800)
        .attr("opacity", 1);

      node.selectAll("text")
        .filter((d: any) => d.year === currentYear)
        .transition()
        .duration(800)
        .attr("opacity", 1);

      currentYear++;
    }, yearInterval);

    // Details panel
    function showDetails(d: any) {
      const details = document.getElementById('details-panel');
      if (!details) return;

      details.innerHTML = `
        <h3 style="margin: 0 0 15px 0; font-size: 16px;">${d.label.replace(/\n/g, ' ')}</h3>
        <div style="color: ${d.color}; font-weight: 600; margin-bottom: 10px;">${d.type.toUpperCase()}</div>
        <ul style="margin: 10px 0; padding-left: 20px;">
          ${d.items.map((item: string) => `<li style="margin: 5px 0; font-size: 13px;">${item}</li>`).join('')}
        </ul>
      `;
      details.style.display = 'block';
    }

    // Reset view function
    (window as any).resetView = () => {
      svg.transition().duration(750).call(
        zoom.transform as any,
        d3.zoomIdentity
      );
    };

    // Center on proposed
    (window as any).centerOnProposed = () => {
      const node = nodesData.find(n => n.id === 'proposed-shipping');
      if (node) {
        const scale = 1.5;
        const x = width / 2 - (node as any).x * scale;
        const y = height / 2 - (node as any).y * scale;

        svg.transition().duration(750).call(
          zoom.transform as any,
          d3.zoomIdentity.translate(x, y).scale(scale)
        );

        setTimeout(() => showDetails(node), 800);
      }
    };

    // Toggle physics
    let physicsRunning = true;
    (window as any).togglePhysics = () => {
      const btn = document.getElementById('physics-btn');
      if (physicsRunning) {
        simulation.stop();
        if (btn) btn.textContent = '▶️ Resume';
      } else {
        simulation.restart();
        if (btn) btn.textContent = '⏸️ Pause';
      }
      physicsRunning = !physicsRunning;
    };

    // Replay animation
    (window as any).replayAnimation = () => {
      // Clear existing interval
      if (timelineIntervalRef.current) {
        clearInterval(timelineIntervalRef.current);
      }

      // Reset all nodes to invisible
      node.selectAll("circle").attr("opacity", 0);
      node.selectAll("text").attr("opacity", 0);

      // Restart timeline
      let currentYear = 1995;
      const maxYear = 2027;
      const yearInterval = 1500;

      timelineIntervalRef.current = setInterval(() => {
        if (currentYear > maxYear) {
          if (timelineIntervalRef.current) {
            clearInterval(timelineIntervalRef.current);
            timelineIntervalRef.current = null;
          }
          return;
        }

        const yearDisplay = document.getElementById('timeline-year');
        if (yearDisplay) {
          yearDisplay.textContent = currentYear.toString();
        }

        node.selectAll("circle")
          .filter((d: any) => d.year === currentYear)
          .transition()
          .duration(800)
          .attr("opacity", 1);

        node.selectAll("text")
          .filter((d: any) => d.year === currentYear)
          .transition()
          .duration(800)
          .attr("opacity", 1);

        currentYear++;
      }, yearInterval);
    };
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white overflow-hidden">
      {/* Header */}
      <header className="bg-black border-b border-slate-700 px-6 py-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Studio</span>
          </Link>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-semibold">eBay Naming Graph V2</h1>
            <p className="text-sm text-slate-400">438+ items • 31 years • 7 markets</p>
          </div>
        </div>
      </header>

      {/* Info Panel */}
      <div style={{
        position: 'fixed',
        top: '100px',
        left: '20px',
        background: 'rgba(0,0,0,0.9)',
        padding: '20px',
        borderRadius: '10px',
        border: '2px solid #333',
        maxWidth: '300px',
        zIndex: 10
      }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#e53238', fontSize: '18px' }}>Timeline</h2>
        <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#86b817', margin: '10px 0' }} id="timeline-year">
          1995
        </div>
        <p style={{ margin: '5px 0', fontSize: '13px', lineHeight: '1.5' }}>🖱️ <strong>Drag nodes</strong> to move</p>
        <p style={{ margin: '5px 0', fontSize: '13px', lineHeight: '1.5' }}>🖱️ <strong>Click nodes</strong> for details</p>
        <p style={{ margin: '5px 0', fontSize: '13px', lineHeight: '1.5' }}>🖱️ <strong>Drag background</strong> to pan</p>
      </div>

      {/* Details Panel */}
      <div id="details-panel" style={{
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: 'rgba(0,0,0,0.9)',
        padding: '20px',
        borderRadius: '10px',
        border: '2px solid #333',
        maxWidth: '350px',
        maxHeight: '80vh',
        overflowY: 'auto',
        display: 'none',
        zIndex: 10
      }}></div>

      {/* Controls */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        display: 'flex',
        gap: '10px',
        zIndex: 10
      }}>
        <button
          onClick={() => (window as any).resetView?.()}
          style={{
            padding: '12px 20px',
            background: '#0064d2',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          🏠 Reset
        </button>
        <button
          onClick={() => (window as any).centerOnProposed?.()}
          style={{
            padding: '12px 20px',
            background: '#0064d2',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          💡 Proposed
        </button>
        <button
          onClick={() => (window as any).replayAnimation?.()}
          style={{
            padding: '12px 20px',
            background: '#86b817',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          🔄 Replay
        </button>
        <button
          id="physics-btn"
          onClick={() => (window as any).togglePhysics?.()}
          style={{
            padding: '12px 20px',
            background: '#0064d2',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          ⏸️ Pause
        </button>
      </div>

      {/* Legend */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'rgba(0,0,0,0.9)',
        padding: '15px',
        borderRadius: '10px',
        border: '2px solid #333',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0', fontSize: '12px' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#e53238', marginRight: '10px', border: '2px solid rgba(255,255,255,0.3)' }}></div>
          <span>Masterbrand</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0', fontSize: '12px' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#0064d2', marginRight: '10px', border: '2px solid rgba(255,255,255,0.3)' }}></div>
          <span>Category</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0', fontSize: '12px' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#86b817', marginRight: '10px', border: '2px solid rgba(255,255,255,0.3)' }}></div>
          <span>Proposed</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0', fontSize: '12px' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#7c3aed', marginRight: '10px', border: '2px solid rgba(255,255,255,0.3)' }}></div>
          <span>Program</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0', fontSize: '12px' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#6b7280', marginRight: '10px', border: '2px solid rgba(255,255,255,0.3)' }}></div>
          <span>Legacy</span>
        </div>
      </div>

      {/* Graph Container */}
      <div
        ref={containerRef}
        style={{
          width: '100vw',
          height: 'calc(100vh - 80px)',
          background: 'radial-gradient(circle at center, #1e1e1e 0%, #0a0a0a 100%)'
        }}
      ></div>
    </div>
  );
}
