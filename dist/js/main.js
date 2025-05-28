"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

  // src/js/utils/lazyload.js
  function lazyLoadMedia() {
    const lazyImages = document.querySelectorAll("img.lazy-img");
    const lazySources = document.querySelectorAll("source[data-srcset]");
    const lazyVideos = document.querySelectorAll("video.lazy-video");
    const lazyBackgrounds = document.querySelectorAll("[data-bg]");
    const lcpElement = document.querySelector(".lcp-element");
    const getBgImage = (dataBg) => {
      const bgImages = dataBg.split(",").map((image) => image.trim());
      const windowWidth = window.innerWidth;
      return windowWidth < 991 ? bgImages[1] : bgImages[0];
    };
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const picture = entry.target.closest("picture");
            if (picture) {
              const img = picture.querySelector("img.lazy-img");
              const sources = picture.querySelectorAll("source[data-srcset]");
              sources.forEach((source) => {
                source.srcset = source.dataset.srcset || "";
                source.removeAttribute("data-srcset");
              });
              if (img && img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
                img.classList.remove("lazy-img");
                img.onload = () => {
                  img.style.opacity = "1";
                };
              }
              if (img) observer.unobserve(img);
            }
            const video = entry.target;
            if (video.tagName === "VIDEO" && video.dataset.src) {
              const sources = video.querySelectorAll("source[data-src]");
              sources.forEach((source) => {
                source.src = source.dataset.src || "";
                source.removeAttribute("data-src");
              });
              video.src = video.dataset.src;
              video.removeAttribute("data-src");
              video.classList.remove("lazy-video");
              video.load();
              observer.unobserve(video);
            }
            const bgElement = entry.target;
            if (bgElement.dataset && bgElement.dataset.bg) {
              const bgImage = getBgImage(bgElement.dataset.bg);
              bgElement.style.backgroundImage = `url(${bgImage})`;
              bgElement.removeAttribute("data-bg");
              observer.unobserve(bgElement);
            }
          }
        });
      });
      lazyImages.forEach((img) => observer.observe(img));
      lazyVideos.forEach((video) => observer.observe(video));
      lazyBackgrounds.forEach((el) => observer.observe(el));
      if (lcpElement) {
        const preloadLink = document.createElement("link");
        preloadLink.rel = "preload";
        if (lcpElement.tagName === "IMG") {
          preloadLink.as = "image";
          preloadLink.href = lcpElement.src;
        } else if (lcpElement.tagName === "VIDEO") {
          preloadLink.as = "video";
          preloadLink.href = lcpElement.src;
        }
        document.head.appendChild(preloadLink);
      }
    } else {
      lazyImages.forEach((img) => {
        img.src = img.dataset.src || "";
        img.removeAttribute("data-src");
        img.classList.remove("lazy-img");
      });
      lazySources.forEach((source) => {
        source.srcset = source.dataset.srcset || "";
        source.removeAttribute("data-srcset");
      });
      lazyVideos.forEach((video) => {
        video.src = video.dataset.src || "";
        video.removeAttribute("data-src");
        video.classList.remove("lazy-video");
        const sources = video.querySelectorAll("source[data-src]");
        sources.forEach((source) => {
          source.src = source.dataset.src || "";
          source.removeAttribute("data-src");
        });
        video.load();
      });
      if (lcpElement) {
        const preloadLink = document.createElement("link");
        preloadLink.rel = "preload";
        if (lcpElement.tagName === "IMG") {
          preloadLink.as = "image";
          preloadLink.href = lcpElement.src;
        } else if (lcpElement.tagName === "VIDEO") {
          preloadLink.as = "video";
          preloadLink.href = lcpElement.src;
        }
        document.head.appendChild(preloadLink);
      }
    }
  }

  // src/js/library/swiper.js
  function initSwiper() {
    const commonOptions = {};
    let thumbsSwiper = null;
    const thumbsEl = document.querySelector(".product-slider__small");
    if (thumbsEl) {
      const navigationEl = thumbsEl.closest(".product-slider__small-container");
      thumbsSwiper = new Swiper(thumbsEl, __spreadProps(__spreadValues({}, commonOptions), {
        watchSlidesProgress: true,
        loop: false,
        navigation: {
          prevEl: navigationEl ? navigationEl.querySelector(".swiper-arrow_prev") : null,
          nextEl: navigationEl ? navigationEl.querySelector(".swiper-arrow_next") : null
        },
        breakpoints: {
          320: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          600: {
            slidesPerView: 5,
            spaceBetween: 10
          }
        }
      }));
    }
    const bigEl = document.querySelector(".product-slider__big");
    if (bigEl && thumbsSwiper) {
      new Swiper(bigEl, __spreadProps(__spreadValues({}, commonOptions), {
        thumbs: {
          swiper: thumbsSwiper
        }
      }));
    }
    const sliders = document.querySelectorAll(".swiper-container");
    sliders.forEach(function(slider) {
      if (!(slider instanceof HTMLElement)) return;
      if (slider.classList.contains("product-slider__small") || slider.classList.contains("product-slider__big")) return;
      let uniqueOptions = __spreadValues({}, commonOptions);
      if (slider.classList.contains("swiper-main")) {
        const navigationEl = slider.closest(".slider-main");
        uniqueOptions = __spreadProps(__spreadValues({}, uniqueOptions), {
          navigation: {
            prevEl: navigationEl ? navigationEl.querySelector(".swiper-arrow_prev") : null,
            nextEl: navigationEl ? navigationEl.querySelector(".swiper-arrow_next") : null
          },
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            600: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20
            },
            1260: {
              slidesPerView: 4,
              spaceBetween: 20
            }
          }
        });
      }
      new Swiper(slider, uniqueOptions);
    });
  }

  // src/js/library/nouiSlider.js
  function noUi() {
    var percentSlider = document.querySelector(".slider-percent");
    var percentText = document.querySelector(".percent");
    if (percentSlider && percentText) {
      if (!percentSlider.noUiSlider) {
        noUiSlider.create(percentSlider, {
          start: 50,
          connect: [true, false],
          range: {
            min: 50,
            max: 100
          },
          step: 1,
          format: {
            to: function(value) {
              return Math.round(value);
            },
            from: function(value) {
              return parseInt(value);
            }
          }
        });
        percentSlider.noUiSlider.on("update", function(values) {
          var value = values[0];
          percentText.textContent = value + "%";
        });
      }
    }
    var periodSlider = document.querySelector(".slider-period");
    var periodText = document.querySelector(".period");
    if (periodSlider && periodText) {
      if (!periodSlider.noUiSlider) {
        noUiSlider.create(periodSlider, {
          start: 1,
          connect: [true, false],
          range: {
            min: 1,
            max: 3
          },
          step: 1,
          format: {
            to: function(value) {
              return Math.round(value);
            },
            from: function(value) {
              return parseInt(value);
            }
          }
        });
        periodSlider.noUiSlider.on("update", function(values) {
          var value = values[0];
          periodText.textContent = value;
        });
      }
    }
  }

  // src/js/library/fancybox.js
  function initFancybox() {
    Fancybox.bind("[data-fancybox]", {
      // Your custom options
    });
  }

  // src/js/library/typpy.js
  function initTooltip() {
    tippy("[data-tippy-content]", {
      placement: "top",
      // Позиция подсказки: top, bottom, left, right
      arrow: true,
      // Показывать стрелку
      animation: "scale",
      // Анимация появления
      theme: "light-border"
      // Тема подсказки
    });
  }

  // src/js/library/modal.js
  var Modal = class {
    constructor() {
      this.modals = document.querySelectorAll(".modal");
      this.openButtons = document.querySelectorAll(".open-modal");
      this.closeButtons = document.querySelectorAll(".close-modal");
      this.closeButtons2 = document.querySelectorAll(".close-modal-button");
      this._init();
    }
    _init() {
      this.openButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const modalId = button.getAttribute("data-modal");
          if (modalId) {
            const currentModal = button.closest(".modal");
            if (currentModal && currentModal.classList.contains("show")) {
              this.close();
            }
            setTimeout(() => {
              this.open(modalId);
            }, 10);
          }
        });
      });
      this.closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
          this.close();
        });
      });
      this.closeButtons2.forEach((button) => {
        button.addEventListener("click", () => {
          this.close();
        });
      });
      this.modals.forEach((modal3) => {
        modal3.addEventListener("click", (e) => {
          if (e.target === modal3) {
            this.close();
          }
        });
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          this.close();
        }
      });
    }
    open(modalId) {
      const modal3 = document.getElementById(modalId);
      if (modal3) {
        modal3.classList.add("show");
      }
    }
    close() {
      this.modals.forEach((modal3) => {
        modal3.classList.remove("show");
      });
    }
  };
  var modal = new Modal();
  window.modal = modal;

  // src/js/main/anchor.js
  function initAnchor() {
    console.log(1);
    var OFFSET_EXTRA = 30;
    var header = document.querySelector(".header__sticked");
    var isMobile = function() {
      return window.innerWidth <= 1260;
    };
    var links = document.querySelectorAll(".anchor");
    links.forEach(function(link) {
      link.addEventListener("click", function(e) {
        e.preventDefault();
        var href = link.getAttribute("href");
        if (!href) return;
        var rawId = href.substring(1);
        var targetId = rawId;
        if (rawId === "description") {
          targetId = isMobile() ? "description-mobile" : "description-desktop";
        }
        var target = document.getElementById(targetId);
        if (!target) return;
        var headerHeight = header ? header.offsetHeight : 0;
        var offsetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - OFFSET_EXTRA;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      });
    });
  }

  // src/js/main/characterisitc.js
  function initCharacteristic() {
    var MAX_VISIBLE = 12;
    var container = document.querySelector(".characteristic-block");
    if (!container) return;
    var items = container.querySelectorAll(".characteristic-item");
    if (!items || items.length === 0) return;
    var button = container.querySelector(".button-all-characteristic");
    if (!button) return;
    items.forEach(function(item, index) {
      if (index < MAX_VISIBLE) {
        item.classList.add("visible");
      }
    });
    if (items.length > MAX_VISIBLE) {
      button.style.display = "inline-flex";
      var expanded = false;
      button.addEventListener("click", function() {
        expanded = !expanded;
        if (expanded) {
          container.classList.add("show-all");
          button.textContent = "\u0421\u043A\u0440\u044B\u0442\u044C";
        } else {
          container.classList.remove("show-all");
          button.textContent = "\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u0441\u0435";
          items.forEach(function(item, index) {
            if (index >= MAX_VISIBLE) {
              item.classList.remove("visible");
            }
          });
        }
      });
    }
  }

  // src/js/main/sidebarCatalog.js
  function initSidebarCatalog() {
    document.querySelectorAll(".chapter-trigger").forEach(function(trigger) {
      trigger.addEventListener("click", function() {
        var parent = trigger.closest(".chapter-link-items");
        if (!parent) return;
        var content = parent.querySelector(".chapter-link-content");
        if (!content) return;
        var isActive = parent.classList.contains("active");
        var siblings = parent.parentElement ? parent.parentElement.querySelectorAll(".chapter-link-items.active") : [];
        siblings.forEach(function(sibling) {
          if (sibling !== parent) {
            sibling.classList.remove("active");
            var siblingContent = sibling.querySelector(".chapter-link-content");
            if (siblingContent) {
              siblingContent.style.height = siblingContent.scrollHeight + "px";
              requestAnimationFrame(function() {
                siblingContent.style.height = "0px";
              });
            }
          }
        });
        if (isActive) {
          content.style.height = content.scrollHeight + "px";
          requestAnimationFrame(function() {
            content.style.height = "0px";
          });
          parent.classList.remove("active");
        } else {
          content.style.height = content.scrollHeight + "px";
          parent.classList.add("active");
          var onTransitionEnd = function() {
            if (parent.classList.contains("active")) {
              content.style.height = "auto";
            }
            content.removeEventListener("transitionend", onTransitionEnd);
          };
          content.addEventListener("transitionend", onTransitionEnd);
        }
      });
    });
    var sortingBlocks = document.querySelectorAll(".chapter-sorting");
    sortingBlocks.forEach(function(block) {
      var button = block.querySelector(".chapter-button-sorting");
      var list = block.querySelector(".chapter-sorting__items");
      var defaultText = block.querySelector(".chapter-sorting-default");
      if (!button || !list || !defaultText) return;
      button.addEventListener("click", function() {
        var isActive = block.classList.contains("active");
        if (isActive) {
          list.style.height = list.scrollHeight + "px";
          requestAnimationFrame(function() {
            list.style.height = "0px";
          });
          block.classList.remove("active");
        } else {
          list.style.height = list.scrollHeight + "px";
          block.classList.add("active");
          var onTransitionEnd = function() {
            if (block.classList.contains("active")) {
              list.style.height = "auto";
            }
            list.removeEventListener("transitionend", onTransitionEnd);
          };
          list.addEventListener("transitionend", onTransitionEnd);
        }
      });
      var items = block.querySelectorAll(".chapter-sorting__item");
      items.forEach(function(item) {
        item.addEventListener("click", function(e) {
          e.preventDefault();
          items.forEach(function(i) {
            i.classList.remove("active");
          });
          item.classList.add("active");
          var iconSpan = item.querySelector(".chapter-sorting__item-icon");
          if (iconSpan) {
            defaultText.textContent = item.textContent || "";
          }
          list.style.height = list.scrollHeight + "px";
          requestAnimationFrame(function() {
            list.style.height = "0px";
          });
          block.classList.remove("active");
        });
      });
    });
    var filter = document.querySelector(".chapter-filter");
    var filterTitle = document.querySelector(".chapter-filter-title");
    if (filter && filterTitle) {
      filterTitle.addEventListener("click", function() {
        if (window.innerWidth < 991) {
          filter.classList.toggle("active");
        }
      });
    }
  }

  // src/js/main/description.js
  function initDescription() {
    const blocks = document.querySelectorAll(".product-description");
    blocks.forEach((block) => {
      const button = block.nextElementSibling;
      if (!button || !button.classList.contains("product-show-description")) return;
      const lineHeight = parseFloat(getComputedStyle(block).lineHeight);
      const maxHeight = lineHeight * 7;
      if (block.scrollHeight > maxHeight + 1) {
        button.classList.add("visible");
        block.style.maxHeight = maxHeight + "px";
        button.addEventListener("click", (e) => {
          e.preventDefault();
          const isExpanded = block.classList.toggle("expanded");
          if (isExpanded) {
            button.textContent = "\u0421\u043A\u0440\u044B\u0442\u044C";
            block.style.maxHeight = "none";
          } else {
            button.textContent = "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435";
            block.style.maxHeight = maxHeight + "px";
          }
        });
      }
    });
  }

  // src/js/main.ts
  document.addEventListener("DOMContentLoaded", () => {
    lazyLoadMedia();
    initSwiper();
    noUi();
    initFancybox();
    initTooltip();
    initCharacteristic();
    initSidebarCatalog();
    initDescription();
    initAnchor();
    void 0;
  });
})();
//# sourceMappingURL=main.js.map
