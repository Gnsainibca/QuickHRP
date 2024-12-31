import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PharmacyListComponent } from './dashbaord/list/pharmacy-list.component';
import { PharmacyMedicineListComponent } from './medicine/list/pharmacy-medicine-list.component';
import { PurchaseMedicineListComponent } from './purchase-medicine/list/purchase-medicine-list.component';

const routes: Routes = [
  { path: '', component: PharmacyListComponent },
  { path: 'medicine', component: PharmacyMedicineListComponent},
  { path: 'medicine/purchase', component: PurchaseMedicineListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacyRoutingModule { }
