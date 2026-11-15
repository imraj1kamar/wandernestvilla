'use client';
import Link from 'next/link';

export default function Button({ children, href, variant = 'primary', className = '', onClick, type = 'button', ...props }) {
  const variantClass = { primary: 'btn-primary', outline: 'btn-outline', dark: 'btn-dark' }[variant] || 'btn-primary';
  const base = `inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-lg transition-all duration-300 cursor-pointer ${variantClass} ${className}`;
  if (href) return <Link href={href} className={base} {...props}>{children}</Link>;
  return <button type={type} onClick={onClick} className={base} {...props}>{children}</button>;
}
