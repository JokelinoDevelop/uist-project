import { createFileRoute } from "@tanstack/react-router";

import RoutePending from "@/components/route-pending";

import { LoginForm } from "./-components/login-form";

export const Route = createFileRoute("/login/")({
  component: RouteComponent,
  pendingComponent: RoutePending,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
