import { lazyLoadMedia } from './utils/lazyload';
import { initSwiper } from './library/swiper';
import { initFancybox } from './library/fancybox';
import { initNotyf } from './library/notification';
import { initializeTabs } from './library/tabs';
import { initTooltip } from './library/typpy';
import { initMarquee } from './library/marquee';
import { modal } from './library/modal';
import { initAccordion } from './library/accordion';
import {noUi} from "./library/nouiSlider";
import {initAnchor} from "./main/anchor";
import {initCharacteristic} from "./main/characterisitc";
/*import 'dragscroll';*/
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadMedia();
    //initAccordion();
    initSwiper();
    noUi();
    initFancybox();
    initCharacteristic();
    // initNotyf();
    // initializeTabs();
    initTooltip();
    initAnchor();
    // initMarquee();
    // modal;
});

