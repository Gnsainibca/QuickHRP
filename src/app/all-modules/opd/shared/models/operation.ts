export interface Operation {
  id : number,
  opdPatientId : number;
  operationCategoryId: number,
  operationId: number,
  operationDate : Date,
  doctorId: number,
  assistantConsultant1: string,
  assistantConsultant2: string,
  anesthetist: string,
  anesthesiaType: string,
  otTechnician: string,
  otAssistant: string,
  remarks: string,
  result: string
}

export interface OperationList {
  id : number,
  operationCategory: string,
  operationName: string,
  operationDate : Date,
  doctor: string,
  assistantConsultant1: string,
  assistantConsultant2: string,
  anesthetist: string,
  anesthesiaType: string,
  otTechnician: string,
  otAssistant: string,
  remarks: string,
  result: string
}