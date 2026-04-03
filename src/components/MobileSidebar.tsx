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
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg transition-all duration-200"
        style={{
          background: 'rgba(10, 24, 45, 0.8)',
          border: '1px solid rgba(56, 189, 248, 0.1)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3)',
        }}
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
          className="md:hidden fixed inset-0 z-40"
          style={{
            background: 'rgba(3, 10, 20, 0.7)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`md:hidden fixed top-0 left-0 z-50 h-screen w-[280px] transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: 'linear-gradient(180deg, #071220 0%, #050e1a 100%)',
          borderRight: '1px solid rgba(56, 189, 248, 0.08)',
          boxShadow: open ? '4px 0 30px rgba(0, 0, 0, 0.4)' : 'none',
        }}
      >
        {/* Decorative top gradient line */}
        <div
          className="h-[2px] w-full"
          style={{
            background: 'linear-gradient(90deg, #22d3ee, #a78bfa, #22d3ee)',
            opacity: 0.6,
          }}
        />

        <div
          className="flex items-center justify-between px-5 py-5"
          style={{ borderBottom: '1px solid rgba(56, 189, 248, 0.06)' }}
        >
          <Link
            href={`${basePath}`}
            className="flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/docs/logo.png"
              alt="Récif"
              width={30}
              height={30}
              className="rounded"
            />
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-text-primary tracking-tight">Récif</span>
              <span
                className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md uppercase tracking-wider"
                style={{
                  background: 'rgba(34, 211, 238, 0.08)',
                  color: '#22d3ee',
                  border: '1px solid rgba(34, 211, 238, 0.15)',
                }}
              >
                docs
              </span>
            </div>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary transition-colors duration-200"
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
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
          {sections.map((section, sectionIdx) => (
            <div key={section.title} className={sectionIdx > 0 ? "mt-1" : ""}>
              {sectionIdx > 0 && (
                <div className="mx-2 mb-2 mt-1" style={{ borderTop: '1px solid rgba(56, 189, 248, 0.05)' }} />
              )}
              <p className="flex items-center gap-2 px-2 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">
                <span
                  className="inline-block w-1 h-1 rounded-full"
                  style={{ background: '#22d3ee', boxShadow: '0 0 4px rgba(34, 211, 238, 0.4)' }}
                />
                {section.title}
              </p>
              <ul className="space-y-0.5 ml-1">
                {section.items.map((item) => {
                  const active = isActive(item.slug);
                  return (
                    <li key={item.slug}>
                      <Link
                        href={`${basePath}/${item.slug}`}
                        onClick={() => setOpen(false)}
                        className={`block rounded-lg px-3 py-1.5 text-[13px] transition-all duration-200 ${
                          active
                            ? "font-medium"
                            : "text-text-secondary hover:text-text-primary"
                        }`}
                        style={
                          active
                            ? {
                                borderLeft: '2px solid #22d3ee',
                                paddingLeft: '10px',
                                background: 'rgba(34, 211, 238, 0.06)',
                                color: '#22d3ee',
                                boxShadow: 'inset 0 0 20px rgba(34, 211, 238, 0.03)',
                              }
                            : undefined
                        }
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

        {/* Footer */}
        <div
          className="absolute bottom-0 left-0 right-0 px-5 py-3.5"
          style={{ borderTop: '1px solid rgba(56, 189, 248, 0.06)' }}
        >
          <p className="text-[11px] text-text-muted font-medium">
            v0.1.0 &middot; Apache 2.0
          </p>
        </div>
      </div>
    </>
  );
}
