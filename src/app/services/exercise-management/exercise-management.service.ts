import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Assembly } from '../../models/exercise-management/assembly';
import { ExerciseInfo } from '../../models/exercise-management/exercise-info';
import { ExerciseInfoList } from '../../models/exercise-management/exercise-info-list';
import { AuthService } from '../authentication/auth.service';
import { environment } from '../../../environments/environment';

const headers =  new HttpHeaders({ 'Content-Type': 'application/json' });


@Injectable()
export class ExerciseManagementService {

  private assembliesElementsUrl = environment.apiUrl + 'api/v1/assemblyInfo/elements';
  private exerciseInfoListUrl = environment.apiUrl + 'api/v1/exercises/names-and-ids';
  private exerciseInfoUrl = environment.apiUrl + 'api/v1/exercises/create-task';
  private deleteExerciseUrl = environment.apiUrl + 'api/v1/exercises';
  private exerciseForEditUrl = environment.apiUrl + 'api/v1/exercises/task';
  private updateExerciseUrl = environment.apiUrl + 'api/v1/exercises/update-task';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAssembliesElements(): Observable<Assembly[]> {
    return this.http.get<Assembly[]>(this.assembliesElementsUrl, { headers: this.authService.getAuthHeader() });
  }

  getExerciseNameAndId(): Observable<ExerciseInfoList[]> {
    return this.http.get<ExerciseInfoList[]>(this.exerciseInfoListUrl, { headers: this.authService.getAuthHeader() });
  }

  addExercise (exercise: ExerciseInfo): Observable<ExerciseInfo> {
    return this.http.post<ExerciseInfo>(this.exerciseInfoUrl, exercise, { headers: this.authService.addAuthHeader(headers) });
  }

  getExercise(id: number): Observable<ExerciseInfo> {
    const url = `${this.exerciseForEditUrl}/${id}`;
    return this.http.get<ExerciseInfo>(url, { headers: this.authService.getAuthHeader() });
  }

  deleteExercise (exercise: ExerciseInfoList | number): Observable<ExerciseInfoList> {
    const id = typeof exercise === 'number' ? exercise : exercise.item2;
    const url = `${this.deleteExerciseUrl}/${id}`;

    return this.http.delete<ExerciseInfoList>(url, { headers: this.authService.getAuthHeader() } );
  }

  updateExercise (exercise: ExerciseInfo): Observable<any> {
    return this.http.put(this.updateExerciseUrl, exercise, { headers: this.authService.addAuthHeader(headers) });
  }
}
