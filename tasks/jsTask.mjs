import gulp from 'gulp';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const gulpEsbuild = require('gulp-esbuild');
import fs from 'fs';
import path from 'path';

// Функция для создания папки, если она не существует
function createFolderIfNotExists(folderPath) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
}

export async function jsTask() {
    const outputDir = 'dist/js';

    // Убедимся, что папка dist/js существует
    createFolderIfNotExists(outputDir);

    return gulp.src('src/js/**/*.{ts, js}') // Все .js и .ts файлы
        .pipe(gulpEsbuild({
            loader: {
                '.ts': 'ts',
                '.js': 'js'
            },
            bundle: true,
            minify: false, // ❌ Отключаем минификацию
            sourcemap: true,
            target: ['es2017'],
            entryNames: '[name]', // Имя файла сохраняется
            outdir: '', // Оставляем пустым — gulp.dest используется
        }).on('error', function (err) {
            console.error('Esbuild error:', err.message);
            this.emit('end');
        }))
        .pipe(gulp.dest(outputDir));
}
