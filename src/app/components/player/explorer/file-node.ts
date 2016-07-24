import {ITreeNode} from "./tree/tree-node/tree-node";
import {DriveFile} from "../../../services/drive/drive-file";

export class FileNode implements ITreeNode {
    name: string;
    hasChildren: boolean;
    type: string;
    children: FileNode[];
    file: DriveFile;
    
    constructor(driveFile: DriveFile) {
        this.name = driveFile.name;
        this.hasChildren = driveFile.hasSubfolders;
        this.type = driveFile.isFolder ? 'folder' : 'file';
        this.file = driveFile;
    }
}