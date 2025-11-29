import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force scroll to top immediately
    const scrollToTop = () => {
      console.log('ScrollToTop: Navigated to', pathname); // Debug log
      
      // Try different methods to ensure it works
      try {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        });
        console.log('ScrollToTop: Used scrollTo with options');
      } catch (e) {
        // Fallback for older browsers
        window.scrollTo(0, 0);
        console.log('ScrollToTop: Used fallback scrollTo');
      }
      
      // Also try scrolling document elements directly
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
        console.log('ScrollToTop: Reset documentElement scrollTop');
      }
      if (document.body) {
        document.body.scrollTop = 0;
        console.log('ScrollToTop: Reset body scrollTop');
      }

      // Check current scroll position
      console.log('ScrollToTop: Current scroll position:', window.pageYOffset || document.documentElement.scrollTop);
    };

    // Execute immediately
    scrollToTop();
    
    // Also execute after a short delay to handle any async content loading
    const timeoutId = setTimeout(() => {
      scrollToTop();
      console.log('ScrollToTop: Delayed execution completed');
    }, 100);
    
    // Cleanup timeout
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};

export default ScrollToTop;