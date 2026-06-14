'use client';

import React from 'react';
import { useStore } from './StoreProvider';
import { Icon } from './primitives';

const SUGGESTIONS = [
  { type: 'Product', icon: 'package', label: 'Sealyn Lining Tile — Hexagon', to: 'product' },
  { type: 'Tool', icon: 'ruler', label: 'Coverage calculator', to: 'calculator' },
  { type: 'Guide', icon: 'book-open', label: 'How to line a boat cabin', to: 'how' },
  { type: 'Guide', icon: 'circle-check', label: 'Will it stick to my surface?', to: 'how' },
  { type: 'Page', icon: 'badge-check', label: 'Trade accounts', to: 'trade' },
];

export function SearchOverlay() {
  const { closeSearch, go } = useStore();
  const [q, setQ] = React.useState('');
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    ref.current?.focus();
  }, []);
  const suggestions = SUGGESTIONS.filter((s) => !q || s.label.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="scrim" onClick={closeSearch}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 640,
          margin: '88px auto 0',
          background: '#fff',
          borderRadius: 'var(--r-xl)',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '18px 22px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <Icon name="search" size={22} style={{ color: 'var(--fg3)' }} />
          <input
            ref={ref}
            className="input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, guides, applications…"
            style={{ border: 'none', boxShadow: 'none', padding: 0, fontSize: '1.125rem' }}
          />
          <span className="kbd">Esc</span>
        </div>
        <div style={{ padding: 10 }}>
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => {
                closeSearch();
                go(s.to);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                width: '100%',
                border: 'none',
                background: 'transparent',
                padding: '12px 14px',
                borderRadius: 'var(--r-md)',
                cursor: 'pointer',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <span
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 'var(--r-sm)',
                  background: 'var(--surface-brand)',
                  color: 'var(--brand)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 'none',
                }}
              >
                <Icon name={s.icon} size={19} />
              </span>
              <span style={{ flex: 1 }}>
                <span style={{ display: 'block', font: 'var(--t-body)', color: 'var(--ink)', fontWeight: 600 }}>
                  {s.label}
                </span>
                <span className="caption">{s.type}</span>
              </span>
              <Icon name="arrow-up-right" size={17} style={{ color: 'var(--fg3)' }} />
            </button>
          ))}
          {!suggestions.length && (
            <div style={{ padding: 28, textAlign: 'center', color: 'var(--fg3)' }}>No matches — try “calculator”.</div>
          )}
        </div>
      </div>
    </div>
  );
}
