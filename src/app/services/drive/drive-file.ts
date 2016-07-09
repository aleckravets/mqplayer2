export class DriveFile {
    id: string;
    name: string;
    isFolder: boolean;
    hasSubfolders: boolean;
    children: DriveFile[];

    constructor(id:string, name:string, isFolder:boolean, hasSubfolders = false) {
        this.id = id;
        this.name = name;
        this.isFolder = isFolder;
        this.hasSubfolders = hasSubfolders;
    }
}