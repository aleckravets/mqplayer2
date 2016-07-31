import {Component, OnInit, Inject, forwardRef} from "@angular/core";
import {DriveService} from "../../services/drive/drive-service";
import {ControlsComponent} from "./controls/controls.component";
import {PlaylistComponent} from "./playlist/playlist.component";
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {TreeNodeComponent} from "./tree/tree-node/tree-node.component";
import {FileNode} from "./file-node";
import {SearchResultsComponent} from "./search-results/search-results.component";
import {FolderComponent} from "./folder/folder.component";
import {TreeComponent} from "./tree/tree.component";
import {AppComponent} from "../app.component";
import {ITreeNode} from "./tree/tree-node/tree-node";

@Component({
    selector: "player",
    moduleId: module.id,
    templateUrl: "./player.html",
    directives: [TreeComponent, FolderComponent, SearchResultsComponent, ControlsComponent, PlaylistComponent, ROUTER_DIRECTIVES]
})
export class PlayerComponent implements OnInit {
    treeRoots: ITreeNode[];

    constructor(@Inject(forwardRef(() => AppComponent)) public app: AppComponent,
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