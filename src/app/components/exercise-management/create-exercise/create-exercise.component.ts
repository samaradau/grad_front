import { Component, OnInit, Input, ViewChild, AfterContentChecked } from '@angular/core';
import { ExerciseInfo } from '../../../models/exercise-management/exercise-info';
import { ExerciseManagementService } from '../../../services/exercise-management/exercise-management.service';
import { Assembly } from '../../../models/exercise-management/assembly';
import { Location } from '@angular/common';
import { AuthService } from '../../../services/authentication/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.css']
})

export class CreateExerciseComponent implements OnInit, AfterContentChecked {
  @Input() exercise: ExerciseInfo;

  exercises: ExerciseInfo[] = [];
  assemblies: Assembly[] = [];

  public enableTime = true;
  public isButtonDisabled = true;
  public isClassNameDisabled = true;
  public isMethodNameDisabled = true;
  public id = +this.route.snapshot.paramMap.get('id');

  public currentAssembly = {
    'assemblyName': '',
    'testClassesElements':
    [
      {
        'name': '',
        'methodsNames': []
      }
    ]
  };
  public currentClassElement = {
    'name': '',
    'methodsNames': []
  };
  public someExercise = {
    'codeTemplate': '',
    'assemblyName': '',
    'testClassName': '',
    'testMethodName': '',
    'tips': '',
    'id': 0,
    'name': '',
    'subject': '',
    'description': '',
    'maximumScore': 10,
    'timeSeconds': 0,
  };
  public currentPath;
  editedExercise: ExerciseInfo;

  constructor(
    private route: ActivatedRoute,
    private exerciseManagementService: ExerciseManagementService,
    private location: Location,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    if (!this.authService.checkAccess(CreateExerciseComponent.name)) {
      this.router.navigate(['denied']);
    }
    this.getExercise();
    this.getAssembliesElements();
    if (this.id === 0) {
      this.exercise.assemblyName = 'Choose...';
      this.exercise.testClassName = 'Choose...';
      this.exercise.testMethodName = 'Choose...';
    }
    this.currentPath = this.location.path();
  }

  ngAfterContentChecked() {
    if (this.exercise !== undefined && this.id !== 0) {
      this.isClassNameDisabled = false;
      this.isMethodNameDisabled = false;
      this.currentAssembly = this.getNecessaryAssembly(this.exercise.assemblyName);
      if (this.exercise.testClassName !== 'Choose...' && this.exercise.testMethodName !== 'Choose...') {
        this.currentClassElement = this.getNecessaryClass(this.exercise.testClassName);
      }
    }
  }

  getAssembliesElements(): void {
    this.exerciseManagementService.getAssembliesElements().subscribe(assemblies => this.assemblies = assemblies);
  }

  getExercise(): void {
    if (this.id === 0) {
      this.exercise = this.someExercise;
      return;
    }

    this.exerciseManagementService.getExercise(this.id).subscribe(exercise => {
      this.exercise = exercise;
      this.exercise.tips = exercise.tips.join('\n');
      if (exercise.timeSeconds == null) {
          this.enableTime = false;
      }
    });
  }

  addNewExercise(codeTemplate: string, assemblyName: string, testClassName: string,
    testMethodName: string, tip: string, id: number= 1, name: string, subject: string,
    description: string, maximumScore: number): void {

    if (!this.enableTime) {
      this.exercise.timeSeconds = null;
    }
    let tips = null;
    if (!(tip.length === 1 && tip[0] === '')) {
      tips = tip.split('\n');
      for (let i = 0; i < tips.length; i++) {
        tips[i] = tips[i].trim();
      }
    }
    this.exerciseManagementService.addExercise({ codeTemplate, assemblyName, testClassName, testMethodName,
      tips, id, name, subject, description, maximumScore, timeSeconds : this.exercise.timeSeconds } as ExerciseInfo)
      .subscribe(exercise => {
        this.exercises.push(exercise);
        this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(tip: string): void {
    this.exercise.tips = null;
    if (tip !== '') {
      try {
        this.exercise.tips = tip.split('\n');
        for (let i = 0; i < this.exercise.tips.length; i++) {
          this.exercise.tips[i] = this.exercise.tips[i].trim();
        }
      } catch {
      }
    }

    if (!this.enableTime) {
      this.exercise.timeSeconds = null;
    }

    this.exerciseManagementService.updateExercise(this.exercise)
      .subscribe(() => this.goBack());
  }

  onSelectAssemblyName = (e) => {
    this.exercise.testClassName = 'Choose...';
    this.exercise.testMethodName = 'Choose...';
    this.isClassNameDisabled = false;
    this.currentAssembly = this.getNecessaryAssembly(e.target.value);
    this.currentClassElement = {
      'name': '',
      'methodsNames': []
    };
  }

  onSelectClassName = (e) => {
    this.isMethodNameDisabled = false;
    this.currentClassElement = this.getNecessaryClass(e.target.value);
    this.exercise.testMethodName = 'Choose...';
    this.isButtonDisabled = false;
  }

  getNecessaryAssembly = (value) => {
    let result = this.assemblies.filter((assembly) => assembly.assemblyName === value).pop();
    if (result === undefined) {
      result = {
        'assemblyName': '',
        'testClassesElements':
        [
          {
            'name': '',
            'methodsNames': []
          }
        ]
      };
    }

    return result;
  }

  getNecessaryClass = (value) => {
    let result = this.currentAssembly.testClassesElements.filter((classElement) => classElement.name === value).pop();
    if (result === undefined) {
      result = {
        'name': '',
        'methodsNames': []
      };
    }

    return result;
  }
}
