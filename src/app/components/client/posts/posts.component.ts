import { Component, OnInit, Output, Input } from "@angular/core";
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { HttpService } from 'src/app/services/http/http.service';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data/data.service';



@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"]
})
export class PostsComponent implements OnInit {

  fetching:Boolean = false;
  done:Boolean = false;
  onScroll(target){
    if(target.scrollTop / target.scrollHeight > 0.5 && !this.fetching && !this.done){
      if(/home/.test(location.href)){
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
            this.fetching = false
            if(!data.posts.length) this.done = true
  
          } 
        })
      }
      this.fetching = true
      this.http.get('')

    }
  }

  imageClick(modal,url, modalImg){

  modal.style.display = "block";
  modalImg.src = url;
  
}
closeModal(modal){
  
    modal.style.display = "none";
  }

like(post){
this.http.get(`/posts/${post._id}/like`).subscribe(data =>{
  if(data['success']){
    if(data['created']){
      post.isLiked = true; 
      post.likesCount++
    } 
    if(data['removed']){
      post.isLiked = false; 
      post.likesCount--

    } 

  } 
})
}
postToShare;
share(form:NgForm){
  // console.log(this.postToShare, form.value)
  this.http.post(`/posts/${this.postToShare._id}/share`, form.value).subscribe(data =>{
    if(data['success']){
      this.data.postPusher.next(data['result'])
    }
  })
  }
  toBeRemoved:any;
  toBeRemovedIndex:any;

  remove(){
    this.http.get(`/posts/${this.toBeRemoved._id}/remove`).subscribe(data =>{
      console.log(data)
      if(data['success']){
        this.posts.splice(this.toBeRemovedIndex,1)
      } 
    })  }
  constructor(private http: HttpService, public safe: SafePipe,private data:DataService) {}
  private _url: string = "../../../assets/data/posts.json";
  @Input() public posts:Array<Object> =[];
  @Input() public bubble:Boolean;
  user: any;

  ngOnInit() {
    console.log(this.posts.length)
    this.http.get('/users/profile').subscribe(data =>{
      this.user = data['result']
    })
    this.data.postPusher.subscribe((data:Object)=>{
      if(/home/.test(location.href) || /profile/.test(location.href)){
        this.posts.unshift(data)
      }

    })
  }
}
