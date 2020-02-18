//definiramo struktura nasih taskova
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus; //niže definirani moguci statusi nasih taskova, samo njih dzvoljavamo
}

export enum TaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE"
}
