import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './containers/landing/landing.component';
import { ButtonsComponent } from './containers/buttons/buttons.component';
import { CategoriesComponent } from './containers/categories/categories.component';
import { InputsComponent } from './containers/inputs/inputs.component';
import { RadiobuttonsComponent } from './containers/radiobuttons/radiobuttons.component';
import { CheckboxesComponent } from './containers/checkboxes/checkboxes.component';
import { TogglebuttonComponent } from './containers/togglebutton/togglebutton.component';
import { CardpageComponent } from './containers/cardpage/cardpage.component';
import { DividerComponent } from './containers/divider/divider.component';
import { ExpansionpageComponent } from './containers/expansionpage/expansionpage.component';
import { SelectPageComponent } from './containers/select-page/select-page.component';
import { MenuPageComponent } from './containers/menu-page/menu-page.component';
import { ToolbarPageComponent } from './containers/toolbar-page/toolbar-page.component';
import { TubsComponent } from './containers/tubs/tubs.component';
import { DialogComponent } from './containers/dialog/dialog.component';
import { BadgesComponent } from './containers/badges/badges.component';
import { ChipsComponent } from './containers/chips/chips.component';
import { ProgressbarComponent } from './containers/progressbar/progressbar.component';
import { AboutComponent } from './containers/about/about.component';
import { ContactsComponent } from './containers/contacts/contacts.component';
import { ComponentsComponent } from './containers/components/components.component';
import { SnackbarComponent } from './containers/snackbar/snackbar.component';
import { NeoSliderContainerComponent } from './containers/neo-slider-container/neo-slider-container.component';
import { RippleContainerComponent } from './containers/ripple/ripple-container/ripple-container.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: '',
        redirectTo: 'components',
        pathMatch: 'full',
      },
      {
        path: 'components',
        component: ComponentsComponent,
        children: [
          { path: '', component: CategoriesComponent },
          { path: 'buttons', component: ButtonsComponent },
          { path: 'input', component: InputsComponent },
          { path: 'checkbox', component: CheckboxesComponent },
          { path: 'radiobutton', component: RadiobuttonsComponent },
          { path: 'togglebutton', component: TogglebuttonComponent },
          { path: 'card', component: CardpageComponent },
          { path: 'divider', component: DividerComponent },
          { path: 'expansion', component: ExpansionpageComponent },
          { path: 'select', component: SelectPageComponent },
          { path: 'menu', component: MenuPageComponent },
          { path: 'toolbar', component: ToolbarPageComponent },
          { path: 'tabs', component: TubsComponent },
          { path: 'dialog', component: DialogComponent },
          { path: 'badges', component: BadgesComponent },
          { path: 'progressbar', component: ProgressbarComponent },
          { path: 'chips', component: ChipsComponent },
          { path: 'snackbar', component: SnackbarComponent },
          { path: 'slider', component: NeoSliderContainerComponent },
          { path: 'ripple', component: RippleContainerComponent },
        ],
      },
      { path: 'about', component: AboutComponent },
      { path: 'contacts', component: ContactsComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
