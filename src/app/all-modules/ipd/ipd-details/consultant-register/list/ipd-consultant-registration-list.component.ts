import { Component, Input } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { routes, ToasterService } from 'src/app/shared/core.index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { IpdDataService } from '../../../shared/servives/Ipd.service';
import { ConsultantRegistration } from '../../../shared/models/consultant-register';
import { IPDConsultantRegistrationFormComponent } from '../form/ipd-consultant-registration-form.component';
import { getColumnDefinations } from './ipd-consultant-registration-list-column-defination';

@Component({
  selector: 'app-ipd-consultant-registration',
  templateUrl: './ipd-consultant-registration-list.component.html',
  styleUrls: ['./ipd-consultant-registration-list.component.scss']
})
export class IPDConsultantRegistrationListComponent {
  public consultants: Array<ConsultantRegistration> = [];
  public pagination: boolean = true;
  public paginationPageSize = 10;
  public paginationPageSizeSelector = [10, 15, 20, 100];
  private ipdPatientId : number = 0;
  public routes = routes;
  @Input() hasPatientDischarged: boolean = false;

  // Column Definitions: Defines the columns to be displayed.
  colDefs !: ColDef[];

  constructor(private datePipe: DatePipe, private route: ActivatedRoute, private modalService: NgbModal, private data: IpdDataService,
     private toaster: ToasterService) { 
    this.ipdPatientId = this.route.snapshot.params['id']!;
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
    const modalRef = this.modalService.open(IPDConsultantRegistrationFormComponent, { windowClass: 'right', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.isEdit = false; 
    modalRef.componentInstance.ipdPatientId = this.ipdPatientId;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(IPDConsultantRegistrationFormComponent, { windowClass: 'right', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.ipdPatientId = this.ipdPatientId;
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
        this.data.deleteConsultantRegistration(id);
        this.toaster.typeSuccess('Consultant has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }
  
  private getList(): void {
    this.consultants = this.data.getConsultantRegistrationList(this.ipdPatientId).sort((a, b) => b.id - a.id);
  }
}