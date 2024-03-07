/** Ответ от сервиса переводчика */
export interface ITranslateResponse {
    /** Ответ */
    responseData: {
      /** Перевод */
      translatedText: string;
      /** Совпадение */
      match: number;
    };
    /** Статус */
    responseStatus: number;
    /** Совпадения */
    matches: [
      {
        /** ИД слова */
        id: number;
        /** Сегмент слова */
        segment: string;
        /** Переведенное слово */
        translatio: string;
        /** Исходная локаль */
        source: string;
        /** Локаль переведенная */
        target: string;
      }[],
    ];
  }
  