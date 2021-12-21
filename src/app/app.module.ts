import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {TableModule} from 'primeng/table';
import { LoadingSpinnerComponent } from './shared/views/loading-spinner/loading-spinner.component';
import { HttpClientModule } from '@angular/common/http';
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {InputMaskModule} from 'primeng/inputmask';
import {InputTextModule} from 'primeng/inputtext';





export const primeNgCompnents = [TableModule,CardModule,InputMaskModule,InputTextModule,ToolbarModule,ButtonModule,ConfirmDialogModule,ToastModule,DialogModule];

@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerComponent
  ],
  imports: [...primeNgCompnents,
    BrowserModule,
    AppRoutingModule,HttpClientModule,BrowserAnimationsModule
  ],
  exports:[...primeNgCompnents],
  providers: [ConfirmationService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
