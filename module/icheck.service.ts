import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

interface ICheckRadioGroup {
  name: string;
  subject: BehaviorSubject<boolean>;
}

@Injectable()
export class ICheckService {

  private _radioGroups: Array<ICheckRadioGroup> = [];

  constructor() { }

  registry(name): Observable<boolean> {
    let subject = this._getSubject(name);
    if (!subject) {
      subject = new BehaviorSubject<boolean>(false);
      this._radioGroups.push({
        name: name,
        subject: subject
      });
    }
    return subject.asObservable();
  }

  trigger(name, checked: boolean) {
    const subject = this._getSubject(name);
    if (!subject) {
      return;
    }
    subject.next(checked);
  }

  private _getSubject(name): BehaviorSubject<boolean> {
    const radioGroup = this._radioGroups.find((group: ICheckRadioGroup) => group.name === name);
    return radioGroup ? radioGroup.subject : null;
  }

}
