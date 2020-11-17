import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable()
export class OrderService {

  private readonly ordersUrl: string;

  constructor(private http: HttpClient) {
    this.ordersUrl = environment.url + '/orders';
  }

  public generatePickingLists(zone: string): Observable<boolean> {
    return this.http.get(this.ordersUrl + '/generateLists/' + zone).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }
}
