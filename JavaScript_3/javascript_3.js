// Tree Node.js File System

// Цель:
// Использовать Node.js API файловы системы;
// Применять асинхронные паттерны программирования в JavaScript;


// Описание/Пошаговая инструкция выполнения домашнего задания:
// Напишите NodeJS скрипт tree для вывода списка файлов и папок файловой системы.
// Приложение должно принимать аргумент каталога для анализа и флаг --depth, -d с номером глубины директорий.
// Результатом является вывод данных в структурированном виде дерева, аналогично упражнению Tree Function. Попробуйте повторно использовать код из предыдущего упражнения курса - Tree Function. Для этого, при чтении файловой системы сформируйте объект с аналогичной структурой предыдущему заданию.
// Вызовы файловой системы должны быть асинхронными.
// Например, при вызове скрипта с аргументом ./node, вывод может быть следующим:

// tree ./node -d 2
// node
// ├── cluster
// │ └── index.js
// ├── domain
// │ ├── error.js
// │ ├── flow.js
// │ └── run.js
// ├── errors
// │ ├── counter.js
// │ └── try-catch.js
// └── worker
// └── index.js
// 4 directories, 7 files


const fs = require('fs');
const path = require('path');

function tree(directory, depth) {
  const treeStructure = {
    name: path.basename(directory),
    children: []
  };

  function traverse(currentPath, currentNode, currentDepth) {
    const readedFiles = fs.readdirSync(currentPath);

    readedFiles.forEach((file) => {
      const fullPath = path.join(currentPath, file);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory() && (currentDepth < depth || depth === undefined)) {
        const directoryNode = { name: file, children: [] };
        currentNode.children.push(directoryNode);
        traverse(fullPath, directoryNode, currentDepth + 1);
      } else {
        currentNode.children.push({ name: file });
      }
    });
  }

  traverse(directory, treeStructure, 0);
  return treeStructure;
}

function getResultTree(treeStructure, depth = 0) {
  treeStructure.forEach((item, index) => {
    const prefix = index === treeStructure.length - 1 ? '└── ' : '├── ';
    const indentation = '│   '.repeat(depth);
    console.log(`${indentation}${prefix}${item.name}`);
    if ('children' in item) {
      getResultTree(item.children, depth + 1);
    }
  });
}

function getTotalCountFilesAndDirectories(treeStructure) {
  let filesCount = 0;
  let directoriesCount = 0;
  function count(tree) {
    if ('children' in tree) {
      directoriesCount++;
      for (const item of tree.children) {
        count(item);
      }
    } else {
      filesCount++;
    }
  }

  count(treeStructure);
  return { directories: directoriesCount, files: filesCount };
}

const directory = process.argv[2];
const depth = process.argv[4];

if (!directory) {
  console.error('Need a directory path');
  process.exit(1);
}

const result = tree(directory, parseInt(depth, 10));
const counts = getTotalCountFilesAndDirectories(result);
console.log(`${counts.directories} directories, ${counts.files} files`);
getResultTree([result]);