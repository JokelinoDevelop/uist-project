import { createFileRoute } from "@tanstack/react-router";

import { SignUpForm } from "@/routes/sign-up/-components/sign-up-form";
import RoutePending from "@/web/components/route-pending";

export const Route = createFileRoute("/sign-up/")({
  component: Index,
  pendingComponent: RoutePending,
});

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <SignUpForm />
      </div>
    </div>
  );
}
