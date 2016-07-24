import {provideRouter} from '@angular/router';
import {playerRoutes} from "./components/player/player.routes";
import {loginRoutes} from "./components/login/login.routes";

export const routerProviders = provideRouter([
        ...loginRoutes,
        ...playerRoutes
    ]);