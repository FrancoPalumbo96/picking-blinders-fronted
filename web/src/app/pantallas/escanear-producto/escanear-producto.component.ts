import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../../shared/services/order.service";
import {AcceptDialogComponent} from "../../components/accept-dialog/accept-dialog.component";
import {ConfirmDialogComponent} from "../../components/confirm-dialog/confirm-dialog.component";


@Component({
  selector: 'app-escanear-producto',
  templateUrl: './escanear-producto.component.html',
  styleUrls: ['./escanear-producto.component.scss']
})
export class EscanearProductoComponent implements OnInit {

  public boxCode: number;
  dataTable: any;
  constructor(public dialog: MatDialog,
              private _activateRoute: ActivatedRoute,
              private _router: Router) { }

  ngOnInit(): void {
    this.dataTable = this.generateDataTable();
  }

  //Todo traer del back
  generateDataTable(){
    return [
      {
        "id": 1,
        "product": "Pack lapiceras (x12)",
        "quantity": 1
      },
      {
        "id": 2,
        "product": "Liquid Paper (x3)",
        "quantity": 3
      },
      {
        "id": 3,
        "product": "Borratintas (x2)",
        "quantity": 2
      },
      {
        "id": 4,
        "product": "Cuaderno",
        "quantity": 1
      },
      {
        "id": 5,
        "product": "Goma (x6)",
        "quantity": 2
      },
    ]
  }


  getBoxCode(){
    return this.boxCode;
  }

  addProductToBox() {
    if(this.boxCode == null){
      this.openSimpleAlertDialog("Ingresar un código de producto");
      return
    }
    if(!this.isBoxCodeValid()){
      this.openSimpleAlertDialog("El código ingresado no pertenece a un producto de esta caja");
      return;
    } else {
      this.editData()
    }
  }


  finishAddingProducts(){
    const productsLeft = Object.keys(this.dataTable).length;
    if(productsLeft == 0){
      this.openRouteDialog("La caja ha finalizado correctamente", "../../../assets/images/gc.png")
    } else {
      this.openConfirmDialog("Hay productos que no han sido agregados. \n ¿Desea Finalizar la Caja?",
        () => {
          //Todo cambiar estado de la caja a 'Faltante'
          this.openRouteDialog("La caja ha finalizado con productos faltantes",
            "../../../assets/images/warning.png");
      });
    }
  }
  //Todo editar tablas de bd para indicar que el producto fue agregado
  editData(){
    this.getProductById(this.boxCode).quantity -= 1;
    if(this.getProductById(this.boxCode).quantity == 0){
      const boxSelected = this.boxCode;
      const index = this.dataTable.findIndex(function(prod, i){
        return prod.id == boxSelected
      });
      this.dataTable.splice(index, 1);
      const productsLeft = Object.keys(this.dataTable).length;
      if(productsLeft == 0){
        this.finishAddingProducts();
      }
    }
  }

  getProductById(id){
    return this.dataTable.find(prod => prod.id == id)
  }

  isBoxCodeValid():boolean{
    return this.getProductById(this.boxCode) != undefined;
  }

  //TODO este metodo se repite en varios components, meterlo en un service
  openSimpleAlertDialog(text){
    this.dialog.open(AcceptDialogComponent, {
      "data": {
        "text": text,
        "textType": "Alert"
      }
    });
  }

  openConfirmDialog(text, func){
    this.dialog.open(ConfirmDialogComponent, {
      "data": {
        "text": text,
        "textType": "Confirmación"
      }
    })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          func()
        }
      })
  }

  openRouteDialog(text, imgRelativePath = undefined){
    this.dialog.open(AcceptDialogComponent, {
      "data": {
        "text": text,
        "textType": "Alert",
        "route": "/picking_list",
        "imgPath": imgRelativePath
      }
    });
  }


}
