import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http/http.service";
declare var Snackbar: any;

@Component({
  selector: "app-verify",
  templateUrl: "./verify.component.html",
  styleUrls: ["./verify.component.scss"]
})
export class VerifyComponent implements OnInit {
  key: any;
  constructor(private http: HttpService) {}

  ngOnInit() {}
  verify() {
    this.http
      .post("/users/insertkey", { key: this.key })
      .subscribe((data: any) => {
        console.log(data);
        if (data.success) {
          localStorage.clear();
          location.reload();
          Snackbar.show({
            text: "you can log in now",
            pos: "top-center",
            actionTextColor: "#BF223C"
          });
        } else {
          Snackbar.show({
            text: "Key is invalid",
            pos: "top-center",
            actionTextColor: "#BF223C"
          });
        }
      });
  }
}
