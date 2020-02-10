import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpService } from "src/app/services/http/http.service";
import { Router } from "@angular/router";
import { ValidateService } from "src/app/services/validate/validate.service";
declare var Snackbar: any;
@Component({
  selector: "app-entrance",
  templateUrl: "./entrance.component.html",
  styleUrls: ["./entrance.component.scss"]
})
export class EntranceComponent implements OnInit {
  constructor(
    private http: HttpService,
    private router: Router,
    private validateService: ValidateService  ) {}
  submitSignInForm(form: NgForm) {
    this.http.post("/users/authenticate", form.value).subscribe((data: any) => {
      console.log(data);
      if (data["success"]) {
        localStorage.setItem("token", data["token"]);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("id", data.user._id);
        location.reload();
      } else {
        Snackbar.show({
          text: data.msg,
          pos: "top-center",
          actionTextColor: "#BF223C"
        });
      }
    });
  }

  submitSignUpForm(form: NgForm) {
    if (!this.validateService.validateRegister(form.value)) {
      Snackbar.show({
        text: "Please fill all fields",
        width: "200px",
        pos: "top-center",
        actionTextColor: "#BF223C"
      });
      return false;
    }
    if (!this.validateService.validateEmail(form.value.email)) {
      Snackbar.show({
        text: "Please insert valid email",
        width: "200px",
        pos: "top-center",
        actionTextColor: "#BF223C"
      });
      return false;
    }
    this.http.post("/users/register", form.value).subscribe((data: any) => {
      console.log(form.value);
      if (!data.success) {
        console.log(data);
        Snackbar.show({
          text: data.msg,
          pos: "top-center"
        });
      } else {
        this.submitSignInForm(form);
      }
    });
  }

  ngOnInit() {}
}
