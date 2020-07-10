import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { LandingComponent } from './containers/landing/landing.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
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
import { NeomorphSelectComponent } from './components/neomorph-select/neomorph-select.component';
import { MenuPageComponent } from './containers/menu-page/menu-page.component';
import { ToolbarPageComponent } from './containers/toolbar-page/toolbar-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TubsComponent } from './containers/tubs/tubs.component';
import { DialogComponent } from './containers/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogPageComponent } from './containers/dialog/dialog-page/dialog-page.component';
import { BadgesComponent } from './containers/badges/badges.component';
import { ChipsComponent } from './containers/chips/chips.component';
import { ProgressbarComponent } from './containers/progressbar/progressbar.component';
import { AboutComponent } from './containers/about/about.component';
import { ContactsComponent } from './containers/contacts/contacts.component';
import { ComponentsComponent } from './containers/components/components.component';
import { SnackbarComponent } from './containers/snackbar/snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CodeEmbedComponent } from './containers/code-embed/code-embed.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { ElementExampleComponent } from './containers/element-example/element-example.component';
import { ApiDescriptionComponent } from './containers/api-description/api-description.component';

import { NeoFormFieldModule } from '@neomorphism/ng-neomorphism/neo-form-field';
import { NeoCheckboxModule } from '@neomorphism/ng-neomorphism/neo-checkbox';
import { NeoButtonModule } from '@neomorphism/ng-neomorphism/neo-button';
import { NeoDividerModule } from '@neomorphism/ng-neomorphism/neo-divider';
import { NeoCardModule } from '@neomorphism/ng-neomorphism/neo-card';
import { NeoInputModule } from '@neomorphism/ng-neomorphism/neo-input';
import { NeoToolbarModule } from '@neomorphism/ng-neomorphism/neo-toolbar';
import { NeoTabsModule } from '@neomorphism/ng-neomorphism/neo-tabs';
import { NeoProgressBarModule } from '@neomorphism/ng-neomorphism/neo-progressbar';
import { NeoRadioButtonModule } from '@neomorphism/ng-neomorphism/neo-radio';
import { NeoBadgeModule } from '@neomorphism/ng-neomorphism/neo-badge';
import { NeoSlideToggleModule } from '@neomorphism/ng-neomorphism/neo-slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
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
    ComponentsComponent,
    SnackbarComponent,
    CodeEmbedComponent,
    ElementExampleComponent,
    ApiDescriptionComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatIconModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatDialogModule,
    RouterModule,
    NeoButtonModule,
    NeoDividerModule,
    NeoCardModule,
    NeoToolbarModule,
    NeoInputModule,
    NeoFormFieldModule,
    NeoProgressBarModule,
    NeoCheckboxModule,
    MatTabsModule,
    NeoTabsModule,
    MatDividerModule,
    NeoRadioButtonModule,
    NeoBadgeModule,
    NeoSlideToggleModule,
  ],
  entryComponents: [DialogComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
