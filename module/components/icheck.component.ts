import { Component, Inject, Output, OnChanges, EventEmitter, Optional, OnInit, OnDestroy, Input, ElementRef, Renderer, Renderer2 } from '@angular/core';
import { ICheckRadioService } from '../services/icheck-radio.service';
import { ICheckConfig, ICheckConfigArgs } from '../icheck.config';
import { Subscription } from 'rxjs/Subscription';

interface ICheckEvent {
  target: any;
  type: string;
  timestamp: number;
}

@Component({
  selector: 'input[type="checkbox"][icheck], input[type="radio"][icheck]',
  template: ''
})
export class ICheckComponent implements OnInit, OnChanges, OnDestroy {

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

  @Output() ifClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() ifChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() ifChecked: EventEmitter<any> = new EventEmitter<any>();
  @Output() ifUnchecked: EventEmitter<any> = new EventEmitter<any>();
  @Output() ifToggled: EventEmitter<any> = new EventEmitter<any>();
  @Output() ifDisabled: EventEmitter<any> = new EventEmitter<any>();
  @Output() ifEnabled: EventEmitter<any> = new EventEmitter<any>();
  @Output() ifIndeterminate: EventEmitter<any> = new EventEmitter<any>();
  @Output() ifDeterminate: EventEmitter<any> = new EventEmitter<any>();

  private _nodeType: 'Checkbox' | 'Radio';
  private _parentNode: any;
  private _wrapper: any;
  private _subscription: Subscription;
  private _name: string;
  private _value: string;

  constructor(
    private el: ElementRef,
    private render: Renderer,
    private render2: Renderer2,
    private service: ICheckRadioService,
    @Inject(ICheckConfig) private _config: ICheckConfig
  ) {
    this._nodeType = this.el.nativeElement.type.toLowerCase() === 'checkbox' ? 'Checkbox' : 'Radio';
  }

  ngOnInit() {
    if (this._config.handle !== '' && this._config.handle !== this._nodeType.toLowerCase()) {
      return;
    }
    this._initialConfig();
    this._view();
    this._events();
    this._registry();
  }

  ngOnChanges(attributes) {
    if (Object.keys(attributes).indexOf('iCheckClass') !== -1) {
      if (attributes.iCheckClass.firstChange) {
        return;
      }
      if (attributes.iCheckClass.previousValue) {
        this.render2.removeClass(this._wrapper, attributes.iCheckClass.previousValue);
      }
      if (attributes.iCheckClass.currentValue) {
        this.render2.addClass(this._wrapper, attributes.iCheckClass.currentValue);
      }
    }
  }

  ngOnDestroy() {
    this._unregistry();
  }

  check() {
    if (this.el.nativeElement.disabled || this.el.nativeElement.checked) {
      return;
    }
    if (this._isRadio() && this._name && this._value) {
      this.service.trigger(this._name, this._value);
    }
    this.el.nativeElement.checked = true;
    this._emit('ifChanged');
    this._emit('ifToggled');
    this._emit('ifChecked');
    this.update();
  }

  uncheck() {
    if (!this.el.nativeElement.checked) {
      return;
    }
    this.el.nativeElement.checked = false;
    this._emit('ifChanged');
    this._emit('ifToggled');
    this._emit('ifUnchecked');
    this.update();
  }

  toggle() {
    if (this.el.nativeElement.checked) {
      this.uncheck();
    } else {
      this.check();
    }
  }

  disable() {
    if (this.el.nativeElement.disabled) {
      return;
    }
    this.el.nativeElement.disabled = true;
    this._emit('ifChanged');
    this._emit('ifDisabled');
    this.update();
  }

  enable() {
    if (!this.el.nativeElement.disabled) {
      return;
    }
    this.el.nativeElement.disabled = false;
    this._emit('ifChanged');
    this._emit('ifEnabled');
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

  private _isRadio() {
    return this._nodeType === 'Radio';
  }

  private _registry() {
    if (this._isRadio()) {
      this._name = this.el.nativeElement.getAttribute('name');
      if (this._name) {
        const result = this.service.registry(this._name);
        this._value = result.value;
        this._subscription = result.observable.subscribe((value) => {
          if (value !== this._value) {
            this.uncheck();
          }
        });
      }
    }
  }

  private _unregistry() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
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

  private _isTheme(theme) {
    if (this._isRadio()) {
      return this.iCheckClass.indexOf('iradio_' + theme.toLowerCase()) === 0;
    } else {
      return this.iCheckClass.indexOf('icheckbox_' + theme.toLowerCase()) === 0;
    }
  }

  private _view() {
    this._parentNode = this.render2.parentNode(this.el.nativeElement);
    // 取消label与input的关联
    if (this._parentNode.nodeName.toLowerCase() === 'label') { // 父节点是 label 则赋值 for 属性为空
      this._parentNode.setAttribute('for', '');
    }
    this.render2.setStyle(this._parentNode, 'position', 'relative');
    this.render2.setStyle(this._parentNode, 'padding-left', '35px');
    this._parentNode.childNodes.forEach((el) => {
      if (el.nodeType === 1 && el.nodeName.toLowerCase() === 'label') { // 删除所有兄弟 label 节点的 for 属性
        el.removeAttribute('for');
      }
    });
    // 格式化 DOM
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
    if (this._isTheme('line')) {
      const icon = this.render2.createElement('div');
      this.render2.addClass(icon, 'icheck_line-icon');
      this.render2.appendChild(this._wrapper, icon);
      let label = '';
      if (this._parentNode.nodeName.toLowerCase() === 'label') {
        this._parentNode.childNodes.forEach((el) => {
          if (el.nodeType === 3) {
            label += el.data;
          }
          this.render2.removeChild(this._parentNode, el);
        });
      }
      this._parentNode.childNodes.forEach((el) => {
        if (el.nodeType === 1 && el.nodeName.toLowerCase() === 'label') { // 删除所有兄弟 label 节点的 for 属性
          label += el.innerHTML;
          this.render2.removeChild(this._parentNode, el);
        }
      });
      const text = this.render2.createText(label);
      this.render2.appendChild(this._wrapper, text);
    }
    this.render2.appendChild(this._wrapper, ins);
    this.update();
  }

  private _emit(eventName: string) {
    if (!this[eventName]) {
      return;
    }
    this[eventName].emit({
      target: this.el,
      type: eventName,
      timestamp: Date.now()
    });
  }

  private _events() {
    this.render.listen(this._parentNode, 'mouseenter', (e) => {
      e.stopPropagation();
      setTimeout(() => {
        if (this._config.hoverClass) {
          this.render2.addClass(this._wrapper, this._config.hoverClass);
          if (this._config.labelHover) {
            if (this._parentNode.nodeName.toLowerCase() === 'label') {
              this.render2.addClass(this._parentNode, this._config.labelHoverClass || this._config.hoverClass);
            }
            this._parentNode.childNodes.forEach((el) => {
              if (el.nodeType === 1 && el.nodeName.toLowerCase() === 'label') {
                this.render2.addClass(el, this._config.labelHoverClass || this._config.hoverClass);
              }
            });
          }
        }
      }, 50);
    });

    this.render.listen(this._parentNode, 'mouseleave', (e) => {
      e.stopPropagation();
      setTimeout(() => {
        if (this._config.hoverClass) {
          this.render2.removeClass(this._wrapper, this._config.hoverClass);
          if (this._config.labelHover) {
            if (this._parentNode.nodeName.toLowerCase() === 'label') {
              this.render2.removeClass(this._parentNode, this._config.labelHoverClass || this._config.hoverClass);
            }
            this._parentNode.childNodes.forEach((el) => {
              if (el.nodeType === 1 && el.nodeName.toLowerCase() === 'label') {
                this.render2.removeClass(el, this._config.labelHoverClass || this._config.hoverClass);
              }
            });
          }
        }
      }, 50);
    });

    this.render.listen(this._parentNode, 'click', (e) => {
      e.stopPropagation();
      if (this.el.nativeElement.disabled) {
        return;
      }
      this._emit('ifClicked');
      if (this._isRadio()) {
        this.check();
      } else {
        if (this.el.nativeElement.checked) {
          this.uncheck();
        } else {
          this.check();
        }
      }
    });
  }

}
