export interface Master_SymptomsHead {
  id : number,
  name : string,
  typeId : number,
  description : string,
  isActive : boolean
}

export interface Master_SymptomsHeadList extends Master_SymptomsHead {
  type ?: string,
}
