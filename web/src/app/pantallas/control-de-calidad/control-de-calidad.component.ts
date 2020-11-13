import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {BoxService} from "../../../shared/services/box.service";
import {AcceptDialogComponent} from "../../components/accept-dialog/accept-dialog.component";
import {Router} from "@angular/router";
import {Box} from "../../../shared/models/box";
import {MultipleDialogComponent} from "../../components/multiple-dialog/multiple-dialog.component";

@Component({
  selector: 'app-control-de-calidad',
  templateUrl: './control-de-calidad.component.html',
  styleUrls: ['./control-de-calidad.component.scss']
})
export class ControlDeCalidadComponent implements OnInit {

  public qualityControlTitle: string = "Control de Calidad";
  public boxCode: number;
  public productCode: number;
  public boxSelected: Box = undefined;
  dataTable: any;
  constructor(public dialog: MatDialog,
              public boxService: BoxService,
              ) { }

  ngOnInit(): void {
    this.dataTable = this.generateDataTable();
  }

  //TODO make it a service to avoid repetition
  boxCodeScanned() {
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
        //TODO mostrar tabla de productos que deberia tener la caja
        this.boxSelected = res;
      } else {
        this.openSimpleAlertDialog("Código de caja inválido");
      }
    });
  }

  isBoxSelected(): boolean {
    return this.boxSelected != undefined;
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
    //TODO servicio que busca producto por id:

    //TODO servicio que verifica si el producto es necesario en esta caja
  }


  editTableData() {
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

  openSimpleAlertDialog(text){
    this.dialog.open(AcceptDialogComponent, {
      "data": {
        "text": text,
        "textType": "Alert"
      }
    });
  }

  openImageAlertDialog(text, imgRelativePath = undefined){
    this.dialog.open(AcceptDialogComponent, {
      "data": {
        "text": text,
        "textType": "Alert",
        "imgPath": imgRelativePath
      }
    });
  }

  openMultipleSelectionDialog(){
    this.dialog.open(MultipleDialogComponent, {
      "data": {
        "body": [
          {
            "title": "Producto Faltante",
            "description": "La caja no posee uno o mas productos en su interior.",
            "img": "../../../assets/images/search.png",
            "action": "faltante",
            "func": () => {this.boxSelected = undefined;}
          },
          {
            "title": "Fallas",
            "description": "La caja no ha pasado el control de calidad por tener fallas.",
            "img": "../../../assets/images/wrench.png",
            "action": "fallada",
            "func": () => {this.boxSelected = undefined;}
          },
          {
            "title": "Aprobar caja",
            "description": "La caja ha pasado el control de calidad.",
            "img": "../../../assets/images/cs.png",
            "action": "aprobada",
            "func": () => {this.boxSelected = undefined;}
          }
        ]
      }
    })
  }

  openCompleteBoxSelectionDialog(){
    this.dialog.open(MultipleDialogComponent, {
      "data": {
        "body": [
          {
            "title": "Fallas",
            "description": "La caja no ha pasado el control de calidad por tener fallas.",
            "img": "../../../assets/images/wrench.png",
            "action": "fallada",
            "func": () => {this.boxSelected = undefined;}
          },
          {
            "title": "Aprobar caja",
            "description": "La caja ha pasado el control de calidad.",
            "img": "../../../assets/images/cs.png",
            "action": "aprobada",
            "func": () => {this.boxSelected = undefined;}
          }
        ]
      }
    })
  }

  finishAddingProducts() {
    const productsLeft = Object.keys(this.dataTable).length;
    if(productsLeft == 0){
      this.openCompleteBoxSelectionDialog();
    } else {
      this.openMultipleSelectionDialog();
    }
  }

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
