import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EmployeePage } from '../employee/employee.page';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public employees : [] = [];

  constructor(public modalCtrl: ModalController, public employeeService : EmployeeService) {}

  async ngOnInit() {
    this.employeeService.createPouchDB();

    this.employees = await this.employeeService.read();
  }

  async showDetails(employee) {
    let modal = await this.modalCtrl.create({
      component: EmployeePage,
      componentProps: {
        employee: employee
      }
    });
    await modal.present()
  } 

  addEmployee() {
    console.log("criado")
    this.employeeService.create({name:"jose"})
  }

  async read() {
    console.log(await this.employeeService.getAll())
  }

}
