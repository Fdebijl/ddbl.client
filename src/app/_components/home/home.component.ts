import { Component, OnInit } from '@angular/core';
import {Twat, User} from '../../_domain';
import { WebsocketMapper, EncapsulatedMessage} from '../../_services/websocket-mapper.service';
import * as moment from 'moment';
import { StorageService } from 'src/app/_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public twats: Twat[] = [];
  public twatText: string;
  private user: User;

  constructor(
    private storageService: StorageService,
    private websocketMapper: WebsocketMapper
  ) {
    this.websocketMapper.messages.subscribe(msg => {
      this.handleMessage(msg);
    });
    this.user = this.storageService.user.getValue();
  }


  private generateTwats(): void {
    let i = 0;
    const twats: Twat[] = [];
    while ( i < 10) {
        const delay = (Math.random() * 10) + (i + 1) * 180;
        this.twats.push(
          new Twat('This is a test twat.', moment().subtract(delay, 'minutes').format('x'), this.storageService.user.getValue())
        );
        i++;
    }
    /* const message = new EncapsulatedMessage('twat.init', JSON.stringify(twats));
    this.websocketMapper.messages.next(message);
    console.log('sent'); */
  }

  sendTwat() {
    const date = new Date();
    const twat = new Twat(this.twatText, moment().format('x'), this.storageService.user.getValue());
    this.twats.unshift(twat);
    this.twatText = '';
    /* const message = new EncapsulatedMessage('twat.post', JSON.stringify(twat));
    this.websocketMapper.messages.next(message);
    console.log('outgoing twat send: ' + message.messageData); */
  }

  handleMessage(message: EncapsulatedMessage) {
    // this methed handles all the incoming messages
    switch (message.messageType) {
      default:
        console.log('Unknown messageType: ' + message.messageType);
        break;
      case ('twat.post'):
        const twat: Twat = JSON.parse(message.messageData);
        console.log(message.messageData);
        this.twats.unshift(twat);
        break;
      case ('twat.init'):
        const initTwats: Twat[] = JSON.parse(message.messageData);
        console.log(message.messageData);
        this.twats.concat(initTwats);
        console.log('received');
        break;
      case ('twat.paginate'):
        const paginateTwats: Twat[] = JSON.parse(message.messageData);
        this.twats.concat(paginateTwats);
        break;
    }
  }

  ngOnInit(): void {
    this.generateTwats();
  }
}
