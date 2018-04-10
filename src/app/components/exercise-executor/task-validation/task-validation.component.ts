import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { TaskResult } from '../../../models/exercise-executor/task-result';
import { TaskRunResult } from '../../../models/exercise-executor/task-run-result';
import { ExerciseExecutorService } from '../../../services/exercise-executor/exercise-executor.service';
import { CandidateAnswer } from '../../../models/exercise-executor/candidate-answer';
import { AuthService } from '../../../services/authentication/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidateExercise } from '../../../models/exercise-executor/candidate-exercise';
import { CandidateTips } from '../../../models/exercise-executor/candidate-tips';

import { HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'app-task-validation',
  templateUrl: './task-validation.component.html',
  styleUrls: ['./task-validation.component.css']
})
export class TaskValidationComponent implements OnInit, AfterContentChecked {
  private runResult: TaskRunResult = {
    'success': false,
    'errorMessage': '',
    'score': -1
  };
  private currentIndex = 0;
  private currentLimit = 1;
  private clicks = 0;
  public exercise: CandidateExercise;
  public candidateTips = [];
  public taskTime = 1;
  public isAllTipsUsed = false;
  private showCode = false;
  constructor(private exerciseExecutorService: ExerciseExecutorService,
    private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (!this.authService.checkAccess(TaskValidationComponent.name)) {
      this.router.navigate(['denied']);
    }

    const id = +this.route.snapshot.paramMap.get('id');
    this.exerciseExecutorService.createTaskResult(id).subscribe(
      data => { console.log('success'); },
      error => console.log(error),
    );

    this.getExercise();
  }

  ngAfterContentChecked() {
    if (this.exercise !== undefined && this.exercise.usedTipsNumber !== 0) {
      for (let i = 0; i < this.exercise.usedTipsNumber; i++) {
        this.candidateTips[i] = this.exercise.tips[i];
      }
      this.currentIndex = this.exercise.usedTipsNumber;
      this.currentLimit = this.currentIndex + 1;
      this.clicks = this.exercise.usedTipsNumber;
      if (this.clicks === this.exercise.tips.length) {
        this.isAllTipsUsed = true;
      }
    }
    if (this.exercise !== undefined) {
      if (this.exercise.tips.length === 0) {
        this.isAllTipsUsed = true;
      }
    }
  }

  getExercise(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.exerciseExecutorService.getExercise(id).subscribe(exercise => {
      this.exerciseExecutorService.getResultByTaskId(id).subscribe(exerciseResult => {
      if (exercise.timeSeconds != null) {
        if (exerciseResult != null) {
          this.taskTime = exercise.timeSeconds - Math.floor(new Date().getTime() / 1000 - this.parseDate(exerciseResult.startDate));
        } else {
          this.taskTime = exercise.timeSeconds;
        }
      }

      this.exercise = exercise;
      });
    });
  }

  parseDate(date: string) {
    const d = Date.UTC(
      Number(date.substring(0, 4)),
      Number(date.substring(5, 7)) - 1,
      Number(date.substring(8, 10)),
      Number(date.substring(11, 13)),
      Number(date.substring(14, 16)),
      Number(date.substring(17, 19))
    );
    return d / 1000;
  }

  getTip(): void {
    const wrapper = document.getElementById('wrapper');
    const index = this.currentIndex + 1;
    for (this.currentIndex; this.currentIndex < this.currentLimit && this.currentIndex < this.exercise.tips.length; this.currentIndex++) {
      wrapper.innerHTML += '<span class="lead">' + index + '. ' + this.exercise.tips[this.currentIndex] + '</span><br>';
      this.clicks += 1;
    }
    this.currentLimit++;
  }

  updateTip(taskId: number): void {
    const usedTipsNumber = this.clicks;
    this.exerciseExecutorService.addTips({ taskId, usedTipsNumber } as CandidateTips).subscribe();
    this.exercise.usedTipsNumber++;
  }

  validate(template: string, taskId: number, usedTipsNumber: number): void {
    this.showCode = false;
    const element = <HTMLInputElement>document.getElementById('validateBtn');
    element.disabled = true;
    usedTipsNumber = this.clicks;
    this.exerciseExecutorService.validate({ taskId, template, usedTipsNumber } as CandidateAnswer)
      .subscribe(result => {
        this.runResult.errorMessage = result.errorMessage;
        this.runResult.success = result.success;
        if (!this.runResult.success) {
          element.disabled = false;
        } else {
          this.runResult.score = result.score;
        }
      }
      );
  }

  onTimerOutEvent() {
    this.taskTime = 0;
  }

  onShowCode() {
    this.showCode = true;
  }
}
