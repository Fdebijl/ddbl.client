import {MongoUser} from './mongoUser';

export class Metadata {
  id: string;
  title: string;
  year: string;
  description: string;
  ageGroup: string;
  contributor: MongoUser;
  category: string;
  type: string;
  format: string;
  source: string;
  link: string;
  access: string;
  image: string;
  file: string;
  created: Date;
}
