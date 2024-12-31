import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { Visitor, VisitorList } from '../models/visitor';
import { CallLog } from '../models/call-log';
import { Postal } from '../models/postal';
import { Complain, ComplainList } from '../models/complain';
import { BaseService } from 'src/app/shared/data/base.service';
import { FrontOfficeSetupService } from 'src/app/all-modules/setup/front-office/shared/services/front-office-setup.service';

@Injectable({
    providedIn: 'root',
})
export class FrontOfficeDataService extends BaseService {
    constructor(http: HttpClient, private frontOfficeSetupService: FrontOfficeSetupService) {
        super(http);
    }

    // ################################# Start Visitor ##########################################

    public getVisitorList(): Array<VisitorList> {
        let result: Array<VisitorList> = [];
        this.getVisitors().forEach(item => {
            result.push({
                ...item,
                purpose: this.frontOfficeSetupService.getPurpose(item.purposeId)?.name,
            });
        });
        return result;
    }

    public getVisitors(): Array<Visitor> {
        return this.list(APP_CONSTANT.localStorage.key.visitors) as Array<Visitor>;
    }

    public getVisitorById(id: number): VisitorList {
        return this.getVisitorList().find(x => x.id == id)!;
    }

    public addVisitor(visitor: Visitor) {
        const visitors: Array<Visitor> = JSON.parse(localStorage.getItem(APP_CONSTANT.localStorage.key.visitors)!);
        var maxId = Math.max(...visitors.map(o => o.id));
        visitor.id = maxId + 1;
        visitors.push(visitor);
        localStorage.setItem(APP_CONSTANT.localStorage.key.visitors, JSON.stringify(visitors));
    }

    public updateVisitor(visitor: Visitor) {
        const visitors: Array<Visitor> = JSON.parse(localStorage.getItem(APP_CONSTANT.localStorage.key.visitors)!);

        let itemIndexToBeUpdated = visitors.findIndex(x => x.id === visitor.id);

        visitors[itemIndexToBeUpdated] = visitor;

        // set on local storage
        localStorage.setItem(APP_CONSTANT.localStorage.key.visitors, JSON.stringify(visitors));
    }

    public deleteVisitor(visitorId: number) {
        const visitors: Array<Visitor> = JSON.parse(localStorage.getItem(APP_CONSTANT.localStorage.key.visitors)!);

        // remove item
        const itemIndexToBeDeleted = visitors.findIndex(x => x.id === visitorId);
        visitors.splice(itemIndexToBeDeleted, 1);

        // set on local storage
        localStorage.setItem(APP_CONSTANT.localStorage.key.visitors, JSON.stringify(visitors));
    }

    public visitToOptions: Array<string> = ['Staff', 'OPD Patient', 'IPD Patient'];

    // ################################# End Visitor ##########################################


    // ################################# Start Call Logs ##########################################

    public getCallLogs(): Array<CallLog> {
        return this.list(APP_CONSTANT.localStorage.key.callLogs) as Array<CallLog>;
    }

    public getCallLogById(callLogId: number): CallLog {
        return this.getCallLogs().find(x => x.id == callLogId)!;
    }

    public addCallLog(callLog: CallLog) {
        this.add(callLog, APP_CONSTANT.localStorage.key.callLogs);
    }

    public updateCallLog(callLog: CallLog) {
        this.update(callLog, APP_CONSTANT.localStorage.key.callLogs);
    }

    public deleteCallLog(id: number) {
        this.delete(id, APP_CONSTANT.localStorage.key.callLogs);
    }

    // ################################# END Call Logs ##########################################

    // ################################# Start Postal ##########################################

    public getPostalList(): Array<Postal> {
        return this.list(APP_CONSTANT.localStorage.key.postals) as Array<Postal>;
    }

    public getPostalById(postalId: number): Postal {
        return this.getPostalList().find(x => x.id == postalId)!;
    }

    public addPostal(postal: Postal) {
        this.add(postal, APP_CONSTANT.localStorage.key.postals);
    }

    public updatePostal(postal: Postal) {
        this.update(postal, APP_CONSTANT.localStorage.key.postals);
    }

    public deletePostal(id: number) {
        this.delete(id, APP_CONSTANT.localStorage.key.postals);
    }

    // ################################# END Postal ##########################################

    // ################################# Start Complain ##########################################

    public getComplainList(): Array<ComplainList> {
        let result: Array<ComplainList> = [];
        this.getComplains().forEach(item => {
            result.push({
                ...item,
                source: this.frontOfficeSetupService.getSource(item.sourceId)?.name,
                complainType: this.frontOfficeSetupService.getComplainType(item.complainTypeId)?.name,
            });
        });
        return result;
    }

    public getComplains(): Array<Complain> {
        return this.list(APP_CONSTANT.localStorage.key.complains) as Array<Complain>;
    }

    public getComplainById(id: number): ComplainList {
        return this.getComplainList().find(x => x.id == id)!;
    }

    public addComplain(complain: Complain) {
        this.add(complain, APP_CONSTANT.localStorage.key.complains);
    }

    public updateComplain(complain: Complain) {
        this.update(complain, APP_CONSTANT.localStorage.key.complains);
    }

    public deleteComplain(id: number) {
        this.delete(id, APP_CONSTANT.localStorage.key.complains);
    }

    // ################################# END Complain ##########################################
}