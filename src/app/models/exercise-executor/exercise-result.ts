import { CandidateExercise } from './candidate-exercise';

export class ExerciseResult {
  id: number;
  candidateExercise: CandidateExercise;
  candidateExerciseId: number;
  score: number;
  creatorId: string;
  modifierId: string;
}
