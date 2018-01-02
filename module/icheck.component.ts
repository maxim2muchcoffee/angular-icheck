import { Component, Inject, Optional, OnInit, Input, ElementRef, Renderer, Renderer2 } from '@angular/core';
import { ICheckService } from './icheck.service';
import { ICheckConfig, ICheckConfigArgs, configAttributes } from './icheck-config';

@Component({
  selector: 'input[type="checkbox"][icheck], input[type="radio"][icheck]',
  template: '123123'
})
export class ICheckComponent implements OnInit {

  @Input()
  name = '';

  @Input() iCheckClass:  string;
  @Input() checkedClass: string;
  @Input() uncheckedClass: string;
  @Input() disabledClass: string;
  @Input() enabledClass: string;
  @Input() indeterminateClass: string;
  @Input() determinateClass: string;
  @Input() hoverClass: string;
  @Input() focusClass: string;
  @Input() activeClass: string;
  @Input() labelHover: boolean;
  @Input() labelHoverClass: string;

  private _nodeType: 'Checkbox' | 'Radio';
  private _parentNode: any;
  private _wrapper: any;
  private _config: ICheckConfigArgs = {
    handle:                     '',
    checkboxClass:              'icheckbox',
    radioClass:                 'iradio',

    checkedClass:               'checked',
    checkedCheckboxClass:       '',
    checkedRadioClass:          '',

    uncheckedClass:             '',
    uncheckedCheckboxClass:     '',
    uncheckedRadioClass:        '',

    disabledClass:              'disabled',
    disabledCheckboxClass:      '',
    disabledRadioClass:         '',

    enabledClass:               '',
    enabledCheckboxClass:       '',
    enabledRadioClass:          '',

    indeterminateClass:         'indeterminate',
    indeterminateCheckboxClass: '',
    indeterminateRadioClass:    '',

    determinateClass:           '',
    determinateCheckboxClass:   '',
    determinateRadioClass:      '',

    hoverClass:                 'hover',
    focusClass:                 'focus',
    activeClass:                'active',

    labelHover:                 true,
    labelHoverClass:            'hover'
  };

  constructor(
    private el: ElementRef,
    private render: Renderer,
    private render2: Renderer2,
    private service: ICheckService,
    @Inject(ICheckConfig) @Optional() options: ICheckConfigArgs
  ) {
    this._nodeType = this.el.nativeElement.type === 'checkbox' ? 'Checkbox' : 'Radio';
    Object.assign(this._config, options);
  }

  ngOnInit() {
    if (this._config.handle.length > 0 && this._config.handle !== this._nodeType.toLowerCase()) {
      return;
    }
    this._initialConfig();
    this._view();
  }

  check() {
    this.el.nativeElement.checked = true;
    this.update();
  }

  uncheck() {
    this.el.nativeElement.checked = false;
    this.update();
  }

  update() {
    setTimeout(() => {
      if (this.el.nativeElement.checked) {
        if (this.uncheckedClass.length > 0) {
          this.render2.removeClass(this._wrapper, this.uncheckedClass);
        }
        if (this.checkedClass.length > 0) {
          this.render2.addClass(this._wrapper, this.checkedClass);
        }
      } else {
        if (this.checkedClass.length > 0) {
          this.render2.removeClass(this._wrapper, this.checkedClass);
        }
        if (this.uncheckedClass.length > 0) {
          this.render2.addClass(this._wrapper, this.uncheckedClass);
        }
      }
      if (this.el.nativeElement.disabled) {
        if (this.enabledClass.length > 0) {
          this.render2.removeClass(this._wrapper, this.enabledClass);
        }
        if (this.disabledClass.length > 0) {
          this.render2.addClass(this._wrapper, this.disabledClass);
        }
      } else {
        if (this.disabledClass.length > 0) {
          this.render2.removeClass(this._wrapper, this.disabledClass);
        }
        if (this.enabledClass.length > 0) {
          this.render2.addClass(this._wrapper, this.enabledClass);
        }
      }
    }, 50);
  }

  private _initialConfig() {
    this.iCheckClass = this.iCheckClass || this._config[this._nodeType.toLowerCase() + 'Class'];
    ['checked', 'unchecked', 'disabled', 'enabled', 'indeterminate', 'determinate'].forEach((prefix) => {
      this[prefix + 'Class'] = this[prefix + 'Class'] || this._config[prefix + this._nodeType + 'Class'] || this._config[prefix + 'Class'];
    });
    ['hoverClass', 'focusClass', 'activeClass', 'labelHover', 'labelHoverClass'].forEach((name) => {
      this[name] = this[name] || this._config[name];
    });
  }

  private _view() {
    this._parentNode = this.render2.parentNode(this.el.nativeElement);
    this._wrapper = this.render2.createElement('div');
    this.render2.addClass(this._wrapper, this.iCheckClass);
    this.render2.setStyle(this.el.nativeElement, 'position', 'absolute');
    this.render2.setStyle(this.el.nativeElement, 'opacity', 0);

    const ins = this.render2.createElement('ins');
    this.render2.addClass(ins, 'iCheck-helper');
    const layer = {
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'block',
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0,
      background: 'rgb(255, 255, 255)',
      border: 0,
      opacity: 0
    };
    Object.keys(layer).forEach((key) => this.render2.setStyle(ins, key, layer[key]));

    this.render2.insertBefore(this._parentNode, this._wrapper, this.el.nativeElement);
    this.render2.appendChild(this._wrapper, this.el.nativeElement);
    this.render2.appendChild(this._wrapper, ins);
    this.update();

    /*this.render.listen(this._parentNode, 'mouseenter', (e) => {
      e.stopPropagation();
      setTimeout(() => {
        this._parentNode.childNodes.forEach((el) => el.nodeType === 1 && this.render2.addClass(el, 'hover'));
      }, 50);
    });

    this.render.listen(this._parentNode, 'mouseleave', (e) => {
      e.stopPropagation();
      setTimeout(() => {
        this._parentNode.childNodes.forEach((el) => el.nodeType === 1 && this.render2.removeClass(el, 'hover'));
      }, 50);
    });

    this.render.listen(this.el.nativeElement, 'click', (e) => {
      e.stopPropagation();
      this.update();
    });*/

  }

}
