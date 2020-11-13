import { Component, OnInit } from '@angular/core';
import {Box} from "../../../shared/models/box";
import {AcceptDialogComponent} from "../../components/accept-dialog/accept-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {BoxService} from "../../../shared/services/box.service";
import {MultipleDialogComponent} from "../../components/multiple-dialog/multiple-dialog.component";

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
  dataTable: any;
  constructor(public dialog: MatDialog,
              public boxService: BoxService,) { }

  ngOnInit(): void {
    this.dataTable = this.generateDataTable();
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
        //TODO mostrar tabla de productos que faltan en la caja
        this.boxSelected = res;
      } else {
        this.openSimpleAlertDialog("Código de caja inválido");
      }
    });
  }

  productCodeScanned(){
    if(this.productCode == null){
      this.openSimpleAlertDialog("Ingresar un código de producto");
      return
    } else {
      this.isProductCodeValid()
    }
  }

  private isProductCodeValid() {
    const aux = this.getProductById(this.productCode);
    if(aux != undefined){
      //Edit table
      this.editData()
    } else {
      this.openSimpleAlertDialog("El código ingresado no pertenece a un producto de esta caja");
    }

  }

  finishAddingProducts() {
    const productsLeft = Object.keys(this.dataTable).length;
    if(productsLeft == 0){
      //TODO mostrar 2 opciones
      this.openSimpleAlertDialog("La caja ha sido completada", "../../../assets/images/cs.png");
      this.boxSelected = undefined;
      this.dataTable = this.generateDataTable();
    } else {
      this.openMultipleSelectionDialog();
    }
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
            "func": () => {this.boxSelected = undefined;}
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

  generateDataTable(){
    return [
      {
        "id": 1,
        "product": "Pack lapiceras (x12)",
        "quantity": 2
      },
      {
        "id": 2,
        "product": "Cuaderno",
        "quantity": 1
      }
    ]
  }

  getProductById(id){
    return this.dataTable.find(prod => prod.id == id)
  }

  editData(){
    console.log()
    this.getProductById(this.productCode).quantity -= 1;
    if(this.getProductById(this.productCode).quantity == 0){
      const boxSelected = this.productCode;
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

}
