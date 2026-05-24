import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function getTargetDate() {
  // 17 July 2026, 5:00 PM
  return new Date(2026, 6, 17, 17, 0, 0);
}

function getRemaining(target) {
  const total = Math.max(0, target.getTime() - Date.now());
  return {
    days:    Math.floor(total / 86400000),
    hours:   Math.floor((total / 3600000) % 24),
    minutes: Math.floor((total / 60000) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export default function Countdown() {
  const target    = useMemo(getTargetDate, []);
  const [remaining, setRemaining] = useState(() => getRemaining(target));
  const ref       = useRef(null);

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  useEffect(() => {
    gsap.fromTo(
      '.countdown-card__number',
      { y: 6, opacity: 0.5 },
      { y: 0, opacity: 1, duration: 0.32, ease: 'power3.out', stagger: 0.03 }
    );
  }, [remaining]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.countdown-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: '.countdown',
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const items = [
    ['Days',    remaining.days],
    ['Hours',   remaining.hours],
    ['Minutes', remaining.minutes],
    ['Seconds', remaining.seconds],
  ];

  return (
    <section className="countdown section" ref={ref}>
      <p className="eyebrow">Counting every heartbeat</p>
      <h2>Until the celebration</h2>
      <div className="countdown__grid">
        {items.map(([label, value]) => (
          <div className="countdown-card glass" key={label}>
            <span className="countdown-card__number">{String(value).padStart(2, '0')}</span>
            <span className="countdown-card__label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
