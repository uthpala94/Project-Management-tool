import { Component, OnInit, EventEmitter} from '@angular/core';


@Component({
  selector: 'project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  inputs: ['project'],
  outputs: ['updateProjectEvent','deleteProjectEvent']
})
export class ProjectDetailsComponent implements OnInit {
 
  project :any;
   
   private editTitle:boolean=false; 
   private updateProjectEvent =new EventEmitter;
   private deleteProjectEvent =new EventEmitter;

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(){
    this.editTitle =false;
  }

  onTitleClick(){
    this.editTitle=true;
  }   
  
  updateProject(){
    this.updateProjectEvent.emit(this.project);
  }
  deleteProject(){
    this.deleteProjectEvent.emit(this.project);
  }
}
