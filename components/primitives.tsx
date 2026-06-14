'use client';

import React from 'react';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import { formatMoney } from '@/lib/format';

/* ---- Icon (lucide, kebab-case name to match the design's API) ---- */
export function Icon({
  name,
  size = 20,
  className = '',
  style,
}: {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return <DynamicIcon name={name as IconName} size={size} className={className} style={style} aria-hidden />;
}

/* ---- Brand logo ---- */
export function Logo({
  variant = 'full',
  white = false,
  height = 34,
  onClick,
  className,
  style,
}: {
  variant?: 'full' | 'icon';
  white?: boolean;
  height?: number;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  const src =
    variant === 'icon' ? '/sealyn-icon.png' : white ? '/sealyn-logo-white.png' : '/sealyn-logo.png';
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt="Sealyn Lining Tiles"
      onClick={onClick}
      className={className}
      style={{ height, width: 'auto', cursor: onClick ? 'pointer' : 'default', ...style }}
    />
  );
}

/* ---- Button ---- */
type BtnProps = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  size?: 'lg' | 'sm';
  block?: boolean;
  icon?: string;
  iconRight?: string;
  children?: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Btn({ variant = 'primary', size, block, icon, iconRight, children, className = '', ...rest }: BtnProps) {
  const cls = [
    'btn',
    'btn-' + variant,
    size === 'lg' ? 'btn-lg' : size === 'sm' ? 'btn-sm' : '',
    block ? 'btn-block' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <button className={cls} {...rest}>
      {icon && <Icon name={icon} size={size === 'sm' ? 16 : 18} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'sm' ? 16 : 18} />}
    </button>
  );
}

/* ---- Star rating ---- */
export function Stars({ value = 5, size = 16 }: { value?: number; size?: number }) {
  return (
    <span className="stars" role="img" aria-label={value + ' out of 5'}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon key={i} name="star" size={size} style={{ opacity: i < Math.round(value) ? 1 : 0.28 }} />
      ))}
    </span>
  );
}

export function Eyebrow({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <span className="eyebrow" style={style}>
      {children}
    </span>
  );
}

export function PriceTag({
  amount,
  currencyCode = 'GBP',
  unit = '/ pack',
  size = 'md',
}: {
  amount: number;
  currencyCode?: string;
  unit?: string;
  size?: 'lg' | 'md' | 'sm';
}) {
  const fs = size === 'lg' ? '2rem' : size === 'sm' ? '1.0625rem' : '1.25rem';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6 }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: fs, color: 'var(--ink)' }}>
        {formatMoney(amount, currencyCode)}
      </span>
      <span style={{ font: 'var(--t-caption)', color: 'var(--fg3)' }}>{unit}</span>
    </span>
  );
}

/* ---- Outcome-led photo placeholder (swap for real photography) ---- */
export function PhotoPlaceholder({
  label,
  tone = '',
  icon = 'image',
  src,
  alt,
  style,
  children,
}: {
  label?: string;
  tone?: string;
  icon?: string;
  src?: string;
  alt?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  return (
    <div className={'ph ' + tone} style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {src && <img src={src} alt={alt || label || ''} />}
      {children}
      {label && (
        <span className="ph-label">
          <Icon name={icon} size={14} /> {label}
        </span>
      )}
    </div>
  );
}
