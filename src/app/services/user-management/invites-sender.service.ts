import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { AuthService } from '../authentication/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class InvitesSenderService {

  private sendToCoachUrl = environment.apiUrl + 'api/v1/invites/coach?email=';
  private sendToManagerUrl = environment.apiUrl + 'api/v1/invites/manager?email=';

  constructor(
    private http: HttpClient, private authService: AuthService) {
  }

  public sendToCoach(coachEmail: string) {
    return this.http.post(this.sendToCoachUrl + coachEmail, null, { headers: this.authService.getAuthHeader() }).pipe(
      catchError(this.handleError)
    );
  }

  public sendToManager(managerEmail: string) {
    return this.http.post(this.sendToManagerUrl + managerEmail, null, { headers: this.authService.getAuthHeader() }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Invite sending error', error);
    return new ErrorObservable(error);
  }
}
