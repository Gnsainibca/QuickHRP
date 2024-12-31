import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/data/base.service';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { Master_PathologyCategory } from '../models/master-pathology-category';
import { Master_PathologyUnit } from '../models/master-pathology-unit';
import { Master_PathologyParameter, Master_PathologyParameterList } from '../models/master-pathology-parameter';

@Injectable({
  providedIn: 'root',
})
export class PathologySetupService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  // ********************************** Pathology Category **************************************//

  public getPathologyCategoryList(): Array<Master_PathologyCategory> {
    return this.list(APP_CONSTANT.localStorage.key.master_pathologyCategories) as Array<Master_PathologyCategory>;
  }

  public getPathologyCategory(id: number): Master_PathologyCategory {
    return this.get(id, APP_CONSTANT.localStorage.key.master_pathologyCategories) as Master_PathologyCategory;
  }

  public addPathologyCategory(pathologyCategory: Master_PathologyCategory) {
    this.add(pathologyCategory, APP_CONSTANT.localStorage.key.master_pathologyCategories);
  }

  public updatePathologyCategory(pathologyCategory: Master_PathologyCategory) {
    this.update(pathologyCategory, APP_CONSTANT.localStorage.key.master_pathologyCategories);
  }

  public deletePathologyCategory(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_pathologyCategories);
  }

  // ********************************** Pathology Parameter **************************************//

  public getPathologyParameterList(): Array<Master_PathologyParameterList> {
    let pathologyUnits = this.getPathologyUnitList();
    let result: Array<Master_PathologyParameterList> = [];
    this.getPathologyParameters().forEach(item => {
      result.push(
        {
          ...item,
          pathologyUnit: pathologyUnits.find(x => x.id == item.pathologyUnitId)?.name,
        });
    });
    return result;
  }

  public getPathologyParameters(): Array<Master_PathologyParameterList> {
    return this.list(APP_CONSTANT.localStorage.key.master_pathologyParameters) as Array<Master_PathologyParameterList>;
  }

  public getPathologyParameter(id: number): Master_PathologyParameter {
    return this.get(id, APP_CONSTANT.localStorage.key.master_pathologyParameters) as Master_PathologyParameter;
  }

  public addPathologyParameter(pathologyParameter: Master_PathologyParameter) {
    this.add(pathologyParameter, APP_CONSTANT.localStorage.key.master_pathologyParameters);
  }

  public updatePathologyParameter(pathologyParameter: Master_PathologyParameter) {
    this.update(pathologyParameter, APP_CONSTANT.localStorage.key.master_pathologyParameters);
  }

  public deletePathologyParameter(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_pathologyParameters);
  }

  // ********************************** Pathology Unit **************************************//

  public getPathologyUnitList(): Array<Master_PathologyUnit> {
    return this.list(APP_CONSTANT.localStorage.key.master_pathologyUnits) as Array<Master_PathologyUnit>;
  }

  public getPathologyUnit(id: number): Master_PathologyUnit {
    return this.get(id, APP_CONSTANT.localStorage.key.master_pathologyUnits) as Master_PathologyUnit;
  }

  public addPathologyUnit(pathologyUnit: Master_PathologyUnit) {
    this.add(pathologyUnit, APP_CONSTANT.localStorage.key.master_pathologyUnits);
  }

  public updatePathologyUnit(pathologyUnit: Master_PathologyUnit) {
    this.update(pathologyUnit, APP_CONSTANT.localStorage.key.master_pathologyUnits);
  }

  public deletePathologyUnit(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_pathologyUnits);
  }
}