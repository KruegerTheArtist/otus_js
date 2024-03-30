import css from './TaskDetails.module.css';
import tasksStore from '../../store/TasksStore';
import svgEdit from '../../assets/img/edit.svg';
import tagsStore from '../../store/TagsStore';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import levels from '../../shared/constants/levels.constant';
import CodeEditor from '../CodeEditor/CodeEditor';
const TaskDetails = observer(() => {
    const { id } = useParams();
    const [code, setCode] = useState(`console.log('Hello world!')`);

    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };
    const task = tasksStore.tasks?.find(u => u.id === Number(id));
    const [isEditingTags, setIsEditingTags] = useState(false);
    const [newTags, setNewTags] = useState(task?.tags || []);
    const [isEditingName, setIsEditingName] = useState(false);
    const [newName, setNewName] = useState(task?.name || '');
    const [isEditingLevel, setIsEditingLevel] = useState(false);
    const [newLevel, setNewLevel] = useState(task?.level);
    const [isEditingExampleData, setIsEditingExampleData] = useState(false);
    const [newExampleData, setNewExampleData] = useState(task?.exampleData);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [newDescription, setNewDescription] = useState(task?.description);

    const handleEditTags = () => {
        setIsEditingTags(true);
    };

    const handleTagsSave = () => {
        tasksStore.setTags(task.id, newTags);
        setIsEditingTags(false);
    };

    const handleTagsCancel = () => {
        setNewTags(task?.tags);
        setIsEditingTags(false);
    };


    const handleEditLevel = () => {
        setIsEditingLevel(true);
    };

    const handleLevelSave = () => {
        tasksStore.setLevel(task.id, newLevel);
        setIsEditingLevel(false);
    };

    const handleLevelCancel = () => {
        setNewLevel(task.level);
        setIsEditingLevel(false);
    };

    const handleEditDescription = () => {
        setIsEditingDescription(true);
    };

    const handleDescriptionSave = () => {
        tasksStore.setDescription(task.id, newDescription);
        setIsEditingDescription(false);
    };

    const handleDescriptionCancel = () => {
        setNewDescription(task.description);
        setIsEditingDescription(false);
    };

    const handleEditExampleData = () => {
        setIsEditingExampleData(true);
    };

    const handleExampleDataSave = () => {
        tasksStore.setExampleData(task.id, newExampleData);
        setIsEditingExampleData(false);
    };

    const handleExampleDataCancel = () => {
        setNewExampleData(task.exampleData);
        setIsEditingExampleData(false);
    };

    const handleEditName = () => {
        setIsEditingName(true);
    };

    const handleNameSave = () => {
        tasksStore.setName(task.id, newName);
        setIsEditingName(false);
    };

    const handleNameCancel = () => {
        setNewName(task?.name);
        setIsEditingName(false);
    };


    function getCurrentTaskDetails() {
        if (!task) {
            return <div>User not found</div>;
        } else {
            return (
                <div className={css.UserInfo}>
                    {
                        tasksStore.tasks.length === 0 && !task ? (<><div>Задача не найдена</div></>) : (<>


                            {isEditingName ? (
                                <>
                                    <div className={css.Row}>
                                        <input
                                            type="text"
                                            value={newName}
                                            placeholder="Наименование"
                                            onChange={(e) => setNewName(e.target.value)}
                                        />

                                        <div className={css.RatingButtons}>
                                            <button onClick={handleNameSave}>Ок</button>
                                            <button onClick={handleNameCancel}>Отмена</button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={css.Row}>
                                        <div className={css.Row + ' ' + css.Name}>
                                            <span className={css.Name}>
                                                {task?.name}
                                            </span>
                                        </div>
                                        <img className={css.EditButton} src={svgEdit} alt="edit" onClick={handleEditName} />
                                    </div>
                                </>
                            )}
                            {isEditingDescription ? (
                                <>
                                    <div className={css.Row}>
                                        <textarea
                                            type="text"
                                            value={newDescription}
                                            rows={4}
                                            placeholder="Описание"
                                            onChange={(e) => setNewDescription(e.target.value)}
                                        />

                                        <div className={css.RatingButtons}>
                                            <button onClick={handleDescriptionSave}>Ок</button>
                                            <button onClick={handleDescriptionCancel}>Отмена</button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={css.Row}>
                                        <div className={css.Row + ' ' + css.TextArea}>
                                            <span className={css.RowTitle}>
                                                Описание:
                                                <img className={css.EditButton} src={svgEdit} alt="edit" onClick={handleEditDescription} />
                                            </span>
                                            <span>
                                                {task?.description}
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className={css.Divider}></div>
                            {isEditingLevel ? (
                                <>
                                    <div className={css.Row}>
                                        <select
                                            className={css.Select}
                                            value={newLevel}
                                            onChange={(e) => {
                                                const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                                                setNewLevel(selectedOptions);
                                            }}
                                        >
                                            {levels.map((level, index) => (
                                                <option key={index} value={level}>
                                                    {level}
                                                </option>
                                            ))}
                                        </select>
                                        <div className={css.RatingButtons}>
                                            <button onClick={handleLevelSave}>Ок</button>
                                            <button onClick={handleLevelCancel}>Отмена</button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={css.Row}>
                                        <span className={css.RowTitle}> Уровень сложности: <span>{task.level}</span></span>
                                        <img className={css.EditButton} src={svgEdit} alt="edit" onClick={handleEditLevel} />
                                    </div>
                                </>
                            )}
                            <div className={css.Divider}></div>
                            {isEditingTags ? (
                                <>
                                    <div className={css.Row}>
                                        <select
                                            className={css.Select}
                                            multiple
                                            value={newTags}
                                            onChange={(e) => {
                                                const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                                                setNewTags(selectedOptions);
                                            }}
                                        >
                                            {tagsStore.tags?.map((tag) => (
                                                <option key={tag.id} value={tag?.name}>
                                                    {tag?.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className={css.RatingButtons}>
                                            <button onClick={handleTagsSave}>Ок</button>
                                            <button onClick={handleTagsCancel}>Отмена</button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={css.Row}>
                                        <span className={css.RowTitle}> Теги: <span>{task.tags?.join(', ')}</span></span>
                                        <img className={css.EditButton} src={svgEdit} alt="edit" onClick={handleEditTags} />
                                    </div>
                                </>
                            )}
                            <div className={css.Divider}></div>
                            {isEditingExampleData ? (
                                <>
                                    <div className={css.Row}>
                                        <textarea
                                            type="text"
                                            value={newExampleData}
                                            rows={4}
                                            placeholder="Пример входных и вызодных данных"
                                            onChange={(e) => setNewExampleData(e.target.value)}
                                        />

                                        <div className={css.RatingButtons}>
                                            <button onClick={handleExampleDataSave}>Ок</button>
                                            <button onClick={handleExampleDataCancel}>Отмена</button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={css.Row}>
                                        <div className={css.Row + ' ' + css.TextArea}>
                                            <span className={css.RowTitle}>
                                                Пример входных и выходных данных:
                                                <img className={css.EditButton} src={svgEdit} alt="edit" onClick={handleEditExampleData} />
                                            </span>
                                            <span>
                                                {task?.exampleData}
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className={css.Divider}></div>
                            <CodeEditor  value={code} onChange={handleCodeChange}/>
                        </>)
                    }
                </div>
            )
        }
    }


    return (
        <div className={css.FullWidth}>
            {
                getCurrentTaskDetails()
            }
        </div>
    )
});

export default TaskDetails;