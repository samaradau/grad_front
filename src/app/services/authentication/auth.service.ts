import { Injectable, Component } from '@angular/core';
import { IUser } from '../../models/user/user';
import { InvitesSenderComponent } from '../../components/user-management/invites-sender/invites-sender.component';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class AuthService {
  currentUser: IUser;
  redirectUrl: string;
  rolesComponents: object = {};

  candidate = 'candidate';
  admin = 'admin';
  coach = 'coach';
  manager = 'manager';

  constructor(private storageService: StorageService) {
    this.addRole(this.candidate);
    this.addRole(this.admin);
    this.addRole(this.coach);
    this.addRole(this.manager);
  }

  getAuthHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + this.currentUser.token);
  }

  addAuthHeader(headers: HttpHeaders): HttpHeaders {
    return headers.append('Authorization', 'Bearer ' + this.currentUser.token);
  }


  checkAccess(componentName: string) {
    if (!this.currentUser) {
      return false;
    }

    let hassAccess = false;

    this.currentUser.roles.forEach(role => {
      if (this.rolesComponents[role].includes(componentName)) {
        hassAccess = true;
      }
    });

    return hassAccess;
  }

  addRoleComponent(role: string, componentName: string) {
    this.rolesComponents[role].push(componentName);
  }

  addRole(role: string) {
    this.rolesComponents[role] = [];
  }


  isLoggedIn(): boolean {
    if (this.currentUser && this.currentUser.roles) {
      return true;
    }

    return false;
  }

  loginUser(user: IUser) {
    this.currentUser = user;

    if (user.roles.includes('candidate')) {
      this.redirectUrl = '/exerciseList';
    } else if (user.roles.includes('admin')) {
      this.redirectUrl = '/accounts';
    } else if (user.roles.includes('manager')) {
      this.redirectUrl = '/candidates';
    } else if (user.roles.includes('coach')) {
      this.redirectUrl = '/exerciseManagement';
    }

    this.storageService.saveUser(this.currentUser);
  }

  login(userEmail: string, token: string): void {
    if (!userEmail || !token) {
        return;
    }

    this.currentUser = {
      id: null,
      userName: null,
      userSurname: null,
      userEmail: userEmail,
      token: token,
      roles: null
    };
  }

  logout(): void {
    this.storageService.clearUserInfo();
    this.currentUser = null;
  }
}
