import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  taskNameInput: string = '';
  taskNames;

  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.taskNames = ['0', '1'];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }
  
  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  moveTaskBack(taskName) {
    this.tasks.map((task, index)=>{
      console.log(task);
      if(task.name === taskName) {
        task.stage--;
      }
    })
    this.configureTasksForRendering();
  }

  moveTaskForward(taskName) {
    this.tasks.map((task, index)=>{
      console.log(task);
      if(task.name === taskName) {
        task.stage++;
      }
    })
    this.configureTasksForRendering();
  }

  deleteTask(taskIndex) {
    this.tasks.splice(taskIndex, 1);
    this.configureTasksForRendering();
  }

  addTaskToBoard() {
    console.log(this.taskNameInput);
    let trimmedValue = this.taskNameInput.trim();
    if(trimmedValue && trimmedValue.length>0 && this.taskNames.indexOf(trimmedValue)<0) {
      this.tasks.push({name: trimmedValue, stage: 0});
      this.taskNames.push(trimmedValue);
      this.taskNameInput = '';
      this.configureTasksForRendering();
    }
    else {
      this.taskNameInput = '';
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }
}

interface Task {
  name: string;
  stage: number;
}