export interface Master_MedicineDosage {
  id : number,
  name : string,
  medicineCategoryId : number,
  medicineUnitId : number,
  isActive : boolean
}

export interface Master_MedicineDosageList extends Master_MedicineDosage {
  medicineCategory ?: string,
  medicineUnit ?: string,
}
