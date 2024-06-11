import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncValidators, CustomValidator } from './CustomValidators';
import { Department, EmployeeFormModes, Location, Manager, Project } from '../Models/AddEmployeeOptions';
import { Role } from '../Models/Role';
import { AddEmployeeAndRoleService } from '../Services/add-employee.service';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { AddEmployee } from '../Models/AddEmployee';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { Employee } from '../Models/Employee';
import { ToasterService } from '../Services/toaster.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, NgClass],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit{

  form: FormGroup;
  locations: Location[] = [];
  departments: Department[] = [];
  managers: Manager[] = [];
  jobTitles: Role[] = [];
  projects: Project[] = [];
  isEmployeeAdded: boolean = false;
  Modes  = EmployeeFormModes;
  formMode: EmployeeFormModes = EmployeeFormModes.AddEmployee;
  employee: Employee | null = null;
  imageData: string | null = null;
  defaultImageData = 'assets/images/user3.png';
  errorMessages = {
    required: 'This Field is Required',
    email: 'Invalid Email',
    name: 'Name should only contain alphabets',
    empno: "The employee ID should start with 'TZ' followed by four digits, such as 'TZ0000'",
    mobileNumber: 'The mobile number should be 10 digits long, optionally preceded by a country code. For example, +91 1234567890 or 1234567890'
  }

  constructor(private addEmployeeService: AddEmployeeAndRoleService,private router: Router, 
    private asyncValidator: AsyncValidators, private activatedRoute: ActivatedRoute,
    private apiService: ApiService, private toasterService: ToasterService) {
    this.form = new FormGroup({
      empno: new FormControl(null,[Validators.required, Validators.pattern("^TZ[0-9]{4}$")]),
      firstName: new FormControl(null,[Validators.required, Validators.pattern("^[a-zA-Z]+$")]),
      lastName: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z]+$")]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      dateOfBirth: new FormControl(null),
      mobileNumber: new FormControl(null, Validators.pattern("^[0-9]{10}$")),
      joiningDate: new FormControl(null, [Validators.required,CustomValidator.joiningDate]),
      location: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      project: new FormControl(''),
      manager: new FormControl(''),
    }, CustomValidator.ageValidator);
    this.form.get('jobTitle')?.disable();    
  }

  ngOnInit(): void {
    // this.activatedRoute.data.subscribe((data) =>{})
    // this.activatedRoute.params.subscribe(data => console.log(data));
    this.formMode = this.activatedRoute.snapshot.data['mode'];
    let empNo: string | null =  this.activatedRoute.snapshot.paramMap.get('id');

    if(this.formMode == EmployeeFormModes.ViewEmployee){
      this.form.disable();
    }

    if(this.formMode == EmployeeFormModes.AddEmployee)
      this.form.get('empno')?.addAsyncValidators(this.asyncValidator.employeeNumberValidator.bind(this.asyncValidator));
    
    if((this.formMode == EmployeeFormModes.EditEmployee || this.formMode == EmployeeFormModes.ViewEmployee) && empNo!==null){
      let regex = new RegExp('^TZ[0-9]{4}$');
      if(regex.test(empNo)){
        this.apiService.getEmployeeById(empNo).subscribe(emp =>{
          if(emp == null) {
            this.router.navigate(['']);
            return;
          }
          this.employee = emp;
          this.imageData = emp.imageData
          this.setForm(emp);
        })
      }
    }

    this.loadDropdownOptions();
  }

  loadDropdownOptions(){
    this.addEmployeeService.getDepartments().subscribe(data => this.departments = data);

    this.addEmployeeService.getLocations().subscribe(data => this.locations = data);

    this.addEmployeeService.getManagers(null).subscribe(data => this.managers = data);

    this.addEmployeeService.getProjects().subscribe(data => this.projects = data);

    this.form.get('department')?.valueChanges.subscribe(selectedDepartment =>{
      if(this.toNumberOrNull(selectedDepartment) === null) return;
      this.addEmployeeService.getJobTitles(selectedDepartment).subscribe(data => this.jobTitles = data);
      let jobTitle = this.form.get('jobTitle');
      jobTitle?.setValue('');
      jobTitle?.markAsUntouched();
      
      if(this.form.get('department')?.valid && jobTitle?.disabled){
        jobTitle?.enable();
      }
      else if(this.form.get('department')?.invalid && jobTitle?.enabled){
        jobTitle?.disable();
      }
    });
  }

  setForm(emp: Employee){
    
    this.form.setValue({
      empno: emp.empNo,
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.email,
      dateOfBirth: emp.dateOfBirth,
      joiningDate: emp.joiningDate,
      mobileNumber: emp.mobileNumber,
      location: emp.locationId,
      department: emp.role.departmentId,
      jobTitle: emp.roleId,
      project: emp.projectId ?? '',
      manager: emp.managerId ?? '',
    })
    // console.log("Department id = "+emp.role.departmentId);
    // console.log("Department id from form = "+this.form.get('department')?.value);
  }

  onFormSubmit(){
    console.log(this.form);
    this.form.markAllAsTouched();

    let employee = this.getEmployeeDetailsFromForm();
    console.log(employee);

    if(this.form.invalid) return;
    
    if(this.formMode === EmployeeFormModes.AddEmployee)
      this.addEmployeeService.addEmployee(employee).subscribe({ next: () => this.onSuccessAddOrEdit(), error: (err) => this.onErrorAddOrEdit(err)});
    
    else if(this.formMode === EmployeeFormModes.EditEmployee)
      this.addEmployeeService.editEmployee(employee).subscribe({ next: () => this.onSuccessAddOrEdit(), error: (err) => this.onErrorAddOrEdit(err)});
  }

  onCancel(){
    this.router.navigate(['']);
  }

  canExit(){
    if(this.form.dirty && !this.isEmployeeAdded)
      return confirm("Do you want to navigate away without saving changes");
    return true;
  }

  toNumberOrNull(value: string | null){
    if(value === null || value.length == 0 || Number.isNaN(value)) {
      return null;
    }
    return Number(value);
  }

  onSuccessAddOrEdit(){
    this.isEmployeeAdded = true;
    let message = this.formMode == EmployeeFormModes.AddEmployee ? 'Employee details Added Sucessfully' : 'Employee details Updated Sucessfully';
    this.toasterService.showToasterMessage(message, true);
    //Handle For success
    this.router.navigate([''])
    // this.setDefaultValuesToForm();
  }

  onErrorAddOrEdit(err: any){
    console.log(err);
    this.toasterService.showToasterMessage('Internal Server Error', false);
    this.isEmployeeAdded = false
  }

  getEmployeeDetailsFromForm(){
    let dob = this.form.get('dateOfBirth')?.value;
    let manager = this.form.get('manager')?.value;
    dob = dob?.length != 0 ? dob : null; 
    let employee: AddEmployee = {
      empNo: this.form.get('empno')?.value,
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      email: this.form.get('email')?.value,
      dateOfBirth: dob ? dob : null ,
      mobileNumber: this.form.get('mobileNumber')?.value,
      joiningDate: this.form.get('joiningDate')?.value,
      roleId: this.form.get('jobTitle')?.value,
      locationId: this.form.get('location')?.value,
      projectId: this.toNumberOrNull(this.form.get('project')?.value),
      managerId: manager ? manager : null,
      statusId: 1,
      imageData: this.imageData
    }
    
    return employee;
  }

  setDefaultValuesToForm(){
    this.form.reset();
    this.form.patchValue({
      location: '',
      jobTitle: '',
      department: '',
      project: '',
      manager: ''
    })
  }

  onProfileInputChange(event: any){ 
    let fileReader = new FileReader();
    let input = event.target as HTMLInputElement;

    if(input.files == null || input.files.length == 0)
      return;

    var error = CustomValidator.validateProfile(input.files[0]);
    if(error !== null){
      this.toasterService.showToasterMessage(error, false);
      return;
    }
    fileReader.readAsDataURL(input.files[0]);
    fileReader.onload = ()=>{
      this.imageData = fileReader.result?.toString() ?? null;
    }
  }


}
