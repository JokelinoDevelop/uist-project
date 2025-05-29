import { Link } from "@tanstack/react-router";
import { CheckCircle, Menu } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function AppHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <Link className="flex items-center justify-center" to="/">
        <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        <span className="ml-2 text-base sm:text-lg font-bold">TaskFlow</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:text-primary transition-colors" to="/task">
          Tasks
        </Link>
        <Link className="text-sm font-medium hover:text-primary transition-colors" to="/sign-up">
          Sign Up
        </Link>
        <Link className="text-sm font-medium hover:text-primary transition-colors" to="/login">
          Login
        </Link>
      </nav>

      {/* Mobile Navigation */}
      <div className="ml-auto md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link
                className="text-lg font-medium hover:text-primary transition-colors"
                href="#features"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link
                className="text-lg font-medium hover:text-primary transition-colors"
                href="#pricing"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                className="text-lg font-medium hover:text-primary transition-colors"
                href="#about"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>

              <div className="pt-4 space-y-2">
                <Button className="w-full" size="sm">
                  Get Started Free
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  Watch Demo
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
