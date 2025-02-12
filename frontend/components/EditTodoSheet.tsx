"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateTasksMutation } from "@/services/contactApi"; // Update import

// Updated schema without the `description` field
const formSchema = z.object({
  title: z.string().min(3),
});

const EditTodoSheet = ({ task }: { task: any }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [updateTask, { isLoading }] = useUpdateTasksMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task.title, // Pre-fill the form with the task's title
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const updatedTask = { ...task, title: data.title }; // Only update the `title` field
      const response = await updateTask(updatedTask).unwrap(); // Send the updated task data
      console.log("Task updated successfully:", response); // Log the response
    } catch (error) {
      console.error("Failed to update task:", error);
    } finally {
      form.reset();
      setIsOpen(false); // Close the sheet
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Task</SheetTitle>
          <SheetDescription>Update the title of your task</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            className="my-2 flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <SheetFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Task"}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default EditTodoSheet;
