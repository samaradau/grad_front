import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../../models/user-management/userLogin';
import { AccountService } from '../../../services/user-management/account.service';
import { Token } from '../../../models/user-management/token';
import { StorageService } from '../../../services/storage/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authentication/auth.service';
import { IUser } from '../../../models/user/user';
import { ProfileService } from '../../../services/user-management/profile.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserLogin = new UserLogin();
  badLogIn = false;
  emailConfirmed = true;
  isActive = true;

  constructor(private accountService: AccountService,
    private router: Router, private authService: AuthService, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.authService.logout();
  }

  login(isValid: boolean) {
    if (isValid) {
      this.accountService.login(this.user.email, this.user.password).subscribe(
        (token: Token) => {
          const userEmail = this.user.email;
          const userToken = token.access_token;

          const currentUser: IUser = {
            id: null,
            userName: null,
            userSurname: null,
            userEmail: userEmail,
            token: userToken,
            roles: []
          };

          this.authService.login(userEmail, userToken);

          this.accountService.getUserIdByEmail(userEmail).subscribe(
            userId => {
              currentUser.id = userId.toString();
              let profileId;
              this.accountService.getAccount(currentUser.id).subscribe(
                data => {
                  currentUser.roles = data.roles;
                  profileId = data.profileId;

                  this.profileService.getProfile(profileId).subscribe(
                    profile => {
                      currentUser.userName = profile.firstName;
                      currentUser.userSurname = profile.lastName;

                      this.authService.loginUser(currentUser);

                      if (this.authService.redirectUrl) {
                        this.router.navigate([this.authService.redirectUrl]);
                      } else {
                        this.router.navigate(['/exerciseList']);
                      }
                    });

              });
          });
        },
        error => {
          if (error.error.error === 'invalid_grant') {
            this.badLogIn = true;
          } else if (error.error.error === 'unconfirmed_email') {
            this.emailConfirmed = false;
          } else if (error.error.error === 'user_not_active') {
            this.isActive = false;
          }
        });
    }
  }
}
