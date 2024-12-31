import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes,AuthService } from 'src/app/shared/core.index';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public routes = routes;

  form = new FormGroup({
    email: new FormControl('admin@dreamguys.in', [Validators.required]),
    password: new FormControl('123456', [Validators.required]),
  });
  
  get f() {
    return this.form.controls;
  }
  
  constructor(private router:Router, private auth: AuthService) {
  }

  loginFormSubmit() {
    if (this.form.valid) {
      this.auth.login();
    }
  }
}
