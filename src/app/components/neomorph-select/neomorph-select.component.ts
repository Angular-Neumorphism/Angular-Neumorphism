import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';

import { trigger, state, style, transition, animate} from '@angular/animations';

export const Animations = [
  trigger('dropdownAnimation', [
      state('true', style({
          maxHeight: '{{numberOfDropdownItems}}px',
          overflow: 'hidden'
      }),  {params: {numberOfDropdownItems: 1}}),
      state('false',   style({
          maxHeight: '0px',
          overflow: 'hidden',
          opacity:0
      })),
      transition('true => false', animate('600ms ease-out')),
      transition('false => true', animate('1000ms ease-in'))
  ])
]

@Component({
  selector: 'app-neomorph-select',
  templateUrl: './neomorph-select.component.html',
  styleUrls: ['./neomorph-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NeomorphSelectComponent implements AfterViewInit {
  // @Input()
  // public label: string;

  @Input()
  public placeholder: string;

  // @Input()
  // public selected: string;

  // @Input()
  // public required = false;

  // @Input()
  // public disabled = false;

  public customSelectElement: HTMLElement;
  public originalSelect: HTMLSelectElement;
  public fakeSelect: HTMLElement;
  public fakeSelectList: HTMLElement;
  public fakeSelectText: HTMLElement;

  public isOpen = false;

  @ViewChild('customSelect') customSelect: ElementRef;
  @ViewChild('select') select: ElementRef;
  @ViewChild('fakeSelect') fakeSelectRef: ElementRef;
  @ViewChild('fakeSelectList') fakeSelectListRef: ElementRef;
  @ViewChild('fakeSelectText') fakeSelectTextRef: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    this.customSelectElement = this.customSelect.nativeElement;
    this.originalSelect = this.select.nativeElement;
    this.fakeSelect = this.fakeSelectRef.nativeElement;
    this.fakeSelectList = this.fakeSelectListRef.nativeElement;
    this.fakeSelectText = this.fakeSelectTextRef.nativeElement;
    this.createFakeOptionsList();

    this.fakeSelect.addEventListener('click', (e) => {
      e.stopPropagation();
      this.isOpen = !this.isOpen
      this.fakeSelectList.classList.toggle('select-hide');
      this.fakeSelect.classList.toggle('select-arrow-active');
    });
    document.addEventListener('click', this.closeSelect.bind(this));
  }

  createFakeOptionsList() {
    for (let j = 0; j < this.originalSelect.length; j++) {
      const fakeOptionItem = document.createElement('DIV');
      fakeOptionItem.innerHTML = this.originalSelect.options[j].innerHTML;
      fakeOptionItem.addEventListener('click', (e) => {
        for (let i = 0; i < this.originalSelect.length; i++) {
          if (
            this.originalSelect.options[i].innerHTML ===
            fakeOptionItem.innerHTML
          ) {
            this.fakeSelect.classList.remove('not-choosen');
            this.originalSelect.selectedIndex = i;
            this.fakeSelectText.innerHTML = fakeOptionItem.innerHTML;
            this.fakeSelect.classList.toggle('select-arrow-active');
            const fakeItemPrevioseChoosed = document.getElementsByClassName(
              'same-as-selected'
            );
            if (fakeItemPrevioseChoosed[0]) {
              fakeItemPrevioseChoosed[0].removeAttribute('class');
            }

            fakeOptionItem.setAttribute('class', 'same-as-selected');
          }
        }
      });
      this.fakeSelectList.appendChild(fakeOptionItem);
    }
  }

  closeSelect() {
    const list = document.getElementsByClassName('select-items');
    if (list) {
      list[0].classList.add('select-hide');
      this.fakeSelect.classList.remove('select-arrow-active');
    }
  }
}
