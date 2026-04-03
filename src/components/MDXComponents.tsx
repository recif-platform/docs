import React from "react";
import type { MDXComponents as MDXComponentsType } from "mdx/types";
import { Tabs, TabItem, Steps } from "./ClientComponents";

/* ── Icons for callouts ── */
function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 7v4" strokeLinecap="round" />
      <circle cx="8" cy="5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 13h4M6.5 14h3M8 1.5a4.5 4.5 0 00-1.5 8.74V12h3v-1.76A4.5 4.5 0 008 1.5z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 1.5L1 14h14L8 1.5z" strokeLinejoin="round" />
      <path d="M8 6v3.5" strokeLinecap="round" />
      <circle cx="8" cy="11.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ── Heading with anchor ── */
function createHeading(level: 1 | 2 | 3) {
  const Tag = `h${level}` as const;

  function Heading({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    const text = typeof children === "string" ? children : "";
    const id =
      props.id ||
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

    const baseStyles = "text-text-primary tracking-tight";

    const levelStyles: Record<number, { className: string; style?: React.CSSProperties }> = {
      1: {
        className: `${baseStyles} text-3xl font-bold mt-10 mb-4`,
      },
      2: {
        className: `${baseStyles} text-[1.4rem] font-semibold mt-10 mb-4 pb-2.5`,
        style: {
          borderBottom: '1px solid rgba(56, 189, 248, 0.08)',
        },
      },
      3: {
        className: `${baseStyles} text-lg font-semibold mt-8 mb-3`,
      },
    };

    const config = levelStyles[level];

    return (
      <Tag id={id} className={config.className} style={config.style} {...props}>
        {children}
        <a href={`#${id}`} className="heading-anchor" aria-hidden="true">
          #
        </a>
      </Tag>
    );
  }

  Heading.displayName = `Heading${level}`;
  return Heading;
}

/* ── Blockquote with callout detection ── */
function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement<{ children?: React.ReactNode }>(node) && node.props.children) {
    return extractText(node.props.children);
  }
  return "";
}

function stripMarker(children: React.ReactNode, marker: string): React.ReactNode {
  if (typeof children === "string") return children.replace(marker, "").trim();
  if (Array.isArray(children)) return children.map((c) => stripMarker(c, marker));
  if (React.isValidElement<{ children?: React.ReactNode }>(children) && children.props.children) {
    return React.cloneElement(
      children,
      {},
      stripMarker(children.props.children, marker)
    );
  }
  return children;
}

const calloutIcons: Record<string, React.ReactNode> = {
  note: <InfoIcon />,
  tip: <LightbulbIcon />,
  warning: <WarningIcon />,
};

function Blockquote({ children }: { children?: React.ReactNode }) {
  const text = extractText(children);

  const calloutTypes: Record<string, { type: string; label: string }> = {
    "[!NOTE]": { type: "note", label: "Note" },
    "[!TIP]": { type: "tip", label: "Tip" },
    "[!WARNING]": { type: "warning", label: "Warning" },
  };

  for (const [marker, config] of Object.entries(calloutTypes)) {
    if (text.includes(marker)) {
      return (
        <div className={`callout callout-${config.type}`}>
          <p className="callout-title">
            {calloutIcons[config.type]}
            {config.label}
          </p>
          <div className="text-sm text-text-secondary leading-relaxed">
            {stripMarker(children, marker)}
          </div>
        </div>
      );
    }
  }

  return (
    <blockquote
      className="pl-4 my-6 text-text-secondary italic"
      style={{
        borderLeft: '3px solid rgba(56, 189, 248, 0.25)',
      }}
    >
      {children}
    </blockquote>
  );
}

/* ── Exports ── */
export function getMDXComponents(): MDXComponentsType {
  return {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    blockquote: Blockquote as MDXComponentsType["blockquote"],
    a: ({ href, children, ...props }) => (
      <a
        href={href}
        className="link-animated"
        style={{ color: '#22d3ee' }}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    ),
    p: ({ children, ...props }) => (
      <p className="my-4 text-text-secondary leading-7 text-[15px]" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="my-4 ml-4 space-y-2 list-disc text-text-secondary reef-list" style={{ }} {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="my-4 ml-4 space-y-2 list-decimal text-text-secondary" style={{ }} {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-7 text-[15px]" {...props}>
        {children}
      </li>
    ),
    table: ({ children, ...props }) => (
      <div
        className="my-6 overflow-x-auto rounded-xl"
        style={{
          background: 'rgba(10, 24, 45, 0.7)',
          border: '1px solid rgba(56, 189, 248, 0.1)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(34, 211, 238, 0.04)',
        }}
      >
        <table className="w-full text-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead
        style={{
          background: 'rgba(13, 31, 56, 0.5)',
          borderBottom: '1px solid rgba(56, 189, 248, 0.08)',
          position: 'sticky' as const,
          top: 0,
        }}
        {...props}
      >
        {children}
      </thead>
    ),
    th: ({ children, ...props }) => (
      <th
        className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-text-muted"
        {...props}
      >
        {children}
      </th>
    ),
    tr: ({ children, ...props }) => (
      <tr className="reef-table-row" {...props}>
        {children}
      </tr>
    ),
    td: ({ children, ...props }) => (
      <td
        className="px-4 py-3 text-[13.5px] text-text-secondary"
        style={{ borderTop: '1px solid rgba(56, 189, 248, 0.05)' }}
        {...props}
      >
        {children}
      </td>
    ),
    pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
      <pre
        className="my-6 overflow-x-auto rounded-xl p-5 text-sm leading-relaxed"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          background: 'rgba(10, 24, 45, 0.7)',
          border: '1px solid rgba(56, 189, 248, 0.1)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(34, 211, 238, 0.04)',
        }}
        {...props}
      >
        {children}
      </pre>
    ),
    code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
      // Inline code (no className and no data-language = not from rehype-pretty-code)
      const isBlock = className || (props as Record<string, unknown>)["data-language"];
      if (!isBlock) {
        return (
          <code
            className="rounded-md text-sm"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              background: 'rgba(13, 31, 56, 0.8)',
              border: '1px solid rgba(56, 189, 248, 0.12)',
              padding: '0.15em 0.45em',
              color: '#22d3ee',
            }}
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    hr: () => (
      <hr
        className="my-10 reef-hr"
      />
    ),
    img: ({ alt, ...props }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={alt || ""}
        className="rounded-xl my-6"
        style={{
          border: '1px solid rgba(56, 189, 248, 0.1)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)',
        }}
        {...props}
      />
    ),
    strong: ({ children, ...props }) => (
      <strong className="font-semibold" style={{ color: '#f1f5f9' }} {...props}>
        {children}
      </strong>
    ),
    // Custom client components
    Tabs,
    TabItem,
    Steps,
  };
}
