import React, { useState } from 'react';
import css from './AddTask.module.css';
import tasksStore from '../../store/TasksStore';
import tagsStore from '../../store/TagsStore';
import levels from '../../shared/constants/levels.constant';

const AddTask = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [exampleData, setExampleData] = useState('');
    const [level, setLevel] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        tasksStore.addTask({ id: Date.now(), name, tags, description, exampleData, level });
        setName('');
        setDescription('');
        setExampleData('');
        setTags([]);
        setLevel('');
    };

    return (

        <form className={css.AddUser} onSubmit={handleSubmit}>
            <h2>Добавление задачи</h2>
            <input
                type="text"
                value={name}
                placeholder="Наименование"
                onChange={(e) => setName(e.target.value)}
            />
            <textarea
                type="text"
                rows={4}
                value={description}
                placeholder="Описание"
                onChange={(e) => setDescription(e.target.value)}
            />
            <span>Уровень сложности</span>
            <select
                className={css.Select}
                multiple
                required
                value={Array.isArray(level) ? level : []}
                onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                    setLevel(selectedOptions);
                }}
            >
                {levels.map((level, index) => (
                    <option key={index} value={level}>
                        {level}
                    </option>
                ))}
            </select>
            <span>Теги</span>
            <select
                className={css.Select}
                multiple
                value={Array.isArray(tags) ? tags : []}
                required
                onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                    setTags(selectedOptions);
                }}
            >
                {tagsStore.tags.map((tag) => (
                    <option key={tag.id} value={tag.name}>
                        {tag.name}
                    </option>
                ))}
            </select>
            <textarea
                type="text"
                rows={4}
                value={exampleData}
                placeholder="Пример входных и выходных данных"
                onChange={(e) => setExampleData(e.target.value)}
            />
            <button type="submit">Добавить</button>
        </form>
    );
};

export default AddTask;