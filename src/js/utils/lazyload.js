export function lazyLoadMedia() {
    const lazyImages = document.querySelectorAll("img.lazy-img");
    const lazySources = document.querySelectorAll("source[data-srcset]");
    const lazyVideos = document.querySelectorAll("video.lazy-video");
    const lazyBackgrounds = document.querySelectorAll("[data-bg]");
    const lcpElement = document.querySelector(".lcp-element");

    const getBgImage = (dataBg) => {
        const bgImages = dataBg.split(',').map(image => image.trim());
        const windowWidth = window.innerWidth;
        return windowWidth < 991 ? bgImages[1] : bgImages[0];
    };

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Обработка <picture>
                    const picture = entry.target.closest("picture");
                    if (picture) {
                        const img = picture.querySelector("img.lazy-img");
                        const sources = picture.querySelectorAll("source[data-srcset]");

                        sources.forEach(source => {
                            source.srcset = source.dataset.srcset || "";
                            source.removeAttribute("data-srcset");
                        });

                        if (img && img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute("data-src");
                            img.classList.remove("lazy-img");
                            img.onload = () => {
                                img.style.opacity = '1';
                            };
                        }

                        if (img) observer.unobserve(img);
                    }

                    // Обработка <video>
                    const video = entry.target;
                    if (video.tagName === 'VIDEO' && video.dataset.src) {
                        const sources = video.querySelectorAll("source[data-src]");
                        sources.forEach(source => {
                            source.src = source.dataset.src || "";
                            source.removeAttribute("data-src");
                        });

                        video.src = video.dataset.src;
                        video.removeAttribute("data-src");
                        video.classList.remove("lazy-video");
                        video.load();
                        observer.unobserve(video);
                    }

                    // Обработка фона
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

        lazyImages.forEach(img => observer.observe(img));
        lazyVideos.forEach(video => observer.observe(video));
        lazyBackgrounds.forEach(el => observer.observe(el));

        // Предзагрузка LCP-элемента
        if (lcpElement) {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';

            if (lcpElement.tagName === 'IMG') {
                preloadLink.as = 'image';
                preloadLink.href = lcpElement.src;
            } else if (lcpElement.tagName === 'VIDEO') {
                preloadLink.as = 'video';
                preloadLink.href = lcpElement.src;
            }

            document.head.appendChild(preloadLink);
        }
    } else {
        // Fallback для старых браузеров
        lazyImages.forEach(img => {
            img.src = img.dataset.src || "";
            img.removeAttribute("data-src");
            img.classList.remove("lazy-img");
        });

        lazySources.forEach(source => {
            source.srcset = source.dataset.srcset || "";
            source.removeAttribute("data-srcset");
        });

        lazyVideos.forEach(video => {
            video.src = video.dataset.src || "";
            video.removeAttribute("data-src");
            video.classList.remove("lazy-video");

            const sources = video.querySelectorAll("source[data-src]");
            sources.forEach(source => {
                source.src = source.dataset.src || "";
                source.removeAttribute("data-src");
            });

            video.load();
        });

        // Предзагрузка LCP-элемента
        if (lcpElement) {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';

            if (lcpElement.tagName === 'IMG') {
                preloadLink.as = 'image';
                preloadLink.href = lcpElement.src;
            } else if (lcpElement.tagName === 'VIDEO') {
                preloadLink.as = 'video';
                preloadLink.href = lcpElement.src;
            }

            document.head.appendChild(preloadLink);
        }
    }
}
