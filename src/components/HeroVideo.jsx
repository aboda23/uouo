import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const isMobile = () => /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth <= 768;

export default function HeroVideo({ active }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');

  useEffect(() => {
    setVideoSrc(isMobile() ? './videos/IMG_8404_mobile.mp4' : './videos/IMG_8404.MP4');
  }, []);

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

  useEffect(() => {
    if (!active || !videoRef.current || !videoSrc) return;
    const video = videoRef.current;
    video.load();
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setAutoplayBlocked(true);
      });
    }
  }, [active, videoSrc]);

  const handleManualPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setAutoplayBlocked(false);
    }
  };

  return (
    <section className="hero-video" ref={sectionRef}>
      {videoSrc && (
        <video
          ref={videoRef}
          className="hero-video__media"
          muted
          loop
          playsInline
          preload="metadata"
          poster="./images/ETSH1097.jpg"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {autoplayBlocked && (
        <button
          className="hero-video__play-btn"
          onClick={handleManualPlay}
          aria-label="Play video"
        >
          <svg viewBox="0 0 24 24" fill="white" width="48" height="48">
            <circle cx="12" cy="12" r="12" fill="rgba(255,255,255,0.2)" />
            <polygon points="9,7 19,12 9,17" fill="white" />
          </svg>
        </button>
      )}

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
