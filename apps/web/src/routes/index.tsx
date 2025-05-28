import { createFileRoute } from "@tanstack/react-router";

import RoutePending from "@/web/components/route-pending";

export const Route = createFileRoute("/")({
  component: Index,
  pendingComponent: RoutePending,
});

function Index() {
  return (
    <div>
      Hello from overview
    </div>
  );
}
