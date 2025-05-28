import { lazyLoadMedia } from './utils/lazyload.js';
import { initSwiper } from './library/swiper.js';
import {noUi} from "./library/nouiSlider.js";
import { initFancybox } from './library/fancybox.js';
import { initTooltip } from './library/typpy.js';
import { modal } from './library/modal.js';

import {initAnchor} from "./main/anchor.js";
import {initCharacteristic} from "./main/characterisitc.js";
import {initSidebarCatalog} from "./main/sidebarCatalog.js";
import {initDescription} from "./main/description.js";
/*import 'dragscroll';*/
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadMedia();
    initSwiper();
    noUi();
    initFancybox();
    initTooltip();
    initCharacteristic();
    initSidebarCatalog();
    initDescription();
    initAnchor();
    modal;
});

