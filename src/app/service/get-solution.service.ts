import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { APP_CONSTANT } from '../app.constant';


@Injectable({
  providedIn: 'root'
})
export class GetSolutionService {

  constructor(private http: HttpClient) { }

  isLoggedIn: BehaviorSubject<any> = new BehaviorSubject(false);
  isAdmin: BehaviorSubject<any> = new BehaviorSubject(false);
  userInfo = null;
  getCE(nameSearch: any) {
    const url = `${APP_CONSTANT.HOST_URL}${APP_CONSTANT.SEARCH_URL}?keyword=${nameSearch}`;
    console.log(url);
    return this.http.get(url);
  }
  getRequest(path) {
    return this.http.get(path);
  }

  createData(path, body) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache',
          'accept': 'application/json'
        }
      )
    };
    return this.http.post(path, body);
  }

  deleteRecord(url) {
    return this.http.delete(url);
  }
  updateRecord(path,body){
    return this.http.put(path, body);
  }
}

