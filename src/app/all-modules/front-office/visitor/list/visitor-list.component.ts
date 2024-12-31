import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ToasterService } from 'src/app/shared/core.index';
import { FrontOfficeDataService } from '../../shared/services/front-office.service';
import { VisitorList } from '../../shared/models/visitor';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { VisitorFormComponent } from '../form/visitor-form.component';
import { VisitorViewComponent } from '../view/visitor-view.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { getColumnDefinations } from './visitor-list-column-defination';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.scss']
})
export class VisitorListComponent {
  public visitors: Array<VisitorList> = [];
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
    const modalRef = this.modalService.open(VisitorViewComponent, { backdrop: 'static', size: 'lg', scrollable: true });
    modalRef.componentInstance.visitorId = id;
  }

  private openModal_Add() {
    const modalRef = this.modalService.open(VisitorFormComponent, { windowClass: 'right', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.isEdit = false;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(VisitorFormComponent, { windowClass: 'right', backdrop: 'static', scrollable: true });
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
        this.data.deleteVisitor(id);
        this.toaster.typeSuccess('Visitor has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }

  private getList(): void {
    this.visitors = this.data.getVisitorList().sort((a, b) => b.id - a.id);
  }
}