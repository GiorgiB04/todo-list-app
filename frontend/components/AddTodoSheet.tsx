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
import { useAddTasksMutation } from "@/services/contactApi"; // Update import

// Updated schema without the `description` field
const formSchema = z.object({
  title: z.string().min(3),
});

const AddTodoSheet = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [addTask, { isLoading }] = useAddTasksMutation(); // Use the correct mutation

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await addTask(data).unwrap(); // Send the task data to the backend
      console.log("Task added successfully:", response); // Log the response
    } catch (error) {
      console.error("Failed to add task:", error);
    } finally {
      form.reset({
        title: "", // Only reset `title`
      });
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button aria-label="Add Task">Add Task</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Task</SheetTitle>
          <SheetDescription>
            Use this form to add a new task to your list
          </SheetDescription>
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
              <Button type="submit" disabled={isLoading} className="min-w-full">
                {isLoading ? "Adding..." : "Add Task"}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default AddTodoSheet;
