export interface Master_RadiologyParameter {
  id : number,
  name : string,
  referenceRange : string,
  radiologyUnitId : number,
  description : string,
  isActive : boolean
}

export interface Master_RadiologyParameterList extends Master_RadiologyParameter {
  radiologyUnit ?: string,
}
