'use client';

import React from 'react';
import { useStore } from './StoreProvider';
import { Logo, Icon } from './primitives';

const COLS = [
  { h: 'Shop', links: ['Lining tiles', 'Colours', 'Install kit', 'Coverage calculator', 'Gift cards'] },
  { h: 'Learn', links: ['How it works', 'Applications', 'Surface checker', 'Guides', 'FAQs'] },
  { h: 'Trade', links: ['Open an account', 'Trade pricing', 'Rapid reorder', 'Bulk & OEM'] },
  { h: 'Company', links: ['Our story', 'Reviews', 'Contact', 'Shipping & returns'] },
];

export function Footer() {
  const { go } = useStore();
  return (
    <footer style={{ background: 'var(--ink-surface)', color: 'rgba(255,255,255,.7)' }}>
      <div className="wrap" style={{ paddingBlock: '72px 40px' }}>
        <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(4, 1fr)', gap: 40 }}>
          <div>
            <Logo variant="icon" white height={44} />
            <p style={{ marginTop: 18, maxWidth: 240, font: 'var(--t-body-sm)', color: 'rgba(255,255,255,.6)' }}>
              Comfort, warmth and the easiest install — for boats, vans and interiors.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              {['instagram', 'facebook', 'youtube'].map((s) => (
                <span
                  key={s}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--r-md)',
                    background: 'rgba(255,255,255,.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon name={s} size={19} style={{ color: '#fff' }} />
                </span>
              ))}
            </div>
          </div>
          {COLS.map((c) => (
            <div key={c.h}>
              <div
                style={{
                  font: 'var(--t-label)',
                  letterSpacing: 'var(--tracking-label)',
                  textTransform: 'uppercase',
                  color: 'var(--sky-soft)',
                  marginBottom: 16,
                }}
              >
                {c.h}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                {c.links.map((l) => (
                  <li key={l}>
                    <button
                      onClick={() => go(c.h === 'Trade' ? 'trade' : c.h === 'Learn' ? 'how' : 'home')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255,255,255,.7)',
                        cursor: 'pointer',
                        font: 'var(--t-body-sm)',
                        padding: 0,
                        textAlign: 'left',
                      }}
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ height: 1, background: 'rgba(255,255,255,.1)', margin: '48px 0 24px' }} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            font: 'var(--t-caption)',
            color: 'rgba(255,255,255,.5)',
          }}
        >
          <span>© 2026 Sealyn Lining Tiles. All rights reserved.</span>
          <span style={{ display: 'flex', gap: 22 }}>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Made for water, built for warmth.</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
