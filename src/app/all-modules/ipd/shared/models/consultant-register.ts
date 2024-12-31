export interface ConsultantRegistration {
  id : number,
  ipdPatientId : number,
  appliedDate : Date,
  consultantDate : Date,
  doctorId: number,
  doctor ?: string,
  instruction: string
}