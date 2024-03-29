import { Injectable } from '@angular/core';
import { IRecentlyAdded } from 'app/shared/interfaces/recently-added.interface';
import { RECENTLY_ADDED_KEY, StoreService } from '../../shared/services/store.service';

/**
 *
 */
@Injectable()
export class RecentlyAddedRepository {
  recentlyAddedWords: IRecentlyAdded[] = [];

  constructor(private _storeService: StoreService) {
    this._initData();
  }

  /**
   *
   */
  getAll() {
    return this.recentlyAddedWords;
  }

  /**
   *
   */
  delete(recentlyAdd: IRecentlyAdded): void {
    const arrayWithoutWord = this.recentlyAddedWords.filter(
      (x) => x.word !== recentlyAdd.word
    );
    this._storeService.set<IRecentlyAdded[]>(RECENTLY_ADDED_KEY, arrayWithoutWord);
    this._initData();
  }

  /**
   *
   */
  add(recentlyAdd: IRecentlyAdded): void {
    const findedIndex = this.recentlyAddedWords.findIndex((x) => x.word === recentlyAdd.word);
    console.log(findedIndex, this.recentlyAddedWords);
    if (findedIndex === -1) {
      this.recentlyAddedWords.push(recentlyAdd);
      this._storeService.set(RECENTLY_ADDED_KEY, this.recentlyAddedWords);
    }
    this._initData();
  }

  private _initData(): void {
    const recentlyAdded = this._storeService.get<IRecentlyAdded[]>(RECENTLY_ADDED_KEY);
    if (recentlyAdded) {
      this.recentlyAddedWords = recentlyAdded;
    }
  }
}
