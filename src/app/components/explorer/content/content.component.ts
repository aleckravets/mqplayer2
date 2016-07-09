import {Component, Input} from "@angular/core";
import {DriveFile} from "../../../services/drive/drive-file";
import {DriveService} from "../../../services/drive/drive-service";
import {NgIf} from "@angular/common";

@Component({
    selector: "content",
    moduleId: module.id,
    templateUrl: "content.html",
    directives: [NgIf]
})
export class ContentComponent {
    folder: DriveFile;
    loading: boolean;
    
    constructor(private driveService: DriveService) {
    }

    showFolder(folder: DriveFile) {
        this.folder = folder;
        if (!folder.children) {
            this.loading = true;
            this.driveService.getFiles(folder)
                .finally(() => this.loading = false);
        }
    }
}