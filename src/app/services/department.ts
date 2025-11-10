import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  employeeCode: string;
  nameAr: string;
  nameEg: string;
  email: string;
  jobTitle: string;
}

export interface Department {
  departmentCode: string;
  nameAr: string;
  nameEg: string;
  hasEmployees: boolean;
  employeesCount: string;
  managerName: string;
  parentDepartment: string;
  id: string;
  employees: Employee[];
}

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private apiUrl = 'https://68e3c4de8e14f4523dae9b3d.mockapi.io/Employee_ID';

  constructor(private http: HttpClient) {}

  /** Fetch departments from API */
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  /** Build tree for ApexTree */
  getTree(departments: Department[], language: 'ar' | 'eg' = 'eg'): any[] {
    const map: { [key: string]: any } = {};
    const tree: any[] = [];

    // Create all nodes
    departments.forEach((dep, idx) => {
      map[dep.departmentCode] = {
        id: dep.departmentCode,
        data: { title: language === 'ar' ? dep.nameAr : dep.nameEg },
        options: {},
        children: dep.hasEmployees
          ? dep.employees.map((emp, eIdx) => ({
              id: `${dep.departmentCode}_EMP_${eIdx}`,
              data: { title: language === 'ar' ? emp.nameAr : emp.nameEg },
              options: {},
            }))
          : [],
      };
    });

    // Link parent/child departments
    departments.forEach((dep) => {
      if (dep.parentDepartment && map[dep.parentDepartment]) {
        map[dep.parentDepartment].children = [
          ...(map[dep.parentDepartment].children || []),
          map[dep.departmentCode],
        ];
      } else if (!dep.parentDepartment) {
        tree.push(map[dep.departmentCode]);
      }
    });

    return tree;
  }
}
