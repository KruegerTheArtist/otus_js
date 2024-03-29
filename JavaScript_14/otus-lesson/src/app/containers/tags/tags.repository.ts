import { Injectable } from "@angular/core";
import { StoreService, TAGS_KEY } from "../../shared/services/store.service";
import { ITag } from "app/shared/interfaces/tag.interface";
import { TagsState } from "app/shared/reducers/tags.reducer";
import { Store } from "@ngrx/store";
import { tagCreate, tagDelete, tagUpdate } from "app/shared/actions/tags.actions";
import { Observable, take } from "rxjs";

@Injectable()
export class TagsRepository {

    constructor(
        private _storeService: StoreService,
        private store: Store<{tags: TagsState}>
    ) {}

    getAll(): Observable<TagsState> {
        return this.store.select('tags');
    }

    delete(tag: ITag): void {
        this.getAll()
            .pipe(take(1))
            .subscribe(tagsState => this.deleteTag(tagsState, tag));
    }

    add(tag: ITag): void {
        this.getAll()
            .pipe(take(1))
            .subscribe(tagsState => this.addTag(tagsState, tag));
    }

    update(tag: ITag): void {
        this.getAll()
            .pipe(take(1))
            .subscribe(tagsState => this.updateTag(tagsState, tag));
    }

    private deleteTag(tagsState: TagsState, tag: ITag): void {
        const tagFinded = tagsState.tags.filter(x => x.id !== tag.id);

        this._storeService.set<ITag[]>(TAGS_KEY, tagFinded);
        this.store.dispatch(tagDelete(Number(tag.id)));
    }

    private addTag(tagsState: TagsState, tag: ITag): void {
        const findedIndex = tagsState.tags.findIndex(x => x.name === tag.name);

        if (findedIndex === -1) {
            tag.id = Math.floor(Math.random() * 99999);

            this.store.dispatch(tagCreate(tag));
            this._storeService.set(TAGS_KEY, [...tagsState.tags, tag]);
        }
    }

    private updateTag(tagsState: TagsState, tag: ITag): void {
        const tagFinded = tagsState.tags.find(x => x.id === tag.id);

        if (tagFinded) {
            this.store.dispatch(tagUpdate(tag));
            this._storeService.set(
                TAGS_KEY,
                tagsState.tags.map(x => (x.id === tag.id ? tag : x))
            );
        }
    }

}
