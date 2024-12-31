export interface PatientVisit {
    id: number,
    opdPatientId : number,
    patientId : number,
    patientName : string,
    
    symptomsTypes: Array<number>,
    symptomsTitles: Array<number>,
    symptomsDescription: string,
    note: string,
    anyKnownAllergies : string,
    previousMedicalIssue : string,

    appointmentDate : Date,
    caseId : string,
    anyCasualty : boolean,
    isOldPatient : boolean,
    reference: string,
    consultantDoctor:string;
    consultantDoctorId:number;
    applyTPA : boolean,
    chargeCategoryId : number,
    chargeId : number,
    standardCharge : number,
    appliedCharge : number,
    discount : number,
    tax : number,
    amount  : number,
    paymentMode  : number,
    paidAmount  : number,
    needLiveConsultation : boolean,
  }