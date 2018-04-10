import { Component, OnInit } from '@angular/core';
import {UserPasswordRecovery} from '../../../../models/user/userPasswordRecovery';
import {Router, ActivatedRoute} from '@angular/router';
import { AccountService } from '../../../../services/user-management/account.service';
import { AuthService } from '../../../../services/authentication/auth.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

  public user: UserPasswordRecovery = new UserPasswordRecovery();
  public linkExpired = false;

  constructor(private router: Router,
              private accountService: AccountService,
              private route: ActivatedRoute,
              private authService: AuthService) {}

  ngOnInit() {
    this.authService.logout();
  }

  changePassword(isValid: boolean) {
    if (isValid) {
      const userId: string = this.route.snapshot.queryParams['userId'];
      const code: string = this.route.snapshot.queryParams['code'];

      this.accountService.resetPassword(userId, code, this.user.password, this.user.confirmPassword).subscribe(
        data => {
          this.router.navigate(['passwordHasBeenChanged']);
        },
        error => {
          this.linkExpired = true;
        });
    }
  }
}
