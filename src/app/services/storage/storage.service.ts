import { Injectable } from '@angular/core';
import { IUser } from '../../models/user/user';
import { environment } from '../../../environments/environment';

@Injectable()
export class StorageService {

  constructor() { }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  saveUserEmail(email: string) {
    localStorage.setItem('email', email);
  }

  getUserEmail(): string {
    return localStorage.getItem('email');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  saveUser(user: IUser) {
    localStorage.setItem('id', user.id);
    localStorage.setItem('userName', user.userName);
    localStorage.setItem('userSurname', user.userSurname);
    localStorage.setItem('token', user.token);
    localStorage.setItem('userEmail', user.userEmail);

    if (user.roles) {
        localStorage.setItem('roles', user.roles.join(','));
    }
  }

  getUser(): IUser {
    const user: IUser = {
      id: localStorage.getItem('id'),
      userName: localStorage.getItem('userName'),
      userSurname: localStorage.getItem('userSurname'),
      userEmail: localStorage.getItem('userEmail'),
      token: localStorage.getItem('token'),
      roles: []
    };

    if (localStorage.getItem('roles')) {
      user.roles = localStorage.getItem('roles').split(',');
    }

    return user;
  }

  clearUserInfo(): void {
    localStorage.clear();
  }
}
