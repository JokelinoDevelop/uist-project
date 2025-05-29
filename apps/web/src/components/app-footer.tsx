import { Link } from "@tanstack/react-router";

export function AppFooter() {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between gap-2 py-4 sm:py-6 w-full shrink-0 px-4 md:px-6 border-t">
      <div className="text-xs text-muted-foreground text-center sm:text-left">
        © 2024 TaskFlow. All rights reserved.
      </div>

      <div className="text-xs text-muted-foreground font-bold text-center">
        Made with ❤️ by Jokac
      </div>

      <nav className="flex gap-4 sm:gap-6">
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Terms of Service
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Privacy Policy
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Contact
        </Link>
      </nav>
    </footer>
  );
}
