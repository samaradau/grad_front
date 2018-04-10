import { Injectable } from '@angular/core';
import { Account } from '../../models/user-management/account';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Token } from '../../models/user-management/token';
import { UserId } from '../../models/user-management/userid';
import { UserRegister } from '../../models/user-management/userRegister';
import { AuthService } from '../authentication/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AccountService {

  private accountsUrl = environment.apiUrl + 'api/v1/accounts/';
  private tokenUrl = environment.apiUrl + 'token';
  private passwordForgotUrl = environment.apiUrl + 'api/v1/accounts/password/forgot';
  private resetPasswordUrl = environment.apiUrl + 'api/v1/accounts/password/reset';
  private confirmEmailUrl = environment.apiUrl + 'api/v1/accounts/confirm/email';
  private confirmEmailByAdminUrl = environment.apiUrl + 'api/v1/accounts/confirm/email/by-admin/';
  private userIdByEmailUrl = environment.apiUrl + 'api/v1/accounts/id?email=';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAccounts(page, amount, roleName, emailPart, order = null, reverse = null): Observable<Account[]> {
    const role = (roleName != null && roleName !== 'all') ? '&roleName=' + roleName : '';
    const email = (emailPart != null && emailPart !== '') ? '&emailPart=' + emailPart : '';
    const sortCriteria = (order != null && order !== '') ? '&sortCriteria=' + order : '';
    const isDescending = (reverse != null && reverse !== '') ? '&isDescending=' + reverse : '';
    return this.http.get<Account[]>(this.accountsUrl + '?page=' + page + '&amount=' + amount
      + email + role + sortCriteria + isDescending, { headers: this.authService.getAuthHeader() });
  }

  changeIsActive(id) {
    return this.http.patch(this.accountsUrl + id + '/changeIsActive', null,  { headers: this.authService.getAuthHeader() });
  }

  getAccountsCount(roleName, emailPart): Observable<number> {
    const role = (roleName != null && roleName !== 'all') ? '?roleName=' + roleName : '';
    let email = '';
    if (emailPart != null && emailPart !== '') {
      if (role === '') {
        email = '?emailPart=' + emailPart;
      } else {
        email = '&emailPart=' + emailPart;
      }
    }
    return this.http.get<number>(this.accountsUrl + 'count' + role + email,
      { headers: this.authService.getAuthHeader() });
  }

  getAccount(id): Observable<Account> {
    return this.http.get<Account>(this.accountsUrl + id, { headers: this.authService.getAuthHeader() });
  }

  login(email: string, password: string): Observable<Token> {
    const body = 'username=' + email + '&password=' + password + '&grant_type=password';
    return this.http.post<Token>(this.tokenUrl, body);
  }

  register(user: UserRegister): Observable<UserId> {
    const body = { firstName: user.firstName, lastName: user.lastName, email: user.email,
      password: user.password, confirmPassword: user.confirmPassword, inviteCode: user.inviteCode };
    return this.http.post<UserId>(this.accountsUrl, body);
  }

  forgotPassword(email: string) {
    const body = { email: email };
    return this.http.post(this.passwordForgotUrl, body);
  }

  resetPassword(userId: string, code: string, password: string, confirmPassword: string) {
    const body = {userId: userId, code: code, password: password, confirmPassword: confirmPassword };
    return this.http.post(this.resetPasswordUrl, body);
  }

  confirmEmail(userId: string, code: string) {
      const body = { userId: userId, code: code };
      return this.http.post(this.confirmEmailUrl, body);
  }

  confirmEmailByAdmin(userId: string) {
      return this.http.patch(this.confirmEmailByAdminUrl + userId, null, { headers: this.authService.getAuthHeader() });
  }

  getUserIdByEmail(email: string) {
    return this.http.get(this.userIdByEmailUrl + email);
  }
}
