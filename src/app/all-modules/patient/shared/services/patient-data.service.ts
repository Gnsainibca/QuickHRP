import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { DataService } from 'src/app/shared/core.index';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { BaseService } from 'src/app/shared/data/base.service';
import { Patient, PatientList } from 'src/app/shared/models/patient';
import { SettingService } from 'src/app/all-modules/setup/setting/shared/services/setting.service';

@Injectable({
  providedIn: 'root',
})
export class PatientService extends BaseService {
  constructor(http: HttpClient, private data: DataService, private settingService : SettingService) {
    super(http);
  }

  public getPatientList(): Array<PatientList> {
    let patientList: Array<PatientList> = [];
    let genderList = this.settingService.getGenderList();
    let bloodGroupList = this.settingService.getBloodGroupList();
    let maritalStatusList = this.settingService.getMaritalStatusList();
    this.getPatients().forEach(patient => {
      patientList.push({
        ...patient,
        gender: genderList.find(x => x.id === patient.genderId)?.name,
        maritalStatus: maritalStatusList.find(x => x.id === patient.maritalStatusId)?.name,
        bloodGroup: bloodGroupList.find(x => x.id === patient.bloodGroupId)?.name,
      })
    });
    return patientList;
  }

  public getPatientNameList(): Array<SimpleRecord> {
    let result: Array<SimpleRecord> = [];
    this.getPatients().forEach(patient => {
      result.push({
        id: patient.id,
        name: patient.name
      })
    });
    return result;
  }

  public getPatientById(id: number): PatientList {
    return this.getPatients().find(x => x.id == id) as PatientList;
  }

  public getPatients(): Array<Patient> {
    return this.list(APP_CONSTANT.localStorage.key.patients) as Array<Patient>;
  }

  public addPatient(patient: Patient) {
    this.add(patient, APP_CONSTANT.localStorage.key.patients);
  }

  public updatePatient(patient: Patient) {
    this.update(patient, APP_CONSTANT.localStorage.key.patients);
  }

  public deletePatient(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.patients);
  }
}