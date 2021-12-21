import { Injectable } from '@angular/core';
import {  BehaviorSubject, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class uiService {
  loading$= new BehaviorSubject(true);
  constructor() { }

}
