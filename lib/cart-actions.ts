'use server';

import { createCheckout } from './shopify';

export type CheckoutResult =
  | { ok: true; url: string }
  | { ok: false; reason: 'not-configured' | 'no-variants' | 'error'; message?: string };

/** Server action: build a Shopify cart from the current line items and return
 *  the hosted checkout URL. Lines without a resolved Shopify variant id are
 *  skipped (they only exist in illustrative-fallback mode). */
export async function checkoutAction(
  lines: { merchandiseId: string | null; quantity: number }[],
): Promise<CheckoutResult> {
  const resolvable = lines
    .filter((l): l is { merchandiseId: string; quantity: number } => Boolean(l.merchandiseId) && l.quantity > 0)
    .map((l) => ({ merchandiseId: l.merchandiseId, quantity: l.quantity }));

  try {
    const url = await createCheckout(resolvable);
    if (!url) {
      return { ok: false, reason: resolvable.length === 0 ? 'no-variants' : 'not-configured' };
    }
    return { ok: true, url };
  } catch (err) {
    return { ok: false, reason: 'error', message: err instanceof Error ? err.message : 'Unknown error' };
  }
}
