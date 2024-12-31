import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { IpdPatientList } from 'src/app/all-modules/ipd/shared/models/ipd-patient-list';
import { IpdPatient } from 'src/app/all-modules/ipd/shared/models/ipd-patient';
import { NurseNote, NurseNoteComment } from '../models/nurse-note';
import { ConsultantRegistration } from '../models/consultant-register';
import { IpdBedHistory } from '../models/ipd-bed-history';
import { IpdPrescribeMedicineView, IpdPrescription, IpdPrescriptionList, IpdPrescriptionView } from '../models/ipd-prescription';
import { CommonService } from 'src/app/shared/data/common.service';
import { BaseService } from 'src/app/shared/data/base.service';
import { BedSetupService } from 'src/app/all-modules/setup/bed/shared/services/bed-setup.service';
import { PharmacySetupService } from 'src/app/all-modules/setup/pharmacy/shared/services/pharmacy-setup.service';
import { PharmacyService } from 'src/app/all-modules/pharmacy/shared/services/pharmacy.service';
import { PathologyDataService } from 'src/app/all-modules/pathology/shared/services/pathology-data.service';
import { RadiologyDataService } from 'src/app/all-modules/radiology/shared/services/radiology-data.service';
import { Prefix_Screen } from 'src/app/shared/enums/prefix-screen';
import { Discharge } from '../models/ipd-patient-discharge';
import { SettingService } from 'src/app/all-modules/setup/setting/shared/services/setting.service';

@Injectable({
    providedIn: 'root',
})
export class IpdDataService extends BaseService {
    constructor(http: HttpClient, private commonService: CommonService, private hospitalBedService: BedSetupService,
        private pharmacySetupService: PharmacySetupService, private pharmacyService: PharmacyService,
        private pathologyDataService: PathologyDataService, private radiologyDataService: RadiologyDataService,
        private settingService: SettingService, private bedSetupService: BedSetupService
    ) {
        super(http);
    }

    // ################################# Start Ipd ################################################

    public getIpdPatientsTreatmentHistory(iptPatientId: number): Array<IpdPatientList> {
        let patientId = this.getIpdPatientById(iptPatientId).patientId;
        return this.getIpdPatientList().filter(x => x.patientId == patientId);
    }

    public getIpdAdmittedPatientList(): Array<IpdPatientList> {
        return this.getIpdPatientList().filter(x => !x.dischargeStatusId);
    }

    public getIpdDischargedPatientList(): Array<IpdPatientList> {
        return this.getIpdPatientList().filter(x => x.dischargeStatusId! > 0)
    }

    public getIpdPatientList(): Array<IpdPatientList> {
        let opdPatients: Array<IpdPatientList> = [];
        let doctors = this.commonService.getDoctorsNameList();
        let findings = this.getPrescriptions();
        let genderList = this.settingService.getGenderList();
        this.getIpdPatientsList().forEach(ipdPatient => {
            let patient = this.commonService.getPatientById(ipdPatient.patientId);
            opdPatients.push({
                ...ipdPatient,
                patientName: patient?.name!,
                gender: genderList.find(x => x.id === patient?.genderId)?.name,
                phone: patient?.phone!,
                bed: this.getBedByIpdPatientId(ipdPatient.id),
                consultantDoctor: doctors.find(x => x.id == ipdPatient.consultantDoctorId)?.name!,
                findingsDescription: findings.find(x => x.ipdPatientId == ipdPatient.id)?.findingDescription
            });
        });
        return opdPatients;
    }

    public getIpdPatientsList(): Array<IpdPatient> {
        return this.list(APP_CONSTANT.localStorage.key.ipdPatients) as Array<IpdPatient>;
    }

    public getIpdPatientById(ipdPatientId: number): IpdPatientList {
        return this.getIpdPatientList().find(x => x.id == ipdPatientId) as IpdPatientList;
    }

    public getIpdListByPatientId(patientId: number): Array<IpdPatientList> {
        return this.getIpdPatientList().filter(x => x.patientId == patientId);
    }

    public addIpdPatient(ipdPatient: IpdPatient) {
        let dbIpdPatient = this.add(ipdPatient, APP_CONSTANT.localStorage.key.ipdPatients);
        dbIpdPatient.ipdNo = this.commonService.getNo(ipdPatient.id, Prefix_Screen.IPD);
        this.update(dbIpdPatient, APP_CONSTANT.localStorage.key.ipdPatients);
        this.addIpdBedHistory(ipdPatient.id, ipdPatient.bedId);
    }

    public addIpdBedHistory(ipdPatientId: number, bedId: number) {
        let ipdBedHistory: IpdBedHistory = {
            id: 0,
            ipdPatientId: ipdPatientId,
            bedId: bedId,
            fromDate: new Date(),
            isActive: true
        };
        this.add(ipdBedHistory, APP_CONSTANT.localStorage.key.ipdBedHistories);
    }

    public updateIpdPatient(ipdPatient: IpdPatient) {
        let dbIpdPatient = this.get(ipdPatient.id, APP_CONSTANT.localStorage.key.ipdPatients);
        if (ipdPatient.bedId != dbIpdPatient.bedId) {
            this.movedToNewBed(ipdPatient.id, ipdPatient.bedId, dbIpdPatient.bedId);
        }
        this.update(ipdPatient, APP_CONSTANT.localStorage.key.ipdPatients);
    }

    private movedToNewBed(ipdPatientId: number, bedId: number, oldbedId: number) {
        this.markOccupiedBedAsNotReserved(ipdPatientId, oldbedId);
        this.addIpdBedHistory(ipdPatientId, bedId);
    }

    public markOccupiedBedAsNotReserved(ipdPatientId: number, bedId: number) {
        const dbBedHistories: Array<IpdBedHistory> = JSON.parse(localStorage.getItem(APP_CONSTANT.localStorage.key.ipdBedHistories)!);

        let itemIndexToBeUpdated = dbBedHistories?.findIndex(x => x.ipdPatientId === ipdPatientId && x.bedId == bedId && x.isActive);

        if (itemIndexToBeUpdated >= 0) {
            let ipdBedHistory: IpdBedHistory = dbBedHistories[itemIndexToBeUpdated];
            ipdBedHistory.toDate = new Date();
            ipdBedHistory.isActive = false;
            // set on local storage
            localStorage.setItem(APP_CONSTANT.localStorage.key.ipdBedHistories, JSON.stringify(dbBedHistories));
        }
    }

    public deleteIpdPatient(id: number) {
        this.delete(id, APP_CONSTANT.localStorage.key.ipdPatients);
    }

    public dischargePatient(discharge: Discharge, ipdPatientId: number) {
        let ipdPatient = this.getIpdPatientById(ipdPatientId);
        let ipdPatientWithDischargeDetails: IpdPatient = {
            ...ipdPatient,
            bedId: 0,
            dischargeDate: discharge.dischargeDate,
            dischargeStatusId: discharge.dischargeStatusId,
            dischargeNote: discharge.dischargeNote,
            dischargeOperation: discharge.dischargeOperation,
            dischargeDiagnosis: discharge.dischargeDiagnosis,
            dischargeInvestigation: discharge.dischargeInvestigation,
            dischargeTreatmentHome: discharge.dischargeTreatmentHome,
            dischargeRevertReason: undefined
        };
        this.update(ipdPatientWithDischargeDetails, APP_CONSTANT.localStorage.key.ipdPatients);
        this.markOccupiedBedAsNotReserved(ipdPatient.id, ipdPatient.bedId);
    }

    public dischargePatientRevert(dischargeRevertReason: string, bedId: number, ipdPatientId: number) {
        let ipdPatient = this.getIpdPatientById(ipdPatientId);
        let ipdPatientWithDischargeDetails: IpdPatient = {
            ...ipdPatient,
            bedId: bedId,
            dischargeDate: undefined,
            dischargeStatusId: undefined,
            dischargeNote: undefined,
            dischargeOperation: undefined,
            dischargeDiagnosis: undefined,
            dischargeInvestigation: undefined,
            dischargeTreatmentHome: undefined,
            dischargeRevertReason: dischargeRevertReason
        };
        this.update(ipdPatientWithDischargeDetails, APP_CONSTANT.localStorage.key.ipdPatients);
        this.addIpdBedHistory(ipdPatient.id, bedId);
    }

    // ################################# End Ipd ##################################################

    // ################################# Start NurseNote ##########################################

    public getNurseNoteList(ipdPatientId: number): Array<NurseNote> {
        let nurseNoteList: Array<NurseNote> = [];
        let nurses = this.commonService.getNursesNameList();
        let nurseNoteComments = this.getNurseNoteComments();
        this.getNurseNotes().filter(y => y.ipdPatientId == ipdPatientId).forEach(x => {
            nurseNoteList.push({
                ...x,
                nurse: nurses.find(nurse => nurse.id === x.nurseId)?.name,
                nurseNoteComments: nurseNoteComments?.filter(y => y.nurseNoteId == x.id)!
            });
        });
        return nurseNoteList;
    }

    public getNurseNotes(): Array<NurseNote> {
        return this.list(APP_CONSTANT.localStorage.key.nurseNotes) as Array<NurseNote>;
    }

    public getNurseNoteComments(): Array<NurseNoteComment> {
        return this.list(APP_CONSTANT.localStorage.key.nurseNoteComments) as Array<NurseNoteComment>;
    }

    public getNurseNoteById(nurseNoteId: number) {
        return this.getNurseNotes().find(x => x.id == nurseNoteId);
    }

    public addNurseNote(nurseNote: NurseNote) {
        this.add(nurseNote, APP_CONSTANT.localStorage.key.nurseNotes);
    }

    public addNurseNoteComment(comment: string, nurseNoteId: number) {
        const nurseNoteComment: NurseNoteComment = {
            id: 0,
            nurseNoteId: nurseNoteId,
            comment: comment,
            date: new Date(),
            createdBy: 'Super Admin'
        };
        this.add(nurseNoteComment, APP_CONSTANT.localStorage.key.nurseNoteComments);
    }

    public updateNurseNote(nurseNote: NurseNote) {
        this.update(nurseNote, APP_CONSTANT.localStorage.key.nurseNotes);
        const nurseNotes: Array<NurseNote> = JSON.parse(localStorage.getItem(APP_CONSTANT.localStorage.key.nurseNotes)!);
    }

    public deleteNurseNote(id: number) {
        this.delete(id, APP_CONSTANT.localStorage.key.nurseNotes);
    }

    public deleteNurseNoteComment(id: number) {
        this.delete(id, APP_CONSTANT.localStorage.key.nurseNoteComments);
    }

    // ################################# END NurseNote ##########################################

    // ################################# Start Consultant Registration ##########################################

    public getConsultantRegistrationList(ipdPatientId: number): Array<ConsultantRegistration> {
        let consultantRegistrationList: Array<ConsultantRegistration> = [];
        this.getConsultantRegistrations().filter(y => y.ipdPatientId == ipdPatientId).forEach(x => {
            consultantRegistrationList.push({
                ...x,
                doctor: this.commonService.getDoctorById(x.doctorId)?.fullNameWithId,
            });
        });
        return consultantRegistrationList;
    }

    public getConsultantRegistrations(): Array<ConsultantRegistration> {
        return this.list(APP_CONSTANT.localStorage.key.consultantRegistrations) as Array<ConsultantRegistration>;
    }

    public addConsultantRegistration(consultantRegistration: ConsultantRegistration) {
        this.add(consultantRegistration, APP_CONSTANT.localStorage.key.consultantRegistrations);
    }

    public updateConsultantRegistration(consultantRegistration: ConsultantRegistration) {
        this.update(consultantRegistration, APP_CONSTANT.localStorage.key.consultantRegistrations);
    }

    public deleteConsultantRegistration(id: number) {
        this.delete(id, APP_CONSTANT.localStorage.key.consultantRegistrations);
    }

    // ################################# END Consultant Registration ##########################################

    // ################################# Start Bed History ##########################################

    public getBedHistoryList(ipdPatientId: number): Array<IpdBedHistory> {
        let bedHistoryList: Array<IpdBedHistory> = [];
        let beds = this.hospitalBedService.getBeds();
        this.getBedHistories().filter(y => y.ipdPatientId == ipdPatientId).forEach(item => {
            let bed = beds.find(y => y.id === item.bedId);
            bedHistoryList.push({
                ...item,
                bedGroup: this.bedSetupService.getBedGroupName(bed?.bedGroupId!)!.name,
                bed: bed!.name,
            })
        });
        return bedHistoryList;
    }

    public getBedByIpdPatientId(ipdPatientId: number): string {
        let bedHistory = this.getBedHistoryList(ipdPatientId).find(x => x.isActive);
        if (bedHistory) {
            return `${bedHistory?.bed}, ${bedHistory?.bedGroup}`;
        }
        return '';
    }

    public getBedHistories(): Array<IpdBedHistory> {
        return this.list(APP_CONSTANT.localStorage.key.ipdBedHistories) as Array<IpdBedHistory>;
    }

    // ################################# END Bed History ##########################################


    // ################################# Start Prescription ##########################################

    public getPrescriptionList(ipdPatientId: number): Array<IpdPrescriptionList> {
        let prescriptionList: Array<IpdPrescriptionList> = [];
        this.getPrescriptions().filter(y => y.ipdPatientId == ipdPatientId).forEach(x => {
            prescriptionList.push({
                ...x,
                prescriptionNo: this.commonService.getNo(x.id, Prefix_Screen.IPDPrescription),
                prescribeBy: this.commonService.getDoctorById(x.prescribeById)?.fullNameWithId!,
            });
        });
        return prescriptionList;
    }

    public getPrescriptions(): Array<IpdPrescription> {
        return this.list(APP_CONSTANT.localStorage.key.ipdPrescriptions) as Array<IpdPrescription>;
    }

    public getPrescriptionById(id: number): IpdPrescriptionView {

        let medicines = this.pharmacyService.getMedicineNameList();
        let medicineCategories = this.pharmacySetupService.getMedicineCategoryList();
        let medicineDosages = this.pharmacySetupService.getMedicineDosageList();
        let dosageDurations = this.pharmacySetupService.getMedicineDoseDurationList();
        let dosageIntervals = this.pharmacySetupService.getMedicineDoseIntervalList();
        let pathologyTests = this.pathologyDataService.getPathologyTestNameList();
        let radiologyTests = this.radiologyDataService.getRadiologyTestNameList();

        let presciption = this.getPrescriptions().find(x => x.id == id)!;

        let selectedPathologyIds = presciption.pathologyIds?.length > 0 ? presciption.pathologyIds.map(z => z.id) : []
        let selectedRadiologyIds = presciption.radiologyIds?.length > 0 ? presciption.radiologyIds.map(z => z.id) : []

        let ipdPrescription: IpdPrescriptionView = {
            ...presciption,
            prescriptionNo: this.commonService.getNo(presciption.id, Prefix_Screen.IPDPrescription),
            medicines: presciption.medicineInnerForm.map(x => {
                return {
                    medicineCategory: medicineCategories.find(y => y.id == x.medicineCategoryId)?.name,
                    medicine: medicines.find(y => y.id == x.medicineId)?.name,
                    unit: medicineDosages.find(y => y.id == x.unitId)?.name,
                    doseDuration: dosageDurations.find(y => y.id == x.doseDurationId)?.name,
                    doseInterval: dosageIntervals.find(y => y.id == x.doseIntervalId)?.name,
                    instrunction: x.instrunction
                } as IpdPrescribeMedicineView
            }),
            prescribeBy: this.commonService.getDoctorById(presciption.prescribeById)?.fullName!,
            pathologyTests: pathologyTests.filter(x => selectedPathologyIds.includes(x.id)).map((x, index) => `${index + 1}. ${x.name}`).join('<br />'),
            radiologyTests: radiologyTests.filter(x => selectedRadiologyIds.includes(x.id)).map((x, index) => `${index + 1}. ${x.name}`).join('<br />'),
        };

        return ipdPrescription;
    }

    public addPrescription(ipdPrescription: IpdPrescription) {
        let presciption = this.add(ipdPrescription, APP_CONSTANT.localStorage.key.ipdPrescriptions);
        presciption.prescriptionNo = this.commonService.getNo(presciption.id, Prefix_Screen.IPDPrescription);
        this.update(presciption, APP_CONSTANT.localStorage.key.ipdPrescriptions);
    }

    public updatePrescription(ipdPrescription: IpdPrescription) {
        this.update(ipdPrescription, APP_CONSTANT.localStorage.key.ipdPrescriptions);
    }

    public deletePrescription(id: number) {
        this.delete(id, APP_CONSTANT.localStorage.key.ipdPrescriptions);
    }

    // ################################# END Prescription ##########################################

    public getLabInvertigationList(ipdPatientId: number): Array<any> {
        let caseId = this.getIpdPatientById(ipdPatientId)?.caseId;
        let tests: Array<any> = [];
        let pathologies = this.pathologyDataService.getPathologyList().filter(x => x.caseId == caseId).sort((a, b) => b.id - a.id);
        pathologies.forEach(item => {
            item.testInnerForm.forEach(test => {
                tests.push({
                    ...test,
                    lab: 'Pathology'
                });
            });
        });
        let radiologies = this.radiologyDataService.getRadiologyList().filter(x => x.caseId == caseId).sort((a, b) => b.id - a.id);
        radiologies.forEach(item => {
            item.testInnerForm.forEach(test => {
                tests.push({
                    ...test,
                    lab: 'Radiology',
                    sampleCollected: test.radiologySampleCollected,
                    approveReport: test.radiologyApproveReport,
                });
            });
        });
        return tests;
    }

    public getCaseIdByIpdPatientId(ipdPatientId: number): string {
        return this.getIpdPatientById(ipdPatientId).caseId;
    }
}