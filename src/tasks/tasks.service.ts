import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import * as uuid from "uuid/v1";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { search, status } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        task => task.title.includes(search) || task.description.includes(search)
      );
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id === id);

    if (!found) {
      //mozemo baciti exepction
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    //deconstrukcije dto
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title: title,
      description: description,
      status: TaskStatus.OPEN
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    const task = this.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    this.tasks = this.tasks.filter(item => item !== task);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
