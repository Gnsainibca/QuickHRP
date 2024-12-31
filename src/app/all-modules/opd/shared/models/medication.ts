export interface Medication {
  id : number,
  opdPatientId : number;
  date : Date,
  time: string,
  medicineCategoryId: number,
  medicineId: number,
  medicineUnitId: number,
  remarks: string
}

export interface MedicationList {
  id : number,
  date : Date,
  time: string,
  medicineCategory: string,
  medicine: string,
  medicineUnit: string,
  remarks: string
}

export interface MedicationGroupedList {
  date : Date,
  medications : Array<MedicationList>
}