'use client';

import { usePathname } from 'next/navigation';

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldShowNavigation = pathname.startsWith('/demo');
  
  return (
    <main className={shouldShowNavigation ? 'lg:ml-64' : ''}>
      {children}
    </main>
  );
}
