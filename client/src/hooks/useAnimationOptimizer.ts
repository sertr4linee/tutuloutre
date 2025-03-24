import { useEffect, useState } from 'react';

export function useAnimationOptimizer(threshold = 0.2) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  useEffect(() => {
    // Utiliser requestIdleCallback pour les navigateurs qui le supportent
    const requestIdle = (window as any).requestIdleCallback || ((cb: Function) => setTimeout(cb, 1));

    const observerOptions = {
      threshold,
      rootMargin: '50px'
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      requestIdle(() => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShouldAnimate(true);
            observer?.disconnect();
          }
        });
      });
    };

    const newObserver = new IntersectionObserver(handleIntersection, observerOptions);
    setObserver(newObserver);

    return () => {
      newObserver.disconnect();
    };
  }, [threshold]);

  const observe = (element: Element | null) => {
    if (element && observer) {
      observer.observe(element);
    }
  };

  return { shouldAnimate, observe };
} 