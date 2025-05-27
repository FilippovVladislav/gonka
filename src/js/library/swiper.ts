import Swiper from 'swiper';
import {A11y, Navigation, Pagination, Thumbs} from 'swiper/modules';

window.Swiper = Swiper;



export function initSwiper() {
    // Общие параметры для всех слайдеров
    const commonOptions = {
    };

    let thumbsSwiper: Swiper | null = null;

    // Сначала ищем small (миниатюры) и инициализируем
    const thumbsEl = document.querySelector('.product-slider__small');
    if (thumbsEl instanceof HTMLElement) {
        const navigationEl = thumbsEl.closest('.product-slider__small-container');

        thumbsSwiper = new Swiper(thumbsEl, {
            ...commonOptions,
            modules: [Navigation, A11y, Thumbs],
            watchSlidesProgress: true,
            loop: false,

            navigation: {
                prevEl: navigationEl?.querySelector('.swiper-arrow_prev') as HTMLElement,
                nextEl: navigationEl?.querySelector('.swiper-arrow_next') as HTMLElement,
            },
            breakpoints: {
                320: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                600: {
                    slidesPerView: 5,
                    spaceBetween: 10,
                },
            }

        });
    }

    // Затем big (основной слайдер)
    const bigEl = document.querySelector('.product-slider__big');
    if (bigEl instanceof HTMLElement && thumbsSwiper) {
        new Swiper(bigEl, {
            ...commonOptions,
            modules: [Thumbs],
            thumbs: {
                swiper: thumbsSwiper,
            },
        });
    }

    // Инициализация всех слайдеров с базовыми параметрами
    const sliders = document.querySelectorAll('.swiper-container');

    sliders.forEach((slider) => {
        // Проверка типа элемента и приведение к HTMLElement
        if (slider instanceof HTMLElement) {
            // Уникальные параметры для каждого слайдера через класс
            let uniqueOptions = { ...commonOptions };

            if (
                slider.classList.contains('product-slider__small') ||
                slider.classList.contains('product-slider__big')
            ) return;
            if(slider.classList.contains('swiper-main')){
                const navigatoinEl = slider.closest('.slider-main');
                // Уникальные параметры для product-pic_swiper
                console.log(slider)
                uniqueOptions = {
                    ...uniqueOptions,
                    modules: [Navigation, A11y],
                    navigation: {
                        prevEl: navigatoinEl.querySelector('.swiper-arrow_prev'),
                        nextEl: navigatoinEl.querySelector('.swiper-arrow_next')
                    },
                    breakpoints: {
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        600: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1260: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        }
                    },
                };
            }

            // Инициализируем слайдер с уникальными параметрами
            new Swiper(slider, uniqueOptions);
        }
    });
}

