import { Component } from '@angular/core';
import { routes, ToasterService } from 'src/app/shared/core.index';
import { ColDef } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { PurchaseMedicineList } from '../../shared/models/pharmacy';
import { PharmacyService } from '../../shared/services/pharmacy.service';
import { getColumnDefinations } from './purchase-medicine-list-column-defination';
import { PurchaseMedicineFormComponent } from '../form/purchase-medicine-form.component';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { PurchaseMedicineViewComponent } from '../view/purchase-medicine-view.component';

@Component({
  selector: 'app-purchase-medicine-list',
  templateUrl: './purchase-medicine-list.component.html',
  styleUrls: ['./purchase-medicine-list.component.scss']
})
export class PurchaseMedicineListComponent {
  public routes = routes;
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = getColumnDefinations(this.datePipe);
  public purchaseMedicineList: Array<PurchaseMedicineList> = [];
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

  private openModal_View(id: number) {
    const modalRef = this.modalService.open(PurchaseMedicineViewComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.id = id;
  }

  private openModal_Add() {
    const modalRef = this.modalService.open(PurchaseMedicineFormComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.isEdit = false;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(PurchaseMedicineFormComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
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
        this.data.deletePurchaseMedicine(id);
        this.toaster.typeSuccess('Purchase medicine details has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }

  private getList(): void {
    this.purchaseMedicineList = this.data.getPurchaseMedicineList().sort((a, b) => b.id - a.id);
  }
}
