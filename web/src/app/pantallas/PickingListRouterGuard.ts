import {GeneracionPickingListComponent} from "./generacion-picking-list/generacion-picking-list.component";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class PickingListRouterGuard {

  constructor(private generacion_pl: GeneracionPickingListComponent){
  }


}
