import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { ICheckComponent } from '../../module/icheck.component';

export const fadeIn = trigger('fadeIn', [
  state('out', style({ height: 0, opacity: 0 })),
  state('in', style({ height: '*', opacity: 1 })),
  transition('out <=> in', animate(300))
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ fadeIn ]
})
export class AppComponent {

  fadeIn = {
    doCheck: 'out',
    doUncheck: 'out',
    doDisable: 'out',
    doEnable: 'out'
  };

  skins = [
    { name: 'Minimal skin',  theme: 'minimal',  color: 'minimal',      tab: 'demo' },
    { name: 'Square skin',   theme: 'square',   color: 'square-green', tab: 'demo' },
    { name: 'Flat skin',     theme: 'flat',     color: 'flat-red',     tab: 'demo'},
    { name: 'Line skin',     theme: 'line',     color: 'line-blue',    tab: 'demo' },
    { name: 'Polaris skin',  theme: 'polaris',  color: 'polaris',      tab: 'demo' },
    { name: 'Futurico skin', theme: 'futurico', color: 'futurico',     tab: 'demo' }
  ];

  @ViewChild('callbacks') callbacksRef: ElementRef;
  @ViewChild('input1') input1: ICheckComponent;
  @ViewChild('input2') input2: ICheckComponent;
  @ViewChild('input3') input3: ICheckComponent;
  @ViewChild('input4') input4: ICheckComponent;

  private fadeInMarkup1 = 'out';
  private colors = [
    { label: 'Black', class: '', color: '' },
    { label: 'Red', class: 'red', color: 'red' },
    { label: 'Green', class: 'green', color: 'green' },
    { label: 'Blue', class: 'blue', color: 'blue' },
    { label: 'Aero', class: 'aero', color: 'aero' },
    { label: 'Grey', class: 'grey', color: 'grey' },
    { label: 'Orange', class: 'orange', color: 'orange' },
    { label: 'Yellow', class: 'yellow', color: 'yellow' },
    { label: 'Pink', class: 'pink', color: 'pink' },
    { label: 'Purple', class: 'purple', color: 'purple' }
  ];

  @ViewChild('exampleCheckbox') iCheckComponentRef: ICheckComponent;
  constructor(
    private render2: Renderer2
  ) { }


  log(event, name) {
    const node = this.render2.createElement('li');
    node.innerHTML = '<span>#' + name + '</span> is ' + event.type.replace('if', '').toLowerCase();
    this.render2.insertBefore(this.callbacksRef.nativeElement, node, this.callbacksRef.nativeElement.children[0]);
  }

  doCheck() {
    this.input1.check();
    this.input3.check();
  }

  doUncheck() {
    this.input1.uncheck();
    this.input3.uncheck();
  }

  doDisable() {
    this.input2.disable();
    this.input4.disable();
  }

  doEnable() {
    this.input2.enable();
    this.input4.enable();
  }

  fadeInOut(name) {
    if (!this.fadeIn[name]) {
      return;
    }
    this.fadeIn[name] = this.fadeIn[name] === 'out' ? 'in' : 'out';
  }

  changeColor(theme, color) {
    const scheme = this.skins.find((item) => item.theme === theme);
    if (!scheme) {
      return;
    }
    if (color.length === 0) {
      scheme.color = theme;
    } else {
      scheme.color = theme + '-' + color;
    }
  }

  changePanel(theme, tab) {
    const scheme = this.skins.find((item) => item.theme === theme);
    if (!scheme || scheme.tab === tab) {
      return;
    }
    scheme.tab = tab;
  }

}
