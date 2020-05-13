import {Injectable} from '@angular/core';
import {IonSlides} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class SliderComponent {

    constructor() {
    }

    slideOpts = {
        swipeGesture: true,
        keep_infinity: true,
        initialSlide: 0,
        slidesPerView: 10,
        breakpoints: {
            // when window width is <= 320px
            320: {
                slidesPerView: 2,
                spaceBetweenSlides: 10
            },
            // when window width is <= 480px
            480: {
                slidesPerView: 3,
                spaceBetweenSlides: 20
            },
            // when window width is <= 640px
            640: {
                slidesPerView: 4,
                spaceBetweenSlides: 30
            },
            960: {
                slidesPerView: 5,
                spaceBetweenSlides: 40
            },
            1280: {
                slidesPerView: 6,
                spaceBetweenSlides: 50
            },
            1440: {
                slidesPerView: 7,
                spaceBetweenSlides: 60
            }
        }
    };

    nextSlide(slider: IonSlides) {
        slider.slideNext();
    }

    prevSlide(slider: IonSlides) {
        slider.slidePrev();
    }

    checkScreen() {

    }
}
