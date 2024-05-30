import { Injectable, Output, EventEmitter } from '@angular/core';
import { FilterContent } from '../Models/FilterContent';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filters : FilterData | undefined;

  @Output() filterChange: EventEmitter<{
    alphabets: Set<string>,
    dropdownFilters: FilterContent
  }> = new EventEmitter();

  constructor() { }

  onFilterChange(data: FilterData){
    this.filters = data;
    this.filterChange.emit(this.filters);
  }
}

interface FilterData{
  alphabets: Set<string>,
  dropdownFilters: FilterContent
}