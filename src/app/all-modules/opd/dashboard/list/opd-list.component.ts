import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ToasterService } from 'src/app/shared/core.index';
import { OpdPatient } from '../../shared/models/opd-patient';
import { OpdDataService } from '../../shared/services/opd.service';
import { getColumnDefinations } from './opd-list-column-defination';
import { OpdFormComponent } from '../form/opd-form.component';
import { OpdViewComponent } from '../view/opd-view.component';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';

@Component({
  selector: 'app-opd-list',
  templateUrl: './opd-list.component.html',
  styleUrls: ['./opd-list.component.scss']
})
export class OPDListComponent {
  public opdPatientList: Array<OpdPatient> = [];
  public pagination: boolean = true;
  public paginationPageSize = 10;
  public paginationPageSizeSelector = [10, 15, 20, 100];
  isBillingModule : boolean = false;

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = getColumnDefinations(this.datePipe);

  constructor(private datePipe: DatePipe, private modalService: NgbModal, private data: OpdDataService, private toaster: ToasterService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isBillingModule = this.route.snapshot.params['module']! === APP_CONSTANT.billingModule;
    this.refereshGrid();
  }

  public refereshGrid() {
    this.getList();
  }

  public view(id:number){
    this.openModal_View(id);
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

  private openModal_View(id: number) {
    const modalRef = this.modalService.open(OpdViewComponent, { backdrop: 'static', size: 'xl', scrollable: true });
    modalRef.componentInstance.patientVisitId = id;
  }

  private openModal_Add() {
    const modalRef = this.modalService.open(OpdFormComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.isEdit = false; 
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(OpdFormComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.patientVisitId = id;
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
        this.data.deleteOpdPatient(id);
        this.toaster.typeSuccess('Opd patient details has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }
  
  private getList(): void {
    this.opdPatientList = this.data.getOpdPatientList(0).sort((a, b) => b.id - a.id);
  }
}
