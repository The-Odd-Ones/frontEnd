import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { of } from "rxjs";
import { SearchService } from "src/app/services/search.service";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  results: any;
  queryField: FormControl = new FormControl();
  constructor(private searchService: SearchService) {}

  ngOnInit() {
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
          // var inputValue = ((<HTMLInputElement>(
          //   document.getElementById("keyword")
          // )).value = "");
        } else {
          return;
        }
      });
  }
}
