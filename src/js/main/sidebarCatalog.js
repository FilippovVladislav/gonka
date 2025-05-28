export function initSidebarCatalog() {
    document.querySelectorAll('.chapter-trigger').forEach(function(trigger) {
        trigger.addEventListener('click', function() {
            var parent = trigger.closest('.chapter-link-items');
            if (!parent) return;

            var content = parent.querySelector('.chapter-link-content');
            if (!content) return;

            var isActive = parent.classList.contains('active');

            var siblings = parent.parentElement ? parent.parentElement.querySelectorAll('.chapter-link-items.active') : [];

            // Закрываем все соседние активные элементы
            siblings.forEach(function(sibling) {
                if (sibling !== parent) {
                    sibling.classList.remove('active');
                    var siblingContent = sibling.querySelector('.chapter-link-content');
                    if (siblingContent) {
                        siblingContent.style.height = siblingContent.scrollHeight + 'px';
                        requestAnimationFrame(function() {
                            siblingContent.style.height = '0px';
                        });
                    }
                }
            });

            if (isActive) {
                // Закрыть текущий
                content.style.height = content.scrollHeight + 'px';
                requestAnimationFrame(function() {
                    content.style.height = '0px';
                });
                parent.classList.remove('active');
            } else {
                // Открыть текущий
                content.style.height = content.scrollHeight + 'px';
                parent.classList.add('active');

                var onTransitionEnd = function() {
                    if (parent.classList.contains('active')) {
                        content.style.height = 'auto';
                    }
                    content.removeEventListener('transitionend', onTransitionEnd);
                };

                content.addEventListener('transitionend', onTransitionEnd);
            }
        });
    });

    var sortingBlocks = document.querySelectorAll('.chapter-sorting');

    sortingBlocks.forEach(function(block) {
        var button = block.querySelector('.chapter-button-sorting');
        var list = block.querySelector('.chapter-sorting__items');
        var defaultText = block.querySelector('.chapter-sorting-default');

        if (!button || !list || !defaultText) return;

        // Переключение списка
        button.addEventListener('click', function() {
            var isActive = block.classList.contains('active');

            if (isActive) {
                // Закрыть
                list.style.height = list.scrollHeight + 'px';
                requestAnimationFrame(function() {
                    list.style.height = '0px';
                });
                block.classList.remove('active');
            } else {
                // Открыть
                list.style.height = list.scrollHeight + 'px';
                block.classList.add('active');

                var onTransitionEnd = function() {
                    if (block.classList.contains('active')) {
                        list.style.height = 'auto';
                    }
                    list.removeEventListener('transitionend', onTransitionEnd);
                };

                list.addEventListener('transitionend', onTransitionEnd);
            }
        });

        // Клик по элементу сортировки
        var items = block.querySelectorAll('.chapter-sorting__item');

        items.forEach(function(item) {
            item.addEventListener('click', function(e) {
                e.preventDefault();

                // Удаляем active у всех
                items.forEach(function(i) { i.classList.remove('active'); });
                item.classList.add('active');

                // Обновляем текст
                var iconSpan = item.querySelector('.chapter-sorting__item-icon');
                if (iconSpan) {
                    defaultText.textContent = item.textContent || '';
                }

                // Закрыть список
                list.style.height = list.scrollHeight + 'px';
                requestAnimationFrame(function() {
                    list.style.height = '0px';
                });
                block.classList.remove('active');
            });
        });
    });

    var filter = document.querySelector('.chapter-filter');
    var filterTitle = document.querySelector('.chapter-filter-title');

    if (filter && filterTitle) {
        filterTitle.addEventListener('click', function() {
            if (window.innerWidth < 991) {
                filter.classList.toggle('active');
            }
        });
    }
}
