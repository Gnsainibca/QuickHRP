import { RadiologyTestParameter } from "./radiology-test-parameter"

export interface Radiology {
  id: number,
  applyTPA: boolean,
  patientId: number,
  prescriptionNo: string,
  caseId: string,
  billNo: string,
  date: Date,
  referralDoctorId: number,
  doctorName: string,
  totalAmount: number,
  totalTax: number,
  discount: number,
  netAmount: number,
  paymentModeId: number,
  previousReportValue: string,
  note: string,
  testInnerForm : Array<RadiologyTest>
}

export interface RadiologyTest {
  id: number,
  testId: number,
  name: string,
  shortName: number,
  type: string,
  categoryId: number,
  subCategory: string,
  reportDays: number,
  reportDate: Date,
  chargeCategoryId: number,
  chargeId: number,
  amount: number,
  tax: number,
  testParameterInnerForm?: Array<RadiologyTestParameter>,
  radiologySampleCollected ?: RadiologySampleCollected,
  radiologyApproveReport ?: RadiologyApproveReport,
}

export interface RadiologySampleCollected {
  collectedById ?: number,
  collectedBy ?: string,
  collectedDate ?: Date,
  radiologyCenter ?: string
}

export interface RadiologyApproveReport {
  approvedById ?: number,
  approvedBy ?: string,
  approvedDate ?: Date,
  result ?: string,
  reportValue ?: string,
  attachment ?: string,
  attachmentName ?: string
}

export interface RadiologyTestList extends RadiologyTest {
  category?: string,
  chargeCategory?: string,
  charge?: string,
  netAmount ?: number,
}

export interface RadiologyList extends Radiology {
  patientName?: string,
  doctor?: string,
}

