import { EmpolyeesService } from './../../services/employees.service';
import { Employee } from './../../models/employee.model';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.sass']
})
export class EmployeeFormComponent implements OnInit,OnDestroy,DoCheck {
  @Input()
  id!: string;
  @Output() newItemEvent = new EventEmitter<boolean>();
  editMode:boolean = false;
  sub$ = new Subject();
  form!: FormGroup;
  isSubmitted : boolean = false;
  currentEmpId!: string;
  loading:boolean = false;
  constructor(private formbuilder:FormBuilder,private empSer:EmpolyeesService,private messageService:MessageService) {}
  ngDoCheck(): void {
    this.checkEditMode();
  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.form = this.formbuilder.group({
      name: ["",Validators.required],
      email: ["",[Validators.required,Validators.email]],
      phone:["",[Validators.required,Validators.pattern('^01[0-2,5]{1}[0-9]{8}$')]],
      Adress:["",Validators.required],
    });
  }
  checkEditMode() {
    if(this.editMode)return;
    if(this.id) {
      this.editMode = true;
      this.currentEmpId = this.id;
      this.empSer.getEmployee(this.currentEmpId).pipe(take(1)).subscribe((res:Employee)=>{
        console.log("subscribed")
        this.form.controls['name'].setValue(res.empName);
        this.form.controls['email'].setValue(res.empEmail);
        this.form.controls['phone'].setValue(res.empPhone);
        this.form.controls['Adress'].setValue(res.empAddress);
      })
    }
  }
  close(){
    this.editMode = false;
    this.currentEmpId = "";
    this.form.reset();
    this.newItemEvent.emit(false);
  }
  submit(){
    this.loading = true;
    this.isSubmitted = true;
    if (this.form.invalid) return;
    const employee:Employee = {
      empName: this.form.controls['name'].value,
      empEmail: this.form.controls['email'].value,
      empPhone: this.form.controls['phone'].value,
      empAddress: this.form.controls['Adress'].value,
    }
    if(this.editMode){
      const updatedEmp:Employee = {...employee,empId:this.currentEmpId};
      this.empSer.editEmployee(updatedEmp).pipe(takeUntil(this.sub$)).subscribe((res)=>{
        this.messageService.add({severity:'success', summary:'Success', detail:`Employee Edited Successfully`});
        this.close();
        this.loading= false;
      },
      (err)=>{
        this.loading = false;
        this.messageService.add({severity:'error', summary:'Error', detail:'Employee Cannot be Edited'})
      })
    } else {
      this.empSer.addEmployee(employee).pipe(takeUntil(this.sub$)).subscribe((res)=>{
        this.messageService.add({severity:'success', summary:'Success', detail:`Employee Added Successfully`});
        this.close();
        this.loading = false;
      },
      (err)=>{
        this.loading = false;
        this.messageService.add({severity:'error', summary:'Error', detail:'Employee Cannot be Added'})
      })
    }
  }


  ngOnDestroy(): void {
    this.id = "";
    this.sub$.next("");
    this.sub$.complete();
  }



}


