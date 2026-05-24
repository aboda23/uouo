import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Sparkles({ density = 40 }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.sparkle-particle', {
        scale: 1.9,
        opacity: 0.95,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 0.07, from: 'random' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div className="ambient ambient--sparkles" ref={ref} aria-hidden="true">
      {Array.from({ length: density }).map((_, index) => {
        const left = (index * 43 + 5) % 100;
        const top = (index * 31 + 9) % 100;
        const delay = ((index * 0.31) % 5).toFixed(2);
        const size = 2 + (index % 4);

        return (
          <span
            key={index}
            className="sparkle-particle"
            style={{
              '--left': `${left}%`,
              '--top': `${top}%`,
              '--delay': `${delay}s`,
              '--size': `${size}px`,
            }}
          />
        );
      })}
    </div>
  );
}
