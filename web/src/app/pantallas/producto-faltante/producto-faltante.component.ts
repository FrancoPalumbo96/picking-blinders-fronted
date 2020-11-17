import { Component, OnInit } from '@angular/core';
import {Box} from "../../../shared/models/box";
import {AcceptDialogComponent} from "../../components/accept-dialog/accept-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {BoxService} from "../../../shared/services/box.service";
import {MultipleDialogComponent} from "../../components/multiple-dialog/multiple-dialog.component";
import {PickingListProductQuantity} from "../../../shared/models/pickingListProductQuantity";

@Component({
  selector: 'app-producto-faltante',
  templateUrl: './producto-faltante.component.html',
  styleUrls: ['./producto-faltante.component.scss']
})
export class ProductoFaltanteComponent implements OnInit {

  missingProductTitle: string = "Producto Faltante"
  boxCode: number;
  productCode: number;
  boxSelected: Box = undefined;
  dataTable: PickingListProductQuantity[];

  constructor(public dialog: MatDialog,
              public boxService: BoxService,) { }

  ngOnInit(): void {
  }

  isBoxSelected(): boolean {
    return this.boxSelected != undefined;
  }

  boxCodeScanned(){
    if(this.boxCode == null){
      this.openSimpleAlertDialog("Ingresar un código de caja");
      return
    } else {
      this.isBoxCodeValid();
    }
  }

  isBoxCodeValid() {
    this.boxService.existsBox(this.boxCode).subscribe((res) => {
      if(res){
        if (res.state.name !== "Faltante") {
          this.openSimpleAlertDialog("Caja no asignada para estación de faltantes");
          return;
        }
        this.boxSelected = res;
        this.generateDataTable();
      } else {
        this.openSimpleAlertDialog("Código de caja inválido");
      }
    });
  }

  generateDataTable() {
    this.boxService.getBoxMissingProducts(this.boxCode).subscribe((data) => {
      this.dataTable = data;
    });
  }

  addProductToBox() {
    if(this.productCode == null){
      this.openSimpleAlertDialog("Ingresar un código de producto");
      return;
    }
    if(!this.isProductCodeValid()){
      this.openSimpleAlertDialog("El código ingresado no pertenece a un producto de esta caja");
      return;
    } else {
      this.editData();
    }
  }

  editData(){
    this.getProductById(this.productCode).missingQuantity -= 1;
    if(this.getProductById(this.productCode).missingQuantity == 0){
      if(this.getProductsLeft() == 0){
        this.finishAddingProducts();
      }
    }
  }

  getProductsLeft() {
    let res = 0;
    this.dataTable.forEach(pq => {
      if (pq.missingQuantity > 0) res++;
    });
    return res;
  }

  private isProductCodeValid() {
    let prod = this.getProductById(this.productCode);
    return prod != undefined && prod.missingQuantity > 0;
  }

  getProductById(id){
    return this.dataTable.find(pq => pq.product.id == id);
  }

  finishAddingProducts() {
    if(this.getProductsLeft() == 0){
      this.boxService.changeBoxStateToFinished(this.boxCode).subscribe();
      this.openSimpleAlertDialog("La caja ha sido completada", "../../../assets/images/cs.png");
      this.finishControl();
    } else {
      this.openMultipleSelectionDialog();
    }
  }

  finishControl() {
    this.boxService.updateProductQuantities(this.dataTable).subscribe();
    this.boxCode = null;
    this.productCode = null;
    this.dataTable = null;
    this.boxSelected = undefined;
  }

  openMultipleSelectionDialog(){
    this.dialog.open(MultipleDialogComponent, {
      "data": {
        "body": [
          {
            "title": "Pedido Incompleto",
            "description": "Comunicar que la caja se enviará con productos faltantes",
            "img": "../../../assets/images/mail.png",
            "action": "pedido-incompleto",
            "func": () => {
              this.boxService.changeBoxStateToFinished(this.boxCode).subscribe();
              this.finishControl();
            }
          },
          {
            "title": "Agregar Productos",
            "description": "Continuar el agregado de productos faltantes a la caja",
            "img": "../../../assets/images/plus.png",
            "action": "cerrar",
          }
        ]
      }
    })
  }

  openSimpleAlertDialog(text, img=undefined){
    this.dialog.open(AcceptDialogComponent, {
      "data": {
        "text": text,
        "textType": "Alert",
        "imgPath": img
      }
    });
  }
}
