export interface Complain {
    id: number,
    complainTypeId: number,
    sourceId: number,
    complainBy: string,
    phone: string,
    date: Date,
    description: string,
    actionTaken: string
    assigned: string
    note: string
  }

  export interface ComplainList extends Complain {
    source ?: string,
    complainType ?: string,
  }