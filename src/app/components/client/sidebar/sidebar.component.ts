import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpService } from "src/app/services/http/http.service";
import { DataService } from "src/app/services/data/data.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  currentCommunity: String = localStorage.community;
  lat: Number;
  lng: Number;
  dark:Boolean;
  $communities: Observable<any>;

  changeCommunity(community) {
    document.getElementById("toggleCommunity").click()
    localStorage.setItem("community", community.name);
    this.currentCommunity = community.name
    this.data.Community.next(community.name);

  }
  constructor(private http: HttpService, private data: DataService) {}
  addPost(form) {
    var formData = new FormData(form);
    this.http.post("/posts", formData).subscribe(data => {
      console.log(data["result"]);
      console.log(data);
    });
  }
  makeEvent(form) {
    var formData = new FormData(form);
    formData.append(
      "location",
      JSON.stringify({ coordinates: this.data.makeEventLocation })
    );
    console.log(formData);
    this.http.post("/events", formData).subscribe(data => {
      console.log(data);
    });
  }

  darken(){
    localStorage.setItem('darkMode' , 'notNull')
    this.data.dark.next(true)
  }
  lighten(){
    localStorage.removeItem('darkMode')
    this.data.dark.next(false)
  }

  ngOnInit() {
    this.data.dark.subscribe(data => this.dark = data)
    this.data.noCommunity.subscribe(data =>
      document.getElementById("toggleCommunity").click()
    );
    this.$communities = this.http
      .get("/communities")
      .pipe(map((one: any) => one.result));
    navigator.geolocation.getCurrentPosition((data: any) => {
      this.lat = data.coords.latitude;
      this.lng = data.coords.longitude;
    });
   
  }
}
