import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { LandingComponent } from './conteiners/landing/landing.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { ButtonsComponent } from './conteiners/buttons/buttons.component';
import { CategoriesComponent } from './conteiners/categories/categories.component';
import { InputsComponent } from './conteiners/inputs/inputs.component';
import { RadiobuttonsComponent } from './conteiners/radiobuttons/radiobuttons.component';
import { CheckboxesComponent } from './conteiners/checkboxes/checkboxes.component';
import { TogglebuttonComponent } from './conteiners/togglebutton/togglebutton.component';
import { CardpageComponent } from './conteiners/cardpage/cardpage.component';
import { DividerComponent } from './conteiners/divider/divider.component';
import { ExpansionpageComponent } from './conteiners/expansionpage/expansionpage.component';
import { SelectPageComponent } from './conteiners/select-page/select-page.component';
import { NeomorphSelectComponent } from './components/neomorph-select/neomorph-select.component';
import { MenuPageComponent } from './conteiners/menu-page/menu-page.component';
import { ToolbarPageComponent } from './conteiners/toolbar-page/toolbar-page.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import { TubsComponent } from './conteiners/tubs/tubs.component';
import { DialogComponent } from './conteiners/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogPageComponent } from './conteiners/dialog/dialog-page/dialog-page.component';
import { BadgesComponent } from './conteiners/badges/badges.component';
import { ChipsComponent } from './conteiners/chips/chips.component';
import { ProgressbarComponent } from './conteiners/progressbar/progressbar.component';
import { AboutComponent } from './conteiners/about/about.component';
import { ContactsComponent } from './conteiners/contacts/contacts.component';
import { ComponentsComponent } from './conteiners/components/components.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ButtonComponent,
    CardComponent,
    ExpansionPanelComponent,
    LandingComponent,
    SidenavComponent,
    ButtonsComponent,
    CategoriesComponent,
    InputsComponent,
    RadiobuttonsComponent,
    CheckboxesComponent,
    TogglebuttonComponent,
    CardpageComponent,
    DividerComponent,
    ExpansionpageComponent,
    SelectPageComponent,
    NeomorphSelectComponent,
    MenuPageComponent,
    ToolbarPageComponent,
    TubsComponent,
    DialogComponent,
    DialogPageComponent,
    BadgesComponent,
    ChipsComponent,
    ProgressbarComponent,
    AboutComponent,
    ContactsComponent,
    ComponentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatIconModule,
    MatSidenavModule,
    MatTabsModule,
    MatDialogModule,
    RouterModule
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
