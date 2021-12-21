import { Component, OnDestroy, OnInit, DoCheck } from '@angular/core';
import { ConfirmationService, MessageService, SortEvent } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { uiService } from 'src/app/shared/services/ui.service';
import { Employee } from '../../models/employee.model';
import { EmpolyeesService } from '../../services/employees.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit,OnDestroy,DoCheck {
  sub$ = new Subject();
  display : boolean = false;
  empId="";
  loading$;

  constructor(private empSer:EmpolyeesService,private uiSer:uiService,private confirmationService: ConfirmationService,private messageService:MessageService) {
    this.loading$ = this.uiSer.loading$;
   }
  ngDoCheck(): void {
    console.log(this.empId)
  }

  emplyees!:Employee[];
  ngOnInit(): void {
    this.getEmplyees();
  }
  getEmplyees() {
    this.empSer.getEmployees().pipe(takeUntil(this.sub$)).subscribe((res)=>{
      this.emplyees = res;
      this.uiSer.loading$.next(false);
    });
  }
  DeleteEmp(id:string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete this Emplyee?',
      accept: () => {
        this.empSer.deleteEmployee(id).pipe(takeUntil(this.sub$)).subscribe(
          ()=>{this.messageService.add({severity:'success', summary:'Success', detail:`Emplyee Deleted Successfully`});
          this.getEmplyees();
          },
          ()=>{this.messageService.add({severity:'error', summary:'Error', detail:'Emplyee Cannot Deleted'})}
        )
      }
    });
  }
  openEdit(id:string){
    this.display = true;
    this.empId = id;
  }
  closed(){
    this.display = false;
    this.getEmplyees();
    this.empId = "";
  }

  ngOnDestroy(): void {
    this.sub$.next("");
    this.sub$.complete();
  }

}
