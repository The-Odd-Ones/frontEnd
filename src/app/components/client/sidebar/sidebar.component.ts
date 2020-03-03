import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpService } from "src/app/services/http/http.service";
import { DataService } from "src/app/services/data/data.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { __await } from "tslib";
declare var Snackbar: any;

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  currentCommunity: String = localStorage.community;
  lat: Number;
  lng: Number;
  dark: Boolean;
  date: Date = new Date();
  $communities: Observable<any>;

  changeCommunity(community) {
    document.getElementById("toggleCommunity").click();
    localStorage.setItem("community", community.name);
    this.currentCommunity = community.name;
    this.data.Community.next(community.name);
  }
  constructor(private http: HttpService, private data: DataService) {}
  addPost(form, div) {
    var formData = new FormData(form);
    this.http.post("/posts", formData).subscribe((data: any) => {
      console.log(data);
      if (data.success) {
          if(/video\/upload/.test(data.result.file)){
            data.result.isVideo = true
          }
        
        this.data.postPusher.next(data.result);

        div.click();

        form.reset();
        var inputVxalue = ((<HTMLInputElement>(
          document.getElementById("image")
        )).src = "");
      } else {
        Snackbar.show({
          text: "write something",
          width: "200px",
          pos: "top-center",
          actionTextColor: "#BF223C"
        });
      }
    });
  }
  makeEvent(form, div) {
    console.log("before request");
    var formData = new FormData(form);
    console.log(formData);
    formData.append(
      "location",
      JSON.stringify({ coordinates: this.data.makeEventLocation })
    );

    this.http.post("/events", formData).subscribe((data: any) => {
      console.log(data);
      if (data.success) {
        this.data.eventPusher.next(data.result);

        div.click();
        form.reset();
        (<HTMLElement>document.querySelector(".main__avatar")).style[
          "background-image"
        ] =
          "https://www.belfercenter.org/themes/belfer/images/event-default-img-med.png";
      } else {
        Snackbar.show({
          text: "fill all information about the event",
          width: "200px",
          pos: "top-center",
          actionTextColor: "#BF223C"
        });
      }
    });
  }

  darken() {
    localStorage.setItem("darkMode", "notNull");
    this.data.dark.next(true);
  }
  lighten() {
    localStorage.removeItem("darkMode");
    this.data.dark.next(false);
  }

  ngOnInit() {
    this.data.dark.subscribe(data => (this.dark = data));
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
  upload(e: any, img, div) {
    var input = e.target;
    
    if (input.files && input.files[0]) {
      let isVideo = /mp4|mkv|avi/.test(input.files[0].name)
      if (img && !isVideo) img.src = `${URL.createObjectURL(input.files[0])}`;
      // if (vid && isVideo) vid.forEach(one => {
      //   one.src = `${URL.createObjectURL(input.files[0])}` 
      //   console.log(one.src)

      // })

      if (div)
        div.style["background-image"] = `url(${URL.createObjectURL(
          input.files[0]
        )})`;
    }
  }
}
