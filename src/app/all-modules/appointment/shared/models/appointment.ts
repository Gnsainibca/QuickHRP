export interface Appointment {
  id: number,
  appointmentNo: string,
  patientId: number,
  doctorId: number,
  fees: number,
  shiftId: number,
  appointmentDate: Date,
  slotId: number,
  priorityId: number,
  paymentModeId: number,
  statusId: number
  discount: number,
  sourceId: number
  message: string,
  liveConsultant: string,
  alternateAddress: string,
}

export interface AppointmentList extends Appointment {
  patientName?: string,
  doctor?: string,
  shift?: string,
  slot?: string,
  paymentMode?: string,
  priority?: string,
  status?: string,
  source?: string,
  gender?: string,
  phone?: string,
}