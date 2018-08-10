import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PoolTableModel} from "../model/pool.table.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PoolTableService {

  constructor(private http: HttpClient) {}

  getPoolTableObject(): Observable<PoolTableModel> {
    return this.http.get<PoolTableModel>(
      `${environment.url}/get-pool-table`
    );
  }
}
