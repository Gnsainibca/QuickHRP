import { Master_Vital } from "src/app/all-modules/setup/vital/shared/models/master-vital";
import { VitalStatus } from "src/app/shared/enums/vital-status";

export interface Vital {
  id : number,
  opdPatientId : number,
  vitalId: number,
  vitalName: string,
  value: number,
  status: number,
  date : Date,
}

export interface PatientVital extends Master_Vital {
  id : number,
  value: number,
  date : Date,
  status : VitalStatus
}