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
    dir: DriveFile;
    loading: boolean;
    
    constructor(private driveService: DriveService) {
    }

    showDir(dir: DriveFile) {
        console.log(dir);
        this.dir = dir;
        if (!dir.children) {
            this.loading = true;
            this.driveService.getFiles(dir)
                .finally(() => this.loading = false);
        }
    }
}