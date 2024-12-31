import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DataService, routes, ToasterService } from 'src/app/shared/core.index';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getColumnDefinations } from './visit-list-column-defination';
import { OpdDataService } from '../../../shared/services/opd.service';
import { OpdViewComponent } from '../../../dashboard/view/opd-view.component';
import { OpdFormComponent } from '../../../dashboard/form/opd-form.component';
import { PatientVisit } from '../../../shared/models/patient-visit';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/shared/data/common.service';

@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.scss']
})
export class VisitListComponent {
  public opdPatientList: Array<PatientVisit> = [];
  public pagination: boolean = true;
  public paginationPageSize = 10;
  public paginationPageSizeSelector = [10, 15, 20, 100];
  private opdPatientId : number = 0;
  public routes = routes;

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = getColumnDefinations(this.datePipe);

  constructor(private datePipe: DatePipe, private route: ActivatedRoute, private modalService: NgbModal, private dataService: DataService, 
    private data: OpdDataService, private toaster: ToasterService, private commonService : CommonService) { }

  ngOnInit() {
    this.opdPatientId = this.route.snapshot.params['id']!;
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
    modalRef.componentInstance.isVisitOperation = true; 
    modalRef.componentInstance.opdPatientId = this.opdPatientId;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(OpdFormComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.patientVisitId = id;
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.isVisitOperation = true; 
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
        this.data.deletePatientVisit(id);
        this.toaster.typeSuccess('Opd patient details has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }
  
  private getList(): void {
    this.opdPatientList = this.data.getPatientVisits().filter(x => x.opdPatientId == this.opdPatientId);
    this.opdPatientList.forEach(x => {
      x.consultantDoctor = this.commonService.getDoctorById(x.consultantDoctorId)?.fullName!
    });
  }
}
