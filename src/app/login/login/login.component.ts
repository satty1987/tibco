import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetSolutionService } from 'src/app/service/get-solution.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private getSolutionService: GetSolutionService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  onSubmit(form) {
    this.submitted = true;
    console.log(this.loginForm.value);
    if (this.loginForm.value.username == 'admin' && (this.loginForm.value.password == 'admin')) {
      this.getSolutionService.isLoggedIn.next(true);
      sessionStorage.setItem('userInfo', JSON.stringify(this.loginForm.value));
      this.router.navigateByUrl('/admin');
    }
    else {
      alert("invalid credentials");
      this.loginForm.reset();
    }
  }
}
