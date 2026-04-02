"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { NavSection } from "@/lib/mdx";

interface SidebarProps {
  sections: NavSection[];
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}
    >
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Sidebar({ sections }: SidebarProps) {
  const pathname = usePathname();
  const basePath = "";

  // Determine which sections start open based on the current path
  const initialOpen: Record<string, boolean> = {};
  for (const section of sections) {
    initialOpen[section.title] = section.items.some(
      (item) => `${basePath}/${item.slug}` === pathname || `${basePath}` === pathname
    );
    // Default "Get Started" to always open
    if (section.title === "Get Started") initialOpen[section.title] = true;
  }

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(initialOpen);

  function toggle(title: string) {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  }

  function isActive(slug: string) {
    const target = `${basePath}/${slug}`;
    return pathname === target;
  }

  return (
    <aside className="fixed top-0 left-0 z-30 hidden h-screen w-[260px] flex-col border-r border-panel-border bg-ocean-dark md:flex">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-panel-border">
        <Link href={`${basePath}`} className="flex items-center gap-3">
          <Image
            src={`/logo.png`}
            alt="Recif"
            width={32}
            height={32}
            className="rounded"
          />
          <span className="text-lg font-semibold text-text-primary tracking-tight">
            Recif
          </span>
          <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-reef-cyan/10 text-reef-cyan">
            docs
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {sections.map((section) => (
          <div key={section.title} className="mb-1">
            <button
              onClick={() => toggle(section.title)}
              className="flex w-full items-center justify-between rounded-md px-2 py-2 text-xs font-semibold uppercase tracking-wider text-text-muted hover:text-text-secondary"
            >
              {section.title}
              <ChevronIcon open={!!openSections[section.title]} />
            </button>

            {openSections[section.title] && (
              <ul className="mt-0.5 mb-2 space-y-0.5">
                {section.items.map((item) => {
                  const active = isActive(item.slug);
                  return (
                    <li key={item.slug}>
                      <Link
                        href={`${basePath}/${item.slug}`}
                        className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                          active
                            ? "border-l-2 border-reef-cyan bg-reef-cyan/8 text-reef-cyan font-medium pl-[10px]"
                            : "text-text-secondary hover:text-text-primary hover:bg-white/[0.03]"
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-panel-border px-5 py-3">
        <p className="text-xs text-text-muted">
          v0.1.0 &middot; Apache 2.0
        </p>
      </div>
    </aside>
  );
}
