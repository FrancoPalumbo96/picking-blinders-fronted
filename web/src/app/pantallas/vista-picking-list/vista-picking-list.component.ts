import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {AcceptDialogComponent} from "../../components/accept-dialog/accept-dialog.component";
import {LocalStorageService} from "../../components/services/local-storage/local-storage.service";
import {BoxService} from "../../../shared/services/box.service";
import {StationService} from "../../../shared/services/station.service";
import {Station} from "../../../shared/models/station";

@Component({
  selector: 'app-vista-picking-list',
  templateUrl: './vista-picking-list.component.html',
  styleUrls: ['./vista-picking-list.component.scss']
})
export class VistaPickingListComponent implements OnInit {

  public stations: Station[];
  public currentStation: Station;
  public boxCode: number;
  public vistaPickingListTitle: string = "Vista de picking list por Estación";

  constructor(public dialog: MatDialog,
              private _activateRoute: ActivatedRoute,
              private _router: Router,
              public fb: FormBuilder,
              private localStorageService: LocalStorageService,
              private boxService: BoxService,
              private stationService: StationService) { }


  ngOnInit(): void {
    const savedWorkingStationId = this.localStorageService.get("currentWorkingStationId");

    this.stationService.findStations().subscribe((data) => {
      this.stations = data;
      if(savedWorkingStationId != null){
        this.currentStation = this.stations.find(x => x.id === savedWorkingStationId);
        this.vistaPickingListTitle = "Vista de picking list por Estación \n Estación Actual: " + this.currentStation.name;
      }
    });

  }

  /*########### Form ###########*/
  chooseStationForm = this.fb.group({
    station: ['']
  });

  get station() {
    return this.chooseStationForm.get('station');
  }

  clickStation(e) {
    this.station.setValue(e.target.value, {
      onlySelf: true
    })
  }

  onSubmit() {
    const chosenStation = this.chooseStationForm.value.station;
    this.chooseStation(chosenStation)
  }


  chooseStation(station){
    const stationIndex = this.stations.indexOf(station);
    if(stationIndex != -1){
      this.currentStation = station;
      this.vistaPickingListTitle = "Vista de picking list por Estación \n Estación Actual: " + this.currentStation.name;
    } else {
      this.openSimpleAlertDialog("No se seleccionó ninguna estación")
    }
  }

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
        this.isBoxNeededInStation();
      } else {
        this.openSimpleAlertDialog("Código de caja inválido");
      }
    });
  }


  isBoxNeededInStation(){
    this.boxService.isBoxNeeded(this.boxCode, this.currentStation.id).subscribe((res) => {
      if(res){
        this.persist("currentWorkingStationId", this.currentStation.id);
        this._router.navigate(["/escanear_productos"])
      } else {
        this.openSimpleAlertDialog("Esta caja no necesita artículos de esta estación")
      }
    })
  }

  isStationSelected():boolean{
    return this.currentStation != undefined;
  }

  openSimpleAlertDialog(text){
    this.dialog.open(AcceptDialogComponent, {
      "data": {
        "text": text,
        "textType": "Alert"
      }
    });
  }

  openPrintTagDialog(zone: string){
    this.dialog.open(AcceptDialogComponent, {
      "data": {
        "text": "La estaci " + zone + " ha sido impresa",
        "textType": "Alert"
      }
    });
  }

  persist(key: string, value: any) {
    this.localStorageService.set(key, value);
  }

  resetStation(){
    this.currentStation = undefined;
    this.persist("currentWorkingStationId", null);
    this.vistaPickingListTitle = "Vista de picking list por Estación";
  }



}
