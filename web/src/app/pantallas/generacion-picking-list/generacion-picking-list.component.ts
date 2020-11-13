import { Component, OnInit } from '@angular/core';
import { MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../components/confirm-dialog/confirm-dialog.component";
import {AcceptDialogComponent} from "../../components/accept-dialog/accept-dialog.component";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {OrderService} from "../../../shared/services/order.service";

@Component({
  selector: 'app-generacion-picking-list',
  templateUrl: './generacion-picking-list.component.html',
  styleUrls: ['./generacion-picking-list.component.scss']
})
export class GeneracionPickingListComponent implements OnInit {

  public code: string;
  constructor(public dialog: MatDialog,
              private orderService: OrderService) { }

  ngOnInit(): void {
  }

  getCode(){
    return this.code;
  }

  generatePickingLists() {
    if(this.getCode() == null){
      this.dialog.open(AcceptDialogComponent, {
        "data": {
          "text": "Ingrese un código de zona",
          "textType": "Alert"
        }
      });
    } else {
      this.orderService.
      generatePickingLists(this.getCode()).subscribe( (res: boolean) => {
        if (res) {
          this.dialog.open(AcceptDialogComponent, {
            "data": {
              "text": "Generación de picking list para la zona " + this.code + " fué exitosa",
              "textType": "Alert"
            }
          });
        } else {
          this.dialog.open(AcceptDialogComponent, {
            "data": {
              "text": "Código de zona inválida",
              "textType": "Alert"
            }
          });
        }
      });
    }
  }

  /*openDialog(){
    if(this.isValidCode()){
      this.dialog.open(RouteDialogComponent, {
        "data": {
          "text": "Generación de picking list para la zona " + this.code + " fué exitosa \n" +
            "Presione el botón para ser redirigido a la impresión de etiqueta",
          "textType": "Alert",
          "route": "/impresion_etiquetas"
        }
      });
    } else {
      this.dialog.open(AcceptDialogComponent, {
        "data": {
          "text": "Código de zona inválida",
          "textType": "Alert"
        }
      });
    }
  }*/

}
