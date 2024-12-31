import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientService } from '../../shared/services/patient-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { ToasterService } from 'src/app/shared/core.index';
import { PatientList } from 'src/app/shared/models/patient';
import { PatientFormComponent } from 'src/app/shared/components/patient-form/patient-form.component';
import { IpdPatientList } from 'src/app/all-modules/ipd/shared/models/ipd-patient-list';
import { ColDef } from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { IpdDataService } from 'src/app/all-modules/ipd/shared/servives/Ipd.service';
import { OpdPatient } from 'src/app/all-modules/opd/shared/models/opd-patient';
import { OpdDataService } from 'src/app/all-modules/opd/shared/services/opd.service';
import { getIpdPatientColumnDefinations } from './column-defination-ipd-list';
import { getOpdPatientColumnDefinations } from './column-defination-opd-list';
import { getPharmacyColumnDefinations } from './column-defination-pharmacy-list';
import { Pharmacy } from 'src/app/all-modules/pharmacy/shared/models/pharmacy';
import { PharmacyService } from 'src/app/all-modules/pharmacy/shared/services/pharmacy.service';
import { PathologyList } from 'src/app/all-modules/pathology/shared/models/pathology';
import { RadiologyList } from 'src/app/all-modules/radiology/shared/models/radiology';
import { getPathologyColumnDefinations } from './column-defination-pathology-list';
import { getRadiologyColumnDefinations } from './column-defination-radiology-list';
import { PathologyDataService } from 'src/app/all-modules/pathology/shared/services/pathology-data.service';
import { RadiologyDataService } from 'src/app/all-modules/radiology/shared/services/radiology-data.service';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss'],
})
export class PatientViewComponent {
  patient !: PatientList;
  @Output() onDelete = new EventEmitter<boolean>();
  @Input() id: number = 0;
  public pagination: boolean = true;
  public paginationPageSize = 10;
  public paginationPageSizeSelector = [10, 15, 20, 100];
  public opdList: Array<OpdPatient> = [];
  public ipdList: Array<IpdPatientList> = [];
  public pharmacyList: Array<Pharmacy> = [];
  public pathologyList: Array<PathologyList> = [];
  public radiologyList: Array<RadiologyList> = [];

  colDefs_ipd : ColDef[] = getIpdPatientColumnDefinations(this.datePipe);
  colDefs_opd : ColDef[] = getOpdPatientColumnDefinations(this.datePipe);
  colDefs_pharmacy : ColDef[] = getPharmacyColumnDefinations(this.datePipe);
  colDefs_pathology : ColDef[] = getPathologyColumnDefinations(this.datePipe);
  colDefs_radiology : ColDef[] = getRadiologyColumnDefinations(this.datePipe);
  dropdownSettings = {};

  constructor(private datePipe: DatePipe, public activeModal: NgbActiveModal, private patientService: PatientService, 
    private modalService: NgbModal, private toaster: ToasterService, private ipdDataService: IpdDataService,
    private opdDataService: OpdDataService, private pharmacyService: PharmacyService, private pathologyDataService: PathologyDataService,
    private radiologyDataService: RadiologyDataService) {
  }

  ngOnInit() {
    this.patient = this.patientService.getPatientList().find(x => x.id == this.id)!;
    this.getOpdList();
    this.getIpdList();
    this.getPharmacyList();
    this.getPathologyList();
    this.getRadiologyList();
  }

  public edit(id: number) {
    this.openModal_Edit(id);
  }

  public delete(id: number) {
    this.openModal_DeleteConfirmation(id);
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(PatientFormComponent, { backdrop: 'static', size: 'xl', scrollable: true });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.ngOnInit();
      modalRef.close();
    });
  }

  private openModal_DeleteConfirmation(id: number) {
    const modalRef = this.modalService.open(ConfirmationModalContent);
    modalRef.componentInstance.confirmationBoxTitle = 'Confirmation?';
    modalRef.componentInstance.confirmationMessage = 'Are you sure you want to delete this ?';

    modalRef.result.then((userResponse) => {
      if (userResponse) {
        this.patientService.deletePatient(id);
        this.toaster.typeSuccess('Patient details has been deleted successfully!', 'Success!');
        this.onDelete.next(true);
      }
    });
  }

  private getOpdList(): void {
    this.opdList = this.opdDataService.getOpdPatientList(0, this.id).sort((a, b) => b.id - a.id);
  }

  private getIpdList(): void {
    this.ipdList = this.ipdDataService.getIpdListByPatientId(this.id).sort((a, b) => b.id - a.id);
  }

  private getPharmacyList(): void {
    this.pharmacyList = this.pharmacyService.getPharmacyListByPatientId(this.id).sort((a, b) => b.id - a.id);
  }

  private getPathologyList(): void {
    this.pathologyList = this.pathologyDataService.getPathologyList() .sort((a, b) => b.id - a.id);
  }

  private getRadiologyList(): void {
    this.radiologyList = this.radiologyDataService.getRadiologyList().sort((a, b) => b.id - a.id);
  }
}
