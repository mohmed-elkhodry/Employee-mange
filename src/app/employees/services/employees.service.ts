import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({providedIn: 'root'})
export class EmpolyeesService {
  Employee_API = environment.apiUrl + "Employees";
  constructor(private http: HttpClient) { }

  getEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.Employee_API}/getAllEmployees`);
  }
  getEmployee(id:string){
    return this.http.get(`${this.Employee_API}/getEmpByID/${id}`);
  }
  deleteEmployee(id:string){
    return this.http.get(`${this.Employee_API}/deleteEmpByID/${id}`);
  }
  addEmployee(emp:Employee){
    return this.http.post(`${this.Employee_API}/addEmployee`,emp);
  }
  editEmployee(emp:Employee){
    return this.http.post(`${this.Employee_API}/editEmployee`,emp);
  }



}
