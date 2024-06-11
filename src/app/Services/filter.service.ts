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

  @Output() onExportClick: EventEmitter<null> = new EventEmitter();

  constructor() { }

  onFilterChange(data: FilterData){
    this.filters = data;
    this.filterChange.emit(this.filters);
  }

  downloadData(){
    this.onExportClick.emit();
  }

}

interface FilterData{
  alphabets: Set<string>,
  dropdownFilters: FilterContent
}