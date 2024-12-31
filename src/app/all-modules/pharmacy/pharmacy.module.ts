import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { PharmacyListComponent } from './dashbaord/list/pharmacy-list.component';
import { PharmacyFormComponent } from './dashbaord/form/pharmacy-form.component';
import { PharmacyViewComponent } from './dashbaord/view/pharmacy-view.component';
import { PharmacyMedicineListComponent } from './medicine/list/pharmacy-medicine-list.component';
import { PharmacyMedicineFormComponent } from './medicine/form/pharmacy-medicine-form.component';
import { PharmacyMedicineViewComponent } from './medicine/view/pharmacy-medicine-view.component';
import { PharmacyService } from './shared/services/pharmacy.service';
import { PurchaseMedicineListComponent } from './purchase-medicine/list/purchase-medicine-list.component';
import { PurchaseMedicineFormComponent } from './purchase-medicine/form/purchase-medicine-form.component';
import { PurchaseMedicineViewComponent } from './purchase-medicine/view/purchase-medicine-view.component';
import { BadStockFormComponent } from './medicine/bad-stock/bad-stock-form.component';

@NgModule({
  declarations: [
    PharmacyListComponent,
    PharmacyFormComponent,
    PharmacyViewComponent,
    PharmacyMedicineListComponent,
    PharmacyMedicineFormComponent,
    PharmacyMedicineViewComponent,
    PurchaseMedicineListComponent,
    PurchaseMedicineFormComponent,
    PurchaseMedicineViewComponent,
    BadStockFormComponent
  ],
  imports: [
    CommonModule,
    PharmacyRoutingModule,
    SharedModule,
    AgGridModule,
  ],
  providers: [
    PharmacyService,
  ]
})
export class PharmacyModule { }
