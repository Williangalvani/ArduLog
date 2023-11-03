import DataLoader from "./abstractLoader";

export class CsvLoader extends DataLoader {

  public async isDataValid(data: File): Promise<boolean> {
    // Convert the ArrayBuffer to a string
  

    let reader = new FileReader()
    let text = undefined as string | undefined
    let timedOut = false

    reader.onload = (e) => {
      console.log(e)
      if (reader.result) {
        text = new TextDecoder('utf-8').decode((reader.result.slice(0, 1024)) as ArrayBuffer)
      }
    }
    reader.readAsArrayBuffer(data)
    setInterval(() => {timedOut = true}, 1000)

    while (text === undefined && !timedOut) {
      await new Promise(r => setTimeout(r, 100));
    }
    console.log(text)
    if (text === undefined) {
      return false
    }

    // Check for a valid header (alphabetic characters separated by commas)
    const headerPattern = /^[a-zA-Z%\s]+(,[a-zA-Z\s]+)*\n/;

    if (headerPattern.test(text)) {
      console.log("header pattern")
      return true; // Valid header found
    }


    // Check for other valid or partial CSV structures
    if (text.includes(",") || text.includes("\n")) {
      return true; // It has CSV delimiters (comma or newline)
    }

    // If neither a valid header nor CSV delimiters are found, it's likely not valid CSV data
    return false;
  }

  public supportsStreaming(): boolean {
    return false;
  }

  public onDisconnect(): void {
    throw new Error("Method not implemented.");
  }

  public consume(data: ArrayBuffer): void {
    throw new Error("Method not implemented.");
  }
}
