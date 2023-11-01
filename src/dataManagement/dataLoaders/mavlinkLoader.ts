
export class MavlinkLoader extends DataLoader {
  
  public isDataValid(data: ArrayBuffer): boolean {
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