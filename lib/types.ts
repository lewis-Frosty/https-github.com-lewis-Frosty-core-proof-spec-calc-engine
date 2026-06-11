export type Money = { amount: string; currencyCode: string };

export type ProductImage = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable?: number | null;
  price: Money;
  selectedOptions: { name: string; value: string }[];
};

export type ProductData = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  currencyCode: string;
  minPrice: Money;
  options: { name: string; values: string[] }[];
  variants: ProductVariant[];
  images: ProductImage[];
  /** Whether this came from live Shopify data (true) or illustrative fallback (false). */
  live: boolean;
};

export type CartLine = {
  /** Shopify variant GID, or null when not resolvable (fallback mode). */
  merchandiseId: string | null;
  title: string;
  variant: string;
  price: number;
  qty: number;
  hex: string;
};
