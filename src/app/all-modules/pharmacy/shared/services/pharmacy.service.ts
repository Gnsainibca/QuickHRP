import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { DataService } from 'src/app/shared/core.index';
import { CommonService } from 'src/app/shared/data/common.service';
import { BadStockMedicine, Pharmacy, PharmacyList, PharmacyMedicine, PharmacyMedicineList, PurchaseMedicine, PurchaseMedicineList, PurchaseMedicineStock } from '../models/pharmacy';
import { SimpleRecord, SimpleRecordWithParent } from 'src/app/shared/models/simple-record';
import { MedicineAvailability } from 'src/app/shared/enums/medicine-availability';
import { BaseService } from 'src/app/shared/data/base.service';
import { PharmacySetupService } from 'src/app/all-modules/setup/pharmacy/shared/services/pharmacy-setup.service';
import { Prefix_Screen } from 'src/app/shared/enums/prefix-screen';
import { HospitalChargeSetupService } from 'src/app/all-modules/setup/hospital-charge/shared/services/hospital-charge-setup.service';
import { BillingInfo } from 'src/app/all-modules/opd/shared/models/billing-info';

@Injectable({
  providedIn: 'root',
})
export class PharmacyService extends BaseService {
  constructor(http: HttpClient, private data: DataService, private commonService: CommonService, private pharmacySetupService : PharmacySetupService,
    private hospitalChargeSetupService : HospitalChargeSetupService
  ) {
    super(http);
  }

  public getPharmacyList(): Array<PharmacyList> {
    let medicineCategories = this.pharmacySetupService.getMedicineCategoryList();
    let medicines = this.getMedicineNameList();
    let pharmacyMedicineList: Array<PharmacyList> = [];
    this.getPharmacies().forEach(pharmacytest => {
      pharmacyMedicineList.push({
        ...pharmacytest,
        patientName: this.commonService.getPatientById(pharmacytest.patientId)?.name,
        doctor: pharmacytest.referralDoctorId ? this.commonService.getDoctorById(pharmacytest.referralDoctorId)?.fullName : pharmacytest.doctorName,
        medicineInnerForm: pharmacytest.medicineInnerForm?.map(x => {
          return {
            ...x,
            category: medicineCategories.find(y => y.id == x.categoryId)?.name,
            medicineName: medicines.find(y => y.id == x.medicineId)?.name,
          }
        })
      });
    });
    return pharmacyMedicineList;
  }

  public getBillingInfo(caseId: string) {
    let totalCharge = this.getPharmacies().filter(x => x.caseId == caseId).reduce((sum, current) => sum + current.totalAmount, 0);
    let billingInfo: BillingInfo = {
      charge: totalCharge,
      paid: totalCharge
    };
    return billingInfo;
  }

  public getPharmacies(): Array<Pharmacy> {
    return this.list(APP_CONSTANT.localStorage.key.pharmacies) as Array<Pharmacy>;
  }

  public getPharmacyListByPatientId(id: number): Array<Pharmacy> {
    return this.getPharmacyList().filter(x=>x.patientId == id);
  }

  public getBillNo(): string {
    const pharmacies = this.list(APP_CONSTANT.localStorage.key.pharmacies) as Array<Pharmacy>;
    var maxId = Math.max(...pharmacies.map(o => o.id));
    return this.commonService.getNo((maxId + 1), Prefix_Screen.Pharmacy);
  }

  public addPharmacy(pharmacy: Pharmacy) {
    this.add(pharmacy, APP_CONSTANT.localStorage.key.pharmacies);
  }

  public updatePharmacy(pharmacy: Pharmacy) {
    this.update(pharmacy, APP_CONSTANT.localStorage.key.pharmacies);
  }

  public deletePharmacy(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.pharmacies);
  }

  //############################################# Start Pharmacy Medicine #################################################

  public getMedicineNameList(): Array<SimpleRecordWithParent> {
    let medicines = this.list(APP_CONSTANT.localStorage.key.pharmacyMedicines) as Array<PharmacyMedicineList>;
    return medicines.map(x => {
      return {
        id: x.id,
        name: x.name,
        parentId: x.categoryId
      }
    });
  }

  public getMedicineCategoryNameList(): Array<SimpleRecord> | undefined {
    let medicineCategories = this.pharmacySetupService.getMedicineCategoryList();
    let medicineCategoryIds = this.getMedicineNameList()?.map(x => x.parentId);
    return medicineCategories.filter(x => medicineCategoryIds?.includes(x.id)).map(x => {
      return {
        id: x.id,
        name: x.name
      }
    });
  }

  public getPurchaseMedicineBillNo(): string {
    const pharmacies: Array<PurchaseMedicine> = JSON.parse(localStorage.getItem(APP_CONSTANT.localStorage.key.purchaseMedicines)!);
    var maxId = pharmacies ? Math.max(...pharmacies.map(o => o.id)) : 0;
    return this.commonService.getNo(maxId + 1, Prefix_Screen.PharmacyPurchase);
  }

  public getPharmacyMedicineList(): Array<PharmacyMedicineList> {
    let medicineCategories = this.pharmacySetupService.getMedicineCategoryList();
    let units = this.pharmacySetupService.getMedicineUnitList();
    let medicineCompanies = this.pharmacySetupService.getMedicineCompanyList();
    let medicineGroups = this.pharmacySetupService.getMedicineGroupList();
    let pharmacyMedicineList: Array<PharmacyMedicineList> = [];

    this.getPharmacyMedicines().forEach(pharmacyMedicine => {
      let availableQty = this.getMedicinesAvailableQuantity(pharmacyMedicine.id);
      let status = availableQty <= 0 ? MedicineAvailability.outOfStock : (availableQty < pharmacyMedicine.minLevel ? MedicineAvailability.lowStock : 
        (availableQty < pharmacyMedicine.reOrderLevel ? MedicineAvailability.reOrder : MedicineAvailability.available));
      pharmacyMedicineList.push({
        ...pharmacyMedicine,
        availableQuantity: availableQty,
        status:  status,
        category: medicineCategories.find(x => x.id == pharmacyMedicine.categoryId)?.name,
        unit: units.find(x => x.id == pharmacyMedicine.unitId)?.name,
        group: medicineGroups.find(x => x.id == pharmacyMedicine.groupId)?.name,
        company: medicineCompanies.find(x => x.id == pharmacyMedicine.companyId)?.name,
        colorClass: status == MedicineAvailability.outOfStock ? 'text-danger' : (status == MedicineAvailability.reOrder ? 'text-info' :
          (status == MedicineAvailability.lowStock ? 'text-warning' : ''))
      });
    });
    return pharmacyMedicineList;
  }

  private getMedicinesAvailableQuantity (medicineId : number){
    let badStocks = this.getBadStockMedicines(medicineId)?.reduce((sum, currentItem) => sum + currentItem.quantity, 0);
    let allStocksCount = this.getMedicineStocks(medicineId)?.reduce((sum, currentItem) => sum + currentItem.quantity, 0);
    let soldMedicineCount = this.getSoldMedicineCount(medicineId);
    return allStocksCount - badStocks - soldMedicineCount;
  }

  public getPharmacyMedicines(): Array<PharmacyMedicine> {
    return this.list(APP_CONSTANT.localStorage.key.pharmacyMedicines) as Array<PharmacyMedicine>;
  }

  getPharmacyMedicineById(id: number): PharmacyMedicine | undefined {
    return this.getPharmacyMedicines()?.find(x => x.id == id);
  }

  public addPharmacyMedicine(pharmacyMedicine: PharmacyMedicine) {
    this.add(pharmacyMedicine, APP_CONSTANT.localStorage.key.pharmacyMedicines);
  }

  public updatePharmacyMedicine(pharmacyMedicine: PharmacyMedicine) {
    this.update(pharmacyMedicine, APP_CONSTANT.localStorage.key.pharmacyMedicines);
  }

  public deletePharmacyMedicine(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.pharmacyMedicines);
  }

  public addBadStockMedicine(badStockMedicine: BadStockMedicine) {
    this.add(badStockMedicine, APP_CONSTANT.localStorage.key.badStockMedicines);
  }

  //############################################# End Pharmacy #################################################

  public getPurchaseMedicineList(): Array<PurchaseMedicineList> {
    let paymentModes = this.hospitalChargeSetupService.getPaymentModeList();
    let medicineCategories = this.pharmacySetupService.getMedicineCategoryList();
    let suppliers = this.pharmacySetupService.getMedicineSupplierList();
    let medicines = this.getMedicineNameList();
    let pharmacyMedicineList: Array<PurchaseMedicineList> = [];
    let res = this.getPurchaseMedicines()
    res.forEach(pharmacyMedicine => {
      pharmacyMedicineList.push({
        ...pharmacyMedicine,
        supplier: suppliers.find(x => x.id == pharmacyMedicine.supplierId)?.name,
        paymentMode: paymentModes.find(x => x.id == pharmacyMedicine.paymentModeId)?.name,
        medicineInnerForm: pharmacyMedicine.medicineInnerForm?.map(x => {
          return {
            ...x,
            category: medicineCategories.find(y => y.id == x.categoryId)?.name,
            medicineName: medicines.find(y => y.id == x.medicineId)?.name,
          }
        })
      });
    });
    return pharmacyMedicineList;
  }

  public getPurchaseMedicines(): Array<PurchaseMedicine> {
    return this.list(APP_CONSTANT.localStorage.key.purchaseMedicines) as Array<PurchaseMedicine>;
  }

  getPurchaseMedicineById(id: number): PurchaseMedicineList | undefined {
    return this.getPurchaseMedicineList()?.find(x => x.id == id);
  }

  public addPurchaseMedicine(pharmacy: PurchaseMedicine) {
    this.add(pharmacy, APP_CONSTANT.localStorage.key.purchaseMedicines);
  }

  public updatePurchaseMedicine(pharmacy: PurchaseMedicine) {
    this.update(pharmacy, APP_CONSTANT.localStorage.key.purchaseMedicines);
  }

  public deletePurchaseMedicine(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.purchaseMedicines);
  }

  public getMedicineStocks(medicineId: number): Array<PurchaseMedicineStock> {
    let stocks: Array<PurchaseMedicineStock> = [];
    let purchasedMedicines = this.getPurchaseMedicines();
    purchasedMedicines.forEach(x => {
      x.medicineInnerForm?.filter(y => y.medicineId == medicineId).forEach(y => {
        stocks.push({ ...y, id: x.id, purchaseBillNo: x.billNo, purchaseDate: x.purchaseDate });
      });
    });
    return stocks;
  }

  private getSoldMedicineCount(medicineId: number): number {
    let soldMedicineCount : number = 0;
    this.getPharmacies().forEach(x => {
        x.medicineInnerForm?.filter(y => y.medicineId == medicineId).forEach(y => {
          soldMedicineCount += y.quantity;
        });
      });
    return soldMedicineCount;
  }

  public getBatcheNoByMedicineId(medicineId: number): Array<any> {
    let batches: Array<any> = [];
    this.getPurchaseMedicines().forEach(x => {
      x.medicineInnerForm?.filter(y => y.medicineId == medicineId).forEach(y => {
        batches.push({batchNo : y.batchNo,expiryDate : y.expiryDate, salePrice : y.salePrice, tax : y.tax, amount : y.amount});
      });
    });
    return batches;
  }

  public getBadStockMedicines(medicineId: number): Array<BadStockMedicine> {
    var localStoredBadStockMedicines = this.list(APP_CONSTANT.localStorage.key.badStockMedicines) as Array<BadStockMedicine>;
    return localStoredBadStockMedicines.filter(x => x.medicineId == medicineId);
  }

  public deleteBadStockMedicine(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.badStockMedicines);
  }
}