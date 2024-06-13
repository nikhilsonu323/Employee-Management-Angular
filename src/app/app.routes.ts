import { Routes } from '@angular/router';
import { HomeComponent } from './dashboard/home/home.component';
import { AddEmployeeComponent } from './dashboard/add-employee/add-employee.component';
import { EmployeeFormModes } from './Models/AddEmployeeOptions';
import { RolesComponent } from './dashboard/roles/roles.component';
import { RoleDetailsComponent } from './dashboard/role-details/role-details.component';
import { AddRoleComponent } from './dashboard/add-role/add-role.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './RouteGuards/authGuards';

export const routes: Routes = [
    { path: '', redirectTo: 'employees', pathMatch:'full'},
    { path: 'login', component: LoginComponent},
    { path: '', component: DashboardComponent, canActivate: [authGuard] ,children: [
        { path: 'employees', component: HomeComponent, children: []},
        { path: 'employees/add', component: AddEmployeeComponent, canDeactivate: [(comp: AddEmployeeComponent) => comp.canExit()], data: {mode: EmployeeFormModes.AddEmployee}},
        { path: 'employees/edit/:id', component: AddEmployeeComponent, canDeactivate: [(comp: AddEmployeeComponent) => comp.canExit()], data: {mode: EmployeeFormModes.EditEmployee}},
        { path: 'employees/view/:id', component: AddEmployeeComponent, data: {mode: EmployeeFormModes.ViewEmployee}},
        { path:'roles', component: RolesComponent},
        { path:'roles/:id/employees', component: RoleDetailsComponent},
        { path:'roles/add', component: AddRoleComponent},
        // { path: '**', redirectTo: 'employee' }
        ]
    },
];
