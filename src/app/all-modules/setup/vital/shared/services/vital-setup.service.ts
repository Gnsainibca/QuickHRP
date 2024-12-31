import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/data/base.service';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { Master_Vital } from '../models/master-vital';
import { VitalStatus } from 'src/app/shared/enums/vital-status';

@Injectable({
  providedIn: 'root',
})
export class VitalSetupService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  // ********************************** Vital **************************************//

  public getVitalList(): Array<Master_Vital> {
    return this.list(APP_CONSTANT.localStorage.key.master_vitals) as Array<Master_Vital>;
  }

  public getVital(id: number): Master_Vital {
    return this.get(id, APP_CONSTANT.localStorage.key.master_vitals) as Master_Vital;
  }

  public getNameWithVitalRangeInNewLine(vital: Master_Vital): string {
    return `${vital.name}<br />(${this.getVitalRange(vital)})`;
  }

  public getNameWithVitalRange(vital: Master_Vital): string {
    return `${vital.name} (${this.getVitalRange(vital)})`;
  }

  public getVitalRange(vital: Master_Vital): string {
    let range = vital.fromValue;
    if (vital.toValue) {
      range = `${range} - ${vital.toValue}`;
    }
    return `${range} ${vital.unit}`;
  }

  getVitalStatus(value: string, vitalFromValue: string, vitalToValue: string): VitalStatus {
    let status: VitalStatus = VitalStatus.Normal;
    if (value && vitalFromValue && vitalToValue) {
      let fromValue = Number(vitalFromValue);
      let toValue = Number(vitalToValue);
      let actualValue = Number(value);
      if (fromValue && toValue && actualValue) {
        status = actualValue > toValue ? VitalStatus.High : (actualValue < fromValue ? VitalStatus.Low : VitalStatus.Normal);
      }
      else if (vitalFromValue.split('/').length == 2 && vitalToValue.split('/').length == 2 && value.split('/').length == 2) {

        let firstFromValue = Number(vitalFromValue.split('/')[0].trim());
        let secondFromValue = Number(vitalFromValue.split('/')[1].trim());

        let firstToValue = Number(vitalToValue.split('/')[0].trim());
        let secondToValue = Number(vitalToValue.split('/')[1].trim());

        let firstValue = Number(value.split('/')[0].trim());
        let secondValue = Number(value.split('/')[1].trim());

        if (firstFromValue && secondFromValue && firstToValue && secondToValue && firstValue && secondValue) {
          status = (firstValue > firstToValue || secondValue > secondToValue) ? VitalStatus.High :
            ((firstValue < firstFromValue || secondValue < secondFromValue) ? VitalStatus.Low : VitalStatus.Normal);
        }
      }
    }
    return status;
  }

  public addVital(vital: Master_Vital) {
    this.add(vital, APP_CONSTANT.localStorage.key.master_vitals);
  }

  public updateVital(vital: Master_Vital) {
    this.update(vital, APP_CONSTANT.localStorage.key.master_vitals);
  }

  public deleteVital(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_vitals);
  }
}