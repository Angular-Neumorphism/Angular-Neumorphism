import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './conteiners/landing/landing.component';
import { ButtonsComponent } from './conteiners/buttons/buttons.component';
import { CategoriesComponent } from './conteiners/categories/categories.component';
import { InputsComponent } from './conteiners/inputs/inputs.component';
import { RadiobuttonsComponent} from './conteiners/radiobuttons/radiobuttons.component';
import { CheckboxesComponent } from './conteiners/checkboxes/checkboxes.component';
import { TogglebuttonComponent } from './conteiners/togglebutton/togglebutton.component';
import { CardpageComponent } from './conteiners/cardpage/cardpage.component';
import { DividerComponent} from './conteiners/divider/divider.component';
import { ExpansionpageComponent} from './conteiners/expansionpage/expansionpage.component';
import { SelectPageComponent} from './conteiners/select-page/select-page.component'

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: '',
        redirectTo: 'categoties',
        pathMatch: 'full',
      },
      { path: 'categoties', component: CategoriesComponent },
      { path: 'buttons', component: ButtonsComponent },
      { path: 'input', component: InputsComponent },
      { path: 'checkbox', component: CheckboxesComponent },
      { path: 'radiobutton', component: RadiobuttonsComponent },
      { path: 'togglebutton', component: TogglebuttonComponent },
      { path: 'card', component: CardpageComponent },
      { path: 'divider', component: DividerComponent },
      { path: 'expansion', component: ExpansionpageComponent },
      { path: 'select', component: SelectPageComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
