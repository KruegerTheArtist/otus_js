import { Injectable } from '@angular/core';
import { ITask } from 'app/shared/interfaces/task.interface';
import { StoreService, TASKS_KEY } from '../../shared/services/store.service';
import { Store } from '@ngrx/store';
import { TasksState } from 'app/shared/reducers/tasks.reducer';
import { take } from 'rxjs';
import { tasksCreate, tasksDelete, tasksUpdate } from 'app/shared/actions/tasks.actions';

/**
 *
 */
@Injectable()
export class TasksRepository {

  constructor(private _storeService: StoreService, private store: Store<{tasks: TasksState}>) {
  }

  /**
   *
   */
  getAll() {
    return this.store.select('tasks');
  }

  /**
   *
   */
  delete(task: ITask): void {
    this.getAll().pipe(take(1)).subscribe((tasksState) => {
      const tasksWithoutFinded = tasksState.tasks.filter((x) => x.id !== task.id);
      this._storeService.set<ITask[]>(TASKS_KEY, tasksWithoutFinded);
      this.store.dispatch(tasksDelete(Number(task.id)))
    })
  }

  /**
   *
   */
  add(task: ITask): void {
    this.getAll().pipe(take(1)).subscribe((tasksState) => {
      const findedIndex = tasksState.tasks.findIndex((x) => x.name === task.name);
    if (findedIndex === -1) {
      task.id = Math.floor(Math.random() * 99999);
      this._storeService.set(TASKS_KEY, [...tasksState.tasks, task]);
      this.store.dispatch(tasksCreate(task))
    }
  })
  }

  /**
   *
   */
  update(task: ITask): void {
    this.getAll().pipe(take(1)).subscribe((tasksState) => {
      const findedIndex = tasksState.tasks.findIndex((x) => x.id === task.id);
    if (findedIndex !== -1) {
      this._storeService.set(TASKS_KEY, tasksState.tasks.map((x) => x.id === task.id ? task : x));
      console.log(task);
      
      this.store.dispatch(tasksUpdate(task))
    }
  })
}
}
