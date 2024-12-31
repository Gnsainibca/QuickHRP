import { Component } from '@angular/core';
import { routes, ToasterService } from 'src/app/shared/core.index';
import { ColDef } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { DatePipe } from '@angular/common';
import { Pathology, PathologyTest, PathologyTestList } from '../../shared/models/pathology';
import { PathologyDataService } from '../../shared/services/pathology-data.service';
import { getColumnDefinations } from './pathology-test-list-column-defination';
import { PathologyTestFormComponent } from '../form/pathology-test-form.component';
import { PathologyTestViewComponent } from '../view/pathology-test-view.component';

@Component({
  selector: 'app-pathology-test-list',
  templateUrl: './pathology-test-list.component.html',
  styleUrls: ['./pathology-test-list.component.scss']
})
export class PathologyTestListComponent {
  public routes = routes;
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = getColumnDefinations(this.datePipe);
  public pathologyTestList: Array<PathologyTestList> = [];
  public pagination: boolean = true;
  public paginationPageSize = 20;
  public paginationPageSizeSelector = [10, 15, 20, 100];

  constructor(private datePipe: DatePipe, private modalService: NgbModal, private data: PathologyDataService, private toaster: ToasterService) { }

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
    const modalRef = this.modalService.open(PathologyTestViewComponent, { backdrop: 'static', size: 'xl', scrollable: true });
    modalRef.componentInstance.id = id;
  }

  private openModal_Add() {
    const modalRef = this.modalService.open(PathologyTestFormComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.isEdit = false;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(PathologyTestFormComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
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
        this.data.deletePathologyTest(id);
        this.toaster.typeSuccess('Pathology test has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }

  private getList(): void {
    this.pathologyTestList = this.data.getPathologyTestList().sort((a, b) => b.id - a.id);
  }
}
