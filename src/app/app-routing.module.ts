import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { InvitesSenderComponent } from './components/user-management/invites-sender/invites-sender.component';
import { ExerciseListComponent } from './components/candidate/exercise-list/exercise-list.component';
import { UserListComponent } from './components/user-management/user-list/user-list.component';
import { UserInfoComponent } from './components/user-management/user-info/user-info.component';
import { ViewResultComponent } from './components/exercise-executor/view-result/view-result.component';
import { TaskValidationComponent } from './components/exercise-executor/task-validation/task-validation.component';
import { ExerciseManagementComponent } from './components/exercise-management/exercise-management.component';
import { CreateExerciseComponent } from './components/exercise-management/create-exercise/create-exercise.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './components/security/register/register.component';
import { PasswordRecoveryComponent } from './components/security/restore-password/restore-password-recovery/password-recovery.component';
import { RegisterNotificationComponent } from './components/security/register-notification/register-notification.component';
import { RestorePasswordEnterEmailComponent } from './components/security/restore-password/restore-password-enter-email/restore-password-enter-email.component';
import { RestorePasswordNotificationComponent } from './components/security/restore-password/restore-password-notification/restore-password-notification.component';
import { RestorePasswordSendSuccessComponent } from './components/security/restore-password/restore-password-send-success/restore-password-send-success.component';
import { ConfirmEmailComponent } from './components/security/confirm-email/confirm-email.component';
import { AssemblyInfoComponent } from './components/exercise-executor/assembly-info/assembly-info.component';
import { AssemblyInfoViewComponent } from './components/exercise-executor/assembly-info-view/assembly-info-view.component';
import { DeniedComponent } from './components/notifications/denied/denied.component';
import { InvitesNotificationComponent } from './components/user-management/invites-notification/invites-notification.component';
import { AccountInfoComponent } from './components/user-management/account-info/account-info.component';
import { CandidateListComponent } from './components/user-management/candidate-list/candidate-list.component';
import { CandidateResultComponent } from './components/candidate/candidate-result/candidate-result.component';
import { LoginComponent } from './components/security/login/login.component';
import { LectureEditorComponent } from './components/lecture-management/lecture-editor/lecture-editor.component';
import { LectureListComponent } from './components/lecture-management/lecture-list/lecture-list.component';
import { LectureViewerComponent } from './components/lecture-management/lecture-viewer/lecture-viewer.component';


const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'invites/send', component: InvitesSenderComponent },
  { path: 'exerciseList', component: ExerciseListComponent },
  { path: 'exerciseList/:id', component: TaskValidationComponent },
  { path: 'invites/notifications/:result', component: InvitesNotificationComponent },
  { path: 'main', component: MainComponent },
  { path: 'accounts', component: UserListComponent },
  { path: 'denied', component: DeniedComponent },
  { path: 'accounts/:id', component: UserInfoComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'exerciseManagement', component: ExerciseManagementComponent },
  { path: 'exerciseManagement/create', component: CreateExerciseComponent },
  { path: 'exerciseManagement/edit/:id', component: CreateExerciseComponent },
  { path: 'restorePassword/email', component: RestorePasswordEnterEmailComponent },
  { path: 'restorePassword/newPassword', component: PasswordRecoveryComponent },
  { path: 'restore/password/send/success', component: RestorePasswordSendSuccessComponent },
  { path: 'successfulRegistration', component: RegisterNotificationComponent },
  { path: 'passwordHasBeenChanged', component: RestorePasswordNotificationComponent },
  { path: 'confirm/email', component: ConfirmEmailComponent },
  { path: 'taskResults/:id', component: ViewResultComponent },
  { path: 'taskResults/:id/:userId', component: ViewResultComponent },
  { path: 'assembly', component: AssemblyInfoComponent },
  { path: 'assembly/:id', component: AssemblyInfoViewComponent },
  { path: 'account/info', component: AccountInfoComponent },
  { path: 'candidates', component: CandidateListComponent },
  { path: 'exercises/results/:candidateId', component: CandidateResultComponent },
  { path: 'login', component: LoginComponent },
  { path: 'lectures/edit/:id', component: LectureEditorComponent },
  { path: 'lectures', component: LectureListComponent },
  { path: 'lectures/:id', component: LectureViewerComponent },
  { path: 'lectures/new', component: LectureViewerComponent }  
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
