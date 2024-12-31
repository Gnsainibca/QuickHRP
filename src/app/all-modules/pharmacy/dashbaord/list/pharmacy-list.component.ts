import { Component } from '@angular/core';
import { routes, ToasterService } from 'src/app/shared/core.index';
import { ColDef } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { DatePipe } from '@angular/common';
import { PharmacyFormComponent } from '../form/pharmacy-form.component';
import { PharmacyViewComponent } from '../view/pharmacy-view.component';
import { Pharmacy, PharmacyList } from '../../shared/models/pharmacy';
import { getColumnDefinations } from './pharmacy-list-column-defination';
import { PharmacyService } from '../../shared/services/pharmacy.service';
import { ActivatedRoute } from '@angular/router';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';

@Component({
  selector: 'app-pharmacy-list',
  templateUrl: './pharmacy-list.component.html',
  styleUrls: ['./pharmacy-list.component.scss']
})
export class PharmacyListComponent {
  public routes = routes;
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = getColumnDefinations(this.datePipe);
  public pharmacyList: Array<Pharmacy> = [];
  public pagination: boolean = true;
  public paginationPageSize = 20;
  public paginationPageSizeSelector = [10, 15, 20, 100];
  isBillingModule : boolean = false;

  constructor(private datePipe: DatePipe,private route: ActivatedRoute,
     private modalService: NgbModal, private data: PharmacyService, 
     private toaster: ToasterService) { }

  ngOnInit() {
    this.isBillingModule = this.route.snapshot.params['module']! === APP_CONSTANT.billingModule;
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
    const modalRef = this.modalService.open(PharmacyViewComponent, { backdrop: 'static', size: 'xl', scrollable: true });
    modalRef.componentInstance.id = id;
  }

  private openModal_Add() {
    const modalRef = this.modalService.open(PharmacyFormComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.isEdit = false;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(PharmacyFormComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
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
        this.data.deletePharmacy(id);
        this.toaster.typeSuccess('Test details has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }

  private getList(): void {
    this.pharmacyList = this.data.getPharmacyList().sort((a, b) => b.id - a.id);
  }
}
