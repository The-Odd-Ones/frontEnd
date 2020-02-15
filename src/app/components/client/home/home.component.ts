import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  constructor(private http : HttpService,private data:DataService) { }

  posts:any = []
  $events :Observable<any>
  status:String = "posts";


  getPosts(){
    this.http.get('/posts', `?page=${this.posts.length}`).subscribe((data:any) => {
      if(data.noCommunity){
        this.data.noCommunity.next()
        return null

      }else {
        data.posts.map(post =>{ 
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
        this.posts = [...this.posts, ...data.posts]
        this.data.fetching = false
        if(!data.posts.length) this.data.done = true

      } 
    })
  }


  ngOnInit() {
    this.data.postPusher.subscribe((data:Object)=>{
      if(/home/.test(location.href)){
        this.posts.unshift(data)
      }

    })
    this.data.scrolled.subscribe(data =>{
      if(/home/.test(data)){
        this.getPosts()
      }
    })
    this.data.Community.subscribe(community=>{
      this.data.done = false
      this.posts = []
      navigator.geolocation.getCurrentPosition((data: any) => {
        if(data){
          this.$events = this.http.post('/events/nearby', {coordinates: [data.coords.latitude,data.coords.longitude]}).pipe(map((one:any) => {
            return one.result
          }))
        }else {
          this.$events = this.http.get('/events').pipe(map((one:any) => {
            return one.result
          }))

        }
    
      });
      this.getPosts()
    })
    // this.$posts = this.http.get('/posts')
  }
  ngOnDestroy(): void {
    this.data.done = false
  }
}
