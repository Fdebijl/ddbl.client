import * as moment from 'moment';
import { User } from './User';
import { timestampToMoment, isLessThan24HoursAgo, momentToDate, momentToHours, momentToTimeAndDate } from '../_util/time';

export class Twat {
  constructor(text: string, timestamp: string, user: User) {
    this.text = text;
    this.timestamp = timestamp;
    this.user = user;
  }

  public id: string;
  public text: string;
  public timestamp: string;
  public user: User;

  public formatTimestamp(): string {
    if (!this.timestamp) {
      throw new Error(`No timestamp was defined on this Twat`);
    }

    const timeOfPosting = timestampToMoment(this.timestamp);
    if (isLessThan24HoursAgo(timeOfPosting)) {
      return momentToHours(timeOfPosting);
    } else {
      return momentToDate(timeOfPosting);
    }
  }

  public formatTitle(): string {
    const timeOfPosting = timestampToMoment(this.timestamp);
    return momentToTimeAndDate(timeOfPosting);
  }
}
