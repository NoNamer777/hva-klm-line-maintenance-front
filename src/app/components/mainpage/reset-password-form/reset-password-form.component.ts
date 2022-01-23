import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../services/authentication.service';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit {
  // @ts-ignore
  @ViewChild('feedbackMessageComponent') feedbackMessageComponent: ElementRef;
  // @ts-ignore
  @ViewChild('resetPasswordForm') resetPasswordForm: NgForm;

  feedbackMessage: string;

  constructor(
      private authenticationService: AuthenticationService,
      private router: Router,
      private usersService: UsersService) {
  }

  ngOnInit() {
    if (this.authenticationService.currentUser.status !== 'NAC') {
      this.feedbackMessage = 'redirecting';
      this.router.navigate(['/home']);
    }
  }

  onKeyPress(): void {
    if (this.resetPasswordForm.controls.confirmedPassword !== undefined) {
      this.resetPasswordForm.controls.newPassword.setErrors(null);
      this.resetPasswordForm.controls.confirmedPassword.setErrors(null);
    }
  }

  onSubmit(resetPasswordForm: NgForm) {
    const newPassword = resetPasswordForm.value.newPassword;
    const confirmedPassword = resetPasswordForm.value.confirmedPassword;

    this.feedbackMessageComponent.nativeElement.classList.add('invisible');
    this.feedbackMessage = '';

    if (newPassword !== confirmedPassword) {
      this.feedbackMessageComponent.nativeElement.classList.remove('invisible');
      this.feedbackMessage = 'The inputted passwords are not the same';

      resetPasswordForm.controls.confirmedPassword.setErrors({ incorrect: true });
      resetPasswordForm.controls.newPassword.setErrors({ incorrect: true });

      return;
    }

    const user = new User(
        this.authenticationService.currentUser.name,
        this.authenticationService.currentUser.role,
        this.authenticationService.currentUser.status,
        newPassword
    );
    user.id = this.authenticationService.currentUser.id;

    this.usersService.saveUser(user);
  }

}
