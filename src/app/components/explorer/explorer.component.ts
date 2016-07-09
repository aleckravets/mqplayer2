import {Component, OnInit, forwardRef, Inject, ViewChild} from '@angular/core';
import {TreeComponent} from "./tree/tree.component";
import {ContentComponent} from "./content/content.component";
import {AppComponent} from "app/components/app.component";
import {DriveFile} from "../../services/drive/drive-file";
import {TreeNodeComponent} from "./tree/tree-node/tree-node.component";
import {ITreeNode} from "./tree/tree-node/tree-node";
import {DriveService} from "../../services/drive/drive-service";
import {DriveFileNode} from "./drive-file-node";

@Component({
    selector: 'explorer',
    moduleId: module.id,
    templateUrl: './explorer.html',
    styleUrls: ['./explorer.css'],
    directives: [TreeComponent, ContentComponent]
})
export class ExplorerComponent implements OnInit{
    @ViewChild(ContentComponent) content: ContentComponent;
    treeRoots: ITreeNode[];
    currentDir: DriveFile;

    constructor(@Inject(forwardRef(() => AppComponent)) public app: AppComponent, private driveService: DriveService) {
    }

    ngOnInit() {
        this.initTree();
    }
    
    onSelectNode(node: TreeNodeComponent) {
        this.content.showFolder(node.model.file);
    }

    getTreeOptions() {
        return {
            getChildren: node => this.getChildren(node)
        }
    }

    private getChildren(node: DriveFileNode) {
        if (node.file.children) {
            return node.file.children
                .filter(f => f.isFolder)
                .map(file => new DriveFileNode(file));
        }

        return this.driveService.getFiles(node.file)
            .then(files => {
                var children = files.filter(f => f.isFolder)
                    .map(file => new DriveFileNode(file));

                return children;
            });
    }
    
    private initTree() {
        let myDrive = new DriveFileNode(new DriveFile('root', 'My Drive', true, true));

        let playlists = {
            name: 'Playlists',
            hasChildren: true,
            type: 'playlists',
            children: []
        };

        this.treeRoots = [myDrive, playlists];
    }
}