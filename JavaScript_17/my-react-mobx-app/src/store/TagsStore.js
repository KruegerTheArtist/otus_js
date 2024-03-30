import { makeAutoObservable } from "mobx";

class TagsStore {
    tags = [{id: 1, name: 'Tag1'}, {id: 2, name: 'Tag2'}];

    constructor() {
        makeAutoObservable(this);
    }

    addTag(item) {
        this.tags.push({ ...item, tags: [] });
    }

    removeTag(index) {
        this.tags.splice(index, 1);
    }
}

export default new TagsStore();