import DataLoader from "./abstractLoader";
import Worker from "../../modules/JsDataflashParser/parser.js?worker"
export class DataflashLoader extends DataLoader {
  
  worker = new Worker()

  public async isDataValid(data: File): Promise<boolean> {
        // output messages from worker
      let validData = undefined as boolean | undefined
      this.worker.onmessage = (event) => {
        if (event.data.hasOwnProperty('availableMessages')) {
            if (Object.keys(event.data.availableMessages).length > 0) {
              validData = true
            }
        }
      }

      let reader = new FileReader()
      reader.onload = (e) => {
          let arrayBuffer = new Uint8Array(reader.result)
          let data = reader.result
          this.worker.postMessage({
              action: 'parse',
              file: data,
          })
      }
      reader.readAsArrayBuffer(data.slice(0, 1024))
      setTimeout(()=>{validData = false}, 1000)
      // wait until validData is set to a value
      while (validData === undefined) {
          await new Promise(r => setTimeout(r, 100));
      }
      return validData
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