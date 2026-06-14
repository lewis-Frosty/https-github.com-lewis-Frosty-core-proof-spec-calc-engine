'use client';

import React from 'react';
import { useStore } from './StoreProvider';
import { checkoutAction } from '@/lib/cart-actions';
import { Icon, Btn } from './primitives';
import { formatMoney } from '@/lib/format';

const qtyBtn: React.CSSProperties = {
  width: 30,
  height: 32,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  font: '600 18px/1 var(--font-display)',
  color: 'var(--fg2)',
};

export function CartDrawer() {
  const { cart, closeCart, setQty, removeItem, subtotal, currencyCode } = useStore();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const checkout = async () => {
    setLoading(true);
    setError(null);
    const res = await checkoutAction(cart.map((l) => ({ merchandiseId: l.merchandiseId, quantity: l.qty })));
    if (res.ok) {
      window.location.href = res.url;
      return;
    }
    setLoading(false);
    setError(
      res.reason === 'not-configured' || res.reason === 'no-variants'
        ? 'Checkout opens once the Shopify Storefront API token is configured.'
        : res.message || 'Could not start checkout. Please try again.',
    );
  };

  return (
    <div className="scrim" onClick={closeCart}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h3 className="h4" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon name="shopping-bag" size={20} style={{ color: 'var(--brand)' }} />
            Your cart
          </h3>
          <button className="icon-btn" onClick={closeCart} aria-label="Close">
            <Icon name="x" size={22} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
              padding: 32,
              textAlign: 'center',
            }}
          >
            <Icon name="shopping-bag" size={40} style={{ color: 'var(--border-strong)' }} />
            <p style={{ font: 'var(--t-body)', color: 'var(--fg3)' }}>Your cart is empty.</p>
            <Btn variant="primary" onClick={closeCart}>
              Find your kit
            </Btn>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflow: 'auto', padding: '8px 24px' }}>
              {cart.map((it, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, padding: '18px 0', borderBottom: '1px solid var(--border)' }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 'var(--r-md)',
                      background: it.hex || 'var(--lavender)',
                      flex: 'none',
                      boxShadow: 'inset 0 0 0 1px rgba(19,26,51,.1)',
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ font: 'var(--t-body)', fontWeight: 600, color: 'var(--ink)' }}>{it.title}</div>
                    <div className="caption" style={{ marginBottom: 8 }}>
                      {it.variant}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1.5px solid var(--border-strong)',
                          borderRadius: 'var(--r-sm)',
                        }}
                      >
                        <button onClick={() => setQty(i, it.qty - 1)} style={qtyBtn} aria-label="Decrease">
                          −
                        </button>
                        <span style={{ width: 30, textAlign: 'center', font: 'var(--t-body-sm)', fontWeight: 600 }}>
                          {it.qty}
                        </span>
                        <button onClick={() => setQty(i, it.qty + 1)} style={qtyBtn} aria-label="Increase">
                          +
                        </button>
                      </div>
                      <span style={{ font: 'var(--t-body)', fontWeight: 700, color: 'var(--ink)' }}>
                        {formatMoney(it.price * it.qty, currencyCode)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(i)}
                    style={{ background: 'none', border: 'none', color: 'var(--fg3)', cursor: 'pointer', alignSelf: 'flex-start' }}
                    aria-label="Remove"
                  >
                    <Icon name="trash-2" size={17} />
                  </button>
                </div>
              ))}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 18,
                  padding: '14px 16px',
                  background: 'var(--success-soft)',
                  borderRadius: 'var(--r-md)',
                }}
              >
                <Icon name="truck" size={18} style={{ color: 'var(--success)' }} />
                <span style={{ font: 'var(--t-body-sm)', color: 'var(--success)', fontWeight: 600 }}>
                  You&apos;ve unlocked free dispatch.
                </span>
              </div>
            </div>
            <div style={{ padding: 24, borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ font: 'var(--t-body-sm)', color: 'var(--fg2)' }}>Subtotal</span>
                <span style={{ font: 'var(--t-body)', fontWeight: 700, color: 'var(--ink)' }}>
                  {formatMoney(subtotal, currencyCode)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <span className="caption">Shipping</span>
                <span className="caption" style={{ color: 'var(--success)', fontWeight: 600 }}>
                  Free
                </span>
              </div>
              <Btn variant="primary" size="lg" block iconRight="arrow-right" onClick={checkout} disabled={loading}>
                {loading ? 'Starting checkout…' : 'Proceed to checkout'}
              </Btn>
              {error && (
                <p className="caption" style={{ textAlign: 'center', marginTop: 12, color: 'var(--danger)' }}>
                  {error}
                </p>
              )}
              <p className="caption" style={{ textAlign: 'center', marginTop: 12 }}>
                <Icon name="lock" size={13} style={{ verticalAlign: '-2px' }} /> Secure Shopify checkout · 30-day guarantee
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
