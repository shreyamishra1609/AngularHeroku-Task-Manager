import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TasksService } from '../tasks.service';
@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  @Input() display = false;
  @Input() editDisplay = false;
  @Input() taskId: any;
  @Output() closeForm: EventEmitter<any> = new EventEmitter();
  @Output() saveForm: EventEmitter<any> = new EventEmitter();
  @Output() messageEvent = new EventEmitter<boolean>();
  status: String[] = [];
  addForm!: FormGroup;
  header = ""

  constructor(private fb: FormBuilder, private taskService: TasksService, private messageService: MessageService) { }


  /**
   *
   *
   * @memberof TaskEditComponent
   */
  ngOnInit(): void {
    this.statusInitialize();
    this.addFormFunc();
  }


  /**
   *
   *
   * @param {SimpleChanges} change
   * @memberof TaskEditComponent
   */
  ngOnChanges(change: SimpleChanges): void {
    if (change['display']?.currentValue !== undefined && change['display']?.currentValue === true) {
      this.header = "Add a task"
    }
    else if (change['editDisplay']?.currentValue !== undefined && change['editDisplay']?.currentValue === true) {
      this.header = "Edit task"
      this.editTask()
    }
  }


  /**
   *status dropdown initialize
   *
   * @private
   * @memberof TaskEditComponent
   */
  private statusInitialize(): void {
    this.status = [
      'Todo',
      'In Progress',
      'Completed'

    ];
  }


  /**
   * form initialize
   *
   * @memberof TaskEditComponent
   */
  public addFormFunc() {
    this.addForm = this.fb.group({
      title: ['', Validators.required],
      type: [this.status[0], Validators.required],
      dueDate: ['', Validators.required],
      description: ['']

    })
  }


  /**
   * close form
   *
   * @memberof TaskEditComponent
   */
  public closeFormFunc() {
    this.addForm.reset()
    this.addFormFunc();
    this.display = false;
    this.editDisplay = false;
    this.closeForm.emit(this.display)
    this.messageEvent.emit(true)
  }


  /**
   *
   * save task button 
   * @memberof TaskEditComponent
   */
  public saveTask() {
    // in case of adding new task
    if (this.display === true) {
      this.addNewTask()
    }

    // in case of editing exisitng task
    if (this.editDisplay === true) {
      this.editTaskFunc()
    }

  }


  /**
   * Add task service call
   *
   * @memberof TaskEditComponent
   */
  public addNewTask(): void {
    const formattedDate = new Date(this.addForm.get('dueDate')?.value).toLocaleDateString("en-us");
    this.addForm.patchValue({ dueDate: formattedDate })

    this.taskService.addTask(this.addForm.value).subscribe((data) => {
      this.display = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: data,
      });
      this.messageEvent.emit(true)
      this.saveForm.emit()

    })
    this.addForm.reset()
    this.addFormFunc();
  
  }


  /**
   *  Edit task form patch values
   *
   * @memberof TaskEditComponent
   */
  public editTask() {
    this.taskService.getTaskById(this.taskId).subscribe((data: any) => {
      console.log(data)
      this.addForm.patchValue({
        title: data.title,
        type: data.type,
        dueDate: data.dueDate,
        description: data.description
      })
    })
  }



  /**
   * Edit task service 
   *
   * @memberof TaskEditComponent
   */
  public editTaskFunc() {
    const formattedDate = new Date(this.addForm.get('dueDate')?.value).toLocaleDateString("en-us");
    this.addForm.patchValue({ dueDate: formattedDate })
    this.taskService.saveEdittedTask(this.addForm.value, this.taskId).subscribe((data) => {
      this.editDisplay = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: data,
      });
      this.saveForm.emit()
      this.messageEvent.emit(true)

    })
    this.addForm.reset()
    this.addFormFunc();
  }
}
