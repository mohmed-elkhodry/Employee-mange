import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ServiceNameService {
  loading$ = new BehaviorSubject(false);
  constructor() { }

}
