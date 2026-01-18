import { useEffect } from 'react';
import { trackPageView } from '@/lib/analytics';

export function useAnalytics() {
  useEffect(() => {
    // Track initial page view
    trackPageView();
    
    // Track page visibility changes (user returning to tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Could track "tab_focus" event here if needed
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}
