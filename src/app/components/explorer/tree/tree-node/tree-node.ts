import { DriveFile } from '../../../../services/drive/drive-file';

export class TreeNode {
    name: string;
    isDir: boolean;
    children: TreeNode[];
    file: DriveFile;

    constructor(file: DriveFile) {
        this.name = file.name;
        this.isDir = file.isDir;
        this.file = file;
    }
}