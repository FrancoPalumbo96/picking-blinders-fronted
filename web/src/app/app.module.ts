import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {ConfirmDialogComponent} from "./components/confirm-dialog/confirm-dialog.component";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import {MatDialogModule} from "@angular/material/dialog";
import {MatToolbarModule} from "@angular/material/toolbar";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { GeneracionPickingListComponent } from './pantallas/generacion-picking-list/generacion-picking-list.component';
import { AcceptDialogComponent } from './components/accept-dialog/accept-dialog.component';
import { ImpresionEtiquetasComponent } from './pantallas/impresion-etiquetas/impresion-etiquetas.component';
import {PickingListRouterGuard} from "./pantallas/PickingListRouterGuard";
import {OrderService} from "../shared/services/order.service";
import { EscanearProductoComponent } from './pantallas/escanear-producto/escanear-producto.component';
import { VistaPickingListComponent } from './pantallas/vista-picking-list/vista-picking-list.component';
import {LabelService} from "../shared/services/label.service";
import {BoxService} from "../shared/services/box.service";
import {StationService} from "../shared/services/station.service";
import { DerivadorComponent } from './pantallas/derivador/derivador/derivador.component';
import { ControlDeCalidadComponent } from './pantallas/control-de-calidad/control-de-calidad.component';
import { MultipleDialogComponent } from './components/multiple-dialog/multiple-dialog.component';
import { ProductoFaltanteComponent } from './pantallas/producto-faltante/producto-faltante.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConfirmDialogComponent,
    GeneracionPickingListComponent,
    AcceptDialogComponent,
    ImpresionEtiquetasComponent,
    EscanearProductoComponent,
    VistaPickingListComponent,
    DerivadorComponent,
    ControlDeCalidadComponent,
    MultipleDialogComponent,
    ProductoFaltanteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    MatDialogModule,
    MatToolbarModule,
    FormsModule,
  ],
  providers: [PickingListRouterGuard, OrderService, LabelService, BoxService, StationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
