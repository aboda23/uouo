import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FloatingHearts({ density = 28 }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.ambient-heart', {
        x: '+=10',
        y: '-=14',
        rotation: '+=8',
        duration: 5.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 0.16, from: 'random' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div className="ambient ambient--hearts" ref={ref} aria-hidden="true">
      {Array.from({ length: density }).map((_, index) => {
        const left = (index * 37) % 100;
        const delay = ((index * 0.73) % 8).toFixed(2);
        const duration = (14 + (index % 9) * 1.35).toFixed(2);
        const size = 7 + (index % 5) * 3;

        return (
          <span
            key={index}
            className="ambient__piece ambient-heart ambient-heart--soft"
            style={{
              '--left': `${left}%`,
              '--delay': `${delay}s`,
              '--duration': `${duration}s`,
              '--size': `${size}px`,
              '--drift': `${index % 2 === 0 ? 18 : -18}px`,
            }}
          />
        );
      })}
      <span className="light-leak light-leak--one" />
      <span className="light-leak light-leak--two" />
      <span className="light-leak light-leak--three" />
    </div>
  );
}
