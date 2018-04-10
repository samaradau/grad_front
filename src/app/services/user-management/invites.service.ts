import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invite } from '../../models/user-management/invite';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { AuthService } from '../authentication/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class InvitesService {

  private invitesForResendingUrl = environment.apiUrl + 'api/v1/invites?emailPart=';
  private getInviteByTokenUrl = environment.apiUrl + 'api/v1/invites/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getInvitesForResending(email: string) {
    return this.http.get<Invite[]>(this.invitesForResendingUrl + email, { headers: this.authService.getAuthHeader() });
  }

  public search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .switchMap(term => this.getInvitesForResending(term));
  }

  public getInviteByToken(token: string): Observable<Invite> {
    return this.http.get<Invite>(this.getInviteByTokenUrl + token);
  }
}
