import { Component, OnInit } from '@angular/core';
import {UserEmail} from '../../../../models/user/userEmail';
import { AccountService } from '../../../../services/user-management/account.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/authentication/auth.service';


@Component({
  selector: 'app-restore-password-enter-email',
  templateUrl: './restore-password-enter-email.component.html',
  styleUrls: ['./restore-password-enter-email.component.css']
})
export class RestorePasswordEnterEmailComponent implements OnInit {

  userEmail: UserEmail = new UserEmail();
  emailNotFound = false;

  constructor(private accountService: AccountService,
              private router: Router,
              private authService: AuthService) {}

  ngOnInit() {
    this.authService.logout();
  }

  getEmail(isValid: boolean) {
    if (isValid) {
      this.accountService.forgotPassword(this.userEmail.email).subscribe(
        data => {
          this.router.navigate(['restore/password/send/success']);
        },
        error => {
          this.emailNotFound = true;
        });
    }
  }

  emailChange(event) {
    this.emailNotFound = false;
  }
}
