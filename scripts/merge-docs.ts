#!/usr/bin/env bun

import { readFile, writeFile, exists } from 'fs/promises';
import { join, dirname } from 'path';

/**
 * Скрипт для объединения всех файлов документации v0.3 в один файл
 * согласно порядку, указанному в README.md
 */

const V03_DIR = join(import.meta.dir, '..');
const OUTPUT_FILE = join(import.meta.dir, '..', 'full.md');

// Порядок файлов согласно README.md
const FILE_ORDER = [
  // Часть I: Теоретические Основы
  '00-foundations.md',
  '01-universal-principles.md', 
  '02-consciousness-model.md',
  
  // Часть II: Математическая Формализация
  '03-mathematical-framework.md',
  '04-category-theory.md',
  '05-quantum-formalism.md',
  
  // Часть III: Проблемный Анализ
  '06-problem-space.md',
  '07-resilience-analysis.md',
  '08-safety-guarantees.md',
  
  // Часть IV: Спецификация Реализации
  '09-implementation-roadmap.md',
  '10-typescript-architecture.md',
  '11-rust-components.md',
  '12-integration.md',
  
  // Приложения
  'A-glossary.md',
  'B-proofs.md',
  'C-benchmarks.md',
  'D-symbols.md',
  'boundary-analysis.md'
];

interface FileInfo {
  path: string;
  content: string;
  title: string;
  exists: boolean;
}

async function readFileContent(filename: string): Promise<FileInfo> {
  const filePath = join(V03_DIR, filename);
  const exists = await checkFileExists(filePath);
  
  if (!exists) {
    console.warn(`⚠️  Файл не найден: ${filename}`);
    return {
      path: filePath,
      content: `# ${filename}\n\n*Файл не найден*\n`,
      title: filename.replace('.md', ''),
      exists: false
    };
  }
  
  try {
    const content = await readFile(filePath, 'utf-8');
    const title = extractTitle(content) || filename.replace('.md', '');
    
    return {
      path: filePath,
      content,
      title,
      exists: true
    };
  } catch (error) {
    console.error(`❌ Ошибка чтения файла ${filename}:`, error);
    return {
      path: filePath,
      content: `# ${filename}\n\n*Ошибка чтения файла*\n`,
      title: filename.replace('.md', ''),
      exists: false
    };
  }
}

function extractTitle(content: string): string | null {
  const titleMatch = content.match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1].trim() : null;
}

async function checkFileExists(filePath: string): Promise<boolean> {
  try {
    await readFile(filePath);
    return true;
  } catch {
    return false;
  }
}

function generateTableOfContents(files: FileInfo[]): string {
  let toc = '# Содержание\n\n';
  
  const sections = [
    { title: 'Часть I: Теоретические Основы', start: 0, end: 3 },
    { title: 'Часть II: Математическая Формализация', start: 3, end: 6 },
    { title: 'Часть III: Проблемный Анализ', start: 6, end: 9 },
    { title: 'Часть IV: Спецификация Реализации', start: 9, end: 13 },
    { title: 'Приложения', start: 13, end: files.length }
  ];
  
  let sectionIndex = 1;
  
  for (const section of sections) {
    if (section.start < files.length) {
      toc += `## ${section.title}\n\n`;
      
      for (let i = section.start; i < Math.min(section.end, files.length); i++) {
        const file = files[i];
        const status = file.exists ? '✅' : '❌';
        toc += `${sectionIndex}. ${status} [${file.title}](#${file.title.toLowerCase().replace(/\s+/g, '-')})\n`;
        sectionIndex++;
      }
      toc += '\n';
    }
  }
  
  return toc;
}

function generateHeader(): string {
  return `# AURA: Адаптивная Унифицированная Резонансная Архитектура
## Версия 0.3 - Полная Спецификация

*Этот документ объединяет все файлы спецификации AURA v0.3 в единый документ согласно порядку, указанному в README.md*

**Дата создания:** ${new Date().toLocaleDateString('ru-RU')}  
**Автоматически сгенерировано скриптом merge-docs.ts**

---

`;
}

async function main() {
  console.log('🚀 Начинаю объединение документации AURA v0.3...\n');
  
  // Читаем все файлы
  const files: FileInfo[] = [];
  
  for (const filename of FILE_ORDER) {
    console.log(`📖 Читаю ${filename}...`);
    const fileInfo = await readFileContent(filename);
    files.push(fileInfo);
    
    if (fileInfo.exists) {
      console.log(`   ✅ ${fileInfo.title}`);
    } else {
      console.log(`   ❌ Файл не найден`);
    }
  }
  
  console.log('\n📝 Создаю объединённый документ...');
  
  // Генерируем содержимое
  let content = generateHeader();
  content += generateTableOfContents(files);
  content += '\n---\n\n';
  
  // Добавляем содержимое каждого файла
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const sectionNumber = i + 1;
    
    content += `\n\n<!-- ===== ${file.title} ===== -->\n\n`;
    content += file.content;
    
    if (i < files.length - 1) {
      content += '\n\n---\n';
    }
  }
  
  // Записываем результат
  await writeFile(OUTPUT_FILE, content, 'utf-8');
  
  console.log(`\n✅ Документ успешно создан: ${OUTPUT_FILE}`);
  console.log(`📊 Размер файла: ${(content.length / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📄 Количество символов: ${content.length.toLocaleString('ru-RU')}`);
  
  // Показываем статистику
  const existingFiles = files.filter(f => f.exists).length;
  const missingFiles = files.length - existingFiles;
  
  console.log(`\n📈 Статистика:`);
  console.log(`   ✅ Успешно: ${existingFiles}/${files.length} файлов`);
  if (missingFiles > 0) {
    console.log(`   ❌ Отсутствует: ${missingFiles} файлов`);
  }
}

// Запускаем скрипт
if (import.meta.main) {
  main().catch(error => {
    console.error('❌ Критическая ошибка:', error);
    process.exit(1);
  });
}
