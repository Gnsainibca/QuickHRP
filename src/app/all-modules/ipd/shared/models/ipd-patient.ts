import { SimpleRecord } from "src/app/shared/models/simple-record";
import { Discharge } from "./ipd-patient-discharge";

export interface IpdPatient extends Discharge {
  id: number,
  patientId: number,
  ipdNo: string,
  caseId: string,

  patientName: string,

  symptomsTypes: Array<SimpleRecord>,
  symptomsTitles: Array<SimpleRecord>,
  symptomsDescription: string,
  note: string,
  anyKnownAllergies: string,
  previousMedicalIssue: string,

  appointmentDate: Date,
  anyCasualty: boolean,
  isOldPatient: boolean,
  reference: string,
  consultantDoctor: string;
  consultantDoctorId: number;
  applyTPA: boolean,
  creditLimit: number;
  bedId: number;
  needLiveConsultation: boolean,
}

