import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { BaseService } from 'src/app/shared/data/base.service';
import { Master_Operation, Master_OperationList } from '../models/master_operation';
import { Master_OperationCategory } from '../models/master_operation-category';

@Injectable({
  providedIn: 'root',
})
export class OperationSetupService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  // ********************************** Operation **************************************//

  public getOperationList(): Array<Master_OperationList> {
      let result: Array<Master_OperationList> = [];
      let operationCategories = this.getOperationCategoryList();
      this.getOperations().forEach(item=> {
        result.push({
             ...item,
             operationCategory: operationCategories.find(y => y.id === item.operationCategoryId)!.name,
         })
      });
      return result;
  }

  public getOperations(): Array<Master_Operation> {
    return this.list(APP_CONSTANT.localStorage.key.master_operations) as Array<Master_Operation>;
  }

  public getOperation(id: number): Master_Operation {
    return this.get(id, APP_CONSTANT.localStorage.key.master_operations) as Master_Operation;
  }

  public addOperation(operation: Master_Operation) {
    this.add(operation, APP_CONSTANT.localStorage.key.master_operations);
  }

  public updateOperation(operation: Master_Operation) {
    this.update(operation, APP_CONSTANT.localStorage.key.master_operations);
  }

  public deleteOperation(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_operations);
  }

  // ********************************** Operation Category **************************************//

  public getOperationCategoryList(): Array<Master_OperationCategory> {
    return this.list(APP_CONSTANT.localStorage.key.master_operationCategories) as Array<Master_OperationCategory>;
  }

  public getOperationCategory(id: number): Master_OperationCategory {
    return this.get(id, APP_CONSTANT.localStorage.key.master_operationCategories) as Master_OperationCategory;
  }

  public addOperationCategory(operationCategory: Master_OperationCategory) {
    this.add(operationCategory, APP_CONSTANT.localStorage.key.master_operationCategories);
  }

  public updateOperationCategory(operationCategory: Master_OperationCategory) {
    this.update(operationCategory, APP_CONSTANT.localStorage.key.master_operationCategories);
  }

  public deleteOperationCategory(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_operationCategories);
  }
}