class DataLoader {
    buffer: ArrayBuffer = new ArrayBuffer(0);

    public consume(data: ArrayBuffer) {
      throw new Error("Method not implemented.");
    }

    public supportsStreaming(): boolean {
        throw new Error("Abstract method!");
    }

    public load(input: any): boolean {
        throw new Error("Abstract method!");
    }

    public onDisconnect(): void {
        throw new Error("Abstract method!");
    }

    public isDataValid(data: ArrayBuffer): boolean {
        throw new Error("Abstract method!");
    }
}