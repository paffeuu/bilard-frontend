import {Injectable} from "@angular/core";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {Subject} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PoolTableService {
  private serverUrl = 'http://localhost:8090/socket';
  private stompClient;

  private readonly poolTableNormalSubject: Subject<any>;
  private readonly poolTableProjectorSubject: Subject<any>;

  constructor() {
    this.poolTableNormalSubject = new Subject<any>();
    this.poolTableProjectorSubject = new Subject<any>();
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection(): void {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = null;
    let that = this;
    this.stompClient.connect({}, function () {      // mozliwy parametr 'frame'
      that.stompClient.subscribe(environment.endpoints[0], message => {
        that.setPoolTableNormal(JSON.parse(message.body));
      });
      that.stompClient.subscribe(environment.endpoints[1], message => {
        that.setPoolTableProjector(JSON.parse(message.body));
      });
    });
  }

  getPoolTableNormal() {
    return this.poolTableNormalSubject.asObservable();
  }

  setPoolTableNormal(poolTableObject) {
    this.poolTableNormalSubject.next(poolTableObject);
  }

  getPoolTableProjector() {
    return this.poolTableProjectorSubject.asObservable();
  }

  setPoolTableProjector(poolTableObject) {
    this.poolTableProjectorSubject.next(poolTableObject);
  }

}
