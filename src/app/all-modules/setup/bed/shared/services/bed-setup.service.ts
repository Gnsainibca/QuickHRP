import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { BaseService } from 'src/app/shared/data/base.service';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { Master_Bed, Master_BedDetails } from '../models/master-bed';
import { Master_BedType } from '../models/master-bed-type';
import { Master_BedGroup, Master_BedGroupDetails } from '../models/master-bed-group';
import { Master_Floor } from '../models/master-floor';

@Injectable({
  providedIn: 'root',
})
export class BedSetupService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  
  // ********************************** Bed **************************************//

  public getBedList(): Array<Master_BedDetails> {
    let bedTypes = this.list(APP_CONSTANT.localStorage.key.master_bedTypes) as Array<Master_BedType>;
    let bedGroups = this.list(APP_CONSTANT.localStorage.key.master_bedGroups) as Array<Master_BedGroup>;
    let floors = this.list(APP_CONSTANT.localStorage.key.master_floors) as Array<Master_Floor>;
    let result: Array<Master_BedDetails> = [];
    this.getBeds().forEach(item => {
      let bedGroup = bedGroups.find(x => x.id == item.bedGroupId);
      let floor = floors.find(x => x.id == bedGroup?.floorId);
      result.push(
        {
          ...item,
          bedType: bedTypes.find(x => x.id == item.bedTypeId)?.name,
          bedGroup: `${bedGroup?.name} - ${floor?.name}`
        });
    });
    return result;
  }

  public getBeds(): Array<Master_Bed> {
    return this.list(APP_CONSTANT.localStorage.key.master_beds) as Array<Master_Bed>;
  }

  public getBed(id: number): Master_Bed {
    return this.get(id, APP_CONSTANT.localStorage.key.master_beds) as Master_Bed;
  }

  public addBed(bed: Master_Bed) {
    this.add(bed, APP_CONSTANT.localStorage.key.master_beds);
  }

  public updateBed(bed: Master_Bed) {
    this.update(bed, APP_CONSTANT.localStorage.key.master_beds);
  }

  public deleteBed(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_beds);
  }

  // ********************************** Bed Type**************************************//

  public getBedTypeList(): Array<Master_BedType> {
    return this.list(APP_CONSTANT.localStorage.key.master_bedTypes) as Array<Master_BedType>;
  }

  public getBedType(id: number): Master_BedType {
    return this.get(id, APP_CONSTANT.localStorage.key.master_bedTypes) as Master_BedType;
  }

  public addBedType(bedType: Master_BedType) {
    this.add(bedType, APP_CONSTANT.localStorage.key.master_bedTypes);
  }

  public updateBedType(bedType: Master_BedType) {
    this.update(bedType, APP_CONSTANT.localStorage.key.master_bedTypes);
  }

  public deleteBedType(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_bedTypes);
  }

   // ********************************** Bed Group **************************************//

   public getBedGroupList(): Array<Master_BedGroupDetails> {
    let floors = this.list(APP_CONSTANT.localStorage.key.master_floors) as Array<Master_Floor>;
    let result: Array<Master_BedGroupDetails> = [];
    this.getBedGroups().forEach(item => {
      result.push({ ...item, floor: floors.find(x => x.id == item.floorId)?.name })
    });
    return result;
  }

  public getBedGroupNameList(): Array<SimpleRecord> {
    let floors = this.list(APP_CONSTANT.localStorage.key.master_floors) as Array<Master_Floor>;
    let result: Array<SimpleRecord> = [];
    this.getBedGroups().forEach(item => {
      let floor: Master_Floor = floors.find(x => x.id == item.floorId)!;
      result.push({ id: item.id, name: `${item.name} - ${floor?.name}` });
    });
    return result;
  }

  public getBedGroupName(id: number): SimpleRecord {
    return this.getBedGroupNameList().find(x => x.id == id)!;
  }

   public getBedGroups(): Array<Master_BedGroup> {
    return this.list(APP_CONSTANT.localStorage.key.master_bedGroups) as Array<Master_BedGroup>;
  }

  public getBedGroup(id: number): Master_BedGroup {
    return this.get(id, APP_CONSTANT.localStorage.key.master_bedGroups) as Master_BedGroup;
  }

  public addBedGroup(bedGroup: Master_BedGroup) {
    this.add(bedGroup, APP_CONSTANT.localStorage.key.master_bedGroups);
  }

  public updateBedGroup(bedGroup: Master_BedGroup) {
    this.update(bedGroup, APP_CONSTANT.localStorage.key.master_bedGroups);
  }

  public deleteBedGroup(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_bedGroups);
  }

  // ********************************** Floor **************************************//

  public getFloorList(): Array<Master_Floor> {
    return this.list(APP_CONSTANT.localStorage.key.master_floors) as Array<Master_Floor>;
  }

  public getFloor(id: number): Master_Floor {
    return this.get(id, APP_CONSTANT.localStorage.key.master_floors) as Master_Floor;
  }

  public addFloor(floor: Master_Floor) {
    this.add(floor, APP_CONSTANT.localStorage.key.master_floors);
  }

  public updateFloor(floor: Master_Floor) {
    this.update(floor, APP_CONSTANT.localStorage.key.master_floors);
  }

  public deleteFloor(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_floors);
  }
}