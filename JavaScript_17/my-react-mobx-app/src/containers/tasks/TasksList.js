import React from 'react';
import { observer } from "mobx-react";
import css from './TasksList.module.css';
import tasksStore from '../../store/TasksStore';
import TaskCard from '../../components/TaskCard/TaskCard';

const TasksList = observer(() => (
    <div className={css.UsersContainer}>
        <span className={css.UsersTitle}>Список задач</span>
        <div className={css.UsersList}>
            {tasksStore.tasks.map(task => (
                <div key={task.id}>
                    <TaskCard key={task.id} task={task} />
                </div>
            ))}
        </div>
    </div>
));
export default TasksList;