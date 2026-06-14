import 'server-only';
import type { ProductData } from './types';
import { FALLBACK_PRODUCT } from './data';

// Accept whichever naming convention is present. Vercel's Shopify integration
// injects `SEA_`-/`Sealyn_`-prefixed variables, while a manual setup uses the
// plain `SHOPIFY_*` names — read all of them so either wiring works.
const DOMAIN =
  process.env.SHOPIFY_STORE_DOMAIN ||
  process.env.SEA_SHOPIFY_STORE_DOMAIN ||
  process.env.Sealyn_SHOPIFY_STORE_DOMAIN;
const TOKEN =
  process.env.SHOPIFY_STOREFRONT_API_TOKEN ||
  process.env.SEA_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
  process.env.Sealyn_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2025-01';
export const PRODUCT_HANDLE = process.env.SHOPIFY_PRODUCT_HANDLE || 'sealyn-lining-tile';

export function isShopifyConfigured(): boolean {
  return Boolean(DOMAIN && TOKEN);
}

const endpoint = () => `https://${DOMAIN}/api/${VERSION}/graphql.json`;

type GraphQLResponse<T> = { data?: T; errors?: { message: string }[] };

async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
  cache: RequestCache = 'force-cache',
): Promise<T> {
  const res = await fetch(endpoint(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN as string,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Shopify ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as GraphQLResponse<T>;
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join('; '));
  if (!json.data) throw new Error('Shopify returned no data');
  return json.data;
}

/* ── Product ─────────────────────────────────────────────────────────────── */
const PRODUCT_QUERY = /* GraphQL */ `
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      priceRange { minVariantPrice { amount currencyCode } }
      options { name values: optionValues { name } }
      variants(first: 100) {
        nodes {
          id
          title
          availableForSale
          quantityAvailable
          price { amount currencyCode }
          selectedOptions { name value }
        }
      }
      images(first: 8) { nodes { url altText width height } }
    }
  }
`;

type RawProduct = {
  product: {
    id: string;
    handle: string;
    title: string;
    description: string;
    descriptionHtml: string;
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    options: { name: string; values: { name: string }[] }[];
    variants: {
      nodes: {
        id: string;
        title: string;
        availableForSale: boolean;
        quantityAvailable: number | null;
        price: { amount: string; currencyCode: string };
        selectedOptions: { name: string; value: string }[];
      }[];
    };
    images: { nodes: { url: string; altText: string | null; width: number | null; height: number | null }[] };
  } | null;
};

export async function getProduct(handle: string = PRODUCT_HANDLE): Promise<ProductData> {
  if (!isShopifyConfigured()) return FALLBACK_PRODUCT;
  try {
    const data = await shopifyFetch<RawProduct>(PRODUCT_QUERY, { handle });
    const p = data.product;
    if (!p) return FALLBACK_PRODUCT;
    return {
      id: p.id,
      handle: p.handle,
      title: p.title,
      description: p.description,
      descriptionHtml: p.descriptionHtml,
      currencyCode: p.priceRange.minVariantPrice.currencyCode,
      minPrice: p.priceRange.minVariantPrice,
      options: p.options.map((o) => ({ name: o.name, values: o.values.map((v) => v.name) })),
      variants: p.variants.nodes,
      images: p.images.nodes,
      live: true,
    };
  } catch (err) {
    console.error('[shopify] getProduct failed, using fallback:', err);
    return FALLBACK_PRODUCT;
  }
}

/* ── Cart / Checkout ─────────────────────────────────────────────────────── */
const CART_CREATE = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { id checkoutUrl }
      userErrors { field message }
    }
  }
`;

type CartCreateResult = {
  cartCreate: {
    cart: { id: string; checkoutUrl: string } | null;
    userErrors: { message: string }[];
  };
};

/** Build a fresh Shopify cart from the given variant lines and return the
 *  hosted checkout URL. Returns null when Shopify is not configured. */
export async function createCheckout(
  lines: { merchandiseId: string; quantity: number }[],
): Promise<string | null> {
  if (!isShopifyConfigured() || lines.length === 0) return null;
  const data = await shopifyFetch<CartCreateResult>(CART_CREATE, { lines }, 'no-store');
  const result = data.cartCreate;
  if (result.userErrors?.length) throw new Error(result.userErrors.map((e) => e.message).join('; '));
  return result.cart?.checkoutUrl ?? null;
}
