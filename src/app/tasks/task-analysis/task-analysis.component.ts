import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { TasksModel } from '../taskModel';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-analysis',
  templateUrl: './task-analysis.component.html',
  styleUrls: ['./task-analysis.component.scss']
})
export class TaskAnalysisComponent implements OnInit {
  @Input() childMessage!: boolean;
  @Output() exitFromChart = new EventEmitter<boolean>();
  taskList: TasksModel[] = []
  public userAppData: any;
  public userLabel: any;
  public options: any;
  todo: TasksModel[] = [];
  inProgress: TasksModel[] = [];
  completed: TasksModel[] = [];
  todoCount: number = 0;
  inProgCount: number = 0;
  completedCount: number = 0;

  constructor(private taskService: TasksService) { }

  
  ngOnChanges(change: SimpleChanges): void {
    if (change['childMessage']?.currentValue === true ) {
      this.ngOnInit()
      this.exitFromChart.emit(false)

    }

  }
 
  /**
   *  On initial load subscribing to get all tasks
   *
   * @memberof TaskAnalysisComponent
   */
  ngOnInit(): void {
    this.todo=[];
    this.completed=[];
    this.inProgress=[]
    this.taskService.getTasks().subscribe((data => {
      this.taskList = data;
      console.log(this.taskList)

      //filtering on basis of status
      for (const obj of this.taskList) {
        if (obj.type === 'Todo') {
          this.todo.push(obj)
        }
      }
      this.todoCount = this.todo.length
      for (const obj of this.taskList) {
        if (obj.type === 'Completed') {
          this.completed.push(obj)
        }
      }
      this.completedCount = this.completed.length

      for (const obj of this.taskList) {
        if (obj.type === 'In Progress') {
          this.inProgress.push(obj)
        }
      }
      this.inProgCount = this.inProgress.length
      this.userLabel = ["Todo", "In-Progress", "Completed"]


      this.userAppData = {
        labels: this.userLabel,
        datasets: [
          {
            data: [

              this.todoCount,
              this.inProgCount,
              this.completedCount,

            ],
            backgroundColor: [
              '#cc0000',
              '#FEBE10',
              'rgb(2, 95, 2)',

            ],
           
          },
        ],
      };

    }))



    this.options = {

      
      //display labels on data elements in graph
      plugins: {
        datalabels: {
          align: 'end',
          anchor: 'end',
          borderRadius: 4,
          backgroundColor: 'teal',
          color: 'white',
          font: {
            weight: 'bold'
            
          },
        },
        // display chart title
        title: {
          display: true,
          fontSize: 16,
        },
        legend: {
          display:false,
        },
      },
    };
    
  }
  
}
