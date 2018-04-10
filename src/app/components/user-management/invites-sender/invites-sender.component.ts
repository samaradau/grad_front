import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { InvitesSenderService } from '../../../services/user-management/invites-sender.service';
import { Invite } from '../../../models/user-management/invite';
import { InvitesService } from '../../../services/user-management/invites.service';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authentication/auth.service';

@Component({
  selector: 'app-invites-sender',
  templateUrl: './invites-sender.component.html',
  styleUrls: ['./invites-sender.component.css'],
  providers: [InvitesSenderService, InvitesService]
})
export class InvitesSenderComponent implements OnInit {

  results: Invite[];
  searchTerm$ = new Subject<string>();
  inviteToSend: Invite = new Invite('coach');
  sendButton: HTMLButtonElement;

  constructor(private invitesService: InvitesService, private senderService: InvitesSenderService,
    private router: Router, private authService: AuthService) {
    this.invitesService.search(this.searchTerm$)
      .subscribe(results => {
        this.results = results;
      });
  }

  ngOnInit() {
    if (!this.authService.checkAccess(InvitesSenderComponent.name)) {
      this.router.navigate(['denied']);
    }
    this.sendButton = $('#sendButton')[0];
  }

  public sendInvite() {
    let response;
    if (this.inviteToSend.roleName === 'coach') {
      response = this.senderService.sendToCoach(this.inviteToSend.email);
    } else if (this.inviteToSend.roleName === 'manager') {
      response = this.senderService.sendToManager(this.inviteToSend.email);
    } else {
      console.log(`Unknown role name: ${this.inviteToSend.roleName}`);
      return;
    }

    this.results = null;
    this.disableSending();
    response.subscribe(
      null,
      (error) => {
        if (error.status === 409) {
          this.alertConflict();
          this.enableSending();
        } else {
          this.alertFailure();
          this.enableSending();
        }
      },
      () => {
        this.alertSuccess();
        this.enableSending();
      });
  }

  public startSearch(term: string) {
    this.results = null;
    this.searchTerm$.next(term);
  }

  private enableSending() {
    this.sendButton.disabled = false;
    this.sendButton.innerHTML = 'Send invite';
  }

  private disableSending() {
    this.sendButton.disabled = true;
    this.sendButton.innerHTML = 'Sending...';
  }

  private alertFailure() {
    $('.sendingAlert').stop(true, true).hide();
    $('#fail').show().delay(2000).fadeOut(1500);
  }

  private alertSuccess() {
    $('.sendingAlert').stop(true, true).hide();
    $('#success').show().delay(2000).fadeOut(1500);
  }

  private alertConflict() {
    $('.sendingAlert').stop(true, true).hide();
    $('#conflict').show().delay(2000).fadeOut(1500);
  }

  private setInviteForResend(invite: Invite) {
    this.inviteToSend = invite;
    this.results = null;
  }
}
