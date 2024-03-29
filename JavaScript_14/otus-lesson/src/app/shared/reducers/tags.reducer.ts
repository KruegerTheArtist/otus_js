import { createReducer, on } from '@ngrx/store';
import * as TagsActions from '../actions/tags.actions';
import { TAGS_KEY } from '../services/store.service';
import { ITag } from '../interfaces/tag.interface';

export interface TagsState {
  tags: ITag[];
}

export const initialState: TagsState = {
  tags: (JSON.parse(String(localStorage.getItem(TAGS_KEY))) as ITag[]) || []
};

export const tagsReducer = createReducer(
  initialState,
  on(TagsActions.tagCreate, (state, { tag }) => ({ ...state, tags: [...state.tags, tag] })),
  on(TagsActions.tagUpdate, (state, { tag }) => ({ ...state, tags: state.tags.map(t => t.id === tag.id ? tag : t) })),
  on(TagsActions.tagDelete, (state, { tagId }) => ({ ...state, tags: state.tags.filter(t => t.id !== tagId) }))
);