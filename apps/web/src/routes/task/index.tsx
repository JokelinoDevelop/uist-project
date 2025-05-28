import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import RoutePending from "@/web/components/route-pending";
import queryClient from "@/web/lib/query-client";
import { tasksQueryOptions } from "@/web/queries/tasks";
import TaskForm from "@/web/routes/task/-components/form";
import TaskList from "@/web/routes/task/-components/list";

export const Route = createFileRoute("/task/")({
  component: RouteComponent,
  loader: () => queryClient.ensureQueryData(tasksQueryOptions),
  pendingComponent: RoutePending,
});

function RouteComponent() {
  const {
    data,
  } = useSuspenseQuery(tasksQueryOptions);
  return (
    <div>
      <TaskForm />
      <TaskList tasks={data} />
    </div>
  );
}
