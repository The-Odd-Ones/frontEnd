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
  id : any;
  currentUser:any;
  getPosts(id){
    this.http.get(`/users/${id}/posts`, `?page=${this.posts.length}`).subscribe((data:any) => {
      if(data.noCommunity){
        this.data.noCommunity.next()
        return null

      }else {
        data.result.map(post =>{ 
          if(post.file){
            if(/video\/upload/.test(post.file)){
              post.isVideo = true
            }
          }else if(post.sharedpost){
            if(post.sharedpost.file){
              if(/video\/upload/.test(post.sharedpost.file)){
                post.sharedpost.isVideo = true
              }
            }
          }
          return post
        })
        this.posts = [...this.posts, ...data.result]
        this.data.fetching = false
        if(!data.result.length) this.data.done = true

      } 
    })
  }
  ngOnInit() {

    this.data.postPusher.subscribe((data:Object)=>{
      if(/profile/.test(location.href)){
        this.posts.unshift(data)
      }

    })
    this.data.scrolled.subscribe(data =>{
        this.getPosts(this.id)
    })

    this.data.extraDiv.next(false)
    this.http.get('/users/profile').subscribe((data:any) =>{
       this.currentUser = data.result
       this.activatedRoute.params.subscribe(data => {
         this.profile = !data["username"];
         this.username = this.profile ? this.currentUser.username : data["username"];
         if (data["username"] === this.currentUser.username) {
           this.router.navigate(["profile"], {replaceUrl:true});
         }
         this.data.Community.subscribe(data => {
         this.posts = []
         this.data.done = false
         this.$user = this.http.get(`/users/${this.username}`).pipe(
          map((one: any) => {
            this.id = one.result._id 
            this.getPosts(this.id)
            return one["result"];
          })
        );
          
        });       });
      
      })
  }


  ngOnDestroy(): void {
    this.data.extraDiv.next(true)
    this.data.done = false
    
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
