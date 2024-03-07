import { IRecentlyAdded } from "./recently-added.interface";

/** Интерфейс для передачи данных из диалогового окна */
export interface IReturnDialogData {
    /** Закрыто с помощью главной кнопки */
    ok?: boolean;
    /** Закрыто с помощью кнопки "Отмена" */
    cancel?: boolean;
    /** Данные для передачи в компонент */
    data?: IRecentlyAdded;
}