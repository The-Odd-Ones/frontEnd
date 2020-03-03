import { Component, OnInit, Input } from "@angular/core";
import { HttpService } from 'src/app/services/http/http.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.scss"]
})
export class EventsComponent implements OnInit {
  @Input() events = []
  constructor(private http: HttpService,private data : DataService) {}
  hover:String = null;
  user:any;
  enroll(event){
    this.http.get(`/events/${event._id}/enrollment`).subscribe(data => {
      if(data['success']){
        if(data['created']){
          event.isEnrolled = true; 
          event.enrollsCount++
        } 
        if(data['removed']){
          event.isEnrolled = false; 
          event.enrollsCount--
    
        } 
    
      } 
    })
  }

  ngOnInit() {
    this.http.get("/users/profile").subscribe((data: any) => {
      if (data.success) {
        this.user = data.result;
        
      }
    });
    this.data.eventPusher.subscribe((data:Object)=>{
      if(/home/.test(location.href) || /profile/.test(location.href)){
        this.events.unshift(data)
      }

    })
    
  }
}
