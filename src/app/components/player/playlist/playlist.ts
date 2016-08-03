import {DriveFile} from "../../../services/drive/drive-file";

export class Playlist {
    records: DriveFile[];
    shuffledRecords: DriveFile[];
    repeat: boolean = false;
    shuffle: boolean = false;

    constructor(records?:DriveFile[]) {
        this.records = records || [];
    }

    enqueue(records: DriveFile[], insertBeforeRecord?: DriveFile) {
        let index = insertBeforeRecord ? this.records.indexOf(insertBeforeRecord) : this.records.length;

        this.records.splice(index, 0, ...records);

        this.shuffleRecords();
    }

    clear() {
        this.records.empty();
        this.shuffleRecords();
    }

    set(records: DriveFile[]) {
        this.clear();
        this.enqueue(records);
    }

    getRecords() {
        return this.shuffle ? this.shuffledRecords : this.records;
    }

    toggleShuffle(firstRecord?: DriveFile) {
        this.shuffle = !this.shuffle;
        if (firstRecord) {
            this.rotateShuffledRecords(firstRecord);
        }
    }

    toggleRepeat() {
        this.repeat = !this.repeat;
    }

    getPreviousRecord(record: DriveFile, random?: boolean, repeat?: boolean): DriveFile {
        var records =  (random === undefined ? this.shuffle : random) ? this.shuffledRecords : this.records;
        var i = records.indexOf(record);

        if (i > 0) {
            return records[i - 1];
        }
        else if (i === 0 && (repeat === undefined ? this.repeat : repeat)) {
            return records[records.length - 1];
        }
   }

    getNextRecord(record: DriveFile, random?: boolean, repeat?: boolean): DriveFile {
        var records =  (random === undefined ? this.shuffle : random) ? this.shuffledRecords : this.records;
        var i = records.indexOf(record);

        if (i <= records.length - 2) {
            return records[i + 1];
        }

        if (i === records.length - 1 && (repeat === undefined ? this.repeat : repeat)) {
            return records[0];
        }
    }

    moveRecords(records: DriveFile[], insertBefore?: DriveFile) {
        if (insertBefore && records.indexOf(insertBefore) !== -1) {
            return;
        }

        let recs = this.records;

        records.forEach(record => recs.splice(recs.indexOf(record), 1));

        recs.splice(insertBefore ? recs.indexOf(insertBefore) : recs.length, 0, ...records);
    }


    private shuffleRecords() {
        this.shuffledRecords = this.records.clone().shuffle();
    }

    private rotateShuffledRecords(firstRecord: DriveFile) {
        let sh = this.shuffledRecords;
        sh.rotate(sh.indexOf(firstRecord));
    }
}