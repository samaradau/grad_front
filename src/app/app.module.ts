import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { EqualValidator } from '../app/components/security/register/register-validator.directive';
import { PasswordEqualValidator } from '../app/components/security/restore-password/restore-password-recovery/password-recovery-validator.directive';
import { HttpClient, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { TaskValidationComponent } from './components/exercise-executor/task-validation/task-validation.component';
import { ExerciseListComponent } from './components/candidate/exercise-list/exercise-list.component';
import { RegisterComponent } from './components/security/register/register.component';
import { InvitesSenderComponent } from './components/user-management/invites-sender/invites-sender.component';
import { AppRoutingModule } from './/app-routing.module';
import { MainComponent } from './main/main.component';
import { UserInfoComponent } from './components/user-management/user-info/user-info.component';
import { UserListComponent } from './components/user-management/user-list/user-list.component';
import { LoginComponent} from './components/security/login/login.component';
import { PasswordRecoveryComponent } from './components/security/restore-password/restore-password-recovery/password-recovery.component';
import { RegisterNotificationComponent } from './components/security/register-notification/register-notification.component';
import { RestorePasswordEnterEmailComponent } from './components/security/restore-password/restore-password-enter-email/restore-password-enter-email.component';
import { RestorePasswordNotificationComponent } from './components/security/restore-password/restore-password-notification/restore-password-notification.component';
import { RestorePasswordSendSuccessComponent } from './components/security/restore-password/restore-password-send-success/restore-password-send-success.component';
import { ConfirmEmailComponent } from './components/security/confirm-email/confirm-email.component';
import { AssemblyInfoComponent } from './components/exercise-executor/assembly-info/assembly-info.component';
import { ViewResultComponent } from './components/exercise-executor/view-result/view-result.component';
import { ExerciseManagementComponent } from './components/exercise-management/exercise-management.component';
import { CreateExerciseComponent } from './components/exercise-management/create-exercise/create-exercise.component';
import { DeniedComponent } from './components/notifications/denied/denied.component';
import { InvitesNotificationComponent } from './components/user-management/invites-notification/invites-notification.component';

import { InvitesSenderService } from './services/user-management/invites-sender.service';
import { ExerciseListService } from './services/candidate/exercise-list.service';
import { ExerciseManagementService } from './services/exercise-management/exercise-management.service';
import { ExerciseExecutorService } from './services/exercise-executor/exercise-executor.service';
import { AccountService } from './services/user-management/account.service';
import { CandidateListService } from './services/candidate/candidate-list.service';
import { ProfileService } from './services/user-management/profile.service';
import { AssemblyInfoService } from './services/exercise-executor/assembly-info.service';
import { StorageService } from './services/storage/storage.service';
import { AuthService } from './services/authentication/auth.service';
import { PagerService } from './services/pager.service';
import { InvitesService } from './services/user-management/invites.service';
import { AssemblyInfoViewComponent } from './components/exercise-executor/assembly-info-view/assembly-info-view.component';
import { AccountInfoComponent } from './components/user-management/account-info/account-info.component';
import { CandidateListComponent } from './components/user-management/candidate-list/candidate-list.component';
import { TimerComponent } from './components/timer/timer.component';
import { CandidateResultComponent } from './components/candidate/candidate-result/candidate-result.component';
import { ExerciseResultService } from './services/candidate/exercise-result.service';
import { HighlightModule } from 'ngx-highlightjs';

@NgModule({
  declarations: [
    AppComponent,
    ExerciseListComponent,
    RegisterComponent,
    EqualValidator,
    PasswordEqualValidator,
    InvitesSenderComponent,
    MainComponent,
    UserInfoComponent,
    UserListComponent,
    LoginComponent,
    ExerciseManagementComponent,
    CreateExerciseComponent,
    PasswordRecoveryComponent,
    RegisterNotificationComponent,
    RestorePasswordEnterEmailComponent,
    RestorePasswordNotificationComponent,
    RestorePasswordSendSuccessComponent,
    ConfirmEmailComponent,
    AssemblyInfoComponent,
    ViewResultComponent,
    TaskValidationComponent,
    DeniedComponent,
    InvitesNotificationComponent,
    AssemblyInfoViewComponent,
    AccountInfoComponent,
    CandidateListComponent,
    TimerComponent,
    CandidateResultComponent,
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      FormsModule,
      HighlightModule.forRoot({ theme: 'vs'})
  ],
  providers: [
    ExerciseListService,
    HttpClient,
    AccountService,
    CandidateListService,
    ProfileService,
    ExerciseExecutorService,
    AssemblyInfoService,
    StorageService,
    ExerciseManagementService,
    AuthService,
    InvitesService,
    PagerService,
    ExerciseResultService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
