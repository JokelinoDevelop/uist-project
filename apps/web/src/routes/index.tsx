import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Calendar, CheckCircle, Clock, List, Plus, Users, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 xl:py-40 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="flex flex-col items-center space-y-6 text-center max-w-4xl mx-auto">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Organize Your Tasks,
                <br />
                <span className="text-primary">Achieve Your Goals</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                The simple yet powerful task management app that helps you stay organized, boost productivity, and never
                miss a deadline again.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" className="h-12 px-8">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Everything You Need to Stay Productive
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                From simple to-dos to complex project management, TaskFlow adapts to your workflow.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-4xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-8">
            <Card className="p-6 hover:shadow-lg hover:scale-105 transition-all duration-300">
              <CardHeader className="flex flex-col items-start gap-4">
                <Plus className="text-primary h-6 w-6" />
                <div>
                  <CardTitle className="text-xl">Quick Task Creation</CardTitle>
                  <CardDescription className="mt-1 text-muted-foreground">
                    Add tasks instantly with our intuitive interface. Set priorities, due dates, and categories in seconds.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card className="p-6 hover:shadow-lg hover:scale-105 transition-all duration-300">
              <CardHeader className="flex flex-col items-start gap-4">
                <List className="text-primary h-6 w-6" />
                <div>
                  <CardTitle className="text-xl">Smart Organization</CardTitle>
                  <CardDescription className="mt-1 text-muted-foreground">
                    Organize tasks with projects, tags, and custom filters. Find what you need when you need it.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card className="p-6 hover:shadow-lg hover:scale-105 transition-all duration-300">
              <CardHeader className="flex flex-col items-start gap-4">
                <Calendar className="text-primary h-6 w-6" />
                <div>
                  <CardTitle className="text-xl">Timeline Management</CardTitle>
                  <CardDescription className="mt-1 text-muted-foreground">
                    Visualize your schedule with calendar views and deadline tracking. Never miss important dates.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full bg-muted py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "10K+", label: "Active Users" },
              { value: "1M+", label: "Tasks Completed" },
              { value: "99.9%", label: "Uptime" },
              { value: "4.8★", label: "User Rating" },
            ].map((stat, i) => (
              <Card key={i} className="shadow-sm border border-border hover:shadow-lg hover:scale-105 transition-all duration-300">
                <CardContent className="flex flex-col items-center justify-center space-y-2 p-6 text-center">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Choose TaskFlow?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Zap className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Lightning Fast</h3>
                    <p className="text-muted-foreground">
                      Optimized for speed with instant sync across all your devices.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Team Collaboration</h3>
                    <p className="text-muted-foreground">
                      Share projects and collaborate with team members in real-time.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Time Tracking</h3>
                    <p className="text-muted-foreground">
                      Built-in time tracking to monitor productivity and project progress.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:order-first">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <CheckCircle className="h-16 w-16 text-primary mx-auto" />
                  <p className="text-muted-foreground">App Preview Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl">
          <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Organized?</h2>
              <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
                Join thousands of users who have transformed their productivity with TaskFlow.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" variant="secondary" className="h-12 px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
