import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tasks } from "../models/tasks.models";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    tasks: builder.query<Tasks[], void>({
      query: () => "/tasks", // Fetch all tasks
      providesTags: ["Task"],
    }),
    addTasks: builder.mutation<Tasks, Partial<Tasks>>({
      query: (task) => ({
        url: "/tasks", // Add a new task
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTasks: builder.mutation<Tasks, Tasks>({
      query: (task) => ({
        url: `/tasks/${task.id}`, // Update a task
        method: "PUT",
        body: { title: task.title },
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTasks: builder.mutation<void, number>({
      query: (id) => ({
        url: `/tasks/${id}`, // Delete a task
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useTasksQuery,
  useAddTasksMutation,
  useUpdateTasksMutation,
  useDeleteTasksMutation,
} = taskApi;
