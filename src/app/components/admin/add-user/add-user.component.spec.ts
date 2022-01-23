import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Router} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

/**
 * Tests for AddUserComponent
 *
 * @Author Raymond Splinter - 500778433
 */
describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } }
      ],
      declarations: [AddUserComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a h3 tag wit title', () => {
    const de = fixture.debugElement.query(By.css('h3'));
    expect(de.nativeElement.textContent).toEqual('Add new user');
  });

  it('should have selection for roles', () => {
    const selectRole = fixture.debugElement.query(By.css('select[id="role"]'));

    expect(selectRole).toBeTruthy();
  });

  it('should not have validated the form', () => {
    const de = fixture.debugElement.componentInstance;
    expect(de.invalid).toBeFalsy();
  });

  it('should have matching passwords', () => {
    const de = fixture.debugElement.componentInstance;
    expect(de.noneMatchingPasswords).toBeFalsy();
  });

  it('should detect non-matching passwords', () => {
    const de = fixture.debugElement.componentInstance;
    de.userForm.patchValue({
      name: 'John',
      password: 'password!',
      validatePassword: 'password',
      role: 'GE'
    });
    component.onAddUser();
    fixture.detectChanges();

    expect(de.noneMatchingPasswords).toBeTruthy();
  });

  it('should detect correct name', () => {
    component = fixture.debugElement.componentInstance;
    component.userForm.patchValue({
      name: 'John'
    });

    expect(component.userForm.value.name).toEqual('John');
  });

  it('should detect incorrect role', () => {
    const de = fixture.debugElement.componentInstance;
    de.userForm.patchValue({
      name: 'John',
      password: 'password!',
      validatePassword: 'password'
    });

    component.onAddUser();
    fixture.detectChanges();

    expect(de.userForm.invalid).toBeTruthy();
  });

  it('should have valid form', () => {
    const de = fixture.debugElement.componentInstance;
    de.userForm.patchValue({
      name: 'John',
      password: 'password!',
      validatePassword: 'password!',
      role: 'GE'
    });

    fixture.detectChanges();
    expect(de.userForm.valid).toBeTruthy();
  });

  it('should change wrong role to RUN', () => {
    const de = fixture.debugElement.componentInstance;
    de.userForm.patchValue({
      name: 'John',
      password: 'password!',
      validatePassword: 'password!',
      role: 'A role'
    });

    component.onAddUser();
    fixture.detectChanges();

    expect(de.userForm.value.role).toEqual('RUN');
  });
});
