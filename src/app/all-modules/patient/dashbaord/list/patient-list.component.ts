import { Component } from '@angular/core';
import { routes } from 'src/app/shared/core.index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientService } from '../../shared/services/patient-data.service';
import { PatientViewComponent } from '../view/patient-view.component';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { CommonService } from 'src/app/shared/data/common.service';
import { PatientList } from 'src/app/shared/models/patient';
import { PatientFormComponent } from 'src/app/shared/components/patient-form/patient-form.component';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent {
  public routes = routes;
  public patientList: Array<PatientList> = [];
  public filteredPatientList: Array<PatientList> = [];
  public pagination: boolean = true;
  public paginationPageSize = 20;
  public paginationPageSizeSelector = [10, 15, 20, 100];
  roleList : Array<SimpleRecord> = [];
  searchText?: string;

  constructor(private modalService: NgbModal, private data: PatientService,
     commonService : CommonService) {
    this.roleList = commonService.getRoles();
   }

  ngOnInit() {
    this.refereshGrid();
  }

  public refereshGrid() {
    this.getList();
  }

  public search() {
      let textToSearch = this.searchText?.toLowerCase()!;
      if (textToSearch) {
      this.filteredPatientList = this.patientList.filter(x => 
        x.name?.toLowerCase().includes(textToSearch)
      || x.id?.toString().includes(textToSearch)
      || x.phone.includes(textToSearch)
    );
    } else {
      this.filteredPatientList = this.patientList;
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
    const modalRef = this.modalService.open(PatientViewComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.onDelete.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Add() {
    const modalRef = this.modalService.open(PatientFormComponent, { backdrop: 'static', size: 'xl', scrollable: true });
    modalRef.componentInstance.isEdit = false;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(PatientFormComponent, { backdrop: 'static', size: 'xl', scrollable: true });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private getList(): void {
    this.patientList = this.data.getPatientList().sort((a, b) => b.id - a.id);
    this.filteredPatientList = this.patientList;
  }
}
