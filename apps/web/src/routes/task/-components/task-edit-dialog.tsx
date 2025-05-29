"use client";

import type { IPatchTasks } from "@uist-project/api/schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { patchTasksSchema } from "@uist-project/api/schema";
import { Loader2, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTaskQueryOptions, deleteTask, queryKeys, updateTask } from "@/web/data-access/tasks";

type TaskEditDialogProps = {
  taskId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export default function TaskEditDialog({ taskId, open, onOpenChange, onSuccess }: TaskEditDialogProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const queryClient = useQueryClient();
  const { data: task } = useSuspenseQuery(createTaskQueryOptions(taskId));

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isDirty },
    reset,
  } = useForm<IPatchTasks>({
    defaultValues: task,
    resolver: zodResolver(patchTasksSchema),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries(queryKeys.LIST_TASKS);
      onOpenChange(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [...queryKeys.LIST_TASKS.queryKey, ...queryKeys.LIST_TASK(taskId).queryKey],
      });
      onOpenChange(false);
      if (onSuccess)
        onSuccess();
    },
  });

  const pending = deleteMutation.isPending || updateMutation.isPending;
  const error = deleteMutation.error?.message || updateMutation.error?.message;

  const onSubmit = (data: IPatchTasks) => {
    updateMutation.mutate({ id: taskId, task: data });
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(newOpen) => {
          if (!pending) {
            onOpenChange(newOpen);
            if (newOpen)
              reset(task);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Task Name</Label>
              <Input
                id="name"
                placeholder="Enter task name"
                disabled={pending}
                value={getValues("name")}
                onChange={e => setValue("name", e.target.value, { shouldDirty: true, shouldValidate: true })}
              />
              {errors.name?.message && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="done"
                disabled={pending}
                checked={getValues("done")}
                onCheckedChange={() => {
                  setValue("done", !getValues("done"), {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
              />
              <Label htmlFor="done">Mark as completed</Label>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <div className="flex w-full justify-between">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={pending}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>

                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={pending}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button type="submit" disabled={pending || !isDirty}>
                    {pending
                      ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        )
                      : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </>
                        )}
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteMutation.mutate(taskId);
                setShowDeleteConfirm(false);
              }}
              disabled={deleteMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending
                ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  )
                : (
                    "Delete"
                  )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
