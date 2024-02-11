// Написать алгоритм и функцию getPath(), находяющую уникальный css-селектор для элемента в документе.
// Уникальный селектор может быть использован document.querySelector() и возвращать исходный элемент.
// Так чтобы document.querySelectorAll(), вызванный с этим селектором, не должен находить никаких элементов, кроме исходного.

// $0 // HTMLElement
// getPath($0) // => "body div.someclass ul li:first-child"
// Использовать TDD, добавить юнит тесты для функции

function getPath(neededElement) {
	if (!neededElement) {
		return;
	}

	const arr = [];

	function eachElements(elem) {
		if (elem === document?.body) {
			return arr.reverse();
		}

		arr.push(`${elem.tagName.toLowerCase()}${getNthPosition(elem)}`);

		return eachElements(elem.parentElement);
	}

	function getNthPosition(element) {
		let prevElement = element.previousElementSibling;
		let count = 1;

		while (prevElement) {
			++count;
			prevElement = prevElement.previousElementSibling;
		}

		return `:nth-child(${count})`;
	}

	const strOut = eachElements(neededElement).join('>');

	return strOut;
}

function test() {
	function assert(condition, message) {
		if (!condition) {
			console.error(`Тест завершился с ошибкой: ${message}`);
		} else {
			console.log('Тест пройден');
		}
	}

	const element = document.querySelector('.ul-otus li:nth-child(2)');
	const selector = getPath(element);
	console.log(document.querySelectorAll(selector).length, document.querySelectorAll(selector), selector);
	assert(document.querySelectorAll(selector).length === 1, 'Должен был найти один элемент');
}

test();