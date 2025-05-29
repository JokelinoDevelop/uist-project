import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CheckSquare } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RoutePending from "@/web/components/route-pending";
import { tasksQueryOptions } from "@/web/data-access/tasks";
import queryClient from "@/web/lib/query-client";
import TaskForm from "@/web/routes/task/-components/form";
import TaskList from "@/web/routes/task/-components/list";

export const Route = createFileRoute("/task/")({
  component: RouteComponent,
  loader: () => queryClient.ensureQueryData(tasksQueryOptions),
  pendingComponent: RoutePending,
});

function RouteComponent() {
  const { data } = useSuspenseQuery(tasksQueryOptions);

  const completedTasks = data.filter(task => task.done).length;
  const totalTasks = data.length;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl min-h-screen">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <CheckSquare className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Task Manager</h1>
        </div>
        <p className="text-muted-foreground">Organize your tasks and stay productive</p>
        {totalTasks > 0 && (
          <div className="mt-4 text-sm text-muted-foreground">
            {completedTasks}
            {" "}
            of
            {totalTasks}
            {" "}
            tasks completed
          </div>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Add New Task</CardTitle>
              <CardDescription>Create a new task to add to your list</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskForm />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Tasks</CardTitle>
              <CardDescription>
                {totalTasks === 0
                  ? "No tasks yet. Create your first task to get started!"
                  : `${totalTasks} task${totalTasks === 1 ? "" : "s"} in your list`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {totalTasks === 0
                ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <CheckSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No tasks yet</p>
                      <p className="text-sm">Add your first task to get started</p>
                    </div>
                  )
                : (
                    <TaskList tasks={data} />
                  )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default RouteComponent;
