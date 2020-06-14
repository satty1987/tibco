import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../service/loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-httploader',
  templateUrl: './httploader.component.html',
  styleUrls: ['./httploader.component.css']
})
export class HttploaderComponent implements OnInit {
  color = 'accent';
  mode = 'indeterminate';
  value = 50;
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService){}

  ngOnInit(): void {
  }

}
