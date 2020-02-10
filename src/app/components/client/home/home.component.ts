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

  $posts:Observable<any>;
  $events :Observable<any>
  status:String = "posts";
  ngOnInit() {
    
    this.data.Community.subscribe(community=>{
      this.$events = this.http.get('/events').pipe(map((one:any) => {
        console.log(one)
        return one.result
      }))
      this.$posts = this.http.get('/posts').pipe(map((data:any) => {
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
          return data.posts

        } 
      }))
    })
    // this.$posts = this.http.get('/posts')
  }
}
