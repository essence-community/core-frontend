const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Функция для замены старых селекторов на новые
function migrateSelectors(content) {
    return content
        // Заменяем overrides на components
        .replace(/overrides:/g, 'components:')
        // Заменяем структуру переопределений
        .replace(/Mui(\w+):\s*{/g, 'Mui$1: {\n        styleOverrides: {')
        .replace(/},\s*}/g, '        },\n    },')
        // Заменяем старые селекторы состояний на новые
        .replace(/&\$(\w+)/g, '&.Mui-$1')
        .replace(/&\$checked/g, '&.Mui-checked')
        .replace(/&\$disabled/g, '&.Mui-disabled')
        .replace(/&\$error/g, '&.Mui-error')
        .replace(/&\$focused/g, '&.Mui-focused')
        .replace(/&\$active/g, '&.Mui-active')
        .replace(/&\$inputMultiline/g, '&.MuiInputBase-inputMultiline')
        // Заменяем вложенные селекторы
        .replace(/\$(\w+)/g, '.Mui-$1')
        .replace(/\$icon/g, '.MuiTableSortLabel-icon')
        .replace(/\$bar/g, '.MuiSwitch-track')
        // Исправляем импорты
        .replace(/Theme\["overrides"\]/g, 'Theme["components"]')
        .replace(/ThemeComponents/g, 'Theme["components"]');
}

// Функция для обработки файла
function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const migratedContent = migrateSelectors(content);

        if (content !== migratedContent) {
            fs.writeFileSync(filePath, migratedContent);
            console.log(`✅ Migrated: ${filePath}`);
            return true;
        }
        return false;
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
        return false;
    }
}

// Основная функция миграции
function migrateThemeOverrides() {
    console.log('🔄 Starting theme overrides migration...');

    const patterns = [
        'packages/@essence/essence-constructor-classes/src/**/*.overrides.ts',
        'packages/@essence/essence-constructor-classes/src/**/*.tsx',
        'packages/@essence/essence-constructor-share/src/**/*.ts',
    ];

    let totalFiles = 0;
    let migratedFiles = 0;

    patterns.forEach(pattern => {
        const files = glob.sync(pattern);
        totalFiles += files.length;

        files.forEach(file => {
            if (processFile(file)) {
                migratedFiles++;
            }
        });
    });

    console.log(`\n📊 Migration Summary:`);
    console.log(`   Total files processed: ${totalFiles}`);
    console.log(`   Files migrated: ${migratedFiles}`);
    console.log(`   Files unchanged: ${totalFiles - migratedFiles}`);

    if (migratedFiles > 0) {
        console.log('\n✅ Theme overrides migration completed successfully!');
    } else {
        console.log('\nℹ️  No files needed migration.');
    }
}

// Запуск миграции
if (require.main === module) {
    migrateThemeOverrides();
}

module.exports = { migrateThemeOverrides, migrateSelectors }; 