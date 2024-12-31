export interface Master_PathologyParameter {
  id : number,
  name : string,
  referenceRange : string,
  pathologyUnitId : number,
  description : string,
  isActive : boolean
}

export interface Master_PathologyParameterList extends Master_PathologyParameter {
  pathologyUnit ?: string,
}
