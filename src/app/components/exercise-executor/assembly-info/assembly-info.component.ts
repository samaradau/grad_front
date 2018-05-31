import { Component, OnInit } from '@angular/core';
import { TestAssemblyInfo } from '../../../models/exercise-executor/test-assembly-info';
import { AssemblyInfoService } from '../../../services/exercise-executor/assembly-info.service';
import { AuthService } from '../../../services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assembly-info',
  templateUrl: './assembly-info.component.html',
  styleUrls: ['./assembly-info.component.css']
})
export class AssemblyInfoComponent implements OnInit {
  public assemblyInfo: TestAssemblyInfo[];
  uploadFile: any;
  file: File;

  constructor(private asseblyInfoService: AssemblyInfoService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (!this.authService.checkAccess(AssemblyInfoComponent.name)) {
      this.router.navigate(['denied']);
    }
    this.getAssembly();
  }

  getAssembly(): void {
    this.asseblyInfoService.getAll()
    .subscribe(info => this.assemblyInfo = info);
  }

  deleteAssembly(id: number): void {
    if (confirm('Вы уверены что хотите удалить эту сборку?')) {
    this.assemblyInfo = this.assemblyInfo.filter(ai => ai.item2 !== id);
    this.asseblyInfoService.delete(id).subscribe();
    }
  }

  postAssembly(): void {
    if (this.file) {
      if (!this.assemblyInfo.some(ai => ai.item1 === this.file.name)) {
        const assembly = new TestAssemblyInfo();
        this.asseblyInfoService.сreateAssembly(this.file)
          .subscribe(
          id => {
            assembly.item2 = id.id;
            assembly.item1 = this.file.name;
            this.assemblyInfo.push(assembly);
          },
          err => {
            alert('Сборка уже существует');
          });
      } else {
        alert('Сбока с таким именем уже существует.');
      }
    }
  }

  onChange(event) {
    let a = <HTMLLabelElement> document.getElementById("fileLabel");
    const files: FileList = event.target.files;
    const type = files[0].name.split('.');
    if (type[type.length - 1] !== 'dll') {
      alert('Type of file must be .dll');
      event.target.value = null;
    } else {
       this.file = files[0];
       a.innerHTML = this.file.name;
     }
  }
}
