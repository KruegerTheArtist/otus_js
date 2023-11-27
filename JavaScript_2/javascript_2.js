/**
*
Необходимо разработать функцию deepEqual, которая будет проводить глубокое сравнение между переданными объектами actual и expected. Под глубоким сравнением понимается то, что собственные свойства дочерних объектов также рекурсивно сравниваются. Если объекты не идентичны, вывести ошибку с путем до неидентичного свойства (например, используя нотацию JSON Path - $.store.book.author). Идеальную функцию сравнения написать невозможно, поэтому постарайтесь реализовать самые важные моменты:

Рекурсия останавливается, когда найдено отличие
Сравниваются собственные итерируемые свойства, без учета прототипа
Важно реализовать сравнение примитивных свойств, итерирование массивов и объектов
const obj1 = {
a: {
b: 1,
},
};
const obj2 = {
a: {
b: 2,
},
};
const obj3 = {
a: {
b: 1,
},
};
deepEqual(obj1, obj1);
// OK
deepEqual(obj1, obj2);
// Error: a.b
deepEqual(obj1, obj3);
// OK

 */


function deepEqual(actual, expected, path = '') {
	if (actual === expected) {
		return true;
	}

	if (Object.keys(actual).length !== Object.keys(expected).length) {
		console.error(`Error: ${path} `);
		return false;
	}

	if (typeof actual !== 'object' || typeof expected !== 'object' || actual === null || expected === null) {
		if (actual !== expected) {
			console.error(`Error: ${path} `);
			return false;
		}
		return true;
	}

	for (let key of Object.keys(actual)) {
		if (!Object.keys(expected).includes(key) || deepEqual(actual[key], expected[key], path ? `${path}.${key} ` : key)) {
			return false;
		}
	}

	return true;
}

const obj1 = {
	a: {
		b: 1,
	},
};

const obj2 = {
	a: {
		b: 2,
	},
};

const obj3 = {
	a: {
		b: 1,
	},
};

console.log(deepEqual(obj1, obj1)); // OK
console.log(deepEqual(obj1, obj2)); // Error: a.b
console.log(deepEqual(obj1, obj3)); // OK
