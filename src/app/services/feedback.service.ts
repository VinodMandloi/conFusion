import { Injectable,NgModule } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Feedback } from '../shared/feedback';
import { Observable } from 'rxjs';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Leader } from '../shared/leader';
import { baseURL } from '../shared/baseurl';
import { catchError } from 'rxjs/operators';
//import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
  
    putFeedback(feedback: Feedback): Observable<Feedback> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      // return this.http.put<Feedback>(baseURL + 'feedback', feedback, httpOptions)
      //   .pipe(catchError(this.processHTTPMsgService.handleError));
        return this.http.post<Feedback>("http://localhost:3000/feedback", feedback, httpOptions)
        .pipe(catchError(this.processHTTPMsgService.handleError));
  
    }
}

