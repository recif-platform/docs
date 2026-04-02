import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface DocMeta {
  title: string;
  description: string;
  slug: string;
  readingTime: string;
}

export interface Doc {
  meta: DocMeta;
  content: string;
}

function slugFromFilePath(filePath: string): string {
  return filePath
    .replace(CONTENT_DIR + "/", "")
    .replace(/\.mdx$/, "");
}

export function getDocBySlug(slug: string): Doc {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Doc not found: ${slug}`);
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    meta: {
      title: (data.title as string) || slug,
      description: (data.description as string) || "",
      slug,
      readingTime: stats.text,
    },
    content,
  };
}

export function getAllDocs(): DocMeta[] {
  const docs: DocMeta[] = [];

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith(".mdx")) {
        const raw = fs.readFileSync(fullPath, "utf-8");
        const { data, content } = matter(raw);
        const stats = readingTime(content);
        docs.push({
          title: (data.title as string) || entry.name.replace(/\.mdx$/, ""),
          description: (data.description as string) || "",
          slug: slugFromFilePath(fullPath),
          readingTime: stats.text,
        });
      }
    }
  }

  walk(CONTENT_DIR);
  return docs;
}

/** Navigation structure used by the sidebar */
export interface NavSection {
  title: string;
  items: { slug: string; title: string }[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    title: "Get Started",
    items: [
      { slug: "introduction", title: "Introduction" },
      { slug: "quickstart", title: "Quickstart" },
      { slug: "architecture", title: "Architecture" },
    ],
  },
  {
    title: "Guides",
    items: [
      { slug: "guides/create-agent", title: "Create an Agent" },
      { slug: "guides/llm-providers", title: "LLM Providers" },
      { slug: "guides/evaluation", title: "Evaluation" },
      { slug: "guides/governance", title: "Governance" },
      { slug: "guides/canary-deployments", title: "Canary Deployments" },
      { slug: "guides/knowledge-bases", title: "Knowledge Bases" },
    ],
  },
  {
    title: "Concepts",
    items: [
      { slug: "concepts/agent-lifecycle", title: "Agent Lifecycle" },
      { slug: "concepts/eval-driven-releases", title: "Eval-Driven Releases" },
      { slug: "concepts/multi-tenancy", title: "Multi-Tenancy" },
      { slug: "concepts/gitops-artifacts", title: "GitOps Artifacts" },
    ],
  },
  {
    title: "Reference",
    items: [
      { slug: "reference/environment-variables", title: "Environment Variables" },
      { slug: "reference/crd-spec", title: "CRD Spec" },
      { slug: "reference/helm-values", title: "Helm Values" },
      { slug: "reference/api-endpoints", title: "API Endpoints" },
    ],
  },
];
