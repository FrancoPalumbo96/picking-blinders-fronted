import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {Box} from "../models/box";
import {State} from "../models/state";
import {PickingListProductQuantity} from "../models/pickingListProductQuantity";
import {catchError, map} from "rxjs/operators";

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

  public getBoxStationProducts(boxId: number, stationId: number): Observable<PickingListProductQuantity[]> {
    return this.http.get<PickingListProductQuantity[]>(this.boxesUrl + '/getBoxStationProducts/' + boxId + '/' + stationId).pipe(
      map((res: any) => {
        return res.map((pq) => PickingListProductQuantity.fromJsonObject(pq));
      }),
      catchError(() => {
        return of([]);
      })
    );
  }

  public changeBoxStateToMissing(boxId: number) {
    return this.http.get(this.boxesUrl + '/changeBoxStateToMissing/' + boxId).pipe(
      map((res: any) => {
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  public changeBoxStateToFlawed(boxId: number) {
    return this.http.get(this.boxesUrl + '/changeBoxStateToFlawed/' + boxId).pipe(
      map((res: any) => {
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  public changeBoxStateToFinished(boxId: number) {
    return this.http.get(this.boxesUrl + '/changeBoxStateToFinished/' + boxId).pipe(
      map((res: any) => {
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  public changeBoxStateToInProgress(boxId: number) {
    return this.http.get(this.boxesUrl + '/changeBoxStateToInProgress/' + boxId).pipe(
      map((res: any) => {
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  public updateProductQuantities(pqs: PickingListProductQuantity[]) {
    return this.http.put<PickingListProductQuantity[]>(this.boxesUrl + '/updateProductQuantities', pqs).pipe(
      map((res: any) => {
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  public getAllBoxProducts(boxId: number): Observable<PickingListProductQuantity[]> {
    return this.http.get<PickingListProductQuantity[]>(this.boxesUrl + '/getAllBoxProducts/' + boxId).pipe(
      map((res: any) => {
        return res.map((pq) => PickingListProductQuantity.fromJsonObject(pq));
      }),
      catchError(() => {
        return of([]);
      })
    );
  }

  public getBoxMissingProducts(boxId: number): Observable<PickingListProductQuantity[]> {
    return this.http.get<PickingListProductQuantity[]>(this.boxesUrl + '/getBoxMissingProducts/' + boxId).pipe(
      map((res: any) => {
        return res.map((pq) => PickingListProductQuantity.fromJsonObject(pq));
      }),
      catchError(() => {
        return of([]);
      })
    );
  }


  getAllBoxesPrintedByZone(zone): Observable<Box[]> {
    return this.http.get<Box>(this.boxesUrl + '/getAllBoxesPrintedByZone/' + zone).pipe(
      map((res: any) => {
        return res.map((box) => Box.fromJsonObject(box));
      }),
      catchError(() => {
        return of([]);
      })
    )
  }

  getAllBoxesPrintedByZoneWithStateFailed(zone): Observable<Box[]> {
    return this.http.get<Box>(this.boxesUrl + '/getAllBoxesPrintedByZoneWithStateFailed/' + zone).pipe(
      map((res: any) => {
        return res.map((box) => Box.fromJsonObject(box));
      }),
      catchError(() => {
        return of([]);
      })
    )
  }

  resetBox(boxId: number) {
    return this.http.get(this.boxesUrl + '/resetBox/' + boxId).pipe(
      map((res: any) => {
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }
}
