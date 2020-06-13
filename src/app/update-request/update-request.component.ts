import { Component, OnInit, Inject } from '@angular/core';
import { GetSolutionService } from '../service/get-solution.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APP_CONSTANT } from '../app.constant';
@Component({
  selector: 'app-update-request',
  templateUrl: './update-request.component.html',
  styleUrls: ['./update-request.component.css']
})
export class UpdateRequestComponent implements OnInit {
  reportList: any;
  constructor(
    private getSolutionService: GetSolutionService,
    private dialogRef: MatDialogRef<UpdateRequestComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.reportList = data;
  }
  ngOnInit(): void {
  }
  updateRequest(data, type) {
    data.type = type;
    const url = `${APP_CONSTANT.HOST_URL}${APP_CONSTANT.GET_SOLUTIONS_URL}`;
    this.getSolutionService.updateRecord(url, data).subscribe(data => {
      console.log(data);
      this.dialogRef.close(true);
    });
  }
  close() {
    this.dialogRef.close();
  }
}
