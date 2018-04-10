import { Component, OnInit } from '@angular/core';
import { ExerciseInfoList } from '../../models/exercise-management/exercise-info-list';
import { ExerciseManagementService } from '../../services/exercise-management/exercise-management.service';
import { ExerciseInfo } from '../../models/exercise-management/exercise-info';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercise-management',
  templateUrl: './exercise-management.component.html',
  styleUrls: ['./exercise-management.component.css']
})
export class ExerciseManagementComponent implements OnInit {

  exercises: ExerciseInfoList[];
  selectedExercise: ExerciseInfoList;

  constructor(private exerciseManagementService: ExerciseManagementService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (!this.authService.checkAccess(ExerciseManagementComponent.name)) {
      this.router.navigate(['denied']);
    }
    this.getExerciseNameAndId();
  }

  getExerciseNameAndId(): void {
    this.exerciseManagementService.getExerciseNameAndId().subscribe(exercises => this.exercises = exercises);
  }

  deleteExercise(exercise: ExerciseInfoList): void {
    if (confirm('Are you sure?')) {
      this.exercises = this.exercises.filter(e => e !== exercise);
      this.exerciseManagementService.deleteExercise(exercise).subscribe();
    }
  }

  select(exercise: ExerciseInfoList) { this.selectedExercise = exercise; }
}
