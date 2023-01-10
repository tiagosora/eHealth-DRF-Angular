// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import {HttpHeaders} from '@angular/common/http';

export const environment = {
  API_URL_TEMPLATE: "https://tiagosora.pythonanywhere.com/ws/",
  // API_URL_TEMPLATE: "http://127.0.0.1:8000/ws/",
  HTTP_OPTIONS : {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  },
  production: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
