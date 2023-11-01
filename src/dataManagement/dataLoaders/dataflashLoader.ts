
export class DataflashLoader extends DataLoader {
  
  public isDataValid(data: ArrayBuffer): boolean {
    throw new Error("Method not implemented.");
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