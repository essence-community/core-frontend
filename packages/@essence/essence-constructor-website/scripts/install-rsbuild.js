#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Установка rsbuild зависимостей...');

try {
    // Устанавливаем rsbuild пакеты
    console.log('📦 Установка @rsbuild/core и @rsbuild/plugin-react...');
    execSync('yarn add @rsbuild/core @rsbuild/plugin-react', { stdio: 'inherit' });

    console.log('📦 Установка @module-federation/rsbuild...');
    execSync('yarn add @module-federation/rsbuild', { stdio: 'inherit' });

    console.log('✅ Rsbuild зависимости установлены успешно!');
    console.log('');
    console.log('📋 Следующие шаги:');
    console.log('1. Удалите старые webpack зависимости (опционально):');
    console.log('   yarn remove webpack webpack-dev-server html-webpack-plugin');
    console.log('');
    console.log('2. Запустите проект:');
    console.log('   yarn start');
    console.log('');
    console.log('3. Для сборки:');
    console.log('   yarn run build');

} catch (error) {
    console.error('❌ Ошибка при установке зависимостей:', error.message);
    process.exit(1);
} 