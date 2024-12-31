export interface Master_HospitalCharge {
  id : number,
  name : string,
  chargeTypeId : number,
  chargeCategoryId : number,
  unitTypeId : number,
  taxCategoryId : number,
  tax : number,
  standardCharge : number,
  tpaCharge ?: number,
  description : string,
  isActive : boolean
}

export interface Master_HospitalChargeDetails extends Master_HospitalCharge {
  chargeType ?: string,
  chargeCategory ?: string,
  unitType ?: string,
  taxCategory ?: string,
}