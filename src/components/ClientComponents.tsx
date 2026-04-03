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
    <div
      className="my-6 overflow-hidden rounded-xl"
      style={{
        background: 'rgba(10, 24, 45, 0.7)',
        border: '1px solid rgba(56, 189, 248, 0.1)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(34, 211, 238, 0.04)',
      }}
    >
      <div
        className="flex"
        style={{ borderBottom: '1px solid rgba(56, 189, 248, 0.08)' }}
      >
        {items.map((item) => {
          const label = item.props.label;
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => setActive(label)}
              className="px-4 py-2.5 text-sm font-medium transition-all duration-200 relative"
              style={{
                color: isActive ? '#22d3ee' : '#64748b',
                background: isActive ? 'rgba(34, 211, 238, 0.04)' : 'transparent',
              }}
            >
              {label}
              {isActive && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: '#22d3ee' }}
                />
              )}
            </button>
          );
        })}
      </div>
      <div className="p-5">
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
      <div
        className="absolute left-[15px] top-[32px] bottom-4 w-px"
        style={{ background: 'rgba(56, 189, 248, 0.1)' }}
      />
      {items.map((child, i) => (
        <div key={i} className="flex gap-4 relative">
          <div
            className="flex-shrink-0 w-[31px] h-[31px] rounded-full flex items-center justify-center text-sm font-semibold mt-0.5 relative z-10"
            style={{
              background: 'rgba(13, 31, 56, 0.8)',
              border: '1px solid rgba(34, 211, 238, 0.2)',
              color: '#22d3ee',
              boxShadow: '0 0 12px rgba(34, 211, 238, 0.06)',
            }}
          >
            {i + 1}
          </div>
          <div className="flex-1 pb-6">{child}</div>
        </div>
      ))}
    </div>
  );
}
