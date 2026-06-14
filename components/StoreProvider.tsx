'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import type { ProductData, CartLine } from '@/lib/types';
import { SEALYN, COLOUR_TO_OPTION, SHAPE_TO_OPTION, CORE_TO_OPTION } from '@/lib/data';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { SearchOverlay } from './SearchOverlay';
import { CalcModal } from './Calculator';

export type CalcSelection = { colour: string; shape: string; core: string; packs: number };

export type ResolvedVariant = {
  merchandiseId: string | null;
  price: number;
  currencyCode: string;
  available: boolean;
};

type StoreValue = {
  product: ProductData;
  currencyCode: string;
  cart: CartLine[];
  subtotal: number;
  cartCount: number;
  cartOpen: boolean;
  searchOpen: boolean;
  calcOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openCalc: () => void;
  closeCalc: () => void;
  go: (target: string) => void;
  resolve: (colourId: string, shapeId: string, coreId: string) => ResolvedVariant;
  addCalc: (sel: CalcSelection) => void;
  setQty: (i: number, q: number) => void;
  removeItem: (i: number) => void;
};

const StoreCtx = React.createContext<StoreValue | null>(null);

export function useStore(): StoreValue {
  const ctx = React.useContext(StoreCtx);
  if (!ctx) throw new Error('useStore must be used within <StoreProvider>');
  return ctx;
}

export function StoreProvider({ product, children }: { product: ProductData; children: React.ReactNode }) {
  const router = useRouter();
  const [cart, setCart] = React.useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [calcOpen, setCalcOpen] = React.useState(false);

  // Esc closes overlays
  React.useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCartOpen(false);
        setSearchOpen(false);
        setCalcOpen(false);
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  const resolve = React.useCallback(
    (colourId: string, shapeId: string, coreId: string): ResolvedVariant => {
      const colourName = COLOUR_TO_OPTION[colourId];
      const shapeName = SHAPE_TO_OPTION[shapeId];
      const coreName = CORE_TO_OPTION[coreId];
      const variant = product.variants.find((v) => {
        const get = (n: string) => v.selectedOptions.find((o) => o.name === n)?.value;
        return get('Colour') === colourName && get('Shape') === shapeName && get('Core') === coreName;
      });
      const fallbackPrice = SEALYN.cores.find((c) => c.id === coreId)?.price ?? 0;
      return {
        merchandiseId: variant && variant.id.startsWith('gid://') ? variant.id : null,
        price: variant ? parseFloat(variant.price.amount) : fallbackPrice,
        currencyCode: variant?.price.currencyCode ?? product.currencyCode,
        available: variant ? variant.availableForSale : true,
      };
    },
    [product],
  );

  const addCalc = React.useCallback(
    (sel: CalcSelection) => {
      if (sel.packs <= 0) return;
      const col = SEALYN.colours.find((c) => c.id === sel.colour)!;
      const shapeObj = SEALYN.shapes.find((s) => s.id === sel.shape)!;
      const coreObj = SEALYN.cores.find((c) => c.id === sel.core)!;
      const v = resolve(sel.colour, sel.shape, sel.core);
      const line: CartLine = {
        merchandiseId: v.merchandiseId,
        title: 'Sealyn Lining Tile',
        variant: `${shapeObj.name} · ${coreObj.name} · ${col.name}`,
        price: v.price,
        qty: sel.packs,
        hex: col.hex,
      };
      setCart((prev) => {
        const idx = prev.findIndex((p) => p.variant === line.variant);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: next[idx].qty + line.qty };
          return next;
        }
        return [...prev, line];
      });
      setCalcOpen(false);
      setCartOpen(true);
    },
    [resolve],
  );

  const setQty = (i: number, q: number) =>
    setCart((prev) => (q <= 0 ? prev.filter((_, j) => j !== i) : prev.map((p, j) => (j === i ? { ...p, qty: q } : p))));
  const removeItem = (i: number) => setCart((prev) => prev.filter((_, j) => j !== i));

  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const cartCount = cart.reduce((s, it) => s + it.qty, 0);
  const currencyCode = cart[0]?.merchandiseId ? product.currencyCode : product.currencyCode;

  const go = React.useCallback(
    (target: string) => {
      if (target === 'calculator') return setCalcOpen(true);
      if (target === 'product') {
        router.push(`/products/${product.handle}`);
        return;
      }
      if (target === 'home') {
        router.push('/');
        return;
      }
      // home-page section anchors
      router.push(`/#${target}`);
    },
    [router, product.handle],
  );

  const value: StoreValue = {
    product,
    currencyCode,
    cart,
    subtotal,
    cartCount,
    cartOpen,
    searchOpen,
    calcOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    openSearch: () => setSearchOpen(true),
    closeSearch: () => setSearchOpen(false),
    openCalc: () => setCalcOpen(true),
    closeCalc: () => setCalcOpen(false),
    go,
    resolve,
    addCalc,
    setQty,
    removeItem,
  };

  return (
    <StoreCtx.Provider value={value}>
      <Nav />
      {children}
      <Footer />
      {cartOpen && <CartDrawer />}
      {searchOpen && <SearchOverlay />}
      {calcOpen && <CalcModal />}
    </StoreCtx.Provider>
  );
}
