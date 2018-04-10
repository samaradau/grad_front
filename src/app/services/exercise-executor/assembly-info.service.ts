import { Injectable } from '@angular/core';
import { TestAssemblyInfo } from '../../models/exercise-executor/test-assembly-info';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from '../authentication/auth.service';
import { environment } from '../../../environments/environment';
import { Assembly } from '../../models/exercise-management/assembly';
import { AssemblyId } from '../../models/exercise-management/assembly-id';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AssemblyInfoService {

  private assemblyInfoUrl =  environment.apiUrl + 'api/v1/assemblyInfo/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAll(): Observable<TestAssemblyInfo[]> {
    return this.http.get<TestAssemblyInfo[]>(this.assemblyInfoUrl + 'names-and-ids', { headers: this.authService.getAuthHeader() });
  }

  getAssemblyById(id): Observable<Assembly> {
    return this.http.get<Assembly>(this.assemblyInfoUrl + id, { headers: this.authService.getAuthHeader() });
  }

  сreateAssembly(file: File) {
    const formData: FormData = new FormData();
    formData.append('uploadFile', file, file.name);
    return this.http.post<AssemblyId>(this.assemblyInfoUrl, formData, { headers: this.authService.getAuthHeader() });
  }

  delete(id): Observable<TestAssemblyInfo> {
    return this.http.delete<TestAssemblyInfo>(this.assemblyInfoUrl + id, { headers: this.authService.getAuthHeader() });
  }
}
