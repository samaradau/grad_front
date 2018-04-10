import { Injectable } from '@angular/core';
import { TaskResult } from '../../models/exercise-executor/task-result';
import { TaskRunResult } from '../../models/exercise-executor/task-run-result';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CandidateAnswer } from '../../models/exercise-executor/candidate-answer';
import { CandidateExercise } from '../../models/exercise-executor/candidate-exercise';
import { AuthService } from '../authentication/auth.service';
import { environment } from '../../../environments/environment';
import { CandidateTips } from '../../models/exercise-executor/candidate-tips';


const headers = new HttpHeaders({ 'Content-Type': 'application/json' });


@Injectable()
export class ExerciseExecutorService {

  private taskResultUrl = environment.apiUrl + 'api/v1/taskResults/';
  private taskResultByTaskIdUrl = environment.apiUrl + 'api/v1/taskResults/task/';
  private exerciseForEditUrl = environment.apiUrl + 'api/v1/exercises/candidate/task';
  private tipsEditUrl = environment.apiUrl + 'api/v1/taskResults/addTip';
  private createTaskResultUrl = environment.apiUrl + 'api/v1/taskResults/create?taskId=';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAll(): Observable<TaskResult[]> {
    return this.http.get<TaskResult[]>(this.taskResultUrl, { headers: this.authService.getAuthHeader() });
  }

  getExercise(id: number): Observable<CandidateExercise> {
    const url = `${this.exerciseForEditUrl}/${id}`;
    return this.http.get<CandidateExercise>(url, { headers: this.authService.getAuthHeader() });
  }

  getResultById(id): Observable<TaskResult> {
    return this.http.get<TaskResult>(this.taskResultUrl + id, { headers: this.authService.getAuthHeader() });
  }

  getResultByTaskId(id): Observable<TaskResult> {
    return this.http.get<TaskResult>(this.taskResultByTaskIdUrl + id, { headers: this.authService.getAuthHeader() });
  }

  getResultByResultIdAndCandidateId(id, idCandidate): Observable<TaskResult> {
    return this.http.get<TaskResult>(this.taskResultUrl + id + '/' + idCandidate, { headers: this.authService.getAuthHeader() });
  }

  validate(answer: CandidateAnswer): Observable<TaskRunResult> {
    return this.http.post<TaskRunResult>(this.taskResultUrl, answer, { headers: this.authService.addAuthHeader(headers) });
  }

  createTaskResult(taskId: number) {
    const url = `${this.createTaskResultUrl}${taskId}`;
    return this.http.post(url, null, { headers: this.authService.addAuthHeader(headers) });
  }

  delete(id): Observable<TaskResult> {
    return this.http.delete<TaskResult>(this.taskResultUrl + id, { headers: this.authService.addAuthHeader(headers) });
  }

  getTask(id): Observable<CandidateExercise> {
    return this.http.get<CandidateExercise>(this.taskResultUrl + id, { headers: this.authService.getAuthHeader() });
  }

  addTips (tips: CandidateTips): Observable<CandidateTips> {
    return this.http.post<CandidateTips>(this.tipsEditUrl, tips, { headers: this.authService.addAuthHeader(headers) });
  }
}
