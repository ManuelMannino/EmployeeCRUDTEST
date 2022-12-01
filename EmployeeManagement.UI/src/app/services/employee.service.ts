import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';
import { catchError, map, tap, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = "Employee"
  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.apiUrl}/${this.url}`);
  }

  public createEmployee(employee: Employee): Observable<Employee[]> {
    return this.http.post<Employee[]>(`${environment.apiUrl}/${this.url}`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee[]> {
    return this.http.put<Employee[]>(`${environment.apiUrl}/${this.url}`, employee);
  }

  public deleteEmployee(employee: Employee): Observable<Employee[]> {
    return this.http.delete<Employee[]>(`${environment.apiUrl}/${this.url}/${employee.id}`);
  }

  public nameSearch(terms: any) {
    return terms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        const url = `${environment.apiUrl}/${this.url}/${term}`;
        return this.http.get(url);
      }),
      catchError((error: any) => {
        console.error(error);
        return of();
      }),
    );
  }
}
