import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {

  constructor(private http : HttpService, private data : DataService) { }
  $users:Observable<any>;
  ngOnInit() {
    this.data.Community.subscribe(data => {
      this.$users = this.http.get('/users/recommendations')
      
    })
  }
  disappear:Object={};
  follow(users, i) {
    this.http.get(`/users/${users[i]._id}/follow`).subscribe((data: any) => {
      if(data.success){
        this.disappear[i] = true
        users[i].followedByYou = true 
        setTimeout(()=>{
        if(this.disappear[i]){
          users.splice(i,1)
        }
        delete this.disappear[i]
        }, 2000)
        
      } 
    });
  }

  unfollow(users,i) {
    this.http.get(`/users/${users[i]._id}/unfollow`).subscribe((data: any) => {
      if(data.success){
        users[i].followedByYou = false;
        this.disappear[i] = false

      }
    });
  }

}
