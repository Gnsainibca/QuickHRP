export interface Master_BedGroup {
  id : number,
  name : string,
  floorId : number,
  description : string,
  isActive : boolean
}

export interface Master_BedGroupDetails extends Master_BedGroup {
  floor ?: string
}