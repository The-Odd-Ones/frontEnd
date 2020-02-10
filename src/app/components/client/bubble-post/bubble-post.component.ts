import { Component, OnInit, Input } from '@angular/core';
import { SafePipe } from 'src/app/pipes/safe.pipe';

@Component({
  selector: 'app-bubble-post',
  templateUrl: './bubble-post.component.html',
  styleUrls: ['./bubble-post.component.scss']
})
export class BubblePostComponent implements OnInit {

  constructor(public safe: SafePipe) { }
  @Input() post: any;
  ngOnInit() {
  }

}
