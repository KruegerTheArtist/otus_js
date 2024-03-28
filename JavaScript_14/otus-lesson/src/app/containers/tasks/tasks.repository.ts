import { Injectable } from '@angular/core';
import { ITask } from 'app/shared/interfaces/task.interface';
import { StoreService, TASKS_KEY } from '../../shared/services/store.service';

/**
 *
 */
@Injectable()
export class TasksRepository {
  tags: ITask[] = [];

  constructor(private _storeService: StoreService) {
    this._initData();
  }

  /**
   *
   */
  getAll() {
    return this.tags;
  }

  /**
   *
   */
  delete(tag: ITask): void {
    const tagFinded = this.tags.filter((x) => x.id !== tag.id);
    this._storeService.set<ITask[]>(TASKS_KEY, tagFinded);
    this._initData();
  }

  /**
   *
   */
  add(tag: ITask): void {
    const findedIndex = this.tags.findIndex((x) => x.name === tag.name);
    if (findedIndex === -1) {
      tag.id = Math.floor(Math.random() * 99999);
      this.tags.push(tag);
      this._storeService.set(TASKS_KEY, this.tags);
    }
    this._initData();
  }

  /**
   *
   */
  update(tag: ITask): void {
    const findedIndex = this.tags.findIndex((x) => x.id === tag.id);
    if (findedIndex !== -1) {
      this.tags[findedIndex] = { ...this.tags[findedIndex], ...tag };
      this._storeService.set(TASKS_KEY, this.tags);
    }
    this._initData();
  }

  private _initData(): void {
    const tags = this._storeService.get<ITask[]>(TASKS_KEY);
    if (tags) {
      this.tags = tags;
    }
  }
}
