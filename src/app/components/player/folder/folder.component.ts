import {Component, Input, OnInit, forwardRef, Inject} from "@angular/core";
import {FileComponent} from "../file/file.component";
import {ActivatedRoute, Router, ROUTER_DIRECTIVES} from "@angular/router";
import {DriveFile} from "../../../services/drive/drive-file";
import {DriveService} from "../../../services/drive/drive-service";
import {PlayerComponent} from "../player.component";

@Component({
    moduleId: module.id,
    templateUrl: "folder.html",
    directives: [FileComponent, ROUTER_DIRECTIVES]
})
export class FolderComponent implements OnInit {
    folder: DriveFile;
    parents: DriveFile[];
    // selectedFiles: FileComponent[];
    selectedFile: FileComponent;
    isLoading: boolean;
    private paramsObserver;
    
    constructor(
        @Inject(forwardRef(() => PlayerComponent)) public player: PlayerComponent,
        private driveService: DriveService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        this.paramsObserver = this.route.params.subscribe(params => {
            this.showFolder(params['id'] || 'root');
        });
    }

    ngOnDestroy() {
        this.paramsObserver.unsubscribe();
    }

    selectFile(file: FileComponent) {
        if (this.selectedFile) {
            this.selectedFile.isSelected = false;
        }
        file.isSelected = true;
        this.selectedFile = file;
    }

    doubleClick(file: FileComponent) {
        if (file.file.isFolder) {
            this.router.navigate(['/folders', file.file.id]);
        }
        else {
            // todo: check extension
            this.player.playFile(file.file);
        }
    }

    showFolder(id: string) {
        this.isLoading = true;
        this.driveService.getFile(id)
            .then(file => {
                this.folder = file;
                return this.driveService.getParents(file)
                    .then(parents => {
                        this.parents = parents;
                    })
                    .then(() => {
                        return this.driveService.getChildren(file)
                    })
            })
            .finally(() => {
                this.isLoading = false;
            });
    }
}