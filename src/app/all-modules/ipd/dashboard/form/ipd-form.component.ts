import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IpdDataService } from '../../shared/servives/Ipd.service';
import { IpdPatient } from '../../shared/models/ipd-patient';
import { SimpleRecord, SimpleRecordWithParent } from 'src/app/shared/models/simple-record';
import { CommonService } from 'src/app/shared/data/common.service';
import { Master_BedDetails } from 'src/app/all-modules/setup/bed/shared/models/master-bed';
import { BedSetupService } from 'src/app/all-modules/setup/bed/shared/services/bed-setup.service';
import { SymptomsSetupService } from 'src/app/all-modules/setup/symptoms/shared/services/symptoms-setup.service';
import { Master_SymptomsType } from 'src/app/all-modules/setup/symptoms/shared/models/master-symptoms-type';
import { Master_SymptomsHeadList } from 'src/app/all-modules/setup/symptoms/shared/models/master-symptoms-head';
import { PatientFormComponent } from 'src/app/shared/components/patient-form/patient-form.component';

@Component({
  selector: 'app-ipd-form',
  templateUrl: './ipd-form.component.html',
  styleUrls: ['./ipd-form.component.scss']
})
export class IPDFormComponent {
  @Input() isEdit : boolean = false;
  @Input() bedId: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  // In case of visit
  @Input() patientId: number = 0;
  @Input() id: number = 0;

  ipdForm!: UntypedFormGroup;
  patientList: Array<any> = [];
  typeaheadLoading: boolean = false;
  typeaheadNoResults: boolean = false;

  symptomsTypes: Array<Master_SymptomsType> = [];
  symptomsTitles: Array<Master_SymptomsHeadList> = [];
  filteredSymptomsTitles: Array<Master_SymptomsHeadList> = [];
  dropdownSettings = {};

  bedGroups: Array<SimpleRecord> = [];
  bedNumbers: Array<Master_BedDetails> = [];
  doctors: Array<SimpleRecord> = [];

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal, private toaster: ToasterService,
    private fb: FormBuilder, private data: IpdDataService, private commonService: CommonService,
    private bedService: BedSetupService, private bedSetupService: BedSetupService, symptomsSetupService: SymptomsSetupService) {
    this.symptomsTitles = symptomsSetupService.getSymptomsHeadList();
    this.symptomsTypes = symptomsSetupService.getSymptomsTypeList();
    this.bedGroups = bedService.getBedGroupNameList();
    this.patientList = this.commonService.getPatientNameList();
    this.doctors = this.commonService.getDoctorsNameList();
  }

  ngOnInit() {
    this.ipdForm = this.fb.group({
      ipdNo: [null],
      patientName: [null, [Validators.required]],
      patientId: [null],
      symptomsTypes: [null],
      symptomsTitles: [null],
      symptomsDescription: [null],
      anyKnownAllergies: [null],
      previousMedicalIssue: [null],
      note: [null],
      appointmentDate: [new Date(), [Validators.required]],
      caseId: [null],
      anyCasualty: [false],
      isOldPatient: [false],
      reference: [null],
      consultantDoctorId: ['', [Validators.required]],
      applyTPA: [false],
      creditLimit: ['', [Validators.required]],
      bedGroupId: ['', [Validators.required]],
      bedId: ['', [Validators.required]],
      needLiveConsultation: [false]
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.setFormControls();
    this.setControlsState();
  }

  private setFormControls() {
    if (this.isEdit) {
      let ipdPatient = this.data.getIpdPatientById(this.id);
      let patient = this.patientList.find(x => x.id === ipdPatient.patientId);
      this.f['ipdNo'].setValue(ipdPatient?.ipdNo);
      this.f['patientId'].setValue(patient?.id);
      this.f['patientName'].setValue(patient?.name);
      this.f['symptomsTypes'].setValue(ipdPatient.symptomsTypes);
      this.setSymptomsTypeItemWise(null);
      this.f['symptomsTitles'].setValue(ipdPatient.symptomsTitles);
      this.f['symptomsDescription'].setValue(ipdPatient.symptomsDescription);
      this.f['anyKnownAllergies'].setValue(ipdPatient.anyKnownAllergies);
      this.f['previousMedicalIssue'].setValue(ipdPatient.previousMedicalIssue);
      this.f['note'].setValue(ipdPatient.note);
      this.f['appointmentDate'].setValue(new Date(ipdPatient.appointmentDate));
      this.f['caseId'].setValue(ipdPatient.caseId);
      this.f['anyCasualty'].setValue(ipdPatient.anyCasualty);
      this.f['isOldPatient'].setValue(ipdPatient.isOldPatient);
      this.f['reference'].setValue(ipdPatient.reference);
      this.f['consultantDoctorId'].setValue(ipdPatient.consultantDoctorId);
      this.f['applyTPA'].setValue(ipdPatient.applyTPA);
      this.f['creditLimit'].setValue(ipdPatient.creditLimit);
      this.f['bedGroupId'].setValue(this.bedSetupService.getBed(ipdPatient.bedId)?.bedGroupId);
      this.onBedGroupChange();
      this.f['bedId'].setValue(ipdPatient.bedId);
      this.f['needLiveConsultation'].setValue(ipdPatient.needLiveConsultation);
    }
    else if(this.bedId > 0) {
      this.f['bedGroupId'].setValue(this.bedSetupService.getBed(this.bedId)?.bedGroupId);
      this.onBedGroupChange();
      this.f['bedId'].setValue(this.bedId);
    }
    this.f['date']?.disable();
  }

  private setControlsState() {
  }

  public setSymptomsTypeItemWise(item: any) {
    let selectedSymptomsTypes: Array<SimpleRecord> = this.f['symptomsTypes'].value;
    this.setSymptomsTitles(selectedSymptomsTypes);
  }

  public setSymptomsTypeWithAllItems(selectedSymptomsTitles: any) {
    this.setSymptomsTitles(selectedSymptomsTitles);
  }

  private setSymptomsTitles(selectedItems: Array<SimpleRecord>) {
    this.f['symptomsTitles'].setValue(null);
    this.f['symptomsDescription'].setValue(null);
    this.filteredSymptomsTitles = this.symptomsTitles.filter(x => selectedItems?.some(y => y.id === x.typeId));
  }

  public setSymptomsDescriptionItemWise(item: any) {
    let selectedFindings: Array<SimpleRecordWithParent> = this.f['symptomsTypes'].value;
    this.setSymptomsDescription(selectedFindings);
  }

  public setSymptomsDescriptionWithAllItems(selectedFindings: any) {
    this.setSymptomsDescription(selectedFindings);
  }

  private setSymptomsDescription(selectedItems: Array<SimpleRecordWithParent>) {
    this.f['symptomsDescription'].setValue(null);
    const symptomsDescription = this.filteredSymptomsTitles.filter(x => selectedItems?.some(y => y.id === x.typeId)).map(x => x.description).join('\n\n');
    this.f['symptomsDescription'].setValue(symptomsDescription);
  }

  addPatient() {
    const modalRef = this.modalService.open(PatientFormComponent, { backdrop: 'static', size: 'xl', scrollable: true });
    modalRef.componentInstance.onSave.subscribe((patientId: number) => {
      this.patientList = this.commonService.getPatientNameList();
      this.f['patientId'].setValue(patientId);
      this.f['patientName'].setValue(this.patientList.find(x=>x.id==patientId)?.name);
      modalRef.close();
    });
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    this.f['patientId'].setValue(e.item.id);
  }

  onBedGroupChange() {
    this.f['bedId'].setValue('');
    this.bedNumbers = this.bedService.getBedList().filter(x => x.bedGroupId == this.f['bedGroupId']?.value);
  }

  get f() {
    return this.ipdForm.controls;
  }

  onSubmit() {
    this.ipdForm.markAllAsTouched();
    if (this.ipdForm.valid) {
      const ipdPatient: IpdPatient = this.ipdForm.getRawValue();
      if (this.isEdit) {
        ipdPatient.id = this.id!;
        this.data.updateIpdPatient(ipdPatient);
        this.toaster.typeSuccess('Ipd patient details has been updated successfully!', 'Success!');
      }
      else {
        this.data.addIpdPatient(ipdPatient);
        this.toaster.typeSuccess('Ipd patient details has been added successfully!', 'Success!');
      }
      this.onSave.next(true);
    }
  }
}
