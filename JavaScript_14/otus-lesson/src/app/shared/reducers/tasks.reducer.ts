import { createReducer, on } from '@ngrx/store';
import * as TasksActions from '../actions/tasks.actions';
import { TASKS_KEY } from '../services/store.service';
import { ITask } from '../interfaces/task.interface';

export interface TasksState {
  tasks: ITask[];
}

export const initialState: TasksState = {
  tasks: (JSON.parse(String(localStorage.getItem(TASKS_KEY))) as ITask[]) || []
};

export const tasksReducer = createReducer(
  initialState,
  on(TasksActions.tasksCreate, (state, { task }) => ({ ...state, tasks: [...state.tasks, task] })),
  on(TasksActions.tasksUpdate, (state, { task }) => ({ ...state, tasks: state.tasks.map(t => t.id === task.id ? task : t) })),
  on(TasksActions.tasksDelete, (state, { taskId }) => ({ ...state, tasks: state.tasks.filter(t => t.id !== taskId) }))
);