import { Component, OnInit } from '@angular/core';
import { Profile } from '../../../models/user-management/profile';
import { ProfileService } from '../../../services/user-management/profile.service';
import { AccountService } from '../../../services/user-management/account.service';
import { Account } from '../../../models/user-management/account';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../../services/authentication/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  public userProfile: Profile;
  public userAccount: Account;
  private accountId: string;

  constructor(private profileService: ProfileService, private accountService: AccountService, private route: ActivatedRoute,
  private authService: AuthService, private router: Router) {
    this.accountId = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    if (!this.authService.checkAccess(UserInfoComponent.name)) {
      this.router.navigate(['denied']);
    }

    this.userProfile = new Profile();
    this.userAccount = new Account();
    this.getInfo();
  }

  getInfo(): void {
    let err: boolean;
    this.accountService.getAccount(this.accountId)
    .subscribe(
      account => this.userAccount = account,
      error => err = true,
      () => this.profileService.getProfile(this.userAccount.profileId)
            .subscribe((profile: Profile) => this.userProfile = profile)
    );
  }
}
