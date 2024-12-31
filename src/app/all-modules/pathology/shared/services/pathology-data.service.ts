import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { ApproveReport, Pathology, PathologyList, PathologyTest, PathologyTestList, SampleCollected } from '../models/pathology';
import { DataService } from 'src/app/shared/core.index';
import { CommonService } from 'src/app/shared/data/common.service';
import { PathologySetupService } from 'src/app/all-modules/setup/pathology/shared/services/pathology-setup.service';
import { BaseService } from 'src/app/shared/data/base.service';
import { Master_PathologyCategory } from 'src/app/all-modules/setup/pathology/shared/models/master-pathology-category';
import { Master_PathologyParameter } from 'src/app/all-modules/setup/pathology/shared/models/master-pathology-parameter';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { HospitalChargeSetupService } from 'src/app/all-modules/setup/hospital-charge/shared/services/hospital-charge-setup.service';
import { Prefix_Screen } from 'src/app/shared/enums/prefix-screen';
import { BillingInfo } from 'src/app/all-modules/opd/shared/models/billing-info';

@Injectable({
  providedIn: 'root',
})
export class PathologyDataService extends BaseService {
  constructor(http: HttpClient, private data: DataService, private commonService: CommonService,
    private pathologySetupService: PathologySetupService, private hospitalChargeSetupService : HospitalChargeSetupService) {
    super(http);
  }

  public getPathologyList(): Array<PathologyList> {
    let pathologyTestList: Array<PathologyList> = [];
    let pathologists = this.commonService.getPathologistsNameList();
    this.getPathologies().forEach(pathologytest => {
      pathologyTestList.push({
        ...pathologytest,
        patientName: this.commonService.getPatientById(pathologytest.patientId)?.name,
        doctor: pathologytest.referralDoctorId ? this.commonService.getDoctorById(pathologytest.referralDoctorId)?.fullName : pathologytest.doctorName,
        testInnerForm: pathologytest.testInnerForm?.map(x => {
          return {
            ...x,
            name: this.getPathologyTestById(x.testId)?.name!,
            sampleCollected: {
              ...x.sampleCollected,
              collectedBy: pathologists.find(y => y.id === x.sampleCollected?.collectedById)?.name,
            },
            approveReport: {
              ...x.approveReport,
              approvedBy: pathologists.find(y => y.id === x.approveReport?.approvedById)?.name,
            }
          }
        })
      });
    });
    return pathologyTestList;
  }

  public getBillingInfo(caseId: string) {
    let totalCharge = this.getPathologies().filter(x => x.caseId == caseId).reduce((sum, current) => sum + current.totalAmount, 0);
    let billingInfo: BillingInfo = {
      charge: totalCharge,
      paid: totalCharge
    };
    return billingInfo;
  }

  public getPathologies(): Array<Pathology> {
    return this.list(APP_CONSTANT.localStorage.key.pathologies) as Array<Pathology>;
  }

  public getPathologyById(id: number) : Pathology {
   return this.getPathologies().find(x => x.id == id)!;
  }

  public getBillNo(): string {
    const pathologies: Array<Pathology> = JSON.parse(localStorage.getItem(APP_CONSTANT.localStorage.key.pathologies)!);
    var maxId = pathologies.length > 0 ? Math.max(...pathologies.map(o => o.id)) : 0;
    return this.commonService.getNo(maxId + 1, Prefix_Screen.Pathology);
  }

  public addPathology(pathology: Pathology) {
    this.add(pathology, APP_CONSTANT.localStorage.key.pathologies);
  }

  public updatePathology(pathology: Pathology) {
    this.update(pathology, APP_CONSTANT.localStorage.key.pathologies);
  }

  public deletePathology(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.pathologies);
  }

  public updateSampleCollection(sampleCollected: SampleCollected, id: number, testId: number) {
    const pathologies: Array<Pathology> = JSON.parse(localStorage.getItem(APP_CONSTANT.localStorage.key.pathologies)!);

    let pathology = pathologies.find(x => x.id === id);
    let pathologyTest = pathology?.testInnerForm?.find(x => x.testId === testId)!;
    pathologyTest.sampleCollected = sampleCollected;

    // set on local storage
    localStorage.setItem(APP_CONSTANT.localStorage.key.pathologies, JSON.stringify(pathologies));
  }

  public updateApprovedReport(approveReport: ApproveReport, id: number, testId: number) {
    const pathologies: Array<Pathology> = JSON.parse(localStorage.getItem(APP_CONSTANT.localStorage.key.pathologies)!);

    let pathology = pathologies.find(x => x.id === id);
    let pathologyTest = pathology?.testInnerForm?.find(x => x.testId === testId)!;
    pathologyTest.approveReport = approveReport;

    // set on local storage
    localStorage.setItem(APP_CONSTANT.localStorage.key.pathologies, JSON.stringify(pathologies));
  }

  //############################################# Start Pathology Test #################################################

  public getPathologyTestList(): Array<PathologyTestList> {
    let pathologyCategoryList = this.pathologySetupService.getPathologyCategoryList() as Array<Master_PathologyCategory>;
    let pathologyParameterList = this.pathologySetupService.getPathologyParameterList() as Array<Master_PathologyParameter>;
    let pathologyChargeCategoryList = this.hospitalChargeSetupService.getChargeCategories();
    let pathologyChargeList = this.hospitalChargeSetupService.getChargesByChargeCategoriesId(pathologyChargeCategoryList.map(x=> x.id));
    let pathologyTestList: Array<PathologyTestList> = [];
    this.getPathologyTests().forEach(pathologytest => {
      pathologyTestList.push({
        ...pathologytest,
        netAmount: pathologytest.chargeId > 0 ? (pathologytest.amount + (pathologytest.amount * pathologytest.tax / 100)) : undefined,
        category: pathologyCategoryList.find(x => x.id == pathologytest.categoryId)?.name,
        charge: pathologyChargeList.find(x => x.id == pathologytest.chargeId)?.name,
        chargeCategory: pathologyChargeCategoryList.find(x => x.id == pathologytest.chargeCategoryId)?.name,
        testParameterInnerForm: pathologytest.testParameterInnerForm?.map(x => {
          return {
            id: x.id,
            testParameterId: x.testParameterId,
            testParameter: pathologyParameterList.find(y => y.id == x.testParameterId)?.name,
            referenceRange: x.referenceRange,
            unit: x.unit
          }
        })
      });
    });
    return pathologyTestList;
  }

  public getPathologyTests(): Array<PathologyTest> {
    return this.list(APP_CONSTANT.localStorage.key.pathologyTests) as Array<PathologyTest>;
  }

  public getPathologyTestNameList(): Array<SimpleRecord> {
    return this.getPathologyTests().map(x => {
      return {
        id: x.id,
        name: x.name
      };
    }
    );
  }

  public getPathologyTestById(id: number): PathologyTest {
    return this.getPathologyTests().find(x => x.id == id) as PathologyTest;
  }

  public addPathologyTest(pathologyTest: PathologyTest) {
    this.add(pathologyTest, APP_CONSTANT.localStorage.key.pathologyTests);
  }

  public updatePathologyTest(pathologyTest: PathologyTest) {
    this.update(pathologyTest, APP_CONSTANT.localStorage.key.pathologyTests);
  }

  public deletePathologyTest(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.pathologyTests);
  }

  //############################################# End Pathology Test #################################################
}