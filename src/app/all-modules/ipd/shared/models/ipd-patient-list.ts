import { SimpleRecord } from "src/app/shared/models/simple-record";
import { Discharge } from "./ipd-patient-discharge";

export interface IpdPatientList extends Discharge {
    id: number,
    ipdNo : string,
    caseId : string,
    patientId : number,
    patientName : string,
    gender ?: string,
    phone ?: string,
    symptomsTypes: Array<SimpleRecord>,
    symptomsTitles: Array<SimpleRecord>,
    symptomsDescription: string,
    findingsDescription ?: string,
    note: string,
    anyKnownAllergies : string,
    previousMedicalIssue : string,
    appointmentDate : Date,
    anyCasualty : boolean,
    isOldPatient : boolean,
    reference: string,
    consultantDoctorId:number;
    consultantDoctor:string;
    guardianName ?:string;
    applyTPA : boolean,
    creditLimit:number;
    bedId:number;
    bed ?: string,
    needLiveConsultation : boolean
  }