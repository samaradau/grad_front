import { Component, OnInit } from '@angular/core';
import { ExerciseForList } from '../../../models/candidate/exercise-for-list';
import { ExerciseListService } from '../../../services/candidate/exercise-list.service';
import { AuthService } from '../../../services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})

export class ExerciseListComponent implements OnInit {
  exercises: ExerciseForList[];

  constructor(private exerciseListService: ExerciseListService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (!this.authService.checkAccess(ExerciseListComponent.name)) {
      this.router.navigate(['denied']);
    }
    this.getCandidateExercises();
  }

  getCandidateExercises(): void {
    this.exerciseListService.getCandidateExercises()
    .subscribe(exercises => this.exercises = exercises);
  }
}
