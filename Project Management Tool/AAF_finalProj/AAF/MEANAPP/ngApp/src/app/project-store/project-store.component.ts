import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-store',
  templateUrl: './project-store.component.html',
  styleUrls: ['./project-store.component.css'],
  providers : [ProjectService]
  
})
export class ProjectStoreComponent implements OnInit {
   
   projects : Array <Project>;

   selectedProject:Project;
   private hidenewProject : boolean = true;

  constructor(private _projectService:ProjectService) { }

  ngOnInit() {
    this._projectService.getProjects()
    .subscribe(resProjectData => this.projects = resProjectData);
  }
  

onSelectProject(project:any){
  this.selectedProject = project;
  this.hidenewProject= true;
  console.log(this.selectedProject);
} 


onSubmitAddProject(project:Project){
  this._projectService.addProject(project)
  .subscribe(resNewProject=>{
    this.projects.push(resNewProject);
    this.hidenewProject= true;
    this.selectedProject = resNewProject;
  });
}

onUpdateProjectEvent(project:any){
  this._projectService.updateProject(project)
  .subscribe(resUpdatedProject => project =resUpdatedProject);
  this.selectedProject = null;

};


onDeleteProjectEvent(project:any){
  let projectArray = this.projects;
  this._projectService.deleteProject(project)
  .subscribe(resDeletedProject =>{
    for(let i=0; i<projectArray.length; i++)
    {
      if(projectArray[i]._id === project._id)
      {
        projectArray.splice(i,1);
      }
    }
  });
  this.selectedProject=null;
};



newProject(){
  this.hidenewProject = false;
 }

}
