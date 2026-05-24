import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroVideo({ active }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-video__text > *',
        { autoAlpha: 0, y: 34, filter: 'blur(12px)' },
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.45, stagger: 0.18, ease: 'power3.out', delay: 0.45 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [active]);

  return (
    <section className="hero-video" ref={sectionRef}>
      <video
        className="hero-video__media"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"
      >
        <source src="./videos/IMG_8404.MP4" type="video/mp4" />
      </video>
      <div className="hero-video__veil" />
      <div className="hero-video__text">
        <p className="eyebrow">Wedding Invitation</p>
        <h2>Yomna &amp; Ahmed</h2>
        <p className="arabic" lang="ar" dir="rtl">يسرنا دعوتكم لحضور حفل زفافنا</p>
        <span className="glow-divider" />
        <p className="date-line">17 July 2026</p>
        <p className="time-line">5:00 PM</p>
      </div>
    </section>
  );
}
