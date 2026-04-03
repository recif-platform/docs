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

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="inline-block">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 4.5V8l2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
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
          <article className="min-w-0 flex-1 max-w-[820px] content-glow page-enter">
            {/* Page header */}
            <header className="mb-10 pb-6" style={{ borderBottom: '1px solid rgba(56, 189, 248, 0.08)' }}>
              <h1
                className="text-[2rem] font-bold tracking-tight mb-3 leading-tight"
                style={{
                  background: 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 50%, #94a3b8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {meta.title}
              </h1>
              {meta.description && (
                <p className="text-[15px] text-text-secondary leading-relaxed font-light max-w-2xl">
                  {meta.description}
                </p>
              )}
              <div className="mt-4 flex items-center gap-1.5 text-text-muted">
                <ClockIcon />
                <span className="text-[12px] font-medium tracking-wide">{meta.readingTime}</span>
              </div>
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
