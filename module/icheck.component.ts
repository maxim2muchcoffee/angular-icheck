import { Component, OnInit, Input, ElementRef, Renderer, Renderer2 } from '@angular/core';

@Component({
  selector: 'input[type="checkbox"][icheck], input[type="radio"][icheck]',
  template: '123123'
})
export class ICheckComponent implements OnInit {

  @Input()
  checkboxClass = 'icheckbox';

  @Input()
  radioClass = 'iradio';

  private _parentNode: any;
  private _wrapper: any;

  constructor(
    private el: ElementRef,
    private render: Renderer,
    private render2: Renderer2
  ) { }

  ngOnInit() {
    this._parentNode = this.render2.parentNode(this.el.nativeElement);
    this._wrapper = this.render2.createElement('div');
    if (this.el.nativeElement.type === 'checkbox') {
      this.render2.addClass(this._wrapper, this.checkboxClass);
    } else {
      this.render2.addClass(this._wrapper, this.radioClass);
    }
    // this.render2.setStyle(this._wrapper, 'position', 'relative');
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
  }

  update() {
    setTimeout(() => {
      if (this.el.nativeElement.checked) {
        this.render2.addClass(this._wrapper, 'checked');
      } else {
        this.render2.removeClass(this._wrapper, 'checked');
      }
      if (this.el.nativeElement.disabled) {
        this.render2.addClass(this._wrapper, 'disabled');
      } else {
        this.render2.removeClass(this._wrapper, 'disabled');
      }
    }, 50);
  }

}
