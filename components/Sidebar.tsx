"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowUp,
  Wand2,
  BadgeCheck,
  Shield,
  Database,
  BookOpen,
  BarChart2,
  TestTube2,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const STORAGE_KEY = "naming-studio-sidebar-open";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage after mount to avoid SSR mismatch
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) setOpen(stored === "true");
    setMounted(true);
  }, []);

  const toggle = () => {
    setOpen((v) => {
      localStorage.setItem(STORAGE_KEY, String(!v));
      return !v;
    });
  };

  const link = (href: string, icon: React.ReactNode, label: React.ReactNode, title: string) => (
    <Link
      href={href}
      title={title}
      className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-colors text-sm ${
        pathname === href
          ? "bg-white/10 text-white"
          : "text-white/60 hover:bg-white/10 hover:text-white"
      } ${!open ? "justify-center" : ""}`}
    >
      {icon}
      {open && label}
    </Link>
  );

  // Width: collapsed = 52px, expanded = 260px. Use 0 width before mount to avoid flash.
  const width = !mounted ? 52 : open ? 260 : 52;

  return (
    <motion.aside
      animate={{ width }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="bg-[#171717] text-white flex flex-col flex-shrink-0 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center px-3 py-4 border-b border-white/10 min-w-0">
        {open && (
          <span className="flex-1 text-sm font-semibold truncate mr-2">Naming Studio</span>
        )}
        <button
          type="button"
          onClick={toggle}
          className={`p-1 rounded hover:bg-white/10 transition-colors flex-shrink-0 ${!open ? "mx-auto" : ""}`}
          title={open ? "Collapse sidebar" : "Expand sidebar"}
        >
          {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </div>

      {/* ── WORKFLOW group ── */}
      {open && (
        <p className="text-[10px] text-white/30 uppercase tracking-widest px-4 pt-3 pb-1">Workflow</p>
      )}
      <div className="px-2 pb-1">
        {link(
          "/",
          <ArrowUp className="h-4 w-4 flex-shrink-0" />,
          <span className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold bg-white/15 text-white/70 px-1 rounded">1</span>
            Evaluate Brief
          </span>,
          "Step 1: Evaluate Brief"
        )}
        {link(
          "/name-generator",
          <Wand2 className="h-4 w-4 flex-shrink-0" />,
          <span className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold bg-white/15 text-white/70 px-1 rounded">2</span>
            Generate Names
          </span>,
          "Step 2: Generate Names"
        )}
        {link(
          "/name-validator",
          <BadgeCheck className="h-4 w-4 flex-shrink-0" />,
          <span className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold bg-white/15 text-white/70 px-1 rounded">3</span>
            Validate Names
          </span>,
          "Step 3: Validate Names"
        )}
        <div
          className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm opacity-40 cursor-default ${!open ? "justify-center" : ""}`}
          title="Legal Screen — coming soon"
        >
          <Shield className="h-4 w-4 flex-shrink-0" />
          {open && (
            <span className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold bg-white/15 text-white/70 px-1 rounded">4</span>
              Legal Screen
              <span className="text-[8px] font-semibold text-white/40 uppercase tracking-wide ml-1">Soon</span>
            </span>
          )}
        </div>
      </div>

      {/* ── REPOSITORY group ── */}
      {open && (
        <p className="text-[10px] text-white/30 uppercase tracking-widest px-4 pt-3 pb-1">Repository</p>
      )}
      <div className="px-2 pb-1">
        {link(
          "/registry",
          <Database className="h-4 w-4 flex-shrink-0" />,
          <span>Naming Registry</span>,
          "Naming Registry"
        )}
        {link(
          "/corpus",
          <BookOpen className="h-4 w-4 flex-shrink-0" />,
          <span>Decision History</span>,
          "Decision History"
        )}
      </div>

      {/* ── PLATFORM group ── */}
      {open && (
        <p className="text-[10px] text-white/30 uppercase tracking-widest px-4 pt-3 pb-1">Platform</p>
      )}
      <div className="px-2 pb-2">
        {link(
          "/analytics",
          <BarChart2 className="h-4 w-4 flex-shrink-0" />,
          <span>Analytics</span>,
          "Analytics"
        )}
        {link(
          "/lab",
          <TestTube2 className="h-4 w-4 flex-shrink-0" />,
          <span>Lab</span>,
          "Lab"
        )}
        {link(
          "/governance",
          <Shield className="h-4 w-4 flex-shrink-0" />,
          <span>Governance</span>,
          "AI Governance"
        )}
        {link(
          "/admin",
          <Settings className="h-4 w-4 flex-shrink-0" />,
          <span>Admin</span>,
          "Admin"
        )}
      </div>
    </motion.aside>
  );
}
