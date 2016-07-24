import {Component, Input} from "@angular/core";
import {FileComponent} from "../file/file.component";
import {DriveService} from "../../../../services/drive/drive-service";

@Component({
    selector: "search-results",
    moduleId: module.id,
    templateUrl: "search-results.html",
    directives: [FileComponent]
})
export class SearchResultsComponent {
    loading: boolean;
    
    constructor(private driveService: DriveService) {
    }
}