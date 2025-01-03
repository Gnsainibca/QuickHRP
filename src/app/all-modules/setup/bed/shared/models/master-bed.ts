export interface Master_Bed {
  id : number,
  name : string,
  bedTypeId : number,
  bedGroupId : number,
  floorId?: number,
  isAvailable : boolean,
  isActive : boolean
}

export interface Master_BedDetails extends Master_Bed {
  bedType ?: string,
  bedGroup ?: string,
  floor ?: string
}