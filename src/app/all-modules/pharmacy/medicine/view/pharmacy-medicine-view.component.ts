import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BadStockMedicine, PharmacyMedicineList, PurchaseMedicineStock } from '../../shared/models/pharmacy';
import { PharmacyService } from '../../shared/services/pharmacy.service';
import { ImageViewerModalContent } from 'src/app/shared/components/image-view/image-viewer-modal.component';
import { getColumnDefinations } from './pharmacy-medicine-stock-list-column-defination';
import { ColDef } from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { PurchaseMedicineFormComponent } from '../../purchase-medicine/form/purchase-medicine-form.component';
import { getBacStockGridColumnDefinations } from './pharmacy-medicine-bad-stock-list-column-defination';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { ToasterService } from 'src/app/shared/core.index';

@Component({
  selector: 'app-pharmacy-medicine-view',
  templateUrl: './pharmacy-medicine-view.component.html',
  styleUrls: ['./pharmacy-medicine-view.component.scss']
})
export class PharmacyMedicineViewComponent {

  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  pharmacyMedicine !: PharmacyMedicineList;
  purchasedMadicines: Array<PurchaseMedicineStock> = [];
  badStockMadicines: Array<BadStockMedicine> = [];
  public pagination: boolean = true;
  public paginationPageSize = 20;
  public paginationPageSizeSelector = [10, 15, 20, 100];
  colDefs: ColDef[] = getColumnDefinations(this.datePipe);
  badStockColDefs: ColDef[] = getBacStockGridColumnDefinations(this.datePipe);

  constructor(private datePipe: DatePipe, public activeModal: NgbActiveModal, private data: PharmacyService, private modalService: NgbModal, 
    private toaster: ToasterService) { }

  ngOnInit() {
    this.pharmacyMedicine = this.data.getPharmacyMedicineById(this.id)!;
    this.getMedicineStock();
    this.getMedicineBadStock();
  }

  getMedicineStock() {
    this.purchasedMadicines = this.data.getMedicineStocks(this.pharmacyMedicine.id);
  }

  getMedicineBadStock() {
    this.badStockMadicines = this.data.getBadStockMedicines(this.pharmacyMedicine.id);
  }

  viewImage() {
    const modalRef = this.modalService.open(ImageViewerModalContent, { backdrop: 'static', size: 'xl', scrollable: true });
    modalRef.componentInstance.data = this.pharmacyMedicine.image;
    modalRef.componentInstance.name = this.pharmacyMedicine.imageName;
  }

  downloadMedicineImage() {
    const downloadLink = document.createElement('a');
    const fileName = this.pharmacyMedicine.imageName;
    downloadLink.href = this.pharmacyMedicine.image;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  public edit(id: number) {
    this.openModal_Edit(id);
  }

  public delete(id: number) {
    this.openModal_DeleteConfirmation(id);
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(PurchaseMedicineFormComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.getMedicineStock();
      this.onSave.next(true);
      modalRef.close();
    });
  }

  private openModal_DeleteConfirmation(id: number) {
    const modalRef = this.modalService.open(ConfirmationModalContent);
    modalRef.componentInstance.confirmationBoxTitle = 'Confirmation?';
    modalRef.componentInstance.confirmationMessage = 'Are you sure you want to delete this ?';

    modalRef.result.then((userResponse) => {
      if (userResponse) {
        this.data.deleteBadStockMedicine(id);
        this.onSave.next(true);
        this.toaster.typeSuccess('Bad stock has been deleted successfully!', 'Success!');
        this.getMedicineBadStock();
      }
    });
  }
}
