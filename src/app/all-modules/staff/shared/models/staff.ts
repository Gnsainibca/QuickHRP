export interface Staff {
  id: number;
  photo: string;
  staffId: string;
  roleId: number;
  designationId: number;
  departmentId: number;
  specialistIds: Array<number>;
  firstName: string;
  lastName: string;
  fatherName: string;
  motherName: string;
  genderId: number;
  maritalStatusId: number;
  bloodGroupId: number;
  dob: Date;
  doj: Date;
  phone: string;
  alternatePhone: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
  qualification: string;
  workExperience: string;
  specialization: string;
  note: string;
  panNumber: string;
  nationalIdentificationNumber: string;
  localIdentificationNumber: string;
  referenceContact: string;

  // ########## Payroll ############## //
  epfNo: string;
  basicSalary: string;
  contractTypeId: number;
  workShift: string;
  workLocation: string;

  // ########## Leaves ############## //

  casualLeave: number;
  privilegeLeave: number;
  sickLeave: number;
  maternityLeave: number;
  paternityLeave: number;
  floaterLeave: number;
  fixedLeave: number;

  // ########## Bank Account Details ############## //

  accountTitle: string;
  bankAccountNo: string;
  bankName: string;
  bankBranchName: string;
  ifscCode: string;

  // ########## Social Media Link ############## //

  facebookURL: string;
  twitterURL: string;
  linkedinURL: string;
  instagramURL: string;

  // ########## Documents ############## //

  resumeDocument: string;
  resumeFileName: string;
  joiningLetterDocument: string;
  joiningLetterFileName: string;
  resignationLetterDocument: string;
  resignationLetterFileName: string;
  otherDocument: string;
  otherFileName: string;
}

export interface StaffDetail extends Staff {
  fullName?: string;
  fullNameWithId?: string;
  role?: string;
  designation?: string;
  department?: string;
  specialist?: string;
  gender?: string;
  bloodGroup?: string;
  maritalStatus?: string;
  contractType ?: string;
}