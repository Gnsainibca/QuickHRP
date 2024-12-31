import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/data/base.service';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { Master_SymptomsType } from '../models/master-symptoms-type';
import { Master_SymptomsHead, Master_SymptomsHeadList } from '../models/master-symptoms-head';

@Injectable({
  providedIn: 'root',
})
export class SymptomsSetupService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

    // ********************************** Symptoms Head **************************************//

  public getSymptomsHeadList(): Array<Master_SymptomsHeadList> {
    let symptomsTypes = this.getSymptomsTypeList();
    let result: Array<Master_SymptomsHeadList> = [];
    this.getSymptomsHeads().forEach(item => {
      result.push(
        {
          ...item,
          type: symptomsTypes.find(x => x.id == item.typeId)?.name,
        });
    });
    return result;
  }

  public getSymptomsHeads(): Array<Master_SymptomsHeadList> {
    return this.list(APP_CONSTANT.localStorage.key.master_symptomsHeads) as Array<Master_SymptomsHeadList>;
  }

  public getSymptomsHead(id: number): Master_SymptomsHead {
    return this.get(id, APP_CONSTANT.localStorage.key.master_symptomsHeads) as Master_SymptomsHead;
  }

  public addSymptomsHead(symptomsHead: Master_SymptomsHead) {
    this.add(symptomsHead, APP_CONSTANT.localStorage.key.master_symptomsHeads);
  }

  public updateSymptomsHead(symptomsHead: Master_SymptomsHead) {
    this.update(symptomsHead, APP_CONSTANT.localStorage.key.master_symptomsHeads);
  }

  public deleteSymptomsHead(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_symptomsHeads);
  }

  // ********************************** Symptoms Type **************************************//

  public getSymptomsTypeList(): Array<Master_SymptomsType> {
    return this.list(APP_CONSTANT.localStorage.key.master_symptomsTypes) as Array<Master_SymptomsType>;
  }

  public getSymptomsType(id: number): Master_SymptomsType {
    return this.get(id, APP_CONSTANT.localStorage.key.master_symptomsTypes) as Master_SymptomsType;
  }

  public addSymptomsType(symptomsType: Master_SymptomsType) {
    this.add(symptomsType, APP_CONSTANT.localStorage.key.master_symptomsTypes);
  }

  public updateSymptomsType(symptomsType: Master_SymptomsType) {
    this.update(symptomsType, APP_CONSTANT.localStorage.key.master_symptomsTypes);
  }

  public deleteSymptomsType(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_symptomsTypes);
  }
}