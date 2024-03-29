import { createAction } from '@ngrx/store';
import { ITag } from '../interfaces/tag.interface';

export const tagAll = createAction('[Tags] all');
export const tagCreate = createAction('[Tags] create', (tag: ITag) => ({ tag }));
export const tagDelete = createAction('[Tags] delete', (tagId: number) => ({ tagId }));
export const tagUpdate = createAction('[Tags] update', (tag: ITag) => ({ tag }));