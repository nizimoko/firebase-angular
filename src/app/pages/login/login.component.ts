import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('f', { static: false }) login: NgForm;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  formSubmit(): void {
    if (this.login.form.status == 'VALID') {
      this.authService
        .login(this.login.value.email, this.login.value.password)
        .subscribe((data: any) => {
          console.log(data);
        });
    }
  }
}
