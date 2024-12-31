import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/data/base.service';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { SimpleRecord, SimpleRecordWithCharge } from 'src/app/shared/models/simple-record';
import { Master_HospitalCharge, Master_HospitalChargeDetails } from '../models/master_hospital-charge';
import { Master_HospitalChargeType } from '../models/master_hospital-charge-type';
import { Master_HospitalChargeCategory, Master_HospitalChargeCategoryDetails } from '../models/master_hospital-charge-category';
import { Master_HospitalChargeUnitType } from '../models/master_hospital-charge-unit-type';
import { Master_HospitalChargeTaxCategory } from '../models/master_hospital-charge-tax-category';
import { Master_PaymentMode } from '../models/master_payment-mode';

@Injectable({
  providedIn: 'root',
})
export class HospitalChargeSetupService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

// ********************************** Hospital Charge **************************************//

  public getHospitalChargeList(): Array<Master_HospitalChargeDetails> {
    let chargeTypes = this.list(APP_CONSTANT.localStorage.key.master_chargeTypes) as Array<Master_HospitalChargeType>;
    let chargeCategories = this.list(APP_CONSTANT.localStorage.key.master_chargeCategories) as Array<Master_HospitalChargeCategory>;
    let unitTypes = this.list(APP_CONSTANT.localStorage.key.master_unitTypes) as Array<Master_HospitalChargeUnitType>;
    let taxCategories = this.list(APP_CONSTANT.localStorage.key.master_taxCategories) as Array<Master_HospitalChargeTaxCategory>;

    let result: Array<Master_HospitalChargeDetails> = [];
    this.list(APP_CONSTANT.localStorage.key.master_hospitalCharges).forEach(item => {
      result.push(
        {
          ...item,
          chargeType: chargeTypes.find(x => x.id == item.chargeTypeId)?.name,
          chargeCategory: chargeCategories.find(x => x.id == item.chargeCategoryId)?.name,
          unitType: unitTypes.find(x => x.id == item.unitTypeId)?.name,
          taxCategory: taxCategories.find(x => x.id == item.taxCategoryId)?.name,
        })
    });
    return result;
  }

  public getHospitalCharges() : Array<Master_HospitalCharge> {
    return this.list(APP_CONSTANT.localStorage.key.master_hospitalCharges) as Array<Master_HospitalCharge>;
  }

  public getHospitalCharge(id: number): Master_HospitalChargeDetails {
    return this.getHospitalChargeList()?.find(x => x.id == id) as Master_HospitalChargeDetails;
  }

  public getChargesByChargeCategoriesId(ids: Array<number>): Array<SimpleRecordWithCharge> {
    let result: Array<SimpleRecordWithCharge> = [];
    this.getHospitalCharges().filter(x=> ids.includes(x.chargeCategoryId)).filter(item => {
        result.push({ id: item.id, name: item.name,  parentId : item.chargeCategoryId, tax : item.tax, amount : item.standardCharge});
      });
    return result;
  }

  public getChargesByModuleId(moduleId: number): Array<SimpleRecordWithCharge> {
    let result: Array<SimpleRecordWithCharge> = [];
    this.getHospitalCharges().filter(x=>x.chargeTypeId==moduleId).filter(item => {
        result.push({ id: item.id, name: item.name,  parentId : item.chargeCategoryId, tax : item.tax, amount : item.standardCharge});
      });
    return result;
  }

  public addHospitalCharge(hospitalCharge: Master_HospitalCharge) {
    this.add(hospitalCharge, APP_CONSTANT.localStorage.key.master_hospitalCharges);
  }
  
  public updateHospitalCharge(hospitalCharge: Master_HospitalCharge) {
    this.update(hospitalCharge, APP_CONSTANT.localStorage.key.master_hospitalCharges);
  }
  
  public deleteHospitalCharge(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_hospitalCharges);
  }

  // ********************************** Charge Category **************************************//

  public getChargeCategoriesByModuleId(moduleId: number): Array<SimpleRecord> {
    let chargeTypeIds = this.getChargeTypesByModuleId(moduleId).map(x => x.id);
    return this.getChargeCategories().filter(x => chargeTypeIds.includes(x.chargeTypeId)).map(x => {
      return {
        id: x.id,
        name: x.name
      }
    });
  }

  public getChargeCategories(): Array<Master_HospitalChargeCategory> {
    return this.list(APP_CONSTANT.localStorage.key.master_chargeCategories) as Array<Master_HospitalChargeCategory>;
  }

  public getChargeCategoryList(): Array<Master_HospitalChargeCategoryDetails> {
    let chargeTypes = this.list(APP_CONSTANT.localStorage.key.master_chargeTypes) as Array<Master_HospitalChargeType>;
    let result: Array<Master_HospitalChargeCategoryDetails> = [];
    this.getChargeCategories().forEach(item => {
      result.push({ ...item, chargeType: chargeTypes.find(x => x.id == item.chargeTypeId)?.name })
    });
    return result;
  }

  public getChargeCategory(id: number): Master_HospitalChargeCategory {
    return this.get(id, APP_CONSTANT.localStorage.key.master_chargeCategories) as Master_HospitalChargeCategory;
  }

  public addChargeCategory(chargeType: Master_HospitalChargeCategory) {
    this.add(chargeType, APP_CONSTANT.localStorage.key.master_chargeCategories);
  }

  public updateChargeCategory(chargeType: Master_HospitalChargeCategory) {
    this.update(chargeType, APP_CONSTANT.localStorage.key.master_chargeCategories);
  }

  public deleteChargeCategory(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_chargeCategories);
  }

  // ********************************** Charge Type **************************************//

  public getChargeTypesByModuleId(moduleId: number): Array<SimpleRecord> {
    let result: Array<SimpleRecord> = [];
    this.getChargeTypes().forEach(item => {
      item.moduleInnerForm.filter(x => x.id == moduleId && x.selected).filter(x => {
        result.push({ id: item.id, name: item.name });
      });
    });
    return result;
  }

  public getChargeTypes(): Array<Master_HospitalChargeType> {
    return this.list(APP_CONSTANT.localStorage.key.master_chargeTypes) as Array<Master_HospitalChargeType>;
  }

  public getChargeType(id: number): Master_HospitalChargeType {
    return this.get(id, APP_CONSTANT.localStorage.key.master_chargeTypes) as Master_HospitalChargeType;
  }

  public addChargeType(chargeType: Master_HospitalChargeType) {
    this.add(chargeType, APP_CONSTANT.localStorage.key.master_chargeTypes);
  }

  public updateChargeType(chargeType: Master_HospitalChargeType) {
    this.update(chargeType, APP_CONSTANT.localStorage.key.master_chargeTypes);
  }

  public deleteChargeType(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_chargeTypes);
  }

  // ********************************** Tax Category **************************************//

  public getTaxCategories(): Array<Master_HospitalChargeTaxCategory> {
    return this.list(APP_CONSTANT.localStorage.key.master_taxCategories) as Array<Master_HospitalChargeTaxCategory>;
  }

  public getTaxCategory(id: number): Master_HospitalChargeTaxCategory {
    return this.get(id, APP_CONSTANT.localStorage.key.master_taxCategories) as Master_HospitalChargeTaxCategory;
  }

  public addTaxCategory(taxCategory: Master_HospitalChargeTaxCategory) {
    this.add(taxCategory, APP_CONSTANT.localStorage.key.master_taxCategories);
  }

  public updateTaxCategory(taxCategory: Master_HospitalChargeTaxCategory) {
    this.update(taxCategory, APP_CONSTANT.localStorage.key.master_taxCategories);
  }

  public deleteTaxCategory(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_taxCategories);
  }

  // ********************************** Unit Type **************************************//

  public getUnitTypeList(): Array<Master_HospitalChargeUnitType> {
    return this.list(APP_CONSTANT.localStorage.key.master_unitTypes) as Array<Master_HospitalChargeUnitType>;
  }

  public getUnitType(id: number): Master_HospitalChargeUnitType {
    return this.get(id, APP_CONSTANT.localStorage.key.master_unitTypes) as Master_HospitalChargeUnitType;
  }

  public addUnitType(unitType: Master_HospitalChargeUnitType) {
    this.add(unitType, APP_CONSTANT.localStorage.key.master_unitTypes);
  }

  public updateUnitType(unitType: Master_HospitalChargeUnitType) {
    this.update(unitType, APP_CONSTANT.localStorage.key.master_unitTypes);
  }

  public deleteUnitType(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_unitTypes);
  }

  // ********************************** Payment Mode **************************************//

  public getPaymentModeList(): Array<Master_PaymentMode> {
    return this.list(APP_CONSTANT.localStorage.key.master_paymentModes) as Array<Master_PaymentMode>;
  }

  public getPaymentMode(id: number): Master_PaymentMode {
    return this.get(id, APP_CONSTANT.localStorage.key.master_paymentModes) as Master_PaymentMode;
  }

  public addPaymentMode(paymentMode: Master_PaymentMode) {
    this.add(paymentMode, APP_CONSTANT.localStorage.key.master_paymentModes);
  }

  public updatePaymentMode(paymentMode: Master_PaymentMode) {
    this.update(paymentMode, APP_CONSTANT.localStorage.key.master_paymentModes);
  }

  public deletePaymentMode(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_paymentModes);
  }
}