import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE];

  transform(value: any) {
    value = value.toUpperCase();
    if(!this.isStatusValid(value)){
        throw new BadRequestException(`${value} is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any): boolean {
    const index = this.allowedStatuses.indexOf(status) // vraća -1 ako status ne postoji u arrayu
    return index !== -1; // to znaci ako je status validan, ovo vraca treue
  }
}
