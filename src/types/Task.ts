export type Priority = "High" | "Medium" | "Low";

export type Task = {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  completed: boolean;
  createdAt: string;
};

export type TaskInput = {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
};

export type RootStackParamList = {
  Dashboard: undefined;
  Tasks: undefined;
  AddTask: undefined;
  EditTask: { taskId: number };
  TaskDetails: { taskId: number };
};