import {Component, Input} from "@angular/core";
import {NgIf} from "@angular/common";
import {DriveFile} from "../../../../services/drive/drive-file";

@Component({
    selector: "content-file",
    moduleId: module.id,
    templateUrl: "file.html",
    directives: [NgIf]
})
export class FileComponent {
    @Input() file: DriveFile;
    isSelected: boolean;
    
    constructor() {
    }
}