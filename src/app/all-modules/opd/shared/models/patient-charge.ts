import { SimpleRecordWithParent } from "src/app/shared/models/simple-record";

export interface PatientCharge {
  id: number,
  opdPatientId: number,
  date: Date,
  applyTPA: boolean,
  chargeTypeId: number,
  chargeType: string,
  chargeCategoryId: number,
  chargeCategory: string,
  chargeId: number,
  charge: string,
  standardCharge: number,
  tpaCharge: number,
  total: number,
  discountPercentage: number,
  tax: number,
  netAmount: number,
  quantity: number,
  note: string,
}

export interface PatientCharge_Master extends SimpleRecordWithParent {
  standardCharge?: number,
  tpaCharge?: number,
  discountPercentage?: number,
  tax?: number
}