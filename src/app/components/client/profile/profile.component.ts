import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http/http.service";
import { DataService } from "src/app/services/data/data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  constructor(
    private http: HttpService,
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  public posts: any = [];
  public followers: any = [];
  public followings: any = [];

  status: String = "posts";
  profile: Boolean;
  username: String;
  $user: Observable<Object>;
  currentUser:any;

  ngOnInit() {
    this.data.extraDiv.next(false)
    this.http.get('/users/profile').subscribe((data:any) =>{
       this.currentUser = data.result
       this.activatedRoute.params.subscribe(data => {
         this.profile = !data["username"];
         this.username = this.profile ? this.currentUser.username : data["username"];
         if (data["username"] === this.currentUser.username) {
           this.router.navigate(["profile"]);
         }
         this.data.Community.subscribe(data => {
           this.$user = this.http.get(`/users/${this.username}`).pipe(
             map((one: any) => {
               console.log(one);
   
               this.http.get(`/users/${one.result._id}/posts`).subscribe(data => {
                   this.posts = data['result']
               });
   
               return one["result"];
             })
           );
         });
       });
      
      })
  }


  ngOnDestroy(): void {
    this.data.extraDiv.next(true)
    
  }

  getFollowers(id) {
    this.status = "followers";
    this.http.get(`/users/${id}/followers`).subscribe((followers: any) => {
      console.log(followers);
      this.followers = followers.result;
    });
  }

  getFollowings(id) {
    this.status = "following";
    this.http.get(`/users/${id}/followings`).subscribe((followings: any) => {
      this.followings = followings.result;
      console.log(followings);
    });
  }

  follow(user, pageUser) {
    this.http.get(`/users/${user._id}/follow`).subscribe((data: any) => {
      if(this.profile){
        pageUser.followingsCount++;
        user.followedByYou = true;
      }else{
        user.followedByYou = true;
        user.followersCount++;

      }
    });
  }
  unfollow(user,pageUser) {
    this.http.get(`/users/${user._id}/unfollow`).subscribe((data: any) => {
      
      if(this.profile){
        pageUser.followingsCount--;
        user.followedByYou = false;
        console.log(user)
      }else{
        user.followedByYou = false;
        user.followersCount--;

      }

    });
  }
}
