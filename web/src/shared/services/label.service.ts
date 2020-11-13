import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Label} from "../models/label";

@Injectable()
export class LabelService {

  private readonly labelsUrl: string;
  private zonesList: string[];

  constructor(private http: HttpClient) {
    this.labelsUrl = environment.url + '/labels';
  }

  private findZones(): Observable<string[]> {
    return this.http.get(this.labelsUrl + '/getZones').pipe(
      map((res: any) => {
        this.zonesList = res.map((zone) => zone);
        return this.zonesList;
      }),
      catchError(() => {
        this.zonesList = [];
        return this.zones;
      })
    );
  }

  get zones(): Observable<string[]> {
    return this.zonesList
      ? new Observable<string[]>((subscriber) =>
        subscriber.next(this.zonesList)
      )
      : this.findZones();
  }

  public findLabels(zone): Observable<Label[]> {
    return this.http.get(this.labelsUrl + '/getLabels/' + zone).pipe(
      map((res: any) => {
        return res.map((label) => Label.fromJsonObject(label));
      }),
      catchError(() => {
        return [];
      })
    );
  }

  public printLabel(label: Label): Observable<boolean> {
    return this.http.get(this.labelsUrl + '/printLabel/' + label.id).pipe(
      map((res: any) => {
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }
}
