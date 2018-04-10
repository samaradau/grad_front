import { Injectable } from '@angular/core';
import { Profile } from '../../models/user-management/profile';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../authentication/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProfileService {

  private profileUrl = environment.apiUrl + 'api/v1/profiles/';
  constructor(private http: HttpClient, private authService: AuthService) { }

  getProfile(id): Observable<Profile> {
    return this.http.get<Profile>(this.profileUrl + id);
  }
}

