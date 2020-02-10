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

}
