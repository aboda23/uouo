import React, { useState } from 'react';
import IntroRings from './components/IntroRings.jsx';
import FloatingHearts from './components/FloatingHearts.jsx';
import FallingFlowers from './components/FallingFlowers.jsx';
import Sparkles from './components/Sparkles.jsx';
import MusicController from './components/MusicController.jsx';
import HeroVideo from './components/HeroVideo.jsx';
import WeddingDetails from './components/WeddingDetails.jsx';
import Countdown from './components/Countdown.jsx';
import Gallery from './components/Gallery.jsx';
import LocationMap from './components/LocationMap.jsx';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [musicActive, setMusicActive] = useState(false);

  const handleEnter = () => {
    setMusicActive(true);
    setEntered(true);
  };

  return (
    <main className={entered ? 'app app--entered' : 'app'}>
      <FloatingHearts density={entered ? 22 : 32} />
      <FallingFlowers density={entered ? 16 : 24} />
      <Sparkles density={entered ? 28 : 42} />
      <MusicController active={musicActive} />
      <IntroRings entered={entered} onEnter={handleEnter} />
      <section className="story" aria-hidden={!entered}>
        <HeroVideo active={entered} />
        <WeddingDetails />
        <Countdown />
        <Gallery />
        <LocationMap />
      </section>
    </main>
  );
}
