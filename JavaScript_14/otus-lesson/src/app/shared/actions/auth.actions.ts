// Исходя из предоставленного вами контекста, кажется, что в вашем проекте уже настроен NgRx, так как импорты для StoreModule, EffectsModule и StoreDevtoolsModule уже существуют в файле JavaScript_14/otus-lesson/src/app/app.component.ts.

// Для демонстрации я приведу пример, основанный на вашей текущей настройке:

// Создайте новое действие в отдельном файле, например auth.actions.ts:
// Copy
// Insert
// auth.actions.ts
import { createAction } from '@ngrx/store';
import { IAuthUser } from '../interfaces/auth-user.interface';

export const login = createAction('[Auth] Login', (currentAuthUser: IAuthUser) => ({ currentAuthUser }));
export const logout = createAction('[Auth] Logout');