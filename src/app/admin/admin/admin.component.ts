import { Component, OnInit } from '@angular/core';
import { GetSolutionService } from 'src/app/service/get-solution.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { UpdateComponent } from 'src/app/update/update.component';
import { APP_CONSTANT } from 'src/app/app.constant';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ReportPostsComponent } from 'src/app/report-posts/report-posts.component';
import { ReportReasonComponent } from 'src/app/report-reason/report-reason.component';
import { UpdateRequestComponent } from 'src/app/update-request/update-request.component';
import { NewRequestComponent } from 'src/app/new-request/new-request.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  datalist: any;
  reportList: any;
  updateRequest: any;
  newPosts: any;
  isSuperUser = false;
  p = 1;
  itemsPerPage = APP_CONSTANT.ITEMSPERPAGE;
  constructor(
    private getSolutionService: GetSolutionService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getData();
    this.getSolutionService.isAdmin.subscribe((data: boolean) => {
      this.isSuperUser = data;
      if(this.isSuperUser){
        this.getReportData();
        this.getUpdateData();
        this.getNewPostData();
      }
    });
  }
  getData() {
    const url = APP_CONSTANT.HOST_URL + APP_CONSTANT.GET_SOLUTIONS_URL;
    this.getSolutionService.getRequest(url).subscribe((data: any) => {
      console.log(data);
      this.datalist = data;
      this.p = 1;
    },
      err => {

      });
  }
  getReportData() {
    const url = APP_CONSTANT.HOST_URL + APP_CONSTANT.REPORT_URL;
    this.getSolutionService.getRequest(url).subscribe((data: any) => {
      this.reportList = data;
    },
      err => {
        console.log(err);
        this.reportList = [];
      });
  }
  getUpdateData() {
    const url = APP_CONSTANT.HOST_URL + APP_CONSTANT.UPDATE_URL;
    this.getSolutionService.getRequest(url).subscribe((data: any) => {
      this.updateRequest = data;
    },
      err => {
        console.log(err);
        this.updateRequest = [];
      });
  }
  getNewPostData() {
    const url = APP_CONSTANT.HOST_URL + APP_CONSTANT.NEWPOST_URL;
    this.getSolutionService.getRequest(url).subscribe((data: any) => {
      this.newPosts = data;
    },
      err => {
        console.log(err);
        this.newPosts = [];
      });
  }
  openUpdateDialog(item) {
    const dialogRef = this.dialog.open(UpdateComponent,{
      height: '700px',
      width: '600px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.getData();
      }
    });
  }
  openReportDialog() {
    const dialogRef = this.dialog.open(ReportPostsComponent,{
      height: '750px',
      width: '1000px',
      data: this.reportList
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.getReportData();
        this.getData();
      }
    });
  }
  openUpdateRequestDialog() {
    const dialogRef = this.dialog.open(UpdateRequestComponent,{
      height: '750px',
      width: '1000px',
      data: this.updateRequest
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.getData();
        this. getUpdateData();
      }
    });
  }
  openReportReasonDialog(item) {
    const dialogRef = this.dialog.open(ReportReasonComponent,{
      height: '200px',
      width: '500px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.getReportData();
        this.getData();
      }
    });
  }

  openNewPostDialog() {
    const dialogRef = this.dialog.open(NewRequestComponent,{
      height: '750px',
      width: '1000px',
      data: this.newPosts
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.getReportData();
        this.getData();
        this.getNewPostData();
      }
    });
  }

  route() {
    this.router.navigateByUrl('createForm');
  }

  deleteItem(id) {
    const url = `${APP_CONSTANT.HOST_URL}${APP_CONSTANT.GET_SOLUTIONS_URL}/${id}`;
    this.getSolutionService.deleteRecord(url).subscribe(data => {
      console.log('deletion completed');
      this.getData();
      this.openSnackBar('Request Successful Submitted');
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

}
