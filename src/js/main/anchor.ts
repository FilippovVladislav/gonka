export function initAnchor(){
    const OFFSET_EXTRA = 30;
    const header = document.querySelector<HTMLElement>(".header__sticked");
    const isMobile = () => window.innerWidth <= 1260; // Можно настроить под свои брейкпоинты

    document.querySelectorAll<HTMLAnchorElement>(".anchor").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const rawId = link.getAttribute("href")?.substring(1);
            if (!rawId) return;

            let targetId = rawId;
            if (rawId === "description") {
                targetId = isMobile() ? "description-mobile" : "description-desktop";
            }

            const target = document.getElementById(targetId);
            if (!target) return;

            const headerHeight = header?.offsetHeight ?? 0;
            const offsetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - OFFSET_EXTRA;

            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
        });
    });
}