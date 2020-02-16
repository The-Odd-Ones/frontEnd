import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http/http.service";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { DataService } from "src/app/services/data/data.service";

@Component({
  selector: "app-community",
  templateUrl: "./community.component.html",
  styleUrls: ["./community.component.scss"]
})
export class CommunityComponent implements OnInit {
  constructor(private http: HttpService, private data: DataService) {}
  $communities: Observable<Array<Object>>;
  ngOnInit() {
    this.$communities = this.http
      .get("/communities")
      .pipe(map((one: any) => one.result));
  }
  changeCommunity(community) {
    localStorage.setItem("community", community.name);

    this.data.Community.next(community.name);
    location.reload();
  }
}
