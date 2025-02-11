import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetSolutionService } from 'src/app/service/get-solution.service';
import { APP_CONSTANT } from 'src/app/app.constant';

@Component({
  selector: 'app-createform',
  templateUrl: './createform.component.html',
  styleUrls: ['./createform.component.css']
})
export class CreateformComponent implements OnInit {

  createForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private getSolutionService: GetSolutionService
  ) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      error_description: ['', Validators.required],
      solution: ['', Validators.required]
    });

  }

  onSubmit() {
    this.submitted = true;
    console.log(this.createForm.value);

    let body = {
      'title': this.createForm.value.title,
      'error_description': this.createForm.value.error_description,
      'solution': this.createForm.value.solution,
      'user': this.getSolutionService.userInfo.email
    };
    const path = `${APP_CONSTANT.HOST_URL}${APP_CONSTANT.GET_SOLUTIONS_URL}`;
    this.getSolutionService.createData(path, body).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl('/admin');
    })
  }
}
