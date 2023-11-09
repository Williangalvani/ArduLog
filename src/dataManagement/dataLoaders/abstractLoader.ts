export interface messageType {
    name: string;
    multiplier: number;
    description: string;
    units: string;
}

export default class DataLoader {
    // These files are responsible for loading data from files or websockets
    // they are not responsible for seeking, but should be able to load any
    // arbitrary data from a file or websocket, upon request.
    // Live data should be emitted on receiving a message from the websocket.

    file: File | null = null;
    websocket: WebSocket | null = null;

    public consume(data: ArrayBuffer) {
      throw new Error("Method not implemented.");
    }

    public supportsStreaming(): boolean {
        throw new Error("Abstract method!");
    }

    public loadWebsocket(url: string): boolean {
        // load 1kb of data from the file and feed it to the isDataValid function
        // if the data is valid, then we can load the rest of the file.
        // const websocket = new WebSocket(url);
        // websocket.binaryType = "arraybuffer";
        // websocket.onmessage = (evt) => {
        //     if (evt.data) {
        //         const data = evt.data as ArrayBuffer;
        //         if (this.isDataValid(data)) {
        //             this.websocket = websocket;
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     }
        // }
        return false;
    }

    public async loadFile(file: File): Promise<messageType[]> {
        // load 1kb of data from the file and feed it to the isDataValid function
        // if the data is valid, then we can load the rest of the file.
        // const fileSlice = file.slice(0, 1024);
        // const fileReader = new FileReader();
        // fileReader.onload = (evt) => {
        //     if (evt.target?.result) {
        //         const data = evt.target.result as ArrayBuffer;
        //         if (await this.isDataValid(data)) {
        //             this.file = file;
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     }
        // }
        // fileReader.readAsArrayBuffer(fileSlice);
        return [];
    }

    public onDisconnect(): void {
        throw new Error("Abstract method!");
    }

    public async isDataValid(data: File): Promise<boolean> {
        throw new Error("Abstract method!");
    }
}