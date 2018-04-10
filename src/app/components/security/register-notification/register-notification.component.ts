import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-notification',
  templateUrl: './register-notification.component.html',
  styleUrls: ['./register-notification.component.css']
})
export class RegisterNotificationComponent implements OnInit {

  showEmailSend = true;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.params['showEmailSend']) {
      this.showEmailSend = false;
    }
  }
}
