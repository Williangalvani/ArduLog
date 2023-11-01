import { CsvLoader } from "./dataLoaders/csvLoader";
import { DataflashLoader } from "./dataLoaders/dataflashLoader";
import { JsonLoader } from "./dataLoaders/jsonLoader";
import { MavlinkLoader } from "./dataLoaders/mavlinkLoader";

enum DataFormat {
    CSV = "CSV",
    DATAFLASH = "DATAFLASH",
    JSON = "JSON",
    MAVLINK = "MAVLINK",
    UNKNOWN = "UNKNOWN"
}


class DataManager {
    private static instance: DataManager;
    private _data: any;
    private loaders: Record<DataFormat, DataLoader> = {} as Record<DataFormat, DataLoader>;
    private detectedFormat = DataFormat.UNKNOWN;

    private constructor() { 
      this.loaders[DataFormat.CSV] = new CsvLoader();
      this.loaders[DataFormat.DATAFLASH] = new DataflashLoader();
      this.loaders[DataFormat.JSON] = new JsonLoader();
      this.loaders[DataFormat.MAVLINK] = new MavlinkLoader();
    }

    public static getInstance(): DataManager {
      if (!DataManager.instance) {
        DataManager.instance = new DataManager();
      }
      return DataManager.instance;
    }

    public get data(): any {
        return this._data;
    }

    public set data(value: any) {
        this._data = value;
    }

    public consumeData(data: ArrayBuffer): void {
      if (this.detectedFormat === DataFormat.UNKNOWN) {
          for (const [type, loader] of Object.entries(this.loaders)) {
              if (loader.isDataValid(data)) {
                  this.detectedFormat = type as DataFormat;
                  break;
              }
          }
      }
      if (this.detectedFormat !== DataFormat.UNKNOWN) {
          this.loaders[this.detectedFormat].consume(data);
      }
    }
}