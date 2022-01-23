import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loading = false;
  errorMessage: string;

  constructor(public authenticationService: AuthenticationService, public router: Router) {
  }

  ngOnInit() {
  }

  onSigIn(form: NgForm) {
    this.loading = true;
    const userId = form.value.userID;
    const password = form.value.password;

    this.authenticationService.signIn(userId, password).subscribe(
        (data) => {
      this.loading = false;

      this.router.navigate(['/home']);
          // this.router.navigate(['/reset-password-form']);

        },
      (error) => {
      this.errorMessage = error.error.message;
      this.loading = false;
    });
  }

  pop() {
    alert('If you have forgotten login information, ask please the Administrator');

  }


}
