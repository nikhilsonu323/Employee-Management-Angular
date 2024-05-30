import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FilterContent } from '../../../Models/FilterContent';

@Component({
  selector: 'dropdown-filter',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './dropdown-filter.component.html',
  styleUrl: './dropdown-filter.component.css'
})
export class DropdownFilterComponent {
  selectedFilters = new FilterContent();
  //Retrive data from api
  filterData = new FilterContent();  
  toDisplayFilterOptions = new OptionDisplayHandler();

  @Output() onFilterChange: EventEmitter<FilterContent> = new EventEmitter();

  constructor(){
    this.filterData.departments.add("UIUX");
    this.filterData.location.add("Hyderabad");
    this.filterData.location.add("Koti");
    this.filterData.status.add("active");
    this.filterData.status.add("incative");
  }

  onOptionClick(set: Set<string>, value: string){
    if(set.has(value)){
      set.delete(value);
    }
    else{
      set.add(value);
    }
  }

  clearSelectedOptions(){
    this.selectedFilters = new FilterContent();
    this.onFilterChange.emit(this.selectedFilters);
  }

  apply(){
    this.onFilterChange.emit(this.selectedFilters);
  }
}



class OptionDisplayHandler{
  Status: boolean = false;
  Location: boolean = false;
  Department: boolean = false;
}