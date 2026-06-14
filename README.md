# Sealyn Lining Tiles — Storefront

A live e-commerce storefront for **Sealyn Lining Tiles**, built with **Next.js (App
Router)** and the **Shopify Storefront API**, deployable to **Vercel**.

This is a faithful production rebuild of the high-fidelity design handoff — same
design tokens, typography, spacing, motion and copy — wired to real Shopify
product data, cart and hosted checkout.

## What's built (phase 1 — core spine)

- **Home** (`/`) — hero, stats bar, how-it-works, applications, before/after,
  reviews, trade band. Section anchors: `#how`, `#applications`, `#reviews`, `#trade`.
- **Product** (`/products/sealyn-lining-tile`) — gallery + calculator-driven buy
  box, benefits, 3-layer build, specs, FAQ, CTA.
- **Cart drawer** — live line items, quantity steppers, subtotal, and a real
  **Shopify-hosted checkout** (via the Storefront Cart API).
- **Coverage calculator** — modal + inline; area → pack count → price → add to cart.
- **Search overlay** and **sticky nav / footer**.

> Phase 2 (not yet built): full How-it-works, Applications, Guides, Reviews and
> Trade portal pages. The nav links for these currently scroll to the matching
> home-page sections.

## Design system

All design tokens (colour, type scale, spacing, radii, elevation, motion) live in
[`app/globals.css`](app/globals.css) and are the source of truth, transcribed from
the design handoff. Fonts (Poppins, Hanken Grotesk, JetBrains Mono) are loaded via
`next/font`.

## Architecture

| Concern | Where |
|---|---|
| Shopify Storefront client + queries | `lib/shopify.ts` |
| Checkout server action | `lib/cart-actions.ts` |
| Illustrative fallback data + design↔Shopify maps | `lib/data.ts` |
| Global cart / overlay state + variant resolution | `components/StoreProvider.tsx` |
| Shared atoms (Icon, Btn, Stars, Logo, PhotoPlaceholder…) | `components/primitives.tsx` |

**Resilient data layer:** the site renders with illustrative fallback data until
the Storefront API token is configured. Once env vars are present it uses live
Shopify product data, pricing, availability and a real checkout URL. Colour ×
Shape × Core selections resolve to a Shopify variant for add-to-cart.

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in the token (see below)
npm run dev                  # http://localhost:3000
```

## Connecting Shopify (required for live checkout)

The store and product are already set up:

- **Store:** `iywheq-m4.myshopify.com`
- **Product:** `sealyn-lining-tile` — ACTIVE, published to Online Store, 36
  variants (Colour × Shape × Core).

You need to create a **Storefront API access token** (this can't be created by an
AI tool):

1. Shopify admin → **Settings → Apps and sales channels → Develop apps**.
2. **Create an app** (e.g. "Headless Storefront").
3. **Configure Storefront API scopes** — enable at least:
   `unauthenticated_read_product_listings`, `unauthenticated_read_product_inventory`,
   `unauthenticated_write_checkouts`, `unauthenticated_read_checkouts`.
4. **Install app**, then under **API credentials** copy the **Storefront API
   access token**.
5. Put it in `.env.local`:

   ```bash
   SHOPIFY_STORE_DOMAIN=iywheq-m4.myshopify.com
   SHOPIFY_STOREFRONT_API_TOKEN=<your token>
   SHOPIFY_STOREFRONT_API_VERSION=2025-01
   SHOPIFY_PRODUCT_HANDLE=sealyn-lining-tile
   ```

> **Note:** the store is on a **Trial** plan. You'll need to upgrade before you can
> take real payments at checkout.

## Deploy to Vercel

1. Push this repo to GitHub (done — branch `claude/optimistic-tesla-9qxw5z`).
2. Import the repo in Vercel (framework auto-detected: Next.js).
3. Add the four environment variables above in **Project → Settings →
   Environment Variables**.
4. Deploy. Every PR gets a preview URL automatically.

## Replacing placeholder imagery

Product/lifestyle imagery currently uses branded gradient `PhotoPlaceholder`
components. Drop real photography into `public/` and pass `src` to
`<PhotoPlaceholder src="…" />`, or wire Shopify product images (already queried in
`lib/shopify.ts`) into the product gallery.
