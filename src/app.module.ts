import { Module } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";

//module je definiran Module dekoratorom
@Module({
  imports: [TasksModule]
})
export class AppModule {}
