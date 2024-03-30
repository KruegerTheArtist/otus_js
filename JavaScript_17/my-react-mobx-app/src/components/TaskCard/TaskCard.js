import { useState } from 'react';
import css from './TaskCard.module.css';
import svgEdit from '../../assets/img/edit.svg';
import svgGoto from '../../assets/img/goto.svg';
import tasksStore from '../../store/TasksStore';
import tagsStore from '../../store/TagsStore';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
const TaskCard = observer(({ task }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTags, setNewTags] = useState(task.tags);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        tasksStore.setTags(task.id, newTags);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setNewTags(task.tags);
        setIsEditing(false);
    };

    return (
        <div className={css.UserInfo}>
            <div className={css.Row + ' ' + css.Name}>
                <span className={css.Name}>
                    {task.name}
                </span>
                <Link to={`/tasks/${task.id}`}><img className={css.EditButton} src={svgGoto} alt="edit" onClick={handleEdit} /></Link>
            </div>
            <div className={css.Row}>
                <span className={css.RowTitle}> Уровень сложности: </span><span>{task.level}</span>
            </div>
            {isEditing ? (
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
                            {tagsStore.tags.map((tag) => (
                                <option key={tag.id} value={tag.name}>
                                    {tag.name}
                                </option>
                            ))}
                        </select>
                        <div className={css.RatingButtons}>
                            <button onClick={handleSave}>Ок</button>
                            <button onClick={handleCancel}>Отмена</button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className={css.Row}>
                        <span className={css.RowTitle}> Теги: <span>{task.tags.join(', ')}</span></span>
                        <img className={css.EditButton} src={svgEdit} alt="edit" onClick={handleEdit} />
                    </div>
                </>
            )}
            <div className={css.Row}>
                <span className={css.RowTitle}> Описание: </span><span>{task.description}</span>
            </div>
            <div className={css.Row}>
                <span className={css.RowTitle}> Урвоень сложности: </span><span>{task.level}</span>
            </div>
            <div className={css.Row}>
                <span className={css.RowTitle}> Пример данных: </span><span>{task.exampleData}</span>
            </div>
            <button onClick={() => tasksStore.removeTask(task.id)}>Удалить</button>
        </div>
    );
});

export default TaskCard;