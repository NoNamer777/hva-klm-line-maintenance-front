import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Request, RequestStatus} from '../../../models/request';
import {RequestsService} from '../../../services/requests.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-delivery-confirmation',
  templateUrl: './delivery-confirmation.component.html',
  styleUrls: ['./delivery-confirmation.component.css']
})
export class DeliveryConfirmationComponent implements OnInit {
  request: Request;
  timeDelivered: Date;
  timeDeliveredForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Request,
    private requestsService: RequestsService,
    private dialogRef: MatDialogRef<DeliveryConfirmationComponent>,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.request = this.data;
    this.timeDelivered = new Date(Date.now());

    this.timeDeliveredForm = new FormGroup({
      hour: new FormControl(this.timeDelivered.getHours(),[Validators.required, Validators.min(0), Validators.max(23)]),
      minute: new FormControl(this.timeDelivered.getMinutes(),[Validators.required, Validators.min(0), Validators.max(59)])
    });
  }

  onConfirmDelivery() {
    if (this.timeDeliveredForm.valid && this.request.status == RequestStatus.inProgress) {
      this.requestsService.setRequestAsDelivered(this.request.id)
        .subscribe(
          res => {
          this.toast.success("Equipment " + this.request.equipment.id + " successfully delivered!");
          this.dialogRef.close();
        },
          error => {
          this.toast.error("Something went wrong, please try again!")
          });
    }
  }

  onCancelConfirmation() {
    this.dialogRef.close();
  }

}
