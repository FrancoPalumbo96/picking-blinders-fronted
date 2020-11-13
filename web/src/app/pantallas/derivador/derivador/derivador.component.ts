import { Component, OnInit } from '@angular/core';
import {AcceptDialogComponent} from "../../../components/accept-dialog/accept-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {BoxService} from "../../../../shared/services/box.service";
import {State} from "../../../../shared/models/state";

@Component({
  selector: 'app-derivador',
  templateUrl: './derivador.component.html',
  styleUrls: ['./derivador.component.scss']
})
export class DerivadorComponent implements OnInit {

  public derivadorTitle: string = "Derivador";
  public boxCode: number;
  constructor(public dialog: MatDialog,
              public boxService: BoxService) { }

  ngOnInit(): void {
  }

  //TODO make it a service to avoid repetition
  boxCodeScanned() {
    if(this.boxCode == null){
      this.openSimpleAlertDialog("Ingresar un código de caja");
      return
    } else {
      this.isBoxStateValid(this.boxCode);
    }
  }

  isBoxStateValid(boxId: number) {
    this.boxService.boxState(this.boxCode).subscribe((res) => {
      if(res){
        let aux = res.name
        switch (boxId){
          case 70:
            aux = "Calidad";
            break;
          case 71:
            aux = "Fallo";
            break;
          case 72:
            aux = "Finalizado";
            break;
          case 73:
            aux = "Faltante";
            break
          default:
            aux = "Faltante"
        }
        switch (aux){
          case "En curso":
            //Todo nose que hacer en este caso
            console.log("Id not corresponding to a state")
            this.openSimpleAlertDialog("Caja marcada como en Curso")
            break;
          case "Calidad":
            this.openImageAlertDialog("Control de Calidad", "../../../assets/images/arrow-top.png");
            break;
          case "Fallo":
            this.openImageAlertDialog("Caja marcada como Fallada", "../../../assets/images/stop.png");
            break;
          case "Finalizado":
            this.openImageAlertDialog("Cerrado de Caja", "../../../assets/images/arrow-right.png");
            break
          case "Faltante":
            this.openImageAlertDialog("Producto Faltante", "../../../assets/images/arrow-left.png");
            break
          default:
            console.log("Id not corresponding to a state")
            break
        }
      } else {
        this.openSimpleAlertDialog("Código de caja inválido");
      }
    });
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
}
