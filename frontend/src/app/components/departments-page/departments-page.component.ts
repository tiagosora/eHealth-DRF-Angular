import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/Department';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { DepartmentService } from 'src/app/services/department/department.service';

@Component({
  selector: 'app-departments-page',
  templateUrl: './departments-page.component.html',
  styleUrls: ['./departments-page.component.css']
})
export class DepartmentsPageComponent implements OnInit {

  departments : any[]

  constructor(
    private departmentService: DepartmentService,
  ) {
    this.departments = []
  }

  deleteDepartment(name: any){
    this.departmentService.deleteDepartment(name);
  }

  ngOnInit(): void {
    this.departmentService.getAllDepartments().subscribe(
      dpts => {
        dpts.forEach((department : any) => {
          let doctorList : any[] = []
          department.doctors.forEach((doctor : any) => {
            doctorList.push(doctor.user)
          })
          this.departments.push({"name":department.name,"doctors":doctorList.length})
        })
      }
    )
  }

}
