import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/authentication/auth.service';

@Component({
  selector: 'app-invites-notification',
  templateUrl: './invites-notification.component.html',
  styleUrls: ['./invites-notification.component.css']
})
export class InvitesNotificationComponent implements OnInit {

  @Input() result: string;

  private verifyingResult: string;

  title: string;

  message: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.authService.logout();

    this.verifyingResult = this.route.snapshot.paramMap.get('result');
    this.setMessage();
  }

  setMessage(): void {
    if (this.verifyingResult) {
      if (this.verifyingResult === 'notFound') {
        this.title = 'Error';
        this.message = 'Your invite is not found.';
      } else if (this.verifyingResult === 'isExpired') {
        this.title = 'Error';
        this.message = 'Your invite is expired.';
      } else if (this.verifyingResult === 'alreadyInRole') {
        this.title = 'Error';
        this.message = 'You are already in this role.';
      } else if (this.verifyingResult === 'addedToRole') {
        this.title = 'Success';
        this.message = 'You have been successfully added to a role.';
      } else if (this.verifyingResult === 'error') {
        this.title = 'Error';
        this.message = 'Something went wrong.';
      } else {
        this.router.navigateByUrl('/main');
      }
    }
  }

}
