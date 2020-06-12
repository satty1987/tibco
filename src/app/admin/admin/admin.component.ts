import { Component, OnInit } from '@angular/core';
import { GetSolutionService } from 'src/app/service/get-solution.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  datalist: any;
  constructor(private getSolutionService: GetSolutionService
    , private router: Router) { }

  ngOnInit() {
  this.getData();
  }
  getData(){
    const url = 'https://mongodbconnection-nodejs.herokuapp.com/v1/getsolution'
    this.getSolutionService.getRequest(url).subscribe((data: any) => {
      console.log(data);
      this.datalist = data;
    },
      err => {

      })
  }

  route() {
    this.router.navigateByUrl('createForm');
  }

  deleteItem(id) {
    this.getSolutionService.deleteRecord(id).subscribe(data => {
      console.log('deletion completed');  
      this.getData();
    })
  }

}
