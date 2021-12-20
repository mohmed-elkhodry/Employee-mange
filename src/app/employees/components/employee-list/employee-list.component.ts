import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { EmpolyeesService } from '../../services/employees.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit,OnDestroy {
  sub$ = new Subject();

  constructor(private empSer:EmpolyeesService,private confirmationService: ConfirmationService,private messageService:MessageService) { }

  emplyees!:Observable<Employee[]>;
  ngOnInit(): void {
    this.getEmplyees();
  }
  getEmplyees() {
    this.emplyees = this.empSer.getEmployees();
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
  ngOnDestroy(): void {
    this.sub$.next("");
    this.sub$.complete();
  }

}
