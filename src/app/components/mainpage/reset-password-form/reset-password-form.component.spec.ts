import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ResetPasswordFormComponent } from './reset-password-form.component';
import { User } from '../../../models/user';
import { AuthenticationService } from '../../../services/authentication.service';


/**
 * Tests for the 'reset password form'
 *
 * @author Oscar Wellner, 500806660
 */
describe('Component: ResetPasswordFormComponent', () => {
  let component: ResetPasswordFormComponent;
  let fixture: ComponentFixture<ResetPasswordFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      providers: [
          HttpClient,
          HttpHandler,
          { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } },
          AuthenticationService
      ],
      declarations: [ ResetPasswordFormComponent ],
    });
  });

  it('should have created the component', () => {
    fixture = TestBed.createComponent(ResetPasswordFormComponent);
    component = fixture.debugElement.componentInstance;

    expect(component).toBeTruthy();
  });

  it('should have no starting value for the feedback message', () => {
    fixture = TestBed.createComponent(ResetPasswordFormComponent);
    component = fixture.debugElement.componentInstance;

    expect(component.feedbackMessage).toBeUndefined();
  });

  it(`should redirect the user to homepage if the status of the user is not 'NAC'`, () => {
    fixture = TestBed.createComponent(ResetPasswordFormComponent);
    component = fixture.debugElement.componentInstance;

    const authenticationService = fixture.debugElement.injector.get(AuthenticationService);
    const router = fixture.debugElement.injector.get(Router);
    authenticationService.currentUser = new User('testUser', 'ADM', 'OFF', 'secretPassword');
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it(`should stay on the reset password component if the status of the user is 'NAC'`, () => {
    fixture = TestBed.createComponent(ResetPasswordFormComponent);
    component = fixture.debugElement.componentInstance;

    const authenticationService = fixture.debugElement.injector.get(AuthenticationService);
    const router = fixture.debugElement.injector.get(Router);
    authenticationService.currentUser = new User('testUser', 'ADM', 'NAC', 'secretPassword');
    fixture.detectChanges();

    expect(router.navigate).not.toHaveBeenCalledWith(['/home']);
  });

  it('should show the user an error that the inputted password values are not the same', fakeAsync(() => {
    fixture = TestBed.createComponent(ResetPasswordFormComponent);
    component = fixture.debugElement.componentInstance;

    const authenticationService = fixture.debugElement.injector.get(AuthenticationService);
    authenticationService.currentUser = new User('testUser', 'ADM', 'NAC', 'secretPassword');

    fixture.detectChanges();
    tick(100);

    component.resetPasswordForm.form.patchValue({
      newPassword: 'testP4ssword!',
      confirmedPassword: 'testingP4ssword!'
    });
    component.onSubmit(component.resetPasswordForm);

    expect(component.feedbackMessage).not.toEqual('');
    expect(component.feedbackMessage).toEqual('The inputted passwords are not the same');
  }));

  it('should have an valid form when the inputted password values are the same', fakeAsync(() => {
    fixture = TestBed.createComponent(ResetPasswordFormComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    tick();

    component.resetPasswordForm.form.patchValue({
      newPassword: 'Osc_Wel2121!',
      confirmedPassword: 'Osc_Wel2121!'
    });

    expect(component.resetPasswordForm.form.valid).toBeTruthy();
  }));

  it('should have gotten the form from the local reference', () => {
    fixture = TestBed.createComponent(ResetPasswordFormComponent);
    component = fixture.debugElement.componentInstance;

    expect(component.resetPasswordForm).toBeTruthy();
  });

  it('The form should initially be valid', () => {
    fixture = TestBed.createComponent(ResetPasswordFormComponent);
    component = fixture.debugElement.componentInstance;

    expect(component.resetPasswordForm.form.valid).toBeTruthy();
  });

  it('Both password fields should be required', fakeAsync(() => {
    fixture = TestBed.createComponent(ResetPasswordFormComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    tick();

    const newPasswordControl = component.resetPasswordForm.controls.newPassword;
    const confirmedPasswordControl = component.resetPasswordForm.controls.confirmedPassword;

    expect(newPasswordControl.errors.required).toBeTruthy();
    expect(confirmedPasswordControl.errors.required).toBeTruthy();
  }));

  it('The form should be invalid with only 1 field filled in', fakeAsync(() => {
    fixture = TestBed.createComponent(ResetPasswordFormComponent);
    component = fixture.debugElement.componentInstance;

    component.resetPasswordForm.form.patchValue({
      newPassword: 'testP4ssword!'
    });

    fixture.detectChanges();
    tick();

    expect(component.resetPasswordForm.form.valid).toBeFalsy();
  }));
});
