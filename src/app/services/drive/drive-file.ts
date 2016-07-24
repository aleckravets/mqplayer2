export class DriveFile {
    id: string;
    name: string;
    isFolder: boolean;
    hasSubfolders: boolean;
    children: DriveFile[];
}