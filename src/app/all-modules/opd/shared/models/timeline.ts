export interface Timeline {
  id : number,
  opdPatientId : number,
  title : string,
  date : Date,
  description: string
  attachment: number,
  visibleToThisPerson: boolean
}