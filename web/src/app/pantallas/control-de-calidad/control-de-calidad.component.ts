import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {BoxService} from "../../../shared/services/box.service";
import {AcceptDialogComponent} from "../../components/accept-dialog/accept-dialog.component";
import {Router} from "@angular/router";
import {Box} from "../../../shared/models/box";
import {MultipleDialogComponent} from "../../components/multiple-dialog/multiple-dialog.component";
import {PickingListProductQuantity} from "../../../shared/models/pickingListProductQuantity";

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
  dataTable: PickingListProductQuantity[];

  constructor(public dialog: MatDialog,
              public boxService: BoxService,
              ) { }

  ngOnInit(): void {
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
        if (res.state.name !== "Calidad") {
          this.openSimpleAlertDialog("Caja no asignada para control de calidad");
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
    this.boxService.getAllBoxProducts(this.boxCode).subscribe((data) => {
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
    this.getProductById(this.productCode).quantity -= 1;
    if(this.getProductById(this.productCode).quantity == 0){
      if(this.getProductsLeft() == 0){
        this.finishAddingProducts();
      }
    }
  }

  getProductsLeft() {
    let res = 0;
    this.dataTable.forEach(pq => {
      if (pq.quantity > 0) res++;
    });
    return res;
  }

  isBoxSelected(): boolean {
    return this.boxSelected != undefined;
  }

  private isProductCodeValid() {
    let prod = this.getProductById(this.productCode);
    return prod != undefined && prod.quantity > 0;
    //TODO servicio que busca producto por id:

    //TODO servicio que verifica si el producto es necesario en esta caja
  }

  getProductById(id){
    return this.dataTable.find(pq => pq.product.id == id);
  }

  finishControl() {
    this.boxCode = null;
    this.productCode = null;
    this.dataTable = null;
    this.boxSelected = undefined;
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
            "func": () => {
              this.boxService.changeBoxStateToMissing(this.boxCode).subscribe();
              this.boxService.updateProductQuantities(this.dataTable).subscribe();
              this.finishControl();
            }
          },
          {
            "title": "Fallas",
            "description": "La caja no ha pasado el control de calidad por tener fallas.",
            "img": "../../../assets/images/wrench.png",
            "action": "fallada",
            "func": () => {
              this.boxService.changeBoxStateToFlawed(this.boxCode).subscribe();
              this.finishControl();
            }
          },
          /*{
            "title": "Aprobar caja",
            "description": "La caja ha pasado el control de calidad.",
            "img": "../../../assets/images/cs.png",
            "action": "aprobada",
            "func": () => {
              this.boxService.changeBoxStateToFinished(this.boxCode).subscribe();
              this.finishControl();
            }
          }*/
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
            "func": () => {
              this.boxService.changeBoxStateToFlawed(this.boxCode).subscribe();
              this.finishControl();
            }
          },
          {
            "title": "Aprobar caja",
            "description": "La caja ha pasado el control de calidad.",
            "img": "../../../assets/images/cs.png",
            "action": "aprobada",
            "func": () => {
              this.boxService.changeBoxStateToFinished(this.boxCode).subscribe();
              this.boxService.updateProductQuantities(this.dataTable).subscribe();
              this.finishControl();
            }
          }
        ]
      }
    })
  }

  finishAddingProducts() {
    if(this.getProductsLeft() == 0){
      this.openCompleteBoxSelectionDialog();
    } else {
      this.openMultipleSelectionDialog();
    }
  }
}
