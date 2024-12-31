import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { routes, ToasterService } from 'src/app/shared/core.index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { OpdDataService } from '../../../shared/services/opd.service';
import { OperationViewComponent } from '../view/operation-view.component';
import { OperationFormComponent } from '../form/operation-form.component';
import { OperationList } from '../../../shared/models/operation';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { getColumnDefinations } from './operation-list-column-defination';

@Component({
  selector: 'app-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.scss']
})
export class OperationListComponent {
  public operations: Array<OperationList> = [];
  public pagination: boolean = true;
  public paginationPageSize = 10;
  public paginationPageSizeSelector = [10, 15, 20, 100];
  private opdPatientId : number = 0;
  public routes = routes;

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = getColumnDefinations(this.datePipe);

  constructor(private datePipe: DatePipe, private route: ActivatedRoute, private modalService: NgbModal, private data: OpdDataService, private toaster: ToasterService) { 
    this.opdPatientId = this.route.snapshot.params['id']!;
  }

  ngOnInit() {
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
    const modalRef = this.modalService.open(OperationViewComponent, { backdrop: 'static', size: 'lg', scrollable: true });
    modalRef.componentInstance.operationId = id;
    modalRef.componentInstance.opdPatientId = this.opdPatientId;
  }

  private openModal_Add() {
    const modalRef = this.modalService.open(OperationFormComponent, { windowClass: 'right', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.isEdit = false; 
    modalRef.componentInstance.opdPatientId = this.opdPatientId;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(OperationFormComponent, { windowClass: 'right', backdrop: 'static', scrollable: true });
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
        this.data.deleteOperation(id);
        this.toaster.typeSuccess('Operation details has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }
  
  private getList(): void {
    this.operations = this.data.getOperationList(this.opdPatientId) .sort((a, b) => b.id - a.id);
  }
}
