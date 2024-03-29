import { createAction } from '@ngrx/store';
import { ITask } from '../interfaces/task.interface';

export const tasksAll = createAction('[Tasks] all');
export const tasksCreate = createAction('[Tasks] create', (task: ITask) => ({ task }));
export const tasksDelete = createAction('[Tasks] delete', (taskId: number) => ({ taskId }));
export const tasksUpdate = createAction('[Tasks] update', (task: ITask) => ({ task }));