import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { routes, ToasterService } from 'src/app/shared/core.index';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { getColumnDefinations } from './opd-charge-list-column-defination';
import { OpdDataService } from '../../../shared/services/opd.service';
import { PatientCharge } from '../../../shared/models/patient-charge';
import { OpdChargeFormComponent } from '../form/opd-charge-form.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-charge-opd-list',
  templateUrl: './opd-charge-list.component.html',
  styleUrls: ['./opd-charge-list.component.scss']
})
export class OPDChargeListComponent {
  public patientChargeList: Array<PatientCharge> = [];
  public pagination: boolean = true;
  public paginationPageSize = 10;
  public paginationPageSizeSelector = [10, 15, 20, 100];
  public routes = routes;
  private opdPatientId : number = 0;

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = getColumnDefinations(this.datePipe);

  constructor(private route: ActivatedRoute, private datePipe: DatePipe, private modalService: NgbModal, private data: OpdDataService, private toaster: ToasterService) { 
    this.opdPatientId = this.route.snapshot.params['id']!;
  }

  ngOnInit() {
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
    const modalRef = this.modalService.open(OpdChargeFormComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.isEdit = false; 
    modalRef.componentInstance.opdPatientId = this.opdPatientId; 
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(OpdChargeFormComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.opdPatientId = this.opdPatientId; 
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
        this.data.deleteCharge(id);
        this.toaster.typeSuccess('Charge details has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }
  
  private getList(): void {
    this.patientChargeList = this.data.getChargeList(this.opdPatientId) .sort((a, b) => b.id - a.id);
  }
}
