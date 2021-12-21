import { EmpolyeesService } from './../../services/employees.service';
import { Employee } from './../../models/employee.model';
import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.sass']
})
export class EmployeeFormComponent implements OnInit,DoCheck {
  @Input()
  id!: string;
  @Output() newItemEvent = new EventEmitter<boolean>();
  editMode:boolean = false;
  form!: FormGroup;
  isSubmitted : boolean = false;
  constructor(private formbuilder:FormBuilder,private empSer:EmpolyeesService,private messageService:MessageService) { }


  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.form = this.formbuilder.group({
      name: ["",Validators.required],
      email: ["",[Validators.required,Validators.email]],
      phone:["",Validators.required],
      Adress:["",Validators.required],
    });
  }
  checkEditMode() {
    if(this.id) {
      this.editMode = true;
    }
  }
  close(){
    this.newItemEvent.emit(false);
  }
  submit(){
    this.isSubmitted = true;
    if (this.form.invalid) return;
    const employee:Employee = {
      empName: this.form.controls['name'].value,
      empEmail: this.form.controls['email'].value,
      empPhone: this.form.controls['phone'].value,
      empAddress: this.form.controls['Adress'].value,
    }
    if(this.editMode){
      console.log("edit")
    } else {
      this.empSer.addEmployee(employee).pipe().subscribe((res:Employee)=>{
        this.messageService.add({severity:'success', summary:'Success', detail:`Employee ${res.empName} Added Successfully`});
        this.close();
      },
      (err)=>{
        this.messageService.add({severity:'error', summary:'Error', detail:'Employee Cannot be Added'})
      })
    }
  }




  ngDoCheck(): void {
    this.checkEditMode()
  }



}


