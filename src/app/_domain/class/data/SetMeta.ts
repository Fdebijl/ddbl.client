import { User } from '../User';

export class SetMeta {
  id: string;
  title: string;
  year: string;
  description: string;
  ageGroup: string;
  contributor: User;
  category: string;
  type: string;
  format: string;
  source: string;
  link: string;
  access: string;
  image: string;
  file: string;
  created: Date;

  public static mock(): SetMeta {
    /* eslint-disable-next-line */
    return JSON.parse(`{ "_id": { "$oid": "5de59e378da07a1aafe0ddf4" }, "created": { "$date": "2019-12-02T23:28:54.981Z" }, "title": "Sports Participation in Eindhoven", "year": "2017", "description": "This map shows the percentage of sports participation by district in Eindhoven in 2017.", "age_group": "All", "contributor": { "$oid": "5de596be2effde1a4c0276fb" }, "access": "Public", "type": "Visualization", "category": "Sports", "format": "JSON", "source": "Eindhovn Open Data, Eindhoven in Cijfers", "link": "https://data.eindhoven.nl/, https://www.eindhoven.nl/stad-en-wonen/stad/eindhoven-in-cijfers", "image": "error", "file": "mp1", "__v": 0, "share": [] }`);
  }
}

