export function initTooltip() {
    tippy('[data-tippy-content]', {
        placement: 'top', // Позиция подсказки: top, bottom, left, right
        arrow: true,      // Показывать стрелку
        animation: 'scale', // Анимация появления
        theme: 'light-border' // Тема подсказки
    });
}