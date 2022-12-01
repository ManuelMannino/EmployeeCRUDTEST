import { Component, ViewChild } from '@angular/core';
import { Employee } from './models/employee';
import { EmployeeService } from './services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EmployeeManagement.UI';
  employees: Employee[] = [];
  employeeToEdit?: Employee;
  displayedColumns: string[] = ['Firstname', 'Lastname', 'Email', 'PhoneNumber', 'EditButton'];
  dataSource = new MatTableDataSource<Employee>(this.employees);
  searchText: string = '';

  public dataLength?: number;
  public searchTerm$ = new Subject<string>();

  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private employeeService: EmployeeService) {
    this.employeeService.nameSearch(this.searchTerm$)
      .subscribe((data: Employee[]) => {
        this.dataLength = data.length;
        this.dataSource.data = data;
      });
  }

  keyup(event: any) {
    console.log(event.target.value);
    this.searchTerm$.next(event.target.value);
  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((result: Employee[]) => {
      this.employees = result;
      this.dataSource = new MatTableDataSource<Employee>(result);
      this.dataSource.paginator = this.paginator;
    });
  }

  initNewEmployee() {
    this.employeeToEdit = new Employee();
  }

  editEmployee(employee: Employee) {
    this.employeeToEdit = employee;
    console.log(this.editEmployee);
  }

  updateEmployeeList(employees: Employee[]) {
    this.employees = employees;
  }
}

