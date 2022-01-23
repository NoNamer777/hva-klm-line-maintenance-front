import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRunsComponent } from './my-runs.component';
import {MatButtonToggleModule, MatDialogModule} from '@angular/material';
import {AgmCoreModule} from '@agm/core';
import {ToastrModule} from 'ngx-toastr';
import {RequestsService} from "../../../services/requests.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('MyRunsComponent', () => {
  let component: MyRunsComponent;
  let fixture: ComponentFixture<MyRunsComponent>;
  let requestsService: RequestsService;
  let http: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRunsComponent ],
      imports: [
        HttpClientTestingModule,
        MatButtonToggleModule,
        AgmCoreModule,
        MatDialogModule,
        ToastrModule.forRoot({
          timeOut: 5000,
          positionClass: 'toast-top-center',
          preventDuplicates: true
        }),
      ],
      providers: [ RequestsService ]
    })
    .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MyRunsComponent);
        http = TestBed.get(HttpTestingController);
        component = fixture.componentInstance;
        requestsService = fixture.debugElement.injector.get(RequestsService);
        fixture.detectChanges();
      });
  }));

  // beforeEach(() => {
  //
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
