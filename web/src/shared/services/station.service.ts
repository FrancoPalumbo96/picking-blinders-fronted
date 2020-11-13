import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Station} from "../models/station";


@Injectable()
export class StationService {

  private readonly stationUrl: string;
  constructor(private http: HttpClient) {
    this.stationUrl = environment.url + '/stations';
  }

  public findStations(): Observable<Station[]> {
    console.log("searchig for stations");
    return this.http.get(this.stationUrl + '/getStations').pipe(
      map((res: any) => {
        return res.map((station) => Station.fromJsonObject(station));
      }),
      catchError(() => {
        return [];
      })
    );
  }

}
