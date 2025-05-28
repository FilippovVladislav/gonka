function addPreloadToLCP() {
    const lcpElements = Array.from(document.querySelectorAll('img, video, picture, .lcp-text'));
    let lcpElement = null;

    lcpElements.forEach((element) => {
        const rect = element.getBoundingClientRect();

        if (rect.top >= 0 && rect.top < window.innerHeight) {
            if (element instanceof HTMLImageElement || element instanceof HTMLVideoElement) {
                if (!lcpElement || rect.height > lcpElement.clientHeight) {
                    lcpElement = element;
                }
            }

            if (element instanceof HTMLPictureElement) {
                const sources = element.querySelectorAll('source');
                sources.forEach((source) => {
                    const srcset = source.dataset.srcset || source.srcset;
                    const type = source.type;

                    if (srcset) {
                        const image = new Image();
                        image.srcset = srcset;
                        image.onload = function () {
                            const width = image.width;
                            const height = image.height;
                            if (!lcpElement || (height * width > lcpElement.clientWidth * lcpElement.clientHeight)) {
                                lcpElement = element;
                            }
                        };

                        if (type === 'image/webp') {
                            const preloadLink = document.createElement('link');
                            preloadLink.rel = 'preload';
                            preloadLink.as = 'image';
                            preloadLink.href = srcset;
                            preloadLink.type = 'image/webp';
                            document.head.appendChild(preloadLink);
                        }
                    }
                });
            }

            if (element.classList.contains('lcp-text')) {
                const height = rect.height;
                if (!lcpElement || height > lcpElement.clientHeight) {
                    lcpElement = element;
                }
            }
        }
    });

    if (lcpElement) {
        let preloadLink = null;

        if (lcpElement instanceof HTMLImageElement) {
            preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'image';
            preloadLink.href = lcpElement.src;
        } else if (lcpElement instanceof HTMLVideoElement) {
            const videoSource = lcpElement.querySelector('source');
            if (videoSource instanceof HTMLSourceElement) {
                preloadLink = document.createElement('link');
                preloadLink.rel = 'preload';
                preloadLink.as = 'video';
                preloadLink.href = videoSource.src;
            }
        } else if (lcpElement instanceof HTMLPictureElement) {
            const pictureSource = lcpElement.querySelector('source');
            if (pictureSource instanceof HTMLSourceElement) {
                preloadLink = document.createElement('link');
                preloadLink.rel = 'preload';
                preloadLink.as = 'image';
                preloadLink.href = pictureSource.srcset || pictureSource.dataset.srcset;

                if (pictureSource.type === 'image/webp') {
                    preloadLink.type = 'image/webp';
                }
            }
        } else if (lcpElement.classList.contains('lcp-text')) {
            console.log("LCP элемент - текст:", lcpElement);
        }

        if (preloadLink) {
            document.head.appendChild(preloadLink);
        }
    }
}
