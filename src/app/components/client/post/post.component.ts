import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpService } from 'src/app/services/http/http.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"]
})
export class PostComponent implements OnInit {

  post:any;
  commentContent:String= "";
  comment(){
    if(this.commentContent){
      this.http.post(`/posts/${this.post._id}/comment` , {content : this.commentContent}).subscribe((data:any) =>{
        this.post.comments.unshift(data.result)
        this.post.commentsCount++
        this.commentContent = ''
      })

    }
  }
  reply(comment){
    console.log(comment.commentContent)
    if(comment.commentContent){
      this.http.post(`/comments/${comment._id}/reply` , {content : comment.commentContent}).subscribe((data:any) =>{
       console.log('tell me why', data)
        if(!comment.comments) comment.comments = []
        comment.comments.unshift(data.result)
        comment.commentsCount++
        comment.commentContent = ''
      })

    }
  }
  moreComments(){
    this.http.get(`/posts/${this.post._id}/comments`, `?skip=${this.post.comments.length}`).subscribe((data:any) =>{
      this.post.comments = [ ...this.post.comments,...data.result ]
    })
  }
  moreReplies(comment){
    if(!comment.comments) comment.comments = []
    this.http.get(`/comments/${comment._id}/replies`, `?skip=${comment.comments.length}`).subscribe((data:any) =>{
      comment.comments = [ ...comment.comments,...data.result ]
    })
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpService
  ) {}
 
  like(){
    this.http.get(`/posts/${this.post._id}/like`).subscribe(data =>{
      if(data['success']){
        if(data['created']){
          this.post.isLiked = true; 
          this.post.likesCount++
        } 
        if(data['removed']){
          this.post.isLiked = false; 
          this.post.likesCount--
    
        } 
    
      } 
    })
    }
    likeComment(comment){
      this.http.get(`/comments/${comment._id}/like`).subscribe(data =>{
        if(data['success']){
          if(data['created']){
            comment.isLiked = true; 
            comment.likesCount++
          } 
          if(data['removed']){
            comment.isLiked = false; 
            comment.likesCount--
      
          } 
      
        } 
      })
      }
    share(form:NgForm){
      // console.log(this.postToShare, form.value)
      // this.http.post(`/posts/${this.postToShare._id}/share`, form.value).subscribe(data =>{
      //   console.log(data)
      // })
      }


  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.http.get(`/posts/${param["id"]}`).subscribe((data:any)=>{
        let post = data.result
        if(post.file){
          if(/video\/upload/.test(post.file)){
            post.isVideo = true
          }
        }
        this.post = post
        console.log(this.post)

      })


      // this.singlePost.post_id = param["post_id"];
    });

    // would be replaced by get post by id when the backend is ready
    // this.http.get(this._url).subscribe(data => {
    //   this.post = data;
    //   console.log("daaaaaaaaaa", this.post._user.username);
    // });
  }
}
