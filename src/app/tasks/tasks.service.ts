import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TasksService {


  constructor(private http: HttpClient) { }

  url = "https://backend-taskmanager.herokuapp.com/api/v1/";
  url2 = "https://backend-taskmanager.herokuapp.com/api/v1/task/";
  
  public getTasks(): Observable<any> {
    return this.http.get<any>(this.url + "task");
  }

  public deleteTasks(taskId:any){
    return this.http.delete(this.url2+taskId,   {responseType: 'text'});
  }

  public addTask(taskBody:any){
    return this.http.post(this.url2, taskBody,  {responseType: 'text'});
  }

  public getTaskById(id:number){
    return this.http.get(this.url2+id);
  }

  public saveEdittedTask(taskBody:any, id:number){
    return this.http.put(this.url2+id, taskBody, {responseType: 'text'});
  }
}
