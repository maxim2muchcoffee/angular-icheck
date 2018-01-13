import { Injectable } from '@angular/core';

export type iCheckHandle = 'checkbox' | 'radio' | '';

export interface ICheckConfigArgs {
  handle?: iCheckHandle;
  checkboxClass?: string;
  radioClass?: string;

  checkedClass?: string;
  checkedCheckboxClass?: string;
  checkedRadioClass?: string;

  uncheckedClass?: string;
  uncheckedCheckboxClass?: string;
  uncheckedRadioClass?: string;

  disabledClass?: string;
  disabledCheckboxClass?: string;
  disabledRadioClass?: string;

  enabledClass?: string;
  enabledCheckboxClass?: string;
  enabledRadioClass?: string;

  indeterminateClass?: string;
  indeterminateCheckboxClass?: string;
  indeterminateRadioClass?: string;

  determinateClass?: string;
  determinateCheckboxClass?: string;
  determinateRadioClass?: string;

  hoverClass?: string;
  focusClass?: string;
  activeClass?: string;

  labelHover?: boolean;
  labelHoverClass?: string;
}

export class ICheckConfig implements ICheckConfigArgs {

  handle: iCheckHandle = '';
  checkboxClass = 'icheckbox';
  radioClass = 'iradio';

  checkedClass = 'checked';
  checkedCheckboxClass = '';
  checkedRadioClass = '';

  uncheckedClass = '';
  uncheckedCheckboxClass = '';
  uncheckedRadioClass = '';

  disabledClass = 'disabled';
  disabledCheckboxClass = '';
  disabledRadioClass = '';

  enabledClass = '';
  enabledCheckboxClass = '';
  enabledRadioClass = '';

  indeterminateClass = 'indeterminate';
  indeterminateCheckboxClass = '';
  indeterminateRadioClass = '';

  determinateClass = '';
  determinateCheckboxClass = '';
  determinateRadioClass = '';

  hoverClass = 'hover';
  focusClass = '';
  activeClass = '';

  labelHover = true;
  labelHoverClass = '';

  constructor(config: ICheckConfigArgs = {}) {
    Object.assign(this, config);
  }

}
