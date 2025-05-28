export function initCharacteristic() {
    var MAX_VISIBLE = 12;

    var container = document.querySelector(".characteristic-block");
    if (!container) return;

    var items = container.querySelectorAll(".characteristic-item");
    if (!items || items.length === 0) return;

    var button = container.querySelector(".button-all-characteristic");
    if (!button) return;

    // Показываем первые 12
    items.forEach(function(item, index) {
        if (index < MAX_VISIBLE) {
            item.classList.add("visible");
        }
    });

    // Показываем кнопку, если элементов больше 12
    if (items.length > MAX_VISIBLE) {
        button.style.display = "inline-flex";

        var expanded = false;

        button.addEventListener("click", function() {
            expanded = !expanded;

            if (expanded) {
                container.classList.add("show-all");
                button.textContent = "Скрыть";
            } else {
                container.classList.remove("show-all");
                button.textContent = "Развернуть все";

                // Скрываем лишние
                items.forEach(function(item, index) {
                    if (index >= MAX_VISIBLE) {
                        item.classList.remove("visible");
                    }
                });
            }
        });
    }
}
