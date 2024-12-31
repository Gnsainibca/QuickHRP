import { Component } from '@angular/core';
import { routes, ToasterService } from 'src/app/shared/core.index';
import { ColDef } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { DatePipe } from '@angular/common';
import { getColumnDefinations } from './pharmacy-medicine-list-column-defination';
import { PharmacyMedicineList } from '../../shared/models/pharmacy';
import { PharmacyService } from '../../shared/services/pharmacy.service';
import { PharmacyMedicineViewComponent } from '../view/pharmacy-medicine-view.component';
import { PharmacyMedicineFormComponent } from '../form/pharmacy-medicine-form.component';
import { BadStockFormComponent } from '../bad-stock/bad-stock-form.component';

@Component({
  selector: 'app-pharmacy-medicine-list',
  templateUrl: './pharmacy-medicine-list.component.html',
  styleUrls: ['./pharmacy-medicine-list.component.scss']
})
export class PharmacyMedicineListComponent {
  public routes = routes;
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = getColumnDefinations(this.datePipe);
  public pathologyTestList: Array<PharmacyMedicineList> = [];
  public pagination: boolean = true;
  public paginationPageSize = 20;
  public paginationPageSizeSelector = [10, 15, 20, 100];

  constructor(private datePipe: DatePipe, private modalService: NgbModal, private data: PharmacyService, private toaster: ToasterService) { }

  ngOnInit() {
    this.refereshGrid();
  }

  public refereshGrid() {
    this.getList();
  }

  public view(id: number) {
    this.openModal_View(id);
  }

  public add() {
    this.openModal_Add();
  }

  public edit(id: number) {
    this.openModal_Edit(id);
  }

  public delete(id: number) {
    this.openModal_DeleteConfirmation(id);
  }

  public addBadStock(id: number) {
    this.openModal_AddBadStock(id);
  }

  private openModal_View(id: number) {
    const modalRef = this.modalService.open(PharmacyMedicineViewComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
    });
  }

  private openModal_Add() {
    const modalRef = this.modalService.open(PharmacyMedicineFormComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.isEdit = false;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(PharmacyMedicineFormComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_DeleteConfirmation(id: number) {
    const modalRef = this.modalService.open(ConfirmationModalContent);
    modalRef.componentInstance.confirmationBoxTitle = 'Confirmation?';
    modalRef.componentInstance.confirmationMessage = 'Are you sure you want to delete this ?';

    modalRef.result.then((userResponse) => {
      if (userResponse) {
        this.data.deletePharmacyMedicine(id);
        this.toaster.typeSuccess('Pharmacy test has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }

  private openModal_AddBadStock(medicineId:number) {
    const modalRef = this.modalService.open(BadStockFormComponent, { windowClass: 'right', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.medicineId = medicineId;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private getList(): void {
    this.pathologyTestList = [];
    this.pathologyTestList = this.data.getPharmacyMedicineList().sort((a, b) => b.id - a.id);
  }
}
