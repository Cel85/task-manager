import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./task.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe";

@Controller("tasks")
export class TasksController {
  //injectiramo service TaskService kroz konstruktor
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    //iz qery paramtera se extrakta dto kao objekt
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFilters(filterDto);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Post()
  @UsePipes(ValidationPipe) //validation pipe izima cije rekvest body i uporduje ga s class valdiatorom
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string): Task {
    // s @Param dekorator govorimo nestu da ocekuje u url-u paramter ID
    return this.taskService.getTaskById(id);
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: string): void {
    this.taskService.deleteTask(id);
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id") id: string, //uzimamo iz URl-a
    @Body("status", TaskStatusValidationPipe) status: TaskStatus // uzimamo iz body od rekvesta, ako želim bidat pipe specificno na status argument, ubacujemo kao 2. paramter @Body dekoratora
  ): Task {
    return this.taskService.updateTaskStatus(id, status);
  }
}
