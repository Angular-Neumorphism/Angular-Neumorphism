import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-neomorph-select',
  templateUrl: './neomorph-select.component.html',
  styleUrls: ['./neomorph-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NeomorphSelectComponent implements AfterViewInit {
  // @Input()
  // public label: string;

  // @Input()
  // public placeholder: string;

  // @Input()
  // public selected: string;

  // @Input()
  // public required = false;

  // @Input()
  // public disabled = false;

  // public fakeSelectOptionsList: HTMLElement;

  // @ViewChild('selectWrapper') selectWrapper: ElementRef;
  // @ViewChild('select') select: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    var x, i, j, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName('custom-select');
    for (i = 0; i < x.length; i++) {
      selElmnt = x[i].getElementsByTagName('select')[0];
      /* For each element, create a new DIV that will act as the selected item: */
      a = document.createElement('DIV');
      a.setAttribute('class', 'select-selected');
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
      /* For each element, create a new DIV that will contain the option list: */
      b = document.createElement('DIV');
      b.setAttribute('class', 'select-items select-hide');
      for (j = 1; j < selElmnt.length; j++) {
        /* For each option in the original select element,
    create a new DIV that will act as an option item: */
        c = document.createElement('DIV');
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener('click', function (e) {
          /* When an item is clicked, update the original select box,
        and the selected item: */
          var y, i, k, s, h;
          s = this.parentNode.parentNode.getElementsByTagName('select')[0];
          h = this.parentNode.previousSibling;
          for (i = 0; i < s.length; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName('same-as-selected');
              for (k = 0; k < y.length; k++) {
                y[k].removeAttribute('class');
              }
              this.setAttribute('class', 'same-as-selected');
              break;
            }
          }
          h.click();
        });
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener('click', function (e) {
        /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle('select-hide');
        this.classList.toggle('select-arrow-active');
      });
    }

    function closeAllSelect(elmnt) {
      /* A function that will close all select boxes in the document,
  except the current select box: */
      var x,
        y,
        i,
        arrNo = [];
      x = document.getElementsByClassName('select-items');
      y = document.getElementsByClassName('select-selected');
      for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i);
        } else {
          y[i].classList.remove('select-arrow-active');
        }
      }
      for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add('select-hide');
        }
      }
    }

    /* If the user clicks anywhere outside the select box,
then close all select boxes: */
    document.addEventListener('click', closeAllSelect);
  }

  // createFakeSelectOptionsList() {
  //   this.fakeSelectOptionsList = document.createElement('DIV');
  //   this.fakeSelectOptionsList.setAttribute(
  //     'class',
  //     'select-items select-hide'
  //   );

  //   for (let j = 1; j < this.select.nativeElement.length; j++) {
  //     /* For each option in the original select element,
  //     create a new DIV that will act as an option item: */
  //     let c = document.createElement('DIV');
  //     c.innerHTML = this.select.nativeElement.options[j].innerHTML;
  //     c.addEventListener('click', function (e) {
  //       /* When an item is clicked, update the original select box,
  //         and the selected item: */
  //       // var y, i, k, s, h;
  //       // s = this.parentNode.parentNode.getElementsByTagName("select")[0];
  //       // h = this.parentNode.previousSibling;
  //       // for (i = 0; i < s.length; i++) {
  //       //   if (s.options[i].innerHTML == this.innerHTML) {
  //       //     s.selectedIndex = i;
  //       //     h.innerHTML = this.innerHTML;
  //       //     y = this.parentNode.getElementsByClassName("same-as-selected");
  //       //     for (k = 0; k < y.length; k++) {
  //       //       y[k].removeAttribute("class");
  //       //     }
  //       //     this.setAttribute("class", "same-as-selected");
  //       //     break;
  //       //   }
  //       // }
  //       // h.click();
  //     });
  //     this.fakeSelectOptionsList.appendChild(c);
  //   }
  //   this.selectWrapper.nativeElement.appendChild(this.fakeSelectOptionsList);
  // }
}
