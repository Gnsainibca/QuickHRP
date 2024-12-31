import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { DataService } from 'src/app/shared/core.index';
import { Radiology, RadiologyApproveReport, RadiologyList, RadiologySampleCollected, RadiologyTest, RadiologyTestList } from '../models/radiology';
import { CommonService } from 'src/app/shared/data/common.service';
import { BaseService } from 'src/app/shared/data/base.service';
import { RadiologySetupService } from 'src/app/all-modules/setup/radiology/shared/services/radiology-setup.service';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { HospitalChargeSetupService } from 'src/app/all-modules/setup/hospital-charge/shared/services/hospital-charge-setup.service';
import { Charge_Module } from 'src/app/shared/enums/charge-module';
import { Prefix_Screen } from 'src/app/shared/enums/prefix-screen';
import { BillingInfo } from 'src/app/all-modules/opd/shared/models/billing-info';

@Injectable({
  providedIn: 'root',
})
export class RadiologyDataService extends BaseService {
  constructor(http: HttpClient, private data: DataService, private commonService: CommonService, private radiologySetupService: RadiologySetupService,
    private hospitalChargeSetupService: HospitalChargeSetupService
  ) {
    super(http);
  }

  public getRadiologyList(): Array<RadiologyList> {
    let radiologyTestList: Array<RadiologyList> = [];
    let radiologists = this.commonService.getRadiologistsNameList();
    this.getRadiologies().forEach(radiologytest => {
      radiologyTestList.push({
        ...radiologytest,
        patientName: this.commonService.getPatientById(radiologytest.patientId)?.name,
        doctor: radiologytest.referralDoctorId ? this.commonService.getDoctorById(radiologytest.referralDoctorId)?.fullName : radiologytest.doctorName,
        testInnerForm: radiologytest.testInnerForm?.map(x => {
          return {
            ...x,
            name: this.getRadiologyTestById(x.testId)?.name!,
            radiologySampleCollected: {
              ...x.radiologySampleCollected,
              collectedBy: radiologists.find(y => y.id === x.radiologySampleCollected?.collectedById)?.name,
            },
            radiologyApproveReport: {
              ...x.radiologyApproveReport,
              approvedBy: radiologists.find(y => y.id === x.radiologyApproveReport?.approvedById)?.name,
            }
          }
        })
      });
    });
    return radiologyTestList;
  }

  public getBillingInfo(caseId: string) {
    let totalCharge = this.getRadiologies().filter(x => x.caseId == caseId).reduce((sum, current) => sum + current.totalAmount, 0);
    let billingInfo: BillingInfo = {
      charge: totalCharge,
      paid: totalCharge
    };
    return billingInfo;
  }

  public getRadiologies(): Array<Radiology> {
    return this.list(APP_CONSTANT.localStorage.key.radiologies) as Array<Radiology>;
  }

  public getRadiologyById(id: number): Radiology {
    return this.getRadiologies().find(x => x.id == id) as Radiology;
  }

  public getBillNo(): string {
    const radiologies: Array<Radiology> = JSON.parse(localStorage.getItem(APP_CONSTANT.localStorage.key.radiologies)!);
    var maxId = radiologies.length > 0 ? Math.max(...radiologies.map(o => o.id)) : 0;
    return this.commonService.getNo(maxId + 1, Prefix_Screen.Radiology);
  }

  public addRadiology(radiology: Radiology) {
    this.add(radiology, APP_CONSTANT.localStorage.key.radiologies);
  }

  public updateRadiology(radiology: Radiology) {
    this.update(radiology, APP_CONSTANT.localStorage.key.radiologies);
  }

  public deleteRadiology(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.radiologies);
  }

  public updateSampleCollection(sampleCollected: RadiologySampleCollected, id: number, testId: number) {
    const radiologies: Array<Radiology> = JSON.parse(localStorage.getItem(APP_CONSTANT.localStorage.key.radiologies)!);

    let radiology = radiologies.find(x => x.id === id);
    let radiologyTest = radiology?.testInnerForm?.find(x => x.testId === testId)!;
    radiologyTest.radiologySampleCollected = sampleCollected;

    // set on local storage
    localStorage.setItem(APP_CONSTANT.localStorage.key.radiologies, JSON.stringify(radiologies));
  }

  public updateApprovedReport(approveReport: RadiologyApproveReport, id: number, testId: number) {
    const radiologies: Array<Radiology> = JSON.parse(localStorage.getItem(APP_CONSTANT.localStorage.key.radiologies)!);

    let radiology = radiologies.find(x => x.id === id);
    let radiologyTest = radiology?.testInnerForm?.find(x => x.testId === testId)!;
    radiologyTest.radiologyApproveReport = approveReport;

    // set on local storage
    localStorage.setItem(APP_CONSTANT.localStorage.key.radiologies, JSON.stringify(radiologies));
  }

  //############################################# Start Radiology Test #################################################

  public getRadiologyTestList(): Array<RadiologyTestList> {
    let radiologyCategoryList = this.radiologySetupService.getRadiologyCategoryList();
    let radiologyParameterList = this.radiologySetupService.getRadiologyParameterList();
    let radiologyChargeCategoryList = this.hospitalChargeSetupService.getChargeCategoriesByModuleId(Charge_Module.Radiology);
    let radiologyChargeList = this.hospitalChargeSetupService.getChargesByChargeCategoriesId(radiologyChargeCategoryList.map(x => x.id));
    let radiologyTestList: Array<RadiologyTestList> = [];
    this.getRadiologyTests().forEach(radiologytest => {
      radiologyTestList.push({
        ...radiologytest,
        netAmount: radiologytest.chargeId > 0 ? (radiologytest.amount + (radiologytest.amount * radiologytest.tax / 100)) : undefined,
        category: radiologyCategoryList.find(x => x.id == radiologytest.categoryId)?.name,
        chargeCategory: radiologyChargeCategoryList.find(x => x.id == radiologytest.chargeCategoryId)?.name,
        charge: radiologyChargeList.find(x => x.id == radiologytest.chargeId)?.name,
        testParameterInnerForm: radiologytest.testParameterInnerForm?.map(x => {
          return {
            id: x.id,
            testParameterId: x.testParameterId,
            testParameter: radiologyParameterList.find(y => y.id == x.testParameterId)?.name,
            referenceRange: x.referenceRange,
            unit: x.unit
          }
        })
      });
    });
    return radiologyTestList;
  }

  public getRadiologyTests(): Array<RadiologyTest> {
    return this.list(APP_CONSTANT.localStorage.key.radiologyTests) as Array<RadiologyTest>;
  }

  public getRadiologyTestNameList(): Array<SimpleRecord> {
    return this.getRadiologyTests().map(x => {
      return {
        id: x.id,
        name: x.name
      };
    }
    );
  }

  getRadiologyTestById(id: number): RadiologyTest {
    return this.getRadiologyTests().find(x => x.id == id) as RadiologyTest
  }

  public addRadiologyTest(radiologyTest: RadiologyTest) {
    this.add(radiologyTest, APP_CONSTANT.localStorage.key.radiologyTests);
  }

  public updateRadiologyTest(radiologyTest: RadiologyTest) {
    this.update(radiologyTest, APP_CONSTANT.localStorage.key.radiologyTests);
  }

  public deleteRadiologyTest(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.radiologyTests);
  }

  //############################################# End Radiology Test #################################################

}