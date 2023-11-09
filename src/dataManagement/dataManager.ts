import { CsvLoader } from "./dataLoaders/csvLoader";
import { DataflashLoader } from "./dataLoaders/dataflashLoader";
import { JsonLoader } from "./dataLoaders/jsonLoader";
import { MavlinkLoader } from "./dataLoaders/mavlinkLoader";
import DataLoader from "./dataLoaders/abstractLoader";

export enum DataFormat {
    CSV = "CSV",
    DATAFLASH = "DATAFLASH",
    JSON = "JSON",
    MAVLINK = "MAVLINK",
    UNKNOWN = "UNKNOWN"
}
export default class DataManager {
    private loaders: Record<DataFormat, DataLoader> = {} as Record<DataFormat, DataLoader>;
    private detectedFormat = DataFormat.UNKNOWN;
    private static instance: DataManager;


    private constructor() {
      this.loaders[DataFormat.DATAFLASH] = new DataflashLoader();
      this.loaders[DataFormat.CSV] = new CsvLoader();
      this.loaders[DataFormat.JSON] = new JsonLoader();
      this.loaders[DataFormat.MAVLINK] = new MavlinkLoader();
    }

    // singleton getter
    public static getInstance(): DataManager {
      if (!DataManager.instance) {
        DataManager.instance = new DataManager();
      }
      return DataManager.instance;
    }

    private createLoaderForType(type: DataFormat): DataLoader {
      switch (type) {
        case DataFormat.CSV:
          return new CsvLoader();
        case DataFormat.DATAFLASH:
          return new DataflashLoader();
        case DataFormat.JSON:
          return new JsonLoader();
        case DataFormat.MAVLINK:
          return new MavlinkLoader();
        default:
          throw new Error("Unknown data format");
      }
    }

    public async identifyFileFormat(input: File): Promise<[DataFormat, DataLoader | null]> {
      for (const [type, loader] of Object.entries(this.loaders)) {
        if (await loader.isDataValid(input)) {
          return [type as DataFormat, this.createLoaderForType(type as DataFormat)];
        }
      }
      return [DataFormat.UNKNOWN, null];
    }

    public loadWebsocket(input: string): boolean {
      for (const [type, loader] of Object.entries(this.loaders)) {
        if (loader.loadWebsocket(input)) {
          this.detectedFormat = type as DataFormat;
          return true;
        }
      }
      return false;
    }

}