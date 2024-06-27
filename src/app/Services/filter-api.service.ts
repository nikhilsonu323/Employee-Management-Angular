import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterApiService {
  constructor(private http: HttpClient) { }
  private url = 'https://localhost:7260 /api/';

  getLocations(){
    return this.http.get<{id: number, city: string}[]>(this.url+'Locations');
  }
  
  getDepartments(){
    return this.http.get<{id: number, name: string}[]>(this.url+'Department');
  }
  
  getStatus(){
    return this.http.get<{id: number, statusType: string}[]>(this.url+'Status');
  }
}
