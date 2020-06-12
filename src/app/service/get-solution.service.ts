import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetSolutionService {

  constructor(private _http: HttpClient) { }

  isLoggedIn: BehaviorSubject<any> = new BehaviorSubject(false);
  getCE(nameSearch: any) {
    // let path = 'http://localhost:8092/getsolutions';
    let url = "https://mongodbconnection-nodejs.herokuapp.com/v1/search?keyword=" + nameSearch;
    console.log(url);
    return this._http.get(url);
  }
  getRequest(path) {
    return this._http.get(path);
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
    return this._http.post(path, body);
  }

  deleteRecord(id) {
    let url = "https://mongodbconnection-nodejs.herokuapp.com/v1/getsolution/" + id;
    return this._http.delete(url);
  }
}

