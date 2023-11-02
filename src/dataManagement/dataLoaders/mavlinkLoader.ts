
import DataLoader from "./abstractLoader";

export class MavlinkLoader extends DataLoader {
  
  public async isDataValid(data: File): Promise<boolean> {
    return false
  }

  public supportsStreaming(): boolean {
    return false
  }

  public onDisconnect(): void {
    throw new Error("Method not implemented.");
  }

  public consume(data: ArrayBuffer): void {
    throw new Error("Method not implemented.");
  }
}