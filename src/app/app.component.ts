import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage/storage.service';
import { AuthService } from './services/authentication/auth.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { ExerciseListComponent } from './components/candidate/exercise-list/exercise-list.component';
import { TaskValidationComponent } from './components/exercise-executor/task-validation/task-validation.component';
import { UserListComponent } from './components/user-management/user-list/user-list.component';
import { AssemblyInfoComponent } from './components/exercise-executor/assembly-info/assembly-info.component';
import { InvitesSenderComponent } from './components/user-management/invites-sender/invites-sender.component';
import { ExerciseManagementComponent } from './components/exercise-management/exercise-management.component';
import { CreateExerciseComponent } from './components/exercise-management/create-exercise/create-exercise.component';
import { environment } from '../environments/environment';
import { UserInfoComponent } from './components/user-management/user-info/user-info.component';
import { ViewResultComponent } from './components/exercise-executor/view-result/view-result.component';
import { CandidateListComponent } from './components/user-management/candidate-list/candidate-list.component';
import { CandidateResultComponent } from './components/candidate/candidate-result/candidate-result.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  static backendUrl = environment.apiUrl;

  title = 'app';
  loading = true;

  constructor(private storageService: StorageService, public authService: AuthService, private router: Router) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/main');
  }

  ngOnInit(): void {
    if (this.storageService.getToken()) {
      this.authService.loginUser(this.storageService.getUser());
    }

    this.authService.addRoleComponent(this.authService.candidate, ExerciseListComponent.name);
    this.authService.addRoleComponent(this.authService.candidate, TaskValidationComponent.name);
    this.authService.addRoleComponent(this.authService.candidate, ViewResultComponent.name);

    this.authService.addRoleComponent(this.authService.admin, UserListComponent.name);
    this.authService.addRoleComponent(this.authService.admin, InvitesSenderComponent.name);
    this.authService.addRoleComponent(this.authService.admin, UserInfoComponent.name);

    this.authService.addRoleComponent(this.authService.manager, CandidateListComponent.name);

    this.authService.addRoleComponent(this.authService.coach, ExerciseManagementComponent.name);
    this.authService.addRoleComponent(this.authService.coach, CreateExerciseComponent.name);
    this.authService.addRoleComponent(this.authService.coach, AssemblyInfoComponent.name);

    this.authService.addRoleComponent(this.authService.manager, CandidateResultComponent.name);
    this.authService.addRoleComponent(this.authService.manager, ViewResultComponent.name);
  }
}
