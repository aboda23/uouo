import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images = [
  './images/674662154_1655083235818330_2501357267605815275_n.jpg',
  './images/693788448_974332805566798_5447066643484438850_n.jpg',
  './images/694794897_3935498606759273_5559091710016361830_n.jpg',
  './images/695213188_984786357266596_6409133614715503420_n.jpg',
  './images/695870959_812683261695689_2737181541112687782_n.jpg',
  './images/ETSH1097.jpg',
  './images/ETSH1574.jpg',
];

export default function Gallery() {
  return (
    <section className="gallery section">
      <div className="section-heading animate-up">
        <p className="eyebrow">Our Memories</p>
        <h2>Our Memories</h2>
      </div>
      <div className="gallery__frame">
        <Swiper
          modules={[Autoplay, EffectCoverflow, Navigation, Pagination]}
          effect="coverflow"
          centeredSlides
          slidesPerView={1.12}
          loop
          autoplay={{ delay: 2400, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 115,
            modifier: 1.8,
            slideShadows: false,
          }}
          breakpoints={{ 720: { slidesPerView: 2.2 } }}
        >
          {images.map((src, index) => (
            <SwiperSlide key={src}>
              <figure className="memory-card">
                <img
                  src={src}
                  alt={`Yomna & Ahmed memory ${index + 1}`}
                  loading={index < 2 ? 'eager' : 'lazy'}
                />
                <figcaption>U&amp;A</figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
