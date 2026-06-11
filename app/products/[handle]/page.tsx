'use client';

import React from 'react';
import { useStore } from '@/components/StoreProvider';
import { useCalc, Calculator } from '@/components/Calculator';
import { Icon, Btn, Stars, Eyebrow, PriceTag, PhotoPlaceholder } from '@/components/primitives';
import { SEALYN, PRODUCT } from '@/lib/data';

const crumb: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: 'var(--fg3)',
  font: 'var(--t-caption)',
  padding: 0,
};

function FAQ({ items }: { items: [string, string][] }) {
  const [open, setOpen] = React.useState(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {items.map(([q, a], i) => (
        <div key={i} className="card" style={{ overflow: 'hidden' }}>
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              textAlign: 'left',
            }}
          >
            <span style={{ font: 'var(--t-h4)', color: 'var(--ink)' }}>{q}</span>
            <Icon name={open === i ? 'minus' : 'plus'} size={20} style={{ color: 'var(--brand)', flex: 'none' }} />
          </button>
          {open === i && <p style={{ padding: '0 24px 22px', font: 'var(--t-body)', color: 'var(--fg2)', margin: 0 }}>{a}</p>}
        </div>
      ))}
    </div>
  );
}

export default function ProductPage() {
  const { go, resolve } = useStore();
  const c = useCalc({ area: '', shape: 'hex', core: '6mm', colour: 'slate' });
  const [activeImg, setActiveImg] = React.useState(0);
  const tones = ['ph-deep', 'ph-warm', '', 'ph-deep'];
  const colourObj = SEALYN.colours.find((x) => x.id === c.colour)!;
  const v = resolve(c.colour, c.shape, c.core);

  return (
    <main>
      {/* breadcrumb */}
      <div className="wrap" style={{ paddingTop: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, font: 'var(--t-caption)', color: 'var(--fg3)' }}>
          <button onClick={() => go('home')} style={crumb}>
            Home
          </button>
          <Icon name="chevron-right" size={13} />
          <button onClick={() => go('home')} style={crumb}>
            Products
          </button>
          <Icon name="chevron-right" size={13} />
          <span style={{ color: 'var(--fg2)' }}>Sealyn Lining Tile</span>
        </div>
      </div>

      {/* ===== HERO: gallery + buy box ===== */}
      <section className="wrap grid-2" style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 56, paddingBlock: '28px 72px' }}>
        {/* gallery */}
        <div style={{ position: 'sticky', top: 96, alignSelf: 'start' }}>
          <PhotoPlaceholder
            label={['Cabin install', 'Tile detail', 'Colour range', 'Before / after'][activeImg]}
            tone={tones[activeImg]}
            icon="image"
            style={{ height: 460, borderRadius: 'var(--r-2xl)' }}
          >
            <span className="badge badge-success" style={{ position: 'absolute', top: 18, left: 18 }}>
              <Icon name="check" size={13} /> {v.available ? 'In stock' : 'Made to order'}
            </span>
          </PhotoPlaceholder>
          <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
            {[0, 1, 2, 3].map((i) => (
              <button key={i} onClick={() => setActiveImg(i)} style={{ all: 'unset', cursor: 'pointer', flex: 1 }}>
                <PhotoPlaceholder
                  label=""
                  tone={tones[i]}
                  style={{
                    height: 80,
                    borderRadius: 'var(--r-md)',
                    boxShadow: activeImg === i ? '0 0 0 2px var(--brand)' : 'inset 0 0 0 1px var(--border)',
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* buy box */}
        <div>
          <Eyebrow>Flagship product</Eyebrow>
          <h1 className="h1" style={{ marginTop: 12 }}>
            {PRODUCT.name}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14 }}>
            <Stars value={PRODUCT.rating} size={18} />
            <span style={{ font: 'var(--t-body-sm)', color: 'var(--fg2)' }}>
              {PRODUCT.rating} · {PRODUCT.reviewCount} reviews
            </span>
          </div>
          <p className="body-lg" style={{ marginTop: 18, color: 'var(--fg2)' }}>
            Peel-and-stick lining in <b style={{ color: 'var(--ink)' }}>{colourObj.name}</b>. Strong PSA backing,
            waterproof foam core and a soft, UV-stable finish. Tell us your area — we&apos;ll work out the exact kit.
          </p>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 22 }}>
            <PriceTag amount={v.price} currencyCode={v.currencyCode} size="lg" />
            <span className="caption">covers ~{c.shapeObj.per.toFixed(2)} m² each</span>
          </div>

          <div style={{ height: 1, background: 'var(--border)', margin: '26px 0' }} />

          {/* calculator drives the buy box */}
          <Calculator c={c} compact />
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="section-sm" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            {[
              ['thermometer-sun', 'Warmer', 'Foam core holds heat — no more cold metal.'],
              ['volume-x', 'Quieter', 'Soft layers damp knocks, hum and slap.'],
              ['droplets', 'Waterproof', 'Closed-cell core shrugs off spray and damp.'],
              ['sun', 'UV-stable', 'Colour-fast finish made for life on the water.'],
            ].map(([ic, t, d]) => (
              <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 'var(--r-md)',
                    background: '#fff',
                    color: 'var(--brand)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <Icon name={ic} size={24} />
                </span>
                <h4 className="h4">{t}</h4>
                <p style={{ font: 'var(--t-body-sm)', color: 'var(--fg2)' }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES: 3-layer breakdown ===== */}
      <section className="section">
        <div className="wrap grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <Eyebrow>The build</Eyebrow>
            <h2 className="h2" style={{ marginTop: 12 }}>
              Three layers, engineered to work together.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 28 }}>
              {[
                ['1', 'Pressure-sensitive adhesive', 'Aggressive PSA backing grips clean, dry surfaces instantly — peel and stick, no spray glue.'],
                ['2', 'Waterproof foam core', "3 mm or 6 mm closed-cell foam for warmth and light acoustic damping. It won't hold water."],
                ['3', 'Soft outer lining', 'A luxurious, UV-stabilised finish in six colours and three tile shapes.'],
              ].map(([n, t, d]) => (
                <div key={n} style={{ display: 'flex', gap: 18 }}>
                  <span
                    style={{
                      width: 36,
                      height: 36,
                      flex: 'none',
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
                    {n}
                  </span>
                  <div>
                    <h4 className="h4">{t}</h4>
                    <p style={{ font: 'var(--t-body-sm)', color: 'var(--fg2)', marginTop: 5 }}>{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <PhotoPlaceholder label="3-layer cross-section" tone="ph-warm" icon="layers" style={{ height: 420, borderRadius: 'var(--r-2xl)' }} />
        </div>
      </section>

      {/* ===== SPECIFICATIONS ===== */}
      <section className="section-sm" style={{ background: 'var(--surface)' }}>
        <div className="wrap-narrow">
          <Eyebrow>Specifications</Eyebrow>
          <h2 className="h2" style={{ marginTop: 12, marginBottom: 28 }}>
            The detail
          </h2>
          <div className="card" style={{ overflow: 'hidden' }}>
            {[
              ['Core thickness', '3 mm or 6 mm closed-cell foam'],
              ['Adhesive', 'Pressure-sensitive (PSA), peel-and-stick'],
              ['Outer finish', 'Soft lining, UV-stabilised'],
              ['Shapes', 'Hexagon · Square · Rectangle'],
              ['Colours', '6 — Soft Slate, Harbour Blue, Sea Mist, Warm Sand, Graphite, Pearl'],
              ['Coverage', '~1.0–1.2 m² per pack (by shape)'],
              ['Surfaces', 'Aluminium, GRP, ply, painted steel, most clean rigid surfaces'],
            ].map(([k, val], i) => (
              <div
                key={k}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '220px 1fr',
                  gap: 20,
                  padding: '16px 24px',
                  borderTop: i ? '1px solid var(--border)' : 'none',
                }}
              >
                <span style={{ font: 'var(--t-body-sm)', fontWeight: 600, color: 'var(--ink)' }}>{k}</span>
                <span style={{ font: 'var(--t-body-sm)', color: 'var(--fg2)' }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section">
        <div className="wrap-narrow">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="h2" style={{ marginTop: 12 }}>
              The things people ask first
            </h2>
          </div>
          <FAQ
            items={[
              [
                'Will it stick to my surface?',
                "Sealyn bonds to clean, dry, rigid surfaces — aluminium, GRP, ply, painted steel and more. Use our surface checker if you're unsure; if it's not suitable, we'll tell you before you buy.",
              ],
              [
                'Can a non-pro really fit it?',
                "Yes — that's the whole point. Peel, place, press with the roller. Most owners line a cabin in an afternoon, no tools or spray glue required.",
              ],
              [
                'How much do I need?',
                'Enter your area in the calculator above. We add 10% for cuts and tell you the exact number of packs — so you don\'t over- or under-order.',
              ],
              ["What if I don't love it?", "You're covered by a 30-day money-back guarantee. If it's not for you, send it back."],
            ]}
          />
        </div>
      </section>

      {/* ===== CTA band ===== */}
      <section style={{ background: 'var(--brand)' }}>
        <div className="wrap" style={{ paddingBlock: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <h2 className="h2" style={{ color: '#fff' }}>
              Know your m²? Get the exact kit.
            </h2>
            <p style={{ font: 'var(--t-body-lg)', color: 'var(--fg-on-brand-2)', marginTop: 8 }}>
              No guesswork. No waste. Warm by the weekend.
            </p>
          </div>
          <Btn
            variant="secondary"
            size="lg"
            icon="ruler"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ background: '#fff', color: 'var(--brand)' }}
          >
            Calculate what you need
          </Btn>
        </div>
      </section>
    </main>
  );
}
