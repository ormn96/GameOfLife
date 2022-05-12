import { Injectable } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {EMPTY} from "rxjs";
import {ToaserService} from "../toaster/toaser.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toaster:ToaserService) { }
  public handelError = this._handleError.bind(this)

  private _handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      this.toaster.show('error in http request',error.error)
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      this.toaster.show('error in http request',error.error)
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return EMPTY
    // Return an observable with a user-facing error message.
    // return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
