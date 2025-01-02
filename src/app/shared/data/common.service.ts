import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { DataService } from 'src/app/shared/core.index';
import { Patient, PatientList } from '../models/patient';
import { SimpleRecord } from '../models/simple-record';
import Utils from '../utility/utils';
import { Staff, StaffDetail } from 'src/app/all-modules/staff/shared/models/staff';
import { BaseService } from './base.service';
import { Role } from '../enums/role';
import { Master_Prefix } from 'src/app/all-modules/setup/setting/shared/models/master_prefix';
import { Charge_Module } from '../enums/charge-module';
import { Prefix_Screen } from '../enums/prefix-screen';
import { HumanResourceSetupService } from 'src/app/all-modules/setup/human-resource/shared/services/human-resource-setup.service';
import { OpdPatient } from 'src/app/all-modules/opd/shared/models/opd-patient';
import { IpdPatient } from 'src/app/all-modules/ipd/shared/models/ipd-patient';
import { SettingService } from 'src/app/all-modules/setup/setting/shared/services/setting.service';
import { IpdPrescription } from 'src/app/all-modules/ipd/shared/models/ipd-prescription';

@Injectable({
  providedIn: 'root',
})
export class CommonService extends BaseService {
  constructor(http: HttpClient, private data: DataService, private hrSetupService : HumanResourceSetupService,
    private settingService : SettingService
  ) {
    super(http);
  }

  // ******************************* Patients ****************************************//

  public getPatients(): Array<PatientList> {
    let patients = this.list(APP_CONSTANT.localStorage.key.patients) as Array<PatientList>;
    let genderList = this.settingService.getGenderList();
    let bloodGroupList = this.settingService.getBloodGroupList();
    let maritalStatusList = this.settingService.getMaritalStatusList();
    let result: Array<PatientList> = [];
    patients.forEach(patient => {
      this.setPatientAge(patient);
      result.push(
        {
          ...patient,
          name : patient.name + ' (' + patient.id + ')',
          nameWithId: patient.name + ' (' + patient.id + ')',
          gender: genderList.find(x => x.id === patient.genderId)?.name,
          maritalStatus: maritalStatusList.find(x => x.id === patient.maritalStatusId)?.name,
          bloodGroup: bloodGroupList.find(x => x.id === patient.bloodGroupId)?.name,
        });
    });
    return result;
  }

  private setPatientAge(patient: PatientList) {
    let isAgeAsOfDate = false;
    if (patient.dob) {
      let ageInfo = Utils.getAge(new Date(patient.dob));
      patient.ageYear = ageInfo[0];
      patient.ageMonth = ageInfo[1];
      patient.ageDay = ageInfo[2];
      isAgeAsOfDate = true;
    }
    patient.age = `${patient.ageYear} Year ${patient.ageMonth} Month ${patient.ageDay} Days`;
    if (isAgeAsOfDate) {
      patient.age = patient.age + ' (As Of Date)';
    }
  }

  public getPatientNameList(): Array<SimpleRecord> {
    return this.getPatients().map(x => ({ id: x.id, name: x.nameWithId })) as Array<SimpleRecord>;
  }

  public getOpdPatientNameList(): Array<SimpleRecord> {
    let opdPatientList = this.list(APP_CONSTANT.localStorage.key.opdPatients) as Array<OpdPatient>;
    let opdPatientIds = opdPatientList.map(x => x.patientId);
    return this.getPatients().filter(x => opdPatientIds.includes(x.id)).map(x => ({ id: x.id, name: x.nameWithId })) as Array<SimpleRecord>;
  }

  public getIpdPatientNameList(): Array<SimpleRecord> {
    let ipdPatientList = this.list(APP_CONSTANT.localStorage.key.ipdPatients) as Array<IpdPatient>;
    let ipdPatientIds = ipdPatientList.map(x => x.patientId);
    return this.getPatients().filter(x => ipdPatientIds.includes(x.id)).map(x => ({ id: x.id, name: x.nameWithId })) as Array<SimpleRecord>;
  }

  public getPatientById(id: number): PatientList | undefined {
    return this.getPatients().find(x => x.id == id) as PatientList;
  }

  public addPatient(patient: Patient) {
    this.add(patient, APP_CONSTANT.localStorage.key.patients);
  }

  public updatePatient(patient: Patient) {
    this.update(patient, APP_CONSTANT.localStorage.key.patients);
  }

  // ******************************* Staffs ****************************************//

  public getStaffList(): Array<StaffDetail> {
    let staffList: Array<StaffDetail> = [];
    let designationList = this.hrSetupService.getDesignationList();
    let departmentList = this.hrSetupService.getDepartmentList();
    let specialistList = this.hrSetupService.getSpecialistList();
    let contractTypeList = this.hrSetupService.getContractTypeList();
    let genderList = this.settingService.getGenderList();
    let maritalStatusList = this.settingService.getBloodGroupList();
    let bloodGroupList = this.settingService.getMaritalStatusList();
    let roleList: Array<SimpleRecord> = this.getRoles();
    this.getStaffs().forEach(staff => {
      staffList.push({
        ...staff,
        fullName: (staff.firstName + ' ' + (staff.lastName ? staff.lastName : '')).trim(),
        fullNameWithId: (staff.firstName + ' ' + (staff.lastName ? staff.lastName : '')).trim() + ' (' + staff.staffId + ')',
        gender: genderList.find(x => x.id === staff.genderId)?.name,
        maritalStatus: maritalStatusList.find(x => x.id === staff.maritalStatusId)?.name,
        bloodGroup: bloodGroupList.find(x => x.id === staff.bloodGroupId)?.name,
        role: roleList.find(x => x.id === staff.roleId)?.name,
        designation: designationList.find(x => x.id === staff.designationId)?.name,
        department: departmentList.find(x => x.id === staff.departmentId)?.name,
        specialist: specialistList.filter(x => staff.specialistIds.includes(x.id))?.map(x => x.name).join(', '),
        contractType: contractTypeList.find(x => x.id === staff.contractTypeId)?.name
      })
    });
    return staffList;
  }

  public getStaffByRole(role: Role): StaffDetail {
    return this.getStaffList().find(x => x.roleId == role) as StaffDetail;
  }

  public getStaffById(id: number): StaffDetail {
    return this.getStaffList().find(x => x.id == id) as StaffDetail;
  }

  public getStaffs(): Array<Staff> {
    return this.list(APP_CONSTANT.localStorage.key.staffs) as Array<Staff>;
  }

  public getStaffsNameList(): Array<SimpleRecord> {
    return this.getStaffList().map(staff => ({ id: staff.id, name: staff.fullName! }))
  }

  public getStaffsNameWithIdList(): Array<SimpleRecord> {
    return this.getStaffList().map(staff => ({ id: staff.id, name: staff.fullNameWithId! }))
  }

  // ******************************* Doctors ****************************************//

  public getDoctors(): Array<StaffDetail> {
    return this.getStaffList().filter(x => x.roleId == Role.Doctor);
  }

  public getDoctorById(id: number): StaffDetail | undefined {
    return this.getDoctors().find(x => x.id == id);
  }

  public getDoctorsNameList(): Array<SimpleRecord> {
    return this.getDoctors().map(x => ({ id: x.id, name: x.fullNameWithId })) as Array<SimpleRecord>;
  }


  // ******************************* Pathologist ****************************************//

  public getPathologists(): Array<StaffDetail> {
    return this.getStaffList().filter(x => x.roleId == Role.Pathologist);
  }

  public getPathologistsNameList(): Array<SimpleRecord> {
    return this.getPathologists().map(x => ({ id: x.id, name: x.fullNameWithId })) as Array<SimpleRecord>;
  }

  // ******************************* Radiologist ****************************************//

  public getRadiologists(): Array<StaffDetail> {
    return this.getStaffList().filter(x => x.roleId == Role.Radiologist);
  }

  public getRadiologistsNameList(): Array<SimpleRecord> {
    return this.getRadiologists().map(x => ({ id: x.id, name: x.fullNameWithId })) as Array<SimpleRecord>;
  }


  // ****************************** Nurse ********************************************// 

  public getNurses(): Array<StaffDetail> {
    return this.getStaffList().filter(x => x.roleId == Role.Nurse);
  }

  public getNurseById(id: number): StaffDetail | undefined {
    return this.getNurses().find(x => x.id == id);
  }

  public getNursesNameList(): Array<SimpleRecord> {
    return this.getNurses().map(x => ({ id: x.id, name: x.fullNameWithId })) as Array<SimpleRecord>;
  }

  // ******************************* Prefix ****************************************//

  public getPrefix(): Master_Prefix {
    let prefixList = this.list(APP_CONSTANT.localStorage.key.master_prefixSettings) as Array<Master_Prefix>;
    return prefixList[0];
  }

  public getNo(id : number, screen: Prefix_Screen) {
    let allPrefix = this.getPrefix();
    let prefixValue : string = '';
    switch(screen)
    {
      case Prefix_Screen.IPD : {
        prefixValue = allPrefix.ipdNo;
        break;
      }
      case Prefix_Screen.OPD : {
        prefixValue = allPrefix.opdNo;
        break;
      }
      case Prefix_Screen.IPDPrescription : {
        prefixValue = allPrefix.ipdPrescription;
        break;
      }
      case Prefix_Screen.OPDPrescription : {
        prefixValue = allPrefix.opdPrescription;
        break;
      }
      case Prefix_Screen.Appointment : {
        prefixValue = allPrefix.appointment;
        break;
      }
      case Prefix_Screen.Pharmacy : {
        prefixValue = allPrefix.pharmacyBill;
        break;
      }
      case Prefix_Screen.Operation : {
        prefixValue = allPrefix.operationReferenceNo;
        break;
      }
      case Prefix_Screen.Radiology : {
        prefixValue = allPrefix.radiologyBill;
        break;
      }
      case Prefix_Screen.Pathology : {
        prefixValue = allPrefix.pathologyBill;
        break;
      }
      case Prefix_Screen.OPDCheckup : {
        prefixValue = allPrefix.opdCheckupId;
        break;
      }
      case Prefix_Screen.PharmacyPurchase : {
        prefixValue = allPrefix.pharmacyPurchaseNo;
        break;
      }
    }
     return `${prefixValue}${id}`
  }

  // ****************************** Roles ********************************************// 

  public getRoles(): Array<SimpleRecord> {
    let roles: Array<SimpleRecord> = [];
    Object.values(Role).forEach((value, index) => {
      if (typeof value === 'string') {
        roles.push({ id: 0, name: value.toString() });
      }
    });
    Object.keys(Role).filter((key, index) => {
      if (!isNaN(Number(key))) {
        roles[index].id = parseInt(key)
      }
    });
    return roles;
  }

  public getChargeModules(): Array<SimpleRecord> {
    let modules: Array<SimpleRecord> = [];
    Object.values(Charge_Module).forEach((value, index) => {
      if (typeof value === 'string') {
        modules.push({ id: 0, name: value.toString() });
      }
    });
    Object.keys(Charge_Module).filter((key, index) => {
      if (!isNaN(Number(key))) {
        modules[index].id = parseInt(key)
      }
    });
    return modules;
  }

  
  public getPrescriptionByNo(prescriptionNo: string): IpdPrescription {
    let presciptionList = this.list(APP_CONSTANT.localStorage.key.ipdPrescriptions) as Array<IpdPrescription>;
    return presciptionList.find(x => x.prescriptionNo == prescriptionNo)!;
  }

  public getPatientByIpdPatientId(ipdPatientId: number): IpdPatient {
    let ipdPatient = this.get(ipdPatientId, APP_CONSTANT.localStorage.key.ipdPatients) as IpdPatient;
    return ipdPatient!;
  }
}