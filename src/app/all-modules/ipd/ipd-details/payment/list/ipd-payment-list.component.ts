import { Component, Input } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { routes, ToasterService } from 'src/app/shared/core.index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Payment } from 'src/app/all-modules/opd/shared/models/payment';
import { getColumnDefinations } from './ipd-payment-list-column-defination';
import { OpdDataService } from 'src/app/all-modules/opd/shared/services/opd.service';
import { IPDPaymentFormComponent } from '../form/ipd-payment-form.component';

@Component({
  selector: 'app-ipd-payment-list',
  templateUrl: './ipd-payment-list.component.html',
  styleUrls: ['./ipd-payment-list.component.scss']
})
export class IPDPaymentListComponent {
  public payments: Array<Payment> = [];
  public pagination: boolean = true;
  public paginationPageSize = 10;
  public paginationPageSizeSelector = [10, 15, 20, 100];
  private opdPatientId : number = 0;
  public routes = routes;
  @Input() hasPatientDischarged: boolean = false;

  // Column Definitions: Defines the columns to be displayed.
  colDefs !: ColDef[];

  constructor(private datePipe: DatePipe, private route: ActivatedRoute, private modalService: NgbModal, private data: OpdDataService,
     private toaster: ToasterService) { 
    this.opdPatientId = this.route.snapshot.params['id']!;
  }

  ngOnInit() {
    this.colDefs = getColumnDefinations(this.datePipe, this.hasPatientDischarged);
    this.refereshGrid();
  }

  public refereshGrid() {
    this.getList();
  }

  public add(){
    this.openModal_Add();
  }

  public edit(id:number){
    this.openModal_Edit(id);
  }

  public delete(id:number){
    this.openModal_DeleteConfirmation(id);
  }

  private openModal_Add() {
    const modalRef = this.modalService.open(IPDPaymentFormComponent, { windowClass: 'right', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.isEdit = false; 
    modalRef.componentInstance.opdPatientId = this.opdPatientId;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(IPDPaymentFormComponent, { windowClass: 'right', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.opdPatientId = this.opdPatientId;
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
        this.data.deletePayment(id);
        this.toaster.typeSuccess('Payment details has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }
  
  private getList(): void {
    this.payments = this.data.getPaymentList(this.opdPatientId).sort((a, b) => b.id - a.id);
  }
}