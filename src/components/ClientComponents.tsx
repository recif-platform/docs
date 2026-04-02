"use client";

import React, { useState } from "react";

/* ── Tabs ── */
interface TabItemProps {
  label: string;
  children: React.ReactNode;
}

interface TabsProps {
  children: React.ReactNode;
  defaultTab?: string;
}

export function Tabs({ children, defaultTab }: TabsProps) {
  const items = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<TabItemProps> => React.isValidElement(child)
  );

  const [active, setActive] = useState(defaultTab || (items[0]?.props.label ?? ""));

  return (
    <div className="my-6 reef-glass overflow-hidden">
      <div className="flex border-b border-panel-border">
        {items.map((item) => {
          const label = item.props.label;
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "text-reef-cyan border-b-2 border-reef-cyan bg-reef-cyan/5"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="p-4">
        {items.find((item) => item.props.label === active)?.props.children}
      </div>
    </div>
  );
}

export function TabItem({ children }: TabItemProps) {
  return <>{children}</>;
}

/* ── Steps ── */
export function Steps({ children }: { children: React.ReactNode }) {
  const items = React.Children.toArray(children).filter(React.isValidElement);
  return (
    <div className="my-6 space-y-0 relative">
      <div className="absolute left-[15px] top-[32px] bottom-4 w-px bg-panel-border" />
      {items.map((child, i) => (
        <div key={i} className="flex gap-4 relative">
          <div className="flex-shrink-0 w-[31px] h-[31px] rounded-full bg-ocean-mid border border-reef-cyan/30 flex items-center justify-center text-sm font-semibold text-reef-cyan mt-0.5 relative z-10">
            {i + 1}
          </div>
          <div className="flex-1 pb-6">{child}</div>
        </div>
      ))}
    </div>
  );
}
