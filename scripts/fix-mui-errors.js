#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Функция для исправления ошибок MUI
function fixMuiErrors(content) {
    let fixedContent = content;

    // 1. Заменяем MuiThemeProvider на ThemeProvider
    fixedContent = fixedContent.replace(/MuiThemeProvider/g, 'ThemeProvider');

    // 2. Заменяем justify на justifyContent в Grid
    fixedContent = fixedContent.replace(/justify:\s*["']([^"']+)["']/g, 'justifyContent: "$1"');

    // 3. Заменяем SvgIconProps импорты
    fixedContent = fixedContent.replace(
        /from\s+["']@material-ui\/core\/SvgIcon["']/g,
        "from '@mui/material/SvgIcon'"
    );

    // 4. Заменяем onEscapeKeyDown на onKeyDown в Modal
    fixedContent = fixedContent.replace(/onEscapeKeyDown/g, 'onKeyDown');

    // 5. Исправляем Grid props - добавляем component prop где нужно
    // Это более сложная замена, поэтому делаем её аккуратно
    fixedContent = fixedContent.replace(
        /<Grid\s+item\s+([^>]*)>/g,
        '<Grid item component="div" $1>'
    );

    // 6. Исправляем Grid container с justify
    fixedContent = fixedContent.replace(
        /<Grid\s+container\s+justify\s*=\s*["']([^"']+)["']/g,
        '<Grid container justifyContent="$1"'
    );

    // 7. Исправляем Modal props
    fixedContent = fixedContent.replace(
        /<Modal\s+([^>]*)>/g,
        '<Modal component="div" $1>'
    );

    return fixedContent;
}

// Функция для обработки файла
function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const fixedContent = fixMuiErrors(content);

        if (content !== fixedContent) {
            fs.writeFileSync(filePath, fixedContent, 'utf8');
            console.log(`✅ Исправлен: ${filePath}`);
            return true;
        }
        return false;
    } catch (error) {
        console.error(`❌ Ошибка при обработке ${filePath}:`, error.message);
        return false;
    }
}

// Основная функция
function main() {
    console.log('🔧 Исправляем ошибки MUI миграции...\n');

    // Находим все TypeScript и JavaScript файлы
    const patterns = [
        'packages/**/*.{ts,tsx,js,jsx}',
        'source/**/*.{ts,tsx,js,jsx}',
        'src/**/*.{ts,tsx,js,jsx}'
    ];

    let totalFiles = 0;
    let fixedFiles = 0;

    patterns.forEach(pattern => {
        const files = glob.sync(pattern, { ignore: ['**/node_modules/**', '**/build/**', '**/dist/**'] });

        files.forEach(file => {
            totalFiles++;
            if (processFile(file)) {
                fixedFiles++;
            }
        });
    });

    console.log(`\n📊 Результаты исправления:`);
    console.log(`   Всего файлов: ${totalFiles}`);
    console.log(`   Исправлено: ${fixedFiles}`);
    console.log(`   Без изменений: ${totalFiles - fixedFiles}`);

    if (fixedFiles > 0) {
        console.log('\n✅ Исправления завершены!');
        console.log('\n📝 Следующие шаги:');
        console.log('   1. Запустите TypeScript проверку снова');
        console.log('   2. Исправьте оставшиеся ошибки вручную');
        console.log('   3. Запустите тесты');
    } else {
        console.log('\nℹ️  Файлы для исправления не найдены');
    }
}

// Запускаем исправления
if (require.main === module) {
    main();
}

module.exports = { fixMuiErrors, processFile }; 