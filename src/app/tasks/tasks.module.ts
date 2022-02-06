import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { HttpClientModule } from '@angular/common/http';
import { TasksService } from './tasks.service';
import {TableModule} from 'primeng/table';
import { ButtonModule} from 'primeng/button';
import { TaskAnalysisComponent } from './task-analysis/task-analysis.component';
import { ChartModule } from 'primeng/chart';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import {CardModule} from 'primeng/card';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ProgressBarModule} from 'primeng/progressbar';
import {BadgeModule} from 'primeng/badge';
@NgModule({
  declarations: [
    TasksComponent,
    TaskAnalysisComponent,
    TaskEditComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    ChartModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    NoopAnimationsModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    InputTextareaModule,
    ConfirmDialogModule,
    ProgressBarModule,
    BadgeModule
  ],
  providers:[
    TasksService,
    
  ],
  exports:[TasksComponent,
  TaskAnalysisComponent]
})
export class TasksModule { }
