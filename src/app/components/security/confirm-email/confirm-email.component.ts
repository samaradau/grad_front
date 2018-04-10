import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../services/user-management/account.service';
import { AuthService } from '../../../services/authentication/auth.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  confirmSuccess = false;
  show = false;

  constructor(private accountService: AccountService,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logout();

    const userId = this.route.snapshot.queryParams['userId'];
    const code = this.route.snapshot.queryParams['code'];

    this.accountService.confirmEmail(userId, code).subscribe(
      data => {
        this.confirmSuccess = true;
        this.show = true;
      },
      error => {
        this.confirmSuccess = false;
        this.show = true;
      });
  }
}
