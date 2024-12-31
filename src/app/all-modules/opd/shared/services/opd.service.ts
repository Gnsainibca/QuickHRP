import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpdPatient } from '../models/opd-patient';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { PatientVisit } from '../models/patient-visit';
import { OpdPatientList } from '../models/opd-patient-list';
import { Medication, MedicationGroupedList, MedicationList } from '../models/medication';
import { Operation, OperationList } from '../models/operation';
import { DataService } from 'src/app/shared/core.index';
import { Payment } from '../models/payment';
import { Timeline } from '../models/timeline';
import { PatientVital, Vital } from '../models/vital';
import { PatientCharge } from '../models/patient-charge';
import { BillingInfo } from '../models/billing-info';
import { CommonService } from 'src/app/shared/data/common.service';
import { BaseService } from 'src/app/shared/data/base.service';
import { OperationSetupService } from 'src/app/all-modules/setup/operation/shared/services/operation-setup.service';
import { HospitalChargeSetupService } from 'src/app/all-modules/setup/hospital-charge/shared/services/hospital-charge-setup.service';
import { PharmacySetupService } from 'src/app/all-modules/setup/pharmacy/shared/services/pharmacy-setup.service';
import { PharmacyService } from 'src/app/all-modules/pharmacy/shared/services/pharmacy.service';
import { Prefix_Screen } from 'src/app/shared/enums/prefix-screen';
import { VitalSetupService } from 'src/app/all-modules/setup/vital/shared/services/vital-setup.service';
import { DatePipe } from '@angular/common';
import { RadiologyDataService } from 'src/app/all-modules/radiology/shared/services/radiology-data.service';
import { PathologyDataService } from 'src/app/all-modules/pathology/shared/services/pathology-data.service';

@Injectable({
    providedIn: 'root',
})
export class OpdDataService extends BaseService {
    constructor(http: HttpClient,
        private datePipe: DatePipe,
        private commonService: CommonService,
        private hospitalChargeSetupService: HospitalChargeSetupService,
        private pharmacySetupService: PharmacySetupService,
        private pharmacyService: PharmacyService,
        private radiologyDataService: RadiologyDataService,
        private pathologyDataService: PathologyDataService,
        private operationSetup: OperationSetupService,
        private vitalSetupService : VitalSetupService) {
        super(http);
    }

    public getOpdPatientsTreatmentHistory(optPatientId: number): Array<OpdPatient> {
        let patientId = this.getOpdPatientById(optPatientId).patientId;
        return this.getOpdPatientList(0, patientId);
    }

    public getOpdPatientList(patientVisitId: number, patientId: number = 0): Array<OpdPatientList> {
        let opdPatients: Array<OpdPatientList> = [];
        let chargeCategories = this.hospitalChargeSetupService.getChargeCategoryList();
        let charges = this.hospitalChargeSetupService.getHospitalCharges();
        let doctors = this.commonService.getDoctorsNameList();
        let patientVisits = this.getPatientVisits()
        this.getOpdPatientsList(patientId).forEach(x => {
            let patientLatestVisit = patientVisits.find(y => (patientVisitId > 0 && y.id == patientVisitId) || (patientVisitId == 0 && y.opdPatientId === x.id))!;
            if (patientLatestVisit) {
                opdPatients.push({
                    ...patientLatestVisit,
                    id: x.id,
                    opdNo: x.opdNo,
                    caseId: x.caseId,
                    patientId: x.patientId,
                    patientName: this.commonService.getPatientById(x.patientId)?.name!,
                    patientVisitId: patientLatestVisit.id,
                    consultantDoctor: doctors.find(x => x.id == patientLatestVisit.consultantDoctorId)?.name!,
                    chargeCategory: chargeCategories.find(x => x.id == patientLatestVisit.chargeCategoryId)?.name!,
                    charge: charges.find(x => x.id == patientLatestVisit.chargeId)?.name!,
                });
            }
        });
        return opdPatients;
    }

    public getOpdPatientsList(patientId: number): Array<OpdPatient> {
        return this.getOpdPatients().filter(x => patientId == 0 || x.patientId == patientId)!;
    }

    private getOpdPatients(): Array<OpdPatient> {
        return this.list(APP_CONSTANT.localStorage.key.opdPatients) as Array<OpdPatient>;
    }

    public getPatientVisits(): Array<PatientVisit> {
        return this.list(APP_CONSTANT.localStorage.key.patientVisits) as Array<PatientVisit>;
    }

    public getOpdPatientById(opdPatientId: number): OpdPatientList {
        return this.getOpdPatientList(0).find(x => x.id == opdPatientId)!;
    }

    public addOpdPatient(patientVisit: PatientVisit) {
        const opdPatient: OpdPatient = {
            id: 0,
            opdNo: '',
            patientId: patientVisit.patientId,
            caseId: patientVisit.caseId
        };
        let dbOpdPatient = this.add(opdPatient, APP_CONSTANT.localStorage.key.opdPatients);
        dbOpdPatient.opdNo = this.commonService.getNo(dbOpdPatient.id, Prefix_Screen.OPD);
        this.update(dbOpdPatient, APP_CONSTANT.localStorage.key.opdPatients);
        patientVisit.opdPatientId = opdPatient.id;
        this.addPatientVisit(patientVisit);
    }

    public addPatientVisit(patientVisit: PatientVisit) {
        this.add(patientVisit, APP_CONSTANT.localStorage.key.patientVisits);
    }

    public updateOpdPatient(patientVisit: PatientVisit) {
        let dbOpdPatient = this.get(patientVisit.opdPatientId, APP_CONSTANT.localStorage.key.opdPatients);
        if (dbOpdPatient.patientId != patientVisit.patientId) {
            let opdPatient: OpdPatient = {
                id: dbOpdPatient.id,
                caseId: dbOpdPatient.caseId,
                opdNo: dbOpdPatient.opdNo,
                patientId: patientVisit.patientId
            };
            this.update(opdPatient, APP_CONSTANT.localStorage.key.opdPatients);
        }
        this.update(patientVisit, APP_CONSTANT.localStorage.key.patientVisits);
    }

    public deleteOpdPatient(id: number) {
        this.delete(id, APP_CONSTANT.localStorage.key.opdPatients);
    }

    public deletePatientVisit(id: number) {
        this.delete(id, APP_CONSTANT.localStorage.key.opdPatients);
        const patientVisits: Array<PatientVisit> = JSON.parse(localStorage.getItem(APP_CONSTANT.localStorage.key.patientVisits)!);
    }

    // ################################# Start Medication ##########################################

    public getMedicationList(opdPatientId: number): Array<MedicationGroupedList> {
        let medicationList: Array<MedicationList> = [];
        let medicineCategories = this.pharmacySetupService.getMedicineCategoryList();
        let medicines = this.pharmacyService.getMedicineNameList();
        let medicineDosageUnits = this.pharmacySetupService.getMedicineDosageList()
            .map(item => {
                return {
                    id: item.id,
                    name: `${item.name} ${item.medicineUnit}`
                }
            });

        this.getMedications().filter(y => y.opdPatientId == opdPatientId).forEach(x => {
            medicationList.push({
                ...x,
                medicineCategory: medicineCategories.find(y => y.id == x.medicineCategoryId)?.name!,
                medicine: medicines.find(y => y.id == x.medicineId)?.name!,
                medicineUnit: medicineDosageUnits.find(y => y.id == x.medicineUnitId)?.name!,
            });
        });

        // Grouping
        let finalList: Array<MedicationGroupedList> = [];
        if (medicationList?.length > 0) {
            var sorted = medicationList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            let date: Date = sorted[0].date;
            let item: MedicationGroupedList = { date: date, medications: [] };;
            sorted.forEach((x, index) => {

                if (date === x.date && sorted.length > index + 1) {
                    item.medications.push(x);
                } else if (sorted.length == index + 1) {
                    item.medications.push(x);
                    finalList.push(item);
                } else {
                    finalList.push(item);
                    date = x.date;
                    item = { date: date, medications: [] };
                    item.medications.push(x);
                }
            });
        }
        return finalList;
    }

    public getMedications(): Array<Medication> {
        return this.list(APP_CONSTANT.localStorage.key.medications) as Array<Medication>;
    }

    public getMedicationById(id: number): Medication {
        return this.getMedications().find(x => x.id == id)!;
    }

    public addMedication(medication: Medication) {
        this.add(medication, APP_CONSTANT.localStorage.key.medications);
    }

    public updateMedication(medication: Medication) {
        this.update(medication, APP_CONSTANT.localStorage.key.medications);
    }

    public deleteMedication(id: number) {
        this.delete(id, APP_CONSTANT.localStorage.key.medications);
        const medications: Array<Medication> = JSON.parse(localStorage.getItem(APP_CONSTANT.localStorage.key.medications)!);
    }

    // ################################# END Medication ##########################################

    // ################################# Start Operations ##########################################

    public getOperationList(opdPatientId: number): Array<OperationList> {
        let operationList: Array<OperationList> = [];
        this.getOperations().filter(y => y.opdPatientId == opdPatientId).forEach(x => {
            operationList.push({
                ...x,
                operationCategory: this.operationSetup.getOperationCategory(x.operationCategoryId)?.name!,
                operationName: this.operationSetup.getOperation(x.operationId)?.name!,
                doctor: this.commonService.getDoctorById(x.doctorId)?.fullName!,
            });
        });
        return operationList;
    }

    public getOperations(): Array<Operation> {
        return this.list(APP_CONSTANT.localStorage.key.operations) as Array<Operation>;
    }

    public getOperationById(operationId: number): Operation {
        return this.getOperations().find(x => x.id == operationId)!;
    }

    public addOperation(operation: Operation) {
        this.add(operation, APP_CONSTANT.localStorage.key.operations);
    }

    public updateOperation(operation: Operation) {
        this.update(operation, APP_CONSTANT.localStorage.key.operations);
    }

    public deleteOperation(id: number) {
        this.delete(id, APP_CONSTANT.localStorage.key.operations);
    }

    // ################################# END Operations ##########################################

    // ################################# Start Payments ##########################################

    public getPaymentList(opdPatientId: number): Array<Payment> {
        let paymentList: Array<Payment> = [];
        let paymentModes = this.hospitalChargeSetupService.getPaymentModeList();
        this.getPayments().filter(y => y.opdPatientId == opdPatientId).forEach(x => {
            paymentList.push({
                id: x.id,
                opdPatientId: x.opdPatientId,
                date: x.date,
                paymentModeId: x.paymentModeId,
                paymentMode: paymentModes.find(y => y.id == x.paymentModeId)?.name!,
                amount: x.amount,
                note: x.note
            });
        });
        return paymentList;
    }

    public getPayments(): Array<Payment> {
        return this.list(APP_CONSTANT.localStorage.key.payments) as Array<Payment>;
    }

    public getPaymentById(paymentId: number): Payment {
        return this.getPayments().find(x => x.id == paymentId)!;
    }

    public addPayment(payment: Payment) {
        this.add(payment, APP_CONSTANT.localStorage.key.payments);
    }

    public updatePayment(payment: Payment) {
        this.update(payment, APP_CONSTANT.localStorage.key.payments);
    }

    public deletePayment(id: number) {
        this.delete(id, APP_CONSTANT.localStorage.key.payments);
    }

    // ################################# END Payments ##########################################

    // ################################# Start Timeline ##########################################

    public getTimelineList(opdPatientId: number): Array<Timeline> {
        let timelineList: Array<Timeline> = [];
        this.getTimelines().filter(y => y.opdPatientId == opdPatientId).forEach(x => {
            timelineList.push({
                id: x.id,
                opdPatientId: x.opdPatientId,
                title: x.title,
                date: x.date,
                description: x.description,
                attachment: x.attachment,
                visibleToThisPerson: x.visibleToThisPerson
            });
        });
        return timelineList;
    }

    public getTimelines(): Array<Timeline> {
        return this.list(APP_CONSTANT.localStorage.key.timelines) as Array<Timeline>;
    }

    public getTimelineById(timelineId: number): Timeline {
        return this.getTimelines().find(x => x.id == timelineId)!;
    }

    public addTimeline(timeline: Timeline) {
        this.add(timeline, APP_CONSTANT.localStorage.key.timelines);
    }

    public updateTimeline(timeline: Timeline) {
        this.update(timeline, APP_CONSTANT.localStorage.key.timelines);
    }

    public deleteTimeline(id: number) {
        this.delete(id, APP_CONSTANT.localStorage.key.timelines);
    }

    // ################################# END Timelines ##########################################

    // ################################# Start Vitals ##########################################

    public getVitalList(opdPatientId: number): any {
        let vitalList: Array<Vital> = [];
        let vitals = this.vitalSetupService.getVitalList();
        this.getVitals().filter(y => y.opdPatientId == opdPatientId).forEach(x => {
            vitalList.push({
                ...x,
                // date : new Date(this.datePipe.transform(x.date, 'MM/dd/yyyy')!),
                vitalName: vitals.find(y => y.id == x.vitalId)?.name!,
            });
        });

        var allDates = vitalList.map(item => item.date).filter((value, index, self) => self.indexOf(value) === index);

        var finalList: any = [];
        allDates.forEach(date => {
            var result: any = [];
            vitals.forEach(vital => {
                var obj: any = {};
                obj.id = vital.id;
                obj.list = [];
                var vitalValues = vitalList.filter(x => x.date == date && x.vitalId == vital.id);
                vitalValues.forEach(vitalValue => {
                    obj.list.push({ id: vitalValue.id, date: vitalValue.date, value: vitalValue.value, status: vitalValue.status });
                });
                result.push(obj);
            });
            finalList.push({ 'date': date, list: result });
        });

        return finalList;
    }

    public getVitals(): Array<Vital> {
        return this.list(APP_CONSTANT.localStorage.key.vitals) as Array<Vital>;
    }

    public getVitalById(vitalId: number): Vital {
        return this.getVitals().find(x => x.id == vitalId)!;
    }

    public addVitals(vitals: Array<Vital>) {
        vitals.forEach(vital => {
            this.add(vital, APP_CONSTANT.localStorage.key.vitals);
        });
    }

    public updateVital(vital: Vital) {
        this.update(vital, APP_CONSTANT.localStorage.key.vitals);
    }

    public deleteVital(id: number) {
        this.delete(id, APP_CONSTANT.localStorage.key.vitals);
    }

    // ################################# END Vitals ##########################################

    // ################################# Start Charge ##########################################

    public getChargeList(opdPatientId: number): Array<PatientCharge> {
        let chargeList: Array<PatientCharge> = [];
        let patientChargeTypes = this.hospitalChargeSetupService.getChargeTypes();
        let patientChargeCategores = this.hospitalChargeSetupService.getChargeCategories();
        let patientCharges = this.hospitalChargeSetupService.getHospitalCharges();
        this.getCharges().filter(y => y.opdPatientId == opdPatientId).forEach(x => {
            chargeList.push({
                ...x,
                opdPatientId: opdPatientId,
                chargeType: patientChargeTypes.find(y => y.id == x.chargeTypeId)?.name!,
                chargeCategory: patientChargeCategores.find(y => y.id == x.chargeCategoryId)?.name!,
                charge: patientCharges.find(y => y.id == x.chargeId)?.name!,
            });
        });
        return chargeList;
    }

    public getCharges(): Array<PatientCharge> {
        return this.list(APP_CONSTANT.localStorage.key.charges) as Array<PatientCharge>;
    }

    public getChargeById(chargeId: number): PatientCharge {
        return this.getCharges().find(x => x.id == chargeId)!;
    }

    public addCharge(charge: PatientCharge) {
        this.add(charge, APP_CONSTANT.localStorage.key.charges);
    }

    public addCharges(chargesToBeAdded: Array<PatientCharge>) {
        chargesToBeAdded.forEach(charge => {
            this.add(charge, APP_CONSTANT.localStorage.key.charges);
        });
    }

    public updateCharge(charge: PatientCharge) {
        this.update(charge, APP_CONSTANT.localStorage.key.charges);
    }

    public deleteCharge(id: number) {
        this.delete(id, APP_CONSTANT.localStorage.key.charges);
    }

    // ################################# END Charge ##########################################

    // ################################# Start Overview ##########################################

    public getOpdBillingInfo(opdPatientId: number): BillingInfo {
        let totalCharge = this.getChargeList(opdPatientId).reduce((sum, current) => sum + current.netAmount, 0);
        let paymentDone = this.getPaymentList(opdPatientId).reduce((sum, current) => sum + current.amount, 0);
        let billingInfo: BillingInfo = {
            charge: totalCharge,
            paid: paymentDone
        };
        return billingInfo;
    }

    public getOptPatientCurrentVital(opdPatientId: number): Array<PatientVital> {
        let patientVitals = this.getVitals().filter(x => x.opdPatientId == opdPatientId);
        let vitalTypes = this.vitalSetupService.getVitalList();
        let result: Array<PatientVital> = [];
        vitalTypes.forEach(vitalType => {
            let vital = patientVitals.sort((a, b) => b.id - a.id).find(x => x.vitalId == vitalType.id);
            if (vital) {
                result.push({
                    ...vitalType,
                    value: vital.value,
                    date: vital.date,
                    status: vital.status
                });
            }
        });
        return result;
    }

    public getOptPatientMedication(opdPatientId: number): Array<MedicationList> {
        let medicationList: Array<MedicationList> = [];
        let medicineCategories = this.pharmacySetupService.getMedicineCategoryList();
        let medicines = this.pharmacyService.getMedicineNameList();
        let medicineDosageUnits = this.pharmacySetupService.getMedicineDosageList()
            .map(item => {
                return {
                    id: item.id,
                    name: `${item.name} ${item.medicineUnit}`
                }
            });
        this.getMedications().filter(y => y.opdPatientId == opdPatientId).forEach(x => {
            medicationList.push({
                id: x.id,
                date: x.date,
                time: x.time,
                medicineCategory: medicineCategories.find(y => y.id == x.medicineCategoryId)?.name!,
                medicine: medicines.find(y => y.id == x.medicineId)?.name!,
                medicineUnit: medicineDosageUnits.find(y => y.id == x.medicineUnitId)?.name!,
                remarks: x.remarks
            });
        });
        return medicationList;
    }

    // ################################# END Charge ##########################################

    public getLabInvertigationList(opdPatientId: number): Array<any> {
        let caseId = this.getOpdPatientById(opdPatientId)?.caseId;
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
}