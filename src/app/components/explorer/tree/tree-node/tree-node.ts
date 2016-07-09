export interface ITreeNode {
    name: string;
    hasChildren: boolean;
    type: string;
    children: ITreeNode[];
}