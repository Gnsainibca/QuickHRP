import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { BaseService } from 'src/app/shared/data/base.service';
import { Master_LeaveType } from '../models/master-leave-type';
import { Master_Specialist } from '../models/master-specialist';
import { Master_Designation } from '../models/master-designation';
import { Master_Department } from '../models/master-department';
import { Master_ContractType } from '../models/master-contract-type';

@Injectable({
  providedIn: 'root',
})
export class HumanResourceSetupService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }


  // ********************************** LeaveType **************************************//

  public getLeaveTypeList(): Array<Master_LeaveType> {
    return this.list(APP_CONSTANT.localStorage.key.master_leaveTypes) as Array<Master_LeaveType>;
  }

  public getLeaveType(id: number): Master_LeaveType {
    return this.get(id, APP_CONSTANT.localStorage.key.master_leaveTypes) as Master_LeaveType;
  }

  public addLeaveType(leaveType: Master_LeaveType) {
    this.add(leaveType, APP_CONSTANT.localStorage.key.master_leaveTypes);
  }

  public updateLeaveType(leaveType: Master_LeaveType) {
    this.update(leaveType, APP_CONSTANT.localStorage.key.master_leaveTypes);
  }

  public deleteLeaveType(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_leaveTypes);
  }

  // ********************************** Department **************************************//

  public getDepartmentList(): Array<Master_Department> {
    return this.list(APP_CONSTANT.localStorage.key.master_departments) as Array<Master_Department>;
  }

  public getDepartment(id: number): Master_Department {
    return this.get(id, APP_CONSTANT.localStorage.key.master_departments) as Master_Department;
  }

  public addDepartment(department: Master_Department) {
    this.add(department, APP_CONSTANT.localStorage.key.master_departments);
  }

  public updateDepartment(department: Master_Department) {
    this.update(department, APP_CONSTANT.localStorage.key.master_departments);
  }

  public deleteDepartment(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_departments);
  }

  // ********************************** Designation **************************************//

  public getDesignationList(): Array<Master_Designation> {
    return this.list(APP_CONSTANT.localStorage.key.master_designations) as Array<Master_Designation>;
  }

  public getDesignation(id: number): Master_Designation {
    return this.get(id, APP_CONSTANT.localStorage.key.master_designations) as Master_Designation;
  }

  public addDesignation(designation: Master_Designation) {
    this.add(designation, APP_CONSTANT.localStorage.key.master_designations);
  }

  public updateDesignation(designation: Master_Designation) {
    this.update(designation, APP_CONSTANT.localStorage.key.master_designations);
  }

  public deleteDesignation(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_designations);
  }

  // ********************************** Specialist **************************************//

  public getSpecialistList(): Array<Master_Specialist> {
    return this.list(APP_CONSTANT.localStorage.key.master_specialists) as Array<Master_Specialist>;
  }

  public getSpecialist(id: number): Master_Specialist {
    return this.get(id, APP_CONSTANT.localStorage.key.master_specialists) as Master_Specialist;
  }

  public addSpecialist(specialist: Master_Specialist) {
    this.add(specialist, APP_CONSTANT.localStorage.key.master_specialists);
  }

  public updateSpecialist(specialist: Master_Specialist) {
    this.update(specialist, APP_CONSTANT.localStorage.key.master_specialists);
  }

  public deleteSpecialist(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_specialists);
  }

  // ********************************** ContractType **************************************//

  public getContractTypeList(): Array<Master_ContractType> {
    return this.list(APP_CONSTANT.localStorage.key.master_contractTypes) as Array<Master_ContractType>;
  }

  public getContractType(id: number): Master_ContractType {
    return this.get(id, APP_CONSTANT.localStorage.key.master_contractTypes) as Master_ContractType;
  }

  public addContractType(contractType: Master_ContractType) {
    this.add(contractType, APP_CONSTANT.localStorage.key.master_contractTypes);
  }

  public updateContractType(contractType: Master_ContractType) {
    this.update(contractType, APP_CONSTANT.localStorage.key.master_contractTypes);
  }

  public deleteContractType(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_contractTypes);
  }
}