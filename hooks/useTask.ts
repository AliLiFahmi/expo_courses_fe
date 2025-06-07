import { useState } from "react";
import api from "../lib/api-helper";

interface Course {
  id: string;
  title: string;
  description: string;
  class_name: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

interface Owner {
  id: string;
  full_name: string;
  email: string;
  email_verified_at: string | null;
  is_active: number;
  created_at: string;
  updated_at: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: string;
  course_id: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
  course: Course;
  owner: Owner;
  documents: any[];
}

interface TaskResponse {
  status: string;
  message: string;
  data: Task[];
}

interface CreateTaskData {
  title: string;
  description: string;
  deadline: string;
  course_id: string;
}

interface UpdateTaskData extends Partial<CreateTaskData> {
  status?: string;
}

export const useTask = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.get<TaskResponse>("/v1/tasks");
      return response.data.data;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengambil data tasks"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getTaskById = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.get<{
        status: string;
        message: string;
        data: Task;
      }>(`/v1/tasks/${id}`);
      return response.data.data;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengambil data task"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async (data: CreateTaskData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.post<{
        status: string;
        message: string;
        data: Task;
      }>("/v1/tasks", data);
      return response.data.data;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat membuat task"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (id: string, data: UpdateTaskData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.put<{
        status: string;
        message: string;
        data: Task;
      }>(`/v1/tasks/${id}`, data);
      return response.data.data;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengupdate task"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      await api.delete(`/v1/tasks/${id}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menghapus task"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
  };
};
