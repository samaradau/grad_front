import { ExerciseResult } from './exercise-result';

export class TaskResult extends ExerciseResult {
  code: string;
  usedTipsNumber: number;
  completed: boolean;
  startDate: string;
  endDate: string;
}
