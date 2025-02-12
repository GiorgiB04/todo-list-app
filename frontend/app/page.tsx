"use client";

import { useEffect } from "react";
import { useTasksQuery, useDeleteTasksMutation } from "@/services/contactApi"; // Update import
import AddTodoSheet from "@/components/AddTodoSheet";
import { Button } from "@/components/ui/button";
import EditTodoSheet from "@/components/EditTodoSheet";

export default function Home() {
  const { data, error, isLoading, isSuccess, isFetching } = useTasksQuery();
  const [deleteTask] = useDeleteTasksMutation();

  useEffect(() => {
    console.log(data);
  }, [isLoading, data]);

  const handleDelete = async (id: string | number | undefined) => {
    if (id === undefined || isNaN(Number(id))) {
      console.error("Invalid ID:", id);
      return;
    }

    const numericId = Number(id); // Convert to number
    try {
      await deleteTask(numericId).unwrap();
      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <main className="flex items-center flex-col mt-8">
      <div className="flex gap-4 text-center flex-col">
        <h1 className="text-5xl">
          Manage Your tasks with <span className="font-bold">ToDoApp</span>
          <span className="font-bold text-primary text-6xl">.</span>
        </h1>
        <p className="text-2xl text-muted-foreground">
          <span className="font-bold">ToDo App</span> gives you focus, from work
          to play
        </p>
      </div>
      <div className="mt-8 w-full max-w-4xl">
        <AddTodoSheet />
        {isLoading && <p className="text-center">Loading tasks...</p>}
        {error && (
          <p className="text-center text-red-500">Error fetching tasks</p>
        )}
        {isSuccess && (
          <div className="mt-4 space-y-4">
            {data?.map((task) => (
              <div
                key={task.id}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h1 className="text-xl font-semibold">{task.title}</h1>
                <div className="flex gap-2 mt-2">
                  <EditTodoSheet task={task} />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
