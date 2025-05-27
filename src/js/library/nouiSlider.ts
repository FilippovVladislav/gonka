import noUiSlider from 'nouislider';
export function noUi(){
    // --- Первый слайдер: .slider-percent ---
    const percentSlider = document.querySelector('.slider-percent') as noUiSlider.target;
    const percentText = document.querySelector('.percent');

    if (percentSlider && percentText) {
        noUiSlider.create(percentSlider, {
            start: 50,
            connect: [true, false],
            range: {
                min: 50,
                max: 100,
            },
            step: 1,
            format: {
                to: (value: number) => Math.round(value),
                from: (value: string) => parseInt(value),
            },
        });

        percentSlider.noUiSlider?.on('update', (values) => {
            const value = values[0];
            if (percentText instanceof HTMLElement) {
                percentText.textContent = `${value}%`;
            }
        });
    }

    // --- Второй слайдер: .slider-period ---
    const periodSlider = document.querySelector('.slider-period') as noUiSlider.target;
    const periodText = document.querySelector('.period');

    if (periodSlider && periodText) {
        noUiSlider.create(periodSlider, {
            start: 1,
            connect: [true, false],
            range: {
                min: 1,
                max: 3,
            },
            step: 1,
            format: {
                to: (value: number) => Math.round(value),
                from: (value: string) => parseInt(value),
            },
        });

        periodSlider.noUiSlider?.on('update', (values) => {
            const value = values[0];
            if (periodText instanceof HTMLElement) {
                periodText.textContent = `${value}`;
            }
        });
    }
}

