import { DriveFile } from 'app/services/drive/drive-file';

export class TreeNode {
    name: string;
    isFolder: boolean;
    children: TreeNode[];
    file: DriveFile;

    constructor(file: DriveFile) {
        this.name = file.name;
        this.isFolder = file.isFolder;
        this.file = file;
    }
}