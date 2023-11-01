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
    private loaders: Record<DataFormat, DataLoader> = {} as Record<DataFormat, DataLoader>;
    private detectedFormat = DataFormat.UNKNOWN;


    private constructor() { 
      this.loaders[DataFormat.CSV] = new CsvLoader();
      this.loaders[DataFormat.DATAFLASH] = new DataflashLoader();
      this.loaders[DataFormat.JSON] = new JsonLoader();
      this.loaders[DataFormat.MAVLINK] = new MavlinkLoader();
    }

    public loadFile(input: File): boolean {
      for (const [type, loader] of Object.entries(this.loaders)) {
        if (loader.loadFile(input)) {
          this.detectedFormat = type as DataFormat;
          return true;
        }
      }
      return false;
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