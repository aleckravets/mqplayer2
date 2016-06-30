export class Deferred {
    promise: Promise<any>;
    private resolveCallback;
    private rejectCallback;

    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolveCallback = resolve;
            this.rejectCallback = reject;
        });
    }

    resolve(result?: any) {
        this.resolveCallback(result);
    }

    reject(error?: any) {
        this.rejectCallback(error);
    }
}