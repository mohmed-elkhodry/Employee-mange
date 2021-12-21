import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { uiService } from './shared/services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee-mange';
  loading$:Observable<boolean>;
  constructor(private uiSer:uiService){
    this.loading$ = this.uiSer.loading$;
  }
}
