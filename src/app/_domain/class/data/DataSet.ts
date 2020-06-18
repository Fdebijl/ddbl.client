import { DataType } from '../../enum/DataType';
import { DataFormat } from '../../enum/DataFormat';
import { MetaData } from './MetaData';

export class DataSet {
  constructor(
    {id, data, dataType, dataFormat, metaData}:
    {id?: string; data?: string, dataType?: DataType; dataFormat?: DataFormat; metaData?: MetaData}
  ) {
    this.id = id;
    this.data = data;
    this.dataType = dataType;
    this.dataformat = dataFormat;
    this.metaData = metaData;
  }

  id: string;
  data: string;
  dataType: DataType;
  dataformat: DataFormat;
  metaData: MetaData;
}
