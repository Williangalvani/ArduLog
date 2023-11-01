export class CsvLoader extends DataLoader {

  public isDataValid(data: ArrayBuffer): boolean {
    // Convert the ArrayBuffer to a string
    const dataStr = new TextDecoder().decode(data);

    // Check if the string contains any non-CSV characters
    const nonCsvChars = /[^a-zA-Z0-9\s,\"\n\r\-\.]/;
    if (nonCsvChars.test(dataStr)) {
      return false;
    }

    // Check for a valid header (alphabetic characters separated by commas)
    const headerPattern = /^[a-zA-Z\s]+(,[a-zA-Z\s]+)*\n/;
    if (headerPattern.test(dataStr)) {
      return true; // Valid header found
    }

    // Check for other valid or partial CSV structures
    if (dataStr.includes(",") || dataStr.includes("\n")) {
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
