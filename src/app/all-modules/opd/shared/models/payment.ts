export interface Payment {
  id : number,
  opdPatientId : number,
  date : Date,
  amount: number,
  paymentModeId: number,
  paymentMode: string,
  note: string
}