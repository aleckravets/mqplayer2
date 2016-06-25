import { DriveItem } from 'app/services/drive/drive-item';

export class TreeNode {
    name: string;
    children: TreeNode[];
    hasChildren = true;
    item: DriveItem;

    constructor(item: DriveItem) {
        this.name = item.name;
        this.item = item;
    }
}