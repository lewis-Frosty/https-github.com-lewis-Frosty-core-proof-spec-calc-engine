'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useStore } from './StoreProvider';
import { Logo, Icon } from './primitives';

const NAV_ITEMS = [
  { id: 'product', label: 'Products' },
  { id: 'how', label: 'How it works' },
  { id: 'applications', label: 'Applications' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'trade', label: 'Trade' },
];

export function Nav() {
  const { go, cartCount, openCart, openSearch } = useStore();
  const pathname = usePathname();
  const onProduct = pathname?.startsWith('/products');

  return (
    <header className="nav">
      <div className="nav-inner">
        <Logo onClick={() => go('home')} className="nav-logo" />
        <nav className="nav-links">
          {NAV_ITEMS.map((it) => (
            <button
              key={it.id}
              className={'nav-link' + (it.id === 'product' && onProduct ? ' active' : '')}
              onClick={() => go(it.id)}
            >
              {it.label}
            </button>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="icon-btn" onClick={openSearch} aria-label="Search">
            <Icon name="search" size={21} />
          </button>
          <button className="icon-btn" onClick={() => go('trade')} aria-label="Account">
            <Icon name="user" size={21} />
          </button>
          <button className="icon-btn" onClick={openCart} aria-label="Cart">
            <Icon name="shopping-bag" size={21} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
