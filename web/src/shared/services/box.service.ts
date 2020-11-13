import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Box} from "../models/box";
import {State} from "../models/state";

@Injectable()
export class BoxService {

  private readonly boxesUrl: string;
  constructor(private http: HttpClient) {
    this.boxesUrl = environment.url + '/boxes';
  }

  public existsBox(boxId: number): Observable<Box> {
    return this.http.get<Box>(this.boxesUrl + '/scanBox/' + boxId);
  }

  public isBoxNeeded(boxId: number, stationId: number): Observable<boolean> {
    return this.http.get<boolean>(this.boxesUrl + '/isBoxNeeded/' + boxId + '/' + stationId);
  }

  public boxState(boxId: number): Observable<State>{
    return this.http.get<State>(this.boxesUrl + '/getBoxState/' + boxId);
  }
}
