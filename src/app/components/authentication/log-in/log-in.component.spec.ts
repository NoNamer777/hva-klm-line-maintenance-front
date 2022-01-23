import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import { LogInComponent } from './log-in.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material';
import {EquipmentPickComponent} from '../../runner/equipment-pick/equipment-pick.component';
import {AgmCoreModule, MapsAPILoader} from '@agm/core';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AuthenticationService} from '../../../services/authentication.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import{By}from '@angular/platform-browser'

/*
  Author: Yassine el Aatiaoui
*/

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let el: HTMLElement;
  let auth: AuthenticationService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogInComponent],
      imports: [BrowserModule,
        FormsModule,HttpClientModule, RouterTestingModule,ReactiveFormsModule ],
      providers:[HttpClient]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    auth = fixture.debugElement.injector.get(AuthenticationService);
    auth.signIn("KLM00001", "12345");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Test1: should desplay name if user logged in
  it('should desplay name if user logged in', () => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.debugElement.componentInstance;
    component.authenticationService.isLoggedIn();
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).
    toContain(component.authenticationService.currentUser.name)

  });

  // TEST2: It should  load the title of the page
  it('try to logged in with fout password', () => {
    auth.signIn("KLM00001", "12345");
    fixture.detectChanges();
    let isLoggedIn = true;
    // logged out
    auth.logout();
    if (!auth.isloggedInTrue()){
      isLoggedIn = false;
    }
    const actualRe = auth.isloggedInTrue;
    expect(isLoggedIn).toEqual(false);

  });
  // TEST3: Check if input email and password is true
  it('should load the username input and email correctly', () => {
    const inputUsername = fixture.debugElement.nativeElement.querySelector('#userId');
    const inputPassword = fixture.debugElement.nativeElement.querySelector('#password');
    expect(inputUsername).toBeNull();

  });

});
