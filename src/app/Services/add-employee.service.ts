import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Role } from '../Models/Role';
import { Department, Location, Manager, Project, Status } from '../Models/AddEmployeeOptions';
import { AddEmployee } from '../Models/AddEmployee';

@Injectable({
  providedIn: 'root'
})
export class AddEmployeeAndRoleService {

  constructor(private http: HttpClient) { }
  private url = 'https://localhost:7260/api/';

  getLocations(){
    return this.http.get<Location[]>(this.url+'Locations');
  }
  
  getDepartments(){
    return this.http.get<Department[]>(this.url+'Department');
  }
  
  getStatus(){
    return this.http.get<Status[]>(this.url+'Status');
  }

  getProjects(){
    return this.http.get<Project[]>(this.url+'Project');
  }

  getJobTitles(DepartmentId: number){
    return this.http.get<Role[]>(this.url+'Roles/department/' + DepartmentId);
  }

  getManagers(empno: string | null){
    return this.http.get<Manager[]>(this.url+'Employees/managers');
  }

  addEmployee(employee: AddEmployee){
    return this.http.post(this.url+'Employees',employee);
  }

  editEmployee(employee: AddEmployee){
    return this.http.put(this.url+'Employees',employee);
  }

  addRole(role: {
    roleName: string,
    departmentId: string,
    locationId: string,
    description: string | null,
    employeeIds: string[]
  }){
    return this.http.post(this.url+'Roles', role);
  }

  uploadImage(image: FormData){
    return this.http.post(this.url+'Employees/image',image);
  }
}
