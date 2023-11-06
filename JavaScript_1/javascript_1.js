"use strict"

/**
 * Tree Function

Цель:
Напишите функцию tree(), которая принимает в качестве аргумента иерархический объект со свойствами name, items и выводит структурированный вывод дерева в консоль.


Описание/Пошаговая инструкция выполнения домашнего задания:
Пример входных данных:

{
    name: 1,
    items: [
        {
        name: 2,
        items: [{ name: 3 }, 
                { name: 4 }]
        }, 
        {
        name: 5,
        items: [{ name: 6 }]
        }]
}
Ожидаемый результат:

1
├── 2
│   └── 3
│   └── 4
└── 5
    └── 6
Пожалуйста, прикрепите ссылку на Pull Request в вашем репозитории на Github.
 */

const data = {
    name: 1,
    items: [{
        name: 2,
        items: [{
            name: 3
        }, {
            name: 4
        }]
    }, {
        name: 5,
        items: [{
            name: 6
        }]
    }]
};

const tPrefix = '├── ';
const lPrefix = '└── ';

function tree(node, prefix = '') {
    console.log(prefix + node.name);
    if (node?.items && node?.items.length) {
        node.items.forEach((n, i) => {
            const lastNode = i === node.items.length - 1;
            tree(n, prefix + (lastNode ? lPrefix : tPrefix));
        })
    }
}

tree(data);