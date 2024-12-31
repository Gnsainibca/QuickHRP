import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(public http: HttpClient) { }

  public add(item: any, key: string) : any {
    let lsData: Array<any> = JSON.parse(localStorage.getItem(key)!);
    var maxId = lsData?.length > 0 ? Math.max(...lsData.map(o => o.id)) : 0;
    lsData = lsData?.length > 0 ? lsData : [];
    item.id = maxId + 1;
    lsData.push(item);
    localStorage.setItem(key, JSON.stringify(lsData));
    return item;
  }

  public update(item: any, key: string) {
    const lsData: Array<any> = JSON.parse(localStorage.getItem(key)!);
    let itemIndexToBeUpdated = lsData.findIndex(x => x.id === item.id);
    lsData[itemIndexToBeUpdated] = item;
    localStorage.setItem(key, JSON.stringify(lsData));
  }

  public delete(id: number, key: string) {
    const lsData: Array<any> = JSON.parse(localStorage.getItem(key)!);
    const itemIndexToBeDeleted = lsData.findIndex(x => x.id === id);
    lsData.splice(itemIndexToBeDeleted, 1);
    localStorage.setItem(key, JSON.stringify(lsData));
  }

  public list(key: string): Array<any> {
    let lsData = localStorage.getItem(key);
    let data = JSON.parse(lsData!);
    if (!data) data = [];
    return data;
  }

  public get(id: number, key: string): any {
    return this.list(key)?.find(x => x.id == id);
  }
}