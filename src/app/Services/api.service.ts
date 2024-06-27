import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Models/Employee';
import { FilterContent } from '../Models/FilterContent';
import { Role } from '../Models/Role';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) { }
  private url = 'https://localhost:7260 /api/Employees';
  private rolesUrl = 'https://localhost:7260 /api/Roles';
  
  getEmployees(){
    return this.http.get<Employee[]>(this.url);
  }

  getEmployeeById(id: string){
    return this.http.get<Employee | null>(this.url+'/'+id);
  }

  getFilteredEmployee(filters: FilterData){
    var filterData = {
      alphabets: Array.from(filters.alphabets),
      statusIds: Array.from(filters.dropdownFilters.status),
      locationIds: Array.from(filters.dropdownFilters.location),
      departmentIds: Array.from(filters.dropdownFilters.departments)
    };
    return this.http.post<Employee[]>(this.url+'/filter', filterData);
  }

  getEmployeesInRole(id: number){
    return this.http.get<Employee[]>(this.url+'/role/'+id);
  }

  deleteEmployees(empNos: Set<string>){
    return this.http.delete<string[]>(this.url,{body: Array.from(empNos)});
  }

  deleteEmployee(empNo: string){
    return this.http.delete(this.url + '/'+ empNo);
  }

  getRoles(){
    return this.http.get<Role[]>(this.rolesUrl);
  }

  getRoleById(id: number){
    return this.http.get<Role | null>(this.rolesUrl +"/" + id);
  }

  getRolesWithEmployees(){
    return this.http.get<Role[]>(this.rolesUrl+'/employees');
  }
  
  getFilteredRoles(filters: FilterContent){
    return this.http.post<Role[]>(this.rolesUrl+'/filter',
      {
        locationIds: Array.from(filters.location), 
        departmentIds: Array.from(filters.departments)
      });
  }

}

interface FilterData{
  alphabets: Set<string>,
  dropdownFilters: FilterContent
}