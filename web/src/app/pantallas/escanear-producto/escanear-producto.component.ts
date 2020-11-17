import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {AcceptDialogComponent} from "../../components/accept-dialog/accept-dialog.component";
import {ConfirmDialogComponent} from "../../components/confirm-dialog/confirm-dialog.component";
import {BoxService} from "../../../shared/services/box.service";
import {LocalStorageService} from "../../components/services/local-storage/local-storage.service";
import {PickingListProductQuantity} from "../../../shared/models/pickingListProductQuantity";


@Component({
  selector: 'app-escanear-producto',
  templateUrl: './escanear-producto.component.html',
  styleUrls: ['./escanear-producto.component.scss']
})
export class EscanearProductoComponent implements OnInit {

  private boxCode: number;
  productCode: number;
  dataTable: PickingListProductQuantity[];

  constructor(public dialog: MatDialog,
              private _activateRoute: ActivatedRoute,
              private _router: Router,
              private boxService: BoxService,
              private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.boxCode = this.localStorageService.get("currentBoxId");
    this.generateDataTable();
  }

  generateDataTable() {
    this.boxService.getBoxStationProducts(this.boxCode, this.localStorageService.get("currentWorkingStationId")).subscribe((data) => {
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


  finishAddingProducts(){
    if(this.getProductsLeft() == 0) {
      this.openRouteDialog("La caja ha finalizado correctamente", "../../../assets/images/gc.png");
      this.boxService.updateProductQuantities(this.dataTable).subscribe();
    } else {
      this.openConfirmDialog("Hay productos que no han sido agregados. \n ¿Desea Finalizar la Caja?",
        () => {
          this.boxService.changeBoxStateToMissing(this.boxCode).subscribe();
          this.boxService.updateProductQuantities(this.dataTable).subscribe();
          this.openRouteDialog("La caja ha finalizado con productos faltantes",
            "../../../assets/images/warning.png");
      });
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

  getProductById(id) {
    return this.dataTable.find(pq => pq.product.id == id);
  }

  isProductCodeValid(): boolean {
    let prod = this.getProductById(this.productCode);
    return prod != undefined && prod.missingQuantity > 0;
  }

  getProductsLeft() {
    let res = 0;
    this.dataTable.forEach(pq => {
      if (pq.missingQuantity > 0) res++;
    });
    return res;
  }

  //TODO este metodo se repite en varios components, meterlo en un service
  openSimpleAlertDialog(text) {
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
