import { SQLiteDatabase } from "expo-sqlite";
import { Task, TaskInput } from "../types/Task";

type TaskRow = {
  id: number;
  title: string;
  description: string;
  priority: Task["priority"];
  dueDate: string;
  completed: number;
  createdAt: string;
};

function convertTask(row: TaskRow): Task {
  return {
    ...row,
    completed: row.completed === 1,
  };
}

// GET ALL TASKS
export async function getAllTasks(
  db: SQLiteDatabase
): Promise<Task[]> {
  const result = await db.getAllAsync<TaskRow>(
    "SELECT * FROM tasks ORDER BY id DESC"
  );

  return result.map(convertTask);
}

// GET SINGLE TASK
export async function getTaskById(
  db: SQLiteDatabase,
  id: number
): Promise<Task | null> {
  const result = await db.getFirstAsync<TaskRow>(
    "SELECT * FROM tasks WHERE id = ?",
    [id]
  );

  return result ? convertTask(result) : null;
}

// ADD TASK
export async function insertTask(
  db: SQLiteDatabase,
  task: TaskInput
): Promise<void> {
  await db.runAsync(
    `INSERT INTO tasks
    (title, description, priority, dueDate, completed, createdAt)
    VALUES (?, ?, ?, ?, 0, ?)`,
    [
      task.title,
      task.description,
      task.priority,
      task.dueDate,
      new Date().toISOString(),
    ]
  );
}

// UPDATE TASK
export async function updateTask(
  db: SQLiteDatabase,
  id: number,
  task: TaskInput
): Promise<void> {
  await db.runAsync(
    `UPDATE tasks
     SET title = ?, description = ?, priority = ?, dueDate = ?
     WHERE id = ?`,
    [
      task.title,
      task.description,
      task.priority,
      task.dueDate,
      id,
    ]
  );
}

// UPDATE TASK STATUS
export async function updateTaskStatus(
  db: SQLiteDatabase,
  id: number,
  completed: boolean
): Promise<void> {
  await db.runAsync(
    "UPDATE tasks SET completed = ? WHERE id = ?",
    [completed ? 1 : 0, id]
  );
}

// DELETE TASK
export async function deleteTask(
  db: SQLiteDatabase,
  id: number
): Promise<void> {
  await db.runAsync(
    "DELETE FROM tasks WHERE id = ?",
    [id]
  );
}