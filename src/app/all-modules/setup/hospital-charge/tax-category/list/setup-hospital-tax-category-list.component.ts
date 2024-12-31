import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { HospitalChargeSetupService } from '../../shared/services/hospital-charge-setup.service';
import { getColumnDefinations } from './setup-hospital-tax-category-list-column-defination';
import { SetupHospitalTaxCategoryFormComponent } from '../form/setup-hospital-tax-category-form.component';
import { Master_HospitalChargeTaxCategory } from '../../shared/models/master_hospital-charge-tax-category';

@Component({
  selector: 'app-setup-hospital-tax-category-list',
  templateUrl: './setup-hospital-tax-category-list.component.html',
  styleUrls: ['./setup-hospital-tax-category-list.component.scss']
})
export class SetupHospitalTaxCategoryListComponent {
  public taxCategories: Array<Master_HospitalChargeTaxCategory> = [];
  public pagination: boolean = true;
  public paginationPageSize = 20;
  public paginationPageSizeSelector = [10, 15, 20, 100];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = getColumnDefinations();

  constructor(private modalService: NgbModal, private toaster: ToasterService, private service : HospitalChargeSetupService) { 
   
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
    const modalRef = this.modalService.open(SetupHospitalTaxCategoryFormComponent, { backdrop: 'static', size: 'lg', scrollable: true  });
    modalRef.componentInstance.isEdit = false; 
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(SetupHospitalTaxCategoryFormComponent, { backdrop: 'static', size: 'lg', scrollable: true  });
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
        this.service.deleteTaxCategory(id);
        this.toaster.typeSuccess('Tax category has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }
  
  private getList(): void {
    this.taxCategories = this.service.getTaxCategories().sort((a, b) => b.id - a.id) as Array<Master_HospitalChargeTaxCategory>;
  }
}
