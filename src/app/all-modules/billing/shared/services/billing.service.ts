import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IpdPatient } from 'src/app/all-modules/ipd/shared/models/ipd-patient';
import { OpdPatient } from 'src/app/all-modules/opd/shared/models/opd-patient';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { BaseService } from 'src/app/shared/data/base.service';
import { SimpleRecord } from 'src/app/shared/models/simple-record';

@Injectable({
  providedIn: 'root',
})
export class BillingService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public getOpdIpdPatientIdByCaseId(caseId: string): SimpleRecord | undefined {

    let ipdPatientList = this.list(APP_CONSTANT.localStorage.key.ipdPatients) as Array<IpdPatient>;
    let ipdPatientId = ipdPatientList?.find(x => x.caseId == caseId)?.id;

    if (ipdPatientId) {
      return { id: ipdPatientId, name: 'ipd' };
    };

    let opdPatientList = this.list(APP_CONSTANT.localStorage.key.opdPatients) as Array<OpdPatient>;
    let opdPatientId = opdPatientList?.find(x => x.caseId == caseId)?.id;
    return { id: opdPatientId!, name: 'opd' };
  }
}