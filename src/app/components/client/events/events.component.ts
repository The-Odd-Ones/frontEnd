import { Component, OnInit, Input } from "@angular/core";
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.scss"]
})
export class EventsComponent implements OnInit {
  @Input() events;
  constructor(private http: HttpService) {}
  hover:String = null;
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

  }
}
