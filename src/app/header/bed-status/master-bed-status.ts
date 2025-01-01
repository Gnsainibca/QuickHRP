export interface Master_BedStaus_Floor {
  id : number,
  name : string,
  bedGroups : Array<Master_BedStaus_BedGroup>
}

export interface Master_BedStaus_BedGroup {
  id : number,
  name : string,
  beds : Array<Master_BedStaus_Bed>
}

export interface Master_BedStaus_Bed {
  id : number,
  name : string,
  admittedPatient ?: Master_BedStaus_AdmittedPatient
}

export interface Master_BedStaus_AdmittedPatient {
  ipdPatientId : number,
  ipdNo : string,
  name : string,
  admissionDate : Date,
  gender : string,
  phone : string,
  guardianName : string,
  consultantDoctor : string
}

