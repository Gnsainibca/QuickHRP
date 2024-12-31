import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/data/base.service';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { Master_FindingsCategory } from '../models/master-findings-category';
import { Master_Findings, Master_FindingsList } from '../models/master-findings';

@Injectable({
  providedIn: 'root',
})
export class FindingsSetupService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

    // ********************************** Findings  **************************************//

  public getFindingsList(): Array<Master_FindingsList> {
    let findingsCategorys = this.getFindingsCategoryList();
    let result: Array<Master_FindingsList> = [];
    this.getFindings().forEach(item => {
      result.push(
        {
          ...item,
          category: findingsCategorys.find(x => x.id == item.categoryId)?.name,
        });
    });
    return result;
  }

  public getFindings(): Array<Master_FindingsList> {
    return this.list(APP_CONSTANT.localStorage.key.master_findings) as Array<Master_FindingsList>;
  }

  public getFinding(id: number): Master_Findings {
    return this.get(id, APP_CONSTANT.localStorage.key.master_findings) as Master_Findings;
  }

  public addFindings(findings: Master_Findings) {
    this.add(findings, APP_CONSTANT.localStorage.key.master_findings);
  }

  public updateFindings(findings: Master_Findings) {
    this.update(findings, APP_CONSTANT.localStorage.key.master_findings);
  }

  public deleteFindings(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_findings);
  }

  // ********************************** Findings Category **************************************//

  public getFindingsCategoryList(): Array<Master_FindingsCategory> {
    return this.list(APP_CONSTANT.localStorage.key.master_findingsCategories) as Array<Master_FindingsCategory>;
  }

  public getFindingsCategory(id: number): Master_FindingsCategory {
    return this.get(id, APP_CONSTANT.localStorage.key.master_findingsCategories) as Master_FindingsCategory;
  }

  public addFindingsCategory(findingsCategory: Master_FindingsCategory) {
    this.add(findingsCategory, APP_CONSTANT.localStorage.key.master_findingsCategories);
  }

  public updateFindingsCategory(findingsCategory: Master_FindingsCategory) {
    this.update(findingsCategory, APP_CONSTANT.localStorage.key.master_findingsCategories);
  }

  public deleteFindingsCategory(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_findingsCategories);
  }
}