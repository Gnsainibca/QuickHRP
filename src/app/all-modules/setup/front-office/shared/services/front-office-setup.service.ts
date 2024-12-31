import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { BaseService } from 'src/app/shared/data/base.service';
import { Master_Source } from '../models/master-source';
import { Master_ComplainType } from '../models/master-complain-type';
import { Master_Purpose } from '../models/master-purpose';

@Injectable({
  providedIn: 'root',
})
export class FrontOfficeSetupService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  // ********************************** Purpose **************************************//

  public getPurposeList(): Array<Master_Purpose> {
    return this.list(APP_CONSTANT.localStorage.key.master_purposes) as Array<Master_Purpose>;
  }

  public getPurpose(id: number): Master_Purpose {
    return this.get(id, APP_CONSTANT.localStorage.key.master_purposes) as Master_Purpose;
  }

  public addPurpose(purpose: Master_Purpose) {
    this.add(purpose, APP_CONSTANT.localStorage.key.master_purposes);
  }

  public updatePurpose(purpose: Master_Purpose) {
    this.update(purpose, APP_CONSTANT.localStorage.key.master_purposes);
  }

  public deletePurpose(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_purposes);
  }

   // ********************************** ComplainType **************************************//

   public getComplainTypeList(): Array<Master_ComplainType> {
    return this.list(APP_CONSTANT.localStorage.key.master_complainTypes) as Array<Master_ComplainType>;
  }

  public getComplainType(id: number): Master_ComplainType {
    return this.get(id, APP_CONSTANT.localStorage.key.master_complainTypes) as Master_ComplainType;
  }

  public addComplainType(complainType: Master_ComplainType) {
    this.add(complainType, APP_CONSTANT.localStorage.key.master_complainTypes);
  }

  public updateComplainType(complainType: Master_ComplainType) {
    this.update(complainType, APP_CONSTANT.localStorage.key.master_complainTypes);
  }

  public deleteComplainType(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_complainTypes);
  }

  // ********************************** Source **************************************//

  public getSourceList(): Array<Master_Source> {
    return this.list(APP_CONSTANT.localStorage.key.master_sources) as Array<Master_Source>;
  }

  public getSource(id: number): Master_Source {
    return this.get(id, APP_CONSTANT.localStorage.key.master_sources) as Master_Source;
  }

  public addSource(source: Master_Source) {
    this.add(source, APP_CONSTANT.localStorage.key.master_sources);
  }

  public updateSource(source: Master_Source) {
    this.update(source, APP_CONSTANT.localStorage.key.master_sources);
  }

  public deleteSource(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_sources);
  }
}