"use client";

import type { ITask } from "@uist-project/api/schema";

import { CheckCircle2, Circle, Eye } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import dateFormatter from "@/lib/date-formatter";
import { cn } from "@/lib/utils";

import TaskViewDialog from "./task-view-dialog";

export default function Task({ task }: { task: ITask }) {
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  return (
    <>
      <Card className={cn("transition-all duration-200 hover:shadow-md", task.done && "bg-muted/50")}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0">
                {task.done
                  ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    )
                  : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className={cn("font-medium truncate", task.done && "line-through text-muted-foreground")}>
                  {task.name}
                </h3>

                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={task.done ? "secondary" : "default"} className="text-xs">
                    {task.done ? "Completed" : "Pending"}
                  </Badge>

                  {task.createdAt && (
                    <span className="text-xs text-muted-foreground">
                      Created:
                      {" "}
                      {dateFormatter.format(new Date(task.createdAt))}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 ml-4">
              <Button variant="outline" size="sm" onClick={() => setViewDialogOpen(true)}>
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <TaskViewDialog taskId={task.id.toString()} open={viewDialogOpen} onOpenChange={setViewDialogOpen} />
    </>
  );
}
