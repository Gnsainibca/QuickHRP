import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { Master_PathologyParameter } from '../../shared/models/master-pathology-parameter';
import { SetupPathologyParameterFormComponent } from '../form/setup-pathology-parameter-form.component';
import { getColumnDefinations } from './setup-pathology-parameter-list-column-defination';
import { PathologySetupService } from '../../shared/services/pathology-setup.service';

@Component({
  selector: 'app-setup-pathology-parameter-list',
  templateUrl: './setup-pathology-parameter-list.component.html',
  styleUrls: ['./setup-pathology-parameter-list.component.scss']
})
export class SetupPathologyParameterListComponent {
  public pathologyParameters: Array<Master_PathologyParameter> = [];
  public pagination: boolean = true;
  public paginationPageSize = 20;
  public paginationPageSizeSelector = [10, 15, 20, 100];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = getColumnDefinations();

  constructor(private modalService: NgbModal, private toaster: ToasterService, private service : PathologySetupService) { 
   
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
    const modalRef = this.modalService.open(SetupPathologyParameterFormComponent, { backdrop: 'static', size: 'md', scrollable: true  });
    modalRef.componentInstance.isEdit = false; 
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(SetupPathologyParameterFormComponent, { backdrop: 'static', size: 'md', scrollable: true  });
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
        this.service.deletePathologyParameter(id);
        this.toaster.typeSuccess('Pathology parameter has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }
  
  private getList(): void {
    this.pathologyParameters = this.service.getPathologyParameterList().sort((a, b) => b.id - a.id) as Array<Master_PathologyParameter>;
  }
}
