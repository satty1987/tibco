import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, tap} from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable()
export class AppConfigService {
  CONFIG_URL = "https://raw.githubusercontent.com/satty1987/ng-graphql/master/db1.json";
  private config = null;
  private configuration: Observable<any>;
  constructor(private httpClient: HttpClient) {

  }
  public get getConfig() {
    return this.config;
  }
  public load(): any {
    if (!this.configuration) {
      this.configuration = this.httpClient.get<any>(this.CONFIG_URL).pipe(
        shareReplay(1),
        tap(data => {
          this.config = data;
        })
      );
    }
    return this.configuration;
}
}
