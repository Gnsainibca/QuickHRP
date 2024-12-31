export interface SimpleRecord {
  id: number;
  name: string;
  description?: string;
}


export interface SimpleRecordWithParent extends SimpleRecord  {
  parentId: number;
}

export interface SimpleRecordWithCharge extends SimpleRecordWithParent  {
  amount: number;
  tax: number;
}