import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { AppFooter } from "@/components/app-footer";
import { AppHeader } from "@/components/app-header";
import { Toaster } from "@/components/ui/sonner";

function ErrorComponent({ error }: { error: Error }) {
  return (
    <>
      <main className="container" style={{ marginTop: "1rem" }}>
        <div
          style={{
            padding: "1rem",
            background: "#fee",
            border: "1px solid #fcc",
            borderRadius: "4px",
          }}
        >
          <h2>Something went wrong</h2>
          <p>{error.message}</p>
        </div>
      </main>
    </>
  );
}

export const Route = createRootRouteWithContext<object>()({
  component: () => (
    <>
      <main className="min-h-screen">
        <AppHeader />
        <Outlet />
        <AppFooter />
        <Toaster />
        <TanStackRouterDevtools />
      </main>
    </>
  ),
  errorComponent: ErrorComponent,
});
