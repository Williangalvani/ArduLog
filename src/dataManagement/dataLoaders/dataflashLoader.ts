import DataLoader, { messageType } from "./abstractLoader";
import Worker from "../../modules/JsDataflashParser/parser.js?worker"

interface complexFields { [key: string]: { multiplier: number, units: string } }
export class DataflashLoader extends DataLoader {

  worker = new Worker()

  private msgBlacklist = ['FMT']

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
          let arrayBuffer = new Uint8Array(reader.result as ArrayBuffer)
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

  public async loadFile(data: File): Promise<messageType[]> {
    // output messages from worker
    let done = undefined as boolean | undefined
    const flattenedMessages = [] as messageType[];
    this.worker.onmessage = (event) => {
      console.log(event.data)
      if (event.data.hasOwnProperty('availableMessages')) {
          if (Object.keys(event.data.availableMessages).length > 0) {
            const availableMessages = event.data.availableMessages
            for (const [msg, data] of Object.entries(availableMessages)) {
              console.log(msg, data)
              const complexFields = (data as { complexFields: complexFields }).complexFields;
              for (const [key, value] of Object.entries(complexFields)) {
                console.log(key, value)
                flattenedMessages.push({
                  name: `${msg}.${key}`,
                  multiplier: value.multiplier,
                  description: '',
                  units: value.units,
                });
              }
            }
        }
      } else if (event.data.hasOwnProperty('messagesDoneLoading')) {
        done = true
      }
    }

    let reader = new FileReader()
    reader.onload = (e) => {
        let arrayBuffer = new Uint8Array(reader.result as ArrayBuffer)
        let data = reader.result
        this.worker.postMessage({
            action: 'parse',
            file: data,
        })
    }
    reader.readAsArrayBuffer(data)
    setTimeout(()=>{done = false}, 30000)
    // wait until validData is set to a value
    while (done === undefined) {
        await new Promise(r => setTimeout(r, 100));
    }
    return flattenedMessages
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