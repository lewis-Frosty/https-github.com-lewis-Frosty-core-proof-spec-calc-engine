import type { Metadata } from 'next';
import { Poppins, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/components/StoreProvider';
import { getProduct } from '@/lib/shopify';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});
const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hanken',
  display: 'swap',
});
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sealyn Lining Tiles — Warm, soft, quiet. The easiest lining you’ll ever fit.',
  description:
    'Peel-and-stick marine lining tiles that bring comfort, insulation and a soft textile finish to boat cabins, vans and interiors. Fitted in an afternoon.',
  icons: { icon: '/sealyn-icon.png' },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const product = await getProduct();
  return (
    <html lang="en" className={`${poppins.variable} ${hanken.variable} ${jetbrains.variable}`}>
      <body>
        <StoreProvider product={product}>{children}</StoreProvider>
      </body>
    </html>
  );
}
