import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { NgClass, NgIf } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { HomeComponent } from './home/home.component';
import { AddEmployeeAndRoleService } from './Services/add-employee.service';
import { ToasterService } from './Services/toaster.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideNavbarComponent, NgClass, SearchBarComponent, HomeComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Employee-Management';
  isNavbarMinimized: boolean = false;
  toasterContent : {
    message: string,
    isSuccess: boolean,
    displayTime: number
  } | null = null;

  constructor(private addEmployeeService: AddEmployeeAndRoleService, private toasterService: ToasterService){ }

  ngOnInit() {
    this.toasterService.onShowToaster.subscribe(toasterContent => {
      this.toasterContent = toasterContent;
      setTimeout(() => this.toasterContent = null, toasterContent.displayTime); 
    })
    
    // this.addEmployeeService.onAddEmployee.subscribe(success =>{
    //   success ? this.toasterContent.message = 'Employee details Added Sucessfully' : this.toasterContent.message = 'Server Error';
    //   this.toasterContent.isSuccess = success;
    //   if(success){
    //     this.toasterContent.showToaster = true;
    //     setTimeout(() => this.toasterContent.showToaster = false, 4000); 
    //   }
    // })
    
    // this.addEmployeeService.onEditEmployee.subscribe(success =>{
    //   success ? this.toasterContent.message = 'Employee details Updated Sucessfully' : this.toasterContent.message = 'Internal Server Error';
    //   this.toasterContent.isSuccess = success;
    //   if(success || !success){
    //     this.toasterContent.showToaster = true;
    //     setTimeout(() => this.toasterContent.showToaster = false, 4000); 
    //   }
    // })
  }

  toggleNavbar(isNavbarMinimized: boolean){
    this.isNavbarMinimized = isNavbarMinimized;
  }
}
