import { HONDA_MODELS, TOYOTA_MODELS } from './models';

/** Бренды машин */
export const BRANDS = new Map<string, string[]>()
  .set('Toyota', TOYOTA_MODELS)
  .set('Honda', HONDA_MODELS);
