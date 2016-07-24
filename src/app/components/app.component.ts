import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {DriveService} from "../services/drive/drive-service";

@Component({
    selector: "app",
    moduleId: module.id,
    templateUrl: "./app.html",
    directives: [ROUTER_DIRECTIVES],
    providers: [DriveService]
})
export class AppComponent implements OnInit {

    constructor(private driveService: DriveService) {
    }

    ngOnInit() {
    }
}