import { HttpHeaders } from "@angular/common/http";

export const environment = {
  API_URL_TEMPLATE: "https://tiagosora.pythonanywhere.com/ws/",
  // API_URL_TEMPLATE: "http://127.0.0.1:8000/ws/",
  HTTP_OPTIONS : {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  },
  production: true
};
