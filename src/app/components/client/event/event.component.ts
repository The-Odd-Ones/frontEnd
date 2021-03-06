import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { EventsComponent } from "../events/events.component";
import { HttpService } from "src/app/services/http/http.service";
import { DataService } from "src/app/services/data/data.service";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.scss"]
})
export class EventComponent implements OnInit {
  event: any;
  posts: any = [];
  postsState: boolean = false;
  user: any;
  friends: any;
  id: any;
  hover: String = null;
  enroll() {
    this.http.get(`/events/${this.event._id}/enrollment`).subscribe(data => {
      if (data["success"]) {
        if (data["created"]) {
          this.event.isEnrolled = true;
          this.event.enrollsCount++;
        }
        if (data["removed"]) {
          this.event.isEnrolled = false;
          this.event.enrollsCount--;
        }
      }
    });
  }
  upload(e: any, img) {
    var input = e.target;

    if (input.files && input.files[0]) {
      if (img) img.src = `${URL.createObjectURL(input.files[0])}`;
    }
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpService,
    private data: DataService,
    private router : Router
  ) {}

  addPost(form, div) {
    var formData = new FormData(form);
    this.http
      .post(`/events/${this.event._id}/posts`, formData)
      .subscribe((data: any) => {
        if (data.success) {
          this.posts.unshift(data.result);
          div.click();
          form.reset();
          var inputVxalue = ((<HTMLInputElement>(
            document.getElementById("image")
          )).src = "");
        }
      });
  }

  like() {
    this.http.get(`/events/${this.event._id}/like`).subscribe(data => {
      console.log(data);

      if (data["success"]) {
        if (data["created"]) {
          this.event.isLiked = true;
          this.event.likesCount++;
          if (this.event.isDisliked) {
            this.event.isDisliked = false;
            this.event.dislikesCount--;
          }
        }
        if (data["removed"]) {
          this.event.isLiked = false;
          this.event.likesCount--;
        }
      }
    });
  }
  dislike() {
    this.http.get(`/events/${this.event._id}/dislike`).subscribe(data => {
      console.log(data);
      if (data["success"]) {
        if (data["created"]) {
          this.event.isDisliked = true;
          this.event.dislikesCount++;
          if (this.event.isLiked) {
            this.event.isLiked = false;
            this.event.likesCount--;
          }
        }
        if (data["removed"]) {
          this.event.isDisliked = false;
          this.event.dislikesCount--;
        }
      }
    });
  }
  invitations: Object = {};
  change(ele) {
    if (this.invitations[ele]) delete this.invitations[ele];
    else this.invitations[ele] = true;
  }
  invite() {
    let invite = Object.keys(this.invitations);
    this.http
      .post(`/events/${this.event._id}/invite`, { invite })
      .subscribe(data => console.log(data));
  }
  ngOnInit() {
    this.data.scrolled.subscribe(data => {
      if (/events/.test(data)) {
        this.getPosts(this.id);
      }
    });
    this.http.get("/users/profile").subscribe((data: any) => {
      if (data.success) {
        this.user = data.result;
        this.http.get("/users/friends").subscribe((data: any) => {
          if (data.success) this.friends = data.result;

          // this.event = data["result"];
        });
      }
    });
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.http.get(`/events/${params.id}`).subscribe(data => {
        if(data["success"]){
          this.event = data["result"];

        }else this.router.navigate(['404'])
      });
      this.getPosts(this.id);
    });
  }

  getPosts(id) {
    this.http
      .get(`/events/${id}/posts`, `?page=${this.posts.length}`)
      .subscribe((data: any) => {
        if (data.noCommunity) {
          this.data.noCommunity.next();
          return null;
        } else {
          data.result.map(post => {
            if (post.file) {
              if (/video\/upload/.test(post.file)) {
                post.isVideo = true;
              }
            } else if (post.sharedpost) {
              if (post.sharedpost.file) {
                if (/video\/upload/.test(post.sharedpost.file)) {
                  post.sharedpost.isVideo = true;
                }
              }
            }
            return post;
          });
          this.posts = [...this.posts, ...data.result];
          this.data.fetching = false;
          if (!data.result.length) this.data.done = true;
        }
      });
  }

 
  removeEvent(){
    this.http.delete(`/events/${this.event._id}`).subscribe(data =>{
      console.log(data)
      if(data['success']){
      this.router.navigate([''])
      } 
    })  
  }

}
