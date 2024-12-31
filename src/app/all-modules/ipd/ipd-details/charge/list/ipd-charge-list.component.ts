import { Component, Input } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { routes, ToasterService } from 'src/app/shared/core.index';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OpdDataService } from 'src/app/all-modules/opd/shared/services/opd.service';
import { PatientCharge } from 'src/app/all-modules/opd/shared/models/patient-charge';
import { getColumnDefinations } from './ipd-charge-list-column-defination';
import { IPDChargeFormComponent } from '../form/ipd-charge-form.component';

@Component({
  selector: 'app-charge-ipd-list',
  templateUrl: './ipd-charge-list.component.html',
  styleUrls: ['./ipd-charge-list.component.scss']
})
export class IPDChargeListComponent {
  public patientChargeList: Array<PatientCharge> = [];
  public pagination: boolean = true;
  public paginationPageSize = 10;
  public paginationPageSizeSelector = [10, 15, 20, 100];
  public routes = routes;
  private ipdPatientId: number = 0;
  @Input() hasPatientDischarged: boolean = false;

  // Column Definitions: Defines the columns to be displayed.
  colDefs !: ColDef[];

  constructor(private route: ActivatedRoute, private datePipe: DatePipe, private modalService: NgbModal, private data: OpdDataService, private toaster: ToasterService) {
    this.ipdPatientId = this.route.snapshot.params['id']!;
  }

  ngOnInit() {
    this.colDefs = getColumnDefinations(this.datePipe, this.hasPatientDischarged);
    this.refereshGrid();
  }

  public refereshGrid() {
    this.getList();
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

  private openModal_Add() {
    const modalRef = this.modalService.open(IPDChargeFormComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.isEdit = false;
    modalRef.componentInstance.ipdPatientId = this.ipdPatientId;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(IPDChargeFormComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.ipdPatientId = this.ipdPatientId;
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
    this.patientChargeList = this.data.getChargeList(this.ipdPatientId).sort((a, b) => b.id - a.id);
  }
}
