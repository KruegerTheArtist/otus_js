import { Injectable } from "@angular/core";
import { StoreService, TAGS_KEY } from "../../shared/services/store.service";
import { ITag } from "app/shared/interfaces/tag.interface";

@Injectable()
export class TagsRepository {
    tags: ITag[] = [];

    constructor(private _storeService: StoreService) {
        this._initData();
     }
    getAll() {
        return this.tags;
    }
    delete(tag: ITag): void {
        const tagFinded = this.tags.filter(x => x.id !== tag.id);
        this._storeService.set<ITag[]>(TAGS_KEY, tagFinded);
        this._initData()
    }
    add(tag: ITag): void {
        const findedIndex = this.tags.findIndex(x => x.name === tag.name);
        console.log(findedIndex, this.tags);
        if(findedIndex === -1) {
            tag.id = Math.floor(Math.random() * 99999);
            this.tags.push(tag);
            console.log(this.tags);
            
            this._storeService.set(TAGS_KEY, this.tags);
        }
        this._initData()
    }

    private _initData(): void {
        const tags = this._storeService.get<ITag[]>(TAGS_KEY);
        if(tags) {
            this.tags = tags;
        }
    }
}