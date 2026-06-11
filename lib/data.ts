/* ============================================================================
   SEALYN PRODUCT DATA
   Illustrative presentation data (colour hex values, coverage multipliers,
   copy, reviews). Used for fallback rendering and for the visual layer that
   sits on top of live Shopify variant data (prices / availability / IDs).
   ========================================================================== */
import type { ProductData } from './types';

export const SEALYN = {
  colours: [
    { id: 'slate', name: 'Soft Slate', hex: '#46506E' },
    { id: 'harbour', name: 'Harbour Blue', hex: '#2952D9' },
    { id: 'mist', name: 'Sea Mist', hex: '#9DC4EA' },
    { id: 'sand', name: 'Warm Sand', hex: '#D9CDB4' },
    { id: 'graphite', name: 'Graphite', hex: '#1B2540' },
    { id: 'pearl', name: 'Pearl', hex: '#E7E9EF' },
  ],
  shapes: [
    { id: 'hex', name: 'Hexagon', per: 1.05 },
    { id: 'sq', name: 'Square', per: 1.0 },
    { id: 'rect', name: 'Rectangle', per: 1.2 },
  ],
  cores: [
    { id: '3mm', name: '3 mm core', note: 'Light acoustic damping', price: 38 },
    { id: '6mm', name: '6 mm core', note: 'Maximum warmth & quiet', price: 42 },
  ],
  applications: [
    { id: 'cabin', title: 'Boat cabins', copy: 'Warm, soft walls & ceilings. No more cold aluminium.', icon: 'sailboat' },
    { id: 'helm', title: 'Helm & cockpit', copy: 'Quieter underway, kinder underfoot.', icon: 'ship-wheel' },
    { id: 'van', title: 'Camper & van', copy: 'Insulate and finish a build in an afternoon.', icon: 'caravan' },
    { id: 'interior', title: 'Interiors', copy: 'Snugs, studios and reading nooks.', icon: 'house' },
  ],
  reviews: [
    { name: 'Mark R.', role: 'DIY · Sealine cabin', stars: 5, text: 'Did my whole forepeak in a Saturday. No glue spray, no mess — it just sticks. The cabin feels twice as warm.' },
    { name: 'Priya S.', role: 'DIY · Narrowboat', stars: 5, text: 'The calculator told me exactly how many packs. Ordered once, no leftovers, no second trip. Brilliant.' },
    { name: 'Coastal Trim Co.', role: 'Trade installer', stars: 5, text: 'We fit Sealyn in a fraction of the time vs traditional lining. No patterning rolls, no spray booth.' },
  ],
} as const;

export const PRODUCT = {
  name: 'Sealyn Lining Tile',
  tagline: 'Warm, soft, quiet — the easiest lining you’ll ever fit.',
  rating: 4.9,
  reviewCount: 214,
} as const;

/* ── Maps from the design's internal ids → Shopify option value names ────── */
export const COLOUR_TO_OPTION: Record<string, string> = {
  slate: 'Soft Slate',
  harbour: 'Harbour Blue',
  mist: 'Sea Mist',
  sand: 'Warm Sand',
  graphite: 'Graphite',
  pearl: 'Pearl',
};
export const SHAPE_TO_OPTION: Record<string, string> = {
  hex: 'Hexagon',
  sq: 'Square',
  rect: 'Rectangle',
};
export const CORE_TO_OPTION: Record<string, string> = {
  '3mm': '3mm',
  '6mm': '6mm',
};

/* ── Illustrative ProductData used when Shopify is not yet configured ───── */
export const FALLBACK_PRODUCT: ProductData = {
  id: 'fallback',
  handle: process.env.SHOPIFY_PRODUCT_HANDLE || 'sealyn-lining-tile',
  title: PRODUCT.name,
  description:
    'Peel-and-stick marine lining tiles that bring comfort, insulation and a soft textile finish to cabin walls, ceilings and interior hull surfaces.',
  descriptionHtml:
    '<p>Peel-and-stick marine lining tiles that bring comfort, insulation and a soft textile finish to cabin walls, ceilings and interior hull surfaces.</p>',
  currencyCode: 'GBP',
  minPrice: { amount: '38.0', currencyCode: 'GBP' },
  options: [
    { name: 'Colour', values: SEALYN.colours.map((c) => c.name) },
    { name: 'Shape', values: SEALYN.shapes.map((s) => s.name) },
    { name: 'Core', values: ['3mm', '6mm'] },
  ],
  variants: SEALYN.colours.flatMap((col) =>
    SEALYN.shapes.flatMap((sh) =>
      SEALYN.cores.map((co) => ({
        id: `fallback-${col.id}-${sh.id}-${co.id}`,
        title: `${col.name} / ${sh.name} / ${co.id}`,
        availableForSale: true,
        price: { amount: String(co.price), currencyCode: 'GBP' },
        selectedOptions: [
          { name: 'Colour', value: col.name },
          { name: 'Shape', value: sh.name },
          { name: 'Core', value: co.id },
        ],
      })),
    ),
  ),
  images: [],
  live: false,
};
