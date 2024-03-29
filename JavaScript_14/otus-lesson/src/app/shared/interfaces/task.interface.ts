import { Level } from '../enums/level.enum';

/**
 *
 */
export interface ITask {
  id?: number | null | undefined;
  name: string;
  description: string;
  exampleData: string;
  level: Level;
  tags: number[];
}
