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

  onScroll(target){
    if(target.scrollTop / target.scrollHeight > 0.5 && !this.data.fetching && !this.data.done){
        this.data.scrolled.next(location.href)
        this.data.fetching = true

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
    this.http.get('/users/profile').subscribe(data =>{
      this.user = data['result']
    })
    
  }
}
