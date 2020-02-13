import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { EventsComponent } from "../events/events.component";
import { HttpService } from "src/app/services/http/http.service";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.scss"]
})
export class EventComponent implements OnInit {
  event: any;
  posts: any= [];
  postsState:boolean = false;
  user:any;
  friends:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpService
  ) {}

  addPost(form) {
    var formData = new FormData(form);
    this.http.post(`/events/${this.event._id}/posts`, formData).subscribe((data:any) => {
      if(data.success){
        this.posts.unshift(data.result)
        form.reset()

      }
    });
  }

  like(){
    this.http.get(`/events/${this.event._id}/like`).subscribe(data =>{
      console.log(data)

      if(data['success']){
        if(data['created']){
          this.event.isLiked = true; 
          this.event.likesCount++
          if(this.event.isDisliked){
            this.event.isDisliked = false; 
            this.event.dislikesCount--
          }
        } 
        if(data['removed']){
          this.event.isLiked = false; 
          this.event.likesCount--
    
        } 
    
      } 
    })
    }
  dislike(){
    this.http.get(`/events/${this.event._id}/dislike`).subscribe(data =>{
      console.log(data)
      if(data['success']){
        if(data['created']){
          this.event.isDisliked = true; 
          this.event.dislikesCount++
          if(this.event.isLiked){
            this.event.isLiked = false; 
            this.event.likesCount--
          }
        } 
        if(data['removed']){
          this.event.isDisliked = false; 
          this.event.dislikesCount--
    
        } 
    
      } 
    })
  }
  invitations:Object = {};
  change(ele){
    if(this.invitations[ele]) delete this.invitations[ele]
    else this.invitations[ele] = true
  }
  invite(){
    let invite = Object.keys(this.invitations)
    this.http.post(`/events/${this.event._id}/invite`, {invite}).subscribe(data => console.log(data))
  }
  ngOnInit() {
    this.http.get('/users/profile').subscribe((data:any) => {
      if(data.success){
        this.user = data.result
        this.http.get('/users/friends').subscribe((data: any) => {
          if(data.success) this.friends = data.result

          // this.event = data["result"];
        });
      }
    });
    this.activatedRoute.params.subscribe((params: Params) => {
      this.http.get(`/events/${params.id}`).subscribe(data => {
        console.log(data["result"])
        this.event = data["result"];
      });
      this.http
        .get(`/events/${params.id}/posts`)
        .subscribe(data => {
          this.posts = data["result"];
        });
    });
  }
}
