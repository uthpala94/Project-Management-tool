import { Injectable } from '@angular/core';
import { Http , Response ,Headers ,RequestOptions } from'@angular/http';
import 'rxjs/add/operator/map';
import { Project } from './project';
import {HttpHeaders} from '@angular/common/http';
import {Options} from 'selenium-webdriver/edge';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  

  public auth:any;
  public headers:any;

  constructor(private http:Http) { 
    this.auth="Bearer "+localStorage.getItem("id_token");
    this.headers=new Headers({'Authorization':this.auth,'Content-Type':'application/json; charset=utf-8'});
  }
  
  //get all projects
  getProjects(){
    return this.http.get("http://localhost:3000/api/projects",{headers:this.headers})
    .map(res =>res.json());
  }

   //add new project
   addProject(project:Project){
    let options = new RequestOptions({headers:this.headers});
    return this.http.post("http://localhost:3000/api/project",JSON.stringify(project),options )
    .map(res => res.json());
  }

  //update project
  updateProject(project:Project){
    let options = new RequestOptions({headers:this.headers});
    return this.http.put("http://localhost:3000/api/project/"+project._id ,JSON.stringify(project),options )
    .map(res => res.json());
  }

  //delete project
  deleteProject(project:Project){
    return this.http.delete("http://localhost:3000/api/project/"+project._id)
    .map(res => res.json());
  }
  
}
