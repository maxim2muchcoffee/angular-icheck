import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

interface IRadioGroup {
  name: string;
  values: Array<string>;
  subject: Subject<string>;
}

interface IRegistryResult {
  value: string;
  observable: Observable<string>;
}

@Injectable()
export class ICheckRadioService {

  private _groups: Array<IRadioGroup> = [];

  constructor() { }

  registry(name, value?: string): IRegistryResult {
    let group = this._getGroup(name);
    if (group) {
      value = value || group.values.length.toString();
      if (group.values.indexOf(value) === -1) {
        group.values.push(value);
      }
    } else {
      value = value || '0';
      group = {
        name: name,
        values: [ value ],
        subject: new Subject<string>()
      };
      this._groups.push(group);
    }
    return { value: value, observable: group.subject.asObservable() };
  }

  trigger(name, value) {
    const group = this._getGroup(name);
    if (!group || group.values.indexOf(value) === -1) {
      return;
    }
    group.subject.next(value);
  }

  private _getGroup(name): IRadioGroup {
    return this._groups.find((group: IRadioGroup) => group.name === name);
  }

}
