export interface Master_HospitalChargeCategory {
  id : number,
  name : string,
  chargeTypeId : number,
  description : string,
  isActive : boolean
}

export interface Master_HospitalChargeCategoryDetails extends Master_HospitalChargeCategory {
  chargeType ?: string
}