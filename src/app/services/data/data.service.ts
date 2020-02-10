import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  extraDiv:Subject<boolean> = new Subject()
  dark: BehaviorSubject<any> = new BehaviorSubject(!!localStorage.getItem("darkMode"))
  noCommunity:Subject<any>= new Subject()
  makeEventLocation:Array<Number> = [];
  Community:BehaviorSubject<any> = new BehaviorSubject(localStorage.getItem("community"))
  constructor() {
    
  }
}
