import DataLoader from "./abstractLoader";

export class CsvLoader extends DataLoader {

  public async isDataValid(data: File): Promise<boolean> {
    // Convert the ArrayBuffer to a string
    const reader = new FileReader();
    let text = undefined as string | undefined;

    // Create a promise to handle FileReader async read
    const textPromise = new Promise<string | undefined>((resolve, reject) => {
        reader.onload = () => {
            if (reader.result) {
                resolve(new TextDecoder('utf-8').decode((reader.result as ArrayBuffer)));
            } else {
                resolve(undefined);
            }
        };
        reader.onerror = () => reject(new Error('File reading failed'));
        setTimeout(() => reject(new Error('File reading timed out')), 1000);
    });

    reader.readAsArrayBuffer(data);

    try {
        text = await textPromise;
    } catch (error) {
        console.error(error.message);
        return false;  // Returning false if there's an error in reading the file or it times out
    }

    console.log(text);
    if (text === undefined) {
        return false;
    }

    // Check for non-ASCII characters
    if (/[\x80-\xFF]/.test(text)) {
        console.log('Non-ASCII characters found');
        return false;  // Non-ASCII characters found
    }

    // Check for a valid header (alphabetic characters separated by commas)
    const headerPattern = /^[a-zA-Z%\s]+(,[a-zA-Z\s]+)+\n/;
    if (headerPattern.test(text)) {
        console.log('header pattern');
        return true;  // Valid header found
    }

    // Check for other valid or partial CSV structures
    if (text.includes(',') || text.includes('\n')) {
        return true;  // It has CSV delimiters (comma or newline)
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
