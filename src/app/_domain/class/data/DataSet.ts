import { Data } from '../../interface/Data';
import { Set } from './Set';
import { DataType } from '../../enum/DataType';
import { DataFormat } from '../../enum/DataFormat';
import {MetaData} from './MetaData';

export class DataSet extends Set {
  id: string;
  data: string;
  dataType: DataType;
  dataformat: DataFormat;
  metaData: MetaData;
}
