import { Component, OnInit } from '@angular/core';
import { GetSolutionService } from '../service/get-solution.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  nameSearch: any;
  showData: boolean = true;
  ceList: any[] = [];
  error = ''
  isError = false
  constructor(private getSolutionService: GetSolutionService) { }


  ngOnInit() {
  }

  disabled() {
    if (this.nameSearch == null) {
      return true
    }
    return false;
  }
  getSolutions() {
    console.log("get solition called");
    console.log(this.nameSearch);

    this.getSolutionService.getCE(this.nameSearch).subscribe((data: any[]) => {
      console.log(data);
      this.showData = false;
      this.isError = false;
      this.ceList = data;
    },
      err => {
        this.error = 'Nothing found in database';
        this.isError = true;
      })


  }
  searchAgain() {
    this.showData = true;
    this.nameSearch = null
  }
}
