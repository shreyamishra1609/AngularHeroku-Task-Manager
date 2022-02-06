import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskAnalysisComponent } from './task-analysis/task-analysis.component';
import { TasksComponent } from './tasks.component';

const routes: Routes = [{ path: '', component: TasksComponent },
{ path: 'analysis', component: TaskAnalysisComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
