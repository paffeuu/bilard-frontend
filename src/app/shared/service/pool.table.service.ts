import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PoolTableModel} from "../model/pool.table.model";
import {environment} from "../../../environments/environment";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class PoolTableService {
  private lastPoolTable: PoolTableModel;
  private serverUrl = 'http://localhost:8090/socket';
  private stompClient;

  constructor(private http: HttpClient) {
    this.getPoolTableFromWebSocket();
  }

  getPoolTableFromWebSocket(): PoolTableModel {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe("/topic/pooltable", message => {
        that.lastPoolTable = new PoolTableModel();
        that.lastPoolTable.balls = message.balls;
        that.lastPoolTable.tableImage = message.tableImage;
        that.lastPoolTable.cue = message.cue;
      })
    });
    return this.lastPoolTable;
  }
  /*getPoolTableObject(): PoolTableModel {
    let that = this;
    this.http.get<PoolTableModel>(
      `${environment.url}/get-pool-table`
    ).subscribe(response => {
      that.lastPoolTable = new PoolTableModel();
      this.lastPoolTable.balls = response.balls;            // this/that ogarnij
      this.lastPoolTable.tableImage = response.tableImage;
      this.lastPoolTable.cue = response.cue;
    });
    return this.lastPoolTable;
  }*/

  getLastFrame(): PoolTableModel {
    return this.lastPoolTable;
  }
}
