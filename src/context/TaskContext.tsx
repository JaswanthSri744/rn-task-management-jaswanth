import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useSQLiteContext } from "expo-sqlite";

import { Task, TaskInput } from "../types/Task";

import {
  getAllTasks,
  insertTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../database/taskQueries";

type TaskContextType = {
  tasks: Task[];
  loading: boolean;
  refreshTasks: () => Promise<void>;
  addTask: (task: TaskInput) => Promise<void>;
  editTask: (id: number, task: TaskInput) => Promise<void>;
  removeTask: (id: number) => Promise<void>;
  toggleTask: (id: number, completed: boolean) => Promise<void>;
};

const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const TaskProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const db = useSQLiteContext();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllTasks(db);
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [db]);

  useEffect(() => {
    refreshTasks().catch((error) =>
      console.error("Initial task loading failed:", error)
    );
  }, [refreshTasks]);

  const addTask = async (task: TaskInput) => {
    await insertTask(db, task);
    await refreshTasks();
  };

  const editTask = async (id: number, task: TaskInput) => {
    await updateTask(db, id, task);
    await refreshTasks();
  };

  const removeTask = async (id: number) => {
    await deleteTask(db, id);
    await refreshTasks();
  };

  const toggleTask = async (
    id: number,
    completed: boolean
  ) => {
    await updateTaskStatus(db, id, completed);
    await refreshTasks();
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        refreshTasks,
        addTask,
        editTask,
        removeTask,
        toggleTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error(
      "useTasks must be used inside TaskProvider"
    );
  }

  return context;
};