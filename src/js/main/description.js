export function initDescription(){
        const blocks = document.querySelectorAll('.product-description');

        blocks.forEach(block => {
            const button = block.nextElementSibling; // предполагаем, что кнопка — соседний элемент после описания

            if (!button || !button.classList.contains('product-show-description')) return;

            // Проверяем высоту блока, чтобы понять, нужно ли показывать кнопку
            const lineHeight = parseFloat(getComputedStyle(block).lineHeight);
            const maxHeight = lineHeight * 7; // высота для 7 строк

            // Если содержимое выше лимита — показываем кнопку
            if (block.scrollHeight > maxHeight + 1) { // +1 для небольшого запаса
                button.classList.add('visible');
                block.style.maxHeight = maxHeight + 'px'; // явно задать max-height

                button.addEventListener('click', (e) => {
                    e.preventDefault();

                    const isExpanded = block.classList.toggle('expanded');

                    if (isExpanded) {
                        button.textContent = 'Скрыть';
                        block.style.maxHeight = 'none';
                    } else {
                        button.textContent = 'Подробнее';
                        block.style.maxHeight = maxHeight + 'px';
                    }
                });
            }
        });

}