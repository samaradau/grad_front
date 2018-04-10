import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/authentication/auth.service';
import { ExerciseResultService } from '../../../services/candidate/exercise-result.service';
import { ExerciseResult } from '../../../models/exercise-executor/exercise-result';
import { Profile } from '../../../models/user-management/profile';
import { ProfileService } from '../../../services/user-management/profile.service';

@Component({
  selector: 'app-candidate-result',
  templateUrl: './candidate-result.component.html',
  styleUrls: ['./candidate-result.component.css']
})
export class CandidateResultComponent implements OnInit {

  @Input() candidateId: string;
  exerciseResults: ExerciseResult[];
  averageScore = 0;
  profile: Profile;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private exerciseResultService: ExerciseResultService,
    private profileService: ProfileService) { }

  ngOnInit() {
    if (!this.authService.checkAccess(CandidateResultComponent.name)) {
      this.router.navigate(['denied']);
    }
    this.candidateId = this.route.snapshot.paramMap.get('candidateId');
    this.getProfile();
    this.getResults();
  }

  getResults(): void {
    this.exerciseResultService.getCandidateExercises(this.candidateId)
      .subscribe(results => {
        this.exerciseResults = results;
        this.getAverageScore();
      });
  }

  getAverageScore(): void {
    let count = 0;
    this.exerciseResults.forEach(element => {
      this.averageScore += element.score;
      count++;
    });
    this.averageScore = +(this.averageScore / count).toFixed(1);
  }

  private getProfile(): void {
    this.profileService.getProfile(this.candidateId)
      .subscribe(profile => this.profile = profile);
  }
}
