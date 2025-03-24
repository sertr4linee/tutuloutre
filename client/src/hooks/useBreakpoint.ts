import { useState, useEffect } from 'react';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type Breakpoint = keyof typeof breakpoints;

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('sm');
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Initialisation
    setWidth(window.innerWidth);
    
    // Optimisation des performances avec debounce
    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        setWidth(width);
        
        // Déterminer le breakpoint actuel
        if (width >= breakpoints['2xl']) {
          setBreakpoint('2xl');
        } else if (width >= breakpoints.xl) {
          setBreakpoint('xl');
        } else if (width >= breakpoints.lg) {
          setBreakpoint('lg');
        } else if (width >= breakpoints.md) {
          setBreakpoint('md');
        } else {
          setBreakpoint('sm');
        }
      }, 100); // Debounce de 100ms
    };

    // Écouter les changements de taille d'écran
    window.addEventListener('resize', handleResize, { passive: true });
    handleResize(); // Appel initial

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return {
    breakpoint,
    width,
    isMobile: width < breakpoints.md,
    isTablet: width >= breakpoints.md && width < breakpoints.lg,
    isDesktop: width >= breakpoints.lg,
  };
} 