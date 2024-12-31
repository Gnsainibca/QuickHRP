export interface Visitor {
    id: number,
    purposeId: number,
    name: string,
    idCard: string,
    visitTo : string,
    relatedTo:string,
    noOfPerson:number,
    phone: string,
    date: Date,
    inTime: string,
    outTime: string,
    note: string
  }

  export interface VisitorList extends Visitor {
    purpose ?: string,
  }