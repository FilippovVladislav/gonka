export function initSidebarCatalog(){
    document.querySelectorAll<HTMLButtonElement>('.chapter-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const parent = trigger.closest<HTMLElement>('.chapter-link-items');
            if (!parent) return;

            const content = parent.querySelector<HTMLElement>('.chapter-link-content');
            if (!content) return;

            const isActive = parent.classList.contains('active');

            const siblings = parent.parentElement?.querySelectorAll<HTMLElement>('.chapter-link-items.active');

            // Закрываем все соседние активные элементы
            siblings?.forEach(sibling => {
                if (sibling !== parent) {
                    sibling.classList.remove('active');
                    const siblingContent = sibling.querySelector<HTMLElement>('.chapter-link-content');
                    if (siblingContent) {
                        siblingContent.style.height = `${siblingContent.scrollHeight}px`;
                        requestAnimationFrame(() => {
                            siblingContent.style.height = '0px';
                        });
                    }
                }
            });

            if (isActive) {
                // Закрыть текущий
                content.style.height = `${content.scrollHeight}px`;
                requestAnimationFrame(() => {
                    content.style.height = '0px';
                });
                parent.classList.remove('active');
            } else {
                // Открыть текущий
                content.style.height = `${content.scrollHeight}px`;
                parent.classList.add('active');

                const onTransitionEnd = () => {
                    if (parent.classList.contains('active')) {
                        content.style.height = 'auto';
                    }
                    content.removeEventListener('transitionend', onTransitionEnd);
                };

                content.addEventListener('transitionend', onTransitionEnd);
            }
        });
    });

    const sortingBlocks = document.querySelectorAll<HTMLElement>('.chapter-sorting');

    sortingBlocks.forEach(block => {
        const button = block.querySelector<HTMLButtonElement>('.chapter-button-sorting');
        const list = block.querySelector<HTMLElement>('.chapter-sorting__items');
        const defaultText = block.querySelector<HTMLElement>('.chapter-sorting-default');

        if (!button || !list || !defaultText) return;

        // Переключение списка
        button.addEventListener('click', () => {
            const isActive = block.classList.contains('active');

            if (isActive) {
                // Закрыть
                list.style.height = `${list.scrollHeight}px`;
                requestAnimationFrame(() => {
                    list.style.height = '0px';
                });
                block.classList.remove('active');
            } else {
                // Открыть
                list.style.height = `${list.scrollHeight}px`;
                block.classList.add('active');

                const onTransitionEnd = () => {
                    if (block.classList.contains('active')) {
                        list.style.height = 'auto';
                    }
                    list.removeEventListener('transitionend', onTransitionEnd);
                };

                list.addEventListener('transitionend', onTransitionEnd);
            }
        });

        // Клик по элементу сортировки
        const items = block.querySelectorAll<HTMLAnchorElement>('.chapter-sorting__item');

        items.forEach(item => {
            item.addEventListener('click', e => {
                e.preventDefault();

                // Удаляем active у всех
                items.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // Обновляем текст
                const iconSpan = item.querySelector('.chapter-sorting__item-icon');
                if (iconSpan) {
                    defaultText.textContent = item.textContent || '';
                }

                // Закрыть список
                list.style.height = `${list.scrollHeight}px`;
                requestAnimationFrame(() => {
                    list.style.height = '0px';
                });
                block.classList.remove('active');
            });
        });
    });

    const filter = document.querySelector<HTMLElement>('.chapter-filter');
    const filterTitle = document.querySelector<HTMLElement>('.chapter-filter-title');

    if (filter && filterTitle) {
        filterTitle.addEventListener('click', () => {
            if (window.innerWidth < 991) {
                filter.classList.toggle('active');
            }
        });
    }
}