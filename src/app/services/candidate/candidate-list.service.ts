import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../../models/candidate/candidate';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../authentication/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class CandidateListService {

  private candidateUrl = environment.apiUrl + 'api/v1/candidates/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getCandidates(page, amount, lastNamePart, order = null, reverse = null): Observable<Candidate[]> {
    const lastName = (lastNamePart != null && lastNamePart !== '') ? '&lastNamePart=' + lastNamePart : '';
    const sortCriteria = (order != null && order !== '') ? '&sortCriteria=' + order : '';
    const isDescending = (reverse != null && reverse !== '') ? '&isDescending=' + reverse : '';
    return this.http.get<Candidate[]>(this.candidateUrl + '?page=' + page + '&amount='
    + amount + lastName + sortCriteria + isDescending, { headers: this.authService.getAuthHeader() });
  }

  getCandidatesCount(lastNamePart): Observable<number> {
    const lastName = (lastNamePart != null && lastNamePart !== '') ? '?lastNamePart=' + lastNamePart : '';
    return this.http.get<number>(this.candidateUrl + 'count' + lastName, { headers: this.authService.getAuthHeader() });
  }

}
