import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/data/base.service';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { Master_RadiologyCategory } from '../models/master-radiology-category';
import { Master_RadiologyUnit } from '../models/master-radiology-unit';
import { Master_RadiologyParameter, Master_RadiologyParameterList } from '../models/master-radiology-parameter';

@Injectable({
  providedIn: 'root',
})
export class RadiologySetupService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  // ********************************** Radiology Category **************************************//

  public getRadiologyCategoryList(): Array<Master_RadiologyCategory> {
    return this.list(APP_CONSTANT.localStorage.key.master_radiologyCategories) as Array<Master_RadiologyCategory>;
  }

  public getRadiologyCategory(id: number): Master_RadiologyCategory {
    return this.get(id, APP_CONSTANT.localStorage.key.master_radiologyCategories) as Master_RadiologyCategory;
  }

  public addRadiologyCategory(radiologyCategory: Master_RadiologyCategory) {
    this.add(radiologyCategory, APP_CONSTANT.localStorage.key.master_radiologyCategories);
  }

  public updateRadiologyCategory(radiologyCategory: Master_RadiologyCategory) {
    this.update(radiologyCategory, APP_CONSTANT.localStorage.key.master_radiologyCategories);
  }

  public deleteRadiologyCategory(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_radiologyCategories);
  }

  // ********************************** Radiology Parameter **************************************//

  public getRadiologyParameterList(): Array<Master_RadiologyParameterList> {
    let radiologyUnits = this.getRadiologyUnitList();
    let result: Array<Master_RadiologyParameterList> = [];
    this.getRadiologyParameters().forEach(item => {
      result.push(
        {
          ...item,
          radiologyUnit: radiologyUnits.find(x => x.id == item.radiologyUnitId)?.name,
        });
    });
    return result;
  }

  public getRadiologyParameters(): Array<Master_RadiologyParameterList> {
    return this.list(APP_CONSTANT.localStorage.key.master_radiologyParameters) as Array<Master_RadiologyParameterList>;
  }

  public getRadiologyParameter(id: number): Master_RadiologyParameter {
    return this.get(id, APP_CONSTANT.localStorage.key.master_radiologyParameters) as Master_RadiologyParameter;
  }

  public addRadiologyParameter(radiologyParameter: Master_RadiologyParameter) {
    this.add(radiologyParameter, APP_CONSTANT.localStorage.key.master_radiologyParameters);
  }

  public updateRadiologyParameter(radiologyParameter: Master_RadiologyParameter) {
    this.update(radiologyParameter, APP_CONSTANT.localStorage.key.master_radiologyParameters);
  }

  public deleteRadiologyParameter(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_radiologyParameters);
  }

  // ********************************** Radiology Unit **************************************//

  public getRadiologyUnitList(): Array<Master_RadiologyUnit> {
    return this.list(APP_CONSTANT.localStorage.key.master_radiologyUnits) as Array<Master_RadiologyUnit>;
  }

  public getRadiologyUnit(id: number): Master_RadiologyUnit {
    return this.get(id, APP_CONSTANT.localStorage.key.master_radiologyUnits) as Master_RadiologyUnit;
  }

  public addRadiologyUnit(radiologyUnit: Master_RadiologyUnit) {
    this.add(radiologyUnit, APP_CONSTANT.localStorage.key.master_radiologyUnits);
  }

  public updateRadiologyUnit(radiologyUnit: Master_RadiologyUnit) {
    this.update(radiologyUnit, APP_CONSTANT.localStorage.key.master_radiologyUnits);
  }

  public deleteRadiologyUnit(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_radiologyUnits);
  }
}