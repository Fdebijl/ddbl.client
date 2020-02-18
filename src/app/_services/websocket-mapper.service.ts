import { Injectable, Component } from '@angular/core';
import { Subject } from 'rxjs';
import {WebsocketService} from './websocket.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export class EncapsulatedMessage {
  messageType: string;
  messageData: string;

  constructor(messageType: string, messageData: string) {
    this.messageType = messageType;
    this.messageData = messageData;
  }
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketMapper {
  // de communicatie messages
  public messages: Subject<EncapsulatedMessage>;

  constructor(wsService: WebsocketService) {
    // verbind de messages met de websockets zodat de messages gebruikt kunnen worden
    // eslint-disable-next-line
    this.messages = <Subject<EncapsulatedMessage>> wsService
    // verbinding aanmaken
      .connect(environment.websocket_url)
      // beschrijf wat er moet gebeuren met de berichten
      // in dit geval: map ze naar messages als message klasse
      .pipe(map((response: MessageEvent): EncapsulatedMessage => {
        console.log(response);
        const data = JSON.parse(response.data);
        return {
          messageType: data.messageType,
          messageData: data.messageData
        };
      }));
  }
}
