import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ToasterService } from 'src/app/shared/core.index';
import { getColumnDefinations } from './call-log-list-column-defination';
import { FrontOfficeDataService } from '../../shared/services/front-office.service';
import { CallLog } from '../../shared/models/call-log';
import { CallLogFormComponent } from '../form/call-log-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CallLogViewComponent } from '../view/call-log-view.component';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-call-log-list',
  templateUrl: './call-log-list.component.html',
  styleUrls: ['./call-log-list.component.scss']
})
export class CallLogListComponent {
  public callLogs: Array<CallLog> = [];
  public pagination: boolean = true;
  public paginationPageSize = 10;
  public paginationPageSizeSelector = [10, 15, 20, 100];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = getColumnDefinations(this.datePipe);

  constructor(private datePipe: DatePipe, private modalService: NgbModal, private data: FrontOfficeDataService, private toaster: ToasterService) { }

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
    const modalRef = this.modalService.open(CallLogViewComponent, { backdrop: 'static', size: 'lg', scrollable: true });
    modalRef.componentInstance.callLogId = id;
  }

  private openModal_Add() {
    const modalRef = this.modalService.open(CallLogFormComponent, { windowClass: 'right', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.isEdit = false;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(CallLogFormComponent, { windowClass: 'right', backdrop: 'static', scrollable: true });
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
        this.data.deleteCallLog(id);
        this.toaster.typeSuccess('Phone Call Log has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }

  private getList(): void {
    this.callLogs = this.data.getCallLogs().sort((a, b) => b.id - a.id);
  }
}
