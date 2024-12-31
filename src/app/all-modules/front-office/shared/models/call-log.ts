export interface CallLog {
    id: number,
    name: string,
    description: string,
    phone: string,
    date: Date,
    nextFollowUpDate: Date,
    callDuration: string,
    callType: string
    note: string
  }