import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { BillingComponent } from './dashbaord/billing.component';
import { BillingRoutingModule } from './billing-routing.module';
import { BillingService } from './shared/services/billing.service';

@NgModule({
  declarations: [
    BillingComponent,
  ],
  imports: [
    CommonModule,
    BillingRoutingModule,
    SharedModule,
    AgGridModule,
  ],
  providers: [
    BillingService,
  ]
})
export class BillingModule { }
