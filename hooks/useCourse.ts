import { useState } from "react";
import api from "../lib/api-helper";

interface CreateCourseData {
  title: string;
  description: string;
  class_name: string;
}

interface UpdateCourseData extends CreateCourseData {
  id: string;
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

interface Course {
  id: string;
  title: string;
  description: string;
  class_name: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
  owner: Owner;
  tasks: Task[];
}

interface CourseResponse {
  status: string;
  message: string;
  data: Course[];
}

export const useCourse = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCourses = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.get<CourseResponse>("/v1/courses");
      return response.data.data;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengambil data courses"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getCourseById = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.get<{
        status: string;
        message: string;
        data: Course;
      }>(`/v1/courses/${id}`);
      return response.data.data;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengambil data course"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const createCourse = async (data: CreateCourseData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.post<{
        status: string;
        message: string;
        data: Course;
      }>("/v1/courses", data);
      return response.data.data;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat membuat course"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCourse = async (
    id: string,
    data: Omit<UpdateCourseData, "id">
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.put<{
        status: string;
        message: string;
        data: Course;
      }>(`/v1/courses/${id}`, data);
      return response.data.data;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengupdate course"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      await api.delete(`/v1/courses/${id}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menghapus course"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
  };
};
