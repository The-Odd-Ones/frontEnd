import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http/http.service";
import { DataService } from 'src/app/services/data/data.service';
declare var Snackbar: any;

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {
  constructor(private http: HttpService, private data:DataService) {}
  newData: any;
  user: any;
  fileData: any;

  ngOnInit() {
    this.data.extraDiv.next(false)
    this.http.get(`/users/${localStorage.username}`).subscribe((one: any) => {
      this.user = one.result;
      console.log(this.user);
    });
  }

  updated(form) {
    var formData = new FormData(form);

    this.http.patch(`/users/settings`, formData).subscribe(data => {
      Snackbar.show({
        text: data['msg'],
        width: "200px",
        pos: "top-center",
        actionTextColor: "#fff"
      });
    });
  }
  upload(e: any, div) {
    var input = e.target;

    if (input.files && input.files[0]) {
      div.style["background-image"] =
        "url(" + URL.createObjectURL(input.files[0]) + ")";
    }
  }
  ngOnDestroy(): void {
    this.data.extraDiv.next(true)
    
  }
}
