import { Component, OnInit } from '@angular/core';
import { UserRegister } from '../../../models/user-management/userRegister';
import { UserId } from '../../../models/user-management/userid';
import { AccountService } from '../../../services/user-management/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InvitesService } from '../../../services/user-management/invites.service';
import { AuthService } from '../../../services/authentication/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: UserRegister = new UserRegister();
  emailExists = false;
  emailDisabled = false;
  showRegistrationForm = false;
  invalidData = false;

  constructor(private accountService: AccountService,
              private router: Router,
              private route: ActivatedRoute,
              private inviteService: InvitesService,
              private authService: AuthService) {}

  ngOnInit() {
    this.authService.logout();

    const inviteCode = this.route.snapshot.queryParams['code'];

    if (inviteCode) {
      this.emailDisabled = true;

      this.inviteService.getInviteByToken(inviteCode).subscribe(
        data => {
          this.accountService.getUserIdByEmail(data.email).subscribe(
            userId => {
              this.router.navigate(['invites', 'notifications', 'notFound']);
            },
            error => {
              this.user.email = data.email;
              this.user.inviteCode = inviteCode;
              this.showRegistrationForm = true;
            });
        },
        error => {
          this.router.navigate(['invites', 'notifications', 'notFound']);
        });
    } else {
      this.showRegistrationForm = true;
    }
  }

  addUser(isValid: boolean) {
    if (isValid) {
      this.accountService.register(this.user).subscribe(
        (userId: UserId) => {
          if (this.user.inviteCode) {
            this.router.navigate(['successfulRegistration', { showEmailSend: 'false' }]);
          } else {
            this.router.navigate(['successfulRegistration']);
          }
        },
        error => {
          if (error.error.message === 'User with such email already exists') {
            this.emailExists = true;
          } else {
            this.invalidData = true;
          }
        }
      );
    }
  }

  emailChange(event) {
    this.emailExists = false;
    const EMAIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/i;
    if (EMAIL_REGEXP.test(this.user.email)) {
      this.accountService.getUserIdByEmail(this.user.email).subscribe(
        data => this.emailExists = true,
      );
    }
  }
}
