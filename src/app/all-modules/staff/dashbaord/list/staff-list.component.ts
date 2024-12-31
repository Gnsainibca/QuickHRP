import { Component } from '@angular/core';
import { routes } from 'src/app/shared/core.index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StaffDetail } from '../../shared/models/staff';
import { StaffService } from '../../shared/services/staff-data.service';
import { StaffFormComponent } from '../form/staff-form.component';
import { StaffViewComponent } from '../view/staff-view.component';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { CommonService } from 'src/app/shared/data/common.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent {
  public routes = routes;
  public staffList: Array<StaffDetail> = [];
  public filteredStaffList: Array<StaffDetail> = [];
  public pagination: boolean = true;
  public paginationPageSize = 20;
  public paginationPageSizeSelector = [10, 15, 20, 100];
  roleList : Array<SimpleRecord> = [];
  searchText?: string;

  constructor(private modalService: NgbModal, private data: StaffService,
     commonService : CommonService) {
    this.roleList = commonService.getRoles();
   }

  ngOnInit() {
    this.refereshGrid();
  }

  public refereshGrid() {
    this.getList();
  }

  public onRoleChange(event : any){
    let selectedItem = event.target.value;
    if(selectedItem) {
        this.filteredStaffList = this.staffList.filter(x=>x.role == selectedItem);
    } else {
      this.filteredStaffList = this.staffList;
    }
  }

  public search() {
      let textToSearch = this.searchText?.toLowerCase();
      if (textToSearch) {
      this.filteredStaffList = this.staffList.filter(x => 
        x.firstName?.toLowerCase().includes(textToSearch!)
      || x.lastName?.toLowerCase().includes(textToSearch!)
      || x.staffId?.toLowerCase().includes(textToSearch!)
    );
    } else {
      this.filteredStaffList = this.staffList;
    }
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

  private openModal_View(id: number) {
    const modalRef = this.modalService.open(StaffViewComponent, { windowClass: 'right', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.onDelete.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Add() {
    const modalRef = this.modalService.open(StaffFormComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.isEdit = false;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(StaffFormComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private getList(): void {
    this.staffList = this.data.getStaffList().sort((a, b) => b.id - a.id);
    this.filteredStaffList = this.staffList;
  }
}
