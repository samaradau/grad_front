import { Component, OnInit, Input } from '@angular/core';
import { ExerciseExecutorService } from '../../../services/exercise-executor/exercise-executor.service';
import { TaskResult } from '../../../models/exercise-executor/task-result';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/authentication/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})

export class ViewResultComponent implements OnInit {
  private resultId: number;
  taskResult: TaskResult;
  idCandidate: string;

  constructor(private service: ExerciseExecutorService, private route: ActivatedRoute,
    private authService: AuthService, private router: Router, private location: Location) { }

  ngOnInit() {
    if (!this.authService.checkAccess(ViewResultComponent.name)) {
      this.router.navigate(['denied']);
    }

    this.resultId = +this.route.snapshot.paramMap.get('id');
    this.idCandidate = this.route.snapshot.paramMap.get('userId');
    this.getInfo();
  }

  getInfo(): void {
    if (!this.idCandidate) {
    this.service.getResultById(this.resultId)
      .subscribe(result => this.taskResult = result);
    } else {
      this.service.getResultByResultIdAndCandidateId(this.resultId, this.idCandidate)
      .subscribe(result => this.taskResult = result);
    }
}
}
