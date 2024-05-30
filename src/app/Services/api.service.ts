import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Models/Employee';
import { FilterContent } from '../Models/FilterContent';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) { 
    console.log("http service ");
    
  }
  private url = 'https://localhost:7167/api/Employees';
  getData(){
    return this.http.get<Employee[]>(this.url);
  }

  getFilteredData(filters: FilterData){
    var filterData = {
      alphabets: Array.from(filters.alphabets),
      status: Array.from(filters.dropdownFilters.status),
      location: Array.from(filters.dropdownFilters.location),
      department: Array.from(filters.dropdownFilters.departments)
    };
    return this.http.post<Employee[]>(this.url+'/filter', filterData);
  }
}

interface FilterData{
  alphabets: Set<string>,
  dropdownFilters: FilterContent
}