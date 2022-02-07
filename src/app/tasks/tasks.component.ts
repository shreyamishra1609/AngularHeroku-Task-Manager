import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TasksModel } from './taskModel';
import { TasksService } from './tasks.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [MessageService]
})
export class TasksComponent implements OnInit {

  tasks!: TasksModel[] 
  dataPresent: any;
  displayClick = false
  editDisplay = false
  deletePopUp: boolean = false;
  showDialog = false
  taskDeletionId: any;
  taskId: any;
  progress!:number
  total=0;
  currentDate: any;
  taskToday!: number;
  trimmedMon!: string;
  message: any;
  noTaskMsg="Go ahead and add a task . Click on New Task !"

  constructor(private taskService: TasksService, private messageService: MessageService, private cdRef: ChangeDetectorRef) { }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
  /**
   *
   *
   * @memberof TasksComponent
   */
  ngOnInit(): void {
    this.generateTaskList();
    this.dateTransform()

  }


  /**
   * get all tasks
   *
   * @memberof TasksComponent
   */
  public generateTaskList() {
    this.taskService.getTasks().subscribe((data) => {
      console.log(data)
      this.tasks = data.sort((a: { dueDate: string | number | Date; },b: { dueDate: string | number | Date; })=>{return new Date(a.dueDate).getTime()-new Date(b.dueDate).getTime()})
      if (this.tasks.length > 0) {
        this.dataPresent = true;
      } else {
        this.dataPresent = false;
      }
      this.progressBarValue(this.tasks);
      this.taskForToday(this.tasks)
    })
  }


  /**
   * delete task button click
   *
   * @param {*} taskId
   * @memberof TasksComponent
   */
  public deleteTask(taskId: any) {
    this.showDialog = true;
    this.taskDeletionId = taskId

  }


  /**
   * delete confirmation
   *
   * @memberof TasksComponent
   */
  public deleteServiceCall() {
    this.taskService.deleteTasks(this.taskDeletionId).subscribe((data) => {
      console.log(data)
      this.generateTaskList();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: data,
      });
      this.message=true
      this.showDialog = false

    })
  }


  /**
   * Parent-child interaction
   *
   * @param {*} $event
   * @memberof TasksComponent
   */
  public getUpdatedData($event: any) {
    this.displayClick = false;
    this.editDisplay = false;
  }


  /**
   * Parent-child interaction
   *
   * @param {*} $event
   * @memberof TasksComponent
   */
  public refreshData($event: any) {
    this.displayClick = false;
    this.editDisplay = false;
    this.ngOnInit()

  }


  /**
   *
   * Parent-child interaction
   * @param {number} tid
   * @memberof TasksComponent
   */
  public editFunc(tid: number) {
    this.editDisplay = true;
    this.taskId = tid;

  }

  public progressBarValue(tasksList: TasksModel[]){
    let completed=tasksList.filter(element=>element.type==="Completed").length;
     this.total=tasksList.length;
    this.progress=Math.round(completed/this.total *100);
  }
  
  public taskForToday(tasksList: TasksModel[]){
    console.log(tasksList)
    this.taskToday=tasksList.filter(element=>element.dueDate===this.currentDate).length
    
  }

  public taskFortodayFunc(){
    this.tasks=this.tasks.filter(element=>element.dueDate===this.currentDate).sort()
    this.noTaskMsg="You have no tasks for today"
  }

  public dateTransform(){
    var currDate=new Date();
    var trimmedDate=currDate.getDate()<=9?"0"+currDate.getDate():currDate.getDate()
    var trimmedMonth=currDate.getMonth()<=9?currDate.getMonth()+1:currDate.getMonth()
    if(trimmedMonth<=9){
       this.trimmedMon="0"+trimmedMonth
    }
    var trimmedYear=currDate.getFullYear();
    this.currentDate=`${this.trimmedMon}/${trimmedDate}/${trimmedYear}`
    console.log(this.currentDate)
  }

  receiveMessage($event:any) {
    this.message = $event
  }

  exitChart($event:any){
    this.message=false
  }
}
