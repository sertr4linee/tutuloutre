import { useEffect, useState, useCallback } from 'react';

export function useOptimizedScroll(threshold = 15) {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [ticking, setTicking] = useState(false);

  const handleScroll = useCallback(() => {
    if (!ticking) {
      setTicking(true);
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        setTicking(false);
      });
    }
  }, []);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const onScroll = () => {
      handleScroll();
      setIsScrolling(true);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, threshold);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimeout);
    };
  }, [handleScroll, threshold]);

  return { scrollY, isScrolling };
} 