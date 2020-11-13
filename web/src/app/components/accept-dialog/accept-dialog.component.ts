import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
@Component({
  selector: 'app-accept-dialog',
  templateUrl: './accept-dialog.component.html',
  styleUrls: ['./accept-dialog.component.scss']
})
export class AcceptDialogComponent implements OnInit {

  public imgPath: string; // = "../../../assets/images/gc.png";
  public className: string;
  constructor(public dialogRef: MatDialogRef<AcceptDialogComponent>,
              private _router: Router,
              @Inject(MAT_DIALOG_DATA) public data: Object) { }

  ngOnInit(): void {
  }

  setH1Class(imgPath: string): string{
    if(imgPath != undefined){
      this.className = "dialog-with-img-h1";
      this.imgPath = imgPath;
      return this.className;
    }
    return undefined
  }

  showImage(imgPath: string):boolean {
    return imgPath != undefined;
  }

  close(route: String) {
    this.dialogRef.close(false);
    if(route != undefined){
      this._router.navigate([route])
    }
  }
}
