import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetSolutionService } from '../service/get-solution.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APP_CONSTANT } from '../app.constant';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  updateForm: FormGroup;
  submitted = false;
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private getSolutionService: GetSolutionService,
    private dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.data = data;
  }

  ngOnInit() {
    this.createForm(this.data);
  }
  createForm(data) {
    this.updateForm = this.formBuilder.group({
      title: [data.title, Validators.required],
      error_description: [data.error_description, Validators.required],
      solution: [data.solution, Validators.required],
      reason:['', Validators.required],
      _id: [data._id]
    });
  }
  onSubmit(form) {
    console.log(form.value);

    if (form.valid) {
      form.value.user = this.getSolutionService.userInfo.email;
      const url = APP_CONSTANT.HOST_URL + APP_CONSTANT.UPDATE_URL;
      this.getSolutionService.createData(url, form.value).subscribe((response) => {
        console.log(response);
        this.dialogRef.close(true);
      });
    }
  }
  close() {
    this.dialogRef.close();
  }
}
