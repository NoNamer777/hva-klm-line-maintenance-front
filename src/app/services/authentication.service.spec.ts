import {async, TestBed} from '@angular/core/testing';

import {AuthenticationService} from './authentication.service';
import {EquipmentService} from './equipment.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {LogInComponent} from '../components/authentication/log-in/log-in.component';
import {ignoreElements} from 'rxjs/operators';

/*
  Author: Yassine el Aatiaoui, 500767860
*/
describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let injector: TestBed;
  let auth: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [HttpClientTestingModule]
    });
    auth = TestBed.get(AuthenticationService);

    service = TestBed.get(AuthenticationService);
  }));

  // TEST4: It should create AuthenticationService
  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });

  //Test5: User schould be inlogged
  it('User schould be inlogged', async function() {
      let isPass = false;
      auth.signIn('KLM00005', '12345')
        .subscribe(
          res => {
            isPass = true;
            expect(isPass).toEqual(true);
          });
    }
  );

  //Test6: the Username must be returned
  it('the  Username must be returned', () => {
    auth.signIn('KLM00005', '12345').subscribe(data => {
        expect(auth.currentUser.id).toEqual('KLM00005');
      }
    );

  });

  //Test7: the user has successfully logged in
  it('the user has successfully logged in\n', () => {
    let isLogged;
    auth.signIn('KLM00005', '12345').subscribe(
      res => {
        isLogged = true;
        auth.isLoggedIn() == true;
        expect(isLogged).toEqual(true);
      });

  });

  //Test8: the user remains logged in after logging out
  it('the user remains logged in after logging out', () => {
    auth.signIn('KLM00005', '12345');
    auth.logout();
    let isLogged = auth.isLoggedIn();
    expect(isLogged).toEqual(false);
  });


  //Test9: is Token creater
  it('is Token creater', () => {
    let token;
    let isToken = false;
    auth.signIn('KLM00005', '12345').subscribe(res => {
      token = auth.currentToken;
      if (token != null) {
        isToken = true;
      }
      expect(isToken).toEqual(true);


    });

  });
  //Test10:if the user is logged out then there is no more token
  it('if the user is logged out then there is no more token', () => {
    let token;
    let isToken = false;
    const expectedResult = false;

    auth.signIn('KLM00005', '12345').subscribe(res => {
      token = auth.currentToken;
      if (token != null) {
        isToken = true;
      }
      auth.logout();
      isToken = false;
      expect(isToken).toEqual(expectedResult);
    });

  });

  //Test11:de user can log out
  it('if the user is logged out then there is no more token', () => {
    const expectedResult = false;
    auth.signIn('KLM00005', '12345').subscribe(res => {
      auth.logout();
      const actualResult = auth.isloggedInTrue;
      expect(actualResult).toEqual(expectedResult);
    });

  });

  //Test12:
  it('if the user is logged out then there is no more token', () => {
    let token;
    let isToken = false;
    const expectedResult = 'KLM00005';
    auth.signIn('KLM00005', '12345').subscribe(res => {
      token = auth.currentToken;
      if (token != null) {
        isToken = true;
      }
      const actualResult = auth.currentUser.id;


      expect(actualResult).toEqual(expectedResult);
    });

  });


});
