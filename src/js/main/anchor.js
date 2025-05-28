export function initAnchor() {
    console.log(1)
    var OFFSET_EXTRA = 30;
    var header = document.querySelector(".header__sticked");
    var isMobile = function() {
        return window.innerWidth <= 1260; // Можно настроить под свои брейкпоинты
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
