import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from 'src/app/services/http/http.service';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"]
})
export class PostComponent implements OnInit {

  post:any;
  user:any;
  commentContent:String= "";
  communitySubscription:Subscription;
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
    private http: HttpService,
    private data : DataService,
    private router:Router
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
      toBeRemoved;
      toBeRemovedIndex;
      remove(){
        this.http.get(`/comments/${this.toBeRemoved._id}/remove`).subscribe(data =>{
          console.log(data)
          if(data['success']){
            this.post.comments.splice(this.toBeRemovedIndex,1)
            this.post.commentsCount--
          } 
        })  
      }


  ngOnInit() {
    this.http.get('/users/profile').subscribe(data =>{
      this.user = data['result']
    })
    this.communitySubscription = this.data.Community.subscribe(data => {
      console.log('Im jerk still listening')
      this.activatedRoute.params.subscribe(param => {
        this.http.get(`/posts/${param["id"]}`).subscribe((data:any)=>{
          if(data.result){
            let post = data.result
            if(post.file){
              if(/video\/upload/.test(post.file)){
                post.isVideo = true
              }
            }
            this.post = post
          }else this.router.navigate(['404'])
  
        })
  
  
        // this.singlePost.post_id = param["post_id"];
      });

    })

  }
  ngOnDestroy(): void {
    this.communitySubscription.unsubscribe()
    
  }
}
