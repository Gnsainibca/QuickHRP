import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from "ng-apexcharts";
import { DataService } from './data/data.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { NgxBootstrapModule } from './ngx-bootstrap/ngx-bootstrap.module';
import { NgxMaskModule } from 'ngx-mask';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DatepickerModule } from 'ng2-datepicker';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgApexchartsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxBootstrapModule,
    NgxMaskModule.forRoot({
      showMaskTyped: false,
    }),
    AngularEditorModule,
    SweetAlert2Module.forRoot(),
    PerfectScrollbarModule,
    DatepickerModule,
    NgbModule,
  ],
  exports: [
    CommonModule,
    NgApexchartsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxBootstrapModule,
    NgxMaskModule,
    AngularEditorModule,
    SweetAlert2Module,
    // FullCalendarModule,
    PerfectScrollbarModule,
    DatepickerModule
  ],
  providers: [
    DataService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ]
})
export class SharedModule { }
