import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeFormModes } from './Models/AddEmployeeOptions';
import { RolesComponent } from './roles/roles.component';
import { RoleDetailsComponent } from './role-details/role-details.component';
import { AddRoleComponent } from './add-role/add-role.component';

export const routes: Routes = [
    { path: '', redirectTo: "employees", pathMatch: "full"},
    { path: 'employees', component: HomeComponent, children: []},
    { path: 'employees/add', component: AddEmployeeComponent, canDeactivate: [(comp: AddEmployeeComponent) => comp.canExit()], data: {mode: EmployeeFormModes.AddEmployee}},
    { path: 'employees/edit/:id', component: AddEmployeeComponent, canDeactivate: [(comp: AddEmployeeComponent) => comp.canExit()], data: {mode: EmployeeFormModes.EditEmployee}},
    { path: 'employees/view/:id', component: AddEmployeeComponent, data: {mode: EmployeeFormModes.ViewEmployee}},
    { path:'roles', component: RolesComponent},
    { path:'roles/:id/employees', component: RoleDetailsComponent},
    { path:'roles/add', component: AddRoleComponent},
    { path: '**', redirectTo: 'employee' }
];
