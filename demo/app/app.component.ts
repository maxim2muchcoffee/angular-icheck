import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { ICheckComponent } from '../../module/icheck.component';

export const fadeIn = trigger('fadeIn', [
  state('out', style({ height: 0, opacity: 0 })),
  state('in', style({ height: '*', opacity: 1 })),
  /*transition('out => in', [
    animate(3000, keyframes([
      style({ height: '*', opacity: 0, offset: 0 }), // 元素高度0，元素隐藏(透明度为0)，动画帧在0%
      style({ height: '*', opacity: 1, offset: 1 }) // 200ms后高度自适应展开，元素展开(透明度为1)，动画帧在100%
    ]))
  ])*/
  transition('out <=> in', animate(300))
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ fadeIn ]
})
export class AppComponent {

  @ViewChild('callbacks') callbacksRef: ElementRef;
  @ViewChild('input1') input1: ICheckComponent;
  @ViewChild('input2') input2: ICheckComponent;
  @ViewChild('input3') input3: ICheckComponent;
  @ViewChild('input4') input4: ICheckComponent;

  private fadeInMarkup1 = 'out';
  private fadeIn = {
    doCheck: 'out',
    doUncheck: 'out',
    doDisable: 'out',
    doEnable: 'out'
  };

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

}
