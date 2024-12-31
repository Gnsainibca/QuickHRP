import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PharmacyService } from '../../shared/services/pharmacy.service';
import { PurchaseMedicineList } from '../../shared/models/pharmacy';
import { DataService } from 'src/app/shared/core.index';
import { Master_MedicineSupplier } from 'src/app/all-modules/setup/pharmacy/shared/models/master-medicine-supplier';
import { PharmacySetupService } from 'src/app/all-modules/setup/pharmacy/shared/services/pharmacy-setup.service';

@Component({
  selector: 'app-purchase-medicine-view',
  templateUrl: './purchase-medicine-view.component.html',
  styleUrls: ['./purchase-medicine-view.component.scss']
})
export class PurchaseMedicineViewComponent {

  @Input() id: number = 0;
  public purchasedMadicine !: PurchaseMedicineList;
  supplierDetails?: Master_MedicineSupplier;

  constructor(public activeModal: NgbActiveModal, private data: PharmacyService, private dataService: DataService, private pharmacySetupService: PharmacySetupService) {

  }

  ngOnInit() {
    this.purchasedMadicine = this.data.getPurchaseMedicineById(this.id)!;
    this.supplierDetails = this.pharmacySetupService.getMedicineSupplier(this.purchasedMadicine.supplierId);
  }

  round(num: number, fractionDigits: number): number {
    return Number(num.toFixed(fractionDigits));
  }
}
