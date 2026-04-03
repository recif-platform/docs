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
      width="14"
      height="14"
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

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
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
    <aside className="fixed top-0 left-0 z-30 hidden h-screen w-[260px] flex-col md:flex"
      style={{
        background: 'linear-gradient(180deg, #071220 0%, #050e1a 100%)',
        borderRight: '1px solid rgba(56, 189, 248, 0.08)',
      }}
    >
      {/* Decorative top gradient line */}
      <div
        className="h-[2px] w-full shrink-0"
        style={{
          background: 'linear-gradient(90deg, #22d3ee, #a78bfa, #22d3ee)',
          opacity: 0.6,
        }}
      />

      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5" style={{ borderBottom: '1px solid rgba(56, 189, 248, 0.06)' }}>
        <Link href={`${basePath}`} className="flex items-center gap-3 group">
          <div className="relative">
            <div
              className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)' }}
            />
            <Image
              src="/docs/logo.png"
              alt="Récif"
              width={34}
              height={34}
              className="rounded relative"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-text-primary tracking-tight">
              Récif
            </span>
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
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {sections.map((section, sectionIdx) => (
          <div key={section.title} className={sectionIdx > 0 ? "mt-1" : ""}>
            {sectionIdx > 0 && (
              <div className="mx-2 mb-2 mt-1" style={{ borderTop: '1px solid rgba(56, 189, 248, 0.05)' }} />
            )}
            <button
              onClick={() => toggle(section.title)}
              className="flex w-full items-center justify-between rounded-md px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted hover:text-text-secondary transition-colors duration-200"
            >
              <span className="flex items-center gap-2">
                <span
                  className="inline-block w-1 h-1 rounded-full"
                  style={{ background: '#22d3ee', boxShadow: '0 0 4px rgba(34, 211, 238, 0.4)' }}
                />
                {section.title}
              </span>
              <ChevronIcon open={!!openSections[section.title]} />
            </button>

            {openSections[section.title] && (
              <ul className="mt-0.5 mb-2 space-y-0.5 ml-1">
                {section.items.map((item) => {
                  const active = isActive(item.slug);
                  return (
                    <li key={item.slug}>
                      <Link
                        href={`${basePath}/${item.slug}`}
                        className={`block rounded-lg px-3 py-1.5 text-[13px] transition-all duration-200 ${
                          active
                            ? "font-medium pl-[10px]"
                            : "text-text-secondary hover:text-text-primary"
                        }`}
                        style={
                          active
                            ? {
                                borderLeft: '2px solid #22d3ee',
                                background: 'rgba(34, 211, 238, 0.06)',
                                color: '#22d3ee',
                                boxShadow: 'inset 0 0 20px rgba(34, 211, 238, 0.03)',
                              }
                            : undefined
                        }
                        onMouseEnter={(e) => {
                          if (!active) {
                            e.currentTarget.style.background = 'rgba(56, 189, 248, 0.04)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!active) {
                            e.currentTarget.style.background = 'transparent';
                          }
                        }}
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
      <div
        className="px-5 py-3.5"
        style={{ borderTop: '1px solid rgba(56, 189, 248, 0.06)' }}
      >
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-text-muted font-medium">
            v0.1.0 &middot; Apache 2.0
          </p>
          <div className="flex items-center gap-2.5">
            <a
              href="https://github.com/recif-platform"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text-secondary transition-colors duration-200"
              aria-label="GitHub"
            >
              <GithubIcon />
            </a>
            <a
              href="https://discord.gg/P279TT4ZCp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text-secondary transition-colors duration-200"
              aria-label="Discord"
            >
              <DiscordIcon />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
