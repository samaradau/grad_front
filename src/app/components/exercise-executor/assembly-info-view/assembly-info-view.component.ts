import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Assembly } from '../../../models/exercise-management/assembly';
import { TestAssemblyInfo } from '../../../models/exercise-executor/test-assembly-info';
import { AssemblyInfoService } from '../../../services/exercise-executor/assembly-info.service';
import { ExerciseManagementService } from '../../../services/exercise-management/exercise-management.service';
import { AuthService } from '../../../services/authentication/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assembly-info-view',
  templateUrl: './assembly-info-view.component.html',
  styleUrls: ['./assembly-info-view.component.css']
})
export class AssemblyInfoViewComponent implements OnInit {

  private assemblyId: string;
  public assembly: Assembly = {assemblyName : null, testClassesElements: null};

  constructor(private service: AssemblyInfoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.assemblyId = this.route.snapshot.paramMap.get('id');
    this.getInfo();
  }
  getInfo(): void {
    this.service.getAssemblyById(this.assemblyId)
      .subscribe(info => this.assembly = info);
  }
}
