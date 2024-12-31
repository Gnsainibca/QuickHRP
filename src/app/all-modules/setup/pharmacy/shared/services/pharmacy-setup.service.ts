import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/data/base.service';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { Master_MedicineGroup } from '../models/master-medicine-group';
import { Master_MedicineUnit } from '../models/master-medicine-unit';
import { Master_MedicineCompany } from '../models/master-medicine-company';
import { Master_MedicineDoseDuration } from '../models/master-medicine-dose-duration';
import { Master_MedicineDoseInterval } from '../models/master-medicine-dose-interval';
import { Master_MedicineDosage, Master_MedicineDosageList } from '../models/master-medicine-dosage';
import { Master_MedicineCategory } from '../models/master-medicine-category';
import { Master_MedicineSupplier } from '../models/master-medicine-supplier';

@Injectable({
  providedIn: 'root',
})
export class PharmacySetupService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

// ********************************** Medicine Category **************************************//

public getMedicineCategoryList(): Array<Master_MedicineCategory> {
  return this.list(APP_CONSTANT.localStorage.key.master_medicineCategories) as Array<Master_MedicineCategory>;
}

public getMedicineCategory(id: number): Master_MedicineCategory {
  return this.get(id, APP_CONSTANT.localStorage.key.master_medicineCategories) as Master_MedicineCategory;
}

public addMedicineCategory(medicineCategory: Master_MedicineCategory) {
  this.add(medicineCategory, APP_CONSTANT.localStorage.key.master_medicineCategories);
}

public updateMedicineCategory(medicineCategory: Master_MedicineCategory) {
  this.update(medicineCategory, APP_CONSTANT.localStorage.key.master_medicineCategories);
}

public deleteMedicineCategory(id: number) {
  this.delete(id, APP_CONSTANT.localStorage.key.master_medicineCategories);
}


// ********************************** Medicine Supplier **************************************//

public getMedicineSupplierList(): Array<Master_MedicineSupplier> {
  return this.list(APP_CONSTANT.localStorage.key.master_medicineSuppliers) as Array<Master_MedicineSupplier>;
}

public getMedicineSupplier(id: number): Master_MedicineSupplier {
  return this.get(id, APP_CONSTANT.localStorage.key.master_medicineSuppliers) as Master_MedicineSupplier;
}

public addMedicineSupplier(medicineSupplier: Master_MedicineSupplier) {
  this.add(medicineSupplier, APP_CONSTANT.localStorage.key.master_medicineSuppliers);
}

public updateMedicineSupplier(medicineSupplier: Master_MedicineSupplier) {
  this.update(medicineSupplier, APP_CONSTANT.localStorage.key.master_medicineSuppliers);
}

public deleteMedicineSupplier(id: number) {
  this.delete(id, APP_CONSTANT.localStorage.key.master_medicineSuppliers);
}


// ********************************** Medicine Dosage **************************************//

public getMedicineDosageList(): Array<Master_MedicineDosageList> {
  let medicineCategorys = this.getMedicineCategoryList();
  let medicineUnits = this.getMedicineUnitList();

  let result: Array<Master_MedicineDosageList> = [];
  this.getMedicineDosages().forEach(item => {
      result.push(
        { 
          ...item, 
          medicineCategory: medicineCategorys.find(x=>x.id == item.medicineCategoryId)?.name,
          medicineUnit: medicineUnits.find(x=>x.id == item.medicineUnitId)?.name,
        });
  });
  return result;
}

public getMedicineDosages(): Array<Master_MedicineDosageList> {
  return this.list(APP_CONSTANT.localStorage.key.master_medicineDosages) as Array<Master_MedicineDosageList>;
}

public getMedicineDosage(id: number): Master_MedicineDosage {
  return this.get(id, APP_CONSTANT.localStorage.key.master_medicineDosages) as Master_MedicineDosage;
}

public addMedicineDosage(medicineDosage: Master_MedicineDosage) {
  this.add(medicineDosage, APP_CONSTANT.localStorage.key.master_medicineDosages);
}

public updateMedicineDosage(medicineDosage: Master_MedicineDosage) {
  this.update(medicineDosage, APP_CONSTANT.localStorage.key.master_medicineDosages);
}

public deleteMedicineDosage(id: number) {
  this.delete(id, APP_CONSTANT.localStorage.key.master_medicineDosages);
}


// ********************************** Medicine Interval **************************************//

public getMedicineDoseIntervalList(): Array<Master_MedicineDoseInterval> {
  return this.list(APP_CONSTANT.localStorage.key.master_medicineDoseIntervals) as Array<Master_MedicineDoseInterval>;
}

public getMedicineDoseInterval(id: number): Master_MedicineDoseInterval {
  return this.get(id, APP_CONSTANT.localStorage.key.master_medicineDoseIntervals) as Master_MedicineDoseInterval;
}

public addMedicineDoseInterval(medicineDoseInterval: Master_MedicineDoseInterval) {
  this.add(medicineDoseInterval, APP_CONSTANT.localStorage.key.master_medicineDoseIntervals);
}

public updateMedicineDoseInterval(medicineDoseInterval: Master_MedicineDoseInterval) {
  this.update(medicineDoseInterval, APP_CONSTANT.localStorage.key.master_medicineDoseIntervals);
}

public deleteMedicineDoseInterval(id: number) {
  this.delete(id, APP_CONSTANT.localStorage.key.master_medicineDoseIntervals);
}


// ********************************** Medicine Dose Duration **************************************//

public getMedicineDoseDurationList(): Array<Master_MedicineDoseDuration> {
  return this.list(APP_CONSTANT.localStorage.key.master_medicineDosageDurations) as Array<Master_MedicineDoseDuration>;
}

public getMedicineDoseDuration(id: number): Master_MedicineDoseDuration {
  return this.get(id, APP_CONSTANT.localStorage.key.master_medicineDosageDurations) as Master_MedicineDoseDuration;
}

public addMedicineDoseDuration(medicineDosageDuration: Master_MedicineDoseDuration) {
  this.add(medicineDosageDuration, APP_CONSTANT.localStorage.key.master_medicineDosageDurations);
}

public updateMedicineDoseDuration(medicineDosageDuration: Master_MedicineDoseDuration) {
  this.update(medicineDosageDuration, APP_CONSTANT.localStorage.key.master_medicineDosageDurations);
}

public deleteMedicineDoseDuration(id: number) {
  this.delete(id, APP_CONSTANT.localStorage.key.master_medicineDosageDurations);
}

// ********************************** Medicine Unit **************************************//

public getMedicineUnitList(): Array<Master_MedicineUnit> {
  return this.list(APP_CONSTANT.localStorage.key.master_medicineUnits) as Array<Master_MedicineUnit>;
}

public getMedicineUnit(id: number): Master_MedicineUnit {
  return this.get(id, APP_CONSTANT.localStorage.key.master_medicineUnits) as Master_MedicineUnit;
}

public addMedicineUnit(medicineUnit: Master_MedicineUnit) {
  this.add(medicineUnit, APP_CONSTANT.localStorage.key.master_medicineUnits);
}

public updateMedicineUnit(medicineUnit: Master_MedicineUnit) {
  this.update(medicineUnit, APP_CONSTANT.localStorage.key.master_medicineUnits);
}

public deleteMedicineUnit(id: number) {
  this.delete(id, APP_CONSTANT.localStorage.key.master_medicineUnits);
}

  // ********************************** Medicine Company **************************************//

  public getMedicineCompanyList(): Array<Master_MedicineCompany> {
    return this.list(APP_CONSTANT.localStorage.key.master_medicineCompanies) as Array<Master_MedicineCompany>;
  }

  public getMedicineCompany(id: number): Master_MedicineCompany {
    return this.get(id, APP_CONSTANT.localStorage.key.master_medicineCompanies) as Master_MedicineCompany;
  }

  public addMedicineCompany(medicineCompany: Master_MedicineCompany) {
    this.add(medicineCompany, APP_CONSTANT.localStorage.key.master_medicineCompanies);
  }

  public updateMedicineCompany(medicineCompany: Master_MedicineCompany) {
    this.update(medicineCompany, APP_CONSTANT.localStorage.key.master_medicineCompanies);
  }

  public deleteMedicineCompany(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_medicineCompanies);
  }


  // ********************************** Medicine Group **************************************//

  public getMedicineGroupList(): Array<Master_MedicineGroup> {
    return this.list(APP_CONSTANT.localStorage.key.master_medicineGroups) as Array<Master_MedicineGroup>;
  }

  public getMedicineGroup(id: number): Master_MedicineGroup {
    return this.get(id, APP_CONSTANT.localStorage.key.master_medicineGroups) as Master_MedicineGroup;
  }

  public addMedicineGroup(medicineGroup: Master_MedicineGroup) {
    this.add(medicineGroup, APP_CONSTANT.localStorage.key.master_medicineGroups);
  }

  public updateMedicineGroup(medicineGroup: Master_MedicineGroup) {
    this.update(medicineGroup, APP_CONSTANT.localStorage.key.master_medicineGroups);
  }

  public deleteMedicineGroup(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_medicineGroups);
  }

}