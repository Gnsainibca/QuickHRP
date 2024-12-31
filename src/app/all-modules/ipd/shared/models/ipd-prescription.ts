import { SimpleRecord } from "src/app/shared/models/simple-record";

export interface IpdPrescription {
  id: number,
  prescriptionNo: string,
  ipdPatientId : number,
  headerNote: string,
  footerNote: string,

  findingCategories: Array<SimpleRecord>,
  findings: Array<SimpleRecord>,
  findingDescription: string,
  printFindings: boolean,

  medicineInnerForm : Array<IpdPrescribeMedicine>,

  date: Date,
  prescribeById: number,
  pathologyIds: Array<SimpleRecord>,
  radiologyIds: Array<SimpleRecord>,

  userRoleInnerForm : Array<SimpleRecord>;
}

export interface IpdPrescribeMedicine {
  id: number,
  medicineCategoryId: number,
  medicineId: number,
  unitId: number,
  doseIntervalId: number,
  doseDurationId: number,
  instrunction: string
}

export interface IpdPrescriptionList {
  id: number,
  date: Date,
  findingDescription: string,
  prescribeBy: string,
  prescriptionNo : string,
}

export interface IpdPrescriptionView {
  id: number,
  prescriptionNo : string,
  headerNote: string,
  footerNote: string,

  findingDescription: string,
  printFindings: boolean,

  medicines : Array<IpdPrescribeMedicineView>,

  date: Date,
  prescribeBy: string,
  pathologyTests: string,
  radiologyTests: string
}

export interface IpdPrescribeMedicineView {
  medicineCategory: string,
  medicine: string,
  unit: string,
  doseInterval: string,
  doseDuration: string,
  instrunction: string
}
