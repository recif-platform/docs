"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { NavSection } from "@/lib/mdx";

interface MobileSidebarProps {
  sections: NavSection[];
}

export default function MobileSidebar({ sections }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const basePath = "";

  function isActive(slug: string) {
    return pathname === `${basePath}/${slug}`;
  }

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-ocean-dark border border-panel-border"
        aria-label="Open menu"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M3 5h14M3 10h14M3 15h14"
            stroke="#e2e8f0"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`md:hidden fixed top-0 left-0 z-50 h-screen w-[280px] bg-ocean-dark border-r border-panel-border transform transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-panel-border">
          <Link
            href={`${basePath}`}
            className="flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <Image
              src={`${basePath}/logo.svg`}
              alt="Recif"
              width={28}
              height={28}
              className="rounded"
            />
            <span className="text-lg font-semibold text-text-primary">Recif</span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="p-1 text-text-muted hover:text-text-primary"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="overflow-y-auto py-4 px-3" style={{ maxHeight: "calc(100vh - 72px)" }}>
          {sections.map((section) => (
            <div key={section.title} className="mb-3">
              <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-text-muted">
                {section.title}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const active = isActive(item.slug);
                  return (
                    <li key={item.slug}>
                      <Link
                        href={`${basePath}/${item.slug}`}
                        onClick={() => setOpen(false)}
                        className={`block rounded-md px-3 py-1.5 text-sm ${
                          active
                            ? "border-l-2 border-reef-cyan bg-reef-cyan/8 text-reef-cyan font-medium pl-[10px]"
                            : "text-text-secondary hover:text-text-primary"
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
