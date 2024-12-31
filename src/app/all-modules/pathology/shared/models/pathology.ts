import { PathologyTestParameter } from "./pathology-test-parameter"

export interface Pathology {
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
  testInnerForm : Array<PathologyTest>
}

export interface PathologyTest {
  id: number,
  testId: number,
  name: string,
  shortName: number,
  type: string,
  categoryId: number,
  subCategory: string,
  method: string,
  reportDays: number,
  reportDate: Date,
  chargeCategoryId: number,
  chargeId: number,
  amount: number,
  tax: number,
  testParameterInnerForm?: Array<PathologyTestParameter>,
  sampleCollected ?: SampleCollected,
  approveReport ?: ApproveReport,
}

export interface SampleCollected {
  collectedById ?: number,
  collectedBy ?: string,
  collectedDate ?: Date,
  pathologyCenter ?: string
}

export interface ApproveReport {
  approvedById ?: number,
  approvedBy ?: string,
  approvedDate ?: Date,
  result ?: string,
  reportValue ?: string,
  attachment ?: string,
  attachmentName ?: string
}

export interface PathologyTestList extends PathologyTest {
  category?: string,
  chargeCategory?: string,
  charge?: string,
  netAmount ?: number,
}

export interface PathologyList extends Pathology {
  patientName?: string,
  doctor?: string,
}

