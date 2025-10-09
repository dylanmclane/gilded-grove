'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';

export default function ConditionalNavigation() {
  const pathname = usePathname();
  
  // Only show navigation on demo pages, not on root marketing page
  const shouldShowNavigation = pathname.startsWith('/demo');
  
  if (!shouldShowNavigation) {
    return null;
  }
  
  return (
    <>
      <Navigation />
      <style jsx global>{`
        main {
          margin-left: 0;
        }
        @media (min-width: 1024px) {
          main {
            margin-left: 16rem;
          }
        }
      `}</style>
    </>
  );
}
