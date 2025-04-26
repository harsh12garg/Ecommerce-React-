
import { useEffect, useRef } from 'react';

export function useAnimationOnScroll() {
  const animatedEls = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
      observer.observe(el);
      animatedEls.current.push(el as HTMLElement);
    });
    
    return () => {
      animatedEls.current.forEach(el => observer.unobserve(el));
    };
  }, []);

  return animatedEls.current;
}
