import { Component, Input } from '@angular/core';
import { routes, ToasterService } from 'src/app/shared/core.index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { IPDPrescriptionFormComponent } from '../form/ipd-prescription-form.component';
import { ActivatedRoute } from '@angular/router';
import { IpdPrescriptionList } from '../../../shared/models/ipd-prescription';
import { IpdDataService } from '../../../shared/servives/Ipd.service';
import { getColumnDefinations } from './ipd-prescription-list-column-defination';
import { ColDef } from 'ag-grid-community';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { IpdPrescriptionViewComponent } from '../view/ipd-prescription-view.component';

@Component({
  selector: 'app-ipd-prescription-list',
  templateUrl: './ipd-prescription-list.component.html',
  styleUrls: ['./ipd-prescription-list.component.scss']
})
export class IPDPrescriptionListComponent {
  public prescriptionList: Array<IpdPrescriptionList> = [];
  public pagination: boolean = true;
  public paginationPageSize = 10;
  public paginationPageSizeSelector = [10, 15, 20, 100];
  private ipdPatientId: number = 0;
  public routes = routes;
  @Input() hasPatientDischarged: boolean = false;

  // Column Definitions: Defines the columns to be displayed.
  colDefs !: ColDef[];

  constructor(private datePipe: DatePipe, private route: ActivatedRoute, private modalService: NgbModal,
    private toaster: ToasterService, private ipdDataService: IpdDataService) {
    this.ipdPatientId = this.route.snapshot.params['id']!;
  }

  ngOnInit() {
    this.colDefs = getColumnDefinations(this.datePipe, this.hasPatientDischarged);
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
    const modalRef = this.modalService.open(IpdPrescriptionViewComponent, { backdrop: 'static', size: 'xl', scrollable: true });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.ipdPatientId = this.ipdPatientId;
    modalRef.componentInstance.onEdit.subscribe((res: any) => {
      modalRef.close();
      this.openModal_Edit(id);
    });
  }

  private openModal_Add() {
    const modalRef = this.modalService.open(IPDPrescriptionFormComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.isEdit = false;
    modalRef.componentInstance.ipdPatientId = this.ipdPatientId;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(IPDPrescriptionFormComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
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
        this.ipdDataService.deletePrescription(id);
        this.toaster.typeSuccess('Prescription details has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }

  private getList(): void {
    this.prescriptionList = this.ipdDataService.getPrescriptionList(this.ipdPatientId).sort((a, b) => b.id - a.id);
  }
}
