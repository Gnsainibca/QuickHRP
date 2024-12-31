export interface Master_Findings {
  id : number,
  name : string,
  categoryId : number,
  description : string,
  isActive : boolean
}

export interface Master_FindingsList extends Master_Findings {
  category ?: string,
}
