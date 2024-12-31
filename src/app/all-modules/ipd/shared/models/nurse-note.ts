export interface NurseNote {
  id : number,
  ipdPatientId : number,
  nurseId : number,
  nurse ?: string,
  date : Date,
  note : string,
  comment: string,
  createdBy: string,
  nurseNoteComments ?: Array<NurseNoteComment>
}

export interface NurseNoteComment {
  id : number,
  nurseNoteId : number,
  date : Date,
  comment: string,
  createdBy: string,
}