import { Component, OnInit } from '@angular/core';
import {AcceptDialogComponent} from "../../components/accept-dialog/accept-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {LabelService} from "../../../shared/services/label.service";
import {Label} from "../../../shared/models/label";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-impresion-etiquetas',
  templateUrl: './impresion-etiquetas.component.html',
  styleUrls: ['./impresion-etiquetas.component.scss']
})
export class ImpresionEtiquetasComponent implements OnInit {

  public zones: string[];
  public labels: Label[];
  public selectedZone: string;
  public impresionPickingListTitle: string = "Impresión de Etiqueta";
  public currentZone: number;

  constructor(public dialog: MatDialog,
              private labelService: LabelService,
              public fb: FormBuilder,
              private _router: Router,) { }

  ngOnInit(): void {
    this.getZones();
  }

  getZones() {
    this.labelService.zones.subscribe((data) => {
      this.zones = data;
    });
  }

  /*########### Form ###########*/
  public selectedZoneChange() {
    const zoneFormValue = this.printTagsForm.value.tagName;
    if(zoneFormValue == null || zoneFormValue == ""){
      this.openSimpleDialog("No se seleccionó ninguna estación")
    } else {
      this.currentZone = this.printTagsForm.value.tagName;
      this.selectedZone = this.printTagsForm.value.tagName;
      this.impresionPickingListTitle = "Impresión de Etiqueta\n Zona actual: " + this.selectedZone;

      this.labelService.findLabels(this.selectedZone).subscribe((data) => {
        this.labels = data;
      });
    }
  }

  printTagsForm = this.fb.group({
    tagName: ['']
  });

  get tagName() {
    return this.printTagsForm.get('tagName');
  }

  clickTag(e) {
    this.tagName.setValue(e.target.value, {
      onlySelf: true
    })
  }


  printTag(){
    if (this.labels.length > 0) {
      let label = this.labels.splice(0, 1)[0];
      this.labelService.printLabel(label).subscribe();
      this.openPrintTagDialog(label);
    } else {
      console.log(this.selectedZone);
      this.openSimpleDialog("No quedan más etiquetas para la zona");
      const zoneIndex = this.zones.indexOf(this.selectedZone);
      if(zoneIndex >= 0){
        this.removeZone(zoneIndex);
      }
    }
  }




  openSimpleDialog(text: string){
    this.dialog.open(AcceptDialogComponent, {
      "data": {
        "text": text,
        "textType": "Alert"
      }
    });
  }

  openPrintTagDialog(label: Label){
    this.dialog.open(AcceptDialogComponent, {
      "data": {
        "text": "La etiqueta de la caja " + label.box.id + " ha sido impresa",
        "textType": "Alert"
      }
    });
  }



  isZoneSelected():boolean {
    return this.currentZone != undefined;
  }

  resetZone(){
    this.printTagsForm.value.tagName = undefined;
    this.currentZone = this.selectedZone= undefined;
    this.impresionPickingListTitle = "Impresión de Etiqueta";
  }

  removeZone(zoneIndex){
    this.zones.splice(zoneIndex, 1);
  }

  goToReprintTag(){
    this._router.navigate(["/reimpresion"])
  }
}
