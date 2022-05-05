import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _title: any;
  private _body: any;
  private _displayStyle = "none";

  constructor() {
  }

  public get title(){
    return this._title
  }

  public get body(){
    return this._body
  }

  public get displayStyle(){
    return this._displayStyle
  }

  openPopup(title:string,body:string) {
    this._title = title
    this._body = body
    this._displayStyle = "block";
  }

  closePopup() {
    this._displayStyle = "none";
  }
}
