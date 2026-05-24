import React, { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import { Volume2, VolumeX } from 'lucide-react';

const MUSIC_URL =
  'https://cdn.pixabay.com/audio/2022/11/22/audio_febc508520.mp3';

export default function MusicController({ active }) {
  const soundRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [MUSIC_URL],
      loop: true,
      volume: 0,
      html5: true,
      preload: true,
    });

    return () => {
      soundRef.current?.unload();
    };
  }, []);

  useEffect(() => {
    const sound = soundRef.current;
    if (!active || !sound) return;

    if (!sound.playing()) {
      sound.play();
    }
    sound.mute(false);
    sound.fade(sound.volume(), 0.42, 2600);
    setMuted(false);
    setReady(true);
  }, [active]);

  const toggle = () => {
    const sound = soundRef.current;
    if (!sound) return;

    const nextMuted = !muted;
    setMuted(nextMuted);
    sound.fade(sound.volume(), nextMuted ? 0 : 0.42, 900);
    window.setTimeout(() => sound.mute(nextMuted), 920);
  };

  return (
    <button
      className={ready ? 'music music--visible' : 'music'}
      type="button"
      onClick={toggle}
      aria-label={muted ? 'Unmute music' : 'Mute music'}
      title={muted ? 'Unmute music' : 'Mute music'}
    >
      {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
    </button>
  );
}
