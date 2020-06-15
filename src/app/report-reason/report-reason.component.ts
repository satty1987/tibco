import { Component, OnInit ,Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetSolutionService } from '../service/get-solution.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APP_CONSTANT } from '../app.constant';

@Component({
  selector: 'app-report-reason',
  templateUrl: './report-reason.component.html',
  styleUrls: ['./report-reason.component.css']
})
export class ReportReasonComponent implements OnInit {
data: any;
reasonForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private getSolutionService: GetSolutionService,
    private dialogRef: MatDialogRef<ReportReasonComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.data = data;
    }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.reasonForm = this.formBuilder.group({
      reason: ['', Validators.required]
    });
  }
  onSubmit(form) {
    if (form.valid) {
      this.reportPost(this.data._id, form.value.reason);
    }
  }
  close() {
    this.dialogRef.close();
  }
  reportPost(id, reason) {
    const url = `${APP_CONSTANT.HOST_URL}${APP_CONSTANT.REPORT_URL}/${id}?reason=${reason}`;
    this.getSolutionService.getRequest(url).subscribe((data: any) => {
      console.log('Request Successful Submitted');
      this.dialogRef.close();
    },
      (err: any) => {
        this.dialogRef.close();
        console.log(err.error.message);
      });
  }
}
