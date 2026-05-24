import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FallingFlowers({ density = 24 }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.falling-flower', {
        x: '+=18',
        rotation: '+=22',
        duration: 7.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 0.22, from: 'random' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div className="ambient ambient--flowers" ref={ref} aria-hidden="true">
      {Array.from({ length: density }).map((_, index) => {
        const left = (index * 29 + 11) % 100;
        const delay = ((index * 0.91) % 11).toFixed(2);
        const duration = (17 + (index % 8) * 1.45).toFixed(2);
        const size = 13 + (index % 6) * 3;

        return (
          <span
            key={index}
            className="falling-flower"
            style={{
              '--left': `${left}%`,
              '--delay': `${delay}s`,
              '--duration': `${duration}s`,
              '--size': `${size}px`,
              '--sway': `${index % 2 === 0 ? 42 : -42}px`,
            }}
          >
            <i />
            <i />
            <i />
            <i />
          </span>
        );
      })}
    </div>
  );
}
