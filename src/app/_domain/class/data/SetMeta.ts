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
    return JSON.parse(`{"created":"2019-12-19T11:29:22.272Z","share":[],"_id":"5dfb5f12ea2a1308ed91ab8b","title":"Health and Diseases (19+)","year":"2009-2018","description":"This online dashboard enables you to compare the health and disease data (equal and more than 19 years old) between a specified municipality, region (Brabant Zuidoost) and province (Noord Brabant).","age_group":"19+","contributor":"5de596be2effde1a4c0276fb","access":"Public","type":"Web Page","category":"Health","format":"PDF/EXCEL/CSV","source":"GGD Brabantscan","link":"https://brabantscan.nl/","image":"5dfb5f12ea2a1308ed91ab8b","file":"https://brabantscan.nl/dashboard/Volwassenen--19--jaar-/GEZONDHEID-EN-ZIEKTEN/","__v":0}`);
  }
}

