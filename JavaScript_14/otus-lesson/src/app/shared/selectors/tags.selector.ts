import { createSelector } from '@ngrx/store';
import { TagsState } from '../reducers/tags.reducer';

export const selectFeature = (state: { tags: TagsState }) => state.tags;

export const selectFeatureCount = createSelector(
  selectFeature,
  (state: TagsState) => state.tags
);