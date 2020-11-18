import { Component, OnInit } from '@angular/core';
import {Label} from "../../../shared/models/label";
import {MatDialog} from "@angular/material/dialog";
import {LabelService} from "../../../shared/services/label.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {AcceptDialogComponent} from "../../components/accept-dialog/accept-dialog.component";
import {BoxService} from "../../../shared/services/box.service";
import {Box} from "../../../shared/models/box";
import {ConfirmDialogComponent} from "../../components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-reimpresion-etiqueta',
  templateUrl: './reimpresion-etiqueta.component.html',
  styleUrls: ['./reimpresion-etiqueta.component.scss']
})
export class ReimpresionEtiquetaComponent implements OnInit {

  public zones: string[];
  public boxes: Box[];
  private boxesStateFail: Box[];
  public selectedZone: string;
  public selectedTag: string;
  reprintTagForm = this.fb.group({
    tagName: [''],
    zoneName: ['']
  });
  constructor(public dialog: MatDialog,
              private labelService: LabelService,
              private boxService: BoxService,
              public fb: FormBuilder,
              private _router: Router,) { }

  ngOnInit(): void {
    this.getZones();
  }

  getZones() {
    this.labelService.getAllZonesWithPrintedTags().subscribe((data) => {
      this.zones = data;
    });
  }

  getTagsForZone() {
    this.boxService.getAllBoxesPrintedByZone(this.selectedZone).subscribe((data) => {
      this.boxes = data;
    })
    this.boxService.getAllBoxesPrintedByZoneWithStateFailed(this.selectedZone).subscribe((data) => {
      this.boxesStateFail = data;
    })
  }

  public selectedZoneChange() {
    this.getTagsForZone()
    this.selectedTag = undefined;
    this.reprintTagForm.controls['tagName'].setValue("")

  }

  printTag(){
    const selectedTag = parseInt(this.selectedTag);
    const found = this.boxesStateFail.find(function (box) {
      return box.id === selectedTag;
    });
    if(found == undefined){
      this.openConfirmDialog("La caja de esta etiqueta no se encuentra fallada ¿Desea imprimirla de todos modos?",
        () => {
        this.openSimpleAlertDialog("La etiqueta de la caja " + this.selectedTag + " ha sido impresa");
      })
    } else {
      this.boxService.resetBox(selectedTag).subscribe();
      this.changeBoxStateToInProgress(selectedTag);
      this.openSimpleAlertDialog("La etiqueta de la caja " + this.selectedTag + " ha sido impresa");
    }
  }

  changeBoxStateToInProgress(selectedTag){
    this.boxService.changeBoxStateToInProgress(selectedTag).subscribe();
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

  openSimpleAlertDialog(text){
    this.dialog.open(AcceptDialogComponent, {
      "data": {
        "text": text,
        "textType": "Alert"
      }
    });
  }



  isZoneSelected():boolean {
    return this.selectedZone != undefined;
  }


  goToPrintTags(){
    this._router.navigate(["/impresion_etiquetas"])
  }

}
