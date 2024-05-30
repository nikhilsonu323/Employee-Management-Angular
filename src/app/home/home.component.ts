import { Component } from '@angular/core';
import { FiltersComponent } from './filters/filters.component';
import { EmployeeDataTableComponent } from './employee-data-table/employee-data-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FiltersComponent, EmployeeDataTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
