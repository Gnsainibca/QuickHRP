import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { DataService, ToasterService } from 'src/app/shared/core.index';
import { CommonService } from 'src/app/shared/data/common.service';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { Staff } from '../../shared/models/staff';
import { StaffService } from '../../shared/services/staff-data.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HumanResourceSetupService } from 'src/app/all-modules/setup/human-resource/shared/services/human-resource-setup.service';
import { Master_Designation } from 'src/app/all-modules/setup/human-resource/shared/models/master-designation';
import { Master_Department } from 'src/app/all-modules/setup/human-resource/shared/models/master-department';
import { Master_Specialist } from 'src/app/all-modules/setup/human-resource/shared/models/master-specialist';
import { Master_ContractType } from 'src/app/all-modules/setup/human-resource/shared/models/master-contract-type';
import { SettingService } from 'src/app/all-modules/setup/setting/shared/services/setting.service';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss'],
})
export class StaffFormComponent {
  staffForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Output() onSave = new EventEmitter<boolean>();
  @Input() id: number = 0;

  genderList: Array<SimpleRecord> = [];
  bloodGroupList: Array<SimpleRecord> = [];
  maritalStatusList: Array<SimpleRecord> = [];
  roleList: Array<SimpleRecord> = [];
  designationList: Array<Master_Designation> = [];
  departmentList: Array<Master_Department> = [];
  specialistList: Array<Master_Specialist> = [];
  contractTypeList: Array<Master_ContractType> = [];

  dropdownSettings = {};

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, commonService: CommonService,
    settingService: SettingService, private staffService: StaffService, hrSetupService: HumanResourceSetupService,
    private dataService: DataService) {
    this.genderList = settingService.getGenderList();
    this.bloodGroupList = settingService.getBloodGroupList();
    this.maritalStatusList = settingService.getMaritalStatusList();
    this.roleList = commonService.getRoles();
    this.designationList = hrSetupService.getDesignationList();
    this.departmentList = hrSetupService.getDepartmentList();
    this.specialistList = hrSetupService.getSpecialistList();
    this.contractTypeList = hrSetupService.getContractTypeList();
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.staffForm = this.fb.group({
      photo: [this.dataService.defaultImageBase64],
      staffId: ['', [Validators.required]],
      roleId: ['', [Validators.required]],
      designationId: [''],
      departmentId: [''],
      specialistIds: [''],
      firstName: [null, [Validators.required]],
      lastName: [null],
      fatherName: [null, [Validators.required]],
      motherName: [null],
      genderId: ['', [Validators.required]],
      maritalStatusId: [''],
      bloodGroupId: [''],
      dob: [null, [Validators.required]],
      doj: [null],
      phone: [null],
      alternatePhone: [null],
      email: [null],
      currentAddress: [null],
      permanentAddress: [null],
      qualification: [null],
      workExperience: [null],
      specialization: [null],
      note: [null],
      panNumber: [null],
      nationalIdentificationNumber: [null],
      localIdentificationNumber: [null],
      referenceContact: [null],

      // ########## Payroll ############## //
      epfNo: [null],
      basicSalary: [null],
      contractTypeId: [''],
      workShift: [null],
      workLocation: [null],

      // ########## Leaves ############## //

      casualLeave: [null],
      privilegeLeave: [null],
      sickLeave: [null],
      maternityLeave: [null],
      floaterLeave: [null],
      fixedLeave: [null],

      // ########## Bank Account Details ############## //

      accountTitle: [null],
      bankAccountNo: [null],
      bankName: [null],
      bankBranchName: [null],
      ifscCode: [null],

      // ########## Social Media Link ############## //

      facebookURL: [null],
      twitterURL: [null],
      linkedinURL: [null],
      instagramURL: [null],

      // ########## Documents ############## //

      resumeDocument: [null],
      resumeFileName: [null],
      joiningLetterDocument: [null],
      joiningLetterFileName: [null],
      resignationLetterDocument: [null],
      resignationLetterFileName: [null],
      otherDocument: [null],
      otherFileName: [null],
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
  }

  private setFormControls() {
    if (this.isEdit) {
      let staff = this.staffService.getStaffById(this.id);
      if (staff) {
        this.f['photo'].setValue(staff.photo);
        this.f['staffId'].setValue(staff.staffId);
        this.f['roleId'].setValue(staff.roleId);
        this.f['designationId'].setValue(staff.designationId);
        this.f['departmentId'].setValue(staff.departmentId);
        this.f['specialistIds'].setValue(staff.specialistIds);
        this.f['firstName'].setValue(staff.firstName);
        this.f['lastName'].setValue(staff.lastName);
        this.f['fatherName'].setValue(staff.fatherName);
        this.f['motherName'].setValue(staff.motherName);
        this.f['genderId'].setValue(staff.genderId);
        this.f['maritalStatusId'].setValue(staff.maritalStatusId);
        this.f['bloodGroupId'].setValue(staff.bloodGroupId);
        this.f['dob'].setValue(staff.dob);
        this.f['doj'].setValue(staff.doj);
        this.f['phone'].setValue(staff.phone);
        this.f['alternatePhone'].setValue(staff.alternatePhone);
        this.f['email'].setValue(staff.email);
        this.f['currentAddress'].setValue(staff.currentAddress);
        this.f['permanentAddress'].setValue(staff.permanentAddress);
        this.f['qualification'].setValue(staff.qualification);
        this.f['workExperience'].setValue(staff.workExperience);
        this.f['specialization'].setValue(staff.specialization);
        this.f['note'].setValue(staff.note);
        this.f['panNumber'].setValue(staff.panNumber);
        this.f['nationalIdentificationNumber'].setValue(staff.nationalIdentificationNumber);
        this.f['localIdentificationNumber'].setValue(staff.localIdentificationNumber);
        this.f['referenceContact'].setValue(staff.referenceContact);

        // ########## Payroll ############## //
        this.f['epfNo'].setValue(staff.epfNo);
        this.f['basicSalary'].setValue(staff.basicSalary);
        this.f['contractTypeId'].setValue(staff.contractTypeId);
        this.f['workShift'].setValue(staff.workShift);
        this.f['workLocation'].setValue(staff.workLocation);

        // ########## Leaves ############## //
        this.f['casualLeave'].setValue(staff.casualLeave);
        this.f['privilegeLeave'].setValue(staff.privilegeLeave);
        this.f['sickLeave'].setValue(staff.sickLeave);
        this.f['maternityLeave'].setValue(staff.maternityLeave);
        this.f['floaterLeave'].setValue(staff.floaterLeave);
        this.f['fixedLeave'].setValue(staff.fixedLeave);

        // ########## Bank Account Details ############## //
        this.f['accountTitle'].setValue(staff.accountTitle);
        this.f['bankAccountNo'].setValue(staff.bankAccountNo);
        this.f['bankName'].setValue(staff.bankName);
        this.f['bankBranchName'].setValue(staff.bankBranchName);
        this.f['ifscCode'].setValue(staff.ifscCode);

        // ########## Social Media Link ############## //
        this.f['facebookURL'].setValue(staff.facebookURL);
        this.f['twitterURL'].setValue(staff.twitterURL);
        this.f['linkedinURL'].setValue(staff.linkedinURL);
        this.f['instagramURL'].setValue(staff.instagramURL);

        // ########## Documents ############## //
        this.f['resumeDocument'].setValue(staff.resumeDocument);
        this.f['resumeFileName'].setValue(staff.resumeFileName);
        this.f['joiningLetterDocument'].setValue(staff.joiningLetterDocument);
        this.f['joiningLetterFileName'].setValue(staff.joiningLetterFileName);
        this.f['resignationLetterDocument'].setValue(staff.resignationLetterDocument);
        this.f['resignationLetterFileName'].setValue(staff.resignationLetterFileName);
        this.f['otherDocument'].setValue(staff.otherDocument);
        this.f['otherFileName'].setValue(staff.otherFileName);
      }
    }
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // this.f['attachmentName'].setValue(file.name);
    reader.onload = () => {
      // this.photo = reader.result;
      this.f['photo'].setValue(reader.result);
    };
  }

  handleResumeFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    this.f['resumeFileName'].setValue(file.name);
    reader.onload = () => {
      this.f['resumeDocument'].setValue(reader.result);
    };
  }

  downloadResume() {
    const downloadLink = document.createElement('a');
    const fileName = this.f['resumeFileName'].value;
    downloadLink.href = this.f['resumeDocument']?.value;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  handleJoiningLetterFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    this.f['joiningLetterFileName'].setValue(file.name);
    reader.onload = () => {
      this.f['joiningLetterDocument'].setValue(reader.result);
    };
  }

  downloadJoiningLetter() {
    const downloadLink = document.createElement('a');
    const fileName = this.f['joiningLetterFileName'].value;
    downloadLink.href = this.f['joiningLetterDocument']?.value;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  handleResignationLetterFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    this.f['resignationLetterFileName'].setValue(file.name);
    reader.onload = () => {
      this.f['resignationLetterDocument'].setValue(reader.result);
    };
  }

  downloadResignationLetter() {
    const downloadLink = document.createElement('a');
    const fileName = this.f['resignationLetterFileName'].value;
    downloadLink.href = this.f['resignationLetterDocument']?.value;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  handleOtherDocumentsFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    this.f['otherFileName'].setValue(file.name);
    reader.onload = () => {
      this.f['otherDocument'].setValue(reader.result);
    };
  }

  downloadOtherDocuments() {
    const downloadLink = document.createElement('a');
    const fileName = this.f['otherFileName'].value;
    downloadLink.href = this.f['resumeDocument']?.value;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  get f() {
    return this.staffForm.controls;
  }

  onSubmit(form: FormGroup) {
    this.staffForm.markAllAsTouched();
    if (this.staffForm.valid) {
      const staff: Staff = this.staffForm.getRawValue();

      if (this.isEdit) {
        staff.id = this.id;
        this.staffService.updateStaff(staff);
      }
      else {
        this.staffService.addStaff(staff);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Staff details has been updated successfully!' : 'Staff details has been added successfully!', 'Success!');
    }
  }
}
