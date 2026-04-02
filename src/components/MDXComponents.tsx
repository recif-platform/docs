import React from "react";
import type { MDXComponents as MDXComponentsType } from "mdx/types";
import { Tabs, TabItem, Steps } from "./ClientComponents";

/* ── Heading with anchor ── */
function createHeading(level: 1 | 2 | 3) {
  const Tag = `h${level}` as const;
  const styles: Record<number, string> = {
    1: "text-3xl font-bold mt-10 mb-4 text-text-primary",
    2: "text-2xl font-semibold mt-10 mb-4 text-text-primary border-b border-panel-border pb-2",
    3: "text-xl font-semibold mt-8 mb-3 text-text-primary",
  };

  function Heading({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    const text = typeof children === "string" ? children : "";
    const id =
      props.id ||
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

    return (
      <Tag id={id} className={styles[level]} {...props}>
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
          <p className="callout-title">{config.label}</p>
          <div className="text-sm text-text-secondary leading-relaxed">
            {stripMarker(children, marker)}
          </div>
        </div>
      );
    }
  }

  return (
    <blockquote className="border-l-3 border-reef-blue/40 pl-4 my-6 text-text-secondary italic">
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
        className="text-reef-cyan hover:text-reef-cyan/80 underline underline-offset-2 decoration-reef-cyan/30"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    ),
    p: ({ children, ...props }) => (
      <p className="my-4 text-text-secondary leading-7" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="my-4 ml-4 space-y-2 list-disc text-text-secondary marker:text-text-muted" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="my-4 ml-4 space-y-2 list-decimal text-text-secondary marker:text-text-muted" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-7" {...props}>
        {children}
      </li>
    ),
    table: ({ children, ...props }) => (
      <div className="my-6 overflow-x-auto reef-glass">
        <table className="w-full text-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="border-b border-panel-border bg-ocean-mid/50" {...props}>
        {children}
      </thead>
    ),
    th: ({ children, ...props }) => (
      <th
        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="px-4 py-3 text-text-secondary border-t border-panel-border" {...props}>
        {children}
      </td>
    ),
    pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
      <pre
        className="my-6 overflow-x-auto rounded-xl border border-panel-border bg-ocean-mid p-5 text-sm leading-relaxed"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
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
            className="rounded bg-ocean-mid px-1.5 py-0.5 text-sm text-reef-cyan border border-panel-border"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
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
    hr: () => <hr className="my-8 border-panel-border" />,
    img: ({ alt, ...props }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img alt={alt || ""} className="rounded-lg border border-panel-border my-6" {...props} />
    ),
    strong: ({ children, ...props }) => (
      <strong className="font-semibold text-text-primary" {...props}>
        {children}
      </strong>
    ),
    // Custom client components
    Tabs,
    TabItem,
    Steps,
  };
}
