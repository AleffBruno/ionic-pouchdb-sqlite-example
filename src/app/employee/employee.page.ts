import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {

  @Input() incomingEmployee: string;

  employee: any = {};
  canDelete = false;
  canUpdate = false;  

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(){
    var employee = this.incomingEmployee;
    if(employee){
      this.employee = employee;
      this.canDelete = true;
      this.canUpdate = true;
    }
  }

  addOrUpdate() {
    if (this.canUpdate) {
        this.employeeService.update(this.employee)
            .catch(()=>{});
    } else {
        this.employeeService.create(this.employee)
            .catch(()=>{});
    }

    console.log("DIMISSSSSSSSSSSSSS")
  }

  delete() {
    this.employeeService.delete(this.employee)
        .catch(()=>{});

    console.log("DIMISSSSSSSSSSSSSS")
  }
  
}
