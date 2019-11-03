import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  corporate_leaders:Leader[];
  
  constructor(private leaderservice:LeaderService) { }

  ngOnInit() {
    this.leaderservice.getLeaders()
      .subscribe(corporate_leaders => this.corporate_leaders=corporate_leaders);
  }

}
