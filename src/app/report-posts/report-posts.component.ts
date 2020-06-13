import { Component, OnInit,Inject } from '@angular/core';
import { GetSolutionService } from '../service/get-solution.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APP_CONSTANT } from '../app.constant';
@Component({
  selector: 'app-report-posts',
  templateUrl: './report-posts.component.html',
  styleUrls: ['./report-posts.component.css']
})
export class ReportPostsComponent implements OnInit {
  reportList: any;
  constructor(
    private getSolutionService: GetSolutionService,
    private dialogRef: MatDialogRef<ReportPostsComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.reportList = data;
  }
  ngOnInit(): void {
  }
  deleteItem(id, type) {
    const url = `${APP_CONSTANT.HOST_URL}${APP_CONSTANT.REPORT_URL}/${id}?status=${type}`;
    this.getSolutionService.deleteRecord(url).subscribe(data => {
      console.log('deletion completed');
      this.dialogRef.close(true);
    });
  }
  close() {
    this.dialogRef.close();
  }
}
