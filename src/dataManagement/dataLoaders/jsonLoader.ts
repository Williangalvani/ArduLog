import DataLoader from "./abstractLoader";

export class JsonLoader extends DataLoader {
  
  public async isDataValid(data: File): Promise<boolean> {
    // // Convert the ArrayBuffer to a string
    // const dataStr = new TextDecoder().decode(data);

    // // Check if the string is a valid JSON or a partial JSON string
    // try {
    //   JSON.parse(dataStr);

    //   // If no error is thrown, then it's a valid JSON
    //   return true;
    // } catch (error) {
    //   // Check for common partial JSON structures
    //   if (dataStr.startsWith("{") && !dataStr.endsWith("}")) {
    //     return true; // Partial JSON object
    //   } else if (dataStr.startsWith("[") && !dataStr.endsWith("]")) {
    //     return true; // Partial JSON array
    //   }

    //   // If it's neither a valid JSON nor a partial JSON, return false
    //   return false;
    // }
    return false
  }

  public name(): string {
    throw new Error("Method not implemented.");
  }

  public supportsStreaming(): boolean {
    return true
  }

  public onDisconnect(): void {
    throw new Error("Method not implemented.");
  }

  public consume(data: ArrayBuffer): void {
    throw new Error("Method not implemented.");
  }
}
