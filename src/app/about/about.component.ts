import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut,expand } from '../animations/app-animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class AboutComponent implements OnInit {

  corporate_leaders:Leader[];
  
  constructor(private leaderservice:LeaderService,
    @Inject('baseURL') public baseURL: string) { }

  ngOnInit() {
    this.leaderservice.getLeaders()
      .subscribe(corporate_leaders => this.corporate_leaders=corporate_leaders);
  }

}
