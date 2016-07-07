export class DriveFile{
    id: string;
    name: string;
    isDir: boolean;
    children: DriveFile[];

    constructor(id:string, name:string, isDir:boolean) {
        this.id = id;
        this.name = name;
        this.isDir = isDir;
    }
}