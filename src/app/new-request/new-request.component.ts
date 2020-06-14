
import { Component, OnInit, Inject } from '@angular/core';
import { GetSolutionService } from '../service/get-solution.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APP_CONSTANT } from '../app.constant';
@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css']
})
export class NewRequestComponent implements OnInit {
  newposts: any;
  constructor(
    private getSolutionService: GetSolutionService,
    private dialogRef: MatDialogRef<NewRequestComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.newposts = data;
  }
  ngOnInit(): void {
    console.log( this.newposts);
  }
  updateRequest(data, type) {
    data.type = type;
    const url = `${APP_CONSTANT.HOST_URL}${APP_CONSTANT.NEWPOST_URL}`;
    this.getSolutionService.createData(url, data).subscribe(data => {
      console.log(data);
      this.dialogRef.close(true);
    });
  }
  close() {
    this.dialogRef.close();
  }
}
