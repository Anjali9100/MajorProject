import { Component, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  formTitle:string="Add Employee";

  @ViewChild('employeeData') form?: ElementRef<NgForm>;


  constructor(private renderer: Renderer2, private el: ElementRef) {}

  saveEmpRecord(employeeData: any): void {
    if (!employeeData.valid) {
    }
  }
  
  
}
