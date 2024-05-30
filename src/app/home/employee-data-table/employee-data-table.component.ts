import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { Employee } from '../../Models/Employee';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../Services/filter.service';

@Component({
  selector: 'data-table',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './employee-data-table.component.html',
  styleUrl: './employee-data-table.component.css'
})
export class EmployeeDataTableComponent implements OnInit{
  
  columnNames = Columns
  employeesData!: Employee[]; 
  isSelectAllCheckboxChecked:  boolean = false;
  selectedEmployees: Set<string> = new Set();

  constructor(private apiService: ApiService, private filterService: FilterService){ }

  ngOnInit(): void {
    this.apiService.getData().subscribe((data)=>{
      this.employeesData = data;
    })

    this.filterService.filterChange.subscribe((filterData)=>{
      this.apiService.getFilteredData(filterData).subscribe(data =>{
        this.employeesData = data;
      });
    })
  }

  sort(ColumnName: Columns){
    
  }
  onCheckBoxClick(empNo: string){
    if(this.selectedEmployees.has(empNo)){
      this.selectedEmployees.delete(empNo);
    }
    else{
      this.selectedEmployees.add(empNo);
    }
    this.isSelectAllCheckboxChecked = this.selectedEmployees.size === this.employeesData.length;
  }

  onSelectAllCheckBoxChange(event: any){
    this.isSelectAllCheckboxChecked = event.target.checked;
    if(this.isSelectAllCheckboxChecked){
      this.employeesData.forEach(emp => {
        this.selectedEmployees.add(emp.empNo);
      });
    }
    else{
      this.selectedEmployees.clear();
    }
  }

}


enum Columns{
  User, Location, Department, Role, EmpNo, Status, JoiningDate
}



