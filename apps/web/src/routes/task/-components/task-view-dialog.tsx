"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, CheckCircle2, Edit, XCircle } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { createTaskQueryOptions } from "@/web/data-access/tasks";
import dateFormatter from "@/web/lib/date-formatter";

import TaskEditDialog from "./task-edit-dialog";

type TaskViewDialogProps = {
  taskId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function TaskViewDialog({ taskId, open, onOpenChange }: TaskViewDialogProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const { data: task } = useSuspenseQuery(createTaskQueryOptions(taskId));

  const handleEditClick = () => {
    onOpenChange(false);
    setTimeout(() => setShowEditDialog(true), 100);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="flex-1 truncate">{task.name}</span>
              <Badge variant={task.done ? "default" : "secondary"} className="ml-2">
                {task.done ? "Completed" : "Pending"}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-medium mr-2">Status:</span>
              <div className="flex items-center">
                {task.done
                  ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle2 className="h-5 w-5 mr-1" />
                        <span>Completed</span>
                      </div>
                    )
                  : (
                      <div className="flex items-center text-amber-600">
                        <XCircle className="h-5 w-5 mr-1" />
                        <span>Pending</span>
                      </div>
                    )}
              </div>
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created:</span>
                <span>{dateFormatter.format(new Date(task.createdAt ?? ""))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last updated:</span>
                <span>{dateFormatter.format(new Date(task.updatedAt ?? ""))}</span>
              </div>
            </div>
          </div>

          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button onClick={handleEditClick}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <TaskEditDialog
        taskId={taskId}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSuccess={() => {
          setShowEditDialog(false);
          setTimeout(() => onOpenChange(true), 100);
        }}
      />
    </>
  );
}
