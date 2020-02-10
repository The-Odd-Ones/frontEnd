import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from "src/app/services/data/data.service";
import { Observable } from "rxjs";
import { HttpService } from 'src/app/services/http/http.service';
import { FormControl } from "@angular/forms";
import { of } from "rxjs";
import { SearchService } from "src/app/services/search.service";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
@Component({
  selector: "app-client-nav",
  templateUrl: "./client-nav.component.html",
  styleUrls: ["./client-nav.component.scss"]
})
export class ClientNavComponent implements OnInit {
  logout() {
    localStorage.clear();
    this.router.navigate([""]);
  }

  $Community: Observable<any>;
  extraDiv:Boolean = true;
  notifications:Array<Object> = [];
 
  results: any[] = [];
  queryField: FormControl = new FormControl();
  constructor(
    private searchService: SearchService,
    private router: Router, private data: DataService, private http:HttpService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.http.get('/notifications').subscribe(data =>{
      this.notifications = data['result']
      console.log(this.notifications)
    })
    this.data.extraDiv.subscribe(bool => {
      this.extraDiv = bool
    })
    this.data.Community.subscribe(data =>{
      this.http.get('/communities/check').subscribe((data:any) => {
        if(data.success){
          this.$Community = this.data.Community
        }else{
          this.data.noCommunity.next()
        }
      })

    })
    this.queryField.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(query => {
          if (query) return this.searchService.search(query);
          return of([]);
        })
      )
      .subscribe(queryField => {
        if (queryField) {
          console.log(queryField);
          this.results = queryField["results"];
        } else {
          return;
        }
      });
  }
}







