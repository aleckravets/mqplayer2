/// <reference path="./tools/array-tools.ts" />
import {bootstrap} from "@angular/platform-browser-dynamic";
import {routerProviders} from './app.routes';
import {loadDriveAPI, DriveService} from "./services/drive/drive-service";
import {AppComponent} from "./components/app.component";
import {AuthGuard} from "./services/auth-guard";

loadDriveAPI()
    .then(() => {
        bootstrap(AppComponent, [
            ...routerProviders, 
            AuthGuard, 
            DriveService
        ]);
    });
