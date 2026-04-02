import { NAV_SECTIONS } from "@/lib/mdx";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import TopBar from "./TopBar";
import TableOfContents from "./TableOfContents";

interface DocLayoutProps {
  meta: {
    title: string;
    description: string;
    readingTime: string;
  };
  content: string;
  children: React.ReactNode;
}

export default function DocLayout({ meta, content, children }: DocLayoutProps) {
  return (
    <div className="min-h-screen bg-ocean-deep">
      <Sidebar sections={NAV_SECTIONS} />
      <MobileSidebar sections={NAV_SECTIONS} />
      <TopBar />

      <div className="md:pl-[260px]">
        <div className="mx-auto flex max-w-6xl gap-10 px-6 py-10 md:px-10">
          {/* Main content */}
          <article className="min-w-0 flex-1 max-w-[800px]">
            {/* Page header */}
            <header className="mb-8 pb-6 border-b border-panel-border">
              <h1 className="text-3xl font-bold text-text-primary tracking-tight mb-2">
                {meta.title}
              </h1>
              {meta.description && (
                <p className="text-base text-text-secondary leading-relaxed">
                  {meta.description}
                </p>
              )}
              <p className="mt-3 text-sm text-text-muted">{meta.readingTime}</p>
            </header>

            {/* MDX content */}
            <div className="prose-recif">{children}</div>
          </article>

          {/* Table of contents */}
          <TableOfContents content={content} />
        </div>
      </div>
    </div>
  );
}
