import {Injectable} from "@angular/core";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PoolTableService {
  private serverUrl = 'http://localhost:8090/socket';
  private stompClient;

  private readonly poolTableSubject: Subject<any>;

  constructor() {
    this.poolTableSubject = new Subject<any>();
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection(): void {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = null;
    let that = this;
    this.stompClient.connect({}, function () {      // mozliwy parametr 'frame'
      that.stompClient.subscribe("/topic/pooltable", message => {
        let poolTableObject = JSON.parse(message.body);
        that.setPoolTable(poolTableObject);
      })
    });
  }

  getPoolTable() {
    return this.poolTableSubject.asObservable();
  }

  setPoolTable(poolTableObject) {
    this.poolTableSubject.next(poolTableObject);
  }

}
