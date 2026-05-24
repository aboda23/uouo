import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function IntroRings({ entered, onEnter }) {
  const sectionRef = useRef(null);
  const videoRef  = useRef(null);

  /* ── Auto-play the video as soon as it's ready ── */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted  = true;
    vid.loop   = true;
    vid.playsInline = true;
    vid.play().catch(() => {});          // silent catch for browsers that block autoplay
  }, []);

  /* ── Enter transition — fade out intro, fade in story ── */
  useEffect(() => {
    if (!entered) return;
    const tl = gsap.timeline();
    tl.to('.intro__flash', { opacity: 1,  duration: 0.4,  ease: 'power3.out'   }, 0)
      .to('.intro__flash', { opacity: 0,  duration: 1.2,  ease: 'power3.out'   }, 0.4)
      .to('.intro',        { opacity: 0,  duration: 1.4,  ease: 'power3.inOut', pointerEvents: 'none' }, 0.5)
      .fromTo('.story',    { opacity: 0 }, { opacity: 1, duration: 1.4, ease: 'power3.out' }, 1.1);
  }, [entered]);

  return (
    <section className="intro" ref={sectionRef} aria-label="Wedding invitation intro">

      {/* ── Full-screen personal video ── */}
      <video
        ref={videoRef}
        className="intro__video"
        src="./videos/IMG_8404.MP4"
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* ── Dreamy veil over the video ── */}
      <div className="intro__veil" aria-hidden="true" />

      {/* ── Glowing halo behind text ── */}
      <div className="intro__halo" aria-hidden="true" />

      {/* ── Text overlay & button ── */}
      <div className="intro__copy">
        <p className="eyebrow">Wedding Invitation</p>
        <h1>Yomna &amp; Ahmed</h1>
        <p className="intro__initials">U&amp;A</p>
        <button type="button" className="enter-button" onClick={onEnter}>
          Tap to begin ♥
        </button>
      </div>

      {/* ── Cinematic flash on enter ── */}
      <div className="intro__flash" aria-hidden="true" />
    </section>
  );
}
