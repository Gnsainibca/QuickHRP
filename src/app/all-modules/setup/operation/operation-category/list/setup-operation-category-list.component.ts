import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { getColumnDefinations } from './setup-operation-category-list-column-defination';
import { OperationSetupService } from '../../shared/services/operation-setup.service';
import { Master_OperationCategory } from '../../shared/models/master_operation-category';
import { SetupOperationCategoryFormComponent } from '../form/setup-operation-category-form.component';

@Component({
  selector: 'app-setup-operation-category-list',
  templateUrl: './setup-operation-category-list.component.html',
  styleUrls: ['./setup-operation-category-list.component.scss']
})
export class SetupOperationCategoryListComponent {
  public operationCategoryList: Array<Master_OperationCategory> = [];
  public pagination: boolean = true;
  public paginationPageSize = 20;
  public paginationPageSizeSelector = [10, 15, 20, 100];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = getColumnDefinations();

  constructor(private modalService: NgbModal, private toaster: ToasterService, private service : OperationSetupService) { 
   
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
    const modalRef = this.modalService.open(SetupOperationCategoryFormComponent, { backdrop: 'static', size: 'md', scrollable: true  });
    modalRef.componentInstance.isEdit = false; 
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(SetupOperationCategoryFormComponent, { backdrop: 'static', size: 'md', scrollable: true  });
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
        this.service.deleteOperationCategory(id);
        this.toaster.typeSuccess('Operation category has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }
  
  private getList(): void {
    this.operationCategoryList = this.service.getOperationCategoryList().sort((a, b) => b.id - a.id) as Array<Master_OperationCategory>;
  }
}
