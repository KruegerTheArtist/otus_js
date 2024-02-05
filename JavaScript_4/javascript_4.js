// Написать алгоритм и функцию getPath(), находяющую уникальный css-селектор для элемента в документе.
// Уникальный селектор может быть использован document.querySelector() и возвращать исходный элемент.
// Так чтобы document.querySelectorAll(), вызванный с этим селектором, не должен находить никаких элементов, кроме исходного.

// $0 // HTMLElement
// getPath($0) // => "body div.someclass ul li:first-child"
// Использовать TDD, добавить юнит тесты для функции

function getPath(currEl, testedBody) {
	var arr = [];

	function eachElements(el) {

		const documentBody = testedBody ? testedBody : document?.body;
		if (el === documentBody) {
			return arr.reverse();
		}

		arr.push(el?.tagName?.toLowerCase() + getNthPosition(el));

		return eachElements(el?.parentElement);

	}

	function getNthPosition(el) {

		var previousEl = el?.previousElementSibling,
			count = 1,
			result = '';


		while (previousEl) {
			++count;
			previousEl = previousEl?.previousElementSibling;
		}

		result = ':nth-child(' + count + ')';

		return result;

	}

	var strOut = eachElements(currEl).join('>');
	console.log(currEl);
	alert(strOut);
}


function test() {
	const body =
		`<body onclick="getPath(event.target)">
<div class="learn">
	<form>FORM
	    <div>DIV
	      <p>P</p>
	    </div>
  	</form>
</div>
</body>`

	console.log(getPath('<p>P</p>', body));
}

test()