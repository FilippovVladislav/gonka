export function noUi() {
    // --- Первый слайдер: .slider-percent ---
    var percentSlider = document.querySelector('.slider-percent');
    var percentText = document.querySelector('.percent');

    if (percentSlider && percentText) {
        if (!percentSlider.noUiSlider) {  // Проверяем, есть ли уже слайдер
            noUiSlider.create(percentSlider, {
                start: 50,
                connect: [true, false],
                range: {
                    min: 50,
                    max: 100
                },
                step: 1,
                format: {
                    to: function (value) {
                        return Math.round(value);
                    },
                    from: function (value) {
                        return parseInt(value);
                    }
                }
            });

            percentSlider.noUiSlider.on('update', function (values) {
                var value = values[0];
                percentText.textContent = value + '%';
            });
        }
    }

    // --- Второй слайдер: .slider-period ---
    var periodSlider = document.querySelector('.slider-period');
    var periodText = document.querySelector('.period');

    if (periodSlider && periodText) {
        if (!periodSlider.noUiSlider) {  // Проверка перед созданием слайдера
            noUiSlider.create(periodSlider, {
                start: 1,
                connect: [true, false],
                range: {
                    min: 1,
                    max: 3
                },
                step: 1,
                format: {
                    to: function (value) {
                        return Math.round(value);
                    },
                    from: function (value) {
                        return parseInt(value);
                    }
                }
            });

            periodSlider.noUiSlider.on('update', function (values) {
                var value = values[0];
                periodText.textContent = value;
            });
        }
    }
}
