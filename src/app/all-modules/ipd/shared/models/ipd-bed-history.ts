export interface IpdBedHistory {
  id: number,
  ipdPatientId: number,
  bedGroup?: string;
  bedId: number;
  bed?: string;
  fromDate: Date,
  toDate?: Date,
  isActive: boolean
}