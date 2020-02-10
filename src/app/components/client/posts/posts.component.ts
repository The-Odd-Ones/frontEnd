import { Component, OnInit, Output, Input } from "@angular/core";
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { HttpService } from 'src/app/services/http/http.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"]
})
export class PostsComponent implements OnInit {


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
    console.log(data)
  })
  }

  constructor(private http: HttpService, public safe: SafePipe) {}
  private _url: string = "../../../assets/data/posts.json";
  @Input() public posts;
  @Input() public bubble:Boolean;

  ngOnInit() {
    console.log(this.posts)
  }
}
