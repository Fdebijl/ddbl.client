import { Data } from '../../interface/Data';
import { Set } from './Set';
import { DataType } from '../../enum/DataType';
import { DataFormat } from '../../enum/DataFormat';

export class DataSet extends Set {
  data: Data;
  dataType: DataType;
  dataFormat: DataFormat;
}