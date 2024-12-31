export interface Patient {
  id: number;
  name: string;
  guardianName: string;
  genderId: number;
  dob: Date;
  ageYear: number;
  ageMonth: number;
  ageDay: number;
  bloodGroupId: number;
  maritalStatusId: number;
  photo: string;
  phone: string;
  alternatePhone: string;
  email: string;
  address: string;
  idProofNo: string;
  tpaNameId: number;
  tpaId: string;
  tpaExpiryDate: Date;
  remarks: string;
}

export interface PatientList extends Patient{
  nameWithId ?: string;
  tpaName ?: string;
  age ?: string;
  gender ?: string;
  bloodGroup ?: string;
  maritalStatus ?: string;
}