import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Department, Location } from '../Models/AddEmployeeOptions';
import { Employee } from '../Models/Employee';
import { AddEmployeeAndRoleService } from '../Services/add-employee.service';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { map } from 'rxjs';
import { ToasterService } from '../Services/toaster.service';

@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, NgClass, FormsModule],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent implements OnInit {

  form: FormGroup;
  locations: Location[] = [];
  departments: Department[] = [];
  employees: {name: string, empNo: string}[] = [];
  isRoleAdded: boolean = false;
  selectedEmployees: Set<string> = new Set();
  toDisplayEmployees = false;
  searchText = '';
  isSearchInputFocused = false;
  errorMessages = {
    required: 'This Field is Required',
  }

  @ViewChild('employeeList') employeeList!: ElementRef;

  constructor(private addRoleService: AddEmployeeAndRoleService,private router: Router, 
    private apiService: ApiService, private toasterService: ToasterService) {
    this.form = new FormGroup({
      roleName: new FormControl(null,[Validators.required]),
      department: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      description: new FormControl(null),
    });
    this.form.get('jobTitle')?.disable();    
  }

  ngOnInit(): void {
    this.loadDropdownOptions();
    document.body.addEventListener('click', (event: Event) => this.handleClickOutside(event));
  }

  handleClickOutside(event: Event) {
    if (event.target !== this.employeeList.nativeElement && !this.employeeList.nativeElement.contains(event.target as Node)) {
      this.toDisplayEmployees = false;
    }
  }


  loadDropdownOptions(){
    this.addRoleService.getDepartments().subscribe(data => this.departments = data);

    this.addRoleService.getLocations().subscribe(data => this.locations = data);

    this.apiService.getEmployees()
    .pipe(map( employees =>{
      return employees.map(emp => { return {name: emp.firstName+' '+emp.lastName, empNo: emp.empNo}})
    }))
    .subscribe(data => this.employees = data);
  }

  onCheckBoxClick(empNo: string){
    if(this.selectedEmployees.has(empNo)){
      this.selectedEmployees.delete(empNo);
    }
    else{
      this.selectedEmployees.add(empNo);
    }
  }

  onSearchInputChange(inputEvent: Event){
    this.searchText = (inputEvent.target as HTMLInputElement).value;
  }

  onCancel(){
    this.router.navigate(['roles']);
  }

  onFormSubmit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    let desc = this.form.get('description')?.value;
    desc = desc !== null && desc.length == 0 ? null : desc;
    let role = {
      roleName: this.form.get('roleName')?.value,
      departmentId: this.form.get('department')?.value,
      locationId: this.form.get('location')?.value,
      description: desc,
      employeeIds: Array.from(this.selectedEmployees)
    }

    this.addRoleService.addRole(role).subscribe({next: () => {
      this.isRoleAdded = true;
      this.toasterService.showToasterMessage('Role Added Sucessfully', true);
    }, 
    error: (err) => {
      this.toasterService.showToasterMessage('Internal Server Error', false);
    }});
  }

  canExit(){
    if(this.form.dirty && this.isRoleAdded)
      return confirm("Do you want to navigate away without saving changes");
    return true;
  }
}
