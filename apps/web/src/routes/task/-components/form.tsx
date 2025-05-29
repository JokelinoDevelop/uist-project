"use client";

import type { IInsertTasks } from "@uist-project/api/schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertTasksSchema } from "@uist-project/api/schema";
import { Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createTask, queryKeys } from "@/web/data-access/tasks";

export default function TaskForm() {
  const queryClient = useQueryClient();

  const form = useForm<IInsertTasks>({
    defaultValues: {
      name: "",
      done: false,
    },
    resolver: zodResolver(insertTasksSchema),
  });

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries(queryKeys.LIST_TASKS);
    },
    onSettled: () => {
      setTimeout(() => {
        form.setFocus("name");
      });
    },
  });

  const onSubmit = (data: IInsertTasks) => {
    createMutation.mutate(data);
  };

  return (
    <div className="space-y-4">
      {createMutation.error && (
        <Alert variant="destructive">
          <AlertDescription className="whitespace-pre-wrap">{createMutation.error.message}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter task name..." disabled={createMutation.isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={createMutation.isPending} className="w-full">
            {createMutation.isPending
              ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                )
              : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Task
                  </>
                )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
