
export class DataflashLoader extends DataLoader {
  
  public isDataValid(data: ArrayBuffer): boolean {
    throw new Error("Method not implemented.");
  }

  public supportsStreaming(): boolean {
    throw new Error("Method not implemented.");
  }

  public onDisconnect(): void {
    throw new Error("Method not implemented.");
  }

  public load(input: any): boolean {
    return false
  }

  public consume(data: ArrayBuffer): void {
    throw new Error("Method not implemented.");
  }
}