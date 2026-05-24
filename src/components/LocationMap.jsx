import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MAP_QUERY = 'Cairo wedding hall';
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

export default function LocationMap() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.location__card', {
        scrollTrigger: { trigger: '.location', start: 'top 76%' },
        autoAlpha: 0,
        y: 42,
        scale: 0.98,
        duration: 1.15,
        ease: 'power3.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="location section" ref={ref}>
      <div className="location__card glass">
        <p className="eyebrow">The Venue</p>
        <h2>Celebrate with us</h2>
        <div className="map-shell">
          <iframe
            title="Wedding venue map"
            src={MAP_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <a className="map-button" href={MAP_LINK} target="_blank" rel="noreferrer">
          <MapPin size={18} />
          Open in Google Maps
        </a>
      </div>
    </section>
  );
}
