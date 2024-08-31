import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollRestoration() {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Store the current scroll position in the browser's history state
      window.history.replaceState({ ...window.history.state, scrollY: window.scrollY }, '');
    };

    const handlePopState = (event) => {
      if (event.state && typeof event.state.scrollY === 'number') {
        // Restore the scroll position from the browser's history state
        window.scrollTo(0, event.state.scrollY);
      } else {
        // Scroll to the top if there's no scroll position stored in the history state
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location]);

  return null; // This component doesn't render anything
}

export default ScrollRestoration;
