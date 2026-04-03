import { redirect } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { getDocBySlug, getAllDocs, NAV_SECTIONS } from "@/lib/mdx";
import DocLayout from "@/components/DocLayout";
import { getMDXComponents } from "@/components/MDXComponents";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;

  // Root /docs → redirect to introduction
  if (!slug || slug.length === 0) {
    redirect("/introduction");
  }

  const slugPath = slug.join("/");

  let doc;
  try {
    doc = getDocBySlug(slugPath);
  } catch {
    redirect("/introduction");
  }

  return (
    <DocLayout meta={doc.meta} content={doc.content}>
      <MDXRemote
        source={doc.content}
        components={getMDXComponents()}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              [rehypePrettyCode, {
                theme: "github-dark-default",
                defaultLang: "bash",
                keepBackground: false,
              }],
            ],
          },
        }}
      />
    </DocLayout>
  );
}

export function generateStaticParams() {
  const docs = getAllDocs();

  // Include root path (redirects) + all doc slugs
  const params = [
    { slug: [] as string[] },
    ...docs.map((doc) => ({
      slug: doc.slug.split("/"),
    })),
  ];

  // Also add all slugs from the nav structure in case content files don't exist yet
  for (const section of NAV_SECTIONS) {
    for (const item of section.items) {
      const parts = item.slug.split("/");
      if (!params.some((p) => p.slug.join("/") === item.slug)) {
        params.push({ slug: parts });
      }
    }
  }

  return params;
}
