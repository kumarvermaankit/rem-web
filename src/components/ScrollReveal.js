import React, { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay > 0 ? `reveal-delay-${delay}` : '';

  return (
    <div
      ref={ref}
      className={`reveal ${delayClass} ${isVisible ? 'show' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
