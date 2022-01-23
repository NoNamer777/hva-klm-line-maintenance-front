import {async, ComponentFixture, getTestBed, inject, TestBed} from '@angular/core/testing';
import {EquipmentService} from '../services/equipment.service';
import {Equipment, EquipmentStatus} from '../models/equipment';
import {EquipmentType} from '../models/equipmentType';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {fakeAsync, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {HomePageComponent} from '../components/mainpage/home-page/home-page.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from '../components/mainpage/navbar/navbar.component';
import {MatIconModule} from '@angular/material';
import {AuthenticationService} from '../services/authentication.service';
import {FormsModule, NgForm} from '@angular/forms';
import {UsersService} from '../services/users.service';
import {User} from '../models/user';


/**
 * Tests services, router , authentication
 *
 * @author Ilias Delawar, 500783016
 */


/**
 * Tests that checks if the methods of the EquipmentService works.
 */
describe('EquipmentService', () => {

  // We declare the variables that we'll use for the Test Controller and for our Service
  let httpTestingController: HttpTestingController;
  let service: EquipmentService;
  let injector: TestBed;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EquipmentService],
      imports: [HttpClientTestingModule]
    });

    // We inject our service (which imports the HttpClient) and the Test Controller
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(EquipmentService);
    injector = getTestBed();

  });

  afterEach(() => {
    //after each test check if there are any unhandled requests
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*
  These are all tests to check whether the method and the http calls in the methods works in the equipmentService
   */
  // Test that checks whether the returnEquipmentList method returns a list of equipments
  it('returnEquipments should return data', () => {
    let equipmentType: EquipmentType = new EquipmentType();
    equipmentType.subgroup = 'Nitrogen cart';
    equipmentType.id = 2;
    equipmentType.group = 'Nitrogen cart';
    equipmentType.abbreviation = 'NC';


    const dummyList: Equipment[] = [{
      serialNumber: 'STK0003',
      id: 'Ilias',
      type: equipmentType,
      status: EquipmentStatus.usable,
      statusDescription: null,
      longitude: 0,
      latitude: 0
    }];

    //SpyOn is used to  check if a function was called or to provide a custom return value
    // This helps keep our unit tests focused on testing the internals of the component itself instead of its dependencies.
    spyOn(service, 'returnEquipmentList').and.returnValue(of(dummyList)).and.callThrough();


    service.returnEquipmentList().subscribe((res) => {
      expect(res).toEqual(dummyList);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/equipment/');
    expect(req.request.method).toBe('GET');
    req.flush(dummyList);

  });


  //Test that checks if the getEquipmentById method works
  it('getEquipmentById should return one Object of equipment', () => {

    let equipmentType: EquipmentType = new EquipmentType();
    equipmentType.subgroup = 'Nitrogen cart';
    equipmentType.id = 2;
    equipmentType.group = 'Nitrogen cart';
    equipmentType.abbreviation = 'NC';

    const dummyEquipment = {
      serialNumber: 'STK0003',
      id: 'Ilias',
      type: equipmentType,
      status: EquipmentStatus.usable,
      statusDescription: null,
      longitude: 0,
      latitude: 0
    };

    spyOn(service, 'getEquipmentById').withArgs(dummyEquipment.serialNumber).and.returnValue(of(dummyEquipment));

    service.getEquipmentById(dummyEquipment.serialNumber).subscribe((data: any) => {
      expect(data).toBe(dummyEquipment);
    });
  });

  it('delete Equipment method', () => {
    let equipmentType: EquipmentType = new EquipmentType();
    equipmentType.subgroup = 'Nitrogen cart';
    equipmentType.id = 2;
    equipmentType.group = 'Nitrogen cart';
    equipmentType.abbreviation = 'NC';

    const dummyEquipment = {
      serialNumber: 'STK0003',
      id: 'Ilias',
      type: equipmentType,
      status: EquipmentStatus.usable,
      statusDescription: null,
      longitude: 0,
      latitude: 0
    };
    service.deleteEquipment(dummyEquipment.serialNumber).subscribe((data: any) => {
      expect(data).toBe(dummyEquipment);
    });

    //Check whether a single request has been made which matches the given URL and return its mock.
    const req = httpTestingController.expectOne(
      `http://localhost:8080/equipment/STK0003`,
      'delete successful'
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyEquipment);


  });


  it('add equipment ', () => {
    let equipmentType: EquipmentType = new EquipmentType();
    equipmentType.subgroup = 'Nitrogen cart';
    equipmentType.id = 2;
    equipmentType.group = 'Nitrogen cart';
    equipmentType.abbreviation = 'NC';

    const dummyEquipment = {
      serialNumber: 'STK0003',
      id: 'Ilias',
      type: equipmentType,
      status: EquipmentStatus.usable,
      statusDescription: null,
      longitude: 0,
      latitude: 0
    };

    spyOn(service, 'addNewEquipment').withArgs(dummyEquipment).and.callThrough();

    service.addNewEquipment(dummyEquipment);

    expect(service.addNewEquipment(dummyEquipment).subscribe((data) => {
      expect(data.serialNumber).toEqual(dummyEquipment.serialNumber);
    }));
    const req = httpTestingController.expectOne('http://localhost:8080/equipment/');
    expect(req.request.method).toEqual('POST');


    req.flush(dummyEquipment);
  });

  it('should change EquipmentStatus ', () => {
    let equipmentType: EquipmentType = new EquipmentType();
    equipmentType.subgroup = 'Nitrogen cart';
    equipmentType.id = 2;
    equipmentType.group = 'Nitrogen cart';
    equipmentType.abbreviation = 'NC';

    const dummyEquipment = {
      serialNumber: 'STK0003',
      id: 'Ilias',
      type: equipmentType,
      status: EquipmentStatus.usable,
      statusDescription: null,
      longitude: 0,
      latitude: 0
    };

    spyOn(service, 'setEquipmentStatusById').withArgs(dummyEquipment.serialNumber, EquipmentStatus.broken).and.returnValue(of(EquipmentStatus.broken)).and.callThrough();


    service.setEquipmentStatusById(dummyEquipment.serialNumber, EquipmentStatus.broken).subscribe((data) => {
      expect(data).toBe(EquipmentStatus.broken);

    });


  });
});

/**
 * Tests that check if the routing in our app works
 */


@Component({template: ''})
export class DummyComponent {

}

@Component({template: 'home'})
export class DummyHomeComponent {
}


describe('Router: App', () => {

  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
          {path: '', redirectTo: 'home', pathMatch: 'full'},
          {path: 'home', component: DummyHomeComponent},
          {path: 'dummy', component: DummyComponent}
        ]
      ), HttpClientModule, MatIconModule
      ],
      declarations: [
        DummyComponent,
        DummyHomeComponent,
        HomePageComponent,
      ]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();

  });

  /*
  Two simple tests to check whether routing works
   */
  it('navigate to "" redirects you to /home', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/home');
  }));

  it('navigate to dummy redirects you to /dummy', fakeAsync(() => {
    router.navigate(['dummy']);
    tick();
    expect(location.path()).toBe('/dummy');
  }));
});


/*
  Tests to see if the methods of the AuthenticationService works
   */

describe('Authentication', () => {

  const authServiceStub: jasmine.SpyObj<AuthenticationService> = jasmine.createSpyObj(
    'authService',
    ['signIn', 'logout'],
  );


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule
      ],
      declarations: [NavbarComponent
      ],
      providers: [{provide: AuthenticationService, useValue: authServiceStub}, {
        provide: Router,
        useClass: class {
          navigate = jasmine.createSpy('navigate');
        }
      }]

    });


  }));

  it('sign user in ', () => {
    const id = 'ilias';
    const password = '12345';
    const httpClientStub: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj(
      'http',
      ['post']
    );
    const authService = new AuthenticationService(httpClientStub);


    httpClientStub.post.and.returnValue(of());

    authService.signIn(id, password);

    expect(httpClientStub.post).toHaveBeenCalledWith('http://localhost:8080/authenticate/login', {id, password}, {observe: 'response'});


  });



});


/**
 *Testing the userservice
 */
describe('Userservice  ', () => {
  const userServiceStub: jasmine.SpyObj<UsersService> = jasmine.createSpyObj(
    'UsersService',
    ['addUser'],
  );
  let component: NavbarComponent;


  const authServiceStub: jasmine.SpyObj<AuthenticationService> = jasmine.createSpyObj(
    'authService',
    ['signIn', 'logout'],
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, MatIconModule
      ],
      declarations: [NavbarComponent
      ],
      providers: [{provide: AuthenticationService, useValue: authServiceStub}, {
        provide: Router,
        useClass: class {
          navigate = jasmine.createSpy('navigate');
        }
      }, {provide: UsersService, useValue: userServiceStub}
      ]

    });
    const routerstub: Router = TestBed.get(Router);

    component = new NavbarComponent(authServiceStub, routerstub);

  }));


  it('Userservice , check whether user can be created ', () => {
    const dummyUser: User = {
      id: 'id123',
      name: 'ilias',
      password: '123456',
      role: 'ADM',
      status: '',
      token: 'test'

    };
    const httpClientStub: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj(
      'http',
      ['post']
    );
    const userService = new UsersService(httpClientStub);

    httpClientStub.post.and.returnValue(of());

    userService.addUser(dummyUser);
    expect(httpClientStub.post).toHaveBeenCalledWith('http://localhost:8080/users', dummyUser);


  });

  it('should get the userlist', () => {
    const dummyUserList: User[] = [{
      id: 'id123',
      name: 'ilias',
      password: '123456',
      role: 'ADM',
      status: '',
      token: 'test'

    },
      {
        id: 'id12354',
        name: 'ilias2',
        password: '1234567',
        role: 'ADM',
        status: '',
        token: 'test'
      }];
    const httpClientStub: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj(
      'http',
      ['get']
    );
    const userService = new UsersService(httpClientStub);


    httpClientStub.get.and.returnValue(of(dummyUserList));

    userService.getUsers().subscribe((data)=>{
      expect(data).toEqual(dummyUserList)
    });
  expect(httpClientStub.get).toHaveBeenCalledWith('http://localhost:8080/users')
  });

});
