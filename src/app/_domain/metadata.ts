import { MongoUser } from './';

export class Metadata {
  id: string;
  title: string;
  year: string;
  description: string;
  // TODO get users and ageGroup
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
