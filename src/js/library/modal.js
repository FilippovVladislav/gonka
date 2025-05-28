class Modal {
    constructor() {
        this.modals = document.querySelectorAll('.modal');
        this.openButtons = document.querySelectorAll('.open-modal');
        this.closeButtons = document.querySelectorAll('.close-modal');
        this.closeButtons2 = document.querySelectorAll('.close-modal-button');

        this._init();
    }

    _init() {
        // Обработка кнопок открытия модалок
        this.openButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const modalId = button.getAttribute('data-modal');
                if (modalId) {
                    // Если кнопка находится внутри модалки, закрыть текущую
                    const currentModal = button.closest('.modal');
                    if (currentModal && currentModal.classList.contains('show')) {
                        this.close();
                    }

                    // Немного подождать, чтобы избежать конфликтов с анимациями
                    setTimeout(() => {
                        this.open(modalId);
                    }, 10);
                }
            });
        });

        // Закрытие модалки по кнопке-крестику
        this.closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.close();
            });
        });

        this.closeButtons2.forEach(button => {
            button.addEventListener('click', () => {
                this.close();
            });
        });

        // Закрытие при клике вне содержимого модалки
        this.modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.close();
                }
            });
        });

        // Закрытие по клавише Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
    }

    open(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
        }
    }

    close() {
        this.modals.forEach(modal => {
            modal.classList.remove('show');
        });
    }
}

// Создаем экземпляр и сохраняем в глобальную область видимости, если нужно
const modal = new Modal();
window.modal = modal;
