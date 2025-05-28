export function initSwiper() {
    // Общие параметры
    const commonOptions = {};

    let thumbsSwiper = null;

    // Миниатюры
    const thumbsEl = document.querySelector('.product-slider__small');
    if (thumbsEl) {
        const navigationEl = thumbsEl.closest('.product-slider__small-container');

        thumbsSwiper = new Swiper(thumbsEl, {
            ...commonOptions,
            watchSlidesProgress: true,
            loop: false,
            navigation: {
                prevEl: navigationEl ? navigationEl.querySelector('.swiper-arrow_prev') : null,
                nextEl: navigationEl ? navigationEl.querySelector('.swiper-arrow_next') : null,
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

    // Основной слайдер
    const bigEl = document.querySelector('.product-slider__big');
    if (bigEl && thumbsSwiper) {
        new Swiper(bigEl, {
            ...commonOptions,
            thumbs: {
                swiper: thumbsSwiper,
            },
        });
    }

    // Остальные слайдеры
    const sliders = document.querySelectorAll('.swiper-container');
    sliders.forEach(function (slider) {
        if (!(slider instanceof HTMLElement)) return;

        if (
            slider.classList.contains('product-slider__small') ||
            slider.classList.contains('product-slider__big')
        ) return;

        let uniqueOptions = { ...commonOptions };

        if (slider.classList.contains('swiper-main')) {
            const navigationEl = slider.closest('.slider-main');
            uniqueOptions = {
                ...uniqueOptions,
                navigation: {
                    prevEl: navigationEl ? navigationEl.querySelector('.swiper-arrow_prev') : null,
                    nextEl: navigationEl ? navigationEl.querySelector('.swiper-arrow_next') : null
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

        new Swiper(slider, uniqueOptions);
    });
}