'use client';

import React from 'react';
import { useStore } from '@/components/StoreProvider';
import { Reveal } from '@/components/Reveal';
import { Icon, Btn, Stars, Eyebrow, PhotoPlaceholder } from '@/components/primitives';
import { SEALYN, PRODUCT } from '@/lib/data';

export default function HomePage() {
  const { go, openCalc } = useStore();

  return (
    <main>
      {/* ============ H-01 OUTCOME HERO ============ */}
      <section style={{ background: 'var(--wash)', overflow: 'hidden' }}>
        <div
          className="wrap grid-hero"
          style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56, alignItems: 'center', paddingBlock: '88px 96px' }}
        >
          <div>
            <span className="badge badge-brand" style={{ marginBottom: 22 }}>
              <Icon name="sparkles" size={14} /> New · peel-and-stick marine lining
            </span>
            <h1 className="display" style={{ fontSize: 'clamp(2.8rem,4.6vw,4.5rem)' }}>
              Warm, soft, quiet.
              <br />
              The Sealyn feeling.
            </h1>
            <p className="body-lg" style={{ marginTop: 22, maxWidth: 480 }}>
              A three-layer lining tile you simply peel, place and press. No glue spray. No mess. Just a cabin that
              feels twice as warm — fitted in an afternoon.
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap' }}>
              <Btn variant="primary" size="lg" icon="ruler" onClick={openCalc}>
                Calculate what you need
              </Btn>
              <Btn variant="ghost" size="lg" icon="play" onClick={() => go('how')}>
                See how it works
              </Btn>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 28 }}>
              <Stars value={5} size={18} />
              <span style={{ font: 'var(--t-body-sm)', color: 'var(--fg2)' }}>
                <b style={{ color: 'var(--ink)' }}>{PRODUCT.rating}</b> from {PRODUCT.reviewCount} boat owners
              </span>
            </div>
          </div>
          <Reveal>
            <PhotoPlaceholder
              label="Outcome hero — warm, finished boat cabin"
              tone="ph-deep"
              icon="sailboat"
              style={{ height: 460, borderRadius: 'var(--r-2xl)', boxShadow: 'var(--shadow-lg)' }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  background: '#fff',
                  borderRadius: 'var(--r-lg)',
                  padding: '14px 18px',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon name="thermometer-sun" size={22} style={{ color: 'var(--accent)' }} />
                <div>
                  <div style={{ font: 'var(--t-caption)', color: 'var(--fg3)' }}>Cabin warmth</div>
                  <div style={{ font: 'var(--font-display)', fontWeight: 700, color: 'var(--ink)' }}>+ much cosier</div>
                </div>
              </div>
            </PhotoPlaceholder>
          </Reveal>
        </div>
      </section>

      {/* ============ T-02 STATISTICS BAR ============ */}
      <section style={{ background: 'var(--ink-surface)' }}>
        <div className="wrap grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, paddingBlock: 44 }}>
          {[
            ['10 min', 'Typical m² to fit'],
            ['0', 'Glue spray, ever'],
            ['6 mm', 'Waterproof foam core'],
            ['30-day', 'Money-back guarantee'],
          ].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ font: 'var(--font-display)', fontWeight: 700, fontSize: '2.4rem', color: '#fff', letterSpacing: '-.02em' }}>
                {n}
              </div>
              <div
                style={{
                  font: 'var(--t-caption)',
                  textTransform: 'uppercase',
                  letterSpacing: '.08em',
                  color: 'rgba(255,255,255,.55)',
                  marginTop: 4,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ HOW IT WORKS — 3 steps ============ */}
      <section id="how" className="section">
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="h2" style={{ marginTop: 12 }}>
              Three layers. Three steps. Done by dinner.
            </h2>
          </div>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>
            {[
              { n: '01', ic: 'scan-line', t: 'Peel', d: 'Lift the backing to expose the strong pressure-sensitive adhesive. No spray, no brushes.' },
              { n: '02', ic: 'hand', t: 'Place', d: 'Line up your tile — hexagon, square or rectangle — on any clean, dry surface.' },
              { n: '03', ic: 'check-check', t: 'Press', d: 'Firm it down with the roller. The soft, UV-stable finish is ready to live with instantly.' },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className="card card-hover" style={{ padding: 30, height: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 'var(--r-md)',
                        background: 'var(--surface-brand)',
                        color: 'var(--brand)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon name={s.ic} size={26} />
                    </span>
                    <span style={{ font: 'var(--font-display)', fontWeight: 700, fontSize: '2rem', color: 'var(--surface-2)' }}>
                      {s.n}
                    </span>
                  </div>
                  <h3 className="h3" style={{ marginTop: 22 }}>
                    {s.t}
                  </h3>
                  <p style={{ marginTop: 10, font: 'var(--t-body)', color: 'var(--fg2)' }}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ C-02 APPLICATION COLLECTION ============ */}
      <section id="applications" className="section" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 44, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <Eyebrow>Applications</Eyebrow>
              <h2 className="h2" style={{ marginTop: 12, maxWidth: 520 }}>
                Start with the problem, not the product.
              </h2>
            </div>
            <Btn variant="ghost" iconRight="arrow-right" onClick={() => go('product')}>
              Shop the tile
            </Btn>
          </div>
          <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 22 }}>
            {SEALYN.applications.map((a, i) => (
              <Reveal key={a.id} delay={i * 70}>
                <button onClick={() => go('product')} style={{ all: 'unset', cursor: 'pointer', display: 'block', height: '100%' }}>
                  <div className="card card-hover" style={{ overflow: 'hidden', height: '100%' }}>
                    <PhotoPlaceholder label="" tone={i % 2 ? 'ph-warm' : ''} style={{ height: 150 }}>
                      <span
                        style={{
                          position: 'absolute',
                          top: 14,
                          left: 14,
                          width: 44,
                          height: 44,
                          borderRadius: 'var(--r-md)',
                          background: 'rgba(255,255,255,.92)',
                          color: 'var(--brand)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon name={a.icon} size={22} />
                      </span>
                    </PhotoPlaceholder>
                    <div style={{ padding: '20px 22px 24px' }}>
                      <h4 className="h4">{a.title}</h4>
                      <p style={{ marginTop: 8, font: 'var(--t-body-sm)', color: 'var(--fg2)' }}>{a.copy}</p>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CS-01 BEFORE / AFTER ============ */}
      <section className="section">
        <div className="wrap grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <Reveal>
            <div style={{ display: 'flex', gap: 16 }}>
              <PhotoPlaceholder
                label="Before"
                icon="x"
                style={{ flex: 1, height: 360, borderRadius: 'var(--r-xl)', filter: 'grayscale(.5) brightness(.9)' }}
              />
              <PhotoPlaceholder label="After" tone="ph-warm" icon="check" style={{ flex: 1, height: 360, borderRadius: 'var(--r-xl)' }} />
            </div>
          </Reveal>
          <div>
            <Eyebrow>Before &amp; after</Eyebrow>
            <h2 className="h2" style={{ marginTop: 12 }}>
              From cold aluminium to a cabin you don&apos;t want to leave.
            </h2>
            <p className="body-lg" style={{ marginTop: 18, color: 'var(--fg2)' }}>
              Bare hulls are loud, cold and unforgiving. Sealyn&apos;s foam core takes the edge off every knock and keeps
              the warmth in — with a finish that looks like it was always meant to be there.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '26px 0 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                'Softer walls — no more banging your head on hard metal',
                'Warmer cabin that holds its heat',
                'Quieter underway, calmer at anchor',
              ].map((t) => (
                <li key={t} style={{ display: 'flex', gap: 12, alignItems: 'center', font: 'var(--t-body)', color: 'var(--ink)' }}>
                  <Icon name="circle-check" size={20} style={{ color: 'var(--success)', flex: 'none' }} /> {t}
                </li>
              ))}
            </ul>
            <Btn variant="primary" style={{ marginTop: 30 }} icon="images" onClick={() => go('product')}>
              See the full gallery
            </Btn>
          </div>
        </div>
      </section>

      {/* ============ REVIEWS ============ */}
      <section id="reviews" className="section" style={{ background: 'var(--surface-brand)' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Eyebrow>Reviews</Eyebrow>
            <h2 className="h2" style={{ marginTop: 12 }}>
              Owners and installers agree
            </h2>
          </div>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {SEALYN.reviews.map((r, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="card" style={{ padding: 28, height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <Stars value={r.stars} size={17} />
                  <p style={{ font: 'var(--t-body)', color: 'var(--ink)', flex: 1 }}>“{r.text}”</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: 'var(--brand)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        font: 'var(--font-display)',
                        fontWeight: 700,
                      }}
                    >
                      {r.name[0]}
                    </span>
                    <div>
                      <div style={{ font: 'var(--t-body-sm)', fontWeight: 700, color: 'var(--ink)' }}>{r.name}</div>
                      <div className="caption">{r.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRADE BAND ============ */}
      <section id="trade" className="section-sm">
        <div className="wrap">
          <div
            className="grid-2"
            style={{
              background: 'var(--ink-surface)',
              borderRadius: 'var(--r-2xl)',
              padding: '56px',
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr',
              gap: 40,
              alignItems: 'center',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div>
              <span className="badge" style={{ background: 'rgba(255,255,255,.1)', color: 'var(--sky-soft)', marginBottom: 18 }}>
                For trade &amp; OEM
              </span>
              <h2 className="h2" style={{ color: '#fff' }}>
                Fit more boats in less time.
              </h2>
              <p style={{ marginTop: 16, font: 'var(--t-body-lg)', color: 'rgba(255,255,255,.72)', maxWidth: 440 }}>
                No patterning rolls, no spray booth. Open a trade account for tier pricing and reorder your usual SKUs in
                two clicks.
              </p>
              <div style={{ display: 'flex', gap: 14, marginTop: 30, flexWrap: 'wrap' }}>
                <Btn variant="accent" size="lg" icon="badge-check" onClick={() => go('product')}>
                  Shop the tile
                </Btn>
                <Btn
                  variant="secondary"
                  size="lg"
                  onClick={openCalc}
                  style={{ background: 'rgba(255,255,255,.12)', color: '#fff' }}
                >
                  Coverage calculator
                </Btn>
              </div>
            </div>
            <PhotoPlaceholder label="Trade install in progress" tone="ph-deep" icon="wrench" style={{ height: 240, borderRadius: 'var(--r-xl)' }} />
          </div>
        </div>
      </section>
    </main>
  );
}
