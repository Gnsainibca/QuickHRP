import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IpdPatient } from 'src/app/all-modules/ipd/shared/models/ipd-patient';
import { OpdPatient } from 'src/app/all-modules/opd/shared/models/opd-patient';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { BaseService } from 'src/app/shared/data/base.service';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { Master_Prefix } from '../models/master_prefix';
import { Master_BloodGroup } from '../models/master-blood-group';
import { Master_MaritalStatus } from '../models/master-marital-status';
import { Master_Gender } from '../models/master-gender';

@Injectable({
  providedIn: 'root',
})
export class SettingService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public getOpdIpdPatientIdByCaseId(caseId: string): SimpleRecord | undefined {

    var ipdPatientList = this.list(APP_CONSTANT.localStorage.key.ipdPatients) as Array<IpdPatient>;
    let ipdPatientId = ipdPatientList?.find(x => x.caseId == caseId)?.id;

    if (ipdPatientId) {
      return { id: ipdPatientId, name: 'ipd' };
    };

    var opdPatientList = this.list(APP_CONSTANT.localStorage.key.opdPatients) as Array<OpdPatient>;
    let opdPatientId = opdPatientList?.find(x => x.caseId == caseId)?.id;
    return { id: opdPatientId!, name: 'opd' };
  }

  public getPrefixById(id: number) {
    return this.get(id, APP_CONSTANT.localStorage.key.master_prefixSettings);
  }

  public updatePrefix(prefix: Master_Prefix) {
    this.update(prefix, APP_CONSTANT.localStorage.key.master_prefixSettings);
  }

  // ********************************** Blood Group **************************************//

  public getBloodGroupList(): Array<Master_BloodGroup> {
    return this.list(APP_CONSTANT.localStorage.key.master_bloodGroups) as Array<Master_BloodGroup>;
  }

  public getBloodGroup(id: number): Master_BloodGroup {
    return this.get(id, APP_CONSTANT.localStorage.key.master_bloodGroups) as Master_BloodGroup;
  }

  public addBloodGroup(bloodGroup: Master_BloodGroup) {
    this.add(bloodGroup, APP_CONSTANT.localStorage.key.master_bloodGroups);
  }

  public updateBloodGroup(bloodGroup: Master_BloodGroup) {
    this.update(bloodGroup, APP_CONSTANT.localStorage.key.master_bloodGroups);
  }

  public deleteBloodGroup(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_bloodGroups);
  }

  // ********************************** Marital Status **************************************//

  public getMaritalStatusList(): Array<Master_MaritalStatus> {
    return this.list(APP_CONSTANT.localStorage.key.master_maritalStatuses) as Array<Master_MaritalStatus>;
  }

  public getMaritalStatus(id: number): Master_MaritalStatus {
    return this.get(id, APP_CONSTANT.localStorage.key.master_maritalStatuses) as Master_MaritalStatus;
  }

  public addMaritalStatus(matiralStatus: Master_MaritalStatus) {
    this.add(matiralStatus, APP_CONSTANT.localStorage.key.master_maritalStatuses);
  }

  public updateMaritalStatus(matiralStatus: Master_MaritalStatus) {
    this.update(matiralStatus, APP_CONSTANT.localStorage.key.master_maritalStatuses);
  }

  public deleteMaritalStatus(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_maritalStatuses);
  }

  // ********************************** Gender **************************************//

  public getGenderList(): Array<Master_Gender> {
    return this.list(APP_CONSTANT.localStorage.key.master_genders) as Array<Master_Gender>;
  }

  public getGender(id: number): Master_Gender {
    return this.get(id, APP_CONSTANT.localStorage.key.master_genders) as Master_Gender;
  }

  public addGender(gender: Master_Gender) {
    this.add(gender, APP_CONSTANT.localStorage.key.master_genders);
  }

  public updateGender(gender: Master_Gender) {
    this.update(gender, APP_CONSTANT.localStorage.key.master_genders);
  }

  public deleteGender(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_genders);
  }
}