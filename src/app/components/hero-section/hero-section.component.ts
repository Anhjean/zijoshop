import { Component, OnInit } from '@angular/core';

import { SwiperOptions } from 'swiper/types';
import SwiperCore, { EffectCoverflow } from 'swiper';
// install Swiper modules
SwiperCore.use([EffectCoverflow]);

@Component({
  selector: 'shop-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnInit {

  thumbsSwiper: any;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    effect: 'coverflow',
  coverflowEffect: {
    rotate: 30,
    slideShadows: false,
  },
    scrollbar: false,// or { draggable: true },
    autoplay: true
  };

  onSwiper(swiper:any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  setThumbsSwiper(swiper: any) {
    this.thumbsSwiper = swiper;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
