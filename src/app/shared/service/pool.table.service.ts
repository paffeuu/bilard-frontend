import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PoolTableModel} from "../model/pool.table.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PoolTableService {
  private lastPoolTable: PoolTableModel;

  constructor(private http: HttpClient) {
  }

  getPoolTableObject(): PoolTableModel {
    let that = this;
    this.http.get<PoolTableModel>(
      `${environment.url}/get-pool-table`
    ).subscribe(response => {
      that.lastPoolTable = new PoolTableModel();
      this.lastPoolTable.balls = response.balls;
      this.lastPoolTable.tableImage = response.tableImage;
      this.lastPoolTable.cue = response.cue;
    });
    return this.lastPoolTable;
  }

  getLastFrame(): PoolTableModel {
    return this.lastPoolTable;
  }
}
