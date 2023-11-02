import DataLoader from "./abstractLoader";
import Worker from "../../modules/JsDataflashParser/parser.js?worker"
export class DataflashLoader extends DataLoader {
  
  worker = new Worker()

  public async isDataValid(data: File): Promise<boolean> {
        // output messages from worker
      let validData = undefined as boolean | undefined
      this.worker.onmessage = (event) => {
        if (event.data.hasOwnProperty('percentage')) {
            validData = true
        } else if (event.data.hasOwnProperty('availableMessages')) {
            console.log(event.data.availableMessages)
            validData = true
        } else if (event.data.hasOwnProperty('metadata')) {
            console.log(event.data.metadata)
            validData = true
        } else if (event.data.hasOwnProperty('messages')) {
            console.log(event.data.messages)
            validData = true
        } else if (event.data.hasOwnProperty('messageType')) {
            console.log(event.data.messageList)
            validData = true
        } else if (event.data.hasOwnProperty('files')) {
            console.log(event.data.files)
            validData = true
        } else if (event.data.hasOwnProperty('messagesDoneLoading')) {
            console.log('messages finished loading')
        }
      }

      let reader = new FileReader()
      reader.onload = (e) => {
          let arrayBuffer = new Uint8Array(reader.result)
          console.log(arrayBuffer)
          let data = reader.result
          this.worker.postMessage({
              action: 'parse',
              file: data,
          })
      }
      reader.readAsArrayBuffer(data)
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