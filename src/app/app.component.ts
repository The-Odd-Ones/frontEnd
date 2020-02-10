import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { DataService } from './services/data/data.service';


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None
})


export class AppComponent implements OnInit {
  

  ngOnInit() {
    
    
    this.data.dark.subscribe(data => {
      if(data){
        var newStyle = document.createElement("link");
        newStyle.setAttribute('href',"assets/css.css")
        newStyle.setAttribute('rel',"stylesheet")
        document.getElementById('link').appendChild(newStyle)
        
      }else{
        var child = document.getElementById("link").firstChild
        if(child) document.getElementById("link").removeChild(child)
        
   }
})
  }

  constructor(private data: DataService) {}

    

  title = "web-frontEnd";
}
