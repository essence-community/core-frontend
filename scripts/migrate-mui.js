#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Загружаем маппинг миграции
const migrationMap = JSON.parse(fs.readFileSync(path.join(__dirname, '../migration-map.json'), 'utf8'));

// Функция для замены импортов
function migrateImports(content) {
    let migratedContent = content;

    // Заменяем импорты
    Object.entries(migrationMap.imports).forEach(([oldImport, newImport]) => {
        const importRegex = new RegExp(`from\\s+['"]${oldImport.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'g');
        migratedContent = migratedContent.replace(importRegex, `from '${newImport}'`);

        // Также заменяем require импорты
        const requireRegex = new RegExp(`require\\(\\s*['"]${oldImport.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]\\s*\\)`, 'g');
        migratedContent = migratedContent.replace(requireRegex, `require('${newImport}')`);
    });

    // Заменяем createMuiTheme на createTheme
    migratedContent = migratedContent.replace(/createMuiTheme/g, 'createTheme');

    return migratedContent;
}

// Функция для обработки файла
function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const migratedContent = migrateImports(content);

        if (content !== migratedContent) {
            fs.writeFileSync(filePath, migratedContent, 'utf8');
            console.log(`✅ Мигрирован: ${filePath}`);
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
    console.log('🚀 Начинаем миграцию Material-UI v4 на MUI v7...\n');

    // Находим все TypeScript и JavaScript файлы
    const patterns = [
        'packages/**/*.{ts,tsx,js,jsx}',
        'source/**/*.{ts,tsx,js,jsx}',
        'src/**/*.{ts,tsx,js,jsx}'
    ];

    let totalFiles = 0;
    let migratedFiles = 0;

    patterns.forEach(pattern => {
        const files = glob.sync(pattern, { ignore: ['**/node_modules/**', '**/build/**', '**/dist/**'] });

        files.forEach(file => {
            totalFiles++;
            if (processFile(file)) {
                migratedFiles++;
            }
        });
    });

    console.log(`\n📊 Результаты миграции:`);
    console.log(`   Всего файлов: ${totalFiles}`);
    console.log(`   Мигрировано: ${migratedFiles}`);
    console.log(`   Без изменений: ${totalFiles - migratedFiles}`);

    if (migratedFiles > 0) {
        console.log('\n✅ Миграция завершена успешно!');
        console.log('\n📝 Следующие шаги:');
        console.log('   1. Проверьте код на наличие ошибок');
        console.log('   2. Обновите стили, если необходимо');
        console.log('   3. Запустите тесты');
        console.log('   4. Проверьте работу приложения');
    } else {
        console.log('\nℹ️  Файлы для миграции не найдены');
    }
}

// Запускаем миграцию
if (require.main === module) {
    main();
}

module.exports = { migrateImports, processFile }; 