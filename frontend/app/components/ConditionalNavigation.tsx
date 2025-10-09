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
  
  return <Navigation />;
}

// Export a function to check if navigation should be shown
export function shouldShowNavigation(pathname: string) {
  return pathname.startsWith('/demo');
}
