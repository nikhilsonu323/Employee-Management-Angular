import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Role } from '../../Models/Role';
import { DropdownFilterComponent } from '../dropdown-filter/dropdown-filter.component';
import { FilterContent } from '../../Models/FilterContent';
import { ApiService } from '../../Services/api.service';
import { Router, RouterLink } from '@angular/router';
import { RoleDetailsComponent } from '../role-details/role-details.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [NgFor, DropdownFilterComponent, RouterLink, RoleDetailsComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit{
  roles: Role[] = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getRolesWithEmployees().subscribe(data =>{
      this.roles = data;
    });
  }

  onFiltersChange(selectedFilters: FilterContent){
    this.apiService.getFilteredRoles(selectedFilters).subscribe(data =>{
      this.roles = data;
    });
  }

  viewRoleDetails(id: number){
    this.router.navigate(["roles",id,"employees"]);
  }

  
  getEmployeeImagesInRole(role: Role, count: number){
    let images: string[] = [];
    let i = 0;
    if(!role.employees) return [];
    while(count > 0 && i < role.employees.length){
      if(role.employees[i].imageData != null){
        count -= 1;
        images.push(role.employees[i].imageData!);
      }
      i+=1;
    }
    return images;
  }
}
