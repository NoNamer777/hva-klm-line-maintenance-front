import {Component, OnDestroy, OnInit} from '@angular/core';
import {RequestsService} from '../../../services/requests.service';
import {Subscription} from 'rxjs';
import {Request, RequestStatus} from '../../../models/request';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-current-requests',
  templateUrl: './current-requests.component.html',
  styleUrls: ['./current-requests.component.css']
})
export class CurrentRequestsComponent implements OnInit, OnDestroy {
  requests: Request[];
  selfPickups: Request[] = [];
  requestsSub: Subscription;

  schipholLat = environment.schipholLat;
  schipholLong = environment.schipholLong;

  constructor(
    private requestsService: RequestsService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.getOpenRequests();
    this.getSelfPickupRequests();
  }

  getOpenRequests() {
    this.requestsSub = this.requestsService.getUserRequestsByStatus(RequestStatus.open)
      .subscribe(
        requests => {
          this.requests = requests;
        },
        (error) => {
          this.toast.error("Something went wrong loading requests");
          console.log(error);
        }
      );
  }

  getSelfPickupRequests() {
    this.requestsService.getSelfEquipmentPickupList()
      .subscribe(
        requests => {
          this.selfPickups = [];
          requests.forEach(r => {
            if (r.status != RequestStatus.canceled && r.status != RequestStatus.closed) {
              this.selfPickups.push(r);
            }
          })
        },
        error => {
          this.toast.error("Something went wrong loading requests");
        }
      )
  }

  onCancelRequest(requestId: string) {
    this.requestsService.cancelRequest(requestId)
      .subscribe(
        res => {
          this.toast.info("Request "+ requestId + " was canceled!");
          this.getOpenRequests();
          this.getSelfPickupRequests();
        },
        error => {
          this.toast.error("Something went wrong canceling request " + requestId);
        }
      );
  }

  onFilterRequestList(filter) {
    this.requestsSub = this.requestsService.getUserRequestsByStatus(filter)
      .subscribe(
        requests => {
          this.requests = requests;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onRequestPickUp(requestId: string) {
    this.requestsService.requestPickUp(requestId)
      .subscribe(
        res => {
          this.toast.success("Pick up request has been send");
        },
        error => {
          this.toast.error("Something went wrong requesting pick up");
        }
      )
  }


  onSelfPickUpClicked(event) {
    let requestMapContainer = document.getElementById(event.currentTarget.id).getElementsByClassName('request-map-container')[0];
    let equipmentLocationMap = document.getElementById(event.currentTarget.id).getElementsByTagName('agm-map')[0];

    requestMapContainer.classList.toggle('show-map-container');
    equipmentLocationMap.classList.toggle('show-location-map');
  }

  onCloseSelfPickUp(requestId: string) {
    this.requestsService.closeSelfEquipmentPickUp(requestId)
      .subscribe(
        res => {
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
  }

  ngOnDestroy(): void {
    this.requestsSub.unsubscribe();
  }
}
