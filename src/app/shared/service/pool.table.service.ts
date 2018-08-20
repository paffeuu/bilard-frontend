import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PoolTableModel} from "../model/pool.table.model";
import {environment} from "../../../environments/environment";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PoolTableService {
  private lastPoolTable: PoolTableModel;
  private serverUrl = 'http://localhost:8090/socket';
  private stompClient;

  private poolTableSubject: Subject<any>;

  constructor(private http: HttpClient) {
    this.poolTableSubject = new Subject<any>();
    this.initializeWebSocketConnection();

  }

  initializeWebSocketConnection(): void {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = null;
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe("/topic/pooltable", message => {
        let poolTableObject = JSON.parse(message.body);
        that.setPoolTable(poolTableObject);
      })
    });
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

  getPoolTable() {
    return this.poolTableSubject.asObservable();
  }

  setPoolTable(poolTableObject) {
    this.poolTableSubject.next(poolTableObject);
    console.log(this.poolTableSubject);
  }

}
