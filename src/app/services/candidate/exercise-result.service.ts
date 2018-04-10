import { Injectable } from '@angular/core';
import { ExerciseResult } from '../../models/exercise-executor/exercise-result';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../authentication/auth.service';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';


@Injectable()
export class ExerciseResultService {

  exerciseResultUrl = environment.apiUrl + '/api/v1/exerciseResults/';
  constructor(private http: HttpClient, private authService: AuthService) { }

  getCandidateExercises(candidateId: string): Observable<ExerciseResult[]> {
    return this.http.get<ExerciseResult[]>(
      this.exerciseResultUrl + candidateId,
      { headers: this.authService.getAuthHeader() }
    );
  }

}
