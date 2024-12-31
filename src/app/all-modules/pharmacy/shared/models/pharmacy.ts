import { MedicineAvailability } from "src/app/shared/enums/medicine-availability"

export interface Pharmacy {
  id: number,
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
  paymentAmount: number,
  note: string,
  previousReportValue: string,
  medicineInnerForm : Array<PurchaseMedicineDetails>
}

export interface PharmacyMedicine {
  id: number,
  name: string,
  categoryId: number,
  companyId: number,
  composition: number,
  groupId: number,
  unitId: number,
  minLevel: number,
  reOrderLevel: number,
  tax: number,
  packing : string,
  vatAC : string,
  rackNumber : string,
  note : string,
  image : string,
  imageName : string
}

export interface PurchaseMedicine {
  id: number,
  purchaseDate : Date,
  billNo : string,
  supplierId: number,
  medicineInnerForm?: Array<PurchaseMedicineDetails>,
  note : string,
  image : string,
  imageName : string,
  totalAmount: number,
  totalTax: number,
  discount: number,
  netAmount: number,
  paymentModeId: number,
  paymentAmount: number,
  paymentNote: string,
}

export interface PurchaseMedicineDetails {
  id: number,
  categoryId: number,
  category ?: string,
  medicineId: number,
  medicineName ?: string,
  batchNo: string,
  expiryDate: Date,
  mrp: number,
  batchAmount: number,
  salePrice: number,
  packingQuantity: number,
  quantity: number,
  purchasePrice : number,
  tax : number,
  amount : number,
}

export interface BadStockMedicine {
  id: number,
  medicineId: number,
  batchNo: number,
  expiryDate: Date,
  outwardDate: Date,
  quantity: number,
  note : string,
}

export interface PharmacyMedicineList extends PharmacyMedicine {
  category?: string,
  company?: string,
  group?: string,
  unit ?: string,
  availableQuantity ?: number,
  status ?: MedicineAvailability,
  colorClass ?: string,
}

export interface PharmacyList extends Pharmacy {
  patientName?: string,
  doctor?: string,
}

export interface PurchaseMedicineList extends PurchaseMedicine {
  supplier?: string,
  paymentMode?: string,
}

export interface PurchaseMedicineStock extends PurchaseMedicineDetails {
  purchaseBillNo?: string,
  purchaseDate ?: Date,
}

