import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { DataService, ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Patient } from '../../models/patient';
import { CommonService } from '../../data/common.service';
import { CommonModule } from '@angular/common';
import { SimpleRecord } from '../../models/simple-record';
import { MaterialModule } from '../../material/material.module';
import { DatepickerModule } from 'ng2-datepicker';
import Utils from '../../utility/utils';
import { PatientService } from 'src/app/all-modules/patient/shared/services/patient-data.service';
import { SettingService } from 'src/app/all-modules/setup/setting/shared/services/setting.service';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
  imports: [
    CommonModule, 
    FormsModule,  
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    DatepickerModule,
    NgbModule
  ]
})
export class PatientFormComponent {
  patientForm!: UntypedFormGroup;
  @Output() onSave = new EventEmitter<number>();
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  genderList : Array<SimpleRecord> = [];
  bloodGroupList : Array<SimpleRecord> = [];
  maritalStatusList : Array<SimpleRecord> = [];
  tpaList : Array<SimpleRecord> = [];
  attachment !: string | ArrayBuffer | null;

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private commonService: CommonService,
    private dataService : DataService, private patientService: PatientService, settingService : SettingService
  ) {
    this.genderList = settingService.getGenderList();
    this.bloodGroupList = settingService.getBloodGroupList();
    this.maritalStatusList = settingService.getMaritalStatusList();
    this.tpaList = dataService.tpaList;
    this.attachment = dataService.defaultImageBase64;
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.patientForm = this.fb.group({
      name: [null, [Validators.required]],
      guardianName: [null],
      genderId: ['', [Validators.required]],
      dob: [null],
      ageYear: [0, [Validators.required]],
      ageMonth: [0],
      ageDay: [0],
      bloodGroupId: [''],
      maritalStatusId: [''],
      photo: [this.dataService.defaultImageBase64],
      phone: [null],
      alternatePhone: [null],
      email: [null],
      address: [null],
      idProofNo: [null],
      tpaNameId: [''],
      tpaId: [null],
      tpaExpiryDate: [null],
      remarks: [null],
    });
   this.setFormControls();
   }
 
  private setFormControls() {
    if (this.isEdit) {
      let patient = this.patientService.getPatientById(this.id);
      this.f['name'].setValue(patient.name);
      this.f['guardianName'].setValue(patient.guardianName);
      this.f['genderId'].setValue(patient.genderId);
      this.f['dob'].setValue(patient.dob);
      this.f['ageYear'].setValue(patient.ageYear);
      this.f['ageMonth'].setValue(patient.ageMonth);
      this.f['ageDay'].setValue(patient.ageDay);
      this.f['bloodGroupId'].setValue(patient.bloodGroupId);
      this.f['maritalStatusId'].setValue(patient.maritalStatusId);
      this.f['photo'].setValue(patient.photo);
      this.f['phone'].setValue(patient.phone);
      this.f['alternatePhone'].setValue(patient.alternatePhone);
      this.f['email'].setValue(patient.email);
      this.f['address'].setValue(patient.address);
      this.f['idProofNo'].setValue(patient.idProofNo);
      this.f['tpaNameId'].setValue(patient.tpaNameId);
      this.f['tpaId'].setValue(patient.tpaId);
      this.f['tpaExpiryDate'].setValue(patient.tpaExpiryDate);
      this.f['remarks'].setValue(patient.remarks);
    }
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.f['photo'].setValue(reader.result);
    };
  }

  onDOBSelect(event: any) {
    if (event.target?.value) {
      let ageInfo = Utils.getAge(event.target?.value);
      this.f['ageYear'].setValue(ageInfo[0]);
      this.f['ageMonth'].setValue(ageInfo[1]);
      this.f['ageDay'].setValue(ageInfo[2]);
    }
  }

  get f() {
    return this.patientForm.controls;
  }

  onSubmit(form: FormGroup) {
    this.patientForm.markAllAsTouched();
    if (this.patientForm.valid) {
      const patient: Patient = this.patientForm.getRawValue();
      
      if (this.isEdit) {
        patient.id = this.id;
        this.commonService.updatePatient(patient);
      }
      else {
        this.commonService.addPatient(patient);
      }
      this.onSave.next(patient.id);
      this.toaster.typeSuccess(this.isEdit ? 'Patient has been added successfully!' : 'Patient has been added successfully!', 'Success!');
    }
  }
}
