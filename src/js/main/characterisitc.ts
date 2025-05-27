export function initCharacteristic() {
    const MAX_VISIBLE = 12;

    const container = document.querySelector<HTMLElement>(".characteristic-block");
    const items = container?.querySelectorAll<HTMLElement>(".characteristic-item") || [];
    const button = container?.querySelector<HTMLButtonElement>(".button-all-characteristic");

    if (!container || !button || items.length === 0) return;

    // Показываем первые 12
    items.forEach((item, index) => {
        if (index < MAX_VISIBLE) {
            item.classList.add("visible");
        }
    });

    // Показываем кнопку, если элементов больше 12
    if (items.length > MAX_VISIBLE) {
        button.style.display = "inline-flex";

        let expanded = false;

        button.addEventListener("click", () => {
            expanded = !expanded;

            if (expanded) {
                container.classList.add("show-all");
                button.textContent = "Скрыть";
            } else {
                container.classList.remove("show-all");
                button.textContent = "Развернуть все";

                // Скрываем лишние
                items.forEach((item, index) => {
                    if (index >= MAX_VISIBLE) {
                        item.classList.remove("visible");
                    }
                });
            }
        });
    }
}