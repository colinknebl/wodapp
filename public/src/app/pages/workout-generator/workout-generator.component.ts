import { Component, OnInit } from '@angular/core';
import { GetWodService } from '../../services/get-wod.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Wod } from '../../models/wod';

@Component({
  selector: 'app-workout-generator',
  templateUrl: './workout-generator.component.html',
  styleUrls: ['./workout-generator.component.scss']
})
export class WorkoutGeneratorComponent implements OnInit {

  id:string;

  wod: Wod[];

  constructor(
    private getWodService:GetWodService, 
    public router:Router, 
    public route:ActivatedRoute) { }

  ngOnInit() {
    
    this.id = this.route.snapshot.params['id'];

    this.wod = [];
    this.getWodService.getWod(this.id)
      .subscribe(workout => {
        console.log(workout);
        this.wod = workout;
      });
  }

}
