import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { Staff, StaffDetail } from '../models/staff';
import { CommonService } from 'src/app/shared/data/common.service';
import { BaseService } from 'src/app/shared/data/base.service';
import { SimpleRecord } from 'src/app/shared/models/simple-record';

@Injectable({
  providedIn: 'root',
})
export class StaffService extends BaseService {
  constructor(http: HttpClient, private commonService: CommonService) {
    super(http);
  }

  public getStaffById(id: number): StaffDetail {
    return this.commonService.getStaffById(id);
  }

  public getStaffList(): Array<StaffDetail> {
    return this.commonService.getStaffList();
  }

  public getStaffsNameList(): Array<SimpleRecord> {
    return this.commonService.getStaffsNameList();
  }

  public getStaffsNameWithIdList(): Array<SimpleRecord> {
    return this.commonService.getStaffsNameWithIdList();
  }

  public addStaff(staff: Staff) {
    this.add(staff, APP_CONSTANT.localStorage.key.staffs);
  }

  public updateStaff(staff: Staff) {
    this.update(staff, APP_CONSTANT.localStorage.key.staffs);
  }

  public deleteStaff(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.staffs);
  }
}