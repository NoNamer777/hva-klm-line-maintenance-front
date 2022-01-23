import {Injectable} from '@angular/core';
import {Run} from '../models/run';
import {Observable, of} from 'rxjs';
import {RequestsService} from './requests.service';
import {Request, RequestStatus} from '../models/request';
import {Equipment} from '../models/equipment';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RunsService {
  runs: Run[] = [];

  constructor(private requestsService: RequestsService, private http: HttpClient) { }

  addRun(requestId: string, equipment: Equipment) {
    /**
     * @randomRunId is temporary until database is set
     */
    console.log(requestId);
    // this.requestsService.getRequestById(requestId)
    //   .subscribe(request => {
    //     this.requestsService.setRequestStatus(request, RequestStatus.accepted);
    //     var randomRunId = Math.floor((Math.random()) * 1000);
    //     var newRun = new Run(('RUN' + randomRunId), 'RNR15547' , request, equipment);
    //     this.runs.push(newRun);
    //   });
  }

  getRuns(): Observable<Run[]> {
    return of(this.runs);
  }

  getOpenRuns(): Observable<Run[]> {
    var openRuns: Run[] = [];

    this.runs.forEach(run => {
      if (run.closedDate == null) {
        return openRuns.push(run);
      }
    });
    return of(openRuns);
  }

  cancelRun(canceledRun: Run, canceledDate: Date) {
    canceledRun.closedDate = canceledDate;
  }

  closeRun(closedRun: Run, closedDate: Date) {
    closedRun.closedDate = closedDate;
    // this.requestsService.setRequestStatus(closedRun.request, RequestStatus.closed);
  }
}
