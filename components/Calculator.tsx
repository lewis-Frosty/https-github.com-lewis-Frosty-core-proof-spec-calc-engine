'use client';

import React from 'react';
import { useStore } from './StoreProvider';
import { SEALYN } from '@/lib/data';
import { Icon, Btn, Eyebrow } from './primitives';
import { formatMoney } from '@/lib/format';

export type CalcState = ReturnType<typeof useCalc>;

export function useCalc(initial: { area?: string; shape?: string; core?: string; colour?: string } = {}) {
  const [area, setArea] = React.useState(initial.area ?? '');
  const [shape, setShape] = React.useState(initial.shape ?? 'hex');
  const [core, setCore] = React.useState(initial.core ?? '6mm');
  const [colour, setColour] = React.useState(initial.colour ?? 'slate');
  const shapeObj = SEALYN.shapes.find((s) => s.id === shape)!;
  const coreObj = SEALYN.cores.find((c) => c.id === core)!;
  const a = parseFloat(area) || 0;
  const waste = a > 0 ? a * 1.1 : 0; // +10% for cuts
  const packs = a > 0 ? Math.ceil(waste / shapeObj.per) : 0;
  return { area, setArea, shape, setShape, core, setCore, colour, setColour, shapeObj, coreObj, a, packs };
}

function Segmented({
  options,
  value,
  onChange,
}: {
  options: readonly { id: string; name: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {options.map((o) => (
        <button key={o.id} className={'chip' + (value === o.id ? ' on' : '')} onClick={() => onChange(o.id)}>
          {o.name}
        </button>
      ))}
    </div>
  );
}

export function Calculator({ c, compact }: { c: CalcState; compact?: boolean }) {
  const { resolve, addCalc } = useStore();
  const v = resolve(c.colour, c.shape, c.core);
  const unitPrice = v.price;
  const cur = v.currencyCode;
  const subtotal = c.packs * unitPrice;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div className="field">
        <label>Area to cover</label>
        <div style={{ position: 'relative' }}>
          <input
            className="input"
            type="number"
            min="0"
            step="0.1"
            inputMode="decimal"
            value={c.area}
            onChange={(e) => c.setArea(e.target.value)}
            placeholder="e.g. 3.4"
            style={{ paddingRight: 52 }}
          />
          <span
            style={{
              position: 'absolute',
              right: 15,
              top: '50%',
              transform: 'translateY(-50%)',
              font: 'var(--t-body-sm)',
              color: 'var(--fg3)',
            }}
          >
            m²
          </span>
        </div>
        <span className="caption">Not sure? Measure wall + ceiling — we add 10% for cuts automatically.</span>
      </div>

      <div className="field">
        <label>Tile shape</label>
        <Segmented options={SEALYN.shapes} value={c.shape} onChange={c.setShape} />
      </div>

      <div className="field">
        <label>Foam core</label>
        <Segmented options={SEALYN.cores} value={c.core} onChange={c.setCore} />
      </div>

      {!compact && (
        <div className="field">
          <label>Colour</label>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {SEALYN.colours.map((col) => (
              <button
                key={col.id}
                onClick={() => c.setColour(col.id)}
                title={col.name}
                aria-label={col.name}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 'var(--r-pill)',
                  background: col.hex,
                  cursor: 'pointer',
                  border: 'none',
                  boxShadow:
                    c.colour === col.id
                      ? '0 0 0 2px #fff, 0 0 0 4px var(--brand)'
                      : 'inset 0 0 0 1px rgba(19,26,51,.12)',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      <div
        style={{
          background: 'var(--surface-brand)',
          border: '1px solid var(--border-brand)',
          borderRadius: 'var(--r-lg)',
          padding: '20px 22px',
        }}
      >
        {c.a > 0 ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ font: 'var(--t-body-sm)', color: 'var(--fg2)' }}>You need</span>
              <span style={{ font: 'var(--font-display)', fontWeight: 700, fontSize: '2rem', color: 'var(--ink)' }}>
                {c.packs} <span style={{ fontSize: '1rem', color: 'var(--fg2)', fontWeight: 600 }}>packs</span>
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              <span className="caption">
                {c.shapeObj.name} · {c.coreObj.name} · covers {(c.packs * c.shapeObj.per).toFixed(1)} m²
              </span>
              <span style={{ font: 'var(--t-body)', fontWeight: 700, color: 'var(--brand)' }}>
                {formatMoney(subtotal, cur)}
              </span>
            </div>
          </>
        ) : (
          <span className="caption" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="ruler" size={16} /> Enter your area to see the exact kit and price.
          </span>
        )}
      </div>

      <Btn
        variant="primary"
        size="lg"
        block
        icon="shopping-bag"
        disabled={c.a <= 0}
        onClick={() => addCalc({ colour: c.colour, shape: c.shape, core: c.core, packs: c.packs })}
      >
        {c.a > 0 ? `Add ${c.packs} packs — ${formatMoney(subtotal, cur)}` : 'Add the right kit'}
      </Btn>
      <div style={{ display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap' }}>
        {[
          ['shield-check', '30-day guarantee'],
          ['truck', 'Free dispatch'],
          ['rotate-ccw', 'Easy returns'],
        ].map(([ic, t]) => (
          <span
            key={t}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, font: 'var(--t-caption)', color: 'var(--fg3)' }}
          >
            <Icon name={ic} size={15} style={{ color: 'var(--success)' }} /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CalcModal() {
  const { closeCalc } = useStore();
  const c = useCalc({ area: '' });
  return (
    <div className="scrim" onClick={closeCalc}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ position: 'static' }}>
        <div className="modal-card" style={{ padding: 0 }}>
          <div
            style={{
              padding: '24px 28px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Eyebrow>Coverage calculator</Eyebrow>
              <h3 className="h3" style={{ marginTop: 6 }}>
                How much do I need?
              </h3>
            </div>
            <button className="icon-btn" onClick={closeCalc} aria-label="Close">
              <Icon name="x" size={22} />
            </button>
          </div>
          <div style={{ padding: 28 }}>
            <Calculator c={c} />
          </div>
        </div>
      </div>
    </div>
  );
}
