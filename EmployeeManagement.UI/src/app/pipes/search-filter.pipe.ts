import { Pipe, PipeTransform } from "@angular/core";
import { Employee } from "../models/employee";

@Pipe({
    name: "searchFilter"
})
export class SearchFilterPipe implements PipeTransform {
    transform(employees: Employee[], searchText: string) {
        if (employees.length === 0 || searchText === '') {
            return employees;
        } else {
            employees.filter((employee) => {
                return employee.email.toLocaleLowerCase() === searchText.toLocaleLowerCase();
            });
            return employees;
        }
    }
}
