// Используйте модуль streams для программы простой индексации текста.
// Она должна:

// Читать текстовый файл переданный в аргументах к скрипту
// Разделять входные данные на отдельные слова, разделенные разделителем (пробел, символ новой строки)
// Фильтровать не-текстовые символы (например, ',')
// Индексировать текст в вектор - массив чисел. Позиция в массиве представляет порядок всех входных слов, отсортированных в алфавитном порядке. Значение - это количество появлений определенного слова в тексте.
// Вывести результирующий вектор в файл.
// Примеры:
// a c b b -> потенциальное промежуточное представление { a: 1, b: 2, c: 1 } -> [1, 2, 1]
// ab cb bss b -> [1, 1, 1, 1]
// ab, cb, bss, cb, b, cb -> [1, 1, 1, 3]
// alex, alex, juan, dima -> [2, 1, 1]
// Желательно использовать потоки для всех шагов программы.



const fs = require('fs');
const { Transform } = require('stream');

const inputFile = process.argv[2];
const outputFile = 'output.txt';

const transformStream = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    const words = chunk.split(/[ \n]+/);
    
    const wordCounts = {};
    words.forEach((word) => {
      const filteredWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
      if (filteredWord) {
        wordCounts[filteredWord] = (wordCounts[filteredWord] || 0) + 1;
      }
    });

    this.push(wordCounts);
    callback();
  },
});

const totalCounts = {};

const countStream = new Transform({
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    Object.entries(chunk).forEach(([word, count]) => {
      totalCounts[word] = (totalCounts[word] || 0) + count;
    });
    callback();
  },

  flush(callback) {
    const sortedWords = Object.keys(totalCounts).filter(word => !word.startsWith('_')).sort();
    const vector = sortedWords.map(word => totalCounts[word]);
    fs.writeFile(outputFile, vector.join(','), (err) => {
      if (err) {
        console.error('Ошибка при записи в файл:', err);
      } else {
        console.log('Результат записан в файл', outputFile);
      }
      callback();
    });
  },
});

fs.createReadStream(inputFile, { encoding: 'utf8' })
  .pipe(transformStream)
  .pipe(countStream);