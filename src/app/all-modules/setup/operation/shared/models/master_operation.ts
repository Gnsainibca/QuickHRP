export interface Master_Operation {
  id : number,
  name : string,
  operationCategoryId : number,
  isActive : boolean
}

export interface Master_OperationList extends Master_Operation {
  operationCategory  ?: string,
}