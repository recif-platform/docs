"use client";

import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

function extractHeadings(content: string): TOCItem[] {
  const headings: TOCItem[] = [];
  const lines = content.split("\n");
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      headings.push({ id, text, level });
    }
  }

  return headings;
}

interface Props {
  content: string;
}

export default function TableOfContents({ content }: Props) {
  const headings = extractHeadings(content);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="hidden xl:block w-[200px] shrink-0">
      <div className="sticky top-20">
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.1em] mb-4"
          style={{ color: '#64748b' }}
        >
          On this page
        </p>
        <ul
          className="space-y-0.5 relative"
          style={{ borderLeft: '1px solid rgba(56, 189, 248, 0.08)' }}
        >
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className={`block text-[12.5px] leading-snug py-1 transition-all duration-200 ${
                    heading.level === 3 ? "pl-5" : "pl-3.5"
                  }`}
                  style={
                    isActive
                      ? {
                          color: '#22d3ee',
                          borderLeft: '2px solid #22d3ee',
                          marginLeft: '-1px',
                          paddingLeft: heading.level === 3 ? '18px' : '12px',
                          background: 'rgba(34, 211, 238, 0.03)',
                          borderRadius: '0 4px 4px 0',
                        }
                      : {
                          color: '#64748b',
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#94a3b8';
                      e.currentTarget.style.background = 'rgba(56, 189, 248, 0.02)';
                      e.currentTarget.style.borderRadius = '0 4px 4px 0';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#64748b';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
