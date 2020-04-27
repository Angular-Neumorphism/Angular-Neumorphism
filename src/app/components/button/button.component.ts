import {
  Component,
  OnInit,
  ElementRef,
  ViewEncapsulation,
  AfterViewInit,
  HostListener,
  ViewChild,
} from '@angular/core';
import { TimelineMax , gsap} from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin'

enum ButtonTypes {
  basic = 'basic',
  primary = 'primary',
  warn = 'warn',
}

const BUTTON_HOST_ATTRIBUTES = [
  'basic',
  'primary',
  'disabled',
  'warn',
  'neo-button',
];
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button[neo-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  public buttonType = 'basic';
  public useX = null;
  public useY = null;

  constructor(private elementRef: ElementRef) {
    gsap.registerPlugin(CSSPlugin)
    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this._hasHostAttributes(attr)) {
        if (attr === ButtonTypes.primary) {
          this.buttonType = ButtonTypes.primary;
        }
        if (attr === ButtonTypes.warn) {
          this.buttonType = ButtonTypes.warn;
        }
        (this._getHostElement() as HTMLElement).classList.add(attr);
      }
    }
  }

  @ViewChild('ripple') ripple: ElementRef;
  @HostListener('click', ['$event'])
  ckickHandler(event) {
    this.rippleAnimation.call(this, event, 1);
  }

  rippleAnimation(event, timing) {
    const tl = new TimelineMax();
    const rect = event.currentTarget.getBoundingClientRect();
    const xData = event.clientX - rect.left - 3;
    const yData = event.clientY - rect.top - 4;
    const w = event.currentTarget.offsetWidth;
    const h = event.currentTarget.offsetHeight;
    const offsetX = Math.abs(w / 2 - xData);
    const offsetY = Math.abs(h / 2 - yData);
    const deltaX = w / 2 + offsetX;
    const deltaY = h / 2 + offsetY;
    const scaleRatio = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    // this.useX = xData;
    // this.useY = yData;
    // if (this.ripple.nativeElement.hasAttribute('x')) {
    //   console.log(this.ripple.nativeElement.attributes)
    //   this.ripple.nativeElement.removeAttribute('x');
    // }
    // if (this.ripple.nativeElement.hasAttribute('y')) {
    //   this.ripple.nativeElement.removeAttribute('y');
    // }
    // this.ripple.nativeElement.setAttribute('x', xData);
    // this.ripple.nativeElement.setAttribute('y', xData);

    tl.fromTo(
      this.ripple.nativeElement,
      timing,
      {
        x: xData,
        y: yData,
        transformOrigin: '50% 50%',
        scale: 0,
        opacity: 1,
        ease: 'easeIn',
      },
      {
        scale: scaleRatio,
        opacity: 0,
      }
    );
    return tl;
  }

  private _getHostElement() {
    return this.elementRef.nativeElement;
  }

  private _hasHostAttributes(...attributes: string[]) {
    return attributes.some((attribute) =>
      this._getHostElement().hasAttribute(attribute)
    );
  }
}
