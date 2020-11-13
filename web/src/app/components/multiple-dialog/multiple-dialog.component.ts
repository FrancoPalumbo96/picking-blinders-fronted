import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AcceptDialogComponent} from "../accept-dialog/accept-dialog.component";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-multiple-dialog',
  templateUrl: './multiple-dialog.component.html',
  styleUrls: ['./multiple-dialog.component.scss']
})
export class MultipleDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MultipleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string,
              public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close(false);
  }

  setBoxAsMissingProducts(img){
    this.cancel()
    //TODO marcar caja
    this.openImageAlertDialog("La caja ha sido marcada como Faltante", img)
  }
  setBoxAsFailed(img){
    this.cancel()
    //TODO marcar caja
    this.openImageAlertDialog("La caja ha sido marcada como Fallada", img)
  }
  setBoxAsApproved(img){
    this.cancel()
    //TODO marcar caja
    this.openImageAlertDialog("La caja ha sido marcada como Aprobada", img)
  }
  setBoxAsUnfinishedOrder(img){
    this.cancel();
    //TODO marcar caja
    //TODO agregar nombre de cliente?
    //TODO mandar mail?
    this.openImageAlertDialog("Se envió un mail comunicando al cliente que su pedido se envió incompleto", img)
  }

  imageClicked(action: string, img, func){
    switch (action){
      case "faltante":
        this.openConfirmDialog("¿Desea marcar la caja como Faltante?", () => {
          this.setBoxAsMissingProducts(img);
          func();
        })
        break;
      case "fallada":
        this.openConfirmDialog("¿Desea marcar la caja como Fallada?", () => {
          this.setBoxAsFailed(img);
          func();
        })
        break;
      case "aprobada":
        this.openConfirmDialog("¿Desea marcar la caja como Aprobada?", () => {
          this.setBoxAsApproved(img);
          func();
        }, "mat-prime")
        break;
      case "pedido-incompleto":
        this.openConfirmDialog("El pedido está incompleto, si finaliza ahora se enviará " +
          "el pedido incompleto y se notificará al cliente.", () => {
          this.setBoxAsUnfinishedOrder(img);
          func();
        })
        break;
      case "cerrar":
        this.cancel()
        break
      default:
        break;
    }
  }

  changeConfirmDialogButtonColor(){
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

  openConfirmDialog(text, func, className = undefined){
    this.dialog.open(ConfirmDialogComponent, {
      "data": {
        "text": text,
        "textType": "Confirmación",
        "class": className
      }
    })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          func()
        }
      })
  }

}
