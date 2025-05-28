import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import AppNavbar from "../components/app-navbar";

function ErrorComponent({ error }: { error: Error }) {
  return (
    <>
      <AppNavbar />
      <main className="container" style={{ marginTop: "1rem" }}>
        <div style={{ padding: "1rem", background: "#fee", border: "1px solid #fcc", borderRadius: "4px" }}>
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
      <AppNavbar />
      <main className="container" style={{ marginTop: "1rem" }}>
        <Outlet />
        <TanStackRouterDevtools />
      </main>
    </>
  ),
  errorComponent: ErrorComponent,
});
