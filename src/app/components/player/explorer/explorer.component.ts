import {Component, OnInit, forwardRef, Inject, ViewChild} from '@angular/core';
import {TreeComponent} from "./tree/tree.component";
import {FolderComponent} from "./folder/folder.component";
import {TreeNodeComponent} from "./tree/tree-node/tree-node.component";
import {ITreeNode} from "./tree/tree-node/tree-node";
import {FileNode} from "./file-node";
import {SearchResultsComponent} from "./search-results/search-results.component";
import {ROUTER_DIRECTIVES, ActivatedRoute, Router} from "@angular/router";
import {DriveFile} from "../../../services/drive/drive-file";
import {DriveService} from "../../../services/drive/drive-service";
import {AppComponent} from "../../app.component";

@Component({
    selector: 'explorer',
    moduleId: module.id,
    templateUrl: './explorer.html',
    styleUrls: ['./explorer.css'],
    directives: [TreeComponent, FolderComponent, SearchResultsComponent, ROUTER_DIRECTIVES]
})
export class ExplorerComponent implements OnInit{
    // @ViewChild(FolderComponent) content: FolderComponent;
    treeRoots: ITreeNode[];
    currentDir:  DriveFile;
    private sub: any;

    constructor(
        @Inject(forwardRef(() => AppComponent)) public app: AppComponent,
        private driveService: DriveService,
        private router: Router) {
    }

    ngOnInit() {
        this.initTree();
    }
    
    onSelectNode(node: TreeNodeComponent) {
        this.router.navigate(['/folders', node.model.file.id]);
    }

    getTreeOptions() {
        return {
            getChildren: node => this.getChildren(node)
        }
    }

    private getChildren(node: FileNode) {
        if (node.file.children) {
            return node.file.children
                .filter(f => f.isFolder)
                .map(file => new FileNode(file));
        }

        return this.driveService.getChildren(node.file)
            .then(files => {
                var children = files.filter(f => f.isFolder)
                    .map(file => new FileNode(file));

                return children;
            });
    }
    
    private initTree() {
        this.driveService.getFile('root')
            .then(file => {
                this.treeRoots = [
                    new FileNode(file),
                    {
                        name: 'Playlists',
                        hasChildren: true,
                        type: 'playlists',
                        children: []
                    }
                ];
            });
    }
}