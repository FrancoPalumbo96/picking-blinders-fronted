import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GeneracionPickingListComponent} from "./pantallas/generacion-picking-list/generacion-picking-list.component";
import {ImpresionEtiquetasComponent} from "./pantallas/impresion-etiquetas/impresion-etiquetas.component";
import {EscanearProductoComponent} from "./pantallas/escanear-producto/escanear-producto.component";

import {PickingListRouterGuard} from "./pantallas/PickingListRouterGuard";
import {VistaPickingListComponent} from "./pantallas/vista-picking-list/vista-picking-list.component";
import {DerivadorComponent} from "./pantallas/derivador/derivador/derivador.component";
import {ControlDeCalidadComponent} from "./pantallas/control-de-calidad/control-de-calidad.component";
// @ts-ignore
import {ProductoFaltanteComponent} from "./pantallas/producto-faltante/producto-faltante.component";

const routes: Routes = [
  {path: 'generacion_picking_list', component: GeneracionPickingListComponent},
  {path: 'impresion_etiquetas', component:ImpresionEtiquetasComponent},
  {path: 'picking_list', component:VistaPickingListComponent},
  //TODO config Guard
  {path: 'escanear_productos', component:EscanearProductoComponent},
  {path: 'derivador', component: DerivadorComponent},
  {path: 'control-de-calidad', component:ControlDeCalidadComponent},
  {path: 'producto-faltante', component:ProductoFaltanteComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
